// COLD SIGNAL — Case 07 "The Copyist" illustrations.
// Every value in `case7Art` is a complete standalone SVG document string.
// Ids inside each SVG are prefixed with the art key. Original art, no external references.

/** Art registry for Case 07. Keys are the art ids referenced by src/cases/case7.ts. */
export const case7Art: Record<string, string> = {};
const A = case7Art;

type Stop = [number, string, number?];
const st = (s: Stop[]): string =>
  s.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a === undefined ? '' : ` stop-opacity="${a}"`}/>`).join('');
const lg = (id: string, s: Stop[], x2 = 0, y2 = 1, x1 = 0, y1 = 0): string =>
  `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${st(s)}</linearGradient>`;
const rg = (id: string, s: Stop[], cx = 0.5, cy = 0.5, r = 0.5): string =>
  `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${st(s)}</radialGradient>`;
const bl = (id: string, d: number | string): string =>
  `<filter id="${id}" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="${d}"/></filter>`;
const SANS = 'font-family="Helvetica, Arial, sans-serif"';
const MONO = 'font-family="Courier New, monospace"';
const SERIF = 'font-family="Georgia, serif"';
const HAND = `font-family="'Segoe Print','Bradley Hand','Comic Sans MS',cursive"`;
const r1 = (v: number): number => Math.round(v * 10) / 10;
const esc = (s: string): string => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
/** Text element. `ex` = extra attributes (weight, anchor, textLength…). */
const tx = (x: number, y: number, size: number, s: string, fill: string, font = SANS, ex = ''): string =>
  `<text x="${x}" y="${y}" ${font} font-size="${size}" fill="${fill}"${ex ? ' ' + ex : ''}>${esc(s)}</text>`;
/** Fixed-width text: guarantees the line fits whatever fallback font is used. */
const fit = (w: number): string => `textLength="${w}" lengthAdjust="spacingAndGlyphs"`;
const BOLD = 'font-weight="bold"';
const MID = 'text-anchor="middle"';
const ITAL = 'font-style="italic"';

/** Deterministic PRNG so the art is identical on every load. */
const rng = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/** Wraps a picture: adds film grain + vignette. */
const frame = (k: string, w: number, h: number, defs: string, body: string, grain = 0.16, vig = 0.5): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><defs>${defs}` +
  `<filter id="${k}gr" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="7"/><feColorMatrix values=".6 .6 .6 0 -.4 .6 .6 .6 0 -.4 .6 .6 .6 0 -.4 0 0 0 0 1"/></filter>` +
  rg(`${k}vg`, [[0.5, '#000', 0], [1, '#000', vig]], 0.5, 0.5, 0.75) +
  `<clipPath id="${k}fr"><rect width="${w}" height="${h}"/></clipPath></defs><g clip-path="url(#${k}fr)">${body}<rect width="${w}" height="${h}" filter="url(#${k}gr)" opacity="${grain}" style="mix-blend-mode:overlay"/><rect width="${w}" height="${h}" fill="url(#${k}vg)"/></g></svg>`;

// ════════════════════════════════════════════════════════ RECURRING OBJECTS
const PINK = '#e0569a';
const OLIVE = '#8c9440';
const BRASS = '#c79a3c';

/**
 * Elephant hawk-moth, head up, centred on 0,0 (about 40 units tall at s=1).
 * `open` spreads the wings; `ink` draws it as a monochrome charcoal study.
 */
const moth = (x: number, y: number, s: number, rot = 0, open = false, ink = ''): string => {
  const p = ink || PINK, o = ink || OLIVE, ln = ink ? ink : '#3c2a30';
  const fo = ink ? '.16' : '1';
  const wing = open
    ? `<path d="M-3 -9C-20 -22 -42 -22 -54 -12C-40 -8 -22 2 -5 4Z" fill="${o}" fill-opacity="${fo}" stroke="${ln}" stroke-width=".9"/><path d="M-6 -6C-22 -16 -38 -16 -50 -11" fill="none" stroke="${p}" stroke-width="3" stroke-opacity="${ink ? 0.5 : 1}"/><path d="M-4 3C-16 0 -30 4 -33 12C-24 18 -10 16 -3 10Z" fill="${p}" fill-opacity="${ink ? 0.3 : 1}" stroke="${ln}" stroke-width=".9"/><path d="M-4 4C-12 3 -20 5 -24 9" fill="none" stroke="${ink || '#2a2024'}" stroke-width="3" stroke-opacity=".7"/>`
    : `<path d="M-2 -10C-9 -8 -17 6 -19 19C-12 17 -5 12 -1 6Z" fill="${o}" fill-opacity="${fo}" stroke="${ln}" stroke-width=".9"/><path d="M-4 -6C-9 0 -13 8 -16 16" fill="none" stroke="${p}" stroke-width="2.6" stroke-opacity="${ink ? 0.5 : 1}"/>`;
  return (
    `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" stroke-linejoin="round">${wing}<g transform="scale(-1 1)">${wing}</g>` +
    `<path d="M0 -15C4 -13 5 -4 4 6C3 14 1 19 0 21C-1 19 -3 14 -4 6C-5 -4 -4 -13 0 -15Z" fill="${p}" fill-opacity="${ink ? 0.35 : 1}" stroke="${ln}" stroke-width=".9"/>` +
    `<path d="M0 -13V17M-3.500 0h7M-3.500 5h7M-3 10h6" fill="none" stroke="${o}" stroke-width="1.300"/>` +
    `<path d="M-1.500 -15Q-6 -22 -9 -24M1.500 -15Q6 -22 9 -24" fill="none" stroke="${ink || '#f4e8d8'}" stroke-width="1" stroke-linecap="round"/></g>`
  );
};

/**
 * Agathe Lorne, "Girl with a Storm Lantern" (1891). Local canvas 182 x 244 (91 x 122 cm), drawn at
 * width `w`. `i` = unique id prefix. `blocked` = Felix's unfinished copy (grey, empty lantern).
 * No moth at this size: it only exists under the loupe.
 */
const lorne = (i: string, x: number, y: number, w: number, blocked = false): string =>
  `<g transform="translate(${x} ${y}) scale(${r1((w / 182) * 1000) / 1000})"><defs>` +
  lg(`${i}s`, [[0, '#141f24'], [0.3, '#31474a'], [0.45, '#7d7a55'], [0.5, '#c2a05c'], [0.515, '#40595a'], [0.8, '#1b2e30'], [1, '#101a1c']]) +
  rg(`${i}g`, [[0, '#ffe09a', 0.95], [0.18, '#f7ae40', 0.6], [0.55, '#e08a2a', 0.16], [1, '#e08a2a', 0]]) +
  `<clipPath id="${i}c"><rect width="182" height="244"/></clipPath></defs><g clip-path="url(#${i}c)">` +
  `<rect width="182" height="244" fill="url(#${i}s)"/>` +
  `<path d="M-6 30Q30 14 70 30T150 22L190 34V58Q140 44 96 56T-6 50ZM-6 78Q40 66 90 82T190 72V96Q130 86 80 98T-6 96Z" fill="#0c1418" opacity=".55"/>` +
  `<path d="M4 132q14-5 28 0M60 128q12-4 24 0M118 136q16-6 32 0M20 152q18-6 36 0M96 158q20-7 40 0M140 148q14-5 30 0M40 172q20-7 44 0M112 176q22-7 48 0" fill="none" stroke="#b9cdbc" stroke-width="1.600" stroke-linecap="round" opacity=".45"/>` +
  `<path d="M0 198Q46 184 104 194T182 188V244H0Z" fill="#0d1113"/><g fill="#272e30"><ellipse cx="22" cy="214" rx="12" ry="5"/><ellipse cx="128" cy="210" rx="15" ry="6"/><ellipse cx="160" cy="232" rx="13" ry="5"/><ellipse cx="50" cy="236" rx="16" ry="5"/><ellipse cx="108" cy="232" rx="9" ry="4"/></g>` +
  (blocked ? '' : `<circle cx="128" cy="82" r="78" fill="url(#${i}g)"/><ellipse cx="112" cy="206" rx="40" ry="7" fill="#f2a23a" opacity=".16"/>`) +
  // the girl
  `<path d="M61 150Q56 196 58 228H98Q101 190 95 150Z" fill="#232a30"/><path d="M84 152Q92 190 90 228H98Q101 190 95 150Z" fill="${blocked ? '#3a4044' : '#6e5a3a'}"/>` +
  `<ellipse cx="68" cy="230" rx="7" ry="3.500" fill="#b99474"/><ellipse cx="88" cy="231" rx="7" ry="3.500" fill="#d8b08a"/>` +
  `<path d="M56 110Q76 96 95 108L105 160Q78 174 50 158Z" fill="#70787c"/><path d="M95 108L105 160Q99 163 92 164L87 110Z" fill="${blocked ? '#8a9094' : '#d9bc86'}" opacity=".8"/><path d="M60 122Q76 132 98 124M56 142Q78 152 102 144" fill="none" stroke="#4c5458" stroke-width="1.500"/>` +
  `<path d="M90 114L116 80" stroke="#70787c" stroke-width="10" stroke-linecap="round"/><path d="M114 82L125 66" stroke="#dcb48e" stroke-width="5.500" stroke-linecap="round"/>` +
  `<circle cx="78" cy="93" r="10.500" fill="#b58c6c"/><path d="M79 83a10.500 10.500 0 0 1 4 20q4-10-4-20Z" fill="${blocked ? '#c9a888' : '#f2cf9e'}"/>` +
  `<path d="M66 96Q64 78 79 80Q90 81 89 90Q82 84 74 87Q72 98 70 108Q66 104 66 96Z" fill="#241812"/>` +
  // storm lantern, four panes
  `<circle cx="128" cy="65" r="3" fill="none" stroke="${BRASS}" stroke-width="1.400"/><path d="M119 72L128 67L137 72Z" fill="#8a6420"/>` +
  `<rect x="120" y="72" width="16" height="20" fill="${blocked ? '#8f918c' : '#ffd77a'}"/>` +
  (blocked ? '' : `<ellipse cx="128" cy="83" rx="1.800" ry="4.500" fill="#fffbe6"/>`) +
  `<path d="M120 72v20M124 72v20M128 72v20M132 72v20M136 72v20" stroke="#7a5618" stroke-width="1.100"/><rect x="118.500" y="92" width="19" height="3" fill="#8a6420"/>` +
  // craquelure by her wrist
  `<path d="M110 70l3 5l-1.500 4l4.500 3l.500 6l3 3" fill="none" stroke="#efe4c8" stroke-width=".7" opacity=".8"/>` +
  (blocked ? `<rect width="182" height="244" fill="#b8a888" opacity=".3"/><path d="M0 122H182M91 0V244" stroke="#3a3020" stroke-width=".6" opacity=".5"/>` : '') +
  `<rect width="182" height="244" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="3"/></g></g>`;

/** Gilt picture frame around the rect x,y,w,h (frame drawn outside it, thickness t). `gid` = gold gradient id. */
const gilt = (gid: string, x: number, y: number, w: number, h: number, t: number): string =>
  `<rect x="${x - t}" y="${y - t}" width="${w + 2 * t}" height="${h + 2 * t}" fill="url(#${gid})"/>` +
  `<rect x="${r1(x - t * 0.62)}" y="${r1(y - t * 0.62)}" width="${r1(w + t * 1.24)}" height="${r1(h + t * 1.24)}" fill="none" stroke="#5c3d10" stroke-width="${r1(t * 0.1)}" opacity=".7"/>` +
  `<rect x="${r1(x - t * 0.3)}" y="${r1(y - t * 0.3)}" width="${r1(w + t * 0.6)}" height="${r1(h + t * 0.6)}" fill="none" stroke="#fff0b8" stroke-width="${r1(t * 0.09)}" opacity=".7"/>` +
  `<path d="M${x - t} ${y - t}L${x} ${y}M${x + w + t} ${y - t}L${x + w} ${y}M${x - t} ${y + h + t}L${x} ${y + h}M${x + w + t} ${y + h + t}L${x + w} ${y + h}" stroke="#5c3d10" stroke-width="${r1(t * 0.07)}" opacity=".6"/>` +
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#0a0806"/>`;
const GOLD: Stop[] = [[0, '#f6dc8c'], [0.3, '#c9982e'], [0.6, '#8a6218'], [0.8, '#d8ae48'], [1, '#6e4c10']];

