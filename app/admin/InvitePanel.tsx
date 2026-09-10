"use client";

import { useState, useTransition } from "react";
import { Copy, Check, TicketPlus, Loader2 } from "lucide-react";
import { generateInviteCode } from "./actions";

export default function InvitePanel() {
  const [pending, startTransition] = useTransition();
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    startTransition(async () => {
      const res = await generateInviteCode();
      if (res.ok && res.code) {
        setCode(res.code);
        setError(null);
      } else {
        setError(res.message);
      }
    });
  };

  const copy = async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div>
      <button
        onClick={generate}
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-full bg-rose px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-burgundy disabled:opacity-60"
      >
        {pending ? <Loader2 className="size-4 animate-spin" /> : <TicketPlus className="size-4" />}
        Generate Invite Code
      </button>

      {code && (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-blush bg-cream/70 px-4 py-3">
          <code className="flex-1 font-mono text-base font-bold tracking-widest text-burgundy">
            {code}
          </code>
          <button
            onClick={copy}
            aria-label="Copy invite code"
            className="rounded-full p-2 text-dusty transition-colors hover:bg-blush/50 hover:text-burgundy"
          >
            {copied ? <Check className="size-4 text-green-600" /> : <Copy className="size-4" />}
          </button>
        </div>
      )}
      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      <p className="mt-3 text-xs leading-relaxed text-muted">
        Each code works exactly once — share it with someone you want to
        invite. The database rejects signups with invalid or used codes even
        if the form is bypassed.
      </p>
    </div>
  );
}
