---
title: "Menyusun Dokumen RFQ PLTS untuk Pabrik Manufaktur"
description: "Panduan menyusun RFQ PLTS pabrik manufaktur agar penawaran vendor bisa dibandingkan setara, dari data beban hingga verifikasi klaim."
focusKeyphrase: "rfq plts pabrik manufaktur"
pubDate: "2026-10-02"
tags: ["manufaktur", "pengadaan", "plts", "teknis"]
draft: true
---

Kesalahan pengadaan PLTS yang paling mahal di pabrik manufaktur tidak terjadi saat negosiasi harga, melainkan jauh sebelum itu. Dokumen RFQ PLTS pabrik manufaktur yang hanya berbunyi "kami butuh PLTS 1 MWp" akan menghasilkan penawaran yang mustahil dibandingkan. Setiap vendor menjawab pertanyaan yang berbeda, sehingga tim pengadaan menilai hal yang tidak setara. Satu vendor bisa menawarkan sistem 900 kWp, vendor lain 1,2 MWp, dan keduanya tampak sama-sama "1 MWp" di ringkasan penawaran.

Padahal rentang CAPEX PLTS 1 MWp di Indonesia berada di kisaran Rp 9–13 miliar untuk periode 2024–2025, dengan modul surya menyumbang sekitar 40% dari total CAPEX sistem 1 MW. Sebagai gambaran, sebuah perusahaan industri memasang PLTS 1 MWp dengan CAPEX Rp 11 miliar dan estimasi OPEX Rp 220 juta per tahun. Tanpa struktur RFQ yang rapi, angka-angka ini tidak bisa dipakai untuk menilai kewajaran harga yang masuk.

## Poin Wajib dalam Dokumen RFQ PLTS Pabrik Manufaktur

Dokumen yang baik memaksa semua vendor menjawab pada basis yang sama. Minimal, pastikan delapan poin berikut ada di dalamnya.

1. **Profil beban listrik 12 bulan terakhir**, idealnya dalam interval 15 atau 30 menit, agar vendor dapat menghitung sendiri ukuran sistem yang relevan.
2. **Pola operasi dan shift kerja**, termasuk beban dasar malam hari, beban puncak siang, dan hari libur pabrik.
3. **Kapasitas daya terpasang PLN dan status kuota PLTS** di lokasi tersebut.
4. **Data lokasi dan kondisi atap**: luas area efektif, jenis penutup atap, kemiringan, orientasi, serta potensi bayangan dari struktur atau cerobong.
5. **Skema pembiayaan yang diinginkan**: CAPEX milik sendiri, BOO, atau BOT.
6. **Target TKDN** yang harus dipenuhi vendor beserta bukti sertifikasinya.
7. **Ruang lingkup O&M**: frekuensi pencucian modul, inspeksi inverter, waktu respons gangguan, dan ketersediaan suku cadang.
8. **Metrik jaminan performa**, bukan sekadar janji produksi energi tahunan.

Tanpa poin 1 dan 2, vendor hanya bisa menebak. Akibatnya penawaran menjadi konservatif, dan Anda membayar premi untuk ketidakpastian yang sebenarnya bisa dihilangkan sendiri. Poin 3 dan 5 juga sering diabaikan, padahal keduanya menentukan bentuk penawaran. Tanpa kejelasan kuota, vendor tidak bisa mengunci jadwal interkoneksi, dan tanpa keputusan skema pembiayaan, vendor BOO dan vendor CAPEX akan mengirim struktur harga yang sama sekali berbeda.

## Kuota PLN dan Dasar Regulasi yang Harus Dikutip

