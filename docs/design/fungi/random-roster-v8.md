# Fungal roster — V8 propagation footprints and five Waterborne cultivation packages

> **Status: ACCEPTED SECOND-PASS WORKING DESIGN, NOT THE LIVE ROSTER.** This V8 carries forward the complete [V7 named, numeric roster](random-roster-v7.md), the same [V6 Mycelial classifications](random-roster-v6.md), and [V4 environmental magnitudes](random-roster-v4.md). On 28 October 2026 the user accepted one **Range** and one **Directional Budget** propagation footprint per ordinary Fungus (one for environment and one for the whole cultivation package), then requested **five Waterborne cultivation packages**, regardless of whether that package uses Range or Budget. **Mycelord remains completely unchanged** and is the sole initial Mycelial creator.

## Full named and numbered roster

| Slot / chosen legacy name | Environmental emission | Cultivation effect 1 | Cultivation effect 2 | Cultivation effect 3 | Mycelial class |
| --- | --- | --- | --- | --- | --- |
| **F01 — Dewmender** | **+1 Moisture** (Wetting) | **+8 pp Germination per planted Seed** | **+20% Ripening Rate** | — | **Independent** |
| **F02 — Mistruffle** | **−1 Luminosity** (Dimming) | **+10% Leaf Yield ordinarily; +30% on Mycelial** | **Leaf peak 10 pp later** | — | **Preferring** |
| **F03 — Emberbolete** | **+2 Temperature** (Warming) | **+10% Seed Yield ordinarily; +30% on Mycelial** | **Seed timing 10 pp later** | — | **Preferring** |
| **F04 — Rilllace** | **−1 Temperature** (Cooling) | **Seed timing 12 pp later** | **+25% relative Harvest Window width** | — | **Independent** |
| **F05 — Prismorel** | **+1 Luminosity** (Brightening) | **Leaf peak 8 pp earlier** | **+25% relative Harvest Window width** | — | **Independent** |
| **F06 — Droughtcap** | **−1 Moisture** (Drying) | **−25% Growth Rate** | **−30% Ripening Rate** | — | **Independent** |
| **F07 — Hushroom** | **−2 Luminosity** (Dimming) | **+6 pp Germination per planted Seed** | **+10% relative Harvest Window width ordinarily; +30% on Mycelial** | **−20% Ripening Rate** | **Preferring** |
| **F08 — Rainmorel** | **+1 Moisture** (Wetting) | **Seed timing 12 pp earlier** | **−15% Growth Rate** | — | **Independent** |
| **F09 — Siltgill** | **+2 Temperature** (Warming) | **+40% Leaf Yield** | **−25% relative Harvest Window width** | — | **Dependent** |
| **F10 — Rushroom** | **+1 Luminosity** (Brightening) | **+25% Growth Rate** | **+0.15 additional Leaves/hour during 140–190% progress** | **−20% relative Harvest Window width** | **Dependent** |
| **F11 — Frostfolio** | **−1 Temperature** (Cooling) | **+6 pp Germination per planted Seed** | **Leaf peak 8 pp earlier** | **+35% Seed Yield** | **Dependent** |
| **F12 — Sim'mushro'dim** | **−2 Moisture** (Drying) | **+0.10 additional Seeds/hour ordinarily; +0.30 on Mycelial, during 140–200% progress** | **+15% Growth Rate** | **+20% Ripening Rate** | **Preferring** |

**Roster checksum:** Twelve named ordinary Fungi, eight with two cultivation effects and four with three (28 cultivation-effect slots), each with exactly one ±1/±2 environmental emission. Three dependent (**Siltgill, Rushroom, Frostfolio**), four preferring (**Mistruffle, Emberbolete, Hushroom, Sim'mushro'dim**), five independent (**Dewmender, Rilllace, Prismorel, Droughtcap, Rainmorel**).

## V8 propagation assignment — one Range, one Budget per Fungus

