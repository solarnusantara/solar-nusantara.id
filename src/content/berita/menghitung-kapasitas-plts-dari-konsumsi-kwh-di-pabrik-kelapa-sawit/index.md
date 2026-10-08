---
title: "Menghitung Kapasitas PLTS dari Konsumsi kWh di Pabrik Kelapa Sawit"
seoTitle: "Kapasitas PLTS dari kWh untuk Pabrik Sawit"
description: "Panduan menghitung kapasitas PLTS pabrik kelapa sawit dari data kWh: variabel, contoh perhitungan bertahap, CAPEX, dan checklist data desain."
focusKeyphrase: "kapasitas plts pabrik kelapa sawit"
pubDate: "2026-10-03"
tags: ["kelapa-sawit", "desain-sistem", "plts", "teknis"]
draft: true
---

Ukuran sistem tenaga surya di industri pengolahan CPO tidak ditentukan oleh luas atap, melainkan oleh profil konsumsi listrik harian. Menghitung kapasitas PLTS pabrik kelapa sawit berarti menerjemahkan angka kWh pada tagihan listrik menjadi kWp modul yang benar-benar terpakai. Ada lima variabel yang menentukan hasilnya: total konsumsi tahunan, porsi beban siang hari, beban puncak, yield spesifik lokasi, serta batas daya dan kuota PLN.

## Variabel yang Menentukan Ukuran Sistem

Lima variabel ini harus dikumpulkan sebelum satu kWp pun dihitung.

- Total konsumsi listrik tahunan dalam kWh, diambil dari rekening PLN dan/atau kWh meter internal.
- Porsi konsumsi pada pukul 08.00–17.00, karena tanpa baterai hanya energi siang yang dapat langsung dikonsumsi.
- Beban puncak (kW) dan daya terpasang PLN, yang menentukan kapasitas inverter serta batas injeksi ke jaringan.
- Yield spesifik lokasi (kWh per kWp per tahun), dipengaruhi iradiasi, sudut pemasangan, dan bayangan.
- Kuota PLN yang tersedia bagi pelanggan, sesuai ketentuan pemasangan PLTS atap yang berlaku.

Pabrik kelapa sawit umumnya punya keunggulan dibanding industri lain: beban siangnya besar karena sterilizer, thresher, press, klarifikasi, dan pengolahan kernel berjalan pada jam tersebut. Profil seperti ini membuat pemanfaatan energi surya secara langsung relatif tinggi. Karena itu, pembangkit tanpa baterai sering sudah ekonomis untuk pabrik dengan satu sampai dua shift.

Namun, pabrik yang beroperasi 24 jam memiliki beban malam yang tidak bisa dilayani PLTS tanpa penyimpanan. Untuk kondisi ini, penambahan [sistem baterai](/produk/sistem-panel-surya/sistem-baterai/) perlu dihitung terpisah dari kapasitas modulnya.

## Dari Konsumsi kWh ke Kapasitas PLTS Pabrik Kelapa Sawit

Berikut simulasi bertahap dengan asumsi yang dinyatakan terbuka. Angka konsumsi, porsi siang, dan yield di bawah ini adalah asumsi ilustrasi, bukan data klien.

1. Kumpulkan konsumsi tahunan. Asumsi: 1.500.000 kWh per tahun dari rekening PLN.
2. Tentukan porsi siang. Asumsi: 65% konsumsi terjadi pukul 08.00–17.00, sehingga energi siang = 1.500.000 × 0,65 = 975.000 kWh per tahun.
3. Tetapkan target. Asumsi: seluruh beban siang ingin ditutup PLTS, maka target produksi = 975.000 kWh per tahun.
4. Bagi dengan yield spesifik. Asumsi yield 1.400 kWh per kWp per tahun untuk lokasi Sumatera atau Kalimantan, maka 975.000 ÷ 1.400 = 696 kWp, dibulatkan menjadi 700 kWp.
5. Cek terhadap beban puncak. Jika beban puncak pabrik 600 kW, sistem 700 kWp masih dapat diselaraskan lewat rasio DC/AC inverter dan pengaturan ekspor-impor.
6. Terjemahkan ke CAPEX. Dengan tolok ukur Rp 9–13 miliar per MWp, kebutuhan 0,7 MWp berada di kisaran Rp 6,3–9,1 miliar.

Hasil 700 kWp itu adalah batas atas bila seluruh energi siang diserap sendiri. Jika target hanya menutup 50% beban siang, kebutuhan turun menjadi sekitar 350 kWp dengan separuh CAPEX.

