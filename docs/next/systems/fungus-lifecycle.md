# Fungus lifecycle, emissions, and habitat

> **Migration draft — not yet authoritative.** The original documents remain unchanged. Detailed source sections are carried over intact in this first pass to prevent losing numbers, edge cases or qualifications. Some inherited progress/status wording still describes earlier design phases; it will be moved into the historical reference during the editorial audit. The later approved recipe sections take precedence where they conflict.

## Current shared framework

- Every fungus has **0–100% Growth** followed by **100–200% Sporulation** and produces **its own Spores only**. A single destructive Spore harvest removes the fungus and its emissions.
- Living fungi emit ordinary environmental and/or Plant-development influences from successful germination, throughout both stages, and after 200% while alive. Most ordinary fungi have separate environmental and cultivation effects with independently defined reach. Mycelord is the sole initial dedicated Mycelial producer and emits no ordinary environmental or cultivation effect.
- Habitat categories are **Mycelial-independent**, **Mycelial-preferring**, and **Mycelial-dependent** at the source hex. Dependents retain emissions during the approved timed habitat-loss grace while still alive. Mycelord has its own timed Flooded vulnerability. A receiving Plant need not stand on Mycelial to receive a contacted source's emitted influence.
- Fungus population, Spore economics, species profiles, ranges and individual effects are documented in the [31-Fungus roster](../fungi/README.md). No broader Plant-like fungus maintenance matrix or additional Mycelial-producing species is approved.

## Source sections for exact approved survival/interaction details

## 57. Coverage / interaction audit, three final first-pass fungi, and survival clarification (APPROVED directions; one Transformation ambiguity OPEN)

**Status (26 October 2026):** After reviewing all 28 approved Fungi against the six approved Plant families, the user accepted **three more first-pass Fungus bundles**: Fogdial, Emberbell and Siltgill. The working roster is now **31 approved candidate Fungi, including sole Mycelial creator Mycelord**, with no requirement to expand further before the next logic pass. These are first-pass strengths/roles, not playtested balance. Plant/Fungus gameplay remains **text-only and unimplemented**. Unlimited Waterborne propagation itself is already implemented in the environmental prototype.

### A. Approved new Fungi and deliberate choices

| Fungus | Environmental Influence | Plant cultivation Influence | Habitat and purpose |
| --- | --- | --- | --- |
| **Fogdial** | **Darkening −1 Illumination**, Luminous / Airborne **Range 2** | **Leaf Peak Timing Shift −6 lifecycle percentage points EARLIER**, Airborne **Range 2**, scaled by the recipient's approved Leaf Peak Timing compatibility | **Mycelial-independent**. Weaker raw earlier shift but longer ordinary cultivation reach than Prismorel's −8/R1, and Darkening rather than Prismorel's directional Brightening. No additional Leaf Yield or extra bloom. |
| **Emberbell** | **Warming +1 Temperature**, Thermal / Airborne **Range 2** | **Leaf Peak Timing Shift +12 lifecycle percentage points LATER**, Airborne **Range 1**, scaled by the recipient's approved Leaf Peak Timing compatibility | **Mycelial-independent**. Stronger later shift with Warming rather than Glimmergill's +8/R1 and Brightening. Can deliberately align an existing Leaf peak with a different fungus's fixed late hourly-production window. No direct Leaf Yield. |
| **Siltgill** | **Drying −1 Moisture**, Aqueous / Airborne **Range 2** | **Leaf Yield +35%** to existing eligible Leaves, **Waterborne UNLIMITED** through connected unblocked Flooded hexes, scaled by recipient Leaf Yield compatibility | **Mycelial-dependent on its occupied source hex**; requires Mycelord's overlay infrastructure and **dies after a species-specific continuous X-hour period without Mycelial**. Its Drying may sever its own Waterborne network, requiring Wetting, Anchors, Blockers or terrain design. Plants receiving its cultivation Influence do **not** need to occupy Mycelial. |

