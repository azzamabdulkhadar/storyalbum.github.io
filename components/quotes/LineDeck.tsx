"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Line } from "@/data/story";
import { playClick, playChime } from "@/lib/sounds";

/** Stacked-paper card that reveals lines one by one. */
export default function LineDeck({ items }: { items: Line[] }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const current = items[index];

  const next = () => {
    setDir(1);
    setIndex((i) => (i + 1) % items.length);
    playChime();
  };
  const prev = () => {
    setDir(-1);
    setIndex((i) => (i - 1 + items.length) % items.length);
    playClick();
  };

  return (
    <div className="relative mx-auto max-w-xl">
      {/* stacked sheets behind */}
      <div aria-hidden className="absolute inset-x-4 -bottom-3 h-full -z-10 rotate-[1.6deg] rounded-2xl border border-blush bg-white/70 shadow-sm" />
      <div aria-hidden className="absolute inset-x-2 -bottom-1.5 h-full -z-10 rotate-[0.8deg] rounded-2xl border border-blush bg-white/85 shadow-sm" />

      <div className="relative overflow-hidden rounded-2xl border border-blush bg-white p-8 shadow-[var(--shadow-soft)] md:p-12">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.p
            key={current.id}
            initial={{ opacity: 0, x: 24 * dir }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 * dir }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-[120px] items-center justify-center text-center font-display text-xl leading-relaxed text-plum md:text-2xl"
          >
            {current.text}
          </motion.p>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={prev}
            aria-label="Previous line"
            className="grid size-10 place-items-center rounded-full border border-blush text-dusty transition-all hover:border-rose hover:text-rose active:scale-90"
          >
            <ArrowRight className="size-4 rotate-180" />
          </button>
          <span className="font-hand text-lg text-muted">
            {index + 1} / {items.length}
          </span>
          <button
            onClick={next}
            className="inline-flex items-center gap-2 rounded-full bg-burgundy px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-rose active:scale-95"
          >
            Next <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      <p aria-hidden className="absolute -bottom-8 right-2 rotate-[-6deg] font-hand text-xl text-dusty">
        just you ♡
      </p>
    </div>
  );
}
