# Main tasks

> **TASK DESIGN · 29 October 2026.** Four opening tasks are recorded below. Tasks 3 and 4 have been reviewed in full and accepted, including Task 3's no-retroactive-credit rule and Task 4's harvest-timing warning. Reward values remain subject to later economy playtesting; fields explicitly marked **TBD** or **proposed** remain open. No task is implemented.

**Early reward baseline:** 10 / 15 / 30 / 40 Gold for Tasks 1 / 2 / 3 / 4; 8 Dewmender Spores from Task 1, 8 each of Rilllace and Droughtcap from Task 2, and 8 Emberbolete Spores from Task 4. **None of these four tasks awards garden hexes or inventory slots.** Shop prices are not yet set, so these amounts are not a finalized economy.

[Task organization and progression](task-organization.md) defines the fields and shared rules. [Side tasks](side-tasks.md) are maintained separately.

## M-3KJ45T

**ID:** M-3KJ45T  
**Order:** 1  
**Name:** My First Transformation  
**Status:** Agreed transformation and guided introduction; dialogue and 10 Gold / 8 Dewmender Spores are first-pass balance. Starting inventory quantities and detailed presentation remain open.  
**Prerequisites:** Start a new progression game.  
**Speaker:** Instructor

**Description:**

Welcome to the guild's gardening department. Your first assignment is to grow a Beanstalk.

Then turn it into a Carrot.

Yes, those are the instructions. The fungus will help.

**Objectives:**

1. Drag Beanstalk Seeds from inventory onto an empty hex and apply the planting. Wait for the Beanstalk to emerge.
2. Plant **Prismorel** nearby. Position it and set its direction so both its light and its living fungal contact reach the Beanstalk.
3. Keep the Beanstalk in **Dry, Temperate, Dim** conditions with living **Prismorel contact** until the transformation finishes.

**Completion:**

A Beanstalk actually transforms into a Carrot under the approved recipe: **10 continuous simulated garden hours** with the stated conditions and contact. This is **50 real seconds at 1×**, after the conditions and contact are established; germination and setup are additional time. Task completion follows the actual transformation event, not a separate wall-clock countdown.

**Unlocks:**

- **A Thirsty Carrot — M-8NQ2VC.**
- **8 Dewmender Spores immediately upon this transformation**, so the new care task is actionable without waiting for another reward claim.
- **10 Gold**.
- **No new hexes or inventory slots.**

**Completion dialogue:**

A Carrot! Excellent. That's your first transformation.

Your Carrot has a small complaint about the accommodation. Specifically, the complete lack of moisture.

Take these Dewmender Spores. Let's fix that before the complaint becomes a funeral.

**Design notes:**

- The first tutorial task starts pinned. This is the intentionally fully explained recipe; ordinary discovery tasks later use hints.
- Use ordinary **Dry, Temperate, Dark** starting terrain. Prismorel supplies +1 Illumination, making the target Dim. There is no special tutorial patch or gifted temporary Source item for this transformation.
- The proposed starter bundle is **36 Beanstalk Seeds and 8 Prismorel Spores**; exact quantities remain unconfirmed. The broader agreed range is approximately 20–50 Beanstalk Seeds and only the needed initial Spores.
- Suggested guided sowing amounts are **4 Seeds** and **4 Spores**, guaranteeing germination under the current additive 28%-per-Beanstalk-Seed and 25%-per-Spore rules. These are tutorial presentation proposals, not additional starting resources.
- Dewmender is used in the next task. It is not the Fungus for the first Carrot transformation.

## M-8NQ2VC

**ID:** M-8NQ2VC  
**Order:** 2  
**Name:** A Thirsty Carrot  
**Status:** Agreed immediate care objective and instructor voice; 15 Gold / 8 each of Rilllace and Droughtcap Spores are first-pass balance. Detailed presentation remains open.  
**Prerequisites:** M-3KJ45T completes.  
**Speaker:** Instructor

**Description:**

Your first transformation was a success! Congratulations!

Unfortunately, Carrot prefers damp soil, and you've grown it somewhere considerably less damp.

That's fine. We can fix that.

**Also, it's going to FREAKING DIE if you don't.**

Seriously. There's a death timer. Select your Carrot and look in the Inspector.

No pressure.

**Objectives:**

