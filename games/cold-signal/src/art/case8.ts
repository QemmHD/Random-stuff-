// COLD SIGNAL — Case 08 "Ball Pit" illustrations.
// Every value in `case8Art` is a complete standalone SVG document string.
// Ids inside each SVG are prefixed with the art key. Original art, no external references.

/** Art registry for Case 08. Keys are the art ids referenced by src/cases/case8.ts. */
export const case8Art: Record<string, string> = {};
const A = case8Art;

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
const IMPACT = 'font-family="Impact, Haettenschweiler, Arial Narrow Bold, Arial Black, sans-serif"';
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
  `<filter id="${k}gr" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="8"/><feColorMatrix values=".6 .6 .6 0 -.4 .6 .6 .6 0 -.4 .6 .6 .6 0 -.4 0 0 0 0 1"/></filter>` +
  rg(`${k}vg`, [[0.5, '#000', 0], [1, '#000', vig]], 0.5, 0.5, 0.75) +
  `<clipPath id="${k}fr"><rect width="${w}" height="${h}"/></clipPath></defs><g clip-path="url(#${k}fr)">${body}<rect width="${w}" height="${h}" filter="url(#${k}gr)" opacity="${grain}" style="mix-blend-mode:overlay"/><rect width="${w}" height="${h}" fill="url(#${k}vg)"/></g></svg>`;

/** Rim-light filter: a hard coloured edge on the lit side + a soft dark halo so figures pop off the background. */
const rimF = (id: string, c: string, dx = 5, dy = 3, halo = '#000', ha = 0.55): string =>
  `<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%"><feOffset in="SourceAlpha" dx="${dx}" dy="${dy}" result="o"/><feComposite in="SourceAlpha" in2="o" operator="out" result="e"/>` +
  `<feFlood flood-color="${c}" flood-opacity=".9"/><feComposite in2="e" operator="in" result="r"/>` +
  `<feGaussianBlur in="SourceAlpha" stdDeviation="7" result="b"/><feFlood flood-color="${halo}" flood-opacity="${ha}"/><feComposite in2="b" operator="in" result="h"/>` +
  `<feMerge><feMergeNode in="h"/><feMergeNode in="SourceGraphic"/><feMergeNode in="r"/></feMerge></filter>`;
const pop = (id: string, body: string): string => `<g filter="url(#${id})">${body}</g>`;

// Recurring colours.
const GOLD = '#f2c230';
const GOLD_L = '#ffe68a';
const GI = '#17151f';
const POLO = '#1fa257';
const BALLC = ['#ff3b3b', '#ffd21f', '#2f7dff', '#ff3b3b', '#3bd66a', '#ffd21f', '#2f7dff', '#ff8a1f'];

/** Tileable pattern of plastic balls (hex-packed, 4x4). */
const ballPat = (id: string, scale: number, seed = 3, rot = 0, bg = '#0a1030'): string => {
  const r = rng(seed);
  const cols: string[] = [];
  for (let i = 0; i < 16; i++) cols.push(BALLC[Math.floor(r() * BALLC.length)]);
  let s = `<rect width="160" height="138.6" fill="${bg}"/>`;
  for (let j = -1; j <= 4; j++)
    for (let i = -1; i <= 4; i++) {
      const x = 20 + 40 * i + (j & 1 ? 20 : 0), y = n1(17.3 + 34.65 * j), c = cols[(((j + 4) % 4) * 4) + ((i + 4) % 4)];
      s += `<circle cx="${x}" cy="${y}" r="21" fill="${c}"/><circle cx="${x - 7}" cy="${y - 8}" r="5" fill="#fff" opacity=".7"/>`;
    }
  return `<pattern id="${id}" width="160" height="138.6" patternUnits="userSpaceOnUse" patternTransform="rotate(${rot}) scale(${scale})">${s}</pattern>`;
};
/** One loose ball. */
const ball = (x: number, y: number, r: number, c: string): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><circle cx="${n1(x + r * 0.15)}" cy="${n1(y + r * 0.2)}" r="${n1(r * 0.8)}" fill="#000" opacity=".13"/><circle cx="${n1(x - r * 0.35)}" cy="${n1(y - r * 0.38)}" r="${n1(r * 0.24)}" fill="#fff" opacity=".75"/>`;
const balls = (seed: number, x: number, y: number, w: number, h: number, n: number, r0: number, r1 = r0): string => {
  const r = rng(seed);
  let s = '';
  for (let i = 0; i < n; i++) s += ball(n1(x + r() * w), n1(y + r() * h), n1(r0 + r() * (r1 - r0)), BALLC[Math.floor(r() * BALLC.length)]);
  return s;
};
/** White lotus logo, ~60 wide at s=1, centred on x,y. */
const lotus = (x: number, y: number, s: number, c = '#fff'): string =>
  `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}"><path d="M0 -22Q11 -6 0 12Q-11 -6 0 -22Z"/><path d="M-6 10Q-22 2 -19 -14Q-5 -8 -3 8ZM6 10Q22 2 19 -14Q5 -8 3 8Z"/><path d="M-9 12Q-28 12 -32 -2Q-16 -3 -6 9ZM9 12Q28 12 32 -2Q16 -3 6 9Z"/><path d="M-26 16Q0 24 26 16Q0 19 -26 16Z"/></g>`;
/** Sew-in care label. w≈ width; three lines of exact text. */
const careLabel = (x: number, y: number, w: number, rot = 0): string => {
  const f = w / 250;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${n1(f * 100) / 100})"><rect width="250" height="92" rx="3" fill="#fbfaf4" stroke="#b9b6a8" stroke-width="2"/><path d="M6 8H244" stroke="#b9b6a8" stroke-width="2" stroke-dasharray="5 4"/>` +
    tx(125, 36, 19, 'NOVELTY DISPLAY BELT ·', '#15151a', SANS, `${BOLD} ${MID} ${fit(226)}`) + tx(125, 59, 19, '100% POLYESTER ·', '#15151a', SANS, `${BOLD} ${MID} ${fit(170)}`) +
    tx(125, 82, 19, 'NOT FOR LOAD BEARING', '#c01818', SANS, `${BOLD} ${MID} ${fit(226)}`) + `</g>`;
};
/** The misspelled dojo banner, 2 lines, w wide (h = w*0.2). */
const banner = (x: number, y: number, w: number, rot = 0): string =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${n1(w / 7) / 100})"><path d="M0 0H700V140H0Z" fill="#0d0c12"/><path d="M6 6H694V134H6Z" fill="none" stroke="${GOLD}" stroke-width="4"/>` +
  `<circle cx="14" cy="14" r="5" fill="#9a9aa0"/><circle cx="686" cy="14" r="5" fill="#9a9aa0"/>` +
  tx(350, 76, 60, "HUPP'S FREESTLYE KARATE", GOLD, IMPACT, `${MID} ${fit(640)} stroke="#b0241c" stroke-width="1.5"`) +
  tx(350, 120, 34, '— HOME OF THE DRAGON KICK', '#fff', IMPACT, `${MID} ${fit(470)}`) +
  `<path d="M40 104l20 8-20 8 6-8zM660 104l-20 8 20 8-6-8z" fill="#e0281c"/></g>`;

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
    `<path d="${SHOULDERS}" fill="${o.cloth}"/><g clip-path="url(#${k}-s)">${o.clothIn ?? ''}<path d="M104 140H200V200H112Z" fill="#000" opacity=".26"/><path d="M120 146C156 152 186 166 188 200" fill="none" stroke="${o.rim}" stroke-width="5" opacity=".85"/></g>` +
    (o.back ?? '') +
    `<path d="M85 118V150Q100 162 115 150V118Z" fill="${o.shade}"/><path d="M85 124V149Q90 153 95 155L93 132Z" fill="${o.skin}" opacity=".55"/>` +
    (o.overNeck ?? '') +
    `<ellipse cx="67" cy="94" rx="5" ry="9" fill="${o.skin}"/><ellipse cx="133" cy="94" rx="5" ry="9" fill="${o.shade}"/>` +
    `<path d="${HEAD}" fill="${o.skin}"/><g clip-path="url(#${k}-h)">${o.inFace ?? ''}` +
    `<path d="M109 30C105 60 109 72 106 84C104 97 111 103 108 112C106 122 104 128 99 132H140V30Z" fill="${o.shade}" opacity=".72"/><path d="M70 62Q80 50 96 48Q78 56 72 76Z" fill="#fff" opacity=".13"/>` +
    `<path d="M133 66V80C133 106 122 131 100 131" fill="none" stroke="${o.rim}" stroke-width="5" opacity=".85"/></g>` +
    eye(80, '#f1e9df') + eye(106, '#b9ada6') +
    `<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${o.brows}" stroke="${o.browC}" stroke-width="3.2"/>` +
    `<path d="M102 94Q105 104 105.5 108Q101 112 95 108.5" stroke="#000" stroke-opacity=".38" stroke-width="1.9"/>${o.mouth}` +
    `<path d="M95.5 122Q100 123.5 104.5 122" stroke="#000" stroke-opacity=".25" stroke-width="1.5"/>${o.lines ?? ''}</g>` +
    (o.hair ?? '') + (o.top ?? '') +
    `<rect width="200" height="200" fill="url(#${k}-v)"/></svg>`
  );
}
const WRINKLES = 'M87 105Q83.5 111 86 118M113.5 105Q117 111 114.5 118M80 98Q86 100 92 98.5M108 98.5Q114 100 120 98';
const CROWS = 'M74 87q-4 1-6 4M74 91q-4 2-5 5M126 87q4 1 6 4M126 91q4 2 5 5';
const sparkle = (x: number, y: number, r: number, c = '#fff'): string =>
  `<path d="M${x} ${y - r}L${n1(x + r * 0.25)} ${n1(y - r * 0.25)}L${x + r} ${y}L${n1(x + r * 0.25)} ${n1(y + r * 0.25)}L${x} ${y + r}L${n1(x - r * 0.25)} ${n1(y + r * 0.25)}L${x - r} ${y}L${n1(x - r * 0.25)} ${n1(y - r * 0.25)}Z" fill="${c}"/>`;
