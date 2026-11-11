import { createGarden, resizeGarden } from './grid.js';
import { calculateEnvironment } from './simulation.js';
import { ensureInventorySlots, inventoryCapacity, INVENTORY_CAPACITY } from './inventory.js';
import { goldBalance, withGold } from './wallet.js';

import { grantSourceItem } from './source-items.js';
import { grantBlockerItem } from './blocker-items.js';
import { PLANTS } from './species.js';
import { goalDone, goalStatus, taskScene, updateGoal } from './task-goals.js';
import { MAIN_TASKS, FIRST_TASK, CARE_TASK, EXHIBITION_TASK, EXHIBITION_PREVIEWS,
  CONTAINMENT_TASK } from './main-task-definitions.js';

export { FIRST_TASK, CARE_TASK, DISCOVERY_TASK, LEAVES_TASK, PUMPKIN_TASK, INVENTORY_TASK, EXHIBITION_TASK }
  from './main-task-definitions.js';
export const CARROT_DELIVERY_TASK = 'S-5CRTLF';
export const TASKS = {
  [FIRST_TASK]: {
    id: FIRST_TASK, category: 'main', title: 'My First Transformation', speaker: 'Instructor',
    description: ["Welcome to the guild’s gardening department. Your first assignment is to grow a Beanstalk.",
      'Then turn it into a Carrot.', 'Yes, those are the instructions. The fungus will help.'],
    instructions: ['Drag Beanstalk Seeds onto an empty hex, choose an amount, and Apply. Four Seeds guarantee germination in this tutorial.',
      'Plant Prismorel nearby. Four Spores guarantee germination. Its light and living fungal influence must reach the Beanstalk.',
      'Keep the Beanstalk Dry, Temperate and Dim with Prismorel contact for 50 seconds at 1×. Ordinary starting soil is Dark; Prismorel adds the light.'],
    rewards: { gold: 8, spores: { Dewmender: 8 } },
    completion: ['A Carrot! Excellent. That’s your first transformation.',
      'Your Carrot has a small complaint about the accommodation. Specifically, the complete lack of moisture.',
      'Take these Dewmender Spores. Let’s fix that before the complaint becomes a funeral.'],
  },
  [CARE_TASK]: {
    id: CARE_TASK, category: 'main', requires: FIRST_TASK, title: 'A Thirsty Carrot', speaker: 'Instructor',
    description: ['Your first transformation was a success! Congratulations!',
      'Unfortunately, Carrot prefers damp soil, and you’ve grown it somewhere considerably less damp.',
      'That’s fine. We can fix that.', 'Also, it’s going to FREAKING DIE if you don’t.',
      'Seriously. There’s a death timer. Select your Carrot and look in the Inspector.', 'No pressure.'],
    instructions: ['Select your Carrot to see its Dry exposure timer.',
      'Sow Dewmender near the Carrot so its Wetting environmental influence reaches the Carrot’s hex.',
      'Bring the Carrot’s resolved soil moisture to Damp. This does not require Dewmender’s separate cultivation contact or another transformation.'],
    rewards: { gold: 0, spores: { Rilllace: 8, Droughtcap: 8 } },
    completion: ['There. Damp soil. Living Carrot. A much better arrangement.',
      'You’ve learned how to change a Plant and how to stop the result from dying. We consider both useful skills.',
      'Take these Rilllace and Droughtcap Spores. Your next assignment involves a little less instruction.'],
  },
  [CARROT_DELIVERY_TASK]: {
    id: CARROT_DELIVERY_TASK, category: 'side', requires: FIRST_TASK, title: 'A Few Carrot Leaves', speaker: 'Guild Cook',
    description: ['I need five Carrot Leaves for tonight’s soup.',
      'The Carrots can keep their roots. I’m only asking for the leafy bits.'],
    instructions: ['Harvest Carrots while the Inspector shows Leaves available. Harvesting removes the Plant, so check its yield first.',
      'Bring 5 Carrot Leaves to the board. Complete task hands them over together; nothing is taken before you click.'],
    delivery: { species: 'Carrot', quantity: 5 },
    rewards: { gold: 10, spores: {} },
    completion: ['Five Carrot Leaves. Just what the soup needed.', 'Here’s your Gold. Try not to spend it all on more soup.'],
  },
  ...Object.fromEntries([...MAIN_TASKS, CONTAINMENT_TASK].map(task => [task.id, task])),
};

