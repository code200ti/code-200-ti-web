'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { trackNavigationClick, trackContactClick } from '../lib/analytics';
import { useScrollToSection } from '../lib/hooks/useScrollToSection';

// Items de navegación - constante fuera del componente para evitar re-renders
const NAV_ITEMS = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Proceso', href: '#proceso' },
  { name: 'Proyectos', href: '#proyectos' },
  { name: 'Contacto', href: '#contacto' }
] as const;

const Navigation = () => {
  const [currentSection, setCurrentSection] = useState('inicio');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollToSection } = useScrollToSection();

  // Detectar sección activa usando Intersection Observer (más eficiente y moderno)
  useEffect(() => {
    const sections = NAV_ITEMS.map(item => item.href.replace('#', ''));
    let observer: IntersectionObserver | null = null;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Activa cuando la sección está en el 20% superior
      threshold: 0
    };

    // Callback del observer optimizado - Fix race condition
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Filtrar solo las que están intersectando
      const intersectingEntries = entries.filter(e => e.isIntersecting);

      if (intersectingEntries.length === 0) return;

      // Si hay múltiples, tomar la que está más alta en viewport
      const topMostEntry = intersectingEntries.reduce((prev, current) => {
        return current.boundingClientRect.top < prev.boundingClientRect.top
          ? current
          : prev;
      });

      const sectionId = topMostEntry.target.id;
      if (sections.includes(sectionId)) {
        setCurrentSection((prev) => {
          // Evita re-render si ya es la sección activa
          if (prev === sectionId) {
            return prev;
          }
          return sectionId;
        });
      }
    };

    observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observar todas las secciones
    const sectionElements: HTMLElement[] = [];
    for (const sectionId of sections) {
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
        sectionElements.push(section);
      }
    }

    // Fallback: detectar sección inicial
    const handleInitialSection = () => {
      const scrollY = window.scrollY;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && scrollY >= section.offsetTop - 200) {
          setCurrentSection(sections[i]);
          break;
        }
      }
    };
    
    // Pequeño delay para asegurar que las secciones estén renderizadas
    const timeoutId = setTimeout(handleInitialSection, 100);

    return () => {
      clearTimeout(timeoutId);
      if (observer) {
        for (const section of sectionElements) {
          observer.unobserve(section);
        }
        observer.disconnect();
      }
    };
  }, []);

  // Fix #4: Bloquear scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Secciones oscuras: Hero y Projects
  const isDarkSection = currentSection === 'inicio' || currentSection === 'proyectos';
  const shouldUseDarkLogo = isDarkSection || isMenuOpen;
  
  // Estilos simplificados
  let navStyles = 'backdrop-blur-lg border-b border-gray-200/50';
  if (isMenuOpen) {
    navStyles = 'bg-[#0f172a] border-b border-white/20';
  } else if (isDarkSection) {
    navStyles = 'backdrop-blur-lg border-b border-white/20';
  }
  
  const menuButtonStyles = (isMenuOpen || isDarkSection)
    ? 'text-white hover:bg-white/10 border border-white/20'
    : 'text-gray-900 hover:bg-gray-100 border border-gray-300';

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${navStyles}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative z-50">
        <Link href="/">
          <motion.div
            className="cursor-pointer w-[150px] h-18 flex items-center justify-center relative"
            whileHover={{ scale: 1.05 }}
          >
            {/* Logo claro (secciones claras) */}
            <Image
              src="/images/logos/isologo-code-200-ti.webp"
              alt="CODE 200 TI - Logo de desarrollo web profesional en Chiclayo, Lambayeque, Perú"
              width={150}
              height={72}
              priority
              className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
                shouldUseDarkLogo ? 'opacity-0' : 'opacity-100'
              }`}
            />
            {/* Logo oscuro (secciones oscuras) */}
            <Image
              src="/images/logos/isologo-code-200-ti-dark.webp"
              alt="CODE 200 TI - Logo de desarrollo web profesional en Chiclayo, Lambayeque, Perú"
              width={150}
              height={72}
              priority
              className={`absolute inset-0 max-w-full max-h-full object-contain transition-opacity duration-300 ${
                shouldUseDarkLogo ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </motion.div>
        </Link>
        <div className="hidden lg:flex gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = currentSection === item.href.replace('#', '');
            
            // Estilos simplificados
            let textClass = '';
            let indicatorColor = '';
            
            if (isActive) {
              if (isDarkSection) {
                textClass = 'text-[#6fcc70]';
                indicatorColor = 'bg-[#6fcc70]';
              } else {
                textClass = 'text-[#234f70]';
                indicatorColor = 'bg-[#234f70]';
              }
            } else {
              textClass = isDarkSection
                ? 'text-white hover:text-[#6fcc70]'
                : 'text-gray-700 hover:text-[#234f70]';
            }
            
            return (
              <motion.div key={item.name} whileHover={{ y: -2 }}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    trackNavigationClick(item.name.toLowerCase());
                    scrollToSection(item.href);
                  }}
                  className={`text-lg font-medium transition-all duration-200 cursor-pointer relative ${textClass}`}
                >
                  {item.name}
                  {/* Indicador de sección activa */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${indicatorColor}`}
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </motion.div>
            );
          })}
        </div>
        {/* Botón menú móvil */}
        <button
          className={`lg:hidden p-2 rounded-lg transition-colors relative z-50 ${menuButtonStyles}`}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            scrollToSection('#contacto');
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cotizar proyecto
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
            exit={{ y: -10, opacity: 0 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.4, 0, 0.2, 1], // ease-out cubic-bezier
              delay: 0.05
            }}
            className="max-w-7xl mx-auto px-6 pt-8 pb-12 flex flex-col gap-2"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = currentSection === item.href.replace('#', '');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                    setIsMenuOpen(false);
                  }}
                  className={`text-2xl font-semibold py-4 border-b-2 transition-colors duration-200 ${
                    isActive
                      ? 'text-[#6fcc70] border-[#6fcc70] font-bold'
                      : 'text-white border-white/10 hover:text-[#6fcc70] hover:border-[#6fcc70]/50'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </motion.div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navigation;
