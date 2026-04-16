import Link from "next/link";

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Behance", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle py-12 px-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <Link
          href="/"
          className="font-heading text-text-heading text-xl font-bold tracking-tight"
        >
          STUDIO
        </Link>

        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-text-body text-sm hover:text-text-heading transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>

        <p className="text-text-body/50 text-sm">
          &copy; {new Date().getFullYear()} Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
