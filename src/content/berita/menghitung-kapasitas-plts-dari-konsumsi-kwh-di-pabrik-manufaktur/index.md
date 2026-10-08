---
title: "Menghitung Kapasitas PLTS dari Konsumsi kWh di Pabrik Manufaktur"
seoTitle: "Kapasitas PLTS dari kWh untuk Pabrik"
description: "Cara menghitung kapasitas PLTS pabrik manufaktur dari konsumsi kWh, contoh bertahap, plus checklist data sebelum desain dan penawaran."
focusKeyphrase: "kapasitas plts pabrik manufaktur"
pubDate: "2026-10-02"
tags: ["manufaktur", "desain-sistem", "plts", "teknis"]
draft: true
---

Menentukan kapasitas PLTS pabrik manufaktur tidak dimulai dari luas atap, melainkan dari profil konsumsi listrik. Tiga variabel pertama yang harus dibaca adalah total konsumsi kWh per bulan, pola beban harian, dan daya terpasang PLN di lokasi. Tanpa ketiganya, ukuran sistem hanya taksiran yang berisiko over-size atau kurang pas.

Pabrik manufaktur umumnya memiliki beban siang yang tinggi dan relatif stabil karena mesin produksi, kompresor, chiller, dan utilitas berjalan pada shift yang sama. Konsumsi kWh adalah basis energi, sedangkan daya terpasang adalah batas teknis. Artikel ini fokus pada cara menjembatani keduanya menjadi angka kWp yang bisa dieksekusi.

## Variabel yang Menentukan Kapasitas PLTS Pabrik Manufaktur

Enam variabel berikut menentukan besar sistem, dan urutannya tidak boleh ditukar.

- Konsumsi kWh per bulan dan rata-rata kWh per hari kerja.
- Profil beban per jam, khususnya porsi konsumsi pada pukul 08.00–16.00.
- Daya terpasang PLN serta kuota PLTS yang tersedia di lokasi.
- Luas atap atau lahan yang bebas bayangan sepanjang hari.
- Peak Sun Hours (PSH) lokal dan performance ratio sistem.
- Rencana penambahan beban produksi dalam tiga sampai lima tahun ke depan.

Dua variabel pertama menentukan energi target, sisanya menentukan berapa kWp yang dibutuhkan untuk memproduksi energi itu. Menarik data profil beban dari tagihan bulanan saja sering tidak cukup; [layanan manajemen energi](/layanan/manajemen-energi/) membantu mengambil data interval 15 menit agar pola shift terbaca jelas.

## Konsumsi kWh Tidak Otomatis Menjadi Kapasitas kWp

Energi bulanan yang besar sering disalahartikan sebagai izin memasang kapasitas yang setara besarnya. Padahal PLTS hanya dapat mengimbangi beban yang benar-benar berjalan saat matahari bersinar. Pabrik dengan konsumsi 300.000 kWh per bulan tetapi 70% bebannya di malam hari tidak akan menikmati manfaat penuh dari sistem berukuran besar.

Karena itu, dua pertanyaan wajib muncul dalam setiap perhitungan: berapa kWh yang jatuh pada jendela matahari, dan berapa kW beban puncak yang benar-benar simultan. Jawaban pertama menentukan kapasitas modul, jawaban kedua menentukan kapasitas inverter dan titik interkoneksi.

## Contoh Perhitungan Bertahap: dari Konsumsi kWh ke kWp

Angka berikut adalah ilustrasi dengan asumsi yang dinyatakan terbuka, bukan hasil audit lokasi.

1. Asumsikan konsumsi pabrik 300.000 kWh per bulan dengan 25 hari kerja. Konsumsi harian rata-rata = 300.000 ÷ 25 = 12.000 kWh.
2. Asumsikan 60% konsumsi terjadi pada jendela matahari pukul 08.00–16.00. Energi yang berpotensi dipasok PLTS = 12.000 × 60% = 7.200 kWh per hari.
3. Asumsikan PSH konservatif 4,0 jam per hari. Kapasitas DC ideal = 7.200 kWh ÷ 4,0 jam = 1.800 kWp.
4. Terapkan performance ratio 0,8 untuk rugi kabel, inverter, suhu, dan shading. Kapasitas terpasang = 1.800 ÷ 0,8 = 2.250 kWp atau 2,25 MWp.

Hasil 2,25 MWp adalah angka desain awal, bukan angka final.

Untuk estimasi produksi tahunan, gunakan rumus kWp × PSH × performance ratio × 365 hari. Dengan asumsi yang sama, setiap 1 MWp menghasilkan sekitar 1,17 juta kWh per tahun. Memakai faktor emisi grid Indonesia sekitar 0,87 kg CO2 per kWh sebagai perkiraan, 1 MWp menghindarkan sekitar 1.020 ton CO2 per tahun.

