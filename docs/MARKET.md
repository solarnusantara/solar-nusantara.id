# Pasar yang dituju artikel

**Tujuan utama: membawa trafik ke https://sonushub.id/.** Artikel ditaruh di solar-nusantara.id,
tetapi tugasnya mengantar pembeli ke katalog SonusHUB. Karena itu setiap artikel wajib memuat
tautan ke sonushub.id (bagian 5), dan produk yang dibahas adalah persis produk yang dijual di sana.

Ditulis 2026-10-12, dari analisis ulang berkas internal "Target Market dan Produk
SonusHUB". Repo ini **publik**, jadi dokumen ini sengaja hanya memuat bentuk pasarnya:
siapa yang membeli, apa yang dibeli, dan apa artinya bagi topik. Nilai target per
segmen, nama calon klien, bauran penjualan per produk, dan syarat pembayaran tetap di
berkas internal dan **tidak boleh** masuk repo, prompt, maupun artikel.

---

## 1. Temuan yang mengubah matriks topik

Matriks lama menulis untuk **pemilik bangunan**: 14 jenis gedung (hotel, rumah sakit,
mall...) × 9 pertanyaan ("berapa biaya PLTS untuk hotel"). Berkas pasar menunjukkan
SonusHUB menjual **material**, dan pembelinya adalah bisnis yang membeli untuk sebuah
proyek atau pabrik. Pembacanya bagian pengadaan, project manager, atau direksi, yang
sedang membandingkan spesifikasi dan pemasok, bukan memutuskan apakah akan memasang PLTS.

Artikel lama masih benar sebagai artikel; ia hanya ditulis untuk pembaca yang bukan
pembeli kita. Itu sebabnya 100 artikel lama berstatus `legacy` (lihat bagian 4).

## 2. Siapa yang membeli

Urutan di bawah mengikuti seberapa besar rencana penjualan yang dipikulnya dan seberapa
dekat ia ke pesanan pembelian. Urutan inilah isi `priority` pada `BUYERS` di
`scripts/plan-topics.mjs`.

| Pembeli | Membeli apa | Catatan untuk isi artikel |
|---|---|---|
| Kontraktor EPC PLTS | material penyeimbang sistem (BOS), lalu modul dan inverter | terbesar dan paling dekat ke PO; peduli lead time, dokumen, margin |
| Developer energi terbarukan | material utama, kabel, mounting | skala besar; peduli garansi dan kemampuan pasok |
| Industri manufaktur | semua material | ekspor, FMCG, farmasi, kayu, otomotif, garmen dan tekstil; peduli ESG rantai pasok dan keandalan |
| Pengelola kawasan industri | semua material | satu keputusan untuk banyak tenant; model label putih |
| Proyek pemerintah | material lewat pengadaan | peduli TKDN, kelengkapan dokumen, tata cara pengadaan |
| Kontraktor MEP dan konstruksi | material untuk proyek bangunan | menengah-besar, berbadan usaha dan PKP |
| Properti komersial dan ritel | semua material | hotel, mall, perkantoran, jaringan ritel |

Asosiasi (energi dan industri) ada di berkas pasar sebagai **saluran rujukan**, bukan
sebagai pembaca pencarian, jadi tidak menjadi sumbu topik.

Kesamaan semuanya: badan usaha, PKP, skala menengah-besar, dan penerima keputusannya
procurement, project manager, atau C-level. Itu yang dipakai sebagai "pembaca" di prompt.

## 3. Apa yang dibeli

Delapan produk SonusHUB, urut menurut kontribusi penjualan (dipakai sebagai `priority` pada `PRODUCTS`):

1. mounting rel (terbesar, berbasis proyek)
2. modul surya (PV)
3. walkway dan cable tray
4. inverter
5. kabel DC
6. kabel AC
7. maintenance dan cleaning (layanan)
8. proyek (layanan)

Kabel DC dan AC dipisah karena di SonusHUB keduanya kategori tersendiri dan dicari dengan cara berbeda.

## 4. Matriks topik yang baru

**7 pembeli × 8 produk = 56 pilar**, masing-masing dengan 4 artikel turunan
(`spesifikasi`, `perbandingan`, `pengadaan`, `mutu`), total **280 topik**.

Angka itu disengaja kecil. Publikasi 4 artikel seminggu, jadi 280 topik sudah sekitar
**70 minggu** antrean. Rencana 1000 topik berarti empat tahun antrean, dan janji yang tidak
akan ditepati. Tambahkan produk atau pembeli di `plan-topics.mjs` setelah batch pertama
menunjukkan apa yang berhasil.

Cara membaca satu topik: `epc--mounting-rel--perbandingan` = pembeli *kontraktor EPC*,
produk *mounting rel*, sudut *perbandingan*. Kata kunci = `<stem> <kata kunci pembeli>`,
sehingga unik secara struktural.

