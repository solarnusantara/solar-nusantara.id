---
title: "Tata Letak String PLTS dan Analisis Shading di Gedung Pemerintah"
seoTitle: "Tata Letak String PLTS untuk Gedung Negara"
description: "Panduan tata letak string PLTS gedung pemerintah: variabel kapasitas, analisis shading, contoh perhitungan bertahap, dan checklist data desain."
focusKeyphrase: "tata letak string plts gedung pemerintah"
pubDate: "2026-10-05"
tags: ["b2g", "desain-sistem", "plts", "teknis"]
draft: true
---

Ukuran sistem PLTS di gedung pemerintah tidak ditentukan oleh luas atap semata. Ada empat variabel yang saling mengunci: profil beban harian gedung, daya terpasang PLN, luas atap efektif setelah dikurangi zona bayangan, dan kuota pengembangan yang tersedia. Keempatnya bertemu dalam satu pekerjaan teknis yang sering diremehkan, yaitu tata letak string PLTS gedung pemerintah, yakni penempatan modul per string yang harus lolos sekaligus dari batas tegangan inverter dan peta bayangan di atap. Artikel ini membahas kekhususan itu, bukan dasar-dasar PLTS atap.

## Variabel yang Menentukan Ukuran Sistem

Satu kapasitas terpasang yang sama bisa menjadi proyek yang layak atau justru tidak ekonomis, tergantung empat variabel berikut.

