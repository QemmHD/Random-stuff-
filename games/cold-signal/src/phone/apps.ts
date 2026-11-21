// Every app on the phone. Each returns a View the Phone renders.
import { h } from '../dom';
import { artImg, glyph } from '../art';
import { audio } from '../audio';
import type { Game } from '../game';
import type { AppId, BrowserEntry, CalEvent, Mail, Note, Photo, Thread, Voicemail } from '../types';
import { S } from '../strings';
import { byTimeAsc, byTimeDesc, clock, listLabel, longDate, parse, sameDay, shortDate, stamp } from '../time';
import type { Phone, View } from './phone';
import { avatar, contactOf, emptyState, ownerAvatar, pinButton, recoveredTag, sectionTitle } from './widgets';

export function appRoot(app: AppId, phone: Phone, arg?: string): View {
  const g = phone.game;
  switch (app) {
    case 'messages': return arg ? threadView(g, arg) : messagesList(g);
    case 'photos': return photosView(g);
    case 'notes': return notesList(g);
    case 'mail': return mailList(g, 'inbox');
    case 'phone': return phoneView(g, 'recents');
    case 'maps': return mapsView(g);
    case 'browser': return browserView(g);
    case 'glimpse': return glimpseView(g);
    case 'bank': return bankView(g);
    case 'calendar': return calendarView(g);
    case 'settings': return settingsView(g);
    case 'trace': return traceView(g);
  }
}

const tapRow = (onClick: () => void, ...kids: (HTMLElement | string | null)[]) =>
  h('button', { class: 'row', type: 'button', onclick: onClick }, ...kids);

// ======================= MESSAGES =======================
function messagesList(g: Game): View {
  return {
    key: 'messages', title: S.appNames.messages, app: 'messages', large: true,
    render: (phone) => {
      const threads = g.threads().sort((a, b) => byTimeDesc(last(a), last(b)));
      if (!threads.length) return emptyState(S.noMessages);
      return h('div', { class: 'list' }, ...threads.map((t) => {
        const c = contactOf(g, t.contact);
        const m = last(t);
        const unread = g.unread.has(t.id);
        const hasRecovered = t.messages.some((x) => x.deletedUntil);
        return tapRow(() => phone.push(threadView(g, t.id)),
          unread ? h('span', { class: 'unread-dot' }) : h('span', { class: 'unread-dot off' }),
          avatar(c.avatar, 46),
          h('div', { class: 'row-main' },
            h('div', { class: 'row-top' }, h('b', null, c.name), h('span', { class: 'muted' }, listLabel(m.t, g.nowStamp()))),
            h('div', { class: 'row-sub' }, hasRecovered ? glyph('restore', 'tiny cyan') : null, m.from === 'me' ? 'You: ' : '', m.photo ? '📷 Photo' : m.text)),
          glyph('chevron_right', 'chev'));
      }));
    },
  };
}

function last(t: Thread) {
  return t.messages[t.messages.length - 1];
}

function threadView(g: Game, threadId: string): View {
  const thread0 = g.threads().find((t) => t.id === threadId);
  const c = contactOf(g, thread0?.contact ?? threadId);
  return {
    key: `thread:${threadId}`, title: c.name, app: 'messages',
    render: (phone) => {
      g.markSeen(threadId);
      g.markRead(threadId);
      const thread = g.threads().find((t) => t.id === threadId);
      const wrap = h('div', { class: 'thread' },
        h('div', { class: 'thread-head' }, avatar(c.avatar, 64), h('b', null, c.name), h('span', { class: 'muted' }, c.label ? `${c.label} · ${c.number}` : c.number)));
      let prevT = '';
      const liveIds = new Set(g.live.filter((l) => l.thread === threadId).map((l) => l.t + l.text));
      for (const m of thread?.messages ?? []) {
        if (!prevT || !sameDay(prevT, m.t) || gapMinutes(prevT, m.t) > 90) {
          wrap.appendChild(h('div', { class: 'day-sep' }, `${listLabel(m.t, g.nowStamp())} ${clock(m.t)}`));
        }
        prevT = m.t;
        const recovered = !!m.deletedUntil;
        const isLive = liveIds.has(m.t + m.text);
        const bubble = h('div', { class: `bubble ${m.from}${recovered ? ' recovered' : ''}${m.clue ? ' clue' : ''}${isLive ? ' live' : ''}` },
          m.photo ? photoThumb(g, phone, m.photo, 'bubble-photo') : null,
          m.text ? h('span', null, m.text) : null,
        );
        const row = h('div', { class: `bubble-row ${m.from}` }, bubble, pinButton(g, m.clue, true));
        if (recovered) row.prepend(h('div', { class: 'bubble-meta' }, recoveredTag(), h('span', { class: 'muted' }, clock(m.t))));
        wrap.appendChild(row);
      }
      wrap.appendChild(h('div', { class: 'compose' }, h('span', null, 'Text Message'), glyph('send')));
      requestAnimationFrame(() => {
        const body = wrap.closest('.app-body');
        if (body && !body.closest('.no-anim')) body.scrollTop = body.scrollHeight;
      });
      return wrap;
    },
  };
}