Dari sisi ESG, produksi 975.000 kWh per tahun setara pengurangan emisi sekitar 848 ton CO2e. Angka ini memakai faktor emisi rata-rata grid listrik Indonesia 0,87 kg CO2 per kWh sebagai perkiraan. Perhitungan tersebut hanya berlaku bila energi PLTS benar-benar menggantikan listrik dari grid, bukan menambah konsumsi.

## Efisiensi Sistem dan Faktor yang Menggesernya

Efisiensi sistem PLTS dihitung sebagai (energi listrik yang dihasilkan ÷ energi surya yang diterima panel) × 100%. Contoh sederhananya, 150 Wh keluar dari 1.000 Wh yang masuk berarti efisiensi 15%. Angka ini menjelaskan mengapa yield 1.400 kWh per kWp tadi bersifat asumsi, bukan jaminan.

Empat faktor utama yang menggeser efisiensi: kualitas modul, panjang dan ukuran kabel inverter, sudut pemasangan, serta bayangan (shading). Bayangan dari cerobong boiler, tangki timbunan, atau vegetasi di sekitar atap bisa memotong produksi satu string secara signifikan. Karena itu, survei lokasi wajib dilakukan sebelum angka kWp dikunci.

## CAPEX, OPEX, dan Skema Pengadaan

CAPEX PLTS 1 MWp di Indonesia berada di rentang Rp 9–13 miliar untuk periode 2024–2025. Modul surya menyumbang sekitar 40% dari total CAPEX sistem 1 MW. Sebagai gambaran nyata, sebuah perusahaan industri memasang PLTS 1 MWp dengan CAPEX Rp 11 miliar dan estimasi OPEX Rp 220 juta per tahun.

Skema pengadaan mempengaruhi struktur biaya jangka panjang. Pada skema BOO (Build Own Operate), aset PLTS tetap milik solar developer seterusnya, dan harga jual listrik cenderung paling murah karena developer memegang aset jangka panjang. Pada skema BOT (Build Operate Transfer), aset menjadi milik pemilik gedung setelah masa kontrak berakhir.

Dari sisi regulasi, [Permen ESDM No. 2 Tahun 2024](https://jdih.esdm.go.id/) menghapus batas 100% dari daya terpasang pelanggan PLN. Pemasangan PLTS atap kini tunduk pada kuota yang tersedia dari PLN. Artinya, kelayakan teknis saja tidak cukup — ketersediaan kuota di wilayah pabrik harus dicek lebih dulu.

Untuk komponen lokal, SonusHUB menargetkan material kelistrikan dengan TKDN minimal 40%, termasuk [panel surya TKDN](/produk/sistem-panel-surya/panel-surya/panel-tkdn/). Pemenuhan TKDN ini relevan bagi pabrik yang mengejar target ESG sekaligus pengadaan barang dalam negeri.

Dari sisi eksekusi, [layanan EPC sistem tenaga surya](/layanan/sistem-tenaga-surya-epc/) mencakup survei, perhitungan yield, hingga commissioning. Jika pabrik ingin memantau konsumsi setelah PLTS beroperasi, [layanan manajemen energi](/layanan/manajemen-energi/) dapat dipadukan.

## Checklist Data Sebelum Desain

Siapkan daftar berikut agar perhitungan kapasitas tidak berhenti di asumsi.

- Data konsumsi kWh bulanan selama minimal 12 bulan berturut-turut.
- Salinan rekening PLN dan daya terpasang (kVA) di lokasi pabrik.
- Profil beban harian, idealnya dari kWh meter dengan pencatatan interval 15 atau 30 menit.
- Nilai beban puncak (kW) beserta waktu terjadinya.
- Diagram satu garis (single line diagram) instalasi listrik eksisting.
- Luas atap atau lahan yang tersedia, arah hadap, kemiringan, dan kondisi struktur.
- Peta potensi bayangan dari cerobong, tangki, bangunan tetangga, dan vegetasi.
- Rencana ekspansi produksi atau penambahan mesin dalam 3–5 tahun ke depan.
- Target ESG atau pengurangan emisi yang ingin dicapai perusahaan.
- Preferensi skema pembiayaan: beli langsung, BOO, atau BOT.

Data di atas memungkinkan desain dikerjakan tanpa banyak asumsi. Dengan profil beban yang rapi, perhitungan kapasitas PLTS pabrik kelapa sawit dapat disusun dalam hitungan hari, bukan minggu. Langkah berikutnya adalah mengirimkan data tersebut ke tim perencana agar simulasi kWh ke kWp bisa divalidasi dengan kondisi lokasi Anda.

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
