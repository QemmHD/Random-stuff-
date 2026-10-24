import { CELLS, CELL_BY_ID, primeVersion } from './data';
import { canMove, dailyOrder, draftReducer, eligibleSlots, isDraftComplete, newDraft, nextCell, whyUnavailable } from './draft';
import { levelInfo, rewardsFor } from './economy';
import { buildBracket, playoffOutcome, simSeries } from './playoffs';
import { gradeFor, rateTeam, ratingForWins, winsFromRating } from './rating';
import { rng } from './rng';
import { dailyNumber, playSeason } from './season';
import { autoDraft } from './sim.test';

const find = (cellId: string, name: string) => CELL_BY_ID[cellId].players.find((p) => p.name === name)!;

describe('data', () => {
  it('builds real decade lines', () => {
    const ewing = find('NYK-1990', 'Patrick Ewing');
    expect([ewing.pts, ewing.reb, ewing.ast, ewing.stl, ewing.blk]).toEqual([24.1, 11, 2.2, 0.9, 2.7]);
    const wilt = find('GSW-1960', 'Wilt Chamberlain');
    expect([wilt.pts, wilt.reb]).toEqual([41.5, 25.1]);
    expect(wilt.est).toBe(true);
    expect(CELL_BY_ID['GSW-1960'].name).toBe('San Francisco Warriors');
    expect(CELL_BY_ID['OKC-2000'].name).toBe('Seattle SuperSonics');
  });
  it('has unique player ids and sane cells', () => {
    const ids = new Set<string>();
    for (const c of CELLS) {
      expect(c.players.length).toBeGreaterThanOrEqual(6);
      for (const p of c.players) {
        expect(ids.has(p.id)).toBe(false);
        ids.add(p.id);
        expect(p.pos.length).toBeGreaterThan(0);
      }
    }
  });
  it('gives every player 1 to 3 positions and a unique name in his cell', () => {
    for (const c of CELLS) {
      const names = new Set<string>();
      for (const p of c.players) {
        expect(p.pos.length).toBeGreaterThanOrEqual(1);
        expect(p.pos.length).toBeLessThanOrEqual(3);
        expect(names.has(p.name)).toBe(false);
        names.add(p.name);
      }
    }
    expect(find('CLE-2000', 'LeBron James').pos).toEqual(['SF', 'PF']);
    expect(find('LAL-1980', 'Magic Johnson').pos).toEqual(['PG', 'SG']);
    expect(find('CHI-1990', 'Michael Jordan').pos).toEqual(['SG', 'SF']);
    expect(find('LAC-1990', 'Charles Smith (1997–99)').pos).toEqual(['SG']);
  });
  it('primes a player to his best line', () => {
    const lin = find('BKN-2010', 'Jeremy Lin');
    const up = primeVersion(lin)!;
    expect(up.val).toBeGreaterThan(lin.val);
    expect(up.primedFrom?.cellId).toBe(lin.primeRef);
    expect(up.id).toBe(lin.id);
  });
});

describe('rating', () => {
  it('curve is monotone and invertible', () => {
    let prev = -1;
    for (let r = 0; r <= 130; r += 0.5) {
      const w = winsFromRating(r);
      expect(w).toBeGreaterThanOrEqual(prev);
      prev = w;
    }
    for (const w of [10, 41, 58, 70, 82]) expect(winsFromRating(ratingForWins(w))).toBe(w);
  });
  it('grades', () => {
    expect(gradeFor(82).letter).toBe('S+');
    expect(gradeFor(75).letter).toBe('S');
    expect(gradeFor(62).letter).toBe('B');
    expect(gradeFor(10).tier).toBe('Rebuilding');
  });
  it('penalises an unbalanced team', () => {
    const big = find('GSW-1960', 'Wilt Chamberlain');
    const r1 = rateTeam([big, big, big, big, big]);
    expect(r1.balance).toBeLessThan(1);
    expect(r1.rating).toBeLessThan(r1.base);
  });
});

