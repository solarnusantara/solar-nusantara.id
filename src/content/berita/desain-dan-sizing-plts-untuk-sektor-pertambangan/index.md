---
title: "Desain dan Sizing PLTS untuk Sektor Pertambangan"
description: "Panduan desain PLTS pertambangan: variabel penentu kapasitas, contoh perhitungan dari beban ke kWp, skema pendanaan, dan checklist data sebelum desain."
focusKeyphrase: "desain plts pertambangan"
pubDate: "2026-10-08"
tags: ["pertambangan", "desain-sistem", "plts", "panduan"]
draft: false
---

Ukuran PLTS di lokasi tambang tidak ditentukan oleh luas lahan kosong atau besar tagihan listrik bulanan. Ada lima variabel yang menentukan: profil beban harian, iradiasi matahari di lokasi, ketersediaan dan kapasitas grid PLN, rencana ekspansi produksi, serta toleransi operasi terhadap fluktuasi pasokan. Kelima variabel itu saling mengunci, sehingga desain PLTS pertambangan yang sehat selalu dimulai dari data operasional, bukan dari katalog modul. Kesalahan paling umum di lapangan adalah menetapkan kapasitas dalam kWp lebih dulu, lalu menyesuaikan asumsi di belakangnya.

Kapasitas PLTS tambang ditentukan oleh tiga angka utama: konsumsi energi harian, peak sun hours di lokasi, dan performance ratio sistem. Energi harian yang ingin digantikan dibagi hasil kali dua angka terakhir menghasilkan kebutuhan kWp. Contoh: 5.400 kWh per hari pada lokasi dengan 4 jam puncak dan PR 0,8 memerlukan sekitar 1,7 MWp.

## Variabel Kunci dalam Desain PLTS Pertambangan

Profil beban adalah variabel pertama dan paling menentukan. Yang dibutuhkan bukan angka tagihan kWh bulanan, melainkan kurva beban 24 jam dengan resolusi minimal 15 menit. Dari kurva itu akan terlihat kapan puncak terjadi, seberapa dalam lembah beban malam, dan berapa besar beban yang benar-benar kontinu sepanjang hari.

Iradiasi matahari menentukan berapa kWh yang bisa dipanen per kWp terpasang. Di Indonesia, angka praktis yang dipakai adalah peak sun hours antara 3,5 sampai 4,5 jam per hari, bergantung lokasi dan musim. Lokasi tambang di Kalimantan dengan tutupan awan tinggi akan berada di batas bawah rentang tersebut, sedangkan lokasi di Nusa Tenggara bisa mendekati batas atas.

Ketersediaan grid PLN menentukan apakah sistem dirancang on-grid, hybrid, atau sepenuhnya off-grid. Untuk lokasi yang terhubung PLN, kapasitas PLTS atap kini tunduk pada kuota yang tersedia dari PLN setelah terbitnya Permen ESDM No. 2 Tahun 2024. Artinya, kapasitas yang bisa dipasang tidak lagi otomatis sama dengan daya terpasang pelanggan.

Rencana ekspansi produksi dan toleransi operasi melengkapi keempat variabel sebelumnya. Pit baru, peningkatan kapasitas crusher, atau penambahan pompa dewatering akan mengubah profil beban dalam tiga sampai lima tahun ke depan. Sistem yang dirancang hanya untuk beban hari ini berisiko undersized saat produksi naik, sementara sistem yang terlalu besar menahan modal di aset yang belum terpakai.

Ada satu variabel fisik yang sering terlewat di tambang: kualitas udara dan tingkat debu di sekitar titik pemasangan. Debu menempel di permukaan modul dan menurunkan produksi secara langsung. Jadwal pencucian idealnya sudah masuk ke dalam asumsi desain sejak awal, bukan ditambahkan setelah sistem beroperasi.

## Membaca Profil Beban Tambang Sebelum Menentukan Kapasitas

Langkah pertama dalam sizing adalah mengukur, bukan menaksir. Pasang power logger pada panel utama selama minimal 30 hari berturut-turut, mencakup satu siklus kerja penuh dan satu periode pemeliharaan. Data interval 15 menit akan memberi gambaran beban puncak, beban rata-rata, dan durasi beban tinggi.

