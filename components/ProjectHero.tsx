"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";

export default function ProjectHero({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={ref} className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <Image
          src={project.heroImage}
          alt={project.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent" />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs uppercase tracking-widest text-accent mb-3"
          >
            {project.type}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading text-text-heading text-4xl md:text-6xl lg:text-7xl font-bold"
          >
            {project.name}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-6 mt-4 text-text-body text-sm"
          >
            <span>{project.location}</span>
            <span>{project.year}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
