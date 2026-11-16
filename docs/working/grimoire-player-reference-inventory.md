# Grimoire player-reference knowledge inventory

> **WORKING CONTENT AUDIT · NOT A PAGE PLAN · 16 November 2026.** This document inventories what an ordinary player may need to learn, look up, or troubleshoot. It does not decide chapter length, spread order, final prose, illustrations, or which facts appear on the same page. It follows the current implementation on `main` and separates stable rules from provisional balance and discovery-gated information.

## Purpose

The proposed Grimoire chapter is a permanent reference after the guided tutorial has ended. It should help a player answer three kinds of question:

1. **How do I operate the garden?** Planting, staging, time controls, harvesting, moving tools, reading the interface, saving, and navigation.
2. **Why did the garden behave that way?** Resolved Conditions, propagation, Blockers, cultivation Effects, Mycelial support, lifecycle production, hazards, and Transformations.
3. **Where do I find the relevant detail?** Current state in the Inspector, accumulated discoveries on species pages, item statistics in Garden Tools, Blocker filters in Blockers, and task-specific instructions on the Taskboard.

This inventory deliberately includes more than will fit in one short chapter. The next design pass can group, trim, cross-reference, and decide what deserves a full spread.

## Information classes

| Class | Meaning for the eventual chapter |
| --- | --- |
| **Essential** | A new player needs this to perform ordinary actions or correctly read the garden. |
| **Frequent reference** | A player is likely to forget it or need it while solving a garden problem. |
| **Advanced reference** | Important for deliberate optimization or diagnosing an unusual result, but not required immediately. |
| **Discovery-sensitive** | The general rule is safe to explain, but species, values, recipes, or outcomes must remain hidden until observed. |
| **Catalogue cross-reference** | The information already belongs primarily to Garden Tools, Blockers, a species page, the Taskboard, or the Shop. The mechanics chapter may summarize and link rather than duplicate it. |
| **Provisional** | Implemented for playtesting, but not safe to present as permanent balance without an explicit decision. |

## Spoiler and authority boundary

### Safe to explain from the start

- Controls and ordinary garden interactions.
- The three environmental Properties and their ordered Conditions.
- How the hex visually represents Moisture, Temperature, Illumination, growth, occupants, Mycelial ground, and Blockers.
- The distinction between environmental Influences, cultivation Effects, and Transformation contact.
- General Range, directional Budget, Airborne, Waterborne, Blocker, lifecycle, germination, hazard, Mycelial, harvesting, inventory, Shop, task, and save rules.
- The names and general meanings of cultivation Effect categories.
- The fact that Transformations depend on resolved Conditions, living fungal contact, time, and sometimes a sequence of events.
- The fact that a successful Transformation creates a fresh Plant at 0% Growth.

### Reveal only through the existing discovery system

- The identity and illustration of an undiscovered Plant.
- A Plant's exact preferences, rate multipliers, productive windows, hazard thresholds, unusual traits, compatible Effect strengths, or Seed identities unless the game has revealed them.
- Exact Transformation destinations, recipes, qualifying Fungi, alternatives, durations, and event sequences until that route has been witnessed.
- A theoretical fungal response that has not actually affected that Plant.
- A hidden germination result before its public reveal.

### Keep out of the ordinary player chapter

- Developer Sources, unrestricted spawning, baseline-editing tools, raw JSON tools, internal route seeds, schema migration, and simulation implementation order.
- Hidden random rolls and unrevealed canonical species tables.
- Exact provisional tuning presented as permanent law.

## 1. The basic mental model

**Essential**

- The garden is a live hex grid. Each hex has an underlying environment and can hold at most one object: a Plant, Fungus, temporary Garden Tool, or Full Hex Blocker. A pending or staged planting also reserves that hex against conflicting placement.
- Edge Blockers occupy shared borders instead of hex object slots.
- Plants are grown for species-specific Leaves, Seeds, transformations, task objectives, and occasional special products.
- Fungi are living sources. Most emit one environmental Influence and a separate package of cultivation Effects. Their two footprints may differ.
- The game continues to advance while the garden, Inventory, Taskboard, Shop, or Grimoire is open unless the player selects Pause.
- The Inspector explains the selected hex's **current** state. The Grimoire records **lasting knowledge** and catalogue information.

**Frequent reference**

- Placement and geometry matter. An effect can fail because its route does not reach, a Condition is wrong, a Blocker matches it, a Waterborne path is broken, or a required Fungus is no longer alive.
- Environmental changes recalculate the current garden. Removing a source stops its ongoing contribution but does not undo time, growth, production, exposure, or discoveries that already occurred.

## 2. Reading a garden hex

