import React, { useEffect, useId, useRef, useState } from 'react';
import { TASKS, FIRST_TASK, CARE_TASK, CARROT_DELIVERY_TASK, taskStatus, taskObjectives, taskDelivery } from '../core/tasks.js';
import { SOURCE_ITEMS, SOURCE_ITEM_GROUPS } from '../core/source-item-catalog.js';
import { BLOCKER_ITEMS } from '../core/blocker-catalog.js';
import { itemArt } from './item-art.js';
import { illustrationFor } from '../grimoire/illustrations.js';
import GuildBackButton from './GuildBackButton.jsx';
import GameArt, { GAME_ART, CornerOrnaments, TaskboardWindowOrnaments } from './GameArt.jsx';
import GuildHeader from './GuildHeader.jsx';
import FloatingDust from './FloatingDust.jsx';
import { TASK_SECTIONS, groupedTasks, taskSection, initialTaskSelection, taskProgress } from './taskboard-model.js';

export function TaskboardIcon() { return <GameArt name="taskboard"/>; }

export function TaskRewards({ rewards }) {
  const supplies = ['seeds', 'spores'].flatMap(kind => Object.entries(rewards[kind] || {})
    .map(([species, quantity]) => ({ name: `${species} ${kind === 'seeds' ? 'Seeds' : 'Spores'}`, quantity,
      art: illustrationFor(species)?.src })));
  const items = [...Object.entries(rewards.blockers || {}).map(([id, quantity]) => ({ name: BLOCKER_ITEMS[id].name, quantity })),
    ...(rewards.sources || []).map(id => ({ name: SOURCE_ITEMS[id].name, quantity: 1,
      art: itemArt({ type: 'source-item', catalogId: id }) }))];
  const unlocks = [
    rewards.family && `${rewards.family} family unlocked`,
    rewards.rows && `+${rewards.rows} garden row and land purchases`,
    rewards.slots && `+${rewards.slots} Inventory slots and slot packs`,
    rewards.sourceGroup && `Shop unlocks ${SOURCE_ITEM_GROUPS[rewards.sourceGroup - 1].name}`,
    rewards.specialization && `${rewards.specialization} specialization complete`,
    ...[...(rewards.seedStock || []), ...Object.keys(rewards.spores || {})]
      .map(species => `Permanent Shop stock: ${species} ${rewards.seedStock?.includes(species) ? 'Seeds' : 'Spores'}`),
    ...Object.keys(rewards.blockers || {}).map(id => `Shop stock: ${BLOCKER_ITEMS[id].name.replace(/ \(Edge\)$/, '')} (Edge and Hex)`),
  ].filter(Boolean);
  const awarded = rewards.gold || supplies.length || items.length || unlocks.length;
  return <div className="task-rewards">
    {!!rewards.gold && <div className="task-reward"><GameArt name="gold"/><span><strong>{rewards.gold}</strong> Gold</span></div>}
    {[...supplies, ...items].map(({ name, quantity, art }) => <div className="task-reward" key={name}>
      {art && <img src={art} alt=""/>}<span><strong>{quantity}</strong> {name}</span></div>)}
    {unlocks.map(text => <p className="task-reward" key={text}>{text}</p>)}
    {!awarded && <p className="task-reward">Progress toward the next assignment.</p>}
  </div>;
}

const taskImage = id => illustrationFor(taskDelivery(id)[0]?.[0] || TASKS[id].goals?.find(goal => goal.into)?.into
  || (id === FIRST_TASK ? 'Beanstalk' : 'Carrot'));
const stateLabel = status => ({ ready: 'Ready to complete', completed: 'Completed', 'not-started': 'Begin your guild assignment',
  active: 'In progress', preview: 'Upcoming delivery' })[status];

// Two identical fields make the reference's slow lateral glow loop seamlessly.
function HeadingWisps() {
  return <span className="task-heading-aura" aria-hidden="true"><span className="task-heading-strip">
    <span className="task-heading-tile"/><span className="task-heading-tile"/>
  </span></span>;
}

const RECEIPT_REVEAL_MS = 2100;
const reducedReceiptMotion = () => typeof window !== 'undefined'
  && Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

function SealStamp({ onFinish }) {
  return <span className="receipt-stamp" aria-hidden="true"
    onAnimationEnd={event => { if (event.target === event.currentTarget) onFinish(); }}>
    <GameArt name="completionSealStamp"/>
  </span>;
}

