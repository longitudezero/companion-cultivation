# Woodlands — Plant family design

> **Migration draft — not yet authoritative.** The original documentation is unchanged. The approved source sections and numerical tables are retained in these topical drafts; where later decisions supersede older prose, the exact earlier wording is preserved in [historical decisions](../history/superseded-design.md). See the [Plant-family prose audit](../audit/plant-profile-prose-audit.md) before accepting these files as canonical.

**Approved first-pass Transformation routes:** 13. **Source sections preserved:** §22, §23, §24, §70, §71, §72.

[Shared Plant lifecycle](../systems/plant-lifecycle.md) · [Transformations](../systems/transformations.md) · [Fungal roster](../fungi/README.md) · [Historical design](../history/superseded-design.md)

This file keeps the detailed species profiles, numerical tables, Seed identities, environmental responses and approved recipes together. The original source sections follow for verification; any older statements that recipes are still pending are superseded by the final recipe section included below.

---

## 22. Woodlands — Plant-by-Plant profiles (phase 1)

**Active Woodlands hazard (§70, approved):** Mandrakadabra dies after **4 uninterrupted in-game hours in resolved Bright**; its earlier special six-hour Mycelial death condition has been transferred to [historical decisions](../history/superseded-design.md). Mandrakadabra's ordinary output/Seed identity and Lit optimum remain as specified. **All 13 routes in §71 are approved.**



### Woodlands Base Plant (name undecided) — APPROVED first-pass profile

| Category | Approved direction |
| --- | --- |
| **Natural lifecycle** | Average/ordinary Growth and Ripening speeds; not an unusually fast or slow Plant. |
| **Natural harvest** | One broad non-Seed harvest peak during early-to-middle Ripening; its own Seeds become more available toward 200%. Ordinary, dependable output rather than a premium peak. |
| **Germination** | Relatively reliable under suitable conditions. More planted Seeds improve germination chance up to the regular cap. |
| **Environment** | Prefers **Damp, Temperate, and Lit**. Can survive **Dim, Warm, Cold** with some reduced performance. **Hot and Freezing** are harmful and prolonged exposure may kill it. **Mycelial** exposure eventually kills it. |
| **Farming purpose** | Reliable starter crop, sustainable source of its own Seeds, and entry to Bamboo, Mandrake, and Tanglethorn routes. |
| **Effect compatibility** | Ordinary/default strengths with applicable Growth, Ripening, Leaf, Seed, and germination Effects; no special compatibility modifiers or one-off conditions. |

The Woodlands Base name is still **undecided**. Its once-open stage times, Seed germination probability, yield benchmark and compatibility now have approved first-pass numbers in **§§23–24**; the full outgoing Transformation recipes are in **§71**. Continuous harvest-curve interpolation and some precise non-special hazard thresholds remain implementation/playtest questions.

### Bamboom — APPROVED first-pass profile

**Approved Bamboom route context:** Bamboom remains a strong producer of **Woodlands Base Seeds**, and its confirmed **Bamboom → Bamboozeling → Bamboozled** chain is fully specified in §71: **Damp/Warm and Tickbolete OR Emberbell**, for **24h** and **16h** on the successive precursor Plants. Transformed instances restart at 0%.

| Category | Approved first-pass profile direction |
| --- | --- |
| **Natural lifecycle** | **Fairly rapid Growth** and **ordinary Ripening**, so a productive Base-Seed supply can be maintained through frequent rotations rather than extremely long waits. |
| **Natural harvest** | **Low-to-moderate Leaves** with Seed quantity weighted toward the **later Ripening stages**. Produces **Woodlands Base Plant Seeds**, not Bamboom Seeds, unless later specifically revised. Its innate Seed Yield is a major advantage over the Base Plant. No natural second bloom. |
| **Germination** | **Ordinary/reliable**, assuming suitable habitat. No special germination gimmick needed; acquiring fresh Bamboom Instances still depends on the Woodlands Base and its transformation route. |
| **Environment** | Favors **Damp** and **Temperate or Warm** conditions; **Lit** works well, **Dim** is acceptable. **Cold** impairs performance. **Hot/Freezing** are harmful; prolonged exposure can be lethal. **Mycelial** is harmful and eventually lethal. Nothing here grants an extreme or Mycelial bonus. |
| **Farming purpose** | **Base-Seed amplifier:** grows and harvests relatively efficiently to replenish Seeds for multiple Woodlands branches, at the opportunity cost of sacrificing some Leaf output and occupying a field with a reproductive crop. Its value is farming throughput over repeated rotations, not unique rewards. |
| **Effect compatibility** | **Seed Yield 2.0× ordinarily, 2.5× while Damp**; **Growth Rate and Ripening Rate 1.3×**; Leaf Yield 0.8× (§24). Bamboom does not produce its own Seeds, so direct Bamboom-Seed Germination Adjustment is **N/A**. The increased Seed output remains **Woodlands Base Seeds**. Fungal Effect directions stay fixed by their emitters; no new Bamboom-only effect is introduced. |

**Approved numerical and recipe follow-through:** Bamboom's stronger Woodlands Base Seed production, 18 Base Seeds at 200%, stage times, compatible Effect magnitudes, and the named **Bamboom → Bamboozeling** route (**Damp/Warm + Tickbolete OR Emberbell for 24h**) are now fixed first-pass in **§§23–24,71**. Its earlier open-name/contact remarks are superseded; the fine shape of continuous production curves and some hazard/rounding tuning remain to be tested.


### Bamboozeling — APPROVED first-pass profile