| Visual element | Meaning | Class |
| --- | --- | --- |
| Interior terrain fill | Resolved **Moisture** | Essential |
| Outer border colour/art | Resolved **Temperature** | Essential |
| Distinct void/cloud/fire/sun-style medallion | Resolved **Illumination** | Essential |
| Central organism artwork | The living Plant or Fungus occupying the hex | Essential |
| Central item artwork | The active temporary Garden Tool occupying the hex | Essential |
| Thick lower-edge bar | Living organism lifecycle progress from 0–200% | Essential |
| Mycelial overlay | Mycelial ground is currently present | Essential |
| Art across a border | An Edge Blocker occupies that shared boundary | Essential |
| Large art filling a hex | A Full Hex Blocker occupies the tile | Essential |
| Pending planting marker and progress bar | Committed germination is unresolved publicly | Essential |
| Uncommitted marker | Seeds or Spores are reserved but have not been spent or activated | Essential |
| Selection outline | The hex currently shown in the Inspector | Essential |
| Direction handle/route | A directional staged Fungus or deployed Garden Tool can be aimed | Frequent reference |

**Inspector reading order**

1. Illustration and identity.
2. **Environment:** exact resolved Moisture, Temperature, and Illumination. Hovering or focusing a condition row explains its baseline and the modifiers currently changing it.
3. **Growth & Harvest:** lifecycle, current collectable output, harvest timing, or a temporary item's remaining active time.
4. **Influences & Observations:** cultivation Effects and other growth-related observations using their dedicated icons.
5. **Transformation:** appears only while genuine unusual activity is underway. An unknown route remains deliberately vague; a witnessed route may show more.

The Inspector uses the large full illustration because it has room. Compact gameplay surfaces use the simpler gameplay icons.

## 3. Environmental Conditions

### The three ordered Properties

| Property | Low to high | Hex representation |
| --- | --- | --- |
| **Moisture** | Dry → Damp → Flooded | Terrain fill |
| **Temperature** | Freezing → Cold → Temperate → Hot → Scorching | Border |
| **Illumination** | Dark → Dim → Lit → Bright | Distinct medallion |

**Essential**

- A **baseline** is the underlying state a hex returns toward when active modifiers are gone.
- A **resolved Condition** is what currently affects organisms and recipes after active Influences and neighbouring extremes are considered.
- The hex and Inspector show the resolved Conditions. Hover/focus detail can explain how they differ from the baseline.
- Effects move along the ordered ladder and stop at its ends. There is no wetter state than Flooded, hotter state than Scorching, or brighter state than Bright.
- The default untouched terrain is Dry, Temperate, and Dark.

### Environmental Influence names

| Influence | Changes | Direction |
| --- | --- | --- |
| Wetting | Moisture | Toward Flooded |
| Drying | Moisture | Toward Dry |
| Warming | Temperature | Toward Scorching |
| Cooling | Temperature | Toward Freezing |
| Brightening | Illumination | Toward Bright |
| Dimming | Illumination | Toward Dark |

**Frequent reference**

- Modifier strengths are additive. Opposite modifiers can partially or completely cancel before the final Condition is resolved.
- Each point normally moves the relevant Property by one step. The result is clamped to the available ladder.
- An environmental Influence changes Conditions; it does not permanently rewrite the baseline.
- Several paths from the **same emission** do not make that emission apply several times to the same hex. Different sources can still stack.

### Environmental adjacency

Neighbouring extremes produce one immediate, non-chaining adjustment:

| Neighbour | Possible adjustment to an adjacent hex |
| --- | --- |
| Flooded | Dry → Damp, never Damp → Flooded |
| Scorching | One step warmer, but never creates Scorching |
| Freezing | One step colder, but never creates Freezing |
| Bright | One step brighter, but never creates Bright |
| Dark | One step darker, but never creates Dark |

**Advanced reference**

- Several identical extreme neighbours still cause only one adjacency step.
- Opposing Scorching/Freezing or Bright/Dark neighbours cancel if both can cross their relevant borders.
- Adjacency does not chain through newly changed neighbours in the same recalculation.
- Blockers can stop adjacency. Blocking one side of an opposing pair may allow the other side to take effect.
- Flooded adjacency is not the same thing as Waterborne propagation. It can dampen one adjacent Dry hex without creating or travelling through a flooded network.

## 4. Environmental Influences, cultivation Effects, and contact

These terms should remain distinct everywhere in the final writing.

| Term | Meaning |
| --- | --- |
| **Environmental Influence** | Changes Moisture, Temperature, or Illumination while its footprint reaches a hex. |
| **Cultivation Effect** | Changes germination, Plant development, production, or harvest timing while its cultivation footprint reaches an eligible recipient. |
| **Contact** | A living named Fungus has an ordinary environmental or cultivation footprint reaching the Plant. Contact can satisfy a Transformation even when a stage-specific cultivation bonus is not currently applicable. |
| **Observation** | A real resolved effect, response, hazard, or successful Transformation that can be recorded in the Grimoire. Proximity alone is not an observation. |

**Essential**

- A Fungus's environmental Influence and cultivation package are separate. They can use different propagation, reach different hexes, and be blocked differently.
- Being next to a Fungus is not automatically contact. One of that Fungus's actual unblocked footprints must reach the Plant.
- Contact does not mean every listed cultivation bonus currently applies. A production window or Plant stage may make an Effect inactive while the spatial contact still exists.

### Cultivation Effect vocabulary

