"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView } from "framer-motion";

type Props = {
  value: string;
  duration?: number;
  className?: string;
  style?: CSSProperties;
};

export function CountUp({ value, duration = 1200, className, style }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const m = String(value).match(/^(\D*)([\d.,]+)(.*)$/);
  const pre = m?.[1] ?? "";
  const numStr = m?.[2] ?? null;
  const post = m?.[3] ?? "";
  const target = numStr !== null ? parseFloat(numStr.replace(",", ".")) : NaN;
  const decimals = numStr && numStr.includes(",") ? (numStr.split(",")[1] ?? "").length : 0;

  const [disp, setDisp] = useState<string>(
    isNaN(target) ? value : `${pre}0${post}`
  );

  useEffect(() => {
    if (isNaN(target)) {
      setDisp(value);
      return;
    }
    if (!inView) return;

    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = target * eased;
      const txt = decimals
        ? cur.toFixed(decimals).replace(".", ",")
        : Math.round(cur).toString();
      setDisp(pre + txt + post);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, pre, post, decimals, value]);

  return (
    <span ref={ref} className={className} style={style}>
      {disp}
    </span>
  );
}
