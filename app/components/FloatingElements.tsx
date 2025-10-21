'use client';

import React from 'react';
import { motion } from 'framer-motion';

const FloatingElements = () => {
  return (
    <>
      {/* Floating Element 1 */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 0.2,
          scale: 1,
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          opacity: { duration: 0.8, delay: 1 },
          scale: { duration: 0.8, delay: 1 },
          y: { duration: 5, repeat: Infinity, delay: 1 },
          rotate: { duration: 5, repeat: Infinity, delay: 1 }
        }}
        className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-[#234f70] to-[#6fcc70] rounded-2xl opacity-20 blur-xl"
      />
      
      {/* Floating Element 2 */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 0.2,
          scale: 1,
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          opacity: { duration: 0.8, delay: 1.2 },
          scale: { duration: 0.8, delay: 1.2 },
          y: { duration: 7, repeat: Infinity, delay: 1.2 },
          rotate: { duration: 7, repeat: Infinity, delay: 1.2 }
        }}
        className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-br from-[#084a6b] to-[#91cf13] rounded-full opacity-20 blur-xl"
      />
    </>
  );
};

export default FloatingElements;
