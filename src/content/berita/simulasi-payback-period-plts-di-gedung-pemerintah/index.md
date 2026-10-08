---
title: "Simulasi Payback Period PLTS di Gedung Pemerintah"
description: "Simulasi payback period PLTS gedung pemerintah dengan CAPEX 1 MWp Rp 9-13 miliar, OPEX tahunan, dan asumsi tarif listrik."
focusKeyphrase: "payback period plts gedung pemerintah"
pubDate: "2026-10-02"
tags: ["b2g", "biaya-roi", "plts", "teknis"]
draft: true
---

Anggaran pemasangan PLTS atap berkapasitas 1 MWp di Indonesia berada di kisaran Rp 9–13 miliar untuk periode 2024–2025. Modul surya menyumbang sekitar 40% dari total CAPEX sistem, sedangkan sisanya tersebar pada inverter, struktur, kabel, dan pekerjaan EPC. Bagi pengelola gedung pemerintah, pertanyaan pertama biasanya bukan soal teknologi, melainkan seberapa cepat modal tersebut kembali ke kas instansi. Simulasi payback period PLTS gedung pemerintah berikut memakai satu contoh nyata: PLTS 1 MWp dengan CAPEX Rp 11 miliar dan OPEX Rp 220 juta per tahun.

Angka Rp 11 miliar itu berasal dari pemasangan di sektor industri, sehingga simulasi untuk gedung pemerintah perlu penyesuaian asumsi. Profil beban gedung pemerintah justru menguntungkan karena konsumsi listrik terbesar terjadi pada jam kerja, tepat saat produksi panel surya memuncak. Artinya, porsi energi surya yang langsung terpakai sendiri bisa tinggi dan tidak bergantung pada harga jual ke jaringan. Yang membedakan adalah tarif yang berlaku, siklus anggaran, serta aturan kuota dari PLN.

## Profil Beban Gedung Pemerintah dan Waktu Tunggu Kuota

Gedung pemerintah umumnya beroperasi Senin sampai Jumat, pukul 08.00–16.00. Pola ini sejajar dengan kurva produksi PLTS atap yang memuncak di tengah hari, sehingga pembangkit berukuran moderat pun bisa menutup sebagian besar konsumsi siang. Konsekuensinya, simulasi awal tidak perlu memasukkan biaya penyimpanan energi kecuali beban malam memang signifikan.

