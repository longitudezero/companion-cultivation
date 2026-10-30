# Garden interface redesign

Date: 30 October 2026  
Status: **WORKING · agreed decisions recorded; implementation not started.** The open questions and proposed implementation defaults below are not additional approved gameplay rules.

## Purpose and reference

Redesign the ordinary garden interface around the user's supplied mockup, **Botanical Garden Simulation Interface(2).png**, and the decisions recorded in the following discussion. The mockup establishes the visual direction; the written decisions here take precedence over its labels, controls, quantities, and example species.

Use the same material language as the implemented Cultivation Grimoire: dark green panels, aged gold, botanical decoration, illustrated organisms, and parchment for readable information. Keep the garden the main working surface. This document does not change cultivation, yields, inventory ownership, or discovery mechanics.

## Agreed layout and visual direction

| Area | Decision |
| --- | --- |
| Garden | Large central playfield. Reclaim the mockup's left Garden Tools column for the garden. |
| Inventory | Illustrated inventory on the right, with readable quantities and item identities. |
| Inspector | Parchment panel across the bottom, showing essential information first and allowing detailed Influence information to expand. |
| Portrait | Keep the selected organism's illustration; put its name below the image. Remove the descriptive paragraph from this area. Keep useful family and health/status information compact. |
| Staging controls | Place Apply and Undo at the lower-left of the garden, replacing the mockup's Drag to explore panel. |
| Decoration | Concentrate gold ornaments at major panel boundaries and corners. Use quieter internal dividers so selection and important activity remain prominent. |

The prominent selected-hex outline and the relationship between garden, inventory, and inspector are retained from the mockup. Exact dimensions, typography sizes, spacing, and ornament density are to be tuned in the first visual review.

## Agreed interaction changes

- Remove the separate ordinary-player **Inspect**, **Sow Seeds**, and **Sow Spores** tool buttons. The user considers the inventory/garden interactions sufficient.
- Dragging a Seed or Spore stack onto a suitable hex remains the primary planting interaction. The item identity determines which kind of planting is requested.
- Preserve the existing quantity selector, unspent reservations, movable staged markers, atomic Apply, delayed concealed germination, and ability to stage another plan immediately.
- Remove the permanent **Harvest** button from the ordinary inspector. Dragging a living Plant or Fungus into the inventory remains the primary harvest interaction.
- Harvest still consumes the organism once and collects its actual products together. This redesign does not add separate Leaf and Seed harvest actions or free relocation of living organisms.
- Remove the persistent **Drag to explore** tutorial panel. Its location is used for real staging controls.
- Apply retains its existing meaning: revalidate and commit the current proposed plantings together. **The precise meaning of Undo is still open.**

These changes remove mode buttons, not the underlying actions. Existing [spatial inventory and staging rules](../design/systems/spatial-inventory-and-staging.md) also require non-drag placement and harvest alternatives. The proposed presentation is to use the same selectable hexes and inventory targets, without restoring permanent sowing or harvest buttons; the exact focus, pickup, destination, and cancellation feedback remains an implementation detail.

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

**Still open:** whether exact peak markers are basic information from the first encounter or must be learned through experimentation. The timing guide also needs to distinguish native species peaks from changes caused by timing/window influences; the proposed initial behavior is described below.

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
| Live time | Preserve the garden's running behavior. [Pause, 0.5×, 1×, and 2×](../design/systems/simulation-and-time.md) are already approved but not implemented; the mockup does not reopen their gameplay semantics. |
| Gold, tasks, store, capacity progression | These have [separate agreed designs and remaining work](task-organization.md). The mockup's currency and task examples are not implemented features or new balance values. |
| Discovery | Preserve the [per-garden Grimoire knowledge boundaries](../design/systems/cultivation-grimoire.md). An Unusual botanical activity treatment must not automatically expose an unseen Transformation's identity, requirements, or exact progress. |
| Grimoire | Keep the supplied launcher, working book, saved observations, and approved page navigation. This redesign concerns the surrounding garden interface. |
| Utility controls | Keep Save Game, Load Game, and access to developer tools available; unrestricted developer actions remain behind their toggle. |
| Artwork | The game already has the supplied 60 Plant and 13 Fungus illustrations. The new mockup is a composed reference, not automatically a collection of reusable frame, terrain, or in-world sprite assets. |

