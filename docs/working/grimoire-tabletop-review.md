# Grimoire tabletop branch review

Date: 3 November 2026

Branch: `experiment/grimoire-tabletop`. The live `main` game has not been replaced.

**Launcher follow-up, 10 November:** [Toggle and last spread](grimoire-toggle-memory.md) adds launcher closing and remembered reading position. The icon now opens/closes the book; reopening resumes its last spread and table pose. Ribbon/Escape closing use the same memory. Refresh restores it; missing/obsolete preferences fall back to Ingredients, with session memory when storage is blocked. Inspector links still request their species, and Shop links open/focus the book. Checks pass 367 Node tests, one CommonJS smoke test, 30 book DOM scenarios and 11 integrated App groups. Native confirmation remains pending.

**Latest 10 November update:** [Play with the Grimoire open](grimoire-garden-input.md) makes the parked book nonmodal. Exposed garden supports inventory, planting, harvesting and camera input. Wood/book/attachments keep their own interactions. Page arrows and Escape follow book activity/focus; Tab may leave it. Editors, glossary and confirmations still temporarily block garden input. Main menu, Taskboard and Shop suspend the parked book and return to it without resetting its spread/pose. Repeated inspector links navigate the already-open book. Automated evidence: 367 Node tests, one CommonJS smoke test, 30 book DOM scenarios, 8 integrated App scenario groups, artwork hit-area/CSS checks and accepted hinge/Close checks. Native click-through/visual review remains pending.

**Earlier shared-table checkpoint:** The [shared-table checklist](grimoire-shared-table.md) replaced the full-screen wood and separate corner tray. The supplied transparent ornate table, lower-positioned book and tools above it pan, rotate and zoom together. Gold book corners rotate the entire scene around the table center. Existing view preferences migrate without shifting the paper. The user confirmed this arrangement works well. The new input follow-up supersedes its earlier garden-click blocking.

**Earlier 10 November checkpoint:** [Fixed bookmark slots](bookmark-fixed-slots.md) replaced free marker positioning and automatic fanning. Drag onto one of six top or six bottom positions on the **right leaf**. Guides appear during dragging; a reserved position stays occupied even while its marker is on the left. Several positions may mark one spread. Passing a spread mirrors its markers without closing any gaps. The editor exposes position selection; marker arrow keys move one slot at a time, with up/down choosing the edge. Occupied positions reject the move. That checkpoint passed 364 Node tests, one CommonJS smoke test and 23 optional DOM scenarios; the shared-table result above is current.

The [design checklist](grimoire-tabletop-plan.md) distinguishes verified state/data behavior from the browser checks that remain open. The experimental code is implemented. Its visual result still needs review because the workspace's browser preview service is unavailable.

## Use the review copy

1. Unzip the review package and open `grimoire-tabletop-review.html` in a browser. The delivered compact copy needs an internet connection for the existing published artwork; its application code is built from this branch. The source commit is recorded in the page title and `companion-review-source` metadata.
2. In this separate copy, use the main menu's **Load Game** action to load `tabletop-review.ccsave`. It is a synthetic review garden with all stationery styles, twelve placed markers, three notes and extra Gold. It does not add a starter kit or reward to the actual game.
3. Open the Grimoire and click the **Start here** marker to open the Beanstalk spread with notes. Some other markers deliberately use page numbers as their fallback names.
   Use **Reset view** to frame the new table arrangement if a previous close reading pose was remembered.
4. Try the controls below, then use the focused visual checks. Save any screenshots/recordings with the viewport size and source commit.

The review file uses its own browser origin/storage, separate from the live game's garden. Where file-based browser storage is unavailable, the controls still work but view memory may be limited by that browser.

## Controls

| Action | Control |
| --- | --- |
| Zoom | Wheel over tabletop/book margins, or −/+ in Book view |
| Read long content | Scroll inside printed text, an atlas or a dialog |
| Pan | Drag exposed tabletop, or drag the Move control (✥) |
| Pan with keyboard | Focus Move and use arrow keys |
| Rotate | Drag an exposed gold cover corner, or use ↶/↷; the entire arrangement rotates around the table center; focused corners also accept left/right arrows |
| Fit | Fit book retains the current rotation and centers/fits the cover |
| Reset | Reset view frames the book and stationery together, upright; outer table rim may crop |
| View toolbar | Fixed at the bottom center, leaving garden time/zoom controls at the top accessible |
| Remember | Closing/reopening and refresh restore position, zoom and rotation in the same browser |
| Book icon | Click to open or close; reopening resumes the last spread. Inspector links still open the requested species |
| Play beside the book | Click or drag exposed garden normally; its camera has independent pan/zoom |
| Keyboard focus | Click/focus the book for page arrows and book Escape; click/focus garden to release them; Tab may leave the book |
| Editors | Note/marker editors, glossary and confirmations temporarily block the garden and retain focus |
| Stationery | Tools rest above the book on the main table; there is no separate sliding/pinnable tray |
| Move a note | Drag its tape; cross the spine to transfer between visible pages |
| Temporarily clear text | Click the tape to tuck/restore; leaving the spread resets the tuck |
| Author a note's placement | Drag, rotate or resize; deliberate half-edge placement stays saved |
| Place/move a marker | Drag the tool from the table or drag an existing marker; drop near the book's own top/bottom to choose the edge |
| Read/edit a marked page | Other-page marker opens it; current-page marker opens its name/description/style editor; hover/focus brings a raised current marker onto the paper |

