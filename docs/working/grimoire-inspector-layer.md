# Inspector in front of the Grimoire

Date: 11 November 2026

**Implemented on the experiment branch.** The main menu has a **Keep Inspector in front of Grimoire** checkbox. The preference starts off and is saved in the browser. When enabled, the inspector and its adjacent launcher buttons sit in front of the book and table. The bottom toolbar stays accessible and stationery notices appear just above it. Editors and confirmations have priority over the inspector and toolbar.

## Verification

- [x] Toggle the setting with the book open. The App DOM check verifies the same spread and pose return from the menu and the preference survives an App remount.
- [x] Check the inspector, tabletop, toolbar, and dialogs in both layer orders. The CSS check verifies stacking order. The App DOM check verifies toolbar zoom, Escape, and dialog input blocking.
- [x] Run the production build, repository checks, and review package checks. The 30 book DOM scenarios and 12 integrated App scenario groups passed.
- [ ] Verify native overlap at desktop and narrow widths. Click inspector controls over the table, use Move and Reset, and open an editor.

The browser preview relay was unavailable. Native hit-testing remains pending.