Dari data itu, hitung tiga angka dasar: beban puncak dalam kW, beban rata-rata dalam kW, dan konsumsi harian dalam kWh. Rasio antara beban rata-rata dan beban puncak disebut load factor, dan angkanya menentukan seberapa besar PLTS bisa menutup beban secara langsung. Sebagai contoh, bila beban puncak 1.200 kW dan beban rata-rata 750 kW, load factor-nya 62,5%.

Beban tambang umumnya terbagi menjadi dua kelompok besar. Beban kontinu seperti conveyor, pompa dewatering, dan sistem ventilasi berjalan hampir sepanjang hari, sedangkan beban siklik seperti workshop, kantor, dan camp mengikuti jadwal shift. Pemisahan ini menentukan apakah listrik dari PLTS bisa langsung dikonsumsi atau harus disimpan lebih dulu. Beban kontinu pada siang hari adalah target paling ekonomis karena bisa diserap tanpa baterai.

Untuk tambang yang masih mengandalkan genset diesel, catat konsumsi bahan bakar harian sebagai validasi silang. Selisih antara kWh hasil pembakaran solar dan kWh terukur di logger biasanya menandakan adanya beban yang belum tercatat. Selisih yang konsisten di atas 10% perlu ditelusuri sebelum desain dikunci.

Hasil pembacaan ini juga menentukan prioritas intervensi. Bila kurva beban menunjukkan puncak tajam hanya beberapa jam sehari, penambahan baterai untuk peak shaving bisa lebih ekonomis daripada menambah kapasitas modul. Sebaliknya, bila beban siang sudah datar dan tinggi, penambahan kWp langsung memberikan hasil terbesar.

## Contoh Perhitungan Bertahap: Dari Beban ke kWp

Bagian ini memakai satu contoh perhitungan lengkap dengan angka agar metodologinya bisa direplikasi. Asumsi lokasi: tambang dengan akses PLN terbatas dan target penggantian sebagian konsumsi siang hari.

Berikut tahapannya:

1. **Konsumsi harian.** Dari data logger 30 hari, konsumsi rata-rata 18.000 kWh per hari.
2. **Target penetrasi PLTS.** Manajemen menetapkan PLTS menutup 30% konsumsi harian, yaitu 5.400 kWh per hari.
3. **Peak sun hours.** Berdasarkan karakter lokasi, dipakai 4,0 jam puncak per hari.
4. **Performance ratio.** Dipakai 0,80 sebagai asumsi konservatif untuk sistem ground-mount di area berdebu.
5. **Kapasitas DC.** 5.400 kWh dibagi (4,0 × 0,80) = 1.687,5 kWp, dibulatkan menjadi 1,7 MWp.
6. **Jumlah modul.** Dengan modul 620 Wp, kebutuhan sekitar 2.722 modul (1.687.500 Wp dibagi 620 Wp).
7. **Estimasi CAPEX.** Mengacu rentang CAPEX PLTS 1 MWp di Indonesia sebesar Rp 9-13 miliar, kapasitas 1,7 MWp berada di kisaran Rp 15,2-21,9 miliar. Modul surya menyumbang sekitar 40% dari total CAPEX.
8. **Estimasi OPEX.** Dengan benchmark OPEX Rp 220 juta per tahun untuk sistem 1 MWp, skala 1,7 MWp berada di kisaran Rp 371 juta per tahun.
9. **Produksi tahunan.** 5.400 kWh × 365 hari = 1.971.000 kWh per tahun, atau sekitar 1,97 GWh.
10. **Reduksi emisi.** Memakai perkiraan faktor emisi grid rata-rata Indonesia sekitar 0,87 kg CO2 per kWh, potensi reduksinya sekitar 1.715 ton CO2 per tahun.

Angka-angka di atas adalah estimasi desain awal, bukan jaminan produksi. Produksi aktual akan bergantung pada cuaca tahun berjalan, kebersihan modul, dan ketersediaan jaringan. Studi kelayakan dengan simulasi produksi tetap diperlukan sebelum angka ini dipakai untuk keputusan investasi.

## Konfigurasi Sistem: On-Grid, Hybrid, dan Off-Grid

Konfigurasi sistem ditentukan oleh ada tidaknya grid PLN dan seberapa kritis pasokan listrik di lokasi. Ada tiga pola yang umum dipakai di sektor pertambangan.

Sistem on-grid cocok untuk lokasi yang terhubung PLN dengan pasokan relatif stabil. PLTS dipasang paralel di sisi konsumen dan bekerja sebagai pemotong konsumsi siang hari, tanpa baterai. Biaya per kWp paling rendah karena tidak ada komponen penyimpanan.

