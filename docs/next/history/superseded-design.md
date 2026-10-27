# Superseded and historical design material

> **Historical archive, not implementation authority.** The source excerpts below preserve early exploratory ideas, previous approved-but-replaced approaches, prior status reports and earlier audit stages. They are retained verbatim for provenance and comparison. When a statement conflicts with the newer [current design index](../README.md), the linked later decision governs.

## Major supersession index

| Historical idea or statement | Current authority |
| --- | --- |
| Four environmental Properties, Fertility, permanent ground Materials | [Environment v1.2](../systems/environment.md) and original §61 — three Properties only |
| Transformations retain old Plant progress or require Growth/Ripening stage | [Transformations](../systems/transformations.md), §§58–59 — fresh 0%, stage-free |
| Generic fungus-emitted Transformation Effect | [Transformations](../systems/transformations.md), §68 — Plant-owned conditions and named contact |
| Numeric Waterborne Range 3 for cultivation emitters | [Environment](../systems/environment.md) and §56 — unlimited connected-Flooded reach |
| Instant Mycelial-dependent fungus death on loss of habitat | [Fungus lifecycle](../systems/fungus-lifecycle.md), §§57/60 — timed grace and continued emissions while alive |
| Required Mycelial on a Plant as a Transformation gate | [Woodlands](../plants/woodlands.md), §§70–72 — rejected; source-side dependency still allowed |
| Original Glimmer/Veil/Gloam/Prism Spices placeholders or unrecoverable §75 exact values | [Spices §76](../plants/spices.md) — explicitly approved new 11-row replacement |
| Statements that individual family recipe passes remain pending | [Family files](../README.md) — all 69 first-pass routes now approved |

