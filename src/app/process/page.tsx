import type { Metadata } from "next";
import { processSteps } from "@/data/content";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { FinalCTA } from "@/components/final-cta";

export const metadata: Metadata = { title: "Proceso", description: "Un proceso claro para convertir ideas en productos digitales funcionales." };

export default function ProcessPage() {
  return <><PageHero eyebrow="PROCESO / 6 ETAPAS" title={<>Una ruta clara de la idea al <span className="gradient-text">producto final.</span></>} text="Menos incertidumbre, decisiones mejor explicadas y avances visibles. Cada etapa tiene un objetivo concreto."/>
    <section className="process-page section-shell section-pad"><div className="process-spine"/>{processSteps.map((step, i) => <Reveal className="process-step" key={step.number}><div className="step-number">{step.number}</div><div className="step-copy"><span>ETAPA {step.number}</span><h2>{step.title}</h2><p>{step.text}</p></div><div className="step-note">{step.note.split(" · ").map(note => <span key={note}>{note}</span>)}</div><div className="step-duration">{i < 2 ? "01—02 DÍAS" : i < 5 ? "SEGÚN ALCANCE" : "LANZAMIENTO"}</div></Reveal>)}</section>
    <section className="principles section-shell section-pad"><Reveal><span className="eyebrow">PRINCIPIOS DE TRABAJO</span><h2>Claridad en cada decisión.</h2></Reveal><div className="principle-grid">{[["01","Comunicación directa","Sabes qué se está haciendo, por qué y qué sigue."],["02","Diseño con intención","Cada detalle visual ayuda a comunicar o facilitar una acción."],["03","Pensado para escalar","La estructura no se rompe cuando el proyecto crece."]].map(([n,t,p]) => <Reveal className="principle-card glass" key={n}><span>{n}</span><h3>{t}</h3><p>{p}</p></Reveal>)}</div></section><FinalCTA/></>;
}
