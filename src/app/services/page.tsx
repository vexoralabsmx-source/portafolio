import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "@/data/content";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { FinalCTA } from "@/components/final-cta";
import { ButtonLink } from "@/components/button-link";

export const metadata: Metadata = { title: "Servicios", description: "Desarrollo web, plataformas, automatización, UI/UX, branding digital y experiencias interactivas." };

export default function ServicesPage() {
  return <><PageHero eyebrow="SERVICIOS / CAPACIDADES" title={<>De la estrategia al código. <span className="gradient-text">Todo conectado.</span></>} text="Combino diseño, desarrollo y pensamiento de producto para construir herramientas digitales que se ven profesionales y resuelven necesidades reales."><ButtonLink href="/contact">Solicitar propuesta</ButtonLink></PageHero>
    <section className="service-detail-list section-shell section-pad">{services.map((service, index) => { const Icon = service.icon; return <Reveal className="service-detail" key={service.title}><div className="service-index">{service.number}</div><div className="service-icon"><Icon/></div><div><h2>{service.title}</h2><p>{service.text}</p><div className="benefit-list">{service.benefits.map(item => <span key={item}><Check/>{item}</span>)}</div></div><ArrowUpRight className="service-arrow"/></Reveal> })}</section>
    <section className="deliverables section-shell section-pad"><Reveal><span className="eyebrow">CADA PROYECTO INCLUYE</span><h2>La base para lanzar <span className="gradient-text">con confianza.</span></h2></Reveal><div className="deliverable-grid">{["Estrategia y estructura", "Diseño responsive", "Código limpio", "SEO técnico básico", "Optimización visual", "Acompañamiento al lanzar"].map((item, i) => <Reveal className="deliverable glass" delay={i*.04} key={item}><span>0{i+1}</span><b>{item}</b></Reveal>)}</div></section><FinalCTA/></>;
}
