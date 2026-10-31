# Garden interface redesign

Date: 30 October 2026  
Status: **WORKING · first layout and interface refinements implemented 31 October 2026.** The refinement section below supersedes conflicting first-pass presentation choices. A tilted garden view remains a possible future upgrade.

## Purpose and reference

Redesign the ordinary garden interface around the user's supplied mockup, **Botanical Garden Simulation Interface(2).png**, and the decisions recorded in the following discussion. The mockup establishes the visual direction; the written decisions here take precedence over its labels, controls, quantities, and example species.

Use the same material language as the implemented Cultivation Grimoire: dark green panels, aged gold, botanical decoration, illustrated organisms, and parchment for readable information. Keep the garden the main working surface. **The first layout pass keeps the existing top-down view.** A shallow tilted view remains a possible later upgrade. This document does not change cultivation, yields, inventory ownership, or discovery mechanics.

## Agreed layout and visual direction

| Area | Decision |
| --- | --- |
| Garden | Large central playfield. Reclaim the mockup's left Garden Tools column for the garden. |
| Inventory | Illustrated inventory on the right, with readable quantities and item identities. |
| Inspector | Parchment panel across the bottom, showing essential information first and allowing detailed Influence information to expand. |
| Portrait | Keep the selected organism's illustration; put its name below the image. Remove the descriptive paragraph from this area. Keep useful family and health/status information compact. |
| Staging controls | Place Apply, Undo, and Cancel at the lower-left of the garden, replacing the mockup's Drag to explore panel. |
| Decoration | Concentrate gold ornaments at major panel boundaries and corners. Use quieter internal dividers so selection and important activity remain prominent. |

The prominent selected-hex outline and the relationship between garden, inventory, and inspector are retained from the mockup. Exact dimensions, typography sizes, spacing, and ornament density are to be tuned in the first visual review.

## Agreed interaction changes

- Remove the separate ordinary-player **Inspect**, **Sow Seeds**, and **Sow Spores** tool buttons. The user considers the inventory/garden interactions sufficient.
- Dragging a Seed or Spore stack onto a suitable hex remains the primary planting interaction. The item identity determines which kind of planting is requested.
- Preserve the existing quantity selector, unspent reservations, movable staged markers, atomic Apply, delayed concealed germination, and ability to stage another plan immediately.
- Remove the permanent **Harvest** button from the ordinary inspector. Dragging a living Plant or Fungus into the inventory remains the primary harvest interaction.
- Harvest still consumes the organism once and collects its actual products together. This redesign does not add separate Leaf and Seed harvest actions or free relocation of living organisms.
- Remove the persistent **Drag to explore** tutorial panel. Its location is used for real staging controls.
- **Apply** retains its existing meaning: revalidate and commit the current proposed plantings together.
- **Undo** reverses the most recent uncommitted staging action, including a placement, move, quantity edit, or other staging edit. It restores the previous proposed plan and corresponding reservations.
- **Cancel** clears the whole current uncommitted staging phase and releases all its reservations. A new plan can begin immediately. It does not cancel or refund previously applied pending germinations, reverse a harvest, or rewind the live garden.

These changes remove mode buttons, not the underlying actions. The [spatial inventory and staging rules](../design/systems/spatial-inventory-and-staging.md) describe non-drag alternatives. **The user's later clarification defers keyboard pickup controls and their dedicated design pass.** The next refinement must not add keyboard pickup buttons or depend on the portrait as a pickup control.

## Bottom inspector

The compact inspector should make the selected organism's current situation easy to read:

- Portrait and name, with compact identity/status information.
- Current harvestable output: Leaves and Seeds for Plants, Spores for Fungi, and actual special products where applicable.
- Lifecycle percentage and harvest timing, as defined below.
- Current resolved Moisture, Temperature, and Illumination, with readable named levels.
- Relevant health or activity feedback.

Detailed **Influence Breakdown** belongs in an expandable area. The expanded view should explain the contributions to the resolved state using real reaching influences. It must follow the existing discovery rules for species-specific responses and avoid exposing developer-only calculations or unseen recipes.

