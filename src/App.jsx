import React, { useEffect, useMemo, useRef, useState } from 'react';
import HexGrid, { PALETTES } from './HexGrid.jsx';
import {
  CONDITIONS, MATERIALS, PROPERTIES, INFLUENCE_TYPES, KINDS, MODES,
  calculateEnvironment, createGarden, createDemoGarden, isGarden, edgeKey, keyAt,
  resizeGarden, setMaterial, setBaseline, placeObject, removeObject, updateObject,
  placeEdgeBlocker, removeEdgeBlocker, makeInfluence, makeSource, makeBlocker,
} from './core/index.js';

const STORAGE_KEY = 'companion-cultivation:sandbox:v1';
const TOOLS = [
  { id: 'inspect', icon: '⌕', title: 'Inspect', hint: 'Select a hex or existing edge' },
  { id: 'material', icon: '◈', title: 'Material', hint: 'Paint permanent ground material' },
  { id: 'source', icon: '✦', title: 'Source', hint: 'Place a configurable Influence Source' },
  { id: 'hex', icon: '▣', title: 'Hex blocker', hint: 'Block an entire hex' },
  { id: 'edge', icon: '╱', title: 'Edge blocker', hint: 'Click a shared hex edge' },
  { id: 'erase', icon: '⌫', title: 'Remove', hint: 'Remove objects and edge blockers' },
];

const titleCase = (text) => text.charAt(0).toUpperCase() + text.slice(1);
function initialGarden() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (isGarden(saved) && saved.columns >= 3 && saved.columns <= 20 && saved.rows >= 3 && saved.rows <= 20) return saved;
  } catch { /* fall through to demo */ }
  return createDemoGarden();
}

function SectionTitle({ eyebrow, title, right }) {
  return <div className="section-title"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{right}</div>;
}

function ConditionRow({ property, baseline, current, contributors, onChange }) {
  const steps = CONDITIONS[property];
  const currentIndex = steps.indexOf(current);
  const baselineIndex = steps.indexOf(baseline);
  const total = contributors.reduce((sum, item) => sum + item.modifier, 0);
  return <div className="condition-row">
    <div className="condition-heading"><span>{property}</span><strong>{current}</strong></div>
    <div className="condition-steps">{steps.map((name, index) => <div key={name} className={`condition-step ${index <= currentIndex ? 'is-filled' : ''} ${index === baselineIndex ? 'is-baseline' : ''}`} title={name} />)}</div>
    <div className="condition-meta"><label>Baseline <select aria-label={`${property} baseline`} value={baseline} onChange={(event) => onChange(property, event.target.value)}>{steps.map((value) => <option key={value}>{value}</option>)}</select></label>
      <span className={`delta ${total > 0 ? 'positive' : total < 0 ? 'negative' : ''}`}>{total === 0 ? '±0' : total > 0 ? `+${total}` : total} modifier</span>
    </div>
  </div>;
}

