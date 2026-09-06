import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProjectsGrid } from "@/components/projects-grid";
import { FinalCTA } from "@/components/final-cta";

export const metadata: Metadata = { title: "Proyectos", description: "Case studies de diseño web, plataformas, sistemas y branding digital creados por Miguel Ángel Dorantes Hernández." };

export default function ProjectsPage() {
  return <><PageHero eyebrow="PORTAFOLIO / 2024—2026" title={<>Proyectos que convierten ideas en <span className="gradient-text">productos digitales.</span></>} text="Webs, plataformas y sistemas construidos para comunicar mejor, operar con claridad y hacer que cada marca se sienta más grande."/><section className="section-shell projects-page section-pad"><ProjectsGrid /></section><FinalCTA/></>;
}
