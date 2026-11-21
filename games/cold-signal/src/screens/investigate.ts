// The investigation screen: HUD + phone + comms + evidence board.
import { h, vibrate } from '../dom';
import { artImg, glyph } from '../art';
import { audio } from '../audio';
import { Game } from '../game';
import { Phone } from '../phone/phone';
import { Board } from './board';
import { flyToast } from '../phone/widgets';
import { openReport } from './report';
import { openSettings } from './settings';
import { S } from '../strings';
import { clock } from '../time';
import type { CaseFile } from '../types';

export interface InvestigateHandle { el: HTMLElement; dispose: () => void }

export function investigate(c: CaseFile, nav: { toFiles: () => void; toEpilogue: (g: Game) => void }): InvestigateHandle {
  const game = new Game(c);
  const HN = c.handler?.name ?? S.handlerName, HR = c.handler?.role ?? S.handlerRole, HA = c.handler?.avatar ?? 'av_ines';
  const phone = new Phone(game);
  const holder = h('div', { class: 'phone-holder' }, phone.el);

  // ---- comms (handler) ----
  const commsList = h('div', { class: 'comms-list' });
  const renderComms = () => {
    commsList.replaceChildren(...game.handler.map((m) => h('div', { class: 'comm' },
      h('div', { class: 'comm-head' }, h('b', null, HN), h('span', null, clock(m.t))),
      ...richLine(m.text))));
    commsList.scrollTop = commsList.scrollHeight;
  };
  const comms = h('aside', { class: 'comms' },
    h('div', { class: 'comms-head' }, h('span', { class: 'avatar' }, artImg(HA)), h('div', null, h('b', null, HN), h('span', null, HR)), h('i', { class: 'live-dot' })),
    commsList,
    h('div', { class: 'comms-foot' }, h('span', null, S.keysTitle), ...S.keys.map(([k, label]) => h('div', { class: 'key-hint' }, h('kbd', null, k), label))));
  renderComms();

  // ---- toasts (handler) ----
  const toastLayer = h('div', { class: 'toast-layer' });
  // One toast at a time; the rest wait their turn. Tap to read the full log, swipe to dismiss.
  const queue: string[] = [];
  let showing = false;
  const handlerToast = (text: string) => {
    queue.push(text);
    if (!showing) nextToast();
  };
  const nextToast = () => {
    const text = queue.shift();
    if (text === undefined) { showing = false; return; }
    showing = true;
    audio.play('handler');
    vibrate(10);
    const t = h('button', { class: 'h-toast', type: 'button' },
      h('span', { class: 'avatar' }, artImg(HA)),
      h('div', null, h('b', null, `${HN} · ${HR}`), ...richLine(text)));
    let gone = false;
    const dismiss = () => {
      if (gone) return;
      gone = true;
      t.classList.add('leave');
      setTimeout(() => { t.remove(); setTimeout(nextToast, 250); }, 300);
    };
    let sy = 0;
    t.addEventListener('pointerdown', (e) => { sy = e.clientY; });
    t.addEventListener('pointerup', (e) => { if (Math.abs(e.clientY - sy) > 30) { dismiss(); } });
    t.addEventListener('click', () => {
      dismiss();
      if (window.innerWidth <= 1280) openCommsLog();
    });
    toastLayer.appendChild(t);
    const small = window.innerWidth <= 560;
    setTimeout(dismiss, small ? Math.min(6500, Math.max(4000, text.length * 42)) : Math.max(5500, text.length * 60));
  };


  const openCommsLog = () => {
    audio.play('open');
    const close = () => { audio.play('close'); m.classList.add('leave'); setTimeout(() => m.remove(), 250); };
    const list = h('div', { class: 'comms-list modal-comms' }, ...game.handler.map((msg) => h('div', { class: 'comm' },
      h('div', { class: 'comm-head' }, h('b', null, HN), h('span', null, clock(msg.t))), ...richLine(msg.text))));
    const m = h('div', { class: 'modal' }, h('div', { class: 'modal-card small' },
      h('div', { class: 'modal-head' }, h('div', null, h('small', null, HR.toUpperCase()), h('h2', null, S.comms)),
        h('button', { class: 'icon-btn', type: 'button', 'aria-label': S.close, onclick: close }, glyph('close'))),
      list));
    m.addEventListener('click', (e) => { if (e.target === m) close(); });
    root.appendChild(m);
    requestAnimationFrame(() => { list.scrollTop = list.scrollHeight; });
  };

  // ---- board ----
  const docked = new Board(game, { docked: true });
  let overlayBoard: { board: Board; el: HTMLElement } | null = null;
  const openBoard = () => {
    if (overlayBoard) return;
    audio.play('open');
    const board = new Board(game, { onClose: closeBoard });
    const el = h('div', { class: 'board-overlay' }, board.el);
    root.appendChild(el);
    overlayBoard = { board, el };
  };
  const closeBoard = () => {
    if (!overlayBoard) return;
    audio.play('close');
    const { board, el } = overlayBoard;
    overlayBoard = null;
    el.classList.add('leave');
    setTimeout(() => { board.dispose(); el.remove(); }, 300);
  };

  // ---- HUD ----
  const prog = h('span', { class: 'hud-prog' });
  const ring = h('span', { class: 'ring' });
  const boardBtn = h('button', { class: 'hud-btn', type: 'button', 'data-fly-target': '', onclick: () => openBoard() }, glyph('board'), h('span', null, S.board), h('i', { class: 'hud-badge' }));
  const updateHud = () => {
    const p = game.progress();
    prog.textContent = S.pinnedCount(p.pinned);
    // Ring = how much of the device you've cracked open (unlock, locked notes, TRACE), not how many answers you have.
    const gates = ['unlocked', ...c.notes.filter((n) => n.lock).map((n) => `note:${n.id}`), ...c.trace.map((j) => `recovered:${j.id}`)];
    ring.style.setProperty('--p', String(gates.filter((f) => game.has(f)).length / gates.length));
    const badge = boardBtn.querySelector('.hud-badge') as HTMLElement;
    badge.textContent = String(p.pinned);
    badge.toggleAttribute('data-zero', p.pinned === 0);
    reportBtn.classList.toggle('ready', game.has('unlocked') && p.found >= Math.min(8, Math.ceil(p.total * 0.4)));
  };
  // First hint asks for confirmation: hints cost the Clean Solve badge.
  let hintArmed = false;
  const hintBtn = h('button', { class: 'hud-btn hint', type: 'button', onclick: () => {
    if (game.hintsUsed === 0 && !hintArmed) {
      hintArmed = true;
      audio.play('tap');
      hintBtn.classList.add('armed');
      flyToast(hintBtn, S.hintConfirm);
      setTimeout(() => { hintArmed = false; hintBtn.classList.remove('armed'); }, 3500);
      return;
    }
    hintArmed = false;
    hintBtn.classList.remove('armed');
    game.useHint();
  } }, glyph('hint'), h('span', null, S.hint));
  const reportBtn = h('button', { class: 'hud-btn report', type: 'button', onclick: () => openReport(root, game, { onFiled: (g) => nav.toEpilogue(g) }) }, glyph('report'), h('span', null, S.report));
  const hud = h('header', { class: 'hud' },
    h('button', { class: 'hud-btn icon', type: 'button', 'aria-label': S.menu, onclick: () => openMenu() }, glyph('folder')),
    h('div', { class: 'hud-title' }, h('small', null, `CASE ${c.number}`), h('b', null, c.title)),
    h('div', { class: 'hud-progress' }, ring, prog),
    h('div', { class: 'hud-actions' },
      hintBtn,
      boardBtn,
      reportBtn));

  const openMenu = () => {
    openSettings(root, { extra: [{ label: S.exitToFiles, act: () => nav.toFiles() }] });
  };

  const stage = h('main', { class: 'stage' }, comms, holder, docked.el);
  const root = h('div', { class: 'investigate' }, hud, stage, toastLayer);

  const unsub = game.on((e) => {
    if (e.kind === 'handler') { renderComms(); handlerToast(e.msg.text); }
    if (e.kind === 'change' || e.kind === 'pinned') updateHud();
    if (e.kind === 'text') { audio.ambient('tense'); setTimeout(() => audio.ambient('case'), 30000); dreadCue(e.msg.text); }
    if (e.kind === 'handler') dreadCue(e.msg.text);
    if (caught && (e.kind === 'pinned' || e.kind === 'change')) audio.heartbeat(beatFor());
  });
  updateHud();

  // ---- phone scaling ----
  const fit = () => {
    const W = holder.clientWidth, H = holder.clientHeight;
    const bare = window.innerWidth <= 560;
    root.classList.toggle('bare', bare);
    if (bare) { phone.el.style.transform = ''; return; }
    const pw = 410, ph = 864;
    const s = Math.min(W / pw, H / ph, 1.15);
    phone.el.style.transform = `scale(${s})`;
    phone.el.style.setProperty('--inv', String(1 / s));
  };
  const ro = new ResizeObserver(fit);
  ro.observe(holder);
  window.addEventListener('resize', fit);
  requestAnimationFrame(fit);

  audio.ambient('case');
  const caught = c.mode === 'caught';
  const beatFor = () => 62 + Math.min(70, game.progress().found * 5);
  if (caught) {
    root.classList.add('mode-caught');
    audio.heartbeat(beatFor());
    if (!game.has('sfx:shower-off')) audio.shower(true);
  }
  const dreadCue = (text: string) => {
    if (!caught) return;
    if (/shower.{0,20}(off|stop)|water.{0,12}(off|stop)/i.test(text) && !game.has('sfx:shower-off')) { game.markSeenFlag('sfx:shower-off'); audio.shower(false); audio.play('stinger'); }
    if (/\bdoor\b|doorbell|footsteps|keys/i.test(text)) audio.door();
    root.classList.remove('flicker'); void root.offsetWidth; root.classList.add('flicker');
  };
  game.checkEvents();
  // First-time intro toast
  if (game.handler.length === 1 && !game.has('unlocked') && window.innerWidth <= 1280) setTimeout(() => handlerToast(c.handlerIntro), 900);

  const onKey = (e: KeyboardEvent) => {
    if ((e.target as HTMLElement)?.tagName === 'INPUT') return;
    if (e.key === 'b' || e.key === 'B') { if (overlayBoard) closeBoard(); else openBoard(); }
    if (e.key === 'Escape') { if (overlayBoard) closeBoard(); else phone.pop(); }
    if (e.key === 'h' || e.key === 'H') phone.goHome();
  };
  window.addEventListener('keydown', onKey);

  return {
    el: root,
    dispose: () => {
      unsub();
      ro.disconnect();
      window.removeEventListener('resize', fit);
      window.removeEventListener('keydown', onKey);
      audio.heartbeat(0);
      audio.shower(false);
      phone.dispose();
      docked.dispose();
      overlayBoard?.board.dispose();
      game.dispose();
    },
  };
}

/** "(The shower just turned off.) bro get OUT" → italic narration + the line. */
function richLine(text: string): HTMLElement[] {
  const m = /^\(([^)]*)\)\s*(.*)$/s.exec(text);
  if (!m) return [h('p', null, text)];
  return [h('p', { class: 'narration' }, m[1]), ...(m[2] ? [h('p', null, m[2])] : [])];
}
