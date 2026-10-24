import React, { createContext, useContext, useLayoutEffect, useRef, useState } from 'react';

/* The game is designed on a 390px-wide frame. On a phone the frame is scaled
   to the full screen width and its height follows the screen, so a 430x932
   iPhone 15 Pro Max gets the same layout as a 390-wide phone, 10% larger.
   The frame runs edge to edge; --sat/--sab carry the Dynamic Island / status
   bar and home-indicator insets (in frame px) so screens can keep their
   content clear of them while their backgrounds bleed underneath. */

export const DESIGN_W = 390;
/** Shortest content area (frame px, inside the insets) the screens are designed for. */
const MIN_CONTENT = 540;

export type Fit = 'compact' | 'tight' | 'normal' | 'roomy';

export interface Layout {
  /** screen px per frame px */
  k: number;
  /** frame height including the insets, in frame px */
  h: number;
  sat: number;
  sab: number;
  /** usable height between the insets */
  content: number;
  fit: Fit;
  framed: boolean;
}

const DEFAULT: Layout = { k: 1, h: 844, sat: 0, sab: 0, content: 844, fit: 'roomy', framed: false };
const LayoutCtx = createContext<Layout>(DEFAULT);
export const useLayout = () => useContext(LayoutCtx);

declare global {
  interface Window {
    /** test hook: [top, right, bottom, left] safe-area insets in screen px */
    __psInsets?: [number, number, number, number];
  }
}

interface Box extends Layout {
  x: number;
  y: number;
  rotate: boolean;
}

function readInsets(probe: HTMLElement | null): [number, number, number, number] {
  if (window.__psInsets) return window.__psInsets;
  if (!probe) return [0, 0, 0, 0];
  const cs = getComputedStyle(probe);
  return [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft].map((v) => parseFloat(v) || 0) as [number, number, number, number];
}

function fitFor(content: number): Fit {
  if (content < 650) return 'compact';
  if (content < 730) return 'tight';
  if (content < 800) return 'normal';
  return 'roomy';
}

function measure(root: HTMLElement, probe: HTMLElement | null): Box {
  const W = root.clientWidth || window.innerWidth;
  const H = root.clientHeight || window.innerHeight;
  const [t, r, b, l] = readInsets(probe);
  const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
  const rotate = coarse && W > H && H < 520;
  if (W <= 600 || rotate) {
    // phone: fill the width, let the height follow
    const availW = Math.max(1, W - l - r);
    let k = availW / DESIGN_W;
    if ((H - t - b) / k < MIN_CONTENT) k = Math.max(0.5, (H - t - b) / MIN_CONTENT);
    const h = H / k;
    const sat = t / k;
    const sab = b / k;
    const content = h - sat - sab;
    return { k, h, sat, sab, content, fit: fitFor(content), framed: false, x: Math.round((l + (availW - DESIGN_W * k) / 2) * 100) / 100, y: 0, rotate };
  }
  // tablet / desktop: a phone-shaped frame in the middle of the window
  const m = 24;
  const k = Math.min(1.2, Math.max(0.75, (H - 2 * m) / 760));
  const h = Math.min(844, Math.max(600, (H - 2 * m) / k));
  return { k, h, sat: 0, sab: 0, content: h, fit: fitFor(h), framed: true, x: (W - DESIGN_W * k) / 2, y: Math.max(m, (H - h * k) / 2), rotate: false };
}

export function Stage({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<Box | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current!;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setBox((old) => same(old, measure(root, probeRef.current))));
    };
    setBox(measure(root, probeRef.current));
    const ro = new ResizeObserver(update);
    ro.observe(root);
    // iOS reports the new size a moment after the rotation event
    const onRotate = () => {
      update();
      window.setTimeout(update, 350);
    };
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', onRotate);
    window.visualViewport?.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', onRotate);
      window.visualViewport?.removeEventListener('resize', update);
      cancelAnimationFrame(raf);
    };
  }, []);

  const style = box
    ? ({
        width: DESIGN_W,
        height: box.h,
        transform: 'translate(' + box.x + 'px,' + box.y + 'px) scale(' + box.k + ')',
        '--sat': box.sat + 'px',
        '--sab': box.sab + 'px',
      } as React.CSSProperties)
    : undefined;

  return (
    <div className={'viewport' + (box?.framed ? ' wide' : '')} ref={rootRef}>
      <div className="inset-probe" ref={probeRef} aria-hidden="true" />
      {box && (
        <div className={'stage fit-' + box.fit + (box.framed ? ' framed' : '')} style={style}>
          <LayoutCtx.Provider value={box}>{children}</LayoutCtx.Provider>
        </div>
      )}
      {box?.rotate && <RotateNotice />}
    </div>
  );
}

function same(a: Box | null, b: Box): Box {
  if (a && a.k === b.k && a.h === b.h && a.sat === b.sat && a.sab === b.sab && a.x === b.x && a.y === b.y && a.rotate === b.rotate) return a;
  return b;
}

function RotateNotice() {
  return (
    <div className="rotate" role="alert">
      <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
        <rect className="rotate-phone" x="20" y="6" width="24" height="44" rx="5" fill="none" stroke="#19E3C9" strokeWidth="3" />
        <circle cx="32" cy="44" r="2" fill="#19E3C9" />
      </svg>
      <b>Turn your phone upright</b>
      <span>Perfect Season is made for portrait.</span>
    </div>
  );
}
