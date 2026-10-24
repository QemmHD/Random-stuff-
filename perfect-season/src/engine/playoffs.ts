import { PLAYOFF_TEAMS } from './data';
import { ratingForWins, type TeamRating } from './rating';
import { type Rand, pickOne } from './rng';
import type { PlayoffTeam } from './types';

export const ROUND_NAMES = ['First Round', 'Conference Semifinals', 'Conference Finals', 'NBA Finals'];
/** Opponent strength by round, in 82-game wins */
export const ROUND_POOLS: [number, number][] = [
  [50, 55],
  [55, 59],
  [59, 63],
  [64, 82],
];
/** Spread of the per-game win chance; higher = more upsets */
export const SERIES_K = 16;
export const HOME_EDGE = 0.04;

export interface Series {
  round: number;
  opp: PlayoffTeam;
  oppRating: number;
  /** 1 = we won that game */
  games: number[];
  played: boolean;
  won: boolean;
}

export function gameWinChance(ourRating: number, oppRating: number): number {
  return 1 / (1 + Math.exp(-(ourRating - oppRating) / SERIES_K));
}

export function simSeries(ourRating: number, ourWins: number, opp: PlayoffTeam, rand: Rand): number[] {
  const oppRating = ratingForWins(opp.w82);
  const p = gameWinChance(ourRating, oppRating);
  const highSeed = ourWins >= opp.w82;
  const games: number[] = [];
  let a = 0;
  let b = 0;
  for (let g = 0; a < 4 && b < 4; g++) {
    const highHome = g === 0 || g === 1 || g === 4 || g === 6;
    const ourHome = highSeed ? highHome : !highHome;
    const pg = Math.min(0.97, Math.max(0.03, p + (ourHome ? HOME_EDGE : -HOME_EDGE)));
    if (rand() < pg) {
      games.push(1);
      a++;
    } else {
      games.push(0);
      b++;
    }
  }
  return games;
}

export function pickOpponents(rand: Rand, pool: PlayoffTeam[] = PLAYOFF_TEAMS): PlayoffTeam[] {
  const chosen: PlayoffTeam[] = [];
  for (const [lo, hi] of ROUND_POOLS) {
    const options = pool.filter((t) => t.w82 >= lo && t.w82 <= hi && !chosen.some((c) => c.year === t.year && c.team === t.team));
    chosen.push(pickOne(options.length ? options : pool, rand));
  }
  return chosen;
}

export function buildBracket(season: TeamRating, rand: Rand): Series[] {
  const opps = pickOpponents(rand);
  let alive = true;
  return opps.map((opp, round) => {
    const s: Series = { round, opp, oppRating: ratingForWins(opp.w82), games: [], played: alive, won: false };
    if (alive) {
      s.games = simSeries(season.rating, season.wins, opp, rand);
      s.won = s.games.filter((x) => x === 1).length === 4;
      if (!s.won) alive = false;
    }
    return s;
  });
}

export interface PlayoffOutcome {
  seriesWon: number;
  title: boolean;
  sweeps: number;
  lostTo: Series | null;
  finals: Series;
}

export function playoffOutcome(bracket: Series[]): PlayoffOutcome {
  const played = bracket.filter((b) => b.played);
  return {
    seriesWon: played.filter((b) => b.won).length,
    title: played.length === 4 && played.every((b) => b.won),
    sweeps: played.filter((b) => b.won && b.games.length === 4).length,
    lostTo: played.find((b) => !b.won) ?? null,
    finals: bracket[3],
  };
}

export function seriesScore(games: number[]): [number, number] {
  const w = games.filter((x) => x === 1).length;
  return [w, games.length - w];
}
