"use client";
import { WHATSAPP_URL, whatsappLink } from "@/lib/portfolio";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ContactLinks from "@/components/ContactLinks";
import { SECTION, COUNTRIES as COUNTRY_LIST } from "@/app/contact/content";
import { useGeoDialCode } from "@/hooks/useGeoDialCode";
import GradientBlinds from "@/components/GradientBlinds";

const boxInput =
  "cp-field w-full bg-bone/5 border border-bone/10 rounded-xl px-4 py-3 text-bone placeholder:text-bone/20 focus:outline-none focus:border-[#e1251b]/60 transition-colors duration-300 text-sm";

export default function ContactPage() {
  const ref = useRef(null);
  const [form, setForm] = useState({ name: "", contact: "", reason: "" });
  const [contactType, setContactType] = useState("email");
  const [selectedCC, setSelectedCC] = useState(COUNTRY_LIST[0]);
  const [showCCPicker, setShowCCPicker] = useState(false);
  const geoCode = useGeoDialCode();
  useEffect(() => { if (geoCode) setSelectedCC(geoCode); }, [geoCode]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleContactChange = (e) => {
    const val = e.target.value;
    setForm({ ...form, contact: val });
    setContactType((val.includes("@") || !val) ? "email" : "email");
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value.replace(/\D/g, ""));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contactType === "phone") {
      const fullNumber = selectedCC.code + phoneNumber;

      const message =
        `¡Hola, Miguel Ángel! Soy ${form.name}.\n\nMotivo: ${form.reason}\n\nMi número: +${fullNumber}`;
      window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.contact, message: form.reason }),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", contact: "", reason: "" });
        setPhoneNumber("");
      } else if (res.status === 429) {
        const data = await res.json();
        setStatus("error");
        setErrorMsg(data.error || "Alcanzaste el límite de mensajes de hoy. Intenta mañana.");
      } else {
        setStatus("error");
        setErrorMsg("No se pudo enviar el mensaje.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("No se pudo enviar el mensaje.");
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cp-label",   { y: 25, opacity: 0, duration: 0.5, delay: 0.4 });
      gsap.from(".cp-heading", { y: 70, opacity: 0, duration: 0.9, ease: "power4.out", delay: 0.6 });
      gsap.from(".cp-field",   { y: 35, opacity: 0, stagger: 0.12, duration: 0.65, delay: 0.8 });
      gsap.from(".cp-btn",     { y: 20, opacity: 0, duration: 0.5, delay: 1.2 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 pt-24 md:pt-20 pb-16 md:pb-24 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <GradientBlinds
          gradientColors={['#000000', '#e1251b', '#111111']}
          angle={45}
          noise={0.2}
          blindCount={12}
          blindMinWidth={50}
          spotlightRadius={0.7}
          spotlightSoftness={1.5}
          spotlightOpacity={0.6}
          mixBlendMode="screen"
        />
      </div>

      <p className="cp-label relative z-10 text-[10px] text-[#e1251b] tracking-[0.5em] uppercase mb-8 md:mb-12 font-semibold">
        {SECTION.label}
      </p>

      {/* Heading — shown on mobile at top, hidden on desktop (shown at right) */}
      <div className="md:hidden mb-8 relative z-10">
        <h1
          className="cp-heading font-black tracking-tighter leading-[0.88]"
          style={{ fontSize: "clamp(2.8rem, 12vw, 4rem)" }}
        >
          <span className="block text-bone">Construyamos</span>
          <span className="block text-bone">tu próximo</span>
          <span className="block ghost-orange">proyecto.</span>
        </h1>
      </div>

      <ContactLinks className="relative z-10 mb-8" />

      <div className="relative z-10 flex flex-col md:flex-row items-stretch gap-0 w-full max-w-7xl min-h-[65vh]">

        {/* LEFT — Form */}
        <div className="w-full md:w-[42%] pr-0 md:pr-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5" aria-label="Formulario de contacto">

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-bone/60 tracking-[0.3em] uppercase">Nombre</span>
              <input
                suppressHydrationWarning
                className={boxInput}
                type="text"
                placeholder="Tu nombre completo"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="flex gap-2">
              <button
                suppressHydrationWarning
                type="button"
                onClick={() => setContactType("email")}
                className={`flex-1 py-2 rounded-lg text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-200 ${
                  contactType === "email" ? "bg-[#e1251b] text-black" : "bg-bone/5 text-bone/60 hover:bg-bone/10"
                }`}
              >
                Email
              </button>
              <button
                suppressHydrationWarning
                type="button"
                onClick={() => setContactType("phone")}
                className={`flex-1 py-2 rounded-lg text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-200 ${
                  contactType === "phone" ? "bg-[#25D366] text-black" : "bg-bone/5 text-bone/60 hover:bg-bone/10"
                }`}
              >
                WhatsApp
              </button>
            </div>

            {contactType === "email" && (
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-bone/60 tracking-[0.3em] uppercase">Correo electrónico</span>
                <input
                  suppressHydrationWarning
                  className={boxInput}
                  type="email"
                  placeholder="correo@ejemplo.com"
                  required
                  value={form.contact}
                  onChange={handleContactChange}
                />
              </div>
            )}

            {contactType === "phone" && (
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-[#25D366]/60 tracking-[0.3em] uppercase">Teléfono (WhatsApp)</span>
                <div className="flex gap-2">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCCPicker(!showCCPicker)}
                      className="flex items-center gap-1.5 h-full bg-bone/5 border border-bone/10 rounded-xl px-3 py-3 text-sm text-bone hover:border-[#25D366]/40 transition-colors duration-200 whitespace-nowrap"
                    >
                      <span>{selectedCC.flag}</span>
                      <span className="text-bone/60">+{selectedCC.code}</span>
                      <span className="text-bone/30 text-xs">›</span>
                    </button>
                    {showCCPicker && (
                      <div className="absolute z-50 top-full left-0 mt-1 w-56 bg-[#111] border border-bone/10 rounded-xl overflow-y-auto max-h-56 shadow-2xl custom-scroll">
                        {COUNTRY_LIST.map((c) => (
                          <button
                            key={c.code + c.name}
                            type="button"
                            onClick={() => { setSelectedCC(c); setShowCCPicker(false); }}
                            className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-bone/5 transition-colors text-left ${
                              selectedCC.code === c.code && selectedCC.name === c.name ? "text-[#25D366]" : "text-bone/70"
                            }`}
                          >
                            <span>{c.flag}</span>
                            <span className="flex-1">{c.name}</span>
                            <span className="text-bone/30 text-xs">+{c.code}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <input
                    suppressHydrationWarning
                    className={boxInput}
                    type="tel"
                    placeholder="222 123 4567"
                    required={contactType === "phone"}
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-bone/60 tracking-[0.3em] uppercase">Tu idea</span>
              <textarea
                suppressHydrationWarning
                className={boxInput + " resize-none"}
                rows={4}
                placeholder="Cuéntame qué quieres construir…"
                required
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
              />
            </div>

            {status === "error" && (
              <p className="text-red-400 text-sm">{errorMsg || "No se pudo enviar el mensaje."} <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline">WhatsApp</a>.</p>
            )}

            {status === "sent" ? (
              <p className="cp-btn text-[#e1251b] text-sm uppercase tracking-widest font-bold">
                ¡Mensaje enviado!
              </p>
            ) : (
              <button
                suppressHydrationWarning
                type="submit"
                disabled={status === "sending"}
                className={`cp-btn w-full font-bold py-4 rounded-full text-sm uppercase tracking-widest transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed ${
                  contactType === "phone"
                    ? "bg-[#25D366] text-black hover:bg-[#1ebe5d]"
                    : "bg-[#e1251b] text-black hover:bg-[#f0463d]"
                }`}
              >
                {status === "sending" ? "Enviando…" : contactType === "phone" ? "Abrir WhatsApp →" : "Enviar mensaje"}
              </button>
            )}
          </form>
        </div>

        {/* DIVIDER */}
        <div className="hidden md:block w-px self-stretch bg-bone/10 mx-8" />

        {/* RIGHT — heading (desktop only) */}
        <div className="hidden md:flex w-full md:w-[58%] pl-0 md:pl-6 mt-16 md:mt-0 flex-col justify-end text-right">
          <h1
            className="cp-heading font-black tracking-tighter leading-[0.88]"
            style={{ fontSize: "clamp(2.6rem, 5.5vw, 6.5rem)" }}
          >
            <span className="block text-bone">Construyamos</span>
            <span className="block text-bone">tu próximo</span>
            <span className="block ghost-orange">proyecto.</span>
          </h1>
          <p className="cp-label mt-6 text-bone/20 text-sm font-light leading-relaxed text-right">
            Cuéntame qué quieres construir.
          </p>
        </div>

      </div>
    </section>
  );
}
