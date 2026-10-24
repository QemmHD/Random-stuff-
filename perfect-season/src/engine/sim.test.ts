import { CELLS, CELL_BY_ID } from './data';
import { botChoose, draftReducer, eligibleSlots, isDraftComplete, newDraft, nextCell, noOneFits, whyUnavailable, SLOT_PREFERENCE, type DraftState } from './draft';
import { buildBracket, playoffOutcome } from './playoffs';
import { rng } from './rng';
import { playSeason } from './season';
import type { BotLevel, Mode } from './types';

type Strategy = 'random' | 'best' | 'smart';

export function autoDraft(strategy: Strategy, seed: number, mode: Mode = 'classic', bot: BotLevel = 'pro', useRespins = false): DraftState {
  const rand = rng(seed);
  let s = newDraft(mode, bot, mode === 'daily' ? '2026-10-24' : null);
  let guard = 0;
  while (!isDraftComplete(s) && guard++ < 60) {
    if (!s.cellId) {
      const nx = nextCell(s, 'spin', rand);
      s = draftReducer(s, { type: 'land', ...nx });
      if (mode === '1v1' && s.cellsDone % 2 === 1) {
        const b = botChoose(s, s.cellId!, [], rand);
        if (b) s = draftReducer(s, { type: 'bot', playerId: b.player.id, slot: b.slot });
      }
      continue;
    }
    if (noOneFits(s)) {
      const nx = nextCell(s, 'nofit', rand);
      s = draftReducer(s, { type: 'land', ...nx });
      continue;
    }
    const cell = CELL_BY_ID[s.cellId];
    const ok = cell.players.filter((p) => whyUnavailable(s, p) === null);
    if (useRespins && strategy !== 'random') {
      const bestVal = Math.max(...ok.map((p) => p.val));
      if (bestVal < 16 && (s.freeTeam > 0 || s.freeEra > 0)) {
        const kind = s.freeTeam > 0 ? 'team' : 'era';
        s = draftReducer(s, { type: 'respin', kind, paid: false });
        const nx = nextCell(s, kind, rand);
        s = draftReducer(s, { type: 'land', ...nx });
        continue;
      }
    }
    if (!s.youDone) {
      const pick = strategy === 'random' ? ok[Math.floor(rand() * ok.length)] : ok.sort((a, b) => b.val - a.val)[0];
      const slots = eligibleSlots(s, pick);
      const slot = SLOT_PREFERENCE.find((x) => slots.includes(x))!;
      s = draftReducer(s, { type: 'place', playerId: pick.id, slot });
      continue;
    }
    if (mode === '1v1' && !s.botDone) {
      const mine = Object.values(s.lineup).filter(Boolean).map((p) => p!.id);
      const b = botChoose(s, s.cellId, mine, rand);
      if (b) s = draftReducer(s, { type: 'bot', playerId: b.player.id, slot: b.slot });
      else s = { ...s, botDone: true };
      continue;
    }
    s = draftReducer(s, { type: 'endCell' });
  }
  return s;
}

function pct(n: number, d: number) {
  return Math.round((n / d) * 1000) / 10 + '%';
}

describe('calibration', () => {
  it('prints win distributions by strategy', () => {
    const N = 3000;
    for (const strat of ['random', 'best', 'smart'] as Strategy[]) {
      const wins: number[] = [];
      let titles = 0;
      let perfect = 0;
      let undefeated = 0;
      for (let i = 0; i < N; i++) {
        const s = autoDraft(strat, 1000 + i, 'classic', 'pro', strat === 'smart');
        const season = playSeason(s.lineup);
        wins.push(season.wins);
        const out = playoffOutcome(buildBracket(season, rng(5000 + i)));
        if (out.title) titles++;
        if (season.wins === 82) undefeated++;
        if (season.wins === 82 && out.title && out.sweeps === 4) perfect++;
      }
      wins.sort((a, b) => a - b);
      const q = (f: number) => wins[Math.floor(f * (wins.length - 1))];
      console.log(strat, 'p10', q(0.1), 'p50', q(0.5), 'p90', q(0.9), 'max', q(1), '82-0', pct(undefeated, N), 'titles', pct(titles, N), 'perfect', pct(perfect, N));
    }
    expect(CELLS.length).toBeGreaterThan(150);
  });
});