The descriptive paragraph below the portrait is removed. Longer reference material remains available through the Grimoire.

### Lifecycle and harvest peaks — explicitly agreed

The Plant lifecycle retains its existing **0–200%** domain: Growth is 0–100%, followed by Ripening from 100–200%. **125% is a valid lifecycle value.** It is not an age-overrun warning, lifespan modifier, or percentage that should be capped at 100.

- Show a progress bar and the current numeric lifecycle percentage.
- The bar fill is proportional to the full domain: `bar fill = lifecycle percentage / 2`. For example, 125% fills 62.5% of the bar.
- Use harvest landmarks rather than a prominent tick at 100%. The user explicitly considers the Growth/Ripening boundary less useful than harvesting opportunities.
- Mark **Leaf harvest peaks with a leaf icon** and **Seed harvest peaks with a seed icon** at the corresponding species-specific lifecycle positions.
- Show a peak interval as a highlighted band when a species stays at its peak across a range, rather than inventing a single optimal instant.
- Respect species with several natural peaks. Do not replace their actual curves with a universal peak at 100% or a single generic marker.
- Keep current harvestable quantities visible alongside the timing guide. Markers are a guide to timing, not a promise that an organism has earned an ideal maximum regardless of its cultivation history.

The [Plant lifecycle framework](../design/systems/plant-lifecycle.md), family profiles, and [prospective influence/production rules](../design/systems/influences-and-responses.md) remain authoritative. Moving a marker or displaying a range must not change the underlying yield calculations, retroactively award production, or imply a second harvest.

**Explicitly agreed:** show harvest-peak markers immediately when a Plant first appears; no experimentation or harvest-history unlock is required. These markers are basic field information. Growing preferences, species-specific responses, and Transformation recipes retain their existing discovery rules. The timing guide must distinguish native species peaks from changes caused by timing/window influences; the proposed initial behavior is described below.

## Inventory readability — agreed direction

- Keep illustrated slots and clearly readable owned quantities.
- Provide item names on hover and keyboard focus; touch interaction needs access to the same information.
- Distinguish **Seeds, Spores, Leaves, and other items** through compact type badges or equivalent clear labeling. A species illustration alone does not identify the item class.
- Keep the selected item visually obvious.
- Capacity means occupied slots/stack identities versus available slots, not the sum of all individual Seeds, Spores, and Leaves.

The mockup's repeated mushroom/plant pictures and its 18 / 30 example do not change stacking or capacity. Preserve saved stack identities, arrangements, quantities, reservations, and no-loss harvest behavior. The current prototype's 200 slots and the separately agreed future 20-slot progression start are different implementation states; this UI pass must not silently shrink existing inventories.

## Existing decisions and implementation boundaries

| Subject | Authority and boundary |
| --- | --- |
| Planting, harvesting, inventory | Preserve [spatial inventory and staging](../design/systems/spatial-inventory-and-staging.md), including quantity choice, safe capacity checks, actual item identities, and non-drag alternatives. |
| Live time | Preserve the garden's running behavior. [Pause, 0.5×, 1×, and 2×](../design/systems/simulation-and-time.md) are now implemented in the refinement below; the mockup does not reopen their gameplay semantics. |
| Gold, tasks, store, capacity progression | These have [separate agreed designs and remaining work](task-organization.md). The mockup's currency and task examples are not implemented features or new balance values. |
| Discovery | Preserve the [per-garden Grimoire knowledge boundaries](../design/systems/cultivation-grimoire.md). An Unusual botanical activity treatment must not automatically expose an unseen Transformation's identity, requirements, or exact progress. |
| Grimoire | Keep the supplied launcher, working book, saved observations, and approved page navigation. This redesign concerns the surrounding garden interface. |
| Utility controls | Keep Save Game, Load Game, and access to developer tools available; unrestricted developer actions remain behind their toggle. |
| Artwork | The game already has the supplied 60 Plant and 13 Fungus illustrations. The new mockup is a composed reference, not automatically a collection of reusable frame, terrain, or in-world sprite assets. |

