---
title: "Desain dan Sizing PLTS untuk Pabrik Kelapa Sawit"
description: "Panduan desain PLTS pabrik kelapa sawit: variabel sizing, contoh perhitungan 1 MWp, dan checklist data sebelum desain dimulai."
focusKeyphrase: "desain plts pabrik kelapa sawit"
pubDate: "2026-10-03"
tags: ["kelapa-sawit", "desain-sistem", "plts", "panduan"]
draft: true
---

Ukuran PLTS atap untuk pabrik kelapa sawit tidak ditentukan oleh luas atap yang kosong, melainkan oleh profil beban harian, kapasitas daya terpasang PLN, dan kuota PLTS yang tersedia di wilayah kerja setempat. Kesalahan paling umum adalah memulai dari jumlah panel, bukan dari data konsumsi listrik. Akibatnya sistem terbangun terlalu besar, sebagian produksi tidak terserap, dan periode pengembalian modal memanjang. Artikel ini membahas desain PLTS pabrik kelapa sawit secara menyeluruh, mulai dari variabel penentu, contoh perhitungan bertahap, hingga checklist data yang perlu disiapkan sebelum tim engineering mulai menggambar.

> **Ringkasan:** Desain dan sizing PLTS pabrik kelapa sawit bertumpu pada tiga angka utama: konsumsi listrik harian dalam kWh, daya terpasang PLN, dan kuota PLTS yang tersedia. Dari ketiga angka itu, kapasitas kWp, konfigurasi inverter, dan skema pembiayaan dapat dihitung secara bertahap dan terukur.

## Variabel yang Menentukan Desain PLTS Pabrik Kelapa Sawit

Ukuran sistem tidak bisa ditentukan dari satu angka. Empat variabel saling mengunci dan harus dibaca bersamaan sebelum desain dimulai: profil beban harian, kapasitas daya terpasang PLN, kuota PLTS yang tersedia, serta luas dan kekuatan struktur atap atau lahan.

Profil beban harian menentukan seberapa besar energi surya dapat langsung dikonsumsi di tempat. Pabrik kelapa sawit umumnya beroperasi 16-20 jam per hari dengan beban besar pada sterilizer, digester, screw press, dan peralatan boiler. Pada rentang pukul 08.00-16.00, beban pabrik biasanya tetap tinggi sehingga sebagian besar produksi PLTS dapat diserap langsung tanpa penyimpanan.

Kapasitas daya terpasang PLN dan kuota menjadi batas atas yang mengikat secara administratif. Permen ESDM No. 2 Tahun 2024 mengubah aturan sebelumnya: pemasangan PLTS atap tidak lagi dibatasi 100% dari daya terpasang pelanggan PLN, melainkan tunduk pada kuota PLN yang tersedia. Konsekuensinya, kelayakan proyek harus diverifikasi ke PLN setempat lebih dulu, bukan diasumsikan.

Luas area dan kapasitas struktur menentukan batas fisik. Modul berdaya sekitar 550-600 Wp menempati luas sekitar 2,6-2,8 meter persegi per unit, dengan beban tambahan pada atap yang biasanya diasumsikan 12-15 kg per meter persegi. Untuk atap metal deck berusia di atas 15 tahun, verifikasi struktur menjadi paket pekerjaan tersendiri dalam tahap desain.

Dua variabel penunjang adalah irradiasi lokasi dan akses pemeliharaan. Irradiasi rata-rata Indonesia berada di kisaran 4,5-5,0 kWh per meter persegi per hari, tetapi angka spesifik lokasi pabrik tetap perlu dikonfirmasi melalui data satelit atau pengukuran lapangan.

Keempat variabel utama itu umumnya menghasilkan rentang kapasitas, bukan satu angka pasti. Rentang tersebut kemudian diuji melalui simulasi produksi energi tahunan dan analisis keuangan sebelum konfigurasi final dipilih.

## Profil Beban dan Karakter Operasional Pabrik Kelapa Sawit

Sebelum menghitung kapasitas, kumpulkan data beban minimal 12 bulan terakhir. Yang dibutuhkan bukan hanya total kWh bulanan, tetapi juga profil interval 15 atau 30 menit dari kWh meter, karena pola inilah yang menentukan berapa banyak produksi surya yang terserap.

Sebagai ilustrasi, pabrik dengan kapasitas 30 ton TBS per jam dan konsumsi spesifik 18 kWh per ton TBS yang beroperasi 20 jam sehari akan mengonsumsi sekitar 10.800 kWh per hari. Angka konsumsi spesifik ini adalah asumsi perencanaan yang harus diganti dengan data aktual pabrik Anda.

