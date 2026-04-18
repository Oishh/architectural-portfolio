import type { ReactNode } from "react";

type AsideProps = {
  children: ReactNode;
};

export default function Aside({ children }: AsideProps) {
  return (
    <aside className="my-8 ml-0 md:ml-6 border-l border-border-subtle pl-5 text-text-body/80 text-[0.95em] leading-relaxed">
      {children}
    </aside>
  );
}
