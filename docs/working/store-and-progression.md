# Store and progression — agreed framework

> **WORKING DESIGN · AGREED FRAMEWORK, TASK ROSTER PENDING** · 29 October 2026. This document locks the progression and store rules agreed with the project owner. Specific missions, rewards, prices, availability milestones, UI details, and implementation are still to be designed. Do not treat this as an implemented feature.

Narrative direction: [Guild setting and task voice](../design/setting-and-task-voice.md) — the player is the newly hired guild botanist; a supportive, unfiltered instructor and offscreen guild requests give tasks their context. Task descriptions carry the comedy; objective text stays precise.

Related current rules: [V9 transformation recipes](../design/fungi/random-roster-v9.md), [Fungal roster](../design/fungi/random-roster-v8.md), [Seeds, Spores and harvesting](../design/systems/seeds-spores-and-harvesting.md), [Grimoire](../design/systems/cultivation-grimoire.md), [Inventory and staging](../design/systems/spatial-inventory-and-staging.md), and the [completed temporary Source-item phase](temporary-source-items.md).

## 1. Progression philosophy — agreed

- Introduce the game's complexity a little at a time. Begin with highly guided tasks, gradually remove recipe instructions, then let players experiment independently.
- **No generic XP or character-level system.** Advancement is evidenced by Plants discovered, transformations accomplished, families unlocked, main tasks completed, garden space expanded, and production goals achieved.
- Keep **discovery** and **production** as complementary progression paths: discover how to make Plants, then learn to grow and harvest them reliably and in combinations.
- Maintain main tasks as clear long-term goals and smaller optional tasks as a continuing source of Gold, Seeds, Spores, or other useful rewards.
- The Grimoire remains the record of observed discoveries; task instructions can give explicit beginner guidance without globally revealing unobserved recipes.

## 2. Opening and guided onboarding — agreed direction

1. **Start in one family**, rather than granting all six Base Plants and the full Fungus roster. The agreed introductory choice is the **Ingredients** family, starting with Beanstalk.
2. Give approximately **20–50 Beanstalk Seeds** (30–40 is a sensible first-pass target) and only the initial Spores needed for the first simple transformation, with enough attempts to avoid punishing early germination failure. Do not grant the entire Fungus catalog at the outset.
3. **First task: a fully guided transformation.** Show the player how to drag Seeds out of inventory, plant the relevant Fungus so its contact reaches the Plant, and produce/maintain the resolved environmental Conditions required for transformation. The player should understand the relationship between position, Fungus reach, environmental effects, and transformation.
4. **Immediate follow-up: A Thirsty Carrot.** After the first transformation, gift Dewmender Spores and teach the player to change their new Carrot's Dry soil to Damp so it can grow more comfortably. This is a small care objective, separate from the main discovery challenge.
5. **Next major task: discover approximately two more transformations.** Award access to the small Spore set required, but do not reveal full recipes. With only about three or four Fungi available, experimentation should be tractable. Hints may be provided without giving the exact recipe.
6. **Following major task: produce and deliver Leaves from a specified Plant.** This introduces growth, harvesting and inventory/resource management. Continue alternating discovery and production objectives.
7. Progressively remove step-by-step instructions; later tasks identify desired outcomes rather than prescribing every action.

**Agreed first transformation:** Beanstalk → Carrot needs **Dry, Temperate, Dim** and living **Prismorel** contact for **10 simulated hours**. Ordinary new garden terrain starts Dry, Temperate, Dark; Prismorel's +1 Illumination makes it Dim. **Do not create a special tutorial terrain patch or give temporary Source items to solve this recipe.** The game recipe was updated to support this introduction. The detailed task UI, suggested 36 Beanstalk Seeds / 8 Prismorel Spores, and exact reward amounts still require final task-level confirmation.

**Agreed care lesson — A Thirsty Carrot:** After transformation, the new Carrot is still on Dry ground, so offer Dewmender Spores immediately and guide the player to establish Wetting contact and reach Damp. **Carrot alone** has an extended continuous **Dry death threshold of 240 garden hours = 20 real minutes** at the live pace of five seconds per garden hour. Moisture recovery resets its Dry exposure clock; its other hazard timers remain unchanged. This extended grace lets a beginner experiment without losing their first Carrot in only a few minutes. The care objective is **designed but not yet implemented** as a quest.