The complete original source documents remain unchanged at [the repository's existing docs](../../herbs-and-fungi-design.md). The sections below are intentionally historical, not active implementation specifications.

---

## Original introductory status, conventions and six-family architecture

# Companion Cultivation — Herbs, Fungi & Cultivation Design

**Status:** Active text-only design reference; not implemented in Prototype 1  
**Started:** 23 October 2026  
**Latest Transformation status (26 October 2026):** §76 approves all 11 replacement Spices recipe specifications after the original detailed proposal was lost. All six families now have complete first-pass recipes (69 routes total); §75 is historical/incomplete, not the current recipe specification.  
**Related foundation:** [Environmental System v1.2](../systems/environment.md) (the older v1.1 file is archival)

This document records agreed cultivation directions, ideas under consideration, and unresolved details. It owns **Plant and Fungus gameplay** and the proposed **timed Mycelial ground overlay**, while Environmental System **v1.2** remains authoritative for the implemented hex environment, its **three** Properties, Conditions, Sources, Influences, Range/Spread Budget Propagation, Blockers, Anchors, and existing Environmental Adjacency. **§61 supersedes the historical Material/Fertility/Enchanted assumptions in earlier design sections.**

**Do not treat material overlays, herb biology, fungal responses, or time-based colonization as implemented yet.** We will undertake several design passes in text before changing game code. After game design is complete, the documentation can be consolidated into a formal reference/archive.

## Conventions

- **Agreed direction:** Explicitly accepted design concept. Details or balance may still be open.
- **Working terminology:** Useful current vocabulary, not necessarily a final UI label.
- **Illustrative:** A hypothetical organism, interaction, value, or example, **not** an approved recipe or balanced statistic.
- **Proposed:** Worth exploring but not yet agreed as a rule.
- **Open:** A decision we have intentionally not settled.
- **Reserved:** An optional mechanic to revisit only if it adds meaningful gameplay.

### Core cultivation objective — agreed

**The ultimate reason to farm Plants is to obtain their non-Seed harvested product (currently called \"Leaves\", but the name is temporary).** The game is about optimizing ongoing **planting-and-harvesting rotations**, not collecting strange Plant identities as ends in themselves.

- Seeds, germination, transformation chains, fungi, habitat manipulation, dormancy, and recovery are enjoyable **tools for maximizing sustained Leaves production** over repeated crop cycles.
- High-Leaf-Yield Plants should remain a desirable end goal; **prestigious species do not each require a completely different exotic reward**. Two Plants can both be high-output but differ in setup costs, timing, risk, sustainability, or the supporting Seeds/fungi they require.
- Plants specializing in Seeds or resilience are worthwhile when they help sustain or improve future Leaf harvests, reduce costs, or make crop rotations reliable.
- Avoid adding complexity for its own sake. Where a simple high-output harvest is a satisfying reward, keep it.

The existing Environmental System v1.1 rules remain unchanged in the live Prototype 1. Any implementation of these proposals must explicitly reconcile new mechanics with the environmental rules rather than silently modifying them.

## Current six-family architecture — agreed (supersedes early five-Herb-Family drafts)

**Current terminology is Plant / Plant Family / Plant Instance**, not Herb / Herb Family / Herb Instance. Parts of this document retain earlier historical wording and examples until a full editorial consolidation. The older five-family count, botanical Dill/Thyme/Chamomile/Mandrake/Thorn grouping, and blanket requirement that *every* Family has exactly one Base Plant with all others unlocked by Transformation are superseded by this architecture.

| Current Family | Primary design identity | Transformation model |
| --- | --- | --- |
| **Woodlands** | Risky transformation networks, alternate routes, and Seed chains | Branching transformations from a Base Plant |
| **Aquatic** | Flooded/Damp transitions and Waterborne positioning | Branching transformations from a Base Plant |
| **Flowers** | Bloom/harvest timing and progress-/time-based fungal production effects | Branching transformations from a Base Plant |
| **Desert** | Extreme Hot/Freezing adaptation, Dormancy, and recovery | Branching transformations from a Base Plant |
| **Spices** | Illumination engineering, spatial fungus overlap, and efficient Leaf yield | **Keep the originally drafted Food network intact; rename species to cooking spices later** |
| **Ingredients** | Straightforward, recognizable cooking ingredients; Growth, Ripening, harvest, and Seed sustainability | **One Base Plant transforms DIRECTLY into any other Ingredient; all other Ingredients cannot transform** |

**Spices / Ingredients are separate for cross-game clarity:** the Spices family yields recognizable RPG cooking spices; Ingredients supplies ordinary cooking staples that RPG players can understand without ever playing the cultivation game. **Mechanics do not have to be redesigned to suit names.** The original Food Plant names (Thymely, Sunrice, Moonrice, Shadow Onion, Starberry, Pum'king, Thymekeeper, Ghost Rice, Dillusion, Glass Apple) remain *working design identifiers*, not locked names; the prior suggested spice-themed replacements are **proposals only**.

**The Ingredients exception (revised and AGREED after Spices numerical approval):** Ingredients has **exactly one Base Plant**, given as the family's starter Seed species. **Only that Base Plant may transform**, and it may transform **directly into every other Ingredient species**—a star-shaped network with no intermediate steps. Every non-Base Ingredient is a **terminal species** and can **never transform further or back into the Base**. Fungi may still affect every Ingredient's ordinary Growth, Ripening and harvested Leaves/Seeds. Seed output identities for each Ingredient, including possible own Seeds supporting future direct planting, will be specified in their Plant profiles. The earlier no-transformations/direct-Seed-unlocks exception is **superseded**. Recipes are Plant-owned and not assigned until after Plant/fungal design.

**One shared farming objective:** maximum useful non-Seed harvest over sustainable planting/harvesting rotations (currently called **Leaves**, pending a more suitable universal name). Seeds and fungi support this goal. Do not add unneeded magical abilities just to make premium crops mechanically distinct.

**Deferred environmental-scope decision:** Fertility and Base Materials remain in the implemented environment for now, but may be removed after full Plant/Fungus and balance design if they do not earn their complexity. The six-family direction does **not** authorize changes to existing environmental game code or the Environmental System v1.1 document.

---

## 1. Herb identity and families

### Agreed direction

- There are **five Herb Families**. Each can contain any number of distinct, named **Herbs**.
- **Every Family has one Base Herb** that is the player's entry point to that lineage. The player is **given access to Seeds of the Base Herb only**; the other Herbs must initially be **created by Transformation**, not provided as separate starter plants/Seeds.
- **All non-Base Herbs in a Family are obtainable through Transformation**. Some transformations may start from the Base Herb; others may require transforming an already transformed Herb. Direct and chained transformations can coexist, with paths decided individually rather than enforcing the same pattern in every family.
- A Family is therefore also a **transformation lineage**. This doesn't mean every member must have the same preferred terrain or identical Responses; the previously agreed uneven family traits still apply.
- The earlier term **Variant** is retired as an identity layer. Mandrabra, Mandrakadabra, and Mandrakazam are three different Herbs in the same Family, not a base Herb plus variants.
- A **Herb Instance** is a particular growing plant occupying a hex. A **Herb** is its named species/type; the **Family** groups related Herb types.
- Family membership matters: the **same fungal Influence can produce different Responses in different Herb Families** (including no Response or an adverse one).
- Families need to share **a couple of meaningful characteristics**, but these can be **different kinds of traits for different families**: requirements, benefits, disadvantages, fungal relationships, seed behavior, and special Responses. We do **not** want a standardized pattern where every Family is defined by a single favorable environmental Condition or Material. Exact shared traits remain **open**.
- A particular Herb may have a distinctive trait that enables a difficult interaction its family would usually struggle with. Such exceptions should have interesting trade-offs, not simply be stronger.

### Five provisional family names and seven known Herbs

These family labels are based on the real plants and are **working names**, not finalized fantasy family names.

| Family (working name) | Known Herbs |
| --- | --- |
| Dill | Dilly-Dally Dill |
| Thyme | Thymeless |
| Chamomile | Chamomeleon |
| Mandrake | Mandrabra; Mandrakadabra; Mandrakazam |
| Thorn | Tanglethorn |

**Current known count:** five families, seven named Herb types. The eventual number of Herbs per family is open. Do not introduce a separate Variant layer.

**Provisional Base Herb assignments to confirm during species design:** Mandrabra for Mandrake; Dilly-Dally Dill for Dill; Thymeless for Thyme; Chamomeleon for Chamomile; Tanglethorn for Thorn. These are natural candidates from our presently known names, **not yet expressly approved** as the final Base Herb for each Family.

### Transformation access and Seed inheritance — agreed core, open assignments

The player being **given only Base Herb Seeds** does **not itself decide** which Seeds transformed Herbs may generate or how players reproduce a discovery later.

**Agreed: Different Herbs can have different Seed inheritance behavior.** We do not impose a single default across all Herbs within a Family. All four of the following are valid *individual Herb* behaviors:

1. **Base Seeds:** A transformed Herb produces Seeds that grow the Family's Base Herb.
2. **Own Seeds:** A transformed Herb produces Seeds that grow that same transformed Herb.
3. **Other Herb Seeds:** A transformed Herb produces Seeds for a different named Herb (e.g., Mandrakazam yielding Mandrakadabra Seeds).
4. **No Seeds:** The Herb is sterile and can only be obtained through some other route, such as Transformation from another Herb.

These are permitted possibilities, **not assignments to the seven currently named Herbs**. A successful Transformation is still required to obtain non-Base Herbs initially, but some transformed Herbs may then produce their own Seeds, rewarding discovery. Others might need to be transformed again for every generation.

**New family-identity proposal under discussion:** One Family might be uniquely identified by a **shared Seed inheritance rule**, rather than by common habitat requirements. Possible examples include:

- **Reverting lineage:** All transformed Herbs in that Family yield only Base Herb Seeds; the player must recreate each Transformation.
- **Stable lineage:** All transformed Herbs yield their own Seeds; successfully discovered transformations can be cultivated directly in later generations.
- **Mixed lineage:** Transformed Herbs yield a **mix of Base and transformed Herb Seeds** from one harvest (e.g., seven of one and three of the other, illustrative). Mixing Seed identities within one harvest is an **additional proposed fifth behavior**, not yet established as an ordinary rule.
- A Family could also share a more unusual cross-Herb Seed production pattern, such as the exploratory Mandrakazam → Mandrakadabra chain.

**No family is yet assigned any of these signatures.** If one family uniquely has mixed Seed inheritance, other families can still exhibit individual Base/Own/Other/None behaviors without having to conform to parallel family-wide rules. Family identities should remain deliberately **uneven**, not a checklist where every family is assigned a different Seed pattern. Ideally the unique rule supports a particular gameplay puzzle.

**Open:** Whether mixed Seed output should use deterministic quantities/proportions, what controls any mix, whether seed-enhancing fungal Responses can change composition, and whether players can later obtain/trade non-Base Seeds directly. Also open: whether Base Herb Seeds can ever be produced by non-Base Herbs of other families via exceptional interactions.

**Illustrative, not finalized:** Mandrabra might transform into Mandrakadabra or Mandrakazam, while other lineages could require an intermediate Herb first. The Mandrakazam-to-Mandrakadabra Seed production idea remains available; no actual transformation recipe is established.

### Nonuniform family identities — illustrative brainstorming, NOT established traits

Different families might be related through entirely different mechanics. Possible *directions*, not assignments:

| Family | Possible signature to explore |
| --- | --- |
| Dill | Related Leaf harvest timing and productive windows, with varied individual trade-offs |
| Thyme | Shared sensitivity or unusual timing interactions with a certain fungal Influence |
| Chamomile | A common adaptation/Transformation relationship, despite individual needs |
| Mandrake | The previously explored specialized reproduction / Seed identity chain among Mandrabra, Mandrakadabra, and Mandrakazam |
| Thorn | Shared ability to tolerate a hazardous fungus or overlay, but different drawbacks or production goals |

Do **not** force these examples into a uniform one-family/one-specialty formula. A family might share a benefit, another a requirement, another a disadvantage, and another a dependency on fungi; traits need not correspond to the same category. Species-level exceptions may enable otherwise difficult interactions. Designing related Herbs and Fungi in **small connected batches**, starting perhaps with the known Mandrake trio, should reveal useful family commonalities.

### Working product terms

- **Herb:** The living plant or the named plant type, depending on context.
- **Leaves:** Working term for the harvested *non-seed* Herb product, distinct from the living plant. We may rename this later if a more general product term better fits Mandrakes, Thorns, etc.
- **Seeds:** Harvested reproductive items. Seed identity matters; a particular Herb might eventually produce Seeds that grow a *different* named Herb.

The brainstorming brief suggests that harvested products from one family *might* be interchangeable ingredients while Seeds remain Herb-specific, but this is **not decided**.

---

## 2. The standard Herb lifecycle

### Agreed direction

The original **automatic 0–200%** lifecycle remains the **standard design**, not an inviolable universal law. Exceptionally interesting Herbs may break it, but we should not add exceptions merely to have exceptions.

- **Growth:** 0–100% development, generally toward peak Leaf Yield.
- **Ripening:** 100–200%, generally converting Leaf potential into Seed potential.
- Growth does **not automatically stop at 100%**. The harvest timing remains a player decision.
- **Growth Rate and Ripening Rate are independent** and fungi can accelerate or slow each separately.
- A change to Ripening **speed** is not automatically the same as changing the **Leaf-to-Seed conversion curve** at a given percentage; keep those concepts distinguishable.
- **Standard Herb harvesting is a one-time, plant-consuming action:** harvest when something is available, collect **all currently harvestable Leaves and Seeds**, and remove the Herb Instance from its hex. Exceptionally interesting Herbs might break this rule, but do not presume repeatable harvesting is standard.

### Original illustrative yield curve — not approved balance

| Overall progress | Illustrative Leaves | Illustrative Seeds | Meaning |
| --- | ---: | ---: | --- |
| 0% | 0 | 0 | Newly planted |
| 50% | 1 | 0 | Early Leaves available |
| 100% | 10 | 0 | Peak Leaves |
| 150% | 5 | 5 | Partial conversion |
| 200% | 0 | 10 | Complete conversion |

Numbers, intermediate interpolation, rounding, real-time duration, and whether particular Herbs differ are **open**. The original brainstorm suggested approximately 8 days to 100% and 16 days to 200%, but did **not** finalize those times.

### Potential fungal changes to the production curve — illustrative catalog

These are **effect ideas**, not adopted named Influences or mandatory mechanics:

- Leaves appear **earlier** than the usual 50% point, or later.
- Peak Leaf Yield occurs earlier or later than 100%.
- Leaves remain at maximum output beyond 100%, extending the best harvest window.
- Leaves decline more slowly or more quickly during Ripening.
- Maximum Leaf Yield increases or decreases.
- Seeds begin appearing earlier or later.
- Maximum Seed Yield increases or decreases, including complete sterility.
- Leaf-to-Seed conversion is slower, faster, partial, or otherwise differently shaped **at the same progress percentage**.
- A second Leaf-production peak or some Leaves remaining at 200% is possible for unusual Herbs, but is not an established ordinary rule.
- Produced Seed identity differs from the living Herb's identity.

### Existing Mandrake ideas — illustrative, not locked recipes

The original brainstorm included:
- **Mandrabra:** ordinary Leaf and Seed output.
- **Mandrakadabra:** greater Leaf output but no Seeds.
- **Mandrakazam:** fewer Seeds, which produce Mandrakadabra rather than itself.

These are valuable examples of different cultivation roles and seed dependency chains, **not** finalized quantities, traits, or transformation recipes.

---

## 3. Fungus identity, lifecycle, and roles

### Agreed direction

- **Fungi are objects** occupying hexes, and **may also be Sources**. One object per hex remains the environmental foundation; overlays do not consume an object slot.
- Their herb-targeting Influences use the **shared existing propagation architecture** (Range-based or Spread Budget), not a separate fungal travel engine.
- A Fungus can potentially emit several Influences, including environmental and herb-targeting ones.
- **Latest approved revision (§46):** A Fungus uses **0–100% Growth and 100–200% Sporulation**, with species-specific durations and **its own Spores only**, never Leaves or Plant Seeds. Unlike Plant Ripening, Sporulation concerns Fungus Spores, and maturation does **not** end its emissions. This supersedes the older 0–100% harvest model.
- A Fungus begins emitting its Influences **immediately after successful germination**, rather than only at 100%, provided its environmental/habitat needs permit emission.
- **Latest approved revision (§46):** Fungus harvest is **one-time and destructive**: take its own **Spores** and remove the Fungus, thereby stopping its emissions. **At 200%**, a mature fungus **continues emitting** while left alive. The precise Spores-at-progress curve/earliest eligibility to harvest is deferred; design default is to harvest ripe Spores at 200% for a simple infrastructure/expansion choice.
- No number of Fungi or formal Fungus Family structure has been agreed. One useful design approach is to distinguish their **roles** first, without forcing fungus families.

### Potential roles — design vocabulary, not an exclusive taxonomy

- **Environmental Source:** Changes Moisture, Temperature, Fertility, or Illumination using the existing system.
- **Habitat Engineer:** Creates a temporary material overlay such as Mycelial or Enchanted.
- **Cultivation Source:** Emits Influences that elicit Plant Responses such as Growth and Yield changes, or that satisfy part of a **Plant-defined Transformation recipe**. **Later refinement (§17): no separate transformation-triggering Influence type exists.** Death or other hazards may also be caused by the environment/overlays.

A fungus may combine roles. Some fungi or Herbs may need particular environments/overlays to function or survive.

---

## 4. Planting and germination

### Agreed direction

- Planting uses **Seeds**; putting more Seeds into one planting slot increases the chance of obtaining a living plant, up to a ceiling.
- Seeds beyond the number needed to reach the chance cap provide **no extra success chance**, creating a deliberate **Seed sink**.
- **Different species can have different germination rates.** Do not impose one universal seed-success rate.

### Illustrative numeric example only

If one particular species grants **+10 percentage points per Seed**, 1 Seed gives a 10% success chance, 5 give 50%, and 10 give 100%; additional Seeds give no extra benefit. **This is an example, not a locked formula or a universal ten-seed cap.**

**Open:** How to compute chance per species; how failed planting consumes Seeds; minimum/maximum Seeds per slot; whether herbs and fungi use exactly the same planting mechanics; what happens when the hex cannot support the germinated organism.

---

## 5. Herb-targeting Influences and Responses

### Agreed direction

- The **Influence** is what a Source emits and how it reaches a hex.
- The **Response** is what a particular Herb does when reached by that Influence or when it experiences a relevant habitat Condition/material overlay.
- **Response** is an accepted useful term for this cultivation layer; it is **not** a new environmental Property and does not force all Responses to be numerical step Modifiers.
- The same Influence can trigger **different, neutral, beneficial, or harmful Responses** based on the receiving Herb/Family. **Later agreed refinement (see §16): Responses cannot arbitrarily reverse an Influence's own direct directional effect; negative outcomes instead arise through distinct conditions, hazards, or coherent transformation interactions.**
- Fungi are not intrinsically "good" or "bad": one may help Leaf production but hinder Seed production, or enable Transformation while requiring a dangerous environment.
- Fungi can modify **existing characteristics** and, more exceptionally, enable **new behavior**. Some unusual behaviors may instead belong to a specific Herb; fungal exposure could alternatively grant a capability such as resistance.

### Response design areas under exploration

| Area | Illustrative possible Responses |
| --- | --- |
| Growth Rate | Faster/slower progress 0–100% |
| Ripening Rate | Faster/slower progress 100–200% |
| Leaf Production | Yield, first production point, peak timing, peak duration, rate of decline |
| Seed Production | Yield, appearance timing, Seed identity, fertility/sterility |
| Conversion | Shape or extent of Leaf-to-Seed conversion independently of Ripening Rate |
| Transformation | Change the identity of a **living Herb** (not the same as changing its produced Seeds) |
| Environmental tolerance | Allow survival in an otherwise unsuitable Condition; alternatively remove that tolerance |
| Susceptibility | Resistance, vulnerability, or unusual family-specific Responses to Influences |
| Death | Kill a Herb following sustained adverse exposure |

**Open:** Which of these become actual effect types; how Responses stack or cancel; family defaults versus Herb-specific exceptions; whether immediate or event-triggered Responses are also needed; numerical units and final names.

### Transformation continuity — UPDATED AGREED RULE (§§58–59 supersede the earlier proposal)

A Transformation **replaces the old Plant with a new Plant starting at 0% Growth**, even if the predecessor was at 75%, 150%, or 200%. The new identity's habitat needs, Responses, natural curves, Growth/Ripening speeds, and production rules apply from its own beginning. **No accumulated Leaves or Seeds, old lethal-exposure timers, or other prior Plant state carries over.** The older progress-preserving rule was explicitly rejected in §58. Plant-owned recipes may still examine a prior condition to choose the new species or initialize an explicitly declared origin trait, but they do not transfer the predecessor's lifecycle or inventories.

**Global Transformation eligibility (§59):** Recipes do **not** check lifecycle percentage, Growth/Ripening stage, or maturity. Required timed contact with environmental Conditions, ordinary fungal Influences/adjacency, overlays, and environmental transition events determines whether a Transformation occurs. A new Plant may begin qualifying for its own next Transformation immediately at 0%, with fresh timers. Lifecycle stages still govern production and native Plant bonuses, not access to transformations.

### A compelling family-versus-exception example — illustrative

Imagine a Herb Family that usually struggles in **Freezing**, paired with a powerful Leaf Yield fungus that only thrives in Freezing. A particular Herb in that family might have innate freeze tolerance but a shorter Ripening harvest window, making the pairing difficult rather than impossible. Alternatively, a **different fungus** might grant freeze tolerance through exposure. Both routes are interesting; neither is yet required by the rules.

---

## 6. Continuous Exposure and timed Responses

### Agreed direction

- **Continuous Exposure** is our starting model for duration-based Herb Responses. A qualifying Influence or hazardous current hex state must remain in effect for **uninterrupted time**.
- **Breaking the relevant exposure resets that Response's timer**, rather than merely pausing it. Cumulative Exposure is **reserved**, not currently part of the agreed model; adopt it later only if a mechanic truly benefits.
- Different Responses can have **different exposure thresholds**. The player may exploit the interval between a beneficial Transformation and a lethal hazard.
- A material-caused hazard is distinct from a fungus-emitted Influence: interrupting the fungal Influence does **not** necessarily end exposure to a hazardous overlay already present.

### Illustrative timing challenge — NOT a fixed recipe

A specialized Transformation Fungus needs a **Mycelial habitat**. It emits an Influence that transforms an eligible Herb after **10 hours** of continuous reach. Meanwhile the **Mycelial overlay itself** is hazardous to that Herb, causing death after **20 hours** of continuous contact.

The player must:
1. Create the habitat to permit the Transformation Fungus.
2. Sustain its transformation Influence long enough to obtain the new Herb.
3. Remove, block, or disable what is maintaining the hazard early enough for the Mycelial exposure to end before the Herb dies.

**Crucial:** The death exposure comes from the **Mycelial hex state**, not simply a second bad emission from the Transformation Fungus. Removing the Transformation Fungus alone may **not** save the plant while its hex remains Mycelial. This is an example of ecosystem dependency, not an adopted 10h/20h balance rule.

**Open:** Whether Transformation changes how earlier exposure carries over for a new Herb identity; whether exposure thresholds operate on elapsed hours, growth stages, or both; precise timing of effects and mid-tick changes.

---

## 7. Temporary material overlays — proposed environmental extension

### Agreed design direction; not part of implemented Environmental System v1.1

Keep the underlying **Base Material** permanent and unchanged: **Dirt, Sand, Clay, Stone**.

Instead of replacing the Material with one exclusive current label, each hex can have **two independent active states**:

| Hex field / condition | Possible values | Meaning |
| --- | --- | --- |
| Base Material | Dirt / Sand / Clay / Stone | Permanent underlying Material; never overwritten by colonization |
| **Mycelial** | true / false | Hex is presently colonized by Mycelial |
| **Enchanted** | true / false | Hex is presently enchanted |

**Both Mycelial and Enchanted may be true on the same hex simultaneously.** They are **not** alternatives competing for one "current material" slot; neither removes or replaces the other by default.

Example hex state:

~~~text
Base Material: Dirt
Mycelial: true
Enchanted: true
~~~

The checkmarks are the **design-level model**, not a requirement to store mutable booleans rather than derive active flags from influences in code. Material overlays do not occupy an object slot. They may influence Herb/Fungus habitat requirements, survival, or other Responses.

These are the **only two material-overlay types we currently want to explore**. Do not expand the catalog without a distinct gameplay reason. This is a **new environmental extension proposal**, so it should **not** be silently inserted into the established four-Property Modifier system or treated as one of its 16 Conditions.

### 7A. Mycelial overlay: timed self-spreading colonization

**Agreed direction:**

- A fungus can create/maintain a Mycelial overlay on eligible terrain.
- A Mycelial hex can colonize **adjacent eligible hexes after some continuous time**, allowing a colony to spread outward in waves **beyond the direct reach of the initiating fungus**.
- A newly colonized hex may begin the same timed-adjacency process on further neighbors; this is intentionally **different from the implemented one-pass, non-cascading Environmental Adjacency**.
- Mycelial can be a required habitat for other specialized Fungi, but may **itself be harmful to Herbs** occupying it. The dangerous Response comes from the overlay; it doesn't have to be an emitted fungal Influence.
- Mycelial colonies are **source-dependent**, not permanently self-sustaining.

**When the originating fungus/source is removed:**

- Colony expansion stops.
- The existing colony retreats **gradually**, with hexes **closer to the original Source reverting first** and outward hexes reverting later, producing a chain of decay rather than an immediate garden-wide clear.
- Every reverted hex returns to its unchanged Base Material, unless some other still-active overlay/source keeps Mycelial present. The exact timing and handling of overlapping sources remain **open**.
- The amount of time before decay and the intervals or distance logic of the retreat remain **open**.

**Illustrative possible restrictions, not locked:** Stone and/or **Flooded** terrain could prevent new Mycelial spread, while Dirt could permit it. Flooded is an environmental **Moisture Condition**, not a Base Material. The full list of eligible Materials and blocking Conditions is still open.

**Open:** Initial colonization requirements, spread delay, whether standard Hex/Edge Blockers stop or alter overlay spread, whether environmental changes immediately clear existing colonization or only prevent new spread, what happens when the source stops emitting without being physically removed, multiple source origins, and how retreat timing is calculated through branched geometry.

### 7B. Enchanted overlay: maintained, nonspreading habitat

**Agreed direction:**

- Certain fungi can cause eligible hexes to become **Enchanted**.
- Enchanted **never propagates to neighbors on its own**. Reach is determined by the maintaining Source/Influence, where applicable.
- Removing or disabling the maintaining Source **immediately removes its Enchanted contribution**; absent another active provider the overlay becomes false, with **no decay period**.
- Enchanted can be an environmental prerequisite for rare or powerful Herbs/Fungi. Its main puzzle is maintaining the right habitat, not containing an expanding colony.
- Eligibility depends on the **Base Material**. **Sand and Clay being non-enchantable** were suggested as examples; the exact allowed/forbidden Materials are **not locked**.
- Enchanted and Mycelial **can coexist** on the same hex.

**Open:** Whether enchantment has additional effects on growth or fungal emission, how multiple contributing Sources are reconciled, whether Enchanted changes Mycelial susceptibility, and the exact list of enchantable Materials.

### Consequences of coexistence

Because both overlays can be active at once, **each relevant habitat requirement and hazard must be checked separately**. For example, an Enchanted-loving Herb could still be exposed to harmful Mycelial colonization on the same hex. Rules that specifically depend on the combination are **not yet defined**.

---

## 8. Unmet environmental or habitat requirements

### Agreed direction

**Different Herb and Fungus species may respond differently** when their environmental or overlay requirements are not met. There is no universal "everything dies immediately" rule.

Possible species-defined reactions include:

- **Stop emitting Influences** while the requirement is unsatisfied (especially relevant to Fungi acting as Sources).
- **Die after a specified duration** under the unsuitable Condition/overlay state.

These are both permitted design behaviors; particular organisms and required durations are **not** assigned yet. The behavior of any organism might depend on which requirement failed. Some organisms can be **tolerant or immune** to a hazard that affects their relatives, perhaps at a cost in productivity or convenience; such trade-offs are species-design possibilities, **not** a universal mandatory penalty.

### Proposed palette for unsuitable-habitat Responses (not yet locked)

| Potential Response | What it means |
| --- | --- |
| Reduced productivity | Survival continues, but Leaf/Seed Yield or growth speed decreases |
| Paused development | Growth or Ripening stops until the habitat becomes suitable |
| Suppressed emissions | A Fungus stops acting as a Source while its requirement is unmet; resumes when suitable |
| Delayed death | A hazard begins a continuous-exposure countdown toward death, rather than killing immediately |
| Tolerance or immunity | A species is unaffected by one particular adverse habitat state; a separate Fungus might also grant tolerance |

A resistance trait might trade off maximum Leaves, Seeds, Ripening window, germination chance, or compatibility with another organism, but not every resistant organism should pay the **same** cost. **Proposed conceptual distinction:** a *preference* reduces performance when absent, while a *hard requirement* may cause suppression or eventual death. Neither is yet a locked universal rule.

**Open:** Whether an ordinary Herb also stops Growth or Ripening, whether failing conditions have a grace period before emissions stop, whether the death timer follows the same Continuous Exposure/reset rule, and the precise sequence when habitat loss switches off an emission that had been sustaining another organism.

---

## 9. Existing environment-system boundaries and integration

These established foundations remain authoritative until we explicitly revise them:

- Every hex has exactly **one Base Material**, formerly called its permanent Material. The temporary independent overlay flags extend the future environmental state; they do **not** permanently change Base Material.
- Each hex still tracks Moisture, Fertility, Temperature, and Illumination with their existing ordered Conditions and additive Modifiers.
- Blockers and ordinary propagation remain defined by Environmental System v1.1.
- Existing Environmental Adjacency is **instantaneous, single-pass, no cascading**. **Timed Mycelial expansion is a different, future mechanism**; it does not redefine Environmental Adjacency.
- Hexes contain at most one object (Herb, Fungus, Source, Hex Blocker, etc.), while Edge Blockers occupy shared edges.
- Fungi as Sources reuse existing propagation and can target herbs as well as environmental conditions.
- Material-overlay mechanics, timed biology, and colony retreat need an explicit future resolution order; none is implemented or defined by the environmental simulation yet.

The environmental file is intentionally **not rewritten in this design pass**. At implementation planning time, any new shared rules can be reconciled with its "permanent Material" terminology while retaining the immutable Base Material invariant.

---

## 10. Priorities and deferred decisions

### Work to design before implementation

1. Define which **unevenly selected** traits each Herb Family truly shares, including potential fungal relationships, and which exceptions individual Herbs may have.
2. Clarify ordinary Herb/Fungus lifecycle numbers, germination and harvest rules.
3. Choose a small, meaningful vocabulary/catalog of fungal Influences and possible Herb Responses.
4. Define timing and resolution of Continuous Exposure, habitat failure, Transformation, and death.
5. Define overlay eligibility, propagation, source-dependence, Mycelial spread/retreat, and Enchanted maintenance in detail.
6. Resolve overlaps (multiple Sources, overlays simultaneously active, Blockers, environmental Changes, divergent family/species responses).
7. Only then scope and implement a later Herbs/Fungi prototype.

### Deliberately left for later

- Official names for the five Herb Families and fungi; counts of new Herbs and Fungi.
- Fungal families (if any).
- Final balance figures, exact time units, growth/harvest curves, plantable seed requirements, and germination chance formula.
- Whether any particular Herb should break the normal 0–200% lifecycle.
- Harvested-product terminology ("Leaves" is provisional).
- Seed inheritance identities and Transformation chains, beyond the illustrative Mandrake examples.
- Whether cumulative exposure, independent triggered events, or other exceptional behaviors earn a role.
- Material overlay expansion beyond **Mycelial** and **Enchanted** (currently **not** intended).

---

## 11. Subsequent terminology and family-design direction — agreed

This section supersedes older "Herb" terminology where they conflict; a full editorial rename of earlier sections is deferred to the eventual documentation consolidation.

- **Plant** replaces **Herb** as the general term, and **Plant Family / Plant Instance / Plant Response** replace their Herb counterparts. The term "Leaves" for ordinary non-Seed harvested product is **provisional** and needs a name suitable for roots, flowers, aquatic plants, etc.
- The five broad groupings under current consideration are **Woodlands, Aquatic, Food, Flowers, and Desert** rather than five mandatory real-world botanical taxa. These are useful botanical themes and name pools, **not requirements that all members prefer one environmental Condition**. Aquatic Plants may often favor Flooded terrain; Desert Plants may often favor Sand; individual traits, fungi, transformations, and costs must remain varied.
- We favor a **family-interactions-first** workflow: map several branching/cross-connected transformations, alternative routes, desirable or undesirable outcomes, and different reproduction choices first; define the individual Plants and fungi and numerical balance afterward. Design species in connected batches, revisit the graph when discoveries emerge, and don't enforce equal family sizes or a fixed number of transformed Plants.
- The uploaded "Plant names.txt" is a **name pool**; not every name must be used, and names should generally follow the mechanics rather than dictate them.
- Each Family has one initial **Base Plant** whose Seeds are offered to the player; other members of its transformation network must be discovered through Transformation. The graph should not be a compulsory straight line.
- **Transformation redundancy is desirable:** two fungi may produce the same transformation while providing different environmental Influences, habitat constraints, time costs, or hazards. The same fungi may play roles across different Families.
- Not every destination is equally strong: reliable/safe Plants, high-output/risky Plants, inferior outcomes, rescue transformations, and Seed-production shortcuts can coexist.

### Woodlands — recorded design sketch, no numeric balance locked

The player's Woodlands transformation sketch proposed **one unnamed Base Plant** leading to branches associated with Bamboo, Mandrake, and Tanglethorn, with cross-branch routes:

- **Mandrabra → Mandrakadabra → Mandrakazam** **and Mandrabra → Mandrakazam directly** are both confirmed. Mandrakadabra has the best potential non-Seed harvest output in Woodlands but is difficult to transform into safely: exposure long enough for Transformation can become fatal if left too long. A **Mandrakazam Seed route** is a longer but safer way to cultivate Mandrakadabra away from the dangerous Influence.
- **Bamboom → Bamboozeling → Bamboozled** under continued exposure to a transforming fungus. **Bamboom** is an excellent Base-Plant Seed producer; **Bamboozeling** is inferior; **Bamboozled** produces no ordinary harvest or Seeds but yields an odd **Bamboo Steel** trophy when harvested (for flavor/achievement, not a normal productivity reward). The mention of "Bamboozle" as a best Plant alongside "Bamboom" in the sketch needs a **name confirmation**; do not silently treat them as two different Plants.
- **Tanglethorn → Mistlefoe / Bramblewraith** is a safer, lower-maintenance direction. **Bramblewraith** is highly desirable for resilience and a large harvest window, not necessarily maximum yield.
- **Mistlefoe → Mandrabra** is a pivot into the more demanding Mandrake path, requiring a qualifying new fungal presence/condition and **removal of a fungus beneficial to Mistlefoe**. Keeping both fungi present instead causes **Mistlefoe → Mistlewoe**, an unwanted result. **Mistlewoe → Tanglethorn is confirmed**, not tentative. Later phases will define the exact Plant-owned recipes and fungal identities.

**Status:** Woodlands branching paths and both user-corrected links above are **confirmed layout edges**; exact fungal and environmental requirements and quantitative organism statistics remain unassigned.

~~~text
Unnamed Woodlands Base Plant
  ├── Bamboom → Bamboozeling → Bamboozled
  ├── Mandrabra → Mandrakadabra → Mandrakazam
  │       └─────────────────────────→ Mandrakazam (direct additional route)
  └── Tanglethorn → Bramblewraith
             └──→ Mistlefoe → Mandrabra (pivot)
                         └──→ Mistlewoe → Tanglethorn (confirmed loop)
~~~

---

## 12. Aquatic — first family-interactions design pass

### Points explicitly favored or accepted

- **Flooded → drain → alternative transformation** is a **strong core Aquatic mechanic**. A Plant may need sustained Flooded habitat or a Waterborne Influence to reach an intermediate form; draining after qualifying exposure can select a different Transformation from remaining Flooded. **This is an environmental-sequence requirement, never a Ripening-stage gate** (§59). The precise Plant identities and fungal requirements below are still first-pass proposals.
- **Kelpless redemption** is desirable: an undesirable transformation should be recoverable through a route to a worthwhile other Plant, instead of being a permanent dead end.
- Add **Cresscent → Pearlily** as an alternate, **shorter route to Pearlily**. Cresscent is useful as a self-reproducing Plant with **good Seed germination**, while a Cresscent Plant can alternatively be **transformed into Pearlily**. This makes a manageable two-Plant production chain, rather than requiring the entire Lotus progression.
- **Neither Cresscent nor Pearlily needs to be an Aquatic "best" Plant.** This shortcut should give a practical, accessible result **without trivializing the harder-to-obtain specialists**.
- Standard harvesting is plant-consuming: a single Cresscent Instance can be **harvested for Cresscent Seeds OR transformed into Pearlily**; it cannot do both as the same Instance in one crop cycle. Multiple planted Instances allow the player to maintain a Seed supply and transform others.

### Provisional full graph from the assistant's first sketch (not all edges adopted)

~~~text
Unnamed Base Aquatic Plant
  ├─> Kelpfull
  │     ├─> Kelpergeist            (proposed specialist)
  │     │     ├─> Kelpless         (loss of Flooded after exposure; agreed route)
  │     │     └─> Starlotus        (alternative origin; Flooded attunement)
  │     └─> Kelpless               (undesirable)
  │           └─> Wild Watercress  (redemption route, favored)
  ├─> Sunken Lotus
  │     └─> Moonlit Lotus
  │           ├─> Starlotus        (qualifying Flooded exposure, then drain; favored concept)
  │           └─> Pearlily         (remain Flooded; favored concept)
  └─> Wild Watercress
        ├─> Silvercress
        └─> Cresscent
              └─> Pearlily         (new short alternative route, favored)
~~~

**Alternative cross-route:** Kelpergeist → Starlotus via a specialized fungal transformation is a favored part of the two-origin Starlotus design, not just a placeholder link. Exact fungi and environmental requirements remain open.

### First-pass possible Plant roles (all tentative except the directional preferences above)

| Plant | Possible cultivation purpose |
| --- | --- |
| Unnamed Base Aquatic Plant | Starting access to all Aquatic branches |
| Kelpfull | **Straightforward early transformation**; candidate for producing many Base Plant Seeds while Flooded, without requiring a more elaborate personal mechanic |
| Kelpergeist | Reliable harvest in Dark/Flooded conditions |
| Kelpless | Unwanted transformation after habitat disruption; redeemable into Watercress |
| Sunken Lotus | **Straightforward early transformation**; Waterborne-connected entry to the Lotus branch, without requiring a further special complication |
| Moonlit Lotus | Intermediate whose next Transformation depends on sustained Flooded conditions and whether the player subsequently drains, independent of its lifecycle stage |
| Starlotus | Harder, highly desirable form obtained after drainage or an alternative specialist route |
| Pearlily | Accessible, useful but not top-tier outcome, reachable from Moonlit Lotus or Cresscent |
| Wild Watercress | Accessible Damp-oriented branch entry, including the Kelpless rescue |
| Silvercress | Potentially excellent ordinary harvest output in a controlled Damp habitat |
| Cresscent | Seeds with good germination; can be harvested to replenish its own stock **or** transformed into Pearlily |

**Important design implication:** If a proposed fungal Influence for the Moonlit Lotus → Starlotus route must remain active after water is drained, its propagation must still reach the Plant (e.g. Airborne, or another specifically justified solution). A Waterborne path may cease when Flooded connectivity breaks. No exception to existing propagation is silently established.

### Aquatic family signature and latest refinements — agreed direction, details open

**Scope decision for the initial Plants:**

- **Kelpfull and Sunken Lotus are already sufficiently interesting as early, accessible Plants in the network.** Do not add elaborate individual tricks just to make them as mechanically complex as later specializations. Their connections, simple production role (Kelpfull), and Flooded/Waterborne entry role (Sunken Lotus) are enough at this stage; exact numbers and fungi remain open.

**Shared Aquatic identity:**

- **Moisture transitions are the family's signature mechanic.** Multiple Aquatic transformations and growth strategies should use **Flooded → Damp** or **Damp → Flooded**, not just require a static amount of water. There is no requirement for all Plants to use the same transition or timing.
- **All Aquatic Plants dislike Dry conditions.** **Damp** and/or **Flooded** are preferred. This is a family-level environmental commonality, **not** an agreed universal rule that Dry instantly kills every Aquatic Plant. Species-specific response to Dry (loss of productivity, dormancy, delayed death, etc.) remains open.
- Other shared traits or family-specific drawbacks can be unrelated to Moisture. Keep cultivation roles and Responses deliberately nonuniform.

**Kelpergeist → Kelpless added to the graph.** Losing **Flooded** conditions can cause Kelpergeist to transform into Kelpless. The Kelpless → Wild Watercress redemption route remains. Use **Continuous Exposure to the loss of Flooded conditions** before the unwanted Transformation, rather than an instantaneous change: the farmer gets a grace period to restore Flooded and prevent the transformation. Exposure interruption resets that timer under our standard rule. The **duration remains open**.

**Starlotus — origin-dependent Moisture preference:**

- Moonlit Lotus → Starlotus is associated with **draining from Flooded to Damp after qualifying exposure**, with no Growth/Ripening stage requirement (§59). The resulting Starlotus benefits from remaining **Damp**.
- Kelpergeist → Starlotus uses the alternative route in a **Flooded** environment. The resulting Starlotus gets **the same kind of benefit** from remaining **Flooded**, not Damp.
- The Plant **dislikes subsequent Moisture changes**. This is a property of the obtained Starlotus, not an entirely separate named species, and suggests the working term **Moisture Attunement**: the transformation route establishes the preferred current Moisture.
- **Agreed:** Moving away from the attuned Moisture **removes the special Starlotus benefit; it does not kill Starlotus merely for losing its attunement**. The challenge is preserving an optimization bonus, not a lethal maintenance requirement. Ordinary family-wide aversion to Dry is a separate concern.
- **Open:** Whether returning to the original attuned condition restores the special benefit, exactly what the bonus modifies, and whether unrelated hazards still impose their own species-specific consequences. Do not invent an additional penalty for changing the attuned Moisture.
- This is an intentional case where a **Transformation's context initializes a new, persistent cultivation characteristic** on the newly created Plant. It is not old progress or an inherited inventory; like every transformed Plant, the new instance starts at 0% (§58).

**Silvercress — simple to obtain; difficult to optimize, not to survive:**

- Silvercress should be **easy to transform into / obtain**.
- During **Growth (0–100%)**, it benefits from being **Flooded**.
- During **Ripening (100–200%)**, it benefits from being **Damp**.
- **Missing either beneficial condition gives no extra negative effect**; it simply misses that benefit. The challenge is managing Moisture to optimize performance, not keeping the Plant alive.
- The type and strength of the two benefits remain open (Growth Rate, Leaf Yield, Seed Yield, timing, etc.).
- This deliberately contrasts with Starlotus: **Silvercress rewards changing water levels at the right stage**, whereas **Starlotus rewards stable Moisture after acquiring its preferred state**.

**Revision to the Aquatic graph (added edge):**

~~~text
Kelpergeist --(loses Flooded; timing TBD)--> Kelpless
Kelpless --(redemption; recipe TBD)--> Wild Watercress

Moonlit Lotus --(Flooded → Damp / drain)--> Starlotus [benefits while Damp]
Kelpergeist --(specialist alternative; stays Flooded)--> Starlotus [benefits while Flooded]

Wild Watercress --> Silvercress [accessible; recipe TBD]
Silvercress: Flooded during Growth + Damp during Ripening -> benefits, neither mandatory for survival
~~~

The Cresscent → Pearlily shortcut, the Lotus Flooded/drain fork, and all earlier proposed paths remain in consideration. These refinements **do not finalize** a detailed fungus roster or numeric balance.

### Open questions for a later Aquatic pass

- What exact Source/Influence and conditions permit **Cresscent → Pearlily**? Does it reuse the Fungus used for Moonlit Lotus → Pearlily or provide a genuinely different route?
- Does Pearlily produce its own Seeds, Base Plant Seeds, or other Seeds? Cresscent's high germination and self-Seeds are intended, but exact yields/rates are open.
- Which Plants are genuinely "best" for a specific purpose, and which are intentionally safer or worse? Avoid overall strict rankings.
- How does the Kelpless recovery process work? What are its time/environment costs and trade-offs?
- Shared family traits already agreed: **Aquatic Plants dislike Dry**, and **Moisture transitions are a recurring signature**. Any additional shared environmental, reproductive, or fungal traits can be considered only if they serve a useful puzzle.
- Exact durations, germination rates, yields, transformation timings, assigned fungi, effect combination rules, and final names (including the unnamed Base Plant) remain unassigned.

---

## 13. Flowers — first family-interactions design pass

**Latest recipe status (§73, 26 October 2026):** All **12 Flowers Transformation recipes** are **APPROVED first pass**, including Daisyspell's timed Dim-preparation → Bright completion route into Orchidemon. Earlier §13 A/B/C/D Fungus labels and recipe sketches are historical placeholders, superseded by §73. The Plants' bloom windows and cultivation Effect compatibilities below are **not** Transformation eligibility gates.


**Status:** Family identity and the distinction between Progress-based and Time-based bonuses are agreed directions. The proposed network and named Plant/Fungus roles have been positively received but **are not final recipes, final statistics, or an implementation mandate**. We are content to leave Flowers at this design depth and return for balancing/integration after exploring more families.

### Family identity — agreed direction

- The family specializes in **unusual bloom/harvest-production curves**, including early or late peaks, forgiving or very narrow harvest windows, and **second blooms within the existing 0–200% lifecycle**.
- **Fungal synergies and combinations** can change those curves and enable transformations. Two concurrent fungal Influences may have a qualitatively new Response; fungi are not globally restricted to one effect or one Family.
- A third central mechanic is **time spent within productive lifecycle windows**: a slower Plant can benefit more from an hourly bonus while it remains within a specified progress interval.
- Unlike Aquatic and Woodlands, the Flowers signature is primarily **production timing and harvesting decisions**, rather than a shared environmental preference or lethal transformation risk.
- **Harvest remains a single, Plant-consuming action**. A second bloom is a second **potential harvest peak**, not an additional harvest of the same Instance.

### Progress-based vs Time-based bonuses — both agreed

- **Progress-based bonus:** A Plant's output or production behavior depends on its current lifecycle percentage (e.g., what it produces around 100% or 175%, or a bloom curve changing shape).
- **Time-based bonus:** A Plant accumulates additional harvestable output **per hour** while it remains in a specified lifecycle window and under qualifying fungal Influence. An example window was **159%–175%**, at a hypothetical **X output per hour**; this window and amount are **illustrative only**.
- These are **distinct, permitted effect types** and can interact. Slow Ripening can increase the amount of real time available for a Time-based bonus. In a Flower that normally has a late peak, this may create especially valuable fungal synergy.
- **Agreed terminal rule:** Upon reaching **200%**, a Plant is **done producing**. It cannot continue increasing a Time-based bonus just because the player leaves it planted at 200%. Harvesting is still a one-time action.
- **Agreed anti-stall rule:** Time-based output accumulates **only while lifecycle progress is actually advancing**. If Ripening is entirely paused at an eligible percentage, hourly accumulation pauses; slowing Ripening to a positive rate still extends the productive window. This prevents infinite production from a completely stalled Plant prior to 200%; upon reaching 200%, all further production ends.
- **Open:** Precision/rounding of elapsed-time accrual, interaction with interrupted fungal exposure and source maintenance, possible extreme low-but-nonzero rate exploits, and whether any effect needs a cap. Do not assign numbers yet.

### First proposed Flowers transformation network

The candidate **Base Plant is Daisydaze**, followed by several branch and cross-branch routes. All fungus labels and recipes below remain **working examples**:

~~~text
Daisydaze (Base Plant)
  ├─(A)─> Charmomile
  │         ├─(A + B)─> Daisyspell
  │         │             └─(C + D)─> Orchidemon
  │         └─(C + Dim)─> Marigloom
  │                         └─(D)─> Rosewraith
  ├─(B)─> Lavendream
  │         ├─(B + C)─> Lavendread
  │         │             └─(D)─> Dream Poppy
  │         └─(B + D)─> Orchidemon
  └─(C)─> Poppycock
            └─(B)─> Dream Poppy
                        └─(A + D)─> Rosewraith
~~~

The **alternative routes** to both **Orchidemon** and **Rosewraith** are intentional. Names are drawn from the user's Plant-name pool and may be changed after mechanics are developed.

### Provisional Plant roles and proposed Seed outputs

| Plant | Cultivation role or trade-off |
| --- | --- |
| **Daisydaze** | Straightforward Base Flower; produces its own Seeds and has an ordinary production curve |
| **Charmomile** | Early bloomer; accessible quick non-Seed harvest, with some Seeds |
| **Daisyspell** | **Extremely short/fast lifecycle**, an early and fleeting productive peak; possible Charmomile Seeds instead of self-Seeds |
| **Marigloom** | **Exceptionally slow/long lifecycle**, unusually late bloom and relatively narrow peak; extra effective with a time-accruing second-bloom Influence |
| **Lavendream** | Slow but forgiving; a **wide** productive harvest window, distinct from Marigloom's long wait until a late peak |
| **Lavendread** | Sacrifices most ordinary output for high **Lavendream Seed** production |
| **Poppycock** | Accessible self-Seed specialist with low ordinary output |
| **Dream Poppy** | Late productive window; potentially produces **Poppycock Seeds** |
| **Rosewraith** | **Two distinct potential peaks** in one lifecycle; the second potentially more productive with maintained fungal Influence and trade-offs against Seeds |
| **Orchidemon** | High maximum single-peak ordinary output, but **sterile**; optimized by a difficult fungal combination |

**Daisyspell and Marigloom are not considered underdeveloped.** Their contrasting lifecycle speeds give them distinctive roles without forced extra Material requirements. Material-specific influences may be explored only if interesting, **not mandatory**.

### Proposed functional fungal vocabulary (not locked organisms)

- **A — Hurry:** Advances/accelerates or shifts blooming earlier in responding Plants.
- **B — Linger:** Extends or slows productive windows, including slowing Ripening for certain Plants.
- **C — Dusk:** Changes bloom timing, and may emit a Luminous Influence to create Dim conditions.
- **D — Echo:** Can support second blooms, including potentially **per-hour extra yield** in a late progress window; may trade against Seed production.

These are broad **Influence/Response concept labels**, not universal effects guaranteed for all recipients. For example, **Echo + Linger** can be especially useful on **Marigloom**: it spends longer in a late productive window and gets more from hourly accumulation. Accelerating Ripening could be counterproductive in that combination.

### What remains intentionally open

- Every exact growth/ripening duration, output curve and total yield, timing threshold, progress window, germination/Seed quantity, relative strength and fungal recipe.
- Detailed balancing of extremely slow but nonzero progress and any lower-bound thresholds or caps; the no-accrual-while-stalled rule is already agreed.
- Whether a particular fungal combination changes output directly, causes Transformation, changes environmental Conditions, or all three on a species-dependent basis.
- No new lifecycle counter or multiple-harvest system is intended. The normal **0–200%** Plant lifecycle remains the foundation.

---

## 14. Desert — accepted first-pass family plan

**Current recipe authority (§74, APPROVED on 26 October 2026):** All **13 Desert Plant-owned Transformation recipes** are now approved first pass, with the exact named Fungus alternatives, resolved environmental conditions and exposure durations in §74. The older Ember/Rime/Shelter/Mirage terms and bracketed arrows below are illustrative historical sketches, **not final recipe assignments**. Earlier text saying these recipes are still unassigned is superseded by §74. All legacy Sand/Material references are superseded by §61.


**Status:** The first-pass Desert network, each Plant's broad role, the Temperature-oriented family identity, and recovery/dormancy puzzle direction are **accepted as our Desert design plan**. Names, exact fungal recipes, environmental exposure thresholds, stat numbers, and time values are **not locked**. This remains design text, not implemented gameplay.

### Desert identity — agreed

- **Extreme Temperature Adaptation** is the signature: many Desert Plants can derive useful benefits from **Hot and/or Freezing** Conditions that are commonly dangerous to other families.
- **Dormancy, stress endurance, and recovery** are supporting mechanics. Some species become dormant to survive extremes; some stay productive in Hot or Freezing conditions; others require surviving a continuous stressful period before a valuable recovery transformation.
- The family's identity is **not** that every species likes Hot or every species likes Freezing. A Plant can prefer only one extreme, exploit both differently, or find one detrimental.
- **Sand** is often attractive to Desert Plants, but not universally a strict requirement. Do **not** create a rule that every non-Desert Plant dies in Hot or Freezing conditions; effects remain species-specific, with cross-family exceptions.
- The **farming purpose remains Leaf output across planting/harvest rotations**. High-yield specialists are legitimate final rewards; Seed specialists exist primarily to make Leaf production sustainable or more efficient.

### Agreed first-pass transformation network

~~~text
Jadeheart (Base Desert Plant)
  ├─[Hot + Ember fungus]─> Ember Aloe
  │                        ├─[sufficient Heat exposure, then recovery]─> Aloemancer
  │                        │                                           └─[Mirage fungus]─> Mirage Rose
  │                        └─[attempt recovery too early]─> Ashen Rose
  │                                                            └─[recovery fungus]─> Sandrose
  │                                                                                     └─[Hot + Shelter]─> Cactopus
  ├─[Freezing + Rime fungus]─> Moonjade
  │                             ├─[survive Freezing, then thaw]─> Jadewisp
  │                             │                                  └─[Mirage fungus]─> Mirage Rose
  │                             └─[recovery + Mirage fungus]─> Pearadox
  └─[Sand + Shelter fungus]─> Cactopus
                                ├─[Hot + fungal combination]─> Cactaclysm
                                └─[Hot + Mirage fungus]─> Pearadox
~~~

All bracketed paths are **provisional recipes**, not final Source/Influence definitions. The **dual-route** access to Pearadox and Mirage Rose, and the **Ashen Rose → Sandrose → Cactopus** recovery connection, are intentionally part of the network.

### Accepted Plant identities, with detailed balance open

| Plant | Role / strategic decision |
| --- | --- |
| **Jadeheart** | Accessible Base Desert Plant leading to three distinct initial branches; keep it straightforward |
| **Ember Aloe** | Benefits from Hot conditions and produces its own Seeds; useful ordinarily, or can prepare for recovery |
| **Aloemancer** | Successful recovery from sufficient Heat exposure unlocks valuable production/Seed benefits |
| **Ashen Rose** | Undesirable transformation when attempting recovery **too early**, rather than from simply removing Heat; not a dead end |
| **Sandrose** | Low-maintenance, Sand-friendly, drought-tolerant redemption Plant; provides a route back to Cactopus |
| **Moonjade** | Survives Freezing by **Dormancy**: no Growth/Ripening progress or Time-based production while dormant |
| **Jadewisp** | Obtained upon correctly thawing/recovering Moonjade; a strong **Moonjade Seed** producer |
| **Cactopus** | Reliable, comparatively easy Desert producer; continues developing in Hot conditions |
| **Cactaclysm** | Prestigious **high-Leaves / zero-Seeds** Plant reached by a demanding fungal combination; high output is a worthwhile reward, no exotic ability required |
| **Pearadox** | Hot improves ordinary harvest yield; Freezing benefits **Seed production** while Plant continues developing instead of entering Dormancy |
| **Mirage Rose** | Rare shared endpoint of Aloemancer/Jadewisp routes; produces a **mix of Ember Aloe Seeds and Moonjade Seeds**, not its own Seeds, supporting future harvest rotations |

Some Plants provide Seeds, some provide large Leaf harvests, and some reduce risk or simplify access. Their different paths and maintenance costs are meaningful even when the player's eventual optimization target is still **Leaves**. Whether actual named species keep these roles after detailed balancing remains revisitable.

### Provisional multi-use fungal roles

| Working fungus concept | Role |
| --- | --- |
| **Ember** | Thermal warming; helps establish Hot conditions for Ember Aloe, Cactaclysm and other responses |
| **Rime** | Thermal cooling; supports Freezing routes such as Moonjade or Pearadox |
| **Awakener / recovery fungus** | Enables species-specific recovery, successful transformations, and redemption |
| **Shelter** | Helps make the Cactopus/Sandrose route viable, possibly with a distinct non-Thermal habitat effect |
| **Mirage** | Participates in unusual or branching transformations, including Pearadox and Mirage Rose |

These are **working roles**, not a fixed count of fungi or universally beneficial Influences. We should seek cross-family use, including Thermal Influences that help Desert while disadvantaging some Flowers or aiding exceptional Food Plants.

### Dormancy, exposure, and recovery semantics

- **Dormancy pauses Growth/Ripening** and therefore, under the agreed anti-stall rule, also pauses **Time-based output bonuses**. It need not prevent separate **Continuous Exposure** timers from advancing while their conditions remain satisfied; e.g., a dormant Moonjade can still endure Freezing.
- **Proposed trigger-resolution detail to retain for implementation design:** A recovery transformation can check whether a survival exposure threshold was fulfilled **immediately before** the stress condition ends. If the needed fungus is present at that event, the transformation succeeds; otherwise the exposure resets normally. This allows "endure stress, then recover" without an indefinite banked stress meter.
- **Example:** Moonjade maintains the Freezing exposure threshold while Dormant; then on thaw with the Awakening Influence present it transforms to Jadewisp. For Ember Aloe, invoking a recovery-triggering fungus too early creates Ashen Rose instead of Aloemancer.
- The exact evaluation order between condition changes, ending exposure, and attempted transformations requires explicit future definition and testing; none of this changes existing implemented propagation rules today.

### Deliberately deferred

- Exact duration of extreme Temperature exposure and individual death/dormancy requirements; no universal mortality rule.
- Which non-Seed harvest curves and Seed yields maximize rotation throughput, and the cost-benefit of a sterile Cactaclysm crop compared with retaining reproducible Cactopus.
- Whether Dormancy suppresses a particular Plant's emission or affects other sources, and how reawakening affects speed and growth progress.
- Specific fungus objects, habitat requirements, ranges, secondary environmental effects, and final transformation recipes.
- All numerical stats and thresholds. Do not implement these design concepts yet.

### Next focus — updated six-family decision

**Food has been replaced by Spices and Ingredients as two separate Families.** Spices keeps Food's approved *first-pass Illumination network and mechanics*, with spice-themed species names to choose later. Ingredients adds a simple, **single-Base-to-all terminal species** family for RPG cooking staples, per the newer approved §41 architecture; the old no-transformation proposal is superseded. The older Fertility-centered suggestion remains superseded.

- Candidate design roles: Plants preferring Bright versus Dim/Dark; a fungus that affects illumination while also enabling a transformation; different transformations or harvest optimizations depending on Illumination; and useful Seed producers supporting high-Leaf-yield crops. These are illustrative examples, not confirmed Food species or recipes.
- The potential distinctiveness from Aquatic is **spatial light management** (overlapping Luminous Sources, Airborne propagation, Blockers, gradients, and different recipient Responses) rather than simply shifting a Condition from Growth to Ripening. Do not invent a periodic day/night cycle to make this work.
- **Fertility and permanent Base Material may ultimately be removed from the game** if they do not add enough meaningful puzzles. They are **not removed or deprecated yet**. **Defer that decision until the complete Plant/Fungus roster, environmental interactions, numerical balance, and harvest windows are designed**; then assess their actual usefulness.
- Existing environmental code and [Environmental System v1.1](../../environmental-system-v1.1.md) remain authoritative in the meantime. Future removal would require reviewing the baseline/Source model and proposed material-overlay eligibility and propagation. **Do not add Material or Fertility interactions just to justify preserving those systems.**

---

## 15. Spices and Ingredients — accepted direction after the Food sketch

**Latest user confirmation (§75, 26 October 2026):** The user expressly accepted the proposed Spices recipe pass, emphasizing **both Sunrice/Dillusion → Pum'king opposing-Influence overlap routes** and **Ghost Rice's Lit-to-Glass-Apple route**, and asked to add it to GitHub. The repository previously retained only historical schematic recipe labels (§15) and Plant profiles (§§37–40), not a verifiable fully specified recent 11-row list of named fungi and exposure hours. §75 preserves the approval and traceable route/lighting constraints **without inventing precise unrecorded times, named contacts, or unverified conditions**. The core route acceptance is confirmed; detailed recipe parameters remain awaiting faithful recovery.


### Spices — preserve the Food draft mechanically

**Agreed:** Preserve the 10-Plant Food first-pass network and all its Illumination, fungal-placement, Leaf-production, and Seed-support interactions; **rename the species to spices later** so they make intuitive sense as cooking items in the separate RPG. The family name is now **Spices**, *not* Food or Lightbound. No proposed spice-species names are final. The rest of this section uses the original Food sketch names as **temporary identifiers** so the network cannot be lost during renaming.

**Signature:** Shape Bright/Lit/Dim/Dark zones with Luminous Sources and Blockers; position fungal effects so some Plants receive complementary Influences while others avoid detrimental light; create repeatable, highly productive harvest rotations with specialist Seed sources.

**Preserved first-pass transformation network** (the exact fungus labels and environmental thresholds are still proposals):

~~~text
Thymely (Base)
  ├─[Bright + Glimmer]─> Sunrice
  │                        ├─[Bright + Prism]─> Starberry
  │                        │                         └─[Bright + Prism + Veil]─> Glass Apple
  │                        └─[Lit + Glimmer + Veil]─> Pum'king
  ├─[Dim + Veil]─> Moonrice
  │                   ├─[Dim + Prism]─> Thymekeeper
  │                   └─[Dark + Gloam]─> Ghost Rice
  │                                              └─[Lit + Prism]─> Glass Apple
  └─[Dark + Gloam]─> Shadow Onion
                            └─[Lit + Prism]─> Dillusion
                                                   └─[Lit + Glimmer + Veil]─> Pum'king
~~~

**Provisional Plant roles, preserved without relabeling abilities prematurely:**

| Original draft Plant name (to be renamed) | First-pass gameplay role |
| --- | --- |
| **Thymely** | Straightforward Base Plant, own Seeds and reasonable output |
| **Sunrice** | Sustainable, productive Bright-field crop, own Seeds |
| **Moonrice** | Dim-zone Seed producer, own Seeds, supports multiple branches |
| **Shadow Onion** | Simple Dark-field crop, own Seeds, transformation gateway to Dillusion |
| **Starberry** | Strong Bright + Prism Leaf producer, produces **Sunrice Seeds** |
| **Pum'king** | High-yield **sterile** specialist requiring **Glimmer + Veil concurrently while final Illumination remains Lit**; two routes |
| **Thymekeeper** | Dim-area Seed supplier that produces large amounts of **Sunrice Seeds**, supporting productive bright fields |
| **Ghost Rice** | More productive Dark-field crop, produces **Moonrice Seeds**; can transition into Glass Apple |
| **Dillusion** | Flexible Dim/Lit, self-Seed-producing Plant; alternative route to Pum'king |
| **Glass Apple** | Very high non-Seed harvest while Bright + Prism; **Starberry Seeds** instead of self-Seeds; alternate routes via Starberry and Ghost Rice |

**Current balancing decision about Ghost Rice vs Shadow Onion:** **Do not redesign their roles merely out of fear they are too alike.** Both may use Dark habitats, but their Seed identities, production efficiency, cultivation costs, and eventual precise numerical profiles can make them more distinct during the later balancing pass. The user expects balancing to *increase*, not reduce, their differences.

**Illustrative fungus roles:**

- **Glimmer:** Positive Luminous environmental Influence plus species-dependent cultivation/Transformation Effects.
- **Veil:** Negative Luminous environmental Influence; can be useful or harmful depending on recipient.
- **Gloam:** Stronger darkening influence for Dark specialization.
- **Prism:** Cultivation/Transformation Influence without necessarily changing Illumination.

**Key spatial puzzle:** Pum'king's candidate recipe requires overlapping Glimmer and Veil while **net final Illumination is Lit**. Their opposing Luminous contributions can cancel numerically while both independent cultivation Influences still reach the Plant. Real net conditions must respect existing environmental clamping, neighboring Illuminations, and Blockers. This is not permission to bypass the environment system.

**Cross-branch planning:** Moonrice → Thymekeeper → Sunrice Seeds supports Bright Sunrice / Starberry / Glass Apple crop rotations. Sterile Pum'king and high-output Glass Apple are alternative optimization objectives with different fungus, Seed, and layout costs. **Getting maximum Leaves across cycles remains the primary purpose**, not acquiring prestige species as collectibles.

**Food-sketch status:** The user likes the system strongly, and its mechanics are being **retained intentionally**. Exact numbers, assignments, transformations, spice-themed names, and RPG ingredient mappings still require a later pass. Earlier recipe descriptions are a **first-pass design**, not final implementation instructions.

### Ingredients — sixth family with one universal transforming Base (REVISED AND AGREED)

**Current agreed architecture (supersedes the original "no transformations ever" Ingredients idea):** Ingredients has **one Base Plant** whose Seeds are the family's initial Seeds. The Base alone can transform **directly into every other Ingredient species**, without intermediate species transformations. **All non-Base Ingredient species are terminal: no transformations out of them, including into each other or back to the Base.** Their ordinary 0–200% Growth/Ripening lifecycle, Seed production, one-time consuming harvest and compatible fungal cultivation Effects stay unchanged. A Transformation creates a new terminal Plant at **0% Growth** (§58).

~~~text
One Ingredient Base ──┬──> Ingredient A [terminal]
                     ├──> Ingredient B [terminal]
                     ├──> Ingredient C [terminal]
                     ├──> Ingredient D [terminal]
                     └──> ... every other Ingredient directly [terminal]
~~~

- The family should yield recognizable **RPG cooking staples**, not the renamed magical Spices. Prior illustrative candidates were Potato, Rice, Carrot, Onion, Apple, Pumpkin and Strawberry; **the actual seven-species proposal and choice of Base follow in §42, not yet accepted.**
- **Only Base Seeds are initially available**. After first reaching a transformed Ingredient, its ordinary Seed harvest **may** provide own Seeds, another established identity, or none depending on that species' profile; no separate non-Base Seed-unlock system is required. Producing own Seeds lets players sustainably grow terminal species directly without giving them any transformation ability.
- Fungi may influence **all** Ingredients' normal growth, Ripening, Yield, Seed output and habitat through the established ordinary Effects/Influences. Only the **Base** may have Plant-owned species-transformation recipes. There is **no fungus-emitted generic Transformation Effect**.
- Transformations remain **single-stage and direct** rather than cross-branch puzzles: the simplicity lies in the graph, not necessarily in identical environmental preferences or perfectly equal output stats.
- Ingredients should remain practical sustainable farming choices, not automatically weaker than magical Plants. The separate RPG's produced item mapping remains to be designed independently; **"Leaves" is still the universal temporary non-Seed yield term** and does not imply edible potato leaves.
- No gameplay code has been modified.


### Open items

- Final **Spices** species names that evoke usable cooking spices while keeping all ten roles and edges.
- Ingredients roster/Base identity, terminal species' Seed identities and eventual yield targets; **the single transforming Base and Base-only starter Seed access are agreed** (see §41).
- Final universal non-Seed harvest term (**Leaves** remains temporary; **Produce** is a candidate, not locked).
- Exact fungal catalogue and stats; later evaluation of whether Fertility and Material mechanics remain worthwhile.
- No changes to the game implementation now.

---

## 16. Fungal consistency and learnability — agreed, with clarification on multiple Effects

**Agreed:** Players should be able to **memorize a fungus's Effects**. Consistency applies **to each defined Effect individually**, not to the fungus having just one Effect or to all its Effects sharing a theme. **A fungus may have two or more entirely independent Effects**—environmental, Plant-targeting, or overlay-related—and they do **not** need an underlying thematic relationship. The important restriction is that these Effects are **stable, defined abilities**, rather than arbitrary one-Plant surprises.

### Clear, repeatable Effect identity

- **Environmental Effects are not Plant-dependent.** A fungus emitting a negative Luminous Influence always contributes darkening wherever that Influence reaches according to the environmental system; it does not switch to brightening around another Plant.
- **Plant-targeting Effects have consistent meaning and direction.** An Influence that accelerates Growth can accelerate it by different magnitudes on different recipients, be inactive on certain Plants, or be modified by a condition; **it must not directly slow Growth**. The same applies to Ripening slowdown, yield boosts, etc.
- **Different Effects on the same fungus can be unrelated.** For example, a single fungus may **always darken illuminated hexes** and **always apply a Ripening slowdown to Plants receiving that cultivation Influence**. Neither ability needs to justify the other.
- **Each Effect can have a standard/default strength**, with defined family-specific, species-specific, and environmental **modifiers or activation conditions**. Changing the **number**, not the Effect's nature, is allowed and encouraged.
- **Indirect consequences may differ.** Darkening can benefit a shade-loving Plant but harm a Bright-loving Plant **through the altered Illumination Condition**. This does not mean the darkening Effect itself reversed.
- **Species-specific Transformations are governed by the Plant's own recipes and conditions**, **not** by a fungus emitting a special transformation Influence. A recipe may test the presence of a fungus, receipt of any named fungus's otherwise-normal Influence, the current environmental state, overlays, and continuous time. See §17; all non-transformation fungal Effects still retain their consistent identities.
- No arbitrary requirement that all a fungus's Effects be **cohesive** or **related**. Avoid unnecessary effect bloat for clarity, but do **not** discard a perfectly legible multi-effect fungus simply because its abilities are unrelated.

### Worked example — Veilcap (illustrative stats, design endorsed)

Veilcap has **two independent Effects**:

1. **Environmental:** a negative Luminous Influence; it consistently darkens the environment wherever it reaches.
2. **Cultivation:** a **Ripening slowdown**. The type of effect stays the same for every Plant that receives it. **It never accelerates Ripening.**

**Illustrative rate modifiers, not locked balance:**

| Recipient / condition | Veilcap Ripening slowdown |
| --- | ---: |
| Default affected Plant | **30%** |
| Aquatic Plant in qualifying **Lit** conditions **or** Flooded | **50%** |
| Woodlands Plant while **Warm** | **50%** |
| A particular Plant with a defined stronger compatibility bonus | **70%** |

- The extra **70%** species-specific effect is *not* a one-off ability: it is simply a larger magnitude of the **same slowdown**.
- The Aquatic "**light or Flooded**" condition is a conceptual example. The exact Illumination label ("light" vs Lit or Bright), applicability, and numbers will be chosen during balancing; no special case is yet a final plant recipe.
- **Two conditions being met does not automatically imply stacked bonuses**. Whether modifiers stack, replace one another, or use a maximum is a separate later rule.
- Consistency applies to the effects each fungus **actually emits and propagates**. Different modes/ranges for independent environmental and Plant-targeting emissions are possible, so confirm which effects reach a given hex rather than assuming exposure to one guarantees exposure to all.

### What counts as an undesirable one-off?

- **Avoid:** A generally Growth-accelerating fungus *secretly* extends just one Plant's harvest window without a **separately defined, general harvest-window Effect**.
- **Fine:** That fungus has **Growth acceleration and harvest-window extension as two explicitly listed Effects**, with recipient eligibility and different magnitudes stated consistently—even if these powers seem unrelated.
- **Fine:** One Plant has an extraordinary +70% compatibility while most get +30% or +50%, as long as the **identity of the underlying Effect stays constant**.
- **Fine:** The same fungus changes Illumination, and a Plant suffers from its newly unsuitable light Condition; that is an **indirect environmental consequence**, not a reversed direct Effect.

### Implications for the proposed roster

**Veilcap is valid as originally proposed:** retain **both darkening and Ripening slowdown**, without needing to explain one through the other or split it into separate fungi.

The latest **13-fungus roster** (Sim'mushro'dim, Glimmergill, Veilcap, Prismorel, Emberbolete, Chillanterelle, Rainmorel, Droughtcap, Rushroom, Echomorel, Wakemorel, Hushroom, Mycelord) is **still only a candidate**; effects, numeric values, conditions, emitted ranges/modes, and fungi-to-transformation mappings remain unassigned. The user favors **Sim'mushro'dim** as the name of an Enchanted-linked fungus. Audit proposed fungi by **consistency of each stated Effect**, not by forcing unrelated abilities to be separated.

---

## 17. Transformation ownership — Plant-defined recipes, no Transformation Influence

**Agreed design direction (supersedes earlier 'transformation Influence' wording):** A fungus **never needs an Effect or Influence whose job is to activate Transformation**. **Transformations belong to Plants.** Each transformable Plant defines a collection of conditions that, when satisfied together for the required duration or transition event, change that Plant's identity.

### What a Plant recipe may check

- **Receiving any emitted Influence from named Fungus A and named Fungus B at the same time** for X uninterrupted hours. These are **ordinary, separately defined emissions** (e.g. darkening, Ripening slowdown, an environmental Source contribution) rather than special Transform Effects. The recipe checks which fungal Sources reach the Plant.
- **Current environmental Conditions**—e.g., Flooded, Warm, Lit, Dark—potentially including required combinations or changes between states.
- **HISTORICAL/SUPERSEDED example — physical adjacency to Fungus C** was once proposed as a separate requirement even without Influence reach. **§68 now defines named fungal contact by actual Influence-zone reach**; mere adjacency outside every emitted zone is insufficient. Do not use this older adjacency-only example as an approved recipe ingredient.
- **Hex overlay states** such as Enchanted or Mycelial, where these prospective overlays are retained.
- **Current Plant identity and Continuous Exposure** conditions. **Lifecycle progress, Growth/Ripening stage, and maturity are NEVER Transformation eligibility requirements** under the approved §59 rule. They still matter for ordinary Growth, production and harvesting.
- **Change/event triggers** for the Desert recovery model (e.g. previously sustained Freezing, then thawing while another condition/fungus is present). Evaluation at transition boundaries requires future exact ordering rules; the ordinary Continuous Exposure reset still applies.

### Consequences of moving responsibility to Plants

- **Fungi keep only their declared environmental, cultivation, and overlay Effects**; effects remain consistent in type/direction, with family/species/condition-dependent magnitudes as described in §16.
- **A Fungus can be used in multiple transformation recipes without gaining a unique power for every recipient.** The same fungus pair may transform different eligible Plants to different destinations, or have no transformation on another Plant.
- **No Transformation Effect** needs to be emitted by Wakemorel, Prismorel, Rushroom, or any other fungus. Provisional descriptions of a fungus 'enabling a transformation' should be read as shorthand for **satisfying a condition in the Plant's recipe**, including an ordinary Influence reaching it or physical proximity.
- **Fungi still may affect how feasible or dangerous a recipe is**, because they provide ordinary Influences, change environmental states, or sustain overlays that the recipe or a lethal hazard can check. Their Growth/Ripening Rate Effects change farming and harvest timing, **not Transformation eligibility or the required exposure duration** (§59). A transformation can occur from a conjunction of conditions without any special cultivation-only Influence.
- **Source attribution may be important:** two opposite Luminous Source contributions can cancel in net Illumination while a Plant's recipe still requires the presence/reach of both named sources. An implementation must be able to distinguish **which Source emissions reach a hex** from only the computed final environment level. This need does not change existing Environmental System v1.1 arithmetic.
- **Recipes are species-defined; for Ingredients, recipes can exist ONLY on its single Base Plant, with a separate direct edge to every terminal Ingredient**. Terminal Ingredients never transform. This supersedes the older sixth-family no-transformation exception.

### Examples, illustrative rather than fixed recipes

| Plant-defined recipe | Transform |
| --- | --- |
| Plant A receives any qualifying Influence from Fungus A **and** B continuously for X hours | A → B |
| Plant A remains **Flooded** and physically adjacent to Fungus C continuously for X hours | A → C |
| Sunrice receives contributions from Glimmergill and Veilcap **while final Illumination is Lit** for a specified duration | Sunrice → Pum'king |
| Moonjade has endured sufficient Freezing, then thaws while the required fungus/conditions are present (transition checks to be specified) | Moonjade → Jadewisp |

All recipe time values, overlap handling, competing recipe priority, target identities, and source-attribution details remain open until the later mechanics pass. **No fungus requires a generic 'Transformation Influence' category or payload.**

---

## 18. Fungus-roster design criteria — broad Effect coverage and player-created solutions

**Agreed design direction, after the first 13-fungus review:** The roster must support a **broad range of meaningful cultivation Effects**. We should **combine multiple separately defined Effects into individual fungi wherever useful**, rather than introducing a separate fungus for every effect. A fungus's independent Effects need not share a thematic explanation; each Effect stays consistent in direction and identity across recipients as specified in §16.

**The main design test is whether a fungal combination creates a puzzle for the player**, not merely a ready-made package of bonuses that always go together.

### Distinct Effects that must not be conflated

The Ripening/harvest system distinguishes at least **four fungus-adjustable dimensions** and a separate **innate Plant trait**, per the later agreed cleanup in §19:

1. **Extend the favorable harvest window** by changing the output curve or peak width **without changing Ripening Rate**.
2. **Slow Ripening**, extending elapsed time spent at each stage **without automatically expanding the progress-percentage harvest window**.
3. **Add output through qualifying time-based exposure** during a specific Ripening interval; this requires the Plant's lifecycle to **continue advancing**, and ceases at 200%.
4. **Accelerate Ripening**; distinct from accelerating Growth or changing the harvest curve.

A **second bloom/second productive peak** can exist as part of a Plant's **innate 0–200% harvest curve**. **No fungus adds a new peak to a Plant that lacks it**, and there is still only one harvest action. See §19.

Other candidate Effect dimensions should be reviewed across **Growth Rates, Seed Yield, Seed germination, non-Seed yield, Moisture, Temperature, and Illumination**, plus agreed overlays only if they prove worth retaining. Avoid assigning all interesting effects to only a narrow subset of these dimensions. This is an *effect coverage checklist*, not a commitment to one fungus or fixed quantity per effect.

### Build productive tensions rather than automatically reinforcing packages

- **Superseded example:** Combining late-bloom production with a fungus-created second bloom was both too self-reinforcing and inconsistent with the later decision that **bloom count/peak positions are innate Plant-curve traits**. Fungi can adjust the existing curve or enhance production without creating an extra peak.
- **Promising alternative (proposed, not yet locked as Echomorel's final Effects):** A fungus offers **late-bloom production improvement** **and** emits a **negative Thermal Influence** strong enough to contribute to Cold/Freezing in suitable circumstances.
- A **Marigloom** that benefits from the late-bloom improvement but is harmed by Freezing would need **spatial management** to exploit the bonus without taking the temperature penalty.
- A **suitably tolerant Desert Plant** could potentially benefit from both effects, **provided it actually progresses and has a harvest curve that can use the late-window effect**. Dormant Plants do not accumulate time-based bonuses merely by remaining Frozen; immunity/tolerance is not itself enough.
- Player solutions might use **selective Blockers** that distinguish applicable emitted Kind/Mode tags, or an **independent warming Source** to offset the cooling. Both solutions must obey actual Source propagation, Adjacency, and final environmental resolution. A single indiscriminate blocker would not necessarily isolate the benefit from the cooling.
- **Do not make "one benefit plus one harm" a mandatory template for every fungus.** Simple fungi, deliberate counters, mutually useful Effects, and synergies are allowed. A real decision can also come from fungally occupied hexes, range, incompatible nearby crops, setup cost, or harvest timing. What matters is giving the player trade-offs and **multiple viable approaches** instead of predetermining the solution.

### How to evaluate the candidate roster

1. First inventory all distinct candidate Effect types. **Do not prematurely cap the roster at 13 fungi**; that number is only the first sketch.
2. Assign several **clear, separately described, directionally consistent Effects** to a fungus when that combination offers interesting play.
3. Identify the **problem, constraint, or opportunity cost** the combination creates for different Plants and garden layouts.
4. Test at least **two distinct useful Plant/family contexts** when practical, without arbitrary one-off new powers or reversing an Effect.
5. Keep **Plant-defined Transformation recipes** separate. A fungus only contributes its ordinary Effects, environmental conditions, source presence, adjacency, or overlays, per §17.
6. Leave exact stat percentages, thresholds, spread modes, and final fungus names open for a later balanced pass.

**Echomorel review status:** The original 'late-bloom bonus + fungus-created second bloom' package is **superseded**. Second peaks are intrinsic Plant harvest-curve traits. The *late-bloom bonus + cooling* counterproposal is still promising but **not yet agreed as Echomorel's final specification**. The entire fungus roster remains deferred until after cataloguing Effects and defining Plants.

---

## 19. Effect-catalogue cleanup and Plant-first design workflow — latest agreed direction

### The order of design

**Agreed workflow:** We had been designing fungal combinations before clearly defining what Plants can do—the equivalent of constructing a chess puzzle before specifying piece movement.

1. **Finalize the exhaustive, nonredundant fungus-Effect vocabulary** and its mechanical distinctions. Do not decide which specific fungi will emit them yet.
2. **Specify every Plant, one by one:** innate harvest/Seed curves (including natural multiple peaks, if applicable); baseline Growth and Ripening; environmental preferences/hazards/dormancy; innate tolerances; quantified or conditional compatibility with catalogue Effects; and **Plant-owned** transformation recipes. Fungal presence required by recipes can be stated provisionally without designing the final fungus roster.
3. **Only after Plants are well defined, design the fungi:** combine fixed, consistently directed Effects to create player-solvable placement, environment, timing, and production trade-offs.
4. Check feasibility, multiple solutions, cross-family interactions, and sustained non-Seed yield economy; then perform full numerical balancing and revision as needed.

### Remove Secondary Bloom as a fungal Effect — agreed

- A Plant's **number and positions of harvest peaks** are part of its **innate harvest curve**; e.g., a Rosewraith-like Plant can inherently have two productive peaks in 0–200%.
- A normal **Harvest Yield Adjustment** applies to the Plant's already-existing Leaf output, **including both peaks if there are two**. Other separately specified window/timing/rate effects can still reshape or shift existing productive portions according to their definitions.
- **No universal fungus Effect introduces an entirely new second bloom on Plants that otherwise have one.** This avoids an overly dominant late-game option that simply adds Leaf production near natural Seed-rich Ripening stages.
- Distinguish natural multiple peaks from **Time-based Production** (hourly accrual during a qualifying progress window), **Harvest Window Adjustment**, **Ripening Rate modification**, and still-one-time harvesting.
- Earlier proposed 'Fungus D / Echo gives Rosewraith a second bloom' language is superseded: Rosewraith's multiple peaks, if retained, are **innate**, not granted by a fungus. The fungal assignments will be revisited after the Plant specifications.

### Remove Environmental Tolerance as a fungal Effect — agreed

- No general fungus Effect will make Plants tolerate otherwise harmful Temperature, Moisture, or Illumination. It would too easily become a universal solution and displace the intended puzzle of maintaining suitable conditions through Source placement, environment management, and Blockers.
- **Innate Plant-specific resilience, dormancy, and environmental Responses are retained.** Desert Plants may naturally survive Freezing/Hot better than others. Exposure to an unsuitable environment can still have species-specific penalties or eventual death.
- Earlier provisional **Hushroom tolerance** assignments are **not part of the approved Effect vocabulary** and need replacement if Hushroom survives the later fungus roster. Fungus names and roster count are not yet finalized.

### Overlay decision — Mycelial promising; Enchanted reconsidered

- **Enchanted is a candidate for removal**, not definitively removed. It currently lacks a compelling distinct gameplay function and may be unnecessary environmental complexity. Do **not** design more mechanics around Enchanted solely to preserve it.
- **Mycelial is retained as a valuable candidate** because time-dependent spreading, propagation beyond initial Source reach, and delayed retreat offer different placement/timing challenges from ordinary Property Influences. It could provide a useful **counterweight for particularly powerful multi-effect fungi**, by making them harder to deploy near sensitive crops or harder to remove cleanly.
- Whether Mycelial colonization is always harmful, which Plants/Fungi are vulnerable or eligible, and how often fungi emit Mycelial remain **open**. It need not be a blanket tax on strong fungi or a universal death field.
- If Enchanted is eventually removed, **Sim'mushro'dim's name can survive**; it need not remain Enchanted-specific. The fungus's effects will be chosen only after Plant specification.
- Existing v1.1 environmental implementation is unchanged; the earlier proposed dual Mycelial/Enchanted overlay model is **superseded in design priority**, not silently changed in code. Any later removal of Enchanted/Base Materials requires its own formal environmental reconciliation.

**Catalogue status — later update (see §20):** The user is **happy with the consolidated Effect catalogue** and has approved **moving to Plant-by-Plant specifications**. The effect vocabulary is now the agreed working basis; do not reopen or extend it without a specific gameplay reason. Detailed percentages and eligibility remain for the Plant/balance passes. No current 13-fungus roster or exact effect assignments are locked.

---

## 20. Plant-design defaults and start of Plant-by-Plant phase — agreed

### Effect catalogue and design order

**The user accepts the consolidated working Effect catalogue.** No further general Effect changes are requested now; continue to define each Plant one by one before designing a fungal roster. Reopen the catalogue only when an actual Plant design reveals a meaningful gap or redundancy. Existing Effects retain the §16 rule of consistent direction, conditional strengths, and any explicitly defined independent effects. Transformations are Plant-owned recipes (§17).

### Default 1: Freezing and Hot are bad for Plants, with deliberate exceptions

- **General player expectation:** **Freezing and Hot are adverse Temperature extremes.** Most Plants dislike them. No default extreme-temperature bonus exists.
- Species-specific negative outcomes can be **reduced Leaf or Seed output, delayed development, Dormancy, and/or death**, with causes and timing defined during Plant specification. **No universal instant-death rule** is implied.
- **Resistance is exceptional:** Some Plants may withstand Hot or Freezing relatively unharmed, but that alone does not confer bonus production.
- **A benefit from Hot or Freezing is a rarer, distinctive Plant trait.** Such exceptions should be intentional, making the Plant notable and opening an optimization strategy not available to ordinary crops.
- **Desert identity remains valid:** selected Desert Plants (e.g. Ember Aloe, Moonjade, Pearadox) can resist or benefit from specified extremes for their established reasons. **Desert family membership does not imply every Desert Plant likes both extremes**. Species have different tolerances and risks.
- Cold, Temperate, and Warm retain species-specific responses; no new blanket favorable state is added.

### Default 2: Mycelial ground is intrinsically hazardous, never beneficial to Plants

- **No Plant gets a bonus to Leaves, Seeds, Growth, Ripening, or other direct cultivation performance merely for occupying a Mycelial hex**. This is a firm design rule even for rare exceptional species.
- **Most Plants die after prolonged continuous exposure to Mycelial ground.** Exact species-specific thresholds and any pre-death penalties remain to be specified.
- **A few Plants may tolerate Mycelial** without dying as quickly, or perhaps survive indefinitely, but still gain **no intrinsic benefit** from Mycelial ground. Tolerance is a Plant trait, **not a fungal Environmental Tolerance Effect** (removed from the catalogue in §19).
- Mycelial harm is a **Response to the overlay state itself**, distinct from any fungus's favorable cultivation Influence. Removing a fungus's emission does not instantly clear lingering overlay exposure during colony retreat, under the proposed propagation model.
- This supports **powerful multi-effect fungi with nontrivial spatial costs**: players must arrange Sources, Blockers, and harvest timing to enjoy useful Influences without letting Mycelial colonization destroy crops.
- **Fungi may still need or create Mycelial habitat** if future fungus design establishes such requirements; this restriction specifically says **Plants** never enjoy the overlay itself. Do not assume the overlay must be present under the receiving Plant just because an emitting fungus needs it.
- **Implementation status:** Mycelial is an agreed **design direction**, not implemented in Environmental System v1.1. Its eligibility, spread/retreat timing, fungus assignments, and exact impacts require a later pass.

### Plant-specification checklist for the next sessions

For each Plant: define natural Growth and Ripening; Leaf and Seed harvest curves and Seed identities; environmental preferences; **specific reactions to Freezing and Hot**; **specific Mycelial exposure threshold/response**; innate special exceptions; how the agreed catalogue of fungal Effects modifies it (including magnitudes/conditions where necessary); transformation recipes (for all transforming species, including the single Ingredients Base, but NOT its terminal Ingredients); and why it matters for sustained Leaf farming.

**No fungi or new code are being designed/implemented in this step.** The proposed 13-name roster remains nonbinding, and Enchanted and permanent Base Materials remain deferred per earlier decisions.

---

## 21. Confirmed five-pass workflow for Plant/Fungus design

**Agreed current sequence** (supersedes earlier attempts to finalize fungi before fully specifying Plants):

1. **All Plants first.** Working one Plant at a time, define exactly these six parts: **Natural lifecycle; Natural harvest; Germination; Environment; Farming purpose; Effect compatibility**. This covers innate multiple harvest peaks, Seed identities/curves, favorable and harmful hex states, extreme-temperature/Mycelial Responses, and sensitivity/conditional bonuses to the agreed Effect catalogue. **Do not choose named fungi or settle transformation recipes during this pass.** Do not require an exhaustive environmental bonus checklist when none is useful.
2. **First fungus pass.** Only after the Plant profiles are drafted, bundle fixed, consistent fungus Effects into candidate fungus species with habitat and propagation considerations.
3. **Complete Plant-owned transformation recipes.** Decide which named fungi and their **ordinary Influence reach**, physical adjacency, environmental/overlay states, environmental transition events, and continuous exposure durations satisfy each Plant's transitions. **No lifecycle percentage or Growth/Ripening stage gates (§59).** This is not a return to fungus-emitted Transformation Effects.
4. **Adjust fungal designs as necessary** to ensure workable, readable puzzles, multiple useful strategies, and sensible cross-family reuse.
5. **Adjust Plant designs where necessary** to fix weak or dominant strategies, impossible transformations, or discrepancies exposed by the preceding phases; then balance precise numbers in context.

**Status:** The six-part Plant specification method is agreed. Any proposed first-pass statistics or compatibility profiles produced next remain **proposals until reviewed**, even though the workflow itself is locked.

**Woodlands layout corrections:** The user confirms the arrow **Mistlewoe → Tanglethorn**, previously tentative, and adds **Mandrabra → Mandrakazam** directly in addition to **Mandrabra → Mandrakadabra → Mandrakazam**. These are network facts, not provisional recipe assignments.

---

## 45. Fungi — original four environmental-shaper proposals (SUPERSEDED IN PART by §46; NOT approved)

**Important historical note:** This entire §45 batch was written **BEFORE the user's approved revisions in §46** and its four original emitted-Effect combinations, fungus habitat/Seed claims and 0–100% lifecycle are **not approved and have been reopened for redesign**. **§46 controls wherever these profiles conflict**. The four names are still candidates; old numerical pairing examples are illustrations only, not locked fungal Effects.

**Status and sequencing:** The user explicitly **APPROVED the entire Ingredients §44 numerical pass**, finishing approved first-pass Plant profile and numerical work across **all six Families**. The user asks to start **Fungi**, and permits considering transformation feasibility along the way but **expressly reserves a CLEAN, DEDICATED FULL TRANSFORMATION-RECIPE PASS AFTER ALL FUNGI ARE DESIGNED**. Preserve the §21 order: fungal species/Effect bundles and habitats first, then comprehensive Plant-owned recipes, then fungal and Plant feasibility/balance corrections. Fungal first-pass proposals are **NOT user-approved yet**. Do NOT finalize a named fungus in any Plant recipe during this pass, and do NOT implement code.

### Existing approved mechanics still control fungal design

- Fungus = **one object on one hex**, sharing the normal occupancy and existing Source propagation rules. Each Fungus **grows 0–100%** (NOT a Plant's 0–200%); germination creates the living Source immediately, and it begins emitting immediately if otherwise viable. At 100%, **one consuming Fungus harvest gives Fungus Seeds and removes it**, stopping its emissions. A fungus can be left alive as a continuously occupied Source instead of harvested; the alternative has opportunity and Seed-sustainability costs. Exact growth days, Seed yields, fungus Seed-germination probabilities, habitat death/suppression exposure, and deployment costs come in a **fungus numerical pass after the first profiles**.
- One fungus can emit **multiple independent, stable Effects**, environmental and Plant-targeting. Its **direct Effect identity and sign NEVER reverse** based on recipient. A fungus may emit Brightening and independently Growth acceleration, or darkening and independently Ripening slowdown. Different Plant susceptibilities scale the signed **magnitude** of emitted cultivation effects; for example, a +20% Leaf Yield emitter received by a 2.6× compatible Plant produces +52%, not a 2.6× multiplier on the whole crop. An environmental +1 or −1 step stays **globally the same** wherever its Source contribution reaches, summed with other Sources from environmental Baseline and **clamped after summing**, not before. Existing independent Propagation Modes **Airborne/Waterborne** and propagation styles **Range / Spread Budget** continue to apply; Blockers can selectively interact according to configured tags.
- **Time-based Leaf/Seed Production** is a separately declared fungal cultivation Effect only: needs eligible progress range AND **positive lifecycle progression**, and stops at 200%. Ripening slowdown is NOT Harvest Window widening; shifting an existing peak is NOT adding a new peak. **No fungal Secondary Bloom, no universal Environmental Tolerance, no generic Transformation Effect.** Mycelial is inherently hazardous to Plants and is still a candidate future overlay, while Enchanted remains under removal review. Do not restore removed Effects to preserve a fungus name.
- All proposed spore/growth outputs must ultimately be reconciled with the additive per-Seed planting rule. All emission and habitat figures below are **proposed first-pass bundles** subject to this batch's approval and a later fungal-wide numerical balance, NOT production-ready configs.

### Candidate roster and proposed design grouping (NOT a locked count)

Retain the earlier 13 **candidate names** for initial coverage checks: **Sim'mushro'dim, Glimmergill, Veilcap, Prismorel, Emberbolete, Chillanterelle, Rainmorel, Droughtcap, Rushroom, Echomorel, Wakemorel, Hushroom, Mycelord**. User previously liked the name Sim'mushro'dim, but its originally suggested Enchanted linkage is **not** an approved reason to preserve Enchanted. Audit broad Effect coverage before deciding if 13 is the right number.

- **Batch 1 (this §45):** Glimmergill, Veilcap, Emberbolete, Chillanterelle — Illumination and Temperature Source pairs, each with a separately useful ordinary cultivation Effect.
- **Batch 2 (proposed next):** Rainmorel, Droughtcap, Prismorel, Rushroom — Moisture manipulation, pure cultivation shaping, and accelerated early-stage growth.
- **Batch 3 (proposed thereafter):** Echomorel, Wakemorel, Hushroom, Mycelord, Sim'mushro'dim — time-based production, useful timing/Seed variants, Mycelial trade-offs, and testing whether Hushroom/Sim'mushro'dim deserve distinct Effects without removed Tolerance or unnecessary Enchanted overlays.
- **After all profiles:** full fungal quantitative pass, then the **separate, explicit, comprehensive Plant-owned transformation pass** requested by the user; cross-family feasibility and later playtesting follow. It is fine to flag **possible** uses for a fungus while designing it but not claim any particular fungal Source combination is a final recipe.

### First-batch emitted Influence overview (ALL PROPOSED)

| Fungus | Environmental emitted Influence (ordinary signed Modifier) | Second, independent cultivation Effect (ordinary signed magnitude) | Provisional footprints for environmental / cultivation emissions |
| --- | --- | --- | --- |
| **Glimmergill** | **Brightening: Illumination +1 step** | **Growth Rate +20%** while recipient Plant progress **0–100%** | **Airborne Range 2 / Airborne Range 1** |
| **Veilcap** | **Darkening: Illumination −1 step** | **Ripening Rate −20%** while recipient progress **100–200%**, **never Growth slowdown** | **Airborne Range 2 / Airborne Range 1** |
| **Emberbolete** | **Warming: Temperature +1 step** | **Leaf Yield Adjustment +20%** on existing ordinary Leaf curve, any lifecycle point with available Leaves | **Airborne Range 2 / Airborne Range 1** |
| **Chillanterelle** | **Cooling: Temperature −1 step** | **Seed Yield Adjustment +20%** on existing Seed curve, at progress with available Seeds | **Airborne Range 2 / Airborne Range 1** |

**Range 2 / Range 1 is a proposed initial footprint**, not a universal fungal rule or the finalized Propagation Mode mix. Each emitted Influence has its own Mode, Kind and footprint; arriving within Range 2 of an environmental emission does **NOT** guarantee receiving the distinct Range 1 cultivation emission. Source occupancy is unchanged; the fungus cannot share its hex with the target Plant. These four initial environmental Source effects are ordinary +1/−1 **Property Modifiers** consistent with Environmental System v1.1, **not** conditional 'one step up from whatever the current resolved Condition already is'. Sum all Source Modifiers with the Baseline **once**, then clamp. No source's magnitude changes based on its recipient, and each Source's emission applies once per reachable hex.

The initial +20% magnitudes are deliberately comparable across the four cultivation Effects; different **Plant compatibilities and current habitats** produce dramatic outcomes. The final fungal numeric pass may change them if needed. Each fungus can continue emitting while alive in its **viable** habitat; a mere shift from its optimum condition need not turn off emissions by fiat. Exact hard emission-suppression and death requirements come with the fungal numerical pass after all profiles. **No Mycelial emitter is assigned to these initial four**—it will be evaluated later with Mycelord/other candidates rather than being mandatory for every useful fungus.

### Glimmergill — PROPOSED first-pass fungus profile

**Identity:** A reusable **Bright-field engineer** whose separate Growth accelerator helps plants reach productive phases sooner but costs an occupied hex and creates a possibly harmful Bright zone for shade crops.

| Part | Proposed design |
| --- | --- |
| **Fungus lifecycle** | Normal-to-fairly-fast **0–100% fungal Growth**. Its Sources begin emitting **immediately after germination**; leaving it alive continues emissions; a one-time 100%-progress harvest produces **only Glimmergill Seeds**, removes the Source. Exact growth days/Seed count/germination chance deferred. |
| **Emissions** | **+1 Illumination Brightening, Luminous/Airborne/Range 2**, and separate **+20% Growth Rate, cultivation/Airborne/Range 1** while Plant progress is 0–100%. No Ripening acceleration, Leaf/Seed Yield change or time-based production hidden within Growth Rate. |
| **Habitat** | Best **Damp, Temperate/Warm, Lit/Bright**; Dim is viable but its own fungus growth is slower; Dark and Freezing/Hot are substantially adverse and could eventually suppress emissions/kill in the later hazard pass. Ordinary brightening can affect even Plants outside Glimmergill's direct Growth Range. No Enchanted or Material requirement. |
| **Germination/harvest** | **Own fungus Seeds**, moderate-to-good germination and reasonable late fungus Seed return to keep deployment feasible. A harvested fungus no longer helps adjacent Plants; planting an earlier replacement requires a new fungal occupied hex/time. |
| **Farming purpose** | Establish **Bright Sunrice/Starberry/Glass Apple fields**, but can disadvantage **Moonrice, Thymekeeper, Ghost Rice or Shadow Onion** by changing the resolved Light; also useful for fast **Carrot/Strawberry** Growth in an otherwise appropriate hex. |
| **Transformation relevance (NOT recipe)** | A plausible **Bright Source attribution** ingredient in future Spices/Pum'king routes. The Plant-owned final recipe may care which Source reaches it and the final **net Lit** result; **neither is fixed by this fungus profile**. |

### Veilcap — PROPOSED first-pass fungus profile

**Identity:** Two **unrelated, consistent abilities** intentionally coexist, as already allowed in §16: **darkens Illumination** and **slows Ripening**. Neither is allowed to change sign for different recipient Plants. This deliberately retains Veilcap's agreed conceptual two-Effect identity.

| Part | Proposed design |
| --- | --- |
| **Fungus lifecycle** | **Ordinary 0–100% fungal Growth**, emitting immediately while viable. A single 100%-harvest produces **Veilcap Seeds only** and removes its Source; its otherwise useful prolonged slowing is unavailable while it has been harvested. Growth duration/Seed counts/chance deferred. |
| **Emissions** | **Illumination −1 step, Luminous/Airborne/Range 2**, and separately **Ripening Rate −20%, cultivation/Airborne/Range 1** only during Plant progress 100–200%. The −20% is on **progress rate**, not a new Harvest Window, Leaf Timing shift, or additional Seed production. The direct slowdown **never accelerates Ripening**. |
| **Habitat** | Best **Damp, Temperate/Cold, Dim/Dark**; Lit viable at a moderate penalty, Bright may eventually threaten the fungus but does not trivially switch off its darkening emission just because nearby light is bright. No hard Enchanted or Mycelial dependency. |
| **Germination/harvest** | Own Veilcap Seeds, ordinary germination and Seed output after 0–100% growth. No Plant Seeds from harvesting a Fungus. |
| **Farming purpose** | Shape **Dim Moonrice/Thymekeeper** and **Dark Ghost Rice/Shadow Onion** habitats, while allowing some **Flowers with time-based fungal production** to remain longer at qualifying percentages **if another fungus actually emits that time-based production**. A slower Ripening Plant takes more time to reach its normal 200%-Seed harvest, a cost for Seed-focused crops. |
| **Transformation relevance (NOT recipe)** | Potential counterweight to Glimmergill in net-**Lit** puzzles, notably the preserved Pum'king two-opposing-Source concept. Do not lock named pair, reach duration, source priority or exact Plant recipe now. |

**Anti-stall safeguard:** Ripening slowdown is measured as a **signed negative progress-rate adjustment**; compatibility magnifies its slowdown, not reverses it, and it cannot itself generate time-based Leaves. The existing rule of **no time-based production without positive progress** remains. Later fungal numeric stacking must check for very large combined slowdowns and prevent indefinite near-zero-rate farming exploits without pretending slowdown is a window-widening Effect.

### Emberbolete — PROPOSED first-pass fungus profile

**Identity:** A reliable **warming Temperature Source** with an independent **Leaf Yield boost**—strongly useful on true Heat specialists, dangerous when the Source heats temperature-sensitive Plants too much.

| Part | Proposed design |
| --- | --- |
| **Fungus lifecycle** | Ordinary-to-slightly-slow **0–100% fungal Growth**, immediate Sources while viable; one late harvest yields **Emberbolete Seeds only** and removes both environmental/cultivation emissions. Exact growth days, count and per-Seed germination later. |
| **Emissions** | **Temperature +1 step, Thermal/Airborne/Range 2**; separate **+20% Leaf Yield Adjustment, cultivation/Airborne/Range 1**, applied to **whatever existing natural Leaf curve is available**. Does not introduce any second bloom or time-based production, and does not automatically increase Seed Yield. |
| **Habitat** | Prefers **Damp/Dry, Temperate/Warm**, and continues viable in Hot; Cold has reduced fungal growth, Freezing can eventually shut it down or kill. Do not require the emitter itself be Hot in order to warm a **Temperate** area (would create a circular impossible setup). No obligatory Sand, Fertility or Enchanted prerequisite. |
| **Germination/harvest** | **Emberbolete Seeds only**, reasonable but somewhat costlier supply than the starter Glimmergill; planting consumes Seeds normally. Own-hex Temperature can also be affected under the established Source arithmetic, with exact viability evaluation order left for later systemic integration. |
| **Farming purpose** | Makes **Warm/Hot Desert** farming zones viable, improves **Ember Aloe, Cactopus and Cactaclysm** output in different ways, and may harm **Aloemancer, Jadewisp, Flowers or Ingredients** through excessive temperature even while its separate direct Leaf boost remains positive. A +20% Leaf Effect on **Hot Cactaclysm** with its previously approved **2.6× Leaf Yield compatibility** adds +52% to its **48-Leaf** natural Hot curve, producing **72.96 Leaves before rounding**. |
| **Transformation relevance (NOT recipe)** | May help establish **Hot exposure needed by Ember Aloe (36 continuous hours)** and other temperature-sensitive Desert routes. This is a **potential environmental enabler**, not the required named fungus/final recovery attempt trigger. |

### Chillanterelle — PROPOSED first-pass fungus profile

**Identity:** A cooling Source plus an independent **Seed Yield boost**, making it possible to invest in a cold zone with strong Seed returns from appropriate Plants rather than declaring Cooling intrinsically beneficial or harmful.

| Part | Proposed design |
| --- | --- |
| **Fungus lifecycle** | **Ordinary-to-slow 0–100% fungal Growth**. Begins emitting upon viable germination and can be maintained as a Source indefinitely while alive; harvesting at 100% collects **Chillanterelle Seeds only**, removing emissions. Growth/Seed counts and chance deferred. |
| **Emissions** | **Temperature −1 step, Thermal/Airborne/Range 2**, and separate **+20% Seed Yield Adjustment, cultivation/Airborne/Range 1** on the Plant's existing currently eligible **Seed curves**, not on new species or new Seed identities. It does not directly change Growth, Ripening rate or Seed Timing Shift. |
| **Habitat** | Prefers **Damp, Cold/Temperate, Dim/Lit**; Warm is workable at poorer fungus growth, Hot/Freezing hazardous to the **fungus itself** after sufficiently long exposure unless future species stats choose an exception. Its emitted Cooling may help move its own Source hex toward viability under ordinary rules, but no magical temperature immunity is assumed. |
| **Germination/harvest** | **Chillanterelle Seeds only**, somewhat slower/more expensive to multiply than a starter environmental shaper. One consuming harvest ends its cooling and Seed Yield benefits. |
| **Farming purpose** | Can establish Cold/Freezing for **Moonjade's 48h Dormancy-and-thaw path** or **Pearadox's Frozen Seed mode**, while the direct Seed Yield boost may be used by **Jadewisp** outside Freezing or **Moonrice/Thymekeeper** in suitable nonextreme temperatures. If Freezing Pearadox has approved **27 natural Pearadox Seeds** and **2.5× fungal Seed Yield susceptibility** there, +20% emitted becomes +50%, giving **40.5 Seeds before rounding**. Fungi can create a dangerous site for ordinary Flowers/Ingredients when shifting them to Freezing, despite the intrinsically positive Seed Effect. |
| **Transformation relevance (NOT recipe)** | Possible cooling environmental ingredient in the **Moonjade** acquisition/Freezing-thaw puzzle, but Moonjade's **48 continuous hours are a preapproved Plant-owned intrinsic exposure criterion**, and this profile does not define the later thaw recovery event or final fungus identity. |

### Cross-family spatial and environmental checks (first-pass)

1. **Glimmergill + Veilcap** at one affected hex contribute **+1 and −1 Illumination**, algebraically canceling in net light **before final clamping**, while each fungus may still be identifiable as an actual Source reaching the hex. With suitable *baseline*, ranges and blockers, this can yield **Lit** for Pum'king's later spatial puzzle. But **a Plant receiving the environmental Range 2 influence need NOT also be reached by the independent cultivation Range 1 influence**; don't infer one from the other. Explicit current-Source attribution and actual resolved Conditions are separate.
2. **Emberbolete + Chillanterelle** similarly can contribute opposing **+1/−1 Temperature** to maintain **Warm or Temperate** overall while the two independent direct Leaf/Seed cultivation Effects reach only some Plants. Alternatively separate their footprints so Emberbolete makes a Hot Cactopus/Cactaclysm bed while Chillanterelle sustains a Cold/Freezing Moonjade/Pearadox bed; a selective Blocker/hex-occupied spacing choice is potentially useful.
3. **Aquatic feasibility:** These **Airborne** Source emissions are not dependent on retaining Flooded connectivity, so may help during **Flooded→Damp transitions** without inventing new transport rules. A dedicated **Waterborne** candidate such as Rainmorel may be worth designing next to make Aquatic networks spatially distinctive. Airborne should not make Waterborne forever irrelevant: ranges, occupancy, outputs and environmental effects will matter.
4. **Flowers timing:** Veilcap's negative Ripening Rate lengthens elapsed time spent in ordinary progress intervals, but **does not widen intervals or provide hourly production itself**. Separate late-window producer candidates (e.g. Echomorel) may create the intended benefit/tension. Nothing inserts another bloom into Rosewraith or other Plants.
5. **Source lifecycle trade-off:** Harvesting a mature fungus for Seed inventory removes it and therefore all its Contributions. Maintaining long-lived emitting Fungi consumes hexes and delays propagation of their own Seed economy. Placing another fungus on an occupied hex is impossible. This supports sustainable puzzle trade-offs without artificially making every fungus emit one drawback.
6. **Species habitat is not yet an emission switch formula.** Proposed preferred fungal states affect fungus growth/survival. We will define hard cessation/long exposure timers with the completed fungus numerical pass, checking that Glimmergill/Veilcap and Emberbolete/Chillanterelle can actually be cultivated and jointly influence a target in real environments rather than dying or switching off whenever their own environment changes by one step.
7. **Mycelial/Enchanted:** No fungus in this batch emits Mycelial or requires Enchanted. Mycelord/Sim'mushro'dim will be reviewed later on their own merits, without an artificial new overlay obligation. Plants do not become more productive merely from Mycelial ground.

**Approval status:** Ingredients (§44) and every other Family's profiles/numerical passes are **APPROVED first-pass balance**. These four fungal Effect bundles, environment strengths, Range/Mode choices, habitat/Seed/growth roles and possible synergies in **§45 are PROPOSED FOR USER REVIEW**, not yet approved. After this batch's review, continue to **Rainmorel, Droughtcap, Prismorel, Rushroom** (or revise batch grouping), then remaining candidate Fungi, a complete fungal numerical pass, and **only then** a dedicated comprehensive Plant-owned transformation-recipe pass. **No final recipe, fungus roster count, new environmental mechanic or code was implemented.**

---

## 46. Fungi — AGREED lifecycle / Spores / Mycelial habitat / anti-auto-synergy rules, with revised first-batch direction

**Status:** The user explicitly reviewed and refined the fungal design assumptions after §45. The following **GENERAL FUNGUS RULES ARE AGREED**, even where they supersede the original §3 or proposed §45 profiles. **The revised assignment of particular Effects to Glimmergill, Veilcap, Emberbolete and Chillanterelle in section D below is only PROPOSED for review**; the first fungal batch has **NOT YET been fully approved**. Fungal exact days, Spore counts, germination, habitat-dependent buff sizes, reach/Propagation and Plant-owned transformation recipes are deferred. No game code changed.

### A. AGREED Fungus lifecycle and own-Spore reproduction

1. All fungi have individual **0–100% Growth and 100–200% Sporulation** phases, with **species-specific Growth and Sporulation durations**. Both phases use the familiar progression percentage, but fungi are NOT Plant-like non-Seed harvesters.
2. **Every fungus produces its own Spores only**, never Leaves/Produce or Plant Seeds, and does not natively output other fungus species' Spores. These distinct **Spore items** are consumed by fungal planting, using the existing general additive germination paradigm with eventual **species-specific Spore chance**. Exact Spore curves, available quantity, and timing of collection need a later fungal numerical pass. To minimize management, **a full ripe Spore harvest at 200%** is the simple first-pass proposal; no earlier harvest eligibility has been adopted.
3. **Every viable fungus emits ALL its declared active Influences starting immediately upon successful germination**, regardless of current lifecycle stage. **Reaching 200% does NOT stop emissions**, kill the fungus or cause another harvest/production stage. A mature fungus can remain an ongoing Source indefinitely **while alive and otherwise able to emit**.
4. **Spore harvesting is a single destructive harvest** that removes the fungus, freeing its object hex and ending its emitted Effects. Leaving it alive preserves useful infrastructure but withholds the Spores needed to establish more copies. **Repeated nondestructive Spore collection is NOT allowed.** No automatic Spore farming after 200% has been agreed.
5. Each living Fungus continues to occupy **exactly one object hex** and to use the existing Environmental Source propagation rules, Influence Kinds/Modes, Blockers and stacking; 200% does not grant an extra slot or alter Source physics.

### B. AGREED fungus-Effect packaging: default BOTH, with intentional cross-fungus puzzles

1. **First give every fungus at least one Environmental Influence and at least one Plant-development cultivation Effect** as the **starting design template**. A fungus may have **two or three (or more where justified later) independently defined Effects**, including multiple of a single category.
2. **Design THEN remove an Effect if it obstructs the puzzles or adds meaningless overhead**, rather than omitting one of the two default categories preemptively and later wondering whether the fungus needs it. The user expressly prefers trying the pair before removing it. This is **not a requirement that every fungus ultimately retain a forced, useless emission**.
3. **Don't package obvious mutually reinforcing, self-completing optimized strategies into a single fungus.** If two Effects would jointly solve an intended Plant optimization or Transformation requirement, **prefer placing them on DIFFERENT fungi**, so the player must combine Sources, position effects, balance harmful emissions, or deploy Blockers. The user wants **problems players can solve**, not a pre-assembled winning combination. It is acceptable for one fungus to have two individually useful Effects; the objection is to **self-contained answer packages for the most interesting challenges**, not any imaginable incidental benefit from either.
4. **Separate Effect identities keep globally consistent direction.** A fungus brightening a hex never changes to darkening for another target. A fungus's negative Ripening slowdown never becomes direct acceleration; signed magnitudes may differ under controlled conditions/compatibility. **Fungal cultivation Effects and environmental Property Modifiers remain distinct**. Effects need not be thematically cohesive and are not limited to positive changes; difficult trade-offs are useful.
5. **Blockers are intended legitimate answers** to a fungus whose independent Effects create interference. Separate emission Range, Kind, Mode, directional Spread Budget, source location and blocker eligibility can allow the player to preserve a needed Effect while interrupting an inconvenient one. In contrast, a fungus whose two Effects automatically optimize the same crop without a spatial trade-off should be **reconsidered**.
6. Plant-owned Transformation recipes are still to be designed in one **DEDICATED CLEAN PASS AFTER the entire fungal roster and numerical work**. Potential future Transformation usability may be noted, but **no final recipe or generic Transformation Effect** is being assigned here.

### C. AGREED simpler fungal habitats and Mycelial as an optional power lever

1. Fungi should generally be **far simpler to maintain than Plants**; the user's primary farming payoff is Plant Leaves. **DO NOT burden each fungus with separate detailed Temperature + Illumination + Moisture preferences** merely to create busywork. Its primary habitat distinction should be **its SOURCE HEX's Mycelial presence or absence**; Plant environment remains rich. No Material/Fertility demands added just to use those properties.
2. Fungi can be **Mycelial-independent**, **Mycelial-preferring**, or **Mycelial-dependent**. **Not every fungus needs Mycelial**; independent fungi are critical to routine infrastructure and colonization bootstrap. Dependence is reserved for selected very strong fungus configurations rather than forced on every good Fungus.
3. **Mycelial-preferring fungi should emit SLIGHTLY STRONGER relevant Influences when their own occupied hex is Mycelial**, NOT merely produce Spores faster. The benefit is a stronger fungus Source and its useful/harmful spatial repercussions, **not a new intrinsic benefit for Plants growing on Mycelial**. Mycelial remains hazardous to Plants per §20. Explicitly distinguish the emitting fungus's SOURCE HEX Mycelial check from the recipient Plant hex—**the Plant need not be colonized to enjoy an influence**.
4. **Mycelial ground is an intentional balancing/setup cost for especially good fungi**, with some fungi independent and only selected ones dependent. The user prefers **not to overconstrain Mycelial spread/retreat rules preemptively**; actual propagation, retreat and management can be revised during implementation/playtesting if it proves overwhelming. Existing proposed propagation from §7 remains a design candidate, NOT necessarily final or implemented.
5. **Numerical/discrete caution (NEW DESIGN RECOMMENDATION, NOT APPROVED):** A direct cultivation Influence of +20% can increase modestly to e.g. +23% from a **source-side 1.15× emission-magnitude bonus**, applied **before Plant recipient compatibility**, with the same emitted sign and effect for all targets. A −20% Ripening Effect would similarly become −23%: *stronger* is not universally *better* for every Plant. Ordinary environmental Source Modifiers are **discrete signed Condition steps**, so a "+1" becoming "+2" would double its discrete intensity, usually **not a slight bonus**. Therefore **initially boost selected cultivation Influence magnitude only**, while retaining each environmental +1/−1 step unchanged on Mycelial; examine species-specific alternatives such as a declared modest footprint or eligibility gain at full fungal numerical pass. **The 15% value, which Effects qualify, and any environmental footprint change are PROPOSED, not AGREED.** Do not invent fractional Temperature/Illumination Condition steps or alter environmental clamping.
6. **Mycelial-dependent fungus emission logic (PROPOSED for numeric pass):** when the source hex loses Mycelial, its Influences can stop emitting while its planted Instance remains for a grace period, rather than instantly dying. Exact stall, spore development, continuous lethal timing, reactivation after restored Mycelial, and colonization source bootstrap rules are deferred; avoid an arbitrary universal fungal death penalty.

### D. Intermediate revised first-four Effect pairing suggestions (HISTORICAL DRAFT; superseded by the new §48 proposal)

**Motivation:** The original §45 pairs create at least two clear self-contained optimization packages against approved Plants: **Emberbolete's Warming + Leaf Yield** helps establish Hot AND maximize Hot Cactaclysm/Ember Aloe Leaf output; **Chillanterelle's Cooling + Seed Yield** helps establish Freezing AND maximize Freezing Pearadox Seed output. **Glimmergill Brightening + Growth acceleration** also benefits Bright Sunrice's habitat and throughput in one slot. This contradicts the user's desired puzzle decomposition. The original names stay candidates, but their cultivation Effects should be redistributed unless a later spatial analysis finds genuine trade-offs.

| Candidate Fungus | Keep environmental Influence | NEW paired cultivation Effect to TEST | Reason player must seek complementary fungi |
| --- | --- | --- | --- |
| **Glimmergill** | **+1 Illumination (Brightening)** | **+20% Seed Yield**, rather than +20% Growth Rate | Brightens for Sunrice/Starberry/Glass Apple farming but does **not itself accelerate Growth or raise natural Leaves**; high-Leaf Bright harvests need a separate Leaf/Growth source |
| **Veilcap** | **−1 Illumination (Darkening)** | **−20% Ripening Rate (slowdown)**, **retained** | Makes Dim/Dark terrain but also delays reaching 200% Seed harvests; time-based production needs a separate Source; slowing time does not widen progress harvest windows |
| **Emberbolete** | **+1 Temperature (Warming)** | **+20% Seed Yield**, rather than +20% Leaf Yield | Enables useful Warm/Hot conditions but is **not its own Hot Leaf optimizer**; Hot Ember Aloe/Cactaclysm Leaf bonus must be paired with another fungus |
| **Chillanterelle** | **−1 Temperature (Cooling)** | **+20% Leaf Yield**, rather than +20% Seed Yield | Enables Cold/Freezing but is **not its own Freezing Pearadox Seed optimizer**; Frozen Pearadox Seed farming needs another source for Seed Yield |

**Historical note:** This §46 draft table is NOT the current proposed bundle set: §48 replaces the duplicate Glimmergill Seed Yield idea with a distinct Leaf Peak Timing Shift. None of these prior effect assignments is user-approved.

**Issue with draft D:** Glimmergill and Emberbolete both have +20% Seed Yield as the proposed Plant effect. This is **not prohibited**—different environmental emissions give different area layouts—but the final roster should test if redundancy truly offers **two viable alternative routes** or wastes Effect diversity. A stronger variant, **not yet proposed as a final profile**, is to put **Seed Timing Shift** on Glimmergill while Emberbolete keeps Seed Yield, or to move **Growth acceleration** onto one of these source fungi with a relevant trade-off. The point is to identify *real player-facing trade-offs first*; don't blindly fill a 13-member roster from these examples.

**Example intended cross-fungus puzzle:** Freezing Pearadox gets **+80% innate Seed Yield** and continues progressing at **0.75×**. **Chillanterelle Cooling** helps establish Freezing, but its direct bonus is to **Leaves, not Seeds**. A **separate Seed Yield fungus** (for example the proposed Emberbolete) is needed to push Pearadox's Seed harvest further. However, Emberbolete's Warming can counter the Cooling, forcing the player to position sources asymmetrically, supply additional Cooling, or **use selective blockers** so the Seed-boosting cultivation Influence reaches Pearadox without losing the Freezing final Condition. This is a player-solvable puzzle, not a single-fungus reward package.
Similarly, a premium Hot Cactaclysm must combine Emberbolete Warming with another Leaf Yield source (possibly Chillanterelle), whose environmental Cooling may interfere with keeping the hex Hot. **The exact recipes are still deferred.**

**Balance risk worth testing:** Requiring both a warming and cooling fungus to optimize extreme Leaves/Seeds might be *too restrictive* if no alternative Leaf/Seed booster exists. The final roster should preserve **more than one viable solution**, including other standalone growth/yield fungi and Blocker strategies, without assigning every optimizer two incompatible mandatory environmental Sources.

**Provisional §45 fungus-lifecycle and habitat conversion:**
- All four now use the agreed **0–200% fungal Growth/Sporulation with own Spores**, emitting from successful germination through maturity and afterward while left alive; **destructive Spore harvest** removes the Source.
- None of the four is currently assigned a mandatory **Mycelial hard requirement**. Their detailed Damp/Temperate/Bright etc. fungal growth/death preferences in §45 are **SUPERSEDED** by simplified Mycelial relationship design. As the next step, propose classifying Glimmergill/Veilcap as **independent** and Emberbolete/Chillanterelle as **independent or Mycelial-preferring** (not decided), keeping at least one source that can create Mycelial elsewhere in the roster. **No finalized assignments yet.**
- The **proposed Range 2 environmental / Range 1 cultivation footprints** may remain useful as a starting point, but need to be reviewed against source synergy, Mycelial power adjustment and blocker-enabled strategies. Values in §45 are not locked.

**Next workflow:** Review/revise the four §45/§46 proposed Fungus bundles against the new AGREED rules before declaring them approved; then take further fungal batches in order, the full Fungi numbers, and **afterwards** a separate full Plant-owned Transformation pass covering all six Families, competing conditions, timing and feasibility. No coding.

---

## 51. Fungi — EFFECT-COVERAGE AUDIT against approved Plants and all fungal candidates (AUDIT COMPLETE; new assignments DEFERRED)

**Prompt and status:** After reviewing §50, the user **explicitly agreed to audit the existing catalog for desired Effects not attached to any fungus**. They stressed there should be **NO EARLY FUNGUS COUNT CAP**: add even ten more fungus species if useful, review whether any can later be merged, and only then balance/prune—without packing self-contained optimal production setups into one fungus. This approves the **audit and open-roster exploration workflow**, NOT §50's four proposed fungus packages or any new Effect assignments. Earlier §47 Mycelord, §48 first four fungi, and §49 second four fungi **remain approved**; §50 (Echomorel, Wakemorel, Hushroom, Sim'mushro'dim) **remains PROPOSED FOR REVIEW**, rather than silently marked approved. All first-pass Plant Effect-compatibility dimensions in six approved Family numeric sections are valid inventory sources.

### A. Exact Plant-development Effect categories: approved vs proposed fungal emitters vs missing

| Pre-existing Plant-development Effect dimension | Named positive emitter(s) if any | Named negative / alternative emitter(s) if any | Coverage assessment |
| --- | --- | --- | --- |
| **Growth Rate** | **Rushroom +30% [APPROVED]** | **Rainmorel −15% [APPROVED]** | **Covered both rate directions** |
| **Ripening Rate** | **Wakemorel +25% [§50 PROPOSED]** | **Veilcap −20% [APPROVED]** | Named both directions, **but acceleration is not approved yet** |
| **Leaf Yield Adjustment** | **Chillanterelle +20% [APPROVED]** | No named negative direct Leaf Yield emitter | Positive **covered**; harmful negative variant **OPTIONAL**, not categorically missing |
| **Seed Yield Adjustment** | **Emberbolete +20% [APPROVED]** | No named negative direct Seed Yield emitter | Positive **covered**; harmful variant **OPTIONAL** |
| **Germination Adjustment** | **Hushroom +8 percentage points per Seed [§50 PROPOSED]** | No named negative germination source | Named **only as §50 proposal**. Event-time effect on *Seed planting* needs later feasibility; negative source optional |
| **Harvest Window Adjustment** | **Droughtcap +25% widening [APPROVED]** | No named window-narrowing emitter | Positive **covered**; narrowing optional |
| **Leaf Peak Timing Shift** | **Glimmergill +8pp LATER [APPROVED]** | **Prismorel −8pp EARLIER [APPROVED]** | **Covered both timing directions**; neither alters peak height or introduces blooms |
| **Seed Timing Shift** | **NONE** | **NONE** | **GENUINELY MISSING**: no current named fungus affects timing of existing Seed availability |
| **Time-based Leaf Production** | **Echomorel +0.15 Leaves/h while 160–190% progress [§50 PROPOSED]** | No negative hourly emission | Named as **§50 proposal**, not approved. Only positive lifecycle progression qualifies |
| **Time-based Seed Production** | **Sim'mushro'dim +0.15 Seeds/h while 160–195% progress [§50 PROPOSED]** | No negative hourly emission | Named as **§50 proposal**, not approved. Sterile species and Seed identities unchanged |
| **Leaf–Seed Allocation** | **NONE (Leaves-favoring direction)** | **NONE (Seeds-favoring direction)** | **GENUINELY MISSING**: both selectable design directions need consideration; they MUST trade one resource for the other, not create Seed identity, extra yield or extra harvest |

**Conclusion A:** The two **unassigned agreed EFFECT DIMENSIONS** are **(1) Seed Timing Shift and (2) Leaf–Seed Allocation**, the latter with two natural directions; **NOT** Growth/Rate or standard Yield, which already have appropriate Source identities. Some other full catalog dimensions have only **proposed** emitters, not *approved* emitters—**Ripening acceleration, Germination Adjustment and hourly Leaf/Seed production**—because the user has not yet explicitly approved the §50 profiles. Treat these as **review-pending**, not "covered and locked".

### B. Environmental Effects and overlay Source coverage

| Existing Property / environmental direction | Named fungus Source(s) | Status |
| --- | --- | --- |
| **Moisture +1 Wetting** | Rainmorel (directional routed) | **APPROVED** |
| **Moisture −1 Drying** | Droughtcap; Wakemorel proposed | **APPROVED + a §50 proposal** |
| **Temperature +1 Warming** | Emberbolete; Sim'mushro'dim proposed | **APPROVED + a §50 proposal** |
| **Temperature −1 Cooling** | Chillanterelle and Rushroom; Echomorel proposed | **APPROVED + a §50 proposal** |
| **Illumination +1 Brightening** | Glimmergill (Range) and Prismorel (directional routed) | **APPROVED** |
| **Illumination −1 Darkening** | Veilcap; Hushroom proposed | **APPROVED + a §50 proposal** |
| **Mycelial overlay creation / maintenance** | **Mycelord ONLY**, no Plant-development Effect | **APPROVED sole Mycelial-creating fungus** |
| **Fertility +1 Enrichment / −1 Depletion** | **NONE** among fungi | **CONDITIONAL ENVIRONMENTAL GAP**, not an agreed need for new fungi. These Environmental System v1.1 baseline Properties/illustrative Source directions still exist in the currently implemented environment, but Fertility might be removed after Plant/Fungus design if it does not earn its complexity. Do NOT add Fertility fungi or detailed Plant Fertility interactions just to preserve the Property. |

**Conclusion B:** Ordinary Temperature/Moisture/Illumination direction coverage is already broad, Mycelial has exactly its approved one-source identity, and the **only environmental source dimension without a fungal representative is Fertility**. **Fertility has never been approved as mandatory fungus roster content**, and Plant design deliberately did not force Fertility preferences. The Enchanted overlay is itself under possible removal, so its lack of an Enchanted-fungus emission is not a roster oversight. Physical Materials and special Plant resilience/Dormancy are also **not universal fungal Effect dimensions**.

### C. Important delivery / propagation gap (NOT a new Effect category)

**Every current §48–§50 ordinary fungus Influence is specified as Airborne or directed open-terrain "Airborne" propagation. No proposed or approved NAMES fungus has an actual Waterborne cultivation-emission assignment.** This is a **gameplay/toolkit gap, not a missing Effect**: Environmental System v1.1 already implements **Waterborne** Range propagation along **connected Flooded hexes**, and Rainmorel can create flooded connection using routed open-terrain Wetting. Some Aquatic family puzzles explicitly consider receiving a Waterborne fungal Influence and losing that reach when the area drains. Without at least one ordinary fungus utilizing **Waterborne** mode, this distinction may remain practically unused by named fungi and the promised Wetting + Flooded-traversal spatial puzzle will be underserved.

**Prioritize explicitly designing at least one Waterborne fungus Influence**, either on a **NEW named species** or by reviewing an existing fungus's one independent cultivation emission/footprint. Do not make **Rainmorel's own environmental Wetting** require Waterborne connectivity: it must first reach Dry/Damp land to establish Flooded. A separate (other fungus) **Waterborne Seed Timing Shift or Allocation influence** could be a promising new two-part puzzle, but **do not assign or lock a specific bundle in this audit**. One fungus can have an ordinary Airborne environmental step and an independent Waterborne cultivation Effect if it is spatially feasible; keep each emission's Kind/Mode and reach separately inspectable.

### D. Meaningful options to explore; NOT already approved additional Effects

1. **Seed Timing Shift EARLIER:** Highest-priority missing dimension. Changes when a Plant's existing Seeds begin appearing within 0–200%, without changing Ripening Rate or Seed quantity by itself. Particularly interesting for Flowers/Spices Seed specialists such as **Poppycock** (approved **13 Poppycock Seeds already available at 175%**, **22 at 200%**), **Lavendread** (makes Lavendream Seeds), **Thymekeeper** (makes Sunrice Seeds), **Rice**, and **Cresscent**. Does not create an extra harvest or new Seed species; potential to align Seed access with a Leaf harvest.
2. **Seed Timing Shift LATER:** Mechanically permitted opposite direction but needs a gameplay reason: delayed Seeds alone are punitive. Could be an unwanted side Effect paired with a meaningfully useful unrelated emission; if no good puzzle emerges, **do NOT force a fungus solely for it**. This is a potential **directional variant**, NOT another missing category.
3. **Allocation favoring Leaves at a Seed cost** and **allocation favoring Seeds at a Leaf cost:** Second highest-priority gap; both directions deserve separately proposed designs. Cannot create a Seed supply for sterile Plants, retype Seeds, generate more total material as disguised Yield, or let the same Plant harvest twice. The exact trade/exchange rate, curve stage eligibility and zero-output behavior will require a careful global balance/system pass to avoid effectively bypassing rare Seed-production pathways.
4. **Alternate production-window coverage:** §50 hourly Leaf and hourly Seed proposals are both late (160–190/195%). This **does not constitute another missing effect type**, but may leave early-bloom, pre-100% or mid-Ripening Plants underserved. A future fungus with an **EARLY or MID progress eligibility window** for an already existing Time-based Effect could diversify timing puzzles without creating a new catalogue category. It should respect positive progression, one harvest and all approved Plant Compatibility Responses.
5. **Negative Yield / narrowing / germination penalties:** These are possible **signed variants** of existing effects, not separate unassigned categories. Include only when their pairing creates a clear player-solvable challenge; random punitive fungus emissions do not automatically improve design. Hushroom germination's positive direction is §50 proposed, and negative germination is not needed merely for symmetry.
6. **Fertility Enrichment/Depletion:** Only revisit if the **later explicit environmental-scope decision** retains Fertility and proves it enhances actual cross-family farming. Until then, not a target for new fungi; no invented Fertility-sensitive Plants during this audit.
7. **Fungal-Spore germination enhancements:** The current catalogue's **Germination Adjustment is Plant-Seed oriented**, and the proposed Hushroom explicitly evaluates the *target Plant's Seed stack at an empty destination*. Applying it to Fungus Spores is a separate future scope choice; **not a missing approved category**.
8. **No automatic Enchanted/Secondary Bloom/Environmental Tolerance/Transformation Influence:** Removed or deferred by §§17–20; do NOT restore them just to fill roster slots or enable a name.

### E. Recommended design workflow after this audit (approach AGREED, assignments open)

- **Freely add candidate fungi**—two, four, ten or more—until every **wanted** gameplay dimension and delivery mode has interesting, viable tool coverage. Do **not** impose the historical roster count of 13 or an advance numerical cap.
- **First design possible new species** for **early Seed Timing, Leaf-favoring Allocation, Seed-favoring Allocation**, and at least one **Waterborne cultivation Influence**. Allow these to be different species initially; do not pre-merge just to reduce species count. Consider later additional timing directions and early/mid hourly variants if they create good puzzles.
- **Second perform a completeness/interaction audit** over the expanded set: who emits environment changes, who emits cultivation, what conflicts, whether multiple ways to solve difficult Garden configurations, and whether layout/Blockers create real choices. Then **merge or move Effects carefully** only when the result does **not** deliver a fully solved top-tier harvest/transformation optimization as one easy fungus. Two or three unrelated Effects per fungus remain acceptable.
- **Only after design review and optional consolidation,** perform the **fungus-wide numerical pass** (fungal 0–200% stage times, Spores/germination/suppression, environmental source strengths/footprints, Mycelial magnitude boosts, hourly-yield safeguards), then the **dedicated full Plant-owned Transformation recipe pass** with explicit recipes and feasibility tests. Full Plant rebalancing and actual human-tester playtesting follow implementation, not code now.
- **Fungi must still have species' own Spores and maintain emission after 200%; Mycelord remains sole Mycelial creator**; no new universal environmental tolerance, fungus-added bloom, or Transformation Effect.

**Review boundaries:** The user explicitly requested this audit and endorsed a **no-count-cap expand-then-consolidate approach**. **Audit findings (§51) are recorded as analysis and recommendations, NOT user approval of newly introduced fungi, Effect bundles or missing-effect decisions. §50 four fungus profiles remain PROPOSED until explicitly accepted.** Existing first-pass Plant numerical balances and the nine agreed fungal roles (Mycelord + eight ordinary) stay as before. No code was modified.

---

## 52. Fungi — AGREED multiple-source alternatives for shared Effects, expand before merge

**Status:** The user added and explicitly supported a new guiding fungus-roster design principle following §51: **do NOT design a world where needing Effect A means that one particular Fungus B is the sole practical way to acquire it**. Instead create **multiple fungal alternatives with the SAME existing Effect type**, sometimes **different numerical strength**, but with distinct extra Effects, environmental emissions, geometry, habitat requirements or other opportunity costs. The user expressly favors a wider first-pass roster—even ten additional fungus species if worthwhile—followed by a **later merge/consolidation and balance review** once alternatives can be judged in context. This principle is **AGREED**. The particular new fungus species, strengths, ancillary effects, ranges and prices discussed below are **illustrative, NOT user-approved assignments**.

### Principle: more than one route to a desirable direct Effect

1. For each **widely desirable cultivation Effect**, aim to develop **multiple practical source choices** rather than a **one-Effect → one-mandatory-fungus** lookup. A new fungus may emit a +10% Leaf Yield Effect while another emits +20% of the **same Effect category**, and their separate other Influences/habitat conditions determine which is appropriate in the garden. No new Effect category is needed merely to vary magnitude.
2. Different magnitude does **NOT** mean a linear "weak early species → strictly superior late species" ladder. A +10% Leaf Yield fungus that also provides **Moisture +1** may be easier and more useful in a Damp/Flooded layout than a +20% Leaf Yield fungus whose additional environmental **Warming** is disruptive or whose Source must be Mycelial. A more powerful source can also occupy a harder-to-place hex, have a narrower or directional reach, cost more Spores/rotations or have an independent interfering Effect. **All such specific numbers and constraints remain unassigned until profiles/numerical balance**.
3. Existing Source math matters: a hypothetical **+3 Temperature** Source is a legal signed discrete environmental Modifier (sum then clamp), but potentially enormous. From **Temperate** (index 2) it reaches **Hot** (index 4) after clamping, and from **Cold** (index 1) it also reaches Hot; these extremes can harm or kill many approved Plants. Treat +3 as a consciously exceptional test candidate rather than a default fungal cost. This does not create fractional Conditions or change Source arithmetic.
4. Sources of the SAME cultivation category can differ in **Plant reach (Range 1 vs Range 2), Airborne vs Waterborne, directional Spread Budget vs omnidirectional Range, signed environmental emissions, need/preference for Mycelial, cultivation strength, progress eligibility windows, or fungus maturation/Spore economy**. A player can choose on placement and interaction, not only numerical strength.
5. Fungi can also have **two or three independently defined Effects**, but do NOT put a ready-made high-yield combination on one fungus merely to reduce the roster. The first step is to **overexplore alternatives**, then merge/reassign when a merge preserves **player-created solutions rather than packaged answers**. Preserve consistent sign/type for every emitted Effect and distinguish environment Source arithmetic from Plant-specific compatibility.
6. **Not every variant must outperform another on some fixed numerical criterion**. A generally modest fungus is acceptable if it is advantageous because its environmental byproduct happens to fit a particular field, or it doesn't require Mycelial. Situational fungi such as approved Glimmergill are legitimate. Conversely don't add numerous indistinguishable variants that differ only by +10 vs +12 with no real planning differences.
7. **The principle concerns access to functional Effect classes, not automatic universal fungibility in all Plant-owned transformations.** A future recipe may deliberately mention the presence of a particular named fungus or source, but precise recipes are reserved for the later clean transformation pass. Ensure multiple ways to get general farming effects; it is unnecessary to promise every bespoke transformation is achievable with interchangeable fungi.

### Illustrative option-space examples — NOT new fungus assignments

| Existing Effect | Currently named primary fungus | Additional ALTERNATIVE to explore | Distinct choice / extra problem |
| --- | --- | --- | --- |
| **Leaf Yield increase** | **Chillanterelle +20%, Cooling −1 [APPROVED]** | Fungus X **+10% Leaf Yield and Wetting +1**; fungus Y **+30% but Mycelial-dependent** | Strongest isn't best everywhere: wet gardens vs cooled gardens vs Mycelial infrastructure |
| **Seed Yield increase** | **Emberbolete +20%, Warming +1 [APPROVED]** | A weaker alternative with **directional Aqueous Source** or a Mycelial-preferring stronger alternative | Seed farming should not always require Warming; alternative may help a colder or Flooded Seed bed |
| **Growth acceleration** | **Rushroom +30%, Cooling −1, Mycelial-dependent [APPROVED]** | A moderate **Mycelial-independent** accelerator with a different environmental emission | Quick rotation shouldn't have one mandatory high-infrastructure solution |
| **Ripening acceleration** | **Wakemorel +25%, Drying −1 [§50 PROPOSED]** | Alternative with modest direct acceleration and different habitat/Source emission | Damp-loving Pumpkin or Aquatic crops may prefer the alternative |
| **Germination increase** | **Hushroom +8pp per Seed, Darkening −1 [§50 PROPOSED]** | Another germination source whose environmental side effect is more suitable for Bright farming | A Bright Starberry field shouldn't ALWAYS require Hushroom plus separate Brightening |
| **Time-based Leaf/Seed Production** | **Echomorel / Sim'mushro'dim [§50 PROPOSED]** | Different source powers AND different EARLY/MID eligibility windows, potentially Waterborne | More than one feasible path to hourly production, not only one late-window fungus |
| **Seed Timing Shift; Leaf–Seed Allocation** | **UNASSIGNED per §51** | First give each a meaningful source, then examine source diversity (earlier vs later Seed timing, Leaf-favoring vs Seed-favoring allocation) | The missing-effect audit and alternatives audit should progress TOGETHER |

**Important status precision:** Mycelord remains **the sole Mycelial-creating species**, emitting nothing else (approved §47). This is an intentional infrastructure-source exception: the new rule of alternatives for common cultivation Effects is **NOT** authorization to add a second Mycelial-creator. The current first eight ordinary fungi (§§48–49) are approved; Echomorel, Wakemorel, Hushroom, Sim'mushro'dim remain §50 **PROPOSED** pending explicit review. The proposed §50 hourly-production and Germination categories should be counted as **draft-covered**, not already approved. The §51 missing Seed Timing/Allocation and Waterborne source reach findings still stand.

### Revised remaining design workflow

1. **Continue with broad new fungus candidate batches.** Include the §51 genuine gaps: **Seed Timing Shift**, both **Leaf–Seed Allocation** directions, and meaningful **Waterborne cultivation**; concurrently offer **alternative sources for frequently wanted Effects** such as Leaf Yield, Seed Yield, Growth/Ripening acceleration, Germination, and hourly production. Do not impose "only one or two more" or even a ten-fungus addition limit.
2. Maintain an **Effect-by-fungus choice matrix**: for each Effect record available source(s), direction and strength, source environmental consequences, propagation/footprint, Mycelial status, Seed/Spore setup economy and meaningful player-created conflicts. Label approved vs proposed candidates. Look for **genuinely distinct viable alternatives**, not token duplicates or a singleton Source that all players must use.
3. **Consolidate only AFTER broad exploration**. Remove/merge variants when they don't create new decisions, or when a multi-Effect fusion would NOT hand players a fully assembled powerful solution. If an existing fungus is a good home for a still-missing Effect, test that extra Effect without making its role dominate every context.
4. Complete fungus-wide **numeric balance** (0–200% stage times, own Spores/germination, environmental reach/strength, Source habitats/Mycelial bonuses and hazard thresholds; time-based production/near-stall safeguards), then the **dedicated separate Plant-owned transformation-recipe pass**. No code in design phase.

**Approved:** Multi-source alternatives and no numeric roster cap as a fungus-design principle. **NOT approved:** Specific new fungus profiles, example +10/+20/+30 values beyond previously accepted first-pass entries, +3 Thermal as a named Source, changes to any existing approved Plant or fungus, §50 pending profiles, or any final transformation conditions.

---

## §75 — Spices Transformation routes: user acceptance and saved light-engineering constraints (HISTORICAL; superseded in detail by §76)

**APPROVAL CONFIRMATION:** The user said **“yep i like them including the two Pum'king overlap routes and Ghost Rice's Lit-to-Glass-Apple route. please add them in the github repo.”** The agreed **Spices transformation topology has 11 directed Plant-owned routes among 10 Plants**. This section preserves the approval and every independently traceable graphical/spatial constraint, especially the two specified highlights. **Provenance limitation:** The present GitHub files only contain the old schematic proposal in §15 plus accepted Plant profiles in §§37–40; the exact complete subsequently presented 11-row recipe table (named contact alternatives, hours, and every condition) is **not present in retrievable text**. Therefore no new exact fungal assignments or durations are invented or falsely represented as approved here. Once the original table is available, transcribe its exact values into this section; do not quietly fill gaps from historical A/B/C/D or Glimmer/Veil/Prism/Gloam shorthand.

### A. Accepted 11-route topology and recoverable recipe direction

| From | To | Established illumination direction / confirmed special constraint | Parameter status |
| --- | --- | --- | --- |
| **Thymely** | **Sunrice** | **Bright** access branch | Exact named contact/continuous hours not recoverable |
| **Thymely** | **Moonrice** | **Dim** access branch | Exact named contact/continuous hours not recoverable |
| **Thymely** | **Shadow Onion** | **Dark** access branch | Exact named contact/continuous hours not recoverable |
| **Sunrice** | **Starberry** | **Bright** specialization | Exact named contact/continuous hours not recoverable |
| **Sunrice** | **Pum'king** | **Net Lit with simultaneous opposing Brightening and Darkening Source Influences**, actual overlap reaching Sunrice | Exact named contacts/continuous hours not recoverable |
| **Moonrice** | **Thymekeeper** | **Dim** Seed-supplier specialization | Exact named contact/continuous hours not recoverable |
| **Moonrice** | **Ghost Rice** | **Dark** specialization | Exact named contact/continuous hours not recoverable |
| **Shadow Onion** | **Dillusion** | **Lit** destination route from Dark-field precursor | Exact named contact/continuous hours not recoverable |
| **Starberry** | **Glass Apple** | **Bright** specialist route; final target prefers Bright | Exact named contact/continuous hours not recoverable |
| **Ghost Rice** | **Glass Apple** | **Lit-to-Glass-Apple route** explicitly endorsed by user; Glass Apple is Bright-preferring **after** Transformation | Exact named contact/transition timing not recoverable |
| **Dillusion** | **Pum'king** | **Net Lit with simultaneous opposing Brightening and Darkening Source Influences**, actual overlap reaching Dillusion | Exact named contacts/continuous hours not recoverable |

The illumination directions above are grounded in the long-standing accepted §15 first-pass graph, §§37–40 profiles and the user's explicit confirmation of the two Pum'king overlaps and Ghost Rice Lit transition. **Do not treat old working labels “Glimmer”, “Veil”, “Prism” or “Gloam” as already selected particular named Fungi**, or turn this table's unresolved cells into default timings.

### B. Pum'king — BOTH opposing-source overlap routes explicitly accepted

- **Sunrice → Pum'king** and **Dillusion → Pum'king** are **both** intended to be real, separate recipes leading to the **same** Pum'king.
- At the qualifying setup, the Plant must be **reached by an actual positive Luminous/Brightening emission AND an actual negative Luminous/Darkening emission at the same time**, while the **resolved Illumination remains Lit**. These are real Source footprints after propagation/Blockers, not just the existence of emitting Fungi elsewhere. Net Lit is a distinct test from named contact and source overlap; cancelling contributions can produce Lit in suitable baseline and additional-source arrangements. This is the accepted central spatial puzzle, not a special fungus-emitted Transformation Effect.
- The final **named fungus identities** and **exposure hours** of the precise recently accepted proposal must be recovered rather than conjectured; future recipes must comply with §68 (contact with **particular named Fungi** via any emitted Influence zone). A positive/negative Source emission condition is an **additional environmental engineering constraint**, not a substitute for the required named contact.
- The destination Pum'king remains **sterile**, new **0%-Growth**, and prefers **Lit**, with its broad premium Leaf curve intact (§39). The source combination need not be artificially maintained throughout the entire subsequent lifecycle unless it remains useful to farming conditions.

### C. Ghost Rice → Glass Apple — approved Lit route

- The user's latest approval explicitly emphasizes a **Ghost Rice Lit-to-Glass-Apple route**. Preserve **Lit as the route's qualifying lighting state/transition target**, not silently replace it with an always-Bright recipient gate. Ghost Rice prefers Dark while farming, but can survive a player-managed move to **Lit** without immediate death (§38).
- A successfully transformed **Glass Apple begins at 0%** with its own natural **Bright** farming optimum (§39). The player may subsequently change the environment from Lit toward Bright to optimize its Leaf peak or obtain its **Starberry Seeds**.
- The exact pre-Lit preparation, named fungus requirements and elapsed hours in the recent proposal are **not verifiable in this stored record**. Preserve the qualitative distinction without assigning invented numbers. This route and **Starberry → Glass Apple** create the same non-attuned species.

### D. General Transformation integrity and exclusivity

- **No growth/production Effects as recipe gates:** named-fungus contact means spatial reach through **either environmental OR cultivation Influence footprint (§68)**, even if a Growth/Timing/Yield Effect has no current stage-appropriate bonus. Recipes use the environment, contact, time and completed transitions without requiring the Plant to reach any percentage. A successful Transformation always replaces the old Plant with a fresh Plant at **0% (§58)**.
- **No Mycelial-on-Plant prerequisite**, generic Transformation Influence, new Light Charge system, periodic day/night, extra Seed identities or permanent terrain Material requirement.
- **Sibling-recipe exclusivity (§66):** the intended Thymely branches are Bright / Dim / Dark; Sunrice branches Bright (Starberry) vs net Lit with positive+negative overlaps (Pum'king); Moonrice branches Dim (Thymekeeper) vs Dark (Ghost Rice). Therefore the conceptual routes can have mutually incompatible resolved illumination states. **Final exact formal proof awaits restoration of every complete recipe**, particularly if the original proposed sequence introduces transition checks that can overlap. No arbitrary runtime winner priority.
- **First-pass Seed/farming economy remains approved:** Thymekeeper produces Sunrice Seeds; Starberry produces Sunrice Seeds; Ghost Rice produces Moonrice Seeds; Dillusion produces its own Seeds; Glass Apple produces **Starberry Seeds**; Pum'king is entirely sterile. Working Spices species names still await the later cooking-spice renaming pass.

**Documentation status:** The user has **expressly accepted the complete proposed Spices pass**, including the named highlighted mechanics, but **some exact proposed parameters cannot be authenticated from available source text**, and are deliberately left unfilled here rather than invented. This section faithfully preserves the accepted network and confirmed constraints. It does **not** represent a fully transcribed/implementation-ready 11-row recipe specification. The other five families (Ingredients §67, Aquatic §69, Woodlands §§71–72, Flowers §73, Desert §74) remain fully recorded with their initial conditions/timings. **No gameplay code has been modified.**

---

## Superseded wording relocated from approved first-pass profiles and interaction audits (27 October 2026)

**Preservation record:** The following excerpts are taken from the first staged copy of the original design sections, except where explicitly noted as a staging wrapper. They are preserved because their *phase status, named-contact guesses, old numeric propagation caps, incomplete network drawings, proposed hazards, or deferred decisions* were superseded by later approvals. Some lines also contained valid data; those valid numbers and exceptions are retained in the linked active topic file. No original GitHub documents were altered.

### 22. Woodlands — Plant-by-Plant profiles (phase 1) — woodlands.md

Earlier wording from [docs/next/plants/woodlands.md](../plants/woodlands.md) (original source section or first-pass staging preface):

- **Reason:** Archived superseded design-phase framing (first-staging line 18)

~~~~text
**Phase status:** First record each Plant's six characteristics without assigning named Fungi or final Transformation recipes. **Approved** means the user accepted the profile direction, not that exact numbers are finalized. **Proposed** is an unapproved next candidate.
~~~~

- **Reason:** Archived completed workflow instruction (first-staging line 152)

~~~~text
**Workflow reminder:** During current Phase 1, these are **Plant profiles only**. No fungus roster, named fungal assignments, transformation recipes, or final numerical thresholds are being locked. The approved Bamboo branch and the three remaining Mandrake Plants can be treated separately.
~~~~

- **Reason:** Replaced obsolete recipe status while retaining unresolved tuning distinction (first-staging line 171)

~~~~text
**Open:** Exact harvest, Seed production, and conditional window strengths; whether its own Seed yield is best kept moderate in later balance. Do not assign its two transformation recipes now.
~~~~

- **Reason:** Superseded Mycelial death replaced with approved Bright hazard (first-staging line 175)

~~~~text
**Established role:** **Highest potential normal Leaf harvest in Woodlands**, with a risky direct Transformation route and a safer Mandrakazam Seed route. **Specific weakness selected in this Plant-design pass:** Mandrakadabra is **hypersensitive to the Mycelial overlay**: it dies after **6 uninterrupted in-game hours** on an active Mycelial hex. This is a distinctively short threshold compared with ordinary Woodlands Plants. The transformation danger is now tied to this **Plant-owned environmental hazard** rather than an undefined fungally emitted lethal or Transformation Effect; the Phase 3 direct route must be designed to make this hazard meaningfully relevant, without prematurely assigning any particular fungus.
~~~~

- **Reason:** Corrected profile environment and exposure details (first-staging line 182)

~~~~text
| **Environment** | Prefers **Damp, Temperate, and Lit**. Dim/Cold/Warm impair output, Dry/Flooded less efficient. **Hot and Freezing** are harmful and can kill after exposure. **Special weakness:** occupying a **Mycelial hex for 6 uninterrupted in-game hours kills Mandrakadabra**. It receives **no gradual additional penalty** from Mycelial before this threshold; it can produce normally until death occurs. Exposure resets if its hex stops being Mycelial. The **Mandrakadabra-specific timer begins on transformation into Mandrakadabra** (previous-identity exposure time does not transfer); directly Seed-grown Mandrakadabra starts with no exposure. This rule is independent of fungus identity. |
~~~~

- **Reason:** Replaced obsolete six-hour Mycelial rule and unassigned recipe proposal (first-staging line 186)

~~~~text
**Specific vulnerability specification chosen for this first pass (pending review with the Mandrake batch):** 6 in-game hours of continuous Mycelial exposure is lethal, with **no early soft debuff**, and the timer resets on interruption; no cumulative damage bank. It begins when the Plant becomes Mandrakadabra, so a new identity is not killed instantly by its precursor's prior exposure. **Phase 3 requirement:** Make the direct Mandrabra → Mandrakadabra transformation a real Mycelial-management challenge, using ordinary source/overlay/adjacency mechanics. Do **not** pick the fungus or complete that recipe yet; ensure it is possible to obtain and save Mandrakadabra despite Mycelial's delayed retreat. This is an intentionally concrete Plant weakness now, with balancing corrections allowed in Phase 5.
~~~~

- **Reason:** Corrected family summary (first-staging line 218)

~~~~text
- **Mandrakadabra** rewards demanding cultivation with the **highest Woodlands Leaf peak**; it dies after **6 uninterrupted in-game hours of Mycelial exposure**, a Plant-specific short threshold distinct from ordinary Woodlands tolerance.
~~~~

- **Reason:** Moved superseded status into history (first-staging line 221)

~~~~text
**Phase 1 status:** The user approved the Mandrake batch, including the **specific 6-hour continuous Mycelial death threshold for Mandrakadabra**. The exact fungus assignments and transformation recipes remain deferred until the user-prescribed third pass. Numeric Growth/Ripening/yield values are proposed in §23 as a separate whole-family balancing pass.
~~~~

- **Reason:** Removed obsolete Mycelial correction (first-staging line 222)

~~~~text
**Correction to earlier shorthand:** Mandrakadabra's distinctive lethal exposure is **Mycelial**; it is not an additional unnamed hazard. The direct transformation path must be designed to involve a genuine Mycelial-management challenge, without creating an emitted Transformation Influence.
~~~~

- **Reason:** Numerical baseline subsequently approved (first-staging line 225)

~~~~text
## 23. Woodlands full-family numerical pass — proposed starting balance
~~~~

- **Reason:** Made profile current without instructing to follow obsolete content (first-staging line 15)

~~~~text
**Latest Woodlands hazard correction (§70, APPROVED):** Mandrakadabra's earlier six-hour **Mycelial-specific** lethal rule and Mycelial-gated direct Transformation concept have been **superseded**. The approved replacement is death after **4 uninterrupted in-game hours in resolved Bright Illumination**, while **Lit remains optimal for farming**. Read the historical Mandrakadabra profile below subject to §70; do not use its older six-hour Mycelial text as current authority.
~~~~

- **Reason:** Updated unassigned recipe/germination status (first-staging line 203)

~~~~text
**Open:** Seed quantities, exact germination, time economics of the two access routes, and whether Mandrakazam needs a different fallback benefit to maintain good cross-branch value. No fungus or recipe is assigned now.
~~~~

- **Reason:** Removed old Phase 3 promise and supplied approved recipe (first-staging line 50)

~~~~text
**Established role:** Bamboozeling is the **inferior-but-still-harvestable intermediate** in the confirmed **Bamboom → Bamboozeling → Bamboozled** transformation route. Sustained qualifying conditions make it important to act within a harvest window; the actual fungal identities and transformation recipes will be designed in Phase 3.
~~~~

- **Reason:** Removed Phase 1 no-recipes clause (first-staging line 34)

~~~~text
**Existing established role that must be preserved:** Bamboom is a strong producer of **Woodlands Base Plant Seeds**. The sequence **Bamboom → Bamboozeling → Bamboozled** is confirmed; it is not a reason to assign fungi or specific transformation timers during Phase 1. The earlier ambiguity with a possible name "Bamboozle" remains separate.
~~~~

- **Reason:** Separated real balancing questions from completed route assignment (first-staging line 61)

~~~~text
**Open:** Whether modestly slower Ripening is the best gameplay contrast with Bamboom; precise deterioration in yield and exposure thresholds; if any Seed identity is later changed, make it explicit. The target of the next transformation is confirmed; its recipe remains deferred.
~~~~

- **Reason:** Kept trade-off and trophy; replaced early open timing (first-staging line 78)

~~~~text
**Paired design intent:** Bamboom remains a desirable repeatable **Base Seed** crop → Bamboozeling is an inferior but usable **last-chance crop** → Bamboozled yields **no normal farming output**, only the non-economic trophy. Their transitions and exposure timing must remain a challenge for the later transformation-recipe/fungal passes, **without changing the six-part Plant profiles just to accommodate a specific fungus**.
~~~~

- **Reason:** Removed earlier numerical/recipe 'to be set' status (first-staging line 81)

~~~~text
**Approval update:** The user accepted the paired **Bamboozeling** and **Bamboozled** first-pass profiles as proposed. Preserve the distinction between inferior-but-harvestable Bamboozeling and the zero-Leaves/zero-Seeds Bamboo Steel trophy endpoint Bamboozled. Exact numbers and transformation recipes remain later work.
~~~~

- **Reason:** Replaced phase-3 future fungus placeholder with precise approved transition (first-staging line 100)

~~~~text
**Existing role:** A desirable Plant in its own right and the strategic pivot from the Tanglethorn line into **Mandrabra**. In later phase 3, **removing an otherwise beneficial fungus** is necessary for the desired Mistlefoe → Mandrabra outcome; retaining conflicting qualifying fungi instead leads to **Mistlewoe**. This is **a Plant-owned recipe condition**, not a transformation-emitting fungus Effect. Do not assign named fungi yet.
~~~~

- **Reason:** Replaced unassigned Mandrabra fungal conditions (first-staging line 160)

~~~~text
**Established network position:** The Woodlands Base **and Mistlefoe** can lead to **Mandrabra**, which can transform either **into Mandrakadabra** or **directly into Mandrakazam**. These are confirmed edges; named fungal conditions remain later work.
~~~~

### 23. Woodlands full-family numerical pass — approved first-pass balance — woodlands.md

Earlier wording from [docs/next/plants/woodlands.md](../plants/woodlands.md) (original source section or first-pass staging preface):

- **Reason:** Numerical table subsequently approved (first-staging line 242)

~~~~text
### Proposed Woodlands numerical table
~~~~

- **Reason:** Corrected obsolete unapproved status while retaining exact eligibility (first-staging line 258)

~~~~text
**Bamboozled proposal:** An ordinary one-time harvest once at least 100% progress yields **one Bamboo Steel trophy**, and never Seeds or Leaves. Because Bamboozled is obtained by Transformation, the new instance starts at **0%** and must advance before its trophy is eligible (§58). This eligibility/trophy quantity remains part of the *unapproved numerical pass*, not a new trophy economy.
~~~~

- **Reason:** Updated numeric pass warning (first-staging line 260)

~~~~text
**Mandrakadabra exception already approved:** Death after **6 uninterrupted hours on Mycelial**, timer starts upon transformation to Mandrakadabra, resets on interruption, no production penalty prior to the threshold. The relationship between a 5–8.5-day normal lifecycle and the 6-hour Mycelial exposure window should be explicitly tested for playability when designing its direct Transformation route. Do not silently revise this hazard during numeric work.
~~~~

- **Reason:** Removed stale claim that already approved data undefined (first-staging line 268)

~~~~text
- Exact continuous curves, germination percentages/Seed-cost curves, species-specific thermal/Mycelial thresholds not yet specified, and all **fungal Effects/Transformations** still require subsequent numerical/mechanics choices.
~~~~

- **Reason:** Updated numeric section header (first-staging line 227)

~~~~text
**Latest correction (§70):** Any reference below to Mandrakadabra's special six-hour Mycelial death threshold is **historical and superseded** by its approved **four-hour continuous Bright lethal exposure**. Its Lit optimum and high-Leaf role are unchanged. This section's other first-pass numerical values remain as previously approved.
~~~~

### 24. Woodlands numerical pass II — germination and Effect compatibility (APPROVED first pass) — woodlands.md

Earlier wording from [docs/next/plants/woodlands.md](../plants/woodlands.md) (original source section or first-pass staging preface):

- **Reason:** Accepted germination model (first-staging line 279)

~~~~text
### Germination mechanics proposal
~~~~

- **Reason:** Corrected approval state, retained formula and caveats (first-staging line 282)

~~~~text
- Proposed simple, memorable Seed sink: **chance for n invested Seeds = min(100%, n × one-Seed chance)**. All Seeds committed to that one planting attempt are consumed whether success or failure. This is a proposed first numerical rule, not yet an implementation decision. Extra Seeds beyond 100% are wasted; the player can choose to spread Seeds across slots or concentrate them to guarantee one Plant. Later testers may reveal whether a gentler nonlinear or variable cap is preferable.
~~~~

- **Reason:** Corrected numerical balance example (first-staging line 353)

~~~~text
- **Mandrakadabra** has a 30-Leaf high peak and **2.5× Leaf Yield compatibility in Lit**. A hypothetical +20% emitter creates +50%, potentially **45 Leaves**, but its narrow window, Seed costs, and 6-hour lethal Mycelial threshold must make high-efficiency farming an earned outcome.
~~~~

- **Reason:** Archived stale fungus-roster status (first-staging line 358)

~~~~text
- The **old 13 named fungi remain only proposals**; do not assign any effect or production bonus to a particular named fungus during this pass.
~~~~

- **Reason:** Updated scope of genuinely open questions (first-staging line 360)

~~~~text
- Full exact output curves, precise environmental hazard penalties other than Mandrakadabra's approved Mycelial six-hour death threshold, and rounding/stacking of concurrent fungal Effects are additional numerical refinements. Do not silently commit nonexistent fungal mechanics or pretend these are implemented.
~~~~

- **Reason:** Updated germination section header (first-staging line 274)

~~~~text
**Latest correction (§70):** The older Mandrakadabra **six-hour Mycelial-special death** references in this balancing section are superseded by **four uninterrupted hours in Bright**, with **Lit** still its preferred farming Illumination. Existing Yield compatibility figures are not changed by this correction.
~~~~

### §70 — Mandrakadabra transformation environment and lethal Bright vulnerability (APPROVED, 26 October 2026) — woodlands.md

Earlier wording from [docs/next/plants/woodlands.md](../plants/woodlands.md) (original source section or first-pass staging preface):

- **Reason:** Removed superseded 'recipe still to be proposed' within approved §70 (first-staging line 368)

~~~~text
**Explicit user approval; supersedes earlier conflicting text in §§22–24 and the unapproved Woodlands recipe draft.** The user rejected making **Mycelial ground a prerequisite for Transformation recipes**; future Plant-owned recipes should not require that overlay. In particular, Mandrabra → Mandrakadabra must not require Mycelial. Instead, **resolved Bright Illumination is a mandatory condition for this direct Transformation**. The complete direct recipe (which particular named Fungus/Fungi must contact Mandrabra, whether other environmental properties must match, and the X uninterrupted hours) is **still to be proposed/reviewed**. The earlier draft of 12 hours of Mycelial presence followed by Mycelial retreat is **NOT approved** and must not be implemented. Do not replace it with an invented new fungus-specific mechanic: any later named-fungus contact uses §68's actual Influence-zone reach.
~~~~

- **Reason:** Removed stale status from §70 after later approval (first-staging line 374)

~~~~text
**What changed and what did not:** This **replaces** the earlier **Mandrakadabra-specific Mycelial death after 6 hours**; the old special six-hour Mycelial condition is **not an additional simultaneous special hazard**. Ordinary Woodlands Mycelial aversion/hazard can still be defined on its usual terms without bringing back a special six-hour threshold. No Mycelial overlay is required for the Mandrabra → Mandrakadabra recipe. Mandrakazam remains the Seed-producing safer alternative, and Mandrabra still has two confirmed outgoing graph edges; they must be designed to be **mutually exclusive** under §66. No other Woodlands recipes from the earlier 13-route **unapproved proposal** become approved by this decision; only the mandatory Bright condition, four-hour Bright hazard, and retained Lit farming optimum are newly locked here. All other Plant profiles, Seed identities, and numeric balance remain unchanged. **Text-only; no Plant/Fungus gameplay implementation.**
~~~~

### 37. Spices — first Plant-profile batch, Base and three Illumination branches (APPROVED first-pass profiles) — spices.md

Earlier wording from [docs/next/plants/spices.md](../plants/spices.md) (original source section or first-pass staging preface):

- **Reason:** Replaced pending workflow and placeholder references (first-staging line 20)

~~~~text
**Agreed design sequence:** Specify all ten Spices Plant responses and Seed identities, then a complete numerical pass, then fungus roster and Plant-owned Transformation recipes. Named working fungi (**Glimmer, Veil, Gloam, Prism**) and environmental requirements shown in historical §15 are *provisional examples*, not locked assignments. Fungi can change Illumination using the ordinary global environmental Source model and emit their own separately-defined cultivation Effects; their **spatial overlap and Blockers** matter because each Plant responds differently to the **resolved Dark / Dim / Lit / Bright state**. Do not invent a periodic day/night cycle, a special Light resource, family-wide photocharge meter, Environmental Tolerance Effect, or universal Transformation Effect.
~~~~

- **Reason:** Updated approved status (first-staging line 22)

~~~~text
### Existing Spices network (preserved, no final recipes)
~~~~

- **Reason:** Removed obsolete deferral, kept crop identities (first-staging line 33)

~~~~text
The **Sunrice and Moonrice branches are complementary**, not fully isolated economies: **Thymekeeper** will produce **Sunrice Seeds** to sustain productive Bright fields. **Pum'king** retains two routes with the previously sketched challenge of **overlapping opposing light contributions while the final condition is Lit**, subject to actual environmental propagation and clamping. **Glass Apple** retains its Starberry and Ghost Rice origins. All precise recipes (including whether/how the originally illustrated fungi satisfy them) remain deferred.
~~~~

- **Reason:** Replaced staged design-workflow note (first-staging line 110)

~~~~text
The first four Spices six-part profiles are **APPROVED first-pass designs**. Full numerical lifecycle durations, Seed quantities, Seed chance, compatibility matrices, and environmental danger thresholds belong to the later Spices family-wide numeric pass, as for all earlier families. The next coherent batch should specify the four accessible intermediates **Starberry, Thymekeeper, Ghost Rice, and Dillusion**, then the two shared endpoints **Pum'king and Glass Apple** before numerical balance. No fungi were assigned and **no code changed**.
~~~~

### 38. Spices — second Plant-profile batch, Bright/Dim/Dark intermediates (APPROVED first-pass profiles) — spices.md

Earlier wording from [docs/next/plants/spices.md](../plants/spices.md) (original source section or first-pass staging preface):

- **Reason:** Archived historical work sequencing (first-staging line 208)

~~~~text
- The next batch should be the **two shared high-value endpoints Pum'king and Glass Apple**, preserving Pum'king's overlapping opposing Luminous Influence requirement at final **Lit** and Glass Apple's Bright/high Leaves with **Starberry Seeds**, via Starberry or Ghost Rice. Do **not** assign fungus identities or recipe checks until the later fungus/Transformation pass; historical labels are examples only.
~~~~

- **Reason:** Archived completed phase direction (first-staging line 208)

~~~~text
- After all ten Spices profiles are user-approved, propose the normal **whole-family numeric pass** (days to 100/200%, Leaf and Seed output at specified points, germination chances, core and advanced compatibility matrices, species-specific environment multipliers and hazards), then continue the agreed Plant-first workflow. Eventual player testing may revise the bold numbers.
~~~~

- **Reason:** Corrected historical status without discarding approval (first-staging line 208)

~~~~text
- **Approval:** This second batch is **APPROVED as first-pass design** by the user. The final Spices batch (§39) covers **Pum'king and Glass Apple**; no game code or fungus identities were assigned.
~~~~

- **Reason:** Removed stale 'actual recipes deferred' claim (first-staging line 134)

~~~~text
**No new routes:** Starberry and Ghost Rice remain the **two origins for Glass Apple**; Sunrice and Dillusion remain the **two origins for Pum'king**. Thymekeeper **is a Sunrice Seed supplier**, not an additional new transformation edge into Sunrice. The names **Glimmer, Veil, Gloam, and Prism** from §15 still represent **historical illustrative fungus roles, not finalized fungi**. Their Source strengths, ranges, modes, and actual recipes are deferred.
~~~~

- **Reason:** Replaced indefinite light engineering with approved two-phase sequence (first-staging line 179)

~~~~text
**Spatial feasibility safeguard for later recipes:** Ghost Rice's **Glass Apple** route has historically involved moving toward **Lit**. The Plant must **survive a controllable transition from Dark to Lit for sufficient time** to complete a real transformation; the severe Lit production penalty is acceptable, but an immediate death or forced reset would break its path. The exact fungus combination and exposure duration are deferred.
~~~~

### 39. Spices — final Plant-profile batch, Pum'king and Glass Apple (APPROVED first-pass profiles) — spices.md

Earlier wording from [docs/next/plants/spices.md](../plants/spices.md) (original source section or first-pass staging preface):

- **Reason:** Replaced unassigned two-source illustration with approved named recipe specifics (first-staging line 251)

~~~~text
**Provisional two-overlap feasibility, not a fungus assignment:** After the later fungus roster is designed, a **Plant-owned Pum'king transformation condition** may require concurrently receiving the two appropriate oppositely directed ordinary Source influences while the final resolved environment reads **Lit**. The **precursor** (Sunrice or Dillusion) and any additional duration/adjacency constraints will be specified later. This is a **specific spatial puzzle direction preserved from §15**, not a claim that an emitted "Pum'king Transformation Effect" exists. The resolved Lit must be physically reachable under the final environment engine. **Source presence alone is not the same as net illumination**.
~~~~

- **Reason:** Corrected stale roster/recipe assignment claims (first-staging line 302)

~~~~text
**User-review status:** All ten Spices profiles in §§37–39 are **APPROVED as first-pass species identities**, including Pum'king's Lit overlap challenge/sterility and Glass Apple's Bright peak/Starberry Seed production. §40 contains the numerical balance **PROPOSED for user review**. After numerical approval the next Family is Ingredients (**one universal transforming Base**, Base-only starter Seeds, and all other species terminal; §41 supersedes the earlier architecture). **No code changes; no fungus roster/final transformation recipes assigned.**
~~~~

### 40. Spices — complete numerical pass (APPROVED first-pass balance) — spices.md

Earlier wording from [docs/next/plants/spices.md](../plants/spices.md) (original source section or first-pass staging preface):

- **Reason:** Corrected section status (first-staging line 473)

~~~~text
### G. Transformation/network feasibility and pending game design decisions
~~~~

- **Reason:** Replaced indefinite Pum'king sources/ranges/duration with exact approved pairs (first-staging line 475)

~~~~text
1. **Pum'king** can originate from **Sunrice OR Dillusion**. The conserved first-pass Plant-owned recipe direction is **two appropriate, oppositely directed Luminous Source influences simultaneously reaching the target while the resolved hex state is Lit**. Historical names **Glimmer and Veil** are NOT assignments, and the recipe's source ranges, source types, duration, and event priority are still open. The later fungus/recipe pass must prove that **net Lit is reachable under the actual environment's clamping, blockers and propagation**; do not mistake Source presence for final resolved Illumination. The transformed Pum'king **starts at 0%** and must be able to grow into its **46-Leaf** plateau (§58).
~~~~

- **Reason:** Replaced indefinite Glass Apple engineering with exact approved two-phase recipe (first-staging line 476)

~~~~text
2. **Glass Apple** comes from **Starberry OR Ghost Rice**. Both become the same **Bright-optimized 58-Leaf Glass Apple**, with **24 Starberry Seeds** at late harvest. **Ghost Rice is happiest in Dark**, yet it must be able to survive and complete the specified future Dark→Lit/Bright engineering pathway. The newly transformed Glass Apple starts at **0%** and then develops toward its own 155% Leaf peak or later Seed harvest. **No origin-dependent attunement** (§58).
~~~~

- **Reason:** Removed superseded Ingredients/unassigned Seeds status (first-staging line 481)

~~~~text
7. **Names are temporary**. The future Spices naming pass should produce believable game cooking spices and preserve the species graph, Seed identities, traits, stage times, environment responses and transformation feasibility. The separate Ingredients family now has **one Base Plant that can transform directly into every terminal Ingredient**; only Base Seeds start unlocked. §41 supersedes the earlier no-transformations statement. Terminal species Seed identities still need user review.
~~~~

- **Reason:** Removed stale no-roster/no-recipe assertion (first-staging line 484)

~~~~text
**Approval status:** All ten Spices profiles (§§37–39) and the entire §40 numerical pass are **APPROVED as first-pass balance**. The user then revised Ingredients to one universal transforming Base (§41). Tester playtesting remains planned later. No fungal roster, final transformations, or implementation were assigned.
~~~~

- **Reason:** Removed material-is-under-review claim (first-staging line 437)

~~~~text
**Species use the usual resolved conditions:** Moisture **Dry / Damp / Flooded**, Temperature **Freezing / Cold / Temperate / Warm / Hot**, and the independent **Mycelial material overlay**. This pass does not add a mandatory Sand/Clay/Dirt/Fertility interaction, as those environmental Properties remain under review. A fungus adjusting Temperature, Moisture or Illumination affects the **same resolved environment** regardless of what Plant is there; Plants respond differently without changing emission rules.
~~~~

- **Reason:** Removed 'exact requirements deferred' claim (first-staging line 340)

~~~~text
- No source-origin memory for the two Pum'king routes or two Glass Apple routes. Exact final Transformation requirements are deferred; every Transformation creates a new 0%-progress Plant (§58), without stage-gated eligibility (§59).
~~~~

### 53. Fungi — expanded alternatives and missing-Effect batch: six NEW species (APPROVED first-pass bundles) — profiles-alternatives.md

Earlier wording from [docs/next/fungi/profiles-alternatives.md](../fungi/profiles-alternatives.md) (original source section or first-pass staging preface):

- **Reason:** Applied later-approved §56 unbounded connected-Flooded reach; original numeric cap archived (first-staging line 20)

~~~~text
| **Tidegill** | **Brightening +1 Illumination**, Luminous, **Airborne Range 1** | **Seed Timing Shift −12 lifecycle percentage points EARLIER**, **Waterborne Range 3** | **Independent** | First named **Seed Timing Shift** source and genuinely Waterborne *cultivation* Influence; requires a connected Flooded path for the Seed timing Effect while its illumination follows a different footprint |
~~~~

- **Reason:** Applied later-approved §56 unbounded connected-Flooded reach; original numeric cap archived (first-staging line 22)

~~~~text
| **Sunspore** | **Warming +1 Temperature**, Thermal, **Airborne Range 2** | **Seed-FAVORING Leaf–Seed Allocation**, **Waterborne Range 3**; **trade Leaves for additional Seeds** where valid Seed identity/output already exists | **Independent** | Covers other missing Allocation direction and second Waterborne *cultivation* choice; cannot manufacture Seeds on sterile species and wants a connected Flooded path, while Warming may upset Cold/Flooded seed farms |
~~~~

- **Reason:** Applied later-approved §56 unbounded connected-Flooded reach; original numeric cap archived (first-staging line 67)

~~~~text
| **Plant Effect** | **Seed Timing Shift −12 lifecycle percentage points EARLIER** on an EXISTING Seed-availability curve, **Waterborne Range 3**, using the recipient's preapproved Seed Timing compatibility. It does **not** accelerate Growth/Ripening, increase maximum Seed Yield, grant Seeds to a sterile Plant, or change Seed identity. Timing-shift stacking/clipping and how exactly the natural curve reinterpolates are for global numeric/system design. |
~~~~

- **Reason:** Applied later-approved §56 unbounded connected-Flooded reach; original numeric cap archived (first-staging line 90)

~~~~text
| **Plant Effect** | **Seed-favoring Leaf–Seed Allocation**, **Waterborne Range 3**. Convert a bounded portion of *currently eligible* Leaf-side production into more of the Plant's ALREADY-EXISTING Seed output, with corresponding non-Seed harvest opportunity cost. **Requires valid Seed identity and actual positive Seed production eligibility**; absolutely sterile plants gain no Seeds. Conversion strength, precise progress windows/units and final interpolation remain deliberately unquantified pending system review. |
~~~~

- **Reason:** Applied later-approved §56 unbounded connected-Flooded reach; original numeric cap archived (first-staging line 103)

~~~~text
| **Seed Timing Shift** | **NO earlier source** | **Tidegill −12pp, Waterborne Range 3** | First viable source; future alternatives with different propagation/environment should be explored |
~~~~

- **Reason:** Removed obsolete Fertility-is-retained claim (first-staging line 110)

~~~~text
**Source-side and habitat caution:** Fertility +1/-1 are still unassigned because the game's Fertility Property is **retained in environmental v1.1 but under possible future design removal**; don't add Nutrient-only fungi to justify keeping Fertility. Same for Enchanted. Mycelial remains created by exactly one species, Mycelord, and benefits the *fungus source* not a Plant standing on dangerous Mycelial.
~~~~

- **Reason:** Clarified historical audit nature (first-staging line 112)

~~~~text
### I. Unresolved audit follow-up / next design work
~~~~

- **Reason:** Archived completed approval request (first-staging line 114)

~~~~text
1. **Review these six profiles** before approval; consider especially whether **Seed Allocation should require both eligible outputs at once**, whether its trade is sufficiently meaningful in the chosen Plant examples, and whether +12% alternative Yield bonuses and +15% accessible Growth produce viable options versus more costly approved incumbents.
~~~~

- **Reason:** Archived completed candidate exploration (first-staging line 114)

~~~~text
2. **Continue alternative-source exploration** after this batch. Particular remaining one-source or proposal-only effects include **Harvest Window widening (Droughtcap)**, **Ripening slowdown (Veilcap)**, **Ripening acceleration (Wakemorel §50 proposed)**, **Germination (Hushroom §50 proposed)**, **hourly Leaf/Seed Production (Echomorel/Sim'mushro'dim §50 proposed)**, and **Seed Timing/Allocation**, which would have only one initial Source per exact direction. Do not assume every effect must have exactly two or three; seek genuine different strategies.
~~~~

- **Reason:** Archived obsolete approval uncertainty (first-staging line 114)

~~~~text
3. **Don't silently APPROVE §50 profiles.** User's agreement to the effect-alternatives principle and this new pass did not explicitly approve Echomorel, Wakemorel, Hushroom or Sim'mushro'dim. Maintain their proposed status until reviewed or revised.
~~~~

- **Reason:** Archived completed workflow instruction (first-staging line 114)

~~~~text
4. **After enough candidates**, review a complete matrix for opportunities to merge/reassign Effects without prepackaging a solved high-end optimization, then balance all fungus lifecycles, own Spores, propagation, Mycelial amplifier/suppression and absolute output in one numeric pass. Only then perform the **separate dedicated Plant-owned Transformation recipe pass** across all six families. Text-only; no code.
~~~~

- **Reason:** Corrected 31-roster and completed recipes status (first-staging line 115)

~~~~text
**Approval status (updated after subsequent user review):** All six §53 bundles Mistruffle/Crumblecap/Quickshade/Tidegill/Frostfolio/Sunspore are **APPROVED as first-pass species designs**, as are the four §50 fungi and the earlier nine. Exact Allocation exchange ratio, numeric fungus lifecycle/Spore balance, and feasibility of Waterborne Source geometries still require their dedicated passes. §51 audit and §52 many-source principle accepted as working design; no final fungus count or numeric commitments; no final transformation recipes. No code altered.
~~~~

- **Reason:** Removed obsolete 19 species interim milestone and Allocation/recipe pending (first-staging line 9)

~~~~text
**Context and status:** The user agreed to §52's principle: multiple viable sources for a desired Effect category, with distinct strengths, habitat/propagation and secondary environmental Influences; explore as many genuinely interesting fungi as needed BEFORE later mergers/pruning, with **no numerical roster cap**. They then explicitly requested the next pass. This section introduced **SIX NEW fungal species** as independent first-pass designs rather than prematurely merging their Effects. **The user subsequently explicitly APPROVED all six, as well as the previous four in §50** ("i like them, and the previous 4 too"). The first-pass names, environmental/cultivation pairings and described roles are approved; full fungus-wide numerical tuning and Allocation exchange semantics remain open. Together the six proposed here and those four draft §50 profiles would make **19 candidate fungi in total**, including Mycelord, but 19 is NOT a target, cap or promised eventual count. Exact fungus stage days, own-Spore success/count/harvest curves, effects balancing, Mycelial buff amounts and Transformation recipes are still later passes.
~~~~

- **Reason:** Corrected complete recipe status (first-staging line 11)

~~~~text
**Shared already-approved fungus biology:** Each fungus grows 0–100%, sporulates 100–200%, emits from germination and continues after 200% if maintained, yields only own **Spores** through a single destructive fungus harvest. Only Mycelord creates Mycelial ground. Ordinary fungi start with one globally consistent signed environmental emission and at least one distinct consistently signed Plant-development Effect; environmental emissions are normal **discrete Property-step Modifiers**, independently propagating and clamped after summation. The Source's actual reach/Kind/Mode and recipient Plant's compatibility matter. **No invented Environmental Tolerance, Fungus-generated second bloom, intrinsic Mycelial benefit on Plants, automatic Seed identity creation, or generic Transformation Effect.** All Plant-owned final recipes remain deferred for a dedicated full pass.
~~~~

- **Reason:** Names/effects subsequently approved (first-staging line 13)

~~~~text
### A. Proposed fungus six-pack, with existing-effect alternatives and genuinely missing dimensions
~~~~

### 54. Fungi — AGREED asymmetric Leaf–Seed value, plus six MORE alternate-Effect species (APPROVED first-pass bundles) — profiles-alternatives.md

Earlier wording from [docs/next/fungi/profiles-alternatives.md](../fungi/profiles-alternatives.md) (original source section or first-pass staging preface):

- **Reason:** Applied later-approved §56 unbounded connected-Flooded reach; original numeric cap archived (first-staging line 145)

~~~~text
| **Rilllace** | **Cooling −1 Temperature**, Thermal, **Airborne Range 2** | **Harvest Window width +12%**, **Waterborne Range 3** | **Independent** | Waterborne narrower/wider footprint alternative to approved **Droughtcap +25%, Drying −1**; good Flooded route solves reach but cooling can threaten plants |
~~~~

- **Reason:** Applied later-approved §56 unbounded connected-Flooded reach; original numeric cap archived (first-staging line 147)

~~~~text
| **Brookrill** | **Cooling −1 Temperature**, Thermal, **Airborne Range 2** | **Time-based Seed Production +0.10 Seeds/hour** at **120–170% Plant progress**, **Waterborne Range 3**, only during positive progress | **Independent** | Mid-Ripening lower-rate Waterborne alternative to approved **Sim'mushro'dim +0.15 Seeds/h at 160–195%, Warming +1 and Mycelial-preferring**; Flooded connectivity is a major positioning cost |
~~~~

- **Reason:** Applied later-approved §56 unbounded connected-Flooded reach; original numeric cap archived (first-staging line 190)

~~~~text
3. **Plant effect:** **Harvest Window +12% relative WIDTH adjustment** on eligible existing Leaf-curve productive intervals; **Waterborne Range 3**, Plant's Harvest Window compatibility applied. Width adjustment doesn't increase peak Leaf Yield or add a second peak.
~~~~

- **Reason:** Applied later-approved §56 unbounded connected-Flooded reach; original numeric cap archived (first-staging line 212)

~~~~text
3. **Plant effect:** **+0.10 Seeds/hour on Plant progress 120–170%**, **Waterborne Range 3**, multiplied by the Seed-bearing target Plant's time-based Seed Production compatibility. Eligible only during **positive lifecycle progress and continuous emitted Influence reach**. It is an existing **Time-based Seed Production**, not a new Seed Timing Shift; supplemental Seeds can arise during its declared window without claiming the natural Seed curve itself was shifted. **Zero for absolutely sterile Plants**; existing Seed species/mix unchanged. Exact partial-progress Seed-availability conventions for fungally produced output deserve the numeric pass, not a blanket assumption that every species naturally has Seeds at 120%.
~~~~

- **Reason:** Replaced 19-species and unresolved Allocation status (first-staging line 121)

~~~~text
**Status:** The user explicitly **APPROVED all four §50 fungi** (Echomorel, Wakemorel, Hushroom, Sim'mushro'dim) **AND all six §53 fungi** (Mistruffle, Crumblecap, Quickshade, Tidegill, Frostfolio, Sunspore). That raises the accepted first-pass profiles to **19 fungus species including the unique Mycelial-producing species Mycelord**, with no roster count cap and no guarantee all 19 survive later consolidation. The user also gave an **AGREED economic direction** for Leaf–Seed Allocation: **Leaves are more valuable than Seeds, so an extra Leaf must generally cost multiple Seeds**. E.g. a candidate ratio is **3 Seed units per 1 Leaf** (same trade mirrored for Seeds-favoring Allocation); **3:1 is NOT approved as a fixed rate**, and exact species-independent conversion, caps and curve eligibility are deferred to the fungal numerical/system pass. The user asked to **continue developing additional alternatives**, especially where a wanted Effect otherwise forces one mandatory fungus.
~~~~

- **Reason:** Replaced interim 25-species report (first-staging line 226)

~~~~text
**Result after user approval:** Prior approved 19 + six approved in §54 = **25 working candidate fungus species** total, including Mycelord, with **NO roster cap or implied 25-target**. Common primary Effect categories now have at least two source candidates at varying strengths and/or different delivery; still only **one Seed Timing Shift** and **one of each Allocation direction**, all §53 approved. Additional niche variants and consolidation can be explored next; **do NOT premerge now**, and do not add Fertility-only or Enchanted-only fungi unless their parent environmental systems gain a clear role. This is fungal DESIGN work only, not final numeric balancing or implementation.
~~~~

- **Reason:** Replaced explicitly open 3:1 vs 2:1 or 4:1 alternatives (first-staging line 228)

~~~~text
**User review update (26 October 2026):** §47 Mycelord, §§48–50, §53 and **all six §54 fungus bundles** are **APPROVED first pass**: **25 working species total**, not a cap or global numerical balance. The Leaf-over-Seed **economic asymmetry is AGREED**, but the 3:1 (or 2:1 / 4:1) exchange rate, stage eligibility, bounds and rounding remain **OPEN**. Additional source alternatives may be proposed; they do not become approved without user review. The dedicated Plant-owned transformation pass remains after fungal roster/system balance. No gameplay code changed.
~~~~

- **Reason:** Later resolution of open conversion rate (first-staging line 125)

~~~~text
### A. AGREED asymmetry for Leaf–Seed Allocation, numeric conversion OPEN
~~~~

- **Reason:** Species subsequently approved (first-staging line 134)

~~~~text
### B. New six-species proposal: more choices in the same existing Effect types
~~~~

### 55. Fungi — three alternative Sources for remaining singleton desirable Effects (APPROVED first-pass bundles) — profiles-alternatives.md

Earlier wording from [docs/next/fungi/profiles-alternatives.md](../fungi/profiles-alternatives.md) (original source section or first-pass staging preface):

- **Reason:** Applied later-approved §56 unbounded connected-Flooded reach; original numeric cap archived (first-staging line 246)

~~~~text
| **Gloamclock** | **Darkening −1 Illumination**, Luminous, Airborne Range 2 | **Seed Timing Shift −8 progress points EARLIER**, Airborne Range 1 | **Mycelial-independent** | **Tidegill** gives stronger −12 EARLIER via Waterborne Range 3 while Brightening; Gloamclock reaches non-Flooded fields but only locally and may darken a light-dependent crop |
~~~~

- **Reason:** Applied later-approved §56 unbounded connected-Flooded reach; original numeric cap archived (first-staging line 248)

~~~~text
| **Goldgill** | **Brightening +1 Illumination**, Luminous, Airborne Range 2 | **Seed-favoring Leaf–Seed Allocation**, Airborne Range 1 | **Mycelial-independent** | **Sunspore** uses Warming and Waterborne Range 3; Goldgill works without a Flooded route but reaches fewer hexes and may over-brighten shade-preferring Plants |
~~~~

- **Reason:** Applied later-approved §56 unbounded connected-Flooded reach; original numeric cap archived (first-staging line 258)

~~~~text
5. **Puzzle:** A modest local alternative for Seed-bearing Plants **without a Flooded connection**. A Dim/Dark-preferring Seed crop may welcome Darkening, but a Bright crop may need another Source or selective Luminous blocking to preserve its harvest value. Tidegill's stronger Waterborne Range 3 remains advantageous along actual Flooded corridors; its separate Airborne Brightening is not interchangeable with Gloamclock's darkness. For approved **Rice 1.6× Seed Timing compatibility**, the nominal −8 would be −12.8 points before any eventual curve bounds; this is a response example, **not** a promise that Seeds exist at a particular progress point.
~~~~

- **Reason:** Applied later-approved §56 unbounded connected-Flooded reach; original numeric cap archived (first-staging line 279)

~~~~text
4. **Habitat:** **Mycelial-independent**, operating without Flooded or Mycelial under the Source. Its cultivation Influence is locally Airborne, whereas Sunspore's is Waterborne Range 3.
~~~~

- **Reason:** Applied later-approved §56 unbounded connected-Flooded reach; original numeric cap archived (first-staging line 283)

~~~~text
**Feasibility question for later audit:** Compare Goldgill's small local Airborne footprint against a Sunspore Waterborne Range 3 canal, especially where blocking Brightening would also obstruct desirable garden light. Verify any allocation benefits preserve Seed identity/mixes and do not run when the Plant has no eligible Seed-producing possibility.
~~~~

- **Reason:** Applied later-approved §56 unbounded connected-Flooded reach; original numeric cap archived (first-staging line 289)

~~~~text
| **Seed availability earlier** | Tidegill −12, Waterborne R3, Brightening | **Gloamclock −8, Airborne R1, Darkening** | Higher routed reach/power vs local non-Flooded usability; opposing Light emissions |
~~~~

- **Reason:** Applied later-approved §56 unbounded connected-Flooded reach; original numeric cap archived (first-staging line 291)

~~~~text
| **Seeds for Leaf sacrifice** | Sunspore, Waterborne R3, Warming | **Goldgill, Airborne R1, Brightening** | Flooded-network reach vs local use without a water route |
~~~~

- **Reason:** Applied later-approved §56 unbounded connected-Flooded reach; original numeric cap archived (first-staging line 293)

~~~~text
**APPROVAL UPDATE:** Gloamclock, Bristlecap and Goldgill are **APPROVED first-pass profiles**. Together with the 25 through §54, there are **28 approved working candidates**, not a cap. Source strength and full fungus balancing remain provisional; no extra Mycelial creator or new Effect category has been added. **§56's Leaf–Seed Allocation rules and unlimited Waterborne connectivity were subsequently APPROVED**. Earlier Waterborne Range 3 references in §§53–55 are superseded by the unlimited connected-Flooded rule. The Plant-owned transformation-recipe pass remains separate.
~~~~

- **Reason:** Updated 28-candidate interim count and recipe status (first-staging line 289)

~~~~text
**APPROVAL UPDATE:** Gloamclock, Bristlecap and Goldgill are **APPROVED first-pass profiles**. Together with the 25 through §54, there are **28 approved working candidates**, not a cap. Source strength and full fungus balancing remain provisional; no extra Mycelial creator or new Effect category has been added. **§56's Leaf–Seed Allocation rules and unlimited Waterborne connectivity were subsequently APPROVED**. Earlier Waterborne unlimited connected-Flooded reach (§56) references in §§53–55 are superseded by the unlimited connected-Flooded rule. The Plant-owned transformation-recipe pass remains separate.
~~~~

- **Reason:** Replaced 25-species and subsequent proposed roster (first-staging line 234)

~~~~text
**Status (26 October 2026):** The user approved all six §54 fungi, bringing the first-pass approved roster to **25 species including Mycelord**, and reaffirmed the **AGREED §52 principle**: most desirable direct cultivation Effects should be available from multiple meaningfully different fungal Sources so that obtaining Effect A does not mandate Fungus B. **Mycelord remains the sole Mycelial-creating fungus species**. **APPROVAL UPDATE (26 October 2026):** The user reviewed and **APPROVED Gloamclock, Bristlecap and Goldgill as first-pass species, Effect pairings and design roles**. The working approved roster is now **28 candidates including Mycelord**, not a cap. No full fungal numerical pass or code changes are authorized by these proposals.
~~~~

### 47. Fungi — one dedicated Mycelial-only fungus (APPROVED first-pass role) — profiles-foundation.md

Earlier wording from [docs/next/fungi/profiles-foundation.md](../fungi/profiles-foundation.md) (original source section or first-pass staging preface):

- **Reason:** Removed superseded Mycelord as possible required overlay (first-staging line 43)

~~~~text
- This proposal must be weighed against the **dedicated later Transformation pass**: Mycelord may eventually satisfy a Plant-owned "receiving Mycelial overlay/adjacency" requirement, but **no recipe is fixed now**.
~~~~

- **Reason:** Removed obsolete early-roster status (first-staging line 45)

~~~~text
**Review status:** The user has **APPROVED Mycelord as the sole Mycelial-creating fungus species, emitting no other cultivation or environmental Effects**, and accepted its non-Mycelial-dependent bootstrap role as first-pass design. Overarching fungal lifecycle/Spores, anti-self-synergy, and simpler Mycelial habitat rules are agreed (§46). **The four ordinary environmental shapers in §§45–46 remain proposed and due for reconsideration next.** Mycelial propagation details, fungal numerical pass, and the later dedicated Transformation pass remain unassigned. No code changed.
~~~~

### 48. Fungi — revised first four ordinary Effect pairings (APPROVED first-pass bundles) — profiles-foundation.md

Earlier wording from [docs/next/fungi/profiles-foundation.md](../fungi/profiles-foundation.md) (original source section or first-pass staging preface):

- **Reason:** Updated old statement that fungi are not mapped (first-staging line 90)

~~~~text
| **Lit Pum'king spatial engineering (recipe deferred)** | Brightening and darkening emissions are ordinary separately attributable Source contributions; their algebraic sum may be zero on a target while final Illumination is Lit | The **two-presence-plus-Lit condition remains only a historical Plant-owned puzzle direction**, not a recipe mapping to Glimmergill/Veilcap; verify real source footprints later |
~~~~

- **Reason:** Removed stale planned fungal phases (first-staging line 101)

~~~~text
**Next step underway:** Continue with Rainmorel, Droughtcap, Prismorel and Rushroom (§49), then the remaining candidates, the fungal numerical pass, and finally the explicit **separate full Plant-owned transformation-recipe pass** across every Family. We may note feasibility along the way, but **no recipe, duration, priority or transformation-specific activation Effect is assigned here**. No game code changed.
~~~~

- **Reason:** Removed early work sequencing (first-staging line 51)

~~~~text
**Status:** The user has **APPROVED the Mycelord-only Mycelial-creator concept in §47** and asked to work through the **first four regular fungal Effect pairings** previously drafted in §§45–46. The user **APPROVED all four revised Effect pairings** (Glimmergill, Veilcap, Emberbolete, Chillanterelle) and accepted that Glimmergill's situational Leaf Peak Timing Shift remains worthwhile even if only used in select combos. The listed initial +8 percentage-point and ±20% cultivation magnitudes are **accepted as first-pass design proposals**, subject to fungus-wide numerical balancing; exact Spore economy, hazard thresholds, and optional Mycelial amplification remain unassigned. The original §45 pairs and the intermediate duplicate-Seed-Yield table in §46 are superseded **as competing drafts**, without changing the approved general fungus lifecycle/Spores and habitat framework. This remains FUNGUS DESIGN ONLY: **all exact Plant-owned transformation recipes stay reserved for their own dedicated later pass**.
~~~~

### 49. Fungi — second ordinary fungus batch: Rainmorel, Droughtcap, Prismorel, Rushroom (APPROVED first-pass bundles) — profiles-foundation.md

Earlier wording from [docs/next/fungi/profiles-foundation.md](../fungi/profiles-foundation.md) (original source section or first-pass staging preface):

- **Reason:** Updated already completed roster (first-staging line 188)

~~~~text
7. **Fungal names and roster size still tentative** except Mycelord's agreed first-pass role. This four-fungus batch is proposed for separate user review, then **Echomorel, Wakemorel, Hushroom, Sim'mushro'dim** remain from the original 13-name pool (alongside already approved Mycelord and four earlier ordinary fungi). Not every name must survive, and additional fungi may be added to cover meaningful missing Effects rather than filler.
~~~~

- **Reason:** Corrected recipe pass status (first-staging line 189)

~~~~text
8. **Dedicated later transformation pass remains reserved after fungal design, fungal numbers and feasibility checks**. Mentioning potential relevant Conditions or Sources now does not assign any specific outgoing edge or duration. Text-only; no game code.
~~~~

- **Reason:** Corrected obsolete scope after §49 (first-staging line 191)

~~~~text
**Approval status:** All six Plant families' first-pass profiles/numerics, §46's general fungal rules, §47 Mycelord's sole-creator role, and §48's four bundles **are APPROVED**. **§49 Rainmorel/Droughtcap/Prismorel/Rushroom environmental emissions, cultivation Effects, Mycelial classes, first-pass nominal magnitudes and proposed propagation footprints are APPROVED as first-pass bundles**, subject to fungal-wide numerical balancing and system feasibility checks. §50 introduces the next four candidates. Full fungal numerical pass and complete Plant-owned transformation recipes remain deferred. No implementation.
~~~~

- **Reason:** §49 approved (first-staging line 109)

~~~~text
### A. Proposed four emitted-Effect bundles
~~~~

### 68. Transformation ingredients: environment plus named fungal contact — APPROVED, with Ingredients exception — transformations.md

Earlier wording from [docs/next/systems/transformations.md](../systems/transformations.md) (original source section or first-pass staging preface):

- **Reason:** Removed §68-§70 Mycelial recipe conflict (first-staging line 84)

~~~~text
- **Environment:** Currently resolved **Moisture, Temperature and Illumination** Conditions, applicable **Mycelial overlay** state, their ordinary transitions (such as Flooded→Damp), and the **X uninterrupted hours** of those environmental prerequisites. The previous pre-transition exposure snapshot and full new-Plant 0% reset remain valid (§§58–59, 64).
~~~~

- **Reason:** Replaced recipe future tense with completed references (first-staging line 95)

~~~~text
- Recipes for **Woodlands, Aquatic, Flowers, Desert and Spices** should use the allowed environmental and **named fungal contact** ingredients, without checking fungal Growth/Yield/Ripening or other developmental bonuses as transformation prerequisites. Exact named fungi, alternative-name sets, durations, transitions and pairwise exclusivity are still to be designed in those families' dedicated passes.
~~~~

- **Reason:** Removed self-contradictory Mycelord potential recipe (first-staging line 96)

~~~~text
- **Later supersession (§70): Mycelial ground is NOT a Transformation prerequisite.** Do not use Mycelial overlay presence as a necessary condition in future Plant Transformation recipes. **Mycelord edge case:** Mycelord creates a timed Mycelial overlay but no ordinary environmental/cultivation Influence zones. Recipes can check whether a Plant's hex is currently **Mycelial** as an environmental overlay condition. If a later proposed recipe specifically requires **named Mycelord contact**, return to the user to determine whether overlay connection alone should qualify; do **not** invent an ordinary Mycelord Influence or silently turn all Mycelial into named contact.
~~~~

### 56. First-pass Leaf–Seed Allocation mechanics and unlimited Waterborne reach (APPROVED) — seeds-spores-and-harvesting.md

Earlier wording from [docs/next/systems/seeds-spores-and-harvesting.md](../systems/seeds-spores-and-harvesting.md) (original source section or first-pass staging preface):

- **Reason:** Corrected interim 28-fungi milestone (first-staging line 9)

~~~~text
**Status (26 October 2026): APPROVED.** The user expressly accepted the **3:1 Leaf–Seed conversion and all accompanying harvest-time, compatibility, stacking, rounding and source-strength rules below**, and approved **unlimited Waterborne propagation**. The roster is **28 approved first-pass Fungus species**, with no count cap. The user favors deliberately strong initial values and playtest-driven numerical balance. **Implementation priority clarified afterward:** finish defining the approximate Plant/Fungus roster, perform a whole-roster Effect-coverage and logic review, **then** implement Plant/Fungus gameplay; meanwhile, the **Waterborne environmental change is authorized now** and is implemented in Prototype 1. Do not treat numerical balancing as a prerequisite for the coverage/logic review, and do not begin Plant/Fungus implementation yet.
~~~~

### 25. Aquatic Plant profiles — first batch (APPROVED first-pass profiles) — aquatic.md

Earlier wording from [docs/next/plants/aquatic.md](../plants/aquatic.md) (original source section or first-pass staging preface):

- **Reason:** Archived old Plant-first work order; retained numeric benchmark (first-staging line 15)

~~~~text
**Context:** The user has now **approved Woodlands germination and Effect-compatibility numbers** as first-pass balance and directed work to move to **Aquatic**. The numerical philosophy carries over: approximately **10 Leaves / 10 Seeds**, **4 in-game days to 100% / 8 total days to 200%** as ordinary benchmarks, but strong, meaningful species differences are encouraged. Detailed numeric Aquatic balance can be assigned after identifying family roles, as for Woodlands; do not design fungi or transformation recipes in this pass.
~~~~

- **Reason:** Corrected recipe status (first-staging line 19)

~~~~text
### Confirmed network view (no recipes assigned in this profile batch)
~~~~

- **Reason:** Removed old no-named-fungi claim (first-staging line 45)

~~~~text
**Keep it simple:** Kelpfull is the first **Flooded-oriented accessible Seed producer**, rather than another elaborate puzzle. It branches toward **Kelpergeist** and the unwanted **Kelpless** outcome; no named fungi chosen.
~~~~

### 26. Aquatic Plant profiles — Lotus branch (APPROVED first-pass profiles) — aquatic.md

Earlier wording from [docs/next/plants/aquatic.md](../plants/aquatic.md) (original source section or first-pass staging preface):

- **Reason:** Corrected old absence of recipes and numbers (first-staging line 157)

~~~~text
- **No fungi, exact Transformation recipes, additional resource types, or new effect categories are being committed.** Numerical duration/yield/germination/compatibility values beyond specific proposed innate attunement bonus will be specified with the rest of Aquatic after the Plant profiles are accepted.
~~~~

### 28. Aquatic numerical pass — APPROVED first-pass lifecycle, harvest, germination, Effect compatibility and hazard responses — aquatic.md

Earlier wording from [docs/next/plants/aquatic.md](../plants/aquatic.md) (original source section or first-pass staging preface):

- **Reason:** Moved unspecified duration claim, kept independent hazard (first-staging line 340)

~~~~text
- Kelpergeist also has an **established Transform-to-Kelpless route from sustained loss of Flooded**. **Do not assign that Transformation duration in this numeric table**: the exact Plant-owned route, priority, presence of other required conditions, and continuity rule are Phase 3 work. The Dry hazard timer and a transformation timer are independent conditions; future recipe tuning must ensure the rescue/wrong-turn opportunity actually functions.
~~~~

- **Reason:** Removed concluded design sequence (first-staging line 350)

~~~~text
- As for Woodlands, **do not design or implement fungi or Transformation recipes here**. First finish Plant profiles/numbers across all families, then a fungus roster, then decide fungus-supported Plant-owned transformations, adjust fungi and Plants, and conduct an actual player **playtest and balancing pass** afterward. No code changes were requested or made.
~~~~

### 29. Flowers — first Plant-profile batch (APPROVED first-pass profiles) — flowers.md

Earlier wording from [docs/next/plants/flowers.md](../plants/flowers.md) (original source section or first-pass staging preface):

- **Reason:** Replaced old phase-status statement (first-staging line 18)

~~~~text
**Status:** With all 11 Aquatic Plant profiles and their full §28 numeric pass approved, the user requested **Flowers**. Following the Plant-first workflow, this batch proposes **Daisydaze (Base), Charmomile, Daisyspell, and Marigloom** as coherent six-part Plant specifications. This entire batch was **approved by the user**; the final family-wide timing/harvest/germination/compatibility matrices follow after all ten Flowers Plants have profiles. No fungal roster or named Transformation recipes are being assigned.
~~~~

- **Reason:** Removed obsolete partial tree with [later batch] placeholders; exact final edges already in §73 (first-staging line 28)

~~~~text
~~~text
Daisydaze (Base)
 ├─→ Charmomile ─┬─→ Daisyspell ──→ Orchidemon
 │              └─→ Marigloom ───→ Rosewraith
 ├─→ Lavendream ────────────────→ [later batch]
 └─→ Poppycock ─────────────────→ [later batch]
~~~

~~~~

### 32. Flowers — full-family numerical pass (APPROVED first-pass balance) — flowers.md

Earlier wording from [docs/next/plants/flowers.md](../plants/flowers.md) (original source section or first-pass staging preface):

- **Reason:** Removed claim roster and recipes yet to be determined (first-staging line 398)

~~~~text
**No premature system additions:** These are **responses to existing Environment Conditions**. No Fertility/Material/Enchanted dependency is invented. No Mycelial species benefit is possible. The named fungi roster and final transformation conditions will be determined only after the Plant-first passes, with their ordinary Effects fixed and no Transformation Effect.
~~~~

### 34. Desert — second Plant-profile batch, Freezing and redemption lines (APPROVED first-pass profiles) — desert.md

Earlier wording from [docs/next/plants/desert.md](../plants/desert.md) (original source section or first-pass staging preface):

- **Reason:** Removed early phase restrictions, retained intrinsic traits (first-staging line 119)

~~~~text
**Status:** The user **approved** all §33 Heat/recovery profiles (including Ember Aloe's 36-hour Hot endurance requirement, the mistaken Ashen Rose recovery outcome, and Ember Aloe/Aloemancer Seed identities). The user **APPROVED all four six-part profiles for Moonjade, Jadewisp, Pearadox, and Sandrose**, including the proposed 48-hour Moonjade Freezing threshold, Pearadox dual-temperature bonuses, and Sandrose's indefinite Dry tolerance. Preserve all agreed Desert routes and the global Plant-first workflow. Define **intrinsic Plant traits and exposure logic** concretely now, but **do not assign named fungi, Effect packages, or complete Transformation recipes**. Leaf/Seed quantities, baseline stage durations and full germination/compatibility tables come with the whole-family numerical pass. No game code changes.
~~~~

- **Reason:** Removed unassigned recipe/priority question (first-staging line 202)

~~~~text
4. **Moonjade → Pearadox** remains the already agreed **alternative** Moonjade recovery route, using additional qualifying conditions and a separate recipe that will be decided in Phase 3. The Jadewisp route must not automatically preempt the player when those alternate conditions are satisfied; later recipe work must resolve their priority/selection explicitly.
~~~~

- **Reason:** Removed old 3rd batch next-step instruction (first-staging line 216)

~~~~text
**Status:** The user **APPROVED the four profiles**, including the **Moonjade 48-hour uninterrupted Freezing qualification**, **Pearadox Hot +70% Leaf / Freezing +80% Seed bonus at 75% rate**, and **Sandrose indefinite Dry tolerance**. The final Desert group (§35) covers **Cactopus, Cactaclysm, and Mirage Rose**, followed by the Desert family-wide numerical pass. No fungi assigned, complete recipes set, or game code changed.
~~~~

### 35. Desert — third and final Plant-profile batch, Cactopus / Cactaclysm / Mirage Rose (APPROVED first-pass profiles) — desert.md

Earlier wording from [docs/next/plants/desert.md](../plants/desert.md) (original source section or first-pass staging preface):

- **Reason:** Replaced completed workflow and unassigned fungi claims (first-staging line 225)

~~~~text
**Status:** The user **approved §34's Moonjade, Jadewisp, Pearadox, and Sandrose profiles**, including the precise Moonjade exposure, Pearadox temperature-mode and Sandrose drought traits. This final Desert batch of six-part species profiles for **Cactopus, Cactaclysm, and Mirage Rose** was **approved by the user**, including Cactaclysm's broad Hot harvest and complete sterility, and Mirage Rose's 1:1 Ember Aloe/Moonjade Seed mixture. The existing §14 network and approved §33–34 Plant identities remain intact. **Do not pick specific fungi, define final Transformation recipes, implement code, or turn Transformations into a fungus Effect**. Following the accepted family workflow, full lifecycle/yield/Seed-germination/Effect-compatibility numeric matrices come after all eleven Desert profiles are accepted. Bold first-pass differences are preferable to conservative prebalancing; a later tester playtest pass will tune them.
~~~~

- **Reason:** Replaced unassigned contacts with approved specifics (first-staging line 288)

~~~~text
**Feasibility safeguard (§58):** Aloemancer → Mirage Rose and Jadewisp → Mirage Rose both start a **new 0%-progress Mirage Rose**. Each route must leave the new Plant in a sustainable habitat long enough to complete its own Growth and Ripening for the mixed-Seed harvest. Any specific qualifying fungi and trigger order are deferred to the later Transformation-recipe pass.
~~~~

### 36. Desert — full-family numerical pass (APPROVED first-pass balance) — desert.md

Earlier wording from [docs/next/plants/desert.md](../plants/desert.md) (original source section or first-pass staging preface):

- **Reason:** Removed stale no-fungi/no-recipes caveat (first-staging line 312)

~~~~text
**Status:** The user approved **all eleven Desert six-part profiles (§33–35)** and requested a complete first-pass numerical table. The user **APPROVED all §36 numerical values as first-pass Desert balance**, including every lifecycle/harvest row, Seed species and germination probabilities, complete Effect compatibility, Temperature/Moisture/Illumination responses, and hazard exposure times. The previously approved intrinsic Plant bonuses and exposure qualifications remain unchanged. All numbers are subject to later tester playtesting. Consistent game-wide comparison: roughly **10 Leaves around 100%, 10 Seeds at 200%, 4 in-game days to 100%, 8 in-game days total to 200%** for the standard Plant, in good habitat without fungi. Prefer **dramatic specialization and real trade-offs** now, with a mandatory subsequent tester playtest/balance pass after implementation. **This is text-only design, NOT implementation; no fungi, final transformation recipes, or code changes.**
~~~~

### 41. Ingredients — AGREED new one-Base star-transformation architecture — ingredients.md

Earlier wording from [docs/next/plants/ingredients.md](../plants/ingredients.md) (original source section or first-pass staging preface):

- **Reason:** Updated old future recipe proposal to approved exception (first-staging line 31)

~~~~text
5. **Only Base-owned direct transformation recipes** are to be designed in a future recipe pass, after Plant profiles and fungal roster; no fungus emits a generic Transformation Effect. These recipes may differ in required standard fungus presence, ordinary Influence receipt, resolved Conditions or time, but the user did not lock exact conditions.
~~~~

### 42. Ingredients — approved Base, seven-species roster, and first four profiles (APPROVED first-pass profiles) — ingredients.md

Earlier wording from [docs/next/plants/ingredients.md](../plants/ingredients.md) (original source section or first-pass staging preface):

- **Reason:** Removed obsolete Apple/Pumpkin/Strawberry pending review (first-staging line 109)

~~~~text
**Approval status:** The **Potato Base and seven-species roster are APPROVED**, along with the **Potato, Rice, Carrot and Onion** six-part profiles and their stated approximate natural peak timings/preferences. Apple, Pumpkin and Strawberry have **new proposed profiles in §43**, pending review. Then proceed to the full Ingredients numerical pass. No fungi, final recipes or game code changed.
~~~~

- **Reason:** Corrected first-four-only approval status (first-staging line 40)

~~~~text
**Status:** The user **APPROVED the seven-species Ingredients roster**, **Potato as the sole transforming Base**, and the complete first four six-part profiles for **Potato, Rice, Carrot and Onion**, without requested changes. The six terminal species are **Rice, Carrot, Onion, Apple, Pumpkin, and Strawberry**. All six remain directly accessible by **Potato-only outgoing transformations**. The remaining three profiles are proposed for review in §43; a whole-family numerical pass follows their approval. No fungus assignments, recipes or game code.
~~~~

### 43. Ingredients — final three six-part Plant profiles: Apple, Pumpkin, Strawberry (APPROVED first-pass profiles) — ingredients.md

Earlier wording from [docs/next/plants/ingredients.md](../plants/ingredients.md) (original source section or first-pass staging preface):

- **Reason:** Corrected obsolete proposed-numeric status (first-staging line 188)

~~~~text
**Approval status:** The user **APPROVED all seven Ingredients first-pass profiles and the Potato-only star transformation network**, including Apple, Pumpkin and Strawberry's approximate natural peaks, environments and compatibility roles. **§44 is the complete Ingredients numerical pass PROPOSED for review**. Tester playtesting remains planned after eventual implementation. No fungi, final recipes, or game code changed.
~~~~

- **Reason:** Removed numeric pass still deferred (first-staging line 144)

~~~~text
**Concrete first-pass curve:** a single peak centered near **150%**, productive **135–175%**; exact quantity and phase durations are deferred to the complete Ingredients numerical pass. The **Apple Seed species identity is Apple**, not Potato or another Ingredient.
~~~~

### 44. Ingredients — complete numerical pass (APPROVED first-pass balance) — ingredients.md

Earlier wording from [docs/next/plants/ingredients.md](../plants/ingredients.md) (original source section or first-pass staging preface):

- **Reason:** Corrected obsolete fungal/recipe status (first-staging line 354)

~~~~text
**Approval status:** All seven Ingredients six-part Plant profiles (§§42–43) and the star-shaped Potato-only transformation architecture (§41) are **APPROVED**. The full lifecycle, Leaves/Seeds, per-Seed germination, core/advanced fungal Effect compatibilities, Moisture/Illumination/Temperature multipliers, and continuous lethal clocks in **§44 are APPROVED FIRST-PASS BALANCE**. Plant-first profiles and numerical balancing for all six Plant Families are now complete; §45 starts fungal design. No fungi or final recipes are approved yet.
~~~~

- **Reason:** Removed contradiction claiming no fungal assignments/recipes (first-staging line 194)

~~~~text
**Status:** The user **APPROVED every Ingredients six-part profile (§§42–43)**—Potato, Rice, Carrot, Onion, Apple, Pumpkin, Strawberry—and requested the **full numerical pass**. This complete first-pass balance of all seven species was **APPROVED by the user**, including stage durations, non-Seed/Seed outputs, Seed chances, core/advanced Effect compatibility, environmental multipliers and hazard timers. The **one-Potato-Base star-shaped Transformation graph is already APPROVED**: Potato alone transforms directly into all six terminals, no other Ingredient ever transforms. Every Ingredient produces **its OWN Seeds**, initially **only Potato Seeds are available**, and a direct Seed-grown terminal crop still cannot transform. Keep the original standard Growth/Ripening, one consuming harvest, per-Seed additive germination and ordinary environmental/fungal Effects; **§58 supersedes the old progress-preservation assumption**. All §44 numeric values are **APPROVED as first-pass balance**, subject to later real tester playtesting and possible revision. **No fungus assignments, named recipes, new production system, or code implementation.**
~~~~

### 66. Each Plant's alternative Transformation recipes must be mutually exclusive — APPROVED DESIGN REQUIREMENT — transformations.md

Earlier wording from [docs/next/systems/transformations.md](../systems/transformations.md) (original source section or first-pass staging preface):

- **Reason:** Changed instruction for future recipe pass to current invariant (first-staging line 67)

~~~~text
- **Design outgoing alternatives to be mutually exclusive:** For each Plant with multiple possible destinations, define its eventual Plant-owned exposure/event/Source/environment requirements so **no feasible garden state and event timestamp can make more than one outgoing recipe valid at once**. The recipe pass must verify all competing pairs, including cases involving multiple reaching fungi, Blockers, Waterborne paths, simultaneous environmental transitions, and independently elapsed exposure timers.
~~~~

- **Reason:** Corrected completed recipe-status clause (first-staging line 72)

~~~~text
**Scope:** This closes the *generic* competing-Transformation priority discussion provisionally in favor of design-time prevention. The next substantive text-only task is the dedicated **Plant-owned Transformation recipe pass across the six families**, including pairwise exclusivity and physical feasibility checks before Plant/Fungus biology implementation. No gameplay code changes follow from this decision.
~~~~

### 33. Desert — first Plant-profile batch, Hot exposure/recovery line (APPROVED first-pass profiles) — desert.md

Earlier wording from [docs/next/plants/desert.md](../plants/desert.md) (original source section or first-pass staging preface):

- **Reason:** Removed defunct Sand material claim from Jadeheart (first-staging line 40)

~~~~text
| **Environment** | Prefers **Damp, Temperate or Warm, and Lit**; **Dry** is survivable with reduced Growth and output (not an instant death), **Flooded** significantly suppresses both. **Hot and Freezing** are genuine hazards to Jadeheart, never bonuses; prolonged Mycelial is hazardous/lethal. Material **Sand can be usable** but gives no special mandatory benefit because the Material system is still under review. |
~~~~

- **Reason:** Updated obsolete proposal to approved recovery trigger (first-staging line 94)

~~~~text
4. If Hot is broken before a recovery attempt, the ordinary continuous-exposure clock **resets**; no indefinitely stored Heat-endurance bank. The later recipe pass must specify the exact order of detecting an attempt and the transition out of Hot, so both success and premature failure are actually achievable and unambiguous.
~~~~

- **Reason:** Removed early first-batch work sequence (first-staging line 18)

~~~~text
**Status:** The user **approved all §32 Flowers numerical first-pass values** and asked to begin **Desert**. Desert's existing network and intent in §14 are accepted. The user **approved the complete first batch of six-part Plant profiles** covering **Jadeheart, Ember Aloe, Aloemancer, and Ashen Rose**, including its proposed **36-hour uninterrupted Heat endurance** threshold and innate +30% Hot Growth / +50% Hot Leaf bonus; the next batches will cover Sandrose and the Moonjade and Cactopus branches. As in Woodlands, Aquatic and Flowers, start by defining the Plants, then propose a complete Desert numerical pass; fungi and final Plant-owned transformation recipes follow only later. Prefer bold differentiation now and gameplay-tested balancing after eventual implementation.
~~~~

- **Reason:** Relocated early partial Desert graph with [Freezing/Hot branch] placeholders (first-staging line 22)

~~~~text
~~~text
Jadeheart (Base) ──┬──> Ember Aloe ──┬──> Aloemancer ───> Mirage Rose
                   │                └──> Ashen Rose ───> Sandrose ───> Cactopus
                   ├──> Moonjade ──────────────────────> [Freezing branch]
                   └──> Cactopus ──────────────────────> [Hot branch]
~~~

~~~~

- **Reason:** Removed deferred named contact from established recovery (first-staging line 24)

~~~~text
**Established puzzle:** Ember Aloe **endures sufficient Hot stress and is then recovered** to become Aloemancer; a **recovery attempt made too early** instead produces Ashen Rose. **Cooling Ember Aloe by itself does not automatically produce Ashen Rose**. The qualifying recovery Source/fungus conditions are deferred to the Plant-owned Transformation recipe pass; no fungus emits a generic Transformation Effect. The 36-hour exposure criterion below is proposed as an intrinsic Plant-specific qualification **now**, not a named fungus assignment.
~~~~

- **Reason:** Replaced old 'do not name fungus' sentence (first-staging line 88)

~~~~text
3. **An eligible recovery attempt after at least 36 uninterrupted Hot hours produces Aloemancer**, if the eventual additional Plant recipe conditions are met. Do not name the fungus or invent a Transformation Effect yet.
~~~~

- **Reason:** Replaced hypothetical later recipe warning with final event semantics (first-staging line 92)

~~~~text
**One important caution for later recipe design:** If a recipe simply asks whether an Ember Aloe is Warm now, it would turn innocent cooling into a failure; the premature Ashen Rose outcome specifically requires **a qualifying recovery attempt**, not cooling by itself. The Phase 3 recipe must ensure that early and successful attempts can share a recognizable, deliberate trigger, with Heat exposure deciding their destination. No final source/fungus assignment is made here.
~~~~

- **Reason:** Removed obsolete numeric-pass and fungal-identity deferrals (first-staging line 103)

~~~~text
The **36-hour Heat endurance**, **Ember Aloe innate +30% Hot Growth/+50% Hot Leaves**, and **Aloemancer/Ashen Rose Seed identities** are deliberate first-pass proposals now, **not left open** merely because full numeric balance will follow. Their exact full harvest yields, germination rates, rate/production compatibility multipliers, and other continuous hazard thresholds will be proposed in the complete Desert numerical pass. Do not assign fungus identities, final Transformation recipes, or code.
~~~~

- **Reason:** Removed obsolete next-batch instructions (first-staging line 105)

~~~~text
**Approval status:** The user **APPROVED** all four profiles and their concrete first-pass trait/exposure decisions. The next batch (§34) covers **Moonjade, Jadewisp, Pearadox and Sandrose**. Later complete the Cactopus/rare-endpoint route and the whole-family numeric pass.
~~~~

### 50. Fungi — Echomorel, Wakemorel, Hushroom, Sim'mushro'dim (APPROVED first-pass bundles) — profiles-foundation.md

Earlier wording from [docs/next/fungi/profiles-foundation.md](../fungi/profiles-foundation.md) (original source section or first-pass staging preface):

- **Reason:** Updated first-13 batch phase status (first-staging line 197)

~~~~text
**Status:** The user approved all four §49 fungus designs and requested the next batch. The agreed initial roles now comprise **eight ordinary fungi (§§48–49) plus single-purpose Mycelord (§47)**. This §50 introduces the final four names from the earlier 13-name candidate pool, and **all four specific fungus packages were approved by the user in the subsequent review** ("i like them, and the previous 4 too"). Their numbers, environment reaches, Mycelial preference and production windows below are **proposed first-pass values**, not a finalized global fungus numeric pass. Fungal species always **grow from 0–100%, sporulate from 100–200%, emit immediately after germination and continue emitting indefinitely at 200% while viable**; a one-time destructive Fungus harvest yields its own **Spores only**, removing the Source. **Mycelord alone creates Mycelial**. Complex Plant Temperature/Moisture/Illumination preferences do not return as fungal habitat requirements. **Precise Plant-owned transformation recipes remain completely deferred to a clean pass AFTER all fungi and their numerical balance**.
~~~~

- **Reason:** §50 approved (first-staging line 199)

~~~~text
### A. Four proposed Effect combinations
~~~~

### 57. Coverage / interaction audit, three final first-pass fungi, and survival clarification (APPROVED directions; one Transformation ambiguity OPEN) — fungus-lifecycle.md

Earlier wording from [docs/next/systems/fungus-lifecycle.md](../systems/fungus-lifecycle.md) (original source section or first-pass staging preface):

- **Reason:** Removed unnecessary interim candidate count (first-staging line 16)

~~~~text
**Status (26 October 2026):** After reviewing all 28 approved Fungi against the six approved Plant families, the user accepted **three more first-pass Fungus bundles**: Fogdial, Emberbell and Siltgill. The working roster is now **31 approved candidate Fungi, including sole Mycelial creator Mycelord**, with no requirement to expand further before the next logic pass. These are first-pass strengths/roles, not playtested balance. Plant/Fungus gameplay remains **text-only and unimplemented**. Unlimited Waterborne propagation itself is already implemented in the environmental prototype.
~~~~

### 57. Coverage / interaction audit, three final first-pass fungi, and survival clarification (APPROVED directions; one Transformation ambiguity OPEN) — profiles-final.md

Earlier wording from [docs/next/fungi/profiles-final.md](../fungi/profiles-final.md) (original source section or first-pass staging preface):

- **Reason:** Removed historical 28-to-31 narrative from active roster (first-staging line 9)

~~~~text
**Status (26 October 2026):** After reviewing all 28 approved Fungi against the six approved Plant families, the user accepted **three more first-pass Fungus bundles**: Fogdial, Emberbell and Siltgill. The working roster is now **31 approved candidate Fungi, including sole Mycelial creator Mycelord**, with no requirement to expand further before the next logic pass. These are first-pass strengths/roles, not playtested balance. Plant/Fungus gameplay remains **text-only and unimplemented**. Unlimited Waterborne propagation itself is already implemented in the environmental prototype.
~~~~

### Multiple approved species profiles — woodlands.md

Earlier wording from [docs/next/plants/woodlands.md](../plants/woodlands.md) (original source section or first-pass staging preface):

- **Reason:** Mark profiles as subsequently approved; no numeric values altered

~~~~text
| Category | Proposed direction |
~~~~

### Multiple approved species profiles — aquatic.md

Earlier wording from [docs/next/plants/aquatic.md](../plants/aquatic.md) (original source section or first-pass staging preface):

- **Reason:** Mark profiles as subsequently approved; no numeric values altered

~~~~text
| Category | Proposed direction |
~~~~

### Initial staged navigation/status — profiles-final.md

Earlier wording from [docs/next/fungi/profiles-final.md](../fungi/profiles-final.md) (original source section or first-pass staging preface):

- **Reason:** Removed outdated Transformation OPEN heading (first-staging line 7)

~~~~text
## 57. Coverage / interaction audit, three final first-pass fungi, and survival clarification (APPROVED directions; one Transformation ambiguity OPEN)
~~~~

### 56 — seeds-spores-and-harvesting.md

Earlier wording from [docs/next/systems/seeds-spores-and-harvesting.md](../systems/seeds-spores-and-harvesting.md) (original source section or first-pass staging preface):

- **Reason:** Moved obsolete Waterborne Range 3 claim into history and kept only active unlimited rule (first-staging line 36)

~~~~text
5. Earlier **Waterborne Range 3** cultivation footprints (Tidegill, Sunspore, Rilllace, Brookrill) are **superseded by unlimited connected-Flooded reach**. Their separate Airborne environmental emissions retain their own listed Ranges. Non-Waterborne alternatives such as Gloamclock and Goldgill remain useful on non-Flooded fields despite their small local Airborne Ranges. Historical Range 3 mentions in earlier species profiles describe the older first-pass drafts, not the current rule.
~~~~

### 30. Flowers — Lavendream / Lavendread / Poppycock / Dream Poppy (APPROVED first-pass profiles) — flowers.md

Earlier wording from [docs/next/plants/flowers.md](../plants/flowers.md) (original source section or first-pass staging preface):

- **Reason:** Removed completed numerical/recipe next steps (first-staging line 183)

~~~~text
- Exact total days, peak yields, Seed counts, chance percentages, effect compatibility multipliers, and specific continuous environmental exposure hours will be proposed during the complete Flowers numerical pass, as for earlier families. **The identities and peak positions above are concrete proposals**, not missing decisions; do not choose fungus identities or transformation recipes now.
~~~~

- **Reason:** Removed stale remaining-two Flower count (first-staging line 184)

~~~~text
- These four profiles are **APPROVED first-pass designs**. The remaining two Flowers are **Rosewraith and Orchidemon**, then the whole-family numeric pass.
~~~~

### 31. Flowers — Rosewraith and Orchidemon, final Plant-profile batch (APPROVED first-pass profiles) — flowers.md

Earlier wording from [docs/next/plants/flowers.md](../plants/flowers.md) (original source section or first-pass staging preface):

- **Reason:** Updated final two batch no-named-recipes status (first-staging line 193)

~~~~text
**Status:** The user explicitly **approved** §30's Lavendream, Lavendread, Poppycock and Dream Poppy profiles. The user **approved the final Flowers two-Plant first-pass batch**, covering **Rosewraith** and **Orchidemon**, without further changes. Both have **two incoming transformation routes** in the established family graph. This pass defines their own six Plant characteristics and distinctive natural harvest curves. Their final lifecycle times, peak heights, Seed quantities, germination chances, fungal Effect compatibility multipliers and hazard thresholds belong to the **family-wide numerical pass after this batch is reviewed**. No fungus identities, old A/B/C/D assignments, or transformation recipes are locked.
~~~~

