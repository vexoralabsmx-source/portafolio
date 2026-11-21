"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { NAME, LOCATION, ROLE, WHATSAPP_URL } from "@/lib/portfolio";
import { trackClick } from "@/lib/trackClick";

const LINKS = [
  { label: "Sobre mí",   href: "/about"   },
  { label: "Contacto", href: "/contact" },
];

const SOCIAL_KEYS = [
  { key: "instagram", label: "Instagram" },
  { key: "github",    label: "GitHub"    },
  { key: "linkedin",  label: "LinkedIn"  },
  { key: "twitter",   label: "X"         },
  { key: "youtube",   label: "YouTube"   },
  { key: "behance",   label: "Behance"   },
  { key: "dribbble",  label: "Dribbble"  },
  { key: "whatsapp",  label: "WhatsApp"  },
];

export default function Footer() {
  const ref = useRef(null);
  const [socials, setSocials] = useState([{ label: "WhatsApp", href: WHATSAPP_URL }]);

  useEffect(() => {
    fetch("/api/settings?key=social_links")
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data?.value) return;
        const active = SOCIAL_KEYS.filter(s => data.value[s.key]?.trim()).map(s => ({
          label: s.label,
          href:  data.value[s.key].trim(),
        }));
        setSocials([...active.filter(({ label }) => label !== "WhatsApp"), { label: "WhatsApp", href: WHATSAPP_URL }]);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(48px)";
    el.style.transition = "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={ref} className="relative border-t border-bone/8 px-10 md:px-20 py-16">

      {/* top row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">

        {/* name + tagline */}
        <div>
          <p className="text-[10px] text-[#e1251b] tracking-[0.5em] uppercase mb-4 font-medium">
            {ROLE}
          </p>
          <h2
            className="font-black tracking-tighter leading-[0.85]"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            <span className="block text-bone">Miguel Ángel</span>
          </h2>
        </div>

        {/* nav + socials */}
        <div className="flex flex-col gap-8 md:items-end">
          <nav className="flex gap-8 text-[11px] uppercase tracking-[0.3em] font-medium">
            {LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-bone/40 hover:text-[#e1251b] transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </nav>

          {socials.length > 0 && (
            <div className="flex flex-wrap gap-8 text-[11px] uppercase tracking-[0.3em] font-medium">
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick(`social-${label.toLowerCase()}`, href)}
                  className="text-bone/25 hover:text-bone/70 transition-colors duration-300"
                >
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* divider */}
      <div className="w-full h-px bg-bone/8 mb-8" />

      {/* bottom row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <p
          className="text-[10px] text-bone/20 tracking-widest"
          style={{ fontFamily: '"Times New Roman", Times, serif', fontStyle: "italic" }}
        >
          {LOCATION}
        </p>
        <p className="text-[10px] text-bone/15 tracking-[0.3em] uppercase">
          © {new Date().getFullYear()} {NAME}.
        </p>
      </div>

    </footer>
  );
}
