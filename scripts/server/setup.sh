#!/bin/sh
# Install the article generation factory. Run detect.sh first and fix anything it marks [FAIL]. Stops twice on purpose: once for deploy-key registration, once for the API key - which it never writes itself, so the value stays out of shell history and ps. Safe to re-run.

set -eu

REPO_SSH="git@github.com:solarnusantara/solar-nusantara.id.git"
KEY="$HOME/.ssh/solarnusantara_deploy"
CLONE="${SOLAR_NUSANTARA_DIR:-$HOME/solar-nusantara.id}"
ENV_DIR="/etc/solar-nusantara"
ENV_FILE="$ENV_DIR/env"

say() { printf '%s\n' "$*"; }
hr() { say "------------------------------------------------------------"; }
die() { say "ERROR: $*" >&2; exit 1; }

# Privilege mode is chosen from what the account can actually do, not from a flag: system mode (root or passwordless sudo) uses /opt, /etc and systemd; user mode needs no privilege and puts everything under $HOME with cron. SOLAR_NUSANTARA_FORCE_USER_MODE=1 forces the latter.
SUDO=""
PRIV_MODE="user"
if [ "${SOLAR_NUSANTARA_FORCE_USER_MODE:-0}" = "1" ]; then
	PRIV_MODE="user"
elif [ "$(id -u)" = "0" ]; then
	PRIV_MODE="system"
elif command -v sudo >/dev/null 2>&1 && sudo -n true 2>/dev/null; then
	SUDO="sudo"
	PRIV_MODE="system"
fi

if [ "$PRIV_MODE" = "user" ]; then
	# An explicit SOLAR_NUSANTARA_DIR under /opt cannot be created without sudo, so user mode pins its own paths.
	CLONE="$HOME/solar-nusantara.id"
	ENV_DIR="$HOME/.config/solar-nusantara"
	ENV_FILE="$ENV_DIR/env"
fi

hr
say "solar-nusantara.id  -  server setup"
say "mode: $PRIV_MODE   (clone: $CLONE)"
if [ "$PRIV_MODE" = "user" ]; then
	say "  tanpa hak istimewa: sudo meminta password, semuanya di bawah \$HOME"
	say "  penjadwalan lewat crontab user, bukan systemd timer"
fi
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

# Authentication gates everything after this, so stop here rather than failing inside git clone.
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
	# Written WITHOUT the value - the operator pastes it in with an editor, so the key never enters shell history or a process listing.
	$SUDO tee "$ENV_FILE" >/dev/null <<'EOF'
# Diisi manual. Jangan pernah commit file ini.
# Ambil key di https://platform.deepseek.com
DEEPSEEK_API_KEY=

# Tahan publikasi sampai tanggal tertentu (YYYY-MM-DD). Generate tetap jalan.
# Hapus baris ini untuk melepas tahanan - tidak perlu menyentuh penjadwal.
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

# One pipeline at a time: generate and publish both write data/topics.json and push. The kernel drops a flock when its process dies, so a crashed run cannot leave the lock stuck.
LOCK="$CLONE/.pipeline.lock"
if command -v flock >/dev/null 2>&1; then
	FLOCK="$(command -v flock)"
	GEN_LOCK="$FLOCK -n $LOCK "     # lock taken: skip this run, tomorrow's is enough
	PUB_LOCK="$FLOCK -w 3600 $LOCK " # wait up to an hour for a generate in progress, so the day's article is not lost
else
	GEN_LOCK=""
	PUB_LOCK=""
	say "  PERINGATAN: flock tidak ada; generate dan publish bisa berjalan bersamaan"
fi

if [ "$PRIV_MODE" = "system" ] && command -v systemctl >/dev/null 2>&1 && [ -d /run/systemd/system ]; then
	RUN_USER="$(id -un)"

	# Weekly, Monday: the run fills the stock up to 8 drafts (two weeks of publishing), so every Monday morning the next two weeks can be previewed at /pratinjau/.
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
ExecStart=${GEN_LOCK}/bin/sh -c '/usr/bin/git pull --rebase --autostash && exec /usr/bin/env node scripts/generate-article.mjs'
TimeoutStartSec=3600
EOF

	$SUDO tee /etc/systemd/system/solar-nusantara-generate.timer >/dev/null <<'EOF'
[Unit]
Description=Solar Nusantara - refill the draft stock to 8 (Monday)

