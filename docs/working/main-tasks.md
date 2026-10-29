# Main tasks

> **TASK DESIGN · 29 October 2026.** The two opening task concepts are agreed. Entries preserve those decisions; fields marked **TBD** or **proposed** are not finalized. The task system is not implemented.

[Task organization and progression](task-organization.md) defines the fields and shared rules. [Side tasks](side-tasks.md) are maintained separately.

## M-3KJ45T

**ID:** M-3KJ45T  
**Order:** 1  
**Name:** My First Transformation  
**Status:** Agreed transformation and guided introduction; description is a draft. Exact starting quantities, Gold reward, and detailed presentation pending.  
**Prerequisites:** Start a new progression game.

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
- **Dewmender Spores immediately upon this transformation**, so the new care task is actionable. Quantity **TBD**; 8 was previously proposed.
- Gold: **TBD**.
- No garden row/column or inventory-capacity reward has yet been assigned to this task.

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
**Status:** Agreed immediate care objective and instructor voice; exact rewards and detailed presentation pending.  
**Prerequisites:** M-3KJ45T completes.

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

- Progression to the next introductory discovery task; that task's final record is still to be designed.
- Gold: **TBD**.
- Garden row/column and inventory-capacity rewards: **not yet assigned**. The designer will choose the reward milestones and expansion orientation while balancing the chain.

**Design notes:**

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