| Effect | Player-facing meaning | Important distinction |
| --- | --- | --- |
| Growth speed | Changes progress from 0–100% | Separate from Ripening |
| Ripening speed | Changes progress from 100–200% | Does not directly create output |
| Germination chance | Adds or removes percentage points from a Seed's chance | Percentage points are not a relative percentage |
| Leaf production | Changes ordinary Leaves earned while production occurs | Not retroactive at harvest |
| Seed production | Changes ordinary Seeds earned while production occurs | Not retroactive at harvest |
| Harvest window | Widens or narrows a productive interval | Does not create a new natural peak |
| Peak Leaf timing | Moves existing Leaf timing earlier or later | Does not directly change lifecycle duration |
| Seed timing | Moves Seed production earlier or later | Not a Seed-yield bonus |
| Extra Leaves per garden hour | Banks extra Leaves during its stated lifecycle window | Separate from ordinary Leaf decline |
| Extra Seeds per garden hour | Banks extra Seeds during its stated lifecycle window | A sterile Plant cannot be given a Seed identity by it |

**Advanced reference**

- Positive and negative Effects from several sources can stack or cancel according to their signed values.
- Plant compatibility scales Effect magnitude and can depend on the species, resolved Conditions, direction of the Effect, or lifecycle progress. It changes magnitude, not the sign of an Influence.
- Ordinary Leaf and Seed bonuses are earned prospectively. Placing a helpful Fungus just before harvest does not improve output earned earlier.
- Previously earned ordinary Leaves can still decline with that Plant's natural Ripening curve. Banked hourly output is tracked separately.
- A Mycelial-preferring Fungus strengthens only the explicitly marked part of its package while its own source hex is Mycelial; it does not receive a universal boost to everything it does.
- Selective Blockers may stop individual kinds within a cultivation package even though the package began with one shared geometric footprint.

## 5. Propagation and routes

### Range

**Essential**

- A Range effect spreads outward through adjacent unblocked hexes up to its listed distance.
- The source's own hex is distance zero and is included.
- An alternate open route can reach around a Blocker when the remaining Range permits it.

### Directional Spread Budget

**Frequent reference**

- A directional effect starts in one of six headings: E, NE, NW, W, SW, or SE.
- It travels straight until obstructed, then tries the two neighbouring exits.
- Every successful crossing spends from one **shared** budget across all branches. The budget is not a radius and is not renewed per branch.
- A boundary, matching Blocker, or already visited hex can cause the route to turn or fork.
- The route is reproducible while the garden route state is unchanged.
- Directional Fungi are aimed before Apply and keep that heading after germination. Directional Garden Tools can be re-aimed after deployment.

### Airborne and Waterborne modes

| Mode | Rule |
| --- | --- |
| **Airborne** | Travels through ordinary open hexes using its finite Range or directional Budget. |
| **Waterborne** | After its initial footprint touches Flooded ground, it can continue through the entire connected, unblocked Flooded network. |

**Frequent reference**

- Ordinary Waterborne continuation has no numeric distance limit inside the connected Flooded network.
- A source on non-Flooded ground can inject into an adjacent Flooded component when its footprint reaches that entry.
- Dry or Damp gaps break Waterborne continuation.
- A matching Edge or Hex Blocker can cut a water route, but another flooded path may go around it.
- Waterborne effects do not create their own Flooded path. Environmental Wetting that uses ordinary Waterborne propagation is deliberately unavailable.
- Airborne or directional Wetting can first create Flooded terrain, allowing a separate Waterborne effect to use it.
- “Waterborne” describes delivery, not Moisture. Waterborne cultivation can affect a Plant that is reached through a canal even if the Plant itself does not stand on Mycelial ground.

## 6. Blockers

### Shared placement rules

**Essential**

- An **Edge Blocker** occupies one shared border and stops matching crossings in both directions.
- A **Full Hex Blocker** occupies a hex and stops matching travel through that tile and matching adjacency across its sides.
- A Blocker stops an effect when **any** of its listed filters matches.
- Blockers do not erase already earned growth or products. They change which ongoing and future effects can cross.
- A route may still reach around a Blocker if another valid path exists.
- Player Blockers are reusable. They can be moved directly between valid positions or returned to Inventory. Moving them costs no garden time.

### Filter reference

| Blocker design | Stops |
| --- | --- |
| Root Barrier | Mycelial spread and support |
| Windbreak | Temperature effects and Airborne cultivation |
| Water Gate | Waterborne cultivation |
| Garden Screen | Illumination and Moisture effects |
| Stone Wall | All environmental effects, cultivation effects, and Mycelial spread/support |
| Insulating Panel | Temperature effects |
| Shade Panel | Illumination effects |
| Pond Liner | Moisture effects and Waterborne cultivation |
| Climate Divider | Moisture, Temperature, and Illumination effects |

**Catalogue cross-reference:** individual artwork, Edge/Hex forms, availability, and descriptions belong in the existing **Blockers** chapter. The mechanics reference needs the general matching rules and may include this table or link to it.

## 7. Time and simulation controls

| Control | Real time for one garden hour |
| --- | --- |
| Pause | No simulated time passes |
| 0.5× | 10 seconds |
| 1× | 5 seconds |
| 2× | 2.5 seconds |

**Essential**

