# Aquatic — Plant family design

> **Current approved first-pass design reference.** This page preserves detailed approved source data, quantitative assumptions and exceptions. Later approved shared rules and final family recipes govern where earlier explanatory paragraphs differ; superseded wording is retained in the [historical archive](../history/superseded-design.md). **Plant/Fungus/Mycelial gameplay remains unimplemented.**

**Approved first-pass Transformation routes:** 14. **Source sections preserved:** §25, §26, §27, §28, §69.

[Shared Plant lifecycle](../systems/plant-lifecycle.md) · [Transformations](../systems/transformations.md) · [Fungal roster](../fungi/README.md) · [Historical design](../history/superseded-design.md)

This file keeps the detailed species profiles, numerical tables, Seed identities, environmental responses and approved recipes together. The original source sections follow for verification; any older statements that recipes are still pending are superseded by the final recipe section included below.

---

## 25. Aquatic Plant profiles — first batch (APPROVED first-pass profiles)

**Balance benchmark:** Ordinary Plants target approximately **10 Leaves/10 Seeds** and **4 in-game days to 100% / 8 total days to 200%** in ideal habitat, with larger differences allowed for specialists. Aquatic's 11 profiles and §28 numerical pass are approved, as are all **14** Transformation recipes in §69. Fungal gameplay remains unimplemented.

**Aquatic identity preserved from §12:** All Aquatic Plants **dislike Dry**; **Damp and/or Flooded** are preferred. Some routes involve Waterborne reach and water-level changes; continuous loss of Flooded can transform **Kelpergeist into Kelpless**, but §69 now specifies the distinct Kelpergeist → Kelpless route: 18h continuously not Flooded, with no named-fungus requirement. The two Starlotus attunements and Silvercress stage-specific benefits remain intact.

### Approved Aquatic network (recipe details in §69)

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

| Category | Approved first-pass profile direction |
| --- | --- |
| **Natural lifecycle** | **Average 4-day Growth and 4-day Ripening** baseline; not a specialist. |
| **Natural harvest** | **10 Leaves around 100%** and **10 own Seeds around 200%**, with broad ordinary decline/rise curves. Single plant-consuming harvest. |
| **Germination** | **Ordinary/reliable**, its own Seeds available at start. The approved §28 chance is **28% per Aquatic Base Seed**, with **4 Seeds** guaranteeing germination under the additive cap. |
| **Environment** | Prefers **Damp / Temperate / Lit**; tolerates Flooded reasonably well without outperforming true Flooded specialists. **Dry sharply reduces Growth and output**, rather than instant death. Cold/Warm manageable, Hot and Freezing increasingly harmful and lethal after prolonged exposure; Mycelial eventually lethal. |
| **Farming purpose** | Simple starting Seed loop and gateway to the Kelp, Lotus and Cress branches; dependable but not a competitive specialist. |
| **Effect compatibility** | **1.0× ordinary response** to Growth, Ripening, Leaf Yield, Seed Yield, germination and curve-shaping Effects; environment Sources use universally consistent behavior. No special multiplication or tolerance. |

### Kelpfull — APPROVED first-pass profile

**Kelpfull's approved role:** A straightforward, accessible **Flooded Seed producer** in the Kelpfull → Kelpergeist/Kelpless network. Named contacts, resolved conditions and exact exposure times for its branches are recorded in §69; no additional unapproved special mechanism is needed.

| Category | Approved first-pass profile direction |
| --- | --- |
| **Natural lifecycle** | **Somewhat faster Growth** than Aquatic Base and ordinary-to-slightly-fast Ripening. |
| **Natural harvest** | **Low-to-moderate Leaves**, with **high Aquatic Base Seed** output toward 200%. Its direct harvest role resembles Woodlands' Bamboom but belongs to Aquatic's Flooded economy. No own Kelpfull Seeds. |
| **Germination** | **No current source of Kelpfull Seeds**; obtained via transformation from Aquatic Base. Aquatic Base Seeds it produces use the Base's germination rates. |
| **Environment** | Strongly prefers **Flooded**, **Temperate or Cold**, and **Lit/Dim**. Damp is survivable but substantially poorer for output; **Dry suspends progress** and is dangerous over sustained exposure. Hot/Freezing and prolonged Mycelial exposure are harmful/lethal. There is no benefit from either extreme or Mycelial. |
| **Farming purpose** | **Efficient Aquatic Base Seed supplier**; gives the player Seed fuel for repeated moisture-branch experiments, with fewer Leaves than more specialized Aquatic crops. |
| **Effect compatibility** | **Strong Seed Yield compatibility while Flooded** and useful Ripening-rate/Seed Timing response; weaker-than-average Leaf Yield compatibility. No special transformation-dependent Effect. |

