import type { ReactNode } from "react";

type PullQuoteProps = {
  attribution?: string;
  children: ReactNode;
};

export default function PullQuote({ attribution, children }: PullQuoteProps) {
  return (
    <figure className="my-10 border-l-2 border-accent pl-6 md:pl-8">
      <blockquote className="font-heading text-text-heading text-xl md:text-2xl font-light italic leading-snug">
        {children}
      </blockquote>
      {attribution && (
        <figcaption className="mt-3 text-sm text-text-body/70 uppercase tracking-widest">
          — {attribution}
        </figcaption>
      )}
    </figure>
  );
}