Sistem hybrid menggabungkan PLTS, baterai, dan sumber lain seperti PLN atau genset. Pola ini dipakai ketika lokasi ingin mengurangi jam operasi genset tanpa kehilangan keandalan. Baterai berfungsi sebagai penyangga transisi, bukan penyimpan energi sepanjang malam, sehingga kapasitasnya bisa ditekan. Pilihan [sistem baterai](/produk/sistem-panel-surya/sistem-baterai/) perlu disesuaikan dengan pola beban malam, bukan sekadar mengikuti kapasitas PLTS.

Sistem off-grid sepenuhnya mengandalkan PLTS dan baterai sebagai sumber utama. Pola ini paling mahal per kWh karena seluruh kebutuhan malam harus disimpan. Umumnya hanya masuk akal untuk beban kecil seperti penerangan jalan, pos jaga, atau camp terpencil.

Untuk tambang yang masih memakai genset, konfigurasi yang paling sering dipilih adalah PV-diesel hybrid. Pada pola ini, PLTS menutup beban siang dan genset mengambil alih saat produksi surya turun. Baterai bersifat opsional, dipakai untuk meredam fluktuasi saat terjadi peralihan sumber.

Pemilihan konfigurasi juga harus mempertimbangkan kebijakan kuota PLN. Setelah Permen ESDM No. 2 Tahun 2024, kapasitas PLTS atap yang bisa dipasang tidak lagi otomatis 100% dari daya terpasang pelanggan. Untuk lokasi yang kuotanya terbatas, konfigurasi hybrid dengan baterai bisa menjadi jalan tengah karena energi surya tidak seluruhnya harus diekspor ke jaringan pada siang hari.

## Regulasi, Kuota PLN, dan Skema Pendanaan