### Kelpergeist — APPROVED first-pass profile

**Approved fork (§69):** Kelpergeist remains a valuable **Dark/Flooded specialist**. **18 uninterrupted hours without Flooded**, whether Damp or Dry and without any fungus prerequisite, transforms it to **Kelpless**. The alternative **Kelpergeist → Starlotus** requires **Flooded/Cold/Dim + Tidegill OR Siltgill for 28h**, creating a newly attuned Starlotus at 0%. Returning to Flooded before the environmental-loss clock completes resets that attempt.

| Category | Approved first-pass profile direction |
| --- | --- |
| **Natural lifecycle** | **Slower Growth** and fairly ordinary Ripening; becomes worthwhile after investment into a stable dark, flooded setup. |
| **Natural harvest** | **High Leaves in a fairly narrow middle-to-late Ripening peak**, with **a few own Kelpergeist Seeds** toward 200%; harvest timing or maintaining a Flooded/Dark habitat is more important than easy Seed multiplication. |
| **Germination** | **Kelpergeist Seeds** germinate at a relatively difficult rate compared to Aquatic Base; still permit direct cultivation of the specialist if a Seed supply is maintained. |
| **Environment** | Best at **Flooded + Dark + Cold/Temperate**. Damp substantially reduces Growth and output; **Dry pauses development** (rather than instantly killing it), and triggers the established **loss-of-Flooded Transformation risk**. Lit/Bright reduces its specialist Leaf performance. Hot and Freezing remain harmful, and Mycelial is eventually lethal. |
| **Farming purpose** | Distinctive **dark-water high-Leaf producer**, with a premium reward for preserving Flooded, plus a risk of slipping into undesirable Kelpless if water is lost; can alternatively be used to obtain Flooded-attuned Starlotus. |
| **Effect compatibility** | **Strong Leaf Yield compatibility while both Dark and Flooded**; ordinary or slightly reduced Seed Yield and Growth/Ripening compatibility. Yield shifts and harvest-window changes work normally; changing Illumination/Moisture through global environment effects has its indirect expected consequences. |

### Kelpless — APPROVED first-pass profile

**Existing role:** Negative transformation reachable from either **Kelpfull or Kelpergeist**, with a **confirmed redemption route → Wild Watercress**. Keep it harvestable but clearly inferior to its precursor.

| Category | Approved first-pass profile direction |
| --- | --- |
| **Natural lifecycle** | **Slow Growth and Ripening**, giving it poor production throughput; transformation creates the new species at 0% progress (§58). |
| **Natural harvest** | **Very few Leaves** and **a small amount of Aquatic Base Seeds** late in Ripening; no Kelpless Seeds. The Seed output allows a small salvage harvest without replacing the more valuable Wild Watercress redemption path. |
| **Germination** | No Kelpless Seed source; obtained only through Transformation. Any Aquatic Base Seeds it harvests use the Base germination rate. |
| **Environment** | Fares best at **Damp / Temperate / Dim–Lit**, not Flooded; **Dry remains bad** despite its name/origin. Cold/Warm underperform, Hot/Freezing and prolonged Mycelial can kill. No Mycelial tolerance bonus. |
| **Farming purpose** | **Recoverable mistake:** a meager emergency Seed/Leaf harvest or transform it into **Wild Watercress** for a fresh useful branch. Does not need an invented personal fungal bonus. |
| **Effect compatibility** | **Weak Leaf and Seed Yield compatibility** and mildly reduced Growth/Ripening response; ordinary direction-preserving behavior when influenced. No unusual new effect. |

