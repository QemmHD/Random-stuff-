import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { CELL_BY_ID, ERAS, TEAM_ABBRS, primeVersion } from '../engine/data';
import {
  botChoose,
  botPicksFirst,
  canMove,
  currentCell,
  draftReducer,
  effectivePlayer,
  eligibleSlots,
  filledCount,
  isDraftComplete,
  newDraft,
  nextCell,
  noOneFits,
  type DraftState,
  type SpinKind,
  whyUnavailable,
} from '../engine/draft';
import { BOOSTER_NAMES, BOOSTER_PRICES, BOOSTER_UNLOCK_LEVEL, RESPIN_PRICE, levelInfo } from '../engine/economy';
import { rateTeam } from '../engine/rating';
import { type Booster, BOOSTERS, type BotLevel, type Mode, type Player, type Slot, SLOTS } from '../engine/types';
import { sfx } from '../lib/sound';
import { CoinChip, Confirm, initials, lastName, seasonLabel, shortEra } from './common';
import { Back, Crown, Down, Lock, Refresh } from './icons';

const SLOT_XY: Record<Slot, [number, number]> = { C: [70, 62], PF: [236, 62], SF: [26, 176], SG: [280, 176], PG: [153, 216] };
const COURT_ORDER: Slot[] = ['C', 'PF', 'SF', 'SG', 'PG'];
const BAR_LABELS = ['SCORING', 'BOARDS', 'PASSING', 'DEFENSE'];
const MODE_NAMES: Record<Mode, string> = { classic: 'CLASSIC', blind: 'BLIND', daily: 'DAILY', '1v1': '1 VS 1' };
type SortKey = 'val' | 'pts' | 'reb' | 'ast' | 'stl' | 'blk' | 'g';
const SORTS: [SortKey, string][] = [
  ['val', 'VALUE'],
  ['pts', 'PTS'],
  ['reb', 'REB'],
  ['ast', 'AST'],
  ['stl', 'STL'],
  ['blk', 'BLK'],
  ['g', 'GAMES'],
];
const TEAM_MS = 1000;
const ERA_MS = 1300;

export interface DraftProps {
  mode: Mode;
  botLevel: BotLevel;
  dailyKey: string | null;
  coins: number;
  xp: number;
  inventory: Record<Booster, number>;
  hints: boolean;
  firstRun: boolean;
  onSpend: (coins: number) => boolean;
  onBooster: (b: Booster, delta: number) => void;
  onToast: (text: string) => void;
  onExit: () => void;
  onComplete: (s: DraftState) => void;
  onCoachDone: () => void;
}

interface ReelState {
  items: string[];
  key: number;
  moving: boolean;
  landed: number;
}

function strip(final: string, pool: string[], n: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < n; i++) out.push(pool[Math.floor(Math.random() * pool.length)]);
  out.push(final);
  return out;
}

