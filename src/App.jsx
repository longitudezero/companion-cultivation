import React, { useEffect, useMemo, useRef, useState } from 'react';
import HexGrid, { PALETTES, gridDimensions } from './HexGrid.jsx';
import InventoryGrid from './InventoryGrid.jsx';
import CultivationGrimoire from './CultivationGrimoire.jsx';
import GardenInspector from './ui/GardenInspector.jsx';
import GardenCamera from './ui/GardenCamera.jsx';
import SimulationControls from './ui/SimulationControls.jsx';
import RuneDivider from './ui/RuneDivider.jsx';
import IllustratedButton from './ui/IllustratedButton.jsx';
import MainMenu, { MainMenuIcon } from './ui/MainMenu.jsx';
import Taskboard, { TaskboardIcon } from './ui/Taskboard.jsx';
import TaskTracker from './ui/TaskTracker.jsx';
import TutorialResetDialog from './ui/TutorialResetDialog.jsx';
import Shop, { ShopIcon } from './ui/Shop.jsx';
import { tradeShop } from './core/shop.js';
import { harvestItems, mergeHarvestReceipt } from './ui/harvest-receipts.js';
import { createTutorialGarden, updateTaskProgress, claimTask, toggleTaskPin, taskStatus, TASKS, TASK_IDS, FIRST_TASK } from './core/tasks.js';
import InventoryResizer from './ui/InventoryResizer.jsx';
import useSimulationClock from './ui/useSimulationClock.js';
import { inventoryWidthFor } from './ui/view-model.js';
import { HEX_SIZE, plantingPopoverPosition } from './ui/hex-model.js';
import { restoreStagingPlan } from './ui/garden-model.js';
import { art as grimoireArt } from './grimoire/art.js';
import { DEVELOPER_TOOLS, isDeveloperTool, toolForVisibility } from './tool-catalog.js';
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
  formatRealDuration,
  calculateCultivation, plantGrowthRates, PROTOTYPE_TUNING,
  harvestPlant, harvestFungus, availableHarvest,
  inventoryItems, ensureInventorySlots, moveInventoryStack,
  stagePlanting, unstagePlanting, moveStagedPlanting, applyStaging, plantImmediately, availableToStage, reservedStock, STAGING_TUNING,
  isMycelial, mycelialContributors, calculateMycelialSupport, MYCELIAL_TUNING,
  transformationStatus, reconcileTransformationClocks,
  serializeGameSave, deserializeGameSave,
  SOURCE_ITEMS, SOURCE_ITEM_GROUPS, isPlayerSource,
  grantSourceItem, placeSourceItem, moveSourceItem, pickupSourceItem, rotateSourceItem, rotateStagedFungus,
} from './core/index.js';

