import { artUrl } from '../art';
import { h } from '../dom';
import { S } from '../strings';
import type { Photo } from '../types';

/** Controls the image viewer's surviving frames. Playback only starts on request. */
export function recoveredClip(frames: NonNullable<Photo['frames']>, image: HTMLImageElement, onReveal: () => void): {
  el: HTMLElement;
  stop: () => void;
} {
  let frame = 0;
  let timer: number | undefined;
  const progress = h('input', { type: 'range', min: 0, max: frames.length - 1, step: 1, value: 0, 'aria-label': S.clipFrame });
  const label = h('output', { class: 'zv-frame-label', 'aria-live': 'polite' });
  const play = h('button', { class: 'btn', type: 'button' }, S.clipPlay);

  const show = (index: number) => {
    frame = index;
    const current = frames[index];
    image.src = artUrl(current.art);
    progress.value = String(index);
    progress.setAttribute('aria-valuetext', `${index + 1} / ${frames.length} · ${current.label}`);
    label.textContent = `${index + 1} / ${frames.length} · ${current.label}`;
    if (current.reveal) onReveal();
  };

  const stop = () => {
    window.clearTimeout(timer);
    timer = undefined;
    play.textContent = S.clipPlay;
  };
  const tick = () => {
    if (!el.isConnected || frame + 1 >= frames.length) {
      stop();
      return;
    }
    show(frame + 1);
    if (!document.documentElement.classList.contains('reduce-motion')) {
      image.animate([{ opacity: 0.5 }, { opacity: 1 }], { duration: 210, easing: 'ease-out' });
    }
    timer = window.setTimeout(tick, 950);
  };
  play.addEventListener('click', () => {
    if (timer !== undefined) {
      stop();
      return;
    }
    if (frame + 1 === frames.length) show(0);
    play.textContent = S.clipPause;
    timer = window.setTimeout(tick, 950);
  });
  progress.addEventListener('input', () => {
    stop();
    show(progress.valueAsNumber);
  });

  const el = h('div', { class: 'zv-clip' },
    h('div', { class: 'zv-clip-head' }, h('b', null, S.recoveredClip), label),
    h('div', { class: 'zv-clip-controls' }, play, progress));
  show(0);
  return { el, stop };
}
