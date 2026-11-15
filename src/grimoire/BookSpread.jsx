import React from 'react';
import { formatRealDuration } from '../core/game-time.js';
import { previewPlantConditions, previewPlantHazards, previewPlantCompatibility, previewPlantRecipes,
  previewFungusProfile, previewFungusEffects } from '../core/grimoire-preview.js';
import { BOOK_ENTRIES, CHAPTERS, entryKnown, entryName, discoveryPhrase, observedEffects, observedTransformations,
  fungusTransformationTargets } from './book.js';
import { observedEffectText } from './effects.js';
import EffectText from './EffectTerm.jsx';
import { art } from './art.js';
import { illustrationFor } from './illustrations.js';
import TransformationAtlas from './TransformationAtlas.jsx';
import GardenToolsGroup, { GardenToolsOpening } from './GardenToolsPage.jsx';
import BlockerGroup, { BlockersOpening } from './BlockersPage.jsx';

export function PageNumber({ number }) { return <div className="cg-page-number">{number}</div>; }

function Fact({ title, lines, glossary, empty = 'Not yet observed', transformations = false }) {
  return <section className={`cg-fact ${transformations ? 'cg-transformations' : ''}`}>
    <h2>{title}</h2>
    {lines.length ? lines.map((line, index) => <React.Fragment key={index}>
      {transformations && index > 0 && <span className="cg-botanical-divider" aria-hidden="true">❦</span>}
      <p><EffectText text={line} glossary={glossary}/></p>
    </React.Fragment>) : <p className="cg-unknown">{empty}</p>}
  </section>;
}

function Jump({ entry, ledger, preview, navigate }) {
  const members = BOOK_ENTRIES.filter(item => item.chapter === entry.chapter && ['plant', 'fungus'].includes(item.kind));
  return <label className="cg-entry-jump">Find an entry
    <select value={entry.key} aria-label={`Find entry in ${CHAPTERS[entry.chapter].label}`}
      onChange={event => navigate(event.target.value)}>
      {members.map(item => <option key={item.key} value={item.key}>{entryName(item, ledger, preview)} · p. {item.page}</option>)}
    </select>
  </label>;
}

function EntryLinks({ entries, ledger, preview, navigate }) {
  return <div className="cg-index-list">{entries.map(entry => <button key={entry.key} type="button"
    onClick={() => navigate(entry.key)} aria-label={`Open ${entryName(entry, ledger, preview)}, page ${entry.page}`}>
    <span className={entryKnown(entry, ledger, preview) ? undefined : 'cg-runes'}>{entryName(entry, ledger, preview)}</span>
    <span className="cg-index-page-ref">p. {entry.page}</span>
  </button>)}</div>;
}

function FamilyList({ chapter, ...props }) {
  return <EntryLinks entries={BOOK_ENTRIES.filter(item => item.chapter === chapter && ['plant', 'fungus'].includes(item.kind))} {...props}/>;
}

function FungusTransformations({ species, ledger, preview, navigate }) {
  const targets = fungusTransformationTargets(ledger, species, preview);
  return <section className="cg-fact cg-transformations">
    <h2>Transformations</h2>
    {targets.length ? <>
      <p>This Fungus is necessary to transform into these Plants:</p>
      <EntryLinks entries={targets} ledger={ledger} preview={preview} navigate={navigate}/>
    </> : <p className="cg-unknown">{preview ? 'No Transformations naming this Fungus' : 'No Transformation destinations discovered yet'}</p>}
  </section>;
}

function ChapterContents({ navigate }) {
  return <div className="cg-index-list">{CHAPTERS.filter(chapter => chapter.key !== 'Index').map(chapter => {
    const chapterIndex = CHAPTERS.indexOf(chapter), entry = BOOK_ENTRIES.find(item => item.chapter === chapterIndex);
    return <button key={entry.key} type="button" onClick={() => navigate(entry.key)}>
      <span>{chapter.label}</span><span className="cg-index-page-ref">p. {entry.page}</span>
    </button>;
  })}</div>;
}

function witnessText(record) {
  const conditions = Object.entries(record.conditions || {}).map(([name, value]) => `${name}: ${value}`).join(' · ');
  return `${record.from} → ${record.into}. ${conditions}.${record.fungi?.length ? ` Named contact observed: ${record.fungi.join(', ')}.` : ''}${Number.isFinite(record.hours) ? ` Exposure: ${formatRealDuration(record.hours)}.` : ''}`;
}

