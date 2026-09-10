"use client";

import { useState, useTransition } from "react";
import { Feedback, SubmitButton } from "./PhotoForm";
import type { ActionResult } from "./actions";

const inputCls =
  "mt-1.5 w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-mooncream placeholder:text-mooncream/30 focus:border-nightrose focus:outline-none";
const labelCls =
  "text-xs font-semibold uppercase tracking-[0.16em] text-mooncream/60";

export function QuoteForm({ mode }: { mode: "shayari" | "line" }) {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set("kind", mode === "shayari" ? "shayari" : "line");
    startTransition(async () => {
      const { addQuote } = await import("./actions");
      const res = await addQuote(fd);
      setResult(res);
      if (res.ok) form.reset();
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor={`${mode}-text`} className={labelCls}>
          {mode === "shayari" ? "Shayari" : "Lovely line"}
        </label>
        <textarea
          id={`${mode}-text`}
          name="text"
          required
          rows={3}
          maxLength={600}
          className={`${inputCls} leading-relaxed`}
          placeholder={
            mode === "shayari"
              ? "Uski muskurahat mein kuch toh baat hai..."
              : "You make everything better."
          }
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${mode}-cat`} className={labelCls}>Category</label>
          <select id={`${mode}-cat`} name="category" className={inputCls} defaultValue={mode === "shayari" ? "Love" : "Cute"}>
            {(mode === "shayari"
              ? ["Love", "Emotional", "Cute", "Deep", "Sad", "Her"]
              : ["Cute", "Romantic", "Playful", "Flirty", "Compliments", "Good Morning", "Good Night"]
            ).map((c) => (
              <option key={c} value={c} className="bg-midnight">{c}</option>
            ))}
          </select>
        </div>
        <div className="flex items-end pb-1">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-mooncream/70">
            <input type="checkbox" name="is_public" defaultChecked className="size-4 accent-nightrose" />
            Show publicly
          </label>
        </div>
      </div>
      <Feedback result={result} />
      <SubmitButton pending={pending} label={mode === "shayari" ? "Add Shayari" : "Add Line"} />
    </form>
  );
}

export function LetterForm() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    startTransition(async () => {
      const { addLetter } = await import("./actions");
      const res = await addLetter(fd);
      setResult(res);
      if (res.ok) form.reset();
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="l-title" className={labelCls}>Title</label>
        <input id="l-title" name="title" required maxLength={120} className={inputCls} placeholder="Dear Younger Me..." />
      </div>
      <div>
        <label htmlFor="l-body" className={labelCls}>Letter (blank line = new paragraph)</label>
        <textarea id="l-body" name="body" required rows={6} maxLength={4000} className={`${inputCls} leading-relaxed`} placeholder="Write from the heart..." />
      </div>
      <label className="flex cursor-pointer items-center gap-2.5 text-sm text-mooncream/70">
        <input type="checkbox" name="is_public" className="size-4 accent-nightrose" />
        Make this letter public (it stays private unless you tick this)
      </label>
      <Feedback result={result} />
      <SubmitButton pending={pending} label="Seal Letter" />
    </form>
  );
}
