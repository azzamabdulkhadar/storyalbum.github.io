import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import LettersGrid from "@/components/quotes/LettersGrid";
import { letters } from "@/data/story";

export const metadata: Metadata = { title: "Letters" };

export default function LettersPage() {
  return (
    <>
      <PageHero
        title="Letters She May Never Read"
        hand="some thoughts are better written than said"
        subtitle="Folded, sealed, and kept — click a letter to unfold it."
      />
      <section className="paper-texture py-16 md:py-24">
        <div className="container-page">
          <LettersGrid letters={letters} />
        </div>
      </section>
    </>
  );
}