export const TASK_IDS = [FIRST_TASK, CARE_TASK, ...MAIN_TASKS.map(task => task.id), CARROT_DELIVERY_TASK, CONTAINMENT_TASK.id];

function taskUnlocked(task, progress) {
  const requirements = typeof task.requires === 'string' ? [task.requires] : task.requires || [];
  return requirements.every(id => progress.claimed.includes(id))
    && (!task.unlockOn || Boolean(progress.goals?.[task.unlockOn.task]?.[task.unlockOn.goal]?.done));
}

export function taskDelivery(id) {
  const delivery = TASKS[id]?.delivery;
  if (!delivery) return [];
  return delivery.species ? [[delivery.species, delivery.quantity]] : Object.entries(delivery);
}

export function createTaskProgress() {
  return { version: 1, ready: [], claimed: [], pinned: [FIRST_TASK], goals: {},
    milestones: { beanstalk: false, prismorel: false }, trackerCollapsed: false };
}

export function createTutorialGarden() {
  const garden = createGarden(4, 4);
  return ensureInventorySlots({ ...garden, inventoryCapacity: 20,
    shop: { version: 1, gold: 0, unlockedSpores: ['Prismorel'] }, tasks: createTaskProgress(),
    inventory: { ...garden.inventory, seeds: { Beanstalk: 36 }, spores: { Prismorel: 8 } } });
}

function normalizeGoal(goal, state) {
  if (!state || typeof state !== 'object') return null;
  const hours = Number.isSafeInteger(state.hours) && state.hours >= 0 ? Math.min(state.hours, goal.hours || 0) : 0;
  const specimens = Array.isArray(state.specimens) ? state.specimens.filter(item =>
    item && typeof item.key === 'string' && /^-?\d+,-?\d+$/.test(item.key)
    && Object.hasOwn(PLANTS, item.species) && Number.isFinite(item.born)).slice(0, 9)
    .map(({ key, species, born, temperature }) => ({ key, species, born, temperature })) : [];
  return { done: state.done === true, ...(specimens.length ? { specimens, hours } : {}) };
}

export function normalizeTaskProgress(saved) {
  if (saved?.version !== 1 || (Object.hasOwn(saved, 'gold') && (!Number.isSafeInteger(saved.gold) || saved.gold < 0))
    || !Array.isArray(saved.claimed) || !Array.isArray(saved.ready) || !Array.isArray(saved.pinned)) {
    throw new Error('Invalid or unsupported task progress.');
  }
  const ids = values => [...new Set(values.filter(id => TASK_IDS.includes(id)))];
  const claimed = ids(saved.claimed);
  const goals = {};
  for (const id of TASK_IDS) {
    if (!Array.isArray(saved.goals?.[id]) || !TASKS[id].goals) continue;
    goals[id] = TASKS[id].goals.map((goal, index) => normalizeGoal(goal, saved.goals[id][index]));
  }
  const unlocked = id => taskUnlocked(TASKS[id], { claimed, goals });
  if (claimed.some(id => !unlocked(id))) throw new Error('Invalid task order.');
  const ready = ids([...saved.ready, ...claimed]).filter(id => !TASKS[id].delivery && unlocked(id));
  return { version: 1, claimed, ready, goals,
    pinned: ids(saved.pinned).filter(id => !claimed.includes(id) && unlocked(id)).slice(0, 3),
    milestones: { beanstalk: Boolean(saved.milestones?.beanstalk), prismorel: Boolean(saved.milestones?.prismorel) },
    trackerCollapsed: Boolean(saved.trackerCollapsed) };
}

