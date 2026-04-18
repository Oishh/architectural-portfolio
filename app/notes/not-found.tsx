import Link from "next/link";

export default function NotFound() {
  return (
    <main className="pt-40 pb-24 px-6 text-center">
      <p className="text-xs uppercase tracking-widest text-accent mb-4">404</p>
      <h1 className="font-heading text-text-heading text-4xl md:text-5xl font-bold mb-6">
        That note doesn&apos;t exist.
      </h1>
      <Link href="/notes" className="text-accent underline">
        Back to Field Notes
      </Link>
    </main>
  );
}
