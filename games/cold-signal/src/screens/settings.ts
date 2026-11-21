// Settings modal (sound, ambience, haptics, text size, reduce motion).
import { h } from '../dom';
import { glyph } from '../art';
import { audio } from '../audio';
import { S } from '../strings';

function getPref(k: string, d: string): string {
  try { return localStorage.getItem(k) ?? d; } catch { return d; }
}
function setPref(k: string, v: string): void {
  try { localStorage.setItem(k, v); } catch { /* ignore */ }
}

export function applyPrefs(): void {
  const root = document.documentElement;
  root.dataset.text = getPref('cs.text', 'm');
  root.classList.toggle('reduce-motion', getPref('cs.motion', '0') === '1' || matchMedia('(prefers-reduced-motion: reduce)').matches);
}

export function openSettings(host: HTMLElement, opts: { extra?: { label: string; act: () => void }[] } = {}): void {
  audio.play('open');
  const toggle = (label: string, get: () => boolean, set: (v: boolean) => void) => {
    const b = h('button', { type: 'button', class: 'toggle', role: 'switch' });
    const sync = () => { b.classList.toggle('on', get()); b.setAttribute('aria-checked', String(get())); };
    b.addEventListener('click', () => { set(!get()); audio.play('tap'); sync(); });
    sync();
    return h('div', { class: 'set-line' }, h('span', null, label), b);
  };
  const sizes = h('div', { class: 'seg small' }, ...(['s', 'm', 'l', 'xl'] as const).map((s) => h('button', {
    type: 'button', class: getPref('cs.text', 'm') === s ? 'on' : '',
    onclick: (e: Event) => { setPref('cs.text', s); applyPrefs(); audio.play('tap'); sizes.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === e.currentTarget)); },
  }, s.toUpperCase())));
  const close = () => { audio.play('close'); wrap.classList.add('leave'); setTimeout(() => wrap.remove(), 250); };
  const wrap = h('div', { class: 'modal settings-modal' },
    h('div', { class: 'modal-card small' },
      h('div', { class: 'modal-head' }, h('h2', null, S.settings), h('button', { class: 'icon-btn', type: 'button', 'aria-label': S.close, onclick: close }, glyph('close'))),
      toggle(S.sound, () => !audio.muted, (v) => audio.setMuted(!v)),
      toggle(S.music, () => audio.musicOn, (v) => audio.setMusic(v)),
      toggle(S.haptics, () => getPref('cs.haptics', '1') === '1', (v) => setPref('cs.haptics', v ? '1' : '0')),
      toggle(S.reduceMotion, () => getPref('cs.motion', '0') === '1', (v) => { setPref('cs.motion', v ? '1' : '0'); applyPrefs(); }),
      h('div', { class: 'set-line' }, h('span', null, S.textSize), sizes),
      ...(opts.extra ?? []).map((x) => h('button', { type: 'button', class: 'btn ghost wide', onclick: () => { wrap.remove(); x.act(); } }, x.label)),
    ));
  wrap.addEventListener('click', (e) => { if (e.target === wrap) close(); });
  host.appendChild(wrap);
}
