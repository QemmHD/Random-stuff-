// COLD SIGNAL — Case 09 "Funeral Potatoes" illustrations.
// Every value in `case9Art` is a complete standalone SVG document string.
// Ids inside each SVG are prefixed with the art key. Original art, no external references.

/** Art registry for Case 09. Keys are the art ids referenced by src/cases/case9.ts. */
export const case9Art: Record<string, string> = {};
const A = case9Art;

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
const HAND = 'font-family="Comic Sans MS, Chalkboard SE, Marker Felt, cursive, sans-serif"';
const n1 = (v: number): number => Math.round(v * 10) / 10;
const esc = (s: string): string => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
/** Text element. `ex` = extra attributes (weight, anchor, textLength…). */
const tx = (x: number, y: number, size: number, s: string, fill: string, font = SANS, ex = ''): string =>
  `<text x="${x}" y="${y}" ${font} font-size="${size}" fill="${fill}"${ex ? ' ' + ex : ''}>${esc(s)}</text>`;
/** Fixed-width text: guarantees the line fits whatever fallback font is used. */
const fit = (w: number): string => `textLength="${w}" lengthAdjust="spacingAndGlyphs"`;
const BOLD = 'font-weight="bold"';
const MID = 'text-anchor="middle"';
const P = (d: string, fill: string, ex = ''): string => `<path d="${d}" fill="${fill}"${ex ? ' ' + ex : ''}/>`;
const R = (x: number, y: number, w: number, h: number, fill: string, ex = ''): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"${ex ? ' ' + ex : ''}/>`;
const C = (x: number, y: number, r: number, fill: string, ex = ''): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"${ex ? ' ' + ex : ''}/>`;
const E = (x: number, y: number, rx: number, ry: number, fill: string, ex = ''): string =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}"${ex ? ' ' + ex : ''}/>`;
const G = (t: string, body: string, ex = ''): string => `<g transform="${t}"${ex ? ' ' + ex : ''}>${body}</g>`;
/** Stroked open path. */
const S = (d: string, c: string, w: number, ex = ''): string =>
  `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${ex ? ' ' + ex : ''}/>`;

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
  `<filter id="${k}gr" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="9"/><feColorMatrix values=".6 .6 .6 0 -.4 .6 .6 .6 0 -.4 .6 .6 .6 0 -.4 0 0 0 0 1"/></filter>` +
  rg(`${k}vg`, [[0.5, '#000', 0], [1, '#000', vig]], 0.5, 0.5, 0.75) +
  `<clipPath id="${k}fr"><rect width="${w}" height="${h}"/></clipPath></defs><g clip-path="url(#${k}fr)">${body}<rect width="${w}" height="${h}" filter="url(#${k}gr)" opacity="${grain}" style="mix-blend-mode:overlay"/><rect width="${w}" height="${h}" fill="url(#${k}vg)"/></g></svg>`;

// Recurring colours.
const SHELL = '#f39a2b';
const SHELL_D = '#c96f14';
const LETT = '#5fb83a';
const LETT_D = '#3c8a26';
const TOM = '#e2412f';
const CHEESE = '#ffd23f';
const MAHOG = '#5a2414';
const GOLD = '#e0b040';
const TOT = '#d99a2e';
const TOT_D = '#9a5f14';
const TAN = '#c9793f';
const TAN_D = '#96532a';
const LOU = '#e0a88a';
const LOU_D = '#b0745a';
const DEW = '#e2b48c';
const DEW_D = '#b9825c';
const DEWHAIR = '#5b3a22';
const SPAT = '#8d5a3b';
const SPAT_D = '#5e3823';

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
  white?: string;
  lid?: number;
  low?: number;
  /** Heavy upper eyelid: covers the eye down to this y. */
  lidCover?: number;
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
  const eye = (x: number, white: string, sk: string): string =>
    `<path d="M${x} 91.5Q${x + 7} ${lid} ${x + 14} 91Q${x + 7} ${low} ${x} 91.5Z" fill="${white}"/><circle cx="${x + 7}" cy="90.7" r="3" fill="${o.iris}"/><circle cx="${x + 5.8}" cy="89.6" r=".9" fill="#fff"/>` +
    (o.lidCover ? `<path d="M${x - 1} 92Q${x + 7} ${lid - 4} ${x + 15} 91.5L${x + 14.5} ${o.lidCover}H${x - 0.5}Z" fill="${sk}"/><path d="M${x - 0.5} ${o.lidCover}H${x + 14.5}" fill="none" stroke="#1a1318" stroke-width="1.9" stroke-linecap="round"/>`
      : `<path d="M${x - 0.5} 91.8Q${x + 7} ${lid - 1} ${x + 14.5} 91" fill="none" stroke="#1a1318" stroke-width="1.9" stroke-linecap="round"/>`);
  const w = o.white ?? '#f1e9df';
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
    eye(80, w, o.skin) + eye(106, '#b9ada6', o.shade) +
    `<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${o.brows}" stroke="${o.browC}" stroke-width="3.2"/>` +
    `<path d="M102 94Q105 104 105.5 108Q101 112 95 108.5" stroke="#000" stroke-opacity=".38" stroke-width="1.9"/>${o.mouth}` +
    `<path d="M95.5 122Q100 123.5 104.5 122" stroke="#000" stroke-opacity=".25" stroke-width="1.5"/>${o.lines ?? ''}</g>` +
    (o.hair ?? '') + (o.top ?? '') +
    `<rect width="200" height="200" fill="url(#${k}-v)"/></svg>`
  );
}
/** Age / laugh lines (stroke set by caller group). */
const WRINKLES = 'M87 105Q83.5 111 86 118M113.5 105Q117 111 114.5 118M80 98Q86 100 92 98.5M108 98.5Q114 100 120 98';
const CROWS = 'M74 87q-4 1-6 4M74 91q-4 2-5 5M126 87q4 1 6 4M126 91q4 2 5 5';
/** A tiny taco (≈32 wide), centred on x, base at y. */
const miniTaco = (x: number, y: number, s = 1): string =>
  G(`translate(${x} ${y}) scale(${s})`,
    P('M-15-1q3-9 7-2 3-9 8-1 4-8 8 1 5-6 7 2z', LETT) + C(-6, -4, 3, TOM) + C(7, -4, 3, TOM) +
    P('M-16 0a16 15 0 0 0 32 0z', '#f6c34a') + P('M-16 0a16 15 0 0 0 32 0q-4 9-16 9t-16-9z', '#d99a2e', 'opacity=".55"'));
/** White lily, centred on the bloom. */
const lily = (x: number, y: number, s = 1, rot = 0): string =>
  G(`translate(${x} ${y}) rotate(${rot}) scale(${s})`,
    [0, 60, 120, 180, 240, 300].map((a) => `<path d="M0 0Q-7-12 0-24Q7-12 0 0Z" fill="${a % 120 ? '#fff' : '#eee8dc'}" transform="rotate(${a})"/>`).join('') +
    S('M0 0l-4-7M0 0l4-7M0 0v-9', '#d9892a', 1.4) + C(0, 0, 2.6, '#cfe08a'));

A.av_c9_dewey = bust('av_c9_dewey', {
  bg: ['#ffc45a', '#c9552a', '#2a0e12'], rim: '#ffe2a0', cloth: '#3f7f6a',
  clothIn:
    P('M68 148H132L140 200H60Z', '#efe6cf') + S('M70 150L86 138M130 150L114 138', '#efe6cf', 5) +
    E(78, 172, 6, 4, '#c98a3a', 'opacity=".6"') + E(126, 166, 5, 3, '#b8452a', 'opacity=".55"') + C(118, 192, 3, '#8a9a3a', 'opacity=".6"') +
    tx(100, 187, 11.5, 'TOT DADDY', '#c2331f', SANS, `${BOLD} ${MID} ${fit(58)}`),
  back: P('M62 66Q54 104 62 132Q72 128 72 104V66ZM138 66Q146 104 138 132Q128 128 128 104V66Z', DEWHAIR),
  skin: DEW, shade: DEW_D, iris: '#5a3a1e', white: '#f8dcd2', lidCover: 89.6,
  inFace: P('M64 96Q72 108 82 106Q92 101 100 104Q108 101 118 106Q128 108 136 96V136H64Z', DEWHAIR, 'opacity=".92"') + S('M70 100l2 5M76 103l1 5M124 103l-1 5M130 100l-2 5', '#3a2414', 1.2),
  brows: 'M77 80Q86 77 95 80M105 80Q114 77 123 80', browC: '#4a2e1a',
  mouth: `<path d="M88 112Q100 126 112 112Q100 116 88 112Z" fill="#fff" stroke="#2a130c" stroke-width="1.6"/>`,
  top:
    P('M64 66Q58 36 84 30Q100 22 118 30Q142 36 136 66Q100 40 64 66Z', DEWHAIR) + S('M76 38q6-8 14-6M104 28q10 0 16 8', '#7a5232', 1.6) +
    P('M65 76Q100 58 135 76L135 60Q100 42 65 60Z', '#d8352a') + P('M134 62l14-7-3 11 9 7-17-1z', '#b82a22') +
    [72, 84, 96, 108, 120, 130].map((x, i) => C(x, 66 - Math.sin((i + 0.5) / 6 * Math.PI) * 8.5, 1.8, '#fff')).join('') +
    P('M22 200L30 168H52L58 200Z', DEW) + E(41, 164, 13, 11, DEW) + S('M31 160q10-4 20 0M31 166q10-4 20 0', DEW_D, 1.4) +
    `<rect x="31" y="128" width="20" height="26" rx="7" fill="${TOT}" stroke="${TOT_D}" stroke-width="1.5"/>` + S('M36 134l3 3M44 138l2 3M37 145l3 2', TOT_D, 1.3) + P('M35 131q5-2 10 0', '#fff', 'opacity=".4"'),
});

A.av_c9_spatula = bust('av_c9_spatula', {
  bg: ['#7ff0ff', '#2d6fd6', '#1a0f3a'], rim: '#ff8ad8', cloth: SPAT,
  clothIn: P('M68 147L82 146Q84 170 100 172Q116 170 118 146L132 147Q136 172 148 200H52Q64 172 68 147Z', '#ff4fa3') + P('M52 200Q64 172 68 147L74 147Q72 176 62 200Z', '#fff', 'opacity=".5"'),
  back: G('rotate(14 136 96)', R(134, 50, 5, 50, '#222', 'rx="2"') + P('M127 18h19v28q-9.5 6-19 0z', '#cfd6dc', 'stroke="#7d8891"') + S('M132 24v16M136.5 24v16M141 24v16', '#7d8891', 1.6)),
  skin: SPAT, shade: SPAT_D, iris: '#20120a',
  brows: 'M78 79Q86 76 95 78M105 78Q114 76 122 79', browC: '#1c1410',
  mouth: `<path d="M88 113Q101 124 113 111Q101 116 88 113Z" fill="#fff" stroke="#2a130c" stroke-width="1.6"/>`,
  top:
    P('M66 76Q60 44 82 38L86 26L93 35L100 21L107 35L114 25L118 38Q140 44 134 76Q126 56 100 54Q74 56 66 76Z', '#1c1410') +
    P('M82 40L86 26L93 37ZM93 37L100 21L107 37ZM107 37L114 25L118 40ZM72 48L74 34L82 42ZM118 42L126 34L128 48Z', '#f6d743') +
    P('M71 83H129V100Q121 103 113 99L105 90H95L87 99Q79 103 71 100Z', '#fff') +
    S('M74 87.5H96M74 91.5H93M74 95.5H89M104 87.5H126M107 91.5H126M111 95.5H126', '#141018', 2.3) + S('M71 85L66 88M129 85L134 88', '#fff', 3) +
    S('M92 141q8 8 16 0', '#e8b830', 2.2, 'stroke-dasharray="2.5 1.5"'),
});

A.av_c9_mom = bust('av_c9_mom', {
  bg: ['#ffe0ec', '#c8588c', '#2a1024'], rim: '#fff', cloth: '#7fc8d8',
  clothIn:
    S('M82 147Q100 162 118 147', '#5aa8ba', 5) + miniTaco(100, 172, 0.9) + C(96, 177, 1.2, '#222') + C(104, 177, 1.2, '#222') + S('M97 181q3 2.5 6 0', '#222', 1.2) +
    tx(100, 196, 8.5, "MY SON'S TRUCK", '#b0284a', SANS, `${BOLD} ${MID} ${fit(66)}`),
  back: E(100, 84, 45, 46, '#b9a57e'),
  skin: '#f0c4a4', shade: '#c8906e', iris: '#3a5a6a',
  brows: 'M77 81Q86 73 95 78M105 78Q114 73 123 81', browC: '#8a7650',
  mouth: `<ellipse cx="100" cy="117.5" rx="9" ry="7.5" fill="#5a1420" stroke="#c22a4a" stroke-width="2.4"/><path d="M94 113.5h12" stroke="#fff" stroke-width="2.6"/><path d="M96 122q4-2.5 8 0" stroke="#e8687a" stroke-width="2.4"/>`,
  lines: `<path d="${WRINKLES}${CROWS}" stroke="#8a5a40" stroke-width="1.2" opacity=".6"/>`,
  top:
    (() => { let s = ''; for (let i = 0; i < 17; i++) { const a = Math.PI * (1.12 - i * 1.24 / 16); const r = i % 2 ? 37 : 41; s += C(n1(100 + Math.cos(a) * r), n1(80 - Math.sin(a) * r * 1.05), 10.5, i % 3 ? '#d9c7a0' : '#e6d6b2'); } return s; })() +
    [74, 86, 98, 110, 122].map((x, i) => C(x, 56 + (i % 2) * 3, 9, i % 2 ? '#e6d6b2' : '#d9c7a0')).join('') +
    S('M70 52q4-5 8 0M92 44q4-5 8 0M112 48q4-5 8 0M126 62q4-4 6 2M62 78q0-6 6-5', '#a8946a', 1.4) +
    P('M18 200L38 124L64 120L66 200Z', '#7fc8d8') + G('rotate(-8 57 98)', R(50, 76, 14, 44, '#1c1c22', 'rx="3"')) +
    P('M42 100q-5 12 4 22l14 1 5-21-9-7z', '#f0c4a4') + S('M47 104l14 3M46 110l14 3M47 116l13 2', '#c8906e', 1.3) +
    S('M146 70l10-6M148 84h12M146 98l10 6', '#fff', 2.6, 'opacity=".85"'),
});

A.av_c9_junior = bust('av_c9_junior', {
  bg: ['#c2ccd6', '#4a5560', '#0e1216'], rim: '#e8f0ff', cloth: '#17171b',
  clothIn:
    P('M78 146L92 200H108L122 146Q100 160 78 146Z', '#c8202a') + S('M100 158V200', '#eee', 2) + S('M83 150l11 50M117 150l-11 50', '#fff', 2.6) +
    P('M78 146L92 200H66L56 154ZM122 146L108 200H134L144 154Z', '#26262c') + P('M78 146L90 152L84 166ZM122 146L110 152L116 166Z', '#a0161e'),
  overNeck: S('M86 138Q100 166 114 138', '#e8b830', 3.4, 'stroke-dasharray="3 1.5"'),
  skin: '#d9a680', shade: '#a87450', iris: '#2a1a10', lid: 87.6,
  inFace: P('M67 100Q80 118 100 114Q120 118 133 100V135H67Z', '#3a2a22', 'opacity=".22"'),
  brows: 'M77 79Q87 79 96 85M104 85Q113 79 123 79', browC: '#121014',
  mouth: `<path d="M90 119Q100 113 111 118.5" stroke="#2a130c" stroke-width="2.6"/><path d="M111 118.5q2-3 1-5" stroke="#2a130c" stroke-width="1.6"/>`,
  lines: S('M97 83v-5M103 83v-5', '#7a4a30', 1.3),
  top: P('M65 80Q60 40 100 34Q140 40 135 80Q131 58 116 52Q96 47 80 55Q70 61 65 80Z', '#121014') + S('M76 50Q96 40 122 48M72 58Q88 46 108 46', '#4a4a58', 1.5),
});

A.av_c9_donna = (() => {
  const k = 'av_c9_donna';
  let net = '';
  for (let i = 0; i < 9; i++) net += `M${92 + i * 8} 30L${52 + i * 8} 110M${68 + i * 8} 30L${108 + i * 8} 110`;
  return bust(k, {
    bg: ['#f6e2b0', '#a0763a', '#1c120a'], rim: '#fff3d0', cloth: '#101012',
    clothIn: P('M80 146Q100 192 120 146Z', TAN) + S('M84 149Q100 172 116 149', '#fff', 4.4, 'stroke-dasharray=".1 5.4"') + P('M100 164l5 6-5 7-5-7z', '#eaf6ff', 'stroke="#9cc"'),
    back: E(100, 60, 54, 46, '#e2d6b0') + C(60, 92, 14, '#e2d6b0') + C(140, 92, 14, '#d0c49e'),
    skin: TAN, shade: TAN_D, iris: '#3a4a2a',
    inFace: E(87, 86, 10, 5, '#5a7ab8', 'opacity=".45"') + E(113, 86, 10, 5, '#5a7ab8', 'opacity=".45"') + E(76, 104, 7, 4, '#e0506a', 'opacity=".3"'),
    brows: 'M77 81Q86 76 95 80M105 77Q114 69 123 76', browC: '#6a4a26',
    mouth: P('M89 115Q95 111.5 100 113.5Q105 111.5 112 113.5Q101 123 89 115Z', '#c21e3a') + S('M90 115Q100 117 111.5 114', '#7a0e22', 1.2),
    lines: `<path d="${CROWS}" stroke="#7a3e1e" stroke-width="1.1" opacity=".6"/>` + S('M79 88l-4-3M82 86l-2-4M121 86l3-4M124 88l4-3', '#1a1318', 1.3),
    top:
      P('M64 80Q56 32 100 26Q144 32 136 80Q130 54 106 50Q82 49 73 62Q67 69 64 80Z', '#f7f0d8') + S('M72 50Q88 32 112 36M80 44Q98 34 124 44M68 62Q74 48 86 44', '#cdbf96', 1.5) +
      `<clipPath id="${k}-vl"><path d="M108 40L142 34L140 104Q118 104 96 92Z"/></clipPath><g clip-path="url(#${k}-vl)"><path d="${net}" fill="none" stroke="#0a0a0c" stroke-width=".9" opacity=".75"/></g>` +
      G('rotate(-18 124 40)', E(124, 40, 22, 9, '#101012') + P('M118 38q-2-22 12-26-6 12-2 26z', '#101012') + P('M128 36q8-18 22-16-12 6-12 18z', '#26262c')) +
      P('M64 100l4 6-4 8-4-8zM136 100l4 6-4 8-4-8z', '#eaf6ff', 'stroke="#9cc" stroke-width=".8"') +
      P('M24 136h30q0 24-15 26-15-2-15-26z', '#fff', 'opacity=".3"') + P('M26 148h26q-2 12-13 13-11-1-13-13z', '#f2e08a') + S('M39 162v26M29 191h20', '#fff', 2.6, 'opacity=".75"') +
      E(40, 177, 11, 8, TAN) + S('M31 174q9-4 18 0M31 180q9-4 18 0', TAN_D, 1.2) + C(48, 176, 3, '#eaf6ff', 'stroke="#9cc"') + C(31, 172, 2, '#c21e3a') + C(31, 178, 2, '#c21e3a'),
  });
})();

A.av_c9_gordon = bust('av_c9_gordon', {
  bg: ['#d6e0d8', '#55665e', '#0c1210'], rim: '#e6fff2', cloth: '#131316',
  clothIn: P('M84 146L100 178L116 146Z', '#f4f4f0') + P('M96 150h8l3 38-7 12-7-12z', '#0a0a0c') + P('M84 146L100 178L90 200H68L62 153ZM116 146L100 178L110 200H132L138 153Z', '#202026'),
  skin: '#ecd8ca', shade: '#bfa193', iris: '#5a6a72', low: 95,
  inFace: P('M64 90Q62 62 72 54L75 84ZM136 90Q138 62 128 54L125 84Z', '#6a6258') + E(87, 97, 8, 3, '#a88a90', 'opacity=".45"') + E(113, 97, 8, 3, '#a88a90', 'opacity=".45"'),
  brows: 'M77 85Q86 79 95 77M105 77Q114 79 123 85', browC: '#6a6258',
  mouth: `<path d="M91 119Q100 114.5 110 119" stroke="#5a2a26" stroke-width="2.2"/>`,
  lines: `<path d="${WRINKLES}M84 66q16-5 32 0M86 72q14-4 28 0" stroke="#8a6a5e" stroke-width="1.2" opacity=".6"/>`,
  top:
    S('M70 60Q100 34 131 54M70 65Q100 40 132 60M72 55Q100 29 128 49M71 70Q100 47 132 66', '#6a6258', 1.7) +
    P('M82 56q-4 7 0 10 4-3 0-10zM120 62q-4 7 0 10 4-3 0-10zM72 76q-3 6 0 9 3-3 0-9zM126 100q-3 6 0 9 3-3 0-9z', '#bfe6ff', 'stroke="#fff" stroke-width=".6"') +
    S('M56 200Q60 170 62 148', '#4a8a3a', 4) + P('M60 176q-14-4-18-16 14 2 18 16z', '#4a8a3a') + lily(62, 142, 1.25, -8) +
    E(60, 186, 11, 9, '#ecd8ca') + S('M51 183q9-4 18 0M51 189q9-4 18 0', '#bfa193', 1.2),
});

