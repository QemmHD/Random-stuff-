import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { BOOSTER_NAMES, LEVEL_UP_COINS, levelInfo, type Rewards } from '../engine/economy';
import { CATEGORY_LABELS, gradeFor, type TeamRating } from '../engine/rating';
import type { Booster, Lineup, Player } from '../engine/types';
import { SLOTS } from '../engine/types';
import type { RunRecord } from '../lib/profile';
import { copyText, drawCard, nativeShare, shareText } from '../lib/share';
import { sfx } from '../lib/sound';
import { frameRect, useLayout } from '../stage';
import { CoinChip, Confetti, Sheet } from './common';
import { Back, Coin, Share, Trophy } from './icons';
import { CountUp, reducedMotion } from './motion';

export interface ResultInfo {
  record: RunRecord;
  rating: TeamRating;
  lineup: Lineup;
  bot?: { lineup: Lineup; rating: TeamRating };
  rewards: Rewards;
  levelUps: number[];
  unlocked: Booster[];
  dailyNo: number | null;
}

const MODE_TAG: Record<string, string> = { classic: 'CLASSIC', blind: 'BLIND', daily: 'DAILY', '1v1': '1 VS 1' };

/** XP bar that fills from the old total to the new one, wrapping once per level gained. */
function XpBar({ before, after }: { before: number; after: number }) {
  const a = levelInfo(before);
  const b = levelInfo(after);
  const [w, setW] = useState(a.into / a.need);
  const [instant, setInstant] = useState(false);
  useEffect(() => {
    if (reducedMotion()) {
      setW(b.into / b.need);
      return;
    }
    const ts: number[] = [];
    if (b.level > a.level) {
      ts.push(window.setTimeout(() => setW(1), 900));
      ts.push(
        window.setTimeout(() => {
          setInstant(true);
          setW(0);
        }, 1650)
      );
      ts.push(
        window.setTimeout(() => {
          setInstant(false);
          setW(b.into / b.need);
        }, 1720)
      );
    } else ts.push(window.setTimeout(() => setW(b.into / b.need), 900));
    return () => ts.forEach(clearTimeout);
  }, []);
  return (
    <span className="bar xpbar">
      <i style={{ width: Math.round(w * 1000) / 10 + '%', transition: instant ? 'none' : undefined }} />
    </span>
  );
}

/** Coins fly from the record up into the coin counter, which then counts up. */
function CoinFlight({ from, to, n }: { from: React.RefObject<HTMLElement>; to: React.RefObject<HTMLElement>; n: number }) {
  const box = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const root = box.current?.parentElement;
    const a = from.current;
    const b = to.current;
    if (!root || !a || !b || reducedMotion()) return;
    // frame coordinates, so this works on a scaled or sideways-turned frame
    const rr = frameRect(root);
    const ra = frameRect(a);
    const rb = frameRect(b);
    const x0 = ra.x + ra.w / 2 - rr.x;
    const y0 = ra.y + ra.h / 2 - rr.y;
    const x1 = rb.x + 18 - rr.x;
    const y1 = rb.y + rb.h / 2 - rr.y;
    const coins = [...(box.current?.children ?? [])] as HTMLElement[];
    coins.forEach((c, i) => {
      const sx = x0 + (Math.random() - 0.5) * 120;
      const sy = y0 + (Math.random() - 0.5) * 50;
      const mx = (sx + x1) / 2 + (Math.random() - 0.5) * 80;
      const my = Math.min(sy, y1) - 40 - Math.random() * 50;
      c.animate(
        [
          { transform: 'translate(' + x0 + 'px,' + y0 + 'px) scale(0.3)', opacity: 0 },
          { transform: 'translate(' + sx + 'px,' + sy + 'px) scale(1.15)', opacity: 1, offset: 0.25 },
          { transform: 'translate(' + mx + 'px,' + my + 'px) scale(0.95)', opacity: 1, offset: 0.62 },
          { transform: 'translate(' + x1 + 'px,' + y1 + 'px) scale(0.55)', opacity: 0.9 },
        ],
        { duration: 900, delay: 350 + i * 55, easing: 'cubic-bezier(.45,.05,.55,.95)', fill: 'both' }
      ).onfinish = () => (c.style.visibility = 'hidden');
    });
  }, []);
  return (
    <div className="coinflight" ref={box} aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <span key={i}>
          <Coin size={20} />
        </span>
      ))}
    </div>
  );
}