export function TaskCompletionReceipt({ receipt, onContinue }) {
  const [ready, setReady] = useState(reducedReceiptMotion);
  const panel = useRef(null), action = useRef(null), prefix = useId();
  const actionLabel = receipt.id === FIRST_TASK ? 'Continue' : 'Return to garden';
  useEffect(() => {
    panel.current?.focus({ preventScroll: true });
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const finish = () => setReady(true);
    const change = event => { if (event.matches) finish(); };
    if (query?.matches) finish();
    // Animation events can be skipped when a tab is hidden or CSS is disabled.
    const timer = window.setTimeout(finish, RECEIPT_REVEAL_MS);
    query?.addEventListener('change', change);
    return () => { window.clearTimeout(timer); query?.removeEventListener('change', change); };
  }, []);
  useEffect(() => { if (ready) action.current?.focus({ preventScroll: true }); }, [ready]);
  return <section ref={panel} className={`task-complete-receipt task-receipt-reveal${ready ? ' is-ready' : ''}`}
    role="status" aria-live="polite" aria-labelledby={`${prefix}-title`} tabIndex={-1}>
    <CornerOrnaments/>
    <div className="receipt-checkmark-fitting" aria-hidden="true"><GameArt name="completionCheckmark" className="receipt-checkmark"/></div>
    <div className="task-receipt-scroll">
      <header className="receipt-heading">
        <h3 id={`${prefix}-title`}><GameArt name="completionTitle" className="receipt-title-art"/><span className="sr-only">Task complete</span></h3>
      </header>
      <div className="receipt-award-copy"><h4>{receipt.title}</h4><p>You received:</p><TaskRewards rewards={receipt.rewards}/>
        <div className="completion-dialogue">{receipt.completion.map((line, index) => <p key={index}>{line}</p>)}</div>
        {receipt.id === FIRST_TASK && <p className="task-unlocked">New assignment: A Thirsty Carrot</p>}
      </div>
    </div>
    <div className="receipt-action-stage">
      <span className="receipt-stamp-shadow" aria-hidden="true"/>
      <SealStamp onFinish={() => setReady(true)}/>
      <button ref={action} className="task-primary receipt-continue" disabled={!ready} aria-label={actionLabel} onClick={onContinue}>
        <GameArt name="completionContinue" className="receipt-continue-art"/>
        <span className="receipt-continue-label">{actionLabel}</span></button>
    </div>
  </section>;
}