- The chosen speed affects the whole time-driven garden: germination, Plant and Fungus lifecycles, production, Transformation and hazard clocks, Mycelial spread/retreat, and deployed Garden Tool lifetimes.
- Pause stops elapsed-time progress but still allows inspection, reading, staging, moving tools and Blockers, and other direct actions. Those actions can immediately recalculate the environment without advancing time.
- Staging does not pause existing organisms.
- Opening the Taskboard, Shop, Grimoire, or main menu does not automatically pause the garden.
- There is no closed-page/offline catch-up. The garden does not simulate the time while the game is closed.
- Grimoire durations use the 1× reference even when the current garden is running faster or slower.

**Frequent reference**

- Changing speed does not change biological thresholds; it only changes how quickly real time reaches them.
- A partially accumulated garden hour is retained across speed changes and Pause.

## 8. Planting, staging, and germination

### Seeds and Spores

**Essential**

- Seeds plant Plants; Spores plant Fungi. Leaves cannot be planted.
- Each Seed or Spore identity is species-specific.
- Spending more in one attempt increases the germination chance, up to certainty.
- Plant Seed attempts use that Plant's species-specific chance and any reaching Germination Effects. Fungus Spore attempts currently use the shared provisional fungal chance; cultivation Germination Effects do not modify Spores.
- Some transformed Plants have no directly plantable Seeds, produce another species' Seeds, produce more than one Seed identity, or are sterile. Those are species facts and should remain on discovered species pages.
- Mycelial-dependent Fungi require Mycelial ground on the target hex when the attempt is committed.

### Staged planting mode

**Essential**

1. Drag or select a Seed/Spore stack and choose an empty hex.
2. Choose a whole quantity. The proposal reserves that stock but does not spend it.
3. Move, rotate, revise, Undo, or Cancel uncommitted proposals as needed.
4. **Apply** validates the entire current plan against the current garden, then spends and commits it atomically.
5. If any placement is invalid, none of that plan is partly spent or committed.

- **Undo** reverses the last uncommitted staging edit. It does not rewind live time or undo an earlier Apply.
- **Cancel** releases the whole uncommitted plan.
- A proposal is only a marker. It does not grow, emit, transform, block routes, or count for tasks before Apply.
- Existing organisms, pending germinations, hazards, and Transformations continue while a plan is open.

### Immediate planting mode

**Frequent reference**

- The main-menu setting **Stage plantings before applying** can be disabled when no proposals are waiting.
- With staging disabled, confirming the quantity commits that single attempt immediately using the same costs, habitat requirements, direction, and concealed germination rules.

### Concealed germination

**Essential**

- Seeds/Spores are spent when an attempt is committed, whether it eventually succeeds or fails.
- Success is privately determined at commitment but remains visually concealed until the public timer ends.
- Success and failure use the same marker, progress, Inspector text, and timing. There should be no visual or environmental clue.
- A pending attempt occupies its hex but is not yet a living organism and emits nothing.
- On reveal, success creates the organism at 0%; failure frees the hex. There is no refund.

**Provisional:** the current reveal is six garden hours, or about 30 seconds at 1×. It is implemented and useful to display dynamically, but has not been approved as permanent balance copy.

## 9. Plant lifecycle, production, hazards, and harvesting

### Lifecycle

| Progress | Stage |
| --- | --- |
| 0–100% | Growth |
| 100–200% | Ripening |
| 200% | Mature; the Plant remains until harvested, transformed, or killed |

**Essential**

- Reaching 100% is the end of Growth, not a universal “best harvest now” signal.
- Every Plant has its own lifecycle duration, productive curve, Leaf timing, Seed timing, and environmental response.
- The lifecycle bar and markers show the known timing of collectable products. The Inspector shows what would actually be collected **now**.
- Moisture, Temperature, Illumination, Mycelial ground, and cultivation Effects can separately change lifecycle speed and output.
- Harvesting is a single destructive action: collect the current products and remove the Plant.
- Drag a living Plant into Inventory to harvest it. Any provided non-drag harvest action must obey the same rules.
- A living Plant or Fungus cannot be freely relocated. Dragging it to Inventory means destructive harvest, not temporary storage.
- If the complete output cannot safely fit, harvesting must fail without deleting the Plant or losing products.

### Production

**Frequent reference**

- Leaves belong to the Plant that was harvested: Carrot Leaves, Beanstalk Leaves, and so on. Leaves are not a pooled generic crop.
- A Plant's Seeds may belong to itself, another species, two species, or no species, depending on its discovered profile.
- Ordinary output is earned while progress passes through productive intervals under the Conditions and Effects that existed then. It is not recalculated from only the final harvest state.
- Ordinary Leaves may decline later in Ripening. Harvesting too late can trade Leaf yield for Seed yield.
- Extra hourly output is banked separately during its stated window.
- Whole items are awarded at harvest; the game may internally track fractional accrual until then.
- Rare trophies and exceptional harvest rules belong on their discovered species pages.

### Hazards

**Frequent reference**