**First batch status:** The user **approved all four six-part first-pass Plant profiles**—Aquatic Base, Kelpfull, Kelpergeist, and Kelpless—without immediate changes. The Aquatic network and agreed Moisture identity remain unchanged. Continue Aquatic in batches (Lotus route; Cress route), then assign whole-family numeric Growth/Ripening, harvest curves, germination, and Effect-compatibility values as in Woodlands.

---

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

| Category | Approved first-pass profile direction |
| --- | --- |
| **Natural lifecycle** | **Ordinary-to-slightly-slow Growth and ordinary Ripening**. An accessible, steady early Lotus branch Plant, not itself a high-yield specialist. |
| **Natural harvest** | **Near-average Leaves with one broad early/mid-Ripening peak**, and **moderate Sunken Lotus Seeds** at late Ripening. Produces **its own Seeds**, making the Lotus branch maintainable after reaching it rather than forcing a fresh Base-to-Sunken transformation for every attempt. |
| **Germination** | **Normal/moderate** chance for Sunken Lotus Seeds. Seed access is earned from the first harvested Sunken Lotus, not present among starting Seeds. |
| **Environment** | **Flooded, Temperate, Lit** optimal; **Dim** acceptable. Damp is survivable but **noticeably decreases Growth and harvest output**. **Dry pauses development and eventually kills after sustained exposure**. Cold/Warm reduce output, Hot and Freezing are harmful/lethal after exposure, Mycelial eventually lethal. No exception benefits from extreme states. |
| **Farming purpose** | **Easy, self-sustaining flooded entry** to the Lotus branch and consistent small-to-medium Leaf/Seed crop; gateway to Moonlit Lotus. Flooded compatibility is more important than any elaborate innate trick. |
| **Effect compatibility** | **Ordinary 1.0× behavior** across Growth/Ripening, Leaf/Seed, timing/window, and germination effects. Slightly above-average **Seed Timing Shift** response while Flooded is acceptable for this draft (final number in family matrix); not essential to obtain or cultivate it. |

### Moonlit Lotus — APPROVED first-pass profile

| Category | Approved first-pass profile direction |
| --- | --- |
| **Natural lifecycle** | **Ordinary Growth, somewhat long Ripening**. The longer Ripening period matters for the Plant's harvest economy, not for opening its Flooded/drain Transformation fork, which works at any progress (§59). |
| **Natural harvest** | **Good Leaves in middle Ripening** and **modest Moonlit Lotus Seeds near 200%**; harvest directly for useful output or retain and steer it toward Starlotus/Pearlily. **Self-Seeds**, no Seed identity gimmick. |
| **Germination** | **Moderately demanding** Moonlit Lotus Seed germination; direct growing is feasible after a Seed harvest, but initial access remains via Sunken Lotus Transformation. |
| **Environment** | **Flooded, Dim, Temperate or Cold** preferred. **Remaining Flooded is genuinely productive** for Seed farming, so draining to pursue Starlotus trades a real benefit. Damp is survivable but **immediately lowers ordinary Leaf/Seed performance**, without instant death or intrinsic special drying damage. Dry pauses development and becomes lethal after extended exposure; Hot, Freezing and prolonged Mycelial harmful/lethal. |
| **Farming purpose** | **Fork/intermediate crop with a meaningful choice:** harvest or reproduce Moonlit Lotus under Flooded conditions; remain Flooded with the appropriate exposure/Influence to pursue Pearlily; or drain after qualifying Flooded exposure to pursue a **Damp-attuned Starlotus**, at any lifecycle stage (§59). |
| **Effect compatibility** | **Stronger response to Ripening slowdown while Flooded**, useful for timing the Plant's own harvest, but **not required to delay or enable its Transformation fork**; **good Seed Yield compatibility while Flooded**. Otherwise ordinary Leaf, Growth, Germination, and timing responses. This does not itself trigger the transformation. |

### Starlotus — APPROVED first-pass profile

