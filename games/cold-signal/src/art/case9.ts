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
const ROBE = '#f4f1ea';

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
  R(0, 0, 110, 140, '#8a6410') + R(3, 3, 104, 134, GOLD) + R(9, 9, 92, 122, '#7a5a10') + R(12, 12, 86, 116, '#16505c') + C(40, 40, 40, '#2a8a96', 'opacity=".6"') +
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
const fig = (x: number, y: number, s: number, o: Fig, flip = false): string => {
  const w = o.w ?? 17, sl = o.sleeve ?? o.top;
  const arm = (sx: number, p: number[]): string => S(`M${sx} -127L${p[0]} ${p[1]}L${p[2]} ${p[3]}`, sl, 10) + C(p[2], p[3], 5.6, o.skin);
  return G(`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`,
    (o.under ?? '') + E(0, 1, w + 12, 4, '#000', 'opacity=".3"') +
    (o.skirt
      ? R(-w / 2 - 3, -40, 6, 38, o.skin) + R(w / 2 - 3, -40, 6, 38, o.skin) + P(`M${-w + 2} -78H${w - 2}L${w + 3} -34H${-w - 3}Z`, o.skirt)
      : P(`M${-w + 1} -78H${w - 1}L${w - 2} -3H3L0 -52L-3 -3H${-w + 2}Z`, o.legs)) +
    E(-w / 2 - 1, -2, 9, 4, o.shoes ?? '#15151a') + E(w / 2 + 1, -2, 9, 4, o.shoes ?? '#15151a') +
    arm(-w + 2, o.la ?? [-w - 5, -100, -w - 3, -72]) +
    P(`M${-w} -131Q0 -138 ${w} -131L${w - 1} -72H${-w + 1}Z`, o.top) + (o.belly ? E(0, -92, w + o.belly, 26, o.top) : '') +
    P(`M2 -134Q0 -136 ${w} -131L${w - 1} -72H5Z`, '#000', 'opacity=".18"') +
    (o.rim ? S(`M${w} -130L${w - 1} -74`, o.rim, 2.4, 'opacity=".9"') : '') +
    R(-4, -142, 8, 10, o.skin) + C(0, -152, 13, o.skin) + P('M1 -165A13 13 0 0 1 1 -139Z', '#000', 'opacity=".14"') +
    (o.rim ? S('M9 -162A13 13 0 0 1 9 -142', o.rim, 2.2, 'opacity=".9"') : '') +
    (o.face ?? C(-5, -153, 1.5, '#1a1318') + C(5, -153, 1.5, '#1a1318') + S('M-4 -146Q0 -144 4 -146', '#3a1a14', 1.5)) +
    (o.hair ?? '') + arm(w - 2, o.ra ?? [w + 5, -100, w + 3, -72]) + (o.over ?? ''));
};
const HCAP = 'M-13.5 -153Q-15 -168 0 -167Q15 -168 13.5 -153Q8 -162 0 -161Q-8 -162 -13.5 -153Z';
const SUITV = P('M-5 -134L0 -116L5 -134Z', '#f4f4f0') + P('M-1.5 -131h3l1 14-2.5 3-2.5-3z', '#0a0a0c');
/** Dewey's head dressing (bandana, shag, beard) in fig coordinates. */
const DEWHEAD = P('M-14 -150q-3 16 1 26 5-6 3-24zM14 -150q3 16-1 26-5-6-3-24z', DEWHAIR) + P('M-12 -148q12 20 24 0v6q-12 12-24 0z', DEWHAIR) + P(HCAP, DEWHAIR) + P('M-13.5 -154Q0 -163 13.5 -154V-159Q0 -168 -13.5 -159Z', '#d8352a') + P('M13 -158l8-3-2 6 5 4-9-1z', '#b82a22');
const DEWFACE = S('M-8 -153h6M2 -153h6', '#1a1318', 1.8) + P('M-5 -146Q0 -139 5 -146Z', '#fff', 'stroke="#2a130c" stroke-width="1"');
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
    lg(`${k}sky`, [[0, '#ff8a4a'], [0.5, '#ffc45a'], [1, '#ffe9a0']]) + lg(`${k}gr`, [[0, '#c98a4a'], [1, '#6a3a2a']]) +
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
    R(0, 716, 600, 584, `url(#${k}gr)`) + P('M0 716H600V740H0Z', '#ffe9a0', 'opacity=".25"') +
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
  const house = (x: number, y: number, s: number, c: string, roof: string): string => G(`translate(${x} ${y}) scale(${s})`, R(-9, -6, 18, 12, c) + P('M-12 -6L0 -15L12 -6Z', roof));
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
  const defs = lg(`${k}sky`, [[0, '#2f9ee6'], [1, '#bfeaff']]) + lg(`${k}gr`, [[0, '#d8c48a'], [1, '#a08a58']]) + rg(`${k}sun`, [[0, '#fff', 0.9], [1, '#fff', 0]]);
  const tree = (x: number, y: number, s: number): string => G(`translate(${x} ${y}) scale(${s})`, R(-6, -40, 12, 60, '#6a4a2a') + C(0, -70, 44, '#3c9a3a') + C(-26, -50, 28, '#2f8a34') + C(26, -54, 30, '#4aae42') + C(-8, -84, 20, '#6ac85a'));
  const tent = (x: number, c: string): string => G(`translate(${x} 318)`, P('M-70 2L0 -44L70 2Z', c) + P('M0 -44L70 2H24Z', '#000', 'opacity=".15"') + P('M-70 2H70V14' + 'q-7 8-14 0'.repeat(10) + 'Z', '#fff') + R(-62, 14, 4, 80, '#8a8a8a') + R(58, 14, 4, 80, '#8a8a8a'));
  const dewey = G('translate(388 372) scale(1.1)',
    S('M-38 22Q-70 0 -72 -40', '#3f7f6a', 16) + C(-72, -44, 10, DEW) + S('M-76 -48L-92 -92M-68 -50L-74 -96', '#cfd6dc', 5) + S('M-76 -48L-92 -92', '#fff', 1.5) + DEWBUST + S('M40 22Q58 40 50 60', '#3f7f6a', 16));
  const body =
    R(0, 0, 800, 420, `url(#${k}sky)`) + C(690, 70, 150, `url(#${k}sun)`) + E(170, 90, 90, 22, '#fff', 'opacity=".8"') + E(230, 74, 60, 20, '#fff', 'opacity=".8"') + E(520, 130, 70, 16, '#fff', 'opacity=".6"') +
    tree(40, 380, 1.5) + tree(760, 390, 1.7) + tree(430, 360, 1.1) + tent(120, '#e2412f') + tent(700, '#ffd23f') +
    R(0, 400, 800, 200, `url(#${k}gr)`) + P('M0 400H800V416H0Z', '#fff', 'opacity=".2"') +
    bulbs(0, 150, 400, 190, 16, 12) + bulbs(400, 190, 800, 140, 16, 12) +
    G('translate(40 150) scale(1.95)', truck({ rim: '#fff' })) + dewey +
    fig(92, 560, 1.5, { skin: SPAT, top: '#8a4ad8', legs: '#2a3a6a', hair: P(HCAP, '#1c1410'), rim: '#fff', ra: [30, -110, 40, -138], face: C(3, -153, 1.5, '#1a1318') + C(9, -153, 1.5, '#1a1318') + S('M2 -146Q6 -143 10 -147', '#3a1a14', 1.5) }) +
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
    R(0, 0, 800, 600, '#e8c890', 'opacity=".2"') + R(0, 0, 800, 600, '#6a7a9a', 'opacity=".12"') + tx(770, 570, 26, "10 10 '16", '#ff8a2a', MONO, `${BOLD} text-anchor="end" opacity=".9"`);
  return frame(k, 800, 600, defs, body, 0.26, 0.5);
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
    G('rotate(-2 400 470)', tx(74, 478, 31, 'NO TURKEY?? why does fisk need 180 lbs???', '#d21e1e', HAND, `${BOLD} ${fit(650)}`) + S('M72 492Q400 506 728 488M76 500Q300 510 520 502', '#d21e1e', 4)) +
    R(250, 518, 300, 16, '#aab2ba', 'rx="4"') + R(280, 508, 70, 12, INK, 'rx="5"') + R(366, 508, 70, 12, '#d21e1e', 'rx="5"') + R(452, 506, 50, 16, '#55595e', 'rx="3"') +
    // prep table in the foreground
    R(0, 556, 800, 44, `url(#${k}st)`) + R(0, 556, 800, 5, '#fff', 'opacity=".7"') + P('M40 556V500Q40 490 52 490H168Q180 490 180 500V556Z', '#9aa2aa') + E(110, 492, 64, 12, '#55595e') + S('M150 486L210 420', '#cfd6dc', 7) + R(24, 508, 20, 8, '#55595e', 'rx="3"') + R(176, 508, 20, 8, '#55595e', 'rx="3"') +
    G('translate(690 560)', R(-50, -30, 100, 30, '#f6f1e6', 'rx="4"') + R(-50, -34, 100, 8, '#d8d2c2', 'rx="3"'));
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
    lg(`${k}wall`, [[0, '#7a1430'], [1, '#3a0a1c']]) + lg(`${k}cloth`, [[0, '#fff'], [1, '#c8c2b8']]) + lg(`${k}dome`, [[0, '#fff'], [0.5, '#b8c0c8'], [1, '#6a727a']], 1, 1) + totPat(`${k}tot`, 0.5) +
    rg(`${k}ch`, [[0, '#fff3c0', 0.7], [1, '#ffd870', 0]]) +
    `<pattern id="${k}dm" width="60" height="80" patternUnits="userSpaceOnUse"><path d="M30 6Q44 22 30 40Q16 22 30 6ZM0 46Q14 62 0 80M60 46Q46 62 60 80" fill="none" stroke="${GOLD}" stroke-width="2.5" opacity=".4"/></pattern>`;
  const suit = (x: number, s: number, skin: string, hair: string, flip = false): string => fig(x, 540, s, { skin, top: '#101014', legs: '#0a0a0e', w: 21, rim: '#ffd870', hair, over: SUITV, belly: 2 }, flip);
  const chafer = (x: number, fill: string, open: boolean): string => G(`translate(${x} 0)`,
    S('M-60 470L-70 520M60 470L70 520', '#8a9098', 5) + R(-74, 440, 148, 32, `url(#${k}dome)`, 'rx="6"') + E(0, 440, 70, 14, fill) + E(0, 440, 70, 14, 'none', 'stroke="#e2e6ea" stroke-width="4"') +
    (open ? '' : P('M-70 440A70 46 0 0 1 70 440Z', `url(#${k}dome)`) + R(-10, 388, 20, 8, GOLD, 'rx="4"')) + P('M-10 492h20l-4 16h-12z', '#3a6ae0') + P('M-5 492q5-14 0-22 12 10 5 22z', '#ffb02a'));
  const vase = (x: number): string => G(`translate(${x} 0)`, S('M0 440Q-10 380 -26 350M0 440Q4 370 0 330M0 440Q12 384 30 356', '#3c8a26', 4) + lily(-28, 344, 1.5, -30) + lily(0, 322, 1.7) + lily(32, 350, 1.5, 30) + P('M-16 478Q-22 440 -8 420H8Q22 440 16 478Z', GOLD) + P('M2 420H8Q22 440 16 478H6Z', '#8a6410', 'opacity=".5"'));
  const body =
    R(0, 0, 800, 600, `url(#${k}wall)`) + R(0, 0, 800, 420, `url(#${k}dm)`) + R(0, 396, 800, 30, '#2a0a14') + R(0, 396, 800, 5, GOLD) + R(0, 426, 800, 174, '#4a2a1a') +
    [40, 250, 550, 760].map((x) => R(x - 14, 0, 28, 400, '#e8d8b0') + R(x - 14, 0, 9, 400, '#fff', 'opacity=".4"') + R(x - 22, 380, 44, 18, GOLD)).join('') +
    C(400, 0, 190, `url(#${k}ch)`) + S('M400 0V26M340 40Q400 80 460 40M360 34v18M400 44v22M440 34v18', GOLD, 4) + C(360, 58, 6, '#fff8d0') + C(400, 72, 6, '#fff8d0') + C(440, 58, 6, '#fff8d0') +
    G('translate(318 86) scale(1.5)', louPortrait()) + R(346, 302, 110, 20, GOLD, 'rx="3"') + S('M360 312H442', '#8a6410', 2) +
    suit(120, 1.55, LOU, P(HCAP, '#2a2018')) + suit(236, 1.4, '#d9a680', P(HCAP, '#121014'), true) + suit(540, 1.45, '#c68e62', '') + 
    // the Wishing Well on its gold pedestal
    P('M640 536L652 330H716L728 536Z', GOLD) + P('M690 330H716L728 536H700Z', '#8a6410', 'opacity=".5"') + R(636, 318, 96, 14, '#f6d67a', 'rx="4"') + G('translate(612 222) scale(.94)', well(false)) +
    // buffet
    P('M0 470H800V600H0Z', `url(#${k}cloth)`) + P('M0 470H800V482H0Z', '#fff') + S('M90 482V600M300 482V600M520 482V600M710 482V600', '#b8b2a8', 2, 'opacity=".6"') +
    vase(44) + chafer(170, `url(#${k}tot)`, true) + chafer(350, '#a8281a', true) + chafer(520, '#888', false) + vase(770) +
    E(350, 438, 40, 6, '#e2603a') + G('translate(640 470)', E(0, 0, 50, 10, '#f6f1e6', 'stroke="#c8c2b8"') + miniTaco(-22, -4, 0.9) + miniTaco(4, -6, 0.9) + miniTaco(26, -3, 0.9));
  return frame(k, 800, 600, defs, body, 0.15, 0.5);
})();
