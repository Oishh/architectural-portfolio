import type { Metadata } from "next";
import { loadAllNotes } from "@/lib/notes";
import NoteCard from "@/components/NoteCard";
import NotesFilter from "@/components/NotesFilter";
import PageTransition from "@/components/PageTransition";
import type { NoteType } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Field Notes",
  description:
    "Dispatches and essays from practice — reading, buildings, drawings, questions.",
};

export default async function NotesIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const [notes, { tag }] = await Promise.all([
    loadAllNotes(),
    searchParams,
  ]);

  const visible = tag ? notes.filter((n) => n.type === (tag as NoteType)) : notes;
  const [featured, ...rest] = visible;

  return (
    <PageTransition>
      <main className="pt-28 pb-24 px-6">
        <div className="mx-auto max-w-6xl">
          <header className="mb-12">
            <p className="text-xs uppercase tracking-widest text-accent mb-3">
              Field Notes · Vol. 01
            </p>
            <h1 className="font-heading text-text-heading text-4xl md:text-6xl font-bold leading-tight">
              Dispatches and essays
              <br />
              from practice.
            </h1>
          </header>

          <NotesFilter />

          {visible.length === 0 ? (
            <p className="text-text-body/60 italic mt-16">
              Nothing here yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 mt-8">
              <div>{featured && <NoteCard note={featured} variant="featured" />}</div>
              <div className="flex flex-col gap-6">
                {rest.map((note) => (
                  <NoteCard key={note.slug} note={note} variant="list" />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </PageTransition>
  );
}
