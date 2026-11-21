// COLD SIGNAL — Case 06 "Touch Move" illustrations.
// Every value in `case6Art` is a complete standalone SVG document string.
// Ids inside each SVG are prefixed with the art key. Original art, no external references.

/** Art registry for Case 06. Keys are the art ids referenced by src/cases/case6.ts. */
export const case6Art: Record<string, string> = {};
const A = case6Art;

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

// Recurring colours.
const POLO = '#1f9150';
const POLO_D = '#156a3a';
const STRAW = '#e6c97c';
const STRAW_D = '#b8944a';
const NAVY = '#1b2f6b';

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
    `<path d="M102 94Q105 104 105.5 108Q101 112 95 108.5" stroke="#000" stroke-opacity=".38" stroke-width="1.9"/>${o.mouth}` +
    `<path d="M95.5 122Q100 123.5 104.5 122" stroke="#000" stroke-opacity=".25" stroke-width="1.5"/>${o.lines ?? ''}</g>` +
    (o.hair ?? '') + (o.top ?? '') +
    `<rect width="200" height="200" fill="url(#${k}-v)"/></svg>`
  );
}
/** Age / laugh lines (stroke set by caller group). */
const WRINKLES = 'M87 105Q83.5 111 86 118M113.5 105Q117 111 114.5 118M80 98Q86 100 92 98.5M108 98.5Q114 100 120 98';
const CROWS = 'M74 87q-4 1-6 4M74 91q-4 2-5 5M126 87q4 1 6 4M126 91q4 2 5 5';

A.av_c6_desmond = bust('av_c6_desmond', {
  bg: ['#f0bd62', '#7a6426', '#141006'], rim: '#ffdc9c', cloth: '#efe4c6',
  clothIn:
    `<path d="M82 146L100 182L118 146Z" fill="#5a3422"/><path d="M82 146L100 170L90 178L74 150ZM118 146L100 170L110 178L126 150Z" fill="#fff8e2"/>` +
    `<path d="M62 158V200M70 156V200M130 156V200M138 158V200" stroke="#cdbf98" stroke-width="1.6" fill="none"/>` +
    `<path d="M88 150Q96 176 100 184Q104 176 112 150" fill="none" stroke="#2a1a10" stroke-width="1.6"/>` +
    `<path d="M95 197v-5q1-6 5-9l-1-3 4 2q6 3 5 10v5z" fill="#a8703a" stroke="#5e3a18" stroke-width="1.2"/><circle cx="101" cy="186.500" r=".9" fill="#2a1a10"/>`,
  skin: '#7c4b30', shade: '#4a2a1b', iris: '#2a160c', lid: 87, low: 94.4,
  inFace: `<path d="M66 82Q68 100 74 110L67 112Z" fill="#f3f0e8" opacity=".9"/><path d="M134 82Q132 100 126 110L133 112Z" fill="#a9a59c" opacity=".9"/>`,
  brows: 'M77.5 82Q86 77 95 80M105 79Q114 75 122.5 79.500', browC: '#efece4',
  mouth:
    `<path d="M86 110Q93 105.500 100 108.500Q107 105.500 114 110Q107 114 100 111.500Q93 114 86 110Z" fill="#f6f3ea" stroke="#cfcabc" stroke-width="1"/>` +
    `<path d="M90 116.500Q101 121.500 111 114.500" stroke="#2a130c" stroke-width="2.4"/><path d="M111 114.500q2.500-1 3-3.500" stroke="#2a130c" stroke-width="1.6"/>`,
  lines: `<path d="${WRINKLES}${CROWS}" stroke="#3a2014" stroke-width="1.2" opacity=".6"/>`,
  top:
    `<ellipse cx="100" cy="64" rx="52" ry="9.500" fill="${STRAW_D}"/><ellipse cx="100" cy="62" rx="52" ry="9" fill="${STRAW}"/>` +
    `<path d="M68 62V36Q100 25 132 36V62Q100 70 68 62Z" fill="${STRAW}"/><path d="M68 62V49Q100 41 132 49V62Q100 70 68 62Z" fill="#17120e"/>` +
    `<path d="M112 31Q132 34 132 62Q120 66 110 66Z" fill="#000" opacity=".18"/><path d="M72 40Q100 30 128 40M70 45Q100 35 130 45" fill="none" stroke="${STRAW_D}" stroke-width="1" opacity=".8"/>` +
    `<path d="M50 62Q100 76 150 62" fill="none" stroke="#fff3c8" stroke-width="1.2" opacity=".7"/>`,
});

A.av_c6_malik = bust('av_c6_malik', {
  bg: ['#7fd0c0', '#22605c', '#06181a'], rim: '#c9fff0', cloth: '#16161a',
  clothIn:
    `<path d="M80 146Q100 162 120 146L118 150Q100 168 82 150Z" fill="#2c2c34"/>` +
    `<text x="100" y="192" ${MID} ${SANS} ${BOLD} font-size="19" fill="#f4f1e6" ${fit(52)}>1. e4</text>`,
  skin: '#8d5a3b', shade: '#56331f', iris: '#24120a', lid: 85.6, low: 94.6,
  brows: 'M77 83.500Q86 81 95 83.500M105 83.500Q114 81 123 83.500', browC: '#17100c',
  mouth:
    `<path d="M90 113.500H110Q110 119.500 100 119.500Q90 119.500 90 113.500Z" fill="#fbf8f0" stroke="#3a1a12" stroke-width="1.6"/>` +
    `<path d="M91 116.300H109" stroke="#8fa3b4" stroke-width="1.5"/><path d="M94 115v2.600M98 115v2.600M102 115v2.600M106 115v2.600" stroke="#5f7486" stroke-width="1.5"/>`,
  hair:
    `<path d="M65 86C64 70 66 30 71 22Q100 14 129 22C134 30 136 70 135 86C132 72 126 62 100 62C74 62 68 72 65 86Z" fill="#15100e"/>` +
    `<path d="M66 84Q66 74 70 66M134 84Q134 74 130 66" stroke="#3a2a22" stroke-width="3" fill="none" opacity=".8"/><path d="M74 26Q100 19 126 26" fill="none" stroke="#4a3a30" stroke-width="2" opacity=".7"/>`,
});

A.av_c6_curtis = bust('av_c6_curtis', {
  bg: ['#f6e28a', '#7a9a3c', '#12200c'], rim: '#fff6c0', cloth: POLO,
  clothIn:
    `<path d="M84 146L100 176L116 146Z" fill="#e79a7c"/><path d="M80 144L100 172L90 182L70 152ZM120 144L100 172L110 182L130 152Z" fill="#2aa862"/><path d="M100 172V200" stroke="${POLO_D}" stroke-width="2"/>` +
    `<path d="M76 150L92 200M124 150L108 200" stroke="${NAVY}" stroke-width="5" fill="none"/>` +
    `<circle cx="140" cy="182" r="9" fill="#f4f1e6"/><path d="M140 176q-5 4 0 12q5-8 0-12z" fill="${POLO_D}"/>`,
  skin: '#e59c7e', shade: '#b0644e', iris: '#3c5a6e', lid: 87.4, low: 93.8,
  inFace: `<path d="M72 96Q84 104 96 98L104 98Q116 104 128 96L128 104Q100 112 72 104Z" fill="#d6604c" opacity=".45"/>`,
  brows: 'M77.500 82Q86 77.500 95 80M105 80Q114 77.500 122.500 82', browC: '#7a5a34',
  mouth:
    `<path d="M84 110Q100 116 116 110Q112 124 100 124Q88 124 84 110Z" fill="#fffdf6" stroke="#7a3226" stroke-width="2"/><path d="M87 114.500Q100 119 113 114.500" stroke="#c9c2b4" stroke-width="1"/>` +
    `<path d="M82 108q-3 1-4 4M118 108q3 1 4 4" stroke="#9a4a3a" stroke-width="1.5"/>`,
  lines: `<path d="${CROWS}" stroke="#a65a44" stroke-width="1.2" opacity=".7"/>`,
  hair:
    `<path d="M64 88C58 50 82 36 100 36C120 36 142 50 136 88C134 72 128 60 114 58C100 54 80 58 66 74Z" fill="#8a6a40"/><path d="M72 62Q86 48 104 46" fill="none" stroke="#c0a068" stroke-width="2" stroke-linecap="round"/>`,
  top:
    `<g fill="#14161c" stroke="#3a3f4c" stroke-width="1.5"><rect x="72" y="36" width="24" height="14" rx="6"/><rect x="104" y="36" width="24" height="14" rx="6"/></g><path d="M96 42h8M72 44L64 62M128 44L136 62" stroke="#14161c" stroke-width="2.4" fill="none"/>` +
    `<path d="M76 40h10l-6 8h-5zM108 40h10l-6 8h-5z" fill="#fff" opacity=".4"/>`,
});

A.av_c6_abena = bust('av_c6_abena', {
  bg: ['#e8a25c', '#7a3c3a', '#170a10'], rim: '#ffd7a8', cloth: '#34688a',
  clothIn:
    `<path d="M84 146L100 170L116 146Z" fill="#5a3526"/><path d="M80 146L100 172L92 178L72 152ZM120 146L100 172L108 178L128 152Z" fill="#417c9e"/>` +
    `<path d="M86 148Q76 176 86 196M114 148Q124 176 114 196" fill="none" stroke="#e0b53a" stroke-width="1.4" stroke-dasharray="1.500 2.500"/>` +
    `<g fill="#fff" fill-opacity=".2" stroke="#e0b53a" stroke-width="1.8"><rect x="80" y="186" width="17" height="11" rx="4"/><rect x="103" y="186" width="17" height="11" rx="4"/></g><path d="M97 191h6" stroke="#e0b53a" stroke-width="1.8"/>` +
    `<path d="M20 192Q70 174 150 196V204H20Z" fill="#2a5672"/><path d="M180 190Q130 176 60 200" fill="none" stroke="#1d4058" stroke-width="3"/>`,
  skin: '#70432c', shade: '#40241a', iris: '#22100a', lid: 87.4, low: 94,
  brows: 'M77.500 82.500Q86 80 95 82M105 79.500Q114 73.500 123 78.500', browC: '#8f8a86',
  mouth: `<path d="M89 115.500Q100 113.500 111 116" stroke="#3a1612" stroke-width="2.6"/><path d="M111 116q2 0 3-1.500" stroke="#3a1612" stroke-width="1.5"/>`,
  lines: `<path d="${WRINKLES}" stroke="#2c160e" stroke-width="1.1" opacity=".5"/>`,
  hair:
    `<g stroke="#9a9692" stroke-width="6.500" stroke-linecap="round" fill="none"><path d="M84 30Q78 14 86 6M94 28Q92 12 98 3M104 28Q106 12 112 4M114 30Q120 16 124 10"/></g>` +
    `<g stroke="#5e5a58" stroke-width="1.2" fill="none" opacity=".7"><path d="M83 24l5-2M94 18l5-1M106 18l5 1M117 22l4 2M86 12l4 1M110 10l4 2"/></g>` +
    `<path d="M62 84C56 44 80 26 100 26C120 26 144 44 138 84C132 66 120 58 100 58C80 58 68 66 62 84Z" fill="#d79a1e"/>` +
    `<g fill="none" stroke-width="4"><path d="M66 62Q100 34 134 62" stroke="#1f7a46"/><path d="M63 72Q100 46 137 72" stroke="#b3261e"/><path d="M71 52Q100 28 129 52" stroke="#17120e"/></g>` +
    `<path d="M112 28C136 36 142 60 138 84C134 70 126 62 114 59Z" fill="#000" opacity=".22"/><path d="M78 34l6 20M92 29l3 22M108 29l-2 22M122 34l-6 20" stroke="#f6d66a" stroke-width="1.6" opacity=".8"/>`,
});

A.av_c6_vic = bust('av_c6_vic', {
  bg: ['#c8687a', '#5a1c34', '#12060c'], rim: '#ffc9d6', cloth: '#f6f2e8',
  clothIn:
    `<path d="M80 146L100 198L120 146Z" fill="#c9966f"/><path d="M80 144L98 200H80L64 154ZM120 144L102 200H120L136 154Z" fill="#fffdf6"/><path d="M80 144L98 200M120 144L102 200" stroke="#cfc8b6" stroke-width="1.5" fill="none"/>` +
    `<path d="M86 152Q100 178 114 152" fill="none" stroke="#e7b93c" stroke-width="2.6" stroke-dasharray="3 1.200"/>` +
    `<path d="M40 168q14 10 12 32M160 168q-14 10-12 32" stroke="#cfc8b6" stroke-width="1.6" fill="none"/>`,
  skin: '#dba783', shade: '#a2705a', iris: '#3a2a1c', lid: 88, low: 93.6,
  inFace: `<path d="M70 108Q100 138 130 108V134H70Z" fill="#2a1c1c" opacity=".2"/>`,
  brows: 'M77.500 81Q86 78.500 95 81.500M105 80Q114 75 122.500 78', browC: '#1c1214',
  mouth: `<path d="M90 116Q100 118.500 111 112.500" stroke="#7a3a34" stroke-width="2.6"/><path d="M111 112.500q2.500-1 3-4" stroke="#7a3a34" stroke-width="1.6"/>`,
  hair:
    `<path d="M64 90C58 44 82 30 102 30C126 30 142 48 136 90C134 74 130 62 122 54C104 50 84 50 72 60C68 68 66 78 64 90Z" fill="#1a1216"/>` +
    `<path d="M74 54Q92 36 120 40M78 58Q96 44 124 48M72 62Q78 50 88 44" fill="none" stroke="#5a4650" stroke-width="1.8" stroke-linecap="round"/>`,
});

A.av_c6_hank = bust('av_c6_hank', {
  bg: ['#b9c4a4', '#4c5a44', '#0c120c'], rim: '#f2ffd8', cloth: '#7a4a34',
  clothIn:
    `<path d="M82 146L100 190L118 146Z" fill="#dcd6c6"/><path d="M82 146L100 166L92 172L78 150ZM118 146L100 166L108 172L122 150Z" fill="#f4efe2"/>` +
    `<path d="M70 150L98 200H66L46 160ZM130 150L102 200H134L154 160Z" fill="#94603f"/><path d="M72 152L99 200M128 152L101 200" stroke="#5a3424" stroke-width="2.5" fill="none"/>` +
    `<g stroke="#5a3424" stroke-width="1.2" opacity=".6" fill="none"><path d="M30 172h36M26 182h44M24 192h50M134 172h36M130 182h44M126 192h50"/></g><circle cx="100" cy="196" r="3.500" fill="#3a2418"/>`,
  skin: '#e6bca0', shade: '#a67e68', iris: '#5a7a8a', lid: 87.6, low: 93.8,
  inFace: `<path d="M65 98C70 112 80 108 88 107Q100 103 112 107C120 108 130 112 135 98V134H65Z" fill="#f6f4ee" opacity=".55"/>`,
  brows: 'M77 82.500Q86 78.500 95 82M105 82Q114 78.500 123 82.500', browC: '#f1eee6',
  mouth:
    `<path d="M89 115Q100 117.500 111 115" stroke="#7a4a40" stroke-width="2.4"/>` +
    `<path d="M106 115.500L134 124" stroke="#6a4424" stroke-width="7"/><path d="M106 115.500L111 117" stroke="#3a2412" stroke-width="7"/><path d="M118 119.200l2.500.800" stroke="#d9a53a" stroke-width="7.200" stroke-linecap="butt"/>`,
  lines: `<path d="${WRINKLES}${CROWS}M82 60q18-5 36 0M84 66q16-4 32 0" stroke="#8a5f4c" stroke-width="1.2" opacity=".6"/>`,
  top:
    `<path d="M63 76C60 40 80 28 100 28C120 28 140 40 137 76Q100 62 63 76Z" fill="#1a274c"/><path d="M110 29C132 34 140 50 137 76Q124 70 110 68Z" fill="#000" opacity=".25"/>` +
    `<path d="M60 76Q100 58 140 76Q146 82 150 90Q100 70 50 90Q54 82 60 76Z" fill="#111a36"/><path d="M52 89Q100 70 148 89" fill="none" stroke="#e0b53a" stroke-width="1.6"/>` +
    `<text x="100" y="50" ${MID} ${SANS} ${BOLD} font-size="11" fill="#e9c66a" ${fit(34)}>NAVY</text><text x="100" y="59" ${MID} ${SANS} ${BOLD} font-size="5.500" fill="#e9c66a" ${fit(36)}>VETERAN</text>`,
});

