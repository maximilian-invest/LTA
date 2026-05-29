import { CTABand } from "@/components/CTABand";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { OfferHero, OfferTypes, Pricing } from "@/components/Offer";

export const metadata = {
  title: "Angebot & Preise — Lindenbauer Tennis Academy",
  description:
    "Trainerstunde, Kondition und das neue NextGen-Konzept. Alle Preise pro Person und Stunde, transparent aufgeschlüsselt.",
};

export default function AngebotPage() {
  return (
    <>
      <Nav active="/angebot" />
      <main>
        <OfferHero />
        <OfferTypes />
        <Pricing />
        <CTABand />
      </main>
      <Footer />
    </>
  );
}
