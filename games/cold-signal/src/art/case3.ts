// COLD SIGNAL — Case 03 "The Long Quiet" illustrations.
// Every value in `case3Art` is a complete standalone SVG document string.
// Ids inside each SVG are prefixed with the art key. Original art, no external references.

/** Art registry for Case 03. Keys are the art ids referenced by src/cases/case3.ts. */
export const case3Art: Record<string, string> = {};
const A = case3Art;

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
const r0 = (v: number): number => Math.round(v);
const esc = (s: string): string => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
/** Text element. `ex` = extra attributes (weight, anchor, textLength…). */
const tx = (x: number, y: number, size: number, s: string, fill: string, font = SANS, ex = ''): string =>
  `<text x="${x}" y="${y}" ${font} font-size="${size}" fill="${fill}"${ex ? ' ' + ex : ''}>${esc(s)}</text>`;
/** Fixed-width text: guarantees the line fits whatever fallback font is used. */
const fit = (w: number): string => `textLength="${w}" lengthAdjust="spacingAndGlyphs"`;
const BOLD = 'font-weight="bold"';
const MID = 'text-anchor="middle"';

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

/** One pine silhouette (path data). x = centre, y = base, h = height, w = base width. */
const pine = (x: number, y: number, h: number, w: number): string =>
  `M${r0(x)} ${r0(y - h)}l${r0(w * 0.22)} ${r0(h * 0.3)}h${-r0(w * 0.08)}l${r0(w * 0.22)} ${r0(h * 0.3)}h${-r0(w * 0.08)}l${r0(w * 0.22)} ${r0(h * 0.4)}h${-r0(w)}l${r0(w * 0.22)} ${-r0(h * 0.4)}h${-r0(w * 0.08)}l${r0(w * 0.22)} ${-r0(h * 0.3)}h${-r0(w * 0.08)}z`;
/** A row of pines between x0..x1 with base line y (path data). */
const pines = (seed: number, x0: number, x1: number, y: number, hMin: number, hMax: number, n: number, dy = 0): string => {
  const R = rng(seed);
  let d = '';
  for (let i = 0; i < n; i++) {
    const h = hMin + R() * (hMax - hMin);
    d += pine(x0 + ((i + R() * 0.8) / n) * (x1 - x0), y + (R() - 0.5) * dy, h, h * (0.36 + R() * 0.12));
  }
  return d;
};
/** Yellow rose with a short stem. Origin = bloom centre. */
const rose = (x: number, y: number, s = 1, rot = 0): string =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 6q-3 22 3 44" stroke="#3c6a34" stroke-width="3" fill="none"/><path d="M0 26q12-10 18 0-10 6-18 0z" fill="#3c6a34"/><circle r="11" fill="#e9b21c"/><path d="M-9-4q9-12 18 0-2 12-10 12-9-1-8-12z" fill="#f7d348"/><path d="M-4-2q4-5 8 0-1 6-5 5-4-1-3-5zM-8 3q8 9 16-1" stroke="#b07e0c" stroke-width="1.6" fill="none"/></g>`;

/**
 * The Corwin pickup, seen square from the rear. Origin = ground centre; ~300 wide, ~265 tall at s=1.
 * Uses gradient `${k}tk` (body). `plate` text optional; `decal` adds the LAKERS bumper sticker.
 */
const truckRear = (k: string, x: number, y: number, s: number, plate = '', decal = false, lit = false): string =>
  `<g transform="translate(${x} ${y}) scale(${s})">` +
  `<rect x="-144" y="-54" width="44" height="54" rx="8" fill="#0b0d0e"/><rect x="100" y="-54" width="44" height="54" rx="8" fill="#0b0d0e"/>` +
  `<path d="M-116-170l14-88q2-10 12-10h180q10 0 12 10l14 88z" fill="#143325"/>` +
  `<rect x="-90" y="-250" width="180" height="62" rx="8" fill="#0a1216"/><path d="M-84-244h70l-30 50h-40z" fill="#9fc0c8" opacity=".12"/>` +
  `<rect x="-148" y="-176" width="296" height="104" rx="8" fill="url(#${k}tk)"/>` +
  `<rect x="-122" y="-164" width="244" height="78" rx="5" fill="none" stroke="#0c2218" stroke-width="3"/><rect x="-22" y="-160" width="44" height="9" rx="4" fill="#0c2218"/>` +
  `<path d="M-148-170h296" stroke="#5f9a78" stroke-width="2" opacity=".6"/>` +
  `<rect x="-148" y="-168" width="16" height="66" rx="3" fill="${lit ? '#ff3a2a' : '#8a1f1c'}"/><rect x="132" y="-168" width="16" height="66" rx="3" fill="${lit ? '#ff3a2a' : '#8a1f1c'}"/>` +
  `<rect x="-154" y="-76" width="308" height="28" rx="5" fill="#8d979c"/><rect x="-154" y="-76" width="308" height="7" rx="3" fill="#d5dde0" opacity=".7"/>` +
  (decal
    ? `<rect x="-140" y="-70" width="74" height="18" rx="2" fill="#f1ead2"/><text x="-103" y="-56" ${MID} ${SANS} ${BOLD} font-size="14" fill="#17603f" ${fit(64)}>LAKERS</text>`
    : '') +
  (plate
    ? `<rect x="-48" y="-112" width="96" height="42" rx="4" fill="#e9ecdf" stroke="#20303a" stroke-width="2"/><text x="0" y="-80" ${MID} ${SANS} ${BOLD} font-size="28" fill="#14283c" ${fit(84)}>${plate}</text>`
    : `<rect x="-26" y="-72" width="52" height="20" rx="2" fill="#dfe3d6"/>`) +
  `</g>`;

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

A.av_c3_mom = bust('av_c3_mom', {
  bg: ['#8fa0b4', '#414e62', '#0d1219'], rim: '#ffe6c2', cloth: '#5d6f8a',
  clothIn:
    `<path d="M85 146L100 182L115 146Z" fill="#efe9dc"/><path d="M78 147L86 143L101 190L98 200H80Z" fill="#6f829e"/><path d="M122 147L114 143L99 190L102 200H120Z" fill="#4a5a72"/>` +
    `<path d="M40 170q6 14 4 30M160 170q-6 14-4 30" stroke="#3f4d63" stroke-width="2" fill="none"/><circle cx="100" cy="194" r="2.500" fill="#d9d2c0"/>`,
  back: `<path d="M58 98C48 38 84 24 100 24C116 24 152 38 142 98C145 114 142 128 134 134H66C58 128 55 114 58 98Z" fill="#a9aeb6"/><path d="M110 26C150 36 148 80 142 98C145 114 142 128 134 134H118Z" fill="#000" opacity=".2"/>`,
  overNeck: `<path d="M87 148Q100 178 113 148" fill="none" stroke="#d9a93c" stroke-width="1.300"/><ellipse cx="100" cy="166" rx="4" ry="5" fill="#e3b548"/><path d="M98 164q2-2 4 0" stroke="#fff3c4" stroke-width="1" fill="none"/>`,
  skin: '#e6c1a6', shade: '#a97f6b', iris: '#5c6f7c', lid: 87.8, low: 93.6,
  brows: 'M77.500 81Q86 76.500 95 79.500M105 79.500Q114 76.500 122.500 81', browC: '#8d9096',
  mouth: `<path d="M90 115.500Q100 119.500 110 115.500" stroke="#9a5458" stroke-width="2.200"/>`,
  lines: `<path d="${WRINKLES}M81 97Q87 100.500 93 97.500M107 97.500Q113 100.500 119 97" stroke="#7d5647" stroke-width="1.200" opacity=".55"/>`,
  hair: `<path d="M64 90C58 50 82 37 100 37C118 37 142 50 136 90C133 72 126 60 112 55C98 66 76 66 64 90Z" fill="#c3c7cd"/><path d="M70 66Q78 48 96 43M112 55Q124 60 130 74" fill="none" stroke="#e6e8eb" stroke-width="2" stroke-linecap="round"/>`,
});

A.av_c3_marcus = bust('av_c3_marcus', {
  bg: ['#6a6fc0', '#2c2e66', '#0a0b1c'], rim: '#c8d0ff', cloth: '#2c313c',
  clothIn: `<path d="M84 146Q100 166 116 146L120 156Q100 176 80 156Z" fill="#3b4250"/><path d="M94 166v34M106 166v34" stroke="#c9ccd4" stroke-width="1.600"/>`,
  overNeck:
    `<path d="M70 150Q100 184 130 150" fill="none" stroke="#15171c" stroke-width="7" stroke-linecap="round"/>` +
    `<rect x="56" y="132" width="24" height="36" rx="10" fill="#1b1d24"/><rect x="59" y="136" width="9" height="28" rx="4" fill="#3a3e4a"/>` +
    `<rect x="120" y="132" width="24" height="36" rx="10" fill="#111318"/><rect x="132" y="136" width="9" height="28" rx="4" fill="#c8d0ff" opacity=".45"/>`,
  skin: '#b57a52', shade: '#7c4d34',
  inFace: `<path d="M66 96C70 118 84 112 100 111C116 112 130 118 134 96V134H66Z" fill="#2a1a12" opacity=".3"/>`,
  iris: '#2a1810', brows: 'M77.500 79.500Q86 76 95 79M105 79Q114 76 122.500 79.500', browC: '#1c1410',
  mouth: `<path d="M90 115Q100 119 110 114.500" stroke="#6e3530" stroke-width="2.300"/>`,
  hair:
    `<path d="M64 76C58 26 142 26 136 76Q100 60 64 76Z" fill="#b5532a"/><path d="M106 30C140 34 140 60 136 76Q120 68 106 66Z" fill="#000" opacity=".2"/>` +
    `<path d="M61 70Q100 52 139 70V86Q100 68 61 86Z" fill="#c9653a"/><path d="M70 68v12M80 64v12M90 62v12M100 61v12M110 62v12M120 64v12M130 68v12" stroke="#8f3f1e" stroke-width="1.500"/>`,
  top: `<g fill="#cfe0ff" fill-opacity=".12" stroke="#16130f" stroke-width="2.200"><circle cx="87" cy="91" r="10.500"/><circle cx="113" cy="91" r="10.500"/><path d="M97.500 90Q100 88 102.500 90M76.500 89L67 87M123.500 89L133 87" fill="none"/></g><path d="M108 85h8l-6 11h-4z" fill="#fff" opacity=".35"/>`,
});

A.av_c3_ray = bust('av_c3_ray', {
  bg: ['#b78a52', '#553c20', '#130c06'], rim: '#ffdca4', cloth: '#6b5c36',
  clothIn:
    `<path d="M85 146L100 174L115 146Z" fill="#b9463a"/><path d="M92 150l8 12 8-12M100 162v12" stroke="#7d241f" stroke-width="1.400" fill="none"/>` +
    `<path d="M74 146L87 142L101 180L88 188Z" fill="#4a3120"/><path d="M126 146L113 142L99 180L112 188Z" fill="#33210f"/>` +
    `<path d="M76 150l12 30M124 150l-12 30" stroke="#6b4a30" stroke-width="1"/><path d="M100 182v18" stroke="#3d3420" stroke-width="2"/><circle cx="106" cy="192" r="2.500" fill="#b99a54"/>`,
  skin: '#d9a47e', shade: '#98674c',
  inFace: `<path d="M66 80h8v22q-6-6-8-22zM126 80h8q-2 16-8 22z" fill="#e4e0d8"/>`,
  iris: '#4a5a66', lid: 87.4, low: 93.2,
  brows: 'M77.500 81.500Q86 77 95 80.500M105 80.500Q114 77 122.500 81.500', browC: '#e2ded6',
  mouth:
    `<path d="M89 116Q100 126 111 116" stroke="#8a4a48" stroke-width="2.200"/>` +
    `<path d="M84 113Q92 104 100 108.500Q108 104 116 113Q108 117 100 113.500Q92 117 84 113Z" fill="#f0eee8" stroke="#bdb8ae" stroke-width=".8"/>`,
  lines: `<path d="${WRINKLES}M76 86q-4 2-6 5M76 90q-4 3-5 6M124 86q4 2 6 5M84 68q16-4 32 0" stroke="#7d5040" stroke-width="1.200" opacity=".6"/>`,
  hair:
    `<path d="M65 70C60 26 140 26 135 70Q100 56 65 70Z" fill="#2f4d3a"/><path d="M82 66C82 40 118 40 118 66Q100 58 82 66Z" fill="#c9b182"/><path d="M106 30C138 34 138 56 135 70Q122 63 110 61Z" fill="#000" opacity=".22"/>` +
    `<path d="M58 72Q100 50 142 72Q150 80 140 82Q100 62 60 82Q50 80 58 72Z" fill="#243b2c"/><path d="M62 76Q100 56 138 76" stroke="#4d7358" stroke-width="1.500" fill="none"/>` +
    `<path d="M95 60q0-7 5-8 5 1 5 8zM98 54l-3-5m0 0l-3 1m3-1l0-3M102 54l3-5m0 0l3 1m-3-1l0-3" fill="#3a2a16" stroke="#3a2a16" stroke-width="1.300" stroke-linecap="round"/>`,
});

A.av_c3_travis = bust('av_c3_travis', {
  bg: ['#71888c', '#2a3b40', '#070d0f'], rim: '#cfeee0', cloth: '#1c6e4a',
  clothIn:
    `<path d="M80 146L100 170L120 146L128 152L100 184L72 152Z" fill="#eef2ea"/><path d="M76 149L100 178L124 149" fill="none" stroke="#124a32" stroke-width="2.500"/>` +
    `<path d="M100 178v22" stroke="#0e3f2a" stroke-width="2.500"/><path d="M30 176q10 10 8 24M170 176q-10 10-8 24" stroke="#0f4a31" stroke-width="2" fill="none"/>` +
    `<path d="M87 148L97 186M113 148L103 186" stroke="#e3b229" stroke-width="2.600" fill="none"/><rect x="92" y="184" width="17" height="10" rx="3" fill="#d6d9dc"/><rect x="106" y="186" width="8" height="6" rx="1" fill="#9aa0a6"/><circle cx="97" cy="186" r="2" fill="#565b61"/>`,
  skin: '#dcb090', shade: '#9a6f58',
  inFace: `<path d="M66 98C70 118 84 113 100 112C116 113 130 118 134 98V134H66Z" fill="#3a2a22" opacity=".16"/><path d="M79 95q8 6 16 1M105 96q8 5 16-1" stroke="#5a3a4a" stroke-width="3.500" opacity=".4" fill="none"/>`,
  iris: '#4d6a66', lid: 87, low: 94.6,
  brows: 'M77.500 82Q86 78.500 95 77M105 77Q114 78.500 122.500 82', browC: '#4a3626',
  mouth: `<path d="M91 117Q100 115 109 117.500" stroke="#874a44" stroke-width="2.200"/>`,
  lines: `<path d="M87 106Q84.500 111 86 116M113.500 106Q116 111 114.500 116M92 72q8-3 16 0" stroke="#7d5647" stroke-width="1.200" opacity=".5"/>`,
  hair: `<path d="M66 86C59 34 141 34 134 86C132 70 124 60 100 59C76 60 68 70 66 86Z" fill="#3d2c20" opacity=".9"/><path d="M72 62Q80 48 96 45" fill="none" stroke="#7a604c" stroke-width="1.600" stroke-linecap="round" opacity=".7"/>`,
});

