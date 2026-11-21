// The simulated phone: lock screen, home screen, app navigation stack,
// notification banners and the full-screen photo viewer.
import { h, clear, vibrate, wait } from '../dom';
import { artImg, artUrl, glyph } from '../art';
import { audio } from '../audio';
import type { Game } from '../game';
import type { AppId, Photo } from '../types';
import { S } from '../strings';
import { clock, longDate, stamp } from '../time';
import { avatar, contactOf, pinButton, recoveredTag } from './widgets';
import { appRoot, searchView } from './apps';

export interface View {
  key: string;
  title: string;
  app: AppId;
  render: (phone: Phone) => HTMLElement;
  /** Large title style (root pages). */
  large?: boolean;
  /** Extra header button(s). */
  actions?: (phone: Phone) => HTMLElement[];
  theme?: 'dark' | 'trace';
}

const HOME_GRID: AppId[] = ['messages', 'photos', 'mail', 'notes', 'maps', 'glimpse', 'browser', 'bank', 'calendar', 'settings', 'trace'];
const DOCK: AppId[] = ['phone', 'messages', 'photos', 'trace'];

export class Phone {
  readonly el: HTMLElement;
  private screen: HTMLElement;
  private layer: HTMLElement;
  private statusTime: HTMLElement;
  private statusBatt: HTMLElement;
  private bannerLayer: HTMLElement;
  private overlay: HTMLElement;
  private stack: View[] = [];
  private mode: 'lock' | 'home' | 'app' = 'lock';
  private clockTimer = 0;
  private unsub: () => void;
  private stopSpeech: (() => void) | null = null;

  constructor(readonly game: Game) {
    this.statusTime = h('span', { class: 'sb-time' });
    this.statusBatt = h('span', { class: 'sb-batt' });
    const status = h('div', { class: 'status-bar' },
      this.statusTime,
      h('span', { class: 'sb-island' }),
      h('span', { class: 'sb-right' }, glyph('signal'), glyph('wifi'), this.statusBatt),
    );
    this.layer = h('div', { class: 'layer' });
    this.bannerLayer = h('div', { class: 'banner-layer' });
    this.overlay = h('div', { class: 'phone-overlay' });
    const indicator = h('button', { class: 'home-indicator', 'aria-label': 'Home', type: 'button', onclick: () => this.goHome() });
    this.screen = h('div', { class: 'screen' }, this.layer, status, this.bannerLayer, this.overlay, indicator);
    this.el = h('div', { class: 'phone' }, h('div', { class: 'phone-bezel' }, this.screen), h('span', { class: 'phone-btn b1' }), h('span', { class: 'phone-btn b2' }), h('span', { class: 'phone-btn b3' }));

    this.tick();
    this.clockTimer = window.setInterval(() => this.tick(), 5000);
    this.unsub = game.on((e) => {
      if (e.kind === 'change') this.refresh();
      if (e.kind === 'text') this.banner(e.msg.contact, e.msg.text, () => this.openThread(e.msg.thread));
      if (e.kind === 'trace-done') {
        audio.play('recovered');
        vibrate([20, 40, 20]);
        this.banner('trace', S.traceDoneToast(e.label), () => this.openApp('trace'));
      }
    });

    if (game.has('unlocked')) this.showHome(false);
    else this.showLock();
  }

  dispose(): void {
    clearInterval(this.clockTimer);
    this.unsub();
    this.stopSpeech?.();
  }

  setSpeechStopper(fn: (() => void) | null): void {
    this.stopSpeech?.();
    this.stopSpeech = fn;
  }

  private tick(): void {
    const now = this.game.nowStamp();
    this.statusTime.textContent = clock(now);
    const b = this.game.battery();
    this.statusBatt.replaceChildren(h('span', { class: `batt${b <= 10 ? ' low' : ''}` }, h('i', { style: `width:${b}%` })), `${b}%`);
    const lockClock = this.layer.querySelector('.lock-clock');
    if (lockClock) lockClock.textContent = clock(now);
  }

