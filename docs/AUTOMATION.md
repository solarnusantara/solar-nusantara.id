# Otomatisasi artikel: menghubungkan server ke repo

Cara memasang pabrik generasi artikel di server dan menyambungkannya ke
GitHub, sampai artikel benar-benar tayang di solar-nusantara.id.

Ditulis 2026-09-22. Setiap langkah di bawah sudah dijalankan dan diverifikasi,
bukan disalin dari dokumentasi umum.

---

## 1. Hal pertama yang harus diluruskan

**Situs ini tidak berjalan di server Anda.**

`solar-nusantara.id` dilayani **GitHub Pages** di balik Cloudflare. Buktinya ada
di header responsnya:

```
$ curl -sI https://solar-nusantara.id/berita/ | grep -i github
x-github-request-id: 7B62:A788C:E7EFC:F32E2:6AB1E33F
x-github-edge-region: southeastasia
```

dan di `.github/workflows/deploy.yml`, yang membangun situs dengan
`withastro/action@v5` setiap kali ada push ke `main`.

Konsekuensinya tegas: **menaruh file artikel di server tidak akan menerbitkan
apa pun.** Satu-satunya jalur terbit adalah

```
commit ke repo  ->  GitHub Actions build  ->  GitHub Pages  ->  Cloudflare
```

Lalu untuk apa servernya? Untuk menjalankan **pabrik generasinya**. Menulis
1000 artikel adalah proses berjam-jam yang memanggil API berulang kali,
menyimpan state, dan perlu dijadwalkan. Itu pekerjaan yang cocok untuk server
yang hidup terus, bukan untuk GitHub Actions yang dibatasi durasi per job.

Jadi pembagiannya:

| Tempat | Tugas |
|---|---|
| Server SSH | generate draft, simpan state, jalankan gate, commit, push |
| GitHub | sumber kebenaran, pemicu build |
| GitHub Pages | melayani situs |

---

## 2. Periksa servernya dulu

Dari laptop Anda:

```bash
ssh user@server 'sh -s' < scripts/server/detect.sh
```

Skrip ini hanya membaca: versi OS dan Node, ada tidaknya git dan systemd, sisa
disk, serta apakah server bisa menjangkau `api.deepseek.com` dan `github.com`.
Tidak memasang apa pun dan tidak menulis apa pun.

Syarat wajibnya cuma empat: **Node >= 20**, **git**, **curl**, dan koneksi
keluar ke dua host di atas. Perbaiki semua yang bertanda `[FAIL]` sebelum
lanjut. Kalau ada yang tidak jelas, kirim seluruh outputnya.

---

## 3. Pasang

```bash
ssh user@server
git clone https://github.com/solarnusantara/solar-nusantara.id.git ~/tmp-sn
sh ~/tmp-sn/scripts/server/setup.sh
```

Skrip ini berhenti dua kali dan meminta tindakan Anda. Itu disengaja.

### Perhentian pertama: daftarkan deploy key

Skrip membuat kunci SSH lalu berhenti dan menampilkan public key-nya. Buka:

```
https://github.com/solarnusantara/solar-nusantara.id/settings/keys
-> Add deploy key
-> Title : server-generator
-> Key   : tempel baris yang ditampilkan
-> CENTANG "Allow write access"      <-- tanpa ini, push ditolak
```

Lalu jalankan ulang `setup.sh`. Skrip akan mendeteksi key-nya sudah dikenali
dan melanjutkan: clone repo lewat SSH, `npm ci`, dan set identitas git bot.

**Kenapa deploy key, bukan Personal Access Token.** Deploy key terkunci ke satu
repo: kalau server dibobol, penyerang tidak dapat akses ke repo lain di
organisasi. Deploy key juga tidak terikat ke akun orang, jadi tidak ikut mati
saat orang itu keluar dari perusahaan — kegagalan yang baru ketahuan berbulan
kemudian ketika publikasi diam-diam berhenti.

### Perhentian kedua: isi API key

Skrip membuat `/etc/solar-nusantara/env` dengan mode `600` tapi **kosong**:

```bash
sudo nano /etc/solar-nusantara/env
```

```
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxx
```

Skrip sengaja tidak menuliskan nilainya. Kalau key-nya dilewatkan sebagai
argumen, ia akan tercatat di shell history dan terlihat di `ps`. Anda yang
menempelkannya dengan editor, jadi nilainya tidak pernah lewat command line.

**Key ini tidak boleh masuk repo.** systemd membacanya lewat `EnvironmentFile`,
jadi skripnya menerimanya dari environment tanpa pernah menyentuh disk repo.

---

## 4. Yang terpasang setelah itu

Dua systemd timer:

| Timer | Jadwal | Perintah |
|---|---|---|
| `solar-nusantara-generate` | tiap jam, menit :07 | `generate-article.mjs --limit 4 --wave 1` |
| `solar-nusantara-publish` | harian, 09:23 | `publish-drip.mjs --limit 12` |

```bash
systemctl list-timers 'solar-nusantara-*'
journalctl -u solar-nusantara-generate -n 50
```