function gapMinutes(a: string, b: string): number {
  const pa = parse(a), pb = parse(b);
  return Math.abs((pb.hh * 60 + pb.mm) - (pa.hh * 60 + pa.mm));
}

// ======================= PHOTOS =======================
function photoThumb(g: Game, phone: Phone, photoId: string, cls = 'thumb'): HTMLElement {
  const p = g.c.photos.find((x) => x.id === photoId);
  if (!p) return h('span');
  return h('button', { class: cls, type: 'button', onclick: (e: Event) => { e.stopPropagation(); audio.play('tap'); phone.viewArt(p.art, p); } }, artImg(p.art));
}

function photosView(g: Game): View {
  return {
    key: 'photos', title: S.appNames.photos, app: 'photos', large: true,
    render: (phone) => {
      // Photos that only exist as someone else's post are not in this camera roll.
      const othersOnly = (p: Photo) => g.c.glimpse.some((post) => post.photo === p.id && post.author !== 'me') && !g.c.glimpse.some((post) => post.photo === p.id && post.author === 'me');
      const own = g.c.photos.filter((p) => !othersOnly(p));
      const normal = own.filter((p) => !p.deletedUntil).sort(byTimeAsc);
      const rec = own.filter((p) => p.deletedUntil && g.visible(p)).sort(byTimeAsc);
      const tile = (p: Photo) => h('button', { class: `ph-tile${p.clue ? ' has-clue' : ''}${g.has(`seen:${p.id}`) ? '' : ' unseen'}`, type: 'button', onclick: () => { audio.play('tap'); phone.viewArt(p.art, p); } },
        artImg(p.art),
        p.clue && g.isPinned(p.clue) ? h('span', { class: 'ph-pin' }, glyph('pin')) : null);
      const pendingDeleted = own.filter((p) => p.deletedUntil && !g.visible(p)).length;
      return h('div', { class: 'photos' },
        sectionTitle(`${S.allPhotos} · ${normal.length}`),
        h('div', { class: 'ph-grid' }, ...normal.map(tile)),
        rec.length ? sectionTitle(S.recoveredAlbum) : null,
        rec.length ? h('div', { class: 'ph-grid recovered' }, ...rec.map(tile)) : null,
        pendingDeleted ? h('div', { class: 'ph-deleted' }, glyph('trash'), h('div', null, h('b', null, 'Recently Deleted'), h('span', null, `${pendingDeleted} items · purged — recovery requires TRACE`))) : null,
      );
    },
  };
}

// ======================= NOTES =======================
function notesList(g: Game): View {
  return {
    key: 'notes', title: S.appNames.notes, app: 'notes', large: true,
    render: (phone) => {
      const notes = g.c.notes.filter((n) => g.visible(n)).sort(byTimeDesc);
      return h('div', { class: 'list notes-list' }, ...notes.map((n) => {
        const locked = !!n.lock && !g.has(`note:${n.id}`);
        return tapRow(() => openNote(g, phone, n),
          h('div', { class: 'row-main' },
            h('div', { class: 'row-top' }, h('b', null, locked ? glyph('lock', 'tiny') : null, n.title)),
            h('div', { class: 'row-sub' }, h('span', { class: 'muted' }, listLabel(n.t, g.nowStamp())), '  ', locked ? S.lockedNote : n.body.split('\n')[0].slice(0, 60))),
          glyph('chevron_right', 'chev'));
      }));
    },
  };
}

