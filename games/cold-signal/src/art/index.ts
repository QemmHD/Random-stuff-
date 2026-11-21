// Art registry. Every art value is a standalone SVG document string.
import { case1Art } from './case1';
import { case2Art } from './case2';
import { case3Art } from './case3';
import { case4Art } from './case4';
import { case5Art } from './case5';
import { ownerArt } from './owners';
import { iconArt } from './icons';
import { avatarArt } from './avatars';
import { extraArt } from './extra';

const REGISTRY: Record<string, string> = { ...extraArt, ...iconArt, ...avatarArt, ...case1Art, ...case2Art, ...case3Art, ...case4Art, ...case5Art, ...ownerArt };
const urlCache = new Map<string, string>();

export function registerArt(more: Record<string, string>): void {
  Object.assign(REGISTRY, more);
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
