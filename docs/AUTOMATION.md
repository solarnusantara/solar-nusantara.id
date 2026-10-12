# Otomatisasi artikel: dari topik sampai tayang

Cara kerja pabrik artikel di server, ritme mingguannya, dan bagaimana manusia ikut
memutuskan. Pasar yang dituju dibahas di `docs/MARKET.md`.

Diperbarui 2026-10-12. Perubahan besar dari versi sebelumnya: tidak ada lagi mode
`--auto`. Setiap artikel melewati review manusia sebelum terbit.

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
| Server SSH | generate draft, simpan state, terbitkan yang disetujui, commit, push |
| Laptop Anda | review batch, simpan keputusan, push keputusan |
| GitHub | sumber kebenaran, pemicu build |
| GitHub Pages | melayani situs |

---

## 2. Ritme mingguan

Satu **batch = 4 artikel** = satu minggu terbit.

```
 Senin           ANDA review batch yang menunggu (npm run review) dan kirim keputusan
 Selasa 02:07    server membaca keputusan itu dan menulis batch berikutnya (4 artikel,
                 masing-masing sudah punya hero), commit + push sebagai draft
 Selasa-Jumat    09:23, satu artikel yang disetujui terbit per hari = 4 per minggu
 Senin berikutnya batch baru itu giliran Anda review
```

```
generate -> review -> setujui -> terbit
 server      Senin     Senin     Selasa-Jumat
```

Dua pengaman yang membuat ritme ini bertahan sendiri:

- **Kunci review.** Selama masih ada artikel berstatus *menunggu review*, generate tidak
  menulis batch baru (keluar dengan status 0 dan menyebut apa yang ditunggu). Antrean draft
  yang tak terbaca tidak bisa menumpuk. Kalau Anda melewatkan satu Senin, tidak ada yang
  rusak: produksi berhenti dan terbit berhenti saat stok yang disetujui habis.
- **Satu artikel per hari terbit.** `publish-drip` mengambil satu artikel yang disetujui
  per run, dan timernya hanya jalan Selasa-Jumat. Kalau Anda menyetujui enam, empat terbit
  minggu ini dan dua minggu depan.

---

## 3. Status sebuah topik

```
pending -> generated -> approved -> published
                    \-> rejected          (tetap di disk, tidak terbit)
                    \-> redo -> pending   (draft dihapus, ditulis ulang dengan catatan Anda)
 legacy                                   (artikel matriks lama, di luar antrean)
```

`data/topics.json` menyimpan statusnya dan ditulis **hanya oleh server**. Keputusan Anda
ada di berkas terpisah, `data/review.txt`, yang ditulis **hanya oleh Anda**. Dua penulis,
dua berkas: keputusan yang Anda push tidak bisa bentrok dengan batch yang server push pada
saat yang sama.

```
approve <slug>
redo    <slug> # catatan untuk penulisnya
reject  <slug> # alasannya
```

Berkas ini hanya ditambah, tidak diubah. Mengganti keputusan berarti menambah baris baru;
yang terakhir menang. Sebuah keputusan terikat pada **satu versi draft**: setelah `redo`,
artikel yang ditulis ulang muncul lagi sebagai undecided walau baris `redo` lamanya masih
di berkas (setiap topik mencatat berapa baris miliknya yang sudah diterapkan).

---

## 4. Review: cara membacanya

```bash
git pull
npm run review          # membuka http://127.0.0.1:4173
```

Halaman ini ada supaya Anda tidak perlu membaca empat artikel 1.900 kata untuk menjawab
"ini bagus atau tidak". Ia membaca *untuk* Anda dan menyisakan penilaian yang hanya bisa
dibuat manusia. Urutan per artikel:

1. **Thumbnail dan hasil pencarian** seperti yang pembaca lihat: hero, judul `<title>`,
   URL, description, dan jumlah karakternya.
2. **Sudah dicek mesin**: jumlah kata, heading, densitas kata kunci, tautan, hasil gate SEO
   dan gate fakta. Ini tidak perlu Anda cek lagi dengan mata.
3. **Perlu kamu cek**: kalimat yang berisi klaim yang bisa salah (angka, standar, regulasi)
   ditarik dari teks ke satu daftar bercentang, regulasi dan standar paling atas. Angka yang
   salah di dalam paragraf yang bagus adalah yang paling sering terlewat saat dibaca cepat.
4. **Tautan keluar**: satu klik untuk membuka tiap tautan.
5. **Kerangka**, lalu **artikelnya** dalam tipografi yang nyaman (lebar baca sempit,
   tabel yang bisa digulir).
6. **Keputusan** menempel di bawah artikel: Setujui, Tulis ulang, atau Tolak. Tulis ulang
   dan Tolak mewajibkan catatan; catatan Tulis ulang dikirim ke penulis sebagai arahan.

Setelah keempatnya diputuskan, tombol **Kirim keputusan ke server** muncul dan melakukan
commit + push `data/review.txt` saja.

**Cara memakai waktu review (±15 menit per batch):**

- Mulai dari daftar "Perlu kamu cek", bukan dari paragraf pertama. Buka tautan keluar.
- Baca pembuka dan penutup artikel; di situlah arah dan ajakan bertindaknya.
- Satu pertanyaan penentu: *apakah procurement atau project manager akan mengirim ini ke
  rekannya?* Itu hal yang tidak bisa dinilai mesin.
- Tolak yang mengulang artikel lain di batch yang sama; Tulis ulang yang benar tapi umum,
  dengan catatan konkret ("tambahkan contoh ketebalan galvanis per lingkungan").

