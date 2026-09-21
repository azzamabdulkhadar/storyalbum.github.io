import { StarField } from "./Doodles";

/** Cinematic inner-page header on the night palette. */
export default function PageHero({
  title,
  subtitle,
  hand,
}: {
  title: string;
  subtitle: string;
  hand?: string;
}) {
  return (
    <section className="night-texture relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <StarField count={30} />
      <div className="container-page relative text-center">
        <h1 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-tight text-mooncream md:text-6xl">
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
