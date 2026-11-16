import React from 'react';
import { art } from '../grimoire/art.js';
import { PageNumber } from '../grimoire/BookSpread.jsx';
import { FIELD_MANUAL_CHAPTERS } from './book.js';

const fieldManualLauncher = `${import.meta.env?.BASE_URL || '/'}field-manual/book-launcher.png`;

const Ladders = () => <div className="fm-ladders" aria-label="Environmental condition ladders">
  <div><b>Moisture</b><span className="moisture">Dry<i/>Damp<i/>Flooded</span><small>terrain fill</small></div>
  <div><b>Temperature</b><span className="temperature">Freezing<i/>Cold<i/>Temperate<i/>Hot<i/>Scorching</span><small>hex border</small></div>
  <div><b>Illumination</b><span className="illumination">Dark<i/>Dim<i/>Lit<i/>Bright</span><small>medallion</small></div>
</div>;

function RouteDiagram({ water = false, directional = false }) {
  return <div className={`fm-route-diagram${water ? ' water' : ''}${directional ? ' directional' : ''}`} aria-hidden="true">
    <span className="source">✦</span>{[0, 1, 2, 3, 4].map(index => <span key={index} className={`cell c${index}`}>⬡</span>)}
    <span className="route">➝</span><span className="wall">▮</span><span className="route alternate">⌁</span>
  </div>;
}

const Lifecycle = ({ fungus = false }) => <div className="fm-lifecycle" aria-label={`${fungus ? 'Fungus' : 'Plant'} lifecycle`}>
  <div className="fm-life-track"><span/><i className="at-start">0%</i><i className="at-mid">100%</i><i className="at-end">200%</i></div>
  <div><b>{fungus ? 'Growth' : 'Growth'}</b><b>{fungus ? 'Sporulation' : 'Ripening'}</b><b>Mature</b></div>
</div>;

function RuleList({ children }) { return <ul className="fm-rule-list">{children}</ul>; }
const Rule = ({ children }) => <li>{children}</li>;
const Note = ({ children }) => <aside className="fm-margin-note">{children}</aside>;
const Heading = ({ eyebrow, title }) => <><span className="cg-eyebrow">{eyebrow}</span><h1>{title}</h1></>;

const blockerRows = [
  ['Root Barrier', 'Mycelial spread and support'],
  ['Windbreak', 'Temperature effects and Airborne cultivation'],
  ['Water Gate', 'Waterborne cultivation'],
  ['Garden Screen', 'Illumination and Moisture effects'],
  ['Stone Wall', 'All environmental effects, cultivation effects, and Mycelial spread or support'],
  ['Insulating Panel', 'Temperature effects'],
  ['Shade Panel', 'Illumination effects'],
  ['Pond Liner', 'Moisture effects and Waterborne cultivation'],
  ['Climate Divider', 'Moisture, Temperature, and Illumination effects'],
];

function FrontMatter({ side }) {
  if (side === 'left') return <>
    <div className="fm-title-mark"><img src={fieldManualLauncher} alt=""/><span>✦</span></div>
    <Heading eyebrow="A companion for practical cultivation" title="Field Manual"/>
    <p className="fm-lede">A practical guide to tending the hex garden.</p>
    <p>This book records the garden's shared rules. The garden and Inspector show what is happening now; the Cultivation Grimoire records individual species and discoveries.</p>
    <Note>Opening a book, the Shop, Taskboard, Inventory, or main menu does not pause the garden.</Note>
  </>;
  return <><Heading eyebrow="All chapters available" title="Contents"/>
    <div className="fm-contents">{FIELD_MANUAL_CHAPTERS.map((chapter, index) => {
      const ranges = ['1–6', '7–12', '13–22', '23–26', '27–30'];
      const descriptions = ['The garden, its hexes, and Conditions.', 'Effects, propagation, routes, and Blockers.', 'Planting, lifecycles, Fungi, and discovery.', 'Possessions, commerce, tasks, and expansion.', 'Operations, books, preferences, and saves.'];
      return <div key={chapter.key}><span><b>{chapter.label}</b><small>{descriptions[index]}</small></span><i>{ranges[index]}</i></div>;
    })}</div>
    <p className="fm-smallprint">This is a reference, not a list of solutions. Species-specific requirements and exact discoveries remain in the garden and Grimoire.</p>
  </>;
}

