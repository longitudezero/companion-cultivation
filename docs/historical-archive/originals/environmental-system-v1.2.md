# Companion Cultivation — Environmental System v1.2

**Status:** Authoritative specification for the implemented Prototype 1 environmental sandbox, updated 26 October 2026.  
**Historical reference:** [Environmental System v1.1](environmental-system-v1.1.md). v1.1 records the original four-Property/material prototype and remains available as an archive; **this v1.2 document supersedes it wherever they differ**.  
**Cultivation design:** [Herbs, Fungi & Cultivation](herbs-and-fungi-design.md) remains authoritative for future Plants, Fungi, Mycelial ground and Transformations, which are **not yet implemented**.

## 1. Environmental state — exactly three Properties

Each hex has editable Baselines and recalculated current Conditions for exactly these Properties:

| Property | Ordered Conditions (low → high) | Environmental Influence Kind |
| --- | --- | --- |
| Moisture | Dry → Damp → Flooded | Aqueous |
| Temperature | Freezing → Cold → Temperate → Warm → Hot | Thermal |
| Illumination | Dark → Dim → Lit → Bright | Luminous |

**Fertility and permanent hex Materials (Dirt, Sand, Clay, Stone) have been removed from the game.** There is no material selection tool, Material property, Fertility baseline, Nutrient Kind, Enrichment or Depletion emission. The former four-Property / 16-Condition architecture is superseded by **three Properties / 12 Conditions**. A hex's environmental state is not defined by a ground Material.

Defaults for a new hex: **Dry, Temperate, Dark**. There is still at most one object per hex, with Edge Blockers occupying shared boundaries rather than hex slots. Future Mycelial is a separate temporary **overlay state**, not a fourth environmental Property or a replacement ground Material.

## 2. Sources, Modifiers and anchors

- A configurable Source occupies one hex and may emit multiple independently configured Influences. An Influence records its name, Kind, Property, signed integer Modifier, propagation system, travel Mode, and relevant travel settings.
- Wetting/Drying modify Moisture ±; Warming/Cooling modify Temperature ±; Brightening/Dimming modify Illumination ±. Kinds are respectively **Aqueous**, **Thermal**, **Luminous**. No other environmental emission kinds are shipped in this prototype.
- Active Source Modifiers stack **additively** on each reached hex's baseline and are clamped to that Property's defined Condition scale. A Source emission contributes at most once per target hex, even if multiple paths reach it.
- An **Anchored Source** is still a single object. In addition to ordinary emissions it fixes exactly **one** of the three Properties to one of its Conditions on its own hex. Incoming Modifiers may still reach/cross that hex but cannot change the anchored Condition. Anchors are evaluated before determining Flooded connectivity.
- Removing an emitted Source or anchor triggers recalculation from Baselines and currently active Modifiers; it does not permanently edit a Baseline.

## 3. Propagation

### Ordinary Airborne and Waterborne

- **Airborne** traverses adjacent hexes over any Condition, with a finite numerical Range; each crossing costs one.
- **Waterborne has NO numeric Range limit.** A Waterborne emission can traverse every unblocked, connected **Flooded** hex. A Source on non-Flooded ground can inject into any adjacent Flooded hex and then traverse that entire reachable flooded component. The Source hex is always reached at distance zero.
- A matching Hex Blocker forbids entering or traveling through its occupied hex. A matching Edge Blocker forbids crossing the shared border in either direction. Other routes can bypass a Blocker; no Source contributes more than once per destination.
- Waterborne **cannot modify Moisture**: otherwise it could create the Flooded network it needs to traverse, introducing an unresolved feedback loop. Airborne and directional routed Wetting can create Flooded Conditions before Waterborne reach is evaluated.
- Older saved Waterborne numeric Ranges are ignored. New Waterborne emissions use a `null` Range, indicating connectivity-based unlimited reach.

### Directional Spread Budget

- This is an alternative propagation system for an emission, not an addition to ordinary Range. It has a **shared crossing budget**, a player-selected starting direction and a Source-specific Movement Rule.
- The current rule is **Straight Until Blocked**: advance forward until obstructed by a boundary, matching Blocker, or already reached hex; then attempt both adjacent exits. Successful crossings spend budget; branches share one total budget. If insufficient for all possible branches, stable seeded choices keep the route reproducible until its revision changes.
- Current routed traversal behaves as open-terrain **Airborne** for selective Mode blocking, regardless of the destination's Moisture.
- Routed Wetting is resolved before Waterborne reach so a Source can establish Flooded corridors through initially Dry/Damp hexes. Routed path arrows and budget usage are inspectable.

## 4. Environmental Adjacency

One **simultaneous**, **non-chaining**, **capped** neighboring-Condition pass follows regular Source resolution. It is not a transmitted Source emission and does not traverse beyond immediate adjacent hexes.