const ROMAN = ['XII', 'I', 'II', 'III', 'IIII', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
/** The stopped time: 2:47:15. Angles in degrees clockwise from XII. */
const HOUR_DEG = r1((2 + 47 / 60 + 15 / 3600) * 30); // 83.6 — just short of III
const MIN_DEG = 47 * 6; // 282 — two ticks past IX
const SEC_DEG = 15 * 6; // 90 — exactly on III
/** White enamel dial, radius R, stopped at 2:47:15. `full` adds numerals + minute track. */
const dial = (i: string, cx: number, cy: number, R: number, full = true): string => {
  const rot = (a: number): string => `transform="rotate(${a} ${cx} ${cy})"`;
  let t = '', n = '';
  const C = 2 * Math.PI * R;
  if (full) {
    // minute track as dashed circles: one dash every 6 degrees (thin) and every 30 degrees (bold)
    const tick = (rad: number, len: number, wd: number, n: number): string => {
      const c = (2 * Math.PI * R * rad) / n, w = R * wd;
      return `<circle cx="${cx}" cy="${cy}" r="${r1(R * rad)}" fill="none" stroke-width="${r1(R * len)}" stroke-dasharray="${r1(w * 100) / 100} ${Math.round((c - w) * 1000) / 1000}" stroke-dashoffset="${r1(w * 50) / 100}"/>`;
    };
    t = tick(0.915, 0.06, 0.012, 60) + tick(0.9, 0.09, 0.03, 12);
    ROMAN.forEach((s, h) => {
      n += `<text x="${cx}" y="${r1(cy - R * 0.6)}" ${rot(h * 30)} ${fit(r1(R * (0.05 + 0.058 * s.length)))}>${s}</text>`;
    });
  } else {
    t = `<circle cx="${cx}" cy="${cy}" r="${r1(R * 0.79)}" fill="none" stroke-width="${r1(R * 0.22)}" stroke-dasharray="${r1(R * 0.07)} ${Math.round(((C * 0.79) / 12 - R * 0.07) * 1000) / 1000}" stroke-dashoffset="${r1(R * 0.035)}"/>`;
  }
  const u = (v: number): number => r1(R * v);
  return (
    `<defs>${rg(`${i}e`, [[0, '#fffdf4'], [0.7, '#f3ecd8'], [1, '#cfc4a6']], 0.42, 0.36, 0.75)}</defs>` +
    `<circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#${i}e)" stroke="#6e4c10" stroke-width="${u(0.03)}"/>` +
    (full ? `<g fill="none" stroke="#1c1a18" stroke-width="${u(0.008)}"><circle cx="${cx}" cy="${cy}" r="${u(0.945)}"/><circle cx="${cx}" cy="${cy}" r="${u(0.885)}"/></g>` : '') +
    `<g stroke="#1c1a18">${t}</g><g ${SERIF} font-size="${u(0.2)}" font-weight="bold" fill="#1c1a18" ${MID}>${n}</g>` +
    // hour hand (blued steel spade)
    `<g id="${i}hh" ${rot(HOUR_DEG)} fill="#1c3566" stroke="#0c1830" stroke-width="${u(0.008)}"><path d="M${cx - u(0.028)} ${cy + u(0.08)}V${cy - u(0.26)}Q${cx - u(0.085)} ${cy - u(0.36)} ${cx} ${cy - u(0.5)}Q${cx + u(0.085)} ${cy - u(0.36)} ${cx + u(0.028)} ${cy - u(0.26)}V${cy + u(0.08)}Z"/></g>` +
    // minute hand
    `<g id="${i}mh" ${rot(MIN_DEG)} fill="#1c3566" stroke="#0c1830" stroke-width="${u(0.008)}"><path d="M${cx - u(0.024)} ${cy + u(0.1)}L${cx - u(0.018)} ${cy - u(0.6)}L${cx} ${cy - u(0.875)}L${cx + u(0.018)} ${cy - u(0.6)}L${cx + u(0.024)} ${cy + u(0.1)}Z"/></g>` +
    // seconds hand (thin red, counterweighted)
    `<g id="${i}sh" ${rot(SEC_DEG)}><path d="M${cx} ${cy + u(0.24)}V${cy - u(0.93)}" stroke="#d2202a" stroke-width="${u(full ? 0.018 : 0.03)}" stroke-linecap="round"/><circle cx="${cx}" cy="${cy + u(0.18)}" r="${u(0.03)}" fill="#d2202a"/></g>` +
    `<circle cx="${cx}" cy="${cy}" r="${u(0.05)}" fill="${BRASS}" stroke="#5c3d10" stroke-width="${u(0.012)}"/>`
  );
};
/** Gilt-and-ebony bracket clock on its wall bracket; dial centre cx,cy radius R. */
const bracketClock = (i: string, cx: number, cy: number, R: number, full = true): string => {
  const u = (v: number): number => r1(R * v);
  const L = cx - u(1.28), T = cy - u(1.3), W = u(2.56), H = u(2.6);
  const sp = (sx: number, sy: number): string =>
    `<path transform="translate(${cx} ${cy}) scale(${sx} ${sy})" d="M${u(1.1)} ${u(1.1)}V${u(0.52)}Q${u(0.98)} ${u(0.98)} ${u(0.52)} ${u(1.1)}Z" fill="url(#${i}gd)" stroke="#5c3d10" stroke-width="${u(0.012)}"/>`;
  return (
    `<defs>${lg(`${i}gd`, GOLD, 1, 1)}${lg(`${i}eb`, [[0, '#2c2420'], [0.5, '#15100e'], [1, '#060404']], 1, 0)}</defs>` +
    // bracket shelf + corbel
    `<path d="M${cx - u(1.05)} ${cy + u(1.54)}H${cx + u(1.05)}Q${cx + u(0.6)} ${cy + u(1.66)} ${cx + u(0.3)} ${cy + u(1.98)}H${cx - u(0.3)}Q${cx - u(0.6)} ${cy + u(1.66)} ${cx - u(1.05)} ${cy + u(1.54)}Z" fill="url(#${i}eb)"/>` +
    `<path d="M${cx - u(0.3)} ${cy + u(1.98)}H${cx + u(0.3)}" stroke="url(#${i}gd)" stroke-width="${u(0.05)}"/>` +
    `<rect x="${cx - u(1.6)}" y="${cy + u(1.42)}" width="${u(3.2)}" height="${u(0.13)}" rx="${u(0.03)}" fill="url(#${i}eb)"/><rect x="${cx - u(1.6)}" y="${cy + u(1.42)}" width="${u(3.2)}" height="${u(0.035)}" fill="url(#${i}gd)"/>` +
    // feet, plinth, case, bell top, handle
    `<g fill="url(#${i}gd)"><circle cx="${cx - u(1.15)}" cy="${cy + u(1.38)}" r="${u(0.07)}"/><circle cx="${cx + u(1.15)}" cy="${cy + u(1.38)}" r="${u(0.07)}"/></g>` +
    `<path d="M${cx} ${T - u(0.62)}m${-u(0.42)} 0a${u(0.42)} ${u(0.34)} 0 0 1 ${u(0.84)} 0" fill="none" stroke="url(#${i}gd)" stroke-width="${u(0.055)}"/>` +
    `<path d="M${L + u(0.1)} ${T}Q${L + u(0.3)} ${T - u(0.1)} ${L + u(0.5)} ${T - u(0.36)}Q${cx} ${T - u(0.78)} ${cx + u(0.78)} ${T - u(0.36)}Q${cx + u(0.98)} ${T - u(0.1)} ${cx + u(1.18)} ${T}Z" fill="url(#${i}eb)"/>` +
    `<path d="M${L + u(0.56)} ${T - u(0.36)}Q${cx} ${T - u(0.7)} ${cx + u(0.72)} ${T - u(0.36)}" fill="none" stroke="url(#${i}gd)" stroke-width="${u(0.03)}"/>` +
    `<rect x="${L - u(0.07)}" y="${T - u(0.02)}" width="${W + u(0.14)}" height="${u(0.12)}" fill="url(#${i}eb)"/><rect x="${L - u(0.07)}" y="${T - u(0.02)}" width="${W + u(0.14)}" height="${u(0.03)}" fill="url(#${i}gd)"/>` +
    `<rect x="${L}" y="${T}" width="${W}" height="${H}" fill="url(#${i}eb)"/><rect x="${L - u(0.09)}" y="${T + H - u(0.04)}" width="${W + u(0.18)}" height="${u(0.14)}" fill="url(#${i}eb)"/><rect x="${L - u(0.09)}" y="${T + H - u(0.04)}" width="${W + u(0.18)}" height="${u(0.03)}" fill="url(#${i}gd)"/>` +
    `<path d="M${L + u(0.05)} ${T + u(0.1)}V${T + H - u(0.1)}" stroke="#fff" stroke-opacity=".12" stroke-width="${u(0.03)}"/>` +
    // brass dial plate with gilt spandrels
    `<rect x="${cx - u(1.13)}" y="${cy - u(1.13)}" width="${u(2.26)}" height="${u(2.26)}" fill="#3a2a10" stroke="url(#${i}gd)" stroke-width="${u(0.035)}"/>` +
    (full ? sp(1, 1) + sp(-1, 1) + sp(1, -1) + sp(-1, -1) : '') +
    dial(i, cx, cy, R, full)
  );
};

/** Guard radio (walkie) standing upright; x,y = top-left of body, s = scale. LCD shows `lcd`. */
const radio = (i: string, x: number, y: number, s: number, lcd: string): string =>
  `<g transform="translate(${x} ${y}) scale(${s})"><defs>${lg(`${i}rb`, [[0, '#3a3e44'], [0.5, '#1c1f24'], [1, '#0a0b0e']], 1, 0)}</defs>` +
  `<rect x="14" y="-50" width="9" height="56" rx="4" fill="#0c0d10"/><rect x="62" y="-14" width="16" height="18" rx="3" fill="#15171b"/><rect x="40" y="-9" width="12" height="12" rx="2" fill="#15171b"/>` +
  `<rect width="92" height="170" rx="10" fill="url(#${i}rb)"/><rect x="2" y="2" width="5" height="166" rx="2" fill="#fff" opacity=".1"/>` +
  `<rect x="10" y="14" width="72" height="38" rx="3" fill="#0a1408"/><rect x="12" y="16" width="68" height="34" rx="2" fill="#9fe24a"/><rect x="12" y="16" width="68" height="34" rx="2" fill="#d8ff8a" opacity=".25"/>` +
  `<text x="46" y="43" ${MONO} font-size="27" font-weight="bold" fill="#0d2206" ${MID} ${fit(60)}>${lcd}</text>` +
  `<g fill="#0a0b0e">${[0, 1, 2, 3, 4, 5, 6].map((n) => `<rect x="16" y="${66 + n * 9}" width="60" height="4" rx="2"/>`).join('')}</g>` +
  `<rect x="14" y="136" width="20" height="20" rx="3" fill="#2a2e34"/><rect x="38" y="136" width="20" height="20" rx="3" fill="#2a2e34"/><circle cx="72" cy="146" r="5" fill="#d2202a"/></g>`;

// ════════════════════════════════════════════════════════════════ AVATARS
interface Bust {
  bg: [string, string, string];
  rim: string;
  cloth: string;
  clothIn?: string;
  back?: string;
  skin: string;
  shade: string;
  overNeck?: string;
  inFace?: string;
  iris: string;
  lid?: number;
  low?: number;
  brows: string;
  browC: string;
  mouth: string;
  lines?: string;
  hair?: string;
  top?: string;
}
const HEAD = 'M67 80C67 34 133 34 133 80C133 106 122 131 100 131C78 131 67 106 67 80Z';
const SHOULDERS = 'M12 200C14 166 44 152 80 146H120C156 152 186 166 188 200Z';
function bust(k: string, o: Bust): string {
  const lid = o.lid ?? 86.4, low = o.low ?? 94.2;
  const eye = (x: number, white: string): string =>
    `<path d="M${x} 91.5Q${x + 7} ${lid} ${x + 14} 91Q${x + 7} ${low} ${x} 91.5Z" fill="${white}"/><circle cx="${x + 7}" cy="90.7" r="3" fill="${o.iris}"/><circle cx="${x + 5.8}" cy="89.6" r=".9" fill="#fff"/><path d="M${x - 0.5} 91.8Q${x + 7} ${lid - 1} ${x + 14.5} 91" fill="none" stroke="#1a1318" stroke-width="1.9" stroke-linecap="round"/>`;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs>` +
    rg(`${k}-b`, [[0, o.bg[0]], [0.55, o.bg[1]], [1, o.bg[2]]], 0.28, 0.2, 1.05) +
    rg(`${k}-v`, [[0.55, '#000', 0], [1, '#000', 0.55]], 0.5, 0.42, 0.75) +
    rg(`${k}-r`, [[0, o.rim, 0.5], [1, o.rim, 0]], 0.82, 0.3, 0.5) +
    `<clipPath id="${k}-h"><path d="${HEAD}"/></clipPath><clipPath id="${k}-s"><path d="${SHOULDERS}"/></clipPath></defs>` +
    `<rect width="200" height="200" fill="url(#${k}-b)"/><rect width="200" height="200" fill="url(#${k}-r)"/>` +
    `<path d="${SHOULDERS}" fill="${o.cloth}"/><g clip-path="url(#${k}-s)">${o.clothIn ?? ''}<path d="M104 140H200V200H112Z" fill="#000" opacity=".26"/><path d="M120 146C156 152 186 166 188 200" fill="none" stroke="${o.rim}" stroke-width="5" opacity=".75"/></g>` +
    (o.back ?? '') +
    `<path d="M85 118V150Q100 162 115 150V118Z" fill="${o.shade}"/><path d="M85 124V149Q90 153 95 155L93 132Z" fill="${o.skin}" opacity=".55"/>` +
    (o.overNeck ?? '') +
    `<ellipse cx="67" cy="94" rx="5" ry="9" fill="${o.skin}"/><ellipse cx="133" cy="94" rx="5" ry="9" fill="${o.shade}"/>` +
    `<path d="${HEAD}" fill="${o.skin}"/><g clip-path="url(#${k}-h)">${o.inFace ?? ''}` +
    `<path d="M109 30C105 60 109 72 106 84C104 97 111 103 108 112C106 122 104 128 99 132H140V30Z" fill="${o.shade}" opacity=".72"/><path d="M70 62Q80 50 96 48Q78 56 72 76Z" fill="#fff" opacity=".13"/>` +
    `<path d="M133 66V80C133 106 122 131 100 131" fill="none" stroke="${o.rim}" stroke-width="5" opacity=".8"/></g>` +
    eye(80, '#f1e9df') + eye(106, '#b9ada6') +
    `<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${o.brows}" stroke="${o.browC}" stroke-width="3.2"/>` +
    `<path d="M102 94Q105 104 105.500 108Q101 112 95 108.500" stroke="#000" stroke-opacity=".38" stroke-width="1.9"/>${o.mouth}` +
    `<path d="M95.500 122Q100 123.500 104.500 122" stroke="#000" stroke-opacity=".25" stroke-width="1.5"/>${o.lines ?? ''}</g>` +
    (o.hair ?? '') + (o.top ?? '') +
    `<rect width="200" height="200" fill="url(#${k}-v)"/></svg>`
  );
}
/** Age / fatigue lines (stroke set by caller group). */
const WRINKLES = 'M87 105Q83.500 111 86 118M113.500 105Q117 111 114.500 118M80 98Q86 100 92 98.500M108 98.500Q114 100 120 98';

/** Hollin security uniform (navy jacket, shirt + tie, shoulder patch). */
const UNIFORM =
  `<path d="M82 146L100 176L118 146Q100 156 82 146Z" fill="#dfe6f0"/><path d="M97 158h6l3 30h-12Z" fill="#141c30"/>` +
  `<path d="M66 152L84 146L98 186L80 200H56ZM134 152L116 146L102 186L120 200H144Z" fill="#22335a"/><path d="M84 146L98 186M116 146L102 186" stroke="#0e1628" stroke-width="2" fill="none"/>` +
  `<path d="M22 172q14-12 30-12l-4 30H20Z" fill="#b8902e"/><path d="M25 174q12-9 24-10l-3 24H23Z" fill="#14203c"/><text x="35" y="180" ${SANS} font-size="6.500" font-weight="bold" fill="#f2d68a" ${MID} transform="rotate(-8 35 180)" ${fit(21)}>HOLLIN</text>`;

A.av_c7_ilse = bust('av_c7_ilse', {
  bg: ['#9a5a54', '#43202a', '#0c0508'], rim: '#ffcf8a', cloth: '#1a2848',
  clothIn:
    UNIFORM +
    // radio mic clipped at the collar
    `<rect x="121" y="150" width="15" height="24" rx="3" fill="#0c0e12"/><rect x="123.500" y="153" width="10" height="7" rx="1" fill="#2c3038"/><path d="M124 164h9M124 168h9" stroke="#3a3e46" stroke-width="1.500"/><path d="M134 174q10 10 6 28" fill="none" stroke="#0c0e12" stroke-width="2.200"/>` +
    // the enamel moth pin nobody notices
    moth(75, 178, 0.3, -12),
  back: `<circle cx="100" cy="42" r="15" fill="#6e5632"/><path d="M90 36q10-6 20 0" stroke="#a88a52" stroke-width="2" fill="none"/>`,
  skin: '#e8c4a6', shade: '#a67c66', iris: '#8e9ba3', lid: 87, low: 94,
  brows: 'M77.500 81Q86 78 95 80M105 80Q114 78 122.500 81', browC: '#6a5230',
  mouth: `<path d="M91 116.500Q100 117 109 116.500" stroke="#9a5450" stroke-width="2.300"/><path d="M89.500 117.500l1.500-1M110.500 117.500l-1.500-1" stroke="#9a5450" stroke-width="1.200"/>`,
  lines: `<path d="M80.500 97.500Q87 100.500 93.500 97.500M106.500 97.500Q113 100.500 119.500 97.500" stroke="#6a4a5a" stroke-width="1.500" opacity=".55"/><path d="M87 106Q85 111 86.500 115M113 106Q115 111 113.500 115" stroke="#8a5f4c" stroke-width="1" opacity=".45"/>`,
  hair: `<path d="M65 86C60 44 84 32 100 32C118 32 140 44 135 86C132 66 122 54 100 52C80 54 68 66 65 86Z" fill="#7d6238"/><path d="M70 66Q80 44 100 40M76 62Q88 48 104 46M110 44Q124 50 130 68" fill="none" stroke="#b4965a" stroke-width="1.800" stroke-linecap="round"/><path d="M72 70Q78 54 90 48M118 50Q126 58 129 72" fill="none" stroke="#d6d2c8" stroke-width="1.200" stroke-linecap="round"/>`,
});

A.av_c7_sami = bust('av_c7_sami', {
  bg: ['#c9a46a', '#5a3f28', '#140c06'], rim: '#ffe0aa', cloth: '#d6c9ac',
  clothIn:
    `<path d="M78 146Q100 166 122 146L126 158Q100 178 74 158Z" fill="#bfb090"/><path d="M80 152Q100 170 120 152" stroke="#9c8e70" stroke-width="1.500" fill="none"/>` +
    `<g fill="none" stroke="#a89a7a" stroke-width="2.200"><path d="M40 164q6 8 0 16q-6 8 0 20M52 160q6 8 0 16q-6 8 0 24M148 160q-6 8 0 16q6 8 0 24M160 164q-6 8 0 16q6 8 0 20"/><path d="M92 172q8 6 0 12q8 6 0 16M108 172q-8 6 0 12q-8 6 0 16M70 168v32M130 168v32"/></g>`,
  back: `<g fill="#17121a"><circle cx="68" cy="66" r="13"/><circle cx="132" cy="66" r="13"/><circle cx="64" cy="84" r="9"/><circle cx="136" cy="84" r="9"/><circle cx="80" cy="46" r="14"/><circle cx="120" cy="46" r="14"/><circle cx="100" cy="38" r="15"/></g>`,
  skin: '#cfa078', shade: '#8e6648', iris: '#3a2618', lid: 85.600, low: 94.600,
  inFace: `<path d="M65 96C70 112 80 108 90 110Q100 106 110 110C120 108 130 112 135 96V134H65Z" fill="#2a1e1c" opacity=".42"/>`,
  brows: 'M77 82.500Q86 77 95.500 76M104.500 76Q114 77 123 82.500', browC: '#17121a',
  mouth: `<path d="M91 116.500Q100 115 109 116.500" stroke="#7a3e3a" stroke-width="2.300"/>`,
  lines: `<path d="M81 98Q87 100.500 93 98M107 98Q113 100.500 119 98M95 71q5-2.500 10 0M86 66q14-4 28 0" stroke="#6e4a38" stroke-width="1.200" opacity=".55"/>`,
  hair: `<g fill="#17121a"><circle cx="76" cy="58" r="11"/><circle cx="91" cy="49" r="12"/><circle cx="109" cy="49" r="12"/><circle cx="124" cy="58" r="11"/><circle cx="69" cy="72" r="7"/><circle cx="131" cy="72" r="7"/></g><path d="M70 58a9 9 0 0 1 11-8M86 46a9 9 0 0 1 11-6M105 44a9 9 0 0 1 12 1M120 52a9 9 0 0 1 9 8" stroke="#4a3e52" stroke-width="1.800" fill="none"/>`,
});

A.av_c7_anand = bust('av_c7_anand', {
  bg: ['#8fb0b4', '#33525a', '#081216'], rim: '#e8f6f2', cloth: '#eef0ee',
  clothIn:
    `<path d="M80 146L100 192L120 146Z" fill="#6a2f5a"/><path d="M86 148Q100 164 114 148L100 186Z" fill="#8a4276"/><path d="M92 152Q100 160 108 152" stroke="#c88ab4" stroke-width="1.200" fill="none"/>` +
    `<path d="M68 150L84 146L100 194L88 200H60ZM132 150L116 146L100 194L112 200H140Z" fill="#fbfbf8"/><path d="M84 146L100 194L116 146" stroke="#b8bcc0" stroke-width="1.800" fill="none"/><path d="M134 176h18v8h-18z" fill="#dfe3e4"/><path d="M138 174v-8M143 174v-10" stroke="#2c5a8a" stroke-width="2"/>`,
  back: `<path d="M62 96C54 50 82 30 100 30C118 30 146 50 138 96C140 112 136 122 130 128H70C64 122 60 112 62 96Z" fill="#1a1618"/><ellipse cx="126" cy="130" rx="15" ry="12" fill="#1a1618"/><path d="M118 126q8-6 16 0M120 134q8-4 14 0" stroke="#aeb2b8" stroke-width="1.600" fill="none"/>`,
  skin: '#bd8458', shade: '#7c5036', iris: '#2a1a12', lid: 86.400, low: 94,
  brows: 'M77.500 81Q86 77 95 79.500M105 79.500Q114 77 122.500 81', browC: '#1a1618',
  mouth: `<path d="M91 116Q100 118.500 109 116" stroke="#8a3c48" stroke-width="2.400"/>`,
  lines: `<path d="M87 106Q85 111 86.500 115M113 106Q115 111 113.500 115M76 87q-3 2-4 5M124 87q3 2 4 5" stroke="#6a3e2a" stroke-width="1.100" opacity=".5"/><circle cx="100" cy="72" r="1.600" fill="#8a2030" stroke="none"/>`,
  hair: `<path d="M64 92C58 44 84 31 100 31C116 31 142 44 136 92C134 72 126 60 100 56C76 60 66 72 64 92Z" fill="#1a1618"/><path d="M72 68Q82 46 100 44M78 64Q88 52 100 50" fill="none" stroke="#c4c8ce" stroke-width="2.400" stroke-linecap="round"/><path d="M112 46Q126 54 130 72" fill="none" stroke="#5a565c" stroke-width="2" stroke-linecap="round"/>`,
  // magnifier visor pushed up on the forehead
  top: `<path d="M64 62Q100 48 136 62L135 70Q100 57 65 70Z" fill="#2a2e34"/><path d="M66 63Q100 50 134 63" fill="none" stroke="#6a7078" stroke-width="1.500"/><g fill="#9fd0e0" fill-opacity=".55" stroke="#14181c" stroke-width="2.400"><path d="M72 58L74 38Q86 33 97 35L97 53Q84 53 72 58Z"/><path d="M128 58L126 38Q114 33 103 35L103 53Q116 53 128 58Z"/></g><path d="M77 52L79 41Q85 38 90 38" stroke="#fff" stroke-width="1.500" fill="none" opacity=".7"/><path d="M97 44h6" stroke="#14181c" stroke-width="2.400"/>`,
});

A.av_c7_gil = bust('av_c7_gil', {
  bg: ['#8e96a4', '#3a4050', '#0a0c12'], rim: '#dfe8ff', cloth: '#14161a',
  clothIn:
    `<path d="M82 146L100 180L118 146Q100 156 82 146Z" fill="#eef0f2"/><path d="M96 156h8l3 14l-7 30l-7-30Z" fill="#23262c"/>` +
    `<path d="M66 152L84 146L99 190L84 200H58ZM134 152L116 146L101 190L116 200H142Z" fill="#1e2126"/><path d="M84 146L99 190M116 146L101 190" stroke="#3c4048" stroke-width="1.800" fill="none"/>`,
  skin: '#dab48e', shade: '#9a7458', iris: '#2c2018', lid: 87.600, low: 93.600,
  overNeck: `<path d="M134 100q8 6 4 16q-5 8 2 14q5 8-2 18q-4 6-2 12" fill="none" stroke="#e8e4da" stroke-width="2" stroke-linecap="round"/>`,
  brows: 'M77.500 81.500Q86 78.500 95 80M105 80Q114 78.500 122.500 81.500', browC: '#7a7c80',
  mouth: `<path d="M91 116.500Q100 116 109 116.500" stroke="#8a4e48" stroke-width="2.300"/>`,
  lines: `<path d="${WRINKLES}M76 86q-4 2-6 5M124 86q4 2 6 5M85 67q15-4 30 0M88 60q12-3 24 0" stroke="#7a543e" stroke-width="1.200" opacity=".55"/>`,
  hair: `<path d="M64 86C60 48 80 36 100 36C120 36 140 48 136 86C134 70 128 60 118 56C106 51 92 51 82 56C72 60 66 72 64 86Z" fill="#8e9094"/><path d="M70 64Q78 48 94 44M108 44Q124 50 130 66" fill="none" stroke="#c8cace" stroke-width="2" stroke-linecap="round"/><path d="M68 76l2-8M74 62l3-6M84 54l3-5M96 50l1-5M108 50l2-5M118 54l3-5M126 62l3-5" stroke="#6a6c70" stroke-width="1.500"/>`,
  top: `<circle cx="134" cy="95" r="4" fill="#e8e4da"/><g fill="#eaf2ff" fill-opacity=".16" stroke="#1a1c20" stroke-width="2.200"><rect x="76" y="90" width="20" height="11" rx="3"/><rect x="104" y="90" width="20" height="11" rx="3"/><path d="M96 94Q100 92 104 94M76 93L67 90M124 93L133 90" fill="none"/></g><path d="M106 92h8l-4 7h-4z" fill="#fff" opacity=".3"/>`,
});

