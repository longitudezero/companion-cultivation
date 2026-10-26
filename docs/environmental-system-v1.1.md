# Companion Cultivation — Environmental System v1.1

**Status:** Agreed rules reference; both propagation systems, Environmental Adjacency, blocker-aware adjacency, and Anchored Sources are implemented in Prototype 1  
**Updated:** 26 October 2026
**Supersedes:** Environmental System v1 (consolidated edition)

This document collects the environmental rules agreed during design, including Sources, Blockers, object occupancy, fungi, and the later agreement on a second propagation system. It distinguishes implemented Prototype 1 mechanics from intentionally deferred design decisions.

## Conventions

- **Locked:** An agreed rule for the current design. Changes require an explicit new decision.
- **Agreed future:** A design decision accepted for later implementation, not active in Prototype 1.
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
| **Anchored Source** | A Source that also fixes one selected Property at one selected Condition on its own hex. |
| **Influence** | Something emitted by a Source, propagated to reachable hexes, and applied to its intended target there. |
| **Influence Kind** | A classification of an Influence, usable for selective blocking. |
| **Propagation** | The ordinary, omnidirectional system: Airborne Influences have a finite Range; Waterborne Influences reach all connected Flooded hexes without a numeric Range. |
| **Spread Budget Propagation** | The second, implemented propagation system: the player selects an initial direction, then a Source-specific Movement Rule controls subsequent crossings and possible branching. |
| **Spread Budget** | The total number of successful edge crossings available to one emitted Influence, shared by all of its branches. |
| **Movement Rule** | The Source-specific behavior that chooses a Spread Budget Influence's next edge(s). |
| **Starting Direction** | The one of six outgoing sides selected by the player when configuring a Spread Budget Influence. |
| **Propagation Mode** | The method of travel; currently Airborne or Waterborne. |
| **Range** | The maximum number of adjacent-hex crossings an Influence can traverse. |
| **Blocker** | An object restricting the movement of applicable Influences. |
| **Environmental Adjacency** | A separate, simultaneous one-neighbor environmental adjustment based on extreme Conditions, without Source emissions or chaining. |
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

Normal Source Modifiers remain additive. Environmental Adjacency is a separate, non-stacking calculation, and Anchored Sources explicitly override one local Property/Condition (Section 6B). These do not introduce percentage modifiers or permanent Baseline changes.

## 5. Influences and Sources

### General behavior — locked

- A **Source** can emit **multiple Influences**.
- In Prototype 1, each emitted Influence has an **Influence Kind** and **Propagation Mode**, as well as its defined target and outcome. Ordinary Airborne propagation has a numeric **Range**; ordinary Waterborne propagation is unlimited within connected Flooded networks. Spread Budget Propagation uses its own budget, starting direction, and Movement Rule (Section 6A).
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
- Its separate Influences can have different Kinds, strengths, Modes, and Ranges. Each emission may instead use Spread Budget Propagation.
- Sources are not consumed by emitting Influences.

**Prototype 1 tool:** A **Configurable Source** allows a tester to select its Influence(s), strength(s), Mode(s), Airborne Range(s), or Spread Budget settings without first defining a permanent catalog of fantasy items. Waterborne reach is controlled by Flooded connectivity rather than a Range slider. A Source may be toggled between Regular and Anchored, with its anchor Property and Condition configured independently of its emissions (Section 6B).

## 6. Ordinary Propagation (Airborne Range / Waterborne connectivity) — locked for Prototype 1

### Shared rules

- The Source's own hex is distance **0**.
- Each Airborne crossing to an adjacent hex costs **1 Range**; Waterborne crossings are not subject to a Range budget.
- Influences spread toward all **six** adjacent directions by default.
- Propagation can route **around** obstacles if an alternative valid path exists within Airborne Range or the connected Flooded network.
- If several valid routes lead from the **same Source** to a hex, only the **shortest valid route** matters: a single emission applies **once per hex**, not once per route.
- Separate Sources can reach the same hex and their Modifiers can stack.

### Airborne

- Airborne Influences can traverse adjacent hexes regardless of Material or environmental Condition, unless blocked.
- They require no water connection.
- Airborne Sources have a finite numeric Range, with each crossing costing one.

### Waterborne

