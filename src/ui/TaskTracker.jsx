import React, { useId, useState } from 'react';
import { TASKS, TASK_IDS, FIRST_TASK, taskStatus, taskObjectives } from '../core/tasks.js';

export default function TaskTracker({ garden, onOpen, onToggleCollapsed, onInspect }) {
  const pins = garden.tasks?.pinned || [], collapsed = Boolean(garden.tasks?.trackerCollapsed);
  const alerts = TASK_IDS.filter(id => taskStatus(garden, id) === 'active'
    && TASKS[id].goals?.some(goal => goal.kind === 'rescue' || TASKS[id].preparation))
    .map(id => ({ id, objective: taskObjectives(garden, id).find(goal => !goal.done && goal.key) }))
    .filter(entry => entry.objective);
  const [legacyCollapsed, setLegacyCollapsed] = useState(false), listId = useId();
  const isCollapsed = garden.tasks ? collapsed : legacyCollapsed;
  return <section className="task-tracker" aria-label="Pinned objectives"><header>
    <button aria-expanded={!isCollapsed} aria-controls={listId} onClick={() => garden.tasks ? onToggleCollapsed() : setLegacyCollapsed(value => !value)}>
      Objectives <span aria-hidden="true">{isCollapsed ? '▾' : '▴'}</span></button>
  </header>
    {alerts.map(({ id, objective }) => <button type="button" key={id} className="tracker-entry" onClick={() => onInspect(objective.key)}>
      <strong>{TASKS[id].title}</strong><span>{objective.text}</span>
    </button>)}
    <ul className="tracker-list" id={listId} hidden={isCollapsed}>
      {!garden.tasks ? <li><button className="tracker-entry" onClick={() => onOpen(FIRST_TASK)}>Begin your guild tutorial</button></li>
        : pins.map(id => <li key={id}><button className={`tracker-entry ${taskStatus(garden, id) === 'ready' ? 'ready' : ''}`} onClick={() => onOpen(id)}>
          <strong>{TASKS[id].title}</strong><span>{taskStatus(garden, id) === 'ready' ? '✧ Ready to complete' : taskObjectives(garden, id).find(objective => !objective.done)?.text}</span>
        </button></li>)}
    </ul>
  </section>;
}
