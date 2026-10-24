# Companion Cultivation — Herbs, Fungi & Cultivation Design

**Status:** Active text-only design reference; not implemented in Prototype 1  
**Started:** 23 October 2026  
**Related foundation:** [Environmental System v1.1](environmental-system-v1.1.md)

This document records agreed cultivation directions, ideas under consideration, and unresolved details. It owns **Herb and Fungus gameplay** and the **proposed temporary material-overlay extension**, while the Environmental System document remains the authoritative reference for the implemented hex environment, Properties, Conditions, Sources, Influences, Range/Spread Budget Propagation, Blockers, Anchors, and existing Environmental Adjacency.

**Do not treat material overlays, herb biology, fungal responses, or time-based colonization as implemented yet.** We will undertake several design passes in text before changing game code. After game design is complete, the documentation can be consolidated into a formal reference/archive.

## Conventions

- **Agreed direction:** Explicitly accepted design concept. Details or balance may still be open.
- **Working terminology:** Useful current vocabulary, not necessarily a final UI label.
- **Illustrative:** A hypothetical organism, interaction, value, or example, **not** an approved recipe or balanced statistic.
- **Proposed:** Worth exploring but not yet agreed as a rule.
- **Open:** A decision we have intentionally not settled.
- **Reserved:** An optional mechanic to revisit only if it adds meaningful gameplay.

The existing Environmental System v1.1 rules remain unchanged in the live Prototype 1. Any implementation of these proposals must explicitly reconcile new mechanics with the environmental rules rather than silently modifying them.

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
- A Fungus grows **0–100%** before it can be harvested, and its harvested product is **Seeds only**. It does not use the Herb's 100–200% Leaf-to-Seed Ripening phase.
- A Fungus begins emitting its Influences **immediately after successful germination**, rather than only at 100%, provided its environmental/habitat needs permit emission.
- **Standard Fungus harvest is one-time:** at 100%, collect its Seeds and remove the Fungus Instance from its hex.
- No number of Fungi or formal Fungus Family structure has been agreed. One useful design approach is to distinguish their **roles** first, without forcing fungus families.

### Potential roles — design vocabulary, not an exclusive taxonomy

- **Environmental Source:** Changes Moisture, Temperature, Fertility, or Illumination using the existing system.
- **Habitat Engineer:** Creates a temporary material overlay such as Mycelial or Enchanted.
- **Cultivation Source:** Emits Influences that elicit Herb Responses such as Growth, Yield, Transformation, or death.

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
- The same Influence can trigger **different, neutral, beneficial, or harmful Responses** based on the receiving Herb/Family.
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

### Transformation continuity — agreed design direction

A Transformation changes the **living Herb's identity** but **normally preserves its current Growth/Ripening percentage**. For instance, an eligible Herb at 75% Growth becomes the transformed Herb at 75%, not 0%. The new identity's habitat needs, Responses, and production rules then apply. **Open:** how to handle existing exposure timers, already available products, and rare transformations that explicitly change progress.

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

- **Mandrabra → Mandrakadabra → Mandrakazam**, with additional possible routes indicated in the sketch. Mandrakadabra has the best potential non-Seed harvest output in Woodlands but is difficult to transform into safely: exposure long enough for Transformation can become fatal if left too long. A **Mandrakazam Seed route** is a longer but safer way to cultivate Mandrakadabra away from the dangerous Influence.
- **Bamboom → Bamboozeling → Bamboozled** under continued exposure to a transforming fungus. **Bamboom** is an excellent Base-Plant Seed producer; **Bamboozeling** is inferior; **Bamboozled** produces no ordinary harvest or Seeds but yields an odd **Bamboo Steel** trophy when harvested (for flavor/achievement, not a normal productivity reward). The mention of "Bamboozle" as a best Plant alongside "Bamboom" in the sketch needs a **name confirmation**; do not silently treat them as two different Plants.
- **Tanglethorn → Mistlefoe / Bramblewraith** is a safer, lower-maintenance direction. **Bramblewraith** is highly desirable for resilience and a large harvest window, not necessarily maximum yield.
- **Mistlefoe → Mandrabra** is a pivot into the more demanding Mandrake path, requiring a **new transforming fungus and removal of a fungus beneficial to Mistlefoe**. Keeping the beneficial and transforming fungi both active instead causes **Mistlefoe → Mistlewoe**, an unwanted result. The sketch also visually suggests a Mistlewoe-to-Tanglethorn link; its exact recipe should be confirmed before fixing it as a rule.

**Status:** Strong candidate family network from the user's original sketch, not finalized organism statistics or exact fungal Influence definitions.

## 12. Aquatic — first family-interactions design pass

### Points explicitly favored or accepted

- **Flooded → drain → alternative transformation** is a **strong core Aquatic mechanic**. A Plant may need Flooded habitat or a Waterborne Influence to reach an intermediate form; draining during Ripening can select a different Transformation from remaining Flooded. The precise Plant identities and fungal requirements below are still first-pass proposals.
- **Kelpless redemption** is desirable: an undesirable transformation should be recoverable through a route to a worthwhile other Plant, instead of being a permanent dead end.
- Add **Cresscent → Pearlily** as an alternate, **shorter route to Pearlily**. Cresscent is useful as a self-reproducing Plant with **good Seed germination**, while a Cresscent Plant can alternatively be **transformed into Pearlily**. This makes a manageable two-Plant production chain, rather than requiring the entire Lotus progression.
- **Neither Cresscent nor Pearlily needs to be an Aquatic "best" Plant.** This shortcut should give a practical, accessible result **without trivializing the harder-to-obtain specialists**.
- Standard harvesting is plant-consuming: a single Cresscent Instance can be **harvested for Cresscent Seeds OR transformed into Pearlily**; it cannot do both as the same Instance in one crop cycle. Multiple planted Instances allow the player to maintain a Seed supply and transform others.

