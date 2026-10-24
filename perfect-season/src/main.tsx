import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Stage } from './stage';
import './styles.css';

// iOS Safari only shows :active press states when the page listens for touches
document.addEventListener('touchstart', () => {}, { passive: true });
// no pinch-zoom, like a native app (iOS ignores user-scalable=no, so stop its gesture events)
document.addEventListener('gesturestart', (e) => e.preventDefault());

/** Waits for the Archivo faces (the condensed display type has no good fallback), at most 2.2s. */
function fontsReady(): Promise<void> {
  const f = (document as Document & { fonts?: FontFaceSet }).fonts;
  if (!f?.load) return Promise.resolve();
  const loads = Promise.all([f.load('italic 900 48px Archivo'), f.load('800 14px Archivo'), f.load('700 14px Archivo')]).then(() => undefined);
  const timeout = new Promise<void>((r) => window.setTimeout(r, 2200));
  return Promise.race([loads, timeout]).catch(() => undefined);
}

function Splash({ leaving }: { leaving: boolean }) {
  return (
    <div className={'splash' + (leaving ? ' out' : '')} aria-hidden="true">
      <svg width="96" height="96" viewBox="0 0 96 96">
        <circle className="ball" cx="48" cy="48" r="38" />
        <path className="seam" d="M10 48 H86 M48 10 V86 M21 21 Q48 48 21 75 M75 21 Q48 48 75 75" />
      </svg>
    </div>
  );
}

function Root() {
  const [ready, setReady] = useState(false);
  const [splash, setSplash] = useState(true);
  useEffect(() => {
    const t0 = performance.now();
    void fontsReady().then(() => {
      // let the ball finish its spin, even when the fonts were cached
      window.setTimeout(() => setReady(true), Math.max(0, 700 - (performance.now() - t0)));
    });
  }, []);
  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => setSplash(false), 450);
    return () => clearTimeout(t);
  }, [ready]);
  return (
    <Stage>
      {ready && <App />}
      {splash && <Splash leaving={ready} />}
    </Stage>
  );
}

createRoot(document.getElementById('root')!).render(<Root />);
