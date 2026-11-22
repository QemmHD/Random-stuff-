// Art registry. Every art value is a standalone SVG document string.
import { case1Art } from './case1';
import { case2Art } from './case2';
import { case3Art } from './case3';
import { case4Art } from './case4';
import { case5Art } from './case5';
import { case6Art } from './case6';
import { case7Art } from './case7';
import { case8Art } from './case8';
import { case9Art } from './case9';
import { ownerArt } from './owners';
import { iconArt } from './icons';
import { avatarArt } from './avatars';
import { extraArt } from './extra';
import { hiddenArt } from './hidden';
import { hiddenArt2 } from './hidden2';
import { caught3Art } from './caught3';
import { caught2Art } from './caught2';
import { caught1Art } from './caught1';
import { caught4Art } from './caught4';
import { caught4HiddenArt } from './caught4Hidden';
import { caught5Art } from './caught5';
import { caught6Art } from './caught6';
import { caughtStudiesArt } from './caughtStudies';
import { caughtOpeningsArt } from './caughtOpenings';
import { caughtStillsArt } from './caughtStills';

const REGISTRY: Record<string, string> = { ...extraArt, ...iconArt, ...avatarArt, ...case1Art, ...case2Art, ...case3Art, ...case4Art, ...case5Art, ...case6Art, ...case7Art, ...case8Art, ...case9Art, ...ownerArt, ...hiddenArt, ...hiddenArt2, ...caught3Art, ...caught2Art, ...caught1Art, ...caught4Art, ...caught4HiddenArt, ...caught5Art, ...caught6Art, ...caughtStudiesArt, ...caughtOpeningsArt, ...caughtStillsArt };
const urlCache = new Map<string, string>();

export function registerArt(more: Record<string, string>): void {
  Object.assign(REGISTRY, more);
}

/** Use a plain image URL for an art id (owner-supplied files). */
export function registerUrl(id: string, url: string): void {
  urlCache.set(id, url);
  REGISTRY[id] = '';
}

export function hasArt(id: string): boolean {
  return id in REGISTRY;
}

function placeholder(id: string): string {
  const hue = [...id].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 360, 7);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue},35%,22%)"/><stop offset="1" stop-color="hsl(${(hue + 60) % 360},40%,10%)"/></linearGradient></defs><rect width="600" height="600" fill="url(#g)"/><circle cx="300" cy="260" r="70" fill="none" stroke="hsla(${hue},60%,70%,.35)" stroke-width="6"/><path d="M200 420 Q300 340 400 420" fill="none" stroke="hsla(${hue},60%,70%,.35)" stroke-width="6"/></svg>`;
}

export function artSvg(id: string): string {
  return REGISTRY[id] ?? placeholder(id);
}

export function artUrl(id: string): string {
  let u = urlCache.get(id);
  if (!u) {
    u = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(artSvg(id))}`;
    urlCache.set(id, u);
  }
  return u;
}

/** <img> for an art id. */
export function artImg(id: string, cls = '', alt = ''): HTMLImageElement {
  const img = document.createElement('img');
  img.src = artUrl(id);
  img.alt = alt;
  img.draggable = false;
  img.decoding = 'async';
  if (cls) img.className = cls;
  return img;
}

/** Inline UI glyph (uses currentColor). */
export function glyph(name: string, cls = ''): HTMLSpanElement {
  const span = document.createElement('span');
  span.className = `glyph ${cls}`.trim();
  span.setAttribute('aria-hidden', 'true');
  span.innerHTML = REGISTRY[`ui_${name}`] ?? '';
  return span;
}