A.av_c7_felix = bust('av_c7_felix', {
  bg: ['#e0a65c', '#74402a', '#170a08'], rim: '#ffe6b0', cloth: '#4a6c96',
  clothIn:
    `<path d="M82 146L100 184L118 146Z" fill="#2a2a30"/><path d="M90 150Q100 160 110 150" stroke="#44444c" stroke-width="2" fill="none"/>` +
    `<path d="M64 152L84 146L96 178L84 200H54ZM136 152L116 146L104 178L116 200H146Z" fill="#5a80ae"/><path d="M84 146L96 178L86 200M116 146L104 178L114 200" stroke="#c9a060" stroke-width="1.400" stroke-dasharray="3 2" fill="none"/>` +
    `<path d="M30 176l10 4M150 190l12-4M44 190l6 6" stroke="#9cb6d4" stroke-width="2"/>` +
    `<circle cx="68" cy="172" r="6" fill="#e8c93a" stroke="#1a1a1a" stroke-width="1"/><path d="M65.500 171v1M70.500 171v1M65.500 174.500q2.500 2 5 0" stroke="#1a1a1a" stroke-width="1.100" fill="none"/>` +
    `<circle cx="78" cy="187" r="5" fill="#d2202a"/><path d="M75.500 187h5M78 184.500v5" stroke="#fff" stroke-width="1.200"/><circle cx="62" cy="188" r="4.500" fill="#f2f2f2" stroke="#1a1a1a"/><circle cx="62" cy="188" r="1.800" fill="#1a1a1a"/>` +
    `<circle cx="132" cy="170" r="6.500" fill="#2a8a6a"/><path d="M129 172l3-5l3 5z" fill="#fff"/><rect x="122" y="182" width="11" height="8" rx="1" fill="#f08a2a"/><circle cx="142" cy="186" r="4" fill="#8a5ad2"/>`,
  back: `<path d="M58 92C48 40 86 22 102 24C132 24 152 44 142 92C145 102 142 110 138 114H62C58 110 55 102 58 92Z" fill="#5a3a22"/><path d="M59 100l-4 10l8-4l-1 10l7-6M141 100l4 10l-8-4l1 10l-7-6" stroke="#5a3a22" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  skin: '#ecc8a6', shade: '#ae8468', iris: '#4a6a3a', lid: 85, low: 94.400,
  inFace: `<path d="M70 102q6-5 13-2q-2 6-9 7z" fill="#2e7ad2"/><path d="M73 110q5-2 8 1" stroke="#e8a020" stroke-width="2.600" fill="none" stroke-linecap="round"/><circle cx="118" cy="110" r="1.600" fill="#d2202a"/>`,
  brows: 'M77 79.500Q86 74.500 95 78M105 78Q114 74.500 123 79.500', browC: '#4a2e1a',
  mouth: `<path d="M87 111.500Q100 127 113 111.500Q100 115 87 111.500Z" fill="#fbf6ee" stroke="#7a3a34" stroke-width="1.800"/><path d="M92 117.500Q100 119 108 117.500" stroke="#c8beb4" stroke-width="1"/>`,
  lines: `<path d="M84 108q-3 4-1 8M116 108q3 4 1 8" stroke="#a87458" stroke-width="1.200" opacity=".6"/>`,
  hair: `<path d="M62 94C56 44 84 28 102 30C128 32 144 48 138 92C134 80 132 74 126 66L120 78L114 62L104 80L98 62L88 80L84 64L74 82L72 70C66 78 64 86 62 94Z" fill="#6e4828"/><path d="M70 62Q82 40 104 38M96 46Q114 44 128 60M80 56l-4 16M100 50l2 18M118 54l4 14" fill="none" stroke="#a8784a" stroke-width="2" stroke-linecap="round"/>`,
});

A.av_c7_bea = bust('av_c7_bea', {
  bg: ['#d8a48a', '#6a3a40', '#150a0e'], rim: '#ffe2c8', cloth: '#1a2848',
  clothIn:
    UNIFORM +
    // lanyard, keys and the cactus keyring
    `<path d="M84 150Q92 178 112 190M116 150Q118 172 112 190" fill="none" stroke="#e8562a" stroke-width="3"/><circle cx="112" cy="191" r="3.500" fill="none" stroke="#c8ccd0" stroke-width="1.800"/>` +
    `<path d="M110 193l-9 7M113 194l-2 6M115 193l6 7" stroke="#c8ccd0" stroke-width="2.600" stroke-linecap="round"/>` +
    `<g transform="translate(131 184)"><path d="M-9 -4q4 2 5 8" fill="none" stroke="#c8ccd0" stroke-width="1.200"/><rect x="-4" y="-9" width="8" height="19" rx="4" fill="#3aa85a"/><path d="M-4 2h-3.500a2.500 2.500 0 0 1-2.500-2.500v-3M4 -1h3.500a2.500 2.500 0 0 0 2.500-2.500v-2" fill="none" stroke="#3aa85a" stroke-width="3.400" stroke-linecap="round"/><path d="M0 -6v13" stroke="#1e6e38" stroke-width="1"/><circle cy="-10" r="2" fill="${PINK}"/></g>`,
  back: `<path d="M56 100C46 36 86 22 100 22C116 22 154 36 144 100C148 116 144 130 136 138H64C56 130 52 116 56 100Z" fill="#3a1e16"/><path d="M110 24C150 34 150 80 144 100C148 116 144 130 136 138H120Z" fill="#000" opacity=".28"/>`,
  skin: '#f0cdb0', shade: '#b48a70', iris: '#4a3018', lid: 85.200, low: 94.800,
  inFace: `<circle cx="76" cy="106" r="10" fill="#f08a8a" opacity=".35"/><circle cx="124" cy="106" r="10" fill="#c85a5a" opacity=".3"/>`,
  brows: 'M77.500 80Q86 75.500 95 78.500M105 78.500Q114 75.500 122.500 80', browC: '#3a1e16',
  mouth: `<path d="M88 113Q94 110 100 112.500Q106 110 112 113Q100 125 88 113Z" fill="#e8203c" stroke="#a81028" stroke-width="1.200"/><path d="M91 114.500Q100 116.500 109 114.500" stroke="#fff" stroke-width="1.600" opacity=".85"/>`,
  lines: `<path d="M84 109q-3 4-1 8M116 109q3 4 1 8" stroke="#b4806a" stroke-width="1.100" opacity=".55"/>`,
  hair: `<path d="M60 104C52 44 84 30 100 30C116 30 148 44 140 104C139 78 130 62 112 56C96 66 70 66 60 104Z" fill="#3a1e16"/><path d="M66 78Q76 50 100 42M112 54Q128 62 134 84" fill="none" stroke="#7a4a34" stroke-width="2" stroke-linecap="round"/><path d="M62 100Q58 120 66 134M138 100Q142 120 134 134" fill="none" stroke="#5a3224" stroke-width="2"/>`,
});

A.av_c7_hanne = bust('av_c7_hanne', {
  bg: ['#e6d2a4', '#7a6444', '#18120a'], rim: '#fff2cc', cloth: '#6e7f8e',
  clothIn:
    `<path d="M80 146Q100 164 120 146L124 156Q100 176 76 156Z" fill="#8494a2"/><path d="M100 168V200" stroke="#4e5e6c" stroke-width="2"/>` +
    `<g><circle cx="52" cy="176" r="4" fill="${PINK}"/><circle cx="66" cy="190" r="3" fill="#e8c93a"/><path d="M40 190q6-4 10 2" stroke="#2e7ad2" stroke-width="3.400" fill="none" stroke-linecap="round"/><circle cx="84" cy="180" r="2.600" fill="${OLIVE}"/><circle cx="116" cy="188" r="3.400" fill="#f4f0e4"/><path d="M124 172q5 3 3 9" stroke="#d2402a" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="140" cy="192" r="2.600" fill="#2a8a6a"/><circle cx="74" cy="168" r="2" fill="#f4f0e4"/></g>`,
  skin: '#ecc9ac', shade: '#ac846e', iris: '#5a7a8a', lid: 87.400, low: 93.800,
  brows: 'M77 79Q86 74 95.500 79.500M104.500 80.500Q114 79 123 81.500', browC: '#c4c6c8',
  mouth: `<path d="M87 112.500Q99 124 114 108.500Q101 114.500 87 112.500Z" fill="#fbf6ee" stroke="#8a4a44" stroke-width="1.800"/><path d="M114 108.500q3-2 4-5" stroke="#8a4a44" stroke-width="1.600"/>`,
  lines: `<path d="${WRINKLES}M76 86q-4 2-6 5M124 86q4 2 6 5M84 66q16-4 32 0M86 59q14-3 28 0M72 100q-2 6 0 12M128 100q2 6 0 12" stroke="#8a6050" stroke-width="1.200" opacity=".6"/>`,
  hair: `<path d="M62 92C56 42 84 28 102 30C128 32 144 48 138 90C135 74 130 62 118 56C104 62 92 54 80 58C70 62 64 76 62 92Z" fill="#eceae4"/><path d="M68 66Q80 42 102 38M110 44Q126 50 132 70M76 60q10-8 22-8" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M64 84l-4 8M68 72l-6 4M134 78l6 6M130 66l6-2M96 34l2-6M110 36l5-5" stroke="#eceae4" stroke-width="3" stroke-linecap="round"/><path d="M84 58q8 6 16 0M106 58q6 6 14 2" stroke="#b8b6b0" stroke-width="1.400" fill="none"/>`,
  // reading glasses + the brush held like a cigarette
  top:
    `<g fill="#fff8e0" fill-opacity=".14" stroke="#7a2a3a" stroke-width="2.200"><path d="M76 88h20v6a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8ZM104 88h20v6a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8Z"/><path d="M96 91Q100 89 104 91M76 90L67 87M124 90L133 87" fill="none"/></g>` +
    `<path d="M156 150L188 96" stroke="#b8862e" stroke-width="3.400" stroke-linecap="round"/><path d="M181 108l6-10" stroke="#c8ccd0" stroke-width="4.400"/><path d="M186 99l6-11q1 8-3 12z" fill="#3a2a20"/><path d="M190 90l1.500-2.500" stroke="${PINK}" stroke-width="2.400" stroke-linecap="round"/>` +
    `<path d="M142 200V176Q142 162 152 160L156 134Q158 128 162 130Q165 132 164 138L163 150L168 136Q171 131 174 133Q177 136 175 142L170 164Q176 168 176 180V200Z" fill="#ecc9ac" stroke="#ac846e" stroke-width="1.400"/><path d="M162 152q-2 8-6 12M152 176q8-4 16 0" stroke="#ac846e" stroke-width="1.200" fill="none"/>`,
});

A.av_c7_vey = bust('av_c7_vey', {
  bg: ['#7a7480', '#2c2830', '#08060a'], rim: '#e6e0f2', cloth: '#3a3c42',
  clothIn:
    `<path d="M82 146L100 178L118 146Q100 156 82 146Z" fill="#f2f0ec"/><path d="M96 156h8l2 10l-6 34l-6-34Z" fill="#6e1c2a"/><path d="M97 160l6 6M96 168l8 8M97 178l6 6" stroke="#9a3040" stroke-width="1.200"/>` +
    `<path d="M76 152L90 160L99 200H70ZM124 152L110 160L101 200H130Z" fill="#2c2e34"/><circle cx="100" cy="194" r="1.600" fill="#8a8c92"/>` +
    `<path d="M62 152L84 146L92 176L78 200H50ZM138 152L116 146L108 176L122 200H150Z" fill="#45474e"/><path d="M84 146L92 176L80 200M116 146L108 176L120 200" stroke="#1c1e22" stroke-width="1.800" fill="none"/>` +
    `<path d="M128 176l14-4l4 12l-16 2z" fill="#f4f0e6"/><path d="M130 177l5 8M136 174l4 9" stroke="#c8c2b4" stroke-width="1"/><path d="M30 170v30M44 164v36M156 164v36M170 170v30" stroke="#55575e" stroke-width="1" opacity=".7"/>`,
  skin: '#e4c4ac', shade: '#a27e6e', iris: '#a9c4d8', lid: 88.200, low: 93.400,
  brows: 'M77.500 82Q86 80 95 81.500M105 81.500Q114 80 122.500 82', browC: '#b4b6ba',
  mouth: `<path d="M90 116Q100 117.500 111 114.500" stroke="#8a4e4c" stroke-width="2.100"/><path d="M111 114.500q2-1 2.500-3" stroke="#8a4e4c" stroke-width="1.300"/>`,
  lines: `<path d="${WRINKLES}M76 87q-4 2-6 5M124 87q4 2 6 5M84 67q16-4 32 0M87 60q13-3 26 0M72 102q-2 7 1 13M128 102q2 7-1 13" stroke="#7e5a4c" stroke-width="1.200" opacity=".6"/>`,
  hair: `<path d="M64 90C58 40 88 26 104 28C130 30 144 48 137 90C135 72 130 60 122 54C108 44 88 44 76 54C68 60 65 76 64 90Z" fill="#c4c8cc"/><path d="M72 58Q84 36 108 34M78 54Q92 40 112 40M88 50Q104 42 122 48M116 44Q130 52 133 70" fill="none" stroke="#f2f4f6" stroke-width="1.800" stroke-linecap="round"/><path d="M68 74Q70 62 76 56M130 60Q134 68 135 78" fill="none" stroke="#8e9298" stroke-width="1.800"/>`,
});

// ══════════════════════════════════════════════════════════════════ COVER
A.cover_case7 = (() => {
  const k = 'cover_case7';
  const R = rng(71);
  let planks = '', rain = '', glints = '';
  for (let i = -9; i <= 9; i++) planks += `M${300 + i * 22} 548L${300 + i * 150} 800`;
  for (let j = 0; j < 7; j++) planks += `M0 ${Math.round(552 + j * j * 5.2 + j * 6)}H600`;
  for (let i = 0; i < 46; i++) {
    const x = Math.round(70 + R() * 460), y = Math.round(60 + R() * 470), l = Math.round(10 + R() * 22);
    rain += `M${x} ${y}v${l}`;
  }
  for (let i = 0; i < 26; i++) {
    const x = Math.round(50 + R() * 500), y = Math.round(566 + R() * 220), w = Math.round(14 + R() * 50);
    glints += `<path d="M${x} ${y}h${w}" stroke-width="${r1(0.8 + R() * 1.6)}" opacity="${r1(0.15 + R() * 0.5)}"/>`;
  }
  const defs =
    rg(`${k}w`, [[0, '#6a2028'], [0.5, '#3c1118'], [1, '#12050a']], 0.5, 0.45, 0.8) +
    lg(`${k}f`, [[0, '#3a2418'], [0.4, '#1a100c'], [1, '#050304']]) +
    lg(`${k}gd`, GOLD, 1, 1) +
    lg(`${k}bm`, [[0, '#d6ecff', 0.85], [0.35, '#7fb8f2', 0.42], [1, '#4a8ad8', 0.1]], 0.45, 0, 0.1, 1) +
    rg(`${k}sp`, [[0, '#cfe6ff', 0.75], [0.5, '#6aa6ea', 0.35], [1, '#3a6ac0', 0]]) +
    rg(`${k}ha`, [[0, '#fff', 0.9], [0.3, '#bfe0ff', 0.45], [1, '#bfe0ff', 0]]) +
    lg(`${k}jb`, [[0, '#000'], [0.75, '#0a0608'], [1, '#2a1a1c']], 1, 0) +
    bl(`${k}b3`, 3) + bl(`${k}b9`, 9) + bl(`${k}b22`, 22) +
    `<clipPath id="${k}in"><rect x="188" y="150" width="224" height="296"/></clipPath>`;
  const body =
    `<rect width="600" height="548" fill="url(#${k}w)"/>` +
    // faint panel mouldings + pale ghost where a label hung
    `<g fill="none" stroke="#000" stroke-opacity=".28" stroke-width="2"><rect x="92" y="86" width="416" height="412"/><rect x="100" y="94" width="400" height="396"/></g>` +
    `<rect x="262" y="486" width="76" height="20" fill="${BRASS}" opacity=".55"/><path d="M270 493h60M276 499h48" stroke="#3a2a10" stroke-width="1.500" opacity=".7"/>` +
    // the empty gilt frame
    `<rect x="150" y="118" width="312" height="372" fill="#000" opacity=".5" filter="url(#${k}b9)"/>` +
    gilt(`${k}gd`, 188, 150, 224, 296, 34) +
    `<rect x="188" y="150" width="224" height="296" fill="#4a161c"/><rect x="188" y="150" width="224" height="296" fill="#000" opacity=".3"/>` +
    `<g clip-path="url(#${k}in)"><ellipse cx="318" cy="306" rx="150" ry="190" fill="url(#${k}sp)"/>` +
    `<path d="M214 150Q250 214 300 168M386 150Q380 196 372 236" fill="none" stroke="#c8ccd0" stroke-width="1.600" opacity=".8"/><circle cx="214" cy="158" r="4" fill="#8a8c90"/><circle cx="386" cy="158" r="4" fill="#8a8c90"/>` +
    `<path d="M188 150h224v10h-214v286h-10Z" fill="#000" opacity=".45"/></g>` +
    // skirting + wet parquet
    `<rect y="520" width="600" height="30" fill="#1a0c0c"/><rect y="520" width="600" height="3" fill="#6a3a2a" opacity=".6"/>` +
    `<rect y="548" width="600" height="252" fill="url(#${k}f)"/><path d="${planks}" stroke="#000" stroke-opacity=".5" stroke-width="1.400" fill="none"/>` +
    `<g opacity=".32" filter="url(#${k}b3)"><rect x="160" y="560" width="280" height="150" fill="url(#${k}gd)"/><rect x="196" y="560" width="208" height="120" fill="#16090c"/></g>` +
    `<path d="M120 706L250 560H420Z" fill="#7fb8f2" opacity=".2" filter="url(#${k}b9)"/>` +
    `<g fill="#9fc8f2"><ellipse cx="330" cy="640" rx="150" ry="16" opacity=".1"/><ellipse cx="180" cy="742" rx="120" ry="16" opacity=".12"/><ellipse cx="452" cy="724" rx="92" ry="11" opacity=".08"/></g>` +
    `<g stroke="#dcecff" stroke-linecap="round" fill="none">${glints}</g>` +
    `<g fill="none" stroke="#cfe2ff" stroke-width="1.200" opacity=".5"><ellipse cx="236" cy="668" rx="20" ry="4"/><ellipse cx="236" cy="668" rx="9" ry="2"/><ellipse cx="420" cy="612" rx="14" ry="3"/><ellipse cx="96" cy="604" rx="12" ry="2.500"/><ellipse cx="350" cy="754" rx="26" ry="5"/></g>` +
    // the dropped torch and its cold beam
    `<path d="M150 704L176 142L436 132L452 470Z" fill="url(#${k}bm)" filter="url(#${k}b22)" opacity=".8"/>` +
    `<path d="M150 700L214 150L410 150L424 446Z" fill="url(#${k}bm)" filter="url(#${k}b9)" opacity=".55"/>` +
    `<ellipse cx="114" cy="728" rx="74" ry="12" fill="#000" opacity=".6" filter="url(#${k}b3)"/>` +
    `<g transform="rotate(-32 120 716)"><rect x="40" y="704" width="76" height="24" rx="5" fill="#15181e"/><path d="M52 704v24M60 704v24M68 704v24M76 704v24" stroke="#2c3038" stroke-width="2"/><rect x="40" y="706" width="76" height="4" fill="#fff" opacity=".14"/><path d="M116 702h14l12-8v44l-12-8h-14Z" fill="#23272e"/><ellipse cx="143" cy="716" rx="5" ry="22" fill="#eaf5ff"/><ellipse cx="146" cy="716" rx="16" ry="30" fill="url(#${k}ha)"/><rect x="84" y="701" width="10" height="5" rx="2" fill="#d2202a"/></g>` +
    `<path d="${rain}" stroke="#cfe2ff" stroke-width="1.200" stroke-linecap="round" opacity=".22" fill="none"/>` +
    // one small moth, caught in the beam
    `<circle cx="322" cy="318" r="44" fill="url(#${k}ha)" opacity=".55"/>` +
    moth(322, 318, 0.95, 24, true) +
    `<g fill="#eaf5ff"><circle cx="286" cy="352" r="1.400" opacity=".7"/><circle cx="352" cy="276" r="1.200" opacity=".6"/><circle cx="300" cy="262" r="1" opacity=".5"/><circle cx="366" cy="350" r="1.200" opacity=".5"/><circle cx="270" cy="420" r="1.200" opacity=".5"/></g>` +
    // doorway we are looking through
    `<rect width="64" height="800" fill="url(#${k}jb)"/><rect x="536" width="64" height="800" fill="url(#${k}jb)" transform="translate(1136 0) scale(-1 1)"/><rect width="600" height="46" fill="#040203"/><path d="M64 46H536" stroke="#3a2224" stroke-width="2"/>`;
  return frame(k, 600, 800, defs, body, 0.2, 0.62);
})();

