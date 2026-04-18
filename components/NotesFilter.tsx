"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { NoteType } from "@/lib/notes";

const CHIPS: { value: NoteType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "essay", label: "Essays" },
  { value: "note", label: "Notes" },
  { value: "field", label: "Field" },
];

export default function NotesFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const active = (params.get("tag") as NoteType | null) ?? "all";

  function setFilter(value: NoteType | "all") {
    const next = new URLSearchParams(params.toString());
    if (value === "all") next.delete("tag");
    else next.set("tag", value);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <div className="flex flex-wrap gap-2 mt-12 mb-8" role="tablist" aria-label="Filter notes">
      {CHIPS.map((chip) => {
        const isActive = active === chip.value;
        return (
          <button
            key={chip.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => setFilter(chip.value)}
            className={`px-4 py-1.5 text-xs uppercase tracking-widest rounded-full border transition-colors ${
              isActive
                ? "border-accent text-text-heading bg-accent/10"
                : "border-border-subtle text-text-body/60 hover:text-text-heading hover:border-text-heading"
            }`}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}
