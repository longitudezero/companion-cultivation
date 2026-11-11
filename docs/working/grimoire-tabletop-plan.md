# Grimoire tabletop experiment — design and verification plan

Date: 3 November 2026

Status: **Experiment implemented on branch; automated checks pass; browser visual review pending**

Branch: [`experiment/grimoire-tabletop`](https://github.com/longitudezero/companion-cultivation/tree/experiment/grimoire-tabletop)

Starting commit: `0b155712242ba41ccb390be49ca77bb5664d5879`

## Purpose

**Garden input follow-up, 10 November:** [Play with the Grimoire open](grimoire-garden-input.md) makes the parked book nonmodal. Exposed garden remains playable; shortcuts follow activity/focus; editors stay modal. It supersedes the full-window input blocking in earlier checkpoints.

**Shared table update, 10 November:** [The approved shared table plan](grimoire-shared-table.md) replaces the full-window wood backdrop and separate sliding/pinnable tray. The table, book and tools now move as one arrangement. Its checklist governs this follow-up; earlier tray evidence below is historical.

**Close ribbon update, 10 November:** [The new reference](close-tab-reference.md) supersedes E1's earlier inward/concealed V notch. The V now faces outward, with a slight upward tilt and the inner rounded end under the paper.

**10 November follow-up:** [Fixed bookmark positions](bookmark-fixed-slots.md) supersedes free marker positioning, automatic fanning, and one-marker-per-page restrictions in this record. It records the agreed twelve global reservations, spread ownership, migration and current verification results. Earlier dated evidence below remains a historical checkpoint.

Make the Grimoire feel like a solid, physical book resting on a table. The player can move their view and turn the book deliberately; pages and attached objects then behave consistently within that view. Accessories must never push the book around or cause automatic recentering.

This document records the agreed tabletop experiment **and the unfinished book fixes carried into it**. It supplements the [approved Grimoire design](../design/systems/cultivation-grimoire.md) and the [earlier integration plan](grimoire-implementation-plan.md). Its positioning and interaction decisions take precedence over conflicting details in the earlier integration plan for this branch. Existing knowledge, navigation, stationery ownership and game rules remain the baseline.

The user approved trying this on a GitHub branch and asked to restore the design-document workflow. The experiment is for review before any merge. Writing this plan does not mean the features below have been implemented or visually verified.

## Working agreement and progress rules

1. Read this plan before each implementation stage. Keep changes connected to the physical-book goal, rather than interpreting each placement instruction in isolation.
2. Discuss contradictory requirements or a change to the agreed experience before implementing that change. Routine code structure and tuning choices can proceed within the agreed scope.
3. Keep the numbered items below current while working. Record implementation and verification separately; a successful build is not evidence that artwork is correctly placed.
4. Mark an item `[x]` only when its required checks pass. If code is written but browser review remains, leave it unchecked and record **Implemented; visual verification pending**. Record failures or limitations plainly.
5. Attach evidence to the item's ID: focused test or command, observed result, relevant viewport/pose, and screenshot or recording for visual behavior. Screenshots must show the actual artwork, not only element boxes.
6. Reopen a completed item if a later change invalidates its evidence. Review the checklist before each implementation commit and at handoff.
7. Keep this work on the experiment branch. Review it separately from the live game; do not merge or publish it to production without the user's decision.

Status vocabulary: **Pending**, **In progress**, **Implemented; verification pending**, **Verified**, or **Blocked** with a reason. All implementation items start **Pending**. Existing features listed under regression checks are requirements to preserve, not newly completed work.

## Agreed behavior and implementation defaults

| Topic | Decision | Basis |
| --- | --- | --- |
| View controls | Wheel zoom, exposed-tabletop drag to pan, gold cover corners to rotate the book flat | Agreed in chat |
| Paper edges | Keep their page-turn behavior | Agreed in chat |
| Scrolling | Long printed content and the atlas retain their own scrolling | Agreed in chat |
| View persistence | Remember position, zoom and rotation when closing/reopening and after refresh | User's explicit preference |
| First opening | Centered, upright and fitted if there is no valid saved view | Agreed in chat |
| Window changes | Preserve the saved view as closely as possible; adjust only enough to keep the book reachable | Agreed in chat |
| Automatic movement | Page turns, notes, markers and the stationery tray never change the view | Agreed in chat |
| Main tabletop | Start with a simple temporary wood surface; choose final artwork after evaluating the interaction | Accepted prototype recommendation |
| Corner tray | Keep the supplied ornate table as a separate stationery tray, fixed at the window's upper-right corner | Existing agreed design |
| Raised markers | May extend partly beyond the window; their space does not determine the book's fit | User's explicit clarification |
| Tape-click tuck | Temporary; leaving the spread resets it | User's explicit clarification |
| Deliberate overhang | Keep saved notes placed partly beyond a page edge | User's explicit clarification |
| Rotation implementation | Flat, continuous rotation; no 3D camera tilt or new snapping behavior | First-pass implementation default |
| Zoom behavior | Keep the point under the pointer steady while zooming; use bounded, finite zoom values | First-pass implementation default |
| View storage | Browser UI preference, separate from garden data, following existing interface preferences | Technical default; portable save transfer of the view is outside this experiment |
| Fit Book | Fit and center the book while retaining its current flat rotation | First-pass control definition |
| Reset View | Return to an upright, centered fit and remember that new view | Agreed reset behavior |

Exact zoom bounds, surface color, shadows, marker angles and animation easing are prototype tuning values. Record the chosen values and any changes in the progress log. A tuning choice must still meet the checks below. Final tabletop artwork remains undecided; it is not a blocker for the experiment.

## Implementation checklist

### A. A stable book scene

- [ ] **A1 — Shared book coordinates.** Put the cover, page stack, spine, illustrations, printed text, chapter tabs, personal markers, loose notes, close tab and turning sheets in one book-local coordinate system. Apply view movement around that system. Measure intrinsic, untransformed page dimensions; do not treat a rotated screen bounding box as a page size.
  - **Verify:** At the fitted pose, zoomed out/in, and clockwise/counterclockwise rotation, illustrations, borders, text and attached objects retain their alignment. Moving the view does not change saved note or marker coordinates. Check a note and marker on each page, and inspect a turn halfway through its motion.

- [ ] **A2 — Stable fit and first opening.** Fit the physical book body and center it in the usable window on the first opening. Remove accessory-driven top padding, note docks or bottom-marker space from the centering calculation. Keep the same book pose when accessories appear, disappear, lift or tuck.
  - **Verify:** Compare the book's spine and four cover corners with zero markers, twelve markers, several notes and a tucked note. They stay in the same place. Opening the tray and changing chapters also leave them fixed. Raised markers may be partly off-screen without shrinking or lowering the book.

- [ ] **A3 — Tabletop and contact.** Add the temporary wood surface behind the book and a contact shadow that moves and rotates with the book. The surface remains still when the book rotates. It fills the scene without an abrupt backdrop edge inside the window.
  - **Verify:** Review fitted, panned, enlarged and rotated poses. The book reads as resting on the surface; the shadow has no rectangular cutoff, gap or detached edge. The corner stationery tray remains visually distinct. Preserve the garden's current running/paused behavior while the book is open.

### B. View controls and memory

- [ ] **B1 — Wheel zoom.** Zoom over exposed tabletop and book margins, anchored at the pointer. Preserve scrolling over long printed content, scrollbars, the atlas and dialogs. Consume scene gestures so the garden behind the book does not also zoom or receive input.
  - **Verify:** Zoom at all four book corners and near the spine. The pointed-at location stays steady. Scroll long text and an atlas to both ends without changing scene zoom, including when the scroll region has reached its boundary. Confirm the garden camera does not move.

- [ ] **B2 — Pan.** Drag exposed tabletop to move the book view. Panning must not start from text, links, notes, markers, controls or page-turn margins. Keep enough of the book reachable to recover the view.
  - **Control detail:** The explicit Move control also supports dragging and arrow keys, so panning remains available when enlarged paper fills the window. Other controls do not start a pan.
  - **Verify:** Drag in several directions at different zooms. The book follows without a jump and all attachments travel together. Selecting text and dragging stationery do not pan. A cancelled or interrupted gesture stops cleanly without applying an extra click.

- [ ] **B3 — Cover-corner rotation.** Drag a gold cover corner to rotate the book around a stable book center. Make the action discoverable through cursor/focus treatment. Keep paper-edge turning distinct from cover rotation. The fixed tray, view controls and editor dialogs stay upright.
  - **Verify:** Rotate from each available corner in both directions, including while zoomed and panned. The book does not translate unexpectedly, attached art stays aligned, and the next gesture starts smoothly. Clicking a paper edge turns a page rather than rotating. Merely clicking a cover corner does not turn a page or close the book.

- [ ] **B4 — Fit Book and Reset View.** Provide reachable, clearly labelled controls outside the transformed book. Fit Book centers/fits the current rotation. Reset View also makes it upright. Both become the newly remembered view, without changing authored notes or marker placements.
  - **Verify:** Use both controls from an enlarged, panned and rotated pose. Confirm their different rotation behavior. Compare journal data before/after; it is unchanged. Both remain accessible when much of the book is outside the window.

- [x] **B5 — Remember the view.** Save the user's final pan, zoom and rotation as a browser preference. Restore them on reopen and refresh. Missing, malformed, non-finite or unavailable storage falls back to a usable fitted view and must not prevent opening the book.
  - **Verify:** Move/zoom/rotate, close, reopen, refresh and reopen again. The pose persists. Test absent, corrupt and blocked storage. Saving the view does not modify garden discoveries, stationery, simulation state or portable garden save contents.

- [ ] **B6 — Window resize and recovery.** Restore the remembered pose as closely as possible at the current window size. Apply only the adjustment needed to keep the book reachable; do not refit every time an accessory or page changes. Record how the pose is represented relative to the viewport and the recovery rule.
  - **Verify:** Resize a large window smaller and larger with a panned/rotated book, then reopen after refresh at the smaller size. The book remains recoverable and controls stay reachable. Normal window changes do not erase the saved rotation or zoom without a documented recovery reason.

### C. Accurate gestures within the transformed book

- [ ] **C1 — One screen-to-book mapping.** Share an inverse view transform for pointer positions, gesture distances and drop tests. Use book-local positions for notes and markers and real page-local margins for turns. Axis-aligned screen rectangles alone are insufficient once the book rotates.
  - **Verify:** Automated coordinate round trips cover translation, different zooms, both rotation directions and near quarter-turns. Browser gestures grab the same visible tape/marker point without a jump. Dropping outside a rotated page's actual bounds is not accepted merely because it lies inside its screen bounding rectangle.

- [ ] **C2 — Input ownership.** Keep scene pan/zoom/rotation, note movement/rotation/resize, marker drag, page turn and text selection separate. Capture the active gesture and release it on completion, cancellation or closing. Keep the existing rule: only the selection drag suppresses its associated turn; a previously selected passage does not block a later deliberate page turn.
  - **Verify:** Perform each gesture next to another control. Select text, release, then deliberately turn. Use dropdowns, scrollbars, atlas links and note editors. Close or cancel mid-drag and reopen. No unintended turn, pan, edit, duplicate drop or garden action occurs.

### D. Stationery tray

- [ ] **D1 — Fixed sliding tray and quest pin.** Keep the supplied corner table anchored to the window's upper-right corner, mostly beyond its edge when collapsed. Hover/focus reveals it; leaving collapses it unless pinned. Replace the fleur handle with the pin artwork already used for quests, with a clear pinned state. Touch/click and keyboard users must have a reliable open/pin action.
  - **Verify:** Hover in, move between both tools, leave, pin, leave again, then unpin. There is no hover flicker or accidental collapse while using a tool. Pan/zoom/rotate the book and scroll printed content: the tray stays fixed. Verify pin artwork and state by screenshot and accessible name/state.

- [ ] **D2 — Tools sit on usable wood.** Make both tools large enough for the available tray space. Move the bookmark tool inward/down into empty wood so it does not sit on the raised floral rim or overlap the inkwell. Position by visible artwork, including transparent padding, rather than by image boxes alone.
  - **Verify:** Capture the expanded tray at desktop and small-window sizes. Both tool silhouettes sit on the tabletop interior and are separately clickable. Dragging the marker from the fixed tray into a rotated/zoomed book places its preview under the pointer.

### E. Close tab

- [ ] **E1 — Right-side, tucked attachment (updated 10 November).** Close belongs to the upper-right book edge, independent of the open spread. Follow [the new close-ribbon reference](close-tab-reference.md): the V tip faces outward, the whole tab tilts slightly upward, and the rounded inner end lies behind the paper. The X is centered on the exposed leather and tilts with it. Hover preserves that attachment.
  - **Verify:** Inspect the actual red ribbon and X, not just element boxes. The paper masks the rounded inner end; the V stays exposed; the X is completely visible on leather. Check early and late chapters, no markers and twelve markers, fitted/rotated/zoomed poses, hover and focus. Close remains independently clickable and clear of chapter-tab labels. The earlier hidden-notch orientation is superseded.

### F. Personal bookmarks

- [ ] **F1 — Physical page attachment and rotation.** Anchor the marker's visible attachment to the edge of its marked page. On opening that spread, the marker lies in front of the page for **1.5 seconds**, then swings diagonally out of the reading area around its attachment. Hover or keyboard focus brings it back onto the page; leaving returns it after a short grace period. Keep the attachment connected throughout. Avoid a flat 180-degree flip or an angle that covers neighboring marker heads.
  - **Verify:** Time the dwell with a controlled timer test and observe the full sequence in the browser. Capture resting, mid-motion, raised and hovered poses for both page sides and both edges. The marker never floats in the middle of the printed page, detaches, disappears/reappears or blocks every neighbor. Hover remains stable as the artwork moves. A raised marker may extend partly off-screen.

- [ ] **F2 — Full art, usable spacing, twelve markers.** Preserve six top and six bottom markers. Bottom artwork is upside down relative to the book. Retain complete image artwork; let paper naturally cover the tucked portion instead of clipping the image to its inactive reveal. Spread markers across available edge space with modest varied tilts and overlap, keeping a distinct reachable part of every marker. Hover lifts inactive top markers up and bottom markers down.
  - **Verify:** Populate all twelve, including several assigned to the same page-stack side, and click each marker individually. Hover/lift shows no chopped image boundary. Check the bottom row's orientation and both rows during rotation. Large current-page markers and invisible hover targets must not intercept neighboring clicks.

- [ ] **F3 — Names and writing areas.** Move labels closer to the page, into each marker's empty writing area below its ornament. Account for different artwork and transparent padding. Use legible ink for each style. Show the custom name, or the page number as the fallback name, with no separate duplicate number. Preserve optional description writing on the large current-page marker and its editor.
  - **Verify:** Review every owned style with a short name, a long name, a page-number fallback and a description. Labels stay within the visible writing surface, clear of decorative crowns/cords and page occlusion. They remain readable in resting, inactive, raised and bottom-row poses. Editing name/description/style persists after reload without disclosing hidden species names.

- [ ] **F4 — Page ownership and drag placement.** Keep each marker attached to its saved printed page. Move it between left/right page stacks as that page is passed, like chapter tabs. Dragging the tray icon or an existing marker toward the book's top selects Top; toward its bottom selects Bottom, measured in book coordinates even when rotated. Preserve the existing six-per-edge limits and occupied-page handling with clear feedback.
  - **Verify:** Mark page 23, navigate from around page 10 to page 55 and back, and observe its stack change and turning copy. Click it to return to the correct spread. Drop onto both sides and edges at rotated/zoomed poses, including just beyond the paper at a visible marker head. Test a full edge and a page that already has a marker; no data is lost or silently moved to an unintended edge.

### G. Notes

- [ ] **G1 — Saved home versus temporary tuck.** Separate a note's authored home from its tape-click tucked state. Clicking the tape moves it aside/below without overwriting home coordinates. Clicking again restores it. Leaving the spread, closing the book or refreshing clears temporary tucks. On returning, the note is at its saved home, with its text, paper, size, rotation and deliberate overhang intact. Treat old saved `tucked: true` notes as untucked on opening without losing their authored data. Remove automatic scrolling/recentering that follows a tucked note.
  - **Verify:** Put two notes on one page; tuck one. Turn away/back, close/reopen and refresh: it returns home and the second note is unchanged. Repeat with a deliberately half-over-edge, rotated/resized note and an older saved tucked note. Neither the book nor its view scrolls or recenters when tape is clicked. Exercise the editor's tuck action as well as the tape.

- [ ] **G2 — Placement, transfer, rotation and resizing.** Preserve multiple notes per page. Drag the tape to move a note or transfer it across the visible spread's spine. Rotate and resize with existing handles/controls, using book-local geometry. Allow deliberately half-over-edge placement and save it rather than sliding the note back fully onto the paper. Distinguish a tape click from a tape drag.
  - **Verify:** At several scene zooms and rotations, drag notes between left/right pages, across the spine and to each outer edge. Release, edit, turn away/back and reload: no jump or drift occurs. Resize and rotate around a stable note center; saved geometry matches what was visible. Keyboard movement/rotation/resize still works. Editing one of several notes does not overwrite another.

- [ ] **G3 — Editing, deletion and turning copies.** Preserve handwritten text, paper choices, the corner X and its confirmation dialog. Preserve notes on the turning page in the existing animation, aligned to that page within the transformed book. Prevent duplicate interactive/static notes, wrong-page copies and mirrored writing. Perfect rendering of portions overhanging a turning sheet is a polish goal, not a reason for a renderer overhaul; record any remaining clipping limitation.
  - **Verify:** Edit a long note, change paper, cancel deletion, then confirm deletion of only the intended note. Turn forward/back and make a long jump with notes on outgoing/incoming faces. Observe at a rotated/zoomed pose and in reduced motion. No note becomes detached from its printed page or appears twice. Record any overhang clipping explicitly.

### H. Accessibility, compatibility and review

- [ ] **H1 — Keyboard, touch and reduced motion.** Keep accessible names, focus visibility, focus restoration and dialog dismissal. Provide keyboard-operable view controls so corner dragging is not the only way to recover/adjust the view. Hover interactions have a focus/touch route. Reduced motion removes decorative movement without removing functions. Editor/glossary/delete dialogs stay upright and readable at any book pose.
  - **Verify:** Complete a keyboard pass through view controls, Close, chapter tabs, marker editing, note tools and dialogs. Escape dismisses the innermost dialog before the book. Check touch-sized controls in a small viewport. With reduced motion enabled, navigate, tuck/restore and reveal markers without unwanted animation; all destinations/actions remain available.

- [x] **H2 — Save and game regressions.** Preserve existing notes, paper/marker collections, all twelve marker assignments, names/descriptions, legacy note-position mapping and half-edge placements. View changes alone do not change a garden save. Do not introduce the deferred starter kit, new task rewards or shop balance changes. Existing page numbering, hidden knowledge rules, illustrations, glossary and navigation remain intact.
  - **Verify:** Load legacy and current journal fixtures, plus a backed-up real garden. Compare serialized garden data before/after view-only gestures; compare authored journal data after the allowed note/marker edits. Check unknown entries remain masked. Restore the original garden after live-fixture testing and verify the restore. Run the appropriate journal/save/navigation/knowledge tests and the full project check once the implementation settles.

- [ ] **H3 — Reviewable branch result.** Provide a playable review of this branch separately from production, with the branch commit identified, the checklist updated, and remaining issues stated. Do not use the production Pages workflow as a branch-preview shortcut: it publishes to the production destination even when manually invoked from another branch.
  - **Verify:** Confirm the review runs the intended branch commit, all artwork/fonts load, and the live `main` deployment has not been replaced. Review with the user before deciding whether to merge, revise or discard the experiment.

## Technical implementation map

These are code targets, not a requirement to keep the current file boundaries.

| Area | Current code | Intended work |
| --- | --- | --- |
| Scene and page input | `src/CultivationGrimoire.jsx`, `src/grimoire.css`, `src/stationery-refinements.css` | Stable scene wrapper, intrinsic page measurements, view controls, precise rotated-margin hit testing, accessory-independent centering |
| View math and storage | New focused book-view helper/component beside `src/grimoire/`; existing `src/ui/view-model.js` as a reference | Forward/inverse transforms, pointer-anchored zoom, pan/rotation, fit/reset, validated browser preference and resize recovery |
| Notes | `src/grimoire/GrimoireNotes.jsx`, `src/grimoire/Stationery.jsx`, `src/grimoire/stationery-model.js` | Shared coordinate mapping, temporary tuck state, removal of automatic follow-scroll, matching turning copies |
| Saved journal | `src/core/journal.js`, `src/core/journal-state.js` | Preserve authored data and legacy geometry; migrate/ignore old persisted tuck state safely if normalization changes |
| Markers | `src/grimoire/PageMarkers.jsx`, `src/grimoire/MarkerTool.jsx`, `src/grimoire/stationery-model.js` | Visible-art anchoring, stable rotation pivot, spacing/labels, transformed drag/drop and page-stack ownership |
| Fixed tray | `src/grimoire/StationeryTray.jsx`, `src/ui/GameArt.jsx`, stationery styles | Reuse the quest pin and move tool artwork into clear wood; retain viewport anchoring |
| Close ribbon | Grimoire JSX and styles; existing supplied ribbon/X artwork | Correct inward notch, concealed attachment, exposed X and independent right-side placement |
| Verification | Existing `tests/journal.test.js`, Grimoire/navigation/render/save tests; focused view-math and gesture checks | Meaningful geometry/persistence/input tests plus native browser visual/input review |

Use the existing DOM/CSS book and its page-turn system. There is no planned conversion to canvas, WebGL or a 3D book renderer. The principal refactor is the shared view transform and coordinate mapping. Keep fixed scene controls and dialogs outside that transform.

## Verification matrix

Run representative checks across these conditions; expand a failing area rather than repeating unrelated tests.

| Dimension | Required coverage |
| --- | --- |
| Window | Large desktop (about 1440×1000), typical laptop (about 1280×800), small window (about 1024×700), narrow/touch viewport (about 390×844); record exact tested sizes |
| Pose | Upright fitted; zoom below/above fit; positive and negative rotation; combined pan/zoom/rotation; near quarter-turn for geometry and control reachability |
| Content | Family overview/atlas, short entry, long scrolling entry, unidentified entry, glossary and stationery dialogs |
| Accessories | Empty book; several notes on one page; deliberate overhang; temporarily tucked note; all twelve markers; marked pages on both stacks; every marker art style |
| Travel | Single forward/back turn; short jump; capped long jump past marked pages; return to a tucked-note page; close during a gesture/turn |
| State | First open; reopened view; refresh; window resize; old/current saves; corrupt or unavailable view storage |
| Input | Mouse click/drag/wheel, text selection, keyboard/focus, touch alternative, reduced motion |

Automated tests establish transform math, bounds, navigation and data preservation. Native browser review establishes visible-art placement, overlap/clickability, hover stability and animation continuity. Both are needed where an item calls for both.

At each visual milestone, record the viewport, view pose and commit. Include a whole-book screenshot and relevant close-ups. For moving attachments, inspect a complete sequence or recording; a single final-state screenshot is insufficient. Preserve real user data when using fixtures and restore it after testing.

## Implementation order and review points

1. **Scene foundation:** A1–A3, B1–B6 and C1–C2. Validate all note/marker pointer mapping against the transformed book before tuning accessory positions.
2. **Physical attachments:** D1–D2, E1 and F1–F4. Review Close, the tray and the full twelve-marker layout visibly, including mid-animation poses.
3. **Note behavior:** G1–G3. Verify temporary tucks separately from saved half-edge placements, then inspect page-turn copies.
4. **Complete review:** H1–H3 and the cross-feature matrix. Deliver the separate branch review and update all evidence/limitations before a merge decision.

These are checkpoints within the authorized experiment, not automatic requests for permission at every step. Ask when a design conflict or a change of scope needs the user's input.

## Progress and evidence log

| Date | Item IDs | Status / evidence |
| --- | --- | --- |
| 3 November 2026 | Preparation | Branch created from `0b15571`. Existing Grimoire, gesture, journal, tray and deployment code inspected. Design/verification plan written. No implementation items verified yet. |
| 3 November 2026 | A1–A3, B1–B4, B6, C1–C2 | **Implemented; browser verification pending.** Shared intrinsic scene, inverse pointer mapping, saved view, resize recovery, pan/zoom/corner rotation and controls. Ten `tests/book-view.test.js` cases pass across the four planned viewport sizes and combined poses. DOM interactions confirm pointer ownership, selection-drag suppression, scrolling protection, gesture cancellation and Fit/Reset behavior. Actual browser geometry/appearance remains unverified. |
| 3 November 2026 | B5 | **Verified by automated state/interaction checks.** Book-view tests cover saved-pose round trips, resize and missing/malformed/non-finite/extreme preferences. `scripts/check-book-interactions.mjs` covers reopen, blocked storage and functioning fallback controls. The preference uses viewport fractions plus intrinsic zoom and flat rotation; it does not enter portable garden saves. |
| 3 November 2026 | D1–D2, E1, F1–F4 | **Implemented; visual verification pending.** Quest pin and larger viewport-fixed tray; tools moved onto the wood; Close uses a concealed inward-facing leather end and separate upright X; marker artwork uses its own alpha bounds/aspect ratio and a page-edge pivot. DOM checks cover pin/hover state, the exact 1500ms dwell/350ms leave grace, top/bottom drops, twelve markers and page 23 crossing stacks during travel between pages 9–10 and 55–56. Clickability and visual alignment need native review. |
| 3 November 2026 | G1–G3 | **Implemented; visual verification pending.** Tape/editor tucks are local per-spread state; old persisted tucks are ignored for presentation. Home geometry and deliberate overhang remain authored save data. Automatic follow-scroll is removed. DOM checks cover tuck/reset, editing action, transformed drag/resize/rotation, cancellation, deletion, multiple notes and turning-face copies. |
| 3 November 2026 | H1 | **Implemented; native input review pending.** View controls and corner rotation have keyboard routes; tray/actions have click routes; dialogs remain outside the transformed book; reduced-motion behavior is retained. DOM focus/timer checks pass. Native touch, focus visibility and reduced-motion appearance still require review. |
| 3 November 2026 | H2 | **Verified by automated regression checks.** `GITHUB_PAGES=true npm run check` passes 358 Node tests, the production build and one CommonJS smoke test. All 21 optional DOM interaction scenarios pass, including byte-equivalent serialized garden data for view-only controls using a backed-up garden. That backup was loaded only into the DOM harness; the live garden was never altered, so no live restore was necessary. Existing journal/save migration and hidden-knowledge tests pass. No core rules, task rewards or prices changed. |
| 3 November 2026 | H3 | **Review deliverable prepared; native browser review pending.** The standalone review builder now maps both Grimoire and interface assets and records its source commit. A linked-art review boots/opens the book in DOM QA and maps all rendered images through 209 existing assets. The synthetic review save includes twelve markers, three notes and all stationery styles. See [review instructions](grimoire-tabletop-review.md). Production was not deployed. |
| 3 November 2026 | Browser review blocker | Both `sites-preview start` and `sites-preview status` report that the preview daemon mailbox is unavailable. No native screenshots, animation recording, touch test or visual pass is claimed. All items requiring that evidence remain unchecked. |
| 3 November 2026 | Review handoff | Application source **`160f756df023964be8caf308a7e9d5d1508deef5`** is on the experiment branch. `Grimoire-Tabletop-Review.zip` contains the standalone HTML, synthetic save and instructions. Its exact-source DOM boot/image-mapping check passes; the three-file ZIP passes integrity validation. The separate review package is available in the chat. Later documentation-only progress updates do not change that application source. |

Append dated rows as work progresses. For each completed item, name the relevant test(s) and browser evidence. Keep unresolved issues beside the affected item IDs so they cannot disappear into a general “tests passed” statement.

### Chosen prototype values

- Intrinsic printed spread: **1120 × 794.4188** book units (560 per page); only the outer view scales/rotates.
- Zoom: **0.18–2.25** of intrinsic size. Fit caps at 1×, uses the cover bounds and leaves room for the fixed controls. Wheel zoom is pointer-anchored unless reachability recovery is needed.
- View storage: `companion-cultivation:book-view:v1`; center saved as viewport fractions, with zoom/rotation. Recovery brings a real point on the rotated cover into a reachable inset rather than relying only on its screen bounding box.
- Marker width: **128.8** intrinsic units, with each supplied asset's complete visible aspect ratio; reveal is at most 132. Active attachment is 8 units from the artwork head; swing is **±165°**, with the existing slight individual tilts. Bottom orientation adds 180° relative to the book.
- Marker dwell **1500ms**, swing **650ms**, hover-leave grace **350ms**. Reduced motion removes the swing/dwell animation while preserving access.
- Tray: **320–420px** on desktop and **280px** on narrow windows, retaining a 44–48px edge peek. Tool rectangles leave a gap; visible-rim clearance remains a required visual check.
- Close (updated 10 November after size feedback): natural **140 × 93.33** horizontal leather, **−18°** upward tilt of the whole tab, with its attachment 35 units inside the right paper edge. Its outward V is exposed; the **40 × 40** X tilts with the ribbon. Placement checks sample the actual artwork rather than only the target box. Native visual confirmation remains E1's open check.
- Existing turning faces still clip the portion of a note that extends beyond the paper. Perfect protrusion during a 3D turn is not implemented; stationary half-over-edge placement remains saved and visible. This is the optional G3 polish limitation, not a change to note ownership.

### Remaining verification

The unchecked items A1–A3, B1–B4, B6, C1–C2, D1–D2, E1, F1–F4, G1–G3 and H1/H3 require the native browser portion of their checks. In particular, **Close's visible notch/tuck, every marker's readable name and independent click target, hover stability, tray-rim clearance, and complete page-turn sequences have not received a visual pass**. Use the matrix above and record screenshots/recordings when the preview route is available. The separate review copy makes the branch available for user inspection in the meantime.

## Completion review

- [x] All mandatory A–H items are checked with evidence, or explicitly listed as unresolved for the user's review.
- [ ] The physical-book goal holds in combined interactions, not only isolated component tests.
- [x] Final chosen tuning values and any remaining turning-note overhang limitation are recorded.
- [x] The user has a separate playable branch review and can choose to merge, revise or discard it.

The main tabletop's final illustration and the deferred stationery starter-kit task reward are future decisions. No new starter kit is part of this branch.
