"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import GradientPhoto from "@/components/ui/GradientPhoto";
import { playClick } from "@/lib/sounds";

/** Draggable then/now comparison slider. Mouse, touch & keyboard. */
export default function CompareSlider({
  thenLabel = "Then",
  nowLabel = "Now",
  thenText,
  nowText,
  thenPreset,
  nowPreset,
}: {
  thenLabel?: string;
  nowLabel?: string;
  thenText: string;
  nowText: string;
  thenPreset: string;
  nowPreset: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(Math.max(pct, 4), 96));
  }, []);

  return (
    <div className="mx-auto max-w-3xl">
      <div
        ref={ref}
        className="relative aspect-[4/3] select-none overflow-hidden rounded-3xl shadow-[var(--shadow-soft)] md:aspect-[16/9]"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        {/* NOW (base layer) */}
        <GradientPhoto preset={nowPreset} rounded="rounded-none" className="absolute inset-0 h-full w-full" />
        <div className="absolute bottom-4 right-4 text-right">
          <p className="font-hand text-2xl text-white">{nowLabel}</p>
          <p className="max-w-[180px] text-xs leading-snug text-white/85">{nowText}</p>
        </div>

        {/* THEN (clipped layer) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <GradientPhoto preset={thenPreset} rounded="rounded-none" className="h-full w-full" />
          <div className="absolute bottom-4 left-4">
            <p className="font-hand text-2xl text-white">{thenLabel}</p>
            <p className="max-w-[180px] text-xs leading-snug text-white/85">{thenText}</p>
          </div>
        </div>

        {/* handle */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.4)]"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-burgundy shadow-lg">
            <ChevronsLeftRight className="size-5" />
          </span>
        </div>

        {/* keyboard-accessible control */}
        <label className="sr-only" htmlFor="compare-range">
          Comparison position
        </label>
        <input
          id="compare-range"
          type="range"
          min={4}
          max={96}
          value={Math.round(pos)}
          onChange={(e) => {
            setPos(Number(e.target.value));
            playClick();
          }}
          className="absolute inset-x-0 bottom-3 mx-auto w-[70%] cursor-ew-resize accent-white opacity-0 transition-opacity focus:opacity-100 md:hover:opacity-30"
        />
      </div>
      <p className="mt-4 text-center text-xs text-muted">
        Drag the handle — or focus the slider and use arrow keys.
      </p>
    </div>
  );
}
