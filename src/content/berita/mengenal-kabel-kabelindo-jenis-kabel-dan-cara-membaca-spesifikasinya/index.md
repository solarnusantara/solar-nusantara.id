---
title: "Mengenal Kabel Kabelindo: Jenis Kabel dan Cara Membaca Spesifikasinya"
seoTitle: "Mengenal Kabel Kabelindo"
description: "Kabel Kabelindo: lini NYY, NYA, dan NYAF di SonusHUB serta cara membaca spesifikasi di datasheet sebelum pengadaan material PLTS."
heroImage: "./hero.webp"
heroImageAlt: "Ilustrasi gulungan kabel daya AC berinti banyak dengan sepatu kabel dengan buku panduan tertutup di sampingnya"
focusKeyphrase: "kabel kabelindo"
pubDate: "2026-11-26"
tags: ["pengetahuan-material", "kabel-ac", "merek", "teknis"]
draft: false
---

Dalam kategori kabel daya dan pengkabelan AC untuk PLTS, kabel Kabelindo adalah salah satu lini yang tersedia di katalog SonusHUB. Bagi tim pengadaan, project manager, dan kontraktor EPC, relevansi merek ini terletak pada rentang jumlah inti dan penampang yang tercantum, bukan pada klaim pemasaran. Artikel ini merangkum lini yang tersedia, posisi tiap jenis di sistem, dan cara membaca spesifikasinya sebelum inquiry dikirim.

## Tiga Lini Produk yang Tersedia di SonusHUB

Katalog SonusHUB mencatat tiga lini kabel dari merek ini pada kategori kabel daya dan pengkabelan AC. Data pada tabel mengikuti katalog per 19 Oktober 2026 dan dibatasi pada informasi yang memang tersedia untuk pembeli.

| Lini produk | Jumlah inti | Penampang tersedia | Keterangan katalog |
|---|---|---|---|
| Kabel daya NYY Kabelindo | 1 sampai 4 inti | 1,5 sampai 300 mm² | dipakai untuk saluran daya |
| Kabel NYA Kabelindo | — | 1,5 sampai 400 mm² | dipakai juga sebagai kabel grounding |
| Kabel NYAF Kabelindo | — | 1,5 dan 2,5 mm² | hanya dua ukuran |

Tabel di atas hanya memuat jumlah inti dan rentang penampang. Konstruksi, tegangan pengenal, dan standar uji tidak dirinci di katalog, sehingga harus dikonfirmasi lewat datasheet resmi sebelum dipakai dalam perhitungan desain.

Rentang yang lebar bukan alasan untuk melewati verifikasi. Semakin banyak ukuran tersedia, semakin penting memastikan ukuran yang dipilih adalah hasil perhitungan, bukan sekadar yang paling dekat dengan stok yang ada.

## Posisi Kabel NYY, NYA, dan NYAF di Sistem

Kabel daya NYY umumnya dipakai pada saluran AC, misalnya dari keluaran inverter menuju panel distribusi lalu ke titik interkoneksi dengan jaringan. Rentang 1 sampai 4 inti dan penampang 1,5 sampai 300 mm² memberi ruang untuk saluran satu fasa maupun tiga fasa. Pada proyek yang lebih besar, ketersediaan penampang besar berguna ketika hasil perhitungan drop tegangan menuntut ukuran di atas kebutuhan arus nominal. Perlu dicatat, angka pada katalog adalah rentang ketersediaan, bukan rekomendasi ukuran untuk beban tertentu.

Kabel NYA adalah kabel inti tunggal dan dalam katalog SonusHUB disebut juga sebagai pilihan untuk grounding. Perannya sering terlewat saat spesifikasi disusun, padahal jalur pembumian menentukan keamanan sistem secara keseluruhan. Rentang penampangnya paling lebar di antara ketiga lini, yaitu 1,5 sampai 400 mm². Karena itu, lini ini sebaiknya dibahas bersama skema proteksi dan pembumian pada gambar instalasi.

Kabel NYAF tersedia dalam dua ukuran saja, 1,5 dan 2,5 mm². Ukuran sebesar ini lazim dipakai untuk pengawatan panel, rangkaian kontrol, dan sambungan di dalam perangkat. Karena rentangnya terbatas, jangan mengasumsikan NYAF tersedia dalam ukuran besar untuk jalur daya utama. Untuk kebutuhan tersebut, arahkan spesifikasi ke lini yang memang mencantumkan ukuran yang dibutuhkan.

Panjang dan ukuran kabel inverter termasuk faktor yang mempengaruhi efisiensi sistem PLTS. Efisiensi dihitung sebagai energi listrik yang dihasilkan dibagi energi surya yang diterima panel, lalu dikali 100 persen; sebagai contoh, 150 Wh keluaran dari 1000 Wh masukan setara 15 persen. Karena itu, spesifikasi kabel sebaiknya dibaca berdampingan dengan hasil perhitungan desain, bukan dipilih hanya dari arus nominal. Alur kerja desain dan pemasangan seperti ini juga dibahas pada [layanan EPC sistem tenaga surya](/layanan/sistem-tenaga-surya-epc/).

## Sisi AC dan Sisi DC Punya Syarat Berbeda

Ketiga lini di atas berada pada kelompok kabel daya AC. Sisi DC pada sistem PLTS memiliki kondisi kerja yang berbeda, misalnya paparan sinar matahari langsung dan penggunaan arus searah dalam waktu lama. Karena itu, kabel untuk sisi DC tidak otomatis bisa digantikan kabel daya AC berukuran sama. Pastikan lini yang dipilih memang ditujukan untuk peruntukannya sebelum spesifikasi masuk ke dokumen pengadaan.

