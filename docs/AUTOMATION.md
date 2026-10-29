# Otomatisasi artikel: dari topik sampai tayang

Cara kerja pabrik artikel di server dan ritme terbitnya. Pasar yang dituju dibahas di
`docs/MARKET.md`.

Diperbarui 2026-10-29. Perubahan dari versi sebelumnya: **ada review manusia lagi** di antara
generate dan publish (bagian 2b). Artikel harus lolos gate mesin *dan* disetujui reviewer di
ERPSonus sebelum terbit, empat per minggu. Draft tinggal di folder tersendiri, `drafts/berita/`.

---

## 1. Hal pertama yang harus diluruskan

**Situs ini tidak berjalan di server Anda.**

`solar-nusantara.id` dilayani **GitHub Pages** di balik Cloudflare. Buktinya ada di
header responsnya (`x-github-request-id`) dan di `.github/workflows/deploy.yml`, yang
membangun situs dengan `withastro/action@v5` setiap kali ada push ke `main`.

Konsekuensinya: **menaruh file artikel di server tidak menerbitkan apa pun.** Satu-satunya
jalur terbit adalah

```
commit ke repo  ->  GitHub Actions build  ->  GitHub Pages  ->  Cloudflare
```

Server menjalankan **pabrik generasinya**: memanggil API, menyimpan state, dan menjadwalkan.

| Tempat | Tugas |
|---|---|
| Server SSH | generate draft, simpan state, terbitkan satu per hari, commit, push |
| GitHub | sumber kebenaran, pemicu build |
| GitHub Pages | melayani situs |

Laptop Anda tidak punya peran di jalur ini. Ia hanya dipakai untuk menyiapkan
perpustakaan ilustrasi (bagian 5) dan menjalankan `plan-topics`.

---

## 2. Ritme mingguan

```
generate (Senin 02:07)    mengisi drafts/berita/ sampai 8 draft (2 minggu terbitan)
publish  (Selasa-Jumat    memindahkan SATU draft ke src/content/berita/,
          09:23)          commit + push  ->  Actions membangun situs
```

```
topik pending -> draft di drafts/berita/ -> artikel di src/content/berita/
   generate            publish
```

Empat terbit per minggu, satu per hari kerja Selasa sampai Jumat. Di antara generate dan
publish ada review manusia (2b).

Dua hal membuat ritme ini bertahan sendiri:

- **Generate tidak mendahului publish lebih dari dua minggu.** Generate berjalan tiap Senin
  02:07 dan hanya menulis kekurangan stok sampai **8 draft**: 8 pada run pertama, lalu 4 per
  minggu (yang terbit Selasa-Jumat). Jadi setiap Senin pagi, artikel dua minggu ke depan sudah
  ada sebagai draft dan bisa dilihat di `/pratinjau/` untuk laporan rencana artikel.
  Kalau run Senin gagal (API sibuk, saldo habis), tidak ada run lain sampai Senin berikutnya:
  jalankan `npm run generate` sekali secara manual di server.
- **Satu artikel per run.** `publish-drip` mengambil satu draft per run, dan timernya hanya
  jalan Selasa-Jumat. Mengganti angka itu berarti mengganti jadwal, bukan kodenya.

Satu topik yang gagal gate tidak memperkecil batch: generate menarik topik berikutnya sampai
empat tertulis (dengan batas tambahan).

---

## 2b. Review manusia

```
generate (Senin 02:07)   draft lahir; sinkronisasi ERPSonus 10:00 WIB memunculkannya di tab Review
reviewer                 ERPSonus > SEO Marketing > Review: baca draft, Setujui atau Tolak (admin)
publish (Selasa-Jumat)   menarik keputusan dari ERPSonus, lalu:
```

| Keputusan | Akibatnya |
|---|---|
| disetujui | draft boleh terbit, urutan tetap menurut `rank` |
| belum diputuskan | tidak terbit. Run dicatat `awaiting-review`; tab Ringkasan memperingatkan |
| ditolak | topik kembali `pending`, folder draft dihapus (commit `review: ...`), alasan disimpan di `reviewNote` dan dimasukkan ke prompt generate berikutnya |

Keputusan disimpan di tabel `seo_reviews` ERPSonus dan ditarik lewat
`GET /api/seo/review-decisions` (bearer `SEO_REVIEW_TOKEN`). Setelah dijalankan pipeline
mengirim ack, sehingga draft baru dengan slug yang sama mulai dari "menunggu". `generate` juga
menjalankan penolakan di awal run supaya draft yang ditolak dihitung sebagai stok yang kurang.

