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