export default function Taskboard({ garden, initialTaskId, onClose, onClaim, onPin, onRequestTutorial, onInspectCarrot, onInspect }) {
  const [selected, setSelected] = useState(() => initialTaskSelection(garden, initialTaskId));
  const [collapsed, setCollapsed] = useState(() => ({ main: false, side: false, completed: taskSection(garden, selected) !== 'completed' }));
  const [receipt, setReceipt] = useState(null), [error, setError] = useState('');
  const [rewardsExpanded, setRewardsExpanded] = useState(false);
  const modal = useRef(null), close = useRef(onClose), prefix = useId(); close.current = onClose;
  useEffect(() => {
    // Warm the artwork cache while the player reads the task, before its reveal.
    for (const name of ['completionTitle', 'completionCheckmark', 'completionContinue', 'completionSealStamp']) {
      const image = new window.Image();
      image.src = `${import.meta.env?.BASE_URL || '/'}ui/${GAME_ART[name][0]}`;
    }
  }, []);
  useEffect(() => {
    const previous = document.activeElement, oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modal.current.querySelector('[aria-label="Back to garden"]').focus();
    const keys = event => {
      if (event.key === 'Escape') { event.preventDefault(); close.current(); }
      if (event.key !== 'Tab') return;
      const scope = modal.current.querySelector('.task-complete-receipt') || modal.current;
      const focusable = [...scope.querySelectorAll('button:not(:disabled), [tabindex="0"]')]
        .filter(element => !element.closest('[inert]') && element.getBoundingClientRect().width > 0);
      const index = focusable.indexOf(document.activeElement);
      if (event.shiftKey && index <= 0) { event.preventDefault(); focusable.at(-1)?.focus(); }
      else if (!event.shiftKey && (index === focusable.length - 1 || index < 0)) { event.preventDefault(); focusable[0]?.focus(); }
    };
    document.addEventListener('keydown', keys);
    return () => { document.removeEventListener('keydown', keys); document.body.style.overflow = oldOverflow; if (previous?.isConnected) previous.focus(); };
  }, []);
  const groups = groupedTasks(garden), id = selected, task = TASKS[id], status = taskStatus(garden, id);
  const pinned = garden.tasks?.pinned.includes(id), objectives = taskObjectives(garden, id);
  const delivery = taskDelivery(id);
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
    <TaskboardWindowOrnaments/>
    <div className="taskboard-window-back"><GuildBackButton onClick={onClose}/></div>
    <GuildHeader title="Taskboard" subtitle="Guild requests, ongoing assignments, and completed work."
      backgroundImage={`${import.meta.env?.BASE_URL || '/'}ui/taskboard-noticeboard.webp`} decoration={<FloatingDust/>}/>
    <div className="taskboard-content" inert={Boolean(receipt)}>
      <aside className="taskboard-list" aria-label="Task list">
        <div className="task-list-scroll">{TASK_SECTIONS.map(section => <section className="task-group" key={section.id}>
          <h3><button className="task-group-toggle" aria-expanded={!collapsed[section.id]} aria-controls={`${prefix}-${section.id}`}
            onClick={() => setCollapsed(previous => ({ ...previous, [section.id]: !previous[section.id] }))}>
            <HeadingWisps/>
            <GameArt name="titleDecoration" className="task-heading-ornament"/>
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
        <div className="task-title-row"><div className="task-title-copy"><span className="task-speaker">{task.speaker}</span>
          <div className="task-name-row"><h3>{task.title}</h3>
            {['active', 'ready'].includes(status) && <button className={`task-pin${pinned ? ' is-pinned' : ''}`} aria-label={pinned ? 'Unpin task' : 'Pin task'} title={pinned ? 'Unpin task' : 'Pin task'} aria-pressed={pinned} onClick={() => onPin(id)}><GameArt name="pin"/></button>}
          </div></div>
          <div className="task-title-action">{status === 'not-started' ? <button className="task-primary" onClick={onRequestTutorial}>Begin tutorial</button>
            : status === 'completed' ? <p className="task-received">✓ Rewards received</p>
              : status === 'preview' ? <p className="task-received">Upcoming delivery</p>
              : <button className="task-primary task-complete-badge" disabled={status !== 'ready'} onClick={complete}><GameArt name="badgeComplete" stretch/><span>{delivery.length && id !== CARROT_DELIVERY_TASK ? 'Deliver Leaves' : 'Complete task'}</span></button>}</div>
        </div>
        <div className="task-detail-scroll">
          <div className="task-dialogue">{(status === 'completed' ? task.completion : task.description).map((line, index) => <p key={index}>{line}</p>)}</div>
          <h4>Objectives</h4><ul className="task-objectives">{objectives.map((objective, index) => <li key={index} className={objective.done ? 'done' : ''}>
            <span className="objective-check" aria-hidden="true">{objective.done ? '✓' : ''}</span><span className="objective-copy"><span className="sr-only">{objective.done ? 'Complete: ' : 'Pending: '}</span>{objective.text}{objective.key && <button onClick={() => onInspect(objective.key)}>Inspect hex</button>}</span></li>)}</ul>
          {status !== 'completed' && !!task.instructions.length && <><h4>Field instructions</h4><ol className="task-instructions">{task.instructions.map((line, index) => <li key={index}>{line}</li>)}</ol></>}
          {id === CARE_TASK && status !== 'completed' && Object.values(garden.objects).some(object => object.species === 'Carrot') && <button onClick={onInspectCarrot}>Inspect my Carrot</button>}
        </div>
        <footer className="task-detail-footer">
          {!!delivery.length && status !== 'completed' && <p className="task-delivery-note">{status === 'preview'
            ? 'More requests appear as the family paths open. Complete the five specializations and the Quartermaster’s order to submit your Leaves.'
            : delivery.length === 1 ? `Completing this request uses ${delivery[0][1]} ${delivery[0][0]} Leaves from your inventory.`
              : 'Delivery takes the listed amounts. Earlier harvests count and surplus stays in your Inventory.'}</p>}
          {error && <p className="task-error" role="alert">{error}</p>}
          <section className="task-rewards-panel">
            <h4><button className="task-rewards-toggle" aria-expanded={rewardsExpanded} aria-controls={`${prefix}-rewards`}
              onClick={() => setRewardsExpanded(expanded => !expanded)}>
              <GameArt name="rewardsExpand" className="task-rewards-icon"/>
              <span>{status === 'completed' ? 'Rewards received' : 'Rewards'}</span>
            </button></h4>
            <div id={`${prefix}-rewards`} className="task-rewards-content" hidden={!rewardsExpanded}><TaskRewards rewards={task.rewards}/></div>
          </section>
        </footer>
      </article>
    </div>
    {receipt && <div className="taskboard-inner-overlay task-completion-backdrop"><TaskCompletionReceipt key={receipt.id} receipt={receipt} onContinue={continueFromReceipt}/></div>}
  </section></div>;
}
