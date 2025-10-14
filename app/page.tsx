import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

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
