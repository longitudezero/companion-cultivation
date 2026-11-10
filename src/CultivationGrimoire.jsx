import React, { useCallback, useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react';
import { createGrimoire } from './core/grimoire.js';
import { BOOK_ENTRIES, CHAPTERS, bookNavigation, initialNavigation, stationaryPages, turningPages, tabIsLeft } from './grimoire/book.js';
import { EFFECT_DEFINITIONS } from './grimoire/effects.js';
import { art, bookmarkStyle } from './grimoire/art.js';
import BookSpread from './grimoire/BookSpread.jsx';
import { createJournal, normalizeJournal, pageNotes, removeNote, markPage, MARKER_LIMIT } from './core/journal.js';
import { stationeryArt } from './grimoire/stationery-art.js';
import { GrimoireNote, PersonalBookmarks, StationeryDesk, StaticPageNotes, NoteDeleteDialog } from './grimoire/Stationery.jsx';
import MarkerTool from './grimoire/MarkerTool.jsx';
import TableStationery from './grimoire/TableStationery.jsx';
import { TurningPersonalMarkers } from './grimoire/PageMarkers.jsx';
import { travellingMarkers, layoutPageMarkers } from './grimoire/stationery-model.js';
import { BookCoordinates, BookViewControls, useBookCoordinates, useBookView } from './grimoire/BookView.jsx';
import { pageMarginHit, TABLETOP_STYLE } from './grimoire/book-view.js';
import './grimoire.css';
import './stationery.css';
import './stationery-refinements.css';
import './book-tabletop.css';

const EMPTY_LEDGER = createGrimoire();
const reducedMotionQuery = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)');

function Marks({ chapter }) {
  const marks = <><img className="cg-tab-icon" src={art(`icons/${chapter.art}`)} alt="" draggable="false"/>
    <span className="cg-tab-label">{chapter.label}</span></>;
  return <span className="cg-tab-content" aria-hidden="true"><span className="cg-pressed-mark">
    {marks}<span className="cg-glow-mark">{marks}</span>
  </span></span>;
}

function TurningBookmark({ chapter, index }) {
  return <div className="cg-turn-bookmark" style={bookmarkStyle(chapter, index)}>
    <div className="cg-bookmark-face front"><Marks chapter={chapter}/></div>
    <div className="cg-bookmark-face back"><Marks chapter={chapter}/></div>
  </div>;
}

export function TurningLeaf({ turn, duration, page, movingTabs, movingMarkers = [], onFinish }) {
  const leaf = useRef(null);
  const faces = turningPages(turn);
  useLayoutEffect(() => {
    const front = leaf.current?.querySelector('.cg-turn-face.front .cg-page-scroll');
    if (front) front.scrollTop = turn.outgoingScroll || 0;
  }, [turn.id, turn.outgoingScroll]);
  return <div ref={leaf} className={`cg-turn-leaf ${turn.to > turn.from ? 'forward' : 'backward'} turning`}
    style={{ '--turn-duration': `${duration}ms` }} aria-hidden="true" inert
    onAnimationEnd={event => { if (event.target === event.currentTarget) onFinish(turn.id); }}>
    {Object.entries(faces).map(([face, { index, side }]) => <div key={face} className={`cg-turn-face ${face}`}
      data-printed-page={BOOK_ENTRIES[index].page + (side === 'right' ? 1 : 0)} data-page-side={side}>{page(index, side)}</div>)}
    <div className="cg-turn-bookmarks">{movingTabs.map(index => <TurningBookmark key={index} chapter={CHAPTERS[index]} index={index}/>)}</div>
    <TurningPersonalMarkers markers={movingMarkers} turn={turn}/>
  </div>;
}

