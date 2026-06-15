"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectGrid() {
  // First card expanded by default so the row reads intentionally on load.
  const [active, setActive] = useState(0);

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

        <div
          className="flex flex-col md:flex-row gap-3 md:h-[62vh] md:min-h-[28rem]"
          onMouseLeave={() => setActive(0)}
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              active={active === i}
              onActivate={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
