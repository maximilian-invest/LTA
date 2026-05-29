"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Clock,
  Info,
  Snowflake,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { MAXW } from "./ui/MaxWidth";
import { Reveal } from "./ui/Reveal";
import { SectionHead } from "./ui/SectionHead";

export function OfferHero() {
  return (
    <section
      id="top"
      style={{
        position: "relative",
        background: "var(--color-canvas-dark)",
        overflow: "hidden",
        borderBottom: "1px solid var(--color-hairline-on-dark)",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src="/assets/photo-camp-group.avif"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            filter: "saturate(0.8) contrast(1.05) brightness(0.5)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(11,15,10,0.72) 0%, rgba(11,15,10,0.55) 50%, rgba(11,15,10,0.95) 100%)",
          }}
        />
      </div>
      <div
        style={{
          position: "relative",
          maxWidth: MAXW,
          margin: "0 auto",
          padding: "120px 24px 64px",
          minHeight: "min(58vh, 520px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ maxWidth: 820 }}>
          <div
            className="t-eyebrow"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 22,
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
            Angebot &amp; Preise
          </div>
          <h1
            style={{
              fontSize: "clamp(48px, 7vw, 100px)",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              color: "var(--color-on-dark)",
            }}
          >
            Unser Angebot.
            <br />
            <span style={{ color: "var(--color-primary)" }}>
              Transparente Preise.
            </span>
          </h1>
          <p
            className="t-body-lg"
            style={{
              marginTop: 26,
              maxWidth: 560,
              color: "var(--color-on-dark)",
              opacity: 0.9,
            }}
          >
            Vom ersten Aufschlag bis zur Turniervorbereitung — wähle zwischen
            Einzel- und Gruppentraining oder spezieller Kondition. Alle Preise
            pro Person und Stunde, klar aufgeschlüsselt.
          </p>
        </div>
      </div>
    </section>
  );
}

const OFFERS: { Icon: LucideIcon; tag: string; title: string; body: string; cta: string }[] = [
  {
    Icon: Target,
    tag: "Der Klassiker",
    title: "Trainerstunde",
    body: "Perfekt für den Einstieg ins Training und um die LTA kennenzulernen. Nimm mit uns Kontakt auf und buche eine Trainings­einheit ganz nach deinen Wünschen. Für erkennbare Erfolge ist eine gewisse Regelmäßigkeit sehr wichtig.",
    cta: "Stunde anfragen",
  },
  {
    Icon: Activity,
    tag: "Athletik am Platz",
    title: "Kondition",
    body: "Für alle, die nicht unbedingt am Tennisspiel arbeiten, sich aber dennoch am Platz verbessern möchten. Unsere speziell für den Tennissport angepassten Übungen heben deine körperliche Fitness — und damit dein Spiel — auf ein neues Niveau.",
    cta: "Kondition anfragen",
  },
];

export function OfferTypes() {
  return (
    <section
      style={{
        background: "var(--color-canvas-dark)",
        padding: "var(--space-section) 0 var(--space-xxl)",
      }}
    >
      <div style={{ maxWidth: MAXW, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <div style={{ marginBottom: 44 }}>
            <SectionHead eyebrow="Womit du trainierst">
              Drei Wege,
              <br />
              <span style={{ color: "var(--color-primary)" }}>besser zu werden.</span>
            </SectionHead>
          </div>
        </Reveal>

        <div
          className="offer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 18,
            alignItems: "stretch",
          }}
        >
          {OFFERS.map((o, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: 0.07 * (i + 1),
                ease: [0.2, 0, 0, 1],
              }}
              whileHover={{ y: -4 }}
              style={{
                background: "var(--color-surface-card-dark)",
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
                  <o.Icon size={26} strokeWidth={1.7} />
                </span>
                <span className="t-eyebrow">{o.tag}</span>
              </div>
              <h3 style={{ color: "var(--color-on-dark)", fontSize: 30 }}>
                {o.title}
              </h3>
              <p
                className="t-body-md"
                style={{ color: "var(--color-muted-strong)", flex: 1 }}
              >
                {o.body}
              </p>
              <a
                href="mailto:lindenbauer@lta-tennis.at"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--color-primary)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {o.cta} <ArrowRight size={15} />
              </a>
            </motion.article>
          ))}

          {/* NextGen teaser */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.21, ease: [0.2, 0, 0, 1] }}
            style={{
              background:
                "linear-gradient(180deg, rgba(212,255,58,0.08), rgba(20,24,15,0))",
              border: "1px solid var(--color-primary)",
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
                  background: "var(--color-surface-elevated-dark)",
                  color: "var(--color-primary)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TrendingUp size={26} strokeWidth={1.7} />
              </span>
              <span
                style={{
                  background: "var(--color-primary)",
                  color: "var(--color-on-primary)",
                  padding: "5px 11px",
                  borderRadius: "var(--radius-pill)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Bald
              </span>
            </div>
            <h3 style={{ color: "var(--color-on-dark)", fontSize: 30 }}>
              NextGen Tennisacademy
            </h3>
            <p
              className="t-body-md"
              style={{ color: "var(--color-muted-strong)", flex: 1 }}
            >
              Aus der bestehenden LTA entsteht — gemeinsam mit Ex-Profispieler
              Jakob Aichhorn — ein neues Konzept, das die Jugend­arbeit im
              Leistungstennis in Salzburg auf ein neues Level hebt. Ziel: das
              bestmögliche Training für die Entwicklung von Nachwuchs­talenten.
              Genauere Infos folgen.
            </p>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "var(--color-muted-strong)",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              <Clock size={15} /> In Vorbereitung
            </span>
          </motion.article>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 980px) {
          :global(.offer-grid) {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          :global(.offer-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

const PRICE_TRAINER = [
  { size: "Einzelstunde", note: "1 : 1 mit Coach", price: "49" },
  { size: "2er Gruppe", note: "pro Person", price: "27" },
  { size: "3er Gruppe", note: "pro Person", price: "20" },
  { size: "4er Gruppe", note: "pro Person", price: "15" },
];
const PRICE_KONDITION = [
  { size: "Einzelstunde", note: "1 : 1 mit Coach", price: "49" },
  { size: "2er Gruppe", note: "pro Person", price: "27" },
  { size: "3er Gruppe", note: "pro Person", price: "20" },
  { size: "4er Gruppe", note: "pro Person", price: "15" },
  { size: "5er & 6er Gruppe", note: "pro Person", price: "12" },
  { size: "7er & 8er Gruppe", note: "pro Person", price: "10" },
];

function PriceTable({
  title,
  sub,
  rows,
  Icon,
}: {
  title: string;
  sub: string;
  rows: { size: string; note: string; price: string }[];
  Icon: LucideIcon;
}) {
  return (
    <Reveal delay={0.07}>
      <div
        style={{
          background: "var(--color-surface-card-dark)",
          border: "1px solid var(--color-hairline-on-dark)",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "26px 28px",
            borderBottom: "1px solid var(--color-hairline-on-dark)",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              width: 48,
              height: 48,
              borderRadius: "var(--radius-md)",
              background: "var(--color-primary)",
              color: "var(--color-on-primary)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={24} strokeWidth={1.7} />
          </span>
          <div>
            <h3 style={{ color: "var(--color-on-dark)", fontSize: 26 }}>{title}</h3>
            <div
              className="t-caption"
              style={{ color: "var(--color-muted-strong)", marginTop: 4 }}
            >
              {sub}
            </div>
          </div>
        </div>
        <div>
          {rows.map((r, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: "16px 28px",
                borderTop: i === 0 ? "none" : "1px solid var(--color-hairline-on-dark)",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 17,
                    color: "var(--color-on-dark)",
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                  }}
                >
                  {r.size}
                </div>
                <div
                  className="t-body-sm"
                  style={{ color: "var(--color-muted)" }}
                >
                  {r.note}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 6,
                  flexShrink: 0,
                }}
              >
                <span
                  className="t-number-md"
                  style={{
                    color: "var(--color-primary)",
                    fontSize: 26,
                    fontWeight: 700,
                  }}
                >
                  €&nbsp;{r.price},–
                </span>
                <span
                  className="t-caption"
                  style={{ color: "var(--color-muted)" }}
                >
                  / Std.
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export function Pricing() {
  return (
    <section
      id="preise"
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
              marginBottom: 28,
            }}
          >
            <SectionHead eyebrow="Preise · pro Person / Stunde">
              Was es kostet.
              <br />
              <span style={{ color: "var(--color-primary)" }}>
                Ohne Kleingedrucktes.
              </span>
            </SectionHead>
            <p
              className="t-body-md"
              style={{ maxWidth: 380, color: "var(--color-muted-strong)" }}
            >
              Alle Preise gelten{" "}
              <strong style={{ color: "var(--color-on-dark)" }}>pro Person</strong>{" "}
              und{" "}
              <strong style={{ color: "var(--color-on-dark)" }}>
                exklusive Platzkosten.
              </strong>{" "}
              Je größer die Gruppe, desto günstiger pro Kopf.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.07}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "var(--color-canvas-dark)",
              border: "1px solid var(--color-hairline-on-dark)",
              borderRadius: "var(--radius-lg)",
              padding: "16px 22px",
              marginBottom: 24,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                width: 38,
                height: 38,
                borderRadius: "var(--radius-md)",
                background: "var(--color-surface-elevated-dark)",
                color: "var(--color-primary)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Snowflake size={20} />
            </span>
            <span
              className="t-body-md"
              style={{ color: "var(--color-muted-strong)" }}
            >
              <strong style={{ color: "var(--color-on-dark)" }}>
                Platzkosten im Winter:
              </strong>{" "}
              je nach Tag und Uhrzeit zwischen{" "}
              <span
                className="t-number-sm"
                style={{ color: "var(--color-primary)" }}
              >
                € 12,–
              </span>{" "}
              und{" "}
              <span
                className="t-number-sm"
                style={{ color: "var(--color-primary)" }}
              >
                {" "}
                € 30,–
              </span>{" "}
              pro Stunde.
            </span>
          </div>
        </Reveal>

        <div
          className="price-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
            alignItems: "start",
          }}
        >
          <PriceTable
            title="Trainerstunde"
            sub="Tennistraining · Einzel & Gruppe"
            Icon={Target}
            rows={PRICE_TRAINER}
          />
          <PriceTable
            title="Kondition"
            sub="Athletik · maximal 8 Teilnehmer"
            Icon={Activity}
            rows={PRICE_KONDITION}
          />
        </div>

        <Reveal delay={0.14}>
          <div
            style={{
              marginTop: 24,
              display: "flex",
              gap: 14,
              background: "var(--color-canvas-dark)",
              border: "1px solid var(--color-hairline-on-dark)",
              borderRadius: "var(--radius-lg)",
              padding: "20px 24px",
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                color: "var(--color-primary)",
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              <Info size={20} />
            </span>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "var(--color-on-dark)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  marginBottom: 6,
                }}
              >
                Absage-Regelung
              </div>
              <p
                className="t-body-sm"
                style={{ color: "var(--color-muted-strong)", maxWidth: 760 }}
              >
                Stunden, die nicht wahrgenommen werden können, müssen am Vortag
                bekannt gegeben werden. Erfolgt keine zeitgerechte Absage,
                werden die Stunden verrechnet. Ausnahmen in unvorhersehbaren
                Fällen.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
      <style jsx>{`
        @media (max-width: 860px) {
          :global(.price-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