**Both columns are full source footprints.** `Range N` is an ordinary, non-directional reach pattern; `Budget N` is the alternate directional **Straight Until Blocked** route with N shared successful edge crossings across its entire branch tree. Each Fungus emits **one environmental Influence** with the left footprint and its **entire cultivation package** with the right footprint. No cultivation effect gets a separate budget or extra footprint. Waterborne applies only to the cultivation column for the five marked rows.

| Fungus | Environmental emission footprint | Entire cultivation package footprint |
| --- | --- | --- |
| **F01 — Dewmender** | Airborne **Range 2** (Wetting) | **Waterborne directional Budget 4** — Germination; Ripening Rate |
| **F02 — Mistruffle** | Airborne **Range 2** (Dimming) | **Waterborne directional Budget 4** — Leaf Yield; later Leaf peak |
| **F03 — Emberbolete** | Airborne directional **Budget 3** (Warming) | **Waterborne Range 1** — Seed Yield; later Seed timing |
| **F04 — Rilllace** | Airborne directional **Budget 4** (Cooling) | Airborne **Range 1** — later Seed timing; longer Harvest Window |
| **F05 — Prismorel** | Airborne **Range 2** (Brightening) | Airborne directional **Budget 4** — earlier Leaf peak; longer Harvest Window |
| **F06 — Droughtcap** | Airborne directional **Budget 3** (Drying) | Airborne **Range 1** — slower Growth and Ripening |
| **F07 — Hushroom** | Airborne **Range 1** (Dimming) | Airborne directional **Budget 3** — Germination; longer Harvest Window; slower Ripening |
| **F08 — Rainmorel** | Airborne directional **Budget 4** (Wetting) | **Waterborne Range 1** — earlier Seed timing; slower Growth |
| **F09 — Siltgill** | Airborne **Range 2** (Warming) | Airborne directional **Budget 3** — Leaf Yield; shorter Harvest Window |
| **F10 — Rushroom** | Airborne directional **Budget 3** (Brightening) | **Waterborne Range 1** — faster Growth; hourly Leaves; shorter Harvest Window |
| **F11 — Frostfolio** | Airborne **Range 1** (Cooling) | Airborne directional **Budget 3** — Germination; earlier Leaf peak; Seed Yield |
| **F12 — Sim'mushro'dim** | Airborne **Range 2** (Drying) | Airborne directional **Budget 3** — hourly Seeds; faster Growth and Ripening |

**Checksum:** 12 ordinary Fungi; **12 environmental Airborne footprints** and **12 cultivation footprints**; exactly **one Range and one Budget per Fungus**; **5 Waterborne cultivation packages** (F01, F02, F03, F08, F10), of which **2 use Budget and 3 use Range**; the other **7 cultivation packages are Airborne**. Mycelord is excluded and remains unchanged.

### Why these five received Waterborne cultivation

- **F01**: source Wetting can help create Flooded routes; its Germination and Ripening bonuses become water-access tools. F07 remains an Airborne alternative for Germination.
- **F02**: source-Mycelial-preferring Leaf Yield now reaches across water; dependent F09 gives an Airborne Leaf Yield alternative. The Fungus itself can occupy a non-Flooded Mycelial shore tile and still inject into adjacent Flooded.
- **F03**: source-Mycelial-preferring Seed Yield now reaches across water; dependent F11 gives an Airborne Seed Yield alternative.
- **F08**: source Wetting can establish suitable receiving corridors for earlier Seed timing and Growth slowdown. F04's later Seed timing remains Airborne.
- **F10**: dependent hourly Leaves are constrained by **Mycelial on the Fungus source** and **Flooded connectivity to the Plant**. A non-Flooded Mycelial shore tile adjacent to Flooded can serve as the source; neither the Fungus nor target Plant needs the other's ground type. F12's hourly Seeds remain Airborne.

### Waterborne + Range/Budget rule boundary — explicit proposed extension

