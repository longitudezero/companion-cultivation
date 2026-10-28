# Fungal roster — parameter-by-parameter editorial audit (27 October 2026)

> **Status:** Pass completed for the **nominal emitted-Effect parameters and source-habitat classes**, with unresolved implementation/numeric questions itemized below. This is a documentation reconciliation of the approved first-pass source, **not a new design approval**. The original files and root README are untouched.

## Coverage and preservation

| Approved source batch | Fungal species | Count | Source of full details |
| --- | --- | ---: | --- |
| §47 | Mycelord | 1 | [Foundational profiles](../superseded-design/fungi/profiles-foundation.md) |
| §48 | Glimmergill, Veilcap, Emberbolete, Chillanterelle | 4 | [Foundational profiles](../superseded-design/fungi/profiles-foundation.md) |
| §49 | Rainmorel, Droughtcap, Prismorel, Rushroom | 4 | [Foundational profiles](../superseded-design/fungi/profiles-foundation.md) |
| §50 | Echomorel, Wakemorel, Hushroom, Sim'mushro'dim | 4 | [Foundational profiles](../superseded-design/fungi/profiles-foundation.md) |
| §53 | Mistruffle, Crumblecap, Quickshade, Tidegill, Frostfolio, Sunspore | 6 | [Alternative profiles](../superseded-design/fungi/profiles-alternatives.md) |
| §54 | Dewmender, Lanterncap, Tickbolete, Rilllace, Duskleaf, Brookrill | 6 | [Alternative profiles](../superseded-design/fungi/profiles-alternatives.md) |
| §55 | Gloamclock, Bristlecap, Goldgill | 3 | [Alternative profiles](../superseded-design/fungi/profiles-alternatives.md) |
| §57 | Fogdial, Emberbell, Siltgill | 3 | [Final additions](../superseded-design/fungi/profiles-final.md) |
| **Total** | | **31** | [Concise 31-species matrix](../superseded-design/fungi/roster-matrix.md) |

The one-row-per-fungus [parameter matrix](../superseded-design/fungi/roster-matrix.md) records the **environmental signed Property step and independent propagation**, **cultivation Effect name/magnitude/window/reach**, **Mycelial class**, and **exact approved §56/§60 supersessions**. All 31 names occur in both the original approved profiles and the new matrix, with no duplicates.

**Profile-table preservation:** The detailed fungal profile files retain the same Markdown table-row counts as before editorial cleanup:

| File | Before | After |
| --- | ---: | ---: |
| Foundational (§§47–50) | 113 | 113 |
| Alternatives (§§53–55) | 93 | 93 |
| Final additions (§57) | 5 | 5 |

The numeric values changed in revised rows were **previously superseded** (e.g. 3-hop Waterborne limits, the unresolved Allocation strength). The changes to those old rows have exact earlier wording in [historical decisions](../superseded-design/superseded-design.md). §57 was previously duplicated in the Fungus lifecycle file; the full original §57 profile body remains in [one authoritative detailed location](../superseded-design/fungi/profiles-final.md), and Fungus lifecycle now links to it.

## High-risk reconciliation results

1. **Five Waterborne cultivation emitters:** Tidegill, Sunspore, Rilllace, Brookrill and Siltgill have **unlimited connected-Flooded reach** (the fifth was introduced after §56). Their environmental emissions keep independently specified Airborne Ranges. Source injection may begin on an adjacent Flooded hex.
2. **Four Allocation emitters:** Frostfolio **80%** and Bristlecap **60%** Leaf-favoring; Sunspore **80%** and Goldgill **60%** Seed-favoring, with the **3:1 Leaf–Seed exchange at harvest only** (§56). Frostfolio alone has the specifically approved **1.25× Mycelial source boost**. Stacking, integer floor, mixed Seed identities and both-stream eligibility are set in §56.
3. **Dependent-Fungus habitat-loss grace:** Rushroom and Siltgill **do not suppress their emissions on losing Mycelial support**. Under §60C, each remains alive and emits **both full-strength Influences** during its continuous species-specific X-hour grace clock; replacement support resets the clock. Their X-hour values are still open.
4. **Mycelord:** Only initial-roster Mycelial creator. No normal environmental/cultivation Effect. Mycelial expansion and retreat follow game time (§63); Flooded immediately cuts support/spread and starts Mycelord's X-hour death countdown (§62).
5. **Transformation use vs cultivation effects:** The profile sections that once said contact assignments were pending now link to the approved §§67,69–76. Named contact is **actual emitted footprint reach** irrespective of stage-specific cultivation effect magnitude (§68). A Fungus does not need to be listed in any named route to remain a valid farming Source.
6. **Source status:** Early 'maybe prefer Mycelial' examples for Emberbolete/Chillanterelle remain **test options**, not approved additional source-strength buffs. Echomorel/Sim'mushro'dim are preferring with boost magnitudes still unspecified; do not extrapolate Frostfolio's 1.25× to them.

## Still requires a design or implementation check

- **Not fully specified in the original source:** Fungus Growth/Sporulation days, Spore yields and germination rates for many species; species-specific X-hour Mycelial grace/death values; source-side magnitude boosts where explicitly left open; continuous curve interpolation and rounding outside fixed §56 formulas.
- **System implementation tests:** Directed Spread Budget, separately blocked Airborne/Waterborne emission paths, dynamically changing Flooded connectivity, timed colony retreat, viable source-side support, seed-time and hourly-production windows, and any same-timestamp event ordering.
- **Layout feasibility:** The 69 approved first-pass recipes have textual pairwise exclusivity arguments, but this documentation pass does not claim to have simulated every valid hex layout, environmental source overlap or Blocker combination.
- **Further prose editing:** Some older examples and status phrases remain in long source-preserving profiles even after the high-priority contradictions were corrected. The untouched giant original is available for paragraph-level comparison.

The [original-to-reorganized comparison](current-vs-original.md), [source crosswalk](source-crosswalk.md), and [supersession risk register](semantic-risks.md) remain the acceptance gates. Do not change the original docs or root README based on this audit alone.
