import type { ReactNode } from "react";
import { renderPlaceholders } from "@/lib/placeholders";

/** Renders copy that may contain [[placeholders]]. Use for every string from content/ or site.ts. */
export function Text({ children }: { children: ReactNode }) {
  return <>{renderPlaceholders(children)}</>;
}
