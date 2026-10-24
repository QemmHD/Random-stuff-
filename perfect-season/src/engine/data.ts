import raw from '../data/nba.json';
import type { Cell, Player, PlayoffTeam, Slot } from './types';
import { lineValue } from './rating';

type RawPlayer = [string, string, number, number, number, number, number, number, number, number, number, number, string | null, string];
interface RawTeam {
  id: string;
  fr: string;
  abbr: string;
  name: string;
  era: string;
  c1: string;
  c2: string;
  from: number;
  to: number;
  players: RawPlayer[];
}
interface RawData {
  source: string;
  built: number;
  teams: RawTeam[];
  playoff: PlayoffTeam[];
}

const data = raw as unknown as RawData;

export const DATA_SOURCE = data.source;
export const LATEST_SEASON = data.built;

export const CELLS: Cell[] = data.teams.map((t) => ({
  id: t.id,
  fr: t.fr,
  abbr: t.abbr,
  name: t.name,
  era: t.era,
  c1: t.c1,
  c2: t.c2,
  from: t.from,
  to: t.to,
  players: t.players.map((p) => {
    const player: Player = {
      id: t.id + ':' + p[13],
      pid: p[13],
      name: p[0],
      pos: p[1].split('/') as Slot[],
      pts: p[2],
      reb: p[3],
      ast: p[4],
      stl: p[5],
      blk: p[6],
      g: p[7],
      seasons: p[8],
      from: p[9],
      to: p[10],
      est: p[11] === 1,
      primeRef: p[12],
      cellId: t.id,
      abbr: t.abbr,
      era: t.era,
      teamName: t.name,
      c1: t.c1,
      c2: t.c2,
      val: 0,
    };
    player.val = lineValue(player);
    return player;
  }),
}));

export const CELL_BY_ID: Record<string, Cell> = Object.fromEntries(CELLS.map((c) => [c.id, c]));
export const ERAS = ['1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];
export const TEAM_ABBRS = Array.from(new Set(CELLS.map((c) => c.abbr))).sort();
export const PLAYOFF_TEAMS: PlayoffTeam[] = data.playoff;

/** The player's best team-decade line, as a copy that keeps his current cell identity. */
export function primeVersion(p: Player): Player | null {
  if (!p.primeRef) return null;
  const cell = CELL_BY_ID[p.primeRef];
  if (!cell) return null;
  const best = cell.players.find((x) => x.pid === p.pid);
  if (!best || best.val <= p.val) return null;
  return {
    ...p,
    pts: best.pts,
    reb: best.reb,
    ast: best.ast,
    stl: best.stl,
    blk: best.blk,
    est: best.est,
    val: best.val,
    primedFrom: { cellId: cell.id, abbr: cell.abbr, era: cell.era },
  };
}
