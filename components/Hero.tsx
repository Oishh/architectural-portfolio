"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const nameLines = ["ALESANDRA", "LILAIN ALCANTARA"];

// Curated mix sampled across all five projects (paths verified in data/projects.ts).
// Order is column-major-ish so the stagger reads as left-to-right waves.
const gridImages = [
  { src: "/projects/gabatin/ext1.png", alt: "Gabatin Residence exterior" },
  { src: "/projects/chua/scene-101.png", alt: "Chua Residence living area" },
  { src: "/projects/sta-isabel/scene-31-1.png", alt: "Sta. Isabel dining and kitchen" },
  { src: "/projects/doc/scene-53.png", alt: "Dr. Anton's room interior" },
  { src: "/projects/san-pablo/lobby-2.png", alt: "San Pablo Clinic lobby" },
  { src: "/projects/gabatin/living-area.png", alt: "Gabatin Residence living area" },
  { src: "/projects/chua/scene-109.png", alt: "Chua Residence interior" },
  { src: "/projects/sta-isabel/image-5.png", alt: "Sta. Isabel interior view" },
  { src: "/projects/doc/scene-57.png", alt: "Dr. Anton's room view" },
  { src: "/projects/san-pablo/treatment-rm-1.png", alt: "San Pablo Clinic treatment room" },
  { src: "/projects/gabatin/master-br-1.png", alt: "Gabatin Residence master bedroom" },
  { src: "/projects/chua/scene-117-3.png", alt: "Chua Residence interior detail" },
];

const COLS = 4;

// Per-tile 3D pose for the "thrown from the back" entry. Tiles start tiny,
// pushed way behind the camera, and heavily rotated — effectively invisible
// at viewport scale. They translate forward and stand up as you scroll,
// landing flat with rotateZ = 0 — final grid is a clean rectangle.
// The "spin" flag marks tiles that rotate a full extra revolution while
// flying forward (rotating during the throw, not in the final state).
// Deterministic from index for SSR.
const TILE_TILT = [
  { rx: -60, ry:  40, rz:   0, z: -2200, scale: 0.15, spin: false },
  { rx:  50, ry: -45, rz:   0, z: -2100, scale: 0.18, spin: true  },
  { rx: -55, ry:  35, rz:   0, z: -2300, scale: 0.14, spin: false },
  { rx:  65, ry: -40, rz:   0, z: -2150, scale: 0.16, spin: true  },
  { rx: -45, ry:  50, rz:   0, z: -2250, scale: 0.15, spin: false },
  { rx:  55, ry: -35, rz:   0, z: -2200, scale: 0.17, spin: true  },
  { rx: -60, ry:  45, rz:   0, z: -2350, scale: 0.13, spin: false },
  { rx:  52, ry: -55, rz:   0, z: -2180, scale: 0.16, spin: true  },
  { rx: -50, ry:  40, rz:   0, z: -2120, scale: 0.15, spin: false },
  { rx:  60, ry: -45, rz:   0, z: -2280, scale: 0.17, spin: true  },
  { rx: -42, ry:  55, rz:   0, z: -2240, scale: 0.14, spin: false },
  { rx:  46, ry: -42, rz:   0, z: -2260, scale: 0.16, spin: true  },
];