// ══════════════════════════════════════════════════════════════ WALLPAPERS
A.wall_c7_lock = (() => {
  const k = 'wall_c7_lock';
  const motif = (x: number, y: number): string => `M${x} ${y}q14 14 0 34q-14-14 0-34ZM${x - 20} ${y + 26}q10-4 16 6q-12 4-16-6ZM${x + 20} ${y + 26}q-10-4-16 6q12 4 16-6Z`;
  const defs =
    rg(`${k}w`, [[0, '#7a2630'], [0.45, '#4a141c'], [1, '#17060a']], 0.48, 0.4, 0.7) +
    rg(`${k}pl`, [[0, '#ffdfa0', 0.5], [0.5, '#f2a850', 0.14], [1, '#f2a850', 0]]) +
    lg(`${k}gd`, GOLD, 1, 1) +
    lg(`${k}br`, [[0, '#e8c46a'], [0.5, '#b88a2e'], [1, '#7a5a1a']]) +
    lg(`${k}le`, [[0, '#3a2a22'], [0.3, '#241812'], [1, '#0a0605']]) +
    lg(`${k}sh`, [[0, '#000', 0], [1, '#000', 0.75]]) +
    bl(`${k}b6`, 6) + bl(`${k}b16`, 16) +
    `<pattern id="${k}dm" width="110" height="168" patternUnits="userSpaceOnUse"><path d="${motif(28, 14)}${motif(83, 98)}" opacity=".11"/></pattern>`;
  const body =
    `<rect width="600" height="1300" fill="url(#${k}w)"/><rect width="600" height="1300" fill="url(#${k}dm)"/>` +
    `<ellipse cx="290" cy="500" rx="330" ry="420" fill="url(#${k}pl)"/>` +
    // edge of the Lorne's gilt frame at the right
    `<rect x="538" y="96" width="80" height="880" fill="#000" opacity=".5" filter="url(#${k}b16)"/>` +
    gilt(`${k}gd`, 594, 150, 200, 780, 46) + `<rect x="594" y="150" width="10" height="780" fill="#1b2e30"/><rect x="594" y="150" width="10" height="330" fill="#31474a"/>` +
    // clock shadow on the wall, then the clock
    `<path d="M96 400h420v360h-420z" fill="#000" opacity=".5" filter="url(#${k}b16)" transform="translate(16 26)"/>` +
    bracketClock(`${k}c`, 290, 568, 138) +
    // brass museum label
    `<rect x="124" y="856" width="336" height="66" rx="3" fill="#000" opacity=".45" filter="url(#${k}b6)"/><rect x="122" y="850" width="336" height="66" rx="3" fill="url(#${k}br)" stroke="#5c3d10" stroke-width="1.500"/>` +
    `<circle cx="132" cy="860" r="2.500" fill="#5c3d10"/><circle cx="448" cy="860" r="2.500" fill="#5c3d10"/><circle cx="132" cy="906" r="2.500" fill="#5c3d10"/><circle cx="448" cy="906" r="2.500" fill="#5c3d10"/>` +
    tx(290, 878, 21, 'Bracket clock, London, c. 1780.', '#2a1c08', SERIF, `${MID} ${BOLD} ${fit(292)}`) +
    tx(290, 904, 21, 'Stopped 1931.', '#2a1c08', SERIF, `${MID} ${BOLD} ${fit(126)}`) +
    // dark lower wall, bench and the guard radio (the wrong time)
    `<rect y="940" width="600" height="360" fill="url(#${k}sh)"/>` +
    `<path d="M-10 1130Q300 1104 610 1130V1300H-10Z" fill="url(#${k}le)"/><path d="M-10 1130Q300 1104 610 1130" fill="none" stroke="#6a4e3c" stroke-width="3" opacity=".7"/>` +
    `<g fill="#0a0605"><circle cx="90" cy="1206" r="6"/><circle cx="300" cy="1196" r="6"/><circle cx="510" cy="1206" r="6"/></g><path d="M90 1206Q195 1186 300 1196Q405 1186 510 1206" fill="none" stroke="#000" stroke-opacity=".4" stroke-width="2"/>` +
    `<ellipse cx="184" cy="1172" rx="86" ry="12" fill="#000" opacity=".6" filter="url(#${k}b6)"/>` +
    radio(k, 130, 990, 1.08, '02:05') +
    `<ellipse cx="180" cy="1034" rx="70" ry="50" fill="#9fe24a" opacity=".12" filter="url(#${k}b16)"/>` +
    // thermos
    `<ellipse cx="400" cy="1166" rx="46" ry="8" fill="#000" opacity=".55" filter="url(#${k}b6)"/><rect x="368" y="1030" width="60" height="136" rx="8" fill="#23404a"/><rect x="368" y="1030" width="14" height="136" rx="6" fill="#fff" opacity=".12"/><rect x="372" y="1000" width="52" height="36" rx="6" fill="#aeb4b8"/><rect x="368" y="1060" width="60" height="6" fill="#c8ccd0" opacity=".5"/>`;
  return frame(k, 600, 1300, defs, body, 0.16, 0.55);
})();

A.wall_c7_home = (() => {
  const k = 'wall_c7_home';
  const INK = '#2c2826';
  const defs =
    lg(`${k}p`, [[0, '#f2e9d4'], [0.5, '#ece0c6'], [1, '#d9caa8']], 0.3, 1) +
    bl(`${k}b12`, 12) + bl(`${k}b3`, 3) +
    `<filter id="${k}ch" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="5"/></filter>`;
  let hatch = '';
  for (let i = 0; i < 9; i++) hatch += `M${96 + i * 13} ${626 + (i % 3) * 4}l-34 46M${504 - i * 13} ${626 + (i % 3) * 4}l34 46`;
  const body =
    `<rect width="600" height="1300" fill="url(#${k}p)"/>` +
    `<g fill="#b8a888" opacity=".25"><ellipse cx="120" cy="240" rx="150" ry="60" filter="url(#${k}b12)"/><ellipse cx="480" cy="1080" rx="170" ry="70" filter="url(#${k}b12)"/></g>` +
    // construction lines
    `<g fill="none" stroke="${INK}" stroke-width="1" opacity=".28"><path d="M300 430V800M70 592H530"/><ellipse cx="300" cy="590" rx="236" ry="96"/><path d="M96 520L504 520M150 690H450"/></g>` +
    // charcoal smudge under the wings
    `<g fill="${INK}" opacity=".16" filter="url(#${k}b12)"><ellipse cx="186" cy="572" rx="120" ry="44" transform="rotate(-10 186 572)"/><ellipse cx="414" cy="572" rx="120" ry="44" transform="rotate(10 414 572)"/><ellipse cx="300" cy="620" rx="34" ry="90"/></g>` +
    `<g filter="url(#${k}ch)">${moth(300, 612, 4.3, 0, true, INK)}<path d="${hatch}" stroke="${INK}" stroke-width="1.600" opacity=".4" fill="none"/>` +
    `<path d="M92 560q60-34 150-26M508 560q-60-34-150-26M210 640q30 22 68 18M390 640q-30 22-68 18" fill="none" stroke="${INK}" stroke-width="2.400" opacity=".5" stroke-linecap="round"/></g>` +
    `<g fill="${INK}" opacity=".5" filter="url(#${k}b3)"><circle cx="150" cy="556" r="9"/><circle cx="450" cy="556" r="9"/></g>` +
    tx(300, 808, 30, 'a copy is not allowed to be perfect', '#4a443e', HAND, `${MID} ${ITAL} ${fit(410)} transform="rotate(-2 300 808)"`) +
    `<path d="M112 826q190 12 376-6" fill="none" stroke="#4a443e" stroke-width="1.400" opacity=".5"/>`;
  return frame(k, 600, 1300, defs, body, 0.22, 0.3);
})();

// ════════════════════════════════════════════════════════════════════ MAP
A.map_c7 = (() => {
  const k = 'map_c7';
  const R = rng(707);
  const CX = 384, CY = 264;
  let streets = '', blocks = '', trees = '';
  // old town: crooked rings and spokes around the museum square
  [58, 112, 172, 244, 330].forEach((rad, n) => {
    let d = '';
    for (let a = 0; a < 360; a += 30) {
      const rr = rad * (0.9 + R() * 0.2), t = (a * Math.PI) / 180;
      d += `${a ? 'L' : 'M'}${Math.round(CX + Math.cos(t) * rr * 1.25)} ${Math.round(CY + Math.sin(t) * rr * 0.9)}`;
    }
    streets += `<path d="${d}Z" stroke-width="${n === 2 ? 4 : 2.2}"/>`;
  });
  for (let a = 8; a < 360; a += 24) {
    const t = ((a + R() * 10) * Math.PI) / 180, bend = (R() - 0.5) * 60;
    streets += `<path d="M${Math.round(CX + Math.cos(t) * 40)} ${Math.round(CY + Math.sin(t) * 30)}Q${Math.round(CX + Math.cos(t) * 220 + bend)} ${Math.round(CY + Math.sin(t) * 160 - bend)} ${Math.round(CX + Math.cos(t) * 620)} ${Math.round(CY + Math.sin(t) * 440)}" stroke-width="${a % 72 === 8 ? 3.6 : 1.8}"/>`;
  }
  for (let i = 0; i < 64; i++) {
    const x = Math.round(R() * 800), y = Math.round(R() * 520), w = 12 + R() * 22, h = 10 + R() * 16;
    const a = R() * 0.8 - 0.4, c = Math.cos(a), sn = Math.sin(a), q = (v: number): number => Math.round(v);
    blocks += `M${x} ${y}l${q(w * c)} ${q(w * sn)}l${q(-h * sn)} ${q(h * c)}l${q(-w * c)} ${q(-w * sn)}Z`;
  }
  for (let i = 0; i < 48; i++) {
    const a = R() * 6.28, d = Math.sqrt(R());
    const x = Math.round(505 + Math.cos(a) * d * 150), y = Math.round(62 + Math.sin(a) * d * 78);
    if (y < 4 || Math.hypot(x - 496, y - 72) < 34) continue;
    trees += `<circle cx="${x}" cy="${y}" r="${Math.round(5 + R() * 4)}"/>`;
  }
  const RIVER = 'M-30 512Q90 470 210 528T440 566T650 520T830 566';
  /** Place roundel with a gilt line icon (drawn in a -18..18 box). */
  const place = (x: number, y: number, icon: string, big = false): string =>
    `<g transform="translate(${Math.round(x * 800)} ${Math.round(y * 600)})"><circle r="${big ? 31 : 26}" fill="#000" opacity=".45" filter="url(#${k}b4)"/><circle r="${big ? 28 : 23}" fill="#1c0a0e" stroke="url(#${k}gd)" stroke-width="${big ? 3.5 : 2.5}"/>` +
    `<g fill="none" stroke="#f0d078" stroke-width="1.800" stroke-linejoin="round" stroke-linecap="round"${big ? ' transform="scale(1.25)"' : ''}>${icon}</g></g>`;
  const defs =
    rg(`${k}bg`, [[0, '#4a161e'], [0.6, '#2c0c12'], [1, '#12050a']], 0.48, 0.44, 0.8) +
    lg(`${k}gd`, GOLD, 1, 1) + lg(`${k}rv`, [[0, '#1c3c4c'], [1, '#0c1c2a']]) +
    rg(`${k}pk`, [[0, '#3c5a34'], [1, '#1c2e20']]) + rg(`${k}gl`, [[0, '#f2c860', 0.35], [1, '#f2c860', 0]]) + bl(`${k}b4`, 4) +
    `<clipPath id="${k}land"><path d="${RIVER}V-10H-30Z"/></clipPath>`;
  const body =
    `<rect width="800" height="600" fill="url(#${k}bg)"/>` +
    `<g clip-path="url(#${k}land)"><path d="${blocks}" fill="#6a2a30" opacity=".55"/>` +
    // park on the north hill
    `<path d="M352 -10Q340 70 400 118Q470 160 560 142Q650 120 668 40L664 -10Z" fill="url(#${k}pk)" stroke="#6a7a3a" stroke-width="1.500"/>` +
    `<g fill="none" stroke="#7a8a4a" stroke-width="1" opacity=".5"><ellipse cx="505" cy="62" rx="120" ry="58"/><ellipse cx="502" cy="64" rx="84" ry="38"/><ellipse cx="498" cy="68" rx="48" ry="20"/></g><g fill="#4e7040" stroke="#22361e" stroke-width=".8">${trees}</g>` +
    `<g fill="none" stroke="#c9a04a" stroke-opacity=".55" stroke-linecap="round">${streets}</g>` +
    `<circle cx="${CX}" cy="${CY}" r="90" fill="url(#${k}gl)"/></g>` +
    // river along the bottom, quay line, bridges
    `<path d="${RIVER}V620H-30Z" fill="url(#${k}rv)"/><path d="${RIVER}" fill="none" stroke="url(#${k}gd)" stroke-width="3"/>` +
    `<g fill="none" stroke="#7fb0c0" stroke-width="1.400" opacity=".35" stroke-linecap="round"><path d="M40 546q20-8 40 0M150 566q22-8 44 0M300 580q22-8 44 0M470 590q22-8 44 0M610 566q22-8 44 0M700 590q20-8 40 0M90 588q18-7 36 0M380 590q14-6 28 0"/></g>` +
    `<g stroke="#c9a04a" stroke-width="7" opacity=".8"><path d="M300 540L286 606M700 528L716 606"/></g><g stroke="#2c0c12" stroke-width="2"><path d="M300 540L286 606M700 528L716 606"/></g>` +
    // places
    place(0.48, 0.44, `<path d="M-15 -5L0 -15L15 -5ZM-14 -5H14M-13 12H13M-15 15H15M-10 -5V12M-3.500 -5V12M3.500 -5V12M10 -5V12"/>`, true) +
    place(0.16, 0.70, `<path d="M-10 14V-13H10V14ZM-14 14H14M-5 -8h3M2 -8h3M-5 -2h3M2 -2h3M-5 4h3M2 4h3M-2 14V9h4v5"/>`) +
    place(0.30, 0.24, `<path d="M-15 12V-4L-8 -11V-4L-1 -11V-4L6 -11V12ZM-15 12H6"/><path d="M11 3a6.500 6 0 1 0 2 9q-3 0-2-3q3-1 3-3q0-2-3-3Z" fill="#f0d078" stroke="none"/><circle cx="8" cy="6" r="1.200" fill="#1c0a0e" stroke="none"/>`) +
    place(0.74, 0.62, `<path d="M-15 13V-8H-3V13M-15 13H15M-11 -3h4M-11 2h4M-11 7h4"/><path d="M5 -13L11 -3M3 -9L8 -12M9 -4Q15 2 9 8M3 12H14M9 8V12M4 3H10" stroke-width="2"/>`) +
    place(0.84, 0.20, `<path d="M-15 13V-2L-8 -9L-1 -2V13ZM-15 13H-1M-10 4h4v9h-4Z"/><path d="M4 -6H14V5H4ZM9 -12V-6M6 5L3 14M12 5L15 14M9 5V14"/>`) +
    place(0.62, 0.12, `<path d="M-9 13V-1L1 -9L11 -1V13ZM-12 0L1 -11L14 0M-1 13V5h5v8M-5 2h3M5 2h3"/><path d="M-14 13V4M-17 6a3 5 0 1 1 6 0Z" stroke-width="1.400"/>`) +
    place(0.60, 0.84, `<path d="M-15 12V-6L0 -13L15 -6V12ZM-15 12H15"/><path d="M-6 -1H6V11H-6ZM-6 -1L6 11M6 -1L-6 11" stroke-width="1.500"/>`) +
    place(0.10, 0.38, `<path d="M-4 13V-3L3 -9L10 -3V13ZM3 -9V-16M0 -13H6M1 13V6h4v7M-15 13H14"/><path d="M-14 13V7a3 3 0 0 1 6 0V13" stroke-width="1.500"/>`) +
    // compass + cartouche flourish
    `<g transform="translate(726 452)" fill="none" stroke="url(#${k}gd)" stroke-width="1.500"><circle r="26"/><circle r="20" stroke-width=".8"/><path d="M0 -34L6 -6L0 0L-6 -6ZM0 34L4 6L0 0L-4 6ZM-30 0L-6 -4L0 0L-6 4ZM30 0L6 -4L0 0L6 4Z" fill="#c9a04a" fill-opacity=".5"/></g>` +
    `<rect x="12" y="12" width="776" height="576" fill="none" stroke="url(#${k}gd)" stroke-width="2" opacity=".7"/><rect x="18" y="18" width="764" height="564" fill="none" stroke="#c9a04a" stroke-width=".8" opacity=".5"/>`;
  return frame(k, 800, 600, defs, body, 0.2, 0.5);
})();

