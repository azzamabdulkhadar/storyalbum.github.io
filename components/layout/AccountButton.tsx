"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CircleUserRound, LogOut, PenLine, ShieldCheck } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

type Session = { email?: string; role: "owner" | "member" } | null;

/** Navbar account button: Sign In when logged out, account menu when in. */
export default function AccountButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<Session>(null);
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setChecked(true);
      return;
    }
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        setSession(null);
        setChecked(true);
        return;
      }
      const { data: roleRow } = await supabase
        .from("site_roles")
        .select("role")
        .eq("user_id", user.id)
        .single();
      setSession({ email: user.email, role: roleRow?.role === "owner" ? "owner" : "member" });
      setChecked(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });
    return () => sub.subscription.unsubscribe();
  }, [router, pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const signOut = async () => {
    await createClient().auth.signOut();
    setSession(null);
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  if (!checked) return <span className="block size-9" aria-hidden />; // reserve space, no layout shift

  if (!session) {
    return (
      <Link
        href="/login"
        className="hidden rounded-full bg-rose px-4.5 py-2 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-burgundy sm:inline-flex sm:items-center sm:gap-1.5"
      >
        <CircleUserRound className="size-3.5" /> Sign In
      </Link>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Account menu"
        className="flex items-center gap-1.5 rounded-full border border-blush bg-white/80 px-3 py-1.5 text-xs font-semibold text-burgundy transition-all hover:border-dusty"
      >
        <CircleUserRound className="size-4 text-rose" />
        <span className="hidden max-w-[110px] truncate md:inline">
          {session.email}
        </span>
      </button>
      <div
        role="menu"
        className={`absolute right-0 top-full z-50 mt-2 w-56 origin-top-right overflow-hidden rounded-2xl border border-blush bg-white/95 p-1.5 shadow-[var(--shadow-soft)] backdrop-blur transition-all duration-200 ${
          open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <p className="border-b border-blush/60 px-3 pb-2 pt-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-dusty">
          {session.role === "owner" ? "Owner" : "Member"}
        </p>
        <Link
          href="/contribute"
          role="menuitem"
          onClick={() => setOpen(false)}
          className="mt-1 flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-ink transition-colors hover:bg-cream"
        >
          <PenLine className="size-4 text-rose" /> Contribute
        </Link>
        {session.role === "owner" && (
          <Link
            href="/admin"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-ink transition-colors hover:bg-cream"
          >
            <ShieldCheck className="size-4 text-rose" /> Admin Dashboard
          </Link>
        )}
        <button
          onClick={signOut}
          role="menuitem"
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-ink transition-colors hover:bg-cream"
        >
          <LogOut className="size-4 text-rose" /> Sign Out
        </button>
      </div>
    </div>
  );
}
