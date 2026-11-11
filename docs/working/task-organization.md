# Task organization, store and progression

> **WORKING DESIGN · AGREED FRAMEWORK, TASK ROSTER IN DEVELOPMENT** · 29 October 2026. This document defines task fields and shared progression/store rules agreed with the project owner. See the [task progression plan](task-progression-plan.md) for the first playable main line and playtest values.

## Document organization

| Document | Owns |
| --- | --- |
| [Main tasks](main-tasks.md) | Main-task records, stable IDs, authored order, descriptions, objectives, completion, and rewards/unlocks |
| [Side tasks](side-tasks.md) | Side-task records using the same fields, without an Order field |
| [Task progression plan](task-progression-plan.md) | Practice tasks before the family unlocks, Mycelial lessons, and later Leaf production targets |
| **This document** | Field meanings, ID/order conventions, shared task behavior, progression, capacity rewards, and store rules |

The [guild setting and task voice](../design/setting-and-task-voice.md) remains the reference for setting and writing tone. Keep individual task details in their roster files rather than duplicating them here.

## Task record fields

| Field | Meaning |
| --- | --- |
| **ID** | Permanent unique reference such as `M-3KJ45T` or `S-3KJ45T`. **M** means main task; **S** means side task. The suffix is an opaque identifier, not its order or a gameplay code. Keep IDs stable when changing names or moving tasks. |
| **Order** | Main tasks only. Numeric position in the authored list: 1, 2, 3, etc. Decimal values allow insertion, e.g. 5, **5.1**, 6. |
| **Name** | Player-facing task title. |
| **Status** | Which parts are agreed, which details remain proposed/TBD, and whether the task is implemented. Design approval and implementation are separate. |
| **Prerequisites** | Explicit conditions that make the task available: a completed task ID, a family unlock, or another stated milestone. |
| **Speaker** | Who delivers the task text: the Instructor or the requesting guild member. Completion dialogue uses this speaker unless explicitly labeled otherwise. |
| **Description** | Opening player-facing dialogue in the Speaker's voice. This carries context and comedy and stays inside the task's record. |
| **Completion dialogue** | The Speaker's response when the player completes the task. Keep this in the same task record; write **None** when no response is needed. |
| **Objectives** | Short, clear player-facing steps or targets, including species and quantities where appropriate. |
| **Completion** | The actual event/state or explicit Leaf delivery that satisfies the task. Define success independently of the instructional wording. |
| **Unlocks** | Everything awarded or enabled: Gold, Seeds, Spores, inventory slots, garden rows/columns, new tasks, family/store access, etc. Give explicit amounts or write **TBD**. This field includes physical rewards as well as access unlocks. |
| **Design notes** | Optional non-player-facing clarifications, balance questions, proposed quantities, compact tracker text, and relevant existing mechanics. |

### IDs and ordering

- IDs are permanent references. Use them in prerequisites and saved task state; do not derive them from the task's mutable title or Order. Never reuse an existing task ID for a different task.
- **Order is an editing/sorting tool, not an implicit prerequisite chain.** A task only depends on the prerequisites actually written in its record. This preserves the later four independent family-unlock projects.
- Sort Order numerically: 5 < 5.1 < 5.2 < 6. Decimal values are not hierarchical labels; **5.10 and 5.1 mean the same number** and must not identify different positions. A value such as 5.05 can be used between 5 and 5.1.
- Side tasks have **no Order field**. Their prerequisites determine availability; final Taskboard sorting/filtering is a UI detail.
- The four current main tasks are **M-3KJ45T, Order 1**, **M-8NQ2VC, Order 2**, **M-6PT9RX, Order 3**, and **M-4HV7LK, Order 4**. The S-prefixed ID above is only a format example, not an authored side task.

### Reusable record template

```text
ID: M-XXXXXX
Order: 3
Name:
Status:
Prerequisites:
Speaker:
Description:

Objectives:
1.

Completion:

Unlocks:
- 

Completion dialogue:

Design notes:
```

