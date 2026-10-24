import { CELLS, CELL_BY_ID, primeVersion } from './data';
import { type Rand, hashString, pickOne, rng, shuffle } from './rng';
import { type Booster, type BotLevel, type Cell, type Lineup, type Mode, type Player, type Slot, SLOTS, emptyLineup } from './types';

export const SLOT_PREFERENCE: Slot[] = ['C', 'PG', 'PF', 'SG', 'SF'];

export interface DraftState {
  mode: Mode;
  botLevel: BotLevel;
  /** daily: shared cell order for everyone that day */
  order: string[] | null;
  ptr: number;
  lineup: Lineup;
  botLineup: Lineup;
  /** every cell shown this draft, so none repeats */
  used: string[];
  cellId: string | null;
  /** cells fully picked from (1v1 alternates who picks first by this count) */
  cellsDone: number;
  freeTeam: number;
  freeEra: number;
  picksLeft: number;
  youDone: boolean;
  botDone: boolean;
  /** players in the current cell taken by the bot */
  taken: string[];
  armed: Booster | null;
  /** primed versions of players in the current cell */
  primed: Record<string, Player>;
  boostersUsed: Booster[];
}

export function newDraft(mode: Mode, botLevel: BotLevel, dailyKey: string | null): DraftState {
  return {
    mode,
    botLevel,
    order: mode === 'daily' && dailyKey ? dailyOrder(dailyKey) : null,
    ptr: 0,
    lineup: emptyLineup(),
    botLineup: emptyLineup(),
    used: [],
    cellId: null,
    cellsDone: 0,
    freeTeam: 1,
    freeEra: 1,
    picksLeft: 0,
    youDone: false,
    botDone: false,
    taken: [],
    armed: null,
    primed: {},
    boostersUsed: [],
  };
}

export function dailyOrder(dailyKey: string): string[] {
  return shuffle(CELLS.map((c) => c.id), rng(hashString('perfect-season-daily:' + dailyKey)));
}

export function filledCount(l: Lineup): number {
  return SLOTS.filter((s) => l[s]).length;
}

export function openSlots(l: Lineup): Slot[] {
  return SLOTS.filter((s) => !l[s]);
}

export function currentCell(s: DraftState): Cell | null {
  return s.cellId ? CELL_BY_ID[s.cellId] : null;
}

export function botPicksFirst(s: DraftState): boolean {
  return s.mode === '1v1' && s.cellsDone % 2 === 1;
}

export function isDraftComplete(s: DraftState): boolean {
  if (filledCount(s.lineup) < 5) return false;
  if (s.mode === '1v1') return filledCount(s.botLineup) === 5 && s.cellId === null;
  return s.cellId === null;
}

/** The version of a player the user would draft right now (primed if the Prime booster was used on him). */
export function effectivePlayer(s: DraftState, p: Player): Player {
  return s.primed[p.id] ?? p;
}

export type Unavailable = 'taken' | 'dup' | 'nofit' | null;

export function whyUnavailable(s: DraftState, p: Player): Unavailable {
  if (s.taken.includes(p.id)) return 'taken';
  if (Object.values(s.lineup).some((x) => x && x.pid === p.pid)) {
    // Trade lets you replace a slot, but you still can't hold the same person twice
    return 'dup';
  }
  const targets = s.armed === 'trade' ? SLOTS.filter((x) => s.lineup[x]) : openSlots(s.lineup);
  if (!p.pos.some((x) => targets.includes(x))) return 'nofit';
  return null;
}

export function eligibleSlots(s: DraftState, p: Player): Slot[] {
  if (s.armed === 'trade') return SLOTS.filter((x) => s.lineup[x] && p.pos.includes(x));
  return openSlots(s.lineup).filter((x) => p.pos.includes(x));
}

export function noOneFits(s: DraftState): boolean {
  const cell = currentCell(s);
  if (!cell || s.youDone) return false;
  return cell.players.every((p) => whyUnavailable(s, p) !== null);
}

export type SpinKind = 'spin' | 'team' | 'era' | 'nofit';

/** Choose the next team-decade. Random by franchise then decade, never repeating within a draft. */
export function nextCell(s: DraftState, kind: SpinKind, rand: Rand): { cellId: string; ptr: number } {
  const cur = currentCell(s);
  const blocked = new Set(s.used.concat(cur ? [cur.id] : []));
  if (s.order) {
    let ptr = s.ptr;
    while (ptr < s.order.length && blocked.has(s.order[ptr])) ptr++;
    return { cellId: s.order[Math.min(ptr, s.order.length - 1)], ptr: ptr + 1 };
  }
  let pool = CELLS.filter((c) => !blocked.has(c.id));
  if (kind === 'team' && cur) {
    const same = pool.filter((c) => c.era === cur.era && c.fr !== cur.fr);
    if (same.length) pool = same;
  }
  if (kind === 'era' && cur) {
    const same = pool.filter((c) => c.fr === cur.fr && c.era !== cur.era);
    if (same.length) pool = same;
  }
  if (!pool.length) pool = CELLS.filter((c) => !cur || c.id !== cur.id);
  const franchises = Array.from(new Set(pool.map((c) => c.fr)));
  const fr = pickOne(franchises, rand);
  const cell = pickOne(pool.filter((c) => c.fr === fr), rand);
  return { cellId: cell.id, ptr: s.ptr };
}