A.av_c9_lou = bust('av_c9_lou', {
  bg: ['#8ff0f4', '#1f8a9e', '#06202a'], rim: '#d8fbff', cloth: '#11a0b8',
  clothIn:
    P('M80 146L100 172L120 146L128 152L110 182H90L72 152Z', '#0c7f95') + S('M100 172V200', '#0a6a7e', 2) + C(100, 184, 1.6, '#fff') + C(100, 194, 1.6, '#fff') +
    E(142, 178, 20, 10, '#fff') + tx(142, 180, 6.2, 'PETTIBONE', '#0c7f95', SANS, `${BOLD} ${MID} ${fit(32)}`) + tx(142, 185.5, 3.8, 'FAMILY CAR WASHES', '#0c7f95', SANS, `${MID} ${fit(30)}`) + C(127, 170, 3, '#fff', 'opacity=".8"') + C(132, 166, 2, '#fff', 'opacity=".8"'),
  skin: LOU, shade: LOU_D, iris: '#3a2a1e', lid: 87.4,
  overNeck: E(100, 130, 33, 15, LOU_D) + E(72, 108, 10, 16, LOU) + E(128, 108, 10, 16, LOU_D),
  inFace: P('M72 56Q86 42 104 42', 'none', 'stroke="#fff" stroke-width="5" opacity=".28" stroke-linecap="round"'),
  brows: 'M76 81Q86 76 96 81M104 81Q114 76 124 81', browC: '#f3f0e8',
  mouth: P('M82 114Q90 103 100 108.5Q110 103 118 114Q112 123 100 114.5Q88 123 82 114Z', '#f6f3ea', 'stroke="#cfcabc" stroke-width="1"') + `<path d="M92 120Q100 124 108 120" stroke="#2a130c" stroke-width="2.2"/>`,
  lines: `<path d="${CROWS}M82 62q18-6 36 0M84 69q16-5 32 0" stroke="#8a4a36" stroke-width="1.2" opacity=".55"/>`,
  top:
    P('M0 200L10 170H44L52 200Z', '#11a0b8') +
    G('rotate(-28 46 150)', `<rect x="18" y="138" width="62" height="24" rx="12" fill="#ecd9b0"/><rect x="18" y="138" width="36" height="24" rx="10" fill="#cfd6dc"/>` + S('M26 142l6 8-5 8M38 140l5 10-4 10M48 141l3 9', '#9aa4ad', 1.2) + E(78, 150, 4, 9, '#b8742a') + C(77, 147, 2, LETT)) +
    E(34, 164, 14, 11, LOU) + S('M24 160q10-5 20 0M24 167q10-5 20 0', LOU_D, 1.3) + R(20, 168, 9, 4.5, GOLD, 'rx="2"') + C(24.5, 170, 2.2, '#e23a3a') + R(22, 160, 8, 3.5, GOLD, 'rx="1.5"'),
});

A.av_c9_tommy = bust('av_c9_tommy', {
  bg: ['#c6d2ee', '#4a5a8a', '#0c1020'], rim: '#dfe8ff', cloth: '#18181c',
  clothIn:
    P('M82 146L100 180L118 146Z', '#f4f4f0') + P('M96 151h8l5 30-8 8-8-9z', '#0a0a0c', 'transform="rotate(6 100 150)"') + P('M82 146L100 180L92 200H66L60 153ZM118 146L100 180L108 200H134L140 153Z', '#222228') +
    S('M70 172q8-4 14 2M130 172q-8-4-14 2M66 184q10-4 18 2', '#000', 1.4, 'opacity=".5"'),
  skin: '#eebf9f', shade: '#c08c6c', iris: '#4a6a8a', low: 95.4,
  overNeck: E(100, 129, 31, 14, '#c08c6c') + E(72, 108, 9, 15, '#eebf9f') + E(128, 108, 9, 15, '#c08c6c'),
  inFace: E(78, 104, 8, 5, '#f08a8a', 'opacity=".35"') + E(122, 104, 8, 5, '#f08a8a', 'opacity=".3"'),
  brows: 'M76 86Q85 79 95 77M105 77Q115 79 124 86', browC: '#5a3a24',
  mouth: `<path d="M90 118q5-4.5 10 0t10 0" stroke="#2a130c" stroke-width="2.4"/>`,
  top:
    P('M66 74Q62 40 100 36Q138 40 134 74Q128 52 100 50Q72 52 66 74Z', '#5a3a24') +
    P('M83 96q-4 12 0 17 5-5 0-17zM117 96q-4 14 0 20 5-6 0-20z', '#9fd8ff', 'stroke="#fff" stroke-width=".7"') + C(90, 128, 2.2, '#9fd8ff') +
    `<rect x="26" y="182" width="148" height="18" rx="3" fill="#f6f1e6"/>` + S('M26 190H174', '#e2412f', 1.5, 'stroke-dasharray="6 6"') +
    [0, 1, 2, 3, 4, 5].map((i) => miniTaco(44 + i * 22.5, 172, 0.68) + E(44 + i * 22.5, 170, 6, 2.5, '#f6efe2')).join('') +
    E(26, 186, 11, 10, '#eebf9f') + E(174, 186, 11, 10, '#c08c6c'),
});

A.av_c9_marisol = bust('av_c9_marisol', {
  bg: ['#c8f4a8', '#3e8a4a', '#08180c'], rim: '#e2ffd0', cloth: '#2a2a30',
  clothIn:
    P('M74 152H126L132 200H68Z', '#2f9e4f') + S('M76 152L88 140M124 152L112 140', '#2f9e4f', 5) + C(100, 180, 13, '#eaffdc') +
    [-70, -35, 0, 35, 70].map((a) => `<path d="M100 188Q${a ? 97 : 96.5} 178 100 ${a ? 172 : 169}Q${a ? 103 : 103.5} 178 100 188Z" fill="#2f9e4f" transform="rotate(${a} 100 188)"/>`).join(''),
  back: P('M62 70Q56 120 54 166H82V100ZM138 70Q144 120 146 166H118V100Z', '#15121a') + P('M138 70Q144 120 146 166H136Q136 110 132 80Z', '#7a3ad0'),
  skin: '#c68e62', shade: '#935f3c', iris: '#2a160c', lidCover: 88.6,
  brows: 'M78 81H95M105 81H122', browC: '#15121a',
  mouth: P('M92 115.5Q100 113.5 109 115.5Q100 120 92 115.5Z', '#8a2a4a') + `<path d="M92 116H109" stroke="#3a0e1e" stroke-width="1.4"/>`,
  top:
    P('M64 92V62Q68 32 100 30Q132 32 136 62V92L129 72Q100 66 71 72Z', '#15121a') + S('M76 44Q100 32 124 44', '#3a3448', 1.6) +
    S('M96.5 108.5a3.8 3.8 0 1 0 7 0', '#d9dde2', 1.8) + C(67, 106, 4.5, 'none', 'stroke="#e8b830" stroke-width="1.6"') + C(133, 106, 4.5, 'none', 'stroke="#e8b830" stroke-width="1.6"'),
});

// ════════════════════════════════════════════════════════════════ SHARED PROPS
const TRUCK_OUT = 'M4 56H296C296 120 250 150 150 150C50 150 4 120 4 56Z';
const TRUCK_CAB = 'M258 80H316Q332 82 338 106V146H258Z';
/** The Munchie Wagon, side view, ≈345×175 local units (cab to the right). */
const truck = (o: { win?: string; dim?: number; lit?: boolean; rim?: string } = {}): string => {
  const r = rng(5);
  let frill = 'M4 62';
  for (let i = 0; i < 18; i++) frill += `q8 ${-n1(18 + r() * 14)} 16.2 0`;
  frill += 'Z';
  let scal = 'M82 62H218L226 78';
  for (let i = 0; i < 10; i++) scal += 'q-7.6 8-15.2 0';
  const wheel = (x: number): string => C(x, 150, 20, '#17171a') + C(x, 150, 9, '#a8aeb4') + C(x, 150, 3, '#55595e');
  return (
    E(170, 170, 175, 8, '#000', 'opacity=".32"') + R(50, 136, 270, 14, '#26262a') +
    P(TRUCK_CAB, '#ece6d6') + P('M296 86H315Q326 88 330 106H296Z', o.lit ? '#ffe9a0' : '#a6d8ee') + R(326, 138, 18, 9, '#8a8f94', 'rx="3"') + C(337, 124, 5, o.lit ? '#fffbe0' : '#fff2b0') +
    wheel(76) + wheel(292) +
    G('translate(0 -5)', P(frill, LETT_D)) +
    [28, 70, 118, 164, 212, 262].map((x, i) => C(x, 50 - (i % 2) * 4, 10, TOM) + C(x - 3, 47 - (i % 2) * 4, 3, '#ff8a70')).join('') +
    S('M44 46l10-10M96 44l8-12M140 46l10-9M188 44l9-11M238 46l8-10M280 48l6-8', CHEESE, 4) +
    P(TRUCK_OUT, SHELL) + P('M4 56C4 120 50 150 150 150C250 150 296 120 296 56C296 108 240 132 150 132C60 132 4 108 4 56Z', SHELL_D, 'opacity=".7"') +
    S('M14 66Q20 104 54 124', '#ffd08a', 4, 'opacity=".7"') + P(frill, LETT) +
    R(92, 66, 116, 40, '#2a1a12') + (o.win ?? '') + R(92, 66, 116, 40, 'none', 'stroke="#fff3d0" stroke-width="3"') +
    P(scal + 'Z', CHEESE) + P('M97 64l-5 14M123 64l-2 14M150 64v14M177 64l2 14M203 64l5 14', 'none', 'stroke="#fff" stroke-width="7" opacity=".8"') +
    R(86, 106, 128, 5, '#dfe5ea', 'rx="2"') +
    tx(150, 126, 15, 'THE MUNCHIE WAGON', '#fff8e0', SANS, `${BOLD} ${MID} ${fit(178)}`) + tx(150, 139, 8, "YOU'RE GONNA NEED A NAP", '#6a2e04', SANS, `${BOLD} ${MID} ${fit(128)}`) +
    (o.rim ? S('M30 34Q150 20 290 40', o.rim, 3, 'opacity=".8"') + S('M316 80Q332 82 338 106', o.rim, 2.5, 'opacity=".8"') : '') +
    (o.dim ? P(`${TRUCK_OUT}${TRUCK_CAB}M4 62H296V26H4Z`, '#070c26', `opacity="${o.dim}"`) + C(76, 150, 20, '#070c26', `opacity="${o.dim}"`) + C(292, 150, 20, '#070c26', `opacity="${o.dim}"`) : '')
  );
};

/** The Wishing Well: white satin box ≈128×100 local units, origin top-left of lid. */
const well = (plaque = true): string =>
  G('rotate(-14 30 0)', R(22, -22, 40, 26, '#f3e7c6', 'stroke="#c9b98e"')) + G('rotate(9 70 0)', R(52, -26, 42, 30, '#fbf3da', 'stroke="#c9b98e"')) + G('rotate(24 96 0)', R(82, -16, 36, 24, '#efe2bd', 'stroke="#c9b98e"')) +
  R(4, 14, 120, 86, '#f1eee6', 'rx="5"') + P('M4 30L60 100H30L4 66ZM70 14L124 80V100H110L44 14Z', '#fff', 'opacity=".55"') + P('M84 14H124V100H96Z', '#b9b3a4', 'opacity=".35"') +
  R(0, 0, 128, 20, '#fff', 'rx="5"') + R(0, 14, 128, 6, '#d8d2c2') + R(36, 5, 56, 6, '#8a6410', 'rx="3"') + R(36, 5, 56, 6, 'none', `rx="3" stroke="${GOLD}" stroke-width="2"`) +
  (plaque
    ? R(14, 40, 100, 40, GOLD, 'rx="3" stroke="#8a6410" stroke-width="1.5"') + tx(64, 56, 9.5, 'IN LOVING MEMORY', '#4a3204', SERIF, `${MID} ${fit(84)} font-style="italic"`) + tx(64, 72, 10.5, 'THE WISHING WELL', '#4a3204', SERIF, `${BOLD} ${MID} ${fit(88)} font-style="italic"`)
    : R(24, 44, 80, 30, GOLD, 'rx="3"') + S('M34 54H94M40 64H88', '#8a6410', 2));

/** Framed oil portrait of Big Lou in his car-wash polo, 110×140 local units. */
const louPortrait = (): string =>
  R(0, 0, 110, 140, '#8a6410') + R(3, 3, 104, 134, GOLD) + R(9, 9, 92, 122, '#7a5a10') + R(12, 12, 86, 116, '#16505c') + E(55, 62, 38, 48, '#2a8a96', 'opacity=".6"') +
  P('M14 128Q16 96 55 92Q94 96 96 128Z', '#11a0b8') + P('M44 94L55 108L66 94L55 90Z', '#0c7f95') + R(47, 78, 16, 18, LOU_D) +
  E(55, 60, 25, 28, LOU) + P('M57 32Q82 36 80 62Q78 84 57 88Z', LOU_D, 'opacity=".6"') + C(46, 56, 2.4, '#2a1a12') + C(64, 56, 2.4, '#2a1a12') + S('M41 50q5-3 9 0M60 50q5-3 9 0', '#fff', 2.4) +
  P('M39 71Q47 63 55 68Q63 63 71 71Q65 78 55 72Q45 78 39 71Z', '#f6f3ea') + S('M42 40Q52 33 62 35', '#fff', 3, 'opacity=".4"') + S('M12 12H98V128', '#fff', 1, 'opacity=".25"');

/** Pattern tile of golden tater tots. */
const totPat = (id: string, sc = 1): string =>
  `<pattern id="${id}" width="46" height="34" patternUnits="userSpaceOnUse" patternTransform="scale(${sc})"><rect width="46" height="34" fill="#8a5210"/>` +
  [[2, 2, 0], [25, 4, 14], [12, 18, -10], [34, 20, 6], [-11, 20, 6], [-20, 4, 14]].map(([x, y, a]) => `<rect x="${x}" y="${y}" width="20" height="13" rx="5.5" fill="${TOT}" stroke="${TOT_D}" transform="rotate(${a} ${x + 10} ${y + 6})"/><path d="M${x + 4} ${y + 4}h8" stroke="#ffd98a" stroke-width="2" stroke-linecap="round" transform="rotate(${a} ${x + 10} ${y + 6})"/>`).join('') +
  `</pattern>`;

/** Mid-distance stylised person. Feet at (0,0), ≈166 tall; head centre (0,-152). */
interface Fig {
  skin: string; top: string; legs: string;
  hair?: string; face?: string; w?: number; la?: number[]; ra?: number[];
  over?: string; under?: string; skirt?: string; rim?: string; shoes?: string; belly?: number; sleeve?: string;
}
const figHead = (o: Fig): string =>
  R(-4, -142, 8, 10, o.skin) + C(0, -152, 13, o.skin) + P('M1 -165A13 13 0 0 1 1 -139Z', '#000', 'opacity=".14"') +
  (o.rim ? S('M9 -162A13 13 0 0 1 9 -142', o.rim, 2.2, 'opacity=".9"') : '') +
  (o.face ?? C(-5, -153, 1.5, '#1a1318') + C(5, -153, 1.5, '#1a1318') + S('M-4 -146Q0 -144 4 -146', '#3a1a14', 1.5)) + (o.hair ?? '');
const figBody = (o: Fig, head = ''): string => {
  const w = o.w ?? 17, sl = o.sleeve ?? o.top;
  const arm = (sx: number, p: number[]): string => S(`M${sx} -127L${p[0]} ${p[1]}L${p[2]} ${p[3]}`, sl, 10) + C(p[2], p[3], 5.6, o.skin);
  return (
    (o.under ?? '') + E(0, 1, w + 12, 4, '#000', 'opacity=".3"') +
    (o.skirt
      ? R(-w / 2 - 3, -40, 6, 38, o.skin) + R(w / 2 - 3, -40, 6, 38, o.skin) + P(`M${-w + 2} -78H${w - 2}L${w + 3} -34H${-w - 3}Z`, o.skirt)
      : P(`M${-w + 1} -78H${w - 1}L${w - 2} -3H3L0 -52L-3 -3H${-w + 2}Z`, o.legs)) +
    E(-w / 2 - 1, -2, 9, 4, o.shoes ?? '#15151a') + E(w / 2 + 1, -2, 9, 4, o.shoes ?? '#15151a') +
    arm(-w + 2, o.la ?? [-w - 5, -100, -w - 3, -72]) +
    P(`M${-w} -131Q0 -138 ${w} -131L${w - 1} -72H${-w + 1}Z`, o.top) + (o.belly ? E(0, -92, w + o.belly, 26, o.top) : '') +
    P(`M2 -134Q0 -136 ${w} -131L${w - 1} -72H5Z`, '#000', 'opacity=".18"') +
    (o.rim ? S(`M${w} -130L${w - 1} -74`, o.rim, 2.4, 'opacity=".9"') : '') +
    head + arm(w - 2, o.ra ?? [w + 5, -100, w + 3, -72]) + (o.over ?? ''));
};
const fig = (x: number, y: number, s: number, o: Fig, flip = false): string =>
  G(`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`, figBody(o, figHead(o)));
const HCAP = 'M-13.5 -153Q-15 -168 0 -167Q15 -168 13.5 -153Q8 -162 0 -161Q-8 -162 -13.5 -153Z';
const SUITV = P('M-5 -134L0 -116L5 -134Z', '#f4f4f0') + P('M-1.5 -131h3l1 14-2.5 3-2.5-3z', '#0a0a0c');
/** Dewey from the chest up (head centre (0,-34), chest to y=62), no arms. */
const DEWBUST =
  P('M-40 62Q-44 6 0 0Q44 6 40 62Z', '#3f7f6a') + P('M-22 62V16H22V62Z', '#efe6cf') + S('M-22 16L-10 2M22 16L10 2', '#efe6cf', 5) +
  R(-8, -14, 16, 18, DEW_D) + C(0, -34, 25, DEW) + P('M2 -59A25 25 0 0 1 2 -9Z', DEW_D, 'opacity=".5"') +
  P('M-25 -30q-8 26 0 46 9-12 5-44zM25 -30q8 26 0 46-9-12-5-44z', DEWHAIR) + P('M-23 -28Q0 12 23 -28V-18Q0 6 -23 -18Z', DEWHAIR) + P('M-26 -36Q-28 -64 0 -62Q28 -64 26 -36Q14 -52 0 -50Q-14 -52 -26 -36Z', DEWHAIR) +
  P('M-26 -38Q0 -54 26 -38V-48Q0 -64 -26 -48Z', '#d8352a') + P('M25 -46l15-6-4 11 9 8-17-2z', '#b82a22') +
  S('M-15 -34h10M5 -34h10', '#1a1318', 2.6) + P('M-10 -22Q0 -8 10 -22Z', '#fff', 'stroke="#2a130c" stroke-width="1.5"') +
  S('M24 -60A25 25 0 0 1 24 -8M40 20V58', '#fff3c0', 3, 'opacity=".9"');
/** Faceless queue silhouette template (body colour inherited from <use fill>), feet at (0,0), ≈100 tall. */
const peepDef = (id: string, hair: string, skin: string, rim: string): string =>
  `<g id="${id}">` + E(0, 0, 20, 4, '#000', 'opacity=".25"') + `<path d="M-14 0V-62Q-14-78 0-78Q14-78 14-62V0H3V-34H-3V0Z"/>` + C(0, -89, 10.5, skin) + P('M-10.5-89A10.5 10.5 0 0 1 10.5-89Q0-96-10.5-89Z', hair) + S('M14-62V-6M8-96A10.5 10.5 0 0 1 8-82', rim, 2, 'opacity=".85"') + `</g>`;
