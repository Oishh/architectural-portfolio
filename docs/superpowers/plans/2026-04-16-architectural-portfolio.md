# Architectural Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a cinematic dark-blue architectural portfolio with Next.js, showcasing 5 residential/commercial projects with scroll animations and editorial image layouts.

**Architecture:** Next.js 15 App Router with static data (no CMS). Home page is a single scroll with hero, about, project grid, CTA, and footer. Each project gets a dedicated detail page at `/projects/[slug]` with an editorial image gallery. Framer Motion handles all animations.

**Tech Stack:** Next.js 15, Tailwind CSS v4, Framer Motion, Google Fonts (Playfair Display, DM Sans), Vercel deployment

---

### Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `next.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `postcss.config.mjs`, `tsconfig.json`

- [ ] **Step 1: Create Next.js project**

Run from the `portfolio/` directory:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src=no --import-alias="@/*" --turbopack
```

If the directory is not empty, answer yes to proceed (it only has the `docs/` and `drive-download` folders).

- [ ] **Step 2: Install dependencies**

```bash
npm install framer-motion
```

- [ ] **Step 3: Configure next.config.ts for images**

Replace `next.config.ts` with:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
```

- [ ] **Step 4: Set up globals.css with custom theme**

Replace `app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  --color-bg-primary: #0B0F2A;
  --color-bg-card: #111638;
  --color-text-heading: #FFFFFF;
  --color-text-body: #B8BCD0;
  --color-accent: #2A3FCC;
  --color-accent-light: #4F63E8;
  --color-border-subtle: #1A2048;

  --font-heading: "Playfair Display", serif;
  --font-body: "DM Sans", sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-bg-primary);
  color: var(--color-text-body);
  font-family: var(--font-body);
}

::selection {
  background-color: var(--color-accent);
  color: white;
}
```

- [ ] **Step 5: Set up root layout with fonts**

Replace `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Architecture Portfolio",
  description: "Architectural design and 3D visualization portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Set up placeholder home page**

Replace `app/page.tsx` with:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="font-heading text-text-heading text-6xl font-bold">
        Portfolio
      </h1>
    </main>
  );
}
```

- [ ] **Step 7: Verify dev server runs**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify: dark blue background, white "Portfolio" heading in Playfair Display font.

- [ ] **Step 8: Commit**

```bash
git init
echo "node_modules/\n.next/\n.env*.local" > .gitignore
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind v4 and custom theme"
```

---

### Task 2: Copy and Organize Project Images

**Files:**
- Create: `public/projects/gabatin/`, `public/projects/chua/`, `public/projects/sta-isabel/`, `public/projects/doc/`, `public/projects/san-pablo/`

- [ ] **Step 1: Create project image directories**

```bash
mkdir -p public/projects/{gabatin,chua,sta-isabel,doc,san-pablo}
```

- [ ] **Step 2: Copy and rename images with a script**

Create and run a temporary script to copy images, converting filenames to kebab-case (lowercase, spaces to hyphens):

```bash
# Gabatin
for f in "drive-download-20260416T142648Z-3-001/GABATIN/"*.png; do
  name=$(basename "$f" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr '_' '-')
  cp "$f" "public/projects/gabatin/$name"
done

# Chua
for f in "drive-download-20260416T142648Z-3-001/CHUA/"*.png; do
  name=$(basename "$f" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr '_' '-')
  cp "$f" "public/projects/chua/$name"
done

# Sta Isabel
for f in "drive-download-20260416T142648Z-3-001/STA ISABEL/"*.png; do
  name=$(basename "$f" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr '_' '-')
  cp "$f" "public/projects/sta-isabel/$name"
done

# Doc
for f in "drive-download-20260416T142648Z-3-001/DOC/"*.png; do
  name=$(basename "$f" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr '_' '-')
  cp "$f" "public/projects/doc/$name"
done

# San Pablo (root-level files + subdirectories)
for f in "drive-download-20260416T142648Z-3-001/SAN PABLO/"*.png; do
  name=$(basename "$f" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr '_' '-')
  cp "$f" "public/projects/san-pablo/$name"
done
```

