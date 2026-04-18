# Personality Layer — Design Spec

**Date:** 2026-04-18
**Scope:** Home page addition + new `/notes` route + project page enhancement
**Persona direction:** "Curious Mind" (editorial/curatorial) — medium scope

## Goal

Lift the portfolio from polished-template to *this is a specific person* by adding three editorial surfaces that signal intellectual presence and process:

1. A **Currently** module on the home page — what Alesandra is reading, visiting, drawing, thinking
2. **Field Notes** — a full `/notes` section for short dispatches and essays
3. **Pull-quote callouts** — a shared component used in notes and in project case studies

UI/UX and layout are the priority; content is placeholder and owner-editable.

## Design direction (decided)

From three options explored: **"Curious Mind"**. Thinking-person portfolio, editorial layouts, reading list / field notes / pull-quotes. Rejected alternatives: "Earnest Craftsperson" (hand-drawn, heavier visual system) and "Playful Studio" (experiments + custom cursor, bolder motion).

Scope decided: **Medium**. Full "Curious Mind" included an Inspiration Index (`/index`), which was cut — overlaps with Field Notes in purpose, deferred to a later phase.

## Information architecture

### Routes
- `/` — home (adds Currently section; other sections unchanged)
- `/projects/[slug]` — existing (gains pull-quote support)
- `/notes` — **new**: Field Notes index (editorial grid)
- `/notes/[slug]` — **new**: individual note (reading layout)

### Navbar
Adds one link — `Notes` — positioned between `Projects` and `Contact`. Mobile menu gets the same entry. No structural changes.

### Home page scroll order
```
Hero → Currently [NEW] → About → Tools → Projects → CTA → Footer
```

## Components

### `CurrentlySection` (new, home page)

Full-width section, `max-w-4xl` container (matches `AboutSnippet`).

Anatomy:
- Small accent-color caret label: `"Currently · Week 16 of 2026"`
- Four-row two-column grid:
  - `READING`  / value
  - `VISITING` / value
  - `DRAWING`  / value
  - `THINKING` / value (italicized serif — richer texture)
- Labels: accent gold, uppercase, tracked-out
- Values: body color, serif for `THINKING` row, sans for the other three
- Bottom link: `"→ More in Field Notes"` routes to `/notes`
- `ScrollReveal` entry animation (existing component; staggered across rows)
- Responsive: on small screens, labels sit above values instead of left-of-values

Content: single static `CurrentlyEntry` from `data/currently.ts`.

### `/notes` index page (new)

Editorial grid. Two-column on desktop, stacked on mobile.

Left column (desktop) — **Featured**:
- The most recent non-draft entry, regardless of type
- Top border `2px solid` heading color
- Small accent meta: `FEATURED · <type>`
- Large serif title
- 2–3 line excerpt from frontmatter
- Footer meta: `<date> · <read-time> min`
- Entire card clickable

Right column (desktop) — **Secondary list**:
- All other non-draft entries, newest-first
- Each row: light border-top, type label (sans, small), title (sans, bold)
- No excerpts — keeps the right column scannable
- Click routes to detail

Below both columns — **Filters**:
- Chip row: `all` · `essays` · `notes` · `field`
- Default: `all`. Filter state stored in URL query: `?tag=essays`
- Shallow navigation (no full page reload); the page re-renders client-side

Empty state: when the active filter has zero matches, show: *"Nothing here yet."*

### `/notes/[slug]` detail page (new)

Narrow single-column reading layout.

Anatomy:
- Back navigation at top: `← Field Notes`
- Meta line (small, tracked): `No.<n> · <type> · <date> · <read-time> min`
- Large serif title
- Body: Georgia/serif, ~65ch max-width, generous leading
- Drop-cap on the first letter of the first paragraph
- MDX-rendered content with access to custom components (see MDX components below)
- Footer: `← Back to Field Notes` · teaser link to the next-newer entry (or nothing if this is the newest)

Static-generated from MDX frontmatter. 404 for missing / draft slugs.

### `PullQuote` component (new, shared)

Used in both `/notes/[slug]` (via MDX) and `/projects/[slug]` (via new optional data field).

Visual:
- Left border, 2px, accent gold
- Large italic serif body, `~1.5rem` on desktop
- Optional `— attribution` line below, smaller sans, dimmed

API:
```tsx
<PullQuote attribution="Christopher Alexander">
  You can't solve a problem without knowing what you want.
</PullQuote>
```

### MDX components

Exposed to all `.mdx` note bodies:
- `<PullQuote attribution?>` — as above
- `<Figure caption?>` with `src` and `alt` — inline image with captioned frame
- `<Aside>` — indented sidebar block for related-but-tangential thoughts

### `Navbar`

Add `{ href: "/notes", label: "Notes" }` between `Projects` and `Contact`. Apply to both desktop and mobile menus.

### `ProjectPage` (enhancement)