**Crucial approved family concept retained:** One species with **origin-set Moisture Attunement**, not two new species. A Starlotus transformed from **Moonlit Lotus** is *Damp-attuned*. A Starlotus transformed from **Kelpergeist** is *Flooded-attuned*. Losing its preferred state **removes its attunement bonus, never directly kills it**. It still experiences normal Dry/temperature/Mycelial environmental hazards.

| Category | Approved first-pass profile direction |
| --- | --- |
| **Natural lifecycle** | **Slow Growth and ordinary Ripening**. A premium Plant cultivated to maximize a decisive harvest, with no extra phase or special timer. Transformation starts a fresh 0–200% lifecycle (§58). |
| **Natural harvest** | One **very high, fairly concentrated mid-to-late Ripening Leaf peak**. **No natural Seeds** in the approved first-pass §28 balance; Starlotus is a premium **sterile Leaf specialist**, making the transformation path the way to obtain the attuned Plant each time. This avoids inventing unattuned Starlotus Seeds or a two-variant Seed identity mechanism. |
| **Germination** | **No Starlotus Seeds are produced** in the approved first-pass family design. Obtain via either existing transformation origin; germination chance is **not applicable** without a Seed source. |
| **Environment** | Damp/Flooded both **ordinarily viable**, Dim/Lit and Temperate most suitable. **Attuned Moisture grants an innate +60% multiplier to its natural Leaf yield while the current Moisture exactly matches the stored attunement**. Switching to the other viable Moisture removes **only this bonus**; **returning to the original attuned Moisture restores it immediately**. Attunement is retained throughout the Plant's life and never permanently lost by an interruption. Dry is strongly unfavorable, severely suppresses production and can kill after prolonged exposure. Hot/Freezing and sustained Mycelial harmful/lethal; **attunement never grants Mycelial/extreme protection**. |
| **Farming purpose** | **Premium, high-maintenance Leaf crop** that rewards success along two different routes and then rewards **holding the correct water level**; structurally contrasts with Silvercress's stage-specific **changing** water levels. Not an ordinary self-seeding crop. |
| **Effect compatibility** | **Very strong compatibility with existing Leaf Yield and Harvest Timing Shift Effects while attuned**, normal or mildly reduced responses when unattuned; ordinary rate/window effects. **Seed Yield, Seed Timing, time-based Seed Production, and Produce–Seed Allocation cannot create Seeds**, preserving proposed sterility. Environmental Influence arithmetic is always global and unaltered by Starlotus. |

**Approved first-pass intrinsic attunement trait (§28):** When attuned, **+60% native Leaf yield**. This is a natural Plant Response to its attuned Moisture, not a new fungus Effect; numerical magnitude can be tested in the later playtest pass. Approved fungal Yield emissions apply only through actual Source reach and the receiving Plant's compatibility, without changing the stored attunement. The persisted attunement is the reason the Plant's two origins matter.

### Pearlily — APPROVED first-pass profile

**Existing routes retained:** Reachable from either **Moonlit Lotus** (remaining Flooded route) or **Cresscent** (shorter, accessible shortcut). **Not** meant to be the Aquatic family's top Leaf or Seed producer.

| Category | Approved first-pass profile direction |
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
- **Approved current scope:** Aquatic's exact numeric lifecycle/Seed/compatibility pass is in §28 and its **14 Plant-owned routes in §69**; neither requires new resource or Fungus-Effect categories. The 31-species fungus roster is design-approved, but biology runtime is not implemented.
- All four Lotus profiles are **APPROVED for the first Plant-design pass** (user endorsed them without changes). Fine tuning still belongs to the numerical balance and later playtest passes.

---

## 27. Aquatic Plant profiles — Cress branch (APPROVED first-pass profiles)

