---
title: "Menentukan Rasio DC AC Inverter untuk Pabrik Kelapa Sawit"
description: "Panduan menentukan rasio DC AC inverter pabrik kelapa sawit: variabel penentu, contoh perhitungan bertahap, dan checklist data desain."
focusKeyphrase: "rasio dc ac inverter pabrik kelapa sawit"
pubDate: "2026-10-03"
tags: ["kelapa-sawit", "desain-sistem", "plts", "teknis"]
draft: true
---

Menentukan ukuran sistem PLTS di pabrik kelapa sawit tidak dimulai dari luas atap, melainkan dari tiga variabel: profil beban harian, kapasitas titik interkoneksi, dan target kontribusi energi surya. Dari ketiganya, satu keputusan teknis yang paling sering menahan proyek adalah rasio DC AC inverter pabrik kelapa sawit. Rasio ini membandingkan kapasitas puncak modul dalam kWp dengan kapasitas keluaran inverter dalam kW AC. Terlalu konservatif, biaya inverter membengkak; terlalu agresif, produksi energi terpotong pada hari cerah.

Pertanyaan ini tidak bisa dijawab dengan template bangunan komersial. Stasiun sterilizer, press, klarifikasi, dan kernel berjalan dengan motor induksi berdaya besar. Beban itu relatif stabil sepanjang shift siang dan jarang turun mendadak. Karakter beban seperti ini menggeser titik optimal rasio DC/AC.

## Variabel yang Menentukan Ukuran Sistem

- Profil beban siang: daya rata-rata dan daya puncak pada tiap jam operasional.
- Titik interkoneksi PLN: daya terpasang, kapasitas trafo, dan kuota PLTS atap yang tersedia.
- Jam matahari puncak (peak sun hours) di lokasi pabrik.
- Luas dan orientasi area pemasangan, termasuk bayangan dari boiler, silo, dan menara.
- Target kontribusi energi surya terhadap konsumsi listrik tahunan.
- Skema bisnis yang dipilih: kepemilikan sendiri, BOO, atau BOT.

Satu variabel sering diabaikan, yaitu kuota interkoneksi. Pemasangan PLTS atap kini tunduk pada kuota PLN yang tersedia, bukan lagi otomatis 100% dari daya terpasang pelanggan. Karena itu, besaran rasio DC/AC harus dicek bersamaan dengan izin interkoneksinya.

## Dari Profil Beban ke Kapasitas Inverter

Rasio DC/AC adalah angka pembanding antara kapasitas puncak larik modul dan kapasitas keluaran sisi AC inverter. Pada sistem PLTS industri, rentang yang lazim dipakai adalah 1,1 sampai 1,35. Angka 1,2 berarti setiap 1 kW keluaran inverter disuplai oleh 1,2 kWp modul.

Rasio yang lebih tinggi menurunkan biaya inverter per kWp, tetapi menaikkan peluang clipping saat radiasi puncak. Rasio yang lebih rendah membuat keluaran lebih linear, namun inverter berjalan jauh di bawah kapasitas pada sebagian besar waktu. Untuk pabrik kelapa sawit, beban siang yang tinggi dan kontinu membuat energi PLTS hampir seluruhnya terserap di tempat, sehingga sebagian risiko clipping dapat ditoleransi.

Perlu dicatat, clipping dan pembatasan ekspor adalah dua hal berbeda. Clipping terjadi di sisi inverter, sedangkan pembatasan ekspor berasal dari kuota interkoneksi. Keduanya harus dihitung terpisah sebelum rasio ditetapkan.

## Contoh Perhitungan Bertahap

Angka di bawah ini adalah asumsi yang dapat diganti dengan data aktual pabrik. Metodenya tetap sama.

1. Beban rata-rata siang: 500 kW, beban puncak 700 kW, durasi beban siang 6 jam.
2. Target energi dari PLTS: 500 kW × 6 jam = 3.000 kWh per hari.
3. Jam matahari puncak lokasi (asumsi): 4,2 jam. Kapasitas modul = 3.000 ÷ 4,2 ≈ 714 kWp, dibulatkan menjadi 720 kWp.
4. Pilih rasio DC/AC 1,2. Kapasitas AC inverter = 720 ÷ 1,2 = 600 kW, misalnya dua unit inverter 300 kW.
5. Rasio terpasang = 720 kWp ÷ 600 kW AC = 1,2.
6. Produksi tahunan (asumsi 300 hari operasi) = 3.000 kWh × 300 = 900.000 kWh.

