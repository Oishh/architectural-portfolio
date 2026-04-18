export type GalleryItem = {
  src: string;
  alt: string;
  layout: "full" | "pair" | "detail";
  // MDX filename (without extension) under content/projects/<slug>/.
  // Only valid with "full" or "detail" — renders as a 2-column note+image row.
  note?: string;
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
  pullQuotes?: { text: string; attribution?: string }[];
};

export const projects: Project[] = [
  {
    slug: "gabatin",
    name: "Gabatin Residence",
    type: "Residential",
    location: "Lucena City, Philippines",
    year: "2026",
    description:
      "A modern two-storey residence featuring clean geometric lines, concrete louver blocks, and warm material contrasts. The interior flows from open-plan living spaces to intimate private quarters, with natural light as a guiding design principle.",
    heroImage: "/projects/gabatin/ext1.png",
    gallery: [
      { src: "/projects/gabatin/ext1.png", alt: "Front exterior view", layout: "full", note: "01-threshold" },
      { src: "/projects/gabatin/ext-n1.png", alt: "Exterior angle", layout: "pair" },
      { src: "/projects/gabatin/ext5.png", alt: "Exterior angle 2", layout: "pair" },
      { src: "/projects/gabatin/living-area.png", alt: "Living area", layout: "full", note: "02-plan" },
      { src: "/projects/gabatin/living-area-2.png", alt: "Living area alternate view", layout: "pair" },
      { src: "/projects/gabatin/kitchen.png", alt: "Kitchen", layout: "pair" },
      { src: "/projects/gabatin/dining.png", alt: "Dining area", layout: "detail" },
      { src: "/projects/gabatin/master-br-1.png", alt: "Master bedroom", layout: "full" },
      { src: "/projects/gabatin/deck-2.png", alt: "Deck", layout: "pair" },
      { src: "/projects/gabatin/balcony-1.png", alt: "Balcony", layout: "pair" },
      { src: "/projects/gabatin/family-room.png", alt: "Family room", layout: "detail" },
      { src: "/projects/gabatin/scene-5-1.png", alt: "Outdoor garden", layout: "full" },
    ],
    pullQuotes: [
      {
        text: "The plan did the work. Everything else was restraint.",
      },
    ],
  },
  {
    slug: "chua",
    name: "Chua Residence",
    type: "Residential",
    location: "Lucena City, Philippines",
    year: "2026",
    description:
      "An elegant residential interior defined by rich textures — natural stone feature walls, warm wood ceilings, and carefully curated lighting. Each space balances sophistication with comfort.",
    heroImage: "/projects/chua/scene-101.png",
    gallery: [
      { src: "/projects/chua/scene-101.png", alt: "Dining and living area", layout: "full", note: "01-materials" },
      { src: "/projects/chua/scene-102.png", alt: "Interior scene 2", layout: "pair" },
      { src: "/projects/chua/scene-103.png", alt: "Interior scene 3", layout: "pair" },
      { src: "/projects/chua/scene-104.png", alt: "Interior scene 4", layout: "detail" },
      { src: "/projects/chua/scene-109.png", alt: "Interior scene 5", layout: "full", note: "02-light" },
      { src: "/projects/chua/scene-112.png", alt: "Interior scene 6", layout: "pair" },
      { src: "/projects/chua/scene-115-3.png", alt: "Interior detail", layout: "pair" },
      { src: "/projects/chua/scene-116-3.png", alt: "Interior detail 2", layout: "detail" },
      { src: "/projects/chua/scene-117-3.png", alt: "Interior detail 3", layout: "full", note: "03-restraint" },
      { src: "/projects/chua/scene-118-3.png", alt: "Interior detail 4", layout: "pair" },
      { src: "/projects/chua/scene-119-2.png", alt: "Interior detail 5", layout: "pair" },
      { src: "/projects/chua/scene-120-2.png", alt: "Interior detail 6", layout: "detail" },
      { src: "/projects/chua/scene-121.png", alt: "Interior detail 7", layout: "full" },
      { src: "/projects/chua/scene-121-2.png", alt: "Interior detail 8", layout: "detail" },
    ],
  },
  {
    slug: "sta-isabel",
    name: "Sta. Isabel Renovation",
    type: "Residential",
    location: "Lucena City, Philippines",
    year: "2025",
    description:
      "A minimalist residential design with sloped wood ceilings and clean white interiors. The spaces feel open and airy, with natural materials providing warmth against the crisp architectural lines.",
    heroImage: "/projects/sta-isabel/scene-31-1.png",
    gallery: [
      { src: "/projects/sta-isabel/scene-31-1.png", alt: "Dining and kitchen", layout: "full", note: "01-white" },
      { src: "/projects/sta-isabel/scene-29.png", alt: "Kitchen and dining view", layout: "pair" },
      { src: "/projects/sta-isabel/scene-30.png", alt: "Living area", layout: "pair" },
      { src: "/projects/sta-isabel/scene-14.png", alt: "Living area detail", layout: "detail" },
      { src: "/projects/sta-isabel/image-5.png", alt: "View 5", layout: "full", note: "02-ceiling" },
      { src: "/projects/sta-isabel/image-6.png", alt: "View 6", layout: "pair" },
      { src: "/projects/sta-isabel/image-7.png", alt: "View 7", layout: "pair" },
      { src: "/projects/sta-isabel/bedroom.png", alt: "Bedroom", layout: "full", note: "03-quiet" },
      { src: "/projects/sta-isabel/master-br.png", alt: "Master bedroom", layout: "pair" },
      { src: "/projects/sta-isabel/maids-br.png", alt: "Secondary bedroom", layout: "pair" },
      { src: "/projects/sta-isabel/family-room.png", alt: "Family room", layout: "detail" },
    ],
  },
  {
    slug: "doc",
    name: "Dr. Anton's Room Interior",
    type: "Residential",
    location: "Lipa City, Philippines",
    year: "2025",
    description:
      "A classic-modern residential interior featuring elegant paneled walls, rich textiles, and warm ambient lighting. The design balances traditional aesthetics with contemporary comfort.",
    heroImage: "/projects/doc/scene-53.png",
    gallery: [
      { src: "/projects/doc/scene-53.png", alt: "Master bedroom", layout: "full", note: "01-panels" },
      { src: "/projects/doc/scene-54.png", alt: "Room view 2", layout: "pair" },
      { src: "/projects/doc/scene-55.png", alt: "Room view 3", layout: "pair" },
      { src: "/projects/doc/scene-56.png", alt: "Room view 4", layout: "detail" },
      { src: "/projects/doc/scene-57.png", alt: "Room view 5", layout: "full", note: "02-warmth" },
      { src: "/projects/doc/scene-58.png", alt: "Room view 6", layout: "pair" },
      { src: "/projects/doc/scene-59.png", alt: "Room view 7", layout: "pair" },
      { src: "/projects/doc/scene-60.png", alt: "Room view 8", layout: "detail" },
      { src: "/projects/doc/scene-61.png", alt: "Room view 9", layout: "full", note: "03-formality" },
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
    year: "2025",
    description:
      "A modern medical clinic designed for patient comfort and operational efficiency. Clean lines, bright interiors, and thoughtful space planning create a welcoming healthcare environment.",
    heroImage: "/projects/san-pablo/lobby-2.png",
    gallery: [
      { src: "/projects/san-pablo/lobby-2.png", alt: "Clinic lobby", layout: "full", note: "01-lobby" },
      { src: "/projects/san-pablo/waiting-rm2-1.png", alt: "Waiting room", layout: "pair" },
      { src: "/projects/san-pablo/cashier-2.png", alt: "Cashier area", layout: "pair" },
      { src: "/projects/san-pablo/nurse-stn-1.png", alt: "Nurse station", layout: "detail" },
      { src: "/projects/san-pablo/treatment-rm-1.png", alt: "Treatment room", layout: "full", note: "02-treatment" },
      { src: "/projects/san-pablo/treatment-rm-2-1.png", alt: "Treatment room 2", layout: "pair" },
      { src: "/projects/san-pablo/treatment-rm3-1.png", alt: "Treatment room 3", layout: "pair" },
      { src: "/projects/san-pablo/doctors-rm-1.png", alt: "Doctor's room", layout: "detail" },
      { src: "/projects/san-pablo/patient-cr-2.png", alt: "Patient room", layout: "full", note: "03-staff" },
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
