# Solar Nusantara

This is a corporate website for Solar Nusantara, built with Astro.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   │   └── navLinks.ts
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── kontak.astro
│   │   ├── layanan.astro
│   │   ├── pintar.astro
│   │   ├── berita/
│   │   │   ├── [...slug].astro
│   │   │   └── index.astro
│   │   ├── produk/
│   │   │   └── [...slug].astro
│   │   └── tentang/
│   │       └── [...slug].astro
│   └── styles/
└── ... (config files, node_modules, etc.)
```

## Components

The reusable components are located in `src/components`:

- `AboutIntro.astro`: Introduction section about the company.
- `Benefits.astro`: Section describing the benefits of their services.
- `Copyright.astro`: Copyright notice for the footer.
- `FlipBoxGrid.astro`: A grid of flip boxes with calls to action.
- `Footer.astro`: The site-wide footer.
- `Header.astro`: The site-wide header, now including the top bar for desktop, Navbar and MobileHeader.
- `HeroSection.astro`: The main hero section for the homepage.
- `MobileHeader.astro`: The header for mobile devices, including the hamburger menu.
- `Navbar.astro`: The main navigation bar for desktop.
- `NewsItem.astro`: A single news item card.
- `NewsSection.astro`: A section displaying a list of news items.
- `ProductCarousel.astro`: A section displaying a grid of products.
- `SearchBar.astro`: A reusable search input component.
- `ServiceCarousel.astro`: A carousel to display services.
- `ServiceHighlight.astro`: A section to highlight specific services with stats.
- `StatItem.astro`: A single stat item used in `ServiceHighlight`.
- `VideoSection.astro`: A section to embed a YouTube video.

## Routes

The site's pages and routes are generated from `src/pages` and are based on the structure in `src/data/navLinks.ts`.

- `/`: `src/pages/index.astro` (Homepage)
- `/kontak`: `src/pages/kontak.astro`
- `/layanan`: `src/pages/layanan.astro`
- `/pintar`: `src/pages/pintar.astro`
- `/berita` & sub-routes: Handled by `src/pages/berita/index.astro` and `src/pages/berita/[...slug].astro`
- `/produk` & all sub-routes: Handled by `src/pages/produk/[...slug].astro`
- `/tentang` & all sub-routes: Handled by `src/pages/tentang/[...slug].astro`

A full list of routes generated from `navLinks.ts`:

- `/`
- `/tentang`
  - `/tentang/tentang-solar-nusantara`
    - `/tentang/tentang-solar-nusantara/kebijakan-k3l-dan-sosial`
    - `/tentang/tentang-solar-nusantara/kebijakan-larangan-penggunaan-obat-obatan-terlarang-dan-alkohol`
    - `/tentang/tentang-solar-nusantara/kebijakan-pencegahan-terjatuh`
  - `/tentang/sonushub`
  - `/tentang/visi-dan-misi`
  - `/tentang/nilai-sonusian`
  - `/tentang/tim-kita`
  - `/tentang/berkolaborasi-dengan`
    - `/tentang/kolaborasi/mitra-suplier`
    - `/tentang/kolaborasi/mitra-bisnis`
  - `/tentang/karir`
- `/layanan`
  - `/layanan/sistem-tenaga-surya-epc`
    - `/layanan/epc/segmen-ci`
    - `/layanan/epc/segmen-shs`
    - `/layanan/epc/sistem-pjuts`
  - `/layanan/manajemen-energi`
    - `/layanan/manajemen-energi/sistem-pemantauan-energi-ci`
    - `/layanan/manajemen-energi/sistem-otomasi-bangunan`
    - `/layanan/manajemen-energi/sistem-manajemen-armada`
    - `/layanan/manajemen-energi/sistem-rumah-pintar`
    - `/layanan/manajemen-energi/carbon-capture-system`
- `/produk`
  - `/produk/sistem-panel-surya`
    - `/produk/sistem-panel-surya/panel-surya`
      - `/produk/sistem-panel-surya/panel-surya/panel-impor`
      - `/produk/sistem-panel-surya/panel-surya/panel-tkdn`
    - `/produk/sistem-panel-surya/inverter`
      - `/produk/sistem-panel-surya/inverter/on-grid`
      - `/produk/sistem-panel-surya/inverter/off-grid`
    - `/produk/sistem-panel-surya/sistem-pemasangan`
    - `/produk/sistem-panel-surya/sistem-pengkabelan`
    - `/produk/sistem-panel-surya/sistem-baterai`
  - `/produk/ekosistem-ev`
    - `/produk/ekosistem-ev/spkl`
  - `/produk/energi-biomassa`
    - `/produk/energi-biomassa/pelet-kayu`
    - `/produk/energi-biomassa/rdf`
    - `/produk/energi-biomassa/srf`
  - `/produk/seri-50100-fg`
- `/pintar`
- `/berita`
- `/kontak`

## 🛠️ Tech Stack

<p align="left">
  <a href="https://astro.build/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/astro-%232C2052.svg?style=for-the-badge&logo=astro&logoColor=white" alt="Astro"></a>
  <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://www.npmjs.com/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" alt="NPM"></a>
</p>

If you want to check, visit solar-nusantara.id
