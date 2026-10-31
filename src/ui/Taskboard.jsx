import React, { useEffect, useRef, useState } from 'react';
import { TASKS, TASK_IDS, FIRST_TASK, CARE_TASK, taskStatus, taskObjectives } from '../core/tasks.js';
import { illustrationFor } from '../grimoire/illustrations.js';
import SimulationControls from './SimulationControls.jsx';
import { goldBalance } from '../core/wallet.js';

export function TaskboardIcon() {
  return <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><path d="M8 8h32v35H8z" fill="#253d2c" stroke="#bd9b58" strokeWidth="2"/>
    <path d="M12 13h24v25H12z" fill="#ead6a7" stroke="#977846"/><path d="M18 4h12v10H18z" fill="#b69655" stroke="#ead5a0"/>
    <path d="m16 22 3 3 5-6m-8 12 3 3 5-6m3-5h6m-6 9h6" fill="none" stroke="#4d6742" strokeWidth="2"/></svg>;
}

function Rewards({ rewards }) {
  return <div className="task-rewards"><div className="task-reward"><span className="task-coin" aria-hidden="true">◉</span><span><strong>{rewards.gold}</strong> Gold</span></div>
    {Object.entries(rewards.spores).map(([species, quantity]) => <div className="task-reward" key={species}>
      <img src={illustrationFor(species)?.src} alt=""/><span><strong>{quantity}</strong> {species} Spores</span></div>)}</div>;
}

