# Fungal roster — V7 accepted names and cultivation magnitudes

> **Status: ACCEPTED SECOND-PASS WORKING DESIGN, NOT THE LIVE ROSTER.** The user accepted the complete twelve-Fungus numeric proposal on 28 October 2026 and authorized selecting names directly from the original thirty ordinary species. This version names every candidate and records **exact proposed cultivation strengths**, fixed hourly-production windows, the [V6 Mycelial classifications](random-roster-v6.md), and the unchanged [V4 environmental emissions](random-roster-v4.md). **Mycelord remains exactly as before**: separate, unchanged, and the sole initial Mycelial creator.

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

## Names: reused identities, redesigned mechanics

All twelve names above come from the [approved first-pass 31-species parameter matrix](../superseded-design/fungi/roster-matrix.md). This is **not** a declaration that the names retain their former first-pass habitats, emissions, delivery modes, strengths, time windows, or Transformation contacts. In particular, **Siltgill** keeps its recognizable dependent Leaf-Yield role but changes from the old Drying emission to **+2 Warming**; **Rushroom** keeps the dependent Growth-acceleration identity but now brightens and provides hourly Leaves; **Sim'mushro'dim** keeps hourly Seed production and Mycelial preference but now has Drying rather than Warming. The full old versions remain preserved in the original profiles and matrix.

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

Names are accepted for this **V7 design pass** without a separate approval step, as requested. Naming does not rename any currently implemented species in saves or the Grimoire.

## Numerical semantics (part of this proposal)

1. **Rate adjustments** are changes to progress *speed*: +25% Growth Rate means 1.25× ordinary Growth speed; −25% means 0.75×. +20% Ripening Rate means 1.20×; −30% means 0.70×. Existing positive-progress slowdown floors and Dormancy rules still apply.
2. **Germination pp** modify the *per-Seed chance at sowing* before the Plant's compatibility and 100% cap; they do not modify Fungus Spore germination.
3. **Timing pp** move an existing lifecycle event along the 0–200% progress scale, rather than increasing its output: a peak at 100% with a +10 pp later shift moves to 110%; earlier shifts are negative.
4. **Harvest Window percentage** modifies an existing natural productive window's **relative width**, not absolute progress points and not a separate harvest. +25% changes a 40-pp-wide window to 50 pp; −25% changes it to 30 pp. Widening creates no new peak or second bloom.
5. **Yield percentages** modify eligible *ordinary incrementally earned* Leaves or Seeds prospectively. Ordinary earned Leaf bonuses subsequently follow the Plant's natural Ripening decline; they are distinct from banked hourly production.
6. **Hourly production** is a separately banked extra amount earned per real in-game hour only while the living Fungus reaches a progressing Plant during its fixed source-defined progress window. **Rushroom: 140–190% at +0.15 Leaves/hour. Sim'mushro'dim: 140–200% at +0.10 or +0.30 Seeds/hour.** Zero progress, elapsed windows and dead Fungi earn nothing.
7. **Mycelial preference** checks the **Fungus's occupied source hex**. Only Mistruffle's +Leaf Yield, Emberbolete's +Seed Yield, Hushroom's +Window width, and Sim'mushro'dim's +Hourly Seeds get boosted; no other cultivation or environmental effect receives a universal multiplier. The target Plant does not need Mycelial.
8. **Mycelial dependence** for Siltgill, Rushroom and Frostfolio requires the source hex to have Mycelial for establishment. If support is later lost, keep the existing species-specific grace-then-death rule and full emission strength while alive. Exact grace hours remain a separate parameter.
9. **Distinct cultivation emissions and environmental emission** may use different source propagation footprints and selective Blocker Kinds/modes, as in the first-pass system; V7 does **not** invent new ranges or modes.

## What was and was not considered

- Strengths are calibrated from the **effect type, the bundle of other effects on that Fungus, class/requirements, and the old first-pass numeric scale**, **not from any individual Plant's compatibility multiplier**. If a particular Plant later applies 3× to Leaf Yield, that is the Plant's response, not a reason to reduce Mistruffle or Siltgill.
- The earlier environmental overlap rule still passes unchanged: Fungi sharing an identical cultivation-effect type do not share the same environmental Property + direction, even when their magnitude differs.
- **Open balancing/system decisions:** strongest-only versus additive stacking of identical cultivation Effects; final ranges, modes and geometry; specific Fungus lifecycle/spore tuning; grace hours; Plant contact recipes; whether Allocation is permanently retired; and final production playtesting. Numbers are **accepted as a working design**, not immune from future playtest revision.
- **Migration is not authorized here:** The current 31-species implementation and 69 named-contact Plant transformations still refer to existing species. Reusing a name in V7 does not migrate that code or rewrite recipes. All existing approved names/identities remain intact in the live game and first-pass documents until a separately approved implementation/migration.

**No runtime Fungi, Mycelord, Plant profiles, Transformations, Grimoire, save schema, or gameplay code were edited.**