**Established role:** Bamboozeling is the **inferior-but-still-harvestable intermediate** in the **Bamboom → Bamboozeling → Bamboozled** chain. Qualifying Damp/Warm Source contact is specified in §71: **Tickbolete OR Emberbell for 16 uninterrupted hours** for Bamboozeling → Bamboozled. Its ability to salvage a small harvest before transforming remains part of its crop trade-off.

| Category | Approved first-pass profile direction |
| --- | --- |
| **Natural lifecycle** | Similar to Bamboom, but **slightly slower overall** (especially Ripening). Continue using the normal 0–200% lifecycle and restart at 0% on transformation (§58). Do not add an extra stage. |
| **Natural harvest** | **Modest Leaves** and **fewer Woodlands Base Plant Seeds than Bamboom**, with Seeds concentrated toward later Ripening. Still a worthwhile emergency harvest if the player missed Bamboom's preferred window; distinctly worse efficiency than Bamboom, but **not** zero output. **No Bamboozeling Seeds** proposed. |
| **Germination** | No directly harvested Bamboozeling Seeds in this draft. It is primarily obtained by transforming an already germinated Woodlands Plant. If it is ever directly plantable by Seeds, use ordinary germination; **direct access isn't being added now**. |
| **Environment** | Prefers **Damp, Temperate, Lit**, with Warm/Dim acceptable at some cost. Cold slows/reduces performance; Hot or Freezing harmful and potentially lethal after prolonged exposure. Mycelial dangerous and eventually lethal. No special temperature or Mycelial benefits. |
| **Farming purpose** | **Salvageable warning stage** in a risky productive chain. Gives the player a reason to harvest before further unwanted transformation; inferior output is an intentional consequence, not a new premium crop. |
| **Effect compatibility** | Normal direction-consistent responses to catalogue Growth, Ripening, Leaf, Seed, and germination Effects. **No inherited exceptional Seed Yield bonus from Bamboom**; effects may improve harvest but do not by themselves reverse the innate inferior role or create a special Seed identity. |

**Playtest questions:** Bamboozeling's slower Ripening, decline in output, Seed salvage and hazards can be tuned against Bamboom's approved numeric values (§§23–24). Its outgoing **Damp/Warm + Tickbolete OR Emberbell, 16h** recipe is fixed first-pass (§71); no named-contact question remains open.

### Bamboozled — APPROVED first-pass profile

**Established role:** A **bad endpoint for repeated exposure**. **Zero Leaves, zero ordinary Seeds**. Harvesting yields an unusual **Bamboo Steel trophy**—a flavor/achievement reward, **not a normal farming production resource** or an alternative dominant Leaf-production strategy. It has no further approved transformation route.

| Category | Approved first-pass profile direction |
| --- | --- |
| **Natural lifecycle** | Remains within the **ordinary 0–200% Plant lifecycle**, with no productive Leaf/Seed peak. The exact speed is economically unimportant; begin the new Bamboozled instance at 0% on transformation rather than adding a special extra counter (§58). |
| **Natural harvest** | **Always zero Leaves and zero ordinary Seeds**. The established one-time **Bamboo Steel trophy** can be collected through the normal plant-consuming harvest at eligible maturity. Timing/eligibility for the trophy is still to be fixed; don't invent a new permanent resource economy. |
| **Germination** | Produces **no Seeds**, therefore offers **no self-propagating Seed/germination loop**. Obtain by transforming Bamboozeling; no direct Bamboozled Seed source assumed. |
| **Environment** | No favorable **production** habitat, because there is no standard output to optimize. Ordinary survivability in Damp/Temperate/Lit, with Hot/Freezing and Mycelial still harmful and potentially fatal after sustained exposure. Don't add a novel environment preference just to decorate the failure state. |
| **Farming purpose** | **Unwanted transformation consequence and optional trophy discovery**; its inability to return regular Seeds or Leaves makes continued exposure a meaningful farming mistake. Trophy is not an economically preferable fallback. |
| **Effect compatibility** | No ordinary **Leaf Yield, Seed Yield, Seed Timing, Harvest Window, or time-based production** can conjure output from the Plant's zero baseline in this draft. Growth/Ripening adjustments may change *when it can be harvested*; environmental modifiers/hazards still apply normally. Bamboo Steel trophy quantity is **not increased** by ordinary Leaf/Seed bonuses. |

**Open:** Trophy harvesting eligibility and how long a Bamboozled instance can survive in adverse conditions. Its core "no Leaves, no Seeds, Bamboo Steel trophy" identity is **existing agreed design**, not a new proposal. Avoid introducing fungally induced exotic bonus production here merely to rescue a purposely bad outcome.

**Approved Bamboo role contrast:** Bamboom produces valuable Base Seeds; Bamboozeling is an inferior but harvestable last-chance crop; Bamboozled supplies **one Bamboo Steel trophy at ≥100%** and **zero ordinary Leaves/Seeds**. Exact transformations and durations are in §71; ordinary harvest eligibility and stage reset remain in §§23–24,58.


**Current Bamboo approval:** Bamboozeling/Bamboozled profiles, salvage/yield differences, exact stage/Seed numbers (§23–24), and their named contact + time recipes (§71) are approved first-pass. Bamboozled's trophy is not a normal fungal harvest output. Real balance may change after tests.

### Tanglethorn — APPROVED first-pass profile

**Existing role:** Accessible from the unnamed Woodlands Base; branch gateway to **Mistlefoe** or **Bramblewraith**, and the return destination for **Mistlewoe**. It is a stable, useful Plant, not a premium specialist.

