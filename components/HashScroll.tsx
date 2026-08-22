"use client";

import { useEffect } from "react";

/**
 * Scrolls to the element matching the current URL hash on mount.
 *
 * The footer's "How It Works" link points at `/#how-it-works`. On a normal
 * same-page click, the browser's native hash-scroll just works. But arriving
 * from a *different* route, Next.js client-navigates to this page while it's
 * still fetching/streaming server data — the target element doesn't exist in
 * the DOM yet at the moment the browser tries the native hash scroll, so it
 * silently lands at the top instead. A second click (already on this page)
 * works fine since the element already exists. This retries for a couple
 * seconds so the first click works too, once the element actually mounts.
 */
export default function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const id = hash.slice(1);
    let attempts = 0;
    let frame: number;

    function tryScroll() {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      attempts += 1;
      if (attempts < 120) {
        frame = requestAnimationFrame(tryScroll);
      }
    }

    frame = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(frame);
  }, []);

  return null;
}
