'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Palette, Code, Rocket, CheckCircle } from 'lucide-react';

const Process = () => {
  const processSteps = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "1. Consulta Inicial",
      description: "Analizamos tus necesidades y objetivos para entender perfectamente tu empresa",
      details: ["Respuesta en 24 horas", "Análisis detallado", "Propuesta personalizada"]
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "2. Diseño & Planificación",
      description: "Creamos wireframes, mockups y planificamos la arquitectura técnica para tu proyecto",
      details: ["Diseño responsive incluido", "Wireframes detallados", "Planificación completa"]
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "3. Desarrollo",
      description: "Implementamos tu solución digital usando las mejores herramientas y metodologías",
      details: ["Desarrollo profesional", "Sitio web optimizado", "Pruebas de funcionalidad"]
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "4. Lanzamiento",
      description: "Desplegamos tu solución y optimizamos para el mejor rendimiento de tu empresa",
      details: ["SEO incluido", "Optimización completa", "Monitoreo inicial"]
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "5. Soporte & Mantenimiento",
      description: "Te acompañamos con soporte técnico y mantenimiento para tu empresa",
      details: ["Garantía de 12 meses", "Soporte técnico", "Respaldos de seguridad"]
    }
  ];

  return (
    <section id="proceso" className="relative min-h-screen flex items-center pt-32 pb-16 md:pt-32 md:pb-24 lg:pt-32 lg:pb-16 xl:pt-40 xl:pb-20 px-6 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-gray-900">
            Nuestro <span className="bg-gradient-to-r from-[#234f70] to-[#6fcc70] bg-clip-text text-transparent">Proceso</span> de Trabajo
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Una metodología probada que garantiza resultados excepcionales para freelancers, negocios y empresas
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {processSteps.map((step) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: processSteps.indexOf(step) * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#234f70] to-[#6fcc70] opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl blur-xl" />
              <div className="relative p-6 bg-white rounded-2xl border border-gray-200 hover:border-[#234f70]/50 hover:shadow-lg transition-all text-center h-full">
                <div className="inline-block p-4 bg-gradient-to-r from-[#234f70] to-[#6fcc70] rounded-xl mb-6 text-white">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{step.description}</p>
                
                <div className="space-y-2">
                  {step.details.map((detail) => (
                    <div key={detail} className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-1.5 h-1.5 bg-[#6fcc70] rounded-full" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Process;