| Category | Approved first-pass profile direction |
| --- | --- |
| **Natural lifecycle** | Ordinary/steady Growth and Ripening, somewhat less speedy than Bamboom, with no unusual stage behavior. |
| **Natural harvest** | A **respectable but not exceptional** single Leaf peak during middle Ripening, with modest **Tanglethorn Seeds** appearing later. Producing its own Seeds lets the branch become sustainable once reached, but without matching Bamboom's high Base-Seed output. No second peak. |
| **Germination** | Reliable/ordinary, slightly less favorable than the Woodlands Base if a distinction is needed; Tanglethorn Seeds are not initial player access. |
| **Environment** | Prefers **Damp and Temperate**, accepting **Dim or Lit**. Cold/Warm impose modest performance loss; Dry/Flooded can reduce productivity rather than instantly kill. Hot or Freezing are harmful, potentially lethal after prolonged exposure; Mycelial exposure eventually lethal. |
| **Farming purpose** | Low-maintenance **branch junction** with a worthwhile direct harvest and modest Seed self-sustainability. Supports safer Bramblewraith farming and the Mistlefoe → Mandrabra cross-branch pivot. |
| **Effect compatibility** | Generally **ordinary strengths** with the catalogue's Growth/Ripening/Leaf/Seed/Germination Effects. No special global magnification or invented one-off effect required for a junction Plant. |

**First-pass resolution:** Tanglethorn's lifecycle/output and germination/Effect compatibility are in **§§23–24**. Its outgoing **Mistlefoe** and **Bramblewraith** recipes, with actual named contact and hours, are approved in **§71**. Finer continuous interpolation and environmental penalty tuning can be tested without treating either route as unassigned.

### Mistlefoe — APPROVED first-pass profile

**Mistlefoe's approved fork (§71):** Mistlefoe is a productive Tanglethorn-line pivot. Under **Damp/Dim**, simultaneous contact from **Mistruffle AND (Fogdial OR Veilcap)** starts preparation. Keeping all contacts for **20h** creates Mistlewoe; **removing Mistruffle after at least 12h but strictly before 20h**, while preserving other requirements, creates Mandrabra at loss of contact. The fork uses actual emitted reach; no generic Transformation Effect exists.

| Category | Approved first-pass profile direction |
| --- | --- |
| **Natural lifecycle** | **Ordinary Growth**, slightly longer/steadier **Ripening** than Tanglethorn, giving a real opportunity to choose whether to harvest or pursue a transition. |
| **Natural harvest** | A **good single mid-Ripening Leaf peak**, stronger than Tanglethorn but below Mandrakadabra's future premium yield. **Small-to-moderate Mistlefoe Seed** output later in Ripening; self-reproducing once obtained but not a Seed specialist. |
| **Germination** | Ordinary to moderately demanding in suitable habitat; own Seeds can be grown once harvested, but this does not grant them as starting Seeds. |
| **Environment** | Prefers **Damp, Dim, Temperate**. Lit is workable with reduced Leaf output; Cold/Warm produce mild penalties. Dry is unfavorable. Hot/Freezing and prolonged Mycelial exposure are dangerous and ultimately lethal. No exceptional tolerance. |
| **Farming purpose** | **Attractive middle-tier Leaf crop with a strategic choice:** keep it productive and self-sustaining, or manipulate conditions to enter the more dangerous Mandrake branch, risking the Mistlewoe wrong turn. |
| **Effect compatibility** | **Leaf Yield 1.0× ordinarily, 1.8× while Dim** (§24); other approved multipliers remain in that table. The intentional Mistlefoe fork involves **Mistruffle AND (Fogdial OR Veilcap)** in Damp/Dim. **Removing Mistruffle after 12h but before 20h**, while preserving the other qualifying requirements, creates Mandrabra; retaining all qualifying contact to 20h instead creates Mistlewoe (§71). Mistruffle also emits an ordinary Leaf Yield effect, not a new transformation effect. |

**Resolved first-pass:** Mistlefoe's signed Effect compatibility numbers are in **§24**, and the **12h-to-under-20h contact-removal versus 20h sustained-contact** named-fungus fork is specified in **§71**. The exact continuous Leaf/Seed output-curve shape remains a later balancing detail.

### Mistlewoe — APPROVED first-pass profile

**Existing role:** An **undesirable** transformation from Mistlefoe when conflicting required conditions/fungal presences remain active, but **not a dead end**: **Mistlewoe → Tanglethorn** is explicitly confirmed.

| Category | Approved first-pass profile direction |
| --- | --- |
| **Natural lifecycle** | **Slow Growth** and ordinary Ripening, producing poor overall throughput; every transformed instance begins at 0% under §58. |
| **Natural harvest** | **Low Leaves**, with an approved first-pass **3-Leaf peak around 125%** and **2 Tanglethorn Seeds at 200%** (§23). **No Mistlewoe Seeds** are produced. Salvaging its Tanglethorn Seeds is weaker than a successful restoration to Tanglethorn but is a valid alternative to another Transformation. |
| **Germination** | **Mistlewoe has no own Seed identity or direct planting route**. The approved **2 Tanglethorn Seeds** yielded at its late harvest (§23) use **Tanglethorn's 23% per-Seed germination chance** and ordinary five-Seed guarantee (§24). The Mistlewoe instance itself is reached by the §71 Mistlefoe Transformation. |
| **Environment** | Favors ordinary **Damp/Temperate/Dim-or-Lit** merely to avoid further losses; Dry/Flooded/Cold/Warm tend to depress already-weak production. Hot/Freezing can kill it following exposure; **Mycelial is dangerous**, potentially with relatively short exposure tolerance. No bonus from Mycelial. |
| **Farming purpose** | **Wrong-route consequence that remains redeemable.** Players may accept a meagre emergency harvest for a few Tanglethorn Seeds or transform it back into a productive Tanglethorn Plant. No exotic bonus or novel resource is needed. |
| **Effect compatibility** | Standard or below-average **magnitude** for Leaf/Seed Yield increases; ordinary rate changes can speed or slow the weak lifecycle without changing its identity. Do not invert any fungal Effect. It remains a weak baseline crop despite ordinary enhancements. |

