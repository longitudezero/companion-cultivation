# Plant lifecycle and production — common framework

> **ACTIVE · APPROVED FRAMEWORK — Prototype 16.** The 60 Plant profiles and lifecycle rules are implemented. Historical status claims below describe earlier design checkpoints; the [V8 Fungus roster](../fungi/random-roster-v8.md) and [V9 recipes](../fungi/random-roster-v9.md) supersede first-pass references to fungal effects or contacts.

## Current shared framework

- Plants have **0–100% Growth** and **100–200% Ripening**. Each species has its own durations and Leaf/Seed production curves, recorded exactly in its [family file](../README.md).
- One **destructive harvest** collects available Leaves and Seeds together and removes the Plant. There is no automatic second harvest or fungus-added second bloom.
- Transformations are **stage-independent** and replace the original with a fresh **0%-Growth** Plant; see [Transformation rules](transformations.md).
- Ordinary production and fungal/environmental Yield bonuses accrue **prospectively during eligible positive lifecycle progression**, not retroactively on harvest. Time-based outputs have their declared progress windows. Already earned ordinary Leaves may decline naturally during Ripening under the approved curve semantics.
- Habitat conditions may alter Growth/Ripening rates and ordinary incremental output, or advance independent lethal exposure clocks. Species-specific exceptions and thresholds remain in each family reference; Mycelial is a generally hazardous overlay for Plants.
- Do not use a Plant's current lifecycle stage, output quantity, or fungal cultivation bonus magnitude as a Transformation prerequisite.

## Exact approved interaction and accrual decisions

## Lifecycle-specific implications of the shared rules

This is the **Plant-facing entry point**. Full authoritative clauses and edge cases are maintained once each:

- [§60 — Fungus/Plant interaction audit](influences-and-responses.md#60-fungusplant-interaction-audit--approved-global-decisions-and-tracked-yield-timing-details-still-open): signed peak-shift stacking, independent hazards, Transformation/death priority, ordinary-rate slowdown floors, dependent-fungus habitat-loss grace, selective Blocker Kinds, overlapping Mycelial colonies and **tracked Yield**.
- [§65 — Prospective environmental output](seeds-spores-and-harvesting.md#65-ordinary-environmental-output-bonuses-are-earned-during-production--approved): ordinary environmental output multipliers apply only during the time they are actually active, never retrospectively at harvest.
- [§56 — Leaf–Seed Allocation](seeds-spores-and-harvesting.md#56-first-pass-leafseed-allocation-mechanics-and-unlimited-waterborne-reach-approved): a **separate 3:1 harvest-time exchange**, not continuous accrual.
- [§64 — Event/update order](simulation-and-time.md#64-whole-garden-event-and-update-order--approved): how elapsed clocks, transitions, deaths and production are resolved.
- [Transformation rules](transformations.md): stage-independent, no direct fungal Development-Effect gate, and fresh 0% progress on replacement.
- [Six family specifications](../README.md#plant-families): exact species stage durations, curves, Seed identities, compatibility tables, environment/hazard exceptions.

**Accounting invariant:** Ordinary output (including valid fungal Yield and environmental adjustment) is earned during eligible positive lifecycle progress; ordinary Leaf yield, including previously Yield-enhanced production, still follows the Plant's natural Ripening decline. Distinct **hourly fungal production** is banked while a valid emitter reaches a progressing Plant inside its own fixed window; those banked hours are not erased by later natural ordinary Leaf decline. At the single destructive harvest, collect eligible current ordinary and banked output, then apply §56 Allocation exactly once.

This is a navigation summary. The exact source-level §§60 and 65 text was checked for duplication and **remains fully preserved in the linked system documents**, without deleting any unique mechanic.
