# LTA - Deploy Scripts

## `vps-setup.sh`

Einmaliges Setup-Script fuer den VPS. Richtet einen Auto-Deploy via
GitHub-Webhook ein:

- Installiert Node.js 20, git, pm2, webhook
- Legt System-User `lta` an
- Erstellt SSH Deploy Key fuer GitHub
- Klont das Repo nach `/opt/lta`
- Webhook-Listener auf Port 9000, der bei jedem Push automatisch
  pullt, baut und neu startet

### Verwendung

Auf dem VPS als root:

```bash
# Script holen (eine der drei Varianten):

# Variante A: Datei direkt aus dem Repo holen (wenn Repo bereits geklont)
sudo bash /opt/lta/scripts/vps-setup.sh

# Variante B: Per curl von GitHub (wenn Repo public)
curl -fsSL https://raw.githubusercontent.com/maximilian-invest/LTA/claude/cool-ptolemy-KMW1U/scripts/vps-setup.sh -o /tmp/vps-setup.sh
sudo bash /tmp/vps-setup.sh

# Variante C: Inhalt manuell kopieren
sudo nano /tmp/vps-setup.sh   # einfuegen, speichern
sudo bash /tmp/vps-setup.sh
```

### Konfiguration

Per Environment-Variablen anpassbar:

| Variable | Default | Beschreibung |
|---|---|---|
| `APP_USER` | `lta` | System-User fuer die App |
| `APP_DIR` | `/opt/lta` | Verzeichnis des Repos |
| `GITHUB_REPO_SSH` | `git@github.com:maximilian-invest/LTA.git` | Git-URL (SSH) |
| `GIT_BRANCH` | `claude/cool-ptolemy-KMW1U` | Branch, der deployed wird |
| `WEBHOOK_PORT` | `9000` | Port fuer den Webhook-Listener |
| `APP_PORT` | `3000` | Port der Next.js-App |
| `NODE_MAJOR` | `20` | Major-Version von Node.js |

Beispiel: anderen Branch und Port verwenden:

```bash
sudo GIT_BRANCH=main APP_PORT=8080 bash vps-setup.sh
```

### Nach dem Setup

Das Script gibt am Ende aus:

- **Deploy Key** -> in GitHub unter *Settings -> Deploy keys* eintragen
- **Webhook-URL + Secret** -> in GitHub unter *Settings -> Webhooks* eintragen

Danach loest jeder `git push` auf den konfigurierten Branch automatisch
ein Deploy aus.

### Logs

```bash
sudo journalctl -u lta-webhook -f       # Webhook-Listener
sudo tail -f /var/log/lta-deploy.log    # Deploys
```

### Manueller Deploy

```bash
sudo -u lta /opt/lta-deploy.sh
```