A.av_c3_pruett = bust('av_c3_pruett', {
  bg: ['#857a70', '#3b332d', '#0e0b09'], rim: '#e6dccb', cloth: '#7a2a26',
  clothIn:
    `<g stroke="#1c1414" stroke-width="7" opacity=".55"><path d="M30 140v60M58 140v60M142 140v60M170 140v60M86 140v60M114 140v60"/><path d="M0 162h200M0 186h200"/></g>` +
    `<path d="M0 174h200M44 140v60M156 140v60" stroke="#d8b9a0" stroke-width="1" opacity=".4"/><path d="M100 152v48" stroke="#3a1412" stroke-width="2"/><circle cx="100" cy="170" r="2.200" fill="#e3d9c8"/><circle cx="100" cy="190" r="2.200" fill="#e3d9c8"/>`,
  overNeck: `<path d="M80 140L100 156L120 140L124 150L104 164H96L76 150Z" fill="#8f3430"/><path d="M80 140L100 156L96 164L76 150Z" fill="#a8423c"/><circle cx="100" cy="158" r="2.200" fill="#e3d9c8"/>`,
  skin: '#d2aa8e', shade: '#8c6652',
  inFace:
    `<path d="M66 94C70 120 84 112 100 111C116 112 130 120 134 94V134H66Z" fill="#8f8f8c" opacity=".5"/>` +
    `<path d="M70 96Q76 112 86 124Q74 118 68 100ZM130 96Q124 112 114 124Q126 118 132 100Z" fill="#4a3026" opacity=".42"/>`,
  iris: '#5a5f66', lid: 88.6, low: 93,
  brows: 'M77 79.500Q87 80 95.500 84M104.500 84Q113 80 123 79.500', browC: '#6f7074',
  mouth: `<path d="M90 117.500Q100 115 110 117.500" stroke="#6e423e" stroke-width="2.300"/><path d="M88 116.500l2 1.500M112 116.500l-2 1.500" stroke="#6e423e" stroke-width="1.400"/>`,
  lines: `<path d="${WRINKLES}M96 76v7M104 76v7M82 66q18-5 36 0M84 60q16-4 32 0" stroke="#6a4638" stroke-width="1.200" opacity=".6"/>`,
  hair: `<path d="M65 86C61 60 68 46 80 42C74 54 70 66 68 84ZM135 86C139 60 132 46 120 42C126 54 130 66 132 84Z" fill="#a4a5a6"/><path d="M82 42Q100 36 118 42Q100 40 82 42Z" fill="#a4a5a6" stroke="#a4a5a6" stroke-width="2"/>`,
});

A.av_c3_dee = bust('av_c3_dee', {
  bg: ['#c58f4e', '#5b3d24', '#140c07'], rim: '#ffe0b0', cloth: '#3f5f80',
  clothIn:
    `<path d="M85 146L100 172L115 146Z" fill="#e9e4d8"/><path d="M76 147L86 143L100 176L90 188Z" fill="#4f7396"/><path d="M124 147L114 143L100 176L110 188Z" fill="#2f4a66"/><path d="M100 176v24" stroke="#2a425c" stroke-width="2"/>` +
    `<rect x="113" y="176" width="48" height="16" rx="3" fill="#f3efe2" stroke="#b3322c" stroke-width="1.400"/><text x="137" y="188" ${MID} ${SANS} ${BOLD} font-size="9.500" fill="#b3322c" ${fit(40)}>HOLLINS</text>`,
  back: `<path d="M60 96C50 40 84 26 100 26C116 26 150 40 140 96C142 106 138 116 132 120H68C62 116 58 106 60 96Z" fill="#7a4a2c"/><path d="M110 28C148 38 146 80 140 96C142 106 138 116 132 120H118Z" fill="#000" opacity=".22"/>`,
  skin: '#e2b592', shade: '#a2755a', iris: '#4a3524',
  brows: 'M77.500 80Q86 76 95 79.500M105 79.500Q114 76 122.500 80', browC: '#5c3a22',
  mouth: `<path d="M89 114Q100 123 111 114" stroke="#9c4a48" stroke-width="2.400"/><path d="M87.500 112.500q1 1.500 2 2M112.500 112.500q-1 1.500-2 2" stroke="#9c4a48" stroke-width="1.400"/>`,
  lines: `<path d="M87 105Q83.500 111 86 118M113.500 105Q117 111 114.500 118M76 87q-3 2-5 5M124 87q3 2 5 5" stroke="#7d5647" stroke-width="1.200" opacity=".5"/>`,
  hair:
    `<path d="M64 88C58 48 82 36 100 36C118 36 142 48 136 88C132 68 124 56 108 52C98 62 78 64 64 88Z" fill="#8a5632"/>` +
    `<path d="M70 64Q78 48 96 43M74 74Q80 60 92 56" fill="none" stroke="#c9c2b6" stroke-width="2" stroke-linecap="round" opacity=".8"/>`,
  top:
    `<g fill="#cfe8ff" fill-opacity=".14" stroke="#b3322c" stroke-width="1.800"><rect x="76" y="86" width="21" height="13" rx="4"/><rect x="103" y="86" width="21" height="13" rx="4"/><path d="M97 91Q100 89 103 91" fill="none"/></g>` +
    `<path d="M76 90Q62 110 72 138Q78 150 86 152M124 90Q138 110 128 138Q122 150 114 152" fill="none" stroke="#e8c15a" stroke-width="1.300" stroke-dasharray="2.500 1.500"/><path d="M106 88h9l-6 9h-4z" fill="#fff" opacity=".4"/>`,
});

A.av_c3_sana = bust('av_c3_sana', {
  bg: ['#9a9cba', '#3d3f5e', '#0b0b17'], rim: '#eadcff', cloth: '#16171d',
  clothIn:
    `<path d="M84 146L100 186L116 146Z" fill="#ece8f0"/><path d="M72 148L86 142L101 192L96 200H76Z" fill="#23252e"/><path d="M128 148L114 142L99 192L104 200H124Z" fill="#0c0d11"/>` +
    `<path d="M74 152l20 44M126 152l-20 44" stroke="#3a3d4a" stroke-width="1.200" fill="none"/>`,
  back: `<path d="M56 100C46 36 84 22 100 22C118 22 154 36 144 100C148 130 150 150 140 166H60C50 150 52 130 56 100Z" fill="#5c1f4a"/><path d="M108 24C150 34 150 80 144 100C148 130 150 150 140 166H116Z" fill="#000" opacity=".25"/>`,
  overNeck: `<path d="M70 120Q100 176 130 120L136 160Q100 182 64 160Z" fill="#5c1f4a"/><path d="M74 132Q100 172 126 132M70 146Q100 180 130 146" fill="none" stroke="#8a3a72" stroke-width="1.800"/>`,
  skin: '#c99672', shade: '#8c5f46', iris: '#2a1810',
  brows: 'M77.500 79.500Q86 75.500 95 79.500M105 79.500Q114 75.500 122.500 79.500', browC: '#1c1614',
  mouth: `<path d="M90 114.500Q100 120 110 114" stroke="#8f3440" stroke-width="2.400"/><path d="M110 114q2-.5 3-2.500" stroke="#8f3440" stroke-width="1.400"/>`,
  hair:
    `<path d="M62 100C54 44 84 32 100 32C116 32 146 44 138 100C136 72 124 56 100 54C76 56 64 72 62 100Z" fill="#6e2a5a"/><path d="M68 72Q78 48 100 43" fill="none" stroke="#a8589a" stroke-width="2" stroke-linecap="round"/>`,
  top:
    `<g fill="#dfe8ff" fill-opacity=".22" stroke="#101014" stroke-width="2"><rect x="74" y="40" width="23" height="13" rx="4" transform="rotate(-6 85 46)"/><rect x="103" y="40" width="23" height="13" rx="4" transform="rotate(6 115 46)"/><path d="M97 45Q100 43 103 45M74 48L64 58M126 48L136 58" fill="none"/></g>` +
    `<path d="M78 43h8l-5 8h-4z" fill="#fff" opacity=".4"/>`,
});

// ════════════════════════════════════════════════════════════════ SCENES
/** Streaky grain (wood / water). fx,fy = base frequencies; rgb = streak colour. */
const streak = (id: string, fx: number, fy: number, rgb: string, k = -2.2, b = 1.3, seed = 3): string =>
  `<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${fx} ${fy}" numOctaves="3" seed="${seed}"/><feColorMatrix values="0 0 0 0 ${rgb.split(' ')[0]} 0 0 0 0 ${rgb.split(' ')[1]} 0 0 0 0 ${rgb.split(' ')[2]} ${k} 0 0 0 ${b}"/></filter>`;

/** A plank dock in one-point perspective. Near edge (xl..xr at yb) → far edge (fl..fr at yt). */
function dock(xl: number, xr: number, yb: number, fl: number, fr: number, yt: number, wood: string, line: string, post: string): string {
  let planks = '', posts = '';
  const n = 16;
  for (let i = 0; i <= n; i++) {
    const t = (i / n) ** 2, y = yt + (yb - yt) * t;
    const a = fl + (xl - fl) * t, b = fr + (xr - fr) * t;
    planks += `M${r0(a)} ${r0(y)}H${r0(b)}`;
    if (i % 3 === 1) {
      const h = 14 + 80 * t, w = 3 + 13 * t;
      posts += `<rect x="${r0(a - w)}" y="${r0(y - h)}" width="${r0(w)}" height="${r0(h * 1.5)}"/><rect x="${r0(b)}" y="${r0(y - h)}" width="${r0(w)}" height="${r0(h * 1.5)}"/>`;
    }
  }
  return `<path d="M${xl} ${yb}L${fl} ${yt}H${fr}L${xr} ${yb}z" fill="${wood}"/><path d="${planks}" stroke="${line}" stroke-width="2" fill="none"/><g fill="${post}">${posts}</g>`;
}

A.c3_ph_lake = (() => {
  const k = 'c3_ph_lake';
  const defs =
    lg(`${k}s`, [[0, '#9fadba'], [0.5, '#e4e3df'], [0.5, '#cbd2d6'], [1, '#62727f']]) +
    rg(`${k}sun`, [[0, '#ffe9cf', 0.9], [1, '#ffe9cf', 0]]) +
    lg(`${k}fog`, [[0, '#eef0f0', 0], [0.42, '#eef0f0', 0.95], [1, '#eef0f0', 0]]) +
    bl(`${k}b2`, 2) + bl(`${k}b6`, 6) + bl(`${k}b30`, 30);
  const body =
    `<rect width="800" height="600" fill="url(#${k}s)"/><circle cx="560" cy="270" r="230" fill="url(#${k}sun)"/>` +
    `<path d="${pines(11, -20, 820, 302, 26, 60, 46, 4)}" fill="#6d7d89" opacity=".4" filter="url(#${k}b6)"/>` +
    `<path d="M-20 300h300q-60-18-140-14t-160-6z${pines(5, -30, 250, 290, 60, 130, 9, 10)}" fill="#3f4d58" opacity=".6" filter="url(#${k}b2)"/>` +
    `<path d="M-20 302h300q-60 22-140 16t-160 30z" fill="#3f4d58" opacity=".22" filter="url(#${k}b6)"/>` +
    `<g stroke="#f4f5f3" stroke-width="2" opacity=".5" stroke-linecap="round"><path d="M40 380h120M560 360h150M620 420h130M70 470h90M600 520h160M30 560h140"/></g>` +
    dock(230, 570, 600, 388, 426, 322, '#5a4d42', '#2e2620', '#2e2620') +
    `<path d="M230 600L388 322h10L290 600z" fill="#fff" opacity=".1"/>` +
    `<rect y="150" width="800" height="330" fill="url(#${k}fog)"/>` +
    `<ellipse cx="180" cy="330" rx="300" ry="40" fill="#f2f3f2" opacity=".7" filter="url(#${k}b30)"/><ellipse cx="640" cy="300" rx="280" ry="46" fill="#f2f3f2" opacity=".6" filter="url(#${k}b30)"/>` +
    `<ellipse cx="400" cy="560" rx="500" ry="40" fill="#e8ecee" opacity=".25" filter="url(#${k}b30)"/>`;
  return frame(k, 800, 600, defs, body, 0.14, 0.4);
})();

A.c3_ph_route9 = (() => {
  const k = 'c3_ph_route9';
  const R = rng(9);
  let gravel = '';
  for (let i = 0; i < 46; i++) gravel += `<circle cx="${r0(560 + R() * 240)}" cy="${r0(430 + R() * 170)}" r="${1 + r0(R() * 2)}"/>`;
  const defs =
    lg(`${k}s`, [[0, '#272f4a'], [0.55, '#75607c'], [0.85, '#d88f5e'], [1, '#f1bd7c']]) +
    lg(`${k}w`, [[0, '#d99a70'], [0.4, '#6b6a86'], [1, '#262f44']]) +
    lg(`${k}rd`, [[0, '#4b4a58'], [1, '#1d2028']]) +
    lg(`${k}rl`, [[0, '#d9dde2'], [1, '#7c8590']]) +
    rg(`${k}g`, [[0, '#ffb060', 0.5], [1, '#ffb060', 0]]) +
    bl(`${k}b3`, 3) + bl(`${k}b14`, 14);
  const body =
    `<rect width="800" height="270" fill="url(#${k}s)"/><ellipse cx="250" cy="262" rx="330" ry="80" fill="url(#${k}g)"/>` +
    `<path d="M0 262h560v-8H0z${pines(3, -10, 560, 258, 16, 40, 24, 3)}" fill="#1d2334" filter="url(#${k}b3)" opacity=".9"/>` +
    `<rect y="262" width="800" height="240" fill="url(#${k}w)"/>` +
    `<g stroke="#ffd0a0" stroke-width="2" opacity=".35" stroke-linecap="round"><path d="M60 290h160M260 282h120M30 330h90M180 350h70M20 400h50"/></g>` +
    // inland hill + pines (right)
    `<path d="M470 300C560 250 660 190 800 150V420H520z" fill="#141a22"/><path d="${pines(21, 500, 830, 270, 90, 190, 9, 60)}" fill="#0d1218"/>` +
    // near bank + road
    `<path d="M0 600V470C120 400 280 330 470 300L680 290 800 420V600z" fill="#23281f"/>` +
    `<path d="M110 600C200 470 310 380 470 326C550 304 610 296 670 292L676 302C630 312 606 334 614 372C630 440 710 520 800 584V600z" fill="url(#${k}rd)"/>` +
    `<path d="M800 584C710 520 630 440 614 372L640 366C664 420 730 470 800 500z" fill="#55504a"/><g fill="#8a857c" opacity=".7">${gravel}</g>` +
    `<path d="M440 600C452 490 500 390 580 334C612 314 640 304 668 298" fill="none" stroke="#e0b53c" stroke-width="5" stroke-dasharray="0" opacity=".85"/>` +
    `<path d="M452 600C464 492 510 394 588 338C618 318 644 308 670 301" fill="none" stroke="#e0b53c" stroke-width="3" opacity=".7"/>` +
    `<path d="M150 600C236 478 336 392 480 340C556 314 612 304 668 296" fill="none" stroke="#d9dde2" stroke-width="3" opacity=".5"/>` +
    // guardrail (dented)
    `<g stroke="#191c20" stroke-width="7"><path d="M92 540v50M190 444v36M300 372v26M412 324v18M520 298v10"/></g>` +
    `<path d="M20 548C110 440 180 404 232 378L262 392 300 344C350 322 400 306 450 296C530 282 600 280 660 280V287C600 288 530 292 452 308C402 318 352 336 304 360L266 412 238 396C190 420 124 462 46 574z" fill="url(#${k}rl)"/>` +
    `<path d="M232 378L262 392 300 344 304 360 266 412 238 396z" fill="#3a3f48" opacity=".75"/><path d="M34 556C120 452 186 414 236 388L264 402" fill="none" stroke="#fff" stroke-width="2" opacity=".5"/>` +
    `<path d="M240 384l12 22M286 358l10 16" stroke="#7a3b22" stroke-width="2" opacity=".8"/>` +
    // field recorder on the shoulder
    `<ellipse cx="690" cy="552" rx="70" ry="12" fill="#000" opacity=".5" filter="url(#${k}b3)"/>` +
    `<rect x="664" y="470" width="50" height="82" rx="8" fill="#16181c" stroke="#3c4048" stroke-width="2"/><rect x="672" y="494" width="34" height="22" rx="2" fill="#f0a030"/><path d="M676 508h8v-6h4v6h4v-10h4v10h6" stroke="#5a3200" stroke-width="1.500" fill="none"/>` +
    `<circle cx="689" cy="532" r="7" fill="#c8281e"/><circle cx="689" cy="532" r="16" fill="#ff4030" opacity=".25" filter="url(#${k}b3)"/>` +
    `<ellipse cx="689" cy="446" rx="34" ry="32" fill="#77706a"/><ellipse cx="689" cy="446" rx="34" ry="32" fill="none" stroke="#8d867f" stroke-width="12" stroke-dasharray="2 3"/><ellipse cx="689" cy="446" rx="24" ry="22" fill="none" stroke="#5c5651" stroke-width="10" stroke-dasharray="2 4"/>` +
    `<ellipse cx="678" cy="434" rx="12" ry="9" fill="#fff" opacity=".12"/>` +
    `<rect width="800" height="600" fill="#2a2440" opacity=".18"/><ellipse cx="300" cy="300" rx="420" ry="40" fill="#e8b890" opacity=".3" filter="url(#${k}b14)"/>`;
  return frame(k, 800, 600, defs, body, 0.18, 0.55);
})();