function GardenHexes({ side }) {
  if (side === 'left') return <><Heading eyebrow="Garden · fundamentals" title="The garden at a glance"/>
    <div className="fm-hex-cluster" aria-hidden="true"><span>⬡</span><span>⬡</span><span>⬡</span><i>╱</i></div>
    <RuleList>
      <Rule>One hex can hold a Plant, Fungus, temporary Garden Tool, Full Hex Blocker, or concealed planting attempt.</Rule>
      <Rule>Uncommitted proposals reserve their hex but are not active. Edge Blockers occupy shared borders.</Rule>
      <Rule>Placement and open routes determine what can reach where.</Rule>
      <Rule>Removing a source ends its continuing contribution; it does not undo results already earned.</Rule>
    </RuleList><Note>Live garden: time continues until Pause is selected.</Note></>;
  return <><Heading eyebrow="Garden · visual language" title="Reading a hex"/>
    <div className="fm-annotated-hex"><div className="hex"><span className="occupant">❧</span><span className="light">☀</span><span className="growth"/></div>
      <span className="label fill">terrain fill · Moisture</span><span className="label border">border · Temperature</span>
      <span className="label icon">medallion · Illumination</span><span className="label life">lifecycle bar</span></div>
    <p>Occupant art, Mycelial overlay, Blockers, planting markers, and the selection outline add further information without replacing the three Conditions.</p>
    <p>The Inspector gives the exact present state. Compact icons are used during play; full illustrations remain in the Inspector and Grimoire.</p></>;
}

function Conditions({ side }) {
  if (side === 'left') return <><Heading eyebrow="Garden · environment" title="Three Properties"/><Ladders/>
    <p>A <b>baseline</b> is the hex's underlying Condition. Active Influences move the <b>resolved Condition</b> without rewriting that baseline.</p>
    <div className="fm-pairs"><span>Wetting ↗</span><span>Drying ↘</span><span>Warming ↗</span><span>Cooling ↘</span><span>Brightening ↗</span><span>Dimming ↘</span></div></>;
  return <><Heading eyebrow="Garden · environment" title="Combining & neighbouring"/>
    <p>Opposing Influences can cancel. Separate sources combine, while a single emission applies only once to a reached hex. Results stop at the ends of each ladder.</p>
    <div className="fm-three-hex"><span className="extreme">⬡<b>Extreme</b></span><i>→</i><span className="affected">⬡<b>One step</b></span><i className="faded">⇢</i><span>⬡<b>No chain</b></span></div>
    <RuleList><Rule>Flooded, Scorching, Freezing, Bright, and Dark can affect immediate neighbours.</Rule><Rule>Neighbour effects do not chain through the next hex.</Rule><Rule>Opposing neighbouring extremes can cancel.</Rule><Rule>Flooded adjacency is not Waterborne propagation.</Rule></RuleList></>;
}

function Influences({ side }) {
  if (side === 'left') return <><Heading eyebrow="Effects · vocabulary" title="Different kinds of change"/>
    <div className="fm-definition"><b>Environmental Influence</b><p>Moves Moisture, Temperature, or Illumination.</p></div>
    <div className="fm-definition"><b>Cultivation Effect</b><p>Changes how a Plant develops, produces, or germinates.</p></div>
    <div className="fm-definition"><b>Observation</b><p>A result the garden has witnessed and can record.</p></div>
    <p>A Fungus may have different environmental and cultivation footprints. An Effect can reach a Plant even when its lifecycle window is not presently active.</p></>;
  const effects = ['Growth speed', 'Ripening speed', 'Germination chance', 'Leaf production', 'Seed production', 'Harvest window', 'Peak Leaf timing', 'Seed timing', 'Extra Leaves', 'Extra Seeds'];
  return <><Heading eyebrow="Effects · quick reference" title="Cultivation Effects"/><div className="fm-effect-list">{effects.map((effect, index) => <span key={effect}><i>{['❧','◷','◌','❦','◈'][index % 5]}</i>{effect}</span>)}</div>
    <RuleList><Rule>Growth and Ripening are separate.</Rule><Rule>Timing changes when products are available; it does not create them.</Rule><Rule>Effects act prospectively, and positive and negative Effects can combine.</Rule></RuleList></>;
}

