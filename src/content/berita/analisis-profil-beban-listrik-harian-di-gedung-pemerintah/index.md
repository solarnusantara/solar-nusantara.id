---
title: "Analisis Profil Beban Listrik Harian di Gedung Pemerintah"
description: "Panduan menganalisis profil beban listrik gedung pemerintah untuk menentukan kapasitas PLTS, CAPEX, dan skema pengadaan yang tepat"
focusKeyphrase: "profil beban listrik gedung pemerintah"
pubDate: "2026-10-03"
tags: ["b2g", "desain-sistem", "plts", "teknis"]
draft: true
---

Setiap keputusan ukuran sistem PLTS dimulai dari satu pertanyaan sederhana: berapa besar beban listrik yang harus dilayani, dan kapan beban itu muncul? Pada gedung pemerintah, jawabannya tidak bisa ditebak dari luas atap atau nilai tagihan bulanan. Analisis profil beban listrik gedung pemerintah menuntut data interval yang menunjukkan pola per jam, sehingga kapasitas PLTS, kebutuhan penyimpanan, dan skema pembiayaan dapat ditetapkan secara terukur.

Tiga karakteristik membedakan gedung pemerintah dari bangunan komersial. Pertama, jam operasional umumnya terkonsentrasi pada pukul 08.00-16.00 hari kerja. Kedua, beban dasar tetap berjalan 24 jam untuk ruang server, CCTV, pompa, dan pendingin ruang arsip. Ketiga, beban puncak umumnya jatuh pada siang hari, persis ketika produksi panel surya berada di titik tertinggi.

Namun, kecocokan itu tidak otomatis. Rasio konsumsi siang terhadap konsumsi harian, variasi antar hari kerja, dan kuota PLN yang tersedia menentukan seberapa besar sistem yang layak dibangun.

## Variabel Kunci dalam Profil Beban Listrik Gedung Pemerintah

Ada empat angka yang harus keluar dari analisis sebelum desain dimulai: beban dasar, beban puncak, total konsumsi harian, dan distribusi konsumsi per jam. Dari keempatnya kita menurunkan dua indikator turunan yang sangat menentukan ukuran sistem.

Indikator pertama adalah faktor beban, yaitu konsumsi harian dibagi hasil kali beban puncak dengan 24 jam. Sebagai ilustrasi, bila sebuah gedung mengonsumsi 2.000 kWh per hari dengan beban puncak 150 kW, faktor bebannya adalah 2.000 dibagi (150 × 24) sama dengan 0,56 atau 56%. Indikator kedua adalah rasio siang, yaitu porsi konsumsi pada pukul 08.00-16.00 dibanding total harian.

Rasio siang menentukan berapa persen produksi PLTS yang bisa langsung dikonsumsi di tempat. Sisanya hanya bermanfaat bila tersedia baterai atau mekanisme ekspor-impor yang diizinkan.

## Membaca Data Interval 15 Menit, Bukan Tagihan Bulanan

Tagihan listrik bulanan menyembunyikan bentuk profil beban. Untuk analisis yang akurat, minta data interval 15 atau 30 menit dari meter PLN, atau tarik log dari sistem monitoring energi internal gedung. Idealnya data mencakup 12 bulan penuh agar variasi musiman, hari libur nasional, dan masa reses ikut terlihat.

