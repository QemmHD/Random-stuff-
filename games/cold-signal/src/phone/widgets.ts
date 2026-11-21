import { h, vibrate } from '../dom';
import { artImg, glyph, hasArt } from '../art';
import { audio } from '../audio';
import type { Game } from '../game';
import type { Contact } from '../types';
import { S } from '../strings';

export function contactOf(game: Game, id: string): Contact {
  const c = game.c.contacts.find((x) => x.id === id);
  if (c) return c;
  if (id === 'me') return { id: 'me', name: game.c.owner.name, avatar: ownerAvatar(game), number: '' };
  return { id, name: id, avatar: 'av_unknown', number: id };
}

export function ownerAvatar(game: Game): string {
  const guess = `av_${game.c.owner.name.split(' ')[0].toLowerCase()}`;
  if (hasArt(guess)) return guess;
  const c2 = `av_c${Number(game.c.number)}_${game.c.owner.name.split(' ')[0].toLowerCase()}`;
  return hasArt(c2) ? c2 : 'av_generic_1';
}

export function avatar(id: string, size = 40): HTMLElement {
  const wrap = h('span', { class: 'avatar', style: `width:${size}px;height:${size}px` });
  wrap.appendChild(artImg(id));
  return wrap;
}

/** Pin-to-board button for anything carrying a clue. */
export function pinButton(game: Game, clueId: string | undefined, compact = false): HTMLElement | null {
  if (!clueId || !game.clue(clueId)) return null;
  const btn = h('button', { class: `pin-btn${compact ? ' compact' : ''}`, type: 'button', 'aria-label': S.pinAria });
  const sync = () => {
    const on = game.isPinned(clueId);
    btn.classList.toggle('on', on);
    btn.replaceChildren(glyph(on ? 'check' : 'pin'), compact ? '' : h('span', null, on ? S.pinned : S.pin));
  };
  sync();
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (game.isPinned(clueId)) {
      flyToast(btn, S.alreadyPinned);
      audio.play('tap');
      return;
    }
    if (game.pin(clueId)) {
      audio.play('pin');
      vibrate(18);
      btn.classList.add('pop');
      flyCard(btn, game.clue(clueId)!.title);
      sync();
    }
  });
  return btn;
}

/** A small card that flies from the source element to the board button. */
export function flyCard(from: HTMLElement, title: string): void {
  const target = document.querySelector<HTMLElement>('[data-fly-target]');
  const a = from.getBoundingClientRect();
  const card = h('div', { class: 'fly-card' }, glyph('pin'), title);
  document.body.appendChild(card);
  card.style.left = `${a.left + a.width / 2}px`;
  card.style.top = `${a.top + a.height / 2}px`;
  requestAnimationFrame(() => {
    let dx = 0, dy = -120;
    if (target) {
      const b = target.getBoundingClientRect();
      dx = b.left + b.width / 2 - (a.left + a.width / 2);
      dy = b.top + b.height / 2 - (a.top + a.height / 2);
    }
    card.style.setProperty('--dx', `${dx}px`);
    card.style.setProperty('--dy', `${dy}px`);
    card.classList.add('go');
  });
  setTimeout(() => {
    card.remove();
    target?.classList.remove('bump');
    void target?.offsetWidth;
    target?.classList.add('bump');
  }, 750);
}

export function flyToast(near: HTMLElement, text: string): void {
  const r = near.getBoundingClientRect();
  const t = h('div', { class: 'mini-toast' }, text);
  t.style.left = `${r.left + r.width / 2}px`;
  t.style.top = `${r.top - 8}px`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1300);
}

export function recoveredTag(): HTMLElement {
  return h('span', { class: 'recovered-tag' }, glyph('restore'), S.recovered);
}

export function sectionTitle(text: string): HTMLElement {
  return h('div', { class: 'section-title' }, text);
}

export function emptyState(text: string): HTMLElement {
  return h('div', { class: 'empty' }, text);
}
