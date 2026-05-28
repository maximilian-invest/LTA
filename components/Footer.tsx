"use client";

import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import { MAXW } from "./ui/MaxWidth";
import { scrollToId } from "@/lib/scroll";

const COLUMNS = [
  {
    title: "Trainingsstätten",
    links: ["1. Halleiner TC", "TC Kuchl", "UTC Bad Vigaun", "Anfahrt & Karte"],
  },
  {
    title: "Academy",
    links: ["Programme", "Coach", "Camps", "Erfolge", "Über uns"],
  },
  {
    title: "Service",
    links: ["Probetraining anfragen", "Preise & Pakete", "FAQ", "Newsletter"],
  },
  { title: "Rechtliches", links: ["Impressum", "Datenschutz", "AGB"] },
];

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-surface-soft-light)",
        color: "var(--color-body-on-light)",
        padding: "72px 0 30px",
      }}
    >
      <div style={{ maxWidth: MAXW, margin: "0 auto", padding: "0 24px" }}>
        <div
          className="foot-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr repeat(4, 1fr)",
            gap: 40,
            marginBottom: 52,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <Image
              src="/assets/lta-logo-light.png"
              alt="Lindenbauer Tennis Academy"
              width={160}
              height={56}
              style={{ height: 56, width: "auto", alignSelf: "flex-start" }}
            />
            <p
              className="t-body-sm"
              style={{ color: "var(--color-muted)", maxWidth: 290 }}
            >
              Lindenbauer Tennis Academy — Tennis für Kinder, Jugendliche und
              Erwachsene im Tennengau. Drei Anlagen in Hallein, Kuchl und Bad
              Vigaun.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginTop: 4,
              }}
            >
              <a
                href="tel:+436647500954"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: "var(--color-ink)",
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "var(--radius-sm)",
                    background: "var(--color-ink)",
                    color: "var(--color-primary)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Phone size={15} />
                </span>
                <span
                  className="t-number-sm"
                  style={{ color: "var(--color-ink)" }}
                >
                  +43 664 7500 9549
                </span>
              </a>
              <a
                href="mailto:lindenbauer@lta-tennis.at"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: "var(--color-ink)",
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "var(--radius-sm)",
                    background: "var(--color-ink)",
                    color: "var(--color-primary)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Mail size={15} />
                </span>
                <span style={{ fontSize: 14, color: "var(--color-ink)" }}>
                  lindenbauer@lta-tennis.at
                </span>
              </a>
              <a
                href="https://www.facebook.com/lindenbauertennisacademy/"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: "var(--color-ink)",
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "var(--radius-sm)",
                    background: "var(--color-ink)",
                    color: "var(--color-primary)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M14 8.5h2.2V5.4C15.83 5.35 15.05 5.3 14.14 5.3c-1.9 0-3.2 1.16-3.2 3.3v1.84H8v3.13h2.94V21h3.6v-7.13h2.83l.45-3.13h-3.28V8.94c0-.9.25-1.52 1.46-1.52z" />
                  </svg>
                </span>
                <span style={{ fontSize: 14, color: "var(--color-ink)" }}>
                  @lindenbauertennisacademy
                </span>
              </a>
            </div>
          </div>
          {COLUMNS.map((col) => (
            <div
              key={col.title}
              style={{ display: "flex", flexDirection: "column", gap: 13 }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "var(--color-ink)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {col.title}
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 9,
                }}
              >
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#kontakt"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId("kontakt");
                      }}
                      style={{
                        color: "var(--color-muted)",
                        fontSize: 14,
                        textDecoration: "none",
                        cursor: "pointer",
                      }}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          style={{ height: 1, background: "var(--color-hairline-on-light)" }}
        />
        <div
          style={{
            paddingTop: 22,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <span
            className="t-body-sm"
            style={{ color: "var(--color-muted)" }}
          >
            © {new Date().getFullYear()} Lindenbauer Tennis Academy · Alle Rechte
            vorbehalten.
          </span>
          <span
            className="t-body-sm"
            style={{ color: "var(--color-muted)" }}
          >
            Lizensierter ÖTV-Coach · Mitglied 1. Halleiner TC, TC Kuchl & UTC
            Bad Vigaun
          </span>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 820px) {
          :global(.foot-grid) {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 520px) {
          :global(.foot-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
