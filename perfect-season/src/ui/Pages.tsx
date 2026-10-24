import React, { useState } from 'react';
import { BOOSTER_HELP, BOOSTER_NAMES, BOOSTER_PRICES, BOOSTER_UNLOCK_LEVEL, RESPIN_PRICE, levelInfo } from '../engine/economy';
import { gradeFor } from '../engine/rating';
import { type Booster, BOOSTERS, type BotLevel, type Mode } from '../engine/types';
import { bestRuns, type Profile, type RunRecord } from '../lib/profile';
import { Bolt, Calendar, Crown, Home as HomeIcon, Lock, Ranks as RanksIcon, User } from './icons';
import { TopBar } from './common';

export type Tab = 'home' | 'daily' | 'ranks' | 'boosters' | 'profile';

export function Tabs({ tab, onTab }: { tab: Tab; onTab: (t: Tab) => void }) {
  const items: [Tab, string, React.ReactNode][] = [
    ['home', 'HOME', <HomeIcon size={22} />],
    ['daily', 'DAILY', <Calendar size={22} />],
    ['ranks', 'RANKS', <RanksIcon size={22} />],
    ['boosters', 'BOOSTERS', <Bolt size={22} />],
    ['profile', 'PROFILE', <User size={22} />],
  ];
  return (
    <nav className="tabs" aria-label="Main">
      {items.map(([k, label, icon]) => (
        <button key={k} aria-current={tab === k ? 'page' : undefined} onClick={() => onTab(k)}>
          {icon}
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

const MODES: { key: Mode; title: string; sub: string }[] = [
  { key: 'classic', title: 'Classic', sub: 'Stats visible' },
  { key: 'blind', title: 'Blind', sub: 'Stats hidden · +50% rewards' },
  { key: 'daily', title: 'Daily', sub: 'Same spins for everyone' },
  { key: '1v1', title: '1 vs 1', sub: 'Snake draft vs a bot' },
];

export function HomePage(props: {
  profile: Profile;
  dailyNo: number;
  dailyDone: boolean;
  onMode: (m: Mode) => void;
  onBot: (b: BotLevel) => void;
  onPlay: () => void;
  onTab: (t: Tab) => void;
  onSettings: () => void;
  onHelp: () => void;
  onToast: (t: string) => void;
}) {
  const p = props.profile;
  const playLabel = p.mode === 'daily' ? (props.dailyDone ? 'PRACTICE DAILY' : 'PLAY DAILY #' + props.dailyNo) : p.mode === '1v1' ? 'FIND A MATCH' : 'PLAY';
  return (
    <div className="screen home">
      <TopBar xp={p.xp} coins={p.coins} onProfile={() => props.onTab('profile')} onSettings={props.onSettings} onHelp={props.onHelp} />
      <div className="logo">
        <span className="disp" style={{ color: 'var(--teal)' }}>
          PERFECT
        </span>
        <span className="disp">SEASON</span>
      </div>
      <div className="hero">
        <svg width="358" height="176" viewBox="0 0 358 176" style={{ position: 'absolute', left: 0, top: 0 }} aria-hidden="true">
          <circle cx="179" cy="226" r="150" fill="none" stroke="#19E3C9" strokeOpacity="0.18" strokeWidth="2" />
          <circle cx="179" cy="226" r="64" fill="none" stroke="#19E3C9" strokeOpacity="0.18" strokeWidth="2" />
          <line x1="0" y1="166" x2="358" y2="166" stroke="#19E3C9" strokeOpacity="0.18" strokeWidth="2" />
          <circle cx="306" cy="40" r="70" fill="#F5B83D" fillOpacity="0.07" />
          <circle cx="44" cy="36" r="56" fill="#19E3C9" fillOpacity="0.06" />
        </svg>
        <div className="rec">
          <b className="disp" style={{ color: 'var(--teal)' }}>
            82–0
          </b>
          <span className="eyebrow">Regular season</span>
        </div>
        <span className="disp" style={{ fontSize: 36, color: 'var(--sub)', position: 'relative' }}>
          +
        </span>
        <div className="rec">
          <b className="disp" style={{ color: 'var(--gold)' }}>
            16–0
          </b>
          <span className="eyebrow">Playoffs</span>
        </div>
      </div>
      <p className="tagline">Spin a team and a decade. Draft five legends. Go perfect.</p>
      <div className="sports">
        <button className="chip on">NBA</button>
        <button className="chip" onClick={() => props.onToast('NFL and soccer come after the NBA launch.')}>
          NFL · SOON
        </button>
        <button className="chip" onClick={() => props.onToast('NFL and soccer come after the NBA launch.')}>
          SOCCER · SOON
        </button>
      </div>
      <div className="modes" role="group" aria-label="Game mode">
        {MODES.map((m) => (
          <button key={m.key} className="mode" aria-pressed={p.mode === m.key} onClick={() => props.onMode(m.key)}>
            <span className="disp">{m.key === 'daily' ? 'Daily #' + props.dailyNo : m.title}</span>
            <small className={m.key === 'daily' && props.dailyDone ? 'done' : ''}>{m.key === 'daily' && props.dailyDone ? 'Done today · practice only' : m.sub}</small>
          </button>
        ))}
      </div>
      <div className="under">
        {p.mode === '1v1' ? (
          <>
            <span className="eyebrow">Bot</span>
            {(['rookie', 'pro', 'legend'] as BotLevel[]).map((b) => (
              <button key={b} className={'chip rival' + (p.botLevel === b ? ' on' : '')} aria-pressed={p.botLevel === b} onClick={() => props.onBot(b)}>
                {b.toUpperCase()}
              </button>
            ))}
          </>
        ) : p.mode === 'daily' ? (
          <span>Everyone gets today’s same spins. Your first try is ranked.</span>
        ) : p.mode === 'blind' ? (
          <span>Draft from memory. Stats stay hidden until the results.</span>
        ) : (
          <span>1 free team respin and 1 free decade respin every draft.</span>
        )}
      </div>
      <div className="spacer" />
      <div className="pad">
        <button className="big" onClick={props.onPlay}>
          {playLabel}
        </button>
      </div>
      <Tabs tab="home" onTab={props.onTab} />
    </div>
  );
}

function HistRow({ r }: { r: RunRecord }) {
  const g = gradeFor(r.wins);
  return (
    <div className="histrow">
      <span className="g disp" style={{ borderColor: g.color, color: g.color }}>
        {r.grade}
      </span>
      <div>
        <strong className="num">
          {r.wins}–{82 - r.wins}
          {r.title ? ' · Champions' : ''}
          {r.vs ? (r.vs.won ? ' · beat bot' : r.vs.won === false ? ' · lost to bot' : ' · tied') : ''}
        </strong>
        <small>{r.lineup.map((x) => x.name.split(' ').slice(-1)[0]).join(' · ')}</small>
      </div>
      <small style={{ color: 'var(--sub)', fontSize: 11, flexShrink: 0 }}>{r.mode === '1v1' ? '1v1' : r.mode}</small>
    </div>
  );
}

export function DailyPage(props: { profile: Profile; dailyNo: number; dailyKey: string; onPlay: () => void; onTab: (t: Tab) => void }) {
  const d = props.profile.daily && props.profile.daily.key === props.dailyKey ? props.profile.daily.record : null;
  return (
    <div className="screen">
      <TopBar xp={props.profile.xp} coins={props.profile.coins} onProfile={() => props.onTab('profile')} />
      <div className="page">
        <h1 className="disp">Daily #{props.dailyNo}</h1>
        <p style={{ margin: 0, color: 'var(--soft)', lineHeight: 1.5 }}>Everyone gets the same five spins today, in the same order. Your first try counts and you can share it. After that you can replay it for practice. A new puzzle starts at midnight Eastern.</p>
        {d ? (
          <>
            <span className="eyebrow">Your ranked result</span>
            <HistRow r={d} />
            <p style={{ margin: 0, color: 'var(--sub)', fontSize: 13 }}>{d.playoff}</p>
          </>
        ) : (
          <div className="empty">You haven’t played today’s Daily yet.</div>
        )}
        <div className="spacer" />
        <button className="big" onClick={props.onPlay}>
          {d ? 'PRACTICE TODAY’S DAILY' : 'PLAY DAILY #' + props.dailyNo}
        </button>
      </div>
      <Tabs tab="daily" onTab={props.onTab} />
    </div>
  );
}

export function RanksPage(props: { profile: Profile; onTab: (t: Tab) => void }) {
  const [mode, setMode] = useState<Mode | 'all'>('all');
  const runs = bestRuns(props.profile.history, mode);
  return (
    <div className="screen">
      <TopBar xp={props.profile.xp} coins={props.profile.coins} onProfile={() => props.onTab('profile')} />
      <div className="page">
        <h1 className="disp">Your best</h1>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {(['all', 'classic', 'blind', 'daily', '1v1'] as const).map((m) => (
            <button key={m} className={'chip' + (mode === m ? ' on' : '')} aria-pressed={mode === m} onClick={() => setMode(m)}>
              {m === 'all' ? 'ALL' : m === '1v1' ? '1 VS 1' : m.toUpperCase()}
            </button>
          ))}
        </div>
        {runs.length ? runs.map((r, i) => <HistRow key={i} r={r} />) : <div className="empty">Finish a draft to put a team on your board.</div>}
        <p style={{ margin: 0, fontSize: 12, color: 'var(--sub)', lineHeight: 1.5 }}>Ranked by regular-season wins, then titles, then team rating. Global leaderboards come with accounts.</p>
      </div>
      <Tabs tab="ranks" onTab={props.onTab} />
    </div>
  );
}

export function BoostersPage(props: { profile: Profile; onBuy: (b: Booster) => void; onTab: (t: Tab) => void }) {
  const lv = levelInfo(props.profile.xp).level;
  return (
    <div className="screen">
      <TopBar xp={props.profile.xp} coins={props.profile.coins} onProfile={() => props.onTab('profile')} />
      <div className="page">
        <h1 className="disp">Boosters</h1>
        <p style={{ margin: 0, color: 'var(--soft)', lineHeight: 1.5 }}>Buy with coins you earn by playing. One of each per draft, in Classic and Blind. Extra respins cost {RESPIN_PRICE} coins during a draft.</p>
        {BOOSTERS.map((b) => {
          const locked = lv < BOOSTER_UNLOCK_LEVEL[b];
          return (
            <div key={b} className="storeitem">
              <span className="level-ring" style={{ borderColor: locked ? 'var(--line-2)' : 'var(--gold)', color: locked ? 'var(--sub)' : 'var(--gold)' }}>
                {locked ? <Lock size={16} /> : b === 'prime' ? <Crown size={16} /> : props.profile.inventory[b]}
              </span>
              <div>
                <strong>
                  {BOOSTER_NAMES[b]} {locked ? '' : '· you have ' + props.profile.inventory[b]}
                </strong>
                <small>{BOOSTER_HELP[b]}</small>
              </div>
              {locked ? (
                <button className="btn" aria-disabled="true" onClick={() => {}}>
                  LV {BOOSTER_UNLOCK_LEVEL[b]}
                </button>
              ) : (
                <button className="btn gold" onClick={() => props.onBuy(b)}>
                  {BOOSTER_PRICES[b]}
                </button>
              )}
            </div>
          );
        })}
      </div>
      <Tabs tab="boosters" onTab={props.onTab} />
    </div>
  );
}

export function ProfilePage(props: { profile: Profile; onTab: (t: Tab) => void; onSettings: () => void }) {
  const p = props.profile;
  const lv = levelInfo(p.xp);
  const best = bestRuns(p.history, 'all', 1)[0];
  return (
    <div className="screen">
      <TopBar xp={p.xp} coins={p.coins} onProfile={() => {}} onSettings={props.onSettings} />
      <div className="page">
        <h1 className="disp">Level {lv.level}</h1>
        <span className="bar" style={{ height: 8 }}>
          <i style={{ width: Math.round((lv.into / lv.need) * 100) + '%' }} />
        </span>
        <span style={{ fontSize: 12, color: 'var(--sub)' }}>
          {lv.into}/{lv.need} XP to level {lv.level + 1}
        </span>
        <div className="statgrid">
          <div>
            <b className="disp num">{p.stats.games}</b>
            <span>Drafts</span>
          </div>
          <div>
            <b className="disp num">{best ? best.wins + '–' + (82 - best.wins) : '—'}</b>
            <span>Best record</span>
          </div>
          <div>
            <b className="disp num">{p.stats.titles}</b>
            <span>Titles</span>
          </div>
          <div>
            <b className="disp num">{p.stats.undefeated}</b>
            <span>82–0 seasons</span>
          </div>
          <div>
            <b className="disp num">{p.stats.perfect}</b>
            <span>Perfect seasons</span>
          </div>
          <div>
            <b className="disp num">{p.stats.vsWins}</b>
            <span>1v1 wins</span>
          </div>
        </div>
        <span className="eyebrow">Recent drafts</span>
        {p.history.length ? p.history.slice(0, 20).map((r, i) => <HistRow key={i} r={r} />) : <div className="empty">No drafts yet. Your history shows up here.</div>}
        <p style={{ margin: 0, fontSize: 12, color: 'var(--sub)', lineHeight: 1.5 }}>Progress is saved on this device. Accounts will let you keep it everywhere.</p>
      </div>
      <Tabs tab="profile" onTab={props.onTab} />
    </div>
  );
}

export function SettingsSheet(props: { profile: Profile; onChange: (k: 'sound' | 'haptics' | 'hints', v: boolean) => void; onReset: () => void; onClose: () => void; source: string }) {
  const [confirm, setConfirm] = useState(false);
  const row = (k: 'sound' | 'haptics' | 'hints', label: string) => (
    <div className="toggle">
      <span>{label}</span>
      <button role="switch" aria-checked={props.profile.settings[k]} aria-label={label} onClick={() => props.onChange(k, !props.profile.settings[k])} />
    </div>
  );
  return (
    <div className="scrim" role="dialog" aria-modal="true" aria-label="Settings">
      <div className="sheet">
        <h2 className="disp">Settings</h2>
        <div>
          {row('sound', 'Sound')}
          {row('haptics', 'Vibration')}
          {row('hints', 'Booster hints')}
        </div>
        {confirm ? (
          <div className="btnrow">
            <button className="btn" onClick={() => setConfirm(false)}>
              KEEP MY PROGRESS
            </button>
            <button className="btn" style={{ color: 'var(--red)', borderColor: 'var(--red)' }} onClick={props.onReset}>
              ERASE EVERYTHING
            </button>
          </div>
        ) : (
          <button className="btn" onClick={() => setConfirm(true)}>
            RESET PROGRESS
          </button>
        )}
        <p style={{ fontSize: 12, color: 'var(--sub)' }}>Player stats: {props.source}. Steals and blocks before 1973-74 weren’t recorded and are estimated.</p>
        <button className="btn primary" onClick={props.onClose}>
          DONE
        </button>
      </div>
    </div>
  );
}

export function HowToSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className="scrim" role="dialog" aria-modal="true" aria-label="How to play">
      <div className="sheet">
        <h2 className="disp">How to play</h2>
        <p>
          <b>Spin</b> for a random NBA team and decade. Pick any player who played for them then, and place him at a position he actually played. Five rounds fill PG, SG, SF, PF and C.
        </p>
        <p>
          Each player brings his per-game points, rebounds, assists, steals and blocks from his years with that team in that decade. Your team is scored against a near-perfect lineup, and a weak category drags the whole team down.
        </p>
        <p>
          You get <b>1 free team respin and 1 free decade respin</b> per draft. Tap two players on the court to swap their spots.
        </p>
        <p>
          Then the <b>82-game season</b> plays out, followed by four best-of-7 series against real all-time great teams. Go 82–0, then 16–0, for a <b>Perfect Season</b>.
        </p>
        <p>
          <b>Boosters</b> (from level 2): Double Pick takes two players from one team, Trade swaps a teammate for someone better, Prime upgrades a player to his best-ever decade.
        </p>
        <button className="btn primary" onClick={onClose}>
          GOT IT
        </button>
      </div>
    </div>
  );
}
