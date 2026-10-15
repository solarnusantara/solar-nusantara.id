---
title: "Simulasi Payback Period PLTS di Pabrik Kelapa Sawit"
description: "Simulasi payback period PLTS pabrik kelapa sawit 1 MWp: rincian CAPEX, OPEX, dan asumsi yang menentukan modal kembali 5-8 tahun."
focusKeyphrase: "payback period plts pabrik kelapa sawit"
pubDate: "2026-10-02"
tags: ["kelapa-sawit", "biaya-roi", "plts", "teknis"]
draft: true
---

Membangun PLTS 1 MWp di pabrik kelapa sawit di Indonesia saat ini menelan CAPEX sekitar Rp 9-13 miliar. Contoh nyata di sektor industri mencatat CAPEX Rp 11 miliar untuk kapasitas 1 MWp, dengan OPEX sekitar Rp 220 juta per tahun. Dari dua angka itu, pertanyaan direksi biasanya tinggal satu: berapa lama modal kembali? Simulasi payback period PLTS pabrik kelapa sawit di bawah ini memakai basis angka tersebut agar hasilnya bisa langsung dibandingkan dengan anggaran Anda.

Satu catatan sebelum masuk ke hitungan: hasil simulasi sangat sensitif terhadap produksi listrik tahunan dan tarif listrik efektif yang Anda tanggung. Keduanya berbeda antar pabrik, tergantung lokasi, profil beban, dan golongan tarif PLN yang digunakan.

## Simulasi Payback Period PLTS Pabrik Kelapa Sawit Berbasis 1 MWp

Basis perhitungannya adalah sistem 1 MWp dengan CAPEX Rp 11 miliar dan OPEX Rp 220 juta per tahun. Modul surya menyumbang sekitar 40% dari total CAPEX, atau sekitar Rp 4,4 miliar pada contoh ini. Sisanya dialokasikan untuk inverter, struktur mounting, kabel, sistem proteksi, serta pekerjaan engineering dan instalasi.

Untuk sisi produksi, kami memakai asumsi yield 1.400 kWh per kWp per tahun. Angka ini berada di rentang wajar untuk banyak lokasi di Indonesia, tetapi tetap harus diverifikasi lewat studi produksi spesifik lokasi. Dengan kapasitas 1.000 kWp, produksi tahunan diasumsikan mencapai 1.400.000 kWh.

Sisi penghematan memakai asumsi tarif listrik efektif Rp 1.400 per kWh, mencakup komponen energi, biaya beban, dan penyesuaian lain dalam tagihan. Pabrik kelapa sawit umumnya beroperasi hampir 24 jam dengan beban siang yang besar, sehingga produksi PLTS bisa terserap langsung. Jika sebagian listrik Anda masih dipasok genset diesel, biaya marginal per kWh umumnya lebih tinggi dan periode pengembalian akan lebih cepat.

## Rincian Biaya dan Hasil Perhitungan

| Komponen | Nilai | Dasar Perhitungan |
|---|---|---|
| CAPEX PLTS 1 MWp | Rp 11 miliar | contoh nyata proyek industri |
| OPEX tahunan | Rp 220 juta | operasional dan pemeliharaan |
| Produksi listrik tahunan | 1.400.000 kWh | asumsi yield 1.400 kWh/kWp × 1.000 kWp |
| Tarif listrik efektif | Rp 1.400 per kWh | asumsi; ganti dengan tagihan aktual pabrik |
| Penghematan bruto | Rp 1,96 miliar per tahun | 1.400.000 kWh × Rp 1.400 |
| Penghematan neto | Rp 1,74 miliar per tahun | penghematan bruto dikurangi OPEX |
| Periode pengembalian sederhana | sekitar 6,3 tahun | Rp 11 miliar dibagi Rp 1,74 miliar per tahun |

Angka 6,3 tahun diperoleh dengan membagi CAPEX Rp 11 miliar dengan penghematan neto Rp 1,74 miliar per tahun. Perhitungan ini sengaja dibuat sederhana dan belum memasukkan diskonto maupun kenaikan tarif listrik. Untuk keperluan penganggaran internal, tambahkan analisis NPV dan IRR memakai asumsi Anda sendiri.

Perlu dicatat bahwa tabel di atas juga belum memasukkan degradasi modul. Dalam analisis yang lebih ketat, produksi tahun ke-10 akan lebih rendah daripada tahun pertama sesuai lembar data pabrikan. Karena itu, pengembalian aktual biasanya sedikit lebih panjang daripada hasil sederhana.

Dari sisi ESG, produksi 1.400.000 kWh per tahun setara dengan pengurangan emisi sekitar 1.218 ton CO2 per tahun. Angka ini memakai faktor emisi rata-rata grid listrik Indonesia sekitar 0,87 kg CO2 per kWh sebagai perkiraan, bukan nilai terverifikasi untuk satu lokasi tertentu.

## Faktor yang Mengubah Hasil Simulasi

Perubahan kecil pada asumsi bisa menggeser hasil secara signifikan. Berikut variabel yang paling sering membuat simulasi di atas kertas berbeda dari realisasi di lapangan.