**Follow-on discovery candidates, not yet finalized tasks:** Beanstalk → Rice (Flooded, Dewmender contact) and Beanstalk → Potato (Damp, Cold, Rilllace contact). Remember that Potato is now a terminal Ingredient; Beanstalk is the Base Plant.

## 3. Family unlock structure — agreed

- Complete the introductory progression in the first family before unlocking the **second family** through a major milestone.
- After the second family unlocks, offer **four independent major projects**, each unlocking one of the four remaining families. Players may complete these projects **in any order**.
- Each project must be completable with resources and mechanics available **before** its own target family unlocks. No circular unlock requirements.
- A newly unlocked family becomes **purchasable in the store** and grants an immediate **starter bundle**: approximately **20–30 Seeds of that family's Base Plant**, plus a small amount of useful Spores where appropriate. Additional Seeds/Spores can be purchased later. Exact contents require task-level balancing.
- Later main tasks should increasingly require Leaf deliveries from multiple named Plant species, including mixes such as 10 from Plant A plus 20 from Plant B, and eventually lists of approximately 5–10 distinct Plants. **Challenge should emphasize variety and coordination, not simply inflated Leaf quantities.**
- Multiple independent goals may be available together once the initial linear tutorial is over. Smaller tasks continue alongside main projects and can award Gold, Seeds, Spores, and other materials.

## 4. Task semantics — agreed

### Discovery tasks
- Complete when the specified transformation or discovery has genuinely been achieved. Use real simulation outcomes and the existing Grimoire/discovery system where appropriate; simply possessing a Seed should not be mistaken for witnessing a transformation.
- The first guided task may reveal its steps and recipe conditions; subsequent discovery tasks progressively reduce that guidance.

### Leaf delivery tasks
- **Deliver means consume.** A task asking for 20 Carrot Leaves requires the player to have and hand over 20 Carrot Leaves; claiming/delivering removes them from inventory.
- For a multi-species delivery, require the **full stated quantities together** for a single explicit delivery. Do not automatically consume Leaves merely because the player harvested enough. Show whether a task can currently be delivered.
- Players must be able to choose between selling Leaves for Gold and reserving them for task delivery.
- Exact quantities and rewards remain balancing decisions when authoring each task.

## 5. Shop and Gold economy — agreed

- **Gold coins** are the currency used for store purchases.
- **Only Leaves can be sold.** Players cannot sell Seeds or Spores (nor other possessions, absent a future explicit design change). Leaves are earned through cultivation and harvesting and retain their existing species-specific identities.
- **Beanstalk Seeds are always free in the store.** This is the permanent economic recovery mechanism: grow Beanstalks without needing purchased resources, harvest Leaves, sell them for Gold, and use the Gold to replace Seeds or Spores needed for further progress. The resulting renewable Gold loop is accepted: it still costs cultivation time and available garden hexes.
- The store sells **hex-space expansions, Blockers, Seeds, Spores, and temporary Source items**.
- Product availability grows with progression. The previously agreed **26 temporary Source items in seven groups** should be unlocked progressively rather than immediately.
- **Temporary Source items should be relatively expensive** so they function as emergency tools/conveniences rather than replacing the central challenge of combining Fungi. Exact prices and item unlock triggers are not yet decided.
- Seed/Spore access through the store must support recovery after early mistakes or exhausted supplies; players should not become permanently unable to make progress.
- Exact per-Leaf sale values, purchase prices, stock limits (if any), and Gold reward amounts remain open. It is reasonable to test whether more advanced Plants should produce more economically valuable Leaves, but this is **not yet a locked price table**.
- Until the store is implemented, the existing **developer-only Source-item dispenser** remains a testing mechanism, not normal player acquisition.

## 6. Inventory cleanup — agreed

- Add a way to **discard unwanted inventory contents** without selling them. This is distinct from selling Leaves for Gold.
- Discarding is permanent and should give explicit confirmation for meaningful losses. The final controls and stack-quantity interaction are UI design details.

## 7. Taskboard and pinned objectives — agreed direction

