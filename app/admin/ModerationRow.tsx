"use client";

import { useState, useTransition } from "react";
import { Eye, EyeOff, Trash2, Loader2 } from "lucide-react";
import { toggleVisibility, deleteRow } from "./actions";

export default function ModerationRow({
  table,
  id,
  title,
  subtitle,
  isPublic,
}: {
  table: "quotes" | "memories" | "letters";
  id: string;
  title: string;
  subtitle: string;
  isPublic: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [publicState, setPublicState] = useState(isPublic);
  const [removed, setRemoved] = useState(false);

  if (removed) return null;

  return (
    <li className="flex items-center gap-3 rounded-2xl border border-blush/60 bg-white/70 p-3.5">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-burgundy">{title}</p>
        <p className="truncate text-xs text-muted">{subtitle}</p>
      </div>
      <button
        onClick={() =>
          startTransition(async () => {
            const res = await toggleVisibility(table, id, !publicState);
            if (res.ok) setPublicState(!publicState);
          })
        }
        disabled={pending}
        aria-label={publicState ? "Unpublish" : "Publish"}
        title={publicState ? "Unpublish" : "Publish"}
        className="rounded-full p-2 text-dusty transition-colors hover:bg-blush/50 hover:text-burgundy"
      >
        {pending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : publicState ? (
          <Eye className="size-4" />
        ) : (
          <EyeOff className="size-4" />
        )}
      </button>
      <button
        onClick={() =>
          startTransition(async () => {
            const res = await deleteRow(table, id);
            if (res.ok) setRemoved(true);
          })
        }
        disabled={pending}
        aria-label="Delete"
        title="Delete"
        className="rounded-full p-2 text-red-300 transition-colors hover:bg-red-50 hover:text-red-500"
      >
        <Trash2 className="size-4" />
      </button>
      <span
        className={`w-16 text-right text-[10px] font-bold uppercase tracking-wider ${
          publicState ? "text-green-600" : "text-muted"
        }`}
      >
        {table === "letters"
          ? publicState ? "open" : "sealed"
          : publicState ? "public" : "private"}
      </span>
    </li>
  );
}
