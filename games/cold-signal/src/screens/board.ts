// Evidence board: draggable pinned cards on cork, with red string between
// clues that support the same conclusion.
import { h } from '../dom';
import { artImg, glyph } from '../art';
import { audio } from '../audio';
import type { Game } from '../game';
import { S } from '../strings';

const KIND_LABEL: Record<string, string> = { person: 'PERSON', place: 'PLACE', object: 'OBJECT', document: 'DOCUMENT', event: 'EVENT' };

export class Board {
  readonly el: HTMLElement;
  private surface: HTMLElement;
  private strings: SVGSVGElement;
  private unsub: () => void;
  private detail: HTMLElement | null = null;
  private lastCount = -1;

  constructor(private game: Game, opts: { onClose?: () => void; docked?: boolean } = {}) {
    this.surface = h('div', { class: 'board-surface' });
    this.strings = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.strings.setAttribute('class', 'board-strings');
    this.surface.appendChild(this.strings);
    const head = h('div', { class: 'board-head' },
      h('div', { class: 'bh-title' }, glyph('board'), h('b', null, S.boardTitle), h('span', { class: 'bh-count' })),
      h('div', { class: 'bh-actions' },
        h('button', { class: 'bh-tidy', type: 'button', onclick: () => { audio.play('page'); game.tidyPins(); } }, S.tidy),
        opts.onClose ? h('button', { class: 'icon-btn', type: 'button', 'aria-label': S.close, onclick: () => opts.onClose?.() }, glyph('close')) : null));
    this.el = h('section', { class: `board${opts.docked ? ' docked' : ''}` }, head, this.surface);
    this.unsub = game.on((e) => { if (e.kind === 'change' || e.kind === 'pinned') this.render(); });
    this.render();
    new ResizeObserver(() => this.drawStrings()).observe(this.surface);
  }

  dispose(): void {
    this.unsub();
  }

  private relatedPairs(): [string, string][] {
    const pinned = new Set(this.game.pins.map((p) => p.id));
    const pairs: [string, string][] = [];
    const seen = new Set<string>();
    for (const q of this.game.c.questions) {
      const ev = q.evidence.filter((id) => pinned.has(id));
      for (let i = 1; i < ev.length; i++) {
        const k = [ev[i - 1], ev[i]].sort().join('|');
        if (!seen.has(k)) { seen.add(k); pairs.push([ev[i - 1], ev[i]]); }
      }
    }
    return pairs;
  }

  render(): void {
    const g = this.game;
    const count = this.el.querySelector('.bh-count');
    if (count) count.textContent = S.progress(g.pins.length, g.c.clues.length);
    [...this.surface.querySelectorAll('.ev-card, .empty')].forEach((n) => n.remove());
    if (!g.pins.length) {
      this.surface.appendChild(h('div', { class: 'empty board-empty' }, glyph('pin'), S.boardEmpty));
    }
    const fresh = this.lastCount >= 0 && g.pins.length > this.lastCount ? g.pins[g.pins.length - 1].id : '';
    this.lastCount = g.pins.length;
    g.pins.forEach((p, i) => {
      const clue = g.clue(p.id);
      if (!clue) return;
      const rot = ((i * 37) % 9) - 4;
      const card = h('div', { class: `ev-card kind-${clue.kind}${fresh === p.id ? ' fresh' : ''}`, style: `left:${p.x * 100}%;top:${p.y * 100}%;--rot:${rot}deg`, 'data-id': p.id, tabindex: '0' },
        h('span', { class: 'ev-tack' }),
        clue.art ? h('div', { class: 'ev-img' }, artImg(clue.art)) : h('div', { class: 'ev-img ev-type' }, glyph(kindGlyph(clue.kind))),
        h('div', { class: 'ev-kind' }, KIND_LABEL[clue.kind]),
        h('b', { class: 'ev-title' }, clue.title));
      this.makeDraggable(card, p.id);
      this.surface.appendChild(card);
    });
    requestAnimationFrame(() => this.drawStrings());
  }

  private drawStrings(): void {
    const sr = this.surface.getBoundingClientRect();
    if (!sr.width) return;
    this.strings.setAttribute('viewBox', `0 0 ${sr.width} ${sr.height}`);
    const center = (id: string) => {
      const el = this.surface.querySelector<HTMLElement>(`.ev-card[data-id="${id}"]`);
      if (!el) return null;
      return { x: el.offsetLeft + el.offsetWidth / 2, y: el.offsetTop + 10 };
    };
    const paths = this.relatedPairs().map(([a, b]) => {
      const A = center(a), B = center(b);
      if (!A || !B) return '';
      const sag = Math.min(60, Math.hypot(B.x - A.x, B.y - A.y) * 0.18);
      const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2 + sag;
      return `<path d="M${A.x} ${A.y} Q${mx} ${my} ${B.x} ${B.y}"/>`;
    });
    this.strings.innerHTML = paths.join('');
  }

  private makeDraggable(card: HTMLElement, id: string): void {
    let sx = 0, sy = 0, ox = 0, oy = 0, moved = false, down = false;
    card.addEventListener('pointerdown', (e) => {
      down = true; moved = false;
      card.setPointerCapture(e.pointerId);
      sx = e.clientX; sy = e.clientY; ox = card.offsetLeft; oy = card.offsetTop;
      card.classList.add('lift');
    });
    card.addEventListener('pointermove', (e) => {
      if (!down) return;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (!moved && Math.hypot(dx, dy) < 5) return;
      moved = true;
      const W = this.surface.clientWidth, H = this.surface.clientHeight;
      card.style.left = `${((ox + dx) / W) * 100}%`;
      card.style.top = `${((oy + dy) / H) * 100}%`;
      this.drawStrings();
    });
    const up = () => {
      if (!down) return;
      down = false;
      card.classList.remove('lift');
      if (moved) {
        const W = this.surface.clientWidth, H = this.surface.clientHeight;
        this.game.movePin(id, card.offsetLeft / W, card.offsetTop / H);
        audio.play('pin');
      } else {
        this.showDetail(id);
      }
    };
    card.addEventListener('pointerup', up);
    card.addEventListener('pointercancel', up);
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') this.showDetail(id); });
  }

  private showDetail(id: string): void {
    const clue = this.game.clue(id);
    if (!clue) return;
    audio.play('page');
    this.detail?.remove();
    const close = () => { d.classList.add('leave'); setTimeout(() => d.remove(), 220); };
    const d = h('div', { class: 'ev-detail' },
      h('div', { class: 'evd-card' },
        clue.art ? h('div', { class: 'evd-img' }, artImg(clue.art)) : null,
        h('div', { class: 'ev-kind' }, KIND_LABEL[clue.kind]),
        h('h3', null, clue.title),
        h('p', null, clue.text),
        h('div', { class: 'evd-actions' },
          h('button', { class: 'btn ghost', type: 'button', onclick: () => { this.game.unpin(id); audio.play('unpin'); close(); } }, glyph('trash'), S.unpin),
          h('button', { class: 'btn', type: 'button', onclick: close }, S.close))));
    d.addEventListener('click', (e) => { if (e.target === d) close(); });
    this.detail = d;
    this.el.appendChild(d);
  }
}

function kindGlyph(kind: string): string {
  return kind === 'person' ? 'info' : kind === 'place' ? 'location' : kind === 'object' ? 'search' : kind === 'event' ? 'star' : 'folder';
}
