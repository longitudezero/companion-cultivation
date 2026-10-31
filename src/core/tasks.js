import { createGarden } from './grid.js';
import { calculateEnvironment } from './simulation.js';
import { ensureInventorySlots } from './inventory.js';

export const FIRST_TASK = 'M-3KJ45T';
export const CARE_TASK = 'M-8NQ2VC';
export const TASK_IDS = [FIRST_TASK, CARE_TASK];
export const TASKS = {
  [FIRST_TASK]: {
    id: FIRST_TASK, title: 'My First Transformation', speaker: 'Instructor',
    description: ["Welcome to the guild’s gardening department. Your first assignment is to grow a Beanstalk.",
      'Then turn it into a Carrot.', 'Yes, those are the instructions. The fungus will help.'],
    instructions: ['Drag Beanstalk Seeds onto an empty hex, choose an amount, and Apply. Four Seeds guarantee germination in this tutorial.',
      'Plant Prismorel nearby. Four Spores guarantee germination. Its light and living fungal influence must reach the Beanstalk.',
      'Keep the Beanstalk Dry, Temperate and Dim with Prismorel contact for 50 seconds at 1×. Ordinary starting soil is Dark; Prismorel adds the light.'],
    rewards: { gold: 10, spores: { Dewmender: 8 } },
    completion: ['A Carrot! Excellent. That’s your first transformation.',
      'Your Carrot has a small complaint about the accommodation. Specifically, the complete lack of moisture.',
      'Take these Dewmender Spores. Let’s fix that before the complaint becomes a funeral.'],
  },
  [CARE_TASK]: {
    id: CARE_TASK, title: 'A Thirsty Carrot', speaker: 'Instructor',
    description: ['Your first transformation was a success! Congratulations!',
      'Unfortunately, Carrot prefers damp soil, and you’ve grown it somewhere considerably less damp.',
      'That’s fine. We can fix that.', 'Also, it’s going to FREAKING DIE if you don’t.',
      'Seriously. There’s a death timer. Select your Carrot and look in the Inspector.', 'No pressure.'],
    instructions: ['Select your Carrot to see its Dry exposure timer.',
      'Sow Dewmender near the Carrot so its Wetting environmental influence reaches the Carrot’s hex.',
      'Bring the Carrot’s resolved soil moisture to Damp. This does not require Dewmender’s separate cultivation contact or another transformation.'],
    rewards: { gold: 15, spores: { Rilllace: 8, Droughtcap: 8 } },
    completion: ['There. Damp soil. Living Carrot. A much better arrangement.',
      'You’ve learned how to change a Plant and how to stop the result from dying. We consider both useful skills.',
      'Take these Rilllace and Droughtcap Spores. Your next assignment involves a little less instruction.'],
  },
};

export function createTaskProgress() {
  return { version: 1, gold: 0, ready: [], claimed: [], pinned: [FIRST_TASK],
    milestones: { beanstalk: false, prismorel: false }, trackerCollapsed: false };
}

export function createTutorialGarden() {
  const garden = createGarden(4, 4);
  // A playtest starter bundle; capacity/family progression is outside this pass.
  return ensureInventorySlots({ ...garden, tasks: createTaskProgress(),
    inventory: { ...garden.inventory, seeds: { Beanstalk: 36 }, spores: { Prismorel: 8 } } });
}

export function normalizeTaskProgress(saved) {
  if (saved?.version !== 1 || !Number.isSafeInteger(saved.gold) || saved.gold < 0
    || !Array.isArray(saved.claimed) || !Array.isArray(saved.ready) || !Array.isArray(saved.pinned)) {
    throw new Error('Invalid or unsupported task progress.');
  }
  const ids = values => [...new Set(values.filter(id => TASK_IDS.includes(id)))];
  const claimed = ids(saved.claimed);
  if (claimed.includes(CARE_TASK) && !claimed.includes(FIRST_TASK)) throw new Error('Invalid task order.');
  const ready = ids([...saved.ready, ...claimed]).filter(id => id === FIRST_TASK || claimed.includes(FIRST_TASK));
  return { version: 1, gold: saved.gold, claimed, ready,
    pinned: ids(saved.pinned).filter(id => !claimed.includes(id) && (id === FIRST_TASK || claimed.includes(FIRST_TASK))).slice(0, 3),
    milestones: { beanstalk: Boolean(saved.milestones?.beanstalk), prismorel: Boolean(saved.milestones?.prismorel) },
    trackerCollapsed: Boolean(saved.trackerCollapsed) };
}

