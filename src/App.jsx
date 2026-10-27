import React, { useEffect, useMemo, useRef, useState } from 'react';
import HexGrid, { PALETTES } from './HexGrid.jsx';
import InventoryGrid from './InventoryGrid.jsx';
import CultivationGrimoire from './CultivationGrimoire.jsx';
import { PLAYER_TOOLS, DEVELOPER_TOOLS, isDeveloperTool, toolForVisibility } from './tool-catalog.js';
import './spread.css';
import './adjacency.css';
import './biology.css';
import './inventory.css';
import './save-game.css';
import {
  CONDITIONS, PROPERTIES, INFLUENCE_TYPES, KINDS, MODES,
  calculateEnvironment, createGarden, createDemoGarden, isGarden, migrateGarden, edgeKey, keyAt,
  resizeGarden, setBaseline, placeObject, removeObject, updateObject,
  placeEdgeBlocker, removeEdgeBlocker, makeInfluence, makeSpreadInfluence, makeSource, makeAnchoredSource, makeBlocker,
  STARTING_DIRECTIONS, MOVEMENT_RULES,
  PLANTS, FUNGI, makePlant, makeFungus, stageOf, advanceGardenTime,
  calculateCultivation, plantGrowthRates, PROTOTYPE_TUNING,
  harvestPlant, harvestFungus, availableHarvest,
  inventoryItems, ensureInventorySlots, moveInventoryStack,
  stagePlanting, unstagePlanting, moveStagedPlanting, applyStaging, availableToStage, reservedStock, STAGING_TUNING,
  isMycelial, mycelialContributors, calculateMycelialSupport, MYCELIAL_TUNING,
  transformationStatus, reconcileTransformationClocks,
  serializeGameSave, deserializeGameSave,
} from './core/index.js';

const STORAGE_KEY = 'companion-cultivation:sandbox:v5';
const PREVIOUS_STORAGE_KEYS = ['companion-cultivation:sandbox:v4', 'companion-cultivation:sandbox:v3', 'companion-cultivation:sandbox:v2',
  'companion-cultivation:sandbox:v1'];
const titleCase = (text) => text.charAt(0).toUpperCase() + text.slice(1);
function initialGarden() {
  for (const key of [STORAGE_KEY, ...PREVIOUS_STORAGE_KEYS]) {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || 'null');
      if (isGarden(saved) && saved.columns >= 3 && saved.columns <= 20 && saved.rows >= 3 && saved.rows <= 20) {
        return reconcileTransformationClocks(migrateGarden(saved));
      }
    } catch { /* try another saved version or the demo */ }
  }
  return ensureInventorySlots(createDemoGarden());
}

function SectionTitle({ eyebrow, title, right }) {
  return <div className="section-title"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{right}</div>;
}

function ConditionRow({ property, baseline, current, contributors, adjacencyEntry, anchoredAt, onChange, editable }) {
  const steps = CONDITIONS[property];
  const currentIndex = steps.indexOf(current);
  const baselineIndex = steps.indexOf(baseline);
  const total = contributors.reduce((sum, item) => sum + item.modifier, 0);
  return <div className="condition-row">
    <div className="condition-heading"><span>{property}</span><strong>{current}</strong></div>
    <div className="condition-steps">{steps.map((name, index) => <div key={name} className={`condition-step ${index <= currentIndex ? 'is-filled' : ''} ${index === baselineIndex ? 'is-baseline' : ''}`} title={name} />)}</div>
    <div className="condition-meta"><label>Baseline {editable ? <select aria-label={`${property} baseline`} value={baseline} onChange={(event) => onChange(property, event.target.value)}>{steps.map((value) => <option key={value}>{value}</option>)}</select> : <strong>{baseline}</strong>}</label>
      <span className={`delta ${total > 0 ? 'positive' : total < 0 ? 'negative' : ''}`}>{total === 0 ? '±0' : total > 0 ? `+${total}` : total} source modifier</span>
    </div>
    {anchoredAt && <div className="condition-note anchor-note">◆ Anchored at {anchoredAt}; incoming modifiers and adjacency cannot change this Condition.</div>}
    {adjacencyEntry && <div className="condition-note adjacency-note">↝ Adjacency {adjacencyEntry.modifier > 0 ? '+' : ''}{adjacencyEntry.modifier}: {adjacencyEntry.before} → {adjacencyEntry.after} ({adjacencyEntry.from.length} neighboring {adjacencyEntry.trigger} {adjacencyEntry.from.length === 1 ? 'hex' : 'hexes'} · {adjacencyEntry.kind}/{titleCase(adjacencyEntry.mode)})</div>}
  </div>;
}

