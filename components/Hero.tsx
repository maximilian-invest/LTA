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
  { v: "3", l: "Anlagen im Tennengau" },
  { v: "12", l: "Monate Trainings­saison" },
  { v: "6", l: "Jahre LTA-Tenniscamps" },
  { v: "MSc", l: "Sportwissenschaft · ÖTV" },
];

const TICKER = [
  "Einzel · Gruppe · Athletik · Camps",
  "Ganzjährig dank Halle in Hallein",
  "Kleine Gruppen · ein Coach",
  "Sportwissenschaftlich fundiert",
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      style={{
        position: "relative",
        background: "var(--color-canvas-dark)",
        overflow: "hidden",
      }}
    >
      {/* Background photo with overlays */}
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
              filter: "saturate(0.82) contrast(1.06) brightness(0.58)",
            }}
          />
        </motion.div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(11,15,10,0.58) 0%, rgba(11,15,10,0.48) 40%, rgba(11,15,10,0.9) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(11,15,10,0.92) 0%, rgba(11,15,10,0.3) 58%, rgba(11,15,10,0.08) 100%)",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          maxWidth: MAXW,
          margin: "0 auto",
          padding: "128px 24px 0",
          minHeight: "min(86vh, 820px)",
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
            show: {
              transition: { staggerChildren: 0.09, delayChildren: 0.05 },
            },
          }}
          style={{ maxWidth: 900 }}
        >
          <motion.div
            variants={fadeUp(reduce)}
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
            Lindenbauer Tennis Academy · Hallein, Salzburg
          </motion.div>

          <motion.h1
            variants={fadeUp(reduce)}
            style={{
              fontSize: "clamp(54px, 8.4vw, 132px)",
              lineHeight: 0.88,
              letterSpacing: "-0.035em",
              color: "var(--color-on-dark)",
            }}
          >
            Dein Spiel.
            <br />
            <span style={{ color: "var(--color-primary)" }}>Unser System.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp(reduce)}
            className="t-body-lg"
            style={{
              marginTop: 28,
              maxWidth: 560,
              color: "var(--color-on-dark)",
              opacity: 0.92,
            }}
          >
            Tennisschule für Kinder, Jugendliche und Erwachsene in Hallein, Kuchl und
            Bad Vigaun. Einzel- und Gruppentraining, Athletik und Camps — geführt
            von Alexander Lindenbauer, MSc.
          </motion.p>

          <motion.div
            variants={fadeUp(reduce)}
            style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}
          >
            <PrimaryButton onClick={() => scrollToId("kontakt")} size="lg">
              Probetraining vereinbaren <ArrowRight size={18} />
            </PrimaryButton>
            <GhostButton as="a" href="/trainingsstaetten" size="lg">
              <MapPin size={18} /> Trainingsstätten
            </GhostButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.2, 0, 0, 1] }}
          className="hero-stats"
          style={{
            display: "flex",
            gap: 0,
            marginTop: 52,
            flexWrap: "wrap",
            borderTop: "1px solid rgba(255,255,255,0.14)",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                flex: "1 1 150px",
                padding: "24px 26px 26px 0",
                borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.14)",
                paddingLeft: i === 0 ? 0 : 26,
              }}
            >
              <CountUp
                value={s.v}
                className="t-number-display"
                style={{
                  fontSize: "clamp(38px, 4.6vw, 56px)",
                  color: "var(--color-primary)",
                  display: "block",
                }}
              />
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

      {/* Marquee ticker */}
      <div
        style={{
          background: "var(--color-primary)",
          color: "var(--color-on-primary)",
          padding: "14px 0",
          overflow: "hidden",
          position: "relative",
          marginTop: 48,
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

function fadeUp(reduce: boolean | null) {
  return {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.2, 0, 0, 1] },
    },
  };
}
