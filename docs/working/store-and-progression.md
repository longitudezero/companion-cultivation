# Store and progression — agreed framework

> **WORKING DESIGN · AGREED FRAMEWORK, TASK ROSTER PENDING** · 29 October 2026. This document locks the progression and store rules agreed with the project owner. Specific missions, rewards, prices, availability milestones, UI details, and implementation are still to be designed. Do not treat this as an implemented feature.

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
4. **Second task: discover approximately two more transformations.** Award access to the small Spore set required, but do not reveal full recipes. With only about three or four Fungi available, experimentation should be tractable. Hints may be provided without giving the exact recipe.
5. **Third task: produce and deliver Leaves from a specified Plant.** This introduces growth, harvesting and inventory/resource management. Continue alternating discovery and production objectives.
6. Progressively remove step-by-step instructions; later tasks identify desired outcomes rather than prescribing every action.

**Candidate first task, not yet a finalized mission:** Beanstalk → Carrot using the current V9 recipe: Damp, Temperate, Lit plus living Prismorel contact for 10 simulated hours. Select the exact opening task, starting garden conditions, Spore quantities and hints only after checking practical feasibility and early-game pacing.

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

## 7. Remaining design work

The following choices do **not** block beginning to write the task roster; resolve them as the relevant tasks or store screens are specified:

1. **Exact introductory chain:** confirm the first recipe, starter hex/environment configuration, tutorial Spore amounts, and the two follow-up transformations. Verify that each goal is physically achievable with the current V9 recipes and V8 Fungus propagation.
2. **Second-family identity and unlock project content:** decide which family is introduced second, then design four genuinely independent family-unlock projects and their starter bundles.
3. **Task recognition and availability:** whether discoveries made before an objective appears count retroactively, which tasks are parallel versus sequential, and whether small optional jobs repeat.
4. **Reward and price balance:** amounts of Gold, Seeds and Spores; Leaf sale values; costs of Seeds, Spores, Blockers, hex expansions, and expensive Source items; unlock timing and any availability limits.
5. **Player UX and persistence:** task tracker, hints, explicit delivery/claim actions, store interface, safe handling of full inventory when awarding bundles, and saved task state.
6. **Fairness checks:** ensure free Beanstalk Seeds plus ordinary farming can always recover Gold, and no quest requires a Fungus, space, or resource that is locked behind its own reward.

**Implementation status:** design discussion only. Existing game mechanics and the completed temporary Source-item phase remain unchanged.

---

[Working index](README.md) · [Current implementation status](../implementation-status.md)
