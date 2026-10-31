import React from 'react';
import { TASKS, FIRST_TASK, taskStatus, taskObjectives } from '../core/tasks.js';

export default function TaskTracker({ garden, onOpen, onToggleCollapsed }) {
  const pins = garden.tasks?.pinned || [], collapsed = Boolean(garden.tasks?.trackerCollapsed);
  return <section className="task-tracker" aria-label="Pinned objectives"><header>
    <button onClick={() => onOpen(pins[0] || FIRST_TASK)}>Objectives</button>
    {!!pins.length && <button aria-label={collapsed ? 'Expand objectives' : 'Collapse objectives'} aria-expanded={!collapsed} onClick={onToggleCollapsed}>{collapsed ? '▾' : '▴'}</button>}
  </header>
    {!garden.tasks ? <button className="tracker-entry" onClick={() => onOpen(FIRST_TASK)}>Begin your guild tutorial</button>
      : !collapsed && pins.map(id => <button key={id} className={`tracker-entry ${taskStatus(garden, id) === 'ready' ? 'ready' : ''}`} onClick={() => onOpen(id)}>
        <strong>{TASKS[id].title}</strong><span>{taskStatus(garden, id) === 'ready' ? '✧ Ready to complete' : taskObjectives(garden, id).find(objective => !objective.done)?.text}</span>
      </button>)}
  </section>;
}
