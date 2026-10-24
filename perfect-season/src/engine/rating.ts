import type { Line, Player } from './types';

/** Stat weights per game, measured from 82-0 (see research/82-0/README.md §2.5). */
export const W: Line = { pts: 0.33, reb: 0.67, ast: 0.64, stl: 1.2, blk: 1.13 };

/** Team totals of a "near-perfect" lineup, used for the balance check and the breakdown bars. */
export const BENCHMARK = { pts: 125, reb: 55, ast: 32, def: 9 * W.stl + 7 * W.blk };

export const CATEGORY_LABELS = ['Scoring', 'Rebounding', 'Playmaking', 'Defense'];

/**
 * Win curve as [rating, wins] anchors, linear in between. Tuned on simulated drafts
 * (src/engine/sim.test.ts): random picks ≈ 30 wins, best-available ≈ 58,
 * the top ~0.1% of unboosted drafts reach 82-0.
 */
export const WIN_CURVE: [number, number][] = [
  [0, 0],
  [20, 18],
  [32, 30],
  [60, 44],
  [81, 52],
  [89, 58],
  [97.5, 65],
  [103, 70],
  [110, 76],
  [117, 82],
];
export const BALANCE_FLOOR = 0.85;

export function lineValue(l: Line): number {
  return l.pts * W.pts + l.reb * W.reb + l.ast * W.ast + l.stl * W.stl + l.blk * W.blk;
}

export interface TeamRating {
  totals: Line;
  base: number;
  /** scoring, rebounding, playmaking, defense vs the benchmark (1 = benchmark) */
  ratios: [number, number, number, number];
  balance: number;
  rating: number;
  wins: number;
}

function interpolate(x: number, from: 0 | 1): number {
  const to = from === 0 ? 1 : 0;
  const pts = WIN_CURVE;
  if (x <= pts[0][from]) return pts[0][to];
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    if (x <= b[from]) return a[to] + ((x - a[from]) / (b[from] - a[from])) * (b[to] - a[to]);
  }
  return pts[pts.length - 1][to];
}

export function winsFromRating(rating: number): number {
  return Math.max(0, Math.min(82, Math.round(interpolate(rating, 0))));
}

export function ratingForWins(wins: number): number {
  return interpolate(Math.min(82, Math.max(0, wins)), 1);
}

export function rateTeam(players: (Player | null | undefined)[]): TeamRating {
  const totals: Line = { pts: 0, reb: 0, ast: 0, stl: 0, blk: 0 };
  for (const p of players) {
    if (!p) continue;
    totals.pts += p.pts;
    totals.reb += p.reb;
    totals.ast += p.ast;
    totals.stl += p.stl;
    totals.blk += p.blk;
  }
  const base = lineValue(totals);
  const ratios: [number, number, number, number] = [
    totals.pts / BENCHMARK.pts,
    totals.reb / BENCHMARK.reb,
    totals.ast / BENCHMARK.ast,
    (totals.stl * W.stl + totals.blk * W.blk) / BENCHMARK.def,
  ];
  const capped = ratios.map((r) => Math.min(r, 1.25));
  const mean = capped.reduce((a, b) => a + b, 0) / 4;
  const balance = mean > 0 ? Math.min(...capped) / mean : 1;
  const rating = base * (BALANCE_FLOOR + (1 - BALANCE_FLOOR) * balance);
  return { totals, base, ratios, balance, rating, wins: winsFromRating(rating) };
}

export interface Grade {
  min: number;
  letter: string;
  tier: string;
  color: string;
  coins: number;
}

export const GRADES: Grade[] = [
  { min: 82, letter: 'S+', tier: 'Perfect', color: '#F5B83D', coins: 100 },
  { min: 75, letter: 'S', tier: 'Legendary', color: '#F5B83D', coins: 60 },
  { min: 69, letter: 'A+', tier: 'Dynasty', color: '#19E3C9', coins: 55 },
  { min: 63, letter: 'A', tier: 'Juggernaut', color: '#4FD8C6', coins: 50 },
  { min: 57, letter: 'B', tier: 'Contender', color: '#6CB4FF', coins: 40 },
  { min: 50, letter: 'C', tier: 'Playoff Team', color: '#F2A33A', coins: 30 },
  { min: 38, letter: 'D', tier: 'Lottery Bound', color: '#A3B1BC', coins: 25 },
  { min: 0, letter: 'F', tier: 'Rebuilding', color: '#FF7A7A', coins: 20 },
];

export function gradeFor(wins: number): Grade {
  return GRADES.find((g) => wins >= g.min) ?? GRADES[GRADES.length - 1];
}
