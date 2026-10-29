import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PLANTS, FUNGI, plantKnown, fungusKnowledge } from './core/index.js';
import { visibleGrimoirePlants, previewPlantConditions, previewPlantHazards, previewPlantCompatibility, previewPlantRecipes,
  previewFungusProfile, previewFungusEffects, previewFungusRecipes } from './core/grimoire-preview.js';
import './grimoire.css';

const CHAPTERS = [
  { key: 'Ingredients', label: 'Ingredients', short: 'ING', color: '#f04740', symbol: '❧' },
  { key: 'Flowers', label: 'Flowers', short: 'FLW', color: '#fb943f', symbol: '✿' },
  { key: 'Aquatic', label: 'Aquatic', short: 'AQU', color: '#f4d44e', symbol: '≋' },
  { key: 'Woodlands', label: 'Woodlands', short: 'WDL', color: '#42b968', symbol: '♣' },
  { key: 'Desert', label: 'Desert', short: 'DST', color: '#28a7dd', symbol: '✧' },
  { key: 'Spices', label: 'Spices', short: 'SPC', color: '#5867d4', symbol: '✳' },
  { key: 'Fungi', label: 'Fungi', short: 'FUN', color: '#ae5aab', symbol: '♧' },
  { key: 'Index', label: 'Index', short: 'IDX', color: '#98d4e2', symbol: '❦' },
];

const EFFECTS = {
  growthRate: 'Growth speed', ripeningRate: 'Ripening speed', leafYield: 'Leaf production',
  seedYield: 'Seed production', germination: 'Germination chance', harvestWindow: 'Harvest window',
  leafPeakTiming: 'Peak Leaf timing', seedTiming: 'Seed timing', hourlyLeaf: 'Leaves per 5s tick',
  hourlySeed: 'Seeds per 5s tick', leafAllocation: 'Leaf allocation', seedAllocation: 'Seed allocation',
};

function readableEffect(effect) {
  if (effect.kind.startsWith('environment:')) {
    return `${effect.kind.split(':')[1]} shifted to ${effect.result}`;
  }
  return `${EFFECTS[effect.kind] || effect.kind} ${effect.direction > 0 ? 'increased'
    : effect.direction < 0 ? 'decreased' : 'altered'}`;
}

function seenConditions(conditions) {
  return Object.entries(conditions || {}).map(([name, value]) => `${name}: ${value}`).join(' · ');
}

function PageNumber({ number }) {
  return <div className="cg-page-number">{number}</div>;
}

function EntryLeft({ entry, sectionEntries, pageNo, navigate, developerPreview }) {
  const chapter = CHAPTERS[entry.chapter];
  const index = entry.kind === 'index';
  return <div className="cg-page-content">
    <span className="cg-eyebrow">CULTIVATION GRIMOIRE · {chapter.label}</span>
    <h1>{index ? 'Cultivation Grimoire' : entry.species}</h1>
    <div className="cg-plate" aria-label="Illustration placeholder"><span className="cg-plate-symbol">{chapter.symbol}</span><span className="cg-plate-caption">Illustration to be commissioned</span></div>
    {index ? <p>{developerPreview ? 'Developer reference: all species and canonical recipes. This view does not change your garden discoveries.'
      : 'A living field book, written by your experiments. Each garden keeps its own discoveries.'}</p>
      : entry.kind === 'fungus' ? <p>An identified Fungus. Observe it around growing Plants to discover how it changes their environment and cultivation.</p>
        : <p>A member of the {chapter.label} family. Its behaviour and possible transformations are recorded as you witness them in your garden.</p>}
    {sectionEntries.length > 1 && <label className="cg-entry-jump">FIND AN ENTRY
      <select value={entry.key} onChange={event => navigate(event.target.value)} aria-label={`Find entry in ${chapter.label}`}>
        {sectionEntries.map(item => <option key={item.key} value={item.key}>{item.species}</option>)}
      </select>
    </label>}
    <span className="cg-small">{index ? 'Field index' : developerPreview ? `Developer reference · ${entry.kind === 'fungus' ? 'Fungus' : chapter.label}`
      : entry.kind === 'fungus' ? 'Fungus · Identity known' : `Plant · ${chapter.label}`}</span>
    <PageNumber number={pageNo}/>
  </div>;
}

