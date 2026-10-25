---
title: "Mengenal Inverter GoodWe: Lini Produk dan Cara Membaca Spesifikasinya"
seoTitle: "Mengenal Inverter GoodWe"
description: "Panduan mengenal inverter GoodWe: lini on-grid, hybrid, baterai, dan smart meter di SonusHUB, plus cara membaca spesifikasi datasheet resminya."
heroImage: "./hero.webp"
heroImageAlt: "Ilustrasi inverter surya dengan buku panduan tertutup di sampingnya"
focusKeyphrase: "inverter goodwe"
pubDate: "2026-10-25"
tags: ["pengetahuan-material", "inverter", "merek", "teknis"]
draft: true
---

Di kategori material kelistrikan PLTS, GoodWe memproduksi inverter string dan hybrid, baterai penyimpanan, serta smart meter. Ketiga kelompok produk itu saling terkait: inverter menentukan konfigurasi string DC dan keluaran AC, baterai menentukan apakah sistem berarsitektur hybrid, dan smart meter menutup kebutuhan pengukuran energi. Bagi tim pengadaan, pemilihan seri yang tepat berawal dari cara membaca spesifikasi inverter GoodWe secara berurutan, dimulai dari arsitektur sistem.

## Lini Produk GoodWe di Katalog SonusHUB

Katalog SonusHUB mencantumkan empat kelompok produk GoodWe: inverter on-grid, inverter hybrid, baterai, dan smart meter. Tabel berikut merangkum seri beserta rentang daya yang tercatat, dan bisa dipakai sebagai penyaring awal sebelum datasheet masing-masing seri dibuka.

| Kelompok | Seri | Rentang daya / tipe |
|---|---|---|
| Inverter on-grid | XS | 1 kW; 2,5 kW; 3 kW |
| Inverter on-grid | DNS | 6 kW |
| Inverter on-grid | SDT G2 | 4 kW sampai 20 kW |
| Inverter on-grid | SMT | 25 kW |
| Inverter hybrid | ES | 3,6 kW sampai 6 kW |
| Inverter hybrid | EH | 3,6 kW dan 5 kW |
| Inverter hybrid | ET | 5 kW; 8 kW; 10 kW |
| Baterai | Lynx Home F | tegangan tinggi |
| Baterai | Litium tegangan rendah | 5,4 kWh, tipe dinding dan rak |
| Smart meter | GM1000 | satu fase |
| Smart meter | GM3000 | tiga fase |

Rentang pada tabel adalah rentang seri, bukan jaminan bahwa setiap nilai daya tersedia sebagai unit tunggal pada waktu tertentu. Untuk ketersediaan tipe, konfirmasi melalui katalog atau Chat Sales. Pembagian ini memperlihatkan bahwa pemilihan seri ditentukan oleh arsitektur sistem, bukan oleh angka daya semata. Sistem on-grid tanpa penyimpanan mengarah ke jajaran seri on-grid, sedangkan sistem dengan baterai mengarah ke seri hybrid.

Smart meter GM1000 dan GM3000 melengkapi kelompok inverter, dengan pembeda utama jumlah fase: satu fase dan tiga fase. Pilihan itu harus mengikuti instalasi di lokasi, bukan sebaliknya.

## Menentukan Konfigurasi Sebelum Membaca Angka

Langkah pertama evaluasi teknis adalah memastikan apakah proyek memerlukan penyimpanan energi. Keputusan itu menyaring lini produk secara signifikan dan menghindari perbandingan yang tidak setara antar seri. Setelah arsitektur jelas, barulah spesifikasi listrik dibaca satu per satu.

Beberapa pertanyaan penyaring yang praktis diajukan ke perancang sistem:

- Apakah beban harus tetap terlayani saat suplai dari jaringan tidak tersedia?
- Berapa jumlah string, dan bagaimana orientasi serta kemiringan antarstring?
- Apakah instalasi satu fase atau tiga fase?
- Apakah pemantauan energi perlu terhubung ke smart meter?

Jawaban atas pertanyaan tersebut menentukan seri mana yang layak dibuka datasheet-nya, dan mana yang cukup dicatat sebagai alternatif.

Pada sistem hybrid, baterai masuk ke ruang lingkup pengadaan sejak awal. Katalog mencantumkan dua kelas tegangan: Lynx Home F dengan tegangan tinggi, serta baterai litium tegangan rendah 5,4 kWh dalam tipe dinding dan rak. Kelas tegangan yang didukung inverter hybrid harus dipastikan dari datasheet seri yang bersangkutan, karena katalog hanya menyebut kelas tegangannya.

## Membaca Spesifikasi Inverter GoodWe di Datasheet Resmi

Datasheet adalah dokumen yang mengikat secara teknis, sehingga pembacaan harus dilakukan pada versi terbaru dari sumber resmi. Beberapa parameter berikut paling sering menentukan kelayakan sebuah seri terhadap desain proyek.