export function Results({ info, xp, coins, onAgain, onHome, onToast }: { info: ResultInfo; xp: number; coins: number; onAgain: () => void; onHome: () => void; onToast: (t: string) => void }) {
  const { record: r, rating } = info;
  const g = gradeFor(r.wins);
  const lv = levelInfo(xp);
  const [share, setShare] = useState(false);
  const [levelPop, setLevelPop] = useState(false);
  const [grow, setGrow] = useState(false);
  const gained = info.rewards.coins + LEVEL_UP_COINS * info.levelUps.length;
  const chipRef = useRef<HTMLSpanElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ts = [window.setTimeout(() => setGrow(true), 60), window.setTimeout(() => sfx.coin(), 1250)];
    if (info.levelUps.length)
      ts.push(
        window.setTimeout(() => {
          setLevelPop(true);
          sfx.levelUp();
        }, 2100)
      );
    return () => ts.forEach(clearTimeout);
  }, []);
  const tag = r.mode === 'daily' && info.dailyNo ? 'DAILY #' + info.dailyNo + (r.ranked ? ' · RANKED' : ' · PRACTICE') : MODE_TAG[r.mode];
  const confetti = r.vs ? (r.vs.won ? 1.4 : 0) : r.perfect ? 1.4 : r.title ? 0.8 : g.letter.startsWith('S') || g.letter.startsWith('A') ? 1.2 : g.letter === 'B' ? 0.6 : 0;
  const vs = info.bot;
  const vsTitle = r.vs ? (r.vs.won === true ? 'YOU WON!' : r.vs.won === false ? 'YOU LOST' : 'DRAW') : '';

  return (
    <div className="screen results">
      <div className="topbar">
        <button className="icon-btn pill-btn" onClick={onHome}>
          <Back size={16} /> HOME
        </button>
        <span className="eyebrow">{tag}</span>
        <span ref={chipRef} className="chipwrap">
          <CoinChip coins={coins} from={coins - gained} delay={1250} />
        </span>
      </div>
      <div className="results-body">
        {r.perfect && <div className="perfect disp">PERFECT SEASON · 98–0</div>}
        {vs && r.vs ? (
          <>
            <div className="vs-head" ref={headRef}>
              <span className="eyebrow wide">1 vs 1 · snake draft</span>
              <span className={'disp vs-title stamp-in ' + (r.vs.won ? 'win' : r.vs.won === false ? 'loss' : '')}>{vsTitle}</span>
            </div>
            <div className="vs">
              <div className="rise-in">
                <span className="eyebrow" style={{ color: 'var(--teal)' }}>
                  You
                </span>
                <span className="disp num">
                  <CountUp value={r.wins} from={0} ms={900} />–<CountUp value={82 - r.wins} from={0} ms={900} />
                </span>
                <small>Rating {rating.rating.toFixed(1)}</small>
              </div>
              <div className="bot rise-in" style={{ animationDelay: '90ms' }}>
                <span className="eyebrow" style={{ color: 'var(--rival-soft)' }}>
                  Bot · {r.vs.botLevel}
                </span>
                <span className="disp num">
                  <CountUp value={r.vs.botWins} from={0} ms={900} />–<CountUp value={82 - r.vs.botWins} from={0} ms={900} />
                </span>
                <small>Rating {vs.rating.rating.toFixed(1)}</small>
              </div>
            </div>
          </>
        ) : (
          <div className="headline" ref={headRef}>
            <div className="record">
              <b className="disp num">
                <CountUp value={r.wins} from={0} ms={900} />
              </b>
              <span className="disp">–</span>
              <b className="disp num">
                <CountUp value={82 - r.wins} from={0} ms={900} />
              </b>
            </div>
            <div className="gradeline small">
              <span className="gradebadge disp stamp delayed" style={{ borderColor: g.color, color: g.color }}>
                {g.letter}
              </span>
              <span className="disp tier rise-in" style={{ color: g.color, animationDelay: '820ms' }}>
                {g.tier}
              </span>
            </div>
            <div className={'pill outcome rise-in' + (r.title ? ' gold' : '')} style={{ animationDelay: '950ms' }}>
              {r.title && <Trophy size={18} color="#F5B83D" />}
              <span>{r.playoff}</span>
            </div>
          </div>
        )}

        <div className="card rise-in" style={{ animationDelay: '200ms' }}>
          <span className="eyebrow">Team vs a near-perfect lineup</span>
          {rating.ratios.map((x, i) => (
            <div className="catrow" key={i}>
              <span>{CATEGORY_LABELS[i]}</span>
              <span className="bar">
                <i style={{ width: grow ? Math.min(100, Math.round(x * 100)) + '%' : '0%', transitionDelay: 250 + i * 110 + 'ms' }} className={x >= 1 ? 'full' : ''} />
              </span>
              <b className="num">{Math.round(x * 100)}%</b>
            </div>
          ))}
          <span className="note">
            Balance {Math.round(rating.balance * 100)}% · team rating {rating.rating.toFixed(1)}
            {rating.balance < 0.8 ? ' · your weakest category is costing you wins' : ''}
          </span>
        </div>

        <div className="roster">
          {SLOTS.map((k, i) => {
            const p = info.lineup[k] as Player;
            return (
              <div key={k} className="rosterrow rise-in" style={{ background: 'linear-gradient(90deg, ' + p.c1 + ' 0%, #0A1F2A 78%)', borderColor: p.c2, animationDelay: 320 + i * 60 + 'ms' }}>
                <span className="disp">{k}</span>
                <div>
                  <strong>
                    {p.name}
                    {p.primedFrom ? ' ★' : ''}
                  </strong>
                  <small>
                    {p.teamName} · {p.era}
                    {p.primedFrom ? ' · primed to ' + p.primedFrom.abbr + ' ' + p.primedFrom.era : ''}
                  </small>
                </div>
                <b className="num">{p.val.toFixed(1)}</b>
              </div>
            );
          })}
        </div>

        {vs && (
          <div className="roster">
            <span className="eyebrow" style={{ color: 'var(--rival-soft)' }}>
              Bot lineup
            </span>
            {SLOTS.map((k) => {
              const p = vs.lineup[k];
              if (!p) return null;
              return (
                <div key={k} className="histrow bot">
                  <span className="disp slotkey">{k}</span>
                  <div>
                    <strong>{p.name}</strong>
                    <small>
                      {p.abbr} · {p.era}
                    </small>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="card rise-in" style={{ animationDelay: '420ms' }}>
          <div className="rewards-head">
            <span className="eyebrow">Rewards</span>
            <b className="num">
              +<CountUp value={info.rewards.coins} from={0} ms={900} delay={500} /> coins · +<CountUp value={info.rewards.xp} from={0} ms={900} delay={500} /> XP
            </b>
          </div>
          <span className="note">{info.rewards.lines.join(' · ')}</span>
          <XpBar before={xp - info.rewards.xp} after={xp} />
          <span className="note">
            Level {lv.level} · {lv.into}/{lv.need} XP to level {lv.level + 1}
          </span>
          {info.levelUps.length > 0 && (
            <span className="levelline">
              LEVEL UP! Level {info.levelUps[info.levelUps.length - 1]} · +{LEVEL_UP_COINS * info.levelUps.length} coins
              {info.unlocked.length ? ' · ' + info.unlocked.map((b) => BOOSTER_NAMES[b]).join(', ') + ' unlocked (1 free)' : ''}
            </span>
          )}
        </div>
      </div>
      <div className="foot">
        <button className="big ghost small" onClick={() => setShare(true)}>
          <span>SHARE</span>
        </button>
        <button className="big small shine" onClick={onAgain}>
          <span>DRAFT AGAIN</span>
        </button>
      </div>
      {gained > 0 && <CoinFlight from={headRef} to={chipRef} n={Math.min(12, 4 + Math.round(gained / 15))} />}
      {confetti > 0 && <Confetti density={confetti} />}
      {share && <ShareSheet info={info} onClose={() => setShare(false)} onToast={onToast} />}
      {levelPop && (
        <Sheet label="Level up" kind="center" onClose={() => setLevelPop(false)}>
          {(close) => (
            <div className="levelup">
              <span className="levelup-ring">
                <i />
                <b className="disp">{info.levelUps[info.levelUps.length - 1]}</b>
              </span>
              <h2 className="disp">Level up!</h2>
              <p>
                +{LEVEL_UP_COINS * info.levelUps.length} coins
                {info.unlocked.length ? '. ' + info.unlocked.map((b) => BOOSTER_NAMES[b]).join(' and ') + ' unlocked, with 1 free to start.' : '.'}
              </p>
              <button className="btn primary" onClick={() => close()}>
                NICE
              </button>
            </div>
          )}
        </Sheet>
      )}
    </div>
  );
}

function ShareSheet({ info, onClose, onToast }: { info: ResultInfo; onClose: () => void; onToast: (t: string) => void }) {
  const text = shareText(info.record, info.dailyNo);
  const colors = useMemo(() => {
    const out: Record<string, string> = {};
    for (const k of SLOTS) {
      const p = info.lineup[k];
      if (p) out[p.abbr + p.era] = p.c1;
    }
    return out;
  }, [info]);
  const img = useMemo(() => drawCard(info.record, colors, info.dailyNo), [info, colors]);
  // keep the buttons on screen: the card gets whatever height the text and buttons leave
  const { content } = useLayout();
  const cardMax = Math.max(170, Math.round(content - 310));
  const doShare = async () => {
    if (await nativeShare(text, img)) return;
    if (await copyText(text)) onToast('Copied. Paste it anywhere. Long-press the card to save the image.');
    else onToast('Sharing is blocked here. Select the text below to copy it.');
  };
  const doCopy = async () => {
    if (await copyText(text)) onToast('Copied to clipboard.');
    else onToast('Copy is blocked here. Select the text below instead.');
  };
  return (
    <Sheet label="Share your result" onClose={onClose}>
      {(close) => (
        <>
          {img ? <img className="sharecard" src={img} style={{ maxHeight: cardMax }} alt={'Share card: ' + info.record.wins + '–' + (82 - info.record.wins)} /> : null}
          <div className="sharetext">{text}</div>
          <div className="btnrow">
            <button className="btn" onClick={() => close()}>
              CLOSE
            </button>
            <button className="btn" onClick={doCopy}>
              COPY TEXT
            </button>
            <button className="btn primary withicon" onClick={doShare}>
              <Share size={16} /> SHARE
            </button>
          </div>
        </>
      )}
    </Sheet>
  );
}
