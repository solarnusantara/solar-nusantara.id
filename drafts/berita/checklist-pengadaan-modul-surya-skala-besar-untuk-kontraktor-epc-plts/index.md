---
title: "Checklist Pengadaan Modul Surya Skala Besar untuk Kontraktor EPC PLTS"
seoTitle: "Pengadaan Modul Surya untuk Kontraktor EPC"
description: "Checklist pengadaan modul surya kontraktor EPC: verifikasi teknis, TKDN, dan dokumen wajib sebelum PO diterbitkan."
heroImage: "./hero.webp"
heroImageAlt: "Ilustrasi modul surya dalam peti kayu di atas palet dengan papan jepit berisi daftar centang"
focusKeyphrase: "pengadaan modul surya kontraktor epc"
pubDate: "2026-10-25"
tags: ["epc", "modul-surya", "pengadaan-material", "teknis"]
draft: true
---

Kesalahan pengadaan yang paling mahal biasanya tidak terlihat saat negosiasi, tetapi muncul di lapangan: modul tiba dengan dimensi berbeda dari rel yang sudah dipesan, atau tegangan string tidak cocok dengan jendela MPPT inverter. Dalam pengadaan modul surya kontraktor EPC, satu lembar datasheet yang tidak dibaca sampai habis bisa memaksa perubahan struktur, kabel, dan jadwal commissioning. Artikel ini tidak mengulang dasar-dasar PLTS, melainkan langsung ke hal spesifik yang perlu Anda periksa sebelum mengirim inquiry dan sebelum menerbitkan PO.

Sejak Permen ESDM No. 2 Tahun 2024, pemasangan PLTS atap tidak lagi dibatasi 100% dari daya terpasang pelanggan PLN, melainkan tunduk pada kuota PLN yang tersedia. Bagi kontraktor EPC, perubahan ini menggeser urutan kerja: ketersediaan kuota harus dikonfirmasi lebih awal, bukan diasumsikan. Modul yang sudah dibeli tidak otomatis bisa dipasang bila kuota untuk lokasi tersebut belum tersedia.

Konsekuensinya, jadwal pengadaan modul tidak bisa dipisahkan dari jadwal persetujuan kuota. Menetapkan tanggal pengiriman sebelum status kuota jelas hanya memindahkan risiko ke gudang proyek. Praktik yang lebih aman adalah menyiapkan dua skenario konfigurasi, lalu mengunci salah satunya setelah status kuota terkonfirmasi.

## Mengapa Pengadaan Modul Surya Kontraktor EPC Sering Meleset

Tiga sumber kesalahan paling umum adalah ketidaksesuaian arus-tegangan antara string dan inverter, geometri modul yang tidak cocok dengan clamp mounting, serta dokumen TKDN yang baru diminta setelah barang dikirim. Sumber keempat bersifat administratif: spesifikasi di PO tidak identik dengan yang diuji di pabrik. Semuanya bisa dicegah dengan verifikasi dokumen, bukan dengan negosiasi ulang setelah barang tiba.

Klaim efisiensi juga sering terlalu longgar. Efisiensi sistem PLTS dihitung sebagai energi listrik yang dihasilkan dibagi energi surya yang diterima panel, dikali 100%. Contoh sederhananya, 150 Wh keluaran dari 1000 Wh masukan berarti efisiensi 15%. Angka ini dipengaruhi kualitas modul, panjang dan ukuran kabel inverter, sudut pemasangan, serta bayangan.

## Checklist Teknis Sebelum Mengirim Inquiry

Daftar ini disusun mengikuti urutan keputusan, dari yang paling sulit diubah hingga yang paling mudah disesuaikan. Butir awal menyangkut kelayakan interkoneksi, butir tengah menyangkut kompatibilitas antarkomponen, dan butir akhir menyangkut bukti administrasi. Gunakan sebagai urutan kerja, bukan sekadar bacaan.