- Plants can have continuous exposure clocks for Dry, Scorching, Freezing, Mycelial ground, or a species-specific condition such as Bright.
- Each hazard clock is independent. Ending that hazard resets its continuous timer without erasing other exposure clocks.
- A suboptimal Condition may merely slow growth or reduce output; it is not automatically lethal.
- A species-specific Dormancy can stop lifecycle progress and new output without stopping elapsed exposure clocks. Its exact trigger is discovery-sensitive.
- Exact vulnerabilities and thresholds are discovery-sensitive species information.
- A valid Transformation completing at the exact same simulated moment as lethal exposure takes priority.
- If an organism dies before harvest, its uncollected production is lost when the organism is removed.

## 10. Fungus lifecycle and habitats

### Lifecycle and harvest

| Progress | Stage |
| --- | --- |
| 0–100% | Growth |
| 100–200% | Sporulation |
| 200% | Mature; it remains alive and emitting until harvested or killed |

**Essential**

- A successfully germinated Fungus begins emitting its ordinary Influences immediately, during both stages and after 200% while alive.
- Spores accrue during Sporulation. Harvesting a Fungus collects its own species' Spores and removes the Fungus and all of its emissions.
- A living directional Fungus keeps the heading chosen before Apply; it cannot be moved or re-aimed in ordinary play.
- Mycelord is the dedicated source of Mycelial ground and has no ordinary environmental or cultivation package.
- Fungus death removes the source, its emissions, and any unharvested Spores.

### Mycelial affinity

| Affinity | Meaning at the Fungus's own hex |
| --- | --- |
| Independent | Does not require Mycelial ground |
| Preferring | Functions without it, but explicitly marked parts of its cultivation package become stronger on Mycelial ground |
| Dependent | Requires Mycelial ground for germination; losing it begins a grace period before death |

**Frequent reference**

- A dependent Fungus continues emitting during its habitat-loss grace period while still alive.
- Restoring Mycelial ground before the grace period ends resets the danger.
- The receiving Plant does not need Mycelial ground. Only the Fungus source's habitat is relevant to these affinity labels.
- Mycelord is not dependent, but sustained Flooded exposure is dangerous to it and also prevents its hex from supporting colony connections.

**Provisional:** the current Fungus Growth/Sporulation durations, Spore yield, generic Spore germination chance, and 48-hour habitat/death tuning are playtest values. The chapter should use live UI values or avoid engraving them as permanent rules until approved.

## 11. Mycelial ground

**Essential**

- Mycelial is a separate ground overlay, not Moisture, Temperature, Illumination, or a permanent terrain material.
- Mycelord establishes its own timed colony contribution. New ground colonizes gradually from supported neighbouring Mycelial hexes.
- Flooded hexes cannot be newly colonized and cannot carry ongoing support between a colony and its Mycelord.
- Root Barriers and other Blockers that match Mycelial can stop spread and sever support.
- A severed contribution stops expanding immediately but retreats gradually rather than vanishing at once.
- Restoring a valid connection before retreat removes a hex can rescue the surviving overlay. Already lost ground must regrow normally.
- Several Mycelords can overlap. A hex stays Mycelial while at least one contribution remains there.

**Frequent reference**

- Flooded terrain is both a potential Waterborne route and a barrier to Mycelial support. These are separate systems with opposite spatial uses.
- Mycelial ground generally slows Plant growth and ordinary output and may advance a Plant's species-specific hazard clock.
- Mycelial-preferring and -dependent labels describe the Fungus's **source hex**, not where the receiving Plant stands.
- Recalculating the garden without advancing time cannot create free colonization or force instant retreat.

**Provisional:** current spread and retreat intervals are test balance. General topology and support rules are stable; exact durations should be displayed from live data only after approval.

## 12. Transformations

### General rules

**Essential, discovery-sensitive**

- A Transformation changes one living Plant species into another.
- Most recipes combine currently resolved environmental Conditions, actual contact from one or more named living Fungi, and uninterrupted garden time.
- Some recipes require a sequence or event: prepare under one state, then change or remove something within a window. Rare routes may be environmental-only.
- A named Fungus counts only if one of its real, unblocked ordinary footprints reaches the Plant. Adjacency alone is not enough.
- Transformation contact may come from the Fungus's environmental footprint or cultivation footprint.
- Transformations are not gated by the Plant's current Growth/Ripening percentage, output, or the magnitude of a cultivation bonus.
- Interrupting a required state or contact resets that continuous recipe clock unless the discovered recipe explicitly describes a prepared transition.
- A completed Transformation replaces the old Plant with a fresh 0%-Growth Plant. Old production, exposure, and transient clocks do not carry into the new organism.

### What the player is allowed to know

- Unknown activity may show only **Unusual botanical activity…** without revealing a destination, recipe, or timer.
- After a route has been successfully witnessed, the Grimoire may record the actual destination, resolved Conditions, qualifying contacts, timing, and sequence that were observed.
- Discovering one compatible Fungus or route does not reveal every alternative, sibling destination, or unwitnessed recipe.
- A failed attempt, partial timer, theoretical eligibility, or hidden germination does not unlock a recipe.

### Troubleshooting a Transformation

A reference should prompt the player to check:

