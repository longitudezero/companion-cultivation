# Ingredients — Plant family design

> **Migration draft — not yet authoritative.** The original documentation is unchanged. The approved source sections and numerical tables are retained in these topical drafts; where later decisions supersede older prose, the exact earlier wording is preserved in [historical decisions](../history/superseded-design.md). See the [Plant-family prose audit](../audit/plant-profile-prose-audit.md) before accepting these files as canonical.

**Approved first-pass Transformation routes:** 6. **Source sections preserved:** §41, §42, §43, §44, §67.

[Shared Plant lifecycle](../systems/plant-lifecycle.md) · [Transformations](../systems/transformations.md) · [Fungal roster](../fungi/README.md) · [Historical design](../history/superseded-design.md)

This file keeps the detailed species profiles, numerical tables, Seed identities, environmental responses and approved recipes together. The original source sections follow for verification; any older statements that recipes are still pending are superseded by the final recipe section included below.

---

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
5. **Approved Potato-owned Transformation recipes:** The one transforming Base, Potato, has six first-pass direct routes to Rice, Carrot, Onion, Apple, Pumpkin and Strawberry, exactly specified in **§67**. They use resolved Condition signatures plus actually reaching generic fungal environmental emissions, not named-species contact or a generic Transformation Effect (§68).
6. Preserve the distinction: **Ingredients yields familiar cooking staples** for the future RPG; **Spices** uses the already-approved older ten-species Illumination puzzle network with later Spice-appropriate naming. Do not conflate their inventories or require cooking-system mechanics now.
7. The earlier *no Ingredients transformations* and separate direct Seed-unlock proposals are **superseded**. **§41** fixes the Potato-only transformation architecture, **§§42–43** fix the **seven named profiles**, **§44** their approved numerical balance, and **§67** the **six Potato-only direct routes**. Do not reopen a settled roster, Base identity, numeric pass or generic-versus-named fungal-contact distinction during editorial cleanup.
8. **Design-only: no game code changes** until the user requests implementation.

---

## 42. Ingredients — approved Base, seven-species roster, and first four profiles (APPROVED first-pass profiles)

**Current status:** All seven Ingredient species (Potato, Rice, Carrot, Onion, Apple, Pumpkin, Strawberry) have approved first-pass profiles (§§42–43), complete numerical balance (§44), and six simple Potato-owned recipes (§67). All ordinary Seed identities and crop curves are preserved. Gameplay remains unimplemented.

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
| **Germination** | **Potato Seeds alone are available initially**; their approved chance is **28% per Seed**, with **4 Seeds guaranteeing success** under the ordinary additive cap (§44). Other Ingredients unlock through Potato's six recipes and may later supply their own Seeds. |
| **Environment** | Prefers **Damp, Temperate, Lit**, tolerates Dim and Warm with modest penalties, Dry survivable briefly at reduced output, Flooded underperforms, and continuous Hot/Freezing/Mycelial eventually lethal. No permanent Material requirement. |
| **Farming purpose** | Straightforward self-sustaining Potato Seed loop and **the only transforming entry to all six other approved Ingredients** (§§41,67). The Base retains ordinary cultivation Effect compatibility rather than a unique invented fungal Effect. |
| **Effect compatibility** | Baseline **1.0×** standard emitted Growth/Ripening, Leaf/Seed Yield, timing/window, time-based production, germination and allocation Effects. **Only Potato's species has outgoing Plant-owned transformations**. |

### Rice — APPROVED first-pass six-part terminal profile

| Part | First-pass proposal |
| --- | --- |
| **Natural lifecycle** | **Ordinary-to-slightly-slow Growth**, ordinary Ripening; not an extreme crop. |
| **Natural harvest** | **Moderate non-Seed produce** near ~110% and **high Rice Seed output** near 200%. Produces **its own Rice Seeds**. One consuming harvest. |
| **Germination** | **Rice Seeds become available by harvesting Rice** after first transforming Potato → Rice. Ordinary-to-good Rice germination; no Rice Seeds initially awarded. |
| **Environment** | Best **Flooded/Damp, Temperate/Warm, Lit**; remains viable in Damp but with reduced output relative to Flooded, Dry significantly suppresses progress/output and eventually kills, Mycelial and extreme Temperatures eventually lethal. Flooded preference provides a simple moisture distinction without adding a novel Aquatic-style dormancy/attunement rule. |
| **Farming purpose** | **Reliable staple Seed supplier** that can be cultivated directly once Rice Seeds are unlocked; meaningful contrast to the fast Leaf-oriented Carrot, without overshadowing Aquatic's exceptional water specialists. |
| **Effect compatibility** | Moderately enhanced **Seed Yield and Seed Timing Shift** susceptibility, ordinary lifecycle and Leaf Yield responses, and useful **Time-based Seed Production** compatibility if an approved reaching fungus emits that Effect (e.g., **Sim'mushro'dim or Brookrill** within its production window). **Rice remains terminal; no outgoing Transformation recipe exists.** |

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

**Current approval:** Potato is the sole transforming Base; all seven Ingredient profiles (§§42–43), the numerical pass (§44) and all **six Potato-only recipes (§67)** are approved first-pass. The seven-species Seed identities, typical harvest peaks and germination economics remain as tabulated. Named fungal contacts are intentionally not required for Ingredients. Gameplay code remains unimplemented.