1. Konfirmasi ketersediaan kuota PLN untuk titik interkoneksi sebelum mengunci spesifikasi modul.
2. Cocokkan jendela tegangan MPPT inverter dengan rentang tegangan string pada suhu sel terendah dan tertinggi di lokasi proyek.
3. Baca datasheet modul sampai ke koefisien suhu, toleransi daya, dan arus maksimumnya, bukan hanya angka watt puncak.
4. Pastikan dimensi, lubang pemasangan, dan zona clamp kompatibel dengan rel yang dipilih melalui [sistem pemasangan](/produk/sistem-panel-surya/sistem-pemasangan/).
5. Verifikasi kelas proteksi, tegangan sistem, dan ketahanan UV kabel DC lewat halaman [sistem pengkabelan](/produk/sistem-panel-surya/sistem-pengkabelan/).
6. Minta sertifikat IEC untuk modul dan inverter; bila Anda ragu nomor standarnya, sebut jenis standarnya saja dan minta salinan sertifikat asli.
7. Periksa jumlah input MPPT dan rentang tegangan [inverter on-grid](/produk/sistem-panel-surya/inverter/on-grid/) yang direncanakan terhadap konfigurasi string.
8. Pastikan modul masuk kategori TKDN yang disyaratkan proyek, misalnya melalui [panel surya TKDN](/produk/sistem-panel-surya/panel-surya/panel-tkdn/).
9. Bandingkan kategori modul pada [katalog modul surya SonusHUB](https://sonushub.id/category/pvx-solar-modules-sh?utm_source=solar-nusantara.id&utm_medium=artikel&utm_campaign=pv-modul&utm_content=checklist-pengadaan-modul-surya-skala-besar-untuk-kontraktor-epc-plts&utm_term=isi) agar spesifikasi yang diminta sebanding antar pemasok.
10. Simpan label, kemasan, dan foto lot untuk dicocokkan saat penerimaan barang di lokasi.
11. Catat toleransi pengiriman dan jumlah cadangan modul yang disepakati untuk kebutuhan penggantian.

Butir 4 sampai 8 memang beririsan dengan pekerjaan desain, tetapi justru di situ pengadaan paling sering terputus dari engineering. Menanyakan hal ini di tahap inquiry memaksa pemasok menjawab dengan data, bukan dengan pernyataan umum. Pemasok yang tidak bisa menyediakan datasheet berrevisi atau sertifikat yang masih berlaku sebaiknya tidak masuk daftar pendek.

## Menyesuaikan Skema Kepemilikan dan Kuota

Skema kepemilikan mempengaruhi cara Anda membaca penawaran modul. Pada skema BOO (Build Own Operate), aset PLTS tetap milik solar developer seterusnya. Pada skema BOT (Build Operate Transfer), aset milik developer selama masa kontrak, lalu menjadi milik pemilik gedung. Bagi kontraktor EPC, perbedaan ini menentukan siapa yang menanggung risiko degradasi modul dan siapa yang memegang garansi jangka panjang.

Pertanyaan yang perlu diajukan ke pemilik aset sederhana: siapa yang mengurus klaim garansi, siapa yang menyimpan berita acara pengujian, dan bagaimana prosedur penggantian modul bila terjadi kerusakan setelah serah terima. Ketiga jawaban itu sebaiknya tertulis sebelum spesifikasi modul dikunci. Untuk proyek dengan persyaratan kandungan lokal, sebagai pembanding SonusHUB menargetkan material kelistrikan dengan TKDN minimal 40%.

Untuk dokumen lingkungan, faktor emisi rata-rata grid listrik Indonesia sekitar 0,87 kg CO2 per kWh dapat dipakai sebagai perkiraan. Sebutkan angka itu sebagai perkiraan, bukan hasil pengukuran lokasi. Untuk perhitungan teknis yang lebih rinci, arahkan tim ke [layanan sistem tenaga surya EPC](/layanan/sistem-tenaga-surya-epc/) agar asumsi desain dan pengadaan berada dalam satu dokumen.

## Dokumen Wajib Sebelum PO Diterbitkan

Checklist berikut yang membedakan inquiry rapi dari pesanan berisiko. Minta semuanya dalam bentuk berkas, bukan tautan yang bisa berubah.

- Lembar datasheet resmi dengan nomor revisi dan tanggal terbit.
- Sertifikat IEC atau SNI yang masih berlaku beserta lampiran hasil pengujian.
- Surat pernyataan TKDN beserta dasar perhitungannya.
- Sertifikat manajemen mutu pabrikan dan laporan audit pabrik bila tersedia.
- Garansi produk dan garansi daya dalam bentuk tertulis, lengkap dengan syarat klaim.
- Berita acara flash test per lot atau per palet.
- Skema kemasan, penandaan, dan prosedur klaim kerusakan saat pengiriman.
- Konfirmasi tertulis kompatibilitas modul dengan inverter dan sistem mounting.
- Dokumen kepabeanan atau perizinan impor bila modul didatangkan dari luar negeri.
- Kontak teknis pabrikan untuk eskalasi klaim di luar jalur sales.

Untuk proyek pemerintah, dokumen TKDN biasanya diperiksa lebih dulu daripada spesifikasi teknis. Siapkan perhitungannya sejak tahap inquiry agar tidak terjadi penundaan di akhir. Bila ada butir yang belum tersedia, jangan menutupinya dengan jadwal pengiriman yang dipercepat, karena modul tanpa dokumen lengkap akan menjadi temuan saat inspeksi dan serah terima.

Dengan sebelas butir checklist dan satu berkas dokumen di atas, pengadaan modul surya kontraktor EPC bisa berjalan sebagai proses verifikasi, bukan tebakan. Sebelum PO diterbitkan, pastikan setiap klaim spesifikasi punya dokumen pendukung dan setiap penyimpangan sudah disetujui secara tertulis. Langkah berikutnya sederhana: buka [katalog SonusHUB](https://sonushub.id/products?utm_source=solar-nusantara.id&utm_medium=artikel&utm_campaign=pv-modul&utm_content=checklist-pengadaan-modul-surya-skala-besar-untuk-kontraktor-epc-plts&utm_term=isi), bandingkan kategori yang Anda butuhkan, lalu kirim inquiry lewat keranjang inquiry atau hubungi Chat Sales SonusHUB.

---

**Solar Nusantara** berfokus pada pengembangan solusi energi surya untuk sektor komersial dan industri. Kami membantu perusahaan merancang sistem photovoltaic yang efisien dan berkelanjutan.

Untuk implementasi proyek, Anda dapat mengunjungi [**Sonus EPC**](https://sonus-epc.id), yang menyediakan layanan EPC (Engineering, Procurement, and Construction) untuk pemasangan sistem panel surya. Sementara itu, [**SonusHUB**](https://sonushub.id/?utm_source=solar-nusantara.id&utm_medium=artikel&utm_campaign=pv-modul&utm_content=checklist-pengadaan-modul-surya-skala-besar-untuk-kontraktor-epc-plts&utm_term=cta) hadir sebagai platform B2B yang menyediakan berbagai material kelistrikan dan komponen energi terbarukan bagi kebutuhan proyek dan instalasi profesional.

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
