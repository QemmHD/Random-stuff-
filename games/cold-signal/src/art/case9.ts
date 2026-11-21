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
  back: G('rotate(14 136 96)', R(134, 50, 5, 50, '#222', 'rx="2"') + P('M127 18h19v28q-9.500 6-19 0z', '#cfd6dc', 'stroke="#7d8891"') + S('M132 24v16M136.500 24v16M141 24v16', '#7d8891', 1.6)),
  skin: SPAT, shade: SPAT_D, iris: '#20120a',
  brows: 'M78 79Q86 76 95 78M105 78Q114 76 122 79', browC: '#1c1410',
  mouth: `<path d="M88 113Q101 124 113 111Q101 116 88 113Z" fill="#fff" stroke="#2a130c" stroke-width="1.6"/>`,
  top:
    P('M66 76Q60 44 82 38L86 26L93 35L100 21L107 35L114 25L118 38Q140 44 134 76Q126 56 100 54Q74 56 66 76Z', '#1c1410') +
    P('M82 40L86 26L93 37ZM93 37L100 21L107 37ZM107 37L114 25L118 40ZM72 48L74 34L82 42ZM118 42L126 34L128 48Z', '#f6d743') +
    P('M71 83H129V100Q121 103 113 99L105 90H95L87 99Q79 103 71 100Z', '#fff') +
    S('M74 87.500H96M74 91.500H93M74 95.500H89M104 87.500H126M107 91.500H126M111 95.500H126', '#141018', 2.3) + S('M71 85L66 88M129 85L134 88', '#fff', 3) +
    S('M92 141q8 8 16 0', '#e8b830', 2.2, 'stroke-dasharray="2.500 1.500"'),
});

A.av_c9_mom = bust('av_c9_mom', {
  bg: ['#ffe0ec', '#c8588c', '#2a1024'], rim: '#fff', cloth: '#7fc8d8',
  clothIn:
    S('M82 147Q100 162 118 147', '#5aa8ba', 5) + miniTaco(100, 172, 0.9) + C(96, 177, 1.2, '#222') + C(104, 177, 1.2, '#222') + S('M97 181q3 2.500 6 0', '#222', 1.2) +
    tx(100, 196, 8.5, "MY SON'S TRUCK", '#b0284a', SANS, `${BOLD} ${MID} ${fit(66)}`),
  back: E(100, 84, 45, 46, '#b9a57e'),
  skin: '#f0c4a4', shade: '#c8906e', iris: '#3a5a6a',
  brows: 'M77 81Q86 73 95 78M105 78Q114 73 123 81', browC: '#8a7650',
  mouth: `<ellipse cx="100" cy="117.500" rx="9" ry="7.500" fill="#5a1420" stroke="#c22a4a" stroke-width="2.4"/><path d="M94 113.500h12" stroke="#fff" stroke-width="2.6"/><path d="M96 122q4-2.500 8 0" stroke="#e8687a" stroke-width="2.4"/>`,
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
  overNeck: S('M86 138Q100 166 114 138', '#e8b830', 3.4, 'stroke-dasharray="3 1.500"'),
  skin: '#d9a680', shade: '#a87450', iris: '#2a1a10', lid: 87.6,
  inFace: P('M67 100Q80 118 100 114Q120 118 133 100V135H67Z', '#3a2a22', 'opacity=".22"'),
  brows: 'M77 79Q87 79 96 85M104 85Q113 79 123 79', browC: '#121014',
  mouth: `<path d="M90 119Q100 113 111 118.500" stroke="#2a130c" stroke-width="2.6"/><path d="M111 118.500q2-3 1-5" stroke="#2a130c" stroke-width="1.6"/>`,
  lines: S('M97 83v-5M103 83v-5', '#7a4a30', 1.3),
  top: P('M65 80Q60 40 100 34Q140 40 135 80Q131 58 116 52Q96 47 80 55Q70 61 65 80Z', '#121014') + S('M76 50Q96 40 122 48M72 58Q88 46 108 46', '#4a4a58', 1.5),
});

