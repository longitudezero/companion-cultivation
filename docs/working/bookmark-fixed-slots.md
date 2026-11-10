# Fixed bookmark positions — 10 November 2026

Status: implemented on `experiment/grimoire-tabletop`; automated checks pass; native visual review pending.

This supersedes automatic fanning, free horizontal marker placement, and the one-marker-per-printed-page restriction in the tabletop plan. Rotation and notes are unchanged.

- Twelve globally reserved locations: six top and six bottom, indexed from spine to outer edge on the right page.
- Each marker saves its spread, edge and position. While that spread is open it attaches to the right leaf. Once passed, it appears at the mirrored left-leaf position. No gaps collapse and no unrelated marker moves.
- Several markers can refer to one spread. Each location remains reserved even while its marker is on the left. Occupied drops are rejected with feedback; nothing is shuffled, swapped or overwritten.
- Placement snaps to the closest location on the right leaf. Temporary guides show available/reserved positions during dragging. The editor and keyboard provide equivalent placement routes.
- Preserve names, descriptions, styles and ownership in older saves. Convert old horizontal placements to distinct nearest available locations, deterministically, once. Normalize attachments to the right leaf of the same spread.
- Keep bottom orientation, slight stable tilts, hover/focus access and the existing opening animation.

## Fixed hinge follow-up — 10 November

Agreed after the user's down/up screenshots: the current spread's markers rotate about a fixed hinge just above their normally protruding heads. Opening, the 1.5-second dwell, raising and hover return must not change their vertical offset or pivot. Other spreads' markers retain the small vertical hover/focus lift; that lift does not apply to the currently open spread. Bottom markers mirror the same geometry below the book. Rotation and drag placement of the book itself are unaffected.

Implemented; stylesheet-cascade and project checks pass. The previous CSS both moved the open marker's pivot to the page edge and allowed an older, more specific resting rule to apply a vertical translation. Both were corrected. The hinge stays 10 book units above the normal protruding head; the bottom geometry mirrors that point below the page. Resting, raising and hovering change only the angle on the open spread.

- [x] Current-spread resting/raised states share one offset and hinge for top and bottom markers.
- [x] The winning resting and raised transforms contain rotation only, including when legacy styles are loaded.
- [x] The stationary hover target matches the raised hinge/pose, so the marker can return without chasing a moving target.
- [x] Inactive markers retain their small vertical hover/focus lift; current markers do not inherit it.
- [x] Existing marker, note and view checks/build pass; native visual review remains explicitly separate.

Evidence: `scripts/check-marker-hinge.mjs` loads the actual stationery, refinement and tabletop styles together. It checks the computed winning transforms, offset/pivot invariance across inactive/resting/raised states on both edges, matching hover-target geometry, and the inactive-only 10px lift rules. All three groups pass. Before the correction the same resting-state inspection returned `translateY(var(--marker-reveal)) rotate(0deg)`. `GITHUB_PAGES=true npm run check` again passes 364 Node tests, the builds and one CommonJS smoke test. Native animation appearance still needs user/browser review; the preview relay remains unavailable.

## Verification checklist

- [x] Sparse positions preserve gaps before/after passing spreads and when adding/removing another marker.
- [x] Positions mirror around the spine (1 remains closest); turning copies use the same positions.
- [x] Twelve reservations remain unique globally, including markers currently on opposite stacks.
- [x] Several markers on the same spread survive editing, removal and save/reload independently.
- [x] Occupied drops fail atomically and identify the reserved location.
- [x] Legacy migration preserves all valid markers and their authored metadata; repeat loading is stable.
- [x] Rotated/zoomed drops, temporary guides, editor and keyboard select matching slots.
- [x] Existing note/view/data tests and production build pass.
- [ ] Native visual review checks all twelve hit targets, labels, guides and page-turn motion. Leave this unchecked without browser evidence.

## Evidence

`GITHUB_PAGES=true npm run check` passes **364 Node tests**, the frontend/CommonJS builds and **one CommonJS smoke test**. Six new `tests/bookmark-slots.test.js` cases cover twelve markers on one spread, globally reserved occupied locations, sparse mirrored positions across every spread, deterministic V3-to-V4 migration, atomic moves and transformed drops for all six positions on both edges. Earlier tests asserting automatic fanning, left-leaf placement and destination swaps were updated to the new agreed rules.

The optional `scripts/check-book-interactions.mjs` run passes **23 DOM interaction scenarios**, including a backed-up garden. New checks exercise temporary guides with an occupied left-stack reservation, rejection without changing data, two markers on the open spread, editor placement and keyboard edge/position changes. Existing rotation, view memory, notes, selection gestures and turning-face checks pass.

Marker identity (`slot`) stays stable for editing; `edge` plus `position` (0–5 internally) identifies its unique global reservation. Position guides show 1–6 only while dragging. Positions remain reserved regardless of the displayed stack. Legacy journals normalize to version 4, preserving each marker's spread and authored metadata and assigning distinct nearest available positions. Notes are unaffected.

Reservation feedback is anchored to the window rather than the retracting tray. The branch is not merged or deployed to production. `sites-preview status` still reports **preview relay unavailable**, so native hit testing, visual spacing and motion remain unverified; the final checkbox stays open. The separate review build can be regenerated with the commands in [the review instructions](grimoire-tabletop-review.md).