Permen ESDM No. 2 Tahun 2024 mengubah lanskap perencanaan PLTS atap. Pemasangan tidak lagi dibatasi 100% dari daya terpasang pelanggan PLN, melainkan tunduk pada kuota yang tersedia. Konsekuensinya, ukuran optimal sistem ditentukan oleh irisan antara profil beban, kapasitas trafo, dan kuota yang disetujui. Rujukan resminya tersedia di [JDIH Kementerian ESDM](https://jdih.esdm.go.id/).

Di sisi lain, tim fasilitas sering tidak punya waktu mengekspor data berbulan-bulan. Di titik itu, [layanan manajemen energi](/layanan/manajemen-energi/) kami membantu merapikan data mentah menjadi profil beban yang siap dipakai untuk sizing.

## Contoh Perhitungan Bertahap: dari Beban Harian ke Kapasitas PLTS

Mari gunakan satu gedung kantor pemerintah sebagai ilustrasi, dengan asumsi yang dinyatakan terbuka. Gedung beroperasi pukul 08.00-16.00 pada hari kerja, beban puncak 150 kW, dan total konsumsi harian 2.000 kWh.

Profil per segmen waktu:

- Pukul 00.00-06.00 (6 jam) pada 40 kW menghasilkan 240 kWh.
- Pukul 06.00-08.00 (2 jam) pada 80 kW menghasilkan 160 kWh.
- Pukul 08.00-16.00 (8 jam) pada 150 kW menghasilkan 1.200 kWh.
- Pukul 16.00-18.00 (2 jam) pada 80 kW menghasilkan 160 kWh.
- Pukul 18.00-24.00 (6 jam) pada 40 kW menghasilkan 240 kWh.
- Total: 2.000 kWh per hari.

Langkah pertama, hitung faktor beban. Angka 2.000 kWh dibagi (150 kW × 24 jam) menghasilkan 0,56 atau 56%. Langkah kedua, tetapkan target porsi konsumsi siang yang ingin ditutup PLTS; dalam contoh ini diambil 60% dari 1.200 kWh, yaitu 720 kWh per hari.

Langkah ketiga, konversi kebutuhan energi menjadi kapasitas terpasang. Dengan asumsi produksi spesifik 3,5 kWh per kWp per hari, kebutuhan 720 kWh setara dengan 720 dibagi 3,5, yaitu sekitar 206 kWp, lalu dibulatkan menjadi 200 kWp. Langkah keempat, periksa hasilnya: sistem 200 kWp dengan asumsi yang sama menghasilkan 700 kWh per hari, atau sekitar 58% dari konsumsi siang dan 35% dari total konsumsi harian.

Langkah kelima, hitung dampak emisinya. Mengacu pada faktor emisi rata-rata grid listrik Indonesia sekitar 0,87 kg CO2 per kWh sebagai perkiraan, produksi 700 kWh per hari menghindari sekitar 609 kg CO2 per hari, atau sekitar 222 ton CO2 per tahun.

Perlu dicatat, angka produksi spesifik di atas sudah memperhitungkan efisiensi sistem. Efisiensi didefinisikan sebagai energi listrik yang dihasilkan dibagi energi surya yang diterima panel; 150 Wh keluaran dari 1.000 Wh masukan berarti efisiensi 15%. Kualitas modul, panjang dan ukuran kabel inverter, sudut pemasangan, serta bayangan menurunkan angka ini di lapangan.

## Menakar CAPEX, OPEX, dan Skema Kepemilikan

Referensi pasar Indonesia untuk PLTS 1 MWp berada di rentang Rp 9-13 miliar pada 2024-2025, dengan modul surya menyumbang sekitar 40% dari total CAPEX. Sebagai contoh nyata, sebuah perusahaan industri memasang PLTS 1 MWp dengan CAPEX Rp 11 miliar dan estimasi OPEX Rp 220 juta per tahun.

Untuk sistem 200 kWp seperti contoh sebelumnya, kita bisa memakai ekstrapolasi linier sebagai asumsi awal: sekitar 20% dari angka 1 MWp, atau Rp 2,2 miliar, dengan OPEX sekitar Rp 44 juta per tahun. Angka ini bukan penawaran resmi; biaya aktual bergantung pada struktur atap, panjang kabel, dan titik interkoneksi.

Skema kepemilikan mengubah struktur biaya secara signifikan. Pada skema BOO (Build Own Operate), aset PLTS tetap milik solar developer seterusnya, dan harga cenderung paling murah karena developer memegang aset jangka panjang. Pada skema BOT (Build Operate Transfer), aset milik developer selama masa kontrak, lalu menjadi milik pemilik gedung. Bagi instansi yang ingin menambah aset, BOT sering lebih menarik; bagi yang mengutamakan biaya operasional terendah, BOO lebih sederhana.

Satu hal yang tidak boleh diabaikan adalah kandungan lokal. SonusHUB menargetkan material kelistrikan dengan TKDN minimal 40%, dan kandidat komponen modulnya bisa dilihat pada [panel surya TKDN](/produk/sistem-panel-surya/panel-surya/panel-tkdn/). Karena itu, sebelum tender dibuka, validasi asumsi produksi dan biaya bersama pihak yang mengerjakan [pemasangan sistem tenaga surya EPC](/layanan/sistem-tenaga-surya-epc/) agar angka di atas tidak berhenti sebagai kertas kerja.

## Checklist Data Sebelum Desain Dimulai

1. Tagihan listrik 12 bulan terakhir, lengkap dengan daya terpasang dan golongan tarif.
2. Data interval 15 atau 30 menit minimal 12 bulan dari meter PLN atau sistem monitoring internal.
3. Diagram satu garis sistem kelistrikan eksisting, termasuk kapasitas trafo dan panel utama.
4. Jadwal operasional, kalender hari libur nasional, dan pola kerja shift bila ada.
5. Daftar beban kritis yang harus tetap menyala saat gangguan pasokan.
6. Gambar atap atau site plan dengan dimensi, jenis struktur, dan estimasi bayangan.
7. Status kepemilikan bangunan serta batasan legal pemasangan di atap atau lahan.
8. Riwayat pengajuan kuota PLTS atap ke PLN, jika sebelumnya pernah dilakukan.

Tanpa kedelapan data itu, desain hanya menebak. Analisis profil beban listrik gedung pemerintah yang rapi menurunkan risiko salah ukuran, mempercepat persetujuan kuota, dan membuat perhitungan penghematan serta pengurangan emisi bisa dipertanggungjawabkan. Langkah termurah selalu dimulai dari data, bukan dari modul.

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
