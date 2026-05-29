"use client";

import { MapPin, Navigation } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FEATURE_ICON } from "@/lib/featureIcons";
import type { Feature, Location } from "@/lib/locations";
import { scrollToId } from "@/lib/scroll";
import { CountUp } from "./ui/CountUp";
import { GhostButton } from "./ui/GhostButton";
import { MAXW } from "./ui/MaxWidth";
import { PrimaryButton } from "./ui/PrimaryButton";
import { Reveal } from "./ui/Reveal";

export function LocationSplit({
  loc,
  reversed,
}: {
  loc: Location;
  reversed: boolean;
}) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${loc.mapsQuery}`;

  return (
    <section
      id={loc.id}
      style={{
        background: "var(--color-canvas-dark)",
        padding: "var(--space-section) 0",
        borderTop: "1px solid var(--color-hairline-on-dark)",
        scrollMarginTop: 80,
      }}
    >
      <div style={{ maxWidth: MAXW, margin: "0 auto", padding: "0 24px" }}>
        <div
          className={`split-grid${reversed ? " rev" : ""}`}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 56,
            alignItems: "center",
          }}
        >
          <Reveal>
            <div
              className="split-photo"
              style={{ order: reversed ? 2 : 1, position: "relative" }}
            >
              <div
                style={{
                  position: "relative",
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  aspectRatio: "4 / 3.4",
                  border: "1px solid var(--color-hairline-on-dark)",
                }}
              >
                <Image
                  src={loc.photo}
                  alt={loc.photoAlt}
                  fill
                  sizes="(max-width: 920px) 100vw, 50vw"
                  style={{
                    objectFit: "cover",
                    filter: "saturate(0.9) contrast(1.04) brightness(0.92)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(11,15,10,0) 55%, rgba(11,15,10,0.55) 100%)",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 18,
                    left: 18,
                    background: "var(--color-primary)",
                    color: "var(--color-on-primary)",
                    padding: "7px 13px",
                    borderRadius: "var(--radius-sm)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {loc.season}
                </span>
                <span
                  style={{
                    position: "absolute",
                    bottom: 18,
                    right: 18,
                    fontFamily: "var(--font-numbers)",
                    fontWeight: 700,
                    fontSize: 13,
                    color: "var(--color-on-dark)",
                    background: "rgba(11,15,10,0.7)",
                    backdropFilter: "blur(6px)",
                    border: "1px solid var(--color-hairline-on-dark)",
                    padding: "5px 10px",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  {loc.index} / 03
                </span>
              </div>
              <div
                className="split-stats"
                style={{
                  position: "absolute",
                  bottom: -22,
                  left: reversed ? "auto" : 22,
                  right: reversed ? 22 : "auto",
                  display: "flex",
                  gap: 10,
                }}
              >
                {loc.stats.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      background: "var(--color-surface-elevated-dark)",
                      border: "1px solid var(--color-hairline-on-dark)",
                      borderRadius: "var(--radius-md)",
                      padding: "12px 16px",
                      boxShadow: "var(--shadow-card-on-image)",
                    }}
                  >
                    <CountUp
                      value={s.isEuro ? `€ ${s.value}` : s.value}
                      className="t-number-md"
                      style={{
                        color: "var(--color-primary)",
                        fontSize: 22,
                        fontWeight: 700,
                        display: "block",
                      }}
                    />
                    <div
                      className="t-caption"
                      style={{
                        color: "var(--color-muted-strong)",
                        marginTop: 2,
                        fontSize: 11,
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.07}>
            <div
              className="split-content"
              style={{ order: reversed ? 1 : 2 }}
            >
              <div
                className="t-eyebrow"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <span
                  className="t-number-sm"
                  style={{ color: "var(--color-primary)" }}
                >
                  {loc.index}
                </span>
                <span
                  style={{
                    width: 20,
                    height: 2,
                    background: "var(--color-primary)",
                  }}
                />
                {loc.eyebrow}
              </div>
              <h2
                style={{
                  color: "var(--color-on-dark)",
                  fontSize: "clamp(34px, 4vw, 52px)",
                }}
              >
                {loc.name}
              </h2>
              <p
                className="t-body-lg"
                style={{
                  marginTop: 18,
                  color: "var(--color-muted-strong)",
                  maxWidth: 520,
                }}
              >
                {loc.blurb}
              </p>

              <div
                className="feat-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  marginTop: 30,
                }}
              >
                {loc.features.map((f, i) => (
                  <FeatureCard key={i} feature={f} />
                ))}
              </div>

              <div
                style={{
                  marginTop: 30,
                  paddingTop: 24,
                  borderTop: "1px solid var(--color-hairline-on-dark)",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 20,
                  flexWrap: "wrap",
                  alignItems: "flex-end",
                }}
              >
                <div style={{ display: "flex", gap: 12 }}>
                  <MapPin
                    size={20}
                    color="var(--color-primary)"
                    style={{ marginTop: 2, flexShrink: 0 }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: 15,
                        color: "var(--color-on-dark)",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {loc.address[0]}
                    </div>
                    {loc.address.slice(1).map((a, i) => (
                      <div
                        key={i}
                        className="t-body-sm"
                        style={{ color: "var(--color-muted-strong)" }}
                      >
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
                >
                  <GhostButton as="a" href={mapsUrl} newTab>
                    <Navigation size={16} /> Anfahrt
                  </GhostButton>
                  <PrimaryButton onClick={() => scrollToId("kontakt")}>
                    Probetraining
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 920px) {
          :global(.split-grid) {
            grid-template-columns: 1fr !important;
            gap: 44px !important;
          }
          :global(.split-grid .split-photo) {
            order: 1 !important;
          }
          :global(.split-grid .split-content) {
            order: 2 !important;
          }
          :global(.split-stats) {
            position: static !important;
            margin-top: 14px;
          }
        }
        @media (max-width: 480px) {
          :global(.feat-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const [hover, setHover] = useState(false);
  const { icon, title, note, clay } = feature;
  const Icon = FEATURE_ICON[icon];
  const accent = clay ? "var(--color-clay)" : "var(--color-primary)";
  const onAccent = clay ? "#FFFFFF" : "var(--color-on-primary)";

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--color-surface-card-dark)",
        border: `1px solid ${hover ? accent : "var(--color-hairline-on-dark)"}`,
        borderRadius: "var(--radius-lg)",
        padding: "16px 16px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        transition: "border-color 160ms, transform 160ms",
        transform: hover ? "translateY(-2px)" : "none",
      }}
    >
      <span
        style={{
          width: 38,
          height: 38,
          borderRadius: "var(--radius-md)",
          background: hover ? accent : "var(--color-surface-elevated-dark)",
          color: hover ? onAccent : accent,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 160ms, color 160ms",
        }}
      >
        <Icon size={20} strokeWidth={1.7} />
      </span>
      <div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 16,
            color: "var(--color-on-dark)",
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
        <div
          className="t-body-sm"
          style={{ color: "var(--color-muted-strong)", marginTop: 3 }}
        >
          {note}
        </div>
      </div>
    </div>
  );
}
