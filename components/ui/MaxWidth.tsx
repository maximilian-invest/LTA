import { CSSProperties, ReactNode } from "react";

export const MAXW = 1280;

export function MaxWidth({
  children,
  style,
  className,
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{ maxWidth: MAXW, margin: "0 auto", padding: "0 24px", ...style }}
    >
      {children}
    </div>
  );
}
