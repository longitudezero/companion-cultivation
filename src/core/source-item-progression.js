import { TASKS } from './tasks.js';
import { SPECIALIZATION_FINALES } from './main-task-definitions.js';
import { SOURCE_ITEM_GROUPS } from './source-item-catalog.js';

export function unlockedSourceGroup(garden) {
  const claimed = garden.tasks?.claimed || [];
  const rewards = claimed.map(id => TASKS[id]?.rewards).filter(Boolean);
  const baseGroup = Math.max(0, ...rewards.map(reward => reward.sourceGroup || 0));
  const unlocked = baseGroup === 2
    ? baseGroup + SPECIALIZATION_FINALES.filter(id => claimed.includes(id)).length
    : baseGroup;
  return Math.min(SOURCE_ITEM_GROUPS.length, unlocked);
}
