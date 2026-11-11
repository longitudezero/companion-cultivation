# Grimoire icon toggle and last spread

Date: 10 November 2026

Status: **Implemented on `experiment/grimoire-tabletop`; automated checks pass; native review pending**

The user confirmed that playing beside the open book works well and requested two additions: clicking the launcher again closes the book, and reopening from that launcher returns to its last spread. This follows the accepted [nonmodal book](grimoire-garden-input.md) and shared table scene.

## Behavior and implementation

- The book launcher toggles open/closed. Its accessible label, tooltip and expanded state describe the current action/state. Closing through the launcher preserves the same reading position as the Close ribbon or book Escape.
- Opening from the launcher resumes the last spread. Keep the stable entry key in browser preferences, alongside the remembered table view, and in App state so the same-session behavior still works when storage is unavailable.
- A fresh browser or invalid/obsolete saved key opens the first Ingredients spread. Valid saved keys remain useful even when the species is undiscovered; existing knowledge filtering still applies.
- Record the navigation destination when a turn is requested. Closing during a turn or long jump resumes at that intended spread, without restoring a half-finished animation.
- Inspector links still open the requested species, including when the book is already open; that spread then becomes the remembered position. Shop's book link opens/focuses the book rather than toggling it closed.
- This preference does not change garden saves, notes, markers, view geometry, starter rewards or gameplay. Existing parked-book/editor input behavior remains the baseline.

## Verification checklist

- [x] Launcher opens, changes its accessible label/expanded state, closes on the next click and reopens at the same spread and table pose.
- [x] Close ribbon and active-book Escape also preserve the last spread; garden Escape still leaves the parked book open.
- [x] Page memory survives App remount/refresh. Missing/invalid saved keys fall back safely, and unavailable storage preserves same-session memory.
- [x] Inspector requests override remembered position and work repeatedly; Shop links open/focus rather than toggle. Closing during a long animated jump reopens at its destination.
- [x] Existing book/garden interaction checks and repository tests/build pass. Update the review copy and save on the experiment branch only.

## Native check

- [ ] Click the actual launcher while the book is parked, navigate through tabs/markers/page turns, close through each control and reopen. Check label/tooltips, focus, remembered page and unchanged table pose. Repeat after refresh and during a turn. Automated DOM checks are separate from this native review.

## Evidence

- `scripts/check-grimoire-garden.mjs` passes **11 integrated DOM scenario groups**. Three additions cover icon toggle/action labels/expanded state; reopening after icon, ribbon and Escape; preserved table pose and unchanged garden save; App remount; invalid saved keys; unavailable storage; and closing/reopening during an animated long jump. Existing inspector and Shop tests also pass, with explicit assertions that direct species links update reading memory.
- `scripts/check-book-interactions.mjs` passes **30 DOM scenarios**, including the backed-up garden preservation check. The new optional entry callback does not change standalone book interactions.
- `GITHUB_PAGES=true npm run check` passes **367 Node tests and one CommonJS smoke test**, including the production build. No asset, dependency or save format changed.
- The review build's DOM check opens the actual bundled app, advances a spread, toggles the launcher closed/open and verifies the same spread returns, then checks compiled input styles and 209 artwork mappings. Native visual/input review remains separate because the managed preview relay is unavailable.