- Waterborne Influences travel only through **connected Flooded hexes**.
- **Dry** and **Damp** hexes do not carry Waterborne Influences.
- **Waterborne Influences have no numeric Range limit.** An emission reaches every Flooded hex connected by valid, unblocked Flooded paths. The finite size and topology of the garden, together with matching Blockers, determine reach.
- A Source can inject a Waterborne Influence directly into **any adjacent Flooded hex** even when the Source's own hex is not Flooded; each injected Flooded component can carry it without a distance cap. The Source's own hex is still reached at distance 0.
- If a Flooded connection is broken, propagation cannot continue along that route. Other valid paths may still work.
- Older saved Waterborne emissions with a numeric Range remain loadable; that historical Range is ignored. Newly created Waterborne emissions store no numeric Range.

### Materials and Conditions

| Property or Material | Current propagation role |
| --- | --- |
| Dirt, Sand, Clay, Stone | No differences between Materials. |
| Moisture | **Flooded** permits Waterborne transmission. |
| Fertility | No propagation effect. |
| Temperature | No propagation effect yet. |
| Illumination | No propagation effect. |

In particular, **Freezing Temperature does not currently freeze water or interrupt Waterborne propagation**. A future rule could make frozen water non-flowing, and the existing flooded-connection rule could then naturally stop Waterborne travel. That future behavior is *reserved*, not active.

## 6A. Spread Budget Propagation — implemented Prototype 1 extension

This is a **second propagation system**, not a replacement for the ordinary **Propagation** system in Section 6. Airborne Range, Waterborne Flooded connectivity, shortest valid routes, and blocker behavior remain separate from Spread Budget movement. Waterborne's previously finite Range was explicitly removed on 26 October 2026. Prototype 1 offers both propagation systems per emission.

### Shared behavior — agreed and implemented

- Each emission uses either **ordinary Propagation** (finite Airborne Range or unlimited Flooded-connected Waterborne) or **Spread Budget Propagation**, according to its Source configuration. Different Sources—and potentially different emissions from one Source—may use different systems.
- For a Spread Budget emission, the **player chooses one Starting Direction** from the six sides of the Source hex. The player does **not** choose each subsequent turn or branch.
- Each Source defines a **Movement Rule** for that emission. This rule determines which outgoing edge(s) a moving branch attempts next and what it does when obstructed.
- A Spread Budget is **one shared pool across all branches of one emission**. Each successful crossing of one shared hex edge costs **1** from that pool. Creating two advancing branches across two edges costs **2**, not one per independently replenished branch. An attempted but blocked crossing spends nothing.
- Branches must obey applicable Hex and Edge Blockers: a matching Influence cannot enter a blocked hex or cross a blocked edge. As with existing Influences, ordinary occupied hexes do not automatically block passage.
- Reaching a hex uses the same Influence target and outcome rules as other propagation. One emission from one Source must not apply its outcome repeatedly to the same hex merely because multiple branches reach it.
- Multiple Movement Rules are intended for different Sources. The routing behavior is an attribute of the Source/emission, not a universal rule for all Spread Budget emissions.

### First Movement Rule: Straight Until Blocked — implemented

1. The chosen Starting Direction defines the forward exit from the Source hex.
2. When a branch enters another hex, its **forward exit is opposite the edge it entered through**.
3. If that forward exit is open and leads to a valid adjacent hex, the branch crosses it and continues straight, spending 1 shared Spread Budget.
4. If the forward edge is blocked, the branch attempts to split toward the **two edges immediately adjacent to that forward edge**, one on each side. Each successful outgoing crossing spends 1 from the same shared budget.
5. Each resulting branch repeats this behavior using its own incoming edge to determine its next forward direction.
6. No branch can cross a blocked edge, enter a matching blocked hex, or spend beyond the remaining shared budget.

This rule corresponds to the directional, blocker-deflected branching path in the design sketch discussed on 23 October 2026. A deliberately placed Edge Blocker can therefore **redirect or split** the Influence rather than merely preventing it from reaching a destination.

### Finalized edge-case rules — implemented

