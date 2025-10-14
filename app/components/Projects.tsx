'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const Projects = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "E-commerce Tech Store",
      category: "Desarrollo Web",
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80",
      tech: ["Next.js", "Tailwind", "Stripe"],
      color: "from-[#234f70] to-[#6fcc70]"
    },
    {
      id: 2,
      title: "Dashboard Analytics",
      category: "Sistema Web",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      tech: ["React", "D3.js", "Node.js"],
      color: "from-[#084a6b] to-[#91cf13]"
    },
    {
      id: 3,
      title: "Portfolio Creativo",
      category: "Diseño Web",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
      tech: ["Next.js", "Framer Motion", "GSAP"],
      color: "from-[#6fcc70] to-[#234f70]"
    },
    {
      id: 4,
      title: "App Gestión Empresarial",
      category: "Sistema Web",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      tech: ["React", "TypeScript", "PostgreSQL"],
      color: "from-[#91cf13] to-[#084a6b]"
    }
  ];

  return (
    <section id="proyectos" className="relative min-h-screen flex items-center pt-32 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 xl:pt-48 xl:pb-40 px-6 overflow-hidden">
      {/* Fondo oscuro igual que Hero */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(35,79,112,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Proyectos <span className="bg-gradient-to-r from-[#234f70] to-[#6fcc70] bg-clip-text text-transparent">Destacados</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experiencias digitales que han transformado negocios
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setActiveProject(project.id)}
              onHoverEnd={() => setActiveProject(null)}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
            >
              <div className="aspect-video relative overflow-hidden rounded-t-2xl">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-80 transition-opacity`} />
              </div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform">
                <span className="text-sm text-[#6fcc70] mb-2">{project.category}</span>
                <h3 className="text-3xl font-bold mb-3 text-white">{project.title}</h3>
                <div className="flex gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex items-center gap-2 text-sm hover:text-[#6fcc70] transition-colors text-white">
                    Ver Proyecto <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
