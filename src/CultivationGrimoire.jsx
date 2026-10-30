import React, { useCallback, useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react';
import { createGrimoire } from './core/grimoire.js';
import { BOOK_ENTRIES, CHAPTERS, bookNavigation, initialNavigation, stationaryPages, turningPages, tabIsLeft } from './grimoire/book.js';
import { EFFECT_DEFINITIONS } from './grimoire/effects.js';
import { art, bookmarkStyle } from './grimoire/art.js';
import BookSpread from './grimoire/BookSpread.jsx';
import './grimoire.css';

const EMPTY_LEDGER = createGrimoire();
const SHEET_TONES = ['#eee3cf', '#e4d6bd', '#f0e6d3', '#dfd1b8', '#ebe0ca', '#ddceb4', '#e8dcc5', '#d7c7ad'];
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

export function TurningLeaf({ turn, duration, page, movingTabs, onFinish }) {
  const leaf = useRef(null);
  const faces = turningPages(turn);
  useLayoutEffect(() => {
    const front = leaf.current?.querySelector('.cg-turn-face.front .cg-page-content');
    if (front) front.scrollTop = turn.outgoingScroll || 0;
  }, [turn.id, turn.outgoingScroll]);
  return <div ref={leaf} className={`cg-turn-leaf ${turn.to > turn.from ? 'forward' : 'backward'} turning`}
    style={{ '--turn-duration': `${duration}ms` }} aria-hidden="true" inert
    onAnimationEnd={event => { if (event.target === event.currentTarget) onFinish(turn.id); }}>
    {Object.entries(faces).map(([face, { index, side }]) => <div key={face} className={`cg-turn-face ${face}`}
      data-printed-page={BOOK_ENTRIES[index].page + (side === 'right' ? 1 : 0)}>{page(index, side)}</div>)}
    <div className="cg-turn-bookmarks">{movingTabs.map(index => <TurningBookmark key={index} chapter={CHAPTERS[index]} index={index}/>)}</div>
  </div>;
}

function PageEdge({ side, disabled, onTurn }) {
  const pointer = useRef(null), dragged = useRef(false);
  return <button type="button" className={`cg-page-edge ${side}`} disabled={disabled}
    aria-label={side === 'left' ? 'Previous spread' : 'Next spread'}
    title={side === 'left' ? 'Previous spread (left arrow)' : 'Next spread (right arrow)'}
    onPointerDown={event => { pointer.current = { x: event.clientX, y: event.clientY }; dragged.current = false; }}
    onPointerUp={event => {
      if (pointer.current) dragged.current = Math.hypot(event.clientX - pointer.current.x, event.clientY - pointer.current.y) > 5;
      pointer.current = null;
    }}
    onPointerCancel={() => { pointer.current = null; dragged.current = true; }}
    onClick={event => {
      if (event.detail > 0 && dragged.current) return;
      if (window.getSelection()?.isCollapsed === false) return;
      onTurn();
    }}><span aria-hidden="true"/></button>;
}

export default function CultivationGrimoire({ garden, onClose, developerTools = false }) {
  const root = useRef(null), closeRef = useRef(null), glossaryClose = useRef(null), termRef = useRef(null);
  const previousGlossary = useRef(null);
  const [previewRequested, setPreviewRequested] = useState(false);
  const preview = developerTools && previewRequested;
  const [glossary, setGlossary] = useState(null);
  const [reduced, setReduced] = useState(() => Boolean(reducedMotionQuery()?.matches));
  const [nav, dispatch] = useReducer(bookNavigation, initialNavigation);
  const ledger = garden.grimoire || EMPTY_LEDGER;
  const busy = Boolean(nav.turn) || nav.current !== nav.target;
  const current = BOOK_ENTRIES[nav.current], turn = nav.turn;
  const movingTabs = turn ? CHAPTERS.map((_, index) => index).filter(index =>
    tabIsLeft(index, BOOK_ENTRIES[turn.from]) !== tabIsLeft(index, BOOK_ENTRIES[turn.to])) : [];
  const stationary = stationaryPages(nav.current, turn);
  const viewLedger = turn?.ledger || ledger, viewPreview = turn ? turn.preview : preview;

  const navigate = useCallback(key => {
    const to = BOOK_ENTRIES.findIndex(entry => entry.key === key);
    dispatch({ type: 'navigate', to, reduced: Boolean(reducedMotionQuery()?.matches) });
  }, []);
  const openGlossary = useCallback((kind, element) => { termRef.current = element; setGlossary(kind); }, []);

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
      const outgoingScroll = root.current?.querySelector(`.cg-page.${side} .cg-page-content`)?.scrollTop || 0;
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
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = overflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);

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
      if (event.key === 'Escape') {
        event.preventDefault();
        if (glossary) setGlossary(null); else onClose();
        return;
      }
      if (event.key === 'Tab') {
        const controls = [...(root.current?.querySelectorAll('button:not(:disabled), select:not(:disabled), [href], [tabindex="0"]') || [])]
          .filter(element => !element.closest('[inert], [aria-hidden="true"]') && element.getClientRects().length > 0);
        const first = controls[0], last = controls.at(-1);
        if (event.shiftKey && (document.activeElement === first || !root.current?.contains(document.activeElement))) {
          event.preventDefault(); last?.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !root.current?.contains(document.activeElement))) {
          event.preventDefault(); first?.focus();
        }
        return;
      }
      if (busy || glossary || event.ctrlKey || event.metaKey || event.altKey
        || ['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement?.tagName)
        || document.activeElement?.isContentEditable || window.getSelection()?.isCollapsed === false) return;
      if (event.key === 'ArrowRight' && nav.current < BOOK_ENTRIES.length - 1) {
        event.preventDefault(); navigate(BOOK_ENTRIES[nav.current + 1].key);
      } else if (event.key === 'ArrowLeft' && nav.current > 0) {
        event.preventDefault(); navigate(BOOK_ENTRIES[nav.current - 1].key);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [busy, glossary, nav.current, navigate, onClose]);

  const page = (index, side) => <BookSpread key={`${index}-${side}`} entry={BOOK_ENTRIES[index]} side={side} ledger={viewLedger}
    preview={viewPreview} navigate={navigate} glossary={openGlossary}/>;

  return <div ref={root} className="cg-overlay" role="dialog" aria-modal="true" aria-label="Cultivation Grimoire"
    onPointerDown={event => event.stopPropagation()} onClick={event => event.stopPropagation()} onWheel={event => event.stopPropagation()}>
    <div className="cg-scene">
      <div className="cg-shell" inert={Boolean(glossary)}>
        {developerTools && <div className="cg-preview-tools">
          <button type="button" disabled={busy} aria-pressed={preview}
            onClick={() => setPreviewRequested(value => !value)}>{preview ? 'Return to discoveries' : 'Preview full Grimoire'}</button>
          <span>{preview ? 'Developer reference · Read only' : 'Garden discoveries'}</span>
        </div>}
        <div className="cg-book-stage"><div className="cg-book">
          <div className="cg-cover" aria-hidden="true">{['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(corner =>
            <img key={corner} className={`cg-cover-corner ${corner}`} src={art(`corners/${corner}`)} alt="" draggable="false"/>)}</div>
          {Array.from({ length: 8 }, (_, i) => 8 - i).flatMap(depth => ['left', 'right'].map(side =>
            <div key={`${depth}-${side}`} className={`cg-under-sheet ${side}`} aria-hidden="true"
              style={{ '--sheet-depth': depth, '--sheet-tone': SHEET_TONES[depth - 1] }}/>))}
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
          <article className="cg-page left" aria-label="Left page" inert={busy}>
            <PageEdge side="left" disabled={busy || nav.current === 0} onTurn={() => navigate(BOOK_ENTRIES[nav.current - 1].key)}/>
            {page(stationary.left, 'left')}
          </article>
          <article className="cg-page right" aria-label="Right page" inert={busy}>
            <PageEdge side="right" disabled={busy || nav.current === BOOK_ENTRIES.length - 1} onTurn={() => navigate(BOOK_ENTRIES[nav.current + 1].key)}/>
            {page(stationary.right, 'right')}
          </article>
          <div className="cg-spine" aria-hidden="true"/>
          {turn && <TurningLeaf key={turn.id} turn={turn} duration={nav.duration} page={page} movingTabs={movingTabs}
            onFinish={id => dispatch({ type: 'finish', id })}/>}
          <button ref={closeRef} type="button" className="cg-close-tab" aria-label="Close Grimoire" title="Close Grimoire (Escape)" onClick={onClose}>
            <span className="cg-close-glyph" aria-hidden="true"><img className="cg-close-icon" src={art('icons/close')} alt="" draggable="false"/>
              <img className="cg-close-icon-glow" src={art('icons/close')} alt="" draggable="false"/></span>
          </button>
        </div></div>
      </div>
      <div className="cg-sr-only" aria-live="polite" aria-atomic="true">{CHAPTERS[current.chapter].label} · pages {current.page}–{current.page + 1}{busy ? ' · Turning pages' : ''}</div>
    </div>
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
  </div>;
}