// Keep the same autosave key: loading upgrades V6 plant names to V7 once,
// preserving existing gardens before the first V7 autosave is written.
const STORAGE_KEY = 'companion-cultivation:sandbox:v6';
const titleCase = (text) => text.charAt(0).toUpperCase() + text.slice(1);
function initialGarden() {
  for (const key of [STORAGE_KEY]) {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || 'null');
      if (isGarden(saved) && saved.columns >= 3 && saved.columns <= 20 && saved.rows >= 3 && saved.rows <= 20) {
        return reconcileTransformationClocks(migrateGarden(saved));
      }
    } catch { /* try another saved version or the demo */ }
  }
  return createTutorialGarden();
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
  const [tool, setTool] = useState('inspect');
  const [inventoryPage, setInventoryPage] = useState(0);
  const [heldItem, setHeldItem] = useState(null);
  const [quantityPrompt, setQuantityPrompt] = useState(null);
  const [dragGhost, setDragGhost] = useState(null);
  const dragRef = useRef(null), dragCleanup = useRef(null);
  const stagingHistory = useRef([]), rotationSnapshot = useRef(null);
  const [undoCount, setUndoCount] = useState(0);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [showDeveloperTools, setShowDeveloperTools] = useState(false);
  const [plantSpecies, setPlantSpecies] = useState('Beanstalk');
  const [fungusSpecies, setFungusSpecies] = useState('Dewmender');
  const [grantItemType, setGrantItemType] = useState('ember-pebble');
  const [selection, setSelection] = useState({ type: 'hex', key: keyAt(3, 3) });
  const [notice, setNoticeState] = useState(null);
  const noticeSerial = useRef(0);
  const [inventoryWidth, setInventoryWidth] = useState(() => { try { const n = Number(localStorage.getItem('companion-cultivation:inventory-width')); return Number.isFinite(n) && n >= 208 ? inventoryWidthFor(n, window.innerWidth) : 300; } catch { return 300; } });
  const [autosaveStatus, setAutosaveStatus] = useState('Saving…');
  const [showGuide, setShowGuide] = useState(false);
  const [showGrimoire, setShowGrimoire] = useState(false);
  const [bookEntry, setBookEntry] = useState(null);
  const [showTaskboard, setShowTaskboard] = useState(false), [taskEntry, setTaskEntry] = useState(FIRST_TASK);
  const [showShop, setShowShop] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(false);
  const [stagingEnabled, setStagingEnabled] = useState(() => {
    try { return Object.keys(garden.staged || {}).length > 0 || localStorage.getItem('companion-cultivation:staging-enabled') !== 'false'; }
    catch { return true; }
  });
  const [showTutorialReset, setShowTutorialReset] = useState(false);
  const [harvestReceipt, setHarvestReceipt] = useState(null), [cameraRevision, setCameraRevision] = useState(0);
  const harvestSequence = useRef(0);
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
  const sourceCount = Object.values(garden.objects).filter((object) => object.type === 'source' && !isPlayerSource(object)).length;
  const deployedItemCount = Object.values(garden.objects).filter(isPlayerSource).length;
  const plantCount = Object.values(garden.objects).filter((object) => object.type === 'plant').length;
  const fungusCount = Object.values(garden.objects).filter((object) => object.type === 'fungus').length;
  const blockerCount = Object.values(garden.objects).filter((object) => object.type === 'blocker').length + Object.keys(garden.edges).length;
  const laidOutGarden = useMemo(() => ensureInventorySlots(garden), [garden]);
  const items = useMemo(() => inventoryItems(garden.inventory).map(item =>
    ({ ...item, slot: laidOutGarden.inventorySlots[item.id] })), [garden.inventory, laidOutGarden]);
  const stagedCount = Object.keys(garden.staged || {}).length;
  const pendingCount = Object.keys(garden.pending || {}).length;
  const selectedStaged = selection.type === 'hex' ? garden.staged?.[selection.key] : null;
  const stagedFungusDefinition = selectedStaged?.kind === 'fungus' ? FUNGI[selectedStaged.species] : null;
  const stagedBudget = stagedFungusDefinition?.environment?.propagation === 'spread-budget'
    || stagedFungusDefinition?.cultivation?.propagation === 'spread-budget';
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

  const clock = useSimulationClock(hours => {
    const result = advanceGardenTime(gardenRef.current, hours);
    replaceGarden(result.garden);
    if (result.events.length) setNotice(result.events.slice(-2).join(' '));
  });

  function setNotice(text) {
    setNoticeState({ text, id: ++noticeSerial.current,
      error: /cannot|invalid|not enough|full|failed|already|must|requires|choose/i.test(text) });
  }
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNoticeState(null), notice.error ? 7000 : 3500);
    return () => window.clearTimeout(timer);
  }, [notice?.id]);
  useEffect(() => {
    const resize = () => setInventoryWidth(value => inventoryWidthFor(value, window.innerWidth));
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  useEffect(() => { try { localStorage.setItem('companion-cultivation:inventory-width', String(inventoryWidth)); } catch { /* UI remains usable */ } }, [inventoryWidth]);
  useEffect(() => { try { localStorage.setItem('companion-cultivation:staging-enabled', String(stagingEnabled)); } catch { /* The current session still uses the setting. */ } }, [stagingEnabled]);

  useEffect(() => {
    if (!harvestReceipt) return;
    const timer = window.setTimeout(() => setHarvestReceipt(null), 4000);
    return () => window.clearTimeout(timer);
  }, [harvestReceipt?.id]);

  function openMainMenu() {
    dragCleanup.current?.(); setHeldItem(null); setQuantityPrompt(null);
    setShowGrimoire(false); setShowTaskboard(false); setShowShop(false); setShowGuide(false); setShowMainMenu(true);
  }
  function openGrimoire() {
    dragCleanup.current?.(); setHeldItem(null); setQuantityPrompt(null);
    setShowMainMenu(false); setShowTaskboard(false); setShowShop(false); setShowGuide(false); setBookEntry(null); setShowGrimoire(true);
  }
  function openTaskboard(id = FIRST_TASK) {
    setShowMainMenu(false);
    dragCleanup.current?.(); setHeldItem(null); setQuantityPrompt(null);
    setShowGrimoire(false); setShowShop(false); setTaskEntry(id); setShowTaskboard(true);
  }
  function openShop() {
    setShowMainMenu(false);
    dragCleanup.current?.(); setHeldItem(null); setQuantityPrompt(null);
    setShowGrimoire(false); setShowTaskboard(false); setShowGuide(false); setShowShop(true);
  }
  function tradeInShop(mode, id, quantity) {
    const result = tradeShop(gardenRef.current, mode, id, quantity);
    replaceGarden(result.garden);
    return result.receipt;
  }
  function startTutorial() {
    replaceGarden(createTutorialGarden()); clock.reset(); setCameraRevision(value => value + 1);
    clearPlanHistory(); setSelection({ type: 'hex', key: '0,0' }); setTool('inspect');
    setHeldItem(null); setQuantityPrompt(null); setInventoryPage(0); setShowDeveloperTools(false);
    setHarvestReceipt(null); setNoticeState(null);
    setShowTutorialReset(false);
  }
  function requestTutorial() {
    dragCleanup.current?.(); setHeldItem(null); setQuantityPrompt(null);
    setShowTaskboard(false); setShowShop(false); setShowGrimoire(false); setShowGuide(false);
    setShowMainMenu(false); setShowTutorialReset(true);
  }
  function completeTask(id) {
    replaceGarden(claimTask(gardenRef.current, id));
    return TASKS[id];
  }
  function inspectCarrot() {
    const key = Object.keys(gardenRef.current.objects).find(key => gardenRef.current.objects[key].species === 'Carrot');
    if (key) { setSelection({ type: 'hex', key }); setShowTaskboard(false); }
  }

  function openSpeciesEntry(object) {
    setShowShop(false);
    setBookEntry(`${object.type === 'fungus' ? 'fungus' : 'plant'}:${object.species}`);
    setShowGrimoire(true);
  }

  function replaceGarden(next) {
    gardenRef.current = next;
    setGarden(next);
  }

  function clearPlanHistory() {
    stagingHistory.current = [];
    rotationSnapshot.current = null;
    setUndoCount(0);
  }

  function rememberStaging(snapshot) {
    stagingHistory.current.push(snapshot || {});
    setUndoCount(stagingHistory.current.length);
  }

  function changeStaging(fn) {
    const before = gardenRef.current.staged || {};
    if (changeGarden(fn) && rotationSnapshot.current == null
      && JSON.stringify(before) !== JSON.stringify(gardenRef.current.staged || {})) rememberStaging(before);
  }

  function undoPlanAction() {
    if (!stagingHistory.current.length) return;
    try {
      replaceGarden(restoreStagingPlan(gardenRef.current, stagingHistory.current.at(-1)));
      stagingHistory.current.pop();
      setUndoCount(stagingHistory.current.length);
      setQuantityPrompt(null);
      setNotice('Last staging action undone. The garden is still progressing.');
    } catch (error) { setNotice(`Cannot undo this edit: ${error.message} You can cancel the uncommitted plan.`); }
  }

  function cancelPlan() {
    replaceGarden({ ...gardenRef.current, staged: {} });
    clearPlanHistory();
    setQuantityPrompt(null);
    setHeldItem(null);
    setNotice('Staging phase cancelled. All unspent reservations released.');
  }

  useEffect(() => {
    const escape = event => {
      if (event.key === 'Escape' && !showGrimoire && !showGuide && !showTaskboard && !showShop && !showMainMenu) {
        setHeldItem(null); setQuantityPrompt(null); setInventoryOpen(false);
      }
    };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [showGrimoire, showGuide, showTaskboard, showShop, showMainMenu]);

  function changeGarden(fn) {
    try {
      const previous = gardenRef.current;
      const next = updateTaskProgress(reconcileTransformationClocks(fn(previous), previous), previous);
      for (const [key, object] of Object.entries(next.objects)) {
        if (previous.objects[key]?.type === 'plant' && object.species !== previous.objects[key].species) {
          setNotice(`${previous.objects[key].species} transformed into ${object.species} on hex ${key} at the environment change!`);
        }
      }
      replaceGarden(next);
      return true;
    }
    catch (error) { setNotice(error.message); return false; }
  }

  function openQuantityPrompt(key, kind, species, event, preferred = 1) {
    try {
      const current = gardenRef.current;
      if (current.objects[key] || current.pending?.[key]) throw new Error('This hex is already occupied.');
      const max = availableToStage(current, kind, species, key);
      if (max < 1) throw new Error(`No available ${species} ${kind === 'plant' ? 'Seeds' : 'Spores'} to stage.`);
      const bounds = document.querySelector(`[data-garden-hex="${key}"]`)?.getBoundingClientRect()
        || { left: (event?.clientX ?? window.innerWidth / 2) - Math.sqrt(3) * HEX_SIZE / 2,
          top: (event?.clientY ?? window.innerHeight / 3) - HEX_SIZE, width: Math.sqrt(3) * HEX_SIZE, height: 2 * HEX_SIZE };
      setQuantityPrompt({ key, kind, species, quantity: Math.min(preferred, max), max,
        heading: kind === 'fungus' ? current.staged?.[key]?.heading ?? 0 : 0,
        ...plantingPopoverPosition(bounds, { width: window.innerWidth, height: window.innerHeight }) });
    } catch (error) { setNotice(error.message); }
  }

  function confirmQuantity() {
    if (!quantityPrompt) return;
    const { key, kind, species, quantity, heading } = quantityPrompt;
    try {
      if (stagingEnabled) {
        const next = stagePlanting(gardenRef.current, key, kind, species, quantity, heading);
        if (JSON.stringify(next.staged) !== JSON.stringify(gardenRef.current.staged || {})) rememberStaging(gardenRef.current.staged);
        replaceGarden(next);
        setNotice(`Staged ${quantity} ${species} ${kind === 'plant' ? 'Seeds' : 'Spores'} on hex ${key}. Press Apply when ready; no items spent yet.`);
      } else {
        if (!changeGarden(current => plantImmediately(current, key, kind, species, quantity, heading).garden)) return;
        setHeldItem(null);
        setNotice(`Planted ${quantity} ${species} ${kind === 'plant' ? 'Seeds' : 'Spores'} on hex ${key}. Germination has begun.`);
      }
      setQuantityPrompt(null);
    } catch (error) { setNotice(error.message); }
  }

  function applyPlan() {
    try {
      const result = applyStaging(gardenRef.current);
      replaceGarden(result.garden);
      clearPlanHistory();
      setHeldItem(null);
      setNotice(`Sowed ${result.details.length} planting${result.details.length === 1 ? '' : 's'}. Watch for new growth.`);
    } catch (error) { setNotice(error.message); }
  }

  function onHexClick(key, event) {
    setSelection({ type: 'hex', key });
    if (!showDeveloperTools && isDeveloperTool(tool)) return;
    if (heldItem?.type === 'source-item') {
      changeGarden(previous => placeSourceItem(previous, heldItem.id, key));
      if (!gardenRef.current.inventory.sourceItems?.[heldItem.id]) setHeldItem(null);
      return;
    }
    if (heldItem?.type === 'seed' || heldItem?.type === 'spore') {
      openQuantityPrompt(key, heldItem.type === 'seed' ? 'plant' : 'fungus', heldItem.species, event,
        garden.staged?.[key]?.species === heldItem.species ? garden.staged[key].quantity : 1);
      return;
    }
    if (garden.staged?.[key]) {
      // A selected staged Budget Fungus needs an unobstructed rotation handle.
      // Quantity editing stays available in the inspector.
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
      setNotice(result.events.length ? result.events.slice(-2).join(' ') : `Advanced the garden by ${formatRealDuration(hours)} of live progression.`);
    } catch (error) { setNotice(error.message); }
  }

  function harvestAt(key) {
    const current = gardenRef.current;
    const object = current.objects[key];
    if (!object) return;
    try {
      if (!['plant', 'fungus'].includes(object.type)) return false;
      const harvested = object.type === 'plant' ? harvestPlant(current, key) : harvestFungus(current, key);
      const next = updateTaskProgress(reconcileTransformationClocks(harvested, current), current);
      replaceGarden(next);
      const collected = harvestItems(current, next), id = ++harvestSequence.current, now = performance.now();
      setHarvestReceipt(previous => mergeHarvestReceipt(previous, collected, now, id));

      return true;
    } catch (error) { setNotice(error.message); return false; }
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
      dragCleanup.current = null;
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
        } else if (payload.type === 'source-item') {
          changeGarden(previous => placeSourceItem(previous, payload.id, hex));
          setSelection({ type: 'hex', key: hex });
          if (!gardenRef.current.inventory.sourceItems?.[payload.id]) setHeldItem(null);
        } else setNotice('Only Seeds, Spores and Source items can be placed in the garden.');
      } else if (type === 'placed-item' && inventory) {
        changeGarden(previous => pickupSourceItem(previous, payload.key));
      } else if (type === 'placed-item' && hex && hex !== payload.key) {
        changeGarden(previous => moveSourceItem(previous, payload.key, hex));
        if (gardenRef.current.objects[hex]?.itemId === payload.itemId) setSelection({ type: 'hex', key: hex });
      } else if (type === 'organism' && inventory) {
        harvestAt(payload.key);
      } else if (type === 'staged' && inventory) {
        changeStaging(previous => unstagePlanting(previous, payload.key));
        setNotice('Staged Seeds/Spores returned to available inventory without being spent.');
      } else if (type === 'staged' && hex && hex !== payload.key) {
        changeStaging(previous => moveStagedPlanting(previous, payload.key, hex));
      }
    };
    const cancel = () => cleanup();
    dragCleanup.current = cleanup;
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', cancel);
  }

  function rotateSelectedHex(key, targetType, heading) {
    if (targetType === 'preview') {
      setQuantityPrompt(previous => previous?.key === key ? { ...previous, heading } : previous);
      return;
    }
    if (targetType === 'item') changeGarden(previous => rotateSourceItem(previous, key, heading));
    else changeStaging(previous => rotateStagedFungus(previous, key, heading));
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
      clock.reset(); setCameraRevision(value => value + 1); setHarvestReceipt(null);
      clearPlanHistory();
      setSelection({ type: 'hex', key: keyAt(3, 3) });
      setNotice('Example layout restored. Try selecting the Waterborne Source near the channel.');
    }
  }

  function newGarden() {
    if (window.confirm('Start a blank garden? Your current layout will be replaced.')) {
      replaceGarden(ensureInventorySlots(createGarden(garden.columns, garden.rows)));
      clock.reset(); setCameraRevision(value => value + 1); setHarvestReceipt(null);
      clearPlanHistory();
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
      if (Object.keys(upgraded.staged || {}).length) setStagingEnabled(true);
      setShowMainMenu(false);
      clock.reset(); setCameraRevision(value => value + 1); setHarvestReceipt(null);
      clearPlanHistory();
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

  return <div className="app-shell" style={{ '--inventory-width': `${inventoryWidth}px` }}>
    <input ref={fileInput} type="file" accept=".ccsave,.json,application/json" hidden aria-label="Choose a game save file" onChange={importGarden}/>

    <div className="workspace" inert={showMainMenu || undefined}>
      <div className="layout-ornaments" aria-hidden="true">{['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(corner => <img key={corner} className={corner} src={grimoireArt(`corners/${corner}`)} alt=""/>)}</div>
      {showDeveloperTools && <aside className="sidebar sidebar-left developer-workbench">
        <SectionTitle eyebrow="TEST ONLY" title="Developer tools" />
        <button className="stop-placement" onClick={() => setTool('inspect')}>Inspect only</button>
        {showDeveloperTools && <section className="developer-tools-panel" aria-label="Developer tools"><div className="mini-heading">DEVELOPER TOOLS · TEST ONLY</div><p>Bypass Seeds, Spores and normal placement rules to test the simulation.</p><div className="tool-list">{DEVELOPER_TOOLS.map(renderTool)}</div></section>}
        {showDeveloperTools && <div className="developer-item-dispenser">
          <div className="mini-heading">SOURCE ITEM DISPENSER · TEST ONLY</div>
          <label>Grant one full-life item
            <select aria-label="Source item to grant" value={grantItemType} onChange={event => setGrantItemType(event.target.value)}>
              {SOURCE_ITEM_GROUPS.map(group => <optgroup key={group.number} label={`Group ${group.number} · ${group.name}`}>
                {group.items.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
              </optgroup>)}
            </select>
          </label>
          <button onClick={() => {
            if (changeGarden(previous => grantSourceItem(previous, grantItemType))) {
              setNotice(`Added ${SOURCE_ITEMS[grantItemType].name} to inventory (developer test stock).`);
            }
          }}>＋ Add Source item to inventory</button>
        </div>}
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
      </aside>}

      <main className="garden-area">
        <div className="garden-heading"><div><span className="eyebrow">BIOLOGICAL SANDBOX</span><h2>The cultivation plot <span className="leaf-decoration">❧</span></h2><p>Sow Seeds and Spores. Tend your organisms and watch them develop.</p></div>{showDeveloperTools && <div className="garden-actions"><button onClick={loadDemo} title="Restore the example garden">↺ <span>Demo layout</span></button><button onClick={newGarden} title="Start a blank plot">＋ <span>New plot</span></button></div>}</div>





        <div className="garden-surface"><div className="surface-topline"><span><span className="surface-led"/> LIVE SIMULATION</span><span>{garden.columns * garden.rows} HEXES <span className="separator">·</span> 6 NEIGHBORS / HEX</span></div>
          <GardenCamera key={cameraRevision} harvestReceipt={harvestReceipt} controls={<><SimulationControls speed={clock.speed} onChange={clock.setSpeed}/><button className="inventory-toggle" aria-expanded={inventoryOpen} onClick={() => setInventoryOpen(value => !value)}>Inventory · {items.length}/200</button></>}
            tracker={<TaskTracker garden={garden} onOpen={openTaskboard} onToggleCollapsed={() => changeGarden(previous => ({ ...previous,
              tasks: { ...previous.tasks, trackerCollapsed: !previous.tasks.trackerCollapsed } }))}/>}
            world={gridDimensions(garden)} notice={notice} onInterruptDrag={() => dragCleanup.current?.()}><HexGrid garden={garden} plantingPreview={quantityPrompt} simulation={simulation} mycelialSupport={mycelialSupport} tool={tool} selection={selection} onHexClick={onHexClick} onEdgeClick={onEdgeClick}
            onRotateHeading={rotateSelectedHex}
            onRotationStart={kind => { if (kind === 'staged') rotationSnapshot.current = gardenRef.current.staged || {}; }}
            onRotationEnd={kind => { if (kind === 'staged') { const before = rotationSnapshot.current; rotationSnapshot.current = null;
              if (before && JSON.stringify(before) !== JSON.stringify(gardenRef.current.staged || {})) rememberStaging(before); } }}
            onStartHexDrag={(key, type, event) => startPointerDrag(type, { key, itemId: garden.objects[key]?.itemId,
              name: garden.staged?.[key]?.species || (isPlayerSource(garden.objects[key])
                ? SOURCE_ITEMS[garden.objects[key].catalogId].name : garden.objects[key]?.species) }, event)}/></GardenCamera>
          <div className={`garden-plan-rail${stagedCount ? ' has-plan' : ''}`}>{stagedCount > 0 && <div className="staging-bar" aria-label="Planting plan">
            <div><strong>{stagedCount} staged</strong><small>{pendingCount} pending germination</small></div>
            <button className="apply-staging-button" onClick={applyPlan} disabled={!stagedCount}>Apply</button>
            <button onClick={undoPlanAction} disabled={!undoCount}>Undo</button>
            <button onClick={cancelPlan} disabled={!stagedCount && !undoCount}>Cancel</button>
          </div>}<div className="plot-footer"><div className="plot-stat"><strong>{plantCount}</strong><span>Plants</span></div><div className="plot-stat"><strong>{fungusCount}</strong><span>Fungi</span></div><div className="plot-stat"><strong>{sourceCount}</strong><span>Test sources</span></div><div className="plot-stat"><strong>{deployedItemCount}</strong><span>Source items</span></div><div className="plot-stat"><strong>{blockerCount}</strong><span>Blockers</span></div>{showDeveloperTools && <div className="plot-resize"><span>GRID SIZE</span><div><button onClick={() => updateSize('columns', -1)} aria-label="Remove a column">−</button><b>{garden.columns}</b><button onClick={() => updateSize('columns', 1)} aria-label="Add a column">+</button><span className="multiply">×</span><button onClick={() => updateSize('rows', -1)} aria-label="Remove a row">−</button><b>{garden.rows}</b><button onClick={() => updateSize('rows', 1)} aria-label="Add a row">+</button></div></div>}</div></div><div className="surface-bottomline"><span>❧ Plant</span><span>♧ Fungus</span><span><span className="mycelial-legend"/> Mycelial ground</span><span><span className="legend-symbol source-symbol">✦</span> Source</span><span><span className="legend-symbol tile-symbol">▧</span> Hex blocker</span><span><span className="edge-symbol"/> Edge blocker</span><span className="hint-right">{tool === 'edge' ? 'Click a border' : 'Click a hex'}</span></div>
        </div>

      </main>

      <aside className={`garden-inventory ${inventoryOpen ? 'is-open' : ''}`} aria-label="Garden inventory">
        <InventoryResizer width={inventoryWidth} onResize={setInventoryWidth}/>
        <button className="inventory-close" onClick={() => setInventoryOpen(false)}>Close inventory</button>
        <InventoryGrid items={items} activePage={inventoryPage} onPageChange={setInventoryPage} stagingEnabled={stagingEnabled}
          heldId={heldItem?.id} ledger={garden.grimoire} dragging={Boolean(dragGhost) || showGrimoire || showGuide || showTaskboard || showShop || showMainMenu} onItemPointerDown={(item, event) => startPointerDrag('item', item, event)}
          reservedForHeld={heldItem && ['seed', 'spore'].includes(heldItem.type) ? reservedStock(garden, heldItem.type === 'seed' ? 'plant' : 'fungus', heldItem.species) : 0}
          onChooseItem={(item) => setHeldItem(heldItem?.id === item.id ? null : item)}
          onChooseSlot={(slot) => { if (heldItem) changeGarden(previous => moveInventoryStack(previous, heldItem.id, slot)); }}
          onPageHover={(page) => { if (dragRef.current?.type === 'item' && dragRef.current.moving) setInventoryPage(page); }}/>
      </aside>
      <RuneDivider/>
      <div className="inspector-dock">
      <GardenInspector garden={garden} selection={selection} simulation={simulation} cultivation={cultivation} mycelialHere={mycelialHere}
        onOpenEntry={openSpeciesEntry} clockFraction={clock.fraction} simulationSpeed={clock.speed} onEditStaged={() => openQuantityPrompt(selection.key, selectedStaged.kind, selectedStaged.species, null, selectedStaged.quantity)}
        onUnstage={() => changeStaging(previous => unstagePlanting(previous, selection.key))} onRotate={rotateSelectedHex}
        onReturnSource={() => changeGarden(previous => pickupSourceItem(previous, selection.key))}/>
      <nav className="inspector-navigation" aria-label="Garden navigation">
        <button className="main-menu-launcher" onClick={openMainMenu} title="Open main menu" aria-label="Open main menu"><MainMenuIcon/></button>
        <button className="grimoire-launcher" onClick={openGrimoire} title="Open Cultivation Grimoire" aria-label="Open Cultivation Grimoire"><img src={grimoireArt('book-launcher')} alt="" draggable="false"/></button>
        <button className="taskboard-launcher" onClick={() => openTaskboard()} title="Open Taskboard" aria-label="Open Taskboard"><TaskboardIcon/>
          {TASK_IDS.some(id => taskStatus(garden, id) === 'ready') && <span className="task-ready-badge" aria-label="Tasks ready to complete">!</span>}</button>
        <button className="shop-launcher" onClick={openShop} title="Open Shop" aria-label="Open Shop"><ShopIcon/></button>
      </nav></div>
      {showDeveloperTools && <details className="developer-field-notes"><summary>Developer field notes · advanced controls</summary><aside className="sidebar sidebar-right">
        <SectionTitle eyebrow="FIELD NOTES" title="Inspector" right={<span className="inspector-tag">{selection.type === 'hex' ? 'HEX' : 'EDGE'}</span>}/>
        {selection.type === 'hex' && selectedHex ? <>
          <div className="selected-summary"><div className="selected-illustration" style={{ background: PALETTES.Moisture[simulation.conditions[selection.key].Moisture] }}>⬡</div><div><span className="mini-heading">SELECTED HEX</span><h3>Hex {selection.key}</h3><p>Three environmental Properties</p></div></div>
          <div className={`mycelial-inspector ${mycelialHere ? 'is-mycelial' : ''} ${mycelialHere && !supportedMycelialSources ? 'is-retreating' : ''}`}><span className="mini-heading">MYCELIAL GROUND</span><strong>{mycelialHere ? `✥ ${supportedMycelialSources ? 'Supported' : 'Unsupported · retreating'} · ${mycelialSources} ${mycelialSources === 1 ? 'contribution' : 'contributions'}` : 'Not colonized'}</strong><small>{mycelialHere && supportedMycelialSources < mycelialSources ? `${mycelialSources - supportedMycelialSources} contribution(s) losing support. Restore a path before they decay.` : 'Existing ground fades through game time when unsupported; Flooded never relays it.'}</small></div>
          {selectedStaged && <div className="planting-inspector"><strong>◌ Uncommitted planting · {selectedStaged.species}</strong><p>{selectedStaged.quantity} {selectedStaged.kind === 'plant' ? 'Seeds' : 'Spores'} reserved.{selectedStaged.kind === 'fungus' && selectedStaged.species !== 'Mycelord' ? ` Direction: ${STARTING_DIRECTIONS[selectedStaged.heading ?? 0]}.` : ''} Drag this marker to another empty hex, or back to inventory to cancel. It does not grow until Apply.</p>
            {stagedBudget && <><p>Drag the floating compass handle to rotate this Fungus before Apply.</p>
              <div className="heading-buttons">{STARTING_DIRECTIONS.map((direction, heading) => <button key={direction} aria-label={`Face ${direction}`}
                className={selectedStaged.heading === heading ? 'selected' : ''} onClick={() => rotateSelectedHex(selection.key, 'staged', heading)}>{heading + 1}</button>)}</div></>}
            <button onClick={() => openQuantityPrompt(selection.key, selectedStaged.kind, selectedStaged.species, null, selectedStaged.quantity)}>Edit planting quantity</button>
            <button onClick={() => changeStaging(previous => unstagePlanting(previous, selection.key))}>Return to inventory · unstage</button></div>}
          {selectedPending && <div className="planting-inspector"><strong>◈ Awaiting germination · {selectedPending.species}</strong><p>{selectedPending.quantity} {selectedPending.kind === 'plant' ? 'Seeds' : 'Spores'} committed · approximately {formatRealDuration(Math.max(0, selectedPending.readyAt - (garden.clockHours || 0)))} until the result is revealed. Outcome unknown.</p></div>}
          {selectedObject && <div className="object-card"><div className="object-header"><div><span className="mini-heading">HEX OCCUPANT</span><strong>{isPlayerSource(selectedObject) ? `✧ ${SOURCE_ITEMS[selectedObject.catalogId].name}` : selectedObject.type === 'source' ? selectedObject.anchor ? '✥ Anchored Source' : '✦ Influence Source' : selectedObject.type === 'plant' ? `❧ ${selectedObject.species}` : selectedObject.type === 'fungus' ? `♧ ${selectedObject.species}` : '▣ Hex Blocker'}</strong></div>{showDeveloperTools && !isPlayerSource(selectedObject) && <button className="icon-button remove-button" title="Remove object" onClick={() => changeGarden((previous) => removeObject(previous, selection.key))}>×</button>}</div>
            {selectedObject.type === 'source' ? <>
              {isPlayerSource(selectedObject) ? <div className="player-source-inspector">
                <div className="organism-stat"><span>Active time remaining</span><strong>{formatRealDuration(selectedObject.remainingHours)}</strong></div>
                <p>Drag to an empty hex to move, or back to inventory to pause its timer. At zero it disappears permanently.</p>
                {SOURCE_ITEMS[selectedObject.catalogId].propagation === 'spread-budget' && <>
                  <p>Facing {STARTING_DIRECTIONS[selectedObject.heading]} · Drag the floating compass handle to rotate freely.</p>
                  <div className="heading-buttons">{STARTING_DIRECTIONS.map((direction, heading) => <button key={direction} aria-label={`Face ${direction}`}
                    className={selectedObject.heading === heading ? 'selected' : ''} onClick={() => rotateSelectedHex(selection.key, 'item', heading)}>{heading + 1}</button>)}</div>
                </>}
                <button onClick={() => changeGarden(previous => pickupSourceItem(previous, selection.key))}>↧ Return item to inventory</button>
              </div> : showDeveloperTools ? <><div className="source-config"><label>Source type<select aria-label="Source type" value={selectedObject.anchor ? 'anchored' : 'regular'} onChange={(event) => updateSourceType(event.target.value)}><option value="regular">Regular Source</option><option value="anchored">Anchored Source</option></select></label>
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
              ? <><OrganismFields object={selectedObject} conditions={simulation.conditions[selection.key]} contacts={cultivation[selection.key] || []} recipes={showDeveloperTools ? transformationStatus(garden, selection.key, simulation) : []} mycelialHere={mycelialHere} debug={showDeveloperTools}/><button className="harvest-button" onClick={harvestSelected} disabled={selectedObject.species === 'Bamboozled' && selectedObject.progress < 100}>↧ Harvest {selectedObject.species === 'Bamboozled' ? 'Bamboo Steel trophy' : selectedObject.type === 'plant' ? 'Leaves & Seeds' : 'Spores'} · remove organism</button></>
              : showDeveloperTools ? <BlockerFields blocker={selectedObject} onChange={updateSelectedBlocker}/> : <p className="small-explanation">Blocks: {selectedObject.rule === 'full' ? 'all effects' : `${selectedObject.rule} ${selectedObject.value}`}.</p>}
          </div>}
          <div className="inspector-conditions"><div className="mini-heading">PROPERTY CONDITIONS <span>BASELINE → FINAL</span></div>{PROPERTIES.map((property) => <ConditionRow key={property} property={property} baseline={selectedHex.baselines[property]} current={simulation.conditions[selection.key][property]} contributors={simulation.modifiers[selection.key][property]} adjacencyEntry={simulation.adjacency[selection.key]?.find((entry) => entry.property === property)} anchoredAt={selectedObject?.type === 'source' && selectedObject.anchor?.property === property ? selectedObject.anchor.condition : null} editable={showDeveloperTools} onChange={(name, value) => changeGarden((previous) => setBaseline(previous, selection.key, name, value))}/>)}</div>
          <div className={`influence-notes ${showDeveloperTools ? '' : 'grimoire-hidden'}`}><div className="mini-heading">REACHING THIS HEX · DEVELOPER</div>{PROPERTIES.flatMap((property) => simulation.modifiers[selection.key][property].map((entry, index) => <div className="contribution" key={`${property}-${index}`}><span className="contribution-symbol">↝</span><div><strong>{entry.influence}</strong><small>From {entry.source} · {entry.propagation === 'spread-budget' ? 'routed' : entry.mode} · {entry.distance} steps</small></div><b className={entry.modifier > 0 ? 'positive' : 'negative'}>{entry.modifier > 0 ? '+' : ''}{entry.modifier}</b></div>))}{PROPERTIES.every((property) => simulation.modifiers[selection.key][property].length === 0) && <p className="empty-hint">No emitted Source Influences currently reach this hex.</p>}
            {(simulation.adjacency[selection.key]?.length ?? 0) > 0 && <div className="adjacency-contributions"><div className="mini-heading">ENVIRONMENTAL ADJACENCY</div>{simulation.adjacency[selection.key].map((entry) => <div className="contribution adjacency-contribution" key={entry.property}><span className="contribution-symbol">⌁</span><div><strong>{entry.property}: {entry.before} → {entry.after}</strong><small>Neighboring {entry.trigger} at {entry.from.join(', ')} · {entry.kind}/{titleCase(entry.mode)}</small></div><b className={entry.modifier > 0 ? 'positive' : 'negative'}>{entry.modifier > 0 ? '+' : ''}{entry.modifier}</b></div>)}</div>}
          </div>
        </> : selection.type === 'edge' ? <div className="edge-inspector"><div className="edge-inspector-icon">╱</div><h3>Shared hex edge</h3><p>{selection.a} ↔ {selection.b}</p><p className="empty-hint">One edge belongs to both adjacent hexes. Blocking works in both directions.</p>{selectedEdge ? <div className="object-card">{showDeveloperTools ? <><BlockerFields blocker={selectedEdge} onChange={updateSelectedBlocker}/><button className="danger-outline" onClick={() => changeGarden((previous) => removeEdgeBlocker(previous, selection.a, selection.b))}>Remove edge blocker</button></> : <p className="small-explanation">Blocks: {selectedEdge.rule === 'full' ? 'all effects' : `${selectedEdge.rule} ${selectedEdge.value}`}.</p>}</div> : showDeveloperTools && <button className="add-influence" onClick={() => changeGarden((previous) => placeEdgeBlocker(previous, selection.a, selection.b, makeBlocker()))}>＋ Place edge blocker</button>}</div> : null}
        {showDeveloperTools && <div className="data-actions"><button onClick={exportGarden}>↓ Export JSON</button><button onClick={() => fileInput.current?.click()}>↑ Import JSON</button></div>}
      </aside></details>}
    </div>

    {quantityPrompt && <div className="quantity-popover" role="dialog" aria-label="Choose planting quantity"
      style={{ left: quantityPrompt.x, top: quantityPrompt.y }}>
      <div className="mini-heading">{stagingEnabled ? 'STAGE' : 'PLANT'} {quantityPrompt.species.toUpperCase()} {quantityPrompt.kind === 'plant' ? 'SEEDS' : 'SPORES'}</div>
      <div className="quantity-stepper"><IllustratedButton art="minus" label="Decrease quantity" disabled={quantityPrompt.quantity <= 1} onClick={() => setQuantityPrompt(previous => ({ ...previous, quantity: Math.max(1, previous.quantity - 1) }))}/>
        <input type="number" aria-label="Planting quantity" min="1" max={quantityPrompt.max} value={quantityPrompt.quantity}
          onChange={(event) => setQuantityPrompt(previous => ({ ...previous, quantity: Math.max(1, Math.min(previous.max, Math.floor(Number(event.target.value) || 1))) }))}/>
        <IllustratedButton art="plus" label="Increase quantity" disabled={quantityPrompt.quantity >= quantityPrompt.max} onClick={() => setQuantityPrompt(previous => ({ ...previous, quantity: Math.min(previous.max, previous.quantity + 1) }))}/></div>
      <div className="quantity-presets">{[3, 5, 9, 15].map(n => <button key={n} disabled={n > quantityPrompt.max}
        className={n === quantityPrompt.quantity ? 'selected' : ''} onClick={() => setQuantityPrompt(previous => ({ ...previous, quantity: n }))}>{n}</button>)}</div>
      {quantityPrompt.kind === 'fungus' && quantityPrompt.species !== 'Mycelord' &&
        <label className="spore-direction-picker">Spore direction
          <select aria-label="Spore direction" value={quantityPrompt.heading}
            onChange={event => setQuantityPrompt(previous => ({ ...previous, heading: Number(event.target.value) }))}>
            {STARTING_DIRECTIONS.map((direction, index) => <option key={direction} value={index}>{direction}</option>)}
          </select>
        </label>}
      {quantityPrompt.kind === 'fungus' && (FUNGI[quantityPrompt.species]?.environment?.propagation === 'spread-budget' || FUNGI[quantityPrompt.species]?.cultivation?.propagation === 'spread-budget') && <p className="rotation-prompt-hint">Drag the gold handle around this hex to choose its direction.</p>}
      <p>{quantityPrompt.max} available · {stagingEnabled ? 'nothing spent until Apply.' : 'planting starts when you confirm.'}</p>
      <div className="quantity-actions"><button onClick={() => setQuantityPrompt(null)}>Cancel</button>
        <button className="confirm" onClick={confirmQuantity}>{stagingEnabled ? 'Stage' : 'Plant'} on hex {quantityPrompt.key}</button></div>
    </div>}
    {dragGhost && <div className="garden-drag-ghost" style={{ left: dragGhost.x, top: dragGhost.y }}>✤ {dragGhost.title}</div>}

    {showMainMenu && <MainMenu onClose={() => setShowMainMenu(false)} onNewGarden={requestTutorial} onLoad={() => fileInput.current?.click()} onSave={saveGameFile}
      onDeveloperToggle={toggleDeveloperTools} developerTools={showDeveloperTools} stagingEnabled={stagingEnabled} stagedCount={stagedCount}
      onStagingChange={setStagingEnabled} onGuide={() => { setShowMainMenu(false); setShowGuide(true); }} autosaveStatus={autosaveStatus}
      elapsed={formatRealDuration(garden.clockHours || 0)} onAdvance={advanceTime}/>}
    {showShop && <Shop garden={garden} onClose={() => setShowShop(false)} onTrade={tradeInShop}/>}
    {showTaskboard && <Taskboard garden={garden} initialTaskId={taskEntry}
      onClose={() => setShowTaskboard(false)} onClaim={completeTask} onPin={id => changeGarden(previous => toggleTaskPin(previous, id))}
      onRequestTutorial={requestTutorial} onInspectCarrot={inspectCarrot}/>}
    {showTutorialReset && <TutorialResetDialog onCancel={() => setShowTutorialReset(false)} onConfirm={startTutorial}/>}
    {showGrimoire && <CultivationGrimoire garden={garden} developerTools={showDeveloperTools} initialEntryKey={bookEntry}
      onClose={() => setShowGrimoire(false)}/>}
    {showGuide && <div className="modal-backdrop" onMouseDown={() => setShowGuide(false)}><div className="guide-modal" role="dialog" aria-modal="true" aria-label="How the garden works" onMouseDown={(event) => event.stopPropagation()}>
      <button className="modal-close" onClick={() => setShowGuide(false)}>×</button>
      <span className="eyebrow">FIELD GUIDE · PROTOTYPE 16</span><h2>A garden of changing forms</h2>
      <p>Transformations across Ingredients, Flowers, Aquatic, Woodlands, Desert and Spices are active. Every Plant yields its own species-specific Leaves on harvest, rather than a shared Leaf currency. Fungi must actually reach a Plant through their environmental or cultivation footprints. Transformations create fresh 0% Plants; the physical light, water and temperature environment still matters after conversion.</p>
      <p>Each hex shows its Conditions together: the soil fill shows Moisture, the border shows Temperature, and the icon shows Illumination. Freezing has a white border; Cold has a blue one. Select a hex to read its exact Conditions in the Inspector.</p>
      <p>Arrange the four 50-square inventory bags, drag Seeds or Spores to empty hexes, choose an amount, and press <strong>Apply</strong>. Turn staging off in the main menu to plant as soon as you confirm the amount. Directional Fungi can be rotated while the amount selector is open. Attempts are consumed on confirmation or Apply, and their results stay hidden for about <strong>{formatRealDuration(STAGING_TUNING.germinationRevealHours)}</strong>. You can stage more immediately, and existing organisms keep progressing while you plan. Drag living organisms back to inventory to harvest. Select a portrait to open its species in the Grimoire. Undo reverses the last staging edit; Cancel releases the whole uncommitted plan. Use <strong>Display developer tools</strong> in the main menu for unrestricted testing. Use Pause, 0.5×, 1× and 2× beside the garden zoom controls to control the whole garden. One game hour takes five real seconds at 1×; Grimoire durations use that baseline. Drag empty ground or use the middle mouse button to pan; scroll to zoom.</p>
      <p>Your garden autosaves in this browser. Use <strong>Save Game</strong> to download a portable .ccsave backup, and <strong>Load Game</strong> to restore it here or on another device. Loading replaces your current browser save after confirmation; staged placements and hidden germination timers are included. Browser-closed progression is not implemented yet.</p>
      <div className="guide-grid">
        <div><b>01 · Start any family</b><p>Six base Plants have available Seeds: Beanstalk, Daisydaze, Algea, Moss, Jadeheart and Thymekeeper. Experiment to discover other Plants.</p></div>
        <div><b>02 · Observe your garden</b><p>Moisture, Temperature and Illumination change around Sources, Fungi and Blockers. Test conditions and watch your Plants grow.</p></div>
        <div><b>03 · Cultivation Grimoire</b><p>Open the Grimoire beside the Inspector. All Fungi and the six base Plants are identified from the start. Observed conditions and interactions fill the pages permanently in this garden.</p></div>
        <div><b>04 · Discover transformations</b><p>Different environments and Fungi can change a Plant into a new species. Successfully witnessed recipes are recorded, but untried alternatives stay hidden.</p></div>
        <div><b>05 · Test and iterate</b><p>Developer tools reveal the complete species registry, recipe clocks and debug sources. In the Grimoire, choose Preview full Grimoire to browse all entries and recipes without unlocking them in your save. Hide developer tools to return to the normal discovery experience.</p></div>
      </div><button className="primary-button" onClick={() => setShowGuide(false)}>Return to the garden →</button>
    </div></div>}
  </div>;
}

function OrganismFields({ object, conditions, contacts, recipes, mycelialHere, debug = false }) {
  const plant = object.type === 'plant';
  const definition = plant ? PLANTS[object.species] : FUNGI[object.species];
  const rates = plant ? plantGrowthRates(object, conditions, contacts, mycelialHere) : null;
  return <div className="organism-details">
    <div className="organism-stat"><span>{stageOf(object)}</span><strong>{object.progress.toFixed(1)}%</strong></div>
    <div className="organism-progress"><div style={{ width: `${object.progress / 2}%` }}/></div>
    <p>{formatRealDuration(object.ageHours || 0)} of garden time · {plant ? 'Growth → Ripening' : 'Growth → Sporulation'}</p>
    {plant ? <>
      <div className="organism-stat"><span>Current stage rate</span><strong>{((object.progress < 100 ? rates.growth : rates.ripening) * 100).toFixed(0)}%</strong></div>
      {debug && <><p>Natural timing at the live pace: {formatRealDuration(definition.growthDays * 24)} to Growth completion; {formatRealDuration(definition.totalDays * 24)} to 200% in optimal Conditions.</p>
      {object.species === 'Starlotus' && <p>Origin attunement: <strong>{object.attunement || 'unattuned test spawn'}</strong>. Native +60% Leaves {object.attunement && conditions.Moisture === object.attunement ? 'active' : 'inactive'} at current Moisture.</p>}
      {object.species === 'Silvercress' && <p>Native trait: +60% Growth while Flooded in Growth; +50% ordinary Leaves while Damp in Ripening.</p>}
      {object.species === 'Mandrakadabra' && <p>Bright vulnerability: <strong>{formatRealDuration(object.exposure?.Bright || 0)} / {formatRealDuration(4)}</strong> of continuous resolved Bright is lethal. Lit is safest for Leaf farming.</p>}
      {object.species === 'Bramblewraith' && <p>Resilient specialist: Hot, Freezing and Mycelial reduce development/output but never directly kill it.</p>}
      {object.species === 'Bamboozled' && <p>{object.progress >= 100 ? '◆ Bamboo Steel trophy ready. Harvest for one trophy and zero Leaves/Seeds.' : 'Bamboo Steel trophy unlocks at 100% Growth. Ordinary Leaves and Seeds always stay zero.'}</p>}
      {object.species === 'Aloechemist' && <p>Heat endurance: <strong>{formatRealDuration(object.exposure?.Hot || 0)} of continuous Hot</strong>. A qualifying Hot → Warm event with Rilllace contact gives Cactastrophe before {formatRealDuration(36)}, or Aloemancer at {formatRealDuration(36)} or later. It does not happen from cooling alone.</p>}
      {object.species === 'Moonjade' && <p>{conditions.Temperature === 'Freezing' ? 'Dormant: 0 progression and no new output.' : 'Active: progression resumes outside Freezing.'} Freezing endurance: <strong>{formatRealDuration(object.exposure?.Freezing || 0)} / {formatRealDuration(48)}</strong>. A qualified Freezing → Cold thaw can yield Jadewisp or Pearadox.</p>}
      {object.species === 'Pearadox' && <p>Hot: +70% natural Leaves. Freezing: 75% lifecycle rate and +80% natural Seeds; neither extreme is lethal by itself.</p>}
      {object.species === 'Cactacomb' && <p>Sterile Leaf specialist: 48 natural Leaves near 140% in Hot; Warm reduces its natural Leaf yield to 65% of the Hot peak.</p>}
      {(object.species === 'Oreganoir' || object.species === 'Cinnamancer' || object.species === 'Phantarragon') && <p>Bright-field crop: resolved Bright gives its best natural Leaf yield. {object.species === 'Phantarragon' ? 'Its Seeds grow Cinnamancer, not Phantarragon.' : object.species === 'Cinnamancer' ? 'Its Seeds grow Oreganoir; Phantarragon can produce Cinnamancer Seeds.' : 'Mighty Mint can also supply its Oreganoir Seeds from Dim fields.'}</p>}
      {(object.species === 'Clovely' || object.species === 'Mighty Mint') && <p>Dim-field Seed specialist. {object.species === 'Mighty Mint' ? 'Its harvest makes 28 Oreganoir Seeds at full optimal maturity, not Mighty Mint Seeds.' : 'Its own 20 Clovely Seeds sustain planting in Dim fields.'}</p>}
      {object.species === 'Saffrune' && <p>Dark-field Leaf specialist producing Clovely Seeds. For Phantarragon, prepare Dark / Damp / Temperate-or-Cold with Hushroom contact for {formatRealDuration(12)}; then leave Dark and reach Lit within {formatRealDuration(8)} with Prismorel contact.</p>}
      {object.species === 'Wyrmsalt' && <p>Dim and Lit are equally productive. Its Papriking route needs final Damp / Warm / Lit and actual Rushroom plus Hushroom contact; either Fungus may reach through cultivation or environment.</p>}
      {object.species === "Papriking" && <p>Sterile Lit specialist: up to 46 natural Leaves around 145%; Bright halves native output. The required named contacts do not need to cause the resolved Lit state.</p>}
      <div className="mini-heading">HAZARD EXPOSURE</div>
      <div className="exposure-list">{['Dry', 'Hot', 'Freezing', 'Mycelial'].map(hazard => <span key={hazard}>{hazard}: {formatRealDuration(object.exposure?.[hazard] || 0)} / {Number.isFinite(definition[`${hazard.toLowerCase()}Death`]) ? formatRealDuration(definition[`${hazard.toLowerCase()}Death`]) : 'nonlethal'}</span>)}</div>
      {recipes.length > 0 && <><div className="mini-heading">TRANSFORMATION EXPOSURE</div>
        <div className="exposure-list">{recipes.map(recipe => <span key={recipe.into} title={recipe.sequence
          ? recipe.sequence === 'heat-to-warm' ? `Hot → Warm with Rilllace contact on the new environment, ${recipe.early ? `before ${formatRealDuration(36)}` : `at least ${formatRealDuration(36)}`} of continuous prior Hot exposure`
            : recipe.sequence === 'freeze-to-cold' ? `After ${formatRealDuration(48)} uninterrupted Freezing Dormancy, thaw to Cold with ${Object.entries(recipe.completion.conditions).map(([property, value]) => `${property}: ${value}`).join(' · ')} and named fungi: ${recipe.completion.contacts.map(group => group.join(' OR ')).join(' AND ')}`
            : recipe.sequence === 'mistruffle-departure' ? `Damp / Dim, Mistruffle AND Dewmender for ${formatRealDuration(12)} to under ${formatRealDuration(20)}, then remove Mistruffle contact while retaining Damp / Dim and Dewmender`
            : recipe.sequence === 'flood-to-damp' ? `${formatRealDuration(24)} Flooded / Cold / Dim with Rainmorel, then Flooded → Damp drainage; pre-drain contact counts`
            : recipe.sequence === 'dark-to-lit' ? `${formatRealDuration(12)} Damp / Temperate-or-Cold / Dark with Hushroom; leave Dark, then reach Lit with Prismorel within ${formatRealDuration(8)} while keeping Damp and valid Temperature`
            : `${formatRealDuration(10)} Damp / Temperate / Dim with Mistruffle; leave Dim, then reach Bright with Prismorel within ${formatRealDuration(8)}`
          : `${Object.entries(recipe.conditions).map(([property, value]) => `${property}: ${Array.isArray(value) ? value.join(' or ') : value}`).join(' · ')}${recipe.environmentalOnly ? ' · no fungus required; timer resets if Flooded returns' : ` · named fungi: ${recipe.contacts.map(group => group.join(' OR ')).join(' AND ')}`} }`}>
          {recipe.eligible ? '◆' : '○'} {recipe.into}: {recipe.phase === 'armed' ? `Armed ${formatRealDuration(recipe.elapsed)} · remove Mistruffle before ${formatRealDuration(20)}` : recipe.phase === 'early-recovery' ? `${formatRealDuration(recipe.elapsed)} Hot · recover before ${formatRealDuration(36)}` : recipe.phase === 'ready' ? recipe.sequence === 'flood-to-damp' ? 'Prepared · drain to Damp' : recipe.sequence === 'freeze-to-cold' ? 'Prepared · thaw to Cold' : recipe.sequence === 'heat-to-warm' ? 'Qualified · recover to Warm' : 'Prepared' : `${formatRealDuration(recipe.elapsed)} / ${formatRealDuration(recipe.hours)}`}{recipe.phase === 'crossing' ? recipe.sequence === 'dark-to-lit' ? ' · Lit window' : ' · Bright window' : ''}
        </span>)}</div>
        <p>◆ The current recipe phase qualifies. Any interruption resets its clock; hover for exact fungal and environmental requirements.</p></>}
      <div className="mini-heading">REACHING FUNGAL EFFECTS</div>
      {contacts.length ? contacts.map((contact, index) => <p key={`${contact.source}-${index}`}>{contact.species}: {contact.kind} {contact.amount > 0 ? '+' : ''}{contact.amount} {contact.implemented ? '· active' : '· effect pending'}</p>) : <p>No fungal cultivation Effects reach this Plant.</p>}</>}
      {!debug && <p className="small-explanation">Experiment with Conditions and Fungi to uncover this Plant's growing preferences and transformation recipes in the Cultivation Grimoire.</p>}
      <div className="organism-stat"><span>Harvestable {object.species} Leaves</span><strong>{availableHarvest(object, contacts, conditions).leaves}</strong></div>
      <div className="organism-stat"><span>Harvestable Seeds</span><strong>{availableHarvest(object, contacts, conditions).seeds}</strong></div>
      {debug && definition.seedDistribution && <p>Seed identities: {Object.entries(availableHarvest(object, contacts, conditions).seedStacks).map(([name, amount]) => `${amount} ${name} Seeds`).join(' + ')}. Both stacks arrive in one consuming harvest.</p>}
      {object.species === 'Bamboozled' && <div className="organism-stat"><span>Bamboo Steel trophy</span><strong>{availableHarvest(object, contacts, conditions).bambooSteel ? 'Ready' : 'At 100%'}</strong></div>}
      <p>Accrued Leaves: {(object.production?.ordinaryLeaves || 0).toFixed(2)} ordinary + {(object.production?.hourlyLeaves || 0).toFixed(2)} from per-5s effects. Accrued Seeds: {(object.production?.ordinarySeeds || 0).toFixed(2)} ordinary + {(object.production?.hourlySeeds || 0).toFixed(2)} from per-5s effects.</p>
      <p className="prototype-warning">All six Plant families are active. Intermediate curve interpolation, some rounding and fungal Spore balance remain provisional.</p>
    </> : <>
      {debug && <><p>Habitat: {definition.habitat}. Environmental and cultivation emissions are live.</p>
      {object.species === 'Mycelord' && <><div className="organism-stat"><span>Source of Mycelial ground</span><strong>{object.colonyId || 'New colony'}</strong></div><div className="organism-stat"><span>Flooded exposure</span><strong>{formatRealDuration(object.exposure?.Flooded || 0)} / {formatRealDuration(MYCELIAL_TUNING.mycelordFloodDeathHours)}</strong></div></>}
      {definition.habitat === 'dependent' && <div className="organism-stat"><span>Time without Mycelial</span><strong>{formatRealDuration(object.exposure?.MissingMycelial || 0)} / {formatRealDuration(MYCELIAL_TUNING.dependentHabitatGraceHours)}</strong></div>}
      {object.species === 'Frostfolio' && <p>Frostfolio is Mycelial-dependent. Its complete Germination / Leaf Timing / Seed Yield package is emitted while alive.</p>}</>}
      <div className="organism-stat"><span>Harvestable own-Spores</span><strong>{Math.floor((object.sporeStock || 0) + 1e-9)}</strong></div>
      {(definition.environment?.propagation === 'spread-budget' || definition.cultivation?.propagation === 'spread-budget') &&
        <p>Chosen direction: {STARTING_DIRECTIONS[object.heading || 0]} (fixed after Apply).</p>}
      {debug && definition.cultivation && <p>Cultivation package: {definition.cultivation.effects.map(effect => `${effect.kind} ${effect.amount > 0 ? '+' : ''}${effect.amount}${effect.boosted != null ? ` (Mycelial ${effect.boosted > 0 ? '+' : ''}${effect.boosted})` : ''}`).join('; ')} · {definition.cultivation.mode} {definition.cultivation.propagation === 'spread-budget' ? `Budget ${definition.cultivation.budget}` : `Range ${definition.cultivation.range}`}</p>}
      {definition.habitat === 'dependent' && !mycelialHere && <p className="prototype-warning">Habitat absent: this Fungus continues emitting during its grace period, then dies.</p>}
      {debug && definition.habitat === 'preferring' && <p className="prototype-warning">Mycelial preference strengthens only its listed named cultivation bonus when this Fungus occupies Mycelial ground.</p>}
      {debug && <p className="prototype-warning">Fungal stage durations ({formatRealDuration(PROTOTYPE_TUNING.fungusGrowthHours)} Growth + {formatRealDuration(PROTOTYPE_TUNING.fungusSporulationHours)} Sporulation), Spore yields ({PROTOTYPE_TUNING.fungusSporeYieldAt200} at 200%) and germination ({PROTOTYPE_TUNING.fungusGerminationChance * 100}% per Spore) remain provisional balance values; the selected simulation speed applies to all elapsed-time systems.</p>}
      {!debug && <p className="small-explanation">Its known interactions are recorded in the Cultivation Grimoire after you observe them affecting Plants.</p>}
    </>}
  </div>;
}

function BlockerFields({ blocker, onChange }) {
  return <div className="blocker-fields"><label>Blocking rule<select value={blocker.rule} onChange={(event) => onChange('rule', event.target.value)}><option value="full">Full — all effects</option><option value="kind">Selective — by Kind</option><option value="mode">Selective — by Mode</option></select></label>{blocker.rule === 'kind' && <label>Blocked Kind<select value={blocker.value} onChange={(event) => onChange('value', event.target.value)}>{KINDS.map((kind) => <option key={kind}>{kind}</option>)}</select></label>}{blocker.rule === 'mode' && <label>Blocked Mode<select value={blocker.value} onChange={(event) => onChange('value', event.target.value)}>{MODES.map((mode) => <option key={mode} value={mode}>{titleCase(mode)}</option>)}</select></label>}<p className="small-explanation">Blocks matching propagated Influences and one-hex Adjacency in both directions. Adjacency tags: Aqueous/Waterborne (Moisture), Thermal/Airborne (Temperature), Luminous/Airborne (Illumination). Routed Influences can still take alternate paths.</p></div>;
}
