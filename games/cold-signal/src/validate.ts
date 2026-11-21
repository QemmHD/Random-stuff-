// Referential-integrity checks for case data. Used by unit tests.
import type { CaseFile } from './types';

export function validateCase(c: CaseFile): string[] {
  const errs: string[] = [];
  const clueIds = new Set(c.clues.map((x) => x.id));
  const photoIds = new Set(c.photos.map((x) => x.id));
  const contactIds = new Set(c.contacts.map((x) => x.id));
  const placeIds = new Set(c.map.places.map((x) => x.id));
  const noteIds = new Set(c.notes.map((x) => x.id));
  const traceIds = new Set(c.trace.map((x) => x.id));
  const eventIds = new Set(c.events.map((x) => x.id));
  const itemIds = new Set<string>([...c.threads.map((t) => t.id), ...photoIds, ...noteIds, ...c.mail.map((m) => m.id), ...c.voicemails.map((v) => v.id), ...c.calendar.map((e) => e.id), ...c.glimpse.map((g) => g.id)]);
  const timeRe = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

  const dupes = (name: string, ids: string[]) => {
    const s = new Set<string>();
    for (const id of ids) { if (s.has(id)) errs.push(`duplicate ${name} id ${id}`); s.add(id); }
  };
  dupes('clue', c.clues.map((x) => x.id));
  dupes('photo', c.photos.map((x) => x.id));
  dupes('contact', c.contacts.map((x) => x.id));
  dupes('item', [...c.threads.map((t) => t.id), ...c.photos.map((x) => x.id), ...c.notes.map((x) => x.id), ...c.mail.map((m) => m.id), ...c.voicemails.map((v) => v.id)]);

  const flagOk = (f: string): boolean => {
    if (f === 'unlocked' || f === 'report:filed' || f === 'hidden:open') return true;
    const [kind, id] = [f.slice(0, f.indexOf(':')), f.slice(f.indexOf(':') + 1)];
    switch (kind) {
      case 'note': return noteIds.has(id) && !!c.notes.find((n) => n.id === id)?.lock;
      case 'recovered': return traceIds.has(id);
      case 'pinned': return clueIds.has(id);
      case 'seen': return itemIds.has(id);
      case 'event': return eventIds.has(id);
      default: return false;
    }
  };
  const clue = (where: string, id?: string) => { if (id && !clueIds.has(id)) errs.push(`${where}: unknown clue ${id}`); };
  const flag = (where: string, f?: string) => { if (f && !flagOk(f)) errs.push(`${where}: unproducible flag ${f}`); };
  const time = (where: string, t: string) => { if (!timeRe.test(t)) errs.push(`${where}: bad time ${t}`); };
  const contact = (where: string, id: string) => { if (id !== 'me' && !contactIds.has(id) && !/^[(+\d]/.test(id)) errs.push(`${where}: unknown contact ${id}`); };

  if (!/^\d{4}(\d{2})?$/.test(c.lock.passcode)) errs.push('passcode must be 4 or 6 digits');
  if (!photoIds.has(c.lock.wallpaper) && !c.lock.wallpaper) errs.push('lock wallpaper missing');
  for (const t of c.threads) {
    contact(`thread ${t.id}`, t.contact);
    t.messages.forEach((m, i) => { clue(`${t.id}#${i}`, m.clue); flag(`${t.id}#${i}`, m.deletedUntil); time(`${t.id}#${i}`, m.t); if (m.photo && !photoIds.has(m.photo)) errs.push(`${t.id}#${i}: unknown photo ${m.photo}`); });
  }
  for (const p of c.photos) { clue(p.id, p.clue); flag(p.id, p.deletedUntil); time(p.id, p.t); }
  for (const n of c.notes) { clue(n.id, n.clue); flag(n.id, n.deletedUntil); time(n.id, n.t); }
  for (const m of c.mail) { clue(m.id, m.clue); flag(m.id, m.deletedUntil); time(m.id, m.t); if (m.attachment && !photoIds.has(m.attachment)) errs.push(`${m.id}: unknown attachment`); }
  for (const call of c.calls) { contact('call', call.contact); time('call', call.t); }
  for (const v of c.voicemails) { contact(v.id, v.contact); clue(v.id, v.clue); flag(v.id, v.deletedUntil); time(v.id, v.t); }
  for (const s of c.map.stops) { if (!placeIds.has(s.place)) errs.push(`stop ${s.t}: unknown place ${s.place}`); clue('stop', s.clue); flag('stop', s.deletedUntil); time('stop', s.t); }
  for (const p of c.map.places) if (p.x < 0 || p.x > 1 || p.y < 0 || p.y > 1) errs.push(`place ${p.id} out of bounds`);
  for (const b of c.browser) { clue('browser', b.clue); flag('browser', b.deletedUntil); time('browser', b.t); }
  for (const g of c.glimpse) { if (g.author !== 'me') contact(g.id, g.author); if (!photoIds.has(g.photo)) errs.push(`${g.id}: unknown photo ${g.photo}`); clue(g.id, g.clue); time(g.id, g.t); g.comments.forEach((cm) => { if (cm.author !== 'me') contact(`${g.id} comment`, cm.author); }); }
  for (const t of c.bank.tx) { clue('bank', t.clue); time('bank', t.t); }
  for (const e of c.calendar) { clue(e.id, e.clue); time(e.id, e.t); }
  for (const w of c.wifi) { clue('wifi', w.clue); time('wifi', w.lastJoined); }
  for (const j of c.trace) (j.needs ?? []).forEach((f) => flag(`trace ${j.id}`, f));
  for (const e of c.events) {
    e.when.forEach((f) => flag(`event ${e.id}`, f));
    if (e.kind === 'text') { contact(`event ${e.id}`, e.contact); clue(`event ${e.id}`, e.clue); }
  }
  for (const h of c.hints) { flag('hint', h.until); (h.after ?? []).forEach((f) => flag('hint', f)); }
  if (!c.hints.length) errs.push('no hints');
  for (const q of c.questions) {
    if (!q.options.some((o) => o.id === q.answer)) errs.push(`${q.id}: answer not an option`);
    if (!q.evidence.length) errs.push(`${q.id}: no evidence`);
    q.evidence.forEach((id) => clue(q.id, id));
  }
  // every clue must be obtainable from somewhere
  const sources = new Set<string>();
  const add = (id?: string) => { if (id) sources.add(id); };
  c.threads.forEach((t) => t.messages.forEach((m) => add(m.clue)));
  [c.photos, c.notes, c.mail, c.voicemails, c.browser, c.glimpse, c.bank.tx, c.calendar, c.wifi, c.map.stops].forEach((l) => (l as { clue?: string }[]).forEach((x) => add(x.clue)));
  c.events.forEach((e) => { if (e.kind === 'text') add(e.clue); });
  for (const id of clueIds) if (!sources.has(id)) errs.push(`clue ${id} has no source`);
  // every question needs at least one obtainable evidence clue
  for (const q of c.questions) if (!q.evidence.some((id) => sources.has(id))) errs.push(`${q.id}: no obtainable evidence`);
  return errs;
}

/**
 * Simulates an omniscient player: repeatedly pins every visible clue, opens
 * locked notes, runs available TRACE jobs and fires events, until nothing new
 * happens. Returns flags reached. Detects soft-locks.
 */
export function simulateSolve(c: CaseFile): Set<string> {
  const flags = new Set<string>(['unlocked', 'hidden:open']);
  const vis = (x: { deletedUntil?: string }) => !x.deletedUntil || flags.has(x.deletedUntil);
  let pins = 0;
  for (let round = 0; round < 50; round++) {
    const before = flags.size;
    const pin = (id?: string) => { if (id && !flags.has(`pinned:${id}`)) { flags.add(`pinned:${id}`); pins++; } };
    c.threads.forEach((t) => { flags.add(`seen:${t.id}`); t.messages.filter(vis).forEach((m) => pin(m.clue)); });
    [c.photos, c.notes, c.mail, c.voicemails, c.browser, c.map.stops].forEach((l) => (l as { clue?: string; deletedUntil?: string; id?: string }[]).filter(vis).forEach((x) => { if (x.id) flags.add(`seen:${x.id}`); pin(x.clue); }));
    [c.glimpse, c.bank.tx, c.calendar, c.wifi].forEach((l) => (l as { clue?: string }[]).forEach((x) => pin(x.clue)));
    c.notes.filter((n) => n.lock && vis(n)).forEach((n) => flags.add(`note:${n.id}`));
    c.trace.filter((j) => (j.needs ?? []).every((f) => flags.has(f))).forEach((j) => flags.add(`recovered:${j.id}`));
    c.events.filter((e) => e.when.every((f) => flags.has(f)) && (!e.minPins || pins >= e.minPins)).forEach((e) => {
      flags.add(`event:${e.id}`);
      if (e.kind === 'text') pin(e.clue);
    });
    if (flags.size === before) break;
  }
  return flags;
}
