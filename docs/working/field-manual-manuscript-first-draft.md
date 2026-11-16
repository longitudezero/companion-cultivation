# Field Manual manuscript — first draft

> **PLAYER-FACING COPY DRAFT · 16 November 2026.** This document defines the information and wording intended for the Field Manual. It is not a tab list, page plan, spread plan, or final layout. Everything in the finished Field Manual will be available from the beginning. Exact balance values, species secrets, Transformation solutions, cross-navigation, and troubleshooting material are intentionally omitted from this pass.

## Welcome to the Field Manual

The Field Manual explains how to operate the garden and how its systems fit together. It describes the rules shared by every garden without revealing the discoveries that belong to individual Plants and Fungi.

Use the garden and its Inspector to examine what is happening now. Use the Cultivation Grimoire to review species, tools, Blockers, and discoveries. Use this manual when you need to remember how a rule works.

The garden continues to advance while the Inventory, Taskboard, Shop, Grimoire, Field Manual, or main menu is open. Select **Pause** whenever you want time to stop.

## The garden at a glance

The garden is made from hexes. Each hex has its own Moisture, Temperature, and Illumination, and each can hold one of the following:

- A living Plant.
- A living Fungus.
- A temporary Garden Tool.
- A Full Hex Blocker.
- A planting attempt that has not yet been revealed.

An uncommitted planting proposal also reserves its chosen hex until it is moved, cancelled, or applied. Edge Blockers are different: they occupy the shared border between two hexes instead of occupying either hex.

Placement matters. Influences and Effects must be able to reach their destination. A route may be too short, aimed in another direction, interrupted by the wrong ground, or stopped by a matching Blocker.

Removing a source immediately removes its continuing contribution. It does not undo Growth, Ripening, production, exposure, or discoveries that have already occurred.

## Reading a hex

The garden places its most important information directly on each hex.

| What you see | What it means |
| --- | --- |
| The interior terrain | Current Moisture |
| The outer border | Current Temperature |
| The void, cloud, flame, or sun medallion | Current Illumination |
| Plant, Fungus, or tool artwork | The occupant of the hex |
| The thick bar along the lower edge | The lifecycle progress of a living organism |
| A Mycelial overlay | Mycelial ground is present |
| Artwork across a shared border | An Edge Blocker occupies that border |
| Large artwork covering a hex | A Full Hex Blocker occupies that hex |
| A concealed planting marker | Germination has been committed but not revealed |
| An uncommitted planting marker | Seeds or Spores are reserved in the current plan |
| A selection outline | This hex is open in the Inspector |

The Inspector gives the exact current state of the selected hex. It shows the occupant, resolved Conditions, lifecycle and harvest information, active cultivation Effects, and any observations that have been made there.

Large illustrations appear in the Inspector and Grimoire, where there is room to study them. Smaller gameplay icons are used in the garden, Inventory, Shop, and Taskboard so the same identities remain easy to recognise.

## Environmental Conditions

Every hex has three environmental Properties. Each Property follows an ordered ladder.

| Property | Low to high | Shown on the hex as |
| --- | --- | --- |
| Moisture | Dry → Damp → Flooded | Interior terrain |
| Temperature | Freezing → Cold → Temperate → Hot → Scorching | Outer border |
| Illumination | Dark → Dim → Lit → Bright | Distinct medallion |

The **baseline** is the underlying environment of a hex. The **resolved Condition** is its current state after active Influences and neighbouring extremes have been considered. Organisms and recipes respond to the resolved Condition.

When no Influence is active, a hex returns to the result produced by its baseline and neighbouring environment. An Influence changes the current Condition; it does not permanently rewrite the baseline.

Environmental Influences move a Property up or down its ladder:

| Influence | Change |
| --- | --- |
| Wetting | Moves Moisture toward Flooded |
| Drying | Moves Moisture toward Dry |
| Warming | Moves Temperature toward Scorching |
| Cooling | Moves Temperature toward Freezing |
| Brightening | Moves Illumination toward Bright |
| Dimming | Moves Illumination toward Dark |

