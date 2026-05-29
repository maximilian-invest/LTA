import { CTABand } from "@/components/CTABand";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/ui/PageHero";

export const metadata = {
  title: "FAQ — Lindenbauer Tennis Academy",
  description:
    "Häufige Fragen zur Mitgliedschaft, Preisen, Zugang und Buchung an unseren drei Standorten in Hallein, Kuchl und Bad Vigaun.",
};

export default function FAQPage() {
  return (
    <>
      <Nav active="/faq" />
      <main>
        <PageHero
          eyebrow="Häufige Fragen"
          title="Mitgliedschaft, Preise,"
          accent="Zugang & Buchung."
          sub="Die wichtigsten Antworten rund ums Training an unseren drei Standorten. Nicht dabei? Ruf uns an oder schreib eine Mail."
          photo="/assets/photo-court-vigaun.avif"
          photoPos="50% 60%"
        />
        <FAQ />
        <CTABand />
      </main>
      <Footer />
    </>
  );
}