**First-pass resolution:** Mistlewoe's **2 Tanglethorn Seeds at 200%, 3 Leaves near 125%, 5-day Growth/9-day total development** are recorded in **§23**. Its weak compatibility is in **§24** and the **Damp/Temperate/Lit + Dewmender OR Mistruffle for 12h** return route is in **§71**. Fine continuous curves and environmental severity remain playtest topics.

### Bramblewraith — APPROVED first-pass profile

**Existing role:** The appealing **safe and forgiving** Woodlands crop, with a **very broad productive harvest window**, **no conventional lethal environmental weakness**, and respectable—but not Mandrakadabra-level—Leaf yield. Its value is **reliability**, not highest possible peak.

| Category | Approved first-pass profile direction |
| --- | --- |
| **Natural lifecycle** | **Somewhat slow Growth**, ordinary Ripening once established. Longer setup balances an exceptionally forgiving production window. |
| **Natural harvest** | One **broad, fairly flat Leaf-yield plateau** spanning a large portion of Ripening, at a **moderate-to-good** yield, not the extreme premium Mandrakadabra peak. **Moderate Bramblewraith Seed** production toward later Ripening; can sustain its own dependable crop rotation once unlocked. No second bloom. |
| **Germination** | Ordinary/moderate chance, not a rare Seed specialist; its strength lies in reaching and reliably harvesting it, not superior germination. |
| **Environment** | Best around **Damp, Temperate, Dim/Lit**, but **survives all ordinary Moisture/Illumination states**, with reduced productivity in uncomfortable conditions. **Rare, deliberate exception:** Hot and Freezing impose major Growth/Leaf/Seed penalties but **do not automatically cause eventual death**. **Mycelial is tolerated without a survival-time death threshold**, **but imposes a substantial production/development penalty and NEVER gives a benefit**. This preserves its established nonlethal-resilience identity while honoring general rules that extremes are bad and Mycelial is never helpful. |
| **Farming purpose** | **Safe, self-sustaining, low-attention Leaf crop**: less peak output than the demanding Mandrake route, but far lower timing and environmental failure risk. A practical alternative for maximizing reliable output over long rotations. |
| **Effect compatibility** | Ordinary Leaf Yield, Growth, Seed, and Ripening Effects. **Harvest Window widening has diminished practical room** because Bramblewraith's innate productive plateau is already broad; slowing Ripening can further increase real-world harvesting opportunity but does not create new peaks. No extraordinary fungal compatibility or new effect needed. |

**Approved exception:** Bramblewraith indefinitely survives Hot, Freezing and Mycelial exposure, without acquiring an environmental or Mycelial benefit. Such states impose important rate/output penalties, described numerically in **§23–24**; these are production penalties **without a lethal countdown**. The user approved this rare resilience, which must survive balancing and implementation.

### Relationship summary — this four-Plant batch

~~~text
Tanglethorn ───> Mistlefoe ───> Mandrabra       (desired pivot)
    │               └───────> Mistlewoe ──┐   (undesired)
    │                                      │
    └───────────> Bramblewraith            └──> Tanglethorn  (confirmed redemption)
~~~



### Four-Plant approval update

The user approved **Tanglethorn, Mistlefoe, Mistlewoe and Bramblewraith** as first-pass profiles, including **Bramblewraith's indefinite Mycelial tolerance with severe production penalties and no bonus**. The later approved **§§23–24** give their numerical times, yields, germination and compatibility; **§71** specifies all of their outgoing routes and named fungal contacts. Only implementation/playtest calibration remains open.

### Mandrabra — APPROVED first-pass profile

**Approved junction:** Both Woodlands Base and Mistlefoe can reach Mandrabra. Its distinct outgoing recipes are **Damp/Bright + Rushroom OR Siltgill for 12h → Mandrakadabra**, versus **Damp/Temperate/Dim/no Mycelial + Hushroom OR Gloamclock for 24h → Mandrakazam** (§§71–72). Both yield a fresh Plant at 0% and are mutually exclusive by Bright versus Dim.

