'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface GoogleAnalyticsProps {
  measurementId: string;
}

const GoogleAnalytics = ({ measurementId }: GoogleAnalyticsProps) => {
  useEffect(() => {
    // Configurar gtag
    if (globalThis.window?.gtag) {
      globalThis.window.gtag('config', measurementId, {
        page_title: document.title,
        page_location: globalThis.window.location.href,
      });
    }
  }, [measurementId]);

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            globalThis.window.dataLayer = globalThis.window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_title: document.title,
              page_location: globalThis.window.location.href,
            });
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
