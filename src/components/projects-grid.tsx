"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { projectCategories, projects } from "@/data/projects";
import { ProjectCard } from "./project-card";

export function ProjectsGrid() {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>("Todos");
  const visible = filter === "Todos" ? projects : projects.filter(p => p.category === filter);
  return (
    <>
      <div className="filters" role="tablist" aria-label="Filtrar proyectos">
        {projectCategories.map(category => <button key={category} onClick={() => setFilter(category)} className={filter === category ? "active" : ""}>{category}</button>)}
      </div>
      <motion.div layout className="projects-grid">
        <AnimatePresence mode="popLayout">
          {visible.map(project => <motion.div layout key={project.slug} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .35 }}><ProjectCard project={project} /></motion.div>)}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