function Propagation({ side }) {
  if (side === 'left') return <><Heading eyebrow="Effects · spatial rules" title="Range & directional Budget"/><RouteDiagram/><RouteDiagram directional/>
    <RuleList><Rule>Range includes the source hex and crosses adjacent open hexes up to its distance. Alternate routes can go around obstructions.</Rule><Rule>Directional travel uses one of six headings, moves forward, then may turn or divide around an obstruction.</Rule><Rule>Every branch shares one Budget; branches do not receive fresh budgets.</Rule><Rule>Directional Fungi keep their planted heading. Directional Garden Tools can rotate later.</Rule></RuleList></>;
  return <><Heading eyebrow="Effects · delivery" title="Airborne & Waterborne"/><div className="fm-route-pair"><div><b>Airborne</b><RouteDiagram/></div><div><b>Waterborne</b><RouteDiagram water/></div></div>
    <RuleList><Rule>Airborne uses ordinary open routes and its Range or Budget.</Rule><Rule>Waterborne enters Flooded ground through its initial footprint, then follows the connected Flooded network.</Rule><Rule>Dry and Damp gaps break that network. Another flooded route may go around a Blocker.</Rule><Rule>Waterborne effects do not create their own canals. The word describes delivery, not Moisture or Mycelial ground.</Rule></RuleList></>;
}

function Blockers({ side }) {
  if (side === 'left') return <><Heading eyebrow="Effects · route control" title="Blockers"/>
    <div className="fm-blocker-forms"><div><span>⬡╱⬡</span><b>Edge</b><small>Stops matching crossings in both directions.</small></div><div><span>▣</span><b>Full Hex</b><small>Stops matching travel through the tile and adjacency across its sides.</small></div></div>
    <RuleList><Rule>Any matching filter is enough to stop an effect.</Rule><Rule>Blockers change ongoing and future reach; they do not undo elapsed results.</Rule><Rule>Routes may go around them.</Rule><Rule>Player Blockers are reusable and can move directly between valid positions.</Rule></RuleList></>;
  return <><Heading eyebrow="Effects · complete reference" title="Blocker filters"/><table className="fm-ledger"><tbody>{blockerRows.map(([name, stops]) => <tr key={name}><th>{name}</th><td>{stops}</td></tr>)}</tbody></table>
    <p className="fm-smallprint">The Grimoire's Blockers chapter records forms, illustrations, and unlocked collections.</p></>;
}

function PlantingTime({ side }) {
  if (side === 'left') return <><Heading eyebrow="Cultivation · planting" title="Seeds, Spores & staging"/>
    <div className="fm-sequence">{['Choose', 'Place', 'Revise', 'Apply'].map((step, index) => <span key={step}><i>{index + 1}</i>{step}</span>)}</div>
    <RuleList><Rule>Seeds grow Plants; Spores grow Fungi. Leaves cannot be planted.</Rule><Rule>Spending more improves germination chance up to certainty. Germination Effects alter Plant Seed attempts, not Fungus Spore attempts.</Rule><Rule>Dependent Fungi require Mycelial ground when the attempt is committed.</Rule><Rule>Proposals reserve stock. Undo reverses the latest edit; Cancel releases the plan; Apply validates the whole plan at once.</Rule><Rule>Immediate planting mode commits one attempt when its quantity is confirmed.</Rule></RuleList></>;
  return <><Heading eyebrow="Cultivation · time" title="Concealed germination"/>
    <div className="fm-germination"><span>◌<b>committed</b></span><i>···</i><span>❧<b>success · 0%</b></span><em>or</em><span>◇<b>failure · free hex</b></span></div>
    <p>Seeds or Spores are spent at commitment. Success and failure remain visually identical until reveal. A pending attempt occupies its hex, but is not alive and emits nothing. There is no refund.</p>
    <div className="fm-time-controls"><span>Ⅱ Pause</span><span>0.5×</span><span>1×</span><span>2×</span></div>
    <p>Speed changes real waiting time, not biological requirements. Direct actions still work while paused. The garden does not catch up while the game is closed.</p></>;
}

