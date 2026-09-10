"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Copy, Check, Shuffle } from "lucide-react";
import type { Quote } from "@/data/story";
import { playClick, playChime } from "@/lib/sounds";

export default function QuoteCarousel({
  quotes,
  categories,
  showFilters = true,
}: {
  quotes: Quote[];
  categories?: string[];
  showFilters?: boolean;
}) {
  const [cat, setCat] = useState("All");
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [dir, setDir] = useState(1);

  const filtered = useMemo(
    () => (cat === "All" ? quotes : quotes.filter((q) => q.category === cat)),
    [cat, quotes]
  );

  const go = useCallback(
    (d: number) => {
      setDir(d);
      setIndex((i) => (i + d + filtered.length) % filtered.length);
      playClick();
    },
    [filtered.length]
  );

  const shuffle = () => {
    setDir(Math.random() > 0.5 ? 1 : -1);
    setIndex((i) => {
      if (filtered.length < 2) return i;
      let n = i;
      while (n === i) n = Math.floor(Math.random() * filtered.length);
      return n;
    });
    playChime();
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(filtered[index].text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  const quote = filtered[Math.min(index, filtered.length - 1)];

  return (
    <div>
      {showFilters && categories && (
        <div className="no-scrollbar -mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 md:flex-wrap md:justify-center">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCat(c);
                setIndex(0);
                playClick();
              }}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                cat === c
                  ? "border-rose bg-rose text-white shadow-[0_6px_18px_-6px_rgba(169,92,104,0.7)]"
                  : "border-white/20 bg-white/5 text-mooncream/70 hover:border-nightrose/60 hover:text-nightrose"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="relative mx-auto max-w-2xl">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-4 rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm"
        />
        <div className="relative min-h-[240px] overflow-hidden rounded-[1.7rem] border border-white/15 bg-white/[0.04] p-8 text-center md:p-12">
          <span aria-hidden className="pointer-events-none absolute left-6 top-4 font-display text-7xl text-nightrose/30">
            &ldquo;
          </span>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.blockquote
              key={quote?.id ?? index}
              custom={dir}
              initial={{ opacity: 0, x: 40 * dir, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -40 * dir, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex min-h-[150px] flex-col items-center justify-center"
            >
              <p className="whitespace-pre-line font-display text-lg leading-relaxed text-mooncream md:text-2xl md:leading-relaxed">
                {quote?.text}
              </p>
              <span className="mt-5 text-nightrose">♡</span>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-7 flex items-center justify-center gap-3">
          <button
            onClick={() => go(-1)}
            aria-label="Previous quote"
            className="grid size-11 place-items-center rounded-full border border-white/20 text-mooncream/80 transition-all hover:border-nightrose hover:text-nightrose active:scale-90"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={shuffle}
            className="inline-flex items-center gap-2 rounded-full bg-nightrose px-6 py-3 text-sm font-semibold text-midnight transition-all hover:-translate-y-0.5 hover:bg-mooncream active:scale-95"
          >
            <Shuffle className="size-4" /> Shuffle
          </button>
          <button
            onClick={copy}
            aria-label="Copy quote"
            className="grid size-11 place-items-center rounded-full border border-white/20 text-mooncream/80 transition-all hover:border-nightrose hover:text-nightrose active:scale-90"
          >
            {copied ? <Check className="size-5 text-nightrose" /> : <Copy className="size-4.5" />}
          </button>
        </div>
        <div className="mt-4 flex justify-center gap-1.5" aria-hidden>
          {filtered.map((q, i) => (
            <span
              key={q.id}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index ? "w-5 bg-nightrose" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
