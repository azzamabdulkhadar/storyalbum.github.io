import Link from "next/link";
import { SparkleDoodle, StarField } from "@/components/ui/Doodles";

export default function Ending() {
  return (
    <section className="night-texture relative overflow-hidden py-28 text-center md:py-40">
      <StarField count={50} />
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 h-72 w-[140%] -translate-x-1/2 rounded-[100%] bg-[#c76f74]/20 blur-3xl"
      />
      <div className="container-page relative">
        <SparkleDoodle className="mx-auto size-8 text-nightrose" />
        <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-semibold leading-tight text-mooncream md:text-6xl">
          Her Story Isn&rsquo;t Finished Yet...
        </h2>
        <p className="mx-auto mt-7 max-w-lg text-sm leading-loose text-mooncream/65 md:text-base">
          There are still places she hasn&rsquo;t seen,
          dreams she hasn&rsquo;t chased,
          memories she hasn&rsquo;t made,
          and chapters she hasn&rsquo;t written.
        </p>
        <p className="mt-12 font-hand text-3xl text-nightrose md:text-4xl">
          To Be Continued... ♡
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-nightrose/50 px-7 py-3 text-sm font-semibold text-nightrose transition-all hover:-translate-y-0.5 hover:bg-nightrose hover:text-midnight"
        >
          Back to the beginning
        </Link>
      </div>
    </section>
  );
}