Yang tidak bisa ditinggalkan adalah kepatuhan regulasi. [Permen ESDM No. 2 Tahun 2024](https://jdih.esdm.go.id/) mengubah lanskap pemasangan PLTS atap: kapasitas tidak lagi dibatasi 100% dari daya terpasang pelanggan [PLN](https://www.pln.co.id/), melainkan tunduk pada kuota yang tersedia. Perubahan ini membuka ruang kapasitas lebih besar, tetapi menambah variabel waktu tunggu persetujuan. Karena itu, status kuota sebaiknya diverifikasi sebelum CAPEX dikunci dalam dokumen anggaran.

Pendekatan yang dipakai pada [layanan EPC untuk segmen komersial dan industri](/layanan/epc/segmen-ci/) adalah mengunci asumsi produksi lebih dulu, baru menyusun skema pendanaan. Dengan cara itu, angka payback yang disodorkan ke pimpinan tidak berubah setiap kali harga modul bergerak.

## Rincian Biaya dan Simulasi Payback Period PLTS Gedung Pemerintah

Berikut kerangka perhitungan untuk sistem 1 MWp. Nilai tarif dan produktivitas ditandai sebagai asumsi agar bisa diganti dengan data lokasi masing-masing.

| Parameter | Nilai simulasi | Dasar perhitungan |
| --- | --- | --- |
| Kapasitas sistem | 1.000 kWp | Asumsi kasus |
| CAPEX | Rp 11 miliar | Contoh pemasangan PLTS 1 MWp |
| OPEX tahunan | Rp 220 juta | Contoh yang sama |
| Produksi energi | 1.400.000 kWh per tahun | Asumsi 1.400 kWh per kWp per tahun |
| Tarif listrik efektif | Rp 1.400 per kWh | Asumsi tarif golongan gedung pemerintah |
| Penghematan bruto | Rp 1,96 miliar per tahun | 1.400.000 kWh × Rp 1.400 |
| Penghematan neto | Rp 1,74 miliar per tahun | Bruto dikurangi OPEX |
| Payback sederhana | sekitar 6,3 tahun | Rp 11 miliar ÷ Rp 1,74 miliar |

Dua variabel paling sensitif adalah tarif dan produktivitas. Jika tarif efektif hanya Rp 1.100 per kWh, penghematan bruto turun ke sekitar Rp 1,54 miliar dan payback memanjang ke sekitar 8,3 tahun. Sebaliknya, pada tarif Rp 1.600 per kWh, penghematan neto mencapai sekitar Rp 2,02 miliar dan payback memendek ke sekitar 5,4 tahun.

Produktivitas bergerak searah dengan hasil perhitungan. Sebagai gambaran, lokasi beriradiasi lebih rendah dapat menghasilkan sekitar 1.200 kWh per kWp, sementara lokasi terbaik di Nusa Tenggara mendekati 1.600 kWh per kWp. Selisih 30% pada produksi memberi selisih yang hampir sama besar pada waktu balik modal.

## BOO, BOT, dan Dampaknya pada Arus Kas Instansi

Perhitungan di atas mengasumsikan instansi membeli sistem secara penuh. Dalam pengadaan pemerintah, ada dua skema alternatif yang mengubah profil kas:

- BOO (Build Own Operate): aset PLTS tetap milik solar developer seterusnya. Harga cenderung paling murah karena developer memegang aset jangka panjang dan menyebar modalnya lewat pembayaran bulanan.
- BOT (Build Operate Transfer): aset milik developer selama masa kontrak, lalu berpindah menjadi milik pemilik gedung. Skema ini cocok bila instansi ingin memiliki aset pada akhir kerja sama.

Pada skema BOO, tidak ada CAPEX di sisi anggaran; yang muncul adalah pembayaran bulanan yang lebih kecil dari tagihan listrik. Payback versi vendor menjadi tanggung jawab developer, sedangkan instansi menghitung penghematan bersih per tahun. Pada BOT, perhitungan payback kembali relevan karena kepemilikan aset berpindah di akhir kontrak.

## Efisiensi Sistem yang Menggeser Produksi Tahunan

Efisiensi sistem PLTS dihitung sebagai (energi listrik yang dihasilkan ÷ energi surya yang diterima panel) × 100%. Contohnya, 150 Wh keluaran dari 1.000 Wh masukan berarti efisiensi 15%. Angka ini bukan sekadar spesifikasi teknis; ia menentukan berapa kWh yang benar-benar masuk ke simulasi keuangan. Faktor yang menggesernya meliputi:

- kualitas modul dan laju degradasinya;
- panjang serta ukuran kabel antara string dan inverter;
- sudut pemasangan terhadap arah datang matahari;
- bayangan (shading) dari bangunan, menara air, atau pohon di sekitar atap.

Kesalahan yang paling sering terjadi adalah mengabaikan shading. Satu string yang tertutup separuh bisa menekan produksi seluruh rangkaian pada jam tersebut. Karena itu, studi bayangan sebaiknya menjadi bagian paket [layanan sistem tenaga surya EPC](/layanan/sistem-tenaga-surya-epc/), bukan opsi tambahan.

Dari sisi pengadaan, [panel surya dengan TKDN tinggi](/produk/sistem-panel-surya/panel-surya/panel-tkdn/) memberi nilai tambah pada evaluasi penawaran. SonusHUB menargetkan material kelistrikan dengan TKDN minimal 40%. Pemenuhan TKDN juga mempercepat persetujuan karena sejalan dengan preferensi pengadaan barang dan jasa pemerintah.

## Rentang Investasi dan Faktor Pengubahnya

Secara ringkas, rentang investasi PLTS 1 MWp untuk gedung pemerintah ada di Rp 9–13 miliar, dengan contoh nyata Rp 11 miliar plus OPEX Rp 220 juta per tahun. Dari rentang tersebut, payback period PLTS gedung pemerintah umumnya jatuh di sekitar 5–8 tahun. Empat faktor yang menggesernya adalah tarif listrik efektif, produktivitas spesifik lokasi, porsi energi yang benar-benar dikonsumsi sendiri, serta skema pendanaan yang dipilih.

Dari sisi ESG, produksi 1.400.000 kWh per tahun setara sekitar 1.218 ton CO2 bila memakai faktor emisi rata-rata grid Indonesia sekitar 0,87 kg CO2 per kWh. Angka ini perkiraan dan bisa berubah mengikuti bauran pembangkit nasional. Manfaat tersebut dapat dicatat sebagai kontribusi penurunan emisi tanpa mengubah perhitungan keuangan.

Langkah paling praktis adalah menyusun simulasi dengan data tagihan listrik 12 bulan terakhir, lalu menguji tiga skenario tarif dan dua skenario produktivitas. Dari situ, rentang waktu balik modal menjadi lebih sempit dan keputusan anggaran lebih mudah dipertahankan.

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