A.cover_case3 = (() => {
  const k = 'cover_case3';
  const defs =
    lg(`${k}s`, [[0, '#050911'], [0.6, '#17232f'], [1, '#42525f']]) +
    lg(`${k}w`, [[0, '#56687a'], [1, '#0f1820']]) +
    lg(`${k}rd`, [[0, '#2c333c'], [1, '#0b0e12']]) +
    lg(`${k}rl`, [[0, '#aeb9c2'], [1, '#56616c']]) +
    lg(`${k}pl`, [[0, '#120d0a'], [0.45, '#4a392b'], [1, '#150f0b']], 1, 0) +
    lg(`${k}pp`, [[0, '#d9d3bc'], [1, '#a49d86']]) +
    rg(`${k}m`, [[0, '#cfdbe4', 0.75], [0.3, '#8ea2b2', 0.3], [1, '#8ea2b2', 0]]) +
    rg(`${k}c`, [[0, '#ffc766', 0.9], [1, '#ffc766', 0]]) +
    rg(`${k}rg`, [[0, '#ffd75a', 0.55], [1, '#ffd75a', 0]]) +
    streak(`${k}wd`, 0.5, 0.012, '.05 .03 .02', -2.4, 1.2) +
    bl(`${k}b2`, 2) + bl(`${k}b5`, 5) + bl(`${k}b24`, 24);
  const body =
    `<rect width="600" height="430" fill="url(#${k}s)"/><circle cx="150" cy="150" r="230" fill="url(#${k}m)"/>` +
    `<path d="M0 418h320v-6H0z${pines(4, -10, 320, 414, 14, 34, 22, 3)}" fill="#1f2c38" filter="url(#${k}b2)"/>` +
    `<rect y="416" width="600" height="200" fill="url(#${k}w)"/><path d="M110 430h90M90 452h130M120 478h70M100 510h100" stroke="#cfdbe4" stroke-width="3" opacity=".25" stroke-linecap="round" filter="url(#${k}b2)"/>` +
    // hill with pines + one lit window
    `<path d="M250 440C360 360 470 250 600 170V480H250z" fill="#0a1218"/>` +
    `<path d="${pines(8, 300, 640, 330, 70, 150, 12, 150)}" fill="#0c151b"/><path d="${pines(13, 260, 620, 420, 60, 120, 11, 50)}" fill="#070d12"/>` +
    `<circle cx="378" cy="322" r="34" fill="url(#${k}c)"/><path d="M364 328l14-13 14 13v12h-28z" fill="#05090c"/><rect x="374" y="327" width="8" height="7" fill="#ffd27a"/>` +
    `<ellipse cx="200" cy="424" rx="330" ry="26" fill="#9db0be" opacity=".5" filter="url(#${k}b24)"/>` +
    // shore + road
    `<path d="M0 800V600C90 540 190 470 300 440L420 430 600 560V800z" fill="#0d1410"/>` +
    `<path d="M150 800C200 650 250 520 318 446L340 436 352 440C340 520 420 680 520 800z" fill="url(#${k}rd)"/>` +
    `<path d="M330 800C310 650 320 520 340 444" fill="none" stroke="#c9a23a" stroke-width="5" stroke-dasharray="46 30" opacity=".7"/>` +
    `<path d="M186 800C232 650 276 526 328 448" fill="none" stroke="#aeb9c2" stroke-width="3" opacity=".4"/>` +
    // guardrail, dented, with the rose
    `<g stroke="#0a0c0e" stroke-width="8"><path d="M60 742v58M150 628v50M228 536v30M286 470v16"/></g>` +
    `<path d="M0 760C60 690 100 648 130 620L162 640 186 566C230 512 270 470 310 440L316 446C280 478 244 522 204 580L172 672 138 646C110 676 60 734 0 800z" fill="url(#${k}rl)"/>` +
    `<path d="M130 620L162 640 186 566 204 580 172 672 138 646z" fill="#252b32" opacity=".8"/><path d="M0 768C60 698 104 654 134 628" fill="none" stroke="#e6edf2" stroke-width="2" opacity=".5"/>` +
    `<circle cx="170" cy="610" r="60" fill="url(#${k}rg)"/><path d="M160 640q12 8 22-6" stroke="#d9d3bc" stroke-width="3" fill="none"/>` + rose(168, 606, 1.7, -24) +
    // telephone pole + faded poster
    `<rect x="436" y="-10" width="112" height="820" fill="url(#${k}pl)"/><rect x="436" y="-10" width="112" height="820" filter="url(#${k}wd)" opacity=".55"/>` +
    `<g transform="rotate(-3 492 560)"><path d="M418 462h150l4 196-74 6-82-4z" fill="#000" opacity=".5" filter="url(#${k}b5)"/><path d="M416 456h150l4 196-76 6-80-4z" fill="url(#${k}pp)"/>` +
    tx(491, 494, 30, 'MISSING', '#8d3a30', SANS, `${BOLD} ${MID} ${fit(126)} opacity=".85"`) +
    `<rect x="440" y="506" width="102" height="96" fill="#c2c0b0"/><path d="M462 602q4-36 29-36t29 36z" fill="#aeb0a2"/><ellipse cx="491" cy="548" rx="17" ry="20" fill="#b6b6a8"/>` +
    `<g stroke="#77705e" stroke-width="4" opacity=".55"><path d="M440 618h102M450 632h82M446 646h60"/></g>` +
    `<path d="M430 456v200M556 470v170" stroke="#6f6a58" stroke-width="5" opacity=".2" filter="url(#${k}b2)"/>` +
    `<g stroke="#8d949a" stroke-width="2.500"><path d="M424 464h10M548 462h10M422 644h10M552 642h10"/></g></g>` +
    `<rect width="600" height="800" fill="#0a1420" opacity=".2"/><ellipse cx="300" cy="470" rx="400" ry="30" fill="#8ea2b2" opacity=".22" filter="url(#${k}b24)"/>`;
  return frame(k, 600, 800, defs, body, 0.2, 0.6);
})();

A.wall_c3_home = (() => {
  const k = 'wall_c3_home';
  const defs =
    lg(`${k}s`, [[0, '#131c26'], [0.5, '#62727f'], [0.5, '#56666f'], [1, '#0b1117']]) +
    lg(`${k}fog`, [[0, '#a9b6bf', 0], [0.5, '#a9b6bf', 0.85], [1, '#a9b6bf', 0]]) +
    rg(`${k}gl`, [[0, '#dfe8ee', 0.55], [1, '#dfe8ee', 0]]) +
    lg(`${k}m`, [[0, '#c9d2d8'], [0.5, '#6f7b85'], [1, '#2a3238']], 1, 0) +
    bl(`${k}b3`, 3) + bl(`${k}b8`, 8) + bl(`${k}b40`, 40);
  const body =
    `<rect width="600" height="1300" fill="url(#${k}s)"/><circle cx="300" cy="560" r="330" fill="url(#${k}gl)"/>` +
    `<path d="${pines(6, -20, 620, 652, 30, 80, 30, 4)}" fill="#33424e" opacity=".5" filter="url(#${k}b8)"/>` +
    `<path d="M-20 650h200q-40-16-100-12t-100-8z${pines(17, -30, 160, 640, 90, 190, 6, 10)}" fill="#18232c" opacity=".6" filter="url(#${k}b3)"/>` +
    `<path d="M620 650H470q30-12 80-10t70-6z${pines(19, 480, 640, 642, 80, 160, 5, 8)}" fill="#18232c" opacity=".45" filter="url(#${k}b3)"/>` +
    `<g stroke="#c9d4da" stroke-width="2" opacity=".25" stroke-linecap="round"><path d="M40 760h110M450 800h120M30 900h80M480 980h100M50 1100h90"/></g>` +
    dock(110, 490, 1300, 262, 338, 700, '#3b3531', '#1b1715', '#15110f') +
    `<path d="M110 1300L262 700h12L190 1300z" fill="#fff" opacity=".07"/>` +
    // microphone on a stand at the end of the dock
    `<ellipse cx="300" cy="712" rx="54" ry="7" fill="#000" opacity=".5" filter="url(#${k}b3)"/>` +
    `<path d="M300 560V704M300 690l-36 22M300 690l36 22M300 696v18" stroke="#0e1114" stroke-width="5" stroke-linecap="round" fill="none"/>` +
    `<path d="M284 548q0 14 16 14t16-14" stroke="#0e1114" stroke-width="5" fill="none"/>` +
    `<rect x="283" y="470" width="34" height="84" rx="17" fill="url(#${k}m)"/><rect x="283" y="470" width="34" height="46" rx="17" fill="#1c2228"/>` +
    `<path d="M288 482h24M286 492h28M286 502h28M290 512h20" stroke="#8e9aa3" stroke-width="2"/><rect x="283" y="516" width="34" height="5" fill="#d9e2e8"/><path d="M290 474q-4 8-4 22" stroke="#fff" stroke-width="2" opacity=".5" fill="none"/>` +
    `<rect y="430" width="600" height="460" fill="url(#${k}fog)"/>` +
    `<ellipse cx="120" cy="690" rx="260" ry="44" fill="#c3ced6" opacity=".6" filter="url(#${k}b40)"/><ellipse cx="500" cy="650" rx="240" ry="40" fill="#c3ced6" opacity=".5" filter="url(#${k}b40)"/>` +
    `<path d="M300 560V704M300 690l-36 22M300 690l36 22" stroke="#0e1114" stroke-width="5" stroke-linecap="round" fill="none" opacity=".75"/>` +
    `<rect x="283" y="470" width="34" height="84" rx="17" fill="url(#${k}m)" opacity=".8"/><rect x="283" y="470" width="34" height="46" rx="17" fill="#1c2228" opacity=".85"/><path d="M288 482h24M286 492h28M286 502h28M290 512h20" stroke="#8e9aa3" stroke-width="2"/>` +
    tx(300, 1216, 22, 'THE LONG QUIET', '#e6edf1', SANS, `${BOLD} ${MID} letter-spacing="12" opacity=".8"`);
  return frame(k, 600, 1300, defs, body, 0.14, 0.6);
})();