/** Coloured string of market lights. */
const bulbs = (x1: number, y1: number, x2: number, y2: number, sag: number, n: number): string => {
  let s = S(`M${x1} ${y1}Q${(x1 + x2) / 2} ${(y1 + y2) / 2 + sag * 2} ${x2} ${y2}`, '#2a2018', 1.5);
  const cols = ['#ffd23f', '#ff5a4a', '#5fd0ff', '#7dff8a', '#ff8ad8'];
  for (let i = 1; i < n; i++) { const t = i / n; s += C(n1(x1 + (x2 - x1) * t), n1(y1 + (y2 - y1) * t + sag * 4 * t * (1 - t) + 4), 4.5, cols[i % 5]); }
  return s;
};
/** 7-segment digits as one path. */
const seg7 = (str: string, x: number, y: number, w: number, h: number, gap: number): string => {
  const M: Record<string, string> = { '0': 'abcdef', '1': 'bc', '3': 'abcdg', '5': 'acdfg', '8': 'abcdefg' };
  const t = n1(w * 0.2), v = n1(h / 2 - t * 1.5);
  let d = '';
  [...str].forEach((ch, i) => {
    const X = x + i * (w + gap);
    const seg: Record<string, [number, number, number, number]> = {
      a: [X + t, y, w - 2 * t, t], g: [X + t, y + h / 2 - t / 2, w - 2 * t, t], d: [X + t, y + h - t, w - 2 * t, t],
      f: [X, y + t, t, v], b: [X + w - t, y + t, t, v], e: [X, y + h / 2 + t / 2, t, v], c: [X + w - t, y + h / 2 + t / 2, t, v],
    };
    for (const sgm of M[ch] ?? '') { const [a, b, c2, e] = seg[sgm]; d += `M${n1(a)} ${n1(b)}h${n1(c2)}v${n1(e)}h${-n1(c2)}z`; }
  });
  return d;
};

// ════════════════════════════════════════════════════════════════ COVER
A.c9_cover = ((): string => {
  const k = 'c9_cover';
  const defs =
    lg(`${k}sky`, [[0, '#1a1238'], [0.45, '#6a2a5a'], [0.8, '#e2603a'], [1, '#ffb45a']]) +
    lg(`${k}wd`, [[0, '#8a3a1e'], [0.5, MAHOG], [1, '#2a0e08']]) + lg(`${k}ld`, [[0, '#b8552a'], [0.6, '#6a2a14'], [1, '#3a140a']]) +
    rg(`${k}hl`, [[0, '#fff6c0', 1], [0.3, '#ffd870', 0.6], [1, '#ffd870', 0]]) + rg(`${k}cold`, [[0, '#dff6ff', 0.95], [1, '#9fd8ff', 0]]) + bl(`${k}b`, 9) + bl(`${k}b2`, 3);
  const stones = [[40, 470, 1], [118, 452, 0.8], [200, 474, 1.1], [470, 468, 1], [548, 450, 0.85], [330, 446, 0.7]]
    .map(([x, y, s], i) => G(`translate(${x} ${y}) scale(${s})`, i % 3 === 1 ? P('M-5 0V-40H-16V-50H-5V-64H5V-50H16V-40H5V0Z', '#2a1a36') : P('M-16 0V-34Q-16 -52 0 -52Q16 -52 16 -34V0Z', '#2a1a36') + S('M14 -40Q14 -50 4 -52', '#ff9a5a', 1.6, 'opacity=".7"'))).join('');
  const lid = (d: string): string => P(d, `url(#${k}ld)`) + S(d.replace(/Z$/, ''), '#e8935a', 2, 'opacity=".5"');
  const body =
    R(0, 0, 600, 800, `url(#${k}sky)`) + C(120, 400, 150, '#ffd08a', `opacity=".35" filter="url(#${k}b)"`) +
    P('M0 250Q120 236 200 262T420 248T600 262V300H0Z', '#3a1a48', 'opacity=".6"') +
    P('M0 430Q150 380 300 356Q420 300 600 270V520H0Z', '#241232') +
    G('translate(392 204) scale(.5)', truck({ dim: 0.7 })) + C(566, 268, 46, `url(#${k}hl)`) + C(566, 268, 5, '#fffbe0') + P('M566 262L300 380V470L566 276Z', '#ffe9a0', 'opacity=".07"') +
    S('M70 420V300Q60 270 36 250M70 330Q90 290 116 284M70 362Q50 340 30 338M70 300Q74 262 96 240', '#1a0c22', 6) +
    P('M0 520Q300 440 600 500V800H0Z', '#1c1a26') + stones + P('M0 540Q300 470 600 520V800H0Z', '#16301e') +
    // grave + lowering frame
    P('M20 676H580L600 760H0Z', '#0a0608') + P('M20 676H580L586 700H14Z', '#3a2418') +
    P('M0 728Q80 690 170 726L190 800H0Z', '#4a2e1c') + P('M0 752Q70 722 150 750', 'none', 'stroke="#6a4428" stroke-width="3"') +
    // casket
    P('M52 574H548L536 664H64Z', `url(#${k}wd)`) + P('M52 574H548L546 590H54Z', '#2a0e08', 'opacity=".6"') + S('M70 600H530M74 648H526', '#c06a3a', 1.5, 'opacity=".5"') +
    R(108, 618, 384, 7, GOLD, 'rx="3.5"') + [118, 240, 360, 478].map((x) => R(x - 5, 608, 10, 20, '#b8860b', 'rx="3"')).join('') + S('M112 620H488', '#fff6c0', 1.5, 'opacity=".7"') +
    lid('M56 574Q60 548 96 542Q230 522 392 528L396 574Z') +
    P('M396 574L548 574L552 552L400 540Z', '#070308') + E(486, 562, 70, 16, `url(#${k}cold)`) +
    G('rotate(-7 398 572)', lid('M398 574L396 528Q470 530 512 542Q544 548 548 574Z')) +
    // drumstick
    G('translate(532 546) rotate(-40) scale(1.45)', R(10, -5, 44, 10, '#f4f0e4', 'rx="4"') + C(54, -6, 6.5, '#f4f0e4') + C(54, 5, 6.5, '#f4f0e4') + E(0, 0, 26, 17, '#d8bfb2') + P('M-24 -4Q-10 -18 16 -12Q0 -10 -24 -4Z', '#eef8ff', 'opacity=".85"') + S('M-14 6l5 3M2 8l5 1M-6 -2l4 2', '#b89a8e', 1.6) + S('M-18 -16l3 5M-2 -22v6M14 -18l-3 5', '#fff', 1.6)) +
    // straps + rails
    R(150, 540, 22, 130, '#15151a', 'opacity=".9"') + R(430, 566, 22, 104, '#15151a', 'opacity=".9"') + R(14, 664, 572, 12, '#cfd6dc', 'rx="5"') + R(14, 664, 572, 4, '#fff', 'opacity=".6" rx="2"') + C(30, 670, 9, '#8a9098') + C(570, 670, 9, '#8a9098') +
    // lily on lid
    S('M150 540Q210 528 262 532', '#3c8a26', 4) + P('M196 532q8-14 24-12-8 12-24 12z', '#3c8a26') + lily(272, 528, 1.5, 60) +
    // mist
    G('translate(0 0)', E(520, 520, 70, 26, '#dff4ff', 'opacity=".5"') + E(470, 470, 50, 30, '#dff4ff', 'opacity=".32"') + E(540, 440, 40, 34, '#dff4ff', 'opacity=".22"') + E(440, 600, 90, 18, '#dff4ff', 'opacity=".3"'), `filter="url(#${k}b)"`) +
    S('M500 548Q470 520 500 496Q528 474 500 450Q480 432 496 410M546 530Q574 506 552 480Q536 458 558 436', '#eefaff', 3, `opacity=".55" filter="url(#${k}b2)"`) +
    C(470, 574, 2, '#fff') + C(510, 590, 1.6, '#fff') + C(420, 584, 1.6, '#fff') + P('M0 760Q300 740 600 764V800H0Z', '#0e2014');
  return frame(k, 600, 800, defs, body, 0.18, 0.6);
})();

