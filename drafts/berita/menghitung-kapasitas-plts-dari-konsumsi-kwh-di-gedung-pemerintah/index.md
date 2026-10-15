---
title: "Menghitung Kapasitas PLTS dari Konsumsi kWh di Gedung Pemerintah"
seoTitle: "Kapasitas PLTS dari kWh untuk Gedung Negara"
description: "Panduan menghitung kapasitas PLTS gedung pemerintah dari data konsumsi kWh, lengkap dengan contoh perhitungan, estimasi CAPEX, dan checklist data desain."
focusKeyphrase: "kapasitas plts gedung pemerintah"
pubDate: "2026-10-03"
tags: ["b2g", "desain-sistem", "plts", "teknis"]
draft: true
---

Ukuran sistem PLTS atap pada gedung pemerintah tidak ditentukan oleh luas atap saja, melainkan oleh seberapa besar konsumsi listrik yang bisa digeser ke siang hari. Ada empat variabel utama yang perlu dihitung lebih dulu: konsumsi kWh bulanan, profil beban harian, iradiasi matahari setempat, dan kuota daya yang tersedia dari PLN. Artikel ini membahas cara menentukan kapasitas PLTS gedung pemerintah dari data konsumsi kWh, mulai dari rumus hingga estimasi anggarannya.

## Variabel Penentu Ukuran Sistem

Konsumsi kWh bulanan adalah titik awal, tetapi angka itu harus dipecah menjadi pola harian. PLTS tanpa baterai hanya mampu mengimbangi beban yang berjalan saat matahari bersinar. Karena itu, porsi konsumsi pukul 08.00–16.00 menjadi dasar perhitungan, bukan total konsumsi bulanan.

Beberapa variabel berikut wajib dipastikan sebelum menghitung kapasitas:

- **Profil beban siang hari.** Berapa kWh yang benar-benar terpakai selama PLTS berproduksi.
- **Iradiasi matahari (peak sun hours).** Bergantung lokasi; di banyak wilayah Indonesia berkisar 4–5 jam setara matahari penuh per hari.
- **Performance ratio (PR).** Rasio energi aktual terhadap potensi teoritis, umumnya 0,75–0,85 akibat rugi kabel, inverter, panas, dan bayangan.
- **Kuota PLN dan daya terpasang.** Pemasangan kini tunduk pada kuota yang tersedia dari PLN, bukan lagi batas 100% daya terpasang.
- **Luas atap efektif.** Area yang bebas bayangan, arah hadapnya tepat, dan struktur penopangnya memadai.

Jika data logging belum tersedia, lakukan pengukuran sementara dengan power logger selama dua sampai empat minggu. Pengukuran ini memisahkan beban siang dan malam secara aktual, sehingga kapasitas tidak dihitung dari asumsi semata.

## Menghitung Kapasitas PLTS Gedung Pemerintah dari Konsumsi kWh

Rumus dasarnya sederhana: kapasitas sistem (kWp) sama dengan energi harian yang ingin digeser (kWh) dibagi hasil kali peak sun hours dan performance ratio. Angka yang keluar adalah perkiraan awal, bukan desain final. Simulasi produksi per jam tetap diperlukan untuk memastikan profil beban dan profil produksi bertemu.

Gunakan PR 0,8 sebagai asumsi konservatif bila data pengukuran belum tersedia. Nilai ini mewakili susut kabel, konversi inverter, kenaikan suhu modul, dan bayangan parsial. Efisiensi sistem PLTS sendiri dihitung sebagai (energi listrik yang dihasilkan ÷ energi surya yang diterima panel) × 100%, dan dipengaruhi kualitas modul, panjang serta ukuran kabel, sudut pemasangan, dan shading.

## Contoh Perhitungan Bertahap untuk Gedung 60.000 kWh per Bulan

Asumsi yang dipakai: konsumsi 60.000 kWh per bulan, 60% beban terjadi pada siang hari, peak sun hours 4,5 jam, PR 0,8, dan kebutuhan atap 6 m² per kWp.

1. Konsumsi harian: 60.000 kWh ÷ 30 hari = 2.000 kWh per hari.
2. Porsi beban siang: 60% × 2.000 kWh = 1.200 kWh per hari.
3. Energi setara per kWp per hari: 4,5 jam × 0,8 = 3,6 kWh/kWp.
4. Kapasitas awal: 1.200 kWh ÷ 3,6 kWh/kWp ≈ 333 kWp.
5. Produksi tahunan: 333 kWp × 3,6 kWh/kWp × 365 hari ≈ 437.500 kWh.
6. Luas atap: 333 kWp × 6 m² ≈ 2.000 m² area efektif.
7. Reduksi emisi: 437.500 kWh × 0,87 kg CO₂/kWh ≈ 380 ton CO₂ per tahun (perkiraan).

Hasil 333 kWp adalah titik awal, bukan angka final. Jika kuota PLN di lokasi hanya tersedia 250 kWp, kapasitas mengikuti kuota dan target penggeseran beban disesuaikan. Sebaliknya, bila beban siang lebih besar, kapasitas bisa naik tanpa menambah luas atap melalui modul yang lebih efisien.

## Estimasi CAPEX dan OPEX

CAPEX PLTS 1 MWp di Indonesia berada di kisaran Rp 9-13 miliar pada rentang 2024-2025. Artinya biaya per kWp berkisar Rp 9 juta hingga Rp 13 juta. Untuk sistem 333 kWp, estimasi CAPEX berada di kisaran Rp 3 miliar hingga Rp 4,3 miliar sebelum penyesuaian lokasi dan struktur atap.

