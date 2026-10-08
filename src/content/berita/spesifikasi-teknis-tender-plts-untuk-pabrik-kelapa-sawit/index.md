---
title: "Spesifikasi Teknis Tender PLTS untuk Pabrik Kelapa Sawit"
description: "Panduan spesifikasi tender PLTS pabrik kelapa sawit: poin teknis wajib, skema BOO/BOT, dan cara memverifikasi klaim vendor sebelum kontrak."
focusKeyphrase: "spesifikasi tender plts pabrik kelapa sawit"
pubDate: "2026-10-02"
tags: ["kelapa-sawit", "pengadaan", "plts", "teknis"]
draft: true
---

Kesalahan pengadaan PLTS yang paling mahal di pabrik kelapa sawit jarang berupa harga satuan yang kemahalan. Yang lebih sering terjadi adalah tender yang hanya membandingkan angka rupiah per kWp, tanpa dokumen spesifikasi tender PLTS pabrik kelapa sawit yang mengikat secara teknis. Pemenang lelang lalu menyerahkan sistem yang lolos pemeriksaan visual, tetapi produksi energinya jauh di bawah hitungan penawaran. Ketika investasi sudah dibayar penuh, daya tawar pabrik sebagai pemilik praktis habis.

Pabrik kelapa sawit memiliki profil beban yang tidak umum: proses sterilizer, press, klarifikasi, dan pengolahan limbah berjalan hampir sepanjang hari. Debu, uap, cerobong boiler, tangki penyimpanan, dan atap gedung menciptakan kombinasi bayangan yang sulit ditiru di lokasi lain. Karena itu, dokumen tender tidak bisa memakai template gudang atau kantor. Spesifikasi harus diturunkan dari kondisi tapak dan pola konsumsi listrik pabrik itu sendiri.

## Karakteristik Beban dan Tapak yang Harus Masuk Dokumen

Pertama, minta profil beban interval 15 atau 30 menit selama minimal satu tahun, bukan hanya tagihan bulanan. PLTS memproduksi listrik pada siang hari, sedangkan sebagian besar beban pabrik berjalan 24 jam. Selisih inilah yang menentukan seberapa besar energi surya benar-benar terpakai sendiri dan seberapa besar yang bergantung pada skema ekspor-impor.

Kedua, cantumkan target produksi tahunan dalam kWh, bukan hanya kapasitas kWp. Kapasitas adalah ukuran peralatan; produksi adalah ukuran hasil. Tanpa angka kWh per tahun, vendor tidak punya kewajiban kinerja yang bisa diukur. Dua penawaran dengan kWp sama bisa menghasilkan energi tahunan yang berbeda jauh.

