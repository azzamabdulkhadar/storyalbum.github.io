import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { StarField } from "./Doodles";

/** Cinematic inner-page header on the night palette. */
export default function PageHero({
  title,
  subtitle,
  hand,
  backHref = "/",
  backLabel = "Home",
}: {
  title: string;
  subtitle: string;
  hand?: string;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <section className="night-texture relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24">
      <StarField count={30} />
      <div className="container-page relative text-center">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-mooncream/50 transition-colors hover:text-nightrose"
        >
          <ArrowLeft className="size-3.5" /> {backLabel}
        </Link>
        <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight text-mooncream md:text-6xl">
          {title}
        </h1>
        {hand && (
          <p className="mt-3 font-hand text-2xl text-nightrose">{hand}</p>
        )}
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-mooncream/60 md:text-base">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
