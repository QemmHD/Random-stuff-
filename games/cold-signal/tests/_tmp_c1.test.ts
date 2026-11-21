import { it, expect } from 'vitest';
import { CAUGHT } from '../src/cases/caught';
import { simulateSolve, validateCase } from '../src/validate';
for (const c of CAUGHT) it(c.id, () => {
  expect(validateCase(c)).toEqual([]);
  const f = simulateSolve(c);
  const miss = [...c.clues.map((k) => `pinned:${k.id}`), ...c.events.map((e) => `event:${e.id}`), ...c.trace.map((j) => `recovered:${j.id}`), ...c.notes.filter((n) => n.lock).map((n) => `note:${n.id}`)].filter((x) => !f.has(x));
  expect(miss).toEqual([]);
});
