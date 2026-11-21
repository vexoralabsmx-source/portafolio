"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiX, FiMail, FiCheckCircle } from "react-icons/fi";

export default function NewsletterPopup() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;

    const hasSubscribed = localStorage.getItem("newsletter_subscribed");
    const hasSeen = localStorage.getItem("newsletter_seen");
    if (!hasSubscribed && !hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const closePopup = () => {
    setIsOpen(false);
    localStorage.setItem("newsletter_seen", "true");
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "No se pudo completar la suscripción.");
      }

      setStatus("success");
      setMessage(data.message || "¡Suscripción confirmada!");
      localStorage.setItem("newsletter_subscribed", "true");
      
      // Auto close after success
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
      
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (pathname?.startsWith("/admin") || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#0a0a0a] border border-bone/10 rounded-3xl p-8 shadow-2xl animate-fade-in-up">
        <button 
          onClick={closePopup}
          className="absolute top-6 right-6 text-bone/40 hover:text-bone transition-colors"
        >
          <FiX size={24} />
        </button>

        <div className="mb-6">
          <div className="w-12 h-12 bg-[#e1251b]/10 text-[#e1251b] rounded-xl flex items-center justify-center mb-4">
            <FiMail size={24} />
          </div>
          <h2 className="text-2xl font-bold text-bone mb-2">Suscríbete al boletín</h2>
          <p className="text-bone/60 text-sm leading-relaxed">
            Recibe novedades sobre proyectos, desarrollo web y diseño.
          </p>
        </div>

        {status === "success" ? (
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-3 text-green-500">
            <FiCheckCircle size={20} />
            <span className="font-medium">{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-4">
            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo electrónico"
                className="w-full bg-bone/5 border border-bone/10 rounded-xl px-4 py-3 text-bone placeholder:text-bone/30 focus:outline-none focus:border-[#e1251b] transition-colors"
              />
            </div>
            
            {status === "error" && (
              <p className="text-red-500 text-xs">{message}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 bg-[#e1251b] text-black font-bold rounded-xl hover:bg-bone transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Suscribiendo…" : "Suscribirme"}
            </button>
          </form>
        )}
        
        <p className="text-[10px] text-bone/30 mt-4 text-center">
          Puedes cancelar la suscripción cuando quieras.
        </p>
      </div>
    </div>
  );
}
