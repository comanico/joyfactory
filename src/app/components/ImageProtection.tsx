"use client";

import { useEffect } from "react";

/** Blocks right-click save and drag-to-save on images site-wide. */
export default function ImageProtection() {
  useEffect(() => {
    const block = (event: Event) => {
      if (event.target instanceof HTMLImageElement) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", block);
    document.addEventListener("dragstart", block);

    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("dragstart", block);
    };
  }, []);

  return null;
}
