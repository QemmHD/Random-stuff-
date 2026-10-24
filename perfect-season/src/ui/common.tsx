import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { levelInfo } from '../engine/economy';
import type { Player } from '../engine/types';
import { useLayout } from '../stage';
import { Coin, Gear, Help } from './icons';
import { CountUp, reducedMotion, usePulse } from './motion';

export function initials(name: string): string {
  const parts = name.replace(/\./g, '').split(/[\s-]+/).filter(Boolean);
  const first = parts[0]?.charAt(0) ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';
  return (first + last).toUpperCase();
}

export function lastName(name: string): string {
  const parts = name.split(' ');
  const last = parts[parts.length - 1];
  return /^(Jr\.?|Sr\.?|II|III|IV)$/.test(last) && parts.length > 2 ? parts[parts.length - 2] : last;
}

export function shortEra(era: string): string {
  return '’' + era.slice(2);
}

export function seasonLabel(endYear: number): string {
  return endYear - 1 + '–' + String(endYear).slice(2);
}

/** Coin balance. Counts to the new value and bumps whenever it changes. */
export function CoinChip({ coins, from, delay = 450 }: { coins: number; from?: number; delay?: number }) {
  const bump = usePulse(coins, 520);
  return (
    <div className={'coins num' + (bump ? ' bump' : '')} aria-label={coins + ' coins'}>
      <Coin />
      <span>
        <CountUp value={coins} from={from} ms={from !== undefined ? 900 : 500} delay={from !== undefined ? delay : 0} />
      </span>
    </div>
  );
}

