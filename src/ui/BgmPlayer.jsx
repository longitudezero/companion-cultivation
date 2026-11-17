import { useEffect, useRef } from 'react';
import { BGM_TRACKS, bgmTrackPath } from './bgm-tracks.js';

function anotherTrack(previous) {
  if (BGM_TRACKS.length < 2) return 0;
  let next = Math.floor(Math.random() * BGM_TRACKS.length);
  if (next === previous) next = (next + 1 + Math.floor(Math.random() * (BGM_TRACKS.length - 1))) % BGM_TRACKS.length;
  return next;
}

export default function BgmPlayer({ volume }) {
  const sound = useRef(null), current = useRef(-1), activated = useRef(false), volumeRef = useRef(volume);
  volumeRef.current = volume;

  useEffect(() => {
    const audio = new window.Audio();
    let retryTimer = null;
    audio.preload = 'metadata';
    sound.current = audio;

    const play = (advance = false) => {
      if (!activated.current || volumeRef.current <= 0 || document.hidden) return;
      if (advance || current.current < 0) {
        current.current = anotherTrack(current.current);
        audio.src = bgmTrackPath(current.current, import.meta.env?.BASE_URL || '/');
      }
      audio.volume = volumeRef.current;
      audio.play().catch(() => {});
    };
    const activate = () => {
      activated.current = true;
      document.removeEventListener('pointerdown', activate, true);
      document.removeEventListener('keydown', activate, true);
      play();
    };
    const visibility = () => {
      if (document.hidden) audio.pause();
      else play();
    };
    const ended = () => play(true);
    const failed = () => {
      window.clearTimeout(retryTimer);
      retryTimer = window.setTimeout(() => play(true), 750);
    };
    document.addEventListener('pointerdown', activate, true);
    document.addEventListener('keydown', activate, true);
    document.addEventListener('visibilitychange', visibility);
    audio.addEventListener('ended', ended);
    audio.addEventListener('error', failed);
    return () => {
      document.removeEventListener('pointerdown', activate, true);
      document.removeEventListener('keydown', activate, true);
      document.removeEventListener('visibilitychange', visibility);
      audio.removeEventListener('ended', ended);
      audio.removeEventListener('error', failed);
      window.clearTimeout(retryTimer);
      audio.pause();
      audio.removeAttribute('src');
      sound.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = sound.current;
    if (!audio) return;
    audio.volume = volume;
    if (volume <= 0) audio.pause();
    else if (activated.current && !document.hidden) {
      if (current.current < 0) {
        current.current = anotherTrack(current.current);
        audio.src = bgmTrackPath(current.current, import.meta.env?.BASE_URL || '/');
      }
      audio.play().catch(() => {});
    }
  }, [volume]);

  return null;
}
