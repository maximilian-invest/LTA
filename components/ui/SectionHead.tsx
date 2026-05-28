import type { CSSProperties, ReactNode } from "react";

export function SectionHead({
  eyebrow,
  children,
  align = "left",
  style,
}: {
  eyebrow: string;
  children: ReactNode;
  align?: "left" | "center" | "right";
  style?: CSSProperties;
}) {
  return (
    <div style={{ textAlign: align, ...style }}>
      <div
        className="t-eyebrow"
        style={{
          marginBottom: 14,
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            width: 22,
            height: 2,
            background: "var(--color-primary)",
          }}
        />
        {eyebrow}
      </div>
      <h2 style={{ color: "var(--color-on-dark)" }}>{children}</h2>
    </div>
  );
}
