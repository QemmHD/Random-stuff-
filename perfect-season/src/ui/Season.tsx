import React, { useEffect, useMemo, useRef, useState } from 'react';
import { playoffOutcome, ROUND_NAMES, type Series, seriesScore } from '../engine/playoffs';
import { gradeFor } from '../engine/rating';
import type { Season } from '../engine/season';
import { type Lineup, SLOTS } from '../engine/types';
import { sfx } from '../lib/sound';
import { Confetti, Fit, TeamChips } from './common';
import { reducedMotion } from './motion';

/** Delay before each game of the 82-game reveal: quick through the middle,
    slower at the end, and one beat per game when an unbeaten season gets close. */
function revealDelays(seq: number[]): number[] {
  const out: number[] = [];
  let unbeaten = true;
  for (let i = 0; i < 82; i++) {
    let d = i < 8 ? 92 - i * 8 : 30;
    if (i >= 72) d = 42 + (i - 72) * 9;
    if (unbeaten && i >= 75) d = 280 + (i - 75) * 45;
    out.push(d);
    if (seq[i] === 0) unbeaten = false;
  }
  return out;
}
const SLOW = 200;

export function Reveal({ season, lineup, label, onDone }: { season: Season; lineup: Lineup; label: string; onDone: () => void }) {
  const [tick, setTick] = useState(0);
  const done = tick >= 82;
  const timer = useRef<number | null>(null);
  const delays = useMemo(() => revealDelays(season.seq), [season]);

  useEffect(() => {
    if (reducedMotion()) {
      setTick(82);
      return;
    }
    let i = 0;
    const step = () => {
      i++;
      setTick(i);
      const won = season.seq[i - 1] === 1;
      if (delays[i - 1] >= SLOW) (won ? sfx.gameWin : sfx.gameLoss)();
      else (won ? sfx.tickerWin : sfx.tickerLoss)();
      if (i >= 82) return;
      if (delays[i] >= SLOW) sfx.heartbeat();
      timer.current = window.setTimeout(step, delays[i]);
    };
    timer.current = window.setTimeout(step, 420);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [season]);

  const g = gradeFor(season.wins);
  useEffect(() => {
    if (!done) return;
    sfx.stamp();
    const t = window.setTimeout(() => sfx.result(g.letter), 160);
    return () => clearTimeout(t);
  }, [done]);

  const shown = season.seq.slice(0, tick);
  const w = shown.filter((x) => x === 1).length;
  const l = shown.length - w;
  let streak = 0;
  for (let i = shown.length - 1; i >= 0 && shown[i] === 1; i--) streak++;
  const slowBeat = tick > 0 && tick < 82 && delays[tick - 1] >= SLOW;
  const skip = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setTick(82);
  };
  const unbeaten = done && season.wins === 82;

  return (
    <div className="screen reveal">
      <span className="eyebrow wide">Regular season · {label}</span>
      <TeamChips players={SLOTS.map((s) => lineup[s])} stagger />
      <div className={'board' + (slowBeat ? ' tense' : '') + (unbeaten ? ' gold' : '')} aria-live="polite" aria-label={'Record ' + w + ' and ' + l}>
        <div className="side">
          <b className={'disp num w' + (slowBeat ? ' beat' : '')} key={slowBeat ? 'w' + w : 'w'}>
            {w}
          </b>
          <span>WINS</span>
        </div>
        <span className="disp dash">–</span>
        <div className="side">
          <b className={'disp num l' + (slowBeat && shown[shown.length - 1] === 0 ? ' beat' : '')} key={slowBeat ? 'l' + l : 'l'}>
            {l}
          </b>
          <span>LOSSES</span>
        </div>
      </div>
      <span className="eyebrow gameno">
        {done ? 'Final record' : tick === 0 ? 'Tip-off' : 'Game ' + tick + ' of 82' + (streak >= 5 ? ' · ' + streak + ' straight wins' : '')}
      </span>
      <div className="dots" aria-hidden="true">
        {season.seq.map((x, i) => (
          <i key={i} className={i < tick ? (x === 1 ? 'w' : 'l') : ''} />
        ))}
      </div>
      {done && (
        <div className="verdict">
          {unbeaten && <div className="unbeaten disp">UNDEFEATED · 82–0</div>}
          <div className="gradeline">
            <span className="stampwrap">
              <i className="shock" style={{ borderColor: g.color }} />
              <span className="gradebadge disp stamp" style={{ borderColor: g.color, color: g.color }}>
                {g.letter}
              </span>
            </span>
            <span className="disp tier" style={{ color: g.color }}>
              {g.tier}
            </span>
          </div>
          <div className="pills">
            <span className="pill rise-in" style={{ animationDelay: '380ms' }}>
              Longest win streak <b className="num">{season.longestWin}</b>
            </span>
            <span className="pill rise-in" style={{ animationDelay: '460ms' }}>
              First half{' '}
              <b className="num">
                {season.firstHalfWins}–{41 - season.firstHalfWins}
              </b>
            </span>
            <span className="pill rise-in" style={{ animationDelay: '540ms' }}>
              Team rating <b className="num">{season.rating.toFixed(1)}</b>
            </span>
          </div>
        </div>
      )}
      {done && g.letter.startsWith('S') && <Confetti density={1.2} />}
      <div className="spacer" />
      <div className="actionbar">
        <button className={done ? 'big gold shine' : 'big ghost'} onClick={done ? onDone : skip}>
          <Fit text={done ? 'START THE PLAYOFFS' : 'SKIP'} />
        </button>
      </div>
    </div>
  );
}

