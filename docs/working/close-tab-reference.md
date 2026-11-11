# Close ribbon reference — 10 November 2026

Status: implemented on `experiment/grimoire-tabletop`; geometry/cascade and interaction checks pass; native visual review pending.

The user's `close tab.png` supersedes the earlier concealed-notch design. The ribbon has a slight upward tilt (about 18 degrees), its V-shaped end points out to the right, and the rounded inner end is inserted beneath the upper-right page edge. The reference shows the artwork over the paper only for clarity. In the game the paper occludes the inner end naturally, as with chapter tabs. The X sits within the exposed leather and tilts with it.

Use the supplied ribbon's natural proportions. Keep the close action and its attachment in book coordinates so pan/zoom/rotation carry it with the book. Keep page layering, focus and hover access. Do not move the personal bookmark slots or alter their hinge behavior.

## Verification

- [x] The supplied V/notch points outward after combining artwork orientation and tab tilt.
- [x] The rounded inner end intersects the paper while the X is wholly outside the page and within opaque leather.
- [x] The X and ribbon tilt together; the artwork retains its original aspect ratio.
- [x] Pages paint above the close ribbon; hover keeps it attached and the existing close action works.
- [x] Builds and relevant interaction checks pass. Record native visual verification separately.
- [ ] Native visual confirmation against the user's reference, including zoomed/rotated views and chapter-tab clearance.

## Evidence

`scripts/check-close-tab.mjs` loads the actual four stylesheets together and checks the winning placement, tilt, layering, glyph orientation and marker-independent position. Python/Pillow then samples the supplied, unmodified ribbon and X artwork: **21,184 opaque X pixels** remain on opaque leather outside the paper at both rest and the existing 5-unit hover extension. An opaque point on the rounded inner end stays under the paper in both poses. The source V shape and combined artwork/parent rotation point outward/upward, and the source aspect ratio is preserved.

Size follow-up: the user accepted the tilt and requested a slightly smaller ribbon, slightly farther left. The horizontal ribbon is now **140 × 93.33** book units (about 9% smaller), with the inner attachment **35** units inside the paper (5 farther left). Rotation stays **−18°**, with the same 5-unit top offset. The X scales proportionally to **40 × 40**, centered 80 units along the ribbon and clear of the V cutout. The same tab and glyph move with the book scene; no asset files or personal-marker slots/hinges changed.

`GITHUB_PAGES=true npm run check` passes 364 Node tests, the frontend/CommonJS builds and one CommonJS smoke test. The optional DOM interaction suite passes 24 scenarios, including invoking Close without writing garden data. A geometry/cascade pass is not a native screenshot or visual pass; that last check remains open.

After the size-only follow-up, the artwork-alpha/cascade placement check and GitHub Pages production build pass again. The X remains fully exposed on opaque leather and the inner end stays tucked at rest/hover. No interaction code changed, so the broader suites above were not repeated for this sizing adjustment.
