import PullQuote from "./PullQuote";
import type { Project } from "@/data/projects";

type Props = {
  quotes: NonNullable<Project["pullQuotes"]>;
};

export default function ProjectPullQuotes({ quotes }: Props) {
  if (quotes.length === 0) return null;
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        {quotes.map((q, i) => (
          <PullQuote key={i} attribution={q.attribution}>
            {q.text}
          </PullQuote>
        ))}
      </div>
    </section>
  );
}