describe('draft rules', () => {
  it('lands, places and ends a cell', () => {
    let s = newDraft('classic', 'pro', null);
    s = draftReducer(s, { type: 'land', cellId: 'NYK-1990', ptr: 0 });
    const ewing = find('NYK-1990', 'Patrick Ewing');
    // 95% of his career games were at center
    expect(eligibleSlots(s, ewing)).toEqual(['C']);
    s = draftReducer(s, { type: 'place', playerId: ewing.id, slot: 'C' });
    expect(s.lineup.C?.name).toBe('Patrick Ewing');
    expect(s.youDone).toBe(true);
    s = draftReducer(s, { type: 'endCell' });
    expect(s.cellId).toBeNull();
    expect(s.used).toContain('NYK-1990');
  });
  it('rejects ineligible slots and duplicates', () => {
    let s = newDraft('classic', 'pro', null);
    s = draftReducer(s, { type: 'land', cellId: 'NYK-1990', ptr: 0 });
    const ewing = find('NYK-1990', 'Patrick Ewing');
    const same = draftReducer(s, { type: 'place', playerId: ewing.id, slot: 'PG' });
    expect(same.lineup.PG).toBeNull();
    s = draftReducer(s, { type: 'place', playerId: ewing.id, slot: 'C' });
    s = draftReducer(s, { type: 'endCell' });
    s = draftReducer(s, { type: 'land', cellId: 'BKN-2010', ptr: 0 });
    // Lopez only plays C, which Ewing already holds
    expect(whyUnavailable(s, find('BKN-2010', 'Brook Lopez'))).toBe('nofit');
    expect(whyUnavailable(s, find('BKN-2010', 'Deron Williams'))).toBe(null);
  });
  it('never repeats a team-decade in one draft', () => {
    for (let seed = 0; seed < 50; seed++) {
      const s = autoDraft('best', seed);
      expect(new Set(s.used).size).toBe(s.used.length);
      expect(isDraftComplete(s)).toBe(true);
    }
  });
  it('respin keeps the decade (team respin) or the franchise (era respin)', () => {
    let s = newDraft('classic', 'pro', null);
    s = draftReducer(s, { type: 'land', cellId: 'NYK-1990', ptr: 0 });
    const t = nextCell(s, 'team', rng(1));
    expect(CELL_BY_ID[t.cellId].era).toBe('1990s');
    expect(CELL_BY_ID[t.cellId].fr).not.toBe('NYK');
    const e = nextCell(s, 'era', rng(2));
    expect(CELL_BY_ID[e.cellId].fr).toBe('NYK');
    expect(CELL_BY_ID[e.cellId].era).not.toBe('1990s');
  });
  it('double pick takes two players from one cell', () => {
    let s = newDraft('classic', 'pro', null);
    s = draftReducer(s, { type: 'land', cellId: 'CHI-1990', ptr: 0 });
    s = draftReducer(s, { type: 'arm', booster: 'double' });
    s = draftReducer(s, { type: 'place', playerId: find('CHI-1990', 'Michael Jordan').id, slot: 'SG' });
    expect(s.youDone).toBe(false);
    s = draftReducer(s, { type: 'place', playerId: find('CHI-1990', 'Scottie Pippen').id, slot: 'SF' });
    expect(s.youDone).toBe(true);
    expect(s.boostersUsed).toEqual(['double']);
  });
  it('trade replaces an occupied slot', () => {
    let s = newDraft('classic', 'pro', null);
    s = draftReducer(s, { type: 'land', cellId: 'NYK-1990', ptr: 0 });
    s = draftReducer(s, { type: 'place', playerId: find('NYK-1990', 'Charles Oakley').id, slot: 'PF' });
    s = draftReducer(s, { type: 'endCell' });
    s = draftReducer(s, { type: 'land', cellId: 'CHI-1990', ptr: 0 });
    s = draftReducer(s, { type: 'arm', booster: 'trade' });
    const grant = find('CHI-1990', 'Horace Grant');
    expect(eligibleSlots(s, grant)).toEqual(['PF']);
    s = draftReducer(s, { type: 'place', playerId: grant.id, slot: 'PF' });
    expect(s.lineup.PF?.name).toBe('Horace Grant');
    expect(s.boostersUsed).toEqual(['trade']);
  });
  it('prime upgrades the drafted line', () => {
    let s = newDraft('classic', 'pro', null);
    s = draftReducer(s, { type: 'land', cellId: 'BKN-2010', ptr: 0 });
    const lin = find('BKN-2010', 'Jeremy Lin');
    s = draftReducer(s, { type: 'arm', booster: 'prime' });
    s = draftReducer(s, { type: 'prime', playerId: lin.id });
    s = draftReducer(s, { type: 'place', playerId: lin.id, slot: 'PG' });
    expect(s.lineup.PG!.val).toBeGreaterThan(lin.val);
    expect(s.lineup.PG!.primedFrom).toBeTruthy();
  });
  it('moves players only between slots both can play', () => {
    let s = newDraft('classic', 'pro', null);
    s = draftReducer(s, { type: 'land', cellId: 'SAS-2000', ptr: 0 });
    s = draftReducer(s, { type: 'place', playerId: find('SAS-2000', 'Tim Duncan').id, slot: 'C' });
    expect(canMove(s.lineup, 'C', 'PF')).toBe(true);
    expect(canMove(s.lineup, 'C', 'PG')).toBe(false);
    s = draftReducer(s, { type: 'move', from: 'C', to: 'PF' });
    expect(s.lineup.PF?.name).toBe('Tim Duncan');
    expect(s.lineup.C).toBeNull();
  });
  it('daily order is the same for everyone that day', () => {
    expect(dailyOrder('2026-10-24')).toEqual(dailyOrder('2026-10-24'));
    expect(dailyOrder('2026-10-24')).not.toEqual(dailyOrder('2026-10-25'));
    expect(dailyNumber('2026-10-24')).toBe(1);
    const a = autoDraft('best', 1, 'daily');
    const b = autoDraft('best', 99, 'daily');
    expect(a.used.slice(0, 3)).toEqual(b.used.slice(0, 3));
  });
  it('1v1 fills both lineups and alternates first pick', () => {
    for (let seed = 0; seed < 30; seed++) {
      const s = autoDraft('best', seed, '1v1', 'legend');
      expect(Object.values(s.botLineup).every(Boolean)).toBe(true);
      expect(Object.values(s.lineup).every(Boolean)).toBe(true);
    }
  });
});