A.av_c6_toni = bust('av_c6_toni', {
  bg: ['#9cc0e0', '#35527a', '#0a101c'], rim: '#dcecff', cloth: '#8fb4dc',
  clothIn:
    `<path d="M84 146L100 172L116 146Z" fill="#5c3a26"/><path d="M80 144L100 170L90 180L70 152ZM120 144L100 170L110 180L130 152Z" fill="#a9c8ea"/><path d="M100 170V200" stroke="#5f84ae" stroke-width="2"/>` +
    `<circle cx="100" cy="182" r="2" fill="#f4f1e6"/><circle cx="100" cy="194" r="2" fill="#f4f1e6"/>` +
    `<path d="M24 170L52 156L58 166L30 182Z" fill="#1c2c50"/><path d="M176 170L148 156L142 166L170 182Z" fill="#1c2c50"/>` +
    `<rect x="52" y="176" width="34" height="13" rx="2" fill="#1c2c50"/><text x="69" y="185.500" ${MID} ${SANS} ${BOLD} font-size="6" fill="#f2d46a" ${fit(28)}>TRANSIT</text>` +
    `<rect x="118" y="176" width="26" height="9" rx="1.500" fill="#f4f1e6"/><text x="131" y="183" ${MID} ${SANS} ${BOLD} font-size="5.500" fill="#1c2c50" ${fit(20)}>T. GRANT</text>`,
  skin: '#8a5636', shade: '#52301e', iris: '#26140c', lid: 88, low: 94.4,
  brows: 'M77.500 82.500Q86 78 95 80.500M105 80.500Q114 78 122.500 82.500', browC: '#1a1210',
  mouth: `<path d="M88 113.500Q100 121 112 113.500" stroke="#4a1e18" stroke-width="2.6"/><path d="M91 115.500Q100 119 109 115.500" stroke="#f3e6da" stroke-width="1.6"/>`,
  lines: `<path d="M80 98Q86 100.500 93 98.500M107 98.500Q114 100.500 120 98M87 105Q84 110 86 116M113 105Q116 110 114 116" stroke="#3a1e12" stroke-width="1.2" opacity=".55"/>`,
  hair:
    `<path d="M62 92C52 40 82 24 100 24C118 24 148 40 138 92C136 74 130 62 118 58C104 54 86 56 74 62C68 70 64 80 62 92Z" fill="#17100e"/>` +
    `<g fill="#3a2a24"><circle cx="76" cy="44" r="2"/><circle cx="90" cy="34" r="2"/><circle cx="106" cy="32" r="2"/><circle cx="120" cy="40" r="2"/><circle cx="84" cy="50" r="2"/><circle cx="100" cy="44" r="2"/><circle cx="114" cy="50" r="2"/><circle cx="68" cy="60" r="2"/><circle cx="130" cy="56" r="2"/></g>` +
    `<circle cx="67" cy="104" r="2.600" fill="#e7b93c"/>`,
});

A.av_c6_pak = bust('av_c6_pak', {
  bg: ['#c9b08a', '#5c5248', '#12100e'], rim: '#ffe9c4', cloth: '#7d8288',
  clothIn:
    `<path d="M84 146L100 174L116 146Z" fill="#e8e4da"/><path d="M80 144L100 172L90 182L70 152ZM120 144L100 172L110 182L130 152Z" fill="#92979d"/><path d="M100 172V200" stroke="#5a5f66" stroke-width="2"/>` +
    `<rect x="112" y="174" width="34" height="15" rx="7.500" fill="#f4f1e6" stroke="#b3261e" stroke-width="1.5"/><text x="129" y="185.500" ${MID} ${SANS} ${BOLD} font-size="10" fill="#b3261e" ${fit(22)}>PAK</text>` +
    `<path d="M52 178h30v22H52z" fill="#6c7178" stroke="#5a5f66" stroke-width="1.5"/><path d="M58 178v-14M66 178v-18M74 178v-12" stroke="#d9a53a" stroke-width="4" stroke-linecap="round"/><path d="M66 160v-8" stroke="#cfd4da" stroke-width="2"/>` +
    `<path d="M10 196Q100 186 190 196V204H10Z" fill="#5a3a22"/>`,
  skin: '#dcae84', shade: '#a27858', iris: '#2a1a10', lid: 87.8, low: 93.6,
  brows: 'M77.500 82Q86 78.500 95 81M105 81Q114 78.500 122.500 82', browC: '#3a3634',
  mouth: `<path d="M89 114.500Q100 119 111 114.500" stroke="#8a4a40" stroke-width="2.5"/>`,
  lines: `<path d="${WRINKLES}M82 62q18-4 36 0" stroke="#8a5f44" stroke-width="1.2" opacity=".55"/>`,
  hair:
    `<path d="M64 88C58 46 84 32 100 32C118 32 142 46 136 88C134 72 128 60 116 56C100 60 78 58 64 88Z" fill="#3c3a3a"/><path d="M70 62Q84 44 104 42M112 50Q124 54 130 68" fill="none" stroke="#a8a6a2" stroke-width="2.2" stroke-linecap="round"/>` +
    `<path d="M58 96L74 70" stroke="#e9c23a" stroke-width="4" stroke-linecap="butt"/><path d="M58 96l-3 5 5.500-1.500" fill="#2a2a2a"/><path d="M74 70l2.500-4" stroke="#d97a8a" stroke-width="4"/>`,
});

// ════════════════════════════════════════════════════════════════ CHESS
// Piece silhouettes in a 100x100 cell. Fill/stroke are inherited from the <use>.
const PIECES: Record<string, string> = {
  p: `<path d="M50 20a13 13 0 0 1 9 22.500q9 5 5 12h-28q-4-7 5-12a13 13 0 0 1 9-22.500z"/><path d="M39 54.500h22q2 14 13 24v8.500H26v-8.500q11-10 13-24z"/>`,
  r: `<path d="M27 16h11v8h7v-8h10v8h7v-8h11v20l-8 7v24l9 10v10H26V77l9-10V43l-8-7z"/><path d="M35 43h30M35 67h30" fill="none"/>`,
  n: `<path d="M27 87V77q2-16 16-27q-9 2-17 9l-6-7q6-15 20-24l1-12l9 8q26 5 28 36q0 16-5 27z"/><circle cx="43" cy="33" r="2.600"/><path d="M58 30q10 10 10 28" fill="none"/>`,
  b: `<circle cx="50" cy="13" r="5.500"/><path d="M50 19q20 16 13 34q-2 5-6 7q4 10 15 18v9H28v-9q11-8 15-18q-4-2-6-7q-7-18 13-34z"/><path d="M52 28l-8 14M38 60h24" fill="none"/>`,
  q: `<path d="M18 32l12 26l6-34l9 32l5-38l5 38l9-32l6 34l12-26l-9 38q-2 10 5 18v9H22v-9q7-8 5-18z"/><circle cx="18" cy="29" r="5"/><circle cx="36" cy="21" r="5"/><circle cx="50" cy="16" r="5"/><circle cx="64" cy="21" r="5"/><circle cx="82" cy="29" r="5"/><path d="M28 70h44" fill="none"/>`,
  k: `<path d="M46 6h8v8h8v8h-8v9q24-9 27 10q1 12-13 26q2 8 7 12v8H25v-8q5-4 7-12q-14-14-13-26q3-19 27-10v-9h-8v-8h8z"/><path d="M32 59q18-6 36 0M50 31v24" fill="none"/>`,
};
/** Scholar's-mate set-up after 1.e4 e5 2.Bc4 Nc6 3.Qh5 Nf6 (rank 8 first). */
const FEN = 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR';
const WHITE_PC = 'fill="#fbf4dc" stroke="#2a1d12"';
const BLACK_PC = 'fill="#1d1712" stroke="#e9d6a8"';

A.wall_c6_lock = ((): string => {
  const k = 'wall_c6_lock', c = 54, bx = 96, by = 352;
  let dark = '', pcs = '', sh = '';
  for (let i = 0; i < 64; i++) if (((i >> 3) + (i & 7)) % 2 === 1) dark += `M${bx + (i & 7) * c} ${by + (i >> 3) * c}h${c}v${c}h-${c}z`;
  FEN.split('/').forEach((row, ri) => {
    let f = 0;
    for (const ch of row) {
      if (ch >= '1' && ch <= '8') { f += +ch; continue; }
      const x = bx + f * c, y = by + ri * c, t = ch.toLowerCase();
      sh += `<use href="#${k}_${t}" transform="translate(${x + 5} ${y + 6}) scale(.54)"/>`;
      pcs += `<use href="#${k}_${t}" transform="translate(${x} ${y}) scale(.54)" ${ch === t ? BLACK_PC : WHITE_PC}/>`;
      f++;
    }
  });
  let labels = '';
  for (let i = 0; i < 8; i++) {
    const fx = bx + i * c + c / 2, ry = by + (7 - i) * c + c / 2 + 10;
    for (const [d, col] of [[1.5, '#fff1cc'], [0, '#2a1c10']] as [number, string][]) {
      labels += `<text x="${fx + d}" y="${by + 8 * c + 40 + d}" fill="${col}">${'abcdefgh'[i]}</text><text x="${bx - 30 + d}" y="${ry + d}" fill="${col}">${i + 1}</text>`;
    }
  }
  const defs =
    lg(`${k}a`, [[0, '#4a3524'], [0.3, '#8f6c44'], [0.62, '#a67a48'], [1, '#3a2716']]) +
    rg(`${k}b`, [[0, '#ffd08a', 0.75], [0.5, '#ff9e3c', 0.22], [1, '#ff9e3c', 0]], 0.72, 0.4, 0.6) +
    rg(`${k}c`, [[0, '#fff3c4', 0.85], [1, '#fff3c4', 0]]) +
    bl(`${k}d`, 14) + bl(`${k}e`, 1.6) +
    `<filter id="${k}f" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".35" numOctaves="3" seed="11"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1.6 1.6 1.6 0 -2.1"/></filter>` +
    Object.entries(PIECES).map(([t, d]) => `<g id="${k}_${t}">${d}</g>`).join('');
  const body =
    `<rect width="600" height="1300" fill="url(#${k}a)"/><rect width="600" height="1300" filter="url(#${k}f)" opacity=".35"/>` +
    `<rect width="600" height="1300" fill="url(#${k}b)"/>` +
    // plane-leaf shadows over the top, table edge + pavement below
    `<g filter="url(#${k}d)" fill="#1a0f06" opacity=".5"><path d="M-40 0H330Q300 90 220 110Q150 80 90 150Q20 190-40 150Z"/><ellipse cx="520" cy="60" rx="110" ry="60"/><ellipse cx="400" cy="210" rx="60" ry="26"/><ellipse cx="60" cy="1010" rx="120" ry="50"/></g>` +
    `<path d="M0 1150H600V1300H0Z" fill="#1c130c"/><path d="M0 1150H600V1164H0Z" fill="#000" opacity=".45"/><path d="M0 1146H600" stroke="#f4d9a0" stroke-width="3" opacity=".5"/>` +
    `<g stroke="#000" stroke-opacity=".35" stroke-width="2"><path d="M0 1230H600M150 1164V1230M430 1164V1230M290 1230V1300"/></g>` +
    // inlaid board
    `<rect x="${bx - 12}" y="${by - 12}" width="${8 * c + 24}" height="${8 * c + 24}" fill="#2a1c10"/><rect x="${bx - 7}" y="${by - 7}" width="${8 * c + 14}" height="${8 * c + 14}" fill="#b8915a"/>` +
    `<rect x="${bx}" y="${by}" width="${8 * c}" height="${8 * c}" fill="#e2cfa4"/><path d="${dark}" fill="#8a6a48"/>` +
    `<rect x="${bx}" y="${by}" width="${8 * c}" height="${8 * c}" filter="url(#${k}f)" opacity=".22"/>` +
    `<rect x="${bx}" y="${by}" width="${8 * c}" height="${8 * c}" fill="none" stroke="#2a1c10" stroke-width="2"/>` +
    `<circle cx="${bx + 7.5 * c}" cy="${by + 3.5 * c}" r="46" fill="url(#${k}c)"/>` +
    `<g ${SERIF} ${BOLD} font-size="30" ${MID}>${labels}</g>` +
    `<g fill="#140b04" opacity=".42" filter="url(#${k}e)">${sh}</g>` +
    `<g stroke-width="4.2" stroke-linejoin="round" stroke-linecap="round">${pcs}</g>` +
    `<path d="M${bx + 7 * c + 20} ${by + 3 * c + 26}l2 16" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".9"/>` +
    // chalk
    `<g transform="rotate(-2 300 900)"><text x="300" y="906" ${HAND} ${BOLD} font-size="35" fill="#f6f1e4" opacity=".93" ${MID} ${fit(452)} rotate="-3 2 -2 0 3 -1 2 -3 1 0 -2 3 1 -2 2 0 -3 2 1 -1 2 -2">THE MOVE THAT ENDS IT.</text>` +
    `<path d="M76 924Q300 914 524 926" fill="none" stroke="#f6f1e4" stroke-width="2.5" stroke-dasharray="26 5 60 4" opacity=".55"/></g>` +
    // painted table number
    `<text x="300" y="1094" ${SANS} ${BOLD} font-size="96" fill="#f4eede" opacity=".82" ${MID} transform="rotate(3 300 1060)">4</text>` +
    `<path d="M262 1112q40 6 78-2" fill="none" stroke="#f4eede" stroke-width="5" stroke-linecap="round" opacity=".6"/>`;
  return frame(k, 600, 1300, defs, body, 0.2, 0.45);
})();

A.wall_c6_home = ((): string => {
  const k = 'wall_c6_home';
  const defs =
    lg(`${k}a`, [[0, '#e9d7ae'], [0.55, '#d6bf90'], [1, '#a98a5c']], 0.4, 1) +
    rg(`${k}b`, [[0, '#fff2c8', 0.8], [1, '#fff2c8', 0]], 0.15, 0.2, 0.8) +
    lg(`${k}c`, [[0, '#fffdf2'], [1, '#d9cba6']], 1, 0.3) +
    bl(`${k}d`, 5) +
    `<filter id="${k}f" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".4" numOctaves="3" seed="5"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1.5 1.5 1.5 0 -2"/></filter>`;
  const body =
    `<rect width="600" height="1300" fill="url(#${k}a)"/><rect width="600" height="1300" filter="url(#${k}f)" opacity=".22"/>` +
    `<path d="M-20 300H620M-20 1010H620M70 -20V1320M545 -20V1320" stroke="#7a5f3a" stroke-width="5" opacity=".55"/>` +
    `<path d="M-20 304H620M-20 1014H620M74 -20V1320M549 -20V1320" stroke="#fff6dc" stroke-width="2" opacity=".5"/>` +
    `<path d="M0 0H70V300H0ZM545 300H600V1010H545ZM70 1010H545V1300H70Z" fill="#6a4f30" opacity=".3"/>` +
    `<rect width="600" height="1300" fill="url(#${k}b)"/>` +
    `<g transform="translate(244 720) matrix(1 0 -1.7 -.42 0 0)" fill="#3a2410" opacity=".4" filter="url(#${k}d)"><g transform="scale(2.4) translate(-50 -87)">${PIECES.n}</g></g>` +
    `<ellipse cx="240" cy="722" rx="72" ry="16" fill="#3a2410" opacity=".4"/>` +
    `<g transform="translate(120 512) scale(2.4)" fill="url(#${k}c)" stroke="#5a4426" stroke-width="2" stroke-linejoin="round">${PIECES.n}</g>` +
    `<path d="M196 612q16-34 46-52" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".7"/>` +
    tx(300, 1236, 21, 'TABLE 4 · KIDS PLAY FREE', '#4a3620', SANS, `${MID} ${BOLD} ${fit(330)} opacity=".8"`);
  return frame(k, 600, 1300, defs, body, 0.18, 0.3);
})();