## Proposed implementation defaults — adjustable, not new approved mechanics

1. **First-pass scope — layout first agreed:** reorganize and restyle the features that currently work using existing supplied artwork. A separate art pass can add illustrated terrain and in-world sprites. Leave task/Gold/store runtime and inventory-capacity migration to their progression work. Include placement space for the already approved time controls, but implement their behavior as a separate explicit step rather than drawing inactive controls that look functional.
2. **Selection and alternatives:** clicking a hex inspects it without a mode. Selecting an inventory stack and then a hex preserves the existing non-drag planting route. Portrait activation will open the corresponding Grimoire entry. Keyboard pickup controls are deferred to a dedicated later input-design pass.
3. **Staging feedback:** show Apply, Undo, Cancel, and the staged count when a plan has changes. Keep pending germination distinct from the new, uncommitted plan. Undo history is scoped to that plan; successful Apply or Cancel ends its history. Neither Undo nor Cancel reverses elapsed garden time, committed attempts, harvesting, or inventory ownership.
4. **Responsive layout:** let the desktop inventory and expanded inspector scroll within their own regions. On narrow screens, use an inventory drawer and an expandable bottom inspector; retain garden interaction and access to the same information.
5. **Garden movement:** fit the current plot by default. If panning is needed, start it from empty ground without stealing item, organism, or staged-marker drags. Pan/zoom is not a new mechanic implied by the removed tutorial label.
6. **Filters and arrangements:** category filters change the view of the same saved stacks. All preserves the manual arrangement; filtering must not create duplicate stacks, move saved slots, or alter capacity and reservations.
7. **Peak calculations:** begin with the canonical species curves and explicit timing/window effects that the interface is allowed to reveal. Preserve multiple peaks, plateaus, sterility, and special products. Identify native timing when it is only a reference; do not claim to predict a guaranteed future harvest under changing conditions or accrued production history.
8. **Other selections:** show contextual details for empty hexes, Fungi, temporary Source items, staged proposals, and pending germination. Use actual Spore production for Fungi rather than displaying Plant Leaf/Seed landmarks. Preserve Source placement/movement/pickup and staged Fungus heading controls.

## Pre-implementation decisions — resolved 30 October 2026

| ID | User decision |
| --- | --- |
| UI-01 | **Layout first**, using existing artwork. |
| UI-02 | **Undo the last staging action**, and add a separate **Cancel** button that clears the entire current staging phase. |
| UI-03 | **Show harvest-peak markers immediately.** |

## Optional tilted garden view — discussion only

The user supplied **Fantasy Terrain Hex Tiles(1).png** and asked about a slight angled view. This is a feasibility question, not approval to change the first implementation's camera or adopt the supplied image as finished terrain assets.

A shallow angled presentation is feasible with the existing SVG garden renderer. Apply one consistent projection to hex top surfaces, centers, selection outlines, influence paths, and edge controls. Keep logical hex coordinates, neighbours, propagation, and simulation unchanged. Upright organism art and readable labels can use separately positioned layers, with appropriate front-to-back drawing order and matching pointer/drop targets.

The supplied reference shows individual raised terrain blocks. Their top faces need consistent geometry and anchors to meet in a grid; irregular silhouette edges, large side faces, separate cast shadows, and tall vegetation can otherwise create seams or obscure neighbours. A continuous soil surface with restrained exposed sides around the garden's perimeter is a candidate to test. Do not promise that simply repeating the complete three-block reference image will produce a seamless map.

User decision, 31 October 2026: **keep the current top-down view for this layout pass; leave tilt as a possible later upgrade.** A future comparison can test a small flat and shallow-tilt tile cluster before committing to new art or renderer changes. Tilt strength, terrain treatment, and overlap remain open visual choices.

## Review checks for the first implementation