**Siltgill deployment:** A non-Flooded Mycelial source tile can inject its Waterborne Leaf Yield Influence into adjacent Flooded terrain, from which it reaches the full blocker-connected flooded component. Its separate Airborne Drying travels by its own footprint and cannot be assumed to follow the water. Siltgill does **not** itself make Mycelial or Wetting; it is deliberately not a one-species completed high-Leaf farm. Its +35% starting magnitude is intentionally bold and is subject to playtests, not preemptive numerical nerfing.

**Fungus death clarification supersedes the instant-death phrase in the prior audit proposal:** For **Mycelial-dependent Fungi**, loss of Mycelial on the **fungus source hex** begins a continuous **X-hour lethal habitat-exposure countdown**; the Fungus dies when its own threshold is reached, not necessarily immediately. Exact hours, handling of restoration before expiry, and whether emissions remain active or become suppressed during the grace period need the fungus-wide survival/system pass. Do not silently assume instant removal on overlay loss. The old Rushroom suppression/grace-period *proposal* should be reconciled with this general rule, not treated as an approved instant-death exception.

### B. Plant death uses the same timed-hazard principle

**AGREED:** A Plant in a genuinely lethal unsuitable habitat (e.g., too Hot, too Cold, too Wet, or harmful Mycelial for that species) has a **species/condition-specific X-hour exposure period before dying**, instead of automatically dying on entry. This aligns with the previously approved continuous-exposure/hazard tables and special Desert tolerances. Merely **suboptimal** habitat can reduce rates/output without necessarily being lethal; don't turn every deviation from optimal conditions into a death clock. The exact clocks may differ by Plant and hazard, and nonlethal/dormant exceptions remain valid. Re-establishing a viable condition before the threshold ends should clear the corresponding continuous lethal exposure, consistent with the earlier design direction; exact multi-hazard processing order is for the interaction pass.

### C. Roster-audit conclusions the user accepted

1. **Do not fill every stage of the 0–200% progression line.** The absence of hourly Leaf Production in the 125–160% interval is acceptable. Numerous Plants peak there, but no approved Plant's present mechanics demand an exclusive producer in that interval; review only if later transformation access recipes create that requirement. Duskleaf (70–125%) and Echomorel (160–190%) retain their distinct identities.
2. **Duplicate same-direction Leaf Peak Timing:** Fogdial supplements Prismorel's EARLIER shift and Emberbell supplements Glimmergill's LATER shift. Opposite directions alone were not adequate substitutes.
3. **Keep Droughtcap and Rilllace as the Harvest Window options.** Rilllace's Flooded delivery is a useful spatial puzzle, not a reason to force a third Airborne widening fungus. Many Plants can survive being Flooded even with penalties, and Blockers/Wetting provide player-built solutions.
4. **Keep the existing two time-based Seed Production windows for now.** Their limited overlap is acceptable specialization, not a mandatory missing-Effect slot.
5. **Add Leaf-focused Waterborne power separately from the hourly-production gap:** Siltgill supplies strong **Leaf Yield** over a flooded network, with hard Mycelial dependence and an interfering Drying emission.

### D. Transformation is a new Plant; 0% lifecycle reset subsequently APPROVED in §58

**Latest AGREED user principle:** A Transformation creates a **new Plant identity**, not an old Plant continuing to carry its state. **No accumulated hourly Leaves, hourly Seeds, prior dying/death-exposure hours (including Freezing), or other historical transient state survives**. Start every species-specific hazard clock fresh and use the new species' environmental Responses, germination-independent living behavior, curves, Seed identities and compatibility. Do not move historical Seed quantities across species, especially onto a sterile Plant. Earlier suggestions to retain bonus Leaves were **rejected**.

