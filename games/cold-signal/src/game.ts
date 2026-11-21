// Case session: flags, pins, live events, TRACE jobs, hints, save/load.
import type { CaseFile, Clue, Msg, Thread } from './types';

export interface Pin { id: string; x: number; y: number }
export interface LiveMsg { id: string; thread: string; contact: string; text: string; t: string; clue?: string }
export interface HandlerMsg { text: string; t: string }
export interface Answer { option: string; evidence: string }
export interface ReportResult {
  answers: Record<string, Answer>;
  correct: number;
  withEvidence: number;
  total: number;
  stars: 0 | 1 | 2 | 3;
  solved: boolean;
}

interface SaveData {
  v: 1;
  flags: string[];
  pins: Pin[];
  live: LiveMsg[];
  handler: HandlerMsg[];
  report: ReportResult | null;
  draft: Record<string, Answer>;
  playMs: number;
  unread: string[]; // thread ids with unread live messages
}

export type GameEvent =
  | { kind: 'change' }
  | { kind: 'text'; msg: LiveMsg }
  | { kind: 'handler'; msg: HandlerMsg }
  | { kind: 'pinned'; clue: Clue }
  | { kind: 'trace-done'; jobId: string; label: string };

const SAVE_PREFIX = 'cs.case.';
const PROGRESS_KEY = 'cs.progress';

function load<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function store(key: string, v: unknown): void {
  try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* full or private */ }
}

export function getProgress(): Record<string, number> {
  return load<Record<string, number>>(PROGRESS_KEY) ?? {};
}

export function hasSave(caseId: string): boolean {
  const s = load<SaveData>(SAVE_PREFIX + caseId);
  return !!s && s.flags.length > 0;
}

export function resetCase(caseId: string): void {
  try { localStorage.removeItem(SAVE_PREFIX + caseId); } catch { /* ignore */ }
}

export class Game {
  readonly c: CaseFile;
  private flags: Set<string>;
  pins: Pin[];
  live: LiveMsg[];
  handler: HandlerMsg[];
  report: ReportResult | null;
  draft: Record<string, Answer>;
  unread: Set<string>;
  private playMs: number;
  private sessionStart = performance.now();
  private listeners: ((e: GameEvent) => void)[] = [];
  private scheduled = new Map<string, number>();
  readonly running = new Map<string, { start: number; dur: number }>();
  private clueMap: Map<string, Clue>;
  private disposed = false;

  constructor(c: CaseFile) {
    this.c = c;
    const s = load<SaveData>(SAVE_PREFIX + c.id);
    this.flags = new Set(s?.flags ?? []);
    this.pins = s?.pins ?? [];
    this.live = s?.live ?? [];
    this.playMs = s?.playMs ?? 0;
    this.handler = s?.handler ?? [{ text: c.handlerIntro, t: this.nowStamp() }];
    this.report = s?.report ?? null;
    this.draft = s?.draft ?? {};
    this.unread = new Set(s?.unread ?? []);
    this.clueMap = new Map(c.clues.map((k) => [k.id, k]));
    // pins can be stale if case data changed between versions
    this.pins = this.pins.filter((p) => this.clueMap.has(p.id));
  }

  on(fn: (e: GameEvent) => void): () => void {
    this.listeners.push(fn);
    return () => { this.listeners = this.listeners.filter((f) => f !== fn); };
  }

  private emit(e: GameEvent): void {
    for (const fn of [...this.listeners]) fn(e);
  }

  save(): void {
    const data: SaveData = {
      v: 1,
      flags: [...this.flags],
      pins: this.pins,
      live: this.live,
      handler: this.handler,
      report: this.report,
      draft: this.draft,
      playMs: this.totalPlayMs(),
      unread: [...this.unread],
    };
    store(SAVE_PREFIX + this.c.id, data);
  }

  totalPlayMs(): number {
    return this.playMs + (performance.now() - this.sessionStart);
  }

  dispose(): void {
    // Finish in-flight TRACE jobs now so a late timer can't write over a newer session's save.
    for (const id of this.running.keys()) this.flags.add(`recovered:${id}`);
    this.running.clear();
    this.disposed = true;
    this.save();
    for (const t of this.scheduled.values()) clearTimeout(t);
    this.scheduled.clear();
    this.listeners = [];
  }

