"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  style?: CSSProperties;
  className?: string;
  as?: "div" | "section" | "article";
  amount?: number;
};

export function Reveal({
  children,
  delay = 0,
  y = 22,
  style,
  className,
  amount = 0.12,
}: RevealProps) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.62,
        delay,
        ease: [0.2, 0, 0, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={variants}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}
