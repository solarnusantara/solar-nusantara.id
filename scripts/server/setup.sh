#!/bin/sh
# Install the article generation factory on the server.
#
#   sh scripts/server/setup.sh
#
# Run scripts/server/detect.sh FIRST and fix anything it marks [FAIL].
#
# What this does:
#   1. creates a deploy key, and stops so you can register it on GitHub
#   2. clones the repo over SSH once the key is registered
#   3. writes /etc/solar-nusantara/env for the API key, mode 600
#   4. installs systemd timers (or prints crontab lines if systemd is absent)
#
# What it deliberately does NOT do:
#   - it never writes the API key itself. You paste it into the env file with
#     your own editor, so the value never appears in shell history, in this
#     script, or in a process listing.
#   - it never force-pushes, never touches main's history, and never publishes.
#     Publishing is publish-drip.mjs, gated on both content checks.
#
# Safe to re-run. Every step checks whether it has already been done.

set -eu

REPO_SSH="git@github.com:solarnusantara/solar-nusantara.id.git"
KEY="$HOME/.ssh/solarnusantara_deploy"
CLONE="${SOLAR_NUSANTARA_DIR:-$HOME/solar-nusantara.id}"
ENV_DIR="/etc/solar-nusantara"
ENV_FILE="$ENV_DIR/env"

say() { printf '%s\n' "$*"; }
hr() { say "------------------------------------------------------------"; }
die() { say "ERROR: $*" >&2; exit 1; }

SUDO=""
if [ "$(id -u)" != "0" ]; then
	command -v sudo >/dev/null 2>&1 && SUDO="sudo"
fi

hr
say "solar-nusantara.id  -  server setup"
hr

# --- 1. deploy key ----------------------------------------------------------
say ""
say "[1/4] Deploy key"
if [ -f "$KEY" ]; then
	say "  sudah ada: $KEY"
else
	ssh-keygen -t ed25519 -C "solar-nusantara-bot@$(hostname)" -f "$KEY" -N "" -q
	say "  dibuat: $KEY"
fi

# Pin the key to github.com so git uses it without any per-command flag.
mkdir -p "$HOME/.ssh"
chmod 700 "$HOME/.ssh"
if ! grep -q "solarnusantara_deploy" "$HOME/.ssh/config" 2>/dev/null; then
	cat >> "$HOME/.ssh/config" <<EOF

Host github.com
	HostName github.com
	User git
	IdentityFile $KEY
	IdentitiesOnly yes
EOF
	chmod 600 "$HOME/.ssh/config"
	say "  ~/.ssh/config diperbarui"
else
	say "  ~/.ssh/config sudah mengarah ke key ini"
fi

# Authentication is the gate for everything after this, so stop here until the
# public key is actually registered rather than failing later inside git clone.
if ! ssh -o StrictHostKeyChecking=accept-new -T git@github.com 2>&1 | grep -q "successfully authenticated"; then
	hr
	say "BERHENTI: deploy key belum terdaftar di GitHub."
	say ""
	say "Salin baris di bawah ini SELURUHNYA:"
	say ""
	cat "$KEY.pub"
	say ""
	say "Lalu buka:"
	say "  https://github.com/solarnusantara/solar-nusantara.id/settings/keys"
	say "  -> Add deploy key"
	say "  -> Title: server-generator"
	say "  -> Key: tempel baris di atas"
	say "  -> CENTANG \"Allow write access\"   <-- wajib, tanpa ini push ditolak"
	say ""
	say "Setelah itu jalankan ulang skrip ini."
	hr
	exit 0
fi
say "  GitHub mengenali key ini"

# --- 2. clone ---------------------------------------------------------------
say ""
say "[2/4] Repo"
if [ -d "$CLONE/.git" ]; then
	say "  sudah ada: $CLONE"
	git -C "$CLONE" remote set-url origin "$REPO_SSH"
	git -C "$CLONE" fetch --quiet origin || die "fetch gagal"
	say "  remote dipastikan SSH, fetch ok"
else
	git clone --quiet "$REPO_SSH" "$CLONE" || die "clone gagal"
	say "  di-clone ke $CLONE"
fi

# A bot commit must be distinguishable from a human commit in `git log`.
git -C "$CLONE" config user.name "Solar Nusantara Bot"
git -C "$CLONE" config user.email "bot@solar-nusantara.id"

if [ -f "$CLONE/package.json" ]; then
	say "  npm ci ..."
	( cd "$CLONE" && npm ci --silent ) || die "npm ci gagal"
	say "  dependensi terpasang"
fi

# --- 3. secret --------------------------------------------------------------
say ""
say "[3/4] API key"
$SUDO mkdir -p "$ENV_DIR"
if [ -f "$ENV_FILE" ]; then
	say "  sudah ada: $ENV_FILE (tidak ditimpa)"
else
	# Written WITHOUT the value. The operator pastes it in with an editor, so the
	# key never enters shell history or a process listing.
	$SUDO tee "$ENV_FILE" >/dev/null <<'EOF'
# Diisi manual. Jangan pernah commit file ini.
# Ambil key di https://platform.deepseek.com
DEEPSEEK_API_KEY=