  // ---------------- lock screen ----------------
  private showLock(): void {
    this.mode = 'lock';
    this.screen.dataset.mode = 'lock';
    const c = this.game.c;
    const now = this.game.nowStamp();
    const wall = h('button', { class: 'lock-wall', type: 'button', 'aria-label': S.inspect, onclick: () => { audio.play('tap'); this.viewArt(c.lock.wallpaper); } }, artImg(c.lock.wallpaper));
    const notes = h('div', { class: 'lock-notifs' },
      ...c.lock.notifications.map((n, i) => h('div', { class: 'lock-notif', style: `animation-delay:${0.4 + i * 0.12}s` },
        h('span', { class: 'ln-icon' }, artImg(`app_${n.app}`)),
        h('div', { class: 'ln-body' },
          h('div', { class: 'ln-head' }, h('b', null, n.title), h('span', null, stamp(n.t))),
          h('div', { class: 'ln-text' }, n.text)),
      )),
    );
    const unlockBtn = h('button', { class: 'lock-unlock', type: 'button', onclick: () => this.showKeypad() }, glyph('lock'), S.swipeUp);
    const view = h('div', { class: 'view lock' },
      wall,
      h('div', { class: 'lock-scrim' }),
      h('div', { class: 'lock-top' },
        h('div', { class: 'lock-date' }, longDate(now)),
        h('div', { class: 'lock-clock' }, clock(now))),
      h('div', { class: 'lock-inspect' }, glyph('zoom'), S.inspect),
      notes,
      unlockBtn,
    );
    this.swap(view, 'fade');
  }

  private showKeypad(): void {
    audio.play('open');
    const code = this.game.c.lock.passcode;
    let entry = '';
    let fails = 0;
    const dots = h('div', { class: 'pc-dots' }, ...[...code].map(() => h('i')));
    const msg = h('div', { class: 'pc-msg' });
    const hint = h('div', { class: 'pc-hint' });
    const press = (d: string) => {
      if (entry.length >= code.length) return;
      entry += d;
      audio.play('key');
      vibrate(6);
      paint();
      if (entry.length === code.length) void check();
    };
    const paint = () => [...dots.children].forEach((el, i) => el.classList.toggle('on', i < entry.length));
    const check = async () => {
      await wait(160);
      if (entry === code) {
        audio.play('unlock');
        vibrate([10, 30, 10]);
        pad.classList.add('ok');
        await wait(350);
        this.game.set('unlocked');
        this.showHome(true);
        return;
      }
      fails++;
      audio.play('error');
      vibrate([40, 30, 40]);
      dots.classList.remove('shake');
      void dots.offsetWidth;
      dots.classList.add('shake');
      msg.textContent = S.wrongCode;
      if (fails >= 2) hint.replaceChildren(h('b', null, S.hintPrefix), ' "', this.game.c.lock.hint, '"');
      entry = '';
      setTimeout(paint, 250);
    };
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'];
    const letters: Record<string, string> = { '2': 'ABC', '3': 'DEF', '4': 'GHI', '5': 'JKL', '6': 'MNO', '7': 'PQRS', '8': 'TUV', '9': 'WXYZ' };
    const grid = h('div', { class: 'pc-grid' }, ...keys.map((k) => k === ''
      ? h('span')
      : k === '⌫'
        ? h('button', { class: 'pc-del', type: 'button', onclick: () => { entry = entry.slice(0, -1); audio.play('tap'); paint(); } }, S.delete)
        : h('button', { class: 'pc-key', type: 'button', onclick: () => press(k) }, h('b', null, k), h('small', null, letters[k] ?? ''))));
    const pad = h('div', { class: 'passcode' },
      h('div', { class: 'pc-title' }, glyph('lock'), S.enterPasscode),
      dots, msg, grid, hint,
      h('div', { class: 'pc-foot' },
        h('button', { type: 'button', class: 'pc-link', onclick: () => { audio.play('tap'); this.viewArt(this.game.c.lock.wallpaper); } }, glyph('zoom'), S.inspectShort),
        h('button', { type: 'button', class: 'pc-link', onclick: () => { cleanup(); pad.remove(); audio.play('close'); } }, S.cancel)),
    );
    const onKey = (e: KeyboardEvent) => {
      if (!pad.isConnected) return cleanup();
      if (/^[0-9]$/.test(e.key)) press(e.key);
      else if (e.key === 'Backspace') { entry = entry.slice(0, -1); paint(); }
      else if (e.key === 'Escape') { cleanup(); pad.remove(); }
    };
    const cleanup = () => window.removeEventListener('keydown', onKey);
    window.addEventListener('keydown', onKey);
    this.layer.querySelector('.view.lock')?.appendChild(pad);
  }

  // ---------------- home ----------------
  private homeEl: HTMLElement | null = null;

