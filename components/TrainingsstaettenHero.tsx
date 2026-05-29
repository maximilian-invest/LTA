"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import { CountUp } from "./ui/CountUp";
import { GhostButton } from "./ui/GhostButton";
import { MAXW } from "./ui/MaxWidth";
import { PrimaryButton } from "./ui/PrimaryButton";
import { scrollToId } from "@/lib/scroll";

const STATS = [
  { v: "3", l: "Partner­anlagen im Tennengau" },
  { v: "8", l: "Sand­plätze im Sommer" },
  { v: "3", l: "Hallen­plätze für den Winter" },
  { v: "12", l: "Monate Trainings­saison" },
];

const TICKER = [
  "Ganzjährig dank Halle in Hallein",
  "Gratis für alle U18 in Kuchl",
  "Flutlicht in Vigaun bis Februar",
  "Kleine Gruppen · ein Coach",
];

export function TrainingsstaettenHero() {
  const reduce = useReducedMotion();
  const fadeUp = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.2, 0, 0, 1] as const },
    },
  };

  return (
    <section
      id="top"
      style={{
        position: "relative",
        background: "var(--color-canvas-dark)",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <motion.div
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: reduce ? 0 : 1.8, ease: [0.2, 0, 0, 1] }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src="/assets/photo-court-hallein.avif"
            alt="Sandplätze des 1. Halleiner Tennisclubs"
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: "cover",
              filter: "saturate(0.82) contrast(1.06) brightness(0.62)",
            }}
          />
        </motion.div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(11,15,10,0.62) 0%, rgba(11,15,10,0.50) 38%, rgba(11,15,10,0.86) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(11,15,10,0.92) 0%, rgba(11,15,10,0.30) 55%, rgba(11,15,10,0.10) 100%)",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          maxWidth: MAXW,
          margin: "0 auto",
          padding: "120px 24px 0",
          minHeight: "min(82vh, 760px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
          }}
          style={{ maxWidth: 880 }}
        >
          <motion.div
            variants={fadeUp}
            className="t-eyebrow"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                background: "var(--color-primary)",
                borderRadius: "50%",
              }}
            />
            Trainingsstätten · Tennengau, Salzburg
          </motion.div>
          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: "clamp(52px, 8vw, 116px)",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              color: "var(--color-on-dark)",
            }}
          >
            Drei Anlagen.
            <br />
            Eine Vision:
            <br />
            <span style={{ color: "var(--color-primary)" }}>höchstes Niveau.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="t-body-lg"
            style={{
              marginTop: 28,
              maxWidth: 560,
              color: "var(--color-on-dark)",
              opacity: 0.92,
            }}
          >
            Hallein das ganze Jahr, Kuchl und Vigaun über den Sommer. Acht Sand­plätze,
            drei Hallen­plätze, eine Kraftkammer — und ein Trainings­konzept, das dich
            nie im Stillstand lässt.
          </motion.p>
          <motion.div
            variants={fadeUp}
            style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}
          >
            <PrimaryButton onClick={() => scrollToId("kontakt")} size="lg">
              Probetraining vereinbaren <ArrowRight size={18} />
            </PrimaryButton>
            <GhostButton onClick={() => scrollToId("uebersicht")} size="lg">
              <MapPin size={18} /> Standorte ansehen
            </GhostButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.2, 0, 0, 1] }}
          style={{
            display: "flex",
            gap: 0,
            marginTop: 56,
            marginBottom: -1,
            flexWrap: "wrap",
            borderTop: "1px solid rgba(255,255,255,0.14)",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                flex: "1 1 160px",
                padding: "26px 28px 28px 0",
                borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.14)",
                paddingLeft: i === 0 ? 0 : 28,
              }}
            >
              <div
                className="t-number-display"
                style={{
                  fontSize: "clamp(40px, 5vw, 60px)",
                  color: "var(--color-primary)",
                }}
              >
                <CountUp value={s.v} />
              </div>
              <div
                className="t-caption"
                style={{ color: "var(--color-muted-strong)", marginTop: 8 }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div
        style={{
          background: "var(--color-primary)",
          color: "var(--color-on-primary)",
          padding: "14px 0",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 48,
            whiteSpace: "nowrap",
            animation: "marquee 34s linear infinite",
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: 17,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} style={{ display: "flex", gap: 48 }}>
              {TICKER.map((t, i) => (
                <span key={i} style={{ display: "inline-flex", gap: 48 }}>
                  <span>{t}</span>
                  <span style={{ opacity: 0.45 }}>◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
