import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "CODE 200 TI - Desarrollo Web Profesional",
    template: "%s | CODE 200 TI"
  },
  description: "Transformo ideas en experiencias digitales. Desarrollo sitios web modernos, sistemas personalizados y diseños que impulsan tu negocio al siguiente nivel. Servicios remotos desde Chiclayo, Perú.",
  keywords: [
    "desarrollo web perú",
    "desarrollo web chiclayo",
    "sitios web profesionales",
    "sistemas web personalizados",
    "diseño web",
    "programación web",
    "Laravel",
    "Angular",
    "WordPress",
    "SEO",
    "optimización web",
    "servicios remotos"
  ],
  authors: [{ name: "CODE 200 TI" }],
  creator: "CODE 200 TI",
  publisher: "CODE 200 TI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://code200ti.com',
    siteName: 'CODE 200 TI',
    title: 'CODE 200 TI - Desarrollo Web Profesional',
    description: 'Transformo ideas en experiencias digitales. Desarrollo sitios web modernos, sistemas personalizados y diseños que impulsan tu negocio al siguiente nivel.',
    images: [
      {
        url: '/images/logos/imagotipo-code-200-ti.webp',
        width: 1200,
        height: 630,
        alt: 'CODE 200 TI - Desarrollo Web Profesional',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CODE 200 TI - Desarrollo Web Profesional',
    description: 'Transformo ideas en experiencias digitales. Desarrollo sitios web modernos, sistemas personalizados y diseños que impulsan tu negocio al siguiente nivel.',
    images: ['/images/logos/imagotipo-code-200-ti.webp'],
  },
  alternates: {
    canonical: 'https://code200ti.com',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'tu-codigo-de-verificacion-google',
  },
};
