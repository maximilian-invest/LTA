"use client";

import { motion } from "framer-motion";
import { Clock, Mail, Phone, User, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { MAXW } from "./ui/MaxWidth";
import { Reveal } from "./ui/Reveal";

type Row = {
  Icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  mono?: boolean;
};

const ROWS: Row[] = [
  { Icon: User, label: "Headcoach", value: "Alexander Lindenbauer, MSc" },
  {
    Icon: Phone,
    label: "Telefon",
    value: "+43 664 7500 9549",
    href: "tel:+436647500954",
    mono: true,
  },
  {
    Icon: Mail,
    label: "E-Mail",
    value: "lindenbauer@lta-tennis.at",
    href: "mailto:lindenbauer@lta-tennis.at",
  },
  { Icon: Clock, label: "Antwort", value: "meist innerhalb von 24 Stunden" },
];

export function CTABand() {
  return (
    <section
      id="kontakt"
      style={{
        background: "var(--color-primary)",
        color: "var(--color-on-primary)",
        padding: "var(--space-section) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Image
        src="/assets/tennis-ball-decorative.svg"
        alt=""
        aria-hidden="true"
        width={360}
        height={360}
        style={{
          position: "absolute",
          right: -80,
          top: -80,
          width: 360,
          height: 360,
          opacity: 0.14,
          mixBlendMode: "multiply",
        }}
      />

      <div
        style={{
          maxWidth: MAXW,
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
        }}
      >
        <div
          className="cta-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          <Reveal>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: 18,
                  opacity: 0.7,
                }}
              >
                Dein nächster Schritt
              </div>
              <h2
                style={{
                  color: "var(--color-on-primary)",
                  fontSize: "clamp(38px, 5.5vw, 76px)",
                  lineHeight: 0.92,
                }}
              >
                Komm vorbei.
                <br />
                Schlag den ersten Ball.
              </h2>
              <p
                className="t-body-lg"
                style={{
                  marginTop: 22,
                  maxWidth: 520,
                  color: "var(--color-on-primary)",
                  opacity: 0.82,
                }}
              >
                Vereinbare ein unverbindliches Probetraining an deinem Wunsch­standort.
                Sag uns Alter und Spielstärke — wir kümmern uns um Platz und Termin.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 14,
                  marginTop: 34,
                  flexWrap: "wrap",
                }}
              >
                <motion.a
                  href="tel:+436647500954"
                  className="cta-dark"
                  whileHover={{
                    backgroundColor: "var(--color-canvas-dark)",
                    color: "var(--color-primary)",
                  }}
                  transition={{ duration: 0.16 }}
                  style={{
                    background: "var(--color-on-primary)",
                    color: "var(--color-primary)",
                    height: 58,
                    padding: "0 28px",
                    borderRadius: "var(--radius-pill)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: 15,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    textDecoration: "none",
                  }}
                >
                  <Phone size={18} /> Jetzt anrufen
                </motion.a>
                <motion.a
                  href="mailto:lindenbauer@lta-tennis.at"
                  whileHover={{ borderColor: "rgba(11,15,10,0.6)" }}
                  transition={{ duration: 0.16 }}
                  style={{
                    background: "transparent",
                    color: "var(--color-on-primary)",
                    border: "1.5px solid rgba(11,15,10,0.35)",
                    height: 58,
                    padding: "0 26px",
                    borderRadius: "var(--radius-pill)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 15,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    textDecoration: "none",
                  }}
                >
                  <Mail size={18} /> E-Mail schreiben
                </motion.a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              style={{
                background: "var(--color-canvas-dark)",
                borderRadius: "var(--radius-xl)",
                padding: 30,
                color: "var(--color-on-dark)",
              }}
            >
              <div className="t-eyebrow" style={{ marginBottom: 18 }}>
                Direkter Draht
              </div>
              {ROWS.map((r, i) => {
                const { Icon } = r;
                const content = (
                  <>
                    <span
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "var(--radius-md)",
                        background: "var(--color-surface-elevated-dark)",
                        color: "var(--color-primary)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} strokeWidth={1.7} />
                    </span>
                    <span>
                      <span
                        className="t-caption"
                        style={{
                          color: "var(--color-muted)",
                          display: "block",
                        }}
                      >
                        {r.label}
                      </span>
                      <span
                        style={{
                          color: "var(--color-on-dark)",
                          fontFamily: r.mono
                            ? "var(--font-numbers)"
                            : "var(--font-body)",
                          fontSize: 15,
                          fontWeight: 500,
                        }}
                      >
                        {r.value}
                      </span>
                    </span>
                  </>
                );
                const sharedStyle = {
                  display: "flex",
                  gap: 14,
                  alignItems: "center",
                  padding: "14px 0",
                  borderBottom:
                    i < ROWS.length - 1
                      ? "1px solid var(--color-hairline-on-dark)"
                      : "none",
                  textDecoration: "none" as const,
                };
                if (r.href) {
                  return (
                    <a key={i} href={r.href} style={sharedStyle}>
                      {content}
                    </a>
                  );
                }
                return (
                  <div key={i} style={sharedStyle}>
                    {content}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 820px) {
          :global(.cta-grid) {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </section>
  );
}