Artikel dari matriks lama tetap ada di disk dan di situs. Barisnya di `topics.json`
berstatus `legacy`: tidak masuk antrean, tidak pernah diterbitkan jadwal, dan tidak
diberi hero oleh pipeline. Empat yang sudah tayang tetap tayang.

## 5. Ke mana artikel mengarahkan pembaca

Sumber tunggalnya `scripts/lib/sonushub.mjs`. Tiap topik membawa halaman SonusHUB untuk produknya
(`sonushubLink` di `topics.json`), dan artikelnya wajib memuat **minimal dua tautan ke sonushub.id,
dua alamat berbeda**: halaman produk itu, dan satu halaman umum (beranda, katalog, kategori, atau
kalkulator) di bagian penutup sebagai ajakan.

| Produk | Halaman SonusHUB |
|---|---|
| mounting rel | /category/mnt-pv-rail-mounting-hardware-sh |
| walkway dan tray | /category/cable-trays-trunking-fittings-cr |
| kabel DC | /category/crx-dc-pv-cable-sh |
| kabel AC | /category/crx-ac-power-cable-sh |
| modul surya | /category/pvx-solar-modules-sh |
| inverter | /category/inx-string-hybrid-inverters-sh |
| maintenance dan cleaning | /products (sementara; kategorinya akan ditambahkan, lihat di bawah) |
| proyek | /kalkulator-panel-surya (belum ada kategori) |

**Maintenance dan cleaning.** SonusHUB akan menambahkan kategorinya. Sampai alamatnya ada,
produk ini memakai `/products`. Begitu kategorinya aktif: (1) buka halamannya dan catat alamat
persisnya, (2) ganti baris `perawatan` di `SONUSHUB_PRODUCT` pada `scripts/lib/sonushub.mjs`,
(3) jalankan `npm run plan-topics`. Artikel yang sudah ditulis tetap menautkan alamat lama, jadi
ganti juga tautannya bila sudah ada yang terbit.

**Proyek** juga belum punya kategori; sementara memakai `/kalkulator-panel-surya`.

**Mengapa daftar putih, bukan "tautan apa pun ke sonushub.id".** sonushub.id merender daftar
produknya di peramban, sehingga alamat karangan seperti `/category/xyz` bisa menjawab 200 dan tetap
halaman kosong. Memeriksa tautan lewat HTTP bukan bukti alamatnya nyata, jadi gate SEO menolak
setiap alamat sonushub.id yang tidak ada di daftar.

### Parameter pelacakan (UTM)

Setiap tautan ke sonushub.id diberi parameter UTM oleh skrip saat file artikel dirakit, supaya
analitik sonushub.id bisa membedakan kunjungan dari tiap artikel, bukan menggabungnya sebagai
"referral dari solar-nusantara.id".

| Parameter | Isi | Menjawab |
|---|---|---|
| `utm_source` | `solar-nusantara.id` | dari mana |
| `utm_medium` | `artikel` | jenis sumber |
| `utm_campaign` | produk (`mounting-rel`, `kabel-dc`, ...) | permintaan akan produk apa |
| `utm_content` | slug artikel | artikel yang mana |
| `utm_term` | `isi` atau `cta` | tautan di dalam teks, atau di blok CTA penutup |

Parameter dibuat skrip, bukan model: model yang diminta menulis UTM menghasilkan variasi yang
tidak seragam, dan gate lalu harus mengizinkannya. Gate menilai alamat tanpa parameter, jadi
satu halaman tetap satu halaman. Artikel lama (sebelum matriks ini) belum diberi UTM.

Tautan otoritatif keluar (regulator, lembaga standar) kini **boleh tetapi tidak wajib**: tautan
keluar yang dimaksud artikel ini adalah ke SonusHUB, dan mewajibkan kutipan regulator di artikel
tentang rel mounting hanya mengundang kutipan karangan.

## 6. Yang tidak ditulis artikel

- **Merek produk tertentu.** Artikel membandingkan kategori dan spesifikasi. Gate fakta
  memberi peringatan bila sebuah merek disebut; peringatan itu dicetak di log generate dan
  tidak menahan artikel.
- **Harga satuan, nama calon klien, syarat pembayaran perusahaan.** Aturan 11 di prompt.
- **Nomor standar yang tidak pasti.** Aturan 12: bila ragu, sebut jenis standarnya, bukan
  nomornya. Gate fakta hanya memeriksa regulasi Indonesia yang ada di daftar putihnya, jadi
  nomor standar (IEC, SNI, EN) tidak dijaga gate mana pun. Tidak ada review sebelum
  terbit, jadi cek sendiri artikel yang sudah tayang (lihat `docs/AUTOMATION.md` bagian 4).
