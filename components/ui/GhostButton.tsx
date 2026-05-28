"use client";

import { motion } from "framer-motion";
import type { CSSProperties, MouseEvent, ReactNode } from "react";

type Size = "md" | "lg";
type Props = {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  size?: Size;
  as?: "button" | "a";
  href?: string;
  newTab?: boolean;
};

const sizes: Record<Size, { h: number; pad: string; fs: number }> = {
  md: { h: 46, pad: "0 20px", fs: 13 },
  lg: { h: 58, pad: "0 26px", fs: 15 },
};

export function GhostButton({
  children,
  onClick,
  size = "md",
  as = "button",
  href,
  newTab = false,
}: Props) {
  const { h, pad, fs } = sizes[size];
  const style: CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    color: "var(--color-on-dark)",
    border: "1px solid rgba(255,255,255,0.22)",
    height: h,
    padding: pad,
    borderRadius: "var(--radius-pill)",
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: fs,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 9,
    textDecoration: "none",
    whiteSpace: "nowrap",
  };

  const motionProps = {
    whileHover: {
      borderColor: "var(--color-primary)",
      backgroundColor: "rgba(212,255,58,0.06)",
    },
    transition: { duration: 0.16 },
  };

  if (as === "a") {
    return (
      <motion.a
        href={href}
        style={style}
        onClick={onClick as never}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noreferrer" : undefined}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button style={style} onClick={onClick as never} {...motionProps}>
      {children}
    </motion.button>
  );
}