**RESOLVED in §58:** The user explicitly confirmed that a transformed Plant **starts at 0% Growth**. This intentionally supersedes all earlier lifecycle-progress-preserving language in §§5–44 and the prior open question. No state survives, including progress, accumulated products, exposure timers and old species conditions. The rationale is that an early productive Plant (e.g. Leaves from 50–120%) would otherwise miss its entire opportunity if transformed from a predecessor at 150%.

### E. Selective-Blocker clarification and remaining interaction review

The existing environmental system already supports **Full** and **Selective by Kind or Mode** Hex/Edge Blockers. **No new Blocker type is requested**. Future Plant-targeting cultivation emissions merely need explicit **Kind tags** compatible with this existing selector, just as Drying is Aqueous and Warming is Thermal. For example, Siltgill's Aqueous/Airborne Drying and its separately Kind-tagged Waterborne Leaf Yield must be inspected and blocked independently when a matching Kind/Mode rule permits. The exact cultivation Kind vocabulary is **not yet approved**; settle this before implementation rather than assuming all Airborne influences are indistinguishable.

**Further text-only audit priorities:** define signed net stacking/clipping of Leaf Peak Timing shifts (including Rosewraith's two peaks), time-based fractional accumulation and retention until harvest, environmental/Mycelial viability/reach recalculation order, independent lethal hazard timers and Fungus emission during grace, Mycelial spread/retreat and blocker interaction, and the mixed-identity Seed rounding constraints. **Already approved:** once-at-harvest Leaf–Seed Allocation §56 and unlimited connected-Flooded Waterborne propagation; do not reopen them casually. The next work is **logic feasibility, not numerical balancing**.

---

## 62. Mycelord is vulnerable to Flooded — APPROVED

**Status (26 October 2026):** The user clarified that **Mycelord is weak to Flooded conditions on its own occupied hex and dies after X uninterrupted hours of that exposure**. This resolves the Mycelord-on-Flooded survival question left open in §61, without adding a fungus-wide environmental maintenance matrix.

- **Timed lethal habitat:** A living Mycelord occupying a **Flooded** hex starts its own continuous Flooded-exposure clock. If Flooded persists for its species-specific **X hours**, Mycelord dies and is removed. If its hex becomes Dry or Damp before X expires, the clock resets; future flooding must start a fresh uninterrupted interval. The exact value of X is a later playtest number.
- **APPROVED — direct Flooded germination is allowed:** A Mycelord can germinate successfully on an already **Flooded** hex, subject to the ordinary Spore germination rules. Its uninterrupted **X-hour death countdown begins immediately on germination**. While that occupied hex stays Flooded, it cannot establish or maintain outward Mycelial support or spread; the player can drain the hex before death to enable Mycelial growth and reset the exposure timer. There is **no special Flooded germination prohibition**, and this is not immunity to Flooded after germination.
- **Not Mycelial-dependent:** Mycelord still does **not require Mycelial ground** to establish or remain alive. Its new vulnerability is specifically to **Flooded Moisture**, not the absence of a Mycelial overlay. It retains the ordinary fungal lifecycle and Spores rules.
- **Flooded remains a barrier even while Mycelord survives:** Under §61, a Flooded Source hex cannot relay or anchor **active Mycelial support paths** while Flooded. Thus flooding its own occupied hex cuts its support connections immediately, while any already existing unsupported Mycelial contributions **retreat gradually**, not instantaneously. Other Mycelords and alternative eligible paths can still support affected ground. Draining before death permits its support connectivity to recover and can rescue retreating contributions that have not yet decayed; the death clock also resets.
- **Death is distinct from temporary flooding:** If Mycelord reaches X hours and dies, its own contributions lose their living origin and follow the already approved gradual retirement model, even if the hex later drains. Any overlapping contribution independently supported by another Mycelord remains.
- **Scope:** No Mycelial runtime is implemented by this text rule. Do not silently impose Flooded lethality on every Fungus; it is an approved Mycelord-specific weakness. Exact clock duration, tick-resolution ordering and decay timings remain implementation/playtest details.

---
