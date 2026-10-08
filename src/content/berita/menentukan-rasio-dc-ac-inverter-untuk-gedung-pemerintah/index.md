---
title: "Menentukan Rasio DC AC Inverter untuk Gedung Pemerintah"
description: "Panduan menentukan rasio dc ac inverter gedung pemerintah: variabel penentu, contoh perhitungan bertahap, dan checklist data sebelum desain PLTS."
focusKeyphrase: "rasio dc ac inverter gedung pemerintah"
pubDate: "2026-10-03"
tags: ["b2g", "desain-sistem", "plts", "teknis"]
draft: true
---

Gedung pemerintah memiliki profil beban yang khas: konsumsi listrik memuncak pada jam kerja dan turun tajam setelah pukul 16.00. Ukuran sistem PLTS untuk bangunan seperti ini tidak bisa menyalin konfigurasi pabrik yang beroperasi 24 jam. Ada tiga variabel penentu utama, yakni profil beban siang, kuota PLN yang tersedia, dan luas atap yang bersih dari bayangan. Dari ketiganya, tim desain menurunkan satu angka kunci, yaitu rasio dc ac inverter gedung pemerintah.

Rasio DC/AC membandingkan daya puncak array di sisi DC (kWp) dengan kapasitas keluaran inverter di sisi AC (kW). Angka ini menentukan seberapa agresif sistem dipaksa bekerja pada puncak radiasi matahari. Sebagai asumsi awal, praktik yang lazim di Indonesia berada di rentang 1,1 sampai 1,3. Rasio di bawah 1,0 berarti inverter terlalu besar untuk array yang terpasang, sehingga biaya perangkat tidak efisien.

## Variabel yang Menentukan Ukuran Sistem

Kebutuhan sisi AC tidak ditentukan oleh luas atap, melainkan oleh beban yang benar-benar bisa diserap gedung saat matahari bersinar. Beban kantor pemerintah umumnya terkonsentrasi pada hari kerja, pukul 08.00–16.00, dan jarang menyamai beban puncak malam. Karena itu, kapasitas inverter tidak perlu disamakan dengan daya kontrak PLN.