function PlantsHarvest({ side }) {
  if (side === 'left') return <><Heading eyebrow="Cultivation · Plants" title="Growth & Ripening"/><Lifecycle/>
    <RuleList><Rule>100% begins Ripening; it is not a universal best-harvest signal.</Rule><Rule>Plants have different Leaf and Seed timing. The lifecycle bar marks known windows; the Inspector shows the harvest available now.</Rule><Rule>Conditions, Mycelial ground, and Effects can change speed or output.</Rule><Rule>Production is earned under the Conditions that existed while each productive window passed.</Rule></RuleList></>;
  return <><Heading eyebrow="Cultivation · Plants" title="Harvest & hazards"/>
    <RuleList><Rule>Named Leaves are distinct products. Seeds may belong to the same species, another species, several species, or none.</Rule><Rule>Leaves can decline as Seeds rise. Extra hourly output is banked separately.</Rule><Rule>Harvesting collects current output and removes the Plant. The whole harvest must fit or the action is refused.</Rule><Rule>Continuous hazards have independent clocks and reset when their trigger ends.</Rule><Rule>Dormancy can stop progress without stopping active danger. Death loses uncollected products.</Rule></RuleList><Note>Exact productive windows, safe ranges, and hazards are species discoveries recorded in the Grimoire.</Note></>;
}

function FungiAffinity({ side }) {
  if (side === 'left') return <><Heading eyebrow="Cultivation · Fungi" title="Living sources"/><Lifecycle fungus/>
    <RuleList><Rule>Fungi can change the environment, cultivate Plants, support experiments, and produce Spores.</Rule><Rule>Emissions begin after successful germination and continue while the Fungus lives.</Rule><Rule>Harvesting collects available Spores, removes the Fungus, and ends its emissions.</Rule><Rule>Living Fungi cannot be stored or moved. Directional Fungi keep their planted heading.</Rule><Rule>Mycelord produces Mycelial ground rather than an ordinary package.</Rule></RuleList></>;
  return <><Heading eyebrow="Cultivation · Fungi" title="Mycelial affinity"/>
    <div className="fm-affinity">{[['Independent','No Mycelial ground required.'],['Preferring','Works without it; specified Effects strengthen when its own hex is Mycelial.'],['Dependent','Requires Mycelial ground to germinate; losing support begins a grace period.']].map(([name,text]) => <div key={name}><span>♧</span><b>{name}</b><p>{text}</p></div>)}</div>
    <p>Affinity describes the Fungus's own hex, not the receiving Plant's. A dependent Fungus keeps emitting during its grace period and recovers if support returns in time.</p></>;
}

function Mycelial({ side }) {
  if (side === 'left') return <><Heading eyebrow="Cultivation · living ground" title="A supported colony"/>
    <div className="fm-mycelial-map"><span className="lord">♧</span>{[0,1,2,3,4,5].map(i => <span key={i} className={`m${i}`}>⬡</span>)}</div>
    <RuleList><Rule>Mycelial is a separate living ground network. Mycelord establishes a colony.</Rule><Rule>New ground spreads gradually through supported neighbouring Mycelial hexes.</Rule><Rule>Several colonies may overlap. One surviving contribution is enough to keep a hex Mycelial.</Rule><Rule>Affinity labels refer to the Fungus source hex.</Rule></RuleList></>;
  return <><Heading eyebrow="Cultivation · living ground" title="Flooding, severing & retreat"/>
    <div className="fm-network-contrast"><span>≋ Flooded carries<br/><b>Waterborne Effects</b></span><i>but</i><span>≋ Flooded breaks<br/><b>Mycelial support</b></span></div>
    <RuleList><Rule>Flooded hexes cannot be newly colonised and cannot carry support.</Rule><Rule>Matching Blockers can stop spread and sever a route.</Rule><Rule>Unsupported contributions stop expanding and retreat gradually. Reconnection can rescue remaining ground; lost ground must regrow.</Rule><Rule>Mycelial generally slows Plant development and ordinary production. Exact species responses remain discoveries.</Rule></RuleList></>;
}

