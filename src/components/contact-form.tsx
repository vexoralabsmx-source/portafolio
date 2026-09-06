"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const projectTypes = ["Web premium", "Plataforma web", "Sistema interno", "Automatización", "Branding digital", "UI/UX", "Otro"];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = ["Nueva solicitud de proyecto", "", ...Array.from(data.entries()).map(([key, value]) => `${key}: ${value}`)].join("\n");
    const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
    if (email) window.location.href = `mailto:${email}?subject=${encodeURIComponent("Nuevo proyecto — Portafolio")}&body=${encodeURIComponent(body)}`;
    else {
      try { await navigator.clipboard.writeText(body); }
      catch { setError("No se pudo copiar. Selecciona y copia tu mensaje para compartirlo por tu medio preferido."); return; }
    }
    setError("");
    setSent(true);
  };
  if (sent) return <div className="form-success glass"><CheckCircle2 /><h3>Tu brief está listo.</h3><p>{process.env.NEXT_PUBLIC_CONTACT_EMAIL ? "Se abrió tu aplicación de correo para enviarlo." : "Copié tu solicitud al portapapeles. Pégala en tu conversación para compartirla; aún no se ha enviado."}</p><button className="button secondary" onClick={() => setSent(false)}>Editar información</button></div>;
  return (
    <form className="contact-form glass" onSubmit={submit}>
      <div className="form-grid">
        <label><span>Nombre *</span><input required name="Nombre" placeholder="Tu nombre" /></label>
        <label><span>Empresa o proyecto *</span><input required name="Empresa o proyecto" placeholder="Nombre del proyecto" /></label>
        <label><span>Email *</span><input required type="email" name="Email" placeholder="tu@email.com" /></label>
        <label><span>WhatsApp</span><input name="WhatsApp" placeholder="+52 ..." /></label>
        <label><span>Tipo de proyecto *</span><select required name="Tipo de proyecto" defaultValue=""><option value="" disabled>Selecciona una opción</option>{projectTypes.map(type => <option key={type}>{type}</option>)}</select></label>
        <label><span>Presupuesto aproximado</span><select name="Presupuesto" defaultValue=""><option value="" disabled>Selecciona un rango</option><option>$5k – $15k MXN</option><option>$15k – $30k MXN</option><option>$30k – $60k MXN</option><option>$60k+ MXN</option><option>Por definir</option></select></label>
        <label className="full"><span>Cuéntame sobre tu idea *</span><textarea required name="Mensaje" rows={6} placeholder="Objetivo, fechas, funciones y cualquier detalle importante..." /></label>
      </div>
      <p role="status">{error}</p><div className="form-action"><p>{process.env.NEXT_PUBLIC_CONTACT_EMAIL ? "Prepararemos tu solicitud en tu aplicación de correo." : "Copia tu solicitud para compartirla por tu medio preferido."}</p><button className="button primary" type="submit">{process.env.NEXT_PUBLIC_CONTACT_EMAIL ? "Preparar correo" : "Copiar solicitud"} <ArrowUpRight size={17}/></button></div>
    </form>
  );
}
