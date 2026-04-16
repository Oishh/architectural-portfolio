"use client";

import ScrollReveal from "./ScrollReveal";

const skills = [
  "3D Visualization",
  "Residential Design",
  "Interior Design",
  "Commercial Design",
  "Space Planning",
];

export default function AboutSnippet() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <p className="font-heading text-text-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Designing spaces that blend form and function — where every detail
            serves a purpose and every room tells a story.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mt-8 text-text-body text-lg leading-relaxed max-w-2xl">
            With a passion for modern architecture and a keen eye for detail, I
            bring spaces to life through thoughtful design and photorealistic 3D
            visualization. From concept to completion, every project is an
            opportunity to create something meaningful.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-10 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 text-sm text-text-body border border-border-subtle rounded-full hover:border-accent hover:text-text-heading transition-colors duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
