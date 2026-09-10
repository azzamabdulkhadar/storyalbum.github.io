import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import QuoteCarousel from "@/components/quotes/QuoteCarousel";
import { shayari, shayariCategories } from "@/data/story";

export const metadata: Metadata = { title: "Shayari" };

export default function ShayariPage() {
  return (
    <>
      <PageHero
        title="Words That Feel Like Her"
        hand="a collection of shayari, emotions and unspoken feelings"
        subtitle="Shuffle through the feelings — copy the ones that say it best."
      />
      <section className="night-texture py-16 md:py-24">
        <div className="container-page">
          <QuoteCarousel quotes={shayari} categories={shayariCategories} />
        </div>
      </section>
    </>
  );
}
