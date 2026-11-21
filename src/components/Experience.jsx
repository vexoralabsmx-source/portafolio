"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TECH, CREATIVE, EXPERIENCE } from "@/app/about/content";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const section = useRef(null);

  useLayoutEffect(() => {
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(section.current.querySelectorAll("[data-experience-reveal]"), {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.065,
        ease: "power3.out",
        scrollTrigger: { trigger: section.current, start: "top 65%", once: true },
      });
      gsap.to(section.current.querySelector(".cinematic-copy"), {
        y: -24,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "bottom 55%", end: "bottom 10%", scrub: true },
      });
    });
    return () => motion.revert();
  }, []);

  return (
    <section ref={section} id="experience-section" className="cinematic-section flex min-h-screen items-center px-8 py-24 md:px-20">
      <div className="cinematic-copy max-w-lg">
        <p data-experience-reveal className="cinematic-kicker">Experiencia y habilidades</p>
        <h2 data-experience-reveal className="cinematic-heading mb-8">Diseño y <span className="ghost">código.</span></h2>
        <ul data-experience-reveal className="mb-10 flex flex-wrap gap-2" aria-label="Tecnologías y áreas creativas">
          {[...TECH, ...CREATIVE].map(({ name, icon: Icon }) => (
            <li key={name} className="flex items-center gap-2 rounded-full border border-bone/25 bg-black/40 px-3 py-2 text-xs text-bone/90">
              <Icon aria-hidden="true" />{name}
            </li>
          ))}
        </ul>
        <h3 data-experience-reveal className="mb-3 text-sm font-semibold">Formación</h3>
        <ul className="space-y-3">
          {EXPERIENCE.map(({ role, period }) => (
            <li data-experience-reveal key={role} className="border-l border-[#fb9a61]/60 pl-4">
              <p className="text-sm text-bone">{role}</p>
              <p className="text-xs text-bone/70">{period}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
