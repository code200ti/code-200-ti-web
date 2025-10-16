'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, User, MessageSquare, Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // Configuración de EmailJS - Reemplaza con tus credenciales
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'tu_service_id';
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'tu_template_id';
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'tu_public_key';
  
  // Configuración de reCAPTCHA
  const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || 'tu_recaptcha_site_key';

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      info: "code200ti@gmail.com",
      description: "Escríbenos cuando quieras"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Teléfono",
      info: "+51 970 842 545",
      description: "Lun-Vie 9:00-18:00"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Ubicación",
      info: "Chiclayo, Perú",
      description: "Servicio remoto global"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Horarios",
      info: "Lun-Vie 9:00-18:00",
      description: "Respuesta en 24h"
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Verificar reCAPTCHA
      if (!captchaToken) {
        setError('Por favor, verifica que no eres un robot.');
        setIsSubmitting(false);
        return;
      }

      // Configurar los parámetros del template
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        recaptcha_token: captchaToken
      };

      // Enviar email usando EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('Email enviado exitosamente:', result);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
        setCaptchaToken(null);
      }, 3000);

    } catch (error) {
      console.error('Error al enviar email:', error);
      setError('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  if (isSubmitted) {
    return (
      <section id="contacto" className="relative py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center p-8 bg-gradient-to-r from-[#6fcc70]/10 to-[#91cf13]/10 rounded-2xl border border-[#6fcc70]/20"
          >
            <CheckCircle className="w-16 h-16 text-[#6fcc70] mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">¡Mensaje Enviado!</h3>
            <p className="text-gray-600">
              Te contactaremos pronto para discutir tu negocio.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="relative min-h-screen flex items-center pt-32 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 xl:pt-48 xl:pb-40 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            ¿Necesitas un <span className="bg-gradient-to-r from-[#234f70] to-[#6fcc70] bg-clip-text text-transparent">Sitio Web</span> Profesional?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Desarrollamos sitios web profesionales que impulsan el crecimiento de tu empresa.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold mb-6 text-gray-900">
                Información de <span className="bg-gradient-to-r from-[#234f70] to-[#6fcc70] bg-clip-text text-transparent">Contacto</span>
              </h3>
              <p className="text-gray-600 mb-8">
                Contáctanos para analizar tu proyecto
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -5 }}
                  className="p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:border-[#234f70]/50 hover:shadow-lg transition-all text-center"
                >
                  <div className="inline-block p-4 bg-gradient-to-r from-[#234f70] to-[#6fcc70] rounded-xl mb-4 text-white">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-gray-900">{item.title}</h4>
                  <p className="text-[#234f70] font-medium mb-1">{item.info}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="lg:pl-8"
          >
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-4 text-gray-900">
                Envíanos un <span className="bg-gradient-to-r from-[#234f70] to-[#6fcc70] bg-clip-text text-transparent">Mensaje</span>
              </h3>
              <p className="text-gray-600">
                Describe tu proyecto y te contactaremos pronto
              </p>
            </div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre o empresa"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#234f70] focus:outline-none transition-colors text-gray-900 placeholder:text-gray-500"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Tu email"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#234f70] focus:outline-none transition-colors text-gray-900 placeholder:text-gray-500"
                  />
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Cuéntanos sobre tu negocio..."
                    required
                    rows={4}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#234f70] focus:outline-none transition-colors resize-none text-gray-900 placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* reCAPTCHA v3 Invisible */}
              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={handleCaptchaChange}
                size="invisible"
                badge="bottomright"
              />

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-[#234f70] to-[#6fcc70] text-white font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar Mensaje
                  </>
                )}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
