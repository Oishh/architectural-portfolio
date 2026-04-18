import Link from "next/link";
import type { NoteSummary } from "@/lib/notes";

const TYPE_LABEL: Record<NoteSummary["type"], string> = {
  essay: "Essay",
  note: "Note",
  field: "Field Note",
};

function formatDate(iso: string): string {
  // "2026-04-14" -> "Apr 14, 2026"
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type CardProps = {
  note: NoteSummary;
  variant: "featured" | "list";
};

export default function NoteCard({ note, variant }: CardProps) {
  if (variant === "featured") {
    return (
      <Link
        href={`/notes/${note.slug}`}
        className="group block border-t-2 border-text-heading pt-5"
      >
        <p className="text-[10px] uppercase tracking-[0.18em] text-accent mb-3">
          Featured · {TYPE_LABEL[note.type]}
        </p>
        <h3 className="font-heading text-text-heading text-3xl md:text-4xl font-bold leading-tight group-hover:text-accent transition-colors">
          {note.title}
        </h3>
        <p className="mt-4 text-text-body/80 text-base md:text-lg leading-relaxed max-w-prose">
          {note.excerpt}
        </p>
        <p className="mt-5 text-xs text-text-body/50 uppercase tracking-widest">
          {formatDate(note.date)} · {note.readTimeMin} min
        </p>
      </Link>
    );
  }

  return (
    <Link
      href={`/notes/${note.slug}`}
      className="group block border-t border-border-subtle pt-4 pb-1"
    >
      <p className="text-[10px] uppercase tracking-widest text-text-body/50 mb-1">
        {TYPE_LABEL[note.type]}
      </p>
      <h4 className="text-text-heading text-base font-semibold leading-snug group-hover:text-accent transition-colors">
        {note.title}
      </h4>
      <p className="mt-2 text-[11px] text-text-body/50 uppercase tracking-widest">
        {formatDate(note.date)}
      </p>
    </Link>
  );
}
