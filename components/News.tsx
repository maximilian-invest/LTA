"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  Mail,
  Tent,
  Trophy,
  X,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { MAXW } from "./ui/MaxWidth";
import { Reveal } from "./ui/Reveal";

type Category = "Camp" | "Erfolg" | "Academy";

type NewsItem = {
  id: string;
  cat: Category;
  date: string;
  sort: number;
  title: string;
  img?: string;
  excerpt: string;
  body: string[];
  facts?: { k: string; v: string }[];
};

const NEWS: NewsItem[] = [
  {
    id: "camp2026",
    cat: "Camp",
    date: "Juli 2026",
    sort: 20260713,
    title: "Tenniscamps 2026",
    img: "/assets/news-camp-2026.webp",
    excerpt:
      "Zwei Wochen am 1. Halleiner TC — Woche 1 nur für Turnierspieler:innen, Woche 2 kompakt für Anfänger und Fortgeschrittene.",
    body: [
      "Nach fünf erfolgreichen Ausgaben des LTA-Tenniscamps — in Zusammenarbeit mit der Soccer Academy — begrüßen wir 2026 wieder Kids und Jugendliche zwischen 6 und 16 Jahren aus ganz Salzburg und Österreich auf der Anlage des 1. Halleiner Tennisclubs.",
      "Neu in diesem Jahr: Camp 1 (13.–17.07.) ist ganztägig und speziell für Meisterschafts- und Turnierspieler:innen gestaltet — train like a pro, Mo–Fr 09:00–16:30, inkl. Mittagessen. Mit Übernachtung € 490,–, ohne € 295,–.",
      "Camp 2 (20.–24.07.) bietet ein kompakteres Programm für Anfänger und Fortgeschrittene — improve your game, Mo–Fr 08:30–12:00, € 175,–.",
      "Anmeldung unter lindenbauer@lta-tennis.at.",
    ],
    facts: [
      { k: "Camp 1", v: "13.–17.07." },
      { k: "Camp 2", v: "20.–24.07." },
      { k: "Alter", v: "6 – 16 J." },
    ],
  },
  {
    id: "moritz-u18",
    cat: "Erfolg",
    date: "29.08.2025",
    sort: 20250829,
    title: "U18-Landesmeister: Moritz Schernthaner",
    img: "/assets/news-moritz-u18.avif",
    excerpt:
      "Bei den STV-Landesmeisterschaften setzte sich Moritz gegen die Konkurrenz durch und feiert den Titel im Einzel.",
    body: [
      "Bei den Landesmeisterschaften des Salzburger Tennisverbands setzte sich Moritz Schernthaner gegen seine Konkurrenten durch und darf nun seinen hart erarbeiteten Landesmeistertitel im Einzel der U18 feiern.",
      "Ein verdienter Lohn für konsequentes Training — herzliche Gratulation!",
    ],
    facts: [
      { k: "Bewerb", v: "U18 Einzel" },
      { k: "Platz", v: "1" },
    ],
  },
  {
    id: "camp2025",
    cat: "Camp",
    date: "Juli 2025",
    sort: 20250707,
    title: "LTA Tenniscamp 2025",
    img: "/assets/news-camp-2025.avif",
    excerpt:
      "Zwei professionell organisierte Trainingswochen am 1. Halleiner TC — kleine Gruppen, Athletik und tägliche Theorie.",
    body: [
      "Nach vier erfolgreichen Ausgaben begrüßten wir 2025 erneut viele Kids und Jugendliche (U16) aus ganz Salzburg und Österreich auf der Anlage des 1. Halleiner Tennisclubs.",
      "Vom 07.–11.07. und 14.–18.07. fanden zwei professionell organisierte Trainingswochen statt. Betreut von ausgebildeten Trainern und Sportwissenschaftlern in kleinen Gruppen: 3–4 h Tennis, 1 h Athletik und tägliche Theorieeinheiten zu Regeln, Taktik und mentalen Strategien.",
      "Für weiter angereiste Teilnehmer gab es im Landesberufsschulheim Hallein eine Übernachtungsmöglichkeit.",
    ],
    facts: [
      { k: "Woche 1", v: "07.–11.07." },
      { k: "Woche 2", v: "14.–18.07." },
    ],
  },
  {
    id: "doppel2024",
    cat: "Erfolg",
    date: "17.09.2024",
    sort: 20240917,
    title: "2× Doppel-Landesmeistertitel",
    img: "/assets/news-doppel-2024.avif",
    excerpt:
      "Bei den Outdoor-Jugend-Landesmeisterschaften in Eugendorf glänzten Moritz, Maximilian und Johanna.",
    body: [
      "Bei den Outdoor-Jugend-Landesmeisterschaften in Eugendorf zeigten unsere Schützlinge starke Leistungen. Moritz lieferte in der Gruppenphase der U18-Burschen harte Matches auf Augenhöhe — gegen den späteren Sieger gewann er 6:3 6:3. Nach zwei knappen Niederlagen reichte es im Einzel für Platz 4.",
      "Im Doppel holte Moritz mit Partner Yasin Blickle den Titel. Auch sein kleiner Bruder Maximilian feierte den Doppeltitel der U12-Burschen mit Florian Gruber. Johanna erreichte bei den U18-Mädchen Platz 2.",
    ],
    facts: [
      { k: "Doppeltitel", v: "2" },
      { k: "Spieler:innen", v: "3" },
    ],
  },
  {
    id: "lm-feb24",
    cat: "Erfolg",
    date: "15.02.2024",
    sort: 20240215,
    title: "Landesmeisterin Johanna · Vizetitel Maxi",
    excerpt:
      "Johanna gewinnt souverän den U14-Bewerb, Maximilian wird Vize-Landesmeister U12 und holt den Doppeltitel.",
    body: [
      "Tolle Erfolge bei den Salzburger Landesmeisterschaften: Johanna Schernthaner gewann souverän den U14-Bewerb der Mädchen und ist Landesmeisterin.",
      "Maximilian Schernthaner setzte seine starken Trainingsleistungen endlich im Turnier um, erreichte nach drei Zwei-Satz-Siegen das Finale und wurde Vize-Landesmeister U12. Im Doppel holte er mit Florian Gruber den Titel.",
      "Moritz spielte sich ins Viertelfinale der U18 und belegte im Doppel mit Daniel Stadler Platz 4.",
    ],
    facts: [
      { k: "Titel", v: "U14 + Doppel" },
      { k: "Vize", v: "U12" },
    ],
  },
  {
    id: "wolfsberg-kat1",
    cat: "Erfolg",
    date: "08.01.2024",
    sort: 20240108,
    title: "Platz 3 zum Saisonstart in Wolfsberg",
    excerpt:
      "Johanna erreicht beim ÖTV-Kat-1-Turnier sowohl im Einzel als auch im Doppel das Halbfinale.",
    body: [
      "Beim ÖTV-Kat-1-Turnier in Wolfsberg erreichte Johanna im Einzel und im Doppel (mit Anna-Lena Demmelbauer) das Halbfinale.",
      "Der Einzelbewerb startete mit zwei souveränen Siegen. Im Viertelfinale traf sie auf die aktuelle Nummer 6 Österreichs, Amelie Mayr — Johanna rief ihr bestes Tennis ab und gewann 6:1 6:2. Im Halbfinale war gegen die spätere Turniersiegerin nichts zu holen.",
    ],
    facts: [
      { k: "Einzel", v: "Halbfinale" },
      { k: "Doppel", v: "Halbfinale" },
    ],
  },
  {
    id: "bundesfinale-2023",
    cat: "Erfolg",
    date: "21.10.2023",
    sort: 20231021,
    title: "Platz 3 beim Bundesfinale",
    excerpt:
      "Als Landesmeister vertraten die Mädels des HTC Salzburg beim Bundesfinale der Mannschaftsmeisterschaft.",
    body: [
      "Als Landesmeister vertraten die Mädels des 1. Halleiner Tennisclubs das Bundesland Salzburg beim Bundesfinale in Wolfsberg, Kärnten.",
      "Im ersten Spiel gewannen Johanna, Saphira und Mia-Sophie souverän 3:0 gegen das Burgenland. Im Halbfinale unterlagen sie nach zwei knappen Drei-Satz-Niederlagen den späteren Siegerinnen aus Wien. Im Spiel um Platz 3 setzten sie sich mit 3:0 gegen Tirol durch.",
    ],
    facts: [
      { k: "Endplatz", v: "3" },
      { k: "Modus", v: "Mannschaft" },
    ],
  },
  {
    id: "camp2023",
    cat: "Camp",
    date: "01.08.2023",
    sort: 20230801,
    title: "LTA Tenniscamp 2023: 33 Kinder",
    excerpt:
      "Zwei volle Sommerwochen am HTC — Woche 1 für Einsteiger, Woche 2 ausschließlich für Leistungsspieler.",
    body: [
      "Das LTA-Tenniscamp 2023 war erneut ein voller Erfolg: 33 Kinder aus ganz Salzburg und Österreich trainierten in den ersten zwei Ferienwochen am 1. Halleiner Tennisclub.",
      "Während in Woche 1 viele jüngere Teilnehmer ihr erstes intensives Camp absolvierten, kamen in Woche 2 ausschließlich Leistungsspieler — darunter die besten Talente Salzburgs in U12 und U14. Pro Tag: 1 h Kondition, 3,5 h Tennis und 1–2 h Taktik- und Mentaltraining.",
    ],
    facts: [
      { k: "Teilnehmer", v: "33" },
      { k: "Wochen", v: "2" },
    ],
  },
  {
    id: "saalfelden-2022",
    cat: "Erfolg",
    date: "30.09.2022",
    sort: 20220930,
    title: "1. und 3. Platz beim Sparkassen Masters",
    excerpt:
      "Johanna triumphiert souverän im U12-Bewerb, Bruder Moritz holt Platz 3 in der U18.",
    body: [
      "Beim Sparkassen Masters in Saalfelden triumphierte Johanna souverän im U12-Bewerb der Mädchen — im gesamten Turnierverlauf verlor sie nur 6 Games.",
      "Ihr Bruder Moritz setzte sich im U18-Bewerb in einem umkämpften Match um Platz 3 mit 6:4 5:7 12:10 durch — eine starke Leistung für den erst 14-Jährigen.",
    ],
    facts: [
      { k: "U12", v: "Sieg" },
      { k: "U18", v: "Platz 3" },
    ],
  },
  {
    id: "ssm-2022",
    cat: "Academy",
    date: "14.04.2022",
    sort: 20220414,
    title: "SSM-Aufnahme für Moritz Schernthaner",
    excerpt:
      "Als erster LTA-Spieler schafft Moritz die Aufnahme ins Schulsport-Modell Salzburg — Leistungssport plus Schule.",
    body: [
      "Mit Stolz geben wir bekannt: Mit Moritz Schernthaner schaffte der erste LTA-Spieler die Aufnahme ins Schulsport-Modell (SSM) Salzburg.",
      "Als spätgeborener 2007er-Jahrgang zählt er in der U16 zu den besten 60 Spielern Österreichs — mit dem Ziel, weiter nach oben zu klettern. Das SSM ermöglicht Leistungssport ohne Vernachlässigung der schulischen Ausbildung. Wir freuen uns, Moritz auf seinem Weg zu begleiten.",
    ],
    facts: [
      { k: "Programm", v: "SSM Salzburg" },
      { k: "ÖTV-Rang", v: "Top 60" },
    ],
  },
  {
    id: "kids-lm-2021",
    cat: "Erfolg",
    date: "03.10.2021",
    sort: 20211003,
    title: "Landesmeisterin U9: Mia-Sophie Schnell",
    excerpt:
      "Bei der Kids-Landesmeisterschaft des STV feiern unsere Mädels gleich mehrere Podestplätze.",
    body: [
      "Bei den Salzburger Kids-Landesmeisterschaften durften unsere Mädels mehrere Erfolge feiern. In der U11 belegten Theresa Putz und Sarah Klabacher die Plätze 3 und 4. Klara Kogler — Campteilnehmerin und seit Oktober fixer Teil der Academy — wurde Vize-Landesmeisterin.",
      "Als Landesmeisterin der U9 darf sich Mia-Sophie Schnell feiern lassen, die wie Klara als Campteilnehmerin zu uns kam und nun ganzjährig trainiert.",
    ],
    facts: [
      { k: "U9", v: "Landesmeisterin" },
      { k: "U11", v: "Vize + P3/4" },
    ],
  },
  {
    id: "camp2021",
    cat: "Camp",
    date: "04.08.2021",
    sort: 20210804,
    title: "Erste Camp-Wochen am HTC",
    excerpt:
      "31 Teilnehmer, fast ausgebucht im ersten Jahr — die Tenniscamps werden zum Fixtermin der LTA.",
    body: [
      "Von 12.–23.07.2021 wurden am Halleiner Tennisclub zwei sehr erfolgreiche Camps durchgeführt. Mit 31 Teilnehmern waren die Wochen bereits im ersten Jahr fast ausgebucht (max. 32).",
      "Trainiert wurde in 3er- und 4er-Gruppen, jede individuell betreut. Die Kinder kamen aus ganz Salzburg, aus Niederösterreich und Deutschland. Gemeinsam mit der parallel laufenden Soccer Academy war für Verpflegung und Unterkunft gesorgt: täglich 3,5 h Tennis, 1 h Athletik plus Theorie.",
    ],
    facts: [
      { k: "Teilnehmer", v: "31" },
      { k: "Auslastung", v: "97%" },
    ],
  },
];