- **Gagal tertutup.** Kalau ERPSonus tidak terjangkau atau token salah, publish tidak
  menerbitkan apa pun (outcome `review-unavailable`, exit 1). Generate tetap jalan.
- **Alasan penolakan tampil di repo publik** (`reviewNote` di `data/topics.json`).
- Env di server: `SEO_REVIEW_TOKEN` (nilai sama dengan env ERPSonus), opsional
  `SEO_REVIEW_URL` untuk mengganti host (default `https://app.sonus.id/api/seo/review-decisions`).
- Draft yang sudah ada saat gerbang ini dipasang dianggap disetujui (migrasi ERPSonus 252).

---

## 3. Folder dan status

**Folder adalah statusnya.** Draft tidak bercampur dengan artikel yang sudah tayang.

| Folder | Isi | Dibaca Astro? |
|---|---|---|
| `drafts/berita/<slug>/` | draft: `index.md` (`draft: true`) dan `hero.webp` | tidak |
| `src/content/berita/<slug>/` | artikel yang tayang | ya |
| `data/failed/<slug>.md` | draft yang ditolak gate tiga kali, untuk diagnosis | tidak |
| `data/pipeline-runs.jsonl` | satu baris per run generate/publish, termasuk yang gagal | tidak |

**Catatan run** (`data/pipeline-runs.jsonl`) ditulis oleh setiap run yang bukan `--dry-run`, lalu
ikut di-commit dan di-push. Run yang menerbitkan atau menulis draft membawanya di commit-nya sendiri;
run lain membuat commit kecil `pipeline: <job> <hasil>` yang hanya berisi `data/`. ERPSonus
membacanya dari GitHub, jadi Senin tanpa baris `generate` berarti run itu tidak pernah jalan
(cron mati, `git pull` gagal, atau server mati), bukan run yang sepi.

```
{"t":"2026-10-27T19:07:02Z","job":"generate","outcome":"ok","stock":4,"target":4,"written":[...],"rejected":[],"tokens":41230}
```

| `job` | `outcome` |
|---|---|
| `generate` | `ok`, `partial` (kurang dari target), `failed` (nol tertulis karena gate), `api-stopped`, `stock-full`, `no-topics`, `error` |
| `publish` | `ok`, `held` (`PUBLISH_NOT_BEFORE`), `empty` (stok kosong), `gate-failed`, `check-failed`, `error` |

`tokens` adalah token DeepSeek run itu, dari `data/api-spend.log`. Repo publik, jadi baris ini hanya
memuat yang memang publik: slug, angka, hasil, dan pesan error gate atau status API, tidak pernah key.
Setiap commit ke `main` membangun ulang situs, jadi run yang hanya mencatat juga memicu satu build.

Melihat stok yang akan terbit berikutnya cukup `ls drafts/berita`. Artikel pertama yang
dikerjakan manual (`npm run new-article`) juga lahir di `drafts/berita/`.

Status sebuah topik ada di `data/topics.json`, yang ditulis hanya oleh server:

```
pending -> generated -> published
        \-> failed        (gate generate gagal 3x, atau gate publish gagal)
        \-> skipped       (slug sudah dipakai)
 legacy                   (artikel matriks lama, di luar antrean)
```

`generated` berarti ada draft yang menunggu giliran terbit di `drafts/berita/`. Urutannya
mengikuti `rank` dari `plan-topics`, yang menjaga empat artikel dalam satu minggu tidak
membahas produk atau pembeli yang sama.

**Menarik satu draft sebelum terbit**: ubah `status`-nya di `data/topics.json` menjadi
`failed` (atau status apa pun selain `generated`). Hanya `generated` yang diambil publish.
Foldernya boleh dibiarkan.

**Menerbitkan draft lama atau draft manual**: hapus `draft: true` dari frontmatter, pindahkan
foldernya dari `drafts/berita/` ke `src/content/berita/`, lalu `npm run check` dan
`npm run check-seo -- <slug>`. Pipeline tidak menyentuh artikel di luar antrean `generated`.

---

## 4. Gate mesin

Reviewer manusia memutuskan di ERPSonus (2b), tetapi reviewer tidak diminta menggantikan
gate: **gate mesin tetap penjaga yang menolak pelanggaran aturan**, dan ada di dua tempat: di dalam loop generate dan sekali lagi saat publish.

