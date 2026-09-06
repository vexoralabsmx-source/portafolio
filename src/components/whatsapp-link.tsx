import { MessageCircle } from "lucide-react";

export function WhatsAppLink({ className = "button secondary", label = "Contactar por WhatsApp" }: { className?: string; label?: string }) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const message = encodeURIComponent("Hola Miguel Ángel, vi tu portafolio y quiero platicar sobre un proyecto digital.");
  const href = number ? `https://wa.me/${number.replace(/\D/g, "")}?text=${message}` : `https://wa.me/?text=${message}`;
  return <a className={className} href={href} target="_blank" rel="noreferrer"><MessageCircle size={17}/>{label}</a>;
}
