# DNS: solar-nusantara.id di Cloudflare

Pengelolaan DNS domain ini lewat Cloudflare API, bukan dashboard.

```bash
export CLOUDFLARE_API_TOKEN=...        # jangan tempel di perintah yang masuk history
export CLOUDFLARE_ZONE_ID=...          # opsional; sudah ada di .env proyek sonushub
npm run dns -- list
npm run dns -- list --type TXT
npm run dns -- add TXT @ "google-site-verification=..." --yes
npm run dns -- delete TXT _acme-challenge --yes
```

## Token

Buat di dash.cloudflare.com/profile/api-tokens → **Create Token** → template
**Edit zone DNS**, lalu **batasi ke zone `solar-nusantara.id`** saja, bukan All
zones.

Token adalah satu-satunya dari tiga nilai ini yang rahasia, dan satu-satunya yang
belum ada. `CLOUDFLARE_ZONE_ID` dan `CLOUDFLARE_ACCOUNT_ID` sudah tersimpan di
`.env` proyek sonushub; keduanya pengenal, bukan kredensial.

`CLOUDFLARE_ZONE_ID` bersifat opsional. Kalau diisi, skrip memakainya langsung;
kalau tidak, zone id dicari dari nama domain — dan itu menambah satu syarat pada
token: `Zone:Read`. Dengan zone id terpasang, token yang hanya punya `DNS:Edit`
sudah cukup.

Skrip membaca token dari environment dan tidak pernah mencetaknya, tidak pernah
menuliskannya ke file, dan tidak pernah menerimanya sebagai argumen di command
line tempat ia akan tercatat di shell history maupun terlihat di `ps`.

## Yang dilindungi, dan kenapa

Zone ini tidak hanya melayani website. Record apex mengarah ke GitHub Pages
lewat Cloudflare, dan TXT-nya memuat SPF yang mendelegasikan email ke Hostinger
plus dua string site-verification. Salah hapus di sini tidak menghasilkan error
build — situs atau email perusahaan hilang dari internet, dan satu-satunya
gejalanya adalah hal-hal berhenti sampai.

| Record | Akibat kalau dihapus |
|---|---|
| apex `A`/`AAAA`/`CNAME` | situs mati |
| `MX` | email perusahaan mati |
| `TXT` dengan `v=spf1` | email keluar masuk spam |
| `TXT` dengan `v=dkim1` / `v=dmarc1` | penandatanganan dan kebijakan email rusak |
| `TXT` `site-verification` | properti Search Console perlu diverifikasi ulang, dan itu tidak instan |

Operasi `delete` dan `update` pada record di atas **ditolak** kecuali diberi
`--force-protected`. Record lain (misalnya `_acme-challenge`, CNAME subdomain)
tidak dipagari.

## Dua lapis konfirmasi

Setiap perubahan mencetak dulu apa yang akan dilakukan, lalu berhenti. `--yes`
adalah langkah konfirmasinya — jalankan ulang perintah yang sama setelah baris
yang tercetak terlihat benar. Operasi baca tidak butuh apa pun.

`delete` hanya menerima satu record. Kalau polanya cocok ke beberapa record,
skrip menampilkan semuanya dan berhenti alih-alih menebak mana yang kamu maksud.

## Verifikasi Search Console

```bash
npm run dns -- verify-google "google-site-verification=<string dari Google>" --yes
```

Google mengizinkan beberapa TXT verifikasi berdampingan, jadi menambah satu
tidak menghapus yang lama — skrip menyebutkan berapa yang sudah ada supaya jelas
tidak ada yang perlu dihapus lebih dulu.

Verifikasi **tidak mengambil data ke belakang**: Search Console mulai
mengumpulkan sejak properti diverifikasi, bukan sejak situs dibuat.
