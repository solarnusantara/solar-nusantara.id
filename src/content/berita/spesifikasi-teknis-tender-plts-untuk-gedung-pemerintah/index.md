---
title: "Spesifikasi Teknis Tender PLTS untuk Gedung Pemerintah"
description: "Panduan spesifikasi tender PLTS gedung pemerintah: poin wajib dokumen, skema BOO vs BOT, dan cara verifikasi klaim vendor."
focusKeyphrase: "spesifikasi tender plts gedung pemerintah"
pubDate: "2026-10-02"
tags: ["b2g", "pengadaan", "plts", "teknis"]
draft: true
---

Kesalahan pengadaan PLTS di gedung pemerintah jarang terlihat pada hari penandatanganan kontrak. Kesalahan itu baru muncul tiga tahun kemudian, ketika produksi listrik turun jauh dari proyeksi dan tidak ada satu pun pasal kontrak yang bisa dipakai untuk menuntut perbaikan. Penyebabnya hampir selalu sama: dokumen spesifikasi tender PLTS gedung pemerintah hanya memuat dua angka, yaitu kapasitas dan harga. Vendor lalu berlomba menawar serendah mungkin dengan modul kelas bawah, kabel di bawah standar, dan pekerjaan sambungan seadanya.

Penghematan di awal itu biasanya habis dalam satu kali penggantian inverter atau perbaikan string yang gagal. Artikel ini tidak mengulang dasar-dasar pengadaan PLTS, melainkan langsung membahas komponen teknis yang harus dikunci di dalam dokumen agar penawaran bisa dibandingkan secara adil.

## Mengapa Spesifikasi Tender PLTS Gedung Pemerintah Menentukan Biaya Sepuluh Tahun

CAPEX PLTS 1 MWp di Indonesia berada di rentang Rp 9 miliar sampai Rp 13 miliar untuk periode 2024-2025. Modul surya menyumbang sekitar 40 persen dari total CAPEX sistem 1 MW, sehingga selisih tipis pada spesifikasi modul berdampak besar pada nilai kontrak. Perbedaan penawaran yang jauh antar vendor umumnya bukan berasal dari merek modul, melainkan dari hal-hal yang tidak ditulis di dokumen.

Sebagai gambaran, sebuah perusahaan industri memasang PLTS 1 MWp dengan CAPEX Rp 11 miliar dan estimasi OPEX Rp 220 juta per tahun. Angka OPEX tersebut mencakup pembersihan modul, inspeksi kelistrikan, dan penggantian komponen aus. Jika dokumen tender tidak mengatur siapa yang menanggung OPEX, biaya itu berpindah ke anggaran pemeliharaan gedung tanpa perencanaan.

## Daftar Poin yang Harus Ada di Dokumen Tender

Dokumen tender yang baik memaksa semua peserta menjawab pertanyaan yang sama. Minimal, sebelas poin berikut harus muncul secara eksplisit.

1. **Kapasitas dan konfigurasi.** Nyatakan kWp DC, kW AC inverter, dan rasio DC/AC yang diizinkan beserta toleransinya.
2. **Spesifikasi modul.** Kunci teknologi sel, toleransi daya, koefisien degradasi tahunan, garansi produk, dan garansi performa.
3. **Spesifikasi inverter.** Minta nilai efisiensi, kelas proteksi IP, jumlah MPPT, serta fitur proteksi anti-islanding dan pemantauan.
4. **Desain kelistrikan.** Tetapkan ukuran dan panjang kabel DC/AC, batas drop tegangan, proteksi DC/AC, dan sistem pembumian.
5. **Struktur dan sudut pemasangan.** Tentukan kemiringan, jarak antar baris, dan beban angin yang harus ditahan struktur.
6. **Analisis bayangan.** Wajibkan studi bayangan yang mempertimbangkan bangunan sekitar, antena, dan bayangan antar baris modul.
7. **Skema bisnis.** Pilih secara tegas antara BOO dan BOT, termasuk perlakuan aset di akhir kontrak.
8. **Kewajiban TKDN.** Tetapkan ambang TKDN dan cara pembuktiannya melalui dokumen yang bisa diaudit.
9. **Status perizinan dan kuota.** Wajibkan peserta menjelaskan dasar kuota PLN yang relevan sesuai Permen ESDM No. 2 Tahun 2024.
10. **Jaminan produksi.** Minta angka produksi tahunan minimum beserta konsekuensi kontraktual bila tidak tercapai.
11. **Pelaporan.** Atur format laporan produksi, kinerja sistem, dan perhitungan pengurangan emisi secara berkala.