- The left tool column and permanent ordinary sowing/harvest buttons are gone; planting, inspection, and harvesting still work through the agreed interactions.
- Apply, Undo, and Cancel occupy the former Drag to explore area. Undo restores the last staging action; Cancel clears the current phase; both keep reservations correct and preserve committed attempts.
- The bottom portrait has its name underneath and no descriptive paragraph; useful information fits the compact inspector and expanded details remain reachable.
- Lifecycle shows 0–200% with the numeric current value and genuine Leaf/Seed peak markers or bands, available immediately. There is no prominent 100% landmark.
- Inventory type, quantity, selection, capacity, and staged availability are readable; rearranging/filtering does not alter ownership or lose products.
- Colored framing supports readable information and a prominent selected hex at desktop and narrow widths.
- Concealed germination, hidden recipes, saved knowledge, existing saves, Source items, and developer separation retain their actual current semantics.
- Review the integrated screen in the browser before declaring the visual work complete. This design document alone is not an implementation or a playtest pass.

## First layout implementation — 31 October 2026 (historical first pass)

The first pass expands the top-down garden, moves the illustrated inventory to the right and the compact parchment inspector below, and uses existing supplied artwork. Ordinary mode buttons and the permanent Harvest button are removed. The portrait provides a non-drag pickup, and Space on an organism hex supports keyboard pickup; the inventory then receives the harvest. Apply, Undo and Cancel are separate controls in the lower-left board rail.

Undo stores only earlier uncommitted plans, revalidates them against current occupancy/stock, and preserves the live garden, inventory, discoveries and pending attempts. A compass drag forms one Undo step. History resets after Apply, Cancel, loading or replacing a garden; it is transient and not part of the save schema.

The lifecycle guide derives its points, plateaus, multiple peaks, sterility and trophy timing from the canonical species/production schedule. Markers are available immediately and account for currently reaching timing effects, while current harvest quantities still come from actual earned output. Inventory filters retain real saved slot identities. Narrow screens use a toggleable inventory drawer and a stacked inspector. Advanced developer controls remain behind their toggle and an expandable field-notes panel.

New terrain artwork, tilt, task/Gold/store runtime, capacity progression and manual speed controls remain separate work. Existing clock, simulation, save schema and Grimoire navigation remain unchanged.

## Interface refinements — implemented 31 October 2026

**Status: implemented 31 October 2026, with automated validation and deployment browser review.** References are the supplied **Inventory Tooltip.png**, **notification location suggestion.png**, and **progress bar example.png**. The latest written decisions govern behavior; illustrative effect values and styling in the mockups are not replacements for canonical game data.

### Compact fixed sections and more information space

- Give the bottom portrait and Environment sections fixed, compact widths. Additional screen width primarily benefits **Influences & Observations**, with a comfortable minimum for Growth & Harvest.
- Implemented dimensions are a **160 px portrait column**, **128 × 128 px illustration**, **200 px Environment column**, **225 px Growth & Harvest column**, and **80 × 80 px inventory squares**. These are presentation dimensions, not new game mechanics. Sections can reflow at narrow widths while the illustration/card dimensions remain fixed.
- The portrait keeps the name below the image. Activating it opens the selected Plant or Fungus's own Grimoire entry directly; it no longer initiates harvesting or pickup.
- Remove the redundant Open Grimoire button from Influences & Observations. The main book launcher remains.
- Do not add keyboard pickup buttons or develop that pickup interaction in this pass. A dedicated keyboard/input design pass is deferred. Dragging organisms from the garden to the inventory retains its harvest meaning.

### Garden rail and transient notifications

- Put organism/Source/Blocker summary counts on the **same rail as Apply, Undo and Cancel**, rather than reserving another row.
- Remove the permanent general-purpose notice line, including the initial Select any hex to inspect message.
- Errors and action results still need visible feedback: show a small **temporary notice inside the garden viewport, near the bottom-left above Apply**, following the placement reference.
- The notice overlays the garden and reserves **no permanent layout height**. Anchor it to the viewport, so it does not travel with the soil when the camera pans or scale with zoom.
- Notices appear when relevant and disappear automatically. Ordinary notices remain for 3.5 seconds, and errors for 7 seconds; these durations can be tuned for message length. They should not intercept garden drags or button clicks. The durations remain presentation tuning.

