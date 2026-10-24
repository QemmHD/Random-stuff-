import React, { useLayoutEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles.css';

/** Lays the 390x844 phone frame out at the largest size that fits the window. */
function Stage() {
  const [box, setBox] = useState({ k: 1, x: 0, y: 0 });
  useLayoutEffect(() => {
    const fit = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const k = Math.min(w / 390, h / 844, 1.6);
      setBox({ k, x: Math.max(0, (w - 390 * k) / 2), y: Math.max(0, (h - 844 * k) / 2) });
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  return (
    <div className="viewport">
      <div className="stage" style={{ transform: 'translate(' + box.x + 'px,' + box.y + 'px) scale(' + box.k + ')' }}>
        <App />
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<Stage />);
