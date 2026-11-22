import { beforeEach, describe, expect, it, vi } from 'vitest';

const store = new Map<string, string>();
Object.assign(globalThis, {
  window: globalThis,
  localStorage: {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  },
});

const { Game, getProgress } = await import('../src/game');
const { case1 } = await import('../src/cases/case1');
const { caught1 } = await import('../src/cases/caught1');

describe('Game', () => {
  beforeEach(() => { store.clear(); vi.useFakeTimers(); });

  it('saves and restores flags and pins', () => {
    const g = new Game(case1);
    g.set('unlocked');
    expect(g.pin('lab_data')).toBe(true);
    expect(g.pin('lab_data')).toBe(false);
    g.dispose();
    const g2 = new Game(case1);
    expect(g2.has('unlocked')).toBe(true);
    expect(g2.isPinned('lab_data')).toBe(true);
    expect(g2.has('pinned:lab_data')).toBe(true);
  });

  it('hides deleted items until TRACE recovers them', () => {
    const g = new Game(case1);
    g.set('unlocked');
    const key = case1.photos.find((p) => p.id === 'ph_key')!;
    expect(g.visible(key)).toBe(false);
    g.startTrace('photos');
    vi.advanceTimersByTime(6000);
    expect(g.has('recovered:photos')).toBe(true);
    expect(g.visible(key)).toBe(true);
  });

  it('restores a shared clip only after both recoveries and preserves it on reload', () => {
    const g = new Game(caught1);
    const photo = 'cg1_ph_video';
    const shared = (game: InstanceType<typeof Game>) => game.threads()
      .find((thread) => thread.id === 'th_jules')?.messages.some((m) => m.photo === photo);
    g.set('recovered:msgfrag');
    expect(shared(g)).toBe(false);
    expect(g.visiblePhoto(photo)).toBeUndefined();
    g.set('recovered:photos');
    g.dispose();
    const reopened = new Game(caught1);
    expect(shared(reopened)).toBe(true);
    expect(reopened.visiblePhoto(photo)?.frames).toHaveLength(3);
    reopened.dispose();
  });

  it('gates TRACE jobs on leads', () => {
    const g = new Game(case1);
    g.set('unlocked');
    expect(g.traceAvailable('msgfrag')).toBe(false);
    g.pin('pryce_pressure');
    expect(g.traceAvailable('msgfrag')).toBe(true);
  });

  it('fires live events into threads', () => {
    const g = new Game(case1);
    g.set('unlocked');
    g.set('recovered:msgfrag');
    g.set('note:n_insurance');
    vi.advanceTimersByTime(7100);
    expect(g.typing.has('th_mara')).toBe(true); // "typing…" before delivery
    vi.advanceTimersByTime(3000);
    expect(g.has('event:e_mara')).toBe(true);
    const t = g.threads().find((x) => x.id === 'th_mara');
    expect(t?.messages.length).toBe(1);
    expect(g.unread.has('th_mara')).toBe(true);
  });

  it('scores reports', () => {
    const g = new Game(case1);
    const perfect = Object.fromEntries(case1.questions.map((q) => [q.id, { option: q.answer, evidence: q.evidence[0] }]));
    const r = g.fileReport(perfect);
    expect(r.stars).toBe(3);
    expect(r.solved).toBe(true);
    expect(getProgress()[case1.id]).toBe(3);
    const wrong = { ...perfect, q_lure: { option: 'theo', evidence: 'theo_threat' } };
    const r2 = g.fileReport(wrong);
    expect(r2.solved).toBe(false);
    expect(r2.stars).toBe(1);
  });

  it('hint ladder starts at the lock screen', () => {
    const g = new Game(case1);
    expect(g.hint()).toMatch(/date/i);
    g.set('unlocked');
    expect(g.hint()).toMatch(/Messages/);
  });
});

describe('Game lifecycle', () => {
  it('leaving mid-TRACE completes the job and late timers do not clobber saves', () => {
    store.clear();
    vi.useFakeTimers();
    const g = new Game(case1);
    g.set('unlocked');
    g.startTrace('photos');
    g.dispose();
    const g2 = new Game(case1);
    expect(g2.has('recovered:photos')).toBe(true);
    g2.pin('lab_data');
    vi.advanceTimersByTime(10000);
    const g3 = new Game(case1);
    expect(g3.isPinned('lab_data')).toBe(true);
  });
});
