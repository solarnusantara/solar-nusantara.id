---
title: "Desain PLTS Hybrid dengan Baterai untuk Pabrik Kelapa Sawit"
description: "Panduan desain PLTS hybrid baterai pabrik kelapa sawit: variabel ukuran, contoh perhitungan bertahap, skema bisnis, dan checklist data."
focusKeyphrase: "plts hybrid baterai pabrik kelapa sawit"
pubDate: "2026-10-03"
tags: ["kelapa-sawit", "desain-sistem", "plts", "teknis"]
draft: true
---

Ukuran PLTS hybrid baterai pabrik kelapa sawit tidak ditentukan oleh luas atap saja. Ada variabel beban kritis, profil operasi 24 jam, ketersediaan lahan, kuota PLN, dan target keandalan. Pabrik kelapa sawit biasanya memiliki beban proses yang berjalan siang-malam, sehingga desain harus dimulai dari data beban, bukan dari harga per kWp. Tanpa data itu, kapasitas modul dan baterai berisiko terlalu besar atau terlalu kecil.

## Variabel Kunci dalam PLTS Hybrid Baterai Pabrik Kelapa Sawit

Variabel pertama adalah profil beban: daya puncak, beban dasar, dan durasi beban kritis. Variabel kedua adalah irradiasi lokasi dan bayangan, karena keduanya menentukan produksi harian. Variabel ketiga adalah kapasitas baterai, depth of discharge, dan efisiensi round-trip. Variabel keempat adalah kuota PLN, skema ekspor-impor, serta kesiapan jaringan di lokasi.

Variabel lain yang sering diabaikan adalah ruang untuk inverter, baterai, dan panel. Untuk pabrik kelapa sawit, ruang instalasi harus aman dari debu, getaran, dan suhu tinggi. Kualitas modul, panjang kabel, ukuran inverter, sudut pemasangan, dan shading memengaruhi efisiensi sistem. Efisiensi dihitung dari energi listrik yang dihasilkan dibagi energi surya yang diterima panel, lalu dikalikan 100%.

Contoh sederhana: 150 Wh listrik keluar dari 1.000 Wh energi surya yang masuk panel berarti efisiensi 15%. Jika kabel terlalu panjang atau inverter tidak tepat ukuran, angka itu bisa turun. Karena itu, desain [layanan EPC sistem tenaga surya](/layanan/sistem-tenaga-surya-epc/) perlu menghitung losses sejak awal, bukan setelah sistem beroperasi.

Untuk pabrik kelapa sawit, beban seperti sterilizer, press, klarifikasi, dan kernel station dapat memiliki lonjakan daya. Lonjakan ini memengaruhi ukuran inverter dan baterai. Jika hanya melihat tagihan bulanan, lonjakan tersebut tidak terlihat. Shading dari cerobong, tangki, atau bangunan pabrik juga bisa menurunkan produksi secara signifikan.

## Contoh Perhitungan Bertahap untuk Sistem 1 MWp

Berikut ilustrasi berbasis asumsi yang harus diverifikasi dengan data lapangan. CAPEX PLTS 1 MWp di Indonesia berkisar Rp 9-13 miliar, dan contoh nyata perusahaan industri memasang 1 MWp dengan CAPEX Rp 11 miliar serta OPEX Rp 220 juta per tahun. Asumsi produksi tahunan 1.400 kWh per kWp, sehingga 1.000 kWp menghasilkan sekitar 1.400.000 kWh per tahun. Angka produksi ini hanya contoh; simulasi lokasi tetap wajib.

Langkah 1: hitung biaya per kWp. Rp 11 miliar / 1.000 kWp = Rp 11 juta per kWp. Langkah 2: modul surya sekitar 40% CAPEX, sehingga porsi modul = 40% x Rp 11 miliar = Rp 4,4 miliar. Langkah 3: OPEX per kWp = Rp 220 juta / 1.000 kWp = Rp 220 ribu per kWp per tahun.

Langkah 4: hitung emisi terhindar. Dengan faktor emisi grid sekitar 0,87 kg CO2 per kWh, 1.400.000 kWh x 0,87 = 1.218.000 kg CO2 per tahun, atau sekitar 1.218 ton CO2 per tahun. Angka ini adalah perkiraan, bukan hasil audit.