**Approved status:** The user approved all Lotus profiles (§26), including **sterile Starlotus**, its reversible **+60% attuned Leaf bonus**, and Pearlily's multiple origins; the Cress profiles follow the same six-part structure. The full **§28** numerical pass and all **14 named or explicitly environmental-only §69 Transformation recipes** are now approved first-pass. Do not treat an earlier absence of named fungal assignments as current.

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
| **Germination** | **Exceptional natural germination:** approved first-pass **40 percentage points per Cresscent Seed** under the agreed additive one-Seed probability model. **Three Seeds guarantee germination** (capped at 100%); a single Seed has a real 40% chance. This is a Plant/Seed species characteristic, not a fungal one. |
| **Environment** | Favors **Damp, Temperate, Lit/Dim**, with **Flooded fully survivable but modestly less efficient** for Seed production. **Dry** strongly damages Growth/Seed productivity and eventually kills; Hot/Freezing and prolonged Mycelial lethal risks. Cold/Warm less productive, with no special extreme/overlay benefits. |
| **Farming purpose** | **Efficient self-sustaining Seed engine and accessible Pearlily shortcut.** Its strong Seed germination makes repeated Cresscent/ Pearlily cultivation cost-effective, even though Cresscent itself isn't a premium Leaf producer. The choice is to harvest for many Seeds, or transform that **same living instance** for a Pearlily crop. |
| **Effect compatibility** | **Above-average Seed Yield and Germination Adjustment responses**, especially in Damp. Ordinary-to-slightly-reduced Leaf Yield response. Strong positive Seed Timing or time-based Seed production response can be used with appropriate already-approved fungal emitters where actual reach and progress eligibility match, still constrained by lifecycle advancement and one-time harvest. |

**Chosen Seed identity:** Cresscent Seeds only, rather than Pearlily Seeds on a Seed harvest. Otherwise harvesting Cresscent would short-circuit its own Transform-or-Harvest decision.

### Three-Plant relationships and approved §28 numeric follow-through

- **Wild Watercress** is an uncomplicated self-Seeding **Damp branch foundation** and redeemable **Kelpless** destination.
- **Silvercress** is a **nonpunitive Flooded-Growth/Damp-Ripening optimization challenge**, with approved first-pass **+60% Growth speed** and **+50% Leaf Yield** innate bonuses and its own moderately reliable Seeds.
- **Cresscent** is a **high-germination Seed multiplier** with approved first-pass **40% chance per Seed / 3 Seeds guaranteed** and its own Seeds, supporting the **Cresscent → Pearlily** shorter route.

No new fungal roster, emission, Transformation Effect, stage, or permanent origin variant is added here. The user **APPROVED all three Cress profiles**, including **Silvercress +60% intrinsic Growth rate during Flooded Growth / +50% Leaf Yield during Damp Ripening** and **Cresscent 40 percentage points of germination per Seed**. The whole Aquatic family numerical balance proposal is recorded in §28. Real playtesting follows implementation.

---

## 28. Aquatic numerical pass — APPROVED first-pass lifecycle, harvest, germination, Effect compatibility and hazard responses

**Status:** User **approved the entire Aquatic numerical pass (§28)**—all 11 lifecycle and harvest rows, Seed identities, additive germination probabilities, Effect-compatibility tables, intrinsic Starlotus/Silvercress bonuses, and proposed Dry/Mycelial/temperature hazards—as the accepted **first-pass balance**, to be revised from eventual tester playtests. Game-wide baseline: nominal **10 Leaves near 100%, 10 Seeds near 200%, 4 in-game days to 100%, and 8 total days to 200%**. Favor bold, memorable species differences over prematurely conservative tuning. **Subsequently approved:** 31 named first-pass Fungi (§§47–57), including actual Seed Timing and hourly-production emitters; all **14 Aquatic Transformations** have exact approved recipes in §69. Plant/Fungus/Mycelial gameplay is not yet implemented.

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

**Reading tables:** Every multiplier scales the **magnitude of the already approved emitting fungus's signed Effect change**, not the whole final harvest or time. The **31-species fungal roster (§§47–57)** defines effect identities, strengths and ranges; Plant conditions affect only response intensity. **1× ordinary**, **2× twice the emitted change**, **0× ineligible/no response**. Direction never reverses. Signed slowdowns can be *more adverse* on susceptible Plants; strengths are not guaranteed benefits. A slash means ordinary multiplier / special multiplier when the listed receiving-Plant condition or attunement holds. Environmental Influence arithmetic is globally consistent and never multiplied by these compatibility tables.

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