// ═════════════════════════════════════════════════════════════════ PHOTOS
/** The lantern seen close: body top-left x,y, width w (four panes of w/4). Moth only if `hasMoth`. */
const bigLantern = (i: string, x: number, y: number, w: number, hasMoth: boolean): string => {
  const u = (v: number): number => r1(w * v);
  const h = u(1.1), pw = w / 4, cx = x + w / 2;
  const fx = r1(x + pw * 1.5), fy = r1(y + h * 0.5);
  let bars = '', shine = '';
  for (let n = 0; n < 5; n++) bars += `<rect x="${r1(x + n * pw - w * 0.022)}" y="${y}" width="${u(0.044)}" height="${h}" fill="url(#${i}lb)"/>`;
  for (let n = 0; n < 4; n++) shine += `<path d="M${r1(x + n * pw + pw * 0.3)} ${r1(y + w * 0.09)}h${u(0.045)}l${-u(0.07)} ${u(0.42)}h${-u(0.045)}Z"/>`;
  return (
    `<defs>${lg(`${i}lb`, [[0, '#5c3d10'], [0.35, '#f0d078'], [0.6, '#b88a2e'], [1, '#6a4a14']], 1, 0)}${rg(`${i}lg`, [[0, '#fff6c8'], [0.22, '#ffd270'], [0.65, '#d98a2a'], [1, '#7a4012']], 0.375, 0.5, 0.72)}</defs>` +
    `<circle cx="${cx}" cy="${r1(y - w * 0.44)}" r="${u(0.11)}" fill="none" stroke="url(#${i}lb)" stroke-width="${u(0.04)}"/>` +
    `<rect x="${r1(cx - w * 0.15)}" y="${r1(y - w * 0.34)}" width="${u(0.3)}" height="${u(0.15)}" rx="${u(0.02)}" fill="url(#${i}lb)"/>` +
    `<path d="M${r1(x - w * 0.07)} ${y}L${r1(x + w * 0.2)} ${r1(y - w * 0.21)}H${r1(x + w * 0.8)}L${r1(x + w * 1.07)} ${y}Z" fill="url(#${i}lb)"/><path d="M${r1(x + w * 0.2)} ${r1(y - w * 0.21)}L${r1(x - w * 0.07)} ${y}H${r1(x + w * 1.07)}" fill="none" stroke="#3a2608" stroke-width="${u(0.012)}"/>` +
    `<g fill="#2a1a06">${[0.34, 0.44, 0.54, 0.64].map((v) => `<ellipse cx="${r1(x + w * v + w * 0.01)}" cy="${r1(y - w * 0.1)}" rx="${u(0.022)}" ry="${u(0.04)}"/>`).join('')}</g>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${i}lg)"/>` +
    `<rect x="${x}" y="${y}" width="${r1(pw)}" height="${h}" fill="#4a2206" opacity=".3"/><rect x="${r1(x + 3 * pw)}" y="${y}" width="${r1(pw)}" height="${h}" fill="#4a2206" opacity=".38"/>` +
    // candle and flame, seen through the second pane
    `<rect x="${r1(fx - w * 0.045)}" y="${r1(fy + w * 0.13)}" width="${u(0.09)}" height="${r1(h * 0.5 - w * 0.13)}" fill="#efe2c0"/><path d="M${fx} ${r1(fy + w * 0.13)}v${-u(0.05)}" stroke="#2a1a10" stroke-width="${u(0.012)}"/>` +
    `<path d="M${fx} ${r1(fy - w * 0.15)}Q${r1(fx + w * 0.07)} ${r1(fy + w * 0.02)} ${fx} ${r1(fy + w * 0.1)}Q${r1(fx - w * 0.07)} ${r1(fy + w * 0.02)} ${fx} ${r1(fy - w * 0.15)}Z" fill="#ffb430"/>` +
    `<path d="M${fx} ${r1(fy - w * 0.08)}Q${r1(fx + w * 0.035)} ${r1(fy + w * 0.03)} ${fx} ${r1(fy + w * 0.085)}Q${r1(fx - w * 0.035)} ${r1(fy + w * 0.03)} ${fx} ${r1(fy - w * 0.08)}Z" fill="#fffbe6"/>` +
    `<g fill="#fff" opacity=".22">${shine}</g>` +
    (hasMoth ? moth(r1(x + pw * 2.5), r1(y + h * 0.47), r1(w / 205), 14) : '') +
    bars +
    `<rect x="${r1(x - w * 0.022)}" y="${y}" width="${u(1.044)}" height="${u(0.05)}" fill="url(#${i}lb)"/><rect x="${r1(x - w * 0.022)}" y="${r1(y + h - w * 0.05)}" width="${u(1.044)}" height="${u(0.05)}" fill="url(#${i}lb)"/>` +
    `<rect x="${r1(x - w * 0.07)}" y="${r1(y + h)}" width="${u(1.14)}" height="${u(0.1)}" rx="${u(0.015)}" fill="url(#${i}lb)"/><rect x="${r1(x - w * 0.07)}" y="${r1(y + h + w * 0.07)}" width="${u(1.14)}" height="${u(0.03)}" fill="#3a2608" opacity=".6"/>`
  );
};
/** Craquelure: a net of fine varnish cracks inside the box. */
const cracks = (seed: number, x: number, y: number, w: number, h: number, n: number): string => {
  const R = rng(seed);
  let d = '';
  for (let j = 0; j < n; j++) {
    let px = x + R() * w, py = y + R() * h;
    d += `M${Math.round(px)} ${Math.round(py)}`;
    for (let s = 0; s < 4; s++) {
      px += (R() - 0.5) * 70; py += (R() - 0.3) * 50;
      d += `L${Math.round(px)} ${Math.round(py)}`;
    }
  }
  return d;
};
const thermos = (x: number, y: number, s: number): string =>
  `<g transform="translate(${x} ${y}) scale(${s})"><rect y="30" width="60" height="136" rx="8" fill="#23404a"/><rect y="30" width="14" height="136" rx="6" fill="#fff" opacity=".12"/><rect x="4" width="52" height="36" rx="6" fill="#aeb4b8"/><rect y="60" width="60" height="6" fill="#c8ccd0" opacity=".5"/></g>`;
/** Parquet lines converging on a vanishing point (vx, top). */
const parquet = (vx: number, top: number, bottom: number, w: number): string => {
  let d = '';
  for (let i = -10; i <= 10; i++) d += `M${vx + i * 30} ${top}L${vx + i * 130} ${bottom}`;
  for (let j = 1; j < 6; j++) d += `M0 ${Math.round(top + ((bottom - top) * j * j) / 30)}H${w}`;
  return `<path d="${d}" stroke="#000" stroke-opacity=".4" stroke-width="1.300" fill="none"/>`;
};

A.c7_ph_gallery6 = (() => {
  const k = 'c7_ph_gallery6';
  const defs =
    rg(`${k}w`, [[0, '#6e222a'], [0.45, '#40131a'], [1, '#12050a']], 0.6, 0.36, 0.75) +
    lg(`${k}f`, [[0, '#3c2618'], [0.5, '#1c120c'], [1, '#070405']]) +
    lg(`${k}go`, GOLD, 1, 1) +
    rg(`${k}pl`, [[0, '#ffdc9a', 0.55], [0.5, '#f2a850', 0.15], [1, '#f2a850', 0]]) +
    rg(`${k}bt`, [[0, '#9fc8ff', 0.4], [1, '#9fc8ff', 0]]) +
    lg(`${k}le`, [[0, '#4a3226'], [0.4, '#2a1a14'], [1, '#0c0706']]) +
    bl(`${k}b5`, 5) + bl(`${k}b14`, 14);
  const body =
    `<rect width="800" height="400" fill="url(#${k}w)"/>` +
    `<g fill="none" stroke="#000" stroke-opacity=".25" stroke-width="2"><rect x="60" y="34" width="250" height="320"/><rect x="350" y="34" width="290" height="320"/><rect x="680" y="34" width="200" height="320"/></g>` +
    `<ellipse cx="495" cy="200" rx="230" ry="210" fill="url(#${k}pl)"/>` +
    `<rect y="384" width="800" height="22" fill="#180a0a"/><rect y="384" width="800" height="2.500" fill="#7a4a34" opacity=".5"/>` +
    `<rect y="406" width="800" height="194" fill="url(#${k}f)"/>${parquet(470, 406, 600, 800)}` +
    `<ellipse cx="495" cy="440" rx="190" ry="26" fill="#f2a850" opacity=".14"/><ellipse cx="170" cy="470" rx="190" ry="34" fill="url(#${k}bt)"/>` +
    // picture light + the Lorne
    `<path d="M440 46h110v8h-110z" fill="url(#${k}go)"/><path d="M495 46V30" stroke="#8a6218" stroke-width="4"/><path d="M446 54h98l26 40h-150z" fill="#ffe2a8" opacity=".14"/>` +
    `<rect x="398" y="78" width="210" height="262" fill="#000" opacity=".55" filter="url(#${k}b14)"/>` +
    gilt(`${k}go`, 420, 82, 150, 201, 22) + lorne(`${k}L`, 420, 82, 150) +
    `<rect x="618" y="250" width="38" height="26" fill="#e8dcc0"/><path d="M623 258h28M623 264h22M623 270h26" stroke="#5a4a3a" stroke-width="1.500"/>` +
    // bracket clock, left of the painting
    `<rect x="196" y="170" width="92" height="120" fill="#000" opacity=".5" filter="url(#${k}b5)" transform="translate(8 10)"/>` +
    bracketClock(`${k}c`, 240, 222, 27, false) +
    `<rect x="216" y="296" width="48" height="12" fill="${BRASS}" opacity=".8"/>` +
    // rope barrier
    `<g stroke="url(#${k}go)" stroke-width="5"><path d="M352 330V408M640 330V408"/></g><g fill="url(#${k}go)"><circle cx="352" cy="326" r="6"/><circle cx="640" cy="326" r="6"/><ellipse cx="352" cy="410" rx="14" ry="4"/><ellipse cx="640" cy="410" rx="14" ry="4"/></g><path d="M352 336Q496 384 640 336" fill="none" stroke="#7a1c26" stroke-width="5"/>` +
    // leather bench with thermos + radio
    `<ellipse cx="400" cy="590" rx="430" ry="22" fill="#000" opacity=".6" filter="url(#${k}b5)"/>` +
    `<path d="M70 492H730L800 540V600H0V540Z" fill="url(#${k}le)"/><path d="M70 492H730L800 540H0Z" fill="#5a3e30"/><path d="M70 492H730L800 540H0Z" fill="url(#${k}bt)" opacity=".5"/>` +
    `<g fill="#1c100c"><circle cx="200" cy="512" r="4"/><circle cx="400" cy="512" r="4"/><circle cx="600" cy="512" r="4"/></g><path d="M0 540H800" stroke="#7a5a48" stroke-width="2" opacity=".6"/>` +
    `<ellipse cx="548" cy="522" rx="34" ry="6" fill="#000" opacity=".5"/>` + thermos(526, 420, 0.62) +
    `<ellipse cx="626" cy="524" rx="34" ry="6" fill="#000" opacity=".5"/>` + radio(k, 602, 430, 0.54, '03:10');
  return frame(k, 800, 600, defs, body, 0.2, 0.62);
})();

A.c7_ph_moth = (() => {
  const k = 'c7_ph_moth';
  const defs =
    lg(`${k}bg`, [[0, '#1c2c2e'], [0.5, '#3a4a40'], [1, '#0e1618']]) +
    rg(`${k}gl`, [[0, '#ffd27a', 0.7], [0.5, '#e8902a', 0.25], [1, '#e8902a', 0]]) +
    lg(`${k}bm`, [[0, '#cfe6ff', 0], [0.35, '#bfe0ff', 0.5], [0.55, '#8ec2ff', 0.34], [1, '#8ec2ff', 0]], 1, 1) +
    lg(`${k}rm`, [[0, '#e8ecf0'], [0.3, '#7a8088'], [0.55, '#23262a'], [0.8, '#aeb4ba'], [1, '#3a3e44']], 1, 1) +
    bl(`${k}b18`, 18) + bl(`${k}b4`, 4) +
    `<clipPath id="${k}ln"><circle cx="300" cy="400" r="268"/></clipPath>`;
  const body =
    `<rect width="600" height="800" fill="#060608"/>` +
    `<g clip-path="url(#${k}ln)"><rect width="600" height="800" fill="url(#${k}bg)"/>` +
    // the rest of the painting, out of focus
    `<g filter="url(#${k}b18)"><path d="M0 560Q160 520 300 580T600 540V800H0Z" fill="#0c1012"/><path d="M-40 300Q60 380 150 800H-40Z" fill="#70787c"/><path d="M60 120Q150 260 120 480" stroke="#dcb48e" stroke-width="70" fill="none"/><path d="M0 250h600" stroke="#c2a05c" stroke-width="30" opacity=".5"/><circle cx="300" cy="420" r="330" fill="url(#${k}gl)"/></g>` +
    bigLantern(k, 122, 226, 356, false) +
    `<path d="${cracks(17, 20, 110, 560, 600, 34)}" fill="none" stroke="#f4ead0" stroke-width="1.100" opacity=".34"/>` +
    `<path d="${cracks(29, 20, 110, 560, 600, 16)}" fill="none" stroke="#1a1208" stroke-width="1" opacity=".4"/>` +
    // cold torch beam raking across the varnish
    `<path d="M-40 330L640 70V330L-40 640Z" fill="url(#${k}bm)" style="mix-blend-mode:screen"/>` +
    `<path d="M80 210q120-40 250-90M120 610q200-70 400-170" stroke="#eaf5ff" stroke-width="2" opacity=".25" fill="none" filter="url(#${k}b4)"/>` +
    // third pane from the left: the moth, crisp and deliberate
    `<ellipse cx="345" cy="412" rx="40" ry="46" fill="#fff6d8" opacity=".28" filter="url(#${k}b4)"/>` + moth(345, 410, 1.75, 14) + `</g>` +
    // loupe rim
    `<circle cx="300" cy="400" r="282" fill="none" stroke="url(#${k}rm)" stroke-width="30"/><circle cx="300" cy="400" r="268" fill="none" stroke="#000" stroke-width="5" opacity=".8"/><circle cx="300" cy="400" r="297" fill="none" stroke="#000" stroke-width="3"/>` +
    `<path d="M112 216A262 262 0 0 1 300 138" fill="none" stroke="#fff" stroke-width="5" opacity=".28" stroke-linecap="round"/>` +
    `<path d="M472 646L560 760" stroke="#1c1e22" stroke-width="54" stroke-linecap="round"/><path d="M466 652L548 760" stroke="#3a3e44" stroke-width="5" opacity=".6"/>`;
  return frame(k, 600, 800, defs, body, 0.2, 0.5);
})();

A.c7_ph_easel1996 = (() => {
  const k = 'c7_ph_easel1996';
  const easel = (cx: number): string =>
    `<g stroke="#8a6a44" stroke-width="9" stroke-linecap="round"><path d="M${cx} 96L${cx - 62} 640M${cx} 96L${cx + 62} 640M${cx} 110V600"/></g><rect x="${cx - 84}" y="372" width="168" height="12" fill="#6e5232"/>`;
  const defs =
    lg(`${k}w`, [[0, '#f4f1e6'], [1, '#d4d0c2']]) + lg(`${k}fl`, [[0, '#a89a84'], [1, '#6e6250']]) +
    lg(`${k}sk`, [[0, '#fffdf0', 0.9], [1, '#fffdf0', 0]], 0.3, 1) +
    bl(`${k}b6`, 6) +
    `<clipPath id="${k}im"><rect x="44" y="44" width="512" height="632"/></clipPath>`;
  const hanne =
    // body in a paint-marked work shirt
    `<path d="M180 690L192 452Q204 398 262 388H338Q396 398 408 452L420 690Z" fill="#c9d6e2"/><path d="M300 400V690" stroke="#9fb0c0" stroke-width="2"/><path d="M262 388L300 432L338 388L324 380H276Z" fill="#aebccb"/>` +
    // her arm reaching to the copy, brush in hand
    `<path d="M204 440Q170 420 186 330" fill="none" stroke="#c9d6e2" stroke-width="40" stroke-linecap="round"/><circle cx="186" cy="318" r="15" fill="#e6bc9a"/><path d="M196 326L150 282" stroke="#8a5a2a" stroke-width="5" stroke-linecap="round"/><path d="M152 284l-9-9" stroke="#f2a23a" stroke-width="6" stroke-linecap="round"/>` +
    `<g><circle cx="186" cy="372" r="7" fill="${PINK}"/><circle cx="200" cy="404" r="5" fill="#e8c93a"/><path d="M176 396q8 4 12 14" stroke="#2e7ad2" stroke-width="6" stroke-linecap="round" fill="none"/><circle cx="392" cy="470" r="6" fill="${OLIVE}"/><path d="M398 510q8 8 4 22" stroke="#d2402a" stroke-width="6" stroke-linecap="round" fill="none"/><circle cx="238" cy="560" r="5" fill="#f2a23a"/><circle cx="350" cy="620" r="6" fill="#2e7ad2"/></g>` +
    // head: dark-blond bob, wicked grin
    `<path d="M278 352h44v44q-22 14-44 0Z" fill="#c99a78"/>` +
    `<path d="M240 300C236 228 264 214 300 214C336 214 364 228 360 300C360 330 356 352 344 362H256C244 352 240 330 240 300Z" fill="#7a5c30"/>` +
    `<ellipse cx="300" cy="298" rx="44" ry="54" fill="#e6bc9a"/><path d="M304 246Q314 300 300 352Q340 344 344 298Q344 254 304 246Z" fill="#c99a78" opacity=".6"/>` +
    `<path d="M252 296C254 244 280 236 316 240C338 244 350 262 348 296C340 276 330 262 312 258C290 266 262 268 252 296Z" fill="#8a6a38"/><path d="M262 268Q280 246 310 246" fill="none" stroke="#c4a060" stroke-width="3" stroke-linecap="round"/>` +
    `<g fill="none" stroke="#2a1c14" stroke-width="3" stroke-linecap="round"><path d="M272 292q9-7 18 0M310 292q9-7 18 0"/><path d="M268 278q12-9 24-3M308 272q12-6 24 4" stroke="#6a4c26" stroke-width="3.500"/><path d="M300 300q5 12 0 18" stroke="#b88a68" stroke-width="2.400"/></g>` +
    `<path d="M276 324Q298 346 330 316Q302 328 276 324Z" fill="#fbf6ee" stroke="#8a3e3a" stroke-width="2.400" stroke-linejoin="round"/><path d="M330 316q4-3 5-8" fill="none" stroke="#8a3e3a" stroke-width="2"/>` +
    // laminated copyist permit on her lapel
    `<g transform="rotate(4 372 520)"><path d="M372 462V476" stroke="#8a8c90" stroke-width="6"/><rect x="304" y="474" width="136" height="94" rx="6" fill="#fdfcf6" stroke="#8a8c90" stroke-width="2"/><rect x="304" y="474" width="136" height="28" rx="6" fill="#7a1c26"/><rect x="304" y="494" width="136" height="8" fill="#7a1c26"/>` +
    tx(372, 496, 21, 'HOLLIN', '#fdf6e0', SANS, `${MID} ${BOLD} ${fit(86)}`) +
    tx(372, 520, 14, 'COPYIST PERMIT', '#1a1a1e', SANS, `${MID} ${BOLD} ${fit(120)}`) +
    tx(372, 542, 19, 'H. MAREK', '#1a1a1e', SANS, `${MID} ${BOLD} ${fit(96)}`) +
    tx(372, 561, 16, '1996', '#7a1c26', SANS, `${MID} ${BOLD} ${fit(44)}`) +
    `<rect x="304" y="474" width="136" height="94" rx="6" fill="#fff" opacity=".12"/></g>`;
  const body =
    `<rect width="600" height="800" fill="#17171a"/>` +
    `<g transform="rotate(-1.200 300 400)"><rect x="24" y="24" width="552" height="752" fill="#000" opacity=".5" filter="url(#${k}b6)"/><rect x="22" y="20" width="556" height="756" fill="#f6f1e4"/>` +
    `<g clip-path="url(#${k}im)"><rect x="44" y="44" width="512" height="632" fill="url(#${k}w)"/>` +
    // north skylight
    `<path d="M150 44H470L500 104H120Z" fill="#cfe2ee"/><path d="M150 44L120 104M230 44L215 104M310 44V104M390 44L405 104M470 44L500 104M120 104H500" stroke="#8a9098" stroke-width="4" fill="none"/><path d="M120 104H500L600 676H20Z" fill="url(#${k}sk)" opacity=".5"/>` +
    `<rect x="44" y="600" width="512" height="76" fill="url(#${k}fl)"/><path d="M44 600H556" stroke="#5a5040" stroke-width="2"/>` +
    // the copy (left, in progress) and the original (right), same size
    easel(124) + `<rect x="50" y="168" width="148" height="204" fill="#000" opacity=".25"/>` + lorne(`${k}a`, 52, 166, 144) +
    `<path d="M52 300L120 359H52Z" fill="#e8dcc2" opacity=".92"/><path d="M56 320l40 34M56 340l18 16" stroke="#8a7a5a" stroke-width="1.200"/>` +
    easel(476) + `<rect x="402" y="168" width="148" height="204" fill="#000" opacity=".25"/>` + lorne(`${k}b`, 404, 166, 144) +
    // taboret with palette
    `<rect x="440" y="560" width="110" height="90" fill="#7a6a54"/><ellipse cx="494" cy="558" rx="52" ry="12" fill="#b89468"/><g><circle cx="470" cy="556" r="6" fill="#f2a23a"/><circle cx="490" cy="552" r="6" fill="#31474a"/><circle cx="510" cy="556" r="6" fill="#70787c"/><circle cx="526" cy="560" r="5" fill="${PINK}"/></g>` +
    hanne +
    // 1996 colour-print fade
    `<rect x="44" y="44" width="512" height="632" fill="#f2b05a" opacity=".16" style="mix-blend-mode:multiply"/><rect x="44" y="44" width="512" height="632" fill="#ffe8d0" opacity=".12"/></g>` +
    `<rect x="44" y="44" width="512" height="632" fill="none" stroke="#000" stroke-opacity=".15"/>` +
    tx(74, 738, 34, 'the Vey job, April', '#55555c', HAND, `${ITAL} ${fit(300)} transform="rotate(-2 74 738)"`) + `</g>`;
  return frame(k, 600, 800, defs, body, 0.2, 0.4);
})();

