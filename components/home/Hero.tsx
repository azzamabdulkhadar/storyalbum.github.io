"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Heart } from "lucide-react";
import { playClick, playChime } from "@/lib/sounds";

/** Deterministic floating petals/particles over the hero. */
function Petals({ count = 14 }: { count?: number }) {
  const petals = Array.from({ length: count }, (_, i) => ({
    left: (i * 73.13) % 100,
    delay: (i % 7) * 3.5,
    duration: 20 + ((i * 7) % 14),
    size: 6 + ((i * 5) % 8),
    key: i,
  }));
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.key}
          className="absolute animate-drift rounded-[60%_40%_55%_45%/50%_60%_40%_50%] bg-blush/50"
          style={{
            left: `${p.left}%`,
            bottom: "-6vh",
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* painted sunset sky */}
      <div
        aria-hidden
        className="absolute inset-0 scale-110"
        style={{
          transform: `translateY(${offset * 0.25}px) scale(1.12)`,
          background:
            "linear-gradient(180deg,#231a38 0%,#4a2a4e 26%,#8a4a63 46%,#c76f74 62%,#e8a08a 78%,#f3c9a5 92%,#3a2136 100%)",
        }}
      />
      {/* glow */}
      <div
        aria-hidden
        className="absolute left-[62%] top-[52%] size-56 -translate-x-1/2 rounded-full bg-[#ffd9a0]/45 blur-3xl md:size-80"
      />
      {/* silhouette field */}
      <svg
        aria-hidden
        viewBox="0 0 1440 500"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-[38%] w-full text-[#241726]"
      >
        <path d="M0 500 L0 320 Q200 220 420 300 Q640 380 860 260 Q1100 130 1300 250 Q1380 295 1440 280 L1440 500 Z" fill="currentColor" />
        <path d="M0 500 L0 420 Q260 350 520 410 Q780 470 1040 390 Q1260 330 1440 400 L1440 500 Z" fill="#1b1119" />
      </svg>
      <Petals />

      <div
        className="container-page relative pb-28 pt-32"
        style={{ transform: `translateY(${offset * -0.08}px)`, opacity: 1 - offset / 700 }}
      >
        <p className="font-hand text-2xl text-blush md:text-3xl">Her Story</p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.15] text-mooncream sm:text-5xl md:text-6xl">
          Some stories are written in words...
          <span className="mt-3 block font-light italic text-blush">
            hers was written in moments.{" "}
            <Heart className="mb-2 inline size-6 fill-blush text-blush md:size-8" />
          </span>
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-mooncream/75 md:text-base">
          A little collection of her memories, her smiles, her dreams, and
          everything that makes her... her.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/her-life"
            onClick={() => playChime()}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-rose px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(169,92,104,0.7)] transition-all hover:-translate-y-0.5 hover:bg-burgundy"
          >
            Enter Her Story
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/memories"
            onClick={() => playClick()}
            className="inline-flex items-center justify-center rounded-full border border-mooncream/35 px-7 py-3.5 text-sm font-semibold text-mooncream/90 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-blush hover:text-blush"
          >
            Explore Memories
          </Link>
        </div>
      </div>

      {/* scroll hint */}
      <a
        href="#who-is-she"
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-mooncream/60 transition-colors hover:text-blush"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll Down</span>
        <ChevronDown className="size-4 animate-bounce" />
      </a>
    </section>
  );
}
