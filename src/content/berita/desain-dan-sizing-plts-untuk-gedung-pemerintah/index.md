---
title: "Desain dan Sizing PLTS untuk Gedung Pemerintah"
description: "Panduan lengkap desain PLTS gedung pemerintah: variabel sizing, contoh perhitungan, regulasi kuota PLN, skema pembiayaan, dan checklist data."
focusKeyphrase: "desain plts gedung pemerintah"
pubDate: "2026-10-09"
tags: ["b2g", "desain-sistem", "plts", "panduan"]
draft: false
---

Ukuran sistem PLTS atap untuk gedung pemerintah tidak ditentukan oleh luas atap semata. Ada variabel yang saling mengunci: profil beban harian, daya terpasang PLN, kuota PLTS atap yang tersedia, serta anggaran CAPEX dan OPEX yang disetujui. Memahami keterkaitan variabel ini adalah fondasi desain PLTS gedung pemerintah yang dapat dipertanggungjawabkan secara teknis sekaligus lolos audit pengadaan.

Ukuran PLTS atap gedung pemerintah bertumpu pada empat variabel: profil beban harian, kapasitas daya PLN terpasang, kuota PLTS atap yang tersedia, dan anggaran. Kapasitas dihitung dari konsumsi kWh siang hari, lalu dikonversi ke kWp dengan mempertimbangkan irradiasi setempat dan efisiensi sistem sekitar 15%.

## Variabel Kunci dalam Desain PLTS Gedung Pemerintah

Desain sistem tidak bisa dimulai dari katalog modul. Ada enam variabel yang harus dikunci lebih dulu karena perubahan pada satu variabel akan menggeser kapasitas akhir. Variabel tersebut adalah profil beban, daya terpasang PLN, kuota, luas dan kondisi atap, anggaran, serta target kinerja energi.

Profil beban menentukan berapa banyak energi yang benar-benar terpakai sendiri atau self-consumption. Gedung pemerintah umumnya beroperasi pada pukul 08.00-16.00, sehingga sebagian besar produksi PLTS dapat langsung dikonsumsi. Semakin tinggi porsi beban siang hari, semakin besar penghematan tagihan listrik per kWp terpasang.

Daya terpasang PLN menjadi batas atas historis. Sebelum Permen ESDM No. 2 Tahun 2024, kapasitas PLTS atap dibatasi maksimal 100% dari daya terpasang pelanggan. Kini batas itu digantikan kuota yang disediakan PLN, sehingga kapasitas yang disetujui bergantung pada ketersediaan kuota di wilayah tersebut.

Kondisi atap menentukan dua hal sekaligus: area efektif dan biaya struktur. Atap beton datar umumnya lebih murah dipasangi sistem mounting dibanding atap metal berprofil yang memerlukan klem khusus. Bayangan dari menara air, unit AC sentral, atau gedung tetangga wajib dipetakan karena dapat menurunkan produksi hingga dua digit persen.

Anggaran adalah variabel penutup yang sering mengubah desain di menit terakhir. CAPEX PLTS 1 MWp di Indonesia berada di kisaran Rp 9-13 miliar pada 2024-2025. Modul surya menyumbang sekitar 40% dari total CAPEX sistem 1 MW, sedangkan sisanya inverter, struktur, kabel, proteksi, dan jasa instalasi.

Target kinerja energi, misalnya porsi energi terbarukan terhadap konsumsi gedung, menentukan seberapa agresif kapasitas dipasang. Bila targetnya 20% dari konsumsi tahunan, kapasitas yang dipilih akan berbeda dibanding bila targetnya sekadar menurunkan tagihan PLN tahunan.

## Profil Beban dan Pola Konsumsi Listrik Siang Hari

Langkah pertama setiap proyek adalah mengumpulkan data tagihan listrik 12 bulan terakhir. Dari situ dipisahkan konsumsi pada pukul 08.00-16.00 untuk memperoleh beban siang hari. Rasio beban siang terhadap total konsumsi harian adalah angka paling menentukan dalam sizing.

