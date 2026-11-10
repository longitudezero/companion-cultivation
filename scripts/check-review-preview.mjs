// DOM boot/asset mapping validation of the deliverable, not a visual playtest.
import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const { JSDOM, VirtualConsole } = await import(process.env.GRIMOIRE_QA_JSDOM || 'jsdom');
const html = await readFile(process.argv[2] || 'dist/grimoire-review.html', 'utf8');
assert.ok(!/url\(["']?\/(?:grimoire|ui)\//.test(html), 'CSS assets must be embedded');
const errors = [], console = new VirtualConsole();
console.on('jsdomError', issue => errors.push(issue));
const dom = new JSDOM(html, { url: 'https://offline-review.test/', runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: console,
  beforeParse(window) {
    window.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} });
    window.ResizeObserver = class { observe() {} disconnect() {} };
  } });
try {
  const document = dom.window.document;
  const assetBase = document.querySelector('meta[name="companion-review-art"]').content;
  async function until(find) { for (let i = 0; i < 100; i++) { const result = find(); if (result) return result; await new Promise(resolve => setTimeout(resolve, 20)); } throw new Error(`Review did not boot: ${errors.map(issue => issue.message).join('; ')}`); }
  const launch = await until(() => document.querySelector('[aria-label="Open Cultivation Grimoire"]'));
  launch.click();
  await until(() => document.querySelector('.cg-tabletop .cg-book'));
  assert.ok(document.querySelector('[aria-label="Book view"]'));
  assert.equal(document.querySelector('.cg-tabletop').getAttribute('aria-modal'), 'false');
  assert.equal(dom.window.getComputedStyle(document.querySelector('.cg-tabletop')).pointerEvents, 'none');
  assert.equal(dom.window.getComputedStyle(document.querySelector('.cg-book')).pointerEvents, 'auto');
  assert.match(dom.window.getComputedStyle(document.querySelector('.cg-table-surface')).clipPath, /^polygon\(/);
  for (const element of document.querySelectorAll('img[src], image[href]')) {
    const path = element.getAttribute('src') || element.getAttribute('href');
    assert.ok(path.startsWith('data:image/') || assetBase !== 'embedded' && path.startsWith(assetBase), `unmapped image: ${path.slice(0, 100)}`);
  }
  const assets = dom.window.__COMPANION_REVIEW_ASSETS__;
  assert.ok(assets['ui/pin.webp']); assert.ok(assets['grimoire/stationery/forest-tassel.webp']); assert.ok(assets['grimoire/fonts/NotoSansRunic-Regular.ttf']);
  assert.deepEqual(errors.map(issue => issue.message), []);
  globalThis.console.log(`Review boots, opens the book, and maps all rendered image URLs through ${Object.keys(assets).length} ${assetBase === 'embedded' ? 'embedded' : 'linked'} assets. Source: ${document.querySelector('meta[name="companion-review-source"]').content}. Visual verification remains pending.`);
} finally { dom.window.close(); }