### Germination and manual time controls

- Show **Germinating… centered inside the progress bar**, staying centered in the whole track as the fill advances. Do not place that label in a separate caption.
- Remove Result in approximately… and The outcome is still concealed from ordinary inspection.
- The bar represents the public waiting interval. Pending successes and failures must have the same appearance and progress behavior until the reveal; no outcome-dependent animation or art.
- Add working **Pause / 0.5× / 1× / 2×** controls inside the garden beside zoom and Fit, with a clear active state. This is now in scope for the refinement, using the already approved [whole-simulation speed rules](../design/systems/simulation-and-time.md). All elapsed-time systems, including germination, use the same chosen multiplier.

### Inventory hover information — supersedes the selection-overlay proposal

- Display a compact, **non-interactive hover card** almost immediately when the pointer enters an occupied inventory square.
- Moving between inventory squares updates the contents immediately. The player never has to move into the card or keep an interactive overlay open to read another item.
- Hide it when the pointer leaves the item or a drag starts. It must not capture pointer input or interfere with planting, harvesting, inventory movement, resizing or camera controls.
- The card has **no clickable item name, links, buttons, repeated illustration, Owned row, or Hover item for details instruction**.
- Keep the full item name, item class/family, a short useful description, and relevant known effects or placement requirements. Different classes get appropriate information; do not invent an Effects list for an item that has none.
- Derive numeric effects from real data and respect discovery rules. In particular, remove vague unsupported Transformation claims. A Fungus's known base profile is available, while undiscovered Plant responses and recipe details remain concealed.
- A proposed initial card width is **320 px**, positioned beside the slot or inventory panel and clamped inside the viewport. A very short initial delay, around 50 ms, can be tuned; switching between items should feel immediate and should not wait for a closing animation.

### Resizable inventory and fixed-scale garden camera

- Resize the inventory by dragging its **left boundary**, trading space with the garden. Increasing width adds columns; it does not enlarge inventory squares or alter saved slot identities/capacity.
- Garden hexes have a stable pixel size at the selected zoom. Resizing the window or inventory changes how much of the garden is visible, not the scale of the hexes.
- Support wheel/pinch zoom and a small minus/plus/Fit control group. Fit is an explicit zoom action, not something that runs again on every window resize.
- Primary-button dragging on empty garden space pans. Primary dragging on an organism, Source item or staged marker retains the corresponding object interaction.
- **Middle mouse / wheel-button dragging (M3) pans from anywhere**, including occupied hexes, so a full or zoomed-in garden remains navigable. This takes precedence over object pickup/harvest and does not change the contents of a hex.
- Keep the existing top-down projection. Tilt remains a separate possible upgrade.

### Transformation clue

Restore an atmospheric **Unusual botanical activity…** cue when a real Transformation is underway. Preserve the existing discovery boundary: an unseen route's destination, exact requirements and exact progress are not automatically disclosed. The proposed presentation is an atmospheric cue for an unknown route, with more explicit progress available once that recipe is learned.

### Refinement review checks

- Portrait activation opens the correct species page; it does not enter pickup mode, and the redundant inspector book button is absent.
- Portrait, Environment and inventory-square sizes stay fixed as more information space or more inventory columns becomes available.
- Errors/results appear within the garden above the staging rail, disappear, do not reserve height, and remain screen-anchored during pan/zoom.
- Germinating… stays inside the bar, and opposite hidden outcomes render identically.
- Hovering quickly across several inventory slots replaces the card immediately; its contents cannot steal pointer input or expose undiscovered facts.
- Middle-drag pans across occupied and empty hexes without harvesting, planting, moving or selecting objects accidentally. Window/panel resizing preserves the chosen zoom and hex size.
- Pause and each multiplier affect all simulation clocks consistently; direct garden planning remains possible while paused.
- A genuine unknown Transformation can show its clue without revealing its target or an unlearned recipe.


## Inspector segments and garden HUD — 31 October 2026