Sebagai ilustrasi, gedung pemerintah dengan konsumsi 40.000 kWh per bulan dan 55% di antaranya terjadi pada jam kerja memiliki konsumsi siang sekitar 22.000 kWh per bulan. Angka ini adalah asumsi untuk latihan dan wajib diganti dengan data tagihan aktual. Rata-rata konsumsi siang harian menjadi sekitar 733 kWh.

Nilai 733 kWh per hari itu menjadi plafon produksi yang bermanfaat. Memasang kapasitas jauh di atas plafon ini berarti sebagian energi harus diekspor atau dibuang. Karena itu, langkah selanjutnya adalah menentukan berapa persen plafon yang ingin ditutup PLTS.

Kurva beban per jam melengkapi gambaran bulanan. Bila beban puncak gedung jatuh pada pukul 10.00-14.00, produksi PLTS nyaris seluruhnya terpakai sendiri. Bila beban puncak justru pukul 18.00 atau malam, nilai self-consumption turun tajam dan masa pengembalian modal memanjang.

Hal yang sering terlewat adalah beban akhir pekan dan hari libur nasional. Pada hari-hari itu konsumsi gedung umumnya turun drastis karena hanya sistem keamanan dan pendingin ruang server yang berjalan. Perencana perlu memutuskan apakah sistem tetap beroperasi penuh, dibatasi, atau mengandalkan ekspor ke jaringan.

## Contoh Perhitungan Sizing PLTS Tahap demi Tahap

Bagian ini memakai angka dari ilustrasi sebelumnya sebagai contoh, bukan patokan proyek tertentu. Semua asumsi ditandai agar mudah diganti dengan data lapangan. Tujuannya menunjukkan urutan logika, bukan menghasilkan angka final.

1. **Konsumsi siang harian.** 22.000 kWh per bulan ÷ 30 hari = 733 kWh per hari.
2. **Target kontribusi PLTS.** 80% dari konsumsi siang = 586 kWh per hari; sisanya tetap dipasok PLN untuk menjaga keandalan.
3. **Asumsi produksi spesifik.** 3,5 kWh per kWp per hari, setara sekitar 1.280 kWh per kWp per tahun. Angka ini harus diverifikasi dengan data irradiasi lokasi.
4. **Kapasitas sistem.** 586 kWh ÷ 3,5 kWh/kWp = sekitar 167 kWp, dibulatkan menjadi 170 kWp.
5. **Jumlah modul dan area.** Dengan modul 550 Wp dibutuhkan sekitar 309 unit. Jika tiap modul menempati 2,6 m², luas minimum sekitar 804 m², ditambah jarak antar baris 15-20% menjadi sekitar 950 m².
6. **Estimasi CAPEX.** Memakai patokan Rp 11 miliar per MWp, kapasitas 170 kWp setara Rp 1,87 miliar. OPEX mengikuti contoh Rp 220 juta per MWp per tahun, sehingga sekitar Rp 37 juta per tahun.
7. **Verifikasi kuota dan daya terpasang.** Pastikan 170 kWp masih berada dalam kuota PLN yang tersedia di wilayah gedung.

Perhitungan seperti ini sebaiknya dijalankan bersama tim EPC berpengalaman. Layanan [sistem tenaga surya EPC](/layanan/sistem-tenaga-surya-epc/) mencakup survei, simulasi produksi, penyusunan dokumen, hingga commissioning.

## Regulasi Terkini: Permen ESDM No. 2 Tahun 2024 dan Kuota PLN

Permen ESDM No. 2 Tahun 2024 mengubah cara perencana menghitung kapasitas PLTS atap. Sebelumnya, pelanggan PLN dibatasi memasang PLTS maksimal 100% dari daya terpasang. Setelah regulasi ini, kapasitas tunduk pada kuota yang disediakan PLN di masing-masing wilayah.

Perubahan ini terdengar teknis, tetapi dampaknya langsung pada jadwal proyek. Kuota bisa habis di satu wilayah sementara wilayah lain masih longgar. Karena itu, verifikasi kuota sebaiknya dilakukan sebelum desain teknis difinalkan, bukan setelah pengadaan barang dimulai.

