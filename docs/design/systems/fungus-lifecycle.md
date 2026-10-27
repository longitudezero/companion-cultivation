# Fungus lifecycle, emissions, and habitat

> **Current approved first-pass design reference.** This page preserves detailed approved source data, quantitative assumptions and exceptions. Later approved shared rules and final family recipes govern where earlier explanatory paragraphs differ; superseded wording is retained in the [historical archive](../history/superseded-design.md). **Plant/Fungus/Mycelial gameplay remains unimplemented.**

## Current shared framework

- Every fungus has **0–100% Growth** followed by **100–200% Sporulation** and produces **its own Spores only**. A single destructive Spore harvest removes the fungus and its emissions.
- Living fungi emit ordinary environmental and/or Plant-development influences from successful germination, throughout both stages, and after 200% while alive. Most ordinary fungi have separate environmental and cultivation effects with independently defined reach. Mycelord is the sole initial dedicated Mycelial producer and emits no ordinary environmental or cultivation effect.
- Habitat categories are **Mycelial-independent**, **Mycelial-preferring**, and **Mycelial-dependent** at the source hex. Dependents retain emissions during the approved timed habitat-loss grace while still alive. Mycelord has its own timed Flooded vulnerability. A receiving Plant need not stand on Mycelial to receive a contacted source's emitted influence.
- Fungus population, Spore economics, species profiles, ranges and individual effects are documented in the [31-Fungus roster](../fungi/README.md). No broader Plant-like fungus maintenance matrix or additional Mycelial-producing species is approved.

## First-pass roster, habitat grace and timed death — pointers

The **31 full fungal species profiles**, including §57's final Fogdial, Emberbell and Siltgill entries, are maintained in the [fungal roster](../fungi/README.md) and [§57 detailed audit](../fungi/profiles-final.md). The full §57 source paragraphs were duplicated here verbatim; the detailed text has been retained once in the fungal profile reference.

- **Ordinary fungal life:** 0–100% Growth, 100–200% Sporulation, immediate living emission from successful germination, continuing beyond 200% until death/harvest, one destructive own-Spore harvest.
- **Dependent source habitat (§60C):** Rushroom and Siltgill need Mycelial on their occupied source hexes at establishment. Loss of that overlay starts an independent continuous **X-hour** death clock **without suppressing either emission while alive**; restoration in time clears the clock. The actual X hours are unassigned.
- **Plant hazards:** Lethal unsuitable Conditions have separately tracked species-specific continuous clocks; merely suboptimal habitats may reduce output without being lethal. [Shared interaction rules](influences-and-responses.md) specify death/Transformation ties and independent clocks.
- **Mycelord's Flooded vulnerability (§62 below):** Flooded prevents source-side colony support immediately but does not instantly kill a living Mycelord. Existing colony contributions retreat through game time (§63).

## 62. Mycelord is vulnerable to Flooded — APPROVED

**Status (26 October 2026):** The user clarified that **Mycelord is weak to Flooded conditions on its own occupied hex and dies after X uninterrupted hours of that exposure**. This resolves the Mycelord-on-Flooded survival question left open in §61, without adding a fungus-wide environmental maintenance matrix.

- **Timed lethal habitat:** A living Mycelord occupying a **Flooded** hex starts its own continuous Flooded-exposure clock. If Flooded persists for its species-specific **X hours**, Mycelord dies and is removed. If its hex becomes Dry or Damp before X expires, the clock resets; future flooding must start a fresh uninterrupted interval. The exact value of X is a later playtest number.
- **APPROVED — direct Flooded germination is allowed:** A Mycelord can germinate successfully on an already **Flooded** hex, subject to the ordinary Spore germination rules. Its uninterrupted **X-hour death countdown begins immediately on germination**. While that occupied hex stays Flooded, it cannot establish or maintain outward Mycelial support or spread; the player can drain the hex before death to enable Mycelial growth and reset the exposure timer. There is **no special Flooded germination prohibition**, and this is not immunity to Flooded after germination.
- **Not Mycelial-dependent:** Mycelord still does **not require Mycelial ground** to establish or remain alive. Its new vulnerability is specifically to **Flooded Moisture**, not the absence of a Mycelial overlay. It retains the ordinary fungal lifecycle and Spores rules.
- **Flooded remains a barrier even while Mycelord survives:** Under §61, a Flooded Source hex cannot relay or anchor **active Mycelial support paths** while Flooded. Thus flooding its own occupied hex cuts its support connections immediately, while any already existing unsupported Mycelial contributions **retreat gradually**, not instantaneously. Other Mycelords and alternative eligible paths can still support affected ground. Draining before death permits its support connectivity to recover and can rescue retreating contributions that have not yet decayed; the death clock also resets.
- **Death is distinct from temporary flooding:** If Mycelord reaches X hours and dies, its own contributions lose their living origin and follow the already approved gradual retirement model, even if the hex later drains. Any overlapping contribution independently supported by another Mycelord remains.
- **Scope:** No Mycelial runtime is implemented by this text rule. Do not silently impose Flooded lethality on every Fungus; it is an approved Mycelord-specific weakness. Exact clock duration, tick-resolution ordering and decay timings remain implementation/playtest details.

---
