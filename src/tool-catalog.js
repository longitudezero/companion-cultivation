// Keep player actions separate from unrestricted sandbox shortcuts.
// Player-placeable blockers will be defined in a later design pass.
export const PLAYER_TOOLS = [
  { id: 'inspect', icon: '⌕', title: 'Inspect', hint: 'Select a hex or existing edge' },
  { id: 'sow-plant', icon: '◌', title: 'Sow Seeds', hint: 'Spend owned Seeds on a germination attempt' },
  { id: 'sow-fungus', icon: '◈', title: 'Sow Spores', hint: 'Spend owned Spores on a germination attempt' },
];

export const DEVELOPER_TOOLS = [
  { id: 'plant', icon: '❧', title: 'Spawn Plant', hint: 'Free-spawn a test Plant without spending Seeds' },
  { id: 'fungus', icon: '♧', title: 'Spawn Fungus', hint: 'Free-spawn a test Fungus without spending Spores' },
  { id: 'source', icon: '✦', title: 'Place Source', hint: 'Place a configurable Influence Source' },
  { id: 'hex', icon: '▣', title: 'Hex blocker', hint: 'Block an entire hex (developer-only until player blockers are designed)' },
  { id: 'edge', icon: '╱', title: 'Edge blocker', hint: 'Place a test blocker on a shared hex edge' },
  { id: 'erase', icon: '⌫', title: 'Remove', hint: 'Remove objects and edge blockers without harvesting' },
];

const developerIds = new Set(DEVELOPER_TOOLS.map(({ id }) => id));

export function isDeveloperTool(id) {
  return developerIds.has(id);
}

export function toolForVisibility(id, showDeveloperTools) {
  return !showDeveloperTools && isDeveloperTool(id) ? 'inspect' : id;
}
