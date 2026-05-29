import Image from "next/image";
import type { ReactNode } from "react";
import { MAXW } from "./MaxWidth";

type Props = {
  eyebrow: string;
  title: string;
  accent?: string;
  sub?: ReactNode;
  photo: string;
  photoPos?: string;
};

export function PageHero({
  eyebrow,
  title,
  accent,
  sub,
  photo,
  photoPos = "50% 40%",
}: Props) {
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
          src={photo}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: photoPos,
            filter: "saturate(0.78) contrast(1.05) brightness(0.45)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(11,15,10,0.72) 0%, rgba(11,15,10,0.6) 50%, rgba(11,15,10,0.96) 100%)",
          }}
        />
      </div>
      <div
        style={{
          position: "relative",
          maxWidth: MAXW,
          margin: "0 auto",
          padding: "120px 24px 56px",
          minHeight: "min(48vh, 420px)",
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
              marginBottom: 20,
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
            {eyebrow}
          </div>
          <h1
            style={{
              fontSize: "clamp(46px, 6.5vw, 92px)",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              color: "var(--color-on-dark)",
            }}
          >
            {title}{" "}
            {accent && (
              <span style={{ color: "var(--color-primary)" }}>{accent}</span>
            )}
          </h1>
          {sub && (
            <p
              className="t-body-lg"
              style={{
                marginTop: 24,
                maxWidth: 560,
                color: "var(--color-on-dark)",
                opacity: 0.9,
              }}
            >
              {sub}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
