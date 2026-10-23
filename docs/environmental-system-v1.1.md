# Companion Cultivation — Environmental System v1.1

**Status:** Agreed rules reference for the Environmental Sandbox prototype  
**Updated:** 23 October 2026  
**Supersedes:** Environmental System v1 (consolidated edition)

This document collects the environmental rules agreed during design, including the later decisions about Sources, Blockers, object occupancy, and fungi. It is intended to be a reliable foundation for Prototype 1 and later herb and fungus design.

## Conventions

- **Locked:** An agreed rule for the current design. Changes require an explicit new decision.
- **Illustrative:** An example used to explain a rule, not an assigned item, statistic, or balance value.
- **Reserved:** A possible future mechanic, not active in the current rules.
- **Undefined:** A question intentionally left for a later design layer.

We avoid **effect** and **status** as formal system terms because they are too ambiguous. **Response** was proposed during design, but is *not needed as a separate formal layer* for current environmental Influences: an Influence specifies the Property and signed Modifier it applies. Later herb-targeting outcomes do not have to use numerical environmental Modifiers.

## 1. Locked terminology

| Term | Meaning |
| --- | --- |
| **Hex** | A single space on the garden's hex grid. |
| **Material** | The permanent physical substance of a hex. |
| **Property** | A tracked characteristic of a hex. |
| **Condition** | The current value of one Property, selected from its ordered sequence. |
| **Baseline** | The natural Condition of a Property before active Modifiers. |
| **Modifier** | A signed numerical step adjustment to exactly one Property. |
| **State** | The complete collection of a hex's current Conditions; not another individual Condition. |
| **Source** | An object capable of originating one or more Influences. |
| **Influence** | Something emitted by a Source, propagated to reachable hexes, and applied to its intended target there. |
| **Influence Kind** | A classification of an Influence, usable for selective blocking. |
| **Propagation** | The rules that determine which hexes an Influence reaches. |
| **Propagation Mode** | The method of travel; currently Airborne or Waterborne. |
| **Range** | The maximum number of adjacent-hex crossings an Influence can traverse. |
| **Blocker** | An object restricting the movement of applicable Influences. |
| **Object** | A placeable occupant such as a Herb, Fungus, Torch, or Hex Blocker. Some objects are also Sources. |

The **State** of a hex is not an additional Property or Condition. The distinction between an individual Condition and the complete State was present in the original rules.

## 2. Hexes, Materials, and object occupancy

### Materials — locked

Each hex has **exactly one** permanent Material:

1. **Dirt**
2. **Sand**
3. **Clay**
4. **Stone**

Material does not change when the hex becomes Damp, Flooded, Hot, or otherwise modified. No material-specific propagation bonuses, penalties, or environmental reactions are active yet. Stone as a ground Material is **not automatically a wall**.

### Occupancy — locked

- Each hex can contain **at most one object**.
- Herbs, Fungi, Torches, other Sources, and Hex Blockers all count as objects.
- A Hex Blocker therefore cannot share a hex with a Herb, Fungus, or Source. The same restriction applies to all other combinations of hex occupants.
- An object may have more than one *role*: for example, a Fungus is an object and can also be a Source.
- **Edge Blockers** occupy boundaries between hexes, not hex interiors; they do not consume a hex's object slot.
- Occupying a hex does **not** by itself obstruct propagation. An ordinary Herb, Fungus, or Source is not a Blocker.

## 3. Properties and Conditions — locked

Every hex tracks the following four Properties, each with exactly one current Condition:

| Property | Conditions from lowest to highest |
| --- | --- |
| **Moisture** | Dry → Damp → Flooded |
| **Fertility** | Barren → Poor → Normal → Rich |
| **Temperature** | Freezing → Cold → Temperate → Warm → Hot |
| **Illumination** | Dark → Dim → Lit → Bright |

These are **16 Conditions** in total. **Wet** was explicitly removed from Moisture.

Each Property also has a Baseline, which is one of its existing Conditions, not a separate value. For example, a Dirt hex might have a Moisture Baseline of Dry and a current Moisture Condition of Flooded. The default Baselines for each Material are **not yet assigned**.

## 4. Modifiers — locked

All four Properties use the same numerical system:

1. A Modifier is a positive or negative number of steps on **one** Property's ordered Conditions.
2. All **active** Modifiers on the same Property are **added together**; opposing Modifiers cancel numerically.
3. Add Modifiers to the **Baseline**, not to the previous current Condition.
4. **Clamp only after summing**: the result cannot fall below the lowest Condition or exceed the highest.
5. A Modifier applies **only while active**. Removing it causes recalculation from the Baseline and remaining Modifiers.
6. Application order does not matter.

**Formula (using zero-based Condition positions):**

`currentIndex = clamp(baselineIndex + sum(activeModifiers), 0, lastConditionIndex)`

Examples:

- Moisture Baseline Dry plus `+1` becomes Damp.
- Moisture Baseline Dry plus `+3` becomes Flooded, capped at the maximum.
- Moisture Baseline Dry with `+2` and `-1` becomes Damp.
- Fertility Baseline Rich plus `+2` remains Rich.
- When all Modifiers disappear, the Condition returns to the Baseline.

No percentage modifiers, permanent baseline changes, non-additive stacking rules, or override priorities are part of v1.1.

## 5. Influences and Sources

### General behavior — locked

- A **Source** can emit **multiple Influences**.
- Each emitted Influence has an **Influence Kind**, **Propagation Mode**, and **Range**, as well as its defined target and outcome.
- For current **environmental** Influences, the outcome is a signed Modifier to **exactly one** environmental Property.
- An environmental Influence means the same thing wherever it arrives: its Modifier does **not** vary because the destination is Dirt, Sand, Clay, or Stone.
- Sources determine the strength of their emitted environmental Influences; for example, two Sources might both emit Warming at different strengths.
- If an Influence stops reaching a hex, the corresponding active Modifier disappears.
- Influences from **different Sources** stack under the Modifier rules.

### Environmental Influence vocabulary

The following directional names and Kind names are **illustrative starting vocabulary**, not an approved exhaustive Influence catalog, a list of required physical objects, or final source strengths. The signed values illustrate the established system.

| Influence | Kind | Environmental Property | Illustrative Modifier |
| --- | --- | --- | --- |
| Wetting | Aqueous | Moisture | +1 |
| Drying | Aqueous | Moisture | −1 |
| Enrichment | Nutrient | Fertility | +1 |
| Depletion | Nutrient | Fertility | −1 |
| Warming | Thermal | Temperature | +1 |
| Cooling | Thermal | Temperature | −1 |
| Brightening | Luminous | Illumination | +1 |
| Dimming | Luminous | Illumination | −1 |

**Illustrative Source — Torch:** emits Warming (Thermal, Airborne, `+1 Temperature`, Range 2) and Brightening (Luminous, Airborne, `+1 Illumination`, Range 3). Neither the Torch item nor its example numbers are fixed game content.

### Source placement and configuration — locked

- A Source occupies one hex as an object, and can be placed on any Material.
- It cannot share the hex with any other object.
- Its separate Influences can have different Kinds, strengths, Modes, and Ranges.
- Sources are not consumed by emitting Influences.

**Prototype 1 tool:** A **Configurable Source** allows a tester to select its Influence(s), strength(s), Mode(s), and Range(s) without first defining a permanent catalog of fantasy items.

## 6. Propagation — locked

### Shared rules

- The Source's own hex is distance **0**.
- Each crossing to an adjacent hex costs **1 Range**.
- Influences spread toward all **six** adjacent directions by default.
- Propagation can route **around** obstacles if an alternative valid path exists within Range.
- If several valid routes lead from the **same Source** to a hex, only the **shortest valid route** matters: a single emission applies **once per hex**, not once per route.
- Separate Sources can reach the same hex and their Modifiers can stack.

### Airborne

- Airborne Influences can traverse adjacent hexes regardless of Material or environmental Condition, unless blocked.
- They require no water connection.

### Waterborne

- Waterborne Influences travel only through **connected Flooded hexes**.
- **Dry** and **Damp** hexes do not carry Waterborne Influences.
- A Source can inject a Waterborne Influence directly into an **adjacent Flooded hex** even when the Source's own hex is not Flooded; that first crossing costs Range 1.
- If a Flooded connection is broken, propagation cannot continue along that route. Other valid paths may still work.

### Materials and Conditions

| Property or Material | Current propagation role |
| --- | --- |
| Dirt, Sand, Clay, Stone | No differences between Materials. |
| Moisture | **Flooded** permits Waterborne transmission. |
| Fertility | No propagation effect. |
| Temperature | No propagation effect yet. |
| Illumination | No propagation effect. |