A.wall_c3_lock = (() => {
  const k = 'wall_c3_lock';
  const R = rng(22);
  let holes = '', stains = '', tabs = '';
  for (let i = 0; i < 26; i++) {
    const x = r0(80 + R() * 440), y = r0(R() * 1300);
    holes += R() > 0.5 ? `<circle cx="${x}" cy="${y}" r="2"/>` : `<path d="M${x} ${y}h9" stroke="#8b8478" stroke-width="2"/>`;
  }
  for (let i = 0; i < 9; i++) stains += `<rect x="${r0(110 + R() * 370)}" y="${r0(130 + R() * 300)}" width="${r0(6 + R() * 14)}" height="${r0(300 + R() * 600)}"/>`;
  for (let i = 0; i < 8; i++) tabs += i === 2 || i === 5 ? '' : `<path d="M${105 + i * 49} 985v112" stroke="#8a836c" stroke-width="2" stroke-dasharray="7 5"/><path d="M${118 + i * 49} 1000v80M${132 + i * 49} 1000v80" stroke="#3a372f" stroke-width="5" stroke-dasharray="3 5 9 4 5 6" opacity=".55"/>`;
  const ink = '#1d1b18';
  const defs =
    lg(`${k}s`, [[0, '#56677a'], [1, '#1a242c']]) +
    lg(`${k}pl`, [[0, '#1c140f'], [0.2, '#5d4937'], [0.6, '#6f5a45'], [1, '#1f1711']], 1, 0) +
    lg(`${k}pp`, [[0, '#ece5cf'], [1, '#cdc4a6']]) +
    lg(`${k}ph`, [[0, '#c9d2c6'], [1, '#93a297']]) +
    lg(`${k}jk`, [[0, '#3f7a5a'], [1, '#234a36']]) +
    rg(`${k}lt`, [[0, '#000', 0], [0.45, '#04080c', 0.12], [1, '#04080c', 0.72]], 0.5, 0.5, 0.72) +
    streak(`${k}wd`, 0.45, 0.008, '.06 .04 .02', -2.3, 1.25) +
    bl(`${k}b2`, 2) + bl(`${k}b8`, 8) +
    `<clipPath id="${k}pc"><rect x="150" y="262" width="300" height="310"/></clipPath>`;
  const poster =
    `<g transform="rotate(-1.2 300 610)">` +
    `<path d="M104 140h410l-4 962-200 6-204-8z" fill="#000" opacity=".5" filter="url(#${k}b8)"/>` +
    `<path d="M96 132h408l2 964-28 6-22-8-30 6h-64l-22-8-28 8-216-6z" fill="url(#${k}pp)"/>` +
    tx(300, 236, 96, 'MISSING', '#a3231c', SANS, `${BOLD} ${MID} ${fit(364)}`) +
    // photo: smiling teen in a letterman jacket, #22
    `<rect x="150" y="262" width="300" height="310" fill="url(#${k}ph)"/><g clip-path="url(#${k}pc)">` +
    `<path d="M150 262h300v120q-150 40-300 0z" fill="#dfe4d6" opacity=".5"/>` +
    `<path d="M168 572c4-64 40-96 92-104h80c52 8 88 40 92 104z" fill="url(#${k}jk)"/>` +
    `<path d="M168 572c4-64 40-96 60-100l-14 100zM432 572c-4-64-40-96-60-100l14 100z" fill="#e6dfc6"/>` +
    `<path d="M258 466l42 62 42-62 14 8-56 84-56-84z" fill="#e6dfc6"/><path d="M252 472l48 72 48-72" fill="none" stroke="#234a36" stroke-width="3"/>` +
    `<path d="M300 548v24" stroke="#17301f" stroke-width="3"/><circle cx="306" cy="562" r="3" fill="#e6dfc6"/>` +
    `<path d="M272 424h56v46q-28 26-56 0z" fill="#b98f72"/>` +
    `<ellipse cx="300" cy="376" rx="54" ry="64" fill="#dcb294"/><ellipse cx="245" cy="382" rx="7" ry="13" fill="#c99e80"/><ellipse cx="355" cy="382" rx="7" ry="13" fill="#c99e80"/>` +
    `<path d="M244 372c-10-70 36-82 58-82 30 0 62 18 54 82-6-30-18-44-34-50-22 14-60 10-78 50z" fill="#4f3524"/>` +
    `<path d="M266 372q11-9 22 0M312 372q11-9 22 0" stroke="#2a1c14" stroke-width="4" fill="none" stroke-linecap="round"/>` +
    `<path d="M274 402q26 30 52 0-26 8-52 0z" fill="#fbf7ee" stroke="#6b3a30" stroke-width="2.500"/><path d="M300 380v12q-5 3-8 0" stroke="#a87a60" stroke-width="2.500" fill="none"/>` +
    `<text x="378" y="552" ${MID} ${SANS} ${BOLD} font-size="46" fill="#f3ecd2" stroke="#16301f" stroke-width="1.500">22</text>` +
    `<rect x="150" y="262" width="300" height="310" fill="#c8c2a6" opacity=".22"/></g>` +
    `<rect x="150" y="262" width="300" height="310" fill="none" stroke="${ink}" stroke-width="3"/>` +
    tx(300, 632, 50, 'ELI CALLOWAY', ink, SANS, `${BOLD} ${MID} ${fit(356)}`) +
    tx(300, 678, 28, 'AGE 17 · BORN 03/03/89', ink, SANS, `${BOLD} ${MID} ${fit(340)}`) +
    `<path d="M130 696h340" stroke="${ink}" stroke-width="2"/>` +
    tx(300, 730, 25, 'Last seen walking home on', ink, SANS, `${MID} ${fit(318)}`) +
    tx(300, 762, 25, 'Route 9 after the Pinecrest', ink, SANS, `${MID} ${fit(324)}`) +
    tx(300, 794, 25, 'Homecoming dance, 2006', ink, SANS, `${BOLD} ${MID} ${fit(310)}`) +
    tx(300, 846, 23, `5'11", brown hair, green`, ink, SANS, `${MID} ${fit(270)}`) +
    tx(300, 876, 23, 'Lakers letterman jacket #22', ink, SANS, `${MID} ${fit(312)}`) +
    `<path d="M130 900h340" stroke="${ink}" stroke-width="2"/>` +
    tx(300, 948, 30, 'CALL PINECREST SHERIFF', '#a3231c', SANS, `${BOLD} ${MID} ${fit(364)}`) +
    tabs +
    `<g fill="#6b5f42" opacity=".13" filter="url(#${k}b8)">${stains}</g>` +
    `<path d="M96 132h60l-60 50z" fill="#b8ae90"/><path d="M96 182l60-50-14 44z" fill="#8f866c" opacity=".7"/>` +
    `<g stroke="#9aa0a4" stroke-width="3" stroke-linecap="round"><path d="M176 146h16M408 144h16M110 600h1v14M494 590v14M130 1070h16M440 1074h16M290 142h14"/></g>` +
    `</g>`;
  const body =
    `<rect width="600" height="1300" fill="url(#${k}s)"/>` +
    `<path d="${pines(2, -40, 110, 900, 300, 520, 3, 200)}${pines(7, 500, 650, 860, 280, 500, 3, 200)}" fill="#0e161c" opacity=".7" filter="url(#${k}b8)"/>` +
    `<rect x="62" width="476" height="1300" fill="url(#${k}pl)"/><rect x="62" width="476" height="1300" filter="url(#${k}wd)" opacity=".6"/>` +
    `<g fill="#120c08">${holes}</g><path d="M420 30l60 8-6 60-40-12zM90 1180l70 6 4 50-60 4z" fill="#b9b19a" opacity=".5"/>` +
    poster +
    `<rect width="600" height="1300" fill="url(#${k}lt)"/>`;
  return frame(k, 600, 1300, defs, body, 0.16, 0.35);
})();

/** Cartographic lettering on the map (kept apart so it is easy to drop). */
const MAP_LABELS =
  tx(380, 118, 15, 'SAWMILL LAKE', '#9cc6d0', SERIF, `${MID} letter-spacing="7" font-style="italic" opacity=".7"`) +
  `<g transform="rotate(-62 668 196)">` + tx(668, 192, 10, 'TAMARACK RD', '#b9c9a8', SANS, `${MID} letter-spacing="2" opacity=".75"`) + `</g>` +
  `<rect x="700" y="296" width="92" height="20" rx="3" fill="#1f5a3c" stroke="#dfe8dc" stroke-width="1.200"/>` + tx(746, 310, 11, '→ ASHBY 70 mi', '#eef3ea', SANS, `${BOLD} ${MID} ${fit(80)}`) +
  `<path d="M88 246h22v14q0 10-11 14-11-4-11-14z" fill="#e9edf0" stroke="#10181c" stroke-width="1.500"/>` + tx(99, 265, 15, '9', '#10181c', SANS, `${BOLD} ${MID}`);

A.map_c3 = (() => {
  const k = 'map_c3';
  const R = rng(31);
  let trees = '', streets = '';
  const inForest = (x: number, y: number): boolean => x + y * 0.25 > 640 || (y < 34 && x > 120) || (x < 120 && y < 200);
  for (let i = 0; i < 900 && trees.length < 3600; i++) {
    const x = r0(R() * 800), y = r0(R() * 300);
    if (!inForest(x, y) || Math.hypot(x - 688, y - 72) < 22) continue;
    trees += `M${x} ${y}l4 10h-8z`;
  }
  for (let i = 0; i < 6; i++) streets += `M118 ${308 + i * 42}h330M${130 + i * 62} 296v232`;
  const defs =
    lg(`${k}bg`, [[0, '#1d2b30'], [1, '#141d22']]) +
    rg(`${k}lk`, [[0, '#3a6d80'], [1, '#1f4252']], 0.45, 0.4, 0.7) +
    rg(`${k}tw`, [[0, '#e2b56a', 0.22], [1, '#e2b56a', 0]]) +
    rg(`${k}fr`, [[0, '#2c5240', 0.9], [1, '#2c5240', 0]]) +
    bl(`${k}b6`, 6) + bl(`${k}b2`, 2);
  const lake = 'M150 120C170 40 330 20 450 40C560 56 640 110 630 200C622 262 560 300 500 296C450 292 430 240 380 222C320 200 230 230 180 200C150 180 142 150 150 120Z';
  const r9 = 'M0 268C120 262 220 236 330 238C400 240 440 262 470 296C486 314 506 322 530 312C580 290 640 300 700 320C740 334 770 340 800 338';
  const body =
    `<rect width="800" height="600" fill="url(#${k}bg)"/>` +
    `<ellipse cx="720" cy="120" rx="230" ry="230" fill="url(#${k}fr)"/><ellipse cx="60" cy="80" rx="150" ry="170" fill="url(#${k}fr)" opacity=".7"/><ellipse cx="400" cy="0" rx="420" ry="50" fill="url(#${k}fr)" opacity=".7"/>` +
    `<g fill="none" stroke="#3a4d50" stroke-width="1" opacity=".5"><path d="M560 600q40-90 150-110M600 600q30-60 110-80M0 420q60 20 90 90t-10 90M0 470q30 16 46 60"/></g>` +
    `<path d="${trees}" fill="#3f7256" opacity=".8"/>` +
    // lake
    `<path d="${lake}" fill="#7fb4c0" opacity=".25" filter="url(#${k}b6)"/><path d="${lake}" fill="url(#${k}lk)" stroke="#8cc0cc" stroke-width="1.500"/>` +
    `<g stroke="#6aa3b2" stroke-width="1.200" opacity=".5" fill="none" stroke-linecap="round"><path d="M230 90q10-6 20 0t20 0M500 110q10-6 20 0t20 0M300 170q10-6 20 0t20 0M540 210q10-6 20 0t20 0M440 70q10-6 20 0t20 0"/></g>` +
    `<path d="M190 130C210 70 330 50 440 66C530 80 596 124 590 196" fill="none" stroke="#5a93a3" stroke-width="1" opacity=".5"/>` +
    // town grid
    `<circle cx="280" cy="410" r="210" fill="url(#${k}tw)"/>` +
    `<g transform="rotate(-5 280 410)"><path d="${streets}" stroke="#55686e" stroke-width="2.500" fill="none"/>` +
    `<g fill="#34464c"><rect x="198" y="356" width="24" height="14"/><rect x="266" y="318" width="18" height="22"/><rect x="330" y="360" width="30" height="12"/><rect x="392" y="402" width="16" height="26"/><rect x="262" y="446" width="26" height="14"/><rect x="330" y="486" width="20" height="16"/><rect x="204" y="402" width="16" height="12"/><rect x="392" y="318" width="22" height="14"/></g></g>` +
    // roads
    `<path d="M240 300V246M330 524C350 560 420 580 520 574C600 570 660 540 696 520" fill="none" stroke="#55686e" stroke-width="2.500"/>` +
    `<path d="M640 302C650 250 706 236 690 180C680 140 722 122 698 88" fill="none" stroke="#a89a78" stroke-width="2" stroke-dasharray="5 4"/>` +
    `<path d="${r9}" fill="none" stroke="#0e1518" stroke-width="9"/><path d="${r9}" fill="none" stroke="#d6c493" stroke-width="4.500"/>` +
    // camp clearing
    `<circle cx="688" cy="72" r="19" fill="#4f6a4a"/><rect x="678" y="64" width="12" height="9" fill="#8a6a44"/><rect x="694" y="72" width="7" height="6" fill="#6f5436"/>` +
    // marina
    `<g stroke="#d9cdb0" stroke-width="3" fill="none"><path d="M340 222h60M352 222v-22M368 222v-28M384 222v-22"/></g><path d="M356 206l5-3v6zM372 200l5-3v6zM388 208l5-3v6zM362 214l5-3v6z" fill="#eef3f5"/>` +
    // Sawmill curve guardrail ticks
    `<path d="M468 284C482 304 500 312 524 304" fill="none" stroke="#eef3f5" stroke-width="2" stroke-dasharray="2 4"/>` +
    // home, school + field, post office
    `<rect x="230" y="340" width="20" height="16" fill="#d9b06a" stroke="#10181c" stroke-width="1.200"/>` +
    `<g transform="rotate(-5 160 456)"><rect x="122" y="440" width="76" height="38" rx="14" fill="#8a4a36"/><rect x="130" y="446" width="60" height="26" rx="3" fill="#3f7a4c" stroke="#e6efe2" stroke-width="1.200"/><path d="M142 446v26M154 446v26M166 446v26M178 446v26" stroke="#e6efe2" stroke-width=".8"/><rect x="128" y="414" width="44" height="20" fill="#5d6f78" stroke="#10181c"/></g>` +
    `<rect x="294" y="414" width="22" height="16" fill="#8f9aa0" stroke="#10181c" stroke-width="1.200"/><path d="M320 432v-28" stroke="#dfe6ea" stroke-width="1.500"/><path d="M320 404h13v8h-13z" fill="#c9372c"/>` +
    // Ashby inset
    `<path d="M772 344L756 372" stroke="#d6c493" stroke-width="3" stroke-dasharray="3 3"/>` +
    `<rect x="696" y="372" width="98" height="184" rx="6" fill="#111a1e" stroke="#8c9aa0" stroke-width="1.500" stroke-dasharray="6 4"/>` +
    `<path d="M708 400h76M708 440h76M708 480h76M708 524h76M722 384v160M752 384v160M778 384v160" stroke="#3f5057" stroke-width="2"/><path d="M752 372v184" stroke="#d6c493" stroke-width="3"/>` +
    `<rect x="757" y="400" width="20" height="14" fill="#b9684a" stroke="#10181c"/><rect x="727" y="508" width="20" height="16" fill="#c9c2ae" stroke="#10181c"/><path d="M729 508l8-7 8 7" fill="#c9c2ae" stroke="#10181c"/>` +
    MAP_LABELS +
    `<g transform="translate(60 540)" opacity=".7"><circle r="24" fill="none" stroke="#5a7a80" stroke-width="1"/><path d="M0-30l7 30-7 30-7-30z" fill="#16262c" stroke="#8cc0cc" stroke-width="1"/><path d="M0-30l7 30h-14z" fill="#8cc0cc"/><path d="M-30 0h60" stroke="#5a7a80" stroke-width="1"/></g>` +
    `<g transform="translate(110 574)" stroke="#8cc0cc" stroke-width="1.500" opacity=".6"><path d="M0 0h80M0-4v8M40-3v6M80-4v8"/></g>`;
  return frame(k, 800, 600, defs, body, 0.1, 0.45);
})();

