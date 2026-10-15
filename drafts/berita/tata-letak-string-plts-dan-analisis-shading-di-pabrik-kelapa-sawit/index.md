---
title: "Tata Letak String PLTS dan Analisis Shading di Pabrik Kelapa Sawit"
seoTitle: "Tata Letak String PLTS untuk Pabrik Sawit"
description: "Panduan teknis tata letak string PLTS pabrik kelapa sawit: variabel kapasitas, analisis shading, contoh perhitungan, dan checklist data desain."
focusKeyphrase: "tata letak string plts pabrik kelapa sawit"
pubDate: "2026-10-05"
tags: ["kelapa-sawit", "desain-sistem", "plts", "teknis"]
draft: true
---

Ukuran PLTS di pabrik kelapa sawit tidak ditentukan oleh luas atap semata. Empat variabel lebih dulu mengunci kapasitas: profil beban harian pabrik, daya tersambung PLN beserta kuota yang tersedia, luas area yang benar-benar bebas bayangan, dan radiasi matahari di lokasi. Tata letak string PLTS pabrik kelapa sawit baru bisa disusun setelah keempat variabel itu berubah menjadi angka. Artikel ini membahas langkah teknis tersebut secara langsung.

## Variabel yang Menentukan Ukuran Sistem

Profil beban pabrik kelapa sawit memuncak pada siang hari, saat sterilizer, digester, dan press beroperasi. Karena produksi surya juga memuncak pada jam yang sama, penyerapan energi sendiri umumnya tinggi tanpa baterai. Yang perlu dihitung bukan kWh bulanan, melainkan kWh pukul 08.00–16.00 dan kW puncak siang.

