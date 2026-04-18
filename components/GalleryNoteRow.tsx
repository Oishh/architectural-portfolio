import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import type { GalleryItem } from "@/data/projects";

type Props = {
  item: GalleryItem & { note: string };
  projectSlug: string;
  side: "left" | "right";
};

export default async function GalleryNoteRow({ item, projectSlug, side }: Props) {
  const mod = await import(`@/content/projects/${projectSlug}/${item.note}.mdx`);
  const Body = mod.default;
  const title: string | undefined = mod.metadata?.title;

  // Image is always the wider track (1.3fr); note is 1fr. Swap track order by side
  // so the image stays visually dominant regardless of which side the note lives on.
  const gridCols =
    side === "left"
      ? "md:grid-cols-[1fr_1.3fr]"
      : "md:grid-cols-[1.3fr_1fr]";
  const noteOrder = side === "left" ? "md:order-1" : "md:order-2";
  const imageOrder = side === "left" ? "md:order-2" : "md:order-1";

  return (
    <ScrollReveal>
      <div className={`grid grid-cols-1 ${gridCols} gap-6 md:gap-10 items-center`}>
        <div className={`flex flex-col justify-center ${noteOrder}`}>
          <div className="max-w-[30rem] md:mx-auto">
            {title && (
              <h3 className="font-heading text-text-heading text-2xl md:text-3xl font-bold leading-tight mb-5">
                {title}
              </h3>
            )}
            <div className="prose-reading text-text-body text-lg leading-relaxed font-light">
              <Body />
            </div>
          </div>
        </div>
        <div className={`relative aspect-[16/10] overflow-hidden rounded-xl bg-bg-card border border-border-glass ${imageOrder}`}>
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 58vw"
          />
        </div>
      </div>
    </ScrollReveal>
  );
}
