"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { LOCATIONS, type Location } from "@/lib/locations";
import { scrollToId } from "@/lib/scroll";
import { MAXW } from "./ui/MaxWidth";
import { Reveal } from "./ui/Reveal";
import { SectionHead } from "./ui/SectionHead";

export function MapOverview() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section
      id="uebersicht"
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
            <SectionHead eyebrow="Übersicht · Tennengau">
              Zwei Gemeinden.
              <br />
              Drei{" "}
              <span style={{ color: "var(--color-primary)" }}>Plätze zum Spielen.</span>
            </SectionHead>
            <p
              className="t-body-md"
              style={{ maxWidth: 360, color: "var(--color-muted-strong)" }}
            >
              Alle Anlagen liegen im Salzburger Tennengau — keine ist weiter als
              15&nbsp;Minuten von Hallein entfernt. Fahr mit dem Marker über die Karte.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.07}>
          <div
            className="map-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.55fr 1fr",
              gap: 24,
              alignItems: "stretch",
            }}
          >
            <div
              style={{
                position: "relative",
                background: "var(--color-surface-card-dark)",
                border: "1px solid var(--color-hairline-on-dark)",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                minHeight: 460,
              }}
            >
              <StylizedMap />
              {LOCATIONS.map((l) => (
                <MapMarker
                  key={l.id}
                  loc={l}
                  active={active === l.id}
                  onEnter={() => setActive(l.id)}
                  onLeave={() => setActive(null)}
                  onClick={() => scrollToId(l.id)}
                />
              ))}
              <div
                style={{
                  position: "absolute",
                  left: 18,
                  bottom: 18,
                  background: "rgba(11,15,10,0.78)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid var(--color-hairline-on-dark)",
                  borderRadius: "var(--radius-md)",
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "var(--color-primary)",
                    boxShadow: "0 0 0 4px rgba(212,255,58,0.18)",
                  }}
                />
                <span
                  className="t-caption"
                  style={{ color: "var(--color-on-dark)" }}
                >
                  LTA-Trainingsstätte
                </span>
              </div>
              <div
                style={{
                  position: "absolute",
                  right: 18,
                  top: 18,
                  background: "rgba(11,15,10,0.6)",
                  border: "1px solid var(--color-hairline-on-dark)",
                  borderRadius: "var(--radius-sm)",
                  padding: "6px 10px",
                }}
              >
                <span
                  className="t-caption"
                  style={{ color: "var(--color-muted-strong)" }}
                >
                  Salzburger Land · A10
                </span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {LOCATIONS.map((l) => (
                <MapListCard
                  key={l.id}
                  loc={l}
                  active={active === l.id}
                  onEnter={() => setActive(l.id)}
                  onLeave={() => setActive(null)}
                  onClick={() => scrollToId(l.id)}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <style jsx>{`
        @media (max-width: 880px) {
          :global(.map-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function StylizedMap() {
  return (
    <svg
      viewBox="0 0 800 520"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="hatch"
          width="22"
          height="22"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="22" stroke="#1A1F14" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="800" height="520" fill="#10140D" />
      <rect width="800" height="520" fill="url(#hatch)" opacity="0.5" />

      <g fill="none" stroke="#1F2418" strokeWidth="1.5">
        <path d="M120,470 C90,420 110,360 180,350 C260,338 250,420 200,460 Z" />
        <path d="M150,440 C140,400 165,375 205,385" />
        <path d="M560,120 C520,70 600,30 660,60 C720,90 690,170 620,170 C580,170 580,150 560,120 Z" />
        <path d="M600,130 C585,100 630,80 660,100" />
      </g>

      <path
        d="M-20,40 C140,90 200,200 300,250 C400,300 360,420 470,470 C560,510 700,500 820,470"
        fill="none"
        stroke="#2A3A3F"
        strokeWidth="14"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M-20,40 C140,90 200,200 300,250 C400,300 360,420 470,470 C560,510 700,500 820,470"
        fill="none"
        stroke="#33474D"
        strokeWidth="6"
        strokeLinecap="round"
      />

      <ellipse cx="300" cy="372" rx="34" ry="20" fill="#2A3A3F" opacity="0.9" />
      <ellipse cx="300" cy="372" rx="34" ry="20" fill="none" stroke="#3A5057" strokeWidth="1.5" />

      <g stroke="#262C1C" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M400,-10 C390,120 420,260 360,380 C320,460 340,520 340,540" />
        <path d="M40,300 C200,280 300,210 420,210 C560,210 640,300 780,290" />
        <path d="M520,300 C520,360 540,420 528,520" />
      </g>
      <path
        d="M700,-10 C660,140 600,300 528,520"
        fill="none"
        stroke="#3A4528"
        strokeWidth="4"
        opacity="0.8"
      />

      <g stroke="rgba(212,255,58,0.20)" strokeWidth="1.5" strokeDasharray="3 6" fill="none">
        <line x1="400" y1="135" x2="304" y2="364" />
        <line x1="400" y1="135" x2="528" y2="281" />
        <line x1="304" y1="364" x2="528" y2="281" />
      </g>

      <g
        fontFamily="var(--font-display)"
        fontWeight="700"
        fontSize="13"
        letterSpacing="1.5"
        fill="#3D4633"
      >
        <text x="430" y="100" textAnchor="start">HALLEIN</text>
        <text x="226" y="402" textAnchor="start">KUCHL</text>
        <text x="556" y="276" textAnchor="start">BAD VIGAUN</text>
        <text x="60" y="260">GAISBERG</text>
      </g>
    </svg>
  );
}

type MarkerProps = {
  loc: Location;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
};

function MapMarker({ loc, active, onEnter, onLeave, onClick }: MarkerProps) {
  return (
    <button
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onClick}
      aria-label={`Zur Anlage ${loc.name}`}
      style={{
        position: "absolute",
        left: `${loc.coords.x}%`,
        top: `${loc.coords.y}%`,
        transform: "translate(-50%, -100%)",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 0,
        zIndex: active ? 6 : 4,
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "calc(100% + 6px)",
          left: "50%",
          transform: "translateX(-50%)",
          background: active ? "var(--color-primary)" : "rgba(11,15,10,0.85)",
          color: active ? "var(--color-on-primary)" : "var(--color-on-dark)",
          border: active ? "none" : "1px solid var(--color-hairline-on-dark)",
          padding: "5px 10px",
          borderRadius: "var(--radius-sm)",
          whiteSpace: "nowrap",
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 12,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          transition: "all 160ms cubic-bezier(0.2,0,0,1)",
          opacity: active ? 1 : 0.92,
          boxShadow: active ? "0 6px 18px rgba(0,0,0,0.4)" : "none",
        }}
      >
        {loc.city}
      </div>
      <span
        style={{
          position: "relative",
          display: "block",
          width: 18,
          height: 18,
        }}
      >
        {active && (
          <span
            style={{
              position: "absolute",
              inset: -8,
              borderRadius: "50%",
              background: "rgba(212,255,58,0.16)",
            }}
          />
        )}
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "var(--color-primary)",
            border: "3px solid var(--color-canvas-dark)",
            boxShadow: active
              ? "0 0 0 5px rgba(212,255,58,0.28)"
              : "0 0 0 0 rgba(212,255,58,0)",
            transform: active ? "scale(1.25)" : "scale(1)",
            transition: "all 180ms cubic-bezier(0.2,0,0,1)",
          }}
        />
      </span>
    </button>
  );
}

function MapListCard({ loc, active, onEnter, onLeave, onClick }: MarkerProps) {
  return (
    <button
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onClick}
      style={{
        textAlign: "left",
        cursor: "pointer",
        flex: 1,
        background: active
          ? "var(--color-surface-elevated-dark)"
          : "var(--color-surface-card-dark)",
        border: `1px solid ${active ? "var(--color-primary)" : "var(--color-hairline-on-dark)"}`,
        borderRadius: "var(--radius-lg)",
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        transition: "border-color 160ms, background 160ms, transform 160ms",
        transform: active ? "translateX(4px)" : "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <span
          className="t-number-sm"
          style={{
            color: active ? "var(--color-primary)" : "var(--color-muted)",
          }}
        >
          {loc.index}
        </span>
        <span
          className="t-caption"
          style={{
            color: active ? "var(--color-primary)" : "var(--color-muted)",
          }}
        >
          {loc.season}
        </span>
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 22,
          color: "var(--color-on-dark)",
          textTransform: "uppercase",
          letterSpacing: "-0.005em",
          lineHeight: 1.05,
        }}
      >
        {loc.name}
      </div>
      <p
        className="t-body-sm"
        style={{ color: "var(--color-muted-strong)" }}
      >
        {loc.tagline}
      </p>
      <span
        style={{
          marginTop: 6,
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          color: active ? "var(--color-primary)" : "var(--color-muted-strong)",
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          transition: "color 160ms",
        }}
      >
        Details ansehen <ArrowRight size={15} />
      </span>
    </button>
  );
}
