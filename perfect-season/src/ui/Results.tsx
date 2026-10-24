import React, { useEffect, useMemo, useState } from 'react';
import { BOOSTER_NAMES, levelInfo, type Rewards } from '../engine/economy';
import { CATEGORY_LABELS, gradeFor, type TeamRating } from '../engine/rating';
import type { Booster, Lineup, Player } from '../engine/types';
import { SLOTS } from '../engine/types';
import type { RunRecord } from '../lib/profile';
import { copyText, drawCard, nativeShare, shareText } from '../lib/share';
import { sfx } from '../lib/sound';
import { CoinChip, Confetti } from './common';
import { Back, Share, Trophy } from './icons';

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

export function Results({ info, xp, coins, onAgain, onHome, onToast }: { info: ResultInfo; xp: number; coins: number; onAgain: () => void; onHome: () => void; onToast: (t: string) => void }) {
  const { record: r, rating } = info;
  const g = gradeFor(r.wins);
  const lv = levelInfo(xp);
  const [share, setShare] = useState(false);
  useEffect(() => {
    if (info.levelUps.length) window.setTimeout(() => sfx.levelUp(), 700);
    window.setTimeout(() => sfx.coin(), 300);
  }, []);
  const tag = r.mode === 'daily' && info.dailyNo ? 'DAILY #' + info.dailyNo + (r.ranked ? ' · RANKED' : ' · PRACTICE') : MODE_TAG[r.mode];
  const confetti = r.vs ? (r.vs.won ? 1.4 : 0) : r.perfect ? 3 : r.title ? 2 : g.letter.startsWith('S') || g.letter.startsWith('A') ? 1.2 : g.letter === 'B' ? 0.6 : 0;
  const vs = info.bot;
  const vsTitle = r.vs ? (r.vs.won === true ? 'YOU WON!' : r.vs.won === false ? 'YOU LOST' : 'DRAW') : '';

  return (
    <div className="screen">
      <div className="topbar">
        <button className="icon-btn" style={{ width: 'auto', padding: '0 12px', gap: 6, fontWeight: 800, fontSize: 12, letterSpacing: 1 }} onClick={onHome}>
          <Back size={16} /> HOME
        </button>
        <span className="eyebrow">{tag}</span>
        <CoinChip coins={coins} bump />
      </div>
      <div className="results-body">
        {r.perfect && <div className="perfect disp pop">PERFECT SEASON · 98–0</div>}
        {vs && r.vs ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <span className="eyebrow" style={{ letterSpacing: 3 }}>
                1 vs 1 · snake draft
              </span>
              <span className="disp pop" style={{ fontSize: 56, color: r.vs.won ? 'var(--gold)' : r.vs.won === false ? 'var(--red)' : 'var(--text)' }}>
                {vsTitle}
              </span>
            </div>
            <div className="vs">
              <div>
                <span className="eyebrow" style={{ color: 'var(--teal)' }}>
                  You
                </span>
                <span className="disp num">
                  {r.wins}–{82 - r.wins}
                </span>
                <small style={{ color: 'var(--sub)' }}>Rating {rating.rating.toFixed(1)}</small>
              </div>
              <div className="bot">
                <span className="eyebrow" style={{ color: 'var(--rival-soft)' }}>
                  Bot · {r.vs.botLevel}
                </span>
                <span className="disp num">
                  {r.vs.botWins}–{82 - r.vs.botWins}
                </span>
                <small style={{ color: 'var(--sub)' }}>Rating {vs.rating.rating.toFixed(1)}</small>
              </div>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div className="record pop">
              <b className="disp num">{r.wins}</b>
              <span className="disp">–</span>
              <b className="disp num">{82 - r.wins}</b>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="gradebadge disp" style={{ width: 48, height: 48, fontSize: 24, borderColor: g.color, color: g.color }}>
                {g.letter}
              </span>
              <span className="disp" style={{ fontSize: 26, color: g.color }}>
                {g.tier}
              </span>
            </div>
            <div className="pill" style={{ display: 'flex', alignItems: 'center', gap: 8, color: r.title ? 'var(--gold)' : 'var(--text)', textAlign: 'center' }}>
              {r.title && <Trophy size={18} color="#F5B83D" />}
              <span>{r.playoff}</span>
            </div>
          </div>
        )}

        <div className="card">
          <span className="eyebrow">Team vs a near-perfect lineup</span>
          {rating.ratios.map((x, i) => (
            <div className="catrow" key={i}>
              <span>{CATEGORY_LABELS[i]}</span>
              <span className="bar">
                <i style={{ width: Math.min(100, Math.round(x * 100)) + '%', background: x >= 1 ? 'var(--gold)' : 'var(--teal)' }} />
              </span>
              <b className="num">{Math.round(x * 100)}%</b>
            </div>
          ))}
          <span style={{ fontSize: 12, color: 'var(--sub)' }}>
            Balance {Math.round(rating.balance * 100)}% · team rating {rating.rating.toFixed(1)}
            {rating.balance < 0.8 ? ' · your weakest category is costing you wins' : ''}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {SLOTS.map((k) => {
            const p = info.lineup[k] as Player;
            return (
              <div key={k} className="rosterrow" style={{ background: 'linear-gradient(90deg, ' + p.c1 + ' 0%, #0A1F2A 78%)', borderColor: p.c2 }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span className="eyebrow" style={{ color: 'var(--rival-soft)' }}>
              Bot lineup
            </span>
            {SLOTS.map((k) => {
              const p = vs.lineup[k];
              if (!p) return null;
              return (
                <div key={k} className="histrow" style={{ borderColor: '#2b2552' }}>
                  <span className="disp" style={{ width: 30, color: 'var(--rival-soft)' }}>
                    {k}
                  </span>
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

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="eyebrow">Rewards</span>
            <b className="num" style={{ color: 'var(--gold)' }}>
              +{info.rewards.coins} coins · +{info.rewards.xp} XP
            </b>
          </div>
          <span style={{ fontSize: 12, color: 'var(--sub)', lineHeight: 1.5 }}>{info.rewards.lines.join(' · ')}</span>
          <span className="bar" style={{ height: 8 }}>
            <i style={{ width: Math.round((lv.into / lv.need) * 100) + '%' }} />
          </span>
          <span style={{ fontSize: 12, color: 'var(--sub)' }}>
            Level {lv.level} · {lv.into}/{lv.need} XP to level {lv.level + 1}
          </span>
          {info.levelUps.length > 0 && (
            <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--teal)' }}>
              LEVEL UP! Level {info.levelUps[info.levelUps.length - 1]} · +{50 * info.levelUps.length} coins
              {info.unlocked.length ? ' · ' + info.unlocked.map((b) => BOOSTER_NAMES[b]).join(', ') + ' unlocked (1 free)' : ''}
            </span>
          )}
        </div>
      </div>
      <div className="foot">
        <button className="big ghost small" onClick={() => setShare(true)}>
          SHARE
        </button>
        <button className="big small" onClick={onAgain}>
          DRAFT AGAIN
        </button>
      </div>
      {confetti > 0 && <Confetti density={confetti} />}
      {share && <ShareSheet info={info} onClose={() => setShare(false)} onToast={onToast} />}
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
    <div className="scrim" role="dialog" aria-modal="true" aria-label="Share your result">
      <div className="sheet" style={{ padding: 14 }}>
        {img ? <img className="sharecard" src={img} alt={'Share card: ' + info.record.wins + '–' + (82 - info.record.wins)} /> : null}
        <div className="sharetext">{text}</div>
        <div className="btnrow">
          <button className="btn" onClick={onClose}>
            CLOSE
          </button>
          <button className="btn" onClick={doCopy}>
            COPY TEXT
          </button>
          <button className="btn primary" onClick={doShare} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Share size={16} /> SHARE
          </button>
        </div>
      </div>
    </div>
  );
}