Several Influences can combine. Influences moving in opposite directions can partly or completely cancel one another. A Property cannot move beyond the ends of its ladder.

An individual emission affects a reached hex once, even if more than one open path leads there. Separate sources can still combine on the same hex.

### Neighbouring extremes

Extreme Conditions can nudge an adjacent hex by one step.

| Extreme neighbour | Effect on an adjacent hex |
| --- | --- |
| Flooded | Can turn Dry into Damp |
| Scorching | Can make the neighbour one step warmer |
| Freezing | Can make the neighbour one step colder |
| Bright | Can make the neighbour one step brighter |
| Dark | Can make the neighbour one step darker |

This adjustment is immediate and does not continue as a chain through every newly changed hex. Several neighbours with the same extreme still cause only one step. Opposing Temperature or Illumination extremes can cancel each other.

Blockers may stop an extreme from crossing a shared border. Flooded adjacency is not Waterborne propagation: a Flooded hex can dampen an adjacent Dry hex without creating a canal through it.

## Influences, Effects, and observations

These terms describe different parts of the garden.

An **Environmental Influence** changes Moisture, Temperature, or Illumination while it reaches a hex.

A **Cultivation Effect** changes germination, Plant development, production, or harvest timing while it reaches an eligible Plant.

An **observation** is a real response, hazard, Effect, or successful Transformation recorded through play. Placing two organisms near one another is not enough by itself; something must actually reach or affect the Plant.

A Fungus may have one footprint for its Environmental Influence and another for its cultivation Effects. One can reach a Plant while the other does not. A cultivation Effect may also be present but inactive because the Plant is in the wrong lifecycle stage or production window.

### Cultivation Effect vocabulary

| Effect | What it changes |
| --- | --- |
| Growth speed | Progress from 0% to 100% |
| Ripening speed | Progress from 100% to 200% |
| Germination chance | The chance that a committed Seed attempt succeeds |
| Leaf production | Ordinary Leaves earned during production |
| Seed production | Ordinary Seeds earned during production |
| Harvest window | The width of a productive interval |
| Peak Leaf timing | When an existing Leaf peak occurs |
| Seed timing | When Seed production occurs |
| Extra Leaves | Additional Leaves banked during the stated lifecycle window |
| Extra Seeds | Additional Seeds banked during the stated lifecycle window |

Growth and Ripening are separate stages. A faster Growth Effect does not automatically hasten Ripening. Timing Effects move an existing productive period; they do not create a new product or turn a sterile Plant into a Seed producer.

Positive and negative cultivation Effects can combine or cancel. A Plant's compatibility can change the strength of an Effect. Helpful Effects apply while production is taking place; placing a helpful Fungus just before harvest does not improve output earned earlier.

## Reach and propagation

Every Influence or Effect has a footprint. Its propagation rule determines which hexes are inside that footprint.

### Range

A Range effect spreads through adjacent, unblocked hexes up to its stated distance. The source hex is included. If one route is blocked, the effect can go around by another open route when enough Range remains.

### Directional Budget

A directional effect is aimed along one of the six hex-grid headings. It travels forward until something obstructs it, then may use the neighbouring exits to turn or divide.

Every successful border crossing spends from one shared Budget. A branch does not receive a fresh Budget of its own. Because all branches share the same supply, a nearby obstruction can change how much of the garden is reached farther away.

Directional Fungi are aimed before the planting is applied and keep that heading for life. Directional Garden Tools can be rotated after they have been deployed.

### Airborne

Airborne propagation travels through ordinary open hexes according to its Range or directional Budget. Matching Blockers can stop individual crossings, but another route may still go around them.

### Waterborne

Waterborne propagation begins with its ordinary footprint. Once that footprint reaches Flooded ground, the effect can continue through the connected Flooded network.

Dry and Damp gaps break the network. Matching Blockers can divide it. If another unblocked flooded route exists, the effect may travel around the obstruction.

A Waterborne effect does not create the Flooded path it needs. One source may first create suitable terrain, allowing a separate Waterborne effect to use the resulting canal.

