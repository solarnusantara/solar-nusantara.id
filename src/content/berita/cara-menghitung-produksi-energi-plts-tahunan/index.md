---
title: "Cara Menghitung Produksi Energi PLTS Tahunan"
pubDate: "2026-03-10"
description: "Metode menghitung produksi energi PLTS dari peak sun hours, efisiensi sistem, dan ukuran array untuk estimasi output listrik tahunan."
heroImage: "./1.webp"
heroImageAlt: "AI Generated Image"
---
Dalam perencanaan sistem **Pembangkit Listrik Tenaga Surya (PLTS)**, estimasi produksi energi tahunan menjadi salah satu parameter utama untuk menentukan ukuran sistem yang tepat. Perhitungan ini biasanya melibatkan tiga variabel utama: **peak sun hours (PSH)**, **kapasitas sistem (kW)**, dan **efisiensi sistem**.

Pendekatan ini banyak digunakan dalam tahap studi kelayakan proyek PLTS untuk sektor industri, komersial, maupun utilitas.

## Standard Test Conditions (STC) pada Modul Surya

Kapasitas modul surya umumnya dinyatakan dalam kondisi uji standar atau **Standard Test Conditions (STC)**. Parameter STC meliputi:

* Intensitas radiasi matahari: **1000 W/m²**
* Temperatur sel: **25°C**
* Air mass: **1.5**

Dalam kondisi tersebut, modul surya dengan efisiensi **20%** akan menghasilkan sekitar **200 W** dari setiap **1000 W** energi matahari yang diterima.

Namun dalam kondisi operasional nyata, performa sistem biasanya lebih rendah akibat beberapa faktor seperti:

* temperatur modul yang lebih tinggi
* kotoran atau debu pada permukaan modul
* variasi radiasi matahari

Karena itu, dalam banyak studi awal digunakan **efisiensi sistem sekitar 80%** untuk memperhitungkan berbagai kehilangan energi.

## Pengaruh Temperatur terhadap Output Panel

Kenaikan temperatur modul surya dapat menurunkan performa listrik. Secara umum, modul fotovoltaik mengalami penurunan output sekitar:

> **0.3% sampai 0.5% per °C di atas 25°C**

Peningkatan temperatur menyebabkan resistansi listrik meningkat sehingga tegangan keluaran modul menurun. Dampaknya adalah penurunan daya total yang dihasilkan sistem.

## Konsep Peak Sun Hours (PSH)

Dalam perhitungan PLTS, istilah **Peak Sun Hours (PSH)** digunakan untuk menyederhanakan nilai radiasi matahari harian.

Satu PSH didefinisikan sebagai:

> **1 jam radiasi matahari setara 1 kW/m²**

Jika suatu lokasi memiliki **5 kWh/m² per hari**, maka nilai tersebut ekuivalen dengan **5 peak sun hours per hari**.

Nilai PSH berbeda di setiap wilayah tergantung kondisi geografis dan iklim.

## Rumus Produksi Energi PLTS

Produksi energi harian dapat dihitung dengan rumus berikut:

$$
E_{daily} = P_{array} \times PSH \times \eta
$$

di mana:

* $P_{array}$ = kapasitas sistem PLTS (kW)
* $PSH$ = peak sun hours per hari
* $\eta$ = efisiensi sistem

### Contoh Perhitungan

Misalkan sebuah sistem PLTS memiliki parameter berikut:

* kapasitas sistem: **3 kW**
* peak sun hours: **4 jam per hari**
* efisiensi sistem: **80%**

Maka produksi energi harian:

$$
E_{daily} = 3 \times 4 \times 0.8 = 9.6 \text{ kWh/hari}
$$

Produksi energi tahunan:

$$
E_{annual} = 9.6 \times 365 = 3504 \text{ kWh/tahun}
$$

Perhitungan ini digunakan sebagai estimasi awal dalam perencanaan sistem.

## Estimasi Produksi Berdasarkan Kapasitas Sistem

Sebagai ilustrasi lain, sistem **PLTS 8 kW** di lokasi dengan **5 PSH per hari** akan menghasilkan:

Produksi harian:

$$
E_{daily} = 8 \times 5 = 40 \text{ kWh/hari}
$$

Produksi tahunan:

$$
E_{annual} = 40 \times 365 = 14,600 \text{ kWh/tahun}
$$

Nilai ini masih dapat berubah tergantung kondisi operasional sistem.

## Penerapan dalam Perencanaan Proyek PLTS

Perhitungan produksi energi PLTS digunakan dalam beberapa tahap perencanaan proyek, antara lain:

* estimasi penghematan biaya listrik
* sizing kapasitas sistem
* analisis kelayakan investasi
* proyeksi produksi energi tahunan

Dalam proyek skala industri atau komersial, perhitungan ini biasanya dikombinasikan dengan analisis data radiasi matahari lokasi, profil beban listrik, serta simulasi perangkat lunak energi surya.

---

## Referensi

[1] National Renewable Energy Laboratory (NREL), *Solar Photovoltaic DC Systems: Basics and Safety*.
[https://www.nrel.gov/docs/fy18osti/68696.pdf](https://www.nrel.gov/docs/fy18osti/68696.pdf)

[2] EEPower, *Understanding PV System Standards, Ratings, and Test Conditions*.
[https://eepower.com/technical-articles/understanding-pv-system-standards-ratings-and-test-conditions/](https://eepower.com/technical-articles/understanding-pv-system-standards-ratings-and-test-conditions/)

[3] SolarReviews, *What Is a Peak Sun Hour?*
[https://www.solarreviews.com/blog/peak-sun-hours-explained](https://www.solarreviews.com/blog/peak-sun-hours-explained)

[4] Endesa, *Peak Sun Hour: What It Is and How It Is Calculated*.
[https://www.endesa.com/en/blogs/endesa-s-blog/light/peak-sun-hour-what-it-is-how-it-is-calculated](https://www.endesa.com/en/blogs/endesa-s-blog/light/peak-sun-hour-what-it-is-how-it-is-calculated)

[5] ScienceDirect, *Solar Peak Hour Overview*.
[https://www.sciencedirect.com/topics/engineering/solar-peak-hour](https://www.sciencedirect.com/topics/engineering/solar-peak-hour)

[6] Wikipedia, *Solar Irradiance*.
[https://en.wikipedia.org/wiki/Solar_irradiance](https://en.wikipedia.org/wiki/Solar_irradiance)

## Penulis

[Mochammad Farros Fatchur Roji](https://farrosfr.com)

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