1. Select your Carrot and look at its Dry exposure/death timer in the Inspector.
2. Plant Dewmender near your Carrot so its **Wetting environmental influence** reaches the Carrot's hex.
3. Raise the Carrot's resolved soil moisture to **Damp**.

**Completion:**

A living Carrot is on a hex with resolved **Damp** moisture reached by Dewmender's Wetting environmental influence. This is an environmental care objective; it does not require a new transformation or Dewmender's separate Waterborne cultivation contact. No additional waiting duration is currently specified.

**Unlocks:**

- **Well, I'm Sure You Can Figure It Out — M-6PT9RX.**
- **8 Rilllace Spores**.
- **8 Droughtcap Spores**.
- **15 Gold**.
- **No new hexes or inventory slots.**

**Completion dialogue:**

There. Damp soil. Living Carrot. A much better arrangement.

You've learned how to change a Plant and how to stop the result from dying. We consider both useful skills.

Take these Rilllace and Droughtcap Spores. Your next assignment involves a little less instruction.

**Design notes:**

- Rilllace and Droughtcap are the two newly rewarded Fungi. Together with existing Dewmender, they supply the tools for the next Potato/Onion discoveries. Prismorel remains available, for a total of four Fungus species.
- Teach that **transformation conditions** and **good growing conditions** are different.
- Dewmender Spores come immediately from M-3KJ45T; do not make the player solve this care task before receiving them.
- Carrot's continuous Dry death threshold is already **240 garden hours = 20 real minutes at 1×**. It is 40 minutes at 0.5× and 10 minutes at 2×; Pause stops exposure. Reaching non-Dry conditions resets the Dry exposure clock. Other Carrot hazard timers are unchanged.
- The care task itself is not implemented. The recipe and extended Dry threshold are already implemented separately.
- Suggested compact pinned text:

  > **A Thirsty Carrot**
  >
  > Raise Carrot's moisture to Damp.
  >
  > Your Carrot is dying. Just thought you should know.

## M-6PT9RX

**ID:** M-6PT9RX  
**Order:** 3  
**Name:** Well, I'm Sure You Can Figure It Out  
**Status:** Agreed design: Potato and Onion, loose guidance for Potato, no recipe clue for Onion, 30 Gold, and no credit for transformations completed before availability. Not implemented.  
**Prerequisites:** M-8NQ2VC completes; its Rilllace and Droughtcap Spore rewards are available.  
**Speaker:** Instructor

**Description:**

The kitchen has requested Potatoes and Onions. Apparently, "another Carrot" does not count as a varied menu.

For Potato, think of a cool cellar and soil that hasn't turned to dust.

For Onion? Well, I'm sure you can figure it out.

I'm calling this "independent research" because "I need a tea break" apparently looks bad on the training forms.

**Objectives:**

1. Transform a Beanstalk into a **Potato**.
2. Transform another Beanstalk into an **Onion**.

**Completion:**

Both actual **Beanstalk → Potato** and **Beanstalk → Onion** transformations have been recorded **after this task becomes available**, once each, in either order. This requires two transformed Plants, not two transformations of the same Beanstalk. Progress is cumulative: the results do not both need to remain alive together, and no Leaves or Plants are delivered/consumed to finish this discovery task. Owning Seeds alone is not proof of transformation.

**Earlier transformations do not count for this task.** Existing Grimoire discoveries remain recorded, but both qualifying transformation events must occur after task availability. A Beanstalk planted earlier may qualify if its transformation happens after the task unlocks.

**Unlocks:**

- **30 Gold**.
- **Leaves, Please — M-4HV7LK.**
- **No new hexes or inventory slots.**
- No additional Fungus reward assigned at this point.

**Completion dialogue:**

Potatoes and Onions. You figured it out.

I'd like it recorded that I had complete confidence in you. Preferably before anyone reads the training forms.

The kitchen is delighted. Next, we'll discuss harvesting. They have specifically requested that we stop sending them entire garden hexes.

**Design notes — not player-facing recipe instructions:**