export default function Taskboard({ garden, initialTaskId, speed, onSpeedChange, onClose, onClaim, onPin, onStartTutorial, onInspectCarrot }) {
  const [selected, setSelected] = useState(initialTaskId || FIRST_TASK), [tab, setTab] = useState(TASKS[initialTaskId]?.category === 'side' ? 'side' : 'main');
  const [receipt, setReceipt] = useState(null), [confirm, setConfirm] = useState(false), [error, setError] = useState('');
  const modal = useRef(null), close = useRef(onClose); close.current = onClose;
  useEffect(() => {
    const previous = document.activeElement, oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modal.current.querySelector('[aria-label="Close Taskboard"]').focus();
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
  const available = TASK_IDS.filter(id => taskStatus(garden, id) !== 'locked');
  const inTab = (candidate, section) => section === 'completed' ? taskStatus(garden, candidate) === 'completed'
    : taskStatus(garden, candidate) !== 'completed' && TASKS[candidate].category === section;
  const shown = available.filter(candidate => inTab(candidate, tab));
  const id = shown.includes(selected) ? selected : shown[0] || FIRST_TASK, task = TASKS[id], status = taskStatus(garden, id);
  const pinned = garden.tasks?.pinned.includes(id);
  function complete() {
    try { const awarded = onClaim(id); setReceipt(awarded); setError(''); }
    catch (issue) { setError(issue.message); }
  }
  function continueFromReceipt() {
    setReceipt(null);
    if (receipt.id === FIRST_TASK) { setTab('main'); setSelected(CARE_TASK); }
    else onClose();
  }
  function selectTab(section) {
    setTab(section); setSelected(available.find(candidate => inTab(candidate, section)) || FIRST_TASK); setError('');
  }
  return <div className="taskboard-backdrop"><section className="taskboard-modal" ref={modal} role="dialog" aria-modal="true" aria-label="Guild Taskboard">
    <header className="taskboard-header"><div><span className="eyebrow">ADVENTURERS’ GUILD</span><h2>Taskboard</h2></div>
      <span className="task-wallet">◉ {goldBalance(garden)} Gold</span><SimulationControls speed={speed} onChange={onSpeedChange}/>
      <button className="taskboard-close" aria-label="Close Taskboard" onClick={onClose}>×</button></header>
    <div className="taskboard-content" inert={confirm || Boolean(receipt)}>
      <aside className="taskboard-list"><div className="task-tabs" role="tablist" aria-label="Task sections">
        <button role="tab" aria-selected={tab === 'main'} onClick={() => selectTab('main')}>Main</button>
        <button role="tab" aria-selected={tab === 'side'} onClick={() => selectTab('side')}>Side</button>
        <button role="tab" aria-selected={tab === 'completed'} onClick={() => selectTab('completed')}>Completed</button></div>
        <div className="task-list-entries">{shown.map(candidate => <button key={candidate} className={id === candidate ? 'selected' : ''}
          aria-pressed={id === candidate} onClick={() => { setSelected(candidate); setError(''); }}>
          <strong>{TASKS[candidate].title}</strong><span>{taskStatus(garden, candidate) === 'ready' ? '✧ Ready to complete' : taskStatus(garden, candidate) === 'completed' ? '✓ Completed' : taskStatus(garden, candidate) === 'not-started' ? 'Begin your guild assignment' : 'In progress'}{garden.tasks?.pinned.includes(candidate) ? ' · Pinned' : ''}</span></button>)}</div>
        {!shown.length && <p className="task-list-empty">{tab === 'completed' ? 'Your completed assignments will be kept here.' : tab === 'side' && !garden.tasks?.claimed.includes(FIRST_TASK) ? 'No side requests are available yet.' : 'You’re all caught up.'}</p>}
        <button className="new-tutorial" onClick={() => setConfirm(true)}>New tutorial garden</button>
      </aside>
      <article className="task-detail">{shown.includes(id) ? <>
        <div className="task-title-row"><div><span className="task-speaker">{task.speaker}</span><h3>{task.title}</h3></div>
          {['active', 'ready'].includes(status) && <button className="task-pin" aria-pressed={pinned} onClick={() => onPin(id)}>{pinned ? 'Unpin' : 'Pin'}</button>}</div>
        <div className="task-detail-scroll">
          <div className="task-dialogue">{(status === 'completed' ? task.completion : task.description).map((line, index) => <p key={index}>{line}</p>)}</div>
          <h4>Objectives</h4><ul className="task-objectives">{taskObjectives(garden, id).map((objective, index) => <li key={index} className={objective.done ? 'done' : ''}><span aria-hidden="true">{objective.done ? '✓' : '◇'}</span>{objective.text}</li>)}</ul>
          {status !== 'completed' && <><h4>Field instructions</h4><ol className="task-instructions">{task.instructions.map((line, index) => <li key={index}>{line}</li>)}</ol></>}
          {id === CARE_TASK && status !== 'completed' && Object.values(garden.objects).some(object => object.species === 'Carrot') && <button onClick={onInspectCarrot}>Inspect my Carrot</button>}
        </div>
        <footer className="task-detail-footer"><h4>{status === 'completed' ? 'Rewards received' : 'Rewards'}</h4><Rewards rewards={task.rewards}/>
          {task.delivery && status !== 'completed' && <p className="task-delivery-note">Completing this request uses {task.delivery.quantity} {task.delivery.species} Leaves from your inventory.</p>}
          {error && <p className="task-error" role="alert">{error}</p>}
          {status === 'not-started' ? <button className="task-primary" onClick={() => setConfirm(true)}>Begin tutorial</button>
            : status === 'completed' ? <p className="task-received">✓ Rewards received</p>
              : <button className="task-primary" disabled={status !== 'ready'} onClick={complete}>Complete task</button>}
        </footer>
      </> : <div className="task-no-selection">{tab === 'completed' ? 'Completed requests and their rewards remain available for reference.' : tab === 'side' ? garden.tasks?.claimed.includes(FIRST_TASK) ? 'The guild has no outstanding side requests for you.' : 'Side requests appear after your first guild assignment.' : 'The guild has no outstanding main assignments for you.'}</div>}</article>
    </div>
    {confirm && <div className="taskboard-inner-overlay"><section className="task-confirm" role="alertdialog" aria-label="Start a new tutorial garden">
      <h3>Start a new tutorial garden?</h3><p>This replaces the current garden and task progress. Use Save Game first if you want to keep them.</p>
      <p>Begin with a 4 × 4 garden, 36 Beanstalk Seeds and 8 Prismorel Spores.</p>
      <div><button autoFocus onClick={() => setConfirm(false)}>Cancel</button><button className="task-primary" onClick={() => { onStartTutorial(); setConfirm(false); setReceipt(null); setSelected(FIRST_TASK); setTab('main'); setError(''); }}>Start new garden</button></div>
    </section></div>}
    {receipt && <div className="taskboard-inner-overlay"><section className="task-complete-receipt" role="status" aria-live="polite">
      <span className="receipt-seal" aria-hidden="true">✓</span><h3>Task complete</h3><h4>{receipt.title}</h4><p>You received:</p><Rewards rewards={receipt.rewards}/>
      <div className="completion-dialogue">{receipt.completion.map((line, index) => <p key={index}>{line}</p>)}</div>
      {receipt.id === FIRST_TASK && <p className="task-unlocked">New assignment: A Thirsty Carrot</p>}
      <button className="task-primary" autoFocus onClick={continueFromReceipt}>{receipt.id === FIRST_TASK ? 'Continue' : 'Return to garden'}</button>
    </section></div>}
  </section></div>;
}