“Waterborne” describes how an effect travels. It does not mean the effect changes Moisture, and it does not mean that the receiving Plant stands on Mycelial ground.

## Blockers

Blockers control which Influences, Effects, and ground connections may cross part of the garden.

An **Edge Blocker** occupies one shared border. It stops matching crossings in both directions.

A **Full Hex Blocker** occupies an entire hex. It stops matching travel through that tile and can stop matching adjacency across its sides.

A Blocker stops an effect when any one of its filters matches that effect. It does not remove Growth, products, exposure, or discoveries already earned. A route may still reach around it by another valid path.

Player Blockers are reusable. They can be moved directly between valid positions or returned to the Inventory. Moving a Blocker does not advance garden time.

### Blocker filter reference

| Blocker | Stops |
| --- | --- |
| Root Barrier | Mycelial spread and support |
| Windbreak | Temperature effects and Airborne cultivation |
| Water Gate | Waterborne cultivation |
| Garden Screen | Illumination and Moisture effects |
| Stone Wall | All environmental effects, cultivation effects, and Mycelial spread or support |
| Insulating Panel | Temperature effects |
| Shade Panel | Illumination effects |
| Pond Liner | Moisture effects and Waterborne cultivation |
| Climate Divider | Moisture, Temperature, and Illumination effects |

The Blockers chapter of the Grimoire records their forms, illustrations, and unlocked collections.

## Time in the garden

The time controls apply to the entire garden.

| Control | Meaning |
| --- | --- |
| Pause | No garden time passes |
| 0.5× | Garden time advances slowly |
| 1× | Garden time advances at its normal rate |
| 2× | Garden time advances quickly |

Speed affects germination, Plant and Fungus lifecycles, production, hazards, Mycelial growth and retreat, Transformation progress, and the active lifetime of deployed Garden Tools.

Changing speed does not alter biological requirements or thresholds. It changes only how quickly real time advances the garden. Progress already made toward the next garden hour is kept when speed changes or the garden is paused.

Pause stops elapsed-time progress. You can still inspect the garden, arrange a planting plan, move Blockers and Garden Tools, and perform other direct actions. Those actions can change the resolved environment immediately without advancing time.

Opening another game surface does not pause the garden. The garden also does not simulate the time spent while the game is closed.

## Seeds, Spores, and planting

Seeds grow Plants. Spores grow Fungi. Leaves cannot be planted. Every Seed and Spore belongs to a particular species.

You may spend more than one Seed or Spore on a planting attempt. A larger quantity improves its chance of germinating, up to certainty. Germination Effects can change the chance of a Plant Seed attempt. They do not change Fungus Spore attempts.

Some Plants may produce another species' Seeds, more than one kind of Seed, or no Seeds at all. Those traits are recorded on discovered species pages.

A Mycelial-dependent Fungus can be planted only where Mycelial ground is present when the attempt is committed.

### Planning several plantings

With **Stage plantings before applying** enabled:

1. Select or drag a Seed or Spore stack to an empty hex.
2. Choose a whole quantity.
3. Move, rotate, revise, undo, or cancel uncommitted proposals as needed.
4. Select **Apply** to validate and commit the entire plan.

An uncommitted proposal reserves its chosen stock and hex, but it is not alive. It does not emit, grow, transform, block a route, or count toward a task.

**Undo** reverses the most recent uncommitted edit. It does not rewind garden time or reverse an earlier Apply. **Cancel** releases the complete uncommitted plan.

Apply is all-or-nothing. If any part of the current plan is no longer valid, none of that plan is spent or committed. Existing organisms and pending attempts continue to advance while a plan is open.

Staging can be disabled in the main menu when no proposal is waiting. With staging disabled, confirming a quantity commits that one attempt immediately under the same planting rules.

### Concealed germination

Seeds or Spores are spent when an attempt is committed. The result is determined then but remains concealed until germination is revealed.

