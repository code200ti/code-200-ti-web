'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const Projects = () => {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  const nextCarousel = () => {
    setCurrentCarouselIndex((prev) => {
      const maxIndex = isMobile 
        ? projects.length - 1  // En móvil: máximo índice para 1 imagen
        : Math.max(0, projects.length - 2); // En desktop: máximo índice para 2 imágenes
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevCarousel = () => {
    setCurrentCarouselIndex((prev) => {
      const maxIndex = isMobile 
        ? projects.length - 1
        : Math.max(0, projects.length - 2);
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentCarouselIndex(index);
  };

  const openProjectModal = (projectId: number) => {
    setSelectedProject(projectId);
    setCurrentImageIndex(0);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    const project = projects.find(p => p.id === selectedProject);
    if (project?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImage = () => {
    const project = projects.find(p => p.id === selectedProject);
    if (project?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  const projects = [
    {
      id: 1,
      title: "Deprotec",
      category: "Página Web Corporativa",
      images: ["/images/projects/deprotec1.webp",
        "/images/projects/deprotec/deprotec2.webp",
        "/images/projects/deprotec/deprotec3.webp",
        "/images/projects/deprotec/deprotec4.webp",
        "/images/projects/deprotec/deprotec5.webp"],
      tech: ["Laravel", "Livewire", "MySQL"],
      color: "from-[#234f70] to-[#6fcc70]"
    },
    {
      id: 2,
      title: "Panificadora C & V",
      category: "Sistema Web Empresarial",
      images: ["/images/projects/panificadora-cv.webp"],
      tech: ["Angular", "Spring Boot", "PostgreSQL"],
      color: "from-[#084a6b] to-[#91cf13]"
    },
    {
      id: 3,
      title: "Placatic",
      category: "Landing Page",
      images: ["/images/projects/placatic/placatic1.webp",
        "/images/projects/placatic/placatic2.webp",
        "/images/projects/placatic/placatic3.webp"],
      tech: ["WordPress", "PHP", "MySQL"],
      color: "from-[#6fcc70] to-[#234f70]"
    },
    {
      id: 4,
      title: "Lavaquick Express",
      category: "Sistema Web Empresarial",
      images: ["/images/projects/lavaquick1.webp",
        "/images/projects/lavaquick/lavaquick2.webp",
        "/images/projects/lavaquick/lavaquick3.webp",
        "/images/projects/lavaquick/lavaquick4.webp",
        "/images/projects/lavaquick/lavaquick5.webp",
        "/images/projects/lavaquick/lavaquick6.webp",
        "/images/projects/lavaquick/lavaquick7.webp",
        "/images/projects/lavaquick/lavaquick8.webp",
        "/images/projects/lavaquick/lavaquick9.webp",
        "/images/projects/lavaquick/lavaquick10.webp"],
      tech: ["Laravel", "MySQL", "Splade"],
      color: "from-[#91cf13] to-[#084a6b]"
    },
    {
      id: 5,
      title: "Simepar Sofía",
      category: "Sistema Web Institucional",
      images: ["/images/projects/simeparsofia.webp"],
      tech: ["PHP", "HTML", "JavaScript", "MySQL"],
      color: "from-[#234f70] to-[#6fcc70]"
    }
  ];


  return (
    <section id="proyectos" className="relative min-h-screen flex items-center pt-32 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 xl:pt-48 xl:pb-40 px-4 overflow-hidden">
      {/* Fondo oscuro igual que Hero */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(35,79,112,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      <div className="w-full max-w-none mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Proyectos <span className="bg-gradient-to-r from-[#234f70] to-[#6fcc70] bg-clip-text text-transparent">Destacados</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto hidden md:block">
            Soluciones web que han impulsado el crecimiento de empresas
          </p>
        </motion.div>

        {/* Carrusel Container */}
        <div className="relative">
          {/* Carrusel */}
          <div className="overflow-hidden rounded-2xl py-3">
            <motion.div
              className="flex"
              animate={{ 
                x: `-${currentCarouselIndex * (isMobile ? 100 : 50)}%` 
              }} // Responsive: 100% en móvil, 50% en desktop
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {projects.map((project, index) => (
                <div key={project.id} className="w-full md:w-1/2 flex-shrink-0 px-1"> {/* Responsive: 1 imagen en móvil, 2 en desktop */}
                  <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative cursor-pointer"
              onClick={() => openProjectModal(project.id)}
            >
              <div className="aspect-video relative overflow-hidden rounded-2xl"> {/* Mantener 16:9 */}
                      <Image 
                  src={project.images[0]} 
                  alt={project.title}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 50vw"
                        className="object-cover"
                        priority={index >= currentCarouselIndex && index < currentCarouselIndex + 2} // Prioridad para las 2 imágenes visibles
                        quality={85}
                />
              </div>
              
            </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Controles de navegación */}
          <div className="flex justify-center items-center mt-8 gap-6">
            {/* Botón anterior */}
            <button
              onClick={prevCarousel}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all border border-white/20 cursor-pointer"
              aria-label="Proyecto anterior"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Anterior</span>
            </button>

            {/* Indicadores de puntos */}
            <div className="flex gap-2">
              {Array.from({ 
                length: isMobile ? projects.length : Math.max(1, projects.length - 1) 
              }, (_, index) => (
                <button
                  key={`carousel-dot-${index}`}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                    index === currentCarouselIndex 
                      ? 'bg-[#6fcc70] scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Ir a la posición ${index + 1}`}
                />
              ))}
            </div>

            {/* Botón siguiente */}
            <button
              onClick={nextCarousel}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all border border-white/20 cursor-pointer"
              aria-label="Siguiente proyecto"
            >
              <span className="text-sm font-medium">Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Proyecto */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeProjectModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-black rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const project = projects.find(p => p.id === selectedProject);
                if (!project) return null;

                return (
                  <div className="relative w-full h-full">
                    {/* Imagen principal - Pantalla completa */}
                    <div className="relative w-full h-full">
                      <div className="aspect-video relative overflow-hidden">
                        {/* Superposición de imágenes - Siempre una visible */}
                        {project.images.map((image, index) => (
                          <motion.div
                            key={`${project.id}-${index}`}
                            initial={{ opacity: index === currentImageIndex ? 1 : 0 }}
                            animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="absolute inset-0"
                          >
                            <Image
                              src={image}
                              alt={project.title}
                              fill
                              className="object-cover"
                              priority={index === currentImageIndex}
                            />
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Botón de cerrar flotante */}
                      <button
                        onClick={closeProjectModal}
                        className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      
                    </div>
                    
                    {/* Botones de navegación - Solo si hay más de una imagen */}
                    {project.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all cursor-pointer"
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </button>
                        
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all cursor-pointer"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    
                    {/* Indicadores flotantes - Solo si hay más de una imagen */}
                    {project.images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                        {project.images.map((_, idx) => (
                          <button
                            key={`${project.id}-dot-${idx}`}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                              idx === currentImageIndex ? 'bg-white' : 'bg-black/50 hover:bg-black/70'
                            }`}
                            aria-label={`Ir a la imagen ${idx + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}
              
              {/* Información del proyecto - Abajo del modal */}
              {selectedProject && (() => {
                const project = projects.find(p => p.id === selectedProject);
                if (!project) return null;
                
                return (
                  <div className="p-6 bg-black/20 backdrop-blur-sm">
                    <div className="mb-2">
                      <span className="text-sm text-[#6fcc70] font-semibold bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white bg-black/50 px-3 py-2 rounded-full backdrop-blur-sm inline-block mb-3">
                      {project.title}
                    </h3>
                    
                    {/* Tecnologías - Responsive */}
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs bg-black/50 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="text-xs bg-black/50 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })()}
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
