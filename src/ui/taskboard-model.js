import { TASKS, TASK_IDS, FIRST_TASK, taskStatus, taskObjectives } from '../core/tasks.js';

export const TASK_SECTIONS = [
  { id: 'main', title: 'Main Tasks' }, { id: 'side', title: 'Side Tasks' }, { id: 'completed', title: 'Completed Tasks' },
];
export function taskSection(garden, id) {
  return taskStatus(garden, id) === 'completed' ? 'completed' : TASKS[id].category;
}
export function groupedTasks(garden) {
  return Object.fromEntries(TASK_SECTIONS.map(section => [section.id, TASK_IDS.filter(id => taskStatus(garden, id) !== 'locked' && taskSection(garden, id) === section.id)]));
}
export function initialTaskSelection(garden, requested) {
  const available = TASK_IDS.filter(id => taskStatus(garden, id) !== 'locked');
  return available.includes(requested) && taskStatus(garden, requested) !== 'completed' ? requested
    : available.find(id => taskStatus(garden, id) !== 'completed') || available[0] || FIRST_TASK;
}
export function taskProgress(garden, id) {
  const delivery = TASKS[id].delivery, completed = taskStatus(garden, id) === 'completed';
  if (delivery) return { current: completed ? delivery.quantity : Math.min(delivery.quantity, garden.inventory.leaves?.[delivery.species] || 0),
    total: delivery.quantity, unit: 'Leaves' };
  const goals = taskObjectives(garden, id);
  return { current: goals.filter(goal => goal.done).length, total: goals.length, unit: 'objectives' };
}