function openNote(g: Game, phone: Phone, n: Note): void {
  const locked = !!n.lock && !g.has(`note:${n.id}`);
  if (!locked) return phone.push(noteView(g, n));
  audio.play('open');
  const input = h('input', { class: 'pw-input', type: 'password', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', placeholder: S.enterPassword, 'aria-label': S.enterPassword });
  const err = h('div', { class: 'pw-err' });
  const form = h('form', { class: 'pw-form' },
    h('div', { class: 'pw-icon' }, glyph('lock')),
    h('b', null, `"${n.title}"`),
    h('span', { class: 'muted' }, S.lockedNote),
    input,
    h('div', { class: 'pw-hint' }, h('b', null, `${S.passwordHint}: `), n.lock!.hint),
    err,
    h('button', { class: 'btn primary', type: 'submit' }, S.unlockNote),
  );
  const close = phone.sheet(form);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value.trim().toLowerCase().replace(/\s+/g, '');
    if (val === n.lock!.password.toLowerCase().replace(/\s+/g, '')) {
      audio.play('unlock');
      g.set(`note:${n.id}`);
      close();
      phone.push(noteView(g, n));
    } else {
      audio.play('error');
      err.textContent = S.wrongPassword;
      form.classList.remove('shake');
      void form.offsetWidth;
      form.classList.add('shake');
      input.select();
    }
  });
  setTimeout(() => input.focus(), 250);
}

function noteView(g: Game, n: Note): View {
  return {
    key: `note:${n.id}`, title: '', app: 'notes',
    actions: () => [pinButton(g, n.clue, true)].filter((x): x is HTMLElement => !!x),
    render: () => {
      g.markSeen(n.id);
      return h('article', { class: 'note' },
        h('div', { class: 'note-date' }, `${longDate(n.t)} at ${clock(n.t)}`),
        h('h2', null, n.title),
        ...n.body.split('\n').map((line) => (line ? h('p', null, line) : h('br'))),
        n.clue ? h('div', { class: 'note-pin' }, pinButton(g, n.clue)) : null);
    },
  };
}

// ======================= MAIL =======================
function mailList(g: Game, folder: Mail['folder']): View {
  return {
    key: `mail:${folder}`, title: S.appNames.mail, app: 'mail', large: true,
    render: (phone) => {
      const tabs = h('div', { class: 'seg' }, ...(['inbox', 'sent', 'trash'] as const).map((f) =>
        h('button', { type: 'button', class: f === folder ? 'on' : '', onclick: () => { audio.play('tap'); phone.replace(mailList(g, f)); } }, S[f])));
      const items = g.c.mail.filter((m) => m.folder === folder && g.visible(m)).sort(byTimeDesc);
      return h('div', null, tabs,
        items.length ? h('div', { class: 'list' }, ...items.map((m) => tapRow(() => phone.push(mailView(g, m)),
          h('span', { class: `unread-dot${g.has(`seen:${m.id}`) ? ' off' : ''}` }),
          h('div', { class: 'row-main' },
            h('div', { class: 'row-top' }, h('b', null, folder === 'sent' ? `To: ${m.to}` : m.from), h('span', { class: 'muted' }, listLabel(m.t, g.nowStamp()))),
            h('div', { class: 'row-subject' }, m.attachment ? '📎 ' : '', m.subject),
            h('div', { class: 'row-sub' }, m.body.replace(/\n+/g, ' ').slice(0, 90))),
        ))) : emptyState('No mail'));
    },
  };
}

function mailView(g: Game, m: Mail): View {
  return {
    key: `mailv:${m.id}`, title: '', app: 'mail',
    actions: () => [pinButton(g, m.clue, true)].filter((x): x is HTMLElement => !!x),
    render: (phone) => {
      g.markSeen(m.id);
      const c = h('article', { class: 'mail' },
        h('h2', null, m.subject),
        h('div', { class: 'mail-from' },
          h('span', { class: 'mail-ava' }, m.from.split(' ').map((w) => w[0]).join('').slice(0, 2)),
          h('div', null, h('b', null, m.from), h('div', { class: 'muted' }, m.fromAddr), h('div', { class: 'muted' }, `To: ${m.to}`)),
          h('span', { class: 'muted small' }, stamp(m.t))),
        ...m.body.split('\n').map((line) => (line ? h('p', null, line) : h('br'))),
        m.attachment ? h('div', { class: 'mail-att' }, h('span', { class: 'muted' }, S.attachment), photoThumb(g, phone, m.attachment, 'att-thumb')) : null,
        m.clue ? h('div', { class: 'note-pin' }, pinButton(g, m.clue)) : null,
      );
      return c;
    },
  };
}

