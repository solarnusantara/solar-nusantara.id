import { defineConfig } from 'astro/config';
import UnoCSS from 'unocss/astro';
import sitemap from "@astrojs/sitemap";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: 'https://solar-nusantara.id', // Ganti dengan domain produksi Anda
  integrations: [
    UnoCSS({
      injectReset: true,
    }), 
    sitemap()
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      [rehypeKatex, {
        output: 'html'
      }]
    ],
  },
});
