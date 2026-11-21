"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SECTION, FALLBACK_PROJECTS } from "@/app/work/content";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    num: "01",
    label: "Web",
    title: "Desarrollo a medida",
    description:
      "Sitios y plataformas rápidas que funcionan en cualquier pantalla.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 opacity-20 group-hover:opacity-60 transition-opacity duration-500">
        <rect x="4" y="8" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 14h32" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="9" cy="11" r="1.2" fill="currentColor"/>
        <circle cx="13" cy="11" r="1.2" fill="currentColor"/>
        <circle cx="17" cy="11" r="1.2" fill="currentColor"/>
      </svg>
    ),
    href: "/projects?cat=website",
  },
  {
    num: "02",
    label: "Diseño",
    title: "Diseño con identidad",
    description:
      "Dirección visual e interfaces que expresan la identidad de tu marca.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 opacity-20 group-hover:opacity-60 transition-opacity duration-500">
        <rect x="5" y="5" width="30" height="30" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="14" cy="15" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 28l9-8 6 6 5-5 10 9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    href: "/projects?cat=design",
  },
  {
    num: "03",
    label: "Sistemas",
    title: "Menos trabajo manual",
    description:
      "Herramientas e integraciones para conectar procesos y simplificar tu operación.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 opacity-20 group-hover:opacity-60 transition-opacity duration-500">
        <rect x="4" y="9" width="24" height="22" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M28 15l8-5v20l-8-5V15z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M13 16l7 4-7 4V16z" fill="currentColor" opacity="0.5"/>
      </svg>
    ),
    href: "/projects?cat=sistemas",
  },
];

export default function Work() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".work-item").forEach((item) => {
        gsap.from(item, {
          scrollTrigger: { trigger: item, start: "top 90%", toggleActions: "play none none none" },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      gsap.to(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "bottom 80%",
          end: "bottom 20%",
          scrub: 1,
        },
        opacity: 0,
        y: -50,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="work-section"
      className="cinematic-section relative w-full min-h-screen px-8 md:px-20 py-24 md:py-36 flex flex-col justify-center"
    >
      <div className="cinematic-copy max-w-xl w-full">

        {/* Header and Filters */}
        <div className="mb-14 md:mb-20">
          <p className="font-sans text-[10px] text-[#e1251b] tracking-[0.5em] uppercase mb-4 font-medium">
            {SECTION.label}
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2
              className="font-sans font-black tracking-tighter text-bone leading-none"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
            >
              {SECTION.heading}
            </h2>

            {/* Category pills — decorative only */}
            <div className="flex flex-wrap gap-2 lg:pb-2">
              {CATEGORIES.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="px-4 py-2 rounded-full text-[10px] md:text-xs font-medium tracking-widest uppercase transition-all duration-300 bg-transparent text-bone/40 border border-bone/10 hover:text-bone hover:border-bone/30"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 3 Category Cards */}
        <div className="grid gap-3 sm:grid-cols-2">
          {["even", "nuvzo", "sendglide", "wayakin-web"].map((id) => {
            const project = FALLBACK_PROJECTS.find((entry) => entry.id === id);
            return (
              <article key={id} className="cinematic-project work-item">
                <Link href={`/project/${id}`} className="block focus-visible:outline-2 focus-visible:outline-offset-[-2px]">
                  <img src={project.image_url} alt="" loading="lazy" width="1200" height="630" />
                  <h3 className="px-4 pt-3 text-sm font-semibold">{project.title}</h3>
                </Link>
                <p className="px-4 py-2 text-xs leading-relaxed text-bone/80">{project.description}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2 px-4 pb-4 pt-1 text-xs">
                  <Link href={`/project/${id}`} aria-label={`Ver ficha de ${project.title}`} className="text-bone/80 underline underline-offset-4">Ver ficha</Link>
                  <a href={project.link} aria-label={`Visitar sitio de ${project.title}`} target="_blank" rel="noopener noreferrer" className="text-bone underline underline-offset-4">Visitar sitio ↗</a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="flex flex-col">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.num}
              href={cat.href}
              className="work-item group relative flex items-start gap-8 py-10 md:py-14 border-b border-bone/8 hover:border-bone/20 transition-all duration-500"
            >
              {/* Left orange accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-[#e1251b] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />

              {/* Number */}
              <div className="pl-3 shrink-0 w-8 pt-1">
                <span className="font-mono text-[10px] text-bone/20 group-hover:text-[#e1251b] tracking-widest transition-colors duration-300">
                  {cat.num}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 translate-x-0 group-hover:translate-x-1.5 transition-transform duration-500 ease-out">
                <p className="font-sans text-[10px] text-bone/30 group-hover:text-[#e1251b]/70 tracking-[0.4em] uppercase font-light mb-2 transition-colors duration-300">
                  {cat.label}
                </p>
                <h3 className="font-sans text-xl md:text-2xl font-black text-bone tracking-tighter mb-3 group-hover:text-bone transition-colors duration-300">
                  {cat.title}
                </h3>
                <p className="font-sans text-sm text-bone/35 group-hover:text-bone/60 font-light leading-relaxed max-w-2xl transition-colors duration-300">
                  {cat.description}
                </p>

                <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] text-bone/20 group-hover:text-bone/55 tracking-widest uppercase transition-colors duration-200">
                  Ver proyectos
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </span>
              </div>

              {/* Icon */}
              <div className="hidden md:flex shrink-0 items-center pt-2 text-bone">
                {cat.icon}
              </div>
            </Link>
          ))}

          {/* 4th item — View Full Projects CTA */}
          <Link
            href="/projects"
            className="work-item group relative flex items-center gap-8 py-10 md:py-14 border-b border-bone/8 hover:border-bone/20 transition-all duration-500"
          >
            <div className="absolute left-0 top-0 bottom-0 w-px bg-[#e1251b] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />
            <div className="pl-3 shrink-0 w-8">
              <span className="font-mono text-[10px] text-bone/20 group-hover:text-[#e1251b] tracking-widest transition-colors duration-300">→</span>
            </div>
            <div className="flex-1 translate-x-0 group-hover:translate-x-1.5 transition-transform duration-500 ease-out">
              <p className="font-sans text-[10px] text-bone/30 group-hover:text-[#e1251b]/70 tracking-[0.4em] uppercase font-light mb-2 transition-colors duration-300">
                Portafolio completo
              </p>
              <h3 className="font-sans text-xl md:text-2xl font-black text-bone tracking-tighter group-hover:text-bone transition-colors duration-300">
                Ver todos los proyectos
              </h3>
            </div>
            <div className="hidden md:flex items-center gap-2 text-bone/20 group-hover:text-[#e1251b] transition-colors duration-300 pr-2">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M6 14h16M16 8l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}
