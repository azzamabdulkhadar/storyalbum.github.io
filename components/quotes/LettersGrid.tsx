"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import type { Letter } from "@/data/story";
import { FlowerDoodle, HeartDoodle } from "@/components/ui/Doodles";
import { playOpen } from "@/lib/sounds";

export default function LettersGrid({ letters }: { letters: Letter[] }) {
  const [open, setOpen] = useState<Letter | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {letters.map((l, i) => (
          <button
            key={l.id}
            onClick={() => {
              setOpen(l);
              playOpen();
            }}
            style={{ "--reveal-delay": `${(i % 3) * 120}ms`, rotate: `${(i % 3) - 1}deg` } as React.CSSProperties}
            className="reveal group relative rounded-2xl border border-blush bg-gradient-to-b from-white to-cream/60 p-7 text-left shadow-[var(--shadow-polaroid)] transition-all duration-500 hover:-translate-y-1.5 hover:rotate-0 hover:shadow-[var(--shadow-soft)]"
          >
            <h3 className="font-display text-lg font-semibold text-burgundy">{l.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{l.preview}</p>
            <p className="mt-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.16em] text-dusty transition-colors group-hover:text-rose">
              Read <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </p>
            <HeartDoodle className="absolute right-4 top-4 size-6 text-blush transition-colors group-hover:text-dusty" />
          </button>
        ))}
      </div>

      {/* Reading view */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-plum/60 p-4 backdrop-blur-sm md:p-8"
            onClick={() => setOpen(null)}
          >
            <motion.article
              initial={{ y: 40, rotate: -1.5, opacity: 0 }}
              animate={{ y: 0, rotate: -0.5, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative my-8 w-full max-w-lg rounded-md bg-[#fffdf6] p-8 shadow-2xl md:p-12"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(transparent, transparent 27px, rgba(169,92,104,0.09) 28px)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(null)}
                aria-label="Close letter"
                className="absolute right-4 top-4 rounded-full p-2 text-muted transition-colors hover:bg-cream hover:text-burgundy"
              >
                <X className="size-5" />
              </button>
              <p className="font-hand text-xl text-dusty">a letter</p>
              <h3 className="mt-1 font-display text-2xl font-semibold text-burgundy md:text-3xl">
                {open.title}
              </h3>
              <div className="mt-6 space-y-4 font-display text-[15px] leading-[28px] text-plum/90">
                {open.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className="mt-8 text-right font-hand text-2xl text-rose">
                — {open.signature}
              </p>
              <FlowerDoodle className="pointer-events-none absolute -bottom-5 -left-5 size-24 text-blush/60" />
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