  // ---------- flags ----------
  has(flag: string | undefined): boolean {
    if (!flag) return true;
    return this.flags.has(flag);
  }

  visible(item: { deletedUntil?: string }): boolean {
    return !item.deletedUntil || this.flags.has(item.deletedUntil);
  }

  set(flag: string): void {
    if (this.flags.has(flag)) return;
    this.flags.add(flag);
    this.save();
    this.emit({ kind: 'change' });
    this.checkEvents();
  }

  /** Seen-flags never re-render the phone (that would interrupt playback/scroll). */
  markSeen(id: string): void {
    const f = `seen:${id}`;
    if (this.flags.has(f)) return;
    this.flags.add(f);
    this.save();
    this.checkEvents();
  }

  isNewlyRecovered(item: { deletedUntil?: string }): boolean {
    return !!item.deletedUntil && this.flags.has(item.deletedUntil);
  }

  // ---------- clues / pins ----------
  clue(id: string): Clue | undefined {
    return this.clueMap.get(id);
  }

  isPinned(id: string): boolean {
    return this.pins.some((p) => p.id === id);
  }

  pin(id: string): boolean {
    const clue = this.clueMap.get(id);
    if (!clue || this.isPinned(id)) return false;
    this.pins.push({ id, ...slot(this.pins.length) });
    this.flags.add(`pinned:${id}`);
    this.save();
    this.emit({ kind: 'pinned', clue });
    this.emit({ kind: 'change' });
    this.checkEvents();
    return true;
  }

  unpin(id: string): void {
    this.pins = this.pins.filter((p) => p.id !== id);
    // keep the pinned:<id> flag so gated progress never regresses
    this.save();
    this.emit({ kind: 'change' });
  }

  /** Re-arrange every card on a neat grid. */
  tidyPins(): void {
    this.pins.forEach((p, i) => Object.assign(p, slot(i, false)));
    this.save();
    this.emit({ kind: 'change' });
  }

  movePin(id: string, x: number, y: number): void {
    const p = this.pins.find((q) => q.id === id);
    if (!p) return;
    p.x = Math.max(0, Math.min(0.92, x));
    p.y = Math.max(0, Math.min(0.9, y));
    this.save();
  }

  // ---------- threads (case + live) ----------
  threads(): Thread[] {
    const list: Thread[] = this.c.threads.map((t) => ({
      ...t,
      messages: [...t.messages.filter((m) => this.visible(m)), ...this.live.filter((l) => l.thread === t.id).map(liveToMsg)],
    }));
    for (const l of this.live) {
      if (!list.some((t) => t.id === l.thread)) list.push({ id: l.thread, contact: l.contact, messages: [] });
      const t = list.find((x) => x.id === l.thread)!;
      if (!this.c.threads.some((ct) => ct.id === l.thread)) t.messages.push(liveToMsg(l));
    }
    for (const t of list) t.messages.sort((a, b) => (a.t < b.t ? -1 : a.t > b.t ? 1 : 0));
    return list.filter((t) => t.messages.length > 0);
  }

  // ---------- TRACE ----------
  traceAvailable(jobId: string): boolean {
    const job = this.c.trace.find((j) => j.id === jobId);
    return !!job && (job.needs ?? []).every((f) => this.flags.has(f));
  }

  startTrace(jobId: string): void {
    const job = this.c.trace.find((j) => j.id === jobId);
    if (!job || this.running.has(jobId) || this.has(`recovered:${jobId}`) || !this.traceAvailable(jobId)) return;
    this.running.set(jobId, { start: performance.now(), dur: job.durationMs });
    this.emit({ kind: 'change' });
    window.setTimeout(() => {
      if (this.disposed) return;
      this.running.delete(jobId);
      this.set(`recovered:${jobId}`);
      this.emit({ kind: 'trace-done', jobId, label: job.label });
    }, job.durationMs);
  }

  traceProgress(jobId: string): number {
    const r = this.running.get(jobId);
    if (!r) return this.has(`recovered:${jobId}`) ? 1 : 0;
    return Math.min(1, (performance.now() - r.start) / r.dur);
  }

