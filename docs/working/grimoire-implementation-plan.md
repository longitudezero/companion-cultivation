# Grimoire implementation plan

Date: 30 October 2026  
Status: Initial integration deployed; page-flow and readability follow-up implemented with automated checks complete

## Goal and working baseline

Bring the approved illustrated Grimoire into the actual Companion Cultivation game, using its real species catalog, Transformations, and saved discoveries.

The visual baseline is the latest gold-corner book: enlarged responsive pages, gilded cover ornaments, eight backing sheets per side, deliberately uneven chapter bookmarks, engraved icons and text, steady fluorescent hover lighting, and an X-only Close bookmark behind the top edge of the right page. Its placement clears the gold corner. Family bookmarks sit inward, with their icons nearest the paper.

The user's alteration list, atlas mockup, and subsequent chat decisions define the changes below. The mockup demonstrates the atlas's appearance; the family opening spread still has a text index on the left and the atlas on the right.

Implement against the game's current catalog. Plant names, fungal profiles, and transformation connections come from game data; illustrative mockup names and arrows are not a replacement catalog.

## Implementation order

### 1. Establish stable entries and prepare the artwork

- Keep a stable entry key and ordering for every catalogued Plant, including undiscovered Plants. Build page references from that complete ordering so discovering a Plant does not renumber the book.
- Add one opening overview spread for each of the six Plant families. Each overview contains the family index and Transformation Atlas.
- Preserve appropriate contents and entry views for the Fungi and general Index chapters.
- Assign each undiscovered Plant a fixed, random-looking rune label derived from its stable identity. Use a fixed rune alphabet and deterministic generation so reopening or reloading preserves the label without requiring a new save field. Rune count must not encode the real name's length.
- Use the same rune label in the index, atlas, dropdown, and entry. Show a readable page reference alongside hidden index names, such as `ᚱᛊᛏᚹᚲᛊ · p. 14`.
- Prepare the approved borders, tab artwork, icons, gold corners, atlas plaque, seed illustration, book launcher image, and logo as local web assets. Preserve transparency and the supplied artwork's appearance.

Primary targets: a small entry/page model beside the Grimoire, `src/CultivationGrimoire.jsx`, and the game's static asset directory.

### 2. Integrate the book shell, navigation, and page turns

- Present the book as an overlay over the visible garden, removing the brown demonstration backdrop. Interactions inside the book must not plant, harvest, or otherwise operate the garden underneath it.
- Opening or closing the Grimoire must preserve the simulation's running state. Maintain the current continuing-time behavior.
- Port the approved book shell, cover ornaments, thicker paper block, tab artwork, and fluorescent hover/focus treatment.
- Move the bookmarks down slightly, keeping Index nearer the bottom edge than Ingredients is to the top. Retain their varied sizes, angles, and offsets.
- Move a chapter's bookmark to the left when its first spread opens. Clicking a Plant family bookmark opens that family's overview. The family tabs provide the return path to the overview.
- Turn pages through enlarged outer margins, including blank areas inside the scrolling region; protect text, controls and scrollbar interactions. Give that border a subtle hover highlight and a visible keyboard focus state. Support keyboard arrows and touch taps.
- Preserve selection of the book's text. Page-turn handlers must ignore text-selection gestures and must not intercept links, dropdowns, or other content controls.
- Keep the full sequence of intermediate page turns for atlas links, dropdown selections, and other longer jumps. Accelerate turns as the journey gets longer; judge the timing using the complete book.
- Bind outgoing content to the moving sheet. Incoming content becomes visible as that sheet uncovers it. Keep front, back, stationary pages, and travelling bookmarks synchronized in both directions.
- Mount the outgoing front and incoming reverse before rotation; explicitly hide the unexposed print during each half-turn. Preserve the outgoing scroll position and open each new printed page at the top.
- Handle repeated input and closing during navigation consistently, without mismatched faces or stale destination content.
- Preserve reduced-motion support. Close remains an engraved X on its red bookmark, visible on hover and positioned behind the pages.

Primary targets: `src/CultivationGrimoire.jsx`, `src/grimoire.css`, and modal integration in `src/App.jsx`.

### 3. Build family overviews, the atlas, and hidden entries

- Left overview page: family title and a plain list of clickable Plant names/rune names with page references; no entry icons.
- Right overview page: a Transformation Atlas using the supplied gold-framed plaques, connected by clear directional arrows. Each plaque opens the matching entry.
- Lay out the atlas from canonical transformation relationships. Unknown Plant nodes use their fixed rune labels; known nodes show their names. Do not reveal unobserved recipe conditions or required Fungi through the diagram or tooltips.
- Size plaques around legible labels, allowing wider plaques or two lines for long names. Put small page references beneath plaques where useful. Route arrows to plaque edges and away from names.
- Stack compact branches vertically, with short arrows and repeated plaques for rejoining routes and cycles. Mark repeated plaques ↪ and keep their original entry/page identity. Keep each source and its destinations visible together; use vertical pairs on narrow pages and emphasize related arrows on hover/focus.
- Use full-color botanical borders on a chapter's opening spread and subdued monochrome borders on subsequent entry spreads. Keep the frame and page number fixed around a separate scrolling region, with top and bottom space clear of colored decorations. Increase desktop page width so outside bookmark ends can approach or slightly cross the screen edge.
- Make all Plant entries accessible from the beginning. Undiscovered entries show their rune title, the supplied seed illustration in a subdued treatment, and a short whimsical anticipation note. Their real names and undiscovered facts remain masked in visible text, tooltips, alternative text, and accessible labels.
- Select from twenty stable anticipation notes, including mildly worried variants. Named anecdotes must respect identity discovery.
- Reveal the discovered name and available Plant artwork when the garden's existing knowledge model identifies that Plant. Keep growing conditions, hazards, responses, and Transformations governed by their own observation rules.
- Keep the entry dropdown beneath each entry's description. It uses the same names, rune labels, and stable page destinations as the index and atlas.

