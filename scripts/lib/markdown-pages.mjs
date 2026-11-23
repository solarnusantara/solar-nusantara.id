/**
 * Astro integration: after the build, write a markdown twin (index.md) next to
 * every dist/**\/index.html, converted from the page's <main> only (header,
 * nav, footer and scripts are chrome an agent does not need).
 *
 * GitHub Pages cannot negotiate content, so these files are inert on their own.
 * workers/markdown-negotiation serves them when a client sends
 * `Accept: text/markdown`; browsers keep getting HTML.
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* htmlFiles(p);
    else if (name === 'index.html') yield p;
  }
}

function toMarkdown(html, td) {
  const main = /<main\b[^>]*>([\s\S]*)<\/main>/i.exec(html);
  if (!main) return null;
  const title = /<title>([\s\S]*?)<\/title>/i.exec(html)?.[1]?.trim();
  const body = td.turndown(main[1]).replace(/\n{3,}/g, '\n\n').trim();
  const abs = body.replace(/\]\(\/(?!\/)/g, '](https://solar-nusantara.id/');
  return (title ? `<!-- ${title.replace(/--/g, '-')} -->\n\n` : '') + abs + '\n';
}

export default function markdownPages() {
  return {
    name: 'markdown-pages',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const out = fileURLToPath(dir);
        const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
        td.use(gfm);
        td.remove(['script', 'style', 'noscript', 'svg', 'form', 'button']);
        let n = 0;
        for (const file of htmlFiles(out)) {
          const md = toMarkdown(readFileSync(file, 'utf8'), td);
          if (!md) continue; // redirect stubs have no <main>
          writeFileSync(file.replace(/index\.html$/, 'index.md'), md);
          n++;
        }
        console.log(`[markdown-pages] wrote ${n} index.md files`);
      },
    },
  };
}