Kalau server tidak pakai systemd, `setup.sh` mencetak dua baris crontab
setaranya.

**Generate tiap jam dengan batch kecil, bukan sekali besar tiap malam.** Prompt
yang buruk ketahuan dalam satu jam, bukan setelah 200 artikel telanjur ditulis,
dan gangguan API sesaat hanya merugikan satu batch.

---

## 5. Alur kerja harian

Tidak ada. Itu memang tujuannya.

```
server generate draft  →  tiga gate mesin  →  server terbit + push  →  Actions  →  live
   tiap jam, 4 artikel      otomatis            harian, 12 artikel
```

Sekali di awal, untuk membuat rencana topiknya:

```bash
cd /opt/solar-nusantara.id
npm run plan-topics          # 1008 topik -> data/topics.json
```

Baca judul-judulnya sebelum generator mulai. Memperbaiki 1000 judul di satu file
JSON butuh beberapa menit; memperbaikinya setelah artikel ditulis berarti menulis
ulang.

Setelah itu tidak ada langkah manual. Perintah di bawah tetap ada untuk saat kamu
ingin melihat atau ikut campur, bukan karena pipeline menunggunya:

```bash
npm run publish -- --auto --dry-run   # apa yang akan terbit hari ini
npm run review                        # render draft jadi satu HTML untuk dibaca
npm run check-seo                     # laporan mutu seluruh situs
npm run refresh                       # artikel mana yang mulai usang
journalctl -u solar-nusantara-generate -n 50
```

Mode persetujuan manual masih utuh kalau suatu saat kamu menginginkannya kembali:
isi `data/approved.txt` lalu jalankan `npm run publish` tanpa `--auto`.

---

## 6. Yang menahan artikel buruk tanpa ada manusia membaca

Tiga gate mesin, satu pemutus arus, satu sampel. Semuanya sudah diuji.

**Gate 1 — struktur** (`npm run check`). Slug, panjang description, duplikat
metadata, `$` tanpa escape, alt gambar. Menggagalkan build lewat `prebuild`.

**Gate 2 — penulisan** (`npm run check-seo`). Penempatan dan densitas kata kunci,
panjang paragraf, jumlah heading, tautan internal dan eksternal, panjang artikel.

**Gate 3 — fakta** (`scripts/lib/fact-guard.mjs`). Ini yang menggantikan mata
manusia, dan alasannya penting: dua gate di atas memeriksa bentuk, bukan
kebenaran. "Permen ESDM No. 5 Tahun 2023" dan "Permen ESDM No. 2 Tahun 2024"
sama-sama lolos keduanya; satu nyata, satu tidak ada.

Fact-guard memakai **daftar putih**, bukan pemeriksaan kewajaran:

| Yang diperiksa | Aturan |
|---|---|
| Kutipan regulasi | Harus ada di `KNOWN_REGULATIONS`. Nomor dan tahun dua-duanya dicocokkan |
| TKDN | Harus 40 persen |
| Faktor emisi grid | Harus sekitar 0,87 kg CO2/kWh |
| Porsi modul terhadap CAPEX | Harus sekitar 40% |
| CAPEX PLTS 1 MWp | Harus dalam Rp 9-13 miliar, dalam satuan miliar |
| Studi kasus | Nama perusahaan di luar daftar + kata kerja keberhasilan = ditolak |
| Tautan eksternal | **Di-fetch sungguhan.** HTTP 4xx/5xx ditolak |

Tautan tidak dinilai dari bentuk URL-nya. Versi pertama menebak dari kedalaman
path dan menolak `nrel.gov/docs/fy18osti/68696.pdf` - dokumen yang benar-benar
ada. Satu-satunya cara membedakan kutipan nyata dari kutipan karangan adalah
bertanya ke servernya.

**Pemutus arus.** Kalau kurang dari **60%** draft lolos bersih, publikasi
**berhenti** dan melaporkan kegagalan tersering. Ini untuk kegagalan sistemik -
model bergeser, prompt lapuk, DeepSeek berubah perilaku. Dengan manusia membaca,
itu ketahuan di batch pertama; tanpa itu, terbit tiap hari sampai ada yang sadar
berminggu-minggu kemudian. Satu hari buruk merugikan satu hari; satu bulan buruk
merugikan domainnya.

**Lebih ketat tanpa pengawasan.** Di mode `--auto`, sebuah *warning* pun menahan
artikel. Dengan manusia, warning adalah pertimbangan yang ia ambil; tanpa
manusia, warning adalah satu-satunya sinyal tersisa bahwa ada yang janggal.

**Sampel, bukan gerbang.** Satu dari tiap 10 artikel terbit dicatat di
`data/spotcheck.log`. Tidak pernah menahan apa pun. Gate tidak bisa menilai
apakah sebuah artikel layak dikirim ke calon klien - hanya kamu yang bisa, dan
ini memberi kamu daftar pendek untuk itu.

**Kalau gate mana pun gagal saat publish**, seluruh batch dikembalikan ke draft
dan **tidak ada yang di-push**. Remote terhubung ke deploy, jadi yang gagal gate
tidak boleh sampai ke sana.

