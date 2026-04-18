# Personality Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Currently home-page section, a new `/notes` Field Notes route (index + detail), and a shared `PullQuote` component used on notes and project case studies.

**Architecture:** Next.js 16.2.4 App Router + first-party `@next/mdx`. Notes live as local `.mdx` files with `export const metadata = {…}` (no YAML frontmatter — Next's native pattern). Currently is a single static TS module. `lib/notes.ts` scans `content/notes/` at build time via `fs`/dynamic-import and returns typed summaries. All routes are statically generated.

**Tech Stack:** Next.js 16.2.4, React 19.2.4, TypeScript 5, Tailwind v4, Framer Motion 12, `@next/mdx`.

---

## Testing note (project convention)

This project has no unit test framework and the spec explicitly opted not to add one. "Test" steps here mean **build-based verification** (`tsc`, `next build`) and **manual browser verification** — which is how the existing codebase validates changes. The `next build` gate is non-negotiable: every task must leave the build green.

## Commit discipline

- One commit per task (after its build gate passes)
- Conventional-commit prefixes match existing history (`feat:`, `docs:`, `chore:`)
- Never commit if `next build` or `tsc --noEmit` fails

## Read-before-code

Before Tasks 1 and 6, check the relevant doc pages inside `node_modules/next/dist/docs/` per `AGENTS.md`:
- `01-app/02-guides/mdx.md` — MDX integration
- `01-app/03-api-reference/03-file-conventions/mdx-components.md` — `mdx-components.tsx` contract
- `01-app/03-api-reference/03-file-conventions/dynamic-routes.md` — `[slug]` conventions
- `01-app/03-api-reference/04-functions/generate-static-params.md` — static params shape

---

## File Structure

### New files
```
mdx-components.tsx                        # root-level MDX component map (Next convention)
app/notes/page.tsx                        # /notes index
app/notes/[slug]/page.tsx                 # /notes/<slug> detail
app/notes/not-found.tsx                   # 404 for draft/missing slugs
components/CurrentlySection.tsx           # home page section
components/PullQuote.tsx                  # shared (notes + projects)
components/Figure.tsx                     # MDX inline figure with caption
components/Aside.tsx                      # MDX tangential sidebar block
components/NoteCard.tsx                   # featured + list card on /notes index
components/NotesFilter.tsx                # client filter chips on /notes index
components/ProjectPullQuotes.tsx          # renders pullQuotes between description and gallery
data/currently.ts                         # Currently entry
lib/notes.ts                              # loadAllNotes / loadNote / filter helpers
content/notes/2026-04-14-monsoon.mdx      # seed essay
content/notes/2026-04-06-stair.mdx        # seed note
content/notes/2026-03-28-thresholds.mdx   # seed note
content/notes/2026-03-19-alexander.mdx    # seed essay
```

### Modified files
```
next.config.ts          # register @next/mdx + pageExtensions
package.json            # new deps
app/page.tsx            # insert <CurrentlySection /> between Hero and AboutSnippet
app/projects/[slug]/page.tsx    # render <ProjectPullQuotes /> between description and gallery
components/Navbar.tsx   # add Notes link (desktop + mobile)
data/projects.ts        # extend Project type with optional pullQuotes; seed gabatin with one
```

---

## Phase 0 — Environment

### Task 0.1 — Install MDX dependencies

**Files:**
- Modify: `package.json`
- Modify: `next.config.ts`

- [ ] **Step 1: Install deps**

Run:
```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```
Expected: install succeeds; `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react` land in `dependencies`; `@types/mdx` lands in `devDependencies`.

- [ ] **Step 2: Read current `next.config.ts`**

Run:
```bash
cat next.config.ts
```
Expected: shows the existing Next config. Note current export style (default import / ESM).

- [ ] **Step 3: Update `next.config.ts`**

Replace the contents of `next.config.ts` with:
```ts
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
```
If the existing `next.config.ts` already has options (e.g., image domains), preserve them by merging into the `nextConfig` object above.

- [ ] **Step 4: Verify build still runs**

Run:
```bash
npx tsc --noEmit
```
Expected: zero errors. The config change is a no-op until MDX files exist.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json next.config.ts
git commit -m "chore: enable @next/mdx and add mdx loader deps"
```

---

### Task 0.2 — Create `mdx-components.tsx` root file

**Files:**
- Create: `mdx-components.tsx`

Per Next's App Router contract, `mdx-components.tsx` is **required** at the project root to use `@next/mdx`.

- [ ] **Step 1: Create the file**

Create `mdx-components.tsx` at the project root with:
```tsx
import type { MDXComponents } from "mdx/types";
import PullQuote from "@/components/PullQuote";
import Figure from "@/components/Figure";
import Aside from "@/components/Aside";

const components: MDXComponents = {
  PullQuote,
  Figure,
  Aside,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
```

- [ ] **Step 2: Verify TS is fine with placeholder imports**

The imports above reference components that don't exist yet. We'll create them in Phase 2. `tsc --noEmit` will fail right now — that's expected.

Run:
```bash
npx tsc --noEmit
```
Expected: module-not-found errors for `@/components/PullQuote`, `@/components/Figure`, `@/components/Aside`. Do NOT commit yet.

- [ ] **Step 3: Hold commit until Phase 2**

Skip commit — Phase 2 creates the missing components and we'll commit the whole group there to keep main green. Leave `mdx-components.tsx` uncommitted on disk. (Alternative: stub each component with `export default () => null` here for an intermediate green commit. Choose this fallback if the executor prefers a clean per-task commit — the stubs get replaced in Phase 2.)

---

## Phase 1 — Data layer

### Task 1.1 — Create `data/currently.ts`

**Files:**
- Create: `data/currently.ts`

- [ ] **Step 1: Create the module**

```ts
export type CurrentlyEntry = {
  reading: string;
  visiting: string;
  drawing: string;
  thinking: string;
  weekLabel: string;
  updatedAt: string; // ISO date
};

export const currently: CurrentlyEntry = {
  reading: "A Pattern Language — Christopher Alexander",
  visiting: "Barangay Poblacion walkups, Makati",
  drawing: "Stair sections for tight-plan residences",
  thinking:
    "How do you design for Manila's heat without hiding from it?",
  weekLabel: "Week 16 of 2026",
  updatedAt: "2026-04-18",
};
```

- [ ] **Step 2: Type-check**

Run:
```bash
npx tsc --noEmit
```
Expected: the only remaining errors are the `mdx-components.tsx` placeholders from Task 0.2. `data/currently.ts` itself compiles clean.

- [ ] **Step 3: Commit**

```bash
git add data/currently.ts
git commit -m "feat: seed Currently entry data"
```

---

### Task 1.2 — Seed note MDX files

**Files:**
- Create: `content/notes/2026-04-14-monsoon.mdx`
- Create: `content/notes/2026-04-06-stair.mdx`
- Create: `content/notes/2026-03-28-thresholds.mdx`
- Create: `content/notes/2026-03-19-alexander.mdx`

- [ ] **Step 1: Create the essay — `2026-04-14-monsoon.mdx`**

```mdx
export const metadata = {
  title: "On designing with the monsoon, not against it",
  type: "essay",
  date: "2026-04-14",
  excerpt: "Manila's weather isn't a bug. It's the site. Six weeks of watching what happens when I stop treating humidity as the enemy.",
  draft: false,
};

For years I designed as if the rain were a problem to solve. Sloped roofs. Sealed envelopes. Drainage.

Then I spent six weeks on a project where the client wanted the opposite — he wanted to *feel* the rain. Not get wet, but know it was there. I didn't know how to do that at first.

<PullQuote attribution="Christopher Alexander">
  You can't solve a problem without knowing what you want.
</PullQuote>

The monsoon is not an enemy. It's a rhythm. Designing *with* it means choosing when to let the building be porous, when to be closed, when to modulate. It's a vocabulary of screens, awnings, and offsets — not walls.

I'm still learning it.
```

- [ ] **Step 2: Create the note — `2026-04-06-stair.mdx`**

```mdx
export const metadata = {
  title: "A stair I've walked past for years",
  type: "note",
  date: "2026-04-06",
  excerpt: "There's a concrete stair on Burgos that I only noticed last week, after a hundred times walking past.",
  draft: false,
};

There's a concrete stair on Burgos that I only noticed last week. The landings are sized so that two people carrying groceries can pass each other without turning. I checked — they are. The handrail ends a foot past the last tread, which is the quiet, right thing to do.

It's unremarkable on purpose. Whoever drew it was paying attention.
```

- [ ] **Step 3: Create the note — `2026-03-28-thresholds.mdx`**

```mdx
export const metadata = {
  title: "Thresholds, and why most are failing",
  type: "note",
  date: "2026-03-28",
  excerpt: "A threshold is a promise about what's on the other side. Most of ours lie.",
  draft: false,
};

A threshold is a promise about what's on the other side.

Most of the thresholds I walk through — lobbies, doorways, gates — lie. They promise intimacy and deliver a hallway. They promise grandeur and deliver a corridor. The mismatch is usually a budget decision, but it reads as carelessness.

A good threshold compresses just before it releases. You feel narrow, then wide. Lower, then higher. Cooler, then warmer. The body knows before the eyes do.
```

- [ ] **Step 4: Create the essay — `2026-03-19-alexander.mdx`**

```mdx
export const metadata = {
  title: "Reading Alexander again, slower this time",
  type: "essay",
  date: "2026-03-19",
  excerpt: "The second read isn't about patterns. It's about the posture you take toward a place before you draw anything.",
  draft: false,
};

I read *A Pattern Language* too fast the first time. I treated it like a cookbook.

The second read is different. The book isn't really about patterns. It's about the posture you take toward a place before you draw anything — listening for what's already working and refusing to flatten it.

<Aside>
  The patterns I find myself returning to aren't the famous ones. They're the small ones — "something roughly in the middle," "a place to wait." These feel like observations someone made while sitting still.
</Aside>

The hardest thing about this book is that it asks you to slow down at the exact moment the industry wants you to speed up.
```

- [ ] **Step 5: Build check — must pass with MDX present**

Run:
```bash
npx next build
```
Expected: build may still fail because `mdx-components.tsx` has broken imports. That's fine — we're just verifying the MDX files themselves compile. Look for `.mdx` compile errors specifically; if the errors are only about missing `@/components/*`, that's the Phase 2 gap, not these files.

- [ ] **Step 6: Commit**

```bash
git add content/notes/
git commit -m "feat: seed four Field Notes MDX entries"
```

---

### Task 1.3 — Create `lib/notes.ts` loader

**Files:**
- Create: `lib/notes.ts`

This module is the only place that scans `content/notes/` and normalizes metadata. Components consume the result.

- [ ] **Step 1: Install `reading-time`**

Run:
```bash
npm install reading-time
```

- [ ] **Step 2: Create the loader**

```ts
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import readingTime from "reading-time";

const NOTES_DIR = join(process.cwd(), "content/notes");

export type NoteType = "essay" | "note" | "field";

export type NoteMetadata = {
  title: string;
  type: NoteType;
  date: string;        // ISO
  excerpt: string;
  draft?: boolean;
};

export type NoteSummary = NoteMetadata & {
  slug: string;
  filename: string;
  readTimeMin: number;
  indexNumber: number; // newest → highest number (used as "No.04")
};

function fileToSlug(filename: string): string {
  // "2026-04-14-monsoon.mdx" -> "monsoon"
  return filename.replace(/\.mdx$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

function readBodyText(filename: string): string {
  const raw = readFileSync(join(NOTES_DIR, filename), "utf8");
  // Strip the `export const metadata = { ... };` block for word-count purposes.
  return raw.replace(/export\s+const\s+metadata\s*=\s*\{[\s\S]*?\};\s*/, "");
}

