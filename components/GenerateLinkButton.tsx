"use client";

import { useState } from "react";

type State = "idle" | "loading" | "copied" | "error";

export default function GenerateLinkButton() {
  const [state, setState] = useState<State>("idle");

  async function handleClick() {
    setState("loading");
    try {
      const res = await fetch("/api/admin/generate-token", { method: "POST" });
      if (!res.ok) throw new Error();
      const { url } = await res.json();
      await navigator.clipboard.writeText(url);
      setState("copied");
      setTimeout(() => setState("idle"), 2500);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 2500);
    }
  }

  const label =
    state === "loading" ? "…"
    : state === "copied" ? "Copied!"
    : state === "error" ? "Error"
    : "Generate Link";

  return (
    <button
      onClick={handleClick}
      disabled={state === "loading"}
      title="Generate a one-time access link"
      className={`
        text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all duration-200
        ${state === "copied"
          ? "border-green-500/50 text-green-400"
          : state === "error"
          ? "border-red-500/50 text-red-400"
          : "border-border-glass text-text-body hover:text-text-heading hover:border-accent/50"
        }
      `}
    >
      {label}
    </button>
  );
}