  private showHome(animate: boolean): void {
    this.mode = 'home';
    this.screen.dataset.mode = 'home';
    this.stack = [];
    this.homeEl = this.buildHome();
    this.swap(this.homeEl, animate ? 'unlock' : 'fade');
  }

  private badge(app: AppId): number {
    const g = this.game;
    if (app === 'messages') return g.unread.size;
    if (app === 'trace') return g.c.trace.filter((j) => !g.has(`recovered:${j.id}`) && !g.running.has(j.id) && g.traceAvailable(j.id)).length;
    if (app === 'phone') return g.c.voicemails.filter((v) => g.visible(v) && !g.has(`seen:${v.id}`)).length;
    return 0;
  }

  private icon(app: AppId, i: number): HTMLElement {
    const n = this.badge(app);
    return h('button', { class: `app-icon${app === 'trace' ? ' trace' : ''}`, type: 'button', style: `--i:${i}`, 'data-app': app, onclick: (e: Event) => this.openApp(app, e.currentTarget as HTMLElement) },
      h('span', { class: 'ai-img' }, artImg(`app_${app}`)),
      n ? h('span', { class: 'ai-badge' }, String(n)) : null,
      h('span', { class: 'ai-label' }, S.appNames[app]));
  }

  private buildHome(): HTMLElement {
    const now = this.game.nowStamp();
    const grid = HOME_GRID.filter((a) => !DOCK.includes(a));
    return h('div', { class: 'view home' },
      h('div', { class: 'home-wall' }, artImg(this.game.c.homeWallpaper)),
      h('div', { class: 'home-widget' },
        h('div', { class: 'hw-date' }, longDate(now)),
        h('div', { class: 'hw-owner' }, this.game.c.owner.name),
        h('div', { class: 'hw-batt' }, glyph('battery'), `${this.game.battery()}%`)),
      h('button', { class: 'home-search', type: 'button', onclick: () => this.openSearch() }, glyph('search'), S.search),
      h('div', { class: 'home-grid' }, ...grid.map((a, i) => this.icon(a, i))),
      h('div', { class: 'dock' }, ...DOCK.map((a, i) => this.icon(a, i + 10))),
    );
  }

  goHome(): void {
    if (this.mode === 'lock') return;
    this.setSpeechStopper(null);
    this.overlay.replaceChildren();
    if (this.mode === 'home') return;
    audio.play('close');
    this.mode = 'home';
    this.screen.dataset.mode = 'home';
    this.stack = [];
    this.homeEl = this.buildHome();
    this.swap(this.homeEl, 'close');
  }

  // ---------------- apps ----------------
  openApp(app: AppId, from?: HTMLElement): void {
    if (this.mode === 'lock') return;
    audio.play('open');
    vibrate(8);
    if (from) {
      const r = from.getBoundingClientRect();
      const s = this.screen.getBoundingClientRect();
      this.screen.style.setProperty('--ox', `${((r.left + r.width / 2 - s.left) / s.width) * 100}%`);
      this.screen.style.setProperty('--oy', `${((r.top + r.height / 2 - s.top) / s.height) * 100}%`);
    } else {
      this.screen.style.setProperty('--ox', '50%');
      this.screen.style.setProperty('--oy', '50%');
    }
    this.overlay.replaceChildren();
    this.stack = [appRoot(app, this)];
    this.mode = 'app';
    this.screen.dataset.mode = 'app';
    this.swap(this.renderView(this.top()), 'open');
  }

  openSearch(): void {
    if (this.mode === 'lock') return;
    audio.play('open');
    this.screen.style.setProperty('--ox', '50%');
    this.screen.style.setProperty('--oy', '30%');
    this.overlay.replaceChildren();
    this.stack = [searchView(this.game)];
    this.mode = 'app';
    this.screen.dataset.mode = 'app';
    this.swap(this.renderView(this.top()), 'open');
  }

  openThread(threadId: string): void {
    if (this.mode === 'lock') return;
    this.openApp('messages');
    this.push(appRoot('messages', this, threadId));
  }

  private top(): View {
    return this.stack[this.stack.length - 1];
  }

  push(v: View): void {
    audio.play('page');
    this.stack.push(v);
    this.swap(this.renderView(v), 'push');
  }

  /** Swap the top view (tabs inside an app). */
  replace(v: View): void {
    this.stack[this.stack.length - 1] = v;
    const fresh = this.renderView(v);
    fresh.classList.add('no-anim');
    const cur = this.layer.querySelector<HTMLElement>('.view.app:last-child');
    if (cur) cur.replaceWith(fresh); else this.layer.appendChild(fresh);
  }

