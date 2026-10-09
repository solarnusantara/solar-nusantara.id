---
title: "Desain PLTS Hybrid dengan Baterai untuk Pabrik Manufaktur"
description: "Panduan desain PLTS hybrid baterai pabrik manufaktur: variabel penentu ukuran, contoh perhitungan bertahap, skema BOO/BOT, dan checklist data."
focusKeyphrase: "plts hybrid baterai pabrik manufaktur"
pubDate: "2026-10-09"
tags: ["manufaktur", "desain-sistem", "plts", "teknis"]
draft: false
---

Desain PLTS hybrid baterai pabrik manufaktur ditentukan oleh profil beban, bukan sekadar luas atap yang tersedia. Beban siang, beban kritis saat malam, daya terpasang PLN, kuota PV yang tersedia, dan target penghematan adalah lima variabel yang paling dulu dipatok. Tanpa kelima data itu, ukuran modul dan baterai hanya menjadi taksiran. Artikel ini langsung masuk ke cara menghitungnya sampai angka investasi.

## Cara Menentukan Ukuran PLTS Hybrid dengan Baterai untuk Pabrik Manufaktur

Urutan yang lazim dipakai adalah beban dulu, kapasitas kemudian. Konsumsi harian dipisahkan menjadi komponen siang, malam, dan beban kritis yang tidak boleh padam. Setelah pemisahan itu, barulah kapasitas PV dan baterai dihitung secara terpisah.

Lima variabel yang menentukan hasil akhir:

- Beban siang hari dalam kWh, yang menentukan kapasitas PV.
- Beban malam dan beban kritis, dalam kW beserta durasinya, yang menentukan kapasitas baterai.
- Daya terpasang PLN dan kuota PV yang tersedia, sebagai batas atas kapasitas yang boleh dipasang.
- Luas atap atau lahan, sebagai penentu opsi penempatan dan tata letak string.
- Target penghematan serta target ESG, sebagai penentu prioritas skema pendanaan.

