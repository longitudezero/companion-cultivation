# Companion Cultivation — current game design

> **ACTIVE · APPROVED — Prototype 16, 28 October 2026.** This index points to the current intended mechanics, not historical proposals. [Implementation status](../implementation-status.md) separately tracks what runs, what is tested and what remains provisional.

Companion Cultivation is a hex-garden farming game about cultivating Plants for species-specific Leaves and Seeds, combining environmental Conditions and living Fungal effects, and discovering Plant Transformations.

## Design authority and supersession

- The current **twelve ordinary Fungi plus Mycelord** are defined by the [V8 fungal roster](fungi/random-roster-v8.md). The retired 31-Fungus catalog is [historical](../historical-archive/superseded-design/fungi/README.md).
- All **69 current Transformation recipes** are defined by [V9](fungi/random-roster-v9.md). They require the Plant hex's **resolved state**; 67 also require named living Fungus contact. **Kelpfull → Kelpless** (8 real minutes) and **Kelpergeist → Kelpless** (4 real minutes) require only continuous non-Flooded state, no contact; restoring Flooded resets the countdown. No exact emission magnitude or sign is a recipe gate. Older family recipe tables are preserved for provenance, but V9 takes precedence where they differ.
- Waterborne cultivation reaches the full unblocked, connected Flooded network once its initial footprint touches that network. Player-selected Spore heading applies to directional propagation.
- Every Plant produces its [own Leaf item](decisions/species-specific-leaves.md). There is no interchangeable general Leaf currency.
- The [approved plant-name changes](decisions/plant-names.md) rename 26 species without changing their behavior or the six-family, 60-plant roster. Family profiles and the original V9 recipe tables preserve their earlier identifiers for historical traceability; use the mapping for current names.
- Current topical system and Plant-profile documents below remain applicable where newer accepted decisions do not supersede their first-pass text. In case of conflict, follow the explicitly newer accepted design; do not silently blend competing versions.

## Setting and task writing

- [Guild setting and task voice](setting-and-task-voice.md) — **approved narrative direction, content not yet implemented**. The newly hired guild botanist, supportive instructor, offscreen adventures, and clear objectives with comic descriptions.

## Systems

- [Environment, Conditions, Sources and Blockers](systems/environment.md)
- [Environmental and Fungal Influences and responses](systems/influences-and-responses.md)
- [Plant lifecycle and production](systems/plant-lifecycle.md)
- [Fungus lifecycle and habitats](systems/fungus-lifecycle.md)
- [Mycelial spread and support](systems/mycelial.md)
- [Simulation timing and event order](systems/simulation-and-time.md)
- [Seeds, Spores and harvesting](systems/seeds-spores-and-harvesting.md)
- [Transformation framework](systems/transformations.md) — for current recipe rows, see [V9](fungi/random-roster-v9.md)
- [Spatial inventory and staging](systems/spatial-inventory-and-staging.md)
- [Saving and backups](systems/saving-and-backups.md)
- [Cultivation Grimoire](systems/cultivation-grimoire.md)

## Plant families

The 60 Plants retain their profile identities and balancing references. Transformation rows in older family documents are superseded by V9 where different.

| Family | Profile |
| --- | --- |
| Ingredients | [Ingredients](plants/ingredients.md) |
| Flowers | [Flowers](plants/flowers.md) |
| Aquatic | [Aquatic](plants/aquatic.md) |
| Woodlands | [Woodlands](plants/woodlands.md) |
| Desert | [Desert](plants/desert.md) |
| Spices | [Spices](plants/spices.md) |

## Fungi and decisions

- [Current Fungus design index](fungi/README.md) — V8 roster and V9 transformation recipes
- [Species-specific Leaf identity](decisions/species-specific-leaves.md)
- [Approved plant-name changes and V6 save mapping](decisions/plant-names.md)

For new ideas see [Working notes](../working/README.md). For original design sources, the retired 31-Fungus profiles, V0–V7 experiments, completed audits and conversation handoffs see the [Historical archive](../historical-archive/README.md).
