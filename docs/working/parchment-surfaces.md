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

The Grimoire's binding-facing edges use 20% stain strength: the right edge of a left page and the left edge of a right page. Other edges, grain, paper color, and the original book-fold shading stay the same. Turning faces carry `data-page-side` so the same treatment follows the printed page in both turn directions. All other panels retain their original aging strength.

The Inspector retains its frame and outer shadow but drops the old 4px flat inset rim, allowing the aged paper to reach the inside edge of its border.

Family-opening spreads use `cg-family-opening`: their colored botanical border art is 65% opaque and blends into the paper with multiply. A second decorative layer reuses the transparent grain/stains, masked to the artwork's alpha and existing binding fade, above the art but below live text and controls. It follows the page during turns. Entry-page watermarks, specimen illustrations, the Index and other game surfaces retain their existing treatment. The original artwork files are unchanged.


## Interior botanical corners and Taskboard frame

Non-Grimoire parchment panels receive varied pairs of the new botanical corner images as background layers: Taskboard selector/viewer, Inspector, Shop trade panel, tooltip bodies, confirmations and task-completion receipts. The original WebPs are unchanged; full-canvas SVG wrappers fade them to 42%, and the existing grain/stains render above them with multiply blending. They stay anchored to the panel's inside bottom corners, including while text scrolls. Compact panels use smaller versions. The Grimoire is excluded from these selectors.

The Taskboard window has exactly three new atlas ornaments: top-left bellflowers, top-right mirrored ivy and bottom-left flowers. There is no outer bottom-right addition because the task viewer already supplies that corner. The existing GuildBackButton is moved to an independent top-right layer over the plain ivy ornament, preserving its actual DOM button, focus, glow, arrow movement and press animation. The atlas's pre-painted Back variants are not used. Task-completion receipts also get the existing four gold corner protectors around their botanical paper.