Perlu dicatat bahwa [Permen ESDM No. 2 Tahun 2024](https://jdih.esdm.go.id/) menghapus batas 100% dari daya terpasang pelanggan PLN. Pemasangan PLTS atap kini tunduk pada kuota yang tersedia di PLN. Konsekuensinya, kapasitas PV yang bisa dipasang tidak lagi ditentukan hanya oleh daya berlangganan. Kelayakan kuota wajib dicek sebelum desain dikunci.

## Contoh Perhitungan Bertahap

Contoh berikut memakai asumsi yang dinyatakan terbuka, sehingga bisa disesuaikan dengan data pabrik Anda.

1. **Data beban.** Dari pencatatan kWh meter, konsumsi harian diasumsikan 8.000 kWh. Sebanyak 3.000 kWh di antaranya terjadi pada siang hari.
2. **Produksi per kWp.** Radiasi harian diasumsikan 4,5 kWh/m². Dengan efisiensi sistem 15% — 150 Wh keluar dari 1.000 Wh masuk — setiap m² menghasilkan 0,675 kWh per hari. Satu kWp menempati sekitar 4,5 m², sehingga menghasilkan sekitar 3 kWh per hari.
3. **Kapasitas PV.** Kebutuhan siang 3.000 kWh dibagi 3 kWh per kWp menghasilkan 1.000 kWp, atau 1 MWp.
4. **Kapasitas baterai.** Beban kritis diasumsikan 300 kW selama 2 jam, setara 600 kWh. Dengan depth of discharge 80% dan efisiensi 90%, kapasitas terpasang sekitar 600 ÷ (0,8 × 0,9) = 833 kWh, dibulatkan menjadi 850 kWh.
5. **Investasi PV.** CAPEX PLTS 1 MWp di Indonesia berada di rentang Rp 9 miliar hingga Rp 13 miliar. Contoh nyata pemasangan 1 MWp mencatat CAPEX Rp 11 miliar dengan OPEX Rp 220 juta per tahun. Modul surya menyumbang sekitar 40% dari CAPEX, atau sekitar Rp 4,4 miliar.
6. **Produksi dan emisi.** Produksi 1.095.000 kWh per tahun dengan faktor emisi grid sekitar 0,87 kg CO2 per kWh berarti sekitar 953 ton CO2 dihindari setiap tahun. OPEX Rp 220 juta per tahun setara sekitar Rp 200 per kWh produksi.

Poin penting: angka di atas belum memasukkan baterai. Biaya baterai bergantung pada teknologi sel dan durasi otonomi, sehingga sebaiknya diminta melalui penawaran terpisah. Sizing baterai tetap mengikuti langkah 4.

## Faktor yang Menentukan Realisasi Produksi

Angka produksi hasil perhitungan hanya tercapai bila kehilangan di lapangan ditekan. Kualitas modul menentukan efisiensi awal sekaligus laju degradasi. Panjang dan ukuran kabel inverter berpengaruh pada rugi daya searah maupun bolak-balik. Sudut pemasangan menentukan seberapa banyak radiasi yang benar-benar jatuh tegak lurus ke panel, sementara bayangan dari cerobong atau bangunan tetangga bisa memotong produksi satu string penuh.

Karena itu, audit bayangan dan pengukuran jarak kabel sebaiknya dilakukan sebelum penawaran final. Untuk modul, pastikan spesifikasi TKDN terpenuhi karena SonusHUB menargetkan material kelistrikan dengan TKDN minimal 40%. Komponen ber-TKDN seperti [panel surya TKDN](/produk/sistem-panel-surya/panel-surya/panel-tkdn/) juga memudahkan pelaporan ESG perusahaan.

## Skema Pendanaan: BOO atau BOT

Pilihan skema mengubah struktur CAPEX dan kepemilikan aset. Pada skema BOO (Build Own Operate), aset PLTS tetap milik solar developer seterusnya, dan harga cenderung paling murah karena developer memegang aset jangka panjang. Pada skema BOT (Build Operate Transfer), aset milik developer selama masa kontrak, lalu berpindah menjadi milik pemilik gedung.

Untuk pabrik dengan target ESG yang ketat, keduanya tetap valid. Yang membedakan adalah siapa yang menanggung risiko teknis dan bagaimana aset dicatat di neraca.

Baterai pada sistem hybrid umumnya ditawarkan sebagai paket terpisah. Anda bisa membandingkan konfigurasi [sistem baterai](/produk/sistem-panel-surya/sistem-baterai/) yang tersedia di katalog kami. Untuk integrasi penuh dari desain hingga commissioning, tim [layanan EPC sistem tenaga surya](/layanan/sistem-tenaga-surya-epc/) menangani perhitungan, pengadaan, dan uji kinerja. Pemantauan performa setelah serah terima masuk dalam paket [manajemen energi](/layanan/manajemen-energi/).

## Checklist Data Sebelum Desain Dimulai

Siapkan data berikut agar proses desain berjalan dalam satu putaran:

1. Tagihan listrik 12 bulan terakhir beserta pola pemakaian kWh harian.
2. Profil beban per jam, idealnya dari pencatatan interval 15 menit selama minimal 30 hari.
3. Daftar peralatan kritis, daya, durasi pemakaian, dan toleransi pemadaman.
4. Daya terpasang PLN, golongan tarif, dan status kuota PLTS di lokasi.
5. Denah atap atau lahan, orientasi, kemiringan, serta potensi bayangan.
6. Titik interkoneksi, ruang panel, dan jalur kabel menuju ruang inverter.
7. Target penghematan biaya, target penurunan emisi, dan preferensi skema BOO atau BOT.

Semakin lengkap data tersebut, semakin kecil asumsi yang dipakai dalam perhitungan. Desain PLTS hybrid baterai pabrik manufaktur yang baik adalah desain yang angka-angkanya bisa ditelusuri kembali ke data lapangan. Kirimkan checklist di atas kepada tim kami untuk mendapatkan simulasi awal.

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