describe('season and playoffs', () => {
  it('same lineup gives the same season', () => {
    const s = autoDraft('best', 3);
    expect(playSeason(s.lineup)).toEqual(playSeason(s.lineup));
    expect(playSeason(s.lineup).seq.filter((x) => x === 1).length).toBe(playSeason(s.lineup).wins);
  });
  it('a series ends at 4 wins', () => {
    for (let i = 0; i < 200; i++) {
      const g = simSeries(90, 60, { year: '1995-96', team: 'Chicago Bulls', abbr: 'CHI', w: 72, l: 10, w82: 72, c1: '#000', star: '' }, rng(i));
      const w = g.filter((x) => x === 1).length;
      expect(Math.max(w, g.length - w)).toBe(4);
      expect(g.length).toBeLessThanOrEqual(7);
    }
  });
  it('bracket stops after a loss', () => {
    const season = playSeason(autoDraft('random', 5).lineup);
    const b = buildBracket(season, rng(7));
    const firstLoss = b.findIndex((x) => x.played && !x.won);
    if (firstLoss >= 0) expect(b.slice(firstLoss + 1).every((x) => !x.played)).toBe(true);
    expect(playoffOutcome(b).seriesWon).toBeLessThanOrEqual(4);
  });
});

describe('economy', () => {
  it('levels', () => {
    expect(levelInfo(0)).toEqual({ level: 1, into: 0, need: 70 });
    expect(levelInfo(70).level).toBe(2);
    expect(levelInfo(180).level).toBe(3);
    expect(levelInfo(320).level).toBe(4);
    expect(levelInfo(490).level).toBe(5);
    expect(levelInfo(690).level).toBe(6);
  });
  it('rewards', () => {
    expect(rewardsFor({ wins: 60, seriesWon: 2, title: false, mode: 'classic', vsWon: null, botLevel: 'pro', rankedDaily: false })).toMatchObject({ coins: 60, xp: 60 });
    expect(rewardsFor({ wins: 60, seriesWon: 0, title: false, mode: 'blind', vsWon: null, botLevel: 'pro', rankedDaily: false }).coins).toBe(60);
    expect(rewardsFor({ wins: 82, seriesWon: 4, title: true, mode: 'classic', vsWon: null, botLevel: 'pro', rankedDaily: true }).coins).toBe(190);
  });
});