## Menyaring Hasil Hitung dengan Kuota PLN dan Regulasi

Angka 2,25 MWp masih harus diuji terhadap ketersediaan daya dan kuota PLN. Permen ESDM No. 2 Tahun 2024 mengubah aturan pemasangan PLTS atap: kapasitas tidak lagi dibatasi 100% dari daya terpasang pelanggan PLN, melainkan tunduk pada kuota PLN yang tersedia. Artinya, hasil perhitungan energi bisa lebih besar daripada kapasitas yang disetujui untuk diinterkoneksikan. Rujukan resmi regulasi ini dapat dilihat di [situs Kementerian ESDM](https://www.esdm.go.id/).

Konsekuensi praktisnya, desain sering dipecah menjadi beberapa tahap sesuai kuota yang tersedia. Untuk pabrik dengan lebih dari satu titik interkoneksi, [layanan EPC untuk segmen commercial dan industrial](/layanan/epc/segmen-ci/) biasanya memetakan titik mana yang paling siap dieksekusi lebih dulu.

Selain kuota, beban puncak pabrik menentukan kapasitas inverter yang layak. Sistem yang terlalu besar terhadap beban siang akan banyak mengekspor listrik, dan nilai ekonominya bergantung pada skema ekspor-impor yang berlaku. Karena itu, profil beban 15 menit selalu lebih berharga daripada angka kWh bulanan saja.

## Biaya, Skema Kepemilikan, dan Rantai Pasok

CAPEX PLTS 1 MWp di Indonesia berada di rentang Rp 9-13 miliar pada 2024-2025, dengan modul surya menyumbang sekitar 40% dari total. Contoh nyata di sektor industri: PLTS 1 MWp dengan CAPEX Rp 11 miliar dan estimasi OPEX Rp 220 juta per tahun. Sebagai asumsi ekstrapolasi linear, sistem 2,25 MWp membutuhkan investasi sekitar Rp 20-29 miliar sebelum penyesuaian engineering.

OPEX tahunan perlu masuk ke model bisnis sejak awal. Komponen OPEX tersebut sebaiknya dirinci bersama penyedia jasa, karena cakupan kontrak pemeliharaan berbeda-beda antarpenyedia. Penghematan dan payback period harus dihitung memakai tarif listrik aktual pabrik, bukan tarif rata-rata nasional.

Skema kepemilikan mengubah struktur biaya secara signifikan. Pada skema BOO (Build Own Operate), aset PLTS tetap milik solar developer seterusnya, sehingga harga jual listrik cenderung paling murah karena developer memegang aset jangka panjang. Pada skema BOT (Build Operate Transfer), aset milik developer selama masa kontrak lalu menjadi milik pemilik gedung.

Dari sisi pengadaan, TKDN menentukan kelayakan insentif dan keberterimaan pasar. SonusHUB menargetkan material kelistrikan dengan TKDN minimal 40%, dan komponen seperti [panel surya TKDN](/produk/sistem-panel-surya/panel-surya/panel-tkdn/) tersedia untuk memenuhi target tersebut.

## Checklist Data Sebelum Desain dan Penawaran

Sebelum desain dan penawaran dibuat, siapkan data berikut.

- Tagihan listrik PLN minimal 12 bulan terakhir, memuat kWh dan kVA.
- Data profil beban interval 15 menit atau minimal rekap harian per shift.
- Single line diagram, kapasitas trafo, dan titik interkoneksi yang diusulkan.
- Gambar atap atau lahan, jenis penutup atap, dan tata letak utilitas.
- Studi bayangan, orientasi, dan kemiringan permukaan pemasangan.
- Rencana penambahan beban tiga sampai lima tahun ke depan.
- Target ESG dan format pelaporan emisi yang dipakai perusahaan.
- Preferensi skema pengadaan: CAPEX milik sendiri, BOO, atau BOT.

Dengan data itu, tim [layanan EPC sistem tenaga surya](/layanan/sistem-tenaga-surya-epc/) dapat memverifikasi angka 2,25 MWp dan mengubahnya menjadi desain yang terukur. Bila sistem dilengkapi [sistem baterai](/produk/sistem-panel-surya/sistem-baterai/) untuk menggeser beban malam, kapasitas dapat dihitung ulang dari energi harian yang sama. Pada akhirnya, kapasitas PLTS pabrik manufaktur yang kredibel adalah hasil dari data konsumsi yang rapi, asumsi yang transparan, dan penyaringan regulasi yang realistis.

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
