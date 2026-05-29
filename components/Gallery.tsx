"use client";

import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { MAXW } from "./ui/MaxWidth";
import { Reveal } from "./ui/Reveal";

type GalleryItem = {
  src: string;
  cap: string;
  place: CSSProperties;
};

const GALLERY: GalleryItem[] = [
  {
    src: "/assets/photo-court-hallein.avif",
    cap: "Hallein · 5 Sandplätze im Sommer",
    place: { gridColumn: "1 / 3", gridRow: "1 / 3" },
  },
  {
    src: "/assets/photo-camp-group.avif",
    cap: "Hallein · Hallenplatz beim LTA-Camp",
    place: { gridColumn: "3", gridRow: "1" },
  },
  {
    src: "/assets/photo-kraftkammer.webp",
    cap: "Hallein · Kraftkammer für Athletik",
    place: { gridColumn: "4", gridRow: "1" },
  },
  {
    src: "/assets/photo-court-kuchl.avif",
    cap: "Kuchl · Training vor dem Bergpanorama",
    place: { gridColumn: "3 / 5", gridRow: "2" },
  },
  {
    src: "/assets/photo-court-vigaun.avif",
    cap: "Bad Vigaun · Allcourt mit Flutlicht",
    place: { gridColumn: "1", gridRow: "3" },
  },
  {
    src: "/assets/photo-outdoor-fitness.webp",
    cap: "Kuchl · direkt am Bürgerausee",
    place: { gridColumn: "2", gridRow: "3" },
  },
];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const next = useCallback(
    () =>
      setOpen((o) => (o === null ? o : (o + 1) % GALLERY.length)),
    [],
  );
  const prev = useCallback(
    () =>
      setOpen((o) =>
        o === null ? o : (o - 1 + GALLERY.length) % GALLERY.length,
      ),
    [],
  );
  const close = () => setOpen(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, next, prev]);

  return (
    <section
      id="galerie"
      style={{
        background: "var(--color-canvas-dark)",
        padding: "var(--space-section) 0",
        borderTop: "1px solid var(--color-hairline-on-dark)",
      }}
    >
      <div style={{ maxWidth: MAXW, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <div
            className="gal-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridAutoRows: "200px",
              gap: 14,
            }}
          >
            {GALLERY.map((g, i) => (
              <button
                key={i}
                className="gtile"
                onClick={() => setOpen(i)}
                style={{
                  ...g.place,
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--color-hairline-on-dark)",
                  cursor: "pointer",
                  padding: 0,
                  background: "var(--color-surface-card-dark)",
                }}
              >
                <Image
                  src={g.src}
                  alt={g.cap}
                  fill
                  sizes="(max-width: 860px) 100vw, 50vw"
                  className="gimg"
                  style={{
                    objectFit: "cover",
                    filter: "saturate(0.9) contrast(1.04) brightness(0.9)",
                    transition:
                      "transform 320ms cubic-bezier(0.2,0,0,1), filter 320ms",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(11,15,10,0) 50%, rgba(11,15,10,0.78) 100%)",
                    pointerEvents: "none",
                  }}
                />
                <span
                  className="t-caption"
                  style={{
                    position: "absolute",
                    left: 14,
                    bottom: 12,
                    color: "var(--color-on-dark)",
                    textAlign: "left",
                    pointerEvents: "none",
                  }}
                >
                  {g.cap}
                </span>
                <span
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    width: 30,
                    height: 30,
                    borderRadius: "var(--radius-sm)",
                    background: "rgba(11,15,10,0.6)",
                    backdropFilter: "blur(6px)",
                    color: "var(--color-primary)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none",
                  }}
                >
                  <Maximize2 size={15} />
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Bildergalerie"
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(6,8,5,0.94)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <button
            aria-label="Schließen"
            onClick={close}
            style={{
              position: "absolute",
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
            }}
          >
            <X size={22} />
          </button>
          <button
            aria-label="Vorheriges Bild"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="lb-arrow"
            style={{ left: 24 }}
          >
            <ChevronLeft size={26} />
          </button>
          <figure
            onClick={(e) => e.stopPropagation()}
            style={{
              margin: 0,
              maxWidth: "min(1100px, 92vw)",
              maxHeight: "86vh",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "76vh",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.14)",
              }}
            >
              <Image
                src={GALLERY[open].src}
                alt={GALLERY[open].cap}
                fill
                sizes="92vw"
                style={{ objectFit: "contain" }}
              />
            </div>
            <figcaption
              style={{ display: "flex", alignItems: "center", gap: 16 }}
            >
              <span
                className="t-number-sm"
                style={{ color: "var(--color-primary)" }}
              >
                {String(open + 1).padStart(2, "0")} /{" "}
                {String(GALLERY.length).padStart(2, "0")}
              </span>
              <span
                className="t-body-md"
                style={{ color: "var(--color-on-dark)" }}
              >
                {GALLERY[open].cap}
              </span>
            </figcaption>
          </figure>
          <button
            aria-label="Nächstes Bild"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="lb-arrow"
            style={{ right: 24 }}
          >
            <ChevronRight size={26} />
          </button>
        </div>
      )}

      <style jsx>{`
        :global(.gtile:hover .gimg) {
          transform: scale(1.05);
          filter: saturate(1) contrast(1.05) brightness(1);
        }
        :global(.lb-arrow) {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: background 150ms;
        }
        :global(.lb-arrow:hover) {
          background: var(--color-primary);
          color: var(--color-on-primary);
          border-color: var(--color-primary);
        }
        @media (max-width: 860px) {
          :global(.gal-grid) {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-rows: 170px !important;
          }
          :global(.gal-grid .gtile) {
            grid-column: auto !important;
            grid-row: auto !important;
          }
          :global(.gal-grid .gtile:first-child) {
            grid-column: 1 / 3 !important;
            grid-row: span 2 !important;
          }
        }
        @media (max-width: 520px) {
          :global(.lb-arrow) {
            width: 42px;
            height: 42px;
          }
        }
      `}</style>
    </section>
  );
}
