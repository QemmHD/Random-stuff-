import React, { createContext, useContext, useLayoutEffect, useRef, useState } from 'react';

/* The game is designed on a 390px-wide frame. On a phone the frame is scaled
   to the full screen width and its height follows the screen, so a 430x932
   iPhone 15 Pro Max gets the same layout as a 390-wide phone, 10% larger.
   The frame runs edge to edge; --sat/--sab carry the Dynamic Island / status
   bar and home-indicator insets (in frame px) so screens can keep their
   content clear of them while their backgrounds bleed underneath.

   The game is portrait only. Browsers can't lock rotation on iPhone, so when
   a phone is turned sideways the frame is turned back by 90 degrees: it stays
   upright relative to the phone, the way a portrait-locked app does, and the
   island stays at its top. */

export const DESIGN_W = 390;
/** Shortest content area (frame px, inside the insets) the screens are designed for. */
const MIN_CONTENT = 540;

export type Fit = 'compact' | 'tight' | 'normal' | 'roomy';
/** how far the frame is turned to stay upright on a sideways phone */
export type Rot = 0 | 90 | -90;

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
  rot: Rot;
}

const DEFAULT: Layout = { k: 1, h: 844, sat: 0, sab: 0, content: 844, fit: 'roomy', framed: false, rot: 0 };
const LayoutCtx = createContext<Layout>(DEFAULT);
export const useLayout = () => useContext(LayoutCtx);

declare global {
  interface Window {
    /** test hook: [top, right, bottom, left] safe-area insets in screen px */
    __psInsets?: [number, number, number, number];
  }
}

interface Box extends Layout {
  transform: string;
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

/** Which way a sideways phone is turned: its top is on the left (-90) or the right (90) of the screen. */
function rotationFor(W: number, H: number): Rot {
  const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
  if (!coarse || W <= H || H >= 520) return 0;
  const legacy = (window as unknown as { orientation?: number }).orientation;
  const angle = screen.orientation?.angle ?? (typeof legacy === 'number' ? (legacy + 360) % 360 : 90);
  return angle === 270 ? 90 : -90;
}

function measure(root: HTMLElement, probe: HTMLElement | null): Box {
  const VW = root.clientWidth || window.innerWidth;
  const VH = root.clientHeight || window.innerHeight;
  const [vt, vr, vb, vl] = readInsets(probe);
  const rot = rotationFor(VW, VH);
  // work in the phone's own portrait frame: swap the sides when it is sideways
  const W = rot ? VH : VW;
  const H = rot ? VW : VH;
  const [t, b] = rot === -90 ? [vl, vr] : rot === 90 ? [vr, vl] : [vt, vb];
  let k: number;
  let h: number;
  let x: number;
  let y: number;
  let sat = 0;
  let sab = 0;
  let framed = false;
  if (W <= 600) {
    // phone: fill the width, let the height follow. The frame always spans the full
    // width: a side inset only appears on a sideways phone, where it is the home
    // indicator's strip, and the 16px gutter already keeps content clear of the bar
    k = W / DESIGN_W;
    if ((H - t - b) / k < MIN_CONTENT) k = Math.max(0.5, (H - t - b) / MIN_CONTENT);
    h = H / k;
    sat = t / k;
    sab = b / k;
    x = Math.round(((W - DESIGN_W * k) / 2) * 100) / 100;
    y = 0;
  } else {
    // tablet / desktop: a phone-shaped frame in the middle of the window
    const m = 24;
    framed = true;
    k = Math.min(1.2, Math.max(0.75, (H - 2 * m) / 760));
    h = Math.min(844, Math.max(600, (H - 2 * m) / k));
    x = (W - DESIGN_W * k) / 2;
    y = Math.max(m, (H - h * k) / 2);
  }
  const place = 'translate(' + x + 'px,' + y + 'px) scale(' + k + ')';
  // turn the portrait frame back onto the sideways screen
  const transform = rot === -90 ? 'translate(0px,' + VH + 'px) rotate(-90deg) ' + place : rot === 90 ? 'translate(' + VW + 'px,0px) rotate(90deg) ' + place : place;
  const content = h - sat - sab;
  return { k, h, sat, sab, content, fit: framed ? fitFor(h) : fitFor(content), framed, rot, transform };
}

/** An element's box in frame px, whatever the frame's scale and rotation. */
export function frameRect(el: Element): { x: number; y: number; w: number; h: number } {
  const stage = el.closest('.stage');
  const r = el.getBoundingClientRect();
  if (!stage) return { x: r.left, y: r.top, w: r.width, h: r.height };
  const m = new DOMMatrix(getComputedStyle(stage).transform).inverse();
  const pts = [
    [r.left, r.top],
    [r.right, r.top],
    [r.left, r.bottom],
    [r.right, r.bottom],
  ].map(([px, py]) => m.transformPoint(new DOMPoint(px, py)));
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  return { x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) };
}

/** Converts a pointer position to frame px along the frame's vertical axis. */
export function frameY(e: { clientX: number; clientY: number }, l: Layout): number {
  if (l.rot === -90) return e.clientX / l.k;
  if (l.rot === 90) return -e.clientX / l.k;
  return e.clientY / l.k;
}

export function Stage({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<Box | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const lastRot = useRef<Rot | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current!;
    let raf = 0;
    const apply = () => {
      const next = measure(root, probeRef.current);
      setBox((old) => (old && old.transform === next.transform && old.h === next.h && old.sat === next.sat && old.sab === next.sab ? old : next));
    };
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };
    // iOS reports the new size a moment after the rotation event
    const onRotate = () => {
      apply();
      window.setTimeout(apply, 350);
    };
    apply();
    const ro = new ResizeObserver(update);
    ro.observe(root);
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', onRotate);
    screen.orientation?.addEventListener?.('change', onRotate);
    window.visualViewport?.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', onRotate);
      screen.orientation?.removeEventListener?.('change', onRotate);
      window.visualViewport?.removeEventListener('resize', update);
      cancelAnimationFrame(raf);
    };
  }, []);

  // after the phone turns, the frame fades back in instead of snapping into place
  useLayoutEffect(() => {
    if (!box) return;
    if (lastRot.current !== null && lastRot.current !== box.rot && stageRef.current?.animate && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
      stageRef.current.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 420, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' });
    lastRot.current = box.rot;
  }, [box?.rot]);

  const style = box
    ? ({
        width: DESIGN_W,
        height: box.h,
        transform: box.transform,
        '--sat': box.sat + 'px',
        '--sab': box.sab + 'px',
      } as React.CSSProperties)
    : undefined;

  return (
    <div className={'viewport' + (box?.framed ? ' wide' : '')} ref={rootRef}>
      <div className="inset-probe" ref={probeRef} aria-hidden="true" />
      {box && (
        <div className={'stage fit-' + box.fit + (box.framed ? ' framed' : '')} style={style} data-rot={box.rot} ref={stageRef}>
          <LayoutCtx.Provider value={box}>{children}</LayoutCtx.Provider>
        </div>
      )}
    </div>
  );
}