- **Shared budget arbitration:** Active branches advance in rounds. Every front proposes its next crossing(s). If the total exceeds the remaining shared budget, choose which crossings advance at random. At a two-way fork with only 1 budget remaining, either valid exit has equal probability.
- **Boundaries and obstacles:** Grid boundaries, matching Hex/Edge Blockers, and already reached destinations all prevent forward crossing; Straight Until Blocked then attempts adjacent exits. Blocked attempts cost nothing.
- **No revisiting:** Each emission remembers its reached hexes. A branch cannot reenter one; simultaneous proposals to the same new hex select one incoming route. An emission applies its outcome to any hex only once.
- **Stable randomness:** A saved route revision seeds every random choice. Recalculations, inspection, overlays, and Baseline edits do not reroll routes. Changes to Sources, Blockers, or grid geometry create new attempts. Removing and replacing the same Blocker permits a different outcome.
- **Source hex:** Reached at cost 0; every subsequent successful edge crossing costs 1.
- **Routed Wetting:** The same signed Moisture Modifier is applied to each reached hex. Routed reach is computed over open terrain, subject to Blockers, without requiring existing Flooded connections. Apply routed Wetting **before** conventional Waterborne traversal so the resulting Flooded hexes can carry Waterborne Influences in the same recalculation.
- **Initial travel-medium compatibility:** Routed emissions currently use open-terrain traversal represented internally as `airborne` for existing selective-by-Mode blocking. This does not establish a final physical travel medium for all future routed Sources.

### Deferred details

- Additional Movement Rules and Source-specific parameters.
- Final Source types, budgets, prices, balance, and time-based changes.
- Other routed traversal restrictions or propagation media.
- Material-specific interactions, variable costs, and Herb/Fungus outcomes.

The route resolver is separate from the React presentation and ships in the CommonJS-compatible rules core.

## 6B. Environmental Adjacency and Anchored Sources — implemented Prototype 1 extension

Environmental Adjacency is an **environmental calculation**, not a new emitted Influence or a substitute for either propagation system. It does not occupy an object slot or spend a Source's Range/Spread Budget. The ordinary Source Modifier system remains additive.

### Environmental Adjacency — locked

- The calculation looks at the **six immediately neighboring hexes**.
- All adjustments use a single, pre-adjacency snapshot of Conditions. Apply them **simultaneously**, once per recalculation. Adjusted Conditions cannot trigger further adjustments in that pass: **no chain reactions**.
- Multiple neighbors at the same extreme trigger a given Property's adjustment **at most once**; their contributions do not stack.
- Opposing extreme Conditions (Hot and Freezing, or Bright and Dark) among the **unblocked neighbors** **cancel** for that target Property, irrespective of their respective counts.
- Extreme target Conditions are **not immune**. An ordinary Hot hex next to a Freezing hex becomes Warm; that Freezing hex becomes Cold, unless other neighbors cause cancellation.
- An adjacency adjustment is distinct from an emitted Source Modifier. The inspector reports it separately.
- **Implemented:** Hex and Edge Blockers prevent matching adjacency effects from crossing in either direction. A Hex Blocker isolates its occupied hex for matching effects; an Edge Blocker stops only the single shared edge it occupies.
- Full Blockers stop every adjacency effect. Selective Kind and Mode Blockers use the **same matching filter** as ordinary propagated Influences.
- Apply blockers **before deciding whether opposing extreme neighbors cancel**. A blocked Hot or Freezing neighbor does not participate, so blocking one side can reveal the influence of the other.

| Property | Trigger in an adjacent hex | Change on the target hex |
| --- | --- | --- |
| Moisture | Flooded | Dry becomes Damp; Damp does not become Flooded. |
| Temperature | Hot | One step warmer, without changing Warm to Hot through adjacency. |
| Temperature | Freezing | One step colder, without changing Cold to Freezing through adjacency. |
| Illumination | Bright | One step brighter, without changing Lit to Bright through adjacency. |
| Illumination | Dark | One step darker, without changing Dim to Dark through adjacency. |
| Fertility | None | No adjacency response. |

#### Transmission tags for selective blockers — locked

| Adjacency effect | Kind | Mode |
| --- | --- | --- |
| Flooded → Damp | Aqueous | Waterborne |
| Hot → warmer / Freezing → colder | Thermal | Airborne |
| Bright → brighter / Dark → darker | Luminous | Airborne |

These tags belong to **the adjacency effect**, not to the Source or Influence that created the triggering Condition. They determine which selective blocker stops the one-hex effect. They **do not invoke Range or Spread Budget movement rules**: Waterborne-tagged Flooded → Damp can affect a neighboring Dry hex without a Flooded transmission path. Adjacency still travels only one shared edge, once, with no chain reactions.

The limits prevent adjacency from **creating new extreme Conditions**; they do not protect existing extremes from a change in the opposite direction. Adjacent Hot and Freezing hexes therefore influence each other unless a matching blocker, an anchor, or cancellation applies.

### Anchored Sources — locked

