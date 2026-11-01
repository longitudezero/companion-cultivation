import React, { useEffect, useId, useRef, useState } from 'react';
import { TASKS, FIRST_TASK, CARE_TASK, taskStatus, taskObjectives } from '../core/tasks.js';
import { illustrationFor } from '../grimoire/illustrations.js';
import GuildBackButton from './GuildBackButton.jsx';
import { goldBalance } from '../core/wallet.js';
import GameArt, { CornerOrnaments, TaskBadge } from './GameArt.jsx';
import RuneProgress from './RuneProgress.jsx';
import GuildHeader from './GuildHeader.jsx';
import { TASK_SECTIONS, groupedTasks, taskSection, initialTaskSelection, taskProgress } from './taskboard-model.js';

export function TaskboardIcon() { return <GameArt name="taskboard"/>; }

export function TaskRewards({ rewards }) {
  return <div className="task-rewards"><div className="task-reward"><GameArt name="gold"/>
    <span><strong>{rewards.gold}</strong> Gold</span></div>
    {Object.entries(rewards.spores).map(([species, quantity]) => <div className="task-reward" key={species}>
      <img src={illustrationFor(species)?.src} alt=""/><span><strong>{quantity}</strong> {species} Spores</span></div>)}</div>;
}

const taskImage = id => illustrationFor(TASKS[id].delivery?.species || (id === FIRST_TASK ? 'Beanstalk' : 'Carrot'));
const stateLabel = status => ({ ready: 'Ready to complete', completed: 'Completed', 'not-started': 'Begin your guild assignment', active: 'In progress' })[status];

// Two identical fields make the reference's slow lateral glow loop seamlessly.
function HeadingWisps() {
  return <span className="task-heading-aura" aria-hidden="true"><span className="task-heading-strip">
    <span className="task-heading-tile"/><span className="task-heading-tile"/>
  </span></span>;
}