- [ ] **Step 3: Verify images copied**

```bash
ls public/projects/gabatin/ | head -5
ls public/projects/chua/ | head -5
ls public/projects/sta-isabel/ | head -5
ls public/projects/doc/ | head -5
ls public/projects/san-pablo/ | head -5
```

Each directory should contain renamed `.png` files.

- [ ] **Step 4: Commit**

```bash
git add public/projects/
git commit -m "feat: add project images organized by slug"
```

---

### Task 3: Project Data File

**Files:**
- Create: `data/projects.ts`

- [ ] **Step 1: Create the data directory**

```bash
mkdir -p data
```

- [ ] **Step 2: Write project data**

Create `data/projects.ts`. The `heroImage` and `gallery` entries reference the actual filenames copied in Task 2. After Task 2 completes, verify the actual filenames in `public/projects/` and adjust the paths below accordingly. The filenames below are based on the expected kebab-case conversion of the original filenames.

```ts
export type GalleryItem = {
  src: string;
  alt: string;
  layout: "full" | "pair" | "detail";
};

export type Project = {
  slug: string;
  name: string;
  type: "Residential" | "Commercial" | "Mixed";
  location: string;
  year: string;
  description: string;
  heroImage: string;
  gallery: GalleryItem[];
};

export const projects: Project[] = [
  {
    slug: "gabatin",
    name: "Gabatin Residence",
    type: "Residential",
    location: "Metro Manila, Philippines",
    year: "2024",
    description:
      "A modern two-storey residence featuring clean geometric lines, perforated screen facades, and warm material contrasts. The interior flows from open-plan living spaces to intimate private quarters, with natural light as a guiding design principle.",
    heroImage: "/projects/gabatin/ext1.png",
    gallery: [
      { src: "/projects/gabatin/ext1.png", alt: "Front exterior view", layout: "full" },
      { src: "/projects/gabatin/ext2.png", alt: "Exterior angle 2", layout: "pair" },
      { src: "/projects/gabatin/ext3.png", alt: "Exterior angle 3", layout: "pair" },
      { src: "/projects/gabatin/living-area.png", alt: "Living area", layout: "full" },
      { src: "/projects/gabatin/living-area-2.png", alt: "Living area alternate view", layout: "pair" },
      { src: "/projects/gabatin/kitchen.png", alt: "Kitchen", layout: "pair" },
      { src: "/projects/gabatin/dining.png", alt: "Dining area", layout: "detail" },
      { src: "/projects/gabatin/master-br-1.png", alt: "Master bedroom", layout: "full" },
      { src: "/projects/gabatin/masterbr-2.png", alt: "Master bedroom angle 2", layout: "pair" },
      { src: "/projects/gabatin/bedroom.png", alt: "Bedroom", layout: "pair" },
      { src: "/projects/gabatin/family-room.png", alt: "Family room", layout: "detail" },
      { src: "/projects/gabatin/garden.png", alt: "Garden", layout: "full" },
    ],
  },
  {
    slug: "chua",
    name: "Chua Residence",
    type: "Residential",
    location: "Metro Manila, Philippines",
    year: "2024",
    description:
      "An elegant residential interior defined by rich textures — natural stone feature walls, warm wood ceilings, and carefully curated lighting. Each space balances sophistication with comfort.",
    heroImage: "/projects/chua/scene-101.png",
    gallery: [
      { src: "/projects/chua/scene-101.png", alt: "Dining and living area", layout: "full" },
      { src: "/projects/chua/scene-102.png", alt: "Interior scene 2", layout: "pair" },
      { src: "/projects/chua/scene-103.png", alt: "Interior scene 3", layout: "pair" },
      { src: "/projects/chua/scene-104.png", alt: "Interior scene 4", layout: "detail" },
      { src: "/projects/chua/scene-109.png", alt: "Interior scene 5", layout: "full" },
      { src: "/projects/chua/scene-112.png", alt: "Interior scene 6", layout: "pair" },
      { src: "/projects/chua/scene-115-3.png", alt: "Interior detail", layout: "pair" },
      { src: "/projects/chua/scene-116-3.png", alt: "Interior detail 2", layout: "detail" },
      { src: "/projects/chua/scene-117-3.png", alt: "Interior detail 3", layout: "full" },
      { src: "/projects/chua/scene-118-3.png", alt: "Interior detail 4", layout: "pair" },
      { src: "/projects/chua/scene-119-2.png", alt: "Interior detail 5", layout: "pair" },
      { src: "/projects/chua/scene-120-2.png", alt: "Interior detail 6", layout: "detail" },
      { src: "/projects/chua/scene-121.png", alt: "Interior detail 7", layout: "full" },
      { src: "/projects/chua/scene-121-2.png", alt: "Interior detail 8", layout: "detail" },
    ],
  },
  {
    slug: "sta-isabel",
    name: "Sta. Isabel Residence",
    type: "Residential",
    location: "Metro Manila, Philippines",
    year: "2023",
    description:
      "A minimalist residential design with sloped wood ceilings and clean white interiors. The spaces feel open and airy, with natural materials providing warmth against the crisp architectural lines.",
    heroImage: "/projects/sta-isabel/image-1.png",
    gallery: [
      { src: "/projects/sta-isabel/image-1.png", alt: "Exterior view", layout: "full" },
      { src: "/projects/sta-isabel/image-2.png", alt: "View 2", layout: "pair" },
      { src: "/projects/sta-isabel/image-3.png", alt: "View 3", layout: "pair" },
      { src: "/projects/sta-isabel/image-4.png", alt: "View 4", layout: "detail" },
      { src: "/projects/sta-isabel/image-5.png", alt: "View 5", layout: "full" },
      { src: "/projects/sta-isabel/image-6.png", alt: "View 6", layout: "pair" },
      { src: "/projects/sta-isabel/image-7.png", alt: "View 7", layout: "pair" },
      { src: "/projects/sta-isabel/bedroom.png", alt: "Bedroom", layout: "full" },
      { src: "/projects/sta-isabel/master-br.png", alt: "Master bedroom", layout: "pair" },
      { src: "/projects/sta-isabel/maids-br.png", alt: "Secondary bedroom", layout: "pair" },
      { src: "/projects/sta-isabel/family-room.png", alt: "Family room", layout: "detail" },
    ],
  },
  {
    slug: "doc",
    name: "Doc Residence",
    type: "Residential",
    location: "Metro Manila, Philippines",
    year: "2023",
    description:
      "A classic-modern residential interior featuring elegant paneled walls, rich textiles, and warm ambient lighting. The design balances traditional aesthetics with contemporary comfort.",
    heroImage: "/projects/doc/scene-53.png",
    gallery: [
      { src: "/projects/doc/scene-53.png", alt: "Master bedroom", layout: "full" },
      { src: "/projects/doc/scene-54.png", alt: "Room view 2", layout: "pair" },
      { src: "/projects/doc/scene-55.png", alt: "Room view 3", layout: "pair" },
      { src: "/projects/doc/scene-56.png", alt: "Room view 4", layout: "detail" },
      { src: "/projects/doc/scene-57.png", alt: "Room view 5", layout: "full" },
      { src: "/projects/doc/scene-58.png", alt: "Room view 6", layout: "pair" },
      { src: "/projects/doc/scene-59.png", alt: "Room view 7", layout: "pair" },
      { src: "/projects/doc/scene-60.png", alt: "Room view 8", layout: "detail" },
      { src: "/projects/doc/scene-61.png", alt: "Room view 9", layout: "full" },
      { src: "/projects/doc/scene-62.png", alt: "Room view 10", layout: "pair" },
      { src: "/projects/doc/scene-63.png", alt: "Room view 11", layout: "pair" },
      { src: "/projects/doc/scene-64.png", alt: "Room view 12", layout: "detail" },
      { src: "/projects/doc/scene-65.png", alt: "Room view 13", layout: "full" },
    ],
  },
  {
    slug: "san-pablo",
    name: "San Pablo Clinic",
    type: "Commercial",
    location: "San Pablo, Philippines",
    year: "2024",
    description:
      "A modern medical clinic designed for patient comfort and operational efficiency. Clean lines, bright interiors, and thoughtful space planning create a welcoming healthcare environment.",
    heroImage: "/projects/san-pablo/lobby-2.png",
    gallery: [
      { src: "/projects/san-pablo/lobby-2.png", alt: "Clinic lobby", layout: "full" },
      { src: "/projects/san-pablo/waiting-rm2-1.png", alt: "Waiting room", layout: "pair" },
      { src: "/projects/san-pablo/cashier-2.png", alt: "Cashier area", layout: "pair" },
      { src: "/projects/san-pablo/nurse-stn-1.png", alt: "Nurse station", layout: "detail" },
      { src: "/projects/san-pablo/treatment-rm-1.png", alt: "Treatment room", layout: "full" },
      { src: "/projects/san-pablo/treatment-rm-2-1.png", alt: "Treatment room 2", layout: "pair" },
      { src: "/projects/san-pablo/treatment-rm3-1.png", alt: "Treatment room 3", layout: "pair" },
      { src: "/projects/san-pablo/doctors-rm-1.png", alt: "Doctor's room", layout: "detail" },
      { src: "/projects/san-pablo/patient-cr-2.png", alt: "Patient room", layout: "full" },
      { src: "/projects/san-pablo/admin-1.png", alt: "Admin office", layout: "pair" },
      { src: "/projects/san-pablo/staff-cr-2.png", alt: "Staff room", layout: "pair" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project;
  next: Project;
} {
  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { prev, next };
}
```