**Gate 1 - struktur** (`npm run check`, juga `prebuild`). Slug, panjang description,
duplikat metadata, `$` tanpa escape, alt gambar, dan **hero**: artikel yang tayang wajib punya
`heroImage` (filenya ada) dan `heroImageAlt`. Menggagalkan build, baik di `check-content`
maupun di skema `src/content/config.ts`. Draft dikecualikan, karena hero dibuat saat draft
lahir; publish juga menahan draft tanpa hero.

**Gate 2 - penulisan** (`npm run check-seo`). Penempatan dan densitas kata kunci, panjang
paragraf, jumlah heading, panjang artikel, dan tautan: minimal dua tautan internal, dan
**minimal dua tautan ke sonushub.id** (dua alamat berbeda, semuanya dari daftar putih di
`scripts/lib/sonushub.mjs`; di dalam loop generate, alamat produk artikel itu sendiri wajib ada).
Lihat `docs/MARKET.md` bagian 5.

**Gate 3 - fakta** (`scripts/lib/fact-guard.mjs`). Memeriksa bentuk saja tidak cukup:
"Permen ESDM No. 5 Tahun 2023" dan "No. 2 Tahun 2024" sama-sama lolos dua gate di atas;
satu nyata, satu tidak ada. Fact-guard memakai **daftar putih**:

| Yang diperiksa | Aturan |
|---|---|
| Kutipan regulasi | Harus ada di `KNOWN_REGULATIONS`; nomor dan tahun dicocokkan |
| TKDN, faktor emisi, CAPEX 1 MWp | Harus sesuai fakta terverifikasi |
| Studi kasus | Nama perusahaan di luar daftar + kata kerja keberhasilan = ditolak |
| Tautan eksternal | **Di-fetch sungguhan**; HTTP 4xx/5xx ditolak |
| Merek produk, perusahaan tak dikenal, sumber studi tanpa dasar | **Peringatan**: tidak menahan artikel, hanya dicetak di log generate (`journalctl`, atau `~/sn-generate.log`) |

**Yang tidak dijaga gate mana pun**: nomor standar (IEC, SNI, EN), spesifikasi produk, dan
apakah sebuah artikel layak dikirim ke calon klien. Prompt memerintahkan model menyebut jenis
standarnya saja bila ragu akan nomornya, tetapi itu arahan, bukan pemeriksaan. Karena tak ada
manusia di jalurnya, artikel yang salah di titik ini terbit apa adanya. Membaca beberapa
artikel yang sudah tayang tiap minggu (`git log -- src/content/berita`) adalah cara paling
murah untuk menangkapnya.

**Saat generate**: tiga percobaan per artikel; kegagalan dikirim balik ke prompt. Yang tetap
gagal ditandai `failed` dan drafnya yang terakhir disimpan di `data/failed/`.

**Saat publish**, draft dicek lagi (SEO, fakta, hero ada), karena bisa saja diedit tangan
sejak ditulis:

- Yang **gagal gate konten** ditandai `failed` dan dilewati. Tidak ada manusia yang
  memperbaikinya, jadi mencobanya lagi hanya akan gagal dengan cara yang sama dan menahan
  antrean. Foldernya tetap di `drafts/berita/` untuk diperiksa. Draft berikutnya terbit.
- Yang **hanya gagal hero** dicoba lagi di run berikutnya (biasanya `npm ci` belum jalan).
- Draft yang lolos dipindahkan ke `src/content/berita/` dengan `draft: false` dan `pubDate`
  hari itu. `check-content` berjalan di seluruh situs dan `check-seo` hanya di artikel yang
  sedang terbit (utang 18 artikel pertama tidak boleh memblokir). Jika `check-*` gagal,
  folder dipindahkan kembali ke `drafts/berita/` dan **tidak ada yang di-push**.

---

## 5. Gambar

**Perpustakaan ilustrasi** (sekali, dari laptop):

```bash
npm run illustrations                       # estimasi saja, tidak memanggil apa pun
npm run illustrations -- --yes              # generate yang belum ada
npm run illustrations -- --only <key> --force --yes   # ulang satu gambar
npm run illustrations -- --sheet            # kontak-sheet di data/review/illustrations.html
```

