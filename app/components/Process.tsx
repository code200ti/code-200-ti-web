'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Palette, Code, Rocket, Shield } from 'lucide-react';

const Process = () => {
  const processSteps = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Consulta Inicial",
      description: "Analizamos tus necesidades y objetivos para entender perfectamente tu empresa",
      details: ["Respuesta en 24 horas", "Análisis detallado", "Propuesta personalizada"]
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Diseño & Planificación",
      description: "Creamos wireframes, mockups y planificamos la arquitectura técnica para tu proyecto",
      details: ["Diseño responsive incluido", "Wireframes detallados", "Planificación completa"]
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Desarrollo",
      description: "Implementamos tu solución digital usando las mejores herramientas y metodologías",
      details: ["Desarrollo profesional", "Sitio web optimizado", "Pruebas de funcionalidad"]
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Lanzamiento",
      description: "Desplegamos tu solución y optimizamos para el mejor rendimiento de tu empresa",
      details: ["SEO incluido", "Optimización completa", "Monitoreo inicial"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Soporte & Mantenimiento",
      description: "Te acompañamos con soporte técnico y mantenimiento para tu empresa",
      details: ["Garantía de 12 meses", "Soporte técnico", "Respaldos de seguridad"]
    }
  ];

  return (
    <section id="proceso" className="relative min-h-screen flex items-center pt-28 pb-28 md:pt-28 md:pb-28 lg:pt-28 lg:pb-28 xl:pt-40 xl:pb-40 px-6 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center mb-8 md:mb-10 lg:mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-gray-900">
            Nuestro <span className="bg-gradient-to-r from-[#234f70] to-[#6fcc70] bg-clip-text text-transparent">proceso</span> de trabajo
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Una metodología probada que garantiza resultados excepcionales para freelancers, negocios y empresas
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: "easeOut"
              }}
              viewport={{ once: false, margin: "-50px" }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#234f70] to-[#6fcc70] opacity-0 group-hover:opacity-10 transition-opacity duration-200 rounded-2xl blur-sm md:blur-xl" />
              <div className="relative p-8 bg-gray-50 rounded-2xl border border-gray-200 hover:border-[#234f70]/50 hover:shadow-lg transition-all duration-200 h-full">
                <div className="flex justify-center mb-6">
                  <div className="inline-block p-4 bg-gradient-to-r from-[#234f70] to-[#6fcc70] rounded-xl text-white">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 text-left">{step.title}</h3>
                
                <div className="space-y-1.5">
                  {step.details.map((detail) => (
                    <div key={detail} className="flex items-center gap-2 text-xs text-gray-600">
                      <div className="w-1 h-1 bg-[#6fcc70] rounded-full" />
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