Success and failure use the same marker and progress display. A pending attempt occupies its hex but is not yet a living organism. It emits nothing and cannot contribute to tasks, routes, Effects, Mycelial ground, or Transformations.

When the wait ends, a successful attempt creates the organism at 0% Growth. A failed attempt frees the hex. Spent Seeds or Spores are not refunded.

## Plant growth and harvest

A Plant has two lifecycle stages.

| Progress | Stage |
| --- | --- |
| 0–100% | Growth |
| 100–200% | Ripening |
| 200% | Mature |

Reaching 100% ends Growth and begins Ripening. It is not a universal signal that this is the best moment to harvest. Each Plant has its own productive pattern, and Leaves and Seeds may peak at different times.

The lifecycle bar marks known production windows. The Inspector shows what would actually be collected at the present moment.

Moisture, Temperature, Illumination, Mycelial ground, and cultivation Effects can change lifecycle speed or output. Ordinary output is earned as the Plant passes through productive periods under the Conditions that existed at that time. It is not recalculated entirely from the final moment before harvest.

Leaves belong to the Plant that produced them. They are not a generic crop. A Plant's Seeds may grow that same species, another species, several species, or nothing, according to its discovered traits.

Ordinary Leaves may decline during Ripening while Seed production rises. Extra hourly output is banked separately during its stated window.

Harvesting collects everything currently available and removes the Plant. A living Plant cannot be placed in the Inventory for safekeeping or moved to another hex.

The entire harvest must fit safely in the Inventory. If it does not, the harvest is refused and the Plant remains in place.

### Environmental hazards

Some Plants are endangered by continuous exposure to particular Conditions or ground. Each hazard keeps its own exposure clock. Removing that hazard resets its clock without erasing exposure to a different hazard.

An unsuitable Condition may slow a Plant or reduce its output without killing it. Exact vulnerabilities, safe ranges, Dormancy triggers, and danger thresholds are species discoveries and belong in the Grimoire.

Dormancy can stop lifecycle progress and new production without stopping an active environmental danger.

If a Plant dies before it is harvested, its uncollected products are lost.

## Fungi

Fungi are living sources. They can change the environment, cultivate Plants, support experiments, and produce Spores.

A Fungus also has two lifecycle stages.

| Progress | Stage |
| --- | --- |
| 0–100% | Growth |
| 100–200% | Sporulation |
| 200% | Mature |

A successfully germinated Fungus begins emitting its ordinary Influences and Effects immediately. It continues emitting through Growth, Sporulation, and maturity while it remains alive.

Spores are produced during Sporulation. Harvesting a Fungus collects its available Spores, removes the Fungus, and ends all of its emissions. A living Fungus cannot be stored or relocated.

A directional Fungus keeps the heading chosen before planting. It cannot be rotated or moved after germination.

Mycelord is the source of Mycelial ground. It does not have an ordinary environmental or cultivation package.

### Mycelial affinity

A Fungus's affinity describes the ground under that Fungus, not the ground under the receiving Plant.

| Affinity | Meaning |
| --- | --- |
| Independent | Does not require Mycelial ground |
| Preferring | Functions without Mycelial ground, but specified Effects become stronger when its own hex is Mycelial |
| Dependent | Requires Mycelial ground to germinate; losing it begins a grace period before death |

A dependent Fungus continues emitting during its grace period. Restoring Mycelial ground before that period ends removes the danger.

The receiving Plant does not need to stand on Mycelial ground for a preferring or dependent Fungus to affect it.

Mycelord is not a dependent Fungus, but sustained Flooded ground is dangerous to it and interferes with colony support.

## Mycelial ground

Mycelial is a living ground network. It is separate from Moisture, Temperature, Illumination, and permanent terrain.

Mycelord establishes a colony. New Mycelial ground gradually spreads from supported neighbouring Mycelial hexes.

Flooded hexes cannot be newly colonised and cannot carry support between a colony and its Mycelord. A Root Barrier or another Blocker that stops Mycelial can also interrupt that connection.

When a contribution loses its route to its Mycelord, it stops expanding and begins to retreat gradually. Restoring the connection can rescue ground that has not yet disappeared. Lost ground must be colonised again normally.

