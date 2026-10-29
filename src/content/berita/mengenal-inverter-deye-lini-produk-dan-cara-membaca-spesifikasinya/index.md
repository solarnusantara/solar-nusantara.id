---
title: "Mengenal Inverter Deye: Lini Produk dan Cara Membaca Spesifikasinya"
seoTitle: "Mengenal Inverter Deye"
description: "Lini inverter Deye untuk PLTS on-grid dan hybrid di SonusHUB, plus cara membaca MPPT, fase, dan tegangan baterai di datasheet resmi."
heroImage: "./hero.webp"
heroImageAlt: "Ilustrasi inverter surya dengan buku panduan tertutup di sampingnya"
focusKeyphrase: "inverter deye"
pubDate: "2026-10-29"
tags: ["pengetahuan-material", "inverter", "merek", "teknis"]
draft: false
---

Deye memproduksi inverter untuk sistem tenaga surya, dan lini produknya terbagi menjadi dua keluarga besar: inverter on-grid (string) serta inverter hybrid yang mendukung bank baterai. Bagi pembeli material PLTS, keduanya sering masuk dalam satu daftar permintaan pengadaan, padahal cara membaca spesifikasinya berbeda. Tulisan ini memetakan lini inverter Deye yang tercatat di katalog SonusHUB dan menunjukkan bagian datasheet mana yang perlu diperiksa sebelum pesanan dikirim ke pemasok.

## Lini Inverter Deye yang Tercatat di SonusHUB

Tabel berikut merangkum keluarga produk sesuai pencatatan katalog SonusHUB per 19 Oktober 2026. Isinya dibatasi pada pembagian keluarga, fase, dan rentang kapasitas. Angka teknis rinci tetap harus diambil dari datasheet resmi setiap model.

| Keluarga | Fase | Baterai | Kapasitas | Catatan |
|---|---|---|---|---|
| On-grid | Satu fase | — | 2 kW (SUN-2K-G04) | Satu kode model |
| On-grid | Tiga fase | — | 50 kW dan 110 kW | 4 MPPT (50 kW), 6 MPPT (110 kW) |
| Hybrid | Satu fase | 48 V | 3,6 kW; 5 kW; 10 kW; 12 kW | — |
| Hybrid | Tiga fase | 48 V | 5 kW; 8 kW; 10 kW; 12 kW | — |
| Hybrid | Tiga fase | Tegangan tinggi | 25 kW dan 50 kW | — |

Langkah pertama saat membaca tabel ini adalah memisahkan on-grid dari hybrid. Unit on-grid bekerja paralel dengan jaringan PLN dan tidak memerlukan bank baterai. Unit hybrid memerlukan baterai, dan pilihan tegangannya menentukan perangkat pendukung di sekitarnya: 48 V untuk seri satu fase dan sebagian seri tiga fase, tegangan tinggi untuk 25 kW dan 50 kW tiga fase. Karena itu, konfigurasi baterai sebaiknya dikunci lebih awal agar spesifikasi kabel DC, proteksi, dan ruang panel tidak berubah di tengah proses pengadaan.

Perubahan tegangan baterai akan mengubah arus kerja, penampang kabel, dan rating proteksi. Pembeli sebaiknya membaca bagian ini bersamaan dengan halaman [sistem pengkabelan](/produk/sistem-panel-surya/sistem-pengkabelan/) agar kebutuhan kabel DC dan AC sudah terhitung sejak tahap inquiry. Jika konfigurasi baterai belum final, tanyakan kepada pemasok apakah unit hybrid yang dipilih tersedia pada kelas tegangan yang dibutuhkan.

## Membaca Spesifikasi Teknis Tanpa Salah Tafsir

Datasheet inverter umumnya dibagi menjadi beberapa kelompok data: masukan PV, keluaran AC, baterai untuk unit hybrid, efisiensi, dan proteksi. Kelompok masukan PV paling sering menimbulkan kesalahan pesan karena angkanya terlihat mirip satu sama lain. Periksa jumlah MPPT, jumlah string per MPPT, serta arus maksimum per MPPT, lalu cocokkan dengan denah atap. Pada unit on-grid tiga fase, katalog mencatat 4 MPPT untuk 50 kW dan 6 MPPT untuk 110 kW.

Untuk atap dengan beberapa arah hadap atau bayangan parsial, jumlah MPPT menentukan seberapa leluasa string dibagi. Kelompok keluaran AC harus dibaca dengan fase, tegangan, dan arus maksimum yang jelas, karena kekeliruan fase merepotkan saat instalasi. Pada unit hybrid, tegangan baterai dan protokol komunikasinya sama pentingnya dengan kapasitas kW, sebab BMS baterai harus berbicara dalam bahasa yang sama dengan inverter.

Perlu dibedakan antara efisiensi inverter dan efisiensi sistem PLTS. Efisiensi sistem PLTS dihitung sebagai (energi listrik yang dihasilkan / energi surya yang diterima panel) x 100%; sebagai contoh, 150 Wh keluaran dari 1000 Wh masukan setara 15%. Angka efisiensi pada datasheet inverter tidak bisa langsung dipakai sebagai efisiensi sistem, karena sistem juga dipengaruhi faktor berikut:

- kualitas modul surya;
- panjang dan ukuran kabel dari string ke inverter;
- sudut pemasangan panel;
- bayangan (shading) pada permukaan panel.

