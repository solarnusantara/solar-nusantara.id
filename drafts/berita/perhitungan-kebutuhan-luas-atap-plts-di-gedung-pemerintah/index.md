---
title: "Perhitungan Kebutuhan Luas Atap PLTS di Gedung Pemerintah"
description: "Panduan menghitung luas atap PLTS gedung pemerintah: variabel penentu, contoh perhitungan bertahap, dan checklist data sebelum desain."
focusKeyphrase: "luas atap plts gedung pemerintah"
pubDate: "2026-10-03"
tags: ["b2g", "desain-sistem", "plts", "teknis"]
draft: true
---

Ukuran sistem PLTS di gedung instansi ditentukan oleh empat variabel yang saling mengunci: profil beban listrik harian, kuota daya yang tersedia dari PLN, bidang atap yang benar-benar bebas bayangan, dan target penghematan atau penurunan emisi yang ingin dicapai. Keempatnya bermuara pada satu angka yang harus dipastikan sebelum desain teknis dimulai, yaitu kebutuhan luas atap PLTS gedung pemerintah yang benar-benar layak dipakai. Sejak Permen ESDM No. 2 Tahun 2024, kapasitas PLTS atap tidak lagi otomatis dibatasi 100% dari daya terpasang pelanggan PLN, melainkan mengikuti kuota yang disediakan PLN.

## Variabel yang Menentukan Kapasitas, Bukan Sekadar Luas

Kesalahan yang paling sering terjadi adalah memulai dari pertanyaan "atap kami seluas apa", lalu memaksa kapasitas mengikuti angka tersebut. Urutan yang benar justru terbalik: hitung dulu kebutuhan energi, konversikan ke kapasitas, baru diterjemahkan ke luas bidang. Dengan cara ini, luas atap berfungsi sebagai batas realistis, bukan sebagai titik awal yang mengikat.

Variabel yang perlu dipegang sebelum menghitung:

