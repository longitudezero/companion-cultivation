import { CARE_TASK, taskStatus } from '../core/tasks.js';
import React from 'react';
import { PLANTS, FUNGI, PROPERTIES, CONDITIONS, SOURCE_ITEMS, isPlayerSource,
  availableHarvest, stageOf, formatRealDuration, STARTING_DIRECTIONS } from '../core/index.js';
import { illustrationFor } from '../grimoire/illustrations.js';
import { harvestLandmarks, transformationClue } from './garden-model.js';
import { germinationProgress } from './view-model.js';
import { inspectorInfluences } from './inspector-model.js';
import InfluenceCards from './InfluenceCards.jsx';
import TransformationPanel from './TransformationPanel.jsx';

const ICONS = { leaf: '❧', seed: '◌', trophy: '◆', spore: '♧' };
const NAMES = { leaf: 'Leaf peak', seed: 'Seed peak', trophy: 'Bamboo Steel ready', spore: 'Spore peak' };

export function LifecycleBar({ object, contacts, conditions }) {
  const markers = object.type === 'plant' ? harvestLandmarks(object.species, contacts, { ...conditions, attunement: object.attunement })
    : [{ kind: 'spore', from: 200, to: 200 }];
  return <div className="lifecycle-guide">
    <div className="inspector-value"><span>Lifecycle · {stageOf(object)}</span><strong>{object.progress.toFixed(1)}%</strong></div>
    <div className="harvest-timeline">
      <div className="lifecycle-track" role="progressbar" aria-label={`${object.species} lifecycle`}
        aria-valuemin={0} aria-valuemax={200} aria-valuenow={object.progress} aria-valuetext={`${object.progress.toFixed(1)}%, ${stageOf(object)}`}>
        <div style={{ width: `${Math.max(0, Math.min(100, object.progress / 2))}%` }}/>
      </div>
      {markers.map(({ kind, from, to }, i) => {
        const label = `${NAMES[kind]} · ${Math.round(from)}${to > from ? `–${Math.round(to)}` : ''}%`;
        return <React.Fragment key={`${kind}-${i}`}>
          {to > from && <span aria-hidden="true" className={`peak-band ${kind}`} style={{ left: `${from / 2}%`, width: `${(to - from) / 2}%` }}/>}
          <span className={`harvest-marker ${kind}`} tabIndex={0} role="img" aria-label={label}
            style={{ left: `${from / 2}%` }}><span aria-hidden="true">{ICONS[kind]}</span><span className="peak-tooltip">{label}</span></span>
        </React.Fragment>;
      })}
    </div>
  </div>;
}