**Important:** After Task 2 completes, `ls` each `public/projects/` directory and verify the actual filenames match the `src` paths above. Adjust any mismatches — the filenames depend on the exact kebab-case conversion of the originals.

- [ ] **Step 3: Commit**

```bash
git add data/
git commit -m "feat: add static project data with gallery layouts"
```

---

### Task 4: ScrollReveal Component

**Files:**
- Create: `components/ScrollReveal.tsx`

- [ ] **Step 1: Create the components directory**

```bash
mkdir -p components
```

- [ ] **Step 2: Write ScrollReveal component**

Create `components/ScrollReveal.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
};

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 40,
  duration = 0.6,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/
git commit -m "feat: add ScrollReveal animation wrapper component"
```

---

### Task 5: Navbar Component

**Files:**
- Create: `components/Navbar.tsx`

- [ ] **Step 1: Write Navbar component**

Create `components/Navbar.tsx`:

```tsx
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
          ? "bg-bg-primary/80 backdrop-blur-md border-b border-border-subtle"
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

        {/* Desktop links */}
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
        </div>

        {/* Mobile hamburger */}
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

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg-primary/95 backdrop-blur-md border-b border-border-subtle overflow-hidden"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
```

- [ ] **Step 2: Add Navbar to root layout**

Update `app/layout.tsx` — add `import Navbar from "@/components/Navbar";` and place `<Navbar />` inside `<body>` before `{children}`:

```tsx
import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Architecture Portfolio",
  description: "Architectural design and 3D visualization portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify in browser**

Run dev server. Verify: transparent navbar at top with "STUDIO" logo and links. Scrolling causes backdrop blur. On mobile viewport, hamburger menu opens a drawer.

- [ ] **Step 4: Commit**

```bash
git add components/Navbar.tsx app/layout.tsx
git commit -m "feat: add responsive navbar with scroll blur effect"
```

---

### Task 6: Hero Section

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Write Hero component**

Create `components/Hero.tsx`:

```tsx
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
      {/* Background image with parallax */}
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

      {/* Text content */}
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

      {/* Scroll indicator */}
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
```

- [ ] **Step 2: Verify in browser**

Add `<Hero />` to `app/page.tsx` temporarily to verify. Check: full-viewport hero, staggered text animation on load, parallax on scroll, scroll indicator animating.

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add hero section with parallax and text reveal animations"
```

---

### Task 7: About Snippet Section

**Files:**
- Create: `components/AboutSnippet.tsx`

- [ ] **Step 1: Write AboutSnippet component**

Create `components/AboutSnippet.tsx`:

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/AboutSnippet.tsx
git commit -m "feat: add about snippet section with skill pills"
```

---

### Task 8: Project Card and Project Grid

**Files:**
- Create: `components/ProjectCard.tsx`, `components/ProjectGrid.tsx`

- [ ] **Step 1: Write ProjectCard component**

Create `components/ProjectCard.tsx`:

```tsx
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
```

- [ ] **Step 2: Write ProjectGrid component**

Create `components/ProjectGrid.tsx`:

```tsx
"use client";