| Neighbor trigger | Target adjustment | Kind / Mode for Blockers |
| --- | --- | --- |
| Flooded neighbor | Dry → Damp, but never Damp → Flooded | Aqueous / Waterborne |
| Hot neighbor | One step warmer, never Warm → Hot | Thermal / Airborne |
| Freezing neighbor | One step colder, never Cold → Freezing | Thermal / Airborne |
| Bright neighbor | One step brighter, never Lit → Bright | Luminous / Airborne |
| Dark neighbor | One step darker, never Dim → Dark | Luminous / Airborne |

Multiple identical neighboring triggers cause at most one adjustment. Opposing **Hot/Freezing** or **Bright/Dark** triggers cancel when both are permitted across applicable Blockers. Blocked neighbors do not participate in this cancellation. An anchored target is immune to adjacency on its anchored Property. These adjustments can soften an existing extreme and may affect the surrounding final Conditions, but **never create Flooded**.

The adjacency **Mode tag is for Blocker matching only**: a Waterborne-tagged Flooded→Damp adjacency effect can change a directly adjacent Dry hex without using Waterborne flooded-network propagation.

## 5. Blockers and occupancy

- Each hex contains zero or one object: a Configurable Source, Hex Blocker, or future living Plant/Fungus. Ordinary object occupancy does not by itself block Influence travel.
- **Hex Blockers** occupy a hex's object slot. Matching emissions cannot enter/traverse it, and matching adjacency cannot enter **or leave** it.
- **Edge Blockers** occupy one shared border. Matching emissions and adjacency cannot cross that border in either direction.
- Both placements support **Full** blocking or **Selective by Kind / by Mode**. Full stops everything in scope; Kind currently selects Aqueous, Thermal or Luminous and Mode selects Airborne or Waterborne. Future cultivation Kinds and Mycelial support filtering are text-only designs, not present in Prototype 1.

## 6. Environmental resolution order

1. Start from the three current Baselines and active object Sources.
2. Propagate ordinary Airborne and routed emissions, including airborne/routed Wetting.
3. Resolve **Moisture**, respecting an anchored Moisture Condition. This establishes the flooded-network snapshot.
4. Traverse all ordinary Waterborne emissions over that snapshot.
5. Resolve the three Properties using additive Modifiers and applicable anchors.
6. Apply the single simultaneous Blocker-aware Environmental Adjacency pass to non-anchored Properties. Never feed adjacency results back into earlier propagation stages during the same recalculation.

This deterministic core does not yet implement clock-based Mycelial colonization, fungus habitats or Plant lifecycle production.

## 7. Save files and migration

- The current serialized garden format is **schema version 2**. Its hexes store three `baselines` and no `material` field.
- Loading a supported old **schema version 1** garden upgrades it safely to v2. Retained Baselines, valid environmental Sources, anchors, Blockers, shared edges and geometry survive.
- Old `material` and Fertility baseline values are discarded. **Enrichment/Depletion emissions** and **Fertility anchors** are discarded; their containing Source remains available for reconfiguration. Obsolete **Nutrient-only Blockers** are removed because they no longer match any game Influence. Other active effects remain, including old Waterborne emissions whose Range was numeric.
- The browser reads existing v1 storage as a fallback but writes to a **new v2 key**, leaving the old stored version intact. JSON import accepts either supported version and exported files use v2.
- The core migration is pure and does not mutate the supplied JSON.

## 8. Mycelial design boundary (APPROVED, not implemented)

The future Mycelial colony system is a separately timed overlay owned by the Plant/Fungus design. It remains distinct from the three Properties and from instantaneous Environmental Adjacency.

- **Mycelord** is the only initially approved fungus species that creates Mycelial. Its colonies spread over time, can overlap, and retreat gradually when unsupported.
- **Flooded hexes are barriers to new Mycelial spread AND ongoing Mycelord support connections.** If flooding severs an existing branch, its unsupported contribution stops spreading and retreats **gradually**, not instantly. Removing Flooded before retreat completes can restore support, like removing a matching Blocker.
- Full or Mycelial-Kind selective Blockers can likewise sever an existing source path. Alternate paths or another Mycelord can keep a hex supported. A dependent Fungus begins its lethal-habitat countdown only when its own occupied hex actually loses Mycelial, and it keeps emitting while alive during that grace period.
- Mycelial has **no Base Material eligibility rules**, because Base Materials no longer exist. Exact colonization delays, retreat intervals, and any other Condition restrictions remain for later text-only design. There is no live Mycelial simulation or UI yet.

This v1.2 simplification intentionally reduces environmental overhead before the first implementation of Plants and Fungi. It does not change their approved effect roster, transformations, or the existing unlimited Waterborne rule.