- Daya keluaran AC: bedakan daya nominal dan daya maksimum, lalu cocokkan dengan kapasitas sistem serta kapasitas koneksi yang disetujui.
- Jumlah dan rentang MPPT: menentukan kemampuan menangani string dengan orientasi atau kemiringan berbeda, sekaligus toleransi terhadap bayangan.
- Tegangan input DC maksimum dan arus input per MPPT: nilai pada datasheet harus lebih tinggi dari hasil perhitungan string, termasuk koreksi suhu.
- Rentang tegangan dan frekuensi AC: pastikan sesuai dengan kualitas suplai di lokasi proyek.
- Tingkat proteksi dan metode pendinginan: menentukan apakah unit dapat ditempatkan di area terpapar atau harus terlindung.
- Dimensi dan berat: memengaruhi rencana penempatan, akses servis, serta struktur penopang.
- Antarmuka komunikasi dan kompatibilitas smart meter: menentukan apakah data produksi bisa dibaca sesuai kebutuhan pelaporan.

Parameter yang tidak dibahas di sini, termasuk nilai efisiensi, rentang suhu operasi, dan masa garansi, harus dibaca langsung dari datasheet resmi masing-masing seri. Angka tersebut berbeda antar seri dan antar varian daya, sehingga generalisasi berisiko menimbulkan kesalahan spesifikasi.

Satu hal yang sering salah dibaca adalah efisiensi. Angka efisiensi pada datasheet inverter merupakan efisiensi perangkat, bukan efisiensi sistem PLTS. Efisiensi sistem dihitung sebagai (energi listrik yang dihasilkan / energi surya yang diterima panel) x 100%; sebagai contoh, 150 Wh keluaran dari 1000 Wh masukan setara 15%. Nilai sistem dipengaruhi kualitas modul, panjang dan ukuran kabel inverter, sudut pemasangan, serta bayangan, sehingga tidak bisa disamakan dengan angka pada datasheet.

## Titik Pemeriksaan Sebelum Pemesanan

Sebelum inquiry dikirim, tim pengadaan sebaiknya memverifikasi beberapa hal secara berurutan agar tidak terjadi revisi pesanan.

1. Konfirmasi kode produk dan seri persisnya, termasuk varian daya, karena satu seri dapat memiliki beberapa nilai daya.
2. Unduh datasheet resmi versi terbaru dan simpan sebagai lampiran evaluasi.
3. Cocokkan kebutuhan aksesori: smart meter, konektivitas pemantauan, dan perlengkapan pemasangan.
4. Untuk sistem hybrid, pastikan tipe baterai yang dipilih sesuai dengan inverter hybrid yang dipesan.
5. Periksa dokumen TKDN secara terpisah dari datasheet teknis; SonusHUB sendiri menargetkan material kelistrikan dengan TKDN minimal 40%.
6. Pastikan kabel DC dan AC dihitung untuk arus serta tegangan rangkaian yang dipilih, dengan mengacu pada [sistem pengkabelan](/produk/sistem-panel-surya/sistem-pengkabelan/).
7. Tinjau kesiapan koneksi ke jaringan PLN, termasuk kuota yang tersedia sesuai Permen ESDM No. 2 Tahun 2024 melalui [jdih.esdm.go.id](https://jdih.esdm.go.id/).

Untuk penyaringan awal, katalog [inverter string dan hybrid di SonusHUB](https://sonushub.id/category/inx-string-hybrid-inverters-sh?utm_source=solar-nusantara.id&utm_medium=artikel&utm_campaign=inverter&utm_content=mengenal-inverter-goodwe-lini-produk-dan-cara-membaca-spesifikasinya&utm_term=isi) dapat dipakai untuk melihat varian yang tersedia sebelum meminta datasheet. Bila proyek mencakup pekerjaan pemasangan, koordinasi dengan tim [layanan EPC sistem tenaga surya](/layanan/sistem-tenaga-surya-epc/) membantu memastikan spesifikasi inverter selaras dengan desain keseluruhan.

Langkah terakhir sederhana: buka [katalog SonusHUB](https://sonushub.id/products?utm_source=solar-nusantara.id&utm_medium=artikel&utm_campaign=inverter&utm_content=mengenal-inverter-goodwe-lini-produk-dan-cara-membaca-spesifikasinya&utm_term=isi), bandingkan seri yang relevan, lalu kirim inquiry lewat keranjang atau hubungi Chat Sales. Dengan urutan pemeriksaan di atas, keputusan atas inverter GoodWe dapat diambil berdasarkan dokumen resmi, bukan asumsi.

---

**Solar Nusantara** berfokus pada pengembangan solusi energi surya untuk sektor komersial dan industri. Kami membantu perusahaan merancang sistem photovoltaic yang efisien dan berkelanjutan.

Untuk implementasi proyek, Anda dapat mengunjungi [**Sonus EPC**](https://sonus-epc.id), yang menyediakan layanan EPC (Engineering, Procurement, and Construction) untuk pemasangan sistem panel surya. Sementara itu, [**SonusHUB**](https://sonushub.id/?utm_source=solar-nusantara.id&utm_medium=artikel&utm_campaign=inverter&utm_content=mengenal-inverter-goodwe-lini-produk-dan-cara-membaca-spesifikasinya&utm_term=cta) hadir sebagai platform B2B yang menyediakan berbagai material kelistrikan dan komponen energi terbarukan bagi kebutuhan proyek dan instalasi profesional.

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