const gems = (seed: number, x: number, y: number, w: number, h: number, n: number, r = 1.4): string => {
  const q = rng(seed);
  let s = '';
  for (let i = 0; i < n; i++) s += `<circle cx="${n1(x + q() * w)}" cy="${n1(y + q() * h)}" r="${r}" fill="${q() > 0.5 ? '#fff' : GOLD_L}"/>`;
  return s;
};

A.av_c8_dale = bust('av_c8_dale', {
  bg: ['#ffd84a', '#b0661a', '#140a04'], rim: '#fff0a0', cloth: GI,
  clothIn:
    `<path d="M82 146L100 188L118 146Z" fill="#d9a07e"/><path d="M92 158l2 6M100 160v8M108 158l-2 6M96 170l1 5M104 170l-1 5" stroke="#6a5a54" stroke-width="1.3" fill="none"/>` +
    `<path d="M78 147L104 200H90L66 152ZM122 147L96 200H110L134 152Z" fill="#262231" stroke="${GOLD}" stroke-width="1.6"/>` + gems(5, 16, 160, 60, 40, 22) + gems(6, 126, 160, 60, 40, 22) +
    `<path d="M88 150Q100 172 112 150" fill="none" stroke="${GOLD}" stroke-width="2.4"/><circle cx="100" cy="164" r="4" fill="${GOLD}"/>` +
    `<path d="M40 200L52 158L68 153L60 200Z" fill="#050507" stroke="${GOLD}" stroke-width="1.2"/><path d="M52 196l5-30M55 168l6 1M54 176l6 1M53 184l6 1" stroke="${GOLD}" stroke-width="1.8" fill="none"/><path d="M46 198L56 160" stroke="#fff" stroke-width="2" opacity=".35"/>`,
  back: `<path d="M126 60Q156 66 158 104Q160 138 148 162Q138 150 142 122Q144 92 124 84Z" fill="#8f8a88"/><path d="M146 84q6 30-2 62M152 96q4 26-4 52" stroke="#c9c5c2" stroke-width="1.6" fill="none"/><rect x="138" y="70" width="12" height="7" rx="3" fill="#e0281c" transform="rotate(30 144 73)"/>`,
  skin: '#e2a680', shade: '#a8704f', iris: '#3a2a1a', lid: 89.4, low: 93.6,
  inFace: `<path d="M87 109Q100 102 113 109Q116 126 100 133Q84 126 87 109Z" fill="#7d7672"/><path d="M92 112Q100 108 108 112Q109 118 100 120Q91 118 92 112Z" fill="#e2a680"/>`,
  brows: 'M77 83Q86 81 95 84M105 82Q114 75 123 79', browC: '#5c5653',
  mouth: `<path d="M91 115Q101 117.500 111 111.500" stroke="#5a2018" stroke-width="2.6"/><path d="M111 111.500q2.500-.5 3-3.500" stroke="#5a2018" stroke-width="1.6"/>`,
  lines: `<path d="${CROWS}" stroke="#8a5238" stroke-width="1.2" opacity=".7"/>`,
  hair: `<path d="M66 82C60 36 140 36 134 82C132 62 122 50 100 50C78 50 68 62 66 82Z" fill="#77716e"/><path d="M76 52q10-8 24-8M110 45q14 3 20 18" stroke="#c9c5c2" stroke-width="1.6" fill="none"/>`,
  top:
    `<path d="M134 66l22-10 4 9-22 8zM135 72l20 8-3 9-19-9z" fill="#0a0a0c"/><path d="M66 64Q100 54 134 64V77Q100 67 66 77Z" fill="#0a0a0c"/><path d="M66 64Q100 54 134 64" stroke="#fff" stroke-opacity=".25" fill="none"/>` +
    `<path id="av_c8_dale-t" d="M72 73.500Q100 64.500 128 73.500" fill="none"/><text ${IMPACT} font-size="9.500" fill="#fff" ${MID} letter-spacing=".8"><textPath href="#av_c8_dale-t" startOffset="50%">NO MERCY</textPath></text>` +
    sparkle(34, 40, 7, '#fff8c0') + sparkle(170, 150, 5, '#fff8c0'),
});

A.av_c8_corey = bust('av_c8_corey', {
  bg: ['#d8ff8a', '#2f9a5a', '#06180e'], rim: '#f4ffb0', cloth: POLO,
  clothIn:
    `<path d="M86 146L100 176L114 146Z" fill="#e8bd9f"/><path d="M80 146L100 176L88 186L70 151ZM120 146L100 176L112 186L130 151Z" fill="#35c070"/>` +
    `<rect x="124" y="172" width="34" height="15" rx="2" fill="#fff"/>` + tx(141, 183.500, 9, 'COREY', '#156a3a', SANS, `${BOLD} ${MID} ${fit(28)}`) +
    `<path d="M40 176q4-3 8 0q-4 4-8 0zM50 186q4-3 8 0q-4 4-8 0z" fill="#fff" opacity=".5"/>`,
  skin: '#f0c8ac', shade: '#b98c74', iris: '#4a6a3a', lid: 83.6, low: 96,
  overNeck: `<ellipse cx="64" cy="94" rx="8" ry="12" fill="#f0c8ac"/><ellipse cx="136" cy="94" rx="8" ry="12" fill="#b98c74"/>`,
  inFace: `<circle cx="78" cy="104" r="7" fill="#ff8a7a" opacity=".45"/><circle cx="122" cy="104" r="7" fill="#ff6a5a" opacity=".4"/>`,
  brows: 'M77 80Q84 72 95 75M105 75Q116 72 123 80', browC: '#6a4a2c',
  mouth:
    `<path d="M85 112.500Q100 116 115 112.500Q113 126 100 126Q87 126 85 112.500Z" fill="#fffdf6" stroke="#5a2a1c" stroke-width="2"/><path d="M87 119H113M94 114.500V125M100 115V126M106 114.500V125" stroke="#b9a9a0" stroke-width="1"/>`,
  lines: `<path d="M90 109.500l1 2.500M93.500 108.500l.5 3M97 108v2.500M103.500 108v3M107 108.500l-.5 2.500M110.500 109.500l-1 2.500" stroke="#7a5a3a" stroke-width="1.4"/>`,
  hair: `<path d="M66 86C56 26 144 26 134 86C131 68 126 60 114 57Q100 65 84 57C74 60 69 68 66 86Z" fill="#7a5a36"/><path d="M96 36Q98 22 110 20Q104 28 106 38Z" fill="#7a5a36"/><path d="M76 48q12-10 30-9" stroke="#a88456" stroke-width="2" fill="none"/>`,
  top:
    `<path d="M136 62q5 8 0 12q-5-4 0-12z" fill="#9fe0ff" stroke="#fff" stroke-width=".8"/>` +
    `<g transform="translate(40 150)"><path d="M-4 -2L-14 24L-5 20L2 0Z" fill="#2f9ae0"/><path d="M0 0Q-15 -4 -13 -24Q-11 -40 2 -40Q16 -40 15 -24Q14 -6 0 0Z" fill="#9be83a"/><path d="M-11 -30Q-8 -42 3 -40Q15 -40 15 -26Q4 -22 -11 -30Z" fill="#ffe14a"/>` +
    `<path d="M-9 -22Q-14 -8 -2 -2Q-1 -14 -9 -22Z" fill="#3fa82a"/><circle cx="6" cy="-31" r="2.200" fill="#111"/><circle cx="6.600" cy="-31.600" r=".7" fill="#fff"/><path d="M12 -30l8 3-7 4z" fill="#f29a2a"/><circle cx="2" cy="-25" r="2" fill="#2f7dff"/><path d="M-3 0v5M3 -1v5" stroke="#f29a2a" stroke-width="1.6"/></g>`,
});

