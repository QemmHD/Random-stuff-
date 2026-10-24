import React, { useEffect, useRef, useState } from 'react';
import { ROUND_NAMES, type Series, seriesScore } from '../engine/playoffs';
import { gradeFor } from '../engine/rating';
import type { Season } from '../engine/season';
import { type Lineup, SLOTS } from '../engine/types';
import { sfx } from '../lib/sound';
import { TeamChips } from './common';

export function Reveal({ season, lineup, label, onDone }: { season: Season; lineup: Lineup; label: string; onDone: () => void }) {
  const [tick, setTick] = useState(0);
  const done = tick >= 82;
  const iv = useRef<number | null>(null);
  useEffect(() => {
    iv.current = window.setInterval(() => {
      setTick((t) => {
        const n = t + 1;
        if (n <= 82) (season.seq[n - 1] === 1 ? sfx.tickerWin : sfx.tickerLoss)();
        if (n >= 82 && iv.current) {
          clearInterval(iv.current);
          iv.current = null;
        }
        return Math.min(82, n);
      });
    }, 34);
    return () => {
      if (iv.current) clearInterval(iv.current);
    };
  }, [season]);
  useEffect(() => {
    if (done) sfx.result(gradeFor(season.wins).letter);
  }, [done]);
  const shown = season.seq.slice(0, tick);
  const w = shown.filter((x) => x === 1).length;
  const g = gradeFor(season.wins);
  const skip = () => {
    if (iv.current) clearInterval(iv.current);
    iv.current = null;
    setTick(82);
  };
  return (
    <div className="screen reveal">
      <span className="eyebrow" style={{ letterSpacing: 3 }}>
        Regular season · {label}
      </span>
      <div style={{ marginTop: 12 }}>
        <TeamChips players={SLOTS.map((s) => lineup[s])} />
      </div>
      <div className="board" aria-live="polite" aria-label={'Record ' + w + ' and ' + (shown.length - w)}>
        <b className="disp num w">{w}</b>
        <span className="disp">–</span>
        <b className="disp num l">{shown.length - w}</b>
      </div>
      <span className="eyebrow" style={{ marginTop: 10 }}>
        {done ? 'Final record' : 'Game ' + Math.max(1, tick) + ' of 82'}
      </span>
      <div className="dots" aria-hidden="true">
        {season.seq.map((x, i) => (
          <i key={i} className={i < tick ? (x === 1 ? 'w' : 'l') : ''} />
        ))}
      </div>
      {done && (
        <div className="pop" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, marginTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="gradebadge disp" style={{ borderColor: g.color, color: g.color }}>
              {g.letter}
            </span>
            <span className="disp" style={{ fontSize: 30 }}>
              {g.tier}
            </span>
          </div>
          <div className="pills">
            <span className="pill">Longest win streak: {season.longestWin}</span>
            <span className="pill">
              First half: {season.firstHalfWins}–{41 - season.firstHalfWins}
            </span>
            <span className="pill">Team rating {season.rating.toFixed(1)}</span>
          </div>
        </div>
      )}
      <div className="spacer" />
      <button className={done ? 'big gold pulse' : 'big ghost'} onClick={done ? onDone : skip}>
        {done ? 'START THE PLAYOFFS' : 'SKIP'}
      </button>
    </div>
  );
}

export function Playoffs({ season, bracket, onDone }: { season: Season; bracket: Series[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState(0);
  const [running, setRunning] = useState(false);
  const iv = useRef<number | null>(null);
  useEffect(
    () => () => {
      if (iv.current) clearInterval(iv.current);
    },
    []
  );
  const cur = bracket[idx];
  const curDone = shown >= cur.games.length;

  const play = (round: number) => {
    const ser = bracket[round];
    setRunning(true);
    setShown(0);
    let n = 0;
    iv.current = window.setInterval(() => {
      n++;
      const g = ser.games[n - 1];
      if (g === 1) sfx.gameWin();
      else sfx.gameLoss();
      setShown(n);
      if (n >= ser.games.length) {
        if (iv.current) clearInterval(iv.current);
        iv.current = null;
        setRunning(false);
        if (ser.won) (round === 3 ? sfx.title : sfx.seriesWin)();
        else sfx.seriesLoss();
      }
    }, 430);
  };

  const action = () => {
    if (running) return;
    if (!curDone) return play(idx);
    if (cur.won && idx < 3) {
      setIdx(idx + 1);
      play(idx + 1);
      return;
    }
    onDone();
  };

  let label = 'SEE RESULTS';
  if (running) label = 'PLAYING…';
  else if (!curDone) label = 'PLAY THE ' + ROUND_NAMES[idx].toUpperCase();
  else if (cur.won && idx < 3) label = 'NEXT: ' + ROUND_NAMES[idx + 1].toUpperCase();

  return (
    <div className="screen playoffs">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <span className="disp" style={{ fontSize: 42, color: 'var(--gold)' }}>
          PLAYOFFS
        </span>
        <span style={{ textAlign: 'center', fontSize: 13, lineHeight: 1.4, color: 'var(--sub)' }}>
          Your {season.wins}–{82 - season.wins} team vs the all-time greats. Go 16–0 for a Perfect Season.
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 14 }}>
        {bracket.map((b, i) => {
          const isCur = i === idx;
          const n = i < idx ? b.games.length : isCur ? shown : 0;
          const g = b.games.slice(0, n);
          const [w, l] = seriesScore(g);
          let status = 'LOCKED';
          let color = 'var(--sub)';
          let dim = false;
          if (i < idx || (isCur && curDone)) {
            status = (b.won ? 'WON ' : 'LOST ') + w + '–' + l;
            color = b.won ? 'var(--teal)' : 'var(--red)';
          } else if (isCur) {
            status = n === 0 ? 'UP NEXT' : 'LIVE · ' + w + '–' + l;
            color = 'var(--gold)';
          } else if (curDone && !cur.won) {
            status = 'ELIMINATED';
            dim = true;
          } else if (i === idx + 1 && curDone) {
            status = 'UP NEXT';
            color = 'var(--gold)';
          } else dim = true;
          return (
            <div key={i} className={'series' + (isCur ? ' cur' : '') + (dim ? ' dim' : '')}>
              <div className="hd">
                <span className="eyebrow">{ROUND_NAMES[i]}</span>
                <b style={{ color }}>{status}</b>
              </div>
              <div className="opp">
                <i style={{ background: b.opp.c1 }} />
                <div>
                  <strong>
                    {b.opp.year} {b.opp.team}
                  </strong>
                  <small>
                    {b.opp.w}–{b.opp.l}
                    {b.opp.star ? ' · led by ' + b.opp.star : ''}
                    {i === 3 ? ' · Finals boss' : ''}
                  </small>
                </div>
              </div>
              <div className="games" aria-label={'Games: ' + w + ' wins, ' + l + ' losses'}>
                {[0, 1, 2, 3, 4, 5, 6].map((j) => (
                  <span key={j} className={j < g.length ? (g[j] === 1 ? 'w' : 'l') : ''}>
                    {j < g.length ? (g[j] === 1 ? 'W' : 'L') : ''}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="spacer" />
      <button className={label === 'SEE RESULTS' ? 'big gold pulse' : 'big' + (label.length > 24 ? ' small' : '')} aria-disabled={running} onClick={action}>
        {label}
      </button>
    </div>
  );
}
