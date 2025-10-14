'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Rocket, Zap } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Desarrollo Web",
      description: "Sitios web modernos y responsivos con las últimas tecnologías",
      color: "from-[#234f70] to-[#084a6b]"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Diseño UI/UX",
      description: "Interfaces intuitivas y atractivas que convierten visitantes en clientes",
      color: "from-[#6fcc70] to-[#91cf13]"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Sistemas Web",
      description: "Aplicaciones web personalizadas para automatizar tu negocio",
      color: "from-[#084a6b] to-[#234f70]"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Optimización SEO",
      description: "Posicionamiento en buscadores para maximizar tu visibilidad",
      color: "from-[#91cf13] to-[#6fcc70]"
    }
  ];

  return (
    <section id="servicios" className="relative min-h-screen flex items-center pt-32 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 xl:pt-48 xl:pb-40 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Servicios que <span className="bg-gradient-to-r from-[#234f70] to-[#6fcc70] bg-clip-text text-transparent">Ofrecemos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Soluciones completas de desarrollo web adaptadas a tus necesidades
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl blur-xl`} />
              <div className="relative p-8 bg-gray-50 rounded-2xl border border-gray-200 hover:border-[#234f70]/50 hover:shadow-lg transition-all">
                <div className={`inline-block p-4 bg-gradient-to-r ${service.color} rounded-xl mb-6 text-white`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