// ======================= PHONE =======================
function phoneView(g: Game, tab: 'recents' | 'voicemail' | 'contacts'): View {
  return {
    key: `phone:${tab}`, title: S.appNames.phone, app: 'phone', large: true,
    render: (phone) => {
      const seg = h('div', { class: 'seg' }, ...(['recents', 'voicemail', 'contacts'] as const).map((t) =>
        h('button', { type: 'button', class: t === tab ? 'on' : '', onclick: () => { audio.play('tap'); phone.replace(phoneView(g, t)); } }, S[t],
          t === 'voicemail' && g.c.voicemails.some((v) => g.visible(v) && !g.has(`seen:${v.id}`)) ? h('i', { class: 'seg-dot' }) : null)));
      let body: HTMLElement;
      if (tab === 'recents') {
        body = h('div', { class: 'list' }, ...[...g.c.calls].sort(byTimeDesc).map((call) => {
          const c = contactOf(g, call.contact);
          return h('div', { class: `row static${call.dir === 'missed' ? ' missed' : ''}` },
            glyph(call.dir === 'missed' ? 'phone_missed' : call.dir === 'in' ? 'phone_in' : 'phone_out', 'call-ico'),
            h('div', { class: 'row-main' },
              h('div', { class: 'row-top' }, h('b', null, c.name), h('span', { class: 'muted' }, listLabel(call.t, g.nowStamp()))),
              h('div', { class: 'row-sub' }, call.dir === 'missed' ? S.missed : call.dir === 'in' ? S.incoming : S.outgoing, call.duration ? ` · ${call.duration}` : '', ` · ${clock(call.t)}`)));
        }));
      } else if (tab === 'voicemail') {
        const vms = g.c.voicemails.filter((v) => g.visible(v)).sort(byTimeDesc);
        body = h('div', { class: 'list vm-list' }, ...vms.map((v) => voicemailRow(g, phone, v)));
      } else {
        body = h('div', { class: 'list' }, ...[...g.c.contacts].sort((a, b) => a.name.localeCompare(b.name)).map((c) =>
          h('div', { class: 'row static' }, avatar(c.avatar, 40), h('div', { class: 'row-main' }, h('b', null, c.name), h('div', { class: 'row-sub' }, [c.label, c.number].filter(Boolean).join(' · '))))));
      }
      return h('div', null, seg, body);
    },
  };
}

function voicemailRow(g: Game, phone: Phone, v: Voicemail): HTMLElement {
  const c = contactOf(g, v.contact);
  const words = v.transcript;
  const tx = h('p', { class: 'vm-tx' });
  const said = h('span', { class: 'said' });
  const rest = h('span', { class: 'rest' }, words);
  tx.append(said, rest);
  const wave = h('div', { class: 'vm-wave' }, ...Array.from({ length: 34 }, (_, i) => h('i', { style: `--h:${(0.25 + Math.abs(Math.sin(i * 1.7 + v.t.length)) * 0.75).toFixed(2)}` })));
  let playing = false;
  const btn = h('button', { class: 'vm-play', type: 'button', 'aria-label': S.play }, glyph('play'));
  const setPlaying = (p: boolean) => {
    playing = p;
    row.classList.toggle('playing', p);
    btn.replaceChildren(glyph(p ? 'pause' : 'play'));
  };
  btn.addEventListener('click', () => {
    audio.unlock();
    if (playing) { phone.setSpeechStopper(null); setPlaying(false); return; }
    g.markSeen(v.id);
    setPlaying(true);
    said.textContent = '';
    rest.textContent = words;
    const stop = audio.speak(words, v.voice, (i) => {
      const k = Math.min(words.length, i);
      said.textContent = words.slice(0, k);
      rest.textContent = words.slice(k);
    }, () => { said.textContent = words; rest.textContent = ''; setPlaying(false); });
    phone.setSpeechStopper(() => { stop(); setPlaying(false); });
  });
  const row = h('div', { class: `vm${v.deletedUntil ? ' recovered' : ''}${g.has(`seen:${v.id}`) ? '' : ' unseen'}` },
    h('div', { class: 'vm-head' }, avatar(c.avatar, 40),
      h('div', { class: 'row-main' }, h('b', null, c.name), h('div', { class: 'row-sub' }, `${stamp(v.t)} · ${v.duration}`)),
      v.deletedUntil ? recoveredTag() : null),
    h('div', { class: 'vm-player' }, btn, wave),
    h('div', { class: 'vm-label' }, S.transcript),
    tx,
    h('div', { class: 'vm-actions' }, pinButton(g, v.clue)),
  );
  return row;
}

