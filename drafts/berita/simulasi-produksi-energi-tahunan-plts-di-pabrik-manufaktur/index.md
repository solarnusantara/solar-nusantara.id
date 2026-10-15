---
title: "Simulasi Produksi Energi Tahunan PLTS di Pabrik Manufaktur"
description: "Panduan simulasi produksi PLTS pabrik manufaktur: variabel penentu ukuran sistem, contoh perhitungan tahunan, dan checklist data sebelum desain."
focusKeyphrase: "simulasi produksi plts pabrik manufaktur"
pubDate: "2026-10-02"
tags: ["manufaktur", "desain-sistem", "plts", "teknis"]
draft: true
---

Ukuran sistem PLTS di pabrik manufaktur tidak ditentukan oleh luas atap semata. Ada lima variabel yang saling mengunci: daya terpasang pelanggan PLN, luas dan orientasi atap, profil beban harian, iradiasi lokasi, serta kuota PLN yang tersedia. Kelimanya menjadi input wajib sebelum simulasi produksi PLTS pabrik manufaktur dijalankan. Tanpa data itu, angka produksi tahunan hanya menjadi estimasi kasar yang sulit dipertanggungjawabkan ke direksi.

Profil beban menentukan seberapa besar energi surya yang diserap sendiri dan seberapa besar yang diekspor ke jaringan. Pabrik dengan dua atau tiga shift umumnya menyerap energi siang hari lebih besar dibanding pabrik satu shift. Semakin tinggi rasio serap sendiri, semakin cepat investasi kembali.

## Variabel Kunci dalam Simulasi Produksi PLTS Pabrik Manufaktur

Urutan variabel berikut disusun dari yang paling mengikat keputusan desain.

