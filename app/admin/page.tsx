import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ShieldAlert, Users, Ticket } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { getAuth } from "@/lib/auth";
import LogoutButton from "@/components/admin/LogoutButton";
import InvitePanel from "./InvitePanel";
import ModerationRow from "./ModerationRow";
import AddContentForm from "./AddContentForm";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };

export default async function AdminPage() {
  if (!isSupabaseConfigured()) {
    return (
      <section className="paper-texture flex min-h-[100svh] items-center justify-center px-5">
        <div className="max-w-md rounded-3xl border border-blush bg-white p-8 text-center shadow-[var(--shadow-soft)]">
          <h1 className="font-display text-2xl font-semibold text-burgundy">Admin</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Supabase isn&rsquo;t connected yet. Add credentials to{" "}
            <code className="rounded bg-cream px-1.5 py-0.5 text-rose">.env.local</code>{" "}
            and restart.
          </p>
        </div>
      </section>
    );
  }

  const { user, role } = await getAuth();
  if (!user) redirect("/login?next=/admin");

  // Owner-only zone: members get a clear "no access" screen
  if (role !== "owner") {
    return (
      <section className="paper-texture flex min-h-[100svh] items-center justify-center px-5">
        <div className="max-w-md rounded-3xl border border-blush bg-white p-10 text-center shadow-[var(--shadow-soft)]">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-blush/50 text-burgundy">
            <ShieldAlert className="size-5" />
          </span>
          <h1 className="mt-4 font-display text-2xl font-semibold text-burgundy">
            Owner Only
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            This area belongs to the storyteller. You can contribute from the{" "}
            <Link href="/contribute" className="font-semibold text-rose underline decoration-blush underline-offset-4">
              contribute page
            </Link>
            .
          </p>
          <LogoutButton />
        </div>
      </section>
    );
  }

  const supabase = await createClient();

  // Pending moderation: private/unpublished rows + member uploads
  const [quotes, memories, letters, users] = await Promise.all([
    supabase.from("quotes").select("id, text, category, is_public, author_id").order("created_at", { ascending: false }).limit(8),
    supabase.from("memories").select("id, title, category, is_public, author_id").order("created_at", { ascending: false }).limit(8),
    supabase.from("letters").select("id, title, is_private, author_id").order("created_at", { ascending: false }).limit(8),
    supabase.from("site_roles").select("user_id, role, created_at").order("created_at", { ascending: false }).limit(10),
  ]);

  const short = (s: string | null | undefined, n = 64) =>
    (s ?? "").replace(/\n/g, " ").slice(0, n) + ((s ?? "").length > n ? "…" : "");

  return (
    <section className="paper-texture min-h-[100svh] py-28">
      <div className="container-page max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-hand text-2xl text-dusty">the storyteller&rsquo;s desk</p>
            <h1 className="font-display text-3xl font-semibold text-burgundy md:text-4xl">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted">
              {user.email} · <span className="font-semibold text-rose">owner</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/contribute" className="rounded-full border border-blush bg-white px-5 py-2.5 text-sm font-semibold text-burgundy transition-all hover:-translate-y-0.5">
              Contribute
            </Link>
            <LogoutButton />
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Invites */}
          <div className="rounded-3xl border border-blush/70 bg-white p-7 shadow-[var(--shadow-polaroid)]">
            <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold text-burgundy">
              <Ticket className="size-5 text-dusty" /> Invite Codes
            </h2>
            <div className="mt-4">
              <InvitePanel />
            </div>
          </div>

          {/* People */}
          <div className="rounded-3xl border border-blush/70 bg-white p-7 shadow-[var(--shadow-polaroid)]">
            <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold text-burgundy">
              <Users className="size-5 text-dusty" /> Accounts
            </h2>
            <ul className="mt-4 space-y-2">
              {(users.data ?? []).map((u) => (
                <li key={u.user_id} className="flex items-center justify-between rounded-xl bg-cream/60 px-4 py-2.5 text-sm">
                  <span className="truncate font-mono text-xs text-plum/70">{u.user_id.slice(0, 8)}…</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${u.role === "owner" ? "text-rose" : "text-muted"}`}>
                    {u.role}
                  </span>
                </li>
              ))}
              {(users.data ?? []).length === 0 && (
                <li className="text-sm text-muted">No accounts yet.</li>
              )}
            </ul>
          </div>
        </div>

        {/* Add content */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-blush/70 bg-white p-7 shadow-[var(--shadow-polaroid)]">
            <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold text-burgundy">
              <Ticket className="size-5 text-dusty" /> Soundtrack Manager
            </h2>
            <p className="mb-4 mt-1 text-xs text-muted">
              Add songs to &ldquo;If Her Life Were a Movie...&rdquo;
            </p>
            <AddContentForm mode="song" />
          </div>
          <div className="rounded-3xl border border-blush/70 bg-white p-7 shadow-[var(--shadow-polaroid)]">
            <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold text-burgundy">
              <Ticket className="size-5 text-dusty" /> Timeline Manager
            </h2>
            <p className="mb-4 mt-1 text-xs text-muted">
              Add chapters to &ldquo;The Chapters of Her Life&rdquo;
            </p>
            <AddContentForm mode="chapter" />
          </div>
        </div>

        {/* Moderation */}
        <div className="mt-6 space-y-6">
          <ModSection title="Recent Quotes & Shayari">
            {(quotes.data ?? []).map((q) => (
              <ModerationRow key={q.id} table="quotes" id={q.id} title={short(q.text)} subtitle={q.category} isPublic={q.is_public} />
            ))}
            {(quotes.data ?? []).length === 0 && <Empty />}
          </ModSection>
          <ModSection title="Recent Memories">
            {(memories.data ?? []).map((m) => (
              <ModerationRow key={m.id} table="memories" id={m.id} title={m.title} subtitle={m.category} isPublic={m.is_public} />
            ))}
            {(memories.data ?? []).length === 0 && <Empty />}
          </ModSection>
          <ModSection title="Recent Letters">
            {(letters.data ?? []).map((l) => (
              <ModerationRow key={l.id} table="letters" id={l.id} title={l.title} subtitle="letter" isPublic={!l.is_private} />
            ))}
            {(letters.data ?? []).length === 0 && <Empty />}
          </ModSection>
        </div>
      </div>
    </section>
  );
}

function ModSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-blush/70 bg-white p-7 shadow-[var(--shadow-polaroid)]">
      <h2 className="font-display text-xl font-semibold text-burgundy">{title}</h2>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function Empty() {
  return <li className="py-2 text-sm text-muted">Nothing here yet — contributions will appear here.</li>;
}
