import React, { useEffect, useMemo, useRef, useState } from 'react';
import HexGrid, { PALETTES } from './HexGrid.jsx';
import './spread.css';
import './adjacency.css';
import './biology.css';
import {
  CONDITIONS, PROPERTIES, INFLUENCE_TYPES, KINDS, MODES,
  calculateEnvironment, createGarden, createDemoGarden, isGarden, migrateGarden, edgeKey, keyAt,
  resizeGarden, setBaseline, placeObject, removeObject, updateObject,
  placeEdgeBlocker, removeEdgeBlocker, makeInfluence, makeSpreadInfluence, makeSource, makeAnchoredSource, makeBlocker,
  STARTING_DIRECTIONS, MOVEMENT_RULES,
  PLANTS, FUNGI, makePlant, makeFungus, stageOf, advanceGardenTime,
  calculateCultivation, plantGrowthRates, PROTOTYPE_TUNING,
  sowPlant, sowFungus, harvestPlant, harvestFungus, availableHarvest,
  isMycelial, mycelialContributors, calculateMycelialSupport, MYCELIAL_TUNING,
  transformationStatus, reconcileTransformationClocks,
} from './core/index.js';

const STORAGE_KEY = 'companion-cultivation:sandbox:v3';
const PREVIOUS_STORAGE_KEY = 'companion-cultivation:sandbox:v2';
const LEGACY_STORAGE_KEY = 'companion-cultivation:sandbox:v1';
const TOOLS = [
  { id: 'inspect', icon: '⌕', title: 'Inspect', hint: 'Select a hex or existing edge' },
  { id: 'sow-plant', icon: '◌', title: 'Sow Seeds', hint: 'Spend owned Seeds on a germination attempt' },
  { id: 'sow-fungus', icon: '◈', title: 'Sow Spores', hint: 'Spend owned Spores on a germination attempt' },
  { id: 'plant', icon: '❧', title: 'Plant', hint: 'Spawn a test Plant on an empty hex' },
  { id: 'fungus', icon: '♧', title: 'Fungus', hint: 'Spawn a test Fungus with its approved emissions' },
  { id: 'source', icon: '✦', title: 'Source', hint: 'Place a configurable Influence Source' },
  { id: 'hex', icon: '▣', title: 'Hex blocker', hint: 'Block an entire hex' },
  { id: 'edge', icon: '╱', title: 'Edge blocker', hint: 'Click a shared hex edge' },
  { id: 'erase', icon: '⌫', title: 'Remove', hint: 'Remove objects and edge blockers' },
];

const titleCase = (text) => text.charAt(0).toUpperCase() + text.slice(1);
function initialGarden() {
  for (const key of [STORAGE_KEY, PREVIOUS_STORAGE_KEY, LEGACY_STORAGE_KEY]) {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || 'null');
      if (isGarden(saved) && saved.columns >= 3 && saved.columns <= 20 && saved.rows >= 3 && saved.rows <= 20) {
        return reconcileTransformationClocks(migrateGarden(saved));
      }
    } catch { /* try another saved version or the demo */ }
  }
  return createDemoGarden();
}

function SectionTitle({ eyebrow, title, right }) {
  return <div className="section-title"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{right}</div>;
}

function ConditionRow({ property, baseline, current, contributors, adjacencyEntry, anchoredAt, onChange }) {
  const steps = CONDITIONS[property];
  const currentIndex = steps.indexOf(current);
  const baselineIndex = steps.indexOf(baseline);
  const total = contributors.reduce((sum, item) => sum + item.modifier, 0);
  return <div className="condition-row">
    <div className="condition-heading"><span>{property}</span><strong>{current}</strong></div>
    <div className="condition-steps">{steps.map((name, index) => <div key={name} className={`condition-step ${index <= currentIndex ? 'is-filled' : ''} ${index === baselineIndex ? 'is-baseline' : ''}`} title={name} />)}</div>
    <div className="condition-meta"><label>Baseline <select aria-label={`${property} baseline`} value={baseline} onChange={(event) => onChange(property, event.target.value)}>{steps.map((value) => <option key={value}>{value}</option>)}</select></label>
      <span className={`delta ${total > 0 ? 'positive' : total < 0 ? 'negative' : ''}`}>{total === 0 ? '±0' : total > 0 ? `+${total}` : total} source modifier</span>
    </div>
    {anchoredAt && <div className="condition-note anchor-note">◆ Anchored at {anchoredAt}; incoming modifiers and adjacency cannot change this Condition.</div>}
    {adjacencyEntry && <div className="condition-note adjacency-note">↝ Adjacency {adjacencyEntry.modifier > 0 ? '+' : ''}{adjacencyEntry.modifier}: {adjacencyEntry.before} → {adjacencyEntry.after} ({adjacencyEntry.from.length} neighboring {adjacencyEntry.trigger} {adjacencyEntry.from.length === 1 ? 'hex' : 'hexes'} · {adjacencyEntry.kind}/{titleCase(adjacencyEntry.mode)})</div>}
  </div>;
}