`data/illustrations.json` memuat prompt dan `alt` tiap gambar; hasilnya di
`data/illustrations/*.webp` (di-commit). Satu preamble gaya dipakai di semua prompt
(flat vector isometrik, latar putih, **tanpa teks**). Model: `gpt-image-1-mini`, kualitas
`low`, 1024². Sekitar **$0,0022 per gambar**, jadi 40 gambar matriks sekarang ±$0,09.
Biaya tidak naik walau artikelnya bertambah. `OPENAI_API_KEY` hanya dipakai di laptop;
server tidak pernah membutuhkannya.

Kunci gambar = `<produk>--<sudut>` (8 produk × 5 sudut). Tiap gambar dipakai 7 pembeli
untuk kombinasi itu. Menambah variasi gambar murah (±$0,002), jadi tambahkan bila
kemiripan thumbnail mulai terasa.

**Thumbnail** (otomatis, tanpa API): `lib/thumbnail.mjs` merakit 1200×630 dari logo, judul,
description, dan ilustrasi memakai satori + resvg + sharp. Ukuran judul diukur (56 px turun
sampai muat); subjudul dipotong di batas kata maksimal tiga baris. `generate-article`
memanggilnya segera setelah artikel ditulis, jadi **draft lahir sudah punya `hero.webp`,
`heroImage`, dan `heroImageAlt`** di dalam foldernya di `drafts/berita/`. Folder itu pindah
utuh saat terbit, jadi hero ikut. Alt-nya dari manifest dan menjelaskan isi gambar.

```bash
npm run thumbnails -- --check-all          # semua judul di topics.json: overflow, cakupan, waktu render
npm run thumbnails -- --slug <slug>        # pratinjau ke data/review/
npm run thumbnails -- --write              # hero untuk artikel yang belum punya
```

---

## 6. Memasang di server

```bash
ssh user@server 'sh -s' < scripts/server/detect.sh     # hanya membaca
ssh user@server
git clone https://github.com/solarnusantara/solar-nusantara.id.git ~/tmp-sn
sh ~/tmp-sn/scripts/server/setup.sh
```

