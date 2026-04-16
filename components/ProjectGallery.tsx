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