Ketiga, jelaskan titik interkoneksi dan status kuota PLN. Permen ESDM No. 2 Tahun 2024 mengubah aturan PLTS atap: pemasangan tidak lagi dibatasi 100% dari daya terpasang pelanggan PLN, melainkan tunduk pada kuota PLN yang tersedia. Artinya, kapasitas yang bisa disetujui bukan sekadar keputusan teknis, tetapi juga keputusan administratif yang harus diverifikasi lebih awal. Rujukan resminya tersedia di [JDIH Kementerian ESDM](https://jdih.esdm.go.id/).

## Poin Wajib dalam Spesifikasi Tender PLTS Pabrik Kelapa Sawit

Daftar berikut adalah klausul minimum yang sebaiknya tidak hilang dari dokumen, sekecil apa pun skala proyeknya.

1. Profil beban terukur, target produksi energi tahunan (kWh/tahun), dan asumsi iradiasi lokasi yang dipakai.
2. Kapasitas kWp, konfigurasi string, dan rasio DC/AC inverter yang direncanakan.
3. Spesifikasi modul: toleransi daya, koefisien suhu, laju degradasi tahunan, sertifikasi, serta komitmen TKDN. SonusHUB, misalnya, menargetkan material kelistrikan dengan TKDN minimal 40%.
4. Spesifikasi inverter: efisiensi, rentang tegangan MPPT, kelas proteksi IP, fitur anti-islanding, dan masa garansi.
5. Desain mekanikal: sudut pemasangan, jarak antar baris, struktur atap atau ground mount, serta analisis bayangan dari cerobong, tangki, dan bangunan sekitar.
6. Jalur kabel DC dan AC: panjang, ukuran penampang, jenis isolasi, dan batas susut tegangan yang diizinkan.
7. Skema proteksi, pentanahan, dan sistem monitoring produksi yang datanya dapat diakses pemilik.
8. Rumus dan target efisiensi sistem, yaitu (energi listrik yang dihasilkan ÷ energi surya yang diterima panel) × 100%. Sebagai ilustrasi, 150 Wh keluaran dari 1.000 Wh masukan setara dengan efisiensi 15%.
9. Lingkup O&M, jadwal pencucian modul, dan target OPEX tahunan.
10. Definisi skema kepemilikan: BOO, BOT, atau EPC penuh, beserta konsekuensinya.

Empat faktor utama yang mempengaruhi efisiensi perlu disebut eksplisit: kualitas modul, panjang dan ukuran kabel inverter, sudut pemasangan, serta bayangan. Vendor yang menolak membahas salah satunya biasanya sedang menyembunyikan asumsi yang lemah. Minta agar setiap asumsi ditulis, bukan disampaikan lisan saat presentasi.

## Angka CAPEX sebagai Pembanding, Bukan Patokan Mutlak

Untuk konteks anggaran, CAPEX PLTS 1 MWp di Indonesia berada di kisaran Rp 9-13 miliar pada 2024-2025. Modul surya menyumbang sekitar 40% dari total CAPEX sistem 1 MW. Sebagai contoh nyata, sebuah perusahaan industri memasang PLTS 1 MWp dengan CAPEX Rp 11 miliar dan estimasi OPEX Rp 220 juta per tahun.

Angka-angka itu berguna untuk menguji kewajaran penawaran, tetapi tidak boleh dipakai sebagai satu-satunya dasar penilaian. Penawaran yang jauh lebih murah biasanya memangkas struktur, proteksi, atau kualitas modul. Justru komponen itulah yang menentukan produksi energi selama 20 tahun ke depan.

Untuk perhitungan emisi, gunakan faktor emisi rata-rata grid listrik Indonesia sekitar 0,87 kg CO2 per kWh sebagai perkiraan. Sebagai ilustrasi, bila sistem 1 MWp diasumsikan menghasilkan 1.400.000 kWh per tahun, maka pengurangan emisinya sekitar 1.218 ton CO2 per tahun (1.400.000 × 0,87 ÷ 1.000). Angka produksi itu adalah asumsi, dan wajib diganti dengan hasil simulasi tapak sebelum dipakai dalam laporan ESG.

## Skema BOO dan BOT: Konsekuensi Kepemilikan dan Risiko

Pilihan skema menentukan siapa yang menanggung risiko kinerja. Pada skema BOO, aset PLTS tetap milik solar developer seterusnya, dan harga cenderung paling murah karena developer memegang aset jangka panjang. Pada skema BOT, aset milik developer selama masa kontrak, lalu menjadi milik pemilik gedung.

Bagi pabrik kelapa sawit, pertanyaan kuncinya bukan sekadar harga per kWh. Yang lebih penting adalah apakah pembayaran terikat pada produksi aktual atau pada kapasitas terpasang. Skema BOO dengan tarif per kWh menempatkan risiko produksi di pihak developer. Sebaliknya, pembelian EPC penuh memindahkan seluruh risiko teknis ke pabrik.

Karena itu, dokumen tender harus menyebut skema secara eksplisit dan mengikat. Untuk proyek yang dikerjakan penuh, [layanan EPC sistem tenaga surya](/layanan/sistem-tenaga-surya-epc/) mencakup desain, pengadaan, dan pemasangan dalam satu lingkup. Jika pabrik juga membutuhkan pemantauan konsumsi dan pelaporan berkala, [layanan manajemen energi](/layanan/manajemen-energi/) dapat digabungkan sejak tahap tender.

Dari sisi pengadaan material, [SonusHUB](/tentang/sonushub/) memungkinkan tim pengadaan memverifikasi ketersediaan komponen kelistrikan dengan target TKDN minimal 40%. Pendekatan ini mengurangi risiko keterlambatan pasokan yang sering muncul di tahap konstruksi.

## Cara Memverifikasi Klaim Vendor Sebelum Menandatangani Kontrak

Verifikasi dimulai dari simulasi produksi. Minta file simulasi, bukan hanya ringkasan hasil, lalu periksa asumsi iradiasi, kemiringan, dan faktor bayangan yang dipakai. Jika vendor hanya menyerahkan satu angka kWh tanpa asumsi yang bisa diaudit, klaim itu tidak layak dipercaya.

Berikut urutan pemeriksaan yang praktis.

- Cocokkan target produksi tahunan dengan profil beban pabrik, dan pastikan selisihnya dijelaskan.
- Uji contoh perhitungan efisiensi: pastikan vendor memakai definisi yang konsisten dengan rumus energi keluaran dibagi energi surya yang diterima.
- Minta bukti dokumen TKDN untuk komponen utama, bukan pernyataan lisan.
- Periksa sertifikat modul dan inverter, serta masa garansi produk dan garansi kinerja.
- Tinjau kurva produksi setelah commissioning, dan bandingkan dengan hasil simulasi pada periode yang sama.
- Pastikan klaim pengurangan emisi mencantumkan faktor emisi yang dipakai dan sumbernya.

Satu hal yang sering terlewat: minta kompensasi tertulis jika produksi aktual di bawah jaminan kinerja. Tanpa klausul itu, garansi hanya berupa dokumen tanpa konsekuensi. Selain itu, verifikasi status kuota PLN dan kesesuaian kapasitas dengan Permen ESDM No. 2 Tahun 2024 sebelum menandatangani apa pun.

Pada akhirnya, spesifikasi tender PLTS pabrik kelapa sawit berfungsi sebagai alat kontrol, bukan lampiran formalitas. Dokumen yang rapi memaksa vendor menjawab pertanyaan teknis sejak awal, sehingga penilaian tidak lagi bergantung pada harga termurah. Pabrik yang mengunci angka, asumsi, dan konsekuensinya akan jauh lebih terlindungi saat sistem beroperasi.

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