export default function BookSpread({ entry, side, ledger, preview = false, unlockedSourceGroup = 0,
  unlockedBlockers = new Set(), navigate, glossary }) {
  const chapter = CHAPTERS[entry.chapter], left = side === 'left';
  const toolPage = entry.kind === 'tools' ? entry[side] : null;
  const blockerPage = entry.kind === 'blockers' ? entry[side] : null;
  const opening = entry.kind === 'overview' || entry.kind === 'index' || toolPage?.kind === 'tools-opening'
    || blockerPage?.kind === 'blockers-opening';
  const known = entryKnown(entry, ledger, preview);
  const illustration = known && entry.species ? illustrationFor(entry.species) : null;
  const pageNo = entry.page + (left ? 0 : 1);
  const name = entryName(entry, ledger, preview);
  const organismEntry = ['plant', 'fungus'].includes(entry.kind);
  const classes = `cg-page-content cg-grimoire-ornament cg-chapter-${side}${opening ? '' : ' cg-subdued-ornament'}${organismEntry && left ? ' cg-entry-page' : ''}${entry.kind === 'overview' ? ' cg-family-opening' : ''}${entry.kind === 'overview' && !left && entry.chapter < 6 ? ' cg-atlas-page' : ''}${toolPage ? ' cg-tools-page' : ''}${toolPage?.kind === 'source-group' ? ' cg-tools-catalogue-page' : ''}${blockerPage ? ' cg-blockers-page' : ''}${blockerPage?.kind === 'blocker-group' ? ' cg-blockers-catalogue-page' : ''}`;
  const content = (() => {
    if (entry.kind === 'tools') return toolPage.kind === 'tools-opening' ? <GardenToolsOpening/>
      : <GardenToolsGroup groupIndex={toolPage.group} unlockedGroup={unlockedSourceGroup} preview={preview} glossary={glossary}/>;
    if (entry.kind === 'blockers') return blockerPage.kind === 'blockers-opening' ? <BlockersOpening/>
      : <BlockerGroup groupIndex={blockerPage.group} unlockedDesigns={unlockedBlockers} preview={preview}/>;
    if (entry.kind === 'overview') {
      if (left) return <>
        <h1>{chapter.label}</h1>
        <FamilyList chapter={entry.chapter} ledger={ledger} preview={preview} navigate={navigate}/>
      </>;
      if (entry.chapter < 6) return <>
        <h1>Transformation Atlas</h1>
        <TransformationAtlas chapter={entry.chapter} ledger={ledger} preview={preview} navigate={navigate}/>
      </>;
      return <>
        <h1>A Little Influence</h1>
        <p>Some change the soil. Some change the harvest. Some make your carefully arranged garden considerably more interesting.</p>
        <p className="cg-small">Each Fungus’s profile tells you its reach and cultivation effects. Successful experiments reveal its Transformation destinations.</p>
        <Fact title="Two kinds of influence" lines={['Environmental Influence changes Moisture, Temperature, or Illumination.', 'Cultivation Influence changes Growth speed, Ripening speed, production, or harvest timing.']} glossary={glossary}/>
        <Fact title="Reading the reach" lines={['Area of Effect gives the radius of an initial footprint.', 'Directional Spread is a number of steps shared between all its branches.', 'Waterborne cultivation can continue throughout a connected Flooded network after the initial footprint reaches it.']} glossary={glossary}/>
        <Fact title="Mycelial affinity" lines={['Independent Fungi do not require Mycelial ground.', 'Preferring Fungi strengthen their specifically listed bonuses on Mycelial ground.', 'Dependent Fungi need Mycelial ground to establish. If support is later lost, their grace period gives you time to restore it.']} glossary={glossary}/>
      </>;
    }
    if (entry.kind === 'index') return left ? <>
      <h1>A Garden, Recorded</h1>
      <div className="cg-book-frontispiece"><img src={art('book-launcher')} alt="An ornate botanical grimoire" draggable="false"/></div>
      <p>Every garden has its secrets. This one has rather a lot of pages reserved for them.</p>
      <p className="cg-small">Names, observations, and Transformations are recorded as you discover them in this garden.</p>
    </> : <><h1>Index</h1><ChapterContents navigate={navigate}/></>;

    if (left) return <>
      <div className={`cg-plate ${known ? '' : 'cg-undiscovered-plate'}${illustration ? ' cg-illustrated-plate' : ''}`}>
        {!known ? <img className="cg-seed-illustration" src={art('unknown-seeds')} alt="An undiscovered Plant, represented by enchanted seeds" draggable="false"/>
          : illustration ? <img className="cg-species-illustration" src={illustration.src} width={illustration.width}
            height={illustration.height} alt={`${name} illustration`} decoding="async" draggable="false"/>
            : <><span className="cg-plate-symbol" aria-hidden="true">{chapter.symbol}</span><span className="cg-plate-caption">Botanical plate awaiting illustration</span></>}
      </div>
      <div className="cg-entry-caption">
      <h1 className={`cg-entry-title${known ? '' : ' cg-runes'}`}>{name}</h1>
      <p>{!known ? `“${discoveryPhrase(entry.species, ledger)}”`
        : entry.kind === 'fungus' ? 'An identified Fungus. Its affinity, reach and cultivation effects are part of your starting field knowledge. Successful experiments reveal the Plants it helps create.'
          : `A member of the ${chapter.label} family. Its growing preferences, fungal interactions, and Transformations fill these pages as you observe them.`}</p>
      <Jump entry={entry} ledger={ledger} preview={preview} navigate={navigate}/>
      </div>
    </>;

    if (!known) return <>
      <h1>Room for a Discovery</h1>
      <p>Someone has very confidently reserved two whole pages for this Plant.</p>
      <p>Now we just need to find out what it is.</p>
      <Fact title="Growing preferences" lines={[]} glossary={glossary}/>
      <Fact title="Fungal interactions" lines={[]} glossary={glossary}/>
      <Fact title="Transformations" lines={[]} empty="Awaiting your experiments" glossary={glossary}/>
    </>;

    const fungal = entry.kind === 'fungus';
    const conditions = preview ? previewPlantConditions(entry.species)
      : Object.values(ledger.environments?.[entry.species] || {}).map(item => `${item.property}: ${item.condition} — ${item.signal} response`);
    const hazards = preview ? previewPlantHazards(entry.species)
      : Object.values(ledger.hazards?.[entry.species] || {}).map(item => `${item.hazard}: ${item.outcome === 'death' ? 'observed death' : 'observed growth or production penalty'}`);
    const effects = fungal ? previewFungusEffects(entry.species) : preview ? previewPlantCompatibility(entry.species)
      : observedEffects(ledger, entry.species).map(effect => `${effect.fungus} — ${observedEffectText(effect)}`);
    const transformations = fungal ? [] : preview ? previewPlantRecipes(entry.species)
      : observedTransformations(ledger, entry.species).map(witnessText);
    return <>
      <h1>{fungal ? 'Fungal Influence' : 'Cultivation Notes'}</h1>
      <p className="cg-small">{preview ? 'Full catalog reference. Your garden’s discoveries are preserved.' : fungal
        ? 'Known affinity, reach and cultivation effects. Transformation destinations appear as you discover them.'
        : 'Observations from this garden, gathered one experiment at a time.'}</p>
      {fungal ? <Fact title="Affinity and reach" lines={previewFungusProfile(entry.species)} glossary={glossary}/>
        : <><Fact title={preview ? 'Growing profile' : 'Experienced conditions'} lines={conditions} glossary={glossary}/>
          <Fact title={preview ? 'Exposure hazards' : 'Observed hazards'} lines={hazards} glossary={glossary}/></>}
      <Fact title={fungal ? 'Cultivation Influence' : preview ? 'Base Fungus Compatibility' : 'Observed cultivation influences'}
        lines={effects} empty={fungal ? 'No cultivation influence' : 'Not yet observed'} glossary={glossary}/>
      {fungal ? <FungusTransformations species={entry.species} ledger={ledger} preview={preview} navigate={navigate}/>
        : <Fact title="Transformations" lines={transformations} empty={preview ? 'No Transformations naming this species' : 'No Transformations recorded yet'} glossary={glossary} transformations/>}
    </>;
  })();
  return <div className={classes} style={{ '--page-border': `url("${art(`${chapter.art}-${side}-border`)}")` }}>
    <div className="cg-page-scroll" tabIndex={0} role="region" aria-label={`Page ${pageNo} content`}>{content}</div>
    <PageNumber number={pageNo}/>
  </div>;
}
