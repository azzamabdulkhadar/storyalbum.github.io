import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SongList from "@/components/quotes/SongList";
import { songs } from "@/data/story";

export const metadata: Metadata = { title: "Soundtrack" };

export default function SoundtrackPage() {
  return (
    <>
      <PageHero
        title="If Her Life Were a Movie..."
        hand="the songs, sounds and melodies that tell her story"
        subtitle="Every story needs a soundtrack. Hers already has one."
      />
      <section className="night-texture min-h-[60vh] py-16 md:py-24">
        <div className="container-page">
          <SongList songs={songs} />
        </div>
      </section>
    </>
  );
}
