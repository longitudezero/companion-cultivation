# Player Blockers

**Approved catalogue and filter rules · 11 November 2026.** Implemented on the progression branch with developer test stock.

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

Task **14.2** awards **Root Barriers**, which the player can use in [Contain the Spread](task-progression-plan.md#mycelial-ground). Claiming the reward unlocks both Root Barrier forms in the Shop. Apply the same rule to other designs when a task first rewards them. Playtest the four Edge Root Barriers from Task 14.2 in a layout where they close the paths toward a crop while the colony stays active. Claiming Task 14.3 awards two more. Final quantities, prices, and reward tasks for the remaining designs belong to the main-task reward and Shop balance review.

## Implementation checklist

- [x] Add fixed filters for all nine designs in both forms. Environmental filters match properties, mode filters match cultivation, and Mycelial filters match spread and support. Check both forms with alternate routes and unaffected effects.
- [x] Add reusable Inventory stacks per design and form. Verify grants, placement, pickup, full-inventory handling, save/load, and protection against losing placed pieces during plot resizing.
- [x] Highlight valid edge and hex targets when holding or dragging a piece. Show its filters in the Inventory tooltip and placement guidance, and provide pickup in the normal Inspector.
- [x] Add all 18 forms to the developer dispenser for playtesting. Task rewards and Shop availability follow their progression designs.
- [x] Verify that the Root Barrier can stop a frontier or sever a supported branch, and that removing it restores the crossing.

The full test suite and production build passed. The packaged game passed DOM checks for grants, selection, placement, pickup and autosave reload. Native browser hit-testing and visual review are pending. The progression test verifies the Task 14.2 reward, the containment objective, and Task 14.3’s place in the main line.
