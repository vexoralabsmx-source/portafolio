"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { projectCategories, projects } from "@/data/projects";
import { ProjectCard } from "./project-card";

export function ProjectsGrid() {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>("Todos");
  const visible = filter === "Todos" ? projects : projects.filter(p => p.category === filter);
  return (
    <>
      <div className="filters" role="group" aria-label="Filtrar proyectos">
        {projectCategories.map(category => <button key={category} aria-pressed={filter === category} onClick={() => setFilter(category)} className={filter === category ? "active" : ""}>{category}</button>)}
      </div>
      <motion.div layout={!reduced} className="projects-grid">
        <AnimatePresence mode="popLayout">
          {visible.map(project => <motion.div layout={!reduced} key={project.slug} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: reduced ? 0 : .35 }}><ProjectCard project={project} /></motion.div>)}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