Dengan faktor emisi grid rata-rata Indonesia sekitar 0,87 kg CO2 per kWh (perkiraan), produksi 900.000 kWh setara pengurangan sekitar 783 ton CO2 per tahun. Angka ini berguna sebagai baseline pelaporan ESG internal.

Pada rentang CAPEX PLTS 1 MWp di Indonesia Rp 9–13 miliar, sistem 720 kWp setara sekitar Rp 6,5–9,4 miliar. Modul menyumbang sekitar 40% dari total, sehingga porsi modul berada di kisaran Rp 2,6–3,8 miliar. OPEX dapat diperkirakan proporsional dari contoh 1 MWp dengan OPEX Rp 220 juta per tahun, yaitu sekitar Rp 158 juta per tahun.

Jika rasio dinaikkan menjadi 1,35, kapasitas AC turun menjadi sekitar 533 kW dan biaya inverter berkurang. Konsekuensinya, eksposur clipping meningkat pada jam radiasi puncak. Uji dua atau tiga skenario rasio sebelum mengunci desain.

## Kepatuhan Interkoneksi dan TKDN

Permen ESDM No. 2 Tahun 2024 mengubah cara perencanaan kapasitas PLTS atap. Pemasangan tidak lagi dibatasi 100% dari daya terpasang pelanggan PLN, melainkan mengikuti kuota yang tersedia. Rujukan resminya dapat dibaca di [JDIH Kementerian ESDM](https://jdih.esdm.go.id/).

Untuk sisi pengadaan, [panel surya dengan TKDN minimal 40%](/produk/sistem-panel-surya/panel-surya/panel-tkdn/) membantu memenuhi syarat komponen dalam negeri. SonusHUB sebagai marketplace B2B/B2G material kelistrikan menargetkan TKDN minimal 40% dan terintegrasi dengan fitur ListriQu di aplikasi PLN Mobile.

## Skema Bisnis dan Dampaknya pada Rasio

- BOO (Build Own Operate): aset PLTS tetap milik solar developer seterusnya, sehingga harga jual listrik cenderung paling murah.
- BOT (Build Operate Transfer): aset milik developer selama masa kontrak, lalu menjadi milik pemilik pabrik.
- Kepemilikan sendiri: CAPEX ditanggung pabrik, seluruh penghematan dan pengurangan emisi masuk ke pembukuan sendiri.

Pada skema BOO, pihak yang menanggung biaya inverter adalah developer. Karena itu, rasio yang lebih tinggi umumnya lebih disukai selama clipping masih terkendali. Pada skema kepemilikan sendiri, keputusan rasio sebaiknya mengikuti target produksi energi, bukan semata menekan CAPEX awal.

## Checklist Data Sebelum Menentukan Rasio DC AC Inverter Pabrik Kelapa Sawit

1. Data log beban listrik interval 15 atau 30 menit, minimal 12 bulan terakhir.
2. Kurva beban hari kerja, hari panen puncak, dan hari berhenti operasi.
3. Daya terpasang PLN, kapasitas trafo, dan kuota PLTS atap yang tersedia.
4. Denah atap atau lahan: luas, kemiringan, orientasi, dan peta bayangan.
5. Data radiasi matahari lokasi (GHI) dari pengukuran atau sumber satelit.
6. Rencana pendanaan: CAPEX sendiri, BOO, atau BOT.
7. Target ESG dan baseline emisi listrik tahunan pabrik.
8. Rencana O&M dan ketersediaan tim teknisi di lokasi.

Delapan item itu cukup untuk menyusun studi kelayakan dan menetapkan rasio DC AC inverter pabrik kelapa sawit secara berbasis data, bukan perkiraan. Tim [layanan EPC sistem tenaga surya](/layanan/sistem-tenaga-surya-epc/) kami dapat menghitungnya berdasarkan profil beban aktual pabrik Anda. Untuk pabrik yang ingin menggabungkan PLTS dengan efisiensi sisi beban, [layanan manajemen energi](/layanan/manajemen-energi/) melengkapinya.

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
