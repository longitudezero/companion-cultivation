# Temporary player Source items — working design

> **COMPLETE · IMPLEMENTED AND PLAYER-TESTED** · 29 October 2026. The first-playable Source-item phase is merged into `main` ([PR #26](https://github.com/longitudezero/companion-cultivation/pull/26)) and deployed on GitHub Pages. The project owner confirmed that dragging items to/from inventory and dragging to rotate work in the live game. This document preserves the agreed first-pass catalog and behavior; the store and progression/unlock design form a separate next phase.

Related active rules: [Environment](../design/systems/environment.md), [Simulation and time](../design/systems/simulation-and-time.md), [Spatial inventory and staging](../design/systems/spatial-inventory-and-staging.md), and [Developer tools](../developer-tools.md).

## 1. Intent and boundaries — agreed

- **Fungi remain the primary player-controlled means of changing Moisture, Temperature, and Illumination** (sometimes called luminosity in discussion). Player items are temporary crutches, emergency interventions, or short-lived aids; they should not replace cultivating appropriate Fungi.
- **Developer Sources and player Source items remain distinct.** Developer Sources retain unrestricted configuration and indefinite duration. Player items are named, individually owned objects with fixed Influence profiles, propagation parameters, and limited operating life.
- Player Source items use the existing environmental Influence/propagation engine and its normal additive Modifiers, Condition clamping, adjacency, and Blocker interactions. Effects change resolved Conditions; they do not permanently edit hex Baselines.
- A future **store** will provide items. Prices, store presentation, and the means of unlocking or purchasing items are deliberately outside this document.
- The roster is progressively unlocked in seven groups, not offered all at once. The order is agreed as a working design; the actual unlock triggers remain undecided.

## 2. Item ownership, placement, movement, and expiry — agreed

1. **One item = one inventory square while stored.** Identical item types do not stack. Three Warming Stones occupy three separate slots and can have different remaining lifetimes. Every individual item therefore needs its own persistent identity and remaining-time state. The existing inventory has 200 squares total. **Deploying an item frees its inventory square**; it is not reserved.
2. **One object per hex.** A placed Source item occupies an ordinary hex object slot, so it cannot share that hex with a Plant, Fungus, Blocker, or another item. Occupied, staged, and pending planting hexes cannot be used as item destinations.
3. **Free placement and movement.** An owned item can be placed on an available hex, moved directly from one valid hex to another, and dragged back into inventory. These operations have no item cost or time penalty.
4. **Budget item rotation is free, even after placement.** Players choose/reorient the initial heading among the six hex directions, immediately changing the directional route. Range items do not need a heading in the current roster.
5. **Only active placement consumes lifetime.** The countdown runs while the item is on the garden. Returning it to inventory pauses the countdown and preserves its remaining operating time. Replacing it later resumes from that value; moving or rotating does not reset or refill it.
6. **Permanent destruction at zero.** When placed operating time reaches zero, the item expires, is removed from the hex, and is destroyed permanently. It cannot be recovered or recharged; its hex slot is freed.
7. **Immediate environmental feedback.** Placement, movement, rotation, pickup, and expiry cause environmental resolution to reflect the current set of active Sources. A removed or expired item stops contributing Modifiers; prior plant progress/production is not undone.
8. **Persistence is required.** Save/load and browser autosave must preserve each individual item, whether stored or placed, along with its remaining lifetime and, where relevant, its current heading.

### Agreed first-playable interaction design

- **Before the store exists, only developer tools grant items.** A developer-only dispenser chooses one of the 26 catalog entries and adds one new full-lifetime instance to inventory. Ordinary player placement and use work with developer tools hidden.
- **Drag-and-drop is primary.** Drag a stored item to an empty hex, a placed item to another available hex, or a placed item back into inventory. Selecting an inventory item and then clicking an empty hex is a non-drag alternative.
- **Selected-object floating rotator.** A six-direction indicator appears around a selected, deployed Budget item. Drag its outer handle to snap to any of the six headings, immediately recalculating the Source route. Dragging the object itself continues to move it.
- **Extend the same floating rotation indicator to staged Fungi** whose environmental or cultivation footprint uses Spread Budget. It appears only while the staged proposal is selected and can freely change the planned Spore heading before Apply.
- **Committed Fungi are fixed.** After Apply, a Fungus cannot be moved or reoriented in ordinary play; it remains in its chosen position/direction until harvested or dead. Source items differ: they remain freely movable and rotatable.
- **Inventory-full pickup must be safe.** Because deployment frees the original slot, the inventory might be full when the player tries to pick an item back up. In that case, refuse the pickup, report why, and leave the still-active item on its hex. Do not silently discard or overwrite it. Direct hex-to-hex movement remains possible.
- **Remaining-time feedback.** Show a readable countdown on a selected deployed item and on the stored item tile; stored time is paused. The exact artwork and animations remain presentational details.

The approved live clock is **one simulated garden hour per five real seconds while the page runs**. The item durations below are **real active-use minutes**, corresponding to 60 garden hours for 5 minutes, 72 for 6, and 96 for 8. Item time should be measured consistently with the garden clock, not by time sitting in inventory. Offline catch-up is not currently part of the game.

## 3. First-pass balance — accepted for playtesting

These are the agreed initial item parameters, **not final numerical balance**:

| Item strength | Range version | Budget version |
| --- | --- | --- |
| ±1 | Range **2**, generally **6 min** | Shared Budget **4**, generally **6 min** |
| ±2 | Range **1**, **5 min** | Shared Budget **3**, **5 min** |

Two deliberately longer-lived ±1 Budget items have **8 minutes** of operating time: Cinder Compass and Cloudpost. There are **no 10-minute items** in this initial roster; 10 minutes is reserved as an exceptional possibility for future content.

- **Range** means normal finite-radius Airborne propagation through reachable hexes, subject to matching Blockers.
- **Budget** means the existing directional Spread Budget propagation: choose a starting heading, continue straight until blocked, then attempt branching; each hex crossing consumes the *shared* budget across all branches. It is not equivalent to a radius.
- A Source's occupied hex is included in its reach. All listed Properties use the current ordered Condition scales: Moisture (Dry, Damp, Flooded), Temperature (Freezing, Cold, Temperate, Warm, Hot), and Illumination (Dark, Dim, Lit, Bright).
- The roster has **24 single-Property core items**, covering each of the three Properties × positive/negative × strength 1/2 × Range/Budget, plus **two special items** with unusual effects.

## 4. Seven progressive unlock groups — accepted working roster

Every item below occupies one hex when deployed and one individual inventory square when stored. The listed minutes are **remaining active-use time when new**.

### Group 1 — Gentle Assistance (3)

Introduce simple positive corrections with Range propagation.

| Item | Environmental modifier | Propagation | Lifetime |
| --- | --- | --- | --- |
| Ember Pebble | Temperature +1 | Range 2 | 6 min |
| Weeping Statue | Moisture +1 | Range 2 | 6 min |
| Firefly Jar | Illumination +1 | Range 2 | 6 min |

### Group 2 — Emergency Measures (4)

Introduce negative modifiers and a short-lived dual-Property item.

| Item | Environmental modifier | Propagation | Lifetime |
| --- | --- | --- | --- |
| Frostbell | Temperature −1 | Range 2 | 6 min |
| Thirstmoss Carpet | Moisture −1 | Range 2 | 6 min |
| Shadecloth Canopy | Illumination −1 | Range 2 | 6 min |
| Torch | Temperature +1; Illumination +2 | Range 1 for both emissions | 5 min |

### Group 3 — Directional Instruments (4)

Teach freely rotatable Budget paths and precision environmental changes.

| Item | Environmental modifier | Propagation | Lifetime |
| --- | --- | --- | --- |
| Cinder Compass | Temperature +1 | Budget 4 | **8 min** |
| Rainthread Spool | Moisture +1 | Budget 4 | 6 min |
| Sunthread Reel | Illumination +1 | Budget 4 | 6 min |
| Cloudpost | Illumination −1 | Budget 4 | **8 min** |

### Group 4 — Concentrated Power (4)

Introduce focused +2 interventions with smaller footprints.

| Item | Environmental modifier | Propagation | Lifetime |
| --- | --- | --- | --- |
| Hearthbrick | Temperature +2 | Range 1 | 5 min |
| Overflow Urn | Moisture +2 | Range 1 | 5 min |
| Sunburst Lantern | Illumination +2 | Range 1 | 5 min |
| Warming Stone | Temperature +2 | Budget 3 | 5 min |

### Group 5 — Advanced Directional Control (4)

Extend strong directional boosts and gentle directional reductions.

| Item | Environmental modifier | Propagation | Lifetime |
| --- | --- | --- | --- |
| Tidewheel | Moisture +2 | Budget 3 | 5 min |
| Prism Beacon | Illumination +2 | Budget 3 | 5 min |
| Dustwhistle | Moisture −1 | Budget 4 | 6 min |
| Northwind Vane | Temperature −1 | Budget 4 | 6 min |

### Group 6 — Harsh Conditions (4)

Introduce strong cooling, drying, and dimming effects.

| Item | Environmental modifier | Propagation | Lifetime |
| --- | --- | --- | --- |
| Winterglass Orb | Temperature −2 | Range 1 | 5 min |
| Saltstone Basin | Moisture −2 | Range 1 | 5 min |
| Eclipse Bell | Illumination −2 | Range 1 | 5 min |
| Rime Needle | Temperature −2 | Budget 3 | 5 min |

### Group 7 — Unusual Artifacts (3)

Complete the negative Budget options and add one exceptional moisture Source.

| Item | Environmental modifier | Propagation | Lifetime |
| --- | --- | --- | --- |
| Drought Dial | Moisture −2 | Budget 3 | 5 min |
| Nightglass Needle | Illumination −2 | Budget 3 | 5 min |
| Sandglass Fountain | Moisture +3 | Budget 3 | 5 min |

**Sandglass Fountain caveat:** Moisture has only three Conditions, so +2 already raises an otherwise unmodified Dry hex to Flooded. The +3 matters primarily when offsetting concurrent negative Moisture Modifiers; it does not add a fourth Moisture Condition.

**Cumulative access by group:** 3 → 7 → 11 → 15 → 19 → 23 → **26 items**.

## 5. Next-phase work (not part of this completed implementation)

- **Store and unlock mechanics:** what triggers each group's availability; item prices, currencies, acquisition, starting stock, and purchasing UI.
- **Presentation refinements:** final visual assets, animation, rotation-handle styling, mobile accessibility, and detailed feedback wording.
- **Further playtesting and balance:** refine item values, expiry timing at unusual simulation boundaries, simultaneous environmental transitions, and input/accessibility details as issues are observed.
- **Source variants:** whether future player items may use Anchored Sources, Waterborne emissions, or other properties. The first roster uses ordinary Airborne Range or directional Spread Budget and no anchors.

**First-playable Source items and staged-Fungus rotation are complete.** Preserve existing developer Source semantics and compatibility with existing gardens. This completion does **not** approve a store, automatic group unlocks, or final numerical balance.

---

[Working index](README.md) · [Active design index](../design/README.md) · [Implementation status](../implementation-status.md)
