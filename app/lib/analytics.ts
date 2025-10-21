// Google Analytics configuration
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// Event tracking functions
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (globalThis.window?.gtag && GA_MEASUREMENT_ID) {
    globalThis.window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Specific tracking functions for your website
export const trackProjectView = (projectName: string) => {
  trackEvent('view_project', 'engagement', projectName);
};

export const trackContactClick = (method: string) => {
  trackEvent('contact_click', 'conversion', method);
};

export const trackWhatsAppClick = () => {
  trackEvent('whatsapp_click', 'conversion', 'floating_button');
};

export const trackFormSubmit = (formType: string) => {
  trackEvent('form_submit', 'conversion', formType);
};

export const trackNavigationClick = (section: string) => {
  trackEvent('navigation_click', 'engagement', section);
};

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}
