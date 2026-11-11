# Player Blockers

**Approved catalogue and filter rules · 11 November 2026.** Planned for player items in Inventory and the garden.

## Catalogue

Each design has an **Edge** form and a **Hex** form with the same fixed filters.

| Blocker | Stops |
| --- | --- |
| **Root Barrier** | Mycelial spread and support |
| **Windbreak** | Temperature and Airborne cultivation |
| **Water Gate** | Waterborne cultivation |
| **Garden Screen** | Illumination and Moisture |
| **Stone Wall** | All environmental effects, cultivation effects, and Mycelial spread and support |
| **Insulating Panel** | Temperature |
| **Shade Panel** | Illumination |
| **Pond Liner** | Moisture and Waterborne cultivation |
| **Climate Divider** | Moisture, Temperature, and Illumination |

## Filtering and placement

- A Blocker stops an effect when **any** of its filters matches. Show the exact filters on its tooltip and placement preview.
- **Moisture**, **Temperature**, and **Illumination** match both directions of change for that environmental property, including its adjacency effects. Use the existing ranges and routes to determine which crossings an effect attempts.
- **Airborne** and **Waterborne** match the delivery mode of fungal cultivation effects. For example, a Windbreak stops warming, cooling, and Airborne cultivation. A Climate Divider passes cultivation in both modes.
- **Mycelial** matches colony spread and support. A branch that loses every support path retreats over time according to the [Mycelial Blocker rules](../design/systems/influences-and-responses.md).
- An **Edge** Blocker occupies one shared border and stops matching crossings in both directions. A **Hex** Blocker occupies an empty tile and stops matching propagation through the tile and adjacency across its sides. Both follow the [garden occupancy rules](../design/systems/environment.md). Effects can reach the far side by an open route when their propagation permits it.
- Blockers are reusable. Placement highlights the target edge or hex. Picking up the Blocker returns it to Inventory so the player can try another layout.

## First reward and playtest

Task **14.2** awards **Root Barriers**, which the player can use in [Contain the spread](task-progression-plan.md#mycelial-ground). Playtest three Edge Root Barriers as the starter bundle. Check a layout where they close the paths toward a crop while the colony stays active on the other side. Final quantity, prices, and availability of the remaining designs belong to the main-task reward and Shop balance review.

## Verification when implemented

- [ ] Check all nine filter sets in both forms, including alternate routes and unaffected effects.
- [ ] Verify that a property filter matches its environmental effect and adjacency, and a cultivation mode filter matches cultivation only.
- [ ] Verify that the Root Barrier can stop a frontier or sever a supported branch, and that removing the piece restores the crossing.
- [ ] Check placement, pickup, and the Task 14.2 reward with the normal player controls.