Dari angka tersebut, beban rata-rata harian berada di kisaran 450 kW, sementara beban puncak bisa dua kali lipatnya saat seluruh lini dan boiler bekerja bersamaan. Selisih antara beban rata-rata dan beban puncak inilah yang menentukan kapasitas inverter, bukan kapasitas modul.

Pabrik kelapa sawit juga memiliki siklus musiman. Pada musim panen puncak, jam operasi dan konsumsi listrik naik; pada musim paceklik, sebagian lini berhenti. Produksi PLTS justru relatif stabil sepanjang tahun, sehingga porsi konsumsi yang bisa dipasok surya akan berfluktuasi mengikuti musim.

Faktor lain yang sering terlewat adalah kualitas daya. Beban motor induktif besar di stasiun press dan boiler menghasilkan harmonisa serta faktor daya rendah. Desain PLTS yang baik akan menyertakan kajian kualitas daya agar inverter dan bank kapasitor tidak saling mengganggu.

Terakhir, catat rencana ekspansi pabrik dalam 5-10 tahun ke depan. Kapasitas PLTS yang dipasang hari ini sebaiknya menyisakan ruang untuk penambahan string, sehingga ekspansi tidak memaksa penggantian inverter atau kabel feeder utama.

## Contoh Perhitungan Bertahap untuk Sizing 1 MWp

Berikut contoh perhitungan bertahap dengan asumsi yang dinyatakan terbuka. Semua angka di bawah adalah ilustrasi; ganti dengan data aktual sebelum dipakai untuk pengadaan.

1. **Konsumsi tahunan.** 10.800 kWh per hari × 330 hari operasi = 3.564.000 kWh per tahun, atau sekitar 3,56 juta kWh.
2. **Produksi spesifik per kWp.** Irradiasi 4,7 kWh per meter persegi per hari × 365 hari × performance ratio 0,8 = 1.372 kWh per kWp per tahun.
3. **Target porsi konsumsi.** Misalnya 35-40% dipasok PLTS, yaitu sekitar 1,25-1,43 juta kWh per tahun.
4. **Kapasitas yang dibutuhkan.** 1.372.400 kWh dibagi 1.372 kWh per kWp menghasilkan sekitar 1.000 kWp, atau 1 MWp.
5. **Jumlah modul.** 1.000.000 Wp dibagi 550 Wp per modul = 1.818 modul, membutuhkan luas atap sekitar 4.900 meter persegi.
6. **Kapasitas inverter.** Rasio DC/AC 1,1-1,2 menghasilkan inverter sekitar 830-910 kW.
7. **Verifikasi kuota.** Ajukan kapasitas 1 MWp ke PLN setempat untuk memastikan kuota tersedia pada periode pengajuan.
8. **Anggaran.** CAPEX PLTS 1 MWp di Indonesia berada di rentang Rp 9-13 miliar, dengan modul surya menyumbang sekitar 40% dari total.
9. **OPEX.** Contoh nyata pada industri: PLTS 1 MWp dengan CAPEX Rp 11 miliar memiliki estimasi OPEX Rp 220 juta per tahun.
10. **Emisi terhindar.** 1.372.400 kWh × 0,87 kg CO2 per kWh menghasilkan sekitar 1.190 ton CO2 per tahun sebagai perkiraan.

Jika seluruh asumsi di atas dipakai, sistem 1 MWp memasok sekitar 38-39% konsumsi listrik tahunan pabrik. Angka pengembalian modal sangat dipengaruhi tarif listrik industri dan skema pembiayaan yang dipilih.

## Konfigurasi Sistem dan Peran Penyimpanan Energi

Pabrik kelapa sawit yang sudah terhubung jaringan PLN hampir selalu memilih konfigurasi on-grid. Sistem ini tidak memerlukan baterai karena produksi siang hari langsung dikonsumsi beban pabrik, dan kelebihan produksi mengikuti ketentuan ekspor yang berlaku.

Konfigurasi hybrid mulai dipertimbangkan ketika pabrik memiliki beban malam besar atau membutuhkan pasokan cadangan untuk lini kritis. Penambahan baterai menaikkan CAPEX secara signifikan, sehingga keputusan ini harus didasarkan pada analisis biaya-manfaat, bukan preferensi teknis semata. Opsi penyimpanan dapat ditinjau pada halaman [sistem baterai](/produk/sistem-panel-surya/sistem-baterai/) kami.

Dari sisi perangkat keras, pilihan utama ada pada inverter string atau inverter terpusat. Untuk kapasitas 1 MWp dengan atap terbagi beberapa blok, inverter string berkapasitas 50-110 kW per unit umumnya lebih fleksibel dan lebih toleran terhadap bayangan parsial.