export default function App() {
  const [garden, setGarden] = useState(initialGarden);
  const [overlay, setOverlay] = useState('Moisture');
  const [tool, setTool] = useState('inspect');
  const [plantSpecies, setPlantSpecies] = useState('Potato');
  const [fungusSpecies, setFungusSpecies] = useState('Dewmender');
  const [sowQuantity, setSowQuantity] = useState(1);
  const [selection, setSelection] = useState({ type: 'hex', key: keyAt(3, 3) });
  const [notice, setNotice] = useState('Select any hex to inspect what is affecting it.');
  const [showGuide, setShowGuide] = useState(false);
  const fileInput = useRef(null);
  const simulation = useMemo(() => calculateEnvironment(garden), [garden]);
  const cultivation = useMemo(() => calculateCultivation(garden, simulation), [garden, simulation]);
  const mycelialSupport = useMemo(() => calculateMycelialSupport(garden, simulation), [garden, simulation]);
  const selectedHex = selection.type === 'hex' ? garden.hexes[selection.key] : null;
  const selectedObject = selection.type === 'hex' ? garden.objects[selection.key] : null;
  const mycelialHere = selection.type === 'hex' && isMycelial(garden, selection.key);
  const mycelialSources = selection.type === 'hex' ? mycelialContributors(garden, selection.key).length : 0;
  const supportedMycelialSources = selection.type === 'hex'
    ? mycelialContributors(garden, selection.key).filter(id => mycelialSupport[id]?.includes(selection.key)).length : 0;
  const selectedEdge = selection.type === 'edge' ? garden.edges[selection.id] : null;
  const sourceCount = Object.values(garden.objects).filter((object) => object.type === 'source').length;
  const plantCount = Object.values(garden.objects).filter((object) => object.type === 'plant').length;
  const fungusCount = Object.values(garden.objects).filter((object) => object.type === 'fungus').length;
  const blockerCount = Object.values(garden.objects).filter((object) => object.type === 'blocker').length + Object.keys(garden.edges).length;
  const leaves = garden.inventory?.leaves || {};
  const seeds = garden.inventory?.seeds || {};
  const spores = garden.inventory?.spores || {};

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(garden)); } catch { /* the sandbox stays usable without storage */ }
  }, [garden]);

  function changeGarden(fn) {
    try {
      const next = reconcileTransformationClocks(fn(garden), garden);
      for (const [key, object] of Object.entries(next.objects)) {
        if (garden.objects[key]?.type === 'plant' && object.species !== garden.objects[key].species) {
          setNotice(`${garden.objects[key].species} transformed into ${object.species} on hex ${key} at the environment change!`);
        }
      }
      setGarden(next);
    }
    catch (error) { setNotice(error.message); }
  }

  function onHexClick(key) {
    setSelection({ type: 'hex', key });
    if (tool === 'sow-plant' || tool === 'sow-fungus') {
      try {
        const isPlant = tool === 'sow-plant';
        const species = isPlant ? plantSpecies : fungusSpecies;
        const result = isPlant ? sowPlant(garden, key, species, sowQuantity) : sowFungus(garden, key, species, sowQuantity);
        setGarden(reconcileTransformationClocks(result.garden, garden));
        setNotice(`${result.success ? 'Germinated' : 'Germination failed'}: ${species} · ${sowQuantity} ${isPlant ? 'Seeds' : 'Spores'} spent · ${Math.round(result.chance * 100)}% chance.`);
      } catch (error) { setNotice(error.message); }
    }
    if (tool === 'plant') changeGarden((previous) => placeObject(previous, key, makePlant(plantSpecies)));
    if (tool === 'fungus') changeGarden((previous) => placeObject(previous, key, makeFungus(fungusSpecies)));
    if (tool === 'source') changeGarden((previous) => placeObject(previous, key, makeSource()));
    if (tool === 'hex') changeGarden((previous) => placeObject(previous, key, makeBlocker()));
    if (tool === 'erase') changeGarden((previous) => removeObject(previous, key));
  }

  function advanceTime(hours) {
    try {
      const result = advanceGardenTime(garden, hours);
      setGarden(result.garden);
      setNotice(result.events.length ? result.events.slice(-2).join(' ') : `Advanced ${hours} in-game hour${hours === 1 ? '' : 's'}.`);
    } catch (error) { setNotice(error.message); }
  }

  function updateFungusHeading(heading) {
    if (selectedObject?.type !== 'fungus') return;
    const reconfigured = makeFungus(selectedObject.species, heading);
    changeGarden((previous) => updateObject(previous, selection.key, {
      ...reconfigured, progress: selectedObject.progress, ageHours: selectedObject.ageHours,
      sporeStock: selectedObject.sporeStock,
    }));
  }

  function harvestSelected() {
    if (selection.type !== 'hex' || !selectedObject) return;
    try {
      if (selectedObject.type === 'plant') {
        const output = availableHarvest(selectedObject, cultivation[selection.key] || [],
          simulation.conditions[selection.key]);
        setGarden(reconcileTransformationClocks(harvestPlant(garden, selection.key), garden));
        const seedDetail = output.seedStacks ? ` (${Object.entries(output.seedStacks).map(([name, amount]) => `${amount} ${name}`).join(' + ')})` : '';
        setNotice(`Harvested ${selectedObject.species}: ${output.leaves} ${selectedObject.species} Leaves, ${output.seeds} Seeds${seedDetail}${output.bambooSteel ? ', and one Bamboo Steel trophy' : ''}. The Plant was removed.`);
      } else if (selectedObject.type === 'fungus') {
        const output = Math.floor((selectedObject.sporeStock || 0) + 1e-9);
        setGarden(reconcileTransformationClocks(harvestFungus(garden, selection.key), garden));
        setNotice(`Harvested ${selectedObject.species}: ${output} Spores. The Fungus and its emissions were removed.`);
      }
    } catch (error) { setNotice(error.message); }
  }

  function onEdgeClick(a, b) {
    const id = edgeKey(a, b);
    setSelection({ type: 'edge', id, a, b });
    if (tool === 'edge' && !garden.edges[id]) changeGarden((previous) => placeEdgeBlocker(previous, a, b, makeBlocker()));
    if (tool === 'erase') changeGarden((previous) => removeEdgeBlocker(previous, a, b));
  }

  function updateEmission(index, field, value) {
    if (!selectedObject || selectedObject.type !== 'source') return;
    const emissions = selectedObject.emissions.map((emission, i) => {
      if (i !== index) return emission;
      const next = { ...emission, [field]: value };
      const matched = INFLUENCE_TYPES.find((item) => item.name === next.name);
      if (next.propagation === 'spread-budget') {
        return makeSpreadInfluence(next.name, Math.abs(next.modifier), next.budget ?? 6, next.heading ?? 0, next.rule ?? 'straight-until-blocked');
      }
      const mode = matched.property === 'Moisture' && next.mode === 'waterborne' ? 'airborne' : next.mode;
      const range = field === 'propagation' || !Number.isFinite(next.range) ? 2 : next.range;
      return makeInfluence(next.name, Math.abs(next.modifier), range, mode);
    });
    changeGarden((previous) => updateObject(previous, selection.key, { ...selectedObject, emissions }));
  }

  function updateSourceType(value) {
    if (selectedObject?.type !== 'source') return;
    const next = value === 'anchored'
      ? makeAnchoredSource('Temperature', 'Hot', selectedObject.emissions)
      : makeSource(selectedObject.emissions);
    changeGarden((previous) => updateObject(previous, selection.key, next));
  }

  function updateSourceAnchor(field, value) {
    if (selectedObject?.type !== 'source' || !selectedObject.anchor) return;
    const property = field === 'property' ? value : selectedObject.anchor.property;
    const condition = field === 'property' ? CONDITIONS[property].at(-1) : value;
    changeGarden((previous) => updateObject(previous, selection.key, makeAnchoredSource(property, condition, selectedObject.emissions)));
  }

  function updateSelectedBlocker(field, value) {
    const previous = selection.type === 'edge' ? selectedEdge : selectedObject;
    if (!previous || previous.type !== 'blocker') return;
    const next = { ...previous, [field]: value };
    if (field === 'rule') next.value = value === 'kind' ? 'Thermal' : value === 'mode' ? 'airborne' : '';
    if (selection.type === 'edge') changeGarden((gardenState) => placeEdgeBlocker(gardenState, selection.a, selection.b, next));
    else changeGarden((gardenState) => updateObject(gardenState, selection.key, next));
  }

  function updateSize(axis, direction) {
    const columns = garden.columns + (axis === 'columns' ? direction : 0);
    const rows = garden.rows + (axis === 'rows' ? direction : 0);
    changeGarden((previous) => resizeGarden(previous, columns, rows));
    setSelection({ type: 'hex', key: keyAt(0, 0) });
  }

  function loadDemo() {
    if (window.confirm('Replace your current garden with the example layout?')) {
      setGarden(createDemoGarden());
      setSelection({ type: 'hex', key: keyAt(3, 3) });
      setNotice('Example layout restored. Try selecting the Waterborne Source near the channel.');
    }
  }

  function newGarden() {
    if (window.confirm('Start a blank garden? Your current layout will be replaced.')) {
      setGarden(createGarden(garden.columns, garden.rows));
      setSelection({ type: 'hex', key: keyAt(0, 0) });
      setNotice('New garden created. Use the placement tools to experiment.');
    }
  }

  function exportGarden() {
    const url = URL.createObjectURL(new Blob([JSON.stringify(garden, null, 2)], { type: 'application/json' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'companion-garden.json';
    anchor.click();
    URL.revokeObjectURL(url);
    setNotice('Garden exported as JSON. The core engine can load the same state.');
  }

  async function importGarden(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const imported = JSON.parse(await file.text());
      if (!isGarden(imported) || imported.columns < 3 || imported.columns > 20 || imported.rows < 3 || imported.rows > 20) throw new Error('Unsupported garden file.');
      const upgraded = reconcileTransformationClocks(migrateGarden(imported));
      calculateEnvironment(upgraded);
      setGarden(upgraded);
      setSelection({ type: 'hex', key: Object.keys(imported.hexes)[0] });
      setNotice(imported.schemaVersion === 1 ? `Loaded ${file.name}; obsolete Materials and Fertility were removed.` : `Loaded ${file.name}`);
    } catch (error) { setNotice(`Import failed: ${error.message}`); }
    event.target.value = '';
  }

  return <div className="app-shell">
    <header className="topbar">
      <div className="brand"><div className="brand-mark">✤</div><div><span className="brand-kicker">THE GARDEN LABORATORY</span><h1>Companion <em>Cultivation</em></h1></div></div>
      <div className="top-actions"><span className="version-pill"><span className="live-dot"/> HARVEST · PROTOTYPE 11</span><button className="subtle-button" onClick={() => setShowGuide(true)}>How it works <span>↗</span></button></div>
    </header>

    <div className="workspace">
      <aside className="sidebar sidebar-left">
        <SectionTitle eyebrow="YOUR WORKBENCH" title="Garden tools" />
        <div className="tool-list">{TOOLS.map((item) => <button key={item.id} className={`tool-button ${tool === item.id ? 'active' : ''}`} title={item.hint} onClick={() => { setTool(item.id); setNotice(item.hint); }}><span className="tool-icon">{item.icon}</span><span>{item.title}</span><span className="tool-chevron">›</span></button>)}</div>
        {['plant', 'fungus', 'sow-plant', 'sow-fungus'].includes(tool) && <div className="biology-picker">
          <label>{tool === 'plant' || tool === 'sow-plant' ? 'PLANT SPECIES' : 'FUNGUS SPECIES'}
            <select value={tool === 'plant' || tool === 'sow-plant' ? plantSpecies : fungusSpecies} onChange={(event) => tool === 'plant' || tool === 'sow-plant' ? setPlantSpecies(event.target.value) : setFungusSpecies(event.target.value)}>
              {Object.keys(tool === 'plant' || tool === 'sow-plant' ? PLANTS : FUNGI).map(name => <option key={name}>{name}</option>)}
            </select>
          </label>
          {tool.startsWith('sow-') ? <><label>SEEDS / SPORES TO SPEND
            <input type="number" min="1" max="100" value={sowQuantity} onChange={(event) => setSowQuantity(Math.max(1, Math.min(100, Number(event.target.value) || 1)))}/>
          </label><p>Available: {(tool === 'sow-plant' ? seeds[plantSpecies] : spores[fungusSpecies]) || 0}. Every attempt spends all selected items, even on failure.</p></>
            : <p>Free sandbox spawning skips Seed/Spore costs. One organism or Blocker per hex.</p>}
          {(tool === 'fungus' || tool === 'sow-fungus') && FUNGI[fungusSpecies].habitat === 'dependent' && <p className="prototype-warning">Sowing requires existing Mycelial ground. Free debug spawning bypasses that check, but habitat-loss grace still applies.</p>}
        </div>}

        <div className="inventory-card"><div className="mini-heading">HARVEST INVENTORY</div>
          <div className="mini-heading">PLANT LEAVES · BY SPECIES</div>
          {Object.entries(leaves).filter(([, amount]) => amount > 0).map(([species, amount]) =>
            <div className="inventory-entry" key={species}><span>{species} Leaves</span><b>{amount}</b></div>)}
          {!Object.values(leaves).some(amount => amount > 0) && <p className="empty-hint">No Plant Leaves yet</p>}
          {(garden.inventory?.legacyLeaves || 0) > 0 && <div className="inventory-entry" title="Preserved from an older save, before Leaf species identity was recorded. Cannot be attributed to a specific Plant."><span>Legacy · unattributed Leaves</span><b>{garden.inventory.legacyLeaves}</b></div>}
          <div className="mini-heading">SEEDS</div>
          {Object.entries(seeds).filter(([, n]) => n > 0).map(([name, n]) => <div className="inventory-entry" key={name}><span>{name}</span><b>{n}</b></div>)}
          {!Object.values(seeds).some(n => n > 0) && <p className="empty-hint">No Seeds yet</p>}
          <div className="mini-heading">SPORES</div>
          {Object.entries(spores).filter(([, n]) => n > 0).map(([name, n]) => <div className="inventory-entry" key={name}><span>{name}</span><b>{n}</b></div>)}
          {!Object.values(spores).some(n => n > 0) && <p className="empty-hint">Harvest a Fungus to collect its Spores</p>}
          {(garden.inventory?.trophies?.bambooSteel || 0) > 0 && <><div className="mini-heading">TROPHIES</div>
            <div className="inventory-entry"><span>◆ Bamboo Steel</span><b>{garden.inventory.trophies.bambooSteel}</b></div></>}
        </div>

        <div className="section-divider"/>
        <SectionTitle eyebrow="ENVIRONMENT" title="View by property" />
        <div className="overlay-list">{PROPERTIES.map((name) => <button key={name} className={`overlay-choice ${overlay === name ? 'chosen' : ''}`} onClick={() => setOverlay(name)}><span className="overlay-dot" style={{ background: Object.values(PALETTES[name])[Math.floor(Object.values(PALETTES[name]).length / 2)] }}/>{name}<span>{overlay === name ? '●' : '○'}</span></button>)}</div>

        <div className="legend-card"><div className="mini-heading">{overlay.toUpperCase()} SCALE</div><div className="legend-swatches">{Object.entries(PALETTES[overlay]).map(([name, color]) => <div key={name} title={name} className="legend-item"><i style={{ background: color }}/><span>{name}</span></div>)}</div></div>
      </aside>

      <main className="garden-area">
        <div className="garden-heading"><div><span className="eyebrow">BIOLOGICAL SANDBOX</span><h2>The cultivation plot <span className="leaf-decoration">❧</span></h2><p>Place living organisms. Engineer their habitat. Advance time to watch them develop.</p></div><div className="garden-actions"><button onClick={loadDemo} title="Restore the example garden">↺ <span>Demo layout</span></button><button onClick={newGarden} title="Start a blank plot">＋ <span>New plot</span></button></div></div>

        <div className="time-controls"><span>⏳ DAY {Math.floor((garden.clockHours || 0) / 24) + 1} · HOUR {(garden.clockHours || 0) % 24}</span><div><button onClick={() => advanceTime(1)}>+1 hour</button><button onClick={() => advanceTime(24)}>+1 day</button></div><small>69 Transformation routes across all six designed families. Spices adds opposing-source light puzzles, Dark → Lit sequencing, and cross-species Seeds.</small></div>

        <div className="garden-surface"><div className="surface-topline"><span><span className="surface-led"/> LIVE SIMULATION</span><span>{garden.columns * garden.rows} HEXES <span className="separator">·</span> 6 NEIGHBORS / HEX</span></div>
          <div className="svg-scroll"><div className="svg-wrap"><HexGrid garden={garden} simulation={simulation} mycelialSupport={mycelialSupport} overlay={overlay} tool={tool} selection={selection} onHexClick={onHexClick} onEdgeClick={onEdgeClick}/></div></div>
          <div className="surface-bottomline"><span>❧ Plant</span><span>♧ Fungus</span><span><span className="mycelial-legend"/> Mycelial ground</span><span><span className="legend-symbol source-symbol">✦</span> Source</span><span><span className="legend-symbol tile-symbol">▧</span> Hex blocker</span><span><span className="edge-symbol"/> Edge blocker</span><span className="hint-right">{tool === 'edge' ? 'Click a border' : 'Click a hex'}</span></div>
        </div>
        <div className="plot-footer"><div className="plot-stat"><strong>{plantCount}</strong><span>Plants</span></div><div className="plot-stat"><strong>{fungusCount}</strong><span>Fungi</span></div><div className="plot-stat"><strong>{sourceCount}</strong><span>Test sources</span></div><div className="plot-stat"><strong>{blockerCount}</strong><span>Blockers</span></div><div className="plot-resize"><span>GRID SIZE</span><div><button onClick={() => updateSize('columns', -1)} aria-label="Remove a column">−</button><b>{garden.columns}</b><button onClick={() => updateSize('columns', 1)} aria-label="Add a column">+</button><span className="multiply">×</span><button onClick={() => updateSize('rows', -1)} aria-label="Remove a row">−</button><b>{garden.rows}</b><button onClick={() => updateSize('rows', 1)} aria-label="Add a row">+</button></div></div></div>
        <div className="notice-bar"><span>✧</span> {notice}</div>
      </main>

      <aside className="sidebar sidebar-right">
        <SectionTitle eyebrow="FIELD NOTES" title="Inspector" right={<span className="inspector-tag">{selection.type === 'hex' ? 'HEX' : 'EDGE'}</span>}/>
        {selection.type === 'hex' && selectedHex ? <>
          <div className="selected-summary"><div className="selected-illustration" style={{ background: PALETTES.Moisture[simulation.conditions[selection.key].Moisture] }}>⬡</div><div><span className="mini-heading">SELECTED HEX</span><h3>Hex {selection.key}</h3><p>Three environmental Properties</p></div></div>
          <div className={`mycelial-inspector ${mycelialHere ? 'is-mycelial' : ''} ${mycelialHere && !supportedMycelialSources ? 'is-retreating' : ''}`}><span className="mini-heading">MYCELIAL GROUND</span><strong>{mycelialHere ? `✥ ${supportedMycelialSources ? 'Supported' : 'Unsupported · retreating'} · ${mycelialSources} ${mycelialSources === 1 ? 'contribution' : 'contributions'}` : 'Not colonized'}</strong><small>{mycelialHere && supportedMycelialSources < mycelialSources ? `${mycelialSources - supportedMycelialSources} contribution(s) losing support. Restore a path before they decay.` : 'Existing ground fades through game time when unsupported; Flooded never relays it.'}</small></div>
          {selectedObject && <div className="object-card"><div className="object-header"><div><span className="mini-heading">HEX OCCUPANT</span><strong>{selectedObject.type === 'source' ? selectedObject.anchor ? '✥ Anchored Source' : '✦ Influence Source' : selectedObject.type === 'plant' ? `❧ ${selectedObject.species}` : selectedObject.type === 'fungus' ? `♧ ${selectedObject.species}` : '▣ Hex Blocker'}</strong></div><button className="icon-button remove-button" title="Remove object" onClick={() => changeGarden((previous) => removeObject(previous, selection.key))}>×</button></div>
            {selectedObject.type === 'source' ? <>
              <div className="source-config"><label>Source type<select aria-label="Source type" value={selectedObject.anchor ? 'anchored' : 'regular'} onChange={(event) => updateSourceType(event.target.value)}><option value="regular">Regular Source</option><option value="anchored">Anchored Source</option></select></label>
                {selectedObject.anchor && <><div className="field-pair"><label>Anchored Property<select aria-label="Anchored Property" value={selectedObject.anchor.property} onChange={(event) => updateSourceAnchor('property', event.target.value)}>{PROPERTIES.map((property) => <option key={property}>{property}</option>)}</select></label><label>Anchored Condition<select aria-label="Anchored Condition" value={selectedObject.anchor.condition} onChange={(event) => updateSourceAnchor('condition', event.target.value)}>{CONDITIONS[selectedObject.anchor.property].map((condition) => <option key={condition}>{condition}</option>)}</select></label></div><div className="anchor-summary">◆ {selectedObject.anchor.property} stays {selectedObject.anchor.condition} on this hex.</div></>}
              </div>
              {selectedObject.emissions.map((emission, index) => <div key={index} className="emission-editor"><div className="emission-title"><span>INFLUENCE {index + 1}</span><button aria-label="Remove influence" onClick={() => changeGarden((previous) => updateObject(previous, selection.key, { ...selectedObject, emissions: selectedObject.emissions.filter((_, i) => i !== index) }))}>×</button></div>
                <label>Influence<select value={emission.name} onChange={(event) => updateEmission(index, 'name', event.target.value)}>{INFLUENCE_TYPES.map((type) => <option key={type.name}>{type.name}</option>)}</select></label>
                <label>Propagation system<select aria-label={`Influence ${index + 1} propagation`} value={emission.propagation === 'spread-budget' ? 'spread-budget' : 'range'} onChange={(event) => updateEmission(index, 'propagation', event.target.value)}><option value="range">Propagation · Range / Network</option><option value="spread-budget">Spread Budget Propagation</option></select></label>
                {emission.propagation === 'spread-budget' ? <>
                  <div className="field-pair"><label>Strength<select value={Math.abs(emission.modifier)} onChange={(event) => updateEmission(index, 'modifier', Number(event.target.value))}>{[1, 2, 3].map((n) => <option key={n} value={n}>{emission.modifier < 0 ? '−' : '+'}{n}</option>)}</select></label><label>Starting Direction<select aria-label="Starting Direction" value={emission.heading} onChange={(event) => updateEmission(index, 'heading', Number(event.target.value))}>{STARTING_DIRECTIONS.map((direction, i) => <option key={direction} value={i}>{direction}</option>)}</select></label></div>
                  <label>Movement Rule<select aria-label="Movement Rule" value={emission.rule} onChange={(event) => updateEmission(index, 'rule', event.target.value)}>{MOVEMENT_RULES.map((rule) => <option key={rule.id} value={rule.id}>{rule.name}</option>)}</select></label>
                  <label>Spread Budget <span className="field-value">{emission.budget} crossings</span><input aria-label="Spread Budget" type="range" min="1" max="20" value={emission.budget} onChange={(event) => updateEmission(index, 'budget', Number(event.target.value))}/></label>
                  <div className="route-summary"><span>↝ {simulation.routes[`${selection.key}:${index}`]?.spent ?? 0} / {emission.budget} crossings used</span><span>{Math.max(0, (simulation.coverage[`${selection.key}:${index}`]?.length ?? 1) - 1)} reached hexes</span></div>
                  <p className="propagation-caption">Follows the chosen direction, then forks around obstacles. All branches share one budget. Routed Wetting can reach Dry ground.</p>
                </> : <>
                  <div className="field-pair"><label>Strength<select value={Math.abs(emission.modifier)} onChange={(event) => updateEmission(index, 'modifier', Number(event.target.value))}>{[1, 2, 3].map((n) => <option key={n} value={n}>{emission.modifier < 0 ? '−' : '+'}{n}</option>)}</select></label><label>Mode<select value={emission.mode} onChange={(event) => updateEmission(index, 'mode', event.target.value)}>{MODES.map((mode) => <option key={mode} value={mode} disabled={emission.property === 'Moisture' && mode === 'waterborne'}>{titleCase(mode)}</option>)}</select></label></div>
                  {emission.mode === 'waterborne' ? <p className="propagation-caption">Unlimited reach through connected Flooded hexes. Matching Blockers and Dry/Damp gaps can interrupt the network.</p> : <label>Range <span className="field-value">{emission.range} crossings</span><input type="range" min="0" max="8" value={emission.range} onChange={(event) => updateEmission(index, 'range', Number(event.target.value))}/></label>}
                </>}
                <div className="emission-foot">{emission.kind} <span>→</span> {emission.property} {emission.modifier > 0 ? '+' : ''}{emission.modifier}</div>
              </div>)}
              <button className="add-influence" onClick={() => changeGarden((previous) => updateObject(previous, selection.key, { ...selectedObject, emissions: [...selectedObject.emissions, makeInfluence('Brightening')] }))}>＋ Add another Influence</button>
            </> : selectedObject.type === 'plant' || selectedObject.type === 'fungus'
              ? <><OrganismFields object={selectedObject} conditions={simulation.conditions[selection.key]} contacts={cultivation[selection.key] || []} recipes={transformationStatus(garden, selection.key, simulation)} mycelialHere={mycelialHere} onHeadingChange={updateFungusHeading}/><button className="harvest-button" onClick={harvestSelected} disabled={selectedObject.species === 'Bamboozled' && selectedObject.progress < 100}>↧ Harvest {selectedObject.species === 'Bamboozled' ? 'Bamboo Steel trophy' : selectedObject.type === 'plant' ? 'Leaves & Seeds' : 'Spores'} · remove organism</button></>
              : <BlockerFields blocker={selectedObject} onChange={updateSelectedBlocker}/>}
          </div>}
          <div className="inspector-conditions"><div className="mini-heading">PROPERTY CONDITIONS <span>BASELINE → FINAL</span></div>{PROPERTIES.map((property) => <ConditionRow key={property} property={property} baseline={selectedHex.baselines[property]} current={simulation.conditions[selection.key][property]} contributors={simulation.modifiers[selection.key][property]} adjacencyEntry={simulation.adjacency[selection.key]?.find((entry) => entry.property === property)} anchoredAt={selectedObject?.type === 'source' && selectedObject.anchor?.property === property ? selectedObject.anchor.condition : null} onChange={(name, value) => changeGarden((previous) => setBaseline(previous, selection.key, name, value))}/>)}</div>
          <div className="influence-notes"><div className="mini-heading">REACHING THIS HEX</div>{PROPERTIES.flatMap((property) => simulation.modifiers[selection.key][property].map((entry, index) => <div className="contribution" key={`${property}-${index}`}><span className="contribution-symbol">↝</span><div><strong>{entry.influence}</strong><small>From {entry.source} · {entry.propagation === 'spread-budget' ? 'routed' : entry.mode} · {entry.distance} steps</small></div><b className={entry.modifier > 0 ? 'positive' : 'negative'}>{entry.modifier > 0 ? '+' : ''}{entry.modifier}</b></div>))}{PROPERTIES.every((property) => simulation.modifiers[selection.key][property].length === 0) && <p className="empty-hint">No emitted Source Influences currently reach this hex.</p>}
            {(simulation.adjacency[selection.key]?.length ?? 0) > 0 && <div className="adjacency-contributions"><div className="mini-heading">ENVIRONMENTAL ADJACENCY</div>{simulation.adjacency[selection.key].map((entry) => <div className="contribution adjacency-contribution" key={entry.property}><span className="contribution-symbol">⌁</span><div><strong>{entry.property}: {entry.before} → {entry.after}</strong><small>Neighboring {entry.trigger} at {entry.from.join(', ')} · {entry.kind}/{titleCase(entry.mode)}</small></div><b className={entry.modifier > 0 ? 'positive' : 'negative'}>{entry.modifier > 0 ? '+' : ''}{entry.modifier}</b></div>)}</div>}
          </div>
        </> : selection.type === 'edge' ? <div className="edge-inspector"><div className="edge-inspector-icon">╱</div><h3>Shared hex edge</h3><p>{selection.a} ↔ {selection.b}</p><p className="empty-hint">One edge belongs to both adjacent hexes. Blocking works in both directions.</p>{selectedEdge ? <div className="object-card"><BlockerFields blocker={selectedEdge} onChange={updateSelectedBlocker}/><button className="danger-outline" onClick={() => changeGarden((previous) => removeEdgeBlocker(previous, selection.a, selection.b))}>Remove edge blocker</button></div> : <button className="add-influence" onClick={() => changeGarden((previous) => placeEdgeBlocker(previous, selection.a, selection.b, makeBlocker()))}>＋ Place edge blocker</button>}</div> : null}
        <div className="data-actions"><button onClick={exportGarden}>↓ Export JSON</button><button onClick={() => fileInput.current?.click()}>↑ Import JSON</button><input ref={fileInput} type="file" accept=".json,application/json" hidden onChange={importGarden}/></div>
      </aside>
    </div>

    {showGuide && <div className="modal-backdrop" onMouseDown={() => setShowGuide(false)}><div className="guide-modal" role="dialog" aria-modal="true" aria-label="How the garden works" onMouseDown={(event) => event.stopPropagation()}>
      <button className="modal-close" onClick={() => setShowGuide(false)}>×</button>
      <span className="eyebrow">FIELD GUIDE · PROTOTYPE 09</span><h2>A garden of changing forms</h2>
      <p>All 69 approved first-pass Transformations across Ingredients, Flowers, Aquatic, Woodlands, Desert and Spices are active. Every Plant yields its own species-specific Leaves on harvest, rather than a shared Leaf currency. Named Fungi must actually reach a Plant through their environmental or cultivation footprints. Transformations create fresh 0% Plants; the physical light, water and temperature environment still matters after conversion.</p>
      <div className="guide-grid">
        <div><b>01 · Start any family</b><p>Sow Potato, Daisydaze, Aquatic Base, Woodlands Base, Jadeheart or Thymely Seeds, or free-spawn any Plant for testing. Select it to inspect its Transformation paths.</p></div>
        <div><b>02 · Shape the light</b><p>Thymely opens Bright Sunrice, Dim Moonrice and Dark Shadow Onion branches. Fungal emissions and placed Sources shift resolved Illumination for every organism.</p></div>
        <div><b>03 · Balance opposing light</b><p>Sunrice or Dillusion can become Pum'king only with both a positive and a negative named-Fungus Luminous environmental footprint actually reaching the Plant, while final Illumination remains Lit throughout its recipe clock.</p></div>
        <div><b>04 · Cross from Dark to Lit</b><p>Prepare Ghost Rice for 12 hours under Dark with Gloamclock or Duskleaf, then leave Dark and reach Lit within eight hours with Prismorel or Lanterncap contact.</p></div>
        <div><b>05 · Farm specialized Seeds</b><p>Thymekeeper yields Sunrice Seeds, Ghost Rice yields Moonrice Seeds, and Glass Apple yields Starberry Seeds. Pum'king is completely sterile. Earlier families retain their own Desert, Aquatic, Woodlands and Flowers exceptions.</p></div>
      </div><button className="primary-button" onClick={() => setShowGuide(false)}>Return to the garden →</button>
    </div></div>}
  </div>;
}

function OrganismFields({ object, conditions, contacts, recipes, mycelialHere, onHeadingChange }) {
  const plant = object.type === 'plant';
  const definition = plant ? PLANTS[object.species] : FUNGI[object.species];
  const rates = plant ? plantGrowthRates(object, conditions, contacts, mycelialHere) : null;
  return <div className="organism-details">
    <div className="organism-stat"><span>{stageOf(object)}</span><strong>{object.progress.toFixed(1)}%</strong></div>
    <div className="organism-progress"><div style={{ width: `${object.progress / 2}%` }}/></div>
    <p>{object.ageHours || 0} hours alive · {plant ? 'Growth → Ripening' : 'Growth → Sporulation'}</p>
    {plant ? <>
      <div className="organism-stat"><span>Current stage rate</span><strong>{((object.progress < 100 ? rates.growth : rates.ripening) * 100).toFixed(0)}%</strong></div>
      <p>Approved natural timing: {definition.growthDays} days to Growth completion; {definition.totalDays} days to 200% in optimal Conditions.</p>
      {object.species === 'Starlotus' && <p>Origin attunement: <strong>{object.attunement || 'unattuned test spawn'}</strong>. Native +60% Leaves {object.attunement && conditions.Moisture === object.attunement ? 'active' : 'inactive'} at current Moisture.</p>}
      {object.species === 'Silvercress' && <p>Native trait: +60% Growth while Flooded in Growth; +50% ordinary Leaves while Damp in Ripening.</p>}
      {object.species === 'Mandrakadabra' && <p>Bright vulnerability: <strong>{object.exposure?.Bright || 0}/4h</strong> consecutive resolved Bright is lethal. Lit is safest for Leaf farming.</p>}
      {object.species === 'Bramblewraith' && <p>Resilient specialist: Hot, Freezing and Mycelial reduce development/output but never directly kill it.</p>}
      {object.species === 'Bamboozled' && <p>{object.progress >= 100 ? '◆ Bamboo Steel trophy ready. Harvest for one trophy and zero Leaves/Seeds.' : 'Bamboo Steel trophy unlocks at 100% Growth. Ordinary Leaves and Seeds always stay zero.'}</p>}
      {object.species === 'Ember Aloe' && <p>Heat endurance: <strong>{object.exposure?.Hot || 0}h continuous Hot</strong>. A qualifying Hot → Warm edit with Chillanterelle or Rilllace gives Ashen Rose before 36h, or Aloemancer at 36h or later. It does not happen from cooling alone.</p>}
      {object.species === 'Moonjade' && <p>{conditions.Temperature === 'Freezing' ? 'Dormant: 0 progression and no new output.' : 'Active: progression resumes outside Freezing.'} Freezing endurance: <strong>{object.exposure?.Freezing || 0}/48h</strong>. A qualified Freezing → Cold thaw can yield Jadewisp or Pearadox.</p>}
      {object.species === 'Pearadox' && <p>Hot: +70% natural Leaves. Freezing: 75% lifecycle rate and +80% natural Seeds; neither extreme is lethal by itself.</p>}
      {object.species === 'Cactaclysm' && <p>Sterile Leaf specialist: 48 natural Leaves near 140% in Hot; Warm reduces its natural Leaf yield to 65% of the Hot peak.</p>}
      {(object.species === 'Sunrice' || object.species === 'Starberry' || object.species === 'Glass Apple') && <p>Bright-field crop: resolved Bright gives its best natural Leaf yield. {object.species === 'Glass Apple' ? 'Its Seeds grow Starberry, not Glass Apple.' : object.species === 'Starberry' ? 'Its Seeds grow Sunrice; Glass Apple can produce Starberry Seeds.' : 'Thymekeeper can also supply its Sunrice Seeds from Dim fields.'}</p>}
      {(object.species === 'Moonrice' || object.species === 'Thymekeeper') && <p>Dim-field Seed specialist. {object.species === 'Thymekeeper' ? 'Its harvest makes 28 Sunrice Seeds at full optimal maturity, not Thymekeeper Seeds.' : 'Its own 20 Moonrice Seeds sustain planting in Dim fields.'}</p>}
      {object.species === 'Ghost Rice' && <p>Dark-field Leaf specialist producing Moonrice Seeds. For Glass Apple, prepare Dark / Damp / Temperate-or-Cold with Gloamclock or Duskleaf for 12h; then leave Dark, cross through Dim if needed and reach Lit within 8h with Prismorel or Lanterncap contact.</p>}
      {object.species === 'Dillusion' && <p>Dim and Lit are equally productive. Its Pum'king path needs actual positive AND negative fungal environmental light reaching this hex with final resolved Lit; cultivation-only contact is insufficient.</p>}
      {object.species === "Pum'king" && <p>Sterile net-Lit specialist: up to 46 natural Leaves around 145%; Bright halves native output. Opposite-sign fungal emissions are needed to unlock it, not to retain the species afterward.</p>}
      <div className="mini-heading">HAZARD EXPOSURE</div>
      <div className="exposure-list">{['Dry', 'Hot', 'Freezing', 'Mycelial'].map(hazard => <span key={hazard}>{hazard}: {object.exposure?.[hazard] || 0}/{Number.isFinite(definition[`${hazard.toLowerCase()}Death`]) ? `${definition[`${hazard.toLowerCase()}Death`]}h` : 'nonlethal'}</span>)}</div>
      {recipes.length > 0 && <><div className="mini-heading">TRANSFORMATION EXPOSURE</div>
        <div className="exposure-list">{recipes.map(recipe => <span key={recipe.into} title={recipe.sequence
          ? recipe.sequence === 'heat-to-warm' ? `Hot → Warm with Chillanterelle OR Rilllace contact on the new environment, ${recipe.early ? 'before 36h' : 'at least 36h'} of continuous prior Hot exposure`
            : recipe.sequence === 'freeze-to-cold' ? `After 48h uninterrupted Freezing Dormancy, thaw to Cold with ${Object.entries(recipe.completion.conditions).map(([property, value]) => `${property}: ${value}`).join(' · ')} and named fungi: ${recipe.completion.contacts.map(group => group.join(' OR ')).join(' AND ')}`
            : recipe.sequence === 'mistruffle-departure' ? 'Damp / Dim, Mistruffle AND (Fogdial OR Veilcap) for 12 to fewer than 20 hours, then remove Mistruffle contact while retaining Damp / Dim and the other fungus'
            : recipe.sequence === 'flood-to-damp' ? '24h Flooded / Cold / Dim with Tidegill OR Rilllace, then Flooded → Damp drainage; pre-drain contact counts'
            : recipe.sequence === 'dark-to-lit' ? '12h Damp / Temperate-or-Cold / Dark with Gloamclock OR Duskleaf; leave Dark, then reach Lit with Prismorel OR Lanterncap within 8h while keeping Damp and valid Temperature'
            : '10h Damp / Temperate / Dim with Veilcap or Fogdial; leave Dim, then reach Bright with Prismorel or Glimmergill within 8h'
          : `${Object.entries(recipe.conditions).map(([property, value]) => `${property}: ${value}`).join(' · ')} · ${recipe.emission ? `reaching fungal ${recipe.emission}` : recipe.contacts.length ? `named fungi: ${recipe.contacts.map(group => group.join(' OR ')).join(' AND ')}` : 'no fungus required'}${recipe.opposingLight ? ' · positive and negative selected Fungal Luminous environmental emissions must both reach' : ''}${recipe.noMycelial ? ' · target must not be Mycelial' : ''}`}>
          {recipe.eligible ? '◆' : '○'} {recipe.into}: {recipe.phase === 'armed' ? `Armed ${recipe.elapsed}h · remove Mistruffle before 20h` : recipe.phase === 'early-recovery' ? `${recipe.elapsed}h Hot · recover before 36h` : recipe.phase === 'ready' ? recipe.sequence === 'flood-to-damp' ? 'Prepared · drain to Damp' : recipe.sequence === 'freeze-to-cold' ? 'Prepared · thaw to Cold' : recipe.sequence === 'heat-to-warm' ? 'Qualified · recover to Warm' : 'Prepared' : `${recipe.elapsed}/${recipe.hours}h`}{recipe.phase === 'crossing' ? recipe.sequence === 'dark-to-lit' ? ' · Lit window' : ' · Bright window' : ''}
        </span>)}</div>
        <p>◆ The current recipe phase qualifies. Any interruption resets its clock; hover for exact fungal and environmental requirements.</p></>}
      <div className="mini-heading">REACHING FUNGAL EFFECTS</div>
      {contacts.length ? contacts.map((contact, index) => <p key={`${contact.source}-${index}`}>{contact.species}: {contact.kind} {contact.amount > 0 ? '+' : ''}{contact.amount} {contact.implemented ? '· active' : '· effect pending'}</p>) : <p>No fungal cultivation Effects reach this Plant.</p>}
      <div className="organism-stat"><span>Harvestable {object.species} Leaves</span><strong>{availableHarvest(object, contacts, conditions).leaves}</strong></div>
      <div className="organism-stat"><span>Harvestable Seeds</span><strong>{availableHarvest(object, contacts, conditions).seeds}</strong></div>
      {definition.seedDistribution && <p>Seed identities: {Object.entries(availableHarvest(object, contacts, conditions).seedStacks).map(([name, amount]) => `${amount} ${name} Seeds`).join(' + ')}. Both stacks arrive in one consuming harvest.</p>}
      {object.species === 'Bamboozled' && <div className="organism-stat"><span>Bamboo Steel trophy</span><strong>{availableHarvest(object, contacts, conditions).bambooSteel ? 'Ready' : 'At 100%'}</strong></div>}
      <p>Accrued Leaves: {(object.production?.ordinaryLeaves || 0).toFixed(2)} ordinary + {(object.production?.hourlyLeaves || 0).toFixed(2)} hourly. Accrued Seeds: {(object.production?.ordinarySeeds || 0).toFixed(2)} ordinary + {(object.production?.hourlySeeds || 0).toFixed(2)} hourly.</p>
      <p className="prototype-warning">All six Plant families are active. Intermediate curve interpolation, some rounding and fungal Spore balance remain provisional.</p>
    </> : <>
      <p>Habitat: {definition.habitat}. Environmental and cultivation emissions are live.</p>
      {object.species === 'Mycelord' && <><div className="organism-stat"><span>Source of Mycelial ground</span><strong>{object.colonyId || 'New colony'}</strong></div><div className="organism-stat"><span>Flooded exposure</span><strong>{object.exposure?.Flooded || 0}/{MYCELIAL_TUNING.mycelordFloodDeathHours}h</strong></div></>}
      {definition.habitat === 'dependent' && <div className="organism-stat"><span>Time without Mycelial</span><strong>{object.exposure?.MissingMycelial || 0}/{MYCELIAL_TUNING.dependentHabitatGraceHours}h</strong></div>}
      {object.species === 'Frostfolio' && <p>{mycelialHere ? 'Mycelial source bonus active: 100% Leaf-favoring Allocation.' : 'Off Mycelial: 80% Leaf-favoring Allocation.'}</p>}
      <div className="organism-stat"><span>Harvestable own-Spores</span><strong>{Math.floor((object.sporeStock || 0) + 1e-9)}</strong></div>
      {definition.environment?.propagation === 'spread-budget' && <label>Emission direction<select value={object.heading || 0} onChange={(event) => onHeadingChange(Number(event.target.value))}>{STARTING_DIRECTIONS.map((direction, i) => <option key={direction} value={i}>{direction}</option>)}</select></label>}
      {definition.cultivation && <p>Cultivation: {definition.cultivation.kind} {definition.cultivation.amount > 0 ? '+' : ''}{definition.cultivation.amount} · {definition.cultivation.mode} (active)</p>}
      {definition.habitat === 'dependent' && !mycelialHere && <p className="prototype-warning">Habitat absent: this Fungus continues emitting during its grace period, then dies.</p>}
      {definition.habitat === 'preferring' && object.species !== 'Frostfolio' && <p className="prototype-warning">Mycelial preference bonus magnitude is not yet approved; base Effect stays active.</p>}
      <p className="prototype-warning">Fungal timing ({PROTOTYPE_TUNING.fungusGrowthHours}h + {PROTOTYPE_TUNING.fungusSporulationHours}h), Spore yields ({PROTOTYPE_TUNING.fungusSporeYieldAt200} at 200%) and germination ({PROTOTYPE_TUNING.fungusGerminationChance * 100}% per Spore) are temporary.</p>
    </>}
  </div>;
}

function BlockerFields({ blocker, onChange }) {
  return <div className="blocker-fields"><label>Blocking rule<select value={blocker.rule} onChange={(event) => onChange('rule', event.target.value)}><option value="full">Full — all effects</option><option value="kind">Selective — by Kind</option><option value="mode">Selective — by Mode</option></select></label>{blocker.rule === 'kind' && <label>Blocked Kind<select value={blocker.value} onChange={(event) => onChange('value', event.target.value)}>{KINDS.map((kind) => <option key={kind}>{kind}</option>)}</select></label>}{blocker.rule === 'mode' && <label>Blocked Mode<select value={blocker.value} onChange={(event) => onChange('value', event.target.value)}>{MODES.map((mode) => <option key={mode} value={mode}>{titleCase(mode)}</option>)}</select></label>}<p className="small-explanation">Blocks matching propagated Influences and one-hex Adjacency in both directions. Adjacency tags: Aqueous/Waterborne (Moisture), Thermal/Airborne (Temperature), Luminous/Airborne (Illumination). Routed Influences can still take alternate paths.</p></div>;
}
