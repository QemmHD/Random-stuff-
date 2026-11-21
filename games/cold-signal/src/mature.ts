// Mature-content switch. Default ON (the game is rated M). When off, strong
// language in case text is replaced with grawlixes before anything renders.
import type { CaseFile } from './types';

export function matureOn(): boolean {
  try { return localStorage.getItem('cs.mature') !== '0'; } catch { return true; }
}

export function setMature(on: boolean): void {
  try { localStorage.setItem('cs.mature', on ? '1' : '0'); } catch { /* ignore */ }
}

const WORDS = [
  'motherfuck\\w*', 'fuck\\w*', 'shit\\w*', 'bullshit', 'horseshit', 'asshole\\w*', 'ass', 'asses', 'arse', 'arsehole\\w*',
  'bitch\\w*', 'bastard\\w*', 'damn\\w*', 'goddamn\\w*', 'dick', 'dicks', 'dickhead\\w*', 'prick', 'pricks', 'piss', 'pissed',
  'pissing', 'crap', 'crappy', 'cock', 'cocks', 'douche\\w*', 'jackass\\w*', 'dumbass\\w*', 'wtf', 'stfu',
];
const RE = new RegExp(`\\b(${WORDS.join('|')})\\b`, 'gi');
const GRAWLIX = '#@$%!&*';

export function clean(text: string): string {
  return text.replace(RE, (w) => {
    let out = '';
    for (let i = 0; i < w.length; i++) out += GRAWLIX[i % GRAWLIX.length];
    return out;
  });
}

function deepClean<T>(v: T): T {
  if (typeof v === 'string') return clean(v) as T;
  if (Array.isArray(v)) return v.map(deepClean) as T;
  if (v && typeof v === 'object') {
    const o: Record<string, unknown> = {};
    for (const [k, x] of Object.entries(v)) o[k] = deepClean(x);
    return o as T;
  }
  return v;
}

/** The case as the player should see it under the current content setting. */
export function viewCase(c: CaseFile): CaseFile {
  return matureOn() ? c : deepClean(c);
}
