export const EFFECT_DEFINITIONS = Object.freeze({
  growthRate: { label: 'Growth speed', summary: 'Changes how quickly a Plant advances through Growth, before 100% maturity.',
    detail: 'Positive values speed up Growth; negative values slow it. The effect applies while its influence reaches an eligible Plant. Growth and Ripening are separate stages.' },
  ripeningRate: { label: 'Ripening speed', summary: 'Changes how quickly a mature Plant progresses through Ripening, from 100% to 200%.',
    detail: 'Faster Ripening reaches later harvest stages sooner; slower Ripening gives you more time. It does not directly create Leaves or Seeds.' },
  leafYield: { label: 'Leaf production', summary: 'Changes ordinary Leaves earned while the influence reaches the Plant during production.',
    detail: 'This modifies production as it happens, not retroactively at harvest. These ordinary Leaves still follow the Plant’s natural decline during Ripening. Extra hourly Leaves are tracked separately.' },
  seedYield: { label: 'Seed production', summary: 'Changes ordinary Seeds earned during their production window while the influence reaches the Plant.',
    detail: 'A Seed bonus applies during eligible production. Adding a Fungus just before harvest does not retroactively improve earlier production.' },
  germination: { label: 'Germination chance', summary: 'Changes the chance that an individual planted Seed successfully germinates.',
    detail: 'Germination bonuses use percentage points. Adding 8 percentage points to a 50% chance gives 58%. This differs from a relative 8% increase, which would give 54%.' },
  harvestWindow: { label: 'Harvest window', summary: 'Widens or narrows the productive interval around a Plant’s harvest timing.',
    detail: 'A wider window can give you more opportunity to harvest. Changes operate on future production and decline while the influence reaches the Plant; they do not restore output from an interval that has already passed.' },
  leafPeakTiming: { label: 'Peak Leaf timing', summary: 'Moves the ordinary Leaf peak earlier or later along the Plant’s lifecycle.',
    detail: 'Negative values shift the peak earlier; positive values shift it later. Timing is measured in percentage points of maturity and affects subsequent progress, without backfilling missed production.' },
  seedTiming: { label: 'Seed timing', summary: 'Moves Seed production earlier or later along the Plant’s lifecycle.',
    detail: 'Negative values shift timing earlier; positive values shift it later. A timing shift is not a Seed-yield bonus, and does not by itself change the Plant’s total lifecycle duration.' },
  hourlyLeaf: { label: 'Extra Leaves per garden hour', summary: 'Accumulates extra Leaves during a specified lifecycle window.',
    detail: 'These are separate from ordinary Leaf production. Eligible extras accrue with garden time while the influence reaches a progressing Plant in the listed window, and are collected at harvest. At the normal pace, one garden hour is five real seconds.' },
  hourlySeed: { label: 'Extra Seeds per garden hour', summary: 'Accumulates extra Seeds during a specified lifecycle window.',
    detail: 'These extras have their own eligible window and are separate from ordinary Seed-yield bonuses. They accrue only under the effect’s progression rules and are collected at harvest.' },
  allocation: { label: 'Harvest allocation', summary: 'Describes compatibility with effects that change the allocation of a harvest.',
    detail: 'Allocation effects apply according to their stated harvesting rules. They are distinct from producing extra Leaves or Seeds over time.' },
  leafAllocation: { label: 'Leaf allocation', summary: 'Changes how a harvest is allocated toward Leaves when an allocation effect applies.',
    detail: 'Read the effect’s stated conversion and harvesting rules. Allocation is separate from ordinary Leaf-yield and hourly-production modifiers.' },
  seedAllocation: { label: 'Seed allocation', summary: 'Changes how a harvest is allocated toward Seeds when an allocation effect applies.',
    detail: 'Read the effect’s stated conversion and harvesting rules. Allocation is separate from ordinary Seed-yield and hourly-production modifiers.' },
});
export const EFFECT_LABELS = Object.fromEntries(Object.entries(EFFECT_DEFINITIONS).map(([key, value]) => [key, value.label]));

export function observedEffectText(effect) {
  return `${EFFECT_LABELS[effect.kind] || effect.kind} ${effect.direction > 0 ? 'increased' : effect.direction < 0 ? 'decreased' : 'altered'}`;
}

export function effectAmount(effect) {
  const relative = ['growthRate', 'ripeningRate', 'leafYield', 'seedYield', 'harvestWindow'].includes(effect.kind);
  const timing = ['germination', 'leafPeakTiming', 'seedTiming'].includes(effect.kind);
  const number = relative ? Math.round(effect.amount * 10000) / 100 : effect.amount;
  return `${number > 0 ? '+' : ''}${number}${relative ? '%' : timing ? ' pp' : ''}`;
}
