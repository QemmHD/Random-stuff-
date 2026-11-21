import { describe, expect, it } from 'vitest';
import { clean } from '../src/mature';

describe('mature filter', () => {
  it('masks strong language', () => {
    expect(clean('what the fuck, Theo')).toBe('what the #@$%, Theo');
    expect(clean('Shit. Bullshit!')).not.toMatch(/shit/i);
  });
  it('leaves innocent words alone', () => {
    for (const w of ['class', 'assume', 'cocktail', 'Dickens', 'prickly', 'arsenal', 'scrap', 'Hello', 'passcode']) expect(clean(w)).toBe(w);
  });
});
