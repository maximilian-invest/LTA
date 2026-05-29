"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Reveal } from "./ui/Reveal";

const FAQS = [
  {
    q: "Brauche ich eine Vereins­mitgliedschaft, um bei der LTA zu trainieren?",
    a: "Für das Training mit der Academy ist keine eigene Mitgliedschaft im jeweiligen Verein zwingend nötig — du buchst dein Training direkt bei uns. Für die freie Platz­nutzung außerhalb der Trainings­zeiten gelten die Bedingungen des jeweiligen Vereins (1. Halleiner TC, TC Kuchl, UTC Bad Vigaun).",
  },
  {
    q: "Was kostet das Training an den Standorten?",
    a: "Einzeltraining mit Headcoach Alexander Lindenbauer kostet € 58,– für 60 Minuten, Gruppen­training ist deutlich günstiger pro Einheit. Zehner­blöcke gibt es mit Rabatt. In Kuchl ist die Platz­nutzung für alle unter 18 dank Gemeinde-Förderung kostenlos — die Trainings­gebühr fällt davon unabhängig an.",
  },
  {
    q: "Kann ich auch im Winter trainieren?",
    a: "Ja. Am 1. Halleiner Tennisclub stehen drei Teppich-Granulat-Hallen­plätze zur Verfügung — damit läuft das Training in Hallein ganzjährig, ohne Saison­pause. Kuchl und Vigaun sind reine Sommer­anlagen (Vigaun dank Flutlicht von Februar bis November).",
  },
  {
    q: "Für wen ist die Gratis-Nutzung in Kuchl gedacht?",
    a: "Die Gemeinde Kuchl fördert den Nachwuchs: Alle Kinder und Jugendlichen unter 18 Jahren können die Anlage des TC Kuchl kostenlos nutzen. Das Kinder- und Jugend­training organisieren wir gemeinsam mit der Tennisschule Rosenkranz.",
  },
  {
    q: "Wie vereinbare ich ein Probetraining?",
    a: "Am schnellsten telefonisch unter +43 664 7500 9549 oder per Mail an lindenbauer@lta-tennis.at. Sag uns Alter, Spielstärke und deinen Wunsch­standort — wir finden den passenden Termin und Platz, meist schon in derselben Woche.",
  },
  {
    q: "Welcher Standort passt für mein Kind?",
    a: "Für ganzjähriges, leistungs­orientiertes Training empfehlen wir Hallein (mit Halle). Kuchl ist ideal für den Sommer und besonders attraktiv durch die Gratis-Nutzung. Vigaun ergänzt mit Flutlicht-Plätzen für lange Abende. Wir beraten dich gerne — beim Probetraining oder am Telefon.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      style={{
        background: "var(--color-canvas-dark)",
        padding: "var(--space-section) 0",
        borderTop: "1px solid var(--color-hairline-on-dark)",
      }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <div
            style={{
              background: "var(--color-surface-card-dark)",
              border: "1px solid var(--color-hairline-on-dark)",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
            }}
          >
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  style={{
                    borderTop:
                      i === 0 ? "none" : "1px solid var(--color-hairline-on-dark)",
                  }}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: "20px 24px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: isOpen
                          ? "var(--color-primary)"
                          : "var(--color-surface-elevated-dark)",
                        color: isOpen
                          ? "var(--color-on-primary)"
                          : "var(--color-muted-strong)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "background 160ms, color 160ms",
                      }}
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                    <span
                      style={{
                        flex: 1,
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: 17,
                        color: "var(--color-on-dark)",
                        textTransform: "uppercase",
                        letterSpacing: "0.01em",
                        lineHeight: 1.2,
                      }}
                    >
                      {f.q}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          className="t-body-md"
                          style={{
                            padding: "0 24px 22px 72px",
                            color: "var(--color-muted-strong)",
                          }}
                        >
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
