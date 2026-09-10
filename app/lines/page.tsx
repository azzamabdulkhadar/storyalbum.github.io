import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import LineDeck from "@/components/quotes/LineDeck";
import { lines } from "@/data/story";

export const metadata: Metadata = { title: "Lovely Lines" };

export default function LinesPage() {
  return (
    <>
      <PageHero
        title="Things I Would Never Say Out Loud..."
        hand="but these lines might say it for me"
        subtitle="Respectful, playful, and best delivered with a smile."
      />
      <section className="paper-texture py-16 md:py-24">
        <div className="container-page pb-10">
          <LineDeck items={lines} />
        </div>
      </section>
    </>
  );
}