A.av_c8_crystal = bust('av_c8_crystal', {
  bg: ['#ffb8d6', '#a8306a', '#1c0614'], rim: '#ffe0f0', cloth: '#f6efe2',
  clothIn: `<path d="M82 146L100 186L118 146Z" fill="#e3ad8c"/><path d="M82 146L100 186" stroke="#cfc4ae" stroke-width="2"/><path d="M87 152Q100 166 113 152" fill="none" stroke="${GOLD}" stroke-width="1.6"/><circle cx="100" cy="161" r="2.600" fill="${GOLD}"/>`,
  back: `<path d="M50 152C24 100 40 26 100 22C160 26 176 100 150 152C142 166 128 156 132 132L134 84H66L68 132C72 156 58 166 50 152Z" fill="#e2b84e"/><path d="M48 120q-4 22 8 34M152 120q4 22-8 34M56 70q-8 30-2 50M146 70q8 30 2 50" stroke="#fff0a8" stroke-width="2" fill="none" opacity=".8"/>`,
  skin: '#eab692', shade: '#b07c62', iris: '#4a7a9a', lid: 89.2, low: 94,
  inFace: `<path d="M78 90Q87 82 96 90ZM104 90Q113 82 122 90Z" fill="#a85a8a" opacity=".55"/>`,
  brows: 'M77 82.500H95M105 78Q114 69 123 75', browC: '#8a6a2a',
  mouth: `<path d="M90 114.500Q95 110.500 100 113Q105 110.500 110 114.500Q100 120 90 114.500Z" fill="#d0244a" stroke="none"/><path d="M91 114.500H109" stroke="#7a1028" stroke-width="1.2"/>`,
  hair: `<path d="M66 88C58 38 98 32 110 43C130 38 142 60 134 90C131 72 122 60 108 56C96 67 76 66 66 88Z" fill="#f4d67c"/><path d="M74 60q14-14 34-14M112 48q14 4 18 22" stroke="#fff6c8" stroke-width="2" fill="none"/>`,
  top:
    `<circle cx="66" cy="108" r="6" fill="none" stroke="${GOLD}" stroke-width="2.200"/><circle cx="134" cy="108" r="6" fill="none" stroke="${GOLD}" stroke-width="2.200"/>` +
    `<path d="M70 44Q70 30 84 31Q98 32 97 43Q96 52 84 52Q71 52 70 44ZM103 43Q102 32 116 31Q130 30 130 44Q129 52 116 52Q104 52 103 43Z" fill="#1c1424" stroke="#c9963a" stroke-width="2"/><path d="M97 42h6" stroke="#c9963a" stroke-width="2.400"/><path d="M75 38q6-4 14-3M108 36q6-2 14 0" stroke="#fff" stroke-width="2" opacity=".5" fill="none"/>` +
    `<path d="M150 112H188Q190 142 169 146Q148 142 150 112Z" fill="#fff" fill-opacity=".22" stroke="#fff" stroke-width="1.6"/><path d="M151 124H187Q187 142 169 144Q151 142 151 124Z" fill="#f6e48a" opacity=".9"/><path d="M169 146V176" stroke="#fff" stroke-width="2.400"/><path d="M156 116v18" stroke="#fff" stroke-width="2" opacity=".7"/>` +
    `<path d="M158 200V176Q158 164 170 164Q182 164 182 176V200Z" fill="#eab692"/><path d="M160 172h20M160 180h20" stroke="#b07c62" stroke-width="1.4"/><path d="M160 166h6v6h-6zM172 166h6v6h-6z" fill="#d0244a"/>`,
});

A.av_c8_brenda = bust('av_c8_brenda', {
  bg: ['#a8dcff', '#2c5a8a', '#060c18'], rim: '#d8f0ff', cloth: '#16161c',
  clothIn: `<path d="M84 146L100 180L116 146Z" fill="#fff"/><path d="M78 147L104 200H92L68 152ZM122 147L96 200H108L132 152Z" fill="#22222a" stroke="#fff" stroke-width="1.4"/>`,
  skin: '#dca680', shade: '#9a6a50', iris: '#3a5a6a', lid: 88.6, low: 93.8,
  overNeck: `<path d="M69 92L71 124Q75 136 90 137H110Q125 136 129 124L131 92Z" fill="#dca680"/><path d="M106 137H110Q125 136 129 124L131 92H108Z" fill="#9a6a50" opacity=".72"/>`,
  brows: 'M76 79Q86 80 96 85M104 85Q114 80 124 79', browC: '#6e7278',
  mouth: `<path d="M89 116.500Q100 113.500 111 116.500" stroke="#5a2a20" stroke-width="2.800"/><path d="M86 115l3 2M114 115l-3 2" stroke="#5a2a20" stroke-width="1.6"/>`,
  lines: `<path d="${WRINKLES}M96 76v7M104 76v7" stroke="#7a4a34" stroke-width="1.2" opacity=".65"/>`,
  hair: `<path d="M66 80C61 37 139 37 134 80C130 60 118 51 100 51C82 51 70 60 66 80Z" fill="#a4a8ae" opacity=".92"/><path d="M76 56q10-8 24-8" stroke="#d8dce0" stroke-width="1.4" fill="none"/>`,
  top:
    `<path d="M14 200Q20 168 62 166L148 162Q184 166 188 200Z" fill="#16161c"/><path d="M148 162Q184 166 188 200" fill="none" stroke="#d8f0ff" stroke-width="4" opacity=".8"/>` +
    `<path d="M40 190Q100 168 166 174Q172 184 166 196Q100 188 46 204Z" fill="#dca680"/><path d="M46 204Q100 188 166 196L168 200H46Z" fill="#9a6a50" opacity=".6"/><ellipse cx="166" cy="185" rx="12" ry="11" fill="#dca680"/>` +
    `<g stroke="#27506a" stroke-width="1.600" fill="none" stroke-linecap="round"><path d="M92 176l22-1.500M103 170v12M97 181q6 5 12 0M100 170a3 3 0 1 1 6 0"/><path d="M118 177l8 3-8 3M126 177l8 3-8 3"/></g>` + sparkle(80, 181, 5, '#27506a') +
    lotus(146, 150, 0.32),
});

A.av_c8_ronnie = bust('av_c8_ronnie', {
  bg: ['#fff07a', '#ff7a3a', '#3a0a14'], rim: '#fff6c0', cloth: '#12a8b0',
  clothIn:
    `<path d="M84 146L100 180L116 146Z" fill="#e8846a"/><path d="M80 146L100 178L88 190L68 151ZM120 146L100 178L112 190L132 151Z" fill="#3fc8ce"/>` +
    [[36, 176, '#ff4f9a'], [58, 190, '#ffd21f'], [152, 172, '#ffd21f'], [170, 190, '#ff4f9a'], [134, 194, '#fff']].map(([x, y, c]) => `<g fill="${c}"><circle cx="${x}" cy="${+y - 5}" r="4.500"/><circle cx="${+x + 5}" cy="${y}" r="4.500"/><circle cx="${+x - 5}" cy="${y}" r="4.500"/><circle cx="${+x + 3}" cy="${+y + 5}" r="4.500"/><circle cx="${+x - 3}" cy="${+y + 5}" r="4.500"/></g><circle cx="${x}" cy="${y}" r="2.400" fill="#e0281c"/>`).join('') +
    `<path d="M26 196q8-12 2-22M178 198q-8-8-4-20" stroke="#0a7a4a" stroke-width="3" fill="none"/>` +
    `<path d="M86 148L100 184L114 148" fill="none" stroke="#ffd21f" stroke-width="4.500"/><rect x="82" y="182" width="36" height="18" rx="2" fill="#fff" stroke="#e0281c" stroke-width="1.500"/>` + tx(100, 194.500, 7, "JUMPIN' JAX", '#e0281c', IMPACT, `${MID} ${fit(30)}`),
  skin: '#f08a68', shade: '#c0503a', iris: '#3a6a8a', lid: 86.6, low: 94.2,
  inFace: `<ellipse cx="87" cy="90" rx="12" ry="8" fill="#ffd0b0" opacity=".85"/><ellipse cx="113" cy="90" rx="12" ry="8" fill="#ffd0b0" opacity=".85"/><circle cx="103" cy="105" r="7" fill="#e03a2a" opacity=".5"/><path d="M72 60q28-8 56 0v-8H72z" fill="#e03a2a" opacity=".35"/>`,
  brows: 'M77 81Q86 75 95 79M105 79Q114 75 123 81', browC: '#c99a50',
  mouth: `<path d="M86 112Q100 116 114 112Q112 125 100 125Q88 125 86 112Z" fill="#fffdf6" stroke="#6a1c14" stroke-width="2"/><path d="M90 121Q100 126 110 121" stroke="#e0705a" stroke-width="2"/>`,
  lines: `<path d="${CROWS}" stroke="#a03a2a" stroke-width="1.2" opacity=".7"/>`,
  hair: `<path d="M67 78C64 42 136 42 133 78C128 58 114 51 96 54C82 56 72 62 67 78Z" fill="#d8ac62" opacity=".95"/><path d="M76 58q12-8 30-7M82 54q14-6 30 0" stroke="#fff0b0" stroke-width="1.4" fill="none"/>`,
  top:
    `<path d="M146 200V166Q146 152 160 152Q174 152 174 166V200Z" fill="#f08a68"/><path d="M148 164h24M148 173h24" stroke="#c0503a" stroke-width="1.4"/>` +
    `<g fill="#ff4fae" stroke="#c81a7a" stroke-width="1"><ellipse cx="150" cy="150" rx="5" ry="11"/><ellipse cx="160" cy="151" rx="5" ry="11"/><ellipse cx="176" cy="150" rx="5" ry="11"/><ellipse cx="186" cy="149" rx="5" ry="11"/><ellipse cx="168" cy="136" rx="20" ry="7.500"/><ellipse cx="152" cy="124" rx="6" ry="11" transform="rotate(-20 152 124)"/><ellipse cx="142" cy="112" rx="12" ry="6.500" transform="rotate(14 142 112)"/><ellipse cx="149" cy="100" rx="4.500" ry="9" transform="rotate(-16 149 100)"/><ellipse cx="158" cy="102" rx="4.500" ry="9" transform="rotate(22 158 102)"/><ellipse cx="190" cy="124" rx="4.500" ry="10" transform="rotate(24 190 124)"/></g>` +
    `<path d="M156 133q10-4 22-1M136 110q5-3 10-1" stroke="#fff" stroke-width="2" opacity=".8" fill="none" stroke-linecap="round"/><circle cx="132" cy="113" r="1.800" fill="#111"/>`,
});

