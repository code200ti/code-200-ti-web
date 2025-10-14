'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface FloatingWhatsAppProps {
  phoneNumber: string;
  message?: string;
}

const FloatingWhatsApp = ({ phoneNumber, message = "Hola! Me interesa conocer más sobre tus servicios de desarrollo web." }: FloatingWhatsAppProps) => {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-20 h-20 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group cursor-pointer"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Image 
        src="/images/logos/whatsapp_logo_icon_147205.webp"
        alt="WhatsApp Icon"
        width={50}
        height={50}
        className="w-14 h-14"
      />
      
      {/* Tooltip */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        ¡Chatea con nosotros!
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
      </div>
    </motion.button>
  );
};

export default FloatingWhatsApp;
