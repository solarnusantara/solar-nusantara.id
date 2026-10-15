---
title: "Menghitung Penghematan Listrik Tahunan di Pabrik Manufaktur"
description: "Menghitung penghematan listrik tahunan pabrik manufaktur lewat CAPEX, OPEX, tarif PLN, dan estimasi payback PLTS 1 MWp."
focusKeyphrase: "penghematan listrik tahunan pabrik manufaktur"
pubDate: "2026-10-02"
tags: ["manufaktur", "biaya-roi", "plts", "teknis"]
draft: true
---

Pabrik manufaktur yang memasang PLTS atap 1 MWp saat ini menghadapi kebutuhan CAPEX Rp 9–13 miliar, dengan satu contoh industri tercatat Rp 11 miliar dan OPEX sekitar Rp 220 juta per tahun. Nilai penghematan listrik tahunan pabrik manufaktur pada akhirnya ditentukan tiga variabel: jumlah kWh yang benar-benar dihasilkan sistem, tarif listrik yang berhasil dihindari, dan biaya operasional yang harus ditanggung sepanjang umur aset. Artikel ini menyusun ketiga variabel itu menjadi satu perhitungan rupiah yang bisa Anda bawa ke rapat anggaran. Sasaran pembacanya jelas: manajer fasilitas, manajer energi, kepala teknik, dan bagian pengadaan yang perlu angka, bukan janji.

Yang perlu ditegaskan sejak awal, penghematan tidak sama dengan produksi listrik dikalikan tarif. Selalu ada selisih antara energi yang diproduksi dan energi yang benar-benar mengoffset konsumsi dari PLN. Selisih itulah yang membuat dua pabrik dengan kapasitas PLTS identik bisa mencatat hasil berbeda.

## Kerangka Menghitung Penghematan Listrik Tahunan Pabrik Manufaktur

Empat langkah berikut cukup untuk menghasilkan estimasi awal yang bisa dipertanggungjawabkan.

1. **Hitung produksi tahunan.** Kalikan kapasitas terpasang dengan produksi spesifik per kWp per tahun. Sebagai asumsi konservatif untuk Indonesia, gunakan 1.400 kWh per kWp per tahun; angka ini wajib diverifikasi dengan data iradiasi lokasi Anda.
2. **Konversikan ke rupiah.** Kalikan produksi tahunan dengan tarif listrik efektif dari tagihan PLN pabrik Anda. Karena tarif golongan industri berbeda-beda, pakai tarif rata-rata per kWh yang benar-benar Anda bayar, bukan tarif daftar.
3. **Kurangi OPEX.** Kurangi penghematan bruto dengan biaya operasional tahunan, misalnya Rp 220 juta per tahun pada contoh sistem 1 MWp.
4. **Hitung payback sederhana.** Bagi CAPEX dengan penghematan neto tahunan untuk melihat berapa tahun modal kembali.

Langkah pertama dan keempat adalah dua titik yang paling sering salah dihitung. Langkah pertama kerap memakai angka produksi spesifik dari negara lain yang iradiasinya lebih tinggi. Langkah keempat sering mengabaikan OPEX sehingga payback terlihat lebih cepat daripada kenyataan.

## Rincian Biaya dan Perhitungan Payback Sistem 1 MWp

| Komponen | Angka | Catatan |
|---|---|---|
| Kapasitas sistem | 1 MWp | Contoh kasus industri |
| CAPEX | Rp 11 miliar | Rentang pasar Rp 9–13 miliar |
| Porsi modul surya | ±40% CAPEX | Sekitar Rp 4,4 miliar pada contoh ini |
| OPEX tahunan | Rp 220 juta | Operasi dan pemeliharaan |
| Produksi listrik | 1.400.000 kWh/tahun | Asumsi 1.400 kWh per kWp per tahun |
| Tarif listrik (asumsi) | Rp 1.400/kWh | Ganti dengan tarif efektif Anda |
| Penghematan bruto | Rp 1,96 miliar/tahun | 1.400.000 kWh × Rp 1.400 |
| Penghematan neto | Rp 1,74 miliar/tahun | Setelah dikurangi OPEX |
| Payback sederhana | ±6,3 tahun | Rp 11 miliar ÷ Rp 1,74 miliar |
| Emisi dihindari | ±1.218 ton CO2/tahun | Estimasi 0,87 kg CO2 per kWh |

