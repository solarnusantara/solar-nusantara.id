---
title: "Desain PLTS Hybrid dengan Baterai untuk Gedung Pemerintah"
description: "Panduan desain PLTS hybrid baterai gedung pemerintah: variabel penentu ukuran, contoh perhitungan bertahap, dan checklist data sebelum desain."
focusKeyphrase: "plts hybrid baterai gedung pemerintah"
pubDate: "2026-10-08"
tags: ["b2g", "desain-sistem", "plts", "teknis"]
draft: false
---

Ukuran sistem PLTS hybrid baterai gedung pemerintah tidak ditentukan oleh luas atap, melainkan oleh profil beban harian, target kemandirian listrik, dan kuota daya yang disetujui PLN. Luas atap hanya menetapkan batas maksimum, bukan target desain. Karena itu, perancangan yang sehat selalu dimulai dari data konsumsi, bukan dari katalog modul.

## Variabel yang Menentukan Ukuran Sistem

Variabel berikut paling sering menggeser angka desain secara signifikan:

- **Beban harian (kWh) dan bentuk profilnya.** Gedung pemerintah umumnya berpola siang dominan, sehingga porsi beban yang bisa ditanggung PLTS langsung lebih besar daripada gedung operasional 24 jam.
- **Daya terpasang dan kuota PLN.** Sejak Permen ESDM No. 2 Tahun 2024, kapasitas PLTS atap tidak lagi dibatasi 100% dari daya terpasang pelanggan PLN, melainkan tunduk pada kuota yang tersedia.
- **Luas atap efektif.** Hitung luas bersih setelah dikurangi unit AC, tangki, jalur pemeliharaan, dan area yang terbayang struktur lain.
- **Yield spesifik lokasi (kWh per kWp per hari).** Angka ini adalah hasil iradiasi setempat dikalikan efisiensi sistem.
- **Kapasitas baterai (kWh) dan durasi backup.** Ditentukan oleh beban prioritas, bukan oleh beban total gedung.
- **Struktur anggaran.** Menentukan apakah baterai dipasang sekaligus atau bertahap mengikuti ketersediaan anggaran tahunan.

Efisiensi sistem PLTS dihitung sebagai (energi listrik yang dihasilkan / energi surya yang diterima panel) x 100%. Sebagai gambaran, 150 Wh yang keluar dari 1.000 Wh yang masuk setara dengan efisiensi 15%. Kualitas modul, panjang dan ukuran kabel inverter, sudut pemasangan, serta bayangan termasuk faktor yang menggerakkan angka tersebut. Turunnya efisiensi satu poin persen saja akan membesarkan kebutuhan kWp secara proporsional.

## Contoh Perhitungan Bertahap dengan Angka

Ilustrasi berikut memakai asumsi yang harus diganti dengan data rekening listrik dan log beban gedung Anda. Beban siang diasumsikan 400 kW selama 8 jam, sedangkan beban malam 80 kW selama 16 jam.

- Beban siang: 400 kW x 8 jam = 3.200 kWh per hari.
- Beban malam: 80 kW x 16 jam = 1.280 kWh per hari.
- Total konsumsi: 4.480 kWh per hari.

1. **Target porsi siang.** Manajemen menetapkan PLTS menanggung 50% beban siang, yaitu 1.600 kWh per hari, sementara sisanya tetap dipasok PLN.
2. **Kapasitas modul.** Dengan asumsi yield spesifik 3,5 kWh per kWp per hari, kebutuhan modul = 1.600 / 3,5 = 457 kWp, dibulatkan menjadi 460 kWp.
3. **Kapasitas baterai.** Beban prioritas malam 60 kW selama 4 jam = 240 kWh, sehingga dengan asumsi depth of discharge 80% dan efisiensi siklus 90%, kapasitas terpasang = 240 / (0,8 x 0,9) = 333 kWh, dibulatkan menjadi 350 kWh.
4. **Inverter hybrid.** Minimal harus sanggup melewatkan beban puncak siang dan arus pengisian baterai; asumsikan 400 kW sebagai titik awal, lalu verifikasi dengan data interval 15 menit.
5. **Estimasi CAPEX PV.** Diskalakan linear dari referensi pasar Rp 11 miliar per 1 MWp, kebutuhan dana modul dan keseimbangan sistem = (460 / 1.000) x Rp 11 miliar = Rp 5,06 miliar. Modul menyumbang sekitar 40% dari total CAPEX, setara Rp 2,02 miliar. Rentang pasar 1 MWp sendiri berada di Rp 9–13 miliar, dan biaya baterai dihitung terpisah dalam penawaran.
6. **Estimasi OPEX.** Dengan asumsi penyekalaan linear dari Rp 220 juta per tahun per 1 MWp, OPEX tahunan sekitar 0,46 x Rp 220 juta = Rp 101 juta.
7. **Potensi penurunan emisi.** 460 kWp x 3,5 kWh per kWp per hari x 365 hari = 587.650 kWh per tahun, setara sekitar 511 ton CO2 per tahun bila memakai perkiraan faktor emisi grid rata-rata 0,87 kg CO2 per kWh.