function PageSurface({ side, disabled, busy, onTurn, children }) {
  const edge = useRef(null), pointer = useRef(null), dragged = useRef(false);
  const coordinates = useBookCoordinates();
  const [hovered, setHovered] = useState(false);
  const protectedTarget = event => {
    if (event.target.closest('button, select, input, textarea, a, label, p, h1, h2, h3, .cg-eyebrow, .cg-small, .cg-plate, .cg-page-number, .cg-atlas')) return true;
    const scroll = event.target.closest('.cg-page-scroll');
    if (!scroll) return false;
    const book = edge.current.closest('.cg-book');
    let left = 0;
    for (let node = scroll; node && node !== book; node = node.offsetParent) left += node.offsetLeft;
    return coordinates.point(event, book).x >= left + scroll.clientWidth;
  };
  const inMargin = event => {
    const book = edge.current?.closest('.cg-book');
    return book && pageMarginHit(coordinates.point(event, book), side, coordinates.size(book), edge.current.offsetWidth || coordinates.size(book).width * .175);
  };
  const turn = event => {
    if (disabled || (event.detail > 0 && dragged.current)) return;
    onTurn();
  };
  return <article className={`cg-page ${side}`} aria-label={side === 'left' ? 'Left page' : 'Right page'} inert={busy}
    onPointerMove={event => {
      if (pointer.current && Math.hypot(event.clientX - pointer.current.x, event.clientY - pointer.current.y) > 5) dragged.current = true;
      setHovered(!disabled && inMargin(event) && !protectedTarget(event));
    }}
    onPointerLeave={() => setHovered(false)}
    onPointerDown={event => { pointer.current = { x: event.clientX, y: event.clientY }; dragged.current = false; }}
    onPointerUp={event => {
      if (pointer.current) dragged.current ||= Math.hypot(event.clientX - pointer.current.x, event.clientY - pointer.current.y) > 5;
      pointer.current = null;
    }}
    onPointerCancel={() => { pointer.current = null; dragged.current = true; }}
    onClick={event => { if (inMargin(event) && !protectedTarget(event)) turn(event); }}>
    <button ref={edge} type="button" className={`cg-page-edge ${side}${hovered ? ' hovered' : ''}`} disabled={disabled}
      aria-label={side === 'left' ? 'Previous spread' : 'Next spread'}
      title={side === 'left' ? 'Previous spread (left arrow)' : 'Next spread (right arrow)'}
      onClick={event => { event.stopPropagation(); turn(event); }}><span aria-hidden="true"/></button>
    {children}
  </article>;
}

