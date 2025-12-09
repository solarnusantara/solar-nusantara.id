import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://solar-nusantara.id', // Ganti dengan domain produksi Anda
  integrations: [tailwind(), sitemap()]
});
