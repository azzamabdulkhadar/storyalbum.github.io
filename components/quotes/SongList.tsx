"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Heart, Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import type { Song } from "@/data/story";
import GradientPhoto from "@/components/ui/GradientPhoto";
import { playClick } from "@/lib/sounds";

const fmt = (t: number) => {
  if (!Number.isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export default function SongList({ songs }: { songs: Song[] }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0-100
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const song = songs[current];

  // single shared audio element; load the current track
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song?.audio) return;
    audio.src = song.audio;
    audio.load();
    setProgress(0);
    setTime(0);
    setDuration(0);
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing]);

  const onEnded = useCallback(() => {
    setCurrent((c) => (c + 1) % songs.length);
  }, [songs.length]);

  const select = (i: number) => {
    setCurrent(i);
    setPlaying(true);
    playClick();
  };

  const seek = (pct: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration) || audio.duration === 0) return;
    audio.currentTime = (pct / 100) * audio.duration;
  };

  const toggleLike = (id: string) => {
    setLiked((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
    playClick();
  };

  return (
    <div className="mx-auto max-w-2xl">
      <audio
        ref={audioRef}
        onEnded={onEnded}
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          setTime(a.currentTime);
          if (a.duration) setProgress((a.currentTime / a.duration) * 100);
        }}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        preload="none"
      />
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
                onClick={() => (i === current ? setPlaying((p) => !p) : select(i))}
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
                onClick={() => (i === current ? setPlaying((p) => !p) : select(i))}
                className="min-w-0 flex-1 text-left"
              >
                <p className={`truncate text-sm font-semibold ${i === current ? "text-nightrose" : "text-mooncream"}`}>
                  {s.title}
                </p>
                <p className="truncate text-xs text-mooncream/50">{s.artist}</p>
                <p className="mt-0.5 hidden truncate text-xs text-mooncream/40 sm:block">{s.reason}</p>
              </button>
              <span className="hidden text-xs tabular-nums text-mooncream/40 sm:block">
                {duration && i === current ? fmt(duration) : s.duration}
              </span>
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
          </p>
          <button aria-label="Previous song" onClick={() => { setCurrent((c) => (c - 1 + songs.length) % songs.length); playClick(); }} className="rounded-full p-2 text-mooncream/70 hover:text-nightrose">
            <SkipBack className="size-4" />
          </button>
          <button
            aria-label={playing ? "Pause" : "Play"}
            onClick={() => { setPlaying((p) => !p); playClick(); }}
            className="grid size-10 place-items-center rounded-full bg-nightrose text-midnight transition-transform hover:scale-105 active:scale-95"
          >
            {playing ? <Pause className="size-4.5" /> : <Play className="size-4.5 fill-current" />}
          </button>
          <button aria-label="Next song" onClick={() => { setCurrent((c) => (c + 1) % songs.length); playClick(); }} className="rounded-full p-2 text-mooncream/70 hover:text-nightrose">
            <SkipForward className="size-4" />
          </button>
          <Volume2 className="size-4 text-mooncream/40" />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="w-10 text-right text-[10px] tabular-nums text-mooncream/40">{fmt(time)}</span>
          <div
            className="h-1 flex-1 cursor-pointer overflow-hidden rounded-full bg-white/10"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              seek(((e.clientX - rect.left) / rect.width) * 100);
            }}
            role="progressbar"
            aria-label="Seek"
            aria-valuenow={Math.round(progress)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") seek(Math.min(progress + 5, 100));
              if (e.key === "ArrowLeft") seek(Math.max(progress - 5, 0));
            }}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-nightrose to-blush transition-[width] duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="w-10 text-[10px] tabular-nums text-mooncream/40">
            {duration ? fmt(duration) : song.duration}
          </span>
        </div>
      </div>
    </div>
  );
}
