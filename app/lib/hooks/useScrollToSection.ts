'use client';

import { useCallback } from 'react';

/**
 * Hook personalizado para manejar el scroll suave a secciones específicas
 * @returns Función para hacer scroll a una sección
 */
export const useScrollToSection = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const target = document.querySelector(sectionId);
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }, []);

  return { scrollToSection };
};
