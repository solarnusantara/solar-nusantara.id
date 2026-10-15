---
title: "Simulasi Produksi Energi Tahunan PLTS di Gedung Pemerintah"
description: "Panduan simulasi produksi PLTS gedung pemerintah: variabel penentu kapasitas, contoh perhitungan tahunan, emisi, dan checklist data desain."
focusKeyphrase: "simulasi produksi plts gedung pemerintah"
pubDate: "2026-10-03"
tags: ["b2g", "desain-sistem", "plts", "teknis"]
draft: true
---

Ukuran sistem PLTS di gedung pemerintah tidak ditentukan oleh satu angka tunggal. Ada beberapa variabel yang harus dihitung lebih dulu: intensitas radiasi matahari di lokasi, luas dan kondisi atap, kemiringan serta orientasi pemasangan, potensi bayangan, dan kuota daya yang tersedia dari PLN. Variabel inilah yang menjadi fondasi simulasi produksi PLTS gedung pemerintah sebelum anggaran maupun target ESG disusun.

Regulasi menambah satu lapisan penentu. Sesuai [Permen ESDM No. 2 Tahun 2024](https://www.esdm.go.id/), pemasangan PLTS atap tidak lagi dibatasi 100% dari daya terpasang pelanggan PLN, melainkan tunduk pada kuota PLN yang tersedia. Artinya, kapasitas yang bisa dipasang di sebuah gedung pemerintah dapat lebih kecil daripada potensi atapnya. Simulasi karena itu sebaiknya dimulai dari kuota, bukan dari luas atap semata.

Gedung pemerintah punya satu keunggulan alami: beban listriknya paling tinggi pada jam kerja, tepat ketika PLTS berproduksi penuh. Pola ini membuat energi surya lebih banyak terpakai langsung di tempat, bukan diekspor ke jaringan. Dampaknya, proyeksi penghematan biasanya lebih stabil dibanding gedung dengan beban malam dominan.

## Variabel Penentu Ukuran Sistem dan Simulasi Produksi PLTS Gedung Pemerintah

Iradiasi matahari menetapkan plafon produksi dan tidak ada konfigurasi sistem yang bisa melampauinya. Lokasi dengan radiasi tinggi akan menghasilkan energi tahunan lebih besar dibanding wilayah yang sering berkabut. Dua gedung dengan kapasitas identik pun bisa berakhir dengan produksi tahunan yang berbeda.

Efisiensi sistem mengukur seberapa besar energi surya yang diterima panel benar-benar berubah menjadi listrik. Rumusnya sederhana: (energi listrik yang dihasilkan / energi surya yang diterima panel) x 100%. Sebagai ilustrasi, 150 Wh yang keluar dari 1.000 Wh yang masuk setara dengan efisiensi 15%. Nilai ini dipengaruhi kualitas modul, panjang dan ukuran kabel inverter, sudut pemasangan, serta bayangan.

Bayangan sering menjadi penyebab utama produksi di bawah simulasi. Cerobong, antena, unit pendingin atap, dan bangunan tetangga bisa memotong produksi pada jam-jam puncak matahari. Karena itu, denah bayangan sebaiknya dibuat sebelum kapasitas dikunci.

Variabel yang perlu dikunci lebih dulu:

- Kuota daya PLN yang tersedia untuk lokasi tersebut.
- Profil beban harian gedung dan jam operasionalnya.
- Luas atap efektif setelah dikurangi area bayangan dan jalur perawatan.
- Efisiensi sistem yang realistis, termasuk rugi kabel dan inverter.
- Batasan struktural atap serta ketentuan pengadaan barang milik negara.

## Contoh Perhitungan Bertahap untuk Sistem 1 MWp

Contoh berikut memakai kapasitas 1 MWp agar sebanding dengan data CAPEX yang tersedia untuk pasar Indonesia. Asumsi produksi spesifik 1.400 kWh per kWp per tahun dipakai sebagai ilustrasi; angka ini wajib divalidasi dengan data iradiasi lokasi dan studi kelayakan.

1. Kapasitas terpasang: 1 MWp setara 1.000 kWp.
2. Produksi tahunan: 1.000 kWp x 1.400 kWh/kWp = 1.400.000 kWh per tahun, atau 1,4 GWh.
3. Koreksi efisiensi: bila efisiensi sistem turun dari 15% ke 13%, produksi turun proporsional menjadi sekitar 1.213.333 kWh per tahun.
4. Emisi terhindar: 1.400.000 kWh x 0,87 kg CO2/kWh = sekitar 1.218.000 kg, atau kurang lebih 1.218 ton CO2 per tahun (perkiraan berbasis faktor emisi grid rata-rata Indonesia).

Langkah ketiga menunjukkan mengapa uji efisiensi bukan formalitas. Selisih dua poin persen efisiensi setara dengan lebih dari 186.000 kWh per tahun pada sistem 1 MWp. Pada skala gedung pemerintah, selisih itu cukup untuk menggeser profil penghematan secara signifikan. Karena itu, setiap asumsi efisiensi sebaiknya dicatat dan diuji terhadap hasil pengukuran setelah sistem beroperasi.

## Menyandingkan Produksi dengan CAPEX dan OPEX

CAPEX PLTS 1 MWp di Indonesia berada di rentang Rp 9-13 miliar berdasarkan data 2024-2025. Pada contoh nyata pemasangan 1 MWp di sektor industri, CAPEX tercatat Rp 11 miliar dengan OPEX Rp 220 juta per tahun. Modul surya menyumbang sekitar 40% dari total CAPEX sistem 1 MW, sehingga komponen ini paling layak dinegosiasikan secara cermat.

Dari angka OPEX tersebut, biaya operasional setara sekitar Rp 157 per kWh yang diproduksi. Angka ini berguna sebagai pembanding awal ketika bagian pengadaan menyusun proyeksi biaya siklus hidup sistem. Untuk perhitungan penghematan tagihan, hasilnya perlu disandingkan dengan tarif listrik yang berlaku di lokasi.

Kualitas komponen menentukan seberapa stabil angka-angka itu bertahan. Material kelistrikan dengan TKDN minimal 40%, seperti yang ditargetkan SonusHUB, membantu menjaga ketersediaan suku cadang dan kepatuhan pengadaan. Pilihan [panel surya ber-TKDN](/produk/sistem-panel-surya/panel-surya/panel-tkdn/) juga memperkuat nilai lokal proyek di mata auditor.

## BOO atau BOT untuk Gedung Pemerintah

Pilihan skema kepemilikan mengubah struktur anggaran secara signifikan. Pada skema BOO (Build Own Operate), aset PLTS tetap milik solar developer seterusnya; harga cenderung paling murah karena developer memegang aset jangka panjang. Pada skema BOT (Build Operate Transfer), aset menjadi milik developer selama masa kontrak, lalu berpindah ke pemilik gedung.

Bagi pengelola gedung pemerintah, keputusan ini menyangkut pencatatan aset dan kesinambungan operasi setelah kontrak berakhir. Karena itu, hasil simulasi produksi sebaiknya disandingkan dengan skema komersial sejak tahap awal. Tim [layanan EPC sistem tenaga surya](/layanan/sistem-tenaga-surya-epc/) biasanya memakai keduanya sebagai kerangka pembanding sebelum rekomendasi konfigurasi final.

## Checklist Data Sebelum Desain Dimulai

Kelengkapan data menentukan seberapa dapat dipercaya hasil simulasi. Sebelum desain dimulai, siapkan:

- Tagihan listrik 12 bulan terakhir beserta profil beban harian.
- Kapasitas daya terpasang PLN dan status kuota PLTS atap di lokasi.
- Gambar atap as-built dengan dimensi, kemiringan, dan material penutup atap.
- Foto atau denah area bayangan dari pagi hingga sore hari.
- Data iradiasi matahari lokasi dari pengukuran atau basis data terpercaya.
- Batasan struktural, jalur perawatan, dan titik penempatan inverter.
- Ketentuan pengadaan serta target TKDN yang berlaku di instansi.
- Rencana pemeliharaan dan asumsi OPEX tahunan.

Semakin lengkap data tersebut, semakin kecil selisih antara simulasi dan produksi aktual. Setelah data terkumpul, simulasi produksi PLTS gedung pemerintah dapat disusun dengan asumsi yang transparan dan mudah diaudit. [Manajemen energi](/layanan/manajemen-energi/) dapat dipakai untuk memantau realisasi produksi terhadap proyeksi setiap bulan.

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
