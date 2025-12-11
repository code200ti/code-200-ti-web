'use client';

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
      title: "Sistemas de Gestión",
      description: "Inventarios, proyectos, producción y catálogos digitales personalizados",
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
    <section id="servicios" className="relative min-h-dvh flex items-center pt-32 pb-16 md:pt-32 md:pb-24 lg:pt-32 lg:pb-16 xl:pt-40 xl:pb-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-gray-900">
            Servicios que <span className="bg-gradient-to-r from-[#234f70] to-[#6fcc70] bg-clip-text text-transparent">ofrecemos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Soluciones digitales para impulsar tu negocio
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: "easeOut"
              }}
              viewport={{ once: false, margin: "-50px" }}
              whileHover={{ y: -5 }}
              className="relative group h-full"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-200 rounded-2xl blur-xl`} />
              <div className="relative h-full p-8 bg-gray-50 rounded-2xl border border-gray-200 hover:border-[#234f70]/50 hover:shadow-lg transition-all duration-200 flex flex-col">
                <div className="flex justify-center mb-6">
                  <div className={`inline-block p-4 bg-gradient-to-r ${service.color} rounded-xl text-white`}>
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{service.title}</h3>
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
