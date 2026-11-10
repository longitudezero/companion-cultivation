# Fixed bookmark positions — 10 November 2026

Status: implemented on `experiment/grimoire-tabletop`; automated checks pass; native visual review pending.

This supersedes automatic fanning, free horizontal marker placement, and the one-marker-per-printed-page restriction in the tabletop plan. Rotation and notes are unchanged.

- Twelve globally reserved locations: six top and six bottom, indexed from spine to outer edge on the right page.
- Each marker saves its spread, edge and position. While that spread is open it attaches to the right leaf. Once passed, it appears at the mirrored left-leaf position. No gaps collapse and no unrelated marker moves.
- Several markers can refer to one spread. Each location remains reserved even while its marker is on the left. Occupied drops are rejected with feedback; nothing is shuffled, swapped or overwritten.
- Placement snaps to the closest location on the right leaf. Temporary guides show available/reserved positions during dragging. The editor and keyboard provide equivalent placement routes.
- Preserve names, descriptions, styles and ownership in older saves. Convert old horizontal placements to distinct nearest available locations, deterministically, once. Normalize attachments to the right leaf of the same spread.
- Keep bottom orientation, slight stable tilts, hover/focus access and the existing opening animation.

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
