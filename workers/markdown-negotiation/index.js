/**
 * Markdown for Agents on a GitHub Pages origin.
 *
 * Route: solar-nusantara.id/*  (the zone is proxied through Cloudflare).
 * Request with `Accept: text/markdown` -> serve the build-time index.md twin.
 * Everything else passes through untouched, with `Vary: Accept` so caches keep
 * the two representations apart.
 */
export default {
  async fetch(request) {
    if (request.method !== 'GET' && request.method !== 'HEAD') return fetch(request);

    const url = new URL(request.url);
    const wantsMarkdown = /(^|,)\s*text\/markdown\s*(;|,|$)/i.test(request.headers.get('Accept') || '');
    const isPage = url.pathname.endsWith('/') || !/\.[a-z0-9]+$/i.test(url.pathname);

    if (wantsMarkdown && isPage) {
      const dir = url.pathname.endsWith('/') ? url.pathname : url.pathname + '/';
      const mdRes = await fetch(new URL(dir + 'index.md', url), { headers: { Accept: '*/*' } });
      if (mdRes.ok) {
        const body = await mdRes.text();
        const h = new Headers({
          'Content-Type': 'text/markdown; charset=utf-8',
          Vary: 'Accept',
          'Cache-Control': 'public, max-age=600',
          'x-markdown-tokens': String(Math.ceil(body.length / 4)),
        });
        return new Response(request.method === 'HEAD' ? null : body, { headers: h });
      }
    }

    const res = await fetch(request);
    const out = new Response(res.body, res);
    out.headers.append('Vary', 'Accept');
    return out;
  },
};