/** Pause before each playoff game; closeout games and Game 7s take longer. */
function gameDelay(games: number[], n: number): number {
  if (n === 0) return 320;
  const [w, l] = seriesScore(games.slice(0, n));
  if (w === 3 && l === 3) return 1100;
  if (w === 3 || l === 3) return 720;
  return 500;
}

export function Playoffs({ season, bracket, onDone }: { season: Season; bracket: Series[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState(0);
  const [running, setRunning] = useState(false);
  const [champ, setChamp] = useState(false);
  const timer = useRef<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );
  useEffect(() => {
    cardRefs.current[idx]?.scrollIntoView?.({ block: 'nearest', behavior: reducedMotion() ? 'auto' : 'smooth' });
  }, [idx]);
  const cur = bracket[idx];
  const curDone = shown >= cur.games.length;
  const out = playoffOutcome(bracket);

  const play = (round: number) => {
    const ser = bracket[round];
    setRunning(true);
    setShown(0);
    let n = 0;
    const step = () => {
      n++;
      const g = ser.games[n - 1];
      if (g === 1) sfx.gameWin();
      else sfx.gameLoss();
      setShown(n);
      if (n >= ser.games.length) {
        timer.current = null;
        setRunning(false);
        if (ser.won) {
          if (round === 3) {
            sfx.title();
            timer.current = window.setTimeout(() => setChamp(true), 650);
          } else sfx.seriesWin();
        } else sfx.seriesLoss();
        return;
      }
      const d = gameDelay(ser.games, n);
      if (d > 1000) sfx.heartbeat();
      timer.current = window.setTimeout(step, d);
    };
    timer.current = window.setTimeout(step, gameDelay(ser.games, 0));
  };

  const action = () => {
    if (running) return;
    if (!curDone) return play(idx);
    if (cur.won && idx < 3) {
      setIdx(idx + 1);
      play(idx + 1);
      return;
    }
    if (cur.won && idx === 3 && !champ) {
      setChamp(true);
      return;
    }
    onDone();
  };

  let label = 'SEE RESULTS';
  if (running) label = 'PLAYING…';
  else if (!curDone) label = 'PLAY THE ' + ROUND_NAMES[idx].toUpperCase();
  else if (cur.won && idx < 3) label = 'NEXT: ' + ROUND_NAMES[idx + 1].toUpperCase();

  const [pw, pl] = bracket.slice(0, idx + 1).reduce(
    (acc, b, i) => {
      const [a, c] = seriesScore(i < idx ? b.games : b.games.slice(0, shown));
      return [acc[0] + a, acc[1] + c];
    },
    [0, 0]
  );

  return (
    <div className="screen playoffs">
      <div className="po-head">
        <span className="disp po-title">PLAYOFFS</span>
        <span className="po-sub">
          Your {season.wins}–{82 - season.wins} team vs the all-time greats. Go 16–0 for a Perfect Season.
        </span>
        <span className="po-rec num" aria-label={'Playoff record ' + pw + ' and ' + pl}>
          {pw}–{pl}
        </span>
      </div>
      <div className="series-list">
        {bracket.map((b, i) => {
          const isCur = i === idx;
          const n = i < idx ? b.games.length : isCur ? shown : 0;
          const g = b.games.slice(0, n);
          const [w, l] = seriesScore(g);
          const finished = i < idx || (isCur && curDone);
          let status = 'LOCKED';
          let tone = 'sub';
          let dim = false;
          if (finished) {
            status = (b.won ? 'WON ' : 'LOST ') + w + '–' + l;
            tone = b.won ? 'teal' : 'red';
          } else if (isCur) {
            status = n === 0 ? 'UP NEXT' : 'LIVE · ' + w + '–' + l;
            tone = 'gold';
          } else if (curDone && !cur.won) {
            status = 'ELIMINATED';
            dim = true;
          } else if (i === idx + 1 && curDone) {
            status = 'UP NEXT';
            tone = 'gold';
          } else dim = true;
          return (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className={'series' + (isCur && !finished ? ' cur' : '') + (dim ? ' dim' : '') + (finished ? (b.won ? ' won' : ' lost') : '') + (isCur && running ? ' live' : '')}
            >
              <div className="hd">
                <span className="eyebrow">{ROUND_NAMES[i]}</span>
                <b className={'status ' + tone} key={status}>
                  {status}
                </b>
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
                  <span key={j} className={j < g.length ? (g[j] === 1 ? 'w' : 'l') : j < 4 || !finished ? '' : 'na'}>
                    {j < g.length ? (g[j] === 1 ? 'W' : 'L') : ''}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="spacer" />
      <div className="actionbar">
        <button className={label === 'SEE RESULTS' ? 'big gold shine' : 'big' + (running ? ' busy' : '')} aria-disabled={running} onClick={action}>
          <Fit text={label} />
        </button>
      </div>
      {champ && out.title && <Champions season={season} bracket={bracket} onGo={onDone} />}
    </div>
  );
}

function Champions({ season, bracket, onGo }: { season: Season; bracket: Series[]; onGo: () => void }) {
  const out = playoffOutcome(bracket);
  const perfect = out.sweeps === 4 && season.wins === 82;
  const [w, l] = seriesScore(out.finals.games);
  const total = bracket.reduce((acc, b) => {
    const [a, c] = seriesScore(b.games);
    return [acc[0] + a, acc[1] + c];
  }, [0, 0]);
  return (
    <div className={'champ' + (perfect ? ' perfect' : '')} role="dialog" aria-modal="true" aria-label={perfect ? 'Perfect Season' : 'Champions'}>
      <div className="rays" aria-hidden="true" />
      <div className="champ-body">
        <TrophyArt />
        <span className="eyebrow champ-eyebrow">{perfect ? '82–0 · 16–0' : 'NBA champions'}</span>
        <h1 className="disp champ-title">{perfect ? 'PERFECT SEASON' : 'CHAMPIONS'}</h1>
        <p className="champ-line">
          Beat the {out.finals.opp.year} {out.finals.opp.team} {w}–{l} in the Finals
        </p>
        <div className="champ-stats">
          <span>
            <b className="disp num">
              {season.wins}–{82 - season.wins}
            </b>
            Regular season
          </span>
          <span>
            <b className="disp num">
              {total[0]}–{total[1]}
            </b>
            Playoffs
          </span>
        </div>
      </div>
      <div className="actionbar">
        <button className="big gold shine" onClick={onGo}>
          <span>SEE RESULTS</span>
        </button>
      </div>
      <Confetti density={perfect ? 3 : 2} colors={['#F5B83D', '#FFD36B', '#FFFFFF', '#19E3C9', '#FFE9A8']} />
    </div>
  );
}

function TrophyArt() {
  return (
    <svg className="trophy-art" width="132" height="168" viewBox="0 0 132 168" aria-hidden="true">
      <defs>
        <linearGradient id="tg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B8801A" />
          <stop offset="0.35" stopColor="#FFE29A" />
          <stop offset="0.55" stopColor="#F5B83D" />
          <stop offset="1" stopColor="#9A6610" />
        </linearGradient>
        <radialGradient id="tb" cx="38%" cy="34%" r="70%">
          <stop offset="0" stopColor="#FFF1C4" />
          <stop offset="0.5" stopColor="#F5B83D" />
          <stop offset="1" stopColor="#A86F12" />
        </radialGradient>
      </defs>
      <circle cx="66" cy="30" r="24" fill="url(#tb)" />
      <path d="M44 28 Q66 40 88 28 M66 6 V54 M47 16 Q66 26 85 16" stroke="#8A5A0C" strokeOpacity="0.55" strokeWidth="2" fill="none" />
      <path d="M40 58 H92 L82 116 Q66 124 50 116 Z" fill="url(#tg)" />
      <path d="M50 62 L56 112" stroke="#FFF6D8" strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" />
      <rect x="58" y="118" width="16" height="16" fill="url(#tg)" />
      <path d="M36 134 H96 L102 160 H30 Z" fill="url(#tg)" />
      <rect x="30" y="156" width="72" height="8" rx="2" fill="#8A5A0C" />
    </svg>
  );
}
