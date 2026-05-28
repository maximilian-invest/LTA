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
};

const sizes: Record<Size, { h: number; pad: string; fs: number }> = {
  md: { h: 46, pad: "0 22px", fs: 13 },
  lg: { h: 58, pad: "0 30px", fs: 15 },
};

export function PrimaryButton({
  children,
  onClick,
  size = "md",
  as = "button",
  href,
}: Props) {
  const { h, pad, fs } = sizes[size];
  const style: CSSProperties = {
    background: "var(--color-primary)",
    color: "var(--color-on-primary)",
    border: "none",
    height: h,
    padding: pad,
    borderRadius: "var(--radius-pill)",
    fontFamily: "var(--font-display)",
    fontWeight: 800,
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
    whileHover: { backgroundColor: "var(--color-primary-active)" },
    whileTap: { scale: 0.985 },
    transition: { duration: 0.15 },
  };

  if (as === "a") {
    return (
      <motion.a href={href} style={style} onClick={onClick as never} {...motionProps}>
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
