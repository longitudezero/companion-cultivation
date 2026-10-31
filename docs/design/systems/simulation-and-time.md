# Garden simulation, event ordering, and elapsed time

> **ACTIVE · APPROVED FRAMEWORK — Prototype 16.** The environmental and biological event order is implemented. The **live clock conversion is approved**; individual biological durations and balance remain subject to playtesting. First-pass “not implemented” statements below are historical; [V9](../fungi/random-roster-v9.md) defines the current recipe predicates.

**Implementation boundary:** the live simulation covers environmental recalculation and time-advanced organism/Mycelial events, with automated tests and provisional timing values. **Manual Pause/0.5×/1×/2× controls are implemented (31 October 2026).** See [Environment](environment.md), [Mycelial](mycelial.md) and [implementation status](../../implementation-status.md).

## Live clock and player-facing time — APPROVED 28 October 2026

- **At 1× speed, one simulated garden hour passes every five real seconds while the game page is running.** This is now the permanent Companion Cultivation clock ratio, not a temporary testing acceleration. Simulation logic, recipe definitions and save files continue to store time in whole game hours.
- **Player-facing durations are displayed as real waiting time at this 1× baseline rate**, using seconds and minutes: 16 game hours = **1m 20s**; 20 game hours = **1m 40s**; 24 game hours = **2m**. This includes Transformation progress, hazards, organism stages, timed event windows, germination and the developer Grimoire preview. The underlying thresholds and order of events do not change.
- Developer time skips advance the simulated garden instantly; their equivalent live durations are 5s for one garden hour and 2m for one garden day. A skipped interval is not actual wall-clock time spent playing.
- The clock continues during staging. **No closed-page catch-up is currently implemented**, and background-browser throttling may delay updates. Individual growth, hazard, Spore and reveal durations remain separately tuneable; approving the clock conversion does not lock their numerical balance.

## Manual simulation speed — APPROVED 29 October 2026, IMPLEMENTED 31 October 2026

Players control the simulation with permanently accessible **Pause, 0.5×, 1×, and 2×** controls. Half speed means 0.5×, not 0.5%.

| Control | Garden time |
| --- | --- |
| Pause | No elapsed simulated time |
| 0.5× | One garden hour per 10 real seconds |
| 1× | One garden hour per 5 real seconds |
| 2× | One garden hour per 2.5 real seconds |

The multiplier applies to the whole time-driven simulation: germination, Plant and Fungus lifecycle/production, Transformations, hazard/death clocks, Mycelial spread/retreat, and temporary Source lifetimes. Store and advance the same garden-time thresholds; changing speed changes the time taken to reach them, not the biological rules. For example, Carrot's 240-hour Dry threshold is 20 real minutes at 1×, 40 at 0.5×, or 10 at 2×.

While paused, players can read menus, plan, and rearrange things. Direct player actions can recalculate environment and Influence at the current timestamp, but no growth, exposure, expiry, or other elapsed-time progress accrues.

**Opening the Taskboard does not pause the game or change the selected speed.** The compact pinned-objectives tracker also never pauses gameplay. Players may choose Pause themselves before reading or planning.

The garden HUD controls one shared browser-time accumulator feeding the whole-hour simulation. Switching speed first settles the preceding interval at its old multiplier; Pause retains the partial hour. Replacing/importing a garden resets the partial tick. The selected speed persists as a browser UI preference outside the garden save. The selected Source timer reflects current speed or Paused; Grimoire reference durations retain the 1× baseline. A suspended-tab callback processes at most five real seconds, preserving the prototype’s lack of offline catch-up. See the [progression framework](../../working/task-organization.md) for Taskboard behavior.

## 64. Whole-garden event and update order — APPROVED

**Status (26 October 2026):** After explicitly approving time-driven Mycelial expansion/retreat (§63), the user clarified that they **also approve the complete six-step update order proposed in the interaction audit**. This is a design specification for future biology implementation; it does not change the already-implemented deterministic environment-only resolution order in [Environmental System v1.2](environment.md).

For each player action, timed completion, or other state-changing event at an exact simulated time:

1. **Finish the preceding elapsed interval under its actual prior conditions.** Advance ordinary lifecycle progress and accumulated Leaves/Seeds, continuous Transformation/hazard exposure, and eligible Mycelial expansion/retreat only for the real elapsed time during which their respective conditions held. An Effect that becomes active at the event cannot retroactively alter that interval. Split time advancement at intervening events instead of applying an end-of-hour snapshot to earlier minutes.
2. **Apply the current event.** Place/remove/harvest objects, apply Baseline/Source/Blocker changes, or resolve a scheduled biological event. For a Plant recipe driven by a transition such as **Flooded → Damp**, preserve/check its just-completed **pre-change continuous exposure** at that transition before resetting the old clock (§59). Transformed Plants are fresh 0%-progress instances with none of the old transient state (§58); where Transformation and lethal death mature at the exact same timestamp, Transformation wins (§60D).
3. **Recalculate the environmental state using the existing Prototype 1 algorithm.** Airborne and routed Sources/anchors establish Moisture and hence connected Flooded paths; ordinary Waterborne propagates over that snapshot; additive Modifiers, anchors, and the single non-chaining Environmental Adjacency pass yield the final Moisture, Temperature and Illumination Conditions (§6 of v1.2). A Waterborne effect does not create the water path carrying it.
4. **Update Mycelial support and eligible spread/retreat.** Using the newly resolved Flooded barriers, matching Blockers, living Mycelords, and separately tracked overlapping contributions, check which existing colonies remain supported. Unsupported contributions stop expanding and begin/continue **elapsed-time** retreat; newly reachable hexes enter **elapsed-time** colonization, not instant overlay creation. Reconnection preserves surviving supported Mycelial (§§60F–63).
5. **Update Fungal cultivation Influence reach and strengths.** Resolve distinct cultivation Effects using the current environmental Flooded network, travel Mode, Blockers and source-side Mycelial status. Mycelial-dependent Fungi still emit their normal Effects while alive during their already-approved habitat-loss grace; a recipient Plant does not need to stand on Mycelial to receive an ordinary reached Effect.
6. **Update living-organism Responses for the new state.** Start, reset, or continue each independent continuous hazard/recipe exposure clock, and determine prospective Growth/Ripening, output-earning and modifier rates from the currently reaching Effects. Resolve applicable Transformation/death events with existing same-timestamp priorities; changes only govern time from this state onward. If a Fungus dies or a Transformation alters the set of active Sources, recalculate affected stages at **the same simulated timestamp** until the resulting state is consistent, without inventing elapsed time or repeatedly earning output.

**Concrete consequences already agreed:** Draining a Flooded Waterborne corridor stops its Waterborne reach from the event onward without undoing historically earned production; flooding Mycelord severs its support immediately but only starts its species-specific death countdown and gradual colony retreat; and Flooded→Damp Aquatic Transformations can inspect the just-completed Flooded exposure even though drainage breaks the earlier reach. Precise simultaneous player-command timing, equal-time Mycelial fronts and fractional numeric integration/rounding remain implementation questions, **not reasons to replace the six-step order**. **Sibling Transformations are required to be mutually exclusive (§66)**; a demonstrated overlapping route pair is a design-review defect, not a generic event-priority question.

**Scope:** This approval is text-only. Do not implement Plants, Fungi, Mycelial, exposure clocks or Transformations merely because their update order is now specified.

---
