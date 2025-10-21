import dynamic from 'next/dynamic';
import Navigation from './components/Navigation';
import Hero from './components/Hero';

// Lazy load para componentes below-the-fold
const Services = dynamic(() => import('./components/Services'));
const Process = dynamic(() => import('./components/Process'));
const Projects = dynamic(() => import('./components/Projects'));
const Contact = dynamic(() => import('./components/Contact'));
const Footer = dynamic(() => import('./components/Footer'));
const FloatingWhatsApp = dynamic(() => import('./components/FloatingWhatsApp'));

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Services />
      <Process />
      <Projects />
      <Contact />
      <Footer />
      <FloatingWhatsApp 
        phoneNumber="51970842545"
        message="Hola! Me interesa conocer más sobre tus servicios de desarrollo web."
      />
    </div>
  );
}