Langkah 5: ukur kebutuhan baterai. Misalkan beban malam kritis 200 kW selama 6 jam, maka energi malam = 200 kW x 6 jam = 1.200 kWh. Dengan depth of discharge 80% dan efisiensi round-trip 90%, kapasitas baterai nominal = 1.200 / (0,8 x 0,9) = 1.667 kWh; bulatkan menjadi 2.000 kWh untuk margin.

Langkah 6: cek apakah 1 MWp cukup. Produksi harian rata-rata = 1.400.000 kWh / 365 hari = sekitar 3.836 kWh per hari. Jika beban siang juga besar, surplus untuk mengisi baterai bisa menipis. Karena itu, [sistem baterai](/produk/sistem-panel-surya/sistem-baterai/) harus dihitung bersama profil beban 24 jam, bukan hanya dari tagihan listrik bulanan.

Jika produksi harian lebih rendah pada musim hujan, ukuran baterai dan strategi dispatch perlu disesuaikan. Simulasi bulanan membantu melihat bulan terlemah dan menghindari oversizing.

Untuk pabrik kelapa sawit, strategi hybrid dapat mengisi baterai saat produksi surya berlebih dan memakai baterai saat beban puncak malam. Namun, dispatch harus mempertimbangkan tarif, kuota, dan degradasi baterai.

## Kepatuhan, Skema Bisnis, dan Rantai Pasok

Sejak Permen ESDM No. 2 Tahun 2024, pemasangan PLTS atap tidak lagi dibatasi 100% dari daya terpasang pelanggan PLN. Ketentuan itu tunduk pada kuota PLN yang tersedia, sehingga studi awal harus mengecek ketersediaan kuota di lokasi. Kuota PLN bisa berbeda antar wilayah, sehingga jangan mengasumsikan kapasitas ekspor yang sama untuk semua pabrik. Rujukan regulasinya dapat dilihat di [JDIH Kementerian ESDM](https://jdih.esdm.go.id/).

Skema BOO membuat aset PLTS tetap milik solar developer seterusnya, dan harga cenderung paling murah karena developer memegang aset jangka panjang. Skema BOT membuat aset milik developer selama masa kontrak, lalu menjadi milik pemilik gedung. Pilihan skema ini memengaruhi CAPEX, OPEX, dan siapa yang menanggung risiko kinerja.

Untuk material, SonusHUB menargetkan material kelistrikan dengan TKDN minimal 40%. Pabrik dapat memprioritaskan [panel surya TKDN](/produk/sistem-panel-surya/panel-surya/panel-tkdn/) dan komponen lokal lain. Setelah sistem berjalan, [manajemen energi](/layanan/manajemen-energi/) membantu membaca produksi, konsumsi, dan degradasi baterai. Pendekatan ini menjaga nilai investasi tetap terukur dan mempercepat layanan purna jual.

## Checklist Data Sebelum Desain

Sebelum meminta desain, siapkan data berikut agar simulasi tidak berbasis asumsi liar. Data ini sebaiknya disiapkan dalam format digital yang mudah diaudit.

1. Profil beban 15 menit atau 1 jam selama minimal 12 bulan, termasuk beban puncak dan beban malam.
2. Daftar beban kritis dan prioritas backup, misalnya pompa, kontrol, penerangan, dan instrumen.
3. Tagihan listrik PLN 12 bulan, daya terpasang, golongan tarif, dan pola pemakaian.
4. Ketersediaan kuota PLN serta izin atau persetujuan yang berlaku di lokasi.
5. Luas dan kondisi atap/lahan, orientasi, kemiringan, bayangan, dan daya dukung struktur.
6. Ruang untuk inverter, baterai, panel kontrol, dan akses pemeliharaan.
7. Data irradiasi lokasi, suhu ambien, curah hujan, dan risiko banjir/debu.
8. Target keandalan, durasi backup, dan strategi dispatch baterai.
9. Anggaran CAPEX/OPEX serta preferensi skema BOO, BOT, atau kepemilikan sendiri.
10. Target ESG, faktor emisi yang dipakai, dan kebutuhan pelaporan.

Dengan data itu, desain PLTS hybrid baterai pabrik kelapa sawit dapat dibuat lebih akurat, kompetitif, dan siap dieksekusi. Langkah berikutnya adalah menyiapkan profil beban dan meminta simulasi awal dari tim EPC yang berpengalaman.

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
