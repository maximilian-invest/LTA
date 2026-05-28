# LTA — Lindenbauer Tennis Academy

Marketing-Website für die [Lindenbauer Tennis Academy](https://lta-tennis.at)
in Hallein, Salzburg.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + CSS-Variablen (Design-Tokens aus `colors_and_type.css`)
- **Framer Motion** für Animationen (Hero-Stagger, Reveal-on-Scroll, Hover-States)
- **lucide-react** für Icons
- **Canvas 2D** für das interaktive Rally-Game

## Entwicklung

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run start     # production server (PORT env, default 3030)
```

## Deployment

Auto-Deploy zum VPS via GitHub Webhook. Setup-Anleitung: [`scripts/README.md`](scripts/README.md).

Jeder Push auf den Deploy-Branch triggert automatisch:
`git pull` → `npm ci` → `npm run build` → `pm2 restart`.
