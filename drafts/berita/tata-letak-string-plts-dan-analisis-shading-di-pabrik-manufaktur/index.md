---
title: "Tata Letak String PLTS dan Analisis Shading di Pabrik Manufaktur"
seoTitle: "Tata Letak String PLTS untuk Pabrik"
description: "Panduan tata letak string PLTS pabrik manufaktur: variabel penentu ukuran sistem, contoh perhitungan, analisis shading, dan checklist data desain."
focusKeyphrase: "tata letak string plts pabrik manufaktur"
pubDate: "2026-10-05"
tags: ["manufaktur", "desain-sistem", "plts", "teknis"]
draft: true
---

Ukuran sistem PLTS atap pabrik tidak ditentukan oleh luas atap semata. Ada empat variabel yang lebih dulu mengunci besaran kWp: profil beban harian, daya terpasang PLN, luas atap yang benar-benar bebas hambatan, dan kuota PLTS yang tersedia. Dalam praktiknya, tata letak string PLTS pabrik manufaktur menjadi titik temu keempat variabel itu, tempat keputusan teknis bertemu anggaran dan target produksi listrik bersih.

Sejak Permen ESDM No. 2 Tahun 2024, pemasangan PLTS atap tidak lagi dibatasi 100% dari daya terpasang pelanggan PLN. Kapasitas kini tunduk pada kuota PLN yang tersedia, sehingga verifikasi kuota menjadi langkah pertama sebelum menggambar satu string pun. Rujukan resmi regulasinya tersedia di [JDIH Kementerian ESDM](https://jdih.esdm.go.id/).

## Tata Letak String PLTS Pabrik Manufaktur: Variabel yang Mengunci Ukuran

Atap pabrik hampir selalu terpotong penghalang tetap: cerobong, chiller, dust collector, jalur pipa, talang, dan tiang lampu. Luas atap kotor karena itu jarang bisa dikonversi langsung menjadi kapasitas terpasang. Praktik yang lazim adalah menetapkan packing factor lebih dulu, yaitu rasio luas modul terhadap luas atap yang tersedia.

Untuk atap datar dengan baris berjarak, packing factor 0,50–0,60 adalah asumsi kerja yang wajar. Angka ini sudah memperhitungkan jarak antar baris, jalur pemeliharaan, dan zona bebas bayangan. Modul sendiri menyumbang sekitar 40% dari total CAPEX sistem 1 MW, sehingga kesalahan menghitung jumlah modul langsung terasa di anggaran.

Variabel kedua adalah konfigurasi elektrik yang menentukan panjang string. Batas tegangan maksimum inverter dan tegangan MPPT minimum wajib diuji pada suhu ekstrem, bukan pada kondisi pengujian standar. Di iklim tropis, suhu modul siang hari dapat mendekati 70°C, sementara suhu pagi terendah tetap perlu dimasukkan sebagai skenario konservatif.

## Contoh Perhitungan Bertahap untuk Target 1 MWp

Contoh berikut memakai asumsi yang dinyatakan terbuka, sehingga bisa disesuaikan dengan databook modul dan inverter yang Bapak/Ibu pegang.

1. **Kapasitas target.** 1 MWp = 1.000 kWp. Dengan modul 550 Wp, kebutuhan modul = 1.000.000 ÷ 550 = 1.818 unit. Dibulatkan menjadi 1.800 modul atau 990 kWp agar pembagian string bulat.
2. **Luas modul.** Satu modul berukuran 2,28 m × 1,13 m = 2,58 m². Total luas modul = 1.800 × 2,58 = 4.644 m².
3. **Luas atap minimum.** Dengan packing factor asumsi 0,55, luas atap yang dibutuhkan = 4.644 ÷ 0,55 ≈ 8.444 m², atau sekitar 8.500 m².
4. **Batas atas panjang string.** Voc modul 49,5 V dengan koefisien suhu -0,25%/°C. Pada suhu terendah asumsi 20°C, Voc naik menjadi 49,5 × (1 + 0,0025 × 5) = 50,1 V. Dengan batas inverter 1.100 V DC, maksimum 1.100 ÷ 50,1 = 21,9 sehingga dipakai 21 modul per string.
5. **Batas bawah panjang string.** Vmp modul 41,5 V dengan koefisien -0,35%/°C. Pada suhu modul 70°C, Vmp turun menjadi 41,5 × (1 - 0,0035 × 45) = 34,9 V. Untuk MPPT minimum 200 V, dibutuhkan minimal 200 ÷ 34,9 = 5,7 sehingga minimal 6 modul per string.
6. **Pilihan desain.** Ambil 20 modul per string: tegangan dingin 1.002 V (aman di bawah 1.100 V) dan daya 11 kWp per string. Total string = 1.800 ÷ 20 = 90 string, dilayani 10 inverter 100 kW dengan 9 input string masing-masing. Rasio DC/AC = 990 ÷ 1.000 = 0,99.
7. **Estimasi produksi dan emisi.** Dengan asumsi produksi spesifik 1.400 kWh/kWp per tahun, energi tahunan ≈ 990 × 1.400 = 1.386.000 kWh. Memakai faktor emisi rata-rata grid Indonesia sekitar 0,87 kg CO2 per kWh (perkiraan), potensi penurunan emisi ≈ 1.206 ton CO2 per tahun.

## Analisis Shading: Sumber Bayangan Khas Lantai Produksi

Pabrik manufaktur punya profil bayangan yang berbeda dari gedung kantor. Cerobong dan dust collector menghasilkan bayangan tajam yang bergerak sepanjang hari, sedangkan chiller dan tangki menghasilkan bayangan blok yang lebar. Peta atap dua dimensi karena itu tidak cukup; diperlukan model tiga dimensi sederhana dan simulasi lintasan matahari.

Simulasikan rentang 09.00–15.00 sepanjang tahun, karena bayangan di luar rentang itu kontribusinya kecil terhadap produksi harian. Untuk atap datar, bayangan antar baris modul juga harus dihitung, bukan hanya bayangan bangunan. Dengan tinggi baris 0,35 m dan sudut elevasi matahari kritis 20°, jarak minimum antar baris = 0,35 ÷ tan 20° = 0,96 m, lalu ditambah margin 25% menjadi sekitar 1,2 m.

Aturan emas penataan string: modul yang berpotensi terbayang jangan dicampur dengan modul bersih dalam satu MPPT. Mismatch satu modul dapat menekan keluaran seluruh string di bawah performa modul terlemahnya. Bila bayangan sulit dihindari, pertimbangkan power optimizer atau modul dengan kualitas dioda bypass yang baik.

Efisiensi sistem PLTS dihitung sebagai energi listrik yang dihasilkan dibagi energi surya yang diterima panel. Contohnya, 150 Wh keluaran dari 1.000 Wh masukan setara 15%. Kualitas modul, panjang dan ukuran kabel ke inverter, sudut pemasangan, serta bayangan adalah empat faktor yang paling sering menggerus angka tersebut.

## Menyambungkan Tata Letak ke Angka Investasi

CAPEX PLTS 1 MWp di Indonesia berada di rentang Rp 9–13 miliar pada 2024–2025. Sebagai gambaran nyata, sebuah perusahaan industri memasang PLTS 1 MWp dengan CAPEX Rp 11 miliar dan estimasi OPEX Rp 220 juta per tahun. Dari CAPEX itu, modul menyumbang sekitar 40% atau setara Rp 4,4 miliar.

Struktur pembiayaan menentukan siapa yang memikul aset dalam jangka panjang. Pada skema BOO, aset tetap milik solar developer seterusnya, sehingga harga jual listriknya cenderung paling murah. Pada skema BOT, aset menjadi milik pemilik gedung setelah masa kontrak berakhir. Keputusan ini biasanya diambil bersamaan dengan penetapan target ESG dan pemenuhan TKDN.

SonusHUB menargetkan material kelistrikan dengan TKDN minimal 40%; contoh katalognya ada di [panel surya ber-TKDN](/produk/sistem-panel-surya/panel-surya/panel-tkdn/). Eksekusi dari desain hingga commissioning ditangani melalui [layanan EPC sistem tenaga surya](/layanan/sistem-tenaga-surya-epc/), sedangkan pemantauan performa pasca-instalasi dapat masuk ke paket [manajemen energi](/layanan/manajemen-energi/).

## Checklist Data Sebelum Desain Dimulai

Kualitas tata letak string PLTS pabrik manufaktur ditentukan oleh kelengkapan data yang masuk ke meja desain. Siapkan daftar berikut sebelum meminta penawaran resmi.

- Tagihan listrik 12 bulan terakhir, termasuk kWh dan kW puncak.
- Profil beban per jam dari kWh meter atau rekaman SCADA.
- Daya terpasang PLN saat ini dan status ketersediaan kuota PLTS.
- Gambar as-built atap: dimensi, kemiringan, jenis penutup, dan batas beban struktural.
- Inventaris penghalang di atap beserta tingginya: cerobong, chiller, dust collector, pipa, talang, tiang lampu.
- Rencana ekspansi gedung atau penambahan mesin yang berpotensi menciptakan bayangan baru.
- Data irradiasi lokasi dan catatan suhu ekstrem historis.
- Databook modul dan inverter: Voc, Vmp, koefisien suhu, batas tegangan, jumlah MPPT.
- Rencana jalur kabel DC/AC serta lokasi ruang inverter dan panel.
- Target internal: payback, skema pembiayaan (CAPEX sendiri, BOO, atau BOT), dan target ESG.

Setelah seluruh data tersedia, simulasi produksi dan penyusunan dokumen lelang bisa berjalan tanpa asumsi yang menggantung. revisi tata letak di lapangan pun dapat ditekan sebelum alat berat dan crane masuk ke area produksi.

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
