"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Heart, Lock } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import PasswordInput from "@/components/ui/PasswordInput";
import { StarField } from "@/components/ui/Doodles";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isSupabaseConfigured()) {
    return (
      <p className="rounded-2xl border border-white/15 bg-white/[0.05] p-6 text-center text-sm leading-relaxed text-mooncream/70">
        Supabase isn&rsquo;t connected yet. Add your credentials to{" "}
        <code className="rounded bg-black/30 px-1.5 py-0.5 text-nightrose">.env.local</code>{" "}
        and restart the server to enable login.
      </p>
    );
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError("Wrong email or password. Try again.");
      setLoading(false);
      return;
    }
    router.push(next);
    router.refresh();
  };

  return (
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
      <PasswordInput
        id="password"
        label="Password"
        value={password}
        onChange={setPassword}
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
        {loading ? "Signing in..." : "Sign In"}
      </button>
      <p className="text-center text-xs text-mooncream/40">
        <Link href="/forgot-password" className="transition-colors hover:text-nightrose">
          Forgot password?
        </Link>
      </p>
      <p className="text-center text-xs text-mooncream/40">
        Invited by the storyteller?{" "}
        <Link href="/signup" className="transition-colors hover:text-nightrose">
          Create an account
        </Link>
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <section className="night-texture relative flex min-h-[100svh] items-center justify-center overflow-hidden py-24">
      <StarField count={30} />
      <div className="relative w-full max-w-sm rounded-3xl border border-white/12 bg-white/[0.04] p-8 backdrop-blur-md">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-nightrose/15 text-nightrose">
          <Lock className="size-5" />
        </span>
        <h1 className="mt-4 text-center font-display text-2xl font-semibold text-mooncream">
          A Private Corner
        </h1>
        <p className="mb-7 mt-1.5 text-center font-hand text-xl text-nightrose">
          only for the storyteller ♡
        </p>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
        <Link
          href="/"
          className="mt-6 block text-center text-xs text-mooncream/40 transition-colors hover:text-nightrose"
        >
          ← back to her story
        </Link>
      </div>
    </section>
  );
}
