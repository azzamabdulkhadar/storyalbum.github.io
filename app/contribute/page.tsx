import type { Metadata } from "next";
import Link from "next/link";
import { ImagePlus, Mail, Quote } from "lucide-react";
import { getAuth } from "@/lib/auth";
import PhotoForm from "./PhotoForm";
import { QuoteForm, LetterForm } from "./ContentForms";

export const metadata: Metadata = { title: "Contribute", robots: { index: false } };

export default async function ContributePage() {
  const { user, role } = await getAuth();

  return (
    <section className="night-texture relative min-h-[100svh] py-28">
      <div className="container-page max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-hand text-2xl text-nightrose">add to her story</p>
            <h1 className="font-display text-3xl font-semibold text-mooncream md:text-4xl">
              Contribute
            </h1>
            <p className="mt-1 text-sm text-mooncream/50">
              {user?.email} · {role === "owner" ? "owner" : "member"}
            </p>
          </div>
          <div className="flex gap-2 text-xs">
            {role === "owner" && (
              <Link href="/admin" className="rounded-full border border-nightrose/50 px-4 py-2 font-semibold text-nightrose transition-colors hover:bg-nightrose hover:text-midnight">
                Admin
              </Link>
            )}
            <Link href="/" className="rounded-full border border-white/15 px-4 py-2 text-mooncream/60 transition-colors hover:text-mooncream">
              ← Site
            </Link>
          </div>
        </div>

        <div className="mt-10 space-y-6">
          <Card icon={ImagePlus} title="Upload a Photo">
            <PhotoForm />
          </Card>
          <Card icon={Quote} title="Add Shayari">
            <QuoteForm mode="shayari" />
          </Card>
          <Card icon={Quote} title="Add a Lovely Line">
            <QuoteForm mode="line" />
          </Card>
          <Card icon={Mail} title="Write a Letter">
            <LetterForm />
          </Card>
        </div>

        <p className="mt-8 rounded-2xl border border-white/12 bg-white/[0.03] p-5 text-xs leading-relaxed text-mooncream/45">
          Photos are stored in your own private folder and only appear on the
          public site if you tick &ldquo;show publicly&rdquo;. Letters stay
          private by default. Everything is enforced by database-level rules —
          no one but you (and the owner) can see your private uploads.
        </p>
      </div>
    </section>
  );
}

function Card({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-sm md:p-8">
      <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold text-mooncream">
        <span className="grid size-9 place-items-center rounded-xl bg-nightrose/15 text-nightrose">
          <Icon className="size-4" />
        </span>
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </div>
  );
}