A.c3_ph_homecoming = (() => {
  const k = 'c3_ph_homecoming';
  const R = rng(5);
  let leaves = '', crowd = '';
  const fall = ['#c9682a', '#d99a2e', '#a8442a', '#8a7a34', '#e0b040'];
  for (let i = 0; i < 26; i++) leaves += `<circle cx="${r0(20 + R() * 560)}" cy="${r0(268 + R() * 50)}" r="${r0(22 + R() * 26)}" fill="${fall[i % 5]}"/>`;
  for (let i = 0; i < 40; i++) crowd += `<circle cx="${r0(40 + R() * 150)}" cy="${r0(318 + R() * 50)}" r="5" fill="${['#2f7a52', '#e8e2d0', '#b9483a', '#3a4a6a'][i % 4]}"/>`;
  const defs =
    lg(`${k}s`, [[0, '#9fc3d6'], [1, '#f3e6c4']]) +
    lg(`${k}f`, [[0, '#9db85a'], [1, '#55803a']]) +
    lg(`${k}j`, [[0, '#2b8a5a'], [1, '#17603f']]) +
    rg(`${k}d`, [[0, '#f3cf82'], [0.6, '#d9a04a'], [1, '#a8702a']], 0.4, 0.3, 0.8) +
    lg(`${k}fd`, [[0, '#fff2c8', 0.5], [1, '#f0a070', 0.12]]) +
    bl(`${k}b2`, 2) + bl(`${k}b5`, 5) +
    `<clipPath id="${k}c"><rect x="32" y="32" width="536" height="690"/></clipPath>`;
  const body =
    `<rect width="600" height="800" fill="#f3eee0"/><rect x="28" y="28" width="544" height="698" fill="#d8d2c0"/>` +
    `<g clip-path="url(#${k}c)"><rect x="32" y="32" width="536" height="320" fill="url(#${k}s)"/>` +
    `<g filter="url(#${k}b5)">${leaves}</g>` +
    // bleachers + goalpost
    `<path d="M32 372l170-66v66z" fill="#8f979c"/><path d="M32 352l170-46M32 362l170-52" stroke="#6a7278" stroke-width="2"/>${crowd}` +
    `<path d="M470 350V236M436 236h68M436 236v-70M504 236v-70" stroke="#e8c63a" stroke-width="6" fill="none" stroke-linecap="round"/>` +
    `<rect x="32" y="346" width="536" height="380" fill="url(#${k}f)"/>` +
    `<g stroke="#f0f4e4" stroke-width="5" opacity=".7"><path d="M32 400h536M32 478h536M32 590h536"/></g>` +
    // dog (Pilot)
    `<ellipse cx="170" cy="700" rx="80" ry="12" fill="#2a4a1c" opacity=".45"/>` +
    `<path d="M112 700c-10-60 8-116 50-128 42 6 64 60 56 128z" fill="url(#${k}d)"/><path d="M214 690q30 4 36-22-16 10-34 4z" fill="#c98f3e"/>` +
    `<path d="M124 620q-8 14-2 30M140 640q-6 16 0 34M196 630q8 16 2 36M176 650q4 14 0 30" stroke="#b07a30" stroke-width="3" fill="none" stroke-linecap="round"/>` +
    `<rect x="138" y="660" width="20" height="44" rx="10" fill="#e8bc68"/><rect x="170" y="660" width="20" height="44" rx="10" fill="#e0b05a"/>` +
    `<path d="M118 540q-22 6-20 44 18-4 28-26zM204 536q24 4 26 42-20-2-30-24z" fill="#b97f34"/>` +
    `<path d="M116 560q0-46 46-46t46 46q0 40-46 44-46-4-46-44z" fill="url(#${k}d)"/>` +
    `<path d="M124 530q6-12 14-4 6-16 16-6 8-14 18-2 10-10 16 2 10-4 12 10" stroke="#f6dc9c" stroke-width="5" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="162" cy="580" rx="24" ry="18" fill="#f7e2b0"/><ellipse cx="162" cy="570" rx="9" ry="6" fill="#2a1a12"/><path d="M152 586q10 20 20 0z" fill="#e8707a"/>` +
    `<circle cx="144" cy="552" r="5" fill="#1f120d"/><circle cx="180" cy="552" r="5" fill="#1f120d"/><circle cx="146" cy="550" r="1.500" fill="#fff"/><circle cx="182" cy="550" r="1.500" fill="#fff"/>` +
    // Eli
    `<ellipse cx="330" cy="708" rx="110" ry="12" fill="#2a4a1c" opacity=".45"/>` +
    `<path d="M282 548h44l-4 148h-34zM334 548h44l-8 148h-34z" fill="#ece6d4"/><path d="M286 610q16 14 30-2l-2 30q-14 8-28-4zM340 620q14 10 28 0l-2 22q-14 8-26 0z" fill="#6f8f3c" opacity=".7"/>` +
    `<path d="M282 694h44v16h-52q0-12 8-16zM334 694h40q10 4 10 16h-50z" fill="#1c1c1c"/>` +
    `<path d="M256 402q74-34 148 0l-14 156h-120z" fill="url(#${k}j)"/>` +
    `<path d="M256 402q-34 20-42 78l36 8 20-50zM404 402q34 20 42 78l-36 8-20-50z" fill="#1f7a4e"/><path d="M216 470l36 8M444 470l-36 8" stroke="#f0f4e4" stroke-width="5"/>` +
    `<path d="M222 484l34 6 34-44-14-12zM438 484l-34 6-34-44 14-12z" fill="#d9a682"/>` +
    `<text x="330" y="544" ${MID} ${SANS} ${BOLD} font-size="84" fill="#f6f4e8" stroke="#0f4029" stroke-width="2.500" ${fit(96)}>22</text>` +
    `<path d="M270 500q10-12 22 0-8 14-22 0zM372 420q14-6 20 8-14 6-20-8zM300 552q16-10 26 2z" fill="#6b6a2c" opacity=".7"/>` +
    // Wren's legs over his shoulders
    `<path d="M290 388l4 52M370 388l-4 52" stroke="#3f5f96" stroke-width="24" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="M282 440h30v14q-16 8-32 0zM348 440h30l2 14q-16 8-32 0z" fill="#e9e4dc" stroke="#b9483a" stroke-width="2"/>` +
    // Wren
    `<path d="M300 300q30-56 60 0v36h-60z" fill="#d95a4a"/>` +
    `<path d="M304 278L262 214M356 278L400 218" stroke="#d95a4a" stroke-width="16" stroke-linecap="round"/><circle cx="258" cy="208" r="10" fill="#e9bd9a"/><circle cx="404" cy="212" r="10" fill="#e9bd9a"/>` +
    `<path d="M300 196q-22 6-20 40 16-6 22-22zM360 196q22 6 20 40-16-6-22-22z" fill="#6a4426"/>` +
    `<circle cx="330" cy="216" r="31" fill="#e9bd9a"/><path d="M298 214c-4-36 20-42 32-42 16 0 36 8 32 42-10-18-22-24-32-24s-24 6-32 24z" fill="#6a4426"/>` +
    `<path d="M314 214q6-6 12 0M336 214q6-6 12 0" stroke="#2a1c14" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M316 226q14 18 28 0z" fill="#7a2c2a"/><path d="M319 227h22v4h-20z" fill="#fff"/>` +
    // Eli's head (in front of Wren)
    `<rect x="314" y="372" width="32" height="34" fill="#c99672"/>` +
    `<ellipse cx="330" cy="344" rx="38" ry="44" fill="#e2b38e"/><path d="M290 340c-8-52 26-62 42-62 22 0 46 14 40 62-4-22-12-32-24-36-16 10-44 8-58 36z" fill="#5a3c26"/>` +
    `<path d="M306 340q8-7 16 0M338 340q8-7 16 0" stroke="#2a1c14" stroke-width="3.500" fill="none" stroke-linecap="round"/>` +
    `<path d="M310 358q20 26 40 0z" fill="#7a2c2a"/><path d="M312 359h36v5h-34z" fill="#fbf7ee"/>` +
    // sun fade
    `<rect x="32" y="32" width="536" height="690" fill="url(#${k}fd)"/><rect x="32" y="32" width="536" height="690" fill="#f2e2c0" opacity=".07"/>` +
    `<path d="M32 32h200l-200 260z" fill="#fff6d8" opacity=".22" filter="url(#${k}b5)"/></g>` +
    `<path d="M0 0h600v800H0zM6 6v788h588V6z" fill="#cfc8b4" opacity=".6"/><path d="M40 770q60-8 120 0" stroke="#d9d2bf" stroke-width="2" fill="none"/>`;
  return frame(k, 600, 800, defs, body, 0.2, 0.3);
})();

A.c3_ph_yearbook = (() => {
  const k = 'c3_ph_yearbook';
  const defs =
    lg(`${k}pg`, [[0, '#b9b3a0'], [0.07, '#ece7d8'], [1, '#e2dccb']], 1, 0) +
    lg(`${k}s`, [[0, '#a9c4d2'], [1, '#e9dcb8']]) +
    lg(`${k}tk`, [[0, '#2f6a4c'], [1, '#17402c']]) +
    lg(`${k}as`, [[0, '#8f8c84'], [1, '#5f5d58']]) +
    bl(`${k}b3`, 3) + bl(`${k}b10`, 10) +
    `<clipPath id="${k}c"><rect x="130" y="52" width="580" height="312"/></clipPath>`;
  const ink = '#1c1a17';
  const body =
    `<rect width="800" height="600" fill="#2a1f18"/>` +
    `<g transform="rotate(-1.500 400 300)"><rect x="-40" y="14" width="130" height="590" fill="#d9d3c2"/>` +
    `<g fill="#8f8a7c" opacity=".7" filter="url(#${k}b3)"><rect x="-20" y="60" width="74" height="90"/><rect x="-20" y="190" width="74" height="90"/><rect x="-20" y="320" width="74" height="90"/><rect x="-20" y="450" width="74" height="90"/></g>` +
    `<rect x="84" y="14" width="760" height="590" fill="url(#${k}pg)"/>` +
    // the photo
    `<g clip-path="url(#${k}c)"><rect x="130" y="52" width="580" height="200" fill="url(#${k}s)"/>` +
    `<g filter="url(#${k}b3)"><circle cx="170" cy="190" r="60" fill="#c9682a"/><circle cx="270" cy="170" r="50" fill="#d99a2e"/><circle cx="620" cy="180" r="64" fill="#a8442a"/><circle cx="700" cy="200" r="50" fill="#d99a2e"/><circle cx="540" cy="196" r="40" fill="#8a7a34"/></g>` +
    `<rect x="380" y="150" width="240" height="96" fill="#9a6a52"/><path d="M400 170h30v26h-30zM450 170h30v26h-30zM500 170h30v26h-30zM550 170h30v26h-30z" fill="#c9d6dc" opacity=".7"/>` +
    `<rect x="130" y="240" width="580" height="130" fill="url(#${k}as)"/><path d="M130 300h580" stroke="#e9e6dc" stroke-width="3" opacity=".3" stroke-dasharray="40 30"/>` +
    `<ellipse cx="330" cy="352" rx="150" ry="10" fill="#000" opacity=".4"/>` +
    truckRear(k, 330, 354, 0.86, '', true) +
    // Travis leaning on the truck
    `<g transform="rotate(-7 486 350)"><path d="M470 250h40l4 104h-20l-4-70-4 70h-20z" fill="#1c2434"/><path d="M462 168q28-12 56 0l6 90h-68z" fill="#232c40"/>` +
    `<path d="M480 164h20l-10 40z" fill="#eef0ec"/><path d="M487 172h6l2 30-5 6-5-6z" fill="#1f7a4e"/><path d="M462 172l-24 56 12 8 20-40z" fill="#1c2434"/>` +
    `<rect x="482" y="146" width="16" height="20" fill="#c99672"/><ellipse cx="490" cy="130" rx="20" ry="24" fill="#e0b08a"/><path d="M469 128c-2-26 12-30 21-30 12 0 24 6 21 30-4-12-10-16-21-16s-17 4-21 16z" fill="#4a3626"/>` +
    `<path d="M481 138q9 9 18 0" stroke="#7a2c2a" stroke-width="2.500" fill="none"/><path d="M479 344h-16v10h20zM499 344h18v10h-22z" fill="#0c0c0c"/></g>` +
    // Kayla with a corsage
    `<path d="M566 196q24-10 48 0l22 158h-92z" fill="#8a2a4a"/><path d="M566 196l-16 70 10 4 14-50zM614 196l12 66-10 6-10-50z" fill="#e6bd9c"/>` +
    `<circle cx="552" cy="268" r="9" fill="#fbf7ee"/><circle cx="552" cy="268" r="4" fill="#f0c8d0"/><path d="M544 262l-6-6M560 262l6-6" stroke="#3c6a34" stroke-width="3"/>` +
    `<rect x="583" y="174" width="14" height="24" fill="#d9a682"/><ellipse cx="590" cy="158" rx="19" ry="23" fill="#e6bd9c"/>` +
    `<path d="M570 162c-6-36 12-42 22-42 14 0 26 10 20 42-2-16-8-22-20-24-10 2-18 8-22 24z" fill="#e0c070"/><circle cx="592" cy="118" r="12" fill="#e0c070"/>` +
    `<path d="M582 166q8 8 16 0" stroke="#a83a4a" stroke-width="2.500" fill="none"/><path d="M576 352h12v8h-16zM600 352h12l4 8h-16z" fill="#1c1c1c"/>` +
    `<rect x="130" y="52" width="580" height="312" fill="#f0dcb0" opacity=".16"/></g>` +
    `<rect x="130" y="52" width="580" height="312" fill="none" stroke="${ink}" stroke-width="2"/>` +
    // caption
    tx(130, 414, 36, `HOMECOMING '06 —`, ink, SERIF, `${BOLD} ${fit(360)}`) +
    tx(130, 458, 33, 'Travis Corwin & Kayla Moss roll up', ink, SERIF, `font-style="italic" ${fit(560)}`) +
    tx(130, 500, 33, `in style in Dad's F-150!`, ink, SERIF, `font-style="italic" ${fit(372)}`) +
    `<g fill="#8f8a7c" opacity=".6"><rect x="130" y="530" width="250" height="7"/><rect x="130" y="546" width="210" height="7"/><rect x="430" y="530" width="280" height="7"/><rect x="430" y="546" width="180" height="7"/></g>` +
    tx(736, 574, 16, '112', '#5a564c', SERIF, BOLD) +
    `<rect x="84" y="14" width="26" height="590" fill="#000" opacity=".25" filter="url(#${k}b10)"/></g>` +
    `<path d="M0 600L800 420V600z" fill="#000" opacity=".28" filter="url(#${k}b10)"/>`;
  return frame(k, 800, 600, defs, body, 0.14, 0.5);
})();

/** Lines of unreadable (out-of-focus) typing. */
const blurRows = (seed: number, x: number, y: number, w: number, n: number, gap: number, h = 9): string => {
  const R = rng(seed);
  let o = '';
  for (let i = 0; i < n; i++) {
    let cx = x;
    while (cx < x + w - 40) {
      const ww = 30 + R() * 110;
      o += `<rect x="${r0(cx)}" y="${y + i * gap}" width="${r0(Math.min(ww, x + w - cx))}" height="${h}"/>`;
      cx += ww + 16;
    }
  }
  return o;
};

A.c3_ph_roster = (() => {
  const k = 'c3_ph_roster';
  const ink = '#1b1b1d';
  const defs =
    lg(`${k}t`, [[0, '#5a4634'], [1, '#33261b']]) +
    lg(`${k}p`, [[0, '#eeeeea'], [1, '#d6d6d0']]) +
    lg(`${k}pn`, [[0, '#f0c23a'], [1, '#b98a1c']]) +
    streak(`${k}wd`, 0.012, 0.5, '.08 .05 .03', -2.4, 1.2) +
    bl(`${k}b2`, 2.2) + bl(`${k}b9`, 9);
  const body =
    `<rect width="800" height="600" fill="url(#${k}t)"/><rect width="800" height="600" filter="url(#${k}wd)" opacity=".6"/>` +
    `<g transform="rotate(-2 400 300)"><rect x="52" y="-30" width="700" height="680" fill="#000" opacity=".5" filter="url(#${k}b9)"/><rect x="40" y="-40" width="700" height="680" fill="url(#${k}p)"/>` +
    tx(390, 44, 24, 'PINECREST COUNTY SHERIFF — DUTY ROSTER', ink, MONO, `${BOLD} ${MID} ${fit(600)}`) +
    tx(390, 74, 18, 'WEEK OF 10/16/06 · NIGHT SHIFT', '#3a3a3c', MONO, `${MID} ${fit(360)}`) +
    `<path d="M70 92h640M70 98h640" stroke="${ink}" stroke-width="2"/>` +
    `<g fill="#2a2a2c" opacity=".55" filter="url(#${k}b2)">${blurRows(4, 76, 124, 620, 4, 34)}${blurRows(8, 76, 400, 620, 5, 34)}</g>` +
    `<path d="M70 252h640M70 376h640" stroke="#77777a" stroke-width="1.500"/>` +
    // highlighted row
    `<path d="M62 262l654-6 4 108-660 6z" fill="#f7e23c" opacity=".7"/><path d="M62 262l654-6M60 370l660-6" stroke="#e0c820" stroke-width="3" opacity=".5"/>` +
    tx(80, 304, 34, 'SAT 10/21/06 — Dep. R. Corwin', ink, MONO, `${BOLD} ${fit(600)}`) +
    tx(80, 350, 34, 'PATROL — Cruiser #4 — 21:00–05:00', ink, MONO, `${BOLD} ${fit(628)}`) +
    `<g fill="#000" opacity=".06"><rect x="40" y="200" width="700" height="3"/><rect x="40" y="470" width="700" height="2"/><rect x="700" y="-40" width="6" height="680"/></g></g>` +
    // pencil
    `<g transform="rotate(-24 600 520)"><rect x="452" y="520" width="300" height="12" fill="#000" opacity=".4" filter="url(#${k}b2)"/><rect x="450" y="506" width="270" height="18" fill="url(#${k}pn)"/><path d="M450 512h270" stroke="#fff" stroke-width="2" opacity=".35"/>` +
    `<path d="M720 506l36 9-36 9z" fill="#e6c9a0"/><path d="M746 512.500l10 2.500-10 2.500z" fill="#2a2a2a"/><rect x="430" y="506" width="22" height="18" fill="#b9bcc0"/><rect x="408" y="506" width="24" height="18" rx="4" fill="#d9707a"/></g>`;
  return frame(k, 800, 600, defs, body, 0.16, 0.5);
})();

