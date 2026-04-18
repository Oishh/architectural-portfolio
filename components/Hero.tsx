"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const nameLines = ["ALESANDRA", "LILAIN ALCANTARA"];

function AnimatedLine({
  text,
  baseDelay,
}: {
  text: string;
  baseDelay: number;
}) {
  return (
    <div className="overflow-hidden">
      <div className="flex flex-wrap">
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.8,
              delay: baseDelay + i * 0.03,
              ease: [0.65, 0, 0.35, 1],
            }}
            className="inline-block"
            style={{ marginRight: char === " " ? "0.3em" : "0.02em" }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

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
      <motion.div className="absolute inset-0 z-0" style={{ y: imageY }}>
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
        {/* Name — two lines, letters rise like buildings */}
        <div className="font-heading text-text-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
          <AnimatedLine text={nameLines[0]} baseDelay={0.2} />
          <AnimatedLine text={nameLines[1]} baseDelay={0.5} />
        </div>

        {/* Horizontal rule — draws in like a blueprint line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.65, 0, 0.35, 1] }}
          className="h-px w-48 bg-accent/60 origin-left mt-6"
        />

        {/* Subtitle — slides in from left */}
        <div className="overflow-hidden mt-6">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.7,
              delay: 1.1,
              ease: [0.65, 0, 0.35, 1],
            }}
            className="font-heading text-text-body text-xl md:text-2xl lg:text-3xl font-light normal-case tracking-normal"
          >
            Junior Architect / Apprentice
          </motion.p>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-text-body/60 text-base md:text-lg mt-6 max-w-md"
        >
          Crafting spaces that inspire living
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 1.8,
            ease: [0.65, 0, 0.35, 1],
          }}
          className="mt-10"
        >
          <a
            href="#projects"
            className="glass-light inline-block px-8 py-3 rounded-full text-text-heading text-sm uppercase tracking-widest hover:bg-accent/20 hover:border-accent/40 transition-all duration-300"
          >
            View Projects
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 2.2, duration: 0.5 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 2.2 },
        }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-text-body/0 via-text-body/50 to-text-body/0" />
      </motion.div>
    </section>
  );
}