Rasio DC/AC juga perlu ditetapkan sejak awal. Rentang 1,1-1,2 lazim dipakai di Indonesia karena membantu menjaga produksi pada jam puncak, dengan catatan suhu lingkungan dan ventilasi inverter dihitung dengan benar.

Jumlah MPPT dan skema pengelompokan string menentukan seberapa baik sistem bertahan saat salah satu blok atap terbayang. Idealnya setiap orientasi atau kemiringan yang berbeda ditempatkan pada MPPT terpisah. Tim [layanan EPC sistem tenaga surya](/layanan/sistem-tenaga-surya-epc/) kami menyusun skema string ini bersama single line diagram dan studi bayangan.

Untuk pabrik tanpa rencana ekspansi, konfigurasi on-grid sederhana dengan inverter string biasanya memberi biaya per kWp paling efisien. Namun jika ada rencana penambahan kapasitas dalam tiga sampai lima tahun, ruang pada panel DC dan kapasitas kabel feeder perlu disiapkan sejak desain awal.

## Efisiensi, Shading, dan Standar Instalasi

Efisiensi sistem PLTS dihitung sebagai energi listrik yang dihasilkan dibagi energi surya yang diterima panel, dikalikan 100%. Jika 1.000 Wh energi surya masuk ke panel dan 150 Wh keluar sebagai listrik, efisiensi sistem tersebut adalah 15%.

Angka itu menggambarkan rantai kehilangan yang panjang. Faktor yang mempengaruhinya meliputi kualitas modul, panjang dan ukuran kabel dari string ke inverter, sudut pemasangan, serta bayangan atau shading.

Shading adalah penyebab kehilangan yang paling sering diabaikan di pabrik. Cerobong boiler, tangki, crane, dan jaringan pipa di atas atap bisa menutup sebagian modul pada jam tertentu. Karena satu modul yang terbayang dapat menurunkan kinerja seluruh string, studi bayangan berbasis lintasan matahari tahunan wajib dilakukan sebelum penentuan tata letak.

Sudut dan orientasi pemasangan juga menentukan hasil tahunan. Di Indonesia, kemiringan sekitar 5-15 derajat dengan orientasi utara atau selatan umumnya memberi kompromi terbaik antara produksi dan pemanfaatan luas atap.

Dari sisi pengadaan, kualitas komponen berkontribusi langsung pada efisiensi jangka panjang dan pada nilai TKDN proyek. SonusHUB menargetkan material kelistrikan dengan TKDN minimal 40%, dan komponen panel yang memenuhi kriteria tersebut tersedia melalui katalog [panel surya TKDN](/produk/sistem-panel-surya/panel-surya/panel-tkdn/).

Terakhir, mutu instalasi menentukan apakah efisiensi desain benar-benar tercapai di lapangan. Penggunaan kabel berukuran sesuai, konektor yang rapat, penandaan string yang baik, dan pencatatan arus tiap string akan mempermudah deteksi penurunan kinerja sejak tahun pertama.

## Regulasi, Skema BOO/BOT, dan Struktur Biaya