async function importMetadata(filename: string): Promise<NoteMetadata> {
  const mod = await import(`@/content/notes/${filename}`);
  return mod.metadata as NoteMetadata;
}

export async function loadAllNotes(): Promise<NoteSummary[]> {
  const files = readdirSync(NOTES_DIR).filter((f) => f.endsWith(".mdx"));

  const summaries = await Promise.all(
    files.map(async (filename) => {
      const metadata = await importMetadata(filename);
      const body = readBodyText(filename);
      const stats = readingTime(body);
      return {
        ...metadata,
        slug: fileToSlug(filename),
        filename,
        readTimeMin: Math.max(1, Math.round(stats.minutes)),
        indexNumber: 0, // filled below
      } satisfies NoteSummary;
    })
  );

  const visible = summaries
    .filter((n) => !n.draft)
    .sort((a, b) => b.date.localeCompare(a.date));

  // Assign index numbers — newest entry gets the highest No.
  visible.forEach((n, i) => {
    n.indexNumber = visible.length - i;
  });

  return visible;
}

export async function loadNote(
  slug: string
): Promise<{ summary: NoteSummary; filename: string } | null> {
  const all = await loadAllNotes();
  const match = all.find((n) => n.slug === slug);
  if (!match) return null;
  return { summary: match, filename: match.filename };
}