A.av_c9_donna = (() => {
  const k = 'av_c9_donna';
  let net = '';
  for (let i = 0; i < 9; i++) net += `M${92 + i * 8} 30L${52 + i * 8} 110M${68 + i * 8} 30L${108 + i * 8} 110`;
  return bust(k, {
    bg: ['#f6e2b0', '#a0763a', '#1c120a'], rim: '#fff3d0', cloth: '#101012',
    clothIn: P('M80 146Q100 192 120 146Z', TAN) + S('M84 149Q100 172 116 149', '#fff', 4.4, 'stroke-dasharray=".1 5.400"') + P('M100 164l5 6-5 7-5-7z', '#eaf6ff', 'stroke="#9cc"'),
    back: E(100, 60, 54, 46, '#e2d6b0') + C(60, 92, 14, '#e2d6b0') + C(140, 92, 14, '#d0c49e'),
    skin: TAN, shade: TAN_D, iris: '#3a4a2a',
    inFace: E(87, 86, 10, 5, '#5a7ab8', 'opacity=".45"') + E(113, 86, 10, 5, '#5a7ab8', 'opacity=".45"') + E(76, 104, 7, 4, '#e0506a', 'opacity=".3"'),
    brows: 'M77 81Q86 76 95 80M105 77Q114 69 123 76', browC: '#6a4a26',
    mouth: P('M89 115Q95 111.500 100 113.500Q105 111.500 112 113.500Q101 123 89 115Z', '#c21e3a') + S('M90 115Q100 117 111.500 114', '#7a0e22', 1.2),
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
  mouth: `<path d="M91 119Q100 114.500 110 119" stroke="#5a2a26" stroke-width="2.2"/>`,
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
  mouth: P('M82 114Q90 103 100 108.500Q110 103 118 114Q112 123 100 114.500Q88 123 82 114Z', '#f6f3ea', 'stroke="#cfcabc" stroke-width="1"') + `<path d="M92 120Q100 124 108 120" stroke="#2a130c" stroke-width="2.2"/>`,
  lines: `<path d="${CROWS}M82 62q18-6 36 0M84 69q16-5 32 0" stroke="#8a4a36" stroke-width="1.2" opacity=".55"/>`,
  top:
    P('M0 200L10 170H44L52 200Z', '#11a0b8') +
    G('rotate(-28 46 150)', `<rect x="18" y="138" width="62" height="24" rx="12" fill="#ecd9b0"/><rect x="18" y="138" width="36" height="24" rx="10" fill="#cfd6dc"/>` + S('M26 142l6 8-5 8M38 140l5 10-4 10M48 141l3 9', '#9aa4ad', 1.2) + E(78, 150, 4, 9, '#b8742a') + C(77, 147, 2, LETT)) +
    E(34, 164, 14, 11, LOU) + S('M24 160q10-5 20 0M24 167q10-5 20 0', LOU_D, 1.3) + R(20, 168, 9, 4.5, GOLD, 'rx="2"') + C(24.5, 170, 2.2, '#e23a3a') + R(22, 160, 8, 3.5, GOLD, 'rx="1.500"'),
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
  mouth: `<path d="M90 118q5-4.500 10 0t10 0" stroke="#2a130c" stroke-width="2.4"/>`,
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
    [-70, -35, 0, 35, 70].map((a) => `<path d="M100 188Q${a ? 97 : 96.500} 178 100 ${a ? 172 : 169}Q${a ? 103 : 103.500} 178 100 188Z" fill="#2f9e4f" transform="rotate(${a} 100 188)"/>`).join(''),
  back: P('M62 70Q56 120 54 166H82V100ZM138 70Q144 120 146 166H118V100Z', '#15121a') + P('M138 70Q144 120 146 166H136Q136 110 132 80Z', '#7a3ad0'),
  skin: '#c68e62', shade: '#935f3c', iris: '#2a160c', lidCover: 88.6,
  brows: 'M78 81H95M105 81H122', browC: '#15121a',
  mouth: P('M92 115.500Q100 113.500 109 115.500Q100 120 92 115.500Z', '#8a2a4a') + `<path d="M92 116H109" stroke="#3a0e1e" stroke-width="1.4"/>`,
  top:
    P('M64 92V62Q68 32 100 30Q132 32 136 62V92L129 72Q100 66 71 72Z', '#15121a') + S('M76 44Q100 32 124 44', '#3a3448', 1.6) +
    S('M96.500 108.500a3.800 3.800 0 1 0 7 0', '#d9dde2', 1.8) + C(67, 106, 4.5, 'none', 'stroke="#e8b830" stroke-width="1.6"') + C(133, 106, 4.5, 'none', 'stroke="#e8b830" stroke-width="1.6"'),
});