function Reel({ label, era, reel, ms }: { label: string; era?: boolean; reel: ReelState; ms: number }) {
  const [phase, setPhase] = useState<'rest' | 'pre' | 'run'>('rest');
  useEffect(() => {
    if (!reel.key) return;
    setPhase('pre');
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setPhase('run'));
    });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, [reel.key]);
  const n = reel.items.length;
  const y = phase === 'pre' ? 0 : -(n - 1) * 84;
  return (
    <div className={'reel' + (era ? ' era' : '')}>
      <div className="reel-label">{label}</div>
      <div className={'reel-window' + (reel.landed ? ' landed' : '')} key={'w' + reel.landed}>
        <div className={'strip' + (reel.moving ? ' moving' : '')} style={{ transform: 'translateY(' + y + 'px)', transition: phase === 'run' && reel.moving ? 'transform ' + ms + 'ms cubic-bezier(.15,.65,.2,1)' : 'none' }}>
          {reel.items.map((t, i) => (
            <div key={i} aria-hidden={i !== n - 1}>
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Draft(props: DraftProps) {
  const { mode, botLevel, dailyKey } = props;
  const [s, dispatch] = useReducer(draftReducer, undefined, () => newDraft(mode, botLevel, dailyKey));
  const sRef = useRef(s);
  sRef.current = s;
  const [team, setTeam] = useState<ReelState>({ items: ['?'], key: 0, moving: false, landed: 0 });
  const [era, setEra] = useState<ReelState>({ items: ['?'], key: 0, moving: false, landed: 0 });
  const [spinning, setSpinning] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [swapFrom, setSwapFrom] = useState<Slot | null>(null);
  const [lastPlaced, setLastPlaced] = useState<Slot | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>('val');
  const [coach, setCoach] = useState(props.firstRun ? 0 : -1);
  const [buy, setBuy] = useState<Booster | null>(null);
  const [leaving, setLeaving] = useState(false);
  const [botBusy, setBotBusy] = useState(false);
  const timers = useRef<number[]>([]);
  const usedSeen = useRef(0);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  useEffect(() => () => timers.current.forEach((t) => clearTimeout(t)), []);

  const blind = mode === 'blind';
  const boostersOn = mode === 'classic' || mode === 'blind';
  const cell = currentCell(s);
  const level = levelInfo(props.xp).level;
  const filled = filledCount(s.lineup);
  const complete = isDraftComplete(s);

  // a booster was spent inside the reducer: take it from the inventory
  useEffect(() => {
    if (s.boostersUsed.length > usedSeen.current) {
      const b = s.boostersUsed[s.boostersUsed.length - 1];
      usedSeen.current = s.boostersUsed.length;
      props.onBooster(b, -1);
    }
  }, [s.boostersUsed]);

  // after the user's pick(s): end the cell, or let the bot answer in 1v1
  useEffect(() => {
    if (!s.cellId || !s.youDone) return;
    if (mode === '1v1' && !s.botDone) {
      setBotBusy(true);
      const cellId = s.cellId;
      later(() => {
        const st = sRef.current;
        const mine = Object.values(st.lineup).filter(Boolean).map((p) => (p as Player).id);
        const pick = botChoose(st, cellId, mine, Math.random);
        if (pick) {
          dispatch({ type: 'bot', playerId: pick.player.id, slot: pick.slot });
          props.onToast('Bot took ' + pick.player.name + ' for ' + pick.slot + '.');
          sfx.select();
        }
        dispatch({ type: 'endCell' });
        setBotBusy(false);
      }, 850);
      return;
    }
    if (s.botDone) later(() => dispatch({ type: 'endCell' }), 250);
  }, [s.youDone, s.botDone, s.cellId]);

  const spin = (kind: SpinKind) => {
    const st = sRef.current;
    if (spinning) return;
    const cur = currentCell(st);
    if (kind === 'team' || kind === 'era') {
      if (!cur || st.youDone || (mode === '1v1' && st.taken.length)) {
        props.onToast(cur ? 'Respins only work before anyone picks this round.' : 'Spin first, then you can respin.');
        sfx.nope();
        return;
      }
      const free = kind === 'team' ? st.freeTeam : st.freeEra;
      if (free <= 0) {
        if (!props.onSpend(RESPIN_PRICE)) {
          props.onToast('A respin costs ' + RESPIN_PRICE + ' coins. You can earn more by playing.');
          sfx.nope();
          return;
        }
        props.onToast('Respin bought: −' + RESPIN_PRICE + ' coins.');
        dispatch({ type: 'respin', kind, paid: true });
      } else dispatch({ type: 'respin', kind, paid: false });
    }
    const nx = nextCell(st, kind, Math.random);
    const target = CELL_BY_ID[nx.cellId];
    const spinTeam = kind !== 'era' || !cur || cur.abbr !== target.abbr;
    const spinEra = kind !== 'team' || !cur || cur.era !== target.era;
    setSpinning(true);
    setDrawer(false);
    setSelected(null);
    setSwapFrom(null);
    sfx.spinStart();
    const total = spinEra ? (spinTeam ? ERA_MS : TEAM_MS) : TEAM_MS;
    // ticks slow down like a real reel
    let t = 0;
    let gap = 45;
    while (t < total - 120) {
      later(() => sfx.tick(), t);
      t += gap;
      gap *= 1.09;
    }
    if (spinTeam) setTeam((r) => ({ items: strip(target.abbr, TEAM_ABBRS, 22), key: r.key + 1, moving: true, landed: r.landed }));
    if (spinEra) setEra((r) => ({ items: strip(target.era, ERAS, 18), key: r.key + 1, moving: true, landed: r.landed }));
    if (spinTeam)
      later(() => {
        setTeam((r) => ({ ...r, moving: false, landed: r.landed + 1 }));
        sfx.stop();
      }, TEAM_MS);
    later(
      () => {
        if (spinEra) {
          setEra((r) => ({ ...r, moving: false, landed: r.landed + 1 }));
          sfx.stop();
        }
        dispatch({ type: 'land', cellId: nx.cellId, ptr: nx.ptr });
        setSpinning(false);
        const after = draftReducer(sRef.current, { type: 'land', cellId: nx.cellId, ptr: nx.ptr });
        if (botPicksFirst(after)) {
          setBotBusy(true);
          later(() => {
            const pick = botChoose(sRef.current, nx.cellId, [], Math.random);
            if (pick) {
              dispatch({ type: 'bot', playerId: pick.player.id, slot: pick.slot });
              props.onToast('Bot picks first this round: ' + pick.player.name + '.');
            }
            setBotBusy(false);
            setDrawer(true);
          }, 700);
        } else setDrawer(true);
        if (coach === 0) setCoach(1);
      },
      spinEra ? (spinTeam ? ERA_MS : TEAM_MS) : TEAM_MS
    );
  };

  const selectedBase = cell && selected ? cell.players.find((p) => p.id === selected) ?? null : null;
  const selectedP = selectedBase ? effectivePlayer(s, selectedBase) : null;
  const targets = selectedP ? eligibleSlots(s, selectedP) : [];

  const pickRow = (p: Player) => {
    if (s.youDone || botBusy) return;
    if (s.armed === 'prime') {
      const up = primeVersion(p);
      if (!up) {
        props.onToast(p.name + ' has no better team-decade line to prime.');
        sfx.nope();
        return;
      }
      if (whyUnavailable(s, p) === 'taken' || whyUnavailable(s, p) === 'dup') {
        props.onToast(p.name + " isn't available.");
        return;
      }
      dispatch({ type: 'prime', playerId: p.id });
      sfx.levelUp();
      props.onToast(p.name + ' primed: now his ' + up.primedFrom!.abbr + ' ' + up.primedFrom!.era + ' line.');
      const why = whyUnavailable({ ...s, armed: null }, up);
      if (why === null) {
        setSelected(p.id);
        setDrawer(false);
      }
      return;
    }
    const why = whyUnavailable(s, effectivePlayer(s, p));
    if (why) {
      props.onToast(p.name + ': ' + (why === 'taken' ? 'taken by the bot.' : why === 'dup' ? 'already on your team.' : s.armed === 'trade' ? "can't replace anyone on your team." : 'no open spot for his positions.'));
      sfx.nope();
      return;
    }
    sfx.select();
    setSelected(p.id);
    setSwapFrom(null);
    setDrawer(false);
    if (coach === 1) setCoach(2);
  };

  const tapSlot = (k: Slot) => {
    if (selectedP) {
      if (!targets.includes(k)) {
        props.onToast(s.lineup[k] && s.armed !== 'trade' ? k + ' is taken. Tap a glowing spot.' : selectedP.name + " can't play " + k + '.');
        sfx.nope();
        return;
      }
      const replaced = s.armed === 'trade' ? s.lineup[k] : null;
      const stillDouble = s.armed === 'double' && s.picksLeft === 2 && filled < 4;
      dispatch({ type: 'place', playerId: selectedP.id, slot: k });
      sfx.place();
      setLastPlaced(k);
      setSelected(null);
      if (replaced) props.onToast('Traded ' + replaced.name + ' for ' + selectedP.name + '.');
      if (stillDouble) {
        later(() => setDrawer(true), 450);
        props.onToast('Double Pick: choose one more from this team.');
      }
      if (coach === 2) {
        setCoach(-1);
        props.onCoachDone();
      }
      return;
    }
    const here = s.lineup[k];
    if (swapFrom) {
      if (swapFrom === k) {
        setSwapFrom(null);
        return;
      }
      if (canMove(s.lineup, swapFrom, k)) {
        const mover = s.lineup[swapFrom]!;
        dispatch({ type: 'move', from: swapFrom, to: k });
        sfx.place();
        setLastPlaced(k);
        props.onToast(here ? 'Swapped ' + lastName(mover.name) + ' and ' + lastName(here.name) + '.' : lastName(mover.name) + ' moved to ' + k + '.');
      } else {
        props.onToast("Those two can't swap spots.");
        sfx.nope();
      }
      setSwapFrom(null);
      return;
    }
    if (here) {
      setSwapFrom(k);
      sfx.select();
      props.onToast('Tap a spot to move ' + lastName(here.name) + ', or tap him again to cancel.');
      return;
    }
    if (cell && !s.youDone) {
      setDrawer(true);
      return;
    }
    props.onToast('Spin to get a team and a decade.');
  };

  const tapBooster = (b: Booster) => {
    if (!boostersOn) return;
    if (level < BOOSTER_UNLOCK_LEVEL[b]) {
      props.onToast(BOOSTER_NAMES[b] + ' unlocks at level ' + BOOSTER_UNLOCK_LEVEL[b] + '.');
      sfx.nope();
      return;
    }
    if (s.boostersUsed.includes(b)) {
      props.onToast('One ' + BOOSTER_NAMES[b] + ' per draft.');
      return;
    }
    if (s.armed === b) {
      dispatch({ type: 'arm', booster: null });
      setSelected(null);
      return;
    }
    if (!cell || s.youDone || spinning) {
      props.onToast('Spin first, then use ' + BOOSTER_NAMES[b] + ' on that team.');
      return;
    }
    if (b === 'double' && 5 - filled < 2) {
      props.onToast('Double Pick needs two open spots.');
      return;
    }
    if (b === 'trade' && filled === 0) {
      props.onToast('Trade needs someone on your team to swap out.');
      return;
    }
    if (props.inventory[b] <= 0) {
      setBuy(b);
      return;
    }
    if (s.armed === 'double') dispatch({ type: 'arm', booster: null });
    dispatch({ type: 'arm', booster: b });
    setSelected(null);
    setDrawer(true);
    sfx.click();
  };

  const rating = rateTeam(SLOTS.map((k) => s.lineup[k]));
  const rows = useMemo(() => {
    if (!cell) return [];
    const list = cell.players.slice();
    if (blind) list.sort((a, b) => a.name.localeCompare(b.name));
    else list.sort((a, b) => (sortKey === 'val' ? b.val - a.val : (b[sortKey] as number) - (a[sortKey] as number)));
    return list;
  }, [cell, blind, sortKey]);

  const primeHints = boostersOn && props.hints && cell && !s.youDone && level >= BOOSTER_UNLOCK_LEVEL.prime && !s.boostersUsed.includes('prime') && s.armed !== 'prime'
    ? cell.players.some((p) => {
        const up = primeVersion(p);
        return up && up.val - p.val >= 5 && whyUnavailable(s, up) === null;
      })
    : false;

  // bottom action
  const noFit = noOneFits(s);
  let action = { label: 'SPIN', cls: 'big pulse', off: false, run: () => spin('spin') };
  if (spinning) action = { label: 'SPINNING…', cls: 'big', off: true, run: () => {} };
  else if (complete) action = { label: mode === '1v1' ? 'SEE THE MATCHUP' : 'PLAY THE SEASON', cls: 'big gold pulse', off: false, run: () => props.onComplete(s) };
  else if (botBusy) action = { label: 'BOT IS PICKING…', cls: 'big', off: true, run: () => {} };
  else if (cell && !s.youDone) {
    if (noFit) action = { label: 'NO ONE FITS · FREE RESPIN', cls: 'big small', off: false, run: () => spin('nofit') };
    else if (selectedP) action = { label: 'TAP A GLOWING SPOT', cls: 'big', off: true, run: () => props.onToast('Tap one of the glowing spots on the court.') };
    else action = { label: drawer ? 'PICK A PLAYER' : 'SHOW PLAYERS', cls: 'big ghost', off: false, run: () => setDrawer(true) };
  } else if (cell && s.youDone) action = { label: 'NEXT ROUND…', cls: 'big', off: true, run: () => {} };

  const respinOff = spinning || !cell || s.youDone || botBusy || (mode === '1v1' && s.taken.length > 0);
  const roundNo = Math.min(5, filled + 1);

  const armedText: Record<Booster, string> = {
    double: 'DOUBLE PICK: choose ' + s.picksLeft + ' more from this team',
    trade: 'TRADE: pick a player, then tap the teammate he replaces',
    prime: 'PRIME: tap a player with a crown to upgrade him',
  };

  const trayEl = (
        <div className="tray">
          {BOOSTERS.map((b) => {
            const locked = level < BOOSTER_UNLOCK_LEVEL[b];
            const used = s.boostersUsed.includes(b);
            return (
              <button
                key={b}
                className={'boost' + (locked ? ' locked' : '') + (s.armed === b ? ' armed' : '') + (used ? ' used' : '')}
                onClick={() => tapBooster(b)}
                aria-pressed={s.armed === b}
                aria-label={BOOSTER_NAMES[b] + (locked ? ', unlocks at level ' + BOOSTER_UNLOCK_LEVEL[b] : ', you have ' + props.inventory[b])}
              >
                {locked ? <Lock size={13} /> : b === 'prime' ? <Crown size={13} /> : null}
                <span>{b === 'double' ? 'DOUBLE' : BOOSTER_NAMES[b].toUpperCase()}</span>
                {locked ? <span>LV{BOOSTER_UNLOCK_LEVEL[b]}</span> : <em>{props.inventory[b]}</em>}
              </button>
            );
          })}
        </div>
  );

  return (
    <div className="screen">
      <div className="draft-head">
        <button className="icon-btn" onClick={() => (filled ? setLeaving(true) : props.onExit())} aria-label="Leave draft">
          <Back size={18} />
        </button>
        <div className="round">
          <span>
            ROUND {roundNo} / 5 · {MODE_NAMES[mode]}
          </span>
          <div className="segs">
            {[0, 1, 2, 3, 4].map((i) => (
              <i key={i} className={i < filled ? 'on' : ''} />
            ))}
          </div>
        </div>
        <CoinChip coins={props.coins} />
      </div>

      <div className="reels">
        <Reel label="TEAM" reel={team} ms={TEAM_MS} />
        <Reel label="DECADE" era reel={era} ms={ERA_MS} />
      </div>
      <div className="respins">
        <button className={'respin' + (s.freeTeam ? ' free' : '')} aria-disabled={respinOff} onClick={() => spin('team')} aria-label="Respin team">
          <Refresh size={15} /> TEAM · {s.freeTeam ? 'FREE' : RESPIN_PRICE}
        </button>
        <button className={'respin era' + (s.freeEra ? ' free' : '')} aria-disabled={respinOff} onClick={() => spin('era')} aria-label="Respin decade">
          <Refresh size={15} /> DECADE · {s.freeEra ? 'FREE' : RESPIN_PRICE}
        </button>
      </div>

      {s.armed ? (
        <div className="armed-banner" role="status">
          <span>{armedText[s.armed]}</span>
          <button onClick={() => dispatch({ type: 'arm', booster: null })}>CANCEL</button>
        </div>
      ) : blind ? (
        <div className="cats" style={{ gridTemplateColumns: '1fr' }}>
          <div className="cat">
            <div style={{ justifyContent: 'center' }}>BLIND MODE · STATS HIDDEN · +50% REWARDS</div>
          </div>
        </div>
      ) : (
        <div className="cats" aria-label="Team so far">
          {rating.ratios.map((x, i) => (
            <div className="cat" key={i}>
              <div>
                <span>{BAR_LABELS[i]}</span>
                <b className="num">{Math.round(x * 100)}%</b>
              </div>
              <span className="bar">
                <i style={{ width: Math.min(100, Math.round(x * 100)) + '%', background: x >= 1 ? 'var(--gold)' : 'var(--teal)' }} />
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="court">
        <svg width="390" height="330" viewBox="0 0 390 330" aria-hidden="true">
          <rect x="0" y="0" width="390" height="330" fill="#071B24" />
          <path d="M25 0 L25 95 A178 178 0 0 0 365 95 L365 0" fill="none" stroke="#19E3C9" strokeOpacity="0.22" strokeWidth="2" />
          <rect x="135" y="0" width="120" height="150" fill="#19E3C9" fillOpacity="0.04" stroke="#19E3C9" strokeOpacity="0.22" strokeWidth="2" />
          <circle cx="195" cy="150" r="58" fill="none" stroke="#19E3C9" strokeOpacity="0.22" strokeWidth="2" />
          <line x1="165" y1="18" x2="225" y2="18" stroke="#F2F6F7" strokeOpacity="0.5" strokeWidth="3" />
          <circle cx="195" cy="30" r="10" fill="none" stroke="#F5B83D" strokeWidth="2.5" />
          <line x1="0" y1="329" x2="390" y2="329" stroke="#19E3C9" strokeOpacity="0.22" strokeWidth="2" />
          <path d="M135 330 A60 60 0 0 1 255 330" fill="none" stroke="#19E3C9" strokeOpacity="0.22" strokeWidth="2" />
        </svg>
        {COURT_ORDER.map((k) => {
          const p = s.lineup[k];
          const [x, y] = SLOT_XY[k];
          const glow = !!selectedP && targets.includes(k);
          const moverOk = swapFrom && swapFrom !== k && canMove(s.lineup, swapFrom, k);
          const cls = ['slot'];
          if (p) {
            cls.push('filled');
            if (lastPlaced === k) cls.push('drop');
            if (swapFrom === k) cls.push('picked');
            if (moverOk) cls.push('target');
            if (glow) cls.push('trade');
          } else if (glow || moverOk) cls.push('glow');
          return (
            <button
              key={k + (p ? p.id : '')}
              className={cls.join(' ')}
              style={{ left: x, top: y, ...(p ? { background: 'linear-gradient(160deg, ' + p.c1 + ' 0%, #061016 140%)', borderColor: swapFrom === k ? 'var(--teal)' : p.c2 } : {}) }}
              onClick={() => tapSlot(k)}
              aria-label={p ? k + ': ' + p.name + '. Tap to move.' : k + ': empty' + (glow ? ', tap to place' : '')}
            >
              {p ? (
                <>
                  {p.primedFrom && (
                    <span className="crown">
                      <Crown size={12} />
                    </span>
                  )}
                  <span className="top">
                    <span>{k}</span>
                    {!blind && <b className="num">{p.val.toFixed(0)}</b>}
                  </span>
                  <span className="ini">{initials(p.name)}</span>
                  <span className="nm">{lastName(p.name)}</span>
                  <span className="sub">
                    {p.abbr} {shortEra(p.era)}
                  </span>
                </>
              ) : (
                <>
                  <span className="key">{k}</span>
                  {(glow || moverOk) && <span className="plus">+</span>}
                </>
              )}
            </button>
          );
        })}
      </div>

      {boostersOn && trayEl}
      {primeHints && (
        <div className="under" style={{ minHeight: 0, marginTop: 6, color: 'var(--gold)' }}>
          Good moment for a Prime: someone here has a much better decade elsewhere.
        </div>
      )}
      {mode === '1v1' && (
        <div className="botstrip" aria-label="Bot lineup">
          <span>BOT · {botLevel.toUpperCase()}</span>
          {SLOTS.map((k) => {
            const p = s.botLineup[k];
            return (
              <span key={k} className={'botchip' + (p ? ' on' : '')} style={p ? { background: p.c1 } : undefined} title={p ? p.name : k}>
                {p ? initials(p.name) : k}
              </span>
            );
          })}
        </div>
      )}

      <div className="spacer" />
      <div className="pad" style={{ paddingBottom: 16 }}>
        <button className={action.cls} aria-disabled={action.off} onClick={action.run}>
          {action.label}
        </button>
      </div>

      <div className={'drawer' + (drawer && cell ? ' open' : '')} aria-hidden={!(drawer && cell)}>
        {cell && (
          <>
            <div className="drawer-head">
              <div>
                <span className="disp">
                  {cell.abbr} · <span style={{ textTransform: 'none' }}>{cell.era}</span>
                </span>
                <small>
                  {cell.name} · {seasonLabel(cell.from)} to {seasonLabel(cell.to)}
                </small>
              </div>
              <button className="icon-btn" onClick={() => setDrawer(false)} aria-label="Hide players" style={{ color: 'var(--gold)' }}>
                <Down size={18} />
              </button>
            </div>
            {s.armed && (
              <div className="armed-banner" role="status" style={{ margin: '0 16px 10px 16px' }}>
                <span>{armedText[s.armed]}</span>
                <button onClick={() => dispatch({ type: 'arm', booster: null })}>CANCEL</button>
              </div>
            )}
            {!blind && (
              <div className="sorts" role="group" aria-label="Sort players">
                {SORTS.map(([k, label]) => (
                  <button key={k} className={'chip' + (sortKey === k ? ' on' : '')} aria-pressed={sortKey === k} onClick={() => setSortKey(k)}>
                    {label}
                  </button>
                ))}
              </div>
            )}
            <div className="rows">
              {rows.map((base) => {
                const p = effectivePlayer(s, base);
                const why = whyUnavailable(s, p);
                const up = s.armed === 'prime' ? primeVersion(base) : null;
                const show = up ?? p;
                const tag =
                  why === 'taken' ? 'TAKEN BY THE BOT' : why === 'dup' ? 'ALREADY ON YOUR TEAM' : why === 'nofit' ? (s.armed === 'trade' ? "CAN'T REPLACE ANYONE" : 'NO OPEN SPOT') : p.primedFrom ? 'PRIMED: ' + p.primedFrom.abbr + ' ' + p.primedFrom.era : up ? 'PRIME: ' + up.primedFrom!.abbr + ' ' + up.primedFrom!.era : '';
                const off = !!why || (s.armed === 'prime' && !up);
                const statCls = (k: SortKey) => (up ? 'up' : sortKey === k ? 'hot' : '');
                return (
                  <button key={base.id} className={'row' + (off ? ' off' : '') + (selected === base.id ? ' sel' : '') + (up && !why ? ' primeable' : '')} aria-disabled={off} onClick={() => pickRow(base)}>
                    <span className="who">
                      <b>{p.name}</b>
                      <span>
                        {p.pos.join(' • ')} · {p.g} G{p.seasons > 1 ? ' · ' + p.seasons + ' seasons' : ''}
                        {p.est && !blind ? ' · est. STL/BLK' : ''}
                      </span>
                      {tag && <em>{tag}</em>}
                    </span>
                    <span className="stats">
                      {(['pts', 'reb', 'ast', 'stl', 'blk'] as const).map((k) => (
                        <span key={k}>
                          <i>{k.toUpperCase()}</i>
                          <b className={blind ? '' : statCls(k)}>{blind ? '?' : show[k].toFixed(1)}</b>
                        </span>
                      ))}
                    </span>
                  </button>
                );
              })}
            </div>
            {boostersOn && <div style={{ borderTop: '1px solid var(--line)', paddingBottom: 10 }}>{trayEl}</div>}
          </>
        )}
      </div>

      {coach >= 0 && !spinning && ((coach === 0 && !cell && filled === 0) || (coach === 1 && drawer && cell) || (coach === 2 && selectedP)) && (
        <div className="coach" style={coach === 0 ? { bottom: 96 } : coach === 1 ? { top: 150 } : { top: 226 }}>
          <span>{coach === 0 ? 'Tap SPIN to roll a random team and decade.' : coach === 1 ? 'Pick any player. Faded players don’t fit an open spot.' : 'Now tap a glowing spot on the court to place him.'}</span>
          <button
            onClick={() => {
              setCoach(-1);
              props.onCoachDone();
            }}
          >
            SKIP TIPS
          </button>
        </div>
      )}

      {buy && (
        <Confirm
          title={'Buy ' + BOOSTER_NAMES[buy] + '?'}
          body={'You have none left. Buy one for ' + BOOSTER_PRICES[buy] + ' coins (you have ' + props.coins + ').'}
          yes={'BUY · ' + BOOSTER_PRICES[buy]}
          no="NOT NOW"
          tone="gold"
          onNo={() => setBuy(null)}
          onYes={() => {
            const b = buy;
            setBuy(null);
            if (!props.onSpend(BOOSTER_PRICES[b])) {
              props.onToast('Not enough coins yet. Play a few games to earn more.');
              sfx.nope();
              return;
            }
            sfx.coin();
            props.onBooster(b, 1);
            if (s.armed === 'double') dispatch({ type: 'arm', booster: null });
            dispatch({ type: 'arm', booster: b });
            setSelected(null);
            setDrawer(true);
          }}
        />
      )}
      {leaving && (
        <Confirm
          title="Leave this draft?"
          body="Your picks so far will be lost."
          yes="LEAVE"
          no="KEEP DRAFTING"
          onNo={() => setLeaving(false)}
          onYes={() => {
            setLeaving(false);
            props.onExit();
          }}
        />
      )}
    </div>
  );
}