// ════════════════════════════════════════════════════════════════ WALLPAPERS
A.c9_wall_lock = ((): string => {
  const k = 'c9_wall_lock';
  const defs =
    lg(`${k}sky`, [[0, '#070a1c'], [0.7, '#1a1a44'], [1, '#4a2a4a']]) + lg(`${k}dash`, [[0, '#4a4038'], [0.12, '#2a2420'], [1, '#12100e']]) +
    lg(`${k}lcd`, [[0, '#b4c4a2'], [1, '#98a888']]) + lg(`${k}cb`, [[0, '#ded7c2'], [1, '#b4ad98']]) +
    rg(`${k}glow`, [[0, '#ffb45a', 0.55], [1, '#ffb45a', 0]]) + bl(`${k}b`, 10) + bl(`${k}sh`, 6) + `<rect id="${k}key" width="56" height="34" rx="6" stroke="#15171a" stroke-width="2"/>`;
  const keys = ['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '−', '0', '.', '=', '+'];
  let kp = '', kt = '';
  keys.forEach((c, i) => {
    const x = 170 + (i % 4) * 68, y = 742 + Math.floor(i / 4) * 46;
    kp += `<use href="#${k}key" x="${x}" y="${y}"${i % 4 === 3 ? ' fill="#c8502a"' : c === '=' ? ' fill="#3a6a8a"' : ''}/>`;
    kt += `<text x="${x + 28}" y="${y + 24}">${c}</text>`;
  });
  kp = `<g fill="#3a3f48">${kp}</g><g ${SANS} font-size="21" font-weight="bold" text-anchor="middle" fill="#f4f0e4">${kt}</g>`;
  const note = (x: number, y: number, w: number, h: number, c: string, rot: number, inner: string): string =>
    G(`rotate(${rot} ${x + w / 2} ${y + h / 2})`, R(x + 5, y + 7, w, h, '#000', `opacity=".4" filter="url(#${k}sh)"`) + R(x, y, w, h, c) + P(`M${x} ${y}h${w}v16h${-w}z`, '#000', 'opacity=".07"') + P(`M${x + w} ${y + h}l-26 0l26 -22z`, '#000', 'opacity=".12"') + inner);
  const INK = '#1a1a2a';
  const leaf = [-78, -52, -26, 0, 26, 52, 78].map((a) => `<path d="M0 0Q-9-26 0-${a ? 62 - Math.abs(a) * 0.36 : 66}Q9-26 0 0Z" fill="#3aa84a" stroke="#1e6a2a" stroke-width="1.5" transform="rotate(${a})"/>`).join('');
  const body =
    R(0, 0, 600, 600, `url(#${k}sky)`) +
    [[60, 380, 20, '#ffb45a'], [150, 420, 12, '#ffd28a'], [250, 390, 16, '#ff7a5a'], [420, 410, 22, '#ffb45a'], [520, 370, 14, '#8ad8ff']]
      .map(([x, y, r, c]) => C(x as number, y as number, r as number, c as string, `opacity=".5" filter="url(#${k}b)"`)).join('') +
    P('M0 470H600V600H0Z', '#0a0a14', 'opacity=".7"') +
    // the truck's own awning, seen from inside (lettering reversed)
    G('translate(600 0) scale(-1 1)', P('M0 40H600V96' + 'q-15 14-30 0'.repeat(20) + 'Z', CHEESE, 'opacity=".16"') + tx(300, 84, 34, 'THE MUNCHIE WAGON', '#fff3d0', SANS, `${BOLD} ${MID} ${fit(440)} opacity=".2"`)) +
    P('M0 0H600V46Q300 26 0 46Z', '#0c0a0a') + P('M0 0H44L20 600H0ZM600 0H556L580 600H600Z', '#0c0a0a') +
    // mirror + air freshener
    R(284, 30, 32, 26, '#15131a') + R(208, 50, 184, 54, '#1c1a22', 'rx="14"') + R(216, 57, 168, 40, '#3a3a5a', 'rx="9"') + P('M226 60H300L270 94H222Z', '#6a6a9a', 'opacity=".5"') +
    S('M318 104Q326 180 340 232', '#d8d2c0', 1.6) + G('translate(344 322) rotate(8)', R(-3, -4, 6, 22, '#1e6a2a') + leaf + C(0, -70, 3, '#12100e')) +
    // dashboard
    P('M0 566Q300 520 600 566V1300H0Z', `url(#${k}dash)`) + S('M0 566Q300 520 600 566', '#8a7a68', 3, 'opacity=".8"') + E(420, 640, 300, 150, `url(#${k}glow)`) +
    S('M40 1226h150M40 1246h150M40 1266h150M410 1226h150M410 1246h150M410 1266h150', '#0a0908', 8) +
    // bobblehead taco
    G('translate(78 600)', E(0, 40, 44, 10, '#000', 'opacity=".4"') + R(-30, 22, 60, 16, '#c8202a', 'rx="5"') + S('M0 22q-7-4 0-8t0-8 0-8', '#cfd6dc', 3) +
      G('rotate(-9 0 -10)', P('M-42 -34q6-22 16-6 6-22 18-4 8-20 18 2 10-16 16 6z', LETT) + C(-18, -40, 7, TOM) + C(16, -42, 7, TOM) + P('M-46 -30a46 42 0 0 0 92 0z', SHELL) + P('M-46 -30a46 42 0 0 0 92 0q-10 28-46 28t-46-28z', SHELL_D, 'opacity=".5"') +
        C(-14, -14, 9, '#fff') + C(14, -14, 9, '#fff') + C(-12, -12, 4, '#111') + C(16, -15, 4, '#111') + P('M-12 0Q0 12 14 -1Q0 4 -12 0Z', '#5a1420'))) +
    // parking ticket
    G('rotate(13 516 660)', R(470, 596, 96, 136, '#000', `opacity=".4" filter="url(#${k}sh)"`) + R(466, 590, 96, 136, '#ff8a3a') + R(466, 590, 96, 30, '#c8501a') + tx(514, 603, 10.5, 'PARKING', '#fff', SANS, `${BOLD} ${MID} ${fit(70)}`) + tx(514, 615, 10.5, 'VIOLATION', '#fff', SANS, `${BOLD} ${MID} ${fit(76)}`) +
      S('M478 636H550M478 650H550M478 664H530M478 678H550', '#7a3008', 2, 'opacity=".6"') + tx(514, 712, 22, '$85', '#7a1008', MONO, `${BOLD} ${MID}`)) +
    // calculator
    G('rotate(-1.5 300 765)', R(158, 610, 300, 334, '#000', `opacity=".5" rx="20" filter="url(#${k}sh)"`) + R(150, 600, 300, 334, `url(#${k}cb)`, 'rx="18"') + R(150, 600, 300, 334, 'none', 'rx="18" stroke="#fff" stroke-width="2" opacity=".4"') +
      R(164, 614, 272, 104, '#22262a', 'rx="10"') + R(174, 624, 252, 84, `url(#${k}lcd)`, 'rx="5"') +
      G('skewX(-5) translate(60 0)', P(seg7('5318008', 182, 638, 26, 56, 8), '#141c10')) +
      R(176, 722, 70, 12, '#4a2a3a', 'rx="2"') + S('M190 722v12M204 722v12M218 722v12M232 722v12', '#2a1420', 1.5) + tx(424, 733, 11, 'SOLAR-8', '#6a6452', SANS, `${BOLD} text-anchor="end"`) + kp) +
    G('rotate(-32 160 606)', R(118, 594, 84, 26, '#e8dcb0', 'opacity=".75"')) + G('rotate(28 440 606)', R(398, 594, 84, 26, '#e8dcb0', 'opacity=".75"')) +
    // sticky notes
    note(112, 952, 376, 102, '#ffe45a', -2, tx(300, 994, 31, 'BOOBIES — still funny', INK, HAND, `${BOLD} ${MID} ${fit(336)}`) + tx(300, 1034, 28, '— D, age 15', INK, HAND, `${MID} ${fit(170)}`)) +
    note(22, 1082, 272, 86, '#ff9ecb', 3, tx(158, 1138, 32, '0.7734 = hELLO', INK, HAND, `${BOLD} ${MID} ${fit(236)}`)) +
    note(312, 1092, 270, 112, '#9ff0a0', -3, tx(447, 1138, 32, '0208 = BOZO', INK, HAND, `${BOLD} ${MID} ${fit(214)}`) + tx(447, 1180, 26, '(spatula)', INK, HAND, `${MID} ${fit(120)}`));
  return frame(k, 600, 1300, defs, body, 0.16, 0.5);
})();

A.c9_wall_home = ((): string => {
  const k = 'c9_wall_home';
  const defs =
    lg(`${k}sky`, [[0, '#ff8a4a'], [0.5, '#ffc45a'], [1, '#ffe9a0']]) + lg(`${k}gd`, [[0, '#c98a4a'], [1, '#6a3a2a']]) +
    rg(`${k}sun`, [[0, '#fff8d0', 1], [0.25, '#ffe08a', 0.7], [1, '#ffc45a', 0]]) + bl(`${k}b`, 8) +
    peepDef(`${k}p0`, '#1c1410', DEW, '#fff3c0') + peepDef(`${k}p1`, '#e6c24a', '#f0c4a4', '#fff3c0') + peepDef(`${k}p2`, '#2a1a36', SPAT, '#fff3c0');
  const r = rng(11);
  const cols = ['#e2412f', '#2f7fe0', '#19a974', '#8a4ad8', '#ff5aa0', '#f39a2b', '#1fb8c8', '#d8d22f'];
  let q = '';
  const pts: [number, number, number][] = [];
  for (let i = 0; i < 20; i++) { const t = i / 19; pts.push([n1(330 + Math.sin(t * 5.2) * (60 + t * 150) + t * -30), n1(872 + Math.pow(t, 1.25) * 380), n1(0.62 + t * 1.25)]); }
  pts.forEach(([x, y, s], i) => { q += `<use href="#${k}p${(i * 2 + Math.floor(r() * 2)) % 3}" fill="${cols[(i * 3) % 8]}" transform="translate(${x} ${y}) scale(${s})"/>`; });
  const tent = (x: number, y: number, s: number, c: string): string => G(`translate(${x} ${y}) scale(${s})`, R(-56, 0, 4, 80, '#6a5a4a') + R(52, 0, 4, 80, '#6a5a4a') + P('M-64 2L0 -40L64 2Z', c) + P('M0 -40L64 2H20Z', '#000', 'opacity=".15"') + P('M-64 2H64V12' + 'q-8 8-16 0'.repeat(8) + 'Z', '#fff'));
  const dewey =
    G('translate(244 664) scale(.66)', DEWBUST +
      // tray of tots cradled like a newborn
      G('rotate(-12 0 52)', R(-64, 36, 128, 30, '#cfd6dc', 'rx="6"') + P('M-60 40Q-50 14-20 20Q0 6 24 18Q52 12 60 40Z', TOT, `stroke="${TOT_D}" stroke-width="2"`) + S('M-44 30q8-8 16 0M-14 24q8-8 16 0M16 28q8-8 16 0M-30 38q8-6 16 0M2 36q8-6 16 0M34 38q6-5 12 0', TOT_D, 2.5) + R(-64, 58, 128, 8, '#8a9098', 'rx="4"')) +
      S('M-40 20Q-66 44 -46 68L-10 74', '#3f7f6a', 15) + S('M40 20Q70 34 56 54L20 66', '#3f7f6a', 15) + C(-8, 74, 10, DEW) + C(20, 66, 10, DEW));
  const body =
    R(0, 0, 600, 1300, `url(#${k}sky)`) + C(470, 420, 330, `url(#${k}sun)`) + C(470, 420, 46, '#fffbe6') +
    P('M0 580Q80 520 150 570Q230 520 300 572Q400 520 470 570Q540 540 600 566V720H0Z', '#5a4a22', 'opacity=".7"') +
    tent(70, 640, 1.3, '#e2412f') + tent(540, 650, 1.2, '#2f9e8a') +
    R(0, 716, 600, 584, `url(#${k}gd)`) + P('M0 716H600V740H0Z', '#ffe9a0', 'opacity=".25"') +
    bulbs(0, 480, 300, 540, 14, 9) + bulbs(300, 540, 600, 470, 14, 9) +
    G('translate(18 532) scale(1.64)', truck({ rim: '#fff6c8' })) + dewey +
    P('M150 820L330 820L260 1300H-60Z', '#000', 'opacity=".12"') + q +
    R(0, 0, 600, 1300, '#ff8a2a', 'opacity=".1"');
  return frame(k, 600, 1300, defs, body, 0.15, 0.45);
})();

// ════════════════════════════════════════════════════════════════ MAP
A.c9_map = ((): string => {
  const k = 'c9_map';
  const defs = lg(`${k}lake`, [[0, '#2f7fa8'], [1, '#174a6a']], 1, 1) + lg(`${k}land`, [[0, '#e9dfc2'], [1, '#d6c9a2']], 1, 1) + bl(`${k}b`, 4);
  const SHORE = 'M700 0C660 120 636 250 650 340C664 420 736 432 746 500C752 550 722 580 730 600';
  let blocks = '';
  for (let i = 0; i < 6; i++) for (let j = 0; j < 5; j++) {
    if ((i === 3 && j === 0) || (i === 5 && j > 2)) continue;
    blocks += `M${196 + i * 40 + j * 4} ${218 + j * 40 - i * 3}h30v30h-30z`;
  }
  blocks = P(blocks, '#cbbc96', 'transform="rotate(-4 300 300) translate(-6 8)"');
  const body =
    R(0, 0, 800, 600, `url(#${k}land)`) +
    // ridge
    P('M250 0Q300 70 420 96Q540 120 640 60L672 0Z', '#b9c48a') + P('M300 0Q340 50 430 70Q530 86 600 40L620 0Z', '#a4b476') + S('M270 20Q330 96 430 112Q560 132 656 70M340 0Q380 40 440 52Q520 60 570 20', '#8a9a5e', 1.4, 'opacity=".7"') +
    // parks / woods
    P('M0 440Q80 420 130 470Q150 540 90 600H0Z', '#b9c98a') + P('M520 240Q590 220 640 270Q650 330 630 380Q560 390 520 340Z', '#a9bd7c') +
    [[540, 270], [570, 300], [600, 262], [548, 330], [596, 350], [40, 500], [80, 540], [30, 560], [100, 486]].map(([x, y]) => C(x, y, 11, '#7fa05a') + C(x - 3, y - 3, 5, '#9aba72')).join('') +
    // lake
    P(SHORE + 'L800 600V0Z', `url(#${k}lake)`) + S(SHORE, '#f4ecd0', 7) + S(SHORE, '#8a7a4a', 1.2) +
    S('M720 120q14-8 28 0t28 0M700 230q14-8 28 0t28 0M740 330q12-7 24 0t24 0M764 470q10-6 20 0M740 560q12-7 24 0', '#8ac8e6', 2, 'opacity=".7"') +
    // cliff under the overlook
    S('M642 290C640 320 646 350 656 372', '#6a5a3a', 5, 'stroke-dasharray="2 5"') +
    // streets
    blocks +
    S('M180 214L430 196M176 254L440 236M172 294L446 276M170 334L450 316M168 374L452 356M166 414L456 396M190 210L206 430M230 207L246 427M270 204L286 424M310 201L326 421M350 198L366 418M390 195L406 415M430 192L446 412', '#fff', 5) +
    S('M96 180Q150 190 190 214M176 372Q150 380 110 372T0 380M240 480Q250 440 246 427M240 480Q160 500 130 600M240 480Q340 500 420 560T520 600', '#fff', 5) +
    // Ridgecrest Dr winding up to the mansion and cemetery
    S('M350 198Q360 150 410 150Q470 160 464 132M410 150Q380 110 384 72M384 72Q420 40 470 30', '#fff', 5) +
    // overlook road + lakeshore
    S('M446 276Q520 300 560 320T608 336M608 336Q640 400 690 440', '#fff', 5) +
    // highway
    S('M0 96C120 110 150 250 160 330C172 430 300 470 440 470C560 470 640 470 720 452C760 444 780 520 760 600', '#8a6a1a', 13) + S('M0 96C120 110 150 250 160 330C172 430 300 470 440 470C560 470 640 470 720 452C760 444 780 520 760 600', '#ffcf4a', 9) +
    S('M0 96C120 110 150 250 160 330C172 430 300 470 440 470C560 470 640 470 720 452', '#fff', 1.5, 'stroke-dasharray="10 10"') +
    G('translate(330 490)', P('M-13 -12H13V2Q13 12 0 16Q-13 12 -13 2Z', '#fff', 'stroke="#1a1a1a" stroke-width="2"') + tx(0, 6, 15, '9', '#1a1a1a', SANS, `${BOLD} ${MID}`)) +
    // ── places (icons only, no labels)
    // Chef's Depot (warehouse)
    G('translate(96 180)', R(-26, -14, 52, 28, '#c8502a') + P('M-26 -14l8-8h36l8 8z', '#8a3018') + R(-18, -2, 12, 16, '#f4ecd0') + R(2, -2, 12, 16, '#f4ecd0') + R(-40, 18, 80, 10, '#b4a480', 'opacity=".7"')) +
    // commissary kitchen
    G('translate(176 372)', R(-20, -12, 40, 24, '#cfd6dc', 'stroke="#7d8891" stroke-width="1.5"') + R(8, -24, 7, 14, '#7d8891') + C(13, -30, 5, '#fff', 'opacity=".8"') + C(18, -38, 4, '#fff', 'opacity=".6"') + S('M-12 -3v10M-15 -3v4h6v-4M0 -3v10M0 -3q5 2 0 6', '#55595e', 1.6)) +
    // Bellweather Funeral Home
    G('translate(320 252)', R(-24, -12, 48, 26, '#3a3440') + P('M-28 -12L0 -30L28 -12Z', '#1c1820') + R(-18, -12, 3, 26, '#f4f4f0') + R(-7, -12, 3, 26, '#f4f4f0') + R(4, -12, 3, 26, '#f4f4f0') + R(15, -12, 3, 26, '#f4f4f0') + lily(0, -19, 0.36) + R(30, 4, 22, 10, '#15151a', 'rx="3"') + C(35, 15, 3, '#55595e') + C(47, 15, 3, '#55595e')) +
    // Pettibone mansion with fountain
    G('translate(464 132)', R(-34, -18, 68, 14, '#f4ecd0', 'stroke="#b8a070"') + P('M-38 -18L-22 -32H22L38 -18Z', '#c8502a') + P('M-10 -18V-36L0 -44L10 -36V-18Z', '#fff8e0', 'stroke="#b8a070"') + R(-30, -14, 6, 8, '#6aa8c8') + R(-20, -14, 6, 8, '#6aa8c8') + R(14, -14, 6, 8, '#6aa8c8') + R(24, -14, 6, 8, '#6aa8c8') +
      C(0, 12, 13, '#f4ecd0', 'stroke="#b8a070" stroke-width="2"') + C(0, 12, 9, '#6ac0e6') + S('M0 12V2M0 3q-6 2-6 8M0 3q6 2 6 8', '#fff', 1.6) + R(26, 2, 20, 9, '#fff', 'rx="3" stroke="#999"')) +
    // St. Brendan's Cemetery
    G('translate(384 72)', E(0, 4, 42, 24, '#8fae6a') + S('M-40 4a40 22 0 0 1 80 0', '#55595e', 1.5, 'stroke-dasharray="3 3"') +
      [[-24, 6], [-8, 12], [8, 4], [24, 10], [-16, -6], [2, -10], [18, -6]].map(([x, y], i) => i % 3 ? P(`M${x - 4} ${y}v-7q0-4 4-4t4 4v7z`, '#e9e6de', 'stroke="#8a8a84"') : S(`M${x} ${y}v-12M${x - 4} ${y - 8}h8`, '#6a6a66', 2.4)).join('')) +
    // Spatula's apartment
    G('translate(240 480)', R(-16, -26, 32, 44, '#b87a5a', 'stroke="#7a4a30" stroke-width="1.5"') + [0, 1, 2].map((i) => R(-11, -21 + i * 12, 8, 7, '#ffe9a0') + R(3, -21 + i * 12, 8, 7, i === 1 ? '#3a3a4a' : '#ffe9a0')).join('') + R(20, 8, 20, 7, '#e2412f', 'rx="3"') + P('M22 8l4-5h8l-2 5z', '#e2412f')) +
    // Scenic overlook (cliff-edge gravel lot)
    G('translate(608 336)', P('M-30 -12Q0 -24 30 -10L34 12Q0 20 -32 12Z', '#c9bfa4', 'stroke="#8a7a4a" stroke-width="1.5"') + S('M-22 12Q6 20 34 12', '#6a5a3a', 3, 'stroke-dasharray="4 3"') + R(16, -10, 3, 14, '#6a4a2a') + R(8, -14, 18, 8, '#7a4a1e') + P('M-20 -4a9 8 0 0 0 18 0z', SHELL, 'stroke="#8a4a0a"') + P('M-20 -4q4-6 9-1 4-6 9 1z', LETT)) +
    // Lakeshore Motor Inn
    G('translate(704 444)', R(-34, -8, 60, 16, '#e8d8b8', 'stroke="#8a7a5a"') + P('M-38 -8H30V-14H-38Z', '#b83a5a') + [0, 1, 2, 3, 4, 5].map((i) => R(-31 + i * 10, -4, 5, 12, '#6a4a3a')).join('') + R(30, -34, 3, 42, '#55595e') + R(20, -42, 24, 14, '#1a1030', 'rx="3"') + R(22, -40, 20, 10, 'none', 'rx="2" stroke="#ff4fa3" stroke-width="2"') + C(32, -35, 12, '#ff4fa3', `opacity=".5" filter="url(#${k}b)"`)) +
    // compass
    G('translate(60 60)', C(0, 0, 26, '#f4ecd0', 'stroke="#8a7a4a" stroke-width="2"') + P('M0 -20L6 0H-6Z', '#c8202a') + P('M0 20L6 0H-6Z', '#55595e') + tx(0, -30, 13, 'N', '#55492a', SERIF, `${BOLD} ${MID}`)) +
    R(6, 6, 788, 588, 'none', 'stroke="#8a7a4a" stroke-width="2" opacity=".5"');
  return frame(k, 800, 600, defs, body, 0.12, 0.3);
})();

// ════════════════════════════════════════════════════════════════ PHOTOS
A.c9_ph_truck = ((): string => {
  const k = 'c9_ph_truck';
  const defs = lg(`${k}sky`, [[0, '#2f9ee6'], [1, '#bfeaff']]) + lg(`${k}gd`, [[0, '#d8c48a'], [1, '#a08a58']]) + rg(`${k}sun`, [[0, '#fff', 0.9], [1, '#fff', 0]]);
  const tree = (x: number, y: number, s: number): string => G(`translate(${x} ${y}) scale(${s})`, R(-6, -40, 12, 60, '#6a4a2a') + C(0, -70, 44, '#3c9a3a') + C(-26, -50, 28, '#2f8a34') + C(26, -54, 30, '#4aae42') + C(-8, -84, 20, '#6ac85a'));
  const tent = (x: number, c: string): string => G(`translate(${x} 318)`, P('M-70 2L0 -44L70 2Z', c) + P('M0 -44L70 2H24Z', '#000', 'opacity=".15"') + P('M-70 2H70V14' + 'q-7 8-14 0'.repeat(10) + 'Z', '#fff') + R(-62, 14, 4, 80, '#8a8a8a') + R(58, 14, 4, 80, '#8a8a8a'));
  const dewey = G('translate(392 321) scale(.74)',
    S('M-38 22Q-70 0 -72 -40', '#3f7f6a', 16) + C(-72, -44, 10, DEW) + S('M-76 -48L-92 -92M-68 -50L-74 -96', '#cfd6dc', 5) + S('M-76 -48L-92 -92', '#fff', 1.5) + DEWBUST + S('M40 22Q58 40 50 60', '#3f7f6a', 16));
  const body =
    R(0, 0, 800, 420, `url(#${k}sky)`) + C(690, 70, 150, `url(#${k}sun)`) + E(170, 90, 90, 22, '#fff', 'opacity=".8"') + E(230, 74, 60, 20, '#fff', 'opacity=".8"') + E(520, 130, 70, 16, '#fff', 'opacity=".6"') +
    tree(40, 380, 1.5) + tree(760, 390, 1.7) + tree(430, 360, 1.1) + tent(120, '#e2412f') + tent(700, '#ffd23f') +
    R(0, 400, 800, 200, `url(#${k}gd)`) + P('M0 400H800V416H0Z', '#fff', 'opacity=".2"') +
    bulbs(0, 150, 400, 190, 16, 9) + bulbs(400, 190, 800, 140, 16, 9) +
    G('translate(40 150) scale(1.95)', truck({ rim: '#fff' })) + dewey +
    fig(66, 566, 1.5, { skin: SPAT, top: '#8a4ad8', legs: '#2a3a6a', hair: P(HCAP, '#1c1410'), rim: '#fff', ra: [30, -110, 40, -138], face: C(3, -153, 1.5, '#1a1318') + C(9, -153, 1.5, '#1a1318') + S('M2 -146Q6 -143 10 -147', '#3a1a14', 1.5) }) +
    // chalkboard A-frame
    G('translate(644 296) rotate(3)', P('M-8 270L6 -6H150L164 270H146L138 232H18L10 270Z', '#7a4a1e') + R(8, 4, 140, 220, '#1e2a26') + R(8, 4, 140, 220, 'none', 'stroke="#a8743a" stroke-width="5"') +
      S('M26 40H130', '#ffd23f', 2) + `<g ${HAND} font-size="20" font-weight="bold" text-anchor="middle">` +
      tx(78, 32, 17, '~ TODAY ~', '#ffd23f', HAND, fit(90)) + ['LOADED TOTS', 'BIRRIA', 'ELOTE CUPS', 'CHURRO BITES'].map((t, i) => `<text x="78" y="${78 + i * 42}" fill="${['#fff', '#ff9a8a', '#bfffb0', '#ffe9a0'][i]}" ${fit(t.length * 10 + 8)}>${t}</text>`).join('') + '</g>');
  return frame(k, 800, 600, defs, body, 0.14, 0.4);
})();

A.c9_ph_sizzle = ((): string => {
  const k = 'c9_ph_sizzle';
  const defs = lg(`${k}sky`, [[0, '#9ab8c8'], [1, '#e2dcc4']]) + lg(`${k}van`, [[0, '#e6e8ea'], [0.5, '#b8bec4'], [1, '#868c94']]);
  const perm = [[-12, -158], [-6, -166], [4, -167], [12, -160], [15, -150], [-15, -149], [-14, -140], [14, -141]].map(([x, y]) => C(x, y, 6.5, '#b88a4a')).join('');
  const body =
    R(0, 0, 800, 600, `url(#${k}sky)`) + P('M0 330Q200 300 400 320T800 300V470H0Z', '#7a9a6a') + R(0, 440, 800, 160, '#9a9488') + P('M0 440H800V452H0Z', '#c4beb0') +
    R(0, 250, 150, 200, '#b0a090') + R(20, 280, 40, 50, '#6a7a8a') + R(84, 280, 40, 50, '#6a7a8a') +
    // the plain silver step van
    E(470, 536, 330, 14, '#000', 'opacity=".3"') + R(188, 130, 492, 380, `url(#${k}van)`, 'rx="12"') + P('M680 250H742Q766 254 770 290V510H680Z', '#c4cad0') + P('M690 262H738Q754 266 758 300V340H690Z', '#6a8aa0') + P('M690 262H720L700 340H690Z', '#fff', 'opacity=".25"') +
    R(180, 488, 600, 24, '#3a3e44', 'rx="6"') + C(300, 512, 40, '#17171a') + C(300, 512, 17, '#8a9098') + C(690, 512, 40, '#17171a') + C(690, 512, 17, '#8a9098') + C(772, 440, 9, '#ffe9a0') +
    S('M188 180H680M188 440H680', '#8a9098', 2) + R(204, 300, 150, 110, '#3a3430') + R(204, 300, 150, 110, 'none', 'stroke="#6a7078" stroke-width="5"') + P('M196 300H362L374 268H184Z', '#a8aeb4') + R(198, 410, 162, 8, '#d8dce0') +
    // hand-painted lettering
    G('rotate(-3 520 280)', tx(524, 304, 104, 'SIZZLE', '#7a1408', HAND, `${BOLD} ${MID} ${fit(296)}`) + tx(520, 300, 104, 'SIZZLE', '#e2412f', HAND, `${BOLD} ${MID} ${fit(296)}`) + S('M380 322Q520 340 664 316', '#ffb02a', 7) + P('M404 304v26q2 6 4 0v-26zM588 306v34q2 6 4 0v-34z', '#e2412f') +
      P('M650 214q14-22 2-40 22 12 20 36 8-6 6-16 14 22-4 38-20 8-24-18z', '#ffb02a') + P('M660 224q6-10 2-20 10 8 8 20-6 6-10 0z', '#e2412f')) +
    tx(520, 398, 28, 'tacos + stuff', '#3a3e44', HAND, `${MID} ${fit(170)} transform="rotate(-2 520 398)"`) +
    // young Dewey (bowl cut) + Mom with the laminated menu
    fig(110, 566, 2.05, { skin: DEW, top: '#4aa86a', legs: '#3a5a8a', w: 13, rim: '#fff8e0', hair: P('M-14.5 -150Q-17 -169 0 -168Q17 -169 14.5 -150Q0 -158 -14.5 -150Z', DEWHAIR), la: [-28, -112, -34, -140], face: C(-5, -152, 1.6, '#1a1318') + C(5, -152, 1.6, '#1a1318') + P('M-6 -146Q0 -138 6 -146Z', '#fff', 'stroke="#2a130c" stroke-width="1"'), over: R(-37, -152, 6, 10, DEW, 'rx="3"') }) +
    fig(244, 566, 1.9, { skin: '#f0c4a4', top: '#e86a9a', legs: '#5a4a6a', w: 19, rim: '#fff8e0', hair: perm, la: [-30, -104, -14, -92], ra: [34, -106, 30, -96], face: C(-5, -153, 1.5, '#1a1318') + C(5, -153, 1.5, '#1a1318') + P('M-5 -147Q0 -141 5 -147Z', '#c22a4a'),
      over: G('rotate(8 14 -92)', R(-12, -116, 46, 58, '#fffdf4', 'rx="2" stroke="#c8c2b0"') + S('M-6 -106H28M-6 -96H28M-6 -88H20M-6 -80H28M-6 -72H16', '#c8502a', 2) + P('M-12 -116L10 -116L-12 -80Z', '#fff', 'opacity=".7"')) + C(-12, -92, 5.6, '#f0c4a4') + C(30, -96, 5.6, '#f0c4a4') }) +
    // faded print + camera date stamp
    R(0, 0, 800, 600, '#e8c890', 'opacity=".16"') + tx(756, 556, 30, "10 10 '16", '#ffb02a', MONO, `${BOLD} text-anchor="end"`) + P('M0 0H800V600H0ZM14 14V586H786V14Z', '#fff8e8', 'opacity=".5"');
  return frame(k, 800, 600, defs, body, 0.2, 0.45);
})();

A.c9_ph_lou_order = ((): string => {
  const k = 'c9_ph_lou_order';
  const defs = lg(`${k}st`, [[0, '#aab2ba'], [0.5, '#dfe5ea'], [1, '#8a929a']], 1, 1) + rg(`${k}pb`, [[0, '#c98a3a'], [1, '#8a5218']]) + lg(`${k}foil`, [[0, '#f4f6f8'], [0.5, '#a8b0b8'], [1, '#e2e6ea']], 1, 0.4) + bl(`${k}sh`, 12);
  const pickle = (x: number, y: number, a: number): string => G(`translate(${x} ${y}) rotate(${a})`, P('M-22 0A22 22 0 0 1 22 0Q0 9 -22 0Z', '#5a9a2a', 'stroke="#2f6a14" stroke-width="2.5"') + P('M-15 -2A15 15 0 0 1 15 -2Q0 3 -15 -2Z', '#a8cc5a') + C(-6, -8, 1.8, '#e6f0b0') + C(4, -9, 1.8, '#e6f0b0'));
  const tot = (x: number, y: number, a: number): string => `<rect x="${x - 17}" y="${y - 12}" width="34" height="24" rx="9" fill="${TOT}" stroke="${TOT_D}" stroke-width="2.5" transform="rotate(${a} ${x} ${y})"/>` + S(`M${x - 8} ${y - 4}l5 4M${x + 3} ${y + 2}l5 3`, '#ffd98a', 2.4);
  const half = (x: number, y: number, a: number): string => G(`translate(${x} ${y}) rotate(${a})`,
    E(20, 26, 170, 70, '#000', `opacity=".3" filter="url(#${k}sh)"`) + R(-140, -78, 220, 156, '#ecd9b0', 'rx="60"') + E(-60, -30, 26, 12, '#c9a66a', 'opacity=".6"') + E(-20, 30, 20, 9, '#c9a66a', 'opacity=".5"') + E(10, -44, 16, 7, '#c9a66a', 'opacity=".5"') +
    P('M-140 0Q-140 -78 -84 -78L-48 -78Q-70 0 -44 78H-84Q-140 78 -140 0Z', `url(#${k}foil)`) + S('M-124 -40l26 22-30 30M-96 -70l14 40-20 44 16 50M-66 -76l-8 36', '#7d8891', 2, 'opacity=".7"') +
    E(80, 0, 54, 78, '#e2c890') + E(80, 0, 46, 69, `url(#${k}pb)`) + S('M56 -40Q84 -52 104 -30M58 30Q80 52 106 36', '#e2aa5a', 5, 'opacity=".7"') +
    tot(76, -40, 12) + tot(92, 30, -24) + pickle(66, 6, -12) + pickle(98, -6, 16) + pickle(70, 50, 8) + E(80, 0, 54, 78, 'none', 'stroke="#c9a66a" stroke-width="3"'));
  const body =
    R(0, 0, 600, 800, `url(#${k}st)`) + S('M0 120L600 60M0 420L600 380M0 700L600 650', '#fff', 2, 'opacity=".35"') +
    G('rotate(-5 300 400)', R(46, 96, 520, 640, '#000', `opacity=".3" filter="url(#${k}sh)"`) + R(36, 84, 520, 640, '#f6f0de') + P('M36 84H556V724H36Z', 'none', 'stroke="#e2412f" stroke-width="3" stroke-dasharray="14 14" opacity=".35"') + S('M36 300L556 250M200 84L240 724', '#d8cfb4', 2, 'opacity=".7"')) +
    half(210, 300, -24) + half(330, 500, 160) +
    // marker scrawl
    G('rotate(-7 190 640)', tx(60, 676, 96, 'LOU', '#16161c', HAND, `${BOLD} ${fit(190)}`) + S('M58 694Q150 708 256 690', '#16161c', 6)) +
    G('translate(322 648) rotate(8)', P('M-34 -6A34 32 0 1 1 34 -6Q34 14 20 20V38H-20V20Q-34 14 -34 -6Z', '#f6f0de', 'stroke="#16161c" stroke-width="6" stroke-linejoin="round"') + C(-13, -6, 9, '#16161c') + C(13, -6, 9, '#16161c') + P('M0 6l-5 9h10z', '#16161c') + S('M-10 22v14M0 22v14M10 22v14', '#16161c', 4)) +
    // hot honey
    G('translate(480 660)', E(8, 30, 70, 20, '#000', `opacity=".3" filter="url(#${k}sh)"`) + P('M-56 -20L-44 40Q0 54 44 40L56 -20Z', '#fff', 'opacity=".75"') + E(0, -20, 56, 20, '#fff') + E(0, -19, 48, 15, '#e8920e') + E(-12, -24, 20, 5, '#ffd06a', 'opacity=".8"') +
      [[-20, -16], [8, -14], [24, -22], [-4, -24], [16, -12], [-30, -22]].map(([x, y]) => R(x, y, 6, 3, '#c21e12', `transform="rotate(${x * 3} ${x} ${y})"`)).join(''));
  return frame(k, 600, 800, defs, body, 0.15, 0.45);
})();

A.c9_ph_menu = ((): string => {
  const k = 'c9_ph_menu';
  const defs = lg(`${k}wall`, [[0, '#c4ccd2'], [1, '#7d8891']]) + lg(`${k}wb`, [[0, '#fff'], [1, '#ecefee']], 1, 1) + lg(`${k}st`, [[0, '#e2e6ea'], [1, '#6a727a']]);
  const INK = '#12246a';
  const items = ['BIRRIA TACOS x400', 'LOADED TOTS', 'ELOTE CUPS', 'FUNERAL POTATOES (per Mrs P)', 'CHURRO BITES'];
  const body =
    R(0, 0, 800, 600, `url(#${k}wall)`) + S('M0 0V600M200 0V600M400 0V600M600 0V600M800 0V600M0 300H800', '#fff', 1.5, 'opacity=".3"') +
    R(40, 28, 720, 500, '#8a9098', 'rx="8"') + R(50, 38, 700, 480, `url(#${k}wb)`) + P('M50 38H300L150 518H50Z', '#fff', 'opacity=".6"') +
    E(640, 150, 60, 18, '#b8c0ff', 'opacity=".25"') + C(660, 330, 34, 'none', 'stroke="#a8743a" stroke-width="4" opacity=".3"') +
    `<g ${HAND} font-weight="bold" fill="${INK}">` +
    `<text x="76" y="96" font-size="34" ${fit(590)}>PETTIBONE WAKE — FRI — 200 HEADS:</text>` + S('M76 110Q360 122 668 108', INK, 4) +
    items.map((t, i) => `<circle cx="96" cy="${156 + i * 54}" r="6"/><text x="118" y="${168 + i * 54}" font-size="33" ${fit(Math.min(540, t.length * 19.5))}>${t}</text>`).join('') +
    `</g>` + miniTaco(650, 240, 2.2) + S('M612 262q38 20 76 0', INK, 3) +
    G('rotate(-2 400 450)', tx(74, 456, 31, 'NO TURKEY?? why does fisk need 180 lbs???', '#d21e1e', HAND, `${BOLD} ${fit(650)}`) + S('M72 470Q400 484 728 466M76 478Q300 488 520 480', '#d21e1e', 4)) +
    R(250, 518, 300, 16, '#aab2ba', 'rx="4"') + R(280, 508, 70, 12, INK, 'rx="5"') + R(366, 508, 70, 12, '#d21e1e', 'rx="5"') + R(452, 506, 50, 16, '#55595e', 'rx="3"') +
    // prep table in the foreground
    R(0, 556, 800, 44, `url(#${k}st)`) + R(0, 556, 800, 5, '#fff', 'opacity=".7"') + G('translate(560 16)', P('M40 556V520Q40 510 52 510H168Q180 510 180 520V556Z', '#9aa2aa') + E(110, 512, 64, 10, '#55595e') + R(24, 524, 20, 8, '#55595e', 'rx="3"') + R(176, 524, 20, 8, '#55595e', 'rx="3"'));
  return frame(k, 800, 600, defs, body, 0.13, 0.4);
})();

A.c9_ph_turkeys = ((): string => {
  const k = 'c9_ph_turkeys';
  const PALE = '#f0dccf', PALE_D = '#b89a8c', RIM = '#ffb45a';
  const defs =
    lg(`${k}wall`, [[0, '#3a2a44'], [1, '#1c1424']]) + lg(`${k}in`, [[0, '#f2fbff'], [1, '#9cc8dc']]) + lg(`${k}door`, [[0, '#8a96a2'], [1, '#48525e']], 1, 0) + lg(`${k}box`, [[0, '#d2a468'], [1, '#a87a40']]) +
    rg(`${k}lamp`, [[0, '#ffd08a', 0.85], [1, '#ffb45a', 0]]) + bl(`${k}b`, 14) +
    `<pattern id="${k}br" width="64" height="32" patternUnits="userSpaceOnUse"><path d="M0 0H64M0 16H64M0 0V16M32 16V32" fill="none" stroke="#0e0a14" stroke-width="2.5" opacity=".6"/></pattern>` +
    `<g id="${k}case"><rect width="216" height="94" fill="url(#${k}box)" stroke="#6a4418" stroke-width="2.5"/><path d="M0 16H216" stroke="#6a4418" stroke-width="2" opacity=".5"/><rect x="92" width="32" height="94" fill="#e6d2a0" opacity=".45"/>` +
    `<text x="108" y="48" ${SANS} font-size="26" font-weight="bold" fill="#2a1808" text-anchor="middle" ${fit(180)}>WHOLE TURKEY</text><text x="108" y="78" ${SANS} font-size="21" font-weight="bold" fill="#8a1a0e" text-anchor="middle" ${fit(168)}>FROZEN — 10 LB</text>` +
    `<path d="M0 0H60Q30 14 0 30ZM216 94H150Q190 82 216 60ZM216 0V26Q196 16 180 0Z" fill="#eaf8ff" opacity=".8"/><path d="M20 94v10q2 5 4 0v-10zM64 94v16q2 5 4 0v-16zM170 94v8q2 5 4 0v-8z" fill="#eaf8ff"/></g>`;
  const gordon = G('translate(438 0)',
    P('M-40 470H40L34 652H6L0 530L-6 652H-34Z', '#0c0c10') + E(-20, 654, 20, 7, '#050506') + E(20, 654, 20, 7, '#050506') +
    P('M-56 304Q0 284 56 304L46 486H-46Z', '#17171c') + P('M-12 292L0 340L12 292Z', '#f4f4f0') + P('M-4 298h8l3 50-7 10-7-10z', '#0a0a0c') + S('M56 306L47 484', RIM, 3, 'opacity=".9"') +
    R(-9, 262, 18, 34, PALE_D) + E(0, 232, 30, 37, PALE) + P('M2 195Q30 198 30 232Q30 268 2 269Z', PALE_D, 'opacity=".55"') + S('M22 204Q31 218 30 240', RIM, 3) +
    E(-30, 236, 5, 9, PALE) + S('M-26 212Q0 190 28 206M-27 218Q0 196 29 212M-24 206Q0 184 26 200', '#6a6258', 2.2) +
    C(-11, 230, 7.5, '#fff') + C(11, 230, 7.5, '#fff') + C(-10, 231, 3, '#2a2a30') + C(12, 231, 3, '#2a2a30') + S('M-21 219Q-12 212 -3 214M3 214Q12 212 21 219', '#6a6258', 2.6) +
    E(0, 254, 9, 8, '#3a0e12') + R(-6, 247, 12, 3.5, '#fff') + S('M0 238v6', PALE_D, 2) +
    P('M-18 204q-3 7 0 10 3-3 0-10zM24 222q-3 7 0 10 3-3 0-10z', '#bfe6ff') +
    // hand on the door
    S('M52 312Q84 350 96 400', '#17171c', 26) + E(100, 410, 13, 16, PALE) + S('M94 404h14M94 412h14', PALE_D, 1.5) +
    // big "no photos" palm
    S('M-52 314Q-86 360 -110 384', '#17171c', 30) + R(-126, 366, 20, 30, '#f4f4f0', 'transform="rotate(38 -116 380)"') +
    G('translate(-140 330) rotate(-12)', [-30, -11, 8, 27].map((x, i) => `<rect x="${x - 9}" y="${-96 + Math.abs(i - 1.5) * 8}" width="19" height="70" rx="9.5" fill="${PALE}" stroke="${PALE_D}" stroke-width="1.5" transform="rotate(${(i - 1.5) * 7} ${x} 0)"/>`).join('') +
      `<rect x="34" y="-34" width="19" height="52" rx="9.5" fill="${PALE}" stroke="${PALE_D}" stroke-width="1.5" transform="rotate(48 40 0)"/>` + E(0, 4, 44, 46, PALE) + S('M-24 -8Q0 -20 26 -6M-22 12Q0 2 22 16M-6 -14Q-14 14 -4 36', PALE_D, 2.4) + S('M-40 -14Q-46 10 -36 30', RIM, 3)));
  const body =
    R(0, 0, 600, 800, `url(#${k}wall)`) + R(0, 0, 600, 668, `url(#${k}br)`) + C(438, 150, 300, `url(#${k}lamp)`) +
    // sign
    R(226, 22, 356, 116, '#0c2a22', 'rx="6" stroke="#e0b040" stroke-width="4"') + tx(404, 58, 23, 'BELLWEATHER FUNERAL HOME', '#f6e7b8', SERIF, `${BOLD} ${MID} ${fit(324)}`) + tx(404, 96, 32, 'PREP ROOM B', '#fff', SANS, `${BOLD} ${MID} ${fit(230)}`) + tx(404, 126, 22, 'STAFF ONLY', '#ff8a7a', SANS, `${BOLD} ${MID} ${fit(150)}`) +
    // doorway, cold light inside
    R(326, 152, 224, 516, '#55606c') + R(338, 164, 200, 504, `url(#${k}in)`) + R(338, 164, 200, 60, '#fff', 'opacity=".5"') + S('M360 300H520M360 420H520', '#7fb0c8', 3, 'opacity=".5"') +
    P('M538 164L600 140V700L538 668Z', `url(#${k}door)`) + R(560, 400, 30, 10, '#cfd6dc', 'rx="4"') +
    C(438, 150, 16, '#fff3c8') + P('M418 134H458L450 150H426Z', '#2a2a30') +
    // lot
    P('M0 668H600V800H0Z', '#16141c') + P('M300 668H560L640 800H240Z', '#bfe6ff', 'opacity=".16"') + E(140, 760, 130, 14, '#000', 'opacity=".5"') +
    gordon +
    // hand truck + cases
    S('M52 716V236Q52 214 76 214H120', '#c8202a', 12) + S('M212 716V330', '#c8202a', 12) + R(22, 704, 236, 12, '#c8202a', 'rx="4"') +
    [0, 1, 2, 3].map((i) => `<use href="#${k}case" x="${[26, 34, 24, 40][i]}" y="${610 - i * 96}"${i === 3 ? ` transform="rotate(-4 148 366)"` : ''}/>`).join('') +
    C(60, 730, 30, '#101014') + C(60, 730, 12, '#c8202a') + C(214, 730, 30, '#101014') + C(214, 730, 12, '#c8202a') +
    E(130, 420, 150, 60, '#dff4ff', `opacity=".22" filter="url(#${k}b)"`) + E(150, 690, 170, 30, '#dff4ff', `opacity=".25" filter="url(#${k}b)"`);
  return frame(k, 600, 800, defs, body, 0.17, 0.55);
})();

A.c9_ph_spread = ((): string => {
  const k = 'c9_ph_spread';
  const defs =
    lg(`${k}wall`, [[0, '#7a1430'], [1, '#3a0a1c']]) + lg(`${k}cloth`, [[0, '#fff'], [1, '#c8c2b8']]) + lg(`${k}dome`, [[0, '#fff'], [0.5, '#b8c0c8'], [1, '#6a727a']], 1, 1) +
    rg(`${k}ch`, [[0, '#fff3c0', 0.7], [1, '#ffd870', 0]]) +
    `<pattern id="${k}dm" width="60" height="80" patternUnits="userSpaceOnUse"><path d="M30 6Q44 22 30 40Q16 22 30 6ZM0 46Q14 62 0 80M60 46Q46 62 60 80" fill="none" stroke="${GOLD}" stroke-width="2.5" opacity=".4"/></pattern>` +
    `<g id="${k}man">${fig(0, 0, 1, { skin: LOU, top: '#101014', legs: '#0a0a0e', w: 22, rim: '#ffd870', hair: P(HCAP, '#17130f'), over: SUITV, belly: 3 })}</g>` +
    `<g id="${k}vase">` + S('M0 440Q-10 380 -26 350M0 440Q4 370 0 330M0 440Q12 384 30 356', '#3c8a26', 4) + lily(0, 322, 1.7) + `<g id="${k}lily">${lily(-28, 344, 1.5, -30)}</g><use href="#${k}lily" x="60" y="6"/>` + P('M-16 478Q-22 440 -8 420H8Q22 440 16 478Z', GOLD) + P('M2 420H8Q22 440 16 478H6Z', '#8a6410', 'opacity=".5"') + '</g>';
  const man = (x: number, s: number, flip = false): string => `<use href="#${k}man" transform="translate(${x} 540) scale(${flip ? -s : s} ${s})"/>`;
  const chafer = (x: number, fill: string, open: boolean): string => G(`translate(${x} 0)`,
    S('M-60 470L-70 520M60 470L70 520', '#8a9098', 5) + R(-74, 440, 148, 32, `url(#${k}dome)`, 'rx="6"') + E(0, 440, 70, 14, fill, 'stroke="#e2e6ea" stroke-width="4"') +
    (open ? '' : P('M-70 440A70 46 0 0 1 70 440Z', `url(#${k}dome)`) + R(-10, 388, 20, 8, GOLD, 'rx="4"')) + P('M-10 492h20l-4 16h-12z', '#3a6ae0') + P('M-5 492q5-14 0-22 12 10 5 22z', '#ffb02a'));
  const body =
    R(0, 0, 800, 600, `url(#${k}wall)`) + R(0, 0, 800, 420, `url(#${k}dm)`) + R(0, 396, 800, 30, '#2a0a14') + R(0, 396, 800, 5, GOLD) + R(0, 426, 800, 174, '#4a2a1a') +
    [40, 250, 550, 760].map((x) => R(x - 14, 0, 28, 400, '#e8d8b0') + R(x - 22, 380, 44, 18, GOLD)).join('') +
    C(400, 0, 190, `url(#${k}ch)`) + S('M400 0V26M340 40Q400 80 460 40M360 34v18M400 44v22M440 34v18', GOLD, 4) + C(360, 58, 6, '#fff8d0') + C(400, 72, 6, '#fff8d0') + C(440, 58, 6, '#fff8d0') +
    G('translate(318 86) scale(1.5)', louPortrait()) + R(346, 302, 110, 20, GOLD, 'rx="3"') + S('M360 312H442', '#8a6410', 2) +
    man(124, 1.6) + man(236, 1.42, true) + man(548, 1.5) +
    // the Wishing Well on its gold pedestal
    P('M640 536L652 330H716L728 536Z', GOLD) + P('M690 330H716L728 536H700Z', '#8a6410', 'opacity=".5"') + R(636, 318, 96, 14, '#f6d67a', 'rx="4"') + G('translate(612 222) scale(.94)', well(false)) +
    // buffet
    P('M0 470H800V600H0Z', `url(#${k}cloth)`) + P('M0 470H800V482H0Z', '#fff') + S('M90 482V600M300 482V600M520 482V600M710 482V600', '#b8b2a8', 2, 'opacity=".6"') +
    `<use href="#${k}vase" x="44"/><use href="#${k}vase" x="770"/>` + chafer(170, TOT, true) + S('M120 438q8-7 16 0M146 434q8-7 16 0M172 438q8-7 16 0M198 434q8-7 16 0M134 444q8-6 16 0M160 446q8-6 16 0M188 444q8-6 16 0', TOT_D, 3) +
    chafer(350, '#a8281a', true) + E(350, 438, 40, 6, '#e2603a') + chafer(520, '#888', false) +
    G('translate(640 470)', E(0, 0, 50, 10, '#f6f1e6', 'stroke="#c8c2b8"') + miniTaco(-22, -4, 0.9) + miniTaco(4, -6, 0.9) + miniTaco(26, -3, 0.9));
  return frame(k, 800, 600, defs, body, 0.15, 0.5);
})();

/** Red SPLASH DADDY jet ski on its trailer, ≈560×230 local units (bow to the right). */
const jetski = (trailer = true): string =>
  (trailer ? R(20, 186, 520, 10, '#55595e', 'rx="4"') + S('M540 191H600', '#55595e', 8) + R(80, 172, 60, 14, '#2a2a30', 'rx="4"') + R(330, 172, 60, 14, '#2a2a30', 'rx="4"') + C(210, 206, 28, '#131316') + C(210, 206, 12, '#c8ccd0') + R(592, 191, 8, 34, '#55595e') : '') +
  P('M0 118Q60 94 150 90L330 82Q440 78 524 122Q474 172 380 180H70Q20 170 0 118Z', '#e8182c') + P('M10 138Q200 158 506 132Q470 172 380 180H70Q28 172 10 138Z', '#8a0e1a') + S('M10 136Q200 156 508 130', '#fff', 5) +
  P('M118 92Q128 58 200 56H300Q322 58 332 84Z', '#17171c') + S('M130 80Q140 62 200 60H296', '#4a4a58', 3) +
  P('M330 84Q352 28 404 40L476 100Q400 84 330 84Z', '#ff4a58') + P('M352 50Q368 30 398 38L420 58Q386 48 352 50Z', '#1a1a2a') + S('M374 42L352 18H326', '#17171c', 8) + S('M20 112Q90 94 150 92', '#ff8a94', 4, 'opacity=".8"') +
  P('M44 150q-6-34 26-40 26 0 22 22-10-10-20-2-8 10 8 20z', '#3ab8ff', 'stroke="#fff" stroke-width="3"') +
  tx(378, 132, 30, 'SPLASH DADDY', '#fff', SANS, `${BOLD} ${MID} font-style="italic" stroke="#0a2a6a" stroke-width="5" paint-order="stroke" stroke-linejoin="round" ${fit(226)}`);

/** Spatula astride the jet ski (same local units as `jetski`). */
const rider = (bare: boolean, arms: string, mouth: string, lap = ''): string => {
  const sh = bare ? '#19c8d8' : '#19c8d8';
  return G('translate(-58 0)',
    S('M250 60L308 88L298 170', SPAT, 30) + E(306, 178, 24, 9, '#ffd23f') +
    (lap ? S('M244 52L262 70', sh, 26) : S('M240 58L296 84', sh, 36) + S('M262 62l22 10', '#fff', 4, 'opacity=".7"')) +
    P('M196 64Q180 -20 190 -60Q230 -80 272 -60Q282 -20 264 64Z', SPAT) + P('M236 -72Q272 -70 272 -60Q282 -20 264 64H240Z', SPAT_D, 'opacity=".55"') +
    (bare
      ? S('M202 -24Q218 -12 232 -24Q248 -12 262 -24M232 -20V44M212 6h38M214 26h34', SPAT_D, 3) + S('M200 -50Q196 -10 204 30M222 -44q8-4 14 2', '#fff', 5, 'opacity=".45"') + C(214, -26, 3, '#fff', 'opacity=".6"')
      : P('M200 -62Q214 -30 232 -30Q250 -30 262 -62L274 -56Q282 -20 264 64H196Q182 -20 188 -56Z', '#ff4fa3') + P('M240 -30Q254 -34 262 -62L274 -56Q282 -20 264 64H240Z', '#000', 'opacity=".2"')) +
    S('M272 -58Q282 -20 266 60', '#ffe9a0', 3, 'opacity=".9"') +
    R(221, -90, 20, 24, SPAT_D) + C(231, -116, 31, SPAT) + P('M233 -147A31 31 0 0 1 233 -85Z', SPAT_D, 'opacity=".5"') + S('M254 -138A31 31 0 0 1 256 -98', '#ffe9a0', 3) +
    P('M199 -118Q194 -150 216 -152l4-12 8 10 6-14 7 13 8-10 3 12Q268 -150 263 -118Q254 -138 231 -138Q208 -138 199 -118Z', '#1c1410') + P('M216 -152l4-12 8 12zM228 -154l6-14 7 14zM241 -155l8-10 3 13z', '#f6d743') +
    P('M203 -126H259V-109Q251 -106 244 -110L237 -119H227L220 -110Q212 -106 203 -109Z', '#fff') + S('M206 -122H226M206 -118H223M206 -114H219M236 -122H256M239 -118H256M243 -114H256', '#141018', 2.2) +
    mouth + lap + arms);
};
const THUMB = (x: number, y: number): string => E(x, y, 13, 12, SPAT) + R(x - 5, y - 28, 10, 22, SPAT, 'rx="5"') + S(`M${x - 8} ${y + 2}h16`, SPAT_D, 1.5);

A.c9_ph_window = ((): string => {
  const k = 'c9_ph_window';
  const defs =
    lg(`${k}sky`, [[0, '#3a3a7a'], [0.6, '#c86a6a'], [1, '#ffb45a']]) + lg(`${k}st`, [[0, '#dfe5ea'], [1, '#6a727a']]) + lg(`${k}suv`, [[0, '#fff'], [1, '#c4ccd6']]) +
    rg(`${k}gl`, [[0, '#ffe9a0', 0.9], [1, '#ffb45a', 0]]) + totPat(`${k}tot`, 1.15) + bl(`${k}b`, 8);
  const donna = fig(404, 420, 1.56, {
    skin: TAN, top: '#0c0c10', legs: '#0c0c10', skirt: '#0c0c10', w: 16, rim: '#ffd08a', shoes: '#c21e3a',
    la: [-26, -110, 20, -96], ra: [34, -116, 56, -98],
    hair: C(0, -160, 17, '#f7f0d8') + C(-11, -152, 9, '#f7f0d8') + C(11, -156, 9, '#e2d6b0') + P('M-11 -150Q0 -162 12 -154Q4 -168 -11 -160Z', '#f7f0d8') +
      G('rotate(-16 6 -174)', E(6, -174, 13, 5, '#0c0c10') + P('M2 -176q-2-14 8-16-4 8 0 16z', '#0c0c10')),
    face: C(-7, -153, 2.2, '#fff') + C(1, -153, 2.2, '#fff') + C(-8.2, -153, 1.3, '#1a1318') + C(-.2, -153, 1.3, '#1a1318') + S('M-10 -157l5-1M-1 -158l5 1', '#6a4a26', 1.4) + P('M-7 -146q4-2 7 0-3 3-7 0z', '#c21e3a'),
    over: C(11, -148, 2.4, '#eaf6ff') + S('M-6 -136q6 4 12 0', '#fff', 2, 'stroke-dasharray=".1 3"') + P('M-17 -100Q0 -108 17 -100L15 -74H-15Z', '#0c0c10'),
  });
  const body =
    R(0, 0, 800, 440, `url(#${k}sky)`) + P('M0 250Q60 190 120 240Q170 180 230 236V330H0Z', '#2a2a4a', 'opacity=".7"') +
    // mansion side + garage
    R(40, 120, 420, 300, '#e8d8b8') + P('M20 124L250 60L480 124Z', '#a8502a') + R(40, 120, 420, 12, '#fff8e0') + [80, 170].map((x) => R(x, 170, 56, 90, '#ffe9a0') + R(x, 170, 56, 90, 'none', 'stroke="#fff8e0" stroke-width="6"') + S(`M${x + 28} 170v90M${x} 215h56`, '#fff8e0', 3)).join('') +
    R(262, 190, 84, 230, '#ffd870') + C(304, 300, 120, `url(#${k}gl)`) + P('M262 190L226 204V420H262Z', '#8a6a4a') + R(256, 184, 96, 8, '#fff8e0') +
    C(30, 400, 40, '#2f6a34') + C(90, 410, 30, '#3c8a3a') + C(200, 414, 26, '#2f6a34') +
    // driveway
    P('M0 414H800V440H0Z', '#6a6a72') + P('M210 414H800V440H170Z', '#9a9aa2') +
    // white SUV, hatch up
    E(596, 418, 180, 12, '#000', 'opacity=".4"') + R(464, 352, 46, 62, '#131316', 'rx="8"') + R(682, 352, 46, 62, '#131316', 'rx="8"') +
    P('M468 176L484 92H708L724 176Z', '#e6ecf2') + P('M490 168L500 104H692L702 168Z', '#3a4a6a') + P('M500 104H560L540 168H490Z', '#8aa0c8', 'opacity=".5"') +
    R(452, 170, 288, 216, `url(#${k}suv)`, 'rx="22"') + R(474, 186, 244, 116, '#17171f', 'rx="8"') + R(484, 262, 224, 40, '#2a2a36') +
    R(456, 196, 16, 84, '#e21e2a', 'rx="5"') + R(720, 196, 16, 84, '#e21e2a', 'rx="5"') + R(446, 318, 300, 48, '#dfe5ea', 'rx="12"') + R(446, 356, 300, 12, '#8a9098', 'rx="5"') +
    R(532, 320, 128, 44, '#fff', 'rx="5" stroke="#1a2a6a" stroke-width="3"') + tx(596, 353, 30, 'DONNA 1', '#1a2a6a', SANS, `${BOLD} ${MID} ${fit(108)}`) +
    S('M740 190Q748 280 742 380', '#ffd08a', 3, 'opacity=".8"') +
    G('translate(470 196) scale(.7)', well(false)) + donna + C(435, 271, 9, TAN) + C(492, 268, 9, TAN) + C(497, 266, 3, '#eaf6ff') +
    // truck interior: window frame, awning, counter
    P('M0 0H800V600H0ZM36 56V440H764V56Z', '#17120e', 'fill-rule="evenodd"') + P('M36 56H764V84' + 'q-13 14-26 0'.repeat(28) + 'Z', CHEESE, 'opacity=".85"') + R(36, 56, 728, 8, '#8a6a0a') +
    S('M36 56V440M764 56V440', '#5a4a3a', 4) + R(0, 432, 800, 168, `url(#${k}st)`) + R(0, 432, 800, 6, '#fff', 'opacity=".8"') +
    // tray of loaded tots
    P('M96 600L60 470H470L520 600Z', '#b8c0c8') + P('M84 600L74 482H458L500 600Z', `url(#${k}tot)`) + S('M100 520Q150 500 200 530T300 520T400 540T460 560M120 570Q200 550 260 580T380 570', '#ffb02a', 9) +
    [[150, 506], [230, 548], [330, 510], [400, 566], [190, 580], [290, 560], [120, 550], [440, 520]].map(([x, y], i) => R(x, y, 12, 6, i % 2 ? '#4aa83a' : '#b8452a', `rx="2" transform="rotate(${i * 40} ${x} ${y})"`)).join('') + S('M60 470H470', '#fff', 3) +
    // squeeze bottle
    G('translate(610 0)', E(0, 592, 44, 10, '#000', 'opacity=".3"') + P('M-34 600V470Q-34 440 -14 432H14Q34 440 34 470V600Z', '#ffd23f') + P('M4 432H14Q34 440 34 470V600H10Z', '#c89a0a', 'opacity=".5"') + P('M-14 432L-5 380H5L14 432Z', '#e2412f') + R(-34, 500, 68, 46, '#fff', 'opacity=".85"') + S('M-22 516H22M-22 530H10', '#c8502a', 4) + S('M-26 470V590', '#fff', 5, 'opacity=".6"'));
  return frame(k, 800, 600, defs, body, 0.16, 0.5);
})();

A.c9_ph_box1820 = ((): string => {
  const k = 'c9_ph_box1820';
  const defs =
    lg(`${k}wall`, [[0, '#7a1430'], [1, '#3a0a1c']]) + rg(`${k}gl`, [[0, '#fff3c0', 0.55], [1, '#ffd870', 0]]) + rg(`${k}cf`, [[0, '#fffdf2'], [1, '#e6dcc0']]) + bl(`${k}sh`, 10) +
    `<pattern id="${k}dm" width="60" height="80" patternUnits="userSpaceOnUse"><path d="M30 6Q44 22 30 40Q16 22 30 6ZM0 46Q14 62 0 80M60 46Q46 62 60 80" fill="none" stroke="${GOLD}" stroke-width="2.5" opacity=".35"/></pattern>`;
  let ticks = '';
  for (let i = 0; i < 12; i++) if (i % 3) ticks += `<rect x="-2.5" y="-78" width="5" height="12" fill="#3a2a0a" transform="rotate(${i * 30})"/>`;
  const env = (x: number, y: number, a: number, c: string): string => G(`translate(${x} ${y}) rotate(${a})`, R(-44, -28, 88, 56, c, 'stroke="#b8a878" stroke-width="2"') + S('M-44 -28L0 6L44 -28', '#b8a878', 2));
  const body =
    R(0, 0, 600, 800, `url(#${k}wall)`) + R(0, 0, 600, 800, `url(#${k}dm)`) + C(300, 330, 380, `url(#${k}gl)`) +
    G('translate(22 70) scale(1.75)', louPortrait()) +
    // gilded clock, 6:20
    G('translate(436 150)', C(6, 10, 100, '#000', `opacity=".4" filter="url(#${k}sh)"`) +
      [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => `<path d="M-12 -92L0 -122L12 -92Z" fill="${a % 60 ? '#b8860b' : GOLD}" transform="rotate(${a})"/>`).join('') +
      C(0, 0, 98, GOLD) + C(0, 0, 90, '#8a6410') + C(0, 0, 84, `url(#${k}cf)`) + ticks +
      tx(0, -44, 22, 'XII', '#3a2a0a', SERIF, `${BOLD} ${MID}`) + tx(0, 62, 22, 'VI', '#3a2a0a', SERIF, `${BOLD} ${MID}`) + tx(54, 8, 22, 'III', '#3a2a0a', SERIF, `${BOLD} ${MID}`) + tx(-54, 8, 22, 'IX', '#3a2a0a', SERIF, `${BOLD} ${MID}`) +
      `<path d="M-4.5 8L-3 -44L0 -50L3 -44L4.5 8Z" fill="#17120a" transform="rotate(190)"/><path d="M-3 10L-2 -66L0 -72L2 -66L3 10Z" fill="#17120a" transform="rotate(120)"/>` + C(0, 0, 7, '#8a6410')) +
    // pedestal + the Wishing Well
    P('M196 800L214 580H386L404 800Z', GOLD) + P('M330 580H386L404 800H350Z', '#8a6410', 'opacity=".5"') + R(170, 556, 260, 28, '#f6d67a', 'rx="6"') + S('M230 620V800M300 620V800', '#f6e09a', 4, 'opacity=".6"') +
    E(300, 560, 190, 18, '#000', `opacity=".35" filter="url(#${k}sh)"`) + env(206, 276, -32, '#f3e7c6') + env(398, 280, 28, '#efe2bd') + env(300, 262, 4, '#fbf3da') +
    G('translate(134 296) scale(2.6)', well(true)) + env(150, 548, -14, '#fbf3da') + env(452, 552, 18, '#f3e7c6') +
    // bouquet + card
    G('translate(486 640)', S('M0 60Q-20 0 -50 -30M0 60Q0 -10 -6 -60M0 60Q20 0 50 -36', '#3c8a26', 6) + lily(-52, -36, 2.3, -30) + lily(-6, -66, 2.5) + lily(52, -42, 2.3, 30)) +
    G('rotate(-5 470 740)', R(346, 690, 250, 94, '#000', `opacity=".4" filter="url(#${k}sh)"`) + R(340, 684, 250, 94, '#fffdf2', 'stroke="#b8a878" stroke-width="2"') + tx(465, 722, 25, 'WITH RESPECT —', '#2a2018', SERIF, `${MID} font-style="italic" ${fit(190)}`) + tx(465, 758, 19, 'THE BOYS FROM THE DOCKS', '#2a2018', SERIF, `${BOLD} ${MID} ${fit(222)}`));
  return frame(k, 600, 800, defs, body, 0.16, 0.5);
})();

A.c9_ph_pallbearers = ((): string => {
  const k = 'c9_ph_pallbearers';
  const defs = lg(`${k}sky`, [[0, '#b8c4d2'], [1, '#f0e2c8']]) + lg(`${k}wd`, [[0, '#a8502a'], [0.45, MAHOG], [1, '#2a0e08']]) + lg(`${k}lid`, [[0, '#d8703a'], [1, '#6a2a14']]) + bl(`${k}b`, 9);
  const RIM = '#fff6e0';
  const strain = S('M-9 -158l7 3M9 -158l-7 3', '#2a1a12', 2.2) + S('M-7 -152h4M3 -152h4', '#1a1318', 2) + R(-6, -148, 12, 5, '#fff', 'stroke="#3a1a14" stroke-width="1" rx="1"') + S('M-2 -148v5M2 -148v5', '#3a1a14', 0.8) + P('M12 -160q-3 6 0 8 3-2 0-8z', '#9fd8ff') + E(-8, -147, 3, 2, '#e2412f', 'opacity=".4"');
  const shock = C(-5, -154, 4, '#fff') + C(6, -154, 4, '#fff') + C(-4.5, -153.5, 1.7, '#1a1318') + C(6.5, -153.5, 1.7, '#1a1318') + S('M-10 -161q5-4 9-1M2 -162q5-3 9 1', '#5a3a24', 2) + E(1, -145, 3.2, 4, '#3a0e12') + P('M-12 -150q-3 6 0 8 3-2 0-8z', '#9fd8ff');
  const SUIT: Fig = { skin: '#f4f4f0', top: '#111116', legs: '#0b0b10', w: 24, belly: 3, rim: RIM, over: SUITV };
  const defs2 = `<g id="${k}m">${figBody(SUIT)}</g><g id="${k}n">${figBody({ ...SUIT, la: [-30, -98, -8, -70], ra: [30, -98, 10, -70] })}</g><g id="${k}f">${strain}</g>`;
  const man = (x: number, y: number, s: number, skin: string, hair: string, near: boolean, tommy = false): string =>
    G(`translate(${x} ${y}) scale(${s})`, `<use href="#${k}${near ? 'n' : 'm'}"/>` + figHead({ skin, top: '', legs: '', rim: RIM, hair, face: tommy ? shock : `<use href="#${k}f"/>` }));
  const tree = (x: number, y: number, r: number, c: string): string => R(x - 5, y, 10, 90, '#4a3222') + C(x, y, r, c) + C(x - r * 0.5, y + r * 0.3, r * 0.7, c) + C(x + r * 0.5, y + r * 0.2, r * 0.7, c, 'opacity=".85"');
  let steps = '';
  for (let i = 0; i < 7; i++) steps += R(i * 133 - 60, 552 - i * 16, 200, 120, i % 2 ? '#a8a296' : '#b8b2a6') + R(i * 133 - 60, 552 - i * 16, 200, 5, '#e2dcd0');
  const body =
    R(0, 0, 800, 600, `url(#${k}sky)`) + tree(80, 180, 70, '#d8702a') + tree(250, 150, 54, '#e2a02a') + tree(700, 110, 80, '#c8452a') + tree(540, 130, 50, '#e28a2a') +
    P('M0 330Q400 250 800 230V600H0Z', '#8aa06a') +
    [[60, 380], [150, 350], [660, 280], [740, 262], [330, 318]].map(([x, y], i) => i % 2 ? P(`M${x - 4} ${y}v-36h-10v-9h10v-12h8v12h10v9h-10v36z`, '#d8d4c8') : P(`M${x - 14} ${y}v-30q0-16 14-16t14 16v30z`, '#d8d4c8')).join('') +
    steps +
    G('rotate(-6.5 400 520)',
      man(286, 508, 1.82, '#d9a680', P(HCAP, '#2a2018'), false) + man(462, 508, 1.82, SPAT, '', false) + man(636, 508, 1.82, '#f0c4a4', P(HCAP, '#8a8a8a'), false) +
      // the casket
      E(380, 528, 300, 12, '#000', 'opacity=".25"') + P('M96 348Q110 316 180 312H590Q650 316 664 348Z', `url(#${k}lid)`) + S('M110 338Q124 320 180 318H590Q640 320 652 338', '#ffb88a', 3, 'opacity=".7"') +
      P('M92 348H668L654 446H106Z', `url(#${k}wd)`) + P('M92 348H668L666 360H94Z', '#2a0e08', 'opacity=".5"') + P('M130 366H420L400 380H140Z', '#fff', 'opacity=".22"') + S('M108 432H652', '#c06a3a', 2, 'opacity=".6"') +
      R(128, 392, 504, 9, GOLD, 'rx="4.5"') + [140, 300, 460, 618].map((x) => R(x - 6, 380, 12, 26, '#b8860b', 'rx="3"')).join('') +
      // frost on the brass
      R(128, 392, 504, 9, '#dff6ff', 'rx="4.5" opacity=".6"') + S('M130 394H630', '#fff', 2, 'stroke-dasharray="14 9" opacity=".9"') + E(380, 400, 280, 26, '#dff6ff', `opacity=".28" filter="url(#${k}b)"`) +
      [[150, 384], [240, 406], [330, 386], [470, 408], [560, 386], [610, 408]].map(([x, y]) => S(`M${x - 5} ${y}h10M${x} ${y - 5}v10`, '#fff', 1.6)).join('') +
      S('M204 404v14M398 404v18M520 404v10', '#dff6ff', 3, 'opacity=".8"') +
      man(196, 524, 1.95, '#e2b48c', P(HCAP, '#17130f'), true) + man(378, 524, 1.95, '#c68e62', P(HCAP, '#5a2a14'), true) + man(560, 524, 1.95, '#eebf9f', P(HCAP, '#5a3a24'), true, true));
  return frame(k, 800, 600, defs + defs2, body, 0.15, 0.45);
})();

A.c9_ph_jetski = ((): string => {
  const k = 'c9_ph_jetski';
  const defs = lg(`${k}sky`, [[0, '#2f9ee6'], [1, '#cfeeff']]) + lg(`${k}gd`, [[0, '#8a8e96'], [1, '#55595e']]);
  let pen = '';
  for (let i = 0; i < 16; i++) pen += P(`M${i * 52} ${150 + Math.sin(i / 15 * Math.PI) * 26}l14 2-4 30z`, ['#e2412f', '#ffd23f', '#2f7fe0', '#fff'][i % 4]);
  const body =
    R(0, 0, 800, 600, `url(#${k}sky)`) + E(140, 80, 100, 22, '#fff', 'opacity=".8"') + E(620, 60, 80, 18, '#fff', 'opacity=".7"') +
    R(0, 200, 800, 220, '#e6e8ea') + R(0, 200, 800, 44, '#1a4a8a') + tx(780, 230, 20, 'HARLOW MARINE & POWERSPORTS', '#fff', SANS, `${BOLD} text-anchor="end" ${fit(330)}`) + R(40, 270, 300, 150, '#3a5a7a') + R(460, 270, 300, 150, '#3a5a7a') + P('M40 270H200L120 420H40Z', '#9ac0e0', 'opacity=".4"') + P('M460 270H640L560 420H460Z', '#9ac0e0', 'opacity=".4"') +
    S('M0 150Q400 210 800 150', '#2a2018', 1.5) + pen +
    R(0, 420, 800, 180, `url(#${k}gd)`) + S('M0 470H800', '#ffd23f', 4, 'stroke-dasharray="40 30" opacity=".6"') + E(400, 556, 330, 16, '#000', 'opacity=".35"') +
    G('translate(84 284) scale(1.2)', jetski() +
      rider(false,
        S('M196 -52Q150 -40 136 -86', SPAT, 22) + THUMB(134, -98) + S('M268 -52Q318 -44 330 -90', SPAT_D, 22) + THUMB(332, -102),
        P('M214 -100Q232 -84 250 -102Q232 -96 214 -100Z', '#fff', 'stroke="#2a130c" stroke-width="2"')) +
      S('M92 -130l-14-10M74 -160l-4-16M260 -134l14-10M280 -164l4-16', '#fff', 4, 'opacity=".9"'));
  return frame(k, 800, 600, defs, body, 0.14, 0.4);
})();

A.c9_ph_loan = ((): string => {
  const k = 'c9_ph_loan';
  const defs = lg(`${k}desk`, [[0, '#7a4a26'], [1, '#3a2010']], 1, 1) + lg(`${k}pp`, [[0, '#fff'], [1, '#ece8dc']], 1, 1) + bl(`${k}sh`, 12);
  const NAVY = '#12306a';
  const rows: [string, string][] = [['Borrower:', 'RYAN ODUYA'], ['Amount:', '$11,480'], ['Term:', '84 MONTHS'], ['APR:', '0.00%'], ['Date:', '10/12/2026']];
  const body =
    R(0, 0, 600, 800, `url(#${k}desk)`) + S('M0 90Q300 60 600 110M0 300Q300 260 600 320M0 540Q300 500 600 560M0 730Q300 700 600 750', '#2a1608', 3, 'opacity=".4"') +
    G('rotate(-3 300 400)', R(66, 60, 480, 680, '#000', `opacity=".45" filter="url(#${k}sh)"`) + R(54, 46, 480, 680, `url(#${k}pp)`) +
      R(54, 46, 480, 96, NAVY) + P('M76 112q10-34 34-30 16 6 8 22-8-10-18-4-8 8 4 18z', '#5ac8ff') + tx(316, 92, 30, 'HARLOW MARINE FINANCE', '#fff', SANS, `${BOLD} ${MID} ${fit(360)}`) + tx(316, 122, 15, 'boats · jet skis · regret', '#9ac8ff', SANS, `${MID} font-style="italic"`) +
      G('rotate(-7 300 210)', R(140, 166, 320, 80, 'none', 'rx="8" stroke="#1a8a3a" stroke-width="7"') + tx(300, 228, 58, 'APPROVED', '#1a8a3a', SANS, `${BOLD} ${MID} ${fit(280)}`)) +
      rows.map(([a, b], i) => tx(84, 320 + i * 62, 29, a, '#55595e', SANS, '') + tx(250, 320 + i * 62, 31, b, '#14141a', MONO, `${BOLD} ${fit(Math.min(260, b.length * 24))}`) + S(`M84 ${334 + i * 62}H504`, '#c8c2b0', 1.5)).join('') +
      S('M90 664q20-40 40-6t30-20 20 30 40-24 30 16', NAVY, 3) + S('M84 680H300', '#55595e', 1.5) + tx(84, 702, 14, 'Borrower signature', '#8a8a84', SANS, '') + tx(504, 702, 14, 'HMF-84/0', '#8a8a84', MONO, 'text-anchor="end"')) +
    // branded pen
    G('rotate(-38 470 680)', R(336, 676, 280, 26, '#000', `opacity=".4" filter="url(#${k}sh)"`) + R(330, 664, 250, 24, NAVY, 'rx="12"') + P('M580 664H596L624 676L596 688H580Z', '#cfd6dc') + P('M612 671L624 676L612 681Z', '#17171c') + R(330, 664, 30, 24, '#cfd6dc', 'rx="8"') + R(336, 660, 90, 6, '#cfd6dc', 'rx="3"') + S('M370 669H570', '#5a7ac8', 3, 'opacity=".7"') + tx(470, 682, 13, 'HARLOW MARINE', '#fff', SANS, `${BOLD} ${MID} ${fit(120)}`));
  return frame(k, 600, 800, defs, body, 0.14, 0.45);
})();

A.c9_ph_overlook = ((): string => {
  const k = 'c9_ph_overlook';
  const defs = lg(`${k}sky`, [[0, '#04061a'], [1, '#1a2248']]) + lg(`${k}lake`, [[0, '#0a1230'], [1, '#04060f']]) + lg(`${k}gd`, [[0, '#3a3a44'], [1, '#17171c']]) + rg(`${k}moon`, [[0, '#dfe8ff', 0.5], [1, '#dfe8ff', 0]]) + rg(`${k}sod`, [[0, '#ffb45a', 0.5], [1, '#ffb45a', 0]]) + bl(`${k}b`, 3);
  const r = rng(77);
  let stars = '', lights = '';
  for (let i = 0; i < 46; i++) stars += `M${n1(r() * 800)} ${n1(r() * 210)}h${r() > 0.8 ? 2.4 : 1.4}`;
  let la = '', lb = '', refl = '';
  for (let i = 0; i < 30; i++) { const x = Math.round(r() * 800), d = `M${x} ${Math.round(240 + r() * 10)}h0`; if (i % 2) la += d; else lb += d; if (i % 3 === 0) refl += `M${x} 258v${Math.round(10 + r() * 30)}`; }
  lights = S(la, '#ffd28a', 4.5) + S(lb, '#fff', 3.5) + S(refl, '#ffd28a', 2, 'opacity=".35"');
  const body =
    R(0, 0, 800, 250, `url(#${k}sky)`) + S(stars, '#fff', 1.6, 'opacity=".8"') + C(660, 70, 120, `url(#${k}moon)`) + C(660, 70, 24, '#eef2ff') + C(668, 64, 22, '#0c1030', 'opacity=".25"') +
    P('M0 244Q200 214 400 236T800 222V260H0Z', '#070a1c') + R(0, 250, 800, 140, `url(#${k}lake)`) + lights + P('M620 256L700 256L740 390H560Z', '#dfe8ff', 'opacity=".07"') +
    // cliff-edge lot + guard rail
    P('M0 372Q400 340 800 366V600H0Z', `url(#${k}gd)`) + S('M0 372Q400 340 800 366', '#6a6a78', 3) + C(600, 500, 260, `url(#${k}sod)`) +
    S('M0 352Q400 320 800 346', '#8a9098', 6) + [40, 160, 280, 400, 520, 640, 760].map((x) => R(x, 344 - Math.sin(x / 800 * Math.PI) * 26, 6, 34, '#55595e')).join('') +
    G('translate(0 0)', [[90, 520], [300, 560], [520, 540], [700, 570], [420, 500], [180, 580]].map(([x, y]) => E(x, y, 5, 2, '#5a5a66')).join('')) +
    // the truck, lights off
    G('translate(36 224) scale(1.52)', truck({ dim: 0.62, rim: '#b8c8ff' }) + R(196, 92, 9, 14, '#dff6ff', 'rx="2" opacity=".9"') + R(195, 90, 11, 4, '#c8ccd0') + S('M200 78v10M195 83h10M197 80l6 6M203 80l-6 6', '#fff', 1.2)) +
    // road sign
    R(642, 250, 10, 300, '#6a727a') + R(488, 150, 300, 124, '#fff', 'rx="10"') + R(493, 155, 290, 114, '#6a3814', 'rx="7"') + tx(638, 200, 25, 'LAKESHORE MOTOR INN', '#fff', SANS, `${BOLD} ${MID} ${fit(266)}`) + tx(638, 250, 38, '1.2 MI →', '#fff', SANS, `${BOLD} ${MID} ${fit(176)}`) +
    // wooden overlook sign
    R(60, 470, 14, 110, '#3a2414') + R(300, 470, 14, 110, '#3a2414') + R(30, 440, 316, 96, '#5a3a1e', 'rx="8"') + R(30, 440, 316, 96, 'none', 'rx="8" stroke="#2a180a" stroke-width="4"') + S('M40 488H336', '#3a2414', 2, 'opacity=".6"') +
    tx(188, 480, 27, 'HARLOW FALLS', '#ffd870', SERIF, `${BOLD} ${MID} ${fit(210)}`) + tx(188, 518, 27, 'SCENIC OVERLOOK', '#ffd870', SERIF, `${BOLD} ${MID} ${fit(276)}`) +
    R(0, 0, 800, 600, '#0a1040', 'opacity=".18"');
  return frame(k, 800, 600, defs, body, 0.18, 0.6);
})();

// ════════════════════════════════════════════════════════════════ HIDDEN ALBUM
// Suggestive, never explicit: lingerie, bare chests and strategically placed props only.
A.c9_ph_h_donna = ((): string => {
  const k = 'c9_ph_h_donna';
  const PINK = '#ff6ac0';
  const defs =
    lg(`${k}wall`, [[0, '#8a5a2a'], [1, '#4a2a14']]) + lg(`${k}robe`, [[0, '#fff'], [1, '#cfc8ba']], 1, 0) + lg(`${k}sk`, [[0, '#dc8c4c'], [0.6, TAN], [1, TAN_D]], 1, 0) +
    rg(`${k}bulb`, [[0, '#fff', 1], [0.4, '#fff3c0', 0.6], [1, '#fff3c0', 0]]) + bl(`${k}sh`, 10) +
    `<pattern id="${k}fl" width="70" height="60" patternUnits="userSpaceOnUse"><rect width="70" height="60" fill="#6a3a4a"/><circle cx="18" cy="16" r="11" fill="#ff8a5a"/><circle cx="18" cy="16" r="4" fill="#ffd23f"/><circle cx="52" cy="44" r="12" fill="#e24a8a"/><circle cx="52" cy="44" r="4" fill="#ffd23f"/><path d="M34 30q8-10 14 0M2 46q8-10 14 0" stroke="#7a9a3a" stroke-width="4" fill="none"/></pattern>`;
  const lou = G('translate(500 0)',
    // legs + robe
    R(-54, 520, 26, 110, LOU) + R(8, 520, 26, 110, LOU_D) + 
    P('M-86 392Q-96 300 -30 372L34 372Q98 300 90 392L98 540H-92Z', `url(#${k}robe)`) + P('M-18 372L4 470L30 372Z', LOU) +
    S('M-22 370L4 472L32 370', '#d8d2c2', 9) + R(-92, 468, 190, 16, '#e2dccc') + S('M92 392L98 540', PINK, 4, 'opacity=".8"') +
    // head
    R(-16, 340, 34, 34, LOU_D) + E(2, 306, 46, 50, LOU) + P('M4 256Q48 260 48 306Q48 352 4 356Z', LOU_D, 'opacity=".5"') + E(-34, 322, 14, 16, LOU) + E(36, 322, 13, 15, LOU_D) + S('M-20 268Q0 258 22 266', '#fff', 5, 'opacity=".4"') + S('M36 270Q50 290 46 326', PINK, 3.5) +
    C(-16, 298, 10, '#fff') + C(18, 298, 10, '#fff') + C(-15, 300, 4.5, '#2a1a12') + C(19, 300, 4.5, '#2a1a12') + S('M-30 282Q-18 272 -6 280M8 280Q20 272 32 282', '#f6f3ea', 5) +
    P('M-30 326Q-14 312 2 322Q18 312 34 326Q22 340 2 330Q-18 340 -30 326Z', '#f6f3ea', 'stroke="#cfcabc"') +
    // burrito, caught mid-bite
    G('rotate(-24 -20 380)', R(-64, 350, 96, 38, '#ecd9b0', 'rx="19"') + R(-64, 350, 60, 38, '#cfd6dc', 'rx="14"') + S('M-52 356l10 14-8 14M-30 354l8 16-6 16', '#8a949e', 2)) +
    S('M-84 400Q-70 440 -40 400', `url(#${k}robe)`, 30) + E(-36, 392, 17, 15, LOU) + S('M-46 386q10-6 20 0M-46 394q10-6 20 0', LOU_D, 1.6));
  const donna =
    // sheer robe behind
    P('M232 262Q160 420 176 800H470Q470 500 420 330L396 266Z', '#0a0a0c', 'opacity=".42"') +
    // hair
    E(322, 142, 88, 84, '#e2d6b0') + C(256, 200, 24, '#e2d6b0') + C(398, 200, 28, '#cfc39c') +
    // arms
    S('M246 282Q176 350 184 404Q200 452 250 478', TAN, 36) + S('M392 282Q452 262 458 200L452 130', TAN_D, 34) + S('M474 268Q480 220 468 140', PINK, 4, 'opacity=".9"') +
    // body
    P('M240 266Q318 248 396 266Q380 300 388 344Q392 390 366 424Q398 470 404 520Q408 640 398 800H238Q228 640 232 520Q238 470 270 424Q244 390 248 344Q256 300 240 266Z', `url(#${k}sk)`) +
    S('M396 268Q382 300 389 344Q392 390 367 424Q399 470 405 520Q408 640 400 790', PINK, 4, 'opacity=".9"') + R(298, 214, 40, 50, TAN_D) + P('M298 240Q318 262 338 240V268H298Z', TAN) +
    S('M318 296V330', TAN_D, 3) + S('M262 306Q290 290 314 304M322 304Q346 290 374 306', '#f0a868', 4, 'opacity=".6"') + E(318, 476, 4, 5, TAN_D, 'opacity=".6"') +
    // black lace bra + high-waisted briefs
    P('M248 318Q282 300 316 322Q318 366 284 372Q250 366 248 318ZM320 322Q354 300 388 318Q386 366 352 372Q318 366 320 322Z', '#0c0c10') + S('M262 314V268M374 314V268M250 352H246M388 352H392', '#0c0c10', 6) +
    S('M250 318Q282 300 316 322M320 322Q354 300 386 318', '#3a3a44', 5, 'stroke-dasharray=".1 7"') +
    P('M266 430Q318 444 370 430Q398 470 404 520Q366 548 318 640Q270 548 232 520Q238 470 266 430Z', '#0c0c10') + S('M268 432Q318 446 368 432', '#3a3a44', 6, 'stroke-dasharray=".1 8"') + S('M318 640V800', TAN_D, 3) +
    // robe front edges, one shoulder slipped
    P('M236 258L266 262Q240 420 250 800H196Q176 480 236 258Z', '#0a0a0c', 'opacity=".6"') + P('M418 330L440 316Q470 520 462 800H404Q420 540 392 372Z', '#0a0a0c', 'opacity=".6"') + S('M266 262Q240 420 250 800M392 372Q420 540 404 800', '#0a0a0c', 4) +
    // hand on hip
    E(252, 480, 22, 17, TAN) + S('M238 476q14-8 30 0M236 486q14-8 30 0', TAN_D, 1.8) + C(270, 474, 4, '#c21e3a') + C(272, 486, 4, '#c21e3a') +
    // face
    E(318, 178, 44, 54, TAN) + P('M320 124Q362 128 362 178Q362 232 320 232Z', TAN_D, 'opacity=".5"') + S('M352 140Q366 170 358 208', PINK, 3.5) +
    P('M270 180Q262 96 318 92Q376 96 366 182Q360 132 322 128Q286 128 278 150Q272 164 270 180Z', '#f7f0d8') + S('M282 124Q300 100 336 104', '#cdbf96', 2.5) +
    E(300, 172, 13, 7, '#5a7ab8', 'opacity=".6"') + E(338, 172, 13, 7, '#5a7ab8', 'opacity=".6"') + P('M288 178Q300 170 312 178Q300 184 288 178ZM326 178Q338 170 350 178Q338 184 326 178Z', '#fff') + C(302, 178, 4, '#2a3a1a') + C(340, 178, 4, '#2a3a1a') +
    S('M287 176Q300 167 313 177M325 177Q338 167 351 176', '#1a1318', 3.2) + S('M285 162Q298 154 312 160M326 156Q340 146 354 156', '#6a4a26', 3.6) + S('M318 184Q322 198 316 204', TAN_D, 2.5) +
    P('M302 214Q311 209 318 212Q325 209 336 211Q320 228 302 214Z', '#d21e3a') + S('M304 215Q320 219 334 212', '#7a0e22', 1.6) +
    P('M270 196l6 10-6 14-6-14zM366 196l6 10-6 14-6-14z', '#eaf6ff', 'stroke="#9cc"') + S('M292 262Q318 284 344 262', '#fff', 6, 'stroke-dasharray=".1 8"') + P('M318 276l7 9-7 11-7-11z', '#eaf6ff', 'stroke="#9cc"') +
    // chardonnay held high
    E(452, 132, 20, 18, TAN_D) + S('M438 126q14-8 28 0M438 136q14-8 28 0', '#7a3e1e', 1.8) + S('M452 116V84M436 84h0', '#fff', 4, 'opacity=".8"') +
    P('M422 22H482Q484 70 452 84Q420 70 422 22Z', '#fff', 'opacity=".3"') + P('M425 42H479Q478 70 452 80Q426 70 425 42Z', '#f2e08a') + S('M430 28Q428 56 440 70', '#fff', 3, 'opacity=".8"');
  const body =
    R(0, 0, 600, 800, `url(#${k}wall)`) + S('M290 0V600M370 0V600M450 0V600M530 0V600', '#2a140a', 3, 'opacity=".5"') + R(0, 600, 600, 200, '#5a6a2a') +
    // room door + fire-exit card
    R(0, 20, 252, 600, '#6a4424') + R(8, 30, 236, 590, '#8a5a30') + C(226, 380, 11, GOLD) +
    R(8, 56, 212, 156, '#fffdf2', 'rx="4" stroke="#c8202a" stroke-width="4"') + tx(114, 88, 19, 'LAKESHORE MOTOR INN', '#17171c', SANS, `${BOLD} ${MID} ${fit(194)}`) + tx(114, 144, 50, 'ROOM 9', '#c8202a', SANS, `${BOLD} ${MID} ${fit(176)}`) +
    tx(114, 178, 23, 'CHECKOUT 11AM', '#17171c', SANS, `${BOLD} ${MID} ${fit(186)}`) + S('M26 196H76L68 190M76 196L68 202', '#1a8a3a', 4) + tx(90, 203, 13, 'FIRE EXIT', '#1a8a3a', SANS, BOLD) +
    // bed
    R(376, 250, 224, 190, '#3a2010', 'rx="10"') + P('M360 470Q480 440 600 462V660H372Z', `url(#${k}fl)`) + P('M360 470Q480 440 600 462V486Q480 464 362 494Z', '#fff', 'opacity=".15"') + P('M372 640H600V670H376Z', '#2a1408') +
    lou + donna +
    // counter + propped phone on timer
    P('M0 742H600V800H0Z', '#e88aa8') + R(0, 742, 600, 7, '#fff', 'opacity=".6"') +
    G('rotate(-10 310 720)', R(278, 660, 62, 112, '#17171c', 'rx="10"') + C(296, 680, 9, '#2a2a36') + C(296, 680, 4, '#5a7ab8') + C(316, 676, 4, '#fff8d0')) + P('M316 650l5 18 18 5-18 5-5 18-5-18-18-5 18-5z', '#fff', 'opacity=".9"') +
    // mirror: vanity bulbs, glare, frame
    [100, 300, 500].map((x) => C(x, 14, 44, `url(#${k}bulb)`) + C(x, 14, 9, '#fff')).join('') +
    P('M0 520L240 0H300L0 650Z', '#fff', 'opacity=".05"') + R(6, 6, 588, 788, 'none', 'stroke="#c8ccd0" stroke-width="12"') + R(13, 13, 574, 774, 'none', 'stroke="#55595e" stroke-width="3"');
  return frame(k, 600, 800, defs, body, 0.17, 0.5);
})();

A.c9_ph_h_tots = ((): string => {
  const k = 'c9_ph_h_tots';
  const defs =
    lg(`${k}tub`, [[0, '#fff'], [1, '#b8c4cc']]) + lg(`${k}sk`, [[0, '#f0c49c'], [1, DEW_D]], 1, 0) + rg(`${k}cd`, [[0, '#ffd870', 0.7], [1, '#ffb45a', 0]]) + totPat(`${k}tot`, 1.2) + bl(`${k}sh`, 10) +
    `<pattern id="${k}tile" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="#3a8a8a"/><rect x="2" y="2" width="56" height="56" fill="#5ab4ac"/><path d="M2 2H58L50 10H10Z" fill="#fff" opacity=".2"/></pattern>`;
  const candle = (x: number, y: number): string => C(x, y - 34, 40, `url(#${k}cd)`) + R(x - 9, y - 26, 18, 30, '#fff3e0', 'rx="3"') + P(`M${x} ${y - 46}q8 12 0 20-8-8 0-20z`, '#ffb02a') + P(`M${x} ${y - 38}q3 6 0 10-3-4 0-10z`, '#fff8d0');
  const cat = G('translate(486 168)',
    P('M-60 34Q-64 -40 -16 -44Q10 -80 44 -44Q70 -30 62 34Z', '#8a8e98') + P('M56 20Q96 10 88 -30', 'none', 'stroke="#8a8e98" stroke-width="13" stroke-linecap="round"') +
    C(-10, -70, 36, '#9a9ea8') + P('M-42 -84L-40 -122L-16 -100ZM22 -84L20 -122L-4 -100Z', '#9a9ea8') + P('M-37 -92L-36 -112L-24 -100ZM17 -92L16 -112L4 -100Z', '#e8a0a8') +
    P('M-30 -72h20v8q-10 5-20 0zM0 -72h20v8q-10 5-20 0z', '#e6e23a') + R(-22, -72, 4, 10, '#17171c') + R(8, -72, 4, 10, '#17171c') + S('M-32 -73H-8M-2 -73H22', '#4a4e58', 4) +
    P('M-8 -58l3 4h-6z', '#e8a0a8') + S('M-5 -54Q-10 -46 -16 -50M-5 -54Q0 -46 6 -50', '#4a4e58', 2) + S('M-26 -56l-26-4M-26 -50l-26 4M16 -56l26-4M16 -50l26 4', '#fff', 1.4));
  const body =
    R(0, 0, 600, 800, `url(#${k}tile)`) + R(0, 0, 600, 800, '#1a0a2a', 'opacity=".28"') + R(0, 660, 600, 140, '#3a2a3a') +
    // sink with a judgmental cat
    P('M392 196H586V236Q586 276 540 276H438Q392 276 392 236Z', '#f4f6f8') + R(380, 186, 218, 18, '#fff', 'rx="8"') + R(470, 276, 40, 150, '#dfe5ea') + S('M560 186V150Q560 134 544 134H536', '#c8ccd0', 9) + cat + R(380, 186, 218, 18, '#fff', 'rx="8"') +
    // shower curtain
    P('M0 0H86Q70 200 90 400T80 640H0Z', '#e24a8a') + S('M28 0Q16 300 30 640M60 0Q48 300 64 640', '#a82a66', 4) + [0, 1, 2, 3].map((i) => C(46, 90 + i * 150, 14, '#ffd23f') + P(`M56 ${88 + i * 150}l12 4-12 5z`, '#ff8a2a') + C(50, 86 + i * 150, 2.5, '#17171c')).join('') +
    // tub
    E(300, 760, 300, 26, '#000', `opacity=".5" filter="url(#${k}sh)"`) + P('M18 470Q18 720 110 750H490Q582 720 582 470Z', `url(#${k}tub)`) + P('M90 750L74 786H110L128 750ZM510 750L526 786H490L472 750Z', GOLD) +
    E(300, 470, 284, 104, '#fff') + E(300, 474, 258, 86, '#8a5210') + E(300, 474, 258, 86, `url(#${k}tot)`) +
    // Dewey, chest-deep in tots
    P('M96 470Q90 400 150 384Q200 372 250 392Q300 410 300 470Q200 500 96 470Z', `url(#${k}sk)`) + S('M150 420q10-8 20 0M178 432q10-8 20 0M160 446q10-8 20 0M206 418q8-6 16 0', '#7a4a2a', 2.5) + S('M250 394Q298 412 298 466', '#ffd08a', 4) +
    R(150, 330, 44, 64, DEW_D) + E(170, 282, 58, 64, DEW) + P('M174 218Q228 224 228 282Q228 344 174 346Z', DEW_D, 'opacity=".45"') + S('M212 232Q232 266 224 310', '#ffd08a', 4) +
    P('M112 276q-12 44 0 86 18-20 10-80zM228 276q12 44 0 86-18-20-10-80z', DEWHAIR) + P('M118 296Q170 372 222 296V320Q170 366 118 320Z', DEWHAIR) + P('M110 270Q104 206 170 204Q236 206 230 270Q204 234 170 236Q136 234 110 270Z', DEWHAIR) +
    P('M110 266Q170 228 230 266V242Q170 204 110 242Z', '#d8352a') + P('M228 246l30-12-8 22 18 16-34-4z', '#b82a22') + [128, 150, 170, 190, 212].map((x) => C(x, 246 - (1 - Math.abs(x - 170) / 60) * 12, 3.5, '#fff')).join('') +
    P('M132 288Q146 280 160 288Q146 294 132 288ZM180 288Q194 280 208 288Q194 294 180 288Z', '#fff') + C(148, 288, 4, '#3a2414') + C(196, 288, 4, '#3a2414') + S('M130 285H162M178 285H210', '#1a1318', 4) + S('M128 272Q144 262 160 270M180 264Q196 252 212 264', '#4a2e1a', 4.5) +
    // rose between the teeth
    P('M146 318H196V330H146Z', '#fff', 'stroke="#2a130c" stroke-width="2"') + S('M110 326H250', '#2f7a2a', 5) + P('M222 324q10-14 22-8-8 8-22 8z', '#2f7a2a') + C(98, 322, 20, '#d81e3a') + P('M86 316q12-12 24 0-4 14-12 14-10-2-12-14z', '#a0102a') + S('M92 322q6-6 12 0', '#ff6a7a', 2.5) +
    // arm raising the ketchup like champagne
    S('M258 408Q330 380 340 300', DEW, 34) + S('M356 384Q358 340 352 300', '#ffd08a', 4) + G('rotate(14 344 230)', R(322, 190, 44, 100, '#e21e1e', 'rx="10"') + P('M330 190L338 150H350L358 190Z', '#fff') + R(322, 222, 44, 36, '#fff') + tx(344, 246, 14, 'KETCHUP', '#e21e1e', SANS, `${BOLD} ${MID} ${fit(38)}`) + S('M330 196V280', '#ff8a8a', 4)) + E(340, 292, 26, 20, DEW) + S('M322 286q18-10 36 0M322 298q18-10 36 0', DEW_D, 2) +
    // leg draped over the rim
    E(300, 470, 284, 104, 'none', 'stroke="#fff" stroke-width="20"') + E(300, 462, 290, 106, 'none', 'stroke="#dfe5ea" stroke-width="3"') +
    S('M380 480Q440 380 500 470Q520 540 506 640', `url(#${k}sk)`, 44) + S('M410 440l6 10M440 424l4 10M476 440l2 10M504 500l6 6M506 550l6 4', '#7a4a2a', 2.5) + S('M522 480Q536 560 526 640', '#ffd08a', 4) +
    P('M484 636Q470 690 500 700Q560 706 566 684Q556 660 528 640Z', DEW) + S('M548 676v10M538 680v10M528 682v10', DEW_D, 2) +
    candle(60, 470) + candle(556, 452) + candle(118, 400) +
    [[150, 740], [420, 770], [250, 776]].map(([x, y], i) => `<rect x="${x}" y="${y}" width="34" height="22" rx="9" fill="${TOT}" stroke="${TOT_D}" stroke-width="2" transform="rotate(${i * 30 - 20} ${x} ${y})"/>`).join('') +
    R(0, 0, 600, 800, '#ff5a8a', 'opacity=".07"');
  return frame(k, 600, 800, defs, body, 0.17, 0.55);
})();

A.c9_ph_h_taco = ((): string => {
  const k = 'c9_ph_h_taco';
  const defs =
    lg(`${k}wall`, [[0, '#4a2a5a'], [1, '#2a1630']]) + lg(`${k}st`, [[0, '#f0f4f8'], [0.5, '#9aa4ae'], [1, '#4a525a']]) + lg(`${k}sk`, [[0, '#f0c49c'], [1, DEW_D]]) + rg(`${k}neon`, [[0, '#ff4fa3', 0.6], [1, '#ff4fa3', 0]]) + bl(`${k}sh`, 9) +
    `<pattern id="${k}leo" width="26" height="24" patternUnits="userSpaceOnUse"><rect width="26" height="24" fill="#e8a83a"/><path d="M4 5q5-4 8 1-2 5-7 3zM16 14q6-3 8 2-3 5-8 2zM3 17q3-3 6 0-2 4-5 3zM17 2q4-2 6 1-3 3-6 1z" fill="#5a3410" stroke="#17120a" stroke-width="1.6"/></pattern>`;
  const INK = '#17171c';
  const body =
    R(0, 0, 600, 800, `url(#${k}wall)`) + S('M0 250H600', '#17101c', 4) + C(110, 260, 300, `url(#${k}neon)`) +
    // fly swatter on a hook
    S('M96 60V250', '#2f9e4f', 7) + R(62, 30, 68, 84, '#3ad86a', 'rx="8"') + S('M74 40V104M86 40V104M98 40V104M110 40V104M66 54H126M66 72H126M66 90H126', '#1f7a3a', 2) + C(96, 256, 7, '#c8ccd0') +
    // health certificate
    G('rotate(3 430 150)', R(286, 46, 300, 208, '#000', `opacity=".4" filter="url(#${k}sh)"`) + R(280, 40, 300, 208, '#3a2414') + R(292, 52, 276, 184, '#fffdf2') + R(300, 60, 260, 168, 'none', 'stroke="#1a4a8a" stroke-width="3"') +
      tx(430, 92, 19, 'HEALTH INSPECTION', '#1a4a8a', SERIF, `${BOLD} ${MID} ${fit(210)}`) + tx(430, 170, 66, 'GRADE: C', '#c8202a', SANS, `${BOLD} ${MID} ${fit(236)}`) + tx(430, 206, 15, '"we have concerns"', INK, HAND, `${MID} font-style="italic"`) + C(536, 204, 15, GOLD) + P('M528 214l-4 20 12-8 12 8-4-20z', '#c8202a')) +
    // shelf of squeeze bottles
    R(0, 300, 250, 10, '#8a9098') + [30, 76, 122].map((x, i) => P(`M${x} 300V262q0-10 8-12l4-22h8l4 22q8 2 8 12V300Z`, ['#e21e1e', CHEESE, '#3ad86a'][i])).join('') +
    // counter
    R(0, 520, 600, 280, `url(#${k}st)`) + R(0, 520, 600, 9, '#fff') + S('M0 600H600', '#fff', 2, 'opacity=".4"') + E(320, 540, 280, 16, '#000', `opacity=".4" filter="url(#${k}sh)"`) +
    // legs: one straight, one bent (sock still on)
    S('M440 500L600 506', `url(#${k}sk)`, 44) + S('M470 492l8 6M510 494l8 6M550 496l8 6', '#7a4a2a', 2.5) +
    S('M430 470L506 364L552 480', DEW, 44) + S('M452 430l8 8M480 392l8 8M524 416l4 10', '#7a4a2a', 2.5) + S('M500 344Q524 352 568 468', '#ff8ad0', 4) +
    P('M530 452L574 448L598 520H548Q526 500 530 452Z', '#f4f4f0') + S('M534 462L576 458M536 474L580 470', '#e21e1e', 5) + P('M548 520H598L594 504Q570 512 548 520Z', '#c8ccd0') +
    // torso
    P('M150 372Q226 340 300 388Q352 402 430 404L446 512H130Q112 430 150 372Z', DEW) + P('M150 372Q226 340 300 388Q352 402 430 404L434 440Q300 430 240 404Q190 388 150 372Z', '#f6d0a8', 'opacity=".7"') +
    S('M200 410q12-9 24 0M236 424q12-9 24 0M214 440q12-9 24 0M262 446q10-8 20 0M180 432q10-8 20 0', '#7a4a2a', 2.6) + S('M300 470q6 4 0 8', DEW_D, 3) + C(238, 452, 4, '#c98a6a') + S('M152 370Q226 338 300 386Q352 400 430 402', '#ff8ad0', 4) +
    // leopard briefs, mostly behind the taco
    P('M356 396L440 402L446 512H390Q352 460 356 396Z', `url(#${k}leo)`) + S('M356 396L440 402', '#17120a', 5) +
    // propping arm + head
    S('M176 400Q120 440 112 506', DEW_D, 38) + S('M112 500L130 372', DEW, 34) + E(134, 360, 24, 20, DEW) +
    G('rotate(-10 176 300)', R(160, 340, 40, 44, DEW_D) + E(176, 296, 54, 60, DEW) + P('M180 236Q230 242 230 296Q230 354 180 356Z', DEW_D, 'opacity=".45"') + S('M214 250Q234 282 226 326', '#ff8ad0', 4) +
      P('M122 290q-12 40 0 80 16-18 10-76zM230 290q12 40 0 80-16-18-10-76z', DEWHAIR) + P('M126 310Q176 380 226 310V332Q176 376 126 332Z', DEWHAIR) + P('M120 284Q114 224 176 222Q238 224 232 284Q208 250 176 252Q144 250 120 284Z', DEWHAIR) +
      P('M120 280Q176 244 232 280V258Q176 222 120 258Z', '#d8352a') + P('M230 262l28-12-8 20 18 16-32-4z', '#b82a22') + [136, 156, 176, 196, 216].map((x) => C(x, 262 - (1 - Math.abs(x - 176) / 56) * 11, 3.2, '#fff')).join('') +
      P('M140 302Q154 295 168 302Q154 308 140 302ZM186 302Q200 295 214 302Q200 308 186 302Z', '#fff') + C(156, 302, 4, '#3a2414') + C(202, 302, 4, '#3a2414') + S('M138 299H170M184 299H216', '#1a1318', 4.5) + S('M138 290Q154 284 170 290M186 282Q202 268 218 280', '#4a2e1a', 4.5) +
      E(178, 334, 11, 8, '#c8505a', 'stroke="#7a1a2a" stroke-width="2"') + S('M170 334h16', '#7a1a2a', 2)) +
    // giant foam taco across the lap
    G('translate(380 486) rotate(-6)', E(0, 96, 150, 14, '#000', 'opacity=".35"') + P('M-150 -14q14-44 34-10 12-48 36-8 16-46 40-4 18-44 40 0 20-38 36 8 14-26 30 14z', LETT, `stroke="${LETT_D}" stroke-width="3"`) + C(-80, -22, 17, TOM) + C(-4, -30, 17, TOM) + C(74, -22, 17, TOM) + S('M-50 -30l14-22M30 -34l12-22M104 -22l10-18', CHEESE, 9) +
      P('M-156 -10a156 122 0 0 0 312 0z', SHELL) + P('M-156 -10a156 122 0 0 0 312 0q-34 84-156 84T-156 -10z', SHELL_D, 'opacity=".55"') + S('M-140 4Q-120 64 -60 92', '#ffd08a', 6, 'opacity=".8"') + [[-70, 30], [-10, 60], [50, 24], [90, 54], [-36, 84], [20, 14]].map(([x, y]) => C(x, y, 3.5, '#a8580e')).join('')) +
    // free arm draped on the taco
    S('M250 384Q300 396 316 452', DEW, 36) + S('M250 368Q312 378 334 444', '#ff8ad0', 4) + E(318, 462, 24, 18, DEW) + S('M304 456q14-8 28 0M304 468q14-8 28 0', DEW_D, 2) +
    R(0, 0, 600, 800, '#ff4fa3', 'opacity=".06"');
  return frame(k, 600, 800, defs, body, 0.17, 0.55);
})();

A.c9_ph_h_spatula = ((): string => {
  const k = 'c9_ph_h_spatula';
  const defs = lg(`${k}wall`, [[0, '#dfe8f0'], [1, '#aab8c8']]) + lg(`${k}fl`, [[0, '#e6eaee'], [1, '#8a94a0']]) + lg(`${k}win`, [[0, '#6ac0ff'], [1, '#cfeeff']]) + bl(`${k}sh`, 10);
  const SK = '#f0c4a4', SKD = '#c08c6c';
  const salesman = G('translate(468 0)',
    P('M-62 330Q-66 250 -20 240H24Q70 250 66 330Z', '#f4f4f0') + P('M-8 242h16l6 70-14 14-14-14z', '#c8202a') + S('M66 330Q68 256 26 242', '#fff', 3) +
    R(-12, 212, 24, 34, SKD) + E(0, 180, 36, 42, SK) + P('M2 138Q36 142 36 180Q36 222 2 222Z', SKD, 'opacity=".45"') + P('M-36 176Q-40 136 0 134Q40 136 36 176Q30 152 0 150Q-30 152 -36 176Z', '#6a5a4a') + E(-36, 184, 6, 10, SK) +
    C(-13, 180, 9, '#fff') + C(13, 180, 9, '#fff') + C(-14, 181, 3.6, '#17171c') + C(12, 181, 3.6, '#17171c') + S('M-24 164Q-13 158 -3 164M3 164Q13 158 24 164', '#4a3a2a', 3.5) + S('M-9 204H9', '#5a2a26', 3.5) + S('M0 186v8', SKD, 2.5) + C(-22, 180, 11, 'none', 'stroke="#17171c" stroke-width="2.5"') + C(22, 180, 11, 'none', 'stroke="#17171c" stroke-width="2.5"') + S('M-11 180H11', '#17171c', 2.5) +
    // desk + stapler
    R(-110, 322, 250, 16, '#6a4a2a') + R(-100, 338, 230, 110, '#8a6238') + R(-100, 338, 230, 8, '#000', 'opacity=".2"') + R(60, 270, 60, 52, '#2a2a36', 'rx="4"') + R(82, 316, 16, 8, '#17171c') +
    S('M-58 290Q-70 310 -40 312', '#f4f4f0', 22) + E(-30, 310, 15, 12, SK) + G('rotate(-16 -20 296)', R(-50, 290, 70, 12, '#c8202a', 'rx="5"') + R(-50, 302, 70, 7, '#55595e', 'rx="3"')));
  const body =
    R(0, 0, 600, 480, `url(#${k}wall)`) + R(30, 40, 250, 300, `url(#${k}win)`) + S('M30 40H280V340H30ZM155 40V340', '#fff', 8) + P('M30 340L120 40H180L90 340Z', '#fff', 'opacity=".3"') +
    G('rotate(-4 440 70)', R(330, 34, 240, 76, '#ffd23f', 'rx="6"') + tx(450, 66, 26, '0% APR !!!', '#c8202a', SANS, `${BOLD} ${MID} ${fit(170)}`) + tx(450, 96, 22, '84 MONTHS', '#17171c', SANS, `${BOLD} ${MID} ${fit(150)}`)) +
    R(0, 440, 600, 360, `url(#${k}fl)`) + P('M0 440H600V452H0Z', '#fff', 'opacity=".6"') + salesman +
    // display stand + jet ski
    E(290, 720, 280, 24, '#000', `opacity=".4" filter="url(#${k}sh)"`) + P('M110 690H470L500 730H80Z', '#c8202a') + P('M80 730H500V744H80Z', '#8a0e1a') +
    G('translate(-6 476) scale(1.1)', jetski(false) +
      rider(true,
        // one arm pins the pizza box, the other blows a kiss
        S('M196 -52Q160 -10 196 30', SPAT, 24) + E(204, 36, 15, 13, SPAT) + S('M268 -52Q312 -60 286 -96', SPAT_D, 22) + P('M262 -110Q282 -116 292 -98Q286 -86 268 -90Z', SPAT) + S('M270 -52Q314 -58 290 -92', '#ffe9a0', 3, 'opacity=".9"'),
        E(246, -100, 7, 6, '#c8505a', 'stroke="#5a1420" stroke-width="2"') + P('M306 -150q8-12 16 0 8-12 16 0 0 12-16 24-16-12-16-24z', '#ff4f7a', 'stroke="#fff" stroke-width="2"') + P('M340 -186q5-8 10 0 5-8 10 0 0 8-10 15-10-7-10-15z', '#ff8aa8'),
        P('M192 40Q206 30 222 36L224 60L196 64Z', '#19c8d8') + S('M194 44Q208 36 222 40', '#fff', 3) +
        G('rotate(-7 250 60)', R(182, 6, 150, 124, '#000', 'opacity=".25"') + R(176, 0, 150, 124, '#f4ead2', 'stroke="#b8a878" stroke-width="2.5"') + R(176, 0, 150, 18, '#e2d6b4') + C(251, 62, 34, '#e2412f') + C(251, 62, 26, '#ffd23f') + C(242, 54, 5, '#c8202a') + C(260, 68, 5, '#c8202a') + C(246, 74, 4, '#c8202a') +
          tx(251, 114, 15, 'HOT & READY', '#c8202a', SANS, `${BOLD} ${MID} ${fit(104)}`))) +
      S('M80 -150l-10-14M60 -124l-16-6', '#fff', 4));
  return frame(k, 600, 800, defs, body, 0.15, 0.45);
})();
