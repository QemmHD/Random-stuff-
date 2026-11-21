import { it, expect } from 'vitest';
import { caught1 } from '../src/cases/caught1';
import { simulateSolve, validateCase } from '../src/validate';
it('c1', () => {
  expect(validateCase(caught1)).toEqual([]);
  const f = simulateSolve(caught1);
  const miss = [...caught1.clues.map((k) => `pinned:${k.id}`), ...caught1.events.map((e) => `event:${e.id}`), ...caught1.trace.map((j) => `recovered:${j.id}`)].filter((x) => !f.has(x));
  expect(miss).toEqual([]);
});
