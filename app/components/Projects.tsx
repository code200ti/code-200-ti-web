'use client';

import { useState, useEffect, type TouchEvent } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { PROJECTS_DATA, Project } from '../lib/constants/projects';
import ProjectModal from './ProjectModal';

const Projects = () => {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Swipe gesture handlers
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
      nextCarousel();
    }
    if (isRightSwipe) {
      prevCarousel();
    }
  };


  const nextCarousel = () => {
    setCurrentCarouselIndex((prev) => {
      const maxIndex = isMobile 
        ? PROJECTS_DATA.length - 1  // En móvil: máximo índice para 1 imagen
        : Math.max(0, PROJECTS_DATA.length - 2); // En desktop: máximo índice para 2 imágenes
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevCarousel = () => {
    setCurrentCarouselIndex((prev) => {
      const maxIndex = isMobile 
        ? PROJECTS_DATA.length - 1
        : Math.max(0, PROJECTS_DATA.length - 2);
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
    const project = PROJECTS_DATA.find((p: Project) => p.id === selectedProject);
    if (project?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImage = () => {
    const project = PROJECTS_DATA.find((p: Project) => p.id === selectedProject);
    if (project?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };



  return (
    <section id="proyectos" className="relative min-h-screen flex items-center pt-32 pb-16 md:pt-32 md:pb-24 lg:pt-32 lg:pb-16 xl:pt-40 xl:pb-20 px-4 overflow-hidden">
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-white">
            Proyectos <span className="bg-gradient-to-r from-[#234f70] to-[#6fcc70] bg-clip-text text-transparent">Destacados</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto hidden md:block">
            Soluciones web que han impulsado el crecimiento de empresas
          </p>
        </motion.div>

        {/* Carrusel Container */}
        <div className="relative mb-8">
          {/* Carrusel */}
          <div 
            className="overflow-hidden rounded-2xl py-3"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              className="flex"
              animate={{ 
                x: `-${currentCarouselIndex * (isMobile ? 100 : 50)}%` 
              }} // Responsive: 100% en móvil, 50% en desktop
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {PROJECTS_DATA.map((project: Project, index: number) => (
                <div key={project.id} className="w-full md:w-1/2 flex-shrink-0 px-1"> {/* Responsive: 1 imagen en móvil, 2 en desktop */}
                  <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.05,
                ease: "easeOut"
              }}
              viewport={{ once: false, margin: "-50px" }}
              whileHover={{ y: -5 }}
              className="group relative cursor-pointer"
              onClick={() => openProjectModal(project.id)}
            >
              <div className="aspect-video relative overflow-hidden rounded-2xl"> {/* Mantener 16:9 */}
                      <Image 
                  src={project.images[0]} 
                  alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 640px"
                        className="object-cover"
                        loading="lazy"
                        quality={75}
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
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-200 border border-white/20 cursor-pointer"
              aria-label="Proyecto anterior"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Anterior</span>
            </button>

            {/* Indicadores de puntos */}
            <div className="flex gap-2">
              {Array.from({ 
                length: isMobile ? PROJECTS_DATA.length : Math.max(1, PROJECTS_DATA.length - 1) 
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
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-200 border border-white/20 cursor-pointer"
              aria-label="Siguiente proyecto"
            >
              <span className="text-sm font-medium">Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Proyecto */}
      <ProjectModal
        selectedProject={selectedProject}
        currentImageIndex={currentImageIndex}
        onClose={closeProjectModal}
        onNextImage={nextImage}
        onPrevImage={prevImage}
        onGoToImage={goToImage}
      />
    </section>
  );
};

export default Projects;