Bacalah kurva efisiensi pada rentang tegangan kerja yang akan dipakai, bukan hanya angka puncaknya. Untuk pertanyaan yang tidak terjawab datasheet, mintalah versi terbaru untuk kode model yang persis kepada distributor resmi.

## Menyamakan Istilah Sebelum Membandingkan Dokumen

Tiga istilah paling sering tertukar dalam dokumen pengadaan inverter: kapasitas keluaran AC, kapasitas masukan PV, dan kapasitas baterai. Kapasitas keluaran AC adalah batas daya yang disalurkan ke beban atau jaringan, sedangkan masukan PV adalah batas daya yang boleh diterima dari sisi panel. Rasio keduanya ditentukan oleh desain sistem, bukan oleh angka pada brosur.

Untuk unit hybrid, kapasitas baterai mengikuti tegangan dan arus pengisian yang tercantum, bukan hanya angka kW pada nama model. Dua unit dengan angka kW sama bisa memiliki konfigurasi baterai berbeda, sehingga daftar pendek sebaiknya disusun per kode model. Cara termudah adalah menyusun tabel perbandingan internal dengan kolom identik untuk semua kandidat.

## Menyesuaikan Pilihan dengan Konteks Proyek dan Pengadaan

Untuk skema on-grid, kapasitas yang diajukan tidak lagi dibatasi 100% dari daya terpasang pelanggan PLN, melainkan tunduk pada kuota PLN yang tersedia (Permen ESDM No. 2 Tahun 2024, lihat [JDIH Kementerian ESDM](https://jdih.esdm.go.id/)). Konsekuensinya, kapasitas sistem yang dipesan sebaiknya mengikuti kuota yang disetujui, bukan hanya angka daya terpasang pada tagihan listrik. Dokumen persetujuan sebaiknya dilampirkan sejak tahap permintaan penawaran agar spesifikasi tidak direvisi belakangan.

SonusHUB menargetkan material kelistrikan dengan TKDN minimal 40%, sehingga berkas TKDN sebaiknya diminta bersama datasheet, bukan setelah kontrak berjalan. Untuk proyek yang membutuhkan unit on-grid, perbandingan spesifikasi dapat dimulai dari halaman [inverter on-grid](/produk/sistem-panel-surya/inverter/on-grid/). Sementara untuk melihat lini yang tersedia di platform, buka [katalog inverter string dan hybrid SonusHUB](https://sonushub.id/category/inx-string-hybrid-inverters-sh?utm_source=solar-nusantara.id&utm_medium=artikel&utm_campaign=inverter&utm_content=mengenal-inverter-deye-lini-produk-dan-cara-membaca-spesifikasinya&utm_term=isi).

## Yang Harus Dicek di Datasheet Resmi Sebelum Memesan

Sebelum pesanan dikirim, mintalah datasheet resmi untuk kode model yang persis, bukan ringkasan katalog. Beberapa hal berikut paling sering terlewat:

1. Kode model dan kapasitas persis, misalnya SUN-2K-G04 untuk unit on-grid satu fase 2 kW.
2. Jumlah MPPT, string per MPPT, dan arus maksimum per MPPT, dicocokkan dengan susunan modul.
3. Rentang tegangan MPPT dan tegangan start, agar string tetap bekerja pada kondisi cahaya rendah.
4. Keluaran AC: fase, tegangan, arus maksimum, dan jenis konektor.
5. Untuk hybrid: tegangan baterai (48 V atau tegangan tinggi), arus pengisian, dan protokol komunikasi BMS.
6. Efisiensi pada rentang tegangan kerja, bukan hanya nilai puncak.
7. Dokumen sertifikasi dan jenis standar yang dirujuk (IEC atau SNI), serta dokumen TKDN bila dipersyaratkan proyek.
8. Kondisi lingkungan: suhu operasi, derating, dan kelas proteksi IP.

Dengan memeriksa daftar tersebut pada datasheet resmi inverter Deye, tim pengadaan dapat menutup celah kesalahan model sebelum barang dikirim. Langkah berikutnya ada di platform: buka [katalog material SonusHUB](https://sonushub.id/products?utm_source=solar-nusantara.id&utm_medium=artikel&utm_campaign=inverter&utm_content=mengenal-inverter-deye-lini-produk-dan-cara-membaca-spesifikasinya&utm_term=isi), bandingkan spesifikasi unit yang masuk daftar pendek, lalu kirim inquiry lewat keranjang inquiry atau hubungi Chat Sales SonusHUB.

---

**Solar Nusantara** berfokus pada pengembangan solusi energi surya untuk sektor komersial dan industri. Kami membantu perusahaan merancang sistem photovoltaic yang efisien dan berkelanjutan.

Untuk implementasi proyek, Anda dapat mengunjungi [**Sonus EPC**](https://sonus-epc.id), yang menyediakan layanan EPC (Engineering, Procurement, and Construction) untuk pemasangan sistem panel surya. Sementara itu, [**SonusHUB**](https://sonushub.id/?utm_source=solar-nusantara.id&utm_medium=artikel&utm_campaign=inverter&utm_content=mengenal-inverter-deye-lini-produk-dan-cara-membaca-spesifikasinya&utm_term=cta) hadir sebagai platform B2B yang menyediakan berbagai material kelistrikan dan komponen energi terbarukan bagi kebutuhan proyek dan instalasi profesional.

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
