'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, ChevronDown } from 'lucide-react';

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(35,79,112,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#234f70]/20 to-[#6fcc70]/20 rounded-full border border-[#234f70]/30 text-sm mb-8">
            <Sparkles className="inline w-4 h-4 mr-2" />
            Desarrollo Web Profesional
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold mb-6"
        >
          Transformamos Ideas en
          <span className="block bg-gradient-to-r from-[#234f70] via-[#6fcc70] to-[#91cf13] bg-clip-text text-transparent">
            Experiencias Digitales
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
        >
          Desarrollamos sitios web modernos, sistemas personalizados y diseños que impulsan tu negocio al siguiente nivel
        </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector('#proyectos');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#234f70] to-[#6fcc70] rounded-full font-semibold text-lg text-white flex items-center gap-2 cursor-pointer"
            >
              Ver Proyectos <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector('#contacto');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full font-semibold text-lg text-white border border-white/20 cursor-pointer"
            >
              Contactar
            </motion.button>
          </motion.div>

      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={() => {
          const target = document.querySelector('#servicios');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer hover:scale-110 transition-transform"
        aria-label="Ir a servicios"
      >
        <ChevronDown className="w-12 h-12 text-[#6fcc70]" />
      </motion.button>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-[#234f70] to-[#6fcc70] rounded-2xl opacity-20 blur-xl"
      />
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-br from-[#084a6b] to-[#91cf13] rounded-full opacity-20 blur-xl"
      />
    </section>
  );
};

export default Hero;