- **Daya terpasang dan kuota PLN.** Permen ESDM No. 2 Tahun 2024 mengubah aturan PLTS atap: kapasitas tidak lagi dibatasi 100% dari daya terpasang pelanggan, melainkan mengikuti kuota yang tersedia di sistem PLN. Rujukan resminya tersedia di [jdih.esdm.go.id](https://jdih.esdm.go.id/).
- **Luas atap efektif.** Hanya area bebas bayangan dan siap dipasang struktur yang dihitung.
- **Iradiasi dan performance ratio.** Nilai PR merangkum rugi kabel, inverter, suhu, sudut pemasangan, dan shading.
- **Profil beban.** Menentukan nilai energi yang benar-benar menghemat tagihan, bukan sekadar angka produksi.
- **Konfigurasi sistem.** Pilihan on-grid, hybrid, atau penambahan baterai mengubah CAPEX dan OPEX secara signifikan.

Efisiensi sistem dihitung sebagai energi listrik yang dihasilkan dibagi energi surya yang diterima panel, lalu dikali 100%. Contohnya, 150 Wh keluar dari 1.000 Wh masuk berarti efisiensi 15%. Angka ini dipengaruhi kualitas modul, panjang dan ukuran kabel inverter, sudut pemasangan, serta bayangan.

Dalam praktik, simulasi tahunan dijalankan per jam, bukan per bulan. Pendekatan per jam menangkap jam produksi tinggi yang tidak bisa diserap beban dan jam produksi rendah saat beban puncak. Selisih hasil antara simulasi bulanan dan simulasi per jam bisa cukup lebar pada pabrik dengan pola shift yang tidak seragam.

## Contoh Perhitungan Bertahap Sistem 1 MWp

Ambil kasus pabrik manufaktur dengan target sistem 1 MWp. Angka iradiasi dan performance ratio di bawah ini adalah asumsi teknis tahap studi kelayakan, sedangkan angka biaya mengacu pada rentang pasar 2024-2025.

1. **Kapasitas sistem:** 1 MWp setara 1.000 kWp.
2. **Iradiasi harian setara (asumsi):** 4,5 jam puncak matahari per hari.
3. **Performance ratio (asumsi):** 80%, sudah memperhitungkan rugi kabel, inverter, suhu, dan bayangan.
4. **Produksi harian:** 1.000 kWp × 4,5 jam × 0,80 = 3.600 kWh per hari.
5. **Produksi tahunan:** 3.600 kWh × 365 hari = 1.314.000 kWh, sekitar 1,31 GWh per tahun.
6. **Penurunan emisi:** 1.314.000 kWh × 0,87 kg CO2 per kWh = 1.143.180 kg, sekitar 1.143 ton CO2 per tahun, memakai perkiraan faktor emisi rata-rata grid listrik Indonesia.

Dari sisi biaya, CAPEX PLTS 1 MWp di Indonesia berada di rentang Rp 9-13 miliar. Modul surya menyumbang sekitar 40% dari total CAPEX sistem 1 MW, sehingga pada proyek senilai Rp 11 miliar porsi modul sekitar Rp 4,4 miliar. Salah satu contoh nyata di sektor industri menunjukkan pemasangan 1 MWp dengan CAPEX Rp 11 miliar dan OPEX Rp 220 juta per tahun.

Angka produksi tahunan ini yang biasanya dipakai untuk menghitung penghematan tagihan, payback, dan pelaporan emisi. Karena tarif listrik berubah dari waktu ke waktu, penghematan sebaiknya disajikan sebagai rentang, bukan satu angka tunggal. Sertakan pula asumsi degradasi modul dan kenaikan tarif agar model keuangan tetap konservatif.

## Skema BOO atau BOT: Dampaknya ke Neraca

Pilihan skema memengaruhi cara CAPEX dan OPEX dibebankan pada laporan keuangan. Berikut ringkasan tiga opsi yang paling umum di pasar Indonesia.

- **BOO (Build Own Operate).** Aset PLTS tetap milik solar developer seterusnya. Harga cenderung paling murah karena developer memegang aset jangka panjang.
- **BOT (Build Operate Transfer).** Aset milik developer selama masa kontrak, lalu menjadi milik pemilik gedung pada akhir kontrak.
- **EPC penuh.** Perusahaan memiliki aset sejak awal dan menanggung seluruh CAPEX serta OPEX, termasuk biaya perawatan rutin.

Ketiganya menghasilkan produksi energi yang sama, tetapi profil arus kas dan perlakuan asetnya berbeda. Karena itu, simulasi teknis sebaiknya dijalankan bersamaan dengan pemodelan finansial. Hasil simulasi yang sama bisa dipakai untuk dua skenario tanpa menghitung ulang potensi energi. Tim [layanan EPC sistem tenaga surya](/layanan/sistem-tenaga-surya-epc/) biasanya memakai pendekatan ini agar keputusan tidak tertunda.

Untuk komponen, ketentuan TKDN semakin sering muncul sebagai syarat pengadaan. SonusHUB menargetkan material kelistrikan dengan TKDN minimal 40%, sejalan dengan permintaan pabrik yang mengejar target ESG. Pilihan [panel surya TKDN](/produk/sistem-panel-surya/panel-surya/panel-tkdn/) membantu memenuhi syarat tersebut tanpa mengorbankan jadwal pengiriman.

Setelah sistem beroperasi, pemantauan produksi aktual menjadi penting untuk memvalidasi simulasi. Selisih antara produksi aktual dan hasil simulasi biasanya ditelusuri dari bayangan baru, debu, atau penurunan kinerja inverter. Layanan [manajemen energi](/layanan/manajemen-energi/) membantu pabrik menjaga selisih itu tetap kecil.

## Checklist Data Sebelum Desain Dimulai

Semakin lengkap data yang disiapkan, semakin kecil selisih antara produksi aktual dan hasil simulasi. Siapkan daftar berikut sebelum tim desain mulai menghitung string, inverter, dan tata letak modul.

- Tagihan listrik 12 bulan terakhir beserta profil beban 15 menit atau harian.
- Daya terpasang PLN, jenis tarif, dan status kuota PLTS atap di wilayah jaringan setempat.
- Gambar atap as-built, jenis rangka, umur bangunan, dan daya dukung beban.
- Peta bayangan dari bangunan sekitar, cerobong, atau peralatan di atas atap.
- Rencana ekspansi beban 3-5 tahun ke depan.
- Target ESG dan format pelaporan emisi yang dipakai perusahaan.
- Kriteria pengadaan: nilai TKDN, merek modul dan inverter, serta skema pembiayaan.
- Kapasitas trafo dan ruang untuk panel distribusi serta inverter.
- Preferensi skema: BOO, BOT, atau EPC penuh.

Dengan data itu, simulasi produksi PLTS pabrik manufaktur bisa langsung dipakai sebagai dasar penawaran dan studi kelayakan. Hasilnya bukan hanya angka kWh, tetapi bahan keputusan bagi manajer fasilitas, manajer energi, dan direksi. Untuk pabrik dengan beban siang hari yang tinggi, langkah paling cepat adalah menguji kelayakan teknis dan ketersediaan kuota sebelum anggaran disusun.

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