Daya tersambung PLN dan status kuota membatasi kapasitas secara administratif. Sejak [Permen ESDM No. 2 Tahun 2024](https://jdih.esdm.go.id/), PLTS atap tidak lagi dibatasi 100% dari daya terpasang pelanggan, melainkan tunduk pada kuota PLN yang tersedia. Kapasitas 800 kWp bisa lolos secara teknis tetapi tertahan di tahap ini.

Luas area menentukan plafon fisik. Hanya atap dan lahan dengan bayangan minimal yang layak dihitung sebagai luas efektif. Untuk desain awal, asumsi produksi spesifik 1.400 kWh per kWp per tahun lazim dipakai di Indonesia, sementara suhu sel di atas atap metal dapat melewati 60°C.

## Tata Letak String PLTS Pabrik Kelapa Sawit: dari Modul ke Inverter

String adalah rangkaian modul seri yang tegangannya harus selalu berada di dalam jendela MPPT inverter. Dua batas mengapitnya: tegangan maksimum pada suhu sel terendah saat pagi, dan tegangan MPPT minimum pada suhu sel tertinggi saat siang. Keduanya dihitung dari Voc, Vmp, dan koefisien suhu modul.

Setelah jumlah modul per string tetap, barulah jumlah string per MPPT ditentukan. Satu MPPT sebaiknya menerima string dengan orientasi dan kemiringan seragam; mencampur string timur dan barat pada satu MPPT menggeser titik kerja dan menurunkan produksi. Panjang kabel DC dari combiner ke inverter juga ikut menentukan.

Efisiensi sistem PLTS dihitung sebagai (energi listrik yang dihasilkan / energi surya yang diterima panel) × 100%. Contoh, 150 Wh keluar dari 1.000 Wh masuk berarti efisiensi 15%. Kabel terlalu panjang, penampang terlalu kecil, sudut pemasangan keliru, dan bayangan adalah empat penyebab kehilangan yang paling sering ditemukan.

Pemilihan komponen menyangkut TKDN. SonusHUB menargetkan material kelistrikan dengan TKDN minimal 40%, dan panel bersertifikat TKDN tersedia melalui [panel surya TKDN](/produk/sistem-panel-surya/panel-surya/panel-tkdn/).

## Analisis Shading: Sumber Bayangan Khas Pabrik Kelapa Sawit

Pabrik kelapa sawit punya penghalang yang jarang ditemui di gudang biasa. Cerobong boiler, tangki timbul CPO, silo kernel, menara pendingin, dan pohon besar di batas lahan adalah sumber bayangan tetap. Tambahkan bayangan bergerak dari truk tangki dan alat berat saat bongkar muat TBS.

Bayangan pagi dan sore lebih merusak daripada bayangan tengah hari. Pada sudut elevasi rendah, bayangan menjadi sangat panjang, dan satu string yang terkena bayangan parsial dapat menjatuhkan produksi seluruh string pada MPPT yang sama. Karena itu analisis shading harus menghasilkan denah string, bukan sekadar gambar area terlarang.

Panjang bayangan didekati dengan L = H / tan(α), dengan H tinggi penghalang dan α sudut elevasi matahari. Untuk cerobong 18 m dan elevasi kritis 25°, bayangan mencapai 18 / tan(25°) ≈ 38,6 m. Bila jarak sejauh itu tidak tersedia, string di zona bayangan dipindahkan atau dipisahkan ke MPPT tersendiri.

## Contoh Perhitungan Bertahap: 792 kWp di Atap Pabrik

Angka berikut adalah asumsi kerja untuk ilustrasi; ganti dengan hasil survei lokasi Anda.

1. **Kapasitas dari luas efektif.** Asumsi atap bersih 4.000 m², modul 550 Wp berukuran 2,6 m² (≈211 Wp/m²), faktor pemanfaatan 94% untuk gang perawatan. Hasilnya 4.000 × 211 × 0,94 ≈ 793 kWp, dibulatkan turun menjadi 792 kWp agar habis dibagi konfigurasi string.

2. **Ukuran string.** Voc modul 49,5 V dengan koefisien suhu −0,25%/°C; pada suhu sel 20°C Voc naik 1,25% menjadi 50,1 V. Batas input inverter 1.100 V memberi maksimum 1.100 / 50,1 ≈ 21 modul. Vmp 41,5 V pada suhu sel 70°C turun sekitar 13,5% menjadi 35,9 V; dengan batas bawah MPPT 500 V, minimum 500 / 35,9 ≈ 14 modul. Ambil 20 modul per string: 11 kWp per string dengan tegangan Vmp 830 V.

3. **Jumlah string dan inverter.** 792 kWp dibagi 11 kWp per string = 72 string, atau 1.440 modul. Enam inverter 125 kWac memberi 750 kWac, sehingga rasio DC/AC 792 / 750 = 1,06. Setiap inverter menerima 12 string, dibagi rata 6 string per MPPT.

4. **Cek kuota.** Kapasitas 792 kWp dicocokkan dengan kuota PLN setempat sesuai Permen ESDM No. 2 Tahun 2024 sebelum desain dikunci.

5. **Energi, emisi, dan biaya.** Dengan asumsi produksi 1.400 kWh/kWp/tahun sebelum shading dan kehilangan shading 6%, hasilnya 1.316 kWh/kWp/tahun. Total energi ≈ 792 × 1.316 ≈ 1,04 juta kWh/tahun. Emisi terhindar ≈ 1.042.000 × 0,87 kg CO2/kWh ≈ 907 ton CO2 per tahun (perkiraan). CAPEX mengacu pada Rp 11 miliar per 1 MWp, sehingga 792 kWp ≈ Rp 8,7 miliar dengan OPEX sekitar Rp 174 juta per tahun; modul menyumbang sekitar 40% CAPEX, yaitu sekitar Rp 3,5 miliar.

6. **Setback bayangan.** Zona bayangan 38,6 m dari langkah analisis sebelumnya dikosongkan, atau string di dalamnya dipisahkan ke MPPT tersendiri.

Dari sisi komersial, skema BOO membuat aset tetap milik solar developer sehingga harga cenderung paling murah, sedangkan BOT mengalihkan aset ke pemilik gedung di akhir kontrak. Pilihan skema menentukan siapa yang menanggung risiko konfigurasi string. Layanan [EPC PLTS segmen komersial dan industri](/layanan/epc/segmen-ci/) menangani keduanya, dan pemantauan kinerja setelah serah terima dapat dilanjutkan lewat [manajemen energi](/layanan/manajemen-energi/).

## Checklist Data Sebelum Desain Dimulai

- Tagihan listrik 12 bulan terakhir: kWh per bulan dan kW puncak, idealnya data interval 15 menit.
- Profil beban pukul 08.00–16.00, jam operasional, dan jadwal shutdown pabrik.
- Daya tersambung PLN, diagram garis tunggal (SLD), dan status kuota PLTS atap di unit PLN setempat.
- Gambar atap dan lahan: dimensi, kemiringan, jenis penutup atap, dan kondisi struktur penopang.
- Denah penghalang lengkap dengan tinggi dan koordinat: cerobong boiler, tangki timbul, silo kernel, menara pendingin, pohon.
- Rencana titik interkoneksi, ruang inverter, dan jalur kabel DC maupun AC.
- Target ESG, kebutuhan pelaporan emisi Cakupan 2, dan preferensi TKDN.
- Anggaran serta preferensi skema: EPC, BOO, atau BOT.

Semakin lengkap data di atas, semakin cepat analisis shading dan tata letak string PLTS pabrik kelapa sawit difinalkan tanpa asumsi berulang. Tim [EPC sistem tenaga surya](/layanan/sistem-tenaga-surya-epc/) kami memulai setiap proyek dari daftar ini sebelum survei lapangan.

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
