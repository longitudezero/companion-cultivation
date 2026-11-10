// Stylesheet/alpha geometry QA. Does not replace native browser hit-testing.
import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
const { JSDOM } = await import(process.env.GRIMOIRE_QA_JSDOM || 'jsdom');
const css = (await Promise.all(['grimoire.css', 'stationery.css', 'stationery-refinements.css', 'book-tabletop.css']
  .map(file => readFile(new URL(`../src/${file}`, import.meta.url), 'utf8')))).join('\n');
const dom = new JSDOM(`<style>${css}</style><div class="cg-overlay cg-tabletop"><div class="cg-scene"><div class="cg-shell">
  <div class="cg-table-surface"></div><img class="cg-table-art"><div class="cg-book-stage"><div class="cg-book">
  <nav class="cg-tabs"><button class="cg-tab"></button></nav><div class="cg-note-layer"><div class="cg-loose-note"></div></div>
  <div class="cg-personal-bookmarks"><div class="cg-personal-bookmark"><div class="cg-marker-body"></div></div></div>
  </div></div><div class="cg-stationery-tools"><button class="cg-inkwell"></button></div></div></div>
  <div class="cg-view-controls"></div><div class="cg-stationery-backdrop"></div><div class="cg-glossary-backdrop"></div><div class="cg-note-confirm-backdrop"></div></div>`);
try {
  const root = dom.window.document.querySelector('.cg-tabletop');
  const style = selector => dom.window.getComputedStyle(dom.window.document.querySelector(selector));
  assert.equal(style('.cg-tabletop').pointerEvents, 'none');
  assert.equal(style('.cg-tabletop').backgroundColor, 'rgba(0, 0, 0, 0)');
  assert.equal(style('.cg-tabletop').position, 'fixed');
  for (const selector of ['.cg-scene', '.cg-shell', '.cg-table-art', '.cg-stationery-tools', '.cg-tabs', '.cg-note-layer', '.cg-personal-bookmarks'])
    assert.equal(style(selector).pointerEvents, 'none', `${selector} must not intercept empty space`);
  for (const selector of ['.cg-table-surface', '.cg-book', '.cg-tab', '.cg-loose-note', '.cg-marker-body', '.cg-inkwell', '.cg-view-controls', '.cg-stationery-backdrop', '.cg-glossary-backdrop', '.cg-note-confirm-backdrop'])
    assert.equal(style(selector).pointerEvents, 'auto', `${selector} retains input`);
  const z = Number(style('.cg-tabletop').zIndex);
  assert.ok(z > 12 && z < 20, 'table sits above the garden, beneath guide/planting/task/shop screens');
  assert.equal(style('.cg-view-controls').top, 'auto'); assert.ok(parseFloat(style('.cg-view-controls').bottom) > 0, 'book controls leave garden time controls at the top accessible');
  const clip = style('.cg-table-surface').clipPath;
  assert.match(clip, /^polygon\(/); assert.ok(['', 'none'].includes(style('.cg-table-art').clipPath), 'never crop the art/shadow to an input mask');
  root.classList.add('has-modal');
  assert.equal(style('.cg-tabletop').pointerEvents, 'auto'); assert.ok(Number(style('.cg-tabletop').zIndex) > 80);
  console.log('PASS CSS: surrounding containers pass input; wood/book/overhangs/tools retain input; modal backdrops and garden-screen layering remain active');
  console.log(execFileSync('python3', ['-c', String.raw`
import sys,json,re
from PIL import Image,ImageDraw
source=json.load(sys.stdin)
a=Image.open(sys.argv[1]).convert('RGBA').getchannel('A')
points=[tuple(float(n)*a.width/100 for n in re.findall(r'[\d.]+',pair)) for pair in source[8:-1].split(',')]
assert len(points)==85
hit=Image.new('1',a.size);ImageDraw.Draw(hit).polygon(points,fill=1)
opaque=covered=blocked=hits=0
for h,v in zip(hit.get_flattened_data(),a.get_flattened_data()):
 opaque+=v>=128;covered+=bool(h) and v>=128;blocked+=bool(h) and v<8;hits+=bool(h)
assert covered==opaque, 'visible wood allows input through'
assert blocked/hits<.007, 'input rim allowance is too broad'
for x,y in [(0,0),(a.width-1,0),(0,a.height-1),(a.width-1,a.height-1)]: assert not hit.getpixel((x,y))
print(f'PASS artwork silhouette covers all {opaque} opaque wood pixels; rim allowance occupies {blocked/hits:.3%} of its input area; all four transparent corners pass through')
`, new URL('../public/grimoire/stationery/cultivation-tabletop.webp', import.meta.url).pathname], { input: JSON.stringify(clip), encoding: 'utf8' }).trim());
} finally { dom.window.close(); }
