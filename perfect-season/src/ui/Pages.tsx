import React, { useEffect, useState } from 'react';
import { BOOSTER_HELP, BOOSTER_NAMES, BOOSTER_PRICES, BOOSTER_UNLOCK_LEVEL, RESPIN_PRICE, levelInfo } from '../engine/economy';
import { gradeFor } from '../engine/rating';
import { type Booster, BOOSTERS, type BotLevel, type Mode } from '../engine/types';
import { bestRuns, type Profile, type RunRecord } from '../lib/profile';
import { Fit, lastName, Sheet } from './common';
import { ArenaHero } from './Hero';
import { Bolt, Calendar, Crown, Home as HomeIcon, Lock, Ranks as RanksIcon, User } from './icons';

export type Tab = 'home' | 'daily' | 'ranks' | 'boosters' | 'profile';
export const TAB_ORDER: Tab[] = ['home', 'daily', 'ranks', 'boosters', 'profile'];

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
      <span className="tab-ind" style={{ transform: 'translateX(' + TAB_ORDER.indexOf(tab) * 100 + '%)' }} aria-hidden="true" />
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

/** The logo letters fly in once per visit, not on every tab switch. */
let introPlayed = false;

export function HomePage(props: {
  profile: Profile;
  dailyNo: number;
  dailyDone: boolean;
  onMode: (m: Mode) => void;
  onBot: (b: BotLevel) => void;
  onPlay: () => void;
  onToast: (t: string) => void;
}) {
  const [intro] = useState(() => !introPlayed);
  useEffect(() => {
    introPlayed = true;
  }, []);
  const p = props.profile;
  const playLabel = p.mode === 'daily' ? (props.dailyDone ? 'PRACTICE DAILY' : 'PLAY DAILY #' + props.dailyNo) : p.mode === '1v1' ? 'FIND A MATCH' : 'PLAY';
  const letters = (word: string, offset: number) =>
    word.split('').map((ch, i) => (
      <i key={i} style={{ animationDelay: offset + i * 45 + 'ms' }}>
        {ch}
      </i>
    ));
  return (
    <div className="page-view home">
      <h1 className={'logo' + (intro ? ' intro' : '')} aria-label="Perfect Season">
        <span className="disp l1" aria-hidden="true">
          {letters('PERFECT', 80)}
        </span>
        <span className="disp l2" aria-hidden="true">
          {letters('SEASON', 300)}
        </span>
      </h1>
      <ArenaHero>
        <div className="jumbo">
          <div className="rec">
            <b className="disp" style={{ color: 'var(--teal)' }}>
              82–0
            </b>
            <span className="eyebrow">Regular season</span>
          </div>
          <span className="disp plus">+</span>
          <div className="rec">
            <b className="disp" style={{ color: 'var(--gold)' }}>
              16–0
            </b>
            <span className="eyebrow">Playoffs</span>
          </div>
        </div>
      </ArenaHero>
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
      <div className="under" key={p.mode}>
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
      <div className="playbar">
        <button className="big shine" onClick={props.onPlay}>
          <Fit text={playLabel} />
        </button>
      </div>
    </div>
  );
}

function HistRow({ r, i = 0 }: { r: RunRecord; i?: number }) {
  const g = gradeFor(r.wins);
  return (
    <div className="histrow rise-in" style={{ animationDelay: Math.min(i, 8) * 40 + 'ms' }}>
      <span className="g disp" style={{ borderColor: g.color, color: g.color }}>
        {r.grade}
      </span>
      <div>
        <strong className="num">
          {r.wins}–{82 - r.wins}
          {r.title ? ' · Champions' : ''}
          {r.vs ? (r.vs.won ? ' · beat bot' : r.vs.won === false ? ' · lost to bot' : ' · tied') : ''}
        </strong>
        <small>{r.lineup.map((x) => lastName(x.name)).join(' · ')}</small>
      </div>
      <small className="mode-tag">{r.mode === '1v1' ? '1v1' : r.mode}</small>
    </div>
  );
}

/** Time left until the next Daily (midnight US Eastern). */
function untilEasternMidnight(): string {
  try {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: 'numeric', second: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
    const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
    const left = 86400 - (get('hour') * 3600 + get('minute') * 60 + get('second'));
    const h = Math.floor(left / 3600);
    const m = Math.floor((left % 3600) / 60);
    return h + 'h ' + String(m).padStart(2, '0') + 'm';
  } catch {
    return '';
  }
}

