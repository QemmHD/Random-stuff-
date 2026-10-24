import React, { useEffect, useRef, useState } from 'react';

export function reducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

/**
 * Cross-fades between views. When `id` changes, the old view stays mounted
 * for `exitMs` with the `out` class while the new one plays its enter animation.
 */
export function Transition({ id, enter, children, exitMs = 220 }: { id: string; enter: string; children: React.ReactNode; exitMs?: number }) {
  const cur = useRef<{ id: string; node: React.ReactNode }>({ id, node: children });
  const prev = useRef<{ id: string; node: React.ReactNode } | null>(null);
  const [, force] = useState(0);
  if (cur.current.id !== id) {
    prev.current = cur.current;
    cur.current = { id, node: children };
  } else cur.current.node = children;
  useEffect(() => {
    if (!prev.current) return;
    const t = window.setTimeout(() => {
      prev.current = null;
      force((n) => n + 1);
    }, exitMs);
    return () => clearTimeout(t);
  }, [id]);
  return (
    <>
      {prev.current && (
        <div key={prev.current.id} className="view out" aria-hidden="true" {...{ inert: '' }}>
          {prev.current.node}
        </div>
      )}
      <div key={id} className={'view in-' + enter}>
        {children}
      </div>
    </>
  );
}

/** Animates a number from its previous value (or `from`) to `value`. */
export function CountUp({ value, from, ms = 650, delay = 0, format }: { value: number; from?: number; ms?: number; delay?: number; format?: (n: number) => string }) {
  const last = useRef(from ?? value);
  const [shown, setShown] = useState(from ?? value);
  useEffect(() => {
    const a = last.current;
    const b = value;
    if (a === b) return;
    if (reducedMotion()) {
      last.current = b;
      setShown(b);
      return;
    }
    let raf = 0;
    let t0 = 0;
    const step = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min(1, Math.max(0, (t - t0 - delay) / ms));
      const v = a + (b - a) * (1 - Math.pow(1 - p, 3));
      last.current = v;
      setShown(v);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{format ? format(shown) : Math.round(shown)}</>;
}

/** True for `ms` after `dep` changes (skips the first render). Handy for one-shot CSS animations. */
export function usePulse(dep: unknown, ms = 600): boolean {
  const [on, setOn] = useState(false);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setOn(true);
    const t = window.setTimeout(() => setOn(false), ms);
    return () => clearTimeout(t);
  }, [dep]);
  return on;
}

/** Bursts of light used when a card lands on the court. */
export function Sparks({ color, n = 10 }: { color: string; n?: number }) {
  const parts = useRef(
    Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2 + Math.random() * 0.5;
      const d = 34 + Math.random() * 26;
      return { dx: Math.cos(a) * d, dy: Math.sin(a) * d, s: 3 + Math.random() * 4, delay: Math.random() * 60 };
    })
  ).current;
  return (
    <>
      {parts.map((p, i) => (
        <i
          key={i}
          className="spark"
          style={{ '--dx': p.dx + 'px', '--dy': p.dy + 'px', width: p.s, height: p.s, background: i % 3 === 0 ? '#fff' : color, animationDelay: p.delay + 'ms' } as React.CSSProperties}
        />
      ))}
    </>
  );
}