- Profil beban siang — total kWh yang dikonsumsi pukul 08.00–16.00 pada hari kerja; inilah energi yang langsung menghemat tagihan.
- Kuota PLN — menurut Permen ESDM No. 2 Tahun 2024, kapasitas PLTS atap tidak lagi dibatasi 100% dari daya terpasang, tetapi tunduk pada kuota yang tersedia (lihat [regulasi di JDIH ESDM](https://jdih.esdm.go.id/)).
- Luas atap bersih — menentukan daya DC maksimum setelah dikurangi jalur akses, unit AC, dan area berbayang.
- Anggaran — CAPEX PLTS 1 MWp di Indonesia berkisar Rp 9–13 miliar, dan modul surya menyumbang sekitar 40% di dalamnya.
- Skema bisnis — pada BOO aset tetap milik solar developer sehingga harga cenderung paling murah; pada BOT aset berpindah ke pemilik gedung setelah masa kontrak.
- Mutu komponen — efisiensi sistem dipengaruhi kualitas modul, panjang dan ukuran kabel inverter, sudut pemasangan, serta bayangan.

Semua variabel itu bertemu pada satu keputusan teknis: seberapa besar daya DC dipasang relatif terhadap inverter. Untuk pekerjaan seperti ini, tim [layanan EPC sistem tenaga surya](/layanan/sistem-tenaga-surya-epc/) selalu memulai dari data beban, bukan dari katalog inverter.

## Cara Menghitung Rasio DC AC Inverter Gedung Pemerintah

Berikut contoh bertahap untuk sebuah gedung pemerintah. Angka yang dipakai adalah asumsi yang dapat diganti dengan data aktual bangunan Anda.

1. Tetapkan daya DC yang bisa dipasang. Contoh: 364 modul berkapasitas 550 Wp per unit. Daya puncak array = 364 × 550 Wp = 200.200 Wp, dibulatkan menjadi 200 kWp.
2. Periksa beban siang. Misal beban rata-rata pukul 08.00–16.00 adalah 250 kW, sehingga keluaran hingga sekitar 200 kW AC masih dapat diserap gedung seluruhnya.
3. Tetapkan daya AC inverter. Misalnya dipilih inverter dengan total keluaran 175 kW AC.
4. Hitung rasio: 200 kWp ÷ 175 kW AC = 1,14. Nilai ini masih wajar untuk lokasi dengan radiasi matahari tinggi.
5. Estimasi produksi tahunan. Dengan asumsi yield spesifik 1.400 kWh per kWp per tahun, produksi bruto = 200 × 1.400 = 280.000 kWh per tahun. Asumsikan kehilangan akibat clipping dan susut sistem sekitar 2%, sehingga produksi bersih menjadi sekitar 274.400 kWh per tahun.
6. Hitung dampak emisi. 274.400 kWh × 0,87 kg CO2 per kWh ≈ 238.700 kg, atau sekitar 239 ton CO2 per tahun (angka perkiraan).
7. Terjemahkan ke anggaran. CAPEX 200 kWp setara seperlima dari rentang Rp 9–13 miliar per MWp, yaitu sekitar Rp 1,8–2,6 miliar. OPEX mengikuti pola contoh industri Rp 220 juta per MWp per tahun, sehingga porsinya sekitar Rp 44 juta per tahun (estimasi proporsional).

Jika rasio dinaikkan menjadi 1,3, produksi pagi dan sore bertambah tipis, tetapi risiko clipping pada tengah hari dan tekanan pada inverter meningkat. Sebaliknya, rasio 1,0 membuat biaya inverter naik tanpa tambahan produksi yang sepadan. Pada gedung pemerintah yang beban siangnya terbatas, kelebihan produksi di luar jam kerja juga sulit dimonetisasi.

## Menjaga Kinerja Setelah Serah Terima

Rasio yang tepat hanya bertahan jika sistem dipantau dan dirawat secara konsisten. Penurunan kinerja umumnya muncul dari debu, bayangan baru dari vegetasi, dan penuaan modul. Layanan [manajemen energi](/layanan/manajemen-energi/) membantu membandingkan produksi aktual dengan hasil simulasi, sehingga penyimpangan cepat terdeteksi dan tidak memburuk.

Untuk sisi pengadaan, persyaratan TKDN memperkuat justifikasi belanja pemerintah. SonusHUB menargetkan material kelistrikan dengan TKDN minimal 40%. Salah satu opsi yang dapat ditelusuri adalah [panel surya dengan TKDN](/produk/sistem-panel-surya/panel-surya/panel-tkdn/).

## Checklist Data Sebelum Desain

Kualitas keputusan rasio sangat bergantung pada kelengkapan data masukan. Siapkan dokumen berikut sebelum meminta desain final dari kontraktor.

1. Riwayat tagihan listrik 12 bulan terakhir, termasuk kWh dan kW puncak.
2. Profil beban per jam, atau minimal interval 30 menit, khusus hari kerja.
3. Daya terpasang dan status kuota PLTS atap yang dikonfirmasi ke PLN.
4. Gambar as-built atap, luas area bersih, arah hadap, dan kemiringan.
5. Studi bayangan untuk seluruh musim, termasuk bayangan gedung tetangga.
6. Pagu anggaran dan preferensi skema bisnis, BOO atau BOT.
7. Target ESG dan baseline emisi, memakai faktor emisi grid sekitar 0,87 kg CO2 per kWh sebagai perkiraan.
8. Spesifikasi modul dan inverter yang diinginkan, termasuk syarat TKDN.

Dengan checklist di atas, penentuan rasio dc ac inverter gedung pemerintah bisa dilakukan secara terukur, bukan berdasarkan kebiasaan pasar. Langkah paling aman adalah menguji dua atau tiga skenario rasio terhadap data beban yang sama, lalu memilih skenario dengan produksi bersih tertinggi dan tekanan inverter paling rendah.

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
