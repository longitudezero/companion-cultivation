# Final fungal additions and interactions

> **Migration draft — not yet authoritative.** The original documents remain unchanged. Detailed source sections are carried over intact in this first pass to prevent losing numbers, edge cases or qualifications. Some inherited progress/status wording still describes earlier design phases; it will be moved into the historical reference during the editorial audit. The later approved recipe sections take precedence where they conflict.

**Exact detailed approved source sections:** §57. [Fungal roster index](README.md) · [Common lifecycle](../systems/fungus-lifecycle.md).

## 57. Coverage / interaction audit, three final first-pass fungi, and survival clarification (APPROVED; Transformation reset resolved in §58)

**Approved first-pass roster:** **31 species**, including sole Mycelial creator Mycelord and final additions **Fogdial, Emberbell and Siltgill**. Those last three profiles and emission parameters are approved (§57), but exact lifecycle/Spore numbers and real setup feasibility remain untested. The Plant-owned 69-route recipe pass is now complete in the family files; no biology game code has been implemented.

### A. Approved new Fungi and deliberate choices

| Fungus | Environmental Influence | Plant cultivation Influence | Habitat and purpose |
| --- | --- | --- | --- |
| **Fogdial** | **Darkening −1 Illumination**, Luminous / Airborne **Range 2** | **Leaf Peak Timing Shift −6 lifecycle percentage points EARLIER**, Airborne **Range 2**, scaled by the recipient's approved Leaf Peak Timing compatibility | **Mycelial-independent**. Weaker raw earlier shift but longer ordinary cultivation reach than Prismorel's −8/R1, and Darkening rather than Prismorel's directional Brightening. No additional Leaf Yield or extra bloom. |
| **Emberbell** | **Warming +1 Temperature**, Thermal / Airborne **Range 2** | **Leaf Peak Timing Shift +12 lifecycle percentage points LATER**, Airborne **Range 1**, scaled by the recipient's approved Leaf Peak Timing compatibility | **Mycelial-independent**. Stronger later shift with Warming rather than Glimmergill's +8/R1 and Brightening. Can deliberately align an existing Leaf peak with a different fungus's fixed late hourly-production window. No direct Leaf Yield. |
| **Siltgill** | **Drying −1 Moisture**, Aqueous / Airborne **Range 2** | **Leaf Yield +35%** to existing eligible Leaves, **Waterborne UNLIMITED** through connected unblocked Flooded hexes, scaled by recipient Leaf Yield compatibility | **Mycelial-dependent on its occupied source hex**; requires Mycelord's overlay infrastructure and **continues emitting at full strength while alive during its species-specific X-hour habitat-loss grace period** (§60C), dying when that uninterrupted clock expires. Its Drying may sever its own Waterborne network, requiring Wetting, Anchors, Blockers or terrain design. Plants receiving its cultivation Influence do **not** need to occupy Mycelial. |

**Siltgill deployment:** A non-Flooded Mycelial source tile can inject its Waterborne Leaf Yield Influence into adjacent Flooded terrain, from which it reaches the full blocker-connected flooded component. Its separate Airborne Drying travels by its own footprint and cannot be assumed to follow the water. Siltgill does **not** itself make Mycelial or Wetting; it is deliberately not a one-species completed high-Leaf farm. Its +35% starting magnitude is intentionally bold and is subject to playtests, not preemptive numerical nerfing.

**Current approved dependent-Fungus habitat rule (§§57,60C):** Loss of Mycelial on Rushroom's or Siltgill's **occupied fungus source hex** starts its species-specific continuous X-hour lethal clock but does **not** instantly remove or suppress it. The living Fungus continues emitting **both ordinary Influences at full normal strength** throughout that grace interval. Restoring Mycelial before expiry clears the clock; expiry kills the Fungus and removes all emissions. The X-hour thresholds remain unspecified for a future numeric pass. This supersedes the old instant-death and suppress-on-loss proposals.

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

**Remaining implementation verification:** The approved signed peak-shift stacking, prospective Yield and hourly accrual, death-versus-Transformation priority, **emissions through dependent-Fungus grace (§60C)**, timed Mycelial spread/retreat (§63), and 3:1 Allocation (§56) need **tests against executable event order (§64)**. Numeric clocks and curve interpolation remain undecided; these interactions are approved rules, not fresh proposals.
