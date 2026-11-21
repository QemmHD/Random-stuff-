import './styles.css';
import { clear } from './dom';
import { audio } from './audio';
import { applyPrefs } from './screens/settings';
import { loadExtraPhotos } from './extraPhotos';
import { bootSequence, briefingScreen, epilogueScreen, filesScreen, titleScreen } from './screens/menu';
import { investigate, type InvestigateHandle } from './screens/investigate';
import { hasSave, type Game } from './game';
import type { CaseFile } from './types';
import { CASES } from './cases';
import { CAUGHT } from './cases/caught';

const app = document.getElementById('app')!;
let current: InvestigateHandle | null = null;

function show(el: HTMLElement): void {
  current?.dispose();
  current = null;
  clear(app);
  el.classList.add('screen-enter');
  app.appendChild(el);
}

function toTitle(): void {
  show(titleScreen(toFiles));
}

function toFiles(): void {
  audio.ambient('menu');
  show(filesScreen(openCase));
}

function openCase(c: CaseFile): void {
  if (hasSave(c.id)) return void startCase(c, false);
  show(briefingScreen(c, () => startCase(c, true), toFiles));
}

async function startCase(c: CaseFile, fresh: boolean): Promise<void> {
  const handle = investigate(c, { toFiles, toEpilogue });
  show(handle.el);
  current = handle;
  if (fresh) await bootSequence(handle.el, c);
}

function toEpilogue(g: Game): void {
  const c = g.c;
  show(epilogueScreen(g, toFiles, () => startCase(c, false)));
}

applyPrefs();
void loadExtraPhotos();
document.addEventListener('pointerdown', () => audio.unlock(), { once: true });
document.addEventListener('keydown', () => audio.unlock(), { once: true });
document.addEventListener('visibilitychange', () => {
  if (document.hidden) speechSynthesis?.cancel();
});
// Debug hook for automated tests.
(window as unknown as { __cs: unknown }).__cs = { toFiles, openCase, CASES, CAUGHT };
toTitle();

if (import.meta.env.PROD && 'serviceWorker' in navigator && !(window as unknown as { __CS_NO_SW?: boolean }).__CS_NO_SW) {
  window.addEventListener('load', () => { navigator.serviceWorker.register('./sw.js').catch(() => { /* offline support is optional */ }); });
}
