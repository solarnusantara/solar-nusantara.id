---
title: "Segmen C & I"
description: "Layanan EPC PLTS SONUS untuk segmen komersial dan industri: rancang bangun, pengadaan, dan konstruksi sistem tenaga surya skala bisnis."
faq:
  - q: "Apa saja yang tercakup dalam layanan EPC SONUS untuk segmen C&I?"
    a: "Layanan mencakup desain, engineering, pengadaan, konstruksi, commissioning, dan pemeliharaan sistem Solar PV. SONUS menawarkan turnkey solution, yaitu pengadaan, pembangunan, hingga commissioning dalam satu paket. Tim SONUS bekerja langsung dengan klien untuk memahami kebutuhan khusus. Pengalaman proyeknya meliputi sektor manufaktur, kesehatan, hospitality, dan industri lainnya."
  - q: "Berapa biaya PLTS 100 kWp untuk pabrik manufaktur?"
    a: "Untuk sistem on-grid tanpa baterai, estimasi CAPEX berada di kisaran Rp 900 juta sampai Rp 1,3 miliar, setara sekitar Rp 9 juta hingga Rp 13 juta per kWp. Biaya operasional tahunan diperkirakan sekitar Rp 22 juta. Semua angka ini perkiraan proporsional untuk anggaran awal, bukan penawaran; angka presisi diperoleh setelah survei lokasi."
  - q: "Skema kepemilikan apa yang umum dipertimbangkan pabrik?"
    a: "Tiga skema yang umum dipertimbangkan adalah CAPEX penuh, BOO (Build Own Operate), dan BOT (Build Operate Transfer). Pada CAPEX penuh perusahaan memiliki aset sejak awal. Pada BOO aset tetap milik developer seterusnya, dan pada BOT aset menjadi milik pemilik gedung setelah masa kontrak berakhir. Pilihan skema memengaruhi harga dan pencatatan biaya energi."
  - q: "Data apa yang perlu disiapkan sebelum survei lokasi?"
    a: "Siapkan tagihan listrik 12 bulan terakhir untuk melihat pola konsumsi siang hari, serta informasi luas atap dan daya dukung strukturnya. Dari dua data itu tim teknis memperkirakan rasio pemakaian sendiri dan kapasitas yang benar-benar dibutuhkan. Ketersediaan kuota PLN juga perlu diperiksa karena memengaruhi jadwal dan kapasitas akhir proyek."
  - q: "Apakah SONUS pernah mengerjakan proyek C&I berskala besar?"
    a: "Ya. Salah satunya PLTS atap sekitar 3,9 MWp di Otsuka, Sukabumi, Jawa Barat, dengan lingkup EPC penuh pada 2024 sampai 2025. Atapnya berjenis logam dan dibagi dua paket, 1,35 MWp dan 2,51 MWp. Survei lokasi dilakukan pada 11 September 2024, dan material dikirim bertahap dari Jakarta."
---

<div class="slider-with-nav">
  <!-- Inputs -->
  <input type="radio" name="slider" id="s1" checked>
  <input type="radio" name="slider" id="s2">
  <input type="radio" name="slider" id="s3">
  <input type="radio" name="slider" id="s4">

  <!-- Slides -->
  <div class="slide" id="slide1">
    <img src="/images/layanan/image.png" alt="Teknisi SONUS memasang panel surya di atap pabrik berpanel logam" width="810" height="537">
  </div>
  <div class="slide" id="slide2">
    <img src="/images/layanan/image-1.png" alt="Dua teknisi berhelm mengangkat modul surya saat pemasangan di atap gedung" width="810" height="537">
  </div>
  <div class="slide" id="slide3">
    <img src="/images/layanan/image-2.png" alt="Tampak atas teknisi memeriksa deretan panel surya yang terpasang di atap" width="810" height="537">
  </div>
  <div class="slide" id="slide4">
    <img src="/images/layanan/image-3.png" alt="Tampak udara PLTS atap dengan barisan panel surya di atap pabrik" width="810" height="537">
  </div>

  <!-- Navigation -->
  <div class="nav" id="nav1">
    <label for="s4" class="prev">&lsaquo;</label>
    <label for="s2" class="next">&rsaquo;</label>
  </div>
  <div class="nav" id="nav2">
    <label for="s1" class="prev">&lsaquo;</label>
    <label for="s3" class="next">&rsaquo;</label>
  </div>
  <div class="nav" id="nav3">
    <label for="s2" class="prev">&lsaquo;</label>
    <label for="s4" class="next">&rsaquo;</label>
  </div>
  <div class="nav" id="nav4">
    <label for="s3" class="prev">&lsaquo;</label>
    <label for="s1" class="next">&rsaquo;</label>
  </div>
