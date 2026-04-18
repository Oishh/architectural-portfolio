"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const tools = [
  { name: "AutoCAD", logo: "/logos/autocad.svg" },
  { name: "SketchUp", logo: "/logos/sketchup.svg" },
  { name: "Enscape", logo: "/logos/enscape.svg" },
  { name: "D5 Render", logo: "/logos/d5_render.png" },
  { name: "Photoshop", logo: "/logos/photoshop.svg" },
];

export default function ToolsSection() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-widest text-accent mb-4 text-center">
            Tools & Software
          </p>
          <h2 className="font-heading text-text-heading text-3xl md:text-4xl font-bold text-center mb-16">
            Software I Work With
          </h2>
        </ScrollReveal>

        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {tools.map((tool, i) => (
            <ScrollReveal key={tool.name} delay={i * 0.1}>
              <div className="flex flex-col items-center gap-3 group">
                <div className="w-16 h-16 md:w-20 md:h-20 relative transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={tool.logo}
                    alt={tool.name}
                    fill
                    className="object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <span className="text-text-body/60 text-sm group-hover:text-text-heading transition-colors duration-300">
                  {tool.name}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
