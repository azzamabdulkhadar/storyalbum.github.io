"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useReveal } from "@/lib/use-reveal";

/**
 * Mounts the global IntersectionObserver for .reveal elements.
 * Re-runs on every route change so client-side navigated pages
 * get their content observed too.
 */
export default function RevealInit() {
  const pathname = usePathname();
  useReveal(pathname);
  return null;
}