1. Is the correct source Plant alive?
2. Are the **resolved**, not merely baseline, Conditions correct?
3. Is every required named Fungus alive?
4. Does an actual environmental or cultivation footprint reach the Plant?
5. Is a matching Blocker cutting one of those footprints?
6. Is a Waterborne network continuous where required?
7. Has the state/contact remained uninterrupted for the required time?
8. Is the recipe waiting for a transition, removal, thaw, drain, or light change rather than simple continued waiting?

Exact answers remain on discovered species pages and witnessed recipe records.

## 13. Inventory and item identity

**Essential**

- An Inventory square stores an item identity or one individually tracked temporary Garden Tool; it is not one unit of a stack.
- Seeds, Spores, and Leaves of different species are distinct identities.
- Ordinary Seed/Spore/Leaf and Blocker stacks can hold many units in one square.
- Each temporary Garden Tool is individually tracked because it can have its own remaining lifetime and heading; identical tools therefore occupy separate squares.
- The current progression garden begins with 20 available squares and can expand toward the 200-square maximum. The full Inventory is arranged as four bags of up to 50 squares.
- Players can rearrange stacks without changing ownership. Positions persist.
- Filters change what is shown, not where the stacks are stored.
- Discard permanently removes a selected stack after confirmation. Staged stock must first be released.
- Blocker forms stack by exact identity: an Edge form and Full Hex form are separate Inventory entries.

**Frequent reference**

- A new item identity needs a free square. Adding to an existing stack does not.
- Harvests, purchases, and task rewards validate capacity before destructive or spending actions. They must not partially award a bundle or silently lose an item.
- Deploying a temporary Garden Tool frees its Inventory square. If the Inventory later becomes full, returning that tool must be refused safely while leaving it active in the garden.
- Inventory colours distinguish Seed, Leaf, Spore, Item, and Blocker categories. Hover details explain the selected identity and known effects.

## 14. Temporary Garden Tools

**Essential**

- Garden Tools are temporary environmental Sources with fixed effects. They are emergency aids and precision tools, not living Fungi.
- A deployed tool occupies one hex and immediately changes the environment through its listed Range or directional Budget footprint.
- Its lifetime runs only while deployed. Returning it to Inventory pauses and preserves the remaining time.
- Move a deployed tool directly to another empty hex without returning it to Inventory first.
- Directional tools can be freely rotated after deployment. Moving or rotating does not reset their lifetime.
- At zero remaining active time, the tool expires permanently and frees its hex.
- The global simulation speed changes how quickly active lifetime passes.

**Catalogue cross-reference:** names, artwork, exact modifiers, reach, duration, and unlock collection belong to **Garden Tools**. Hidden collections use runes until unlocked.

## 15. Shop, Gold, tasks, and progression

### Shop and Gold

**Essential**

- Gold is the Shop currency.
- Only named Plant Leaves can currently be sold. Seeds, Spores, trophies, Blockers, and Garden Tools are not sellable.
- Beanstalk Seeds remain free as the recovery route for a player with no Gold.
- Task rewards permanently unlock additional Seed, Spore, Blocker, Garden Tool, land-upgrade, and Inventory-upgrade stock.
- Shop prices and owned quantities are shown before confirmation. Buying or selling is atomic.
- Players choose whether to sell Leaves or reserve them for a delivery task.

**Catalogue cross-reference:** exact current prices and stock belong in the Shop because balance may change. The mechanics chapter should explain the economy, not duplicate a price list that can go stale.

### Tasks

**Essential**

- Main, Side, and Completed tasks live on the Taskboard.
- Completing objectives can make a task **Ready**, but rewards are granted only when the player explicitly claims/completes it.
- Delivery tasks consume the stated named Leaves only when submitted. Falling below the requirement removes readiness.
- Task rewards and unlocks are awarded together. A capacity problem must not consume the task or partially grant the bundle.
- Up to three available tasks can be pinned. Pinning changes the garden tracker, not whether progress counts.
- The Objectives tracker can be collapsed; selecting an entry opens that Taskboard record.
- The Taskboard and tracker do not pause the garden.

### Garden and Inventory expansion

**Frequent reference**

- Progression begins on a 4×4 garden and can unlock row/column purchases.
- The current progression cap is 18 columns × 9 rows; the Shop shows whether another upgrade is available.
- Land expansion preserves the existing layout. A purchase price depends on the number of hexes added.
- Inventory expansion increases available squares without changing existing stacks or their saved arrangement.
- Placed temporary tools and Blockers must be retrieved or moved if shrinking/resizing would otherwise discard them. Ordinary progression currently expands rather than shrinks.

## 16. The Cultivation Grimoire itself

### Knowledge rules

**Essential**

- The Grimoire is knowledge, not ownership. Identifying a species does not grant Seeds/Spores or make it plantable.
- Six base Plants and all current Fungi are identified from the beginning. Other Plant page positions exist under stable rune names until discovered.
- A Plant's first legitimate public appearance—through a successful Transformation or an available Seed germinating—reveals its identity. The discovery remains even if the organism is later harvested, transformed, or killed.
- Plant preferences, hazards, and fungal responses are recorded only after actual resolved observations.
- A Germination Effect can be recorded when it genuinely modifies a committed Seed attempt even if the still-hidden roll later fails; recording the modifier must not reveal that result.
- Fungus pages show their base affinity, environmental reach, and cultivation package from the start.
- Plant pages hold species-specific observed responses and witnessed Transformation recipes.
- A Fungus page's Transformation list may name learned destination Plants but does not reveal every source recipe or hidden alternative.

