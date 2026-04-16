# Architectural Portfolio Website — Design Spec

## Overview

A portfolio website for an architect/interior designer, showcasing 3D-rendered residential and commercial projects. Inspired by the cinematic dark-blue aesthetic of [Dribbble Portfolio Animation](https://dribbble.com/shots/24003762-Portfolio-Animation), adapted for architectural work.

All personal content uses placeholder text until the owner provides real copy.

## Color Palette

| Token             | Hex       | Usage                                    |
| ----------------- | --------- | ---------------------------------------- |
| `bg-primary`      | `#0B0F2A` | Page background                          |
| `bg-card`         | `#111638` | Cards, elevated surfaces                 |
| `text-heading`    | `#FFFFFF` | Headings, nav links                      |
| `text-body`       | `#B8BCD0` | Body text, descriptions                  |
| `accent`          | `#2A3FCC` | Hover states, glows, decorative elements |
| `accent-light`    | `#4F63E8` | Hover highlights, active states          |
| `border-subtle`   | `#1A2048` | Card borders, dividers                   |

## Typography

- **Headings:** Playfair Display (serif, bold) — architectural gravitas
- **Body:** DM Sans (sans-serif) — clean readability
- **Sizes:** Hero name ~72-96px, section headings ~40-48px, body ~16-18px
- **All text white/light on dark background**

## Tech Stack

- Next.js 14+ (App Router)
- Tailwind CSS v4
- Framer Motion (animations)
- `next/image` (optimized image loading)
- Google Fonts (Playfair Display, DM Sans)
- Deployed on Vercel

## Pages

### 1. Home Page (single scroll)

#### 1.1 Navigation

- Fixed top bar, transparent initially, gains `backdrop-blur` + dark bg on scroll
- Layout: Logo (left) — links (right): About, Projects, Contact
- Mobile: hamburger menu with slide-in drawer
- Links smooth-scroll to sections on the home page; Projects also navigates to individual project pages

#### 1.2 Hero Section

- Full viewport height (`100vh`)
- Large bold display text: owner name (placeholder) + title "Architect / Interior Designer"
- Subtitle tagline placeholder
- Featured project render as a large offset/background image with subtle parallax (~20px vertical shift on scroll)
- Scroll-down indicator (animated chevron or line) at bottom center
- Animation: text slides up with staggered delays, image fades in

#### 1.3 About Snippet

- Short intro paragraph (placeholder, 2-3 sentences)
- Skill/service tags displayed as pill badges: 3D Visualization, Residential Design, Interior Design, Commercial Design, Space Planning
- Fade-up on scroll entry
- Kept brief — this is a teaser, not a full bio page

#### 1.4 Featured Projects Grid

- Section heading: "Selected Projects" or "Portfolio"
- 3-column grid (desktop), 2-column (tablet), 1-column (mobile)
- Each card shows:
  - Hero image for the project (best exterior/establishing shot)
  - Project name overlaid at bottom
  - Project type label (e.g., "Residential", "Commercial")
- Hover effect: subtle image zoom (scale 1.05) + dark overlay with project name becoming more prominent
- Cards animate in with staggered fade-up on scroll
- Click navigates to project detail page

**Projects to display (6 total):**

| Folder      | Project Name     | Type        | Image Count |
| ----------- | ---------------- | ----------- | ----------- |
| GABATIN     | Gabatin Residence | Residential | ~52         |
| CHUA        | Chua Residence   | Residential | ~14         |
| STA ISABEL  | Sta. Isabel      | Residential | ~24         |
| DOC         | Doc Residence    | Residential | ~13         |
| SAN PABLO   | San Pablo Clinic | Commercial  | ~15         |
| PORTFOLIO   | Portfolio        | Mixed       | 0 (empty — excluded until images provided) |

#### 1.5 CTA Section

- Dark card/section with lighter background (`bg-card`)
- Heading: "Have a project in mind?" (placeholder)
- Subtext: brief invitation to collaborate
- "Get in Touch" button (accent color, hover glow effect)
- Fade-in on scroll

#### 1.6 Footer

- Logo + social links (placeholder icons for Instagram, LinkedIn, Behance)
- Email address (placeholder)
- Copyright line
- Minimal, single-row layout

### 2. Project Detail Pages

One page per project, accessed via `/projects/[slug]`.

#### 2.1 Hero

- Full-width image (best establishing shot for the project)
- Project name overlaid in large display text
- Meta info below: location (placeholder), project type, year (placeholder)
- Image has subtle parallax on scroll
- Text fades in on load

#### 2.2 Project Description

- Brief paragraph describing the project scope and design approach (placeholder)
- Displayed below the hero, left-aligned or centered, max-width for readability (~720px)

#### 2.3 Editorial Image Gallery

Images presented in a curated editorial layout, not a uniform grid. The layout alternates between:

- **Full-width hero shots** — Single image spanning the content width. Used for the best renders (exteriors, key rooms).
- **Side-by-side pairs** — Two images in a row, equal width. Used to show complementary views (e.g., two angles of the same room).
- **Single detail shots** — One image, centered, ~70% width. Used for close-ups or focused details.

Each image/pair fades up on scroll entry. The sequence should flow naturally: exterior → main living areas → bedrooms → details.

Images use `next/image` with lazy loading and blur placeholders.

#### 2.4 Next/Previous Project Navigation

- At the bottom of each project page
- Shows the next project's name + hero image thumbnail
- Click navigates to the next project (wraps around)
- Subtle hover animation

## Animations (Framer Motion)

| Animation              | Trigger            | Details                                           |
| ---------------------- | ------------------ | ------------------------------------------------- |
| Section fade-up        | Scroll into view   | `opacity: 0→1`, `y: 40→0`, duration 0.6s         |
| Staggered card reveal  | Scroll into view   | Each card delays 0.1s after the previous           |
| Image hover zoom       | Mouse enter/leave  | `scale: 1→1.05`, duration 0.3s                    |
| Hero text reveal       | Page load          | Slide up with stagger, each line delays 0.15s      |
| Hero parallax          | Scroll position    | `translateY` shifts 10-20px based on scroll         |
| Page transition        | Route change       | Fade out current → fade in new, duration 0.3s      |
| Heading text reveal    | Scroll into view   | Characters or words slide up with stagger           |
| Nav background         | Scroll > 50px      | Transparent → `backdrop-blur` + semi-opaque bg      |

## Project Data Structure

Projects are defined as static data (no CMS). Each project is an object:

```ts
type Project = {
  slug: string;
  name: string;
  type: "Residential" | "Commercial" | "Mixed";
  location: string;       // placeholder
  year: string;           // placeholder
  description: string;    // placeholder
  heroImage: string;      // path to best image
  gallery: GalleryItem[];
};

type GalleryItem = {
  src: string;
  alt: string;
  layout: "full" | "pair" | "detail";
};
```

Gallery items with `layout: "pair"` appear in consecutive pairs. The layout rendering logic groups them accordingly.

## Image Handling

- All project images are stored in `/public/projects/[slug]/`
- Images will be copied from the provided `drive-download` folder and renamed to clean filenames (kebab-case, no spaces)
- Use `next/image` with:
  - `sizes` attribute for responsive loading
  - `placeholder="blur"` with generated blur data URLs
  - Lazy loading (default)

## Responsive Behavior

- **Desktop (1280px+):** Full layout as described
- **Tablet (768-1279px):** Project grid becomes 2 columns, hero text scales down, side-by-side pairs may stack
- **Mobile (< 768px):** Single column throughout, hamburger nav, all gallery images stack vertically, hero text ~40px

## Folder Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with fonts, metadata
│   ├── page.tsx            # Home page
│   ├── projects/
│   │   └── [slug]/
│   │       └── page.tsx    # Project detail page
│   └── globals.css         # Tailwind imports + custom styles
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── AboutSnippet.tsx
│   ├── ProjectGrid.tsx
│   ├── ProjectCard.tsx
│   ├── CTASection.tsx
│   ├── Footer.tsx
│   ├── ProjectHero.tsx
│   ├── ProjectGallery.tsx
│   ├── GalleryImage.tsx
│   ├── ProjectNav.tsx      # Next/prev navigation
│   ├── ScrollReveal.tsx    # Reusable scroll-triggered animation wrapper
│   └── PageTransition.tsx  # Route transition wrapper
├── data/
│   └── projects.ts         # Static project data
├── public/
│   └── projects/
│       ├── gabatin/
│       ├── chua/
│       ├── sta-isabel/
│       ├── doc/
│       ├── san-pablo/
│       └── portfolio/
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

## Out of Scope

- CMS or admin panel — static data for now
- Contact form backend — just a mailto link or placeholder
- Blog or news section
- Dark/light mode toggle — always dark
- Search functionality
- Analytics (can be added post-launch)
