"use client";

import { ArrowRight, BadgeCheck, ClipboardList, Dumbbell, GraduationCap, Phone, ShieldCheck, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { GhostButton } from "./ui/GhostButton";
import { MAXW } from "./ui/MaxWidth";
import { PrimaryButton } from "./ui/PrimaryButton";
import { Reveal } from "./ui/Reveal";
import { scrollToId } from "@/lib/scroll";

const CREDS: { Icon: LucideIcon; text: string }[] = [
  { Icon: BadgeCheck, text: "Staatlich geprüfter Tennislehrer" },
  { Icon: GraduationCap, text: "MSc Sport- & Bewegungswissenschaften" },
  { Icon: ShieldCheck, text: "Lizensierter ÖTV-Coach" },
  { Icon: ClipboardList, text: "Trainergrundausbildung" },
  { Icon: Dumbbell, text: "Athletiktrainer" },
];

export function CoachSection() {
  return (
    <section
      id="coach"
      style={{
        background: "var(--color-surface-card-dark)",
        padding: "var(--space-section) 0",
        borderTop: "1px solid var(--color-hairline-on-dark)",
      }}
    >
      <div style={{ maxWidth: MAXW, margin: "0 auto", padding: "0 24px" }}>
        <div
          className="coach-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "0.85fr 1fr",
            gap: 56,
            alignItems: "center",
          }}
        >
          {/* Photo */}
          <Reveal>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "relative",
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  aspectRatio: "4 / 5",
                  border: "1px solid var(--color-hairline-on-dark)",
                  maxWidth: 420,
                }}
              >
                <Image
                  src="/assets/coach-alex.jpeg"
                  alt="Headcoach Alexander Lindenbauer"
                  fill
                  sizes="(max-width: 860px) 360px, 420px"
                  style={{
                    objectFit: "cover",
                    objectPosition: "50% 18%",
                    filter: "saturate(0.92) contrast(1.05) brightness(0.97)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(11,15,10,0) 60%, rgba(11,15,10,0.55) 100%)",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    background: "var(--color-primary)",
                    color: "var(--color-on-primary)",
                    padding: "6px 12px",
                    borderRadius: "var(--radius-sm)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  ÖTV-Coach
                </span>
              </div>
              <div
                className="coach-chip"
                style={{
                  position: "absolute",
                  bottom: -20,
                  right: 0,
                  background: "var(--color-surface-elevated-dark)",
                  border: "1px solid var(--color-hairline-on-dark)",
                  borderRadius: "var(--radius-md)",
                  padding: "12px 16px",
                  boxShadow: "var(--shadow-card-on-image)",
                }}
              >
                <div
                  className="t-caption"
                  style={{
                    color: "var(--color-muted-strong)",
                    marginBottom: 2,
                  }}
                >
                  Jahrgang
                </div>
                <div
                  className="t-number-md"
                  style={{ color: "var(--color-primary)", fontSize: 20 }}
                >
                  1996
                </div>
              </div>
            </div>
          </Reveal>

          {/* Content */}
          <Reveal delay={0.07}>
            <div>
              <div
                className="t-eyebrow"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 2,
                    background: "var(--color-primary)",
                  }}
                />
                Headcoach &amp; Gründer
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(34px, 4vw, 54px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.01em",
                  color: "var(--color-on-dark)",
                  textTransform: "uppercase",
                  marginBottom: 18,
                }}
              >
                Alexander Lindenbauer,{" "}
                <span style={{ color: "var(--color-primary)" }}>MSc</span>
              </div>
              <p
                className="t-body-lg"
                style={{
                  color: "var(--color-muted-strong)",
                  maxWidth: 520,
                }}
              >
                Sportwissenschaftler, staatlich geprüfter Tennislehrer und
                lizensierter ÖTV-Coach. Alex verbindet Technik, Taktik und
                Athletik zu einem klaren System — und steht in jeder
                Trainings­einheit persönlich auf dem Platz.
              </p>

              <div
                className="cred-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  marginTop: 28,
                }}
              >
                {CREDS.map(({ Icon, text }, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      background: "var(--color-canvas-dark)",
                      border: "1px solid var(--color-hairline-on-dark)",
                      borderRadius: "var(--radius-lg)",
                      padding: "14px 16px",
                    }}
                  >
                    <span
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "var(--radius-md)",
                        background: "var(--color-surface-elevated-dark)",
                        color: "var(--color-primary)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} strokeWidth={1.6} />
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 14,
                        color: "var(--color-on-dark)",
                        fontWeight: 500,
                        lineHeight: 1.25,
                      }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 28,
                  flexWrap: "wrap",
                }}
              >
                <PrimaryButton onClick={() => scrollToId("kontakt")}>
                  Mit Alex trainieren <ArrowRight size={16} />
                </PrimaryButton>
                <GhostButton as="a" href="tel:+436647500954">
                  <Phone size={16} /> +43 664 7500 9549
                </GhostButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          :global(.coach-grid) {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          :global(.coach-chip) {
            right: auto !important;
            left: 16px;
          }
          :global(.cred-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
