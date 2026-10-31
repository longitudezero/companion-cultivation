// One spendable balance shared by task rewards and trading. The task field is
// read only to upgrade gardens saved before the shop existed.
export const goldBalance = garden => garden.shop?.gold ?? garden.tasks?.gold ?? 0;

export function withGold(garden, gold) {
  if (!Number.isSafeInteger(gold) || gold < 0) throw new Error('Invalid Gold balance.');
  const next = { ...garden, shop: { version: 1, unlockedSpores: [], ...garden.shop, gold } };
  if (garden.tasks && Object.hasOwn(garden.tasks, 'gold')) {
    const { gold: legacyGold, ...tasks } = garden.tasks;
    next.tasks = tasks;
  }
  return next;
}