export function filterByType(
  notes: NoteSummary[],
  type: NoteType | "all"
): NoteSummary[] {
  if (type === "all") return notes;
  return notes.filter((n) => n.type === type);
}
```

- [ ] **Step 3: Type-check**

Run:
```bash
npx tsc --noEmit
```
Expected: no new errors from `lib/notes.ts`. (Existing mdx-components.tsx errors remain — fixed in Phase 2.)

- [ ] **Step 4: Commit**

```bash
git add lib/notes.ts package.json package-lock.json
git commit -m "feat: add notes loader with reading-time and draft filter"
```

---

## Phase 2 — Shared components

### Task 2.1 — `PullQuote` component

**Files:**
- Create: `components/PullQuote.tsx`

- [ ] **Step 1: Create the component**

```tsx
import type { ReactNode } from "react";

type PullQuoteProps = {
  attribution?: string;
  children: ReactNode;
};

export default function PullQuote({ attribution, children }: PullQuoteProps) {
  return (
    <figure className="my-10 border-l-2 border-accent pl-6 md:pl-8">
      <blockquote className="font-heading text-text-heading text-xl md:text-2xl font-light italic leading-snug">
        {children}
      </blockquote>
      {attribution && (
        <figcaption className="mt-3 text-sm text-text-body/70 uppercase tracking-widest">
          — {attribution}
        </figcaption>
      )}
    </figure>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: one fewer error than before (PullQuote import in `mdx-components.tsx` now resolves).

- [ ] **Step 3: No commit yet** — wait for 2.2 and 2.3 so the MDX map is complete.

---

### Task 2.2 — `Figure` MDX component

**Files:**
- Create: `components/Figure.tsx`

- [ ] **Step 1: Create the component**

```tsx
import Image from "next/image";

type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

export default function Figure({
  src,
  alt,
  caption,
  width = 1600,
  height = 900,
}: FigureProps) {
  return (
    <figure className="my-10">
      <div className="relative overflow-hidden rounded-sm">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
          sizes="(max-width: 768px) 100vw, 65ch"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs text-text-body/60 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: one fewer error. Only `Aside` remains.

---

### Task 2.3 — `Aside` MDX component

**Files:**
- Create: `components/Aside.tsx`

- [ ] **Step 1: Create the component**

```tsx
import type { ReactNode } from "react";

type AsideProps = {
  children: ReactNode;
};

export default function Aside({ children }: AsideProps) {
  return (
    <aside className="my-8 ml-0 md:ml-6 border-l border-border-subtle pl-5 text-text-body/80 text-[0.95em] leading-relaxed">
      {children}
    </aside>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: zero errors. All MDX imports now resolve.

- [ ] **Step 3: Build check**

Run: `npx next build`
Expected: build succeeds. MDX pipeline compiles the four seed notes (no route yet — they're sitting in `content/`, not `app/`).

- [ ] **Step 4: Commit the whole MDX component set together**

```bash
git add mdx-components.tsx components/PullQuote.tsx components/Figure.tsx components/Aside.tsx
git commit -m "feat: add PullQuote, Figure, Aside and wire into MDX components"
```

---

## Phase 3 — Home page Currently section

### Task 3.1 — `CurrentlySection` component

**Files:**
- Create: `components/CurrentlySection.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import Link from "next/link";
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
                        ? "font-heading text-text-heading text-lg md:text-xl italic font-light leading-snug"
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

        <ScrollReveal delay={0.6}>
          <Link
            href="/notes"
            className="inline-block mt-10 text-sm text-text-body/70 hover:text-accent transition-colors"
          >
            → More in Field Notes
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: zero errors.

- [ ] **Step 3: No commit yet** — commit together with 3.2.

---

### Task 3.2 — Insert CurrentlySection into home page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Read current home**

```bash
cat app/page.tsx
```

- [ ] **Step 2: Add import + usage**

Replace the imports block and return so the file reads:
```tsx
import Hero from "@/components/Hero";
import CurrentlySection from "@/components/CurrentlySection";
import AboutSnippet from "@/components/AboutSnippet";
import ToolsSection from "@/components/ToolsSection";
import ProjectGrid from "@/components/ProjectGrid";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <main>
        <Hero />
        <CurrentlySection />
        <AboutSnippet />
        <ToolsSection />
        <ProjectGrid />
        <CTASection />
        <Footer />
      </main>
    </PageTransition>
  );
}
```

- [ ] **Step 3: Dev-server smoke check**

Run:
```bash
npx next dev
```
Then in a browser, open `http://localhost:3000/` and scroll — Currently should appear between Hero and About. Labels in gold, rows animate in on scroll, "→ More in Field Notes" link at the bottom (will 404 until Phase 4). Stop the dev server.

- [ ] **Step 4: Build check**

Run: `npx next build`
Expected: success.

- [ ] **Step 5: Commit**

```bash
git add components/CurrentlySection.tsx app/page.tsx
git commit -m "feat: add Currently section to home page"
```

---

## Phase 4 — Field Notes routes

### Task 4.1 — `NoteCard` component

**Files:**
- Create: `components/NoteCard.tsx`

This is a dumb presentational component used in Task 4.2 for both the featured and list variants.

- [ ] **Step 1: Create the component**

```tsx
import Link from "next/link";
import type { NoteSummary } from "@/lib/notes";

const TYPE_LABEL: Record<NoteSummary["type"], string> = {
  essay: "Essay",
  note: "Note",
  field: "Field Note",
};

function formatDate(iso: string): string {
  // "2026-04-14" -> "Apr 14, 2026"
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type CardProps = {
  note: NoteSummary;
  variant: "featured" | "list";
};

export default function NoteCard({ note, variant }: CardProps) {
  if (variant === "featured") {
    return (
      <Link
        href={`/notes/${note.slug}`}
        className="group block border-t-2 border-text-heading pt-5"
      >
        <p className="text-[10px] uppercase tracking-[0.18em] text-accent mb-3">
          Featured · {TYPE_LABEL[note.type]}
        </p>
        <h3 className="font-heading text-text-heading text-3xl md:text-4xl font-bold leading-tight group-hover:text-accent transition-colors">
          {note.title}
        </h3>
        <p className="mt-4 text-text-body/80 text-base md:text-lg leading-relaxed max-w-prose">
          {note.excerpt}
        </p>
        <p className="mt-5 text-xs text-text-body/50 uppercase tracking-widest">
          {formatDate(note.date)} · {note.readTimeMin} min
        </p>
      </Link>
    );
  }

  return (
    <Link
      href={`/notes/${note.slug}`}
      className="group block border-t border-border-subtle pt-4 pb-1"
    >
      <p className="text-[10px] uppercase tracking-widest text-text-body/50 mb-1">
        {TYPE_LABEL[note.type]}
      </p>
      <h4 className="text-text-heading text-base font-semibold leading-snug group-hover:text-accent transition-colors">
        {note.title}
      </h4>
      <p className="mt-2 text-[11px] text-text-body/50 uppercase tracking-widest">
        {formatDate(note.date)}
      </p>
    </Link>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: zero errors.

- [ ] **Step 3: No commit yet** — goes with 4.2/4.3.

---

### Task 4.2 — `NotesFilter` client component

**Files:**
- Create: `components/NotesFilter.tsx`

The filter is client-side because it reacts to URL query changes without a full navigation.

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { NoteType } from "@/lib/notes";

const CHIPS: { value: NoteType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "essay", label: "Essays" },
  { value: "note", label: "Notes" },
  { value: "field", label: "Field" },
];

export default function NotesFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const active = (params.get("tag") as NoteType | null) ?? "all";

  function setFilter(value: NoteType | "all") {
    const next = new URLSearchParams(params.toString());
    if (value === "all") next.delete("tag");
    else next.set("tag", value);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <div className="flex flex-wrap gap-2 mt-12 mb-8" role="tablist" aria-label="Filter notes">
      {CHIPS.map((chip) => {
        const isActive = active === chip.value;
        return (
          <button
            key={chip.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => setFilter(chip.value)}
            className={`px-4 py-1.5 text-xs uppercase tracking-widest rounded-full border transition-colors ${
              isActive
                ? "border-accent text-text-heading bg-accent/10"
                : "border-border-subtle text-text-body/60 hover:text-text-heading hover:border-text-heading"
            }`}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: zero errors.

---

### Task 4.3 — `/notes` index page

**Files:**
- Create: `app/notes/page.tsx`

The page is an RSC that loads notes, then client-filters via a small wrapper. Strategy: SSR the full list, let `NotesFilter` toggle CSS visibility by reading `?tag=` on the client. Simpler than hydrating a filtered list from server-side params — still fully static.

- [ ] **Step 1: Create the page**

```tsx
import type { Metadata } from "next";
import { loadAllNotes } from "@/lib/notes";
import NoteCard from "@/components/NoteCard";
import NotesFilter from "@/components/NotesFilter";
import PageTransition from "@/components/PageTransition";
import type { NoteType } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Field Notes",
  description:
    "Dispatches and essays from practice — reading, buildings, drawings, questions.",
};

export default async function NotesIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const [notes, { tag }] = await Promise.all([
    loadAllNotes(),
    searchParams,
  ]);

  const visible = tag ? notes.filter((n) => n.type === (tag as NoteType)) : notes;
  const [featured, ...rest] = visible;

  return (
    <PageTransition>
      <main className="pt-28 pb-24 px-6">
        <div className="mx-auto max-w-6xl">
          <header className="mb-12">
            <p className="text-xs uppercase tracking-widest text-accent mb-3">
              Field Notes · Vol. 01
            </p>
            <h1 className="font-heading text-text-heading text-4xl md:text-6xl font-bold leading-tight">
              Dispatches and essays
              <br />
              from practice.
            </h1>
          </header>

          <NotesFilter />

          {visible.length === 0 ? (
            <p className="text-text-body/60 italic mt-16">
              Nothing here yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 mt-8">
              <div>{featured && <NoteCard note={featured} variant="featured" />}</div>
              <div className="flex flex-col gap-6">
                {rest.map((note) => (
                  <NoteCard key={note.slug} note={note} variant="list" />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </PageTransition>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: zero errors.

- [ ] **Step 3: Build check**

Run: `npx next build`
Expected: success. `/notes` listed in the build output as a dynamic server-rendered page (because of `searchParams`); that's fine — it still prerenders static content and re-uses params client-side.

- [ ] **Step 4: Smoke check**

Run: `npx next dev`
Visit `http://localhost:3000/notes` — four notes listed, "monsoon" is featured on the left, filter chips work (`?tag=essay` filters down, `?tag=notInList` shows empty state via a typo test). Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add components/NoteCard.tsx components/NotesFilter.tsx app/notes/page.tsx
git commit -m "feat: add /notes index with featured + filter"
```

---

### Task 4.4 — `/notes/[slug]` detail page + not-found

**Files:**
- Create: `app/notes/[slug]/page.tsx`
- Create: `app/notes/not-found.tsx`

- [ ] **Step 1: Create the detail page**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { loadAllNotes, loadNote } from "@/lib/notes";
import PageTransition from "@/components/PageTransition";

type Params = { slug: string };

const TYPE_LABEL = { essay: "Essay", note: "Note", field: "Field Note" } as const;

export async function generateStaticParams(): Promise<Params[]> {
  const notes = await loadAllNotes();
  return notes.map((n) => ({ slug: n.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loaded = await loadNote(slug);
  if (!loaded) return { title: "Not found" };
  const { summary } = loaded;
  return {
    title: `${summary.title} — Field Notes`,
    description: summary.excerpt,
  };
}

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function NotePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const loaded = await loadNote(slug);
  if (!loaded) notFound();
  const { summary, filename } = loaded;

  // Dynamic import the MDX module to pick up the default-exported component.
  const { default: MDXBody } = await import(`@/content/notes/${filename}`);

  const all = await loadAllNotes();
  const idx = all.findIndex((n) => n.slug === slug);
  const nextNewer = idx > 0 ? all[idx - 1] : null;

  return (
    <PageTransition>
      <main className="pt-28 pb-24 px-6">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/notes"
            className="text-xs uppercase tracking-widest text-accent hover:text-text-heading transition-colors"
          >
            ← Field Notes
          </Link>

          <header className="mt-10 mb-12">
            <p className="text-[10px] uppercase tracking-[0.22em] text-text-body/50 mb-4">
              No.{String(summary.indexNumber).padStart(2, "0")} ·{" "}
              {TYPE_LABEL[summary.type]} · {formatDate(summary.date)} ·{" "}
              {summary.readTimeMin} min
            </p>
            <h1 className="font-heading text-text-heading text-4xl md:text-5xl font-bold leading-tight">
              {summary.title}
            </h1>
          </header>

          <article className="prose-reading text-text-body text-lg leading-relaxed font-heading font-light">
            <MDXBody />
          </article>

          <footer className="mt-20 pt-8 border-t border-border-subtle flex items-center justify-between">
            <Link
              href="/notes"
              className="text-sm text-text-body/60 hover:text-accent transition-colors"
            >
              ← Back to Field Notes
            </Link>
            {nextNewer && (
              <Link
                href={`/notes/${nextNewer.slug}`}
                className="text-sm text-text-body/60 hover:text-accent transition-colors text-right max-w-[50%]"
              >
                Next newer: {nextNewer.title} →
              </Link>
            )}
          </footer>
        </div>
      </main>
    </PageTransition>
  );
}
```

- [ ] **Step 2: Create `app/notes/not-found.tsx`**

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="pt-40 pb-24 px-6 text-center">
      <p className="text-xs uppercase tracking-widest text-accent mb-4">404</p>
      <h1 className="font-heading text-text-heading text-4xl md:text-5xl font-bold mb-6">
        That note doesn't exist.
      </h1>
      <Link href="/notes" className="text-accent underline">
        Back to Field Notes
      </Link>
    </main>
  );
}
```

- [ ] **Step 3: Add prose typography styles**

The `.prose-reading` class controls paragraph rhythm for the MDX body. The project's `globals.css` defines CSS variables with the `--color-*` prefix (e.g., `--color-text-heading`, `--color-accent`). Append to the end of `app/globals.css`:

```css
/* MDX reading layout */
.prose-reading > :first-child::first-letter {
  float: left;
  font-family: var(--font-heading);
  font-size: 4.5em;
  line-height: 0.85;
  padding: 0.1em 0.1em 0 0;
  color: var(--color-text-heading);
}

.prose-reading p {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}

.prose-reading p:first-child {
  margin-top: 0;
}

.prose-reading a {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.prose-reading strong {
  color: var(--color-text-heading);
  font-weight: 600;
}
```

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: zero errors.

- [ ] **Step 5: Build check**

Run: `npx next build`
Expected: build succeeds. Output should list four prerendered `/notes/<slug>` routes.

- [ ] **Step 6: Smoke check**

Run: `npx next dev`
Visit `http://localhost:3000/notes/monsoon` — essay renders with drop-cap on first letter, PullQuote appears inline, meta line shows "No.04 · Essay · April 14, 2026 · 2 min" (or similar). Try `http://localhost:3000/notes/does-not-exist` — should render 404 page.

- [ ] **Step 7: Commit**

```bash
git add app/notes/ app/globals.css
git commit -m "feat: add /notes/[slug] detail page with MDX body and 404"
```

---

## Phase 5 — Project pull-quotes

### Task 5.1 — Extend `Project` type and seed `gabatin`

**Files:**
- Modify: `data/projects.ts`

- [ ] **Step 1: Read current file**

```bash
head -20 data/projects.ts
```

- [ ] **Step 2: Add optional field to the `Project` type**

Find the `export type Project = { ... };` block and add after the `gallery` field:
```ts
  pullQuotes?: { text: string; attribution?: string }[];
```

- [ ] **Step 3: Seed one `pullQuote` on `gabatin`**

In the `gabatin` project object (the first entry in the `projects` array), add after the `gallery: [...]` field:
```ts
    pullQuotes: [
      {
        text: "The plan did the work. Everything else was restraint.",
      },
    ],
```

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: zero errors. Existing projects without the field remain valid because it's optional.

- [ ] **Step 5: No commit yet** — commit with 5.2/5.3.

---

### Task 5.2 — `ProjectPullQuotes` component

**Files:**
- Create: `components/ProjectPullQuotes.tsx`

- [ ] **Step 1: Create the component**

```tsx
import PullQuote from "./PullQuote";
import type { Project } from "@/data/projects";

type Props = {
  quotes: NonNullable<Project["pullQuotes"]>;
};

export default function ProjectPullQuotes({ quotes }: Props) {
  if (quotes.length === 0) return null;
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        {quotes.map((q, i) => (
          <PullQuote key={i} attribution={q.attribution}>
            {q.text}
          </PullQuote>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: zero errors.

---

### Task 5.3 — Render pull-quotes on project detail page

**Files:**
- Modify: `app/projects/[slug]/page.tsx`

- [ ] **Step 1: Read current page**

```bash
cat app/projects/[slug]/page.tsx
```

- [ ] **Step 2: Import and render conditionally**

Add to the imports:
```tsx
import ProjectPullQuotes from "@/components/ProjectPullQuotes";
```

Then, inside the JSX, locate the point between the description block and the gallery (look for where `<GalleryImage>` or `project.gallery` first appears). Insert immediately before the gallery block:
```tsx
{project.pullQuotes && project.pullQuotes.length > 0 && (
  <ProjectPullQuotes quotes={project.pullQuotes} />
)}
```

If the exact location isn't obvious from the file, the rule is: **after** any description/overview section, **before** the gallery. Verify visually in Step 4.

- [ ] **Step 3: Build check**

Run: `npx next build`
Expected: success. Gabatin detail should build fresh.

- [ ] **Step 4: Smoke check**

Run: `npx next dev`
Visit `http://localhost:3000/projects/gabatin` — pull-quote appears between description and gallery. Visit `http://localhost:3000/projects/chua` (or any other project) — renders unchanged (no quote block present).

- [ ] **Step 5: Commit**

```bash
git add data/projects.ts components/ProjectPullQuotes.tsx app/projects/[slug]/page.tsx
git commit -m "feat: optional pullQuotes on project pages"
```

---

## Phase 6 — Nav + final polish

### Task 6.1 — Add Notes link to Navbar

**Files:**
- Modify: `components/Navbar.tsx`

- [ ] **Step 1: Update `navLinks` array**

Find:
```tsx
const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];
```

Replace with:
```tsx
const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/notes", label: "Notes" },
  { href: "/#contact", label: "Contact" },
];
```

No other changes needed — the mobile menu iterates the same array.

- [ ] **Step 2: Build check**

Run: `npx next build`
Expected: success.

- [ ] **Step 3: Smoke check**

Run: `npx next dev`
Load any page, confirm "Notes" appears in desktop nav between Projects and Contact. Resize to mobile, toggle the hamburger, confirm Notes appears in mobile menu. Click it — routes to `/notes`.

- [ ] **Step 4: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: add Notes link to navbar"
```

---

### Task 6.2 — Final build and manual QA

**Files:** none

- [ ] **Step 1: Clean install check**

Run:
```bash
npm ci
npx next build
```
Expected: clean install works from `package-lock.json`; build succeeds.

- [ ] **Step 2: Full QA walkthrough in dev**

Run: `npx next dev`. Complete this checklist in a browser:

- [ ] `/` — Hero → Currently (4 rows animate in) → About → Tools → Projects → CTA → Footer
- [ ] Currently "→ More in Field Notes" routes to `/notes`
- [ ] `/notes` — featured entry is the newest (monsoon), secondary list has the other three
- [ ] Filter chips: "All" shows 4, "Essays" shows 2 (monsoon + alexander), "Notes" shows 2 (stair + thresholds), "Field" shows "Nothing here yet."
- [ ] `/notes/monsoon` — drop-cap, PullQuote component, meta shows correct No. / type / date / read-time, next-newer link absent (this is the newest)
- [ ] `/notes/alexander` — Aside component renders correctly, "Next newer" link appears
- [ ] `/notes/does-not-exist` — 404 page
- [ ] `/projects/gabatin` — pull-quote appears between description and gallery
- [ ] `/projects/chua` — no pull-quote block (unchanged)
- [ ] Navbar on desktop — Notes link between Projects and Contact
- [ ] Navbar on mobile (375px width) — hamburger menu includes Notes
- [ ] Mobile layout of Currently — rows stack (label on top of value) at 375px
- [ ] Mobile layout of `/notes` — single column, featured above list

- [ ] **Step 3: If any item fails**

Open a sub-task (e.g. "Task 6.3 — Fix Currently mobile stacking") rather than patching silently. Document the fix as a commit of its own.

- [ ] **Step 4: Final sanity build**

Run: `npx next build && npx tsc --noEmit`
Expected: both clean.

- [ ] **Step 5: Nothing to commit** (if QA passed with no fixes). Otherwise commit any fix-ups individually.

---

## Done state

After Phase 6 completes:
- `/` renders the new Currently section between Hero and About
- `/notes` and `/notes/[slug]` work for all four seed entries, with filters + 404
- `gabatin` project page has a pull-quote; others unchanged
- Navbar links to Notes on desktop and mobile
- `next build` and `tsc --noEmit` are both green

All eight spec success criteria (Section 3, "Success criteria" in the design doc) are covered by the tasks above — see the coverage map below.

---

## Spec coverage map

| Spec success criterion | Implementing task(s) |
|---|---|
| 1. `/notes` route works, featured + secondary + filters | 4.1, 4.2, 4.3 |
| 2. `/notes/[slug]` MDX with PullQuote/Figure/Aside | 2.1–2.3, 4.4 |
| 3. Currently section between Hero and About | 3.1, 3.2 |
| 4. One project with pullQuotes | 5.1, 5.2, 5.3 |
| 5. Navbar Notes link desktop + mobile | 6.1 |
| 6. Draft notes invisible | covered in lib/notes.ts (1.3) + dynamicParams=false (4.4) |
| 7. `next build` + `tsc --noEmit` pass | enforced at every task gate |
| 8. Mobile usable at 375px | 3.1 (responsive grid), 4.3 (lg: grid cols), 6.2 manual QA |