## Focused visual checks still needed

**Hinge correction:** Current-spread markers now retain their normal protruding height and rotate around a hinge just above the head. Check that they do not slide down into the text on opening or hover return. Other spreads' markers keep the small outward hover lift. Verify both edges; the stylesheet cascade checks pass, but the animation still needs native visual review.

- **Solid scene and garden:** table, book and tools form one rigid arrangement while panning, zooming and rotating. Turning pages and tucking notes do not move that arrangement. Park it to the side: plant, harvest, use inventory and pan/zoom exposed garden. Transparent corners pass input; visible wood/book/attachments retain it. Inspect after several table angles/zooms. Camera gestures must affect only their own surface.
- **Close:** follow [the latest reference](close-tab-reference.md): a slight upward tilt, outward-facing V tip, and rounded inner end beneath the paper. The X tilts with the ribbon and remains entirely on exposed leather. Check chapter changes, hovering, zoom/rotation and independent clicking.
- **Markers:** review all twelve styles, both rows, names/fallback numbers, overlapping heads and the full resting → raised → hovered sequence. The visible attachment stays on the page edge. Every neighbor retains a clickable part; no chopped artwork appears when lifted. Partly off-screen raised markers are intentional.
- **Tools on wood:** the marker and inkwell lie above the book, away from the rim decorations. Inspect their spacing and click access near raised markers. Drag a new marker onto each edge after rotating and zooming. Fit book may put tools outside the reading frame; Reset brings the useful arrangement back.
- **Notes:** tuck/return, deliberately half-over-edge placement, several notes on a page, transformed drag/resize/rotation and delete confirmation. Turn away/back and reopen. Authored placement persists while tape tucks reset.
- **Page turns:** inspect forward/back and long jumps at a rotated/enlarged pose. Turning notes and markers stay with the printed face; no duplicate/mirrored copy appears. Overhanging portions of turning notes can still be clipped by the sheet edge.
- **Small windows and access:** check typical laptop, small window and narrow/touch sizes; keyboard focus, dialog readability, reduced motion, and recovery with Fit/Reset/Move. Scroll printed content to its boundaries without zooming the scene.
- **Focus and foreground UI:** Tab can leave the book; arrows act only while it is active; Escape handles the active surface. Editors trap focus temporarily. Try quantity popovers, main menu, guide, Taskboard and Shop while the table is parked. Check native stacking/click access and return to the same book.
- **Launcher and memory:** navigate through pages/tabs/markers, close through icon/ribbon/Escape and reopen from the icon. Check the same spread/pose returns; repeat after refresh and while a long page jump is animating. Direct species links should override remembered position.

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

Set `GRIMOIRE_QA_SAVE` to a backed-up save file to include the additional view-only garden-preservation check. The harness reads it into memory without writing the file or touching the live game. The latest run passes 30 scenarios, including that check. `tests/book-view.test.js` supplies thirteen mathematical/data tests in the regular suite.

For integrated garden callbacks and actual CSS/source-alpha input geometry, also run:

```sh
GRIMOIRE_QA_JSDOM=/absolute/path/to/jsdom/lib/api.js node scripts/check-grimoire-garden.mjs
GRIMOIRE_QA_JSDOM=/absolute/path/to/jsdom/lib/api.js node scripts/check-book-hit-area.mjs
```

The integrated harness supplies drag destinations and native dialog/capture methods. These checks do not prove native click-through at rotated artwork boundaries; the native checklist remains separate.

Build the compact separate review and its synthetic save:

```sh
node scripts/build-review-preview.mjs dist/grimoire-review.html --asset-base=https://longitudezero.github.io/companion-cultivation/
node scripts/build-book-review-save.mjs dist/tabletop-review.ccsave
GRIMOIRE_QA_JSDOM=/absolute/path/to/jsdom/lib/api.js node scripts/check-review-preview.mjs dist/grimoire-review.html
```

Omitting `--asset-base` embeds artwork for a larger offline build. The compact delivered copy maps 209 assets to the existing published art, while bundling this branch's application code and CSS. Its DOM boot check confirms application startup, Grimoire opening and image URL mapping; it does not check native rendering or network image/font loading.

No production deployment or merge is part of this review. Decide whether to merge, revise or discard after evaluating the effect.
