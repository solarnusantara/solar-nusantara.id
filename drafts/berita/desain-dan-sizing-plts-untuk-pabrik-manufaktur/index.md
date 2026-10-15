---
title: "Desain dan Sizing PLTS untuk Pabrik Manufaktur"
description: "Panduan desain PLTS pabrik manufaktur: variabel sizing, contoh perhitungan 1 MWp, CAPEX, OPEX, regulasi, dan checklist data sebelum desain."
focusKeyphrase: "desain plts pabrik manufaktur"
pubDate: "2026-10-02"
tags: ["manufaktur", "desain-sistem", "plts", "panduan"]
draft: true
---

Ukuran PLTS pabrik manufaktur ditentukan oleh pertanyaan mendasar: berapa kWp yang benar-benar dibutuhkan, dan seberapa besar kuota PLN yang tersedia? Pabrik tidak bisa hanya menyalin ukuran sistem dari gedung kantor atau gudang, karena profil beban produksi berbeda. Ada empat variabel yang menentukan ukuran sistem.

Untuk pabrik manufaktur, ukuran PLTS ditentukan oleh beban siang hari, luas atap layak, kuota PLN, dan target finansial/ESG. Sistem 1 MWp dengan CAPEX Rp 11 miliar dan OPEX Rp 220 juta per tahun dapat menjadi titik awal, lalu divalidasi lewat simulasi produksi dan profil beban.

## Variabel Kunci dalam Desain PLTS Pabrik Manufaktur
Ada empat variabel yang menentukan ukuran sistem:
- Profil beban siang hari: seberapa besar daya produksi yang berjalan antara pukul 08.00-16.00.
- Luas dan kualitas atap: area bebas bayangan, daya dukung struktur, serta kemiringan pemasangan.
- Kuota PLN: kapasitas ekspor-impor yang tersedia setelah Permen ESDM No. 2 Tahun 2024.
- Target finansial dan ESG: target penghematan, payback, dan penurunan emisi.

Variabel pertama adalah profil beban siang hari. Pabrik manufaktur biasanya memiliki beban motor, kompresor, chiller, dan lini produksi yang berjalan pada jam kerja. PLTS menghasilkan listrik pada siang hari, sehingga semakin besar beban siang, semakin tinggi tingkat konsumsi langsung. Beban malam tidak dapat dilayani tanpa baterai, dan baterai menambah CAPEX serta OPEX.

Variabel kedua adalah luas atap yang layak secara teknis. Tidak semua area atap dapat dipasang modul; jarak antar baris, jalur pemeliharaan, exhaust, dan shading mengurangi kapasitas efektif. Sebagai perkiraan kasar, 1 kWp membutuhkan 5-7 m² area modul. Untuk sistem 1 MWp, kebutuhan lahan atap bisa berada di kisaran 5.000-7.000 m², lalu dikoreksi oleh desain layout.

Variabel ketiga adalah kuota PLN. Permen ESDM No. 2 Tahun 2024 mengubah batas 100% daya terpasang menjadi tunduk pada kuota PLN yang tersedia. Ini berarti kelayakan proyek tidak hanya ditentukan oleh atap dan beban, tetapi juga oleh persetujuan kapasitas dari PLN. Pabrik sebaiknya mengajukan studi awal dan berkoordinasi lebih awal agar ukuran sistem tidak melebihi kuota.

Variabel keempat adalah target finansial dan ESG. Manajemen perlu menetapkan prioritas: menekan OPEX listrik, mencapai payback tertentu, atau memenuhi target penurunan emisi. Tanpa prioritas ini, sizing bisa terlalu besar atau terlalu kecil. Misalnya, target payback 6 tahun akan menghasilkan batas CAPEX dan produksi energi yang berbeda dari target 10 tahun.

Keempat variabel ini saling mengunci. Beban siang yang besar tidak berguna jika kuota PLN tidak tersedia. Atap luas tidak otomatis menguntungkan jika tarif listrik rendah atau profil beban malam dominan. Karena itu, desain dan sizing harus iteratif: hitung kebutuhan, validasi teknis, cek regulasi, lalu uji finansial.

## Menghitung Kebutuhan Daya dan Energi Tahunan
Langkah awal sizing adalah mengubah tagihan listrik menjadi profil beban. Kumpulkan data kWh bulanan minimal 12 bulan, lalu pisahkan konsumsi siang dan malam. Jika data interval 15 menit tersedia, analisis ini lebih akurat.