/** Bot's choice from a cell for its open slots. */
export function botChoose(s: DraftState, cellId: string, excludeIds: string[], rand: Rand): { slot: Slot; player: Player } | null {
  const cell = CELL_BY_ID[cellId];
  const open = openSlots(s.botLineup);
  if (!open.length) return null;
  const held = new Set(Object.values(s.botLineup).filter(Boolean).map((p) => (p as Player).pid));
  const all = cell.players.filter((p) => !excludeIds.includes(p.id) && !held.has(p.pid)).sort((a, b) => b.val - a.val);
  let cands = all.filter((p) => p.pos.some((x) => open.includes(x)));
  let anySlot = false;
  if (!cands.length) {
    cands = all;
    anySlot = true;
  }
  if (!cands.length) return null;
  let player: Player;
  if (s.botLevel === 'rookie') {
    player = cands[Math.floor(rand() * Math.max(1, Math.ceil(cands.length * 0.5)))];
  } else if (s.botLevel === 'pro') {
    player = cands.length > 1 && rand() < 0.3 ? cands[1] : cands[0];
  } else {
    // Legend: best value, preferring players for the scarcest open slot
    player = cands[0];
  }
  const slot = anySlot ? open[0] : SLOT_PREFERENCE.find((x) => open.includes(x) && player.pos.includes(x))!;
  return { slot, player };
}

export type DraftAction =
  | { type: 'land'; cellId: string; ptr: number }
  | { type: 'respin'; kind: 'team' | 'era' | 'nofit'; paid: boolean }
  | { type: 'arm'; booster: Booster | null }
  | { type: 'prime'; playerId: string }
  | { type: 'place'; playerId: string; slot: Slot }
  | { type: 'move'; from: Slot; to: Slot }
  | { type: 'bot'; playerId: string; slot: Slot }
  | { type: 'endCell' };

export function draftReducer(s: DraftState, a: DraftAction): DraftState {
  switch (a.type) {
    case 'land': {
      const used = s.cellId ? s.used.concat([s.cellId]) : s.used;
      return { ...s, used, cellId: a.cellId, ptr: a.ptr, picksLeft: 1, youDone: false, botDone: s.mode !== '1v1', taken: [], armed: null, primed: {} };
    }
    case 'respin': {
      if (a.kind === 'team' && !a.paid) return { ...s, freeTeam: Math.max(0, s.freeTeam - 1) };
      if (a.kind === 'era' && !a.paid) return { ...s, freeEra: Math.max(0, s.freeEra - 1) };
      return s;
    }
    case 'arm': {
      if (a.booster === 'double') return { ...s, armed: 'double', picksLeft: 2 };
      if (a.booster === null && s.armed === 'double') return { ...s, armed: null, picksLeft: 1 };
      return { ...s, armed: a.booster };
    }
    case 'prime': {
      const cell = currentCell(s);
      const p = cell?.players.find((x) => x.id === a.playerId);
      const up = p ? primeVersion(p) : null;
      if (!up) return s;
      return { ...s, primed: { ...s.primed, [up.id]: up }, armed: null, boostersUsed: s.boostersUsed.concat(['prime']) };
    }
    case 'place': {
      const cell = currentCell(s);
      const base = cell?.players.find((x) => x.id === a.playerId);
      if (!cell || !base || s.youDone) return s;
      const p = effectivePlayer(s, base);
      if (!p.pos.includes(a.slot)) return s;
      const trading = s.armed === 'trade';
      if (trading ? !s.lineup[a.slot] : !!s.lineup[a.slot]) return s;
      const lineup = { ...s.lineup, [a.slot]: p };
      const boostersUsed = trading ? s.boostersUsed.concat(['trade']) : s.armed === 'double' && s.picksLeft === 2 ? s.boostersUsed.concat(['double']) : s.boostersUsed;
      const picksLeft = s.picksLeft - 1;
      const done = picksLeft <= 0 || filledCount(lineup) === 5;
      return { ...s, lineup, picksLeft: Math.max(0, picksLeft), youDone: done, armed: done ? null : s.armed === 'trade' ? null : s.armed, boostersUsed };
    }
    case 'move': {
      const mover = s.lineup[a.from];
      const other = s.lineup[a.to];
      if (!mover || !mover.pos.includes(a.to)) return s;
      if (other && !other.pos.includes(a.from)) return s;
      return { ...s, lineup: { ...s.lineup, [a.to]: mover, [a.from]: other } };
    }
    case 'bot': {
      const cell = currentCell(s);
      const p = cell?.players.find((x) => x.id === a.playerId);
      if (!p || s.botLineup[a.slot]) return s;
      return { ...s, botLineup: { ...s.botLineup, [a.slot]: p }, taken: s.taken.concat([p.id]), botDone: true };
    }
    case 'endCell': {
      if (!s.cellId) return s;
      return { ...s, used: s.used.concat([s.cellId]), cellId: null, cellsDone: s.cellsDone + 1, picksLeft: 0, armed: null, primed: {}, taken: [] };
    }
  }
}

export function canMove(l: Lineup, from: Slot, to: Slot): boolean {
  const mover = l[from];
  const other = l[to];
  if (!mover || from === to || !mover.pos.includes(to)) return false;
  return !other || other.pos.includes(from);
}