Untuk gedung pemerintah, ada dua implikasi praktis. Pertama, kapasitas yang direncanakan harus dicek terhadap kuota, bukan hanya terhadap daya terpasang. Kedua, skema ekspor kelebihan energi perlu dikonfirmasi karena tidak semua wilayah menerapkan perlakuan yang sama.

Dokumen resmi dan ketentuan turunannya dapat ditelusuri melalui [JDIH Kementerian ESDM](https://jdih.esdm.go.id/). Regulasi turunan serta ketentuan teknis dari PLN bisa berubah, sehingga pengecekan ulang pada saat penyusunan RKS sangat disarankan.

Kuota bukan satu-satunya pintu. Kualitas dokumen perencanaan tetap menentukan apakah permohonan disetujui pada percobaan pertama. Gambar tata letak, single line diagram, dan perhitungan produksi yang rapi mempercepat proses persetujuan.

Dari sisi anggaran, ketidakpastian kuota membuat pendekatan bertahap menjadi masuk akal. Kapasitas bisa direncanakan dalam dua fase: fase pertama sesuai kuota yang tersedia, fase kedua setelah kuota tambahan dibuka. Struktur kabel dan ruang inverter sebaiknya disiapkan untuk kapasitas akhir agar penambahan tidak membongkar instalasi yang sudah ada.

## Pilihan Skema Pembiayaan: CAPEX, BOO, dan BOT

Setelah kapasitas dan kuota jelas, pertanyaan berikutnya adalah siapa yang membiayai. Ada tiga skema yang umum dipakai di segmen gedung pemerintah maupun korporat. Masing-masing punya konsekuensi berbeda pada neraca dan jangka waktu kepemilikan aset.

Skema CAPEX adalah pembelian langsung. Instansi menyiapkan anggaran sejak awal, aset menjadi miliknya sejak commissioning, dan seluruh penghematan tagihan langsung terasa. Skema ini paling sederhana secara administrasi, tetapi memerlukan ruang fiskal pada tahun anggaran berjalan.

Skema BOO (Build Own Operate) menempatkan aset tetap di tangan solar developer seterusnya. Gedung hanya membayar tarif listrik dari PLTS, biasanya lebih rendah dari tarif PLN. Harga cenderung paling murah karena developer memegang aset jangka panjang dan bisa menekan biaya siklus hidup.

Skema BOT (Build Operate Transfer) berada di antara keduanya. Aset dimiliki developer selama masa kontrak, lalu berpindah menjadi milik pemilik gedung pada akhir periode. Skema ini cocok bila instansi ingin memiliki aset tetapi belum mampu membiayai konstruksi sejak awal.

Perbandingan biaya bisa memakai contoh nyata di sektor industri. Sebuah perusahaan industri memasang PLTS 1 MWp dengan CAPEX Rp 11 miliar dan estimasi OPEX Rp 220 juta per tahun. Angka itu menjadi acuan kasar untuk menghitung biaya siklus hidup pada kapasitas yang lebih kecil, misalnya 170 kWp.

Pemilihan skema sebaiknya dilakukan bersama tim pengadaan dan bagian hukum. Untuk komponen modul, spesifikasi TKDN dapat menjadi pertimbangan tambahan; [panel surya ber-TKDN](/produk/sistem-panel-surya/panel-surya/panel-tkdn/) membantu memenuhi target kandungan lokal. SonusHUB sendiri menargetkan material kelistrikan dengan TKDN minimal 40%.

## Efisiensi Sistem PLTS dan Faktor yang Memengaruhinya

Efisiensi sistem PLTS didefinisikan sebagai energi listrik yang dihasilkan dibagi energi surya yang diterima panel, dikalikan 100%. Contoh sederhananya: bila 1.000 Wh energi surya masuk dan 150 Wh keluar sebagai listrik, efisiensi sistemnya 15%.

Angka itu bukan nilai buruk. Efisiensi sistem selalu lebih rendah dari efisiensi modul karena ada rugi di inverter, kabel, dan suhu. Memahami komponen rugi ini penting agar proyeksi produksi tidak optimistis berlebihan.

Faktor pertama adalah kualitas modul. Modul dengan koefisien suhu lebih baik akan kehilangan lebih sedikit produksi saat panel panas. Faktor kedua adalah panjang dan ukuran kabel; kabel yang terlalu panjang atau terlalu kecil menaikkan rugi tegangan, terutama pada jalur DC.

Faktor ketiga adalah sudut pemasangan dan orientasi. Kemiringan yang salah membuat panel menerima radiasi di luar sudut optimal sepanjang tahun. Faktor keempat adalah bayangan; satu baris panel yang tertutup bayangan dapat menurunkan produksi seluruh string bila tidak memakai optimiser atau micro-inverter.

Selain empat faktor itu, kebersihan panel berpengaruh nyata di lingkungan perkotaan. Debu, polusi, dan kotoran burung menumpuk dan menurunkan transmisi cahaya ke sel surya. Jadwal pembersihan rutin sebaiknya masuk ke dalam kontrak operasi dan pemeliharaan.

Dalam praktik, perencana memakai indikator performance ratio (PR) untuk menilai kesehatan sistem. PR membandingkan produksi aktual dengan produksi teoretis pada kondisi standar. Sebagai asumsi industri, nilai PR yang wajar untuk sistem atap di Indonesia berkisar 0,75-0,85 dan harus diverifikasi per proyek.

Dari sisi pemantauan, [manajemen energi](/layanan/manajemen-energi/) membantu membandingkan produksi aktual dengan proyeksi harian. Selisih yang melebar adalah sinyal awal adanya penurunan kinerja atau kebutuhan pembersihan panel.

## Checklist Data Sebelum Desain Dimulai

Kelengkapan data adalah pembeda antara desain yang bisa langsung dieksekusi dan desain yang berhenti di presentasi. Checklist berikut disusun untuk memastikan desain PLTS gedung pemerintah tidak dibangun di atas asumsi yang rapuh.

Data yang perlu disiapkan sebelum desain dimulai:

1. Tagihan listrik 12 bulan terakhir, termasuk kWh, kVA, dan komponen biaya.
2. Profil beban per jam minimal satu bulan representatif atau data logger 2-4 minggu.
3. Daya terpasang PLN, golongan tarif, dan nomor pelanggan.
4. Konfirmasi kuota PLTS atap dari PLN wilayah setempat.
5. Gambar as-built gedung dan denah atap beserta luasan efektif.
6. Data struktur atap: jenis, umur, kemiringan, dan sisa kapasitas beban.
7. Peta bayangan dari objek sekitar pada berbagai jam dan musim.
8. Rencana titik interkoneksi, ruang inverter, dan jalur kabel.
9. Target kinerja: persentase konsumsi yang ingin ditutup dan target ESG.
10. Kerangka anggaran dan preferensi skema pembiayaan (CAPEX, BOO, atau BOT).
11. Ketentuan pengadaan dan target TKDN yang berlaku di instansi.

Setelah data itu lengkap, tim perencana dapat menyusun simulasi produksi, layout modul, dan estimasi biaya siklus hidup. Hasilnya menjadi dasar penyusunan RKS dan permohonan kuota ke PLN.

Kesalahan paling umum adalah menyerahkan desain sebelum data kuota dan profil beban tersedia. Akibatnya, desain harus diulang dan jadwal pengadaan mundur satu siklus anggaran. Menyiapkan data lebih awal justru mempercepat seluruh proses, termasuk pengajuan anggaran tahun berikutnya.

Sediakan juga waktu untuk verifikasi lapangan. Data dokumen sering berbeda dengan kondisi aktual, terutama pada atap yang sudah lama berdiri. Survei singkat sebelum desain final menghemat biaya revisi yang jauh lebih besar.

Bila internal belum memiliki kapasitas teknis, tim [layanan sistem tenaga surya EPC](/layanan/sistem-tenaga-surya-epc/) kami dapat mendampingi mulai dari survei lokasi, perhitungan sizing, pengurusan kuota, hingga commissioning dan pemeliharaan.

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
