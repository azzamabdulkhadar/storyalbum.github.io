import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Ending from "@/components/home/Ending";
import { storyChapters } from "@/data/story";

export const metadata: Metadata = { title: "Full Story" };

export default function StoryPage() {
  return (
    <>
      <PageHero
        title="Her Story, Chapter by Chapter"
        hand="once upon a time... and still counting"
        subtitle="The long version — the one worth reading slowly."
      />
      <section className="paper-texture py-16 md:py-24">
        <div className="container-page max-w-2xl space-y-5">
          {[...storyChapters, { num: "06", title: "The Story Continues", text: "New pages, new sunsets, new memories. To be continued." }].map(
            (c, i) => (
              <article
                key={c.num}
                style={{ "--reveal-delay": `${(i % 3) * 100}ms` } as React.CSSProperties}
                className="reveal group flex gap-6 rounded-3xl border border-blush/70 bg-white/80 p-6 shadow-[var(--shadow-polaroid)] transition-all duration-500 hover:-translate-y-1 hover:border-dusty/60 md:p-8"
              >
                <p className="font-display text-3xl font-semibold text-blush transition-colors group-hover:text-dusty">
                  {c.num}
                </p>
                <div>
                  <h2 className="font-display text-xl font-semibold text-burgundy md:text-2xl">
                    {c.title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.text}</p>
                </div>
              </article>
            )
          )}
          <p className="pt-6 text-center text-sm text-muted">
            Want the highlights instead?{" "}
            <Link href="/her-life" className="font-semibold text-rose underline decoration-blush underline-offset-4 hover:text-burgundy">
              See the timeline
            </Link>
          </p>
        </div>
      </section>
      <Ending />
    </>
  );
}
