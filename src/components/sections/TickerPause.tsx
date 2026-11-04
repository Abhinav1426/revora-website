"use client";

import { useState } from "react";
import { PauseIcon, PlayIcon } from "lucide-react";

/** WCAG 2.2.2 pause control for the role ticker. Toggles data-paused on the nearest [data-ticker]; CSS does the rest. */
export function TickerPause() {
  const [paused, setPaused] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={paused}
      aria-label="Pause moving roles"
      onClick={(e) => {
        const next = !paused;
        setPaused(next);
        e.currentTarget.closest("[data-ticker]")?.toggleAttribute("data-paused", next);
      }}
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-slate transition-colors hover:text-white motion-reduce:hidden"
    >
      {paused ? (
        <PlayIcon aria-hidden="true" className="size-4" strokeWidth={1.5} />
      ) : (
        <PauseIcon aria-hidden="true" className="size-4" strokeWidth={1.5} />
      )}
    </button>
  );
}
