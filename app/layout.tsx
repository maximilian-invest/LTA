import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lindenbauer Tennis Academy — Hallein, Salzburg",
  description:
    "Tennisschule für Kinder, Jugendliche und Erwachsene in Hallein, Kuchl und Bad Vigaun. Einzel- und Gruppentraining, Athletik und Camps — von Alexander Lindenbauer, MSc.",
  icons: { icon: "/assets/lta-logo.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0F0A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