| Category | Approved first-pass profile direction |
| --- | --- |
| **Natural lifecycle** | **Steady ordinary Growth** and **ordinary Ripening**; not the extreme specialist, but a reliable junction Plant that players can manage before choosing a Mandrake crop pathway. |
| **Natural harvest** | **Respectable, moderately concentrated Leaf peak** during middle Ripening; **small-to-moderate Mandrabra Seed** production toward later Ripening. It can replenish its own Seeds without displacing the Bamboom/Base-Seed economy or Mandrakazam's specialist role. No natural second bloom. |
| **Germination** | **Normal/moderate reliability** when planted from its own harvested Seeds; its initial unlock is still via Transformation, not starter Seed access. |
| **Environment** | Favors **Damp, Temperate, and Lit**; Dim is workable at a modest cost, Cold/Warm are less effective, Dry/Flooded are suboptimal. **Freezing and Hot** hurt output and can eventually kill; prolonged **Mycelial** exposure can kill. No innate extreme or Mycelial tolerance. |
| **Farming purpose** | **Flexible gateway** to either the risky premium Leaf grower **Mandrakadabra** or the **Mandrakazam** production path that supplies Mandrakadabra Seeds. Modest own Seed harvest makes repeated preparation feasible without making Mandrabra itself the best crop. |
| **Effect compatibility** | Ordinary Growth, Ripening, germination, and non-Seed Yield compatibility. **Moderately strong response to Harvest Window Adjustment** when Lit (a magnitude bonus to a known Effect, not an extra ability) is a candidate: gives players an accessible, less high-stakes harvest compared with the later premium Mandrakadabra. Ordinary Seed Yield compatibility otherwise. |

**Balance scope:** Exact quantities and Seed chances are specified by the approved first-pass Woodlands numerical and germination passes (§§23–24). Mandrabra's two approved Transformations are specified in §71; fine-tuning remains a playtest concern.

### Mandrakadabra — APPROVED first-pass profile

**Established role:** **Highest natural Leaf peak in Woodlands**, with a demanding direct Mandrabra Transformation under resolved Damp/Bright plus **Rushroom OR Siltgill contact for 12h** (§§71–72), and safer Seed access from Mandrakazam. Mandrakadabra's distinctive innate lethal condition is **4 uninterrupted hours in resolved Bright** (§70); **Lit** remains the preferred farming light. The former six-hour Mycelial-specific lethal timer is historical and no longer applies.

| Category | Approved first-pass profile direction |
| --- | --- |
| **Natural lifecycle** | **Somewhat longer Growth** and **ordinary-to-fairly-fast Ripening**. Produces impressive output but does not give the player a completely effortless harvest window. A transformed instance begins anew at 0% under §58. |
| **Natural harvest** | One **very high, comparatively narrow Leaf peak** in middle Ripening: the **largest raw Leaf potential in Woodlands**, clearly above Bramblewraith's broad but lower plateau. **Zero ordinary Seed production proposed**; the premium Plant doesn't self-reproduce by default. No second bloom. |
| **Germination** | Although it **produces no Seeds itself**, it **can be planted directly from Mandrakadabra Seeds produced by Mandrakazam**. Its Seed germination is **ordinary/moderately reliable in suitable habitat**, making the safer Seed-based approach genuinely practical. |
| **Environment** | Prefers **Damp, Temperate, and Lit**. Dim/Cold/Warm impair output; Dry/Flooded less efficient; Hot and Freezing remain ordinary dangers. **Distinctive lethal threshold:** **4 continuous in-game hours of resolved Bright Illumination** (§70). Changing away from Bright before the threshold resets the Bright clock; a new Mandrakadabra created through Transformation or direct Seed planting begins with a fresh clock. The earlier special six-hour Mycelial death threshold has been withdrawn; the ordinary Woodlands Mycelial aversion/hazard is not an additional special six-hour rule. |
| **Farming purpose** | **High-risk, high-reward Leaf specialist.** Players may reach it by transforming Mandrabra under time pressure or instead grow it from **Mandrakazam-supplied Seeds** in a safe field, avoiding the particular hazardous exposure needed for direct transformation. |
| **Effect compatibility** | **Strong compatibility with ordinary Leaf Yield increases**, potentially even stronger while **Lit** (adjusts magnitude only). **Time-based Leaf Production** can be valuable if the Plant keeps progressing, but extreme slowing/extended exposure can increase practical risk in a hazardous setup. **No Seed Yield Effect generates Seeds** from its innate zero-Seed identity in this draft. Rate and window effects otherwise remain directionally consistent. |

**Current vulnerability (§70):** Resolved **Bright** for **4 uninterrupted in-game hours** kills Mandrakadabra, resetting completely when the light leaves Bright. The timer starts fresh on transformation/planting; Lit remains the optimal farm state. Its approved direct route requires **Damp + Bright + named Rushroom OR Siltgill Influence contact for 12h** on Mandrabra, without a target-hex Mycelial prerequisite (§§71–72). The full profile's high Leaf / no native Seed identity remains intact.

**Important balance distinction:** The **very high Leaf yield is an established role**, but **sterility, peak width, and rate/compatibility** have approved first-pass definitions in §§23–24 (still subject to playtest balancing). A direct Seed-grown Mandrakadabra is the *same Plant*, without a mandatory persistent penalty or magic attunement. A high single-harvest peak may not dominate sustained-rotation yields once Seed costs, failure risk, and setup time matter.

### Mandrakazam — APPROVED first-pass profile

**Established role:** A **safer reproductive pathway** that **harvests Mandrakadabra Seeds**. It is reachable either **directly from Mandrabra** or **via Mandrakadabra**, as confirmed. The Seed route may cost more setup/growing time than a lucky direct premium transformation, even though the direct Mandrabra → Mandrakazam edge uses fewer graph steps; do **not** describe it as necessarily more transformation edges.

