"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurText from "./BlurText";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-label", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.4 });
      gsap.from(".hero-line",  { y: 90, opacity: 0, stagger: 0.1, duration: 1.1, ease: "power4.out", delay: 0.6 });
      
      // Premium staggered letter effect for the main name
      gsap.from(".hero-letter", { 
        y: 100, 
        opacity: 0, 
        rotateX: -40,
        stagger: 0.06, 
        duration: 1.2, 
        ease: "power4.out", 
        delay: 0.7 
      });

      gsap.from(".hero-sub",   { y: 30, opacity: 0, duration: 0.9, ease: "power3.out", delay: 1.4 });

      gsap.to(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "bottom 60%",
          end:   "bottom 10%",
          scrub: 1.2,
        },
        opacity: 0,
        y: -50,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero-section"
      ref={ref}
      className="cinematic-section relative min-h-[125svh] flex flex-col justify-center px-8 md:px-20 overflow-hidden"
    >
      <div className="cinematic-copy relative z-10 max-w-xl">
        <p className="hero-label text-[10px] md:text-xs text-[#e1251b] tracking-[0.2em] uppercase font-bold mb-6">
          Diseñador y desarrollador independiente
        </p>

        <h1
          className="font-black tracking-tighter leading-[0.75] mb-12 flex flex-col relative z-10 hero-clamp-text"
        >
          <span className="hero-line block ghost z-0">Hola, soy</span>
          <span className="block text-bone -mt-2 md:-mt-6 z-10 hero-perspective whitespace-nowrap">
            {"Miguel Ángel".split("").map((char, index) => (
              <span key={index} className="hero-letter inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </h1>

        <div className="max-w-lg hero-sub flex flex-col gap-6">
          <BlurText
            text="Transformo ideas en *experiencias digitales*, de la primera conversación al último detalle."
            delay={30}
            animateBy="words"
            direction="bottom"
            stepDuration={0.22}
            className="text-base md:text-[17px] text-bone/60 font-medium leading-[1.6]"
          />
          <BlurText
            text="Combino *estrategia*, *diseño UI/UX* y *desarrollo web* para crear productos digitales."
            delay={22}
            animateBy="words"
            direction="bottom"
            stepDuration={0.2}
            className="text-xs md:text-sm text-bone/75 font-light leading-relaxed"
          />
          <BlurText
            text="Trabajo desde *Puebla, México*, en sitios, plataformas y automatizaciones para marcas y emprendedores."
            delay={15}
            animateBy="words"
            direction="bottom"
            stepDuration={0.18}
            className="text-xs md:text-sm text-bone/75 font-light leading-relaxed"
          />

          <p className="mt-8 text-[10px] text-bone/40 tracking-[0.4em] uppercase font-medium">
            Explorar ↓
          </p>
        </div>
      </div>

    </section>
  );
}
