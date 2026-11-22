import { describe, expect, it } from 'vitest';
import { CASES } from '../src/cases';
import { CAUGHT } from '../src/cases/caught';
import { studyKey, studySubjects } from '../src/cases/caughtPortraits';
import { hasArt } from '../src/art';
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

describe.each([1, 2, 3, 4, 5, 6] as const)('Caught C%i shared media', (chapter) => {
  it('registers its locked figure studies and the three frames shared in Messages', () => {
    const c = CAUGHT[chapter - 1];
    for (const subject of Object.keys(studySubjects[chapter])) {
      const art = studyKey(chapter, subject);
      expect(c.photos.find((photo) => photo.id === art), subject).toMatchObject({ art, hidden: true });
      expect(hasArt(art), art).toBe(true);
    }
    const clip = c.photos.find((photo) => photo.frames?.some((frame) => frame.reveal));
    expect(clip?.frames).toHaveLength(3);
    expect(clip?.deletedUntil).toBeTruthy();
    for (const frame of clip?.frames ?? []) expect(hasArt(frame.art), frame.art).toBe(true);
    const messages = c.threads.flatMap((thread) => thread.messages).filter((msg) => msg.photo === clip?.id);
    expect(messages).toHaveLength(1);
    expect(messages[0].deletedUntil).toBeTruthy();
    expect(messages[0].t >= clip!.t).toBe(true);
  });
});

describe.each(CAUGHT.filter((c) => c.opening?.length).map((c) => [c.id, c] as const))('illustrated Caught case %s', (_id, c) => {
  it('has registered art for all case references', () => {
    const art = [
      c.cover, c.lock.wallpaper, c.homeWallpaper, c.map.art, c.handler?.avatar,
      ...(c.opening ?? []).map((shot) => shot.art),
      ...c.contacts.map((contact) => contact.avatar),
      ...c.photos.flatMap((photo) => [photo.art, ...(photo.frames ?? []).map((frame) => frame.art)]),
      ...c.clues.map((clue) => clue.art),
      ...c.questions.flatMap((question) => question.options.map((option) => option.art)),
    ];
    for (const id of art) if (id) expect(hasArt(id), id).toBe(true);
  });

  it('has four scripted confrontation choices', () => {
    expect(c.choices).toHaveLength(4);
    for (const choice of c.choices ?? []) {
      for (const line of [...choice.solved, ...choice.partial]) {
        expect(line).toMatch(/^(?:\(.+\)|[^:]{1,24}:\s+.+)$/);
      }
    }
  });
});
