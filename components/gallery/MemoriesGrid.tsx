"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";
import GradientPhoto from "@/components/ui/GradientPhoto";
import { memoryCategories, type Memory } from "@/data/story";
import { playClick, playOpen } from "@/lib/sounds";

export default function MemoriesGrid({
  items,
  showFilters = true,
}: {
  items: Memory[];
  showFilters?: boolean;
}) {
  const [cat, setCat] = useState("All");
  const [active, setActive] = useState<number | null>(null);

  const filtered = useMemo(
    () => (cat === "All" ? items : items.filter((m) => m.category === cat)),
    [cat, items]
  );

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (d: number) => {
      setActive((a) => (a === null ? a : (a + d + filtered.length) % filtered.length));
      playClick();
    },
    [filtered.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  const current = active !== null ? filtered[active] : null;

  return (
    <div>
      {showFilters && (
        <div className="no-scrollbar -mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-1 md:flex-wrap md:justify-center">
          {memoryCategories.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCat(c);
                playClick();
              }}
              className={`shrink-0 rounded-full border px-4.5 py-2 text-xs font-semibold transition-all ${
                cat === c
                  ? "border-burgundy bg-burgundy text-white shadow-[0_6px_18px_-6px_rgba(107,48,58,0.6)]"
                  : "border-blush bg-white text-muted hover:border-dusty hover:text-burgundy"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((m, i) => (
            <motion.button
              key={m.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => {
                setActive(i);
                playOpen();
              }}
              className="group block w-full break-inside-avoid text-left focus-visible:outline-none"
              aria-label={`Open memory: ${m.title}`}
            >
              <div className="overflow-hidden rounded-xl shadow-[var(--shadow-polaroid)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[0.5deg]">
                <GradientPhoto
                  src={m.src}
                  alt={m.title}
                  preset={m.preset}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="w-full aspect-square transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-2.5 px-1">
                <p className="text-sm font-semibold text-burgundy">{m.title}</p>
                <p className="text-xs text-muted">{m.date}</p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-midnight/90 p-4 backdrop-blur-sm md:p-10"
            onClick={close}
          >
            <motion.figure
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <GradientPhoto src={current.src} alt={current.title} preset={current.preset} className="aspect-[16/10] w-full rounded-2xl" rounded="rounded-2xl" />
              <figcaption className="mx-auto mt-5 max-w-xl text-center">
                <p className="font-display text-2xl font-semibold text-mooncream">{current.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-nightrose">
                  {current.date} · {current.category}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-mooncream/70">{current.note}</p>
              </figcaption>

              <button
                onClick={close}
                aria-label="Close"
                className="absolute -top-3 right-0 grid size-10 -translate-y-full place-items-center rounded-full border border-white/20 text-mooncream/80 transition-colors hover:border-nightrose hover:text-nightrose md:-right-3 md:translate-y-0"
              >
                <X className="size-5" />
              </button>
              <button
                onClick={() => step(-1)}
                aria-label="Previous memory"
                className="absolute left-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/30 text-white/85 backdrop-blur transition-all hover:bg-black/50 active:scale-90 md:-left-16"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={() => step(1)}
                aria-label="Next memory"
                className="absolute right-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/30 text-white/85 backdrop-blur transition-all hover:bg-black/50 active:scale-90 md:-right-16"
              >
                <ChevronRight className="size-5" />
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
