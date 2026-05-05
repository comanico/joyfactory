"use client";

import { useEffect } from "react";

/**
 * When the URL hash is `#newsletter`, focus the footer newsletter input.
 * This keeps the "Join Newsletter" footer link a simple anchor, while still
 * making it immediately actionable.
 */
export default function FocusNewsletterOnHash() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#newsletter") return;
    const el = document.getElementById("newsletter-email") as HTMLInputElement | null;
    if (!el) return;
    el.focus();
    el.select();
  }, []);

  return null;
}

