import { Inter } from "next/font/google";
import "./globals.css";
import { structuredData } from "./lib/seo/structured-data";
import GoogleAnalytics from "./components/GoogleAnalytics";

export { metadata } from "./lib/seo/metadata";

// Configuración optimizada de fuente
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Mejor rendimiento
  variable: "--font-inter",
  preload: true, // Precarga para LCP
  fallback: ["system-ui", "arial"], // Fallback mientras carga
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Preconnect para Google Analytics/Tag Manager */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* DNS prefetch como fallback para navegadores antiguos */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Preload crítico para LCP - Solo en móvil */}
        <link rel="preload" href="/images/logos/isologo-code-200-ti.webp" as="image" media="(max-width: 768px)" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
        {children}
      </body>
    </html>
  );
}
