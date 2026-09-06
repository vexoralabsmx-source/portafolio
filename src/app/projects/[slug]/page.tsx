import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { ProjectVisual } from "@/components/project-visual";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/button-link";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.name, description: project.description } : {};
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const current = projects.findIndex(p => p.slug === project.slug);
  const next = projects[(current + 1) % projects.length];
  return (
    <>
      <article className="case-study">
        <section className="case-hero section-shell" style={{ "--project-color": project.color } as React.CSSProperties}>
          <Reveal><Link className="back-link" href="/projects"><ArrowLeft/> Todos los proyectos</Link><span className="eyebrow">CASE STUDY / {project.index}</span><h1>{project.name}</h1><p>{project.type}</p></Reveal>
          <Reveal delay={.15} className="case-meta"><div><span>DISCIPLINA</span><b>{project.category}</b></div><div><span>AÑO</span><b>2024—2026</b></div><div><span>ROL</span><b>Design & Development</b></div></Reveal>
          {project.liveUrl && <Reveal delay={.22} className="case-live-action"><a className="button primary" href={project.liveUrl} target="_blank" rel="noreferrer">Visitar proyecto <ArrowUpRight size={17}/></a></Reveal>}
        </section>
        <section className="case-visual-wrap section-shell"><ProjectVisual project={project}/></section>
        <section className="case-intro section-shell section-pad"><Reveal><span className="eyebrow">EL PROYECTO</span><h2>{project.description}</h2></Reveal><Reveal delay={.15}><p>{project.solution}</p><div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></Reveal></section>
        <section className="case-duo section-shell"><Reveal className="case-panel glass"><span>01 / RETO</span><h3>La necesidad detrás del proyecto.</h3><p>{project.challenge}</p></Reveal><Reveal delay={.1} className="case-panel glass"><span>02 / SOLUCIÓN</span><h3>Una respuesta pensada de principio a fin.</h3><p>{project.solution}</p></Reveal></section>
        <section className="case-features section-shell section-pad"><div><span className="eyebrow">FUNCIONALIDADES</span><h2>Diseñado para ser útil, no solo verse bien.</h2></div><div className="feature-list">{project.features.map((feature, i) => <Reveal key={feature} className="feature-row"><span>0{i+1}</span><b>{feature}</b><Check/></Reveal>)}</div></section>
        <section className="case-gallery section-shell"><Reveal className="gallery-main"><ProjectVisual project={project} compact/></Reveal><Reveal className="gallery-stat glass"><span>RESULTADO</span><strong>01</strong><p>{project.result}</p></Reveal><Reveal className="gallery-tech glass"><span>STACK / SISTEMA</span>{project.tech.map(tech => <b key={tech}>{tech}</b>)}</Reveal></section>
        <section className="case-next section-shell section-pad"><span>SIGUIENTE PROYECTO</span><Link href={`/projects/${next.slug}`}><h2>{next.name}</h2><ArrowRight/></Link><ButtonLink href="/contact">Quiero un proyecto similar</ButtonLink></section>
      </article>
    </>
  );
}
