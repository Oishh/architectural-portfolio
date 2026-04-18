import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { loadAllNotes, loadNote } from "@/lib/notes";
import PageTransition from "@/components/PageTransition";

type Params = { slug: string };

const TYPE_LABEL = { essay: "Essay", note: "Note", field: "Field Note" } as const;

export async function generateStaticParams(): Promise<Params[]> {
  const notes = await loadAllNotes();
  return notes.map((n) => ({ slug: n.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loaded = await loadNote(slug);
  if (!loaded) return { title: "Not found" };
  const { summary } = loaded;
  return {
    title: `${summary.title} — Field Notes`,
    description: summary.excerpt,
  };
}

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function NotePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const loaded = await loadNote(slug);
  if (!loaded) notFound();
  const { summary, filename } = loaded;

  // Dynamic import the MDX module to pick up the default-exported component.
  const { default: MDXBody } = await import(`@/content/notes/${filename}`);

  const all = await loadAllNotes();
  const idx = all.findIndex((n) => n.slug === slug);
  const nextNewer = idx > 0 ? all[idx - 1] : null;

  return (
    <PageTransition>
      <main className="pt-28 pb-24 px-6">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/notes"
            className="text-xs uppercase tracking-widest text-accent hover:text-text-heading transition-colors"
          >
            ← Field Notes
          </Link>

          <header className="mt-10 mb-12">
            <p className="text-[10px] uppercase tracking-[0.22em] text-text-body/50 mb-4">
              No.{String(summary.indexNumber).padStart(2, "0")} ·{" "}
              {TYPE_LABEL[summary.type]} · {formatDate(summary.date)} ·{" "}
              {summary.readTimeMin} min
            </p>
            <h1 className="font-heading text-text-heading text-4xl md:text-5xl font-bold leading-tight">
              {summary.title}
            </h1>
          </header>

          <article className="prose-reading text-text-body text-lg leading-relaxed font-heading font-light">
            <MDXBody />
          </article>

          <footer className="mt-20 pt-8 border-t border-border-subtle flex items-center justify-between">
            <Link
              href="/notes"
              className="text-sm text-text-body/60 hover:text-accent transition-colors"
            >
              ← Back to Field Notes
            </Link>
            {nextNewer && (
              <Link
                href={`/notes/${nextNewer.slug}`}
                className="text-sm text-text-body/60 hover:text-accent transition-colors text-right max-w-[50%]"
              >
                Next newer: {nextNewer.title} →
              </Link>
            )}
          </footer>
        </div>
      </main>
    </PageTransition>
  );
}