- Every Source remains a **single object occupying one hex**. Regular Sources retain their current behavior; an Anchored Source is a configurable Source subtype, not an additional occupant.
- An Anchored Source fixes **exactly one selected Property to one selected Condition on its own hex**. Its anchor is independent of its configured emitted Influences, which still use ordinary propagation and blocker rules.
- Incoming Source Modifiers may still reach and pass through the anchored hex, but cannot change its anchored Condition. Environmental Adjacency likewise cannot change the anchored Condition.
- Its other three Properties remain fully reactive, including to adjacency.
- An anchor changes the computed current Condition, **not** the permanent Baseline. Removing the anchor reveals the ordinary recalculated Condition.
- Any defined Condition may be selected, including Flooded, Hot, Dark, or Rich; the system is not restricted to extremes.
- An **Anchored Flooded** Source counts as Flooded when Waterborne connectivity is determined. An anchor is applied before Waterborne traversal and respected in final Conditions.
- Prototype 1 uses the existing Source placement tool with a Regular/Anchored toggle and separate Property/Condition selectors.

### Calculation order — implemented

1. Resolve normal Airborne and routed emissions and their additive Modifiers.
2. Resolve Moisture, honoring any Source anchor on Moisture, and use that snapshot for Waterborne connectivity.
3. Resolve Waterborne emissions and calculate Conditions for all Properties, honoring anchors.
4. Take one simultaneous snapshot of these Conditions and compute Environmental Adjacency only across shared edges permitted by the Kind/Mode-matching Hex and Edge Blockers.
5. Apply capped, non-stacking adjacency adjustments only to non-anchored Properties. The result is the displayed final Conditions.

Adjacency cannot create Flooded hexes, so the adjacency pass does not introduce a Waterborne connectivity feedback loop. Up to six neighbors are considered, but **only across edges allowed by their Kind/Mode-matching Hex and Edge Blockers**. Materials do not filter adjacency yet.

## 7. Blockers — locked

Blockers restrict ordinary propagation and matching one-hex Environmental Adjacency; they do not inherently alter Materials, Properties, Baselines, or Conditions.

### Two placements

| Object | Position | Behavior |
| --- | --- | --- |
| **Hex Blocker** | One hex's object slot | Matching propagated Influences **cannot enter** or cross that hex; matching adjacency cannot enter **or leave** it. |
| **Edge Blocker** | Exactly one shared edge between adjacent hexes | Matching propagated Influences and adjacency effects **cannot cross** that edge, in **either** direction. |

An Edge Blocker on the east side of Hex A is the **same single blocker** as the one on the west side of adjoining Hex B. It does not need to be duplicated. To block more than one side, place more Edge Blockers, one per affected edge. Blocked routes can be bypassed when Range and connectivity allow.

### Two restrictions, available to both placements

- **Full Blocker:** Blocks all emitted Influences and Environmental Adjacency effects.
- **Selective Blocker:** Blocks only propagated Influences or adjacency effects matching the selected **Kind** or **Mode** (for example, Thermal-only or Waterborne-only). Adjacency tags are defined in Section 6B.

The placement type (Hex or Edge) and the restriction type (Full or Selective) are independent. Both ordinary Influences and Adjacency share the same matching filter; only their movement/reachability rules differ.

### Prototype 1 blocker tools — locked

Use **two distinct configurable blocker tools**, because they occupy different grid locations:

1. **Configurable Hex Blocker** — always placed within a hex.
2. **Configurable Edge Blocker** — always placed on one of the six sides of a hex (the shared boundary).

Each tool offers Full or Selective blocking, configured by Kind or Mode. Neither tool creates a new Material or environmental Modifier.

## 8. Fungi, Herbs, and the shared Influence system

### Architectural decisions — agreed

- **Fungi and Herbs are objects** and follow the one-object-per-hex rule.
- **Fungi can themselves be Sources**. “Fungus” describes an object; “Source” describes a capability of that object. This is the same relationship as a Torch being both an object and a Source.
- Future Fungi will use this shared Influence architecture rather than a separate fungal engine. Their emissions can use either Range-based or Spread Budget Propagation, with Source-specific Movement Rules.
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
    Range:  (current Propagation system)
    Alternative — Spread Budget Propagation:
      Spread Budget:
      Starting Direction:
      Movement Rule:
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