export default function App() {
  const [garden, setGarden] = useState(initialGarden);
  const gardenRef = useRef(garden);
  gardenRef.current = garden;
  const [overlay, setOverlay] = useState('Moisture');
  const [tool, setTool] = useState('inspect');
  const [inventoryPage, setInventoryPage] = useState(0);
  const [heldItem, setHeldItem] = useState(null);
  const [quantityPrompt, setQuantityPrompt] = useState(null);
  const [dragGhost, setDragGhost] = useState(null);
  const dragRef = useRef(null);
  const [showDeveloperTools, setShowDeveloperTools] = useState(false);
  const [plantSpecies, setPlantSpecies] = useState('Potato');
  const [fungusSpecies, setFungusSpecies] = useState('Dewmender');
  const [selection, setSelection] = useState({ type: 'hex', key: keyAt(3, 3) });
  const [notice, setNotice] = useState('Select any hex to inspect what is affecting it.');
  const [autosaveStatus, setAutosaveStatus] = useState('Saving…');
  const [showGuide, setShowGuide] = useState(false);
  const [showGrimoire, setShowGrimoire] = useState(false);
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
  const laidOutGarden = useMemo(() => ensureInventorySlots(garden), [garden]);
  const items = useMemo(() => inventoryItems(garden.inventory).map(item =>
    ({ ...item, slot: laidOutGarden.inventorySlots[item.id] })), [garden.inventory, laidOutGarden]);
  const stagedCount = Object.keys(garden.staged || {}).length;
  const pendingCount = Object.keys(garden.pending || {}).length;
  const selectedStaged = selection.type === 'hex' ? garden.staged?.[selection.key] : null;
  const selectedPending = selection.type === 'hex' ? garden.pending?.[selection.key] : null;
  // Owning Seeds grants the right to sow them even when the Grimoire has not
  // identified their resulting Plant. Never list unowned hidden species here.
  const plantChoices = Object.keys(PLANTS).filter(species => tool !== 'sow-plant'
    || (garden.inventory.seeds?.[species] || 0) > 0);
  const chosenPlantSpecies = tool === 'sow-plant' && !plantChoices.includes(plantSpecies)
    ? plantChoices[0] : plantSpecies;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(garden));
      setAutosaveStatus('Autosaved');
    } catch {
      // Manual file backups remain available when browser storage is blocked.
      setAutosaveStatus('Autosave unavailable');
    }
  }, [garden]);

  // A temporary accelerated live clock; unlike staging, it never pauses the
  // established garden. Exact real/game time ratio remains a design decision.
  useEffect(() => {
    const timer = window.setInterval(() => {
      const result = advanceGardenTime(gardenRef.current, 1);
      replaceGarden(result.garden);
      if (result.events.length) setNotice(result.events.slice(-2).join(' '));
    }, STAGING_TUNING.realMillisecondsPerHour);
    return () => window.clearInterval(timer);
  }, []);

  function replaceGarden(next) {
    gardenRef.current = next;
    setGarden(next);
  }

  function changeGarden(fn) {
    try {
      const previous = gardenRef.current;
      const next = reconcileTransformationClocks(fn(previous), previous);
      for (const [key, object] of Object.entries(next.objects)) {
        if (previous.objects[key]?.type === 'plant' && object.species !== previous.objects[key].species) {
          setNotice(`${previous.objects[key].species} transformed into ${object.species} on hex ${key} at the environment change!`);
        }
      }
      replaceGarden(next);
    }
    catch (error) { setNotice(error.message); }
  }

  function openQuantityPrompt(key, kind, species, event, preferred = 1) {
    try {
      const current = gardenRef.current;
      if (current.objects[key] || current.pending?.[key]) throw new Error('This hex is already occupied.');
      const max = availableToStage(current, kind, species, key);
      if (max < 1) throw new Error(`No available ${species} ${kind === 'plant' ? 'Seeds' : 'Spores'} to stage.`);
      setQuantityPrompt({ key, kind, species, quantity: Math.min(preferred, max), max,
        x: Math.max(12, Math.min(window.innerWidth - 270, event?.clientX ?? window.innerWidth / 2)),
        y: Math.max(90, Math.min(window.innerHeight - 240, (event?.clientY ?? window.innerHeight / 3) + 12)) });
    } catch (error) { setNotice(error.message); }
  }

  function confirmQuantity() {
    if (!quantityPrompt) return;
    const { key, kind, species, quantity } = quantityPrompt;
    try {
      const next = stagePlanting(gardenRef.current, key, kind, species, quantity);
      replaceGarden(next);
      setQuantityPrompt(null);
      setNotice(`Staged ${quantity} ${species} ${kind === 'plant' ? 'Seeds' : 'Spores'} on hex ${key}. Press Apply when ready; no items spent yet.`);
    } catch (error) { setNotice(error.message); }
  }

  function applyPlan() {
    try {
      const result = applyStaging(gardenRef.current);
      replaceGarden(result.garden);
      setHeldItem(null);
      setNotice(`Applied ${result.details.length} planting${result.details.length === 1 ? '' : 's'}. Germination results remain hidden for ${STAGING_TUNING.germinationRevealHours} in-game hours; you may stage more immediately.`);
    } catch (error) { setNotice(error.message); }
  }

  function onHexClick(key, event) {
    setSelection({ type: 'hex', key });
    if (!showDeveloperTools && isDeveloperTool(tool)) return;
    if (heldItem?.type === 'seed' || heldItem?.type === 'spore') {
      openQuantityPrompt(key, heldItem.type === 'seed' ? 'plant' : 'fungus', heldItem.species, event,
        garden.staged?.[key]?.species === heldItem.species ? garden.staged[key].quantity : 1);
      return;
    }
    if (garden.staged?.[key]) {
      const entry = garden.staged[key];
      openQuantityPrompt(key, entry.kind, entry.species, event, entry.quantity);
      return;
    }
    if (tool === 'sow-plant' || tool === 'sow-fungus') {
      const isPlant = tool === 'sow-plant';
      if (isPlant && !chosenPlantSpecies) { setNotice('No known Plant Seeds are available.'); return; }
      openQuantityPrompt(key, isPlant ? 'plant' : 'fungus', isPlant ? chosenPlantSpecies : fungusSpecies, event);
      return;
    }
    if (tool === 'plant') changeGarden((previous) => placeObject(previous, key, makePlant(plantSpecies)));
    if (tool === 'fungus') changeGarden((previous) => placeObject(previous, key, makeFungus(fungusSpecies)));
    if (tool === 'source') changeGarden((previous) => placeObject(previous, key, makeSource()));
    if (tool === 'hex') changeGarden((previous) => placeObject(previous, key, makeBlocker()));
    if (tool === 'erase') changeGarden((previous) => removeObject(previous, key));
  }

  function advanceTime(hours) {
    try {
      const result = advanceGardenTime(gardenRef.current, hours);
      replaceGarden(result.garden);
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

  function harvestAt(key) {
    const current = gardenRef.current;
    const object = current.objects[key];
    if (!object) return;
    try {
      if (object.type === 'plant') {
        const output = availableHarvest(object, calculateCultivation(current)[key] || [], calculateEnvironment(current).conditions[key]);
        replaceGarden(reconcileTransformationClocks(harvestPlant(current, key), current));
        const seedDetail = output.seedStacks ? ` (${Object.entries(output.seedStacks).map(([name, amount]) => `${amount} ${name}`).join(' + ')})` : '';
        setNotice(`Harvested ${object.species}: ${output.leaves} ${object.species} Leaves, ${output.seeds} Seeds${seedDetail}${output.bambooSteel ? ', and one Bamboo Steel trophy' : ''}.`);
      } else if (object.type === 'fungus') {
        const output = Math.floor((object.sporeStock || 0) + 1e-9);
        replaceGarden(reconcileTransformationClocks(harvestFungus(current, key), current));
        setNotice(`Harvested ${object.species}: ${output} Spores.`);
      }
    } catch (error) { setNotice(error.message); }
  }

  function harvestSelected() {
    if (selection.type === 'hex') harvestAt(selection.key);
  }

  function startPointerDrag(type, payload, event) {
    if (event.button !== 0 || dragRef.current) return;
    const data = { type, payload, startX: event.clientX, startY: event.clientY, moving: false };
    dragRef.current = data;
    const cleanup = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end);
      window.removeEventListener('pointercancel', cancel);
      dragRef.current = null;
      setDragGhost(null);
    };
    const move = (pointer) => {
      if (Math.hypot(pointer.clientX - data.startX, pointer.clientY - data.startY) > 7) data.moving = true;
      if (data.moving) setDragGhost({ x: pointer.clientX + 12, y: pointer.clientY + 10,
        title: payload.name || payload.species || (type === 'staged' ? 'Move staged planting' : 'Harvest') });
    };
    const end = (pointer) => {
      const destination = document.elementFromPoint(pointer.clientX, pointer.clientY);
      const hex = destination?.closest?.('[data-garden-hex]')?.getAttribute('data-garden-hex');
      const slot = destination?.closest?.('[data-inventory-slot]')?.getAttribute('data-inventory-slot');
      const inventory = destination?.closest?.('[data-inventory-dropzone]');
      cleanup();
      if (!data.moving) {
        if (type === 'item') setHeldItem((current) => current?.id === payload.id ? null : payload);
        return;
      }
      if (type === 'item' && slot != null) {
        changeGarden(previous => moveInventoryStack(previous, payload.id, Number(slot)));
      } else if (type === 'item' && hex) {
        if (payload.type === 'seed' || payload.type === 'spore') {
          setSelection({ type: 'hex', key: hex });
          openQuantityPrompt(hex, payload.type === 'seed' ? 'plant' : 'fungus', payload.species, pointer);
        } else setNotice('Only Seeds and Spores can be planted. Move other item stacks within the inventory.');
      } else if (type === 'organism' && inventory) {
        harvestAt(payload.key);
      } else if (type === 'staged' && inventory) {
        changeGarden(previous => unstagePlanting(previous, payload.key));
        setNotice('Staged Seeds/Spores returned to available inventory without being spent.');
      } else if (type === 'staged' && hex && hex !== payload.key) {
        changeGarden(previous => moveStagedPlanting(previous, payload.key, hex));
      }
    };
    const cancel = () => cleanup();
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', cancel);
  }

  function onEdgeClick(a, b) {
    const id = edgeKey(a, b);
    setSelection({ type: 'edge', id, a, b });
    if (!showDeveloperTools && isDeveloperTool(tool)) return;
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
      replaceGarden(ensureInventorySlots(createDemoGarden()));
      setSelection({ type: 'hex', key: keyAt(3, 3) });
      setNotice('Example layout restored. Try selecting the Waterborne Source near the channel.');
    }
  }

  function newGarden() {
    if (window.confirm('Start a blank garden? Your current layout will be replaced.')) {
      replaceGarden(ensureInventorySlots(createGarden(garden.columns, garden.rows)));
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

  function saveGameFile() {
    try {
      const contents = serializeGameSave(gardenRef.current);
      const url = URL.createObjectURL(new Blob([contents], { type: 'application/json' }));
      const anchor = document.createElement('a');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      anchor.href = url;
      anchor.download = `companion-cultivation-${timestamp}.ccsave`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice('Save Game download requested. Keep the .ccsave file as a backup or move it to another device.');
    } catch (error) { setNotice(`Save failed: ${error.message}`); }
  }

  async function importGarden(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const upgraded = deserializeGameSave(await file.text());
      if (!window.confirm(`Load “${file.name}”? This replaces your current garden and its browser autosave. Save a backup first if you want to keep your current progress.`)) {
        setNotice('Load cancelled. Your current garden was not changed.');
        return;
      }
      replaceGarden(upgraded);
      setSelection({ type: 'hex', key: Object.keys(upgraded.hexes)[0] });
      setHeldItem(null);
      setQuantityPrompt(null);
      setInventoryPage(0);
      setTool('inspect');
      setNotice(`Loaded ${file.name}. Your garden, inventory arrangement, staging and germination clocks have been restored; browser autosave is active.`);
    } catch (error) { setNotice(`Load failed: ${error.message}. Your current garden was not changed.`); }
    finally { event.target.value = ''; }
  }

  function toggleDeveloperTools() {
    if (showDeveloperTools) setTool((current) => toolForVisibility(current, false));
    setShowDeveloperTools(!showDeveloperTools);
  }

  function renderTool(item) {
    return <button key={item.id} className={`tool-button ${tool === item.id ? 'active' : ''}`} title={item.hint} onClick={() => { setTool(item.id); setNotice(item.hint); }}><span className="tool-icon">{item.icon}</span><span>{item.title}</span><span className="tool-chevron">›</span></button>;
  }

  return <div className="app-shell">
    <header className="topbar">
      <div className="brand-controls"><div className="brand"><div className="brand-mark">✤</div><div><span className="brand-kicker">THE GARDEN LABORATORY</span><h1>Companion <em>Cultivation</em></h1></div></div>
        <button className={`developer-toggle ${showDeveloperTools ? 'is-on' : ''}`} aria-pressed={showDeveloperTools} onClick={toggleDeveloperTools}>{showDeveloperTools ? 'Hide developer tools' : 'Display developer tools'}</button>
      </div>
      <div className="top-actions"><span className="version-pill"><span className="live-dot"/> GRIMOIRE · PROTOTYPE 15</span>
        <button className="subtle-button" onClick={() => setShowGrimoire(true)} title="Open your garden's discovered species and observations">❦ Cultivation Grimoire</button>
        <div className="save-game-controls" aria-label="Save and load game">
          <span className={`autosave-indicator ${autosaveStatus === 'Autosaved' ? '' : 'is-warning'}`} role="status">{autosaveStatus === 'Autosaved' ? '✓ ' : '⚠ '}{autosaveStatus}</span>
          <button className="save-game-button" onClick={saveGameFile} title="Download a complete copy of your current garden">↓ Save Game</button>
          <button className="load-game-button" onClick={() => fileInput.current?.click()} title="Load a .ccsave file or earlier garden JSON">↑ Load Game</button>
          <input ref={fileInput} type="file" accept=".ccsave,.json,application/json" hidden aria-label="Choose a game save file" onChange={importGarden}/>
        </div>
        <button className="subtle-button" onClick={() => setShowGuide(true)}>How it works <span>↗</span></button>
      </div>
    </header>

    <div className="workspace">
      <aside className="sidebar sidebar-left">
        <SectionTitle eyebrow="YOUR WORKBENCH" title="Garden tools" />
        <div className="tool-list">{PLAYER_TOOLS.map(renderTool)}</div>
        {showDeveloperTools && <section className="developer-tools-panel" aria-label="Developer tools"><div className="mini-heading">DEVELOPER TOOLS · TEST ONLY</div><p>Bypass Seeds, Spores and normal placement rules to test the simulation.</p><div className="tool-list">{DEVELOPER_TOOLS.map(renderTool)}</div></section>}
        {['plant', 'fungus', 'sow-plant', 'sow-fungus'].includes(tool) && <div className="biology-picker">
          <label>{tool === 'plant' || tool === 'sow-plant' ? 'PLANT SPECIES' : 'FUNGUS SPECIES'}
            <select value={tool === 'plant' || tool === 'sow-plant' ? chosenPlantSpecies || '' : fungusSpecies} onChange={(event) => tool === 'plant' || tool === 'sow-plant' ? setPlantSpecies(event.target.value) : setFungusSpecies(event.target.value)}>
              {(tool === 'plant' || tool === 'sow-plant' ? plantChoices : Object.keys(FUNGI)).map(name => <option key={name}>{name}</option>)}
              {tool === 'sow-plant' && !plantChoices.length && <option value="">No known Seeds available</option>}
            </select>
          </label>
          {tool.startsWith('sow-') ? <p>Choose an empty hex to stage this species. A quantity selector will open; no Seeds or Spores are spent until Apply. Available: {tool !== 'sow-plant' || chosenPlantSpecies ? availableToStage(garden, tool === 'sow-plant' ? 'plant' : 'fungus', tool === 'sow-plant' ? chosenPlantSpecies : fungusSpecies) : 0}.</p>
            : <p>Developer spawning skips Seed/Spore costs. One organism or Blocker per hex.</p>}
          {(tool === 'fungus' || tool === 'sow-fungus') && FUNGI[fungusSpecies].habitat === 'dependent' && <p className="prototype-warning">Sowing requires existing Mycelial ground. Free debug spawning bypasses that check, but habitat-loss grace still applies.</p>}
        </div>}

        <InventoryGrid items={items} activePage={inventoryPage} onPageChange={setInventoryPage}
          heldId={heldItem?.id} onItemPointerDown={(item, event) => startPointerDrag('item', item, event)}
          reservedForHeld={heldItem && ['seed', 'spore'].includes(heldItem.type) ? reservedStock(garden, heldItem.type === 'seed' ? 'plant' : 'fungus', heldItem.species) : 0}
          onChooseItem={(item) => setHeldItem(heldItem?.id === item.id ? null : item)}
          onChooseSlot={(slot) => { if (heldItem) changeGarden(previous => moveInventoryStack(previous, heldItem.id, slot)); }}
          onPageHover={(page) => { if (dragRef.current?.type === 'item' && dragRef.current.moving) setInventoryPage(page); }}/>

        <div className="section-divider"/>
        <SectionTitle eyebrow="ENVIRONMENT" title="View by property" />
        <div className="overlay-list">{PROPERTIES.map((name) => <button key={name} className={`overlay-choice ${overlay === name ? 'chosen' : ''}`} onClick={() => setOverlay(name)}><span className="overlay-dot" style={{ background: Object.values(PALETTES[name])[Math.floor(Object.values(PALETTES[name]).length / 2)] }}/>{name}<span>{overlay === name ? '●' : '○'}</span></button>)}</div>

        <div className="legend-card"><div className="mini-heading">{overlay.toUpperCase()} SCALE</div><div className="legend-swatches">{Object.entries(PALETTES[overlay]).map(([name, color]) => <div key={name} title={name} className="legend-item"><i style={{ background: color }}/><span>{name}</span></div>)}</div></div>
      </aside>

      <main className="garden-area">
        <div className="garden-heading"><div><span className="eyebrow">BIOLOGICAL SANDBOX</span><h2>The cultivation plot <span className="leaf-decoration">❧</span></h2><p>Sow Seeds and Spores. Tend your organisms and watch them develop.</p></div>{showDeveloperTools && <div className="garden-actions"><button onClick={loadDemo} title="Restore the example garden">↺ <span>Demo layout</span></button><button onClick={newGarden} title="Start a blank plot">＋ <span>New plot</span></button></div>}</div>

        <div className="time-controls"><span>⏳ DAY {Math.floor((garden.clockHours || 0) / 24) + 1} · HOUR {(garden.clockHours || 0) % 24}</span><span className="live-time-label">LIVE · 1h / {STAGING_TUNING.realMillisecondsPerHour / 1000}s (temporary)</span>{showDeveloperTools && <><div><button onClick={() => advanceTime(1)}>+1 hour</button><button onClick={() => advanceTime(24)}>+1 day</button></div><small>Developer time controls; staging never pauses simulation time.</small></>}</div>

        <div className="staging-bar"><div><strong>PLANTING PLAN · {stagedCount} STAGED</strong><small>{pendingCount} pending germination · Existing Plants/Fungi keep growing while you plan.</small></div><button className="apply-staging-button" onClick={applyPlan} disabled={!stagedCount}>✓ Apply planting decisions</button></div>

        <div className="garden-surface"><div className="surface-topline"><span><span className="surface-led"/> LIVE SIMULATION</span><span>{garden.columns * garden.rows} HEXES <span className="separator">·</span> 6 NEIGHBORS / HEX</span></div>
          <div className="svg-scroll"><div className="svg-wrap"><HexGrid garden={garden} simulation={simulation} mycelialSupport={mycelialSupport} overlay={overlay} tool={tool} selection={selection} onHexClick={onHexClick} onEdgeClick={onEdgeClick} onStartHexDrag={(key, type, event) => startPointerDrag(type, { key, name: garden.staged?.[key]?.species || garden.objects[key]?.species }, event)}/></div></div>
          <div className="surface-bottomline"><span>❧ Plant</span><span>♧ Fungus</span><span><span className="mycelial-legend"/> Mycelial ground</span><span><span className="legend-symbol source-symbol">✦</span> Source</span><span><span className="legend-symbol tile-symbol">▧</span> Hex blocker</span><span><span className="edge-symbol"/> Edge blocker</span><span className="hint-right">{tool === 'edge' ? 'Click a border' : 'Click a hex'}</span></div>
        </div>
        <div className="plot-footer"><div className="plot-stat"><strong>{plantCount}</strong><span>Plants</span></div><div className="plot-stat"><strong>{fungusCount}</strong><span>Fungi</span></div><div className="plot-stat"><strong>{sourceCount}</strong><span>Test sources</span></div><div className="plot-stat"><strong>{blockerCount}</strong><span>Blockers</span></div>{showDeveloperTools && <div className="plot-resize"><span>GRID SIZE</span><div><button onClick={() => updateSize('columns', -1)} aria-label="Remove a column">−</button><b>{garden.columns}</b><button onClick={() => updateSize('columns', 1)} aria-label="Add a column">+</button><span className="multiply">×</span><button onClick={() => updateSize('rows', -1)} aria-label="Remove a row">−</button><b>{garden.rows}</b><button onClick={() => updateSize('rows', 1)} aria-label="Add a row">+</button></div></div>}</div>
        <div className="notice-bar"><span>✧</span> {notice}</div>
      </main>

      <aside className="sidebar sidebar-right">
        <SectionTitle eyebrow="FIELD NOTES" title="Inspector" right={<span className="inspector-tag">{selection.type === 'hex' ? 'HEX' : 'EDGE'}</span>}/>
        {selection.type === 'hex' && selectedHex ? <>
          <div className="selected-summary"><div className="selected-illustration" style={{ background: PALETTES.Moisture[simulation.conditions[selection.key].Moisture] }}>⬡</div><div><span className="mini-heading">SELECTED HEX</span><h3>Hex {selection.key}</h3><p>Three environmental Properties</p></div></div>
          <div className={`mycelial-inspector ${mycelialHere ? 'is-mycelial' : ''} ${mycelialHere && !supportedMycelialSources ? 'is-retreating' : ''}`}><span className="mini-heading">MYCELIAL GROUND</span><strong>{mycelialHere ? `✥ ${supportedMycelialSources ? 'Supported' : 'Unsupported · retreating'} · ${mycelialSources} ${mycelialSources === 1 ? 'contribution' : 'contributions'}` : 'Not colonized'}</strong><small>{mycelialHere && supportedMycelialSources < mycelialSources ? `${mycelialSources - supportedMycelialSources} contribution(s) losing support. Restore a path before they decay.` : 'Existing ground fades through game time when unsupported; Flooded never relays it.'}</small></div>
          {selectedStaged && <div className="planting-inspector"><strong>◌ Uncommitted planting · {selectedStaged.species}</strong><p>{selectedStaged.quantity} {selectedStaged.kind === 'plant' ? 'Seeds' : 'Spores'} reserved. Drag this marker to another empty hex, or back to inventory to cancel. It does not grow until Apply.</p><button onClick={() => changeGarden(previous => unstagePlanting(previous, selection.key))}>Return to inventory · unstage</button></div>}
          {selectedPending && <div className="planting-inspector"><strong>◈ Awaiting germination · {selectedPending.species}</strong><p>{selectedPending.quantity} {selectedPending.kind === 'plant' ? 'Seeds' : 'Spores'} committed · approximately {Math.max(0, selectedPending.readyAt - (garden.clockHours || 0))} in-game hours until the result is revealed. Outcome unknown.</p></div>}
          {selectedObject && <div className="object-card"><div className="object-header"><div><span className="mini-heading">HEX OCCUPANT</span><strong>{selectedObject.type === 'source' ? selectedObject.anchor ? '✥ Anchored Source' : '✦ Influence Source' : selectedObject.type === 'plant' ? `❧ ${selectedObject.species}` : selectedObject.type === 'fungus' ? `♧ ${selectedObject.species}` : '▣ Hex Blocker'}</strong></div>{showDeveloperTools && <button className="icon-button remove-button" title="Remove object" onClick={() => changeGarden((previous) => removeObject(previous, selection.key))}>×</button>}</div>
            {selectedObject.type === 'source' ? <>
              {showDeveloperTools ? <><div className="source-config"><label>Source type<select aria-label="Source type" value={selectedObject.anchor ? 'anchored' : 'regular'} onChange={(event) => updateSourceType(event.target.value)}><option value="regular">Regular Source</option><option value="anchored">Anchored Source</option></select></label>
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
              </> : <p className="small-explanation">{selectedObject.emissions.length} environmental Influence{selectedObject.emissions.length === 1 ? '' : 's'} emitted. Select nearby hexes to inspect the effects.</p>}
            </> : selectedObject.type === 'plant' || selectedObject.type === 'fungus'
              ? <><OrganismFields object={selectedObject} conditions={simulation.conditions[selection.key]} contacts={cultivation[selection.key] || []} recipes={showDeveloperTools ? transformationStatus(garden, selection.key, simulation) : []} mycelialHere={mycelialHere} debug={showDeveloperTools} onHeadingChange={showDeveloperTools ? updateFungusHeading : null}/><button className="harvest-button" onClick={harvestSelected} disabled={selectedObject.species === 'Bamboozled' && selectedObject.progress < 100}>↧ Harvest {selectedObject.species === 'Bamboozled' ? 'Bamboo Steel trophy' : selectedObject.type === 'plant' ? 'Leaves & Seeds' : 'Spores'} · remove organism</button></>
              : showDeveloperTools ? <BlockerFields blocker={selectedObject} onChange={updateSelectedBlocker}/> : <p className="small-explanation">Blocks: {selectedObject.rule === 'full' ? 'all effects' : `${selectedObject.rule} ${selectedObject.value}`}.</p>}
          </div>}
          <div className="inspector-conditions"><div className="mini-heading">PROPERTY CONDITIONS <span>BASELINE → FINAL</span></div>{PROPERTIES.map((property) => <ConditionRow key={property} property={property} baseline={selectedHex.baselines[property]} current={simulation.conditions[selection.key][property]} contributors={simulation.modifiers[selection.key][property]} adjacencyEntry={simulation.adjacency[selection.key]?.find((entry) => entry.property === property)} anchoredAt={selectedObject?.type === 'source' && selectedObject.anchor?.property === property ? selectedObject.anchor.condition : null} editable={showDeveloperTools} onChange={(name, value) => changeGarden((previous) => setBaseline(previous, selection.key, name, value))}/>)}</div>
          <div className={`influence-notes ${showDeveloperTools ? '' : 'grimoire-hidden'}`}><div className="mini-heading">REACHING THIS HEX · DEVELOPER</div>{PROPERTIES.flatMap((property) => simulation.modifiers[selection.key][property].map((entry, index) => <div className="contribution" key={`${property}-${index}`}><span className="contribution-symbol">↝</span><div><strong>{entry.influence}</strong><small>From {entry.source} · {entry.propagation === 'spread-budget' ? 'routed' : entry.mode} · {entry.distance} steps</small></div><b className={entry.modifier > 0 ? 'positive' : 'negative'}>{entry.modifier > 0 ? '+' : ''}{entry.modifier}</b></div>))}{PROPERTIES.every((property) => simulation.modifiers[selection.key][property].length === 0) && <p className="empty-hint">No emitted Source Influences currently reach this hex.</p>}
            {(simulation.adjacency[selection.key]?.length ?? 0) > 0 && <div className="adjacency-contributions"><div className="mini-heading">ENVIRONMENTAL ADJACENCY</div>{simulation.adjacency[selection.key].map((entry) => <div className="contribution adjacency-contribution" key={entry.property}><span className="contribution-symbol">⌁</span><div><strong>{entry.property}: {entry.before} → {entry.after}</strong><small>Neighboring {entry.trigger} at {entry.from.join(', ')} · {entry.kind}/{titleCase(entry.mode)}</small></div><b className={entry.modifier > 0 ? 'positive' : 'negative'}>{entry.modifier > 0 ? '+' : ''}{entry.modifier}</b></div>)}</div>}
          </div>
        </> : selection.type === 'edge' ? <div className="edge-inspector"><div className="edge-inspector-icon">╱</div><h3>Shared hex edge</h3><p>{selection.a} ↔ {selection.b}</p><p className="empty-hint">One edge belongs to both adjacent hexes. Blocking works in both directions.</p>{selectedEdge ? <div className="object-card">{showDeveloperTools ? <><BlockerFields blocker={selectedEdge} onChange={updateSelectedBlocker}/><button className="danger-outline" onClick={() => changeGarden((previous) => removeEdgeBlocker(previous, selection.a, selection.b))}>Remove edge blocker</button></> : <p className="small-explanation">Blocks: {selectedEdge.rule === 'full' ? 'all effects' : `${selectedEdge.rule} ${selectedEdge.value}`}.</p>}</div> : showDeveloperTools && <button className="add-influence" onClick={() => changeGarden((previous) => placeEdgeBlocker(previous, selection.a, selection.b, makeBlocker()))}>＋ Place edge blocker</button>}</div> : null}
        {showDeveloperTools && <div className="data-actions"><button onClick={exportGarden}>↓ Export JSON</button><button onClick={() => fileInput.current?.click()}>↑ Import JSON</button></div>}
      </aside>
    </div>

    {quantityPrompt && <div className="quantity-popover" role="dialog" aria-label="Choose planting quantity"
      style={{ left: quantityPrompt.x, top: quantityPrompt.y }}>
      <div className="mini-heading">STAGE {quantityPrompt.species.toUpperCase()} {quantityPrompt.kind === 'plant' ? 'SEEDS' : 'SPORES'}</div>
      <div className="quantity-stepper"><button aria-label="Decrease quantity" onClick={() => setQuantityPrompt(previous => ({ ...previous, quantity: Math.max(1, previous.quantity - 1) }))}>−</button>
        <input type="number" aria-label="Planting quantity" min="1" max={quantityPrompt.max} value={quantityPrompt.quantity}
          onChange={(event) => setQuantityPrompt(previous => ({ ...previous, quantity: Math.max(1, Math.min(previous.max, Math.floor(Number(event.target.value) || 1))) }))}/>
        <button aria-label="Increase quantity" onClick={() => setQuantityPrompt(previous => ({ ...previous, quantity: Math.min(previous.max, previous.quantity + 1) }))}>＋</button></div>
      <div className="quantity-presets">{[3, 5, 9, 15].map(n => <button key={n} disabled={n > quantityPrompt.max}
        className={n === quantityPrompt.quantity ? 'selected' : ''} onClick={() => setQuantityPrompt(previous => ({ ...previous, quantity: n }))}>{n}</button>)}</div>
      <p>{quantityPrompt.max} available to stage · nothing spent until Apply.</p>
      <div className="quantity-actions"><button onClick={() => setQuantityPrompt(null)}>Cancel</button>
        <button className="confirm" onClick={confirmQuantity}>Stage on hex {quantityPrompt.key}</button></div>
    </div>}
    {dragGhost && <div className="garden-drag-ghost" style={{ left: dragGhost.x, top: dragGhost.y }}>✤ {dragGhost.title}</div>}

    {showGrimoire && <CultivationGrimoire garden={garden} onClose={() => setShowGrimoire(false)}/>}
    {showGuide && <div className="modal-backdrop" onMouseDown={() => setShowGuide(false)}><div className="guide-modal" role="dialog" aria-modal="true" aria-label="How the garden works" onMouseDown={(event) => event.stopPropagation()}>
      <button className="modal-close" onClick={() => setShowGuide(false)}>×</button>
      <span className="eyebrow">FIELD GUIDE · PROTOTYPE 15</span><h2>A garden of changing forms</h2>
      <p>Transformations across Ingredients, Flowers, Aquatic, Woodlands, Desert and Spices are active. Every Plant yields its own species-specific Leaves on harvest, rather than a shared Leaf currency. Fungi must actually reach a Plant through their environmental or cultivation footprints. Transformations create fresh 0% Plants; the physical light, water and temperature environment still matters after conversion.</p>
      <p>Arrange the four 50-square inventory pages, drag Seeds or Spores to empty hexes, choose an amount, and press <strong>Apply planting decisions</strong>. Attempts are consumed together and their results stay hidden for a few in-game hours. You can stage more immediately, and existing organisms keep progressing while you plan. Drag living organisms back to inventory to harvest. Use <strong>Display developer tools</strong> beside the logo for unrestricted testing. The current accelerated 5-second clock is temporary balancing.</p>
      <p>Your garden autosaves in this browser. Use <strong>Save Game</strong> to download a portable .ccsave backup, and <strong>Load Game</strong> to restore it here or on another device. Loading replaces your current browser save after confirmation; staged placements and hidden germination timers are included. Browser-closed progression is not implemented yet.</p>
      <div className="guide-grid">
        <div><b>01 · Start any family</b><p>Six base Plants have available Seeds: Potato, Daisydaze, Aquatic Base, Woodlands Base, Jadeheart and Thymely. Experiment to discover other Plants.</p></div>
        <div><b>02 · Observe your garden</b><p>Moisture, Temperature and Illumination change around Sources, Fungi and Blockers. Test conditions and watch your Plants grow.</p></div>
        <div><b>03 · Cultivation Grimoire</b><p>Open the Grimoire from the top bar. All Fungi and the six base Plants are identified from the start. Observed conditions and interactions fill the pages permanently in this garden.</p></div>
        <div><b>04 · Discover transformations</b><p>Different environments and Fungi can change a Plant into a new species. Successfully witnessed recipes are recorded, but untried alternatives stay hidden.</p></div>
        <div><b>05 · Test and iterate</b><p>Developer tools reveal the complete species registry, recipe clocks and debug sources. Hide them to return to the normal discovery experience.</p></div>
      </div><button className="primary-button" onClick={() => setShowGuide(false)}>Return to the garden →</button>
    </div></div>}
  </div>;
}