In particular, **Freezing Temperature does not currently freeze water or interrupt Waterborne propagation**. A future rule could make frozen water non-flowing, and the existing flooded-connection rule could then naturally stop Waterborne travel. That future behavior is *reserved*, not active.

## 7. Blockers — locked

Blockers restrict propagation; they do not inherently alter Materials, Properties, Baselines, or Conditions.

### Two placements

| Object | Position | Behavior |
| --- | --- | --- |
| **Hex Blocker** | One hex's object slot | Matching Influences **cannot enter** that hex or pass through it. |
| **Edge Blocker** | Exactly one shared edge between adjacent hexes | Matching Influences **cannot cross** that edge, in **either** direction. |

An Edge Blocker on the east side of Hex A is the **same single blocker** as the one on the west side of adjoining Hex B. It does not need to be duplicated. To block more than one side, place more Edge Blockers, one per affected edge. Blocked routes can be bypassed when Range and connectivity allow.

### Two restrictions, available to both placements

- **Full Blocker:** Blocks all Influences.
- **Selective Blocker:** Blocks only Influences matching selected **Influence Kinds** or **Propagation Modes** (for example, Thermal-only or Waterborne-only).

The placement type (Hex or Edge) and the restriction type (Full or Selective) are independent. There is no need for separately invented blocking algorithms.

### Prototype 1 blocker tools — locked

Use **two distinct configurable blocker tools**, because they occupy different grid locations:

1. **Configurable Hex Blocker** — always placed within a hex.
2. **Configurable Edge Blocker** — always placed on one of the six sides of a hex (the shared boundary).

Each tool offers Full or Selective blocking, configured by Kind or Mode. Neither tool creates a new Material or environmental Modifier.

## 8. Fungi, Herbs, and the shared Influence system

### Architectural decisions — agreed

- **Fungi and Herbs are objects** and follow the one-object-per-hex rule.
- **Fungi can themselves be Sources**. “Fungus” describes an object; “Source” describes a capability of that object. This is the same relationship as a Torch being both an object and a Source.
- Fungi can emit Influences that travel using the **existing Airborne/Waterborne propagation rules**, rather than a separate fungal propagation engine.
- Some Influences target the **environment**, while others target **Herbs** and change herb behavior. The distinction is about what happens on arrival, not about how an Influence travels.
- An herb-targeting Influence may pass through an empty hex or through a hex with an ordinary nonblocking object; if no Herb is present there, no Herb receives an outcome in that hex.
- A Fungus could eventually emit both environmental and herb-targeting Influences, just as a Torch can emit multiple environmental ones.

### Cultivation outcomes — deliberately undefined

The previously identified herb mechanics are **Growth**, **Herb Production**, **Seed Production**, and **Transformation**. These are *future targets for design*, not environmental Properties. Their exact behavior, numerical representation, and fungal Influence catalog have **not** been finalized.

Do **not** assume every herb-targeting Influence must apply the same stepped numerical Modifier as an environmental Influence. Growth acceleration might be numerical; a variety transformation may need a different rule. Keep propagation shared while designing the arrival outcome later.

**Illustrative only:** A Growth Fungus occupying one hex might emit an Airborne influence that reaches nearby Herbs and accelerates growth. Its Range, strength, final mechanism, and item name are not established.

### Interface for later object and cultivation design

When defining an actual environmental Source, record its location and each emitted Influence independently:

```text
Source name:
Position / occupied hex:
Emitted Influence(s):
  - Influence name:
    Kind:
    Target Property:
    Modifier:
    Propagation Mode:
    Range:
```

For a Herb or Fungus design, keep cultivation-specific choices separate until their rules are established:

```text
Object name and role(s):
Relevant Conditions or incoming Influences:
What these inputs do to Growth, Herb Production, Seed Production, or Transformation:
When these inputs are checked:
```

The templates define **information to record**, not additional game mechanics.

## 9. Environmental calculation order — locked foundation

Waterborne paths depend on knowing which hexes are already Flooded. Resolve environmental calculations in this order:

1. Start with each Property's **Baseline** and any applicable **direct local Modifiers**.
2. Calculate **Airborne Influences**, including any that modify Moisture.
3. Resolve **Moisture Conditions** and determine which hexes are **Flooded**.
4. Calculate **Waterborne Influences** using the resulting Flooded connections.
5. Sum all active applicable Modifiers and calculate final Conditions for every Property.

