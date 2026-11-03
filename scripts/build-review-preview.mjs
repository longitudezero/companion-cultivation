// A standalone review build of the real game. Production uses Vite.
// Optional --asset-base=https://.../ reuses published art without embedding it.
import { build } from 'esbuild';
import { readdir, readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
const assetsRoot = join(root, 'public');
const destination = resolve(process.argv[2] || join(root, 'dist/grimoire-review.html'));
const assetBase = process.argv.find(value => value.startsWith('--asset-base='))?.slice('--asset-base='.length);
if (assetBase && (!assetBase.startsWith('https://') || !assetBase.endsWith('/'))) throw new Error('Asset base must be an HTTPS URL ending in /.');
const assets = {};
async function collect(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, item.name);
    if (item.isDirectory()) await collect(path);
    else if (/\.(webp|png|jpe?g|svg|ttf|woff2?)$/.test(path)) {
      const key = relative(assetsRoot, path).replaceAll('\\', '/');
      const extension = path.split('.').pop();
      const mime = { webp: 'image/webp', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', svg: 'image/svg+xml',
        ttf: 'font/ttf', woff: 'font/woff', woff2: 'font/woff2' }[extension];
      assets[key] = assetBase ? new URL(key, assetBase).href : `data:${mime};base64,${(await readFile(path)).toString('base64')}`;
    }
  }
}
await collect(assetsRoot);

const result = await build({
  absWorkingDir: root,
  entryPoints: ['src/main.jsx'], outfile: 'review/game.js',
  bundle: true, minify: true, write: false, format: 'iife', target: 'es2022',
  define: { 'process.env.NODE_ENV': '"production"' },
  plugins: [{ name: 'offline-game-artwork', setup(builder) {
    builder.onLoad({ filter: /[\\/]src[\\/].*\.jsx?$/ }, async ({ path }) => {
      const original = await readFile(path, 'utf8');
      const contents = original.replace(/`\$\{import\.meta\.env\?\.BASE_URL\s*\|\|\s*['"]\/['"]\}([^`]+)`/g,
        (_, suffix) => `__reviewAsset(\`${suffix}\`)`);
      return { contents: contents === original ? original :
        `const __reviewAsset = path => { const asset = globalThis.__COMPANION_REVIEW_ASSETS__[path]; if (!asset) throw new Error('Missing review asset: ' + path); return asset; };\n${contents}`,
        loader: path.endsWith('.jsx') ? 'jsx' : 'js' };
    });
    builder.onResolve({ filter: /^\/(grimoire|ui)\// }, ({ path }) => ({ path, external: true }));
  } }],
});
let css = result.outputFiles.find(file => file.path.endsWith('.css')).text;
css = css.replace(/@import\s+(?:url\([^)]*\)|["'][^"']*["'])[^;]*;/g, '');
css = css.replace(/url\((["']?)(\/(?:grimoire|ui)\/[^)'"\s]+)\1\)/g, (_, quote, path) => {
  const data = assets[path.slice(1)];
  if (!data) throw new Error(`Missing offline asset: ${path}`);
  return `url("${data}")`;
});
const javascript = (`globalThis.__COMPANION_REVIEW_ASSETS__=${JSON.stringify(assets)};\n` + result.outputFiles.find(file => file.path.endsWith('.js')).text).replace(/<\/script/gi, '<\\/script');
const license = await readFile(join(assetsRoot, 'grimoire/fonts/OFL.txt'), 'utf8');
const commit = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
const dirty = execFileSync('git', ['status', '--porcelain', '--untracked-files=normal', '--', 'src', 'scripts'], { cwd: root, encoding: 'utf8' }).trim();
const source = `${commit}${dirty ? '-working-tree' : ''}`;
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="companion-review-source" content="${source}"><meta name="companion-review-art" content="${assetBase || 'embedded'}"><title>Companion Cultivation — Grimoire Review (${source})</title><style>${css}</style></head><body><div id="root"></div><script>${javascript}</script><script type="text/plain" id="runic-font-license">${license}</script></body></html>`;
await mkdir(dirname(destination), { recursive: true });
await writeFile(destination, html);
if ((await stat(destination)).size !== Buffer.byteLength(html)) throw new Error('Review file was not written completely.');
console.log(`Game review: ${destination} (${Math.round(Buffer.byteLength(html) / 1024 / 1024 * 10) / 10} MB; source ${source}; ${Object.keys(assets).length} ${assetBase ? 'linked' : 'embedded'} assets)`);
