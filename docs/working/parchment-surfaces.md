# Shared aged parchment

The supplied `parchment.css` and `parchment-panels-demo.html` provide the material reference for `src/parchment.css`: warm paper, irregular corner stains, shaded edges and repeating 160px fractal grain. The supplied files remain unchanged.

The material is painted as background layers rather than pseudo-element overlays. Grain uses multiply blending at the demo's combined opacity (.70 × .32), while the stain layers retain fixed pixel dimensions anchored to each panel's bounds. This keeps text and controls above the finish without changing stacking, positioning, clipping or pointer behavior. Existing frames, page gutters, botanical borders, corner ornaments, shadows and layouts remain in their component styles.

| Paper surface | Theme selector |
| --- | --- |
| Garden Inspector | `.garden-inspector` |
| Task selector and viewer | `.guild-taskboard .taskboard-list`, `.guild-taskboard .task-detail` |
| Task completion receipt and confirmations | `.task-complete-receipt`, `.task-confirm` |
| Shop trade/details panel | `.shop-trade` |
| Inventory and field-detail tooltip paper | `.inventory-tooltip-body` |
| Grimoire pages and animated leaf faces | `.cg-overlay .cg-page`, `.cg-overlay .cg-turn-face` |
| Grimoire effect glossary | `.cg-overlay .cg-glossary` |

Tooltip bodies use 65% stain strength for their denser text. Nested translucent cards continue to show the parent paper through their existing selection and hover tints. Dark forest panels, the painted Taskboard header, garden scenery, controls and source illustrations retain their own materials. New paper surfaces can opt in with `.aged-parchment`; `--parchment-wear` adjusts edge staining when needed.

Standalone confirmations explicitly use dark parchment ink; otherwise those dialogs inherit the main game's light forest-panel text instead of the Taskboard's dark text.