### Provisional full graph from the assistant's first sketch (not all edges adopted)

~~~text
Unnamed Base Aquatic Plant
  ├─> Kelpfull
  │     ├─> Kelpergeist            (proposed specialist)
  │     └─> Kelpless               (undesirable)
  │           └─> Wild Watercress  (redemption route, favored)
  ├─> Sunken Lotus
  │     └─> Moonlit Lotus
  │           ├─> Starlotus        (drain during Ripening; favored concept)
  │           └─> Pearlily         (remain Flooded; favored concept)
  └─> Wild Watercress
        ├─> Silvercress
        └─> Cresscent
              └─> Pearlily         (new short alternative route, favored)
~~~

**Other provisional cross-route:** Kelpergeist → Starlotus via a different, specialized fungal transformation. All routes need final fungal and environmental rules.

### First-pass possible Plant roles (all tentative except the directional preferences above)

| Plant | Possible cultivation purpose |
| --- | --- |
| Unnamed Base Aquatic Plant | Starting access to all Aquatic branches |
| Kelpfull | Produces many Base Plant Seeds while Flooded |
| Kelpergeist | Reliable harvest in Dark/Flooded conditions |
| Kelpless | Unwanted transformation after habitat disruption; redeemable into Watercress |
| Sunken Lotus | Waterborne-connected starting point for Lotus transformations |
| Moonlit Lotus | Intermediate whose next Transformation depends on water level during Ripening |
| Starlotus | Harder, highly desirable form obtained after drainage or an alternative specialist route |
| Pearlily | Accessible, useful but not top-tier outcome, reachable from Moonlit Lotus or Cresscent |
| Wild Watercress | Accessible Damp-oriented branch entry, including the Kelpless rescue |
| Silvercress | Potentially excellent ordinary harvest output in a controlled Damp habitat |
| Cresscent | Seeds with good germination; can be harvested to replenish its own stock **or** transformed into Pearlily |

**Important design implication:** If a proposed fungal Influence for the Moonlit Lotus → Starlotus route must remain active after water is drained, its propagation must still reach the Plant (e.g. Airborne, or another specifically justified solution). A Waterborne path may cease when Flooded connectivity breaks. No exception to existing propagation is silently established.

### Aquatic family signature and latest refinements — agreed direction, details open

**Shared Aquatic identity:**

- **Moisture transitions are the family's signature mechanic.** Multiple Aquatic transformations and growth strategies should use **Flooded → Damp** or **Damp → Flooded**, not just require a static amount of water. There is no requirement for all Plants to use the same transition or timing.
- **All Aquatic Plants dislike Dry conditions.** **Damp** and/or **Flooded** are preferred. This is a family-level environmental commonality, **not** an agreed universal rule that Dry instantly kills every Aquatic Plant. Species-specific response to Dry (loss of productivity, dormancy, delayed death, etc.) remains open.
- Other shared traits or family-specific drawbacks can be unrelated to Moisture. Keep cultivation roles and Responses deliberately nonuniform.

**Kelpergeist → Kelpless added to the graph.** Losing **Flooded** conditions can cause Kelpergeist to transform into Kelpless. The Kelpless → Wild Watercress redemption route remains. Exactly *how long* the condition must be lost before Transformation occurs is **not yet agreed**; a short grace/exposure period would be one possible design choice.

**Starlotus — origin-dependent Moisture preference:**

- Moonlit Lotus → Starlotus is associated with **draining from Flooded to Damp**. The resulting Starlotus benefits from remaining **Damp**.
- Kelpergeist → Starlotus uses the alternative route in a **Flooded** environment. The resulting Starlotus gets **the same kind of benefit** from remaining **Flooded**, not Damp.
- The Plant **dislikes subsequent Moisture changes**. This is a property of the obtained Starlotus, not an entirely separate named species, and suggests the working term **Moisture Attunement**: the transformation route establishes the preferred current Moisture.
- **Proposed, not yet decided:** Moving away from the attuned Moisture removes the benefit rather than immediately killing the Plant. Whether returning to the original condition restores the benefit, whether a change incurs its own penalty, and what exactly the benefit modifies are open.
- This is an intentional case where a **Transformation's context leaves a persistent cultivation characteristic**, while ordinary Transformation still preserves lifecycle progress.

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
- Which environmental/Seed-production traits should become shared Aquatic family traits, as opposed to specific Plant traits?
- Exact durations, germination rates, yields, transformation timings, assigned fungi, effect combination rules, and final names (including the unnamed Base Plant) remain unassigned.


---

**Design principle:** Keep a small number of understandable core mechanics and use combinations, placement, propagation, environment, exposure timing, and species-specific Responses to create depth. Preserve the ability to change direction during the text-only design passes without turning brainstorming examples into coded rules.
