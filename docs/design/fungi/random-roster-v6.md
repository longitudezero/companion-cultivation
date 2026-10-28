# Randomized fungal roster — V6 Mycelial classes locked for design review

> **Status: WORKING DESIGN — MYCELIAL CLASS ASSIGNMENTS ACCEPTED, NOT APPROVED FOR PLAYABLE MIGRATION.** This pass locks the user's selected source-side habitat roles within the twelve-Fungus redesign. It keeps all cultivation and environmental effects from [V4](random-roster-v4.md) exactly intact, and preserves the exploratory [V5 proposal](random-roster-v5.md) as history. **Mycelord remains exactly unchanged** as the only initial creator of Mycelial ground.

## Accepted habitat split

| Class | Count | Ordinary Fungi | Rule |
| --- | ---: | --- | --- |
| **Dependent** | **3** | **F09, F10, F11** | Needs Mycelial ground on its **own source hex** to establish; if support disappears later, the existing species-specific grace-then-death rule applies. |
| **Preferring** | **4** | **F02, F03, F07, F12** | Can establish and work without Mycelial ground; a **specific positive cultivation bonus** is stronger while its source hex has Mycelial support. |
| **Independent** | **5** | **F01, F04, F05, F06, F08** | Does not require Mycelial and receives no special cultivation boost from it. |

This is a **3 / 4 / 5 split among the 12 ordinary Fungi**. Mycelord is separate and unchanged. These **classifications are accepted for this working roster**; their eventual implementation, numeric magnitudes and reach are not.

## Complete V6 roster (all twelve visible)

| Fungus | Environmental emission | Cultivation effects | Mycelial class | Preferred boost, if any |
| --- | --- | --- | --- | --- |
| **F01** | +1 Moisture (Wetting) | +Germination; +Ripening Rate | Independent | — |
| **F02** | −1 Luminosity (Dimming) | +Leaf Yield; Leaf peak later | **Preferring** | **+Leaf Yield only** |
| **F03** | +2 Temperature (Warming) | +Seed Yield; Seed timing later | **Preferring** | **+Seed Yield only** |
| **F04** | −1 Temperature (Cooling) | Seed timing later; Longer Harvest Window | Independent | — |
| **F05** | +1 Luminosity (Brightening) | Leaf peak earlier; Longer Harvest Window | Independent | — |
| **F06** | −1 Moisture (Drying) | −Growth Rate; −Ripening Rate | Independent | — |
| **F07** | −2 Luminosity (Dimming) | +Germination; Longer Harvest Window; −Ripening Rate | **Preferring** | **Longer Harvest Window only** |
| **F08** | +1 Moisture (Wetting) | Seed timing earlier; −Growth Rate | Independent | — |
| **F09** | +2 Temperature (Warming) | +Leaf Yield; Shorter Harvest Window | **Dependent** | Not a preference boost; needs Mycelial |
| **F10** | +1 Luminosity (Brightening) | +Growth Rate; +Hourly Leaves; Shorter Harvest Window | **Dependent** | Not a preference boost; needs Mycelial |
| **F11** | −1 Temperature (Cooling) | +Germination; Leaf peak earlier; +Seed Yield | **Dependent** | Not a preference boost; needs Mycelial |
| **F12** | −2 Moisture (Drying) | +Hourly Seeds; +Growth Rate; +Ripening Rate | **Preferring** | **+Hourly Seeds only** |

No environmental emission or cultivation-effect pairing has changed. Thus V4's rule still holds: two Fungi with an identical cultivation effect never have the same environmental emission direction/property.

## Preferred-bonus behavior and illustrative tuning

Mycelial preference is intended to make a Fungus **useful on ordinary ground, more rewarding on Mycelial ground**, without making the underlying effect inaccessible.

| Preferring Fungus | Normal ground: illustration | Source on Mycelial: illustration | Effects that stay at their ordinary strength |
| --- | --- | --- | --- |
| **F02** | +10% Leaf Yield | +30% Leaf Yield | Leaf peak later |
| **F03** | +10% Seed Yield | +30% Seed Yield | Seed timing later |
| **F07** | +10% Harvest Window duration | +30% Harvest Window duration | +Germination; −Ripening Rate |
| **F12** | +0.10 additional Seeds/hour | +0.30 additional Seeds/hour | +Growth Rate; +Ripening Rate |

**All figures above are examples, not locked balance values.** The user's 10% → 30% illustration motivates the distinction, not a universal 3× multiplier. Final magnitudes, time-window interpretations, source ranges, compatibility and boost transition timing still need separate tuning.

**Only the named positive bonus is amplified.** Negative effects, other cultivation effects, and environmental emissions are **not** automatically multiplied merely because the source is on Mycelial ground. For F12, hourly production is an additional Seeds-per-hour rate, so it must be tuned in that unit rather than as a percentage of Seed Yield. The target Plant hex itself does **not** need Mycelial ground for the preference.

## Why these choices still offer alternatives

- **Leaves:** F02 gives accessible baseline +Leaf Yield with a stronger Mycelial version; F09 has +Leaf Yield but is **strictly dependent** and adds a shorter Harvest Window. F10's unique +Hourly Leaves route is also dependent. Test their strengths carefully so enhanced F02 does not make F09 pointless, especially if strongest-only identical-effect stacking is adopted.
- **Seeds:** F03 offers baseline +Seed Yield, improving on Mycelial; F11 is the dependent alternative combining +Seed Yield, +Germination and earlier Leaf peak. F12's +Hourly Seeds route remains accessible everywhere, but rewards Mycelial with higher hourly production.
- **Harvest timing:** F07's longer window strengthens on Mycelial, while its −Ripening Rate **does not** strengthen; F04 and F05 still offer independent longer-window alternatives. Remember that Ripening is the late period when natural Leaves decline as Seeds accumulate: extending time there can aid hourly accumulation without automatically increasing natural Leaves.

## Boundaries and unresolved decisions

1. **Locked for this V6 design pass:** F09/F10/F11 dependent; F02/F03/F07/F12 preferring; the five remaining independent. These choices express the user's current design direction, **not a claim that gameplay was changed**.
2. **Unchanged:** all twelve V4 cultivation bundles and ±1/±2 environmental emissions; Mycelord; source-side Mycelial habitat principle and existing dependent grace rule.
3. **Still open:** exact bonuses, dependent-vs-preferring balance, propagation/reach, plant compatibility, species names, all transformation routes, source-on/off boost transition details, and whether identical cultivation effects will use strongest-only rather than additive stacking.
4. **Still exploratory:** retirement of Allocation effects and the final number of ordinary Fungi. Twelve is a working full-roster experiment, not a mandated launch count.

The current playable **31-Fungus** roster, **69 transformation routes**, Grimoire, saves and game code are untouched by this document. Earlier draft versions remain available as references.