- **Profil beban harian dan mingguan.** Jam operasional, beban pendinginan, lift, dan ruang server menentukan seberapa besar energi PLTS yang benar-benar terpakai sendiri.
- **Daya terpasang PLN dan kuota PLTS atap.** Permen ESDM No. 2 Tahun 2024 menghapus batas 100% dari daya terpasang pelanggan PLN dan menggantinya dengan kuota yang tersedia ([esdm.go.id](https://www.esdm.go.id/)).
- **Luas atap efektif.** Area bruto dikurangi jalur perawatan, peralatan mekanikal-elektrikal, tangga, dan zona bayangan permanen.
- **Anggaran CAPEX dan skema pengadaan.** CAPEX PLTS 1 MWp di Indonesia berkisar Rp 9–13 miliar pada rentang 2024–2025, dengan modul surya menyumbang sekitar 40% di dalamnya.

Skema pengadaan mengubah struktur biaya jangka panjang dan sering menjadi penentu kelayakan. Pada skema BOO (Build Own Operate), aset PLTS tetap milik solar developer seterusnya, dan harga cenderung paling murah karena developer memegang aset jangka panjang. Pada skema BOT (Build Operate Transfer), aset dimiliki developer selama masa kontrak, lalu menjadi milik pemilik gedung.

## Tata Letak String PLTS Gedung Pemerintah: Empat Aturan Dasar

Aturan pertama adalah homogenitas. Semua modul dalam satu string harus berada pada orientasi dan kemiringan yang sama, sebab arus string ditentukan oleh modul terlemah.

Aturan kedua adalah batas tegangan. Jumlah modul per string dihitung dari Voc pada suhu terendah untuk memastikan tegangan maksimum inverter tidak terlampaui, dan dari Vmp pada suhu tertinggi agar tetap berada dalam rentang MPPT.

Aturan ketiga adalah pemetaan bayangan ke level string, bukan hanya ke level modul. Satu modul yang tersambung seri dan terbayang dapat menurunkan arus seluruh string.

Aturan keempat adalah jarak dan ukuran kabel. Panjang kabel DC dari string ke inverter menentukan rugi daya, dan ini termasuk faktor yang memengaruhi efisiensi sistem PLTS selain kualitas modul, sudut pemasangan, dan bayangan.

Pertimbangan TKDN masuk ke dalam keputusan tata letak. SonusHUB menargetkan material kelistrikan dengan TKDN minimal 40%, sehingga pemilihan kabel, combiner box, dan panel DC sebaiknya dilakukan bersamaan dengan perhitungan string, bukan setelahnya.

## Analisis Shading: Sumber, Metode, dan Dampaknya

Atap gedung pemerintah hampir selalu padat peralatan. Menara air, unit outdoor AC, dinding parapet, cerobong, antena, dan tangga akses adalah sumber bayangan yang paling sering dijumpai. Tambahkan gedung atau pohon di sisi timur dan barat, dan peta bayangan menjadi tidak seragam sepanjang hari.

Metodenya bertahap. Survei lapangan dilakukan pada beberapa jam berbeda untuk merekam pergerakan bayangan, dilengkapi simulasi lintasan matahari pada horizon sekitar. Hasilnya diterjemahkan menjadi peta zona bayangan yang menempel pada denah atap.

Dampak bayangan tidak proporsional terhadap luas area yang tertutup. Bayangan tipis pada satu sel dapat mematikan sebagian besar kapasitas string pada jam tersebut, terutama bila modul tidak memiliki dioda bypass yang memadai. Mitigasinya bisa berupa pengelompokan ulang string, pemindahan posisi string ke zona bersih, atau penggunaan perangkat optimasi pada titik yang tidak bisa dihindari.

Efisiensi sistem PLTS dihitung sebagai (energi listrik yang dihasilkan / energi surya yang diterima panel) × 100%. Sebagai gambaran, 150 Wh yang keluar dari 1.000 Wh yang diterima panel setara dengan efisiensi 15%.

## Contoh Perhitungan Bertahap

Berikut urutan perhitungan untuk atap seluas 1.400 m² pada sebuah kantor pemerintah.

1. **Luas atap efektif.** Kurangi jalur perawatan, unit AC, tangga, dan zona bayangan sekitar 400 m². Sisanya 1.000 m².
2. **Kapasitas awal.** Dengan asumsi awal kebutuhan 5 m² per kWp, 1.000 m² menghasilkan kapasitas sekitar 200 kWp.
3. **Jumlah modul.** Memakai modul 550 Wp: 200.000 Wp dibagi 550 Wp sama dengan sekitar 364 modul.
4. **Pembentukan string.** Dengan 18 modul per string, 364 modul dibulatkan menjadi 20 string × 18 modul = 360 modul, atau 198 kWp. Tiga unit inverter 60 kW memberi rasio DC/AC sekitar 1,1.
5. **Produksi tahunan.** Dengan asumsi produksi spesifik 1.300 kWh per kWp per tahun, 198 kWp menghasilkan sekitar 257.400 kWh per tahun.
6. **Koreksi shading.** Analisis bayangan menunjukkan kehilangan 6% dari produksi tahunan, yaitu sekitar 15.400 kWh. Produksi bersih menjadi sekitar 242.000 kWh per tahun.
7. **Emisi terhindar.** Memakai faktor emisi grid rata-rata Indonesia sekitar 0,87 kg CO2 per kWh sebagai perkiraan, produksi bersih tersebut setara dengan sekitar 211 ton CO2 per tahun.
8. **CAPEX.** Bila rentang CAPEX PLTS 1 MWp Rp 9–13 miliar diterjemahkan menjadi Rp 9–13 juta per kWp, kapasitas 198 kWp memerlukan investasi sekitar Rp 1,8–2,6 miliar.

Perhitungan ini masih perlu dikunci oleh tim perencana sebelum masuk tahap pengadaan. Langkah berikutnya biasanya menggabungkan hasil desain dengan pemantauan konsumsi melalui [layanan manajemen energi](/layanan/manajemen-energi/), sehingga produksi PLTS dapat dibandingkan dengan beban gedung setiap bulan. Untuk pelaksanaan desain, pengadaan, dan pemasangan, tim [layanan sistem tenaga surya EPC](/layanan/sistem-tenaga-surya-epc/) dapat memvalidasi perhitungan ini terhadap kondisi atap yang sebenarnya.

## Checklist Data Sebelum Desain Dimulai

Kualitas tata letak string ditentukan oleh kelengkapan data masukan. Siapkan daftar berikut sebelum meminta desain final.

1. Tagihan listrik 12 bulan terakhir, lengkap dengan kWh dan kW serta pembagian LWBP dan WBP.
2. Single line diagram, daya terpasang PLN, kapasitas trafo, dan ruang panel yang tersedia.
3. Gambar denah atap berskala, termasuk tinggi parapet, akses, dan kapasitas beban struktur.
4. Peta peralatan atap dan sekitar: menara air, unit AC, ventilasi, antena, cerobong, pohon, serta bangunan tetangga.
5. Konfirmasi tertulis status kuota PLTS atap dan persetujuan teknis dari PLN setempat.
6. Rencana skema pengadaan (BOO atau BOT) beserta pagu anggaran dan mekanisme pembayarannya.
7. Target penurunan emisi atau indikator ESG yang ingin dicapai gedung.

Tanpa data tersebut, tata letak string PLTS gedung pemerintah hanya akan menjadi tebakan teknis yang mahal untuk direvisi setelah komponen terpasang.

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
