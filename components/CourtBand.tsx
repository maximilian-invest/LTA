"use client";

import { ClayCourt } from "./ui/ClayCourt";
import { CountUp } from "./ui/CountUp";
import { MAXW } from "./ui/MaxWidth";
import { Reveal } from "./ui/Reveal";

const STATS = [
  { v: "8", l: "Sand­plätze", clay: true },
  { v: "3", l: "Hallen­plätze" },
  { v: "11", l: "Plätze gesamt" },
];

export function CourtBand() {
  return (
    <section
      style={{
        background: "var(--color-canvas-dark)",
        padding: "var(--space-section) 0",
        borderTop: "1px solid var(--color-hairline-on-dark)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: MAXW, margin: "0 auto", padding: "0 24px" }}>
        <div
          className="court-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 0.85fr",
            gap: 56,
            alignItems: "center",
          }}
        >
          <Reveal>
            <div>
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
                  style={{
                    width: 22,
                    height: 2,
                    background: "var(--color-clay)",
                  }}
                />
                Der Belag
              </div>
              <h2 style={{ color: "var(--color-on-dark)" }}>
                Aufgewachsen
                <br />
                auf <span style={{ color: "var(--color-clay)" }}>Sand.</span>
              </h2>
              <p
                className="t-body-lg"
                style={{
                  marginTop: 18,
                  color: "var(--color-muted-strong)",
                  maxWidth: 480,
                }}
              >
                Sand verzeiht nichts und lehrt alles: lange Ballwechsel, sauberes
                Gleiten, Geduld im Aufbau. Acht unserer Plätze sind klassische
                Sand­plätze — der Belag, auf dem in Europa die besten Grundlagen
                entstehen. Im Winter geht es nahtlos auf Teppich-Granulat in der
                Halle weiter.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 0,
                  marginTop: 30,
                  flexWrap: "wrap",
                  borderTop: "1px solid var(--color-hairline-on-dark)",
                }}
              >
                {STATS.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      flex: "1 1 100px",
                      padding: "20px 24px 4px 0",
                      borderLeft:
                        i === 0 ? "none" : "1px solid var(--color-hairline-on-dark)",
                      paddingLeft: i === 0 ? 0 : 24,
                    }}
                  >
                    <CountUp
                      value={s.v}
                      className="t-number-display"
                      style={{
                        fontSize: 44,
                        color: s.clay
                          ? "var(--color-clay)"
                          : "var(--color-primary)",
                        display: "block",
                      }}
                    />
                    <div
                      className="t-caption"
                      style={{
                        color: "var(--color-muted-strong)",
                        marginTop: 6,
                      }}
                    >
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ maxWidth: 300, width: "100%" }}>
                <ClayCourt height={420} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 820px) {
          :global(.court-grid) {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </section>
  );
}