Tabel di atas bukan proyeksi resmi, melainkan alat bantu berpikir. Setiap angka di dalamnya bisa dan sebaiknya diganti dengan data pabrik Anda sendiri. Yang tidak berubah adalah strukturnya: produksi, tarif, OPEX, lalu payback.

Selain penghematan biaya, hitungan emisi di baris terakhir menarik untuk pelaporan ESG. Dengan faktor emisi grid Indonesia sekitar 0,87 kg CO2 per kWh, sistem 1 MWp pada contoh ini menghindari emisi sekitar 1.218 ton CO2 per tahun. Angka ini merupakan perkiraan dan akan bergeser bila bauran pembangkit nasional berubah.

## Faktor yang Mengubah Rentang Investasi

Rentang CAPEX Rp 9–13 miliar per MWp tidak seragam, dan beberapa faktor menjelaskan perbedaan itu.

- **Skema kepemilikan.** Pada skema BOO, aset PLTS tetap milik solar developer seterusnya dan harga cenderung paling murah karena developer memegang aset jangka panjang. Pada skema BOT, aset menjadi milik pemilik gedung setelah masa kontrak berakhir, sehingga struktur harganya berbeda.
- **Tingkat komponen dalam negeri.** Material kelistrikan dengan TKDN minimal 40 persen, seperti yang ditargetkan SonusHUB, mengubah komposisi biaya sekaligus membuka peluang pembiayaan tertentu.
- **Regulasi kuota.** Sejak [Permen ESDM No. 2 Tahun 2024](https://jdih.esdm.go.id/), pemasangan PLTS atap tidak lagi dibatasi 100 persen dari daya terpasang pelanggan PLN, melainkan tunduk pada kuota yang tersedia. Ketersediaan kuota ini memengaruhi jadwal sekaligus lingkup proyek.
- **Efisiensi sistem.** Efisiensi sistem PLTS adalah (energi listrik yang dihasilkan ÷ energi surya yang diterima panel) × 100 persen. Contohnya, 150 Wh keluar dari 1.000 Wh yang masuk berarti efisiensi 15 persen.

Efisiensi itu sendiri dipengaruhi kualitas modul, panjang dan ukuran kabel inverter, sudut pemasangan, serta bayangan. Dua sistem dengan kapasitas sama bisa menghasilkan kWh tahunan yang berbeda hanya karena empat hal tersebut. Karena itu, audit lokasi dan desain tata letak bukan biaya tambahan, melainkan penentu angka penghematan.

Perlu diingat pula bahwa penghematan terasa penuh hanya bila produksi listrik dikonsumsi saat beban pabrik tinggi. Pabrik dengan dua atau tiga shift umumnya memanfaatkan produksi siang hari lebih baik daripada pabrik satu shift.

## Menyiapkan Keputusan Investasi

Angka penghematan yang solid lahir dari data internal, bukan dari brosur. Mulailah dengan mengumpulkan tagihan listrik 12 bulan terakhir, profil beban harian, dan luas atap yang benar-benar bebas bayangan. Setelah itu, uji hasilnya dengan simulasi produksi dan struktur pembiayaan yang paling sesuai.

Untuk sampai ke angka final, Anda membutuhkan desain sistem dan estimasi biaya yang spesifik lokasi. [Layanan EPC untuk segmen commercial and industrial](/layanan/epc/segmen-ci/) dari Solar Nusantara mencakup survei, desain, dan perhitungan produksi energi. Anda juga bisa melengkapi perhitungan ini dengan [layanan manajemen energi](/layanan/manajemen-energi/) agar penghematan tetap terukur setelah sistem beroperasi. Untuk kebutuhan komponen, [panel surya ber-TKDN](/produk/sistem-panel-surya/panel-surya/panel-tkdn/) tersedia melalui ekosistem SonusHUB.

Dari sisi investasi, siapkan rentang Rp 9–13 miliar per MWp untuk sistem lengkap, dengan porsi modul surya sekitar 40 persen di dalamnya. Rentang itu bergerak naik atau turun tergantung skema kepemilikan, tingkat TKDN komponen, ketersediaan kuota PLN, dan kualitas desain efisiensi sistem. Semakin rapi perhitungan di awal, semakin mudah penghematan listrik tahunan pabrik manufaktur dipertahankan sebagai angka nyata di laporan keuangan.

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
