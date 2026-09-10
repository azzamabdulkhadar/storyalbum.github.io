"use client";

import { useState } from "react";
import Link from "next/link";
import { MailQuestion } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { StarField } from "@/components/ui/Doodles";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured()) return;
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      setError("Couldn't send the reset email — check the address.");
      return;
    }
    setSent(true);
  };

  return (
    <section className="night-texture relative flex min-h-[100svh] items-center justify-center overflow-hidden py-24">
      <StarField count={30} />
      <div className="relative w-full max-w-sm rounded-3xl border border-white/12 bg-white/[0.04] p-8 backdrop-blur-md">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-nightrose/15 text-nightrose">
          <MailQuestion className="size-5" />
        </span>
        <h1 className="mt-4 text-center font-display text-2xl font-semibold text-mooncream">
          Reset Password
        </h1>
        <p className="mb-7 mt-1.5 text-center font-hand text-xl text-nightrose">
          we&rsquo;ll send you a magic link ♡
        </p>

        {sent ? (
          <div className="space-y-5 text-center">
            <p className="rounded-xl border border-green-400/30 bg-green-400/10 px-4 py-3 text-sm leading-relaxed text-green-300">
              Reset link sent to <strong>{email}</strong>. Check your inbox and
              open the link to set a new password.
            </p>
            <Link href="/login" className="block text-xs text-mooncream/40 hover:text-nightrose">
              ← back to sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.16em] text-mooncream/60">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-mooncream placeholder:text-mooncream/30 focus:border-nightrose focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
            {error && (
              <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-2.5 text-sm text-red-300">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading || !isSupabaseConfigured()}
              className="w-full rounded-full bg-nightrose py-3 text-sm font-semibold text-midnight transition-all hover:-translate-y-0.5 hover:bg-mooncream disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            <Link href="/login" className="block text-center text-xs text-mooncream/40 hover:text-nightrose">
              ← back to sign in
            </Link>
          </form>
        )}
      </div>
    </section>
  );
}