export function taskStatus(garden, id) {
  if (!TASKS[id]) return 'locked';
  if (!garden.tasks) return id === FIRST_TASK ? 'not-started' : 'locked';
  if (garden.tasks.claimed.includes(id)) return 'completed';
  if (id === CARE_TASK && !garden.tasks.claimed.includes(FIRST_TASK)) return 'locked';
  return garden.tasks.ready.includes(id) ? 'ready' : 'active';
}

export function updateTaskProgress(garden, previous = garden) {
  if (!garden.tasks || garden.tasks.claimed.length === TASK_IDS.length) return garden;
  const tasks = garden.tasks, milestones = { ...tasks.milestones }, ready = new Set(tasks.ready);
  const plants = Object.entries(garden.objects).filter(([, object]) => object.type === 'plant');
  const environment = calculateEnvironment(garden);
  if (!tasks.claimed.includes(FIRST_TASK)) {
    if (plants.some(([, object]) => object.species === 'Beanstalk')) milestones.beanstalk = true;
    if (plants.some(([key, object]) => object.species === 'Beanstalk' &&
      (environment.modifiers[key]?.Illumination || []).some(effect => effect.influence === 'Brightening'
        && effect.modifier > 0 && garden.objects[effect.source]?.species === 'Prismorel'))) milestones.prismorel = true;
    if (plants.some(([key, object]) => object.species === 'Carrot'
      && previous.objects[key]?.type === 'plant' && previous.objects[key]?.species === 'Beanstalk')) {
      ready.add(FIRST_TASK); milestones.beanstalk = true; milestones.prismorel = true;
    }
  } else if (plants.some(([key, object]) => object.species === 'Carrot' && environment.conditions[key]?.Moisture === 'Damp'
    && (environment.modifiers[key]?.Moisture || []).some(effect => effect.influence === 'Wetting' && effect.modifier > 0
      && garden.objects[effect.source]?.type === 'fungus' && garden.objects[effect.source]?.species === 'Dewmender'))) {
    ready.add(CARE_TASK);
  }
  if (ready.size === tasks.ready.length && milestones.beanstalk === tasks.milestones.beanstalk
    && milestones.prismorel === tasks.milestones.prismorel) return garden;
  return { ...garden, tasks: { ...tasks, ready: [...ready], milestones } };
}

export function taskObjectives(garden, id) {
  const finished = ['ready', 'completed'].includes(taskStatus(garden, id));
  return id === FIRST_TASK ? [
    { text: 'Grow a Beanstalk', done: finished || Boolean(garden.tasks?.milestones.beanstalk) },
    { text: 'Reach it with Prismorel’s light', done: finished || Boolean(garden.tasks?.milestones.prismorel) },
    { text: 'Transform the Beanstalk into a Carrot', done: finished },
  ] : [{ text: 'Keep a living Carrot on Damp soil reached by Dewmender’s Wetting', done: finished }];
}

export function claimTask(garden, id) {
  if (!TASKS[id] || taskStatus(garden, id) !== 'ready') throw new Error('This task is not ready to complete.');
  const reward = TASKS[id].rewards;
  const spores = { ...garden.inventory.spores };
  for (const [species, quantity] of Object.entries(reward.spores)) {
    const total = (spores[species] || 0) + quantity;
    if (!Number.isSafeInteger(total)) throw new Error('Spore quantity is too large to collect this reward.');
    spores[species] = total;
  }
  if (!Number.isSafeInteger(garden.tasks.gold + reward.gold)) throw new Error('Gold balance is too large to collect this reward.');
  const pinned = garden.tasks.pinned.filter(task => task !== id);
  if (id === FIRST_TASK && garden.tasks.pinned.includes(id)) pinned.push(CARE_TASK);
  // Validate the whole bundle before exposing Gold, a claim, or an unlock.
  const next = ensureInventorySlots({ ...garden, inventory: { ...garden.inventory, spores },
    tasks: { ...garden.tasks, gold: garden.tasks.gold + reward.gold,
      claimed: [...garden.tasks.claimed, id], pinned } });
  return updateTaskProgress(next);
}

export function toggleTaskPin(garden, id) {
  if (!garden.tasks || !['active', 'ready'].includes(taskStatus(garden, id))) return garden;
  const pinned = garden.tasks.pinned.includes(id) ? garden.tasks.pinned.filter(task => task !== id) : [...garden.tasks.pinned, id];
  if (pinned.length > 3) throw new Error('Pin up to three tasks at a time.');
  return { ...garden, tasks: { ...garden.tasks, pinned } };
}
