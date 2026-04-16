"use client";

import ScrollReveal from "./ScrollReveal";

export default function CTASection() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="bg-bg-card border border-border-subtle rounded-sm p-12 md:p-20 text-center">
          <ScrollReveal>
            <h2 className="font-heading text-text-heading text-3xl md:text-5xl font-bold">
              Have a project in mind?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mt-6 text-text-body text-lg max-w-lg mx-auto">
              Let&apos;s collaborate and bring your vision to life. From concept
              to completion, I&apos;m here to help design spaces that matter.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <a
              href="mailto:hello@example.com"
              className="inline-block mt-10 px-10 py-4 bg-accent text-white text-sm uppercase tracking-widest hover:bg-accent-light transition-colors duration-300 rounded-sm"
            >
              Get in Touch
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
