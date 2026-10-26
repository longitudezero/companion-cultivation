# Companion Cultivation — Herbs, Fungi & Cultivation Design

**Status:** Active text-only design reference; not implemented in Prototype 1  
**Started:** 23 October 2026  
**Related foundation:** [Environmental System v1.2](environmental-system-v1.2.md) (the older v1.1 file is archival)

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

## 4. Planting and germination

### Agreed direction

- Planting uses **Seeds**; putting more Seeds into one planting slot increases the chance of obtaining a living plant, up to a ceiling.
- Seeds beyond the number needed to reach the chance cap provide **no extra success chance**, creating a deliberate **Seed sink**.
- **Different species can have different germination rates.** Do not impose one universal seed-success rate.

### Illustrative numeric example only

If one particular species grants **+10 percentage points per Seed**, 1 Seed gives a 10% success chance, 5 give 50%, and 10 give 100%; additional Seeds give no extra benefit. **This is an example, not a locked formula or a universal ten-seed cap.**

**Open:** How to compute chance per species; how failed planting consumes Seeds; minimum/maximum Seeds per slot; whether herbs and fungi use exactly the same planting mechanics; what happens when the hex cannot support the germinated organism.

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
- Existing environmental code and [Environmental System v1.1](environmental-system-v1.1.md) remain authoritative in the meantime. Future removal would require reviewing the baseline/Source model and proposed material-overlay eligibility and propagation. **Do not add Material or Fertility interactions just to justify preserving those systems.**


## 15. Spices and Ingredients — accepted direction after the Food sketch

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

## 21. Confirmed five-pass workflow for Plant/Fungus design

**Agreed current sequence** (supersedes earlier attempts to finalize fungi before fully specifying Plants):

1. **All Plants first.** Working one Plant at a time, define exactly these six parts: **Natural lifecycle; Natural harvest; Germination; Environment; Farming purpose; Effect compatibility**. This covers innate multiple harvest peaks, Seed identities/curves, favorable and harmful hex states, extreme-temperature/Mycelial Responses, and sensitivity/conditional bonuses to the agreed Effect catalogue. **Do not choose named fungi or settle transformation recipes during this pass.** Do not require an exhaustive environmental bonus checklist when none is useful.
2. **First fungus pass.** Only after the Plant profiles are drafted, bundle fixed, consistent fungus Effects into candidate fungus species with habitat and propagation considerations.
3. **Complete Plant-owned transformation recipes.** Decide which named fungi and their **ordinary Influence reach**, physical adjacency, environmental/overlay states, environmental transition events, and continuous exposure durations satisfy each Plant's transitions. **No lifecycle percentage or Growth/Ripening stage gates (§59).** This is not a return to fungus-emitted Transformation Effects.
4. **Adjust fungal designs as necessary** to ensure workable, readable puzzles, multiple useful strategies, and sensible cross-family reuse.
5. **Adjust Plant designs where necessary** to fix weak or dominant strategies, impossible transformations, or discrepancies exposed by the preceding phases; then balance precise numbers in context.

**Status:** The six-part Plant specification method is agreed. Any proposed first-pass statistics or compatibility profiles produced next remain **proposals until reviewed**, even though the workflow itself is locked.

**Woodlands layout corrections:** The user confirms the arrow **Mistlewoe → Tanglethorn**, previously tentative, and adds **Mandrabra → Mandrakazam** directly in addition to **Mandrabra → Mandrakadabra → Mandrakazam**. These are network facts, not provisional recipe assignments.


## 22. Woodlands — Plant-by-Plant profiles (phase 1)

**Latest Woodlands hazard correction (§70, APPROVED):** Mandrakadabra's earlier six-hour **Mycelial-specific** lethal rule and Mycelial-gated direct Transformation concept have been **superseded**. The approved replacement is death after **4 uninterrupted in-game hours in resolved Bright Illumination**, while **Lit remains optimal for farming**. Read the historical Mandrakadabra profile below subject to §70; do not use its older six-hour Mycelial text as current authority.


**Phase status:** First record each Plant's six characteristics without assigning named Fungi or final Transformation recipes. **Approved** means the user accepted the profile direction, not that exact numbers are finalized. **Proposed** is an unapproved next candidate.

### Woodlands Base Plant (name undecided) — APPROVED first-pass profile

| Category | Approved direction |
| --- | --- |
| **Natural lifecycle** | Average/ordinary Growth and Ripening speeds; not an unusually fast or slow Plant. |
| **Natural harvest** | One broad non-Seed harvest peak during early-to-middle Ripening; its own Seeds become more available toward 200%. Ordinary, dependable output rather than a premium peak. |
| **Germination** | Relatively reliable under suitable conditions. More planted Seeds improve germination chance up to the regular cap. |
| **Environment** | Prefers **Damp, Temperate, and Lit**. Can survive **Dim, Warm, Cold** with some reduced performance. **Hot and Freezing** are harmful and prolonged exposure may kill it. **Mycelial** exposure eventually kills it. |
| **Farming purpose** | Reliable starter crop, sustainable source of its own Seeds, and entry to Bamboo, Mandrake, and Tanglethorn routes. |
| **Effect compatibility** | Ordinary/default strengths with applicable Growth, Ripening, Leaf, Seed, and germination Effects; no special compatibility modifiers or one-off conditions. |

The user accepted this six-part direction as stated; no precise durations, probability figures, death timers, or yield curves have been committed. Base-Plant name remains open.

### Bamboom — APPROVED first-pass profile

**Existing established role that must be preserved:** Bamboom is a strong producer of **Woodlands Base Plant Seeds**. The sequence **Bamboom → Bamboozeling → Bamboozled** is confirmed; it is not a reason to assign fungi or specific transformation timers during Phase 1. The earlier ambiguity with a possible name "Bamboozle" remains separate.

| Category | Proposed direction |
| --- | --- |
| **Natural lifecycle** | **Fairly rapid Growth** and **ordinary Ripening**, so a productive Base-Seed supply can be maintained through frequent rotations rather than extremely long waits. |
| **Natural harvest** | **Low-to-moderate Leaves** with Seed quantity weighted toward the **later Ripening stages**. Produces **Woodlands Base Plant Seeds**, not Bamboom Seeds, unless later specifically revised. Its innate Seed Yield is a major advantage over the Base Plant. No natural second bloom. |
| **Germination** | **Ordinary/reliable**, assuming suitable habitat. No special germination gimmick needed; acquiring fresh Bamboom Instances still depends on the Woodlands Base and its transformation route. |
| **Environment** | Favors **Damp** and **Temperate or Warm** conditions; **Lit** works well, **Dim** is acceptable. **Cold** impairs performance. **Hot/Freezing** are harmful; prolonged exposure can be lethal. **Mycelial** is harmful and eventually lethal. Nothing here grants an extreme or Mycelial bonus. |
| **Farming purpose** | **Base-Seed amplifier:** grows and harvests relatively efficiently to replenish Seeds for multiple Woodlands branches, at the opportunity cost of sacrificing some Leaf output and occupying a field with a reproductive crop. Its value is farming throughput over repeated rotations, not unique rewards. |
| **Effect compatibility** | **Strong response to Seed Yield increases**, especially under **Damp** conditions (a possible conditional strength bonus rather than a new Effect). Ordinary response to Growth acceleration and Germination increases; **Ripening acceleration is valuable** because Seeds arrive later. Standard response to other effects unless later species-specific needs emerge. No reversed fungal Effect directions. |

**Approved direction:** User endorsed the Bamboom profile as proposed, including strong production of **Woodlands Base Plant Seeds**, fairly fast Growth, lower Leaves, Damp/Temperate–Warm affinity, and strong Seed Yield compatibility. Exact rates, Leaf/Seed curves, the size of conditional Seed Yield bonuses, death thresholds, and transformation conditions remain unassigned.


### Bamboozeling — APPROVED first-pass profile

**Established role:** Bamboozeling is the **inferior-but-still-harvestable intermediate** in the confirmed **Bamboom → Bamboozeling → Bamboozled** transformation route. Sustained qualifying conditions make it important to act within a harvest window; the actual fungal identities and transformation recipes will be designed in Phase 3.

| Category | Proposed direction |
| --- | --- |
| **Natural lifecycle** | Similar to Bamboom, but **slightly slower overall** (especially Ripening). Continue using the normal 0–200% lifecycle and restart at 0% on transformation (§58). Do not add an extra stage. |
| **Natural harvest** | **Modest Leaves** and **fewer Woodlands Base Plant Seeds than Bamboom**, with Seeds concentrated toward later Ripening. Still a worthwhile emergency harvest if the player missed Bamboom's preferred window; distinctly worse efficiency than Bamboom, but **not** zero output. **No Bamboozeling Seeds** proposed. |
| **Germination** | No directly harvested Bamboozeling Seeds in this draft. It is primarily obtained by transforming an already germinated Woodlands Plant. If it is ever directly plantable by Seeds, use ordinary germination; **direct access isn't being added now**. |
| **Environment** | Prefers **Damp, Temperate, Lit**, with Warm/Dim acceptable at some cost. Cold slows/reduces performance; Hot or Freezing harmful and potentially lethal after prolonged exposure. Mycelial dangerous and eventually lethal. No special temperature or Mycelial benefits. |
| **Farming purpose** | **Salvageable warning stage** in a risky productive chain. Gives the player a reason to harvest before further unwanted transformation; inferior output is an intentional consequence, not a new premium crop. |
| **Effect compatibility** | Normal direction-consistent responses to catalogue Growth, Ripening, Leaf, Seed, and germination Effects. **No inherited exceptional Seed Yield bonus from Bamboom**; effects may improve harvest but do not by themselves reverse the innate inferior role or create a special Seed identity. |

**Open:** Whether modestly slower Ripening is the best gameplay contrast with Bamboom; precise deterioration in yield and exposure thresholds; if any Seed identity is later changed, make it explicit. The target of the next transformation is confirmed; its recipe remains deferred.

### Bamboozled — APPROVED first-pass profile

**Established role:** A **bad endpoint for repeated exposure**. **Zero Leaves, zero ordinary Seeds**. Harvesting yields an unusual **Bamboo Steel trophy**—a flavor/achievement reward, **not a normal farming production resource** or an alternative dominant Leaf-production strategy. It has no further approved transformation route.

| Category | Proposed direction |
| --- | --- |
| **Natural lifecycle** | Remains within the **ordinary 0–200% Plant lifecycle**, with no productive Leaf/Seed peak. The exact speed is economically unimportant; begin the new Bamboozled instance at 0% on transformation rather than adding a special extra counter (§58). |
| **Natural harvest** | **Always zero Leaves and zero ordinary Seeds**. The established one-time **Bamboo Steel trophy** can be collected through the normal plant-consuming harvest at eligible maturity. Timing/eligibility for the trophy is still to be fixed; don't invent a new permanent resource economy. |
| **Germination** | Produces **no Seeds**, therefore offers **no self-propagating Seed/germination loop**. Obtain by transforming Bamboozeling; no direct Bamboozled Seed source assumed. |
| **Environment** | No favorable **production** habitat, because there is no standard output to optimize. Ordinary survivability in Damp/Temperate/Lit, with Hot/Freezing and Mycelial still harmful and potentially fatal after sustained exposure. Don't add a novel environment preference just to decorate the failure state. |
| **Farming purpose** | **Unwanted transformation consequence and optional trophy discovery**; its inability to return regular Seeds or Leaves makes continued exposure a meaningful farming mistake. Trophy is not an economically preferable fallback. |
| **Effect compatibility** | No ordinary **Leaf Yield, Seed Yield, Seed Timing, Harvest Window, or time-based production** can conjure output from the Plant's zero baseline in this draft. Growth/Ripening adjustments may change *when it can be harvested*; environmental modifiers/hazards still apply normally. Bamboo Steel trophy quantity is **not increased** by ordinary Leaf/Seed bonuses. |

**Open:** Trophy harvesting eligibility and how long a Bamboozled instance can survive in adverse conditions. Its core "no Leaves, no Seeds, Bamboo Steel trophy" identity is **existing agreed design**, not a new proposal. Avoid introducing fungally induced exotic bonus production here merely to rescue a purposely bad outcome.

**Paired design intent:** Bamboom remains a desirable repeatable **Base Seed** crop → Bamboozeling is an inferior but usable **last-chance crop** → Bamboozled yields **no normal farming output**, only the non-economic trophy. Their transitions and exposure timing must remain a challenge for the later transformation-recipe/fungal passes, **without changing the six-part Plant profiles just to accommodate a specific fungus**.


**Approval update:** The user accepted the paired **Bamboozeling** and **Bamboozled** first-pass profiles as proposed. Preserve the distinction between inferior-but-harvestable Bamboozeling and the zero-Leaves/zero-Seeds Bamboo Steel trophy endpoint Bamboozled. Exact numbers and transformation recipes remain later work.

### Tanglethorn — APPROVED first-pass profile

**Existing role:** Accessible from the unnamed Woodlands Base; branch gateway to **Mistlefoe** or **Bramblewraith**, and the return destination for **Mistlewoe**. It is a stable, useful Plant, not a premium specialist.

| Category | Proposed direction |
| --- | --- |
| **Natural lifecycle** | Ordinary/steady Growth and Ripening, somewhat less speedy than Bamboom, with no unusual stage behavior. |
| **Natural harvest** | A **respectable but not exceptional** single Leaf peak during middle Ripening, with modest **Tanglethorn Seeds** appearing later. Producing its own Seeds lets the branch become sustainable once reached, but without matching Bamboom's high Base-Seed output. No second peak. |
| **Germination** | Reliable/ordinary, slightly less favorable than the Woodlands Base if a distinction is needed; Tanglethorn Seeds are not initial player access. |
| **Environment** | Prefers **Damp and Temperate**, accepting **Dim or Lit**. Cold/Warm impose modest performance loss; Dry/Flooded can reduce productivity rather than instantly kill. Hot or Freezing are harmful, potentially lethal after prolonged exposure; Mycelial exposure eventually lethal. |
| **Farming purpose** | Low-maintenance **branch junction** with a worthwhile direct harvest and modest Seed self-sustainability. Supports safer Bramblewraith farming and the Mistlefoe → Mandrabra cross-branch pivot. |
| **Effect compatibility** | Generally **ordinary strengths** with the catalogue's Growth/Ripening/Leaf/Seed/Germination Effects. No special global magnification or invented one-off effect required for a junction Plant. |

**Open:** Exact environmental penalties, germination value, Leaf/Seed curves, and the two forward Transformation recipes.

### Mistlefoe — APPROVED first-pass profile

**Existing role:** A desirable Plant in its own right and the strategic pivot from the Tanglethorn line into **Mandrabra**. In later phase 3, **removing an otherwise beneficial fungus** is necessary for the desired Mistlefoe → Mandrabra outcome; retaining conflicting qualifying fungi instead leads to **Mistlewoe**. This is **a Plant-owned recipe condition**, not a transformation-emitting fungus Effect. Do not assign named fungi yet.

| Category | Proposed direction |
| --- | --- |
| **Natural lifecycle** | **Ordinary Growth**, slightly longer/steadier **Ripening** than Tanglethorn, giving a real opportunity to choose whether to harvest or pursue a transition. |
| **Natural harvest** | A **good single mid-Ripening Leaf peak**, stronger than Tanglethorn but below Mandrakadabra's future premium yield. **Small-to-moderate Mistlefoe Seed** output later in Ripening; self-reproducing once obtained but not a Seed specialist. |
| **Germination** | Ordinary to moderately demanding in suitable habitat; own Seeds can be grown once harvested, but this does not grant them as starting Seeds. |
| **Environment** | Prefers **Damp, Dim, Temperate**. Lit is workable with reduced Leaf output; Cold/Warm produce mild penalties. Dry is unfavorable. Hot/Freezing and prolonged Mycelial exposure are dangerous and ultimately lethal. No exceptional tolerance. |
| **Farming purpose** | **Attractive middle-tier Leaf crop with a strategic choice:** keep it productive and self-sustaining, or manipulate conditions to enter the more dangerous Mandrake branch, risking the Mistlewoe wrong turn. |
| **Effect compatibility** | **Above-average magnitude of the existing non-Seed Harvest Yield Adjustment while Dim** (conditional strength bonus, not an extra effect); otherwise ordinary Growth/Ripening/Seed/Germination compatibility. The profitable fungal influence to be removed for the Mandrabra pivot can later be chosen from genuinely desirable established Effects. |

**Open:** The specific effect strengths and qualification conditions, exact output curve, and fungus identities for the beneficial-versus-conflicting pair.

### Mistlewoe — APPROVED first-pass profile

**Existing role:** An **undesirable** transformation from Mistlefoe when conflicting required conditions/fungal presences remain active, but **not a dead end**: **Mistlewoe → Tanglethorn** is explicitly confirmed.

| Category | Proposed direction |
| --- | --- |
| **Natural lifecycle** | **Slow Growth** and ordinary Ripening, producing poor overall throughput; every transformed instance begins at 0% under §58. |
| **Natural harvest** | **Low Leaves** at one weak mid-Ripening peak and **very few Tanglethorn Seeds** toward late Ripening. No Mistlewoe Seeds proposed. Even the salvage harvest is worse than restoring Tanglethorn by transformation. |
| **Germination** | No direct **Mistlewoe Seed** supply; intended to appear through transformation. The Tanglethorn Seeds harvested from it, if kept in the final design, germinate according to **Tanglethorn's** rules. |
| **Environment** | Favors ordinary **Damp/Temperate/Dim-or-Lit** merely to avoid further losses; Dry/Flooded/Cold/Warm tend to depress already-weak production. Hot/Freezing can kill it following exposure; **Mycelial is dangerous**, potentially with relatively short exposure tolerance. No bonus from Mycelial. |
| **Farming purpose** | **Wrong-route consequence that remains redeemable.** Players may accept a meagre emergency harvest for a few Tanglethorn Seeds or transform it back into a productive Tanglethorn Plant. No exotic bonus or novel resource is needed. |
| **Effect compatibility** | Standard or below-average **magnitude** for Leaf/Seed Yield increases; ordinary rate changes can speed or slow the weak lifecycle without changing its identity. Do not invert any fungal Effect. It remains a weak baseline crop despite ordinary enhancements. |

**Open:** Whether this modest salvage Seed identity should be Tanglethorn Seeds (proposed) or none; exact damage and numerical Responses. Preserve the **confirmed return edge** regardless.

### Bramblewraith — APPROVED first-pass profile

**Existing role:** The appealing **safe and forgiving** Woodlands crop, with a **very broad productive harvest window**, **no conventional lethal environmental weakness**, and respectable—but not Mandrakadabra-level—Leaf yield. Its value is **reliability**, not highest possible peak.

| Category | Proposed direction |
| --- | --- |
| **Natural lifecycle** | **Somewhat slow Growth**, ordinary Ripening once established. Longer setup balances an exceptionally forgiving production window. |
| **Natural harvest** | One **broad, fairly flat Leaf-yield plateau** spanning a large portion of Ripening, at a **moderate-to-good** yield, not the extreme premium Mandrakadabra peak. **Moderate Bramblewraith Seed** production toward later Ripening; can sustain its own dependable crop rotation once unlocked. No second bloom. |
| **Germination** | Ordinary/moderate chance, not a rare Seed specialist; its strength lies in reaching and reliably harvesting it, not superior germination. |
| **Environment** | Best around **Damp, Temperate, Dim/Lit**, but **survives all ordinary Moisture/Illumination states**, with reduced productivity in uncomfortable conditions. **Rare, deliberate exception:** Hot and Freezing impose major Growth/Leaf/Seed penalties but **do not automatically cause eventual death**. **Mycelial is tolerated without a survival-time death threshold**, **but imposes a substantial production/development penalty and NEVER gives a benefit**. This preserves its established nonlethal-resilience identity while honoring general rules that extremes are bad and Mycelial is never helpful. |
| **Farming purpose** | **Safe, self-sustaining, low-attention Leaf crop**: less peak output than the demanding Mandrake route, but far lower timing and environmental failure risk. A practical alternative for maximizing reliable output over long rotations. |
| **Effect compatibility** | Ordinary Leaf Yield, Growth, Seed, and Ripening Effects. **Harvest Window widening has diminished practical room** because Bramblewraith's innate productive plateau is already broad; slowing Ripening can further increase real-world harvesting opportunity but does not create new peaks. No extraordinary fungal compatibility or new effect needed. |

**Approved exception:** Bramblewraith is one of the rare Plants that **survive prolonged Mycelial exposure** without gaining anything from it. Mycelial remains a severe production penalty and can remain dangerous to nearby crops. The user **explicitly approved** Bramblewraith's Mycelial tolerance along with the entire four-Plant branch profile. Exact survival/penalty quantities remain later balance work.

### Relationship summary — this four-Plant batch

~~~text
Tanglethorn ───> Mistlefoe ───> Mandrabra       (desired pivot)
    │               └───────> Mistlewoe ──┐   (undesired)
    │                                      │
    └───────────> Bramblewraith            └──> Tanglethorn  (confirmed redemption)
~~~

**Workflow reminder:** During current Phase 1, these are **Plant profiles only**. No fungus roster, named fungal assignments, transformation recipes, or final numerical thresholds are being locked. The approved Bamboo branch and the three remaining Mandrake Plants can be treated separately.


### Four-Plant approval update

The user **approved the first-pass profiles of Tanglethorn, Mistlefoe, Mistlewoe, and Bramblewraith without immediate edits**, specifically endorsing **Bramblewraith's innate indefinite Mycelial tolerance with significant production penalties but no benefit**. All four are now approved design directions; detailed stats, actual transformation recipes, and fungal assignments remain to be set in later phases.

### Mandrabra — APPROVED first-pass profile

**Established network position:** The Woodlands Base **and Mistlefoe** can lead to **Mandrabra**, which can transform either **into Mandrakadabra** or **directly into Mandrakazam**. These are confirmed edges; named fungal conditions remain later work.

| Category | Proposed direction |
| --- | --- |
| **Natural lifecycle** | **Steady ordinary Growth** and **ordinary Ripening**; not the extreme specialist, but a reliable junction Plant that players can manage before choosing a Mandrake crop pathway. |
| **Natural harvest** | **Respectable, moderately concentrated Leaf peak** during middle Ripening; **small-to-moderate Mandrabra Seed** production toward later Ripening. It can replenish its own Seeds without displacing the Bamboom/Base-Seed economy or Mandrakazam's specialist role. No natural second bloom. |
| **Germination** | **Normal/moderate reliability** when planted from its own harvested Seeds; its initial unlock is still via Transformation, not starter Seed access. |
| **Environment** | Favors **Damp, Temperate, and Lit**; Dim is workable at a modest cost, Cold/Warm are less effective, Dry/Flooded are suboptimal. **Freezing and Hot** hurt output and can eventually kill; prolonged **Mycelial** exposure can kill. No innate extreme or Mycelial tolerance. |
| **Farming purpose** | **Flexible gateway** to either the risky premium Leaf grower **Mandrakadabra** or the **Mandrakazam** production path that supplies Mandrakadabra Seeds. Modest own Seed harvest makes repeated preparation feasible without making Mandrabra itself the best crop. |
| **Effect compatibility** | Ordinary Growth, Ripening, germination, and non-Seed Yield compatibility. **Moderately strong response to Harvest Window Adjustment** when Lit (a magnitude bonus to a known Effect, not an extra ability) is a candidate: gives players an accessible, less high-stakes harvest compared with the later premium Mandrakadabra. Ordinary Seed Yield compatibility otherwise. |

**Open:** Exact harvest, Seed production, and conditional window strengths; whether its own Seed yield is best kept moderate in later balance. Do not assign its two transformation recipes now.

### Mandrakadabra — APPROVED first-pass profile

**Established role:** **Highest potential normal Leaf harvest in Woodlands**, with a risky direct Transformation route and a safer Mandrakazam Seed route. **Specific weakness selected in this Plant-design pass:** Mandrakadabra is **hypersensitive to the Mycelial overlay**: it dies after **6 uninterrupted in-game hours** on an active Mycelial hex. This is a distinctively short threshold compared with ordinary Woodlands Plants. The transformation danger is now tied to this **Plant-owned environmental hazard** rather than an undefined fungally emitted lethal or Transformation Effect; the Phase 3 direct route must be designed to make this hazard meaningfully relevant, without prematurely assigning any particular fungus.

| Category | Proposed direction |
| --- | --- |
| **Natural lifecycle** | **Somewhat longer Growth** and **ordinary-to-fairly-fast Ripening**. Produces impressive output but does not give the player a completely effortless harvest window. A transformed instance begins anew at 0% under §58. |
| **Natural harvest** | One **very high, comparatively narrow Leaf peak** in middle Ripening: the **largest raw Leaf potential in Woodlands**, clearly above Bramblewraith's broad but lower plateau. **Zero ordinary Seed production proposed**; the premium Plant doesn't self-reproduce by default. No second bloom. |
| **Germination** | Although it **produces no Seeds itself**, it **can be planted directly from Mandrakadabra Seeds produced by Mandrakazam**. Its Seed germination is **ordinary/moderately reliable in suitable habitat**, making the safer Seed-based approach genuinely practical. |
| **Environment** | Prefers **Damp, Temperate, and Lit**. Dim/Cold/Warm impair output, Dry/Flooded less efficient. **Hot and Freezing** are harmful and can kill after exposure. **Special weakness:** occupying a **Mycelial hex for 6 uninterrupted in-game hours kills Mandrakadabra**. It receives **no gradual additional penalty** from Mycelial before this threshold; it can produce normally until death occurs. Exposure resets if its hex stops being Mycelial. The **Mandrakadabra-specific timer begins on transformation into Mandrakadabra** (previous-identity exposure time does not transfer); directly Seed-grown Mandrakadabra starts with no exposure. This rule is independent of fungus identity. |
| **Farming purpose** | **High-risk, high-reward Leaf specialist.** Players may reach it by transforming Mandrabra under time pressure or instead grow it from **Mandrakazam-supplied Seeds** in a safe field, avoiding the particular hazardous exposure needed for direct transformation. |
| **Effect compatibility** | **Strong compatibility with ordinary Leaf Yield increases**, potentially even stronger while **Lit** (adjusts magnitude only). **Time-based Leaf Production** can be valuable if the Plant keeps progressing, but extreme slowing/extended exposure can increase practical risk in a hazardous setup. **No Seed Yield Effect generates Seeds** from its innate zero-Seed identity in this draft. Rate and window effects otherwise remain directionally consistent. |

**Specific vulnerability specification chosen for this first pass (pending review with the Mandrake batch):** 6 in-game hours of continuous Mycelial exposure is lethal, with **no early soft debuff**, and the timer resets on interruption; no cumulative damage bank. It begins when the Plant becomes Mandrakadabra, so a new identity is not killed instantly by its precursor's prior exposure. **Phase 3 requirement:** Make the direct Mandrabra → Mandrakadabra transformation a real Mycelial-management challenge, using ordinary source/overlay/adjacency mechanics. Do **not** pick the fungus or complete that recipe yet; ensure it is possible to obtain and save Mandrakadabra despite Mycelial's delayed retreat. This is an intentionally concrete Plant weakness now, with balancing corrections allowed in Phase 5.

**Important balance distinction:** The **very high Leaf yield is an established role**, but **sterility, peak width, and precise rate/compatibility** are proposals. A direct Seed-grown Mandrakadabra is the *same Plant*, without a mandatory persistent penalty or magic attunement. A high single-harvest peak may not dominate sustained-rotation yields once Seed costs, failure risk, and setup time matter.

### Mandrakazam — APPROVED first-pass profile

**Established role:** A **safer reproductive pathway** that **harvests Mandrakadabra Seeds**. It is reachable either **directly from Mandrabra** or **via Mandrakadabra**, as confirmed. The Seed route may cost more setup/growing time than a lucky direct premium transformation, even though the direct Mandrabra → Mandrakazam edge uses fewer graph steps; do **not** describe it as necessarily more transformation edges.

| Category | Proposed direction |
| --- | --- |
| **Natural lifecycle** | **Slower Growth and somewhat long Ripening**, suitable for a crop the player cultivates to build a future Seed supply instead of a fast immediate Leaf harvest. Normal 0–200% lifecycle applies; a transformed instance starts at 0% (§58). |
| **Natural harvest** | **Low-to-moderate Leaves** and **high Mandrakadabra Seed production**, with the strongest Seed returns during **late Ripening**. Produces **Mandrakadabra Seeds**, not Mandrakazam Seeds. Single ordinary Leaf peak, no second bloom. |
| **Germination** | No self-produced **Mandrakazam Seeds** planned, so repeat access is through the established transformation network. The **Mandrakadabra Seeds** it yields obey **Mandrakadabra's germination requirements**, not Mandrakazam's. If direct Mandrakazam Seeds are ever introduced, their germination would require a separate decision. |
| **Environment** | Prefers **Damp, Temperate, Dim or Lit**, with comparatively forgiving light requirements but **not** Bramblewraith-level resilience. Cold/Warm/Dry/Flooded can reduce performance; **Hot or Freezing** cause harmful penalties and eventual death, as can prolonged **Mycelial** exposure. **Does not share Mandrakadabra's special lethal prolonged qualifying exposure** as an innate hazard in this proposal, making Seed farming feasible. |
| **Farming purpose** | **Dedicated Mandrakadabra Seed supplier:** sacrifices immediate Leaves and some time to sustain future premium Leaf harvests **without repeatedly exposing the premium Plant to the dangerous transformation setup**. A strategically valuable counterpart, not another best Leaf producer. |
| **Effect compatibility** | **Strong response to Seed Yield Adjustment**, especially while **Dim** (a conditional magnitude increase, in contrast with Bamboom's Damp Seed synergy). Ripening acceleration can improve turnaround toward late Seed returns; Growth acceleration can offset setup cost. Ordinary Harvest Yield and germination compatibility; never turns effects into opposite-direction behavior. |

**Open:** Seed quantities, exact germination, time economics of the two access routes, and whether Mandrakazam needs a different fallback benefit to maintain good cross-branch value. No fungus or recipe is assigned now.

### How the Mandrake three fit together

~~~text
Woodlands Base ─────> Mandrabra ────────────────> Mandrakazam
                           │                          │
Mistlefoe ─────────────────┘                          └── harvest Mandrakadabra Seeds
                           │                                         │
                           └──> Mandrakadabra ────────> Mandrakazam  │
                                   ▲                                 │
                                   └───── plant harvested Seeds ─────┘
~~~

- **Mandrabra** is the capable gateway with modest self-sustaining farming.
- **Mandrakadabra** rewards demanding cultivation with the **highest Woodlands Leaf peak**; it dies after **6 uninterrupted in-game hours of Mycelial exposure**, a Plant-specific short threshold distinct from ordinary Woodlands tolerance.
- **Mandrakazam** is the **Seed-focused detour** that supports safe, repeatable Mandrakadabra crops.

**Phase 1 status:** The user approved the Mandrake batch, including the **specific 6-hour continuous Mycelial death threshold for Mandrakadabra**. The exact fungus assignments and transformation recipes remain deferred until the user-prescribed third pass. Numeric Growth/Ripening/yield values are proposed in §23 as a separate whole-family balancing pass.

**Correction to earlier shorthand:** Mandrakadabra's distinctive lethal exposure is **Mycelial**; it is not an additional unnamed hazard. The direct transformation path must be designed to involve a genuine Mycelial-management challenge, without creating an emitted Transformation Influence.


## 23. Woodlands full-family numerical pass — proposed starting balance

**Latest correction (§70):** Any reference below to Mandrakadabra's special six-hour Mycelial death threshold is **historical and superseded** by its approved **four-hour continuous Bright lethal exposure**. Its Lit optimum and high-Leaf role are unchanged. This section's other first-pass numerical values remain as previously approved.


**Status:** The user **approved the Woodlands numerical table below as the first balancing-pass baseline**, including deliberately large differences between ordinary and specialized Plants. **10** is the typical non-Seed harvest near 100% and **10** Seeds near 200%, with about **4 in-game days to 100%** and **8 total in-game days to 200%** as the game-wide reference. A thoroughly optimized quick crop may aim for **36–48 in-game hours to 100%**. This is **not final balance**: actual playtesting and tester feedback will motivate later adjustments. The user explicitly prefers **bold, exciting differentiation now over prematurely conservative balancing**. Germination and compatibility proposals follow in §24.

### Scope and interpretation

- Durations describe progress from **0% for a freshly germinated or newly transformed Plant in its preferred habitat with no fungal modifiers**. Transformations restart lifecycle progress at 0% (§58), so these figures also describe a newly transformed species' full reference development time when its habitat remains optimal.
- **Days to 200% are total**; e.g., 4 days to 100% and 8 to 200% implies 4 further days of Ripening.
- **Peak Leaves** show *maximum harvestable non-Seed output* and the relevant approximate progress percentage or range; **Seeds at 200%** are a separate later harvest choice, not automatically collectible on the same instance as peak Leaves.
- The reference curves may give **0 ordinary Leaves at 200%**; accumulated time-based additional output is a separate case for when fungus compatibility is introduced. One harvest always consumes the Plant.
- Woodlands Base's **10 Leaves at 100% and 10 own Seeds at 200%** implements the standard game anchor. Other Plants intentionally skew volume and timing without requiring every Plant to have a different exotic Effect.
- A Plant unable to provide its own Seeds may nevertheless be directly planted if another Plant supplies Seeds of its species (e.g. **Mandrakadabra Seeds from Mandrakazam**).
- This is a **shape-and-magnitude first pass**, not yet complete percentage-by-percentage Leaf/Seed curves or germination investment probabilities. These figures should be tested for practical Seeds consumed and sustained Leafs per occupied hex-day.

### Proposed Woodlands numerical table

| Plant | Days to 100% | Total days to 200% | Natural peak Leaves (progress) | Seeds available at 200% | Seed identity |
| --- | ---: | ---: | --- | ---: | --- |
| **Woodlands Base** | **4.0** | **8.0** | **10 at 100%**, broad early curve | **10** | Own |
| **Bamboom** | **3.0** | **6.5** | **6 around 105%** | **18** | Woodlands Base |
| **Bamboozeling** | **3.5** | **7.5** | **4 around 110%** | **7** | Woodlands Base |
| **Bamboozled** | **4.0** | **8.0** | **0**, no ordinary yield | **0** | None; Bamboo Steel trophy only |
| **Tanglethorn** | **4.0** | **8.0** | **11 around 125%** | **9** | Tanglethorn |
| **Mistlefoe** | **4.0** | **8.5** | **14 around 135%** | **7** | Mistlefoe |
| **Mistlewoe** | **5.0** | **9.0** | **3 around 125%** | **2** | Tanglethorn |
| **Bramblewraith** | **5.0** | **9.0** | **12 across a broad ~110–180% plateau** | **8** | Bramblewraith |
| **Mandrabra** | **4.0** | **8.0** | **12 around 125%** | **7** | Mandrabra |
| **Mandrakadabra** | **5.0** | **8.5** | **30 around 135%**, narrow | **0** | None; can be grown from Mandrakazam Seeds |
| **Mandrakazam** | **5.0** | **10.0** | **5 around 110%** | **20** | Mandrakadabra |

**Bamboozled proposal:** An ordinary one-time harvest once at least 100% progress yields **one Bamboo Steel trophy**, and never Seeds or Leaves. Because Bamboozled is obtained by Transformation, the new instance starts at **0%** and must advance before its trophy is eligible (§58). This eligibility/trophy quantity remains part of the *unapproved numerical pass*, not a new trophy economy.

**Mandrakadabra exception already approved:** Death after **6 uninterrupted hours on Mycelial**, timer starts upon transformation to Mandrakadabra, resets on interruption, no production penalty prior to the threshold. The relationship between a 5–8.5-day normal lifecycle and the 6-hour Mycelial exposure window should be explicitly tested for playability when designing its direct Transformation route. Do not silently revise this hazard during numeric work.

### Open balancing checks once the table is reviewed

- Whole-family efficiency should use **expected non-Seed output per occupied hex per unit time**, not only one-harvest peak Leaves; the opportunity cost of growing Base Seeds, losing Plants to exposure, and fungal/Blocker occupied hexes matters.
- The high Seed quantities for Bamboom and Mandrakazam must be evaluated against **actual Seed investment, chance to germinate, and the need to establish access to their Seed-producing Plant**. Large Seed numbers alone do not guarantee dominance.
- **Bramblewraith** has high reliability because of an unusually broad Leaf window, not because it exceeds **Mandrakadabra's high peak**.
- Development speeds are based on **in-game elapsed time**, not decided as wall-clock/offline progression. How play time is represented can be settled for the actual game's timing implementation.
- Exact continuous curves, germination percentages/Seed-cost curves, species-specific thermal/Mycelial thresholds not yet specified, and all **fungal Effects/Transformations** still require subsequent numerical/mechanics choices.


## 24. Woodlands numerical pass II — germination and Effect compatibility (APPROVED first pass)

**Latest correction (§70):** The older Mandrakadabra **six-hour Mycelial-special death** references in this balancing section are superseded by **four uninterrupted hours in Bright**, with **Lit** still its preferred farming Illumination. Existing Yield compatibility figures are not changed by this correction.


**Status:** The user **approved the entire Woodlands first-pass germination and Effect compatibility numbers below**, including the per-Seed chance model, both numeric compatibility tables, conditional modifiers, zero-output exclusions and the bold specialization differences. These are **accepted initial balance numbers, not final tuned values**. After implementation there must be an actual **playtesting pass with testers** and further balance revisions based on observed emergent behavior. Preference: exciting, memorable, even exaggerated specialist rewards now; rein in overshoots only if tests justify it.

### Germination mechanics proposal

- **Planting a Seed** germinates into the **species named by that Seed**. Germination probabilities therefore belong to the *target Plant's Seeds*, **not** the living Plant that happened to produce them. E.g. **Bamboom produces Base Seeds → use Base's germination rate**. **Mandrakazam produces Mandrakadabra Seeds → use Mandrakadabra's germination rate**.
- Proposed simple, memorable Seed sink: **chance for n invested Seeds = min(100%, n × one-Seed chance)**. All Seeds committed to that one planting attempt are consumed whether success or failure. This is a proposed first numerical rule, not yet an implementation decision. Extra Seeds beyond 100% are wasted; the player can choose to spread Seeds across slots or concentrate them to guarantee one Plant. Later testers may reveal whether a gentler nonlinear or variable cap is preferable.
- Entries marked **not obtainable / no Seed supply** are *not* necessarily biologically incapable of germination, but no source currently supplies those Seeds. Do not invent Seed-production routes for them during this stage.
- Any **Germination Adjustment** fungal Effect would change the *per-Seed probability contribution* by a fixed emitted signed magnitude scaled by the Seed species' **Germination compatibility**. A fungus with a positive effect must never reduce chance directly, or vice versa.

| Species planted (Seed identity) | One-Seed chance | Seeds needed for guaranteed germination | Natural source of Seeds |
| --- | ---: | ---: | --- |
| **Woodlands Base** | **28%** | **4** | Base, Bamboom, Bamboozeling |
| **Bamboom** | — | — | None; transform Base |
| **Bamboozeling** | — | — | None; transform Bamboom |
| **Bamboozled** | — | — | None; transform Bamboozeling |
| **Tanglethorn** | **23%** | **5** | Tanglethorn, Mistlewoe |
| **Mistlefoe** | **20%** | **5** | Mistlefoe |
| **Mistlewoe** | — | — | None; transform Mistlefoe |
| **Bramblewraith** | **20%** | **5** | Bramblewraith |
| **Mandrabra** | **22%** | **5** | Mandrabra |
| **Mandrakadabra** | **12%** | **9** | Mandrakazam |
| **Mandrakazam** | — | — | None; transform Mandrabra or Mandrakadabra |

These create significant differences in resource investment: Base Seeds are inexpensive to guarantee, while premium **Mandrakadabra** planting can be costly without germination aid. Self-Seed-producing Tanglethorn, Mistlefoe, Bramblewraith and Mandrabra remain potentially sustainable; test Seed losses and expected replanting counts in real rotations. A source-less Seed species gets **N/A** compatibility until direct Seeds actually exist.

### How to read the Effect compatibility numbers

- A compatibility of **1.0×** means the Plant reacts to an emitted fungal modifier at **its normal declared strength**; **1.5×** means the **effect change itself is 50% stronger**, not that the Plant's total output is multiplied by 1.5. **0.5×** halves that modifier, and **0×** means no response to that particular Effect.
- E.g. a *hypothetical* +20% Seed Yield emitter received at **2.5×** becomes **+50% Seed Yield** for that Plant. This is only a calculation illustration: **no specific fungus or emitted effect magnitude is assigned** in the Plant-first design phase.
- For Growth/Ripening rates, the table indicates **sensitivity of the emitted signed speed change**. It does not change whether an acceleration is positive or a slowdown is negative. For harvest peak shift and Seed timing shift, the sign/direction belongs to the fungus; the multiplier cannot reverse it.
- Environmental Moisture, Temperature, and Illumination **Influences themselves are globally consistent and non-Plant-dependent**. Plant preferences and risks from the resolved environment are already in individual Plant profiles (§22); **there are no Plant-specific multipliers to the environmental Source arithmetic**.
- Species' **own Environmental Responses** and natural Harvest curves are distinct from fungus-effect compatibility; the percentage values and preferences already recorded for the Plant still apply.

**Main compatibility matrix** (all numeric values are *multipliers on normal fungal Effect changes*, not final direct buffs):

| Plant | Growth Rate | Ripening Rate | Leaf Yield | Seed Yield | Germination |
| --- | ---: | ---: | ---: | ---: | ---: |
| Woodlands Base | 1.0× | 1.0× | 1.0× | 1.0× | 1.0× |
| Bamboom | **1.3×** | **1.3×** | 0.8× | **2.0× / 2.5× while Damp** | N/A |
| Bamboozeling | 1.0× | 1.0× | 0.8× | 0.7× | N/A |
| Bamboozled | 1.0× | 1.0× | **0×** | **0×** | N/A |
| Tanglethorn | 1.0× | 1.0× | 1.0× | 1.0× | 1.0× |
| Mistlefoe | 1.0× | 1.0× | **1.0× / 1.8× while Dim** | 0.9× | 1.0× |
| Mistlewoe | 0.8× | 1.0× | 0.5× | 0.5× | N/A |
| Bramblewraith | 0.8× | 1.0× | 1.0× | 1.0× | 1.0× |
| Mandrabra | 1.0× | 1.0× | 1.0× | 1.0× | 1.0× |
| Mandrakadabra | 0.9× | 1.1× | **2.0× / 2.5× while Lit** | **0×** | **1.8×** |
| Mandrakazam | **1.5×** | **1.4×** | 0.8× | **1.8× / 2.5× while Dim** | N/A |

**Harvest-shaping / advanced compatibility matrix** (multipliers on listed fungal effects):

| Plant | Harvest Window width | Harvest Peak timing shift | Seed Timing shift | Time-based production | Leaf–Seed allocation |
| --- | ---: | ---: | ---: | ---: | ---: |
| Woodlands Base | 1.0× | 1.0× | 1.0× | 1.0× | 1.0× |
| Bamboom | 0.8× | 1.0× | 1.2× | **0.6× Leaves / 1.5× Seeds** | 1.4× |
| Bamboozeling | 1.0× | 1.0× | 1.0× | 0.7× | 0.8× |
| Bamboozled | **0×** | **0×** | **0×** | **0×** | **0×** |
| Tanglethorn | 1.0× | 1.0× | 1.0× | 1.0× | 1.0× |
| Mistlefoe | 1.0× | 1.0× | 1.0× | 1.2× | 1.0× |
| Mistlewoe | 0.7× | 1.0× | 0.8× | 0.5× | 0.7× |
| Bramblewraith | **0.3×** | 0.7× | 1.0× | 0.8× | 1.0× |
| Mandrabra | **1.0× / 1.6× while Lit** | 1.0× | 1.0× | 1.0× | 1.0× |
| Mandrakadabra | 1.2× | 1.2× | **0×** | **1.8× Leaves / 0× Seeds** | **0×** |
| Mandrakazam | 0.8× | 1.0× | 1.3× | **0.6× Leaves / 1.5× Seeds** | 1.5× |

**Time-based production definition:** These multipliers apply only when a *future fungus actually emits the corresponding time-based Leaf or Seed Effect*, the Plant is in the Effect's qualifying progress window, and the lifecycle is still advancing. **No production while fully stalled or after 200%**. The Leaf/Seed entries are per output type, *not* a new Plant-specific power; fungi must explicitly advertise which output they accumulate.

**Leaf–Seed allocation definition:** Modifies the strength of a fungus's defined production-shift *in its fixed emitted direction*, with output always subject to availability. This does **not** change Seed identity, invent a second bloom, or create new Seeds on sterile Plants.

**Sterility and trophy invariants:** **Bamboozled always yields 0 ordinary Leaves and 0 Seeds**, including under Time-based Production and Yield Effects; its Bamboo Steel trophy is unaffected. **Mandrakadabra remains 0 Seeds**, even under positive Seed Yield, time-based Seed output or Leaf–Seed allocation. Ordinary Leaf-enhancement remains its main specialization. Such explicit zero-output eligibility is an **intrinsic Plant trait** and not a reversed fungus Effect.

### Key examples for later balancing and playtesting

- **Bamboom** combines 18 Base Seeds at 200% with low Leaf output and **2.5× Seed Yield compatibility while Damp**. A hypothetical +20% standard Seed emitter becomes **+50% to Bamboom's own Seed output** (18 → 27 Seeds before rounding); fungal identities/values are not yet chosen.
- **Mistlefoe** naturally peaks at 14 Leaves and can make much more of a Leaf Yield emitter **while Dim**. Moving it to Lit sacrifices this compatibility bonus, creating a placement trade-off without an extra one-off ability.
- **Bramblewraith** reaches a 12-Leaf broad plateau already, so **0.3× harvest widening** leaves minimal added headroom. It retains its rare **Mycelial survival tolerance with severe production penalty**, never a Mycelial advantage.
- **Mandrakadabra** has a 30-Leaf high peak and **2.5× Leaf Yield compatibility in Lit**. A hypothetical +20% emitter creates +50%, potentially **45 Leaves**, but its narrow window, Seed costs, and 6-hour lethal Mycelial threshold must make high-efficiency farming an earned outcome.
- **Mandrakazam** supplies 20 Mandrakadabra Seeds over a long 10-day lifecycle; **2.5× Seed Yield compatibility while Dim** can increase Seed returns dramatically, making room for powerful support farms.

### Approval and future-pass discipline

- The **old 13 named fungi remain only proposals**; do not assign any effect or production bonus to a particular named fungus during this pass.
- The **Germination formula**, per-Seed chances, and the two compatibility tables are **APPROVED first-pass numbers**, subject to subsequent playtesting/revision, not hard limits to prevent interesting combinations.
- Prioritize **pronounced, memorable effects over tiny differentials**; conduct a separate real **playtest and tester-feedback balancing pass after implementation**. Tester findings may justify toning down overpowered plants/fungi; the immediate goal is not perfection.
- Full exact output curves, precise environmental hazard penalties other than Mandrakadabra's approved Mycelial six-hour death threshold, and rounding/stacking of concurrent fungal Effects are additional numerical refinements. Do not silently commit nonexistent fungal mechanics or pretend these are implemented.


## 25. Aquatic Plant profiles — first batch (APPROVED first-pass profiles)

**Context:** The user has now **approved Woodlands germination and Effect-compatibility numbers** as first-pass balance and directed work to move to **Aquatic**. The numerical philosophy carries over: approximately **10 Leaves / 10 Seeds**, **4 in-game days to 100% / 8 total days to 200%** as ordinary benchmarks, but strong, meaningful species differences are encouraged. Detailed numeric Aquatic balance can be assigned after identifying family roles, as for Woodlands; do not design fungi or transformation recipes in this pass.

**Aquatic identity preserved from §12:** All Aquatic Plants **dislike Dry**; **Damp and/or Flooded** are preferred. Some routes involve Waterborne reach and water-level changes; continuous loss of Flooded can transform **Kelpergeist into Kelpless**, but the actual transformation recipe, fungus assignment and exposure durations belong to the later third pass. The two Starlotus attunements and Silvercress stage-specific benefits remain intact.

### Confirmed network view (no recipes assigned in this profile batch)

~~~text
Unnamed Aquatic Base
 ├─ Kelpfull ─┬─ Kelpergeist ─┬─ Kelpless ─────> Wild Watercress
 │           │              └─ Starlotus [Flooded attunement]
 │           └─ Kelpless
 ├─ Sunken Lotus ─ Moonlit Lotus ─┬─ Starlotus [Damp attunement]
 │                               └─ Pearlily
 └─ Wild Watercress ─┬─ Silvercress
                     └─ Cresscent ─ Pearlily
~~~

### Aquatic Base (name undecided) — APPROVED first-pass profile

| Category | Proposed direction |
| --- | --- |
| **Natural lifecycle** | **Average 4-day Growth and 4-day Ripening** baseline; not a specialist. |
| **Natural harvest** | **10 Leaves around 100%** and **10 own Seeds around 200%**, with broad ordinary decline/rise curves. Single plant-consuming harvest. |
| **Germination** | **Ordinary/reliable**, its own Seeds available at start. Establish a concrete per-Seed germination rate during the Aquatic numeric pass. |
| **Environment** | Prefers **Damp / Temperate / Lit**; tolerates Flooded reasonably well without outperforming true Flooded specialists. **Dry sharply reduces Growth and output**, rather than instant death. Cold/Warm manageable, Hot and Freezing increasingly harmful and lethal after prolonged exposure; Mycelial eventually lethal. |
| **Farming purpose** | Simple starting Seed loop and gateway to the Kelp, Lotus and Cress branches; dependable but not a competitive specialist. |
| **Effect compatibility** | **1.0× ordinary response** to Growth, Ripening, Leaf Yield, Seed Yield, germination and curve-shaping Effects; environment Sources use universally consistent behavior. No special multiplication or tolerance. |

### Kelpfull — APPROVED first-pass profile

**Keep it simple:** Kelpfull is the first **Flooded-oriented accessible Seed producer**, rather than another elaborate puzzle. It branches toward **Kelpergeist** and the unwanted **Kelpless** outcome; no named fungi chosen.

| Category | Proposed direction |
| --- | --- |
| **Natural lifecycle** | **Somewhat faster Growth** than Aquatic Base and ordinary-to-slightly-fast Ripening. |
| **Natural harvest** | **Low-to-moderate Leaves**, with **high Aquatic Base Seed** output toward 200%. Its direct harvest role resembles Woodlands' Bamboom but belongs to Aquatic's Flooded economy. No own Kelpfull Seeds. |
| **Germination** | **No current source of Kelpfull Seeds**; obtained via transformation from Aquatic Base. Aquatic Base Seeds it produces use the Base's germination rates. |
| **Environment** | Strongly prefers **Flooded**, **Temperate or Cold**, and **Lit/Dim**. Damp is survivable but substantially poorer for output; **Dry suspends progress** and is dangerous over sustained exposure. Hot/Freezing and prolonged Mycelial exposure are harmful/lethal. There is no benefit from either extreme or Mycelial. |
| **Farming purpose** | **Efficient Aquatic Base Seed supplier**; gives the player Seed fuel for repeated moisture-branch experiments, with fewer Leaves than more specialized Aquatic crops. |
| **Effect compatibility** | **Strong Seed Yield compatibility while Flooded** and useful Ripening-rate/Seed Timing response; weaker-than-average Leaf Yield compatibility. No special transformation-dependent Effect. |

### Kelpergeist — APPROVED first-pass profile

**Existing role:** Valuable **Dark + Flooded specialist**. When **Flooded is continuously lost**, it can become **Kelpless**; interruption restores its opportunity to remain a Kelpergeist. Its alternative transformation to **Flooded-attuned Starlotus** is a separate pathway, but conditions are deferred.

| Category | Proposed direction |
| --- | --- |
| **Natural lifecycle** | **Slower Growth** and fairly ordinary Ripening; becomes worthwhile after investment into a stable dark, flooded setup. |
| **Natural harvest** | **High Leaves in a fairly narrow middle-to-late Ripening peak**, with **a few own Kelpergeist Seeds** toward 200%; harvest timing or maintaining a Flooded/Dark habitat is more important than easy Seed multiplication. |
| **Germination** | **Kelpergeist Seeds** germinate at a relatively difficult rate compared to Aquatic Base; still permit direct cultivation of the specialist if a Seed supply is maintained. |
| **Environment** | Best at **Flooded + Dark + Cold/Temperate**. Damp substantially reduces Growth and output; **Dry pauses development** (rather than instantly killing it), and triggers the established **loss-of-Flooded Transformation risk**. Lit/Bright reduces its specialist Leaf performance. Hot and Freezing remain harmful, and Mycelial is eventually lethal. |
| **Farming purpose** | Distinctive **dark-water high-Leaf producer**, with a premium reward for preserving Flooded, plus a risk of slipping into undesirable Kelpless if water is lost; can alternatively be used to obtain Flooded-attuned Starlotus. |
| **Effect compatibility** | **Strong Leaf Yield compatibility while both Dark and Flooded**; ordinary or slightly reduced Seed Yield and Growth/Ripening compatibility. Yield shifts and harvest-window changes work normally; changing Illumination/Moisture through global environment effects has its indirect expected consequences. |

### Kelpless — APPROVED first-pass profile

**Existing role:** Negative transformation reachable from either **Kelpfull or Kelpergeist**, with a **confirmed redemption route → Wild Watercress**. Keep it harvestable but clearly inferior to its precursor.

| Category | Proposed direction |
| --- | --- |
| **Natural lifecycle** | **Slow Growth and Ripening**, giving it poor production throughput; transformation creates the new species at 0% progress (§58). |
| **Natural harvest** | **Very few Leaves** and **a small amount of Aquatic Base Seeds** late in Ripening; no Kelpless Seeds. The Seed output allows a small salvage harvest without replacing the more valuable Wild Watercress redemption path. |
| **Germination** | No Kelpless Seed source; obtained only through Transformation. Any Aquatic Base Seeds it harvests use the Base germination rate. |
| **Environment** | Fares best at **Damp / Temperate / Dim–Lit**, not Flooded; **Dry remains bad** despite its name/origin. Cold/Warm underperform, Hot/Freezing and prolonged Mycelial can kill. No Mycelial tolerance bonus. |
| **Farming purpose** | **Recoverable mistake:** a meager emergency Seed/Leaf harvest or transform it into **Wild Watercress** for a fresh useful branch. Does not need an invented personal fungal bonus. |
| **Effect compatibility** | **Weak Leaf and Seed Yield compatibility** and mildly reduced Growth/Ripening response; ordinary direction-preserving behavior when influenced. No unusual new effect. |

**First batch status:** The user **approved all four six-part first-pass Plant profiles**—Aquatic Base, Kelpfull, Kelpergeist, and Kelpless—without immediate changes. The Aquatic network and agreed Moisture identity remain unchanged. Continue Aquatic in batches (Lotus route; Cress route), then assign whole-family numeric Growth/Ripening, harvest curves, germination, and Effect-compatibility values as in Woodlands.


## 26. Aquatic Plant profiles — Lotus branch (APPROVED first-pass profiles)

**Status:** User approved all four first-batch Aquatic profiles (§25). This is the next requested **four-Plant, six-characteristic first pass** for **Sunken Lotus, Moonlit Lotus, Starlotus, and Pearlily**. These entries were **approved by the user**, including the concrete Starlotus attunement rules and +60% native Leaf bonus. Numeric output curves, chance percentages, and full compatibility matrices are assigned in the Aquatic family-wide numbers pass after Plant roles are accepted. Do not prematurely name fungi, assign their effects, or specify actual Transformation recipes. The existing §12 **two Starlotus routes and Cresscent shortcut** stay unchanged.

### Branch structure and constraints

~~~text
Aquatic Base → Sunken Lotus → Moonlit Lotus ─┬→ Starlotus (Damp attunement; via drainage after exposure)
                                             └→ Pearlily (remain Flooded)

Kelpergeist ───────────────────────────────────→ Starlotus (Flooded attunement)
Cresscent ─────────────────────────────────────→ Pearlily (short alternate route)
~~~

The user established that **draining after qualifying Flooded exposure** selects the Starlotus route from Moonlit Lotus, while **remaining Flooded** favors Pearlily. **Neither fork checks the Plant's lifecycle percentage or whether it is Growing/Ripening** (§59). The exact required Source/Influence proximity, durations, and exposure/transition recipes are Phase 3 work. Ordinary Waterborne spread remains broken if its Flooded connection is lost; a Waterborne Influence active *before* drainage may be checked at the transition event, but cannot be assumed to remain reaching the target afterward.

### Sunken Lotus — APPROVED first-pass profile

| Category | Proposed direction |
| --- | --- |
| **Natural lifecycle** | **Ordinary-to-slightly-slow Growth and ordinary Ripening**. An accessible, steady early Lotus branch Plant, not itself a high-yield specialist. |
| **Natural harvest** | **Near-average Leaves with one broad early/mid-Ripening peak**, and **moderate Sunken Lotus Seeds** at late Ripening. Produces **its own Seeds**, making the Lotus branch maintainable after reaching it rather than forcing a fresh Base-to-Sunken transformation for every attempt. |
| **Germination** | **Normal/moderate** chance for Sunken Lotus Seeds. Seed access is earned from the first harvested Sunken Lotus, not present among starting Seeds. |
| **Environment** | **Flooded, Temperate, Lit** optimal; **Dim** acceptable. Damp is survivable but **noticeably decreases Growth and harvest output**. **Dry pauses development and eventually kills after sustained exposure**. Cold/Warm reduce output, Hot and Freezing are harmful/lethal after exposure, Mycelial eventually lethal. No exception benefits from extreme states. |
| **Farming purpose** | **Easy, self-sustaining flooded entry** to the Lotus branch and consistent small-to-medium Leaf/Seed crop; gateway to Moonlit Lotus. Flooded compatibility is more important than any elaborate innate trick. |
| **Effect compatibility** | **Ordinary 1.0× behavior** across Growth/Ripening, Leaf/Seed, timing/window, and germination effects. Slightly above-average **Seed Timing Shift** response while Flooded is acceptable for this draft (final number in family matrix); not essential to obtain or cultivate it. |

### Moonlit Lotus — APPROVED first-pass profile

| Category | Proposed direction |
| --- | --- |
| **Natural lifecycle** | **Ordinary Growth, somewhat long Ripening**. The longer Ripening period matters for the Plant's harvest economy, not for opening its Flooded/drain Transformation fork, which works at any progress (§59). |
| **Natural harvest** | **Good Leaves in middle Ripening** and **modest Moonlit Lotus Seeds near 200%**; harvest directly for useful output or retain and steer it toward Starlotus/Pearlily. **Self-Seeds**, no Seed identity gimmick. |
| **Germination** | **Moderately demanding** Moonlit Lotus Seed germination; direct growing is feasible after a Seed harvest, but initial access remains via Sunken Lotus Transformation. |
| **Environment** | **Flooded, Dim, Temperate or Cold** preferred. **Remaining Flooded is genuinely productive** for Seed farming, so draining to pursue Starlotus trades a real benefit. Damp is survivable but **immediately lowers ordinary Leaf/Seed performance**, without instant death or intrinsic special drying damage. Dry pauses development and becomes lethal after extended exposure; Hot, Freezing and prolonged Mycelial harmful/lethal. |
| **Farming purpose** | **Fork/intermediate crop with a meaningful choice:** harvest or reproduce Moonlit Lotus under Flooded conditions; remain Flooded with the appropriate exposure/Influence to pursue Pearlily; or drain after qualifying Flooded exposure to pursue a **Damp-attuned Starlotus**, at any lifecycle stage (§59). |
| **Effect compatibility** | **Stronger response to Ripening slowdown while Flooded**, useful for timing the Plant's own harvest, but **not required to delay or enable its Transformation fork**; **good Seed Yield compatibility while Flooded**. Otherwise ordinary Leaf, Growth, Germination, and timing responses. This does not itself trigger the transformation. |

### Starlotus — APPROVED first-pass profile

**Crucial approved family concept retained:** One species with **origin-set Moisture Attunement**, not two new species. A Starlotus transformed from **Moonlit Lotus** is *Damp-attuned*. A Starlotus transformed from **Kelpergeist** is *Flooded-attuned*. Losing its preferred state **removes its attunement bonus, never directly kills it**. It still experiences normal Dry/temperature/Mycelial environmental hazards.

| Category | Proposed direction |
| --- | --- |
| **Natural lifecycle** | **Slow Growth and ordinary Ripening**. A premium Plant cultivated to maximize a decisive harvest, with no extra phase or special timer. Transformation starts a fresh 0–200% lifecycle (§58). |
| **Natural harvest** | One **very high, fairly concentrated mid-to-late Ripening Leaf peak**. **No natural Seeds** in this proposal; Starlotus is a premium **sterile Leaf specialist**, making the transformation path the way to obtain the attuned Plant each time. This avoids inventing unattuned Starlotus Seeds or a two-variant Seed identity mechanism. |
| **Germination** | **No Starlotus Seeds are produced** in the proposed family design. Obtain via either existing transformation origin; germination chance is **not applicable** without a Seed source. |
| **Environment** | Damp/Flooded both **ordinarily viable**, Dim/Lit and Temperate most suitable. **Attuned Moisture grants an innate +60% multiplier to its natural Leaf yield while the current Moisture exactly matches the stored attunement**. Switching to the other viable Moisture removes **only this bonus**; **returning to the original attuned Moisture restores it immediately**. Attunement is retained throughout the Plant's life and never permanently lost by an interruption. Dry is strongly unfavorable, severely suppresses production and can kill after prolonged exposure. Hot/Freezing and sustained Mycelial harmful/lethal; **attunement never grants Mycelial/extreme protection**. |
| **Farming purpose** | **Premium, high-maintenance Leaf crop** that rewards success along two different routes and then rewards **holding the correct water level**; structurally contrasts with Silvercress's stage-specific **changing** water levels. Not an ordinary self-seeding crop. |
| **Effect compatibility** | **Very strong compatibility with existing Leaf Yield and Harvest Timing Shift Effects while attuned**, normal or mildly reduced responses when unattuned; ordinary rate/window effects. **Seed Yield, Seed Timing, time-based Seed Production, and Produce–Seed Allocation cannot create Seeds**, preserving proposed sterility. Environmental Influence arithmetic is always global and unaltered by Starlotus. |

**Specific non-fungus trait decision in this proposed profile:** When attuned, **+60% native Leaf yield**. This is a natural Plant Response to its attuned Moisture, not a new fungus Effect; numerical magnitude can be tested in the later playtest pass. Additional emitted fungal Yield multipliers must still be defined consistently across recipients during fungus design. The persisted attunement is the reason the Plant's two origins matter.

### Pearlily — APPROVED first-pass profile

**Existing routes retained:** Reachable from either **Moonlit Lotus** (remaining Flooded route) or **Cresscent** (shorter, accessible shortcut). **Not** meant to be the Aquatic family's top Leaf or Seed producer.

| Category | Proposed direction |
| --- | --- |
| **Natural lifecycle** | **Slightly faster-than-average Growth**, ordinary Ripening, and a forgiving harvest period. Less costly to maintain than the Starlotus specialist. |
| **Natural harvest** | **Good but not top-tier Leaves**, with a **broad middle-Ripening plateau**, and **respectable Pearlily Seeds near 200%**. **Own Seeds** permit direct future cultivation, but are not spectacularly productive. |
| **Germination** | **Ordinary/reliable** Pearlily Seed germination, available after harvesting a Pearlily. Neither of its transformation origin routes changes the subsequent Seed species or creates hidden attunement. |
| **Environment** | Equally comfortable in **Damp and Flooded** under **Temperate, Dim or Lit** conditions. It **does not need a carefully maintained water level** to remain productive. Dry sharply reduces Growth/yield and eventually kills it, though it is somewhat more forgiving of accidental moisture loss than Lotus intermediates. Hot/Freezing and prolonged Mycelial still harmful/lethal; no special resistance. |
| **Farming purpose** | **Accessible, forgiving, self-reproducing all-round Aquatic crop** reached by two routes. Dependable Leaf and Seed output, rewarding the Cresscent shortcut without trivializing the harder Starlotus and Kelpergeist farms. |
| **Effect compatibility** | **Ordinary Growth, Ripening, Leaf/Seed and germination compatibility**; **modestly stronger response to Harvest Window widening**, complementing its broad peak, but no extraordinary specialist boosts. Stable Damp/Flooded preference itself is its main advantage. |

### Cross-profile decisions and status

- **Moonlit Lotus** benefits from staying Flooded while farming for Seeds, but has two established onward routes that change the strategic goal. It does not get a direct Starlotus-style attunement merely from standing in Damp.
- **Starlotus** is intentionally **sterile**, has the same **+60% native Leaf bonus** in the correct attuned state regardless of origin, **restores the bonus on returning to that state**, and receives no new lethal response merely from losing attunement.
- **Pearlily** is a reliable self-sustaining crop, no persistent origin-variant rules and no extreme premium status; **Cresscent → Pearlily remains the meaningful shortcut**.
- **No fungi, exact Transformation recipes, additional resource types, or new effect categories are being committed.** Numerical duration/yield/germination/compatibility values beyond specific proposed innate attunement bonus will be specified with the rest of Aquatic after the Plant profiles are accepted.
- All four Lotus profiles are **APPROVED for the first Plant-design pass** (user endorsed them without changes). Fine tuning still belongs to the numerical balance and later playtest passes.


## 27. Aquatic Plant profiles — Cress branch (APPROVED first-pass profiles)

**Status:** The user approved the Lotus four (§26), including **sterile Starlotus**, reversible **+60% attuned Leaf bonus**, and Pearlily's dual route. This third Aquatic batch covers **Wild Watercress**, **Silvercress**, and **Cresscent**. The existing **Woodlands-style six profile areas** are followed. No named fungus or exact fungal Transformation recipe is assigned.

**Existing network preserved:**

~~~text
Aquatic Base ───────────┐
                        ├─> Wild Watercress ──┬─> Silvercress
Kelpless ──(redemption)─┘                     └─> Cresscent ──> Pearlily (shortcut)
~~~

**Established core:** Silvercress is **easy to obtain** but rewards **Flooded during Growth** and **Damp during Ripening**, with *no extra penalty* if either stage bonus is missed. Cresscent **reproduces itself** with **unusually good Seed germination**, but a Plant instance must be *harvested for Seeds OR transformed into Pearlily*, never both.

### Wild Watercress — APPROVED first-pass profile

| Category | Concrete first-pass direction |
| --- | --- |
| **Natural lifecycle** | **Fairly quick Growth and ordinary Ripening**. Faster to establish than the Aquatic Base, without becoming a dedicated ultra-fast crop. |
| **Natural harvest** | **Respectable but unspectacular Leaves** in a **broad early/mid-Ripening peak**, plus a **moderate number of Wild Watercress Seeds** late in Ripening. One harvest only. |
| **Germination** | Produces **its own Seeds** with **ordinary-to-good** germination. Not a starter Seed; initial access is from Aquatic Base or redeemed Kelpless, after which it can sustain its own planting rotations. |
| **Environment** | Prefers **Damp + Temperate + Lit**, tolerates **Dim**. **Flooded is acceptable but slightly less productive** than Damp; unlike the Lotus branch, flooding isn't its core requirement. **Dry** seriously reduces Growth/Leaves, with death after prolonged continuous exposure; Hot/Freezing and Mycelial can kill. Cold/Warm are workable with mild penalties. |
| **Farming purpose** | **Accessible, forgiving Damp-oriented entry** to the Cress branch; a meaningful recovery destination for Kelpless and a solid crop to farm even without a further Transformation. It is not a premium Leaf or Seed specialist. |
| **Effect compatibility** | **Ordinary Growth/Ripening/Leaf/Seed/Germination Effects** at roughly 1.0×. **Slightly elevated Germination compatibility** is a possible minor convenience, but no dramatic bespoke power. Environmental Sources always resolve their normal universal environmental change. |

**Chosen Seed identity:** Wild Watercress Seeds (its own); not Aquatic Base Seeds. Maintains a simple, direct branch sustain loop.

### Silvercress — APPROVED first-pass profile

| Category | Concrete first-pass direction |
| --- | --- |
| **Natural lifecycle** | **Average natural Growth and Ripening rates** at stable suitable conditions. An **innate +60% Growth Rate while Flooded during 0–100%**, and otherwise normal Growth. This is an additive *rate change relative to its own natural progression*, not +60 percentage points of lifecycle progress. |
| **Natural harvest** | **Good Leaf output** at a **moderately concentrated mid-Ripening peak**, with **modest Silvercress Seeds** late in Ripening. During **100–200% Ripening while Damp**, gains an **innate +50% Leaf Yield** at its existing peak/curve. One harvest; no additional bloom. |
| **Germination** | **Produces Silvercress Seeds** with **ordinary/moderate** germination; initial access is the easy Wild Watercress → Silvercress transformation route, then it can be seeded normally. |
| **Environment** | Both **Damp and Flooded are viable**. Flooded gives the special **Growth-stage speed bonus**, Damp gives the special **Ripening-stage Leaf bonus**. **Missing a preferred stage has no special penalty**: it only forgoes the relevant stage's benefit. These are independent; no requirement to complete an exact Flooded→Damp transition, although changing at ~100% earns both. **Dry is harmful** (no bonuses and lower natural performance; eventually lethal), Hot/Freezing and long Mycelial exposure remain hazardous. Prefers Temperate and Lit/Dim. |
| **Farming purpose** | **Easy-to-unlock, rewarding-to-optimize Leaf farmer**. Correct water timing creates a large output/turnaround advantage, but a player who ignores the water-change puzzle still obtains a functional Plant. Distinct from Starlotus's fixed *origin-set* preference and Pearlily's flexible water conditions. |
| **Effect compatibility** | **Strong response to Growth acceleration while Flooded** and to **Leaf Yield bonuses while Damp during Ripening**. Ordinary Ripening rate and Seed Yield responses. Environmental Source arithmetic is not magnified by species; the resolved moisture state activates intrinsic bonuses. Harvest timing/window Effects operate normally. |

**Precise trait choices:** **+60% intrinsic Growth Rate in Flooded** *while Growing*; **+50% intrinsic Leaf Yield in Damp** *while Ripening*. Two separate species traits, **not fungus Effects** and **not transformation rules**. Neither benefit carries a punishment for failing to satisfy its condition; returning to the qualifying state restores the relevant benefit. The exact fungal *compatibility multipliers* will be assigned in the whole Aquatic numbers table. **No necessary environmental transition is checked by the Plant to receive either bonus**.

### Cresscent — APPROVED first-pass profile

| Category | Concrete first-pass direction |
| --- | --- |
| **Natural lifecycle** | **Quick-to-average Growth and ordinary Ripening**. Somewhat efficient turnover; does not try to beat the fastest Plants in the whole game. |
| **Natural harvest** | **Modest Leaves** but **high Cresscent Seed production near 200%**, skewing the player toward reproductive harvests. One Plant instance may instead be transformed to Pearlily, but **cannot also be harvested for its Seeds**. |
| **Germination** | **Exceptional natural germination:** proposed **40 percentage points per Cresscent Seed** under the agreed additive one-Seed probability model. **Three Seeds guarantee germination** (capped at 100%); a single Seed has a real 40% chance. This is a Plant/Seed species characteristic, not a fungal one. |
| **Environment** | Favors **Damp, Temperate, Lit/Dim**, with **Flooded fully survivable but modestly less efficient** for Seed production. **Dry** strongly damages Growth/Seed productivity and eventually kills; Hot/Freezing and prolonged Mycelial lethal risks. Cold/Warm less productive, with no special extreme/overlay benefits. |
| **Farming purpose** | **Efficient self-sustaining Seed engine and accessible Pearlily shortcut.** Its strong Seed germination makes repeated Cresscent/ Pearlily cultivation cost-effective, even though Cresscent itself isn't a premium Leaf producer. The choice is to harvest for many Seeds, or transform that **same living instance** for a Pearlily crop. |
| **Effect compatibility** | **Above-average Seed Yield and Germination Adjustment responses**, especially in Damp. Ordinary-to-slightly-reduced Leaf Yield response. Strong positive Seed Timing or time-based Seed production response can become attractive in a later fungus pass, still constrained by lifecycle advancement and one-time harvest. |

**Chosen Seed identity:** Cresscent Seeds only, rather than Pearlily Seeds on a Seed harvest. Otherwise harvesting Cresscent would short-circuit its own Transform-or-Harvest decision.

### Three-Plant relationship and future numeric pass

- **Wild Watercress** is an uncomplicated self-Seeding **Damp branch foundation** and redeemable **Kelpless** destination.
- **Silvercress** is a **nonpunitive Flooded-Growth/Damp-Ripening optimization challenge**, with explicitly proposed **+60% Growth speed** and **+50% Leaf Yield** innate bonuses and its own moderately reliable Seeds.
- **Cresscent** is a **high-germination Seed multiplier** with explicitly proposed **40% chance per Seed / 3 Seeds guaranteed** and its own Seeds, supporting the **Cresscent → Pearlily** shorter route.

No new fungal roster, emission, Transformation Effect, stage, or permanent origin variant is added here. The user **APPROVED all three Cress profiles**, including **Silvercress +60% intrinsic Growth rate during Flooded Growth / +50% Leaf Yield during Damp Ripening** and **Cresscent 40 percentage points of germination per Seed**. The whole Aquatic family numerical balance proposal is recorded in §28. Real playtesting follows implementation.


## 28. Aquatic numerical pass — APPROVED first-pass lifecycle, harvest, germination, Effect compatibility and hazard responses

**Status:** User **approved the entire Aquatic numerical pass (§28)**—all 11 lifecycle and harvest rows, Seed identities, additive germination probabilities, Effect-compatibility tables, intrinsic Starlotus/Silvercress bonuses, and proposed Dry/Mycelial/temperature hazards—as the accepted **first-pass balance**, to be revised from eventual tester playtests. Game-wide baseline: nominal **10 Leaves near 100%, 10 Seeds near 200%, 4 in-game days to 100%, and 8 total days to 200%**. Favor bold, memorable species differences over prematurely conservative tuning. **No fungus identities, effect packages, or exact transformation recipes have been assigned.**

### A. Natural lifecycle and harvest

**Interpretation:** Values apply to a Seed-grown **or newly transformed Plant beginning at 0%**, in its usual viable/optimal habitat, without an assigned fungus and **before innate conditional species traits**. Transformation restarts the lifecycle (§58), so the listed days describe the new Plant's full stages in a stable preferred habitat. "Days to 200%" is the total time including Growth and Ripening. Leaf maxima and Seeds at 200% are two alternative harvest outcomes because **one harvest consumes the Plant**. Exact interpolation between identified anchor points remains an implementation detail, not another Plant feature.

| Species | Days 0–100% | Days 0–200% total | Natural peak Leaves (progress) | Seeds at 200% | Harvest Seed identity |
| --- | ---: | ---: | --- | ---: | --- |
| Aquatic Base (unnamed) | **4.0** | **8.0** | **10 at 100%** | **10** | Aquatic Base |
| Kelpfull | **3.0** | **7.0** | **6 at 105%** | **20** | Aquatic Base |
| Kelpergeist | **5.0** | **9.0** | **22 at 150%** | **5** | Kelpergeist |
| Kelpless | **5.5** | **10.0** | **3 at 115%** | **3** | Aquatic Base |
| Sunken Lotus | **4.5** | **8.5** | **11 at 125%** | **10** | Sunken Lotus |
| Moonlit Lotus | **4.0** | **9.0** | **15 at 140%** | **8** | Moonlit Lotus |
| Starlotus | **5.5** | **9.5** | **25 at 150%** | **0** | None (sterile) |
| Pearlily | **3.5** | **7.5** | **14 on broad 115–170% plateau** | **10** | Pearlily |
| Wild Watercress | **3.5** | **7.5** | **11 at 120%** | **11** | Wild Watercress |
| Silvercress | **4.0** | **8.0** | **16 at 140%** | **8** | Silvercress |
| Cresscent | **3.5** | **7.5** | **6 at 110%** | **18** | Cresscent |

**Locked profile traits honored in this numeric proposal:**

- **Starlotus:** its natural 25-Leaf peak becomes **40 Leaves** when the persisted origin-set Moisture matches the current Moisture (**25 × 1.60**). The two origins remain **Moonlit Lotus → Damp-attuned** and **Kelpergeist → Flooded-attuned**. The matching bonus disappears on a mismatch and is restored when the original Moisture returns; mismatching does not independently kill it. It produces no Seeds.
- **Silvercress:** **+60% native Growth rate while Flooded in 0–100%**, so its unmodified 4-day Growth stage takes **4 ÷ 1.60 = 2.5 days** if entirely Flooded; then when **Damp in 100–200%**, its 16-Leaf peak becomes **24 Leaves** (**16 × 1.50**). Both intrinsic bonuses are independently conditional; there is **no added punishment** for missing either. An ideal Flooded-Growth/Damp-Ripening 0–200% Silvercress lifecycle takes **6.5 days** rather than 8 before fungal Effects.
- **Cresscent:** its 18 Cresscent Seeds are specifically **self-Seeds**; if the Plant is instead transformed to Pearlily, it cannot also harvest those Seeds.
- **Kelpfull** makes Aquatic Base Seeds, **Kelpless** salvages Aquatic Base Seeds, Starlotus remains sterile. Both Moonlit Lotus and Cresscent lead to Pearlily but no hidden origin variants for Pearlily.

### B. Germination — exact first-pass Seed species values

**Same formula as approved Woodlands:** for a Seed species with single-Seed chance \(p\), committing \(n\) Seeds to a slot yields **min(100%, n × p)** germination success. All committed Seeds are consumed on attempt regardless of success. Germination compatibility of fungal Germination Adjustment modifies the *probability contribution per Seed* before cap, using that fungus's signed strength; the normal direction remains unchanged. **Germination is a characteristic of the species planted**, not a characteristic of the Seed-producing parent Plant. No Seed source means this Seed is presently unavailable, **not an assertion that a biological Seed can never germinate**.

| Species to plant | Chance per Seed | Minimum Seeds for 100% | Current Seed source |
| --- | ---: | ---: | --- |
| Aquatic Base | **28%** | **4** | Own, Kelpfull, Kelpless |
| Kelpfull | — | — | None; via Aquatic Base Transformation |
| Kelpergeist | **15%** | **7** | Own |
| Kelpless | — | — | None; via Transformation |
| Sunken Lotus | **22%** | **5** | Own |
| Moonlit Lotus | **18%** | **6** | Own |
| Starlotus | — | — | None; via Moonlit Lotus / Kelpergeist Transformation |
| Pearlily | **26%** | **4** | Own |
| Wild Watercress | **30%** | **4** | Own |
| Silvercress | **24%** | **5** | Own |
| Cresscent | **40%** | **3** | Own |

The previously approved **40% Cresscent chance** is preserved exactly. A Plant producing Seeds of another species follows that receiving species's numbers.

### C. Numeric Effect compatibility — main catalogue

**Reading tables:** Every multiplier scales the **magnitude of the fungal Effect's change, not the entire final harvest or time**. The future fungus's own Effect identity and strength remain constant; Plant condition determines only response intensity. **1× ordinary**, **2× twice the emitted change**, **0× ineligible/no response**. Direction never reverses. Signed slowdowns can be *more adverse* on highly susceptible Plants; strengths are not guaranteed benefits. A slash means ordinary multiplier / special multiplier when the listed condition is met; conditions are evaluated on the receiving Plant's resolved environmental states or persisted attunement. Environmental Influence arithmetic (Moisture/Temperature/Illumination) remains globally consistent and is never multiplied by these compatibility tables.

| Plant | Growth Rate | Ripening Rate | Leaf Yield | Seed Yield | Germination |
| --- | ---: | ---: | ---: | ---: | ---: |
| Aquatic Base | 1.0× | 1.0× | 1.0× | 1.0× | 1.0× |
| Kelpfull | 1.3× | 1.2× | 0.7× | **1.7× / 2.5× when Flooded** | N/A |
| Kelpergeist | 0.9× | 1.1× | **1.2× / 2.2× when Dark and Flooded** | 0.7× | 0.8× |
| Kelpless | 0.7× | 0.8× | 0.5× | 0.5× | N/A |
| Sunken Lotus | 1.0× | 1.0× | 1.0× | 1.0× | 1.0× |
| Moonlit Lotus | 1.0× | **1.0× / 1.7× for Ripening *slowdown* while Flooded** | 1.1× | **1.0× / 1.7× when Flooded** | 1.0× |
| Starlotus | 0.9× | 1.0× | **1.2× / 2.2× when matching attunement** | 0× | N/A |
| Pearlily | 1.1× | 1.0× | 1.0× | 1.0× | 1.0× |
| Wild Watercress | 1.1× | 1.0× | 1.0× | 1.0× | 1.1× |
| Silvercress | **1.0× / 2.0× when Flooded during Growth** | 1.0× | **1.0× / 2.0× when Damp during Ripening** | 0.9× | 1.0× |
| Cresscent | 1.1× | 1.0× | 0.7× | **1.7× / 2.4× when Damp** | **1.5× / 2.0× when Damp** |

For **Moonlit Lotus**, the unusual 1.7× bonus applies **only to the already-established Ripening Slowdown Effect** while Flooded, **not** to a fungus emitting Ripening acceleration; the latter remains 1.0×. Both effects retain their fixed directions. This is a documented conditional compatibility, **not a reversal**.

**Stacking example:** Silvercress already has innate **1.60× Growth Rate** when Flooded. If a hypothetical fungus has **+20% Growth acceleration**, Silvercress's **2.0× compatible response** turns that into **+40%**. Under a proposed **independent multiplicative** composition of native habitat and fungal rate factors, its 4-day Growth takes **4 ÷ (1.60 × 1.40) ≈ 1.79 days** (about 43 hours). This is an *illustration of intended high-end pace*, not an assigned fungus. The exact composition/stacking implementation can be tested later, but don't silently count innate +60% and fungal +40% as the same effect.

### D. Advanced harvest and Seed Effect compatibility

| Plant | Harvest Window width | Leaf Peak Timing Shift | Seed Timing Shift | Time-based Production | Leaf–Seed Allocation |
| --- | ---: | ---: | ---: | ---: | ---: |
| Aquatic Base | 1.0× | 1.0× | 1.0× | 1.0× Leaves / 1.0× Seeds | 1.0× |
| Kelpfull | 0.8× | 1.0× | 1.3× | 0.6× Leaves / **1.6× Seeds** | 1.4× |
| Kelpergeist | 1.1× | 1.3× | 0.8× | **1.5× Leaves** / 0.6× Seeds | 0.8× |
| Kelpless | 0.8× | 1.0× | 0.8× | 0.5× Leaves / 0.5× Seeds | 0.6× |
| Sunken Lotus | 1.0× | 1.0× | **1.0× / 1.3× while Flooded** | 1.0× Leaves / 1.0× Seeds | 1.0× |
| Moonlit Lotus | 1.2× | 1.1× | 1.1× | 1.0× Leaves / **1.3× Seeds** | 1.0× |
| Starlotus | 1.0× | **1.4× / 2.0× when matching attunement** | **0×** | **1.8× Leaves / 0× Seeds** | **0×** |
| Pearlily | **1.5×** | 0.8× | 1.0× | 0.9× Leaves / 1.0× Seeds | 1.0× |
| Wild Watercress | 1.0× | 1.0× | 1.0× | 1.0× Leaves / 1.0× Seeds | 1.0× |
| Silvercress | 1.2× | 1.1× | 1.0× | 1.2× Leaves / 0.8× Seeds | 1.0× |
| Cresscent | 0.8× | 1.0× | **1.4×** | 0.6× Leaves / **1.8× Seeds** | 1.5× |

**Time-based Production** remains an explicit Effect emitted by a future fungus, never an automatic power granted by this table; it accumulates only while actual Growth/Ripening advances inside the fungus's stated active window, never after 200% or during full dormancy. If a particular fungus emits only Leaves/hour, the Seed-side entry does nothing. **Zero ordinary Seeds from sterile Starlotus** remains inviolable under Seed boosts, time-based output and allocation.

**Harvest Window** means changing the *width* of the existing natural yield curve without creating a second bloom. **Timing Shift** means changing when a peak occurs, not how much it produces. **Leaf–Seed Allocation** redistributes output in the emitter's defined direction; it does not change Seed identity, clone a Seed output that doesn't exist, or allow a second harvest.

### E. Primary Moisture Responses and exposure hazards — concrete optional balance numbers

The profiles already specify **which Moisture states are favorable**. The following compact first-pass numbers make those relationships measurable, pending the same user review as the other tables. These describe a Plant's **innate environment response**, separate from emitted fungal Effect compatibility. **The fungal/environmental Source arithmetic is never scaled per Plant.**

- **Damp/Flooded values** in this paragraph are relative Crop Growth and normal yields; where a row favors one state, the other is typically **0.65×–0.90×**. Where both are equally viable (Pearlily, Silvercress, Starlotus before attunement), both are **1.0×**, ignoring their separate species-specific bonuses.
- **Dry response proposal** below specifies a rate factor and output factor simultaneously. A **0× Growth factor** suspends lifecycle progress; it does not waive adverse exposure time, and therefore Dry can kill after its continuous threshold. Dry thresholds reset when Moisture stops being Dry.

| Plant | Damp baseline vs Flooded (Growth / ordinary yield) | While Dry (Growth / ordinary yield) | Continuous Dry until death | Continuous Mycelial until death |
| --- | --- | --- | ---: | ---: |
| Aquatic Base | Damp 1.0×; Flooded 0.9× | 0.5× / 0.5× | 72 h | 48 h |
| Kelpfull | Flooded 1.0×; Damp 0.65× | **0×** / 0.25× | 48 h | 36 h |
| Kelpergeist | Flooded 1.0×; Damp 0.60× | **0×** / 0.20× | 72 h | 36 h |
| Kelpless | Damp 1.0×; Flooded 0.85× | 0.4× / 0.4× | 72 h | 48 h |
| Sunken Lotus | Flooded 1.0×; Damp 0.70× | **0×** / 0.25× | 48 h | 48 h |
| Moonlit Lotus | Flooded 1.0×; Damp 0.70× | **0×** / 0.25× | 48 h | 36 h |
| Starlotus | Damp & Flooded **1.0× base**, plus conditional attunement | 0.2× / 0.2× | 48 h | **24 h** |
| Pearlily | Damp & Flooded **1.0×** | 0.5× / 0.5× | **96 h** | **72 h** |
| Wild Watercress | Damp 1.0×; Flooded 0.85× | 0.35× / 0.35× | 72 h | 48 h |
| Silvercress | Damp & Flooded **1.0× base**, plus stage-specific bonuses | 0.4× / 0.4× | 72 h | 48 h |
| Cresscent | Damp 1.0×; Flooded **1.0× Growth / 0.85× Seed output** | 0.35× / 0.35× | 72 h | 48 h |

**Important precedence:**
- Starlotus's **+60%** is conditional **Leaf Yield** while *current* Moisture matches *stored* attunement; losing that state alone does not trigger death or erase stored attunement.
- Silvercress gets **+60% Growth Rate** during Flooded Growth and **+50% Leaf Yield** during Damp Ripening. Nonpreferred viable Moisture does not impose a **separate loss penalty beyond missing the stated bonus**.
- Kelpergeist also has an **established Transform-to-Kelpless route from sustained loss of Flooded**. **Do not assign that Transformation duration in this numeric table**: the exact Plant-owned route, priority, presence of other required conditions, and continuity rule are Phase 3 work. The Dry hazard timer and a transformation timer are independent conditions; future recipe tuning must ensure the rescue/wrong-turn opportunity actually functions.
- For **Hot and Freezing**, none of these 11 Aquatic species has a beneficial exception. As a simple first-pass family response, each imposes **0.5× lifecycle rate and 0.5× ordinary yields**, followed by death after **72 uninterrupted hours** at that extreme. Individual Woodlands' much shorter 6-hour Mandrakadabra Mycelial weakness is a separate Plant-specific rule and is not revised here.
- Other existing Cold/Warm, Dim/Lit/Bright responses remain as described in the approved species profiles, with small ordinary penalties. **All Aquatic Plants dislike Dry, and Mycelial is never beneficial.** Exposure reset mechanics and hazard handling need playtesting; these numbers are intentionally assertive proposals rather than an engine implementation.
- **Hazard time** advances with actual time in the harmful condition even if lifecycle progress is fully suspended; no time-based production occurs while suspended. Apply lethal thresholds to actual environmental states, not raw source strength. For continuous Mycelial exposure, timer resets only when the overlay actually disappears from the Plant's hex (not simply when the emitting fungus is removed).

### Testing, decisions, and no premature fungus assignments

- This section has **all numeric fields needed for the Aquatic first balance proposal**; the user prefers making decisions that can be corrected after testing, not postponing a species' distinctive mechanic until fungus design.
- Intrinsic Starlotus +60%, Silvercress +60%/+50%, and Cresscent 40%/Seed remain part of the user-approved qualitative profiles, **not unapproved novelty invented by this table**.
- The **new** lifecycle, harvest, Seed-germination (other than Cresscent), compatibility and hazard numbers are now **APPROVED first-pass values**; eventual playtest findings can revise them.
- As for Woodlands, **do not design or implement fungi or Transformation recipes here**. First finish Plant profiles/numbers across all families, then a fungus roster, then decide fungus-supported Plant-owned transformations, adjust fungi and Plants, and conduct an actual player **playtest and balancing pass** afterward. No code changes were requested or made.


## 29. Flowers — first Plant-profile batch (APPROVED first-pass profiles)

**Latest recipe status (§73, 26 October 2026):** All **12 Flowers Transformation recipes** are **APPROVED first pass**, including Daisyspell's timed Dim-preparation → Bright completion route into Orchidemon. Earlier §13 A/B/C/D Fungus labels and recipe sketches are historical placeholders, superseded by §73. The Plants' bloom windows and cultivation Effect compatibilities below are **not** Transformation eligibility gates.


**Status:** With all 11 Aquatic Plant profiles and their full §28 numeric pass approved, the user requested **Flowers**. Following the Plant-first workflow, this batch proposes **Daisydaze (Base), Charmomile, Daisyspell, and Marigloom** as coherent six-part Plant specifications. This entire batch was **approved by the user**; the final family-wide timing/harvest/germination/compatibility matrices follow after all ten Flowers Plants have profiles. No fungal roster or named Transformation recipes are being assigned.

### Family identity and confirmed design guardrails

- Flowers are about **shape and timing of natural Leaf harvest curves**, plus the existing **Time-based Production** fungal Effect and harvest-window/rate trade-offs.
- Early and late blooms are **intrinsic Plant harvest profiles**. Multiple separate peaks (especially **Rosewraith**, later batch) also belong to the Plant's **natural curve**. **No fungus grants a Secondary Bloom Effect**, a previously discarded idea. Yield boosts affect existing curve peaks, and timing/window adjustments reshape existing portions only.
- **One harvest per Plant** always consumes it, even if a Plant has more than one potential peak.
- **Time-based Production is NOT automatically present** merely because a Plant has a narrow late harvest window. It applies only while qualifying fungus Effects are active and lifecycle progress is genuinely advancing within that Effect's specified window, never after 200% or during full stall.
- Other established family edges remain intact: **Daisydaze → Charmomile, Lavendream, Poppycock**; **Charmomile → Daisyspell or Marigloom**; **Daisyspell → Orchidemon**; **Marigloom → Rosewraith**; and later alternate Orchidemon and Rosewraith routes. The old Fungus A/B/C/D labels in §13 are **superseded placeholders**, not assignments.

~~~text
Daisydaze (Base)
 ├─→ Charmomile ─┬─→ Daisyspell ──→ Orchidemon
 │              └─→ Marigloom ───→ Rosewraith
 ├─→ Lavendream ────────────────→ [later batch]
 └─→ Poppycock ─────────────────→ [later batch]
~~~

### Daisydaze — APPROVED first-pass profile

| Category | Proposed definition |
| --- | --- |
| **Natural lifecycle** | **Ordinary four-day Growth and four-day Ripening** (8 total) as the Flowers comparison baseline. No innate speed anomaly. |
| **Natural harvest** | A familiar **single, broad-ish Leaf peak near 100%** with **10 Leaves** at peak and **10 Daisydaze Seeds** near 200%; no natural second peak. Early Leaves can exist before 100% under the established output-curve model. |
| **Germination** | Reliable, relatively inexpensive self-Seeds initially accessible as the Flowers Base species. Use the ordinary per-Seed additive germination model; its exact percentage will be selected in the Flowers numeric matrix. |
| **Environment** | Prefers **Damp, Temperate, Lit**; Dim/Warm/Cold viable with milder ordinary penalties, Dry and Flooded inefficient. **Hot/Freezing** hinder and can eventually kill; sustained **Mycelial** is harmful and lethal. No intrinsic Mycelial/extreme bonus. |
| **Farming purpose** | **Plain reference farmer** and access point to the three Flowers branches; a dependable 10/10 crop rather than competition for best output or special timings. |
| **Effect compatibility** | **Standard 1.0× magnitude** of applicable Growth, Ripening, Harvest Yield, harvest-window/timing, Seed, Germination and Time-based Production modifiers. Environmental Source arithmetic remains global and unscaled. |

### Charmomile — APPROVED first-pass profile

**Distinct role:** An accessible **early-blooming** intermediate that is productive **before Growth has fully completed**, useful even if the player never transforms it.

| Category | Proposed definition |
| --- | --- |
| **Natural lifecycle** | **Somewhat faster Growth** than Daisydaze and ordinary Ripening. Fast farming benefit without becoming the extreme speed specialist—that distinction belongs to Daisyspell. |
| **Natural harvest** | **Strong early Leaf peak around 90%** progress, with a wider/less unforgiving early window than Daisyspell. **Moderate Charmomile Seeds** available later toward 200%. **Own Seed identity**; no separate bonus harvest and no extra bloom. |
| **Germination** | Moderate-to-good chance from **Charmomile Seeds** earned after the initial Daisydaze → Charmomile transformation; the Flowers Base remains the original starter seed. |
| **Environment** | Best under **Damp, Warm-or-Temperate, Lit**. Dim/Cold reduce productivity; Dry/Flooded unfavorable. Hot and Freezing are harmful and can eventually kill; Mycelial eventually lethal. It does **not** benefit from Hot as a substitute for Warm. |
| **Farming purpose** | **Reliable early Leaf harvesting** that gives players a real alternative to keeping the Plant alive to obtain its own Seeds or to transform it into Daisyspell/Marigloom. |
| **Effect compatibility** | **Strong Harvest Peak Timing Shift and Harvest Window widening** magnitude response, so existing fungal Effects can meaningfully alter/extend its naturally early peak; ordinary Leaf Yield and Ripening responses, moderately above-average Growth accelerator response. No unique invented Effect. |

**First-pass curve decision:** **90%** is its natural early Leaf peak. This is a deliberate character choice rather than leaving "early" undefined. The exact peak height/window breadth are set later in the same whole-Family numeric matrix.

### Daisyspell — APPROVED first-pass profile

**Distinct role:** Extreme **speed** and a **fleeting, earlier Leaf peak**. A skilled player can harvest it efficiently, but arriving late sacrifices the advantage. Its confirmed onward edge to **Orchidemon** remains.

| Category | Proposed definition |
| --- | --- |
| **Natural lifecycle** | **Exceptionally short natural Growth and Ripening**, substantially faster than both Daisydaze and Charmomile. Its full cycle is compressed, including the interval in real time between early peak and diminishing output. Don't invent a third stage. |
| **Natural harvest** | A **high but sharply narrow Leaf peak at approximately 75% overall progress**, substantially earlier than Charmomile, followed by a rapid falloff. Late-ripening harvest instead produces **a small number of Charmomile Seeds**, **not Daisyspell Seeds**—a deliberately asymmetric Seed identity supporting access to the branch without trivializing future Daisyspell transformations. One harvest; no second bloom. |
| **Germination** | **No Daisyspell Seeds are produced** by existing Flowers crops in this first pass. Reach it by transforming Charmomile; the **Charmomile Seeds** it yields use **Charmomile** germination numbers. |
| **Environment** | Prefers **Damp, Temperate-or-Warm, Bright or Lit**, with Bright preferable for natural Leaf output. Dim/Dark reduce output, Dry/Flooded suboptimal. Hot and Freezing adverse and ultimately lethal; Mycelial quickly harmful and lethal following continuous exposure. No exceptional temperature/overlay tolerance. |
| **Farming purpose** | **High-throughput early Leaf crop with a narrow decision window**, versus committing a fast Plant to Seed production or an Orchidemon transformation. Good candidate for exceptionally quick optimized rotations, not a safe set-and-forget Plant. |
| **Effect compatibility** | **Strong Growth acceleration**, **strong Harvest Window widening** (enormously valuable against its intrinsically tiny timing window), **high Leaf Yield compatibility while Bright**. **Ripening slowdowns cannot rescue a missed pre-100% peak**; Growth slowdown can widen the *real-time* interval before the peak while reducing throughput. Ordinary Seed Yield compatibility applies only to its available Charmomile Seeds. |

**Timing feasibility update (§58):** Charmomile → Daisyspell creates a fresh Daisyspell at **0%**, so the new Plant has its full Growth stage to reach its spectacular **75%** early Leaf peak. The transformation recipe no longer has to fire before its predecessor reaches 75%; it still must be feasible under environmental and exposure constraints. **Do not assign the recipe yet.**

### Marigloom — APPROVED first-pass profile

**Distinct role:** The polar opposite of Daisyspell—**very slow Growth and especially slow Ripening, with a strikingly late, fairly narrow Leaf harvest peak**. Its onward path to **Rosewraith** remains. An existing fungus's hourly Time-based Production may be a powerful optimization choice but is not an intrinsic output mechanic.

| Category | Proposed definition |
| --- | --- |
| **Natural lifecycle** | **Significantly slow Growth**, **exceptionally long Ripening**, making this Plant one of the slowest normal Flowers crops to reach 200%. This gives it a real long-wait cost despite excellent late Leaf returns. |
| **Natural harvest** | A **strong but narrow single late Leaf peak at 170% progress**, concentrated around approximately **160–177%**. **Few Marigloom Seeds** at 200% (own Seeds) to allow sustained farming once harvested, but obtaining them sacrifices the unusually high Leaf peak on that Plant. No innate second bloom. |
| **Germination** | Somewhat demanding **Marigloom Seeds**, produced only if an instance survives until its late Seed harvest. Initial access remains via Charmomile Transformation. |
| **Environment** | Prefers **Damp, Cold-or-Temperate, Dim**. Lit/Warmer conditions reduce ordinary output and rate; Bright/Dark less favorable, Dry/Flooded less efficient. Freezing and Hot are hazardous extremes, with no beneficial exception; prolonged Mycelial eventually lethal. |
| **Farming purpose** | **High-investment, late-harvest Leaf specialist**. Naturally rewards deliberate waiting, with particularly good future synergy from separately-defined **Time-based Leaf Production** while positive Ripening progress continues through the late productive window. In contrast, a direct Ripening accelerator might increase rotation speed but **reduce cumulative hours available for time-based production**; either can be useful. |
| **Effect compatibility** | **Very strong response to Time-based Leaf Production in late Ripening**, **strong response to Ripening slowdowns while Dim**, above-average Leaf Yield and Harvest Timing Shift compatibility. No automatic generation of hourly bonus without an actual fungus Effect; no new "Secondary Bloom" mechanism. |

**First-pass concrete productive window:** **160–177%**, with a natural peak at **170%**. A future fungus's eligible hourly production window is part of *that fungus's own stable Effect definition*; it can overlap this range without being arbitrarily assigned as a special Marigloom-only fungal behavior. Production accumulates only while the Plant's lifecycle actually advances and never after 200%.

### Decisions awaiting review

- **Daisydaze**: ordinary 10-Leaf/10-own-Seed, 4/8-day Flower baseline.
- **Charmomile**: early-but-forgiving **90% peak**, self-Seeds, accessible fast intermediate.
- **Daisyspell**: **75% fleeting peak**, exceptionally fast, modest **Charmomile Seeds**, strong Bright/acceleration/window synergy; ensure it can be transformed into early enough for its crop payoff.
- **Marigloom**: **170% late peak in 160–177% band**, very slow, low **own Seeds**, unusually strong compatibility with existing hourly Leaf Production rather than an invented fungal Secondary Bloom.

As for Aquatic and Woodlands, remaining numerical values (peak heights, total times beyond Base, germination chances, detailed Condition hazard time, and Effect multipliers) will be specified **for all Flowers together after every Plant has a complete profile**; no reason to conceal its defining natural peak positions during this first role pass. **All four profiles are APPROVED as the initial Plant identities**, and subject to revision after implementation/playtesting.


## 30. Flowers — Lavendream / Lavendread / Poppycock / Dream Poppy (APPROVED first-pass profiles)

**Latest recipe status (§73, 26 October 2026):** All **12 Flowers Transformation recipes** are **APPROVED first pass**, including Daisyspell's timed Dim-preparation → Bright completion route into Orchidemon. Earlier §13 A/B/C/D Fungus labels and recipe sketches are historical placeholders, superseded by §73. The Plants' bloom windows and cultivation Effect compatibilities below are **not** Transformation eligibility gates.


**Status:** The user **approved** §29's Daisydaze, Charmomile, Daisyspell and Marigloom six-part profiles without requested changes. This four-Plant first pass was **approved by the user** without requested revisions. Preserve the established Flower graph and only define the Plant's own farming behavior, Seed identities, and numerical *shape* of its peak when useful. The complete initial Flowers duration/output/germination/Effect-compatibility balance comes after all Plants have profiles. Do **not** assign fungus identities, transformation recipes, or old superseded A/B/C/D Effects.

### Connection layout

~~~text
Daisydaze ──> Lavendream ──┬──> Lavendread ──┐
                           └──> Orchidemon  │
                                            ├──> Dream Poppy ──> Rosewraith
Daisydaze ──> Poppycock ─────────────────────┘
~~~

The two **Dream Poppy origins** (Lavendread and Poppycock) are intentionally distinct routes to the **same Plant species**; no new route-dependent attunement is proposed. All other Orchidemon/Rosewraith routes remain as established.

### Lavendream — APPROVED first-pass profile

**Core identity:** The **forgiving, long-harvest-window Flower**; slow and easy to miss *in an overall time-budget sense*, but very hard to miss its profitable Leaf peak once it's ripening. Unlike Bramblewraith, Lavendream is **not** environmentally indestructible; its advantage is a naturally broad harvest curve.

| Category | Proposed definition |
| --- | --- |
| **Natural lifecycle** | **Slow Growth** and **slightly slow Ripening**, but far faster than exceptionally slow Marigloom. It takes real time to establish, then allows relaxed harvest timing. |
| **Natural harvest** | A **single broad Leaf plateau from about 110–175%**, good sustained natural Leaf availability but a modest maximum compared with narrow-peak specialists. **Moderate Lavendream Seeds** available at late Ripening; own Seeds, so this Plant is self-sustaining after reaching it. Not a two-bloom Plant. |
| **Germination** | **Ordinary/moderate** Lavendream Seed success; obtainable from Lavendream's own Seed harvest, initial access from Daisydaze Transformation. |
| **Environment** | Prefers **Damp, Temperate, and Dim/Lit**; tolerates Warm and Cold at some production penalty. **Dry/Flooded** impair output, **Hot/Freezing** are harmful and lethal under sustained exposure, **Mycelial** eventually lethal. No special hazard immunity: this is *harvest-timing* resilience, not environmental tolerance. |
| **Farming purpose** | **Slow but low-attention Leaf farming** and a steady supply of Lavendream Seeds; its branch also gives access to Lavendread and one of the two Orchidemon routes. |
| **Effect compatibility** | Standard non-Seed Yield and lifecycle-rate Effects; **low additional response to Harvest Window widening** because its natural plateau is already huge. **Moderately strong response to Harvest Peak Timing Shift** (shifting the broad plateau) and **slightly stronger Time-based Leaf Production** if the future fungus's eligible progress window overlaps its long-lived harvest interval. No special fungus-dependent second bloom. |

**Concrete shape choice:** The natural high Leaf plateau extends approximately **110–175%**, clearly distinguishing it from Bramblewraith by Flower-family role and without copying Bramblewraith's Mycelial tolerance. Its height and exact lifecycle days are assigned later in the Flowers numbers table.

### Lavendread — APPROVED first-pass profile

**Core identity:** An **inferior Leaf crop but powerful Lavendream Seed producer**; the branch's reproductive engine, with a possible forward route into Dream Poppy. It is a trade-off, not a complete failure state like Bamboozled.

| Category | Proposed definition |
| --- | --- |
| **Natural lifecycle** | **Ordinary Growth**, but **longer Ripening** than most non-specialist Flowers. Seed production takes patience; no special Dormancy. |
| **Natural harvest** | **Very low Leaves** with a weak single peak around **115%**, but **high Lavendream Seed output** near 200%. **Does not produce Lavendread Seeds.** Seed timing strongly favors late Ripening. |
| **Germination** | **No Lavendread Seeds are produced** in the current network. Obtain by transforming Lavendream; its harvested **Lavendream Seeds** germinate using Lavendream's own rate. No arbitrary direct Seed source is added. |
| **Environment** | Prefers **Damp, Cold/Temperate, Dim or Dark**. Lit/Warm reduce output, Dry/Flooded inefficient; **Hot and Freezing** and prolonged **Mycelial** eventually lethal. Dark itself is not a damaging state to Lavendread. |
| **Farming purpose** | **Seed-oriented support crop** that can replenish Lavendream so the player can grow the forgiving Leaf crop without repeating its Base Transformation; alternative use is to continue onward into Dream Poppy. Its trade-off is poor Leaves and a long Seed wait. |
| **Effect compatibility** | **Very strong Seed Yield Adjustment** and **Time-based Seed Production** compatibility (only if a future fungus actually emits that ordinary Effect). **Strong Seed Timing Shift compatibility** and useful Ripening acceleration; low response to Leaf Yield boosting, ordinary Growth/Germination where applicable. Leaf–Seed Allocation can redistribute eligible output in the emitted direction, but never generate Lavendread Seeds. |

**Concrete Seed identity:** Harvest Lavendread for **Lavendream Seeds**, not its own, ensuring its reproduction role is real rather than a generic Seed bonus.

### Poppycock — APPROVED first-pass profile

**Core identity:** A readily accessible **self-Seeding Flowers specialist** with a low Leaf return, intended to feed a frequent **Poppycock → Dream Poppy** production route.

| Category | Proposed definition |
| --- | --- |
| **Natural lifecycle** | **Fairly quick Growth** and **ordinary Ripening**. Faster overall than most Lavendream-line Plants; it is an accessible repeatable Seed crop rather than an extreme speed showcase. |
| **Natural harvest** | **Low Leaves** at one small early/middle peak around **110%**; **very high Poppycock Seeds** near 200%, with useful Seed quantities becoming available somewhat earlier than on average (around 165–175%) even if the best output remains at 200%. No extra bloom. |
| **Germination** | Produces **its own Seeds**, **above-average germination** relative to an ordinary Flower; starter access is still via Daisydaze Transformation, not free Poppycock Seeds at the beginning. |
| **Environment** | Prefers **Damp, Temperate/Warm, Lit or Bright**; Dim works less efficiently, Dark reduces production. Dry/Flooded suboptimal; Hot and Freezing harmful and eventually lethal; Mycelial exposure ultimately lethal. Bright is a good condition, not a universal intrinsic +bonus mechanic. |
| **Farming purpose** | **Efficient Seed replenishment** that supports direct repeat Poppycock farming and furnishing Plants for Dream Poppy Transformations. A simpler and faster alternative to the Lavendread route with a different Seed identity. |
| **Effect compatibility** | **Strong Seed Yield and Seed Timing Shift magnitudes**, particularly under **Bright**; useful Germination Adjustment susceptibility, modest Leaf Yield response. Existing Time-based Seed Production may be valuable; it still cannot produce after 200% or with stalled progress. |

**Concrete choice:** Poppycock produces **Poppycock Seeds**, with especially good success when planted. This makes it self-sustaining and distinct from Lavendread, whose Seed harvest feeds a different Plant.

### Dream Poppy — APPROVED first-pass profile

**Core identity:** A **late-blooming, Leaf-producing destination with a useful Seed fallback**, reached via either Lavendread or Poppycock. Distinct from Marigloom: **Dream Poppy is not exceptionally slow** and has a more forgiving late Leaf window; Marigloom has extremely long Ripening and a narrower peak with extraordinary compatibility for Time-based Leaves.

| Category | Proposed definition |
| --- | --- |
| **Natural lifecycle** | **Ordinary Growth and moderately slow Ripening**. Takes more time than Poppycock, but not nearly as long as Marigloom; no added lifecycle phase. |
| **Natural harvest** | One **strong late Leaf peak around 180%**, with a fairly usable productive interval of approximately **165–190%**. At 200%, has **moderate Poppycock Seeds**, **not Dream Poppy Seeds**. This creates tension between late Leaves and waiting a little longer for replenishment Seeds. No second natural peak—Rosewraith is the family's innate two-bloom specialist. |
| **Germination** | **No Dream Poppy Seeds are produced** by either route in this draft; obtain Dream Poppy by transforming **Lavendread or Poppycock**. The harvested **Poppycock Seeds** germinate with Poppycock's numbers, regardless of which origin yielded Dream Poppy. |
| **Environment** | Prefers **Damp, Dim, Cold/Temperate**; Lit workable with a modest Leaf penalty, Warm less efficient, Bright/Dark less productive. Dry/Flooded unfavorable; **Hot/Freezing** and long **Mycelial** exposure ultimately lethal. No special tolerance. |
| **Farming purpose** | **Late harvest alternative** for either Seed branch, with meaningful Poppycock Seed feedback and an onward pathway to Rosewraith. A more manageable late Leaf crop than Marigloom; not a direct Seed-identity copy of the two-bloom Rosewraith outcome. |
| **Effect compatibility** | **Strong Leaf Peak Timing Shift and Harvest Window widening** (to relocate/broaden an existing late peak); **above-average Leaf Yield susceptibility while Dim**. Ordinary Time-based Leaf Production and Ripening rate response, rather than Marigloom's huge per-hour specialization. Seed Yield/Seed Timing Effect responses operate on its ordinary **Poppycock Seeds**. |

**Concrete late-peak choice:** **180%**, over an approximately **165–190%** productive window. **Seed identity is Poppycock**, making Dream Poppy an alternative Seed-replenishment source for one of its transformation origins, never the source of its own Seed line.

### Relationships, existing constraints, and next steps

- **Lavendream**: *very broad* natural plateau and its own Seeds; slow but forgiving, without Bramblewraith-level environmental survival.
- **Lavendread**: poor Leaves, strong **Lavendream Seed** output and long Ripening; its own Seed identity intentionally unavailable.
- **Poppycock**: high **own Seed** output and strong germination; Seeds arrive somewhat early, but 200% remains its maximum.
- **Dream Poppy**: **180% late Leaf peak** and **Poppycock Seeds**, two legitimate Transformation origins and no origin-specific trait, same single harvest.
- **Marigloom distinction:** The approved profile has **170%**, *narrow 160–177%* peak, exceptionally slow Ripening and very strong future time-based Leaf compatibility; Dream Poppy has **180%**, broader **165–190%** and a modestly slow Ripening stage.
- **Rosewraith distinction:** Multiple *intrinsic* natural Leaf peaks, to be specified in the final Flowers batch; none of the four Plants here acquires a second peak from fungus.
- Exact total days, peak yields, Seed counts, chance percentages, effect compatibility multipliers, and specific continuous environmental exposure hours will be proposed during the complete Flowers numerical pass, as for earlier families. **The identities and peak positions above are concrete proposals**, not missing decisions; do not choose fungus identities or transformation recipes now.
- These four profiles are **APPROVED first-pass designs**. The remaining two Flowers are **Rosewraith and Orchidemon**, then the whole-family numeric pass.


## 31. Flowers — Rosewraith and Orchidemon, final Plant-profile batch (APPROVED first-pass profiles)

**Latest recipe status (§73, 26 October 2026):** All **12 Flowers Transformation recipes** are **APPROVED first pass**, including Daisyspell's timed Dim-preparation → Bright completion route into Orchidemon. Earlier §13 A/B/C/D Fungus labels and recipe sketches are historical placeholders, superseded by §73. The Plants' bloom windows and cultivation Effect compatibilities below are **not** Transformation eligibility gates.


**Status:** The user explicitly **approved** §30's Lavendream, Lavendread, Poppycock and Dream Poppy profiles. The user **approved the final Flowers two-Plant first-pass batch**, covering **Rosewraith** and **Orchidemon**, without further changes. Both have **two incoming transformation routes** in the established family graph. This pass defines their own six Plant characteristics and distinctive natural harvest curves. Their final lifecycle times, peak heights, Seed quantities, germination chances, fungal Effect compatibility multipliers and hazard thresholds belong to the **family-wide numerical pass after this batch is reviewed**. No fungus identities, old A/B/C/D assignments, or transformation recipes are locked.

### Established last-stage graph connections

~~~text
Marigloom ────────────────┐
                          ├──> Rosewraith
Dream Poppy ──────────────┘

Daisyspell ───────────────┐
                          ├──> Orchidemon
Lavendream ───────────────┘
~~~

The two incoming routes for each are **real routes into the same named species**, not origin-dependent species variants or separate attunements. Each route creates a new Plant at **0%**; the final recipe-feasibility pass must still provide viable habitat to complete a useful new lifecycle after either route (§58).

### Rosewraith — APPROVED six-part first-pass profile

**Established distinction:** Rosewraith has **two Leaf-production peaks inherently**, within *one* ordinary 0–200% lifecycle. They do **not** come from a fungus providing a now-discarded Secondary Bloom Effect, and only **one harvest** can be made from each Rosewraith Plant.

| Category | Concrete first-pass definition |
| --- | --- |
| **Natural lifecycle** | **Ordinary-to-slow Growth** and **longer-than-average Ripening**. The long Ripening interval provides real time to make a choice between the two peaks rather than making both occur almost instantaneously; no extra stage or lifecycle counter. |
| **Natural harvest** | **Two natural Leaf peaks:** a **moderate first peak at 115%** (productive around **105–125%**), a **clear low-output valley around 145–155%**, and a **stronger second peak at 180%** (productive around **170–190%**). The second peak has a greater raw Leaf maximum than the first, but waiting for it costs time and exposure to hazards. At 200% Rosewraith instead produces **a modest amount of Rosewraith Seeds (own species)**. Harvest at the first peak **or** the second peak **or** for Seeds; never more than one. |
| **Germination** | **Rosewraith produces its own Seeds** with **moderately difficult germination**, allowing a Seed-grown Rosewraith crop after first access from Marigloom or Dream Poppy. The initial unlock still requires Transformation; no Rosewraith starter Seeds. Source route does **not** change Seed identity or create origin attunement. |
| **Environment** | Prefers **Damp, Temperate-or-Cold, and Dim**; Lit is viable but reduces normal output, Warm somewhat less productive, Dry/Flooded unfavorable. **Hot and Freezing** harm and can eventually kill; prolonged **Mycelial** kills it. No innate Mycelial tolerance, extreme-temperature bonus, or dependence on a special new environmental overlay. |
| **Farming purpose** | **Flexible but high-attention dual-bloom Leaf crop.** Gives the player a meaningful decision at two separate harvest opportunities with a valley of weak output between them, plus a late self-Seed alternative. Both Marigloom and Dream Poppy offer access, and Rosewraith can then be cultivated directly from its own Seeds if enough are reserved. The two peaks are *choices*, not two harvests or free cumulative Leaves. |
| **Effect compatibility** | **Above-average response to ordinary Harvest Yield Adjustment**, boosting the height of **both existing peaks**; **strong response to Harvest Timing Shift and Harvest Window widening**, moving/reshaping both natural peaks but never adding a third peak. **Strong response to Time-based Leaf Production** when a future fungus's declared active window overlaps advancing late Ripening. Moderately strong response to **Ripening slowdown** because it can extend the real-world decision interval and support hourly yield without pausing progress entirely. Ordinary Seed Yield/Germination compatibility; fungus never emits Secondary Bloom. |

**Specific shape choices:** First peak **115%**, second **180%**, low valley **145–155%**, different natural peak heights (late > early). These are explicit choices now, not merely a note that it has "two blooms." A future numeric curve pass must preserve the valley as a genuinely weaker harvest region, even if ordinary window-shaping Effects widen the existing peaks.

**Interaction invariants:** Yield increases apply consistently to **both peaks**; Harvest Timing Shift moves the existing features in the emitter's consistent direction; Window Adjustment changes existing widths but doesn't fabricate output after 200%; a fungus providing Time-based Leaves adds output only within its own declared progress window while lifecycle progress is advancing. It **does not create the second natural peak**. Seed Yield can improve the Rosewraith Seeds it actually makes, without creating another Seed identity.

### Orchidemon — APPROVED six-part first-pass profile

**Established distinction:** A prestigious **very-high-Leaf, entirely sterile Flower**, obtained by a demanding transformation combination through either **Daisyspell** or **Lavendream**. Its spectacular output is one single natural peak rather than Rosewraith's two smaller opportunities. It must be markedly more valuable at optimal harvest than ordinary Flowers; no tiny 2–5% specialist advantage.

| Category | Concrete first-pass definition |
| --- | --- |
| **Natural lifecycle** | **Ordinary-to-slightly-long Growth** and **moderately long Ripening**. It is a premium endpoint worth investing in, but not another extremely slow Marigloom; transformation begins a new 0–200% lifecycle (§58). |
| **Natural harvest** | **One extremely tall, very narrow Leaf peak around 145% overall progress**, concentrated approximately **137–153%**. The natural Leaf peak will be among the highest in Flowers, far ahead of baseline Daisydaze, with negligible output far outside the peak. **Absolutely zero ordinary Seeds** at all percentages, including 200%, and no additional special harvest resource. |
| **Germination** | No **Orchidemon Seeds** are available from Plants in this graph. New Orchidemon instances come through **Daisyspell → Orchidemon** or **Lavendream → Orchidemon**. Do not quietly add a germinable Orchidemon Seed line; its sterility helps make both transformation paths valuable. |
| **Environment** | Prefers **Damp, Temperate-or-Warm, and Bright**. Lit is survivable but distinctly less productive, Dim/Dark suppress premium Leaf potential strongly; Dry/Flooded impair Growth/yield. **Hot is harmful** and not interchangeable with Warm. **Freezing and prolonged Mycelial** are hazardous and lethal. No additional bespoke lethal exposure like Mandrakadabra's 6-hour Mycelial threshold; the costly transformation, strict lighting and narrow peak already provide risks. |
| **Farming purpose** | **Prestige high-output Leaf-only endpoint** requiring either a fast, timing-sensitive Daisyspell route or a slower, more forgiving Lavendream route. Powerful reward for arranging Bright and hitting the narrow harvest window, at the cost of obtaining new Plants through transformations because it cannot reproduce itself. |
| **Effect compatibility** | **Very high response to ordinary Leaf Yield Adjustment while Bright**, with a substantial but lower response when merely Lit; **strong response to Harvest Window widening**, which is valuable given its naturally tiny peak window. Ordinary or slightly higher **Harvest Peak Timing Shift** and Lifecycle Rate response. **Seed Yield, Seed Timing, Time-based Seed Production, Germination for unattainable Seeds, and Produce–Seed Allocation all ineligible to generate Seeds**; full Leaf sterility trade-off is preserved. Time-based Leaf Production applies only if some future fungus emits it and the Plant continues advancing. |

**Specific shape choice:** Its **single natural peak is 145%**, mainly **137–153%**, much narrower than Lavendream's **110–175%** plateau, with a much greater maximum. Precise maximum number belongs to the Flowers family-wide numerical table. Source-route feasibility must ensure Daisyspell can be transformed into Orchidemon without automatically passing this optimum; no fungus's "Transformation Effect" will exist.

### Comparative identity and final Flowers state

| Species | Native Leaf harvest opportunity | Distinguishing trait | Ordinary Seed identity |
| --- | --- | --- | --- |
| Rosewraith | **115% and 180%**, low valley between | **Two innate peaks; one harvest choice** | **Rosewraith (own Seeds)**, modest |
| Orchidemon | **145%**, very narrow | **Exceptionally high single Leaf peak; sterile** | **None** |

- Both **Rosewraith** and **Orchidemon** have two established incoming graph routes. These are not fungal recipes, and neither final Plant receives route-dependent attunement.
- Rosewraith has **two naturally existing peaks**. Fungal Harvest Yield adjustments can multiply *both*; no Secondary Bloom Effect is introduced.
- Orchidemon must remain an **extremely valuable but Seeds-sterile endpoint**. Harvesting at 200% does not yield Seeds and neither an emitted Seed Yield Effect nor allocation generates them from zero.
- All **ten Flowers species** now have **APPROVED first-pass six-part profiles**. The user approved this final pair, including Rosewraith's **two innate peaks** and its **own Seeds**, and Orchidemon's **very high single peak / absolute sterility**. A bold proposed first-pass numerical pass follows in §32. **Do not implement code** yet; eventual playtesting with testers will guide adjustments.


## 32. Flowers — full-family numerical pass (APPROVED first-pass balance)

**Latest recipe status (§73, 26 October 2026):** All **12 Flowers Transformation recipes** are **APPROVED first pass**, including Daisyspell's timed Dim-preparation → Bright completion route into Orchidemon. Earlier §13 A/B/C/D Fungus labels and recipe sketches are historical placeholders, superseded by §73. The Plants' bloom windows and cultivation Effect compatibilities below are **not** Transformation eligibility gates.


**Status:** The user **approved all ten Flowers six-part profiles** (§29–31), including Rosewraith and Orchidemon, and asked for the **full numerical pass**. The user **approved the complete numeric pass** below as the accepted **first-pass Flowers balance** (subject to eventual playtesting), with the same game-wide benchmark as approved Woodlands/Aquatic (approximately 10 Leaves, 10 Seeds, 4 in-game days to 100%, 8 in-game days total to 200%). The game will have an actual playtest pass with testers after implementation; **err toward dramatic differentiation now** and revise findings afterward. Do not name fungi, assign their Effect packages, implement code, or invent Transformation Effects.

### A. Flowers lifecycle and harvest table

**Interpretation:** Natural stage timings represent a species planted from **0%** in its optimal ordinary environment, **before fungal Effects**, including new species created by Transformation. **Transformations restart at 0%** (§58), so the transformed Plant has its own full lifecycle rather than the predecessor's remaining percentage. **Days to 200% include the Growth stage**. Plants can have **harvestable Leaves below 100%**; harvesting in Growth is supported by the existing "harvest when something is available" rule, and necessary for approved **Charmomile's 90% and Daisyspell's 75% Leaf peaks**. A Plant is still harvested **only once**, at which point **all Leaves and all Seeds available at that exact progress are collected**. The maxima in different table columns are **alternative peak timings, not a promise of simultaneously obtaining both maxima**; at intermediate times both products may be present.

| Plant | Days 0–100% | Total days 0–200% | Natural Leaf peak (progress) | Seeds at 200% | Harvested Seed species |
| --- | ---: | ---: | --- | ---: | --- |
| **Daisydaze (Base)** | **4.0** | **8.0** | **10 at 100%**, broad ordinary single bloom | **10** | Daisydaze (own) |
| **Charmomile** | **3.25** | **7.0** | **14 at 90%**, forgiving early bloom | **8** | Charmomile (own) |
| **Daisyspell** | **2.5** | **5.0** | **24 at 75%**, exceptionally narrow | **4** | Charmomile |
| **Marigloom** | **6.0** | **16.0** | **38 at 170%**, narrow 160–177% | **5** | Marigloom (own) |
| **Lavendream** | **5.5** | **11.0** | **13 across ~110–175%** broad plateau | **9** | Lavendream (own) |
| **Lavendread** | **4.0** | **10.5** | **4 at 115%**, poor Leaves | **24** | Lavendream |
| **Poppycock** | **3.25** | **7.0** | **5 at 110%**, poor Leaves | **22** | Poppycock (own) |
| **Dream Poppy** | **4.0** | **9.0** | **24 at 180%**, usable 165–190% | **9** | Poppycock |
| **Rosewraith** | **4.75** | **11.0** | **17 at 115% AND 34 at 180%**, genuine low valley at 145–155% | **7** | Rosewraith (own) |
| **Orchidemon** | **4.5** | **9.5** | **55 at 145%**, very narrow 137–153% | **0** | None, completely sterile |

**Strong decisions:**
- **Daisyspell** naturally reaches its **75% peak in 2.5 × 0.75 = 1.875 days = 45 hours after transformation or Seed germination** in preferred habitat; fungal Growth acceleration may reduce this to ~30–40 hours, supporting fast crop-rotation puzzles.
- **Marigloom** naturally reaches 170% in **6 + 0.70 × (16 − 6) = 13 days**. Its late interval **160–177%** lasts about **1.7 days** at its natural Ripening rate, before fungal rate changes; compatible positive-time hourly Production may reward slower Ripening. Its high 38 Leaf peak alone does not automatically mean best sustained Leaves per occupied hex-day.
- **Rosewraith** naturally reaches its first 115% peak in about **5.69 days**, its second 180% peak in **9.75 days**; it produces 17 and 34 Leaves respectively at those distinct progress points. **Only ONE Plant-consuming harvest** is possible, and existing fungal Yield increases may raise both natural peaks. The 145–155% valley remains meaningful.
- **Orchidemon** in **Bright / otherwise optimal conditions** naturally peaks at **55 Leaves near 145%**, versus Daisydaze's 10. It is **absolutely sterile**; fungal Effects never create its Seeds.
- **Poppycock Seed curve anchor:** In suitable habitat it already has approximately **13 Poppycock Seeds available at 175%**, increasing to **22 at 200%**. This enables an earlier Seed turnaround at lower yield. Intermediate Seed amounts on other Plants follow their single eventual harvest curves, not a new harvest type.
- **Natural broad-window interpretation:** Lavendream's output stays near its **13-Leaf maximum throughout ~110–175%**, whereas Rosewraith has two *separate maxima with a low valley*. Neither Lavendream nor other single-bloom species acquires a second bloom from fungi.

### B. Germination Seed costs and actual chance

The user-approved additive species formula from Woodlands and Aquatic applies: **germination chance = min(100%, number of Seeds planted × chance per Seed)**, all committed Seeds consumed on the attempt whether successful or not. **Seed species determines germination**, not the Plant producing those Seeds. A dash is **no Seed source in the currently established network**, not a secret ungerminating Seed mechanic.

| Species being planted | Chance from 1 Seed | Seeds for guaranteed germination | Sources of Seeds |
| --- | ---: | ---: | --- |
| Daisydaze | **28%** | **4** | Daisydaze; initial Base Seed access |
| Charmomile | **26%** | **4** | Charmomile and Daisyspell |
| Daisyspell | — | — | None; via Charmomile Transformation |
| Marigloom | **15%** | **7** | Marigloom |
| Lavendream | **22%** | **5** | Lavendream and Lavendread |
| Lavendread | — | — | None; via Lavendream Transformation |
| Poppycock | **35%** | **3** | Poppycock and Dream Poppy |
| Dream Poppy | — | — | None; via Lavendread/Poppycock Transformation |
| Rosewraith | **18%** | **6** | Rosewraith |
| Orchidemon | — | — | None; via Daisyspell/Lavendream Transformation |

**Economics:** Lavendread's **24 Lavendream Seeds** provide the slow, forgiving Leaf crop; Poppycock's **22 Seeds** with **35% germination/Seed** efficiently sustain its own crop and Dream Poppy transformations. Rosewraith's own Seeds make ongoing premium farming possible at considerable germination cost. The high Leaf yields of Orchidemon and Daisyspell still require repeated transformations since those species yield no self-Seeds.

### C. Core fungal Effect compatibility

**Definition preserved:** Each number multiplies **the size of a fungus's signed modification**, *not* the Plant's entire production. Future fungi independently determine whether they emit these Effects at all and their emitted magnitude. **1.0× ordinary**, **2.0× twice the effect's magnitude**, **0× no eligible effect**, **N/A** no Seed access for planting. Conditional strength changes must never reverse an emitter's Effect direction. Environmental Sources change Moisture/Illumination/Temperature universally and are **not** scaled by these Plant compatibility values.

| Plant | Growth Rate | Ripening Rate | Leaf Yield | Seed Yield | Germination Adjustment |
| --- | ---: | ---: | ---: | ---: | ---: |
| **Daisydaze** | 1.0× | 1.0× | 1.0× | 1.0× | 1.0× |
| **Charmomile** | **1.3×** | 1.0× | 1.1× | 1.0× | 1.0× |
| **Daisyspell** | **1.9×** | 1.2× | **1.2× / 2.4× while Bright** | 0.8× | N/A |
| **Marigloom** | 0.8× | **1.0× acceleration / 2.0× slowdown while Dim** | **1.8×** | 0.7× | 0.8× |
| **Lavendream** | 0.9× | 1.0× | 1.0× | 1.0× | 1.0× |
| **Lavendread** | 1.0× | **1.3×** | 0.45× | **2.5×** | N/A |
| **Poppycock** | 1.3× | 1.1× | 0.7× | **1.8× / 2.6× while Bright** | **1.5×** |
| **Dream Poppy** | 1.0× | 1.0× | **1.2× / 1.7× while Dim** | 1.0× | N/A |
| **Rosewraith** | 1.0× | **1.0× acceleration / 1.5× slowdown** | **1.7×** | 1.0× | 1.0× |
| **Orchidemon** | 1.1× | 1.1× | **0.8× Dark/Dim, 1.7× Lit, 3.0× Bright** | **0×** | N/A |

**Examples, not fungus assignments:**
- A hypothetical **+20% Leaf Yield** fungus gives **+60% Yield** to **Bright Orchidemon** via **3.0× compatibility**. Its 55-Leaf optimal peak would then yield approximately **88 Leaves**, before rounding and any other conditional modifiers.
- A hypothetical **+20% Seed Yield** fungus applied to **Bright Poppycock** has **2.6× compatibility**, yielding +52% on its 22 Poppycock Seeds, or **33.44 before rounding**. Flower Seed yields will need explicit rounding rules at implementation.
- **Marigloom** is more sensitive to a fungus that **slows** Ripening while Dim (2.0×) but its response to **acceleration** remains 1.0×. A fungus providing slowdown still only slows; direction doesn't reverse.
- **Rosewraith's 1.7× Leaf Yield response** affects both innate Leaf peaks, each at its own height, without fabricating another bloom.
- **Sterile Orchidemon's positive Seed Yield response remains 0**, as do its Seed-based production/allocation opportunities. Lack of a Seed source is not overcome by a Germination Adjustment Effect.

### D. Advanced harvest-shaping and Seed Effect compatibility

| Plant | Harvest Window width | Leaf Peak Timing Shift | Seed Timing Shift | Time-based Production | Leaf–Seed Allocation |
| --- | ---: | ---: | ---: | ---: | ---: |
| Daisydaze | 1.0× | 1.0× | 1.0× | 1.0× Leaves / 1.0× Seeds | 1.0× |
| Charmomile | **1.7×** | **1.8×** | 1.1× | 1.0× Leaves / 1.0× Seeds | 1.0× |
| Daisyspell | **2.2×** | 1.6× | 0.8× | 0.7× Leaves / 0.5× Seeds | 0.8× |
| Marigloom | 0.8× | **1.6×** | 1.0× | **1.5× Leaves normally / 3.0× Leaves while Dim within 160–177%**; 0.6× Seeds | 1.0× |
| Lavendream | **0.3×** | 1.4× | 1.0× | **1.4× Leaves** / 1.0× Seeds | 1.0× |
| Lavendread | 0.6× | 0.8× | **1.8×** | 0.4× Leaves / **2.4× Seeds** | 1.6× |
| Poppycock | 0.8× | 1.0× | **1.6× / 2.0× while Bright** | 0.6× Leaves / **1.8× Seeds** | 1.6× |
| Dream Poppy | **1.8×** | **1.8×** | 1.1× | 1.0× Leaves / 0.8× Seeds | 1.0× |
| Rosewraith | **1.8×** | **1.7×** | 1.0× | **1.4× Leaves normally / 2.2× Leaves while Dim within 170–190%**; 0.8× Seeds | 1.0× |
| Orchidemon | **2.3×** | 1.3× | **0×** | 1.3× Leaves / **0× Seeds** | **0×** |

**Precise interpretation and guardrails:**
- An advanced Effect exists only when a **future named fungus actually emits it**. These are **Plant compatibility numbers**, not additional Plant-native powers or preselected fungus recipes.
- Leaf timing/window Effects operate on **preexisting natural bloom curves**. Rosewraith has two peaks: ordinary Yield Effects affect both; timing/window Effects reshape the two while retaining the identity of two opportunities and a meaningful **low valley**. Do not introduce the discarded Secondary Bloom Effect.
- **Marigloom's 3.0× late hourly compatibility** applies to a fungus's *own declared Time-based Leaf Production window* **only while** its emitted active window overlaps **Marigloom's 160–177%** natural late bloom and the hex is Dim. Outside that range the ordinary **1.5× Leaves** applies. **Rosewraith** similarly has 2.2× within 170–190% while Dim, otherwise 1.4×.
- Time-based Production accrues **only during actual positive lifecycle advancement** in the fungus's eligibility interval, never while fully paused or after 200%. Slow-but-nonzero progress can increase accumulated hourly Leaves/Seeds; check for runaway low-positive-speed stacking in eventual playtests.
- **Harvest Window Adjustment** changes curve breadth, **Harvest Timing Shift** moves the existing peak(s), **Seed Timing Shift** moves existing Seed availability; none directly adds an extra harvest.
- **Leaf–Seed Allocation** scales a fungus's declared redistribution while output eligibility and Seed identity remain intrinsic. Orchidemon has no Seeds and cannot convert Leaves into its own nonexistent Seed output or vice versa.
- **Daisyspell's 75% peak is in the Growth phase**, so a Ripening slowdown that starts at 100% does **not** make the earlier 75% harvest easier. Growth Rate changes and Harvest Window/Timing shifts do, and the final Daisyspell transformation recipe must allow access early enough to be useful.

### E. First-pass environmental output multipliers and lethal exposure time

Flowers have **no shared innate special tolerance or preference for Mycelial**. Every species can die from persistent Mycelial, Dry, or temperature extremes. These numbers deliberately specify *ordinary environment responses* separately from fungus Effect compatibility. They apply to the **resolved Environmental Conditions**, not raw Source emission strengths.

**Baseline setting** is the individual species' approved preferred combination of Damp + ideal Temperature/Illumination. **Dry or Flooded factors** below multiply **both normal Growth/Ripening rates and ordinary harvest outputs** unless otherwise specified. No Flower gets an unexplained bonus from Mycelial or temperature extremes. The environmental penalty multipliers are not new fungus Effects.

| Plant | Dry factor: rate/yield | Flooded factor: rate/yield | Continuous Dry death | Continuous Mycelial death | Continuous Hot/Freezing death |
| --- | --- | --- | ---: | ---: | ---: |
| Daisydaze | **0.55× / 0.55×** | 0.80× / 0.80× | 72 h | 48 h | 72 h |
| Charmomile | 0.50× / 0.55× | 0.80× / 0.75× | 72 h | 48 h | 72 h |
| Daisyspell | **0.45× / 0.45×** | 0.70× / 0.70× | **48 h** | **24 h** | **48 h** |
| Marigloom | 0.60× / 0.60× | 0.75× / 0.75× | **96 h** | **72 h** | 72 h |
| Lavendream | **0.65× / 0.65×** | 0.80× / 0.85× | **96 h** | **72 h** | **96 h** |
| Lavendread | 0.50× / 0.50× | 0.70× / 0.70× | 72 h | 48 h | 72 h |
| Poppycock | 0.55× / 0.50× | 0.75× / 0.75× | 72 h | 48 h | 72 h |
| Dream Poppy | 0.50× / 0.55× | 0.70× / 0.75× | 72 h | 48 h | 72 h |
| Rosewraith | 0.55× / 0.55× | 0.75× / 0.70× | 72 h | 48 h | 72 h |
| Orchidemon | **0.45× / 0.45×** | **0.65× / 0.65×** | **48 h** | **36 h** | **48 h** |

**Additional exact basic hazard rules proposed:** Mycelial exposure applies **0.5× normal lifecycle rate and 0.5× ordinary harvest yield** until removal/death. Hot and Freezing each apply **0.5× lifecycle rate and 0.5× ordinary output** until removed/death, with the species' continuous thresholds above. **Entering a different environmental Condition resets the corresponding hazard's continuous timer**; removing a Mycelial-emitting fungus doesn't reset exposure until the overlay on the Plant's own hex retreats. Damage timers continue as real in-game elapsed time even when progress is stalled; time-based fungal production does not accrue during full stall. Any concurrent independent hazards should be composable but never benefit the Plant.

**Illumination output responses** (important Flowers identity; factors apply to ordinary Leaf Yield, *separately* from emitted fungal Leaf Yield compatibility):

| Plant | Preferred light = 1.0× | Lit | Bright | Dim | Dark |
| --- | --- | ---: | ---: | ---: | ---: |
| Daisydaze | Lit | 1.0× | 0.90× | 0.90× | 0.70× |
| Charmomile | Lit | 1.0× | 0.90× | 0.75× | 0.55× |
| Daisyspell | Bright | 0.85× | **1.0×** | 0.55× | 0.35× |
| Marigloom | Dim | 0.80× | 0.60× | **1.0×** | 0.75× |
| Lavendream | Dim / Lit | 1.0× | 0.85× | 1.0× | 0.70× |
| Lavendread | Dim / Dark | 0.85× | 0.65× | 1.0× | **1.0×** |
| Poppycock | Lit / Bright | 1.0× | 1.0× | 0.80× | 0.55× |
| Dream Poppy | Dim | 0.85× | 0.65× | 1.0× | 0.75× |
| Rosewraith | Dim | 0.85× | 0.70× | 1.0× | 0.75× |
| Orchidemon | **Bright** | **0.70×** | **1.0×** | **0.35×** | **0.20×** |

**Temperature response:** For the moderate nonideal condition (**Cold/Warm**, not Hot/Freezing), start with **0.85× rates and ordinary outputs** when it is *outside* that species' specifically named preferred Temperature state(s). Preferred states are the approved profiles (§29–31): e.g., Charmomile Temperate/Warm; Marigloom Cold/Temperate; Daisyspell Temperate/Warm; Rosewraith Cold/Temperate; Orchidemon Temperate/Warm. The **Hot/Freezing hazard 0.5× and species-specific death hours** replace this moderate-condition penalty, rather than being counted a second time. All preferred states remain usable and nonlethal.

**No premature system additions:** These are **responses to existing Environment Conditions**. No Fertility/Material/Enchanted dependency is invented. No Mycelial species benefit is possible. The named fungi roster and final transformation conditions will be determined only after the Plant-first passes, with their ordinary Effects fixed and no Transformation Effect.

### F. Feasibility checks and playtest targets

- **Pre-100% harvesting is important:** Charmomile's 90% peak and Daisyspell's 75% peak must be harvestable while still technically in Growth. This is already consistent with "harvest when something is available", but any later UI/implementation gating harvest at 100% would contradict the approved Flower Plant roles.
- **Charmomile → Daisyspell** creates Daisyspell at **0%**, so its own 75% peak remains reachable after the transformation. **Daisyspell → Orchidemon** likewise creates a new Orchidemon with its full 0–145% opportunity ahead. Both routes remain Plant-owned recipes, fungi unspecified; test the necessary environment and exposure setup without assuming progress carries over (§58).
- **Marigloom → Rosewraith** and **Dream Poppy → Rosewraith** both create a new Rosewraith at **0%** (§58), with its complete lifecycle available. The important feasibility question is sustaining the required habitat and enough time for the new Plant to reach its valuable **180%** second peak—not how much percentage remained on the precursor.
- **Lavendream → Orchidemon** should provide a slower but robust alternative to the faster Daisyspell route. Orchidemon's 55 Leaf peak and high Bright compatibility justify repeated transformation costs, rather than inventing direct Orchidemon Seeds.
- **Rosewraith is a two-peak Plant, not a two-harvest Plant.** Single harvest collects what is available *at that time*, including Seeds if the curve already provides them. "Harvest Leaves vs Harvest Seeds" is a strategic timing choice, not an item-type lockout.
- **Sustained Leaves per occupied hex-day** (including Seed production, failed germination, failed transformations, fungal occupancy, and narrow-window harvest failures) matter more than raw 55 vs 38 vs 34. In particular, **Daisyspell's fast 24-Leaf 75% peak** may beat Orchidemon's higher one-time yield for throughput if the transformation chain is easy; keep both distinct by acquisition/precision/setup.
- **Don't cap or tame the interesting extremes yet.** Tester playtests after implementation are the planned place to adjust overly strong production or overpunishing windows. Round fractional Seeds/Leaves consistently once implementation is being designed; no rounding rule is quietly asserted here.
- **Status:** All ten Flowers profiles and the full §32 numerical pass are **APPROVED as initial balancing values** (including per-Seed germination, all Effect compatibility matrices, Leaf/Seed output, timing and continuous hazard thresholds). Values may change after eventual tester playtests. No code, fungi, or transformation recipes were changed.


## 33. Desert — first Plant-profile batch, Hot exposure/recovery line (APPROVED first-pass profiles)

**Current recipe authority (§74, APPROVED on 26 October 2026):** All **13 Desert Plant-owned Transformation recipes** are now approved first pass, with the exact named Fungus alternatives, resolved environmental conditions and exposure durations in §74. The older Ember/Rime/Shelter/Mirage terms and bracketed arrows below are illustrative historical sketches, **not final recipe assignments**. Earlier text saying these recipes are still unassigned is superseded by §74. All legacy Sand/Material references are superseded by §61.


**Status:** The user **approved all §32 Flowers numerical first-pass values** and asked to begin **Desert**. Desert's existing network and intent in §14 are accepted. The user **approved the complete first batch of six-part Plant profiles** covering **Jadeheart, Ember Aloe, Aloemancer, and Ashen Rose**, including its proposed **36-hour uninterrupted Heat endurance** threshold and innate +30% Hot Growth / +50% Hot Leaf bonus; the next batches will cover Sandrose and the Moonjade and Cactopus branches. As in Woodlands, Aquatic and Flowers, start by defining the Plants, then propose a complete Desert numerical pass; fungi and final Plant-owned transformation recipes follow only later. Prefer bold differentiation now and gameplay-tested balancing after eventual implementation.

### Established network excerpt

~~~text
Jadeheart (Base) ──┬──> Ember Aloe ──┬──> Aloemancer ───> Mirage Rose
                   │                └──> Ashen Rose ───> Sandrose ───> Cactopus
                   ├──> Moonjade ──────────────────────> [Freezing branch]
                   └──> Cactopus ──────────────────────> [Hot branch]
~~~

**Established puzzle:** Ember Aloe **endures sufficient Hot stress and is then recovered** to become Aloemancer; a **recovery attempt made too early** instead produces Ashen Rose. **Cooling Ember Aloe by itself does not automatically produce Ashen Rose**. The qualifying recovery Source/fungus conditions are deferred to the Plant-owned Transformation recipe pass; no fungus emits a generic Transformation Effect. The 36-hour exposure criterion below is proposed as an intrinsic Plant-specific qualification **now**, not a named fungus assignment.

### Jadeheart — APPROVED first-pass six-part profile

**Core identity:** Straightforward, reliable Desert Base Plant; gateway to Hot Ember Aloe, Freezing Moonjade, and the accessible Cactopus route. **Do not burden the Base with a novel stress puzzle.**

| Category | Concrete first-pass definition |
| --- | --- |
| **Natural lifecycle** | **Ordinary 4-day Growth and 4-day Ripening** (8 total), matching the 10-unit game-wide reference. No Dormancy in its preferred habitat. |
| **Natural harvest** | **10 Leaves around 100%** and **10 Jadeheart Seeds at 200%**, with a forgiving ordinary early/middle harvest curve and no second peak. Own Seeds. |
| **Germination** | **Reliable, ordinary** additive per-Seed germination; Jadeheart Seeds are available at the start as the Desert Base. Exact one-Seed chance will be assigned alongside other Desert Seeds in the family numerical pass. |
| **Environment** | Prefers **Damp, Temperate or Warm, and Lit**; **Dry** is survivable with reduced Growth and output (not an instant death), **Flooded** significantly suppresses both. **Hot and Freezing** are genuine hazards to Jadeheart, never bonuses; prolonged Mycelial is hazardous/lethal. Material **Sand can be usable** but gives no special mandatory benefit because the Material system is still under review. |
| **Farming purpose** | **Dependable baseline and starter Seed loop** for experimenting with Desert temperature routes. It is not itself a Heat or Frost specialist. |
| **Effect compatibility** | Baseline **1.0×** magnitude for normal fungal Growth, Ripening, Leaf/Seed Yield, timing/window, germination, time-based production and Leaf–Seed allocation Effects. All environmental Source contributions remain global, not Plant-scaled. |

### Ember Aloe — APPROVED first-pass six-part profile

**Core identity:** A real **Hot-loving productive Plant**, with a high-stakes future **endure-Heat-then-recover** option. It is useful in its own right, even if the farmer decides not to transform it.

| Category | Concrete first-pass definition |
| --- | --- |
| **Natural lifecycle** | **Average-to-slightly-fast Growth** and ordinary Ripening when thriving in Hot conditions. As a first-pass innate rule, **Hot increases its natural Growth rate by +30%**; Warm Growth remains functional and ordinary. No Dormancy in Hot. |
| **Natural harvest** | One **good mid-Ripening Leaf peak**, **innately +50% natural Leaf Yield while Hot** (relative to its own unboosted Warm baseline), plus **moderate-to-good Ember Aloe Seeds** near 200%. **Own Seeds** are the reproductive reward for unlocking the branch, unlike the sterile prestige endpoints later in Desert. |
| **Germination** | Ember Aloe Seeds have **moderate-to-good germination** in viable Warm or Hot surroundings. The initial Ember Aloe comes from Jadeheart Transformation. Seeds planted directly grow Ember Aloe without automatically having passed a Heat-endurance test. |
| **Environment** | Best in **Hot, Lit/Bright, and Dry/Damp**; Warm is workable but loses its Hot-specific growth and Leaf bonuses. **Freezing** harms it and eventually kills; **Flooded** sharply impairs Growth/harvest. Temperate/Cold are less productive. Mycelial remains hazardous and eventually lethal, with no Mycelial bonus. **Hot itself must not kill Ember Aloe merely for remaining Hot.** |
| **Farming purpose** | **Repeatable Heat-adapted Leaf/Seed farming** and precursor for the Aloemancer successful-recovery route or the Ashen Rose failed-recovery route. Staying Hot can remain worthwhile for immediate crops, while recovery sacrifices that ecology for a different Plant. |
| **Effect compatibility** | **Strong Leaf Yield Adjustment response while Hot**, good **Growth acceleration compatibility while Hot**, otherwise ordinary Ripening and Seed Yield response. Rate effects preserve direction: a fungal Growth slowdown still slows. Hot's innate +30% Growth/+50% Leaf are **Plant Responses to resolved temperature**, not special fungal emissions. |

**Concrete initial trait:** Hot adds **+30% natural Growth rate and +50% natural Leaf Yield** (conditional and reversible if the temperature changes). Their exact combination with future fungal bonuses can be tested in the eventual numeric/system pass. Hot endurance needed for its recovery is a different **continuous-exposure rule**, defined next.

### Aloemancer — APPROVED first-pass six-part profile

**Core identity:** **Successful recovery after sufficient Heat endurance** produces a desirable Leaf crop that is **better in recovered conditions than under continuing Hot**. It also helps sustain the Ember Aloe line, and can transform onward into Mirage Rose.

| Category | Concrete first-pass definition |
| --- | --- |
| **Natural lifecycle** | **Ordinary-to-slightly-slow Growth and moderately long Ripening**; valuable rather than a rapid-turnover crop. Transformations, including recovery from Ember Aloe, create a new Plant at 0% progress (§58). No extra lifecycle stage. |
| **Natural harvest** | One **high mid-to-late Ripening Leaf peak**, and **moderate-to-good Ember Aloe Seeds at 200%**—**not Aloemancer Seeds**. This makes Aloemancer worthwhile to harvest for both purposes at different timings while preserving a reason to repeat the Heat-to-recovery puzzle. No inherent hourly production or second bloom. |
| **Germination** | **No Aloemancer Seeds** produced in the established line; reach it through Ember Aloe's qualifying recovery route. Its output of **Ember Aloe Seeds** uses Ember Aloe's germination numbers. |
| **Environment** | Prefers **Warm or Temperate, Damp, and Lit/Dim** after recovery. **Hot no longer gives a reward**: while Hot, Aloemancer's Growth and Leaf output are substantially reduced, and prolonged renewed Hot becomes **lethal**. Dry is survivable at reduced output; Flooded unfavorable. Freezing and Mycelial hazardous/lethal. The Plant has no stored Heat bonus once it transforms. |
| **Farming purpose** | Reward for **correctly timing recovery**, combining strong Leaves with a meaningful **Ember Aloe Seed supply** and onward access to Mirage Rose. Does not replace the ecological niche of thriving-in-Hot Ember Aloe. |
| **Effect compatibility** | **Strong Leaf Yield Adjustment under Warm/Temperate** and **strong Seed Yield Adjustment** on its Ember Aloe Seed output. Ordinary Growth/Ripening effects; some extra response to Harvest Window widening is useful but not a new Effect. Environmental influences retain fixed direction. |

**Seed identity decision:** Produces **Ember Aloe Seeds** and **no Aloemancer Seeds**. That makes the recovered crop a powerful way to finance future attempts at the rewarding Heat exposure puzzle, rather than skipping that puzzle forever through a self-reproducing Aloemancer line.

### Ashen Rose — APPROVED first-pass six-part profile

**Core identity:** An **undesirable premature recovery outcome**, with weak direct harvest but a viable **Ashen Rose → Sandrose → Cactopus redemption path**. Importantly, **normal cooling without a qualifying recovery attempt does NOT cause Ashen Rose**.

| Category | Concrete first-pass definition |
| --- | --- |
| **Natural lifecycle** | **Slow Growth and slow Ripening**, with a new 0%-progress Ashen Rose created from Ember Aloe after a failed attempt (§58). Its direct harvest throughput is intentionally unattractive. |
| **Natural harvest** | **Very low Leaves** with a weak single mid-Ripening peak and a **few Jadeheart Seeds at 200%**. **No Ashen Rose Seeds**. Its small Seed salvage is materially worse than keeping Ember Aloe or successfully producing Aloemancer. |
| **Germination** | No obtainable Ashen Rose Seeds; arises only from the failed Ember Aloe recovery. Any **Jadeheart Seeds** it yields use Jadeheart's one-Seed germination rate. |
| **Environment** | **Damp/Dry, Temperate/Warm, and Dim/Lit** are workable. **Hot becomes harmful**, rather than benefiting it as it benefited Ember Aloe; Freezing hazardous, Flooded unfavorable, Mycelial lethal after prolonged exposure. No exceptional heat or Mycelial tolerance. |
| **Farming purpose** | **Recoverable strategic mistake** and small emergency base Seed salvage; the far more attractive option is the established transformation into useful **Sandrose**, which in turn can regain access to Cactopus. Not a dead end or a secret high-Leaf specialist. |
| **Effect compatibility** | **Low Leaf and Seed Yield Adjustment compatibility**; ordinary-to-slightly-reduced lifecycle-rate and germination-related responses. Time-based production remains weak. Standard Effects cannot make it produce Ashen Rose Seeds from its nonexistent own-Seed line. |

### Specific Ember Aloe Heat endurance rule — PROPOSED now, not deferred

To avoid defining a special exposure-based Plant but leaving its defining weakness/qualification vague, make the following **concrete Plant-owned preliminary state rule** now:

1. **Ember Aloe qualifies for successful recovery after 36 uninterrupted in-game hours while Hot.** It continues growing and remains productive in Hot; this is **not** a fatal Heat threshold.
2. **An eligible recovery attempt before accumulating 36 uninterrupted Hot hours produces Ashen Rose** (the undesirable branch). Merely becoming Warm/Temperate, or losing Hot without a qualifying recovery attempt, **does not** itself produce Ashen Rose.
3. **An eligible recovery attempt after at least 36 uninterrupted Hot hours produces Aloemancer**, if the eventual additional Plant recipe conditions are met. Do not name the fungus or invent a Transformation Effect yet.
4. If Hot is broken before a recovery attempt, the ordinary continuous-exposure clock **resets**; no indefinitely stored Heat-endurance bank. The later recipe pass must specify the exact order of detecting an attempt and the transition out of Hot, so both success and premature failure are actually achievable and unambiguous.
5. **Ember Aloe Seeds directly planted** create ordinary Ember Aloe at zero Heat exposure, not an already qualified recovery Plant. **Aloemancer** is the recovered identity, not an attuned or permanently enhanced Ember Aloe.

**One important caution for later recipe design:** If a recipe simply asks whether an Ember Aloe is Warm now, it would turn innocent cooling into a failure; the premature Ashen Rose outcome specifically requires **a qualifying recovery attempt**, not cooling by itself. The Phase 3 recipe must ensure that early and successful attempts can share a recognizable, deliberate trigger, with Heat exposure deciding their destination. No final source/fungus assignment is made here.

### This batch's relationship, and next work

| Plant | Strategic identity | Seed output |
| --- | --- | --- |
| Jadeheart | Ordinary Desert Base and access point | Jadeheart (own) |
| Ember Aloe | **Hot-growing/hot-yielding** self-sustaining crop; endure Heat to recover | Ember Aloe (own) |
| Aloemancer | Successful recovery: high Leaves and Ember Aloe supply | Ember Aloe |
| Ashen Rose | Premature attempted recovery: poor harvest, route to Sandrose | Jadeheart |

The **36-hour Heat endurance**, **Ember Aloe innate +30% Hot Growth/+50% Hot Leaves**, and **Aloemancer/Ashen Rose Seed identities** are deliberate first-pass proposals now, **not left open** merely because full numeric balance will follow. Their exact full harvest yields, germination rates, rate/production compatibility multipliers, and other continuous hazard thresholds will be proposed in the complete Desert numerical pass. Do not assign fungus identities, final Transformation recipes, or code.

**Approval status:** The user **APPROVED** all four profiles and their concrete first-pass trait/exposure decisions. The next batch (§34) covers **Moonjade, Jadewisp, Pearadox and Sandrose**. Later complete the Cactopus/rare-endpoint route and the whole-family numeric pass.


## 34. Desert — second Plant-profile batch, Freezing and redemption lines (APPROVED first-pass profiles)

**Current recipe authority (§74, APPROVED on 26 October 2026):** All **13 Desert Plant-owned Transformation recipes** are now approved first pass, with the exact named Fungus alternatives, resolved environmental conditions and exposure durations in §74. The older Ember/Rime/Shelter/Mirage terms and bracketed arrows below are illustrative historical sketches, **not final recipe assignments**. Earlier text saying these recipes are still unassigned is superseded by §74. All legacy Sand/Material references are superseded by §61.


**Status:** The user **approved** all §33 Heat/recovery profiles (including Ember Aloe's 36-hour Hot endurance requirement, the mistaken Ashen Rose recovery outcome, and Ember Aloe/Aloemancer Seed identities). The user **APPROVED all four six-part profiles for Moonjade, Jadewisp, Pearadox, and Sandrose**, including the proposed 48-hour Moonjade Freezing threshold, Pearadox dual-temperature bonuses, and Sandrose's indefinite Dry tolerance. Preserve all agreed Desert routes and the global Plant-first workflow. Define **intrinsic Plant traits and exposure logic** concretely now, but **do not assign named fungi, Effect packages, or complete Transformation recipes**. Leaf/Seed quantities, baseline stage durations and full germination/compatibility tables come with the whole-family numerical pass. No game code changes.

### Relevant parts of the agreed transformation network

~~~text
Jadeheart ──> Moonjade ──────┬──> Jadewisp ──> Mirage Rose
                             └──> Pearadox <── Cactopus <── Jadeheart
                                                        ↑
Ashen Rose ──> Sandrose ─────────────────────────────────┘
~~~

**Moonjade → Jadewisp** is the **sustained Freezing then thaw/recovery** route. **Moonjade → Pearadox** is an alternative recovery pathway; **Cactopus → Pearadox** is the separate Hot-branch origin. A Pearadox from either route is **exactly the same Plant** with the same traits, no source-dependent attunement. **Ashen Rose → Sandrose → Cactopus** remains the intentionally recoverable bad Heat-recovery path. The arrows denote species links, **not final fungal recipes**.

### Moonjade — APPROVED first-pass six-part Plant profile

**Core identity:** The Desert survivor that can withstand **Freezing by going completely Dormant**, patiently building uninterrupted Cold exposure for an eventual, deliberately arranged thaw into Jadewisp. Freezing does **not** advance Moonjade's lifecycle or give it bonus output.

| Category | Concrete first-pass definition |
| --- | --- |
| **Natural lifecycle** | **Somewhat slow ordinary Growth and Ripening** while Temperate or Cold. **Freezing immediately places Moonjade into Dormancy**, halting Growth and Ripening at the current percentage **without resetting progress**. On leaving Freezing, the same Moonjade can resume normal progression unless a Transformation recipe fires. It remains fully Dormant throughout uninterrupted Freezing; no 'partial' growth. |
| **Natural harvest** | **Moderate natural Leaves** with a broad middle-Ripening peak and **only a few Moonjade Seeds** near 200%. Harvesting a dormant Moonjade is possible only to collect its *already available progress-based output*; Freezing itself produces no new Leaves or Seeds and neither Time-based Production nor progression can accrue while Dormant. One Plant-consuming harvest. |
| **Germination** | **Moonjade produces some Moonjade Seeds**, permitting a modest direct Seed-grown supply after its initial Jadeheart Transformation. **Jadewisp supplies substantially more Moonjade Seeds**, remaining the economically attractive Seed-specialist route. Seed-grown Moonjade begins at zero Freezing exposure, not prequalified for thawing. |
| **Environment** | Best for active cultivation under **Cold or Temperate, Damp or Dry, and Dim/Lit**; Dry slows ordinary output somewhat but is viable. **Freezing itself does not kill Moonjade** while Dormant, even over very long exposure, but **Hot is dangerous** and can kill it. Flooded unfavorable. **Mycelial remains hazardous/lethal even during Dormancy**; the overlay never grants an advantage. Material Sand is optional/viable, not a mandatory gate. |
| **Farming purpose** | **Freezing survival and timed-thaw specialist**, leading to valuable Jadewisp or the alternate Pearadox route. It is not an efficient Leaf producer while left frozen indefinitely; ordinary Leaf/Seed farming requires unfreezing it. The slower but self-sustainable Moonjade line creates a meaningful reason to cultivate Jadewisp for Seed multiplication. |
| **Effect compatibility** | Ordinary or mildly reduced fungal Growth/Ripening, Leaf Yield and Seed Yield responses while active; **all rate and time-based production effects are suspended while Dormant**, regardless of their ordinary magnitude. Above-average Seed Yield compatibility is *not* granted just by freezing it; actual high Seed-specialist responses belong to Jadewisp. Fungus-driven environment changes that thaw a Plant may restart progression via the ordinary resolved Temperature state. |

**Specific intrinsic Dormancy rule:** Moonjade enters full Dormancy **immediately at Freezing** and remains alive there with **0% lifecycle progress per hour**. It does not accumulate Time-based production, though the **separate Freezing exposure timer still runs**. If it was at 62% progress when frozen, it remains at 62%; after thaw, it resumes from 62% unless a qualifying Plant-owned Transformation occurs. If Mycelial simultaneously covers its hex, that continuous Mycelial death exposure still advances. No immortal protection from every kind of damage is implied.

### Jadewisp — APPROVED first-pass six-part Plant profile

**Core identity:** An **unfrozen, successfully recovered Moonjade** becomes a valuable **Moonjade Seed supplier**, rather than an instantly superior frost-resistant Leaf specialist. This is a reward for completing the Freezing puzzle and gives the player the resources for more attempts.

| Category | Concrete first-pass definition |
| --- | --- |
| **Natural lifecycle** | **Ordinary-to-slightly-fast Growth and longer Ripening**. Once Moonjade becomes Jadewisp, the new Jadewisp **begins at 0%**, with its own normal Growth/Ripening and no inherited Moonjade Dormancy/exposure history (§58). |
| **Natural harvest** | **Modest or good-but-not-premium Leaves** with a single middle-Ripening peak and **very high Moonjade Seed output** late in Ripening. **No Jadewisp Seeds**. The Seed return is intentionally many times Moonjade's own output. |
| **Germination** | **Jadewisp itself has no obtainable Seeds**; it is reached through a qualifying Moonjade thaw/recovery. Its harvested **Moonjade Seeds** germinate according to Moonjade's own per-Seed probability and start fresh, with no inherited exposure. |
| **Environment** | Best in **Cold or Temperate, Damp/ Dry and Dim/Lit**, with a modest advantage to being Cold rather than Warm. **Freezing is now harmful**, not a repeat of Moonjade's indefinite Dormancy: it substantially reduces output and progress and becomes lethal after sustained exposure. Hot likewise harmful/lethal, Flooded inefficient and Mycelial harmful/lethal. No innate freezing production bonus. |
| **Farming purpose** | **Multiplication and replenishment of Moonjade Seeds**, enabling repeated Freezing experiments and eventual access to additional Jadewisps or Pearadox. An attractive strategic result of correct thawing even when the player is not pursuing Mirage Rose. |
| **Effect compatibility** | **Strong Seed Yield, Seed Timing Shift and Time-based Seed Production compatibility** while Cold/Temperate; ordinary Leaf Yield response and decent Ripening acceleration compatibility to reach its large Seed harvest sooner. Standard effects never generate Jadewisp Seeds, as its natural harvested Seed identity is Moonjade. |

**Seed identity decision:** Jadewisp exclusively produces **Moonjade Seeds**, not its own. Like Aloemancer producing Ember Aloe Seeds, this keeps the survival/recovery transformation relevant without making repeated full-chain transformations mandatory for every Moonjade instance.

### Pearadox — APPROVED first-pass six-part Plant profile

**Core identity:** A high-value Plant that can **thrive in two opposing Temperature extremes, but for different harvest purposes**. This is deliberately **not** Moonjade Dormancy. Pearadox keeps growing and Ripening in both Hot and Freezing.

| Category | Concrete first-pass definition |
| --- | --- |
| **Natural lifecycle** | **Ordinary Growth and Ripening under Temperate/Warm/Cold conditions**. **While Hot, lifecycle proceeds at full ordinary rate**. **While Freezing, lifecycle continues at 75% of its normal rate**, rather than stopping; **there is no Dormancy**. These are conditional natural Plant responses, not fungal acceleration/slowdown Effects. |
| **Natural harvest** | A single **strong middle-Ripening Leaf peak** and a **moderate number of Pearadox Seeds** near 200% in normal conditions. **Hot boosts the natural Leaf Yield by +70%** while the current Temperature is Hot; **Freezing boosts natural Seed Yield by +80%** while the current Temperature is Freezing. The effects are separate and conditional: no inherent Leaf bonus while Freezing, no inherent Seed bonus while Hot. **Own Seeds** (one Seed identity) for a sustainable specialist line after unlocking it. |
| **Germination** | **Pearadox produces Pearadox Seeds**, with moderately demanding germination. Directly Seed-grown Pearadox has exactly the same dual-extreme physiology as one from Moonjade or Cactopus, with no route-specific stored memory. |
| **Environment** | **Hot and Freezing are both indefinitely survivable** in the absence of another lethal hazard; they do **not** invoke generic extreme-temperature death for Pearadox. Hot is ideal for Leaves; Freezing ideal for Seeds despite **0.75× normal lifecycle rate**. Temperate/Warm/Cold remain viable but lack the big specialization bonuses. Prefers **Dry or Damp and Lit/Dim**; Flooded greatly lowers progress and output; prolonged Mycelial is still lethal. |
| **Farming purpose** | **Two-mode crop and both-branch endpoint:** a Hot-condition Leaf farmer or a Freezing-condition Seed farmer, with a genuine speed and harvest trade-off. Can be obtained from Moonjade or Cactopus; neither route is intrinsically superior after Transformation. |
| **Effect compatibility** | **Strong Leaf Yield response while Hot**, **very strong Seed Yield response while Freezing**, and good Seed Timing Shift response. Normal positive-speed responses work while Freezing: all Growth/Ripening Effects modify its **continuing positive rate** rather than a Dormant 0× rate. Because the bonus is a resolved state, a player may deliberately change Temperature before a Seed versus Leaf harvest; **no additional historical exposure counter** is invented for Pearadox. |

**Concrete first-pass mode definition:**
- **Hot:** +70% innate natural Leaf Yield, **1.0× natural lifecycle rate**, no native Seed bonus.
- **Freezing:** +80% innate natural Seed Yield, **0.75× natural lifecycle rate**, no native Leaf bonus; **never Dormant**.
- **Other viable Temperature:** no special multiplier. **No new attunement or state persistence** after temperature changes. The bonus belongs to the *current* Temperature at harvest and is applied to the existing harvest curve for that Plant's current progress. Any optimization that involves switching shortly before harvest can be examined in the actual eventual playtest rather than inventing a complex new exposure rule here.

### Sandrose — APPROVED first-pass six-part Plant profile

**Core identity:** The **low-maintenance, drought-tolerant redemption Plant** obtained by rescuing Ashen Rose. It offers an ordinary useful harvest and returns the player to **Cactopus**, rather than turning a bad recovery outcome into a separate elite harvest species.

| Category | Concrete first-pass definition |
| --- | --- |
| **Natural lifecycle** | **Somewhat fast Growth with ordinary Ripening**. Neither the fastest Desert Plant nor unusually slow; easy to return to productive rotations after the Ashen Rose mistake. |
| **Natural harvest** | **Reliable moderate Leaves** in a broad early-to-middle Ripening peak, with **moderate Sandrose Seeds** near 200%. **Own Seeds** are intentionally available: once the redemption form has been reached, the player can keep a drought-tolerant farming line without repeating Ashen Rose. |
| **Germination** | **Ordinary-to-good Sandrose germination**, with Seeds available from Sandrose's own Seed harvest. Initial access is through **Ashen Rose → Sandrose**; no Sandrose starter Seeds. |
| **Environment** | **Both Dry and Damp are fully productive, nonlethal habitats** with **no additional Dry-only yield multiplier**. **Continuous Dry does not kill Sandrose** at all; the point is robust drought tolerance, not stronger harvest from deliberately making it drier. **Warm/Temperate and Lit/Dim** best, **Hot** survivable with reduced rates/yields but no innate Heat bonus; **Freezing** harmful and may eventually kill, **Flooded** substantially reduces normal performance. **Mycelial is harmful and lethal** over sustained exposure. **Sand as permanent Base Material is compatible but neither required nor given a cosmetic bonus**; if Sand later disappears from the environment, Sandrose's game role remains intact. |
| **Farming purpose** | **Recovery reward and easy drought-resistant crop** from the Ashen Rose line, plus a route back into Cactopus. Its own Seeds give a useful ongoing reason to recover it. Lower top-end harvest output than successful Aloemancer or specialist Cactaclysm; stronger value through ease and consistency. |
| **Effect compatibility** | **Ordinary Growth/Ripening and Leaf/Seed Yield compatibility**, with **moderately strong Harvest Window widening** and a little extra Germination response. Fungus-provided environmental Drying can be survivable for Sandrose without the emitter itself changing behavior. No Environmental Tolerance or Mycelial-benefit fungal Effect is added. |

**Concrete drought choice:** Sandrose has **no Dry death threshold**; Dry is as productive as Damp under suitable other Conditions. **It still dies from prolonged Mycelial exposure** and cannot farm productively under completely unsuitable Temperature conditions. Resilience is deliberately habitat-specific, not general immortality.

### Moonjade Freezing / thaw qualification — concrete preliminary Plant-owned rule

Choose an explicit first-pass threshold now so the central Cold recovery puzzle is not left indefinite:

1. Moonjade must experience **48 uninterrupted in-game hours of Freezing** to qualify for the **successful Jadewisp thaw/recovery outcome**. Freezing turns on **Dormancy** the moment that condition resolves, stopping Growth/Ripening and all Time-based production; its exposure clock **keeps advancing**. This exposure is **not a death timer**.
2. After at least 48 hours, **thawing from Freezing to a viable non-Freezing temperature while the eventual specific recovery condition is satisfied** yields **Jadewisp** via the existing Plant-owned route. The recovery trigger may check the condition and the accumulated exposure immediately *before* Freezing ends, then reset it; no banked historical exposure.
3. **Thawing early or without the later qualifying recovery condition does not produce Jadewisp** and does **not** automatically turn Moonjade into an undesirable species. It simply resumes as **Moonjade**, and its uninterrupted Freezing exposure is reset upon leaving Freezing. On refreezing, the count begins from zero.
4. **Moonjade → Pearadox** remains the already agreed **alternative** Moonjade recovery route, using additional qualifying conditions and a separate recipe that will be decided in Phase 3. The Jadewisp route must not automatically preempt the player when those alternate conditions are satisfied; later recipe work must resolve their priority/selection explicitly.
5. **Directly Seed-grown Moonjade starts with 0 hours Freezing exposure**. Jadewisp Seed harvests propagate Moonjade rather than prequalified Jadewisp.

**Why 48h instead of Ember Aloe's 36h:** Freezing is safe for dormant Moonjade but **makes zero progress**, whereas productive Ember Aloe benefits by remaining Hot. Forty-eight hours creates a visible waiting investment with zero Flower-style per-hour benefit, making post-thaw high Moonjade Seed production a real reward. The 48-hour threshold is **approved first-pass balance**, subject to eventual tester playtesting and revision.

### Batch-wide distinctions and next work

| Species | Farming signature | Seed identity |
| --- | --- | --- |
| **Moonjade** | Survive Freezing through **zero-progress Dormancy**; qualify for Jadewisp after 48h and appropriate thaw/recovery | **Moonjade**, few |
| **Jadewisp** | Valuable Seed return **after correct thaw**, no indefinite Freezing survival | **Moonjade**, many |
| **Pearadox** | Keep growing in **Hot +70% Leaves** or **Freezing +80% Seeds at 0.75× rate** | **Pearadox**, own |
| **Sandrose** | **Indefinite Dry survival with normal productivity**, recover Ashen Rose, reopen Cactopus access | **Sandrose**, own |

**Status:** The user **APPROVED the four profiles**, including the **Moonjade 48-hour uninterrupted Freezing qualification**, **Pearadox Hot +70% Leaf / Freezing +80% Seed bonus at 75% rate**, and **Sandrose indefinite Dry tolerance**. The final Desert group (§35) covers **Cactopus, Cactaclysm, and Mirage Rose**, followed by the Desert family-wide numerical pass. No fungi assigned, complete recipes set, or game code changed.


## 35. Desert — third and final Plant-profile batch, Cactopus / Cactaclysm / Mirage Rose (APPROVED first-pass profiles)

**Current recipe authority (§74, APPROVED on 26 October 2026):** All **13 Desert Plant-owned Transformation recipes** are now approved first pass, with the exact named Fungus alternatives, resolved environmental conditions and exposure durations in §74. The older Ember/Rime/Shelter/Mirage terms and bracketed arrows below are illustrative historical sketches, **not final recipe assignments**. Earlier text saying these recipes are still unassigned is superseded by §74. All legacy Sand/Material references are superseded by §61.


**Status:** The user **approved §34's Moonjade, Jadewisp, Pearadox, and Sandrose profiles**, including the precise Moonjade exposure, Pearadox temperature-mode and Sandrose drought traits. This final Desert batch of six-part species profiles for **Cactopus, Cactaclysm, and Mirage Rose** was **approved by the user**, including Cactaclysm's broad Hot harvest and complete sterility, and Mirage Rose's 1:1 Ember Aloe/Moonjade Seed mixture. The existing §14 network and approved §33–34 Plant identities remain intact. **Do not pick specific fungi, define final Transformation recipes, implement code, or turn Transformations into a fungus Effect**. Following the accepted family workflow, full lifecycle/yield/Seed-germination/Effect-compatibility numeric matrices come after all eleven Desert profiles are accepted. Bold first-pass differences are preferable to conservative prebalancing; a later tester playtest pass will tune them.

### Existing routes, not final recipes

~~~text
Jadeheart ───────────────────────────┐
                                     ├──> Cactopus ─┬──> Cactaclysm
Ashen Rose ──> Sandrose ─────────────┘             └──> Pearadox

Ember Aloe ──> Aloemancer ──┐
                             ├──> Mirage Rose
Moonjade ──> Jadewisp ──────┘
~~~

The already accepted alternative **Moonjade → Pearadox** route remains, even though it is outside this diagram's Cactopus focus. Mirage Rose's two sources are **Aloemancer and Jadewisp**, not Ember Aloe and Moonjade directly. The latter two are the **Seed species that Mirage Rose produces**. A given Mirage Rose instance has **no persistent origin-based attunement or extra trait**; both routes produce the same species.

### Cactopus — APPROVED first-pass six-part Plant profile

**Core identity:** The **accessible, reliable, naturally Hot-and-Dry farm crop**. It must be meaningfully useful even if players never proceed to sterile Cactaclysm or temperature-switching Pearadox. Its two incoming routes are **Jadeheart → Cactopus** and the **Sandrose → Cactopus** redemption path.

| Category | Concrete first-pass definition |
| --- | --- |
| **Natural lifecycle** | **Somewhat fast Growth** and **ordinary-to-slightly-fast Ripening** in **Hot or Warm**. Unlike Ember Aloe, its temperature advantage is primarily that it **continues at full normal speed in Hot** rather than receiving a large additional Hot Growth accelerator; no Dormancy and no extreme-exposure counter. |
| **Natural harvest** | **Good but not premium natural Leaves** with a **broad productive plateau around 115–160%**, and **respectable Cactopus Seeds** near 200%. The generous window gives a reliable repeatable harvest, contrasting with the high peak of Cactaclysm. **Own Seed species**; one Plant-consuming harvest at any chosen productive progress, taking whatever Leaves and Seeds coexist. |
| **Germination** | Cactopus produces **Cactopus Seeds** with **good/reliable germination**; the very first Cactopus must come through one of its two incoming Transformations, but afterward direct Seed-grown planting supports ordinary rotations. |
| **Environment** | Prefers **Dry or Damp, Hot/Warm, and Lit/Bright**. **Hot and Dry are indefinitely survivable and fully productive** for Cactopus; **Hot does not grant an extra large conditional innate +Yield power** (Ember Aloe fills the Hot-bonus niche). Temperate is workable at reduced output; **Freezing harms and eventually kills**, Flooded greatly reduces performance, prolonged Mycelial eventually lethal. Sand Material may be usable but is **not mandatory or specially rewarded** given its possible future removal. |
| **Farming purpose** | **Dependable, relatively quick, self-reproducing Heat farm** and accessible route to **Cactaclysm's Leaf-only prestige crop** or **Pearadox's two-temperature specialization**. Also gives Ashen Rose → Sandrose redemption a fully functioning branch rather than just a consolation harvest. |
| **Effect compatibility** | **Good response to Growth and Ripening accelerators**, modestly above-average Leaf Yield and normal Seed Yield compatibility; **weakish Harvest Window widening response** since its native plateau is forgiving. Fungus environment shifting into Hot may create or preserve a favorable habitat, but **environmental Source arithmetic is not multiplied** by recipient. Hot doesn't reverse any fungus's signed direct effect. |

**Important distinction from Sandrose and Ember Aloe:** **Sandrose** is fully productive in Dry but only **tolerates Hot at a penalty**; **Cactopus** is fully productive in **both Dry and Hot**; **Ember Aloe** specifically gets **+30% innate Growth and +50% native Leaves while Hot**. A stable Hot garden can therefore support Cactopus continuously without duplicating Ember Aloe's exact conditional Yield formula.

### Cactaclysm — APPROVED first-pass six-part Plant profile

**Core identity:** A **very-high-Leaf, completely sterile endpoint** that rewards cultivating Cactopus and solving a demanding Hot-plus-fungal-combination Transformation. Unlike Flowers' Orchidemon, Cactaclysm's high Leaves should be **relatively forgiving to harvest after acquiring it**: difficult to achieve, straightforward to collect. It does **not** need a new effect category, source emission, special explosive harvest, or second bloom.

| Category | Concrete first-pass definition |
| --- | --- |
| **Natural lifecycle** | **Average-to-somewhat-slow Growth**, **ordinary Ripening**. The main difficulty is **acquisition and continued Heat habitat**, not an extremely long lifecycle or novel production stage. A Cactopus → Cactaclysm Transformation starts a fresh lifecycle at 0% (§58). |
| **Natural harvest** | **Exceptionally high natural Leaf production at a single broad mid-Ripening peak around 140%**, with a strong **120–165% harvest window**; this is *one broad peak*, not multiple blooms. **Zero Seeds of any species at every percentage**, including 200%. No Bamboo Steel-like trophy: Leaves are the sole reward. The eventual numeric peak should be comfortably above ordinary Desert Plants and below/around other prestige endpoint scales according to setup difficulty, not a token gain. |
| **Germination** | **No Cactaclysm Seeds exist** in the currently established network and ordinary fungal Seeds effects cannot produce them. Obtain only via Cactopus Transformation; this preserves the long-term value of the required puzzle. |
| **Environment** | **Hot, Dry/Damp, Lit or Bright** ideal. Remaining **Hot is indefinitely survivable and gives full native production**; switching to **Warm** retains viability but **reduces natural Leaf output to roughly 65%** of the Hot result, so maintaining the extreme Temperature matters. **Freezing is harmful/lethal**, Flooded strongly reduces Growth/output, prolonged Mycelial harmful/lethal. Unlike Pearadox, it does **not** thrive in Freezing. No special material/fertility dependence or inherent Mycelial tolerance. |
| **Farming purpose** | **Prestige Leaf-only crop** for players who can repeatedly establish the Cactopus → Cactaclysm Hot/fungus interaction. Its broad optimum favors maximizing yield and the transformation success rate rather than racing to a razor-thin timing target. Its complete Seed sterility makes Cactopus's own Seed supply crucial. |
| **Effect compatibility** | **Very strong Leaf Yield Adjustment compatibility while Hot** and above-average Growth/ Ripening-rate response; **weaker Harvest Window widening payoff** because the native 120–165% peak window is already generous. **Seed Yield, Seed Timing, Time-based Seed Production, Germination Adjustment for unobtainable Cactaclysm Seeds, and Leaf–Seed Allocation cannot create Seed output.** Time-based Leaf Production may add Leaves only if an actual future fungus emits it and lifecycle progress advances. |

**Specific natural temperature performance:** While **Hot**, its normal high-Leaf curve is at 100% of its species' intended premium yield. While **Warm**, the peak is ~**65%** of the same curve, before independently emitted fungus Effects. This is **an environmental Plant Response**, not a new fungally emitted Effect. Avoid also adding a duplicate +50% innate Hot Leaf effect. Keeping its existing Hot habitat should feel valuable; the later numeric pass will define its full base peak in Hot. Its harvest window is **deliberately broad 120–165%**, contrasting with Orchidemon's narrow 137–153% Light puzzle.

**Transformation feasibility update (§58):** Cactopus → Cactaclysm restarts at **0%**, giving the new Cactaclysm its own Growth and Ripening stages to reach the valuable **120–165%** interval. Test whether the required Heat habitat can be maintained for that full development period. Do not decide the fungal combination yet.

### Mirage Rose — APPROVED first-pass six-part Plant profile

**Core identity:** Rare **shared success endpoint** of the Heat-recovery and Freezing-recovery branches, with the unusual payoff of **producing both Ember Aloe Seeds and Moonjade Seeds in one harvest**. The natural Seed mixture economically bridges two different Desert cultivation chains. The mixed Seeds are a normal one-time Seed harvest with two identified item stacks, **not an extra harvest action** or a fungus's new universal Seed-identity effect.

| Category | Concrete first-pass definition |
| --- | --- |
| **Natural lifecycle** | **Ordinary Growth and moderately long Ripening**, giving its eventual mixed Seed payout some investment time but not another extreme 16-day Marigloom-style wait. Its species rates are the same whether it came from Aloemancer or Jadewisp; either transformation starts the new instance at 0% (§58). |
| **Natural harvest** | **Good, worthwhile Leaves** at a single **mid-to-late Ripening peak near 145%**, but lower maximum Leaf potential than Cactaclysm. At 200%, harvest provides **two Seed stacks together: Ember Aloe Seeds and Moonjade Seeds**, in a proposed **1:1 natural ratio**. The total mixed Seed quantity should be **high** enough to justify a rare shared endpoint while financing both lines; exact even counts set in the Desert numbers pass. **No Mirage Rose Seeds**. Intermediate lifecycle percentages can provide partial quantities of each of the two Seeds according to the natural curves, subject to one consuming harvest. |
| **Germination** | No source of Mirage Rose Seeds: obtain through **Aloemancer → Mirage Rose** or **Jadewisp → Mirage Rose**. Ember Aloe Seeds harvested from Mirage Rose germinate using **Ember Aloe's** chance; Moonjade Seeds using **Moonjade's** chance. The route that produced the Mirage Rose does **not** affect the composition or germination of the harvest. |
| **Environment** | Best in **Damp or Dry, Temperate, and Lit/Dim**. **Warm and Cold both workable at moderately reduced rate/output**, but **Hot and Freezing become hazardous** to the transformed species, even though its precursors specialize in those extremes. Flooded inefficient, prolonged Mycelial lethal; no special material/Fertility dependence. **No origin-based Temp attunement, memory, or branch-dependent seeds.** |
| **Farming purpose** | A desirable **cross-branch Seed supply** with worthwhile fallback Leaves: an optimized Mirage Rose Seed harvest replenishes **Heat Ember Aloe** and **Freezing Moonjade** crop pipelines at the same time. Reaching Mirage Rose through either recovery branch should feel valuable, while repeat Mirage Roses still require transformations because it cannot reproduce itself. |
| **Effect compatibility** | **Strong Seed Yield Adjustment and Time-based Seed Production compatibility**, with Seed Timing Shift and Ripening-rate response useful for more efficient Seed turnaround. When a fungal Seed Yield Effect increases/decreases the mixed output, the **same signed adjustment applies proportionally to both existing Seed stacks**, preserving the naturally **1:1 output ratio** before integer rounding. Leaf Yield Effects work ordinarily; **Germination Adjustment cannot create Mirage Rose Seeds** in the network, and Leaf–Seed Allocation cannot swap either of the two defined Seed identities for a new one. |

**Specific mixed-Seed rule:** A successful 200% Mirage Rose Seed harvest includes **both** Seed types at once, in a **50% Ember Aloe / 50% Moonjade** composition by Seed count before integer rounding. This is **fixed across both origins and temperature states**. Avoid a new generic "mixed-seed Effect" and avoid a complex conditionally drifting mix just to add mechanics: the already unusual two-Seed payoff is sufficient. Choose an **even total Seed count** in the family numerical pass, so each Seed stack is a whole number without a fractional-split ambiguity in the natural baseline. Actual Effect-induced rounding can follow the game's eventual normal Seed rounding policy.

**Feasibility safeguard (§58):** Aloemancer → Mirage Rose and Jadewisp → Mirage Rose both start a **new 0%-progress Mirage Rose**. Each route must leave the new Plant in a sustainable habitat long enough to complete its own Growth and Ripening for the mixed-Seed harvest. Any specific qualifying fungi and trigger order are deferred to the later Transformation-recipe pass.

### Summary, inherited rules, and next step

| Plant | Natural farming role | Seeds at late Ripening |
| --- | --- | --- |
| **Cactopus** | Quick, forgiving **Hot + Dry** crop; two onward routes; can farm repeatedly | **Cactopus Seeds (own)** |
| **Cactaclysm** | Difficult-to-obtain **very-high-Leaf single-bloom**, fairly broad window; entirely sterile | **None** |
| **Mirage Rose** | Rare recovery-branch endpoint for **two Seed economies** and worthwhile Leaves | **Ember Aloe + Moonjade Seeds (1:1)** |

These proposals preserve the rest of the approved Desert roster:
- **Jadeheart** baseline with own Seeds; **Ember Aloe** Hot specialist with +30% native Growth/+50% Leaves and a 36h Heat-then-recovery success test; **Aloemancer** recovered Leaf/Ember Seed source; **Ashen Rose** failed attempt/Sandrose recovery.
- **Moonjade** survives Freezing via full Dormancy and a 48h exposure qualifying thaw; **Jadewisp** supplies Moonjade Seeds; **Pearadox** grows in Hot (+70% Leaves) or Freezing (+80% Seeds at 75% rate); **Sandrose** remains fully productive in Dry.
- **No Plant** has intrinsically beneficial Mycelial in this family; no universal Environmental Tolerance Effect or generic Transformation Effect is introduced, and no new Material/Fertility necessity is invented.
- Each Transformation **replaces** its predecessor with a fresh Plant at **0%**, clearing old harvest banks and lethal-exposure clocks (§58); one harvest collects all eligible Leaves and Seeds of the current Plant and consumes it, even when that one Seed harvest generates two types as on Mirage Rose.
- The **three profiles above are APPROVED**. **All eleven Desert Plants** have approved first-pass profiles. §36 records the **full proposed numerical pass** (stage times, Leaf and Seed curves, Seed species and germination, core/advanced compatibility, habitat outputs and exposure thresholds), for user review. After implementation, test with players and revise. No gameplay code should be touched now.


## 36. Desert — full-family numerical pass (APPROVED first-pass balance)

**Current recipe authority (§74, APPROVED on 26 October 2026):** All **13 Desert Plant-owned Transformation recipes** are now approved first pass, with the exact named Fungus alternatives, resolved environmental conditions and exposure durations in §74. The older Ember/Rime/Shelter/Mirage terms and bracketed arrows below are illustrative historical sketches, **not final recipe assignments**. Earlier text saying these recipes are still unassigned is superseded by §74. All legacy Sand/Material references are superseded by §61.


**Status:** The user approved **all eleven Desert six-part profiles (§33–35)** and requested a complete first-pass numerical table. The user **APPROVED all §36 numerical values as first-pass Desert balance**, including every lifecycle/harvest row, Seed species and germination probabilities, complete Effect compatibility, Temperature/Moisture/Illumination responses, and hazard exposure times. The previously approved intrinsic Plant bonuses and exposure qualifications remain unchanged. All numbers are subject to later tester playtesting. Consistent game-wide comparison: roughly **10 Leaves around 100%, 10 Seeds at 200%, 4 in-game days to 100%, 8 in-game days total to 200%** for the standard Plant, in good habitat without fungi. Prefer **dramatic specialization and real trade-offs** now, with a mandatory subsequent tester playtest/balance pass after implementation. **This is text-only design, NOT implementation; no fungi, final transformation recipes, or code changes.**

### A. Lifecycle, Leaf peaks and Seed harvest identities

All times are reference **stage speeds for a species newly planted or newly transformed at 0%**, in its listed reference habitat; **Transformation now resets lifecycle progress** (§58). A Seed-grown Ember Aloe under Warm has the listed speed/Leaf peak; its **innate Hot bonuses apply separately**. A Cactaclysm is benchmarked in **Hot**, its intended premium habitat, with its listed 48-Leaf peak already representing **Hot as its baseline**; switching to Warm **reduces** the reference yield to 65%, rather than applying a duplicate Hot multiplier. Pearadox's natural 18 Leaves / 15 Seeds are **ordinary viable-temperature baseline**, before its Hot/Freezing modifiers. Other entries represent their stated favorable normal habitat without unlisted innate bonuses.

| Species | 0–100% days | 0–200% TOTAL days | Natural Leaf maximum and progress | Seed count at 200% | Produced Seed species |
| --- | ---: | ---: | --- | ---: | --- |
| **Jadeheart** | **4.0** | **8.0** | **10 around 100%**, ordinary broad early curve | **10** | Jadeheart (own) |
| **Ember Aloe** | **3.5** | **7.5** | **14 at 135%** before Hot bonus | **12** | Ember Aloe (own) |
| **Aloemancer** | **4.5** | **9.5** | **26 at 145%**, strong recovered Leaf crop | **16** | Ember Aloe |
| **Ashen Rose** | **5.5** | **11.0** | **3 at 120%**, weak harvest | **3** | Jadeheart |
| **Moonjade** | **4.5** | **9.5** | **9 around 125%**, broad mid-Ripening | **5** | Moonjade (own) |
| **Jadewisp** | **4.0** | **9.0** | **8 at 130%**, modest Leaves | **26** | Moonjade |
| **Pearadox** | **4.0** | **8.5** | **18 at 140%** before Hot bonus | **15** before Freezing bonus | Pearadox (own) |
| **Sandrose** | **3.5** | **7.5** | **12 near 125%**, broad ~105–165% | **11** | Sandrose (own) |
| **Cactopus** | **3.25** | **7.0** | **14 across ~115–160%**, forgiving | **12** | Cactopus (own) |
| **Cactaclysm** | **4.5** | **9.0** | **48 near 140% in Hot**, broad ~120–165% | **0** | None, sterile |
| **Mirage Rose** | **4.0** | **9.5** | **18 at 145%**, useful secondary Leaves | **28 total = 14 + 14** | **14 Ember Aloe + 14 Moonjade** |

**One consuming harvest** takes **all** Leaves and available Seeds at that progress; columns compare late-Seed outcomes to peak-Leaf outcomes but **do not imply mutually exclusive resource selectors**. A partial Seed harvest earlier than 200% is possible if Seeds have accrued naturally. Values at intermediate points follow species curves to be interpolated later, not extra production actions.

**Explicit arithmetic for previously approved intrinsic conditions:**
- **Ember Aloe:** **+30% native Growth speed when Hot** and **+50% native Leaf output when Hot**. Its reference 3.5-day Growth thus becomes **3.5 ÷ 1.30 ≈ 2.69 days**, its 14 Leaves become **21 Leaves** at 135% under Hot, before fungal Effects. Ripening speed and normal Ember Aloe Seed output are not intrinsically boosted merely by Hot.
- **Pearadox:** **Hot +70% natural Leaves**: **18 × 1.70 = 30.6 peak Leaves** before integer rounding. **Freezing +80% natural Seed output**: **15 × 1.80 = 27 Pearadox Seeds** at 200% if it receives the bonus throughout the relevant productive progress, and continues lifecycle progression at **0.75× normal rate** while Freezing; if the whole 0–200% life occurs Freezing, reference **8.5 ÷ 0.75 ≈ 11.33 days**. Hot continues at 1.0× normal rate; neither Hot nor Freezing is lethal for Pearadox absent other hazards. The bonus uses the *currently resolved* Temperature **for future incremental production while the condition lasts**, not a retroactive harvest-time multiplier on previously earned output (§65); no source-path attunement or historical bank.
- **Cactaclysm:** **48 Leaves in Hot** at approximately 140%, falling to **48 × 0.65 = 31.2** in Warm. The Warm penalty is **a species intrinsic natural Leaf-output response**, and does not affect all recipients of a Heat Source or grant a universal Cactaclysm+Leaf fungus effect. Cactaclysm has 0 Seeds even under every fungal Seed effect.
- **Mirage Rose:** at 200%, **14 Ember Aloe and 14 Moonjade Seeds**, total 28, fixed **1:1 ratio** regardless of whether it originated via Aloemancer or Jadewisp. Both stacks are included in the **same** consuming harvest. Separate fungal effects improve/reduce both sides in the same signed direction and magnitude proportion, retaining 1:1 before rounding, never replacing the Seed identities.
- **Moonjade:** Freezing sets **Dormancy = 0 lifecycle progression** (not 0 accumulated Freezing exposure) and **0 accrual of time-based fungal production**. Its listed lifecycle durations count only active time in a viable non-Freezing habitat. It retains its progress and whatever progress-based harvest is already present while Dormant, subject to ordinary hazard consequences.

**Pacing cross-check:** A full baseline Seed-grown Cactopus reaches its broad early/mid peak after ~4–5 days, whereas creating Cactaclysm requires a transformation but offers 48 Leaves with a forgiving plateau. Aloemancer's 26 Leaves require Ember Aloe and the Heat-recovery puzzle; Jadewisp's 26 **Moonjade Seeds** reward 48 hours of Freezing that produces no progress. Strong rewards belong to different strategies and are not sorted by one numerical ranking.

### B. Germination probabilities and guaranteed Seed costs

The **approved additive planting model** is **min(100%, n × one-Seed chance)**; all Seeds committed to a single attempt are consumed regardless of outcome. Probabilities belong to **the species of Seed planted**, not the species of Plant that harvested it. A dash means **no presently produced/obtainable Seed of that species**, not a hidden chance of 0%. Cactaclysm, Aloemancer, Jadewisp, Ashen Rose, and Mirage Rose are accessed by Transformation.

| Seed target species | Chance from 1 Seed | Minimum Seeds for 100% | Sources of this Seed in Desert |
| --- | ---: | ---: | --- |
| **Jadeheart** | **28%** | **4** | Jadeheart (Base), Ashen Rose |
| **Ember Aloe** | **25%** | **4** | Ember Aloe, Aloemancer, Mirage Rose |
| **Aloemancer** | — | — | None; via Ember Aloe recovery |
| **Ashen Rose** | — | — | None; via early Ember Aloe recovery |
| **Sandrose** | **30%** | **4** | Sandrose |
| **Moonjade** | **20%** | **5** | Moonjade, Jadewisp, Mirage Rose |
| **Jadewisp** | — | — | None; via Moonjade recovery |
| **Pearadox** | **18%** | **6** | Pearadox |
| **Cactopus** | **32%** | **4** | Cactopus |
| **Cactaclysm** | — | — | None; via Cactopus transformation |
| **Mirage Rose** | — | — | None; via Aloemancer or Jadewisp transformation |

**Economic checkpoints:** A 26-Moonjade-Seed Jadewisp harvest can guarantee **five new Moonjades** (5 Seeds each, with one left over), funding repeat Freezing runs. A 28-Seed Mirage Rose harvest (14+14) can guarantee **three Ember Aloes and two Moonjades**, with leftovers (2 Ember, 4 Moonjade). Pearadox Seed farming under Freezing yields 27 self-Seeds: guaranteed **four Pearadox** from 24 Seeds, with 3 remaining, at a slow progression pace. These numerical distinctions are deliberately meaningful.

### C. Core Effect-compatibility multipliers

As in Woodlands/Aquatic/Flowers: a value **M× scales only the magnitude of a fixed signed emitted fungal Effect change**, not the whole final Plant multiplier. **A +20% Yield emitter with 2.5× compatibility contributes +50% to existing eligible yield**, rather than multiplying the entire Plant output by 2.5. Negative Effects stay negative; no sign inversion. Conditional values replace ordinary values when specified. **Environment Source arithmetic applies universally** and does not get an arbitrary species modifier. **—** in Germination means no currently obtainable Seeds of that Plant; 0× for sterile Seed Yield means no eligible Seed output even under Effects.

| Species | Growth Rate | Ripening Rate | Leaf Yield | Seed Yield | Germination |
| --- | ---: | ---: | ---: | ---: | ---: |
| Jadeheart | 1.0× | 1.0× | 1.0× | 1.0× | 1.0× |
| Ember Aloe | **1.1× / 1.8× Hot** | 1.1× | **1.1× / 2.3× Hot** | 1.0× | 1.0× |
| Aloemancer | 1.0× | 1.1× | **1.3× / 2.0× Temperate or Warm** | **1.8×** | — |
| Ashen Rose | 0.7× | 0.8× | 0.45× | 0.5× | — |
| Sandrose | 1.2× | 1.0× | 1.0× | 1.0× | 1.2× |
| Moonjade | 0.8× | 0.8× | 0.9× | 0.9× | 0.9× |
| Jadewisp | 1.0× | **1.3×** | 0.9× | **1.3× / 2.4× Cold or Temperate** | — |
| Pearadox | 1.0× | 1.0× | **1.1× / 2.2× Hot** | **1.0× / 2.5× Freezing** | 1.1× |
| Cactopus | **1.4×** | **1.3×** | 1.2× | 1.0× | 1.1× |
| Cactaclysm | 1.2× | 1.2× | **1.4× / 2.6× Hot** | **0×** | — |
| Mirage Rose | 1.0× | **1.3×** | 1.1× | **2.2×** | — |

**Compatibility examples, not fungus assignments:**
- A hypothetical fungus emitting **+20% Leaf Yield** onto **Hot Cactaclysm** gets **2.6× response**, resulting in **+52% Leaf Yield** over its Hot native 48-Leaf peak: **48 × 1.52 = 72.96 Leaves before rounding**. This is a powerful optimized result, lower than Bright Orchidemon's illustrative 88-Leaf harvest but much easier to time after the difficult transformation.
- The same **+20% Leaf Yield** fungus on **Hot Ember Aloe** gets **2.3×** (emits +46% Leaf relative to its already Hot-boosted 21-Leaf peak): **21 × 1.46 = 30.66** before rounding, using independent multiplicative native-temperature and fungal production factors.
- A hypothetical **+20% Seed Yield** on **Freezing Pearadox** becomes **+50% Seed Yield** via 2.5× compatibility; its innate 27 Seeds become **40.5** before rounding. Actual harvested Seed integers/rounding to be defined during eventual implementation.
- **Mirage Rose's +20% Seed emitter** becomes **+44%**, applying separately and proportionally to **both existing 14-Seed stacks**: **20.16 Ember Aloe / 20.16 Moonjade before rounding**, not 40.32 of one Seed and zero of the other.
- **Moonjade Dormancy overrides positive progress-rate responses** while Freezing; a Growth Accelerator does not wake it up merely because the fungus continues to emit an Effect. Its germination probability applies when **planting Seeds**, not to an already-frozen Plant.

### D. Advanced timing, window, hourly-production, and allocation compatibilities

| Species | Harvest Window width | Leaf Peak Timing Shift | Seed Timing Shift | Time-based Production | Leaf–Seed Allocation |
| --- | ---: | ---: | ---: | ---: | ---: |
| Jadeheart | 1.0× | 1.0× | 1.0× | 1.0× Leaves / 1.0× Seeds | 1.0× |
| Ember Aloe | 1.0× | 1.1× | 1.0× | **1.3× Leaves** / 1.0× Seeds | 1.0× |
| Aloemancer | **1.4×** | 1.2× | **1.3×** | 1.2× Leaves / **1.5× Seeds** | **1.3×** |
| Ashen Rose | 0.7× | 0.8× | 0.7× | 0.5× Leaves / 0.5× Seeds | 0.5× |
| Sandrose | **1.5×** | 1.0× | 1.0× | 1.0× Leaves / 1.0× Seeds | 1.0× |
| Moonjade | 1.3× | 1.0× | 1.0× | **0.8× Leaves / 0.7× Seeds when ACTIVE**, **0×/0× Dormant** | 0.8× |
| Jadewisp | 0.9× | 0.8× | **1.8×** | 0.8× Leaves / **2.3× Seeds** | **1.5×** |
| Pearadox | 1.1× | 1.2× | **1.0× / 1.8× Freezing** | **1.0× / 1.5× Hot Leaves**; **1.0× / 1.8× Freezing Seeds** | **1.5×** |
| Cactopus | **0.5×** | 0.8× | 1.0× | 1.0× Leaves / 1.0× Seeds | 1.0× |
| Cactaclysm | **0.5×** | 1.0× | **0×** | **1.3× Leaves / 0× Seeds** | **0×** |
| Mirage Rose | 1.0× | 1.1× | **1.6×** | 0.8× Leaves / **2.0× Seeds** | 1.4× |

**Mechanic invariants:** Time-based Production is **not innate** simply because a Plant has a high compatibility multiplier; a fungus must actually emit the Effect, its declared eligible window must include the Plant's current progress, and lifecycle progress must be advancing at a positive rate. No hourly production while Moonjade is Dormant, when any Plant is fully stalled, or after reaching 200%. Emitted Harvest Window effects **widen/narrow existing curves** rather than introducing a new bloom; Leaf Timing shifts existing peaks; Seed Timing shifts existing Seed availability. Leaf–Seed Allocation cannot conjure otherwise-nonexistent Cactaclysm Seeds or change which species a Plant produces. Mirage Rose's two Seed types must stay in its natural **1:1 identity ratio** before ordinary rounding, even with allocation or hourly Seed production; never create Mirage Rose Seeds.

### E. Environmental responses, Temperatures, and continuous hazard clocks

**Existing conditions only:** Moisture **Dry / Damp / Flooded**; Temperature **Freezing / Cold / Temperate / Warm / Hot**; Illumination **Dark / Dim / Lit / Bright**; **Mycelial overlay**. No need to add temporary Material/Fertility requirements or generic environmental-tolerance fungus Effects. Global Sources emit and propagate consistent environmental changes; species have different **responses to the resolved Condition**. These are **new first-pass numeric proposals** implementing the approved qualitative environmental preferences.

**Moisture multiplier table** (Growth/Ripening **rate** and normal **harvest yield**, relative to Damp = 1.0× in an otherwise preferred habitat). All Desert Plants in this pass can remain alive in Dry with no *Dry-only fatal exposure clock*, but several grow worse; this expresses Desert ecology without forcing every Plant to *benefit* from drought. **Flooded causes the listed penalties but no automatic Flooded-specific death timer in this initial pass**. Separate Mycelial and Temperature hazards still operate.

| Species | While Dry: rate / yield | While Damp: rate / yield | While Flooded: rate / yield |
| --- | --- | --- | --- |
| Jadeheart | **0.75× / 0.75×** | **1.0× / 1.0×** | **0.55× / 0.55×** |
| Ember Aloe | **1.0× / 1.0×** | **1.0× / 1.0×** | **0.40× / 0.40×** |
| Aloemancer | **0.80× / 0.80×** | **1.0× / 1.0×** | **0.60× / 0.60×** |
| Ashen Rose | **1.0× / 1.0×** | **1.0× / 1.0×** | **0.60× / 0.60×** |
| Sandrose | **1.0× / 1.0×** | **1.0× / 1.0×** | **0.55× / 0.55×** |
| Moonjade | **0.85× / 0.85×** | **1.0× / 1.0×** | **0.65× / 0.65×** |
| Jadewisp | **1.0× / 1.0×** | **1.0× / 1.0×** | **0.65× / 0.65×** |
| Pearadox | **1.0× / 1.0×** | **1.0× / 1.0×** | **0.45× / 0.45×** |
| Cactopus | **1.0× / 1.0×** | **1.0× / 1.0×** | **0.40× / 0.40×** |
| Cactaclysm | **1.0× / 1.0×** | **1.0× / 1.0×** | **0.45× / 0.45×** |
| Mirage Rose | **1.0× / 1.0×** | **1.0× / 1.0×** | **0.60× / 0.60×** |

**Temperature conditions and lethal clocks** (a dash indicates **no death from that Temperature alone**, not guaranteed survival from simultaneous Mycelial or other hazards):

| Species | While Hot: rate / output | Hot death after | While Freezing: rate / output | Freezing death after | Mycelial death after |
| --- | --- | ---: | --- | ---: | ---: |
| Jadeheart | **0.50× / 0.50×** | **72 h** | **0.40× / 0.40×** | **48 h** | **48 h** |
| Ember Aloe | **Growth 1.30×, Ripening 1.00× / Leaves 1.50×** | — | **0.40× / 0.40×** | **48 h** | **48 h** |
| Aloemancer | **0.50× / 0.50×** | **48 h** | **0.40× / 0.40×** | **48 h** | **48 h** |
| Ashen Rose | **0.50× / 0.50×** | **72 h** | **0.40× / 0.50×** | **72 h** | **48 h** |
| Sandrose | **0.70× / 0.70×** | — | **0.50× / 0.50×** | **72 h** | **72 h** |
| Moonjade | **0.40× / 0.50×** | **48 h** | **Dormant (0 progress; no new output)** | — | **48 h** |
| Jadewisp | **0.50× / 0.50×** | **48 h** | **0.40× / 0.50×** | **48 h** | **48 h** |
| Pearadox | **1.00× / Leaves 1.70×** | — | **0.75× / Seeds 1.80×** | — | **48 h** |
| Cactopus | **1.00× / 1.00×** | — | **0.40× / 0.50×** | **48 h** | **72 h** |
| Cactaclysm | **1.00× / 1.00× (native reference Hot)** | — | **0.40× / 0.40×** | **48 h** | **48 h** |
| Mirage Rose | **0.50× / 0.50×** | **72 h** | **0.50× / 0.50×** | **72 h** | **48 h** |

**Hot/Freezing hazard arithmetic:** The table's rate and output factors supersede a default generic temperature-extreme penalty for the named Desert species; **do not compound a hidden universal 0.5× extreme penalty again**. Ember Aloe Hot Growth rate changes but Ripening speed does not; its native Leaves are multiplied, while its baseline Seed output is ordinary. Pearadox Freezing reduces lifecycle speed but improves existing Seeds; it is **not Dormant**. Moonjade's zero-progress Dormancy cannot be bypassed by rate fungal Effects. Warm Cactaclysm has **65% of its Hot natural Leaf output**, with otherwise viable ordinary rates; this Warm rule is separate from the Hot table. All fatal-clock hours represent **uninterrupted exposure** to that state, reset on exiting the state; timers advance even when lifecycle progress is frozen. Mycelial overlap independently multiplies current rate and ordinary yield by **0.5×** until removed or lethal, even for tolerant-to-temperature Plants; Mycelial overlay is *never* beneficial to any Desert Plant.

**Moderate-temperature reference response:** The Plant's approved preferred Temperatures are **Jadeheart Temperate/Warm; Ember Aloe Hot (Warm viable); Aloemancer Temperate/Warm; Ashen Rose Temperate/Warm; Sandrose Temperate/Warm; Moonjade Cold/Temperate; Jadewisp Cold/Temperate; Pearadox Cold/Temperate/Warm as neutral states; Cactopus Hot/Warm; Cactaclysm Hot (Warm viable but only 0.65× Leaf); Mirage Rose Temperate**. In Cold, Temperate or Warm outside the listed preference, begin at **0.85× rate and ordinary output** unless a specific entry above overrides it; multiple listed preferred states give 1.0× each. Ember Aloe Warm/Temperate reference Leaf output remains 14 before Hot bonus; do not apply the Hot bonus to merely Warm. Mirage Rose in Warm/Cold uses the stated modest 0.85× penalty. **Cactaclysm Warm's 0.65× natural Leaf penalty takes precedence over general 0.85× output**.

**Illumination response:** The preferred states from approved profiles are:
- **Jadeheart:** Lit; **Ember Aloe:** Lit/Bright; **Aloemancer:** Lit/Dim; **Ashen Rose:** Dim/Lit.
- **Moonjade and Jadewisp:** Dim/Lit; **Pearadox:** Dim/Lit; **Sandrose:** Dim/Lit.
- **Cactopus and Cactaclysm:** Lit/Bright; **Mirage Rose:** Dim/Lit.

For a first-pass measurable common rule, preferred Illumination yields **1.0× ordinary Leaf output**; a nonpreferred *adjacent step* on the ordered Dark–Dim–Lit–Bright scale gives **0.85×**, and a nonpreferred state two or more steps away gives **0.65×**. For Plants with two preferred adjacent states, use the nearest as distance. This is a **Plant-native light response** and does not alter the strength or spread of emitted Luminous Sources. Do not conflate preferred Bright with an extra Leaf Yield fungal Effect.

**Death time notes:** A dash for **Sandrose under Hot** signifies ongoing viable production at 70% output and rate; Sandrose still dies from Freezing/Mycelial after exposure. Cactopus/Cactaclysm stay alive in Hot, Moonjade stays alive under Freezing without progress, and Pearadox stays alive in Hot or Freezing with positive progress. The **Moisture table explicitly gives no Dry lethal timer** for Desert's first pass; Dry is not universally productive but is safe absent other hazards.

### F. Qualifying exposure, transformation timing, and balancing invariants

The previously **approved** two transformation-linked exposure rules remain distinct from lethal clocks, and neither is a final fungus-specific recipe:

1. **Ember Aloe:** 36 **uninterrupted in-game hours while Hot** qualify for **Aloemancer** on a later qualifying deliberate recovery attempt. Attempt recovery **too early** and the same kind of deliberate attempt produces **Ashen Rose** instead. **Merely cooling without a recovery attempt does NOT transform it**. The Heat qualification timer begins only when the Plant first becomes Ember Aloe (by Transformation or by planting an Ember Aloe Seed), not when a prior Jadeheart occupied the hex. Interrupting Hot resets the count without a stored bank. The final recipe pass must define event order and any separate presence/adjacency requirements so both branches are feasible.
2. **Moonjade:** 48 **uninterrupted in-game hours Freezing**, with **complete lifecycle Dormancy**, qualify for **Jadewisp** upon a later qualifying thaw/recovery event. Thaw early or without the specific recovery condition -> ordinary Moonjade resumes from retained progress. Exposure resets when Freezing ends; no bank. The Freezing clock begins only after the Plant becomes Moonjade, not during any prior Jadeheart's exposure. **Moonjade → Pearadox** is a separate alternative recovery route; the final recipes must make selection and priority clear, not always force Jadewisp.
3. **All transformation-origin Plant properties stay intact:** An Aloemancer produces Ember Aloe Seeds; Jadewisp produces Moonjade Seeds; Mirage Rose always produces the equal Ember/Moonjade pair, independent of its two origins; Pearadox has identical current-temperature bonuses whether derived from Moonjade or Cactopus. No new origin attunement.
4. **Harvest remains single and consuming**; Transformation creates a fresh Plant at **0%** with no inherited harvest output or exposure history (§58). The new species must grow through its own progression before reaching its peak or late Seed harvest; source timing and habitat maintenance still require feasibility checks. This supersedes the older ban on resetting progress by transforming.
5. **Fungal Effect compatibility is conditional recipient response**, never source amplification or sign reversal. No generic Transformation Effect, Environmental Tolerance Effect, second-bloom Effect, or Mycelial benefit is introduced.
6. **First-pass extremes are a feature to test, not preemptively nerf:** Hot Cactaclysm 48 Leaves with a wide window; Hot Pearadox 30.6 Leaves; Freezing Pearadox 27 Seeds at reduced progression; Jadewisp 26 Moonjade Seeds after a zero-progress Freezing investment; Mirage Rose two Seed stacks totaling 28; and Ember Aloe's 36h productive Heat endurance followed by recovered Aloemancer's high Leaf return. Tester playtests should measure throughput after fungus/Seed/hex costs, failure rates and missed harvest windows, not just one Plant's headline Leaf count. Integer rounding and compound-effect caps remain to be specified with implementation, rather than declared without testing.

**Approval status:** All §33–35 six-part Desert Plant profiles and all §36 numeric tables and hazard responses are **APPROVED FIRST-PASS BALANCE**. The user explicitly accepted the numbers and asked to move to Spices. Tester playtesting and balancing revisions are still mandatory after implementation; do not modify game code now.


## 37. Spices — first Plant-profile batch, Base and three Illumination branches (APPROVED first-pass profiles)

**Status:** The user **approved Desert's complete §36 numeric pass as first-pass balance** and asked to begin **Spices**. The approved Spices family architecture, old Food sketch preserved in §15, its ten species and all existing branch/cross-branch routes are retained. This first six-part profile batch for **Thymely, Sunrice, Moonrice and Shadow Onion**—the Base and three first branches—was **APPROVED by the user** without changes. These are **working identifiers from the older Food sketch**, explicitly **NOT locked names** or settled RPG ingredients; rename all Spices to cooking-spice-appropriate identities during the later naming pass without redesigning their established mechanics. The separate **Ingredients** family covers recognizable food items via **one universal transforming Base and terminal nontransforming outputs** (§41 supersedes the earlier note).

**Agreed design sequence:** Specify all ten Spices Plant responses and Seed identities, then a complete numerical pass, then fungus roster and Plant-owned Transformation recipes. Named working fungi (**Glimmer, Veil, Gloam, Prism**) and environmental requirements shown in historical §15 are *provisional examples*, not locked assignments. Fungi can change Illumination using the ordinary global environmental Source model and emit their own separately-defined cultivation Effects; their **spatial overlap and Blockers** matter because each Plant responds differently to the **resolved Dark / Dim / Lit / Bright state**. Do not invent a periodic day/night cycle, a special Light resource, family-wide photocharge meter, Environmental Tolerance Effect, or universal Transformation Effect.

### Existing Spices network (preserved, no final recipes)

~~~text
Thymely (Base)
 ├──> Sunrice ──┬──> Starberry ───────────────> Glass Apple
 │             └──> Pum'king
 ├──> Moonrice ─┬──> Thymekeeper
 │             └──> Ghost Rice ──────────────> Glass Apple
 └──> Shadow Onion ──> Dillusion ────────────> Pum'king
~~~

The **Sunrice and Moonrice branches are complementary**, not fully isolated economies: **Thymekeeper** will produce **Sunrice Seeds** to sustain productive Bright fields. **Pum'king** retains two routes with the previously sketched challenge of **overlapping opposing light contributions while the final condition is Lit**, subject to actual environmental propagation and clamping. **Glass Apple** retains its Starberry and Ghost Rice origins. All precise recipes (including whether/how the originally illustrated fungi satisfy them) remain deferred.

### Thymely — APPROVED first-pass six-part Plant profile

**Core identity:** Accessible, unspecialized **Base Spices Plant** that introduces placing Light and Dark Sources around a normal field before progressing down different illuminated branches. No special mechanics to crowd out the specialists.

| Area | Concrete proposed design |
| --- | --- |
| **Natural lifecycle** | **Ordinary 4 in-game days Growth / 8 total days to 200%** without fungal acceleration, as in other family Base Plants. No Dormancy or temperature-extreme exception. |
| **Natural harvest** | **10 Leaves around 100%** with one broad-ish early/mid harvest curve, and **10 Thymely Seeds at 200%**. Own Seeds, single consuming harvest collecting both available output types. |
| **Germination** | **Reliable ordinary additive per-Seed chance**, exact per-Seed percentage reserved for the family numerical pass. Thymely Base Seeds are the Spices starting entry. |
| **Environment** | Prefers **Damp, Temperate, Lit**, with **Dim and Bright both survivable but less productive** and Dark a sharper production penalty. Dry and Flooded underperform, Hot/Freezing harmful/lethal after prolonged exposure, Mycelial eventually lethal. No exceptional Mycelial or extreme-temperature survivability. |
| **Farming purpose** | **Straightforward Seed loop and access to all three Illumination paths**. Useful while establishing habitat-engineering infrastructure, but not as productive in tuned extreme lighting as an unlocked specialist. |
| **Effect compatibility** | Normal **1.0× recipient response** to Growth/Ripening, Leaf/Seed Yield, window/timing, germination, time-based production and allocation; ordinary Direction-preserving interaction with fungal emissions. Environmental Illumination shifts resolve globally before this Plant's habitat response. |

### Sunrice — APPROVED first-pass six-part Plant profile

**Core identity:** The **repeatable, high-Leaf Bright-field crop**. Sunrice must be a sustainable alternative to the prestige endpoints, not just a disposable stepping stone to Starberry or Pum'king.

| Area | Concrete proposed design |
| --- | --- |
| **Natural lifecycle** | **Fairly quick Growth** and ordinary Ripening while **Bright**; under merely Lit it continues growing but with noticeably slower natural progression. No extra Growth/Ripening stage and no dependence on a day/night timer. |
| **Natural harvest** | A **strong single Leaf peak around 125% progress**, with a reasonably usable middle-Ripening interval and **moderate Sunrice Seeds near 200%**. **Own Seeds**, making repeated Bright farming possible once initially transformed. Leaf yield is significantly higher in **Bright than Lit**, using an ordinary recipient habitat multiplier that the family numeric pass will quantify rather than a separate emitted fungus Effect. |
| **Germination** | **Moderate Sunrice Seed germination**, available after harvesting Sunrice or from the later **Thymekeeper → Sunrice Seed** supply chain. Initial access still requires transformation from Thymely. |
| **Environment** | Strongly prefers **Bright, Temperate/Warm, Damp**. **Lit** is survivable but substantially less productive; **Dim** sharply suppresses Leaf yield and Growth, **Dark** is strongly adverse but not by itself a new fatal exposure rule. Dry/Flooded underperform, Hot/Freezing and sustained Mycelial can kill. Sunrice is light-specialized, not Heat-specialized. |
| **Farming purpose** | **Strong, self-sustaining Bright Leaf crop**, precursor to **Starberry** (another Bright-oriented Leaf optimization) and the **Sunrice → Pum'king** route with the eventual requirement to reach a **Lit net condition despite competing Light Sources**. |
| **Effect compatibility** | **High Leaf Yield adjustment response while Bright**, useful Growth acceleration response in a well-lit crop, ordinary Seed/Ripening compatibility and moderate benefit from Harvest Window widening. Sunrice's distinctiveness comes primarily from its **strong Bright-versus-Lit production differential**, not from an invented special fungally emitted photoboost. A light-emitting Source does not change its own algebra depending on recipient. |

**Precise curve choice:** Natural Leaf peak at **125%**; exact high Leaf quantity, Growth/Ripening days and Bright/Lit numeric ratios come during the full Spices family numeric pass. Both its sustainable Seed identity and existing incoming Thymekeeper Seed support are preserved.

### Moonrice — APPROVED first-pass six-part Plant profile

**Core identity:** The **self-reproducing Dim-area Seed supplier**, the counterpart to Sunrice, feeding two branches—**Thymekeeper** for Sunrice Seeds and **Ghost Rice** for productive Dark fields. It should be economically valuable even if it never becomes another Plant.

| Area | Concrete proposed design |
| --- | --- |
| **Natural lifecycle** | **Ordinary Growth and slightly long Ripening**, with useful throughput but an incentive to wait for a strong Seed harvest. No Dormancy or special time counter. |
| **Natural harvest** | **Modest Leaves** with a single ordinary peak around **110%**, and **high Moonrice Seed output near 200%**. Own Seeds, with a Seed-rich late curve and no invented multiple harvest. Earlier Seed availability can be modest so the late outcome is meaningfully better. |
| **Germination** | **Reliable-to-good Moonrice Seed germination**, suitable for scaling Dim planting zones and supplying Seed material for later Moonrice → Thymekeeper/Ghost Rice transformations. |
| **Environment** | Best in **Dim, Temperate or Cold, Damp**. **Lit** is survivable but less effective for Seed output, **Dark** remains viable but less productive than Dim, **Bright** strongly suppresses ordinary performance. Dry/Flooded underperform; Hot/Freezing and prolonged Mycelial lethal after exposure. Crucially, Moonrice's best niche is **Dim**, not Dark, leaving Ghost Rice and Shadow Onion their distinct deeper-shade ecology. |
| **Farming purpose** | **Accessible Dim Seed engine** whose own Seeds sustain repeated Moonrice rotation and expansion of the Light-manipulation branches. Maintaining efficient Moonrice fields keeps the later Thymekeeper→Sunrice Seed and Ghost Rice routes available. |
| **Effect compatibility** | **High Seed Yield Adjustment compatibility while Dim**, good **Seed Timing Shift and Time-based Seed Production** responses if an appropriate future fungus emits those existing Effects, ordinary Leaf Yield and Growth effects. Optional slight positive response to Germination Adjustment. Nothing receives a universal 'darkness power' from a fungus: the Plant simply reacts to resolved Dim. |

**Concrete choice:** Self-Seeds, a **110% modest Leaf peak**, and strong **Dim-dependent Seed farming**. This avoids making Moonrice a duplicate Dark Leaf crop competing directly with Shadow Onion and Ghost Rice.

### Shadow Onion — APPROVED first-pass six-part Plant profile

**Core identity:** An **easy, reliable Dark-field Plant**, worth growing directly, with a smooth harvest curve and its own Seeds. Later **Ghost Rice** will also prefer Dark but must clearly outperform it in Leaves while producing **Moonrice Seeds**, preserving the deliberate §15 contrast. Shadow Onion itself is a **gateway into Dillusion** and the second Pum'king route.

| Area | Concrete proposed design |
| --- | --- |
| **Natural lifecycle** | **Fairly quick Growth and ordinary Ripening in Dark**, rather than a Moonrice-like long Seed wait or extreme Daisyspell-style speed. Can grow more slowly under Dim, without new Dormancy. |
| **Natural harvest** | **Moderate Leaves** in a **broad early/middle Ripening peak around 115%** and **moderate Shadow Onion Seeds** near 200%. One Plant-consuming harvest. This is a balanced, forgiving crop rather than a premium Leaf or Seed specialist. |
| **Germination** | **Ordinary-to-good own-Seed germination**. Once unlocked from Thymely, Shadow Onion is sustainable in Dark without needing fresh Base transformations. |
| **Environment** | Strongly prefers **Dark, Damp, Temperate/Cold**. **Dim** is tolerable but with a noticeable Leaf/Rate cost; **Lit/Bright** progressively suppress natural farming output, but do not instantly kill it. Dry/Flooded reduce normal production, Hot/Freezing and Mycelial eventually lethal. Actual Dark is required for best farming, even though it may make some nearby Plants perform badly. |
| **Farming purpose** | **Accessible Dark rotation and self-Seeding foundation**, from which the player can develop **Dillusion** and eventually the alternate Pum'king transformation. It rewards players for creating a Dark pocket, not merely choosing the darkest whole-board state. |
| **Effect compatibility** | **Good Growth accelerator response while Dark** and ordinary-to-slightly-stronger Seed Yield compatibility. Moderate compatibility with Harvest Window and Leaf Yield adjustments; no unnatural transformation of Seed identity. Darkness is an environmental *condition*, so counteracting a direct Light Source follows normal Source arithmetic, not per-recipient emission rules. |

**Specific identity safeguard:** Shadow Onion must **not** be redesigned simply to distinguish it from Ghost Rice; later **Ghost Rice is a substantially higher-Leaf Dark specialist but produces Moonrice Seeds instead of its own**. The accessible self-Seeding Shadow Onion is still useful through different rotation economy and unlock path. This is exactly the §15 role contrast already preserved.

### Spatial illumination engineering — implementation-agnostic guardrails

- Every hex's **resolved Illumination** comes from the established environmental state and overlapping globally consistent **Luminous Influences** subject to Range/Spread Budget, blockers, falloff/clamping and source propagation rules. A single fungus may emit multiple ordinary Influences, but recipient species merely respond; no species rewrites the influence propagation.
- **Net Light** is a separate question from **which eligible fungus Influences reach the Plant**. Future Pum'king recipes may require the simultaneous arrival of differently directed ordinary influences while retaining **Lit** as the final resolved state; the historical Glimmer/Veil illustration in §15 is *not* yet a finalized fungus assignment.
- **No universal light-change cycle** is assumed. Farmers must actively create Light zones through placement/environment interactions rather than timing a periodic sun/day/night mechanic.
- **Spices names are temporary identifiers**, not RPG ingredient claims. Naming must not silently alter this network; Ingredients remains a separate **one-Base-to-terminal star-transformation** family (§41), not a Spices sub-branch.
- **No exotic intrinsic rule needs to be invented for every early species.** Sunrice's Bright farming, Moonrice's Dim Seed production, and Shadow Onion's Dark farming produce distinct spatial placement problems when combined with the later Seed support and prestige endpoints.

### First batch comparison and next steps

| Plant (temporary ID) | Environmental niche | Main crop | Seed identity |
| --- | --- | --- | --- |
| **Thymely (Base)** | **Lit** | Ordinary Leaves / Seeds | **Thymely** (own) |
| **Sunrice** | **Bright** | **Strong Leaves** | **Sunrice** (own) |
| **Moonrice** | **Dim** | **Many Seeds** | **Moonrice** (own) |
| **Shadow Onion** | **Dark** | **Moderate, forgiving Leaves** | **Shadow Onion** (own) |

The first four Spices six-part profiles are **APPROVED first-pass designs**. Full numerical lifecycle durations, Seed quantities, Seed chance, compatibility matrices, and environmental danger thresholds belong to the later Spices family-wide numeric pass, as for all earlier families. The next coherent batch should specify the four accessible intermediates **Starberry, Thymekeeper, Ghost Rice, and Dillusion**, then the two shared endpoints **Pum'king and Glass Apple** before numerical balance. No fungi were assigned and **no code changed**.


## 38. Spices — second Plant-profile batch, Bright/Dim/Dark intermediates (APPROVED first-pass profiles)

**Status:** The user **APPROVED §37's Thymely, Sunrice, Moonrice, and Shadow Onion profiles** without revisions. This four-Plant batch specifies **Starberry, Thymekeeper, Ghost Rice, and Dillusion**, and was **APPROVED by the user** without changes. Preserve the ten-Plant original Food network renamed **Spices**, with all these names **temporary mechanical identifiers**; cooking-spice names will be chosen later, without changing their traits. The sixth **Ingredients** family now uses one universal transforming Base with all other species terminal (§41 supersedes the former no-transformations design). Define six-part species profiles (lifecycle, harvest, germination, environment, farming purpose, and Effect compatibility), while reserving full numerical lifecycle/output/germination matrices until all ten Spices profiles have been reviewed. No specific fungus identities, final environmental Transform recipes, added generic Transformation Effects, or game code are authorized.

### Preserved network relevant to this batch

~~~text
Thymely ──> Sunrice ──> Starberry ────────────────────> Glass Apple
           │
           └───────────────> Pum'king

Thymely ──> Moonrice ─┬──> Thymekeeper [produces Sunrice Seeds]
                       └──> Ghost Rice ───────────────> Glass Apple

Thymely ──> Shadow Onion ──> Dillusion ──────────────> Pum'king
~~~

**No new routes:** Starberry and Ghost Rice remain the **two origins for Glass Apple**; Sunrice and Dillusion remain the **two origins for Pum'king**. Thymekeeper **is a Sunrice Seed supplier**, not an additional new transformation edge into Sunrice. The names **Glimmer, Veil, Gloam, and Prism** from §15 still represent **historical illustrative fungus roles, not finalized fungi**. Their Source strengths, ranges, modes, and actual recipes are deferred.

### Starberry — APPROVED first-pass six-part Plant profile

**Core identity:** A **higher-value Bright Leaf crop** obtained through the Sunrice branch, with an unusually useful **Sunrice Seed fallback** rather than its own Seeds. It should reward a more demanding Bright-zone setup than Sunrice, while letting Sunrice remain the repeatable self-Seeding workhorse.

| Category | Proposed first-pass definition |
| --- | --- |
| **Natural lifecycle** | **Ordinary-to-slightly-slow Growth** and ordinary Ripening, longer to establish than the relatively quick Sunrice but still a practical repeat crop through repeated transformations. No Dormancy or new stage. |
| **Natural harvest** | **Very strong single Leaf peak around 135%** with a **moderately narrow 125–150% productive interval**; higher maximum than Sunrice but less forgiving harvest timing. Near 200%, provides a **respectable number of Sunrice Seeds** rather than Starberry Seeds. Existing Seed availability may overlap falling Leaves near late Ripening; one harvest takes all available output. |
| **Germination** | **Starberry does not produce Starberry Seeds itself**; its initial access is **Sunrice → Starberry**. However, the later **Glass Apple produces Starberry Seeds**, allowing direct Starberry planting after Glass Apple is unlocked (as clarified by approved §39). The **Sunrice Seeds** that Starberry itself yields use Sunrice's per-Seed germination probability. |
| **Environment** | **Bright, Damp, Temperate/Warm** optimal. Lit remains viable but imposes a **substantial natural Leaf penalty**, sharper than Sunrice's ordinary nonideal light penalty; Dim/Dark strongly suppress Growth and Leaves, but lack a separate magical instant-death condition. Dry/Flooded inefficient; Hot, Freezing and sustained Mycelial hazardous/lethal. Starberry is Bright-specialized, not Hot-adapted. |
| **Farming purpose** | **High-value Bright Leaf specialist and Sunrice Seed return** for sustaining repeated Sunrice → Starberry attempts. Also opens one route to **Glass Apple**. Different from self-sustaining Sunrice: Starberry cannot reproduce directly from its **own** harvest; its Seeds become available later through Glass Apple. |
| **Effect compatibility** | **Strong fungal Leaf Yield response while Bright**, stronger than Sunrice's, and **useful response to Harvest Window widening** because its native peak is more demanding. Moderate response to Harvest Peak Timing Shift, ordinary Seed Yield and Seed Timing Effects on the available **Sunrice Seeds**, and somewhat reduced Growing speed compatibility if necessary to preserve its premium trade-off. Effects cannot turn Starberry's **own Sunrice Seed harvest** into Starberry Seeds; Glass Apple's separately established late Seed harvest does produce Starberry Seeds. No fungus has to emit a 'Bright-field harvest' Effect: the Plant responds to ordinary resolved Illumination. |

**First-pass shape choice:** **135% Leaf peak, main productive band 125–150%**, lower speed and narrower Leaf opportunity than Sunrice, but meaningfully higher natural Leaves. The exact maximum height and Bright/Lit response multipliers will be assigned in the Spices numeric pass. The older sketch's **Bright + Prism** characterization is preserved as a **potential future Transformation/Effect synergy**, not a named assignment now.

### Thymekeeper — APPROVED first-pass six-part Plant profile

**Core identity:** A **Dim-field Sunrice Seed engine**. It makes it economically worthwhile to cultivate a Dim area as a supplier to much more productive Bright fields. This is more specific than Moonrice's own-Moonrice-Seed farming.

| Category | Proposed first-pass definition |
| --- | --- |
| **Natural lifecycle** | **Ordinary Growth** and **longer-than-average Ripening**, giving the high Seed payoff a meaningful waiting cost while staying far shorter than Flowers' extreme Marigloom. |
| **Natural harvest** | **Low-to-moderate Leaves**, one unremarkable early Ripening peak around **115%**, but **very high Sunrice Seed production** toward 200%. **Sunrice Seeds only**: no Thymekeeper Seeds and no automatic Moonrice Seeds. |
| **Germination** | **No Thymekeeper Seeds** produced anywhere in the current network; reach it through **Moonrice → Thymekeeper**. Seeds harvested from it grow **Sunrice**, using **Sunrice's germination chance**, not a species-specific Thymekeeper germination rate. |
| **Environment** | Best under **Dim, Damp, Temperate/Cold**. Dark is livable but reduces Seed productivity; Lit substantially weakens its Seed crop and Bright reduces it sharply. Dry and Flooded suppress ordinary production. Hot, Freezing, and sustained Mycelial harmful/lethal; no darkness-based hazard immunity. |
| **Farming purpose** | **Cross-branch logistical support:** use Moonrice Seeds to establish Moonrice fields, transform some into Thymekeeper, harvest **Sunrice Seeds** and use them to sustain Bright Sunrice/Starberry/Glass Apple production. Direct Leaf farming should usually be inferior to the crops Thymekeeper is supporting. |
| **Effect compatibility** | **Very strong Seed Yield susceptibility while Dim**, plus **strong Seed Timing Shift and Time-based Seed Production** compatibility if future fungi emit those exact existing Effects. Ordinary-to-good Ripening acceleration response; notably weak Leaf Yield compatibility. Germination Adjustment applies to the planted Sunrice Seeds in a later planting event, not to the currently living Thymekeeper. Fungus Effects never create Thymekeeper Seeds. |

**Identity guardrail:** Moonrice itself grows **Moonrice Seeds** to sustain the Dim transformation pipeline; Thymekeeper grows **Sunrice Seeds** to bridge Dim to Bright. A single Seed-focused role is enough—no need to add Light Charge, universal Seed-conversion Influences, or extra harvests.

### Ghost Rice — APPROVED first-pass six-part Plant profile

**Core identity:** The **more productive Dark Leaf specialist**, contrasted with Shadow Onion's simple accessible Dark crop. Produces **Moonrice Seeds**, not self-Seeds, so its Seed harvest replenishes the Dim ancestor and makes Ghost Rice transformation worth repeating.

| Category | Proposed first-pass definition |
| --- | --- |
| **Natural lifecycle** | **Ordinary-to-somewhat-slow Growth** and ordinary Ripening, less quick to establish than Shadow Onion but generally faster to finish than long Seed specialists like Thymekeeper. |
| **Natural harvest** | **High Leaves at a single mid-Ripening peak around 145%**, concentrated across roughly **130–160%**, and **moderate Moonrice Seeds** near 200%. Higher natural Leaf output than Shadow Onion by a clear and eventually numeric margin, at the expense of not producing Ghost Rice Seeds. |
| **Germination** | **No Ghost Rice Seeds** in the current network; obtain through **Moonrice → Ghost Rice**. Harvested Moonrice Seeds use **Moonrice's** germination chance and can begin new Moonrice crops for later transformations. |
| **Environment** | Prefers **Dark, Damp, Temperate/Cold**. Dim is viable with a **substantial Leaf penalty**, while Lit and Bright are much less productive. No innate damage or automatic transformation solely from making it Lit; Hot, Freezing, Mycelial remain hazardous, and Dry/Flooded reduce farming efficiency. |
| **Farming purpose** | **High-efficiency Dark Leaf farming**, valuable even if no further transformation is attempted; second route to **Glass Apple**, which will eventually require more sophisticated lighting conditions. Dark Ghost Rice and Dark Shadow Onion are allowed to coexist as archetypes: **Ghost Rice has higher Leaves and Moonrice Seeds; Shadow Onion is easy and self-Seeding**. |
| **Effect compatibility** | **Very strong Leaf Yield response when Dark**, ordinary-to-good Harvest Timing Shift, moderately strong Harvest Window widening for its narrower peak, and weak-to-ordinary Seed Yield response affecting **Moonrice Seeds**. Darkening environmental Influences remain globally consistent, and Glow/Light emissions never reverse their direct sign specifically for Ghost Rice. |

**Spatial feasibility safeguard for later recipes:** Ghost Rice's **Glass Apple** route has historically involved moving toward **Lit**. The Plant must **survive a controllable transition from Dark to Lit for sufficient time** to complete a real transformation; the severe Lit production penalty is acceptable, but an immediate death or forced reset would break its path. The exact fungus combination and exposure duration are deferred.

### Dillusion — APPROVED first-pass six-part Plant profile

**Core identity:** A **flexible Dim/Lit self-Seeding crop** obtained from a Dark-origin Shadow Onion. It bridges the deeply Dark branch into the **net-Lit overlap puzzle for Pum'king** and is valuable as its own stable, easily managed farming species.

| Category | Proposed first-pass definition |
| --- | --- |
| **Natural lifecycle** | **Fairly quick Growth and ordinary Ripening**. Dependable repeat-cycle timing: much less demanding than rare prestige endpoints. |
| **Natural harvest** | **Good Leaves** on a **broad single mid-Ripening plateau around 120–165%, with a natural maximum near 135%**, plus **moderate Dillusion Seeds** toward 200%. Both ordinary Leaf farming and Seed rotations should remain viable. |
| **Germination** | **Dillusion produces its own Seeds** with ordinary-to-good germination. Its first instance comes from **Shadow Onion → Dillusion**; after that, the player may maintain a Dillusion population directly without rebuilding Dark Shadow Onion fields every generation. |
| **Environment** | **Dim and Lit are equally productive optimal conditions**, with **Temperate/Warm, Damp** preferred. Dark is survivable but less productive than either Dim or Lit; Bright penalizes ordinary production, but **neither Dark nor Bright instantly kills it**. Dry/Flooded reduce output; Hot, Freezing, Mycelial hazards remain. Its stability is **two-light-state tolerance**, not immunity to all environmental damage. |
| **Farming purpose** | **Reliable Dim/Lit generalist and bridge from Dark Shadow Onion into Pum'king's Lit final-condition puzzle**. Its own Seeds provide a resilient replacement crop when fungal positioning slightly changes resolved illumination. Should not outclass optimized Bright Starberry or Dark Ghost Rice in raw peak Leaves. |
| **Effect compatibility** | **Ordinary-to-good Growth, Ripening, Leaf Yield and Seed Yield compatibilities**, **moderately strong Harvest Window adjustment**. Fungal cultivation Influences should work equally well while Dim and Lit; **no additional 'Dim→Lit transition bonus'** or origin memory is necessary. The challenge of final Pum'king remains environmental *overlap with resolved Lit*, not an innate Dillusion timer. |

**Concrete identity decision:** Dillusion **does not require switching** Dim→Lit to receive a bonus. It simply **functions well in either state**, so overlapping Luminous Sources can vary without ruining the crop. This distinction from Aquatic **Silvercress** is deliberate: Silvercress rewards a change by lifecycle stage, but Dillusion rewards **stable output despite fluctuating Light**.

### Important comparison and next step

| Temporary Spices identifier | Preferred resolved Light | Non-Seed farming identity | Seed harvested near 200% |
| --- | --- | --- | --- |
| **Starberry** | **Bright** | **High Leaves near 135%; narrower peak than Sunrice** | **Sunrice** |
| **Thymekeeper** | **Dim** | **Very high Sunrice Seed supply, weak Leaves** | **Sunrice** |
| **Ghost Rice** | **Dark** | **High Leaves near 145%; clearly stronger than Shadow Onion** | **Moonrice** |
| **Dillusion** | **Dim OR Lit** | **Flexible broad Leaf plateau near 135%, reliable rotation** | **Dillusion (own)** |

- Starberry is a **Leaf-focused route** to Sunrice Seeds, whereas Thymekeeper is a **Seed-focused route** to the very same Sunrice Seed type; each has a different environment and access path.
- Ghost Rice and Shadow Onion can both farm Dark, but **Ghost Rice is more productive with Moonrice Seeds** while Shadow Onion is simpler and self-sustaining. Do not artificially replace their roles with exotic mechanics.
- Dillusion's **Dim/Lit flexibility**, Seed self-sustainability, and eventual Pum'king access create value without making it the highest Leaf producer.
- The next batch should be the **two shared high-value endpoints Pum'king and Glass Apple**, preserving Pum'king's overlapping opposing Luminous Influence requirement at final **Lit** and Glass Apple's Bright/high Leaves with **Starberry Seeds**, via Starberry or Ghost Rice. Do **not** assign fungus identities or recipe checks until the later fungus/Transformation pass; historical labels are examples only.
- After all ten Spices profiles are user-approved, propose the normal **whole-family numeric pass** (days to 100/200%, Leaf and Seed output at specified points, germination chances, core and advanced compatibility matrices, species-specific environment multipliers and hazards), then continue the agreed Plant-first workflow. Eventual player testing may revise the bold numbers.
- **Approval:** This second batch is **APPROVED as first-pass design** by the user. The final Spices batch (§39) covers **Pum'king and Glass Apple**; no game code or fungus identities were assigned.


## 39. Spices — final Plant-profile batch, Pum'king and Glass Apple (APPROVED first-pass profiles)

**Status:** The user approved **all four §38 Spices intermediates** (Starberry, Thymekeeper, Ghost Rice, and Dillusion) without requesting changes and asked for the next batch. This final six-part profile batch for the two shared high-value endpoints **Pum'king** and **Glass Apple** was **APPROVED by the user** without changes. All ten Spices names are still **temporary mechanical names from the former Food network**; choose cooking-spice-appropriate names separately without retconning the approved roles or transformation graph. The entire batch is **APPROVED first-pass Plant identity**, and the complete proposed numerical stage times/Leaf values/Seed counts/germination/Effect compatibility/hazard thresholds follow in §40.

### Preserved branches and environmental challenge

~~~text
Sunrice ──────────┐
                  ├──> Pum'king  [high Leaves, absolutely sterile]
Dillusion ────────┘

Starberry ────────┐
                  ├──> Glass Apple  [high Leaves; produces Starberry Seeds]
Ghost Rice ───────┘
~~~

- **Pum'king's historical spatial challenge** is to receive **opposing Luminous Source influences concurrently**, with the **resolved Illumination still Lit**, on either of its two precursor routes. The old **Glimmer + Veil** source identities and exact recipes from §15 remain **provisional** and must not be fixed until fungus/Plant-owned Transformation passes.
- **Glass Apple** should be a premium **Bright** Leaf crop accessible via **Starberry or Ghost Rice**. The historical **Prism** role remains illustrative; do not invent the actual fungal roster or assignment now.
- Both endpoints restart at **0% progress** on Transformation and have the same species identity regardless of origin. No route-based hidden attunement or source memory (§58).
- The Source reaching a hex and the **resolved Illumination after all Source contributions** are different mechanical observations. The proposed Pum'king transformation puzzle can require both while respecting the environment's existing propagation, blockers, falloff, and clamping—not pretend opposing Sources always sum neatly to Lit everywhere.

### Pum'king — APPROVED six-part first-pass Plant profile

**Core identity:** A valuable **Leaf-only, sterile, net-Lit specialist**. Its major setup challenge is **spatially overlapping opposing lighting Influences**, not simply making everything as Bright as possible. It should be noticeably more rewarding than ordinary Sunrice or Dillusion, while standing apart from Glass Apple's Bright optimization and Starberry Seed feedback.

| Category | Concrete proposed definition |
| --- | --- |
| **Natural lifecycle** | **Average-to-slightly-long Growth and moderately long Ripening**. A demanding premium crop, but not exceptionally slow like Marigloom; its difficult spatial acquisition—not an artificially extreme day count—is the principal challenge. When a Sunrice or Dillusion transforms into Pum'king, the new Pum'king **starts at 0%**, with no inherited progress or bonus stage (§58). |
| **Natural harvest** | **Very high Leaves** at a **single strong, reasonably broad Leaf maximum around 145% progress**, with a productive **130–170% harvest interval**. **Zero Seeds at every lifecycle percentage**, including at 200%, with no alternative Seed identity or special trophy resource. The broad peak ensures success at creating the correctly balanced source overlap is rewarded without also imposing an Orchidemon-like razor-thin harvest window. One Plant-consuming harvest collects whatever Leaves currently exist; no second bloom. |
| **Germination** | **No Pum'king Seeds exist** in the established graph and no fungal Seed Yield, Seed Timing, time-based Seed Production, or Leaf–Seed Allocation Effect can create any. Pum'king is obtained only by **Sunrice → Pum'king** or **Dillusion → Pum'king** Transformations. The farming economy therefore needs continuing Sunrice or Dillusion Seeds and repeated spatial puzzle setups. |
| **Environment** | **Lit, Damp, Temperate/Warm** is Pum'king's productive optimum. **Bright** is genuinely detrimental to normal Leaf output, **Dim** also lowers output, and **Dark** suppresses production severely but does not instantly kill. Its preferred Lit condition is important: sources that individually brighten/darken the hex can overlap while leaving a productive *net* state. **Dry/Flooded** reduce progression/output; sustained **Hot, Freezing and Mycelial** remain lethal hazards. There is no special tolerance to every Lighting Condition, no light-exposure memory or new overlay. |
| **Farming purpose** | **Premium, sterile Leaf payoff for a controlled net-Lit Source-overlap puzzle**. The player can approach from Sunrice's Bright branch (perhaps needing to reduce final illumination to Lit) or Dillusion's Dim/Lit branch (already comfortable with Lit). Its exceptionally valuable Leaf harvest offsets setup/hex costs and inability to seed itself. |
| **Effect compatibility** | **Very strong Leaf Yield Adjustment compatibility while Lit**, with ordinary/slightly low response away from Lit. **Good Harvest Window and Leaf Peak Timing Shift** responses to existing ordinary fungal Effects, useful but not extraordinary Growth/Ripening compatibility, and eligible Time-based Leaf Production only if an actual fungus emits it while the Plant is advancing. **All Seed-generating Effects are 0/inapplicable** because Pum'king is completely sterile. Crucially, a Luminous Influence itself never gets a recipient-specific sign change or strength multiplier. |

**First-pass natural shape choice:** Peak **145%**, strong around **130–170%**, one Leaf bloom, **zero Seeds**. Give Pum'king a genuinely high Leaf maximum in the Spices numerical pass—do not dilute it into merely a slightly better Sunrice—and make the numeric **Lit versus Bright** contrast meaningful.

**Provisional two-overlap feasibility, not a fungus assignment:** After the later fungus roster is designed, a **Plant-owned Pum'king transformation condition** may require concurrently receiving the two appropriate oppositely directed ordinary Source influences while the final resolved environment reads **Lit**. The **precursor** (Sunrice or Dillusion) and any additional duration/adjacency constraints will be specified later. This is a **specific spatial puzzle direction preserved from §15**, not a claim that an emitted "Pum'king Transformation Effect" exists. The resolved Lit must be physically reachable under the final environment engine. **Source presence alone is not the same as net illumination**.

**After Transformation:** Pum'king remains a Pum'king even if the qualifying sources later stop reaching it, unless a separate future Plant-owned recipe says otherwise (none is proposed). Its ordinary Leaf yield depends on the **current resolved Illumination** (Lit optimal). We are **not** imposing a new rule requiring both transformation sources to remain active throughout Ripening just to keep it productive. Any actual independent Leaf Yield fungal Effects continue to operate only if their sources remain active.

### Glass Apple — APPROVED six-part first-pass Plant profile

**Core identity:** A **very-high-Leaf Bright-field endpoint** that, unlike sterile Pum'king, produces **Starberry Seeds** at a late harvest. The two incoming routes—**Starberry → Glass Apple** and **Ghost Rice → Glass Apple**—provide very different **Light engineering costs** but create the **same Plant**. It should be extraordinarily productive at its optimized Bright peak and have a strategically significant Seed payoff if harvested later instead of Leaves.

| Category | Concrete proposed definition |
| --- | --- |
| **Natural lifecycle** | **Average-to-slightly-slow Growth and moderately slow Ripening**, longer overall than quick Sunrice but not exceptionally prolonged like Marigloom. Either Transformation starts the new Glass Apple at **0%**, using its own full stage rates (§58). |
| **Natural harvest** | **Extremely high Leaves near a single peak around 155% progress**, within a comparatively narrow but manageable **145–170% productive interval**; noticeably higher natural maximum than Starberry and ordinary Sunrice when optimally Bright. Near 200%, produces a **valuable quantity of Starberry Seeds**, **not Glass Apple Seeds**. These outcomes share the normal **one consuming harvest**: at an intermediate progress that has both Leaves and some Seeds, both current amounts are collected, not separate actions. |
| **Germination** | No **Glass Apple Seeds** are produced by this graph; repeated Glass Apple cultivation requires a **Starberry or Ghost Rice Transformation**. **Starberry Seeds from Glass Apple grow Starberry directly**, using Starberry's eventual per-Seed chance. This is a deliberate and valuable **Seed-source breakthrough**: Starberry itself yields Sunrice Seeds, so obtaining Glass Apple for a Seed harvest lets the player directly grow Starberry without repeatedly transforming Sunrice first. |
| **Environment** | **Bright, Damp, Temperate/Warm** is the best productive state; **Lit** has a sizable natural Leaf/output penalty, **Dim and Dark** heavily suppress ordinary Leaf production (but do not instantly kill or force an identity change). **Dry/Flooded** reduce rate/yield; Hot/Freezing and sustained Mycelial are hazardous/lethal. A Ghost Rice-origin Glass Apple is not permanently Dark-adapted: after Transformation its optimum is simply Bright. |
| **Farming purpose** | **Peak Bright Leaf specialist AND a high-value Starberry Seed supplier**. This supports two distinct choices: harvest at the strong ~155% Leaf optimum, or let the Plant ripen further to establish a directly Seed-grown Starberry farming population. Its Bright setup and incoming transformations still cost effort; Starberry Seeds cannot directly germinate into Glass Apple, preserving the endpoint puzzle. |
| **Effect compatibility** | **Exceptionally strong Leaf Yield Adjustment response while Bright**, modestly above-average Harvest Window widening and Peak Timing Shift on its existing single Leaf curve; **strong Seed Yield Adjustment and Seed Timing Shift** on its **Starberry Seeds**, with good Time-based Seed Production if a future fungus emits that existing Effect. Lower ordinary Yield response under Lit/Dim/Dark. **Germination Adjustment** affects Starberry when its Seeds are planted, not unavailable Glass Apple Seeds. Existing Leaf–Seed Allocation can redistribute eligible harvest amounts but **cannot convert Starberry Seeds into Glass Apple Seeds**. |

**First-pass natural shape choice:** **155% Leaf peak, strongest interval ~145–170%**, plus **Starberry Seeds at 200%**. Glass Apple and Pum'king must both feel premium; Glass Apple offers a potentially higher optimized Bright Leaf ceiling and **important Starberry Seeds**, while Pum'king's distinguishing reward is a **sterile, broader single Leaf harvest from a difficult net-Lit overlap puzzle**. Their real efficiency will ultimately depend on Source placements, Seed production, growth stage, and transformations, not just a single peak number.

**Route viability constraint:** **Ghost Rice starts out happiest in Dark but transforms into Bright-preferring Glass Apple.** The future Plant-owned recipe must allow that transition without prematurely killing Ghost Rice, then provide viable Bright habitat as the **new 0%-progress Glass Apple** develops toward its 155% Leaf peak or later Starberry Seed harvest. The Starberry route also creates a fresh Glass Apple; neither route adds an extra bloom or harvest (§58). Do not select a named fungus or event-order recipe yet.

### Critical Seed-economy distinction (retained)

~~~text
Bright self-sustain:
Sunrice ──[harvest]──> Sunrice Seeds ──[plant]──> Sunrice

Bright high-Leaves route:
Sunrice ──[Transform]──> Starberry ──[harvest]──> Sunrice Seeds

Premium Bright seed feedback:
Starberry or Ghost Rice ──[Transform]──> Glass Apple
Glass Apple ──[late Seed harvest]──> STARBERRY Seeds
Starberry Seeds ──[plant]──> Starberry [directly; no new Sunrice transform needed]

Premium net-Lit harvest:
Sunrice or Dillusion ──[Transform]──> Pum'king
Pum'king ──[Leaf harvest only]──> 0 Seeds
~~~

**Important:** Glass Apple producing Starberry Seeds gives a **non-Base Plant directly plantable Seeds** even though Starberry's own harvest generates Sunrice Seeds. This is allowed by the agreed cross-species Seed identity rules and is an intended meaningful later-game improvement to sustainable Starberry production, **not** a hidden new Transformation route or a guarantee of direct Glass Apple planting. The later per-Seed Starberry germination probability must be included in the Spices numerical pass even though Starberry itself does not produce those Seeds.

### Comparison and readiness for numbers

| Temporary identifier | Optimal Light | Natural Leaf shape | Seeds at 200% | Route identities |
| --- | --- | --- | --- | --- |
| **Pum'king** | **Lit**, with proposed opposing Light-source overlap puzzle for Transformation | **Very high Leaves; broad 130–170% peak around 145%** | **0**, sterile | Sunrice OR Dillusion |
| **Glass Apple** | **Bright** | **Extremely high Leaves; narrower 145–170% peak around 155%** | **Starberry Seeds**, worthwhile quantity | Starberry OR Ghost Rice |

**No additional system invented:** All effects here are either **ordinary Plant environmental responses, harvest curves, standard Seed identities, or compatibility with the established fungal Effect catalogue**. No universal secondary bloom, Seed-type replacement, environmental tolerance, Light-charge accumulation, periodic day/night cycle, or generic transformation Influence.

**User-review status:** All ten Spices profiles in §§37–39 are **APPROVED as first-pass species identities**, including Pum'king's Lit overlap challenge/sterility and Glass Apple's Bright peak/Starberry Seed production. §40 contains the numerical balance **PROPOSED for user review**. After numerical approval the next Family is Ingredients (**one universal transforming Base**, Base-only starter Seeds, and all other species terminal; §41 supersedes the earlier architecture). **No code changes; no fungus roster/final transformation recipes assigned.**


## 40. Spices — complete numerical pass (APPROVED first-pass balance)

**Status:** The user **approved all ten Spices Plant profiles** (§§37–39), including Pum'king and Glass Apple, and requested the **full first-pass numerical balance**. All values in this section were **APPROVED by the user** as the complete first-pass Spices numerical balance, including lifecycle/harvest values, Starberry Seed access and germination, core/advanced Effect compatibility, light-response tables, Moisture/Temperature/Hazard numbers. Later testing may adjust them. The historical Food-derived Spices names remain **TEMPORARY MECHANICAL IDENTIFIERS**; a later cooking-spice naming pass must preserve these ten species, the graph and the mechanics. The user prefers bold numerical differentiation followed by eventual **tester playtesting**, not preemptive conservative balancing. **No code implementation, new fungus roster, Effect assignment or final Transformation recipe is authorized.**

**Global comparison:** One ordinary Plant has roughly **10 Leaves near 100%, 10 own Seeds at 200%, four in-game days to finish Growth (100%), eight TOTAL in-game days to finish Ripening (200%)**, without fungal Effects and under preferred habitat Conditions. **All transformations create a new Plant at 0%** (§58), and a Plant has **one consuming harvest**, at which it collects all eligible Leaves and Seeds *at that progress*, not one exclusive output selector. Peak Leaf and 200% Seed maxima are usually **alternative harvest timings**, not simultaneous full payouts. Existing fungally emitted Growth/Ripening/Leaf/Seed/Window/Timing/Time-based Production/Allocation Effects keep consistent directions and source behavior; recipient compatibilities adjust only their magnitude. Do not add an Illumination-charge mechanic, day/night clock or generic Transformation Effect.

### A. Natural stage durations, Leaf curves and Seed identities

These duration values describe a species from **0%**, before fungal rate Effects, in its preferred resolved Illumination, Moisture and Temperature. They are comparison baselines even for species initially accessible *only by transformation*. **Days to 200% INCLUDE days to 100%**. Natural Leaves below 100% may be harvested as with other families. All plants may carry partial quantities of Seeds and Leaves at intermediate phases as their existing harvest curves permit.

| Species (working name) | Days 0–100% Growth | Days 0–200% TOTAL | Natural Leaf peak / preferred progress | Seeds at 200% | Seed identity |
| --- | ---: | ---: | --- | ---: | --- |
| **Thymely (Base)** | **4.0** | **8.0** | **10 at 100%**, standard broad-ish early bloom | **10** | Thymely (own) |
| **Sunrice** | **3.25** | **7.0** | **18 at 125%**, manageable mid-Ripening window | **10** | Sunrice (own) |
| **Moonrice** | **4.0** | **9.0** | **6 at 110%**, weak ordinary Leaves | **20** | Moonrice (own) |
| **Shadow Onion** | **3.5** | **7.5** | **11 at 115%**, broad forgiving curve | **11** | Shadow Onion (own) |
| **Starberry** | **4.5** | **9.0** | **31 at 135%**, narrowish ~125–150% | **8** | Sunrice |
| **Thymekeeper** | **4.0** | **10.0** | **5 at 115%**, weak Leaves | **28** | Sunrice |
| **Ghost Rice** | **4.5** | **8.5** | **24 at 145%**, ~130–160% | **11** | Moonrice |
| **Dillusion** | **3.5** | **7.5** | **14 at 135%**, broad ~120–165% plateau | **12** | Dillusion (own) |
| **Pum'king** | **4.5** | **9.5** | **46 at 145%**, broad ~130–170% | **0** | None, absolutely sterile |
| **Glass Apple** | **5.0** | **10.0** | **58 at 155%**, narrower ~145–170% | **24** | **Starberry** |

**The same crop cannot be harvested twice.** Seeds and Leaves available at the chosen progress are collected together. Example: choosing a Leaf peak at 135% collects its 135%-available Seeds too, but **not** its future 200% Seed maximum.

**Deliberately strong contrasts and arithmetic:**
- **Sunrice** is a **3.25-day fast Bright Growth / 18-Leaf / 10-own-Seed** repeatable crop; **Starberry** is slower, peaks at **31 Leaves**, but gives **8 Sunrice Seeds**, not its own, making repeated transformation necessary until a later Glass Apple harvest supplies directly plantable Starberry Seeds.
- **Ghost Rice's 24 natural Dark Leaves versus Shadow Onion's 11** is a more-than-2× output distinction. Ghost Rice returns **Moonrice Seeds**, while Shadow Onion is direct self-Seeding and a simpler Dark farm.
- **Moonrice's 20 own Seeds** maintain Dim-area planting; **Thymekeeper's 28 Sunrice Seeds** instead fund Bright-field Sunrice and Starberry cultivation from a Dim area.
- **Pum'king's 46 Leaves** are a single broad premium net-**Lit** peak and **zero Seeds at every stage**; its transformation puzzle may require opposing environmental Source influences reaching the same hex while resolved Illumination is Lit.
- **Glass Apple's 58 Leaves** at a Bright 155% peak are a large late-game reward; its **24 Starberry Seeds** at 200% are a distinct, equally important reproductive improvement, permitting **Starberry to be grown from Starberry Seeds** even though Starberry itself yields Sunrice Seeds.
- No source-origin memory for the two Pum'king routes or two Glass Apple routes. Exact final Transformation requirements are deferred; every Transformation creates a new 0%-progress Plant (§58), without stage-gated eligibility (§59).

### B. Germination and actual Seed availability

Use the **approved additive per-Seed chance model** from other families: **P(success) = min(100%, number of Seeds committed × chance-per-Seed)**; all Seeds committed to the attempt are consumed whether germination succeeds or fails. Probabilities are attached to the **Seed species**, not the species producing that Seed. **—** denotes no presently produced Seeds of the target species, not a 0%-chance Seed.

| Species to plant | Chance with 1 Seed | Minimum Seeds for guaranteed germination | Sources of its Seeds |
| --- | ---: | ---: | --- |
| **Thymely** | **28%** | **4** | Thymely (Base Seed access) |
| **Sunrice** | **25%** | **4** | Sunrice, Starberry, Thymekeeper |
| **Moonrice** | **32%** | **4** | Moonrice, Ghost Rice |
| **Shadow Onion** | **30%** | **4** | Shadow Onion |
| **Starberry** | **18%** | **6** | **Glass Apple ONLY**; initial Starberry from Sunrice transformation |
| **Thymekeeper** | — | — | None; Moonrice Transformation |
| **Ghost Rice** | — | — | None; Moonrice Transformation |
| **Dillusion** | **28%** | **4** | Dillusion |
| **Pum'king** | — | — | None; Sunrice / Dillusion Transformations, absolutely sterile |
| **Glass Apple** | — | — | None; Starberry / Ghost Rice Transformations |

**Crucial source reconciliation:** **Starberry Seeds ARE actually obtainable from Glass Apple**; the initial Starberry is transformed from Sunrice and Starberry's own harvest yields only Sunrice Seeds. The earlier §38 phrasing is editorially clarified to preserve these two true facts simultaneously. A 24-Starberry-Seed Glass Apple harvest at 18% germination per Seed yields **four guaranteed Starberry plantings** at 6 Seeds each. **Thymekeeper** harvesting 28 Sunrice Seeds with 25%/Seed yields **seven guaranteed Sunrice plantings**; Moonrice's 20 own Seeds with 32%/Seed guarantee **five Moonrice plantings**. These are deliberately substantial Seed economy improvements.

### C. Core fungal Effect compatibility multipliers

**Compatibility definition:** Number **M× multiplies the magnitude of a signed emitted cultivation Effect**. For example, an ordinary +20% Leaf Yield fungus on a 2.6× compatible Plant produces **+52% Leaf Yield**, applied to existing eligible Leaves. It does **not** multiply total Leaves by 2.6 automatically. Conditional values are based on **currently resolved Illumination**; different recipients do not change a fungus's Source strength, emission direction, range or propagated footprint. Source-driven environmental Illumination changes remain **universal**. Negative emissions stay negative, not sign-inverted.

| Species | Growth Rate | Ripening Rate | Leaf Yield | Seed Yield | Germination Adjustment |
| --- | ---: | ---: | ---: | ---: | ---: |
| Thymely | 1.0× | 1.0× | 1.0× | 1.0× | 1.0× |
| Sunrice | **1.3×** | 1.1× | **1.3× ordinary / 2.0× Bright** | 1.0× | 1.0× |
| Moonrice | 1.0× | 1.1× | 0.8× | **1.4× ordinary / 2.2× Dim** | **1.2×** |
| Shadow Onion | **1.0× ordinary / 1.5× Dark** | 1.0× | 1.1× | 1.2× | 1.0× |
| Starberry | 0.9× | 1.0× | **1.3× ordinary / 2.6× Bright** | 1.0× | **1.0×** |
| Thymekeeper | 1.0× | **1.3×** | **0.5×** | **1.6× ordinary / 2.8× Dim** | — |
| Ghost Rice | 0.9× | 1.0× | **1.3× ordinary / 2.5× Dark** | 0.9× | — |
| Dillusion | **1.2×** | 1.1× | **1.2×** | 1.1× | **1.2×** |
| Pum'king | 1.1× | 1.1× | **1.0× ordinary / 2.8× Lit** | **0×** | — |
| Glass Apple | 0.9× | 1.1× | **1.2× ordinary / 3.0× Bright** | **1.8×** | — |

**Compatibility examples; these are NOT assignments of actual fungi:**
- A hypothetical **+20% Leaf Yield** emitter increases **Bright Glass Apple's 58 Leaves by +60%** (3.0× response), to **92.8 Leaves** before rounding. **Bright Starberry** responds at 2.6×: its 31 Leaves reach **47.12**. **Lit Pum'king** gets +56% (2.8×), raising 46 Leaves to **71.76**.
- A hypothetical **+20% Seed Yield** emitter acts at **2.8× Dim Thymekeeper**: 28 Sunrice Seeds × 1.56 = **43.68** before rounding. Moonrice under Dim (2.2×) becomes 20 × 1.44 = **28.8 Moonrice Seeds**.
- The same Light-shifting fungus may make one recipient's **resolved Illumination** more productive and another's less productive even though its emission direction is unchanged. **Recipient compatibility** and **native Illumination suitability** are distinct multipliers/concepts.
- **Starberry Germination compatibility is available (1.0×)** because its species' Seeds **are** obtainable via Glass Apple; this is distinct from Thymekeeper, Ghost Rice, Pum'king or Glass Apple, none of whose own species Seeds are obtainable. Germination Adjustment applies at **planting**, not directly to the living producer Plant.
- **Pum'king's Seed Yield response 0×** stays 0 across all fungal Effects and lighting states. Glass Apple's **Seed Yield affects its existing Starberry Seeds only**, never creates Glass Apple Seeds.

### D. Advanced harvest-curve and Seed timing compatibility

As above, each value scales the magnitude of the corresponding **pre-existing fungal Effect**. All effects are emitted by future fungi with their **own consistent definition and progress-eligibility windows**, not by these Plants merely because they have a high compatibility multiplier. Time-based Production only accrues while lifecycle progress advances positively, never while fully stalled or after 200%.

| Species | Harvest Window width | Leaf Peak Timing Shift | Seed Timing Shift | Time-based Production | Leaf–Seed Allocation |
| --- | ---: | ---: | ---: | --- | ---: |
| Thymely | 1.0× | 1.0× | 1.0× | 1.0× Leaves / 1.0× Seeds | 1.0× |
| Sunrice | **1.2×** | 1.1× | 1.0× | **1.2× Leaves** / 1.0× Seeds | 1.0× |
| Moonrice | 0.9× | 1.0× | **1.5×** | 0.7× Leaves / **1.8× Seeds** | **1.4×** |
| Shadow Onion | 0.8× | 1.0× | 1.0× | 1.0× Leaves / 1.0× Seeds | 1.0× |
| Starberry | **1.7×** | **1.3×** | 1.0× | **1.5× Leaves** / 0.7× Seeds | 0.9× |
| Thymekeeper | 0.7× | 0.8× | **1.8×** | 0.4× Leaves / **2.5× Seeds** | **1.7×** |
| Ghost Rice | **1.5×** | **1.4×** | 1.0× | **1.6× Leaves** / 0.8× Seeds | 0.9× |
| Dillusion | **1.3×** | 1.1× | 1.0× | 1.0× Leaves / 1.0× Seeds | 1.1× |
| Pum'king | **1.0×** | 1.2× | **0×** | **1.8× Leaves** / **0× Seeds** | **0×** |
| Glass Apple | **1.5×** | **1.3×** | **1.6×** | **1.6× Leaves** / **1.8× Seeds** | 1.2× |

**Rules:**
- **Starberry's 1.7× Window compatibility** is more useful than Sunrice's 1.2× because Starberry's native 125–150% peak is narrower. **Pum'king's 130–170% broad window** keeps an ordinary 1.0× response instead of Orchidemon-like extreme widening, while **Glass Apple's 145–170%** premium Bright peak merits 1.5×.
- **Moonrice and Thymekeeper** respond strongly to Seed Timing shifts and hourly Seed Production. This reflects their desired logistics function, but no such output occurs unless a **named future fungus** emits the corresponding existing Effect.
- **Dillusion** gets the same compatible ordinary Effects under **Dim and Lit**; no special timed switch, transition memory or invented photocharge.
- **Pum'king produces NO Seeds**, so even a Time-based Seed Production emitter or Leaf–Seed Allocation cannot make new Pum'king Seeds or any other Seed kind. Similarly, Glass Apple always produces **Starberry Seeds** and never Glass Apple Seeds.
- These window/timing Effects reshape **existing natural curves**. They do not create a second bloom, grant a second harvest, change a producer's Seed identity, or extend production past the lifecycle's final 200%.

### E. Resolved Illumination performance table (primary Spices balance)

**Central Spices identity:** The existing environmental system resolves which Illumination condition each hex has, using **Dark / Dim / Lit / Bright**. These numbers represent **species-specific native multiplier responses** to that final Condition; each cell is **lifecycle rate / ordinary Leaf AND Seed harvest output**. These are separate from emitted fungal rate/yield compatibilities. **No Plant instantly dies from a nonpreferred light state**; even a strong adverse result is a productivity penalty. These are *not* per-species modifications to source emission, falloff or propagation.

| Species | Dark: rate/output | Dim: rate/output | Lit: rate/output | Bright: rate/output |
| --- | --- | --- | --- | --- |
| **Thymely** | **0.70× / 0.65×** | 0.90× / 0.90× | **1.00× / 1.00×** | 0.90× / 0.90× |
| **Sunrice** | **0.35× / 0.20×** | 0.55× / 0.40× | **0.75× / 0.65×** | **1.00× / 1.00×** |
| **Moonrice** | 0.85× / 0.80× | **1.00× / 1.00×** | 0.85× / 0.75× | **0.55× / 0.40×** |
| **Shadow Onion** | **1.00× / 1.00×** | 0.80× / 0.75× | 0.60× / 0.45× | **0.40× / 0.30×** |
| **Starberry** | **0.30× / 0.15×** | 0.40× / 0.25× | **0.70× / 0.50×** | **1.00× / 1.00×** |
| **Thymekeeper** | 0.80× / 0.75× | **1.00× / 1.00×** | 0.70× / 0.55× | **0.40× / 0.30×** |
| **Ghost Rice** | **1.00× / 1.00×** | 0.75× / 0.60× | **0.55× / 0.40×** | **0.30× / 0.20×** |
| **Dillusion** | 0.75× / 0.75× | **1.00× / 1.00×** | **1.00× / 1.00×** | 0.75× / 0.75× |
| **Pum'king** | **0.40× / 0.25×** | 0.75× / 0.60× | **1.00× / 1.00×** | **0.70× / 0.50×** |
| **Glass Apple** | **0.25× / 0.20×** | 0.40× / 0.30× | **0.70× / 0.60×** | **1.00× / 1.00×** |

**Concrete consequences:**
- **Bright Sunrice** has an 18-Leaf native peak; just **Lit** gives **18 × 0.65 = 11.7 Leaves** plus slower lifecycle, before ordinary fungal Effects. **Bright Starberry** has 31 Leaves, but **Lit Starberry** only 15.5; losing Bright hurts its narrow high-value crop substantially.
- **Dark Ghost Rice** has 24 Leaves; **Dim Ghost Rice** has only **14.4** and **Lit Ghost Rice** has **9.6** before rounding. It remains alive and may eventually transform toward Glass Apple during a deliberately engineered lighting transition.
- **Dim Moonrice** yields 20 own Seeds; **Bright Moonrice** yields just 8 and progresses at 0.55× speed. **Dim Thymekeeper** yields 28 Sunrice Seeds; **Bright Thymekeeper** yields just 8.4 pre-rounding, so a Sunrice Seed-support hex should be kept Dim.
- **Dillusion** remains **fully productive at both Dim and Lit**, making it a stable crop near Source boundaries. This is an innate two-condition optimum, not a reward for changing light as in Aquatic's stage-conditional Silvercress.
- **Lit Pum'king** yields 46 Leaves but **Bright Pum'king** only 23. Its optimum is specifically net Lit, validating the Source overlap puzzle. The former overlapping Sources do not need to remain active for the species identity to persist after Transformation, unless they are still needed as ordinary environmental engineering.
- **Bright Glass Apple** yields 58 Leaves, but **Lit Glass Apple** yields 34.8, and its eventual Starberry Seed output is also reduced to 60% under merely Lit by this default harvest multiplier. Bright zones matter for both of its production routes.
- All light penalties are responsive to **current resolved Illumination** for the Plant's **future growth and incremental output while that condition holds** (§65), not immutable source-origin 'attunements', retroactive revaluation of already earned production, plant species changes, instant death, or an invented Light Charge.

### F. Moisture and Temperature conditions, hazard thresholds

**Species use the usual resolved conditions:** Moisture **Dry / Damp / Flooded**, Temperature **Freezing / Cold / Temperate / Warm / Hot**, and the independent **Mycelial material overlay**. This pass does not add a mandatory Sand/Clay/Dirt/Fertility interaction, as those environmental Properties remain under review. A fungus adjusting Temperature, Moisture or Illumination affects the **same resolved environment** regardless of what Plant is there; Plants respond differently without changing emission rules.

**Moisture multipliers**, in an otherwise ideal Temperature and Light. Each cell is **lifecycle rate / ordinary output**; Damp = 1.0× baseline across the Spices family:

| Species | Dry: rate/output | Damp: rate/output | Flooded: rate/output | Continuous Dry death |
| --- | --- | --- | --- | ---: |
| Thymely | 0.55× / 0.55× | 1.0× / 1.0× | 0.80× / 0.80× | **72 h** |
| Sunrice | 0.45× / 0.50× | 1.0× / 1.0× | 0.70× / 0.70× | **48 h** |
| Moonrice | 0.55× / 0.55× | 1.0× / 1.0× | 0.75× / 0.75× | **72 h** |
| Shadow Onion | 0.60× / 0.60× | 1.0× / 1.0× | 0.75× / 0.75× | **72 h** |
| Starberry | 0.40× / 0.40× | 1.0× / 1.0× | 0.70× / 0.65× | **48 h** |
| Thymekeeper | 0.50× / 0.50× | 1.0× / 1.0× | 0.75× / 0.75× | **72 h** |
| Ghost Rice | 0.50× / 0.50× | 1.0× / 1.0× | 0.65× / 0.65× | **72 h** |
| Dillusion | **0.65× / 0.65×** | 1.0× / 1.0× | 0.80× / 0.80× | **96 h** |
| Pum'king | 0.45× / 0.45× | 1.0× / 1.0× | 0.70× / 0.70× | **48 h** |
| Glass Apple | 0.40× / 0.40× | 1.0× / 1.0× | 0.65× / 0.65× | **48 h** |

**Temperature and Mycelial exposure limits** (all are **continuous** in-game hours, resetting when the corresponding harmful condition actually ends, not when a fungus Source is merely removed while an overlay remains):

| Species | Preferred nonextreme Temperature | Hot death | Freezing death | Mycelial death |
| --- | --- | ---: | ---: | ---: |
| Thymely | **Temperate** | **72 h** | **72 h** | **48 h** |
| Sunrice | **Temperate / Warm** | 72 h | 72 h | 48 h |
| Moonrice | **Temperate / Cold** | 72 h | 72 h | 48 h |
| Shadow Onion | **Temperate / Cold** | 72 h | 72 h | 48 h |
| Starberry | **Temperate / Warm** | **48 h** | **48 h** | **36 h** |
| Thymekeeper | **Temperate / Cold** | 72 h | 72 h | 48 h |
| Ghost Rice | **Temperate / Cold** | 72 h | 72 h | **36 h** |
| Dillusion | **Temperate / Warm** | **96 h** | 72 h | **72 h** |
| Pum'king | **Temperate / Warm** | **48 h** | **48 h** | **36 h** |
| Glass Apple | **Temperate / Warm** | **48 h** | **48 h** | **36 h** |

**Shared first-pass quantitative consequences:** Hot and Freezing each multiply **lifecycle rate and ordinary output by 0.5×** until resolved temperature changes or a continuous lethal threshold is reached; they are harmful **extreme Temperatures** for every Spices Plant (no Desert-style extreme adaptation). For a nonideal **Cold/Temperate/Warm** condition *outside* a Plant's listed preferred Temperature states, use **0.85× rate and ordinary harvest output**, replacing (not stacking with) any other moderate-temperature penalty; preferred states are 1.0×. **Mycelial** multiplies both normal lifecycle rate and ordinary output by **0.5×**, while also advancing the independent fatal exposure clock. Hazard timers continue counting even when progress is fully stalled; Time-based Production requires positive lifecycle progress. **Flooded** imposes its listed penalties without inventing an extra universal Flooded death clock in this first pass.

**Stacking clarification:** Species environmental factors (e.g., Lit × Dry × Cold) alter natural rate/output before separately emitted fungus cultivation Effects are applied according to their defined direction and compatibility; do not silently use a single generic light factor to replace the detailed Spices table. The exact rounding of fractional Leaves or Seeds and extreme stacking safeguards belong to the later implementation/testing pass; no artificial balance cap is asserted here. **No Spices Plant gets a native Mycelial benefit.**

### G. Transformation/network feasibility and pending game design decisions

1. **Pum'king** can originate from **Sunrice OR Dillusion**. The conserved first-pass Plant-owned recipe direction is **two appropriate, oppositely directed Luminous Source influences simultaneously reaching the target while the resolved hex state is Lit**. Historical names **Glimmer and Veil** are NOT assignments, and the recipe's source ranges, source types, duration, and event priority are still open. The later fungus/recipe pass must prove that **net Lit is reachable under the actual environment's clamping, blockers and propagation**; do not mistake Source presence for final resolved Illumination. The transformed Pum'king **starts at 0%** and must be able to grow into its **46-Leaf** plateau (§58).
2. **Glass Apple** comes from **Starberry OR Ghost Rice**. Both become the same **Bright-optimized 58-Leaf Glass Apple**, with **24 Starberry Seeds** at late harvest. **Ghost Rice is happiest in Dark**, yet it must be able to survive and complete the specified future Dark→Lit/Bright engineering pathway. The newly transformed Glass Apple starts at **0%** and then develops toward its own 155% Leaf peak or later Seed harvest. **No origin-dependent attunement** (§58).
3. **Starberry**'s own **8 Sunrice Seeds** and **Glass Apple's 24 Starberry Seeds** form a two-stage reproductive loop. The **Starberry germination chance is a real 18%/Seed**, not N/A. At first unlock the player still transforms Sunrice into Starberry; Glass Apple eventually makes direct Starberry planting possible. Future fungi may improve or hinder Seed Yield and Seed Timing, but **never change the Plant's established Seed species**.
4. **Thymekeeper** grows **28 Sunrice Seeds in Dim**; **Moonrice** grows **20 Moonrice Seeds in Dim**. Those distinct Seed identities are the reason Moonrice → Thymekeeper creates cross-light farming support instead of a redundant Dim Seed farmer.
5. **Ghost Rice** makes **11 Moonrice Seeds**, contrasting with **Shadow Onion** yielding **11 Shadow Onion Seeds** from its simpler Dark crop. Both keep their Dark habitat identities; do not redesign roles just because both like Dark.
6. **One Plant-consuming harvest** at a chosen progress; no extra Leaf/Seed harvest toggles, Light conversion currencies, third progress stage or fungal Secondary Bloom. Fungal Time-based Production only accrues with advancing lifecycle and only inside the emitter's window, not because of compatible plant traits alone.
7. **Names are temporary**. The future Spices naming pass should produce believable game cooking spices and preserve the species graph, Seed identities, traits, stage times, environment responses and transformation feasibility. The separate Ingredients family now has **one Base Plant that can transform directly into every terminal Ingredient**; only Base Seeds start unlocked. §41 supersedes the earlier no-transformations statement. Terminal species Seed identities still need user review.
8. **No code changes** until all Plant, Fungus and Transformation design passes and explicit implementation request. First numerical extremes deliberately strong: Bright Glass Apple 58 Leaves / 24 Starberry Seeds, Lit Pum'king 46 Leaves / 0 Seeds, Bright Starberry 31 Leaves / 8 Sunrice Seeds, Dark Ghost Rice 24 Leaves / 11 Moonrice Seeds, Dim Thymekeeper 28 Sunrice Seeds, and sharp off-optimal Light penalties. Evaluate **sustained useful Leaves per occupied hex-day** including Seed sinks, fungus hex occupancy, failed transformations, and harvest timing in eventual tester playtests.

**Approval status:** All ten Spices profiles (§§37–39) and the entire §40 numerical pass are **APPROVED as first-pass balance**. The user then revised Ingredients to one universal transforming Base (§41). Tester playtesting remains planned later. No fungal roster, final transformations, or implementation were assigned.


## 41. Ingredients — AGREED new one-Base star-transformation architecture

**Status:** After approving **all Spices §40 numerical values**, the user expressly **replaced** the earlier Ingredients exception that banned transformations: **"one base plant that transforms, but this one can turn into all others in the family and no other plant can transform."** This is an **AGREED** family-wide design direction, not a proposal. Update authoritative architecture in the top overview, §15, §17 and relevant later Spices notes accordingly. The Ingredients six-part profiles and concrete species choice that follow remain **new separate proposals subject to review**.

~~~text
                     ┌──> Ingredient 1 [terminal]
                     ├──> Ingredient 2 [terminal]
One Base Ingredient ─┼──> Ingredient 3 [terminal]
                     ├──> Ingredient 4 [terminal]
                     ├──> Ingredient 5 [terminal]
                     └──> ... every other Ingredient [terminal]
~~~

**Binding implications:**
1. Exactly **one Base Ingredient species** can transform and it has a **direct eligible route to every other Ingredient**, with no prerequisite Ingredient stages and no transforming non-Base branch.
2. **Every other Ingredient is terminal**. A terminal Ingredient cannot transform into any species—not even the Base or another Ingredient—even if it is grown later from its own Seeds. The prohibition is about **Plant species' outgoing transformations**, not about Fungi influencing ordinary Growth/Yield/Seed behavior.
3. **Only the Base Ingredient's Seeds are given initially**, matching the other transforming family starter principle. Species-specific own/other/no Seed harvest behavior is decided separately in profiles; for simple sustainable cooking staples, **own Seeds** are a sensible default proposal but are not forced by the transformation graph.
4. All Plants retain **0–200% Growth/Ripening**, their unique Leaf/Seed curves, one destructive harvest, incremental Seed planting probabilities, environment Responses and existing fungal Effect compatibility. **Transformation replaces the old Plant with a new instance starting at 0%**, without inherited product or exposure state (§58).
5. **Only Base-owned direct transformation recipes** are to be designed in a future recipe pass, after Plant profiles and fungal roster; no fungus emits a generic Transformation Effect. These recipes may differ in required standard fungus presence, ordinary Influence receipt, resolved Conditions or time, but the user did not lock exact conditions.
6. Preserve the distinction: **Ingredients yields familiar cooking staples** for the future RPG; **Spices** uses the already-approved older ten-species Illumination puzzle network with later Spice-appropriate naming. Do not conflate their inventories or require cooking-system mechanics now.
7. The previous statements that Ingredients has *no transformations* or requires separate direct Seed unlocks for every species are **SUPERSEDED**. §41 is the controlling newest architecture. The exact roster/Base identity and numeric balance remain open.
8. **Design-only: no game code changes** until the user requests implementation.

## 42. Ingredients — approved Base, seven-species roster, and first four profiles (APPROVED first-pass profiles)

**Status:** The user **APPROVED the seven-species Ingredients roster**, **Potato as the sole transforming Base**, and the complete first four six-part profiles for **Potato, Rice, Carrot and Onion**, without requested changes. The six terminal species are **Rice, Carrot, Onion, Apple, Pumpkin, and Strawberry**. All six remain directly accessible by **Potato-only outgoing transformations**. The remaining three profiles are proposed for review in §43; a whole-family numerical pass follows their approval. No fungus assignments, recipes or game code.

### Approved direct star network and roster

~~~text
Potato (APPROVED Base)
  ├──> Rice [terminal]
  ├──> Carrot [terminal]
  ├──> Onion [terminal]
  ├──> Apple [terminal; §43 proposal]
  ├──> Pumpkin [terminal; §43 proposal]
  └──> Strawberry [terminal; §43 proposal]
~~~

**Family intent:** These are familiar, productive staples, with variation through lifecycle pacing, ordinary environmental preferences, Leaf/Seed output and compatibilities. They should not require each Plant to gain a new magical ability. **"Leaves" remains a temporary gameplay term for the non-Seed harvested product**; it does not require edible potato leaves. All six terminal Ingredients have **zero outgoing Transformation routes**, irrespective of direct Seed farming.

### Potato — APPROVED first-pass six-part Base profile

| Part | First-pass proposal |
| --- | --- |
| **Natural lifecycle** | **Standard 4 days Growth and 8 days total to 200%**, deliberately uncomplicated Base. |
| **Natural harvest** | **10 non-Seed units around 100%** and **10 Potato Seeds at 200%**. A broad regular harvest curve. |
| **Germination** | **Reliable normal additive germination**, exact chance later; **only Potato Seeds initially available** for this family. |
| **Environment** | Prefers **Damp, Temperate, Lit**, tolerates Dim and Warm with modest penalties, Dry survivable briefly at reduced output, Flooded underperforms, and continuous Hot/Freezing/Mycelial eventually lethal. No permanent Material requirement. |
| **Farming purpose** | Straightforward Seed loop and **single access point to all six proposed other cooking Ingredients**. It shouldn't have a powerful unique fungus-effect multiplier. |
| **Effect compatibility** | Baseline **1.0×** standard emitted Growth/Ripening, Leaf/Seed Yield, timing/window, time-based production, germination and allocation Effects. **Only Potato's species has outgoing Plant-owned transformations**. |

### Rice — APPROVED first-pass six-part terminal profile

| Part | First-pass proposal |
| --- | --- |
| **Natural lifecycle** | **Ordinary-to-slightly-slow Growth**, ordinary Ripening; not an extreme crop. |
| **Natural harvest** | **Moderate non-Seed produce** near ~110% and **high Rice Seed output** near 200%. Produces **its own Rice Seeds**. One consuming harvest. |
| **Germination** | **Rice Seeds become available by harvesting Rice** after first transforming Potato → Rice. Ordinary-to-good Rice germination; no Rice Seeds initially awarded. |
| **Environment** | Best **Flooded/Damp, Temperate/Warm, Lit**; remains viable in Damp but with reduced output relative to Flooded, Dry significantly suppresses progress/output and eventually kills, Mycelial and extreme Temperatures eventually lethal. Flooded preference provides a simple moisture distinction without adding a novel Aquatic-style dormancy/attunement rule. |
| **Farming purpose** | **Reliable staple Seed supplier** that can be cultivated directly once Rice Seeds are unlocked; meaningful contrast to the fast Leaf-oriented Carrot, without overshadowing Aquatic's exceptional water specialists. |
| **Effect compatibility** | Moderately enhanced **Seed Yield and Seed Timing Shift** response, ordinary lifecycle and Leaf Yield responses, useful Time-based Seed Production compatibility only if a future named fungus emits it. **No Rice transformations**, ever. |

### Carrot — APPROVED first-pass six-part terminal profile

| Part | First-pass proposal |
| --- | --- |
| **Natural lifecycle** | **Quick Growth and relatively quick overall Ripening**, supporting frequent harvest rotations. |
| **Natural harvest** | **Strong early non-Seed output near 95–100%**, meaning Carrot can be harvested at the Growth/Ripening boundary, with **fewer own Carrot Seeds near 200%** than Potato. |
| **Germination** | **Good own-Seed germination** once Potato → Carrot is first accomplished; initially no Carrot Seeds. |
| **Environment** | Prefers **Damp, Temperate, Lit/Bright**, Dry/Flooded reduce output, Hot/Freezing and persistent Mycelial hazardous. No soil Material-specific exception. |
| **Farming purpose** | **Quick, easy non-Seed produce turnover**, contrasting with Rice's slower Seed-oriented farming. Carrot should be a useful repeat rotation, not an intermediate Ingredient. |
| **Effect compatibility** | Strong-ish **Growth acceleration and Leaf Yield** compatibility, modest Seed effects, useful Harvest Window adjustment for the early peak. **No outgoing transformations**. |

### Onion — APPROVED first-pass six-part terminal profile

| Part | First-pass proposal |
| --- | --- |
| **Natural lifecycle** | **Somewhat slow Growth**, ordinary-to-moderately-slow Ripening; trades speed for a generous harvest. |
| **Natural harvest** | **Good/high non-Seed produce around 125–135%** with a broad and forgiving window, plus a **moderate number of own Onion Seeds** at 200%. Not a narrow Flower specialist or sterile prestige endpoint. |
| **Germination** | **Ordinary own-Seed germination**; new Onion Seeds come from Onion's one-time Seed harvest after the initial Potato → Onion unlock. |
| **Environment** | Prefers **Damp, Temperate/Cold, Dim/Lit**, tolerates Dry better than Rice/Carrot at a noticeable output cost; Flooded bad, Hot/Freezing and Mycelial hazardous. |
| **Farming purpose** | **Low-attention, broad-window non-Seed farming** at a slower overall pace; useful for ordinary stable harvests rather than a magical environmental puzzle. |
| **Effect compatibility** | Above-average **Harvest Window/Leaf Yield** compatibility, ordinary Growth, Ripening and Seed responses. **No outgoing transformations**. |

### First proposed batch comparison

| Ingredient | Base/terminal | Natural rotation niche | Seed harvest identity |
| --- | --- | --- | --- |
| **Potato** | **APPROVED Base** | Standard, self-sustaining, transforms directly to every other Ingredient | Potato |
| **Rice** | Terminal | Moisture-preferring slower Seed crop | Rice |
| **Carrot** | Terminal | Quick early produce turnover | Carrot |
| **Onion** | Terminal | Slower broad-window produce | Onion |

**Approval status:** The **Potato Base and seven-species roster are APPROVED**, along with the **Potato, Rice, Carrot and Onion** six-part profiles and their stated approximate natural peak timings/preferences. Apple, Pumpkin and Strawberry have **new proposed profiles in §43**, pending review. Then proceed to the full Ingredients numerical pass. No fungi, final recipes or game code changed.


## 43. Ingredients — final three six-part Plant profiles: Apple, Pumpkin, Strawberry (APPROVED first-pass profiles)

**Status:** The user approved **Potato as Ingredients Base**, the **seven-species roster Potato/Rice/Carrot/Onion/Apple/Pumpkin/Strawberry**, and all of §42's Potato, Rice, Carrot and Onion first-pass profiles. This final six-part profile batch covering **Apple, Pumpkin, Strawberry** was **APPROVED by the user** without changes, completing all seven Ingredients profiles. The established family graph is a single star: **Potato may transform directly into all six terminal Ingredients, and no other Ingredient may transform, ever**. As agreed, all seven remain ordinary growing crops with 0–200% progress, one consuming harvest, Seed germination and existing fungal cultivation/environment response. **No invented Ingredient-to-Ingredient transformations**, no new fungus roster or recipes, and no game code.

### Approved transformation graph

~~~text
Potato (the ONE transforming Base)
  ├──> Rice [terminal]
  ├──> Carrot [terminal]
  ├──> Onion [terminal]
  ├──> Apple [terminal]
  ├──> Pumpkin [terminal]
  └──> Strawberry [terminal]
~~~

**Identity of the Produce:** The currently universal non-Seed output still has the provisional gameplay name **Leaves**. In the later RPG mapping it can represent edible produce such as an apple, pumpkin or strawberry as appropriate. This does **not** assert that eating the literal plant's leaves is the purpose. No additional ingredient inventory conversion rules are being introduced during the Plant-first design phase.

### Apple — APPROVED first-pass six-part terminal profile

**Core identity:** A **patient mid-to-late harvest specialist** with a rewarding but reasonably forgiving ordinary non-Seed crop and respectable self-Seeding. Apple should feel worth waiting for, rather than duplicating Onion's earlier 125–135% broad harvest or Pumpkin's very late large return.

| Category | Proposed first-pass design |
| --- | --- |
| **Natural lifecycle** | **Somewhat slow Growth**, followed by **moderately long Ripening**. An Apple cultivated from newly planted Apple Seeds takes appreciably longer to reach its optimum than the rapid Carrot or Strawberry; a Potato→Apple transformation likewise starts a new Apple at 0% (§58). |
| **Natural harvest** | **Strong, sustained non-Seed produce near ~150% lifecycle progress**, across a **fairly generous ~135–175% productive interval**. Produces **good/moderate Apple Seeds at 200%**, rather than none, with existing Seeds and Leaves coharvested if available at the one chosen harvest percentage. The broad mid-late window distinguishes it from Strawberry's shorter sharp peak. |
| **Germination** | **Own Apple Seeds**, with ordinary-to-good germination. Only Potato Seeds are initially unlocked; a successful first Potato→Apple and late Seed harvest can unlock direct Seed-grown Apples for sustainable future rotations. Apple Seed-grown instances remain terminal; they cannot transform. |
| **Environment** | Prefers **Damp, Temperate/Cold, Lit/Dim**. **Warm** remains viable with some growth/yield penalty, **Bright** is viable but not optimal, and **Dark** lowers production. **Dry and Flooded** impose real production penalties; prolonged Dry, Hot, Freezing or Mycelial eventually kills. No special Source propagation, Material, Fertility or apple-tree mechanic. |
| **Farming purpose** | **Good dependable mid-late non-Seed output with a reasonable window**, more patient and higher maximum than early Carrot, without Pumpkin's larger late peak. A repeatable and recognizable kitchen ingredient worth cultivating after its first Base transformation. |
| **Effect compatibility** | **Good Ripening acceleration and ordinary-to-strong Leaf Yield** response, **moderately enhanced Harvest Window adjustment** despite an already forgiving natural interval, and normal Seed Yield/Germination. Time-based Leaf production is possible **only if a fungus actually emits it while Apple is making positive progress in the emitter's window**; no intrinsic hourly bonus or unneeded new Effect. |

**Concrete first-pass curve:** a single peak centered near **150%**, productive **135–175%**; exact quantity and phase durations are deferred to the complete Ingredients numerical pass. The **Apple Seed species identity is Apple**, not Potato or another Ingredient.

### Pumpkin — APPROVED first-pass six-part terminal profile

**Core identity:** The **slow, heavy late-harvest specialist**: deliberately the family's strongest natural **single-Plant non-Seed yield**, with a substantial time and timing commitment. This must not be a second sterile prestige endpoint: Ingredients are straightforward sustainable food crops, so Pumpkin maintains its **own Seeds**.

| Category | Proposed first-pass design |
| --- | --- |
| **Natural lifecycle** | **Slow Growth and notably long Ripening**, the slowest of the proposed seven Ingredients. Growth/Ripening remain the usual 0–100% / 100–200% stages; Pumpkin gets **no new third stage** and no intrinsic timer-based yield. |
| **Natural harvest** | **Large natural non-Seed harvest at a late single peak around ~170%**, with its main productive interval roughly **155–185%**—a relatively demanding later target. At **200%** it supplies **moderate own Pumpkin Seeds**, sufficient for continued cultivation, but harvesting at 170% sacrifices part or most of the eventual full Seed harvest. One destructive harvest only. |
| **Germination** | **Pumpkin Seeds produce Pumpkin directly** with ordinary-to-moderate germination, first obtained only after a **Potato→Pumpkin** transformation and subsequent Seed harvest. Because its rotation is slow, direct Pumpkin planting after the unlock is a meaningful convenience; Pumpkin has **no outgoing transformation routes**. |
| **Environment** | Prefers **Damp, Warm, Lit/Bright**. **Temperate** remains viable at moderately reduced rate/output; **Cold** slows it substantially, **Dry** is survivable but reduces its eventual non-Seed yield, **Flooded** unfavorable. **Hot** is hazardous and eventually lethal (Warm is ideal but extreme Hot is NOT a bonus); **Freezing/Mycelial** are also lethal with prolonged exposure. Material Sand or Fertility are not required. |
| **Farming purpose** | **High natural yield per successful harvest** for patients who can keep a productive Warm crop alive through a long Ripening stage. A qualitatively different optimization from Carrot's fast turnover, Strawberry's fast precise harvesting, Apple/Onion's more forgiving intervals and Rice's Seed production. |
| **Effect compatibility** | **Strong Leaf Yield response**, **good Ripening acceleration** (reduces the considerable wait) and **good Harvest Peak Timing Shift** utility for planning the late target; **moderate Harvest Window widening** helps timing without making the window as easy as Onion's. Ordinary Seed Yield/Germination responses. It can benefit from fungus-emitted Time-based Leaf Production within eligible windows but **never emits time-based production intrinsically**. |

**Specific no-preemptive-nerf note:** The eventual full-family numeric pass should give Pumpkin a **clearly highest single-harvest natural yield** among Ingredients to compensate for its much longer lifecycle, without automatically making it best Leaves per occupied hex-day. Its self-Seeds preserve the family goal of sustainable straightforward farming rather than a complicated sterile chain.

### Strawberry — APPROVED first-pass six-part terminal profile

**Core identity:** **Fast, high-output, tightly timed repeat harvesting**, distinct from Carrot's straightforward **95–100% early harvest** and Apple/Pumpkin's later targets. It should offer a strong reward to a player who regularly checks for the correct moment, without becoming a Flower-style multi-peak or transformation-timing puzzle.

| Category | Proposed first-pass design |
| --- | --- |
| **Natural lifecycle** | **Very fast Growth and relatively quick Ripening**, probably the quickest start-to-finish Ingredient. Strawberry does not require a new phase; its fast rate simply compresses the time between sowing and harvest. |
| **Natural harvest** | **High-for-its-speed Leaves/non-Seed produce at a narrow peak around ~115%**, with a main productive interval about **105–125%**. The peak is **later than Carrot's 95–100%** and **significantly narrower**, so it trades harvesting convenience for better natural peak yield. **Modest own Strawberry Seeds** at 200%, with low or absent full Seed quantities at its early Leaf maximum. |
| **Germination** | **Own Strawberry Seeds** and **good additive per-Seed germination**, allowing direct Strawberry planting once Potato has first become Strawberry and a later harvest has supplied Seeds. Initial Ingredients inventory remains **Potato Seeds only**. All Strawberry instances—including those grown from Seeds—have **no outgoing transformations**. |
| **Environment** | Best in **Damp, Temperate/Warm, Bright/Lit** with especially good performance at Bright but still viable at Lit. **Dim/Dark** weaken Leaf output appreciably, **Dry and Flooded** hurt production and sustained Dry can kill quickly. **Hot/Freezing/Mycelial** are dangerous/lethal over exposure. No extra illumination-charge or Fruit-Storage resource. |
| **Farming purpose** | **Fast, high-attention Leaf/Produce turnover**, for a player choosing close monitoring and frequent short rotations rather than a few larger, slower crops. The need to spend a rotation collecting its own Seeds limits permanently harvesting exclusively at the narrow Leaf peak. |
| **Effect compatibility** | **Strong Growth acceleration and Leaf Yield responses**, **very strong Harvest Window widening compatibility** because its normal 105–125% peak is hard to hit at full speed, and useful Leaf Timing Shift to schedule its rapid harvest. Modest Seed Yield compatibility, ordinary-to-good Germination. Any time-based production is fungus-emitted only during positive advancing progress in the proper window. |

**Distinctness safeguard:** **Carrot's** early 95–100% harvest is **fast and relatively forgiving**, with a strong basic yield. **Strawberry** reaches a slightly later 115% peak in a **much narrower interval**, producing a notably higher natural harvest but requiring precise attention. Its high Window widening response does not create a second bloom or extra harvest.

### Seven-Ingredient species roles, approved versus proposed

| Species | Transformation status | Role | Own Seeds? | Profile status |
| --- | --- | --- | --- | --- |
| **Potato** | **ONLY transforming Base** | Ordinary dependable starter, direct access to all other Ingredients | **Yes, Potato** | **APPROVED** |
| **Rice** | Terminal | Damp/Flooded Seed supplier | **Yes, Rice** | **APPROVED** |
| **Carrot** | Terminal | Quick early broad Leaf/Produce harvest | **Yes, Carrot** | **APPROVED** |
| **Onion** | Terminal | Slower, broad, forgiving mid-Ripening produce | **Yes, Onion** | **APPROVED** |
| **Apple** | Terminal | Patient, mid-late large forgiving produce | **Yes, Apple** | **APPROVED** |
| **Pumpkin** | Terminal | Strongest single natural produce, slow late peak | **Yes, Pumpkin** | **APPROVED** |
| **Strawberry** | Terminal | Very quick, strong narrowly timed produce | **Yes, Strawberry** | **APPROVED** |

**Approval status:** The user **APPROVED all seven Ingredients first-pass profiles and the Potato-only star transformation network**, including Apple, Pumpkin and Strawberry's approximate natural peaks, environments and compatibility roles. **§44 is the complete Ingredients numerical pass PROPOSED for review**. Tester playtesting remains planned after eventual implementation. No fungi, final recipes, or game code changed.


## 44. Ingredients — complete numerical pass (APPROVED first-pass balance)

**Status:** The user **APPROVED every Ingredients six-part profile (§§42–43)**—Potato, Rice, Carrot, Onion, Apple, Pumpkin, Strawberry—and requested the **full numerical pass**. This complete first-pass balance of all seven species was **APPROVED by the user**, including stage durations, non-Seed/Seed outputs, Seed chances, core/advanced Effect compatibility, environmental multipliers and hazard timers. The **one-Potato-Base star-shaped Transformation graph is already APPROVED**: Potato alone transforms directly into all six terminals, no other Ingredient ever transforms. Every Ingredient produces **its OWN Seeds**, initially **only Potato Seeds are available**, and a direct Seed-grown terminal crop still cannot transform. Keep the original standard Growth/Ripening, one consuming harvest, per-Seed additive germination and ordinary environmental/fungal Effects; **§58 supersedes the old progress-preservation assumption**. All §44 numeric values are **APPROVED as first-pass balance**, subject to later real tester playtesting and possible revision. **No fungus assignments, named recipes, new production system, or code implementation.**

### A. Natural lifecycle, harvest shape and own-Seed identity

Under each Plant's **optimal ordinary environment**, and **before fungal Effects**, its hypothetical 0%-progress natural stage times and harvest maxima are:

| Ingredient | Days 0–100% (Growth) | Days 0–200% (TOTAL) | Natural non-Seed (Leaf/Produce) peak | Own Seeds at 200% | Main productive Leaf interval |
| --- | ---: | ---: | --- | ---: | --- |
| **Potato (ONLY Base)** | **4.0** | **8.0** | **10 at 100%** | **10 Potato** | **90–130%**, forgiving |
| **Rice** | **4.75** | **9.5** | **8 at 110%** | **22 Rice** | **100–140%**, modest Leaves |
| **Carrot** | **2.5** | **6.0** | **16 at 95%** | **6 Carrot** | **85–115%**, early/forgiving |
| **Onion** | **4.75** | **9.5** | **19 at 130%** | **10 Onion** | **110–160%**, broad |
| **Apple** | **5.5** | **11.5** | **26 at 150%** | **12 Apple** | **135–175%**, generous |
| **Pumpkin** | **6.5** | **14.0** | **42 at 170%** | **9 Pumpkin** | **155–185%**, late/high |
| **Strawberry** | **2.25** | **5.5** | **22 at 115%** | **7 Strawberry** | **105–125%**, narrow |

**Interpretation:** 0–200% TOTAL days **include** Growth. A Potato→terminal Transformation creates a **new 0%-progress terminal Plant**, which must advance through its own full Growth/Ripening stages (§58), rather than inheriting Potato's current progress. A Plant can be harvested with Leaves available even **before 100%** (especially Carrot's **95%** peak); a single harvest removes it and collects **all eligible Seeds and Leaves** at that progress, with no separate Leaf/Seed choice. The two maxima shown are typically different optimal timings, not simultaneously guaranteed full amounts. A Seed-growing rotation harvested near the terminal's late 200% returns most Seeds, while repeated early Leaf harvests may need occasional late Seed cycles. Intermediate Leaves/Seed amounts should use coherent per-species curves interpolated later; no unstated second harvest, per-hour innate production, extra stage, or permanent Fruit inventory is introduced.

**Planned shape and differentiation:**
- **Potato** retains the standard **4/8 days, 10 Leaves/10 Potato Seeds** benchmark.
- **Rice** trades weak **8 Leaves** and a slow **9.5-day** total lifecycle for **22 own Seeds**; Flooded Moisture is optimal unlike most other Ingredients.
- **Carrot** is quick and forgiving at **16 Leaves at 95%**—a genuinely useful harvest **during Growth**—but produces only **6 own Seeds** at the full late outcome. Its 85–115% width is broader than Strawberry's.
- **Onion** is moderately slow, stable and forgiving: **19 Leaves at 130%**, broad **110–160%**, and **10 own Seeds** at 200%.
- **Apple** has **26 Leaves at 150%**, a broad **135–175%** interval, and **12 own Seeds**, rewarding a more patient crop without hard timing.
- **Pumpkin** has the family's **clearly highest natural single harvest, 42 Leaves around 170%**, compensated by a **14-day** overall lifecycle, a **155–185%** productive interval, only **9 own Seeds**, and a desire for **Warm** but not lethal Hot.
- **Strawberry** is the **fastest overall (5.5 total days)** and has a high-for-its-speed **22 Leaves around 115%**, but an unforgiving **105–125%** peak width and just **7 own Seeds**. Compared with Carrot's **95%/16-Leaf** early broad harvest, Strawberry is more productive per timely harvest but demands closer attention and periodic Seed farming.
- These Ingredient numbers need **not** be artificially limited below magical Family outputs. The total farming economics involve Seed cycles, occupied hex-days, fungi and missed harvest opportunities. No conservative adjustment before tester playtests.

### B. Germination: Seed costs and starter access

The global planting rule is **P(success) = min(100%, n × one-Seed probability)**, with **ALL n Seeds consumed** on success or failure. Chances are identified by **the species planted**, and every Ingredient Seed is initially available only through Potato's six transformation routes except for starter **Potato Seeds**. Every Ingredient **produces its own species' Seeds** at Ripening harvest; the terminal crops remain terminal even when directly Seed-grown.

| Seed species | 1 Seed chance | Minimum Seeds for guaranteed germination | Natural 200%-Seed harvest | First access |
| --- | ---: | ---: | ---: | --- |
| Potato (Base) | **28%** | **4** | **10 Potato** | **Starter Seeds available** |
| Rice | **30%** | **4** | **22 Rice** | Potato → Rice |
| Carrot | **38%** | **3** | **6 Carrot** | Potato → Carrot |
| Onion | **26%** | **4** | **10 Onion** | Potato → Onion |
| Apple | **25%** | **4** | **12 Apple** | Potato → Apple |
| Pumpkin | **20%** | **5** | **9 Pumpkin** | Potato → Pumpkin |
| Strawberry | **35%** | **3** | **7 Strawberry** | Potato → Strawberry |

**Guaranteed-return checks:** Rice's 22 Seeds fund **five guaranteed Rice plantings + 2 leftovers**; Carrot's 6 fund **two guaranteed Carrots**; Onion's 10 fund **two Onion plantings + 2 leftovers**; Apple's 12 fund **three Apple plantings**; Pumpkin's 9 fund **one Pumpkin + 4 leftovers**; Strawberry's 7 fund **two Strawberry plantings + 1 leftover**. The need to dedicate some Plants to Seed harvests rather than always harvesting early Leaves is a central **Leaf-per-hex-day** constraint, especially for fast Carrot and Strawberry.

### C. Core fungal Effect-compatibility multipliers

All entries scale **only the signed magnitude of an already emitted fungal Effect**, not the Plant's entire native output. A positive +20% fungus with 1.8× recipient compatibility contributes +36% eligible Leaf Yield, while a negative −20% effect still decreases output by a magnified amount. **Source emission direction/range/environment propagation is globally consistent**; species compatibilities do not multiply a Light/Heat/Water Influence's environmental level. No fungus universally transforms Ingredients: **only Potato can have Plant-owned Transformation recipes**.

| Ingredient | Growth Rate | Ripening Rate | Leaf Yield | Seed Yield | Germination Adjustment |
| --- | ---: | ---: | ---: | ---: | ---: |
| **Potato** | **1.0×** | **1.0×** | **1.0×** | **1.0×** | **1.0×** |
| **Rice** | **0.9×** | **1.1×** | **0.9×** | **1.8×** | **1.0×** |
| **Carrot** | **1.9×** | **1.2×** | **1.5×** | **0.65×** | **1.3×** |
| **Onion** | **0.9×** | **1.1×** | **1.5×** | **1.0×** | **0.9×** |
| **Apple** | **0.9×** | **1.5×** | **1.6×** | **1.1×** | **1.0×** |
| **Pumpkin** | **0.75×** | **1.7×** | **2.0×** | **0.9×** | **0.8×** |
| **Strawberry** | **2.1×** | **1.3×** | **1.8×** | **0.8×** | **1.3×** |

**Examples, NOT fungal assignments:**
- A fungus emitting **+20% Leaf Yield** on an otherwise optimal **Pumpkin** gets **2.0× compatibility** and thus adds **+40% to its 42-Leaf natural peak**, yielding **58.8 Leaves before integer rounding**. The same fungus on a Strawberry gets **+36%** and produces **22 × 1.36 = 29.92 Leaves** at its narrow best timing.
- A hypothetical **+20% Seed Yield** on **Rice** gets **1.8× response** and thus **+36%**, raising **22 Rice Seeds to 29.92 before rounding**. The same emitter on Carrot gets only 0.65× response (+13%), raising 6 to **6.78 before rounding**.
- A **+20% Growth Rate** emitter is scaled by **2.1× on Strawberry** and **1.9× on Carrot**, creating real fast-rotation synergy without granting another harvest or changing timing curves by itself.
- The additive **Germination Adjustment** is applied when **planting that Ingredient's own Seeds**, never to a pre-existing Plant instance. Terminal Seed-grown species remain ineligible for Transformations.

### D. Advanced timing, window, hourly-production and allocation compatibility

As elsewhere, an available compatibility multiplier does **not** grant the Effect automatically. A future fungus must emit it, its progress eligibility window must include the Plant's current progress, and **Time-based Production accrues only if Growth/Ripening is advancing at a positive rate**. The Plant cannot produce through a total stall, after 200%, or after one destructive harvest.

| Ingredient | Harvest Window width | Leaf Peak Timing Shift | Seed Timing Shift | Time-based Production | Leaf–Seed Allocation |
| --- | ---: | ---: | ---: | --- | ---: |
| **Potato** | **1.0×** | **1.0×** | **1.0×** | **1.0× Leaves / 1.0× Seeds** | **1.0×** |
| **Rice** | **0.8×** | **0.8×** | **1.6×** | **0.6× Leaves / 2.1× Seeds** | **1.6×** |
| **Carrot** | **1.4×** | **1.3×** | **0.8×** | **1.1× Leaves / 0.6× Seeds** | **0.8×** |
| **Onion** | **1.6×** | **1.1×** | **1.0×** | **1.3× Leaves / 1.0× Seeds** | **1.0×** |
| **Apple** | **1.4×** | **1.2×** | **1.1×** | **1.3× Leaves / 1.0× Seeds** | **1.1×** |
| **Pumpkin** | **1.4×** | **1.7×** | **1.0×** | **1.5× Leaves / 0.8× Seeds** | **1.1×** |
| **Strawberry** | **2.3×** | **1.6×** | **0.8×** | **1.4× Leaves / 0.7× Seeds** | **0.9×** |

**Notable interactions:**
- **Strawberry 2.3× Window widening** makes its narrow **105–125% peak** more manageable, without turning it into a broad second-bloom Flower. Its **1.6× Peak Timing Shift** lets the farmer plan closely timed rapid rotations.
- **Onion 1.6× Window** and **Apple 1.4× Window** reinforce their forgiving roles rather than converting them into razor-thin high-output specialists.
- **Pumpkin 1.7× Ripening Rate** from the core matrix is valuable because the best harvest is late at **170%**; **1.7× Leaf Peak Timing Shift compatibility** further helps schedule its later high-value crop. Its native production does not increase hourly in the absence of an actual emitted Time-based Effect.
- **Rice 1.6× Seed Timing**, **2.1× hourly Seed Production**, and **1.6× Allocation** all amplify its supporting Seed-economy role, but are standard existing Effects from future fungi; no new rice-specific resource is invented.
- Even if fungal Effects change available Leaves and Seeds, they **never grant a terminal Ingredient an outgoing Transformation recipe**, and cannot change Seed identity unless a future Plant species expressly defines it; all seven Ingredients currently produce only own Seeds.

### E. Moisture: distinctive Rice Flooded optimum and ordinary crop risks

This numeric pass uses existing **Dry / Damp / Flooded** resolved Moisture. The entries below are **lifecycle rate / ordinary non-Seed AND Seed output**, before fungal cultivation Effects and relative to each species' **preferred Moisture condition**. For **Rice**, **Flooded is the true 1.0× optimum**, while Damp is viable but less productive; this avoids treating Flooded Rice as precisely identical to Damp Rice. For everyone else, **Damp is 1.0×**. No new Aquatic-exclusive property, lethal-Flooded timer, generic tolerance Effect or Material/Fertility requirement.

| Ingredient | Dry rate / output | Damp rate / output | Flooded rate / output | Continuous Dry death |
| --- | --- | --- | --- | ---: |
| **Potato** | **0.65× / 0.65×** | **1.0× / 1.0×** | **0.55× / 0.55×** | **72 h** |
| **Rice** | **0.40× / 0.40×** | **0.85× / 0.85×** | **1.0× / 1.0×** | **48 h** |
| **Carrot** | **0.70× / 0.70×** | **1.0× / 1.0×** | **0.60× / 0.60×** | **72 h** |
| **Onion** | **0.80× / 0.80×** | **1.0× / 1.0×** | **0.50× / 0.50×** | **96 h** |
| **Apple** | **0.60× / 0.60×** | **1.0× / 1.0×** | **0.60× / 0.60×** | **72 h** |
| **Pumpkin** | **0.70× / 0.70×** | **1.0× / 1.0×** | **0.45× / 0.45×** | **96 h** |
| **Strawberry** | **0.45× / 0.45×** | **1.0× / 1.0×** | **0.55× / 0.55×** | **48 h** |

**Moisture design consequences:** Rice's profitable Seed farming rewards **Flooded** placement; Carrot has a mild **Dry** penalty but is very fast; Onion tolerates Dry comparatively well and has a broad harvest window; Pumpkin can survive limited Dry at reduced output but its long lifecycle makes maintaining Damp strategically important; Strawberry's rapid crop loses productivity sharply in Dry and has only 48 hours before death. All death thresholds count **continuous hours**, resetting after the condition clears, and do not mean instant death.

### F. Illumination: ordinary ingredient preferences without a second Spices puzzle

Each cell is **lifecycle rate / ordinary Seed and Leaf output**, relative to a preferred Illumination condition. These are **native Plant responses to globally resolved Dark / Dim / Lit / Bright**, not unique Luminous Source propagation rules. Most Ingredients have fairly modest nonpreferred-light penalties compared with Spices' engineered severe contrasts, but Strawberry is more Bright-focused.

| Ingredient | Dark rate / output | Dim rate / output | Lit rate / output | Bright rate / output |
| --- | --- | --- | --- | --- |
| **Potato** | **0.75× / 0.65×** | **0.90× / 0.85×** | **1.0× / 1.0×** | **0.90× / 0.85×** |
| **Rice** | **0.75× / 0.65×** | **0.90× / 0.85×** | **1.0× / 1.0×** | **0.90× / 0.85×** |
| **Carrot** | **0.60× / 0.50×** | **0.80× / 0.70×** | **1.0× / 1.0×** | **1.0× / 1.0×** |
| **Onion** | **0.80× / 0.70×** | **1.0× / 1.0×** | **1.0× / 1.0×** | **0.90× / 0.80×** |
| **Apple** | **0.80× / 0.70×** | **1.0× / 1.0×** | **1.0× / 1.0×** | **0.90× / 0.80×** |
| **Pumpkin** | **0.60× / 0.50×** | **0.85× / 0.75×** | **1.0× / 1.0×** | **1.0× / 1.0×** |
| **Strawberry** | **0.45× / 0.35×** | **0.70× / 0.60×** | **0.95× / 0.90×** | **1.0× / 1.0×** |

**Interpretation:** Carrot's Lit/Bright pair remains optimal and uncomplicated; Onion and Apple are both comfortable in Dim and Lit; Pumpkin is warm/light-loving but doesn't gain extra precision rewards for Bright over Lit; Strawberry prefers Bright and loses noticeable yield in Dim/Dark while Lit remains viable at only a 10% output loss. An ordinary environmental Influence can affect several Plants differently **only through the already-resolved habitat state**. No Ingredient has an intrinsic illumination-switch reward, new stored charge, or day/night mechanism.

### G. Temperature, Mycelial and continuous lethal exposure

Every Ingredient has a species-specific ordinary habitat and continuous hazard clocks. Temperature states are **Freezing / Cold / Temperate / Warm / Hot**; Mycelial is an **independent overlay hazard**. None of the seven Ingredients has Desert-style beneficial Hot or Freezing adaptation, Moonjade-style Dormancy, or an innate Mycelial advantage. No generic tolerance fungus Effect is created.

| Ingredient | Preferred Temperature | Hot death after | Freezing death after | Mycelial death after |
| --- | --- | ---: | ---: | ---: |
| **Potato** | **Temperate** | **72 h** | **72 h** | **48 h** |
| **Rice** | **Temperate / Warm** | **72 h** | **48 h** | **48 h** |
| **Carrot** | **Temperate** | **48 h** | **48 h** | **48 h** |
| **Onion** | **Cold / Temperate** | **72 h** | **72 h** | **72 h** |
| **Apple** | **Cold / Temperate** | **72 h** | **72 h** | **48 h** |
| **Pumpkin** | **Warm** | **48 h** | **48 h** | **72 h** |
| **Strawberry** | **Temperate / Warm** | **48 h** | **36 h** | **36 h** |

**Temperature productivity rules, new proposed numbers:**
- In a listed preferred nonextreme state, **1.0× ordinary lifecycle rate and output**.
- In a **nonpreferred nonextreme** state (Cold, Temperate or Warm otherwise viable), apply **0.85× ordinary rate and output**, except **Pumpkin while Cold** is distinctly worse: **0.55× lifecycle rate and 0.55× ordinary yield**, preserving its Warm preference and especially long development risk. **Pumpkin while Temperate** is 0.85× and viable.
- **Hot and Freezing** each give **0.50× lifecycle rate and 0.50× ordinary yield** until the corresponding lethal clock, with **no default extra universal extreme multiplier stacked a second time**. Strawberry reaches lethal Freezing after **36 uninterrupted hours**, Carrot/Rice/Pumpkin after 48, and some hardier Ingredients after 72. A Warm-preferring Pumpkin does **not** benefit from actual **Hot**.
- **Mycelial** gives **0.50× rate and 0.50× ordinary output** while present, independent of current Temperature, along with its species' fatal exposure clock. **Timer continues during a full lifecycle stall** even though fungal Time-based Production does not. Clocks reset when the resolved harmful state or Mycelial overlay actually disappears; merely removing an original fungus is insufficient if the overlay persists.
- **Flooded** and nonpreferred Dark/Dim/Bright have productivity costs but are **not new death timers**. **Dry** has its own listed lethal clock even if the Plant still has positive reduced production.
- For combined hazards, use ordinary environmental multipliers before the separate emitted fungus Effect susceptibility, and retain global environmental influence arithmetic. Exact integer rounding and stacking caps remain deferred to implementation/testing rather than invented during Plant design.

### H. Full-family route and balance guardrails

~~~text
Potato (the only Seed species granted initially, the ONLY transforming Ingredient)
  ├──> Rice       [terminal, can Seed-grow Rice]
  ├──> Carrot     [terminal, can Seed-grow Carrot]
  ├──> Onion      [terminal, can Seed-grow Onion]
  ├──> Apple      [terminal, can Seed-grow Apple]
  ├──> Pumpkin    [terminal, can Seed-grow Pumpkin]
  └──> Strawberry [terminal, can Seed-grow Strawberry]
~~~

1. **No Ingredient transformation beyond Potato's six direct outgoing paths**. In particular, neither a Potato→terminal instance nor a directly Seed-grown terminal becomes eligible for any transformation. Potato is the one species whose future Plant-owned recipe table has outgoing transformations. Keep all six accessible without intermediate Ingredient routes.
2. **Each of seven Ingredients produces its own Seeds**. No unobtainable Ingredient Seed type and no cross-species Seed identity in this family. Own Seeds make simple sustainable kitchen staples, without requiring repeated Base transformations after a first terminal Seed harvest.
3. **One consuming harvest** collects all Leaves/Produce and Seeds currently present. Carrot peaks at **95%** and must support harvesting before 100%; Strawberry's **115%** narrow peak competes with waiting for its 200%-Seed harvest. No early-harvest Seeds are magically guaranteed if the natural Seed curve has not produced them yet.
4. **Pumpkin should remain distinctly highest in natural one-time Ingredient output (42 Leaves)**, with longer growth and a later 170% peak; **fast Strawberry (22)** and **Carrot (16)** should be appealing for throughput after Seed replenishment. **Apple (26)** and **Onion (19)** are more forgiving, slower alternatives. **Rice (22 Seeds)** is an economic support crop suited to Flooded. Do not flatten specialties before gameplay testing.
5. **Fungi remain consistent emitters**: compatibilities scale signed recipient cultivation Effects, not environmental Source arithmetic; non-Growth effects work only in their declared progress windows and with eligible existing harvest curves; Time-based Production never accrues without positive lifecycle progress.
6. The numerical balance should be assessed by **sustainable non-Seed output per occupied hex-day**, including the opportunity cost of maintaining Seed supplies, additional fungal hex occupancy, germination failures and missed harvest peaks. A 42-Leaf Pumpkin harvest isn't necessarily better than multiple smaller quick harvests.
7. **Production mapping for the separate RPG remains deferred**. The farming engine's output term "Leaves" is still provisional for all Families, and Apple/Pumpkin/Strawberry do not create unique engine-stage resources or shared cross-game inventory mechanisms.
8. Only the already agreed family architecture and approved individual Ingredient profiles are locked as **current first-pass design**; all **§44 numerical tables were APPROVED by the user**, with subsequent tester playtesting and potential revision planned. **No game code modified, fungus roster fixed, or final transformation recipe assigned.**

**Approval status:** All seven Ingredients six-part Plant profiles (§§42–43) and the star-shaped Potato-only transformation architecture (§41) are **APPROVED**. The full lifecycle, Leaves/Seeds, per-Seed germination, core/advanced fungal Effect compatibilities, Moisture/Illumination/Temperature multipliers, and continuous lethal clocks in **§44 are APPROVED FIRST-PASS BALANCE**. Plant-first profiles and numerical balancing for all six Plant Families are now complete; §45 starts fungal design. No fungi or final recipes are approved yet.


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


## 47. Fungi — one dedicated Mycelial-only fungus (APPROVED first-pass role)

**Status:** The user proposed one fungus creating Mycelial ground and doing nothing else, then **APPROVED the Mycelord single-purpose approach** ("ok sounds good"). This is the **APPROVED first-pass Mycelial role** for the fungal roster; exact spread, persistence, spores and numerical details remain open. Do not silently call the earlier "every fungus starts with both environmental and Plant-development Effects" rule abandoned: this would be **one explicit exception**, consistent with §46's agreed freedom to remove a forced unnecessary Effect. It also does not invent another generic environmental Property or use Mycelial as an innate beneficial Plant habitat.

### Mycelord — APPROVED single-purpose Mycelial engineer (numeric details open)

| Property | Approved first-pass direction / deferred specifics |
| --- | --- |
| **Fungus species** | **Mycelord**, existing candidate name; name not yet finally locked |
| **Fungus Source output** | **Creates/maintains Mycelial overlay**, with previously proposed timed adjacent spread beyond direct Source reach; does NOT emit a Temperature, Moisture, Illumination or Fertility Modifier |
| **Direct cultivation Effects** | **NONE**: no Growth/Ripening Rate, Leaf/Seed Yield, Germination, Window/Timing, hourly Production or Allocation effects |
| **Other environmental or overlay Effects** | **NONE** other than Mycelial creation/maintenance |
| **Fungal habitat** | **Mycelial-independent**: can germinate, survive and emit when its own hex is not already Mycelial, solving the bootstrap problem |
| **Growth and Sporulation** | Normal approved **0–100% Growth / 100–200% Sporulation**, emitting immediately after germination and continuing after 200% while viable |
| **Spore reproduction** | **Produces its OWN Mycelord Spores only**, destructive harvest that removes the Source; full Spore quantity/timing/germination and lifecycle days decided in fungus numerical pass |
| **Role** | Dedicated source of hazardous-but-useful **fungal habitat infrastructure**, allowing separately designed Mycelial-preferring or Mycelial-dependent fungi to be situated without adding an automatic Plant Yield bonus |

**"Only one" means only one Mycelial-producing FUNGUS SPECIES in the INITIAL roster, NOT a worldwide limit of one Mycelord Instance.** Players may plant multiple Mycelords if they invest the hex space and Spores. Under the **approved first-pass design**, **no other fungus makes Mycelial ground**, but many independent or Mycelial-benefiting fungus types can still be placed there. This is an initial design simplification, not a prohibition against future balance-driven changes.

### Why an Effect-template exception is justified

§46's agreed working procedure is **first try one environmental Influence plus one Plant-development Effect**, allow 2–3 independently consistent Effects if useful, then remove anything creating a self-contained answer or pointless management. **Mycelord is intentionally EXEMPT** because generating a spreading **persistent overlay that is dangerous to Plants** is already a major environmental ability and gameplay role. Adding a token Plant bonus would package habitat construction and optimized cultivation into a single convenient object instead of requiring players to combine it with separate fungus Sources. Mycelord's Mycelial emission is an **overlay creation behavior**, not a standard +1 environmental Property Modifier, so it must be reconciled with the pending Mycelial propagation implementation before coding.

### Critical risks to address during later balance/feasibility

1. **Mycelord as an obligatory tax:** If almost every good fungus needs Mycelial, the player would have to plant Mycelord in almost every effective layout. Avoid by keeping **most fungi Mycelial-independent**, some **Mycelial-preferring with modest stronger outgoing cultivation Effects**, and only a **selected minority Mycelial-dependent**, unless later testing justifies changing those ratios.
2. **Source/colony continuity:** The initial §7 concept is that Mycelial spreading colonies are **Source-dependent**, with **expansion stopping when Mycelord is removed** and lingering Mycelial retreating after some time, not disappearing instantly. Its harvesting for Spores therefore trades ongoing colony infrastructure against propagation of more Mycelord Instances. Avoid creating a bootstrap trap with excessive costs or an impossible need for pre-existing Mycelial; the first Mycelord must operate without it.
3. **Severe one-point dependency:** A Mycelial-dependent fungus can stop operating if its underlying Mycelial disappears when its supporting Mycelord is harvested. Multiple Sources, overlapping colonies, strategic replacement and careful planning can make this playable, but exact overlapping-source and retreat rules are deferred. Keep the ability to revise propagation/retreat rather than prematurely defining universal hardness.
4. **Fungus-placement versus Plant-safety geometry:** Mycelial harms Plants natively. The point is to **place fungal infrastructure ON Mycelial** while allowing its cultivation Influence to reach **Plants OFF Mycelial**, using the existing Source/Blocker architecture; the target Plant should not automatically have to be colonized. If propagation creates no feasible safe boundary, adjust Mycelial spread or eligible fungal ranges later.
5. **Balance its ability through infrastructure economics** (Source occupation, Spore supply, 0–200% time, expansion/retreat, Plant exposure) rather than artificially giving it a direct bonus or mandatory Temperature/Moisture/Light preferences.

### Open choices, NOT yet assigned

- Mycelial initiation hex eligibility, exact expansion time per neighboring hex, whether blocked edges/hexes stop fungal-colony expansion, how overlapping Mycelord colonies are attributed, retreat delays/ordering, and behavior when the Source is not harvest-removed but suppressed.
- Whether Mycelord emits from its own hex **as the initial colonization anchor** or colonizes specified nearby hexes before cascade. The source-hex-as-origin model is a simple default proposal, but actual mechanics need a later environmental overlay reconciliation.
- Precise Spore collection curve, fungal stage durations, per-Spore germination probabilities and Mycelial-dependent Influence magnitude changes. These are fungus quantitative balance, not final recipes.
- This proposal must be weighed against the **dedicated later Transformation pass**: Mycelord may eventually satisfy a Plant-owned "receiving Mycelial overlay/adjacency" requirement, but **no recipe is fixed now**.

**Review status:** The user has **APPROVED Mycelord as the sole Mycelial-creating fungus species, emitting no other cultivation or environmental Effects**, and accepted its non-Mycelial-dependent bootstrap role as first-pass design. Overarching fungal lifecycle/Spores, anti-self-synergy, and simpler Mycelial habitat rules are agreed (§46). **The four ordinary environmental shapers in §§45–46 remain proposed and due for reconsideration next.** Mycelial propagation details, fungal numerical pass, and the later dedicated Transformation pass remain unassigned. No code changed.


## 48. Fungi — revised first four ordinary Effect pairings (APPROVED first-pass bundles)

**Status:** The user has **APPROVED the Mycelord-only Mycelial-creator concept in §47** and asked to work through the **first four regular fungal Effect pairings** previously drafted in §§45–46. The user **APPROVED all four revised Effect pairings** (Glimmergill, Veilcap, Emberbolete, Chillanterelle) and accepted that Glimmergill's situational Leaf Peak Timing Shift remains worthwhile even if only used in select combos. The listed initial +8 percentage-point and ±20% cultivation magnitudes are **accepted as first-pass design proposals**, subject to fungus-wide numerical balancing; exact Spore economy, hazard thresholds, and optional Mycelial amplification remain unassigned. The original §45 pairs and the intermediate duplicate-Seed-Yield table in §46 are superseded **as competing drafts**, without changing the approved general fungus lifecycle/Spores and habitat framework. This remains FUNGUS DESIGN ONLY: **all exact Plant-owned transformation recipes stay reserved for their own dedicated later pass**.

### A. Recommended four species and fixed two-Effect drafts

| Fungus | Environmental emission (unchanged sign/source model) | Plant cultivation emission (NEW/RETAINED) | Which automatic win it AVOIDS |
| --- | --- | --- | --- |
| **Glimmergill** | **Brightening +1 Illumination** (Luminous) | **Leaf Peak Timing Shift +8 percentage points LATER** in normal lifecycle progress, before recipient compatibility (Harvest Peak Timing Shift) | **No direct Growth acceleration, Leaf Yield or Seed Yield.** It sets Bright but does not automatically optimize the output of Bright Sunrice/Starberry/Glass Apple. |
| **Veilcap** | **Darkening −1 Illumination** (Luminous) | **Ripening Rate −20%** (signed slowdown during 100–200%), before recipient compatibility — **RETAINED** | Establishing Dark does not directly produce more Leaves/Seeds; slowing Ripening only provides more time, and any Time-based Production requires another fungus. |
| **Emberbolete** | **Warming +1 Temperature** (Thermal) | **Seed Yield Adjustment +20%**, before recipient compatibility | **No Leaf Yield.** Warming can create Hot Cactopus/Cactaclysm conditions but cannot simultaneously maximize their Hot Leaves; Cactaclysm's absolute 0 Seeds remains 0. |
| **Chillanterelle** | **Cooling −1 Temperature** (Thermal) | **Leaf Yield Adjustment +20%**, before recipient compatibility | **No Seed Yield.** Cooling supports Freezing Pearadox's special Seed mode but cannot simultaneously enhance its Seeds; that requires a separately placed fungus. |

**Why Glimmergill needs a different Plant Effect:** The §46 interim table proposed Glimmergill +20% Seed Yield as well as Emberbolete +20% Seed Yield. Some intentional redundancy can be acceptable, but here it gives Bright Glass Apple **both its optimal illumination and boosted Starberry Seeds** from a single fungus and duplicates Emberbolete's Seed Effect without a clearly separate interaction. Instead, **+8 progress-percentage points on the existing Leaf peak** is an established Advanced Harvest Timing Shift Effect (positive means **LATER**). For a Plant with 1.3× Leaf Timing compatibility, a single Glimmergill emits **+10.4 percentage points**, so e.g. a 135% Leaf peak moves to **145.4%** if the source reaches it; **peak height and width do NOT change**, and no second bloom is generated. This can make a later Leaf harvest more convenient alongside other fungi's Seed Timing or Yield Effects, but those benefits need other Sources. Whether timing shifts should be additive with other same-kind sources, clipped to lifecycle boundaries, or exactly +8 is part of the full numerical/stacking pass; do not silently create a new Effect. If this timing idea ultimately lacks enough genuine utility, revisit it rather than forcing it to exist.

**Why the opposed Temperature pair works:** The user specifically wants **problems that multiple fungi, propagation positioning and Blockers can solve**, not "Warm + Hot Leaf boost" or "Freeze + Frozen Seed boost" packaged in one organism. Therefore Emberbolete's Seed Yield is often an awkward fit for **Hot/Leaf-focused** Desert crops, and Chillanterelle's Leaf Yield is an awkward fit for **Freezing/Seed-focused** Pearadox. Players can use them together with careful Source geometry, selective Blockers and/or multiple environmental contributors—or later discover other alternatives once the full roster is designed. Opposing environmental emissions sum in the existing global model **before final clamping**; no per-Plant rewrite of Source strength, and the Source must actually reach the hex. The user does NOT require that all two-Effect pairs be mutually harmful to every Plant, only that the dominant puzzles not be automatic one-Fungus solutions.

### B. Concise fungal lifecycle, habitat and range drafts

Each of these four is **a fungus with 0–100% Growth followed by 100–200% Sporulation** and its **own Spores only**. **Emits immediately on successful germination** and keeps doing so while alive, including after reaching 200%. Spores are collected via **one destructive harvest** that removes the fungus and shuts off its emissions. A fungus does not produce Leaves or cross-species Spores. Growth days, Sporulation days, exact Spore quantity/germination, and emission suppression/death thresholds are deliberately **NOT fixed in this batch**.

| Fungus | Proposed simple habitat | Suggested emission footprints | Main living-infrastructure value |
| --- | --- | --- | --- |
| Glimmergill | **Mycelial-independent** | Environmental **Airborne Range 2**; Plant timing **Airborne Range 1** | Shapes Bright area; shifts adjacent Plants' intrinsic existing Leaf peaks later |
| Veilcap | **Mycelial-independent** | Environmental **Airborne Range 2**; Plant Ripening slowdown **Airborne Range 1** | Shapes Dim/Dark areas; can hold a narrow late-window crop longer in real time |
| Emberbolete | **Mycelial-independent at baseline; Mycelial-preferring as a TEST option** | Environmental **Airborne Range 2**; Plant Seed Yield **Airborne Range 1** | Supports Warm/Hot temperature engineering while helping selected Seed suppliers |
| Chillanterelle | **Mycelial-independent at baseline; Mycelial-preferring as a TEST option** | Environmental **Airborne Range 2**; Plant Leaf Yield **Airborne Range 1** | Supports Cold/Freezing engineering while boosting Leaves of separate or partly suitable crops |

**No fungus here creates Mycelial**—the **sole creator is approved Mycelord** (§47), which has no other emitted Effects. The four fungus species do NOT have a combined Temperature/Moisture/Illumination requirement tree for their own survival; **only source-hex Mycelial** is a candidate fungal habitat distinction. Mycelial-preferring means stronger emitted cultivation Influence while its **own occupied fungus hex** is colonized; the receiving Plant need not stand on dangerous Mycelial ground. The tentative +15% **source-side cultivation magnitude** example in §46 would change +20% to **+23%**, **NOT change discrete +1 Temperature or −1 Temperature to ±2 steps**, and does not automatically strengthen both if its emission list has only one direct cultivation Effect. **Exactly which of the four are preferring and the precise bonus size remain proposed**, and can be deferred to the fungus-wide numerical pass. All remain fully functional without Mycelial.

**Different Influence Kind tags:** Luminous/Thermal environmental contributions and cultivation timing/rate/yield Effects have separate Kind/Mode assignments. A selective blocker that actually blocks a Thermal emission may let a cultivation emission pass, provided its blocker kind/geometry permits this within the established system. **Range 1 cultivation reach doesn't imply environmental Range 2 emissions can be blocked in every arrangement**, because Range-based paths can route around obstacles; check actual Source paths in the later feasibility pass. Environmental emission is always the SAME signed one-step source contribution wherever it reaches.

### C. Concrete test cases before approving the pairings

| Player's intended crop | What one Fungus accomplishes | What it still doesn't solve |
| --- | --- | --- |
| **Bright Starberry 31 Leaves at ~135%** | Glimmergill may establish Bright, and shift Starberry's natural single Leaf curve later to ~145.4% through 1.3× timing response, but **does not increase peak Leaves** | Needs independent Leaf Yield source if the player wants the maximum farm; if timing shift is unhelpful, another placement/blocker strategy may be better |
| **Dark Ghost Rice 24 Leaves** | Veilcap can establish Dark from Dim and slow Ripening inside its close cultivation footprint | **No Leaf Yield increase**. If another fungus provides Time-based Leaf Production, slowdown is useful; else longer waiting may simply cost Seed time |
| **Hot Cactaclysm 48 Leaves (0 Seeds)** | Emberbolete can warm a suitable hex toward Hot, but the independent Seed Yield Effect has **NO payoff** on completely sterile Cactaclysm | Need a separately routed **Leaf Yield fungus**, possibly Chillanterelle; avoid its Cooling at the Plant hex while delivering its Leaf Effect |
| **Freezing Pearadox 27 Seeds** | Chillanterelle can cool toward Freezing but its direct Effect only boosts Leaves, **not Pearadox's already boosted Seeds** | Need a separately positioned **Seed Yield fungus**, possibly Emberbolete, whose Warming may need to be blocked/offset while its cultivation Influence reaches the target |
| **Dim Moonrice / Thymekeeper Seed farm** | Veilcap darkens a Lit baseline into Dim but its Ripening slowdown can **delay the 200%-Seed payoff** | Emberbolete supplies Seed Yield but may warm a Cold-preferring field, requiring placement or blocking to prevent losing the desired habitat |
| **Lit Pum'king spatial engineering (recipe deferred)** | Brightening and darkening emissions are ordinary separately attributable Source contributions; their algebraic sum may be zero on a target while final Illumination is Lit | The **two-presence-plus-Lit condition remains only a historical Plant-owned puzzle direction**, not a recipe mapping to Glimmergill/Veilcap; verify real source footprints later |

**Potential balance concerns:**
- **Leaf Peak Timing Shift may be too niche** as Glimmergill's only direct cultivation Effect if crops rarely benefit from harvesting later. Check usefulness with Rosewraith's innate two peaks, fast Carrot/Strawberry rotations and intermediate Seed availability. A sensible fallback is giving Glimmergill a **clearly directional different existing Effect** with a measurable timing/resource trade-off; do not reflexively duplicate Seed Yield.
- **Emberbolete + Chillanterelle create a cross-fungus puzzle**, but care is needed that Thermal-source overlap/Blockers are solvable and not unduly complicated compared with other Leaf/Seed fungi to be designed later. The complete roster should furnish **alternative complementary routes**, not force every Hot or Freezing optimization to require two opposing thermal sources.
- **Not every Source needs to create immediate conflict for every Plant.** A fungus with a +20% beneficial direct Effect and a neutral resolved environmental contribution under some Baselines is fine, provided the *hardest and most profitable setups* reward intentional combination and spatial management.

### D. Review boundaries and dedicated transformation pass

**Already AGREED:** Fungus 0–200% and continuing emission, own Spores and destructive harvest, default environmental + Plant Effect template with exception for Mycelord, no self-contained high-reward pairing, Mycelial simplified source-hex habitat with occasional magnitudes/limited dependency, Mycelord as sole Mycelial creator, globally consistent environmental Source math, and ordinary signed direct fungal Effect compatibility. **APPROVED at first pass:** The four specific pairings above and their illustrative nominal +8/+20% base values, with the user's explicit endorsement of situational effects. **Still open for the fungus-wide numerical/feasibility pass:** exact reach/Propagation tuning (Range 2/1 is a starting footprint), optional Mycelial-preferring statuses, fungal stage times, Spore economies, and environment/suppression thresholds.

**Next step underway:** Continue with Rainmorel, Droughtcap, Prismorel and Rushroom (§49), then the remaining candidates, the fungal numerical pass, and finally the explicit **separate full Plant-owned transformation-recipe pass** across every Family. We may note feasibility along the way, but **no recipe, duration, priority or transformation-specific activation Effect is assigned here**. No game code changed.


## 49. Fungi — second ordinary fungus batch: Rainmorel, Droughtcap, Prismorel, Rushroom (APPROVED first-pass bundles)

**Status:** The user **APPROVED §48's four fungal pairings**, including the **situational but valid +8pp LATER Leaf Peak Timing Shift on Glimmergill**, then asked for the next batch. **All four named fungi and their first-pass Effect packages in §49 were APPROVED by the user** ("ok these sound good"), including Rainmorel's Growth slowdown, Droughtcap's Harvest Window widening, Prismorel's earlier Leaf timing, and Mycelial-dependent Rushroom Growth acceleration. Full fungal numerical balancing, exact Spore economics and Mycelial propagation feasibility remain deferred. Design for interesting player-created cross-fungus solutions, not two already synergistic optimization effects packaged on a single fungus. **Mycelord alone produces the Mycelial overlay** (§47 approved); it emits nothing else. Exact Plant-owned transformation recipes, priority, and exposure durations remain strictly **reserved for the dedicated later pass after fungal designs and numbers**.

### A. Proposed four emitted-Effect bundles

| Fungus | Ordinary environmental emission | Separate ordinary Plant-development emission | Mycelial habitat | Intended tension |
| --- | --- | --- | --- | --- |
| **Rainmorel** | **Wetting: +1 Moisture step** (Aqueous), routed by directional **Spread Budget** | **Growth Rate −15%** (slowdown, negative throughout 0–100%) | **Independent** | Creates/maintains Damp or Flooded conditions but can slow development for the Plants close enough to receive the separate direct Effect |
| **Droughtcap** | **Drying: −1 Moisture step** (Aqueous), broad ordinary Range | **Harvest Window width +25%** relative to existing productive intervals, before compatibility | **Independent** | Widens timing opportunities but may create lethal Dry environments or drain Flooded Aquatic areas prematurely |
| **Prismorel** | **Brightening: +1 Illumination step** (Luminous), **directional Spread Budget** rather than omnidirectional Range | **Leaf Peak Timing Shift −8 lifecycle percentage points EARLIER** before compatibility | **Independent** | Offers an alternate spatial Brightening strategy and counter-direction to Glimmergill's later shifts, not extra Leaves |
| **Rushroom** | **Cooling: −1 Temperature step** (Thermal) | **Growth Rate +30%** (acceleration, only during 0–100%) | **Mycelial-DEPENDENT**, candidate for first high-power dependent fungus | Fast growth needs Mycelord infrastructure; Cooling may work against a Plant's optimum and Mycelial spread may endanger nearby Plants |

These are **proposed source-side values**, not compat-adjusted Plant bonuses or an approved complete fungus numerical pass. All four still follow the agreed fungus lifecycle: **0–100% Growth, 100–200% Sporulation, own Spores ONLY, immediate emission from germination, continued emission after maturity while viable, and one destructive Spore harvest that removes the Source**. No fungus produces Plant Leaves/Seeds, another species' Spores, or Mycelial except Mycelord. Exact growing days, total maturation days, per-Spore chance, Spore amount, earlier partial Spore curve, survival/timer rules and final Source numeric balancing remain deferred.

### B. Rainmorel — APPROVED first-pass profile

**Role:** A **directed water-layout engineer** with a separate (often inconvenient) Growth slowdown. It can help create Flooded corridors without giving the player an automatic Growth speed boost for every Aquatic crop in its footprint.

| Part | Proposed details |
| --- | --- |
| **Lifecycle / Spores** | Ordinary-to-moderately-slow 0–200% fungus, emits upon germination and forever while maintained at maturity; harvested once for **Rainmorel Spores** with removal, no Plant output. Stage days/Spore yield TBD. |
| **Environmental emission** | **+1 Moisture step, Aqueous, Airborne routed Spread Budget 4**, user-selected Starting Direction, the **already implemented Straight Until Blocked Movement Rule**. Applies once to each actually reached hex; blocker diversion may split and spend the **single shared crossing budget**, with no per-branch fresh budget. Moisture Sources sum with baseline normally, then clamp. |
| **Plant-targeting emission** | **Growth Rate −15%** on Plants in Growth 0–100%, **Airborne Range 1**, separately reached from the directed Wetting emission. A Plant's established signed Growth compatibility changes slowdown magnitude, never switches it to acceleration. |
| **Habitat** | **Mycelial-independent**; no fungus-only Damp/Temperate/Lit preferences to juggle. It can be grown without Mycelord. Fungus viability/power does not itself depend on how many hexes it has flooded. |
| **Farming use / tension** | Can Wet **Dry→Damp** or **Damp→Flooded** along a designed path, benefiting Flooded **Rice, Kelpfull, Sunken Lotus, or Silvercress's Growth habitat** where those Plants' approved preferences apply. However, nearby Plants receiving its distinct rate Effect develop slower; the player may want the routed Wetting to reach across a longer corridor while the slowdown remains close to the Source. Because most Ingredients/Spices prefer Damp, excessive Wetting can make them Flooded and less productive. |
| **Transformation feasibility note, NOT recipe** | Candidate tool for establishing Flooded connection and later deliberately breaking it (removing/harvesting Rainmorel, counter-Drying, or environment adjustments), supporting Aquatic transformation **puzzles later**. No Aquatic recipe or unique Plant-trigger emission is assigned. |

**Crucial propagation detail:** §Environmental System v1.1 explicitly resolves **routed Wetting before ordinary Waterborne traversal**. A Wetting Source must be able to affect **currently Dry or Damp** targets; **do not naively make its environmental Wetting itself Waterborne-only** or it could fail to create the first Flooded path. The proposed **Airborne routed +1** obeys already implemented semantics. Once Rainmorel creates Flooded connectivity, some separate fungus's existing Waterborne cultivation Influence may subsequently exploit that path. This is cross-fungus synergy, not a secretly bundled Waterborne acceleration effect on Rainmorel.

### C. Droughtcap — APPROVED first-pass profile

**Role:** A **drainage / harvest-timing engineering tool**. It makes the percentage-based interval around existing Leaf peaks more forgiving, while its broad Drying Source may damage the very Plants whose harvest windows it improves unless the player manages placement.

| Part | Proposed details |
| --- | --- |
| **Lifecycle / Spores** | Ordinary growth, normal-to-slow 100–200% Sporulation, immediately emitting and persistently maintained if not harvested at maturity; own **Droughtcap Spores** only, destructive harvest. Numeric times/yields deferred. |
| **Environmental emission** | **−1 Moisture step (Drying), Aqueous, Airborne Range 2**. E.g. Flooded→Damp or Damp→Dry under a single applicable emission and absent other Modifiers. Clamping only after all active source contributions; no special override of other fungi. |
| **Plant-targeting emission** | **+25% Harvest Window WIDTH** to existing normal productive Leaf intervals, **Airborne Range 1**, scaled by per-Plant Window compatibility. This changes a progress-percentage curve's width, **NOT Ripening Rate or real-time duration of progress**. It may aid naturally narrow crops such as Strawberry or Orchidemon, but never creates an extra peak or another destructive harvest. Exact widening interpolation and stacking to be fixed in numeric/system reconciliation. |
| **Habitat** | **Mycelial-independent**; no routine requirement to maintain separate Dry, Damp or Temperature preferences for the fungus itself. |
| **Farming use / tension** | **Dry-tolerant Sandrose** can use modest widening without automatically receiving higher Leaf output, but ordinary **Strawberry** is quite Dry-sensitive: Droughtcap may make Strawberry's **105–125% narrow window** easier while simultaneously turning Damp to potentially lethal Dry. This invites selective Aqueous Blocking of its Drying emission, another Wetting Source, or nonoverlapping footprints. **Aquatic Silvercress** could need drainage from Flooded to Damp during Ripening, but its window effect is not itself a new Seed or Leaf bonus. |
| **Transformation feasibility note, NOT recipe** | May supply an ordinary **Flooded→Damp drainage** condition for future Aquatic Plant-owned recipes, provided the original Rainmorel/other Wetting and blocker network can be changed safely. No target Plant, exposure hours or result is selected now. |

**Specific numerical sanity example, not final curve shape:** With Strawberry's approved **2.3× Harvest Window compatibility**, +25% base widening yields **+57.5% widening** of an existing **20-progress-point** nominal 105–125% interval (width ~31.5 points if width scaling is proportional). This adds timing forgiveness **but no direct Leaves or Seeds**; the exact left/right redistribution is a later curve-shape decision. Keeping Strawberry productive and alive requires its own Moisture to remain suitable: widening doesn't override a Dry penalty or 48-hour continuous Dry lethality.

### D. Prismorel — APPROVED first-pass profile

**Role:** A **precision/directional Brightening source** whose secondary cultivation Effect is an **earlier** Leaf peak. It is an intentional alternative to, rather than a strictly stronger version of, Glimmergill.

| Part | Proposed details |
| --- | --- |
| **Lifecycle / Spores** | Average fungal 0–200% Growth/Sporulation, immediate/persistent emission, **own Prismorel Spores** only on consuming harvest. Numerical stages and Spore economics deferred. |
| **Environmental emission** | **+1 Illumination (Brightening), Luminous, Airborne directed Spread Budget 3**, Straight Until Blocked, user-configurable Starting Direction. Its smaller directional footprint contrasts with **Glimmergill's Airborne Range 2** all-direction Brightening. Source strength is always +1, even for Plants that prefer Dark. |
| **Plant-targeting emission** | **Leaf Peak Timing Shift −8 lifecycle percentage points (EARLIER)**, **Airborne Range 1**, applied to any already-existing natural Leaf peak on a compatible Plant without changing maximum Leaves or inventing blooms. A +1.3× timing-compatible Plant sees **−10.4 percentage points**, not a change of effect direction. Full range/clamping/overlap of multiple timing sources later. |
| **Habitat** | **Mycelial-independent**. No complex fungus Temperature, Moisture or Illumination viability preference is imposed. |
| **Farming use / tension** | For **Starberry at 135% natural peak and 1.3× timing compatibility**, an adjacent Prismorel would move that existing peak to around **124.6%**, versus Glimmergill's approved **145.4%** LATER shift. Either one can establish Bright if its environmental light reaches the target. **Neither increases Leaf Yield.** Prismorel's directional reach may light a corridor while largely sparing Dark/Dim crops beside it, whereas Glimmergill illuminates a broader area but pushes Leaf peaks the opposite way. Earlier harvest timing can be strategically useful or costly depending on Seed maturity and other fungi. |
| **Transformation feasibility note, NOT recipe** | Could be an alternative **Light-engineering Source** in the later Spices recipe analysis, especially where controllable directional reach is more relevant than blanket Brightening. **No Glass Apple/Pum'king Source identity, overlap pair, or recipe is assigned.** |

**Reason for apparent overlap with Glimmergill:** Both emit fixed +1 Luminous Brightening, but **omnidirectional Range 2 vs user-routed Spread Budget 3** are distinct spatial tools, while **later vs earlier Leaf Timing Shift** offer opposite, occasionally valuable scheduling strategies. This kind of alternative is acceptable when it enables different garden layouts rather than giving a unilateral stronger Source. If later tester playtesting finds one strictly worse in real setups, revise balance or footprint, not an automatic new gameplay mechanic.

### E. Rushroom — APPROVED first-pass profile

**Role:** A **powerful early Growth accelerator** with a real Mycelial setup requirement and a Cooling emission. This is the first proposed normal fungal **Mycelial-DEPENDENT** species, rather than a fungus that manufactures its own habitat.

| Part | Proposed details |
| --- | --- |
| **Lifecycle / Spores** | 0–100% Growth then 100–200% Sporulation, with ordinary-to-longer full maturation time and **own Rushroom Spores** on one destructive harvest. It emits immediately **IF its own occupied Source hex is Mycelial** and continues through/after maturity while Mycelial persists. Quantitative maturation and Spore economy later. |
| **Environmental emission** | **−1 Temperature (Cooling), Thermal, Airborne Range 2**; it does not reverse sign for Warm plants. It shares the Cooling direction with approved Chillanterelle but differs in companion Growth effect and habitat dependency. Two routes to Cooling are intentional, not a duplicated free upgrade. |
| **Plant-targeting emission** | **Growth Rate +30%**, **Airborne Range 2**, on Plant progress 0–100% only. Very strong on rapid crops: with Strawberry's approved **2.1× Growth compatibility**, nominal +30% becomes **+63% Growth Rate** when Growth Influence reaches it; this alone does not boost Leaves, and Cooling may reduce Strawberry's native productivity depending on the resolved Temperature. |
| **Habitat** | **Mycelial-DEPENDENT at its occupied Source hex**: does NOT create Mycelial or bypass the need for Mycelord (the sole creator). First-pass simple proposal is to **suppress both emissions when its hex loses Mycelial**, without immediately destroying the fungal object; precise grace periods, death clock and eventual resumed emission upon recolonization are for fungus-wide numeric/habitat pass. No simultaneous Lighting/Moisture/Temperature fungus habitat checks. |
| **Farming use / tension** | Strong early Growth at the cost of **a Mycelord-established, potentially spreading hazardous colony** and an emitted Cooling Source. Ordinary Plants on colonized Mycelial receive their existing hazardous overlay consequences; **Rushroom's benefit must be spatially usable on Plants outside Mycelial** or its own purpose becomes self-defeating. The Growth Range 2 is deliberately larger than the common Range 1 so there is some plausible geometric separation from its dangerous substrate; this is NOT a proof of feasibility while Mycelial propagation timings are unfinished. |
| **Transformation feasibility note, NOT recipe** | May help prepare/harvest a Plant while the player arranges a Plant-owned environmental Transformation puzzle, but **Growth progress never gates Transformation eligibility** (§59). Grants **no generic Transformation Effect** and is not assigned a recipe. |

**Critical feasibility test deferred:** Because Mycelial spreads over time and is harmful to every Plant intrinsically, we must confirm that a Mycelial-supported Rushroom can deliver +30% Growth to a viable Plant on a **non-Mycelial** hex for enough time to matter. The Source emits Cooling and Growth via ordinary Airborne propagation, while the Mycelial colony propagates according to separately yet-to-be-finalized overlay rules; Blockers may help with **environmental/Influence** routing but cannot be assumed to block Mycelial itself until overlay blocking has its own agreed rules. If the colony invariably engulfs all Plants in Range 2, revise Mycelial propagation/retreat/eligibility or Rushroom's source range; do NOT claim the existing Blocker system already solves unimplemented overlay spreading. The user has explicitly allowed adjusting Mycelial propagation later if too difficult.

### F. Cross-fungus problems, viable alternatives, and review guardrails

1. **Aquatic water engineering:** Rainmorel may create **Flooded connectivity**, and Droughtcap may undo some Wetting to restore **Damp** later. One brings **Growth slowdown**, the other broadens **Harvest Window**; neither alone builds a free maximum Flooded/Damp-stage Silvercress setup. Their environmental sources are ordinary signed additive +1/-1 Moisture, not a direct Plant transformation. Exact later flooding/draining recipes will be in the designated transformation pass.
2. **Precision light engineering:** **Prismorel +1 Brightening directed** versus **Glimmergill +1 Brightening omnidirectional** are alternatives. Both can be useful but modify Leaf peak position in opposite directions; Source contribution +1 stays globally constant. Interactions with **Veilcap darkening** can produce Lit overlap under a suitable Baseline and actual footprints. **No Spices recipe is fixed.**
3. **Growth control:** Rushroom's **+30% Growth** and Rainmorel's **−15% Growth** have opposing signed Effects on the *same existing rate dimension*. Used near one another, they can adjust net Growth while independently producing Cooling and Wetting; if effects reach different subsets of Plants, players can cultivate fast/slow neighboring crops. The final stacking order and safeguards are for the global numeric/system pass.
4. **No automatically packaged super-crop:** Rainmorel's Water + Growth slowdown, Droughtcap's Drying + timing width, Prismorel's Brightening + earlier peak, Rushroom's Cooling + Growth accelerator each has independent effects that are context-dependent or interfering. Nothing directly gives both the optimal environment AND a large matching Leaf/Seed Yield boost. This respects the user's **"give problems, not solved packages"** design preference. A situational secondary Effect is OK; §48 approved Glimmergill as the precedent.
5. **Mycelord dependency is not universal:** Rainmorel, Droughtcap and Prismorel operate on ordinary hexes, while Rushroom is a candidate for an advanced Mycelial-dependent power spike. The other fungi already proposed include Mycelial-preferring options; exact source-side magnitude buffs remain for the numeric pass. **Mycelord itself emits nothing except Mycelial and is the sole creator**.
6. **Two Influence footprints may differ and arrival is evaluated separately**. The proposed environmental and cultivation effects have their own Kind/Mode and reach; the emitted Rate/Timing Effect applies only to a Plant actually reached and eligible in its lifecycle. No per-Plant sign reversal, no fractional environmental step, no environmental Tolerance Effect, no fungal added Secondary Bloom, no generic Transformation Effect, no new Material/Fertility dependence.
7. **Fungal names and roster size still tentative** except Mycelord's agreed first-pass role. This four-fungus batch is proposed for separate user review, then **Echomorel, Wakemorel, Hushroom, Sim'mushro'dim** remain from the original 13-name pool (alongside already approved Mycelord and four earlier ordinary fungi). Not every name must survive, and additional fungi may be added to cover meaningful missing Effects rather than filler.
8. **Dedicated later transformation pass remains reserved after fungal design, fungal numbers and feasibility checks**. Mentioning potential relevant Conditions or Sources now does not assign any specific outgoing edge or duration. Text-only; no game code.

**Approval status:** All six Plant families' first-pass profiles/numerics, §46's general fungal rules, §47 Mycelord's sole-creator role, and §48's four bundles **are APPROVED**. **§49 Rainmorel/Droughtcap/Prismorel/Rushroom environmental emissions, cultivation Effects, Mycelial classes, first-pass nominal magnitudes and proposed propagation footprints are APPROVED as first-pass bundles**, subject to fungal-wide numerical balancing and system feasibility checks. §50 introduces the next four candidates. Full fungal numerical pass and complete Plant-owned transformation recipes remain deferred. No implementation.


## 50. Fungi — Echomorel, Wakemorel, Hushroom, Sim'mushro'dim (APPROVED first-pass bundles)

**Status:** The user approved all four §49 fungus designs and requested the next batch. The agreed initial roles now comprise **eight ordinary fungi (§§48–49) plus single-purpose Mycelord (§47)**. This §50 introduces the final four names from the earlier 13-name candidate pool, and **all four specific fungus packages were approved by the user in the subsequent review** ("i like them, and the previous 4 too"). Their numbers, environment reaches, Mycelial preference and production windows below are **proposed first-pass values**, not a finalized global fungus numeric pass. Fungal species always **grow from 0–100%, sporulate from 100–200%, emit immediately after germination and continue emitting indefinitely at 200% while viable**; a one-time destructive Fungus harvest yields its own **Spores only**, removing the Source. **Mycelord alone creates Mycelial**. Complex Plant Temperature/Moisture/Illumination preferences do not return as fungal habitat requirements. **Precise Plant-owned transformation recipes remain completely deferred to a clean pass AFTER all fungi and their numerical balance**.

### A. Four proposed Effect combinations

| Fungus | Environmental Influence | Independent Plant-development Effect | Fungus Mycelial relationship | Deliberate puzzle or trade-off |
| --- | --- | --- | --- | --- |
| **Echomorel** | **Cooling −1 Temperature**, Thermal | **Time-based Leaf Production +0.15 Leaves/hour** during **160–190%** progress | **Preferring**, fully functional without it | Does not slow Ripening: combine another fungus to extend elapsed time; Cooling can also compromise fragile/Heat-preferring Plants |
| **Wakemorel** | **Drying −1 Moisture**, Aqueous | **Ripening Rate +25%** during 100–200% | **Independent** | Speeds late harvests but dries Damp farms and reduces time available for other fungi's hourly production |
| **Hushroom** | **Darkening −1 Illumination**, Luminous | **Germination Adjustment +8 percentage points PER SEED** on a planting attempt | **Independent** | Saves scarce Seeds at sowing but may darken the just-planted crop into an unsuitable environment |
| **Sim'mushro'dim** | **Warming +1 Temperature**, Thermal | **Time-based Seed Production +0.15 Seeds/hour** during **160–195%** progress | **Preferring**, fully functional without it; no Enchanted dependency | Creates additional Seeds, but cannot itself slow Ripening, shift Seed timing, or increase ordinary Seed Yield; Warming can hurt cold seed farms |

All signs stay the same across recipients and all cultivation magnitudes are multiplied by species-specific compatibility. Environmental modifiers retain existing ordered Conditions and integer signed steps, additive resolution and final clamping. Each ordinary fungus emits the environmental and Plant cultivation effects **independently** with separate footprints. Initial proposal: **Airborne Range 2 for environmental emissions, Airborne Range 1 for cultivation emissions**; source-side reach/strength remains subject to feasibility and the global fungus numerical pass. No fungus gains a universal Transformation Effect, Secondary Bloom, Environmental Tolerance, extra Seed identity, or fungal Leaf harvest.

### B. Echomorel — APPROVED first-pass fungal profile

| Category | Proposed definition |
| --- | --- |
| **Lifecycle / Spores** | Normal fungus 0–200% Growth/Sporulation, always producing only its own **Echomorel Spores** via one destructive harvest. Emits both Effects from successful germination, including at 200% if left standing; exact stage days, Spore harvest and germination deferred. |
| **Environmental emission** | **Thermal Cooling −1 Temperature**, Airborne Range 2. It can make Temperate→Cold or Cold→Freezing depending on other active Sources and Baseline. It does not automatically become stronger in discrete steps on Mycelial. |
| **Plant effect** | **Time-based Leaf Production +0.15 Leaves/hour during progress 160–190%**, Airborne Range 1; the Plant's Time-based Leaf compatibility multiplies the source rate. **Only accumulates during positive lifecycle progress** and while the relevant Source is actively reaching the Plant in the declared progress window. No production when progress stalls or after 200%; no extra bloom/second harvest. |
| **Mycelial** | **Preferring**: its own occupied fungus hex being Mycelial modestly strengthens its positive hourly Leaf-production emission; it still works off Mycelial. **Exact source-side bonus magnitude is deferred**; any Cool environmental step remains a fixed −1. Only Mycelord can create Mycelial. |
| **Purpose / trade-off** | Supports **Marigloom**'s approved late **160–177%** productive window, and **Rosewraith**'s innate second peak around 180%, as well as **Dream Poppy**. It **does not itself slow Ripening**; Veilcap or another independent rate Source can create more positive-progress hours. Cooling may expose Flowers to Freezing if background Conditions/other cooling already place them at Cold. |
| **Transformation relevance** | Ordinary cooling/source presence could later matter to Plant-owned conditions. **No Plant route, fungal requirement or duration assigned now.** |

**Concrete sanity check:** Marigloom occupies its native **160–177%** productive segment for roughly **1.7 in-game days = 40.8 hours** in normal conditions, and has **3.0× late Time-based Leaf Production compatibility while Dim**. If Echomorel's effect reaches it throughout that interval, +0.15/h becomes **+0.45 Leaves/h**, generating about **18.36 additional Leaves before rounding** (plus its natural output), with uninterrupted positive progress and otherwise unchanged rates. This is a promising reward but may become too large when combined with severe *nonzero* Ripening slowdown. **Review near-stall exploits in the global numerical pass; a full stall never accrues Leaves**. We do not assume Cooling can make Marigloom remain in its preferred Temperature under every starting Baseline.

### C. Wakemorel — APPROVED first-pass fungal profile

| Category | Proposed definition |
| --- | --- |
| **Lifecycle / Spores** | Usual 0–200% fungus cycle; own Wakemorel Spores on destructive harvest; immediate/continuous emissions, no Plant Seeds/Leaves. Exact fungus stage times and germination later. |
| **Environmental emission** | **Aqueous Drying −1 Moisture**, Airborne Range 2. May turn Flooded→Damp or Damp→Dry, without a new irreversible drain mechanic. Retains one-step source arithmetic. |
| **Plant effect** | **Ripening Rate +25%**, Airborne Range 1, during progress 100–200% only, scaled by recipient Ripening Rate compatibility. It does not accelerate Growth, widen progress-interval harvest windows, or modify natural peak position. Faster Ripening can REDUCE the amount of positive-progress time spent benefiting from Echomorel or Sim'mushro'dim. |
| **Mycelial** | Independent of Mycelial; does not create it. No additional fungus own Temperature/Moisture/Illumination preference. |
| **Purpose / trade-off** | **Pumpkin** has 1.7× approved Ripening acceleration compatibility, so +25% becomes +42.5% rate, but Wakemorel may Dry its Damp patch (where Pumpkin has only **0.70×** rate/output and eventual Dry death). It may help **Aquatic** growers drain Flooded→Damp during Ripening while rushing through a late harvest. Unlike Droughtcap, it gives **NO Harvest Window widening**. Helps rapid Seed turnaround in principle, but decreases the time for hourly Seed Production effects. |
| **Transformation relevance** | May contribute ordinary Flooded→Damp change in future Aquatic Plant recipes, with full source/duration specifics later. |

### D. Hushroom — APPROVED first-pass fungal profile

| Category | Proposed definition |
| --- | --- |
| **Lifecycle / Spores** | Usual fungal 0–200% cycle, own Hushroom Spores only, destructive harvest, emits from germination and after maturity while standing. Exact fungus numbers later. |
| **Environmental emission** | **Luminous Darkening −1 Illumination**, Airborne Range 2. Redundancy with Veilcap is intentional: Hushroom has an entirely different developmental role; its Darkening may suit Moonrice's Dim or Dark-preferring crops but can harm Bright crops. |
| **Plant effect** | **Germination Adjustment +8 PERCENTAGE POINTS per Seed**, Airborne Range 1, **evaluated when the Seed stack is planted into an empty target hex**, before a living Plant exists. The specific Seed species' approved germination compatibility multiplies +8pp; the existing additive stack model still caps success at 100% and **consumes every Seed committed** on success or failure. No effect on already-growing Plants, no spontaneous Seed creation, and no bonus to Fungus Spore planting unless separately agreed later. |
| **Mycelial** | Independent, no Mycelial generation or old forbidden Environmental Tolerance power. |
| **Purpose / trade-off** | **Starberry Seeds** come only from Glass Apple and have an approved **18% per Seed** chance at 1.0× fungal germination compatibility. With Hushroom's +8pp/Seed, Starberry becomes **26% per Seed**, guaranteeing one Starberry Plant for **4 Seeds instead of 6**. However, Darkening may degrade a Bright crop's subsequent yield and speed; other Brightening sources or selectively blocking its Luminous emission might be needed. Does not create Starberry Seeds or change their target species. |
| **Transformation relevance** | Ordinary Darkening may later matter to Plant-owned Source-presence/Illumination recipes; it emits no special Transformation effect. |

**Sowing-event feasibility:** Germination Adjustment targets the **sowing attempt at the chosen empty hex**, not an already occupied Plant. The runtime later needs a consistent event-time reach check using the existing source geometry. This is the agreed catalogue's existing germination dimension, **not a new effect category**. A fungus's own Spores are a different item economy: this proposal does not confer Spore germination adjustment, which would be a separately reviewed behavior.

### E. Sim'mushro'dim — APPROVED first-pass fungal profile

| Category | Proposed definition |
| --- | --- |
| **Lifecycle / Spores** | Own Sim'mushro'dim Spores only after destructive fungus harvest, normal 0–200% fungus life, immediate emissions and persistent mature Source. Spore chances, counts and durations to be quantified later. |
| **Environmental emission** | **Thermal Warming +1 Temperature**, Airborne Range 2, ordinary consistent one-step Modifier. It **does not depend on Enchanted ground**; the previously discussed Enchanted overlay can still be removed from eventual design without invalidating this fungus's name or role. |
| **Plant effect** | **Time-based Seed Production +0.15 Seeds/hour**, Airborne Range 1, during **160–195%** progress **only while positive progress continues**, scaled by receiver Time-based Seed compatibility. Generated Seeds retain the Plant's own preexisting harvested **Seed identity**, not the fungus species. **No Seeds from a sterile Plant**, no change of Seed identity, no Seed Yield/Germination boost bundled in this fungus. No accrual during a full stall or beyond 200%. |
| **Mycelial** | Preferring, functioning normally without Mycelial. On a Mycelial **fungus source hex**, outgoing hourly Seed rate receives a modest boost (exact number deferred). Its environmental +1 Temperature remains a discrete +1; only Mycelord creates Mycelial. The Plant need not itself occupy dangerous Mycelial ground to receive the cultivation Influence. |
| **Purpose / trade-off** | **Thymekeeper** (approved 2.5× time-based Seed compatibility) can grow **additional Sunrice Seeds**, and **Rice** can increase own Seed inventory if they maintain positive-progress exposure during the late interval. But **Warming may move a Cold-favoring Seed farm outside its productive Temperature**, and a Mycelial support colony can threaten nearby Plants. Separate **Emberbolete** is needed for direct Seed Yield, and separate **Veilcap** for sustained slower Ripening; Sim'mushro'dim supplies neither. |
| **Transformation relevance** | Source presence, Warming or standard Plant-side Seed accrual could enter future Plant-owned recipes, but no final Ingredient/Desert/Spices mapping is assigned. |

**Example:** At Dim, a Thymekeeper has **2.5× Seed time-based compatibility**, so Sim'mushro'dim's **+0.15 Seeds/hour** delivers **+0.375 SUNRICE Seeds/hour** during active progress from 160–195% (if that separately propagated Effect actually reaches it). Thymekeeper makes Sunrice Seeds, not its own. Sterile Pum'king and Cactaclysm never gain Seeds from this emitter. Accrued Seed counts, rounding, mixed timing and compatibility stacking need normal future balancing.

### F. Why the four do not package complete optimization puzzles

| Cross-fungus situation | Player-created payoff | Obstacles/costs |
| --- | --- | --- |
| Echomorel + **Veilcap** | Extra late Leaves per eligible real hour; slower Ripening increases available hours | TWO Sources; Veilcap darkens, Echomorel cools, and environmental changes may harm the chosen late Flower |
| Wakemorel + **Echomorel / Sim'mushro'dim** | Quicker access to 200% Seed/late Leaf harvest | Ripening acceleration actually **reduces** possible hourly accumulation; choose speed or extra output |
| Hushroom + **Glimmergill / Prismorel** | Spend fewer expensive Starberry Seeds while keeping next crop Bright | Darkening and Brightening must be engineered/blocked; extra output not bundled |
| Sim'mushro'dim + **Veilcap** | More hourly Seeds while progress is positive but slower, including Sunrice Seeds via Thymekeeper | Need separate source; maintaining Dim/Cold/Damp can conflict with emitted Warming and Darkening |
| Mycelord + Echomorel / Sim'mushro'dim | A stronger outgoing **fungus** hourly-production emission on a Mycelial Source hex | Mycelord consumes a hex; Mycelial is hazardous **on Plant hexes**; no free Plant productivity from the overlay itself |

**Important effect coverage to audit after this batch:** Existing approved Plant compatibility matrices also include **Seed Timing Shift** and **Leaf–Seed Allocation**. Neither of those has been assigned to any named fungus in §§48–50, so a roster-wide follow-up may need **one or two additional fungus species** or non-automatically-synergistic third effects. There is **NO obligation to stop at 13 fungi**, and no justification for reopening forbidden Secondary Bloom, Environmental Tolerance, generic Transformation Influence, or the potentially removable Enchanted overlay. The other relevant catalogue Effects would now be represented: Growth increase/decrease, Ripening increase/decrease, Leaf Yield, Seed Yield, Germination, Harvest Window, Leaf timing earlier/later, time-based Leaf/Seed production; environments ±Moisture, ±Temperature, ±Illumination, plus sole Mycelial from Mycelord. Fungus names and exact numerical values remain first-pass.

**User-review status:** §47 Mycelord and §48/§49 eight ordinary fungus packages are **APPROVED**. **§50 Echomorel/Wakemorel/Hushroom/Sim'mushro'dim are APPROVED as first-pass fungus bundles** by the user's later explicit agreement. Nominal +0.15/hour and +25%/+8pp initial strengths, eligibility windows and simplified habitats remain subject to full fungus-wide numeric balancing. If approved, first perform an **effect-coverage audit** (especially Seed Timing Shift and Allocation), then a complete fungus numeric pass (durations, Spores, germination, effect powers, footprint/overlays), and **after all fungal design** a fully separated complete Plant-owned Transformation recipe pass. No code changed.


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


## 53. Fungi — expanded alternatives and missing-Effect batch: six NEW species (APPROVED first-pass bundles)

**Context and status:** The user agreed to §52's principle: multiple viable sources for a desired Effect category, with distinct strengths, habitat/propagation and secondary environmental Influences; explore as many genuinely interesting fungi as needed BEFORE later mergers/pruning, with **no numerical roster cap**. They then explicitly requested the next pass. This section introduced **SIX NEW fungal species** as independent first-pass designs rather than prematurely merging their Effects. **The user subsequently explicitly APPROVED all six, as well as the previous four in §50** ("i like them, and the previous 4 too"). The first-pass names, environmental/cultivation pairings and described roles are approved; full fungus-wide numerical tuning and Allocation exchange semantics remain open. Together the six proposed here and those four draft §50 profiles would make **19 candidate fungi in total**, including Mycelord, but 19 is NOT a target, cap or promised eventual count. Exact fungus stage days, own-Spore success/count/harvest curves, effects balancing, Mycelial buff amounts and Transformation recipes are still later passes.

**Shared already-approved fungus biology:** Each fungus grows 0–100%, sporulates 100–200%, emits from germination and continues after 200% if maintained, yields only own **Spores** through a single destructive fungus harvest. Only Mycelord creates Mycelial ground. Ordinary fungi start with one globally consistent signed environmental emission and at least one distinct consistently signed Plant-development Effect; environmental emissions are normal **discrete Property-step Modifiers**, independently propagating and clamped after summation. The Source's actual reach/Kind/Mode and recipient Plant's compatibility matter. **No invented Environmental Tolerance, Fungus-generated second bloom, intrinsic Mycelial benefit on Plants, automatic Seed identity creation, or generic Transformation Effect.** All Plant-owned final recipes remain deferred for a dedicated full pass.

### A. Proposed fungus six-pack, with existing-effect alternatives and genuinely missing dimensions

| New fungus working name | Environmental Source emission | Plant-development emission (its existing catalogue Effect) | Simpler fungal habitat | Reason it isn't a single universally optimal fungus |
| --- | --- | --- | --- | --- |
| **Mistruffle** | **Wetting +1 Moisture**, Aqueous, **Airborne Range 2** | **Leaf Yield +12%**, Airborne Range 1 | **Mycelial-independent** | Gives a lower-power alternative to Chillanterelle's approved +20% Leaf Yield/Cooling; Wetting may rescue Dry soil or disastrously Flood a Damp-loving high-Leaf crop |
| **Crumblecap** | **Drying −1 Moisture**, Aqueous, **Airborne Range 2** | **Seed Yield +12%**, Airborne Range 1 | **Independent** | Weaker but differently disruptive alternative to Emberbolete's approved +20% Seed Yield/Warming; Drying can harm high-Seed Rice and ordinary crops |
| **Quickshade** | **Darkening −1 Illumination**, Luminous, **Airborne Range 2** | **Growth Rate +15%** while progress 0–100%, Airborne Range 1 | **Independent** | Accessible, Mycelial-free alternative to approved Rushroom's **+30% Growth** plus Cooling and REQUIRED Mycelial; shade can undermine bright quick crops |
| **Tidegill** | **Brightening +1 Illumination**, Luminous, **Airborne Range 1** | **Seed Timing Shift −12 lifecycle percentage points EARLIER**, **Waterborne Range 3** | **Independent** | First named **Seed Timing Shift** source and genuinely Waterborne *cultivation* Influence; requires a connected Flooded path for the Seed timing Effect while its illumination follows a different footprint |
| **Frostfolio** | **Cooling −1 Temperature**, Thermal, **Airborne Range 2** | **Leaf-FAVORING Leaf–Seed Allocation**, Airborne Range 1; **trade Seeds for additional Leaves** at eligible overlapping production | **Mycelial-preferring**, fully operational without it | Covers one missing Allocation direction, but cannot manufacture Leaves from absent Seeds and can overcool leaf-oriented crops; exchange rate/eligible windows still NEED definition |
| **Sunspore** | **Warming +1 Temperature**, Thermal, **Airborne Range 2** | **Seed-FAVORING Leaf–Seed Allocation**, **Waterborne Range 3**; **trade Leaves for additional Seeds** where valid Seed identity/output already exists | **Independent** | Covers other missing Allocation direction and second Waterborne *cultivation* choice; cannot manufacture Seeds on sterile species and wants a connected Flooded path, while Warming may upset Cold/Flooded seed farms |

**These are provisional working names**, chosen to follow the game's whimsical naming without conflating existing Plants (Starberry vs Strawberry etc.). They can be renamed during the broader fungus roster review. The Leaf/Seed and +15% Growth source strengths here are **first-pass proposals**, not the full numeric pass; the allocation exchange rates are purposefully **NOT assigned yet**, because the global exchange semantics need explicit clarification before inserting numbers. This does NOT prevent approving a first-pass Effect identity and environmental pairing now.

**Why six, not one:** The first three make **three already-covered Effects available by another Source at another strength/side effect**, while the last three fill **both unassigned catalogue dimensions** (Seed Timing and the two opposed Allocation directions) and provide **two named Waterborne cultivation emissions**. A player seeking a particular Yield/Rate should have more choices than "find fungus B"; after designing these we should add further alternatives to other singleton Effects rather than stop at an arbitrary count.

### B. Mistruffle — APPROVED first-pass alternative Leaf Yield Source

| Profile part | First-pass description |
| --- | --- |
| **Lifecycle / Spores** | Own Mistruffle Spores only from one consuming fungal harvest; 0–100% Growth and 100–200% Sporulation with ordinary-to-quick stages TBD. Emits from germination and indefinitely while left alive. |
| **Environmental emission** | **Wetting +1 Moisture**, Aqueous/Airborne Range 2. Wetting can turn Dry→Damp or Damp→Flooded. Same global discrete arithmetic as Rainmorel, but **omnidirectional Range** rather than Rainmorel's directional Spread Budget. Not inherently Waterborne. |
| **Plant Effect** | **Leaf Yield +12%**, Airborne Range 1, scaled by receiving Plant's Leaf Yield compatibility; modifies available native Leaf curve, does not add a bloom/production clock and cannot solve Seed identity. |
| **Habitat** | Independent of Mycelial; doesn't produce or need the overlay. No independent fungus Temperature/Moisture/Illumination survival demands. |
| **Farming value / trade-off** | Compared with **Chillanterelle +20% Leaves / Cooling**, Mistruffle is weaker for pure Leaf magnitude but can Wet Dry→Damp at the same time. On Damp **Pumpkin**, its +12% Source becomes **+24% Leaf Yield** by Pumpkin's approved 2.0× compatibility; **but** unmitigated +1 Moisture pushes Damp→Flooded, where Pumpkin's approved ordinary output is only **0.45×**, potentially making the overall harvest worse. Conversely flooding can help a well-planned Aquatic patch, but Mistruffle is not a generic highest-yield solution. |
| **Feasibility / puzzle** | Could help establish flooded continuity to support a DIFFERENT fungus's Waterborne emission, but it is not itself a Waterborne cultivation Source or transformation trigger. If Wetting and Yield happen to reinforce each other on a crop, +12% being smaller than competing alternatives and the extra occupied hex/Source footprint still help keep choices nontrivial. |

### C. Crumblecap — APPROVED first-pass alternative Seed Yield Source

| Profile part | First-pass description |
| --- | --- |
| **Lifecycle / Spores** | Own Crumblecap Spores after normal 0–200% fungus lifecycle, persistent emissions from germination and after 200%, one destructive harvest. |
| **Environmental emission** | **Drying −1 Moisture**, Aqueous/Airborne Range 2. Opposite direction to Mistruffle/Rainmorel, like Droughtcap/Wakemorel but differing in its direct Crop Effect. |
| **Plant Effect** | **Seed Yield +12%**, Airborne Range 1, only on available existing Seeds, scaled by Plant Seed Yield compatibility. Seeds keep their natural species and zero stays zero. |
| **Habitat** | Independent, no Mycelial setup. |
| **Farming value / trade-off** | Alternative to **Emberbolete +20% Seed Yield / Warming**. Crumblecap can be more convenient for fields that cannot tolerate Warming, but will suppress **Flooded Rice** unless its Drying reach is managed, and can turn Damp Apple/Strawberry into Dry with lowered production and possible lethal exposure. A Desert Plant tolerating Dry might make its lower-power Seed bonus easier to realize. |
| **Feasibility / puzzle** | Crumblecap's +12% isn't necessarily inferior when Emberbolete's +1 Temperature would push a crop into lethal Hot. Selective Aqueous Blockers and another Wetting Source can separate the crop bonus from moisture damage. |

### D. Quickshade — APPROVED first-pass accessible Growth accelerator

| Profile part | First-pass description |
| --- | --- |
| **Lifecycle / Spores** | Own Quickshade Spores at destructive harvest, normal approved 0–200% fungal process; starts and persists emitting while viable, exact stage lengths TBD. |
| **Environmental emission** | **Darkening −1 Illumination**, Luminous/Airborne Range 2. Shared existing source direction with Veilcap and proposed Hushroom, but a different cultivation effect. |
| **Plant Effect** | **Growth Rate +15%**, Airborne Range 1, only at 0–100% Plant Growth, using Plant's signed Growth-effect compatibility. Does not change Ripening time or Yield. |
| **Habitat** | Mycelial-independent. Provides a modest accessible alternative to **Rushroom**, which **requires Mycelial**. |
| **Farming value / trade-off** | An ordinary **Strawberry** responds strongly to Growth-rate acceleration (**2.1× compatibility**), so the +15% yields **+31.5% direct Growth Rate** where reached, compared with Rushroom's +30% base becoming +63% with appropriate Mycelial. But Quickshade's Darkening may make a Bright Strawberry farm less efficient through its native light response. **Shadow Onion/Ghost Rice** might find the shade helpful, although neither simultaneously receives extra Leaf Yield or Seed Yield, and positive Growth alone may not maximize sustainable farming. |
| **Feasibility / puzzle** | Unlike Mycelial-dependent Rushroom, Quickshade can be planted directly as independent infrastructure. This makes the player choose between moderate and reliable Growth versus higher-power setup-intensive Growth. |

### E. Tidegill — APPROVED first-pass first Seed Timing Shift + Waterborne cultivation Source

| Profile part | First-pass description |
| --- | --- |
| **Lifecycle / Spores** | Own Tidegill Spores, 0–200% persistent emitter, one destructive Spore harvest. |
| **Environmental emission** | **Brightening +1 Illumination**, Luminous/**Airborne Range 1**, applied wherever its own independent luminous contribution actually reaches. Does not travel along the flooded network just because its Seed Effect does. |
| **Plant Effect** | **Seed Timing Shift −12 lifecycle percentage points EARLIER** on an EXISTING Seed-availability curve, **Waterborne Range 3**, using the recipient's preapproved Seed Timing compatibility. It does **not** accelerate Growth/Ripening, increase maximum Seed Yield, grant Seeds to a sterile Plant, or change Seed identity. Timing-shift stacking/clipping and how exactly the natural curve reinterpolates are for global numeric/system design. |
| **Habitat** | Independent of Mycelial and Moisture as a fungus. Waterborne is an INFLUENCE travel mode, not a hard requirement that Tidegill itself sit on Flooded land. |
| **Farming value / trade-off** | Can support **Flooded Rice**, **Kelpfull**, **Poppycock with suitable routed Flooded path**, or other existing Seed-bearing Plants for Seed availability earlier in the 0–200% cycle. A Brightening step may help or harm depending on Plant preference. It may be especially useful if Seeds begin appearing near an early Leaf harvest, but it does not permit two destructive harvests on one Plant. |
| **Waterborne feasibility** | Use actual established **Waterborne Flooded-connection logic**: if Tidegill is NOT on Flooded, it can inject into an **adjacent Flooded hex** at Range 1; subsequent hops must remain Flooded. A Damp/Dry gap interrupts downstream Seed timing reach; an open-terrain Wetting emitter such as Rainmorel or Mistruffle can help establish connectivity first. The influence must be distinguishable from Tidegill's independent Airborne +1 Brightening. |
| **Transformation relevance (deferred)** | A Waterborne named-source reach might be usable in a future Aquatic Plant-owned recipe, but none is assigned here. |

### F. Frostfolio — APPROVED first-pass Leaves-favoring Allocation Source

| Profile part | First-pass description |
| --- | --- |
| **Lifecycle / Spores** | Own Frostfolio Spores, normal 0–200% lifecycle, continuing emission at mature 200%, destructive Spore harvest. |
| **Environmental emission** | **Cooling −1 Temperature**, Thermal/Airborne Range 2, fixed signed environmental Modifier. May help Cold-preferring Plants or inadvertently push a Cold site to lethal Freezing. |
| **Plant Effect** | **Leaf-favoring Leaf–Seed Allocation**, Airborne Range 1. Redistribute a bounded portion of *already eligible* potential Seed output in exchange for more Leaves; **the numerical conversion/exchange rule, progress eligibility, conservation principle and integer rounding are explicitly NOT YET DEFINED**. Require a genuinely positive Seed-output opportunity; sterile Plants **cannot** obtain a free Leaf boost from an empty Seed category. No change of Seed identity or extra harvest. |
| **Habitat** | Mycelial-preferring, not dependent. A later specified modest Mycelial source-side cultivation magnitude boost may enhance allocation strength, while Cooling remains exactly −1 step. Only Mycelord creates Mycelial. |
| **Farming value / trade-off** | A **Ghost Rice** farm could trade some Moonrice Seed availability for more ordinary Leaves, if the target progress allows both streams and the emitted Effect reaches it, but Cooling might improve/harm its native environment based on final Conditions. Alternatively a rapid **Carrot** farm could sacrifice scarce Carrot Seeds for more Leaves, at the cost of making future replanting harder. Seed-economy opportunity cost is the point; the allocation effect is NOT just an unconditional Yield multiplier. |
| **Critical mechanical issue** | The approved compatibility tables contain an Allocation multiplier but do NOT by themselves settle exact Leaf-per-Seed exchange units, partial-progress output budget, absolute zero handling or conservation. Specify those during the full global fungus numeric/system reconciliation **before** claiming exact harvest quantity. This proposed profile approves no specific conversion formula. |

### G. Sunspore — APPROVED first-pass Seeds-favoring Allocation via Waterborne reach

| Profile part | First-pass description |
| --- | --- |
| **Lifecycle / Spores** | Own Sunspore Spores, persistent Source through 0–200% and afterward while alive, one destructive own-Spore harvest. |
| **Environmental emission** | **Warming +1 Temperature**, Thermal/**Airborne Range 2**. Fixed environmental step; not conditional on Flooded connectivity. May harm Cold-loving seed farms or help others. |
| **Plant Effect** | **Seed-favoring Leaf–Seed Allocation**, **Waterborne Range 3**. Convert a bounded portion of *currently eligible* Leaf-side production into more of the Plant's ALREADY-EXISTING Seed output, with corresponding non-Seed harvest opportunity cost. **Requires valid Seed identity and actual positive Seed production eligibility**; absolutely sterile plants gain no Seeds. Conversion strength, precise progress windows/units and final interpolation remain deliberately unquantified pending system review. |
| **Habitat** | Mycelial-independent and can germinate on non-Flooded hexes; only the Waterborne influence requires connected Flooded recipients. |
| **Farming value / trade-off** | **Flooded Rice** is a natural possible Seed-supply beneficiary, but converting Leaves into Seeds directly reduces useful Rice produce (its native 8-Leaf peak is already modest); Warm is acceptable to Rice, so some setups may use Sunspore conveniently, while others would prefer a pure Seed Yield source such as Emberbolete/Crumblecap. Other Aquatic Plants may require cold habitat, meaning the Warming side effect creates a real cost. Because both currently proposed Waterborne fungi have different Plant Effects, their geometry may be reused by distinct strategies. |
| **Waterborne feasibility** | Same existing Flooded-connectivity requirement and adjacent injection rule as Tidegill; a Rainmorel-produced Flooded corridor can carry this allocation Effect, but its separate Warming environmental emission is still Airborne and can travel through nonFlooded hexes. Selective blockers may cut one Influence without necessarily cutting the other if compatible tags/modes/geometry permit. |
| **Transformation relevance (deferred)** | The eventual recipe pass may inspect source presence, Flooded environment or Waterborne reach, but no Plant-owned recipe has been assigned. |

### H. Effect alternatives and design pressure test

| Wanted Effect | Earlier source | New proposed alternative | Meaningful choice rather than a straight upgrade |
| --- | --- | --- | --- |
| **Leaf Yield +** | **Chillanterelle +20%, Cooling −1 [APPROVED]** | **Mistruffle +12%, Wetting +1** | Stronger direct boost vs a favorable Moisture correction on selected crops; wetting can also ruin Damp farms |
| **Seed Yield +** | **Emberbolete +20%, Warming +1 [APPROVED]** | **Crumblecap +12%, Drying −1** | Stronger boost vs freedom from potentially fatal warming, balanced against drought |
| **Growth Rate +** | **Rushroom +30%, Cooling −1, Mycelial dependent [APPROVED]** | **Quickshade +15%, Darkening −1, Mycelial independent** | Strong high-infrastructure vs flexible lower-power source; Plant-specific light preferences matter |
| **Seed Timing Shift** | **NO earlier source** | **Tidegill −12pp, Waterborne Range 3** | First viable source; future alternatives with different propagation/environment should be explored |
| **Leaf-favoring Allocation** | **NO earlier source** | **Frostfolio, Cooling −1, Airborne** | First source, with genuine Seed opportunity cost; exact conversion not yet specified |
| **Seed-favoring Allocation** | **NO earlier source** | **Sunspore, Warming +1, Waterborne** | First source, different footprint and Leaf opportunity cost, with Seed sterility rules |
| **Waterborne cultivation** | **NO earlier source** | **Tidegill and Sunspore** | Two independent Seed-related Effects with shared existing Waterborne medium; both require connected Flooded traversal |

**Anti-auto-win test:** None of the six has more than one new Plant Development Effect. Some environmental emissions naturally help a specific crop along with the direct Effect, especially Mistruffle Wetting in suitable Aquatic layouts or Sunspore Warming with Warm/Flooded Rice. **This is not banned**: the user wants genuine placement problems, but not a rule that all fungal Effects must oppose each other. The higher magnitude alternatives, Mycelial variants, different source reaches, environmental states and Seed-spending decisions remain available. A +12% Wetting Leaf source should not be declared the universal optimal answer when a +20% Cooling Leaf source could be better in a different setup.

**Source-side and habitat caution:** Fertility +1/-1 are still unassigned because the game's Fertility Property is **retained in environmental v1.1 but under possible future design removal**; don't add Nutrient-only fungi to justify keeping Fertility. Same for Enchanted. Mycelial remains created by exactly one species, Mycelord, and benefits the *fungus source* not a Plant standing on dangerous Mycelial.

### I. Unresolved audit follow-up / next design work

1. **Review these six profiles** before approval; consider especially whether **Seed Allocation should require both eligible outputs at once**, whether its trade is sufficiently meaningful in the chosen Plant examples, and whether +12% alternative Yield bonuses and +15% accessible Growth produce viable options versus more costly approved incumbents.
2. **Continue alternative-source exploration** after this batch. Particular remaining one-source or proposal-only effects include **Harvest Window widening (Droughtcap)**, **Ripening slowdown (Veilcap)**, **Ripening acceleration (Wakemorel §50 proposed)**, **Germination (Hushroom §50 proposed)**, **hourly Leaf/Seed Production (Echomorel/Sim'mushro'dim §50 proposed)**, and **Seed Timing/Allocation**, which would have only one initial Source per exact direction. Do not assume every effect must have exactly two or three; seek genuine different strategies.
3. **Don't silently APPROVE §50 profiles.** User's agreement to the effect-alternatives principle and this new pass did not explicitly approve Echomorel, Wakemorel, Hushroom or Sim'mushro'dim. Maintain their proposed status until reviewed or revised.
4. **After enough candidates**, review a complete matrix for opportunities to merge/reassign Effects without prepackaging a solved high-end optimization, then balance all fungus lifecycles, own Spores, propagation, Mycelial amplifier/suppression and absolute output in one numeric pass. Only then perform the **separate dedicated Plant-owned Transformation recipe pass** across all six families. Text-only; no code.

**Approval status (updated after subsequent user review):** All six §53 bundles Mistruffle/Crumblecap/Quickshade/Tidegill/Frostfolio/Sunspore are **APPROVED as first-pass species designs**, as are the four §50 fungi and the earlier nine. Exact Allocation exchange ratio, numeric fungus lifecycle/Spore balance, and feasibility of Waterborne Source geometries still require their dedicated passes. §51 audit and §52 many-source principle accepted as working design; no final fungus count or numeric commitments; no final transformation recipes. No code altered.


## 54. Fungi — AGREED asymmetric Leaf–Seed value, plus six MORE alternate-Effect species (APPROVED first-pass bundles)

**Status:** The user explicitly **APPROVED all four §50 fungi** (Echomorel, Wakemorel, Hushroom, Sim'mushro'dim) **AND all six §53 fungi** (Mistruffle, Crumblecap, Quickshade, Tidegill, Frostfolio, Sunspore). That raises the accepted first-pass profiles to **19 fungus species including the unique Mycelial-producing species Mycelord**, with no roster count cap and no guarantee all 19 survive later consolidation. The user also gave an **AGREED economic direction** for Leaf–Seed Allocation: **Leaves are more valuable than Seeds, so an extra Leaf must generally cost multiple Seeds**. E.g. a candidate ratio is **3 Seed units per 1 Leaf** (same trade mirrored for Seeds-favoring Allocation); **3:1 is NOT approved as a fixed rate**, and exact species-independent conversion, caps and curve eligibility are deferred to the fungal numerical/system pass. The user asked to **continue developing additional alternatives**, especially where a wanted Effect otherwise forces one mandatory fungus.

**General design boundaries still apply:** Each fungus grows 0–100%, sporulates 100–200%, produces **its own Spores only**, emits continuously from viable germination and indefinitely after 200% while alive, with a **single consuming Spore harvest** removing the Source. Most fungi are Mycelial-independent; selected fungi prefer it for modest outgoing cultivation increases; few require it. **Mycelord alone creates/maintains Mycelial ground** and emits no other Effect. All environmental Property contributions are signed, additive integer steps and are clamped only after summing. No fungus-added second bloom, Environmental Tolerance, generic Transformation Influence, new Fertility burden, or mandatory Enchanted overlay. **ALL Plant-owned transformation recipes must remain for their own comprehensive pass AFTER fungi and fungus-wide numerical balance**. No game code.

### A. AGREED asymmetry for Leaf–Seed Allocation, numeric conversion OPEN

- **Economic principle AGREED:** **one extra Leaf/Produce unit should generally require forfeiting SEVERAL Seeds** from an already eligible Seed-bearing Plant; player motivation for Leaves is the stronger direct reward, while Seeds matter for replenishment/unlocks and may be especially scarce by specific species.
- **Symmetric physical exchange candidate, NOT APPROVED:** an illustrative **3 Seeds given up for +1 Leaf**, and **1 Leaf given up for +3 Seeds**, subject to actual species compatibility and effect strength. **Do not treat 3:1 as final**, and do not assert that all species' Seed economies have the same intrinsic marginal value.
- **How compatibility may modify the exchange** is NOT yet agreed: Plant Allocation compatibility multipliers could scale the *allowed allocation fraction/amount*, not silently conjure favorable conversion rates or make 1 Seed→10 Leaves. Need explicit units, bounds, rounding, interaction with per-Plant normal Seed identity and final harvest curves in the numeric pass.
- **No free output:** Leaf-favoring Allocation cannot create extra Leaves from a nonexistent Seed budget; Seed-favoring Allocation cannot generate Seeds on sterile Plants, change Seed identity, defeat one-time harvest, or increase total value without the corresponding sacrifice. A mixed-Seed-output Plant keeps its approved identities/proportions subject to a separately agreed splitting/rounding rule.
- **Progress-curve issue to resolve in numeric pass:** some Plants have strong early Leaves while natural Seeds appear late, so Allocation cannot casually trade unavailable output at every progress percentage. Decide if exchange operates only when BOTH eligible streams exist, or uses a carefully declared late conversion budget; do NOT quietly assume it activates at all progress. This matters for Frostfolio, Sunspore and future alternatives.
- **Spore economy is separate:** Fungus Spores are not the "Seeds" used in Leaf–Seed Allocation. **Never convert fungus Spores into Plant Leaves or vice versa** without a later explicitly approved independent system.

### B. New six-species proposal: more choices in the same existing Effect types

| Candidate working name | Environmental emission | Plant cultivation emission | Habitat | Why it is a distinct choice rather than a mandatory upgrade |
| --- | --- | --- | --- | --- |
| **Dewmender** | **Wetting +1 Moisture**, Aqueous, **Airborne Range 2** | **Germination Adjustment +4 percentage points per Plant Seed**, **Airborne Range 1**, checked at sowing | **Independent** | Lower-strength, less darkening-oriented alternative to approved **Hushroom +8pp/Seed, Darkening −1**; Wetting may improve Dry seedbeds or Flood an existing Damp garden |
| **Lanterncap** | **Brightening +1 Illumination**, Luminous, **Airborne Range 2** | **Ripening Rate −12%**, **Airborne Range 1** | **Independent** | Modest slowdown alternative to approved **Veilcap −20%, Darkening −1**; Bright crop growers needn't take Darkening but shade crops may be disrupted |
| **Tickbolete** | **Warming +1 Temperature**, Thermal, **Airborne Range 2** | **Ripening Rate +12%**, **Airborne Range 1** | **Independent** | Easier moisture management than approved **Wakemorel +25%, Drying −1**, but can overheat Plants; faster completion may reduce hourly production rewards |
| **Rilllace** | **Cooling −1 Temperature**, Thermal, **Airborne Range 2** | **Harvest Window width +12%**, **Waterborne Range 3** | **Independent** | Waterborne narrower/wider footprint alternative to approved **Droughtcap +25%, Drying −1**; good Flooded route solves reach but cooling can threaten plants |
| **Duskleaf** | **Darkening −1 Illumination**, Luminous, **Airborne Range 2** | **Time-based Leaf Production +0.08 Leaves/hour** at **70–125% Plant progress**, **Airborne Range 1**, only during positive progress | **Independent** | Earlier-window lower-rate alternative to approved **Echomorel +0.15 Leaves/h at 160–190%, Cooling −1 and Mycelial-preferring**; might help early-bloom Plants but shade can compromise their Leaf maxima |
| **Brookrill** | **Cooling −1 Temperature**, Thermal, **Airborne Range 2** | **Time-based Seed Production +0.10 Seeds/hour** at **120–170% Plant progress**, **Waterborne Range 3**, only during positive progress | **Independent** | Mid-Ripening lower-rate Waterborne alternative to approved **Sim'mushro'dim +0.15 Seeds/h at 160–195%, Warming +1 and Mycelial-preferring**; Flooded connectivity is a major positioning cost |

**APPROVAL UPDATE (26 October 2026):** The user reviewed and **APPROVED all six species above as first-pass Effect pairings and design roles**: Dewmender, Lanterncap, Tickbolete, Rilllace, Duskleaf and Brookrill. Provisional names can change; if two eventually merge without losing player choices, consolidation is fine. Their numbers are first-pass candidate emission magnitudes only, not final balance. **No new Effect type** is introduced: positive/negative Ripening rate, Germination Adjustment, Harvest Window width, and Time-based Leaf/Seed Production already exist in the Plant compatibility tables.

### C. Dewmender — APPROVED first-pass alternative Germination support

**Six-part profile:**
1. **Growth / Sporulation and Spores:** Ordinary relatively short first-stage, ordinary second-stage fungus. Emits immediately and after 200% while alive; one destructive harvest yields **Dewmender Spores only**. All stage days, Spore yield and per-Spore planting odds deferred.
2. **Environmental Source:** **Wetting +1 Moisture, Aqueous Airborne Range 2.** Ordinary additive step, possibly Dry→Damp or Damp→Flooded, independently propagated from sowing help.
3. **Plant-development Influence:** **+4 percentage points per committed Seed** to one-Seed germination contribution at an EMPTY Planting destination within **Airborne Range 1**, multiplied by that target Seed species' Germination Adjustment compatibility, then used in the established capped additive stack probability. The Source doesn't generate Seeds or modify fungal Spore germination.
4. **Fungal habitat:** **Mycelial-independent**, no routine Moisture/Temperature/Illumination preference tree. Wetting emission needn't affect Dewmender's own survival.
5. **Farming puzzle:** A modest alternative to Hushroom's +8pp, but useful when Bright-loving Sunrice/Starberry farms want to avoid Hushroom's −1 Light. Its Wetting may help an initially Dry target but flood a Damp seedbed. Note that **Source WETTING and the germination check are independent**, and after a successful planting it continues Wetting until source removal/blocking.
6. **Transformation relevance:** Only ordinary Source/environment and planting consequences; no assigned recipe or special Transformation Effect.

**Alternative-value check:** If Starberry's approved one-Seed chance is **18%** and Germination compatibility 1.0×, Dewmender brings it to **22%**; five invested Seeds would guarantee germination (5×22%=110% clamped to 100%), versus Hushroom's four at 26%/Seed and baseline six at 18%. This is **not simply inferior** when Hushroom's Darkening could damage a Bright crop, but a Damp field's +1 Moisture may create a similarly serious Flooded cost.

### D. Lanterncap — APPROVED first-pass alternative Ripening slowdown

**Six-part profile:**
1. **Lifecycle/Spores:** Standard 0–200% fungal Growth/Sporulation; produces **Lanterncap Spores**, destructive harvest; constant emissions from viable germination onward; precise days/Spore numbers open.
2. **Environmental Source:** **Brightening +1 Illumination**, Luminous **Airborne Range 2**.
3. **Plant effect:** **Ripening slowdown −12%**, **Airborne Range 1**, ONLY while Plant progress 100–200%. Applies species compatibility to the **signed slowdown magnitude**, not the environmental +1. Slowing Ripening changes ELAPSED time per progress point; it does **not** widen Harvest Window progress intervals.
4. **Habitat:** **Independent**, no Mycelial/ordinary environmental survival bureaucracy.
5. **Garden utility and tension:** Alternatives: Veilcap's stronger **−20% and Darkening** might be perfect for a Dim Marigloom while Lanterncap's **Brightening** would remove the crucial Dim late-production compatibility. Conversely, a Bright Starberry using time-based late Seed or Leaf Production (from a SEPARATE source) might prefer Lanterncap, even with only −12% Ripening rate. Whether a sufficiently useful late hourly production source reaches that target is a feasibility test, not automatic.
6. **Recipe relevance:** Brightening and slowed Ripening available to Plant-owned future conditions, no assigned target.

**Exploit review:** Any positive-progress hourly-production fungus can combine with Ripening slowdown; two different slowdown sources now exist. Must constrain rate to stay positive unless explicit Plant innate dormancy, and test long accumulation at low nonzero progress during numeric balance. No production when progress stalls or after 200%.

### E. Tickbolete — APPROVED first-pass alternative Ripening acceleration

**Six-part profile:**
1. **Lifecycle/Spores:** Standard fungal 0–200%, maintains emissions at 200%, one consuming harvest for **Tickbolete Spores** only. Exact days/probabilities deferred.
2. **Environmental Source:** **Warming +1 Temperature**, Thermal **Airborne Range 2**.
3. **Plant effect:** **Ripening Rate +12%**, **Airborne Range 1**, during progress 100–200% only. It doesn't modify 0–100% Growth, move Leaf/Seed peaks or increase Yield.
4. **Habitat:** **Mycelial-independent**.
5. **Use and trade-off:** More modest but potentially appropriate alternative to Wakemorel's **+25% Ripening and −1 Moisture** in a Damp crop. A Damp Pumpkin wanting to accelerate late progress can avoid Wakemorel's Drying but risks Tickbolete Warming it into inappropriate Hot if other Thermal Sources overlap. Another Plant might prefer the stronger Drying variant to drain Flooded→Damp while accelerating Ripening.
6. **Recipe relevance:** Ordinary thermal/environment and Ripening rate contributions only; no final Plant transformation details.

### F. Rilllace — APPROVED first-pass Waterborne Harvest Window alternative

**Six-part profile:**
1. **Lifecycle/Spores:** Standard fungus cycle; own **Rilllace Spores** via destructive harvest; immediate/ongoing emissions while viable. Fungus numeric details TBD.
2. **Environmental Source:** **Cooling −1 Temperature**, Thermal **Airborne Range 2**, including Dry or Damp hexes if emitted and reached.
3. **Plant effect:** **Harvest Window +12% relative WIDTH adjustment** on eligible existing Leaf-curve productive intervals; **Waterborne Range 3**, Plant's Harvest Window compatibility applied. Width adjustment doesn't increase peak Leaf Yield or add a second peak.
4. **Habitat:** **Independent of Mycelial and of Flooded under the fungus**. It can inject into adjacent Flooded hex at Range 1; further movement needs actual connected Flooded route. Dry gaps cut its cultivation reach; Cooling still propagates Airborne.
5. **Use and trade-off:** Droughtcap provides stronger **+25% Window widening** but independently **Dries** the terrain, possibly breaking the flooded Waterborne connections the player wishes to maintain. Rilllace's lower +12% may be superior for **Flooded Aquatic crops** if players already have a connected Flooded canal. Cooling could still push a Cold-preferred Aquatic into Freezing and degrade/kill it.
6. **Recipe relevance:** Flooded reach and ordinary temperature effects only; no fixed named Plant recipe.

### G. Duskleaf — APPROVED first-pass EARLY hourly Leaf Production alternative

**Six-part profile:**
1. **Lifecycle/Spores:** Standard fungal lifecycle and one destructive **Duskleaf Spore** harvest; starts emitting from germination and persists after 200% if not harvested.
2. **Environmental Source:** **Darkening −1 Illumination**, Luminous **Airborne Range 2**.
3. **Plant effect:** **+0.08 Leaves/hour on progress 70–125%**, **Airborne Range 1**, multiplied by Plant's approved Time-based Leaf compatibility while source reaches the Plant. **Accrues only during positive Plant progression** in the window; does not require Ripening exclusively because 70–100% is Growth. No extra bloom or harvest.
4. **Habitat:** **Independent**, no Mycelial obligation or special ordinary environmental survival checklist.
5. **Use and trade-off:** Supplies a **Daisyspell-compatible early (75%) harvest** opportunity that late-window Echomorel misses. **Daisyspell** has a narrow 75% Leaf peak, so even ordinary +0.08 Leaves/hour before harvesting is not necessarily large; darkening a bright-preferring Daisyspell may damage its innate output, requiring selective Light blockers or another Brightening Source. Growth slowdown from Rainmorel can extend the time spent in its early window, but also has its own Wetting side effects. A Plant harvested early cannot later be harvested for Seeds.
6. **Recipe relevance:** Ordinary Light change and Growth-stage hourly-production presence; no Plant-owned Transformation recipe assigned.

**Balance safeguard:** Duskleaf cannot generate Leaves without **actual positive 0–200% progression**, and accumulations stop on destructive Plant harvest. Test very-low-positive Growth-rate mechanics later, not in this first profile pass.

### H. Brookrill — APPROVED first-pass MID-stage Waterborne hourly Seed Production

**Six-part profile:**
1. **Lifecycle/Spores:** Standard 0–200% fungus and consuming harvest of own **Brookrill Spores**, perpetual viable emission after 200%, stage/germination numbers deferred.
2. **Environmental Source:** **Cooling −1 Temperature**, Thermal **Airborne Range 2** (source-side environment contribution always −1 step).
3. **Plant effect:** **+0.10 Seeds/hour on Plant progress 120–170%**, **Waterborne Range 3**, multiplied by the Seed-bearing target Plant's time-based Seed Production compatibility. Eligible only during **positive lifecycle progress and continuous emitted Influence reach**. It is an existing **Time-based Seed Production**, not a new Seed Timing Shift; supplemental Seeds can arise during its declared window without claiming the natural Seed curve itself was shifted. **Zero for absolutely sterile Plants**; existing Seed species/mix unchanged. Exact partial-progress Seed-availability conventions for fungally produced output deserve the numeric pass, not a blanket assumption that every species naturally has Seeds at 120%.
4. **Habitat:** **Mycelial-independent** and its fungal instance does NOT require Flooded at source; **Waterborne** is a cultivation Influence travel constraint and can inject into adjacent Flooded at one Range. Own Spores remain standard; no fungal spore-conversion benefit.
5. **Use and trade-off:** Offers an earlier Waterborne SEED-accumulation option compared with late Airborne Sim'mushro'dim **0.15/h at 160–195%**, which also warms and can be Mycelial-boosted. Brookrill can work with **Flooded Rice** and other Seed-bearing Aquatic crops, but Cooling may impede plants in Cold/Freezing states. Its total Seed gain is determined by eligible time before harvesting—Plant's own Seeds and harvest identity stay fixed. A player may alter/interrupt the flooded canal with Droughtcap or Wakemorel, which ends downstream production even if Brookrill is still living.
6. **Recipe relevance:** Ordinary Waterborne source reach and cooling/production, not a final Aquatic transformation requirement.

**Critical side-effect feasibility:** Unlike Rainmorel's **Airborne directional Wetting**, Brookrill's **Waterborne cultivation** cannot independently create its Flooded path; players need a flooded baseline, environmental Sources such as Rainmorel/Mistruffle, and/or appropriate blockers. This preserves the intended cross-fungus environmental puzzle.

### I. Diversity audit after proposed six

| Wanted capability | Already APPROVED source | ADDITIONAL proposed source in this section | Meaningful trade-off |
| --- | --- | --- | --- |
| **Plant Seed Germination Adjustment** | Hushroom **+8pp/Seed, Darkening**, independent | **Dewmender +4pp/Seed, Wetting** | Germination potency versus which environmental problem must be solved |
| **Ripening slowdown** | Veilcap **−20%, Darkening** | **Lanterncap −12%, Brightening** | Stronger Dim/Dark support vs Bright-field support with less slowdown |
| **Ripening acceleration** | Wakemorel **+25%, Drying** | **Tickbolete +12%, Warming** | Faster dry drainage vs slower Thermal alteration |
| **Harvest Window widening** | Droughtcap **+25%, Drying**, Airborne | **Rilllace +12%, Cooling**, **Waterborne** | Amount versus geographic reach and Flooded infrastructure |
| **Time-based Leaf Production** | Echomorel **+0.15/h, 160–190%, Cooling**, Mycelial-preferring | **Duskleaf +0.08/h, 70–125%, Darkening** | Early versus late lifecycle opportunity, with different environmental compromises |
| **Time-based Seed Production** | Sim'mushro'dim **+0.15/h, 160–195%, Warming**, Mycelial-preferring | **Brookrill +0.10/h, 120–170%, Cooling**, **Waterborne** | Mid versus late accumulation; aquatic connection vs Airborne propagation |

**Result after user approval:** Prior approved 19 + six approved in §54 = **25 working candidate fungus species** total, including Mycelord, with **NO roster cap or implied 25-target**. Common primary Effect categories now have at least two source candidates at varying strengths and/or different delivery; still only **one Seed Timing Shift** and **one of each Allocation direction**, all §53 approved. Additional niche variants and consolidation can be explored next; **do NOT premerge now**, and do not add Fertility-only or Enchanted-only fungi unless their parent environmental systems gain a clear role. This is fungal DESIGN work only, not final numeric balancing or implementation.

**User review update (26 October 2026):** §47 Mycelord, §§48–50, §53 and **all six §54 fungus bundles** are **APPROVED first pass**: **25 working species total**, not a cap or global numerical balance. The Leaf-over-Seed **economic asymmetry is AGREED**, but the 3:1 (or 2:1 / 4:1) exchange rate, stage eligibility, bounds and rounding remain **OPEN**. Additional source alternatives may be proposed; they do not become approved without user review. The dedicated Plant-owned transformation pass remains after fungal roster/system balance. No gameplay code changed.


## 55. Fungi — three alternative Sources for remaining singleton desirable Effects (APPROVED first-pass bundles)

**Status (26 October 2026):** The user approved all six §54 fungi, bringing the first-pass approved roster to **25 species including Mycelord**, and reaffirmed the **AGREED §52 principle**: most desirable direct cultivation Effects should be available from multiple meaningfully different fungal Sources so that obtaining Effect A does not mandate Fungus B. **Mycelord remains the sole Mycelial-creating fungus species**. **APPROVAL UPDATE (26 October 2026):** The user reviewed and **APPROVED Gloamclock, Bristlecap and Goldgill as first-pass species, Effect pairings and design roles**. The working approved roster is now **28 candidates including Mycelord**, not a cap. No full fungal numerical pass or code changes are authorized by these proposals.

**Scope:** This small batch provides one more **EARLIER Seed Timing Shift** Source, one more **Leaf-favoring Allocation** Source, and one more **Seed-favoring Allocation** Source. Each uses an existing Effect category, one ordinary signed environmental step, and a distinct short-range Airborne cultivation footprint. Crucially, it offers **non-Waterborne routes** to Seed Timing and Seed-favoring Allocation without deleting Tidegill's or Sunspore's advantage along connected Flooded corridors. Exact Allocation exchange units, strength, stacking, curve eligibility and rounding remain **OPEN for the fungus-wide system pass**; this section does not smuggle in a 3:1 ratio.

### A. Three approved first-pass Effect bundles

| Fungus (working name) | Environmental emission | Independent Plant-development emission | Fungal habitat | Existing alternative and meaningful difference |
| --- | --- | --- | --- | --- |
| **Gloamclock** | **Darkening −1 Illumination**, Luminous, Airborne Range 2 | **Seed Timing Shift −8 progress points EARLIER**, Airborne Range 1 | **Mycelial-independent** | **Tidegill** gives stronger −12 EARLIER via Waterborne Range 3 while Brightening; Gloamclock reaches non-Flooded fields but only locally and may darken a light-dependent crop |
| **Bristlecap** | **Drying −1 Moisture**, Aqueous, Airborne Range 2 | **Leaf-favoring Leaf–Seed Allocation**, Airborne Range 1 | **Mycelial-independent** | **Frostfolio** uses Cooling and can gain a Mycelial-preferring source-side boost; Bristlecap needs no Mycelial but may Dry a valuable crop or sever a Flooded route |
| **Goldgill** | **Brightening +1 Illumination**, Luminous, Airborne Range 2 | **Seed-favoring Leaf–Seed Allocation**, Airborne Range 1 | **Mycelial-independent** | **Sunspore** uses Warming and Waterborne Range 3; Goldgill works without a Flooded route but reaches fewer hexes and may over-brighten shade-preferring Plants |

For the two Allocation alternatives, no relative numeric conversion **strength** is asserted. Different environmental side Effects and propagation are meaningful distinctions already; once Allocation semantics are defined, compare per-Source allocation intensity, compatibility, setup economy and viable crop outcomes rather than silently assuming all Allocation emitters are identical.

### B. Gloamclock — APPROVED first-pass Airborne earlier-Seed alternative

1. **Lifecycle/Spores:** Standard 0–100% fungal Growth, 100–200% Sporulation, emission from successful germination and after maturity while viable; one destructive harvest yields **Gloamclock Spores only**. Stage days, Spore quantity and germination odds remain for the fungus-wide pass.
2. **Environment:** **Darkening −1 Illumination**, Luminous **Airborne Range 2**, fixed signed environmental Property step; no per-Plant reversal or special darkness requirement.
3. **Plant Influence:** **Seed Timing Shift −8 progress-percentage points EARLIER**, **Airborne Range 1**, multiplied by the recipient Plant's approved Seed Timing compatibility. It shifts the existing Seed-availability curve; it **does not increase Seed count, create Seed identity, accelerate the Plant lifecycle, produce Seeds per hour or work on sterile Plants**. Precise shift composition/clipping stays open.
4. **Habitat:** **Mycelial-independent**, no extra Temperature/Moisture/Illumination fungal-maintenance matrix.
5. **Puzzle:** A modest local alternative for Seed-bearing Plants **without a Flooded connection**. A Dim/Dark-preferring Seed crop may welcome Darkening, but a Bright crop may need another Source or selective Luminous blocking to preserve its harvest value. Tidegill's stronger Waterborne Range 3 remains advantageous along actual Flooded corridors; its separate Airborne Brightening is not interchangeable with Gloamclock's darkness. For approved **Rice 1.6× Seed Timing compatibility**, the nominal −8 would be −12.8 points before any eventual curve bounds; this is a response example, **not** a promise that Seeds exist at a particular progress point.
6. **Transformation:** Existing Illumination and Seed Timing consequences only. No named Plant transformation recipe, additional Source-presence mechanic or exclusive unlock.

**Feasibility question for later audit:** At which harvest stages does earlier Seed availability improve the same destructive harvest as Leaves, instead of merely making no difference to the optimal harvest? Compare non-Flooded placements against Tidegill's flooded routes and verify blockers can separate short-range cultivation from broader Darkening when required.

### C. Bristlecap — APPROVED first-pass Mycelial-free Leaf-favoring Allocation alternative

1. **Lifecycle/Spores:** Standard emitting fungal Growth/Sporulation, persistent emissions at 200%, destructive harvest of **Bristlecap Spores only**; exact biological/economic numbers deferred.
2. **Environment:** **Drying −1 Moisture**, Aqueous **Airborne Range 2**, a normal additive Property step. Can turn Flooded→Damp or Damp→Dry when not counterbalanced.
3. **Plant Influence:** **Leaf-favoring Leaf–Seed Allocation**, **Airborne Range 1**, trading an actually eligible Seed budget for additional Leaves on the **same Plant's one harvest**. Must not grant free Leaves to Seedless/sterile Plants, alter the natural Seed identities, convert Fungus Spores or provide a second harvest. No numerical exchange ratio, rounding rule, output cap or progress-overlap rule is proposed here.
4. **Habitat:** **Mycelial-independent**, unlike Frostfolio's Mycelial-preferring option. Bristlecap emits without Mycelord infrastructure, although it may eventually have a different intensity once global balance assigns one.
5. **Puzzle:** Bristlecap's Drying may beneficially drain a Flooded crop area toward Damp, but may lower ordinary Damp crops into penalized or lethal Dry. It can also break connected Flooded paths carrying a **different Fungus's Waterborne cultivation Influence** in the same environmental recalculation. Frostfolio instead cools its wider surroundings and may benefit from Mycelial on the Fungus source hex. Neither effect gives Leaves without sacrificing real potential Plant Seeds, so high Leaf output still creates a rotation-sustainability cost.
6. **Transformation:** Ordinary Drying and trade-off relevance only; no Plant-owned recipe assignment.

**Feasibility question for later audit:** If Leaves and Seeds do not overlap at a Plant's intended harvest progress, does Allocation do nothing or use a narrowly defined eligible budget? That system-wide decision must be settled for both Bristlecap and Frostfolio before claiming exact extra Leaves.

### D. Goldgill — APPROVED first-pass Airborne Seed-favoring Allocation alternative

1. **Lifecycle/Spores:** Ordinary 0–200% fungal Growth/Sporulation and persistent living Source; one destructive harvest of **Goldgill Spores only**; all stage times, Spore rates/counts and survival numbers open.
2. **Environment:** **Brightening +1 Illumination**, Luminous **Airborne Range 2**, same globally consistent signed step as other Light Sources.
3. **Plant Influence:** **Seed-favoring Leaf–Seed Allocation**, **Airborne Range 1**, exchanging actually eligible Leaves for more of the Plant's **already valid Seed identity/identities**, subject to a later bounded conversion rule. Absolutely sterile Plants remain sterile; the Effect cannot create a new Seed species or grant repeated harvests. No finalized Leaf→Seed exchange ratio, source intensity, compatibility multiplication or overlap rule.
4. **Habitat:** **Mycelial-independent**, operating without Flooded or Mycelial under the Source. Its cultivation Influence is locally Airborne, whereas Sunspore's is Waterborne Range 3.
5. **Puzzle:** Goldgill can serve **non-Flooded Seed-bearing rotations**, where Sunspore's Waterborne route cannot travel. Its +1 Brightening can improve a Dim field that wants Lit, but may compromise a Dark/Dim-preferring Seed crop or interact with other Illumination Sources and blockers. Sunspore keeps the ability to deliver Seed allocation farther along connected Flooded channels while emitting an independently traveling Warming Effect. Because Seed gain costs Leaves—the primary farming objective—Goldgill does not package a free high-value Leaf optimization even when Brightening happens to help the crop.
6. **Transformation:** Ordinary Light/Allocation roles only. No Plant-specific requirement or named-fungus transformation recipe.

**Feasibility question for later audit:** Compare Goldgill's small local Airborne footprint against a Sunspore Waterborne Range 3 canal, especially where blocking Brightening would also obstruct desirable garden light. Verify any allocation benefits preserve Seed identity/mixes and do not run when the Plant has no eligible Seed-producing possibility.

### E. Coverage and approval boundary

| Desirable Effect direction | Earlier approved singleton | Newly approved alternative | Difference to test |
| --- | --- | --- | --- |
| **Seed availability earlier** | Tidegill −12, Waterborne R3, Brightening | **Gloamclock −8, Airborne R1, Darkening** | Higher routed reach/power vs local non-Flooded usability; opposing Light emissions |
| **Leaves for Seed sacrifice** | Frostfolio, Airborne R1, Cooling, Mycelial-preferring | **Bristlecap, Airborne R1, Drying, independent** | Different environmental hazard and Mycelial/setup cost |
| **Seeds for Leaf sacrifice** | Sunspore, Waterborne R3, Warming | **Goldgill, Airborne R1, Brightening** | Flooded-network reach vs local use without a water route |

**APPROVAL UPDATE:** Gloamclock, Bristlecap and Goldgill are **APPROVED first-pass profiles**. Together with the 25 through §54, there are **28 approved working candidates**, not a cap. Source strength and full fungus balancing remain provisional; no extra Mycelial creator or new Effect category has been added. **§56's Leaf–Seed Allocation rules and unlimited Waterborne connectivity were subsequently APPROVED**. Earlier Waterborne Range 3 references in §§53–55 are superseded by the unlimited connected-Flooded rule. The Plant-owned transformation-recipe pass remains separate.


## 56. First-pass Leaf–Seed Allocation mechanics and unlimited Waterborne reach (APPROVED)

**Status (26 October 2026): APPROVED.** The user expressly accepted the **3:1 Leaf–Seed conversion and all accompanying harvest-time, compatibility, stacking, rounding and source-strength rules below**, and approved **unlimited Waterborne propagation**. The roster is **28 approved first-pass Fungus species**, with no count cap. The user favors deliberately strong initial values and playtest-driven numerical balance. **Implementation priority clarified afterward:** finish defining the approximate Plant/Fungus roster, perform a whole-roster Effect-coverage and logic review, **then** implement Plant/Fungus gameplay; meanwhile, the **Waterborne environmental change is authorized now** and is implemented in Prototype 1. Do not treat numerical balancing as a prerequisite for the coverage/logic review, and do not begin Plant/Fungus implementation yet.

### A. APPROVED first-pass Allocation: one harvest-time exchange, not an ongoing production stream

1. **Common unit exchange:** **3 ordinary Plant Seeds sacrificed → +1 Leaf** for Leaf-favoring Allocation; **1 Leaf sacrificed → +3 ordinary Plant Seeds** for Seed-favoring Allocation. This is the deliberately punchy **APPROVED first-pass 3:1 rate**, subject to playtest balancing. Leaves remain the primary valuable harvest; Seeds still matter for sustainable rotations. Fungus Spores are NEVER part of this exchange.
2. **Eligibility at the actual destructive Plant harvest:** Compute available non-Allocation Leaves and Seeds at the Plant's current lifecycle progress after native curves, environmental penalties, Yield Adjustments, valid accumulated hourly production and other non-Allocation effects. **Require at least one whole Leaf AND one whole existing valid Plant Seed**, so Allocation operates only where both streams overlap at harvest. A Plant with no Seed identity/sterile Seed output is ineligible; harvesting with zero Leaves or zero Seeds skips Allocation, even if an emitter is present. **Seed Timing Shift and hourly Seed Production can make an earlier overlap possible**, creating deliberate multi-fungus setups without a generic transformation trigger.
3. **Single snapshot, active reach:** Check all currently reaching Allocation Sources **once at harvest**. Allocation is not an hourly emitter, does not accrue during Growth/Ripening, does not retroactively alter already collected output, and cannot grant a second harvest. Other time-based production rules continue to require positive progress.
4. **Strength means fraction of the donor stream eligible for exchange, not a free Yield percentage.** Approved first-pass emitted fractions: **Frostfolio 80% Leaf-favoring**, **Bristlecap 60% Leaf-favoring**, **Sunspore 80% Seed-favoring**, **Goldgill 60% Seed-favoring**. These strong percentages make a single source noticeable, with the harder-to-deliver or Mycelial-preferring source usually having a larger nominal magnitude. For Frostfolio, Mycelial on its own fungus source hex multiplies its emitted Allocation fraction by **1.25× (80%→100%)**; this is an approved first-pass **Frostfolio-specific** source amplification, **NOT** a new global buff for every preferring fungus.
5. **Signed net Allocation, never sequential exchanges:** For each reaching Source, use its signed emitted fraction (+ for Leaf-favoring, − for Seed-favoring), any declared source-side Mycelial multiplier, and the recipient Plant's approved **Leaf–Seed Allocation compatibility**. **Add them algebraically once**, then clamp to **−100%…+100%**. Opposite directions cancel instead of converting back and forth to manufacture resources. A +80% and −60% at compatibility 1.0× resolve to **+20% net Leaf-favoring**, for example. All unbounded repeated exchange loops are forbidden.
6. **Integer output and rounding:** Resolve non-Allocation Leaf and Seed totals to nonnegative **whole items (floor after their ordinary calculations)** before this exchange; no fractional items can be harvested. Let the clamped signed net fraction be A, with current whole Leaves L and total whole Plant Seeds S. If A is positive, **converted groups = floor(S × A / 3)**; collect **L + groups Leaves** and **S − 3 × groups Seeds**. If A is negative, **converted Leaves = floor(L × |A|)**; collect **L − converted Leaves** and **S + 3 × converted Leaves Seeds**. A = 0 leaves both quantities unchanged. This ensures no missing donor units, negative inventory, free output or hidden carryover. If a fraction is too small to fund a whole conversion, nothing is exchanged at that harvest.
7. **Seed identities:** Newly produced Seeds retain only the species identities the Plant was already eligible to produce. For multiple native Seed identities, proportionally distribute any Seed reduction/addition according to the non-Allocation eligible Seed counts, using a deterministic **largest-remainder integer split** with stable Seed-identity order for ties. No Fungus ever invents a Seed identity or changes its owning Plant's defined mix beyond rounding effects.
8. **Ordering constraint:** Apply ordinary Yield bonuses/time-based additions **before** the one-time Allocation step; do **not** multiply the converted extra Leaves/Seeds again by Yield bonuses afterward. Applying Allocation once at harvest avoids compounding/circular amplification.

**Deliberately dramatic example with hypothetical overlap, NOT a named Plant's actual curve:** A harvest otherwise providing **12 Leaves and 12 Seeds**, reached by an 80% Leaf-favoring source at 1.0× compatibility, spends 9 Seeds for **15 Leaves and 3 Seeds**. With an 80% Seed-favoring source instead, it spends 9 Leaves and finishes with **3 Leaves and 39 Seeds**. That Seed result is intentionally huge enough to expose balance problems in playtests. If both types reach the target at equal magnitude, they cancel and no exchange occurs. At a Plant stage with only one eligible stream, neither result is permitted.

**First-pass tests to write when implementing:** Both-streams-zero/single-stream cases; exactly 2 vs 3 Seeds available; compatibility below/above 1.0×; multiple same-direction Sources capping at 100%; opposing directions canceling; Mycelial boost on the **Fungus source** but not the Plant; mixed Seed identities; integer rounding; valid Plant harvest removing its one object; interaction with early Seed Timing and hourly production; and no second multiplication by Yield.

### B. APPROVED unlimited Waterborne connectivity (implemented in Environmental v1.1)

**Agreed rule:** **Ordinary Waterborne propagation is unlimited**: one emitted Waterborne Influence reaches **every Flooded hex connected through a valid unblocked Flooded path**. This is graph connectivity/flood-fill rather than a numerical Range cap. The garden is finite, so the area of effect remains bounded by the actual connected flooded component(s), selective Blockers and topology. Existing **Airborne Range** and **directional Spread Budget Propagation** keep their distinct finite rules.

**Exact first-pass semantics:**

1. A Source on **Flooded** can propagate its Waterborne emission to its entire blocker-reachable Flooded component. A Source on a **non-Flooded** hex retains the established rule that it can **inject into any adjacent Flooded hex** (the first edge); each reachable adjacent Flooded component may carry it indefinitely. The Source hex itself is still a distance-0 reached location under general Source rules.
2. **Dry and Damp** cannot carry Waterborne Influences. Use Moisture resolved after Airborne/routed Wetting and anchors, **before** Waterborne propagation. A routed Rainmorel Wetting or other ordinary Airborne Wetting may establish Flooded connections in the same environmental recalculation; **Waterborne itself still may not modify Moisture**, avoiding self-created routing feedback.
3. **Full and matching Kind/Mode Hex or Edge Blockers** interrupt Waterborne paths exactly as they do now. A blocked edge need not disconnect the entire component if another flooded route goes around it. One emission applies at most **once to each reached hex**, even if many flooded paths lead there. Multiple separate Sources remain independently applicable/stackable.
4. This change applies to **all ordinary Waterborne emitted Influences**, including future environmental-targeting or cultivation-targeting ones—not only Fungi—and to configured Prototype 1 test Sources. **Environmental Adjacency** tagged Waterborne (Flooded→Damp) **remains only a one-neighbor, one-pass adjustment**, not an unlimited emission. The existing routed Straight Until Blocked traversal remains budget-controlled even when Wetting can create a Waterborne path.
5. Earlier **Waterborne Range 3** cultivation footprints (Tidegill, Sunspore, Rilllace, Brookrill) are **superseded by unlimited connected-Flooded reach**. Their separate Airborne environmental emissions retain their own listed Ranges. Non-Waterborne alternatives such as Gloamclock and Goldgill remain useful on non-Flooded fields despite their small local Airborne Ranges. Historical Range 3 mentions in earlier species profiles describe the older first-pass drafts, not the current rule.

**Why try it:** Flooded networks become genuinely valuable farm infrastructure: one Source can affect a long canal system, while deliberate drainage and selective Blockers can partition it. It exaggerates the payoff for investing in a connected Waterborne garden, matching the user's preference to test a powerful implementation before nerfing it. **Risk:** one Source may become a near-global Influence on a large Flooded garden, reducing placement challenge; evaluate actual garden geometry and supply costs before adding arbitrary Range limits again.

**Prototype 1 tests:** Source Flooded vs non-Flooded adjacent injection; propagation over a long flooded chain; a Dry/Damp gap splitting reach; blocker cuts and alternative routes; routed Wetting creating connectivity; anchored Flooded participation; same hex reached by several paths only once; Waterborne-tagged adjacency still one-neighbor; no Waterborne-Moisture feedback; Airborne/Spread Budget unaffected. These invariants are part of the implemented simulation test suite.

### C. Implementation boundary after approval

- **Done now:** Update Environmental System v1.1 and the deterministic **src/core/** simulation, test cases and UI to use unlimited connected-Flooded Waterborne reach with no Range slider. Preserve the existing React/Vite frontend and independent JSON-compatible rules core.
- **Before implementing Plants and Fungi:** Complete a more-or-less defined roster, audit coverage of desired Effects and meaningful alternatives, and reason through logical contradictions and feasibility. This is easier while roster edits remain text-only. The full fungus-wide exact numerical balance is **not** required for this review.
- **After the roster/logic review:** Implement Plant lifecycle, Seeds, Fungus emissions/Spores and this approved one-time Allocation mechanism with unit tests; then playtest and revise numerical values. Keep Plant-owned transformation recipes in their separate comprehensive pass rather than inventing them incidentally.

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

## 58. Transformation RESTARTS every new Plant at 0% — APPROVED; supersedes progress continuity

**Status (26 October 2026): AGREED and explicitly clarified by the user.** The earlier assumption that Transformations preserve 0–200% lifecycle progress was a mistake and is **REJECTED**. Every Transformation replaces the old Plant with a new Plant starting at **0% Growth**, as if freshly placed in that species' first stage. This applies across **all six families, all transformation edges, successful/recovery/unwanted branches, and every species that is obtained exclusively through Transformation**. All previously approved Plant durations, yield curves, environmental Responses, hazards, Seed identities and compatibility values remain first-pass starting values; only the transformation continuity assumption changes. **No code implemented yet.**

1. **Object replacement, not progress mutation:** Remove the old Plant instance and create a new instance of the destination species **on the same hex** at **0%**. This counts as the sole object occupying that hex, not two simultaneous objects. No Seed-planting attempt or germination roll is required by an ordinary Transformation; the source Plant already existed.
2. **Discard all old transient state:** None of the old Plant's Growth/Ripening progress, already available or banked hourly Leaves/Seeds, Seed inventory at partial progress, hazard/death exposure hours (Freezing, Hot, Mycelial, Dry/Wet etc.), Dormancy flag, source/exposure recipe timers, or other accumulated state carries over. A sterile destination remains sterile; no old Seed identities can leak through.
3. **Initialize the new species cleanly:** Use its species-specific Growth speed and current resolved environment starting at 0%. Start any newly applicable hazard/exposure clocks from zero. Source Influences currently reaching the hex may begin affecting the new Plant according to its own compatibility and eligibility, but do not retroactively earn output or exposure from the predecessor's past.
4. **Transformation-context traits are new initialization, not inheritance:** Existing approved origin-defined exceptions, notably Starlotus's Damp/Flooded attunement according to the qualifying source route, may be assigned **freshly at the moment the new species is created**, if that Plant's own established trait requires it. They are not copying the predecessor's accumulated state and do not change the new 0% lifecycle start.
5. **One destructive harvest still applies:** A transformed Plant is a new unharvested instance that can eventually yield its own single consuming harvest. Nothing from the destroyed predecessor is automatically harvested or awarded. The new species must actually advance through its own eligible Leaf/Seed production windows. A target with Leaves only at **50–120%** can now reach that interval even if its precursor transformed at **150%**.

**Feasibility consequences:** Old warnings that Daisyspell, Cactaclysm, Glass Apple, Orchidemon or Rosewraith must be reached *before the predecessor's peak percentage* no longer apply. The **new species' full Growth/Ripening time matters for harvesting that species, NOT for eligibility to transform it again**. Transformation-chain speed is governed by the exposure durations, event sequences, and Source/environment setups in each Plant-owned recipe, with **no lifecycle percentage/stage gate** (§59). A chain can advance through multiple identities long before any intermediate Plant matures. First-pass lifecycle numbers are not preemptively rebalanced.

**New logic question for the later Plant-owned recipe pass:** If a new 0%-progress Plant immediately meets another transformation condition on the same hex, don't allow an unbounded zero-time cascade or loop. Define a deterministic per-update transformation limit / timer reset and recipe-priority policy before implementation; no concrete species recipe is assigned by this rule.

## 59. Transformation eligibility is environment-and-exposure driven, never lifecycle-gated (APPROVED)

**Status (26 October 2026): AGREED.** The user confirmed the global distinction: **lifecycle progress/stage determines a Plant's growth and harvest output; environmental interactions determine what species the Plant can become.** Transformations may occur at **any 0–200% lifecycle progress**, including Growth, Ripening, and 0%, whenever the Plant's own recipe is fulfilled. **No Transformation recipe may require a precise percentage, minimum/maximum maturity, or being in Growth versus Ripening.** This supersedes §17's old permissive “lifecycle progress/stage” recipe check and any earlier Aquatic wording that requires drainage *during Ripening*. All Plant-owned exact recipes and numeric exposure durations remain reserved for the dedicated later pass; no new Fungus Effect or game code is added here.

### A. What counts toward a Transformation

1. **Plant identity and its own permitted outgoing edges** determine which recipes exist. Ingredients terminal Plants remain untransformable.
2. **Currently resolved environmental Conditions** (e.g. Flooded, Damp, Hot, Freezing, Lit), independent ordinary named fungal Influence reach, physical fungal adjacency, and overlay presence may be combined in a recipe. These are existing system concepts, not a generic emitted Transformation Influence.
3. **X uninterrupted hours of qualifying exposure** are the ordinary timed prerequisite. Breaking the relevant condition resets that Plant's associated recipe timer; different recipes may have separate timers. No lifecycle-progress gate is implied by duration.
4. **Ordered environmental events can be requirements:** for example, remain Flooded for X uninterrupted hours and then drain to Damp; or withstand Freezing for X hours and then thaw. Evaluate the just-completed qualifying exposure **immediately before** the environmental change resets its timer; the change event can activate a Plant-owned recipe when its other requirements hold. No permanent historical “bank” is introduced.
5. On success, §58 applies: replace the precursor with a **fresh 0%-progress new Plant**, clearing its old exposure/recipe/death timers and accumulated output. A next Transformation may begin qualifying immediately with **new exposure time**, without waiting for the new Plant to grow to 100% or any other percentage.

**No lifecycle restriction exception is needed for Aquatic.** Event ordering, simultaneous competing recipes and death-versus-transformation priority still need deterministic global rules before implementation, but none requires consulting Plant maturity.

### B. Aquatic flood-and-drain fork without a stage check

These are **structural recipe sketches**, not finalized fungal assignments, X-hour values or exclusive conditions:

| Existing Aquatic edge | Stage-free environmental sequence / distinction |
| --- | --- |
| **Moonlit Lotus → Starlotus** | Sustain qualifying **Flooded** exposure, then trigger **Flooded → Damp** drainage while any additional ordinary source conditions are satisfied; new Starlotus receives **fresh Damp attunement**, starts at **0%**. |
| **Moonlit Lotus → Pearlily** | Maintain **Flooded** with its own appropriate source/exposure requirements for the Pearlily branch; no drainage event and no Ripening gate; new Pearlily starts at **0%**. |
| **Kelpergeist → Starlotus** | Qualify with the specialist ordinary fungal influence/condition while remaining **Flooded**; new Starlotus receives **fresh Flooded attunement**, starts at **0%**. |
| **Kelpergeist → Kelpless** | Sustain **loss of Flooded** for its own continuous X-hour threshold; the undesirable new Kelpless starts at **0%**. Restoring Flooded before expiry resets the timer. |

**Physical feasibility:** A Waterborne cultivation Influence that qualified the Plant while Flooded may stop reaching it as soon as drainage breaks connectivity. A transition recipe may inspect the **pre-change exposure and arriving state** at the event; any Influence required *after* drainage must truly propagate to the new non-Flooded state by its ordinary rules (e.g. independent Airborne reach). Do not create a special Waterborne exception merely to force a route to work.

**Preserve existing Aquatic decisions:** The two Starlotus attunements and their reversible +60% native Leaf benefit remain; Moonlit Lotus's harvest choices, Pearlily's shortcut via Cresscent, and Kelpless's redemption route remain. Their exact recipes are still open. **Silvercress's innate +60% Growth rate while Flooded during Growth and +50% Leaf Yield while Damp during Ripening are NOT Transformation rules**; lifecycle-specific harvest optimization continues to work unchanged.

### C. Economy versus discovery time

**Corrected inference:** Resetting a newly transformed Plant's progress to 0% does **not** intrinsically slow the *next Transformation*. A chain A → B → C can complete after A's X-hour exposure plus B's own Y-hour exposure (and required environmental transitions), even if B never matures. The full new lifecycle matters only when the player chooses to **grow and harvest** B rather than transform it. If exact future recipes include long exposure requirements, that is their environmental setup cost—not a maturity prerequisite.

**Future implementation tests:** A transformation at 0%, 75%, 150% and 200% under otherwise identical qualifying exposure; pre-drain exposure snapshot before timer reset; Waterborne loss at drainage without ghost influence; Flooded-restoration interruption of Kelpless countdown; multiple independent recipe timers; new Plant reset with no inherited timers; no recursive same-instant Transformation; Silvercress's stage-specific non-Transformation bonuses unaffected.


---

## 60. Fungus/Plant interaction audit — approved global decisions and tracked Yield; timing details still OPEN

**Status (26 October 2026):** The user approved the interaction-audit recommendations on peak stacking, extreme slowdown, dependent-fungus grace emissions, simultaneous death/Transformation, cultivation Blocker Kinds, and overlapping Mycelial sources. **The user explicitly corrected the proposed harvest-time snapshot treatment of ordinary Yield bonuses.** Plants earn and track output during their productive lifecycle, with an active Yield fungus improving the amount earned *while it actually reaches the Plant*. **The user subsequently APPROVED Option A: Yield-enhanced ordinary Leaves follow the same natural Ripening decline as ordinary Leaves.** More detailed dynamic timing/window accounting remains for a later pass. None of these additional Plant/Fungus rules is implemented in code.

### A. APPROVED — combine lifecycle-curve modifiers without creating new peaks

- For signed **Leaf Peak Timing** adjustments, sum the signed contributions from all reaching emitters, with the relevant Plant compatibility applied to each magnitude. Earlier and later contributions cancel algebraically. Apply the same net shift to each existing natural peak; e.g., Rosewraith's 115% and 180% peaks move together, without creating/removing a bloom or destroying its distinctive weak valley. Keep peaks in the 0–200% domain; exact boundary-clamping and interpolation remain an implementation/detail pass.
- **Harvest Window widening** separately increases the breadth of existing productive intervals; it does not shift their centers, create a new peak, or erase Rosewraith's intended weak valley. Its stacking/geometry must honor those invariants.

### B. APPROVED — keep deliberately powerful slow-Ripening/time-production combinations

- Veilcap/Lanterncap slowdown plus Echomorel/Duskleaf or other qualifying hourly production may produce enormous returns and is intentionally available for playtesting; do not prematurely rebalance it out of existence.
- Ordinary reaching fungal rate slowdowns cannot reverse Growth/Ripening progress or, on their own, drive an otherwise progressing, non-dormant Plant to a negative or exactly zero rate. Enforce a small positive rate floor, value deferred. Species-defined Dormancy and applicable environmental suspension can still fully pause progression. As already agreed, **hourly extra production does not accrue while progress is actually zero**.

### C. APPROVED — Mycelial-dependent fungi keep emitting through habitat-loss grace

- A Mycelial-dependent Fungus (notably Rushroom/Siltgill) must have qualifying Mycelial on its own occupied hex for initial establishment/germination. If that overlay is later lost, the fungus remains alive **and emits its ordinary Effects at full normal strength** throughout its species-specific X-hour continuous grace period, until death. Restore Mycelial before expiry to reset the timer. At death, remove the instance and all its emissions. This intentionally permits risky temporary exploitation of fading Mycelial infrastructure.

### D. APPROVED — independent hazard clocks and rare same-instant priorities

- Track genuinely lethal habitat exposures independently by hazard; clearing one resets only its own continuous timer. These timers follow elapsed in-game time even through Dormancy. Environmental transition recipes examine just-completed pre-transition qualifying exposure before it is reset (§59).
- Use the finest supported simulated timestamp rather than coarsely forcing events into whole-hour collisions. **If death and a valid Transformation nevertheless mature at exactly the same timestamp, Transformation wins.** The old Plant is replaced by a new 0%-progress Plant with fresh hazard/recipe clocks (§58). Limit a Plant to one Transformation per resolution event, so no recursive zero-time chain. Exact ordering for competing simultaneously valid *Transformation recipes* remains for the dedicated recipe pass.

### E. APPROVED — classify each cultivation emission for existing selective Blockers

- No new Hex or Edge Blocker mechanics. Each cultivation emission needs an explicit **Kind** independently from its Mode, permitting distinctions such as Growth, Ripening, Leaf, Seed, Germination, harvest-timing or Allocation Effects, while the Fungus's separate environmental emission keeps Aqueous/Thermal/Luminous as applicable. The precise taxonomy/grouping can be revisited as UI experience warrants. Selective-by-Kind and selective-by-Mode Blockers remain the existing machinery.

### F. APPROVED — overlapping Mycelord colony contributions

- Multiple Mycelords may contribute overlapping Mycelial ground. A hex remains Mycelial while **any valid source contribution** maintains it; removing one Mycelord initiates retirement of *its own* contribution without erasing another Mycelord's. Continue the previously agreed **gradual, closer-to-removed-source-first retreat** for unsupported contributions. Timed spread is its own overlay process, not ordinary instantaneous Environmental Adjacency or Airborne/Waterborne travel. Full Blockers or selective Blockers matching the Mycelial propagation Kind can interrupt spread; precise contribution representation, timings, and retreat geometry remain later system details.

**APPROVED follow-up — Blocker severance causes gradual retreat (Option 2):** A Full Blocker or selective Mycelial-Kind Hex/Edge Blocker interrupts **both new Mycelial colonization and the supporting connection of an existing colony**. Reevaluate connectivity of existing Mycelial contributions to their live supporting Mycelord through unblocked colonized hexes. If an established branch loses every valid support path, that unsupported contribution **stops spreading and begins gradual retreat**; it does not disappear instantly merely because the Blocker was placed. Alternate unblocked paths and contributions from other supporting Mycelords preserve the relevant hexes. A severed branch may be rescued by restoring a valid connection before its retreat completes, which cancels its unsupported decay. For a cut branch, retreat advances outward from the severed support boundary; precise decay intervals and branched-order tie handling are later numerical/implementation details. Mycelial-dependent Fungi on subsequently cleared hexes begin their approved X-hour habitat-loss countdown while continuing to emit until death or restoration (§60C). **This is stronger than a Blocker merely preventing future expansion** and is an intentional player tool for dismantling dangerous colonies.

### G. IMPORTANT CORRECTION — ordinary Yield is earned during cultivation, NOT applied retroactively at harvest

The user expressly rejected the audit suggestion to calculate ordinary Leaf/Seed **Yield Adjustments** solely from whichever fungi happen to reach a Plant at the moment of harvest. That would allow a player to place a Yield Source at an already-completed peak, instantly multiply the entire output, and then remove it, destroying the intended growing-and-routing puzzle.

**Approved core direction:** Each Plant tracks the outputs it actually earns as its lifecycle progresses. During an eligible productive interval, an active reaching Yield fungus changes **the incremental Leaf/Seed amount being earned then**, in proportion to the Plant's compatibility, rather than multiplying all previously earned production at harvest. A fungus newly placed at 100% cannot retroactively increase the Leaves earned during 50–100%. If the fungus stops reaching later, credit already earned under it is not retroactively canceled merely by that source disappearing. Distinct fixed-window Leaves/hour and Seeds/hour Effects likewise record earned additions over their actual qualifying time. **A Transformation discards all output**, as already approved in §58. Germination remains a sowing-time check, and **Leaf–Seed Allocation is still the separate approved once-at-harvest exchange** (§56).

**APPROVED — Option A, ordinary Yield bonuses follow the native Leaf decline:** When the Plant's own available ordinary Leaves decline during Ripening, the already-earned Yield-enhanced Leaf amount declines by the **same proportion**; bonus Leaves are not protected in a separate permanent pool. For example, a Plant that ordinarily has **10 Leaves at 100% and 5 at 150%** but earned **12 at 100%** thanks to a correctly timed Yield fungus has **6 Leaves at 150%**, not 7. If the natural ordinary Leaf curve reaches zero at 200%, this Yield-enhanced ordinary Leaf stock also reaches zero. Removing the fungus after its production window does **not** retroactively cancel earlier earnings; subsequent natural decline is a **Plant lifecycle rule**, not a retroactive Source reassessment. This does **not** automatically award bonus Seeds from Leaf Yield; actual Seed production and Seed Yield follow their own eligible mechanisms. The separately defined **fixed-window hourly Leaves/hour and Seeds/hour accumulated extras** retain their existing distinct banked-output rule until harvest, subject to their own already approved restrictions; do not conflate them with the native-curve ordinary Yield bonus.

**APPROVED — live Leaf Peak Timing and Harvest Window changes are prospective only:** These Effects start modifying the Plant's ongoing production/decline schedule when their Influence **begins reaching** it and stop modifying that schedule when reach **ends**. Their current signed net and width adjustment determine the Plant's **next** ordinary output changes as lifecycle progress advances. Neither gaining nor losing reach instantly adds, subtracts, restores, or backfills output for progress that has already elapsed. If a shifted or widened productive interval includes the Plant's *current and subsequent* progress, its effect operates from that moment forward; if an interval has already passed, that earlier opportunity is gone. Previously earned output remains subject to **subsequent** ordinary lifecycle decline as agreed in Option A. The user regards this as the natural same-rule-as-other-fungal-effects interpretation; it does not require an additional special gameplay system.

**Remaining implementation details, not new design choices:** Exact curve interpolation, fractional production and rounding when the effective curve changes mid-progress, while preserving this no-retroactivity rule; one destructive harvest, Seed identities/sterility, and the separate §56 harvest-time Allocation conversion. No numerical balancing is required now.

---

## 61. Environmental simplification and Flooded Mycelial barrier — APPROVED

**Status (26 October 2026):** The user expressly approved **Flooded as a barrier to Mycelial spread** and requested that **permanent hex Material and Fertility be cut from the game entirely**, because no approved Plant/Fungus gameplay requires them and the remaining garden already has sufficient depth. This supersedes §§7, 9, 14, 19 and earlier provisional references to Dirt/Sand/Clay/Stone, Fertility, or Material-based transformation conditions. The three-Property cleanup is implemented in the existing environmental Prototype 1 (see [Environmental System v1.2](environmental-system-v1.2.md)); **Plant/Fungus runtime and the timed Mycelial system remain unimplemented**.

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

## 62. Mycelord is vulnerable to Flooded — APPROVED

**Status (26 October 2026):** The user clarified that **Mycelord is weak to Flooded conditions on its own occupied hex and dies after X uninterrupted hours of that exposure**. This resolves the Mycelord-on-Flooded survival question left open in §61, without adding a fungus-wide environmental maintenance matrix.

- **Timed lethal habitat:** A living Mycelord occupying a **Flooded** hex starts its own continuous Flooded-exposure clock. If Flooded persists for its species-specific **X hours**, Mycelord dies and is removed. If its hex becomes Dry or Damp before X expires, the clock resets; future flooding must start a fresh uninterrupted interval. The exact value of X is a later playtest number.
- **APPROVED — direct Flooded germination is allowed:** A Mycelord can germinate successfully on an already **Flooded** hex, subject to the ordinary Spore germination rules. Its uninterrupted **X-hour death countdown begins immediately on germination**. While that occupied hex stays Flooded, it cannot establish or maintain outward Mycelial support or spread; the player can drain the hex before death to enable Mycelial growth and reset the exposure timer. There is **no special Flooded germination prohibition**, and this is not immunity to Flooded after germination.
- **Not Mycelial-dependent:** Mycelord still does **not require Mycelial ground** to establish or remain alive. Its new vulnerability is specifically to **Flooded Moisture**, not the absence of a Mycelial overlay. It retains the ordinary fungal lifecycle and Spores rules.
- **Flooded remains a barrier even while Mycelord survives:** Under §61, a Flooded Source hex cannot relay or anchor **active Mycelial support paths** while Flooded. Thus flooding its own occupied hex cuts its support connections immediately, while any already existing unsupported Mycelial contributions **retreat gradually**, not instantaneously. Other Mycelords and alternative eligible paths can still support affected ground. Draining before death permits its support connectivity to recover and can rescue retreating contributions that have not yet decayed; the death clock also resets.
- **Death is distinct from temporary flooding:** If Mycelord reaches X hours and dies, its own contributions lose their living origin and follow the already approved gradual retirement model, even if the hex later drains. Any overlapping contribution independently supported by another Mycelord remains.
- **Scope:** No Mycelial runtime is implemented by this text rule. Do not silently impose Flooded lethality on every Fungus; it is an approved Mycelord-specific weakness. Exact clock duration, tick-resolution ordering and decay timings remain implementation/playtest details.

---

## 63. Mycelial expansion and retreat advance with game time — APPROVED

**Status (26 October 2026):** The user expressly approved that **Mycelial expansion and retreat are genuinely time-based, independent of how often the environment is recalculated**. This clarifies the already-approved timed colonization (§60F) and gradual withdrawal after Flooding, Blocker severance or Mycelord removal (§§60–62).

- **Expansion takes elapsed game time:** Establishing an eligible path, removing a Blocker, or draining a Flooded hex **does not instantly colonize** previously non-Mycelial ground. New hexes are added by the timed, neighboring spread process from an eligible supported front.
- **Retreat takes elapsed game time:** Cutting a live support path immediately makes the affected contribution **unsupported and unable to expand**, but does not instantly erase the overlay. Its gradual retreat advances only as simulated time passes, according to the previously approved supported-connection and source-contribution rules.
- **Recovery preserves surviving ground:** Restoring a valid connection before a contribution actually retreats halts its pending retreat and preserves still-existing Mycelial. Previously removed ground must be **recolonized through normal timed expansion**; reconnection does not instantly fill gaps.
- **Recalculation is not a clock tick:** Recomputing the environment or toggling Flooding/Blockers repeatedly at the same simulated time cannot advance a colonization or retreat clock, create free Mycelial, or force an instant collapse. Connectivity changes determine which clocks are eligible to run; **elapsed in-game time** determines how far they run.
- **Still open:** Exact spread and retreat durations, and ordering between several fronts with equal completion times. The **broader Plant/Fungus/environment event-resolution order was subsequently approved in §64**. No Mycelial runtime was added.

---

## 64. Whole-garden event and update order — APPROVED

**Status (26 October 2026):** After explicitly approving time-driven Mycelial expansion/retreat (§63), the user clarified that they **also approve the complete six-step update order proposed in the interaction audit**. This is a design specification for future biology implementation; it does not change the already-implemented deterministic environment-only resolution order in [Environmental System v1.2](environmental-system-v1.2.md).

For each player action, timed completion, or other state-changing event at an exact simulated time:

1. **Finish the preceding elapsed interval under its actual prior conditions.** Advance ordinary lifecycle progress and accumulated Leaves/Seeds, continuous Transformation/hazard exposure, and eligible Mycelial expansion/retreat only for the real elapsed time during which their respective conditions held. An Effect that becomes active at the event cannot retroactively alter that interval. Split time advancement at intervening events instead of applying an end-of-hour snapshot to earlier minutes.
2. **Apply the current event.** Place/remove/harvest objects, apply Baseline/Source/Blocker changes, or resolve a scheduled biological event. For a Plant recipe driven by a transition such as **Flooded → Damp**, preserve/check its just-completed **pre-change continuous exposure** at that transition before resetting the old clock (§59). Transformed Plants are fresh 0%-progress instances with none of the old transient state (§58); where Transformation and lethal death mature at the exact same timestamp, Transformation wins (§60D).
3. **Recalculate the environmental state using the existing Prototype 1 algorithm.** Airborne and routed Sources/anchors establish Moisture and hence connected Flooded paths; ordinary Waterborne propagates over that snapshot; additive Modifiers, anchors, and the single non-chaining Environmental Adjacency pass yield the final Moisture, Temperature and Illumination Conditions (§6 of v1.2). A Waterborne effect does not create the water path carrying it.
4. **Update Mycelial support and eligible spread/retreat.** Using the newly resolved Flooded barriers, matching Blockers, living Mycelords, and separately tracked overlapping contributions, check which existing colonies remain supported. Unsupported contributions stop expanding and begin/continue **elapsed-time** retreat; newly reachable hexes enter **elapsed-time** colonization, not instant overlay creation. Reconnection preserves surviving supported Mycelial (§§60F–63).
5. **Update Fungal cultivation Influence reach and strengths.** Resolve distinct cultivation Effects using the current environmental Flooded network, travel Mode, Blockers and source-side Mycelial status. Mycelial-dependent Fungi still emit their normal Effects while alive during their already-approved habitat-loss grace; a recipient Plant does not need to stand on Mycelial to receive an ordinary reached Effect.
6. **Update living-organism Responses for the new state.** Start, reset, or continue each independent continuous hazard/recipe exposure clock, and determine prospective Growth/Ripening, output-earning and modifier rates from the currently reaching Effects. Resolve applicable Transformation/death events with existing same-timestamp priorities; changes only govern time from this state onward. If a Fungus dies or a Transformation alters the set of active Sources, recalculate affected stages at **the same simulated timestamp** until the resulting state is consistent, without inventing elapsed time or repeatedly earning output.

**Concrete consequences already agreed:** Draining a Flooded Waterborne corridor stops its Waterborne reach from the event onward without undoing historically earned production; flooding Mycelord severs its support immediately but only starts its species-specific death countdown and gradual colony retreat; and a Flooded→Damp Aquatic Transformation can inspect the previous uninterrupted Flooded exposure even though drainage immediately removes the qualifying condition. The specific timing of simultaneous player commands, distinct competing Transformation recipes, several equal-time Mycelial fronts, and fractional numeric integration/rounding remain detailed implementation questions, **not reasons to replace the approved six-step order**.

**Scope:** This approval is text-only. Do not implement Plants, Fungi, Mycelial, exposure clocks or Transformations merely because their update order is now specified.

---

## 65. Ordinary environmental output bonuses are earned during production — APPROVED

**Status (26 October 2026):** In the Seed-accounting interaction audit, the user explicitly selected **Option A: environmental bonuses are earned during production**, rather than Option B's current-condition multiplier on all previously accumulated output at harvest. This extends the already-approved tracked-output rule for ordinary fungal Yield (§60G) to **ordinary native environmental Leaf/Seed productivity multipliers**. It resolves ambiguity in older species language describing the *current* Temperature, Moisture or Illumination response; those conditions determine the **current rate of newly earned output**, not a retroactive change to earlier production.

- **Prospective accrual:** As a Plant progresses through its existing productive curve, calculate each newly earned increment of ordinary Leaves or Seeds using the environmental output multiplier that actually applied **during that progress interval**. If its hex changes Condition mid-window, previously earned output remains earned; the new Condition changes **subsequent increments** only. This applies equally to beneficial and adverse ordinary environmental output multipliers across Plant families, including Spices Illumination response and Desert Temperature bonuses.
- **No last-second harvest switch:** Freezing a nearly mature Pearadox does **not** retroactively grant +80% to Seeds it earned earlier outside Freezing. Maintaining Freezing through its Seed-producing progress can achieve the previously approved **15 → 27 Seed** example at full benefit; changing to Freezing late only boosts remaining eligible production. Similarly, changing Moonrice from Bright to Dim just before harvest cannot turn its previously underproduced Seeds into a full-Dim harvest.
- **Keep established decline and banking rules:** Already earned ordinary Leaves remain subject to the Plant's **future natural lifecycle decline** in Ripening, including proportional decline of earned Yield bonuses (§60G, Option A). Separately accumulated fixed-window Leaves/hour and Seeds/hour Effects keep their distinct banked-output rules; their accrual still requires positive lifecycle progression. Ordinary fungal Seed/Leaf Yield bonuses likewise remain prospective only. No Effect is awarded twice merely because the environment is recalculated.
- **Preserve specifically designed live-condition exceptions:** An innate trait explicitly defined as a currently active/deactive **state-dependent bonus to available output**, notably **Starlotus's origin-attunement matching bonus**, retains that species-specific immediate activation/deactivation. This exception is not a general license to re-rate all old environmental production or to create Seeds in sterile species. Species-specific identity/mix rules—including Mirage Rose's 1:1 eligible Seed identities—remain unchanged.
- **Integer handling:** Maintain unrounded fractional production internally as needed; at the one destructive harvest, floor ordinary output into whole Leaves/Seed items and apply the already approved §56 **single harvest-time 3:1 Allocation** (and deterministic mixed-identity rounding) afterward. Ordinary environmental multipliers are **not another harvest-time conversion**.

**Scope:** All previously approved numeric multipliers and species identities stay the same. Exact curve interpolation, floating/fixed-point representation, and event-boundary rounding are implementation tests, not new effects or an excuse for premature balance changes. No Plant/Fungus biology runtime is implemented by this decision. The competing-Transformation-recipe question was subsequently addressed as a **recipe-design exclusivity requirement in §66**, not a winner-priority mechanic.

---

## 66. Each Plant's alternative Transformation recipes must be mutually exclusive — APPROVED DESIGN REQUIREMENT

**Status (26 October 2026):** Asked what should happen when a Plant satisfies two Transformation recipes simultaneously, the user directed: **“we should not make it possible to satisfy two Transformation recipes simultaneously. if we cant guarantee that we should come back to this question.”** Therefore, do **not** invent or approve a generic random, numerical, alphabetical, first-listed, or hidden priority rule to choose a winning destination.

- **Design outgoing alternatives to be mutually exclusive:** For each Plant with multiple possible destinations, define its eventual Plant-owned exposure/event/Source/environment requirements so **no feasible garden state and event timestamp can make more than one outgoing recipe valid at once**. The recipe pass must verify all competing pairs, including cases involving multiple reaching fungi, Blockers, Waterborne paths, simultaneous environmental transitions, and independently elapsed exposure timers.
- **Different named Sources or different exposure durations alone do not guarantee exclusivity:** A player may supply both Sources and may start their separate uninterrupted timers at different moments. Favor genuinely incompatible eligibility conditions or event predicates when choosing recipes; prove incompatibility under the actual propagation and environmental rules rather than asserting it informally.
- **Keep earlier rules separate:** A Transformation still replaces the old Plant with a fresh **0%-progress** instance (§58), has **no lifecycle-percent/stage prerequisite** (§59), and wins an **exact same-timestamp tie against that Plant's death** (§60D). The one-Transformation-per-resolution-event safeguard prevents zero-time chaining; it is **not** a substitute for mutually exclusive sibling recipes.
- **If a guarantee fails, bring it back to the user:** Do not silently force an arbitrary recipe winner or change an approved transformation direction. Revisit the specific overlapping recipes, propose alternative mutually exclusive conditions, or ask whether an explicit conflict rule should exist only if true exclusivity proves infeasible. **The Ingredients family's six Potato recipes are subsequently approved and shown mutually exclusive in §67**; other families still need their own proofs.

**Scope:** This closes the *generic* competing-Transformation priority discussion provisionally in favor of design-time prevention. The next substantive text-only task is the dedicated **Plant-owned Transformation recipe pass across the six families**, including pairwise exclusivity and physical feasibility checks before Plant/Fungus biology implementation. No gameplay code changes follow from this decision.

---

## 67. Ingredients — six Potato-only Transformation recipes — APPROVED FIRST PASS

**Status (26 October 2026):** The user reviewed all six proposed environmental/Fungus-exposure recipes and said **“yep i like them. ingredients should be simpler than other families. good job”**. Thus the **identities, Condition combinations, generic fungal environmental-emission requirements, and provisional exposure hours below are APPROVED first-pass designs**. They are not implemented; hours remain ordinary playtest-adjustable numbers. This builds on the already approved **Potato→six terminal Ingredients** graph (§§41–44), stage-free recipes (§59), and compulsory mutual exclusivity (§66).

### A. Exact first-pass Potato recipes

Each listed **resolved Condition** and the required **environmental emission from at least one living Fungus actually reaching Potato** must hold together for the entire **uninterrupted** duration. Merely having the right baseline/Condition without a reaching fungal emission does not satisfy the recipe. The fungal emission means an ordinary Aqueous/Thermal/Luminous environmental Source contribution and is **not** a new Transformation Influence or a progress-gated cultivation modifier. Different fungal species emitting the same signed environmental effect can substitute. Breaking any part of a recipe resets its own continuous timer.

| Potato transforms into | Required Conditions on Potato's hex | Required reaching Fungal environmental emission | Uninterrupted exposure |
| --- | --- | --- | ---: |
| **Rice** | **Flooded** Moisture | **Wetting +1 Moisture** | **12 hours** |
| **Carrot** | **Damp, Temperate, Lit** | **Brightening +1 Illumination** | **10 hours** |
| **Onion** | **Dry, Cold** | **Drying −1 Moisture** | **14 hours** |
| **Apple** | **Damp, Cold** | **Cooling −1 Temperature** | **20 hours** |
| **Pumpkin** | **Damp, Warm** | **Warming +1 Temperature** | **24 hours** |
| **Strawberry** | **Damp, Temperate, Bright** | **Brightening +1 Illumination** | **16 hours** |

**No lifecycle gates:** These exposure timers run at **any Potato lifecycle percentage 0–200**, including Growth, Ripening and fully mature Potato, regardless of whether a fungus's distinct cultivation Effect happens to be progress-eligible at that moment. Successful Transformation consumes/replaces Potato and starts the destination Ingredient as a fresh **0%-progress Plant**, with no prior Leaves, Potato Seeds, timers or hazards (§58). All six destinations are **terminal**: neither transformed nor directly Seed-grown Rice, Carrot, Onion, Apple, Pumpkin or Strawberry has an outgoing Ingredient Transformation. Their harvests yield only their own species' Seeds under §§41–44.

### B. Physical feasibility checks using existing Fungi

From the environmental prototype's ordinary **Dry / Temperate / Dark** starting Conditions, placing the following already-approved **Mycelial-independent Fungi on adjacent unblocked hexes** supplies the necessary Airborne environmental contributions. Each example fits within the six neighbors of the Potato's occupied hex; other emitters and arrangements remain valid substitutes.

| Destination | One feasible sample arrangement | Resolved recipe Conditions |
| --- | --- | --- |
| Rice | **Dewmender + Mistruffle** (two Wetting emissions) | Dry → Damp → **Flooded**; other Conditions unrestricted |
| Carrot | **Dewmender + Lanterncap + Goldgill** | **Damp**, **Temperate**, Dark → Dim → **Lit** |
| Onion | **Droughtcap + Chillanterelle** | **Dry**, Temperate → **Cold** |
| Apple | **Dewmender + Chillanterelle** | **Damp**, **Cold** |
| Pumpkin | **Dewmender + Tickbolete** | **Damp**, **Warm** |
| Strawberry | **Dewmender + Glimmergill + Lanterncap + Goldgill** | **Damp**, **Temperate**, Dark → Dim → Lit → **Bright** |

This verifies **spatial/environmental feasibility for existing emission profiles**, without inventing new Fungi, baseline-editing privileges, Materials, Fertility, required Mycelial infrastructure, or special fungal Transformation Effects. The wider Spore-acquisition/unlock economy remains a separate future feasibility check, not a new prerequisite for these already-approved recipes.

### C. Pairwise mutual-exclusivity proof (§66)

The six recipes cannot be simultaneously eligible on a single Potato because they require incompatible **current resolved environmental Conditions**:

1. **Rice** requires **Flooded** and **Onion** requires **Dry**; the other four require **Damp**. Only one Moisture Condition can hold.
2. Among Damp recipes, **Apple requires Cold**, **Pumpkin Warm**, and **Carrot/Strawberry Temperate**. Only one Temperature Condition can hold.
3. **Carrot requires Lit** whereas **Strawberry requires Bright**. Only one Illumination Condition can hold.

The additional reaching fungal Sources cannot defeat this partition: even if all qualifying fungal emissions are present, the resolved Property combination is singular. Timers reset when their distinct environmental requirements stop holding. There are **no transition-event recipes in Ingredients** that could qualify from a preserved old-state snapshot while another ordinary recipe qualifies in the new state. Thus **no priority winner rule is needed for these six routes**. Revisit §66 only if future changes alter these requirements and break this proof.

### D. Intent and scope

**Ingredients should remain simpler than the other five Plant families**, per the user's explicit preference: readable habitat engineering, one ordinary reaching environmental fungal emission, and an uninterrupted exposure timer. More elaborate source combinations, Flooded→Damp transitions, multi-step chains and hazardous transformations are better reserved for the families designed around those mechanics. The numerical durations and resulting crop economy can be playtested later without changing each recipe's identity or environmental logic.

**Status:** APPROVED first-pass **text only**. No Plant/Fungus/Mycelial runtime, Transformation timers or other game code has been implemented. Future Plant-owned recipe work proceeds to the remaining families, retaining physical feasibility and mutual exclusivity as first-class review checks.

---

## 68. Transformation ingredients: environment plus named fungal contact — APPROVED, with Ingredients exception

**Status (26 October 2026):** The user clarified that **ordinary Plant-development/Growth Effects must not themselves count toward Transformation requirements**. Recipes outside Ingredients should instead use **environmental conditions/events and contact with explicitly named Fungi**, where contact means the Plant is within **any actual Influence zone emitted by that named Fungus**. In follow-up the user clarified that **Ingredients deliberately remain simpler**, retaining their §67 generic environmental-emission requirements. The user explicitly chose **“any influence zone counts”**, not just the environmental one.

### A. Allowed Transformation recipe inputs

- **Environment:** Currently resolved **Moisture, Temperature and Illumination** Conditions, applicable **Mycelial overlay** state, their ordinary transitions (such as Flooded→Damp), and the **X uninterrupted hours** of those environmental prerequisites. The previous pre-transition exposure snapshot and full new-Plant 0% reset remain valid (§§58–59, 64).
- **Named fungal contact (five other families):** A Plant has contact with an explicitly identified Fungus species if at least one **living instance** of that named species has **any one of its ordinary emitted Influence footprints actually reaching the Plant's hex**. Either its environmental emission zone **or** its cultivation/development emission zone qualifies. Matching Source/Edge/Hex Blockers and its actual Airborne, routed or Waterborne propagation are honored separately per emission. A recipe may explicitly name multiple acceptable species as alternatives, preserving choice where desired.
- **Stage-independent contact geometry:** A fungus's cultivation emission can establish **contact** through its propagated spatial footprint even when the Plant is outside that cultivation Effect's applicable Growth/Ripening percentage window. The Influence's *bonus magnitude or current developmental applicability* is irrelevant to contact: otherwise recipes would silently acquire forbidden lifecycle-stage gates. Alive Fungi emit their approved Influences from germination until death/harvest, including agreed habitat-loss grace periods (§60C).
- **No extra radius or adjacency shortcut:** Being physically adjacent to a named Fungus does **not** by itself qualify unless the Plant is actually within one of that Fungus's unblocked emitted Influence zones. There is no separate fictional generic Transformation Influence, and the Plant never has to achieve a particular Growth Rate, Ripening Rate, Leaf/Seed Yield, Window, Timing or hourly-production bonus value to transform.

### B. Explicit Ingredients exception — §67 is unchanged

The six **approved Potato→Ingredients** recipes remain exactly as defined in §67: **resolved environmental Condition signature + an actual reaching environmental emission of a given signed Kind/Property from any living Fungus** for X uninterrupted hours. They do **not** require an individually named fungus species. Thus Potato→Rice still accepts **any reaching fungal Wetting +1** paired with Flooded, and Potato→Apple still accepts **any reaching fungal Cooling −1** paired with Damp/Cold. Their durations, numerical Conditions, demonstration source setups and pairwise-exclusivity proof remain approved and unchanged. This exception is intentional because the user wants **Ingredients easier than other families**.

### C. Remaining implementation/design boundary

- Recipes for **Woodlands, Aquatic, Flowers, Desert and Spices** should use the allowed environmental and **named fungal contact** ingredients, without checking fungal Growth/Yield/Ripening or other developmental bonuses as transformation prerequisites. Exact named fungi, alternative-name sets, durations, transitions and pairwise exclusivity are still to be designed in those families' dedicated passes.
- **Later supersession (§70): Mycelial ground is NOT a Transformation prerequisite.** Do not use Mycelial overlay presence as a necessary condition in future Plant Transformation recipes. **Mycelord edge case:** Mycelord creates a timed Mycelial overlay but no ordinary environmental/cultivation Influence zones. Recipes can check whether a Plant's hex is currently **Mycelial** as an environmental overlay condition. If a later proposed recipe specifically requires **named Mycelord contact**, return to the user to determine whether overlay connection alone should qualify; do **not** invent an ordinary Mycelord Influence or silently turn all Mycelial into named contact.
- The rule does **not** change fungal emission strengths/footprints, add a generic Transformation Influence, alter the 31-species roster, relax §66's mutually exclusive outgoing recipes, or implement biology. Maintain the distinction between **contact by zone** and **the actual production bonus applied to a Plant**.

## §69 — Aquatic family: APPROVED first-pass Transformation recipes (26 October 2026)

**Status: USER APPROVED in full, including the environmental-only Kelpergeist → Kelpless failure route.** This is a text-only recipe definition; no Plant/Fungus/Mycelial runtime is implemented. The approved 14 routes below supersede any earlier speculative Aquatic recipe wording. All successful transformations replace the old Plant with a fresh destination at **0% Growth** and no inherited output, exposures, or timers. The Plant's Growth/Ripening percentage and cultivation bonus magnitudes are NEVER prerequisites.

For rows with named contact, the named living fungus must reach the Plant through **either actual environmental OR cultivation Influence zone**, respecting real reach, Flooded connectivity, and Blockers (per §68). The correct resolved environmental conditions and contact must be maintained for the uninterrupted listed hours; interruptions reset the relevant timer. The listed hours are provisional playtest values. The **Kelpergeist → Kelpless exception requires no Fungus contact**: merely losing Flooded continuously is sufficient, including under Dry or Damp.

| From | To | Environmental requirements / triggering transition | Named fungal contact (either is acceptable) | Exposure |
| --- | --- | --- | --- | --- |
| Aquatic Base | Kelpfull | Flooded, Temperate | Dewmender OR Mistruffle | 12h |
| Aquatic Base | Sunken Lotus | Flooded, Cold | Tidegill OR Rilllace | 16h |
| Aquatic Base | Wild Watercress | Damp, Temperate | Dewmender OR Mistruffle | 10h |
| Kelpfull | Kelpergeist | Flooded, Dark | Veilcap OR Fogdial | 20h |
| Kelpfull | Kelpless | Dry OR Damp | Droughtcap OR Crumblecap | 16h |
| Kelpergeist | Starlotus | Flooded, Cold, Dim | Tidegill OR Siltgill | 28h |
| Kelpergeist | Kelpless | NOT Flooded (Dry OR Damp) | **None; environmental-only** | 18h |
| Kelpless | Wild Watercress | Damp, Temperate | Dewmender OR Mistruffle | 12h |
| Sunken Lotus | Moonlit Lotus | Flooded, Dim | Tidegill OR Rilllace | 16h |
| Moonlit Lotus | Starlotus | **Flooded, Cold, Dim for 24h, THEN Flooded → Damp drainage** | Tidegill OR Rilllace during the 24h pre-drain phase | 24h + drain event |
| Moonlit Lotus | Pearlily | Remain Flooded, Temperate, Lit | Dewmender OR Mistruffle | 24h |
| Wild Watercress | Silvercress | Flooded, Temperate | Dewmender OR Mistruffle | 10h |
| Wild Watercress | Cresscent | Damp, Dim | Tidegill OR Glimmergill | 12h |
| Cresscent | Pearlily | Damp, Lit | Dewmender OR Mistruffle | 12h |

**Drainage trigger:** Check Moonlit Lotus's complete **immediately prior** qualifying Flooded history and named contact when the environment transitions to Damp. A Waterborne path or contact lost *because of* drainage must not invalidate already-qualified pre-drain history. No Growth/Ripening-stage gate. Moonlit Lotus → Pearlily instead triggers after continuous qualifying Flooded exposure, without drainage. Starlotus attunement is initialized fresh according to its own trait; do not inherit Moonlit Lotus's state.

**Exclusivity audit (§66):** Aquatic Base's sibling routes have mutually incompatible current Moisture/Temperature combinations; Kelpfull and Kelpergeist each split on Flooded versus NOT Flooded; Wild Watercress splits Flooded versus Damp. Moonlit Lotus's Starlotus requires a Cold/Dim Flooded exposure followed by drainage, while Pearlily requires Temperate/Lit and continued Flooded exposure. These two distinct prior-state requirements prevent a same-time collision, including a drain event at an exposure threshold. Neither different fungus names nor durations alone are used as the exclusivity guarantee. The remaining plants have only one outgoing route. Specific named alternatives are not exclusive of one another *within the same route*, which is permitted.

**Feasibility:** Wetting, Drying, Cooling, Darkening, Brightening and Waterborne reach already exist among the approved 31 Fungi; no new Effects, Fungi, lifecycle gates, or special contact mechanic are required. Flooded Source/contact routing follows the existing environmental system. Some conditions require multiple Sources, offsets or Blockers, deliberately making Aquatic more complex than Ingredients. Kelpergeist's 18h water-loss transformation is intended to occur before its proposed 36h Dry lethal limit (if no other hazard kills it earlier); maintain this ordering if those values change.

**Unchanged:** Silvercress's Flooded-during-Growth +60% Growth Rate and Damp-during-Ripening +50% Leaf Yield are separate farming traits, not recipe prerequisites. Starlotus may be obtained from two different precursors, with fresh per-origin attunement. Exact numerical balance remains open; biology code remains untouched.

## §70 — Mandrakadabra transformation environment and lethal Bright vulnerability (APPROVED, 26 October 2026)

**Later approvals (§§71–72):** The full Woodlands recipe pass is now approved, including Mandrabra → Mandrakadabra's retained **Rushroom OR Siltgill** named contact for **12 hours** under **Damp, Bright**. **Mycelial on Mandrabra's hex is not a prerequisite.** Old language below describing this recipe or entire Woodlands family as pending is historical and superseded by §72.

**Explicit user approval; supersedes earlier conflicting text in §§22–24 and the unapproved Woodlands recipe draft.** The user rejected making **Mycelial ground a prerequisite for Transformation recipes**; future Plant-owned recipes should not require that overlay. In particular, Mandrabra → Mandrakadabra must not require Mycelial. Instead, **resolved Bright Illumination is a mandatory condition for this direct Transformation**. The complete direct recipe (which particular named Fungus/Fungi must contact Mandrabra, whether other environmental properties must match, and the X uninterrupted hours) is **still to be proposed/reviewed**. The earlier draft of 12 hours of Mycelial presence followed by Mycelial retreat is **NOT approved** and must not be implemented. Do not replace it with an invented new fungus-specific mechanic: any later named-fungus contact uses §68's actual Influence-zone reach.

**New innate Mandrakadabra vulnerability:** When Mandrakadabra occupies a hex whose **resolved Illumination is Bright**, it dies after **4 uninterrupted in-game hours of Bright**. The continuous lethal timer starts when the Mandrakadabra instance is created in Bright (through Transformation at 0% or from a planted Seed) or when an existing Mandrakadabra enters Bright. Moving the resolved Illumination away from Bright **before the four-hour threshold** clears the exposure timer. Returning to Bright begins a new full four-hour exposure; there is no historical cumulative damage bank. The timer does not inherit Mandrabra's prior Bright exposure on Transformation, consistent with §58. Normal event-order and death/Transformation tie rules still apply (§§60,64).

**Preserved farming identity:** **Lit, NOT Bright, remains Mandrakadabra's preferred Illumination**, together with the previously approved Damp/Temperate preference and its exceptionally high, narrow Leaf peak. Thus the intended puzzle is to transform Mandrabra under Bright and then reduce Illumination to Lit quickly enough to farm Mandrakadabra for its full multi-day lifecycle. This vulnerability is tied to the **resolved environmental state**, not receiving a particular fungal cultivation bonus or being at a lifecycle stage. The short Bright hazard applies to Mandrakadabra grown directly from **Mandrakadabra Seeds** as well as one obtained by Transformation.

**What changed and what did not:** This **replaces** the earlier **Mandrakadabra-specific Mycelial death after 6 hours**; the old special six-hour Mycelial condition is **not an additional simultaneous special hazard**. Ordinary Woodlands Mycelial aversion/hazard can still be defined on its usual terms without bringing back a special six-hour threshold. No Mycelial overlay is required for the Mandrabra → Mandrakadabra recipe. Mandrakazam remains the Seed-producing safer alternative, and Mandrabra still has two confirmed outgoing graph edges; they must be designed to be **mutually exclusive** under §66. No other Woodlands recipes from the earlier 13-route **unapproved proposal** become approved by this decision; only the mandatory Bright condition, four-hour Bright hazard, and retained Lit farming optimum are newly locked here. All other Plant profiles, Seed identities, and numeric balance remain unchanged. **Text-only; no Plant/Fungus gameplay implementation.**

## §71 — Woodlands Transformation recipes: user approval with Bright revision (26 October 2026)

**Status: ALL 13 routes APPROVED first-pass (§§70–72).** The user accepted the other 12 recipes, and clarified that they **do want Rushroom OR Siltgill** as the contacts for Mandrabra → Mandrakadabra. Their Mycelial dependence is a **source-side infrastructure cost, not a requirement for Mandrabra's own hex to be Mycelial**. For this route, Mandrabra requires **Damp, Bright, and contact with Rushroom OR Siltgill for 12 uninterrupted hours**; its Transformation occurs when that exposure completes, not when Mycelial retreats. §70 separately approves Mandrakadabra's **4 uninterrupted hours Bright → death** and **Lit** farming optimum. The earlier Mycelial-on-Mandrabra and mandatory Mycelial-retreat trigger are rejected.

In the table, a named Fungus requirement is fulfilled if **either** existing environmental or cultivation Influence footprint from a living named instance actually reaches the Plant (§68). Plant-development effect magnitude or the Plant's Growth/Ripening stage never enters a Transformation recipe. All listed exposure times are bold **first-pass values** subject to playtest. Except for the expressly transition-triggered Mistlefoe pivot, listed environmental states and named contacts must remain continuously valid for the given time. Any interruption resets that recipe's timer. Every successful Transformation replaces the Plant with a **new 0%-Growth instance with cleared state** (§58).

| Source Plant | Target Plant | Required resolved environment / sequence | Named fungal contact | First-pass duration | Status |
| --- | --- | --- | --- | ---: | --- |
| Woodlands Base (unnamed) | Bamboom | Damp, Warm, Lit | Tickbolete OR Emberbell | 14h | **APPROVED** |
| Woodlands Base (unnamed) | Mandrabra | Damp, Temperate, Lit | Goldgill OR Lanterncap | 20h | **APPROVED** |
| Woodlands Base (unnamed) | Tanglethorn | Damp, Temperate, Dim | Fogdial OR Veilcap | 12h | **APPROVED** |
| Bamboom | Bamboozeling | Damp, Warm | Tickbolete OR Emberbell | 24h | **APPROVED** |
| Bamboozeling | Bamboozled | Damp, Warm | Tickbolete OR Emberbell | 16h | **APPROVED** |
| Tanglethorn | Mistlefoe | Damp, Temperate, Dim | Hushroom OR Fogdial | 16h | **APPROVED** |
| Tanglethorn | Bramblewraith | Damp, Temperate, Lit | Lanterncap OR Goldgill | 28h | **APPROVED** |
| Mistlefoe | Mandrabra | Damp, Dim; preparatory simultaneous Mistruffle + (Fogdial OR Veilcap) contact, then **remove Mistruffle after ≥12h but strictly before 20h**, retaining remaining conditions/contact | Mistruffle during preparation; Fogdial OR Veilcap retained at trigger | 12h to <20h, then loss-of-contact event | **APPROVED** |
| Mistlefoe | Mistlewoe | Damp, Dim; retain both fungal contacts continuously | Mistruffle AND (Fogdial OR Veilcap) | 20h | **APPROVED** |
| Mistlewoe | Tanglethorn | Damp, Temperate, Lit | Dewmender OR Mistruffle | 12h | **APPROVED** |
| Mandrabra | Mandrakadabra | **Damp, Bright**; **no Mycelial-on-target requirement** | **Rushroom OR Siltgill** via either actual Influence zone | **12h** | **APPROVED (§§70,72)** |
| Mandrabra | Mandrakazam | Damp, Temperate, Dim, no Mycelial | Hushroom OR Gloamclock | 24h | **APPROVED** |
| Mandrakadabra | Mandrakazam | Damp, Temperate, Dim, no Mycelial | Hushroom OR Gloamclock | 24h | **APPROVED** |

**Mistlefoe fork — exact event semantics:** Mistruffle's ordinary Leaf Yield contribution is an incentive to keep it around, **not a transformation prerequisite expressed as a bonus or a required output amount**. The condition is the **identity and reach of Mistruffle**, alongside the required other named contact and environment. Keeping both for a full 20h creates **Mistlewoe**. Breaking Mistruffle contact only after at least 12h but **strictly before 20h**, while satisfying the rest, creates **Mandrabra** at that loss-of-contact event. A simultaneous contact-loss input on the **exact 20h deadline cannot select Mandrabra** because its approved open interval excludes t=20h; this prevents an arbitrary priority rule. If the named contacts are disrupted earlier, qualifying preparation is interrupted and resets. Adjusting garden influences, replacing fungi, and selective Blockers remain legitimate ways to break reach; do not require the Fungus instance itself to be destroyed.

**Bamboo chain:** The same contact/environment can drive Bamboom → Bamboozeling → Bamboozled, each with a new transformation clock after the old instance is replaced. A player can remove the qualifying named contact while retaining a productive farming habitat. Bamboozeling's weak salvage Leaves/Base Seeds and Bamboozled's zero ordinary output/Bamboo Steel trophy remain unchanged.

**Mandrake fork exclusivity:** Mandrabra → Mandrakadabra's **Bright** condition and Mandrabra → Mandrakazam's **Dim** condition are mutually incompatible, even if named fungal contacts for both routes overlap. A Bright-triggered Mandrakadabra is immediately endangered by its **new** 4-hour Bright lethal clock; rapidly altering the resolved light to **Lit** makes sustained high-Leaf farming possible (§70). Mandrakazam remains the safer supplier of Mandrakadabra Seeds, allowing safe direct planting. The prior **6-hour special Mycelial vulnerability** and required Mycelial withdrawal are superseded, not additive.

**General exclusivity audit (§66):** The Woodlands Base outgoing routes split on Warm vs Temperate and Lit vs Dim; Tanglethorn splits Dim vs Lit; Mistlefoe's two outcomes split by a deliberately **strict pre-20h contact-removal window** vs continued contact to 20h; Mandrabra splits Bright vs Dim. The remaining Plants have only one outgoing recipe. The designs avoid overlapping sibling triggers without inventing a winner priority. Detailed spatial setup feasibility should be checked in later playtesting, particularly when a named fungus's own environmental emission must be compensated by another Source to maintain a specified resolved state. No new fungus types or emitted Transformation Effects are introduced.

**FULL FAMILY APPROVAL (§72):** The user corrected the mistaken inference that selecting Rushroom or Siltgill would automatically make Mycelial ground on Mandrabra's hex a recipe requirement. It does not. Both species need Mycelial at their **own source**, but their existing Influences can reach a Plant outside Mycelial via allowed propagation; the player may need to route/block Mycelial, or start retreat in time to save Mandrabra while retaining contact long enough to complete 12h. **No Mycelial state or retreat event on Mandrabra itself is a Transformation condition.** This is precisely the optional infrastructure/hazard puzzle intended. Reject Glimmergill/Goldgill as an unrequested replacement. No other recipes changed. **Text only; no biology code changed.**

## §72 — Clarification: Mycelial-dependent fungi are allowed as named contacts (APPROVED, 26 October 2026)

The user expressly corrected a mistaken inference in §71: **using a Mycelial-dependent Fungus as the named contact for a Plant Transformation does NOT require the target Plant's hex to be Mycelial**. Source habitat and recipient reach are separate. Rushroom or Siltgill may operate on Mycelial at their own hex and send one of their normal emitted Influences to a Mandrabra on a non-Mycelial hex. Under §68, environmental reach **or** cultivation reach counts as contact (after propagation and Blockers); the Plant does not need to receive a positive cultivation bonus. The source's Mycelial footprint and normal expansion/retreat may create a genuine **optional risk-management puzzle**: route/Block Mycelial, manage retreat, or act before Mandrabra's ordinary Mycelial lethal tolerance expires while keeping the named Source's emitted Influence reaching Mandrabra. Do **not** require Mandrabra itself to be Mycelial, or Mycelial retreat to trigger its Transformation.

**Finalized first-pass Mandrabra → Mandrakadabra recipe:** Maintain **resolved Damp Moisture, Bright Illumination, and named contact with Rushroom OR Siltgill continuously for 12 hours**. No Temperature state needs to be added as a separate recipe condition. Transformation occurs when the 12-hour conditions complete and creates fresh 0%-Growth Mandrakadabra, with **four hours of continuous Bright exposure lethal** and **Lit still its farming optimum** (§70). This is **mutually exclusive** with Mandrabra → Mandrakazam's Dim requirement. Once transformed, the player should alter Bright → Lit promptly to keep the high-Leaf Plant alive; Mycelial interference might need separate management but is not directly prescribed by the recipe. A Fungus can still need Mycelial **at its source**; the rule only disallows mandating Mycelial **on the Plant's own hex** for a Transformation. The proposed Glimmergill/Goldgill substitution from §71 is **withdrawn**, not approved.

**Status:** All **13 Woodlands Transformation recipes are approved first-pass**, completing Woodlands after Ingredients and Aquatic. Exposure hours and normal Mycelial survival thresholds remain playtestable; no biology/runtime code has been changed.

## §73 — Flowers: all 12 Plant-owned Transformation recipes (APPROVED first pass, 26 October 2026)

**USER APPROVAL:** The user reviewed and accepted the entire 12-route Flowers proposal, **expressly including the dusk-to-bright Daisyspell → Orchidemon recipe**. These are initial playtest durations and spatial/environmental recipes, **not** final balance or new biological code. They supersede the unassigned A/B/C/D Fungus placeholders in §13. The established graph, all ten first-pass Plant profiles, numeric bloom peaks, Seed identities, and 0–200% destructive-harvest rules in §§29–32 remain intact.

**Universal reading of recipes:** All normal recipes below require their stated **resolved** Moisture, Temperature, Illumination and contact with the specified **named living fungus or fungi** continuously for the stated number of in-game hours, absent a special transition sequence. A contact may be made through **EITHER** actual environmental or cultivation Influence reach, accounting for Mode, real propagation, Flooded networks and Blockers; effect size, applicability to a particular stage, and Plant-development bonuses are **not** qualification conditions (§68). All transitions work at any Plant lifecycle stage/percentage (§59), and replace the old Plant with a fresh **0%-Growth instance with cleared output, exposure and timers** (§58). Interrupting an ordinary continuous recipe resets its timer. **No recipe requires Mycelial overlay on the Plant**; named fungi retain their own source-habitat constraints separately.

### A. Daisydaze (Base): three exclusive opening branches

| From → To | Resolved environmental requirements | Named fungal contact | Continuous duration |
| --- | --- | --- | ---: |
| **Daisydaze → Charmomile** | Damp, Temperate, Lit | Lanterncap **OR** Goldgill | **12h** |
| **Daisydaze → Lavendream** | Damp, Temperate, Dim | Veilcap **OR** Gloamclock | **20h** |
| **Daisydaze → Poppycock** | Damp, Warm, Bright | Emberbell **OR** Tickbolete | **16h** |

These routes teach illumination/temperature selection. Charmomile offers an early bloom, Lavendream a forgiving plateau, and Poppycock a strong self-Seed economy. Their resolved environments cannot simultaneously qualify.

### B. Charmomile: early speed versus delayed bloom

| From → To | Resolved environmental requirements | Named fungal contact | Continuous duration |
| --- | --- | --- | ---: |
| **Charmomile → Daisyspell** | Damp, Warm, Bright | Prismorel **OR** Glimmergill | **12h** |
| **Charmomile → Marigloom** | Damp, Cold, Dim | Echomorel **OR** Fogdial | **24h** |

Daisyspell is a fast Plant with an **innate** 75%-progress harvest peak; Marigloom is slow with an **innate** 170%-progress harvest peak. Neither lifecycle percentage is a recipe condition. Their Warm/Bright versus Cold/Dim environments are incompatible.

### C. Lavendream: Seed route or slower Orchidemon route

| From → To | Resolved environmental requirements | Named fungal contact | Continuous duration |
| --- | --- | --- | ---: |
| **Lavendream → Lavendread** | Damp, Cold, Dark | Chillanterelle **OR** Brookrill | **22h** |
| **Lavendream → Orchidemon** | Damp, Warm, Bright | **Glimmergill AND Mistruffle** | **32h** |

The conjunction really requires both named fungus species to reach Lavendream through their existing emitted footprints; it does not require their Leaf Yield/Timing benefits to apply or be any particular magnitude. The two outcomes cannot overlap because their Cold/Dark and Warm/Bright resolved states are incompatible.

### D. Daisyspell → Orchidemon: the approved dusk-to-bright sequence

This is a **transition/time-window** recipe, distinct from the static exposure rows:

1. **Preparation:** Daisyspell remains **Damp, Temperate, Dim** and is contacted by **Veilcap OR Fogdial** for **10 uninterrupted hours**. A break before reaching 10h resets preparation.
2. **Lighting change:** After preparation, leave **Dim** and change resolved illumination toward **Bright**. **Passing through Lit is allowed.** Preserve **Damp and Temperate** during this completion phase. The clock for the completion window starts **on leaving Dim**, not on entering Bright.
3. **Completion:** Reach **Bright within 8 hours of leaving Dim**, with **Prismorel OR Glimmergill contact actually reaching Daisyspell at completion**. Successful completion triggers **Daisyspell → Orchidemon immediately**, with a new 0%-Growth Orchidemon. The qualifying preparatory Dim fungus need not continue reaching Daisyspell after the phase change unless an otherwise applicable condition requires it.
4. **Failure:** Failing to complete the final requirements within the eight-hour window (or losing mandatory Damp/Temperate during the transition) invalidates this attempt, requiring a fresh 10-hour qualifying preparation period; no state from a failed attempt is banked.

This recipe uses ONLY environmental conditions/transitions, named-fungus reach, and elapsed time. **Daisyspell need NOT be in Growth, be 75%, or reach a bloom** to transform. It is the faster but more technical Orchidemon route; Lavendream's route is slower and steadier. Newly transformed Orchidemon can pursue its existing **Bright-preferred, sterile, high-Leaf single peak near 145%** through its full fresh lifecycle.

### E. Lavendread, Poppycock, Marigloom and Dream Poppy

| From → To | Resolved environmental requirements | Named fungal contact | Continuous duration |
| --- | --- | --- | ---: |
| **Lavendread → Dream Poppy** | Damp, Cold, Dim | Echomorel **OR** Brookrill | **20h** |
| **Poppycock → Dream Poppy** | Damp, Temperate, Dim | Veilcap **OR** Gloamclock | **18h** |
| **Marigloom → Rosewraith** | Damp, Cold, Dim | **Echomorel AND Fogdial** | **18h** |
| **Dream Poppy → Rosewraith** | Damp, Temperate, Dim | **Duskleaf AND Mistruffle** | **24h** |

Dream Poppy and Rosewraith each have their established **two incoming origins**; the destination Plant is the same species regardless of origin, not two attuned variants. Rosewraith retains **two intrinsic Leaf peaks (~115% and 180%) with a low-output valley**, never a fungal second-bloom mechanic; one Plant still yields one destructive harvest.

### F. Exclusivity, feasibility and implementation guardrails

- **§66 sibling exclusivity:** Daisydaze splits **Temperate/Lit vs Temperate/Dim vs Warm/Bright**; Charmomile splits **Warm/Bright vs Cold/Dim**; Lavendream splits **Cold/Dark vs Warm/Bright**. All other Flowers have only one outgoing Transformation. Distinct elapsed timers and different fungus identities are NOT used as proofs of exclusivity. If future changes introduce new outgoing routes, repeat the pairwise proof.
- **Physical feasibility at first pass:** Every required named fungus exists in the approved roster. Their environmental/cultivation reach and environmental emissions use existing Airborne, Waterborne, routed emission, Source and Blocker rules. Building net Damp/Temperate/Dim/Bright/Dark may require additional fungi and selective Blockers where an emitter's own environmental modifier would otherwise upset the target state. The Daisyspell transition specifically requires controllable lighting and is earmarked for spatial/playtest verification, not a special new Influence.
- **Cultivation separation:** A fungus may incidentally change Growth Rate, Yield, harvest window, Seed availability, or hourly production while in reach, but no such effect strength or currently applicable bonus is a Transformation requirement; innate Flower bloom percentages also never gate Transformations.
- **Balance/implementation:** All 12 durations and the eight-hour final window are approved **first-pass values**, subject to actual playtesting and tuning. Do not modify Plant/Fungus runtime before completing the remaining family recipes and audit. No gameplay code was changed by this approval.

**Recipe-pass status after §73: Ingredients (6), Aquatic (14), Woodlands (13), Flowers (12) complete at first pass; Desert and Spices remain.**

## §74 — Desert: all 13 Plant-owned Transformation recipes (APPROVED first pass, 26 October 2026)

**Approval:** The user reviewed the complete 13-route Desert proposal and explicitly said **“i like them.”** This approves its named Fungi and alternatives, resolved environmental conditions, first-pass durations, two recovery event mechanisms, and sibling-route exclusivity as described below. §§14 and 33–36 preserve the previously approved graph, intrinsic Plant responses, 36-hour Ember Aloe endurance, 48-hour Moonjade Freezing endurance, dormancy and hazard tables, and Seed identities. Old “Ember/Rime/Awakener/Shelter/Mirage” working Fungus categories and Sand-specific gates are superseded. **No new Fungi, Effects, Mycelial Transformation requirements, or gameplay implementation** are introduced.

### Recipe interpretation

- Plant-owned Transformations may depend on **current resolved environmental Conditions**, **named living Fungus contact through EITHER actual environmental OR cultivation Influence reach (§68)**, elapsed exposure, and/or an explicitly completed environmental **transition event**. Respect propagation, signed Source stacking, Blockers and species habitat viability.
- **Never gate a Transformation on a Plant's Growth/Ripening stage or percentage, a cultivation effect being active for a particular progress stage, or the magnitude of fungal Growth/Yield/etc.** Ordinary non-transition recipe conditions must hold for the uninterrupted duration; interruption resets the timer. Transformations replace the Plant with the destination **at fresh 0% Growth**, with exposure/output/hazard clocks cleared (§58).
- If a recipe checks endurance *immediately before* a transition, finish elapsed exposure using the old resolved state before the environment changes (§§59,64). Species-hazard clocks are separate. Named contact at a transition is evaluated on the resulting configuration, unless a recipe explicitly says otherwise.
- All times below are **approved initial design values**, subject to later testing/balancing. There is one Transformation per event timestamp and no runtime sibling priority or generic fungus-emitted Transformation Effect.

### A. Jadeheart (Base): three starting routes

| Transformation | Continuous resolved Conditions | Named Fungus contact (either) | Exposure |
| --- | --- | --- | ---: |
| **Jadeheart → Ember Aloe** | **Damp, Hot, Lit** | **Emberbolete OR Tickbolete** | **18 h** |
| **Jadeheart → Moonjade** | **Damp, Freezing, Dim** | **Chillanterelle OR Rilllace** | **20 h** |
| **Jadeheart → Cactopus** | **Dry, Warm, Lit** | **Droughtcap OR Crumblecap** | **16 h** |

The base species' 72h continuous Hot and 48h continuous Freezing lethal thresholds (§36) exceed the applicable 18h/20h Transformation exposures. These sibling routes are pairwise exclusive by the resolved Temperature and Moisture states. Multiple existing fungus emissions can establish stronger temperature shifts (e.g. Temperate → Freezing).

### B. Ember Aloe: deliberate Hot → Warm recovery, good versus premature

These are **event-triggered alternative outcomes**, not automatic reactions to ceasing Hot:

1. An Ember Aloe begins counting **uninterrupted Hot hours** when the Ember Aloe instance is created or subsequently becomes Hot. While Hot, it continues its approved productive growth; Hot exposure is **not** a lethal countdown for Ember Aloe.
2. **Recovery attempt:** An actual **Hot → Warm resolved Temperature transition** while **Chillanterelle OR Rilllace contact reaches the Ember Aloe at the event** is the qualifying deliberate recovery trigger. Check the **just-completed pre-transition continuous Hot hours** BEFORE resetting exposure. The contact may be through either of the named source's ordinary environmental or cultivation Influence zones; no cultivation Yield/Window magnitude gate.
3. If that continuous Hot exposure was **less than 36 hours**, the attempted recovery creates **Ashen Rose** (the undesirable premature outcome).
4. If it was **at least 36 hours (including exactly 36h)**, that same qualifying attempt creates **Aloemancer** (the desirable recovery).
5. A Hot → Warm transition **without either recovery Fungus reaching** does **not** transform Ember Aloe. Neither does a mere change to a different non-Hot Temperature or loss of Hot without this precise qualifying event. In those cases Ember Aloe remains Ember Aloe and its uninterrupted Hot exposure resets upon leaving Hot. The two recovery outcomes require no separate post-thaw exposure delay.

| Transformation | Pre-transition qualification | Event and named contact | Result |
| --- | --- | --- | --- |
| **Ember Aloe → Ashen Rose** | **<36 uninterrupted hours Hot** | **Hot → Warm**, Chillanterelle OR Rilllace reaches | Immediate premature recovery |
| **Ember Aloe → Aloemancer** | **≥36 uninterrupted hours Hot** | **Hot → Warm**, Chillanterelle OR Rilllace reaches | Immediate successful recovery |

**Design-time exclusivity:** the same completed Hot-exposure history cannot be both below and at least 36h. Check the exposure snapshot at the transition and then replace the Plant; do not invent a winner rule. The previously approved **+30% Hot Growth** and **+50% Hot Leaf production** remain **farming traits only**, NEVER transformation prerequisites.

### C. Ashen Rose → Sandrose → Cactopus: redemption

| Transformation | Continuous resolved Conditions | Named Fungus contact (either) | Exposure |
| --- | --- | --- | ---: |
| **Ashen Rose → Sandrose** | **Dry, Temperate, Dim** | **Droughtcap OR Bristlecap** | **12 h** |
| **Sandrose → Cactopus** | **Dry, Hot, Lit** | **Tickbolete OR Emberbell** | **18 h** |

These are intentional recovery options for an undesirable early Hot-recovery outcome. Sandrose's previously approved indefinite Dry survival and nonlethal Hot tolerance make both transitions survivable; Cactopus is a self-Seeding robust Hot/Dry crop. No obsolete permanent Sand material is required.

### D. Moonjade: Dormant Freezing endurance followed by two exclusive thaw outcomes

1. Moonjade becomes fully **Dormant immediately on resolving Freezing**. Growth, Ripening and time-based output cease during dormancy, but **the separate Freezing exposure clock continues running**. Maintain **48 uninterrupted hours of Freezing** to qualify either subsequent recovery route. Freezing itself does not kill Moonjade; ordinary Mycelial/hazard clocks still operate.
2. At a **Freezing → Cold** environmental transition, inspect the **48h just-completed Freezing history**, the **new** resolved Moisture = **Damp**, the **new** resolved Illumination, and named fungal contact on the resulting state.
3. **Moonjade → Jadewisp:** after ≥48h of Freezing, thaw **Freezing → Cold**, with **Damp + Dim** and contact from **Dewmender OR Mistruffle**.
4. **Moonjade → Pearadox:** after ≥48h of Freezing, thaw **Freezing → Cold**, with **Damp + Lit** and simultaneous named contact from **(Tickbolete OR Emberbell) AND (Gloamclock OR Fogdial)**. One from each set must actually reach Moonjade.
5. If thaw occurs **before 48h**, into a different Temperature, or without a full route's required new environment/contact, **no Transformation occurs**. Moonjade resumes its retained lifecycle progress if non-Freezing, and the old Freezing exposure resets. On a later re-freeze, 48h must be re-earned; no historical endurance bank.

| Transformation | Prior qualification | Post-transition resolved Conditions | Named Fungus contact at thaw |
| --- | --- | --- | --- |
| **Moonjade → Jadewisp** | **≥48h uninterrupted Freezing** | **Freezing → Cold**, **Damp, Dim** | **Dewmender OR Mistruffle** |
| **Moonjade → Pearadox** | **≥48h uninterrupted Freezing** | **Freezing → Cold**, **Damp, Lit** | **(Tickbolete OR Emberbell) AND (Gloamclock OR Fogdial)** |

**Fork exclusivity:** A just-thawed Moonjade cannot have both resolved **Dim and Lit**, so the two sibling recipes are incompatible even if all named fungus contact groups reach. The named Fungi may require compensating Sources or selective Blockers to achieve the specified **final** net Condition. Both outcomes start new independent 0%-Growth Plants with no inherited Dormancy/Freezing history. Jadewisp's 26 Moonjade Seeds and Pearadox's unique Hot/Freezing growing bonuses are **subsequent farming properties**, not eligibility gates.

### E. Cactopus: broad sterile Leaf route versus dual-temperature Seed route

| Transformation | Continuous resolved Conditions | Named Fungus contact | Exposure |
| --- | --- | --- | ---: |
| **Cactopus → Cactaclysm** | **Dry, Hot, Bright** | **Emberbolete AND Goldgill** | **24 h** |
| **Cactopus → Pearadox** | **Damp, Hot, Dim** | **Veilcap OR Fogdial** | **20 h** |

Cactaclysm remains the **sterile premium Leaf endpoint** (natural peak 48 Leaves in Hot around 140%, broad ~120–165% band), whereas Pearadox remains the same **self-Seeding Hot-Leaf/Freezing-Seed dual-specialist** from either origin. Dry/Bright and Damp/Dim give hard sibling exclusivity; fungal overlap or different timers alone are not treated as proofs.

### F. Mirage Rose: two different origins, same mixed-Seed destination

| Transformation | Continuous resolved Conditions | Named Fungus contacts (both required) | Exposure |
| --- | --- | --- | ---: |
| **Aloemancer → Mirage Rose** | **Damp, Temperate, Dim** | **Emberbell AND Chillanterelle** | **24 h** |
| **Jadewisp → Mirage Rose** | **Damp, Cold, Dim** | **Glimmergill AND Gloamclock** | **24 h** |

These paths deliberately use opposing Temperature or Illumination emissions. Balanced active emission can preserve net Temperate/Dim or Cold/Dim while meeting both named contacts; extra environmental Sources/Blockers may be needed according to the starting Baseline. Both routes produce identical fresh **Mirage Rose**, with no origin attunement. Its approved full Seed harvest remains **14 Ember Aloe Seeds + 14 Moonjade Seeds**, distributed 1:1 (§§35–36,56), and one consuming harvest.

### G. Feasibility / exclusivity audit and preserved constraints

- **Graph coverage:** 13 total routes across **11 approved Desert Plants**; all pre-agreed edges preserved, including the intentional Ashen Rose redemption, Moonjade's Jadewisp/Pearadox split, Pearadox from Cactopus, and Mirage Rose from two precursors.
- **All sibling recipes mutually exclusive (§66):** Jadeheart branches split on different Temperature/Moisture; Ember Aloe recovery is **<36h versus ≥36h on the same qualified Hot → Warm event**; Moonjade's alternatives split Dim vs Lit on thaw; Cactopus splits Dry/Bright vs Damp/Dim. There is no invented arbitrary winner priority.
- **Source/condition feasibility:** All named Fungi are in the approved 31-species roster. Environmental signed Source arithmetic and actual Influence-zone reach can be used with compensating Fungi and Blockers. More involved placement checks, especially balancing warmth/darkening around Moonjade → Pearadox at thaw, are deliberately reserved for practical implementation/playtesting. This is a **first-pass feasibility assessment**, not a claim to have exhaustively enumerated every garden configuration.
- **Independent Plant responses:** Moonjade Dormancy does not stop its 48h Freezing exposure timer; Ember Aloe's Hot productivity never replaces the 36h recovery check; Pearadox remains positively growing in both Hot and Freezing; Sandrose tolerates Dry indefinitely; Cactopus/Cactaclysm thrive while Hot. Those are Plant farming/survival behaviors, not fungal Transformation Effects.
- **No changes to Seed identities, harvest curve, Material/Fertility removal, Mycelial biology or updated event order.** All Transformation outcomes start new Plants at 0%, with no old output or exposure. No Plant or Fungus gameplay code has yet been implemented.

**Recipe design progress after this acceptance: Ingredients 6/6 (§67), Aquatic 14/14 (§69), Woodlands 13/13 (§§71–72), Flowers 12/12 (§73), Desert 13/13 (§74) complete; only Spices remains.**
