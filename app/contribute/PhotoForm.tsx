"use client";

import { useState, useTransition } from "react";
import { Check, ImagePlus, Loader2 } from "lucide-react";
import type { ActionResult } from "./actions";

const inputCls =
  "mt-1.5 w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-mooncream placeholder:text-mooncream/30 focus:border-nightrose focus:outline-none";
const labelCls =
  "text-xs font-semibold uppercase tracking-[0.16em] text-mooncream/60";

export default function PhotoForm() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    startTransition(async () => {
      const { uploadPhoto } = await import("./actions");
      const res = await uploadPhoto(fd);
      setResult(res);
      if (res.ok) {
        form.reset();
        setFileName("");
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <span className={labelCls}>Photo</span>
        <label className="mt-1.5 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/25 bg-white/[0.04] px-4 py-5 transition-colors hover:border-nightrose/60">
          <ImagePlus className="size-5 text-nightrose" />
          <span className="text-sm text-mooncream/60">
            {fileName || "Choose a photo (JPG/PNG/WebP, max 8 MB)"}
          </span>
          <input
            type="file"
            name="photo"
            accept="image/jpeg,image/png,image/webp,image/gif"
            required
            className="hidden"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          />
        </label>
      </div>
      <div>
        <label htmlFor="p-title" className={labelCls}>Title</label>
        <input id="p-title" name="title" required maxLength={120} className={inputCls} placeholder="Golden hour with her" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="p-cat" className={labelCls}>Category</label>
          <select id="p-cat" name="category" className={inputCls} defaultValue="Random">
            {["Friends", "Family", "Trips", "Birthdays", "College", "Childhood", "Random"].map((c) => (
              <option key={c} value={c} className="bg-midnight">{c}</option>
            ))}
          </select>
        </div>
        <div className="flex items-end pb-1">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-mooncream/70">
            <input type="checkbox" name="is_public" defaultChecked className="size-4 accent-nightrose" />
            Show publicly on the site
          </label>
        </div>
      </div>
      <div>
        <label htmlFor="p-note" className={labelCls}>Memory note</label>
        <textarea id="p-note" name="note" rows={2} maxLength={500} className={inputCls} placeholder="A completely ordinary day that somehow became a beautiful memory." />
      </div>
      <Feedback result={result} />
      <SubmitButton pending={pending} label="Upload Photo" />
    </form>
  );
}

export function Feedback({ result }: { result: ActionResult | null }) {
  if (!result) return null;
  return (
    <p
      role="status"
      className={`rounded-xl border px-4 py-2.5 text-sm ${
        result.ok
          ? "border-green-400/30 bg-green-400/10 text-green-300"
          : "border-red-400/30 bg-red-400/10 text-red-300"
      }`}
    >
      <span className="inline-flex items-center gap-1.5">
        {result.ok && <Check className="size-4" />}
        {result.message}
      </span>
    </p>
  );
}

export function SubmitButton({ pending, label }: { pending: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-nightrose px-7 py-3 text-sm font-semibold text-midnight transition-all hover:-translate-y-0.5 hover:bg-mooncream disabled:opacity-60"
    >
      {pending && <Loader2 className="size-4 animate-spin" />}
      {pending ? "Saving..." : label}
    </button>
  );
}