### Navigation and reference tools

**Frequent reference**

- Selecting a Plant or Fungus portrait in the Inspector opens its exact species page.
- Family openings provide the stable entry list and Transformation Atlas. Anonymous nodes can show the shape of future discoveries without revealing their identities or requirements.
- The Garden Tools and Blockers chapters record unlocked catalogue groups.
- The Index gives stable page references.
- Effect terms can open the shared glossary.
- Page markers and field notes let the player save their own reminders. Purchased paper and marker appearances are permanent stationery unlocks, not consumable items, and do not occupy Inventory squares.
- The Grimoire can remain open beside the live garden. Reading it does not pause time.

### Inspector versus Grimoire

| Surface | Best used for |
| --- | --- |
| Inspector | Current Conditions, current yield, active Effects, present timing, remaining lifetime, and immediate warnings |
| Species page | Persistent observed preferences, hazards, responses, identity, illustration, and witnessed recipes |
| Fungus page | Canonical base emissions, cultivation package, affinity, and learned destination links |
| Garden Tools / Blockers | Catalogue effects, forms, filters, and unlocked collections |
| Mechanics reference | System-wide rules that do not belong to one species or item |

## 17. Garden controls and preferences

### Garden interaction

**Essential**

- Select a hex to inspect it.
- Drag a Seed/Spore stack to a valid hex, or select the stack and then select a valid hex.
- Drag a living Plant/Fungus into Inventory to harvest it.
- Drag a temporary Garden Tool or Blocker to move it; drag/return it to Inventory to retrieve it.
- Drag empty garden space with the primary button to pan. Middle-button drag pans from anywhere, including occupied hexes.
- Scroll/pinch or use minus/plus to zoom. **Fit** frames the current plot.
- Resizing the Inventory from its left edge trades visible space with the garden without changing hex size or Inventory-square size.

### Main-menu preferences

**Frequent reference**

- Stage plantings before applying: plan several attempts together, or turn it off to commit one amount on confirmation.
- Simplified hex fills: changes terrain presentation, not Conditions or rules.
- Keep Inspector in front of Grimoire: changes layering only.
- Simulation speed and presentation preferences are browser UI preferences rather than biological traits.

### Keyboard and accessibility inventory

The eventual reference should include or link to a short control sheet after the final input pass:

- Escape closes the active menu/dialog/book surface where supported.
- Grimoire arrow controls/page margins turn pages; book controls support keyboard focus.
- Inventory resizer and rotation controls have keyboard alternatives.
- Hover-only explanations also need focus access.
- Reduced-motion presentation keeps essential state without relying on animation.

Exact keyboard, touch, and controller mappings should be verified as a separate input audit before they are printed as complete.

## 18. Saving, loading, and recovery

**Essential**

- The garden autosaves in the current browser after updates.
- Browser autosave is local, not cloud storage. Clearing site data or changing browsers can lose it.
- **Save Game** downloads a portable `.ccsave` backup containing the full current garden, including Inventory arrangement, uncommitted staging, pending germination, tasks, discoveries, Shop state, journal, and deployed objects.
- **Load Game** validates a compatible `.ccsave` or supported older `.json`, then asks before replacing the current browser garden.
- Portable backups can be moved to another browser/device.
- There is no simulation catch-up for time spent with the game closed.
- **New garden** replaces current progress after confirmation; saving a backup first is recommended.

## 19. Likely player questions the chapter should answer

These questions are a useful completeness test when choosing the eventual spreads.

### Reading and environment

- What do the fill, border, illumination medallion, lower bar, and Mycelial overlay mean?
- Why does the Inspector show a different Condition from the baseline?
- Why did removing a Fungus/tool change several hexes immediately?
- Why did a neighbouring extreme change this hex?
- Why did two opposing effects cancel?

### Reach and blocking

- Why is the Fungus affecting one Plant but not the adjacent one?
- What is the difference between Range and Budget?
- What is the difference between Airborne and Waterborne?
- Why did a Waterborne effect suddenly reach the whole canal—or stop at a Damp gap?
- Why did the effect go around my Blocker?
- Which Blocker stops this particular environmental/cultivation/Mycelial effect?

### Planting and time

- Have staged Seeds/Spores already been spent?
- What do Apply, Undo, and Cancel actually reverse?
- Why did Apply reject the whole plan?
- Why can I not plant a dependent Fungus here?
- Why does pending germination emit nothing?
- Does opening the book or Taskboard pause the garden?
- What does changing speed affect?

### Growth and harvest

- Is 100% the best time to harvest?
- Why are Leaves falling while Seeds rise?
- Why did a late helpful Fungus not increase everything already earned?
- Why did this Plant produce a different species' Seeds—or no Seeds?
- Why did harvesting remove the organism?
- Why was harvest refused when the Inventory was full?
- Why did my Plant die, and did its danger timer reset?

