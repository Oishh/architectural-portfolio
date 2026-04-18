"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-border-glass"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-20">
        <Link
          href="/"
          className="font-heading text-text-heading text-2xl font-bold tracking-tight"
        >
          STUDIO
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-text-body text-sm tracking-widest uppercase hover:text-text-heading transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/ALCANTARA_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-5 py-2 text-sm uppercase tracking-widest bg-accent text-white rounded-full hover:bg-accent-light transition-colors duration-200"
          >
            Resume
          </a>
        </div>

        <button
          className="md:hidden text-text-heading"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-b border-border-glass overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-text-body text-lg hover:text-text-heading transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="/ALCANTARA_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="inline-block w-fit px-5 py-2 text-sm uppercase tracking-widest bg-accent text-white rounded-full hover:bg-accent-light transition-colors duration-200"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
