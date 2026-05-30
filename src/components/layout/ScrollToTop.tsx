"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Resets the window scroll position to the top on every page navigation.
 * Must be a Client Component because it uses usePathname + useEffect.
 * Renders nothing — pure behaviour.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // "instant" skips the smooth-scroll animation so it feels like a real page load
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
