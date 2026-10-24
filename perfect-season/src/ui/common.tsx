import React, { useEffect, useRef } from 'react';
import { levelInfo } from '../engine/economy';
import type { Player } from '../engine/types';
import { Coin, Gear, Help } from './icons';

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

export function CoinChip({ coins, bump }: { coins: number; bump?: boolean }) {
  return (
    <div className={'coins num' + (bump ? ' bump' : '')} aria-label={coins + ' coins'}>
      <Coin />
      <span>{coins}</span>
    </div>
  );
}

export function TopBar({ xp, coins, onProfile, onSettings, onHelp, bump }: { xp: number; coins: number; onProfile: () => void; onSettings?: () => void; onHelp?: () => void; bump?: boolean }) {
  const lv = levelInfo(xp);
  return (
    <div className="topbar">
      <button className="level" onClick={onProfile} aria-label={'Level ' + lv.level + ', ' + lv.into + ' of ' + lv.need + ' XP'}>
        <span className="level-ring">LV{lv.level}</span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <span className="eyebrow" style={{ letterSpacing: 1 }}>
            Level {lv.level} · {lv.into}/{lv.need} XP
          </span>
          <span className="bar" style={{ width: 110 }}>
            <i style={{ width: Math.round((lv.into / lv.need) * 100) + '%' }} />
          </span>
        </span>
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <CoinChip coins={coins} bump={bump} />
        {onHelp && (
          <button className="icon-btn" style={{ width: 38, height: 38 }} onClick={onHelp} aria-label="How to play">
            <Help size={18} />
          </button>
        )}
        {onSettings && (
          <button className="icon-btn" style={{ width: 38, height: 38 }} onClick={onSettings} aria-label="Settings">
            <Gear size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export function TeamChips({ players }: { players: (Player | null)[] }) {
  return (
    <div className="teamchips">
      {players.filter(Boolean).map((p) => (
        <span key={p!.id} className="teamchip" style={{ background: p!.c1, borderColor: p!.c2 }}>
          {initials(p!.name)}
        </span>
      ))}
    </div>
  );
}

export function Confirm(props: { title: string; body: string; yes: string; no: string; onYes: () => void; onNo: () => void; tone?: 'gold' | 'primary' }) {
  return (
    <div className="scrim" role="dialog" aria-modal="true" aria-label={props.title}>
      <div className="sheet">
        <h2 className="disp">{props.title}</h2>
        <p>{props.body}</p>
        <div className="btnrow">
          <button className="btn" onClick={props.onNo}>
            {props.no}
          </button>
          <button className={'btn ' + (props.tone ?? 'primary')} onClick={props.onYes}>
            {props.yes}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Short burst of confetti in brand colors. */
export function Confetti({ density = 1 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const g = c.getContext('2d');
    if (!g) return;
    c.width = 390;
    c.height = 844;
    const colors = ['#19E3C9', '#F5B83D', '#FFFFFF', '#6CB4FF', '#FF7A7A'];
    const n = Math.round(90 * density);
    const parts = Array.from({ length: n }, () => ({
      x: 195 + (Math.random() - 0.5) * 120,
      y: 300 + (Math.random() - 0.5) * 60,
      vx: (Math.random() - 0.5) * 9,
      vy: -Math.random() * 11 - 4,
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      w: 6 + Math.random() * 6,
      h: 3 + Math.random() * 4,
      c: colors[Math.floor(Math.random() * colors.length)],
    }));
    let frame = 0;
    let raf = 0;
    const tick = () => {
      frame++;
      g.clearRect(0, 0, 390, 844);
      for (const p of parts) {
        p.vy += 0.28;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.r += p.vr;
        g.save();
        g.translate(p.x, p.y);
        g.rotate(p.r);
        g.fillStyle = p.c;
        g.globalAlpha = Math.max(0, 1 - frame / 170);
        g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        g.restore();
      }
      if (frame < 170) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [density]);
  return <canvas ref={ref} className="confetti" aria-hidden="true" />;
}

export function Toast({ text }: { text: string }) {
  return (
    <div className="toast" role="status">
      {text}
    </div>
  );
}