// ════════════════════════════════════════════════════════════════ SCENE KIT
/** Scatter of soft discs (foliage, bokeh). */
const blobs = (seed: number, x: number, y: number, w: number, h: number, n: number, r: number, fill: string, op = 1): string => {
  const R = rng(seed);
  let s = '';
  for (let i = 0; i < n; i++) s += `<circle cx="${n1(x + R() * w)}" cy="${n1(y + R() * h)}" r="${n1(r * (0.6 + R() * 0.8))}"/>`;
  return `<g fill="${fill}" opacity="${op}">${s}</g>`;
};
/** Chessboard in simple perspective: back edge width wb at y, front edge width wf at y+h. */
const pboard = (x: number, y: number, wb: number, wf: number, h: number, n = 8, light = '#e2cfa4', dark = '#806040'): string => {
  const P = (u: number, v: number): string => `${n1(x + (u * 2 - 1) * (wb + (wf - wb) * v) / 2)} ${n1(y + h * v)}`;
  let d = '';
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if ((i + j) % 2 === 1) d += `M${P(i / n, j / n)}L${P((i + 1) / n, j / n)}L${P((i + 1) / n, (j + 1) / n)}L${P(i / n, (j + 1) / n)}Z`;
  return `<path d="M${P(0, 0)}L${P(1, 0)}L${P(1, 1)}L${P(0, 1)}Z" fill="${light}"/><path d="${d}" fill="${dark}"/>`;
};
/** Tiny standing chessman for table tops. */
const mp = (x: number, y: number, s: number, white: boolean): string =>
  `<path transform="translate(${x} ${y}) scale(${s})" d="M-6 0h12l-3-11a5.500 5.500 0 1 0-6 0z" fill="${white ? '#fbf4dc' : '#1d1712'}" stroke="${white ? '#5a4426' : '#000'}" stroke-width=".8"/>`;
/** Table 4: granite pedestal table with inlaid board and the hand-painted "4". */
const table4 = (x: number, y: number, s: number, top = '#cdbb94', edge = '#9a8662', ped = '#6e5e44', num = true, n = 8): string =>
  `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="176" rx="120" ry="13" fill="#000" opacity=".3"/><path d="M-34 70L-46 174H46L34 70Z" fill="${ped}"/><path d="M6 70H34L46 174H12Z" fill="#000" opacity=".22"/>` +
  `<path d="M-112 0H112L142 46H-142Z" fill="${top}"/><path d="M-142 46H142V74H-142Z" fill="${edge}"/><path d="M-142 46H142" stroke="#fff" stroke-opacity=".35" stroke-width="1.500"/>` +
  pboard(0, 5, 126, 152, 36, n) +
  (num ? `<text x="-98" y="70" ${SANS} ${BOLD} font-size="27" fill="#f6f1e2" ${MID} transform="rotate(-4 -98 62)">4</text>` : '') + `</g>`;
/** Battered green-and-cream analogue chess clock. */
const clock = (x: number, y: number, s: number): string =>
  `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-24" y="-49" width="14" height="8" rx="2" fill="#b9b29c"/><rect x="11" y="-46" width="14" height="6" rx="2" fill="#b9b29c"/>` +
  `<rect x="-38" y="-42" width="76" height="42" rx="5" fill="#2f7d55"/><rect x="-34" y="-38" width="68" height="27" rx="3" fill="#efe6c8"/>` +
  `<circle cx="-16" cy="-24.500" r="11" fill="#fffdf2" stroke="#3a3426" stroke-width="1.500"/><circle cx="16" cy="-24.500" r="11" fill="#fffdf2" stroke="#3a3426" stroke-width="1.500"/>` +
  `<path d="M-16 -24.500V-33M-16 -24.500l6 3M16 -24.500V-33M16 -24.500l-5-5" stroke="#1a1612" stroke-width="1.600" stroke-linecap="round"/><path d="M-38 -8H38" stroke="#1d5a3c" stroke-width="2"/></g>`;
/** Dez's straw porkpie, side view. */
const hatSide = (x: number, y: number, s: number, rot = 0): string =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><ellipse cx="0" cy="1" rx="47" ry="8.500" fill="${STRAW_D}"/><ellipse cx="0" cy="-1" rx="47" ry="8" fill="${STRAW}"/>` +
  `<path d="M-28 -2V-27Q0 -35 28 -27V-2Q0 5 -28 -2Z" fill="${STRAW}"/><path d="M-28 -2V-14Q0 -21 28 -14V-2Q0 5 -28 -2Z" fill="#17120e"/><path d="M12 -32Q28 -30 28 -2Q20 2 10 3Z" fill="#000" opacity=".18"/></g>`;
/** The Dunmore cash envelope (200x124 at s=1). */
const envl = (x: number, y: number, s: number, rot = 0): string =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><rect x="-100" y="-62" width="200" height="124" rx="7" fill="#f6f3ea" stroke="#b9b3a2" stroke-width="2"/><rect x="-92" y="-54" width="184" height="108" rx="4" fill="none" stroke="#dcd6c6" stroke-width="1.500" stroke-dasharray="5 4"/>` +
  `<path d="M-30 -8v-16h9v-10h9v16h7v-24h10v24h7v-13h9v23z" fill="${NAVY}"/><path d="M-40 -6H40" stroke="${NAVY}" stroke-width="2.500"/>` +
  `<text x="0" y="24" ${MID} ${SANS} ${BOLD} font-size="27" fill="${NAVY}" ${fit(160)}>DUNMORE</text><text x="0" y="44" ${MID} ${SANS} ${BOLD} font-size="15" fill="${NAVY}" ${fit(160)}>PROPERTIES</text></g>`;
/** The pavilion: low brick building, green tin roof, Conservancy office window. */
const pav = (x: number, y: number, s: number, brick: string, roof: string, win: string, sticker = true): string =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-130 0H130V78H-130Z" fill="${brick}"/><path d="M-130 20H130M-130 40H130M-130 60H130" stroke="#000" stroke-opacity=".16" stroke-width="1.500"/>` +
  `<path d="M-148 3L-120 -42H120L148 3Z" fill="${roof}"/><path d="M-96 -42L-112 3M-64 -42L-74 3M-32 -42L-37 3M0 -42V3M32 -42L37 3M64 -42L74 3M96 -42L112 3" stroke="#000" stroke-opacity=".25" stroke-width="2"/><path d="M-148 3H148" stroke="#fff" stroke-opacity=".3" stroke-width="2"/>` +
  `<rect x="-108" y="22" width="30" height="56" fill="#1c3a2a"/><rect x="-58" y="16" width="40" height="34" fill="#22201c"/><path d="M-38 16v34" stroke="${brick}" stroke-width="2"/>` +
  `<rect x="24" y="12" width="84" height="44" fill="${win}" stroke="#f4eede" stroke-width="3"/><path d="M66 12v44" stroke="#f4eede" stroke-width="2"/>` +
  (sticker ? `<rect x="28" y="36" width="76" height="18" fill="#fffdf4"/><text x="66" y="44" ${MID} ${SANS} ${BOLD} font-size="7.500" fill="${POLO_D}" ${fit(68)}>HALSEY PARK</text><text x="66" y="52" ${MID} ${SANS} ${BOLD} font-size="7.500" fill="${POLO_D}" ${fit(68)}>CONSERVANCY</text>` : '') + `</g>`;
/** Lamppost with a park thermometer board. */
const lampTherm = (x: number, top: number, bottom: number, ty: number, label: string, lit: boolean): string =>
  `<rect x="${x - 5}" y="${top}" width="10" height="${bottom - top}" fill="#1c1a18"/><path d="M${x - 16} ${bottom}h32l-6-16h-20z" fill="#1c1a18"/>` +
  `<path d="M${x - 20} ${top}h40l-8-34h-24z" fill="${lit ? '#ffe6a0' : '#e9dcb4'}" stroke="#1c1a18" stroke-width="4"/><path d="M${x - 26} ${top - 34}h52l-26-16z" fill="#1c1a18"/>` +
  `<rect x="${x - 48}" y="${ty}" width="96" height="62" rx="6" fill="#fbf6e6" stroke="#1c1a18" stroke-width="3"/><rect x="${x - 40}" y="${ty + 8}" width="9" height="40" rx="4.500" fill="#e2dccb"/><rect x="${x - 40}" y="${ty + 14}" width="9" height="34" rx="4.500" fill="#d3261e"/><circle cx="${x - 35.5}" cy="${ty + 50}" r="7" fill="#d3261e"/>` +
  `<text x="${x + 10}" y="${ty + 42}" ${MID} ${SANS} ${BOLD} font-size="29" fill="#b3201a" ${fit(62)}>${label}</text>`;
/** Row of spectators seen from behind, some filming on their phones. */
const crowd = (seed: number, x0: number, x1: number, y: number, step: number, s: number, fill: string, phones = 0.55, glow = '#d6ecff'): string => {
  const R = rng(seed);
  let o = '';
  for (let x = x0; x <= x1; x += step * (0.8 + R() * 0.4)) {
    const yy = y + R() * 16 * s, ph = R() < phones;
    o += `<g transform="translate(${n1(x)} ${n1(yy)}) scale(${s})"><circle r="17" cy="-30" fill="${fill}"/><path d="M-34 60Q-34 -8 0 -8Q34 -8 34 60Z" fill="${fill}"/>` +
      (ph ? `<path d="M26 10L34 -52" stroke="${fill}" stroke-width="11" stroke-linecap="round"/><rect x="24" y="-80" width="20" height="33" rx="3" fill="#0c0c10"/><rect x="26.500" y="-77" width="15" height="27" fill="${glow}"/>` : '') + `</g>`;
  }
  return o;
};