**Important discrepancy to implement later:** The currently implemented [first-pass environmental propagation rule](../systems/environment.md) treats ordinary Waterborne as **unlimited across a connected Flooded network (ignoring numeric Range)** and routes **Directional Budgets as Airborne**. Simply labeling the five cultivation packages Waterborne under today's engine would *not* preserve these V8 Range/Budget values. The assignments above therefore require a **new second-pass cultivation delivery interpretation**, not an existing runtime combination:

1. **Waterborne Range N (F03, F08, F10):** Non-directional traversal through adjacent unblocked **Flooded** hexes, capped at N successful crossings from the source. The source counts as reached at distance 0; if the source is not Flooded it may inject directly into adjacent Flooded tiles as in the existing Waterborne rule. This is deliberately *bounded* Waterborne, unlike first-pass unlimited Waterborne.
2. **Waterborne Directional Budget N (F01, F02):** Use the normal **Straight Until Blocked** starting heading, branch choice and shared crossing budget, but allow crossings only into connected unblocked **Flooded** tiles (with the same single injection exception from a non-Flooded source). Waterborne Mode blockers apply. Budget is spent on successful hex crossings, never separately per cultivation effect.
3. **Airborne Range/Budget for all other assignments:** Retain the existing non-directional Range and directional Straight Until Blocked semantics. Routed Airborne modes follow the existing system.
4. **Flooded snapshot:** Resolve Airborne environmental Wetting/Drying (including the Fungus's environmental footprint) before calculating the Waterborne cultivation footprint. Waterborne cultivation does **not** create or delete Flooded tiles by itself. This respects the established environment recalculation order.
5. **Blockers and contacts:** Cultivation Influence Kinds remain individually selectable by effect; Mode blocking checks Airborne versus Waterborne for the chosen package. A Plant has a named Fungus contact whenever **either** its environmental **or** cultivation footprint actually reaches that Plant, even when its cultivation effect is not eligible at that Plant stage. Thus a Fungus's environmental Airborne footprint can satisfy contact even when its Waterborne cultivation package cannot reach.
6. **Directional starting heading:** The previous environmental editor supports a selected heading. Its source for a living Fungus grown from a Spore is still **open**; no new automatic-heading behavior is approved here.

These are **working design semantics for the V8 assignment**, not changes to the first-pass environmental engine. The precise implementation contract, Blocker combination checks and interplay with the 69 existing named-contact Transformations must be audited before coding or promoting V8 into the live roster.

## Names: reused identities, redesigned mechanics

All twelve names above come from the [approved first-pass 31-species parameter matrix](roster-matrix.md). This is **not** a declaration that the names retain their former first-pass habitats, emissions, delivery modes, strengths, time windows, or Transformation contacts. In particular, **Siltgill** keeps its recognizable dependent Leaf-Yield role but changes from the old Drying emission to **+2 Warming**; **Rushroom** keeps the dependent Growth-acceleration identity but now brightens and provides hourly Leaves; **Sim'mushro'dim** keeps hourly Seed production and Mycelial preference but now has Drying rather than Warming. The full old versions remain preserved in the original profiles and matrix.

Selection rationale, not extra mechanics:

- **Dewmender:** Wetting and helping Seed establishment.
- **Mistruffle:** Leaf Yield and a dimming atmosphere.
- **Emberbolete:** Warming and Seed Yield.
- **Rilllace:** Cooling and broadening a harvest window.
- **Prismorel:** Brightening and earlier Leaf peaks.
- **Droughtcap:** Drying and slowing both stages.
- **Hushroom:** Dimming and improved Germination.
- **Rainmorel:** Wetting coupled with reduced Growth speed.
- **Siltgill:** strong, strictly dependent Leaf Yield.
- **Rushroom:** strictly dependent Growth acceleration and hourly Leaves.
- **Frostfolio:** Cooling and a demanding Mycelial-supported three-effect Seed package.
- **Sim'mushro'dim:** Mycelial-preferring hourly Seeds.

Names remain accepted for this **V8 design pass** without a separate approval step, as requested. Naming does not rename any currently implemented species in saves or the Grimoire.

## Numerical semantics (part of this proposal)

1. **Rate adjustments** are changes to progress *speed*: +25% Growth Rate means 1.25× ordinary Growth speed; −25% means 0.75×. +20% Ripening Rate means 1.20×; −30% means 0.70×. Existing positive-progress slowdown floors and Dormancy rules still apply.
2. **Germination pp** modify the *per-Seed chance at sowing* before the Plant's compatibility and 100% cap; they do not modify Fungus Spore germination.
3. **Timing pp** move an existing lifecycle event along the 0–200% progress scale, rather than increasing its output: a peak at 100% with a +10 pp later shift moves to 110%; earlier shifts are negative.
4. **Harvest Window percentage** modifies an existing natural productive window's **relative width**, not absolute progress points and not a separate harvest. +25% changes a 40-pp-wide window to 50 pp; −25% changes it to 30 pp. Widening creates no new peak or second bloom.
5. **Yield percentages** modify eligible *ordinary incrementally earned* Leaves or Seeds prospectively. Ordinary earned Leaf bonuses subsequently follow the Plant's natural Ripening decline; they are distinct from banked hourly production.
6. **Hourly production** is a separately banked extra amount earned per real in-game hour only while the living Fungus reaches a progressing Plant during its fixed source-defined progress window. **Rushroom: 140–190% at +0.15 Leaves/hour. Sim'mushro'dim: 140–200% at +0.10 or +0.30 Seeds/hour.** Zero progress, elapsed windows and dead Fungi earn nothing.
7. **Mycelial preference** checks the **Fungus's occupied source hex**. Only Mistruffle's +Leaf Yield, Emberbolete's +Seed Yield, Hushroom's +Window width, and Sim'mushro'dim's +Hourly Seeds get boosted; no other cultivation or environmental effect receives a universal multiplier. The target Plant does not need Mycelial.
8. **Mycelial dependence** for Siltgill, Rushroom and Frostfolio requires the source hex to have Mycelial for establishment. If support is later lost, keep the existing species-specific grace-then-death rule and full emission strength while alive. Exact grace hours remain a separate parameter.
9. **One propagation footprint per cultivation package:** All two or three cultivation effects of each Fungus use the **same cultivation reach/route**, not an individual Range or Budget per effect. Its **one environmental emission** has its separate footprint. Different cultivation effects retain separate effect Kinds for selective Blockers, subject to the existing Blocker semantics.

## What was and was not considered

- Strengths are calibrated from the **effect type, the bundle of other effects on that Fungus, class/requirements, and the old first-pass numeric scale**, **not from any individual Plant's compatibility multiplier**. If a particular Plant later applies 3× to Leaf Yield, that is the Plant's response, not a reason to reduce Mistruffle or Siltgill.
- The earlier environmental overlap rule still passes unchanged: Fungi sharing an identical cultivation-effect type do not share the same environmental Property + direction, even when their magnitude differs.
- **Open balancing/system decisions:** strongest-only versus additive stacking of identical cultivation Effects; *implementation and final sign-off of the new bounded Waterborne Range/Budget interpretation in V8*; starting direction of routed Fungi after spontaneous germination; specific Fungus lifecycle/spore tuning; grace hours; Plant contact recipes; whether Allocation is permanently retired; and final production playtesting. Numbers are **accepted as a working design**, not immune from future playtest revision.
- **Migration is not authorized here:** The current 31-species implementation and 69 named-contact Plant transformations still refer to existing species. Reusing a name in V8 does not migrate that code or rewrite recipes. All existing approved names/identities remain intact in the live game and first-pass documents until a separately approved implementation/migration.

**No runtime Fungi, Mycelord, Plant profiles, Transformations, Grimoire, save schema, or gameplay code were edited.** These assignments are a draft second-pass design, not a playable migration.
