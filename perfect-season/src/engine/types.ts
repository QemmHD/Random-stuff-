export type Slot = 'PG' | 'SG' | 'SF' | 'PF' | 'C';
export const SLOTS: Slot[] = ['PG', 'SG', 'SF', 'PF', 'C'];

export type Mode = 'classic' | 'blind' | 'daily' | '1v1';
export type BotLevel = 'rookie' | 'pro' | 'legend';
export type Booster = 'double' | 'trade' | 'prime';
export const BOOSTERS: Booster[] = ['double', 'trade', 'prime'];

export interface Line {
  pts: number;
  reb: number;
  ast: number;
  stl: number;
  blk: number;
}

export interface Player extends Line {
  /** unique per cell: `${cellId}:${pid}` */
  id: string;
  pid: string;
  name: string;
  pos: Slot[];
  g: number;
  seasons: number;
  from: number;
  to: number;
  /** steals/blocks partly estimated (pre-1973-74 seasons) */
  est: boolean;
  primeRef: string | null;
  cellId: string;
  abbr: string;
  era: string;
  teamName: string;
  c1: string;
  c2: string;
  val: number;
  /** set when the Prime booster upgraded this pick */
  primedFrom?: { cellId: string; abbr: string; era: string };
}

export interface Cell {
  id: string;
  fr: string;
  abbr: string;
  name: string;
  era: string;
  c1: string;
  c2: string;
  from: number;
  to: number;
  players: Player[];
}

export interface PlayoffTeam {
  year: string;
  team: string;
  abbr: string;
  w: number;
  l: number;
  w82: number;
  c1: string;
  star: string;
}

export type Lineup = Record<Slot, Player | null>;

export function emptyLineup(): Lineup {
  return { PG: null, SG: null, SF: null, PF: null, C: null };
}
