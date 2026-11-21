// Formatting for 'YYYY-MM-DDTHH:MM' strings without timezone surprises.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export interface Parts { y: number; m: number; d: number; hh: number; mm: number }

export function parse(t: string): Parts {
  const [date, time = '00:00'] = t.split('T');
  const [y, m, d] = date.split('-').map(Number);
  const [hh, mm] = time.split(':').map(Number);
  return { y, m, d, hh, mm };
}

export function clock(t: string): string {
  const p = parse(t);
  return `${String(p.hh).padStart(2, '0')}:${String(p.mm).padStart(2, '0')}`;
}

export function dayName(t: string): string {
  const p = parse(t);
  return DAYS[new Date(Date.UTC(p.y, p.m - 1, p.d)).getUTCDay()];
}

export function shortDate(t: string): string {
  const p = parse(t);
  return `${MONTHS[p.m - 1]} ${p.d}`;
}

export function longDate(t: string): string {
  const p = parse(t);
  return `${dayName(t)}, ${MONTHS[p.m - 1]} ${p.d}, ${p.y}`;
}

export function stamp(t: string): string {
  return `${shortDate(t)} · ${clock(t)}`;
}

/** Relative-ish label vs the phone's "now" date. */
export function listLabel(t: string, now: string): string {
  if (t.slice(0, 10) === now.slice(0, 10)) return clock(t);
  const a = parse(t), b = parse(now);
  const da = Date.UTC(a.y, a.m - 1, a.d), db = Date.UTC(b.y, b.m - 1, b.d);
  const diff = Math.round((db - da) / 86400000);
  if (diff === 1) return 'Yesterday';
  if (diff > 1 && diff < 7) return dayName(t);
  if (a.y !== b.y) return `${MONTHS[a.m - 1]} ${a.d}, ${a.y}`;
  return shortDate(t);
}

export function sameDay(a: string, b: string): boolean {
  return a.slice(0, 10) === b.slice(0, 10);
}

export const byTimeDesc = <T extends { t: string }>(a: T, b: T): number => (a.t < b.t ? 1 : a.t > b.t ? -1 : 0);
export const byTimeAsc = <T extends { t: string }>(a: T, b: T): number => (a.t < b.t ? -1 : a.t > b.t ? 1 : 0);
