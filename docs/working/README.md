# Working design and brainstorming

> **WORKING DESIGN AREA.** Each document states which decisions are agreed, which details remain open, and whether any part has been implemented. Do not treat open design questions as approved gameplay.

## Current documents

- [Garden interface redesign](garden-interface-design.md) — **top-down layout and interface refinements implemented**. Records fixed inspector/card sizing, temporary in-garden notices, fast non-interactive hover cards, resizable inventory, pan/zoom with middle-button dragging, manual speed controls, germination bars and the Transformation clue. Keyboard pickup controls are deferred; tilt remains a possible later upgrade.
- [Task organization, store and progression](task-organization.md) — **first two main tasks, one side delivery and Taskboard implemented; basic shop implemented; later progression pending**. Defines M/S IDs, decimal Order, record fields, onboarding, capacity rewards, family unlocks, deliveries, the shop, Taskboard/pins, and time controls.
- [Guild Shop](shop-first-pass.md) — **basic Buy/Sell implemented**. Free Beanstalk Seeds, unlocked Spores at 2 Gold each, Leaf sales at 1 Gold each, shared saved wallet and transaction receipts. Expansion products and the emergency recovery balance are deferred.
- [Main tasks](main-tasks.md) — **four opening records; first two implemented, later tasks and balance playtesting pending**. My First Transformation, A Thirsty Carrot, the Potato/Onion discovery challenge, and Leaves, Please (8 Carrot Leaves). Task 3 has no retroactive transformation credit; Task 4 explains harvest timing and rewards Emberbolete. Dialogue stays in each task record.
- [Side tasks](side-tasks.md) — **one basic Carrot Leaf delivery implemented**. Five Leaves for a provisional 10 Gold; uses the same record structure without Order.
- [Temporary player Source items](temporary-source-items.md) — **completed and player-tested**. Records the 26-item roster and interactions implemented on `main`.

The approved [Guild setting and task voice](../design/setting-and-task-voice.md) lives in the active design area and guides future tutorial, main-task, and side-task writing. Individual task entries live in the main/side rosters above; their Status fields distinguish agreed content from open details.

The completed V0–V7 fungal experiments and their notebook were moved to the [historical archive](../historical-archive/fungal-redesign/README.md) after V8/V9 became the current design.

For future proposals:

1. Give the document a topic and date; mark its status **WORKING · NOT APPROVED**.
2. Link to the [current design rule](../design/README.md) it proposes to change.
3. Record explicitly what is proposed, what remains undecided, and what was approved.
4. Upon acceptance, update the relevant active design source, and preserve the superseded proposal in [historical-archive](../historical-archive/README.md).