export default function Taskboard({ garden, initialTaskId, onClose, onClaim, onPin, onRequestTutorial, onInspectCarrot }) {
  const [selected, setSelected] = useState(() => initialTaskSelection(garden, initialTaskId));
  const [collapsed, setCollapsed] = useState(() => ({ main: false, side: false, completed: taskSection(garden, selected) !== 'completed' }));
  const [receipt, setReceipt] = useState(null), [error, setError] = useState('');
  const modal = useRef(null), close = useRef(onClose), prefix = useId(); close.current = onClose;
  useEffect(() => {
    const previous = document.activeElement, oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modal.current.querySelector('[aria-label="Back to garden"]').focus();
    const keys = event => {
      if (event.key === 'Escape') { event.preventDefault(); close.current(); }
      if (event.key !== 'Tab') return;
      const focusable = [...modal.current.querySelectorAll('button:not(:disabled), [tabindex="0"]')]
        .filter(element => !element.closest('[inert]') && element.getBoundingClientRect().width > 0);
      const index = focusable.indexOf(document.activeElement);
      if (event.shiftKey && index <= 0) { event.preventDefault(); focusable.at(-1)?.focus(); }
      else if (!event.shiftKey && (index === focusable.length - 1 || index < 0)) { event.preventDefault(); focusable[0]?.focus(); }
    };
    document.addEventListener('keydown', keys);
    return () => { document.removeEventListener('keydown', keys); document.body.style.overflow = oldOverflow; if (previous?.isConnected) previous.focus(); };
  }, []);
  const groups = groupedTasks(garden), id = selected, task = TASKS[id], status = taskStatus(garden, id);
  const pinned = garden.tasks?.pinned.includes(id), progress = taskProgress(garden, id), objectives = taskObjectives(garden, id);
  function selectTask(candidate) {
    setSelected(candidate); setCollapsed(previous => ({ ...previous, [taskSection(garden, candidate)]: false })); setError('');
  }
  function complete() {
    try { const awarded = onClaim(id); setReceipt(awarded); setError(''); }
    catch (issue) { setError(issue.message); }
  }
  function continueFromReceipt() {
    setReceipt(null);
    if (receipt.id === FIRST_TASK) selectTask(CARE_TASK); else onClose();
  }
  return <div className="taskboard-backdrop"><section className="taskboard-modal guild-taskboard" ref={modal} role="dialog" aria-modal="true" aria-label="Guild Taskboard">
    <GuildHeader title="Taskboard" subtitle="Guild requests, ongoing assignments, and completed work.">
      <span className="task-wallet"><GameArt name="gold"/>{goldBalance(garden)} Gold</span><GuildBackButton onClick={onClose}/></GuildHeader>
    <div className="taskboard-content" inert={Boolean(receipt)}>
      <aside className="taskboard-list" aria-label="Task list"><CornerOrnaments leftOnly/>
        <div className="task-list-scroll">{TASK_SECTIONS.map(section => <section className="task-group" key={section.id}>
          <h3><button className="task-group-toggle" aria-expanded={!collapsed[section.id]} aria-controls={`${prefix}-${section.id}`}
            onClick={() => setCollapsed(previous => ({ ...previous, [section.id]: !previous[section.id] }))}>
            <HeadingWisps/>
            <span className="group-chevron" aria-hidden="true">{collapsed[section.id] ? '›' : '⌄'}</span>{section.title}<span className="group-count">{groups[section.id].length}</span></button></h3>
          <div id={`${prefix}-${section.id}`} hidden={collapsed[section.id]}>
            <ul className="task-list-entries">{groups[section.id].map(candidate => {
              const currentStatus = taskStatus(garden, candidate), currentProgress = taskProgress(garden, candidate);
              const isPinned = garden.tasks?.pinned.includes(candidate);
              return <li key={candidate}><button className={`task-list-entry ${id === candidate ? 'selected' : ''} ${currentStatus}`}
                aria-pressed={id === candidate} aria-label={`${TASKS[candidate].title}, ${stateLabel(currentStatus)}, ${currentProgress.current} of ${currentProgress.total}${isPinned ? ', Pinned' : ''}`}
                onClick={() => selectTask(candidate)}>
                <img className="task-thumbnail" src={taskImage(candidate)?.src} alt=""/>
                <span className="task-entry-copy"><strong>{TASKS[candidate].title}</strong><small>{stateLabel(currentStatus)}{isPinned ? ' · Pinned' : ''}</small>
                  {currentStatus !== 'completed' && <span className="task-entry-progress"><span aria-hidden="true"><i style={{ width: `${100 * currentProgress.current / currentProgress.total}%` }}/></span>
                    <span>{currentProgress.current}/{currentProgress.total}</span></span>}</span>
                {currentStatus === 'completed' && <span className="task-completed-mark" aria-hidden="true">✓</span>}
              </button></li>;
            })}</ul>
            {!groups[section.id].length && <p className="task-list-empty">{section.id === 'completed' ? 'Completed assignments will be kept here.'
              : section.id === 'side' && !garden.tasks?.claimed.includes(FIRST_TASK) ? 'More requests arrive after your first assignment.' : 'You’re all caught up.'}</p>}
          </div>
        </section>)}</div>
      </aside>
      <article className="task-detail" aria-label="Task explanation"><CornerOrnaments/>
        <div className="task-title-row"><div><span className="task-speaker">{task.speaker}</span><h3>{task.title}</h3>
          <div className="task-badge-row">
            {['active', 'ready'].includes(status) && <button className={`task-pin${pinned ? ' is-pinned' : ''}`} aria-label={pinned ? 'Unpin task' : 'Pin task'} title={pinned ? 'Unpin task' : 'Pin task'} aria-pressed={pinned} onClick={() => onPin(id)}><GameArt name="pin"/></button>}
            <TaskBadge>{task.category === 'side' ? 'Side Task' : 'Main Task'}</TaskBadge><span className={`task-state ${status}`}>{stateLabel(status)}</span></div></div></div>
        <div className="task-detail-scroll">
          <div className="task-dialogue">{(status === 'completed' ? task.completion : task.description).map((line, index) => <p key={index}>{line}</p>)}</div>
          <h4>Objectives</h4><ul className="task-objectives">{objectives.map((objective, index) => <li key={index} className={objective.done ? 'done' : ''}>
            <span className="objective-check" aria-hidden="true">{objective.done ? '✓' : ''}</span><span className="objective-copy"><span className="sr-only">{objective.done ? 'Complete: ' : 'Pending: '}</span>{objective.text}</span></li>)}</ul>
          {status !== 'completed' && <><h4>Field instructions</h4><ol className="task-instructions">{task.instructions.map((line, index) => <li key={index}>{line}</li>)}</ol></>}
          {id === CARE_TASK && status !== 'completed' && Object.values(garden.objects).some(object => object.species === 'Carrot') && <button onClick={onInspectCarrot}>Inspect my Carrot</button>}
        </div>
        <footer className="task-detail-footer"><h4>{status === 'completed' ? 'Rewards received' : 'Rewards'}</h4><TaskRewards rewards={task.rewards}/>
          <div className="task-overall-progress"><span>Progress</span><RuneProgress label={`${task.title} progress`} max={progress.total}
            value={progress.current} valueText={`${progress.current} of ${progress.total} ${progress.unit}`}/><strong>{progress.current}/{progress.total}</strong></div>
          {task.delivery && status !== 'completed' && <p className="task-delivery-note">Completing this request uses {task.delivery.quantity} {task.delivery.species} Leaves from your inventory.</p>}
          {error && <p className="task-error" role="alert">{error}</p>}
          <div className="task-footer-action">{status === 'not-started' ? <button className="task-primary" onClick={onRequestTutorial}>Begin tutorial</button>
            : status === 'completed' ? <p className="task-received">✓ Rewards received</p>
              : <button className="task-primary task-complete-badge" disabled={status !== 'ready'} onClick={complete}><GameArt name="badgeComplete" stretch/><span>Complete task</span></button>}</div>
        </footer>
      </article>
    </div>
    {receipt && <div className="taskboard-inner-overlay"><section className="task-complete-receipt" role="status" aria-live="polite">
      <span className="receipt-seal" aria-hidden="true">✓</span><h3>Task complete</h3><h4>{receipt.title}</h4><p>You received:</p><TaskRewards rewards={receipt.rewards}/>
      <div className="completion-dialogue">{receipt.completion.map((line, index) => <p key={index}>{line}</p>)}</div>
      {receipt.id === FIRST_TASK && <p className="task-unlocked">New assignment: A Thirsty Carrot</p>}
      <button className="task-primary" autoFocus onClick={continueFromReceipt}>{receipt.id === FIRST_TASK ? 'Continue' : 'Return to garden'}</button>
    </section></div>}
  </section></div>;
}