const CATS: { key: "Alle" | Category; label: string }[] = [
  { key: "Alle", label: "Alle" },
  { key: "Camp", label: "Camps" },
  { key: "Erfolg", label: "Erfolge" },
  { key: "Academy", label: "Academy" },
];

const CAT_ICON: Record<Category, LucideIcon> = {
  Camp: Tent,
  Erfolg: Trophy,
  Academy: GraduationCap,
};

export function NewsHero() {
  return (
    <section
      id="top"
      style={{
        position: "relative",
        background: "var(--color-canvas-dark)",
        borderBottom: "1px solid var(--color-hairline-on-dark)",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src="/assets/news-doppel-2024.avif"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "50% 35%",
            filter: "saturate(0.78) contrast(1.05) brightness(0.45)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(11,15,10,0.74) 0%, rgba(11,15,10,0.6) 50%, rgba(11,15,10,0.96) 100%)",
          }}
        />
      </div>
      <div
        style={{
          position: "relative",
          maxWidth: MAXW,
          margin: "0 auto",
          padding: "120px 24px 60px",
          minHeight: "min(54vh, 480px)",
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
            Aktuelles
          </div>
          <h1
            style={{
              fontSize: "clamp(48px, 7vw, 100px)",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              color: "var(--color-on-dark)",
            }}
          >
            News &amp;{" "}
            <span style={{ color: "var(--color-primary)" }}>Erfolge.</span>
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
            Camps, Turnierergebnisse und Meilensteine unserer Spieler:innen — von
            Landesmeistertiteln bis zur SSM-Aufnahme. Was bei der LTA passiert,
            steht hier.
          </p>
        </div>
      </div>
    </section>
  );
}

function CatBadge({ cat }: { cat: Category }) {
  const isErfolg = cat === "Erfolg";
  const Icon = CAT_ICON[cat];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: isErfolg ? "var(--color-primary)" : "rgba(11,15,10,0.7)",
        color: isErfolg ? "var(--color-on-primary)" : "var(--color-on-dark)",
        border: isErfolg ? "none" : "1px solid var(--color-hairline-on-dark)",
        padding: "5px 10px",
        borderRadius: "var(--radius-sm)",
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      <Icon size={12} />
      {cat}
    </span>
  );
}

export function NewsFeed() {
  const [cat, setCat] = useState<"Alle" | Category>("Alle");
  const [openId, setOpenId] = useState<string | null>(null);

  const sorted = useMemo(() => [...NEWS].sort((a, b) => b.sort - a.sort), []);
  const list = cat === "Alle" ? sorted : sorted.filter((n) => n.cat === cat);
  const open = openId ? NEWS.find((n) => n.id === openId) : null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section
      id="feed"
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
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
              marginBottom: 36,
              borderBottom: "1px solid var(--color-hairline-on-dark)",
              paddingBottom: 4,
            }}
          >
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {CATS.map((c) => {
                const active = cat === c.key;
                const count =
                  c.key === "Alle"
                    ? sorted.length
                    : sorted.filter((n) => n.cat === c.key).length;
                return (
                  <button
                    key={c.key}
                    onClick={() => setCat(c.key)}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "10px 14px 14px",
                      borderBottom: active
                        ? "2px solid var(--color-primary)"
                        : "2px solid transparent",
                      color: active
                        ? "var(--color-on-dark)"
                        : "var(--color-muted-strong)",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 15,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      transition: "color 150ms, border-color 150ms",
                    }}
                  >
                    {c.label}
                    <span
                      className="t-number-sm"
                      style={{
                        color: active
                          ? "var(--color-primary)"
                          : "var(--color-muted)",
                        fontSize: 12,
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
            <span className="t-caption" style={{ color: "var(--color-muted)" }}>
              {list.length} Beiträge
            </span>
          </div>
        </Reveal>

        <div
          className="news-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 18,
          }}
        >
          {list.map((n, i) => (
            <NewsCard
              key={n.id}
              n={n}
              delay={i % 3}
              onOpen={() => setOpenId(n.id)}
            />
          ))}
        </div>
      </div>

      {open && <NewsModal n={open} onClose={() => setOpenId(null)} />}

      <style jsx>{`
        @media (max-width: 920px) {
          :global(.news-grid) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          :global(.news-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function NewsCard({
  n,
  delay,
  onOpen,
}: {
  n: NewsItem;
  delay: number;
  onOpen: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.55,
        delay: 0.07 * (delay + 1),
        ease: [0.2, 0, 0, 1],
      }}
      whileHover={{ y: -3, borderColor: "var(--color-primary)" }}
      onClick={onOpen}
      style={{
        background: "var(--color-surface-card-dark)",
        border: "1px solid var(--color-hairline-on-dark)",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      {n.img ? (
        <div
          className="news-img-wrap"
          style={{ position: "relative", aspectRatio: "16 / 11", overflow: "hidden" }}
        >
          <Image
            src={n.img}
            alt={n.title}
            fill
            sizes="(max-width: 920px) 50vw, 33vw"
            className="news-img"
            style={{
              objectFit: "cover",
              objectPosition: "50% 28%",
              filter: "saturate(0.92) contrast(1.03) brightness(0.92)",
              transition: "transform 360ms cubic-bezier(0.2,0,0,1)",
            }}
          />
          <span style={{ position: "absolute", top: 14, left: 14 }}>
            <CatBadge cat={n.cat} />
          </span>
        </div>
      ) : (
        <div style={{ padding: "22px 24px 0" }}>
          <CatBadge cat={n.cat} />
        </div>
      )}
      <div
        style={{
          padding: "20px 24px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          flex: 1,
        }}
      >
        <span className="t-number-sm" style={{ color: "var(--color-muted)" }}>
          {n.date}
        </span>
        <h3
          style={{ color: "var(--color-on-dark)", fontSize: 23, lineHeight: 1.08 }}
        >
          {n.title}
        </h3>
        <p
          className="t-body-sm"
          style={{ color: "var(--color-muted-strong)" }}
        >
          {n.excerpt}
        </p>
        <span
          className="news-read"
          style={{
            marginTop: "auto",
            paddingTop: 6,
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            color: "var(--color-muted-strong)",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            transition: "color 160ms",
          }}
        >
          Weiterlesen <ArrowRight size={15} />
        </span>
      </div>
      <style jsx>{`
        article:hover :global(.news-img) {
          transform: scale(1.05);
        }
        article:hover :global(.news-read) {
          color: var(--color-primary);
        }
      `}</style>
    </motion.article>
  );
}

function NewsModal({ n, onClose }: { n: NewsItem; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={n.title}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(6,8,5,0.92)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "5vh 24px",
        overflowY: "auto",
      }}
    >
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--color-surface-card-dark)",
          border: "1px solid var(--color-hairline-on-dark)",
          borderRadius: "var(--radius-xl)",
          maxWidth: 720,
          width: "100%",
          overflow: "hidden",
          margin: "auto",
        }}
      >
        {n.img && (
          <div
            style={{
              position: "relative",
              aspectRatio: "16 / 9",
              overflow: "hidden",
            }}
          >
            <Image
              src={n.img}
              alt={n.title}
              fill
              sizes="720px"
              style={{
                objectFit: "cover",
                objectPosition: "50% 25%",
                filter: "saturate(0.92) contrast(1.03) brightness(0.9)",
              }}
            />
            <span style={{ position: "absolute", top: 16, left: 16 }}>
              <CatBadge cat={n.cat} />
            </span>
          </div>
        )}
        <div style={{ padding: "30px 34px 34px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              marginBottom: 14,
            }}
          >
            <span
              className="t-number-sm"
              style={{ color: "var(--color-primary)" }}
            >
              {n.date}
            </span>
            {!n.img && <CatBadge cat={n.cat} />}
          </div>
          <h2
            style={{
              color: "var(--color-on-dark)",
              fontSize: "clamp(28px, 4vw, 40px)",
              lineHeight: 1,
            }}
          >
            {n.title}
          </h2>
          {n.facts && (
            <div
              style={{
                display: "flex",
                gap: 0,
                margin: "22px 0",
                flexWrap: "wrap",
                borderTop: "1px solid var(--color-hairline-on-dark)",
                borderBottom: "1px solid var(--color-hairline-on-dark)",
              }}
            >
              {n.facts.map((f, i) => (
                <div
                  key={i}
                  style={{
                    flex: "1 1 100px",
                    padding: "14px 18px 14px 0",
                    borderLeft:
                      i === 0
                        ? "none"
                        : "1px solid var(--color-hairline-on-dark)",
                    paddingLeft: i === 0 ? 0 : 18,
                  }}
                >
                  <div
                    className="t-number-md"
                    style={{ color: "var(--color-primary)", fontSize: 19 }}
                  >
                    {f.v}
                  </div>
                  <div
                    className="t-caption"
                    style={{
                      color: "var(--color-muted-strong)",
                      marginTop: 4,
                    }}
                  >
                    {f.k}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {n.body.map((p, i) => (
              <p
                key={i}
                className="t-body-md"
                style={{ color: "var(--color-muted-strong)" }}
              >
                {p}
              </p>
            ))}
          </div>
          {n.cat === "Camp" && (
            <a
              href="mailto:lindenbauer@lta-tennis.at"
              style={{
                marginTop: 24,
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: "var(--color-primary)",
                color: "var(--color-on-primary)",
                height: 50,
                padding: "0 24px",
                borderRadius: "var(--radius-pill)",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: 14,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              <Mail size={17} /> Zum Camp anmelden
            </a>
          )}
        </div>
      </motion.article>
      <button
        aria-label="Schließen"
        onClick={onClose}
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "var(--color-on-dark)",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 210,
        }}
      >
        <X size={22} />
      </button>
    </div>
  );
}
