# Mycelial overlay — habitat, connectivity, and elapsed-time behavior

> **ACTIVE · APPROVED FRAMEWORK — Prototype 16.** Timed Mycelial growth, support, Flooded barriers, retreat and source-side Fungal habitats are implemented. Dated “not implemented” passages below are historical, not current status. See the [V8 roster](../fungi/random-roster-v8.md) and [implementation status](../../implementation-status.md).

**Implementation:** playable timed Mycelial overlay; balancing remains provisional. See also [Fungus lifecycle](fungus-lifecycle.md) and [Simulation and time](simulation-and-time.md).

## 61. Environmental simplification and Flooded Mycelial barrier — APPROVED

**Status (26 October 2026):** The user expressly approved **Flooded as a barrier to Mycelial spread** and requested that **permanent hex Material and Fertility be cut from the game entirely**, because no approved Plant/Fungus gameplay requires them and the remaining garden already has sufficient depth. This supersedes §§7, 9, 14, 19 and earlier provisional references to Dirt/Sand/Clay/Stone, Fertility, or Material-based transformation conditions. The three-Property cleanup is implemented in the existing environmental Prototype 1 (see [Environmental System v1.2](environment.md)); **Plant/Fungus runtime and the timed Mycelial system remain unimplemented**.

### A. Only three environmental Properties; no Base Material

- Every hex has **Moisture** (Dry/Damp/Flooded), **Temperature** (Freezing/Cold/Temperate/Warm/Hot), and **Illumination** (Dark/Dim/Lit/Bright). Remove Fertility, its Barren/Poor/Normal/Rich Conditions, Nutrient Kind, Enrichment/Depletion Sources and the Dirt/Sand/Clay/Stone Material field and brush from the game. Approved first-pass Plant habitat tables continue to work without Material checks; old Sand-related Desert *illustrations* are not recipes.
- Keep **Mycelial** as a future separate temporary state on a hex, not an environment Property or a ground Material replacing some underlying permanent substrate. It may support dependent Fungi and threaten Plants. Multiple Mycelord contributions and their gradual retreat remain (§60F).
- **Enchanted** was already only a deferred/possibly discarded exploratory overlay with no approved first-pass fungus or meaningful current Plant dependency (§19); there is no reason to retain Material-based Enchanted eligibility. Do not implement Enchanted or replace removed Fertility/Material with a substitute mechanic just to preserve an old draft.

### B. Flooded blocks Mycelial colonization and continuing support

- **APPROVED:** A currently **Flooded** hex cannot be newly colonized by Mycelial, cannot relay Mycelial's timed neighboring spread, and cannot serve as a continuous support link between an extant colony and Mycelord. This is a natural environmental barrier, not ordinary Waterborne Influence propagation.
- **Flooding an existing Mycelial area does NOT remove its overlay instantly.** Instead, re-evaluate the Mycelord-to-colony connection: contributions with no alternate permitted support path begin **gradual retreat**, using the approved Blocker-severance model from §60F. Other connected paths and overlapping Mycelords can keep a contribution supported. Drainage before decay completes can restore the path and halt the unsupported retreat.
- This makes Flooded canals useful for containing spreading Mycelial hazards and allows Mycelial-dependent Siltgill on a **non-Flooded Mycelial source hex beside a Flooded network** to inject its separately emitted unlimited Waterborne Leaf-Yield Influence into the canal. The receiving Plant does not need Mycelial. The Mycelial rules **do not impose a numerical Range on Waterborne Influences**.
- With Base Materials removed, there are **no Material-specific Mycelial colonization rules**. Mycelord's later-approved **Flooded lethal-exposure rule, permitted germination on Flooded, and loss of support while its own hex is Flooded** are recorded in §62. Timed colonization and retreat intervals, progress on multiple neighboring fronts, and exact tie/boundary handling remain later details. Do not add an unapproved requirement for Dirt/Sand/Clay/Stone.

### C. Save and scope boundary

Prototype 1 now saves schema v2 with three Baselines and no Material. Supported earlier gardens are migrated: retained garden geometry, valid Sources, anchors and Blockers survive; obsolete Fertility emissions, anchors and Nutrient-only blockers have no remaining role. Original older browser storage is retained separately. The user did **not** authorize implementation of Plants, Fungi, Transformation timers or Mycelial simulation by removing unused environment fields; those stay in the design phase.

---

**Design principle:** Keep a small number of understandable core mechanics and use combinations, placement, propagation, environment, exposure timing, and species-specific Responses to create depth. Preserve the ability to change direction during the text-only design passes without turning brainstorming examples into coded rules.

---

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

---

## 63. Mycelial expansion and retreat advance with game time — APPROVED

**Status (26 October 2026):** The user expressly approved that **Mycelial expansion and retreat are genuinely time-based, independent of how often the environment is recalculated**. This clarifies the already-approved timed colonization (§60F) and gradual withdrawal after Flooding, Blocker severance or Mycelord removal (§§60–62).

- **Expansion takes elapsed game time:** Establishing an eligible path, removing a Blocker, or draining a Flooded hex **does not instantly colonize** previously non-Mycelial ground. New hexes are added by the timed, neighboring spread process from an eligible supported front.
- **Retreat takes elapsed game time:** Cutting a live support path immediately makes the affected contribution **unsupported and unable to expand**, but does not instantly erase the overlay. Its gradual retreat advances only as simulated time passes, according to the previously approved supported-connection and source-contribution rules.
- **Recovery preserves surviving ground:** Restoring a valid connection before a contribution actually retreats halts its pending retreat and preserves still-existing Mycelial. Previously removed ground must be **recolonized through normal timed expansion**; reconnection does not instantly fill gaps.
- **Recalculation is not a clock tick:** Recomputing the environment or toggling Flooding/Blockers repeatedly at the same simulated time cannot advance a colonization or retreat clock, create free Mycelial, or force an instant collapse. Connectivity changes determine which clocks are eligible to run; **elapsed in-game time** determines how far they run.
- **Still open:** Exact spread and retreat durations, and ordering between several fronts with equal completion times. The **broader Plant/Fungus/environment event-resolution order was subsequently approved in §64**. No Mycelial runtime was added.

---

**Fungal contact clarification:** Mycelial-dependent fungal sources can contact a Plant outside Mycelial through ordinary influence reach. See [Woodlands §72](../plants/woodlands.md) for the approved example.