</div>

<style>
.slider-with-nav {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.slider-with-nav input { display: none; }

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
  transition: opacity .5s ease-in-out;
}
.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: none;
  justify-content: space-between;
  padding: 0 1rem;
  box-sizing: border-box;
  z-index: 2;
}
.nav label {
  cursor: pointer;
  font-size: 2.5rem;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.6);
  background-color: rgba(0,0,0,0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  line-height: 35px;
  text-align: center;
  user-select: none;
  transition: background-color .2s;
}
.nav label:hover {
  background-color: rgba(0,0,0,0.5);
}

/* Show the active slide and its nav */
#s1:checked ~ #slide1, #s1:checked ~ #nav1 { opacity: 1; display: flex; pointer-events: auto; z-index: 1; }
#s2:checked ~ #slide2, #s2:checked ~ #nav2 { opacity: 1; display: flex; pointer-events: auto; z-index: 1; }
#s3:checked ~ #slide3, #s3:checked ~ #nav3 { opacity: 1; display: flex; pointer-events: auto; z-index: 1; }
#s4:checked ~ #slide4, #s4:checked ~ #nav4 { opacity: 1; display: flex; pointer-events: auto; z-index: 1; }
</style>

**Selamat datang di SONUS — penyedia solusi EPC Solar PV untuk segmen korporasi dan industri.**

SONUS menghadirkan layanan lengkap mulai dari desain, engineering, konstruksi, hingga maintenance sistem Solar PV. Tim kami bekerja langsung dengan klien untuk memahami kebutuhan khusus dan menghadirkan solusi yang efisien, hemat energi, dan sesuai tujuan bisnis.

Kami berpengalaman menyediakan **turnkey solution**: pengadaan, pembangunan, hingga commissioning. Dengan manajemen proyek yang kuat, kami memastikan setiap instalasi selesai tepat waktu, aman, dan memenuhi standar kualitas tertinggi.

Kami telah menyelesaikan berbagai proyek Solar PV di sektor manufaktur, kesehatan, hospitality, dan industri lainnya—dengan solusi yang disesuaikan untuk menghasilkan penghematan energi maksimal dan dampak lingkungan minimal.

Di SONUS, keberlanjutan adalah prioritas. Sistem Solar PV kami membantu menekan emisi karbon, mengurangi biaya energi, dan meningkatkan nilai aset.

**Percayakan kebutuhan Solar PV Anda pada SONUS dan rasakan komitmen kami terhadap kualitas, inovasi, dan kepuasan pelanggan.**

## Studi Kasus: EPC PLTS Atap Otsuka, Sukabumi

Salah satu proyek EPC terbesar kami di segmen C & I adalah PLTS atap berkapasitas sekitar **3,9 MWp** di Otsuka, Sukabumi, Jawa Barat. Pekerjaan berlangsung pada 2024–2025 dengan lingkup EPC penuh: survei, pengadaan material, pengiriman, dan konstruksi.

| Item | Keterangan |
|---|---|
| Lokasi | Otsuka, Sukabumi, Jawa Barat |
| Kapasitas | Sekitar 3,9 MWp |
| Jenis atap | Atap logam, dua paket: 1,35 MWp dan 2,51 MWp |
| Lingkup | EPC (survei, pengadaan, pengiriman, konstruksi) |
| Periode | 2024–2025 |
| Survei lokasi | 11 September 2024 |

### Tantangan dan cara kami menanganinya

- **Skala logistik.** Material dikirim bertahap dari Jakarta ke Sukabumi: 9 kontainer modul PV dan 4 kontainer 40 ft, dengan forklift 5 ton di lokasi. Pengiriman tercatat hingga awal Mei 2025.
- **Kebutuhan kabel bertambah.** Pada April 2025 pengadaan kabel PV ditambah 25 km dan 6 km, dipasok bertahap.
- **Atap logam dua paket.** Pekerjaan dibagi menjadi paket 1,35 MWp dan 2,51 MWp.