import ScrollReveal from "./ScrollReveal";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectGrid() {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-widest text-accent mb-4">
            Portfolio
          </p>
          <h2 className="font-heading text-text-heading text-4xl md:text-5xl font-bold mb-16">
            Selected Projects
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify in browser**

Add ProjectGrid to the home page temporarily. Verify: 3-column grid on desktop, cards with images, hover zoom effect, staggered fade-in on scroll, clicking navigates to `/projects/[slug]` (404 is fine for now).

- [ ] **Step 4: Commit**

```bash
git add components/ProjectCard.tsx components/ProjectGrid.tsx
git commit -m "feat: add project grid with animated cards and hover effects"
```

---

### Task 9: CTA Section

**Files:**
- Create: `components/CTASection.tsx`

- [ ] **Step 1: Write CTASection component**

Create `components/CTASection.tsx`:

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/CTASection.tsx
git commit -m "feat: add CTA contact section"
```

---

### Task 10: Footer

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Write Footer component**

Create `components/Footer.tsx`:

```tsx
import Link from "next/link";

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Behance", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle py-12 px-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <Link
          href="/"
          className="font-heading text-text-heading text-xl font-bold tracking-tight"
        >
          STUDIO
        </Link>

        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-text-body text-sm hover:text-text-heading transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>

        <p className="text-text-body/50 text-sm">
          &copy; {new Date().getFullYear()} Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add footer with social links"
```

---

### Task 11: Assemble Home Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Wire up all sections in the home page**

Replace `app/page.tsx` with:

```tsx
import Hero from "@/components/Hero";
import AboutSnippet from "@/components/AboutSnippet";
import ProjectGrid from "@/components/ProjectGrid";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSnippet />
      <ProjectGrid />
      <CTASection />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Verify in browser**

Run dev server and visit `http://localhost:3000`. Check the full flow:
- Nav is sticky with blur on scroll
- Hero fills viewport with parallax image, staggered text, scroll indicator
- About section fades in on scroll with skill pills
- Project grid shows 5 cards with staggered reveal and hover zoom
- CTA section fades in
- Footer at bottom
- Smooth scroll works when clicking nav links
- Mobile responsive at 375px viewport

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble home page with all sections"
```

---

### Task 12: Project Detail Page — Hero and Description

**Files:**
- Create: `components/ProjectHero.tsx`, `app/projects/[slug]/page.tsx`

- [ ] **Step 1: Write ProjectHero component**

Create `components/ProjectHero.tsx`:

```tsx
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
```

- [ ] **Step 2: Create the project detail page**

Create the directory and file `app/projects/[slug]/page.tsx`:

```bash
mkdir -p app/projects/\[slug\]
```

Then create `app/projects/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/data/projects";
import ProjectHero from "@/components/ProjectHero";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js 15 makes params a Promise
  return params.then(({ slug }) => {
    const project = getProjectBySlug(slug);
    return {
      title: project ? `${project.name} — Architecture Portfolio` : "Project Not Found",
    };
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <ProjectHero project={project} />

      <section className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <p className="text-text-body text-lg leading-relaxed">
              {project.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
```

- [ ] **Step 3: Verify in browser**

Visit `http://localhost:3000/projects/gabatin`. Check: hero image with parallax, project name overlay, meta info, description fades in on scroll.

- [ ] **Step 4: Commit**

```bash
git add components/ProjectHero.tsx app/projects/
git commit -m "feat: add project detail page with hero and description"
```

---

### Task 13: Editorial Image Gallery

**Files:**
- Create: `components/GalleryImage.tsx`, `components/ProjectGallery.tsx`

- [ ] **Step 1: Write GalleryImage component**

Create `components/GalleryImage.tsx`:

```tsx
"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

type GalleryImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export default function GalleryImage({
  src,
  alt,
  priority = false,
}: GalleryImageProps) {
  return (
    <ScrollReveal>
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-bg-card">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 80vw"
          priority={priority}
        />
      </div>
    </ScrollReveal>
  );
}
```

- [ ] **Step 2: Write ProjectGallery component**

Create `components/ProjectGallery.tsx`:

```tsx
"use client";

import type { GalleryItem } from "@/data/projects";
import GalleryImage from "./GalleryImage";

export default function ProjectGallery({
  gallery,
}: {
  gallery: GalleryItem[];
}) {
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < gallery.length) {
    const item = gallery[i];

    if (item.layout === "full") {
      elements.push(
        <div key={i} className="w-full">
          <GalleryImage src={item.src} alt={item.alt} />
        </div>
      );
      i++;
    } else if (item.layout === "pair") {
      const next = gallery[i + 1];
      if (next && next.layout === "pair") {
        elements.push(
          <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GalleryImage src={item.src} alt={item.alt} />
            <GalleryImage src={next.src} alt={next.alt} />
          </div>
        );
        i += 2;
      } else {
        // Orphan pair item — render as detail
        elements.push(
          <div key={i} className="mx-auto w-full md:w-[70%]">
            <GalleryImage src={item.src} alt={item.alt} />
          </div>
        );
        i++;
      }
    } else if (item.layout === "detail") {
      elements.push(
        <div key={i} className="mx-auto w-full md:w-[70%]">
          <GalleryImage src={item.src} alt={item.alt} />
        </div>
      );
      i++;
    } else {
      i++;
    }
  }

  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-7xl flex flex-col gap-6">{elements}</div>
    </section>
  );
}
```

- [ ] **Step 3: Add gallery to the project detail page**

Update `app/projects/[slug]/page.tsx` — add the import and component between the description section and the footer:

Add import at the top:
```tsx
import ProjectGallery from "@/components/ProjectGallery";
```

Add after the description `</section>` and before `<Footer />`:
```tsx
      <ProjectGallery gallery={project.gallery} />
```

- [ ] **Step 4: Verify in browser**

Visit `http://localhost:3000/projects/gabatin`. Scroll through the gallery. Check:
- Full-width images span the content
- Pair images sit side-by-side on desktop, stack on mobile
- Detail images are centered at 70% width
- Each image fades in on scroll
- Images load lazily

- [ ] **Step 5: Commit**

```bash
git add components/GalleryImage.tsx components/ProjectGallery.tsx app/projects/
git commit -m "feat: add editorial image gallery with mixed layouts"
```

---

### Task 14: Next/Previous Project Navigation

**Files:**
- Create: `components/ProjectNav.tsx`

- [ ] **Step 1: Write ProjectNav component**

Create `components/ProjectNav.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectNav({
  prev,
  next,
}: {
  prev: Project;
  next: Project;
}) {
  return (
    <section className="border-t border-border-subtle">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Link
          href={`/projects/${prev.slug}`}
          className="group relative flex items-center gap-6 p-8 md:p-12 hover:bg-bg-card/50 transition-colors duration-300"
        >
          <div className="relative w-20 h-14 rounded-sm overflow-hidden shrink-0 bg-bg-card">
            <Image
              src={prev.heroImage}
              alt={prev.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="80px"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-text-body/50 mb-1">
              Previous
            </p>
            <p className="font-heading text-text-heading font-bold">
              {prev.name}
            </p>
          </div>
        </Link>

        <Link
          href={`/projects/${next.slug}`}
          className="group relative flex items-center justify-end gap-6 p-8 md:p-12 hover:bg-bg-card/50 transition-colors duration-300 border-t md:border-t-0 md:border-l border-border-subtle"
        >
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-text-body/50 mb-1">
              Next
            </p>
            <p className="font-heading text-text-heading font-bold">
              {next.name}
            </p>
          </div>
          <div className="relative w-20 h-14 rounded-sm overflow-hidden shrink-0 bg-bg-card">
            <Image
              src={next.heroImage}
              alt={next.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="80px"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add ProjectNav to the project detail page**

Update `app/projects/[slug]/page.tsx`:

Add import:
```tsx
import { projects, getProjectBySlug, getAdjacentProjects } from "@/data/projects";
import ProjectNav from "@/components/ProjectNav";
```

After the gallery and before `<Footer />`, add:
```tsx
      <ProjectNav {...getAdjacentProjects(project.slug)} />
```

- [ ] **Step 3: Verify in browser**

Visit `/projects/gabatin`. Scroll to bottom. Check: prev/next navigation shows with thumbnails, clicking navigates to the correct project. On the first project, "previous" wraps to the last.

- [ ] **Step 4: Commit**

```bash
git add components/ProjectNav.tsx app/projects/
git commit -m "feat: add next/previous project navigation"
```

---

### Task 15: Page Transitions

**Files:**
- Create: `components/PageTransition.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Write PageTransition component**

Create `components/PageTransition.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Wrap pages with PageTransition**

Update `app/page.tsx` — wrap the `<main>` contents with `<PageTransition>`:

```tsx
import Hero from "@/components/Hero";
import AboutSnippet from "@/components/AboutSnippet";
import ProjectGrid from "@/components/ProjectGrid";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <main>
        <Hero />
        <AboutSnippet />
        <ProjectGrid />
        <CTASection />
        <Footer />
      </main>
    </PageTransition>
  );
}
```

Do the same for `app/projects/[slug]/page.tsx` — wrap the `<main>` with `<PageTransition>`.

- [ ] **Step 3: Commit**

```bash
git add components/PageTransition.tsx app/page.tsx app/projects/
git commit -m "feat: add fade-in page transitions"
```

---

### Task 16: Final Polish and Responsive Verification

**Files:**
- Modify: `app/globals.css` (if needed)

- [ ] **Step 1: Run the dev server and test full flow**

```bash
npm run dev
```

Test checklist:
- [ ] Home page loads with all animations
- [ ] Nav blur works on scroll
- [ ] Hero parallax works
- [ ] About section fades in with skill pills
- [ ] Project grid shows 5 cards with staggered animation
- [ ] Hovering cards shows zoom effect
- [ ] Clicking a card navigates to project detail
- [ ] Project detail page shows hero with parallax
- [ ] Gallery renders full/pair/detail layouts correctly
- [ ] Next/prev navigation works and wraps
- [ ] CTA section renders
- [ ] Footer renders
- [ ] Mobile responsive (375px): hamburger nav, single column, stacked images
- [ ] Tablet responsive (768px): 2-column grid, side-by-side gallery pairs

- [ ] **Step 2: Fix any issues found during testing**

Address any layout, spacing, or animation issues discovered.

- [ ] **Step 3: Run build to verify no errors**

```bash
npm run build
```

Expected: build completes with no errors.

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: polish responsive layout and animation timing"
```

---

### Task 17: Production Build and Deploy Prep

- [ ] **Step 1: Verify production build locally**

```bash
npm run build && npm run start
```

Visit `http://localhost:3000` and do a quick smoke test of the home page and one project detail page.

- [ ] **Step 2: Commit final state**

```bash
git add -A
git commit -m "chore: verify production build"
```

The project is ready for `vercel deploy` or connecting the Git repo to Vercel.
