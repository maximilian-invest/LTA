"use client";

import { useEffect, useRef } from "react";
import { TennisBall } from "./TennisBall";

export function ClayCourt({ height = 320 }: { height?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="court-draw"
      style={{ position: "relative", width: "100%", height }}
    >
      <svg
        viewBox="0 0 360 640"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          filter: "drop-shadow(0 18px 40px rgba(0,0,0,0.45))",
        }}
      >
        <defs>
          <linearGradient id="clayGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CB6438" />
            <stop offset="100%" stopColor="#B14E27" />
          </linearGradient>
        </defs>
        <rect
          className="court-surface"
          x="20"
          y="20"
          width="320"
          height="600"
          rx="6"
          fill="url(#clayGrad)"
        />
        <g fill="none" stroke="#F4F1E8" strokeWidth="3" strokeLinecap="square">
          <rect
            className="court-line"
            style={{ ["--len" as string]: 1840 }}
            x="44"
            y="44"
            width="272"
            height="552"
          />
          <line
            className="court-line"
            style={{ ["--len" as string]: 552 }}
            x1="92"
            y1="44"
            x2="92"
            y2="596"
          />
          <line
            className="court-line"
            style={{ ["--len" as string]: 552 }}
            x1="268"
            y1="44"
            x2="268"
            y2="596"
          />
          <line
            className="court-line"
            style={{ ["--len" as string]: 272 }}
            x1="44"
            y1="188"
            x2="316"
            y2="188"
          />
          <line
            className="court-line"
            style={{ ["--len" as string]: 272 }}
            x1="44"
            y1="452"
            x2="316"
            y2="452"
          />
          <line
            className="court-line"
            style={{ ["--len" as string]: 264 }}
            x1="92"
            y1="320"
            x2="268"
            y2="320"
          />
          <line
            className="court-line"
            style={{ ["--len" as string]: 16 }}
            x1="180"
            y1="180"
            x2="180"
            y2="196"
          />
          <line
            className="court-line"
            style={{ ["--len" as string]: 16 }}
            x1="180"
            y1="444"
            x2="180"
            y2="460"
          />
        </g>
        <g className="court-surface">
          <rect x="36" y="316" width="288" height="8" fill="#0B0F0A" opacity="0.32" />
          <rect x="36" y="314" width="288" height="3" fill="#F4F1E8" opacity="0.8" />
        </g>
      </svg>
      <span
        className="rally-shadow"
        aria-hidden="true"
        style={{
          width: Math.round(height * 0.05),
          height: Math.round(height * 0.022),
        }}
      />
      <span className="rally-ball" aria-hidden="true">
        <TennisBall size={Math.round(height * 0.072)} anim="spin" />
      </span>
    </div>
  );
}