1. Start from each Property's **Baseline** and active additive Source Modifiers.
2. Calculate **Airborne Influences** and routed emissions, including any that modify Moisture.
3. Resolve **Moisture Conditions** (including Anchored Moisture) and determine which hexes are **Flooded**.
4. Calculate **Waterborne Influences** using those Flooded connections.
5. Resolve every Property from Baselines and Source Modifiers, honoring one anchored Property/Condition per Anchored Source.
6. Apply the single simultaneous **Environmental Adjacency** pass to non-anchored Properties, without feedback or chaining (Section 6B).

For now, **Waterborne Influences do not modify Moisture**. Otherwise an Influence could create the very Flooded path it needs, which would require new resolution rules. Herb-targeting outcomes, once designed, can be evaluated after their propagation paths are known.

## 10. Prototype 1 — Environmental Sandbox

The prototype tests the **environmental** system before final Herb or Fungus mechanics exist. **Prototype 1 now implements both propagation systems, blocker-aware Environmental Adjacency, and Anchored Sources.**

### Agreed test objects

| Tool | Purpose |
| --- | --- |
| Configurable Source | Test Regular or Anchored Sources, a fixed Property/Condition, and individual or multiple emitted Influences with Range or Spread Budget. |
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
- Attenuation, variable movement costs, extra Propagation Modes, or range extensions along walls/corridors. **Spread Budget Propagation and its first Movement Rule are implemented in the prototype extension (Section 6A).**
- Self-propagating environmental changes and other feedback loops. The implemented one-pass Environmental Adjacency does **not** chain (Section 6B).
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
6. **Second propagation system** recorded on 23 October 2026 and implemented in the prototype extension: preserve Range-based Propagation; add Spread Budget Propagation with a player-selected Starting Direction, Source-specific Movement Rules, and one shared budget across branches.
7. **Straight Until Blocked** is the first implemented Movement Rule: continue through the opposite edge or attempt adjacent exits when obstructed; reproducible random arbitration resolves insufficient budget.
8. **Routed Wetting** uses the ordinary Moisture Modifier and resolves before conventional Waterborne connectivity; it needs no existing Flooded path.
9. **Environmental Adjacency** implemented on 23 October 2026 as a one-pass, non-stacking, cancellable neighbor adjustment affecting Moisture, Temperature, and Illumination; Fertility is excluded.
10. **Anchored Sources** implemented as one-Property/Condition overrides at a Source's own hex; normal Source emissions remain unchanged.
11. **Adjacency-aware Blockers** implemented on 23 October 2026: matching Hex or shared-edge Blockers prevent adjacency transmission in both directions, with Full, Kind, and Mode restrictions. Opposing extremes cancel only after blocked neighbors are excluded.
12. **Unlimited Waterborne reach** approved and implemented on 26 October 2026: ordinary Waterborne emissions traverse every blocker-reachable connected Flooded hex without a Range cap, retaining adjacent-Flooded injection and ignoring old saved numeric Ranges. Airborne Range, directional Spread Budget and one-hex Environmental Adjacency are unchanged.

---

**Design principle:** Keep the vocabulary and propagation consistent. Add new interactions only when they serve an actual cultivation or environmental gameplay purpose.

### Quick reference

**Materials:** Dirt · Sand · Clay · Stone  
**Properties:** Moisture · Fertility · Temperature · Illumination  
**Moisture:** Dry → Damp → Flooded  
**Fertility:** Barren → Poor → Normal → Rich  
**Temperature:** Freezing → Cold → Temperate → Warm → Hot  
**Illumination:** Dark → Dim → Lit → Bright  
**Source Modifier math:** Ordinary base Condition = `clamp(Baseline + sum(active Source Modifiers))`; an Anchored Source fixes one local Condition  
**Propagation:** Ordinary Airborne has finite Range; ordinary Waterborne reaches all connected Flooded hexes with no Range cap. Both obey matching Blockers and apply once per source/hex
**Spread Budget Propagation (implemented extension):** Player-selected Starting Direction; Source-specific Movement Rule; one shared crossing budget across branches; first rule: Straight Until Blocked  
**Environmental Adjacency:** One simultaneous capped neighbor pass; Flooded → Damp, Hot/Freezing ±1 Temperature, Bright/Dark ±1 Illumination; opposite triggers cancel, no stacking or chaining, no Fertility response
**Anchored Source:** Regular Source emission behavior plus one fixed local Property/Condition
**Blocking:** Hex or Edge placement; Full or Selective by Kind/Mode for both propagated Influences and one-hex Environmental Adjacency  
**Occupancy:** At most one object per hex; Edge Blockers occupy shared boundaries  
**Fungi:** Objects that can act as Sources and use the same propagation system
