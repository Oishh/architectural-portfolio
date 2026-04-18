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
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-bg-card border border-border-glass">
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