A.c3_ph_index = (() => {
  const k = 'c3_ph_index';
  const ink = '#1b1b1d';
  let nums = '';
  [11, 12, 13].forEach((n, i) => (nums += tx(78, 152 + i * 40, 24, String(n), ink, MONO, `${BOLD} opacity=".7"`)));
  [15, 16, 17, 18].forEach((n, i) => (nums += tx(78, 400 + i * 40, 24, String(n), ink, MONO, `${BOLD} opacity=".7"`)));
  const defs =
    lg(`${k}p`, [[0, '#ecece6'], [1, '#d2d2cb']]) +
    bl(`${k}b2`, 2.2) + bl(`${k}b9`, 9) + bl(`${k}b1`, 0.7);
  const body =
    `<rect width="800" height="600" fill="#3a3f46"/><rect x="-20" y="430" width="840" height="200" fill="#2a2e34"/>` +
    `<g transform="rotate(1.500 400 300)"><rect x="42" y="-30" width="730" height="680" fill="#000" opacity=".5" filter="url(#${k}b9)"/><rect x="30" y="-40" width="730" height="680" fill="url(#${k}p)"/>` +
    `<g fill="#000" opacity=".09"><rect x="30" y="-40" width="10" height="680"/><rect x="30" y="92" width="730" height="2"/><circle cx="700" cy="560" r="3"/><circle cx="130" cy="30" r="2"/></g>` +
    tx(395, 50, 29, 'CASE 06-1147 — CALLOWAY, ELI — INDEX', ink, MONO, `${BOLD} ${MID} ${fit(660)}`) +
    `<path d="M64 70h660M64 76h660" stroke="${ink}" stroke-width="2"/>` +
    tx(78, 108, 17, 'NO.  DESCRIPTION', '#444', MONO, BOLD) + tx(640, 108, 17, 'PAGES', '#444', MONO, BOLD) + nums +
    `<g fill="#2a2a2c" opacity=".5" filter="url(#${k}b2)">${blurRows(6, 130, 136, 500, 3, 40, 12)}${blurRows(12, 130, 384, 500, 4, 40, 12)}</g>` +
    // line 14
    `<path d="M64 244h660M64 348h660" stroke="#77777a" stroke-width="1.500"/>` +
    tx(78, 286, 30, '14 — Vehicle stop — Rte 9 @', ink, MONO, `${BOLD} ${fit(486)}`) +
    tx(78, 328, 30, 'Sawmill curve — 23:50 — R.C.', ink, MONO, `${BOLD} ${fit(504)}`) +
    // clerk's stamp
    `<g transform="rotate(-8 668 292)" filter="url(#${k}b1)" opacity=".86"><rect x="590" y="248" width="158" height="88" rx="6" fill="none" stroke="#c4221c" stroke-width="5"/><rect x="598" y="256" width="142" height="72" rx="3" fill="none" stroke="#c4221c" stroke-width="1.500"/>` +
    tx(669, 289, 27, 'PAGE NOT', '#c4221c', SANS, `${BOLD} ${MID} ${fit(128)}`) + tx(669, 320, 27, 'PRESENT', '#c4221c', SANS, `${BOLD} ${MID} ${fit(128)}`) + `</g>` +
    `</g><path d="M0 0h800v600z" fill="#fff" opacity=".04"/>`;
  return frame(k, 800, 600, defs, body, 0.2, 0.5);
})();

A.c3_ph_marina = (() => {
  const k = 'c3_ph_marina';
  const defs =
    lg(`${k}s`, [[0, '#04070b'], [1, '#0d151c']]) +
    lg(`${k}a`, [[0, '#2a2620'], [1, '#0c0b0a']]) +
    lg(`${k}tk`, [[0, '#1d4a35'], [1, '#0a1f15']]) +
    lg(`${k}jk`, [[0, '#2a2416'], [0.7, '#4a3e22'], [1, '#6a5630']], 1, 0) +
    rg(`${k}lamp`, [[0, '#ffd08a', 1], [0.25, '#ff9a3a', 0.5], [1, '#ff8a2a', 0]]) +
    rg(`${k}pool`, [[0, '#ff9a3a', 0.5], [1, '#ff8a2a', 0]]) +
    rg(`${k}hl`, [[0, '#fff3cf', 0.95], [0.4, '#ffe6a8', 0.45], [1, '#ffe6a8', 0]]) +
    rg(`${k}tl`, [[0, '#ff3a2a', 0.7], [1, '#ff3a2a', 0]]) +
    `<filter id="${k}sh" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="2.200 .5"/></filter>` +
    bl(`${k}b4`, 4) + bl(`${k}b16`, 16);
  const body =
    `<rect width="800" height="600" fill="url(#${k}s)"/><g filter="url(#${k}sh)">` +
    // far shore, lake, docks
    `<path d="M0 250h800v-10H0z${pines(14, -10, 810, 246, 12, 30, 34, 3)}" fill="#0a1218"/>` +
    `<rect y="250" width="800" height="90" fill="#070b10"/><path d="M40 270h70M300 282h50M600 268h90M690 300h60" stroke="#3a4a58" stroke-width="2" opacity=".5"/>` +
    `<g stroke="#11181e" stroke-width="5"><path d="M0 318h170M30 318v-150M30 190l40 110M96 318v-110M96 226l30 80M690 322h110M740 322v-130M740 212l34 96"/></g>` +
    `<rect y="336" width="800" height="264" fill="url(#${k}a)"/>` +
    // sodium lamp
    `<path d="M712 600V96q0-22-22-22h-40" stroke="#15171a" stroke-width="9" fill="none"/><rect x="626" y="68" width="40" height="14" rx="5" fill="#1c1e22"/>` +
    `<path d="M632 82h28L800 520H420z" fill="#ff9a3a" opacity=".1" filter="url(#${k}b16)"/><circle cx="646" cy="86" r="90" fill="url(#${k}lamp)"/><ellipse cx="646" cy="84" rx="13" ry="5" fill="#fff0c8"/>` +
    `<ellipse cx="600" cy="500" rx="330" ry="90" fill="url(#${k}pool)"/>` +
    // headlights thrown forward, beyond the truck
    `<ellipse cx="400" cy="322" rx="460" ry="86" fill="url(#${k}hl)"/><path d="M250 336L-40 226v150zM570 336L840 226v150z" fill="#fff0c0" opacity=".3" filter="url(#${k}b16)"/>` +
    `<g stroke="#ffe6a8" stroke-width="3" opacity=".35"><path d="M60 344h150M560 350h200M120 366h80"/></g>` +
    // the man by the driver's door
    `<ellipse cx="150" cy="512" rx="80" ry="12" fill="#000" opacity=".7"/>` +
    `<path d="M120 380h36l-2 128h-34zM160 380h36l4 128h-34z" fill="#0c0d0f"/><path d="M116 500h40v14h-46zM164 500h38l6 14h-44z" fill="#050506"/>` +
    `<path d="M92 262q64-34 132 0l10 150h-152z" fill="url(#${k}jk)"/><path d="M92 262q-22 60-18 140l26 2 12-110zM224 262q24 60 22 138l-26 4-14-110z" fill="#2c2414"/>` +
    `<path d="M136 246h44l8 22-30 18-30-18z" fill="#2a1c12"/><path d="M158 286v126" stroke="#15110a" stroke-width="3"/>` +
    `<ellipse cx="158" cy="218" rx="30" ry="34" fill="#0b0a09"/><path d="M128 206q4-34 30-34t30 34q-30-10-60 0z" fill="#16241b"/><path d="M150 202q30-10 62 6-2 8-8 8-26-12-54-6z" fill="#101a14"/>` +
    `<path d="M224 262q24 60 22 138M186 200q6 18-2 40" stroke="#ff9a3a" stroke-width="3" fill="none" opacity=".55"/>` +
    // the truck
    `<ellipse cx="410" cy="512" rx="250" ry="16" fill="#000" opacity=".75"/>` +
    truckRear(k, 410, 510, 1.5, 'SHRF 4', false, true) +
    `<circle cx="200" cy="308" r="60" fill="url(#${k}tl)"/><circle cx="620" cy="308" r="60" fill="url(#${k}tl)"/>` +
    `<path d="M186 250h448" stroke="#ffb060" stroke-width="3" opacity=".35"/><path d="M572 118l24 132" stroke="#ff9a3a" stroke-width="4" opacity=".4"/>` +
    // wet asphalt reflections
    `<g opacity=".3" filter="url(#${k}b4)"><rect x="188" y="520" width="24" height="70" fill="#ff3a2a"/><rect x="608" y="520" width="24" height="70" fill="#ff3a2a"/><rect x="620" y="530" width="60" height="70" fill="#ff9a3a"/><rect x="340" y="520" width="140" height="40" fill="#e9ecdf" opacity=".4"/></g>` +
    `</g>`;
  return frame(k, 800, 600, defs, body, 0.24, 0.6);
})();

A.c3_ph_camp = (() => {
  const k = 'c3_ph_camp';
  const R = rng(44);
  let dapple = '', logs = '', planks = '';
  for (let i = 0; i < 16; i++) dapple += `<ellipse cx="${r0(R() * 800)}" cy="${r0(450 + R() * 150)}" rx="${r0(30 + R() * 50)}" ry="${r0(6 + R() * 8)}"/>`;
  for (let i = 0; i < 9; i++) logs += `M300 ${268 + i * 20}h270`;
  for (let i = 0; i < 9; i++) planks += `M${624 + i * 18} 318v126`;
  const defs =
    lg(`${k}s`, [[0, '#f0f0b8'], [0.5, '#8fb070'], [1, '#3f6a44']]) +
    lg(`${k}g`, [[0, '#a8935a'], [1, '#6a5a30']]) +
    lg(`${k}lg`, [[0, '#9a6a3c'], [1, '#6a4424']]) +
    lg(`${k}tr`, [[0, '#2e2218'], [0.5, '#5d4630'], [1, '#2a1e14']], 1, 0) +
    lg(`${k}sg`, [[0, '#d9b47a'], [1, '#b08a50']]) +
    lg(`${k}ray`, [[0, '#fff6c0', 0.35], [1, '#fff6c0', 0]], 0.3, 1, 0.7, 0) +
    bl(`${k}b3`, 3) + bl(`${k}b7`, 7);
  const body =
    `<rect width="800" height="460" fill="url(#${k}s)"/>` +
    `<path d="${pines(3, -30, 830, 420, 200, 380, 12, 30)}" fill="#3f7048" opacity=".7" filter="url(#${k}b7)"/><path d="${pines(9, -30, 830, 440, 160, 300, 9, 20)}" fill="#234a30" opacity=".8" filter="url(#${k}b3)"/>` +
    `<rect y="430" width="800" height="170" fill="url(#${k}g)"/><g fill="#f3e2a0" opacity=".28" filter="url(#${k}b3)">${dapple}</g>` +
    `<g fill="url(#${k}tr)"><rect x="216" y="-10" width="30" height="470"/><rect x="584" y="-10" width="22" height="450"/><rect x="776" y="-10" width="40" height="500"/></g>` +
    // log cabin
    `<rect x="300" y="256" width="270" height="184" fill="url(#${k}lg)"/><path d="${logs}" stroke="#4a2e18" stroke-width="3"/>` +
    `<path d="M300 256v184M570 256v184" stroke="#4a2e18" stroke-width="8" stroke-dasharray="14 6"/>` +
    `<path d="M272 264L435 150 598 264l-14 12-149-104-149 104z" fill="#2f3a34"/><path d="M300 256L435 162l135 94z" fill="#8a5c34"/><path d="M340 228h190M374 204h122M406 182h58" stroke="#4a2e18" stroke-width="3"/>` +
    `<rect x="500" y="140" width="26" height="60" fill="#6a665e"/>` +
    `<rect x="410" y="336" width="52" height="104" fill="#3a2414"/><rect x="416" y="342" width="40" height="98" fill="#55361e"/><circle cx="450" cy="394" r="3.500" fill="#d9b04a"/>` +
    `<path d="M436 326q-6-10-22-12m22 12q-12-14-12-26m12 26q-2-14-8-22M436 326q6-10 22-12m-22 12q12-14 12-26m-12 26q2-14 8-22" stroke="#efe6cc" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="436" cy="328" rx="7" ry="5" fill="#d9cfb4"/>` +
    `<g fill="#1c2a30" stroke="#d9c9a0" stroke-width="3"><rect x="322" y="330" width="56" height="46"/><rect x="494" y="330" width="56" height="46"/></g><path d="M350 330v46M322 353h56M522 330v46M494 353h56" stroke="#d9c9a0" stroke-width="2"/>` +
    `<rect x="396" y="438" width="80" height="10" fill="#7a5a3a"/>` +
    // padlocked bunkhouse
    `<rect x="620" y="318" width="158" height="126" fill="#8a7a62"/><path d="${planks}" stroke="#5a4c3a" stroke-width="2"/><path d="M606 322l186-34v16l-186 34z" fill="#3a3f3c"/>` +
    `<rect x="664" y="346" width="62" height="98" fill="#5f5240" stroke="#33291c" stroke-width="3"/><path d="M664 346l62 98M726 346l-62 98" stroke="#463a2a" stroke-width="4"/>` +
    `<rect x="712" y="388" width="26" height="12" fill="#2a2c2e"/><path d="M718 400v-4q0-12 12-12t12 12v4" stroke="#c9cdd0" stroke-width="5" fill="none"/><rect x="712" y="398" width="36" height="30" rx="4" fill="#d9a92c" stroke="#6a4c0c" stroke-width="2"/><circle cx="730" cy="410" r="4" fill="#3a2a08"/><path d="M730 412v8" stroke="#3a2a08" stroke-width="3"/>` +
    // routed sign
    `<rect x="150" y="330" width="20" height="280" fill="url(#${k}tr)"/><ellipse cx="170" cy="600" rx="80" ry="10" fill="#000" opacity=".3"/>` +
    `<g transform="rotate(-2 160 400)"><path d="M26 322h268l14 14v126l-14 14H26l-14-14V336z" fill="#000" opacity=".35" transform="translate(5 7)"/><path d="M26 322h268l14 14v126l-14 14H26l-14-14V336z" fill="url(#${k}sg)" stroke="#6a4a22" stroke-width="4"/>` +
    `<path d="M30 356q130-10 260 2M28 440q120 8 262-4" stroke="#a37c44" stroke-width="2" fill="none" opacity=".6"/>` +
    tx(160, 376, 40, 'CORWIN CAMP', '#33200e', SERIF, `${BOLD} ${MID} ${fit(262)}`) +
    tx(160, 420, 32, '— TAMARACK RD —', '#33200e', SERIF, `${BOLD} ${MID} ${fit(262)}`) +
    tx(160, 460, 30, 'EST. 1979', '#33200e', SERIF, `${BOLD} ${MID} ${fit(170)}`) +
    `<circle cx="34" cy="340" r="4" fill="#4a3a2a"/><circle cx="286" cy="340" r="4" fill="#4a3a2a"/><circle cx="34" cy="458" r="4" fill="#4a3a2a"/><circle cx="286" cy="458" r="4" fill="#4a3a2a"/></g>` +
    // picnic table with two mics + recorder
    `<ellipse cx="560" cy="584" rx="200" ry="12" fill="#000" opacity=".3"/>` +
    `<path d="M430 580l30-64M690 580l-30-64M400 548h320" stroke="#5a4428" stroke-width="10" stroke-linecap="round"/><path d="M380 544h360l-10 14H390z" fill="#8a6a40"/>` +
    `<path d="M410 490h300l24 26H386z" fill="#b08c58"/><path d="M386 516h348v10H386z" fill="#7a5c34"/><path d="M420 500h284M404 508h316" stroke="#8a6a40" stroke-width="2"/>` +
    `<g stroke="#15171a" stroke-width="4" stroke-linecap="round"><path d="M470 500v-40M458 502h24M640 500v-40M628 502h24"/></g>` +
    `<rect x="462" y="424" width="16" height="40" rx="8" fill="#2a2e34"/><rect x="462" y="424" width="16" height="20" rx="8" fill="#9aa4ac"/><rect x="632" y="424" width="16" height="40" rx="8" fill="#2a2e34"/><rect x="632" y="424" width="16" height="20" rx="8" fill="#9aa4ac"/>` +
    `<path d="M530 482h54l6 22h-66z" fill="#16181c"/><rect x="540" y="486" width="22" height="9" fill="#f0a030"/><circle cx="574" cy="491" r="3.500" fill="#c8281e"/><path d="M478 500q30 12 50-2M640 500q-30 12-52-2" stroke="#15171a" stroke-width="2" fill="none"/>` +
    `<rect width="800" height="600" fill="url(#${k}ray)"/><rect width="800" height="600" fill="#f0d890" opacity=".1"/>`;
  return frame(k, 800, 600, defs, body, 0.15, 0.45);
})();

