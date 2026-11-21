export const NAME = "Miguel Ángel Dorantes Hernández";
export const LOCATION = "Puebla, México";
export const ROLE = "Diseñador y desarrollador independiente";
export const SITE_URL = "https://www.portafoliomike.xyz";
export const DESCRIPTION = "Diseño y desarrollo experiencias digitales desde Puebla, México. Webs, plataformas, UI/UX y automatizaciones.";
export const CONTACT_EMAIL = "miguebailey@gmail.com";
export const CONTACT_PHONE = "+52 220 330 9762";

const whatsappNumber = CONTACT_PHONE.replace(/\D/g, "");

export function whatsappLink(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_URL = whatsappLink("Hola Miguel Ángel, vi tu portafolio y quiero platicar sobre un proyecto digital.");
