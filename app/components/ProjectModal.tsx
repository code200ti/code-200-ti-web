'use client';

import { useState, useLayoutEffect, useEffect, type TouchEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { PROJECTS_DATA, Project } from '../lib/constants/projects';
import { trackProjectView } from '../lib/analytics';

interface ProjectModalProps {
  selectedProject: number | null;
  currentImageIndex: number;
  onClose: () => void;
  onNextImage: () => void;
  onPrevImage: () => void;
  onGoToImage: (index: number) => void;
}

const ProjectModal = ({ 
  selectedProject, 
  currentImageIndex, 
  onClose, 
  onNextImage, 
  onPrevImage, 
  onGoToImage 
}: ProjectModalProps) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Bloquear scroll cuando el modal está abierto - Solución simplificada y robusta
  useLayoutEffect(() => {
    if (selectedProject) {
      // Track project view
      const project = PROJECTS_DATA.find((p: Project) => p.id === selectedProject);
      if (project) {
        trackProjectView(project.title);
      }
      
      const body = document.body;
      const html = document.documentElement;
      
      // Método simplificado: solo overflow hidden (sin position fixed)
      // Esto evita problemas de restauración de scroll porque el navegador
      // mantiene automáticamente la posición de scroll
      const originalBodyOverflow = body.style.overflow;
      const originalHtmlOverflow = html.style.overflow;
      const originalBodyPaddingRight = body.style.paddingRight;
      const originalHtmlPaddingRight = html.style.paddingRight;
      
      // Calcular ancho del scrollbar antes de ocultarlo
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Aplicar bloqueo de scroll
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
      
      // Compensar scrollbar para evitar layout shift
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
        html.style.paddingRight = `${scrollbarWidth}px`;
      }
      
      // Cleanup: restaurar estilos
      return () => {
        body.style.overflow = originalBodyOverflow;
        html.style.overflow = originalHtmlOverflow;
        body.style.paddingRight = originalBodyPaddingRight;
        html.style.paddingRight = originalHtmlPaddingRight;
      };
    }
  }, [selectedProject]);

  // Manejar eventos de teclado globalmente cuando el modal está abierto
  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Solo manejar si el modal está abierto y no estamos escribiendo en un input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onPrevImage();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNextImage();
      }
    };

    // Agregar listener con capture para capturar eventos antes que otros elementos
    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [selectedProject, onClose, onPrevImage, onNextImage]);

  // Swipe gesture handlers para el modal
  const handleTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      onNextImage();
    }
    if (isRightSwipe) {
      onPrevImage();
    }
  };
  return (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          key={`modal-${selectedProject}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          style={{ 
            overscrollBehavior: 'contain',
            touchAction: 'none'
          }}
          onClick={onClose}
        >
          {/* Contenedor del modal - Sin animación propia para no interferir con layoutId */}
          {/* El layoutId maneja la animación principal de la imagen */}
          {/* Los eventos de teclado (Escape, flechas) se manejan globalmente en useEffect */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Detalles del proyecto"
            tabIndex={-1}
            className="relative w-full max-w-5xl max-h-[90vh] bg-black rounded-2xl overflow-hidden shadow-2xl shadow-white/20 flex flex-col my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              // Buscar proyecto una sola vez (evita búsquedas redundantes)
              const project = PROJECTS_DATA.find((p: Project) => p.id === selectedProject);
              if (!project) return null;

              return (
                <>
                  {/* Área de imagen - Flexible, respetando ratio 16:9 naturalmente */}
                  <div className="relative flex-shrink-0 w-full flex items-center justify-center">
                    {/* Contenedor de imagen - Mantiene ratio 16:9 con layoutId para animación compartida */}
                    <motion.div 
                      layoutId={`project-image-${project.id}`}
                      className="w-full aspect-video relative overflow-hidden bg-black/50 flex items-center justify-center rounded-2xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      style={{ willChange: 'transform' }}
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                    >
                      {/* Superposición de imágenes - Siempre una visible */}
                      {project.images.map((image: string, index: number) => (
                        <motion.div
                          key={`${project.id}-${index}`}
                          initial={{ opacity: index === currentImageIndex ? 1 : 0 }}
                          animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <Image
                            src={image}
                            alt={`${project.title} - ${project.category} - Captura de pantalla ${index + 1} del proyecto web desarrollado por CODE 200 TI en Chiclayo, Lambayeque, Perú. Tecnologías: ${project.tech.join(', ')}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 1024px"
                            className={index === 0 ? "object-cover" : "object-contain"}
                            priority={index === currentImageIndex && index === 0}
                            quality={index === 0 ? 90 : 100}
                          />
                        </motion.div>
                      ))}
                      
                      {/* Botones de navegación - Dentro de la imagen */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={onPrevImage}
                            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 bg-black/60 backdrop-blur-sm text-white rounded-full hover:bg-black/80 transition-all duration-200 cursor-pointer border border-white/20 shadow-lg items-center justify-center"
                            aria-label="Imagen anterior"
                      >
                            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
                      </button>
                      
                      <button
                        onClick={onNextImage}
                            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 bg-black/60 backdrop-blur-sm text-white rounded-full hover:bg-black/80 transition-all duration-200 cursor-pointer border border-white/20 shadow-lg items-center justify-center"
                            aria-label="Imagen siguiente"
                      >
                            <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                      </button>
                    </>
                  )}
                  
                      {/* Indicadores dentro de la imagen - Solo si hay más de una imagen */}
                  {project.images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 px-3 py-2 bg-black/40 backdrop-blur-sm rounded-full">
                      {project.images.map((_: string, idx: number) => (
                        <button
                          key={`${project.id}-dot-${idx}`}
                          onClick={() => onGoToImage(idx)}
                              className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${
                                idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'
                          }`}
                          aria-label={`Ir a la imagen ${idx + 1}`}
                        />
                      ))}
                    </div>
                      )}
                    </motion.div>
                    
                    {/* Botón de cerrar flotante */}
                    <button
                      onClick={onClose}
                      className="absolute top-4 right-4 z-30 p-2 bg-black/60 backdrop-blur-sm text-white rounded-full hover:bg-black/80 transition-all duration-200 cursor-pointer border border-white/20"
                      aria-label="Cerrar modal"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    {/* Botón CTA flotante - Siempre visible, posición responsive */}
                    {project.url && (
                      <motion.a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute top-4 left-4 md:left-auto md:right-20 z-30 inline-flex items-center gap-1.5 md:gap-2 px-3 py-2 bg-black/60 backdrop-blur-sm text-white rounded-full font-semibold text-xs md:text-sm hover:bg-black/80 transition-all duration-200 cursor-pointer border border-white/20 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="hidden sm:inline">Ver proyecto</span>
                        <span className="sm:hidden">Ver</span>
                        <ExternalLink className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                      </motion.a>
                  )}
                </div>
                  
                  {/* Información del proyecto - Con scroll si es necesario */}
                  <div className="flex-shrink-0 overflow-y-auto">
                    <div className="p-4 md:p-6 bg-black/20 backdrop-blur-sm">
                  <div className="mb-3">
                    <span className="text-sm text-[#6fcc70] font-semibold bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white bg-black/50 px-3 py-2 rounded-full backdrop-blur-sm inline-block mb-3">
                    {project.title}
                  </h3>
                  
                  {/* Tecnologías - Responsive */}
                      <div className="flex flex-wrap gap-1 mb-4">
                    {project.tech.slice(0, 3).map((tech: string) => (
                      <span key={tech} className="text-xs bg-black/50 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                        {tech}
                      </span>
                    ))}
                    {/* Tecnologías adicionales solo en desktop */}
                    <div className="hidden md:flex flex-wrap gap-1">
                      {project.tech.slice(3, 6).map((tech: string) => (
                        <span key={tech} className="text-xs bg-black/50 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.tech.length > 3 && (
                      <span className="text-xs bg-black/50 text-white px-3 py-1 rounded-full backdrop-blur-sm md:hidden">
                        +{project.tech.length - 3}
                      </span>
                    )}
                    {project.tech.length > 6 && (
                      <span className="hidden md:inline text-xs bg-black/50 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                        +{project.tech.length - 6}
                      </span>
                    )}
                  </div>
                </div>
                  </div>
                </>
              );
            })()}
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
