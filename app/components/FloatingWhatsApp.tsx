'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { trackWhatsAppClick } from '../lib/analytics';

interface FloatingWhatsAppProps {
  phoneNumber: string;
  message?: string;
}

const FloatingWhatsApp = ({ phoneNumber, message = "Hola! Me interesa conocer más sobre tus servicios de desarrollo web." }: FloatingWhatsAppProps) => {
  const handleWhatsAppClick = () => {
    trackWhatsAppClick();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-20 h-20 flex items-center justify-center group cursor-pointer rounded-full hover:scale-110 active:scale-95 transition-transform duration-100"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        opacity: { duration: 0.3, delay: 0.4, ease: "easeOut" },
        scale: { duration: 0.3, delay: 0.4, ease: "easeOut" }
      }}
    >
      <Image 
        src="/images/logos/whatsapp_logo_icon_147205.webp"
        alt="WhatsApp Icon"
        width={50}
        height={50}
        className="w-14 h-14 pointer-events-none"
      />
      
      {/* Tooltip - Solo visible en hover, no interfiere con clics */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-100 whitespace-nowrap pointer-events-none">
        ¡Chatea con nosotros!
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
      </div>
    </motion.button>
  );
};

export default FloatingWhatsApp;
