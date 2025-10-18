'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { PROJECTS_DATA, Project } from '../lib/constants/projects';

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
  return (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
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
              const project = PROJECTS_DATA.find((p: Project) => p.id === selectedProject);
              if (!project) return null;

              return (
                <div className="relative w-full h-full">
                  {/* Imagen principal - Pantalla completa */}
                  <div className="relative w-full h-full">
                    <div className="aspect-video relative overflow-hidden">
                      {/* Superposición de imágenes - Siempre una visible */}
                      {project.images.map((image: string, index: number) => (
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
                      onClick={onClose}
                      className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    
                  </div>
                  
                  {/* Botones de navegación - Solo si hay más de una imagen */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={onPrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all cursor-pointer"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={onNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all cursor-pointer"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  
                  {/* Indicadores flotantes - Solo si hay más de una imagen */}
                  {project.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                      {project.images.map((_: string, idx: number) => (
                        <button
                          key={`${project.id}-dot-${idx}`}
                          onClick={() => onGoToImage(idx)}
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
            {selectedProject ? (() => {
              const project = PROJECTS_DATA.find((p: Project) => p.id === selectedProject);
              if (!project) return null;
              
              return (
                <div className="p-6 bg-black/20 backdrop-blur-sm">
                  <div className="mb-3">
                    <span className="text-sm text-[#6fcc70] font-semibold bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white bg-black/50 px-3 py-2 rounded-full backdrop-blur-sm inline-block mb-3">
                    {project.title}
                  </h3>
                  
                  {/* Tecnologías - Responsive */}
                  <div className="flex flex-wrap gap-1">
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
              );
            })() : null}
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
