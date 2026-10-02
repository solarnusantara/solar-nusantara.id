#!/bin/sh
# Report what this server can actually run, before anything is installed. Read-only: reads versions and checks outbound connectivity, installs nothing, writes nothing, never prints a secret. Usage: ssh user@server 'sh -s' < scripts/server/detect.sh

say() { printf '%s\n' "$*"; }
hr()  { say "------------------------------------------------------------"; }

ok=0
fail=0
warn=0

check() { # check <label> <value> <verdict: PASS|FAIL|WARN> [note]
	printf '  %-22s %-28s [%s]' "$1" "$2" "$3"
	[ -n "$4" ] && printf ' %s' "$4"
	printf '\n'
	case "$3" in
		PASS) ok=$((ok + 1)) ;;
		FAIL) fail=$((fail + 1)) ;;
		WARN) warn=$((warn + 1)) ;;
	esac
}

hr
say "solar-nusantara.id  -  server capability report"
say "generated: $(date -u '+%Y-%m-%d %H:%M UTC')"
hr

# --- identity ---------------------------------------------------------------
say ""
say "IDENTITAS"
if [ -r /etc/os-release ]; then
	. /etc/os-release
	check "OS" "${PRETTY_NAME:-unknown}" "PASS"
else
	check "OS" "$(uname -s) $(uname -r)" "WARN" "no /etc/os-release"
fi
check "Arsitektur" "$(uname -m)" "PASS"
check "Hostname" "$(hostname 2>/dev/null || echo unknown)" "PASS"
check "User" "$(id -un 2>/dev/null || echo unknown)" "PASS"

# The single hard requirement: Astro 5 needs Node >= 20, and node:sqlite lands in 22.
say ""
say "NODE.JS  (wajib >= 20)"
if command -v node >/dev/null 2>&1; then
	nv=$(node --version 2>/dev/null)
	major=$(printf '%s' "$nv" | sed 's/^v//' | cut -d. -f1)
	if [ "${major:-0}" -ge 22 ] 2>/dev/null; then
		check "node" "$nv" "PASS" "node:sqlite tersedia"
	elif [ "${major:-0}" -ge 20 ] 2>/dev/null; then
		check "node" "$nv" "WARN" "cukup untuk Astro; pipeline pakai JSON, bukan node:sqlite"
	else
		check "node" "$nv" "FAIL" "terlalu lama, butuh >= 20"
	fi
else
	check "node" "tidak terpasang" "FAIL" "pasang Node 22 LTS"
fi
command -v npm >/dev/null 2>&1 \
	&& check "npm" "$(npm --version 2>/dev/null)" "PASS" \
	|| check "npm" "tidak terpasang" "FAIL"

# --- git --------------------------------------------------------------------
say ""
say "GIT"
command -v git >/dev/null 2>&1 \
	&& check "git" "$(git --version 2>/dev/null | awk '{print $3}')" "PASS" \
	|| check "git" "tidak terpasang" "FAIL" "wajib: pipeline push lewat git"
command -v ssh >/dev/null 2>&1 \
	&& check "ssh client" "ada" "PASS" \
	|| check "ssh client" "tidak ada" "FAIL" "wajib untuk deploy key"

# systemd timers are preferred - they log to the journal, survive reboot, and carry EnvironmentFile so the key never sits in a crontab line.
say ""
say "PENJADWAL"
if command -v systemctl >/dev/null 2>&1 && [ -d /run/systemd/system ]; then
	check "systemd" "aktif" "PASS" "pakai systemd timer (disarankan)"
elif command -v crontab >/dev/null 2>&1; then
	check "systemd" "tidak aktif" "WARN" "fallback ke cron"
	check "crontab" "ada" "PASS"
else
	check "penjadwal" "tidak ditemukan" "FAIL" "tidak ada systemd maupun cron"
fi

# --- privilege --------------------------------------------------------------
say ""
say "HAK AKSES"
if [ "$(id -u)" = "0" ]; then
	check "sudo/root" "root" "PASS"
elif command -v sudo >/dev/null 2>&1 && sudo -n true 2>/dev/null; then
	check "sudo/root" "sudo tanpa password" "PASS"
elif command -v sudo >/dev/null 2>&1; then
	check "sudo/root" "sudo perlu password" "WARN" "systemd unit perlu dipasang manual"