Kerangka regulasi yang paling relevan saat ini adalah Permen ESDM No. 2 Tahun 2024 yang mengubah aturan pemasangan PLTS atap. Ketentuan lama yang membatasi kapasitas pada 100% daya terpasang pelanggan PLN tidak lagi berlaku. Sebagai gantinya, kapasitas yang disetujui tunduk pada kuota yang tersedia di sistem PLN setempat. Rujukan resmi peraturan ini bisa diakses melalui [JDIH Kementerian ESDM](https://jdih.esdm.go.id/).

Implikasi praktisnya untuk tambang cukup besar. Lokasi dengan daya terpasang besar belum tentu mendapat persetujuan kapasitas PLTS yang sepadan. Pengajuan kuota sebaiknya dilakukan paralel dengan studi desain, bukan setelahnya.

Dari sisi pendanaan, ada dua skema yang paling sering dipertimbangkan. Skema BOO (Build Own Operate) membuat aset PLTS tetap menjadi milik solar developer seterusnya, sehingga harga jual listriknya cenderung paling murah karena developer memegang aset jangka panjang. Skema BOT (Build Operate Transfer) membuat aset dimiliki developer selama masa kontrak, lalu berpindah menjadi milik pemilik lokasi.

Perbandingan biaya modal untuk sistem 1 MWp di Indonesia berada di rentang Rp 9-13 miliar. Modul surya menyumbang sekitar 40% dari total CAPEX tersebut. Sebagai gambaran nyata, sebuah perusahaan industri memasang PLTS 1 MWp dengan CAPEX Rp 11 miliar dan estimasi OPEX Rp 220 juta per tahun.

Untuk proyek tambang, komponen TKDN perlu diperhitungkan sejak tahap pengadaan. SonusHUB menargetkan material kelistrikan dengan TKDN minimal 40%, dan katalognya bisa dilihat di [halaman produk panel surya TKDN](/produk/sistem-panel-surya/panel-surya/panel-tkdn/). Untuk pelaksanaan dari desain hingga commissioning, [layanan EPC sistem tenaga surya](/layanan/sistem-tenaga-surya-epc/) menangani pengadaan dan instalasi dalam satu alur.

Setelah sistem beroperasi, pemantauan produksi dan konsumsi menjadi penentu apakah target penghematan tercapai. Di sinilah [layanan manajemen energi](/layanan/manajemen-energi/) berperan, karena selisih antara produksi teoretis dan produksi aktual biasanya baru terlihat setelah beberapa bulan operasi.

## Efisiensi Sistem dan Faktor yang Menentukan Hasil Nyata

Efisiensi sistem PLTS didefinisikan sebagai hasil bagi antara energi listrik yang dihasilkan dan energi surya yang diterima panel, dikalikan 100%. Sebagai ilustrasi, bila panel menerima 1.000 Wh energi surya dan mengeluarkan 150 Wh listrik, efisiensinya 15%. Angka ini gambaran sederhana, karena pada sistem nyata kehilangan terjadi di banyak titik sekaligus.

Faktor pertama adalah kualitas modul itu sendiri. Modul dengan karakteristik temperatur dan toleransi daya yang lebih baik akan menghasilkan lebih banyak kWh dari iradiasi yang sama, terutama pada suhu kerja tinggi. Faktor kedua adalah panjang dan ukuran kabel, termasuk kabel DC dari string ke inverter. Kabel yang terlalu panjang atau terlalu kecil menaikkan rugi tegangan dan menurunkan energi yang sampai ke inverter.

Faktor ketiga adalah inverter, yang memiliki efisiensi konversi tersendiri dan titik kerja optimal pada rentang beban tertentu. Faktor keempat adalah sudut pemasangan, termasuk kemiringan dan orientasi terhadap matahari. Faktor kelima adalah bayangan dari tiang, gedung, atau bahkan modul di baris depan, yang bisa memotong produksi satu string secara utuh. Karena itu, tata letak array harus dihitung sejak awal.

Di tambang, faktor keenam yang khas adalah debu. Sebagai asumsi desain, kehilangan akibat debu yang tidak dibersihkan bisa mencapai beberapa persen dari produksi tahunan. Besarnya bergantung pada intensitas lalu lintas alat berat serta musim. Jadwal pencucian modul sebaiknya dimasukkan sebagai komponen OPEX tetap, bukan kegiatan insidental.

Dalam praktik, gabungan seluruh kehilangan ini dirangkum dalam satu angka bernama performance ratio (PR). Sebagai asumsi perencanaan, PR untuk sistem PLTS skala industri di Indonesia umumnya berada di kisaran 0,75 sampai 0,85. Angka inilah yang sebaiknya dipakai saat menghitung kapasitas, bukan efisiensi puncak modul dari lembar data.

## Checklist Data yang Perlu Disiapkan Sebelum Desain

Desain yang baik dimulai dari data yang lengkap. Berikut daftar data yang sebaiknya sudah tersedia sebelum tim engineering mulai menghitung kapasitas.

1. **Kurva beban 15 menit minimal 30 hari.** Diambil dari panel utama, mencakup periode produksi normal dan periode pemeliharaan.
2. **Konsumsi bulanan 12 bulan terakhir.** Dari tagihan PLN atau pencatatan genset, untuk melihat pola musiman.
3. **Beban puncak dan beban kritis.** Daftar peralatan yang tidak boleh mati, beserta daya masing-masing.
4. **Data konsumsi bahan bakar genset.** Liter per hari dan jam operasi, sebagai validasi silang terhadap data logger.
5. **Peta lokasi dan tata letak existing.** Termasuk area yang tersedia untuk array, jalur kabel, dan titik interkoneksi.
6. **Profil iradiasi lokasi.** Dari basis data iradiasi atau pengukuran setempat, dinyatakan dalam kWh per m² per hari.
7. **Daya terpasang dan status kuota PLN.** Termasuk korespondensi terakhir dengan PLN mengenai kapasitas PLTS yang disetujui.
8. **Rencana ekspansi produksi 3-5 tahun.** Pit baru, penambahan alat, atau perubahan jadwal shift.
9. **Target finansial dan ESG.** Payback period yang diharapkan, skema pendanaan (CAPEX atau BOO/BOT), serta target reduksi emisi tahunan.
10. **Kondisi lingkungan setempat.** Tingkat debu, kecepatan angin, curah hujan, dan risiko banjir di area pemasangan.

Kelengkapan sepuluh poin di atas memangkas waktu revisi desain secara signifikan dan mengurangi risiko perubahan lingkup di tengah konstruksi. Yang paling sering tertunda biasanya data kuota PLN dan kurva beban, padahal keduanya adalah penentu utama ukuran sistem.

Sebagai langkah berikutnya, diskusikan data yang sudah terkumpul dengan tim engineering untuk menyusun desain PLTS pertambangan yang sesuai profil operasi Anda. Estimasi awal bisa dimulai dari tiga angka saja: konsumsi harian, peak sun hours, dan target penetrasi.

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
