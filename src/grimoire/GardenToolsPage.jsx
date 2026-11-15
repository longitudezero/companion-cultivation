import React from 'react';
import { SOURCE_ITEM_GROUPS } from '../core/source-item-catalog.js';
import { formatRealDuration } from '../core/game-time.js';
import { runeName } from './book.js';
import { art } from './art.js';
import { EffectTerm } from './EffectTerm.jsx';

const EFFECT_KINDS = Object.freeze({
  Warming: 'warming', Cooling: 'cooling', Wetting: 'wetting', Drying: 'drying',
  Brightening: 'brightening', Dimming: 'dimming',
});
const sourceItemArt = id => `${import.meta.env?.BASE_URL || '/'}ui/source-items/${id}.webp`;
const hiddenLine = identity => `${runeName(`${identity}:a`)} ${runeName(`${identity}:b`)} ${runeName(`${identity}:c`)}`;

function ToolEntry({ item, locked, glossary }) {
  if (locked) return <article className="cg-tool-entry is-locked" aria-label="Undiscovered garden tool">
    <div className="cg-tool-illustration"><img src={art('unknown-tools')} alt="An unidentified wrapped garden artifact" draggable="false"/></div>
    <div className="cg-tool-copy">
      <h2 className="cg-runes">{runeName(`tool:${item.id}`)}</h2>
      <p className="cg-tool-description cg-runes">{hiddenLine(`tool:${item.id}:description`)}</p>
      <p className="cg-tool-properties cg-runes">{hiddenLine(`tool:${item.id}:properties`)}</p>
    </div>
  </article>;
  return <article className="cg-tool-entry">
    <div className="cg-tool-illustration"><img src={sourceItemArt(item.id)} alt={`${item.name} illustration`} draggable="false"/></div>
    <div className="cg-tool-copy">
      <h2>{item.name}</h2>
      <p className="cg-tool-description">Item description goes here</p>
      <dl className="cg-tool-properties">
        <div><dt>Influence</dt><dd>{item.propertyEffects.map((effect, index) => <React.Fragment key={effect.name}>
          {index > 0 && <span aria-hidden="true"> · </span>}<EffectTerm kind={EFFECT_KINDS[effect.name]} glossary={glossary}>{effect.name}</EffectTerm> {effect.strength > 0 ? '+' : ''}{effect.strength}
        </React.Fragment>)}</dd></div>
        <div><dt>Reach</dt><dd>{item.propagation === 'spread-budget' ? `Directional · Budget ${item.budget}` : `Area · Radius ${item.range}`}</dd></div>
        <div><dt>Duration</dt><dd>{formatRealDuration(item.durationHours)} at 1×</dd></div>
      </dl>
    </div>
  </article>;
}

export function GardenToolsOpening() {
  return <div className="cg-tools-opening">
    <span className="cg-eyebrow">The Guild field collection</span>
    <h1>Garden Tools</h1>
    <img className="cg-tools-frontispiece" src={art('icons/tools')} alt="An arrangement of enchanted gardening instruments" draggable="false"/>
    <p>Temporary instruments can reshape a garden long enough to rescue a crop, prepare a transformation, or test a particularly hopeful theory.</p>
    <div className="cg-tools-legend">
      <p><strong>Influence</strong><span>The Condition changed and the number of steps applied.</span></p>
      <p><strong>Reach</strong><span>An Area radius, or a Directional Budget shared by every branch.</span></p>
      <p><strong>Duration</strong><span>How long the instrument remains in the garden at normal speed.</span></p>
    </div>
    <p className="cg-small">The Guild reveals each collection when its tools become available.</p>
  </div>;
}

export default function GardenToolsGroup({ groupIndex, unlockedGroup = 0, preview = false, glossary }) {
  const group = SOURCE_ITEM_GROUPS[groupIndex], locked = !preview && unlockedGroup < group.number;
  return <div className={`cg-tools-group${locked ? ' is-locked' : ''}`}>
    <header>
      <span className="cg-eyebrow">Garden Tools · Collection {group.number}</span>
      <h1 className={locked ? 'cg-runes' : undefined}>{locked ? runeName(`tool-group:${group.number}`) : group.name}</h1>
      <p>{locked ? 'The Guild seal has not yet been broken.' : `${group.items.length} field instruments recorded in this collection.`}</p>
    </header>
    <div className="cg-tool-list" style={{ '--tool-count': group.items.length }}>{group.items.map(item =>
      <ToolEntry key={item.id} item={item} locked={locked} glossary={glossary}/>)}</div>
  </div>;
}
