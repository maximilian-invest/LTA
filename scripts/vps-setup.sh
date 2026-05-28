#!/usr/bin/env bash
# ============================================================
# LTA - VPS Setup Script (Ubuntu/Debian)
# ------------------------------------------------------------
# Was es tut:
#   1. Installiert Node.js 20, git, nginx, pm2, webhook
#   2. Legt einen System-User "lta" an
#   3. Erstellt einen SSH Deploy Key fuer GitHub (read-only)
#   4. Klont das Repo nach /opt/lta
#   5. Richtet einen Webhook-Listener auf Port 9000 ein,
#      der bei jedem GitHub-Push automatisch:
#         - git pull
#         - npm ci  (falls package.json)
#         - npm run build  (falls Script vorhanden)
#         - pm2 restart  (falls App laeuft)
#   6. Aktiviert systemd-Service "lta-webhook"
#
# Voraussetzungen:
#   - Ubuntu 20.04 / 22.04 / 24.04 oder Debian 11 / 12
#   - root oder sudo
#   - Offener Port 9000 (Webhook) und 3000 (App, optional)
#
# Verwendung:
#   sudo bash vps-setup.sh
# ============================================================

set -euo pipefail

# === Konfiguration =========================================
APP_USER="${APP_USER:-lta}"
APP_DIR="${APP_DIR:-/opt/lta}"
GITHUB_REPO_SSH="${GITHUB_REPO_SSH:-git@github.com:maximilian-invest/LTA.git}"
GIT_BRANCH="${GIT_BRANCH:-claude/cool-ptolemy-KMW1U}"
WEBHOOK_PORT="${WEBHOOK_PORT:-9000}"
APP_PORT="${APP_PORT:-3000}"
NODE_MAJOR="${NODE_MAJOR:-20}"
# ===========================================================