For a side task, use an `S-` ID and omit Order. Name its requester in Speaker. Keep Speaker, Description, and Completion dialogue in the main/side task record; no separate dialogue file is needed for this format. A proposed example or a TBD reward does not become approved balance merely by being written into a record.

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
5. **Third task: discover two more transformations.** A Thirsty Carrot rewards two new Fungus species. The first-pass choice is **Rilllace and Droughtcap**, enabling **Potato and Onion** with the player's existing Dewmender. Give a loose clue for Potato and the instructor's “Well, I'm sure you can figure it out” for Onion. Do not reveal either full recipe. The player now has four Fungus species to experiment with.
6. **Fourth task: deliver 8 Carrot Leaves.** Teach growth, Inspector harvest yields, destructive harvesting, and explicit delivery. Warn that harvesting too late leaves the player with Seeds instead of Leaves. The reward is **8 Emberbolete Spores** and permanent Emberbolete stock, opening the Pumpkin recipe.
7. **Next milestone direction:** use the Pumpkin discovery to increase garden pressure, then reward **+1 row**. The full Task 5 record still needs a chat draft/review and layout playtesting. Continue alternating discovery and production objectives.
8. Progressively remove step-by-step instructions; later tasks identify desired outcomes rather than prescribing every action.

**Opening task records:** [My First Transformation — M-3KJ45T](main-tasks.md#m-3kj45t), followed immediately by [A Thirsty Carrot — M-8NQ2VC](main-tasks.md#m-8nq2vc), then [Well, I'm Sure You Can Figure It Out — M-6PT9RX](main-tasks.md#m-6pt9rx), and [Leaves, Please — M-4HV7LK](main-tasks.md#m-4hv7lk). These records own the first recipe, care lesson, Spore handoffs, discovery targets, and reward amounts.

**First-pass early rewards.** Task 1 grants **8 Gold and 8 Dewmender Spores**. Task 2 grants **8 Rilllace Spores and 8 Droughtcap Spores**. Task 3 advances the chain. Task 4 grants **8 Emberbolete Spores**. Claiming a Spore reward opens permanent Shop stock. Task 5 grants the first garden row.

## 3. Family unlock structure — agreed

- Complete the introductory progression in the first family before unlocking the **second family** through a major milestone.
- After the second family unlocks, offer **four independent major projects**, each unlocking one of the four remaining families. Players may complete these projects **in any order**.
- Each project must be completable with resources and mechanics available **before** its own target family unlocks. No circular unlock requirements.
- A newly unlocked family becomes **purchasable in the store** and grants an immediate **starter bundle**: approximately **20–30 Seeds of that family's Base Plant**, plus a small amount of useful Spores where appropriate. Additional Seeds/Spores can be purchased later. Exact contents require task-level balancing.
- Later main tasks should increasingly require Leaf deliveries from multiple named Plant species, eventually including lists of approximately 5–10 distinct Plants. Increase quantities substantially after the four family unlocks so cultivation choices and Mycelial Leaf Yield boosts matter. Use the [task progression plan](task-progression-plan.md#leaf-production-after-the-family-unlocks) to balance quantities against harvest time.
- Multiple independent goals may be available together once the initial linear tutorial is over. Smaller tasks continue alongside main projects and can award Gold, Seeds, Spores, and other materials.

## 4. Task semantics — agreed

### Discovery tasks
- Complete when the specified transformation or discovery has genuinely been achieved. Use real simulation outcomes and the existing Grimoire/discovery system where appropriate; simply possessing a Seed should not be mistaken for witnessing a transformation.
- The first guided task may reveal its steps and recipe conditions; subsequent discovery tasks progressively reduce that guidance.
- **Task 3 counts only transformations performed after it becomes available.** Earlier Grimoire entries remain intact but do not satisfy this task. Recognition policies for other discovery tasks must be stated when those records are designed.

### Leaf delivery tasks
- **Deliver means consume.** A task asking for 20 Carrot Leaves requires the player to have and hand over 20 Carrot Leaves; claiming/delivering removes them from inventory.
- For a multi-species delivery, require the **full stated quantities together** for a single explicit delivery. Do not automatically consume Leaves merely because the player harvested enough. Show whether a task can currently be delivered.
- Players must be able to choose between selling Leaves for Gold and reserving them for task delivery.
- Exact quantities and rewards remain balancing decisions when authoring each task.
- **Task 4 accepts any 8 Carrot Leaves currently held**, including Leaves harvested before the task appeared. Its completion is the explicit resource delivery, not a new-harvest counter.

## 5. Shop and Gold economy — agreed

- **Gold coins** are the currency used for store purchases.
- **Only Leaves can be sold.** Players cannot sell Seeds or Spores (nor other possessions, absent a future explicit design change). Leaves are earned through cultivation and harvesting and retain their existing species-specific identities.
- **Beanstalk Seeds are always free in the store.** This is the permanent economic recovery mechanism: grow Beanstalks without needing purchased resources, harvest Leaves, sell them for Gold, and use the Gold to replace Seeds or Spores needed for further progress. The resulting renewable Gold loop is accepted as a design goal: it still costs cultivation time and available garden hexes. Beanstalk has 240 garden hours of continuous Dry tolerance so an untreated starter plot can produce Leaves before the crop dies.
- The store sells **hex-space expansions, inventory expansions, Blockers, Seeds, Spores, and temporary Source items**. See [garden and Inventory capacity](#garden-and-inventory-capacity--agreed) for the first land and Inventory upgrade unlocks.
- Claiming the first task reward for a Blocker design unlocks that design's **Edge and Hex** forms in the Shop. Prices and the task rewards for individual designs are part of the reward review.
- Product availability grows with progression. The previously agreed **26 temporary Source items in seven groups** should be unlocked progressively rather than immediately.
- **Temporary Source items should be relatively expensive** so they function as emergency tools/conveniences rather than replacing the central challenge of combining Fungi. Exact prices and item unlock triggers are not yet decided.
- Seed/Spore access through the store must support recovery after early mistakes or exhausted supplies; players should not become permanently unable to make progress.
- **Playtest prices.** Beanstalk Seeds are free. Other unlocked Seeds cost 1 Gold each, Spores cost 2, and named Leaves sell for 1. Blockers cost 8. Temporary Source items start at 12 Gold and increase by 4 per group. Land costs 3 Gold per added hex, and a ten-slot pack costs 20 Gold.

## Garden and inventory capacity — agreed

- A new progression garden starts at **4 columns × 4 rows = 16 hexes**.
- Claiming **Task 5, A Pumpkin Problem**, awards **+1 garden row** (4 columns × 5 rows) and unlocks the **+1 Row** and **+1 Column** Shop products. Further land expansion comes from the Shop.
- A row adds one hex per current column. A column adds one hex per current row. Added land preserves the existing planted layout. The Shop shows the added hex count, resulting dimensions, and total Gold price. Price either product by the number of hexes added. The playtest rate is 3 Gold per hex.
- Progression gardens can grow to **18 columns × 9 rows**, or **162 hexes**. Row purchases are available up to 9 rows and column purchases up to 18 columns, with each axis checked independently.
- The exact side/edge placement of new land remains a presentation/implementation detail. No player-selected edge mechanic has been approved.
- A new progression Inventory starts at **20 slots**. Claiming **Task 7, A Little Rain, A Lot of Sunshine**, awards **+10 slots** and unlocks **+10-slot packs** in the Shop. Further capacity comes from those packs. The first pass caps Inventory at 200 slots and prices each pack at 20 Gold.
- A slot continues to hold a stack/identity, not a single Seed, Spore, or Leaf. Existing quantity and item-identity rules remain applicable, including individually tracked temporary Source items.
- Capacity rewards and starter bundles must be coordinated so new task resources can be accepted. Award capacity before accompanying items when needed, and keep unaccepted rewards available; do not lose resources on a full inventory.
- Earlier saves without an explicit Inventory capacity retain their original 200 slots. New progression saves show the unlocked capacity and available bags.
- **Tasks 1–4 award no new hexes or inventory slots.** Place capacity rewards later as the chain develops; the earlier suggestion of expanding after A Thirsty Carrot is no longer part of this opening.

## 6. Inventory cleanup — agreed

- Select an Inventory stack and choose **Discard** to remove it after confirmation. Leaves can also be sold through the Shop.

## 7. Taskboard and pinned objectives — agreed direction

- **Opening the Taskboard does not automatically pause the simulation.** Players choose when to pause using the manual time controls below.
- Give players a **large, readable Taskboard** for planning progression, with clear separation between main objectives, smaller/optional tasks, and completed work. It should explain each available task's purpose, requirements, progress, rewards, and appropriately revealed instructions or hints.
- **Do not disclose hidden Transformation recipes** in ordinary task descriptions. The fully guided first transformation is an intentional exception; later discovery quests use hints rather than exact formulas.
- Each available task can be **pinned or unpinned** by the player. A small **Objectives** tracker in the **top-right** of ordinary play displays only the pinned tasks, showing a short title and current step or compact progress count. Selecting a pinned objective opens its full Taskboard entry.
- **The full board and the compact tracker have distinct roles:** the board is for explanation, rewards, claiming and Leaf delivery; the tracker is for at-a-glance awareness during gardening. Pinning does not activate or gate task progress.
- Introduce the first tutorial task already pinned, so the player immediately knows what to do. Later tasks can be pinned or unpinned according to player preference.
- For Leaf deliveries, the tracker may show that the player has enough resources, but **submission remains an explicit action on the Taskboard** and consumes the required Leaves only when confirmed.
- Keep pins, task states, discovery history and deliveries persistent across saves. The interface must protect the playable hex grid and work on smaller screens.

**Current presentation:** a Taskboard overlay with stacked collapsible Main / Side / Completed sections and up to three pins. All pinned tasks appear in a collapsible list at the garden’s upper right, over a fading half-opacity shadow. The Objectives title toggles collapse; task entries and the header icon open the board. Speed and zoom controls occupy the garden’s upper left. Narrow screens stack the two HUD groups.

## 8. Manual simulation controls — agreed

- Provide permanently accessible **Pause, 0.5×, 1×, and 2×** controls. **0.5× means half speed**, not 0.5%.
- These controls affect the entire time-driven simulation: germination, Plant/Fungus growth and lifecycle timers, Transformations, hazard/death exposure, Mycelial timing, and temporary Source-item lifetimes.
- Pause stops simulated time. Players can still read menus, plan, and rearrange the garden; direct changes recalculate the current state without advancing biological timers.
- Neither the full Taskboard nor the compact pinned-objectives tracker automatically pauses the garden or changes the selected speed.
- The existing clock ratio of five real seconds per garden hour is the **1× baseline**. The agreed Carrot Dry grace is therefore 20 real minutes at 1×; slower/faster play changes the actual waiting time while preserving its 240-garden-hour threshold.
- See [Simulation timing and event order](../design/systems/simulation-and-time.md) for the approved timing specification. The controls are implemented in the garden HUD and Taskboard header.

## 9. Remaining design work

The following choices do **not** block beginning to write the task roster; resolve them as the relevant tasks or store screens are specified:

1. **Exact introductory chain:** refine/playtest the four opening records in [Main tasks](main-tasks.md), check harvest timing and the initial Gold/Spore amounts, finalize starting Seed/Spore quantities, then draft the Pumpkin task and first row reward. The first Beanstalk → Carrot recipe and ordinary starting terrain are already agreed. Verify that each goal is physically achievable with the current V9 recipes and V8 Fungus propagation.
2. **Second-family identity and unlock project content:** decide which family is introduced second, then design four genuinely independent family-unlock projects and their starter bundles.
3. **Task recognition and availability:** Task 3's lack of retroactive credit and Task 4's acceptance of already-held Leaves are decided. Define recognition for other discovery tasks, which later tasks are parallel versus sequential, and whether small optional jobs repeat.
4. **Reward and price balance:** amounts of Gold, Seeds and Spores; Leaf sale values; costs of Seeds, Spores, Blockers, hex expansions, 10-slot inventory packs, and expensive Source items; unlock timing and any availability limits.
5. **Player UX and persistence:** detailed Taskboard layout, pinned-objective limit and responsive behavior, hint visibility, explicit delivery/claim actions, store interface, safe handling of full inventory when awarding bundles, and saved task state.
6. **Fairness checks:** ensure free Beanstalk Seeds plus ordinary farming can always recover Gold, and no quest requires a Fungus, space, or resource that is locked behind its own reward.

**Implementation status.** The full main-task roster and its Shop unlocks are playable on the progression branch. The [progression plan](task-progression-plan.md) tracks verification and balance playtesting.

---

[Working index](README.md) · [Current implementation status](../implementation-status.md)


## Taskboard and rewards

Fulfilling objectives marks the task ready. Claim the task to receive its bundle and unlocks together. Delivery tasks consume the listed quantities at claim. Falling below a delivery quantity revokes readiness. Fresh progression games start with a 4 × 4 garden, 20 Inventory slots, 36 Beanstalk Seeds, and 8 Prismorel Spores.

The icon beside the Grimoire opens the overlay. Stacked collapsible Main, Side and Completed groups, pin/unpin controls, a collapsible Objectives tracker in the garden’s upper-right corner, and a persistent Gold balance cover the basic flow. Up to three tasks can be pinned; the first starts pinned. If it remains pinned when claimed, its pin transfers to the care task; unpinning is respected. The board retains the selected simulation speed and exposes the same clock controls. Opening/closing it never pauses automatically.

An optional versioned tasks field persists readiness, milestones, claimed IDs, pins, tracker collapse and Gold in browser saves and .ccsave backups. Legacy saves without it remain compatible. Reward bundles are atomic: insufficient inventory space leaves the ready task, Gold and unlock untouched. A real transformation event is required for Task 1; Care requires actual Dewmender Wetting reaching a living Carrot on Damp, independently of its cultivation footprint.

Successful harvests show an itemized four-second receipt at the garden viewport's lower-right edge, above the staging rail beside the inventory. Counts come from actual inventory changes, preserving species-specific Leaves/Seeds, Spores and trophies. Quick harvests combine within the same receipt. It does not intercept input, reserve a permanent row, or change the clock.
