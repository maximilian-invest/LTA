import { CTABand } from "@/components/CTABand";
import { CourtBand } from "@/components/CourtBand";
import { Footer } from "@/components/Footer";
import { LocationSplit } from "@/components/LocationSplit";
import { MapOverview } from "@/components/MapOverview";
import { Nav } from "@/components/Nav";
import { TrainingsstaettenHero } from "@/components/TrainingsstaettenHero";
import { USP } from "@/components/USP";
import { LOCATIONS } from "@/lib/locations";

export const metadata = {
  title: "Trainingsstätten — Lindenbauer Tennis Academy",
  description:
    "Drei Anlagen im Tennengau: 1. Halleiner TC, TC Kuchl und UTC Bad Vigaun. Acht Sandplätze, drei Hallenplätze, eine Kraftkammer.",
};

export default function TrainingsstaettenPage() {
  return (
    <>
      <Nav active="/trainingsstaetten" />
      <main>
        <TrainingsstaettenHero />
        <MapOverview />
        <CourtBand />
        <LocationSplit loc={LOCATIONS[0]} reversed={false} />
        <LocationSplit loc={LOCATIONS[1]} reversed={true} />
        <LocationSplit loc={LOCATIONS[2]} reversed={false} />
        <USP />
        <CTABand />
      </main>
      <Footer />
    </>
  );
}