Colonies from several Mycelords may overlap. A hex remains Mycelial while at least one living contribution still supports it.

Mycelial ground generally slows Plant development and ordinary production. Some Plants have a specific hazard associated with it. Species-specific responses are recorded through discovery.

Flooded networks and Mycelial networks use the garden in opposite ways: Flooded ground can carry Waterborne propagation, while Flooded ground breaks Mycelial support.

## Transformations

A Transformation changes one living Plant into another. The necessary circumstances must remain satisfied for some time.

When a Transformation completes, the resulting Plant begins its new lifecycle at 0% Growth. Successfully witnessed routes are recorded in the Cultivation Grimoire.

Fungi and Garden Tools do not transform.

## Inventory

An Inventory square stores one item identity or one individually tracked temporary Garden Tool. It does not represent a single unit of every stack.

Seeds, Spores, and Leaves of different species are different identities. Ordinary Seeds, Spores, Leaves, and identical Blockers can stack in one square. Edge and Full Hex forms of a Blocker are separate identities.

Temporary Garden Tools are stored individually because each can have its own remaining active time and direction. Two identical tools therefore occupy two squares.

Items can be rearranged without changing ownership. Their positions are saved. Inventory filters change which entries are visible; they do not move the underlying stacks.

A new identity needs a free Inventory square. More units added to an existing stack do not. Harvests, purchases, and task rewards check capacity before anything is removed, spent, or granted.

Discard permanently removes the selected stack after confirmation. Stock reserved by an uncommitted planting plan must be released before it can be discarded.

## Garden Tools

Garden Tools are temporary environmental sources. They are not living Fungi.

A deployed tool occupies one hex and immediately applies its listed Influence through its Range or directional Budget footprint. Its active lifetime passes only while it is deployed.

Returning a tool to the Inventory pauses its lifetime and preserves the time remaining. It can also be moved directly to another empty hex without first returning to the Inventory.

A directional tool can be rotated after deployment. Moving or rotating it does not restore or reset its lifetime.

When no active time remains, the tool expires and frees its hex.

Deploying a tool frees its Inventory square. If the Inventory later becomes full, the game will refuse to retrieve that tool rather than destroy it. The tool remains active in the garden.

The Garden Tools chapter of the Grimoire records each tool's exact effect, footprint, lifetime, artwork, and unlocked collection.

## Shop and Gold

Gold is used in the Shop.

Named Plant Leaves can be sold. Seeds, Spores, Blockers, Garden Tools, and trophies are not sold back to the Shop.

Beanstalk Seeds remain free, providing a way to begin again when no Gold is available.

The Shop shows current prices, quantities, stock, and ownership before a purchase or sale is confirmed. A transaction is completed as one action. If it cannot be completed safely, nothing is partly bought, sold, spent, or awarded.

Some task rewards permanently add new Seeds, Spores, Blockers, Garden Tools, land upgrades, Inventory upgrades, or stationery to the Shop.

Leaves used for a delivery task and Leaves sold for Gold come from the same Inventory. Choosing one use leaves fewer available for the other.

## Tasks and rewards

The Taskboard separates Main, Side, and Completed tasks.

Completing every objective makes a task ready. Rewards are not granted until the task is explicitly completed or its requested delivery is submitted.

A delivery consumes the named Leaves only when it is submitted. If the quantity falls below the requirement before submission, the task is no longer ready.

Rewards and permanent unlocks are granted together. If there is not enough Inventory space for the complete reward, the task remains unclaimed rather than consuming the task or losing part of its reward.

Up to three available tasks can be pinned to the garden tracker. Pinning changes what the tracker displays; it does not activate a task or determine whether progress counts.

The Objectives tracker can be collapsed. Selecting one of its entries opens that task on the Taskboard.

Opening the Taskboard does not pause the garden.

## Expanding the garden and Inventory

Progression can unlock purchases that add rows or columns to the garden. Expansion keeps the existing garden layout and adds new hexes around it.

