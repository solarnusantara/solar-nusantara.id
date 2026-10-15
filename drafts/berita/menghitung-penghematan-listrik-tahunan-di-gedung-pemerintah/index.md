---
title: "Menghitung Penghematan Listrik Tahunan di Gedung Pemerintah"
description: "Panduan menghitung penghematan listrik tahunan gedung pemerintah: rincian CAPEX, OPEX, payback PLTS 1 MWp, dan faktor yang mengubah angkanya."
focusKeyphrase: "penghematan listrik tahunan gedung pemerintah"
pubDate: "2026-10-02"
tags: ["b2g", "biaya-roi", "plts", "teknis"]
draft: true
---

Sebuah PLTS atap berkapasitas 1 MWp di gedung pemerintah menelan CAPEX sekitar Rp 11 miliar, dengan OPEX sekitar Rp 220 juta per tahun pada contoh pemasangan skala yang sama. Angka sebesar itu hanya layak disetujui jika penghematan listrik tahunan gedung pemerintah dihitung dari data teknis dan tarif yang nyata, bukan dari perkiraan kasar. Artikel ini masuk langsung ke rumusnya, komponen biaya yang harus dimasukkan, dan rentang waktu modal kembali.

Perhitungan selalu dimulai dari produksi energi, bukan dari tagihan PLN. Produksi tahunan sama dengan kapasitas terpasang dikalikan produksi spesifik per kWp. Untuk Indonesia, produksi spesifik lazim diasumsikan 1.300–1.500 kWh per kWp per tahun, bergantung iradiasi lokasi dan mutu pemasangan. Seluruh angka lain di artikel ini adalah asumsi yang bisa Anda ganti dengan data gedung Anda sendiri.

## Menghitung Penghematan Listrik Tahunan di Gedung Pemerintah

Rumusnya sederhana: penghematan bruto tahunan = produksi tahunan (kWh) × tarif listrik efektif yang berhasil digantikan. Kurangi OPEX tahunan untuk memperoleh penghematan neto. Bagi CAPEX dengan penghematan neto itu untuk mendapatkan payback sederhana.

Gedung pemerintah umumnya memakai golongan tarif P-1, P-2, atau layanan khusus dengan tarif efektif yang berbeda-beda. Karena itu, pakai tarif rata-rata dari dua belas bulan tagihan terakhir, bukan tarif daftar yang berlaku hari ini. Selisih keduanya bisa menggeser hasil perhitungan beberapa ratus juta rupiah per tahun.

## Tiga Variabel yang Menentukan Besarnya Penghematan

