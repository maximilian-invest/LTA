"use client";

import { motion } from "framer-motion";
import { Activity, CalendarCheck, UsersRound, type LucideIcon } from "lucide-react";
import { CountUp } from "./ui/CountUp";
import { MAXW } from "./ui/MaxWidth";
import { Reveal } from "./ui/Reveal";
import { SectionHead } from "./ui/SectionHead";

type Pillar = {
  Icon: LucideIcon;
  kicker: string;
  title: string;
  body: string;
  stat: string;
  statLabel: string;
};

const PILLARS: Pillar[] = [
  {
    Icon: CalendarCheck,
    kicker: "Ganzjährig",
    title: "Keine Saison­pause",
    body: "Dank drei Hallen­plätzen in Hallein trainierst du auch im Winter weiter — auf Teppich-Granulat, bei jedem Wetter. Andere machen Pause, du machst Fortschritte.",
    stat: "12",
    statLabel: "Monate im Jahr",
  },
  {
    Icon: UsersRound,
    kicker: "Kleine Gruppen",
    title: "Mehr Bälle pro Kind",
    body: "Wir trainieren bewusst in kleinen Gruppen mit festem Coach. Mehr Wiederholungen, mehr Korrekturen, mehr Spielzeit — und ein Trainer, der jedes Kind beim Namen kennt.",
    stat: "4",
    statLabel: "Spieler pro Gruppe ø",
  },
  {
    Icon: Activity,
    kicker: "Sportwissenschaftlich",
    title: "Training mit System",
    body: "Tennis und Athletik aus einer Hand, geplant nach aktuellen sport­wissenschaftlichen Erkenntnissen — von Alexander Lindenbauer, MSc und lizensiertem ÖTV-Coach.",
    stat: "MSc",
    statLabel: "Sportwissenschaft",
  },
];

export function USP() {
  return (
    <section
      style={{
        background: "var(--color-surface-card-dark)",
        padding: "var(--space-section) 0",
        borderTop: "1px solid var(--color-hairline-on-dark)",
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
              marginBottom: 48,
            }}
          >
            <SectionHead eyebrow="Warum hier trainieren">
              Premium-Bedingungen.
              <br />
              <span style={{ color: "var(--color-primary)" }}>Auf jedem Platz.</span>
            </SectionHead>
            <p
              className="t-body-md"
              style={{ maxWidth: 360, color: "var(--color-muted-strong)" }}
            >
              Egal an welchem unserer Standorte — drei Dinge gelten überall:
              durchgehend trainierbar, kleine Gruppen, ein klares Konzept.
            </p>
          </div>
        </Reveal>

        <div
          className="usp-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 18,
          }}
        >
          {PILLARS.map((p, i) => (
            <PillarCard key={i} p={p} index={i} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 880px) {
          :global(.usp-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function PillarCard({ p, index }: { p: Pillar; index: number }) {
  const { Icon } = p;
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: 0.07 * (index + 1),
        ease: [0.2, 0, 0, 1],
      }}
      whileHover={{ y: -4, borderColor: "var(--color-primary)" }}
      style={{
        background: "var(--color-canvas-dark)",
        border: "1px solid var(--color-hairline-on-dark)",
        borderRadius: "var(--radius-xl)",
        padding: 30,
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            width: 52,
            height: 52,
            borderRadius: "var(--radius-lg)",
            background: "var(--color-primary)",
            color: "var(--color-on-primary)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={26} strokeWidth={1.7} />
        </span>
        <span className="t-eyebrow">{p.kicker}</span>
      </div>
      <div>
        <h3 style={{ color: "var(--color-on-dark)", fontSize: 26 }}>{p.title}</h3>
        <p
          className="t-body-md"
          style={{ color: "var(--color-muted-strong)", marginTop: 12 }}
        >
          {p.body}
        </p>
      </div>
      <div
        style={{
          marginTop: "auto",
          paddingTop: 18,
          borderTop: "1px solid var(--color-hairline-on-dark)",
          display: "flex",
          alignItems: "baseline",
          gap: 12,
        }}
      >
        <span
          className="t-number-display"
          style={{ fontSize: 40, color: "var(--color-primary)" }}
        >
          <CountUp value={p.stat} />
        </span>
        <span
          className="t-caption"
          style={{ color: "var(--color-muted-strong)" }}
        >
          {p.statLabel}
        </span>
      </div>
    </motion.article>
  );
}
