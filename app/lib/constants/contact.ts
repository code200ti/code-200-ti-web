/**
 * Constantes de información de contacto
 * Centralizadas para facilitar el mantenimiento
 */

// Número de teléfono (incluye código de país 51)
export const PHONE_NUMBER = '51913735784';

// Número de teléfono con prefijo internacional (+)
export const PHONE_NUMBER_WITH_PREFIX = `+${PHONE_NUMBER}`;

// Número de teléfono formateado para mostrar (con espacios)
export const PHONE_NUMBER_FORMATTED = '+51 913 735 784';

// URL para enlace tel:
export const PHONE_TEL_LINK = `tel:${PHONE_NUMBER_WITH_PREFIX}`;

// URL para WhatsApp
export const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER}`;

// Re-exportar desde urls.ts para mantener compatibilidad
export { FACEBOOK_URL, LINKEDIN_URL } from './urls';

// Email de contacto
export const CONTACT_EMAIL = 'code200ti@gmail.com';

// Email mailto link
export const EMAIL_MAILTO_LINK = `mailto:${CONTACT_EMAIL}`;