- **Opening the Taskboard does not automatically pause the simulation.** Players choose when to pause using the manual time controls below.
- Give players a **large, readable Taskboard** for planning progression, with clear separation between main objectives, smaller/optional tasks, and completed work. It should explain each available task's purpose, requirements, progress, rewards, and appropriately revealed instructions or hints.
- **Do not disclose hidden Transformation recipes** in ordinary task descriptions. The fully guided first transformation is an intentional exception; later discovery quests use hints rather than exact formulas.
- Each available task can be **pinned or unpinned** by the player. A small **Objectives** tracker in the **top-right** of ordinary play displays only the pinned tasks, showing a short title and current step or compact progress count. Selecting a pinned objective opens its full Taskboard entry.
- **The full board and the compact tracker have distinct roles:** the board is for explanation, rewards, claiming and Leaf delivery; the tracker is for at-a-glance awareness during gardening. Pinning does not activate or gate task progress.
- Introduce the first tutorial task already pinned, so the player immediately knows what to do. Later tasks can be pinned or unpinned according to player preference.
- For Leaf deliveries, the tracker may show that the player has enough resources, but **submission remains an explicit action on the Taskboard** and consumes the required Leaves only when confirmed.
- Keep pins, task states, discovery history and deliveries persistent across saves. The interface must protect the playable hex grid and work on smaller screens.

**Presentation proposals, not yet locked:** a large Taskboard overlay or journal-style page; Main / Optional / Completed sections; approximately two or three visible pins; and a small collapsible Objectives panel above the existing right-hand Inspector in today's three-column UI. The final position, pin limit, styling, and mobile behavior require visual playtesting.

## 8. Manual simulation controls — agreed

- Provide permanently accessible **Pause, 0.5×, 1×, and 2×** controls. **0.5× means half speed**, not 0.5%.
- These controls affect the entire time-driven simulation: germination, Plant/Fungus growth and lifecycle timers, Transformations, hazard/death exposure, Mycelial timing, and temporary Source-item lifetimes.
- Pause stops simulated time. Players can still read menus, plan, and rearrange the garden; direct changes recalculate the current state without advancing biological timers.
- Neither the full Taskboard nor the compact pinned-objectives tracker automatically pauses the garden or changes the selected speed.
- The existing clock ratio of five real seconds per garden hour is the **1× baseline**. The agreed Carrot Dry grace is therefore 20 real minutes at 1×; slower/faster play changes the actual waiting time while preserving its 240-garden-hour threshold.
- See [Simulation timing and event order](../design/systems/simulation-and-time.md) for the approved timing specification. The controls remain **design-only**.

## 9. Remaining design work

The following choices do **not** block beginning to write the task roster; resolve them as the relevant tasks or store screens are specified:

1. **Exact introductory chain:** finalize tutorial Seed/Spore amounts, steps, rewards, and the two follow-up transformations. The first Beanstalk → Carrot recipe and ordinary starting terrain are already agreed above. Verify that each goal is physically achievable with the current V9 recipes and V8 Fungus propagation.
2. **Second-family identity and unlock project content:** decide which family is introduced second, then design four genuinely independent family-unlock projects and their starter bundles.
3. **Task recognition and availability:** whether discoveries made before an objective appears count retroactively, which tasks are parallel versus sequential, and whether small optional jobs repeat.
4. **Reward and price balance:** amounts of Gold, Seeds and Spores; Leaf sale values; costs of Seeds, Spores, Blockers, hex expansions, and expensive Source items; unlock timing and any availability limits.
5. **Player UX and persistence:** detailed Taskboard layout, pinned-objective limit and responsive behavior, hint visibility, explicit delivery/claim actions, store interface, safe handling of full inventory when awarding bundles, and saved task state.
6. **Fairness checks:** ensure free Beanstalk Seeds plus ordinary farming can always recover Gold, and no quest requires a Fungus, space, or resource that is locked behind its own reward.

**Implementation status:** Taskboard, quests, store, progression, manual time controls, and guild narrative content remain design-only. The agreed introductory Beanstalk → Carrot rule and Carrot Dry grace are already implemented separately, as is the completed temporary Source-item phase.

---

[Working index](README.md) · [Current implementation status](../implementation-status.md)