A.c3_ph_invoice = (() => {
  const k = 'c3_ph_invoice';
  const blue = '#27356e', red = '#8a2a22';
  const row = (y: number, s: string, size = 30, w = 0, ex = BOLD): string =>
    tx(86, y, size, s, blue, MONO, `${ex}${w ? ' ' + fit(w) : ''}`) + `<path d="M84 ${y + 12}h432" stroke="${red}" stroke-width="1.500" opacity=".55"/>`;
  const defs =
    lg(`${k}p`, [[0, '#efe2b2'], [1, '#d9c88e']]) +
    rg(`${k}st`, [[0, '#a8823a', 0.35], [1, '#a8823a', 0]]) +
    bl(`${k}b1`, 0.6) + bl(`${k}b9`, 9) + bl(`${k}b20`, 20);
  const body =
    `<rect width="600" height="800" fill="#2a2420"/><path d="M0 0h600v120H0z" fill="#3a322c" opacity=".6"/>` +
    `<g transform="rotate(1.300 300 400)"><rect x="60" y="46" width="496" height="724" fill="#000" opacity=".55" filter="url(#${k}b9)"/><rect x="48" y="34" width="504" height="730" fill="url(#${k}p)"/>` +
    `<circle cx="120" cy="700" r="130" fill="url(#${k}st)"/><circle cx="520" cy="120" r="110" fill="url(#${k}st)"/>` +
    `<g fill="#2a2420"><circle cx="150" cy="58" r="7"/><circle cx="300" cy="58" r="7"/><circle cx="450" cy="58" r="7"/></g>` +
    tx(300, 122, 32, 'HOLLINS BODY & GLASS — ASHBY', red, SANS, `${BOLD} ${MID} ${fit(444)}`) +
    `<path d="M78 138h444M78 144h444" stroke="${red}" stroke-width="2"/>` +
    tx(80, 172, 15, 'COLLISION · GLASS · FRAME · SINCE 1961', red, SANS, `${fit(280)} opacity=".8"`) + tx(520, 174, 19, 'No 4417', red, MONO, `${BOLD} text-anchor="end"`) +
    `<g filter="url(#${k}b1)">` +
    row(232, 'DATE: 10/23/06') + row(286, 'CUST: R. CORWIN') + row(340, `VEH: '97 FORD F-150 — GREEN`, 29, 430) +
    `<rect x="78" y="368" width="444" height="96" fill="none" stroke="${red}" stroke-width="1.500" opacity=".6"/>` +
    tx(86, 388, 13, 'WORK PERFORMED', red, SANS, `${BOLD} letter-spacing="2" opacity=".8"`) +
    tx(86, 432, 25, 'REPLACE GRILLE · HOOD · R HEADLAMP', blue, MONO, `${BOLD} ${fit(430)}`) +
    row(520, 'PAID: CASH', 36) +
    `</g>` +
    // margin note, in pen
    `<g transform="rotate(-7 300 630)">` + tx(300, 628, 37, 'no paperwork per cust.', '#16226a', SERIF, `font-style="italic" ${MID} ${fit(420)}`) +
    `<path d="M92 644q100 12 210 2t208 4" stroke="#16226a" stroke-width="2.500" fill="none" opacity=".8"/></g>` +
    `<g fill="${blue}" opacity=".1" filter="url(#${k}b20)"><ellipse cx="400" cy="300" rx="120" ry="40"/><ellipse cx="180" cy="470" rx="90" ry="30"/></g>` +
    `<path d="M48 404h504" stroke="#8a7a4a" stroke-width="2" opacity=".3"/><path d="M48 34l40 0-40 36z" fill="#c9b87c"/>` +
    tx(300, 738, 13, 'CUSTOMER COPY — CARBON', red, SANS, `${MID} letter-spacing="3" opacity=".6"`) +
    `</g>`;
  return frame(k, 600, 800, defs, body, 0.2, 0.5);
})();

A.c3_ph_ticket = (() => {
  const k = 'c3_ph_ticket';
  const ink = '#2c3a5c';
  let bars = '';
  const R = rng(77);
  for (let x = 150; x < 330; x += 3 + r0(R() * 6)) bars += `<rect x="${x}" y="604" width="${1 + r0(R() * 3)}" height="64"/>`;
  const defs =
    lg(`${k}t`, [[0, '#8a6844'], [1, '#553a22']]) +
    lg(`${k}p`, [[0, '#ece6d0'], [1, '#d6ccb0']]) +
    rg(`${k}st`, [[0, '#8a6a3a', 0.3], [1, '#8a6a3a', 0]]) +
    streak(`${k}wd`, 0.01, 0.4, '.1 .06 .03', -2.4, 1.2, 5) +
    bl(`${k}b1`, 0.5) + bl(`${k}b9`, 9);
  const body =
    `<rect width="600" height="800" fill="url(#${k}t)"/><rect width="600" height="800" filter="url(#${k}wd)" opacity=".6"/>` +
    `<path d="M0 262h600M0 530h600" stroke="#2e1e10" stroke-width="3" opacity=".6"/>` +
    `<circle cx="560" cy="80" r="120" fill="#e9e4d8"/><circle cx="560" cy="80" r="92" fill="#3a2414"/><circle cx="560" cy="80" r="120" fill="none" stroke="#b9b2a0" stroke-width="6"/>` +
    `<circle cx="80" cy="730" r="56" fill="none" stroke="#3a2414" stroke-width="5" opacity=".35"/>` +
    `<g transform="rotate(-3 300 400)"><rect x="112" y="92" width="392" height="630" rx="10" fill="#000" opacity=".5" filter="url(#${k}b9)"/>` +
    `<rect x="100" y="80" width="400" height="630" rx="10" fill="url(#${k}p)"/><circle cx="170" cy="640" r="120" fill="url(#${k}st)"/>` +
    `<path d="M100 90q0-10 10-10h380q10 0 10 10v96H100z" fill="#4f6a9c" opacity=".8"/>` +
    tx(300, 154, 52, 'GREYHOUND', '#f1ede0', SANS, `${BOLD} ${MID} ${fit(336)} font-style="italic"`) +
    `<g filter="url(#${k}b1)" opacity=".88">` +
    tx(130, 232, 16, 'FROM / TO', ink, SANS, `${BOLD} letter-spacing="3" opacity=".7"`) +
    tx(300, 284, 38, 'PINECREST → DULUTH', ink, SANS, `${BOLD} ${MID} ${fit(344)}`) +
    `<path d="M126 306h348" stroke="${ink}" stroke-width="1.500" opacity=".5"/>` +
    tx(130, 344, 16, 'DATE OF TRAVEL', ink, SANS, `${BOLD} letter-spacing="3" opacity=".7"`) +
    tx(300, 396, 40, 'SAT OCT 21 2006', ink, MONO, `${BOLD} ${MID} ${fit(344)}`) +
    `<path d="M126 418h348" stroke="${ink}" stroke-width="1.500" opacity=".5"/>` +
    tx(130, 456, 16, 'DEPARTS', ink, SANS, `${BOLD} letter-spacing="3" opacity=".7"`) +
    tx(300, 510, 42, 'DEP 6:15 PM', ink, MONO, `${BOLD} ${MID} ${fit(280)}`) +
    `</g>` +
    `<path d="M100 560h400" stroke="#8a836c" stroke-width="3" stroke-dasharray="3 9"/><circle cx="100" cy="560" r="10" fill="#6a4c2e"/><circle cx="500" cy="560" r="10" fill="#6a4c2e"/>` +
    `<g fill="${ink}" opacity=".7">${bars}</g>` + tx(150, 690, 15, 'ONE WAY · ADULT · 0417765', ink, MONO, `${BOLD} opacity=".7"`) +
    // driver's punch
    `<circle cx="420" cy="634" r="25" fill="#3a2a18" opacity=".4"/><path d="M420 610l8 12 14-2-6 13 10 10-13 4 0 14-13-7-12 8-2-14-13-5 9-11-5-13 14 1z" fill="#5a3f26"/><path d="M398 624q10-14 26-13" stroke="#2a1a0c" stroke-width="3" fill="none" opacity=".6"/>` +
    `<path d="M100 330l400-30M100 520l400 20" stroke="#fff" stroke-width="2" opacity=".3"/><path d="M100 332l400-30" stroke="#8a7f62" stroke-width="1" opacity=".5"/>` +
    `</g>`;
  return frame(k, 600, 800, defs, body, 0.2, 0.5);
})();

A.c3_ph_bridge = (() => {
  const k = 'c3_ph_bridge';
  const R = rng(12);
  const jar = (x: number, y: number, s: number): string =>
    `<g transform="translate(${x} ${y}) scale(${s})"><circle cy="-30" r="70" fill="url(#${k}gl)"/><rect x="-17" y="-52" width="34" height="52" rx="5" fill="#ffd88a" opacity=".25" stroke="#e6eef2" stroke-opacity=".5" stroke-width="1.500"/>` +
    `<rect x="-9" y="-22" width="18" height="20" fill="#f3ead2"/><path d="M0-44q7 10 0 20-7-10 0-20z" fill="#ffd060"/></g>`;
  const bloom = (x: number, y: number): string =>
    `<circle cx="${x}" cy="${y}" r="12" fill="#e9b21c"/><path d="M${x - 8} ${y - 2}q8-12 17 0-4 11-11 8" fill="#f7d348" stroke="#b07e0c" stroke-width="1.200"/>`;
  const bunch = (x: number, y: number, rot: number, s = 1): string => {
    let b = '';
    for (let i = 0; i < 6; i++) b += bloom(r0(-26 + (i % 3) * 26 + R() * 8), r0(-70 - Math.floor(i / 3) * 20 - R() * 8));
    return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M-22-56L-4 30M0-60V30M22-56L4 30" stroke="#3c6a34" stroke-width="4"/><path d="M-36-50L-10 34h20L36-50q-36 20-72 0z" fill="#e6dfcc" opacity=".9"/><path d="M-12 8h24" stroke="#8a3a2a" stroke-width="4"/>${b}</g>`;
  };
  const defs =
    lg(`${k}s`, [[0, '#060b14'], [1, '#1c2a38']]) +
    lg(`${k}rl`, [[0, '#59636c'], [1, '#2a3038']]) +
    lg(`${k}gd`, [[0, '#3a3530'], [1, '#12100e']]) +
    lg(`${k}j`, [[0, '#2b8a5a'], [1, '#17603f']]) +
    rg(`${k}gl`, [[0, '#ffc45a', 0.55], [1, '#ffb040', 0]]) +
    rg(`${k}wm`, [[0, '#ffb450', 0.4], [1, '#ffb450', 0]]) +
    bl(`${k}b3`, 3) + bl(`${k}b12`, 12);
  let bal = '';
  for (let x = 20; x < 600; x += 46) bal += `<rect x="${x}" y="318" width="12" height="212"/>`;
  const body =
    `<rect width="600" height="800" fill="url(#${k}s)"/>` +
    `<path d="M0 300h600v-20H0z${pines(3, -20, 620, 290, 60, 150, 10, 10)}" fill="#0a1118" filter="url(#${k}b3)"/>` +
    `<rect y="296" width="600" height="240" fill="#0b1219"/><path d="M60 350h120M380 380h160M200 430h90M420 470h120" stroke="#3a4c5c" stroke-width="3" opacity=".5" stroke-linecap="round"/>` +
    `<ellipse cx="300" cy="300" rx="400" ry="26" fill="#6f8496" opacity=".3" filter="url(#${k}b12)"/>` +
    // rail
    `<g fill="url(#${k}rl)">${bal}</g><rect x="-10" y="292" width="620" height="30" rx="6" fill="url(#${k}rl)"/><rect x="-10" y="292" width="620" height="6" fill="#8a96a0" opacity=".6"/><rect x="-10" y="486" width="620" height="16" fill="#3a424a"/>` +
    `<rect y="528" width="600" height="272" fill="url(#${k}gd)"/><rect y="528" width="600" height="14" fill="#59544c"/>` +
    `<ellipse cx="300" cy="640" rx="420" ry="200" fill="url(#${k}wm)"/>` +
    // laminated photo of Eli, zip-tied
    `<g transform="rotate(-3 300 400)"><path d="M250 330V290M350 330V290" stroke="#0a0a0a" stroke-width="5"/><path d="M244 296h14M344 296h14" stroke="#0a0a0a" stroke-width="7"/>` +
    `<rect x="222" y="326" width="156" height="196" rx="6" fill="#f1eee4"/><rect x="234" y="338" width="132" height="150" fill="#a9c4c8"/>` +
    `<path d="M244 488q6-50 56-50t56 50z" fill="url(#${k}j)"/><path d="M284 440l16 20 16-20" fill="none" stroke="#f0f4e4" stroke-width="4"/>` +
    `<rect x="290" y="416" width="20" height="24" fill="#c99672"/><ellipse cx="300" cy="392" rx="28" ry="33" fill="#e2b38e"/><path d="M271 390c-6-40 18-46 30-46 18 0 34 10 29 46-4-16-10-24-18-26-12 8-32 4-41 26z" fill="#5a3c26"/>` +
    `<path d="M284 390q6-5 12 0M304 390q6-5 12 0" stroke="#2a1c14" stroke-width="2.500" fill="none" stroke-linecap="round"/><path d="M287 404q13 14 26 0z" fill="#fbf7ee" stroke="#7a2c2a" stroke-width="1.500"/>` +
    tx(300, 510, 17, 'ELI', '#3a3a3a', SERIF, `${BOLD} ${MID} font-style="italic"`) +
    `<path d="M222 326h60l-60 120z" fill="#fff" opacity=".22"/><rect x="222" y="326" width="156" height="196" rx="6" fill="#ffb450" opacity=".14"/></g>` +
    // flowers + candles
    bunch(110, 560, -28, 1.15) + bunch(476, 548, 22, 1.1) +
    jar(60, 640, 1) + jar(190, 610, 0.9) + jar(408, 606, 0.9) + jar(540, 650, 1.05) +
    bunch(318, 742, 74, 1.3) +
    jar(120, 760, 1.4) + jar(250, 690, 1.15) + jar(486, 752, 1.45) + jar(380, 682, 1.1) +
    `<g fill="#ffd27a" opacity=".5" filter="url(#${k}b3)"><circle cx="40" cy="240" r="5"/><circle cx="560" cy="226" r="4"/><circle cx="500" cy="262" r="3"/></g>`;
  return frame(k, 600, 800, defs, body, 0.2, 0.6);
})();

