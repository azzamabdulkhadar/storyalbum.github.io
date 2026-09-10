"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

/** Password input with a show/hide toggle eye button. */
export default function PasswordInput({
  id,
  label,
  value,
  onChange,
  autoComplete = "current-password",
  placeholder = "••••••••",
  minLength,
  required = true,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  placeholder?: string;
  minLength?: number;
  required?: boolean;
}) {
  const [show, setShow] = useState(false);
  const inputCls =
    "mt-1.5 w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 pr-12 text-sm text-mooncream placeholder:text-mooncream/30 focus:border-nightrose focus:outline-none";

  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.16em] text-mooncream/60">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          required={required}
          minLength={minLength}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputCls}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Hide password" : "Show password"}
          aria-pressed={show}
          className="absolute right-2 top-1/2 mt-0.5 -translate-y-1/2 rounded-full p-2 text-mooncream/40 transition-colors hover:bg-white/10 hover:text-nightrose"
        >
          {show ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
        </button>
      </div>
    </div>
  );
}