### Fungi and Mycelial

- When does a Fungus begin emitting?
- What is the difference between independent, preferring, and dependent?
- Does the Plant also need to stand on Mycelial ground?
- Why is Mycelial not spreading through Flooded ground?
- Why is a cut colony fading gradually instead of disappearing?
- Why did a dependent Fungus keep emitting after losing Mycelial?
- Why is Mycelord endangered by Flooded ground?

### Transformations and discovery

- Why has a Transformation not started even though the Fungus is nearby?
- Does Plant maturity matter to Transformation eligibility?
- What interrupts a Transformation timer?
- Why is the Inspector only saying “Unusual botanical activity”?
- Why did the new Plant return to 0%?
- Why did the Grimoire reveal one route but not every alternative?
- What causes runes to turn into a known Plant name?

### Inventory, tools, and progression

- Why do identical Garden Tools occupy separate squares?
- Does returning a Garden Tool pause its timer?
- Can I move a tool or Blocker directly?
- Why can I not retrieve a deployed tool into a full Inventory?
- Which items can be sold?
- When are task rewards actually granted or delivery Leaves consumed?
- Does pinning a task activate it?
- What is saved locally, and how do I make a portable backup?

## 20. Material that should primarily remain elsewhere

The mechanics chapter should avoid becoming a duplicate encyclopaedia.

| Information | Primary home |
| --- | --- |
| Exact Plant preferences, yields, hazards, Seed identities, traits, and recipes | Discovered Plant pages |
| Fungus environmental/cultivation numbers, propagation, affinity, and learned destinations | Fungus pages |
| All 26 temporary tool effects, reach, lifetime, and unlock collections | Garden Tools |
| Blocker artwork, forms, availability, and filters | Blockers |
| Current prices and unlocked Shop stock | Shop |
| Exact objective instructions, hints, rewards, and delivery progress | Taskboard |
| Current yield, current Conditions, present Effects, warnings, and timers | Inspector |
| Personal experiments and reminders | Field notes and page markers |
| Developer-only controls and internal simulation diagnostics | Developer documentation, not the ordinary Grimoire |

The mechanics chapter should explain how these records relate, then provide links/page references rather than repeating every entry.

### Implemented or approved concepts that currently need no ordinary lesson

- Harvest Allocation remains represented in the rules/glossary, but no current V8 Fungus emits an Allocation Effect. It does not deserve player-reference space unless accessible content begins using it again.
- Anchored Sources and unrestricted baseline editing exist for developer testing, not ordinary play.
- Raw simulation ordering, save-schema versions, migration rules, and deterministic route seeds are verification details rather than player mechanics.

## 21. Open content decisions before page planning

1. **Chapter name:** Mechanics, Gardencraft, Field Manual, Cultivation Principles, or another in-world title.
2. **Visibility:** whether the entire chapter is available immediately or advanced spreads unlock alongside the mechanics they describe. The safest default is always-available general rules with discovery-sensitive examples omitted.
3. **Depth of arithmetic:** conceptual ladders and diagrams only, or explicit formulas for germination, stacking, production, and Allocation.
4. **Provisional values:** whether current test durations appear dynamically, are labelled “current field estimate,” or are omitted until balanced.
5. **Duplication:** whether the Blocker filter table appears here as a quick reference or only points to the Blockers tab.
6. **Cross-navigation:** which words should jump to a species, Fungus, Garden Tool, Blocker, glossary term, or another mechanics spread.
7. **Troubleshooting format:** integrated sidebars beside each rule versus a dedicated “Why didn't this work?” spread.
8. **Controls:** whether camera, Inventory, save/load, and book-operation instructions belong in this chapter, a front-of-book help spread, or the main menu's How It Works panel.
9. **Discovery pedagogy:** how much generic Transformation guidance can be shown without making the experimental discovery loop feel solved in advance.
10. **Input completeness:** perform a keyboard/touch/accessibility audit before promising a definitive control reference.
11. **Existing How It Works panel:** keep it as a short onboarding summary, replace it with a direct link to this chapter, or do both.
12. **Indexing:** decide whether common questions such as “Waterborne,” “hazard,” and “pending germination” link directly to the relevant spread from the existing Index/glossary.

## 22. Source audit

This inventory was reconciled against the implemented rules and current documentation, especially:

- `src/core/grid.js`, `influences.js`, `simulation.js`, `adjacency.js`, `cultivation.js`, and `blocking.js`
- `src/core/species.js`, family species modules, `biology.js`, `economy.js`, `staging.js`, `mycelial.js`, and Transformation modules
- `src/core/inventory.js`, `source-items.js`, `source-item-catalog.js`, `blocker-catalog.js`, `shop.js`, and task modules
- Current Inspector, garden, Inventory, Taskboard, Shop, main-menu, and Grimoire UI
- Active system documents under `docs/design/systems/`
- Current progression and catalogue notes under `docs/working/`

Where older prose conflicts with the running game, this inventory follows the current implementation and newer approved decisions. Provisional numeric tuning is labelled rather than silently promoted to permanent player-facing truth.