Salah satu cara memeriksanya adalah mencocokkan posisi kabel pada diagram satu garis dengan jenis kabel yang dipilih. Jalur dari modul ke inverter, dari inverter ke panel, dan dari panel ke titik interkoneksi sebaiknya dibaca sebagai tiga segmen yang berbeda. Jika satu segmen memakai jenis yang salah, temuan bisa muncul saat pemeriksaan instalasi.

## Membaca Spesifikasi Kabel Kabelindo di Datasheet Resmi

Datasheet adalah dokumen yang mengikat secara teknis, sedangkan katalog berfungsi sebagai penunjuk awal. Sebelum spesifikasi dimasukkan ke dokumen pengadaan, pastikan butir-butir berikut bisa ditemukan pada datasheet resmi:

- Penampang nominal dan jumlah inti, dicocokkan dengan hasil perhitungan arus serta drop tegangan.
- Tegangan pengenal, jenis isolasi, dan bahan selubung, disesuaikan dengan kondisi pemasangan.
- Standar uji yang dirujuk, disebutkan lengkap dengan tahun terbitnya.
- Suhu kerja, radius bending, dan ketentuan pemasangan di dalam conduit, cable tray, atau tertanam.
- Panjang per roll atau per drum, agar tidak muncul sambungan di tengah jalur.
- Kode produk dan penandaan pada selubung, untuk memastikan barang yang dikirim sesuai pesanan.

Pembacaan notasi pada katalog dan datasheet juga perlu dicermati. Penulisan jumlah inti dan penampang bisa berbeda format antar dokumen, sehingga konfirmasi tertulis lebih aman daripada menyimpulkan sendiri. Jika ada butir yang tidak tercantum, tanyakan lewat kanal penjualan sebelum memesan, dan jangan mengisi kekosongan data dengan asumsi dari produk lain.

## Yang Dicek Saat Pengadaan dan Sebelum Inquiry Dikirim

Pengadaan kabel untuk PLTS bukan soal memilih ukuran terbesar yang tersedia. Yang perlu dicocokkan ada tiga: hasil perhitungan desain, kondisi jalur di lapangan, dan ketersediaan ukuran di katalog. Untuk langkah terakhir, daftar lini kabel daya AC bisa dilihat langsung pada [katalog kabel daya AC SonusHUB](https://sonushub.id/category/crx-ac-power-cable-sh?utm_source=solar-nusantara.id&utm_medium=artikel&utm_campaign=kabel-ac&utm_content=mengenal-kabel-kabelindo-jenis-kabel-dan-cara-membaca-spesifikasinya&utm_term=isi).

Beberapa hal yang paling sering menjadi temuan saat verifikasi:

- Kesesuaian penampang dengan dokumen desain dan gambar kerja versi terbaru.
- Jumlah inti serta panjang potongan per jalur, termasuk cadangan di kedua ujung.
- Kesesuaian jenis kabel dengan area pemasangan: jalur terbuka, di dalam tray, atau tertanam.
- Kelengkapan dokumen mutu dan, bila proyek mensyaratkannya, dokumen TKDN.

Perencanaan jalur juga tidak berdiri sendiri. Komponen seperti [sistem pemasangan panel surya](/produk/sistem-panel-surya/sistem-pemasangan/) dan [sistem pengkabelan PLTS](/produk/sistem-panel-surya/sistem-pengkabelan/) memengaruhi panjang jalur, yang pada akhirnya memengaruhi ukuran kabel. Perubahan kecil pada tata letak bisa mengubah kebutuhan panjang dan ukuran yang harus dipesan, jadi pastikan gambar kerja yang dipakai adalah versi terakhir.

## Menutup Pesanan dengan Spesifikasi yang Terverifikasi

Sebelum memesan, pastikan seluruh butir pada datasheet resmi kabel Kabelindo sudah terbaca dan cocok dengan desain proyek. Cocokkan juga kode produk di katalog dengan penandaan pada fisik barang dan dokumen pengiriman. Langkah ini sederhana, tetapi menjadi titik paling sering munculnya selisih antara kebutuhan dan barang yang diterima.

Untuk langkah berikutnya, bandingkan lini yang tersedia di [katalog SonusHUB](https://sonushub.id/products?utm_source=solar-nusantara.id&utm_medium=artikel&utm_campaign=kabel-ac&utm_content=mengenal-kabel-kabelindo-jenis-kabel-dan-cara-membaca-spesifikasinya&utm_term=isi), lalu kirim inquiry melalui keranjang inquiry atau hubungi Chat Sales SonusHUB. Tim yang baru pertama kali memakai platform ini dapat mulai dari [halaman pengenalan SonusHUB](/tentang/sonushub/) untuk memahami alur kerjanya.

---

**Solar Nusantara** berfokus pada pengembangan solusi energi surya untuk sektor komersial dan industri. Kami membantu perusahaan merancang sistem photovoltaic yang efisien dan berkelanjutan.

Untuk implementasi proyek, Anda dapat mengunjungi [**Sonus EPC**](https://sonus-epc.id), yang menyediakan layanan EPC (Engineering, Procurement, and Construction) untuk pemasangan sistem panel surya. Sementara itu, [**SonusHUB**](https://sonushub.id/?utm_source=solar-nusantara.id&utm_medium=artikel&utm_campaign=kabel-ac&utm_content=mengenal-kabel-kabelindo-jenis-kabel-dan-cara-membaca-spesifikasinya&utm_term=cta) hadir sebagai platform B2B yang menyediakan berbagai material kelistrikan dan komponen energi terbarukan bagi kebutuhan proyek dan instalasi profesional.

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