## BOO atau BOT: Menentukan Kepemilikan dan Harga

Skema BOO (Build Own Operate) membuat aset PLTS tetap milik solar developer seterusnya. Harga listrik dari skema ini cenderung paling murah karena developer memegang aset jangka panjang dan menanggung risiko operasionalnya. Skema BOT (Build Operate Transfer) membuat aset menjadi milik pemilik gedung setelah masa kontrak berakhir.

Pemilihan skema mengubah struktur biaya sepanjang umur proyek, jadi skema tidak boleh dibiarkan dinegosiasikan belakangan. Selain itu, sejak Permen ESDM No. 2 Tahun 2024, pemasangan PLTS atap tidak lagi dibatasi 100 persen dari daya terpasang pelanggan PLN. Kapasitas kini tunduk pada kuota PLN yang tersedia, sehingga kelayakan kapasitas harus diverifikasi sebelum tender dibuka. Rujukan resminya tersedia di [JDIH Kementerian ESDM](https://jdih.esdm.go.id/).

## Membaca Efisiensi Sistem sebagai Angka Kontrak

Efisiensi sistem PLTS dihitung sebagai energi listrik yang dihasilkan dibagi energi surya yang diterima panel, lalu dikalikan 100 persen. Jika 150 Wh keluar dari 1000 Wh yang masuk, efisiensi sistem berada di angka 15 persen. Angka ini adalah asumsi desain, bukan janji cuaca, sehingga harus dinyatakan bersama kondisi pengujiannya.

Beberapa faktor menentukan apakah angka itu realistis. Kualitas modul, panjang dan ukuran kabel, efisiensi inverter, sudut pemasangan, serta bayangan adalah variabel yang paling sering menggeser hasil. Vendor yang menyebut efisiensi tinggi tanpa merinci faktor-faktor tersebut layak dimintai penjelasan tertulis.

Ketentuan TKDN juga perlu diikat sejak tahap penawaran material. [SonusHUB](/tentang/sonushub/) menargetkan material kelistrikan dengan TKDN minimal 40 persen, sehingga bisa dipakai sebagai pembanding saat menilai penawaran pasokan. Untuk pelaksanaan di lapangan, layanan [EPC sistem tenaga surya](/layanan/sistem-tenaga-surya-epc/) mencakup desain hingga commissioning.

## Cara Memverifikasi Klaim Vendor

Verifikasi dimulai dari berkas, bukan dari presentasi. Minta datasheet resmi, sertifikat pengujian dari laboratorium terakreditasi, dan berkas perhitungan produksi tahunan lengkap dengan daftar asumsinya. Cocokkan angka degradasi modul dengan isi garansi tertulis, bukan dengan brosur.

Langkah berikutnya adalah bukti lapangan. Kunjungi minimal satu lokasi referensi yang sudah beroperasi lebih dari dua tahun, lalu minta data produksi aktual dari sistem pemantauan. Bandingkan data itu dengan proyeksi yang diajukan vendor pada kondisi lokasi serupa.

Klaim pengurangan emisi juga bisa diuji. Dengan faktor emisi rata-rata grid listrik Indonesia sekitar 0,87 kg CO2 per kWh, produksi 100.000 kWh setara dengan pengurangan sekitar 87 ton CO2 sebagai angka perkiraan. Minta vendor menunjukkan metodologi yang sama untuk kapasitas gedung Anda.

Terakhir, uji kepatuhan TKDN dan perizinan. Minta daftar komponen beserta nilai TKDN masing-masing, lalu bandingkan dengan [panel surya bersertifikat TKDN](/produk/sistem-panel-surya/panel-surya/panel-tkdn/) yang tersedia di pasar. Jika vendor tidak mampu menunjukkan berkas itu semua, spesifikasi tender PLTS gedung pemerintah yang paling ketat pun tidak akan menolong.

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
