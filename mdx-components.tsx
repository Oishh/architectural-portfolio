import type { MDXComponents } from "mdx/types";
import PullQuote from "@/components/PullQuote";
import Figure from "@/components/Figure";
import Aside from "@/components/Aside";

const components: MDXComponents = {
  PullQuote,
  Figure,
  Aside,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
