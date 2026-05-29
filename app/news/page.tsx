import { CTABand } from "@/components/CTABand";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { NewsFeed, NewsHero } from "@/components/News";

export const metadata = {
  title: "News & Erfolge — Lindenbauer Tennis Academy",
  description:
    "Camps, Turnierergebnisse und Meilensteine unserer Spieler:innen — von Landesmeistertiteln bis zur SSM-Aufnahme.",
};

export default function NewsPage() {
  return (
    <>
      <Nav active="/news" />
      <main>
        <NewsHero />
        <NewsFeed />
        <CTABand />
      </main>
      <Footer />
    </>
  );
}