export function TopBar({ xp, coins, onProfile, onSettings, onHelp }: { xp: number; coins: number; onProfile: () => void; onSettings?: () => void; onHelp?: () => void }) {
  const lv = levelInfo(xp);
  return (
    <div className="topbar">
      <button className="level" onClick={onProfile} aria-label={'Level ' + lv.level + ', ' + lv.into + ' of ' + lv.need + ' XP'}>
        <span className="level-ring" style={{ '--p': lv.into / lv.need } as React.CSSProperties}>
          <span>LV</span>
          <b>{lv.level}</b>
        </span>
        <span className="level-text">
          <span className="eyebrow">Level {lv.level}</span>
          <span className="bar">
            <i style={{ width: Math.round((lv.into / lv.need) * 100) + '%' }} />
          </span>
          <span className="xp num">
            {lv.into}/{lv.need} XP
          </span>
        </span>
      </button>
      <div className="topbar-right">
        <CoinChip coins={coins} />
        {onHelp && (
          <button className="icon-btn round" onClick={onHelp} aria-label="How to play">
            <Help size={18} />
          </button>
        )}
        {onSettings && (
          <button className="icon-btn round" onClick={onSettings} aria-label="Settings">
            <Gear size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export function TeamChips({ players, stagger }: { players: (Player | null)[]; stagger?: boolean }) {
  return (
    <div className="teamchips">
      {players.filter(Boolean).map((p, i) => (
        <span key={p!.id} className={'teamchip' + (stagger ? ' rise-in' : '')} style={{ background: p!.c1, borderColor: p!.c2, animationDelay: i * 70 + 'ms' }}>
          {initials(p!.name)}
        </span>
      ))}
    </div>
  );
}

/**
 * Modal sheet. `bottom` slides up from the bottom edge like an iOS sheet;
 * `center` pops in like an alert. Both animate out before `onClose` runs.
 */
export function Sheet({ label, kind = 'bottom', onClose, children }: { label: string; kind?: 'bottom' | 'center'; onClose: () => void; children: (close: (after?: () => void) => void) => React.ReactNode }) {
  const [closing, setClosing] = useState(false);
  const done = useRef(false);
  const close = (after?: () => void) => {
    if (done.current) return;
    done.current = true;
    setClosing(true);
    window.setTimeout(
      () => (after ? after() : onClose()),
      reducedMotion() ? 0 : 200
    );
  };
  return (
    <div className={'scrim ' + kind + (closing ? ' closing' : '')} role="dialog" aria-modal="true" aria-label={label} onClick={(e) => e.target === e.currentTarget && close()}>
      <div className={'sheet ' + kind}>
        {kind === 'bottom' && <span className="grip" aria-hidden="true" />}
        {children(close)}
      </div>
    </div>
  );
}

export function Confirm(props: { title: string; body: string; yes: string; no: string; onYes: () => void; onNo: () => void; tone?: 'gold' | 'primary' }) {
  return (
    <Sheet label={props.title} kind="center" onClose={props.onNo}>
      {(close) => (
        <>
          <h2 className="disp">{props.title}</h2>
          <p>{props.body}</p>
          <div className="btnrow">
            <button className="btn" onClick={() => close()}>
              {props.no}
            </button>
            <button className={'btn ' + (props.tone ?? 'primary')} onClick={() => close(props.onYes)}>
              {props.yes}
            </button>
          </div>
        </>
      )}
    </Sheet>
  );
}

const CONFETTI_COLORS = ['#19E3C9', '#F5B83D', '#FFFFFF', '#6CB4FF', '#FFD36B', '#45F5DD'];

/** Paper confetti fired from both bottom corners, plus a shower from the top for big moments. */
export function Confetti({ density = 1, colors = CONFETTI_COLORS }: { density?: number; colors?: string[] }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const { h, k } = useLayout();
  useEffect(() => {
    const c = ref.current;
    if (!c || reducedMotion()) return;
    const g = c.getContext('2d');
    if (!g) return;
    const W = 390;
    const H = h;
    const scale = Math.min(3, (window.devicePixelRatio || 1) * k);
    c.width = Math.round(W * scale);
    c.height = Math.round(H * scale);
    g.scale(scale, scale);
    type P = { x: number; y: number; vx: number; vy: number; r: number; vr: number; w: number; h: number; c: string; ph: number; vph: number; life: number };
    const parts: P[] = [];
    const add = (x: number, y: number, vx: number, vy: number, delay: number) =>
      parts.push({ x, y, vx, vy, r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.25, w: 6 + Math.random() * 6, h: 4 + Math.random() * 5, c: colors[Math.floor(Math.random() * colors.length)], ph: Math.random() * Math.PI * 2, vph: 0.12 + Math.random() * 0.18, life: -delay });
    const n = Math.round(70 * density);
    for (let i = 0; i < n; i++) {
      const left = i % 2 === 0;
      const a = 0.18 + Math.random() * 0.42;
      const sp = 13 + Math.random() * 9;
      add(left ? -6 : W + 6, H * 0.82, (left ? 1 : -1) * Math.sin(a) * sp, -Math.cos(a) * sp, Math.floor(Math.random() * 8));
    }
    if (density >= 1.8) for (let i = 0; i < n * 0.6; i++) add(Math.random() * W, -20 - Math.random() * 120, (Math.random() - 0.5) * 2, 1 + Math.random() * 2, 20 + Math.floor(Math.random() * 50));
    let raf = 0;
    let frame = 0;
    const END = 220;
    const tick = () => {
      frame++;
      g.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.life++;
        if (p.life < 0) continue;
        p.vy += 0.32;
        p.vx *= 0.985;
        p.vy *= 0.985;
        if (p.vy > 3.2) p.vy = 3.2 + (p.vy - 3.2) * 0.8; // paper flutters down instead of falling
        p.ph += p.vph;
        p.x += p.vx + Math.sin(p.ph) * 0.6;
        p.y += p.vy;
        p.r += p.vr;
        const flip = Math.cos(p.ph);
        g.save();
        g.translate(p.x, p.y);
        g.rotate(p.r);
        g.scale(1, Math.max(0.12, Math.abs(flip)));
        g.globalAlpha = Math.max(0, Math.min(1, (END - frame) / 40));
        g.fillStyle = p.c;
        g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        if (flip < 0) {
          g.fillStyle = 'rgba(0,0,0,0.25)';
          g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
        g.restore();
      }
      if (frame < END) raf = requestAnimationFrame(tick);
      else g.clearRect(0, 0, W, H);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [density]);
  return <canvas ref={ref} className="confetti" style={{ height: h }} aria-hidden="true" />;
}

export function Toast({ text, out }: { text: string; out: boolean }) {
  return (
    <div className={'toast' + (out ? ' out' : '')} role="status">
      {text}
    </div>
  );
}

/** Keeps a value on screen for `ms` after it turns falsy, so it can animate out. */
export function useLinger<T>(value: T | null, ms = 220): [T | null, boolean] {
  const [kept, setKept] = useState<T | null>(value);
  useEffect(() => {
    if (value) {
      setKept(value);
      return;
    }
    const t = window.setTimeout(() => setKept(null), ms);
    return () => clearTimeout(t);
  }, [value]);
  return [value ?? kept, !value && !!kept];
}

/** Button label that shrinks its font just enough to fit on one line. */
export function Fit({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [fit, setFit] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current;
    const box = el?.parentElement;
    if (!el || !box) return;
    el.style.fontSize = '';
    const cs = getComputedStyle(box);
    const avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const need = el.scrollWidth;
    setFit(need > avail && need > 0 ? Math.max(0.6, Math.floor((avail / need) * 100) / 100) : 1);
  }, [text]);
  return (
    <span ref={ref} style={fit < 1 ? { fontSize: fit + 'em' } : undefined}>
      {text}
    </span>
  );
}