Modul surya menyumbang sekitar 40% dari total CAPEX sistem 1 MW. Pada skala 333 kWp, komponen modul mewakili sekitar Rp 1,2 miliar hingga Rp 1,7 miliar. Sisanya terbagi ke inverter, kabel, struktur penopang, dan pekerjaan instalasi.

Angka tersebut merupakan estimasi proporsional dari acuan 1 MWp. Pada praktiknya, sistem berukuran lebih kecil bisa memiliki biaya per kWp yang lebih tinggi karena komponen biaya tetap seperti desain, perizinan, dan mobilisasi.

OPEX mengikuti skala sistem. Sebagai acuan, PLTS 1 MWp membutuhkan OPEX sekitar Rp 220 juta per tahun, sehingga sistem 333 kWp setara sekitar Rp 73 juta per tahun. Angka ini mencakup pembersihan modul, inspeksi kelistrikan, dan penggantian komponen minor.

## Skema Pendanaan: BOO, BOT, atau Beli Sendiri

Gedung pemerintah yang ingin menghindari belanja modal awal dapat mempertimbangkan skema pihak ketiga. Pada BOO (Build Own Operate), aset PLTS tetap milik solar developer seterusnya dan harga jual listriknya cenderung paling murah. Pada BOT (Build Operate Transfer), aset menjadi milik pemilik gedung setelah masa kontrak berakhir.

Pilihan skema memengaruhi cara perhitungan kelayakan. Pada BOO, tolok ukurnya adalah tarif listrik per kWh dibandingkan tarif PLN. Pada BOT atau kepemilikan sendiri, tolok ukurnya adalah CAPEX, OPEX, dan periode pengembalian modal. Bahas opsi ini bersama tim [manajemen energi](/layanan/manajemen-energi/) sebelum mengunci struktur anggaran tahunan.

Saat mengevaluasi penawaran, mintalah rincian komponen biaya dan asumsi produksi yang dipakai. Asumsi produksi yang terlalu optimistis akan membuat periode pengembalian terlihat lebih cepat daripada realisasinya.

## Menyinkronkan Desain dengan Kuota PLN dan TKDN

Permen ESDM No. 2 Tahun 2024 mengubah cara pandang kapasitas PLTS atap. Pemasangan tidak lagi dibatasi 100% dari daya terpasang pelanggan PLN, melainkan tunduk pada kuota yang tersedia. Rujukan resminya dapat dilihat di [JDIH Kementerian ESDM](https://jdih.esdm.go.id/).

Konsekuensinya, perhitungan teknis harus divalidasi dengan ketersediaan kuota di titik penyambungan. Sistem yang layak secara teknis bisa tertunda jika kuota wilayah tersebut sudah terpakai. Karena itu, ajukan permohonan kuota sedini mungkin, paralel dengan penyusunan desain.

Dari sisi komponen, kebijakan TKDN memengaruhi pilihan modul dan inverter. SonusHUB menargetkan material kelistrikan dengan TKDN minimal 40%, termasuk melalui [panel surya TKDN](/produk/sistem-panel-surya/panel-surya/panel-tkdn/) yang terverifikasi.

## Checklist Data Sebelum Desain

Siapkan dokumen berikut agar proses desain berjalan sekali jalan:

- Tagihan listrik 12 bulan terakhir, mencakup kWh dan kVA tersambung.
- Data logging beban per 15 menit atau 1 jam selama minimal dua minggu.
- Single line diagram kelistrikan dan kapasitas trafo atau panel existing.
- Denah atap, orientasi, kemiringan, serta analisis bayangan bangunan sekitar.
- Konfirmasi ketersediaan kuota PLN di titik penyambungan.
- Rencana titik interkoneksi dan lokasi penempatan inverter.
- Target pengurangan emisi atau indikator ESG yang ingin dilaporkan.
- Rencana pemeliharaan, anggaran OPEX, dan penanggung jawab operasional.

Data di atas memangkas risiko desain ulang dan mempercepat proses pengadaan. Perhitungan kapasitas PLTS gedung pemerintah yang akurat menjaga sistem tetap selaras dengan kuota, anggaran, dan target ESG. Untuk menyusun angka awal dari data konsumsi Anda, tim [EPC sistem tenaga surya](/layanan/sistem-tenaga-surya-epc/) Solar Nusantara siap membantu.

---

**Solar Nusantara** berfokus pada pengembangan solusi energi surya untuk sektor komersial dan industri. Kami membantu perusahaan merancang sistem photovoltaic yang efisien dan berkelanjutan.

Untuk implementasi proyek, Anda dapat mengunjungi [**Sonus EPC**](https://sonus-epc.id), yang menyediakan layanan EPC (Engineering, Procurement, and Construction) untuk pemasangan sistem panel surya. Sementara itu, [**SonusHUB**](https://sonushub.id) hadir sebagai platform B2B yang menyediakan berbagai material kelistrikan dan komponen energi terbarukan bagi kebutuhan proyek dan instalasi profesional.

<div class="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8">
  <a
    href="https://wa.me/6282180000575"
    target="_blank"
    rel="noopener noreferrer"
    class="no-underline w-full sm:w-auto bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 px-8 rounded-xl text-lg text-center flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="text-green-400"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413z"/></svg>
    <span>Diskusi via WhatsApp</span>
  </a>
  <a
    href="mailto:admin@solar-nusantara.id"
    class="no-underline w-full sm:w-auto bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 px-8 rounded-xl text-lg text-center flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="text-blue-400"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg>
    <span>Kirim RFQ via Email</span>
  </a>
</div>
