import React, { useEffect, useRef } from 'react';

export default function TutorialResetDialog({ onCancel, onConfirm }) {
  const dialog = useRef(null);
  useEffect(() => {
    const previous = document.activeElement, overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current.querySelector('button').focus();
    const handleKey = event => {
      if (event.key === 'Escape') { event.preventDefault(); onCancel(); }
      if (event.key !== 'Tab') return;
      const buttons = [...dialog.current.querySelectorAll('button')];
      if (event.shiftKey && document.activeElement === buttons[0]) { event.preventDefault(); buttons.at(-1).focus(); }
      else if (!event.shiftKey && document.activeElement === buttons.at(-1)) { event.preventDefault(); buttons[0].focus(); }
    };
    document.addEventListener('keydown', handleKey);
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = overflow; if (previous?.isConnected) previous.focus(); };
  }, []);
  return <div className="taskboard-backdrop tutorial-reset-backdrop"><section ref={dialog} className="task-confirm" role="alertdialog" aria-modal="true" aria-label="Start a new tutorial garden">
    <h3>Start a new tutorial garden?</h3><p>This replaces the current garden and task progress. Use Save Game first if you want to keep them.</p>
    <p>Begin with a 4 × 4 garden, 36 Beanstalk Seeds and 8 Prismorel Spores.</p>
    <div><button onClick={onCancel}>Cancel</button><button className="task-primary" onClick={onConfirm}>Start new garden</button></div>
  </section></div>;
}