- **Potato:** Beanstalk in **Damp, Cold** with living **Rilllace contact** for **20 garden hours = 1m 40s at 1×**. Dewmender provides Wetting; Rilllace provides Cooling. The latter's directional environmental route and separate contact must both be positioned correctly.
- **Onion:** Beanstalk in **Dry, Cold** with living **Droughtcap contact** for **14 garden hours = 1m 10s at 1×**. Rilllace supplies Cooling; Droughtcap supplies the required contact and can offset Wetting if needed.
- The existing roster uses Rilllace's **Cooling −1** and Droughtcap's **Drying −1** environmental effects. Both have **Airborne cultivation contact at Range 1**, so neither target needs a Flooded network.
- These recipes use the ordinary starting terrain and the four available Fungus species. They do not require a temporary Source item or a capacity upgrade. The 4×4 layout still needs a browser playtest before implementing the quest.
- The player-facing text gives Potato a qualitative clue and Onion no recipe clue. Do not expose these designer recipe notes on the Taskboard or pinned tracker.
- Rice was an earlier discovery candidate, not a locked task. The first-pass pair is now Potato and Onion so Task 2 can introduce **two new Fungi**. Rice remains available for later discovery.
- Eight Spores of each newly awarded species allow two four-Spore plantings under the current 25%-per-Spore germination rule. Exact economy balance can be revisited once store prices are designed.

## M-4HV7LK

**ID:** M-4HV7LK  
**Order:** 4  
**Name:** Leaves, Please  
**Status:** Agreed design, 29 October 2026, including the harvest-timing warning. Eight Carrot Leaves, 40 Gold, and 8 Emberbolete Spores are the accepted initial balance; playtesting may refine it. Not implemented.  
**Prerequisites:** Complete **Well, I'm Sure You Can Figure It Out — M-6PT9RX**.  
**Speaker:** Instructor

**Description:**

The infirmary has requested Carrot Leaves. Apparently, one of our adventurers tried to headbutt a locked door.

The door won.

Let your Carrots grow and check their available harvest in the Inspector. When you're ready, drag a Carrot into your inventory to harvest it. Bring eight Leaves back here.

Don't wait too long, though. Harvest too late and all those lovely Leaves will be gone — you'll be collecting Seeds instead.

The infirmary needs healing ingredients today, not the promise of a Carrot sometime next week.

Harvesting removes the Plant. Yes, including the one you just worked so hard to keep alive.

The circle of life involves considerably more paperwork than you'd expect.

**Objectives:**

1. Grow Carrots and inspect their available Leaf yield.
2. Harvest enough Carrots to collect **8 Carrot Leaves**.
3. Open the Taskboard and select **Deliver Leaves**.

**Completion:**

The player explicitly delivers **8 Carrot Leaves** through the Taskboard.

All eight must be available in inventory together. Delivery consumes exactly eight Leaves; any surplus remains in inventory. Multiple harvests may contribute to the delivery.

Leaves already collected before this task became available can be delivered. This task checks the resources handed over, rather than tracking when they were harvested.

**Unlocks:**

- **40 Gold.**
- **8 Emberbolete Spores.**
- The next introductory task: discovering **Pumpkin**, still to be designed.
- **No new hexes or inventory slots.**

**Completion dialogue:**

Eight Leaves. Correct Plant. Correct part of the Plant. You're already doing better than several departments.

Take these Emberbolete Spores. The kitchen wants Pumpkins next.

Do keep an eye on the temperature. "Warm" and "on fire" are different entries on the incident form.

**Design notes:**

- This teaches growth, reading harvest yields, destructive harvesting, explicit Leaf delivery, and choosing harvest timing before the Leaf yield declines away.
- **Eight Leaves** keeps the first order modest. It does not require a perfect harvest or all eight Leaves from one Plant.
- **40 Gold and 8 Emberbolete Spores** are the accepted initial rewards, subject to later economy playtesting.
- The harvest warning describes existing falling ordinary Leaf yield as Seed yield grows. It does not add a new numerical Leaf-to-Seed conversion rule.
- Emberbolete becomes the player's **fifth Fungus species**, adding another placement demand before the first garden expansion.
- The next recipe would be:

| Transformation | Required conditions | Required living contact | Continuous exposure |
| --- | --- | --- | --- |
| Beanstalk → Pumpkin | Damp, Warm | Emberbolete | 24 garden hours — **2 minutes at 1×** |

- Dewmender can provide moisture. Emberbolete supplies **+2 Temperature**, while Rilllace's **−1 Temperature** can bring the result to Warm. This introduces combining opposing effects.
- **Next milestone direction:** Task 5 asks for the Pumpkin transformation and rewards **+1 row**, expanding the garden from **4 columns × 4 rows to 4 columns × 5 rows: 20 hexes**. The full Task 5 record still needs to be drafted and reviewed in chat. Playtest that the garden feels cramped before the reward is granted.