function Transformations({ side }) {
  if (side === 'left') return <><Heading eyebrow="Cultivation · changing forms" title="Transformations"/>
    <div className="fm-transformation"><span>❧</span><i>❦</i><span>❧</span></div>
    <p>A Transformation changes one living <b>Plant</b> into another. Its necessary circumstances must remain satisfied for some time.</p>
    <p>The resulting Plant begins at <b>0% Growth</b>. Successfully witnessed routes are recorded in the Cultivation Grimoire.</p>
    <Note>Fungi and Garden Tools do not transform.</Note></>;
  return <><Heading eyebrow="Cultivation · recorded knowledge" title="The Cultivation Grimoire"/>
    <div className="fm-book-comparison"><img src={art('book-launcher')} alt="Cultivation Grimoire"/><p>The Grimoire records knowledge, not ownership. Hidden Plants remain behind stable runes until they legitimately appear.</p></div>
    <RuleList><Rule>A legitimate first appearance reveals identity permanently.</Rule><Rule>Preferences, hazards, fungal responses, unusual traits, and Transformation routes require real observations.</Rule><Rule>Fungus pages, Plant pages, Garden Tools, and Blockers hold different records.</Rule><Rule>Field notes and markers are reusable and do not occupy Inventory.</Rule></RuleList></>;
}

function InventoryTools({ side }) {
  if (side === 'left') return <><Heading eyebrow="Guild · possessions" title="Inventory"/>
    <div className="fm-inventory-grid">{Array.from({length:12},(_,i)=><span key={i}>{['❧','◈','❦','♧','▧','✦','','','','','',''][i]}</span>)}</div>
    <RuleList><Rule>The Inventory is arranged into four bags of up to fifty squares as capacity expands. One square stores one identity or one individually tracked Garden Tool.</Rule><Rule>Species-specific Seeds, Spores, and Leaves are separate. Identical ordinary materials and Blockers stack; Edge and Full Hex forms remain separate.</Rule><Rule>Tools do not stack because lifetime and heading are individual.</Rule><Rule>New identities need a free square. Rearranging or filtering never changes ownership.</Rule><Rule>Harvests, purchases, and rewards validate capacity before committing. Discard is permanent; reserved planting stock must first be released.</Rule></RuleList></>;
  return <><Heading eyebrow="Guild · temporary sources" title="Garden Tools"/>
    <RuleList><Rule>Tools are temporary environmental sources, not living Fungi. They occupy a hex and apply their listed footprint immediately.</Rule><Rule>Lifetime passes only while deployed. Returning a tool to Inventory pauses its remaining lifetime.</Rule><Rule>Tools can move directly; directional tools can rotate. Neither action resets lifetime.</Rule><Rule>Expired tools disappear and free their hex.</Rule><Rule>If Inventory is full, retrieval is refused and the tool remains safely deployed.</Rule></RuleList><Note>The Grimoire records each tool's exact effect, footprint, lifetime, artwork, and unlocked collection.</Note></>;
}

function GuildProgress({ side }) {
  if (side === 'left') return <><Heading eyebrow="Guild · commerce" title="Shop & Gold"/>
    <RuleList><Rule>Named Plant Leaves can be sold for Gold. Seeds, Spores, Blockers, Garden Tools, and trophies are not sold back.</Rule><Rule>Beanstalk Seeds remain free, providing a way to begin again.</Rule><Rule>The Shop shows current prices, quantities, stock, and ownership. Transactions are all-or-nothing.</Rule><Rule>Task rewards can add Seeds, Spores, Blockers, Tools, land, Inventory upgrades, or stationery to the Shop.</Rule><Rule>Leaves sold for Gold and Leaves delivered for tasks come from the same Inventory.</Rule></RuleList></>;
  return <><Heading eyebrow="Guild · requests & growth" title="Tasks, rewards & expansion"/>
    <RuleList><Rule>Tasks are Main, Side, or Completed. Meeting objectives makes a task ready; rewards arrive only when explicitly claimed.</Rule><Rule>Deliveries consume named Leaves only when submitted. Complete rewards must fit, or the task remains unclaimed.</Rule><Rule>Up to three tasks may be pinned. Pinning changes the tracker, not whether progress counts.</Rule><Rule>Expansion adds rows or columns without changing the existing layout. Inventory upgrades add usable squares without moving stacks.</Rule><Rule>Exact prices and limits belong in the Shop.</Rule></RuleList></>;
}