1. **Produksi spesifik tahunan.** Semakin tinggi iradiasi lokasi dan semakin bersih bidang pemasangan dari bayangan, semakin besar energi yang dihasilkan per kWp terpasang.
2. **Tarif listrik efektif yang digantikan.** Ini ditentukan golongan tarif, pola beban gedung, dan proporsi konsumsi siang hari saat PLTS berproduksi.
3. **Kuota dan proporsi energi yang bisa dimanfaatkan.** Sejak [Permen ESDM No. 2 Tahun 2024](https://jdih.esdm.go.id/), kapasitas PLTS atap tidak lagi dibatasi 100% dari daya terpasang pelanggan PLN, melainkan tunduk pada kuota PLN yang tersedia. Jika kuota lebih kecil dari rencana, energi yang bisa dikreditkan ikut berkurang.

Efisiensi sistem juga perlu masuk hitungan. Efisiensi PLTS = (energi listrik yang dihasilkan ÷ energi surya yang diterima panel) × 100%. Sebagai ilustrasi, 150 Wh keluaran dari 1.000 Wh masukan berarti efisiensi 15%.

## Contoh Perhitungan dan Payback Sistem 1 MWp

Ambil contoh sistem 1 MWp dengan CAPEX Rp 11 miliar, sesuai contoh pemasangan skala tersebut. Modul surya menyumbang sekitar 40% dari total CAPEX sistem 1 MW, sisanya inverter, struktur, kabel, dan jasa EPC.

| Komponen | Porsi CAPEX | Estimasi biaya |
| --- | --- | --- |
| Modul surya | ±40% | Rp 4,4 miliar |
| Inverter, struktur, kabel, BOS, jasa EPC | ±60% | Rp 6,6 miliar |
| Total CAPEX sistem 1 MWp | 100% | Rp 11 miliar |

Dengan asumsi produksi spesifik 1.400 kWh per kWp per tahun dan tarif efektif Rp 1.600 per kWh, arus kas tahunannya tampak seperti tabel berikut.

| Item | Nilai |
| --- | --- |
| Produksi tahunan | 1.400.000 kWh |
| Penghematan bruto | Rp 2,24 miliar per tahun |
| OPEX | Rp 220 juta per tahun |
| Penghematan neto | Rp 2,02 miliar per tahun |
| CAPEX | Rp 11 miliar |
| Payback sederhana | ±5,4 tahun sebelum degradasi modul |
| Emisi yang dihindari | ±1.218 ton CO2 per tahun |

Angka emisi memakai faktor emisi rata-rata grid listrik Indonesia sekitar 0,87 kg CO2 per kWh, sehingga sifatnya perkiraan. Penghematan neto di atas belum memperhitungkan kenaikan tarif listrik, biaya penggantian inverter pada tahun ke-10 sampai ke-12, dan degradasi modul sekitar 0,5% per tahun (asumsi). Karena itu, verifikasi produksi sebaiknya memakai data monitoring bulanan, bukan simulasi saja.

## Faktor yang Mengubah Penghematan Listrik Tahunan Gedung Pemerintah

Beberapa hal bisa menggeser hasil hitungan cukup jauh:

- **Kualitas modul dan inverter.** Efisiensi turun cepat bila komponen bermutu rendah atau tidak sesuai spesifikasi beban.
- **Bayangan dan sudut pemasangan.** Shading parsial pada satu string dapat menurunkan produksi seluruh string.
- **Panjang dan ukuran kabel.** Rugi daya pada kabel yang undersized mengurangi energi yang benar-benar tercatat di meter.
- **Kuota PLN dan skema kredit energi.** Aturan kredit ekspor menentukan berapa kWh yang benar-benar bernilai rupiah.
- **Kesiapan data.** Tanpa pencatatan beban siang hari yang rapi, tarif efektif dan proporsi energi terserap sulit dipastikan.

Untuk gedung pemerintah, TKDN sering menjadi syarat pengadaan. SonusHUB menargetkan material kelistrikan dengan TKDN minimal 40%, sehingga komponen dalam negeri bisa direncanakan sejak awal.

## Skema BOO dan BOT: Siapa yang Menanggung CAPEX

Skema pengadaan mengubah struktur biaya, meski produksi energinya sama. Pada skema BOO (Build Own Operate), aset PLTS tetap milik solar developer seterusnya; harga jual listriknya cenderung paling murah karena developer memegang aset dalam jangka panjang. Pada skema BOT (Build Operate Transfer), aset menjadi milik developer selama masa kontrak, lalu berpindah ke pemilik gedung.

Bagi gedung pemerintah yang tidak ingin memakai anggaran modal, BOO menekan beban awal tetapi penghematan per kWh lebih kecil. Sebaliknya, BOT atau kepemilikan penuh memberi penghematan terbesar setelah masa kontrak, dengan konsekuensi CAPEX dan pemeliharaan ada di sisi pemilik gedung. Pilihan ini biasanya ditentukan ruang fiskal dan aturan pengadaan, bukan semata angka payback.

Perlu dicatat, skema pendanaan tidak mengubah produksi energi sistem. Yang berubah adalah siapa yang menanggung CAPEX, siapa yang menerima nilai penghematan, dan kapan aset berpindah tangan.

## Rentang Investasi dan Faktor yang Mengubahnya

Untuk sistem 1 MWp di Indonesia, CAPEX berada di rentang Rp 9–13 miliar pada 2024–2025. Dengan penghematan neto sekitar Rp 2,02 miliar per tahun, payback sederhananya bergerak antara ±4,5 tahun dan ±6,5 tahun. Rentang itu menyempit atau melebar tergantung tarif efektif, produksi spesifik lokasi, kuota PLN, dan pengendalian bayangan.

Karena itu, faktor yang paling menentukan penghematan listrik tahunan gedung pemerintah adalah kualitas data awal dan ketelitian pemasangan, bukan sekadar harga penawaran terendah. Langkah paling praktis adalah menyiapkan profil beban 12 bulan, memetakan area atap yang bebas bayangan, lalu meminta hitungan produksi yang transparan. Tim [layanan EPC PLTS](/layanan/epc/segmen-ci/) Solar Nusantara dapat membantu menyusun hitungan tersebut, sekaligus menyiapkan pemantauan melalui [manajemen energi](/layanan/manajemen-energi/) dan pemilihan [panel surya ber-TKDN](/produk/sistem-panel-surya/panel-surya/panel-tkdn/) untuk kebutuhan pengadaan pemerintah.

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
