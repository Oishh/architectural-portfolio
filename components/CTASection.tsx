"use client";

import ScrollReveal from "./ScrollReveal";

const contactInfo = [
  {
    label: "Phone",
    value: "+63 927 571 1223",
    href: "tel:+639275711223",
  },
  {
    label: "Email",
    value: "lilainn.alcantara@gmail.com",
    href: "mailto:lilainn.alcantara@gmail.com",
  },
  {
    label: "Facebook",
    value: "alesandralilain",
    href: "https://www.facebook.com/alesandralilain",
  },
];

export default function CTASection() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="glass rounded-2xl p-12 md:p-20">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-widest text-accent mb-4 text-center">
              Contact
            </p>
            <h2 className="font-heading text-text-heading text-3xl md:text-5xl font-bold text-center">
              Let&apos;s Work Together
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="mt-6 text-text-body text-lg max-w-lg mx-auto text-center">
              Have a project in mind or just want to say hello? I&apos;d love to
              hear from you.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group text-center p-6 rounded-xl border border-border-glass hover:bg-white/[0.03] transition-all duration-300"
                >
                  <p className="text-xs uppercase tracking-widest text-text-body/50 mb-2">
                    {item.label}
                  </p>
                  <p className="text-text-heading text-sm md:text-base group-hover:text-accent-light transition-colors duration-200 break-all">
                    {item.value}
                  </p>
                </a>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="mt-12 text-center">
              <a
                href="mailto:lilainn.alcantara@gmail.com"
                className="inline-block px-10 py-4 bg-accent text-white text-sm uppercase tracking-widest hover:bg-accent-light transition-colors duration-300 rounded-full"
              >
                Get in Touch
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
