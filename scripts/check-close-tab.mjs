// Optional placement QA: real CSS cascade plus the supplied artwork's alpha.
// Requires jsdom and Python/Pillow. This is not native browser visual review.
import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { BOOK_SIZE } from '../src/grimoire/book-view.js';
const { JSDOM } = await import(process.env.GRIMOIRE_QA_JSDOM || 'jsdom');
const css = (await Promise.all(['grimoire.css', 'stationery.css', 'stationery-refinements.css', 'book-tabletop.css']
  .map(file => readFile(new URL(`../src/${file}`, import.meta.url), 'utf8')))).join('\n');
const dom = new JSDOM(`<style>${css}</style><div class="cg-tabletop"><div class="cg-book"><article class="cg-page right"></article><button class="cg-close-tab"><span class="cg-close-glyph"><img class="cg-close-icon"></span></button></div></div>`);
try {
  const { document, getComputedStyle } = dom.window;
  const button = document.querySelector('button'), book = document.querySelector('.cg-book');
  const style = getComputedStyle(button), glyph = getComputedStyle(document.querySelector('.cg-close-glyph'));
  const icon = getComputedStyle(document.querySelector('.cg-close-icon'));
  function length(value, reference = 0) {
    const expression = value.replace(/var\((--[\w-]+)\)/g, (_, key) => String(length(style.getPropertyValue(key))))
      .replace(/calc\(/g, '(').replace(/([\d.]+)%/g, '($1*' + reference + '/100)').replace(/px/g, '');
    assert.match(expression, /^[\d.\s()+*/-]+$/);
    return Function(`return (${expression})`)();
  }
  const rules = [...document.styleSheets[0].cssRules].filter(rule => rule.selectorText);
  const leather = rules.filter(rule => rule.selectorText === '.cg-tabletop .cg-close-tab::before').at(-1).style;
  const hover = rules.filter(rule => rule.selectorText === '.cg-tabletop .cg-close-tab:is(:hover, :focus-visible)').at(-1).style;
  const geometry = { width: length(style.width), height: length(style.height), left: length(style.left, BOOK_SIZE.width), top: length(style.top),
    angle: parseFloat(style.rotate), leatherAngle: parseFloat(leather.rotate),
    glyphLeft: length(glyph.left), glyphTop: length(glyph.top), glyphWidth: length(glyph.width), glyphHeight: length(glyph.height),
    iconWidth: length(icon.width), iconHeight: length(icon.height), bookWidth: BOOK_SIZE.width, bookHeight: BOOK_SIZE.height };
  assert.ok(geometry.angle >= -20 && geometry.angle <= -15, 'gentle upward tilt');
  assert.equal(style.transformOrigin, '0 50%');
  assert.equal(leather.getPropertyValue('clip-path'), 'none', 'retain the complete V tip');
  assert.ok(Number(style.zIndex) < Number(getComputedStyle(document.querySelector('.cg-page')).zIndex), 'paper paints over the inner end');
  assert.equal(hover.rotate, style.rotate, 'hover preserves the tilt');
  for (const element of [glyph, icon]) assert.ok(!element.rotate || element.rotate === 'none', 'the X inherits the ribbon tilt');
  book.classList.add('has-personal-markers');
  assert.equal(getComputedStyle(button).left, style.left, 'bookmarks do not change Close placement');
  const result = execFileSync('python3', ['-c', String.raw`
import json,sys,math
from PIL import Image
g=json.load(sys.stdin)
art=Image.open(sys.argv[1]).convert('RGBA'); ink=Image.open(sys.argv[2]).convert('RGBA')
assert abs(g['width']/g['height']-art.height/art.width)<1e-8, 'ribbon aspect ratio changed'
# The source V is cut into the upper end. Its net direction must be outward/up.
net=math.radians(g['angle']+g['leatherAngle'])
assert math.sin(net)>0 and -math.cos(net)<0
alpha=art.getchannel('A')
def first_opaque(x): return next(y for y in range(art.height) if alpha.getpixel((x,y))>200)
assert first_opaque(art.width//2)>max(first_opaque(art.width//10),first_opaque(art.width*9//10))+50
c,s=math.cos(math.radians(g['angle'])),math.sin(math.radians(g['angle']))
def world(x,y,lift):
    y-=g['height']/2
    return g['left']+x*c-y*s+lift,g['top']+g['height']/2+x*s+y*c
scale=min(g['iconWidth']/ink.width,g['iconHeight']/ink.height)
gx=g['glyphLeft']+(g['glyphWidth']-ink.width*scale)/2
gy=g['glyphTop']+(g['glyphHeight']-ink.height*scale)/2
checked=0
for y in range(ink.height):
    for x in range(ink.width):
        if ink.getpixel((x,y))[3]<96: continue
        px,py=gx+(x+.5)*scale,gy+(y+.5)*scale
        # Invert the leather's centered 90-degree rotation into its original pixels.
        ax=int(py/g['height']*art.width); ay=int((1-px/g['width'])*art.height)
        assert 0<=ax<art.width and 0<=ay<art.height and alpha.getpixel((ax,ay))>200, 'X leaves opaque leather'
        for lift in [0,5]: assert world(px,py,lift)[0]>g['bookWidth']+4, 'page hides part of X'
        checked+=1
# An opaque sample of the rounded inner end remains inside the paper at rest/hover.
assert alpha.getpixel((art.width//2,int(art.height*(1-12/g['width']))))>200
for lift in [0,5]:
    x,y=world(12,g['height']/2,lift)
    assert x<g['bookWidth'] and 0<y<g['bookHeight'], 'inner end loses its page attachment'
print(f'PASS natural proportions, outward V, gentle shared tilt, paper layering and tucked attachment; {checked} X pixels stay on exposed opaque leather at rest/hover')
`, new URL('../public/grimoire/tabs/close.webp', import.meta.url).pathname,
    new URL('../public/grimoire/icons/close.webp', import.meta.url).pathname], { input: JSON.stringify(geometry), encoding: 'utf8' });
  console.log(result.trim());
} finally { dom.window.close(); }
