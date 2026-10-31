import React, { useId, useState } from 'react';
import { TASKS, FIRST_TASK, taskStatus, taskObjectives } from '../core/tasks.js';

export default function TaskTracker({ garden, onOpen, onToggleCollapsed }) {
  const pins = garden.tasks?.pinned || [], collapsed = Boolean(garden.tasks?.trackerCollapsed);
  const [legacyCollapsed, setLegacyCollapsed] = useState(false), listId = useId();
  const isCollapsed = garden.tasks ? collapsed : legacyCollapsed;
  return <section className="task-tracker" aria-label="Pinned objectives"><header>
    <button aria-expanded={!isCollapsed} aria-controls={listId} onClick={() => garden.tasks ? onToggleCollapsed() : setLegacyCollapsed(value => !value)}>
      Objectives <span aria-hidden="true">{isCollapsed ? '▾' : '▴'}</span></button>
  </header>
    <ul className="tracker-list" id={listId} hidden={isCollapsed}>
      {!garden.tasks ? <li><button className="tracker-entry" onClick={() => onOpen(FIRST_TASK)}>Begin your guild tutorial</button></li>
        : pins.map(id => <li key={id}><button className={`tracker-entry ${taskStatus(garden, id) === 'ready' ? 'ready' : ''}`} onClick={() => onOpen(id)}>
          <strong>{TASKS[id].title}</strong><span>{taskStatus(garden, id) === 'ready' ? '✧ Ready to complete' : taskObjectives(garden, id).find(objective => !objective.done)?.text}</span>
        </button></li>)}
    </ul>
  </section>;
}
