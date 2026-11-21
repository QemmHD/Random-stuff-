// Case Report: choose an answer + attach a pinned clue for every question.
import { h } from '../dom';
import { artImg, glyph } from '../art';
import { audio } from '../audio';
import type { Game } from '../game';
import { S } from '../strings';

export function openReport(host: HTMLElement, game: Game, opts: { onFiled: (g: Game) => void }): void {
  audio.play('open');
  const draft = game.draft;
  const qs = game.c.questions;
  const body = h('div', { class: 'rp-body' });
  const fileBtn = h('button', { class: 'btn primary big', type: 'button' }, glyph('report'), S.fileReport);
  const msg = h('div', { class: 'rp-msg' });
  let armed = false;
  let editing = '';

  const complete = () => qs.every((q) => draft[q.id]?.option && draft[q.id]?.evidence);
  const paint = () => {
    body.replaceChildren(...qs.map((q, qi) => {
      const a = draft[q.id] ?? { option: '', evidence: '' };
      const opts = h('div', { class: 'rp-opts' }, ...q.options.map((o) => h('button', {
        type: 'button', class: `rp-opt${a.option === o.id ? ' on' : ''}`,
        onclick: () => { draft[q.id] = { ...a, option: o.id }; audio.play('tap'); game.save(); paint(); },
      }, o.art ? h('span', { class: 'avatar' }, artImg(o.art)) : h('span', { class: 'rp-radio' }), h('span', null, o.label))));
      const pins = game.pins.map((p) => game.clue(p.id)!).filter(Boolean);
      const chosen = a.evidence ? game.clue(a.evidence) : undefined;
      // Once evidence is attached the list collapses to the chosen clue; "Change" reopens it.
      const ev = chosen && editing !== q.id
        ? h('div', { class: 'rp-ev' },
          h('button', { type: 'button', class: 'rp-chip on', title: chosen.text, onclick: () => { editing = q.id; audio.play('tap'); paint(); } }, glyph('pin'), chosen.title),
          h('button', { type: 'button', class: 'rp-change', onclick: () => { editing = q.id; audio.play('tap'); paint(); } }, S.changeEvidence))
        : h('div', { class: 'rp-ev' }, pins.length ? pins.map((cl) => h('button', {
          type: 'button', class: `rp-chip${a.evidence === cl.id ? ' on' : ''}`, title: cl.text,
          onclick: () => { draft[q.id] = { ...a, evidence: cl.id }; editing = ''; audio.play('pin'); game.save(); paint(); },
        }, glyph('pin'), cl.title)) : h('div', { class: 'muted' }, S.noEvidence));
      return h('section', { class: `rp-q${a.option && a.evidence ? ' done' : ''}` },
        h('div', { class: 'rp-num' }, String(qi + 1).padStart(2, '0')),
        h('h3', null, q.prompt),
        h('div', { class: 'rp-label' }, S.chooseAnswer), opts,
        h('div', { class: 'rp-label' }, S.chooseEvidence), ev);
    }));
    fileBtn.classList.toggle('ready', complete());
    const n = qs.filter((q) => draft[q.id]?.option && draft[q.id]?.evidence).length;
    msg.textContent = `${n}/${qs.length}`;
  };
  paint();

  const close = () => { audio.play('close'); wrap.classList.add('leave'); setTimeout(() => wrap.remove(), 280); };
  fileBtn.addEventListener('click', () => {
    if (!complete()) { audio.play('error'); msg.textContent = S.incomplete; msg.classList.add('err'); return; }
    if (!armed) {
      armed = true;
      audio.play('tap');
      fileBtn.classList.add('armed');
      fileBtn.replaceChildren(glyph('report'), S.fileConfirm);
      setTimeout(() => { armed = false; fileBtn.classList.remove('armed'); fileBtn.replaceChildren(glyph('report'), S.fileReport); }, 3500);
      return;
    }
    game.fileReport({ ...draft });
    wrap.remove();
    opts.onFiled(game);
  });
  const wrap = h('div', { class: 'modal report' },
    h('div', { class: 'modal-card' },
      h('div', { class: 'modal-head' }, h('div', null, h('small', null, `CASE ${game.c.number} · ${game.c.title.toUpperCase()}`), h('h2', null, S.reportTitle)),
        h('button', { class: 'icon-btn', type: 'button', 'aria-label': S.close, onclick: close }, glyph('close'))),
      h('p', { class: 'rp-intro' }, S.reportIntro),
      body,
      h('div', { class: 'rp-foot' }, msg, fileBtn)));
  wrap.addEventListener('click', (e) => { if (e.target === wrap) close(); });
  host.appendChild(wrap);
}
