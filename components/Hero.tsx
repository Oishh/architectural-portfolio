"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const textLines = [
  { text: "John Doe", className: "font-heading text-text-heading text-5xl md:text-7xl lg:text-8xl font-bold" },
  { text: "Architect / Interior Designer", className: "font-heading text-text-body text-xl md:text-2xl lg:text-3xl font-light mt-4" },
  { text: "Crafting spaces that inspire living", className: "text-text-body/60 text-base md:text-lg mt-6 max-w-md" },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY }}
      >
        <Image
          src="/projects/gabatin/ext1.png"
          alt="Featured project"
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/90 to-bg-primary/40" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
        {textLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: "easeOut" }}
          >
            <p className={line.className}>{line.text}</p>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10"
        >
          <a
            href="#projects"
            className="inline-block px-8 py-3 border border-accent text-text-heading text-sm uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300"
          >
            View Projects
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-text-body/0 via-text-body/50 to-text-body/0" />
      </motion.div>
    </section>
  );
}
