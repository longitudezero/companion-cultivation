# Play with the Grimoire open — design and verification

Date: 10 November 2026

Status: **Implemented on `experiment/grimoire-tabletop`; automated checks pass; native click-through/visual review pending**

The user approved keeping the book open beside a playable garden, without another mode toggle. This supersedes the garden-input blocking in the [shared table plan](grimoire-shared-table.md). The accepted rigid scene, view memory, Close ribbon, bookmark hinges/slots and note placement remain unchanged.

## Agreed behavior

- Exposed garden accepts normal clicks, planting, inventory dragging and camera controls while the book stays open.
- The table, book, tabs, markers, notes and view controls retain their interactions and prevent actions reaching covered garden. Transparent space around the table accepts garden input; empty rectangular scene containers must not intercept it.
- Wheel input belongs to the surface under the pointer: garden camera outside, tabletop zoom on wood/margins, scrolling inside printed text/atlas/editors.
- The book is nonmodal. Clicking/focusing the book activates its shortcuts; clicking/focusing the garden releases them. Tab can leave the book. Escape closes the active book, or handles the garden's held item/planting prompt when the garden is active.
- Note/marker editors, delete confirmation and glossary remain modal while open: their backdrop blocks the garden, focus stays in that dialog, and Escape closes only that dialog. The garden simulation keeps its existing behavior.
- Other garden dialogs/menus take precedence over the parked book. The book yields focus/shortcuts and remains in its remembered position beneath them.
- Main menu, Taskboard and Shop opening no longer dismiss the parked book. Their existing drag/held-item cleanup stays. Inspector links and Shop's return link can request a spread in the already-open book; repeated requests for the same species work after internal page navigation. New-garden/reset flows may still dismiss it.

## Verification checklist

Implementation/automated checks and native visual checks are separate. Do not mark native checks from a DOM simulation.

| ID | Change and required automated evidence | Done |
| --- | --- | --- |
| P1 | Make surrounding overlay/scene containers transparent to hit-testing. Enable input only on actual table silhouette, book/attached objects, tools and controls. Check real stylesheet cascade and a hit outline derived from the supplied artwork. | [x] |
| P2 | Remove the book-wide body-scroll lock and Tab trap. Scope page arrows and Escape to book focus/activity; preserve control/input shortcuts and normal garden Tab/Escape. Check focus/pointer handoffs and no simultaneous actions. | [x] |
| P3 | Keep editor/confirmation/glossary backdrops modal, with dialog-local Tab wrapping and temporary garden inertness. Check Escape returns to the book without also clearing garden state. | [x] |
| P4 | Keep garden inventory hover/drag, planting and camera interactions available. Give planting popovers and garden menus/dialogs precedence over the parked book; suspend book shortcuts behind them. Check integrated app behavior and independent scene poses. | [x] |
| P5 | Preserve rigid table gestures, note transfer/rotation/resize/tucks, twelve marker reservations/hinges and accepted Close action. Run relevant interaction/geometry checks and repository tests/build. | [x] |
| P6 | Update review instructions/checklists and the separate review build. Save only on the experiment branch; no merge or production deployment. | [x] |

## Native review still required

- [ ] On a large display, park the table to one side and plant, harvest, move inventory items, scroll inventory and pan/zoom exposed garden without closing the book.
- [ ] Try transparent table corners, wood, cover, overhanging notes, all marker edges and controls at several scene angles/zooms. Covered garden never receives an action; uncovered garden remains reachable. Check pointer capture while a drag crosses the table boundary.
- [ ] Alternate garden wheel/camera actions with table zoom and printed scrolling. Neither camera moves from the other's gesture.
- [ ] Tab between garden and book; page arrows act only in the book. Escape handles the active surface. Open a note/marker editor, confirmation and glossary: focus stays in that dialog and garden input is temporarily blocked.
- [ ] Open planting quantity, main menu, guide, Taskboard and Shop with the table parked. Their controls stay usable and Escape affects only the foreground UI. Returning to the garden leaves book spread/pose intact where the existing flow keeps it open.

## Evidence

- **P1:** `scripts/check-book-hit-area.mjs` verifies the actual stylesheet cascade: surrounding containers ignore pointer input; the book, wood, overhanging notes/markers, tools and controls accept it; editor backdrops retain full input. The 85-vertex outline is derived from source alpha scanlines with an outer rim allowance and simplification. Raster comparison covers every source pixel with alpha ≥128, while transparent allowance is under 0.7% of the hit area; all four transparent image corners are excluded. The art/shadow is not clipped. This checks geometry/CSS, not native event targeting.
- **P2/P3/P5:** `scripts/check-book-interactions.mjs` passes **30 DOM scenarios** including a backed-up garden. New cases cover Tab leaving the book, focus/pointer activation, garden Escape yielding, editor-local Tab wrapping, editor Escape not reaching garden handlers, suspension/restoration and repeated external spread requests. Earlier note, marker, selection, view-memory and page-turn checks still pass.
- **P3/P4:** `scripts/check-grimoire-garden.mjs` passes **8 integrated DOM scenario groups** using the real App: inventory hover/selection and garden Escape; inventory drag → quantity → stage → Apply; independent garden pan/zoom and table zoom; temporary workspace inertness for stationery; stationery → Shop → same book; Taskboard/Shop/main menu suspension and return; repeated inspector entry requests; organism drag to inventory for harvest. Simulation time is frozen; drag destinations, pointer capture, ResizeObserver and native dialog methods are supplied by the harness. Native overlap/drag hit-testing remains open.
- **P5:** Repository checks pass **367 Node tests and one CommonJS smoke test** with the GitHub Pages build. The earlier SSR assertion expecting a modal book was updated to the approved nonmodal behavior. Existing hinge/hover and accepted Close/source-alpha checks pass. No scene geometry, journal format, asset or dependency changed.
- **P6:** The updated compact review boots, opens the book and maps its artwork through 209 existing published assets. Its compiled CSS is checked for a nonmodal root that passes input, an interactive book and the table's polygon input surface. Instructions now include playing beside the book and foreground-dialog/focus checks. The final package records its experiment commit; this does not replace native verification.
- **Limit:** The managed preview relay is still unavailable (`sites-preview status`: no such file or directory). The native checklist above remains open. The experiment is ready for review in the separate package; it is not merged or deployed.
