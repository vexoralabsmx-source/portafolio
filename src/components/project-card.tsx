import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "./project-visual";
import { Reveal } from "./reveal";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <Reveal className={`project-card ${featured ? "featured" : ""}`}>
      <div>
        <Link href={`/projects/${project.slug}`} className="project-visual-link" aria-label={`Ver caso de ${project.name}`}><ProjectVisual project={project} compact={!featured} /></Link>
        <div className="project-card-copy">
          <div><span>{project.index} / {project.category}</span><Link href={`/projects/${project.slug}`}><h3>{project.name}</h3></Link><p>{project.description}</p></div>
          <div className="project-actions">
            {project.liveUrl && <a className="project-live-link" href={project.liveUrl} target="_blank" rel="noreferrer">Visitar sitio <ArrowUpRight /></a>}
            <Link className="project-link-label" href={`/projects/${project.slug}`}>Ver caso <span className="project-arrow"><ArrowUpRight /></span></Link>
          </div>
        </div>
        <div className="tag-row">{project.tags.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div>
      </div>
    </Reveal>
  );
}