# Tahan publikasi sampai tanggal tertentu (YYYY-MM-DD). Generate tetap jalan.
# Hapus baris ini untuk melepas tahanan - tidak perlu menyentuh systemd unit.
# Berguna saat ada rollout spam update Google yang sedang berjalan.
# PUBLISH_NOT_BEFORE=2026-10-08
EOF
	$SUDO chmod 600 "$ENV_FILE"
	say "  template dibuat: $ENV_FILE (mode 600)"
	say "  ISI SEKARANG:  $SUDO \${EDITOR:-nano} $ENV_FILE"
fi

if ! $SUDO grep -q '^DEEPSEEK_API_KEY=.\+' "$ENV_FILE" 2>/dev/null; then
	say "  PERINGATAN: DEEPSEEK_API_KEY masih kosong. Isi dulu sebelum timer jalan."
fi

# --- 4. scheduler -----------------------------------------------------------
say ""
say "[4/4] Penjadwal"

if command -v systemctl >/dev/null 2>&1 && [ -d /run/systemd/system ] && [ -n "$SUDO$( [ "$(id -u)" = 0 ] && echo root )" ]; then
	RUN_USER="$(id -un)"

	# Generation: hourly, small batches. Small batches on a short interval beat
	# one nightly bulk run - a bad prompt shows up within the hour instead of
	# after 200 articles, and a transient API failure costs one batch.
	$SUDO tee /etc/systemd/system/solar-nusantara-generate.service >/dev/null <<EOF
[Unit]
Description=Solar Nusantara - generate article drafts
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
User=$RUN_USER
WorkingDirectory=$CLONE
EnvironmentFile=$ENV_FILE
ExecStart=/usr/bin/env node scripts/generate-article.mjs --limit 4 --wave 1
TimeoutStartSec=3600
EOF

	$SUDO tee /etc/systemd/system/solar-nusantara-generate.timer >/dev/null <<'EOF'
[Unit]
Description=Solar Nusantara - hourly draft generation

[Timer]
OnCalendar=*-*-* *:07:00
Persistent=true
RandomizedDelaySec=300

[Install]
WantedBy=timers.target
EOF

	# Publishing: once a day, and only what a human put in data/approved.txt.
	$SUDO tee /etc/systemd/system/solar-nusantara-publish.service >/dev/null <<EOF
[Unit]
Description=Solar Nusantara - publish approved drafts
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
User=$RUN_USER
WorkingDirectory=$CLONE
EnvironmentFile=$ENV_FILE
ExecStartPre=/usr/bin/git pull --rebase --autostash
ExecStart=/usr/bin/env node scripts/publish-drip.mjs --auto --limit 12
TimeoutStartSec=1800
EOF

	$SUDO tee /etc/systemd/system/solar-nusantara-publish.timer >/dev/null <<'EOF'
[Unit]
Description=Solar Nusantara - daily drip publish

[Timer]
OnCalendar=*-*-* 09:23:00
Persistent=true
RandomizedDelaySec=900

[Install]
WantedBy=timers.target
EOF

	$SUDO systemctl daemon-reload
	$SUDO systemctl enable --now solar-nusantara-generate.timer solar-nusantara-publish.timer
	say "  systemd timer terpasang dan aktif"
	say ""
	$SUDO systemctl list-timers 'solar-nusantara-*' --no-pager 2>/dev/null || true
else
	say "  systemd tidak tersedia (atau tanpa akses root). Tambahkan ke crontab:"
	say ""
	say "    crontab -e"
	say ""
	say "  7 * * * * cd $CLONE && set -a && . $ENV_FILE && set +a && node scripts/generate-article.mjs --limit 4 --wave 1 >> \$HOME/sn-generate.log 2>&1"
	say " 23 9 * * * cd $CLONE && git pull --rebase --autostash && set -a && . $ENV_FILE && set +a && node scripts/publish-drip.mjs --auto --limit 12 >> \$HOME/sn-publish.log 2>&1"
fi

hr
say "Selesai."
say ""
say "Langkah berikutnya, berurutan:"
say "  1. isi DEEPSEEK_API_KEY di $ENV_FILE  (kalau belum)"
say "  2. cd $CLONE && npm run plan-topics"
say "  3. npm run generate -- --limit 1   lalu BACA hasilnya sendiri, sekali saja"
say "  4. npm run publish -- --auto --dry-run   lihat apa yang akan terbit"
say "  5. npm run publish -- --auto --limit 1   artikel pertama, sungguhan"
say ""
say "Setelah itu berjalan tanpa campur tangan: generate tiap jam, terbit 12/hari."
say "Yang menahan artikel buruk adalah tiga gate mesin - struktur, penulisan, dan"
say "fakta - plus pemutus arus yang MENGHENTIKAN publikasi kalau kurang dari 60%"
say "draft lolos bersih. Kegagalan sistemik berhenti sendiri, tidak terbit 1000 kali."
say ""
say "Satu artikel dari tiap 10 dicatat di data/spotcheck.log. Itu bukan gerbang,"
say "hanya contoh untuk dibaca sewaktu-waktu - gate tidak bisa menilai apakah"
say "sebuah artikel layak dikirim ke calon klien."
say ""
say "MENAHAN PUBLIKASI: set PUBLISH_NOT_BEFORE=YYYY-MM-DD di $ENV_FILE."
say "Generate tetap jalan, draft tetap bertambah, tidak ada yang terbit sampai"
say "tanggal itu. Hapus barisnya untuk melepas. Pakai ini saat ada rollout spam"
say "update Google yang sedang berjalan - jendela penerbitan itu variabel nyata."
hr
