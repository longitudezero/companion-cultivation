# Grimoire shared table — design and verification

Date: 10 November 2026

Status: **Implemented on `experiment/grimoire-tabletop`; automated checks pass; native visual review pending**

This follows the user's table mockup and approval. It supersedes the full-window wood backdrop and separate sliding/pinnable tray in the [earlier tabletop plan](grimoire-tabletop-plan.md). The accepted [bookmark hinges and twelve slots](bookmark-fixed-slots.md) and [Close ribbon](close-tab-reference.md) remain the baseline.

## Agreed experience

The clean supplied ornate table image supports a live book in its lower portion, with the marker tool and inkwell resting above it. These objects form one rigid arrangement. Dragging exposed table moves everything; the book's gold corners rotate everything around the table center; zoom scales everything together. Page contents, attached notes and bookmarks retain their book-local coordinates.

Outside the artwork the garden is visible, continues running as before, and cannot receive clicks or wheel input through the Grimoire. Outer table edges may crop off-screen. The former corner tray, its slide and pin are removed. View controls, notices and editing dialogs stay upright in screen space.

The browser remembers the shared scene's position, zoom and rotation. Existing saved book-only views migrate without moving the book on screen. Reset frames the book and stationery together, allowing the outer rim to crop. Fit book provides the closer reading view and preserves rotation. Resize/recovery keeps some real book cover reachable without requiring the entire table to fit.

## Implementation and verification checklist

An implementation check means the code is complete and its listed automated evidence passes. Native visual checks below are separate and must not be marked complete from DOM tests.

| ID | Implementation and automated verification | Done |
| --- | --- | --- |
| T1 | Use the existing clean transparent table WebP once, below the live book. Remove full-screen texture and separate tray. Verify rendered hierarchy and CSS background/overlay behavior. | [x] |
| T2 | Define fixed table size, book offset and tool placements. Apply one outer pan/zoom/rotation transform. Verify table-center rotation, inverse book-coordinate round trips and rigid distances at several poses. | [x] |
| T3 | Pan exposed wood with pointer capture; retain Move control and corner rotation. Note, marker, page and tool interactions must not pan the table. Verify drag/cancel and protected interactions in DOM QA. | [x] |
| T4 | Preserve remembered poses with a versioned migration from book-centered preferences. Verify migration, reopen, refresh, resize, unavailable storage, safe default framing and recovery. | [x] |
| T5 | Keep wheel scrolling in printed text, atlas and dialogs; zoom exposed table/margins. Verify upright controls/dialogs outside the transformed scene and blocked garden event propagation. | [x] |
| T6 | Preserve note drag across spine, authored overhang, rotation/resize, temporary tuck reset and deletion. Verify after combined scene transforms without changing saved page coordinates. | [x] |
| T7 | Preserve twelve reserved marker positions, left/right travel, fixed hinge and inactive hover lift; verify transformed tool drops on both edges and occupied-slot rejection. Preserve accepted Close geometry/action. | [x] |
| T8 | Run repository checks/build, focused interaction/geometry checks and review bundle boot. Update review instructions; keep the change on the experiment branch. | [x] |

## Native visual review

- [ ] At a normal laptop viewport, book sits on the lower wood and tools sit above it in clear wood; decorations remain visible. Table edges may crop. No duplicate flat book or tray appears.
- [ ] Pan, rotate from all four cover corners and zoom: table/book/tools stay rigid; shadows follow the objects; no full-screen texture or tint obscures the garden.
- [ ] Inspect accepted Close tab and all marker styles on both edges, including the 1.5-second dwell, hinge rotation, hover return and inactive lift. Raised markers may be partly outside the window. Check tool/marker click access where their artwork approaches.
- [ ] Repeat note editing, cross-page drag, deliberate half-overhang and page turning at rotated/enlarged poses. Turn away/back: temporary tape tuck resets; authored placement persists.
- [ ] Try Fit book, Reset, saved pose/reopen and narrow windows. Tools may leave the frame in a deliberate close reading view; Reset must recover the combined arrangement. Dialogs/controls stay readable and upright; garden input remains blocked.

## Evidence

- **T1–T3:** The table is 1792 × 1792 local units; paper remains 1120 × 794.4188 at offset (296, 552), matching the mockup's lower-book placement. Tool coordinates live in the same geometry module. DOM QA confirms one table image, a common transformed ancestor, protected tool dragging and disabled table gestures during dialogs. Actual stylesheet cascade checks confirm a transparent full-window input surface, no backdrop texture, fixed intrinsic placements and upright controls. Source WebP alpha is zero at the four corners and opaque under all four book corners and both tool centers. These are geometry/data checks, not a rendered screenshot.
- **T2/T4:** `tests/book-view.test.js` passes 13 cases: inverse coordinates; rigid distances/table-center pivot; pointer-anchored zoom; book-only v1 → shared-scene v2 pose migration; repeat restore; fit/reset framing; resize and recovery; transformed drops and overhang. View memory stays in browser preferences, separate from garden saves.
- **T3–T7:** `scripts/check-book-interactions.mjs` passes **26 DOM scenarios**, including the backed-up garden preservation check. Both top and bottom tool drops start at the tool's actual transformed table position at 92° rotation. Temporary tucks, author placement, note controls, slot reservations, page travel, turn copies, marker timers, Close and selection handling pass.
- **T7:** `scripts/check-marker-hinge.mjs` passes both-edge fixed-offset/fixed-pivot checks and inactive-only 10px hover lift. `scripts/check-close-tab.mjs` passes accepted tilt/proportions/layering/attachment and checks all 21,184 visible X pixels against exposed opaque leather. Neither accepted layout was retuned.
- **T8:** `GITHUB_PAGES=true npm run check` passes **367 Node tests and one CommonJS smoke test**, and builds the GitHub Pages bundle. The compact branch review boots, opens the Grimoire and maps all rendered image URLs through 209 existing published assets. No asset or dependency was added.
- **Limit:** `sites-preview status` reports `preview relay unavailable: No such file or directory`. Native browser rendering, hit-testing and animation appearance remain unchecked above. The review package supports that review; no production merge/deployment is part of this experiment.
