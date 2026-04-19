import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border-glass py-12 px-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <Link
          href="/"
          className="font-heading text-text-heading text-xl font-bold tracking-tight"
        >
          PORTFOLIO
        </Link>

        <p className="text-text-body/50 text-sm">
          &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