Primary targets: `src/CultivationGrimoire.jsx`, the entry/page model, a focused atlas component, and `src/grimoire.css`.

### 4. Refine discovery-driven content, terminology, and help

- A Fungus's Transformations section lists only deduplicated destination Plant names and page links for Transformations explicitly naming that Fungus in their requirements; omit full recipe instructions. Reuse the existing reference-preview predicate and account for preparation, completion, retention, and removal requirements. Observed results alone must not reveal untried recipes.
- Fungus entries expose base Cultivation Influence immediately and omit the Observed Plant responses section. Plant-specific observations remain on Plant pages.
- Remove environmental event-log lines such as `Pumpkin — Moisture shifted to Damp` from these interaction lists. Continue describing the Fungus's own environmental influence in its profile.
- Preserve previously saved observations. Presentation changes do not require deleting historical ledger facts.
- Apply the agreed book terminology:

| Existing term | Book wording |
| --- | --- |
| Range | Area of Effect, with the radius specified |
| Budget | Spread, explained as steps shared between branches |
| Cultivation Package | Cultivation Influence |
| Habitat: Independent | Mycelial affinity: Independent |
| Transformation Recipes | Transformations |

- Use equivalent Mycelial affinity wording for Preferring and Dependent Fungi.
- Treat these as presentation labels while preserving propagation values, modes, calculations, and Waterborne continuation through connected Flooded hexes. Explain initial reach and network continuation clearly.
- Add explanatory tooltips to effect terms such as Growth speed and Ripening speed. Clicking or keyboard-activating an effect opens a glossary overlay listing all effect definitions.
- Glossary definitions explain mechanics without disclosing hidden species-specific compatibility or recipes. Distinguish Growth from Ripening, percentage changes from percentage points, and ordinary production from hourly extra production.
- Support keyboard dismissal and focus restoration. Escape closes the glossary before closing the book.
- Place one small botanical divider between Transformation entries.
- Stack facts, effects and Transformations in full-width rows. Text may overlap the subdued entry borders; retain clear insets around full-color opening art.
- Keep the developer reference view complete and read-only. Switching views must not grant discoveries, erase observations, or leak developer-only information into the player view.

Primary targets: `src/CultivationGrimoire.jsx`, `src/core/grimoire.js`, `src/core/grimoire-preview.js`, a shared effect-definition table, and Grimoire styles.

### 5. Add the launcher and logo, then verify the complete experience

- Replace the text Grimoire launcher with the supplied closed-book illustration. Provide a Grimoire tooltip, an accessible name, and a practical click/tap target.
- Add the supplied Companion Cultivation logo to the game header at a size that preserves usable garden and control space.
- Review the complete game overlay at desktop, smaller window, and phone sizes, including the longest names and largest family atlas.
- Complete the checks below before handing over the integrated change.

Primary targets: `src/App.jsx`, `src/styles.css`, Grimoire components/styles, and relevant existing tests.

## Acceptance checks

- Every family overview opens from its bookmark; the active bookmark moves left on its first spread.
- Every index link, atlas plaque, dropdown option, and page-edge control reaches the correct stable destination.
- Rune names match across all views, remain unchanged after reload, and are replaced consistently when the Plant is discovered.
- Opening the book, visiting a hidden page, reading the glossary, and toggling developer preview do not grant discoveries or alter saved knowledge.
- Observed cultivation responses appear consistently in both Plant and Fungus entries. Fungus Transformations exclude recipes in which the Fungus is merely helpful.
- Existing saves retain their observations, and page numbering remains stable as new facts are learned.
- Single turns and accelerated multi-page journeys show correct content on both faces throughout the animation. Check forward, backward, long jumps, and repeated input.
- Selecting text and using links or dropdowns never accidentally turns a page. Book interactions never operate the garden underneath.
- Close stays visible on hover, is clear of the gold corner, and remains behind the paper. Fluorescent lighting stays steady while hovered or keyboard-focused.
- The glossary is usable by mouse, keyboard, and touch, with sensible Escape behavior and focus restoration.
- Atlas names, arrows, page references, and decorative borders remain readable within the supported book sizes. The thicker stack and bookmarks fit without clipping.
- Reduced-motion preferences are respected.
- Run the relevant discovery, reference-preview, and save/migration tests, any focused navigation tests needed for the integration, and the production build.
- Complete browser visual QA of the integrated game when preview infrastructure is available. Previous standalone versions passed code checks, but their browser visual QA was unavailable; that limitation is not a visual pass.

## Review milestones

1. Integrated book shell and corrected navigation/page-turn behavior, using stable entries.
2. Family indexes, framed atlases, rune names, and hidden/discovered entry states.
3. Fungus content rules, terminology, glossary, launcher/logo, and final validation.

Tune animation pace and atlas spacing through these reviews while preserving the agreed interactions.

## Current implementation references

- [Game Grimoire component](https://github.com/longitudezero/companion-cultivation/blob/main/src/CultivationGrimoire.jsx)
- [Grimoire styles](https://github.com/longitudezero/companion-cultivation/blob/main/src/grimoire.css)
- [Saved discovery model](https://github.com/longitudezero/companion-cultivation/blob/main/src/core/grimoire.js)
- [Read-only catalog preview and existing named-Fungus recipe filter](https://github.com/longitudezero/companion-cultivation/blob/main/src/core/grimoire-preview.js)
- [Application header and book integration](https://github.com/longitudezero/companion-cultivation/blob/main/src/App.jsx)