function Fact({ symbol, title, lines, empty = 'Not yet observed' }) {
  return <section className="cg-fact"><div className="cg-fact-symbol" aria-hidden="true">{symbol}</div><div>
    <h2>{title}</h2>
    {lines.length ? lines.map((line, index) => <p key={index}>{line}</p>) : <p className="cg-unknown">{empty}</p>}
  </div></section>;
}

function EntryRight({ entry, ledger, pageNo, navigate, entries, developerPreview }) {
  if (entry.kind === 'index') {
    return <div className="cg-page-content">
      <span className="cg-eyebrow">CONTENTS · EIGHT SECTIONS</span><h1>Index</h1>
      <p className="cg-small">Open a section with the colored bookmarks. {developerPreview
        ? 'Every catalogued Plant and Fungus is available in this read-only preview.'
        : 'Only Plants you have identified appear in this book.'}</p>
      <div className="cg-index-list">{CHAPTERS.slice(0, 7).map((chapter, index) => {
        const destination = entries.find(item => item.chapter === index);
        return <button key={chapter.key} type="button" onClick={() => destination && navigate(destination.key)}>
          <span>{String(index + 1).padStart(2, '0')} · {chapter.label}</span><span>↗</span>
        </button>;
      })}</div><PageNumber number={pageNo}/>
    </div>;
  }
  const fungal = entry.kind === 'fungus';
  const fungalRecord = fungal && !developerPreview ? fungusKnowledge(ledger, entry.species) : null;
  const conditions = developerPreview ? (fungal ? [] : previewPlantConditions(entry.species))
    : fungal ? [] : Object.values(ledger.environments?.[entry.species] || {})
      .map(item => `${item.property}: ${item.condition} — ${item.signal} response`);
  const hazards = developerPreview ? (fungal ? [] : previewPlantHazards(entry.species))
    : fungal ? [] : Object.values(ledger.hazards?.[entry.species] || {})
      .map(item => `${item.hazard}: ${item.outcome === 'death' ? 'observed death' : 'observed production or growth penalty'}`);
  const effects = developerPreview ? (fungal ? previewFungusEffects(entry.species) : previewPlantCompatibility(entry.species))
    : fungal ? fungalRecord.effects.map(item => `${item.plant} — ${readableEffect(item)}`)
      : Object.values(ledger.fungalEffects?.[entry.species] || {})
        .map(item => `${item.fungus} — ${readableEffect(item)}`);
  const witnessed = developerPreview ? (fungal ? previewFungusRecipes(entry.species) : previewPlantRecipes(entry.species))
    : (fungal ? fungalRecord.transformations
      : (ledger.transformations || []).filter(item => item.from === entry.species || item.into === entry.species))
      .map(item => `${item.from} → ${item.into}. ${seenConditions(item.conditions)}.${item.fungi.length
        ? ` Present: ${item.fungi.join(', ')}.` : ''}`);
  return <div className="cg-page-content">
    <span className="cg-eyebrow">{developerPreview ? 'DEVELOPER REFERENCE · READ ONLY' : 'FIELD OBSERVATIONS'}</span>
    <h1>{fungal ? developerPreview ? 'Fungus Profile' : 'Known Interactions' : 'Cultivation Notes'}</h1>
      <p className="cg-small">{developerPreview ? 'Full catalogue data; times shown are real-time equivalents at the live pace. Your discoveries are unchanged.'
      : 'Only events witnessed in this garden appear here.'}</p>
    {developerPreview && fungal && <Fact symbol="◇" title="Habitat and Reach" lines={previewFungusProfile(entry.species)}/>}
    {!fungal && <Fact symbol="◇" title={developerPreview ? 'Growing Profile' : 'Experienced Conditions'} lines={conditions}/>}
    {!fungal && <Fact symbol="✥" title={developerPreview ? 'Exposure Hazards' : 'Hazards'} lines={hazards}/>}
    <Fact symbol="♧" title={developerPreview ? fungal ? 'Cultivation Package' : 'Base Fungus Compatibility'
      : fungal ? 'Effects on Plants' : 'Fungal Influences'} lines={effects}/>
    <Fact symbol="❧" title={developerPreview ? 'All Transformation Recipes' : 'Confirmed Transformations'}
      lines={witnessed} empty={developerPreview ? 'No recipes involving this species' : 'No transformations discovered'}/>
    {developerPreview && !fungal && <p className="cg-small">Fungal effects may vary by recipient and conditions. See the Fungi chapter for the emitting packages.</p>}
    <PageNumber number={pageNo}/>
  </div>;
}

