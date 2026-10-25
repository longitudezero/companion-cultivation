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
| **Ingredients** | Straightforward, recognizable cooking ingredients; Growth, Ripening, harvest, and Seed sustainability | **No Transformations, ever, for this family** |

**Spices / Ingredients are separate for cross-game clarity:** the Spices family yields recognizable RPG cooking spices; Ingredients supplies ordinary cooking staples that RPG players can understand without ever playing the cultivation game. **Mechanics do not have to be redesigned to suit names.** The original Food Plant names (Thymely, Sunrice, Moonrice, Shadow Onion, Starberry, Pum'king, Thymekeeper, Ghost Rice, Dillusion, Glass Apple) remain *working design identifiers*, not locked names; the prior suggested spice-themed replacements are **proposals only**.

**The Ingredients exception:** each Ingredient species stays that species throughout its lifecycle; fungi may still affect its Growth, Ripening, Seed production, or normal non-Seed harvest, **but do not transform it into another Plant**. Its species' Seeds must have a direct availability/unlock route, because no transformation chain exists. Exactly which Ingredient Seeds are given initially or unlocked later is **open**. Ingredients don't have a single required transformation-Base-Plant lineage.

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
- A Fungus grows **0–100%** before it can be harvested, and its harvested product is **Seeds only**. It does not use the Herb's 100–200% Leaf-to-Seed Ripening phase.
- A Fungus begins emitting its Influences **immediately after successful germination**, rather than only at 100%, provided its environmental/habitat needs permit emission.
- **Standard Fungus harvest is one-time:** at 100%, collect its Seeds and remove the Fungus Instance from its hex.
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
  │     │     ├─> Kelpless         (loss of Flooded after exposure; agreed route)
  │     │     └─> Starlotus        (alternative origin; Flooded attunement)
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

**Alternative cross-route:** Kelpergeist → Starlotus via a specialized fungal transformation is a favored part of the two-origin Starlotus design, not just a placeholder link. Exact fungi and environmental requirements remain open.

### First-pass possible Plant roles (all tentative except the directional preferences above)

| Plant | Possible cultivation purpose |
| --- | --- |
| Unnamed Base Aquatic Plant | Starting access to all Aquatic branches |
| Kelpfull | **Straightforward early transformation**; candidate for producing many Base Plant Seeds while Flooded, without requiring a more elaborate personal mechanic |
| Kelpergeist | Reliable harvest in Dark/Flooded conditions |
| Kelpless | Unwanted transformation after habitat disruption; redeemable into Watercress |
| Sunken Lotus | **Straightforward early transformation**; Waterborne-connected entry to the Lotus branch, without requiring a further special complication |
| Moonlit Lotus | Intermediate whose next Transformation depends on water level during Ripening |
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

- Moonlit Lotus → Starlotus is associated with **draining from Flooded to Damp**. The resulting Starlotus benefits from remaining **Damp**.
- Kelpergeist → Starlotus uses the alternative route in a **Flooded** environment. The resulting Starlotus gets **the same kind of benefit** from remaining **Flooded**, not Damp.
- The Plant **dislikes subsequent Moisture changes**. This is a property of the obtained Starlotus, not an entirely separate named species, and suggests the working term **Moisture Attunement**: the transformation route establishes the preferred current Moisture.
- **Agreed:** Moving away from the attuned Moisture **removes the special Starlotus benefit; it does not kill Starlotus merely for losing its attunement**. The challenge is preserving an optimization bonus, not a lethal maintenance requirement. Ordinary family-wide aversion to Dry is a separate concern.
- **Open:** Whether returning to the original attuned condition restores the special benefit, exactly what the bonus modifies, and whether unrelated hazards still impose their own species-specific consequences. Do not invent an additional penalty for changing the attuned Moisture.
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
- Shared family traits already agreed: **Aquatic Plants dislike Dry**, and **Moisture transitions are a recurring signature**. Any additional shared environmental, reproductive, or fungal traits can be considered only if they serve a useful puzzle.
- Exact durations, germination rates, yields, transformation timings, assigned fungi, effect combination rules, and final names (including the unnamed Base Plant) remain unassigned.


## 13. Flowers — first family-interactions design pass

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

**Food has been replaced by Spices and Ingredients as two separate Families.** Spices keeps Food's approved *first-pass Illumination network and mechanics*, with spice-themed species names to choose later. Ingredients adds a simple non-transforming family for RPG cooking staples. The older Fertility-centered suggestion remains superseded.

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

### Ingredients — sixth family without transformations

**Agreed architectural exception:** Ingredients has **no transformations**, but retains the ordinary 0–200% Growth/Ripening lifecycle, ordinary Seed production, species-specific Growth/Ripening Rates, and a one-time plant-consuming harvest yielding non-Seed output and Seeds as appropriate.

- Recognizable RPG cooking staples (e.g., Potato, Rice, Carrot, Onion, Apple, Pumpkin, Strawberry) are **illustrative candidate species**, not a confirmed roster.
- Each Ingredient always remains its own species. Fungi can potentially improve or worsen Growth, Ripening, Seed production, or normal non-Seed yield, but **cannot trigger a Transformation Response** in Ingredients.
- Each Ingredient must have some **direct Seed access / unlock mechanism** (exact starting roster and later unlock mechanism open). This is an explicit exception to the five transformation-based Families' Base-Plant-only starting access.
- Ingredients should be useful as a relatively straightforward and sustainable growing option, **not automatically useless or inferior** to magical transformed Plants.
- The RPG cooking loop should be understandable to someone who has never played the farming game. Treat what an individual fantasy Plant yields as an RPG item mapping or identity choice **without assuming a shared inventory or production-conversion mechanic** until that separate game's integration is designed.

### Open items

- Final **Spices** species names that evoke usable cooking spices while keeping all ten roles and edges.
- Ingredients species roster, Seed availability/unlock model, and eventual yield targets compared with the transformation families.
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
- **Physical adjacency to Fungus C**, a separate spatial requirement from an Influence reaching the Plant. Example: a Plant stays **Flooded and adjacent to Fungus C** for X uninterrupted hours, then transforms; Fungus C does **not** have to direct an Influence toward that Plant to count for adjacency.
- **Hex overlay states** such as Enchanted or Mycelial, where these prospective overlays are retained.
- **Lifecycle progress/stage, current Plant identity, and Continuous Exposure** conditions.
- **Change/event triggers** for the Desert recovery model (e.g. previously sustained Freezing, then thawing while another condition/fungus is present). Evaluation at transition boundaries requires future exact ordering rules; the ordinary Continuous Exposure reset still applies.

### Consequences of moving responsibility to Plants

- **Fungi keep only their declared environmental, cultivation, and overlay Effects**; effects remain consistent in type/direction, with family/species/condition-dependent magnitudes as described in §16.
- **A Fungus can be used in multiple transformation recipes without gaining a unique power for every recipient.** The same fungus pair may transform different eligible Plants to different destinations, or have no transformation on another Plant.
- **No Transformation Effect** needs to be emitted by Wakemorel, Prismorel, Rushroom, or any other fungus. Provisional descriptions of a fungus 'enabling a transformation' should be read as shorthand for **satisfying a condition in the Plant's recipe**, including an ordinary Influence reaching it or physical proximity.
- **Fungi still may affect how feasible or dangerous a recipe is**, because they change environmental states and Growth/Ripening Rates, or sustain overlays. A transformation can occur from a conjunction of conditions without any special cultivation-only Influence.
- **Source attribution may be important:** two opposite Luminous Source contributions can cancel in net Illumination while a Plant's recipe still requires the presence/reach of both named sources. An implementation must be able to distinguish **which Source emissions reach a hex** from only the computed final environment level. This need does not change existing Environmental System v1.1 arithmetic.
- **Recipes are species-defined; no transformations for Ingredients**, which is the explicit sixth-family exception.

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

For each Plant: define natural Growth and Ripening; Leaf and Seed harvest curves and Seed identities; environmental preferences; **specific reactions to Freezing and Hot**; **specific Mycelial exposure threshold/response**; innate special exceptions; how the agreed catalogue of fungal Effects modifies it (including magnitudes/conditions where necessary); transformation recipes (if not Ingredients); and why it matters for sustained Leaf farming.

**No fungi or new code are being designed/implemented in this step.** The proposed 13-name roster remains nonbinding, and Enchanted and permanent Base Materials remain deferred per earlier decisions.

## 21. Confirmed five-pass workflow for Plant/Fungus design

**Agreed current sequence** (supersedes earlier attempts to finalize fungi before fully specifying Plants):

1. **All Plants first.** Working one Plant at a time, define exactly these six parts: **Natural lifecycle; Natural harvest; Germination; Environment; Farming purpose; Effect compatibility**. This covers innate multiple harvest peaks, Seed identities/curves, favorable and harmful hex states, extreme-temperature/Mycelial Responses, and sensitivity/conditional bonuses to the agreed Effect catalogue. **Do not choose named fungi or settle transformation recipes during this pass.** Do not require an exhaustive environmental bonus checklist when none is useful.
2. **First fungus pass.** Only after the Plant profiles are drafted, bundle fixed, consistent fungus Effects into candidate fungus species with habitat and propagation considerations.
3. **Complete Plant-owned transformation recipes.** Decide which named fungi and their **ordinary Influence reach**, physical adjacency, environmental/overlay states, lifecycle stages, and continuous exposure durations satisfy each Plant's transitions. **This is not a return to fungus-emitted Transformation Effects.**
4. **Adjust fungal designs as necessary** to ensure workable, readable puzzles, multiple useful strategies, and sensible cross-family reuse.
5. **Adjust Plant designs where necessary** to fix weak or dominant strategies, impossible transformations, or discrepancies exposed by the preceding phases; then balance precise numbers in context.

**Status:** The six-part Plant specification method is agreed. Any proposed first-pass statistics or compatibility profiles produced next remain **proposals until reviewed**, even though the workflow itself is locked.

**Woodlands layout corrections:** The user confirms the arrow **Mistlewoe → Tanglethorn**, previously tentative, and adds **Mandrabra → Mandrakazam** directly in addition to **Mandrabra → Mandrakadabra → Mandrakazam**. These are network facts, not provisional recipe assignments.


## 22. Woodlands — Plant-by-Plant profiles (phase 1)

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

### Bamboom — PROPOSED first-pass profile, pending review

**Existing established role that must be preserved:** Bamboom is a strong producer of **Woodlands Base Plant Seeds**. The sequence **Bamboom → Bamboozeling → Bamboozled** is confirmed; it is not a reason to assign fungi or specific transformation timers during Phase 1. The earlier ambiguity with a possible name "Bamboozle" remains separate.

| Category | Proposed direction |
| --- | --- |
| **Natural lifecycle** | **Fairly rapid Growth** and **ordinary Ripening**, so a productive Base-Seed supply can be maintained through frequent rotations rather than extremely long waits. |
| **Natural harvest** | **Low-to-moderate Leaves** with Seed quantity weighted toward the **later Ripening stages**. Produces **Woodlands Base Plant Seeds**, not Bamboom Seeds, unless later specifically revised. Its innate Seed Yield is a major advantage over the Base Plant. No natural second bloom. |
| **Germination** | **Ordinary/reliable**, assuming suitable habitat. No special germination gimmick needed; acquiring fresh Bamboom Instances still depends on the Woodlands Base and its transformation route. |
| **Environment** | Favors **Damp** and **Temperate or Warm** conditions; **Lit** works well, **Dim** is acceptable. **Cold** impairs performance. **Hot/Freezing** are harmful; prolonged exposure can be lethal. **Mycelial** is harmful and eventually lethal. Nothing here grants an extreme or Mycelial bonus. |
| **Farming purpose** | **Base-Seed amplifier:** grows and harvests relatively efficiently to replenish Seeds for multiple Woodlands branches, at the opportunity cost of sacrificing some Leaf output and occupying a field with a reproductive crop. Its value is farming throughput over repeated rotations, not unique rewards. |
| **Effect compatibility** | **Strong response to Seed Yield increases**, especially under **Damp** conditions (a possible conditional strength bonus rather than a new Effect). Ordinary response to Growth acceleration and Germination increases; **Ripening acceleration is valuable** because Seeds arrive later. Standard response to other effects unless later species-specific needs emerge. No reversed fungal Effect directions. |

**Not decided:** Exact rates, Leaf/Seed curves, the size or precise habitat for its extra Seed Yield compatibility, Mycelial/thermal death thresholds, and the identity/recipe of the influence conditions that transform it to Bamboozeling. These choices are proposals for user review; **not approved**.


---

**Design principle:** Keep a small number of understandable core mechanics and use combinations, placement, propagation, environment, exposure timing, and species-specific Responses to create depth. Preserve the ability to change direction during the text-only design passes without turning brainstorming examples into coded rules.
