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
  private flow = false;
  private connectFrom = '';
  private banner: HTMLElement | null = null;

  constructor(private game: Game, opts: { onClose?: () => void; docked?: boolean } = {}) {
    this.surface = h('div', { class: 'board-surface' });
    this.strings = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.strings.setAttribute('class', 'board-strings');
    this.surface.appendChild(this.strings);
    const head = h('div', { class: 'board-head' },
      h('div', { class: 'bh-title' }, glyph('board'), h('b', null, S.boardTitle), h('span', { class: 'bh-count' })),
      h('div', { class: 'bh-actions' },
        game.c.comparisons?.length ? h('button', { class: 'bh-compare', type: 'button', 'aria-label': S.compareRecords, hidden: true, onclick: () => this.showComparisons() }, S.compareShort) : null,
        h('button', { class: 'bh-tidy', type: 'button', onclick: () => { audio.play('page'); game.tidyPins(); } }, S.tidy),
        opts.onClose ? h('button', { class: 'icon-btn', type: 'button', 'aria-label': S.close, onclick: () => opts.onClose?.() }, glyph('close')) : null));
    this.el = h('section', { class: `board${opts.docked ? ' docked' : ''}` }, head, this.surface);
    this.unsub = game.on((e) => { if (e.kind === 'change' || e.kind === 'pinned') this.render(); });
    this.render();
    new ResizeObserver(() => {
      // Narrow boards (phones) switch to a readable scrolling grid.
      const flow = this.surface.clientWidth > 0 && this.surface.clientWidth < 560;
      if (flow !== this.flow) { this.flow = flow; this.render(); } else this.drawStrings();
    }).observe(this.surface);
  }

  dispose(): void {
    this.unsub();
  }

  render(): void {
    const g = this.game;
    this.surface.classList.toggle('flow', this.flow);
    this.el.querySelector('.bh-tidy')?.toggleAttribute('hidden', this.flow);
    this.el.querySelector('.bh-compare')?.toggleAttribute('hidden', !this.availableComparisons().length);
    const count = this.el.querySelector('.bh-count');
    if (count) count.textContent = S.pinnedCount(g.pins.length);
    [...this.surface.querySelectorAll('.ev-card, .empty')].forEach((n) => n.remove());
    if (!g.pins.length) {
      this.surface.appendChild(h('div', { class: 'empty board-empty' }, h('div', { class: 'be-card' }, h('span', { class: 'ev-tack' }), glyph('pin'), h('b', null, S.boardEmptyTitle), h('span', null, S.boardEmpty))));
    }
    const fresh = this.lastCount >= 0 && g.pins.length > this.lastCount ? g.pins[g.pins.length - 1].id : '';
    this.lastCount = g.pins.length;
    g.pins.forEach((p, i) => {
      const clue = g.clue(p.id);
      if (!clue) return;
      const rot = ((i * 37) % 9) - 4;
      const card = h('div', { class: `ev-card kind-${clue.kind}${fresh === p.id ? ' fresh' : ''}${this.connectFrom === p.id ? ' connecting' : ''}`, style: this.flow ? `--rot:${rot / 2}deg` : `left:${p.x * 100}%;top:${p.y * 100}%;--rot:${rot}deg`, 'data-id': p.id, tabindex: '0' },
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
    const W = this.surface.clientWidth, H = this.flow ? this.surface.scrollHeight : this.surface.clientHeight;
    if (!W) return;
    this.strings.setAttribute('viewBox', `0 0 ${W} ${H}`);
    this.strings.style.height = this.flow ? `${H}px` : '';
    const center = (id: string) => {
      const el = this.surface.querySelector<HTMLElement>(`.ev-card[data-id="${id}"]`);
      if (!el) return null;
      return { x: el.offsetLeft + el.offsetWidth / 2, y: el.offsetTop + 10 };
    };
    const paths = this.game.links.map(([a, b]) => {
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
      if (this.flow) return;
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
        this.tapCard(id);
      }
    };
    card.addEventListener('pointerup', up);
    card.addEventListener('pointercancel', up);
    card.addEventListener('click', () => { if (this.flow) this.tapCard(id); });
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') this.tapCard(id); });
  }

  private tapCard(id: string): void {
    if (this.connectFrom) {
      const from = this.connectFrom;
      this.connectFrom = '';
      this.banner?.remove();
      if (from !== id) {
        const added = this.game.toggleLink(from, id);
        audio.play(added ? 'pin' : 'unpin');
      } else this.render();
      return;
    }
    this.showDetail(id);
  }

  private startConnect(id: string): void {
    this.connectFrom = id;
    audio.play('tap');
    this.banner?.remove();
    this.banner = h('div', { class: 'connect-banner' }, glyph('board'), h('span', null, S.connectPrompt),
      h('button', { type: 'button', onclick: () => { this.connectFrom = ''; this.banner?.remove(); this.render(); } }, S.cancel));
    this.el.appendChild(this.banner);
    this.render();
  }

  private availableComparisons() {
    return (this.game.c.comparisons ?? []).filter((pair) => pair.clues.some((id) => this.game.isPinned(id)));
  }

  private showComparisons(): void {
    const pairs = this.availableComparisons();
    if (!pairs.length) return;
    audio.play('page');
    this.detail?.remove();
    const close = () => {
      overlay.classList.add('leave');
      setTimeout(() => overlay.remove(), 220);
      this.el.querySelector<HTMLButtonElement>('.bh-compare')?.focus();
    };
    const entries = pairs.map((pair) => {
      const [first, second] = pair.clues.map((id) => this.game.isPinned(id) ? this.game.clue(id) : undefined);
      return h('article', { class: 'ev-compare-pair' },
        h('h4', null, pair.title),
        h('div', { class: 'ev-compare-sources' }, ...[first, second].map((clue) =>
          h('div', { class: 'ev-compare-source' },
            clue ? h('b', null, clue.title) : null,
            h('p', null, clue?.text ?? S.compareOther)))),
        first && second ? h('p', { class: 'ev-compare-finding' }, pair.finding) : null);
    });
    const dismiss = h('button', { class: 'btn', type: 'button', onclick: close }, S.close);
    const overlay = h('div', { class: 'ev-detail' },
      h('section', { class: 'evd-card ev-compare', role: 'dialog', 'aria-label': S.compareRecords },
        h('header', null, h('h3', null, S.compareRecords), dismiss), ...entries));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    this.detail = overlay;
    this.el.appendChild(overlay);
    dismiss.focus();
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
          this.game.pins.length > 1 ? h('button', { class: 'btn connect', type: 'button', onclick: () => { close(); this.startConnect(id); } }, glyph('board'), S.connect) : null,
          h('button', { class: 'btn', type: 'button', onclick: close }, S.close))));
    d.addEventListener('click', (e) => { if (e.target === d) close(); });
    this.detail = d;
    this.el.appendChild(d);
  }
}

function kindGlyph(kind: string): string {
  return kind === 'person' ? 'info' : kind === 'place' ? 'location' : kind === 'object' ? 'search' : kind === 'event' ? 'star' : 'folder';
}
