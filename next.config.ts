import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Seguridad
  poweredByHeader: false,
  
  // Optimizaciones de rendimiento
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  
  // Remover console.logs en producción
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Configuración de imágenes (solo lo no-default)
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  
  // Headers de seguridad y SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Redirecciones para SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