export default function CultivationGrimoire({ garden, onClose, developerTools = false, initialEntryKey = null, onJournalChange, onOpenShop, onModalChange, suspended = false, entryRequest = 0, onEntryChange }) {
  const root = useRef(null), closeRef = useRef(null), glossaryClose = useRef(null), termRef = useRef(null);
  const active = useRef(true);
  const previousRequest = useRef(entryRequest);
  const bookRef = useRef(null);
  const previousGlossary = useRef(null);
  const [previewRequested, setPreviewRequested] = useState(false);
  const preview = developerTools && previewRequested;
  const [glossary, setGlossary] = useState(null);
  const [desk, setDesk] = useState(null);
  const [tuckedNotes, setTuckedNotes] = useState(() => new Set());
  const [frontNote, setFrontNote] = useState(null);
  const [pageSize, setPageSize] = useState(null), [pendingDelete, setPendingDelete] = useState(null), [stationeryIssue, setStationeryIssue] = useState('');
  const modal = Boolean(glossary || desk || pendingDelete);
  const [reduced, setReduced] = useState(() => Boolean(reducedMotionQuery()?.matches));
  const [nav, dispatch] = useReducer(bookNavigation, initialEntryKey, key => {
    const index = BOOK_ENTRIES.findIndex(entry => entry.key === key);
    return index < 0 ? initialNavigation : { ...initialNavigation, current: index, target: index };
  });
  const ledger = garden.grimoire || EMPTY_LEDGER;
  const journal = garden.journal?.version === 4 ? garden.journal : normalizeJournal(garden.journal);
  const busy = Boolean(nav.turn) || nav.current !== nav.target;
  const scene = useBookView(root, modal || suspended || busy);
  const current = BOOK_ENTRIES[nav.current], turn = nav.turn;
  const currentNotes = pageNotes(journal, current.key).map(note => ({ ...note, tucked: tuckedNotes.has(note.id) }));
  const toggleTuck = id => setTuckedNotes(previous => { const next = new Set(previous); if (!next.delete(id)) next.add(id); return next; });
  const hasTuckedNote = currentNotes.some(note => note.tucked);
  const hasBottomMarkers = journal.bookmarks.some(marker => marker.edge === 'bottom');
  const dockIndices = new Map(), dockCounts = { left: 0, right: 0 };
  for (const note of currentNotes) if (note.tucked) dockIndices.set(note.id, dockCounts[note.side]++);
  const markerPositions = layoutPageMarkers(journal.bookmarks, current);
  const movingMarkers = travellingMarkers(journal.bookmarks, turn)
    .map(marker => ({ ...marker, displayX: markerPositions.get(marker.slot) }));
  const movingTabs = turn ? CHAPTERS.map((_, index) => index).filter(index =>
    tabIsLeft(index, BOOK_ENTRIES[turn.from]) !== tabIsLeft(index, BOOK_ENTRIES[turn.to])) : [];
  const stationary = stationaryPages(nav.current, turn);
  const viewLedger = turn?.ledger || ledger, viewPreview = turn ? turn.preview : preview;

  const navigate = useCallback(key => {
    const to = BOOK_ENTRIES.findIndex(entry => entry.key === key);
    window.getSelection()?.removeAllRanges();
    dispatch({ type: 'navigate', to, reduced: Boolean(reducedMotionQuery()?.matches) });
  }, []);
  useEffect(() => { onEntryChange?.(BOOK_ENTRIES[nav.target].key); }, [nav.target, onEntryChange]);
  useEffect(() => {
    if (previousRequest.current === entryRequest) return;
    previousRequest.current = entryRequest;
    if (initialEntryKey) navigate(initialEntryKey);
    if (!suspended) closeRef.current?.focus({ preventScroll: true });
  }, [entryRequest, initialEntryKey, navigate, suspended]);
  useLayoutEffect(() => { setTuckedNotes(new Set()); }, [nav.current]);
  const openGlossary = useCallback((kind, element) => { termRef.current = element; setGlossary(kind); }, []);
  useLayoutEffect(() => {
    const measure = () => { const book = bookRef.current;
      if (book) { const size = scene.coordinates.size(book);
        setPageSize(previous => previous?.width === size.width / 2 && previous?.height === size.height
          ? previous : { width: size.width / 2, height: size.height }); } };
    measure();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (bookRef.current) observer?.observe(bookRef.current);
    window.addEventListener('resize', measure);
    return () => { observer?.disconnect(); window.removeEventListener('resize', measure); };
  }, []);
  function dropMarker(drop) {
    if (journal.bookmarks.some(marker => marker.edge === drop.edge && marker.position === drop.position)) {
      setStationeryIssue(`${drop.edge === 'top' ? 'Top' : 'Bottom'} position ${drop.position + 1} is reserved. Move or remove its marker first.`); return;
    }
    if (!journal.markers.length) { setDesk({ tab: 'markers', side: 'right', drop }); return; }
    const slot = Array.from({ length: MARKER_LIMIT }, (_, index) => index).find(index => !journal.bookmarks.some(marker => marker.slot === index));
    try {
      if (onJournalChange(garden => markPage(garden, current.key, drop.side, journal.markers[0], null, drop)) !== false) {
        setStationeryIssue(''); setDesk({ tab: 'markers', side: drop.side, markerSlot: slot });
      }
    } catch (issue) { setStationeryIssue(issue.message); setDesk({ tab: 'markers', side: drop.side, drop }); }
  }

  useEffect(() => {
    const query = reducedMotionQuery();
    if (!query) return undefined;
    const change = event => setReduced(event.matches);
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);

  useEffect(() => {
    if (reduced && (turn || nav.current !== nav.target)) dispatch({ type: 'settle' });
    else if (!turn && nav.current !== nav.target) {
      const side = nav.target > nav.current ? 'right' : 'left';
      const outgoingScroll = root.current?.querySelector(`.cg-page.${side} .cg-page-scroll`)?.scrollTop || 0;
      dispatch({ type: 'begin', ledger, preview, outgoingScroll });
    }
  }, [nav.current, nav.target, turn, ledger, preview, reduced]);

  useEffect(() => {
    if (!turn) return undefined;
    const timer = window.setTimeout(() => dispatch({ type: 'finish', id: turn.id }), nav.duration + 150);
    return () => window.clearTimeout(timer);
  }, [turn, nav.duration]);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const scope = root.current;
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      if (previousFocus?.isConnected && (scope?.contains(document.activeElement) || document.activeElement === document.body)) previousFocus.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const activity = event => { active.current = Boolean(root.current?.contains(event.target)); };
    document.addEventListener('pointerdown', activity, true);
    document.addEventListener('focusin', activity, true);
    return () => {
      document.removeEventListener('pointerdown', activity, true);
      document.removeEventListener('focusin', activity, true);
    };
  }, []);
  useLayoutEffect(() => {
    onModalChange?.(modal);
    return () => onModalChange?.(false);
  }, [modal, onModalChange]);

  useEffect(() => {
    if (glossary) {
      glossaryClose.current?.focus({ preventScroll: true });
      const selected = root.current?.querySelector(`[data-glossary-kind="${glossary}"]`);
      selected?.scrollIntoView?.({ block: 'nearest' });
    } else if (previousGlossary.current && termRef.current?.isConnected) termRef.current.focus({ preventScroll: true });
    previousGlossary.current = glossary;
  }, [glossary]);

  useEffect(() => {
    const onKey = event => {
      if (suspended || event.defaultPrevented || (!modal && !active.current)) return;
      if (event.key === 'Escape') {
        event.preventDefault(); event.stopPropagation();
        if (pendingDelete) setPendingDelete(null); else if (desk) setDesk(null); else if (glossary) setGlossary(null); else onClose();
        return;
      }
      if (event.key === 'Tab') {
        if (!modal) return;
        const scope = root.current?.querySelector('.cg-note-confirm, .cg-stationery-desk, .cg-glossary');
        const controls = [...(scope?.querySelectorAll('button:not(:disabled), select:not(:disabled), input:not(:disabled), textarea:not(:disabled), [href], [tabindex="0"]') || [])]
          .filter(element => !element.closest('[inert], [aria-hidden="true"]') && element.getClientRects().length > 0);
        const first = controls[0], last = controls.at(-1);
        if (event.shiftKey && (document.activeElement === first || !scope?.contains(document.activeElement))) {
          event.preventDefault(); last?.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !scope?.contains(document.activeElement))) {
          event.preventDefault(); first?.focus();
        }
        return;
      }
      if (busy || glossary || desk || pendingDelete || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey
        || ['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement?.tagName)
        || document.activeElement?.isContentEditable) return;
      if (event.key === 'ArrowRight' && nav.current < BOOK_ENTRIES.length - 1) {
        event.preventDefault(); navigate(BOOK_ENTRIES[nav.current + 1].key);
      } else if (event.key === 'ArrowLeft' && nav.current > 0) {
        event.preventDefault(); navigate(BOOK_ENTRIES[nav.current - 1].key);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [busy, glossary, desk, pendingDelete, modal, suspended, nav.current, navigate, onClose]);

  const page = (index, side) => <React.Fragment key={`${index}-${side}`}><BookSpread entry={BOOK_ENTRIES[index]} side={side} ledger={viewLedger}
    preview={viewPreview} navigate={navigate} glossary={openGlossary}/>
    {busy && <StaticPageNotes journal={journal} entryKey={BOOK_ENTRIES[index].key} side={side} pageSize={pageSize}/>}</React.Fragment>;

  return <BookCoordinates.Provider value={scene.coordinates}><div ref={root} className={`cg-overlay cg-tabletop${modal ? ' has-modal' : ''}`} role="dialog" aria-modal="false" aria-label="Cultivation Grimoire"
    tabIndex={-1} inert={suspended} aria-hidden={suspended || undefined}
    onPointerDownCapture={event => {
      if (suspended) return;
      const control = event.target.closest('button, input, select, textarea, [href], [tabindex]:not([tabindex="-1"])');
      (control || root.current)?.focus({ preventScroll: true });
    }}
    onPointerDown={event => event.stopPropagation()} onClick={event => event.stopPropagation()} onWheel={event => event.stopPropagation()}>
    <div className="cg-scene" aria-label="Book tabletop">
      <div className="cg-shell" style={{ ...TABLETOP_STYLE, transform: scene.transform }} inert={Boolean(glossary || desk || pendingDelete)}>
        <div className="cg-table-surface" {...scene.panHandlers} aria-label="Drag tabletop"/>
        <img className="cg-table-art" src={stationeryArt('cultivation-tabletop.webp')} alt="" draggable="false"/>
        <TableStationery>
          <button type="button" disabled={busy} className="cg-inkwell" aria-label="Write a Grimoire note" title="Write a Grimoire note"
            onClick={() => setDesk({ tab: 'notes', side: 'right' })}>
            <img src={stationeryArt('inkwell.webp')} alt="" draggable="false"/><span>Field notes</span></button>
          <MarkerTool bookRef={bookRef} journal={journal} busy={busy} styleId={journal.markers[0] || 'forest-tassel'}
            onClick={() => setDesk({ tab: 'markers', side: 'right' })} onDrop={dropMarker}/>
        </TableStationery>
        <div className={`cg-book-stage${hasTuckedNote ? ' has-tucked-note' : ''}${hasBottomMarkers ? ' has-bottom-markers' : ''}`}><div ref={bookRef} className={`cg-book${journal.bookmarks.length ? ' has-personal-markers' : ''}`}>
          <div className="cg-cover">{['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(corner =>
            <button key={corner} type="button" className={`cg-cover-corner ${corner}`} aria-label={`Rotate book from ${corner} cover corner`}
              title="Drag the gold corner to rotate the table and book together" disabled={busy} {...scene.rotationHandlers}
              onKeyDown={event => { if (['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); event.stopPropagation(); scene.rotate(event.key === 'ArrowLeft' ? -5 : 5); } }}>
              <img src={art(`corners/${corner}`)} alt="" draggable="false"/></button>)}</div>
          {Array.from({ length: 8 }, (_, i) => 8 - i).flatMap(depth => ['left', 'right'].map(side =>
            <div key={`${depth}-${side}`} className={`cg-under-sheet ${side}`} aria-hidden="true"
              style={{ '--sheet-depth': depth }}/>))}
          <PersonalBookmarks journal={journal} ledger={ledger} current={current} busy={busy} reduced={reduced} navigate={navigate}
            movingMarkers={movingMarkers} onChange={onJournalChange} onIssue={setStationeryIssue}
            onEdit={marker => setDesk({ tab: 'markers', side: marker.side, markerSlot: marker.slot })}/>
          <nav className="cg-tabs" aria-label="Grimoire sections">{CHAPTERS.map((chapter, index) => {
            const destination = BOOK_ENTRIES.find(entry => entry.chapter === index);
            return <button key={chapter.key} type="button"
              className={`cg-tab ${tabIsLeft(index, current) ? 'left' : 'right'} ${movingTabs.includes(index) ? 'travelling' : ''}`}
              style={bookmarkStyle(chapter, index)} disabled={busy}
              aria-current={current.chapter === index ? 'page' : undefined} title={chapter.label}
              aria-label={`Open ${chapter.label} section`} onClick={() => navigate(destination.key)}>
              <Marks chapter={chapter}/>
            </button>;
          })}</nav>
          <PageSurface side="left" busy={busy} disabled={busy || nav.current === 0} onTurn={() => navigate(BOOK_ENTRIES[nav.current - 1].key)}>
            {page(stationary.left, 'left')}
          </PageSurface>
          <PageSurface side="right" busy={busy} disabled={busy || nav.current === BOOK_ENTRIES.length - 1} onTurn={() => navigate(BOOK_ENTRIES[nav.current + 1].key)}>
            {page(stationary.right, 'right')}
          </PageSurface>
          <div className="cg-spine" aria-hidden="true"/>
          <div className={`cg-note-layer${busy ? ' is-turning' : ''}`} inert={busy} aria-hidden={busy || undefined}>
            {currentNotes.map((note, index) => <GrimoireNote key={note.id}
              note={note} entry={current} pageSize={pageSize} onChange={onJournalChange} onFront={setFrontNote} onDelete={setPendingDelete}
              onToggleTuck={() => toggleTuck(note.id)} onUntuck={() => setTuckedNotes(previous => { const next = new Set(previous); next.delete(note.id); return next; })}
              zIndex={frontNote === note.id ? currentNotes.length + 1 : index + 1}
              dockIndex={dockIndices.get(note.id) || 0}
              onEdit={() => setDesk({ tab: 'notes', side: note.side, noteId: note.id })}/>)}</div>
          {turn && <TurningLeaf key={turn.id} turn={turn} duration={nav.duration} page={page} movingTabs={movingTabs} movingMarkers={movingMarkers}
            onFinish={id => dispatch({ type: 'finish', id })}/>}
          <button ref={closeRef} type="button" className="cg-close-tab" aria-label="Close Grimoire" title="Close Grimoire (Escape)" onClick={onClose}>
            <span className="cg-close-glyph" aria-hidden="true"><img className="cg-close-icon" src={art('icons/close')} alt="" draggable="false"/>
              <img className="cg-close-icon-glow" src={art('icons/close')} alt="" draggable="false"/></span>
          </button>
        </div></div>
      </div>
      <div className="cg-sr-only" aria-live="polite" aria-atomic="true">{CHAPTERS[current.chapter].label} · pages {current.page}–{current.page + 1}{busy ? ' · Turning pages' : ''}</div>
    </div>
    <BookViewControls scene={scene} disabled={Boolean(glossary || desk || pendingDelete || busy)}/>
    {developerTools && <div className="cg-preview-tools cg-fixed-preview">
      <button type="button" disabled={busy} aria-pressed={preview}
        onClick={() => setPreviewRequested(value => !value)}>{preview ? 'Return to discoveries' : 'Preview full Grimoire'}</button>
      <span>{preview ? 'Developer reference · Read only' : 'Garden discoveries'}</span>
    </div>}
    {stationeryIssue && <p className="cg-stationery-issue" role="status">{stationeryIssue}</p>}
    {desk && <StationeryDesk garden={garden} entry={current} ledger={ledger} initialTab={desk.tab} initialSide={desk.side} initialNoteId={desk.noteId} initialMarkerSlot={desk.markerSlot} initialDrop={desk.drop}
      tuckedNotes={tuckedNotes} onToggleTuck={toggleTuck}
      onChange={onJournalChange} onClose={() => setDesk(null)}
      onShop={category => { setDesk(null); onOpenShop(category, current.key); }}
    />}
    {pendingDelete && journal.notes[pendingDelete] && <NoteDeleteDialog note={journal.notes[pendingDelete]} onCancel={() => setPendingDelete(null)}
      onConfirm={() => { onJournalChange(garden => removeNote(garden, pendingDelete)); setPendingDelete(null); }}/>}
    {glossary && <div className="cg-glossary-backdrop"><section className="cg-glossary" role="dialog" aria-modal="true"
      aria-labelledby="cg-glossary-title">
      <header><div><span className="cg-eyebrow">A botanist’s reference</span><h2 id="cg-glossary-title">Cultivation Effects</h2></div>
        <button ref={glossaryClose} type="button" onClick={() => setGlossary(null)} aria-label="Close effect glossary">×</button></header>
      <p className="cg-glossary-intro">How the influences work. Each Plant’s individual responses are learned in the garden.</p>
      <div className="cg-glossary-entries">{Object.entries(EFFECT_DEFINITIONS).map(([kind, effect]) =>
        <section key={kind} data-glossary-kind={kind} className={glossary === kind ? 'selected' : ''}>
          <h3>{effect.label}</h3><p>{effect.summary}</p><p>{effect.detail}</p>
        </section>)}</div>
    </section></div>}
  </div></BookCoordinates.Provider>;
}
