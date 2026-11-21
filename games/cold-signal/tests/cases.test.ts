import { describe, expect, it } from 'vitest';
import { CASES } from '../src/cases';
import { CAUGHT } from '../src/cases/caught';
import { simulateSolve, validateCase } from '../src/validate';

describe.each(CASES.map((c) => [c.id, c] as const))('case %s', (_id, c) => {
  it('has consistent references', () => {
    expect(validateCase(c)).toEqual([]);
  });
  it('is fully solvable (no soft-locks)', () => {
    const flags = simulateSolve(c);
    for (const j of c.trace) expect(flags.has(`recovered:${j.id}`), `trace ${j.id}`).toBe(true);
    for (const n of c.notes.filter((x) => x.lock)) expect(flags.has(`note:${n.id}`), `note ${n.id}`).toBe(true);
    for (const e of c.events) expect(flags.has(`event:${e.id}`), `event ${e.id}`).toBe(true);
    for (const q of c.questions) expect(q.evidence.some((id) => flags.has(`pinned:${id}`)), `question ${q.id}`).toBe(true);
    for (const k of c.clues) expect(flags.has(`pinned:${k.id}`), `clue ${k.id}`).toBe(true);
  });
});

describe.each(CAUGHT.map((c) => [c.id, c] as const))('caught case %s', (_id, c) => {
  it('has consistent references', () => {
    expect(validateCase(c)).toEqual([]);
  });
  it('is fully solvable (no soft-locks)', () => {
    const flags = simulateSolve(c);
    for (const j of c.trace) expect(flags.has(`recovered:${j.id}`), `trace ${j.id}`).toBe(true);
    for (const n of c.notes.filter((x) => x.lock)) expect(flags.has(`note:${n.id}`), `note ${n.id}`).toBe(true);
    for (const e of c.events) expect(flags.has(`event:${e.id}`), `event ${e.id}`).toBe(true);
    for (const q of c.questions) expect(q.evidence.some((id) => flags.has(`pinned:${id}`)), `question ${q.id}`).toBe(true);
    for (const k of c.clues) expect(flags.has(`pinned:${k.id}`), `clue ${k.id}`).toBe(true);
  });
});

describe('case list', () => {
  it('has unique ids and numbers', () => {
    expect(new Set(CASES.map((c) => c.id)).size).toBe(CASES.length);
    expect(new Set(CASES.map((c) => c.number)).size).toBe(CASES.length);
  });
  it('caught cases have unique ids and numbers', () => {
    const all = [...CASES, ...CAUGHT];
    expect(new Set(all.map((c) => c.id)).size).toBe(all.length);
    expect(new Set(all.map((c) => c.number)).size).toBe(all.length);
  });
});