function exhibitionPreview(garden) {
  return Object.values(EXHIBITION_PREVIEWS).some(id => garden.tasks.claimed.includes(id));
}

export function taskStatus(garden, id) {
  const task = TASKS[id], progress = garden.tasks;
  if (!task) return 'locked';
  if (!progress) return id === FIRST_TASK ? 'not-started' : 'locked';
  if (progress.claimed.includes(id)) return 'completed';
  if (!taskUnlocked(task, progress)) return id === EXHIBITION_TASK && exhibitionPreview(garden) ? 'preview' : 'locked';
  const goalsReady = task.delivery ? !task.goals?.length || task.goals.every((_, index) => progress.goals?.[id]?.[index]?.done)
    : progress.ready.includes(id);
  return goalsReady && taskDelivery(id).every(([species, quantity]) => (garden.inventory.leaves?.[species] || 0) >= quantity)
    ? 'ready' : 'active';
}

export function updateTaskProgress(garden, previous = garden) {
  if (!garden.tasks || garden.tasks.claimed.length === TASK_IDS.length) return garden;
  const tasks = garden.tasks, milestones = { ...tasks.milestones }, ready = new Set(tasks.ready);
  const goals = { ...tasks.goals };
  const scene = taskScene(garden);
  let oldScene;
  const before = () => oldScene ||= taskScene(previous);
  const hours = Math.max(0, (garden.clockHours || 0) - (previous.clockHours || 0));
  if (!tasks.claimed.includes(FIRST_TASK)) {
    if (scene.plants.some(object => object.species === 'Beanstalk')) milestones.beanstalk = true;
    if (!milestones.prismorel && scene.plants.some(object => object.species === 'Beanstalk'
      && (scene.environment.modifiers[object.key]?.Illumination || []).some(effect => effect.influence === 'Brightening'
        && effect.modifier > 0 && garden.objects[effect.source]?.species === 'Prismorel'))) milestones.prismorel = true;
    if (scene.plants.some(object => object.species === 'Carrot' && previous.objects[object.key]?.species === 'Beanstalk')) {
      ready.add(FIRST_TASK); milestones.beanstalk = true; milestones.prismorel = true;
    }
  } else if (!ready.has(CARE_TASK) && !tasks.claimed.includes(CARE_TASK)
    && scene.plants.some(({ key, species }) => species === 'Carrot' && scene.environment.conditions[key]?.Moisture === 'Damp'
      && (scene.environment.modifiers[key]?.Moisture || []).some(effect => effect.influence === 'Wetting' && effect.modifier > 0
        && garden.objects[effect.source]?.type === 'fungus' && garden.objects[effect.source]?.species === 'Dewmender'))) {
    ready.add(CARE_TASK);
  }

  let changed = ready.size !== tasks.ready.length
    || milestones.beanstalk !== tasks.milestones.beanstalk || milestones.prismorel !== tasks.milestones.prismorel;
  for (const task of [...MAIN_TASKS, CONTAINMENT_TASK]) {
    if (!task.goals || tasks.claimed.includes(task.id) || ready.has(task.id)
      || !taskUnlocked(task, { claimed: tasks.claimed, goals })) continue;
    const old = goals[task.id] || [];
    const progress = task.goals.map((goal, index) => updateGoal(goal, scene, previous, old[index], hours, before));
    if (progress.some((state, index) => JSON.stringify(state) !== JSON.stringify(old[index] || null))) {
      goals[task.id] = progress;
      changed = true;
    }
    if (!task.delivery && task.goals.every((goal, index) => goalDone(goal, scene, progress[index]))) {
      ready.add(task.id);
      changed = true;
    }
  }
  return changed ? { ...garden, tasks: { ...tasks, ready: [...ready], goals, milestones } } : garden;
}