`setup.sh` berhenti dua kali: pertama untuk mendaftarkan **deploy key** (centang "Allow
write access", tanpa itu push ditolak), kedua untuk mengisi `/etc/solar-nusantara/env`
(mode 600, kosong) dengan `DEEPSEEK_API_KEY=...` lewat editor, bukan lewat command line.
Kunci tidak boleh masuk repo. Syarat: Node >= 20, git, curl.

Dua jadwal terpasang. Dengan sudo: systemd timer. Tanpa sudo: crontab user (log ke
`~/sn-generate.log` dan `~/sn-publish.log`).

| Jadwal | Waktu | Perintah |
|---|---|---|
| `solar-nusantara-generate` | Senin 02:07 | `generate-article.mjs` (isi stok sampai 8) |
| `solar-nusantara-publish` | Selasa-Jumat 09:23 | `publish-drip.mjs` (satu draft) |

```bash
systemctl list-timers 'solar-nusantara-*'
journalctl -u solar-nusantara-generate -n 50
```

**Server yang sudah terpasang dengan jadwal lama** tidak berubah sendiri: `setup.sh` hanya
berlaku pada pemasangan baru. Dua perubahan harus dibuat di server:

1. Ubah jadwal generate menjadi Senin 02:07 (`OnCalendar=Mon *-*-* 02:07:00` pada timer
   systemd, atau `7 2 * * 1` pada crontab), lalu `systemctl daemon-reload`. Bungkus
   perintahnya dengan `flock` seperti yang dipasang `setup.sh`.
2. `git pull && npm ci`. Pipeline memerlukan `satori`, `@resvg/resvg-js`, dan `sharp`.
   Tanpa `npm ci`, publish berhenti dengan error yang jelas, bukan menerbitkan tanpa hero.

Sekali di awal, untuk membuat rencana topiknya:

```bash
npm run plan-topics          # 280 topik -> data/topics.json
```

Baca judul-judulnya sebelum batch pertama. Menjalankannya lagi aman: status yang sudah
berjalan dibawa serta, dan slug serta kata kunci di `drafts/berita/` ikut dihitung sebagai
sudah dipakai. Jangan menjalankannya dari laptop bersamaan dengan server sedang menulis,
karena keduanya menulis `topics.json`.

Uji sebelum menyalakan jadwal:

```bash
npm run generate -- --dry-run     # menulis satu batch di terminal tanpa menyimpan; BACA sekali
npm run publish -- --dry-run      # apa yang akan terbit hari itu
```

---

## 7. Menahan publikasi

```bash
sudo nano /etc/solar-nusantara/env
# PUBLISH_NOT_BEFORE=2026-11-02
```

Generate tetap jalan dan draft terus bertambah sampai stok 4-7, **tidak ada yang terbit**
sampai tanggal itu. Hapus barisnya untuk melepas.

| | |
|---|---|
| Tahanan aktif | keluar **status 0** (oneshot yang gagal tiap hari terbaca sebagai timer rusak) |
| Tanggal tidak valid | **menolak terbit** (status 1); menganggap tahanan rusak sebagai "tidak ada tahanan" berarti menerbitkan tepat saat tahanan salah tulis |
| Tahanan lewat | lanjut normal |

Tahanan ini rem darurat di atas review (2b), yang hanya menyaring draft satu per satu: kalau
Anda melihat artikel bermasalah yang sudah tayang, set tanggalnya, perbaiki, baru lepas.

Menerbitkan ke dalam rollout *spam update* Google yang menyasar konten skala besar
adalah sebuah pilihan; pilihan itu harus dibuat sadar.

---

## 8. Batas biaya API

Dua API berbayar dipakai, dan masing-masing punya pagar di kode **dan** harus punya pagar di
sisi penyedia. Pagar di kode hanya melindungi dari kesalahan di sisi kita; pagar penyedia
melindungi dari semuanya, termasuk mesin lain yang memakai key yang sama.

| API | Dipakai oleh | Pagar di kode |
|---|---|---|
| DeepSeek | `generate-article.mjs` (server) | 700.000 token per hari UTC (`DAILY_TOKEN_CAP`); `max_tokens` per panggilan (16k, pilar 32k); timeout 5 menit; paling banyak 12 topik x 3 percobaan per run |
| OpenAI | `generate-illustrations.mjs` (hanya laptop) | estimasi dulu, wajib `--yes`; maksimal US$1 per run (`MAX_RUN_USD`); US$2 per hari UTC (`DAILY_USD_CAP`); `--max` 50 gambar; timeout 2 menit; berhenti di kegagalan pertama |

**Ledger.** Setiap panggilan dicatat satu baris di `data/api-spend.log` (tidak di-commit;
ledger server adalah yang penting). Sebelum memanggil, skrip menjumlahkan pemakaian hari itu
dan menolak jika batas tercapai. Contoh melihat pemakaian hari ini di server:

```bash
grep "$(date -u +%F)" ~/solar-nusantara.id/data/api-spend.log | tail
```

**Cara menghitung.** DeepSeek dihitung dalam token (`usage.total_tokens` dari respons). Panggilan
yang **timeout** dihitung sebesar `max_tokens`-nya, karena penyedia bisa saja tetap membuat dan
menagih jawabannya; ini sengaja konservatif, jadi satu malam dengan API yang menggantung bisa
mencatat ratusan ribu token yang sebenarnya tidak ditagih. Panggilan yang ditolak (503, 401)
tidak ditagih dan tidak dihitung. Harga per token DeepSeek tidak dicatat di repo, jadi batasnya
dalam token, bukan rupiah.

**Mengubah batas**: ubah konstantanya di skrip, di PR, bukan lewat flag atau env. Batas yang bisa
dilewati dengan satu flag bukan batas.

**Pagar di sisi penyedia (dilakukan sekali, di dashboard, bukan lewat kode):**

- **DeepSeek** memakai saldo prabayar: pemakaian berhenti saat saldo habis (HTTP 402). Isi saldo
  secukupnya untuk beberapa minggu, bukan sebanyak-banyaknya, dan jangan aktifkan top-up otomatis.
- **OpenAI**: pasang *monthly budget* dan *hard limit* di Settings > Limits. Key OpenAI hanya ada
  di laptop; server tidak pernah memegangnya.

**Kalau batas harian tercapai**, generate berhenti dengan pesan "daily DeepSeek budget used up";
topik tetap `pending` dan dicoba lagi setelah hari UTC berganti (08:00 WITA; run generate 02:07 WITA yang jatuh sebelum itu
masih di hari UTC yang sama, jadi bisa ikut terhenti). Itu bukan kegagalan artikel.

---

## 9. Kalau ada yang rusak

| Gejala | Penyebab biasanya | Tindakan |
|---|---|---|
| Generate selalu "N draft menunggu" | stok masih 4 atau lebih; ini normal | tidak ada |
| Generate "no pending topics left" | antrean 280 topik habis | `npm run plan-topics -- --retry-failed`, atau perluas matriks |
| Publish: "no draft is waiting" | stok kosong; generate belum jalan atau gagal | `journalctl -u solar-nusantara-generate -n 80` |
| Publish menandai draft `failed` | draft tidak lolos gate SEO/fakta | lihat `lastError` di `data/topics.json`; drafnya di `drafts/berita/<slug>/` |
| Publish berhenti dengan "heroImage" | hero tidak terbuat, biasanya `npm ci` belum dijalankan | `npm ci`, lalu `npm run thumbnails -- --write` |
| `Permission denied (publickey)` saat push | "Allow write access" tidak dicentang | Settings > Deploy keys |
| `DEEPSEEK_API_KEY is not set` | env file kosong atau tidak terbaca | `sudo cat /etc/solar-nusantara/env` |
| Generate gagal terus, 3 percobaan | kuota API habis, atau prompt terlalu ketat | `journalctl -u solar-nusantara-generate -n 80`; draft yang ditolak ada di `data/failed/` |
| Generate: "stopped early because of the API" | DeepSeek sibuk (503/429), timeout, key salah atau saldo habis (401/402), atau batas harian | topik **tidak** ditandai `failed`; tidak ada yang perlu dipulihkan, run berikutnya mencoba lagi. 401/402: periksa key dan saldo |
| Banyak topik berstatus `failed` berturut-turut | gate menolak isi artikel (prompt atau gate bermasalah); gangguan API tidak lagi menyebabkan ini | set `PUBLISH_NOT_BEFORE`, baca `data/failed/`, cari sebabnya |
| Push sukses tapi situs tidak berubah | Actions gagal | tab Actions di GitHub |
| Tidak ada baris baru di `data/pipeline-runs.jsonl` setelah jadwalnya | run tidak jalan sama sekali, atau push-nya gagal | `crontab -l` / `systemctl list-timers`, lalu `~/sn-*.log` atau `journalctl` |

**Gangguan API tidak membakar antrean.** Error 429, 5xx, timeout, dan "tidak tersambung" ditangani
sebagai masalah penyedia: topik tetap `pending`, dicoba satu kali lagi, dan setelah dua topik
berturut-turut gagal begitu, run berhenti (jadi paling banyak sekitar tiga topik disentuh).
Error 4xx lain (key salah, saldo habis) dan batas harian menghentikan run seketika.

Yang masih tidak otomatis: kalau gate generate gagal terus karena isi artikelnya, topik
ditandai `failed` satu per satu dan stok mengering, lalu publish berhenti karena tidak ada
draft. Itu berhenti dengan sendirinya, tetapi pelan; periksa log bila stok tidak terisi seminggu.

**Kunci jadwal.** Generate dan publish sama-sama menulis `data/topics.json` dan push, jadi
keduanya dibungkus `flock` pada `.pipeline.lock` di folder clone. Generate yang menemukan kunci
terpakai melewatkan run-nya; publish menunggu sampai satu jam supaya artikel hari itu tidak
hilang karena generate masih berjalan.

Jadwal yang dipasang sebelum `setup.sh` memakai `flock` tetap berjalan tanpa kunci, karena
`setup.sh` hanya menulis jadwal saat dijalankan. `detect.sh` memberi `WARN` "tanpa flock" untuk
jadwal seperti itu; pasang ulang baris crontab atau unit systemd dari `setup.sh`.

---

## 10. Batas keamanan data

Repo ini **publik**. `DB_PR.csv` di proyek ERP memuat `Pagu` dan `Final Price` (harga
pengadaan internal dan margin); generator tidak pernah membacanya. Berkas pasar internal
memuat nilai target per segmen, nama calon klien, dan syarat pembayaran; semuanya hanya
membentuk *bobot* di `plan-topics.mjs`, tidak pernah teksnya. Yang boleh masuk prompt hanya
nama produk kanonik dan spesifikasi teknis, tidak ada harga, merek, atau nama klien.

Draft di `drafts/berita/` ikut ter-commit dan **publik di GitHub** walau belum tayang di
situs. Perlakukan isinya seperti artikel yang sudah terbit.