## Proposed implementation defaults — adjustable, not new approved mechanics

1. **First-pass scope:** reorganize and restyle the features that currently work. Leave task/Gold/store runtime and inventory-capacity migration to their progression work. Include placement space for the already approved time controls, but implement their behavior as a separate explicit step rather than drawing inactive controls that look functional.
2. **Selection and alternatives:** clicking a hex inspects it without a mode. Selecting an inventory stack and then a hex preserves the existing non-drag planting route. A keyboard/tap pickup-and-destination flow can provide the corresponding harvest alternative without a permanent Harvest button.
3. **Staging feedback:** show Apply, Undo, and the staged count when a plan has changes. Keep pending germination distinct from the new, uncommitted plan. Undo concerns uncommitted planting edits; it does not reverse elapsed garden time, committed attempts, harvesting, or inventory ownership.
4. **Responsive layout:** let the desktop inventory and expanded inspector scroll within their own regions. On narrow screens, use an inventory drawer and an expandable bottom inspector; retain garden interaction and access to the same information.
5. **Garden movement:** fit the current plot by default. If panning is needed, start it from empty ground without stealing item, organism, or staged-marker drags. Pan/zoom is not a new mechanic implied by the removed tutorial label.
6. **Filters and arrangements:** category filters change the view of the same saved stacks. All preserves the manual arrangement; filtering must not create duplicate stacks, move saved slots, or alter capacity and reservations.
7. **Peak calculations:** begin with the canonical species curves and explicit timing/window effects that the interface is allowed to reveal. Preserve multiple peaks, plateaus, sterility, and special products. Identify native timing when it is only a reference; do not claim to predict a guaranteed future harvest under changing conditions or accrued production history.
8. **Other selections:** show contextual details for empty hexes, Fungi, temporary Source items, staged proposals, and pending germination. Use actual Spore production for Fungi rather than displaying Plant Leaf/Seed landmarks. Preserve Source placement/movement/pickup and staged Fungus heading controls.

## Questions to resolve before implementation

| ID | Decision needed | Recommendation |
| --- | --- | --- |
| UI-01 | Should the first pass use the existing garden/organism artwork with the new layout and framing, or also replace the garden with illustrated terrain and in-world plants close to the mockup? | Establish the layout with existing supplied art first; create or source any additional terrain/frame/sprite assets in a deliberate art pass. |
| UI-02 | Does Undo reverse the most recent uncommitted planting edit, or clear the whole current planting plan? | Reverse the latest staging edit, including quantity or position changes. A future Clear plan action can have a separate name. |
| UI-03 | Are harvest-peak markers basic information on a Plant's first appearance, or learned through experimentation? | Show the timing markers from the first appearance; continue keeping unknown growing responses and Transformation recipes discovery-gated. |

## Review checks for the first implementation

- The left tool column and permanent ordinary sowing/harvest buttons are gone; planting, inspection, and harvesting still work through the agreed interactions.
- Apply and Undo occupy the former Drag to explore area, with the agreed Undo behavior and correct reservation handling.
- The bottom portrait has its name underneath and no descriptive paragraph; useful information fits the compact inspector and expanded details remain reachable.
- Lifecycle shows 0–200% with the numeric current value and genuine Leaf/Seed peak markers or bands, following the agreed visibility policy. There is no prominent 100% landmark.
- Inventory type, quantity, selection, capacity, and staged availability are readable; rearranging/filtering does not alter ownership or lose products.
- Colored framing supports readable information and a prominent selected hex at desktop and narrow widths.
- Concealed germination, hidden recipes, saved knowledge, existing saves, Source items, and developer separation retain their actual current semantics.
- Review the integrated screen in the browser before declaring the visual work complete. This design document alone is not an implementation or a playtest pass.