function GardenControls({ side }) {
  if (side === 'left') return <><Heading eyebrow="Controls · garden" title="Direct actions"/>
    <dl className="fm-controls"><dt>Select</dt><dd>Open a hex in the Inspector.</dd><dt>Plant</dt><dd>Drag a Seed or Spore stack to a valid hex, or select the stack and then the hex.</dd><dt>Harvest</dt><dd>Drag a living Plant or Fungus into Inventory. This removes it.</dd><dt>Move</dt><dd>Drag a temporary Tool or reusable Blocker to a valid position.</dd><dt>Navigate</dt><dd>Drag ground or use middle mouse to pan; scroll to zoom.</dd><dt>Escape</dt><dd>Close supported menus, dialogs, and books.</dd></dl>
    <p className="fm-smallprint">Inventory resizing and all ordinary buttons are keyboard reachable; interactions do not rely on hover alone.</p></>;
  return <><Heading eyebrow="Controls · preferences" title="Display & planting choices"/>
    <div className="fm-definition"><b>Stage plantings before applying</b><p>Arrange several attempts before commitment. Turning it off commits one confirmed attempt immediately.</p></div>
    <div className="fm-definition"><b>Simplified hex fills</b><p>Changes terrain appearance only. It does not change Conditions or rules.</p></div>
    <div className="fm-definition"><b>Keep Inspector in front of Grimoire</b><p>Changes how surfaces overlap. It does not change time or simulation.</p></div>
    <Note>Display choices and simulation speed are interface settings, not properties of a Plant, Fungus, or hex.</Note></>;
}

function BooksSaving({ side }) {
  if (side === 'left') return <><Heading eyebrow="Controls · reference books" title="Using the books"/>
    <RuleList><Rule>Open either book from its icon beside the garden. Each remembers its last spread and view.</Rule><Rule>Select a chapter tab, use page margins, or press Left and Right Arrow while the book has focus.</Rule><Rule>Drag the tabletop to move it. View controls zoom, rotate, fit, and reset the scene. Gold cover corners also rotate it.</Rule><Rule>The inkwell adds notes; notes can move, be edited, tucked, or removed.</Rule><Rule>Page markers save spreads and can be named, written on, moved, or removed.</Rule></RuleList><Note>Notes and markers are saved with the garden and never occupy Inventory.</Note></>;
  return <><Heading eyebrow="Controls · recovery" title="Saving the garden"/>
    <div className="fm-save-flow"><span>Browser autosave</span><i>＋</i><span>.ccsave backup</span><i>→</i><span>Load anywhere supported</span></div>
    <RuleList><Rule>The browser autosave is local to that browser. Clearing site data can remove it.</Rule><Rule><b>Save Game</b> downloads a portable backup containing the garden, Inventory, plans, pending attempts, tasks, discoveries, Shop state, annotations, and deployed objects.</Rule><Rule><b>Load Game</b> validates a compatible backup before replacing the current garden.</Rule><Rule>Loading does not simulate time spent while the game was closed.</Rule><Rule><b>New garden</b> replaces progress after confirmation. Make a backup first if you may return.</Rule></RuleList></>;
}

const spreads = {
  'manual:front-matter': FrontMatter, 'manual:garden-hexes': GardenHexes, 'manual:conditions': Conditions,
  'manual:influences': Influences, 'manual:propagation': Propagation, 'manual:blockers': Blockers,
  'manual:planting-time': PlantingTime, 'manual:plants-harvest': PlantsHarvest,
  'manual:fungi-affinity': FungiAffinity, 'manual:mycelial': Mycelial, 'manual:transformations': Transformations,
  'manual:inventory-tools': InventoryTools, 'manual:guild-progress': GuildProgress,
  'manual:garden-controls': GardenControls, 'manual:books-saving': BooksSaving,
};

export default function FieldManualSpread({ entry, side, navigate }) {
  const Spread = spreads[entry.key];
  const opening = entry.key === 'manual:front-matter';
  const chapter = FIELD_MANUAL_CHAPTERS[entry.chapter];
  return <div className={`cg-page-content ${opening ? `cg-grimoire-ornament cg-chapter-${side}` : 'cg-subdued-ornament'} fm-page`}
    style={{ '--chapter-art': `url("${art(`${chapter.art}-${side}-border`)}")` }}>
    <div className="cg-page-scroll" tabIndex={0}><Spread side={side} navigate={navigate}/></div>
    <PageNumber number={entry.page + Number(side === 'right')}/>
  </div>;
}