function OrganismFields({ object, conditions, contacts, recipes, mycelialHere, onHeadingChange, debug = false }) {
  const plant = object.type === 'plant';
  const definition = plant ? PLANTS[object.species] : FUNGI[object.species];
  const rates = plant ? plantGrowthRates(object, conditions, contacts, mycelialHere) : null;
  return <div className="organism-details">
    <div className="organism-stat"><span>{stageOf(object)}</span><strong>{object.progress.toFixed(1)}%</strong></div>
    <div className="organism-progress"><div style={{ width: `${object.progress / 2}%` }}/></div>
    <p>{object.ageHours || 0} hours alive · {plant ? 'Growth → Ripening' : 'Growth → Sporulation'}</p>
    {plant ? <>
      <div className="organism-stat"><span>Current stage rate</span><strong>{((object.progress < 100 ? rates.growth : rates.ripening) * 100).toFixed(0)}%</strong></div>
      {debug && <><p>Approved natural timing: {definition.growthDays} days to Growth completion; {definition.totalDays} days to 200% in optimal Conditions.</p>
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
      {contacts.length ? contacts.map((contact, index) => <p key={`${contact.source}-${index}`}>{contact.species}: {contact.kind} {contact.amount > 0 ? '+' : ''}{contact.amount} {contact.implemented ? '· active' : '· effect pending'}</p>) : <p>No fungal cultivation Effects reach this Plant.</p>}</>}
      {!debug && <p className="small-explanation">Experiment with Conditions and Fungi to uncover this Plant's growing preferences and transformation recipes in the Cultivation Grimoire.</p>}
      <div className="organism-stat"><span>Harvestable {object.species} Leaves</span><strong>{availableHarvest(object, contacts, conditions).leaves}</strong></div>
      <div className="organism-stat"><span>Harvestable Seeds</span><strong>{availableHarvest(object, contacts, conditions).seeds}</strong></div>
      {debug && definition.seedDistribution && <p>Seed identities: {Object.entries(availableHarvest(object, contacts, conditions).seedStacks).map(([name, amount]) => `${amount} ${name} Seeds`).join(' + ')}. Both stacks arrive in one consuming harvest.</p>}
      {object.species === 'Bamboozled' && <div className="organism-stat"><span>Bamboo Steel trophy</span><strong>{availableHarvest(object, contacts, conditions).bambooSteel ? 'Ready' : 'At 100%'}</strong></div>}
      <p>Accrued Leaves: {(object.production?.ordinaryLeaves || 0).toFixed(2)} ordinary + {(object.production?.hourlyLeaves || 0).toFixed(2)} hourly. Accrued Seeds: {(object.production?.ordinarySeeds || 0).toFixed(2)} ordinary + {(object.production?.hourlySeeds || 0).toFixed(2)} hourly.</p>
      <p className="prototype-warning">All six Plant families are active. Intermediate curve interpolation, some rounding and fungal Spore balance remain provisional.</p>
    </> : <>
      {debug && <><p>Habitat: {definition.habitat}. Environmental and cultivation emissions are live.</p>
      {object.species === 'Mycelord' && <><div className="organism-stat"><span>Source of Mycelial ground</span><strong>{object.colonyId || 'New colony'}</strong></div><div className="organism-stat"><span>Flooded exposure</span><strong>{object.exposure?.Flooded || 0}/{MYCELIAL_TUNING.mycelordFloodDeathHours}h</strong></div></>}
      {definition.habitat === 'dependent' && <div className="organism-stat"><span>Time without Mycelial</span><strong>{object.exposure?.MissingMycelial || 0}/{MYCELIAL_TUNING.dependentHabitatGraceHours}h</strong></div>}
      {object.species === 'Frostfolio' && <p>{mycelialHere ? 'Mycelial source bonus active: 100% Leaf-favoring Allocation.' : 'Off Mycelial: 80% Leaf-favoring Allocation.'}</p>}</>}
      <div className="organism-stat"><span>Harvestable own-Spores</span><strong>{Math.floor((object.sporeStock || 0) + 1e-9)}</strong></div>
      {debug && definition.environment?.propagation === 'spread-budget' && (onHeadingChange ? <label>Emission direction<select value={object.heading || 0} onChange={(event) => onHeadingChange(Number(event.target.value))}>{STARTING_DIRECTIONS.map((direction, i) => <option key={direction} value={i}>{direction}</option>)}</select></label> : <p>Emission direction: {STARTING_DIRECTIONS[object.heading || 0]}.</p>)}
      {debug && definition.cultivation && <p>Cultivation: {definition.cultivation.kind} {definition.cultivation.amount > 0 ? '+' : ''}{definition.cultivation.amount} · {definition.cultivation.mode} (active)</p>}
      {definition.habitat === 'dependent' && !mycelialHere && <p className="prototype-warning">Habitat absent: this Fungus continues emitting during its grace period, then dies.</p>}
      {debug && definition.habitat === 'preferring' && object.species !== 'Frostfolio' && <p className="prototype-warning">Mycelial preference bonus magnitude is not yet approved; base Effect stays active.</p>}
      {debug && <p className="prototype-warning">Fungal timing ({PROTOTYPE_TUNING.fungusGrowthHours}h + {PROTOTYPE_TUNING.fungusSporulationHours}h), Spore yields ({PROTOTYPE_TUNING.fungusSporeYieldAt200} at 200%) and germination ({PROTOTYPE_TUNING.fungusGerminationChance * 100}% per Spore) are temporary.</p>}
      {!debug && <p className="small-explanation">Its known interactions are recorded in the Cultivation Grimoire after you observe them affecting Plants.</p>}
    </>}
  </div>;
}

function BlockerFields({ blocker, onChange }) {
  return <div className="blocker-fields"><label>Blocking rule<select value={blocker.rule} onChange={(event) => onChange('rule', event.target.value)}><option value="full">Full — all effects</option><option value="kind">Selective — by Kind</option><option value="mode">Selective — by Mode</option></select></label>{blocker.rule === 'kind' && <label>Blocked Kind<select value={blocker.value} onChange={(event) => onChange('value', event.target.value)}>{KINDS.map((kind) => <option key={kind}>{kind}</option>)}</select></label>}{blocker.rule === 'mode' && <label>Blocked Mode<select value={blocker.value} onChange={(event) => onChange('value', event.target.value)}>{MODES.map((mode) => <option key={mode} value={mode}>{titleCase(mode)}</option>)}</select></label>}<p className="small-explanation">Blocks matching propagated Influences and one-hex Adjacency in both directions. Adjacency tags: Aqueous/Waterborne (Moisture), Thermal/Airborne (Temperature), Luminous/Airborne (Illumination). Routed Influences can still take alternate paths.</p></div>;
}
