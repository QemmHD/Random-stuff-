// The investigation screen: HUD + phone + comms + evidence board.
import { h, vibrate } from '../dom';
import { artImg, glyph } from '../art';
import { audio } from '../audio';
import { Game } from '../game';
import { Phone } from '../phone/phone';
import { Board } from './board';
import { openReport } from './report';
import { openSettings } from './settings';
import { S } from '../strings';
import { clock } from '../time';
import type { CaseFile } from '../types';

export interface InvestigateHandle { el: HTMLElement; dispose: () => void }

export function investigate(c: CaseFile, nav: { toFiles: () => void; toEpilogue: (g: Game) => void }): InvestigateHandle {
  const game = new Game(c);
  const phone = new Phone(game);
  const holder = h('div', { class: 'phone-holder' }, phone.el);

  // ---- comms (handler) ----
  const commsList = h('div', { class: 'comms-list' });
  const renderComms = () => {
    commsList.replaceChildren(...game.handler.map((m) => h('div', { class: 'comm' },
      h('div', { class: 'comm-head' }, h('b', null, S.handlerName), h('span', null, clock(m.t))),
      h('p', null, m.text))));
    commsList.scrollTop = commsList.scrollHeight;
  };
  const comms = h('aside', { class: 'comms' },
    h('div', { class: 'comms-head' }, h('span', { class: 'avatar' }, artImg('av_ines')), h('div', null, h('b', null, S.handlerName), h('span', null, S.handlerRole)), h('i', { class: 'live-dot' })),
    commsList);
  renderComms();

  // ---- toasts (handler) ----
  const toastLayer = h('div', { class: 'toast-layer' });
  const handlerToast = (text: string) => {
    audio.play('handler');
    vibrate(10);
    const t = h('button', { class: 'h-toast', type: 'button' },
      h('span', { class: 'avatar' }, artImg('av_ines')),
      h('div', null, h('b', null, `${S.handlerName} · ${S.handlerRole}`), h('p', null, text)));
    t.addEventListener('click', () => { t.classList.add('leave'); setTimeout(() => t.remove(), 300); });
    toastLayer.appendChild(t);
    setTimeout(() => { t.classList.add('leave'); setTimeout(() => t.remove(), 300); }, Math.max(6000, text.length * 70));
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
    prog.textContent = S.progress(p.pinned, p.total);
    ring.style.setProperty('--p', String(p.pinned / Math.max(1, p.total)));
    const badge = boardBtn.querySelector('.hud-badge') as HTMLElement;
    badge.textContent = String(p.pinned);
    badge.toggleAttribute('data-zero', p.pinned === 0);
    reportBtn.classList.toggle('ready', game.has('unlocked') && p.pinned >= Math.min(8, Math.ceil(p.total * 0.4)));
  };
  const reportBtn = h('button', { class: 'hud-btn report', type: 'button', onclick: () => openReport(root, game, { onFiled: (g) => nav.toEpilogue(g) }) }, glyph('report'), h('span', null, S.report));
  const hud = h('header', { class: 'hud' },
    h('button', { class: 'hud-btn icon', type: 'button', 'aria-label': S.menu, onclick: () => openMenu() }, glyph('folder')),
    h('div', { class: 'hud-title' }, h('small', null, `CASE ${c.number}`), h('b', null, c.title)),
    h('div', { class: 'hud-progress' }, ring, prog),
    h('div', { class: 'hud-actions' },
      h('button', { class: 'hud-btn', type: 'button', onclick: () => { const t = game.hint(); game.pushHandler(t); } }, glyph('hint'), h('span', null, S.hint)),
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
    if (e.kind === 'text') { audio.ambient('tense'); setTimeout(() => audio.ambient('case'), 30000); }
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
  game.checkEvents();
  // First-time intro toast
  if (game.handler.length === 1 && !game.has('unlocked')) setTimeout(() => handlerToast(c.handlerIntro), 900);

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
      phone.dispose();
      docked.dispose();
      overlayBoard?.board.dispose();
      game.dispose();
    },
  };
}
