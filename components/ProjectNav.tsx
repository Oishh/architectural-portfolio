"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectNav({
  prev,
  next,
}: {
  prev: Project;
  next: Project;
}) {
  return (
    <section className="border-t border-border-glass">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Link
          href={`/projects/${prev.slug}`}
          className="group relative flex items-center gap-6 p-8 md:p-12 hover:bg-bg-card/50 transition-colors duration-300"
        >
          <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-bg-card">
            <Image
              src={prev.heroImage}
              alt={prev.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="80px"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-text-body/50 mb-1">
              Previous
            </p>
            <p className="font-heading text-text-heading font-bold">
              {prev.name}
            </p>
          </div>
        </Link>

        <Link
          href={`/projects/${next.slug}`}
          className="group relative flex items-center justify-end gap-6 p-8 md:p-12 hover:bg-bg-card/50 transition-colors duration-300 border-t md:border-t-0 md:border-l border-border-glass"
        >
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-text-body/50 mb-1">
              Next
            </p>
            <p className="font-heading text-text-heading font-bold">
              {next.name}
            </p>
          </div>
          <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-bg-card">
            <Image
              src={next.heroImage}
              alt={next.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="80px"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
