import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { structuredData } from "./lib/seo/structured-data";
import GoogleAnalytics from "./components/GoogleAnalytics";

export { metadata } from "./lib/seo/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* CSS crítico inline para eliminar render-blocking */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS inline */
            .hero-buttons { position: relative; z-index: 20 !important; }
            .hero-scroll-indicator { position: absolute; z-index: 0 !important; }
            nav { position: fixed !important; top: 0 !important; z-index: 50 !important; width: 100% !important; }
            * { box-sizing: border-box; }
            
            /* Desactivar solo animaciones de Framer Motion en móvil */
            @media (max-width: 767px) {
              [data-framer-motion] { 
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                transform: none !important;
                opacity: 1 !important;
              }
              .hero-text-fallback { 
                color: #ffffff !important; 
                -webkit-text-fill-color: #ffffff;
              }
            }
          `
        }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
        {children}
      </body>
    </html>
  );
}
