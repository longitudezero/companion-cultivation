export function isBlocked(blocker, influence) {
  if (!blocker) return false;
  if (blocker.rule === 'full') return true;
  if (blocker.rule === 'kind') return blocker.value === influence.kind;
  if (blocker.rule === 'mode') return blocker.value === influence.mode;
  return false;
}