export function taskObjectives(garden, id) {
  const task = TASKS[id], status = taskStatus(garden, id);
  if (!task) return [];
  const finished = ['ready', 'completed'].includes(status);
  if (id === FIRST_TASK) return [
    { text: 'Grow a Beanstalk', done: finished || Boolean(garden.tasks?.milestones.beanstalk) },
    { text: 'Reach it with Prismorel’s light', done: finished || Boolean(garden.tasks?.milestones.prismorel) },
    { text: 'Transform the Beanstalk into a Carrot', done: finished },
  ];
  if (id === CARE_TASK) return [{ text: 'Keep a living Carrot on Damp soil reached by Dewmender’s Wetting', done: finished }];
  const scene = taskScene(garden);
  const goals = (task.goals || []).map((goal, index) => goalStatus(goal, scene, garden.tasks?.goals?.[id]?.[index], finished));
  if (task.preparation && !finished && goals.some(goal => !goal.done)) {
    const prepared = scene.plants.find(plant => plant.transformationSequence?.[task.preparation]?.phase === 'ready');
    if (prepared) goals[0] = { text: 'Moonlit Lotus is ready. Drain its hex to Damp.', key: prepared.key, done: false };
  }
  const leaves = taskDelivery(id).filter(([species]) => status !== 'preview'
    || garden.tasks.claimed.includes(EXHIBITION_PREVIEWS[species]));
  return [...goals, ...leaves.map(([species, quantity]) => {
    const completed = status === 'completed';
    const held = completed ? quantity : Math.min(quantity, garden.inventory.leaves?.[species] || 0);
    return { text: `${completed ? 'Delivered' : 'Give'} ${quantity} ${species} Leaves · ${held} / ${quantity}`, done: held >= quantity };
  })];
}

function addStock(stock, additions = {}) {
  const result = { ...stock };
  for (const [species, quantity] of Object.entries(additions)) {
    const total = (result[species] || 0) + quantity;
    if (!Number.isSafeInteger(total)) throw new Error(`${species} quantity is too large to collect this reward.`);
    result[species] = total;
  }
  return result;
}

export function claimTask(garden, id) {
  if (taskStatus(garden, id) !== 'ready') throw new Error('This task is not ready to complete.');
  const reward = TASKS[id].rewards;
  const gold = goldBalance(garden) + reward.gold;
  if (!Number.isSafeInteger(gold)) throw new Error('Gold balance is too large to collect this reward.');
  const leaves = { ...garden.inventory.leaves };
  for (const [species, quantity] of taskDelivery(id)) leaves[species] -= quantity;
  const spores = addStock(garden.inventory.spores, reward.spores);
  const seeds = addStock(garden.inventory.seeds, reward.seeds);
  const pinned = garden.tasks.pinned.filter(task => task !== id);
  if (id === FIRST_TASK && garden.tasks.pinned.includes(id)) pinned.push(CARE_TASK);
  const claimed = [...garden.tasks.claimed, id];
  let next = withGold({ ...garden, inventory: { ...garden.inventory, leaves, seeds, spores },
    tasks: { ...garden.tasks, claimed, pinned } }, gold);
  if (reward.rows && garden.rows < 9) next = resizeGarden(next, garden.columns, garden.rows + reward.rows);
  if (reward.slots) next = { ...next, inventoryCapacity: Math.min(INVENTORY_CAPACITY, inventoryCapacity(garden) + reward.slots) };
  for (const [blocker, quantity] of Object.entries(reward.blockers || {})) next = grantBlockerItem(next, blocker, quantity);
  for (const source of reward.sources || []) next = grantSourceItem(next, source);
  return updateTaskProgress(ensureInventorySlots(next));
}

export function toggleTaskPin(garden, id) {
  if (!garden.tasks || !['active', 'ready'].includes(taskStatus(garden, id))) return garden;
  const pinned = garden.tasks.pinned.includes(id) ? garden.tasks.pinned.filter(task => task !== id) : [...garden.tasks.pinned, id];
  if (pinned.length > 3) throw new Error('Pin up to three tasks at a time.');
  return { ...garden, tasks: { ...garden.tasks, pinned } };
}
