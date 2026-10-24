import React, { useEffect, useRef, useState } from 'react';
import { DATA_SOURCE } from './engine/data';
import type { DraftState } from './engine/draft';
import { BOOSTER_PRICES, LEVEL_UP_COINS, levelInfo, rewardsFor, unlockedAt } from './engine/economy';
import { buildBracket, playoffOutcome, ROUND_NAMES, type Series, seriesScore } from './engine/playoffs';
import { gradeFor, rateTeam, type TeamRating } from './engine/rating';
import { hashString, rng } from './engine/rng';
import { dailyNumber, easternDateKey, lineupKey, playSeason, type Season } from './engine/season';
import { type Booster, type BotLevel, type Mode, SLOTS } from './engine/types';
import { freshProfile, loadProfile, type Profile, type RunRecord, saveProfile } from './lib/profile';
import { setFeedback, sfx } from './lib/sound';
import { Toast } from './ui/common';
import { Draft } from './ui/Draft';
import { BoostersPage, DailyPage, HomePage, HowToSheet, ProfilePage, RanksPage, SettingsSheet, type Tab } from './ui/Pages';
import { type ResultInfo, Results } from './ui/Results';
import { Playoffs, Reveal } from './ui/Season';

type Screen = 'tab' | 'draft' | 'reveal' | 'playoffs' | 'results';

interface Run {
  id: number;
  mode: Mode;
  botLevel: BotLevel;
  dailyKey: string | null;
  ranked: boolean;
  draft?: DraftState;
  season?: Season;
  bracket?: Series[];
  result?: ResultInfo;
}

const MODE_LABEL: Record<Mode, string> = { classic: 'Classic', blind: 'Blind', daily: 'Daily', '1v1': '1 vs 1' };

function playoffLine(bracket: Series[]): { text: string; title: boolean; perfect: boolean } {
  const out = playoffOutcome(bracket);
  if (out.title) {
    const [w, l] = seriesScore(out.finals.games);
    return { text: 'Champions: beat the ' + out.finals.opp.year + ' ' + out.finals.opp.team + ' ' + w + '–' + l + ' in the Finals', title: true, perfect: out.sweeps === 4 };
  }
  const lost = out.lostTo!;
  const [w, l] = seriesScore(lost.games);
  return { text: 'Lost in the ' + ROUND_NAMES[lost.round] + ' ' + w + '–' + l + ' to the ' + lost.opp.year + ' ' + lost.opp.team, title: false, perfect: false };
}