  // ---------- live events ----------
  checkEvents(): void {
    for (const ev of this.c.events) {
      if (this.flags.has(`event:${ev.id}`) || this.scheduled.has(ev.id)) continue;
      if (!ev.when.every((f) => this.flags.has(f))) continue;
      if (ev.minPins && this.pins.length < ev.minPins) continue;
      const timer = window.setTimeout(() => {
        this.scheduled.delete(ev.id);
        this.fire(ev.id);
      }, ev.delayMs);
      this.scheduled.set(ev.id, timer);
    }
  }

  private fire(eventId: string): void {
    const ev = this.c.events.find((e) => e.id === eventId);
    if (!ev || this.flags.has(`event:${ev.id}`)) return;
    const t = this.nowStamp();
    if (ev.kind === 'text') {
      const msg: LiveMsg = { id: ev.id, thread: ev.thread, contact: ev.contact, text: ev.text, t, clue: ev.clue };
      this.live.push(msg);
      this.unread.add(ev.thread);
      this.flags.add(`event:${ev.id}`);
      this.save();
      this.emit({ kind: 'text', msg });
    } else {
      const msg: HandlerMsg = { text: ev.text, t };
      this.handler.push(msg);
      this.flags.add(`event:${ev.id}`);
      this.save();
      this.emit({ kind: 'handler', msg });
    }
    this.emit({ kind: 'change' });
    this.checkEvents();
  }

  pushHandler(text: string): void {
    const msg = { text, t: this.nowStamp() };
    this.handler.push(msg);
    this.save();
    this.emit({ kind: 'handler', msg });
  }

  markRead(threadId: string): void {
    if (this.unread.delete(threadId)) this.save();
  }

  // ---------- hints ----------
  hint(): string {
    for (const h of this.c.hints) {
      if (this.flags.has(h.until)) continue;
      if ((h.after ?? []).every((f) => this.flags.has(f))) return h.text;
    }
    return 'You have everything you need. Trust the board.';
  }

  // ---------- clock / battery ----------
  /** Phone "now": case start time + real minutes played. */
  nowStamp(): string {
    const [hh, mm] = this.c.phoneTime.split(':').map(Number);
    const mins = hh * 60 + mm + Math.floor(this.totalPlayMs() / 60000);
    const H = Math.floor(mins / 60) % 24, M = mins % 60;
    return `${this.c.phoneDate}T${String(H).padStart(2, '0')}:${String(M).padStart(2, '0')}`;
  }

  battery(): number {
    return Math.max(4, 23 - Math.floor(this.totalPlayMs() / 150000));
  }

  // ---------- report ----------
  progress(): { pinned: number; total: number } {
    return { pinned: this.pins.length, total: this.c.clues.length };
  }

  fileReport(answers: Record<string, Answer>): ReportResult {
    let correct = 0, withEvidence = 0;
    for (const q of this.c.questions) {
      const a = answers[q.id];
      if (a && a.option === q.answer) {
        correct++;
        if (q.evidence.includes(a.evidence)) withEvidence++;
      }
    }
    const total = this.c.questions.length;
    const stars: 0 | 1 | 2 | 3 = correct === total && withEvidence === total ? 3 : correct === total ? 2 : correct >= Math.ceil(total / 2) ? 1 : 0;
    const res: ReportResult = { answers, correct, withEvidence, total, stars, solved: correct === total };
    this.report = res;
    this.flags.add('report:filed');
    this.save();
    const prog = getProgress();
    prog[this.c.id] = Math.max(prog[this.c.id] ?? 0, stars);
    store(PROGRESS_KEY, prog);
    this.emit({ kind: 'change' });
    return res;
  }
}

/** Board slot for the n-th card: 5 columns x 6 rows, with slight jitter. */
function slot(n: number, jitter = true): { x: number; y: number } {
  const col = n % 5, row = Math.floor(n / 5) % 6;
  const j = () => (jitter ? (Math.random() - 0.5) * 0.025 : 0);
  return { x: 0.015 + col * 0.197 + j(), y: 0.02 + row * 0.162 + j() };
}

function liveToMsg(l: LiveMsg): Msg {
  return { from: 'them', text: l.text, t: l.t, clue: l.clue };
}