Halaman ini hanya berjalan di `127.0.0.1`, hanya menerima keputusan untuk batch yang sedang
direview, dan satu-satunya yang ia tulis adalah satu baris ke `data/review.txt`.

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
`heroImage`, dan `heroImageAlt`**. Alt-nya dari manifest dan menjelaskan isi gambar.

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

Dua timer terpasang:

| Timer | Jadwal | Perintah |
|---|---|---|
| `solar-nusantara-generate` | harian 02:07 | `generate-article.mjs` (satu batch, ditahan selama ada yang menunggu review) |
| `solar-nusantara-publish` | Selasa-Jumat 09:23 | `publish-drip.mjs` (satu artikel yang disetujui) |

```bash
systemctl list-timers 'solar-nusantara-*'
journalctl -u solar-nusantara-generate -n 50
```

Generate berjalan **harian** walau batch hanya ditulis seminggu sekali: hampir semua hari ia
hanya melaporkan "menunggu review" dan keluar 0, dan itulah yang membuat keputusan Senin
membuka batch berikutnya dalam sehari.

**Server yang sudah terpasang dengan jadwal lama** tidak berubah sendiri: `setup.sh` hanya
berlaku pada pemasangan baru. Ubah unit-nya (atau pasang ulang), dan jalankan sekali
`git pull && npm ci`, karena pipeline kini memerlukan `satori`, `@resvg/resvg-js`, dan
`sharp`. Tanpa `npm ci`, generate dan publish berhenti di awal dengan error yang jelas,
bukan menerbitkan tanpa hero.

Sekali di awal, untuk membuat rencana topiknya:

```bash
npm run plan-topics          # 280 topik -> data/topics.json
```

Baca judul-judulnya sebelum batch pertama. Menjalankannya lagi aman: status yang sudah
berjalan dibawa serta. Jangan menjalankannya dari laptop bersamaan dengan server sedang
menulis, karena keduanya menulis `topics.json`.

---

## 7. Gate mesin

Review manusia tidak menggantikan gate; ia menambah apa yang tidak bisa dilihat gate.

**Gate 1 - struktur** (`npm run check`, juga `prebuild`). Slug, panjang description,
duplikat metadata, `$` tanpa escape, alt gambar. Menggagalkan build.

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
| Merek produk | **Peringatan**, muncul di halaman review (artikel membandingkan kategori, bukan merek) |

Gate 3 tidak memeriksa nomor standar (IEC, SNI, EN) maupun spesifikasi produk. Itu sebabnya
review manusia memprioritaskannya.

**Di dalam loop generate**: tiga percobaan per artikel, kegagalan dikirim balik ke prompt.
Satu topik yang gagal tidak memperkecil batch: generate menarik topik berikutnya sampai
empat tertulis (dengan batas tambahan).

**Saat publish**, artikel yang disetujui dicek lagi (SEO, fakta, hero ada), karena bisa saja
diedit setelah disetujui. Yang gagal ditahan dan dicoba lagi di run berikutnya; yang lolos
diterbitkan. `check-content` berjalan di seluruh situs dan `check-seo` hanya di artikel
yang sedang terbit (utang 18 artikel pertama tidak boleh memblokir). Jika `check-*` gagal,
artikel dikembalikan ke draft dan **tidak ada yang di-push**.

---

## 8. Menahan publikasi

```bash
sudo nano /etc/solar-nusantara/env
# PUBLISH_NOT_BEFORE=2026-11-02
```

Generate tetap jalan, draft dan review tetap berjalan, **tidak ada yang terbit** sampai
tanggal itu. Hapus barisnya untuk melepas.

| | |
|---|---|
| Tahanan aktif | keluar **status 0** (oneshot yang gagal tiap hari terbaca sebagai timer rusak) |
| Tanggal tidak valid | **menolak terbit** (status 1); menganggap tahanan rusak sebagai "tidak ada tahanan" berarti menerbitkan tepat saat tahanan salah tulis |
| Tahanan lewat | lanjut normal |

Menerbitkan ke dalam rollout *spam update* Google yang menyasar konten skala besar
adalah sebuah pilihan; pilihan itu harus dibuat sadar.

---

## 9. Kalau ada yang rusak

| Gejala | Penyebab biasanya | Tindakan |
|---|---|---|
| Generate selalu "menunggu review" | batch belum diputuskan, atau keputusan belum di-push | `npm run review`, kirim keputusan |
| Publish: "nothing approved is waiting" | tidak ada yang disetujui, atau keputusan belum sampai ke server | cek `git log origin/main -- data/review.txt` |
| Publish berhenti dengan "heroImage" | hero tidak terbuat, biasanya `npm ci` belum dijalankan | `npm ci`, lalu `npm run thumbnails -- --write` |
| `Permission denied (publickey)` saat push | "Allow write access" tidak dicentang | Settings > Deploy keys |
| `DEEPSEEK_API_KEY is not set` | env file kosong atau tidak terbaca | `sudo cat /etc/solar-nusantara/env` |
| Generate gagal terus, 3 percobaan | kuota API habis, atau prompt terlalu ketat | `journalctl -u solar-nusantara-generate -n 80`; draft yang ditolak ada di `data/failed/` |
| Push sukses tapi situs tidak berubah | Actions gagal | tab Actions di GitHub |

---

## 10. Batas keamanan data

Repo ini **publik**. `DB_PR.csv` di proyek ERP memuat `Pagu` dan `Final Price` (harga
pengadaan internal dan margin); generator tidak pernah membacanya. Berkas pasar internal
memuat nilai target per segmen, nama calon klien, dan syarat pembayaran; semuanya hanya
membentuk *bobot* di `plan-topics.mjs`, tidak pernah teksnya. Yang boleh masuk prompt hanya
nama produk kanonik dan spesifikasi teknis, tidak ada harga, merek, atau nama klien.
