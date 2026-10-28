# Fungal roster — V9 accepted second-pass Plant Transformation recipes

> **Status: ACCEPTED FOR SECOND-PASS DESIGN (28 October 2026); NOT YET IMPLEMENTED IN THE PLAYABLE GAME.** The user explicitly locked these **69 new recipes** after reviewing the complete six-family slate. This V9 builds on the [accepted V8 twelve-Fungus names, effects, Mycelial classes and propagation footprints](random-roster-v8.md). All V0–V8 drafts and the existing [first-pass Plant family recipe pages](../README.md#plant-families) are preserved. **Mycelord is unchanged.**
>
> **Authority boundary:** For the **planned twelve-Fungus redesign**, the complete tables below supersede the old 69 *recipe conditions and fungal contacts*. For **what currently runs**, the existing 31-Fungus catalog and 69 first-pass recipes still apply until an explicit implementation/migration pass. This document is not a code or save-format migration.

## Locked transformation rules

1. **Resolve the target Plant hex first.** A recipe reads the hex's **final resolved Moisture, Temperature and Illumination states**, and qualifying state changes, after every applicable environmental influence has been combined. No recipe asks which emitter made the hex Damp/Warm/Lit or checks an exact +1/−1 emission, sign, magnitude, number of effects, or an opposing-emissions overlap. Players can combine any number of sources to reach the state.
2. **Named living Fungus contact is still mandatory on every route.** The column `Required named contact` is an *additional* predicate, separate from the environmental state. At the required time, each named Fungus must be alive and have at least one actual influence footprint—**environmental or cultivation**—reaching the Plant hex. Adjacency alone is not contact. An `AND` demands both named species; an `OR` allows either. A source-dependent species must be established/alive on **source-hex Mycelial** per V8; the receiving Plant's hex need not be Mycelial.
3. **Contacts do not have to cause the state.** A named Fungus can qualify by reaching through its cultivation package even if its environmental footprint does not reach, or by its environmental footprint even if its cultivation package cannot reach. Selective Blockers, initial Range/Budget footprints, and Waterborne rules still apply. A source's individual cultivation effect need not be active at the Plant's current lifecycle percentage for its footprint to constitute contact.
4. **Ordinary rows require continuous exposure.** The named contact predicate and every listed resolved hex state must hold **together, uninterrupted**, for the stated time. Losing any required contact or state resets that recipe's timer. An `OR` stays satisfied when at least one listed name remains continuously reaching; a seamless supplier switch does not create a gap. Unspecified environmental axes are unconstrained, not implicit extra conditions.
5. **Special event rows** specify a qualifying *pre-event interval*, an actual state/contact transition, and the exact contact needed **at the event**, instead of an ordinary continuous-state completion. Evaluate eligible pre-event history immediately before the transition clears old exposure clocks. Post-transition states are checked from the resolved arriving hex; contacts explicitly restricted to the pre-event phase need not survive the event.
6. **No lifecycle stage gate.** A Transformation can occur at any 0–200% Plant progress, independent of Growth/Ripening stage. On success, replace the old Plant with the destination at **fresh 0% Growth**, clearing previous timers, output and transient hazards. It cannot chain recursively within the same resolution event. The established Transformation/death exact-timestamp tie still favors Transformation.
7. **No competing-route priority.** Sibling recipes are designed to be mutually exclusive by resolved environmental state or incompatible event histories. The runtime must not silently choose between simultaneous successful destinations; any discovered overlap goes back to design review.
8. **Waterborne contact is unlimited across connected Flooded hexes.** Per V8, a Waterborne cultivation package first reaches an initial Range/Budget footprint. If it touches any Flooded hex, it extends through **every unblocked hex in that connected Flooded network, with no Range/Budget limit**. Different disconnected Flooded networks are not automatically connected. Environmental emissions remain Airborne. This informs contact feasibility, but no recipe tests for a specific propagation mode.

**Names and boundaries:** `Woodlands Base` and `Aquatic Base` are the intentionally unnamed first-pass Base Plant identities, not newly invented species. These are **Plant-owned** recipes: the Fungi provide contact and ordinary influences, not a special Transformation emission. All first-pass destination identities and route topology are retained; none of the old 31-species contact names is grandfathered merely to preserve a historical recipe.

## Complete V9 recipes

Each table lists **Source → Destination**, the required **resolved target-hex state/event**, the separate **named Fungus contact**, and the exposure duration or event trigger. Rows with a pre-event phase are expanded below to remove any timing ambiguity.

### Ingredients (6 routes)

The six Potato spokes remain the simplest introductions to named contacts. All six terminal Ingredients have no outgoing transformations.

| Source Plant | Destination Plant | Required resolved hex state / event | Required named contact | Continuous exposure or trigger |
| --- | --- | --- | --- | --- |
| Potato | **Rice** | Flooded | Dewmender | 12 h |
| Potato | **Carrot** | Damp, Temperate, Lit | Prismorel | 10 h |
| Potato | **Onion** | Dry, Cold | Droughtcap | 14 h |
| Potato | **Apple** | Damp, Cold | Rilllace | 20 h |
| Potato | **Pumpkin** | Damp, Warm | Emberbolete | 24 h |
| Potato | **Strawberry** | Damp, Temperate, Bright | Rainmorel | 16 h |

### Woodlands (13 routes)

Retains the bamboo progression, Mistlefoe contact-loss fork, and Mandrakadabra's dangerous Bright-state destination.

| Source Plant | Destination Plant | Required resolved hex state / event | Required named contact | Continuous exposure or trigger |
| --- | --- | --- | --- | --- |
| Woodlands Base | **Bamboom** | Damp, Warm, Lit | Emberbolete | 14 h |
| Woodlands Base | **Mandrabra** | Damp, Temperate, Lit | Prismorel | 20 h |
| Woodlands Base | **Tanglethorn** | Damp, Temperate, Dim | Mistruffle | 12 h |
| Bamboom | **Bamboozeling** | Damp, Warm | Rainmorel | 24 h |
| Bamboozeling | **Bamboozled** | Damp, Warm | Emberbolete **AND** Rainmorel | 16 h |
| Tanglethorn | **Mistlefoe** | Damp, Temperate, Dim | Hushroom | 16 h |
| Tanglethorn | **Bramblewraith** | Damp, Temperate, Lit | Prismorel **AND** Droughtcap | 28 h |
| Mistlefoe | **Mandrabra** | Damp, Dim; contact-loss event after a qualifying exposure of 12 h to less than 20 h | Mistruffle **AND** Dewmender before event; Mistruffle contact lost while Dewmender remains | 12–<20 h, then event |
| Mistlefoe | **Mistlewoe** | Damp, Dim | Mistruffle **AND** Dewmender | 20 h |
| Mistlewoe | **Tanglethorn** | Damp, Temperate, Lit | Rainmorel | 12 h |
| Mandrabra | **Mandrakadabra** | Damp, Bright | Rushroom **OR** Siltgill | 12 h |
| Mandrabra | **Mandrakazam** | Damp, Temperate, Dim | Hushroom | 24 h |
| Mandrakadabra | **Mandrakazam** | Damp, Temperate, Dim | Mistruffle | 24 h |

### Aquatic (14 routes)

Retains the Flooded-versus-drained forks, Starlotus's two route-specific attunements, and Pearlily's independent paths.

| Source Plant | Destination Plant | Required resolved hex state / event | Required named contact | Continuous exposure or trigger |
| --- | --- | --- | --- | --- |
| Aquatic Base | **Kelpfull** | Flooded, Temperate | Dewmender | 12 h |
| Aquatic Base | **Sunken Lotus** | Flooded, Cold | Rilllace | 16 h |
| Aquatic Base | **Wild Watercress** | Damp, Temperate | Rainmorel | 10 h |
| Kelpfull | **Kelpergeist** | Flooded, Dark | Hushroom | 20 h |
| Kelpfull | **Kelpless** | Not Flooded (Dry or Damp) | Droughtcap | 16 h |
| Kelpergeist | **Starlotus** | Flooded, Cold, Dim | Frostfolio **AND** Mistruffle | 28 h |
| Kelpergeist | **Kelpless** | Not Flooded (Dry or Damp) | Sim'mushro'dim | 18 h |
| Kelpless | **Wild Watercress** | Damp, Temperate | Dewmender | 12 h |
| Sunken Lotus | **Moonlit Lotus** | Flooded, Dim | Mistruffle | 16 h |
| Moonlit Lotus | **Starlotus** | Flooded, Cold, Dim throughout exposure, then **Flooded → Damp** | Rainmorel throughout pre-drain exposure | 24 h, then drainage event |
| Moonlit Lotus | **Pearlily** | Flooded, Temperate, Lit (must remain Flooded) | Prismorel **AND** Dewmender | 24 h |
| Wild Watercress | **Silvercress** | Flooded, Temperate | Rainmorel | 10 h |
| Wild Watercress | **Cresscent** | Damp, Dim | Mistruffle | 12 h |
| Cresscent | **Pearlily** | Damp, Lit | Sim'mushro'dim | 12 h |

### Flowers (12 routes)

Retains both Orchidemon and Rosewraith access paths, including the Daisyspell dusk-to-bright transition.

| Source Plant | Destination Plant | Required resolved hex state / event | Required named contact | Continuous exposure or trigger |
| --- | --- | --- | --- | --- |
| Daisydaze | **Charmomile** | Damp, Temperate, Lit | Prismorel | 12 h |
| Daisydaze | **Lavendream** | Damp, Temperate, Dim | Mistruffle | 20 h |
| Daisydaze | **Poppycock** | Damp, Warm, Bright | Emberbolete | 16 h |
| Charmomile | **Daisyspell** | Damp, Warm, Bright | Prismorel | 12 h |
| Charmomile | **Marigloom** | Damp, Cold, Dim | Rilllace | 24 h |
| Lavendream | **Lavendread** | Damp, Cold, Dark | Rilllace **AND** Hushroom | 22 h |
| Lavendream | **Orchidemon** | Damp, Warm, Bright | Siltgill **AND** Prismorel | 32 h |
| Daisyspell | **Orchidemon** | Damp, Temperate, Dim for 10 h; leave Dim and reach Bright within 8 h | Mistruffle during Dim exposure; Prismorel at Bright completion | 10 h + ≤8 h transition |
| Lavendread | **Dream Poppy** | Damp, Cold, Dim | Rilllace **OR** Frostfolio | 20 h |
| Poppycock | **Dream Poppy** | Damp, Temperate, Dim | Hushroom | 18 h |
| Marigloom | **Rosewraith** | Damp, Cold, Dim | Rilllace **AND** Mistruffle | 18 h |
| Dream Poppy | **Rosewraith** | Damp, Temperate, Dim | Rushroom **AND** Mistruffle | 24 h |

### Desert (13 routes)

Retains the Ember Aloe 36-hour temperature fork and Moonjade's 48-hour freezing/thaw fork.

| Source Plant | Destination Plant | Required resolved hex state / event | Required named contact | Continuous exposure or trigger |
| --- | --- | --- | --- | --- |
| Jadeheart | **Ember Aloe** | Damp, Hot, Lit | Emberbolete | 18 h |
| Jadeheart | **Moonjade** | Damp, Freezing, Dim | Rilllace **OR** Frostfolio | 20 h |
| Jadeheart | **Cactopus** | Dry, Warm, Lit | Droughtcap | 16 h |
| Ember Aloe | **Ashen Rose** | Actual **Hot → Warm** event after less than 36 h of uninterrupted Hot | Rilllace at transition | <36 h Hot, then event |
| Ember Aloe | **Aloemancer** | Actual **Hot → Warm** event after at least 36 h of uninterrupted Hot | Rilllace at transition | ≥36 h Hot, then event |
| Ashen Rose | **Sandrose** | Dry, Temperate, Dim | Sim'mushro'dim | 12 h |
| Sandrose | **Cactopus** | Dry, Hot, Lit | Emberbolete **OR** Siltgill | 18 h |
| Moonjade | **Jadewisp** | At least 48 h Freezing, then actual **Freezing → Cold**; resulting Damp, Dim | Dewmender at thaw | ≥48 h Freezing, then event |
| Moonjade | **Pearadox** | At least 48 h Freezing, then actual **Freezing → Cold**; resulting Damp, Lit | Emberbolete **AND** Mistruffle at thaw | ≥48 h Freezing, then event |
| Cactopus | **Cactaclysm** | Dry, Hot, Bright | Siltgill **AND** Prismorel | 24 h |
| Cactopus | **Pearadox** | Damp, Hot, Dim | Mistruffle **AND** Rainmorel | 20 h |
| Aloemancer | **Mirage Rose** | Damp, Temperate, Dim | Emberbolete **AND** Rilllace | 24 h |
| Jadewisp | **Mirage Rose** | Damp, Cold, Dim | Prismorel **AND** Hushroom | 24 h |

### Spices (11 routes)

Retains the Dark-to-Lit Glass Apple event and the two Pum'king routes, without any check for the signs or magnitudes of the named Fungi's emissions.

| Source Plant | Destination Plant | Required resolved hex state / event | Required named contact | Continuous exposure or trigger |
| --- | --- | --- | --- | --- |
| Thymely | **Sunrice** | Damp, Temperate, Bright | Prismorel | 12 h |
| Thymely | **Moonrice** | Damp, Temperate, Dim | Mistruffle | 14 h |
| Thymely | **Shadow Onion** | Damp, Cold, Dark | Hushroom | 16 h |
| Sunrice | **Starberry** | Damp, Warm, Bright | Prismorel **AND** Emberbolete | 18 h |
| Sunrice | **Pum'king** | Damp, Temperate, Lit | Prismorel **AND** Mistruffle | 24 h |
| Moonrice | **Thymekeeper** | Damp, Cold, Dim | Rilllace **OR** Frostfolio | 18 h |
| Moonrice | **Ghost Rice** | Damp, Cold, Dark | Hushroom **AND** Rilllace | 20 h |
| Shadow Onion | **Dillusion** | Damp, Temperate, Lit | Rainmorel | 18 h |
| Starberry | **Glass Apple** | Damp, Warm, Bright | Rushroom **AND** Mistruffle | 28 h |
| Ghost Rice | **Glass Apple** | Damp, Temperate or Cold, Dark for 12 h; leave Dark and attain Lit within 8 h | Hushroom during Dark exposure; Prismorel at Lit completion | 12 h + ≤8 h transition |
| Dillusion | **Pum'king** | Damp, Warm, Lit | Rushroom **AND** Hushroom | 22 h |

## Precise event semantics

- **Mistlefoe → Mandrabra:** While Mistlefoe is **Damp, Dim**, both **Mistruffle and Dewmender** must reach it for **at least 12 but fewer than 20 uninterrupted hours**. Then **Mistruffle contact actually ends** while Dewmender contact and the **Damp, Dim** resolved state remain. Transform immediately on that contact-loss event. In contrast, **Mistlefoe → Mistlewoe** requires **20 uninterrupted hours** of the same Damp/Dim state with **both** contacts maintained; the two endpoints cannot succeed on the same event.
- **Moonlit Lotus → Starlotus:** Keep the source **Flooded, Cold, Dim** and reached by **Rainmorel** for **24 uninterrupted hours**, then cause an actual **Flooded → Damp** transition. Transform on drainage using the pre-drain qualification snapshot; Rainmorel contact need not survive draining. Initialize the new **0%-Growth Starlotus with Damp attunement**. Its alternate **Kelpergeist → Starlotus** route holds **Flooded, Cold, Dim** with **Frostfolio and Mistruffle** for 28 hours and initializes **Flooded attunement**.
- **Daisyspell → Orchidemon:** Accumulate **10 uninterrupted hours** of **Damp, Temperate, Dim** while **Mistruffle** reaches Daisyspell. On leaving Dim, start an **8-hour transition deadline**; achieve **Damp, Temperate, Bright** within that deadline, with **Prismorel** reaching the target **at Bright completion**. The named Mistruffle contact and Dim state are only required in the pre-event phase; the final Bright hex need not have been brightened by Prismorel specifically.
- **Ember Aloe temperature fork:** Track uninterrupted **Hot** exposure since the source Plant began its current Hot interval. At an actual **Hot → Warm** transition, with **Rilllace** reaching Ember Aloe at that event, transform to **Ashen Rose** if the qualifying Hot interval was **less than 36 hours**, otherwise to **Aloemancer** if it was **at least 36 hours**. This is an event-time split, not a race between two independent continuous recipes.
- **Moonjade thaw fork:** Accumulate **at least 48 uninterrupted Freezing hours**, then make an actual **Freezing → Cold** transition. If the arriving resolved hex is **Damp, Dim** and **Dewmender** reaches at thaw, transform to **Jadewisp**. If it is **Damp, Lit** and **both Emberbolete and Mistruffle** reach at thaw, transform to **Pearadox**. No "which fungus caused the warming" test applies; the distinct arriving Illumination states separate the destinations.
- **Ghost Rice → Glass Apple:** Accumulate **12 uninterrupted hours** of **Damp, Dark**, with Temperature **Temperate or Cold** and **Hushroom** contact. After leaving Dark, achieve **Lit within 8 hours**, preserving **Damp** and **Temperate-or-Cold** through the transition, with **Prismorel** reaching at Lit completion. Prismorel's own emission need not be the reason the hex becomes Lit.
- **Mandrakadabra aftermath:** **Mandrabra → Mandrakadabra** needs **Damp, Bright** for 12 hours with **Rushroom OR Siltgill** (both V8 Mycelial-dependent sources). Once transformed, Mandrakadabra has the established **4-hour uninterrupted Bright exposure lethality**; its return path to Mandrakazam instead requires **Damp, Temperate, Dim** with Mistruffle for 24 hours. New Plant hazard clocks start at zero on Transformation.

## Coverage and exclusivity checks

- **69 routes exactly:** Ingredients 6 + Woodlands 13 + Aquatic 14 + Flowers 12 + Desert 13 + Spices 11.
- **All 12 V8 named ordinary Fungi** appear in at least one contact, and **every route** includes a named Fungus. There is no generic emission-only Ingredients exception and no environmental-only Kelpergeist failure route; Kelpergeist → Kelpless now requires **Sim'mushro'dim** contact.
- **Seven routes require at least one dependent Fungal source**, and therefore source-side Mycelial access: Mandrabra → Mandrakadabra; Kelpergeist → Starlotus; Lavendream → Orchidemon; Dream Poppy → Rosewraith; Cactopus → Cactaclysm; Starberry → Glass Apple; Dillusion → Pum'king. Routes with **dependent OR independent** contacts do not always require Mycelial.
- **Sibling exits:** Ingredient, Woodlands Base, Aquatic Base, Daisydaze, Jadeheart, and Thymely variants use incompatible state values. Kelpfull, Kelpergeist, Wild Watercress, Charmomile, Lavendream, Tanglethorn, Mandrabra, Cactopus, Sunrice, and Moonrice likewise split by Moisture/Temperature/Illumination. Mistlefoe, Ember Aloe, Moonjade, Moonlit Lotus and other event cases split by disjoint pre-event/arrival conditions. **Distinct Fungus identities or durations are never the sole guarantee** for competing destinations. Physical-layout simulation is still required before implementation.
- **Rerouting deliberately changed contacts:** Old legacy fungal names/emission-sign contact gates are not maintained. In particular, **Potato → Pumpkin** is **Damp, Warm plus Emberbolete contact** for 24 h—regardless of whether Emberbolete warms by +2, other effects produce Warm, or many effects combine. **Sunrice → Pum'king** needs final **Damp, Temperate, Lit** and **Prismorel + Mistruffle** contact for 24 h; **Dillusion → Pum'king** needs final **Damp, Warm, Lit** and **Rushroom + Hushroom** contact for 22 h, with no opposing-emission proof.

## Implementation and migration boundary

- V9 is **locked design authority for the second-pass transformation redesign**, not a live engine migration or immediate replacement of the preserved first-pass pages. Keep the existing 31-Fungus and 69-route data, save compatibility, player Grimoire and gameplay intact until a separate implementation request.
- Implementation later must update the actual Fungal species catalog and propagation/contacts, Plant-owned recipe data, event snapshots/timers, tests, and discovery UI together. In particular, V8's Range/Budget initial delivery into unlimited connected-Flooded propagation is not yet implemented as a combined operation.
- **Not silently decided here:** exact Spore-born directional starting heading, Fungus Mycelial-loss grace periods, final stacking/Allocation retirement and tuning after playtests. These are independent of the 69 locked environmental/contact recipes.
- The prior [V8](random-roster-v8.md) remains the authority for the twelve ordinary Fungi's emissions, cultivation packages, delivery modes, ranges/budgets and Mycelial classes. This V9 changes **Transformation recipes only**.
