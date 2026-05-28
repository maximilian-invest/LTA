"use client";

import { motion } from "framer-motion";
import { ArrowRight, Image as ImageIcon, MapPin, Tag, Trophy, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MAXW } from "./ui/MaxWidth";
import { Reveal } from "./ui/Reveal";
import { SectionHead } from "./ui/SectionHead";

type HubItem = {
  Icon: LucideIcon;
  href: string;
  tag: string;
  title: string;
  body: string;
  img: string;
};

const HUB: HubItem[] = [
  {
    Icon: MapPin,
    href: "/trainingsstaetten",
    tag: "3 Anlagen",
    title: "Trainingsstätten",
    body: "Hallein, Kuchl und Bad Vigaun — Sand, Halle und Flutlicht im Tennengau.",
    img: "/assets/photo-court-kuchl.avif",
  },
  {
    Icon: Tag,
    href: "/angebot",
    tag: "Ab € 10 / Std.",
    title: "Angebot & Preise",
    body: "Trainerstunde, Kondition und das neue NextGen-Konzept — transparent aufgeschlüsselt.",
    img: "/assets/photo-kraftkammer.webp",
  },
  {
    Icon: ImageIcon,
    href: "/galerie",
    tag: "Impressionen",
    title: "Galerie",
    body: "Plätze, Halle und Trainingsalltag — echte Aufnahmen unserer Anlagen.",
    img: "/assets/photo-court-vigaun.avif",
  },
  {
    Icon: Trophy,
    href: "/news",
    tag: "Aktuelles",
    title: "News & Erfolge",
    body: "Camps, Landesmeistertitel und Meilensteine unserer Spieler:innen.",
    img: "/assets/news-doppel-2024.avif",
  },
];

export function SiteHub() {
  return (
    <section
      style={{
        background: "var(--color-canvas-dark)",
        padding: "var(--space-section) 0",
      }}
    >
      <div style={{ maxWidth: MAXW, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 32,
              flexWrap: "wrap",
              marginBottom: 44,
            }}
          >
            <SectionHead eyebrow="Entdecke die LTA">
              Alles, was du
              <br />
              <span style={{ color: "var(--color-primary)" }}>wissen musst.</span>
            </SectionHead>
            <p
              className="t-body-md"
              style={{ maxWidth: 360, color: "var(--color-muted-strong)" }}
            >
              Vier Wege in die Academy — von den Anlagen über Preise und Galerie
              bis zu den aktuellen Erfolgen unserer Spieler:innen.
            </p>
          </div>
        </Reveal>

        <div
          className="hub-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 18,
          }}
        >
          {HUB.map((h, i) => (
            <HubCard key={h.href} item={h} index={i} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 760px) {
          :global(.hub-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function HubCard({ item, index }: { item: HubItem; index: number }) {
  const { Icon } = item;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease: [0.2, 0, 0, 1] }}
    >
      <Link
        href={item.href}
        className="hub-card"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          minHeight: 280,
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          border: "1px solid var(--color-hairline-on-dark)",
          textDecoration: "none",
          padding: 28,
          transition: "border-color 200ms",
        }}
      >
        <Image
          src={item.img}
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 760px) 100vw, 50vw"
          className="hub-img"
          style={{
            objectFit: "cover",
            filter: "saturate(0.85) contrast(1.05) brightness(0.5)",
            transition: "transform 420ms cubic-bezier(0.2,0,0,1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(11,15,10,0.35) 0%, rgba(11,15,10,0.55) 55%, rgba(11,15,10,0.92) 100%)",
          }}
        />
        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <span
              style={{
                width: 40,
                height: 40,
                borderRadius: "var(--radius-md)",
                background: "var(--color-primary)",
                color: "var(--color-on-primary)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon size={20} strokeWidth={1.8} />
            </span>
            <span className="t-eyebrow">{item.tag}</span>
          </div>
          <h3
            style={{
              color: "var(--color-on-dark)",
              fontSize: 32,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            {item.title}
            <span
              className="hub-arrow"
              style={{
                color: "var(--color-primary)",
                display: "inline-flex",
                transition: "transform 200ms",
              }}
            >
              <ArrowRight size={26} />
            </span>
          </h3>
          <p
            className="t-body-md"
            style={{
              color: "var(--color-muted-strong)",
              marginTop: 8,
              maxWidth: 440,
            }}
          >
            {item.body}
          </p>
        </div>
      </Link>

      <style jsx>{`
        :global(.hub-card:hover) { border-color: var(--color-primary); }
        :global(.hub-card:hover .hub-img) { transform: scale(1.05); }
        :global(.hub-card:hover .hub-arrow) { transform: translateX(6px); }
      `}</style>
    </motion.div>
  );
}
