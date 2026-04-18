import type { GalleryItem } from "@/data/projects";
import GalleryImage from "./GalleryImage";
import GalleryNoteRow from "./GalleryNoteRow";

export default function ProjectGallery({
  gallery,
  slug,
}: {
  gallery: GalleryItem[];
  slug: string;
}) {
  const elements: React.ReactNode[] = [];
  let i = 0;
  let notedCount = 0;

  while (i < gallery.length) {
    const item = gallery[i];

    if (item.note) {
      const side = notedCount % 2 === 0 ? "left" : "right";
      elements.push(
        <GalleryNoteRow
          key={i}
          item={item as GalleryItem & { note: string }}
          projectSlug={slug}
          side={side}
        />
      );
      notedCount++;
      i++;
    } else if (item.layout === "full") {
      elements.push(
        <div key={i} className="w-full">
          <GalleryImage src={item.src} alt={item.alt} />
        </div>
      );
      i++;
    } else if (item.layout === "pair") {
      const next = gallery[i + 1];
      if (next && next.layout === "pair" && !next.note) {
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
