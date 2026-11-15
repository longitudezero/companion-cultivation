import React from 'react';
import { BLOCKER_DESIGNS, BLOCKER_ITEMS } from '../core/blocker-catalog.js';
import { blockerArt } from '../ui/blocker-art.js';
import { runeName } from './book.js';
import { art } from './art.js';

const GROUPS = Object.freeze(Array.from({ length: Math.ceil(BLOCKER_DESIGNS.length / 2) }, (_, index) =>
  Object.freeze(BLOCKER_DESIGNS.slice(index * 2, index * 2 + 2))));
const FILTER_LABELS = Object.freeze({
  all: 'All environmental and cultivation effects',
  airborne: 'Airborne cultivation', waterborne: 'Waterborne cultivation',
  Mycelial: 'Mycelial spread and support',
});
const hiddenLine = identity => `${runeName(`${identity}:a`)} ${runeName(`${identity}:b`)} ${runeName(`${identity}:c`)}`;
const filterText = filters => filters.map(filter => FILTER_LABELS[filter] || filter).join(' · ');

function FormArt({ item, locked }) {
  return <figure className={`cg-blocker-form cg-blocker-form-${item.form}`}>
    <img src={locked ? art('unknown-tools') : blockerArt(item)}
      alt={locked ? '' : `${item.baseName} ${item.form === 'edge' ? 'edge' : 'full hex'} illustration`} draggable="false"/>
    <figcaption className={locked ? 'cg-runes' : undefined}>
      {locked ? runeName(`blocker-form:${item.id}`) : item.form === 'edge' ? 'Edge' : 'Full hex'}
    </figcaption>
  </figure>;
}

function BlockerEntry({ design, locked }) {
  const edge = BLOCKER_ITEMS[`blocker:${design.id}:edge`], full = BLOCKER_ITEMS[`blocker:${design.id}:hex`];
  if (locked) return <article className="cg-blocker-entry is-locked" aria-label="Undiscovered blocker design">
    <div className="cg-blocker-forms"><FormArt item={edge} locked/><FormArt item={full} locked/></div>
    <div className="cg-blocker-copy">
      <h2 className="cg-runes">{runeName(`blocker:${design.id}`)}</h2>
      <p className="cg-blocker-description cg-runes">{hiddenLine(`blocker:${design.id}:description`)}</p>
      <p className="cg-blocker-properties cg-runes">{hiddenLine(`blocker:${design.id}:properties`)}</p>
    </div>
  </article>;
  return <article className="cg-blocker-entry">
    <div className="cg-blocker-forms"><FormArt item={edge}/><FormArt item={full}/></div>
    <div className="cg-blocker-copy">
      <h2>{design.name}</h2>
      <p className="cg-blocker-description">Item description goes here</p>
      <dl className="cg-blocker-properties">
        <div><dt>Blocks</dt><dd>{filterText(design.filters)}</dd></div>
        <div><dt>Placement</dt><dd>Shared edge or full hex</dd></div>
        <div><dt>Use</dt><dd>Reusable after retrieval</dd></div>
      </dl>
    </div>
  </article>;
}

export function BlockersOpening() {
  return <div className="cg-blockers-opening">
    <span className="cg-eyebrow">Boundaries for a complicated garden</span>
    <h1>Blockers</h1>
    <div className="cg-blockers-frontispiece" aria-hidden="true">
      <img src={blockerArt('blocker:root-barrier:edge')} alt="" draggable="false"/>
      <img src={blockerArt('blocker:root-barrier:hex')} alt="" draggable="false"/>
    </div>
    <p>Blockers interrupt selected influences. An Edge Blocker closes one shared boundary; a Full Hex Blocker closes every route through its occupied hex.</p>
    <div className="cg-tools-legend">
      <p><strong>Blocks</strong><span>The conditions, propagation modes, or garden networks stopped by the design.</span></p>
      <p><strong>Placement</strong><span>Every design is available as an Edge piece and a Full Hex piece.</span></p>
      <p><strong>Use</strong><span>Retrieve a placed Blocker to return it to the Inventory.</span></p>
    </div>
    <p className="cg-small">New designs reveal themselves when the Guild awards them.</p>
  </div>;
}

export default function BlockerGroup({ groupIndex, unlockedDesigns = new Set(), preview = false }) {
  const group = GROUPS[groupIndex] || [];
  return <div className="cg-blockers-group">
    <header>
      <span className="cg-eyebrow">Blocker Catalogue · Folio {groupIndex + 1}</span>
      <h1>Field Barriers</h1>
      <p>Edge and Full Hex forms share the same blocking effect.</p>
    </header>
    <div className="cg-blocker-list" style={{ '--blocker-count': group.length }}>{group.map(design =>
      <BlockerEntry key={design.id} design={design} locked={!preview && !unlockedDesigns.has(design.id)}/>)}</div>
  </div>;
}