export function App() {
  const [profile, setProfile] = useState<Profile>(() => loadProfile());
  const [tab, setTab] = useState<Tab>('home');
  const [screen, setScreen] = useState<Screen>('tab');
  const [run, setRun] = useState<Run | null>(null);
  const [modal, setModal] = useState<'settings' | 'howto' | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastT = useRef<number | null>(null);
  const runCounter = useRef(0);

  const todayKey = easternDateKey();
  const dailyNo = dailyNumber(todayKey);
  const dailyDone = !!profile.daily && profile.daily.key === todayKey;

  useEffect(() => saveProfile(profile), [profile]);
  useEffect(() => {
    if (screen !== 'draft') setToast(null);
  }, [screen]);
  useEffect(() => setFeedback(profile.settings.sound, profile.settings.haptics), [profile.settings]);

  const showToast = (t: string) => {
    setToast(t);
    if (toastT.current) clearTimeout(toastT.current);
    toastT.current = window.setTimeout(() => setToast(null), 2600);
  };

  const update = (fn: (p: Profile) => Profile) => setProfile((p) => fn(p));

  const startRun = (mode: Mode = profile.mode) => {
    sfx.click();
    const dailyKey = mode === 'daily' ? todayKey : null;
    runCounter.current += 1;
    setRun({ id: runCounter.current, mode, botLevel: profile.botLevel, dailyKey, ranked: mode === 'daily' && !dailyDone });
    setScreen('draft');
    if (mode === '1v1') showToast('You pick first. Each round you both pick from the same team and decade.');
    else if (mode === 'daily') showToast(dailyDone ? 'Practice run: today’s spins again, not ranked.' : 'Daily #' + dailyNo + ': everyone gets these same spins today.');
  };

  const spend = (n: number) => {
    if (profile.coins < n) return false;
    update((p) => ({ ...p, coins: p.coins - n }));
    return true;
  };

  const finish = (r: Run, season: TeamRating, bracket: Series[] | null, bot: { lineup: DraftState['botLineup']; rating: TeamRating } | null) => {
    const draft = r.draft!;
    const po = bracket ? playoffLine(bracket) : null;
    const vsWon = bot ? (season.rating > bot.rating.rating ? true : season.rating < bot.rating.rating ? false : null) : null;
    const g = gradeFor(season.wins);
    const out = bracket ? playoffOutcome(bracket) : null;
    const rewards = rewardsFor({ wins: season.wins, seriesWon: out ? out.seriesWon : 0, title: !!po?.title, mode: r.mode, vsWon: bot ? vsWon : null, botLevel: r.botLevel, rankedDaily: r.ranked });
    const record: RunRecord = {
      at: new Date().toISOString(),
      mode: r.mode,
      dailyKey: r.dailyKey ?? undefined,
      ranked: r.ranked,
      wins: season.wins,
      rating: Math.round(season.rating * 10) / 10,
      grade: g.letter,
      tier: g.tier,
      playoff: bot ? (vsWon ? 'Beat the ' + r.botLevel + ' bot in 1 vs 1' : vsWon === false ? 'Lost to the ' + r.botLevel + ' bot in 1 vs 1' : 'Tied the ' + r.botLevel + ' bot') : po!.text,
      title: !!po?.title,
      perfect: !!po?.perfect && season.wins === 82,
      lineup: SLOTS.map((s) => {
        const p = draft.lineup[s]!;
        return { slot: s, name: p.name, abbr: p.abbr, era: p.era, primed: !!p.primedFrom };
      }),
      vs: bot ? { won: vsWon, botWins: bot.rating.wins, botLevel: r.botLevel } : undefined,
    };
    const before = levelInfo(profile.xp).level;
    const after = levelInfo(profile.xp + rewards.xp).level;
    const levelUps: number[] = [];
    const unlocked: Booster[] = [];
    for (let l = before + 1; l <= after; l++) {
      levelUps.push(l);
      unlocked.push(...unlockedAt(l));
    }
    update((p) => {
      const inv = { ...p.inventory };
      for (const b of unlocked) inv[b] += 1;
      return {
        ...p,
        coins: p.coins + rewards.coins + LEVEL_UP_COINS * levelUps.length,
        xp: p.xp + rewards.xp,
        inventory: inv,
        firstRun: false,
        history: [record, ...p.history].slice(0, 60),
        daily: r.ranked && r.dailyKey ? { key: r.dailyKey, record } : p.daily,
        stats: {
          games: p.stats.games + 1,
          titles: p.stats.titles + (record.title ? 1 : 0),
          perfect: p.stats.perfect + (record.perfect ? 1 : 0),
          undefeated: p.stats.undefeated + (season.wins === 82 ? 1 : 0),
          vsWins: p.stats.vsWins + (vsWon ? 1 : 0),
        },
      };
    });
    const result: ResultInfo = { record, rating: season, lineup: draft.lineup, bot: bot ?? undefined, rewards, levelUps, unlocked, dailyNo: r.dailyKey ? dailyNumber(r.dailyKey) : null };
    setRun({ ...r, result });
    setScreen('results');
  };

  const onDraftComplete = (draft: DraftState) => {
    if (!run) return;
    const r = { ...run, draft };
    if (r.mode === '1v1') {
      const season = playSeason(draft.lineup);
      const botRating = rateTeam(SLOTS.map((s) => draft.botLineup[s]));
      setRun(r);
      finish(r, season, null, { lineup: draft.botLineup, rating: botRating });
      return;
    }
    const season = playSeason(draft.lineup);
    setRun({ ...r, season });
    setScreen('reveal');
  };

  const onRevealDone = () => {
    if (!run?.season || !run.draft) return;
    const rand = run.dailyKey ? rng(hashString('playoffs:' + run.dailyKey + ':' + lineupKey(run.draft.lineup))) : Math.random;
    setRun({ ...run, bracket: buildBracket(run.season, rand) });
    setScreen('playoffs');
  };

  const goTab = (t: Tab) => {
    sfx.click();
    setTab(t);
    setScreen('tab');
  };

  let body: React.ReactNode = null;
  if (screen === 'draft' && run) {
    body = (
      <Draft
        key={run.id}
        mode={run.mode}
        botLevel={run.botLevel}
        dailyKey={run.dailyKey}
        coins={profile.coins}
        xp={profile.xp}
        inventory={profile.inventory}
        hints={profile.settings.hints}
        firstRun={profile.firstRun}
        onSpend={spend}
        onBooster={(b, d) => update((p) => ({ ...p, inventory: { ...p.inventory, [b]: Math.max(0, p.inventory[b] + d) } }))}
        onToast={showToast}
        onExit={() => goTab('home')}
        onComplete={onDraftComplete}
        onCoachDone={() => update((p) => ({ ...p, firstRun: false }))}
      />
    );
  } else if (screen === 'reveal' && run?.season && run.draft) {
    body = <Reveal season={run.season} lineup={run.draft.lineup} label={MODE_LABEL[run.mode]} onDone={onRevealDone} />;
  } else if (screen === 'playoffs' && run?.season && run.bracket) {
    body = <Playoffs season={run.season} bracket={run.bracket} onDone={() => finish(run, run.season!, run.bracket!, null)} />;
  } else if (screen === 'results' && run?.result) {
    body = <Results info={run.result} xp={profile.xp} coins={profile.coins} onAgain={() => startRun(run.mode)} onHome={() => goTab('home')} onToast={showToast} />;
  } else if (tab === 'daily') {
    body = <DailyPage profile={profile} dailyNo={dailyNo} dailyKey={todayKey} onPlay={() => startRun('daily')} onTab={goTab} />;
  } else if (tab === 'ranks') {
    body = <RanksPage profile={profile} onTab={goTab} />;
  } else if (tab === 'boosters') {
    body = (
      <BoostersPage
        profile={profile}
        onTab={goTab}
        onBuy={(b) => {
          if (!spend(BOOSTER_PRICES[b])) {
            showToast('Not enough coins yet. Each draft earns 20 to 100.');
            sfx.nope();
            return;
          }
          sfx.coin();
          update((p) => ({ ...p, inventory: { ...p.inventory, [b]: p.inventory[b] + 1 } }));
          showToast('Bought 1.');
        }}
      />
    );
  } else if (tab === 'profile') {
    body = <ProfilePage profile={profile} onTab={goTab} onSettings={() => setModal('settings')} />;
  } else {
    body = (
      <HomePage
        profile={profile}
        dailyNo={dailyNo}
        dailyDone={dailyDone}
        onMode={(m) => {
          sfx.click();
          update((p) => ({ ...p, mode: m }));
        }}
        onBot={(b) => update((p) => ({ ...p, botLevel: b }))}
        onPlay={() => startRun()}
        onTab={goTab}
        onSettings={() => setModal('settings')}
        onHelp={() => setModal('howto')}
        onToast={showToast}
      />
    );
  }

  return (
    <>
      {body}
      {modal === 'settings' && (
        <SettingsSheet
          profile={profile}
          source={DATA_SOURCE}
          onClose={() => setModal(null)}
          onChange={(k, v) => update((p) => ({ ...p, settings: { ...p.settings, [k]: v } }))}
          onReset={() => {
            setProfile(freshProfile());
            setModal(null);
            showToast('Progress erased.');
          }}
        />
      )}
      {modal === 'howto' && <HowToSheet onClose={() => setModal(null)} />}
      {toast && <Toast text={toast} />}
    </>
  );
}