  pop(): void {
    this.setSpeechStopper(null);
    if (this.stack.length <= 1) return this.goHome();
    audio.play('page');
    this.stack.pop();
    this.swap(this.renderView(this.top()), 'pop');
  }

  /** Re-render the current view in place after a state change. */
  refresh(): void {
    if (this.mode === 'home') {
      const old = this.homeEl;
      this.homeEl = this.buildHome();
      this.homeEl.classList.add('no-anim');
      if (old?.isConnected) old.replaceWith(this.homeEl);
      return;
    }
    if (this.mode !== 'app') return;
    const cur = this.layer.querySelector<HTMLElement>('.view.app:last-child');
    if (!cur || cur.dataset.live === '0') return;
    const body = cur.querySelector('.app-body');
    const scroll = body?.scrollTop ?? 0;
    const fresh = this.renderView(this.top());
    fresh.classList.add('no-anim');
    cur.replaceWith(fresh);
    const nb = fresh.querySelector('.app-body');
    if (nb) nb.scrollTop = scroll;
  }

  private renderView(v: View): HTMLElement {
    const body = h('div', { class: 'app-body' }, v.render(this));
    const canBack = this.stack.length > 1;
    const header = h('div', { class: `app-head${v.large ? ' large' : ''}` },
      h('button', { class: 'ah-back', type: 'button', onclick: () => this.pop() }, glyph('back'), h('span', null, canBack ? S.back : 'Home')),
      h('div', { class: 'ah-title' }, v.title),
      h('div', { class: 'ah-actions' }, ...(v.actions?.(this) ?? [])),
    );
    const el = h('div', { class: `view app app-${v.app}${v.theme ? ` theme-${v.theme}` : ''}`, 'data-key': v.key }, header, body);
    if (v.large) el.appendChild(h('div', { class: 'large-title' }, v.title));
    if (v.large) body.prepend(h('div', { class: 'large-title-spacer' }, v.title));
    return el;
  }

  private swap(next: HTMLElement, how: 'fade' | 'open' | 'close' | 'push' | 'pop' | 'unlock'): void {
    const prev = [...this.layer.children] as HTMLElement[];
    next.classList.add(`in-${how}`);
    this.layer.appendChild(next);
    for (const p of prev) {
      p.classList.add(`out-${how}`);
      p.dataset.live = '0';
      setTimeout(() => p.remove(), 420);
    }
  }

  // ---------------- banners ----------------
  banner(contactOrApp: string, text: string, onTap: () => void): void {
    audio.play('notify');
    vibrate([15, 60, 15]);
    const isTrace = contactOrApp === 'trace';
    const c = isTrace ? null : contactOf(this.game, contactOrApp);
    const b = h('button', { class: `banner${isTrace ? ' trace' : ''}`, type: 'button' },
      isTrace ? h('span', { class: 'bn-icon' }, artImg('app_trace')) : avatar(c!.avatar, 38),
      h('div', { class: 'bn-body' },
        h('div', { class: 'bn-head' }, h('b', null, isTrace ? S.traceTitle : c!.name), h('span', null, 'now')),
        h('div', { class: 'bn-text' }, text)),
    );
    b.addEventListener('click', () => { b.remove(); if (this.mode !== 'lock') onTap(); });
    this.bannerLayer.appendChild(b);
    setTimeout(() => { b.classList.add('leave'); setTimeout(() => b.remove(), 400); }, 6500);
  }

