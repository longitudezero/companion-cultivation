import { TASKS } from './tasks.js';

const designFromItem = id => /^blocker:([^:]+):(edge|hex)$/.exec(id)?.[1];

export function unlockedBlockerDesigns(garden) {
  const designs = new Set();
  for (const taskId of garden.tasks?.claimed || []) {
    for (const itemId of Object.keys(TASKS[taskId]?.rewards.blockers || {})) {
      const design = designFromItem(itemId);
      if (design) designs.add(design);
    }
  }
  return designs;
}