function GridTile({
  src,
  alt,
  index,
  eager,
  scrollYProgress,
}: {
  src: string;
  alt: string;
  index: number;
  eager: boolean;
  scrollYProgress: import("framer-motion").MotionValue<number>;
}) {
  // Tiles fly in from behind the camera, staggered by column/row. Each tile's
  // entry window is offset so the grid materializes left-to-right, top-to-bottom
  // — matches the Framer reference.
  const group = index % COLS;
  const row = Math.floor(index / COLS);
  const tilt = TILE_TILT[index % TILE_TILT.length];

  // Per-tile 3D pose: tiles start tiny and far behind the camera, then throw
  // forward and stand up. Final state is fully flat — no per-tile rotateZ, so
  // the settled grid is a clean rectangle. Spin tiles add 360° of rotateY so
  // they tumble a full revolution while flying forward. Each tile also ramps
  // in its own opacity window (staggered by index) so tiles "appear from the
  // back" as they fly in, matching the Framer reference where the grid is
  // invisible at scrollYProgress = 0.
  const start = 0.05 + group * 0.04 + row * 0.05;
  const end = Math.min(0.95, start + 0.45);
  const spinY = tilt.spin ? 360 : 0;
  const tileRotateX = useTransform(scrollYProgress, [start, end], [tilt.rx, 0]);
  const tileRotateY = useTransform(scrollYProgress, [start, end], [tilt.ry + spinY, 0]);
  const tileRotateZ = useTransform(scrollYProgress, [start, end], [tilt.rz, 0]);
  const tileZ = useTransform(scrollYProgress, [start, end], [tilt.z, 0]);
  const tileScale = useTransform(scrollYProgress, [start, end], [tilt.scale, 1]);
  const tileOpacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.02), start, end],
    [0, 1, 1],
  );

  return (
    <motion.div
      style={{
        rotateX: tileRotateX,
        rotateY: tileRotateY,
        rotateZ: tileRotateZ,
        z: tileZ,
        scale: tileScale,
        opacity: tileOpacity,
        transformStyle: "preserve-3d",
      }}
      className="relative aspect-[4/3] overflow-hidden rounded-md shadow-[0_18px_40px_rgba(26,23,20,0.18)] ring-1 ring-black/5"
    >
      <Image
        src={src}
        alt={alt}
        fill
        preload={eager}
        className="object-cover"
        sizes="(max-width: 768px) 45vw, 22vw"
      />
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // The image plane stays flat (rotateX 0) — the "lying down then standing up"
  // motion is per-tile, not the parent. Plane is also slightly pushed back at
  // the top so the title region above it is clear on first paint, then it
  // settles into final position as tiles fly in.
  const planeZ = useTransform(scrollYProgress, [0, 0.6, 1], [-300, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const planeY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  // Title sits over the grid and lifts away as tiles resolve.
  const titleOpacity = useTransform(scrollYProgress, [0, 0.18, 0.4], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);

  // Reduced motion / SSR-safe fallback: a calm static grid with the title shown.
  if (reduceMotion) {
    return (
      <section className="relative min-h-screen overflow-x-clip px-6 py-28 flex flex-col items-center justify-center gap-12">
        <div className="text-center">
          <h1 className="font-heading text-text-heading text-4xl md:text-6xl font-bold leading-tight">
            {nameLines.join(" ")}
          </h1>
          <p className="mt-4 text-text-body text-lg md:text-2xl font-light">
            Junior Architect / Apprentice
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
          {gridImages.map((img) => (
            <div
              key={img.src}
              className="relative aspect-[4/3] overflow-hidden rounded-lg ring-1 ring-black/5"
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="22vw" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[320vh] overflow-x-clip">
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ perspective: 1400 }}
      >
        {/* Image plane */}
        <motion.div
          style={{
            z: planeZ,
            scale,
            y: planeY,
            transformStyle: "preserve-3d",
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-1.5 w-[115%] md:w-[78%] max-w-6xl px-6"
        >
          {gridImages.map((img, i) => (
            <GridTile
              key={img.src}
              src={img.src}
              alt={img.alt}
              index={i}
              eager={i < COLS}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>

        {/* Overlaid name + title */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
        >
          <h1 className="font-heading text-text-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            {nameLines[0]}
            <br />
            {nameLines[1]}
          </h1>
          <div className="h-px w-40 bg-text-heading/60 my-6" />
          <p className="text-text-body text-lg md:text-2xl lg:text-3xl font-light">
            Junior Architect / Apprentice
          </p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          aria-hidden
          style={{ opacity: titleOpacity }}
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-text-body/70 text-xs uppercase tracking-[0.3em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-text-body/0 via-text-body/70 to-text-body/0"
          />
        </motion.div>
      </div>
    </section>
  );
}
