'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const socialLinks = [
    { icon: <Github />, label: 'GitHub', href: '#' },
    { icon: <Linkedin />, label: 'LinkedIn', href: '#' },
    { icon: <Mail />, label: 'Email', href: 'mailto:contacto@code200ti.com' }
  ];

  const quickLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Proceso', href: '#proceso' },
    { name: 'Proyectos', href: '#proyectos' },
    { name: 'Contacto', href: '#contacto' }
  ];

  return (
    <footer className="relative py-16 px-6 bg-gray-900 text-white border-t border-gray-700">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <Image 
              src="/images/logos/isologo-code-200-ti-dark.webp" 
              alt="CODE 200 TI Logo"
              width={150}
              height={150}
              className="w-auto mb-4 mx-auto md:mx-0"
            />
            <p className="text-gray-400 text-sm max-w-xs mx-auto md:mx-0">
              Transformamos ideas en experiencias digitales con desarrollo web profesional.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 text-white">Navegación</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.querySelector(link.href);
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="text-gray-400 hover:text-[#6fcc70] transition-colors text-sm cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 text-white">Contacto</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="mailto:code200ti@gmail.com" className="hover:text-[#6fcc70] transition-colors">
                  code200ti@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+51970842545" className="hover:text-[#6fcc70] transition-colors">
                  +51 970 842 545
                </a>
              </li>
              <li className="text-gray-500">
                Chiclayo, Perú
              </li>
              <li className="text-gray-500 text-xs">
                Servicio remoto global
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-8 pt-8 border-t border-gray-800">
          {socialLinks.map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              whileHover={{ y: -5 }}
              className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-[#6fcc70]/20 rounded-full border border-gray-600 hover:border-[#6fcc70]/50 transition-all text-gray-300 hover:text-white"
              aria-label={social.label}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm">
          <p>© 2025 CODE 200 TI. Todos los derechos reservados.</p>
          <p className="mt-2 text-gray-500">Creando experiencias digitales increíbles.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
