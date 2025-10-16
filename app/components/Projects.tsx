'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const Projects = () => {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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

  const projects = [
    {
      id: 1,
      title: "Deprotec",
      category: "Página Web Corporativa",
      image: "/images/projects/deprotec.webp",
      tech: ["Laravel", "Livewire", "MySQL"],
      color: "from-[#234f70] to-[#6fcc70]"
    },
    {
      id: 2,
      title: "Panificadora C & V",
      category: "Sistema Web Empresarial",
      image: "/images/projects/panificadora-cv.webp",
      tech: ["Angular", "Spring Boot", "PostgreSQL"],
      color: "from-[#084a6b] to-[#91cf13]"
    },
    {
      id: 3,
      title: "Placatic",
      category: "Landing Page",
      image: "/images/projects/placatic.webp",
      tech: ["WordPress", "PHP", "MySQL"],
      color: "from-[#6fcc70] to-[#234f70]"
    },
    {
      id: 4,
      title: "Lavaquick Express",
      category: "Sistema Web Empresarial",
      image: "/images/projects/lavaquick.webp",
      tech: ["Laravel", "MySQL", "Splade"],
      color: "from-[#91cf13] to-[#084a6b]"
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
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Proyectos <span className="bg-gradient-to-r from-[#234f70] to-[#6fcc70] bg-clip-text text-transparent">Destacados</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Soluciones web que han impulsado el crecimiento de empresas
          </p>
        </motion.div>

        {/* Carrusel Container */}
        <div className="relative">
          {/* Carrusel */}
          <div className="overflow-hidden rounded-2xl">
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
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
            >
                    <div className="aspect-video relative overflow-hidden rounded-2xl"> {/* Mantener 16:9 */}
                      <Image 
                  src={project.image} 
                  alt={project.title}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        priority={index >= currentCarouselIndex && index < currentCarouselIndex + 2} // Prioridad para las 2 imágenes visibles
                        quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
                    <div className="absolute inset-0 p-4 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform">
                {/* Overlay oscuro para mejor legibilidad */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-2xl" />
                <span className="text-sm text-[#6fcc70] mb-2 relative z-10 font-semibold drop-shadow-2xl" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.6)'}}>{project.category}</span>
                      <h3 className="text-2xl font-bold mb-3 text-white relative z-10 drop-shadow-lg">{project.title}</h3>
                      <div className="flex flex-wrap gap-1 mb-3 opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
                  {project.tech.map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-white/30 backdrop-blur-sm rounded-full text-xs text-white font-medium border border-white/20">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
                  <button className="flex items-center gap-2 text-sm hover:text-[#6fcc70] transition-colors text-white font-semibold drop-shadow-md">
                    Ver Proyecto <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
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
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all border border-white/20"
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
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
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
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all border border-white/20"
              aria-label="Siguiente proyecto"
            >
              <span className="text-sm font-medium">Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
