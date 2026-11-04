"use client";

import { useEffect } from "react";

/** Marks <html data-hydrated> once React is running, which switches off the CSS reveal failsafe. */
export function HydrationMarker() {
  useEffect(() => {
    document.documentElement.setAttribute("data-hydrated", "");
  }, []);
  return null;
}
