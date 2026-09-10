"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import type { Song } from "@/data/story";
import GradientPhoto from "@/components/ui/GradientPhoto";
import { playClick } from "@/lib/sounds";

/**
 * Playlist player. Real audio is attached later via Supabase Storage
 * (song.audio_url). Until then the player runs in "visual preview" mode
 * with a simulated progress bar, so no autoplay policies are involved.
 */
export default function SongList({ songs }: { songs: Song[] }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    const tick = () => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.25));
      raf.current = window.setTimeout(tick, 120) as unknown as number;
    };
    raf.current = window.setTimeout(tick, 120) as unknown as number;
    return () => {
      if (raf.current) clearTimeout(raf.current);
    };
  }, [playing]);

  const toggleLike = (id: string) => {
    setLiked((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
    playClick();
  };

  const song = songs[current];

  return (
    <div className="mx-auto max-w-2xl">
      <ol className="space-y-2.5">
        {songs.map((s, i) => (
          <li key={s.id}>
            <div
              className={`flex items-center gap-3 rounded-2xl border p-3 transition-all md:gap-4 md:p-4 ${
                i === current
                  ? "border-nightrose/50 bg-white/[0.06]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/25"
              }`}
            >
              <button
                onClick={() => {
                  setCurrent(i);
                  setProgress(0);
                  setPlaying((p) => (i === current ? !p : true));
                  playClick();
                }}
                aria-label={`${i === current && playing ? "Pause" : "Play"} ${s.title}`}
                className="group relative size-12 shrink-0 overflow-hidden rounded-xl md:size-14"
              >
                <GradientPhoto preset={s.preset} rounded="rounded-none" className="h-full w-full" />
                <span className="absolute inset-0 grid place-items-center bg-black/35 opacity-0 backdrop-blur-[2px] transition-opacity group-hover:opacity-100">
                  {i === current && playing ? (
                    <Pause className="size-5 text-white" />
                  ) : (
                    <Play className="size-5 fill-white text-white" />
                  )}
                </span>
                {i === current && playing && (
                  <span className="absolute inset-0 grid place-items-center bg-black/35">
                    <Pause className="size-5 text-white" />
                  </span>
                )}
              </button>
              <button
                onClick={() => setCurrent(i)}
                className="min-w-0 flex-1 text-left"
              >
                <p className={`truncate text-sm font-semibold ${i === current ? "text-nightrose" : "text-mooncream"}`}>
                  {s.title}
                </p>
                <p className="truncate text-xs text-mooncream/50">{s.artist}</p>
                <p className="mt-0.5 hidden truncate text-xs text-mooncream/40 sm:block">{s.reason}</p>
              </button>
              <span className="hidden text-xs tabular-nums text-mooncream/40 sm:block">{s.duration}</span>
              <button
                onClick={() => toggleLike(s.id)}
                aria-label={liked.has(s.id) ? `Unlike ${s.title}` : `Like ${s.title}`}
                aria-pressed={liked.has(s.id)}
                className="rounded-full p-2 text-mooncream/40 transition-all hover:scale-110 hover:text-nightrose"
              >
                <Heart className={`size-4 ${liked.has(s.id) ? "fill-nightrose text-nightrose" : ""}`} />
              </button>
            </div>
          </li>
        ))}
      </ol>

      {/* mini player bar */}
      <div className="sticky bottom-4 mt-6 rounded-2xl border border-white/15 bg-plumnight/90 p-3.5 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <p className="min-w-0 flex-1 truncate text-xs text-mooncream/70">
            <span className="font-semibold text-nightrose">{song.title}</span>
            {" · "}
            {song.artist}
            {!playing && <span className="ml-2 text-mooncream/35">(preview mode)</span>}
          </p>
          <button aria-label="Previous song" onClick={() => { setCurrent((c) => (c - 1 + songs.length) % songs.length); setProgress(0); playClick(); }} className="rounded-full p-2 text-mooncream/70 hover:text-nightrose">
            <SkipBack className="size-4" />
          </button>
          <button
            aria-label={playing ? "Pause" : "Play"}
            onClick={() => { setPlaying((p) => !p); playClick(); }}
            className="grid size-10 place-items-center rounded-full bg-nightrose text-midnight transition-transform hover:scale-105 active:scale-95"
          >
            {playing ? <Pause className="size-4.5" /> : <Play className="size-4.5 fill-current" />}
          </button>
          <button aria-label="Next song" onClick={() => { setCurrent((c) => (c + 1) % songs.length); setProgress(0); playClick(); }} className="rounded-full p-2 text-mooncream/70 hover:text-nightrose">
            <SkipForward className="size-4" />
          </button>
          <Volume2 className="size-4 text-mooncream/40" />
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-nightrose to-blush transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
