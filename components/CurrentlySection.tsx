"use client";

import ScrollReveal from "./ScrollReveal";
import { currently } from "@/data/currently";

const ROWS = [
  { key: "reading", label: "Reading" },
  { key: "visiting", label: "Visiting" },
  { key: "drawing", label: "Drawing" },
  { key: "thinking", label: "Thinking" },
] as const;

export default function CurrentlySection() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-widest text-accent mb-10">
            Currently · {currently.weekLabel}
          </p>
        </ScrollReveal>

        <dl className="flex flex-col gap-6">
          {ROWS.map((row, i) => {
            const value = currently[row.key];
            const isThinking = row.key === "thinking";
            return (
              <ScrollReveal key={row.key} delay={0.1 + i * 0.08}>
                <div className="grid grid-cols-[auto_1fr] md:grid-cols-[140px_1fr] gap-2 md:gap-8 items-baseline border-b border-border-subtle/60 pb-5">
                  <dt className="text-xs md:text-sm uppercase tracking-widest text-accent">
                    {row.label}
                  </dt>
                  <dd
                    className={
                      isThinking
                        ? "text-text-heading text-lg md:text-xl italic font-light leading-snug"
                        : "text-text-body text-base md:text-lg leading-snug"
                    }
                  >
                    {value}
                  </dd>
                </div>
              </ScrollReveal>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