A.c3_ph_studio = (() => {
  const k = 'c3_ph_studio';
  const pin = (x: number, y: number): string => `<circle cx="${x}" cy="${y}" r="6" fill="#d9362c"/><circle cx="${x - 2}" cy="${y - 2}" r="2" fill="#ff9a8a"/>`;
  const defs =
    `<pattern id="${k}fm" width="64" height="64" patternUnits="userSpaceOnUse"><rect width="64" height="64" fill="#3c4047"/><path d="M0 0h64L32 32z" fill="#565b64"/><path d="M0 64h64L32 32z" fill="#24272c"/><path d="M0 0v64l32-32z" fill="#474b53"/></pattern>` +
    lg(`${k}ck`, [[0, '#b98c52'], [1, '#8f6a3a']]) +
    lg(`${k}dk`, [[0, '#3a2a1e'], [1, '#150e09']]) +
    lg(`${k}m`, [[0, '#d0d6da'], [0.5, '#737d86'], [1, '#262c32']], 1, 0) +
    rg(`${k}lp`, [[0, '#ffd9a0', 0.55], [1, '#ffb060', 0]]) +
    rg(`${k}dk2`, [[0.3, '#000', 0], [1, '#000', 0.7]], 0.4, 0.4, 0.8) +
    `<filter id="${k}cn" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .25 0 0 0 0 .15 0 0 0 0 .05 -2 0 0 0 1.1"/></filter>` +
    bl(`${k}b3`, 3) + bl(`${k}b10`, 10);
  const body =
    `<rect width="600" height="800" fill="url(#${k}fm)"/>` +
    // corkboard
    `<rect x="58" y="78" width="500" height="420" fill="#000" opacity=".5" filter="url(#${k}b10)"/><rect x="50" y="66" width="500" height="420" fill="#4a3220"/><rect x="62" y="78" width="476" height="396" fill="url(#${k}ck)"/><rect x="62" y="78" width="476" height="396" filter="url(#${k}cn)" opacity=".35"/>` +
    // pinned photos + notes
    `<g transform="rotate(-6 130 150)"><rect x="82" y="100" width="100" height="92" fill="#f1eee4"/><rect x="88" y="106" width="88" height="62" fill="#8fa6b0"/><rect x="104" y="128" width="56" height="30" rx="4" fill="#1f5a3c"/><rect x="100" y="152" width="64" height="8" fill="#9aa2a6"/></g>` +
    `<g transform="rotate(5 462 150)"><rect x="412" y="98" width="104" height="96" fill="#f1eee4"/><rect x="418" y="104" width="92" height="66" fill="#a9c4c8"/><path d="M440 170q4-30 24-30t24 30z" fill="#1f7a4e"/><circle cx="464" cy="130" r="13" fill="#e2b38e"/></g>` +
    `<g transform="rotate(4 130 380)"><rect x="80" y="330" width="104" height="110" fill="#ece6d0"/><g fill="#5a5a5a" opacity=".6"><rect x="90" y="344" width="80" height="6"/><rect x="90" y="358" width="64" height="6"/><rect x="90" y="372" width="76" height="6"/><rect x="90" y="400" width="50" height="6"/></g><rect x="88" y="384" width="84" height="12" fill="#f7e23c" opacity=".7"/></g>` +
    `<g transform="rotate(-4 470 380)"><rect x="420" y="330" width="100" height="104" fill="#22343a"/><path d="M430 372q30-30 50 0t34-10" stroke="#d6c493" stroke-width="3" fill="none"/><path d="M440 350q20-16 50-6 10 20-6 30-30 6-44-24z" fill="#3a6d80"/><circle cx="484" cy="384" r="5" fill="#d9362c"/></g>` +
    `<rect x="262" y="96" width="84" height="64" fill="#f3e9a0" transform="rotate(3 304 128)"/><path d="M274 116h56M274 130h44M274 144h50" stroke="#6a6240" stroke-width="3" transform="rotate(3 304 128)"/>` +
    `<rect x="258" y="392" width="92" height="60" fill="#f1eee4" transform="rotate(-3 304 422)"/><path d="M270 410h66M270 424h50M270 438h60" stroke="#77736a" stroke-width="3" transform="rotate(-3 304 422)"/>` +
    // red string
    `<g stroke="#c4221c" stroke-width="2.500" fill="none"><path d="M132 106L300 222M464 104L300 222M134 336L300 222M470 336L300 222M304 100L300 222M304 396L300 300M132 106L134 336M464 104L470 336"/></g>` +
    pin(132, 106) + pin(464, 104) + pin(134, 336) + pin(470, 336) + pin(304, 100) + pin(304, 396) +
    // the newest index card
    `<g transform="rotate(-2 300 262)"><rect x="150" y="218" width="308" height="96" fill="#000" opacity=".4" filter="url(#${k}b3)"/><rect x="146" y="212" width="308" height="96" fill="#fbf9f0"/>` +
    `<path d="M146 236h308" stroke="#d9584e" stroke-width="2"/><path d="M146 262h308M146 286h308" stroke="#9cc0d8" stroke-width="1.500"/>` +
    tx(300, 278, 34, 'EP 9 — THE GRILLE', '#15171c', SANS, `${BOLD} ${MID} ${fit(276)}`) + `</g>` + pin(300, 222) +
    // desk, mic + pop filter, lamp glow
    `<rect y="640" width="600" height="160" fill="url(#${k}dk)"/><rect y="640" width="600" height="8" fill="#5a4230"/>` +
    `<circle cx="80" cy="520" r="330" fill="url(#${k}lp)"/>` +
    `<path d="M620 560L420 500 372 584" stroke="#15171a" stroke-width="12" fill="none" stroke-linejoin="round"/><circle cx="420" cy="500" r="10" fill="#2a2e34"/>` +
    `<rect x="330" y="560" width="74" height="170" rx="37" fill="url(#${k}m)"/><rect x="330" y="560" width="74" height="96" rx="37" fill="#1c2228"/>` +
    `<path d="M342 584h50M336 604h62M336 624h62M342 644h50" stroke="#8e9aa3" stroke-width="3"/><rect x="330" y="656" width="74" height="8" fill="#d9e2e8"/><path d="M344 570q-8 16-8 44" stroke="#fff" stroke-width="3" opacity=".5" fill="none"/>` +
    `<path d="M367 730v40M300 640q-40 60 20 120" stroke="#15171a" stroke-width="7" fill="none"/>` +
    `<circle cx="270" cy="600" r="74" fill="#0c0e10" opacity=".55"/><circle cx="270" cy="600" r="74" fill="none" stroke="#0c0e10" stroke-width="9"/><circle cx="270" cy="600" r="66" fill="none" stroke="#6a7078" stroke-width="2" stroke-dasharray="2 5"/><path d="M220 560q30-30 70-20" stroke="#fff" stroke-width="3" opacity=".25" fill="none"/>` +
    `<rect x="470" y="700" width="160" height="110" rx="8" fill="#1a1c20" transform="rotate(-8 520 750)"/><rect x="482" y="712" width="140" height="80" fill="#6a8ab0" opacity=".5" transform="rotate(-8 520 750)"/>` +
    `<rect width="600" height="800" fill="url(#${k}dk2)"/>`;
  return frame(k, 600, 800, defs, body, 0.2, 0.5);
})();

A.c3_ph_hideout = (() => {
  const k = 'c3_ph_hideout';
  const R = rng(63);
  let crowd = '', bulbs = '';
  for (let i = 0; i < 13; i++) {
    const x = r0(20 + i * 64 + R() * 24), y = r0(520 + R() * 46), s = 0.9 + R() * 0.5;
    crowd += `<g transform="translate(${x} ${y}) scale(${s.toFixed(2)})"><path d="M-48 90q0-52 48-52t48 52z"/><ellipse cy="12" rx="24" ry="28"/></g>`;
  }
  for (let i = 0; i < 17; i++) bulbs += `<circle cx="${20 + i * 48}" cy="${r0(34 + Math.sin(i * 0.9) * 10)}" r="4"/>`;
  const stool = (x: number): string =>
    `<path d="M${x - 26} 372h52M${x - 20} 376l-12 74M${x + 20} 376l12 74M${x - 28} 420h56" stroke="#1c1410" stroke-width="7" stroke-linecap="round" fill="none"/><rect x="${x - 34}" y="362" width="68" height="14" rx="6" fill="#5a2a22"/>`;
  const mic = (x: number): string =>
    `<path d="M${x} 452V300M${x - 22} 452h44M${x} 300l-22-22" stroke="#0c0d0f" stroke-width="5" stroke-linecap="round" fill="none"/><rect x="${x - 36}" y="262" width="20" height="30" rx="9" fill="#9aa4ac" transform="rotate(-45 ${x - 26} 277)"/>`;
  const defs =
    lg(`${k}w`, [[0, '#1c1014'], [1, '#3a1c1c']]) +
    lg(`${k}st`, [[0, '#6a4428'], [1, '#2e1c10']]) +
    lg(`${k}bn`, [[0, '#f1e9d2'], [1, '#cfc4a4']]) +
    lg(`${k}sp1`, [[0, '#ffd9a0', 0.55], [1, '#ffd9a0', 0.05]]) +
    lg(`${k}sp2`, [[0, '#b9a0ff', 0.4], [1, '#b9a0ff', 0.04]]) +
    `<pattern id="${k}br" width="60" height="30" patternUnits="userSpaceOnUse"><path d="M0 0h60M0 15h60M0 0v15M30 15v15" stroke="#0e0709" stroke-width="2"/></pattern>` +
    bl(`${k}b3`, 3) + bl(`${k}b14`, 14);
  const body =
    `<rect width="800" height="600" fill="url(#${k}w)"/><rect width="800" height="470" fill="url(#${k}br)" opacity=".6"/>` +
    `<path d="M0 30Q400 60 800 26" stroke="#0a0a0a" stroke-width="2" fill="none"/><g fill="#ffd27a">${bulbs}</g><g fill="#ffb040" opacity=".5" filter="url(#${k}b3)">${bulbs}</g>` +
    // banner
    `<path d="M170 70l-30-40M630 70l30-40" stroke="#c9c2ae" stroke-width="2"/><path d="M166 66h468l6 104-240 8-240-8z" fill="url(#${k}bn)"/><path d="M290 66l4 108M510 66l-4 108" stroke="#a89c7c" stroke-width="2" opacity=".5"/>` +
    tx(400, 140, 56, 'LONG QUIET LIVE', '#1c1a22', SANS, `${BOLD} ${MID} ${fit(420)}`) +
    // stage + spotlights
    `<rect y="450" width="800" height="150" fill="url(#${k}st)"/><rect y="450" width="800" height="10" fill="#8a6038"/>` +
    `<path d="M250-10h70l120 470H180z" fill="url(#${k}sp1)" filter="url(#${k}b14)"/><path d="M500-10h70l90 470H420z" fill="url(#${k}sp2)" filter="url(#${k}b14)"/>` +
    `<ellipse cx="310" cy="458" rx="130" ry="16" fill="#ffd9a0" opacity=".3"/><ellipse cx="540" cy="458" rx="120" ry="16" fill="#b9a0ff" opacity=".25"/>` +
    // Marcus on the first stool
    stool(310) +
    `<path d="M288 366l-14 60 6 26M332 366l20 56-8 30" stroke="#232a3a" stroke-width="20" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M270 448h26v10h-30zM336 448h26l4 10h-30z" fill="#0c0c0c"/>` +
    `<path d="M272 268q38-22 76 0l8 104h-92z" fill="#2c313c"/><path d="M272 268l-12 62 34 26 6-14-20-22 6-40zM348 268l14 60-30 26-8-12 18-22-4-40z" fill="#242832"/>` +
    `<rect x="290" y="340" width="34" height="22" fill="#f1eee4" transform="rotate(-8 307 351)"/><circle cx="296" cy="352" r="8" fill="#b57a52"/><circle cx="330" cy="350" r="8" fill="#b57a52"/>` +
    `<rect x="300" y="246" width="20" height="26" fill="#8a5a3c"/><ellipse cx="310" cy="230" rx="24" ry="28" fill="#b57a52"/>` +
    `<path d="M285 222q0-34 25-34t25 34q-25-12-50 0z" fill="#b5532a"/><path d="M283 218q27-14 54 0v10q-27-12-54 0z" fill="#c9653a"/>` +
    `<g fill="none" stroke="#16130f" stroke-width="2.500"><circle cx="301" cy="234" r="8"/><circle cx="320" cy="234" r="8"/><path d="M309 234h3"/></g><path d="M302 248q8 6 16 0" stroke="#5a2a22" stroke-width="2.500" fill="none"/>` +
    mic(366) +
    // the empty stool, with her name on it
    stool(540) + mic(600) +
    `<g transform="rotate(-4 540 326)"><rect x="486" y="296" width="108" height="64" fill="#000" opacity=".4" transform="translate(3 4)"/><rect x="486" y="296" width="108" height="64" fill="#fbf9f0"/>` +
    tx(540, 342, 38, 'WREN', '#15171c', SANS, `${BOLD} ${MID} ${fit(88)}`) +
    `<rect x="524" y="288" width="32" height="14" fill="#d9cfa0" opacity=".85"/></g><path d="M540 362v-4" stroke="#fbf9f0" stroke-width="4"/>` +
    // crowd
    `<g fill="#0a0709">${crowd}</g>` +
    `<rect x="214" y="500" width="22" height="36" rx="3" fill="#0a0709"/><rect x="217" y="503" width="16" height="26" fill="#cfe0ff" opacity=".85"/><rect x="590" y="490" width="22" height="36" rx="3" fill="#0a0709"/><rect x="593" y="493" width="16" height="26" fill="#ffe0b0" opacity=".85"/>` +
    `<path d="M0 600V540q400-40 800 0v60z" fill="#000" opacity=".4" filter="url(#${k}b14)"/>`;
  return frame(k, 800, 600, defs, body, 0.2, 0.6);
})();