Sejak Permen ESDM No. 2 Tahun 2024 berlaku, pemasangan PLTS atap tidak lagi dibatasi 100% dari daya terpasang pelanggan PLN. Kapasitas kini tunduk pada kuota PLN yang tersedia di sistem setempat. Informasi resmi mengenai kebijakan ini dapat dicek melalui [situs Kementerian ESDM](https://www.esdm.go.id/).

Konsekuensinya untuk dokumen RFQ cukup praktis: mintakan pernyataan tertulis dari vendor mengenai asumsi kuota yang mereka pakai. Jika vendor mengasumsikan kuota penuh sementara kenyataannya terbatas, jadwal proyek bisa mundur berbulan-bulan.

## BOO, BOT, atau CAPEX Sendiri

Pilihan skema kepemilikan mengubah total biaya kepemilikan secara drastis, sehingga harus dinyatakan tegas di dalam RFQ. Pada skema BOO (Build Own Operate), aset PLTS tetap milik solar developer seterusnya. Harga per kWh cenderung paling murah karena developer memegang aset jangka panjang dan menanggung risiko kinerjanya.

Pada skema BOT (Build Operate Transfer), aset menjadi milik developer selama masa kontrak, lalu berpindah ke pemilik gedung. Skema ini cocok untuk pabrik yang ingin mencatat aset tetap di neraca setelah kontrak selesai. Jika Anda memilih jalur CAPEX sendiri, libatkan mitra EPC yang berpengalaman pada [layanan sistem tenaga surya EPC](/layanan/sistem-tenaga-surya-epc/) agar ruang lingkup pekerjaan sipil, kelistrikan, dan commissioning terukur sejak awal.

## Standar Teknis dan Efisiensi yang Harus Diukur

Efisiensi sistem PLTS dihitung sebagai energi listrik yang dihasilkan dibagi energi surya yang diterima panel, dikali 100%. Sebagai contoh, bila 150 Wh listrik keluar dari 1000 Wh energi surya yang masuk, efisiensinya 15%. Angka ini dipengaruhi kualitas modul, panjang dan ukuran kabel inverter, sudut pemasangan, serta bayangan.

Mintakan vendor menyebut asumsi efisiensi dan performance ratio secara eksplisit. Perbedaan asumsi efisiensi akan langsung mengubah proyeksi produksi energi tahunan, sehingga angka ini harus bisa dipertanggungjawabkan vendor. Selain itu, tetapkan format pelaporan kinerja bulanan sejak tahap RFQ. Parameter seperti produksi energi aktual, performance ratio, dan waktu henti sistem sebaiknya dilaporkan dengan format yang sama oleh semua vendor.

## TKDN dan Rantai Pasok Material

TKDN bukan sekadar syarat administratif; ia menentukan kelayakan proyek untuk banyak skema pembiayaan dan pelaporan. SonusHUB, marketplace material kelistrikan dan energi terbarukan, menargetkan material kelistrikan dengan TKDN minimal 40%. Anda dapat menelusuri pendekatannya di [halaman SonusHUB](/tentang/sonushub/) dan melihat contoh produk pada [panel surya dengan TKDN](/produk/sistem-panel-surya/panel-surya/panel-tkdn/).

Di dalam RFQ, cantumkan permintaan bukti sertifikat TKDN per komponen utama: modul, inverter, kabel, dan struktur mounting.

## Menghitung Kontribusi Emisi untuk Pelaporan ESG

Faktor emisi rata-rata grid listrik Indonesia adalah sekitar 0,87 kg CO2 per kWh, sebagai perkiraan. Angka ini memungkinkan tim keberlanjutan mengubah produksi energi PLTS menjadi klaim pengurangan emisi yang bisa diaudit.

Sebagai asumsi perhitungan, sistem sekitar 1 MWp dengan produksi 1.400 MWh per tahun menghasilkan pengurangan emisi sekitar 1.218 ton CO2 per tahun (1.400 MWh dikali 0,87 kg CO2 per kWh). Mintakan vendor menyediakan lembar perhitungan serupa di dalam proposal, bukan hanya klaim pengurangan emisi tanpa dasar.

## Cara Memverifikasi Klaim Vendor

Di sinilah dokumen RFQ PLTS pabrik manufaktur membuktikan nilainya. Klaim vendor sebaiknya diverifikasi dengan tiga langkah sederhana. Pertama, cocokkan angka produksi energi di proposal dengan simulasi berbasis data beban yang Anda berikan sendiri. Kedua, minta referensi proyek sejenis dan kunjungi salah satunya untuk melihat kondisi aktual setelah beroperasi.

Ketiga, pisahkan klaim teknis dari klaim komersial, lalu uji keduanya secara terpisah. Untuk memperkuat penilaian, libatkan pihak ketiga atau gunakan layanan [manajemen energi](/layanan/manajemen-energi/) yang dapat memverifikasi kinerja sistem setelah serah terima. Dengan begitu, perbandingan penawaran tidak lagi bergantung pada narasi vendor, melainkan pada data yang bisa diuji.

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
