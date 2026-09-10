"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { KeyRound } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import PasswordInput from "@/components/ui/PasswordInput";
import { StarField } from "@/components/ui/Doodles";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError(
        "The reset link may have expired — request a new one from the forgot-password page."
      );
      return;
    }
    setDone(true);
    setTimeout(() => {
      router.push("/login");
    }, 2500);
  };

  return (
    <section className="night-texture relative flex min-h-[100svh] items-center justify-center overflow-hidden py-24">
      <StarField count={30} />
      <div className="relative w-full max-w-sm rounded-3xl border border-white/12 bg-white/[0.04] p-8 backdrop-blur-md">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-nightrose/15 text-nightrose">
          <KeyRound className="size-5" />
        </span>
        <h1 className="mt-4 text-center font-display text-2xl font-semibold text-mooncream">
          New Password
        </h1>
        <p className="mb-7 mt-1.5 text-center font-hand text-xl text-nightrose">
          choose something only you know ♡
        </p>

        {done ? (
          <p className="rounded-xl border border-green-400/30 bg-green-400/10 px-4 py-3 text-center text-sm text-green-300">
            Password updated ✓ — taking you to sign in...
          </p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <PasswordInput
              id="password"
              label="New Password"
              value={password}
              onChange={setPassword}
              autoComplete="new-password"
              placeholder="min 8 chars"
              minLength={8}
            />
            <PasswordInput
              id="confirm"
              label="Confirm Password"
              value={confirm}
              onChange={setConfirm}
              autoComplete="new-password"
              placeholder="repeat it"
              minLength={8}
            />
            {error && (
              <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-2.5 text-sm text-red-300">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-nightrose py-3 text-sm font-semibold text-midnight transition-all hover:-translate-y-0.5 hover:bg-mooncream disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Password"}
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