  // ---------------- viewers ----------------
  viewArt(artId: string, photo?: Photo): void {
    const img = h('img', { src: artUrl(artId), alt: '', draggable: 'false', class: 'zv-img' });
    const stage = h('div', { class: 'zv-stage' }, img);
    if (photo?.censor) {
      const bar = h('div', { class: 'censor-bar big' }, S.censoredLong);
      stage.appendChild(bar);
    }
    let zoom = 1, tx = 0, ty = 0;
    const apply = () => { img.style.transform = `translate(${tx}px, ${ty}px) scale(${zoom})`; };
    let dragging = false, sx = 0, sy = 0, moved = false;
    const pointers = new Map<number, { x: number; y: number }>();
    let pinchStart = 0, pinchZoom = 1;
    stage.addEventListener('pointerdown', (e) => {
      stage.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        pinchStart = Math.hypot(a.x - b.x, a.y - b.y);
        pinchZoom = zoom;
      }
      dragging = true; moved = false;
      const k0 = stage.offsetWidth / Math.max(1, stage.getBoundingClientRect().width);
      sx = e.clientX - tx / k0; sy = e.clientY - ty / k0;
    });
    stage.addEventListener('pointermove', (e) => {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        zoom = Math.max(1, Math.min(5, (pinchZoom * Math.hypot(a.x - b.x, a.y - b.y)) / pinchStart));
        moved = true;
        apply();
        return;
      }
      if (!dragging || zoom === 1) return;
      const k = stage.offsetWidth / Math.max(1, stage.getBoundingClientRect().width);
      const nx = (e.clientX - sx) * k, ny = (e.clientY - sy) * k;
      if (Math.abs(nx - tx) + Math.abs(ny - ty) > 2) moved = true;
      tx = nx; ty = ny;
      apply();
    });
    const end = (e: PointerEvent) => {
      pointers.delete(e.pointerId);
      if (pointers.size > 0) return;
      dragging = false;
      if (!moved) {
        // tap toggles zoom around the tapped point
        const r = stage.getBoundingClientRect();
        if (zoom > 1) { zoom = 1; tx = 0; ty = 0; }
        else {
          zoom = 2.6;
          const k = stage.offsetWidth / Math.max(1, r.width); // phone may be CSS-scaled
          tx = -(e.clientX - r.left - r.width / 2) * k * (zoom - 1);
          ty = -(e.clientY - r.top - r.height / 2) * k * (zoom - 1);
        }
        img.classList.add('anim');
        setTimeout(() => img.classList.remove('anim'), 260);
        audio.play('tap');
        apply();
      }
      if (zoom === 1) { tx = 0; ty = 0; apply(); }
    };
    stage.addEventListener('pointerup', end);
    stage.addEventListener('pointercancel', end);
    stage.addEventListener('wheel', (e) => {
      e.preventDefault();
      zoom = Math.max(1, Math.min(5, zoom * (e.deltaY < 0 ? 1.12 : 0.89)));
      if (zoom === 1) { tx = 0; ty = 0; }
      apply();
    }, { passive: false });

    let info: HTMLElement | null = null;
    if (photo) {
      const game = this.game;
      info = h('div', { class: 'zv-info' },
        h('div', { class: 'zv-row' }, h('span', null, S.photoTaken), h('b', null, `${longDate(photo.t)} · ${clock(photo.t)}`)),
        h('div', { class: 'zv-row' }, h('span', null, S.photoPlace), h('b', null, photo.place)),
        photo.device ? h('div', { class: 'zv-row' }, h('span', null, S.photoDevice), h('b', null, photo.device)) : null,
        photo.caption ? h('p', { class: 'zv-cap' }, photo.caption) : null,
        h('div', { class: 'zv-actions' }, game.isNewlyRecovered(photo) ? recoveredTag() : null, pinButton(game, photo.clue, false, { key: photo.id, title: `Photo: ${photo.place.length > 26 ? photo.place.slice(0, 25) + '…' : photo.place}`, text: `${photo.place}, ${longDate(photo.t)} ${clock(photo.t)}.`, kind: 'object', art: photo.art })),
      );
      game.markSeen(photo.id);
    }
    const close = h('button', { class: 'zv-close', type: 'button', 'aria-label': S.close, onclick: () => { audio.play('close'); viewer.classList.add('leave'); setTimeout(() => viewer.remove(), 250); } }, glyph('close'));
    const viewer = h('div', { class: `zoom-viewer${photo ? '' : ' bare'}` }, stage, close, info,
      h('div', { class: 'zv-tip' }, glyph('zoom'), 'Tap to zoom · drag to pan'));
    this.overlay.replaceChildren(viewer);
    apply();
  }

  /** Generic sheet inside the phone (used by notes unlock etc). */
  sheet(content: HTMLElement): () => void {
    const scrim = h('div', { class: 'sheet-scrim' });
    const sh = h('div', { class: 'sheet' }, h('span', { class: 'sheet-grab' }), content);
    const wrap = h('div', { class: 'sheet-wrap' }, scrim, sh);
    const close = () => { wrap.classList.add('leave'); setTimeout(() => wrap.remove(), 260); };
    scrim.addEventListener('click', close);
    this.overlay.appendChild(wrap);
    return close;
  }

  get screenEl(): HTMLElement {
    return this.screen;
  }

  clearOverlay(): void {
    clear(this.overlay);
  }
}