The latest agreed order is **illustration/name → Environment → Growth & Harvest → Influences & Observations → Transformation**. Portrait remains 160 px with 128 × 128 px art; Environment is 200 px and Growth & Harvest is 225 px. Influences & Observations receives the remaining width. The 260 px Transformation segment exists only while a genuine Transformation is underway; its absent width returns to Influences & Observations. Sections wrap in the same reading order on narrower windows.

Replace the vertical Influence list and expandable scrolling breakdown with compact effect cards, using two rows and one to three columns according to available width. Small arrows page through additional effects. Cards show an effect, its short result and source; non-interactive hover/focus details supply full contributions or effect explanations. Fungal base effects remain public. Plant response cards require both an observed response and current matching contact. Unknown recipes remain concealed.

An unwitnessed route shows only **Unusual botanical activity…** and the supplied sprout ornament. A previously witnessed route may show its destination, progress and concise requirements, with fuller phase instructions on hover/focus. Learning one route does not reveal its siblings or unwitnessed compatible Fungus alternatives. Multi-stage routes retain their preparation and completion timings. The supplied sprout is rendered at 56 × 56 px from a transparent WebP export.

Pause/0.5×/1×/2× sit beside zoom and Fit in one viewport-anchored garden HUD. These controls bypass garden drag/zoom input. The elapsed clock and developer skips remain in the header. Remove the inspector's generic discovery sentence and the inventory's Seeds, Spores & field supplies caption; selected-item guidance remains at the bottom of inventory.


## Centered Transformation and inventory type colors — 31 October 2026

Center Environment, Growth & Harvest, Influences & Observations and Transformation headings within their own segments. Center the sprout and put the Becoming/destination line below it, followed by the existing progress bar and requirements. Remove the simple Hold … at 1× line from the compact requirements; full timing remains in the detailed known recipe, and phase-specific sequence instructions retain their meaning.

Adapt the supplied lightning-button markup into warm gold/amber arcs around the 56 px sprout. It is decorative, appears only in an ongoing Transformation segment, and is identical for known and unknown routes. CSS moves the strokes gently without flashing the segment or text. Reduced-motion users receive a static treatment. This does not change the garden clock or communicate hidden progress.

Inventory squares retain fixed 80 × 80 px dimensions, species names and artwork. Replace visible type badges with colored border/background accents: **Seeds yellow, Spores purple, Leaves green, Items sky blue** (including miscellaneous trophy/legacy Items). Match filter accents to these colors. Keep type names in full item labels and hover details. Quantities and stored-item remaining times move to a compact upper-right badge aligned over the frame's corner, inside the square's footprint. Empty squares remain neutral. Slot IDs, quantities, filtering, drags and hover behavior are unchanged.

The supplied Minimalist Botanical Inventory Frames sheet is an optional future art reference. This pass keeps the current frame shapes; no new raster frame assets are integrated.


## Lifecycle cleanup, portrait spacing and stronger color separation — 31 October 2026

Remove the Leaf/Seed legend and Current timing caption beneath the lifecycle bar. Preserve the 0–200% bar, actual peak markers, plateaus, and their hover/focus labels. This also reduces the inspector's vertical demand.

Reduce the fixed portrait column to **144 px**, center its unchanged **128 × 128 px** illustration, remove its internal side padding, and use an **8 px left inset** on the inspector. Return the reclaimed width to the information sections; Environment remains 200 px and Growth & Harvest remains 225 px.

Replace the circular Transformation treatment with loose, asymmetric gold wisps and small curls extending around the sprout, following the supplied effect illustration. Soft static tendrils and slowly traveling highlights retain a gentle magical feel; reduced motion keeps the static wisps. The effect still appears only during a genuine Transformation and does not reveal hidden state.

Use brighter, clearly separated card backgrounds as well as borders: honey yellow for Seeds, emerald green for Leaves, violet for Spores, and sky blue for Items. The colored gradient edges no longer converge on a shared forest-green base. Dark nameplates and corner badges retain readable text. Empty squares and all inventory behavior remain unchanged.
