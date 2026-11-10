# Grimoire tabletop branch review

Date: 3 November 2026

Branch: `experiment/grimoire-tabletop`. The live `main` game has not been replaced.

**10 November update:** [Fixed bookmark slots](bookmark-fixed-slots.md) replace free marker positioning and automatic fanning. Drag onto one of six top or six bottom positions on the **right leaf**. Guides appear during dragging; a reserved position stays occupied even while its marker is on the left. Several positions may mark one spread. Passing a spread mirrors its markers without closing any gaps. The editor exposes position selection; marker arrow keys move one slot at a time, with up/down choosing the edge. Occupied positions reject the move. The latest checks pass 364 Node tests, one CommonJS smoke test and 23 optional DOM scenarios; native visual review remains pending.

The [design checklist](grimoire-tabletop-plan.md) distinguishes verified state/data behavior from the browser checks that remain open. The experimental code is implemented. Its visual result still needs review because the workspace's browser preview service is unavailable.

## Use the review copy

1. Unzip the review package and open `grimoire-tabletop-review.html` in a browser. The delivered compact copy needs an internet connection for the existing published artwork; its application code is built from this branch. The source commit is recorded in the page title and `companion-review-source` metadata.
2. In this separate copy, use the main menu's **Load Game** action to load `tabletop-review.ccsave`. It is a synthetic review garden with all stationery styles, twelve placed markers, three notes and extra Gold. It does not add a starter kit or reward to the actual game.
3. Open the Grimoire and click the **Start here** marker to open the Beanstalk spread with notes. Some other markers deliberately use page numbers as their fallback names.
4. Try the controls below, then use the focused visual checks. Save any screenshots/recordings with the viewport size and source commit.

The review file uses its own browser origin/storage, separate from the live game's garden. Where file-based browser storage is unavailable, the controls still work but view memory may be limited by that browser.

## Controls

| Action | Control |
| --- | --- |
| Zoom | Wheel over tabletop/book margins, or −/+ in Book view |
| Read long content | Scroll inside printed text, an atlas or a dialog |
| Pan | Drag exposed tabletop, or drag the Move control (✥) |
| Pan with keyboard | Focus Move and use arrow keys |
| Rotate | Drag an exposed gold cover corner, or use ↶/↷; focused corners also accept left/right arrows |
| Fit | Fit book retains the current rotation and centers/fits the cover |
| Reset | Reset view returns to an upright, centered fit |
| Remember | Closing/reopening and refresh restore position, zoom and rotation in the same browser |
| Open/pin stationery tray | Hover its edge pin, focus it or click; a pressed pin keeps it open |
| Move a note | Drag its tape; cross the spine to transfer between visible pages |
| Temporarily clear text | Click the tape to tuck/restore; leaving the spread resets the tuck |
| Author a note's placement | Drag, rotate or resize; deliberate half-edge placement stays saved |
| Place/move a marker | Drag from the tray or an existing marker; drop near the book's own top/bottom to choose the edge |
| Read/edit a marked page | Other-page marker opens it; current-page marker opens its name/description/style editor; hover/focus brings a raised current marker onto the paper |

## Focused visual checks still needed

- **Solid scene:** the spine/cover stays fixed while turning pages, tucking notes and revealing the tray. Repeat after deliberate pan/zoom/rotation. Printed content and illustrations stay aligned.
- **Close:** its attached end and inward-facing V notch are under the paper; only a small X-bearing end projects from the right. The X stays within that end. It remains above right-side chapter tabs after chapters change and is independently clickable.
- **Markers:** review all twelve styles, both rows, names/fallback numbers, overlapping heads and the full resting → raised → hovered sequence. The visible attachment stays on the page edge. Every neighbor retains a clickable part; no chopped artwork appears when lifted. Partly off-screen raised markers are intentional.
- **Tray:** tools appear larger, lie in clear wood and avoid the decorative rim; hover remains stable while moving between tools or dragging a marker out. Pin/unpin and leave the tray.
- **Notes:** tuck/return, deliberately half-over-edge placement, several notes on a page, transformed drag/resize/rotation and delete confirmation. Turn away/back and reopen. Authored placement persists while tape tucks reset.
- **Page turns:** inspect forward/back and long jumps at a rotated/enlarged pose. Turning notes and markers stay with the printed face; no duplicate/mirrored copy appears. Overhanging portions of turning notes can still be clipped by the sheet edge.
- **Small windows and access:** check typical laptop, small window and narrow/touch sizes; keyboard focus, dialog readability, reduced motion, and recovery with Fit/Reset/Move. Scroll printed content to its boundaries without zooming the scene.

These are open checks, not a claim that the visuals have passed.

## Reproduce the automated checks

Run the repository checks:

```sh
GITHUB_PAGES=true npm run check
```

The optional DOM checks use jsdom supplied by a QA environment; they do not add a production dependency or replace a browser review:

```sh
GRIMOIRE_QA_JSDOM=/absolute/path/to/jsdom/lib/api.js node scripts/check-book-interactions.mjs
```

Set `GRIMOIRE_QA_SAVE` to a backed-up save file to include the additional view-only garden-preservation check. The harness reads it into memory without writing the file or touching the live game. The recorded run passes 21 scenarios, including that check. `tests/book-view.test.js` adds ten mathematical/data tests to the regular suite.

Build the compact separate review and its synthetic save:

```sh
node scripts/build-review-preview.mjs dist/grimoire-review.html --asset-base=https://longitudezero.github.io/companion-cultivation/
node scripts/build-book-review-save.mjs dist/tabletop-review.ccsave
GRIMOIRE_QA_JSDOM=/absolute/path/to/jsdom/lib/api.js node scripts/check-review-preview.mjs dist/grimoire-review.html
```

Omitting `--asset-base` embeds artwork for a larger offline build. The compact delivered copy maps 209 assets to the existing published art, while bundling this branch's application code and CSS. Its DOM boot check confirms application startup, Grimoire opening and image URL mapping; it does not check native rendering or network image/font loading.

No production deployment or merge is part of this review. Decide whether to merge, revise or discard after evaluating the effect.