// ======================= MAPS =======================
function mapsView(g: Game): View {
  let day = '';
  return {
    key: 'maps', title: S.appNames.maps, app: 'maps',
    render: () => {
      const stops = g.c.map.stops.filter((s) => g.visible(s)).sort(byTimeAsc);
      const days = [...new Set(stops.map((s) => s.t.slice(0, 10)))];
      if (!day) day = days[days.length - 1] ?? '';
      const container = h('div', { class: 'maps' });
      const draw = () => {
        const todays = stops.filter((s) => s.t.startsWith(day));
        const mapBox = h('div', { class: 'map-box' }, artImg(g.c.map.art, 'map-img'));
        const pts = todays.map((s) => g.c.map.places.find((p) => p.id === s.place)).filter((p): p is NonNullable<typeof p> => !!p);
        if (pts.length > 1) {
          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.setAttribute('viewBox', '0 0 800 600');
          svg.setAttribute('class', 'map-route');
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', pts.map((p, i) => `${i ? 'L' : 'M'}${(p.x * 800).toFixed(1)} ${(p.y * 600).toFixed(1)}`).join(' '));
          svg.appendChild(path);
          mapBox.appendChild(svg);
        }
        for (const p of g.c.map.places) {
          const visitIdx = todays.findIndex((s) => s.place === p.id);
          const visited = visitIdx >= 0;
          const isLast = visited && todays[todays.length - 1].place === p.id;
          mapBox.appendChild(h('div', { class: `map-pin${visited ? ' visited' : ''}${isLast ? ' last' : ''}`, style: `left:${p.x * 100}%;top:${p.y * 100}%`, 'data-place': p.id },
            h('i'), h('span', null, p.name)));
        }
        const chips = h('div', { class: 'chips' }, ...days.map((d) => h('button', { type: 'button', class: d === day ? 'on' : '', onclick: () => { day = d; audio.play('tap'); draw(); } }, shortDate(`${d}T00:00`))));
        const list = h('div', { class: 'timeline' }, ...todays.map((s, i) => {
          const place = g.c.map.places.find((p) => p.id === s.place);
          return h('div', { class: `tl-item${s.clue ? ' clue' : ''}${i === todays.length - 1 ? ' last' : ''}`, onmouseenter: () => hi(s.place), onclick: () => hi(s.place) },
            h('span', { class: 'tl-time' }, clock(s.t)),
            h('span', { class: 'tl-dot' }),
            h('div', { class: 'tl-main' }, h('b', null, place?.name ?? s.place), h('span', { class: 'muted' }, s.detail)),
            pinButton(g, s.clue, true));
        }));
        const hi = (placeId: string) => {
          mapBox.querySelectorAll('.map-pin').forEach((el) => el.classList.toggle('hi', (el as HTMLElement).dataset.place === placeId));
        };
        container.replaceChildren(chips, mapBox, sectionTitle(`${S.timeline} — ${longDate(`${day}T00:00`)}`), list);
      };
      draw();
      return container;
    },
  };
}

// ======================= BROWSER =======================
function browserView(g: Game): View {
  return {
    key: 'browser', title: S.history, app: 'browser', large: true,
    render: (phone) => {
      const items = g.c.browser.filter((b) => g.visible(b)).sort(byTimeDesc);
      const out = h('div', { class: 'browser' }, h('div', { class: 'url-bar' }, glyph('search'), h('span', null, 'Search or enter address')));
      let curDay = '';
      for (const b of items) {
        const d = b.t.slice(0, 10);
        if (d !== curDay) { curDay = d; out.appendChild(sectionTitle(longDate(b.t))); }
        out.appendChild(tapRow(() => phone.push(pageView(g, b)),
          h('span', { class: 'fav' }, b.url.startsWith('search') ? glyph('search') : b.title[0]),
          h('div', { class: 'row-main' }, h('b', null, b.title), h('div', { class: 'row-sub' }, `${clock(b.t)} · ${b.url}`)),
          b.clue && g.isPinned(b.clue) ? glyph('pin', 'tiny cyan') : null));
      }
      return out;
    },
  };
}

function pageView(g: Game, b: BrowserEntry): View {
  return {
    key: `page:${b.t}`, title: '', app: 'browser',
    render: () => {
      const isSearch = b.url.startsWith('search');
      return h('div', { class: 'page' },
        h('div', { class: 'url-bar' }, glyph(isSearch ? 'search' : 'lock'), h('span', null, isSearch ? b.title : b.url)),
        h('div', { class: 'page-card' },
          h('div', { class: 'muted small' }, `${S.cachedPage} · ${stamp(b.t)}`),
          h('h2', null, b.title),
          isSearch
            ? h('div', { class: 'serp' }, ...[0, 1, 2].map((i) => h('div', { class: 'serp-item' }, h('i', { style: `width:${70 - i * 12}%` }), h('i', { style: `width:${90 - i * 8}%` }), h('i', { style: `width:${55 + i * 9}%` }))))
            : h('div', { class: 'serp' }, h('div', { class: 'page-hero' }), ...[0, 1, 2, 3].map((i) => h('i', { class: 'line', style: `width:${92 - i * 9}%` }))),
          h('div', { class: 'note-pin' }, pinButton(g, b.clue))));
    },
  };
}

