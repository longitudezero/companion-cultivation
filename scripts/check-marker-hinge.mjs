// Exercise the real stylesheet cascade, including the legacy resting rule.
// This checks CSS state/geometry contracts, not native animation rendering.
import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const { JSDOM } = await import(process.env.GRIMOIRE_QA_JSDOM || 'jsdom');
const css = (await Promise.all(['stationery.css', 'stationery-refinements.css', 'book-tabletop.css']
  .map(file => readFile(new URL(`../src/${file}`, import.meta.url), 'utf8')))).join('\n');
const dom = new JSDOM(`<style>${css}</style><div class="cg-tabletop"><div class="cg-personal-bookmark"><span class="cg-marker-orientation"><span class="cg-marker-hover-target"><span></span></span><span class="cg-marker-body"><button>Marker</button></span></span></div></div>`);
try {
  const { document, getComputedStyle } = dom.window, marker = document.querySelector('.cg-personal-bookmark');
  const body = marker.querySelector('.cg-marker-body'), target = marker.querySelector('.cg-marker-hover-target');
  for (const edge of ['top', 'bottom']) {
    const states = [];
    for (const phase of ['', 'is-open is-resting', 'is-open is-raised']) {
      marker.className = `cg-personal-bookmark edge-${edge} ${phase}`;
      const rootStyle = getComputedStyle(marker), style = getComputedStyle(body);
      states.push({ top: style.top, origin: style.transformOrigin, pivot: rootStyle.getPropertyValue('--marker-pivot'),
        offset: rootStyle.getPropertyValue('--marker-offset') });
      assert.ok(style.transform.startsWith('rotate('), `${edge}/${phase}: rotation transform is present`);
      assert.ok(!/translate|matrix/.test(style.transform), `${edge}/${phase}: no slide leaks from the legacy styles`);
      assert.equal(rootStyle.transform, 'none'); assert.equal(rootStyle.rotate, 'none');
      if (phase) assert.equal(rootStyle.translate, 'none', 'open markers never inherit the inactive hover lift');
      if (phase.includes('is-raised')) {
        const hover = getComputedStyle(target);
        assert.equal(hover.top, style.top); assert.equal(hover.transformOrigin, style.transformOrigin);
        assert.equal(hover.transform, style.transform, 'the stationary hit area uses the same raised hinge and angle');
      }
    }
    assert.deepEqual(states[1], states[0], `${edge}: opening must not rebase the offset or hinge`);
    assert.deepEqual(states[2], states[0], `${edge}: raising must not rebase the offset or hinge`);
    assert.equal(states[0].pivot.trim(), '-10px');
    console.log(`PASS ${edge}: inactive/resting/raised share an offset and hinge; transforms rotate only; hover target matches`);
  }
  // These existing rules must remain explicitly restricted to inactive markers.
  const rules = [...document.styleSheets[0].cssRules].filter(rule => rule.selectorText);
  const lift = rules.find(rule => rule.selectorText === '.cg-personal-bookmark:not(.is-open):is(:hover, :focus-within)');
  const bottomLift = rules.find(rule => rule.selectorText === '.cg-personal-bookmark.edge-bottom:not(.is-open):is(:hover, :focus-within)');
  assert.equal(lift.style.getPropertyValue('translate'), '0 -10px');
  assert.equal(bottomLift.style.getPropertyValue('translate'), '0 10px');
  console.log('PASS inactive hover/focus lift remains 10px outward on each edge, excluded from the current spread');
} finally { dom.window.close(); }