export default function GardenInspector({ garden, selection, simulation, cultivation, mycelialHere,
  onOpenEntry, onEditStaged, onUnstage, onRotate, onReturnSource, clockFraction = 0, simulationSpeed = 1 }) {
  const key = selection.key;
  const object = selection.type === 'hex' ? garden.objects[key] : null;
  const staged = selection.type === 'hex' ? garden.staged?.[key] : null;
  const pending = selection.type === 'hex' ? garden.pending?.[key] : null;
  const hex = selection.type === 'hex' ? garden.hexes[key] : null;
  const organism = ['plant', 'fungus'].includes(object?.type);
  const source = isPlayerSource(object);
  const title = organism ? object.species : source ? SOURCE_ITEMS[object.catalogId].name
    : staged ? staged.species : pending ? 'Awaiting germination' : object ? object.type === 'blocker' ? 'Hex Blocker' : 'Influence Source'
      : selection.type === 'edge' ? 'Shared hex edge' : `Hex ${key}`;
  const art = organism ? illustrationFor(object.species) : null;
  const conditions = simulation.conditions[key];
  const contacts = cultivation[key] || [];
  const harvest = object?.type === 'plant' ? availableHarvest(object, contacts, conditions) : null;
  const headingProfile = staged?.kind === 'fungus' ? FUNGI[staged.species] : source ? SOURCE_ITEMS[object.catalogId] : null;
  const directional = source ? headingProfile.propagation === 'spread-budget'
    : headingProfile?.environment?.propagation === 'spread-budget' || headingProfile?.cultivation?.propagation === 'spread-budget';
  const clue = organism && object.type === 'plant' ? transformationClue(garden, key, simulation, cultivation) : { active: false, learned: [] };
  const cards = inspectorInfluences(garden, key, simulation, cultivation);

  return <section className={`garden-inspector${clue.active ? ' has-transformation' : ''}`} aria-label="Garden inspector">
    <div className="inspector-portrait">
      {organism ? <button className="portrait-entry" onClick={() => onOpenEntry(object)} title={`Read ${title} in the Grimoire`}
        aria-label={`Open ${title} Grimoire entry`}>{art ? <img src={art.src} alt={`${title} illustration`} draggable="false"/> : <span>❧</span>}</button>
        : <div className={`portrait-symbol ${pending ? 'pending' : ''}`} aria-hidden="true">{pending ? '?' : staged ? '◌' : source ? '✧' : '⬡'}</div>}
      <h2>{title}</h2>
      <p>{organism ? object.type === 'plant' ? PLANTS[object.species].family : 'Fungi' : selection.type === 'edge' ? `${selection.a} ↔ ${selection.b}` : object || staged || pending ? `Hex ${key}` : 'Empty soil'}
        {organism && <span className="organism-status">{stageOf(object)}</span>}</p>
    </div>

    <div className="inspector-environment inspector-section"><h3>Environment</h3>
      {hex && conditions ? PROPERTIES.map(property => <div className={`compact-condition condition-${property.toLowerCase()}`} key={property}>
        <div className="inspector-value"><span>{property === 'Moisture' ? '◈' : property === 'Temperature' ? '♨' : '☼'} {property}</span><strong>{conditions[property]}</strong></div>
        <div className="environment-levels" aria-label={`${property}: ${conditions[property]}`}>{CONDITIONS[property].map((name, i) =>
          <span key={name} title={name} className={i <= CONDITIONS[property].indexOf(conditions[property]) ? 'filled' : ''}/>)}</div>
      </div>) : <p>Select a hex to inspect its resolved Conditions.</p>}
      {hex && <span className={`ground-status ${mycelialHere ? 'colonized' : ''}`}>{mycelialHere ? '✥ Mycelial ground' : 'Uncolonized ground'}</span>}
    </div>

    <div className="inspector-growth inspector-section">
      <h3>{organism ? 'Growth & Harvest' : 'Field Notes'}</h3>
      {organism ? <>
        {harvest ? <><div className="inspector-value"><span>❧ Leaves now</span><strong>{harvest.leaves}</strong></div>
          <div className="inspector-value"><span>◌ Seeds now</span><strong>{harvest.seeds}</strong></div>
          {object.species === 'Bamboozled' && <div className="inspector-value"><span>◆ Bamboo Steel</span><strong>{harvest.bambooSteel ? 'Ready' : 'Not ready'}</strong></div>}</>
          : <div className="inspector-value"><span>♧ Spores now</span><strong>{Math.floor(object.sporeStock || 0)}</strong></div>}
        <LifecycleBar object={object} contacts={contacts} conditions={conditions}/>
        {object.species === 'Carrot' && ['active', 'ready'].includes(taskStatus(garden, CARE_TASK)) && conditions?.Moisture === 'Dry' &&
          <div className="tutorial-dry-warning"><div className="inspector-value"><span>Dry exposure</span><strong>{simulationSpeed ? `${formatRealDuration(Math.max(0, PLANTS.Carrot.dryDeath - (object.exposure?.Dry || 0)) / simulationSpeed)} left` : 'Paused'}</strong></div>
            <div role="progressbar" aria-label="Carrot Dry exposure" aria-valuemin={0} aria-valuemax={PLANTS.Carrot.dryDeath} aria-valuenow={object.exposure?.Dry || 0}>
              <i style={{ width: `${Math.min(100, (object.exposure?.Dry || 0) / PLANTS.Carrot.dryDeath * 100)}%` }}/></div></div>}

      </> : staged ? <><p><strong>{staged.quantity} {staged.kind === 'plant' ? 'Seeds' : 'Spores'} reserved</strong></p><p>Uncommitted · nothing spent yet.</p>
        <div className="inspector-inline-actions"><button onClick={onEditStaged}>Edit quantity</button><button onClick={onUnstage}>Unstage</button></div>
        {directional && <div className="heading-buttons" aria-label="Staged Fungus direction">{STARTING_DIRECTIONS.map((label, heading) => <button key={label} aria-label={`Face ${label}`}
          className={staged.heading === heading ? 'selected' : ''} onClick={() => onRotate(key, 'staged', heading)}>{heading + 1}</button>)}</div>}
      </> : pending ? <><p>{pending.quantity} {pending.kind === 'plant' ? 'Seeds' : 'Spores'} sown.</p>
        <div className="germination-bar" role="progressbar" aria-label="Germination" aria-valuemin={0} aria-valuemax={100}
          aria-valuenow={Math.round(germinationProgress(pending, garden.clockHours || 0, clockFraction))}>
          <div style={{ width: `${germinationProgress(pending, garden.clockHours || 0, clockFraction)}%` }}/><span>Germinating…</span></div></>
        : source ? <><div className="inspector-value"><span>Active time remaining</span><strong>{simulationSpeed ? formatRealDuration(object.remainingHours / simulationSpeed) : 'Paused'}</strong></div>
          <button onClick={onReturnSource}>Return item to inventory</button>
          {directional && <div className="heading-buttons">{STARTING_DIRECTIONS.map((label, heading) => <button key={label} aria-label={`Face ${label}`} className={object.heading === heading ? 'selected' : ''} onClick={() => onRotate(key, 'item', heading)}>{heading + 1}</button>)}</div>}</>
          : <p>{object?.type === 'blocker' ? `Blocks ${object.rule === 'full' ? 'all influences' : `${object.rule}: ${object.value}`}.`
            : selection.type === 'edge' ? 'A shared boundary between two neighbouring hexes.' : 'Select an inventory item, then an empty hex to place it.'}</p>}
    </div>

    <div className="inspector-influences inspector-section"><h3>Influences & Observations</h3>
      <InfluenceCards key={`${selection.type}:${key}:${object?.species || object?.type || ''}`} cards={cards}/>
    </div>
    {clue.active && <TransformationPanel key={`${key}:${object.species}`} clue={clue}/>}

  </section>;
}