// ======================= GLIMPSE =======================
function glimpseView(g: Game): View {
  return {
    key: 'glimpse', title: 'Glimpse', app: 'glimpse',
    render: (phone) => {
      const me = g.c.owner;
      const handle = (id: string) => (id === 'me' ? me.name.toLowerCase().replace(/\s+/g, '.') : contactOf(g, id).name.toLowerCase().replace(/[^a-z]+/g, '.').replace(/^\.|\.$/g, ''));
      const posts = [...g.c.glimpse].sort(byTimeDesc);
      return h('div', { class: 'glimpse' },
        h('div', { class: 'gl-profile' }, avatar(ownerAvatar(g), 64),
          h('div', null, h('b', null, handle('me')), h('div', { class: 'muted' }, me.summary)),
        ),
        ...posts.map((p) => {
          const a = p.author === 'me' ? { name: me.name, avatar: ownerAvatar(g) } : contactOf(g, p.author);
          const photo = g.c.photos.find((x) => x.id === p.photo);
          return h('div', { class: `gl-post${p.clue ? ' clue' : ''}` },
            h('div', { class: 'gl-head' }, avatar(a.avatar, 32), h('b', null, handle(p.author)), h('span', { class: 'muted' }, listLabel(p.t, g.nowStamp()))),
            photo ? h('button', { class: 'gl-img', type: 'button', onclick: () => { audio.play('tap'); phone.viewArt(photo.art, photo); } }, artImg(photo.art)) : null,
            h('div', { class: 'gl-actions' }, glyph('heart'), glyph('comment'), glyph('send'), h('span', { class: 'gl-spacer' }), pinButton(g, p.clue, true)),
            h('div', { class: 'gl-likes' }, S.likes(p.likes)),
            h('div', { class: 'gl-cap' }, h('b', null, handle(p.author)), ' ', p.caption),
            ...p.comments.map((cm) => h('div', { class: 'gl-cmt' }, h('b', null, handle(cm.author)), ' ', cm.text)),
            h('div', { class: 'gl-time muted small' }, stamp(p.t)));
        }));
    },
  };
}

// ======================= BANK =======================
function bankView(g: Game): View {
  return {
    key: 'bank', title: S.appNames.bank, app: 'bank', large: true,
    render: () => {
      const b = g.c.bank;
      const tx = [...b.tx].sort(byTimeDesc);
      let curDay = '';
      const list = h('div', { class: 'tx-list' });
      for (const t of tx) {
        const d = t.t.slice(0, 10);
        if (d !== curDay) { curDay = d; list.appendChild(sectionTitle(longDate(t.t))); }
        list.appendChild(h('div', { class: `tx${t.clue ? ' clue' : ''}` },
          h('span', { class: `tx-ico${t.amount > 0 ? ' in' : ''}` }, t.amount > 0 ? '↓' : '↑'),
          h('div', { class: 'row-main' }, h('b', null, t.desc), h('div', { class: 'row-sub' }, clock(t.t))),
          h('span', { class: `tx-amt${t.amount > 0 ? ' pos' : ''}` }, `${t.amount > 0 ? '+' : '−'}$${Math.abs(t.amount).toFixed(2)}`),
          pinButton(g, t.clue, true)));
      }
      return h('div', { class: 'bank' },
        h('div', { class: 'bank-card' },
          h('div', { class: 'bc-chip' }),
          h('div', { class: 'bc-label' }, S.balance),
          h('div', { class: 'bc-bal' }, `$${b.balance.toFixed(2)}`),
          h('div', { class: 'bc-acct' }, b.account),
          h('div', { class: 'bc-name' }, g.c.owner.name.toUpperCase())),
        sectionTitle(S.transactions), list);
    },
  };
}

