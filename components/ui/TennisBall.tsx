import type { CSSProperties } from "react";

type Anim = "none" | "bounce" | "spin";

export function TennisBall({
  size = 28,
  anim = "none",
  style,
}: {
  size?: number;
  anim?: Anim;
  style?: CSSProperties;
}) {
  const animationCss =
    anim === "bounce"
      ? "lta-ball-bounce 1300ms cubic-bezier(0.3,0,0.3,1) infinite"
      : anim === "spin"
        ? "lta-ball-spin 4s linear infinite"
        : "none";
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: size,
        height: size,
        animation: animationCss,
        ...style,
      }}
    >
      <svg viewBox="0 0 64 64" width={size} height={size} style={{ display: "block" }}>
        <circle cx="32" cy="32" r="30" fill="var(--color-primary)" stroke="#A9CC2C" strokeWidth="1.5" />
        <path
          d="M9 14 C 22 26, 22 38, 9 50"
          fill="none"
          stroke="#0B0F0A"
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M55 14 C 42 26, 42 38, 55 50"
          fill="none"
          stroke="#0B0F0A"
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.85"
        />
        <circle cx="24" cy="22" r="6" fill="#FFFFFF" opacity="0.22" />
      </svg>
    </span>
  );
}
