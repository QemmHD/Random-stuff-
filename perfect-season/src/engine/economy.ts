import { gradeFor } from './rating';
import type { Booster, BotLevel, Mode } from './types';

export const RESPIN_PRICE = 25;
export const BOOSTER_PRICES: Record<Booster, number> = { double: 60, trade: 70, prime: 100 };
export const BOOSTER_UNLOCK_LEVEL: Record<Booster, number> = { double: 2, trade: 3, prime: 4 };
export const BOOSTER_NAMES: Record<Booster, string> = { double: 'Double Pick', trade: 'Trade', prime: 'Prime' };
export const BOOSTER_HELP: Record<Booster, string> = {
  double: 'Take two players from this team and decade this round.',
  trade: 'Swap a player on your team for one from this team and decade.',
  prime: "Upgrade a player to his best-ever team and decade stat line.",
};
export const BOT_WIN_COINS: Record<BotLevel, number> = { rookie: 15, pro: 30, legend: 50 };
export const LEVEL_UP_COINS = 50;

export interface RewardInput {
  wins: number;
  seriesWon: number;
  title: boolean;
  mode: Mode;
  vsWon: boolean | null;
  botLevel: BotLevel;
  rankedDaily: boolean;
}

export interface Rewards {
  coins: number;
  xp: number;
  lines: string[];
}

export function rewardsFor(r: RewardInput): Rewards {
  const g = gradeFor(r.wins);
  let coins = g.coins;
  let xp = 40;
  const lines = [g.letter + ' grade: +' + g.coins];
  if (r.seriesWon) {
    coins += 10 * r.seriesWon;
    xp += 10 * r.seriesWon;
    lines.push(r.seriesWon + ' series won: +' + 10 * r.seriesWon);
  }
  if (r.title) {
    coins += 25;
    xp += 20;
    lines.push('Championship: +25');
  }
  if (r.vsWon) {
    coins += BOT_WIN_COINS[r.botLevel];
    xp += 20;
    lines.push('Beat the ' + r.botLevel + ' bot: +' + BOT_WIN_COINS[r.botLevel]);
  }
  if (r.rankedDaily) {
    coins += 25;
    xp += 20;
    lines.push('Daily challenge: +25');
  }
  if (r.mode === 'blind') {
    coins = Math.round(coins * 1.5);
    xp = Math.round(xp * 1.5);
    lines.push('Blind mode ×1.5');
  }
  return { coins, xp, lines };
}

export interface LevelInfo {
  level: number;
  into: number;
  need: number;
}

const STEPS = [70, 110, 140, 170];

export function levelInfo(xp: number): LevelInfo {
  let level = 1;
  let acc = 0;
  let i = 0;
  let need = STEPS[0];
  while (xp >= acc + need) {
    acc += need;
    level++;
    i++;
    need = i < STEPS.length ? STEPS[i] : need + 30;
  }
  return { level, into: xp - acc, need };
}

export function unlockedAt(level: number): Booster[] {
  return (Object.keys(BOOSTER_UNLOCK_LEVEL) as Booster[]).filter((b) => BOOSTER_UNLOCK_LEVEL[b] === level);
}