Inventory upgrades add more usable squares without moving or changing the stacks already owned.

The Shop shows the current price and whether another upgrade is available. Exact prices and limits belong in the Shop rather than this manual.

## The Cultivation Grimoire

The Grimoire records knowledge. Discovering a Plant does not grant its Seeds, make it plantable, or place it in the Inventory.

Some species are known from the beginning. Undiscovered Plants remain hidden behind stable runes until they legitimately appear in the garden.

The first legitimate appearance of a hidden Plant reveals its identity permanently. Preferences, hazards, fungal responses, unusual traits, and Transformation routes are recorded only as the garden produces real observations.

Fungus pages describe their known affinities, Influences, cultivation Effects, and propagation. Plant pages collect species-specific observations and witnessed Transformation routes. Garden Tools and Blockers have their own catalogue sections.

The Grimoire remains available beside the live garden. Reading it does not pause time.

Page markers and field notes can hold personal reminders. Unlocked paper and marker appearances are permanent stationery choices, not consumable Inventory items.

## Garden controls

Select a hex to open it in the Inspector.

To plant, drag a Seed or Spore stack to a valid hex. You can also select the stack first and then select the target hex.

Drag a living Plant or Fungus into the Inventory to harvest it. This removes the organism from the garden.

Drag a temporary Garden Tool or Blocker to move it. Return it to the Inventory to retrieve it.

Drag empty garden ground with the primary pointer button to pan. The middle mouse button can pan from anywhere, including an occupied hex.

Use the mouse wheel, a two-finger pinch, or the minus and plus controls to zoom. Select **Fit** to frame the current garden.

On touch screens, drag the garden with one finger and pinch with two fingers to adjust the view. Direct object interactions still require a valid target and follow the same placement rules.

The Inventory can be resized from its left edge. Keyboard users can focus the resize handle and use the Left and Right Arrow keys.

Escape closes supported menus, dialogs, and book surfaces. Standard keyboard focus can reach buttons and controls without relying on hover alone.

## Using the books

Open the Field Manual or Cultivation Grimoire from its icon beside the garden. Each book remembers the spread where it was last closed.

Select a chapter tab to jump to that part of the book. Use the page margins or page-turn controls to move one spread at a time. When the book itself has focus, the Left and Right Arrow keys also turn pages.

The book, stationery, and tabletop move as one scene. Drag open tabletop space to move it. Use the book-view controls to zoom, rotate, fit the book for reading, or reset the complete arrangement. The gold cover corners can also be dragged to rotate the scene. Their keyboard controls use the Left and Right Arrow keys.

Use the inkwell to write a field note on the current spread. Notes can be moved, edited, tucked out of the way, or removed. Unlocked paper styles can be reused for any number of notes.

Use a page marker to save a spread for later. A marker can be named, written on, moved to an open position, or removed. Selecting a placed marker returns to its saved spread. Unlocked marker styles are reusable.

Personal notes and page markers are saved with the garden. They do not occupy Inventory squares.

## Display and planting preferences

**Stage plantings before applying** allows several attempts to be arranged before they are committed. Turning it off commits one attempt when its quantity is confirmed.

**Simplified hex fills** changes only the appearance of the terrain. It does not alter Conditions or garden rules.

**Keep Inspector in front of Grimoire** changes how those surfaces overlap. It does not alter time or simulation.

Display choices and simulation speed are interface settings, not properties of a Plant, Fungus, or hex.

## Saving and recovery

The garden autosaves in the current browser after changes. This save is local to that browser. Clearing its site data or moving to another browser can remove access to it.

**Save Game** downloads a portable `.ccsave` backup. The backup includes the garden, Inventory arrangement, uncommitted planting plan, pending germination, tasks, discoveries, Shop state, field notes, markers, and deployed objects.

**Load Game** checks a compatible save before asking to replace the current browser garden. Portable backups can be moved to another supported browser or device.

Loading a save does not simulate time that passed while the game was closed.

**New garden** replaces current progress after confirmation. Make a portable backup first if you may want to return to that garden.