A.c7_ph_ledger = (() => {
  const k = 'c7_ph_ledger';
  const R = rng(96);
  const INK = '#18265c', PALE = '#4a5a8a';
  let spat = '', rules = '';
  const cols = ['#e0569a', '#e8c93a', '#2e7ad2', '#f4f0e4', '#d2402a', '#8c9440', '#2a8a6a'];
  for (let i = 0; i < 34; i++) {
    const left = R() < 0.5;
    spat += `<circle cx="${Math.round(left ? R() * 44 : R() * 600)}" cy="${Math.round(left ? R() * 800 : R() < 0.5 ? R() * 44 : 762 + R() * 38)}" r="${r1(2 + R() * 9)}" fill="${cols[i % 7]}" opacity="${r1(0.5 + R() * 0.5)}"/>`;
  }
  for (let y = 132; y < 740; y += 40) rules += `M72 ${y}H574`;
  const line = (y: number, s: string, big = true): string =>
    tx(96, y, big ? 23 : 17, s, big ? INK : PALE, SERIF, `${ITAL}${big ? ' ' + BOLD : ''} ${fit(Math.round(s.length * (big ? 10.5 : 8)))}${big ? '' : ' opacity=".8"'}`);
  const defs =
    lg(`${k}t`, [[0, '#6a5238'], [1, '#3a2a1a']], 1, 1) + lg(`${k}p`, [[0, '#d9cfb4'], [0.08, '#f1e8d0'], [1, '#e6dabc']], 1, 0) +
    lg(`${k}gu`, [[0, '#000', 0.5], [1, '#000', 0]], 1, 0) + bl(`${k}b8`, 8);
  const body =
    `<rect width="600" height="800" fill="url(#${k}t)"/><path d="M0 200h600M0 470h600M0 690h600" stroke="#000" stroke-opacity=".25" stroke-width="2"/>${spat}` +
    `<rect x="10" y="40" width="600" height="740" fill="#000" opacity=".55" filter="url(#${k}b8)"/>` +
    // cloth cover edge, left-hand page sliver, right-hand page
    `<rect x="-20" y="34" width="640" height="736" rx="6" fill="#3a2220"/><rect x="-20" y="42" width="76" height="720" fill="#e2d6b8"/><path d="M-20 132h70M-20 172h70M-20 212h70M-20 252h70M-20 292h70" stroke="#8aa0b8" stroke-width="1" opacity=".5"/>` +
    `<path d="M56 42H592Q600 400 592 762H56Z" fill="url(#${k}p)"/><rect x="40" y="42" width="60" height="720" fill="url(#${k}gu)" opacity=".5"/>` +
    `<path d="${rules}" stroke="#8aa0b8" stroke-width="1" opacity=".55"/><path d="M88 42V762" stroke="#c86a6a" stroke-width="1.200" opacity=".6"/>` +
    `<path d="M592 700q-20 30-50 62h50Z" fill="#cfc29e"/>` +
    tx(96, 84, 19, 'COMMISSIONS — 1996', '#5a4a3a', SERIF, `${BOLD} letter-spacing="2"`) +
    line(126, '12 JAN — Mrs. Aldous — after Corot, 30 × 40 — $350', false) +
    line(166, '19 FEB — R. Penhale — still life, 25 × 35 — $280', false) +
    line(246, '4 MAR 1996 — C. Vey (Hollin, director)') +
    line(286, '— full-size copy, Lorne, Girl w/ Storm') +
    line(326, "Lantern, 91 × 122 — 'for the conservation") +
    line(366, "period' — $4,000 cash — moth: 3rd pane") +
    `<path d="M352 374q80 8 172-2" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>` +
    line(446, '30 SEP — copy collected by C.V. personally,') +
    line(486, 'at night. Odd.') +
    `<path d="M192 494q34 6 62-1" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>` +
    line(566, "11 NOV — St. Brannoc's — Madonna, 40 × 50 — $500", false) +
    line(606, '2 DEC — Mrs. Aldous — after Chardin, 28 × 36 — $300', false) +
    line(646, '20 DEC — framing, sundries — $64', false) +
    moth(540, 206, 0.75, 18, false, INK) +
    // ink blot, fountain pen
    `<circle cx="470" cy="492" r="5" fill="${INK}" opacity=".7"/><circle cx="480" cy="499" r="2" fill="${INK}" opacity=".6"/>` +
    `<g transform="rotate(-24 420 716)"><rect x="300" y="704" width="230" height="22" rx="10" fill="#14161c"/><rect x="300" y="706" width="230" height="5" rx="2" fill="#fff" opacity=".2"/><rect x="430" y="702" width="10" height="26" fill="${BRASS}"/><path d="M300 706l-34 9l34 9Z" fill="${BRASS}"/><path d="M290 715h-22" stroke="#3a2608" stroke-width="1.200"/></g>`;
  return frame(k, 600, 800, defs, body, 0.18, 0.42);
})();

A.c7_ph_workorder = (() => {
  const k = 'c7_ph_workorder';
  const P = '#1a1a1e';
  const tape = (x: number, y: number, a: number): string =>
    `<rect x="${x - 40}" y="${y - 14}" width="80" height="28" fill="#e8dca0" opacity=".62" transform="rotate(${a} ${x} ${y})"/>`;
  const defs =
    lg(`${k}d`, [[0, '#3a3e46'], [1, '#1c1e24']], 1, 1) + lg(`${k}p`, [[0, '#f6f4ec'], [1, '#dcd8ca']], 0.4, 1) +
    lg(`${k}sc`, [[0, '#2a4050'], [1, '#101c26']]) + rg(`${k}gl`, [[0, '#8ec2e8', 0.35], [1, '#8ec2e8', 0]]) + bl(`${k}b8`, 8);
  const cam = (x: number, y: number, lbl: string, inner: string): string =>
    `<g transform="translate(${x} ${y})"><rect width="118" height="58" fill="url(#${k}sc)"/>${inner}<text x="5" y="12" ${MONO} font-size="10" fill="#bfe6ff">${lbl}</text></g>`;
  const body =
    `<rect width="600" height="800" fill="url(#${k}d)"/><path d="M0 150H600" stroke="#000" stroke-opacity=".5" stroke-width="3"/>` +
    // CCTV monitor
    `<rect x="296" y="-30" width="330" height="176" rx="8" fill="#0c0d10"/><rect x="310" y="-10" width="300" height="140" fill="#06080a"/>` +
    cam(314, 8, 'G4', `<path d="M0 44h118M30 44L44 20h30l14 24" stroke="#4a6a7a" fill="none"/>`) +
    cam(436, 8, 'G5', `<path d="M0 46h118" stroke="#4a6a7a"/><rect x="40" y="16" width="16" height="20" fill="#4a6a7a"/><rect x="70" y="16" width="16" height="20" fill="#4a6a7a"/>`) +
    cam(314, 70, 'G6', `<path d="M0 46h118" stroke="#4a6a7a"/><rect x="50" y="12" width="20" height="27" fill="#c9a04a"/><rect x="53" y="15" width="14" height="21" fill="#31474a"/><circle cx="63" cy="22" r="2.500" fill="#ffd27a"/><rect x="26" y="20" width="9" height="12" fill="#6a7a84"/>`) +
    cam(436, 70, 'LOBBY', `<path d="M0 40h118M20 58L50 40M98 58L70 40" stroke="#4a6a7a" fill="none"/>`) +
    `<circle cx="600" cy="138" r="3" fill="#3ad26a"/><ellipse cx="450" cy="170" rx="200" ry="50" fill="url(#${k}gl)"/>` +
    // desk clutter
    `<rect x="18" y="40" width="150" height="74" rx="6" fill="#16181c"/><g fill="#2c3038">${[0, 1, 2, 3, 4].map((i) => `<rect x="${30 + i * 26}" y="54" width="20" height="14" rx="2"/><rect x="${30 + i * 26}" y="76" width="20" height="14" rx="2"/>`).join('')}</g>` +
    // the work order, taped down
    `<g transform="rotate(-2 300 470)"><rect x="76" y="176" width="460" height="596" fill="#000" opacity=".5" filter="url(#${k}b8)"/><rect x="68" y="166" width="460" height="596" fill="url(#${k}p)"/>` +
    `<rect x="68" y="166" width="460" height="76" fill="#1c2a44"/>` +
    tx(298, 214, 22, 'HOLLIN FACILITIES — WORK ORDER 2291', '#f4f0e0', SANS, `${MID} ${BOLD} ${fit(424)}`) +
    tx(298, 290, 22, 'Gallery 6 · Sprinkler zone 6 · Flow test', P, SANS, `${MID} ${fit(404)}`) +
    `<path d="M96 310H500" stroke="${P}" stroke-width="1" opacity=".5"/>` +
    tx(298, 350, 23, 'Night of Fri Oct 30 · 03:55–04:25', P, SANS, `${MID} ${BOLD} ${fit(380)}`) +
    `<rect x="158" y="380" width="280" height="84" fill="none" stroke="${P}" stroke-width="4"/><rect x="165" y="387" width="266" height="70" fill="none" stroke="${P}" stroke-width="1.200"/>` +
    tx(298, 441, 54, 'DRY TEST', P, SANS, `${MID} ${BOLD} ${fit(236)}`) +
    `<rect x="92" y="494" width="412" height="88" fill="#f2d24a" opacity=".5"/>` +
    tx(298, 528, 21, 'DO NOT COVER OR RELOCATE WORKS —', P, SANS, `${MID} ${BOLD} ${fit(392)}`) +
    tx(298, 562, 21, 'normal gallery conditions required', P, SANS, `${MID} ${fit(340)}`) +
    tx(98, 640, 22, 'Authorized: C. Vey, Board Chair', P, SANS, `${BOLD} ${fit(336)}`) +
    `<path d="M150 716H480" stroke="${P}" stroke-width="1.200"/>` +
    `<path d="M176 706C170 668 214 656 212 686C210 712 184 716 200 690C214 668 236 664 240 700Q250 664 262 700Q270 676 284 700Q300 690 316 698Q360 706 420 680Q366 716 250 714" fill="none" stroke="#1c2e8a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>` +
    tx(98, 740, 12, 'FORM F-12 · CONTRACTOR COPY', '#6a6a6e', SANS, 'letter-spacing="1"') +
    tape(88, 172, -38) + tape(508, 172, 40) + tape(84, 756, 36) + tape(512, 756, -40) + `</g>`;
  return frame(k, 600, 800, defs, body, 0.18, 0.48);
})();

A.c7_ph_study = (() => {
  const k = 'c7_ph_study';
  const R = rng(1204);
  const SP = ['#5a1c22', '#23404a', '#6a5a2a', '#2a2a44', '#7a3a1a', '#1e3a2a', '#8a7a5a'];
  const shelf = (x: number, w: number): string => {
    let s = `<rect x="${x}" width="${w}" height="450" fill="#1c100a"/>`;
    for (let row = 0; row < 6; row++) {
      if (row === 5 && x > 0) break;
      let bx = x + 4;
      while (bx < x + w - 8) {
        const bw = Math.round(11 + R() * 12), bh = Math.round(44 + R() * 16);
        s += `<rect x="${bx}" y="${row * 74 + 68 - bh}" width="${bw}" height="${bh}" fill="${SP[Math.floor(R() * 7)]}"/>`;
        bx += bw + 1;
      }
      s += `<rect x="${x}" y="${row * 74 + 68}" width="${w}" height="6" fill="#3a2414"/>`;
    }
    return s;
  };
  const cap = (y: number, s: string): string => tx(532, y, 22, s, '#2a2622', SERIF, `${ITAL} ${fit(Math.round(s.length * 10.4))}`);
  const defs =
    rg(`${k}lp`, [[0, '#ffe6a0', 0.75], [0.4, '#f2b050', 0.25], [1, '#f2b050', 0]]) +
    lg(`${k}ch`, [[0, '#6a1c20'], [1, '#2a0a0c']], 1, 0) + bl(`${k}b6`, 6) +
    `<clipPath id="${k}ph"><rect width="480" height="450"/></clipPath>`;
  const photo =
    `<g transform="translate(30 126)" clip-path="url(#${k}ph)"><rect width="480" height="450" fill="#1e2a26"/>` +
    shelf(0, 64) + shelf(300, 180) +
    `<rect x="64" width="236" height="450" fill="#22302a"/><rect x="64" y="300" width="236" height="150" fill="#1a120c"/>` +
    // the "copy", full size, in a plain dark frame
    `<rect x="94" y="22" width="178" height="232" fill="#000" opacity=".5" filter="url(#${k}b6)"/><rect x="96" y="24" width="170" height="224" fill="#14100c"/>` + lorne(`${k}L`, 106, 34, 150) +
    `<rect x="101" y="29" width="160" height="214" fill="none" stroke="#3a2c20" stroke-width="2"/>` +
    // rug, desk, green banker's lamp
    `<path d="M0 410H480V450H0Z" fill="#3a1418"/><path d="M0 418H480" stroke="#b8902e" stroke-width="2" opacity=".5"/>` +
    `<rect x="44" y="304" width="236" height="16" fill="#5a3418"/><rect x="52" y="320" width="220" height="100" fill="#3a200e"/><rect x="62" y="330" width="90" height="34" fill="none" stroke="#5a3418" stroke-width="2"/><rect x="170" y="330" width="90" height="34" fill="none" stroke="#5a3418" stroke-width="2"/>` +
    `<circle cx="230" cy="296" r="76" fill="url(#${k}lp)"/><path d="M196 264Q230 244 264 264L260 280H200Z" fill="#1f8a52"/><path d="M200 270Q230 254 260 270" fill="none" stroke="#7fe0a8" stroke-width="2" opacity=".7"/><path d="M230 280V300M214 304h32" stroke="${BRASS}" stroke-width="4"/><path d="M204 280H256L250 290H210Z" fill="#fff6c8"/>` +
    `<rect x="80" y="292" width="54" height="12" fill="#e8dcc0"/><rect x="84" y="286" width="46" height="7" fill="#7a1c26"/>` +
    // Conrad Vey in his leather chair
    `<path d="M316 196Q316 150 372 150Q428 150 428 196V420H316Z" fill="url(#${k}ch)"/><path d="M300 300Q300 280 322 284V420H300ZM444 300Q444 280 422 284V420H444Z" fill="#4a1216"/><g fill="#2a0a0c"><circle cx="340" cy="186" r="3"/><circle cx="404" cy="186" r="3"/><circle cx="372" cy="170" r="3"/></g>` +
    `<path d="M336 300Q334 250 356 244H390Q412 250 410 300L416 372H330Z" fill="#3c3e44"/><path d="M362 244L373 290L384 244Z" fill="#f2f0ec"/><path d="M371 252h4l2 34l-4 6l-4-6Z" fill="#6e1c2a"/><path d="M362 244L373 290L360 372M384 244L373 290L386 372" stroke="#1c1e22" stroke-width="1.500" fill="none"/><path d="M392 268l10-2l2 8l-11 1z" fill="#f4f0e6"/>` +
    `<path d="M332 366Q380 350 420 366L452 384Q462 400 446 404L400 396L404 440H380L372 400L352 440H328Z" fill="#2c2e34"/><path d="M380 440h28l10 8h-38ZM326 440h28l-2 8h-32Z" fill="#0c0c0e"/>` +
    `<path d="M410 290Q440 300 434 330L420 334" fill="none" stroke="#3c3e44" stroke-width="18" stroke-linecap="round"/><circle cx="418" cy="336" r="8" fill="#e4c4ac"/><path d="M336 290Q316 310 330 338" fill="none" stroke="#3c3e44" stroke-width="18" stroke-linecap="round"/><circle cx="333" cy="342" r="8" fill="#e4c4ac"/>` +
    `<rect x="364" y="232" width="18" height="16" fill="#d0ac96"/><ellipse cx="373" cy="212" rx="21" ry="26" fill="#e4c4ac"/><path d="M376 188Q384 212 373 238Q392 232 394 212Q394 194 376 188Z" fill="#a27e6e" opacity=".5"/>` +
    `<path d="M351 212C348 180 364 178 378 180C392 182 398 194 395 212C392 200 388 194 380 192C368 190 358 194 351 212Z" fill="#cdd1d5"/>` +
    `<g fill="none" stroke="#2a2024" stroke-width="1.800" stroke-linecap="round"><path d="M361 210h7M378 210h7"/><path d="M364 226q9 3 17-1" stroke="#8a4e4c"/><path d="M359 204q5-3 10-1M377 203q5-2 10 1" stroke="#9a9ea4"/></g></g>`;
  const body =
    `<rect width="800" height="600" fill="#f5f1e8"/>` +
    // phone browser chrome
    `<rect width="800" height="30" fill="#17181c"/><rect x="200" y="5" width="400" height="20" rx="10" fill="#2c2e34"/>` + tx(400, 20, 13, 'interiorsq.example/vey-at-home', '#b8bcc4', SANS, MID) +
    tx(30, 62, 19, 'INTERIORS QUARTERLY', '#7a1c26', SANS, `${BOLD} letter-spacing="5"`) +
    tx(770, 62, 13, 'WINTER 2025 · AT HOME', '#6a665e', SANS, 'text-anchor="end" letter-spacing="2"') +
    `<path d="M30 72H770" stroke="#1a1816" stroke-width="2"/><path d="M30 76H770" stroke="#1a1816" stroke-width=".7"/>` +
    tx(30, 112, 35, 'A Life Among Pictures: Conrad Vey at Home', '#1a1816', SERIF, `${BOLD} ${fit(740)}`) +
    photo + `<rect x="30" y="126" width="480" height="450" fill="none" stroke="#1a1816" stroke-width="1"/>` +
    `<path d="M532 140h40" stroke="#7a1c26" stroke-width="4"/>` +
    cap(180, 'Above the desk, a copy') + cap(212, "of the Hollin's beloved") + cap(244, "Lorne. 'A copy,") + cap(276, "naturally,' Vey laughs.") + cap(308, "'I couldn't live") + cap(340, "without her.'") +
    `<g fill="#b8b2a4">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => `<rect x="532" y="${384 + i * 16}" width="${i % 4 === 3 ? 150 : 236}" height="5"/>`).join('')}</g>`;
  return frame(k, 800, 600, defs, body, 0.1, 0.22);
})();

