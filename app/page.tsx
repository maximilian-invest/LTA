import { CoachSection } from "@/components/CoachSection";
import { CTABand } from "@/components/CTABand";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { NetDivider } from "@/components/NetDivider";
import { RallyGame } from "@/components/RallyGame";
import { SiteHub } from "@/components/SiteHub";
import { USP } from "@/components/USP";

export default function HomePage() {
  return (
    <>
      <Nav active="/" />
      <main>
        <Hero />
        <CoachSection />
        <SiteHub />
        <NetDivider />
        <RallyGame />
        <USP />
        <CTABand />
      </main>
      <Footer />
    </>
  );
}