export default function App() {
  const [garden, setGarden] = useState(initialGarden);
  const [overlay, setOverlay] = useState('Moisture');
  const [tool, setTool] = useState('inspect');
  const [materialBrush, setMaterialBrush] = useState('Dirt');
  const [selection, setSelection] = useState({ type: 'hex', key: keyAt(3, 3) });
  const [notice, setNotice] = useState('Select any hex to inspect what is affecting it.');
  const [showGuide, setShowGuide] = useState(false);
  const fileInput = useRef(null);
  const simulation = useMemo(() => calculateEnvironment(garden), [garden]);
  const selectedHex = selection.type === 'hex' ? garden.hexes[selection.key] : null;
  const selectedObject = selection.type === 'hex' ? garden.objects[selection.key] : null;
  const selectedEdge = selection.type === 'edge' ? garden.edges[selection.id] : null;
  const sourceCount = Object.values(garden.objects).filter((object) => object.type === 'source').length;
  const blockerCount = Object.values(garden.objects).filter((object) => object.type === 'blocker').length + Object.keys(garden.edges).length;

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(garden)); } catch { /* the sandbox stays usable without storage */ }
  }, [garden]);

  function changeGarden(fn) {
    try { setGarden(fn(garden)); }
    catch (error) { setNotice(error.message); }
  }

  function onHexClick(key) {
    setSelection({ type: 'hex', key });
    if (tool === 'material') changeGarden((previous) => setMaterial(previous, key, materialBrush));
    if (tool === 'source') changeGarden((previous) => placeObject(previous, key, makeSource()));
    if (tool === 'hex') changeGarden((previous) => placeObject(previous, key, makeBlocker()));
    if (tool === 'erase') changeGarden((previous) => removeObject(previous, key));
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
      const mode = matched.property === 'Moisture' && next.mode === 'waterborne' ? 'airborne' : next.mode;
      return makeInfluence(next.name, Math.abs(next.modifier), next.range, mode);
    });
    changeGarden((previous) => updateObject(previous, selection.key, { ...selectedObject, emissions }));
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
      calculateEnvironment(imported);
      setGarden(imported);
      setSelection({ type: 'hex', key: Object.keys(imported.hexes)[0] });
      setNotice(`Loaded ${file.name}`);
    } catch (error) { setNotice(`Import failed: ${error.message}`); }
    event.target.value = '';
  }

  return <div className="app-shell">
    <header className="topbar">
      <div className="brand"><div className="brand-mark">✤</div><div><span className="brand-kicker">THE GARDEN LABORATORY</span><h1>Companion <em>Cultivation</em></h1></div></div>
      <div className="top-actions"><span className="version-pill"><span className="live-dot"/> PROTOTYPE 01</span><button className="subtle-button" onClick={() => setShowGuide(true)}>How it works <span>↗</span></button></div>
    </header>

    <div className="workspace">
      <aside className="sidebar sidebar-left">
        <SectionTitle eyebrow="YOUR WORKBENCH" title="Garden tools" />
        <div className="tool-list">{TOOLS.map((item) => <button key={item.id} className={`tool-button ${tool === item.id ? 'active' : ''}`} title={item.hint} onClick={() => { setTool(item.id); setNotice(item.hint); }}><span className="tool-icon">{item.icon}</span><span>{item.title}</span><span className="tool-chevron">›</span></button>)}</div>

        {tool === 'material' && <div className="brush-panel"><div className="mini-heading">MATERIAL BRUSH</div><div className="material-options">{MATERIALS.map((value) => <button key={value} onClick={() => setMaterialBrush(value)} className={`material-choice ${materialBrush === value ? 'chosen' : ''}`}><i style={{ background: PALETTES.Material[value] }}/>{value}</button>)}</div></div>}

        <div className="section-divider"/>
        <SectionTitle eyebrow="ENVIRONMENT" title="View by property" />
        <div className="overlay-list">{['Moisture', 'Fertility', 'Temperature', 'Illumination', 'Material'].map((name) => <button key={name} className={`overlay-choice ${overlay === name ? 'chosen' : ''}`} onClick={() => setOverlay(name)}><span className="overlay-dot" style={{ background: Object.values(PALETTES[name])[Math.floor(Object.values(PALETTES[name]).length / 2)] }}/>{name}<span>{overlay === name ? '●' : '○'}</span></button>)}</div>

        <div className="legend-card"><div className="mini-heading">{overlay.toUpperCase()} SCALE</div><div className="legend-swatches">{Object.entries(PALETTES[overlay]).map(([name, color]) => <div key={name} title={name} className="legend-item"><i style={{ background: color }}/><span>{name}</span></div>)}</div></div>
      </aside>

      <main className="garden-area">
        <div className="garden-heading"><div><span className="eyebrow">ENVIRONMENTAL SANDBOX</span><h2>The cultivation plot <span className="leaf-decoration">❧</span></h2><p>Shape the terrain. Redirect the influences. Observe what changes.</p></div><div className="garden-actions"><button onClick={loadDemo} title="Restore the example garden">↺ <span>Demo layout</span></button><button onClick={newGarden} title="Start a blank plot">＋ <span>New plot</span></button></div></div>

        <div className="garden-surface"><div className="surface-topline"><span><span className="surface-led"/> LIVE SIMULATION</span><span>{garden.columns * garden.rows} HEXES <span className="separator">·</span> 6 NEIGHBORS / HEX</span></div>
          <div className="svg-scroll"><div className="svg-wrap"><HexGrid garden={garden} simulation={simulation} overlay={overlay} tool={tool} selection={selection} onHexClick={onHexClick} onEdgeClick={onEdgeClick}/></div></div>
          <div className="surface-bottomline"><span><span className="legend-symbol source-symbol">✦</span> Source</span><span><span className="legend-symbol tile-symbol">▧</span> Hex blocker</span><span><span className="edge-symbol"/> Edge blocker</span><span className="hint-right">{tool === 'edge' ? 'Click any shared border to place an edge blocker' : 'Click a hex to interact'}</span></div>
        </div>
        <div className="plot-footer"><div className="plot-stat"><strong>{garden.columns * garden.rows}</strong><span>Garden hexes</span></div><div className="plot-stat"><strong>{sourceCount}</strong><span>Active sources</span></div><div className="plot-stat"><strong>{blockerCount}</strong><span>Blockers placed</span></div><div className="plot-resize"><span>GRID SIZE</span><div><button onClick={() => updateSize('columns', -1)} aria-label="Remove a column">−</button><b>{garden.columns}</b><button onClick={() => updateSize('columns', 1)} aria-label="Add a column">+</button><span className="multiply">×</span><button onClick={() => updateSize('rows', -1)} aria-label="Remove a row">−</button><b>{garden.rows}</b><button onClick={() => updateSize('rows', 1)} aria-label="Add a row">+</button></div></div></div>
        <div className="notice-bar"><span>✧</span> {notice}</div>
      </main>

      <aside className="sidebar sidebar-right">
        <SectionTitle eyebrow="FIELD NOTES" title="Inspector" right={<span className="inspector-tag">{selection.type === 'hex' ? 'HEX' : 'EDGE'}</span>}/>
        {selection.type === 'hex' && selectedHex ? <>
          <div className="selected-summary"><div className="selected-illustration" style={{ background: PALETTES.Material[selectedHex.material] }}>⬡</div><div><span className="mini-heading">SELECTED HEX</span><h3>{selectedHex.material} ground</h3><p>Coordinate {selection.key}</p></div></div>
          {selectedObject && <div className="object-card"><div className="object-header"><div><span className="mini-heading">HEX OCCUPANT</span><strong>{selectedObject.type === 'source' ? '✦ Influence Source' : '▣ Hex Blocker'}</strong></div><button className="icon-button remove-button" title="Remove object" onClick={() => changeGarden((previous) => removeObject(previous, selection.key))}>×</button></div>
            {selectedObject.type === 'source' ? <>
              {selectedObject.emissions.map((emission, index) => <div key={index} className="emission-editor"><div className="emission-title"><span>INFLUENCE {index + 1}</span><button aria-label="Remove influence" onClick={() => changeGarden((previous) => updateObject(previous, selection.key, { ...selectedObject, emissions: selectedObject.emissions.filter((_, i) => i !== index) }))}>×</button></div>
                <label>Influence<select value={emission.name} onChange={(event) => updateEmission(index, 'name', event.target.value)}>{INFLUENCE_TYPES.map((type) => <option key={type.name}>{type.name}</option>)}</select></label>
                <div className="field-pair"><label>Strength<select value={Math.abs(emission.modifier)} onChange={(event) => updateEmission(index, 'modifier', Number(event.target.value))}>{[1, 2, 3].map((n) => <option key={n} value={n}>{emission.modifier < 0 ? '−' : '+'}{n}</option>)}</select></label><label>Mode<select value={emission.mode} onChange={(event) => updateEmission(index, 'mode', event.target.value)}>{MODES.map((mode) => <option key={mode} value={mode} disabled={emission.property === 'Moisture' && mode === 'waterborne'}>{titleCase(mode)}</option>)}</select></label></div>
                <label>Range <span className="field-value">{emission.range} crossings</span><input type="range" min="0" max="8" value={emission.range} onChange={(event) => updateEmission(index, 'range', Number(event.target.value))}/></label>
                <div className="emission-foot">{emission.kind} <span>→</span> {emission.property} {emission.modifier > 0 ? '+' : ''}{emission.modifier}</div>
              </div>)}
              <button className="add-influence" onClick={() => changeGarden((previous) => updateObject(previous, selection.key, { ...selectedObject, emissions: [...selectedObject.emissions, makeInfluence('Brightening')] }))}>＋ Add another Influence</button>
            </> : <BlockerFields blocker={selectedObject} onChange={updateSelectedBlocker}/>}
          </div>}
          <div className="inspector-conditions"><div className="mini-heading">PROPERTY CONDITIONS <span>BASELINE + MODIFIERS</span></div>{PROPERTIES.map((property) => <ConditionRow key={property} property={property} baseline={selectedHex.baselines[property]} current={simulation.conditions[selection.key][property]} contributors={simulation.modifiers[selection.key][property]} onChange={(name, value) => changeGarden((previous) => setBaseline(previous, selection.key, name, value))}/>)}</div>
          <div className="influence-notes"><div className="mini-heading">REACHING THIS HEX</div>{PROPERTIES.flatMap((property) => simulation.modifiers[selection.key][property].map((entry, index) => <div className="contribution" key={`${property}-${index}`}><span className="contribution-symbol">↝</span><div><strong>{entry.influence}</strong><small>From {entry.source} · {entry.mode} · {entry.distance} steps</small></div><b className={entry.modifier > 0 ? 'positive' : 'negative'}>{entry.modifier > 0 ? '+' : ''}{entry.modifier}</b></div>))}{PROPERTIES.every((property) => simulation.modifiers[selection.key][property].length === 0) && <p className="empty-hint">No Sources currently reach this hex. Its Conditions match its Baselines.</p>}</div>
        </> : selection.type === 'edge' ? <div className="edge-inspector"><div className="edge-inspector-icon">╱</div><h3>Shared hex edge</h3><p>{selection.a} ↔ {selection.b}</p><p className="empty-hint">One edge belongs to both adjacent hexes. Blocking works in both directions.</p>{selectedEdge ? <div className="object-card"><BlockerFields blocker={selectedEdge} onChange={updateSelectedBlocker}/><button className="danger-outline" onClick={() => changeGarden((previous) => removeEdgeBlocker(previous, selection.a, selection.b))}>Remove edge blocker</button></div> : <button className="add-influence" onClick={() => changeGarden((previous) => placeEdgeBlocker(previous, selection.a, selection.b, makeBlocker()))}>＋ Place edge blocker</button>}</div> : null}
        <div className="data-actions"><button onClick={exportGarden}>↓ Export JSON</button><button onClick={() => fileInput.current?.click()}>↑ Import JSON</button><input ref={fileInput} type="file" accept=".json,application/json" hidden onChange={importGarden}/></div>
      </aside>
    </div>

    {showGuide && <div className="modal-backdrop" onMouseDown={() => setShowGuide(false)}><div className="guide-modal" role="dialog" aria-modal="true" aria-label="How the Environmental Sandbox works" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowGuide(false)}>×</button><span className="eyebrow">FIELD GUIDE · PROTOTYPE 01</span><h2>A living system of influences</h2><p>Every hex has a permanent Material, four environmental Properties, and a Baseline for each. Sources emit Influences that adjust Conditions only while they reach a hex.</p><div className="guide-grid"><div><b>01 · Place</b><p>Choose Source, Hex Blocker, or Edge Blocker from the workbench and click the garden.</p></div><div><b>02 · Configure</b><p>Select a Source to tune its Influence, strength, range, and propagation mode.</p></div><div><b>03 · Observe</b><p>Switch property overlays and inspect any hex to see exactly how its Conditions are calculated.</p></div><div><b>04 · Experiment</b><p>Waterborne Influences require a connected chain of Flooded hexes. Blockers can redirect paths.</p></div></div><button className="primary-button" onClick={() => setShowGuide(false)}>Return to the garden →</button></div></div>}
  </div>;
}

function BlockerFields({ blocker, onChange }) {
  return <div className="blocker-fields"><label>Blocking rule<select value={blocker.rule} onChange={(event) => onChange('rule', event.target.value)}><option value="full">Full — all Influences</option><option value="kind">Selective — by Kind</option><option value="mode">Selective — by Mode</option></select></label>{blocker.rule === 'kind' && <label>Blocked Influence Kind<select value={blocker.value} onChange={(event) => onChange('value', event.target.value)}>{KINDS.map((kind) => <option key={kind}>{kind}</option>)}</select></label>}{blocker.rule === 'mode' && <label>Blocked Propagation Mode<select value={blocker.value} onChange={(event) => onChange('value', event.target.value)}>{MODES.map((mode) => <option key={mode} value={mode}>{titleCase(mode)}</option>)}</select></label>}<p className="small-explanation">Other Influences can still travel around the obstacle if a valid path remains within Range.</p></div>;
}