Regulasi adalah penentu kelayakan yang tidak bisa ditawar. [Permen ESDM No. 2 Tahun 2024](https://jdih.esdm.go.id/) menghapus batas 100% dari daya terpasang pelanggan PLN untuk PLTS atap, dan menggantinya dengan mekanisme kuota.

Implikasi praktisnya, kapasitas yang bisa dipasang tidak lagi semata ditentukan oleh daya langganan. Pabrik dengan daya 1.000 kVA bisa saja mengajukan PLTS di atas 1 MWp, tergantung kuota yang tersedia di sistem PLN setempat pada saat pengajuan.

Karena sifat kuota itu dinamis, urutan kerja yang aman adalah konsultasi awal ke PLN, pengajuan kapasitas, lalu finalisasi desain teknis. Menyelesaikan desain hingga tahap pengadaan sebelum kuota dikonfirmasi berisiko menunda seluruh proyek.

Dari sisi kepemilikan aset, ada dua skema yang umum di pasar Indonesia. Skema BOO (Build Own Operate) menempatkan aset tetap milik solar developer seterusnya, dengan harga cenderung paling murah karena developer memegang aset jangka panjang. Skema BOT (Build Operate Transfer) menempatkan aset milik developer selama masa kontrak, lalu berpindah menjadi milik pemilik gedung di akhir periode.

Pilihan skema menentukan bentuk neraca dan profil risiko. BOO memberi CAPEX awal mendekati nol bagi pabrik, tetapi tidak menambah aset tetap dan penghematan berhenti saat kontrak berakhir jika tidak diperpanjang. BOT memberi kepemilikan akhir, dengan harga per kWh biasanya lebih tinggi selama masa kontrak.

Untuk pabrik yang mengejar target ESG sekaligus kepemilikan aset jangka panjang, kombinasi keduanya sering dipakai. Sebagian kapasitas dengan skema BOO untuk penghematan cepat, sebagian dengan skema milik sendiri untuk aset. Struktur ini dapat didiskusikan bersama tim [layanan EPC untuk segmen industri](/layanan/epc/segmen-ci/) kami.

## CAPEX, OPEX, dan Pengurangan Emisi

CAPEX PLTS 1 MWp di Indonesia berada di rentang Rp 9-13 miliar untuk periode 2024-2025. Di dalam struktur biaya tersebut, modul surya menyumbang sekitar 40% dari total CAPEX sistem 1 MW.

Angka referensi lapangan bisa dipakai untuk kalibrasi cepat. Sebuah perusahaan industri memasang PLTS 1 MWp dengan CAPEX Rp 11 miliar dan estimasi OPEX Rp 220 juta per tahun, atau sekitar 2% dari nilai investasi awal setiap tahunnya.

OPEX itu mencakup pencucian modul, inspeksi string, penggantian konektor, dan pemeliharaan inverter. Untuk pabrik kelapa sawit di area berdebu dengan serbuk dan asap boiler, frekuensi pencucian biasanya lebih tinggi dibanding gedung kantor sehingga anggaran pembersihan perlu dibuat lebih realistis.

Sisi manfaat dihitung dari dua sumber. Yang pertama adalah penghematan tagihan listrik dari kWh yang tidak lagi dibeli dari PLN. Yang kedua adalah nilai emisi yang dihindari, dengan faktor emisi rata-rata grid listrik Indonesia sekitar 0,87 kg CO2 per kWh sebagai perkiraan.

Untuk sistem 1 MWp yang menghasilkan sekitar 1,37 juta kWh per tahun, emisi yang dihindari mencapai sekitar 1.190 ton CO2 per tahun. Angka ini biasanya menjadi bagian penting dari laporan keberlanjutan dan pemenuhan target ESG korporat.

Analisis keuangan yang sehat membandingkan penghematan tahunan dengan CAPEX dan OPEX, lalu menguji sensitivitasnya terhadap tarif listrik dan penurunan produksi. Untuk pemantauan berkelanjutan, layanan [manajemen energi](/layanan/manajemen-energi/) membantu memastikan produksi dan penghematan tercatat serta dapat diaudit.

## Checklist Data yang Perlu Disiapkan Sebelum Desain

Checklist berikut merangkum data yang perlu disiapkan sebelum desain PLTS pabrik kelapa sawit dimulai. Semakin lengkap data awal, semakin sedikit revisi desain pada tahap pengadaan dan konstruksi.

1. **Data tagihan listrik PLN 12 bulan terakhir**, termasuk daya terpasang, golongan tarif, dan kWh per bulan.
2. **Profil beban interval 15 atau 30 menit** minimal satu bulan, idealnya mencakup musim panen puncak dan musim paceklik.
3. **Diagram satu garis instalasi eksisting**, termasuk kapasitas trafo, panel utama, dan titik sambungan yang tersedia.
4. **Gambar atap atau lahan**: dimensi, jenis struktur, umur, kemiringan, elevasi, dan kondisi penutup atap.
5. **Dokumentasi bayangan**: foto cerobong, tangki, pipa, crane, dan rencana struktur baru di sekitar area pemasangan.
6. **Rencana ekspansi pabrik 5-10 tahun**, termasuk rencana penambahan beban besar dan lini produksi baru.
7. **Status kuota dan daya terpasang PLN** di wilayah, beserta riwayat komunikasi dengan PLN setempat.
8. **Batasan operasional**: jadwal pemeliharaan tahunan, area yang tidak boleh diakses, dan prosedur keselamatan pabrik.
9. **Target internal**: persentase konsumsi yang ingin dipasok surya, anggaran CAPEX, dan target emisi yang dihindari.
10. **Preferensi skema pembiayaan**: beli sendiri, BOO, atau BOT, beserta preferensi tingkat TKDN material.

Setelah seluruh data tersedia, tahap berikutnya adalah simulasi produksi energi, studi bayangan, dan penyusunan single line diagram. Ketiganya kemudian diterjemahkan menjadi bill of quantity dan jadwal pelaksanaan yang bisa dianggarkan.

Jika checklist ini sudah siap, tim engineering dapat menyusun desain yang layak secara teknis sekaligus lolos verifikasi kuota. Hasil akhirnya adalah sistem yang bukan hanya menurunkan biaya listrik, tetapi juga memperkuat posisi pabrik dalam pelaporan keberlanjutan dan target ESG korporat.

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