A.c7_ph_studyzoom = (() => {
  const k = 'c7_ph_studyzoom';
  const R = rng(41);
  const RED = '#ff3b30';
  let px = '';
  for (let i = 0; i < 70; i++) {
    const x = Math.floor(R() * 25) * 24, y = Math.floor(R() * 34) * 24;
    px += `<rect x="${x}" y="${y}" width="24" height="24" fill="${R() < 0.5 ? '#fff' : '#000'}" opacity="${r1(0.03 + R() * 0.07)}"/>`;
  }
  const note = (y: number, s: string, w: number): string =>
    tx(40, y, 33, s, RED, HAND, `${BOLD} ${fit(w)} stroke="#1a0606" stroke-width="5" stroke-opacity=".6" paint-order="stroke" stroke-linejoin="round"`);
  const defs =
    lg(`${k}bg`, [[0, '#1a282c'], [0.3, '#3a504e'], [0.44, '#a08e58'], [0.5, '#3c5552'], [1, '#14201f']]) +
    rg(`${k}gl`, [[0, '#ffd27a', 0.6], [0.5, '#e8902a', 0.2], [1, '#e8902a', 0]]) + bl(`${k}b2`, 1.4) +
    `<pattern id="${k}px" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M12 0H0V12" fill="none" stroke="#000" stroke-width="1" opacity=".16"/></pattern>`;
  const body =
    `<g filter="url(#${k}b2)"><rect width="600" height="800" fill="url(#${k}bg)"/>` +
    `<path d="M-10 90Q150 50 330 96T610 70V170Q420 150 300 180T-10 170Z" fill="#0c1418" opacity=".5"/>` +
    `<path d="M20 470q50-16 100 0M400 520q60-18 120 0M60 560q60-18 120 0M330 610q70-20 150 0" fill="none" stroke="#b9cdbc" stroke-width="5" stroke-linecap="round" opacity=".4"/>` +
    `<path d="M0 640Q200 610 380 640T600 620V800H0Z" fill="#0d1113"/>` +
    `<circle cx="330" cy="400" r="330" fill="url(#${k}gl)"/>` +
    // plain dark frame of the study picture, top-right corner
    `<path d="M0 0H600V800H556V44H0Z" fill="#14100c"/><path d="M0 44H556V800" fill="none" stroke="#3a2c20" stroke-width="4"/>` +
    // her raised arm, hand through the ring
    `<path d="M-30 640L150 350" stroke="#70787c" stroke-width="120" stroke-linecap="round"/><path d="M40 470q50 30 110 20" fill="none" stroke="#4c5458" stroke-width="6"/>` +
    `<path d="M150 350L318 140" stroke="#dcb48e" stroke-width="56" stroke-linecap="round"/><path d="M176 356L330 160" stroke="#b58c6c" stroke-width="14" stroke-linecap="round" opacity=".7"/>` +
    bigLantern(k, 186, 262, 300, false) +
    `<path d="M300 150q16-40 50-38q30 4 26 34q-10 26-40 22" fill="#dcb48e" stroke="#b58c6c" stroke-width="4"/>` +
    `</g>` +
    // the crack in the varnish by her wrist
    `<path d="M196 196l22 30l-10 26l34 22l4 40l26 20M218 226l-26 12M242 274l22-14M246 314l-30 14" fill="none" stroke="#f4ead0" stroke-width="2.600" stroke-linejoin="round" opacity=".9"/>` +
    `<path d="M198 198l22 30l-10 26l34 22l4 40l26 20" fill="none" stroke="#1a1208" stroke-width="1" opacity=".6" transform="translate(2 2)"/>` +
    // screenshot pixelation
    px + `<rect width="600" height="800" fill="url(#${k}px)"/>` +
    // red phone markup
    `<g fill="none" stroke="${RED}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="M374 250C314 256 312 560 368 606C430 620 452 300 400 256C390 246 372 246 360 256"/>` +
    `<path d="M150 610C80 520 90 380 196 300M196 300l-40 6M196 300l-8 40"/><path d="M40 778q150 10 290-6" stroke-width="5"/></g>` +
    note(678, '3rd pane — NO MOTH. Same size.', 520) + note(722, 'Same crack in the varnish', 410) + note(766, "by her wrist. It's HER.", 370);
  return frame(k, 600, 800, defs, body, 0.14, 0.34);
})();

A.c7_ph_sketchbook = (() => {
  const k = 'c7_ph_sketchbook';
  const PEN = '#5a5650';
  /** A watercolour study: re-uses the folded / open moth drawn once in <defs>. */
  const m = (x: number, y: number, sc: number, rot: number, open = false): string =>
    `<use href="#${k}${open ? 'mo' : 'mf'}" transform="translate(${x} ${y}) rotate(${rot}) scale(${sc})"/>`;
  const wash = (x: number, y: number, rx: number, ry: number, c: string, a = 0): string =>
    `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${c}" opacity=".3" transform="rotate(${a} ${x} ${y})"/>`;
  const defs =
    lg(`${k}t`, [[0, '#a07a4c'], [1, '#6a4a2a']], 1, 1) + lg(`${k}p`, [[0, '#f6f0de'], [0.92, '#efe6d0'], [1, '#cfc4a8']], 1, 0) +
    lg(`${k}q`, [[0, '#cfc4a8'], [0.08, '#efe6d0'], [1, '#f6f0de']], 1, 0) + bl(`${k}b8`, 8) + bl(`${k}b3`, 3) +
    `<g id="${k}mf">${moth(0, 0, 1)}</g><g id="${k}mo">${moth(0, 0, 1, 0, true)}</g>` +
    `<pattern id="${k}gg" width="36" height="36" patternUnits="userSpaceOnUse"><rect width="36" height="36" fill="#f4efe4"/><path d="M0 0h18v36h-18zM0 0h36v18h-36z" fill="#c8382e" opacity=".5"/></pattern>`;
  const body =
    `<rect width="800" height="600" fill="url(#${k}t)"/><path d="M0 150h800M0 310h800M0 470h800" stroke="#3a2412" stroke-width="2" opacity=".5"/><path d="M60 80q120 10 220-6M420 230q160 12 330-4M100 400q200 14 380 0M300 540q200 10 420-6" fill="none" stroke="#5a3c1e" stroke-width="1.500" opacity=".4"/>` +
    // gingham cloth corner + tea mug
    `<path d="M600 -10H810V170Q700 150 600 -10Z" fill="url(#${k}gg)"/><path d="M600 -10Q700 150 810 170" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="5" filter="url(#${k}b3)"/>` +
    `<circle cx="52" cy="48" r="62" fill="#000" opacity=".4" filter="url(#${k}b8)"/><circle cx="46" cy="40" r="56" fill="#e8e4da"/><circle cx="46" cy="40" r="46" fill="#7a4a22"/><path d="M14 30a36 36 0 0 1 40-26" fill="none" stroke="#c89a6a" stroke-width="4" opacity=".6"/>` +
    // sketchbook
    `<g transform="rotate(-3 400 310)"><rect x="70" y="80" width="676" height="476" fill="#000" opacity=".5" filter="url(#${k}b8)"/><rect x="60" y="66" width="680" height="480" rx="4" fill="#2a2a30"/>` +
    `<rect x="68" y="72" width="332" height="468" fill="url(#${k}p)"/><rect x="400" y="72" width="332" height="468" fill="url(#${k}q)"/>` +
    `<g fill="none" stroke="#8a8c90" stroke-width="3">${Array.from({ length: 15 }, (_, i) => `<ellipse cx="400" cy="${92 + i * 31}" rx="9" ry="5"/>`).join('')}</g>` +
    tx(88, 112, 31, 'elephant hawk-moth', '#45423e', HAND, `${ITAL} ${BOLD} ${fit(262)}`) + tx(88, 146, 31, '— again — smaller', '#45423e', HAND, `${ITAL} ${BOLD} ${fit(236)}`) +
    `<path d="M88 156q120 8 240-2" fill="none" stroke="${PEN}" stroke-width="1.200" opacity=".6"/>` +
    // left page: folded studies, shrinking
    wash(160, 300, 62, 78, PINK, -8) + wash(180, 290, 44, 62, OLIVE, 20) + m(164, 296, 3, -8) +
    wash(316, 250, 34, 44, OLIVE) + m(316, 250, 1.7, 22) +
    moth(300, 376, 1.6, -24, false, PEN) +
    `<path d="M92 470H376" stroke="${PEN}" stroke-width="1" opacity=".4" stroke-dasharray="4 5"/>` +
    m(110, 458, 1.25, 0) + m(168, 464, 0.95, 6) + m(216, 468, 0.72, -5) + m(256, 471, 0.54, 4) + m(286, 474, 0.38, 0) +
    `<path d="M296 498q26 12 44-14M340 484l-12 2M340 484l-2 12" fill="none" stroke="${PEN}" stroke-width="1.600" stroke-linecap="round"/>` +
    // right page: wings open
    wash(520, 190, 130, 60, PINK) + wash(566, 176, 110, 48, OLIVE, -6) + m(566, 196, 2.7, 6, true) +
    moth(486, 360, 1.7, -14, true, PEN) + wash(650, 366, 56, 30, PINK, 12) + m(650, 370, 1.25, 16, true) +
    wash(456, 470, 26, 32, OLIVE) + m(456, 470, 1.2, -34) + m(548, 484, 0.7, 30, true) +
    // colour tests
    `<g opacity=".85"><rect x="640" y="446" width="34" height="22" rx="3" fill="${PINK}"/><rect x="680" y="446" width="34" height="22" rx="3" fill="${OLIVE}"/><rect x="640" y="474" width="34" height="22" rx="3" fill="#f0a8c8"/><rect x="680" y="474" width="34" height="22" rx="3" fill="#5a6228"/></g>` +
    `<path d="M430 96q60-8 110 2M436 110q40-6 70 0" fill="none" stroke="${PEN}" stroke-width="1.400" opacity=".5"/></g>` +
    // pencil + brush on the table
    `<g transform="rotate(8 600 574)"><rect x="470" y="566" width="250" height="13" fill="#e8b830"/><path d="M720 566l26 6.500l-26 6.500Z" fill="#e8cfa0"/><path d="M738 570.500l8 2l-8 2Z" fill="#2a2a2a"/><rect x="452" y="566" width="18" height="13" fill="#d88a8a"/><rect x="466" y="566" width="8" height="13" fill="#aeb4b8"/></g>`;
  return frame(k, 800, 600, defs, body, 0.18, 0.42);
})();

A.c7_ph_memorial = (() => {
  const k = 'c7_ph_memorial';
  const OX = '#7a1c26', INK = '#1e1c1a';
  const defs =
    lg(`${k}w`, [[0, '#e8e4d8'], [1, '#bcb6a6']], 0.4, 1) + lg(`${k}p`, [[0, '#f8f2e0'], [1, '#e6dcc2']], 0.3, 1) +
    rg(`${k}ph`, [[0, '#b8b8b8'], [1, '#3c3c3c']], 0.4, 0.35, 0.8) + bl(`${k}b8`, 8) +
    `<pattern id="${k}br" width="120" height="64" patternUnits="userSpaceOnUse"><path d="M0 0H120M0 32H120M0 0V32M60 32V64" fill="none" stroke="#8a8474" stroke-width="3" opacity=".45"/><path d="M0 3H120M0 35H120" fill="none" stroke="#fff" stroke-width="2" opacity=".5"/></pattern>` +
    `<clipPath id="${k}pc"><rect x="150" y="140" width="300" height="250"/></clipPath>`;
  const portrait =
    `<g clip-path="url(#${k}pc)"><rect x="150" y="140" width="300" height="250" fill="url(#${k}ph)"/>` +
    `<path d="M186 390Q196 322 262 314H322Q388 322 398 390Z" fill="#6a6a6a"/><g fill="#d8d8d8"><circle cx="220" cy="364" r="5"/><circle cx="366" cy="350" r="4"/><circle cx="250" cy="346" r="3"/></g><path d="M262 314Q292 340 322 314" fill="none" stroke="#8a8a8a" stroke-width="6"/>` +
    `<rect x="274" y="286" width="36" height="36" fill="#a8a8a8"/><ellipse cx="292" cy="242" rx="46" ry="56" fill="#dcdcdc"/><path d="M296 188Q312 242 292 298Q334 290 338 242Q338 200 296 188Z" fill="#a8a8a8" opacity=".6"/>` +
    `<path d="M242 250C236 190 264 176 296 178C328 180 346 198 340 248C336 226 330 212 316 206C298 212 280 204 264 210C250 216 244 232 242 250Z" fill="#f6f6f6"/><path d="M246 236l-8 8M250 216l-9 2M340 226l8 4M300 180l3-9M280 182l-4-8" stroke="#f6f6f6" stroke-width="5" stroke-linecap="round"/>` +
    `<g fill="none" stroke="#2a2a2a" stroke-width="3" stroke-linecap="round"><path d="M262 244h26v6a10 10 0 0 1-10 10h-6a10 10 0 0 1-10-10ZM298 244h26v6a10 10 0 0 1-10 10h-6a10 10 0 0 1-10-10ZM288 247h10"/><path d="M268 250q7-5 14 0M304 250q7-5 14 0" stroke-width="2.400"/></g>` +
    `<path d="M268 272Q290 296 322 266Q294 280 268 272Z" fill="#fff" stroke="#3a3a3a" stroke-width="2.400" stroke-linejoin="round"/>` +
    // brush held like a cigarette
    `<path d="M392 330L436 250" stroke="#4a4a4a" stroke-width="5" stroke-linecap="round"/><path d="M427 266l8-14" stroke="#c8c8c8" stroke-width="6.500"/><path d="M434 253l8-15q2 11-4 17z" fill="#1a1a1a"/>` +
    `<path d="M370 392V356Q370 338 384 336L390 300Q393 292 398 295Q402 298 401 306L399 322L406 302Q410 295 415 298Q419 302 416 310L410 340Q418 346 418 362V392Z" fill="#d0d0d0" stroke="#8a8a8a" stroke-width="2"/></g>` +
    `<rect x="150" y="140" width="300" height="250" fill="none" stroke="${INK}" stroke-width="1.500"/>`;
  const body =
    `<rect width="600" height="800" fill="url(#${k}w)"/><rect width="600" height="800" fill="url(#${k}br)"/>` +
    `<path d="M0 0H600V60Q300 100 0 60Z" fill="#000" opacity=".12"/>` +
    // corner of a neighbouring poster + conduit
    `<rect x="-40" y="500" width="110" height="230" fill="#23404a" transform="rotate(-4 0 600)"/><rect x="548" y="-10" width="16" height="820" fill="#9a968a"/><rect x="548" y="-10" width="5" height="820" fill="#fff" opacity=".3"/>` +
    `<g transform="rotate(1.500 300 400)"><rect x="118" y="112" width="380" height="600" fill="#000" opacity=".4" filter="url(#${k}b8)"/><rect x="110" y="100" width="380" height="600" fill="url(#${k}p)"/>` +
    `<rect x="122" y="112" width="356" height="576" fill="none" stroke="${OX}" stroke-width="2"/>` + portrait +
    tx(300, 436, 25, 'HANNE MAREK (1952–2024)', INK, SERIF, `${MID} ${BOLD} ${fit(322)}`) +
    `<path d="M170 452H430" stroke="${INK}" stroke-width="1"/>` +
    tx(300, 500, 35, "THE COPYIST'S HAND", OX, SERIF, `${MID} ${BOLD} ${fit(328)}`) +
    tx(300, 542, 21, 'forty years of copies, one moth each', INK, SERIF, `${MID} ${ITAL} ${fit(316)}`) +
    moth(300, 590, 0.9, 0, true) +
    `<path d="M170 590H236M364 590H430" stroke="${OX}" stroke-width="1.500"/>` +
    tx(300, 652, 22, 'Tallow Lane Studios · May 10', INK, SANS, `${MID} ${BOLD} ${fit(310)}`) +
    `<path d="M476 688l14-14v14Z" fill="#cfc4a6"/>` +
    `<circle cx="302" cy="110" r="10" fill="#000" opacity=".3"/><circle cx="300" cy="106" r="9" fill="#c8202a"/><circle cx="297" cy="103" r="3" fill="#fff" opacity=".6"/></g>`;
  return frame(k, 600, 800, defs, body, 0.2, 0.4);
})();