log() { printf "\n\033[1;32m==>\033[0m %s\n" "$*"; }
warn() { printf "\n\033[1;33m[!]\033[0m %s\n" "$*"; }
die() { printf "\n\033[1;31m[x]\033[0m %s\n" "$*" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || die "Bitte als root ausfuehren: sudo bash $0"

# --- Webhook-Secret generieren (oder vorhandenes lesen) ----
SECRET_FILE="/etc/lta/webhook.secret"
mkdir -p /etc/lta
if [ ! -f "$SECRET_FILE" ]; then
  openssl rand -hex 32 > "$SECRET_FILE"
  chmod 600 "$SECRET_FILE"
fi
WEBHOOK_SECRET="$(cat "$SECRET_FILE")"

# --- Pakete installieren -----------------------------------
log "Aktualisiere apt-Cache..."
apt-get update -qq

log "Installiere Basis-Pakete..."
DEBIAN_FRONTEND=noninteractive apt-get install -y -qq \
  curl ca-certificates gnupg git ufw jq webhook

# --- Node.js installieren ----------------------------------
if ! command -v node >/dev/null 2>&1 || ! node -v | grep -q "v$NODE_MAJOR"; then
  log "Installiere Node.js $NODE_MAJOR..."
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
  DEBIAN_FRONTEND=noninteractive apt-get install -y -qq nodejs
fi

# --- pm2 global installieren -------------------------------
if ! command -v pm2 >/dev/null 2>&1; then
  log "Installiere pm2..."
  npm install -g pm2
fi

# --- App-User anlegen --------------------------------------
if ! id "$APP_USER" >/dev/null 2>&1; then
  log "Lege System-User '$APP_USER' an..."
  useradd -m -s /bin/bash "$APP_USER"
fi

# --- App-Verzeichnis vorbereiten ---------------------------
mkdir -p "$APP_DIR"
chown -R "$APP_USER:$APP_USER" "$APP_DIR"

# --- SSH Deploy Key fuer GitHub ----------------------------
SSH_DIR="/home/$APP_USER/.ssh"
KEY_FILE="$SSH_DIR/id_ed25519"

sudo -u "$APP_USER" bash -c "
  mkdir -p '$SSH_DIR' && chmod 700 '$SSH_DIR'
  if [ ! -f '$KEY_FILE' ]; then
    ssh-keygen -t ed25519 -N '' -f '$KEY_FILE' -C 'lta-vps-deploy'
  fi
  touch '$SSH_DIR/known_hosts'
  if ! grep -q 'github.com' '$SSH_DIR/known_hosts'; then
    ssh-keyscan -t ed25519,rsa github.com >> '$SSH_DIR/known_hosts' 2>/dev/null || true
  fi
  chmod 600 '$SSH_DIR/known_hosts'
"

# --- Webhook-Handler-Script ablegen ------------------------
cat > /opt/lta-deploy.sh <<'DEPLOY_EOF'
#!/usr/bin/env bash
# Wird vom webhook-Service bei jedem GitHub-Push aufgerufen.
set -euo pipefail
exec >> /var/log/lta-deploy.log 2>&1
echo "----- $(date -Is) - Deploy gestartet -----"

cd /opt/lta

# Branch ggf. wechseln (falls noetig)
BRANCH="${GIT_BRANCH:-claude/cool-ptolemy-KMW1U}"
git fetch --all --prune
git checkout "$BRANCH"
git reset --hard "origin/$BRANCH"

# Dependencies installieren, falls package.json existiert
if [ -f package.json ]; then
  echo "[deploy] Installiere npm-Dependencies..."
  npm ci --no-audit --no-fund || npm install --no-audit --no-fund

  # Build, falls "build"-Script vorhanden
  if jq -e '.scripts.build' package.json >/dev/null 2>&1; then
    echo "[deploy] npm run build..."
    npm run build
  fi

  # Start/Restart via pm2, falls "start"-Script vorhanden
  if jq -e '.scripts.start' package.json >/dev/null 2>&1; then
    if pm2 describe lta >/dev/null 2>&1; then
      echo "[deploy] pm2 restart lta"
      pm2 restart lta --update-env
    else
      echo "[deploy] pm2 start lta"
      PORT="${APP_PORT:-3000}" pm2 start npm --name lta -- start
      pm2 save
    fi
  fi
else
  echo "[deploy] Noch keine package.json - skip build/start."
fi

echo "----- $(date -Is) - Deploy fertig -----"
DEPLOY_EOF
chmod +x /opt/lta-deploy.sh
chown "$APP_USER:$APP_USER" /opt/lta-deploy.sh

# --- webhook-Konfiguration (hooks.json) --------------------
mkdir -p /etc/webhook
cat > /etc/webhook/hooks.json <<HOOK_EOF
[
  {
    "id": "lta-deploy",
    "execute-command": "/opt/lta-deploy.sh",
    "command-working-directory": "$APP_DIR",
    "response-message": "Deploy gestartet.",
    "pass-environment-to-command": [
      { "source": "string", "envname": "GIT_BRANCH", "name": "$GIT_BRANCH" },
      { "source": "string", "envname": "APP_PORT", "name": "$APP_PORT" }
    ],
    "trigger-rule": {
      "and": [
        {
          "match": {
            "type": "payload-hmac-sha256",
            "secret": "$WEBHOOK_SECRET",
            "parameter": { "source": "header", "name": "X-Hub-Signature-256" }
          }
        },
        {
          "match": {
            "type": "value",
            "value": "refs/heads/$GIT_BRANCH",
            "parameter": { "source": "payload", "name": "ref" }
          }
        }
      ]
    }
  }
]
HOOK_EOF
chmod 640 /etc/webhook/hooks.json

# --- systemd Service fuer webhook --------------------------
cat > /etc/systemd/system/lta-webhook.service <<UNIT_EOF
[Unit]
Description=LTA GitHub Webhook Listener
After=network.target

[Service]
Type=simple
User=$APP_USER
ExecStart=/usr/bin/webhook -hooks /etc/webhook/hooks.json -port $WEBHOOK_PORT -verbose
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
UNIT_EOF

# webhook-User braucht Lesezugriff auf hooks.json
chown root:"$APP_USER" /etc/webhook/hooks.json

# Log-Datei vorbereiten
touch /var/log/lta-deploy.log
chown "$APP_USER:$APP_USER" /var/log/lta-deploy.log

systemctl daemon-reload
systemctl enable --now lta-webhook.service

# --- Firewall: Port oeffnen --------------------------------
if command -v ufw >/dev/null 2>&1; then
  if ufw status | grep -q "Status: active"; then
    log "Oeffne Ports in ufw..."
    ufw allow "$WEBHOOK_PORT/tcp" || true
    ufw allow "$APP_PORT/tcp" || true
  fi
fi

# --- Erstes Clone (falls noch leer) ------------------------
if [ ! -d "$APP_DIR/.git" ]; then
  warn "Repo noch nicht geklont - das passiert beim ersten Webhook."
  warn "Du kannst es auch manuell anstossen:"
  warn "  sudo -u $APP_USER git clone -b $GIT_BRANCH $GITHUB_REPO_SSH $APP_DIR"
fi

# --- Fertig: Ausgabe der naechsten Schritte ----------------
PUBKEY="$(cat "$KEY_FILE.pub")"
PUBIP="$(curl -fsSL https://api.ipify.org 2>/dev/null || echo 'DEINE-VPS-IP')"

cat <<INFO_EOF

============================================================
  LTA VPS-Setup fertig.
============================================================

  Webhook-URL (in GitHub eintragen):
    http://$PUBIP:$WEBHOOK_PORT/hooks/lta-deploy

  Webhook-Secret (in GitHub eintragen):
    $WEBHOOK_SECRET

  Deploy Key (in GitHub als Deploy Key adden, RO reicht):
    $PUBKEY

------------------------------------------------------------
  GitHub-Setup (im Browser):

  1) Repo -> Settings -> Deploy keys -> "Add deploy key"
     Title: "VPS Production"
     Key:   (siehe oben)
     [ ] Allow write access  (NICHT noetig)

  2) Repo -> Settings -> Webhooks -> "Add webhook"
     Payload URL:   http://$PUBIP:$WEBHOOK_PORT/hooks/lta-deploy
     Content type:  application/json
     Secret:        (siehe oben)
     SSL:           Disable (oder spaeter mit Caddy/nginx-TLS)
     Events:        Just the push event

------------------------------------------------------------
  Logs anschauen:
    sudo journalctl -u lta-webhook -f
    sudo tail -f /var/log/lta-deploy.log

  Manueller Deploy:
    sudo -u $APP_USER /opt/lta-deploy.sh

============================================================
INFO_EOF