- **Profil beban siang hari.** Konsumsi kWh per bulan dan pola pemakaian pada jam kerja menentukan seberapa besar produksi PLTS yang bisa diserap sendiri di tempat.
- **Kuota PLN.** Ketentuan pada [Permen ESDM No. 2 Tahun 2024](https://jdih.esdm.go.id/) mengaitkan pemasangan PLTS atap dengan kuota yang tersedia, sehingga hasil hitungan beban harus dicek ulang terhadap ketersediaan kuota di lokasi.
- **Produktivitas spesifik lokasi.** Jumlah kWh yang dihasilkan per kWp terpasang per tahun. Untuk perhitungan awal, gunakan asumsi konservatif 1.400 kWh per kWp per tahun, setara sekitar 3,8 kWh per kWp per hari, lalu sesuaikan setelah studi lokasi.
- **Efisiensi sistem.** Rasio energi listrik yang dihasilkan terhadap energi surya yang diterima panel. Contoh sederhananya, 150 Wh yang keluar dari 1.000 Wh yang masuk berarti efisiensi 15%.
- **Luas bersih atap.** Luas total dikurangi area yang terkena bayangan, jalur perawatan, dan zona peralatan lain di atas atap.

## Contoh Perhitungan Bertahap untuk Gedung 100 kWp

Berikut simulasi sederhana dengan asumsi yang dinyatakan terbuka, sehingga Anda bisa mengganti angkanya dengan data gedung Anda sendiri.

1. **Tetapkan target energi.** Asumsikan beban siang hari gedung setara 180.000 kWh per tahun. Dengan asumsi produktivitas 1.400 kWh per kWp per tahun, kebutuhan kapasitasnya adalah 180.000 ÷ 1.400 ≈ 129 kWp.
2. **Terapkan batas kuota.** Jika kuota PLN di lokasi hanya mengizinkan 100 kWp, angka itulah yang dipakai sebagai target desain.
3. **Ubah kapasitas menjadi luas panel.** Dengan efisiensi sistem 15%, setiap 1 m² panel yang menerima 1.000 W/m² radiasi puncak menghasilkan sekitar 150 Wp. Artinya 100 kWp atau 100.000 Wp membutuhkan sekitar 100.000 ÷ 150 ≈ 667 m² panel.
4. **Tambahkan faktor tata letak.** Jika panel dipasang miring dengan jarak antar baris agar tidak saling membayangi, luas terpakai bisa 1,5–2 kali luas panel itu sendiri. Dengan faktor 1,6, kebutuhannya naik menjadi sekitar 667 × 1,6 ≈ 1.067 m².
5. **Cek terhadap atap aktual.** Bila atap hanya menyediakan 900 m² bersih, kapasitas realistis turun menjadi sekitar 900 ÷ 1,6 × 150 W ≈ 84 kWp.
6. **Hitung dampak emisinya.** Kapasitas 84 kWp menghasilkan sekitar 117.600 kWh per tahun. Dengan faktor emisi rata-rata grid listrik Indonesia sekitar 0,87 kg CO2 per kWh, pengurangan emisinya sekitar 102 ton CO2 per tahun (perkiraan).

## Menghitung Luas Atap PLTS Gedung Pemerintah: Faktor yang Menggeser Angka

Angka 150 Wp per m² pada contoh di atas adalah titik tengah, bukan angka tetap. Efisiensi sistem dipengaruhi kualitas modul, panjang dan ukuran kabel menuju inverter, sudut pemasangan, serta bayangan dari bangunan atau pohon di sekitar.

Setiap penurunan efisiensi langsung menaikkan kebutuhan luas karena daya puncak per meter persegi ikut turun. Jika modul yang dipilih hanya menghasilkan efisiensi sistem 12%, daya puncaknya sekitar 120 Wp per m² dan kebutuhan panel untuk 100 kWp melebar menjadi sekitar 833 m². Sebaliknya, modul ber-efisiensi lebih tinggi memampatkan luas yang dibutuhkan.

Untuk proyek pemerintah, pemilihan modul juga menyentuh sisi TKDN. SonusHUB menargetkan material kelistrikan dengan TKDN minimal 40%, dan katalog [panel surya TKDN](/produk/sistem-panel-surya/panel-surya/panel-tkdn/) bisa menjadi titik awal penelusuran spesifikasi. Alur pengadaan hingga commissioning-nya sendiri ditangani melalui [layanan sistem tenaga surya EPC](/layanan/sistem-tenaga-surya-epc/) yang mencakup survei atap dan pemodelan bayangan.

## Dari Luas Atap ke Anggaran: Konteks CAPEX dan Skema Kontrak

Hasil perhitungan luas bukan sekadar angka teknis, karena luas menentukan jumlah modul dan dari situ anggaran bisa ditaksir. Sebagai gambaran skala, PLTS 1 MWp di Indonesia membutuhkan CAPEX sekitar Rp 9–13 miliar, dengan modul surya menyumbang sekitar 40% dari total. Sebuah perusahaan industri tercatat memasang PLTS 1 MWp dengan CAPEX Rp 11 miliar dan OPEX sekitar Rp 220 juta per tahun.

Struktur pengadaan gedung pemerintah umumnya memilih antara dua skema. Pada BOO (Build Own Operate), aset PLTS tetap milik solar developer seterusnya, dan harga cenderung paling murah karena developer memegang aset jangka panjang. Pada BOT (Build Operate Transfer), aset milik developer selama masa kontrak lalu berpindah menjadi milik pemilik gedung.

Pilihan skema tidak mengubah luas atap yang dibutuhkan, tetapi mempengaruhi siapa yang menanggung risiko produksi dan bagaimana efisiensi sistem diverifikasi di dalam kontrak. Untuk gedung dengan target ESG, pemantauan produksi bulanan biasanya masuk ke paket [layanan manajemen energi](/layanan/manajemen-energi/).

## Checklist Data yang Perlu Disiapkan Sebelum Desain

Kualitas desain PLTS sangat bergantung pada kelengkapan data awal. Siapkan daftar berikut sebelum meminta penawaran, karena sebagian besar kesalahan perhitungan luas berasal dari data yang tidak lengkap.

- Tagihan listrik 12 bulan terakhir beserta daya terpasang pelanggan PLN.
- Data profil beban, idealnya log 15 menit, untuk melihat beban siang hari secara akurat.
- Diagram satu garis (SLD), kapasitas trafo, dan panel yang sudah ada.
- Gambar atap atau site plan berskala, lengkap dengan ukuran, elevasi, dan arah hadap.
- Foto kondisi atap serta bangunan sekitar untuk mengidentifikasi sumber bayangan.
- Jenis dan umur struktur atap, termasuk daya dukung beban dan titik penambatan.
- Rute kabel dari atap ke ruang panel dan titik interkoneksi ke jaringan PLN.
- Status kuota PLN di lokasi sesuai Permen ESDM No. 2 Tahun 2024.
- Target penghematan energi, penurunan emisi, dan indikator ESG yang ingin dilaporkan.
- Preferensi skema pembiayaan, apakah CAPEX, BOO, atau BOT.

Setelah seluruh data itu terkumpul, perhitungan luas atap PLTS gedung pemerintah bisa dikunci dengan margin keyakinan yang jauh lebih tinggi. Mulailah dari target energi, bukan dari gambar atap, lalu uji hasilnya terhadap kuota PLN dan kondisi bayangan di lapangan.

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
