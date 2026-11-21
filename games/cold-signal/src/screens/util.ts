import { hasArt } from '../art';
import type { CaseFile } from '../types';

/** Best avatar art for a case's phone owner. */
export function avatarFor(c: CaseFile): string {
  const first = c.owner.name.split(' ')[0].toLowerCase();
  for (const id of [`av_${first}`, `av_c${Number(c.number)}_${first}`]) if (hasArt(id)) return id;
  return 'av_generic_1';
}