type Arm = [number, number, number, number];
interface Fig {
  skin: string; shade: string; shirt: string;
  long?: boolean; hair?: string; face?: string; eyes?: string; hat?: string;
  la?: Arm; ra?: Arm; pre?: string; over?: string; legs?: string;
}
/** Stylised figure. Origin = base of the neck; 1 unit ≈ 1 px at s=1 (head ~54 tall). */
const fig = (x: number, y: number, s: number, o: Fig): string => {
  const arm = (sx: number, a?: Arm): string => a
    ? `<path d="M${sx} 16L${a[0]} ${a[1]}" stroke="${o.shirt}" stroke-width="25"/><path d="M${sx} 16L${a[0]} ${a[1]}" stroke="#000" stroke-opacity=".1" stroke-width="25"/>` +
      `<path d="M${a[0]} ${a[1]}L${a[2]} ${a[3]}" stroke="${o.long ? o.shirt : o.skin}" stroke-width="${o.long ? 21 : 17}"/><circle cx="${a[2]}" cy="${a[3]}" r="11" fill="${o.skin}"/>`
    : '';
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke-linecap="round" stroke-linejoin="round">` +
    (o.legs ? `<path d="M-34 120L-36 420H-4L0 170L4 420H36L34 120Z" fill="${o.legs}"/>` : '') +
    `<path d="M-44 14Q-46 0 -20 -6H20Q46 0 44 14L36 132H-36Z" fill="${o.shirt}"/><path d="M8 -6H20Q46 0 44 14L36 132H14Z" fill="#000" opacity=".16"/>` +
    (o.pre ?? '') +
    `<path d="M-9 -26V-2Q0 7 9 -2V-26Z" fill="${o.shade}"/>` +
    `<ellipse cx="-22" cy="-52" rx="4" ry="7" fill="${o.skin}"/><ellipse cx="22" cy="-52" rx="4" ry="7" fill="${o.shade}"/>` +
    `<path d="M-22 -52C-22 -90 22 -90 22 -52C22 -34 14 -18 0 -18C-14 -18 -22 -34 -22 -52Z" fill="${o.skin}"/><path d="M5 -80C22 -78 22 -60 22 -52C22 -34 14 -18 0 -18C7 -30 9 -42 6 -54Z" fill="${o.shade}" opacity=".7"/>` +
    (o.eyes ?? `<ellipse cx="-9" cy="-54" rx="2.600" ry="3.200" fill="#1a1210"/><ellipse cx="9" cy="-54" rx="2.600" ry="3.200" fill="#1a1210"/><path d="M-14 -61q5-3 10-1M4 -62q5-2 10 1" stroke="#1a1210" stroke-width="2" fill="none"/>`) +
    `<path d="M1 -52q3 8 2 11q-3 2-6 0" stroke="#000" stroke-opacity=".35" stroke-width="1.600" fill="none"/>` +
    (o.face ?? `<path d="M-8 -33q8 6 16 0" stroke="#3a1612" stroke-width="2.400" fill="none"/>`) +
    (o.hair ?? '') + (o.hat ?? '') + arm(-40, o.la) + arm(40, o.ra) + (o.over ?? '') + `</g>`;
};
const GRIN = `<path d="M-11 -35Q0 -30 11 -35Q9 -24 0 -24Q-9 -24 -11 -35Z" fill="#fffdf6" stroke="#4a1c14" stroke-width="1.600"/>`;
const F_HAT =
  `<ellipse cx="0" cy="-73" rx="37" ry="7" fill="${STRAW_D}"/><ellipse cx="0" cy="-75" rx="37" ry="6.500" fill="${STRAW}"/><path d="M-23 -76V-97Q0 -104 23 -97V-76Q0 -70 -23 -76Z" fill="${STRAW}"/>` +
  `<path d="M-23 -76V-86Q0 -92 23 -86V-76Q0 -70 -23 -76Z" fill="#17120e"/><path d="M9 -101Q23 -99 23 -76Q16 -73 8 -72Z" fill="#000" opacity=".16"/>`;
const F_TACHE = `<path d="M-11 -37Q-5 -42 0 -39Q5 -42 11 -37Q5 -34 0 -36Q-5 -34 -11 -37Z" fill="#f6f3ea"/>`;
const DEZ: Fig = {
  skin: '#7c4b30', shade: '#4a2a1b', shirt: '#efe4c6',
  hair: `<path d="M-23 -60q-1 14 3 22l-4 2zM23 -60q1 14-3 22l4 2z" fill="#f3f0e8"/>`,
  pre: `<path d="M-12 -6L0 20L12 -6Z" fill="#5a3422"/><path d="M-14 -7L0 14L-7 20L-20 -2ZM14 -7L0 14L7 20L20 -2Z" fill="#fff8e2"/><path d="M-26 22V130M-18 20V130M18 20V130M26 22V130" stroke="#cdbf98" stroke-width="1.500" fill="none"/>`,
  hat: F_HAT,
  face: F_TACHE + `<path d="M-9 -32Q0 -25 9 -32Q0 -29 -9 -32Z" fill="#fffdf6" stroke="#2a130c" stroke-width="1.800"/>`,
};
const CURTIS: Fig = {
  skin: '#e59c7e', shade: '#b0644e', shirt: POLO,
  hair: `<path d="M-23 -56C-27 -94 27 -94 23 -56C19 -72 10 -78 0 -78C-10 -78 -19 -72 -23 -56Z" fill="#8a6a40"/><g fill="#14161c"><rect x="-17" y="-92" width="15" height="9" rx="4"/><rect x="2" y="-92" width="15" height="9" rx="4"/></g><path d="M-2 -88h4" stroke="#14161c" stroke-width="2"/>`,
  pre: `<path d="M-10 -6L0 18L10 -6Z" fill="#e59c7e"/><path d="M-14 -8L0 14L-8 22L-22 -2ZM14 -8L0 14L8 22L22 -2Z" fill="#2aa862"/><path d="M-13 4L-5 64M13 4L5 64" stroke="${NAVY}" stroke-width="3.500" fill="none"/><rect x="-10" y="62" width="20" height="26" rx="2" fill="#f4f1e6" stroke="#b9b3a2" stroke-width="1"/><rect x="-6" y="67" width="12" height="9" fill="${POLO_D}"/>`,
  face: GRIN,
};
const TONI: Fig = {
  skin: '#8a5636', shade: '#52301e', shirt: '#8fb4dc',
  hair: `<path d="M-25 -54C-31 -98 31 -98 25 -54C21 -74 10 -79 0 -79C-10 -79 -21 -74 -25 -54Z" fill="#17100e"/>`,
  pre: `<path d="M-10 -6L0 16L10 -6Z" fill="#5c3a26"/><path d="M-14 -8L0 14L-8 22L-22 -2ZM14 -8L0 14L8 22L22 -2Z" fill="#a9c8ea"/><path d="M0 14V132" stroke="#5f84ae" stroke-width="1.500"/><rect x="-32" y="34" width="22" height="10" rx="1.500" fill="#1c2c50"/><path d="M-28 39h14" stroke="#f2d46a" stroke-width="2"/><path d="M-46 4L-26 -4L-22 4L-42 14Z" fill="#1c2c50"/>`,
};
const MALIK: Fig = {
  skin: '#8d5a3b', shade: '#56331f', shirt: '#f2b430',
  hair: `<path d="M-24 -56C-25 -80 -24 -106 -20 -110Q0 -116 20 -110C24 -106 25 -80 24 -56C19 -72 10 -76 0 -76C-10 -76 -19 -72 -24 -56Z" fill="#15100e"/>`,
  face: `<path d="M-11 -36Q0 -32 11 -36Q9 -24 0 -24Q-9 -24 -11 -36Z" fill="#fffdf6" stroke="#3a1a12" stroke-width="1.600"/><path d="M-9 -31.500Q0 -28.500 9 -31.500" stroke="#7f95a8" stroke-width="1.500" fill="none"/><path d="M-6 -33v3.400M-2 -32.500v3.600M2 -32.500v3.600M6 -33v3.400" stroke="#5f7486" stroke-width="1.400"/>`,
};
const VIC: Fig = {
  skin: '#dba783', shade: '#a2705a', shirt: '#f6f2e8', long: true,
  hair: `<path d="M-24 -52C-28 -96 28 -96 24 -52C22 -70 16 -78 4 -80C-8 -80 -20 -72 -24 -52Z" fill="#1a1216"/><path d="M-18 -74Q-4 -86 16 -80" stroke="#5a4650" stroke-width="1.500" fill="none"/>`,
  pre: `<path d="M-11 -6L0 44L11 -6Z" fill="#c9966f"/><path d="M-14 -8L-2 46L-12 30L-22 -2ZM14 -8L2 46L12 30L22 -2Z" fill="#fffdf6" stroke="#cfc8b6" stroke-width="1"/><path d="M-8 2Q0 16 8 2" fill="none" stroke="#e7b93c" stroke-width="2"/>`,
  eyes: `<ellipse cx="-9" cy="-54" rx="2.600" ry="2.600" fill="#1a1210"/><ellipse cx="9" cy="-54" rx="2.600" ry="2.600" fill="#1a1210"/><path d="M-15 -62l11 3M15 -62l-11 3" stroke="#1a1210" stroke-width="2.400" fill="none"/>`,
  face: `<path d="M-8 -31q8-5 16 0" stroke="#5a2a24" stroke-width="2.400" fill="none"/>`,
};
const COP: Fig = {
  skin: '#c99672', shade: '#946a50', shirt: '#22305a',
  hat: `<path d="M-25 -70Q0 -100 25 -70Q0 -78 -25 -70Z" fill="#141c38"/><path d="M-27 -68Q0 -78 27 -68L29 -62Q0 -72 -29 -62Z" fill="#0c1226"/><circle cx="0" cy="-80" r="3.500" fill="#e7c64a"/>`,
  pre: `<path d="M-30 30l8-3 8 3v8l-8 5-8-5z" fill="#e7c64a"/><path d="M-10 -6L0 12L10 -6Z" fill="#c99672"/>`,
  face: `<path d="M-7 -31h14" stroke="#4a2018" stroke-width="2.400" fill="none"/>`,
};

// ════════════════════════════════════════════════════════════════ COVER
A.cover_case6 = ((): string => {
  const k = 'cover_case6';
  const defs =
    lg(`${k}a`, [[0, '#1c1210'], [0.45, '#5e3220'], [0.8, '#c9722e'], [1, '#e89a4a']]) +
    lg(`${k}b`, [[0, '#6a4226'], [0.4, '#3c2414'], [1, '#150c08']]) +
    rg(`${k}c`, [[0, '#ffe2a0', 0.95], [0.25, '#ffac48', 0.5], [1, '#ff8a2a', 0]]) +
    rg(`${k}d`, [[0, '#ffc470', 0.6], [1, '#ffc470', 0]]) +
    bl(`${k}e`, 7) + bl(`${k}f`, 2.5);
  const body =
    `<rect width="600" height="480" fill="url(#${k}a)"/>` +
    blobs(21, -30, 300, 250, 120, 14, 50, '#1e1410') + blobs(22, 400, 250, 240, 170, 16, 52, '#1a110e') +
    blobs(23, -40, -40, 220, 120, 10, 60, '#120b09', 0.9) + blobs(24, 430, -50, 220, 150, 12, 56, '#120b09', 0.9) +
    pav(245, 392, 1.02, '#5e3024', '#1f5e42', '#ffd470', false) +
    `<ellipse cx="312" cy="427" rx="60" ry="40" fill="url(#${k}d)"/>` +
    `<g filter="url(#${k}e)" opacity=".5"><path d="M0 398Q150 384 300 400T600 392V430Q450 444 300 428T0 438Z" fill="#e89a4a"/></g>` +
    `<rect y="470" width="600" height="330" fill="url(#${k}b)"/>` +
    `<g stroke="#000" stroke-opacity=".28" stroke-width="2"><path d="M0 520H600M0 590H600M0 690H600M300 470L260 800M420 470L560 800M180 470L-40 800M520 470L760 800M80 470L-300 800"/></g>` +
    `<ellipse cx="300" cy="640" rx="330" ry="110" fill="url(#${k}d)"/>` +
    lampTherm(508, 150, 640, 268, '104°', true) +
    `<circle cx="508" cy="130" r="230" fill="url(#${k}c)"/>` +
    // bench + hat
    `<path d="M392 668H640V690H392Z" fill="#5a3a22"/><path d="M392 668H640" stroke="#e8a85a" stroke-width="3"/><path d="M410 690V780M560 690V790" stroke="#2a1a10" stroke-width="12"/>` +
    `<path d="M380 616H640V634H380ZM380 584H640V602H380Z" fill="#4a2e1a"/><path d="M380 616H640M380 584H640" stroke="#c98a48" stroke-width="2"/>` +
    hatSide(528, 662, 1.3, -5) +
    table4(238, 556, 1.62, '#d9b680', '#a37c4c', '#5e4630') +
    mp(170, 596, 2.1, false) + mp(215, 580, 1.9, false) + mp(262, 590, 2, true) + mp(300, 574, 1.8, false) + mp(196, 614, 2.3, true) + mp(150, 572, 1.8, true) + 
    `<g transform="translate(352 596) rotate(76) scale(.4)" fill="#fbf4dc" stroke="#5a4426" stroke-width="4" stroke-linejoin="round">${PIECES.k}</g>` +
    `<ellipse cx="238" cy="596" rx="210" ry="46" fill="#ffb45a" opacity=".16"/>` +
    `<g filter="url(#${k}f)" stroke="#ffd9a0" stroke-opacity=".3" stroke-width="2" fill="none"><path d="M40 452q20-6 40 0t40 0t40 0M330 458q20-6 40 0t40 0t40 0M150 318q20-5 40 0t40 0"/></g>`;
  return frame(k, 600, 800, defs, body, 0.2, 0.62);
})();

// ════════════════════════════════════════════════════════════════ MAP
A.map_c6 = ((): string => {
  const k = 'map_c6', R = rng(61);
  let bld = '', trees = '';
  for (let i = 0; i < 70; i++) {
    const x = R() * 780, y = R() * 580, w = 14 + R() * 26, h = 12 + R() * 22;
    const inPark = x + w > 250 && x < 566 && y + h > 144 && y < 426;
    const inRiver = y < (x + w - 480) * 1.23 + 10 && y + h > (x - 610) * 1.23 - 10;
    if (!inPark && !inRiver) bld += `<rect x="${n1(x)}" y="${n1(y)}" width="${n1(w)}" height="${n1(h)}"/>`;
  }
  const spots: [number, number][] = [[368, 288], [480, 204], [400, 360], [256, 312]];
  for (let i = 0; i < 60; i++) {
    const x = 274 + R() * 268, y = 168 + R() * 234;
    if (spots.every(([sx, sy]) => Math.hypot(x - sx, y - sy) > 34)) trees += `<circle cx="${n1(x)}" cy="${n1(y)}" r="${n1(5 + R() * 5)}"/>`;
  }
  const disc = (x: number, y: number, inner: string, r = 18): string =>
    `<g transform="translate(${x} ${y})"><circle r="${r}" cy="2" fill="#3a2414" opacity=".3"/><circle r="${r}" fill="#fff8e6" stroke="#5a3a22" stroke-width="2.500"/>${inner}</g>`;
  const defs = lg(`${k}a`, [[0, '#9cc4d2'], [1, '#6f9fb4']], 1, 1) + rg(`${k}b`, [[0, '#fff6dc', 0.5], [1, '#fff6dc', 0]], 0.3, 0.3, 0.7);
  const body =
    `<rect width="800" height="600" fill="#e3d2aa"/>` +
    `<g stroke="#f7efd9" stroke-width="11" fill="none"><path d="M60 0V600M150 0V600M256 0V600M560 0V600M650 0V600M740 0V600M0 60H800M0 150H800M0 420H800M0 500H800M0 566H800"/><path d="M256 232H0M256 340H0M560 290H800" stroke-width="7"/></g>` +
    `<g fill="#c98a66" opacity=".5">${bld}</g>` +
    // river + bridge
    `<path d="M494 -10H596L810 252V378Z" fill="url(#${k}a)" stroke="#5a8496" stroke-width="2.500"/>` +
    `<g stroke="#e6f4f6" stroke-width="2" fill="none" opacity=".7"><path d="M560 30q8-5 16 0t16 0M640 150q8-5 16 0t16 0M700 230q8-5 16 0t16 0M740 300q8-5 16 0t16 0M610 70q8-5 16 0t16 0M760 250q8-5 16 0"/></g>` +
    `<path d="M612 150H722" stroke="#5a3a22" stroke-width="19"/><path d="M606 150H728" stroke="#f7efd9" stroke-width="12"/><path d="M640 141v18M667 141v18M694 141v18" stroke="#5a3a22" stroke-width="2.500"/>` +
    // park
    `<rect x="262" y="156" width="292" height="258" rx="16" fill="#9dba78" stroke="#5f8246" stroke-width="3.500"/>` +
    `<path d="M290 190Q360 170 420 196Q396 250 320 250Q280 230 290 190ZM430 300Q500 280 536 320Q530 392 470 396Q430 360 430 300Z" fill="#b3cc8c" opacity=".8"/>` +
    `<g fill="#5f8a48">${trees}</g>` +
    `<g fill="none" stroke="#f1e4c0" stroke-width="7" stroke-linecap="round"><path d="M262 312Q320 318 368 288M368 288Q380 200 408 156M400 360Q410 400 404 414M480 204Q530 230 554 228M400 360Q330 380 262 372"/></g>` +
    `<path d="M368 288Q410 222 480 204Q474 300 400 360Q372 332 368 288" fill="none" stroke="#7a3f22" stroke-width="3.500" stroke-dasharray="1 8" stroke-linecap="round"/>` +
    // plaza: grid of tables
    `<rect x="338" y="266" width="60" height="44" rx="6" fill="#ead9b0" stroke="#8a6a44" stroke-width="2"/>` +
    [0, 1, 2].map((i) => [0, 1].map((j) => `<rect x="${345 + i * 17}" y="${272 + j * 17}" width="12" height="12" fill="#fbf4dc" stroke="#3a2a1c" stroke-width="1.500"/><path d="M${345 + i * 17} ${272 + j * 17}h6v6h-6zM${351 + i * 17} ${278 + j * 17}h6v6h-6z" fill="#3a2a1c"/>`).join('')).join('') +
    // pavilion
    `<g transform="translate(480 204)"><rect x="-27" y="-9" width="54" height="24" fill="#3a2414" opacity=".3"/><rect x="-25" y="-4" width="50" height="17" fill="#a8523a" stroke="#5a2a1c" stroke-width="1.500"/><path d="M-31 -3L-23 -17H23L31 -3Z" fill="#2f7d55" stroke="#1d5a3c" stroke-width="1.500"/><path d="M-12 -17l-3 14M0 -17v14M12 -17l3 14" stroke="#1d5a3c" stroke-width="1.200"/><rect x="5" y="1" width="12" height="8" fill="#ffe9a0"/></g>` +
    // fountain
    `<g transform="translate(400 360)"><circle r="17" fill="#d9ccae" stroke="#7a6a50" stroke-width="2.500"/><circle r="11.500" fill="#8fc0d0"/><path d="M-2 6V-2Q-7 -5 -3 -8Q1 -10 2 -6Q6 -10 2 -13l8 2-7 1Q7 -5 3 -1V6" fill="#3f5a4a" stroke="#3f5a4a" stroke-width="1.200" stroke-linejoin="round"/></g>` +
    // library
    disc(256, 312, `<path d="M-11 -6Q-5 -9 0 -5Q5 -9 11 -6V7Q5 4 0 8Q-5 4 -11 7Z" fill="#b3523a" stroke="#5a2a1c" stroke-width="1.500"/><path d="M0 -5V8" stroke="#5a2a1c" stroke-width="1.500"/><path d="M-8 -3q3-1 5 0M-8 1q3-1 5 0M3 -3q3-1 5 0M3 1q3-1 5 0" stroke="#fff8e6" stroke-width="1.200" fill="none"/>`) +
    // hospital
    disc(192, 132, `<rect x="-11" y="-11" width="22" height="22" rx="4" fill="#fff"/><path d="M-3.500 -9h7v5.500h5.500v7h-5.500v5.500h-7v-5.500h-5.500v-7h5.500z" fill="#d3261e"/>`) +
    // home: tenement
    `<g transform="translate(144 432)"><rect x="-13" y="-17" width="30" height="40" fill="#3a2414" opacity=".3"/><rect x="-15" y="-21" width="30" height="40" fill="#b3603f" stroke="#5a2a1c" stroke-width="2"/><path d="M-17 -21h34" stroke="#5a2a1c" stroke-width="4"/>` +
    `<g fill="#ffe9a0"><rect x="-10" y="-15" width="6" height="6"/><rect x="4" y="-15" width="6" height="6"/><rect x="-10" y="-4" width="6" height="6"/><rect x="4" y="-4" width="6" height="6"/></g><rect x="-3" y="9" width="6" height="10" fill="#3a2414"/><path d="M-12 -7h10M-12 4h10M-2 -7l-8 11" stroke="#2a1a10" stroke-width="1.200" fill="none"/></g>` +
    // café: cup with a rook
    disc(704, 108, `<path d="M-11 -5H9V3Q9 11 -1 11Q-11 11 -11 3Z" fill="#fff" stroke="#5a3a22" stroke-width="2"/><path d="M9 -2q7 0 6 5t-7 4" fill="none" stroke="#5a3a22" stroke-width="2"/><g transform="translate(-9.500 -6.500) scale(.17)" fill="#5a3a22">${PIECES.r}</g><path d="M-6 -9q-2-3 0-5M2 -9q-2-3 0-5" stroke="#8a6a50" stroke-width="1.400" fill="none"/>`) +
    // OTB: horseshoe
    disc(624, 480, `<circle r="14" fill="#1f5e42"/><path d="M-7 8V-1a7 7 0 0 1 14 0V8" fill="none" stroke="#e7c64a" stroke-width="5"/><g fill="#1f5e42"><circle cx="-7" cy="4" r="1"/><circle cx="7" cy="4" r="1"/><circle cx="-6" cy="-3" r="1"/><circle cx="6" cy="-3" r="1"/><circle cx="0" cy="-8" r="1"/></g>`) +
    // scale + compass
    `<g stroke="#4a3220" stroke-width="2.500" fill="none"><path d="M40 560H165M40 553v14M102.500 555v10M165 553v14"/></g>` + tx(102, 546, 15, '100 m', '#4a3220', SERIF, `${MID} ${BOLD}`) +
    `<g transform="translate(60 80)"><circle r="20" fill="#f7efd9" stroke="#4a3220" stroke-width="2"/><path d="M0 -15L5 0L0 15L-5 0Z" fill="#f7efd9" stroke="#4a3220" stroke-width="1.500"/><path d="M0 -15L5 0H-5Z" fill="#a8362a"/></g>` + tx(60, 52, 14, 'N', '#4a3220', SERIF, `${MID} ${BOLD}`) +
    `<rect width="800" height="600" fill="url(#${k}b)"/><rect x="8" y="8" width="784" height="584" fill="none" stroke="#7a5a3a" stroke-width="3" opacity=".6"/>`;
  return frame(k, 800, 600, defs, body, 0.14, 0.32);
})();

// ════════════════════════════════════════════════════════════════ PHOTOS
A.c6_ph_tables = ((): string => {
  const k = 'c6_ph_tables';
  const defs =
    lg(`${k}a`, [[0, '#f4b452'], [0.6, '#ff8a3c'], [1, '#d9603a']]) +
    rg(`${k}b`, [[0, '#fff8d0', 1], [0.25, '#ffd67a', 0.75], [1, '#ffb04a', 0]]) +
    lg(`${k}c`, [[0, '#d9995a'], [1, '#6e3f26']]) + bl(`${k}d`, 2.5);
  const body =
    `<rect width="800" height="350" fill="url(#${k}a)"/><circle cx="560" cy="262" r="190" fill="url(#${k}b)"/>` +
    blobs(31, -30, 262, 860, 50, 18, 38, '#a8582e', 0.85) + blobs(32, -30, 290, 860, 40, 16, 30, '#6e4a26', 0.9) +
    `<rect y="330" width="800" height="270" fill="url(#${k}c)"/>` +
    `<g stroke="#5a2e1a" stroke-opacity=".3" stroke-width="2" fill="none"><path d="M0 360H800M0 400H800M0 460H800M0 540H800M400 330L340 600M480 330L640 600M560 330L940 600M320 330L40 600M240 330L-260 600"/></g>` +
    `<g fill="#4a2414" opacity=".3"><path d="M90 470L420 350L440 356L150 500Z"/><path d="M700 470L560 350h14L800 440Z"/></g>` +
    `<g filter="url(#${k}d)" stroke="#fff2c8" stroke-opacity=".5" stroke-width="3" fill="none"><path d="M0 318q25-7 50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0M0 334q25 7 50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0"/></g>` +
    table4(200, 352, 0.3, '#e0b884', '#a37848', '#6e4a2c', false, 4) + table4(455, 346, 0.27, '#e0b884', '#a37848', '#6e4a2c', false, 4) + table4(575, 368, 0.4, '#e0b884', '#a37848', '#6e4a2c', false, 4) + table4(88, 384, 0.46, '#e0b884', '#a37848', '#6e4a2c', false, 4) +
    // plane trees
    `<path d="M28 0Q44 220 22 480H92Q72 220 96 0Z" fill="#8f7c58"/><path d="M40 60q16 10 8 40q-14-8-8-40zM60 180q18 14 6 50q-14-16-6-50zM36 300q20 10 14 44q-18-10-14-44zM70 380q12 16 4 44q-12-14-4-44z" fill="#cbb88a"/><path d="M68 0Q64 220 92 480H74Q52 220 56 0Z" fill="#000" opacity=".2"/>` +
    `<path d="M742 0Q752 200 736 430H790Q778 200 800 0Z" fill="#7a6848"/><path d="M752 90q14 12 6 40q-12-10-6-40zM764 240q14 12 6 44q-12-12-6-44z" fill="#b9a678"/>` +
    blobs(33, -60, -50, 920, 100, 18, 66, '#3a4420') + blobs(34, -60, -20, 920, 80, 14, 42, '#56642a', 0.95) + blobs(35, -40, 20, 880, 60, 10, 22, '#93902f', 0.8) +
    // banner
    `<path d="M92 118L170 140M638 132L742 104" stroke="#3a2a1c" stroke-width="2.500"/>` +
    `<path d="M166 124Q400 138 642 116L646 180Q400 202 170 190Z" fill="#fbf4dc"/><path d="M166 124Q400 138 642 116L642.500 124Q400 146 166.500 132ZM169.500 182Q400 194 645.500 172L646 180Q400 202 170 190Z" fill="${POLO}"/>` +
    `<path id="${k}p" d="M180 170Q400 184 634 160" fill="none"/><text ${SANS} ${BOLD} font-size="26" fill="#1c3a2a"><textPath href="#${k}p" ${fit(440)}>HALSEY HEAT BLITZ OPEN · FINAL 9PM</textPath></text>` +
    lampTherm(655, 232, 470, 262, '104°F', false) +
    // table 4 + clock
    table4(318, 418, 1.4, '#e6c088', '#b0844e', '#6e4a2c') +
    clock(392, 462, 0.95) + mp(262, 446, 1.6, true) + mp(292, 460, 1.8, true) + mp(322, 442, 1.5, false) + mp(246, 470, 1.9, false) + mp(350, 474, 1.9, true) +
    `<rect width="800" height="600" fill="#ff9a3c" opacity=".1"/>`;
  return frame(k, 800, 600, defs, body, 0.18, 0.45);
})();

/** Banded bundle of $100 bills (52x124). */
const BUNDLE =
  `<rect x="-23" y="-59" width="52" height="124" rx="3" fill="#56705a"/><rect x="-26" y="-62" width="52" height="124" rx="3" fill="#a9c4a2" stroke="#56705a" stroke-width="1.500"/>` +
  `<rect x="-21" y="-57" width="42" height="114" fill="none" stroke="#6f8f72" stroke-width="1.500"/><ellipse cx="0" cy="-36" rx="11" ry="14" fill="#7d9c80"/><text x="0" y="50" ${MID} ${SANS} ${BOLD} font-size="11" fill="#4a6a50">100</text>` +
  `<rect x="-27" y="-14" width="54" height="30" fill="#f6e9a8" stroke="#b9a85a" stroke-width="1"/><text x="0" y="7" ${MID} ${SANS} ${BOLD} font-size="16" fill="#4a3c10" ${fit(46)}>$1,000</text>`;

A.c6_ph_count = ((): string => {
  const k = 'c6_ph_count';
  const defs =
    lg(`${k}a`, [[0, '#d6dcc0'], [1, '#8f9a80']]) + lg(`${k}b`, [[0, '#ece8da'], [1, '#b3ad98']]) +
    rg(`${k}c`, [[0, '#f4ffe8', 0.8], [1, '#f4ffe8', 0]]) + bl(`${k}d`, 10) + `<g id="${k}u">${BUNDLE}</g>`;
  let bs = '';
  for (let i = 0; i < 8; i++) bs += `<use href="#${k}u" transform="translate(${112 + i * 57} ${474 + Math.abs(i - 3.5) * 4}) rotate(${(i - 3.5) * 4.5})"/>`;
  const body =
    `<rect width="800" height="600" fill="url(#${k}a)"/>` +
    `<g stroke="#6f7a62" stroke-opacity=".35" stroke-width="2"><path d="M0 110H800M0 200H800M0 290H800M120 20V110M360 20V110M640 20V110M240 110V200M520 110V200M720 110V200M120 200V290M640 200V290"/></g>` +
    `<rect x="230" y="22" width="400" height="22" rx="4" fill="#fff" filter="url(#${k}d)"/><rect x="240" y="26" width="380" height="14" rx="4" fill="#fbfff2"/><ellipse cx="430" cy="60" rx="420" ry="150" fill="url(#${k}c)"/>` +
    // wall clock 10:44 + notice
    `<circle cx="690" cy="130" r="40" fill="#fbf8ee" stroke="#2a2a26" stroke-width="5"/><path d="M690 130L674 106M690 130L661 138" stroke="#1a1a18" stroke-width="4" stroke-linecap="round"/><circle cx="690" cy="130" r="3" fill="#1a1a18"/>` +
    `<rect x="216" y="130" width="96" height="120" fill="#fbf4dc" transform="rotate(-2 264 190)"/><path d="M230 156h66M230 174h66M230 192h50M230 210h60" stroke="#8a8468" stroke-width="3" transform="rotate(-2 264 190)"/>` +
    fig(66, 262, 1.6, { ...TONI, ra: [56, 74, 8, -30], eyes: `<ellipse cx="-9" cy="-54" rx="3" ry="3.800" fill="#1a1210"/><ellipse cx="9" cy="-54" rx="3" ry="3.800" fill="#1a1210"/><path d="M-14 -64q5-3 10-1M4 -65q5-2 10 1" stroke="#1a1210" stroke-width="2" fill="none"/>` }) +
    fig(470, 214, 1.62, { ...CURTIS, la: [-56, 64, -15, -22], face: `<path d="M-8 -33q8 4 16 0" stroke="#7a3226" stroke-width="2.400" fill="none"/>`, over: `<path d="M-12 -24L-6 -32" stroke="#e59c7e" stroke-width="7"/>` }) +
    `<path d="M30 372H770L880 600H-80Z" fill="url(#${k}b)"/><path d="M30 372H770" stroke="#fff" stroke-width="3" opacity=".7"/><path d="M30 376H770L774 384H26Z" fill="#000" opacity=".12"/>` +
    `<g opacity=".25" fill="#3a3a2c" filter="url(#${k}d)"><ellipse cx="320" cy="536" rx="250" ry="18"/><ellipse cx="662" cy="548" rx="110" ry="14"/></g>` +
    bs + envl(662, 478, 0.95, 7) +
    `<path d="M548 372L538 418" stroke="#e59c7e" stroke-width="27" stroke-linecap="round"/><path d="M536 420l-12 10M540 424l-5 14M546 424l2 14" stroke="#e59c7e" stroke-width="9" stroke-linecap="round"/>` +
    `<rect width="800" height="600" fill="#c8e6c0" opacity=".07"/>`;
  return frame(k, 800, 600, defs, body, 0.18, 0.5);
})();

A.c6_ph_safe = ((): string => {
  const k = 'c6_ph_safe';
  const defs =
    lg(`${k}a`, [[0, '#8a8468'], [1, '#6a644e']]) + lg(`${k}b`, [[0, '#a9aeb4'], [1, '#6c7178']], 1, 1) +
    lg(`${k}c`, [[0, '#c3c8ce'], [1, '#7d838a']], 1, 0) + rg(`${k}d`, [[0, '#fff6dc', 0.5], [1, '#fff6dc', 0]], 0.5, 0.45, 0.6) + bl(`${k}e`, 9);
  let keys = '';
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) keys += `<rect x="${412 + c * 19}" y="${270 + r * 19}" width="14" height="14" rx="2.500"/>`;
  const body =
    `<rect width="600" height="800" fill="url(#${k}a)"/><rect y="560" width="600" height="240" fill="#5e4e3e"/><path d="M0 560H600" stroke="#3a3026" stroke-width="10"/>` +
    `<g stroke="#000" stroke-opacity=".12" stroke-width="2"><path d="M0 620H600M0 700H600M100 566L60 800M300 566V800M500 566L540 800"/></g>` +
    `<rect x="0" y="70" width="600" height="46" fill="#7a4e2c"/><rect x="0" y="116" width="600" height="14" fill="#4a2e18"/><rect x="556" y="130" width="44" height="430" fill="#5e3c20"/><path d="M0 130H556V190H0Z" fill="#000" opacity=".25"/>` +
    // safe body
    `<rect x="172" y="184" width="316" height="366" rx="6" fill="#3a3e44"/><rect x="170" y="180" width="316" height="366" rx="6" fill="url(#${k}b)"/>` +
    `<rect x="190" y="204" width="208" height="320" fill="#121418"/><path d="M190 330H398" stroke="#4a4e54" stroke-width="6"/><path d="M190 204H398V226H190Z" fill="#000" opacity=".5"/>` +
    `<rect x="205" y="290" width="70" height="36" fill="#6a5a3c"/><rect x="286" y="300" width="90" height="26" fill="#2c4a6a"/>` +
    // keypad
    `<rect x="405" y="232" width="68" height="122" rx="5" fill="#22262c"/><rect x="411" y="240" width="56" height="20" fill="#0c1a10"/><text x="439" y="256" ${MID} ${MONO} ${BOLD} font-size="16" fill="#5fe08a">* * * _</text><g fill="#cfd4da">${keys}</g><circle cx="462" cy="424" r="5" fill="#d3261e"/>` +
    // open door
    `<path d="M170 180L22 140V610L170 546Z" fill="url(#${k}c)"/><path d="M22 140L10 146V618L22 610Z" fill="#4a4e54"/><path d="M158 196L36 164V584L158 532Z" fill="none" stroke="#5a5f66" stroke-width="2.500"/>` +
    `<g fill="#3a3e44"><rect x="28" y="230" width="14" height="30"/><rect x="28" y="360" width="14" height="30"/><rect x="28" y="490" width="14" height="30"/></g>` +
    `<g transform="translate(98 372) rotate(-4)"><rect x="-64" y="-52" width="128" height="100" rx="3" fill="#fffdf4" stroke="#8a8a80" stroke-width="1.500"/><rect x="-64" y="-52" width="128" height="10" fill="${POLO}"/>` +
    `<text x="0" y="-16" ${MID} ${SANS} ${BOLD} font-size="17" fill="#1a1a18" ${fit(112)}>CONSERVANCY —</text><text x="0" y="8" ${MID} ${SANS} ${BOLD} font-size="17" fill="#1a1a18" ${fit(80)}>EVENTS —</text><text x="0" y="34" ${MID} ${SANS} ${BOLD} font-size="19" fill="#1a1a18" ${fit(112)}>C. BRENNICK</text></g>` +
    `<rect width="600" height="800" fill="url(#${k}d)"/>` +
    // envelope going in
    envl(282, 426, 0.84, -9) + `<path d="M190 340H214V524H190Z" fill="#000" opacity=".45"/>` +
    // Curtis crouched, profile
    `<path d="M392 640Q450 560 560 580L640 620V760H410Q376 700 392 640Z" fill="#b9a476"/><path d="M370 742h100v34H346q0-24 24-34z" fill="#3a2c20"/>` +
    `<path d="M476 372Q520 306 590 334Q650 362 650 470L640 660H480Q452 520 476 372Z" fill="${POLO}"/><path d="M560 326Q650 350 650 470L640 660H580Q600 480 560 326Z" fill="#000" opacity=".2"/>` +
    `<path d="M508 300h32v44h-32z" fill="#b0644e"/><ellipse cx="522" cy="262" rx="37" ry="43" fill="#e59c7e"/><path d="M487 256l-13 17 14 5z" fill="#e59c7e"/><ellipse cx="542" cy="268" rx="6" ry="10" fill="#b0644e"/>` +
    `<path d="M496 232Q520 208 550 226Q566 250 558 290Q548 262 536 250Q514 246 496 232Z" fill="#8a6a40"/><g transform="rotate(-10 520 216)" fill="#14161c"><rect x="494" y="208" width="19" height="11" rx="4"/><rect x="518" y="208" width="19" height="11" rx="4"/></g>` +
    `<ellipse cx="500" cy="258" rx="3" ry="3.500" fill="#1a1210"/><path d="M493 248l12-3M490 288h13" stroke="#5a2a1c" stroke-width="2.500" stroke-linecap="round"/>` +
    `<g stroke-linecap="round"><path d="M508 360L474 330" stroke="${POLO}" stroke-width="40"/><path d="M474 326L452 304" stroke="#e59c7e" stroke-width="22"/><path d="M450 302L440 292" stroke="#e59c7e" stroke-width="9"/>` +
    `<path d="M512 392L440 462" stroke="${POLO_D}" stroke-width="44"/><path d="M436 462L384 440" stroke="#e59c7e" stroke-width="26"/><circle cx="376" cy="436" r="15" fill="#e59c7e"/><path d="M368 426l-9 1M366 436l-10 2M368 446l-8 3" stroke="#e59c7e" stroke-width="8"/></g>` +
    // Dez's shadow + hat brim
    `<g filter="url(#${k}e)" fill="#0c0806" opacity=".62"><ellipse cx="226" cy="708" rx="150" ry="30"/><path d="M150 706Q226 610 302 706Z"/><path d="M96 820Q120 734 226 734Q332 734 356 820Z"/></g>`;
  return frame(k, 600, 800, defs, body, 0.18, 0.55);
})();

A.c6_ph_check = ((): string => {
  const k = 'c6_ph_check';
  const defs =
    lg(`${k}a`, [[0, '#1a1210'], [0.6, '#4a2a1c'], [1, '#8a4a26']]) + rg(`${k}b`, [[0, '#fffbe6', 1], [0.2, '#ffe6a0', 0.6], [1, '#ffb04a', 0]]) +
    lg(`${k}c`, [[0, '#5a3a24'], [1, '#22140c']]) + bl(`${k}d`, 3);
  const body =
    `<rect width="800" height="600" fill="url(#${k}a)"/>` + blobs(41, -40, 120, 880, 140, 12, 70, '#140c0a', 0.9) +
    `<circle cx="120" cy="60" r="200" fill="url(#${k}b)"/><circle cx="700" cy="40" r="220" fill="url(#${k}b)"/>` +
    `<g stroke="#fff6d0" stroke-opacity=".25" stroke-width="3"><path d="M120 60L10 300M120 60L300 320M700 40L520 320M700 40L800 300"/></g>` +
    `<rect y="430" width="800" height="170" fill="url(#${k}c)"/>` +
    crowd(42, 10, 800, 330, 84, 1.05, '#24160f', 0.6) + crowd(43, 40, 800, 372, 110, 1.2, '#1a100b', 0.45) +
    `<rect width="800" height="600" fill="#ffb45a" opacity=".06"/>` +
    // cheque
    `<g transform="rotate(-2 400 420)"><rect x="196" y="338" width="416" height="186" fill="#000" opacity=".35"/><rect x="190" y="330" width="416" height="186" fill="#fbf7e8" stroke="${NAVY}" stroke-width="5"/><rect x="200" y="340" width="396" height="166" fill="none" stroke="${POLO}" stroke-width="2"/>` +
    `<text x="398" y="408" ${MID} ${SERIF} ${BOLD} font-size="70" fill="#1a1a18" ${fit(230)}>$8,000</text><path d="M230 420H566" stroke="#1a1a18" stroke-width="2"/>` +
    `<text x="398" y="452" ${MID} ${SANS} ${BOLD} font-size="27" fill="${POLO_D}" ${fit(350)}>HALSEY HEAT CHAMPION</text>` +
    `<text x="398" y="488" ${MID} ${SANS} ${BOLD} font-size="23" fill="${NAVY}" ${fit(300)}>DUNMORE PROPERTIES</text><path d="M214 494v-12h6v-8h6v12h5v-18h7v18h5v-10h6v18z" fill="${NAVY}"/></g>` +
    fig(132, 262, 1.5, { ...DEZ, legs: '#4a3c2c', ra: [58, 78, 52, 116], la: [-60, 62, -62, 8],
      face: F_TACHE + GRIN,
      over: `<path d="M-76 -22h28l-4 34h-20z" fill="#fbfbf6" stroke="#b9c4cc" stroke-width="1.500"/><path d="M-75 -12h26l-.6 6h-24.800z" fill="#5fa8d6"/><ellipse cx="-62" cy="-22" rx="14" ry="3.500" fill="#cfe6f6" stroke="#b9c4cc" stroke-width="1"/><path d="M-72 6l-4 8M-62 8v8M-52 6l3 8" stroke="#7c4b30" stroke-width="7"/>` }) +
    fig(672, 268, 1.5, { ...CURTIS, legs: '#b9a476', la: [-58, 78, -50, 116], ra: [58, 70, 60, 128] }) +
    `<g filter="url(#${k}d)">` + crowd(44, 60, 800, 650, 250, 2.6, '#0c0706', 0) + `</g>`;
  return frame(k, 800, 600, defs, body, 0.2, 0.55);
})();

A.c6_ph_viccart = ((): string => {
  const k = 'c6_ph_viccart';
  const defs =
    lg(`${k}a`, [[0, '#1c1412'], [0.55, '#5a3020'], [1, '#a85c2a']]) + lg(`${k}b`, [[0, '#5e4028'], [1, '#1c120c']]) +
    rg(`${k}c`, [[0, '#ffe6a8', 0.95], [0.3, '#ffae4a', 0.45], [1, '#ff8a2a', 0]]) + bl(`${k}d`, 4);
  const pillar = (x: number): string =>
    `<rect x="${x}" y="236" width="74" height="450" fill="#7a5a40"/><rect x="${x + 44}" y="236" width="30" height="450" fill="#000" opacity=".25"/><path d="M${x} 300h74M${x} 380h74M${x} 460h74M${x} 540h74M${x} 620h74" stroke="#3a2618" stroke-width="2" opacity=".6"/>` +
    `<rect x="${x - 8}" y="220" width="90" height="20" fill="#9a7654"/><rect x="${x + 31}" y="190" width="12" height="30" fill="#1c1a18"/><circle cx="${x + 37}" cy="176" r="20" fill="#ffe6a8"/><circle cx="${x + 37}" cy="176" r="100" fill="url(#${k}c)"/>`;
  let bars = '';
  for (let i = 0; i < 9; i++) { const x = 150 + i * 37.5, t = (x - 300) / 180; bars += `M${n1(x)} ${n1(246 - 76 * (1 - t * t))}V${i === 4 ? 172 : 250}`; }
  const body =
    `<rect width="600" height="800" fill="url(#${k}a)"/>` + blobs(51, -30, 240, 660, 120, 16, 50, '#1c120e', 0.95) +
    `<g fill="#2a1a14"><rect x="130" y="330" width="120" height="290"/><rect x="270" y="380" width="110" height="240"/><rect x="390" y="300" width="100" height="320"/></g>` +
    `<g fill="#ffd27a" opacity=".8"><rect x="146" y="350" width="14" height="18"/><rect x="200" y="400" width="14" height="18"/><rect x="290" y="402" width="14" height="18"/><rect x="340" y="450" width="14" height="18"/><rect x="408" y="330" width="14" height="18"/><rect x="452" y="390" width="14" height="18"/><rect x="170" y="470" width="14" height="18"/></g>` +
    `<g filter="url(#${k}d)" opacity=".7"><circle cx="230" cy="560" r="10" fill="#ff8a4a"/><circle cx="330" cy="540" r="8" fill="#ffe08a"/><circle cx="420" cy="566" r="11" fill="#e85a4a"/><circle cx="270" cy="590" r="7" fill="#fff"/></g>` +
    `<rect y="612" width="600" height="188" fill="url(#${k}b)"/><path d="M130 612L60 800M470 612L540 800" stroke="#000" stroke-opacity=".3" stroke-width="3"/>` +
    // arch + sign
    `<g fill="none" stroke="#141210" stroke-linecap="round"><path d="M124 250Q300 94 476 250" stroke-width="9"/><path d="M124 228Q300 72 476 228" stroke-width="5"/><path d="${bars}" stroke-width="4"/>` +
    `<path d="M150 226q-14-14 0-24q12 0 8 12M450 226q14-14 0-24q-12 0-8 12" stroke-width="4"/></g>` +
    `<rect x="186" y="114" width="228" height="66" rx="6" fill="#143a2a" stroke="#e7c64a" stroke-width="4"/>` + tx(300, 162, 40, 'EAST GATE', '#f2d870', SERIF, `${MID} ${BOLD} ${fit(192)}`) +
    pillar(50) + pillar(476) +
    `<g stroke="#141210" stroke-width="5"><path d="M128 300V640M128 300L96 320V660L128 640M104 316V654M116 308V648M472 300V640M472 300L504 320V660L472 640M496 316V654M484 308V648"/></g>` +
    // cart
    `<ellipse cx="315" cy="634" rx="210" ry="16" fill="#000" opacity=".45"/>` +
    `<path d="M176 392V506M300 392V470M446 392L470 506" stroke="#d9d6cc" stroke-width="7"/><path d="M446 392L474 506" stroke="#9fd0e6" stroke-width="16" opacity=".25"/>` +
    `<rect x="258" y="440" width="22" height="80" rx="4" fill="#2a2a30"/><rect x="330" y="446" width="20" height="70" rx="4" fill="#2a2a30"/>` +
    fig(214, 446, 0.8, { ...VIC, la: [-46, 58, 14, 62], ra: [46, 58, -16, 72] }) +
    fig(388, 448, 0.76, { ...COP, ra: [36, 56, 62, 44] }) +
    `<circle cx="440" cy="486" r="20" fill="none" stroke="#1a1a1e" stroke-width="6"/>` +
    `<path d="M140 378H458L468 394H130Z" fill="#fbf8ee"/><path d="M130 394H468V400H130Z" fill="#b9b6ac"/><rect x="282" y="362" width="46" height="16" rx="5" fill="#3a7ae0"/><circle cx="305" cy="368" r="30" fill="#5a9aff" opacity=".16"/>` +
    `<path d="M132 506H474Q496 508 500 538V592H132Z" fill="#fbf8ee"/><path d="M132 506H474Q496 508 500 538V548H132Z" fill="#fff"/><path d="M132 576H500V592H132Z" fill="${NAVY}"/><path d="M132 506V592" stroke="#b9b6ac" stroke-width="4"/>` +
    tx(312, 562, 21, 'HALSEY PARK POLICE', NAVY, SANS, `${MID} ${BOLD} ${fit(250)}`) +
    `<circle cx="500" cy="556" r="9" fill="#fff6c8"/><circle cx="500" cy="556" r="56" fill="url(#${k}c)" opacity=".7"/>` +
    `<g fill="#141416"><circle cx="208" cy="606" r="31"/><circle cx="424" cy="606" r="31"/></g><g fill="#8a8e96"><circle cx="208" cy="606" r="13"/><circle cx="424" cy="606" r="13"/></g>` +
    // cop waving the crowd back
    fig(78, 492, 1.12, { ...COP, legs: '#161e3c', la: [-62, 34, -84, -22], ra: [62, 30, 96, -8], over: `<path d="M-90 -34v-12M-84 -36v-14M-78 -34v-12M90 -20v-12M96 -22v-14M102 -20v-12" stroke="#c99672" stroke-width="5"/>` }) +
    `<g filter="url(#${k}d)">` + crowd(52, 150, 620, 836, 200, 2.5, '#0c0706', 0.7, '#eaf4ff') + `</g>`;
  return frame(k, 600, 800, defs, body, 0.2, 0.55);
})();

A.c6_ph_cafe = ((): string => {
  const k = 'c6_ph_cafe';
  const defs =
    lg(`${k}a`, [[0, '#3a1c12'], [1, '#7a3e22']]) + lg(`${k}b`, [[0, '#101c3c'], [1, '#1c3050']]) +
    rg(`${k}c`, [[0, '#fff0b8', 1], [0.2, '#ffc45a', 0.5], [1, '#ff9a3a', 0]]) + lg(`${k}d`, [[0, '#a8683a'], [1, '#5a3018']]) + bl(`${k}e`, 2);
  let bulbs = '', boards = '';
  for (let i = 0; i < 9; i++) { const x = 40 + i * 90, y = 34 + Math.sin(i * 1.3) * 8 + 10; bulbs += `<circle cx="${x}" cy="${n1(y)}" r="46" fill="url(#${k}c)"/><circle cx="${x}" cy="${n1(y)}" r="6" fill="#fff6d0"/>`; }
  for (let i = 0; i < 5; i++) { const x = 120 + i * 140; boards += pboard(x, 416, 78, 92, 34, 4) + mp(x - 20, 434, 1.2, true) + mp(x + 14, 428, 1.1, false) + mp(x + 26, 444, 1.3, true) + mp(x - 6, 446, 1.3, false); }
  const sil = (x: number, y: number, s: number): string => fig(x, y, s, { skin: '#3a2014', shade: '#22120a', shirt: '#2a1810', eyes: '', face: '' });
  const body =
    `<rect width="800" height="600" fill="url(#${k}a)"/><path d="M0 300H800" stroke="#2a140c" stroke-width="6"/><rect y="303" width="800" height="110" fill="#4a2616"/>` +
    // window: river + bridge
    `<rect x="508" y="62" width="268" height="236" fill="#1c0e08"/><rect x="518" y="72" width="248" height="216" fill="url(#${k}b)"/>` +
    `<path d="M518 200H766V288H518Z" fill="#0c1630"/><path d="M518 196Q580 150 642 196Q704 150 766 196V206H518Z" fill="#0a0e1c"/><path d="M580 172V200M642 196V210M704 172V200" stroke="#0a0e1c" stroke-width="5"/>` +
    `<g fill="#ffd27a"><circle cx="540" cy="182" r="2.500"/><circle cx="580" cy="168" r="2.500"/><circle cx="612" cy="180" r="2.500"/><circle cx="672" cy="180" r="2.500"/><circle cx="704" cy="168" r="2.500"/><circle cx="744" cy="182" r="2.500"/><rect x="530" y="150" width="4" height="5"/><rect x="560" y="138" width="4" height="5"/><rect x="620" y="144" width="4" height="5"/><rect x="690" y="134" width="4" height="5"/><rect x="730" y="148" width="4" height="5"/><rect x="750" y="140" width="4" height="5"/></g>` +
    `<g stroke="#ffd27a" stroke-width="2.500" opacity=".5"><path d="M540 214v30M580 212v44M612 214v26M672 214v36M704 212v48M744 214v28"/></g>` +
    `<path d="M642 72V288M518 180H766" stroke="#1c0e08" stroke-width="7"/>` +
    // chalkboard
    `<rect x="32" y="52" width="336" height="222" fill="#6a421f"/><rect x="42" y="62" width="316" height="202" fill="#18241e"/>` +
    `<g ${HAND} ${BOLD} ${MID} fill="#f4f1e6"><text x="200" y="106" font-size="35" ${fit(260)}>ROOK &amp; PAWN</text><text x="200" y="152" font-size="27" fill="#ffe28a" ${fit(272)}>VIC SALLOW SIMUL</text><text x="200" y="196" font-size="29" ${fit(190)}>100 GAMES</text><text x="200" y="240" font-size="25" fill="#ffe28a" ${fit(276)}>TONIGHT TILL 2AM</text></g>` +
    `<path d="M70 118H330" stroke="#f4f1e6" stroke-width="2" stroke-dasharray="30 4 50 6" opacity=".6"/>` +
    bulbs + `<path d="M0 30Q200 60 400 36T800 40" fill="none" stroke="#1c0e08" stroke-width="2"/>` +
    sil(60, 352, 1.05) + sil(750, 356, 1.05) +
    fig(430, 232, 1.32, { ...VIC, la: [-52, 70, -76, 132], ra: [50, 72, 34, 122], eyes: undefined, face: `<path d="M-8 -34q9 5 16-2" stroke="#5a2a24" stroke-width="2.400" fill="none"/>` }) +
    `<path d="M50 410H750L800 474H0Z" fill="url(#${k}d)"/><path d="M0 474H800V492H0Z" fill="#3a1e10"/><path d="M50 410H750" stroke="#ffd9a0" stroke-width="2" opacity=".6"/>` +
    boards +
    `<rect y="492" width="800" height="108" fill="#22120a"/>` +
    `<g filter="url(#${k}e)">` + crowd(71, 60, 800, 548, 150, 2.1, '#2c170c', 0) + `</g>` +
    `<g fill="none" stroke="#ffb45a" stroke-width="3" opacity=".5"><path d="M24 492a36 36 0 0 1 60 -10M176 500a36 36 0 0 1 62 -8M470 496a36 36 0 0 1 62 -6M620 498a36 36 0 0 1 60 -8"/></g>` +
    `<rect width="800" height="600" fill="#ff9a3a" opacity=".08"/>`;
  return frame(k, 800, 600, defs, body, 0.2, 0.55);
})();

A.c6_ph_bench = ((): string => {
  const k = 'c6_ph_bench';
  const defs =
    lg(`${k}a`, [[0, '#7a3e1e'], [0.6, '#d9843a'], [1, '#f2a856']]) + lg(`${k}b`, [[0, '#8a5630'], [1, '#4a2a16']]) +
    rg(`${k}c`, [[0, '#ffe6a8', 0.9], [0.3, '#ffb45a', 0.4], [1, '#ff9a3a', 0]]) + bl(`${k}d`, 6);
  const DZ = '#7c4b30';
  const body =
    `<rect width="600" height="260" fill="url(#${k}a)"/><circle cx="130" cy="150" r="170" fill="url(#${k}c)"/><circle cx="130" cy="150" r="9" fill="#fff6d0"/>` +
    blobs(81, -30, 196, 660, 40, 16, 34, '#3a2012', 0.9) +
    blobs(82, -40, -50, 700, 110, 34, 40, '#0c0806') + blobs(83, 240, 40, 400, 90, 18, 22, '#0c0806') + blobs(84, -20, 60, 150, 60, 8, 16, '#0c0806') +
    `<rect y="236" width="600" height="564" fill="#3a2216"/>` +
    // table 4 at the frame edge
    `<path d="M452 250L640 226V330L474 348Z" fill="#c9a66e"/><path d="M474 348L640 330V420L482 430Z" fill="#8f7248"/>` +
    `<path d="M500 262l40-5 2 22-40 5zM582 251l40-5 2 22-40 5zM542 279l40-5 2 22-40 5z" fill="#7a5c3a"/>` +
    `<text x="540" y="412" ${SANS} ${BOLD} font-size="58" fill="#f6f1e2" ${MID} transform="rotate(-5 540 392)">4</text>` +
    // bench
    `<path d="M150 268H450L660 800H-60Z" fill="url(#${k}b)"/><g stroke="#2a160c" stroke-width="5" opacity=".7"><path d="M225 268L120 800M300 268V800M375 268L480 800"/></g><path d="M150 268H450" stroke="#e8a85a" stroke-width="3"/>` +
    // water bottle (half empty)
    `<g transform="translate(92 560) rotate(-14)"><ellipse cx="6" cy="72" rx="34" ry="8" fill="#000" opacity=".35"/><rect x="-23" y="-70" width="46" height="140" rx="12" fill="#cfe6f2" opacity=".55" stroke="#eaf6ff" stroke-width="2"/><path d="M-23 6H23V58Q23 70 11 70H-11Q-23 70 -23 58Z" fill="#6fb4dc" opacity=".8"/><path d="M-23 6H23" stroke="#eaf6ff" stroke-width="2"/><rect x="-11" y="-92" width="22" height="24" rx="3" fill="#2f6fb0"/><rect x="-22" y="-26" width="44" height="22" fill="#fff" opacity=".7"/><path d="M-14 -58v40" stroke="#fff" stroke-width="4" opacity=".7" stroke-linecap="round"/></g>` +
    // selfie arm (toward the lens)
    `<path d="M392 500L479 619" stroke="#efe4c6" stroke-width="84" stroke-linecap="round"/><path d="M490 634L660 866" stroke="${DZ}" stroke-width="72" stroke-linecap="round"/><path d="M452 640L520 592" stroke="#cdbf98" stroke-width="5"/>` +
    fig(300, 452, 2.3, { ...DEZ, hat: '', la: [-64, 64, -34, 96],
      hair: `<path d="M-23 -60q-1 14 3 22l-4 2zM23 -60q1 14-3 22l4 2z" fill="#f3f0e8"/><path d="M-22 -58C-24 -92 24 -92 22 -58C16 -78 8 -82 0 -82C-8 -82 -16 -78 -22 -58Z" fill="#f3f0e8"/>`,
      eyes: `<path d="M-14 -53q5 3.500 10 0M4 -53q5 3.500 10 0" stroke="#1a1210" stroke-width="2.200" fill="none"/><path d="M-14 -55q5-2 10 0M4 -55q5-2 10 0" stroke="#4a2a1b" stroke-width="1.200" fill="none"/><path d="M-15 -62q5-2 10-1M5 -63q5-1 10 1" stroke="#f3f0e8" stroke-width="2.200" fill="none"/>`,
      face: F_TACHE + `<path d="M-9 -32Q0 -26 9 -32" stroke="#2a130c" stroke-width="2" fill="none"/><path d="M-16 -48q-3 2-4 5M16 -48q3 2 4 5" stroke="#4a2a1b" stroke-width="1" fill="none"/>` }) +
    `<path d="M217 740H383V800H217Z" fill="#efe4c6"/>` +
    // hat on his chest
    `<g transform="translate(300 668)"><ellipse cx="4" cy="8" rx="128" ry="80" fill="#000" opacity=".25"/><ellipse rx="124" ry="76" fill="${STRAW}"/><ellipse rx="124" ry="76" fill="none" stroke="${STRAW_D}" stroke-width="4"/><ellipse cx="0" cy="-8" rx="76" ry="46" fill="#17120e"/><ellipse cx="0" cy="-16" rx="68" ry="40" fill="${STRAW}"/><ellipse cx="0" cy="-18" rx="44" ry="22" fill="${STRAW_D}" opacity=".5"/>` +
    `<path d="M-110 20Q0 70 110 20" fill="none" stroke="#fff3c8" stroke-width="2" opacity=".5"/></g>` +
    `<circle cx="196" cy="680" r="26" fill="${DZ}"/><path d="M204 664l22-4M208 676l24 0M206 688l22 5" stroke="${DZ}" stroke-width="12" stroke-linecap="round"/>` +
    `<rect width="600" height="800" fill="#ff9a3a" opacity=".1"/><g filter="url(#${k}d)" fill="#0c0806" opacity=".35"><ellipse cx="470" cy="620" rx="90" ry="30"/><ellipse cx="180" cy="420" rx="60" ry="22"/></g>`;
  return frame(k, 600, 800, defs, body, 0.2, 0.55);
})();

A.c6_ph_thermostat = ((): string => {
  const k = 'c6_ph_thermostat';
  const defs =
    lg(`${k}a`, [[0, '#c9a47a'], [1, '#8a6444']], 0.6, 1) + lg(`${k}b`, [[0, '#f2e8cc'], [1, '#cdbf9c']]) +
    lg(`${k}c`, [[0, '#b8c8a0'], [1, '#9cae88']]) + rg(`${k}d`, [[0, '#ffb45a', 0.4], [1, '#ffb45a', 0]], 0.2, 0.2, 0.9) + bl(`${k}e`, 8);
  let grille = '';
  for (let r = 22; r <= 110; r += 22) grille += `<circle r="${r}"/>`;
  const blade = (a: number): string => `<path transform="rotate(${a})" d="M6 -10Q50 -60 96 -30Q70 0 10 8Z"/>`;
  const body =
    `<rect width="600" height="800" fill="url(#${k}a)"/><rect width="600" height="800" fill="url(#${k}d)"/>` +
    `<g fill="#3a2010" opacity=".16"><path d="M-40 60L640 -80V-50L-40 90ZM-40 130L640 -10V20L-40 160ZM-40 200L640 60V90L-40 230ZM-40 270L640 130V160L-40 300ZM-40 340L640 200V230L-40 370Z"/></g>` +
    `<rect y="640" width="600" height="160" fill="#6a4a30"/><rect y="610" width="600" height="34" fill="#e2d4b4"/><path d="M0 644H600" stroke="#3a2416" stroke-width="3"/><path d="M0 700H600M200 644L170 800M420 644L450 800" stroke="#000" stroke-opacity=".2" stroke-width="2"/>` +
    // thermostat
    `<rect x="136" y="100" width="340" height="290" rx="20" fill="#5a3a22" opacity=".4" filter="url(#${k}e)"/><rect x="130" y="90" width="340" height="290" rx="20" fill="url(#${k}b)" stroke="#a8996f" stroke-width="2"/>` +
    `<rect x="160" y="120" width="280" height="158" rx="6" fill="#4a4636"/><rect x="166" y="126" width="268" height="146" rx="4" fill="url(#${k}c)"/>` +
    tx(300, 190, 42, 'INSIDE 96°F', '#1c2414', MONO, `${MID} ${BOLD} ${fit(244)}`) +
    `<rect x="176" y="212" width="248" height="46" rx="4" fill="#c22a20"/>` + tx(318, 245, 30, 'AC FAULT E4', '#fff3e0', MONO, `${BOLD} ${MID} ${fit(196)}`) +
    `<path d="M184 250l13-24 13 24z" fill="#fff3e0"/><path d="M197 234v8M197 245.500v1" stroke="#c22a20" stroke-width="3" stroke-linecap="round"/>` +
    `<g fill="#b9ab88" stroke="#8a7c5c" stroke-width="1.500"><rect x="170" y="304" width="62" height="40" rx="8"/><rect x="250" y="304" width="62" height="40" rx="8"/><circle cx="392" cy="324" r="26"/></g>` +
    `<path d="M192 330l9-12 9 12zM272 318l9 12 9-12z" fill="#5a4e36"/><circle cx="446" cy="106" r="5" fill="#ff3a2a"/><circle cx="446" cy="106" r="14" fill="#ff3a2a" opacity=".3"/>` +
    tx(392, 329, 13, 'MODE', '#5a4e36', SANS, `${MID} ${BOLD}`) +
    // box fan, one blade broken
    `<ellipse cx="300" cy="752" rx="170" ry="16" fill="#000" opacity=".35"/><rect x="160" y="470" width="280" height="280" rx="16" fill="#d9d4c4" stroke="#8a8676" stroke-width="3"/><rect x="178" y="488" width="244" height="244" rx="8" fill="#22201c"/>` +
    `<g transform="translate(300 610)"><g fill="#5f8fb4">${blade(-20)}${blade(52)}${blade(124)}${blade(196)}<path transform="rotate(268)" d="M6 -10Q24 -32 40 -34L34 -22L46 -14L30 -8L36 4L10 8Z"/></g><circle r="24" fill="#cfcabc" stroke="#8a8676" stroke-width="2"/>` +
    `<g fill="none" stroke="#e8e4d6" stroke-width="2.500" opacity=".85">${grille}<path d="M-118 0H118M0 -118V118M-84 -84L84 84M-84 84L84 -84"/></g></g>` +
    `<path d="M458 770l52-30q20 4 26 26l-40 16z" fill="#5f8fb4" stroke="#3a5a78" stroke-width="2"/><path d="M440 700q60 30 40 60t60 40" fill="none" stroke="#2a2a26" stroke-width="5"/>` +
    `<rect x="160" y="756" width="34" height="14" fill="#8a8676"/><rect x="406" y="756" width="34" height="14" fill="#8a8676"/>`;
  return frame(k, 600, 800, defs, body, 0.2, 0.55);
})();

A.c6_ph_otb = ((): string => {
  const k = 'c6_ph_otb';
  const defs =
    lg(`${k}a`, [[0, '#1c1a22'], [1, '#2e2420']]) + lg(`${k}b`, [[0, '#2a5a34'], [1, '#6a8a3c']]) +
    rg(`${k}c`, [[0, '#ffe6a8', 0.5], [1, '#ffe6a8', 0]]) + lg(`${k}d`, [[0, '#fff', 0.16], [0.5, '#fff', 0.02], [1, '#fff', 0.12]], 1, 1) + bl(`${k}e`, 3);
  let screens = '', wins = '';
  for (let i = 0; i < 6; i++) {
    const x = 70 + i * 116;
    screens += `<rect x="${x - 4}" y="52" width="104" height="72" fill="#0c0c10"/><rect x="${x}" y="56" width="96" height="64" fill="url(#${k}b)"/><path d="M${x} 96h96v8h-96z" fill="#c9a66e"/>` +
      `<g fill="#3a2414"><ellipse cx="${x + 24 + i * 4}" cy="92" rx="9" ry="5"/><ellipse cx="${x + 52 - i * 2}" cy="90" rx="9" ry="5"/><ellipse cx="${x + 74}" cy="93" rx="9" ry="5"/></g><rect x="${x}" y="56" width="96" height="11" fill="#101830"/><path d="M${x + 4} 62h${30 + i * 6}" stroke="#ffe28a" stroke-width="3"/>`;
  }
  for (let i = 0; i < 3; i++) {
    const x = 280 + i * 160;
    wins += `<rect x="${x}" y="236" width="140" height="170" fill="#3a3a44"/><rect x="${x + 8}" y="244" width="124" height="154" fill="#9fb8c8" opacity=".35"/><circle cx="${x + 70}" cy="318" r="20" fill="#1c1a22"/><path d="M${x + 36} 398Q${x + 36} 344 ${x + 70} 344Q${x + 104} 344 ${x + 104} 398Z" fill="#1c1a22"/><rect x="${x + 44}" y="386" width="52" height="12" fill="#0c0c10"/>`;
  }
  const body =
    `<rect width="800" height="600" fill="url(#${k}a)"/>` + screens +
    `<rect x="262" y="160" width="496" height="60" rx="6" fill="#5a1414" stroke="#e7c64a" stroke-width="4"/><ellipse cx="510" cy="190" rx="300" ry="70" fill="url(#${k}c)"/>` +
    tx(510, 202, 31, 'WINNERS CIRCLE — WAGERS', '#ffe28a', SERIF, `${MID} ${BOLD} ${fit(450)}`) +
    wins + `<rect x="262" y="406" width="520" height="30" fill="#6a4a2a"/><rect x="262" y="436" width="520" height="164" fill="#3a2a1c"/><path d="M262 406H782" stroke="#c9a66e" stroke-width="3"/>` +
    `<rect y="470" width="262" height="130" fill="#241c18"/>` +
    fig(96, 356, 1.2, { skin: '#2a1c16', shade: '#1a100c', shirt: '#3a3440', eyes: '', face: '', legs: '#1c1a20' }) + `<rect x="60" y="500" width="76" height="14" fill="#4a3a2a"/><path d="M98 514V600" stroke="#4a3a2a" stroke-width="10"/>` +
    // Curtis, back to us, pushing cash under the glass
    fig(486, 356, 1.2, { skin: '#e59c7e', shade: '#b0644e', shirt: POLO, legs: '#b9a476', eyes: '', face: '',
      hair: `<path d="M-24 -50C-28 -96 28 -96 24 -50C22 -28 12 -22 0 -22C-12 -22 -22 -28 -24 -50Z" fill="#8a6a40"/><path d="M-12 -24Q0 -18 12 -24V-18H-12Z" fill="#e59c7e"/><g fill="#14161c"><rect x="-17" y="-93" width="15" height="8" rx="4"/><rect x="2" y="-93" width="15" height="8" rx="4"/></g>`,
      pre: `<path d="M-18 -6Q0 4 18 -6L16 2Q0 12 -16 2Z" fill="#2aa862"/><path d="M-12 -2Q0 8 12 -2" stroke="${NAVY}" stroke-width="3" fill="none"/><text x="0" y="40" ${MID} ${SANS} ${BOLD} font-size="9" fill="#eaf6e6" ${fit(58)}>HALSEY PARK</text><text x="0" y="52" ${MID} ${SANS} ${BOLD} font-size="9" fill="#eaf6e6" ${fit(58)}>CONSERVANCY</text>`,
      ra: [60, 44, 74, 50] }) +
    `<g transform="translate(582 410) rotate(-8)"><rect x="-4" y="-12" width="52" height="24" rx="3" fill="#56705a"/><rect x="-8" y="-15" width="52" height="24" rx="3" fill="#a9c4a2" stroke="#56705a" stroke-width="1.500"/><path d="M-2 -9h40M-2 -3h40M-2 3h40" stroke="#6f8f72" stroke-width="1.500"/></g><circle cx="575" cy="416" r="13" fill="#e59c7e"/>` +
    `<rect width="800" height="600" fill="#ffb45a" opacity=".05"/>` +
    // shop window: reflections, reversed lettering, frame
    `<rect width="800" height="600" fill="url(#${k}d)"/><g filter="url(#${k}e)" fill="#fff" opacity=".07"><path d="M120 0H260L60 600H-80ZM330 0H380L180 600H130Z"/></g>` +
    `<g transform="translate(244 566) scale(-1 1)">` + tx(0, 0, 50, 'FULTON AVE', '#e7c64a', SERIF, `${MID} ${BOLD} ${fit(300)} opacity=".85" stroke="#3a2a10" stroke-width="1.200"`) + `</g>` +
    `<path d="M0 0H800V600H0ZM26 26V574H774V26Z" fill="#17120e" fill-rule="evenodd"/><path d="M26 26H774V574H26Z" fill="none" stroke="#5a4a36" stroke-width="3"/>`;
  return frame(k, 800, 600, defs, body, 0.22, 0.5);
})();

A.c6_ph_jar = ((): string => {
  const k = 'c6_ph_jar', R = rng(97);
  const defs =
    lg(`${k}a`, [[0, '#e8d6ac'], [1, '#c9ae7c']]) + lg(`${k}b`, [[0, '#b98a54'], [1, '#7a5430']]) +
    lg(`${k}c`, [[0, '#fff', 0.5], [0.2, '#fff', 0.08], [0.8, '#fff', 0.04], [1, '#fff', 0.3]], 1, 0) +
    rg(`${k}d`, [[0, '#ffd08a', 0.5], [1, '#ffd08a', 0]], 0.75, 0.2, 0.8) + bl(`${k}e`, 10) + `<clipPath id="${k}f"><rect x="172" y="200" width="256" height="436" rx="34"/></clipPath>`;
  let bills = '';
  for (let i = 0; i < 30; i++) {
    const x = 180 + R() * 240, y = 260 + R() * 370, g = R() < 0.5;
    bills += `<g transform="translate(${n1(x)} ${n1(y)}) rotate(${Math.round(R() * 180)})"><rect x="-44" y="-19" width="88" height="38" fill="${g ? '#9cba96' : '#b7c9a0'}" stroke="#4f6a52" stroke-width="1.500"/><ellipse rx="10" ry="12" fill="#6f8f72"/><path d="M-44 0H-16M16 0H44" stroke="#4f6a52" stroke-width="1" opacity=".6"/></g>`;
  }
  const body =
    `<rect width="600" height="800" fill="url(#${k}a)"/><g stroke="#a8926a" stroke-width="2.500" opacity=".6"><path d="M0 110H600M0 230H600M0 350H600M0 470H600M80 0V590M200 0V590M320 0V590M440 0V590M560 0V590"/></g>` +
    `<rect width="600" height="800" fill="url(#${k}d)"/>` +
    `<rect y="590" width="600" height="210" fill="url(#${k}b)"/><path d="M0 590H600" stroke="#f2d9a8" stroke-width="4"/><path d="M0 596H600V612H0Z" fill="#000" opacity=".15"/>` +
    // deposit slip tucked under the jar
    `<g transform="translate(408 684) rotate(-9)"><rect x="-132" y="-46" width="264" height="92" fill="#000" opacity=".2" transform="translate(4 5)"/><rect x="-132" y="-46" width="264" height="92" fill="#f4f6ee" stroke="#9aa890" stroke-width="1.500"/><rect x="-132" y="-46" width="264" height="18" fill="#2f6a5a"/>` +
    tx(-124, -32, 12, 'HALSEY CREDIT UNION', '#f4f6ee', SANS, BOLD) + tx(20, 0, 15, 'DEPOSIT', '#2f6a5a', SANS, BOLD) +
    `<path d="M20 12H120M20 28H120M-40 -22V40" stroke="#9aa890" stroke-width="1.500"/><path d="M30 8q10-8 20 0t20-2" fill="none" stroke="#1c2c50" stroke-width="2"/></g>` +
    // jar
    `<ellipse cx="300" cy="650" rx="170" ry="22" fill="#3a2010" opacity=".45" filter="url(#${k}e)"/>` +
    `<rect x="172" y="200" width="256" height="436" rx="34" fill="#d9e6dc" opacity=".35"/><g clip-path="url(#${k}f)">${bills}</g>` +
    `<rect x="172" y="200" width="256" height="436" rx="34" fill="url(#${k}c)"/><rect x="172" y="200" width="256" height="436" rx="34" fill="none" stroke="#eef6f0" stroke-width="5" opacity=".85"/>` +
    `<path d="M196 250V590" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".5"/><path d="M402 300V540" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".3"/>` +
    `<path d="M206 204Q206 178 232 172H368Q394 178 394 204Z" fill="#d9e6dc" opacity=".5" stroke="#eef6f0" stroke-width="4"/>` +
    `<rect x="208" y="126" width="184" height="52" rx="8" fill="#3f7a4a"/><rect x="208" y="126" width="184" height="16" rx="8" fill="#5a9a62"/><g stroke="#2a5a34" stroke-width="3"><path d="M228 146v30M252 146v30M276 146v30M300 146v30M324 146v30M348 146v30M372 146v30"/></g>` +
    `<rect x="286" y="118" width="28" height="10" fill="#17120e"/>` +
    // masking-tape label
    `<g transform="translate(300 420) rotate(-3)"><path d="M-128 -34l6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-4 6H126l4-6-6-6 6-6-6-6 6-6-6-6 6-6-6-6 6-6-6-6 6-6-6-6Z" fill="#efdfae"/><path d="M-120 -30H120" stroke="#fff" stroke-width="3" opacity=".4"/>` +
    `<text x="0" y="12" ${MID} ${HAND} ${BOLD} font-size="27" fill="#1c1a22" ${fit(224)} rotate="-2 2 0 -3 2 0 1 -2 3 0 -2 2 -1 3 0 -2 1">MALIK — NATIONALS</text></g>`;
  return frame(k, 600, 800, defs, body, 0.18, 0.5);
})();

A.c6_ph_malik = ((): string => {
  const k = 'c6_ph_malik';
  const defs =
    lg(`${k}a`, [[0, '#9fd0e6'], [1, '#e6f0d0']]) + lg(`${k}b`, [[0, '#e6d2a4'], [1, '#b89868']]) +
    lg(`${k}c`, [[0, '#fff0a0'], [0.5, '#e7b93c'], [1, '#a87a1c']], 1, 0) + rg(`${k}d`, [[0, '#fff8d0', 0.7], [1, '#fff8d0', 0]], 0.2, 0.1, 0.8);
  const body =
    `<rect width="800" height="360" fill="url(#${k}a)"/>` +
    blobs(101, -40, 150, 880, 120, 18, 66, '#5f9a48') + blobs(102, -40, 190, 880, 110, 14, 46, '#7fb858', 0.95) + blobs(103, -20, 170, 860, 100, 10, 20, '#b6d870', 0.8) +
    `<path d="M610 0Q622 180 604 340H664Q650 180 672 0Z" fill="#a8946a"/><path d="M624 80q14 12 6 40q-12-10-6-40zM640 210q14 12 6 44q-12-12-6-44z" fill="#d6c598"/>` +
    blobs(104, 430, -60, 420, 120, 12, 62, '#3f7a34') + blobs(105, 460, -20, 380, 90, 8, 30, '#6aa84a', 0.9) +
    `<rect y="340" width="800" height="260" fill="url(#${k}b)"/><g stroke="#8a6a44" stroke-opacity=".3" stroke-width="2"><path d="M0 380H800M0 440H800M0 530H800M400 340L360 600M560 340L760 600M240 340L40 600"/></g>` +
    `<g fill="#5a4a2a" opacity=".22"><ellipse cx="130" cy="420" rx="150" ry="22"/><ellipse cx="640" cy="560" rx="200" ry="30"/><ellipse cx="330" cy="370" rx="90" ry="12"/></g>` +
    table4(90, 362, 0.42, '#e6d6b0', '#b8a47c', '#8a7a5c', false, 4) +
    // Dez, pretending to be furious
    fig(592, 208, 1.5, { ...DEZ, legs: '#5a4a38', la: [-50, 76, 16, 80], ra: [50, 76, -18, 92],
      eyes: `<ellipse cx="-9" cy="-54" rx="2.600" ry="3" fill="#1a1210"/><ellipse cx="9" cy="-54" rx="2.600" ry="3" fill="#1a1210"/><path d="M-16 -64l12 5M16 -64l-12 5" stroke="#f3f0e8" stroke-width="3" fill="none"/>`,
      face: F_TACHE + `<path d="M-8 -30Q2 -27 10 -33" stroke="#2a130c" stroke-width="2.200" fill="none"/>` }) +
    fig(318, 262, 1.36, { ...MALIK, ra: [58, 60, 96, 30], la: [-54, 70, -30, 120] }) +
    table4(400, 440, 1.5, '#ecdcb4', '#bca880', '#8a7a5c') +
    // the much-too-big trophy
    `<g transform="translate(486 470)"><rect x="-46" y="-20" width="92" height="24" rx="3" fill="#3a2414"/><rect x="-34" y="-46" width="68" height="28" fill="#5a3a22"/><rect x="-24" y="-40" width="48" height="16" fill="#e7c64a"/>` +
    `<path d="M-12 -46Q-6 -80 -10 -110H10Q6 -80 12 -46Z" fill="url(#${k}c)"/><path d="M-58 -250H58Q60 -150 14 -112H-14Q-60 -150 -58 -250Z" fill="url(#${k}c)"/><ellipse cx="0" cy="-250" rx="58" ry="10" fill="#fff6c0"/><ellipse cx="0" cy="-250" rx="48" ry="6" fill="#8a6a1c"/>` +
    `<path d="M-58 -232Q-104 -230 -92 -186Q-80 -152 -40 -148M58 -232Q104 -230 92 -186Q80 -152 40 -148" fill="none" stroke="#e7b93c" stroke-width="10"/><path d="M-40 -236Q-40 -160 -14 -124" fill="none" stroke="#fff" stroke-width="7" opacity=".55" stroke-linecap="round"/>` +
    `<text x="0" y="-180" ${MID} ${SERIF} ${BOLD} font-size="44" fill="#8a6a1c">1</text></g>` +
    `<circle cx="448" cy="304" r="15" fill="#8d5a3b"/>` +
    clock(300, 484, 1) + mp(352, 478, 1.7, true) + mp(386, 492, 1.9, false) + mp(410, 470, 1.6, false) +
    `<rect width="800" height="600" fill="url(#${k}d)"/>`;
  return frame(k, 800, 600, defs, body, 0.14, 0.35);
})();

A.c6_ph_fountain = ((): string => {
  const k = 'c6_ph_fountain';
  const defs =
    lg(`${k}a`, [[0, '#f6dcae'], [1, '#fdf0d4']]) + lg(`${k}b`, [[0, '#a8c888'], [1, '#7a9a5c']]) +
    lg(`${k}c`, [[0, '#9fd0dc'], [1, '#5f9ab0']]) + rg(`${k}d`, [[0, '#fff6d8', 0.8], [1, '#fff6d8', 0]], 0.85, 0.15, 0.8) + bl(`${k}e`, 5);
  const boat = (x: number, y: number, s: number, c: string): string =>
    `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-20 0H20L13 10H-14Z" fill="#fbf4dc" stroke="#5a3a22" stroke-width="1.500"/><path d="M0 0V-38" stroke="#5a3a22" stroke-width="2"/><path d="M2 -36L22 -4H2Z" fill="${c}"/><path d="M-2 -30L-16 -4H-2Z" fill="#fff"/><path d="M-22 13q11 4 22 0t22 0" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/></g>`;
  const body =
    `<rect width="800" height="300" fill="url(#${k}a)"/>` +
    blobs(111, -40, 110, 420, 110, 18, 54, '#8fb078', 0.9) + blobs(112, 660, 90, 180, 130, 10, 54, '#8fb078', 0.9) + blobs(113, -30, 150, 360, 80, 12, 36, '#a8c488', 0.9) +
    `<rect y="262" width="800" height="338" fill="url(#${k}b)"/>` +
    `<path d="M530 268Q530 320 420 366L560 376Q610 320 660 268Z" fill="#ead9b0"/>` +
    `<g filter="url(#${k}e)" fill="#fdf0d4" opacity=".55"><ellipse cx="300" cy="270" rx="360" ry="18"/><ellipse cx="700" cy="286" rx="160" ry="12"/></g>` +
    pav(606, 190, 1.55, '#b0583e', '#2f8558', '#fde6a0') +
    // plaza ring + basin
    `<ellipse cx="330" cy="470" rx="420" ry="130" fill="#ead9b0"/><ellipse cx="330" cy="478" rx="292" ry="92" fill="#8a7a5c"/><ellipse cx="330" cy="462" rx="292" ry="92" fill="#d6c8a4"/><ellipse cx="330" cy="462" rx="262" ry="76" fill="url(#${k}c)"/>` +
    `<path d="M68 462Q68 370 330 370Q592 370 592 462Q592 386 330 386Q68 386 68 462Z" fill="#a89878"/>` +
    `<g fill="none" stroke="#eafafc" stroke-width="2.500" opacity=".7"><ellipse cx="330" cy="452" rx="70" ry="16"/><ellipse cx="330" cy="454" rx="120" ry="30"/><path d="M130 470q14-5 28 0M470 500q14-5 28 0M250 512q14-5 28 0"/></g>` +
    // pedestal + bronze heron
    `<path d="M296 452Q296 400 306 388H354Q364 400 364 452Q330 462 296 452Z" fill="#b8a888"/><ellipse cx="330" cy="388" rx="26" ry="7" fill="#d6c8a4"/><path d="M340 388H354Q364 400 364 452Q352 456 344 456Z" fill="#000" opacity=".18"/>` +
    `<g transform="translate(326 386)"><path d="M-6 0V-74M12 0V-70M-6 0h-9M12 0h9" stroke="#3f5a4a" stroke-width="4.500" stroke-linecap="round" fill="none"/>` +
    `<path d="M-52 -76Q-14 -136 34 -108Q50 -92 24 -74Q-12 -60 -52 -76Z" fill="#4f7a66"/><path d="M-52 -76Q-20 -96 20 -86Q-12 -62 -52 -76Z" fill="#35584a"/>` +
    `<path d="M26 -104Q52 -136 30 -164Q14 -186 34 -204" fill="none" stroke="#4f7a66" stroke-width="11" stroke-linecap="round"/><ellipse cx="38" cy="-208" rx="12" ry="8" fill="#4f7a66"/><path d="M46 -213L92 -204L46 -202Z" fill="#b89a5a"/><path d="M30 -212L8 -222" stroke="#35584a" stroke-width="3.500" stroke-linecap="round"/><circle cx="41" cy="-210" r="1.800" fill="#17120e"/>` +
    `<path d="M-30 -100Q-6 -122 24 -108" fill="none" stroke="#a8d0b8" stroke-width="3" opacity=".7" stroke-linecap="round"/></g>` +
    `<g fill="none" stroke="#fff" stroke-width="3" opacity=".75" stroke-linecap="round"><path d="M300 420Q270 360 240 440M360 420Q390 360 420 440"/></g>` +
    boat(180, 470, 1.25, '#d3402e') + boat(470, 446, 1, '#2f6fb0') + boat(400, 506, 1.5, '#f2b430') + boat(246, 430, 0.8, '#2f8558') +
    blobs(114, -80, -60, 300, 120, 12, 60, '#5f8a48') + blobs(115, -60, -20, 260, 90, 8, 30, '#8fb860', 0.9) +
    `<rect width="800" height="600" fill="url(#${k}d)"/>`;
  return frame(k, 800, 600, defs, body, 0.14, 0.35);
})();