**Time-based Production** is an ordinary Effect already emitted by the approved **Echomorel, Sim'mushro'dim, Duskleaf and Brookrill** roster entries, with their own Leaf/Seed streams, magnitudes, time windows and reach. It is **not** automatically granted by these compatibility tables: accrual requires a reaching eligible emission and positive Growth/Ripening progress inside the specified window, never after 200% or in full dormancy. **Starlotus's absolute Seed sterility** persists under Seed boosting, hourly production and Allocation.

**Harvest Window** means changing the *width* of the existing natural yield curve without creating a second bloom. **Timing Shift** means changing when a peak occurs, not how much it produces. **Leaf–Seed Allocation** redistributes output in the emitter's defined direction; it does not change Seed identity, clone a Seed output that doesn't exist, or allow a second harvest.

### E. Primary Moisture Responses and exposure hazards — concrete optional balance numbers

The profiles specify preferred Moisture states; **§28's approved first-pass numeric tables** make the innate Growth/output and Dry/Mycelial hazard relationships measurable. These apply independently of emitted fungus-effect compatibility, and **environmental Source arithmetic is never scaled per Plant**. Further balancing may happen after testers play the eventual implementation.

- **Damp/Flooded values** in this paragraph are relative Crop Growth and normal yields; where a row favors one state, the other is typically **0.65×–0.90×**. Where both are equally viable (Pearlily, Silvercress, Starlotus before attunement), both are **1.0×**, ignoring their separate species-specific bonuses.
- **Approved first-pass Dry response (§28):** The table defines both lifecycle-rate and output factors. A **0× Growth** factor suspends lifecycle progress but **does not suspend harmful-exposure clocks**, so uninterrupted Dry can kill at the species' assigned threshold; its clock resets when resolved Moisture stops being Dry.

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
- **Kelpergeist → Kelpless (§69):** The already approved Flooded-loss/redemption path has a specified Plant-owned timing and contact rule in §69, separate from Kelpergeist's lethal **Dry** hazard timer. Use that precise recipe and preserve §64 event ordering; no lifecycle-percentage gate or arbitrary priority is allowed.
- For **Hot and Freezing**, none of these 11 Aquatic species has a beneficial exception. As a simple first-pass family response, each imposes **0.5× lifecycle rate and 0.5× ordinary yields**, followed by death after **72 uninterrupted hours** at that extreme. Mandrakadabra's separate **4-hour continuous Bright lethal threshold (§70)** belongs to Woodlands; its rejected six-hour Mycelial special rule does **not** apply to Aquatic.
- Other existing Cold/Warm, Dim/Lit/Bright responses remain as described in the approved species profiles, with small ordinary penalties. **All Aquatic Plants dislike Dry, and Mycelial is never beneficial.** Exposure reset mechanics and hazard handling need playtesting; these numbers are intentionally assertive proposals rather than an engine implementation.
- **Hazard time** advances with actual time in the harmful condition even if lifecycle progress is fully suspended; no time-based production occurs while suspended. Apply lethal thresholds to actual environmental states, not raw source strength. For continuous Mycelial exposure, timer resets only when the overlay actually disappears from the Plant's hex (not simply when the emitting fungus is removed).

### Approved Aquatic parameters and outstanding implementation checks

- This section has **all numeric fields needed for the Aquatic first balance proposal**; the user prefers making decisions that can be corrected after testing, not postponing a species' distinctive mechanic until fungus design.
- Intrinsic Starlotus +60%, Silvercress +60%/+50%, and Cresscent 40%/Seed remain part of the user-approved qualitative profiles, **not unapproved novelty invented by this table**.
- The **new** lifecycle, harvest, Seed-germination (other than Cresscent), compatibility and hazard numbers are now **APPROVED first-pass values**; eventual playtest findings can revise them.
- **Design status:** All six families and the 31-Fungus roster now have first-pass rules and the 69 Plant-owned Transformations are recorded. Actual Plant/Fungus/Mycelial implementation and mandatory tester playtesting remain future work.

---

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
