# LTA

Tennis Academy

## Deployment

Auto-Deploy zum VPS via GitHub Webhook. Setup-Anleitung: [`scripts/README.md`](scripts/README.md).

Jeder Push auf `claude/cool-ptolemy-KMW1U` triggert automatisch:
`git pull` -> `npm ci` -> `npm run build` -> `pm2 restart`.
