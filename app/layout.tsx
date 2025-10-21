import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { structuredData } from "./lib/seo/structured-data";
import GoogleAnalytics from "./components/GoogleAnalytics";

export { metadata } from "./lib/seo/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* DNS prefetch para servicios externos */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//challenges.cloudflare.com" />
        
        {/* Preload crítico para LCP */}
        <link rel="preload" href="/images/logos/isologo-code-200-ti.webp" as="image" />
        <link rel="preload" href="/images/logos/imagotipo-code-200-ti.webp" as="image" />
        
        {/* Preconnect para fuentes */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
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