Rumus dasar energi tahunan PLTS adalah: kapasitas kWp x specific yield x performance ratio. Specific yield adalah energi per kWp per tahun; untuk Indonesia, asumsi konservatif bisa 1.400 kWh/kWp/tahun. Performance ratio memperhitungkan rugi kabel, inverter, suhu, debu, dan shading.

Contoh, untuk sistem 1 MWp atau 1.000 kWp dengan specific yield 1.400 kWh/kWp/tahun dan performance ratio 0,80, produksi tahunan = 1.000 x 1.400 x 0,80 = 1.120.000 kWh. Angka ini adalah asumsi rekayasa, bukan janji produksi.

Setelah produksi diketahui, bandingkan dengan konsumsi siang hari. Jika konsumsi siang pabrik hanya 800.000 kWh per tahun, sistem 1 MWp berpotensi mengekspor kelebihan energi atau membatasi arus. Skema ekspor-impor mengikuti aturan PLN yang berlaku.

Langkah berikutnya adalah sizing inverter. Rasio DC/AC umumnya 1,1-1,3 untuk mengoptimalkan produksi tanpa klip berlebihan. Untuk 1 MWp DC, inverter 800-900 kW AC bisa dipertimbangkan, tergantung profil radiasi.

Terakhir, tentukan tata letak string dan jalur kabel. String yang terlalu panjang atau tidak seimbang dapat menurunkan efisiensi. Desain yang baik menyeimbangkan jumlah modul per string, panjang kabel DC, dan lokasi inverter.

## Contoh Perhitungan Bertahap Sistem 1 MWp
Mari gunakan contoh terverifikasi: PLTS 1 MWp dengan CAPEX Rp 11 miliar dan OPEX Rp 220 juta per tahun. Modul surya menyumbang sekitar 40% dari total CAPEX, atau sekitar Rp 4,4 miliar dalam contoh ini.

Asumsikan specific yield 1.400 kWh/kWp/tahun dan performance ratio 0,80. Produksi tahunan = 1.000 kWp x 1.400 x 0,80 = 1.120.000 kWh. Ini asumsi konservatif yang harus divalidasi dengan data radiasi lokasi.

Asumsikan tarif listrik efektif Rp 1.400 per kWh. Penghematan bruto = 1.120.000 kWh x Rp 1.400 = Rp 1,568 miliar per tahun. Jika seluruh energi dikonsumsi sendiri, penghematan bersih = Rp 1,568 miliar - Rp 220 juta = Rp 1,348 miliar per tahun.

Payback sederhana = CAPEX / penghematan bersih = Rp 11 miliar / Rp 1,348 miliar ≈ 8,2 tahun. Jika tarif efektif Rp 1.700 per kWh, penghematan bruto menjadi Rp 1,904 miliar dan payback turun menjadi sekitar 6,9 tahun.

Perhitungan ini belum memasukkan degradasi modul, kenaikan tarif, biaya modal, dan pajak. Namun, tahapan ini cukup untuk menyaring kelayakan awal sebelum desain rinci.

Untuk skema BOO atau BOT, struktur pembayaran dapat mengubah profil kas. BOO membuat aset tetap milik developer, sehingga harga listrik cenderung lebih murah. BOT mengalihkan aset ke pabrik setelah masa kontrak.

Jika pabrik memakai baterai, CAPEX dan OPEX akan meningkat. Karena itu, baterai sebaiknya dipertimbangkan hanya untuk beban kritis atau target ketahanan energi, bukan untuk seluruh beban produksi.

## Aspek Teknis: Efisiensi, Shading, dan Kualitas Komponen
Efisiensi sistem PLTS = (energi listrik yang dihasilkan / energi surya yang diterima panel) x 100%. Contoh, jika 150 Wh keluar dari 1.000 Wh energi surya masuk, efisiensi sistem = 15%. Angka ini membantu mengevaluasi kinerja aktual setelah commissioning.

Faktor yang mempengaruhi efisiensi meliputi kualitas modul, panjang dan ukuran kabel inverter, sudut pemasangan, serta bayangan. Shading dari cerobong, tiang, atau gedung tetangga dapat menurunkan produksi string secara tidak proporsional. Bahkan bayangan kecil pada satu modul dapat membatasi arus seluruh string.

Panjang kabel DC dan AC harus dihitung untuk menjaga drop tegangan. Umumnya drop tegangan DC dijaga di bawah 2% dan AC di bawah 3%, meskipun target akhir bergantung pada desain. Kabel yang terlalu kecil meningkatkan rugi daya dan panas.

