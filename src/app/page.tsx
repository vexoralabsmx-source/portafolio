import { AnimatedHeading } from "@/components/animated-heading";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Code2, Layers, Sparkles } from "lucide-react";
import { ShardBackground } from "@/components/shard-background";
import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";
import { FinalCTA } from "@/components/final-cta";

export default function Home() {
  return <>
    <section className="studio-hero">
      <ShardBackground />
      <div className="section-shell studio-hero-inner">
        <div className="studio-topline"><span>DISEÑADOR & DESARROLLADOR INDEPENDIENTE</span><span>PUEBLA, MÉXICO ↗</span></div>
        <div className="studio-intro"><span className="studio-dot"/> Miguel Ángel Dorantes</div>
        <AnimatedHeading as="h1">Ideas claras.<br/>Diseño que<br/><em>deja huella.</em></AnimatedHeading>
        <div className="studio-hero-bottom"><p>Transformo ideas en experiencias digitales.<br/>Estrategia, diseño y código, de la primera<br className="desktop-break"/> conversación al último detalle.</p><div className="button-row"><ButtonLink href="#trabajo">Explorar proyectos</ButtonLink><Link className="text-link" href="/contact">Hablemos de tu idea <ArrowUpRight size={17}/></Link></div></div>
        <div className="studio-baseline"><a href="#trabajo"><ArrowDown size={15}/> SCROLL PARA EXPLORAR</a><span>DISEÑO CON INTENCIÓN. CÓDIGO CON PROPÓSITO.</span><b>PORTAFOLIO / 2026</b></div>
      </div>
    </section>
    <div className="discipline-strip"><div className="section-shell"><span>ESTRATEGIA</span><i>✳</i><span>DISEÑO UI/UX</span><i>✳</i><span>DESARROLLO WEB</span><i>✳</i><span>PRODUCTO DIGITAL</span><i>✳</i></div></div>
    <section id="trabajo" className="section-shell selected-work">
      <div className="editorial-heading"><div><span className="eyebrow">01 / TRABAJO SELECCIONADO</span><AnimatedHeading>Menos promesas.<br/><span>Más producto.</span></AnimatedHeading></div><div><p>Ideas que ya viven en la web.<br/>Cada proyecto, un reto distinto.<br/>El mismo cuidado por los detalles.</p><Link className="text-link" href="/projects">Ver los {projects.length} proyectos <ArrowUpRight size={18}/></Link></div></div>
      <div className="studio-projects">{projects.slice(0, 6).map(project => <ProjectCard key={project.slug} project={project}/>)}</div>
    </section>
    <section className="studio-capabilities section-shell"><div className="editorial-heading"><div><span className="eyebrow">02 / LO QUE PUEDO HACER POR TI</span><AnimatedHeading>De la idea<br/><span>a la realidad.</span></AnimatedHeading></div><p>Un solo punto de contacto.<br/>Una visión completa de tu producto.</p></div><div className="capability-grid">{[{icon:Sparkles,title:"Diseño con identidad",text:"Interfaces que expresan tu marca y hacen que cada interacción se sienta natural.",tags:"DIRECCIÓN VISUAL · UI/UX"},{icon:Code2,title:"Desarrollo a medida",text:"Webs rápidas y plataformas que funcionan tan bien como se ven. En cualquier pantalla.",tags:"WEBS · PLATAFORMAS · SISTEMAS"},{icon:Layers,title:"Menos trabajo manual",text:"Herramientas y automatizaciones para conectar procesos y simplificar tu operación.",tags:"AUTOMATIZACIÓN · INTEGRACIONES"}].map((item,i) => <Reveal className="capability" key={item.title}><div className="capability-top"><item.icon size={25}/><span>0{i+1}</span></div><h3>{item.title}</h3><p>{item.text}</p><span className="capability-tags">{item.tags}</span><Link href="/services" aria-label={`Conocer servicio: ${item.title}`}><ArrowUpRight size={22}/></Link></Reveal>)}</div></section>
    <section className="studio-about section-shell"><div className="about-signature" aria-hidden="true">m<span>d.</span><small>DISEÑO × CÓDIGO</small></div><div><span className="eyebrow">03 / DETRÁS DEL TRABAJO</span><AnimatedHeading>Curiosidad para explorar.<br/><span>Criterio para construir.</span></AnimatedHeading><p>Soy Miguel Ángel Dorantes Hernández. Empecé editando videos y encontré en el diseño y el desarrollo una forma de convertir la curiosidad en productos útiles. Hoy construyo desde Puebla, México, con atención a lo que se ve y a lo que lo hace funcionar.</p><Link className="text-link" href="/about">Un poco más sobre mí <ArrowUpRight size={18}/></Link></div></section>
    <FinalCTA/>
  </>;
}