When `project.pullQuotes` is set, render them between the existing description and the gallery. Each entry renders via the shared `PullQuote` component. If `pullQuotes` is undefined/empty, render is unchanged from current.

## Data model

### `data/currently.ts` (new)
```ts
export type CurrentlyEntry = {
  reading: string;
  visiting: string;
  drawing: string;
  thinking: string;
  weekLabel: string;   // e.g. "Week 16 of 2026"
  updatedAt: string;   // ISO date
};

export const currently: CurrentlyEntry = { /* ... */ };
```

### MDX notes — `content/notes/*.mdx`
Filename convention: `YYYY-MM-DD-<slug>.mdx` (date prefix enables source-sorted listings).

Frontmatter:
```yaml
title: string
type: "essay" | "note" | "field"
date: string           # ISO date
excerpt: string        # 1–2 lines, used in index featured card
draft: boolean         # default false
```

Behavior:
- `draft: true` → excluded from index AND detail route returns 404
- Read time auto-computed from body word count (~200 wpm)
- Listing order: newest `date` first

### `data/projects.ts` — extension
Add one optional field to the existing `Project` type:
```ts
pullQuotes?: { text: string; attribution?: string }[];
```
Back-compatible — existing projects without the field render identically.

## Implementation notes

### Dependencies
- An MDX renderer (candidate: Next.js first-party MDX support, or `next-mdx-remote-client`). Decide after reading `node_modules/next/dist/docs/` per `AGENTS.md`.
- `gray-matter` for frontmatter parsing
- `reading-time` for word-count-based read-time

### Read-before-code
`AGENTS.md` explicitly states this is "NOT the Next.js you know." Before writing the `/notes` routes or the MDX pipeline, consult the shipped docs at `node_modules/next/dist/docs/` for:
- Dynamic route conventions (`generateStaticParams` shape)
- MDX integration guidance
- Per-route metadata API
Dependency choices above may change based on what the shipped Next version supports natively.

### File layout (target)
```
app/
  notes/
    page.tsx
    [slug]/page.tsx
components/
  CurrentlySection.tsx
  PullQuote.tsx
  NoteCard.tsx
  mdx/
    index.ts             # component map for MDX rendering
content/
  notes/
    YYYY-MM-DD-*.mdx
data/
  currently.ts
  projects.ts            # extended with optional pullQuotes
lib/
  notes.ts               # loadAllNotes, loadNote(slug), filterByType
```

### Testing
- `tsc --noEmit` passes (catches MDX frontmatter shape drift)
- `next build` succeeds for **zero notes**, **one note**, and **multiple notes** fixtures — proves empty-state works
- Manual browser QA on each new route: layout, mobile responsiveness, motion, filter behavior, 404 on missing slug
- No unit test framework currently in the project; none added for this feature

### Out of scope (intentionally)
- Inspiration Index (deferred; overlaps with Field Notes)
- RSS / Atom feed for notes
- Comments or reactions
- Draft preview routes (can add `NEXT_PUBLIC_SHOW_DRAFTS` later if needed)
- Search
- Tag landing pages (filters live on the index only)
- Analytics events

## Success criteria

1. `/notes` route loads with fixture content, featured entry + secondary list render correctly, filter chips work
2. `/notes/[slug]` renders MDX body with working `<PullQuote>`, `<Figure>`, `<Aside>`
3. Home page Currently section renders between Hero and About and matches the mockup anatomy
4. At least one existing project (`gabatin` suggested) has a `pullQuotes` entry demonstrating the project-page treatment
5. Navbar `Notes` link appears on desktop and mobile
6. Draft notes (`draft: true`) are invisible from both index and direct URL
7. `next build` passes; `tsc --noEmit` passes
8. Mobile layout is usable at 375px — Currently stacks, notes index collapses to single column, detail reading width remains comfortable

## Placeholder content plan

Alesandra will replace with her own voice later. For build/demo purposes, seed:
- `data/currently.ts` — one entry with the mocked values from the direction-selection mockup (A Pattern Language / Poblacion walkups / stair sections / Manila heat question), week label reflecting today's ISO week
- `content/notes/` — four seed MDX files spanning two essays and two notes (titles from the index mockup), so index featured + secondary states render meaningfully
- `data/projects.ts` — add `pullQuotes` to the `gabatin` project (one quote) to exercise the project-page treatment

## Decisions reference

All decisions captured here were resolved in conversation on 2026-04-18:
- Direction: **B — Curious Mind** (Option A "Earnest Craftsperson", Option C "Playful Studio" rejected)
- Scope: **Medium** (rejected Tight as too light; rejected Full — Inspiration Index deferred)
- Field Notes index: **B — Editorial grid** (rejected A Archive list, C Typographic index)
- Currently placement: **A — dedicated section after Hero** (rejected B side rail, C inlay)
- Architecture: **Option 3 — hybrid** (Currently as TS, Notes as MDX)
