'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import { useScrollToSection } from '../lib/hooks/useScrollToSection';
import FloatingElements from './FloatingElements';

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const { scrollToSection } = useScrollToSection();

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
        <div className="absolute inset-0 hero-dot-pattern" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto py-6 md:py-8 lg:py-12"
      >
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block px-4 py-2 bg-gradient-to-r from-[#234f70]/20 to-[#6fcc70]/20 rounded-full border border-[#234f70]/30 text-sm text-white mb-6 md:mb-8 lg:mb-10" 
          style={{ color: '#ffffff' }}
        >
          <Sparkles className="inline w-4 h-4 mr-2" />
          Desarrollo Web Profesional
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8 lg:mb-10 break-words leading-tight"
        >
          <span className="text-white block hero-text-fallback" style={{ color: '#ffffff' }}>Transformamos Ideas en</span>
          <span className="block bg-gradient-to-r from-[#234f70] via-[#6fcc70] to-[#91cf13] bg-clip-text text-transparent py-1">
            Experiencias Digitales
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-10 lg:mb-12 max-w-3xl mx-auto"
        >
          Desarrollamos sitios web modernos, sistemas personalizados y diseños que impulsan tu negocio al siguiente nivel
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 md:mb-8 lg:mb-10 hero-buttons"
        >
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#proyectos');
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#234f70] to-[#6fcc70] rounded-full font-semibold text-base sm:text-lg text-white flex items-center gap-2 cursor-pointer"
          >
            Ver Proyectos <ArrowRight className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contacto');
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 sm:px-8 sm:py-4 bg-white/10 backdrop-blur-sm rounded-full font-semibold text-base sm:text-lg text-white border border-white/20 cursor-pointer"
          >
            Contactar
          </motion.button>
        </motion.div>

      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={() => {
          scrollToSection('#servicios');
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ 
          opacity: 1, 
          y: [0, 10, 0]
        }}
        transition={{ 
          opacity: { duration: 1, delay: 0.8 },
          y: { duration: 2, repeat: Infinity, delay: 0.8 }
        }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer hover:scale-110 transition-transform hero-scroll-indicator"
        aria-label="Ir a servicios"
      >
        <ChevronDown className="w-12 h-12 text-[#6fcc70]" />
      </motion.button>

      {/* Floating Elements */}
      <FloatingElements />
    </section>
  );
};

export default Hero;