Catatan: saat publish, `check-seo` hanya menilai batch yang sedang terbit.
Aturannya lebih baru daripada 18 artikel pertama situs ini, yang tidak
memenuhinya. Itu utang yang perlu diperbaiki, bukan alasan memblokir artikel
baru. `npm run check-seo` tanpa argumen tetap melaporkan seluruh situs.

---

## 6b. Menahan publikasi (jendela penerbitan itu variabel)

```bash
sudo nano /etc/solar-nusantara/env
# PUBLISH_NOT_BEFORE=2026-10-08
```

Generate tetap jalan, draft tetap bertambah, **tidak ada yang terbit** sampai
tanggal itu. Hapus barisnya untuk melepas - tidak perlu menyentuh systemd unit
maupun `daemon-reload`.

**Kapan ini dipakai.** Spam update Google September 2026 mulai 24 September,
butuh sampai dua minggu, dan targetnya *scaled content abuse* - persis pola yang
ditampilkan gelombang pertama artikel berbantuan AI. Menerbitkan ke dalam rollout
kebijakan yang menyasar dirimu adalah sebuah pilihan, jadi pilihan itu harus
dibuat sadar, bukan karena kelewatan.

Perilakunya sengaja dibuat begini:

| | |
|---|---|
| Tahanan aktif | keluar dengan status **0** - sebuah oneshot systemd yang gagal tiap hari selama seminggu terbaca sebagai timer rusak, padahal ini perilaku yang diinginkan |
| Tanggal tidak valid | **menolak terbit** (status 1). Menganggap tahanan rusak sebagai "tidak ada tahanan" berarti menerbitkan tepat di hari seseorang salah menulis nilai yang ia andalkan untuk menahannya |
| Tahanan lewat | lanjut normal |

Flag `--not-before YYYY-MM-DD` juga tersedia untuk sekali jalan, tapi env var
yang relevan di server: file itu sudah dibaca systemd, jadi menahan dan melepas
cukup mengedit satu baris yang tidak perlu diingat untuk dikembalikan.

---

## 7. Kalau ada yang rusak

| Gejala | Penyebab biasanya | Tindakan |
|---|---|---|
| `Permission denied (publickey)` saat push | "Allow write access" tidak dicentang | Buka Settings > Deploy keys, centang, simpan |
| `DEEPSEEK_API_KEY is not set` | env file kosong atau tidak terbaca | `sudo cat /etc/solar-nusantara/env`, pastikan ada nilainya |
| Generate gagal terus, 3 percobaan | Kuota API habis, atau prompt terlalu ketat | `journalctl -u solar-nusantara-generate -n 80` |
| `model output truncated` | `max_tokens` kurang untuk model reasoning | Naikkan `max_tokens` di `generate-article.mjs` |
| Publish bilang "nothing to commit" | Semua yang disetujui sudah terbit | Generate lagi, atau tambah slug ke approved.txt |
| Push sukses tapi situs tidak berubah | Actions gagal | Buka tab Actions di GitHub, baca log build |
| Artikel terbit tapi tidak di Google | Search Console belum diverifikasi | Lihat bagian 8 |

---

## 8. Dua hal yang harus diselesaikan manusia

Keduanya di luar jangkauan otomatisasi ini, dan keduanya berpengaruh besar.

**Search Console belum diverifikasi.** `sc-domain:solar-nusantara.id` terdaftar
sejak 15 September 2026 tapi belum terverifikasi (`docs/CONTENT-PLAYBOOK.md`
bagian 8). Selama begitu, **tidak akan pernah ada data performa** — tidak ada
impresi, tidak ada posisi, tidak ada kueri. Menerbitkan 1000 artikel tanpa ini
berarti menerbitkan tanpa cara mengetahui apakah berhasil. Tambahkan TXT record
yang Google berikan sebelum menaikkan volume.

**Kecepatan terbit adalah keputusan bisnis, bukan teknis.** Default-nya 12
artikel per hari. Menaikkannya tinggal mengubah satu angka, tapi 1000 artikel
yang muncul sekaligus di domain yang tadinya punya 18 adalah pola yang
persis dicari kebijakan *scaled content abuse* Google, dan sanksinya menimpa
seluruh domain — termasuk halaman produk dan layanan yang menghasilkan RFQ.

Urutan yang disarankan: terbitkan 100 artikel pertama, tunggu 4–6 minggu, baca
data Search Console, baru putuskan 900 sisanya. Targetnya tetap 1000; yang
berubah hanya urutan pembuktiannya.

---

## 9. Batas keamanan data

`DB_PR.csv` di proyek ERP berisi kolom `Pagu` dan `Final Price` — harga
pengadaan internal dan margin. **Generator tidak pernah membacanya**, dan tidak
boleh diubah supaya membacanya. Harga vendor yang bocor ke artikel publik
adalah kerugian komersial yang tidak bisa ditarik kembali.

Yang boleh masuk prompt hanya nama produk kanonik dan spesifikasi teknis —
bukan angka harga apa pun dari data pengadaan.
