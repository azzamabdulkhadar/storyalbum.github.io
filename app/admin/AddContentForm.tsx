"use client";

import { useState, useTransition } from "react";
import { Check, Loader2, Music, Plus } from "lucide-react";

const inputCls =
  "mt-1.5 w-full rounded-xl border border-blush/70 bg-ivory px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-rose focus:outline-none";
const labelCls = "text-xs font-semibold uppercase tracking-[0.14em] text-muted";

type Mode = "song" | "chapter";

export default function AddContentForm({ mode }: { mode: Mode }) {
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; message: string } | null>(null);
  const [audioName, setAudioName] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    startTransition(async () => {
      const { addSong, addChapter } = await import("./actions");
      const res = mode === "song" ? await addSong(fd) : await addChapter(fd);
      setMsg(res);
      if (res.ok) {
        form.reset();
        setAudioName("");
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3.5">
      {mode === "song" ? (
        <>
          <div className="grid gap-3.5 sm:grid-cols-2">
            <div>
              <label htmlFor="s-title" className={labelCls}>Song title *</label>
              <input id="s-title" name="title" required maxLength={120} className={inputCls} placeholder="Perfect" />
            </div>
            <div>
              <label htmlFor="s-artist" className={labelCls}>Artist</label>
              <input id="s-artist" name="artist" maxLength={120} className={inputCls} placeholder="Ed Sheeran" />
            </div>
          </div>
          <div>
            <label htmlFor="s-reason" className={labelCls}>Why it reminds you of her</label>
            <input id="s-reason" name="reason" maxLength={300} className={inputCls} placeholder="Because she's perfect, just the way she is." />
          </div>
          <div className="grid gap-3.5 sm:grid-cols-2">
            <div>
              <label htmlFor="s-duration" className={labelCls}>Duration</label>
              <input id="s-duration" name="duration" maxLength={8} className={inputCls} placeholder="4:23" />
            </div>
            <div>
              <label htmlFor="s-audio" className={labelCls}>Audio file (optional)</label>
              <label
                htmlFor="s-audio"
                className="mt-1.5 flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-dusty/50 bg-ivory px-3.5 py-2.5 text-xs text-muted transition-colors hover:border-rose"
              >
                <Music className="size-4 text-rose" />
                <span className="truncate">{audioName || "MP3 file, max 15 MB"}</span>
              </label>
              <input
                id="s-audio"
                name="audio"
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(e) => setAudioName(e.target.files?.[0]?.name ?? "")}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid gap-3.5 sm:grid-cols-[1fr_3fr]">
            <div>
              <label htmlFor="c-year" className={labelCls}>Year *</label>
              <input id="c-year" name="year" required maxLength={10} className={inputCls} placeholder="2004" />
            </div>
            <div>
              <label htmlFor="c-title" className={labelCls}>Chapter title *</label>
              <input id="c-title" name="title" required maxLength={120} className={inputCls} placeholder="The Beginning" />
            </div>
          </div>
          <div>
            <label htmlFor="c-desc" className={labelCls}>Description</label>
            <input id="c-desc" name="description" maxLength={500} className={inputCls} placeholder="She came into this world with a heart full of love." />
          </div>
        </>
      )}

      {msg && (
        <p
          role="status"
          className={`rounded-xl border px-4 py-2.5 text-sm ${
            msg.ok
              ? "border-green-500/30 bg-green-50 text-green-700"
              : "border-red-300 bg-red-50 text-red-600"
          }`}
        >
          <span className="inline-flex items-center gap-1.5">
            {msg.ok && <Check className="size-4" />}
            {msg.message}
          </span>
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-full bg-burgundy px-6 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-rose disabled:opacity-60"
      >
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
        {mode === "song" ? "Add Song" : "Add Chapter"}
      </button>
    </form>
  );
}
