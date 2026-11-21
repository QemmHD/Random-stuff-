// Title, case files, briefing, boot and epilogue screens.
import { h, wait } from '../dom';
import { artImg, glyph } from '../art';
import { audio } from '../audio';
import { getProgress, hasSave, resetCase, type Game } from '../game';
import { CASES } from '../cases';
import { CAUGHT } from '../cases/caught';
import { S } from '../strings';
import type { CaseFile } from '../types';
import { openSettings } from './settings';
import { avatarFor } from './util';
import { viewCase } from '../mature';

// ---------------- animated background ----------------
export function noiseCanvas(): HTMLCanvasElement {
  const cv = h('canvas', { class: 'bg-canvas', 'aria-hidden': 'true' });
  const ctx = cv.getContext('2d');
  let w = 0, ht = 0, raf = 0, t = 0;
  const drops = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random(), s: 0.4 + Math.random() * 0.9, l: 8 + Math.random() * 18 }));
  const resize = () => {
    const dpr = Math.min(1.5, devicePixelRatio || 1);
    w = cv.clientWidth; ht = cv.clientHeight;
    cv.width = Math.max(1, w * dpr); cv.height = Math.max(1, ht * dpr);
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const frame = () => {
    if (!cv.isConnected) { cancelAnimationFrame(raf); return; }
    if (!ctx) return;
    if (cv.clientWidth !== w || cv.clientHeight !== ht) resize();
    t += 1 / 60;
    ctx.clearRect(0, 0, w, ht);
    // signal pulses
    const cx = w * 0.5, cy = ht * 0.42;
    for (let i = 0; i < 4; i++) {
      const r = ((t * 60 + i * 140) % 560);
      ctx.strokeStyle = `rgba(110, 240, 225, ${0.16 * (1 - r / 560)})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    // rain
    ctx.strokeStyle = 'rgba(170, 210, 230, 0.13)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (const d of drops) {
      d.y += 0.006 * d.s; d.x -= 0.0012 * d.s;
      if (d.y > 1.05) { d.y = -0.05; d.x = Math.random() * 1.1; }
      if (d.x < -0.05) d.x = 1.05;
      ctx.moveTo(d.x * w, d.y * ht);
      ctx.lineTo(d.x * w + d.l * 0.25, d.y * ht - d.l);
    }
    ctx.stroke();
    raf = requestAnimationFrame(frame);
  };
  requestAnimationFrame(() => { resize(); frame(); });
  return cv;
}

// ---------------- title ----------------
export function titleScreen(onStart: () => void): HTMLElement {
  const el = h('div', { class: 'screen-title' },
    noiseCanvas(),
    h('div', { class: 'title-vignette', 'aria-hidden': 'true' }),
    h('div', { class: 'title-frame', 'aria-hidden': 'true' },
      h('i', { class: 'tf-c tl' }), h('i', { class: 'tf-c tr' }), h('i', { class: 'tf-c bl' }), h('i', { class: 'tf-c br' }),
      h('span', { class: 'tf-label l' }, S.titleUnit),
      h('span', { class: 'tf-label r' }, h('b'), S.titleRec)),
    h('div', { class: 'title-inner' },
      h('div', { class: 'logo' }, artImg('logo_mark')),
      h('div', { class: 'title-kicker' }, S.titleKicker),
      h('h1', { class: 'title-word', 'data-text': S.gameTitle }, S.gameTitle),
      h('p', { class: 'title-sub' }, S.gameSub),
      h('button', { class: 'btn primary big pulse title-cta', type: 'button', onclick: () => { audio.unlock(); audio.play('unlock'); onStart(); } }, S.tapToBegin)),
    h('div', { class: 'title-foot' }, S.titleFoot),
  );
  return el;
}

// ---------------- case files ----------------
export function filesScreen(onOpen: (c: CaseFile) => void, tabArg?: 'cold' | 'caught'): HTMLElement {
  const prog = getProgress();
  let tab: 'cold' | 'caught' = tabArg ?? 'cold';
  if (!tabArg) { try { tab = localStorage.getItem('cs.tab') === 'caught' ? 'caught' : 'cold'; } catch { /* ignore */ } }
  const LIST = tab === 'caught' && CAUGHT.length ? CAUGHT : CASES;
  if (LIST === CASES) tab = 'cold';
  const root = h('div', { class: `screen-files tab-${tab}` }, noiseCanvas());
  const cards = LIST.map((c, i) => {
    const prev = LIST[i - 1];
    const locked = !!prev && prog[prev.id] === undefined;
    const stars = prog[c.id];
    const saved = hasSave(c.id);
    let armed = false;
    const restart = saved ? h('button', { class: 'btn ghost small', type: 'button', onclick: (e: Event) => {
      e.stopPropagation();
      const b = e.currentTarget as HTMLElement;
      if (!armed) { armed = true; b.textContent = S.restartConfirm; audio.play('tap'); setTimeout(() => { armed = false; b.textContent = S.restartCase; }, 3000); return; }
      resetCase(c.id); audio.play('unpin'); root.replaceWith(filesScreen(onOpen, tab));
    } }, S.restartCase) : null;
    return h('article', { class: `case-card${locked ? ' locked' : ''}`, style: `--i:${i}` },
      h('div', { class: 'cc-cover' }, artImg(c.cover), h('div', { class: 'cc-num' }, c.number), locked ? h('div', { class: 'cc-lock' }, h('b', { class: 'cc-tape' }, S.classified), glyph('lock'), h('span', null, S.lockedCase)) : null,
        stars !== undefined ? h('div', { class: `cc-stamp${stars >= 2 ? ' closed' : ''}` }, stars >= 2 ? S.stampClosed : S.stampFiled) : null),
      h('div', { class: 'cc-body' },
        h('div', { class: 'cc-meta' }, h('span', null, `CASE ${c.number}`), h('span', { class: 'cc-diff' }, S.difficulty[c.difficulty], ' ', h('i', { class: `pips d${c.difficulty}` }, h('b'), h('b'), h('b')))),
        h('h2', null, c.title),
        h('p', null, c.tagline),
        h('div', { class: 'cc-stars' }, stars !== undefined ? S.stars(stars) : ''),
        h('div', { class: 'cc-actions' },
          h('button', { class: 'btn primary', type: 'button', disabled: locked, onclick: () => { audio.play('open'); onOpen(c); } }, saved ? S.continueCase : S.newCase),
          restart)));
  });
  root.append(...[
    h('header', { class: 'files-head' },
      h('div', { class: 'fh-brand' }, artImg('logo_mark'), h('div', null, h('b', null, S.gameTitle), h('span', null, S.caseFiles))),
      h('div', { class: 'fh-right' },
        rankBadge(prog),
        h('button', { class: 'icon-btn', type: 'button', 'aria-label': S.settings, onclick: () => openSettings(root) }, glyph('settings')))),
    CAUGHT.length ? h('div', { class: 'mode-tabs', role: 'tablist' }, ...(['cold', 'caught'] as const).map((t) => h('button', {
      type: 'button', role: 'tab', class: `mode-tab${t === tab ? ' on' : ''}`, 'aria-selected': String(t === tab),
      onclick: () => { if (t === tab) return; try { localStorage.setItem('cs.tab', t); } catch { /* ignore */ } audio.play('page'); root.replaceWith(filesScreen(onOpen, t)); },
    }, h('b', null, t === 'cold' ? S.tabCold : S.tabCaught), h('span', null, t === 'cold' ? S.tabColdSub : S.tabCaughtSub)))) : null,
    tab === 'caught'
      ? h('div', { class: 'files-intro' }, h('small', null, S.caughtKicker), h('h1', null, S.caughtHeading), h('p', null, S.caughtSub))
      : h('div', { class: 'files-intro' }, h('small', null, S.filesKicker), h('h1', null, S.filesHeading), h('p', null, S.filesSub)),
    h('div', { class: 'case-row' }, ...cards),
    h('div', { class: 'files-foot muted' }, S.filesFoot)].filter((x): x is HTMLElement => !!x));
  return root;
}

function rankBadge(prog: Record<string, number>): HTMLElement {
  const stars = CASES.reduce((n, c) => n + (prog[c.id] ?? 0), 0);
  const max = CASES.length * 3;
  const idx = Math.min(S.ranks.length - 1, Math.floor((stars / max) * (S.ranks.length - 1) + 1e-9));
  return h('div', { class: 'rank' }, h('span', null, S.rankLabel), h('b', null, S.ranks[idx]), h('i', null, `★ ${stars}/${max}`));
}

// ---------------- briefing ----------------
export function briefingScreen(raw: CaseFile, onBegin: () => void, onBack: () => void): HTMLElement {
  const c = viewCase(raw);
  const paras = h('div', { class: 'br-paras' });
  const go = h('button', { class: 'btn primary big', type: 'button', onclick: () => { audio.play('unlock'); onBegin(); } }, glyph('phone_in'), S.beginInvestigation);
  const root = h('div', { class: 'screen-brief' },
    h('div', { class: 'br-bg' }, artImg(c.cover)),
    h('div', { class: 'br-card' },
      h('button', { class: 'br-back', type: 'button', onclick: onBack }, glyph('back'), S.caseFiles),
      h('div', { class: 'br-top' },
        h('div', { class: 'br-photo' }, artImg(avatarFor(c)), h('span', { class: 'br-stamp' }, c.status ?? 'MISSING')),
        h('div', null,
          h('small', null, `CASE ${c.number} · ${S.briefingTitle.toUpperCase()}`),
          h('h1', null, c.title),
          h('div', { class: 'br-subject' }, h('span', null, S.subject), h('b', null, `${c.owner.name}, ${c.owner.age}`), h('span', { class: 'muted' }, c.owner.summary)))),
      paras,
      go));
  // typewriter reveal (tap anywhere to skip)
  let skipped = false;
  void (async () => {
    await wait(350);
    for (const p of c.briefing) {
      const el = h('p', { class: 'typing' });
      paras.appendChild(el);
      const fast = document.documentElement.classList.contains('reduce-motion');
      if (fast) { el.textContent = p; continue; }
      for (let i = 0; i <= p.length; i += 4) {
        if (!root.isConnected || skipped) return;
        el.textContent = p.slice(0, i);
        if (i % 8 === 0) audio.play('type');
        await wait(9);
      }
      el.textContent = p;
      el.classList.remove('typing');
      await wait(160);
    }
    go.classList.add('pulse');
  })();
  root.addEventListener('click', (e) => {
    // tap anywhere to finish typing instantly
    if ((e.target as HTMLElement).closest('button') || skipped) return;
    skipped = true;
    paras.replaceChildren(...c.briefing.map((p) => h('p', null, p)));
    go.classList.add('pulse');
  });
  return root;
}

// ---------------- boot ----------------
export async function bootSequence(host: HTMLElement, c: CaseFile): Promise<void> {
  const lines = h('pre', { class: 'boot-lines' });
  const el = h('div', { class: 'boot' }, h('div', { class: 'boot-logo' }, artImg('logo_mark')), lines);
  host.appendChild(el);
  let skip = false;
  el.addEventListener('click', () => { skip = true; });
  const L = [
    `> TRACE v4.2 — Cold Signal Unit`,
    `> device connected: ${S.modelName} (owner: ${c.owner.name})`,
    `> condition: ${(c.deviceCondition ?? 'ok').toLowerCase()}`,
    `> partition table OK · user data encrypted`,
    `> powering display…`,
  ];
  for (const l of L) {
    if (skip) break;
    lines.textContent += `${l}\n`;
    audio.play('type');
    await wait(330);
  }
  audio.play('scan');
  el.classList.add('leave');
  await wait(500);
  el.remove();
}

// ---------------- epilogue ----------------
export function epilogueScreen(g: Game, onFiles: () => void, onReopen: () => void): HTMLElement {
  const r = g.report!;
  const c = g.c;
  const solved = r.solved;
  audio.stopAmbient();
  setTimeout(() => audio.play(solved ? 'success' : 'fail'), 500);
  const stars = h('div', { class: 'ep-stars' }, ...[0, 1, 2].map((i) => h('span', { class: i < r.stars ? 'on' : '', style: `animation-delay:${1.1 + i * 0.25}s` }, '★')));
  const mins = Math.max(1, Math.round(g.totalPlayMs() / 60000));
  const paras = (solved ? c.epilogue.solved : c.epilogue.partial).map((p, i) => h('p', { style: `animation-delay:${1.8 + i * 0.9}s` }, p));
  const results = c.questions.map((q) => {
    const a = r.answers[q.id];
    const ok = a?.option === q.answer;
    const evOk = ok && q.evidence.includes(a.evidence);
    return h('div', { class: `ep-q ${ok ? 'ok' : 'bad'}` },
      glyph(ok ? 'check' : 'x'),
      h('div', null, h('b', null, q.prompt), ok ? h('span', null, q.explain) : h('span', { class: 'muted' }, S.wrong),
        ok && !evOk ? h('em', null, S.weakEvidence) : null));
  });
  return h('div', { class: `screen-epilogue ${solved ? 'solved' : 'partial'}` },
    h('div', { class: 'ep-bg' }, artImg(c.cover)),
    h('div', { class: 'ep-card' },
      h('small', null, `CASE ${c.number} · ${c.title.toUpperCase()}`),
      h('div', { class: 'ep-stamp-wrap' }, h('div', { class: 'ep-stamp' }, solved ? S.caseClosed : S.caseOpen)),
      stars,
      h('div', { class: 'ep-score' }, S.scoreLine(r.correct, r.total, r.withEvidence), ' · ', `${S.playtime}: ${mins} min`, ' · ', S.hintsUsed(g.hintsUsed)),
      solved && g.hintsUsed === 0 ? h('div', { class: 'ep-badge' }, '★ ', S.cleanSolve) : null,
      c.choices?.length ? choiceBlock(c, solved) : h('div', { class: 'ep-story' }, ...paras),
      h('div', { class: 'ep-results' }, ...results),
      h('div', { class: 'ep-actions' },
        solved ? null : h('button', { class: 'btn primary', type: 'button', onclick: onReopen }, S.keepInvestigating),
        h('button', { class: `btn ${solved ? 'primary' : 'ghost'}`, type: 'button', onclick: onFiles }, S.backToFiles))));
}

/** Caught-mode finale: pick what you do with what you found. */
function choiceBlock(c: CaseFile, solved: boolean): HTMLElement {
  const story = h('div', { class: 'ep-story' }, ...(solved ? c.epilogue.solved : c.epilogue.partial).slice(0, 2).map((p) => h('p', null, p)));
  const wrap = h('div', { class: 'ep-choices-wrap' }, story);
  const buttons = h('div', { class: 'ep-choices' }, h('div', { class: 'ep-choice-q' }, S.whatNow), ...(c.choices ?? []).map((ch) => h('button', {
    type: 'button', class: 'ep-choice',
    onclick: () => {
      audio.play('stinger');
      buttons.remove();
      const out = h('div', { class: 'ep-story chosen' }, h('div', { class: 'ep-choice-label' }, ch.label), ...(solved ? ch.solved : ch.partial).map((p, i) => h('p', { style: `animation-delay:${0.3 + i * 0.8}s` }, p)));
      wrap.appendChild(out);
      out.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  }, ch.label)));
  wrap.appendChild(buttons);
  return wrap;
}
