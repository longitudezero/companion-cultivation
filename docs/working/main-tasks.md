# Main tasks

> **TASK DESIGN · 29 October 2026.** Three opening tasks are recorded below. The guided transformation, Carrot care, and two-transformation challenge are agreed directions. Gold/Spore amounts and the third task's species/title/dialogue are concrete first-pass design choices for review and later balancing. Fields explicitly marked **TBD** or **proposed** remain open. No task is implemented.

**Early reward baseline:** 10 / 15 / 30 Gold for Tasks 1 / 2 / 3; 8 Dewmender Spores from Task 1 and 8 each of Rilllace and Droughtcap from Task 2. **None of these three tasks awards garden hexes or inventory slots.** Shop prices are not yet set, so these amounts are not a finalized economy.

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
**Status:** Agreed two-transformation challenge with a loose clue for one target and independent experimentation for the other. Potato/Onion targets, dialogue, and 30 Gold are first-pass design choices.  
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

Both actual **Beanstalk → Potato** and **Beanstalk → Onion** transformations have been recorded, once each, in either order. This requires two transformed Plants, not two transformations of the same Beanstalk. Progress is cumulative: the results do not both need to remain alive together, and no Leaves or Plants are delivered/consumed to finish this discovery task. Owning Seeds alone is not proof of transformation.

Recognition of discoveries made before this task becomes available remains part of the shared open retroactive-credit decision; it must be settled before implementation.

**Unlocks:**

- **30 Gold**.
- Continuation toward the first Leaf-delivery task; that record is still to be designed.
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
