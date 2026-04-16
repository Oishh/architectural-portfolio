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
