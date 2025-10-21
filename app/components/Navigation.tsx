'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { trackNavigationClick, trackContactClick } from '../lib/analytics';

const Navigation = () => {
  const [currentSection, setCurrentSection] = useState('inicio');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Proceso', href: '#proceso' },
    { name: 'Proyectos', href: '#proyectos' },
    { name: 'Contacto', href: '#contacto' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Detectar sección actual
      const sections = ['inicio', 'servicios', 'proceso', 'proyectos', 'contacto'];
      let currentSectionTemp = 'inicio';

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && scrollY >= section.offsetTop - 200) {
          currentSectionTemp = sections[i];
          break;
        }
      }

      setCurrentSection(currentSectionTemp);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Secciones oscuras: Hero y Projects
  const isDarkSection = currentSection === 'inicio' || currentSection === 'proyectos';
  const shouldUseDarkLogo = isDarkSection || isMenuOpen;
  const logoSrc = shouldUseDarkLogo
    ? "/images/logos/isologo-code-200-ti-dark.webp" 
    : "/images/logos/isologo-code-200-ti.webp";

  const getNavStyles = () => {
    if (isMenuOpen) return 'bg-[#0f172a] border-b border-white/20';
    if (isDarkSection) return 'backdrop-blur-lg border-b border-white/20';
    return 'backdrop-blur-lg border-b border-gray-200/50';
  };

  const getMenuButtonStyles = () => {
    if (isMenuOpen) return 'text-white hover:bg-white/10 border border-white/20';
    if (isDarkSection) return 'text-white hover:bg-white/10 border border-white/20';
    return 'text-gray-900 hover:bg-gray-100 border border-gray-300';
  };

  const getMenuIcon = () => {
    return isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />;
  };

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 ${getNavStyles()}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative z-50">
        <Link href="/">
          <motion.div 
            className="cursor-pointer w-[150px] h-18 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <Image 
              src={logoSrc}
              alt="CODE 200 TI Logo"
              width={150}
              height={72}
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        </Link>
        <div className="hidden lg:flex gap-8">
          {navItems.map((item) => (
            <motion.div key={item.name} whileHover={{ y: -2 }}>
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  trackNavigationClick(item.name.toLowerCase());
                  const target = document.querySelector(item.href);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`text-lg transition-colors cursor-pointer ${
                  isDarkSection 
                    ? 'text-white hover:text-[#6fcc70]' 
                    : 'text-gray-700 hover:text-[#234f70]'
                }`}
              >
                {item.name}
              </a>
            </motion.div>
          ))}
        </div>
        {/* Botón menú móvil */}
        <button
          className={`lg:hidden p-2 rounded-lg transition-colors relative z-50 ${getMenuButtonStyles()}`}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {getMenuIcon()}
        </button>
        <motion.button
          className={`hidden lg:inline-flex px-4 py-2 rounded-full font-semibold transition-all cursor-pointer ${
            isDarkSection 
              ? 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30' 
              : 'bg-gradient-to-r from-[#234f70] to-[#6fcc70] text-white'
          }`}
          onClick={(e) => {
            e.preventDefault();
            trackContactClick('cotizar_proyecto_button');
            const target = document.querySelector('#contacto');
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cotizar Proyecto
        </motion.button>
      </div>
      {/* Overlay menú móvil */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 top-[72px] bg-[#0f172a] text-white lg:hidden z-40"
          onClick={() => setIsMenuOpen(false)}
        >
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="max-w-7xl mx-auto px-6 pt-8 pb-12 flex flex-col gap-2"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.1 + (index * 0.03) }}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(item.href);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                  setIsMenuOpen(false);
                }}
                className="text-2xl font-semibold py-4 border-b border-white/10 hover:text-[#6fcc70] transition-colors"
              >
                {item.name}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navigation;