Kualitas inverter dan proteksi menentukan keandalan jangka panjang. Pabrik sebaiknya memilih komponen dengan garansi minimal 5-10 tahun untuk inverter dan 25 tahun performa untuk modul. Pastikan juga ketersediaan suku cadang lokal.

TKDN menjadi pertimbangan penting, terutama untuk proyek yang mengejar insentif atau kebijakan lokal. SonusHUB menargetkan material kelistrikan dengan TKDN minimal 40%. Untuk modul, panel TKDN dapat dilihat pada [panel surya TKDN](/produk/sistem-panel-surya/panel-surya/panel-tkdn/).

Pemeliharaan juga mempengaruhi efisiensi. Pembersihan rutin, inspeksi termal, dan pemantauan produksi harian dapat menjaga performance ratio tetap tinggi. Tanpa pemantauan, penurunan produksi akibat debu atau kegagalan string bisa tidak terdeteksi.

## Regulasi dan Skema Bisnis: BOO, BOT, serta Kuota PLN
Regulasi utama yang perlu dipahami adalah Permen ESDM No. 2 Tahun 2024. Aturan ini menghapus batas 100% dari daya terpasang pelanggan PLN dan menggantinya dengan kuota PLN yang tersedia. Informasi resmi dapat dicek melalui [Kementerian ESDM](https://www.esdm.go.id/).

Implikasi praktisnya, pabrik tidak bisa otomatis memasang PLTS sebesar daya PLN yang dimiliki. Harus ada ketersediaan kuota pada sistem kelistrikan setempat. Karena itu, studi awal perlu mencakup surat permohonan, data teknis, dan kapasitas ekspor-impor yang diizinkan.

Dari sisi bisnis, ada beberapa skema umum. Pada skema BOO (Build Own Operate), aset PLTS tetap milik solar developer seterusnya. Harga cenderung paling murah karena developer memegang aset jangka panjang.

Pada skema BOT (Build Operate Transfer), aset milik developer selama masa kontrak, lalu menjadi milik pemilik gedung. Skema ini cocok jika pabrik ingin memiliki aset pada akhir periode. Ada juga skema EPC murni di mana pabrik membeli sistem sejak awal.

Pilihan skema mempengaruhi CAPEX, OPEX, dan risiko. EPC murni membutuhkan modal besar di awal, tetapi penghematan penuh menjadi milik pabrik. BOO dan BOT menurunkan beban modal awal, tetapi pabrik membayar tarif listrik kepada developer.

Untuk pabrik yang ingin mengendalikan desain dan integrasi dengan sistem energi lain, layanan [sistem tenaga surya EPC](/layanan/sistem-tenaga-surya-epc/) dapat menjadi jalur yang lebih langsung. Tim EPC akan menangani desain, pengadaan, konstruksi, dan commissioning.

Sebelum memilih skema, lakukan uji tuntas terhadap rekam jejak developer. Periksa kemampuan O&M, garansi, dan struktur kontrak. Jangan hanya membandingkan harga per kWp, karena biaya jangka panjang dan risiko kinerja berbeda.

## CAPEX, OPEX, dan Proyeksi Penghematan
CAPEX PLTS 1 MWp di Indonesia berada di kisaran Rp 9-13 miliar untuk periode 2024-2025. Modul surya menyumbang sekitar 40% dari total CAPEX sistem 1 MW. Sisanya mencakup inverter, struktur, kabel, proteksi, instalasi, dan biaya engineering.

OPEX tahunan mencakup pembersihan, inspeksi, penggantian komponen minor, dan pemantauan. Contoh nyata, PLTS 1 MWp dapat memiliki OPEX sekitar Rp 220 juta per tahun. Angka ini perlu disesuaikan dengan lokasi, tingkat polusi, dan kontrak O&M.

Penghematan bergantung pada tarif listrik efektif dan proporsi energi yang dikonsumsi sendiri. Jika tarif Rp 1.400 per kWh dan produksi 1.120.000 kWh, penghematan bruto sekitar Rp 1,568 miliar per tahun. Setelah OPEX Rp 220 juta, penghematan bersih sekitar Rp 1,348 miliar.

Payback sederhana untuk CAPEX Rp 11 miliar adalah sekitar 8,2 tahun. Jika CAPEX turun ke Rp 9 miliar, payback turun menjadi sekitar 6,7 tahun dengan penghematan yang sama. Sebaliknya, kenaikan OPEX atau penurunan produksi memperpanjang payback.

Manajemen energi membantu mengoptimalkan konsumsi siang hari agar energi PLTS tidak diekspor percuma. Menggeser beban tertentu ke siang hari dapat meningkatkan penghematan tanpa menambah kapasitas PLTS. Layanan [manajemen energi](/layanan/manajemen-energi/) dapat membantu memetakan peluang ini.

Hitung juga biaya modal jika menggunakan pinjaman atau leasing. Suku bunga dan tenor akan mempengaruhi arus kas, meskipun analisis payback sederhana tidak memasukkannya. Untuk keputusan akhir, gunakan NPV dan IRR.

## Dampak ESG dan Emisi
PLTS membantu pabrik menurunkan emisi lingkup 2 dari listrik yang dibeli. Faktor emisi rata-rata grid listrik Indonesia sekitar 0,87 kg CO2 per kWh, sebagai perkiraan. Angka ini dapat berbeda menurut wilayah dan bauran pembangkit.

Dengan produksi 1.120.000 kWh per tahun, penurunan emisi = 1.120.000 x 0,87 = 974.400 kg CO2 per tahun, atau sekitar 974 ton CO2 per tahun. Jika produksi mencapai 1.400.000 kWh, penurunan emisi sekitar 1.218 ton CO2 per tahun.

Angka ini penting untuk laporan ESG, pengajuan green financing, dan komunikasi ke pelanggan. Namun, klaim emisi harus mengikuti metodologi yang diakui. Gunakan faktor emisi resmi terbaru dan dokumentasikan asumsi produksi.

Selain emisi, PLTS dapat mendukung target energi terbarukan dalam bauran energi perusahaan. Pabrik manufaktur yang mengekspor produk ke pasar sensitif karbon sering diminta menunjukkan jejak karbon. PLTS atap menjadi salah satu opsi cepat untuk mengurangi intensitas emisi.

Dampak ESG tidak hanya lingkungan. Proyek PLTS dapat memperkuat tata kelola energi, transparansi data, dan keterlibatan pemangku kepentingan. Pemantauan produksi bulanan menjadi bukti kuantitatif untuk laporan keberlanjutan.

Untuk memaksimalkan manfaat, integrasikan data PLTS dengan sistem manajemen energi. Dengan begitu, produksi energi, konsumsi, dan emisi dapat dipantau dalam satu dasbor. Ini juga memudahkan audit internal dan eksternal.

## Checklist Data Sebelum Desain
Sebelum memulai desain rinci, kumpulkan data berikut agar proses sizing berjalan cepat dan akurat.
1. Tagihan listrik 12 bulan terakhir, termasuk kWh, kW, dan tarif.
2. Data interval 15 menit atau minimal profil beban harian siang-malam.
3. Single line diagram dan kapasitas daya terpasang PLN.
4. Layout atap, ukuran, kemiringan, material, dan umur struktur.
5. Foto drone atau denah shading dari cerobong, tiang, dan gedung sekitar.
6. Rencana ekspansi produksi dan penambahan beban 3-5 tahun ke depan.
7. Target finansial: payback maksimum, CAPEX, dan skema BOO/BOT/EPC.
8. Target ESG dan kebutuhan pelaporan emisi.
9. Batasan kuota PLN dan status permohonan.
10. Preferensi TKDN, merek, dan kebutuhan baterai.

Data ini memungkinkan engineer menghitung produksi, memilih inverter, dan menyusun layout string. Tanpa data beban yang bersih, simulasi hanya menjadi tebakan. Tanpa layout atap yang akurat, kapasitas aktual bisa jauh lebih kecil dari rencana.

Setelah data lengkap, lakukan iterasi desain: hitung produksi, validasi konsumsi siang, cek kuota, lalu uji ekonomi. Bandingkan minimal dua skenario, misalnya 750 kWp dan 1 MWp. Skenario terbaik adalah yang memberi penghematan tinggi tanpa menimbulkan kelebihan energi yang tidak termanfaatkan.

Libatkan manajer fasilitas, manajer energi, pengadaan, dan direksi sejak awal. Keputusan sizing menyentuh operasi, modal, dan target ESG. Dengan keterlibatan lintas fungsi, desain tidak berhenti di dokumen teknis.

Sebagai langkah akhir, siapkan ringkasan satu halaman berisi data utama dan asumsi. Ringkasan ini menjadi dasar penawaran EPC, studi kelayakan, atau diskusi dengan solar developer. Dengan pendekatan ini, desain PLTS pabrik manufaktur tidak hanya menjawab berapa kWp, tetapi juga mengapa ukuran itu dipilih.

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
