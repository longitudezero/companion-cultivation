# Randomized fungal roster — V4 environmental assignment

> **Status: WORKING EXPERIMENT — NOT APPROVED OR PLAYABLE.** This is the user's revised full cultivation slate, with one new small-magnitude environmental emission assigned to each of the twelve ordinary Fungi. [V3](random-roster-v3.md) and all earlier drafts remain unchanged as historical design references. **Mycelord remains exactly unchanged** and receives no ordinary environmental or cultivation emission.

## User request and interpretation

- Keep the twelve cultivation-effect bundles **exactly as supplied** in the latest user message (normalizing “−growing Rate” to “−Growth Rate”).
- Give each one ordinary environmental emission with magnitude **1 or 2 Property steps**, positive or negative; no magnitude 3.
- **Pairwise exclusion:** if two Fungi share any *identical cultivation effect*, they must **not** share the same environmental Property **and direction**. Strength does not excuse an overlap: Warming +1 and Warming +2 are the same type for this rule. Warming and Cooling are different types.
- Repeated environmental types remain permitted among Fungi with **no identical cultivation effect**.
- This is an assignment constraint, **not** a decision to change environmental stacking, Source ranges/modes, compatibility, or the user's still-tentative cultivation non-stacking idea.
- The proposed cultivation slate **omits the two Allocation conversions**. This omission is preserved for experimentation, without assuming that retirement has been approved as a final rule.

## Full V4 roster

| Fungus | Environmental emission | Cultivation effects |
| --- | --- | --- |
| **F01** | +1 Moisture (Wetting) | +Germination; +Ripening Rate |
| **F02** | −1 Luminosity (Dimming) | +Leaf Yield; Leaf peak later |
| **F03** | +2 Temperature (Warming) | +Seed Yield; Seed timing later |
| **F04** | −1 Temperature (Cooling) | Seed timing later; Longer Harvest Window |
| **F05** | +1 Luminosity (Brightening) | Leaf peak earlier; Longer Harvest Window |
| **F06** | −1 Moisture (Drying) | -Growth Rate; -Ripening Rate |
| **F07** | −2 Luminosity (Dimming) | +Germination; Longer Harvest Window; -Ripening Rate |
| **F08** | +1 Moisture (Wetting) | Seed timing earlier; -Growth Rate |
| **F09** | +2 Temperature (Warming) | +Leaf Yield; Shorter Harvest Window |
| **F10** | +1 Luminosity (Brightening) | +Growth Rate; +Hourly Leaves; Shorter Harvest Window |
| **F11** | −1 Temperature (Cooling) | +Germination; Leaf peak earlier; +Seed Yield |
| **F12** | −2 Moisture (Drying) | +Hourly Seeds; +Growth Rate; +Ripening Rate |

Environmental distribution: **two Wetting, two Drying, two Warming, two Cooling, two Brightening, and two Dimming**. Every emission is exactly ±1 or ±2 as requested.

## Constraint audit — every repeated cultivation effect

The following table shows **all eleven** cultivation-effect categories that appear in more than one Fungus. Within each row, every environmental effect is different in direction/property, regardless of magnitude.

| Identical cultivation effect | Fungi and environmental types |
| --- | --- |
| -Growth Rate | F06 Drying; F08 Wetting |
| -Ripening Rate | F06 Drying; F07 Dimming |
| +Germination | F01 Wetting; F07 Dimming; F11 Cooling |
| +Growth Rate | F10 Brightening; F12 Drying |
| +Leaf Yield | F02 Dimming; F09 Warming |
| +Ripening Rate | F01 Wetting; F12 Drying |
| +Seed Yield | F03 Warming; F11 Cooling |
| Leaf peak earlier | F05 Brightening; F11 Cooling |
| Longer Harvest Window | F04 Cooling; F05 Brightening; F07 Dimming |
| Seed timing later | F03 Warming; F04 Cooling |
| Shorter Harvest Window | F09 Warming; F10 Brightening |

**Automated pairwise audit:** 15 Fungus pairs share one or more identical cultivation effects; **zero** of those pairs have the same environmental type. This verifies the requested assignment rule across all twelve Fungi, not just the F03/F11 Seed Yield example.

Examples:

- **+ Seed Yield:** F03 is **Warming**, while F11 is **Cooling**.
- **+ Leaf Yield:** F02 is **Dimming**, while F09 is **Warming**.
- **+ Germination:** F01 is **Wetting**, F07 **Dimming**, F11 **Cooling**.
- **Longer Harvest Window:** F04 is **Cooling**, F05 **Brightening**, F07 **Dimming**.
- **+ Growth Rate:** F10 is **Brightening**, F12 **Drying**.

## Open design questions kept separate

1. **Cultivation non-stacking:** The user is considering resolving same-effect cultivation bonuses by strongest active magnitude (e.g. +12% and +20% Leaf Yield yield +20%, not +32%). This has **not** been implemented or finalized, particularly for opposite signs and overlapping production windows.
2. **Whether to retire Allocation:** The latest candidate contains no Leaf↔Seed conversions, but the decision to remove this category permanently is still exploratory.
3. **Multi-Fungus player checks:** The requested non-duplication rule is satisfied; this does not prove that environmental combinations are healthy for all Plants or that named-contact transformations remain possible.
4. **Propagation, species names, Mycelial dependence, numbers and recipes:** These are not assigned or changed. Individual environmental emissions are provisional ±1/±2 values and retain no commitment from older Fungi's ranges, routes or habitats.

**Roster checksum:** 12 anonymous ordinary Fungi; **eight with two cultivation effects and four with three (28 cultivation slots)**; one environmental emission each. Existing approved Fungi, Mycelord, 69 transformations, playable code, saves and Grimoire were not modified.