A.av_c8_lorraine = bust('av_c8_lorraine', {
  bg: ['#c8f0e0', '#3a8a80', '#081a1c'], rim: '#e8fff6', cloth: '#7a2a6a',
  clothIn: `<path d="M84 146L100 182L116 146Z" fill="#f6efe2"/><path d="M78 147L100 196L84 200L64 153ZM122 147L100 196L116 200L136 153Z" fill="#96388a"/><path d="M86 152Q100 168 114 152" fill="none" stroke="#fff" stroke-width="3.500" stroke-dasharray=".1 5" stroke-linecap="round"/><circle cx="62" cy="180" r="6" fill="${GOLD}"/><circle cx="62" cy="180" r="2.500" fill="#e0281c"/>`,
  back: `<path d="M56 112C40 40 78 22 100 22C122 22 160 40 144 112C142 122 134 116 134 102V80H66V102C66 116 58 122 56 112Z" fill="#b8b0cc"/>`,
  skin: '#e6bc9c', shade: '#a67e66', iris: '#4a5a6a', lid: 87.8, low: 93.8,
  brows: 'M77 80Q86 73 95 78M105 78Q114 73 123 80', browC: '#8a8298',
  mouth: `<path d="M88 113Q100 121 112 113" stroke="#b0204a" stroke-width="2.800"/><path d="M86 111q1 3 3 3M114 111q-1 3-3 3" stroke="#b0204a" stroke-width="1.600"/>`,
  lines: `<path d="${WRINKLES}${CROWS}" stroke="#8a5f4a" stroke-width="1.1" opacity=".6"/>`,
  hair: `<path d="M66 86C56 36 144 36 134 86C130 66 118 58 100 60C82 58 70 66 66 86Z" fill="#d0c8e2"/><path d="M70 62q8-12 20-8q8-10 20-4q12-4 18 12" stroke="#f4f0ff" stroke-width="2" fill="none"/><path d="M62 96q-6-10 2-18M138 96q6-10-2-18" stroke="#d0c8e2" stroke-width="6" fill="none" stroke-linecap="round"/>`,
  top:
    `<g fill="#fff" fill-opacity=".22" stroke="#d0204a" stroke-width="2.400"><path d="M76 94Q74 88 80 88H96Q99 88 98 94Q97 103 88 103Q78 103 76 94ZM102 94Q101 88 104 88H120Q126 88 124 94Q122 103 112 103Q103 103 102 94Z"/></g><path d="M98 92h4" stroke="#d0204a" stroke-width="2.400"/>` +
    `<path d="M76 92Q58 104 56 160M124 92Q142 104 144 160" fill="none" stroke="${GOLD_L}" stroke-width="3" stroke-dasharray=".1 5" stroke-linecap="round"/>` +
    `<g transform="rotate(-10 160 170)"><rect x="126" y="140" width="62" height="70" rx="3" fill="#8a5a2a"/><rect x="131" y="148" width="52" height="60" fill="#fffdf4"/><rect x="146" y="135" width="22" height="11" rx="2" fill="#b9bcc4"/><path d="M137 162H177M137 172H177M137 182H165" stroke="#8a8a90" stroke-width="2"/><path d="M168 178l10 10M178 178l-10 10" stroke="#e0281c" stroke-width="3"/></g>`,
});

A.av_c8_tammy = bust('av_c8_tammy', {
  bg: ['#ff8ad8', '#c0188a', '#24041c'], rim: '#ffd0f4', cloth: '#ff2f9a',
  clothIn: `<path d="M84 146L100 184L116 146Z" fill="#e8ae88"/><path d="M80 146L100 184L86 192L68 151ZM120 146L100 184L114 192L132 151Z" fill="#ff7ac0"/><path d="M30 190h30M36 196h20" stroke="#fff" stroke-width="1.500" opacity=".6"/>`,
  back: `<path d="M34 156C-6 96 22 4 100 4C178 4 206 96 166 156C156 168 142 152 136 128L134 80H66L64 128C58 152 44 168 34 156Z" fill="#8a2030"/><path d="M30 110q-10-50 30-84M170 110q10-50-30-84M64 30q36-20 72 0M40 140q-12-20-10-44M160 140q12-20 10-44" stroke="#e05a50" stroke-width="2.400" fill="none" opacity=".8"/>`,
  skin: '#eeb48e', shade: '#b0765a', iris: '#3a2a1c', lid: 85.6, low: 94.4,
  inFace: `<path d="M77 90Q87 76 97 90ZM103 90Q113 76 123 90Z" fill="#2ad0e8" opacity=".8"/><circle cx="78" cy="104" r="7" fill="#ff5a8a" opacity=".4"/>`,
  brows: 'M77 79Q86 72 95 77M105 77Q114 72 123 79', browC: '#5a1a1c',
  mouth: `<path d="M92 113Q100 109 108 113Q100 119 92 113Z" fill="#e0206a" stroke="none"/>`,
  lines: `<path d="M79 90l-4-4M82 87l-2-5M121 90l4-4M118 87l2-5" stroke="#1a1318" stroke-width="1.500"/>`,
  hair: `<path d="M64 92C50 28 96 20 112 36C136 30 148 60 136 92C132 72 124 60 110 55C96 68 74 66 64 92Z" fill="#a02a38"/><path d="M72 58q14-18 38-16M114 40q16 6 18 28" stroke="#f0706a" stroke-width="2.200" fill="none"/>`,
  top:
    `<circle cx="66" cy="112" r="9" fill="none" stroke="${GOLD}" stroke-width="2.600"/><circle cx="134" cy="112" r="9" fill="none" stroke="${GOLD}" stroke-width="2.600"/>` +
    `<circle cx="100" cy="120" r="15" fill="#ff8ad0" fill-opacity=".85" stroke="#ffd0f0" stroke-width="1.400"/><path d="M91 113q4-6 11-6" stroke="#fff" stroke-width="2.600" fill="none" stroke-linecap="round"/><path d="M114 110l8-6M117 120h9M113 130l7 6" stroke="#ffd0f0" stroke-width="2" stroke-linecap="round"/>` +
    `<path d="M140 200V172Q144 160 160 160Q178 160 180 174V200Z" fill="#eeb48e"/>` +
    [[146, 166, -22], [156, 160, -8], [167, 160, 6], [177, 166, 20]].map(([x, y, a], i) => `<g transform="translate(${x} ${y}) rotate(${a})"><rect x="-4.500" y="-22" width="9" height="26" rx="4.500" fill="#eeb48e"/><path d="M-4.500 -20Q-5 -40 0 -46Q5 -40 4.500 -20Z" fill="${i % 2 ? '#fff' : '#ff2f9a'}" stroke="#c01870" stroke-width=".8"/><circle cx="0" cy="-27" r="1.500" fill="${i % 2 ? '#ff2f9a' : '#fff'}"/><circle cx="0" cy="-34" r="1.100" fill="#9fe8ff"/></g>`).join('') +
    sparkle(168, 104, 6) + sparkle(30, 60, 5),
});

