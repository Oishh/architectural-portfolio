import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import readingTime from "reading-time";

const NOTES_DIR = join(process.cwd(), "content/notes");

export type NoteType = "essay" | "note" | "field";

export type NoteMetadata = {
  title: string;
  type: NoteType;
  date: string;        // ISO
  excerpt: string;
  draft?: boolean;
};

export type NoteSummary = NoteMetadata & {
  slug: string;
  filename: string;
  readTimeMin: number;
  indexNumber: number; // newest → highest number (used as "No.04")
};

function fileToSlug(filename: string): string {
  // "2026-04-14-monsoon.mdx" -> "monsoon"
  return filename.replace(/\.mdx$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

function readBodyText(filename: string): string {
  const raw = readFileSync(join(NOTES_DIR, filename), "utf8");
  // Strip the `export const metadata = { ... };` block for word-count purposes.
  return raw.replace(/export\s+const\s+metadata\s*=\s*\{[\s\S]*?\};\s*/, "");
}

async function importMetadata(filename: string): Promise<NoteMetadata> {
  const mod = await import(`@/content/notes/${filename}`);
  return mod.metadata as NoteMetadata;
}

export async function loadAllNotes(): Promise<NoteSummary[]> {
  const files = readdirSync(NOTES_DIR).filter((f) => f.endsWith(".mdx"));

  const summaries = await Promise.all(
    files.map(async (filename) => {
      const metadata = await importMetadata(filename);
      const body = readBodyText(filename);
      const stats = readingTime(body);
      return {
        ...metadata,
        slug: fileToSlug(filename),
        filename,
        readTimeMin: Math.max(1, Math.round(stats.minutes)),
        indexNumber: 0, // filled below
      } satisfies NoteSummary;
    })
  );

  const visible = summaries
    .filter((n) => !n.draft)
    .sort((a, b) => b.date.localeCompare(a.date));

  // Assign index numbers — newest entry gets the highest No.
  visible.forEach((n, i) => {
    n.indexNumber = visible.length - i;
  });

  return visible;
}

export async function loadNote(
  slug: string
): Promise<{ summary: NoteSummary; filename: string } | null> {
  const all = await loadAllNotes();
  const match = all.find((n) => n.slug === slug);
  if (!match) return null;
  return { summary: match, filename: match.filename };
}

export function filterByType(
  notes: NoteSummary[],
  type: NoteType | "all"
): NoteSummary[] {
  if (type === "all") return notes;
  return notes.filter((n) => n.type === type);
}
