"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { KeyRound, Lock } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import PasswordInput from "@/components/ui/PasswordInput";
import { StarField } from "@/components/ui/Doodles";

function SignupForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/contribute";

  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isSupabaseConfigured()) {
    return (
      <p className="rounded-2xl border border-white/15 bg-white/[0.05] p-6 text-center text-sm leading-relaxed text-mooncream/70">
        Supabase isn&rsquo;t connected yet — signup is disabled.
      </p>
    );
  }

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

    // Server-side code validation via RPC (never trust the client form alone —
    // the DB trigger in migration 0003 enforces the code at signup too).
    const { data: valid, error: rpcError } = await supabase.rpc(
      "validate_signup_code",
      { candidate: code.trim() }
    );
    if (rpcError || !valid) {
      setError("That invite code isn't valid or has already been used.");
      setLoading(false);
      return;
    }

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { invite_code: code.trim() } },
    });

    if (authError) {
      setError(
        authError.message.includes("already registered")
          ? "This email is already registered — try signing in."
          : "Couldn't create the account. Check the details and try again."
      );
      setLoading(false);
      return;
    }

    // Mark the code as used
    await supabase.rpc("claim_signup_code", { candidate: code.trim() });

    if (!data.session) {
      setError(
        "Account created but needs email confirmation — check the Supabase dashboard (Authentication → Users → confirm) or your inbox."
      );
      setLoading(false);
      return;
    }
    router.push(next);
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="code" className="text-xs font-semibold uppercase tracking-[0.16em] text-mooncream/60">
          Invite Code
        </label>
        <input
          id="code"
          required
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 font-mono text-sm uppercase tracking-widest text-mooncream placeholder:text-mooncream/30 focus:border-nightrose focus:outline-none"
          placeholder="HER-STORY-XXXX"
        />
      </div>
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
      <div className="grid gap-4 sm:grid-cols-2">
        <PasswordInput
          id="password"
          label="Password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          placeholder="min 8 chars"
          minLength={8}
        />
        <PasswordInput
          id="confirm"
          label="Confirm"
          value={confirm}
          onChange={setConfirm}
          autoComplete="new-password"
          placeholder="repeat it"
          minLength={8}
        />
      </div>
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
        {loading ? "Creating account..." : "Create Account"}
      </button>
      <p className="text-center text-xs leading-relaxed text-mooncream/40">
        Signup is invite-only. Ask the storyteller for a code.
      </p>
    </form>
  );
}

export default function SignupPage() {
  return (
    <section className="night-texture relative flex min-h-[100svh] items-center justify-center overflow-hidden py-24">
      <StarField count={30} />
      <div className="relative w-full max-w-md rounded-3xl border border-white/12 bg-white/[0.04] p-8 backdrop-blur-md">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-nightrose/15 text-nightrose">
          <KeyRound className="size-5" />
        </span>
        <h1 className="mt-4 text-center font-display text-2xl font-semibold text-mooncream">
          Join Her Story
        </h1>
        <p className="mb-7 mt-1.5 text-center font-hand text-xl text-nightrose">
          by invitation only ♡
        </p>
        <Suspense fallback={null}>
          <SignupForm />
        </Suspense>
        <div className="mt-6 flex items-center justify-between text-xs text-mooncream/40">
          <Link href="/login" className="transition-colors hover:text-nightrose">
            Already have an account? Sign in
          </Link>
          <Link href="/" className="transition-colors hover:text-nightrose">
            ← home
          </Link>
        </div>
      </div>
    </section>
  );
}