Seluruh angka di atas adalah ilustrasi berbasis asumsi terbuka, bukan hasil studi kelayakan. Angka riil hanya terkunci setelah data pemakaian dan survei atap selesai.

## Menyusun Desain PLTS Hybrid Baterai Gedung Pemerintah

Konfigurasi dasar biasanya terdiri dari modul surya, inverter hybrid, sistem baterai, panel distribusi, dan sistem monitoring yang tersambung ke jaringan PLN. Mode operasi yang paling umum untuk gedung pemerintah adalah self-consumption priority, yaitu energi surya dipakai lebih dulu, baterai diisi pada siang hari, dan listrik PLN menjadi penopang saat produksi surya rendah.

Dua skema pengadaan yang lazim dibandingkan adalah BOO dan BOT. Pada skema BOO (Build Own Operate), aset PLTS tetap milik solar developer seterusnya, sehingga harga cenderung paling murah karena developer memegang aset jangka panjang. Pada skema BOT (Build Operate Transfer), aset dimiliki developer selama masa kontrak, lalu menjadi milik pemilik gedung. Bagi instansi yang ingin memiliki aset pada akhir kontrak, BOT biasanya lebih mudah dipertanggungjawabkan secara administrasi.

Aspek TKDN sebaiknya dibahas sejak tahap desain, bukan saat pengadaan. SonusHUB menargetkan material kelistrikan dengan TKDN minimal 40%, dan komponen seperti [panel surya bergradasi TKDN tinggi](/produk/sistem-panel-surya/panel-surya/panel-tkdn/) membantu memenuhi syarat tersebut. Untuk eksekusi menyeluruh, [layanan EPC sistem tenaga surya](/layanan/sistem-tenaga-surya-epc/) mencakup audit energi, desain, instalasi, hingga commissioning. Pemantauan performa bulanan dapat dilanjutkan melalui [layanan manajemen energi](/layanan/manajemen-energi/).

## Kuota PLN dan Kepatuhan Regulasi

Permen ESDM No. 2 Tahun 2024 mengubah dasar persetujuan kapasitas PLTS atap. Pemasangan tidak lagi dibatasi 100% dari daya terpasang pelanggan PLN, melainkan tunduk pada kuota PLN yang tersedia. Konsekuensinya, kelayakan teknis saja tidak cukup; kuota harus dikonfirmasi lebih awal agar desain tidak berhenti di tengah jalan. Rujukan resmi regulasinya dapat dibaca pada [JDIH Kementerian ESDM](https://jdih.esdm.go.id/).

Pemeriksaan kuota sebaiknya dilakukan sebelum survei atap dikerjakan secara rinci. Jika kuota di titik sambungan terbatas, opsi yang tersisa adalah memperbesar porsi baterai, menurunkan target kapasitas, atau membagi sistem menjadi beberapa tahap. Ketiga opsi itu mengubah CAPEX dan OPEX secara berbeda, sehingga perlu dihitung sebelum kontrak pengadaan ditandatangani.

## Checklist Data Sebelum Desain Dimulai

- Tagihan listrik 12 bulan terakhir, termasuk pola tarif dan golongan daya.
- Rekaman beban interval 15 menit atau, bila tidak tersedia, pencatatan manual harian selama minimal dua minggu.
- Single line diagram kelistrikan eksisting dan kapasitas trafo.
- Status kuota PLTS di titik sambungan PLN setempat.
- Gambar atap terukur, luas efektif, kondisi struktur, dan rencana jalur kabel.
- Daftar beban prioritas yang harus tetap menyala saat backup, beserta durasi yang diinginkan.
- Target kemandirian energi dan target pelaporan ESG instansi.
- Pagu anggaran serta preferensi skema pengadaan (BOO, BOT, atau beli putus).
- Rencana operasi dan pemeliharaan, termasuk siapa yang akan memantau performa harian.

Semakin lengkap data pada daftar di atas, semakin cepat desain PLTS hybrid baterai gedung pemerintah dikunci dan semakin kecil risiko revisi di tengah pengadaan. Mulailah dari rekening listrik 12 bulan terakhir, karena hampir semua variabel lain dapat diturunkan dari sana.

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
