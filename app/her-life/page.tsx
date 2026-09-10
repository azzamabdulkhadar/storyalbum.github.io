import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ChapterTimeline from "@/components/story/ChapterTimeline";
import { chapters } from "@/data/story";

export const metadata: Metadata = { title: "Her Life" };

export default function HerLifePage() {
  return (
    <>
      <PageHero
        title="The Chapters of Her Life"
        hand="a journey of dreams, lessons and beautiful moments"
        subtitle="Scroll slowly — every chapter deserves its own breath."
      />
      <section className="paper-texture py-20 md:py-28">
        <div className="container-page">
          <ChapterTimeline items={chapters} />
        </div>
      </section>
    </>
  );
}
