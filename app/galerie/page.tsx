import { CTABand } from "@/components/CTABand";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/ui/PageHero";

export const metadata = {
  title: "Galerie — Lindenbauer Tennis Academy",
  description:
    "Echte Aufnahmen unserer drei Anlagen in Hallein, Kuchl und Bad Vigaun — Plätze, Halle und Trainingsalltag.",
};

export default function GaleriePage() {
  return (
    <>
      <Nav active="/galerie" />
      <main>
        <PageHero
          eyebrow="Galerie · Impressionen"
          title="Plätze, Halle,"
          accent="Trainingsalltag."
          sub="Echte Aufnahmen unserer drei Anlagen. Klick auf ein Bild für die Großansicht."
          photo="/assets/photo-court-hallein.avif"
          photoPos="50% 55%"
        />
        <Gallery />
        <CTABand />
      </main>
      <Footer />
    </>
  );
}