A.c7_ph_marathon = (() => {
  const k = 'c7_ph_marathon';
  const R = rng(3100);
  const HAIR = ['#1a1418', '#5a3a22', '#8a6a3a', '#2a2a3a', '#7a2a2a', '#3a2a1a', '#c8b48a', '#2c4a5a'];
  const TOP = ['#3a4a6a', '#6a3a3a', '#3a5a4a', '#5a5a5a', '#7a6a3a', '#4a3a5a', '#2a2a30', '#8a4a2a'];
  let crowd = '';
  // three arcs of students seen from behind, each at a drawing board
  ([[318, 0.52, 13, 60, 56], [384, 0.74, 13, 30, 62], [470, 1.02, 10, 10, 86]] as const).forEach(([y, s, n, x0, dx], row) => {
    for (let i = 0; i < n; i++) {
      if (row === 2 && (i === 2 || i === 3)) continue; // gap for Felix
      const x = x0 + i * dx + Math.round(R() * 10), yy = y + Math.round(Math.abs(i - n / 2) * (row + 1) * 1.6);
      crowd += `<use href="#${k}st" transform="translate(${x} ${yy}) scale(${s})" color="${HAIR[Math.floor(R() * 8)]}" fill="${TOP[Math.floor(R() * 8)]}"/>`;
    }
  });
  const defs =
    lg(`${k}w`, [[0, '#2c2a36'], [1, '#4a4650']]) + lg(`${k}f`, [[0, '#6a5a48'], [1, '#2a2018']]) +
    lg(`${k}cn`, [[0, '#fff6d8', 0.5], [1, '#fff6d8', 0]]) + rg(`${k}sp`, [[0, '#fff2c8', 0.6], [1, '#fff2c8', 0]]) + bl(`${k}b6`, 6) +
    `<g id="${k}st"><path d="M-30 -96h60v70h-60z" fill="#e8e2d2" stroke="#6a5232" stroke-width="3"/><path d="M-18 -84q14 26 6 46M2 -80q10 10 12 30" fill="none" stroke="#4a4640" stroke-width="2.400"/><path d="M-22 -26L-34 60M22 -26L34 60" stroke="#6a5232" stroke-width="4"/>` +
    `<path d="M-30 70Q-30 14 0 12Q30 14 30 70Z"/><circle cy="-4" r="19" fill="currentColor"/></g>`;
  const felix =
    `<g transform="translate(246 452)"><path d="M-84 160Q-80 78 -30 68H34Q84 78 88 160Z" fill="#4a6c96"/><path d="M-14 68L2 104L18 68Z" fill="#2a2a30"/><path d="M-30 68L-8 110L-14 160M34 68L10 110L16 160" stroke="#c9a060" stroke-width="2" stroke-dasharray="4 3" fill="none"/>` +
    `<circle cx="-44" cy="116" r="8" fill="#e8c93a"/><circle cx="-28" cy="138" r="6" fill="#d2202a"/><circle cx="50" cy="120" r="7" fill="#2a8a6a"/>` +
    // arm up, waving a stick of charcoal
    `<path d="M70 98Q120 60 112 -14" fill="none" stroke="#4a6c96" stroke-width="36" stroke-linecap="round"/><circle cx="112" cy="-30" r="17" fill="#ecc8a6"/><path d="M104 -24L140 -74" stroke="#141214" stroke-width="9" stroke-linecap="round"/><path d="M100 -22q8 8 20 2" stroke="#3a3a3a" stroke-width="5" fill="none" opacity=".6"/>` +
    `<path d="M154 -66q10 6 12 18M164 -84q16 8 20 28M90 -76q-10 6-12 16" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6"/>` +
    `<rect x="-14" y="40" width="30" height="34" fill="#c99a78"/><ellipse cx="2" cy="6" rx="42" ry="50" fill="#ecc8a6"/><path d="M6 -44Q20 6 2 56Q40 48 44 6Q44 -34 6 -44Z" fill="#ae8468" opacity=".5"/>` +
    `<path d="M-46 14C-52 -44 -22 -56 6 -54C36 -52 54 -34 46 12C42 -2 40 -8 34 -16L26 -2L20 -20L8 0L2 -20L-10 0L-14 -18L-26 2L-30 -10C-40 -2 -44 6 -46 14Z" fill="#6e4828"/><path d="M-34 -24Q-16 -46 12 -46M-8 -40l-4 14M16 -40l4 14" fill="none" stroke="#a8784a" stroke-width="3" stroke-linecap="round"/>` +
    `<g fill="none" stroke="#2a1c14" stroke-width="3.400" stroke-linecap="round"><path d="M-22 2q8-7 16 0M10 2q8-7 16 0"/><path d="M-24 -12q10-7 20-2M8 -14q10-5 20 2" stroke="#4a2e1a"/></g>` +
    `<path d="M-20 22Q2 50 28 20Q4 30 -20 22Z" fill="#fbf6ee" stroke="#7a3a34" stroke-width="2.600" stroke-linejoin="round"/>` +
    `<path d="M-36 14q8-6 16 2q-4 8-14 6z" fill="#1c1a1c" opacity=".8"/><path d="M-30 28l10 4" stroke="#1c1a1c" stroke-width="4" stroke-linecap="round" opacity=".6"/></g>`;
  const body =
    `<rect width="800" height="360" fill="url(#${k}w)"/><rect y="340" width="800" height="260" fill="url(#${k}f)"/>` +
    // night windows
    `<g fill="#0a0e1c" stroke="#5a5660" stroke-width="4"><rect x="20" y="120" width="70" height="150"/><rect x="104" y="120" width="70" height="150"/></g><g fill="#f2d68a"><circle cx="44" cy="170" r="1.500"/><circle cx="70" cy="210" r="1.500"/><circle cx="130" cy="150" r="1.500"/><circle cx="150" cy="230" r="1.500"/></g>` +
    // work lights
    `<path d="M0 22H800" stroke="#16141a" stroke-width="8"/><path d="M200 26L60 360H420Z" fill="url(#${k}cn)"/><path d="M520 26L330 360H700Z" fill="url(#${k}cn)"/>` +
    `<g fill="#16141a"><path d="M176 22h48l10 22h-68z"/><path d="M496 22h48l10 22h-68z"/></g><g fill="#fffbe6"><rect x="170" y="44" width="60" height="7"/><rect x="490" y="44" width="60" height="7"/></g>` +
    // banner
    `<path d="M120 62L120 54M580 62V54" stroke="#c8c4b8" stroke-width="2"/><path d="M110 62H590V112Q350 104 110 112Z" fill="#f4eedc"/><path d="M110 62H590V70H110Z" fill="#7a1c26"/>` +
    tx(350, 100, 26, 'HOLLIS 24-HOUR DRAWING MARATHON', '#1e1c1a', SANS, `${MID} ${BOLD} ${fit(450)}`) +
    // whiteboard
    `<rect x="606" y="126" width="180" height="150" fill="#8a8c90"/><rect x="612" y="132" width="168" height="138" fill="#f6f6f2"/>` +
    tx(696, 172, 33, 'HOUR 17', '#c8202a', SANS, `${MID} ${BOLD} ${fit(140)}`) +
    tx(696, 214, 33, '3:00 AM', '#1a2a7a', SANS, `${MID} ${BOLD} ${fit(134)}`) +
    tx(696, 254, 27, 'SAT OCT 31', '#1a2a7a', SANS, `${MID} ${BOLD} ${fit(146)}`) +
    `<path d="M632 182h128" stroke="#c8202a" stroke-width="3"/><rect x="640" y="276" width="40" height="7" fill="#3a3a3e"/>` +
    // draped model on the dais
    `<ellipse cx="370" cy="250" rx="120" ry="80" fill="url(#${k}sp)"/><path d="M290 300H450L466 330H274Z" fill="#8a7a64"/><rect x="274" y="330" width="192" height="16" fill="#5a4c3c"/>` +
    `<path d="M336 300Q326 240 350 206Q370 190 392 208Q416 244 408 300Z" fill="#f2efe6"/><path d="M350 214q-6 44 0 84M372 204q4 50-2 96M392 216q8 40 2 84" fill="none" stroke="#b8b4a8" stroke-width="2.400"/><circle cx="372" cy="182" r="17" fill="#d8ac88"/><path d="M356 180q2-20 18-18q16 2 14 20q-8-12-32-2Z" fill="#3a2418"/><path d="M394 220q26 10 34 40" fill="none" stroke="#d8ac88" stroke-width="10" stroke-linecap="round"/>` +
    crowd + felix +
    `<ellipse cx="400" cy="610" rx="460" ry="50" fill="#000" opacity=".4" filter="url(#${k}b6)"/>`;
  return frame(k, 800, 600, defs, body, 0.18, 0.5);
})();

A.c7_ph_felixcopy = (() => {
  const k = 'c7_ph_felixcopy';
  const P = '#1e1c1a';
  const defs =
    rg(`${k}w`, [[0, '#9a3a42'], [0.6, '#6e222a'], [1, '#3a1016']], 0.4, 0.3, 0.9) +
    lg(`${k}f`, [[0, '#b0844c'], [1, '#5e4022']]) + lg(`${k}go`, GOLD, 1, 1) +
    lg(`${k}dl`, [[0, '#fff6dc', 0.3], [1, '#fff6dc', 0]], 0.4, 1) + bl(`${k}b5`, 5) + bl(`${k}b12`, 12);
  const body =
    `<rect width="800" height="420" fill="url(#${k}w)"/>` +
    `<g fill="none" stroke="#000" stroke-opacity=".18" stroke-width="2"><rect x="40" y="30" width="420" height="340"/><rect x="496" y="30" width="330" height="340"/></g>` +
    `<path d="M120 0H380L560 420H180Z" fill="url(#${k}dl)"/><path d="M430 0H560L760 420H600Z" fill="url(#${k}dl)" opacity=".7"/>` +
    `<rect y="398" width="800" height="24" fill="#3a1a14"/><rect y="398" width="800" height="3" fill="#b07a54" opacity=".6"/>` +
    `<rect y="422" width="800" height="178" fill="url(#${k}f)"/>${parquet(380, 422, 600, 800)}<path d="M180 422H560L700 600H120Z" fill="#fff6dc" opacity=".13"/>` +
    // the clock and the Lorne
    `<rect x="94" y="166" width="78" height="104" fill="#000" opacity=".35" filter="url(#${k}b5)" transform="translate(6 8)"/>` + bracketClock(`${k}c`, 130, 212, 23, false) +
    `<rect x="236" y="62" width="232" height="298" fill="#000" opacity=".45" filter="url(#${k}b12)"/>` + gilt(`${k}go`, 252, 68, 180, 241, 24) + lorne(`${k}L`, 252, 68, 180) +
    `<rect x="470" y="300" width="30" height="22" fill="#e8dcc0"/><path d="M474 307h22M474 313h16" stroke="#5a4a3a" stroke-width="1.500"/>` +
    // Felix's easel: a smaller copy, lantern only blocked in
    `<ellipse cx="616" cy="566" rx="130" ry="20" fill="#000" opacity=".4" filter="url(#${k}b5)"/><path d="M500 548Q616 528 740 552L748 580Q616 600 492 578Z" fill="#d8d2c4"/><g><circle cx="540" cy="562" r="5" fill="#31474a"/><circle cx="690" cy="566" r="4" fill="#c2a05c"/><circle cx="600" cy="580" r="3" fill="#70787c"/></g>` +
    `<g stroke="#8a6a44" stroke-width="9" stroke-linecap="round"><path d="M616 110L548 566M616 110L686 566M616 126V540"/></g>` +
    `<rect x="546" y="170" width="146" height="194" fill="#000" opacity=".3"/>` + lorne(`${k}F`, 544, 166, 144, true) + `<rect x="544" y="166" width="144" height="193" fill="none" stroke="#e8dcc2" stroke-width="3"/>` +
    `<rect x="528" y="359" width="176" height="13" fill="#6e5232"/><rect x="560" y="351" width="40" height="8" rx="2" fill="#d8d2c4"/><path d="M640 356l44-6" stroke="#8a5a2a" stroke-width="4" stroke-linecap="round"/>` +
    // stool with brush jar
    `<path d="M716 470h60M724 470l-10 100M768 470l10 100" stroke="#5a4028" stroke-width="7" fill="none" stroke-linecap="round"/><rect x="732" y="430" width="28" height="40" fill="#9fc0cc" opacity=".8"/><path d="M738 432l-6-40M746 432v-46M754 432l8-38" stroke="#8a5a2a" stroke-width="3.400" stroke-linecap="round"/>` +
    // permit tag tied to the easel leg
    `<path d="M566 446Q520 440 470 470" fill="none" stroke="#e8e0c8" stroke-width="2.400"/>` +
    `<g transform="rotate(-5 330 510)"><path d="M206 452H452L474 474V546L452 568H206Z" fill="#000" opacity=".4" filter="url(#${k}b5)" transform="translate(6 8)"/><path d="M206 452H452L474 474V546L452 568H206Z" fill="#f4ecd0" stroke="#8a7a54" stroke-width="2"/>` +
    `<circle cx="454" cy="510" r="8" fill="#5e4022" stroke="#b8902e" stroke-width="3"/><rect x="206" y="452" width="14" height="116" fill="#7a1c26"/>` +
    tx(330, 484, 22, 'COPYIST PERMIT —', P, SANS, `${MID} ${BOLD} ${fit(200)}`) +
    tx(330, 516, 22, 'F. LUNN —', P, SANS, `${MID} ${BOLD} ${fit(112)}`) +
    tx(330, 550, 22, 'RULE 4: 10% SMALLER', '#7a1c26', SANS, `${MID} ${BOLD} ${fit(212)}`) + `</g>`;
  return frame(k, 800, 600, defs, body, 0.16, 0.4);
})();

A.c7_ph_case = (() => {
  const k = 'c7_ph_case';
  let foam = '';
  for (let j = 0; j < 3; j++) for (let i = 0; i < 17; i++) foam += `<circle cx="${236 + i * 20.5 + (j % 2) * 10}" cy="${246 + j * 18}" r="6"/>`;
  const defs =
    lg(`${k}sky`, [[0, '#2a2848'], [0.5, '#8a4a5a'], [0.85, '#f2a05a'], [1, '#f6c880']]) +
    lg(`${k}as`, [[0, '#3a3a40'], [1, '#141418']]) + lg(`${k}car`, [[0, '#a8acb2'], [0.5, '#7c8088'], [1, '#4a4e56']]) +
    lg(`${k}gl`, [[0, '#f6c880', 0.5], [1, '#2a2848', 0.6]]) + rg(`${k}tl`, [[0, '#ff6a50'], [1, '#8a1410']]) +
    lg(`${k}fm`, [[0, '#8a8e94'], [1, '#5a5e64']]) + bl(`${k}b6`, 6) + bl(`${k}b14`, 14);
  const body =
    `<rect width="800" height="420" fill="url(#${k}sky)"/>` +
    // warehouse + lamp
    `<path d="M0 150H330V420H0Z" fill="#23202c"/><path d="M0 150H330" stroke="#4a4458" stroke-width="4"/><g fill="#191622"><rect x="30" y="230" width="120" height="190"/><rect x="190" y="230" width="110" height="190"/></g><path d="M30 250h120M30 280h120M30 310h120M30 340h120M30 370h120M190 250h110M190 280h110M190 310h110M190 340h110M190 370h110" stroke="#2c2838" stroke-width="2"/>` +
    `<path d="M560 420V190h170V420Z" fill="#1e1c28"/><path d="M740 420V70M740 74h-40" stroke="#16141c" stroke-width="6" fill="none"/><circle cx="700" cy="80" r="40" fill="#ffe2a0" opacity=".3" filter="url(#${k}b14)"/><ellipse cx="700" cy="78" rx="12" ry="5" fill="#fff2c8"/>` +
    `<rect y="420" width="800" height="180" fill="url(#${k}as)"/><path d="M40 470L0 600M760 470L800 600" stroke="#c8c4b0" stroke-width="5" opacity=".35"/>` +
    `<ellipse cx="400" cy="560" rx="340" ry="28" fill="#000" opacity=".6" filter="url(#${k}b6)"/>` +
    // hatchback, tailgate up
    `<path d="M178 126L210 28Q214 14 232 14H568Q586 14 590 28L622 126Z" fill="url(#${k}car)"/><path d="M226 110L246 40Q248 32 258 32H542Q552 32 554 40L574 110Z" fill="url(#${k}gl)"/><path d="M178 126H622" stroke="#2a2c32" stroke-width="5"/>` +
    `<path d="M196 130L170 300M604 130L630 300" stroke="#1c1e22" stroke-width="7"/>` +
    `<rect x="216" y="466" width="70" height="92" rx="12" fill="#0c0c0e"/><rect x="514" y="466" width="70" height="92" rx="12" fill="#0c0c0e"/>` +
    `<path d="M150 300Q150 150 196 126H604Q650 150 650 300V470Q650 492 628 492H172Q150 492 150 470Z" fill="url(#${k}car)"/>` +
    `<path d="M192 140H608Q626 170 626 300V398H174V300Q174 170 192 140Z" fill="#0e0e12"/>` +
    `<path d="M152 300h24v70h-24zM624 300h24v70h-24z" fill="url(#${k}tl)"/><rect x="150" y="398" width="500" height="14" fill="#2a2c32"/>` +
    `<rect x="330" y="430" width="140" height="36" rx="3" fill="#e8e6da"/><path d="M344 448h112" stroke="#6a6a6e" stroke-width="8" stroke-dasharray="14 6"/>` +
    `<path d="M150 440H650" stroke="#fff" stroke-opacity=".18" stroke-width="2"/>` +
    // the transport case: lid up, foam showing, label on the lid
    `<rect x="214" y="150" width="372" height="154" rx="8" fill="#15161a"/><rect x="214" y="150" width="372" height="5" rx="2" fill="#fff" opacity=".18"/>` +
    `<rect x="226" y="232" width="348" height="62" fill="url(#${k}fm)"/><g fill="#3e4248">${foam}</g>` +
    `<rect x="244" y="160" width="312" height="66" fill="#f6f4ea"/><rect x="244" y="160" width="312" height="7" fill="#e86a1e"/>` +
    tx(400, 193, 25, 'ARTCRATE · 40 × 52 IN ·', '#141416', SANS, `${MID} ${BOLD} ${fit(280)}`) +
    tx(400, 219, 23, 'CLIMATE-SEALED', '#141416', SANS, `${MID} ${BOLD} ${fit(210)}`) +
    `<path d="M214 304H586L606 334H194Z" fill="url(#${k}fm)"/><path d="M226 310H574L588 330H212Z" fill="#3e4248"/><path d="M194 334H606V396H194Z" fill="#1c1d22"/><rect x="194" y="334" width="412" height="6" fill="#3a3c44"/>` +
    `<g fill="#aeb4b8"><rect x="260" y="348" width="34" height="24" rx="3"/><rect x="506" y="348" width="34" height="24" rx="3"/></g><rect x="366" y="352" width="68" height="14" rx="7" fill="none" stroke="#3a3c44" stroke-width="5"/>` +
    `<g fill="#4a4c54"><rect x="194" y="334" width="16" height="16"/><rect x="590" y="334" width="16" height="16"/><rect x="194" y="380" width="16" height="16"/><rect x="590" y="380" width="16" height="16"/></g>` +
    // dusk glow on the paintwork
    `<path d="M150 300Q150 150 196 126H240Q190 160 186 300V470H150Z" fill="#f2a05a" opacity=".16"/>`;
  return frame(k, 800, 600, defs, body, 0.2, 0.55);
})();