1. **Yield produksi aktual.** Setiap selisih 100 kWh per kWp per tahun mengubah produksi 100.000 kWh, setara sekitar Rp 140 juta per tahun pada tarif Rp 1.400 per kWh.
2. **Tarif listrik efektif.** Kenaikan tarif mempercepat pengembalian, sedangkan penurunan tarif memperlambatnya.
3. **CAPEX aktual.** Rentang Rp 9-13 miliar per MWp berarti periode pengembalian bisa bergeser lebih dari satu tahun.
4. **Kuota PLN.** Sesuai Permen ESDM No. 2 Tahun 2024, kapasitas PLTS atap tidak lagi dibatasi 100% dari daya terpasang pelanggan PLN, melainkan mengikuti kuota yang tersedia.
5. **Skema kepemilikan.** Beli putus, BOO, atau BOT menghasilkan profil arus kas yang sangat berbeda.

Karena kuota bersifat lokasional, langkah pertama sebelum menghitung lebih jauh adalah mengonfirmasi ketersediaan kuota di titik interkoneksi pabrik. Ketentuan resminya dapat dicek melalui [Jaringan Dokumentasi dan Informasi Hukum Kementerian ESDM](https://jdih.esdm.go.id/).

## Skema BOO dan BOT: Pengaruhnya ke Arus Kas

Pada skema BOO (Build Own Operate), aset PLTS tetap milik solar developer seterusnya. Harga jual listriknya cenderung paling murah karena developer memegang aset dalam jangka panjang. Bagi pabrik, tidak ada CAPEX awal; yang dihitung bukan periode pengembalian modal, melainkan selisih antara tarif PLTS dan tarif listrik yang digantikan.

Pada skema BOT (Build Operate Transfer), aset dimiliki developer selama masa kontrak, lalu berpindah menjadi milik pemilik gedung. Setelah transfer, pabrik menanggung OPEX sendiri tetapi menikmati listrik tanpa biaya sewa. Kedua skema ini bisa disesuaikan dengan target ESG dan struktur modal perusahaan.

Pilihan skema juga menentukan siapa yang menanggung risiko kinerja. Pada BOO, risiko produksi dan pemeliharaan berada di sisi developer, sehingga pabrik membayar hanya untuk listrik yang benar-benar terkirim. Pada BOT dan beli putus, risiko itu berpindah ke pabrik bersama kepemilikan asetnya.

## Menjaga Kinerja agar Investasi Tidak Meleset

Efisiensi sistem PLTS dihitung sebagai (energi listrik yang dihasilkan dibagi energi surya yang diterima panel) dikali 100%. Contoh sederhananya, bila 150 Wh listrik keluar dari 1.000 Wh energi surya yang masuk, efisiensi sistem berada di angka 15%. Nilai ini dipengaruhi kualitas modul, panjang dan ukuran kabel inverter, sudut pemasangan, serta bayangan dari cerobong, bangunan, atau pohon di sekitar area pabrik.

Untuk pabrik kelapa sawit yang berdebu, jadwal pembersihan modul menjadi variabel yang sering diabaikan. Debu dan sisa serat dapat menurunkan produksi harian bila tidak dikelola dalam program O&M rutin. Layanan [manajemen energi](/layanan/manajemen-energi/) dapat membantu memantau performa sistem sekaligus menjadwalkan pemeliharaan.

Dari sisi komponen, pemilihan material ber-TKDN memperkuat struktur biaya jangka panjang karena rantai pasoknya lebih pendek. SonusHUB menargetkan material kelistrikan dengan TKDN minimal 40%, termasuk modul surya yang tersedia melalui [katalog panel surya ber-TKDN](/produk/sistem-panel-surya/panel-surya/panel-tkdn/). Untuk pabrik yang ingin menyerahkan seluruh proses dari desain hingga commissioning, [layanan EPC PLTS untuk segmen commercial dan industrial](/layanan/epc/segmen-ci/) mencakup studi kelayakan, perizinan, instalasi, dan pengujian.

## Rentang Investasi dan Faktor Penentu

Secara umum, anggaran PLTS 1 MWp di pabrik kelapa sawit berada di rentang Rp 9-13 miliar dengan OPEX tahunan di kisaran Rp 220 juta untuk sistem berukuran tersebut. Dengan asumsi produksi 1.400 kWh per kWp per tahun dan tarif efektif Rp 1.400 per kWh, payback period PLTS pabrik kelapa sawit jatuh di kisaran 5 hingga 8 tahun. Rentang itu melebar atau menyempit mengikuti tarif listrik yang digantikan, profil beban pabrik, harga komponen saat pengadaan, serta kuota PLN yang tersedia di lokasi Anda.

Karena itu, simulasi ini sebaiknya diperlakukan sebagai kerangka berpikir, bukan angka final. Langkah paling cepat adalah mengganti dua asumsi kunci, yaitu yield produksi dan tarif listrik efektif, dengan data aktual pabrik Anda. Setelah itu, keputusan investasi bisa diambil dengan dasar yang jauh lebih kokoh.

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
