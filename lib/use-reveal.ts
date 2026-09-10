"use client";

import { useEffect } from "react";

/**
 * Global scroll-reveal: any element with .reveal gets .is-visible
 * when it enters the viewport. Delay via style={{ "--reveal-delay": "150ms" }}.
 *
 * Safety: the html.js-reveal class (which enables hiding) is only added
 * after the observer is successfully attached, and a periodic failsweep
 * reveals anything already on screen that was missed.
 */
export function useReveal(_pathname?: string) {
  useEffect(() => {
    const root = document.documentElement;

    let io: IntersectionObserver | null = null;
    const sweep = () => {
      document
        .querySelectorAll<HTMLElement>(".reveal:not(.is-visible)")
        .forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) {
            el.classList.add("is-visible");
          }
        });
    };

    try {
      const els = Array.from(
        document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)")
      );
      if (!("IntersectionObserver" in window)) {
        els.forEach((el) => el.classList.add("is-visible"));
        return;
      }
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              io?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
      );
      els.forEach((el) => io!.observe(el));
      // Observer is live — now it's safe to let CSS hide upcoming elements.
      root.classList.add("js-reveal");
    } catch {
      document
        .querySelectorAll<HTMLElement>(".reveal")
        .forEach((el) => el.classList.add("is-visible"));
    }

    // Failsweep: catch anything the observer missed (route changes,
    // dynamically added cards, edge timing) and reveal it.
    const interval = window.setInterval(sweep, 1500);
    window.addEventListener("scroll", sweep, { passive: true });

    return () => {
      io?.disconnect();
      window.clearInterval(interval);
      window.removeEventListener("scroll", sweep);
    };
  }, [_pathname]);
}
