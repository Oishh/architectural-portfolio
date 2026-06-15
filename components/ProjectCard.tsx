"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  active: boolean;
  onActivate: () => void;
};

export default function ProjectCard({ project, active, onActivate }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      style={{ flexGrow: active ? 4 : 1 }}
      className="group relative h-72 md:h-auto overflow-hidden rounded-2xl ring-1 ring-black/10 transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent md:flex-[1_1_0%] md:basis-0"
    >
      <Image
        src={project.heroImage}
        alt={project.name}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 60vw"
      />

      {/* Dark scrim keeps on-image text legible regardless of the light theme */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
        <p className="text-[11px] uppercase tracking-[0.25em] text-white/70 mb-1.5">
          {project.type}
        </p>
        <h3 className="font-heading text-white text-xl md:text-2xl font-bold leading-tight whitespace-nowrap">
          {project.name}
        </h3>

        {/* Revealed when the card expands (always shown on mobile) */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-out ${
            active ? "md:max-h-24 md:opacity-100 md:mt-3" : "md:max-h-0 md:opacity-0 md:mt-0"
          } max-h-24 opacity-100 mt-3`}
        >
          <p className="text-white/80 text-sm whitespace-nowrap">
            {project.location} · {project.year}
          </p>
          <span className="mt-3 inline-flex items-center gap-2 text-white text-sm font-medium whitespace-nowrap">
            View project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
