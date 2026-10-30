// A single-file, offline review build of the real game. Production uses Vite.
import { build } from 'esbuild';
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const assetsRoot = join(root, 'public/grimoire');
const destination = resolve(process.argv[2] || join(root, 'dist/grimoire-review.html'));
const assets = {};
async function collect(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, item.name);
    if (item.isDirectory()) await collect(path);
    else if (/\.(webp|ttf)$/.test(path)) {
      const key = relative(assetsRoot, path).replaceAll('\\', '/');
      const mime = path.endsWith('.ttf') ? 'font/ttf' : 'image/webp';
      assets[key] = `data:${mime};base64,${(await readFile(path)).toString('base64')}`;
    }
  }
}
await collect(assetsRoot);

const result = await build({
  absWorkingDir: root,
  entryPoints: ['src/main.jsx'], outfile: 'review/game.js',
  bundle: true, minify: true, write: false, format: 'iife', target: 'es2022',
  define: { 'process.env.NODE_ENV': '"production"' },
  plugins: [{ name: 'offline-grimoire-artwork', setup(builder) {
    builder.onLoad({ filter: /[\\/]grimoire[\\/]art\.js$/ }, async ({ path }) => {
      const original = await readFile(path, 'utf8');
      return { contents: original.replace(/^export const art[^\n]+/m,
        `const embeddedArtwork = ${JSON.stringify(assets)};\nexport const art = name => embeddedArtwork[name + '.webp'];`), loader: 'js' };
    });
    builder.onResolve({ filter: /^\/grimoire\// }, ({ path }) => ({ path, external: true }));
  } }],
});
let css = result.outputFiles.find(file => file.path.endsWith('.css')).text;
css = css.replace(/@import\s+(?:url\([^)]*\)|["'][^"']*["'])[^;]*;/g, '');
css = css.replace(/url\((["']?)(\/grimoire\/[^)'"\s]+)\1\)/g, (_, quote, path) => {
  const data = assets[path.slice('/grimoire/'.length)];
  if (!data) throw new Error(`Missing offline asset: ${path}`);
  return `url("${data}")`;
});
const javascript = result.outputFiles.find(file => file.path.endsWith('.js')).text.replace(/<\/script/gi, '<\\/script');
const license = await readFile(join(assetsRoot, 'fonts/OFL.txt'), 'utf8');
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Companion Cultivation — Grimoire Review</title><style>${css}</style></head><body><div id="root"></div><script>${javascript}</script><script type="text/plain" id="runic-font-license">${license}</script></body></html>`;
await mkdir(dirname(destination), { recursive: true });
await writeFile(destination, html);
console.log(`Offline game review: ${destination} (${Math.round(Buffer.byteLength(html) / 1024 / 1024 * 10) / 10} MB)`);
