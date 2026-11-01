import React, { useEffect, useRef } from 'react';
import { art } from '../grimoire/art.js';
import { CornerOrnaments } from './GameArt.jsx';
import { GoldVine } from './GoldVines.jsx';
import GuildBackButton from './GuildBackButton.jsx';

export function MainMenuIcon() {
  return <svg className="main-menu-icon" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <defs><linearGradient id="menu-gold" x2="0" y2="1"><stop stopColor="#fff0b7"/><stop offset=".5" stopColor="#c79a41"/><stop offset="1" stopColor="#f0ce78"/></linearGradient></defs>
    <rect x="5" y="5" width="54" height="54" rx="15" fill="#21432e" stroke="url(#menu-gold)" strokeWidth="3"/>
    <rect x="9" y="9" width="46" height="46" rx="11" fill="none" stroke="#8d793e"/>
    <path d="M21 23h22M21 32h22M21 41h22" stroke="url(#menu-gold)" strokeWidth="4" strokeLinecap="round"/>
    <path d="M32 6q-8 7 0 12q8-5 0-12M32 58q-8-7 0-12q8 5 0 12" fill="url(#menu-gold)"/>
  </svg>;
}

export default function MainMenu({ onClose, onNewGarden, onLoad, onSave, onDeveloperToggle,
  developerTools, stagingEnabled, onStagingChange, stagedCount, onGuide, autosaveStatus, elapsed, onAdvance }) {
  const modal = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    modal.current.showModal();
    return () => { modal.current?.close(); if (previous?.isConnected) previous.focus(); };
  }, []);
  return <dialog ref={modal} className="main-menu" aria-label="Main menu" onCancel={event => { event.preventDefault(); onClose(); }}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="main-menu-content">
      <CornerOrnaments/>
      <GoldVine className="menu-vine"/>
      <h1><img src={art('game-logo')} alt="Companion Cultivation" draggable="false"/></h1>
      <GuildBackButton onClick={onClose}/>
      <div className="main-menu-actions">
        <button onClick={onNewGarden}>New garden</button>
        <button onClick={onLoad}>Load Game</button>
        <button onClick={onSave}>Save Game</button>
        <button aria-pressed={developerTools} onClick={onDeveloperToggle}>{developerTools ? 'Hide developer tools' : 'Display developer tools'}</button>
      </div>
      <div className="staging-setting">
        <label><span>Stage plantings before applying</span><input type="checkbox" checked={stagingEnabled} disabled={stagedCount > 0}
          onChange={event => onStagingChange(event.target.checked)} aria-describedby="staging-setting-help"/></label>
        <p id="staging-setting-help">{stagedCount > 0 ? 'Apply or cancel your current plan before turning staging off.'
          : stagingEnabled ? 'Plan several plantings, then Apply them together.' : 'Confirm an amount to plant immediately. Germination takes its usual time.'}</p>
      </div>
      <div className="menu-garden-status"><span>{elapsed} elapsed</span><span role="status">{autosaveStatus}</span></div>
      {developerTools && <div className="menu-time-tools"><button onClick={() => onAdvance(1)}>+5s</button><button onClick={() => onAdvance(24)}>+2m</button></div>}
      <button className="menu-guide-link" onClick={onGuide}>How it works <span aria-hidden="true">↗</span></button>
    </div>
  </dialog>;
}