| Category | Approved first-pass profile direction |
| --- | --- |
| **Natural lifecycle** | **Slower Growth and somewhat long Ripening**, suitable for a crop the player cultivates to build a future Seed supply instead of a fast immediate Leaf harvest. Normal 0–200% lifecycle applies; a transformed instance starts at 0% (§58). |
| **Natural harvest** | **Low-to-moderate Leaves** and **high Mandrakadabra Seed production**, with the strongest Seed returns during **late Ripening**. Produces **Mandrakadabra Seeds**, not Mandrakazam Seeds. Single ordinary Leaf peak, no second bloom. |
| **Germination** | No self-produced **Mandrakazam Seeds** planned, so repeat access is through the established transformation network. The **Mandrakadabra Seeds** it yields obey **Mandrakadabra's germination requirements**, not Mandrakazam's. If direct Mandrakazam Seeds are ever introduced, their germination would require a separate decision. |
| **Environment** | Prefers **Damp, Temperate, Dim or Lit**, with comparatively forgiving light requirements but **not** Bramblewraith-level resilience. Cold/Warm/Dry/Flooded can reduce performance; **Hot or Freezing** cause harmful penalties and eventual death, as can prolonged **Mycelial** exposure. **Does not share Mandrakadabra's special lethal prolonged qualifying exposure** as an innate hazard in this proposal, making Seed farming feasible. |
| **Farming purpose** | **Dedicated Mandrakadabra Seed supplier:** sacrifices immediate Leaves and some time to sustain future premium Leaf harvests **without repeatedly exposing the premium Plant to the dangerous transformation setup**. A strategically valuable counterpart, not another best Leaf producer. |
| **Effect compatibility** | **Strong response to Seed Yield Adjustment**, especially while **Dim** (a conditional magnitude increase, in contrast with Bamboom's Damp Seed synergy). Ripening acceleration can improve turnaround toward late Seed returns; Growth acceleration can offset setup cost. Ordinary Harvest Yield and germination compatibility; never turns effects into opposite-direction behavior. |

**Balance follow-up:** Mandrakazam's approved **20 Mandrakadabra Seeds at 200%**, Seed compatibility and its germination supply chain are specified in §§23–24, while approved Transformation routes are in §71. Playtesting should evaluate the Seed economy and whether Mandrakazam's fallback utility is sufficient.

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
- **Mandrakadabra** rewards demanding cultivation with the **highest Woodlands Leaf peak**; **4 continuous hours of resolved Bright** after becoming Mandrakadabra is lethal, so the player should move Bright → Lit promptly (§70).
- **Mandrakazam** is the **Seed-focused detour** that supports safe, repeatable Mandrakadabra crops.



---

## 23. Woodlands full-family numerical pass — approved first-pass balance

**Current hazard (§70):** Mandrakadabra's operative special lethal threshold is **four uninterrupted hours in Bright**, never the earlier special Mycelial six-hour timer. The numerical rows below remain accepted first-pass values.


**Status:** The user **approved the Woodlands numerical table below as the first balancing-pass baseline**, including deliberately large differences between ordinary and specialized Plants. **10** is the typical non-Seed harvest near 100% and **10** Seeds near 200%, with about **4 in-game days to 100%** and **8 total in-game days to 200%** as the game-wide reference. A thoroughly optimized quick crop may aim for **36–48 in-game hours to 100%**. This is **not final balance**: actual playtesting and tester feedback will motivate later adjustments. The user explicitly prefers **bold, exciting differentiation now over prematurely conservative balancing**. Germination and compatibility proposals follow in §24.

### Scope and interpretation

- Durations describe progress from **0% for a freshly germinated or newly transformed Plant in its preferred habitat with no fungal modifiers**. Transformations restart lifecycle progress at 0% (§58), so these figures also describe a newly transformed species' full reference development time when its habitat remains optimal.
- **Days to 200% are total**; e.g., 4 days to 100% and 8 to 200% implies 4 further days of Ripening.
- **Peak Leaves** show *maximum harvestable non-Seed output* and the relevant approximate progress percentage or range; **Seeds at 200%** are a separate later harvest choice, not automatically collectible on the same instance as peak Leaves.
- The reference curves may give **0 ordinary Leaves at 200%**; accumulated time-based additional output is a separate case for when fungus compatibility is introduced. One harvest always consumes the Plant.
- Woodlands Base's **10 Leaves at 100% and 10 own Seeds at 200%** implements the standard game anchor. Other Plants intentionally skew volume and timing without requiring every Plant to have a different exotic Effect.
- A Plant unable to provide its own Seeds may nevertheless be directly planted if another Plant supplies Seeds of its species (e.g. **Mandrakadabra Seeds from Mandrakazam**).
- This is a **shape-and-magnitude first pass**, with approved per-Seed germination investment probabilities in §24; only continuous percentage-by-percentage Leaf/Seed interpolation remains unspecified. These figures should be tested for practical Seeds consumed and sustained Leafs per occupied hex-day.

### Approved first-pass Woodlands numerical table

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

**Bamboozled first-pass rule:** An ordinary one-time harvest once at least 100% progress yields **one Bamboo Steel trophy**, and never Seeds or Leaves. Because Bamboozled is obtained by Transformation, the new instance starts at **0%** and must advance before its trophy is eligible (§58). This is accepted as initial balance, subject to later testing; it does not introduce a generic trophy economy.

**Mandrakadabra lethal exception (§70):** Resolved Bright for **4 uninterrupted in-game hours** kills it, starting with a fresh clock upon Transformation or direct planting and resetting if Bright ceases before completion. A fresh Mandrakadabra must be moved from the Bright transformation setup to its preferred Lit condition promptly; the older six-hour special Mycelial exception is not operative.

### Open balancing checks once the table is reviewed

- Whole-family efficiency should use **expected non-Seed output per occupied hex per unit time**, not only one-harvest peak Leaves; the opportunity cost of growing Base Seeds, losing Plants to exposure, and fungal/Blocker occupied hexes matters.
- The high Seed quantities for Bamboom and Mandrakazam must be evaluated against **actual Seed investment, chance to germinate, and the need to establish access to their Seed-producing Plant**. Large Seed numbers alone do not guarantee dominance.
- **Bramblewraith** has high reliability because of an unusually broad Leaf window, not because it exceeds **Mandrakadabra's high peak**.
- Development speeds are based on **in-game elapsed time**, not decided as wall-clock/offline progression. How play time is represented can be settled for the actual game's timing implementation.
- The full continuous harvest-curve interpolation, some species-specific thermal/ordinary Mycelial hazard thresholds, rounding and stacking need later precision. **Germination chances and Seed costs are approved in §24, and all Woodlands Transformation recipes in §§71–72.**

---

## 24. Woodlands numerical pass II — germination and Effect compatibility (APPROVED first pass)

**Current hazard (§70):** Use **four uninterrupted hours in resolved Bright** for Mandrakadabra; its **Lit** optimum and approved compatibility multipliers are unchanged.


**Status:** The user **approved the entire Woodlands first-pass germination and Effect compatibility numbers below**, including the per-Seed chance model, both numeric compatibility tables, conditional modifiers, zero-output exclusions and the bold specialization differences. These are **accepted initial balance numbers, not final tuned values**. After implementation there must be an actual **playtesting pass with testers** and further balance revisions based on observed emergent behavior. Preference: exciting, memorable, even exaggerated specialist rewards now; rein in overshoots only if tests justify it.

### Approved first-pass germination mechanics

- **Planting a Seed** germinates into the **species named by that Seed**. Germination probabilities therefore belong to the *target Plant's Seeds*, **not** the living Plant that happened to produce them. E.g. **Bamboom produces Base Seeds → use Base's germination rate**. **Mandrakazam produces Mandrakadabra Seeds → use Mandrakadabra's germination rate**.
- **Approved first-pass Seed sink:** **chance for n invested Seeds = min(100%, n × one-Seed chance)**. All Seeds committed to that one planting attempt are consumed whether success or failure. It is a first-pass approved design, not implemented or final playtest balance. Extra Seeds beyond 100% are wasted; the player can choose to spread Seeds across slots or concentrate them to guarantee one Plant. Later testers may reveal whether a gentler nonlinear or variable cap is preferable.
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
- Example: an emitted **+20% Seed Yield** received at **2.5×** compatibility produces a **+50% modifier** for that Plant, not a 2.5× multiplication of final harvest. **Emberbolete** is an actual approved +20% Seed Yield Source (§48), while this paragraph remains an illustration of the compatibility arithmetic rather than a recipe assignment.
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

**Time-based production definition:** These multipliers apply only when an **approved living fungus emits the corresponding time-based Leaf or Seed Effect and its actual footprint reaches the Plant**, the Plant is in the Effect's qualifying progress window, and the lifecycle is still advancing. **No production while fully stalled or after 200%**. The Leaf/Seed entries are per output type, *not* a new Plant-specific power; fungi must explicitly advertise which output they accumulate.

**Leaf–Seed allocation definition:** Modifies the strength of a fungus's defined production-shift *in its fixed emitted direction*, with output always subject to availability. This does **not** change Seed identity, invent a second bloom, or create new Seeds on sterile Plants.

**Sterility and trophy invariants:** **Bamboozled always yields 0 ordinary Leaves and 0 Seeds**, including under Time-based Production and Yield Effects; its Bamboo Steel trophy is unaffected. **Mandrakadabra remains 0 Seeds**, even under positive Seed Yield, time-based Seed output or Leaf–Seed allocation. Ordinary Leaf-enhancement remains its main specialization. Such explicit zero-output eligibility is an **intrinsic Plant trait** and not a reversed fungus Effect.

### Key examples for later balancing and playtesting

- **Bamboom** produces **18 Woodlands Base Seeds** at 200% and has **2.5× Seed Yield compatibility while Damp**. An actually approved **Emberbolete +20% Seed Yield** cultivation emission that reaches it would be amplified to **+50%** (18 → 27 Seeds before rounding), provided normal eligibility/other conditions hold (§§24,48); this is a farming example, **not a Transformation requirement**.
- **Mistlefoe** naturally peaks at 14 Leaves and can make much more of a Leaf Yield emitter **while Dim**. Moving it to Lit sacrifices this compatibility bonus, creating a placement trade-off without an extra one-off ability.
- **Bramblewraith** reaches a 12-Leaf broad plateau already, so **0.3× harvest widening** leaves minimal added headroom. It retains its rare **Mycelial survival tolerance with severe production penalty**, never a Mycelial advantage.
- **Mandrakadabra** has a **30-Leaf** natural high peak and **2.5× Leaf Yield compatibility in Lit**. A +20% Yield source would contribute +50%, potentially **45 Leaves**, but its narrow harvest window, Seed costs, and **4-hour lethal Bright exposure after its Bright-demanding transformation** keep the setup demanding (§70).
- **Mandrakazam** supplies 20 Mandrakadabra Seeds over a long 10-day lifecycle; **2.5× Seed Yield compatibility while Dim** can increase Seed returns dramatically, making room for powerful support farms.

### Approval and future-pass discipline

- The **Germination formula**, per-Seed chances, and the two compatibility tables are **APPROVED first-pass numbers**, subject to subsequent playtesting/revision, not hard limits to prevent interesting combinations.
- Prioritize **pronounced, memorable effects over tiny differentials**; conduct a separate real **playtest and tester-feedback balancing pass after implementation**. Tester findings may justify toning down overpowered plants/fungi; the immediate goal is not perfection.
- Full continuous output curves, some ordinary temperature/Mycelial hazard penalties, and rounding/stacking of concurrent fungal Effects still require detailed implementation decisions. **Mandrakadabra's approved special lethal threshold is 4h continuous Bright (§70)**. The 31 approved first-pass Fungi and 13 Woodlands recipes are documented separately.

---

## §70 — Mandrakadabra transformation environment and lethal Bright vulnerability (APPROVED, 26 October 2026)

**Later approvals (§§71–72):** The full Woodlands recipe pass is now approved, including Mandrabra → Mandrakadabra's retained **Rushroom OR Siltgill** named contact for **12 hours** under **Damp, Bright**. **Mycelial on Mandrabra's hex is not a prerequisite.** Old language below describing this recipe or entire Woodlands family as pending is historical and superseded by §72.

**Current direct route (§§70–72):** Mandrabra transforms into Mandrakadabra after **12 uninterrupted hours of resolved Damp Moisture, Bright Illumination, and reach from either Rushroom OR Siltgill's actual emitted Influence zone**. The target Plant **does not need Mycelial on its hex**: a Mycelial-dependent Fungus may remain supported at the source and emit across other terrain. Transformation immediately creates a new Plant at 0% with its own fresh **4-hour Bright lethal exposure timer**. The original Mycelial-gated, Mycelial-retreat-triggered recipe is historical and was rejected.

**New innate Mandrakadabra vulnerability:** When Mandrakadabra occupies a hex whose **resolved Illumination is Bright**, it dies after **4 uninterrupted in-game hours of Bright**. The continuous lethal timer starts when the Mandrakadabra instance is created in Bright (through Transformation at 0% or from a planted Seed) or when an existing Mandrakadabra enters Bright. Moving the resolved Illumination away from Bright **before the four-hour threshold** clears the exposure timer. Returning to Bright begins a new full four-hour exposure; there is no historical cumulative damage bank. The timer does not inherit Mandrabra's prior Bright exposure on Transformation, consistent with §58. Normal event-order and death/Transformation tie rules still apply (§§60,64).

**Preserved farming identity:** **Lit, NOT Bright, remains Mandrakadabra's preferred Illumination**, together with the previously approved Damp/Temperate preference and its exceptionally high, narrow Leaf peak. Thus the intended puzzle is to transform Mandrabra under Bright and then reduce Illumination to Lit quickly enough to farm Mandrakadabra for its full multi-day lifecycle. This vulnerability is tied to the **resolved environmental state**, not receiving a particular fungal cultivation bonus or being at a lifecycle stage. The short Bright hazard applies to Mandrakadabra grown directly from **Mandrakadabra Seeds** as well as one obtained by Transformation.

**Approved rule boundaries:** The four-hour Bright threshold replaces—not supplements—the old special six-hour Mycelial timer. Ordinary Woodlands Mycelial hazards remain separate. Neither a Mycelial target hex nor retreat is a Mandrabra → Mandrakadabra prerequisite. Mandrakazam still supplies Mandrakadabra Seeds; the two Mandrabra outgoing recipes are mutually exclusive by **Bright versus Dim** (§71). All **13 Woodlands routes are approved first-pass**, with other Seed identities, numerical balance and shared event/death priority unaffected. The design is not implemented in gameplay.

---

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

---

## §72 — Clarification: Mycelial-dependent fungi are allowed as named contacts (APPROVED, 26 October 2026)

The user expressly corrected a mistaken inference in §71: **using a Mycelial-dependent Fungus as the named contact for a Plant Transformation does NOT require the target Plant's hex to be Mycelial**. Source habitat and recipient reach are separate. Rushroom or Siltgill may operate on Mycelial at their own hex and send one of their normal emitted Influences to a Mandrabra on a non-Mycelial hex. Under §68, environmental reach **or** cultivation reach counts as contact (after propagation and Blockers); the Plant does not need to receive a positive cultivation bonus. The source's Mycelial footprint and normal expansion/retreat may create a genuine **optional risk-management puzzle**: route/Block Mycelial, manage retreat, or act before Mandrabra's ordinary Mycelial lethal tolerance expires while keeping the named Source's emitted Influence reaching Mandrabra. Do **not** require Mandrabra itself to be Mycelial, or Mycelial retreat to trigger its Transformation.

**Finalized first-pass Mandrabra → Mandrakadabra recipe:** Maintain **resolved Damp Moisture, Bright Illumination, and named contact with Rushroom OR Siltgill continuously for 12 hours**. No Temperature state needs to be added as a separate recipe condition. Transformation occurs when the 12-hour conditions complete and creates fresh 0%-Growth Mandrakadabra, with **four hours of continuous Bright exposure lethal** and **Lit still its farming optimum** (§70). This is **mutually exclusive** with Mandrabra → Mandrakazam's Dim requirement. Once transformed, the player should alter Bright → Lit promptly to keep the high-Leaf Plant alive; Mycelial interference might need separate management but is not directly prescribed by the recipe. A Fungus can still need Mycelial **at its source**; the rule only disallows mandating Mycelial **on the Plant's own hex** for a Transformation. The proposed Glimmergill/Goldgill substitution from §71 is **withdrawn**, not approved.

**Status:** All **13 Woodlands Transformation recipes are approved first-pass**, completing Woodlands after Ingredients and Aquatic. Exposure hours and normal Mycelial survival thresholds remain playtestable; no biology/runtime code has been changed.