else
	check "sudo/root" "tidak ada sudo" "WARN" "pakai systemd --user atau cron user"
fi

# Generation is network-bound, not CPU-bound; the floor that matters is disk for node_modules plus a full build.
say ""
say "SUMBER DAYA"
if [ -r /proc/meminfo ]; then
	memkb=$(awk '/^MemTotal:/{print $2}' /proc/meminfo)
	memmb=$((memkb / 1024))
	[ "$memmb" -ge 1024 ] \
		&& check "RAM" "${memmb} MB" "PASS" \
		|| check "RAM" "${memmb} MB" "WARN" "build 1000 artikel bisa berat"
fi
availmb=$(df -Pm . 2>/dev/null | awk 'NR==2{print $4}')
if [ -n "$availmb" ]; then
	[ "$availmb" -ge 3072 ] \
		&& check "Disk bebas" "${availmb} MB" "PASS" \
		|| check "Disk bebas" "${availmb} MB" "WARN" "sediakan >= 3 GB"
fi

# Both are mandatory - a server behind an egress firewall fails here rather than halfway through the first run.
say ""
say "KONEKTIVITAS KELUAR"
if command -v curl >/dev/null 2>&1; then
	code=$(curl -s -o /dev/null -w '%{http_code}' -m 15 https://api.deepseek.com/models 2>/dev/null)
	# 401 is the healthy unauthenticated answer: reachable, key simply not sent.
	case "$code" in
		200|401) check "api.deepseek.com" "HTTP $code" "PASS" "terjangkau" ;;
		000)     check "api.deepseek.com" "tidak terjangkau" "FAIL" "diblokir firewall keluar?" ;;
		*)       check "api.deepseek.com" "HTTP $code" "WARN" ;;
	esac

	code=$(curl -s -o /dev/null -w '%{http_code}' -m 15 https://github.com 2>/dev/null)
	case "$code" in
		200|301|302) check "github.com (https)" "HTTP $code" "PASS" ;;
		000)         check "github.com (https)" "tidak terjangkau" "FAIL" ;;
		*)           check "github.com (https)" "HTTP $code" "WARN" ;;
	esac
else
	check "curl" "tidak terpasang" "FAIL" "wajib untuk panggil API"
fi

# GitHub always refuses the shell, so exit 1 with "successfully authenticated" is the expected success shape.
if command -v ssh >/dev/null 2>&1; then
	out=$(ssh -o StrictHostKeyChecking=accept-new -o ConnectTimeout=15 -T git@github.com 2>&1)
	case "$out" in
		*successfully\ authenticated*) check "github.com (ssh 22)" "key sudah dikenali" "PASS" ;;
		*Permission\ denied*)          check "github.com (ssh 22)" "port terbuka, key belum ada" "PASS" "normal sebelum deploy key dipasang" ;;
		*)                             check "github.com (ssh 22)" "tidak terjangkau" "WARN" "port 22 diblokir? pakai ssh.github.com:443" ;;
	esac
fi

# --- existing state ---------------------------------------------------------
say ""
say "KONDISI SAAT INI"
[ -d /etc/solar-nusantara ] \
	&& check "/etc/solar-nusantara" "sudah ada" "WARN" "setup pernah dijalankan" \
	|| check "/etc/solar-nusantara" "belum ada" "PASS" "instalasi bersih"
[ -d "$HOME/solar-nusantara.id/.git" ] \
	&& check "repo clone" "sudah ada" "WARN" "akan dipakai ulang" \
	|| check "repo clone" "belum ada" "PASS"

# --- verdict ----------------------------------------------------------------
hr
say "RINGKASAN:  $ok lolos  /  $warn peringatan  /  $fail gagal"
hr
if [ "$fail" -gt 0 ]; then
	say ""
	say "Ada $fail syarat wajib yang belum terpenuhi. Perbaiki yang bertanda"
	say "[FAIL] di atas sebelum menjalankan scripts/server/setup.sh."
	say "Kirimkan seluruh output ini kembali supaya arsitekturnya disesuaikan."
	exit 1
fi
say ""
say "Server siap. Langkah berikutnya: scripts/server/setup.sh"
[ "$warn" -gt 0 ] && say "Baca dulu $warn peringatan di atas - tidak memblokir, tapi mempengaruhi pilihan."
exit 0
