import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        numbers: ["var(--font-numbers)"],
      },
      colors: {
        primary: "var(--color-primary)",
        "primary-active": "var(--color-primary-active)",
        "on-primary": "var(--color-on-primary)",
        canvas: "var(--color-canvas-dark)",
        "surface-card": "var(--color-surface-card-dark)",
        "surface-elevated": "var(--color-surface-elevated-dark)",
        hairline: "var(--color-hairline-on-dark)",
        body: "var(--color-body)",
        muted: "var(--color-muted)",
        "muted-strong": "var(--color-muted-strong)",
        "on-dark": "var(--color-on-dark)",
        ink: "var(--color-ink)",
      },
    },
  },
  plugins: [],
};
export default config;
