import React, { useEffect, useRef } from 'react';
import { RUNE_DIVIDER_GLYPHS, runeHoverSound } from './rune-divider-audio.js';
import { getAudioChannelVolume } from './audio-settings.js';

const SOUND_VOLUME = .4;

export default function RuneDivider() {
  const activeSounds = useRef(new Set());

  useEffect(() => () => {
    for (const sound of activeSounds.current) {
      sound.pause();
      sound.currentTime = 0;
    }
    activeSounds.current.clear();
  }, []);

  function followPointer(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--rune-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--rune-y', `${event.clientY - bounds.top}px`);
  }

  function playRune(event, index) {
    if (event.pointerType && event.pointerType !== 'mouse') return;
    const channelVolume = getAudioChannelVolume('rune');
    if (channelVolume <= 0) return;
    const sound = new Audio(runeHoverSound(index, import.meta.env?.BASE_URL || '/'));
    sound.preload = 'auto';
    sound.volume = SOUND_VOLUME * channelVolume;
    activeSounds.current.add(sound);
    const release = () => activeSounds.current.delete(sound);
    sound.addEventListener('ended', release, { once: true });
    sound.addEventListener('error', release, { once: true });
    sound.play().catch(release);
  }

  return <div className="rune-divider" aria-hidden="true" onPointerMove={followPointer}>
    <span className="divider-inscription">{RUNE_DIVIDER_GLYPHS.map((rune, index) => <React.Fragment key={index}>
      <span className="divider-rune-sound" onPointerEnter={(event) => playRune(event, index)}>{rune}</span>{' '}
    </React.Fragment>)}</span>
    <span className="divider-inscription rune-glow">{RUNE_DIVIDER_GLYPHS.map((rune, index) => <React.Fragment key={index}>
      <span>{rune}</span>{' '}
    </React.Fragment>)}</span>
  </div>;
}
