import { type Rand, hashString, rng, shuffle } from './rng';
import { rateTeam, type TeamRating } from './rating';
import { type Lineup, SLOTS } from './types';

export interface Season extends TeamRating {
  /** 82 results in order, 1 = win. Same lineup -> same sequence. */
  seq: number[];
  longestWin: number;
  firstHalfWins: number;
}

export function lineupKey(l: Lineup): string {
  return SLOTS.map((s) => (l[s] ? l[s]!.id + (l[s]!.primedFrom ? '*' : '') : '-')).join('|');
}

export function playSeason(l: Lineup): Season {
  const r = rateTeam(SLOTS.map((s) => l[s]));
  const seq = seasonSequence(r.wins, rng(hashString('season:' + lineupKey(l))));
  return { ...r, seq, longestWin: longestRun(seq, 1), firstHalfWins: seq.slice(0, 41).filter((x) => x === 1).length };
}

export function seasonSequence(wins: number, rand: Rand): number[] {
  const a: number[] = [];
  for (let i = 0; i < 82; i++) a.push(i < wins ? 1 : 0);
  return shuffle(a, rand);
}

export function longestRun(seq: number[], v: number): number {
  let best = 0;
  let cur = 0;
  for (const x of seq) {
    if (x === v) {
      cur++;
      if (cur > best) best = cur;
    } else cur = 0;
  }
  return best;
}

/** Calendar day in US Eastern time, e.g. "2026-10-24". */
export function easternDateKey(d: Date = new Date()): string {
  try {
    return d.toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
  } catch {
    return d.toISOString().slice(0, 10);
  }
}

/** Daily puzzle number: #1 is 2026-10-24 (launch day). */
export function dailyNumber(key: string): number {
  const t = Date.UTC(Number(key.slice(0, 4)), Number(key.slice(5, 7)) - 1, Number(key.slice(8, 10)));
  return Math.floor((t - Date.UTC(2026, 9, 24)) / 86400000) + 1;
}