For now, **Waterborne Influences do not modify Moisture**. Otherwise an Influence could create the very Flooded path it needs, which would require new resolution rules. Herb-targeting outcomes, once designed, can be evaluated after their propagation paths are known.

## 10. Prototype 1 — Environmental Sandbox

The intended prototype tests the **environmental** system before final Herb or Fungus mechanics exist.

### Agreed test objects

| Tool | Purpose |
| --- | --- |
| Configurable Source | Test individual or multiple emitted Influences, strengths, Modes, and Ranges. |
| Configurable Hex Blocker | Test complete or selective blocking of a hex. |
| Configurable Edge Blocker | Test complete or selective blocking of a single shared hex edge. |

### Suggested interface features — implementation proposals, not new game rules

- A hex grid with selectable Materials and editable Property Baselines.
- Place, inspect, configure, and remove the three test-object types.
- Inspect a hex's Baselines, current Conditions, contributing Sources, and numerical Modifiers.
- Visualize Airborne/Waterborne reach and blocked or open paths.
- Easily construct connected Flooded regions to test Waterborne travel.
- Recalculate deterministically when an object, a Baseline, or configuration changes.

The simulation should remain separate from its display code, even if Prototype 1 is implemented in a single HTML file.

## 11. Explicitly reserved for later

These ideas are **not current mechanics**:

- Material-specific interactions, transmission, conductivity, or bonuses.
- Default Property Baselines assigned to Dirt, Sand, Clay, and Stone.
- Temperature freezing or thawing water, including the hypothetical frozen-water interruption of Waterborne transmission.
- Environmental outcomes that change by destination Material or Condition.
- Waterborne Moisture changes that alter their own transmission network.
- Amplifiers, filters, converters, absorbers, conduits, or more complex blocker behavior beyond the agreed Full/Selective rules.
- Directed emission, attenuation, variable movement costs, extra Propagation Modes, or range extensions along walls/corridors.
- Self-propagating environmental changes and other feedback loops.
- Additional Materials or Properties (for example Gravel, Ash, Magical Saturation, or Contamination).
- Permanent environmental alterations, complex Modifier stacking, or percentage modifiers.
- A fixed catalog and balance values for fantasy Source objects.
- Exact Herb and Fungus influence types, target logic, growth, yields, seed mechanics, and transformations.

The separate **Companion Cultivation — Standalone Farming Game Design Notes** is a brainstorming brief. It contains ideas about growth timing, seed chains, fungal interactions, grid layout, and other gameplay choices. Those ideas should **not** silently override the locked rules above; evaluate and explicitly adopt them when the relevant cultivation layer is designed.

## 12. Changes recorded since v1

1. **Source object rules** specified: Sources occupy one hex, can emit multiple separately configured Influences, and do not inherently block travel.
2. **Blocker rules** specified: no entry into a blocked hex; Hex versus shared-edge placement; one side per Edge Blocker; bidirectional edge restriction; Full versus Selective by Kind or Mode.
3. **Prototype testing tools** specified: one Configurable Source plus **two separate** blocker tools (Configurable Hex Blocker and Configurable Edge Blocker).
4. **Object occupancy** established: at most one object in each hex; Herbs and Fungi are objects too, while Edge Blockers occupy boundaries.
5. **Fungi-as-Sources architecture** established: future herb-targeting Influences reuse propagation, but their arrival outcomes are not yet defined.

---

**Design principle:** Keep the vocabulary and propagation consistent. Add new interactions only when they serve an actual cultivation or environmental gameplay purpose.

### Quick reference

**Materials:** Dirt · Sand · Clay · Stone  
**Properties:** Moisture · Fertility · Temperature · Illumination  
**Moisture:** Dry → Damp → Flooded  
**Fertility:** Barren → Poor → Normal → Rich  
**Temperature:** Freezing → Cold → Temperate → Warm → Hot  
**Illumination:** Dark → Dim → Lit → Bright  
**Modifier math:** `Condition = clamp(Baseline + sum(active Modifiers))`  
**Propagation:** Airborne through unblocked hexes; Waterborne through connected Flooded hexes  
**Blocking:** Hex or Edge placement; Full or Selective restriction  
**Occupancy:** At most one object per hex; Edge Blockers occupy shared boundaries  
**Fungi:** Objects that can act as Sources and use the same propagation system