[Timer]
OnCalendar=Mon *-*-* 02:07:00
Persistent=true
RandomizedDelaySec=30

[Install]
WantedBy=timers.target
EOF

	# Publishing: Tuesday to Friday, one draft per run = four a week.
	$SUDO tee /etc/systemd/system/solar-nusantara-publish.service >/dev/null <<EOF
[Unit]
Description=Solar Nusantara - publish the next draft
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
User=$RUN_USER
WorkingDirectory=$CLONE
EnvironmentFile=$ENV_FILE
ExecStart=${PUB_LOCK}/bin/sh -c '/usr/bin/git pull --rebase --autostash && exec /usr/bin/env node scripts/publish-drip.mjs'
TimeoutStartSec=5400
EOF

	$SUDO tee /etc/systemd/system/solar-nusantara-publish.timer >/dev/null <<'EOF'
[Unit]
Description=Solar Nusantara - publish one article (Tue-Fri)

[Timer]
OnCalendar=Tue..Fri *-*-* 09:23:00
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
	# Install the schedule rather than printing it - a printed crontab is a step somebody has to remember, and a pipeline whose schedule was never installed looks identical to one that is quiet. Tagged lines make a re-run idempotent.
	MARKER="# solar-nusantara-pipeline"
	NODE_BIN="$(command -v node || echo /usr/bin/node)"

	GEN_LINE="7 2 * * 1 cd $CLONE && ${GEN_LOCK}/bin/sh -c 'git pull --rebase --autostash && set -a && . $ENV_FILE && set +a && $NODE_BIN scripts/generate-article.mjs' >> \$HOME/sn-generate.log 2>&1 $MARKER"
	PUB_LINE="23 9 * * 2-5 cd $CLONE && ${PUB_LOCK}/bin/sh -c 'git pull --rebase --autostash && set -a && . $ENV_FILE && set +a && $NODE_BIN scripts/publish-drip.mjs' >> \$HOME/sn-publish.log 2>&1 $MARKER"

	CRON_TMP="$(mktemp)"
	crontab -l 2>/dev/null | grep -vF "$MARKER" > "$CRON_TMP" || true
	printf '%s
%s
' "$GEN_LINE" "$PUB_LINE" >> "$CRON_TMP"
	if crontab "$CRON_TMP"; then
		say "  crontab user terpasang (generate Senin 02:07, publish Selasa-Jumat 09:23)"
		say ""
		crontab -l | grep -F "$MARKER" | sed 's/^/    /' | cut -c1-110
	else
		say "  PERINGATAN: gagal memasang crontab. Pasang manual:"
		say "    crontab -e   lalu tambahkan dua baris dari $CRON_TMP"
	fi
	rm -f "$CRON_TMP"
	say ""
	say "  Log: \$HOME/sn-generate.log dan \$HOME/sn-publish.log"
	say "  (mode user tidak punya journald, jadi log ke file)"
fi

hr
say "Selesai."
say ""
say "Langkah berikutnya, berurutan:"
say "  1. isi DEEPSEEK_API_KEY di $ENV_FILE  (kalau belum)"
say "  2. cd $CLONE && npm run plan-topics"
say "  3. npm run generate -- --dry-run   menulis satu batch di terminal tanpa menyimpan; BACA sekali"
say "  4. npm run publish -- --dry-run   lihat apa yang terbit hari itu (Selasa-Jumat, satu per hari)"
say ""
say "Setelah itu berjalan tanpa campur tangan: generate tiap Senin mengisi drafts/berita/"
say "(sampai 8 draft = 2 minggu), publish memindahkan satu draft ke situs tiap"
say "Selasa-Jumat = 4 per minggu. Tidak ada review manusia; yang menahan artikel buruk"
say "adalah gate mesin (struktur SEO, fakta, tautan keluar, hero) di generate dan publish."
say "Draft yang gagal gate tetap di drafts/berita/ dan dilewati; draft berikutnya terbit."
say ""
say "MENAHAN PUBLIKASI: set PUBLISH_NOT_BEFORE=YYYY-MM-DD di $ENV_FILE."
say "Generate tetap jalan, draft tetap bertambah, tidak ada yang terbit sampai"
say "tanggal itu. Hapus barisnya untuk melepas. Pakai ini saat ada rollout spam"
say "update Google yang sedang berjalan - jendela penerbitan itu variabel nyata."
hr