function TurningBookmark({ chapter, index }) {
  return <div className="cg-turn-bookmark" style={{ '--cg-tab-i': index, '--cg-tab-color': chapter.color }}>
    <div className="cg-bookmark-face front"><span>{chapter.label}</span><b>{chapter.short}</b></div>
    <div className="cg-bookmark-face back"><span>{chapter.label}</span><b>{chapter.short}</b></div>
  </div>;
}

export default function CultivationGrimoire({ garden, onClose, developerTools = false }) {
  const closeRef = useRef(null);
  useEffect(() => { closeRef.current?.focus(); }, []);
  const [developerPreview, setDeveloperPreview] = useState(false);
  const ledger = garden.grimoire || { plants: {}, environments: {}, fungalEffects: {}, hazards: {}, transformations: [] };
  const entries = useMemo(() => {
    const result = [];
    const visiblePlants = new Set(visibleGrimoirePlants(ledger, developerPreview));
    CHAPTERS.slice(0, 6).forEach((chapter, chapterIndex) => {
      for (const [species, definition] of Object.entries(PLANTS)) {
        if (definition.family === chapter.key && visiblePlants.has(species)) {
          result.push({ key: `plant:${species}`, chapter: chapterIndex, species, kind: 'plant' });
        }
      }
    });
    for (const species of Object.keys(FUNGI)) {
      result.push({ key: `fungus:${species}`, chapter: 6, species, kind: 'fungus' });
    }
    result.push({ key: 'index', chapter: 7, species: 'Index', kind: 'index' });
    return result;
  }, [ledger.plants, developerPreview]);
  const [currentKey, setCurrentKey] = useState(entries[0]?.key);
  const [turn, setTurn] = useState(null);
  const activeIndex = Math.max(0, entries.findIndex(entry => entry.key === currentKey));
  const current = entries[activeIndex];
  const destination = turn ? entries.find(item => item.key === turn.to) : null;
  const page = destination || current;
  const pageIndex = turn ? entries.indexOf(destination) : activeIndex;
  const direction = turn ? Math.sign(pageIndex - activeIndex) : 0;
  const movingTabs = turn ? CHAPTERS.map((chapter, i) => i).filter(i =>
    (i < current.chapter || activeIndex === entries.length - 1)
      !== (i < destination.chapter || pageIndex === entries.length - 1)) : [];

  function togglePreview() {
    if (!developerTools) return;
    // An undiscovered species must not linger on the page when returning to
    // the player view; the discovery ledger itself is never altered.
    if (developerPreview && current.kind === 'plant' && !plantKnown(ledger, current.species)) {
      setCurrentKey('plant:Beanstalk');
    }
    setTurn(null);
    setDeveloperPreview(!developerPreview);
  }

  function navigate(key) {
    const targetIndex = entries.findIndex(entry => entry.key === key);
    if (turn || targetIndex < 0 || targetIndex === activeIndex) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setCurrentKey(key);
    else setTurn({ to: key, from: current.key });
  }

  useEffect(() => {
    if (!turn) return undefined;
    const timer = window.setTimeout(() => {
      setCurrentKey(turn.to);
      setTurn(null);
    }, 1030);
    return () => window.clearTimeout(timer);
  }, [turn]);

  useEffect(() => {
    function keydown(event) {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); return; }
      if (turn || ['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (event.key === 'ArrowRight' && activeIndex < entries.length - 1) {
        event.preventDefault(); navigate(entries[activeIndex + 1].key);
      } else if (event.key === 'ArrowLeft' && activeIndex > 0) {
        event.preventDefault(); navigate(entries[activeIndex - 1].key);
      }
    }
    document.addEventListener('keydown', keydown);
    return () => document.removeEventListener('keydown', keydown);
  });

  function pageLeft(entry, index) {
    return <EntryLeft entry={entry} pageNo={index * 2 + 1} navigate={navigate}
      sectionEntries={entries.filter(item => item.chapter === entry.chapter && item.kind !== 'index')}
      developerPreview={developerPreview}/>;
  }

  function pageRight(entry, index) {
    return <EntryRight entry={entry} pageNo={index * 2 + 2} navigate={navigate} ledger={ledger}
      entries={entries} developerPreview={developerPreview}/>;
  }

  return <div className="cg-overlay" role="dialog" aria-modal="true" aria-label="Cultivation Grimoire">
    <div className="cg-scene">
      <span className="cg-workbench-label">COMPANION CULTIVATION / CULTIVATION GRIMOIRE</span>
      <div className="cg-shell">
        {developerTools && <div className="cg-preview-tools">
          <button type="button" className={developerPreview ? 'active' : ''} aria-pressed={developerPreview}
            onClick={togglePreview}>{developerPreview ? 'Return to discoveries' : 'Preview full Grimoire'}</button>
          <span>{developerPreview ? 'DEVELOPER PREVIEW · 60 PLANTS · 13 FUNGI · READ ONLY' : 'Developer testing · garden knowledge preserved'}</span>
        </div>}
        <div className="cg-book-stage"><div className="cg-book">
          <div className="cg-cover" aria-hidden="true"/>
          <div className="cg-under-sheet second left" aria-hidden="true"/><div className="cg-under-sheet second right" aria-hidden="true"/>
          <div className="cg-under-sheet left" aria-hidden="true"/><div className="cg-under-sheet right" aria-hidden="true"/>
          <nav className="cg-tabs" aria-label="Grimoire sections">{CHAPTERS.map((chapter, i) => {
            const left = i < current.chapter || activeIndex === entries.length - 1;
            return <button key={chapter.key} type="button"
              className={`cg-tab ${left ? 'left' : 'right'} ${movingTabs.includes(i) ? 'travelling' : ''}`}
              style={{ '--cg-tab-i': i, '--cg-tab-color': chapter.color }}
              aria-current={page.chapter === i ? 'page' : undefined}
              aria-label={`Open ${chapter.label} section`} title={chapter.label} disabled={Boolean(turn)}
              onClick={() => navigate(entries.find(entry => entry.chapter === i)?.key)}>
              <span>{chapter.label}</span><b>{chapter.short}</b>
            </button>;
          })}</nav>
          <article className="cg-page left" aria-label="Left page">{pageLeft(page, pageIndex)}</article>
          <article className="cg-page right" aria-label="Right page">{pageRight(page, pageIndex)}</article>
          <div className="cg-spine" aria-hidden="true"/>
          {turn && <div className={`cg-turn-leaf ${direction > 0 ? 'forward' : 'backward'} turning`} aria-hidden="true"
            onAnimationEnd={event => {
              if (event.target !== event.currentTarget) return;
              setCurrentKey(turn.to);
              setTurn(null);
            }}>
            <div className="cg-turn-face front">{direction > 0 ? pageRight(current, activeIndex) : pageLeft(current, activeIndex)}</div>
            <div className="cg-turn-face back">{direction > 0 ? pageLeft(destination, pageIndex) : pageRight(destination, pageIndex)}</div>
            <div className="cg-turn-bookmarks">{movingTabs.map(i => <TurningBookmark key={i} chapter={CHAPTERS[i]} index={i}/>)}</div>
          </div>}
          <button className="cg-control previous" disabled={Boolean(turn) || activeIndex === 0}
            aria-label="Previous spread" title="Previous spread (left arrow)"
            onClick={() => navigate(entries[activeIndex - 1].key)}>←</button>
          <button className="cg-control next" disabled={Boolean(turn) || activeIndex === entries.length - 1}
            aria-label="Next spread" title="Next spread (right arrow)"
            onClick={() => navigate(entries[activeIndex + 1].key)}>→</button>
          <button ref={closeRef} className="cg-control close" aria-label="Close Grimoire" title="Close Grimoire (Escape)" onClick={onClose}>×</button>
        </div></div>
        <div className="cg-status" aria-live="polite">{CHAPTERS[page.chapter].label} · {pageIndex + 1} / {entries.length}</div>
        <p className="cg-hint">Turn pages with ← →, select {developerPreview ? 'any' : 'a discovered'} entry, or use the colored bookmarks. Time continues in the garden.</p>
      </div>
    </div>
  </div>;
}