export function DailyPage(props: { profile: Profile; dailyNo: number; dailyKey: string; onPlay: () => void }) {
  const d = props.profile.daily && props.profile.daily.key === props.dailyKey ? props.profile.daily.record : null;
  const [left, setLeft] = useState(untilEasternMidnight);
  useEffect(() => {
    const t = window.setInterval(() => setLeft(untilEasternMidnight()), 20000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="page-view">
      <div className="page">
        <h1 className="disp">Daily #{props.dailyNo}</h1>
        <p className="lead">Everyone gets the same five spins today, in the same order. Your first try counts and you can share it. After that you can replay it for practice.</p>
        {left && (
          <div className="countdown">
            <span className="eyebrow">Next Daily in</span>
            <b className="disp num">{left}</b>
          </div>
        )}
        {d ? (
          <>
            <span className="eyebrow">Your ranked result</span>
            <HistRow r={d} />
            <p className="note">{d.playoff}</p>
          </>
        ) : (
          <div className="empty">You haven’t played today’s Daily yet.</div>
        )}
      </div>
      <div className="playbar">
        <button className="big shine" onClick={props.onPlay}>
          <Fit text={d ? 'PRACTICE TODAY’S DAILY' : 'PLAY DAILY #' + props.dailyNo} />
        </button>
      </div>
    </div>
  );
}

export function RanksPage(props: { profile: Profile }) {
  const [mode, setMode] = useState<Mode | 'all'>('all');
  const runs = bestRuns(props.profile.history, mode);
  return (
    <div className="page-view">
      <div className="page">
        <h1 className="disp">Your best</h1>
        <div className="chiprow">
          {(['all', 'classic', 'blind', 'daily', '1v1'] as const).map((m) => (
            <button key={m} className={'chip' + (mode === m ? ' on' : '')} aria-pressed={mode === m} onClick={() => setMode(m)}>
              {m === 'all' ? 'ALL' : m === '1v1' ? '1 VS 1' : m.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="list" key={mode}>
          {runs.length ? runs.map((r, i) => <HistRow key={i} r={r} i={i} />) : <div className="empty">Finish a draft to put a team on your board.</div>}
        </div>
        <p className="note">Ranked by regular-season wins, then titles, then team rating. Global leaderboards come with accounts.</p>
      </div>
    </div>
  );
}

export function BoostersPage(props: { profile: Profile; onBuy: (b: Booster) => void }) {
  const lv = levelInfo(props.profile.xp).level;
  return (
    <div className="page-view">
      <div className="page">
        <h1 className="disp">Boosters</h1>
        <p className="lead">Buy with coins you earn by playing. One of each per draft, in Classic and Blind. Extra respins cost {RESPIN_PRICE} coins during a draft.</p>
        {BOOSTERS.map((b, i) => {
          const locked = lv < BOOSTER_UNLOCK_LEVEL[b];
          return (
            <div key={b} className={'storeitem rise-in' + (locked ? ' locked' : '')} style={{ animationDelay: i * 60 + 'ms' }}>
              <span className="level-ring store">
                {locked ? <Lock size={16} /> : b === 'prime' ? <Crown size={16} /> : <b>{props.profile.inventory[b]}</b>}
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
    </div>
  );
}

export function ProfilePage(props: { profile: Profile }) {
  const p = props.profile;
  const lv = levelInfo(p.xp);
  const best = bestRuns(p.history, 'all', 1)[0];
  const stats: [string, string | number][] = [
    ['Drafts', p.stats.games],
    ['Best record', best ? best.wins + '–' + (82 - best.wins) : '—'],
    ['Titles', p.stats.titles],
    ['82–0 seasons', p.stats.undefeated],
    ['Perfect seasons', p.stats.perfect],
    ['1v1 wins', p.stats.vsWins],
  ];
  return (
    <div className="page-view">
      <div className="page">
        <h1 className="disp">Level {lv.level}</h1>
        <span className="bar thick">
          <i style={{ width: Math.round((lv.into / lv.need) * 100) + '%' }} />
        </span>
        <span className="note">
          {lv.into}/{lv.need} XP to level {lv.level + 1}
        </span>
        <div className="statgrid">
          {stats.map(([label, v], i) => (
            <div key={label} className="rise-in" style={{ animationDelay: i * 40 + 'ms' }}>
              <b className="disp num">{v}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <span className="eyebrow">Recent drafts</span>
        {p.history.length ? p.history.slice(0, 20).map((r, i) => <HistRow key={i} r={r} i={i} />) : <div className="empty">No drafts yet. Your history shows up here.</div>}
        <p className="note">Progress is saved on this device. Accounts will let you keep it everywhere.</p>
      </div>
    </div>
  );
}

export function SettingsSheet(props: { profile: Profile; onChange: (k: 'sound' | 'haptics' | 'hints', v: boolean) => void; onReset: () => void; onClose: () => void; source: string; latest: number }) {
  const [confirm, setConfirm] = useState(false);
  const row = (k: 'sound' | 'haptics' | 'hints', label: string) => (
    <div className="toggle">
      <span>{label}</span>
      <button role="switch" aria-checked={props.profile.settings[k]} aria-label={label} onClick={() => props.onChange(k, !props.profile.settings[k])} />
    </div>
  );
  return (
    <Sheet label="Settings" onClose={props.onClose}>
      {(close) => (
        <>
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
              <button className="btn danger" onClick={() => close(props.onReset)}>
                ERASE EVERYTHING
              </button>
            </div>
          ) : (
            <button className="btn" onClick={() => setConfirm(true)}>
              RESET PROGRESS
            </button>
          )}
          <p className="note">
            Every NBA player from 1959–60 through {props.latest - 1}–{String(props.latest).slice(2)}, from {props.source}. Steals and blocks before 1973–74 weren’t recorded and are estimated.
          </p>
          <button className="btn primary" onClick={() => close()}>
            DONE
          </button>
        </>
      )}
    </Sheet>
  );
}

export function HowToSheet({ onClose }: { onClose: () => void }) {
  return (
    <Sheet label="How to play" onClose={onClose}>
      {(close) => (
        <>
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
          <button className="btn primary" onClick={() => close()}>
            GOT IT
          </button>
        </>
      )}
    </Sheet>
  );
}
