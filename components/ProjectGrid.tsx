"use client";

import ScrollReveal from "./ScrollReveal";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectGrid() {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-widest text-accent mb-4">
            Portfolio
          </p>
          <h2 className="font-heading text-text-heading text-4xl md:text-5xl font-bold mb-16">
            Selected Projects
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
