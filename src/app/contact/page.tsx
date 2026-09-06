import type { Metadata } from "next";
import { Clock3, MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { WhatsAppLink } from "@/components/whatsapp-link";

export const metadata: Metadata = { title: "Contacto", description: "Cotiza una web, plataforma, automatización o experiencia digital con Miguel Ángel Dorantes Hernández." };

export default function ContactPage() {
  return <><PageHero eyebrow="CONTACTO / NUEVOS PROYECTOS" title={<>Tu idea puede verse como una <span className="gradient-text">marca grande.</span></>} text="Cuéntame qué quieres construir. Responderé con preguntas claras, un siguiente paso concreto y una propuesta ajustada a tu proyecto."/>
    <section className="contact-layout section-shell section-pad"><div className="contact-aside"><Reveal><span className="eyebrow">HABLEMOS</span><h2>El primer paso es entender la idea.</h2><p>No necesitas tener todo definido. Comparte el objetivo, el contexto y lo que te gustaría mejorar; el resto lo estructuramos juntos.</p></Reveal><div className="contact-options"><Reveal className="contact-option glass"><MessageCircle/><div><span>RESPUESTA DIRECTA</span><b>WhatsApp</b></div><WhatsAppLink className="option-link" label="Abrir"/></Reveal></div><div className="availability"><span><i/><b>Disponible para proyectos</b></span><span><MapPin/> Puebla, México</span><span><Clock3/> GMT−6</span></div></div><Reveal delay={.1}><ContactForm/></Reveal></section>
    <section className="contact-note section-shell"><p>Normalmente respondo con una primera evaluación del proyecto y los datos que necesito para cotizar correctamente.</p></section></>;
}
