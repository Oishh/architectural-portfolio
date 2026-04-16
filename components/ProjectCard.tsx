"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    >
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-bg-card">
          <Image
            src={project.heroImage}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-bg-primary/20 group-hover:bg-bg-primary/40 transition-colors duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-xs uppercase tracking-widest text-text-body/70 mb-1">
              {project.type}
            </p>
            <h3 className="font-heading text-text-heading text-xl md:text-2xl font-bold">
              {project.name}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