// ======================= CALENDAR =======================
function calendarView(g: Game): View {
  const evs = [...g.c.calendar].sort(byTimeAsc);
  const months = [...new Set([...evs.map((e) => e.t.slice(0, 7)), g.c.phoneDate.slice(0, 7)])].sort();
  let mi = months.indexOf(g.c.phoneDate.slice(0, 7));
  if (mi < 0) mi = months.length - 1;
  let selected = '';
  return {
    key: 'calendar', title: S.appNames.calendar, app: 'calendar',
    render: (phone) => {
      const root = h('div', { class: 'calendar' });
      const draw = () => {
        const ym = months[mi];
        const [y, m] = ym.split('-').map(Number);
        const first = new Date(Date.UTC(y, m - 1, 1)).getUTCDay();
        const daysIn = new Date(Date.UTC(y, m, 0)).getUTCDate();
        const cells: HTMLElement[] = [];
        for (let i = 0; i < first; i++) cells.push(h('span', { class: 'cal-cell empty' }));
        for (let d = 1; d <= daysIn; d++) {
          const ds = `${ym}-${String(d).padStart(2, '0')}`;
          const has = evs.filter((e) => e.t.startsWith(ds));
          const today = ds === g.c.phoneDate;
          cells.push(h('button', { type: 'button', class: `cal-cell${has.length ? ' has' : ''}${today ? ' today' : ''}${selected === ds ? ' sel' : ''}`, onclick: () => { selected = selected === ds ? '' : ds; audio.play('tap'); draw(); } },
            h('span', null, String(d)), has.length ? h('i') : null));
        }
        const monthName = new Date(Date.UTC(y, m - 1, 1)).toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
        const shown = evs.filter((e) => (selected ? e.t.startsWith(selected) : e.t.startsWith(ym)));
        root.replaceChildren(
          h('div', { class: 'cal-head' },
            h('button', { type: 'button', class: 'icon-btn', disabled: mi === 0, onclick: () => { mi = Math.max(0, mi - 1); selected = ''; draw(); } }, glyph('back')),
            h('b', null, `${monthName} ${y}`),
            h('button', { type: 'button', class: 'icon-btn flip', disabled: mi === months.length - 1, onclick: () => { mi = Math.min(months.length - 1, mi + 1); selected = ''; draw(); } }, glyph('back'))),
          h('div', { class: 'cal-dow' }, ...['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => h('span', null, d))),
          h('div', { class: 'cal-grid' }, ...cells),
          sectionTitle(S.upcoming),
          shown.length ? h('div', { class: 'cal-events' }, ...shown.map((e) => calEvent(g, phone, e))) : emptyState('No events'),
        );
      };
      draw();
      return root;
    },
  };
}

function calEvent(g: Game, _phone: Phone, e: CalEvent): HTMLElement {
  return h('div', { class: `cal-ev${e.clue ? ' clue' : ''}` },
    h('div', { class: 'ce-time' }, h('b', null, shortDate(e.t)), h('span', null, clock(e.t))),
    h('div', { class: 'ce-main' }, h('b', null, e.title), h('span', { class: 'muted' }, e.detail)),
    pinButton(g, e.clue, true));
}

// ======================= SETTINGS =======================
function settingsView(g: Game): View {
  return {
    key: 'settings', title: S.appNames.settings, app: 'settings', large: true,
    render: () => h('div', { class: 'settings' },
      h('div', { class: 'set-profile' }, avatar(ownerAvatar(g), 56), h('div', null, h('b', null, g.c.owner.name), h('div', { class: 'muted' }, 'Account, Cloud & Backup'))),
      sectionTitle(S.knownNetworks),
      h('div', { class: 'group' }, ...[...g.c.wifi].sort((a, b) => (a.lastJoined < b.lastJoined ? 1 : -1)).map((w) =>
        h('div', { class: `set-row${w.clue ? ' clue' : ''}` }, glyph('wifi'),
          h('div', { class: 'row-main' }, h('b', null, w.name), h('div', { class: 'row-sub' }, `${S.lastJoined} ${longDate(w.lastJoined)} · ${clock(w.lastJoined)}`)),
          pinButton(g, w.clue, true)))),
      sectionTitle(S.battery),
      h('div', { class: 'group' }, h('div', { class: 'set-row' }, glyph('battery'), h('div', { class: 'row-main' }, h('b', null, `${g.battery()}%`), h('div', { class: 'row-sub warn' }, S.batteryNote)))),
      sectionTitle(S.about),
      h('div', { class: 'group' },
        h('div', { class: 'set-row' }, h('span', { class: 'row-main' }, S.owner), h('span', { class: 'muted' }, g.c.owner.name)),
        h('div', { class: 'set-row' }, h('span', { class: 'row-main' }, S.model), h('span', { class: 'muted' }, S.modelName)),
        h('div', { class: 'set-row' }, h('span', { class: 'row-main' }, 'Photos'), h('span', { class: 'muted' }, String(g.c.photos.length))),
        h('div', { class: 'set-row' }, h('span', { class: 'row-main' }, 'Passcode'), h('span', { class: 'muted' }, '••••'))),
    ),
  };
}

// ======================= TRACE =======================
function traceView(g: Game): View {
  return {
    key: 'trace', title: 'TRACE', app: 'trace', theme: 'trace',
    render: () => {
      const restoredCount = (jobId: string) => countRecovered(g, `recovered:${jobId}`);
      const root = h('div', { class: 'trace' },
        h('div', { class: 'tr-hero' },
          h('div', { class: 'tr-logo' }, artImg('app_trace')),
          h('div', null, h('b', null, S.traceTitle), h('div', { class: 'tr-sub' }, S.traceSub))),
        h('div', { class: 'tr-device' },
          h('div', null, h('span', null, S.traceDevice), h('b', null, `${S.modelName} · ${g.c.owner.name}`)),
          h('div', null, h('span', null, 'Integrity'), h('b', { class: 'amber' }, 'WATER DAMAGE · 61% READABLE')),
          h('div', null, h('span', null, 'Evidence pinned'), h('b', null, `${g.pins.length} / ${g.c.clues.length}`))),
        ...g.c.trace.map((job) => {
          const done = g.has(`recovered:${job.id}`);
          const running = g.running.has(job.id);
          const avail = g.traceAvailable(job.id);
          const state = done ? 'done' : running ? 'running' : avail ? 'ready' : 'locked';
          const bar = h('div', { class: 'tr-bar' }, h('i'));
          const hex = h('pre', { class: 'tr-hex' });
          const card = h('div', { class: `tr-job ${state}` },
            h('div', { class: 'tr-job-head' },
              h('span', { class: 'tr-state' }, state === 'done' ? S.traceDone : state === 'running' ? S.traceRunning : state === 'ready' ? 'READY' : S.traceLocked),
              h('b', null, job.label)),
            h('p', null, state === 'locked' ? job.needsHint ?? job.detail : job.detail),
            state === 'running' ? h('div', null, bar, hex) : null,
            state === 'done' ? h('div', { class: 'tr-result' }, glyph('check'), `${restoredCount(job.id)} ${S.traceRestored}`) : null,
            state === 'ready' ? h('button', { class: 'btn trace-run', type: 'button', onclick: () => { audio.play('scan'); g.startTrace(job.id); } }, glyph('search'), S.traceRun) : null,
            state === 'locked' ? h('div', { class: 'tr-lock' }, glyph('lock')) : null,
          );
          if (running) animateJob(g, job.id, bar, hex);
          return card;
        }),
        h('div', { class: 'tr-foot' }, 'All recovered items appear in their original apps, tagged ', recoveredTag(), '.'),
      );
      return root;
    },
  };
}

function animateJob(g: Game, jobId: string, bar: HTMLElement, hex: HTMLElement): void {
  const fill = bar.firstElementChild as HTMLElement;
  const hexChars = '0123456789ABCDEF';
  const lines: string[] = [];
  let tick = 0;
  const step = () => {
    if (!bar.isConnected) {
      // may not be attached yet on the first frame
      if (tick++ > 3) return;
      requestAnimationFrame(step);
      return;
    }
    tick++;
    const p = g.traceProgress(jobId);
    fill.style.width = `${(p * 100).toFixed(1)}%`;
    if (tick % 4 === 0) {
      let s = `0x${(0x7f3a000 + tick * 64).toString(16).toUpperCase()}  `;
      for (let i = 0; i < 8; i++) s += hexChars[(Math.random() * 16) | 0] + hexChars[(Math.random() * 16) | 0] + ' ';
      if (Math.random() < 0.18) s += ' ◂ fragment';
      lines.push(s);
      if (lines.length > 6) lines.shift();
      hex.textContent = lines.join('\n');
      if (Math.random() < 0.3) audio.play('type');
    }
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function countRecovered(g: Game, flag: string): number {
  const c = g.c;
  const lists: { deletedUntil?: string }[][] = [c.photos, c.notes, c.mail, c.voicemails, c.browser, c.map.stops, ...c.threads.map((t) => t.messages)];
  return lists.reduce((n, l) => n + l.filter((x) => x.deletedUntil === flag).length, 0);
}