A.av_c8_mom = bust('av_c8_mom', {
  bg: ['#ffe0a8', '#b07a5a', '#1c100c'], rim: '#fff0d0', cloth: '#9a7ad0',
  clothIn: `<path d="M84 146L100 176L116 146Z" fill="#fff6e0"/><path d="M80 147L100 200M120 147L100 200" stroke="#7a5ab0" stroke-width="6" fill="none"/><circle cx="100" cy="186" r="3.500" fill="#fff0d0"/><path d="M30 170l6 30M44 164l5 36M156 164l-5 36M170 170l-6 30" stroke="#b094e0" stroke-width="2" fill="none"/>`,
  skin: '#ecc8ac', shade: '#b08a72', iris: '#5a6a7a', lid: 88.8, low: 93.6,
  brows: 'M77 81Q86 79 95 83M105 80Q114 73 123 78', browC: '#b8b4b0',
  mouth: `<path d="M94 114.500Q100 110 106 114.500Q100 121 94 114.500Z" fill="#6a2a24" stroke="#b0504a" stroke-width="1.400"/>`,
  lines: `<path d="${WRINKLES}${CROWS}M82 68q18-4 36 0" stroke="#946a54" stroke-width="1.2" opacity=".7"/>`,
  hair: `<path d="M66 82q2-18 12-22M134 82q-2-18-12-22" stroke="#d8d4d0" stroke-width="6" fill="none" stroke-linecap="round"/>`,
  top:
    [72, 91, 110].map((x) => `<rect x="${x}" y="50" width="18" height="12" rx="6" fill="#ff8ac0" stroke="#d0508a" stroke-width="1.200"/><path d="M${x + 5} 51v10M${x + 9} 51v10M${x + 13} 51v10" stroke="#d0508a" stroke-width="1"/>`).join('') +
    `<path d="M62 78C52 22 148 22 138 78C134 58 122 46 100 46C78 46 66 58 62 78Z" fill="#18a8a0"/><path d="M62 78C52 22 148 22 138 78" fill="none" stroke="#fff0d0" stroke-width="2" opacity=".5"/>` +
    [[78, 40], [96, 32], [116, 36], [130, 52], [70, 56], [106, 42], [88, 28]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#ffe14a"/>`).join('') +
    `<path d="M100 26Q84 8 80 22Q80 30 100 28Q120 30 120 22Q116 8 100 26Z" fill="#18a8a0" stroke="#0a6a66" stroke-width="1.500"/>` +
    `<g fill="none" stroke="#8a5a3a" stroke-width="2.400"><circle cx="87" cy="91" r="11"/><circle cx="113" cy="91" r="11"/><path d="M98 90h4"/></g><circle cx="87" cy="91" r="10" fill="#fff" opacity=".15"/><circle cx="113" cy="91" r="10" fill="#fff" opacity=".15"/>` +
    `<g transform="rotate(14 160 160)"><rect x="124" y="124" width="62" height="90" rx="9" fill="#23262e" stroke="#5a606c" stroke-width="2"/><rect x="132" y="132" width="20" height="20" rx="5" fill="#101216"/><circle cx="142" cy="142" r="5" fill="#3a4a6a"/><circle cx="140.500" cy="140.500" r="1.500" fill="#fff"/></g>` +
    `<path d="M112 200Q110 176 126 172Q136 170 136 182V200Z" fill="#ecc8ac"/><path d="M114 186h20" stroke="#b08a72" stroke-width="1.400"/>`,
});

// ════════════════════════════════════════════════════════════════ FIGURES
type Arm = [number, number, number, number];
interface Fig {
  skin: string; shade: string; shirt: string; sx?: number; rot?: number;
  long?: boolean; hair?: string; face?: string; eyes?: string; hat?: string;
  la?: Arm; ra?: Arm; pre?: string; over?: string; legs?: string; under?: string; hand?: number;
}
/** Stylised figure. Origin = base of the neck; 1 unit ≈ 1 px at s=1 (head ~54 tall). */
const fig = (x: number, y: number, s: number, o: Fig): string => {
  const hr = o.hand ?? 11;
  const arm = (sx: number, a?: Arm): string => a
    ? `<path d="M${sx} 16L${a[0]} ${a[1]}" stroke="${o.shirt}" stroke-width="25"/><path d="M${sx} 16L${a[0]} ${a[1]}" stroke="#000" stroke-opacity=".1" stroke-width="25"/>` +
      `<path d="M${a[0]} ${a[1]}L${a[2]} ${a[3]}" stroke="${o.long ? o.shirt : o.skin}" stroke-width="${o.long ? 21 : 17}"/><circle cx="${a[2]}" cy="${a[3]}" r="${hr}" fill="${o.skin}"/>`
    : '';
  return `<g transform="translate(${x} ${y}) rotate(${o.rot ?? 0}) scale(${n1(s * (o.sx ?? 1) * 100) / 100} ${s})" stroke-linecap="round" stroke-linejoin="round">` +
    (o.under ?? '') +
    (o.legs ? `<path d="M-34 120L-36 420H-4L0 170L4 420H36L34 120Z" fill="${o.legs}"/>` : '') +
    `<path d="M-44 14Q-46 0 -20 -6H20Q46 0 44 14L36 132H-36Z" fill="${o.shirt}"/><path d="M8 -6H20Q46 0 44 14L36 132H14Z" fill="#000" opacity=".16"/>` +
    (o.pre ?? '') +
    `<path d="M-9 -26V-2Q0 7 9 -2V-26Z" fill="${o.shade}"/>` +
    `<ellipse cx="-22" cy="-52" rx="4" ry="7" fill="${o.skin}"/><ellipse cx="22" cy="-52" rx="4" ry="7" fill="${o.shade}"/>` +
    `<path d="M-22 -52C-22 -90 22 -90 22 -52C22 -34 14 -18 0 -18C-14 -18 -22 -34 -22 -52Z" fill="${o.skin}"/><path d="M5 -80C22 -78 22 -60 22 -52C22 -34 14 -18 0 -18C7 -30 9 -42 6 -54Z" fill="${o.shade}" opacity=".7"/>` +
    (o.eyes ?? EYES) +
    `<path d="M1 -52q3 8 2 11q-3 2-6 0" stroke="#000" stroke-opacity=".35" stroke-width="1.600" fill="none"/>` +
    (o.face ?? `<path d="M-8 -33q8 6 16 0" stroke="#3a1612" stroke-width="2.400" fill="none"/>`) +
    (o.hair ?? '') + (o.hat ?? '') + arm(-40, o.la) + arm(40, o.ra) + (o.over ?? '') + `</g>`;
};
const EYES = `<ellipse cx="-9" cy="-54" rx="2.600" ry="3.200" fill="#1a1210"/><ellipse cx="9" cy="-54" rx="2.600" ry="3.200" fill="#1a1210"/><path d="M-14 -61q5-3 10-1M4 -62q5-2 10 1" stroke="#1a1210" stroke-width="2" fill="none"/>`;
const EYES_WIDE = `<circle cx="-9" cy="-54" r="5.500" fill="#fff"/><circle cx="9" cy="-54" r="5.500" fill="#fff"/><circle cx="-9" cy="-54" r="2.200" fill="#1a1210"/><circle cx="9" cy="-54" r="2.200" fill="#1a1210"/><path d="M-16 -66q6-5 12-2M4 -68q6-3 12 2" stroke="#6a4a2c" stroke-width="2.200" fill="none"/>`;
const EYES_SHUT = `<path d="M-14 -55q5 4 10 0M4 -55q5 4 10 0M-15 -62q5-2 10 0M5 -62q5-2 10 0" stroke="#1a1210" stroke-width="2.200" fill="none"/>`;
const GRIN = `<path d="M-11 -36Q0 -31 11 -36Q9 -24 0 -24Q-9 -24 -11 -36Z" fill="#fffdf6" stroke="#4a1c14" stroke-width="1.600"/>`;
const GI_PRE = (trim: string, belt: string, beltEdge: string, skin: string): string =>
  `<path d="M-13 -7L2 62L13 -7Z" fill="${skin}"/><path d="M-17 -7L3 96M17 -7L-4 60" stroke="${trim}" stroke-width="4" fill="none"/>` +
  `<path d="M-38 96H38L37 113H-37Z" fill="${belt}" stroke="${beltEdge}" stroke-width="1.500"/><path d="M-7 94h14v20h-14z" fill="${belt}" stroke="${beltEdge}" stroke-width="1.500"/><path d="M-5 114l-12 36h10l8-36zM5 114l13 32h-10l-7-32z" fill="${belt}" stroke="${beltEdge}" stroke-width="1.500"/>`;
const DALE_HAIR =
  `<path d="M17 -74Q42 -68 40 -36Q38 -14 31 -4Q26 -20 29 -38Q29 -58 15 -63Z" fill="#8f8a88"/><path d="M-23 -54C-27 -92 27 -92 23 -54C20 -70 12 -76 0 -76C-12 -76 -20 -70 -23 -54Z" fill="#77716e"/>` +
  `<path d="M22 -66l16-7 2 6-16 6zM22 -62l15 5-2 6-14-6z" fill="#0a0a0c"/><path d="M-23 -67Q0 -74 23 -67V-58Q0 -65 -23 -58Z" fill="#0a0a0c"/><path d="M-13 -64.500Q0 -68 13 -64.500" stroke="#fff" stroke-width="2.400" stroke-dasharray="3 1.600" fill="none"/>`;
const GOATEE = `<path d="M-10 -39Q0 -44 10 -39Q11 -24 0 -18Q-11 -24 -10 -39Z" fill="#7d7672"/>`;
const DALE: Fig = {
  skin: '#e2a680', shade: '#a8704f', shirt: GI, long: true, sx: 1.12, hair: DALE_HAIR,
  pre: GI_PRE(GOLD, '#050507', GOLD, '#d9a07e') + gems(11, -40, 6, 80, 86, 26, 1.3),
  face: GOATEE + `<path d="M-7 -32Q1 -29 9 -34" stroke="#4a1c14" stroke-width="2.400" fill="none"/>`,
};
const COREY_HAIR = `<path d="M-23 -50C-30 -96 30 -96 23 -50C21 -64 17 -70 9 -72Q0 -66 -11 -72C-18 -70 -21 -64 -23 -50Z" fill="#7a5a36"/><path d="M-3 -86Q-1 -98 8 -99Q4 -92 5 -85Z" fill="#7a5a36"/>`;
const TACHE = `<path d="M-8 -38l1 3M-4.500 -39l.5 3M-1 -39.500v3M3 -39.500v3M6 -39l-.5 3M9 -38l-1 3" stroke="#7a5a3a" stroke-width="1.500" fill="none"/>`;
const COREY: Fig = {
  skin: '#f0c8ac', shade: '#b98c74', shirt: POLO, sx: 0.8, hair: COREY_HAIR, eyes: EYES_WIDE,
  face: TACHE + `<path d="M-11 -34Q0 -31 11 -34Q9 -23 0 -23Q-9 -23 -11 -34Z" fill="#fffdf6" stroke="#4a1c14" stroke-width="1.600"/><path d="M-9 -28.500H9" stroke="#b9a9a0" stroke-width="1"/>`,
};

// ════════════════════════════════════════════════════════════════ COVER
A.c8_cover = ((): string => {
  const k = 'c8_cover';
  const defs =
    ballPat(`${k}p`, 0.6, 3, 8) + bl(`${k}b`, 16) + bl(`${k}c`, 5) +
    rg(`${k}h`, [[0, '#02030a', 1], [0.55, '#02030a', 0.9], [1, '#02030a', 0]]) + lg(`${k}g`, [[0, '#3a3a44'], [0.4, '#0a0a0e'], [1, '#000']], 1, 0) +
    lg(`${k}r`, [[0, '#3f7dff'], [1, '#1a3aa0']]) + `<path id="${k}t" d="M352 438C392 470 402 500 428 536"/>`;
  const body =
    `<rect width="600" height="800" fill="url(#${k}p)"/>` +
    `<path d="M-60 -60H660V860H-60ZM150 196L470 170L500 560L176 596Z" fill="#050830" fill-rule="evenodd" opacity=".78" filter="url(#${k}b)"/>` +
    `<path d="M150 196L470 170L500 560L176 596Z" fill="#bcd4ff" opacity=".16" filter="url(#${k}b)"/>` +
    // padded rim
    `<path d="M0 0H600V800H0ZM34 34V766H566V34Z" fill="url(#${k}r)" fill-rule="evenodd"/><path d="M34 34V766H566V34Z" fill="none" stroke="#0a1a5a" stroke-width="6" opacity=".6"/>` +
    [[0, 0], [540, 0], [0, 740], [540, 740]].map(([x, y]) => `<rect x="${x}" y="${y}" width="60" height="60" fill="#8a909c"/><circle cx="${x + 30}" cy="${y + 30}" r="7" fill="#4a505c"/>`).join('') +
    // crater
    `<ellipse cx="300" cy="380" rx="120" ry="100" fill="url(#${k}h)"/>` +
    balls(21, 180, 300, 240, 30, 5, 15, 19) + balls(22, 170, 440, 250, 30, 5, 15, 19) + balls(23, 170, 330, 30, 110, 3, 15, 19) + balls(24, 400, 330, 30, 110, 3, 15, 19) +
    // the belt
    `<path d="M300 392C330 380 350 420 380 462C404 500 404 530 436 548" fill="none" stroke="#000" stroke-width="38" opacity=".5" filter="url(#${k}c)"/>` +
    `<path d="M300 392C330 380 350 420 380 462C404 500 404 530 436 548" fill="none" stroke="#0b0b10" stroke-width="30"/>` +
    `<path d="M306 386C332 378 356 416 386 456C408 492 412 520 440 538" fill="none" stroke="#fff" stroke-width="4" opacity=".4" stroke-linecap="round"/>` +
    `<text ${SERIF} ${BOLD} font-size="15" fill="${GOLD}" letter-spacing="1" dy="5"><textPath href="#${k}t">10th DAN ★</textPath></text>` +
    `<g transform="translate(436 548) rotate(32)"><path d="M-4 -15H20V15H-4Z" fill="#0b0b10"/><path d="M2 -15V15M8 -15V15M14 -15V15" stroke="${GOLD}" stroke-width="2.500"/><path d="M20 -15l5 4-4 4 5 4-5 4 5 4-4 4 4 6" fill="none" stroke="#0b0b10" stroke-width="3"/></g>` +
    ball(290, 404, 17, '#ffd21f') + ball(318, 372, 16, '#2f7dff') +
    // ski mask
    `<g transform="translate(420 262) rotate(24)"><ellipse cx="4" cy="8" rx="62" ry="50" fill="#000" opacity=".45" filter="url(#${k}c)"/><path d="M-56 0Q-58 -44 0 -46Q58 -44 56 0Q54 40 0 44Q-54 40 -56 0Z" fill="#101016"/><path d="M-48 -8Q-44 -36 0 -38" fill="none" stroke="#fff" stroke-width="3" opacity=".25" stroke-linecap="round"/>` +
    `<path d="M-36 -6Q-22 -20 -8 -6Q-22 6 -36 -6ZM8 -6Q22 -20 36 -6Q22 6 8 -6Z" fill="#ff3b3b"/><path d="M-36 -6Q-22 -20 -8 -6Q-22 6 -36 -6ZM8 -6Q22 -20 36 -6Q22 6 8 -6Z" fill="none" stroke="#2a2a34" stroke-width="3"/><circle cx="-26" cy="-10" r="3" fill="#fff" opacity=".7"/><path d="M8 -6Q22 -20 36 -6Q22 6 8 -6Z" fill="#ffd21f"/><circle cx="18" cy="-10" r="3" fill="#fff" opacity=".7"/>` +
    `<path d="M-14 20Q0 28 14 20" fill="none" stroke="#2a2a34" stroke-width="3"/><path d="M-50 14Q0 34 50 14M-54 2Q0 22 54 2" fill="none" stroke="#1c1c26" stroke-width="2"/></g>` +
    // police tape
    `<g transform="translate(-30 372) rotate(-33)"><rect width="460" height="40" fill="#000" opacity=".4" y="6" filter="url(#${k}c)"/><rect width="460" height="38" fill="#ffd60a"/>` +
    tx(14, 27, 22, 'POLICE LINE DO NOT CROSS · POLICE LINE DO NOT', '#111', SANS, `${BOLD} ${fit(430)}`) + `</g>`;
  return frame(k, 600, 800, defs, body, 0.16, 0.6);
})();

// ════════════════════════════════════════════════════════════════ WALLPAPERS
A.c8_wall_lock = ((): string => {
  const k = 'c8_wall_lock';
  const defs =
    lg(`${k}w`, [[0, '#8a5a2e'], [0.5, '#6e4420'], [1, '#3a2210']]) + rg(`${k}s`, [[0, '#ffe2a0', 0.5], [1, '#ffe2a0', 0]], 0.4, 0.42, 0.6) +
    lg(`${k}b`, [[0, '#e9c46a'], [0.5, '#fff2b0'], [1, '#a87a1c']], 1, 1) + lg(`${k}g`, [[0, '#fff', 0], [0.35, '#fff', 0.3], [0.5, '#fff', 0], [1, '#000', 0.25]], 1, 0) + bl(`${k}f`, 7);
  const PX = 215;
  /** One draped belt. n stripes of colour `tape` on the long (right) tail, counted up from its end. */
  const belt = (py: number, c: string, dark: string, tape: string, n: number, l1: number, extra = ''): string => {
    let st2 = '';
    for (let i = 0; i < n; i++) st2 += `<rect x="3" y="${159 - i * 19}" width="52" height="11" fill="${tape}"/>`;
    return `<g transform="translate(${PX} ${py})"><path d="M-58 14Q-60 -26 0 -26Q60 -26 58 14Z" fill="#000" opacity=".45" filter="url(#${k}f)" transform="translate(8 10)"/>` +
      `<g transform="rotate(4)"><rect x="-47" y="6" width="52" height="${l1}" fill="#000" opacity=".4" filter="url(#${k}f)"/><rect x="-55" y="0" width="52" height="${l1}" fill="${c}"/><rect x="-55" y="0" width="52" height="${l1}" fill="url(#${k}g)"/><path d="M-51 0V${l1}M-7 0V${l1}" stroke="${dark}" stroke-width="1.500" stroke-dasharray="4 3"/>${extra}</g>` +
      `<g transform="rotate(-4)"><rect x="11" y="6" width="52" height="180" fill="#000" opacity=".4" filter="url(#${k}f)"/><rect x="3" y="0" width="52" height="180" fill="${c}"/><path d="M7 0V180M51 0V180" stroke="${dark}" stroke-width="1.500" stroke-dasharray="4 3"/>${st2}<rect x="3" y="0" width="52" height="180" fill="url(#${k}g)"/></g>` +
      `<path d="M-57 8Q-58 -24 0 -24Q58 -24 57 8Q30 -4 0 -4Q-30 -4 -57 8Z" fill="${c}"/><path d="M-57 8Q-58 -24 0 -24Q58 -24 57 8Q30 -4 0 -4Q-30 -4 -57 8Z" fill="#000" opacity=".22"/>` +
      `<circle cx="0" cy="-10" r="12" fill="url(#${k}b)" stroke="#6a4a10" stroke-width="2"/><circle cx="-3" cy="-13" r="3.500" fill="#fff" opacity=".8"/></g>`;
  };
  let planks = '';
  for (let x = 0; x <= 600; x += 100) planks += `<path d="M${x} 0V1300" stroke="#2a1608" stroke-width="5"/><path d="M${x + 4} 0V1300" stroke="#b07a3e" stroke-width="1.500" opacity=".6"/>`;
  const q = rng(4);
  let grainW = '';
  for (let i = 0; i < 16; i++) { const x = n1(q() * 600), y = n1(q() * 1250); grainW += `M${x} ${y}q${n1(6 - q() * 12)} ${n1(40 + q() * 60)} 0 ${n1(90 + q() * 90)}`; }
  const body =
    `<rect width="600" height="1300" fill="url(#${k}w)"/><path d="${grainW}" fill="none" stroke="#3a2210" stroke-width="2" opacity=".4"/>${planks}<rect width="600" height="1300" fill="url(#${k}s)"/>` +
    // plaque
    `<g transform="translate(300 300)"><rect x="-222" y="-36" width="452" height="80" rx="6" fill="#000" opacity=".4" filter="url(#${k}f)"/><rect x="-226" y="-42" width="452" height="80" rx="6" fill="url(#${k}b)" stroke="#6a4a10" stroke-width="3"/><rect x="-218" y="-34" width="436" height="64" rx="3" fill="none" stroke="#6a4a10" stroke-width="1.500"/>` +
    [[-212, -28], [212, -28], [-212, 24], [212, 24]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.500" fill="#6a4a10"/>`).join('') +
    tx(0, -6, 30, 'WALL OF EXCELLENCE', '#3a2606', SERIF, `${BOLD} ${MID} ${fit(380)}`) + tx(0, 22, 19, '— BELTS IN ORDER OF GLORY —', '#3a2606', SERIF, `${BOLD} ${MID} ${fit(330)}`) + `</g>` +
    // certificate
    `<g transform="translate(455 640) rotate(2.500)"><rect x="-112" y="-150" width="236" height="312" fill="#000" opacity=".45" filter="url(#${k}f)"/><rect x="-118" y="-158" width="236" height="312" fill="#1a1208" stroke="url(#${k}b)" stroke-width="10"/><rect x="-100" y="-140" width="200" height="276" fill="#f6eccc"/><rect x="-92" y="-132" width="184" height="260" fill="none" stroke="#c9a23a" stroke-width="3"/>` +
    tx(0, -92, 17, 'CERTIFICATE OF', '#6a4a10', SERIF, `${MID} ${fit(140)}`) + tx(0, -50, 40, '10th DAN', '#a87a1c', SERIF, `${BOLD} ${MID} ${fit(160)}`) +
    `<path d="M-70 -34H70" stroke="#c9a23a" stroke-width="2"/>` + tx(0, -10, 15, 'WORLD FREESTYLE', '#3a2606', SERIF, `${BOLD} ${MID} ${fit(160)}`) + tx(0, 10, 15, 'KARATE COUNCIL', '#3a2606', SERIF, `${BOLD} ${MID} ${fit(150)}`) +
    tx(0, 36, 12, 'awarded to Dale Hupp (by mail)', '#5a4a2a', SERIF, `font-style="italic" ${MID} ${fit(160)}`) +
    `<path d="M-12 76l-8 34 12-8 8 10zM12 76l8 34-12-8-8 10z" fill="#c01818"/><circle cx="0" cy="72" r="22" fill="url(#${k}b)" stroke="#a87a1c" stroke-width="2"/>` + sparkle(0, 72, 13, '#a87a1c') +
    tx(0, 124, 11, 'P.O. BOX · RENO, NEVADA', '#5a4a2a', SANS, `${BOLD} ${MID} ${fit(150)}`) + `</g>` +
    belt(392, '#0d0d12', '#3a3a44', GOLD, 9, 176, `<text transform="translate(-23 12) rotate(90)" ${SERIF} ${BOLD} font-size="14" fill="${GOLD}" ${fit(152)}>GRANDMASTER D. HUPP</text>`) +
    belt(606, '#f4f1e6', '#b9b4a2', '#111114', 4, 150) +
    belt(820, '#7a4420', '#4a280e', '#fbfaf2', 6, 150) +
    belt(1034, '#ffd21f', '#b08a00', '#111114', 1, 150) +
    `<rect y="1236" width="600" height="64" fill="#1c1008"/><rect y="1236" width="600" height="5" fill="#b07a3e" opacity=".6"/>`;
  return frame(k, 600, 1300, defs, body, 0.2, 0.6);
})();

A.c8_wall_home = ((): string => {
  const k = 'c8_wall_home';
  const defs =
    lg(`${k}w`, [[0, '#2a1f4a'], [1, '#4a2a5a']]) + lg(`${k}m`, [[0, '#8fc8e8'], [0.5, '#5a8ac0'], [1, '#3a4a8a']], 1, 1) + lg(`${k}f`, [[0, '#2f6fd0'], [1, '#12285a']]) +
    rimF(`${k}r`, '#ffd84a', 6, 3) + rimF(`${k}q`, '#bfe6ff', 3, 2, '#000', 0.2) + rg(`${k}s`, [[0, '#ffe68a', 0.55], [1, '#ffe68a', 0]]) + bl(`${k}b`, 10) +
    `<clipPath id="${k}c"><rect x="40" y="330" width="520" height="560"/></clipPath>`;
  const pants = (d: string): string => `<path d="${d}" fill="none" stroke="${GI}" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${GOLD}" stroke-width="3" stroke-dasharray="1 9" stroke-linecap="round"/>`;
  const body =
    `<rect width="600" height="1300" fill="url(#${k}w)"/>` + banner(40, 170, 520, -1.5) +
    `<rect x="32" y="322" width="536" height="576" fill="#c9ccd4"/><rect x="40" y="330" width="520" height="560" fill="url(#${k}m)"/>` +
    `<g clip-path="url(#${k}c)"><path d="M60 330L200 890H280L140 330ZM330 330L470 890H500L360 330Z" fill="#fff" opacity=".14"/><rect x="40" y="800" width="520" height="90" fill="#1c3a7a" opacity=".6"/>` +
    // reflection: his back, HUPP in rhinestones
    pop(`${k}q`, `<g transform="translate(165 610) scale(.92)" opacity=".95"><path d="M-30 124L-40 330H-6L0 180L6 330H40L30 124Z" fill="#14121c"/><path d="M-46 14Q-48 0 -20 -6H20Q48 0 46 14L38 132H-38Z" fill="#1c1a28"/><path d="M-40 16L-76 -30L-64 -84" fill="none" stroke="#1c1a28" stroke-width="24" stroke-linecap="round"/><circle cx="-64" cy="-88" r="12" fill="#b88462"/>` +
      `<path d="M-38 98H38L37 113H-37Z" fill="#050507" stroke="${GOLD}" stroke-width="1.500"/><circle cx="0" cy="-52" r="23" fill="#77716e"/><path d="M-6 -44Q0 -10 -2 30Q6 30 8 -44Z" fill="#8f8a88"/><path d="M-23 -62Q0 -70 23 -62V-54Q0 -62 -23 -54Z" fill="#0a0a0c"/>` +
      `<text x="0" y="66" ${IMPACT} font-size="34" ${MID} fill="none" stroke="#fff6c0" stroke-width="3" stroke-dasharray=".1 4.500" stroke-linecap="round" ${fit(70)}>HUPP</text></g>`) + `</g>` +
    // mats
    `<path d="M0 898H600V1300H0Z" fill="url(#${k}f)"/><g stroke="#0a1a44" stroke-width="3" opacity=".7"><path d="M0 960H600M0 1060H600M0 1200H600M300 898V1300M150 898L60 1300M450 898L540 1300M40 898L-140 1300M560 898L740 1300"/></g>` +
    `<ellipse cx="300" cy="1128" rx="170" ry="26" fill="#000" opacity=".45" filter="url(#${k}b)"/><ellipse cx="330" cy="700" rx="300" ry="330" fill="url(#${k}s)"/>` +
    // whoosh
    `<g fill="none" stroke="#fff" stroke-linecap="round" opacity=".8"><path d="M440 960Q560 960 596 900" stroke-width="7"/><path d="M470 990Q560 990 598 950" stroke-width="4"/><path d="M540 780Q560 760 560 730" stroke-width="4"/></g>` +
    pop(`${k}r`,
      pants('M286 880L262 1000L282 1104') + `<path d="M260 1100h56q14 0 14 14v6h-70z" fill="#e2a680"/>` +
      pants('M322 880L436 900L530 852') + `<path d="M520 812q10-6 18 2l34 34q8 10-2 18l-14 10z" fill="#e2a680"/><path d="M560 832l10-18M568 842l16-12M572 854l18-4" stroke="#e2a680" stroke-width="8" stroke-linecap="round"/>` +
      fig(292, 660, 1.75, { ...DALE, rot: -14, la: [-84, 6, -112, -52], ra: [78, 44, 132, 20], hand: 13,
        eyes: `<path d="M-16 -58l10 5-10 4M16 -58l-10 5 10 4" stroke="#1a1210" stroke-width="2.600" fill="none"/><path d="M-17 -65l12 5M17 -65l-12 5" stroke="#5c5653" stroke-width="3" fill="none"/>`,
        face: GOATEE + `<path d="M-8 -37Q0 -41 8 -37Q9 -24 0 -22Q-9 -24 -8 -37Z" fill="#4a0e0c" stroke="#2a0806" stroke-width="1.500"/><path d="M-7 -36Q0 -39 7 -36L6 -33H-6Z" fill="#fffdf6"/><path d="M-4 -25Q0 -28 4 -25" stroke="#e0705a" stroke-width="2.400" fill="none"/>` })) +
    sparkle(92, 520, 16, '#fff6c0') + sparkle(520, 600, 12, '#fff6c0') + sparkle(470, 1010, 9, '#fff') +
    `<g transform="translate(420 520) rotate(-10)">` + tx(0, 0, 44, 'HI-YAAH!', '#ffd84a', IMPACT, `${fit(150)} stroke="#b0241c" stroke-width="2"`) + `</g>`;
  return frame(k, 600, 1300, defs, body, 0.16, 0.6);
})();

// ════════════════════════════════════════════════════════════════ MAP
A.c8_map = ((): string => {
  const k = 'c8_map';
  const defs = rg(`${k}l`, [[0, '#ffb24a', 0.55], [1, '#ffb24a', 0]]) + rg(`${k}n`, [[0, '#ff4fb0', 0.5], [1, '#ff4fb0', 0]]) + rg(`${k}e`, [[0, '#4aff9a', 0.45], [1, '#4aff9a', 0]]) + bl(`${k}b`, 3);
  const q = rng(9);
  let houses = '';
  const blk = (x: number, y: number, w: number, h: number, n: number): void => {
    for (let i = 0; i < n; i++) { const bw = 14 + q() * 22, bh = 12 + q() * 16; houses += `<rect x="${n1(x + q() * (w - bw))}" y="${n1(y + q() * (h - bh))}" width="${n1(bw)}" height="${n1(bh)}"/>`; }
  };
  blk(66, 250, 70, 150, 6); blk(250, 462, 60, 70, 3); blk(440, 462, 290, 70, 9); blk(66, 66, 30, 40, 1); blk(180, 62, 440, 36, 8); blk(66, 520, 60, 16, 1);
  blk(0, 70, 34, 460, 9); blk(766, 70, 34, 460, 9); blk(60, 566, 680, 30, 12); blk(60, 0, 680, 30, 12);
  let stalls = '';
  for (let x = 170; x <= 630; x += 20) stalls += `M${x} 112V136M${x} 160V182`;
  for (let y = 176; y <= 400; y += 20) stalls += `M664 ${y}H686M700 ${y}H722`;
  const lamp = (x: number, y: number, g = 'l', r = 46): string => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${k}${g})"/>`;
  const pin = (x: number, y: number, ring: string, glyph: string): string =>
    `<circle cx="${x}" cy="${y + 2}" r="17" fill="#000" opacity=".5" filter="url(#${k}b)"/><circle cx="${x}" cy="${y}" r="15" fill="#0c1220" stroke="${ring}" stroke-width="3"/><g transform="translate(${x} ${y})">${glyph}</g>`;
  const unitsX = [150, 193, 236, 280, 360, 440, 500, 560, 625];
  const awn = ['#ff4fb0', '#4aff9a', '#ffd21f', '#f2c230', '#ff3b3b', '#2f9aff', '#ff8a1f', '#c08aff'];
  const body =
    `<rect width="800" height="600" fill="#0c1424"/><g fill="#121d33">${[[60, 58, 680, 360], [60, 446, 680, 94], [0, 58, 40, 482], [760, 58, 40, 482], [60, 0, 680, 40], [60, 558, 680, 42]].map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`).join('')}</g>` +
    // streets
    `<g fill="#263552"><rect x="40" width="20" height="600"/><rect x="740" width="20" height="600"/><rect y="40" width="800" height="18"/><rect y="540" width="800" height="18"/><rect y="416" width="800" height="32"/><rect x="140" y="58" width="12" height="358" opacity=".7"/></g>` +
    `<path d="M0 432H800" stroke="#f2c230" stroke-width="2" stroke-dasharray="14 12" opacity=".8"/><path d="M50 0V600M750 0V600M0 49H800M0 549H800" stroke="#5a6a8a" stroke-width="1" stroke-dasharray="8 10" opacity=".6"/>` +
    `<g fill="#1c2a44" stroke="#2c3e60" stroke-width="1">${houses}</g>` +
    // condos (Willow Run Villas)
    `<g fill="#3a4a6a" stroke="#6a7ea8" stroke-width="1.500"><rect x="68" y="108" width="28" height="22"/><rect x="100" y="100" width="34" height="22"/><rect x="72" y="140" width="34" height="22"/><rect x="110" y="134" width="24" height="30"/><rect x="70" y="172" width="60" height="18"/></g><path d="M66 196Q100 206 136 196" stroke="#2f6a4a" stroke-width="6" fill="none" opacity=".7"/>` +
    // lot + lamps
    `<rect x="152" y="104" width="496" height="100" fill="#1b2130"/><rect x="644" y="160" width="92" height="256" fill="#1b2130"/><rect x="152" y="300" width="408" height="116" fill="#161b28"/><path d="${stalls}" stroke="#8a93a8" stroke-width="1.200" opacity=".55"/>` +
    lamp(250, 148) + lamp(400, 148) + lamp(550, 148) + lamp(692, 250) + lamp(692, 360) + lamp(300, 360, 'l', 34) +
    // fire lane
    `<path d="M150 198H632V402" fill="none" stroke="#ffd21f" stroke-width="8" stroke-dasharray="10 6"/>` +
    // the L-shaped plaza
    `<path d="M146 209H629V391H564V304H146Z" fill="#000" opacity=".5" transform="translate(5 6)" filter="url(#${k}b)"/><path d="M150 205H625V387H560V300H150Z" fill="#46526e" stroke="#8a98b8" stroke-width="2"/><path d="M150 205H625V387H560V300H150Z" fill="none" stroke="#2a3450" stroke-width="1" transform="translate(0 0)"/>` +
    unitsX.slice(0, 8).map((x, i) => `<rect x="${x + 2}" y="200" width="${unitsX[i + 1] - x - 4}" height="7" fill="${awn[i]}"/>` + (i ? `<path d="M${x} 207V300" stroke="#2a3450" stroke-width="1.500"/>` : '') + tx((x + unitsX[i + 1]) / 2 - (i === 4 ? 26 : 0), 223, 11, String(i + 1), '#dfe6f6', SANS, `${BOLD} ${MID}`)).join('') +
    [9, 10, 11, 12, 13].map((u, i) => { const y = 237 + i * 30; return `<path d="M560 ${y}H625" stroke="#2a3450" stroke-width="1.500"/><rect x="623" y="${y + 2}" width="7" height="26" fill="${awn[(i + 3) % 8]}"/>` + tx(612, y + 19, 10, String(u), '#dfe6f6', SANS, `${BOLD} ${MID}`); }).join('') +
    `<g fill="#8a93a8"><rect x="210" y="262" width="12" height="9"/><rect x="470" y="250" width="14" height="10"/><rect x="530" y="270" width="12" height="9"/><rect x="584" y="350" width="12" height="9"/><rect x="250" y="240" width="10" height="8"/></g>` +
    `<g fill="#2f6a4a"><rect x="200" y="310" width="24" height="12" rx="2"/><rect x="470" y="310" width="24" height="12" rx="2"/></g>` + lamp(320, 200, 'e', 26) + lamp(592, 312, 'n', 30) +
    // lodge
    `<path d="M652 84H736V156H652Z" fill="#1f3a2a"/><rect x="662" y="98" width="56" height="42" fill="#6a4a2a" stroke="#a8824a" stroke-width="2"/><path d="M662 119H718" stroke="#4a3018" stroke-width="2"/>` +
    // laundromat + sheriff
    `<rect x="322" y="458" width="92" height="46" fill="#3a5a7a" stroke="#8ac8ff" stroke-width="2"/>` + lamp(368, 470, 'l', 30) + `<rect x="112" y="452" width="96" height="50" fill="#4a4a5a" stroke="#a8a8c0" stroke-width="2"/><rect x="180" y="476" width="28" height="26" fill="#33333f" stroke="#a8a8c0" stroke-width="1.500"/><path d="M185 480V498M191 480V498M197 480V498M203 480V498" stroke="#a8a8c0" stroke-width="1.200"/>` +
    // pins
    pin(320, 276, GOLD, `<path d="M-10 -3H10V3H-10Z" fill="${GOLD}"/><path d="M-3 -5H3V5H-3ZM-2 4L-6 11H-2L1 4ZM2 4L6 10H2L0 4Z" fill="${GOLD}" stroke="#0c1220" stroke-width="1"/>`) +
    pin(400, 276, '#ff3b3b', ball(-5, 2, 5, '#ff3b3b') + ball(5, 3, 5, '#2f7dff') + ball(0, -5, 5, '#ffd21f')) +
    `<rect x="389" y="217" width="22" height="22" fill="#0c1220" stroke="#bfe6ff" stroke-width="2.500"/><rect x="394" y="222" width="12" height="12" fill="#ffd21f"/><path d="M389 217l-7-5h22l7 5" fill="#8a98b8" stroke="#bfe6ff" stroke-width="1.500"/>` +
    pin(592, 312, '#ff4fb0', lotus(0, 2, 0.34)) +
    pin(368, 480, '#8ac8ff', `<rect x="-8" y="-9" width="16" height="18" rx="2" fill="#dfe6f6"/><circle cx="0" cy="2" r="5" fill="#2f7dff" stroke="#0c1220" stroke-width="1.500"/><circle cx="-4.500" cy="-6" r="1.200" fill="#0c1220"/>`) +
    pin(688, 120, '#c9a05a', `<path d="M0 8V-2M0 -2Q-10 -2 -10 -10M-6 -3V-9M0 -2Q10 -2 10 -10M6 -3V-9M-3 -2V-7M3 -2V-7" stroke="#e8c88a" stroke-width="2.200" fill="none" stroke-linecap="round"/>`) +
    pin(112, 132, '#8a98b8', `<path d="M-9 8V-3L-4 -8L1 -3V8ZM2 8V-1L6 -5L10 -1V8Z" fill="#dfe6f6"/><rect x="-6" y="0" width="3" height="4" fill="#0c1220"/><rect x="5" y="2" width="3" height="3" fill="#0c1220"/>`) +
    pin(160, 468, '#ffd21f', sparkle(0, 0, 0, '#000') + `<path d="M0 -10L2.900 -3.200L10 -3.200L4.200 1.200L6.200 8.400L0 4.200L-6.200 8.400L-4.200 1.200L-10 -3.200L-2.900 -3.200Z" fill="#ffd21f"/>`) +
    // compass + scale
    `<g transform="translate(92 366)" opacity=".85"><circle r="16" fill="none" stroke="#8a98b8" stroke-width="1.500"/><path d="M0 -13L4 0H-4Z" fill="#ff5a4a"/><path d="M0 13L4 0H-4Z" fill="#8a98b8"/>` + tx(0, -21, 11, 'N', '#8a98b8', SERIF, `${BOLD} ${MID}`) + `</g>` +
    `<path d="M610 520H710M610 515V525M660 516V524M710 515V525" stroke="#8a98b8" stroke-width="1.500" fill="none"/>` + tx(660, 510, 10, '50 m', '#8a98b8', SERIF, `${BOLD} ${MID}`) +
    `<rect x="8" y="8" width="784" height="584" fill="none" stroke="#3a4a6a" stroke-width="2"/>`;
  return frame(k, 800, 600, defs, body, 0.12, 0.45);
})();