---

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

**Approved Apple harvest (§44):** Its natural Leaf curve peaks near **150%**, with the productive interval roughly **135–175%**; complete numerical height, durations, Seed amounts and germination chance are in the approved §44 table. Its produced Seed identity is **Apple** (never Potato or a different Ingredient).

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

**Specific no-preemptive-nerf note:** The approved §44 first-pass numbers give Pumpkin the family's **highest natural Leaf peak: 42 Leaves at 170%**, balanced by its **14-day total lifecycle**, without automatically making it best Leaves per occupied hex-day. Its self-Seeds preserve the family goal of sustainable straightforward farming rather than a complicated sterile chain.

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

**Current approval:** All seven Ingredients profiles, Potato-only star graph, §44 numerical values and **six §67 Transformation recipes** are approved first-pass, with no biology code implementation. Tester playtesting and numeric refinement are future work.

---

## 44. Ingredients — complete numerical pass (APPROVED first-pass balance)

**Current Ingredients status:** All seven profiles, the complete §44 numeric values, the Potato-only star transformation graph and all six **§67 generic-emission recipes** are approved first-pass. Every Ingredient naturally produces **its own Seeds**, but initially only Potato Seeds are unlocked. A Seed-grown terminal Ingredient cannot Transform. Fungal roster now has 31 approved species; no Plant/Fungus biology game code is implemented.

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

Compatibility factors affect only an actual **approved fungus-emitted cultivation Effect**, never grant that Effect automatically. Named time-based producers include **Echomorel, Sim'mushro'dim, Duskleaf and Brookrill** with distinct streams, magnitudes and progress windows. Accrual requires the emitted footprint to reach the Plant while its ordinary lifecycle actually advances at positive rate inside the emitter's window: not during full stall, after 200% or after destructive harvest.

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
- **Rice's 1.6× Seed Timing, 2.1× hourly Seed Production and 1.6× Allocation** reinforce its Seed-economy role. These scale already approved standard fungal Effects where eligible—including Seed-side hourly production by **Sim'mushro'dim or Brookrill** and harvest-time Allocation by **Sunspore or Goldgill**—without creating a new Rice resource or overriding §56's exchange and Seed-identity rules.
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

**Approved first-pass temperature productivity numbers (§44):**
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

1. **No Ingredient Transformation beyond Potato's six approved direct outgoing routes (§67)**. Neither a Potato-transformed terminal Plant nor a directly Seed-grown terminal becomes eligible for any further Transformation. Potato is the only transforming Ingredient, and all six terminal destinations are accessible without intermediate Ingredient routes.
2. **Each of seven Ingredients produces its own Seeds**. No unobtainable Ingredient Seed type and no cross-species Seed identity in this family. Own Seeds make simple sustainable kitchen staples, without requiring repeated Base transformations after a first terminal Seed harvest.
3. **One consuming harvest** collects all Leaves/Produce and Seeds currently present. Carrot peaks at **95%** and must support harvesting before 100%; Strawberry's **115%** narrow peak competes with waiting for its 200%-Seed harvest. No early-harvest Seeds are magically guaranteed if the natural Seed curve has not produced them yet.
4. **Pumpkin should remain distinctly highest in natural one-time Ingredient output (42 Leaves)**, with longer growth and a later 170% peak; **fast Strawberry (22)** and **Carrot (16)** should be appealing for throughput after Seed replenishment. **Apple (26)** and **Onion (19)** are more forgiving, slower alternatives. **Rice (22 Seeds)** is an economic support crop suited to Flooded. Do not flatten specialties before gameplay testing.
5. **Fungi remain consistent emitters**: compatibilities scale signed recipient cultivation Effects, not environmental Source arithmetic; non-Growth effects work only in their declared progress windows and with eligible existing harvest curves; Time-based Production never accrues without positive lifecycle progress.
6. The numerical balance should be assessed by **sustainable non-Seed output per occupied hex-day**, including the opportunity cost of maintaining Seed supplies, additional fungal hex occupancy, germination failures and missed harvest peaks. A 42-Leaf Pumpkin harvest isn't necessarily better than multiple smaller quick harvests.
7. **Production mapping for the separate RPG remains deferred**. The farming engine's output term "Leaves" is still provisional for all Families, and Apple/Pumpkin/Strawberry do not create unique engine-stage resources or shared cross-game inventory mechanisms.
8. Only the already agreed family architecture and approved individual Ingredient profiles are locked as **current first-pass design**; all **§44 numerical tables were APPROVED by the user**, with subsequent tester playtesting and potential revision planned. **No game code modified, fungus roster fixed, or final transformation recipe assigned.**

**Current approval:** All seven Ingredients profiles (§§42–43), their §44 complete numeric balance, the 31-species Fungus roster, and six simple environment-plus-generic-emission Potato recipes (§67) are approved in design. The underlying three-Property environment is implemented, but actual Plant/Fungus/Mycelial gameplay is not.

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

**Current approval:** The six Potato-owned §67 routes and all five other families' approved recipes now form the full **69-route first-pass roster**. This remains **text-only design**; no Plant/Fungus/Mycelial runtime or Transformation timers have been implemented. Feasibility/exclusivity claims still require testing before implementation.

---
