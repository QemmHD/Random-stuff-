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
  const PX = 200;
  /** One draped belt. n stripes of colour `tape` on the long (right) tail, counted up from its end. */
  const belt = (py: number, c: string, dark: string, tape: string, n: number, l1: number, extra = ''): string => {
    let st2 = '';
    for (let i = 0; i < n; i++) st2 += `<rect x="3" y="${159 - i * 19}" width="52" height="11" fill="${tape}"/>`;
    return `<g transform="translate(${PX} ${py})"><g transform="scale(1.25 1)"><path d="M-58 14Q-60 -26 0 -26Q60 -26 58 14Z" fill="#000" opacity=".45" filter="url(#${k}f)" transform="translate(8 10)"/>` +
      `<g transform="rotate(4)"><rect x="-47" y="6" width="52" height="${l1}" fill="#000" opacity=".4" filter="url(#${k}f)"/><rect x="-55" y="0" width="52" height="${l1}" fill="${c}"/><rect x="-55" y="0" width="52" height="${l1}" fill="url(#${k}g)"/><path d="M-51 0V${l1}M-7 0V${l1}" stroke="${dark}" stroke-width="1.500" stroke-dasharray="4 3"/>${extra}</g>` +
      `<g transform="rotate(-4)"><rect x="11" y="6" width="52" height="180" fill="#000" opacity=".4" filter="url(#${k}f)"/><rect x="3" y="0" width="52" height="180" fill="${c}"/><path d="M7 0V180M51 0V180" stroke="${dark}" stroke-width="1.500" stroke-dasharray="4 3"/>${st2}<rect x="3" y="0" width="52" height="180" fill="url(#${k}g)"/></g>` +
      `<path d="M-57 8Q-58 -24 0 -24Q58 -24 57 8Q30 -4 0 -4Q-30 -4 -57 8Z" fill="${c}"/><path d="M-57 8Q-58 -24 0 -24Q58 -24 57 8Q30 -4 0 -4Q-30 -4 -57 8Z" fill="#000" opacity=".22"/></g>` +
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
    for (let i = 0; i < n; i++) { const bw = 14 + q() * 22, bh = 12 + q() * 16; houses += `<rect x="${Math.round(x + q() * (w - bw))}" y="${Math.round(y + q() * (h - bh))}" width="${Math.round(bw)}" height="${Math.round(bh)}"/>`; }
  };
  blk(66, 250, 70, 150, 4); blk(250, 462, 60, 70, 2); blk(440, 462, 290, 70, 6); blk(180, 62, 440, 36, 5);
  blk(0, 70, 34, 460, 3); blk(766, 70, 34, 460, 3); blk(60, 566, 680, 30, 4); blk(60, 0, 680, 30, 4);
  const lamp = (x: number, y: number, g = 'l', r = 46): string => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${k}${g})"/>`;
  const pin = (x: number, y: number, ring: string, glyph: string): string =>
    `<circle cx="${x}" cy="${y}" r="15" fill="#0c1220" stroke="${ring}" stroke-width="3"/><g transform="translate(${x} ${y})">${glyph}</g>`;
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
    `<rect x="152" y="104" width="496" height="100" fill="#1b2130"/><rect x="644" y="160" width="92" height="256" fill="#1b2130"/><rect x="152" y="300" width="408" height="116" fill="#161b28"/><path d="M170 124H640M170 171H640" stroke="#8a93a8" stroke-width="24" stroke-dasharray="1.200 18.800" opacity=".55"/><path d="M675 176V404M711 176V404" stroke="#8a93a8" stroke-width="22" stroke-dasharray="1.200 18.800" opacity=".55"/>` +
    lamp(250, 148) + lamp(400, 148) + lamp(550, 148) + lamp(692, 250) + lamp(692, 360) + lamp(300, 360, 'l', 34) +
    // fire lane
    `<path d="M150 198H632V402" fill="none" stroke="#ffd21f" stroke-width="8" stroke-dasharray="10 6"/>` +
    // the L-shaped plaza
    `<path d="M146 209H629V391H564V304H146Z" fill="#000" opacity=".5" transform="translate(5 6)" filter="url(#${k}b)"/><path d="M150 205H625V387H560V300H150Z" fill="#46526e" stroke="#8a98b8" stroke-width="2"/>` +
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
    pin(160, 468, '#ffd21f', `<path d="M0 -10L2.900 -3.200L10 -3.200L4.200 1.200L6.200 8.400L0 4.200L-6.200 8.400L-4.200 1.200L-10 -3.200L-2.900 -3.200Z" fill="#ffd21f"/>`) +
    `<path d="M610 520H710M610 515V525M710 515V525" stroke="#8a98b8" stroke-width="1.500" fill="none"/>` + tx(660, 510, 10, '50 m', '#8a98b8', SERIF, `${BOLD} ${MID}`) +
    `<rect x="8" y="8" width="784" height="584" fill="none" stroke="#3a4a6a" stroke-width="2"/>`;
  return frame(k, 800, 600, defs, body, 0.12, 0.45);
})();

// ════════════════════════════════════════════════════════════════ PHOTOS
const flower = (x: number, y: number, c: string, r = 4): string =>
  `<g fill="${c}"><circle cx="${x}" cy="${y - r}" r="${r}"/><circle cx="${x + r}" cy="${y}" r="${r}"/><circle cx="${x - r}" cy="${y}" r="${r}"/><circle cx="${n1(x + r * 0.6)}" cy="${y + r}" r="${r}"/><circle cx="${n1(x - r * 0.6)}" cy="${y + r}" r="${r}"/></g><circle cx="${x}" cy="${y}" r="${n1(r / 2)}" fill="#ffe14a"/>`;
const ALOHA = flower(-26, 30, '#ff4f9a') + flower(22, 50, '#fff') + flower(-12, 78, '#ffd21f') + flower(26, 100, '#ff4f9a') + flower(-28, 112, '#fff') + `<path d="M-14 -6L0 22L14 -6Z" fill="#00000030"/>`;
const RON_HAIR = `<path d="M-22 -58C-22 -90 22 -90 22 -58C18 -74 8 -78 -4 -76C-14 -74 -20 -68 -22 -58Z" fill="#d8ac62"/>`;
const RON_TAN = `<ellipse cx="-9" cy="-54" rx="9" ry="6" fill="#ffd0b0" opacity=".85"/><ellipse cx="9" cy="-54" rx="9" ry="6" fill="#ffd0b0" opacity=".85"/>`;
const NEON = '#c6ff1a';
/** Bachelor shirt print, exact text, in figure-local units. */
const BACH = tx(0, 34, 12, 'BACHELOR PARTY', '#111', IMPACT, `${MID} ${fit(64)}`) + tx(0, 52, 18, 'STAFF', '#e0106a', IMPACT, `${MID} ${fit(50)}`) +
  tx(0, 68, 9.5, '— WHAT HAPPENS AT', '#111', IMPACT, `${MID} ${fit(62)}`) + tx(0, 84, 12, 'SILVER HOLLOW…', '#111', IMPACT, `${MID} ${fit(64)}`);
const RONNIE: Fig = { skin: '#f08a68', shade: '#c0503a', shirt: NEON, sx: 1.14, hair: RON_HAIR, pre: BACH, eyes: RON_TAN + EYES, face: GRIN };
const CROWN = `<path d="M-24 -72L-26 -100L-13 -84L-6 -104L0 -84L8 -104L14 -84L26 -100L24 -72Q0 -80 -24 -72Z" fill="#ffd21f" stroke="#c08a00" stroke-width="1.500"/><circle cx="0" cy="-80" r="3" fill="#e0281c"/>`;
const BRENDA: Fig = {
  skin: '#dca680', shade: '#9a6a50', shirt: '#ff6a1f', sx: 1.1, pre: ALOHA,
  hair: `<path d="M-22 -56C-23 -88 23 -88 22 -56C18 -72 10 -77 0 -77C-10 -77 -18 -72 -22 -56Z" fill="#a4a8ae"/>`,
  under: '',
  eyes: `<path d="M-19 -40L-17 -24Q-12 -15 0 -15Q12 -15 17 -24L19 -40Z" fill="#dca680"/><ellipse cx="-9" cy="-54" rx="2.600" ry="2.400" fill="#1a1210"/><ellipse cx="9" cy="-54" rx="2.600" ry="2.400" fill="#1a1210"/><path d="M-16 -61l12 3M16 -61l-12 3" stroke="#6e7278" stroke-width="3" fill="none"/>`,
  face: `<path d="M-8 -31Q2 -30 10 -36" stroke="#5a2a20" stroke-width="2.600" fill="none"/>`,
};
const COP_HAT = `<ellipse cx="0" cy="-74" rx="36" ry="7" fill="#5a4426"/><path d="M-20 -75Q-20 -100 0 -100Q20 -100 20 -75Z" fill="#6e5632"/><path d="M-20 -79H20" stroke="#2a1e0e" stroke-width="4"/>`;
const COP_PRE = `<path d="M-12 -6L0 14L12 -6Z" fill="#00000030"/><path d="M0 14V130" stroke="#8a7240" stroke-width="2"/><path d="M-26 24l5 9 9 1-7 7 2 10-9-5-9 5 2-10-7-7 9-1z" fill="#ffd21f" stroke="#a87a00" stroke-width="1"/><rect x="-37" y="112" width="74" height="12" fill="#2a1e0e"/><rect x="-6" y="110" width="12" height="16" fill="#c9a23a"/>`;

A.c8_ph_dojo = ((): string => {
  const k = 'c8_ph_dojo';
  const defs =
    lg(`${k}w`, [[0, '#efe6cf'], [1, '#cfc09a']]) + lg(`${k}m`, [[0, '#a9d8f0'], [0.6, '#6a9ad0'], [1, '#3a5aa0']], 1, 1) + lg(`${k}f`, [[0, '#3f8ae8'], [1, '#16388a']]) +
    rg(`${k}d`, [[0, '#1a140c'], [0.7, '#5a4a34'], [1, '#bfae88']]) + bl(`${k}b`, 8) + rimF(`${k}r`, '#fff3b0', 4, 2, '#001040', 0.5) + `<clipPath id="${k}c"><rect x="30" y="170" width="440" height="230"/></clipPath>`;
  const body =
    `<rect width="800" height="420" fill="url(#${k}w)"/><rect width="800" height="26" fill="#b9b3a2"/><g fill="#fffff0"><rect x="120" y="4" width="200" height="16"/><rect x="480" y="4" width="200" height="16"/></g>` +
    banner(40, 34, 640, -0.8) +
    `<rect x="22" y="162" width="456" height="246" fill="#8a8f9a"/><rect x="30" y="170" width="440" height="230" fill="url(#${k}m)"/><g clip-path="url(#${k}c)"><path d="M60 170L150 400H210L120 170ZM300 170L390 400H410L320 170Z" fill="#fff" opacity=".2"/><rect x="30" y="350" width="440" height="50" fill="#2a4a9a" opacity=".7"/>` +
    `<g opacity=".6"><rect x="118" y="250" width="56" height="150" rx="20" fill="#7a2a1a"/><circle cx="146" cy="226" r="26" fill="#9a4a30"/></g></g>` +
    // rank poster
    `<g transform="rotate(1.500 640 220)"><rect x="500" y="160" width="286" height="128" fill="#000" opacity=".3" filter="url(#${k}b)"/><rect x="496" y="154" width="286" height="128" fill="#fffdf2" stroke="#1a1a22" stroke-width="3"/>` +
    [['#f4f1e6', 510], ['#ffd21f', 578], ['#7a4420', 646], ['#0d0d12', 714]].map(([c, x]) => `<rect x="${x}" y="164" width="56" height="16" fill="${c}" stroke="#1a1a22" stroke-width="1.500"/>`).join('') +
    tx(639, 220, 31, 'WHITE → YELLOW →', '#15151a', IMPACT, `${MID} ${fit(262)}`) + tx(639, 262, 31, 'BROWN → BLACK', '#15151a', IMPACT, `${MID} ${fit(214)}`) + `</g>` +
    // the dent
    `<ellipse cx="716" cy="344" rx="34" ry="30" fill="url(#${k}d)"/><path d="M716 314l-6-26 10 8 6-18M748 334l24-12-6 14 20 4M740 366l18 18M690 366l-16 20 4-22-20 2M684 330l-22-10" fill="none" stroke="#6a5a40" stroke-width="2"/>` +
    `<g transform="rotate(-6 760 420)"><rect x="716" y="386" width="74" height="26" fill="#ffe94a"/>` + tx(753, 404, 13, 'not a fist', '#3a3210', HAND, `${MID} ${fit(62)}`) + `</g>` +
    // fountain
    `<rect x="520" y="316" width="96" height="60" rx="6" fill="#b9bec8" stroke="#6a7080" stroke-width="2"/><rect x="528" y="322" width="80" height="14" rx="4" fill="#7a8090"/><path d="M590 320q-22-30-40 0" fill="none" stroke="#9fe0ff" stroke-width="3"/><rect x="586" y="312" width="10" height="10" fill="#6a7080"/><rect x="540" y="376" width="56" height="44" fill="#9aa0ac"/>` +
    // mats
    `<path d="M0 408H800V600H0Z" fill="url(#${k}f)"/><path d="M0 408H800V424H0Z" fill="#e0281c"/><g stroke="#0c2466" stroke-width="2.500" opacity=".7"><path d="M0 460H800M0 520H800M400 424V600M250 424L160 600M550 424L640 600M100 424L-80 600M700 424L880 600"/></g>` +
    // training dummy in a headband
    `<ellipse cx="170" cy="560" rx="90" ry="16" fill="#000" opacity=".4" filter="url(#${k}b)"/>` +
    pop(`${k}r`, `<path d="M118 560Q112 500 130 470H210Q228 500 222 560Z" fill="#17151f"/><path d="M128 470Q104 380 128 330H212Q236 380 212 470Z" fill="#c8623a"/><path d="M150 334V300H190V334Z" fill="#b0522c"/><path d="M138 266C138 214 202 214 202 266C202 292 190 308 170 308C150 308 138 292 138 266Z" fill="#c8623a"/>` +
      `<path d="M138 250Q170 240 202 250V264Q170 254 138 264Z" fill="#0a0a0c"/><path d="M152 256Q170 251 188 256" stroke="#fff" stroke-width="3" stroke-dasharray="4 2" fill="none"/><path d="M152 276h10M178 276h10M160 292h20" stroke="#6a2a14" stroke-width="3" stroke-linecap="round"/><path d="M146 380q24 10 48 0M150 420q20 8 40 0" stroke="#8a3a1c" stroke-width="3" fill="none"/>`) +
    `<rect width="800" height="600" fill="#fff8d0" opacity=".06"/>`;
  return frame(k, 800, 600, defs, body, 0.14, 0.4);
})();

A.c8_ph_belts = ((): string => {
  const k = 'c8_ph_belts';
  const defs = lg(`${k}w`, [[0, '#d9b98a'], [1, '#a8824e']], 1, 1) + lg(`${k}g`, [[0, '#fff', 0.5], [0.3, '#fff', 0.05], [0.7, '#fff', 0], [1, '#fff', 0.3]]) + bl(`${k}b`, 9) + lg(`${k}c`, [[0, '#c69a5a'], [1, '#8a6430']]);
  const slv = (rot: number, open = false): string =>
    `<g transform="translate(250 360) rotate(${rot})"><rect x="26" y="-24" width="400" height="60" fill="#000" opacity=".35" filter="url(#${k}b)"/><rect x="30" y="-22" width="380" height="44" fill="#0b0b10"/><path d="M30 -17H410M30 17H410" stroke="#3a3a46" stroke-width="1.500" stroke-dasharray="5 3"/>` +
    tx(220, 7, 20, '10th DAN GRANDMASTER', GOLD, SERIF, `${BOLD} ${MID} ${fit(300)}`) +
    (open ? '' : `<rect x="16" y="-30" width="408" height="60" rx="4" fill="#dff0ff" fill-opacity=".14" stroke="#fff" stroke-opacity=".7" stroke-width="1.500"/><rect x="16" y="-30" width="408" height="60" rx="4" fill="url(#${k}g)" opacity=".5"/>`) + `</g>`;
  const body =
    `<rect width="800" height="600" fill="url(#${k}w)"/><g stroke="#8a6430" stroke-width="2" opacity=".35"><path d="M0 90Q400 60 800 110M0 250Q400 290 800 240M0 470Q400 430 800 500M0 560Q400 590 800 550"/></g>` +
    // box
    `<g transform="rotate(8 640 150)"><rect x="500" y="20" width="300" height="250" fill="#000" opacity=".35" filter="url(#${k}b)"/><path d="M490 10H790V250H490Z" fill="#5a3e1c"/><path d="M490 10L440 -20H740L790 10ZM490 250L450 290H750L790 250Z" fill="url(#${k}c)"/><path d="M790 10L840 40V280L790 250Z" fill="#a47a40"/><rect x="506" y="26" width="268" height="208" fill="#3a2810"/>` +
    `<g fill="#e8f4ff" opacity=".5">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<circle cx="${530 + (i % 4) * 66}" cy="${70 + Math.floor(i / 4) * 80}" r="26"/>`).join('')}</g>` + tx(520, 284, 16, 'FRAGILE (NOT REALLY)', '#5a3e1c', IMPACT, fit(170)) + `</g>` +
    slv(-62) + slv(-46) + slv(-30) + slv(-14) + slv(2) +
    // the opened one, label showing
    `<g transform="translate(40 468) rotate(-5)"><rect x="6" y="6" width="470" height="52" fill="#000" opacity=".35" filter="url(#${k}b)"/><rect width="470" height="48" fill="#0b0b10"/><path d="M0 5H470M0 43H470" stroke="#3a3a46" stroke-width="1.500" stroke-dasharray="5 3"/><rect width="470" height="48" fill="url(#${k}g)" opacity=".35"/>` +
    tx(330, 32, 21, '10th DAN GRANDMASTER', GOLD, SERIF, `${BOLD} ${MID} ${fit(250)}`) + `</g>` + careLabel(34, 474, 250, -5) +
    `<path d="M300 560q60 30 130 6l-8 26q-60 14-120-8z" fill="#dff0ff" fill-opacity=".25" stroke="#fff" stroke-opacity=".6"/>` +
    // packing slip
    `<g transform="translate(446 330) rotate(4)"><rect x="6" y="8" width="340" height="170" fill="#000" opacity=".3" filter="url(#${k}b)"/><rect width="340" height="170" fill="#fffef6"/><rect width="340" height="40" fill="#e0281c"/>` +
    tx(170, 29, 25, 'KARATEKING WHOLESALE', '#fff', IMPACT, `${MID} ${fit(310)}`) + tx(14, 62, 12, 'PACKING SLIP · ORDER SHIPPED', '#6a6a70', MONO, `${BOLD} ${fit(220)}`) +
    tx(170, 94, 19, '— 10th DAN GRANDMASTER BLACK BELT', '#15151a', SANS, `${BOLD} ${MID} ${fit(316)}`) + tx(170, 128, 26, '× 6 — $8.99 ea', '#15151a', SANS, `${BOLD} ${MID} ${fit(210)}`) +
    `<path d="M14 142H326" stroke="#b9b6a8" stroke-width="1.500" stroke-dasharray="4 3"/>` + tx(14, 160, 11, 'NO RETURNS. YOU KNOW WHAT YOU DID.', '#6a6a70', MONO, `${BOLD} ${fit(260)}`) + `</g>`;
  return frame(k, 800, 600, defs, body, 0.14, 0.4);
})();

A.c8_ph_hoodie = ((): string => {
  const k = 'c8_ph_hoodie';
  const defs = lg(`${k}s`, [[0, '#5ab4f0'], [1, '#e8f4d8']]) + lg(`${k}a`, [[0, '#b8b4aa'], [1, '#77746c']]) + rimF(`${k}r`, '#fffbd0', 5, 3, '#2a2010', 0.45) + bl(`${k}b`, 8) + lg(`${k}c`, [[0, '#35c46a'], [1, '#137a3a']]);
  const body =
    `<rect width="600" height="330" fill="url(#${k}s)"/><circle cx="520" cy="60" r="90" fill="#fffbe0" opacity=".5" filter="url(#${k}b)"/>` +
    // strip mall across the lot
    `<rect y="196" width="600" height="110" fill="#e8d2a8"/><rect y="190" width="600" height="14" fill="#c05a3a"/><rect y="232" width="600" height="8" fill="#b89a6a"/>` +
    `<rect x="20" y="206" width="150" height="24" fill="#ffd21f"/>` + tx(95, 224, 15, 'TAX · BAIL · TANS', '#111', IMPACT, `${MID} ${fit(130)}`) +
    `<rect x="330" y="198" width="256" height="40" fill="#0d0c12" stroke="#ff4fb0" stroke-width="3"/>` + lotus(358, 219, 0.5, '#fff') + tx(470, 228, 28, 'IRON LOTUS', '#fff', IMPACT, `${MID} ${fit(180)}`) +
    `<g fill="#3a4a5a"><rect x="24" y="246" width="100" height="60"/><rect x="160" y="246" width="110" height="60"/><rect x="290" y="246" width="100" height="60"/><rect x="430" y="246" width="150" height="60"/></g>`+
    `<rect y="306" width="600" height="494" fill="url(#${k}a)"/><g stroke="#f4f0e0" stroke-width="5" opacity=".7"><path d="M40 330L-60 800M240 330L190 560M400 330L470 800M560 330L700 600"/></g>` +
    // hatchback
    `<ellipse cx="470" cy="600" rx="170" ry="20" fill="#000" opacity=".4" filter="url(#${k}b)"/>` +
    pop(`${k}r`, `<path d="M340 590V450Q340 430 356 424L380 350Q386 336 402 336H540Q556 336 562 350L586 424Q600 430 600 450V590Z" fill="url(#${k}c)"/><path d="M394 356Q398 348 408 348H534Q544 348 548 356L568 420H374Z" fill="#1c2a3a"/><path d="M394 356L420 420H374Z" fill="#fff" opacity=".12"/>` +
      `<rect x="412" y="366" width="118" height="42" rx="3" fill="#fff" transform="rotate(-2 470 386)"/><rect x="346" y="446" width="50" height="24" rx="6" fill="#e0281c"/><rect x="546" y="446" width="50" height="24" rx="6" fill="#e0281c"/><rect x="430" y="480" width="82" height="30" fill="#f4f0e0" stroke="#333" stroke-width="2"/><rect x="340" y="540" width="260" height="22" fill="#2a2a30"/><rect x="352" y="560" width="50" height="50" rx="8" fill="#15151a"/><rect x="540" y="560" width="50" height="50" rx="8" fill="#15151a"/>`) +
    `<g transform="rotate(-2 470 386)">` + tx(471, 384, 15, '🐾 PAWS & CLAWS', '#157a3a', SANS, `${BOLD} ${MID} ${fit(104)}`).replace('🐾 ', '') + tx(471, 401, 13, 'PET SUPPLY', '#e0281c', SANS, `${BOLD} ${MID} ${fit(84)}`) + `</g>` +
    tx(471, 502, 16, 'B1RD MAN', '#222', MONO, `${BOLD} ${MID} ${fit(66)}`) +
    // Corey + hoodie
    `<ellipse cx="250" cy="780" rx="150" ry="18" fill="#000" opacity=".4" filter="url(#${k}b)"/>` +
    pop(`${k}r`, fig(262, 262, 1.3, { ...COREY, legs: '#c8b48a', la: [-96, 26, -112, 44], ra: [84, 52, 150, 10],
      over: `<rect x="143" y="-22" width="13" height="26" rx="6.500" fill="#f0c8ac"/><rect x="140" y="0" width="22" height="22" rx="8" fill="#f0c8ac"/>` }) +
      `<g transform="rotate(7 150 318)"><path d="M150 312Q250 296 344 318L402 470L356 488L330 420L336 660H160L166 420L140 488L96 470Z" fill="#101016"/><path d="M196 310Q246 250 300 312Q250 352 196 310Z" fill="#1c1c26"/><path d="M214 312Q248 280 284 314" fill="none" stroke="#000" stroke-width="5"/><path d="M236 330v50M260 330v46" stroke="#e8e8f0" stroke-width="3"/><path d="M190 570H306V616H190Z" fill="none" stroke="#2a2a36" stroke-width="3"/>` +
      lotus(248, 430, 1.7) + tx(248, 500, 38, 'IRON LOTUS', '#fff', IMPACT, `${MID} ${fit(156)}`) + tx(248, 532, 22, 'MARTIAL ARTS', '#fff', IMPACT, `${MID} ${fit(156)}`) + `</g>` +
      `<circle cx="150" cy="318" r="15" fill="#f0c8ac"/>`) +
    `<rect width="600" height="800" fill="#fff4c0" opacity=".08"/>`;
  return frame(k, 600, 800, defs, body, 0.12, 0.3);
})();

A.c8_ph_arrest = ((): string => {
  const k = 'c8_ph_arrest';
  const defs =
    lg(`${k}s`, [[0, '#060a1c'], [1, '#1a1e3a']]) + lg(`${k}g`, [[0, '#1f4a2a'], [1, '#0a1c10']]) + rg(`${k}R`, [[0, '#ff1a2a', 0.75], [1, '#ff1a2a', 0]]) + rg(`${k}B`, [[0, '#2a5aff', 0.8], [1, '#2a5aff', 0]]) +
    rg(`${k}f`, [[0, '#ffd04a', 0.9], [0.4, '#ff7a1a', 0.5], [1, '#ff7a1a', 0]]) + rimF(`${k}r`, '#ff4a5a', 5, 2) + bl(`${k}b`, 8) + lg(`${k}w`, [[0, '#9a6a36'], [1, '#6a4420']]);
  const cop = (x: number, y: number, s: number, o: Partial<Fig>): string => fig(x, y, s, { skin: '#e8b890', shade: '#a87a5a', shirt: '#c9aa66', long: true, legs: '#5a4a2a', pre: COP_PRE, hat: COP_HAT, ...o });
  const body =
    `<rect width="800" height="330" fill="url(#${k}s)"/>` +
    `<path d="M420 330V210L540 150L660 210V330Z" fill="#2a1c12"/><rect x="560" y="236" width="40" height="50" fill="#ffc04a"/>` +
    `<rect y="320" width="800" height="280" fill="url(#${k}g)"/>` +
    // pig roast
    `<g transform="translate(110 -16)"><circle cx="540" cy="318" r="90" fill="url(#${k}f)"/><path d="M486 340L500 290M594 340L580 290M480 296H600" stroke="#2a1c12" stroke-width="5"/><ellipse cx="540" cy="296" rx="40" ry="17" fill="#d8744a"/><circle cx="582" cy="294" r="12" fill="#d8744a"/><circle cx="592" cy="296" r="4" fill="#e0281c"/></g>` +
    // hedge + mower
    `<g fill="#0e2a16"><circle cx="660" cy="430" r="80"/><circle cx="760" cy="400" r="90"/><circle cx="740" cy="520" r="90"/></g>` +
    pop(`${k}r`, `<g transform="translate(60 10) rotate(-7 620 470)"><path d="M520 470Q520 420 560 416H660Q690 420 700 470V500H520Z" fill="#e0201c"/><path d="M540 416V374Q540 360 556 360H584V416Z" fill="#1a1a20"/><path d="M604 416L622 372" stroke="#1a1a20" stroke-width="7"/><ellipse cx="626" cy="368" rx="20" ry="7" fill="#1a1a20"/><rect x="640" y="430" width="50" height="14" fill="#ffd21f"/><circle cx="548" cy="504" r="34" fill="#15151a"/><circle cx="548" cy="504" r="13" fill="#ffd21f"/><circle cx="672" cy="512" r="24" fill="#15151a"/><circle cx="672" cy="512" r="9" fill="#ffd21f"/><rect x="576" y="500" width="76" height="18" fill="#8a1410"/></g>`) +
    `<g fill="#1a4a24"><circle cx="770" cy="450" r="50"/><circle cx="790" cy="550" r="60"/></g>` +
    // sign with antlers
    `<path d="M70 196V470M370 196V470" stroke="#4a2e14" stroke-width="16"/><g fill="none" stroke="#e8d8b0" stroke-width="9" stroke-linecap="round"><path d="M220 62Q150 60 130 6M176 54Q168 34 174 10M150 40Q134 30 122 34M220 62Q290 60 310 6M264 54Q272 34 266 10M290 40Q306 30 318 34"/></g>` +
    `<rect x="40" y="62" width="360" height="74" rx="8" fill="url(#${k}w)" stroke="#3a220c" stroke-width="4"/>` + tx(220, 114, 40, 'ANTLER LODGE #212', '#ffe9b0', SERIF, `${BOLD} ${MID} ${fit(330)}`) +
    `<rect x="56" y="146" width="328" height="50" fill="#fffef2" stroke="#3a220c" stroke-width="4"/>` + tx(220, 181, 30, '— PIG ROAST TONIGHT', '#15151a', IMPACT, `${MID} ${fit(300)}`) +
    // deputies and Brenda
    `<ellipse cx="330" cy="590" rx="250" ry="14" fill="#000" opacity=".5" filter="url(#${k}b)"/>` +
    pop(`${k}r`, cop(96, 340, 1.25, { ra: [56, 70, 20, 100], over: `<rect x="-10" y="86" width="36" height="26" fill="#fff"/>` }) +
      cop(250, 318, 1.34, { sx: 0.95, ra: [74, 40, 96, 78], la: [-48, 72, -40, 120],
        eyes: `<circle cx="-12" cy="-44" r="7" fill="#ff5a7a" opacity=".75"/><circle cx="12" cy="-44" r="7" fill="#ff5a7a" opacity=".75"/>` + EYES_WIDE,
        face: `<path d="M-6 -31q6-4 12 1" stroke="#3a1612" stroke-width="2.400" fill="none"/><path d="M26 -70q4 7 0 10q-4-3 0-10z" fill="#9fe0ff"/>` })) +
    pop(`${k}r`, fig(476, 318, 1.5, { ...BRENDA, legs: '#3a4a6a', hat: CROWN, la: [-52, 70, -9, 108], ra: [52, 70, 9, 108],
      over: `<g fill="none" stroke="#dfe6f0" stroke-width="4"><circle cx="-11" cy="100" r="9"/><circle cx="11" cy="100" r="9"/></g>` })) +
    `<rect width="800" height="600" fill="url(#${k}R)" style="mix-blend-mode:screen" transform="translate(-320 -40)"/><rect width="800" height="600" fill="url(#${k}B)" style="mix-blend-mode:screen" transform="translate(330 60)"/>`;
  return frame(k, 800, 600, defs, body, 0.18, 0.55);
})();

A.c8_ph_casino = ((): string => {
  const k = 'c8_ph_casino';
  const defs = lg(`${k}w`, [[0, '#3a0a1c'], [1, '#7a1a2a']]) + rg(`${k}t`, [[0, '#1fae5a'], [1, '#0a5a2c']]) + rimF(`${k}r`, '#fff06a', 5, 3) + rg(`${k}l`, [[0, '#ffe08a', 0.9], [1, '#ffe08a', 0]]);
  const q = rng(31);
  let lights = '';
  for (let i = 0; i < 1; i++) lights += `<circle cx="${Math.round(q() * 800)}" cy="${Math.round(100 + q() * 140)}" r="${Math.round(14 + q() * 22)}" fill="url(#${k}l)" opacity=".6"/>`;
  const dude = (x: number, y: number, skin: string, shade: string, hair: string, o: Partial<Fig> = {}): string =>
    fig(x, y, 1.25, { skin, shade, shirt: NEON, hair, face: GRIN, pre: `<path d="M-24 34H24M-22 66H22" stroke="#111" stroke-width="6"/><path d="M-14 50H14" stroke="#e0106a" stroke-width="8"/>`, ...o });
  const H = (c: string): string => `<path d="M-23 -52C-26 -92 26 -92 23 -52C19 -70 10 -76 0 -76C-10 -76 -19 -70 -23 -52Z" fill="${c}"/>`;
  const body =
    `<rect width="800" height="600" fill="url(#${k}w)"/>${lights}` +
    `<rect x="24" y="18" width="540" height="74" rx="10" fill="#14060c" stroke="#ffd21f" stroke-width="4"/>` + tx(294, 72, 46, 'SILVER HOLLOW CASINO', '#fff', IMPACT, `${MID} ${fit(500)} stroke="#4ad8ff" stroke-width="1.500"`) +
    // cashier cage + clock
    `<rect x="590" y="118" width="200" height="230" fill="#2a1408" stroke="#c9a23a" stroke-width="5"/><rect x="602" y="160" width="176" height="170" fill="#f6e6b0" opacity=".85"/><path d="M610 245H770" stroke="#c9a23a" stroke-width="170" stroke-dasharray="5 25"/>` + tx(690, 150, 22, 'CASHIER', '#ffd21f', IMPACT, `${MID} ${fit(110)}`) +
    `<rect x="594" y="14" width="192" height="84" rx="8" fill="#0a0a0c" stroke="#8a8a94" stroke-width="5"/>` + tx(690, 78, 66, '10:30', '#ff2a1a', MONO, `${BOLD} ${MID} ${fit(166)}`) +
    pop(`${k}r`, dude(84, 262, '#c98a5a', '#8a5a34', H('#1a1210')) + dude(206, 246, '#f0c8a8', '#b88a6a', H('#c8501c'), { eyes: EYES_SHUT }) +
      dude(560, 250, '#8a5a3a', '#5a3420', '') + dude(690, 272, '#f0c0a0', '#b08060', H('#e8d27a'), { eyes: EYES_WIDE, face: `<ellipse cx="0" cy="-30" rx="6" ry="8" fill="#4a0e0c"/>` }) +
      dude(470, 236, '#e0a878', '#a87048', H('#3a2a1c'), { eyes: EYES_SHUT }) +
      fig(340, 280, 2, { ...RONNIE, la: [-64, 70, -30, 112], ra: [80, 30, 104, -14], hand: 10,
        over: `<path d="M90 -62H122L114 -30Q106 -22 98 -30Z" fill="#ffb02a" stroke="#fff" stroke-width="2"/><circle cx="118" cy="-64" r="6" fill="#e0281c"/><path d="M100 -62L94 -80" stroke="#3bd66a" stroke-width="3"/>` })) +
    // dice table
    `<path d="M-20 600V490Q400 440 820 490V600Z" fill="#5a2a10"/><path d="M-20 600V508Q400 460 820 508V600Z" fill="url(#${k}t)"/><path d="M40 566Q400 516 760 566" fill="none" stroke="#fff" stroke-width="3" opacity=".5"/>` +
    [[520, 530, -14], [588, 512, 20]].map(([x, y, a]) => `<g transform="translate(${x} ${y}) rotate(${a})"><rect x="-17" y="-17" width="34" height="34" rx="6" fill="#e0281c" stroke="#fff" stroke-width="2"/><path d="M-7 -7h.1M7 7h.1M0 0h.1" stroke="#fff" stroke-width="7" stroke-linecap="round"/></g>`).join('') +
    `<ellipse cx="680" cy="558" rx="18" ry="8" fill="#ffd21f" stroke="#fff" stroke-width="2" stroke-dasharray="6 5"/>`;
  return frame(k, 800, 600, defs, body, 0.16, 0.5);
})();

A.c8_ph_shrimp = ((): string => {
  const k = 'c8_ph_shrimp';
  const defs = lg(`${k}w`, [[0, '#2a0a3a'], [1, '#6a1444']]) + lg(`${k}m`, [[0, '#ffd21f'], [1, '#e0681c']]) + rg(`${k}g`, [[0, '#4ad8ff', 0.6], [1, '#4ad8ff', 0]]) + rimF(`${k}r`, '#7ae8ff', -5, 2) + bl(`${k}b`, 9);
  const q = rng(77);
  let conf = '';
  for (let i = 0; i < 26; i++) { const x = Math.round(330 + q() * 230), y = Math.round(300 + q() * 90 - (q() > 0.6 ? 150 : 0)); conf += `<rect x="${x}" y="${y}" width="9" height="5" fill="${BALLC[i % 8]}" transform="rotate(${Math.round(q() * 180)} ${x} ${y})"/>`; }
  const body =
    `<rect width="600" height="800" fill="url(#${k}w)"/><g fill="#ffd21f" opacity=".25">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${i * 86 - 20} 640l30-20 30 20-30 20z"/><path d="M${i * 86 + 23} 720l30-20 30 20-30 20z"/>`).join('')}</g><rect y="600" width="600" height="200" fill="#000" opacity=".25"/>` +
    `<circle cx="180" cy="300" r="300" fill="url(#${k}g)"/>` +
    // slot machine
    `<rect x="24" y="40" width="300" height="760" rx="18" fill="#1a0a24" stroke="url(#${k}m)" stroke-width="8"/><path d="M40 60H308V150H40Z" fill="#e0106a"/>` + tx(174, 104, 34, 'SHRIMPLY', '#fff', IMPACT, `${MID} ${fit(210)}`) + tx(174, 138, 28, 'MILLIONS', '#ffd21f', IMPACT, `${MID} ${fit(170)}`) +
    `<rect x="44" y="168" width="260" height="290" rx="8" fill="#060c1c" stroke="#4ad8ff" stroke-width="4"/><rect x="54" y="178" width="240" height="76" fill="#0a1a34"/>` + tx(174, 236, 54, '1:31 AM', '#7ae8ff', MONO, `${BOLD} ${MID} ${fit(216)}`) +
    [0, 1, 2].map((i) => `<rect x="${58 + i * 80}" y="268" width="72" height="120" rx="6" fill="#fffef2"/>` + (i < 2 ? tx(94 + i * 80, 350, 76, '7', '#e0281c', IMPACT, MID) : `<path d="M250 300q34 4 26 44q-6 26-36 22q20-8 20-30q0-18-18-18z" fill="#ff8a6a" stroke="#c0503a" stroke-width="3"/><circle cx="246" cy="308" r="3" fill="#111"/>`)).join('') +
    tx(174, 432, 26, 'SO CLOSE!', '#ffd21f', IMPACT, `${MID} ${fit(150)}`) +
    `<rect x="44" y="476" width="260" height="70" rx="8" fill="#3a1a4a"/><circle cx="96" cy="511" r="24" fill="#e0281c" stroke="#fff" stroke-width="3"/><circle cx="174" cy="511" r="24" fill="#3bd66a" stroke="#fff" stroke-width="3"/><circle cx="252" cy="511" r="24" fill="#ffd21f" stroke="#fff" stroke-width="3"/><rect x="80" y="580" width="188" height="16" rx="8" fill="#060c1c"/>` +
    // stool + Ronnie
    `<ellipse cx="440" cy="786" rx="120" ry="12" fill="#000" opacity=".5" filter="url(#${k}b)"/><path d="M440 640V780M380 786H500" stroke="#8a8a94" stroke-width="14" stroke-linecap="round"/><ellipse cx="440" cy="640" rx="76" ry="18" fill="#e0281c"/>` +
    pop(`${k}r`, `<path d="M388 600L360 700L372 790H420L416 706L440 640L470 706L462 790H510L522 700L494 600Z" fill="#c8b48a"/>` +
      fig(446, 370, 1.9, { ...RONNIE, rot: 9, la: [-56, 64, -6, 84], ra: [56, 64, 22, 92], hand: 10, pre: tx(0, 34, 12, 'BACHELOR PARTY', '#111', IMPACT, `${MID} ${fit(64)}`) + tx(0, 52, 18, 'STAFF', '#e0106a', IMPACT, `${MID} ${fit(50)}`),
        eyes: RON_TAN + EYES_SHUT, face: `<ellipse cx="1" cy="-29" rx="8" ry="9" fill="#4a0e0c"/><path d="M-5 -36Q1 -39 7 -36" stroke="#fffdf6" stroke-width="3" fill="none"/><path d="M7 -22q4 10 1 18" stroke="#9fe0ff" stroke-width="3" fill="none"/>`,
        over: `<path d="M-14 56H30L22 92Q8 100 -6 92Z" fill="#fff" fill-opacity=".35" stroke="#fff" stroke-width="2"/><path d="M-11 66H27L22 90Q8 97 -6 90Z" fill="#d0201c"/><path d="M8 98V122M-8 124H24" stroke="#fff" stroke-width="3"/>` +
          [-14, 0, 14, 28].map((x) => `<path d="M${x} 58q-10-16 4-22q12 2 8 14q-2-8-8-6q-4 4 2 14z" fill="#ff9a7a" stroke="#c0503a" stroke-width="1.200"/>`).join('') }))+
    conf + `<g fill="#fff" ${IMPACT}><text x="520" y="250" font-size="30">z</text><text x="542" y="212" font-size="42">Z</text><text x="560" y="160" font-size="56">Z</text></g>`;
  return frame(k, 600, 800, defs, body, 0.18, 0.55);
})();

A.c8_ph_jax = ((): string => {
  const k = 'c8_ph_jax';
  const defs =
    ballPat(`${k}p`, 0.42, 5, 4, '#16206a') + lg(`${k}w`, [[0, '#ffe14a'], [1, '#ffb42a']]) + lg(`${k}r`, [[0, '#4a8aff'], [1, '#1c3aa8']]) + bl(`${k}b`, 8) + rg(`${k}g`, [[0, '#ff2a1a', 0.8], [1, '#ff2a1a', 0]]) +
    lg(`${k}s`, [[0, '#c9ced8'], [1, '#7a808c']]) + `<clipPath id="${k}c"><path d="M110 352H500L560 470H40Z"/></clipPath>`;
  const q = rng(41);
  let garland = '';
  for (let i = 0; i <= 20; i++) { const t = i / 20, x = 20 + t * 760, y = 128 + Math.sin(t * Math.PI * 3) * 22 + q() * 8; garland += `<circle cx="${n1(x)}" cy="${n1(y)}" r="${n1(15 + q() * 5)}" fill="${BALLC[i % 8]}"/>`; }
  let tiles = '';
  for (let i = 0; i < 9; i++) for (let j = 0; j < 3; j++) if ((i + j) % 2) tiles += `<path d="M${400 + (i - 4.5) * (90 + j * 40)} ${470 + j * 44}h${90 + j * 40}l${n1(20 * (i - 3.5))} 44h${-(130 + j * 40)}z" fill="${BALLC[(i + j * 3) % 8]}" opacity=".5"/>`;
  const body =
    `<rect width="800" height="600" fill="url(#${k}w)"/><path d="M0 0H800V96L0 96Z" fill="#eceae0"/><g stroke="#b9b6a8" stroke-width="2"><path d="M0 32H800M0 64H800M0 96H800M100 0L60 96M250 0L230 96M400 0V96M550 0L570 96M700 0L740 96"/></g>` +
    // ceiling hatch above the pit
    `<path d="M252 34H356L364 66H244Z" fill="#3a3e48" stroke="#15151a" stroke-width="4"/><path d="M262 40H346L350 60H258Z" fill="#5a606c"/><rect x="296" y="46" width="16" height="6" rx="3" fill="#15151a"/>` +
    `<g fill="#ff4fb0" opacity=".9"><path d="M40 190l14 30 32 4-24 22 6 32-28-16-28 16 6-32-24-22 32-4z" transform="translate(410 60) scale(.6)"/></g><path d="M0 300Q200 260 400 300T800 300V330Q600 300 400 330T0 330Z" fill="#23c0b0"/>` +
    `<g transform="rotate(-3 200 220)"><rect x="60" y="176" width="300" height="76" rx="12" fill="#e0281c" stroke="#fff" stroke-width="5"/>` + tx(210, 232, 50, "JUMPIN' JAX", '#ffd21f', IMPACT, `${MID} ${fit(264)} stroke="#111" stroke-width="1.500"`) + `</g>` + garland +
    // dome camera
    `<circle cx="488" cy="196" r="34" fill="url(#${k}g)"/><rect x="462" y="156" width="52" height="12" rx="3" fill="#dfe2e8"/><path d="M466 168H510Q510 196 488 196Q466 196 466 168Z" fill="#fff" stroke="#9aa0ac" stroke-width="2"/><path d="M474 170H502Q502 188 488 188Q474 188 474 170Z" fill="#23262e"/><circle cx="498" cy="184" r="4" fill="#ff2a1a"/>` +
    // floor
    `<rect y="340" width="800" height="260" fill="#e8dcc0"/>${tiles}` +
    // bounce castle
    `<ellipse cx="670" cy="476" rx="140" ry="16" fill="#000" opacity=".3" filter="url(#${k}b)"/><path d="M560 470V250H590V210H620V250H720V210H750V250H780V470Z" fill="#e0281c"/><path d="M590 210l15-40 15 40zM720 210l15-40 15 40z" fill="#ffd21f"/><path d="M596 470V330Q670 270 744 330V470Z" fill="#2f7dff"/><path d="M596 470V330Q670 270 744 330" fill="none" stroke="#ffd21f" stroke-width="10"/><rect x="552" y="440" width="236" height="36" rx="18" fill="#ffd21f"/>` +
    `<g transform="rotate(-12 720 300)"><rect x="692" y="278" width="70" height="40" fill="#9aa0ac" stroke="#6a7080" stroke-width="2"/><path d="M700 278V318M716 278V318M734 278V318M750 278V318" stroke="#b9bec8" stroke-width="2"/></g><g transform="rotate(30 600 400)"><rect x="574" y="388" width="50" height="22" fill="#9aa0ac" stroke="#6a7080" stroke-width="2"/></g>` +
    // ball pit
    `<ellipse cx="300" cy="490" rx="300" ry="20" fill="#000" opacity=".3" filter="url(#${k}b)"/><path d="M100 330H510L520 352H90Z" fill="url(#${k}r)"/><path d="M110 352H500L560 470H40Z" fill="url(#${k}p)"/><g clip-path="url(#${k}c)"><path d="M110 352H500L506 372H104Z" fill="#000" opacity=".4"/></g>` +
    `<path d="M90 352L110 352L40 470L14 470ZM500 352L520 352L586 470L560 470Z" fill="#2a56d0"/><path d="M14 470H586V520H14Z" fill="url(#${k}r)"/><path d="M14 470H586" stroke="#8ab8ff" stroke-width="4"/><path d="M60 486q40-6 80 0M380 490q60-6 110 0" stroke="#8ab8ff" stroke-width="3" fill="none" opacity=".6"/>` +
    // steel corners showing through thin padding
    [[14, 462], [540, 462]].map(([x, y]) => `<rect x="${x}" y="${y}" width="46" height="62" fill="url(#${k}s)" stroke="#4a505c" stroke-width="2"/><circle cx="${x + 12}" cy="${y + 14}" r="4" fill="#4a505c"/><circle cx="${x + 34}" cy="${y + 14}" r="4" fill="#4a505c"/><circle cx="${x + 12}" cy="${y + 48}" r="4" fill="#4a505c"/><circle cx="${x + 34}" cy="${y + 48}" r="4" fill="#4a505c"/>`).join('') +
    `<rect x="88" y="326" width="24" height="28" fill="url(#${k}s)" stroke="#4a505c" stroke-width="2"/><rect x="498" y="326" width="24" height="28" fill="url(#${k}s)" stroke="#4a505c" stroke-width="2"/>` +
    ball(610, 540, 15, '#ff3b3b') + ball(650, 560, 15, '#ffd21f') + ball(130, 556, 15, '#2f7dff') +
    `<rect width="800" height="600" fill="#fff" opacity=".06"/>`;
  return frame(k, 800, 600, defs, body, 0.12, 0.3);
})();

/** A run of glossy black belt along path `d` (gold-edged so it reads on dark). */
const beltRun = (d: string, w = 20): string =>
  `<path d="${d}" fill="none" stroke="${GOLD}" stroke-width="${w + 4}" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#0b0b10" stroke-width="${w}" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#fff" stroke-width="${n1(w / 6)}" opacity=".45" transform="translate(-3 -3)"/>`;
const knot = (x: number, y: number, r = 16): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#0b0b10" stroke="${GOLD}" stroke-width="2.500"/><path d="M${x - r * 0.6} ${y - r * 0.2}Q${x} ${y - r * 0.9} ${x + r * 0.6} ${y - r * 0.1}M${x - r * 0.5} ${y + r * 0.4}Q${x} ${y - r * 0.1} ${x + r * 0.6} ${y + r * 0.4}" fill="none" stroke="#fff" stroke-width="2" opacity=".5"/>`;
const gravel = (seed: number, y0: number, h: number, n: number, w = 600): string => {
  const q = rng(seed);
  let a = '', b = '';
  for (let i = 0; i < n; i++) { const s = `M${Math.round(q() * w)} ${Math.round(y0 + q() * h)}h${n1(2 + q() * 4)}`; if (i & 1) a += s; else b += s; }
  return `<path d="${a}" stroke="#fff" stroke-width="3" opacity=".35" stroke-linecap="round"/><path d="${b}" stroke="#000" stroke-width="3" opacity=".4" stroke-linecap="round"/>`;
};
const slushie = (x: number, y: number, s: number): string =>
  `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="2" rx="30" ry="7" fill="#000" opacity=".4"/><path d="M-24 -84H24L17 0H-17Z" fill="#1fb8ff"/><path d="M-24 -84H24L22 -60H-22Z" fill="#7ae0ff"/><path d="M-8 -84H24L17 0H2Z" fill="#000" opacity=".15"/><path d="M-26 -84Q0 -122 26 -84Z" fill="#fff" fill-opacity=".45" stroke="#fff" stroke-width="2"/><path d="M4 -96L16 -140" stroke="#e0281c" stroke-width="6" stroke-linecap="round"/><rect x="-19" y="-52" width="38" height="24" fill="#fff"/>` +
  tx(0, -35, 13, 'BLU RAZZ', '#1458c0', IMPACT, `${MID} ${fit(32)}`) + `</g>`;

A.c8_ph_board = ((): string => {
  const k = 'c8_ph_board';
  const defs = lg(`${k}s`, [[0, '#0a0c1c'], [1, '#3a2418']]) + lg(`${k}c`, [[0, '#d0d4dc'], [1, '#7a808c']]) + rg(`${k}o`, [[0, '#ff9a2a', 0.6], [1, '#ff9a2a', 0]], 0.8, 0.1, 0.9) + bl(`${k}b`, 9) + lg(`${k}t`, [[0, '#16161c'], [1, '#34343e']]);
  const body =
    `<rect width="600" height="800" fill="url(#${k}s)"/><circle cx="500" cy="40" r="26" fill="#ffb24a"/><circle cx="500" cy="40" r="80" fill="#ffb24a" opacity=".3" filter="url(#${k}b)"/>` +
    // lifted hatch + car
    `<path d="M60 0H540L520 150H80Z" fill="#8a909c"/><path d="M96 20H504L492 120H108Z" fill="#1c2a3a"/><path d="M30 190Q30 150 80 150H520Q570 150 570 190V640H30Z" fill="url(#${k}c)"/><path d="M60 196H540V600H60Z" fill="url(#${k}t)"/><path d="M60 196H540V240H60Z" fill="#000" opacity=".5"/>` +
    `<rect x="0" y="640" width="600" height="110" fill="#5a606c"/><rect x="0" y="750" width="600" height="50" fill="#16161a"/><rect x="216" y="664" width="168" height="62" rx="5" fill="#f4f0e0" stroke="#333" stroke-width="3"/>` + tx(300, 708, 34, 'NO MRCY', '#1a2a6a', MONO, `${BOLD} ${MID} ${fit(140)}`) +
    `<rect x="20" y="652" width="120" height="40" rx="8" fill="#e0201c"/><rect x="460" y="652" width="120" height="40" rx="8" fill="#e0201c"/><circle cx="80" cy="672" r="60" fill="#e0201c" opacity=".35" filter="url(#${k}b)"/>` +
    // sandwich board
    `<g transform="rotate(-7 290 380)"><rect x="84" y="262" width="420" height="250" fill="#000" opacity=".5" filter="url(#${k}b)"/><rect x="76" y="250" width="420" height="250" rx="4" fill="#fffdf4" stroke="#3a2a1a" stroke-width="8"/><rect x="60" y="268" width="20" height="30" fill="#9aa0ac"/><rect x="60" y="450" width="20" height="30" fill="#9aa0ac"/>` +
    lotus(124, 304, 0.7, '#d0106a') + tx(304, 322, 54, 'IRON LOTUS', '#15151a', IMPACT, `${MID} ${fit(280)}`) + `<path d="M100 342H472" stroke="#d0106a" stroke-width="5"/>` +
    tx(286, 396, 33, '— DISCIPLINE · RESPECT ·', '#15151a', IMPACT, `${MID} ${fit(380)}`) + tx(286, 470, 66, 'NO CLOWNS', '#d0106a', IMPACT, `${MID} ${fit(360)}`) + `</g>` +
    // whiskey
    `<g transform="translate(470 560) rotate(64)"><rect x="-30" y="-22" width="130" height="64" fill="#000" opacity=".4" filter="url(#${k}b)"/><path d="M-70 -9H-36Q-26 -24 -6 -24H96V24H-6Q-26 24 -36 9H-70Z" fill="#c0501a"/><path d="M-70 -9H-36Q-26 -24 -6 -24H96V-12H-70Z" fill="#fff" opacity=".3"/><rect x="6" y="-24" width="70" height="48" fill="#1a0a06"/><path d="M40 -14q14 12 0 28q-14-10-6-18q4 6 6 2q2-6 0-12z" fill="#ff8a1a"/></g>` +
    tx(0, 0, 1, '', '#000') + `<g transform="translate(506 570) rotate(-26)">` + tx(0, 0, 12, 'CINNAMON', '#ffd21f', IMPACT, `${MID} ${fit(46)}`) + tx(0, 13, 10, 'WHISKEY', '#fff', IMPACT, `${MID} ${fit(40)}`) + `</g>` +
    `<path d="M426 478l-8 6M418 470l-10 2M430 466l-4-8" stroke="#c0501a" stroke-width="4" stroke-linecap="round"/>` +
    // fast food bag
    `<g transform="rotate(8 150 560)"><rect x="96" y="500" width="130" height="110" fill="#000" opacity=".4" filter="url(#${k}b)"/><path d="M86 610V500l14-12 12 12 12-12 12 12 12-12 12 12 12-12 12 12 12-12 10 12V610Z" fill="#c69a5a"/><path d="M190 500V610H216V500Z" fill="#000" opacity=".15"/><circle cx="146" cy="552" r="26" fill="#e0281c"/>` + tx(146, 549, 12, 'BURGER', '#ffd21f', IMPACT, `${MID} ${fit(40)}`) + tx(146, 563, 12, 'BARN', '#fff', IMPACT, `${MID} ${fit(30)}`) + `<path d="M96 584q30 14 60 2" stroke="#8a6430" stroke-width="5" fill="none" opacity=".5"/></g>` +
    `<rect width="600" height="800" fill="url(#${k}o)" style="mix-blend-mode:screen"/>`;
  return frame(k, 600, 800, defs, body, 0.2, 0.6);
})();

A.c8_ph_student8 = ((): string => {
  const k = 'c8_ph_student8';
  const defs = lg(`${k}m`, [[0, '#5aa8e0'], [1, '#2a4a9a']], 1, 1) + rimF(`${k}r`, '#ffe14a', 5, 3) + rimF(`${k}q`, '#ffffff', -5, 3, '#001a50', 0.6) + bl(`${k}b`, 8) + lg(`${k}g`, [[0, '#fff2b0'], [1, '#c9963a']], 1, 1);
  const body =
    `<rect width="600" height="800" fill="#e6dcc0"/><rect x="0" y="176" width="600" height="560" fill="url(#${k}m)"/><path d="M60 176L260 736H340L140 176ZM400 176L560 640V500L440 176Z" fill="#fff" opacity=".13"/><rect y="170" width="600" height="10" fill="#8a8f9a"/>` +
    banner(22, 34, 556, -1) + `<rect y="730" width="600" height="70" fill="#1c4aa8"/><rect y="730" width="600" height="8" fill="#e0281c"/>` +
    pop(`${k}q`, fig(408, 316, 1.95, { ...COREY, shirt: '#f6f3ea', long: true, legs: '#f6f3ea', pre: GI_PRE('#c9c3ae', '#ffd21f', '#a88400', '#e8bd9f'), la: [-70, 90, -92, 164], ra: [70, 90, 94, 146],
      eyes: EYES_WIDE + `<path d="M-13 -46q-3 9 0 14q4-5 0-14zM13 -46q3 9 0 14q-4-5 0-14z" fill="#7ad0ff" stroke="#fff" stroke-width=".8"/>`,
      face: TACHE + `<path d="M-10 -33Q-4 -27 0 -31Q4 -27 10 -33Q6 -22 0 -23Q-6 -22 -10 -33Z" fill="#fffdf6" stroke="#4a1c14" stroke-width="1.600"/>` })) +
    pop(`${k}r`, fig(170, 372, 1.72, { ...DALE, legs: GI, la: [-52, 66, -30, 104], ra: [70, 6, 112, -14], hand: 12, rot: -3,
      eyes: `<path d="M-14 -55q5-4 10 0M4 -55q5-4 10 0" stroke="#1a1210" stroke-width="2.400" fill="none"/><path d="M-16 -63q6-3 12-1M4 -64q6-2 12 1" stroke="#5c5653" stroke-width="3" fill="none"/>`,
      face: GOATEE + `<path d="M-8 -33Q0 -28 9 -34" stroke="#4a1c14" stroke-width="2.600" fill="none"/>` })) +
    // certificate
    `<g transform="rotate(-4 400 590)"><rect x="262" y="500" width="290" height="196" fill="#000" opacity=".4" filter="url(#${k}b)"/><rect x="254" y="490" width="290" height="196" fill="#fffdf2" stroke="url(#${k}g)" stroke-width="9"/>` +
    tx(384, 536, 22, 'STUDENT OF THE MONTH', '#8a6410', SERIF, `${BOLD} ${MID} ${fit(224)}`) + tx(399, 596, 52, '— STUDENT #8', '#15151a', IMPACT, `${MID} ${fit(250)}`) +
    tx(399, 644, 30, '— COREY PLATT', '#b0241c', SERIF, `${BOLD} font-style="italic" ${MID} ${fit(220)}`) + `<path d="M290 660H420" stroke="#8a6410" stroke-width="2"/>` +
    `<g transform="translate(22 -146)"><circle cx="496" cy="648" r="24" fill="url(#${k}g)" stroke="#a87a1c" stroke-width="2"/><path d="M496 630L500.700 641.500L513 642.500L503.600 650.500L506.600 662.500L496 656L485.400 662.500L488.400 650.500L479 642.500L491.300 641.500Z" fill="#fffbe0"/></g></g>` +
    `<circle cx="262" cy="640" r="17" fill="#f0c8ac"/><circle cx="550" cy="600" r="17" fill="#f0c8ac"/>` + sparkle(86, 250, 14, '#fff6c0') + sparkle(540, 300, 10, '#fff');
  return frame(k, 600, 800, defs, body, 0.14, 0.4);
})();

A.c8_ph_ladder = ((): string => {
  const k = 'c8_ph_ladder';
  const defs = lg(`${k}s`, [[0, '#2a2a6a'], [0.55, '#c0508a'], [1, '#ffb05a']]) + lg(`${k}c`, [[0, '#e8ecf2'], [1, '#8a92a0']]) + lg(`${k}l`, [[0, '#f2f4f8'], [0.5, '#c9ced8'], [1, '#9aa0ac']]) + bl(`${k}b`, 9) + rimF(`${k}r`, '#ffd0a0', 3, -4, '#1a0a2a', 0.5);
  const condo = (x: number, w: number, h: number): string => {
    let s = `<path d="M${x} 400V${400 - h}L${x + w / 2} ${370 - h}L${x + w} ${400 - h}V400Z" fill="#2a1c3a"/>`;
    for (let i = 0; i < Math.floor(w / 50); i++) s += `<rect x="${x + 16 + i * 50}" y="${420 - h}" width="22" height="30" fill="${i % 2 ? '#ffc04a' : '#3a2a4a'}"/><rect x="${x + 16 + i * 50}" y="${475 - h}" width="22" height="30" fill="${i % 3 ? '#3a2a4a' : '#ffe08a'}"/>`;
    return s;
  };
  const body =
    `<rect width="800" height="420" fill="url(#${k}s)"/><circle cx="640" cy="330" r="60" fill="#ffe08a" opacity=".7" filter="url(#${k}b)"/>` + condo(-20, 260, 190) + condo(270, 210, 150) + condo(520, 300, 200) +
    `<rect x="300" y="352" width="150" height="34" fill="#3a2a1a" stroke="#c9a23a" stroke-width="3"/>` + tx(375, 375, 16, 'WILLOW RUN VILLAS', '#ffe9b0', SERIF, `${BOLD} ${MID} ${fit(134)}`) +
    `<rect y="400" width="800" height="200" fill="#3a3444"/><path d="M90 420L10 600M350 420L330 600M620 420L700 600" stroke="#e8e0d0" stroke-width="4" opacity=".5"/><ellipse cx="400" cy="528" rx="290" ry="18" fill="#000" opacity=".5" filter="url(#${k}b)"/>` +
    pop(`${k}r`,
      // hatchback, side on
      `<path d="M140 510V420Q142 396 180 390L250 326Q262 314 284 314H500Q524 314 540 330L590 388L640 398Q662 404 662 430V510Z" fill="url(#${k}c)"/><path d="M262 334Q268 326 282 326H378V388H206ZM392 326H496Q512 326 522 338L560 388H392Z" fill="#1c2438"/><path d="M262 334L300 388H206Z" fill="#fff" opacity=".14"/>` +
      `<path d="M140 470H662V510H140Z" fill="#5a606c"/><path d="M385 326V500" stroke="#7a808c" stroke-width="2"/><rect x="400" y="410" width="30" height="8" rx="3" fill="#5a606c"/><rect x="642" y="420" width="20" height="26" fill="#ffd21f"/><rect x="140" y="424" width="14" height="30" fill="#e0281c"/>` +
      `<circle cx="240" cy="510" r="42" fill="#15151a"/><circle cx="240" cy="510" r="18" fill="#9aa0ac"/><circle cx="560" cy="510" r="42" fill="#15151a"/><circle cx="560" cy="510" r="18" fill="#9aa0ac"/>` +
      // roof rack + ladder
      `<path d="M270 314V290M510 314V290" stroke="#23262e" stroke-width="10"/><g transform="rotate(-1.500 400 262)"><rect x="40" y="224" width="730" height="10" fill="#9aa0ac"/><path d="M70 234V250M130 234V250M190 234V250M250 234V250M310 234V250M370 234V250M430 234V250M490 234V250M550 234V250M610 234V250M670 234V250M730 234V250" stroke="#7a808c" stroke-width="12"/>` +
      `<rect x="30" y="248" width="750" height="42" rx="3" fill="url(#${k}l)" stroke="#6a7080" stroke-width="2"/><rect x="30" y="248" width="22" height="42" fill="#23262e"/><rect x="758" y="248" width="22" height="42" fill="#23262e"/>` +
      tx(404, 278, 25, 'PROPERTY OF RICK HUPP — GIVE IT BACK DALE', '#15151a', HAND, `${BOLD} ${MID} ${fit(690)}`) + `</g>` +
      `<path d="M262 300Q276 236 290 300" fill="none" stroke="#e0281c" stroke-width="6"/><path d="M500 298Q514 232 528 298" fill="none" stroke="#2f7dff" stroke-width="6"/><path d="M286 296q4 10 12 6M524 294q4 10 12 6" stroke="#ffd21f" stroke-width="4" fill="none"/>`) +
    `<path d="M30 262l-26 4 4 34 22-8z" fill="#e0281c"/>`;
  return frame(k, 800, 600, defs, body, 0.16, 0.5);
})();

A.c8_ph_roof = ((): string => {
  const k = 'c8_ph_roof';
  const defs = rg(`${k}f`, [[0, '#fff', 0], [0.55, '#000', 0.25], [1, '#000', 0.92]], 0.52, 0.5, 0.7) + lg(`${k}h`, [[0, '#dfe2e8'], [1, '#8a909c']]) + rimF(`${k}r`, '#ffffff', 4, 3, '#000', 0.7) + bl(`${k}b`, 9) + rg(`${k}n`, [[0, '#ff4fb0', 0.5], [1, '#ff4fb0', 0]]);
  const body =
    `<rect width="600" height="800" fill="#05060c"/><ellipse cx="200" cy="262" rx="260" ry="40" fill="url(#${k}n)"/><rect y="250" width="600" height="550" fill="#9a968c"/><rect y="250" width="600" height="14" fill="#5a584e"/>` + gravel(5, 270, 520, 150) +
    // ladder top over the roof edge
    `<g stroke="#dfe2e8" stroke-width="12" stroke-linecap="round"><path d="M452 262L462 120M540 262L546 122"/><path d="M458 160H544M456 216H542" stroke-width="8"/></g>` +
    // HVAC
    `<rect x="-10" y="560" width="250" height="40" fill="#000" opacity=".5" filter="url(#${k}b)"/><rect x="-20" y="250" width="232" height="330" fill="url(#${k}h)" stroke="#5a606c" stroke-width="3"/><circle cx="96" cy="356" r="76" fill="#3a3e48"/><g stroke="#9aa0ac" stroke-width="5" fill="none"><circle cx="96" cy="356" r="76"/><circle cx="96" cy="356" r="50"/><circle cx="96" cy="356" r="24"/><path d="M20 356H172M96 280V432"/></g>` +
    `<g stroke="#5a606c" stroke-width="5"><path d="M10 470H190M10 492H190M10 514H190M10 536H190"/></g><rect x="130" y="262" width="66" height="22" fill="#ffd21f"/>` + tx(163, 278, 12, 'DANGER', '#111', IMPACT, `${MID} ${fit(54)}`) +
    `<ellipse cx="340" cy="770" rx="200" ry="18" fill="#000" opacity=".5" filter="url(#${k}b)"/>` +
    pop(`${k}r`, fig(340, 336, 1.72, { ...COREY, shirt: '#17171d', long: true, legs: '#23232c', la: [-74, 20, -84, -42], ra: [74, 20, 84, -42], hand: 12,
      pre: `<path d="M-22 -8Q0 20 22 -8L30 6Q0 38 -30 6Z" fill="#24242e"/><path d="M-9 -4L0 70L9 -4" fill="none" stroke="#3bd66a" stroke-width="5"/><rect x="-16" y="68" width="32" height="24" rx="3" fill="#fff"/><path d="M-10 78H10M-10 85H6" stroke="#157a3a" stroke-width="3"/><path d="M-24 102H24V128H-24Z" fill="none" stroke="#2c2c38" stroke-width="3"/>`,
      eyes: `<circle cx="-9" cy="-54" r="6" fill="#fff"/><circle cx="9" cy="-54" r="6" fill="#fff"/><circle cx="-9" cy="-54" r="2.600" fill="#e0281c"/><circle cx="9" cy="-54" r="2.600" fill="#e0281c"/><path d="M-17 -64q6-7 13-3M4 -67q7-4 13 3" stroke="#6a4a2c" stroke-width="2.400" fill="none"/>`,
      face: TACHE + `<path d="M-9 -30q4-4 8 0q4 4 9-1" stroke="#4a1c14" stroke-width="2.600" fill="none"/><path d="M24 -70q4 8 0 11q-4-3 0-11z" fill="#9fe0ff"/>` })) +
    // six belts knotted end to end
    beltRun('M64 742Q60 640 132 566Q200 440 225 264Q230 330 250 404Q290 474 340 480Q392 474 430 404Q450 330 455 264Q480 440 540 548Q560 660 508 746') +
    knot(132, 566) + knot(250, 404) + knot(340, 480) + knot(430, 404) + knot(540, 548) +
    `<g fill="${GOLD}"><rect x="52" y="718" width="24" height="4"/><rect x="52" y="728" width="24" height="4"/><rect x="496" y="722" width="24" height="4"/><rect x="496" y="732" width="24" height="4"/></g>` +
    `<circle cx="225" cy="262" r="20" fill="#f0c8ac"/><circle cx="455" cy="262" r="20" fill="#f0c8ac"/>` + sparkle(180, 480, 10, '#fff6c0') + sparkle(488, 470, 9, '#fff6c0') + sparkle(290, 452, 7, '#fff6c0') +
    `<rect width="600" height="800" fill="url(#${k}f)"/>`;
  return frame(k, 600, 800, defs, body, 0.22, 0.5);
})();

A.c8_ph_hatch = ((): string => {
  const k = 'c8_ph_hatch';
  const defs = ballPat(`${k}p`, 0.2, 6, 12, '#16206a') + rg(`${k}f`, [[0, '#fff', 0], [0.6, '#000', 0.2], [1, '#000', 0.9]], 0.45, 0.55, 0.75) + rimF(`${k}r`, '#ffffff', 5, 3, '#000', 0.7) + bl(`${k}b`, 9) +
    rg(`${k}g`, [[0, '#ffe9a0', 0.9], [1, '#ffe9a0', 0]]) + rg(`${k}n`, [[0, '#4aff9a', 0.4], [1, '#4aff9a', 0]]);
  const body =
    `<rect width="600" height="800" fill="#05060c"/><ellipse cx="420" cy="180" rx="260" ry="50" fill="url(#${k}n)"/><rect y="170" width="600" height="630" fill="#9a968c"/><rect y="170" width="600" height="12" fill="#5a584e"/>` + gravel(8, 190, 600, 130) +
    // open hatch
    `<path d="M318 250L560 236L548 96L330 110Z" fill="#6a7080" stroke="#3a3e48" stroke-width="5"/><path d="M340 124L536 112L544 220L332 232Z" fill="#8a909c"/><path d="M300 262L584 246L600 420L290 444Z" fill="#c9ced8" stroke="#5a606c" stroke-width="4"/><path d="M324 280L562 266L574 400L316 420Z" fill="#06060c"/>` +
    `<ellipse cx="444" cy="350" rx="90" ry="54" fill="url(#${k}g)"/><path d="M386 318L500 310L508 384L380 394Z" fill="url(#${k}p)"/><path d="M386 318L500 310L508 384L380 394Z" fill="none" stroke="#2f7dff" stroke-width="7"/>` +
    // belt rope over the edge
    beltRun('M600 520Q520 500 478 420Q456 370 448 330', 18) + knot(520, 486, 14) + `<rect x="574" y="470" width="40" height="80" fill="#5a606c"/>` +
    slushie(470, 690, 1.25) +
    // Dale
    pop(`${k}r`,
      `<path d="M-40 800Q-30 640 90 600H310Q420 640 430 800Z" fill="#101016"/><path d="M110 600Q200 690 300 600L330 616Q200 740 84 616Z" fill="#1c1c26"/><path d="M-40 800L-80 560" stroke="#101016" stroke-width="120" stroke-linecap="round"/>` +
      lotus(236, 716, 1.1) + tx(236, 778, 42, 'IRON LOTUS', '#fff', IMPACT, `${MID} ${fit(220)}`) +
      `<path d="M300 470Q352 480 350 560Q346 616 320 640Q318 600 314 560Z" fill="#8f8a88"/>` +
      `<path d="M84 440C84 290 316 290 316 440C316 540 280 620 200 620C120 620 84 540 84 440Z" fill="#0c0c12"/><path d="M96 420Q110 330 200 322" fill="none" stroke="#fff" stroke-width="5" opacity=".2" stroke-linecap="round"/>` +
      `<path d="M112 426Q200 384 288 426Q290 470 200 474Q110 470 112 426Z" fill="#e2a680"/><path d="M130 440Q150 428 172 440Q150 448 130 440ZM228 440Q250 428 270 440Q250 448 228 440Z" fill="#fff"/><circle cx="154" cy="440" r="6" fill="#3a2a1a"/><circle cx="252" cy="440" r="6" fill="#3a2a1a"/><path d="M124 420Q150 410 178 424M222 420Q250 402 278 414" stroke="#5c5653" stroke-width="7" fill="none" stroke-linecap="round"/>` +
      `<path d="M150 540Q200 520 250 540Q240 584 200 584Q160 584 150 540Z" fill="#7d7672"/><path d="M160 544Q200 534 240 544Q232 572 200 572Q168 572 160 544Z" fill="#fffdf6" stroke="#4a1c14" stroke-width="3"/><path d="M164 556H236" stroke="#b9a9a0" stroke-width="2"/><path d="M96 470Q200 500 304 470M100 500Q200 524 300 500" fill="none" stroke="#1c1c26" stroke-width="3"/>` +
      // peace sign
      `<g transform="translate(52 556) rotate(-8)"><path d="M-30 240L-20 60H34L44 240Z" fill="#101016"/><rect x="-26" y="-4" width="60" height="70" rx="22" fill="#e2a680"/><rect x="-22" y="-92" width="22" height="104" rx="11" fill="#e2a680" transform="rotate(-12 -11 0)"/><rect x="8" y="-96" width="22" height="108" rx="11" fill="#e2a680" transform="rotate(12 19 0)"/><path d="M-22 26Q4 10 30 30" stroke="#a8704f" stroke-width="12" fill="none" stroke-linecap="round"/></g>`) +
    `<rect width="600" height="800" fill="url(#${k}f)"/>`;
  return frame(k, 600, 800, defs, body, 0.22, 0.5);
})();

A.c8_ph_lastframe = ((): string => {
  const k = 'c8_ph_lastframe';
  const defs = rg(`${k}c`, [[0, '#2a2e44'], [1, '#04050a']], 0.5, 0.2, 0.9) + `<filter id="${k}m" x="-10%" y="-40%" width="120%" height="180%"><feGaussianBlur stdDeviation="1 13"/></filter>` + bl(`${k}b`, 7) +
    rg(`${k}g`, [[0, '#cfe0ff', 0.8], [1, '#cfe0ff', 0]]) + rimF(`${k}r`, '#ffe9a0', 4, 3, '#000', 0.8);
  const q = rng(13);
  let streaks = '';
  for (let i = 0; i < 26; i++) { const x = Math.round(q() * 600), y = Math.round(260 + q() * 380); streaks += `M${x} ${y}V${y + Math.round(60 + q() * 160)}`; }
  const body =
    `<rect width="600" height="800" fill="url(#${k}c)"/><g filter="url(#${k}m)"><g stroke="#3a4060" stroke-width="5"><path d="M0 90H600M0 250H600M120 0V420M480 0V420"/></g><circle cx="300" cy="170" r="150" fill="url(#${k}g)"/>` +
    `<g transform="rotate(5 300 170)"><rect x="226" y="96" width="148" height="148" fill="#11131c" stroke="#5a607a" stroke-width="8"/><rect x="238" y="108" width="124" height="124" fill="#d8e6ff"/></g>` +
    balls(51, -20, 700, 640, 90, 16, 44, 64) + `</g>` +
    `<path d="${streaks}" stroke="#fff" stroke-width="2" opacity=".14"/>` +
    // Corey's head in the hatch
    `<g transform="translate(300 206) rotate(5)"><path d="M-34 34C-40 -26 40 -26 34 34Z" fill="#06070c"/><path d="M-62 38Q-56 16 -30 16H30Q56 16 62 38Z" fill="#06070c"/><path d="M-4 -22Q-2 -38 10 -40Q5 -30 7 -20Z" fill="#06070c"/><ellipse cx="-38" cy="6" rx="8" ry="12" fill="#06070c"/><ellipse cx="38" cy="6" rx="8" ry="12" fill="#06070c"/><ellipse cx="0" cy="12" rx="9" ry="13" fill="#d8e6ff"/><circle cx="-13" cy="-8" r="4" fill="#d8e6ff"/><circle cx="13" cy="-8" r="4" fill="#d8e6ff"/></g>` +
    // the half still hanging from the hatch
    beltRun('M352 236Q362 290 350 340', 9) + `<path d="M344 338l-4 16M350 340l1 18M356 338l5 14" stroke="#0b0b10" stroke-width="2.500"/>` +
    // foreground: the torn end, sharp
    pop(`${k}r`, `<g transform="rotate(-14 300 520)"><path d="M-40 500H300V572H-40Z" fill="#0b0b10"/><path d="M-40 508H296M-40 564H296" stroke="${GOLD}" stroke-width="2.500" stroke-dasharray="7 5"/><path d="M-40 512H300" stroke="#fff" stroke-width="5" opacity=".3"/>` +
      `<path d="M150 486Q200 470 232 500Q250 536 232 572Q200 600 150 586Q130 536 150 486Z" fill="#0b0b10" stroke="${GOLD}" stroke-width="3"/><path d="M160 500Q196 520 224 506M156 540Q190 552 232 540M162 572Q196 562 222 574" stroke="#fff" stroke-width="3" opacity=".4" fill="none"/>` +
      `<path d="M300 500l34 4-22 8 40 2-30 10 44 6-36 8 30 12-40 2 24 12-44 8Z" fill="#0b0b10"/><path d="M330 506l40-10M350 522l52-2M352 540l44 12M338 560l36 18M324 512l22-22" stroke="#0b0b10" stroke-width="2.500"/><path d="M340 530l34-6M336 548l26 10" stroke="${GOLD}" stroke-width="2"/>` +
      `<rect x="-16" y="582" width="330" height="96" rx="4" fill="#fbfaf4" stroke="#b9b6a8" stroke-width="3"/><path d="M-8 592H306" stroke="#b9b6a8" stroke-width="2" stroke-dasharray="6 5"/><path d="M-16 578V590M314 578V590" stroke="#fbfaf4" stroke-width="6"/>` +
      tx(149, 618, 17, 'NOVELTY DISPLAY BELT · 100% POLYESTER ·', '#55555c', SANS, `${BOLD} ${MID} ${fit(300)}`) + tx(149, 660, 33, 'NOT FOR LOAD BEARING', '#c01818', SANS, `${BOLD} ${MID} ${fit(306)}`) + `</g>`) +
    // system banner
    `<rect x="110" y="24" width="380" height="44" rx="22" fill="#fff" opacity=".12"/><circle cx="140" cy="46" r="9" fill="#ff5a4a" opacity=".6"/>` + tx(312, 54, 22, 'FALL DETECTED', '#fff', SANS, `${BOLD} ${MID} ${fit(210)} opacity=".5" letter-spacing="3"`);
  return frame(k, 600, 800, defs, body, 0.24, 0.6);
})();

// ════════════════════════════════════════════════════════════════ HIDDEN ALBUM (suggestive, non-explicit)
const D_SKIN = '#e2a680', D_SHADE = '#a8704f';
/** Dale with his shirt off: sucked-in gut, puffed chest, baby oil. */
const BEEFCAKE =
  `<ellipse cx="-37" cy="98" rx="9" ry="15" fill="${D_SKIN}"/><ellipse cx="37" cy="98" rx="9" ry="15" fill="${D_SHADE}"/>` +
  `<g fill="none" stroke="${D_SHADE}" stroke-width="2.600"><path d="M-35 46Q-18 58 -2 46M2 46Q18 58 35 46M-20 74Q0 64 20 74M0 88v5"/></g>` +
  `<path d="M-8 22l2 6M0 20v7M8 22l-2 6M-4 31l1 5M4 31l-1 5M-12 30l2 4M12 30l-2 4" stroke="#6a5a54" stroke-width="1.500" fill="none"/>` +
  `<path d="M-38 12Q-30 0 -14 0" stroke="#fff" stroke-width="4" opacity=".55" fill="none"/><ellipse cx="-20" cy="34" rx="9" ry="4" fill="#fff" opacity=".4" transform="rotate(-20 -20 34)"/><ellipse cx="-14" cy="84" rx="4" ry="9" fill="#fff" opacity=".3"/>` +
  `<path d="M-12 -4Q0 18 12 -4" fill="none" stroke="${GOLD}" stroke-width="2.400"/><circle cx="0" cy="8" r="3.500" fill="${GOLD}"/>`;
const D_HAIR_LOOSE = `<path d="M17 -74Q42 -68 40 -36Q38 -14 31 -4Q26 -20 29 -38Q29 -58 15 -63Z" fill="#8f8a88"/><path d="M-23 -54C-27 -92 27 -92 23 -54C20 -70 12 -76 0 -76C-12 -76 -20 -70 -23 -54Z" fill="#77716e"/>`;
const LEG_HAIR = `<path d="M-28 240l3 8M-18 262l2 8M-26 290l3 8M-14 310l2 8M16 244l-3 8M26 268l-2 8M14 292l-3 8M24 318l-2 8M-22 340l2 8M20 346l-2 8" stroke="#6a5a54" stroke-width="1.600" fill="none"/>`;
const SMOULDER = `<path d="M-15 -53Q-9 -57 -4 -53Q-9 -50 -15 -53ZM4 -53Q9 -57 15 -53Q9 -50 4 -53Z" fill="#1a1210"/><path d="M-16 -58H-3M3 -62Q10 -68 17 -62" stroke="#5c5653" stroke-width="3" fill="none"/>`;

A.c8_ph_h_mirror = ((): string => {
  const k = 'c8_ph_h_mirror';
  const defs = lg(`${k}w`, [[0, '#f0c890'], [1, '#c08a6a']], 1, 0) + lg(`${k}s`, [[0, '#ff8a3a'], [1, '#ffd88a']]) + rimF(`${k}r`, '#ffb23a', 6, 2, '#3a1a08', 0.55) + bl(`${k}b`, 9) + rg(`${k}o`, [[0, '#ff9a3a', 0.45], [1, '#ff9a3a', 0]], 0, 0.25, 0.9);
  const L = (y: number, s: string, w: number, c = '#1a2a8a'): string => tx(310, y, 23, s, c, HAND, `${BOLD} ${fit(w)}`);
  const body =
    `<rect width="600" height="800" fill="url(#${k}w)"/><rect y="690" width="600" height="110" fill="#2a5ab8"/><path d="M0 690H600" stroke="#e0281c" stroke-width="10"/>` +
    // window + slushie on the sill
    `<rect x="-10" y="60" width="150" height="214" fill="url(#${k}s)" stroke="#fff8e8" stroke-width="10"/><path d="M64 60V274M-10 160H140" stroke="#fff8e8" stroke-width="6"/><rect x="-10" y="272" width="170" height="16" fill="#fff8e8"/>` + slushie(112, 274, 0.8) +
    // whiteboard on wheels
    `<path d="M300 420L286 730M580 420L592 730" stroke="#8a909c" stroke-width="8"/><circle cx="286" cy="736" r="9" fill="#23262e"/><circle cx="592" cy="736" r="9" fill="#23262e"/>` +
    `<rect x="290" y="96" width="306" height="340" fill="#000" opacity=".3" filter="url(#${k}b)"/><rect x="280" y="86" width="312" height="340" rx="6" fill="#fdfdf8" stroke="#9aa0ac" stroke-width="8"/><rect x="380" y="418" width="120" height="12" fill="#7a808c"/><rect x="396" y="410" width="34" height="9" rx="3" fill="#e0281c"/>` +
    tx(304, 140, 34, 'OP. BALL PIT', '#d0181c', HAND, `${BOLD} ${fit(220)}`) + `<path d="M302 150q110 10 226-2" stroke="#d0181c" stroke-width="4" fill="none"/>` +
    L(194, '1) RONNIE @ CASINO', 226) + L(240, '2) COREY = ROOF', 188) + L(286, '3) 6 BELTS ↓ HATCH (UNIT 5)', 264) + L(332, '4) LOTUS HOODIE → CAMERA', 260) + L(378, '5) LORRAINE MON 9AM', 236, '#d0181c') +
    `<rect width="600" height="800" fill="url(#${k}o)"/><ellipse cx="170" cy="790" rx="150" ry="16" fill="#000" opacity=".4" filter="url(#${k}b)"/>` +
    pop(`${k}r`, fig(170, 292, 1.75, { skin: D_SKIN, shade: D_SHADE, shirt: D_SKIN, sx: 1.12, legs: D_SKIN, hair: DALE_HAIR, pre: BEEFCAKE + LEG_HAIR, la: [-74, -2, -60, -54], ra: [50, 38, 16, -52], hand: 12,
      eyes: `<path d="M-15 -53Q-9 -58 -4 -53Q-9 -50 -15 -53Z" fill="#1a1210"/><path d="M-16 -62Q-9 -67 -3 -61" stroke="#5c5653" stroke-width="3" fill="none"/>`,
      face: GOATEE + `<path d="M-10 -33Q-6 -39 -2 -35Q2 -39 6 -33Q2 -26 -2 -30Q-6 -26 -10 -33Z" fill="#c2334a"/>`,
      over: `<circle cx="-60" cy="6" r="15" fill="${D_SKIN}"/><path d="M-70 0Q-62 -10 -52 -2" stroke="#fff" stroke-width="3" opacity=".5" fill="none"/>` +
        `<rect x="1" y="-96" width="31" height="56" rx="5" fill="#15151a" stroke="#4a4a56" stroke-width="1.500"/><rect x="5" y="-92" width="12" height="12" rx="3" fill="#2a2a34"/><circle cx="11" cy="-86" r="3" fill="#4a6aa0"/>` +
        `<path d="M-37 108H37L36 192H5L0 170L-5 192H-36Z" fill="#101016"/><path d="M-37 116H37" stroke="#3a3a46" stroke-width="2"/>` +
        `<path d="M-38 92H38L37.500 109H-37.500Z" fill="#050507" stroke="${GOLD}" stroke-width="1.500"/><path d="M-7 90h14v20h-14z" fill="#050507" stroke="${GOLD}" stroke-width="1.500"/><path d="M-5 110l-12 40h10l8-40zM5 110l13 36h-10l-7-36z" fill="#050507" stroke="${GOLD}" stroke-width="1.500"/><path d="M-30 100.500H-12M12 100.500H30" stroke="${GOLD}" stroke-width="3" stroke-dasharray="2 1.500"/>` })) +
    sparkle(60, 330, 12, '#fff') + sparkle(252, 250, 9, '#fff') + sparkle(120, 520, 8, '#fff') +
    // mirror glass + frame
    `<path d="M380 0L470 0L250 800L160 800Z" fill="#fff" opacity=".07"/><rect x="7" y="7" width="586" height="786" fill="none" stroke="#c9ced8" stroke-width="14"/><rect x="15" y="15" width="570" height="770" fill="none" stroke="#5a606c" stroke-width="2"/>`;
  return frame(k, 600, 800, defs, body, 0.16, 0.45);
})();

A.c8_ph_h_bath = ((): string => {
  const k = 'c8_ph_h_bath';
  const defs = lg(`${k}w`, [[0, '#3a2466'], [1, '#6a2a6a']]) + lg(`${k}t`, [[0, '#fdfdff'], [1, '#b8b4d0']]) + rg(`${k}c`, [[0, '#ffd27a', 0.85], [1, '#ffd27a', 0]]) + rimF(`${k}r`, '#ffc04a', 6, 3, '#1a0830', 0.6) + bl(`${k}b`, 8) +
    rg(`${k}u`, [[0, '#fff'], [0.7, '#eef0ff'], [1, '#b8c0f0']], 0.35, 0.3, 0.7);
  const q = rng(61);
  const bub = (x: number, y: number, r: number): string => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${k}u)"/>`;
  let foam = '';
  for (let i = 0; i < 34; i++) foam += bub(Math.round(-10 + (i / 33) * 620 + q() * 20), Math.round(400 + q() * 60 - (i % 3 === 0 ? 20 : 0)), Math.round(26 + q() * 22));
  const candle = (x: number, y: number, h: number): string => `<circle cx="${x}" cy="${y - h - 18}" r="70" fill="url(#${k}c)"/><rect x="${x - 13}" y="${y - h}" width="26" height="${h}" fill="#f6ecd8"/><path d="M${x} ${y - h - 2}q-9-14 0-30q9 16 0 30z" fill="#ffb02a"/><path d="M${x} ${y - h - 2}q-4-8 0-16q4 8 0 16z" fill="#fff6c0"/>`;
  const body =
    `<rect width="600" height="800" fill="url(#${k}w)"/><g stroke="#2a1850" stroke-width="3" opacity=".7"><path d="M0 80H600M0 160H600M0 240H600M0 320H600M75 0V400M225 0V400M375 0V400M525 0V400"/></g>` +
    // monogrammed towel
    `<path d="M400 60H580" stroke="#c9ced8" stroke-width="8"/><path d="M430 60H550V230H430Z" fill="#101016"/><path d="M430 200H550" stroke="${GOLD}" stroke-width="5"/>` + tx(490, 150, 34, 'HUPP', '#fff6c0', IMPACT, `${MID} ${fit(90)} fill-opacity="0" stroke="#fff6c0" stroke-width="3" stroke-dasharray=".1 4.500" stroke-linecap="round"`) +
    `<rect y="380" width="600" height="60" fill="#d8d4ea"/>` +
    pop(`${k}r`, fig(214, 300, 1.9, { skin: D_SKIN, shade: D_SHADE, shirt: D_SKIN, sx: 1.12, hair: D_HAIR_LOOSE, pre: BEEFCAKE, la: [-66, 64, -100, 84], ra: [62, 26, 74, -34], hand: 12, eyes: SMOULDER,
      face: GOATEE + `<path d="M-10 -36Q0 -39 10 -36Q8 -27 0 -27Q-8 -27 -10 -36Z" fill="#fffdf6" stroke="#4a1c14" stroke-width="1.600"/>` +
        `<path d="M-34 -30Q0 -36 34 -33" stroke="#2a8a3a" stroke-width="3" fill="none"/><path d="M-20 -32q-6-8-14-4q6 6 14 4z" fill="#2a8a3a"/><circle cx="40" cy="-34" r="10" fill="#e0182a"/><path d="M34 -36q6-6 10 0q-4 6-8 2M40 -44q8 2 8 10" stroke="#8a0a18" stroke-width="1.800" fill="none"/>`,
      over: `<g transform="translate(74 -40) rotate(10)"><path d="M-9 -70H9V-44Q22 -36 22 -20V40H-22V-20Q-22 -36 -9 -44Z" fill="#c0501a"/><path d="M-16 -18V36" stroke="#fff" stroke-width="4" opacity=".35"/><rect x="-22" y="-8" width="44" height="34" fill="#1a0a06"/><path d="M0 -2q10 9 0 22q-10-8-4-14q3 5 4 2q2-4 0-10z" fill="#ff8a1a"/><rect x="-10" y="-76" width="20" height="8" fill="#e0281c"/></g><circle cx="74" cy="-32" r="13" fill="${D_SKIN}"/>` }) +
      // the knee
      `<path d="M388 452Q392 356 432 352Q472 356 478 452Z" fill="${D_SKIN}"/><path d="M440 356Q470 364 478 452H452Z" fill="${D_SHADE}" opacity=".6"/><path d="M410 380l3 9M424 370l2 9M440 376l-1 9M452 390l-2 9M416 404l2 9M434 398l1 9M448 414l-2 9M402 420l3 9M426 426l1 9" stroke="#5a4a44" stroke-width="2" fill="none"/>`) +
    foam + bub(150, 190, 22) + bub(176, 174, 14) + bub(292, 372, 16) +
    `<path d="M-10 440H610V800H-10Z" fill="url(#${k}t)"/><rect x="-10" y="440" width="620" height="26" rx="13" fill="#fff"/><path d="M0 500H600" stroke="#fff" stroke-width="3" opacity=".6"/><rect y="690" width="600" height="110" fill="#2a1848"/><ellipse cx="300" cy="752" rx="230" ry="40" fill="#ff5aa8"/><ellipse cx="300" cy="752" rx="200" ry="30" fill="none" stroke="#ffd0e8" stroke-width="4" stroke-dasharray="10 8"/>` +
    [[230, -10], [330, 12]].map(([x, a]) => `<g transform="translate(${x} 746) rotate(${a})"><ellipse rx="44" ry="17" fill="#2aa84a"/><path d="M-10 -15Q14 -30 26 0Q14 30 -10 15Z" fill="#e0281c"/><circle cx="32" cy="-6" r="4" fill="#fff"/><circle cx="32" cy="6" r="4" fill="#fff"/><path d="M40 -4l10 4-10 4z" fill="#ffd21f"/></g>`).join('') +
    candle(70, 444, 74) + candle(330, 444, 40) +
    // the duck, facing you
    `` +
    pop(`${k}r`, `<g transform="translate(152 62) scale(.85)"><path d="M300 400Q296 330 330 320Q300 370 340 380Q400 300 480 330Q520 360 500 420Q480 452 400 452Q320 452 300 400Z" fill="#ffd21f"/><circle cx="400" cy="300" r="62" fill="#ffd21f"/>` +
      `<path d="M370 320Q400 306 430 320Q436 344 400 348Q364 344 370 320Z" fill="#ff7a1a"/><path d="M372 330Q400 338 428 330" stroke="#b0440a" stroke-width="3" fill="none"/>` +
      `<circle cx="376" cy="290" r="9" fill="#111"/><circle cx="424" cy="290" r="9" fill="#111"/><circle cx="373" cy="287" r="3" fill="#fff"/><circle cx="421" cy="287" r="3" fill="#fff"/><path d="M360 276L390 284M440 276L410 284" stroke="#111" stroke-width="6" stroke-linecap="round"/>` +
      `<path d="M340 262Q400 240 460 262V282Q400 260 340 282Z" fill="#0a0a0c"/><path d="M458 264l34-12 4 12-34 12zM458 276l30 14-6 12-28-16z" fill="#0a0a0c"/>` +
      `<path id="${k}d" d="M350 277Q400 257 450 277" fill="none"/><text ${IMPACT} font-size="15" fill="#fff" ${MID} letter-spacing="1"><textPath href="#${k}d" startOffset="50%">NO MERCY</textPath></text></g>`) +
    `<g fill="none" stroke="#fff" stroke-width="5" opacity=".18" stroke-linecap="round"><path d="M330 300q-20-40 0-80q20-40 0-80M520 260q-16-30 0-60q16-30 0-60"/></g>`;
  return frame(k, 600, 800, defs, body, 0.18, 0.5);
})();

A.c8_ph_h_pizza = ((): string => {
  const k = 'c8_ph_h_pizza';
  const defs = lg(`${k}w`, [[0, '#e8c86a'], [1, '#c08a4a']]) + lg(`${k}n`, [[0, '#0a1030'], [1, '#2a2a5a']]) + rimF(`${k}r`, '#fff0b0', 5, 3, '#2a1808', 0.55) + bl(`${k}b`, 8) + lg(`${k}c`, [[0, '#8a5a2e'], [1, '#5a3418']]);
  const body =
    `<rect width="600" height="800" fill="url(#${k}w)"/><rect y="650" width="600" height="150" fill="#e8e0d0"/><g fill="#23262e" opacity=".8"><path d="M0 650h75v50H0zM150 650h75v50h-75zM300 650h75v50h-75zM450 650h75v50h-75zM75 700h75v50H75zM225 700h75v50h-75zM375 700h75v50h-75zM525 700h75v50h-75zM0 750h75v50H0zM150 750h75v50h-75zM300 750h75v50h-75zM450 750h75v50h-75z"/></g>` +
    `<rect width="330" height="120" fill="url(#${k}c)"/><path d="M110 0V120M220 0V120" stroke="#3a2010" stroke-width="4"/><circle cx="96" cy="96" r="5" fill="${GOLD}"/><circle cx="124" cy="96" r="5" fill="${GOLD}"/>` +
    `<rect y="470" width="600" height="180" fill="url(#${k}c)"/><rect y="456" width="600" height="20" fill="#e8e0d0"/><path d="M110 476V650M490 476V650" stroke="#3a2010" stroke-width="4"/>` +
    // window + the neighbour
    `<rect x="370" y="104" width="216" height="236" fill="url(#${k}n)" stroke="#fff8e8" stroke-width="12"/><rect x="398" y="150" width="164" height="150" fill="#ffd88a"/><rect x="398" y="150" width="164" height="150" fill="none" stroke="#5a3a2a" stroke-width="6"/>` +
    `<path d="M420 300Q420 250 452 246Q484 250 484 300Z" fill="#b094e0"/><circle cx="452" cy="216" r="24" fill="#ecc8ac"/><path d="M428 212Q430 186 452 186Q474 186 476 212Q452 200 428 212Z" fill="#d8d4d0"/>` +
    [430, 446, 462].map((x) => `<rect x="${x}" y="182" width="14" height="10" rx="5" fill="#ff8ac0" stroke="#d0508a" stroke-width="1.200"/>`).join('') +
    `<circle cx="443" cy="216" r="6" fill="#fff"/><circle cx="461" cy="216" r="6" fill="#fff"/><circle cx="442" cy="217" r="2.500" fill="#111"/><circle cx="460" cy="217" r="2.500" fill="#111"/><ellipse cx="452" cy="230" rx="4" ry="5" fill="#6a2a24"/>` +
    `<g transform="rotate(24 510 240)"><rect x="490" y="226" width="40" height="30" rx="4" fill="#3bb46a"/><path d="M530 236L556 222" stroke="#3bb46a" stroke-width="7"/><path d="M490 232q-14 8 0 18" fill="none" stroke="#3bb46a" stroke-width="5"/></g><path d="M548 244Q556 270 552 300" stroke="#7ad0ff" stroke-width="4" fill="none" stroke-dasharray="7 4"/>` +
    `<path d="M512 300V280h30v20zM527 280q-14-20-4-34q2 16 4 34q8-22 18-22q-4 12-18 22z" fill="#2a8a3a"/><path d="M512 286h30v14h-30z" fill="#c0603a"/><path d="M478 318V104M370 222H586" stroke="#fff8e8" stroke-width="6"/><path d="M370 104h60l-20 236h-40z" fill="#e0281c" opacity=".85"/>` +
    // Dale
    `<ellipse cx="230" cy="790" rx="170" ry="14" fill="#000" opacity=".35" filter="url(#${k}b)"/>` +
    pop(`${k}r`, fig(230, 262, 1.8, { skin: D_SKIN, shade: D_SHADE, shirt: D_SKIN, sx: 1.12, legs: D_SKIN, hair: D_HAIR_LOOSE, pre: BEEFCAKE + LEG_HAIR, la: [-60, 64, -58, 112], ra: [60, 64, 58, 112], hand: 12,
      eyes: `<circle cx="-9" cy="-54" r="3" fill="#1a1210"/><circle cx="9" cy="-54" r="3" fill="#1a1210"/><path d="M-16 -66Q-9 -72 -3 -66M3 -66Q9 -72 16 -66" stroke="#5c5653" stroke-width="3" fill="none"/>`, face: GOATEE + GRIN }) +
      // the box: lid up, base out
      `<path d="M110 302H350L358 468H102Z" fill="#f6eeda" stroke="#c9b88a" stroke-width="3"/><path d="M122 314H338L344 456H116Z" fill="none" stroke="#e0281c" stroke-width="4"/>` +
      `<path d="M150 344q20-22 44-8q-18 0-22 14q14-10 26 0q-20 2-24 16q-8-14-24-22z" fill="#e0281c"/>` + tx(264, 362, 30, 'DRAGON', '#e0281c', IMPACT, `${MID} ${fit(116)}`) + tx(230, 404, 34, 'FEAST — XL', '#15151a', IMPACT, `${MID} ${fit(196)}`) + tx(230, 440, 15, 'HOT · FAST · NO REFUNDS', '#8a6a3a', SANS, `${BOLD} ${MID} ${fit(180)}`) +
      `<path d="M102 468H358L392 616H68Z" fill="#e6d8b4"/><ellipse cx="230" cy="544" rx="132" ry="58" fill="#d09a44"/><ellipse cx="230" cy="542" rx="118" ry="49" fill="#ffd24a"/><path d="M230 542L330 510L346 552Z" fill="#e6d8b4"/>` +
      [[170, 524], [224, 512], [270, 560], [190, 566], [140, 548], [250, 532]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="15" ry="8" fill="#c8281c"/>`).join('') +
      `<path d="M68 616H392V640H68Z" fill="#d0c098"/><circle cx="104" cy="474" r="20" fill="${D_SKIN}"/><circle cx="356" cy="474" r="20" fill="${D_SHADE}"/>`) +
    `<g fill="none" stroke="#fff" stroke-width="5" opacity=".4" stroke-linecap="round"><path d="M180 500q-12-20 0-40M250 496q-12-20 0-40"/></g>` + sparkle(96, 250, 12, '#fff') + sparkle(340, 250, 9, '#fff');
  return frame(k, 600, 800, defs, body, 0.16, 0.45);
})();

A.c8_ph_h_tammy = ((): string => {
  const k = 'c8_ph_h_tammy';
  const SK = '#eeb48e', SH = '#b0765a';
  const defs = lg(`${k}w`, [[0, '#ff9ad0'], [1, '#c0308a']]) + rimF(`${k}r`, '#7af0ff', -6, 2, '#3a0428', 0.6) + bl(`${k}b`, 8) + lg(`${k}c`, [[0, '#f6ecd8'], [1, '#c9b89a']]) +
    `<pattern id="${k}l" width="36" height="32" patternUnits="userSpaceOnUse"><rect width="36" height="32" fill="#e9a84a"/><path d="M5 6q7-5 10 2q-2 7-9 4zM22 18q8-4 10 4q-4 6-10 2zM24 2q5-2 7 3q-4 3-7 0zM6 22q5-3 8 2q-3 5-8 2z" fill="#3a1e0c"/><circle cx="10" cy="9" r="2" fill="#c0701a"/><circle cx="27" cy="22" r="2" fill="#c0701a"/></pattern>`;
  const R = `url(#${k}l)`;
  const body =
    `<rect width="600" height="800" fill="url(#${k}w)"/><rect y="680" width="600" height="120" fill="#5a1848"/>` +
    // polish shelf + sign
    `<rect x="30" y="196" width="130" height="10" fill="#fff"/>${BALLC.map((c, i) => `<rect x="${36 + i * 15}" y="170" width="11" height="26" rx="3" fill="${c}"/><rect x="${39 + i * 15}" y="160" width="5" height="12" fill="#23262e"/>`).join('')}` +
    `<rect x="330" y="90" width="240" height="64" rx="8" fill="#2a0420" stroke="#7af0ff" stroke-width="3"/>` + tx(450, 120, 22, 'LACQUER LOUNGE', '#fff', IMPACT, `${MID} ${fit(200)}`) + tx(450, 143, 15, 'STAFF ONLY · NO REFUNDS', '#ffd21f', SANS, `${BOLD} ${MID} ${fit(196)}`) +
    // nana in the pedicure chair
    `<path d="M374 300Q372 250 420 248H540Q586 250 584 300V640H374Z" fill="url(#${k}c)"/><path d="M400 280H560V470H400Z" fill="#000" opacity=".08"/><rect x="350" y="470" width="50" height="170" rx="20" fill="#e0d2b4"/><rect x="560" y="470" width="50" height="170" rx="20" fill="#c9b89a"/>` +
    fig(480, 400, 1.25, { skin: '#f0d0b8', shade: '#b89a84', shirt: '#4ab8c8', long: true, legs: '#f0d0b8', la: [-50, 66, -20, 100], ra: [50, 66, 20, 104],
      pre: flower(-20, 40, '#fff') + flower(18, 70, '#ffd21f') + flower(-14, 104, '#ff8ac0') + `<path d="M-40 120H40L48 220H-48Z" fill="#4ab8c8"/>` + flower(20, 160, '#fff') + flower(-22, 190, '#ffd21f'),
      hair: `<path d="M-23 -54C-27 -94 27 -94 23 -54C19 -72 10 -78 0 -78C-10 -78 -19 -72 -23 -54Z" fill="#f4f0f0"/><circle cx="0" cy="-92" r="13" fill="#f4f0f0"/>`,
      eyes: `<circle cx="-10" cy="-54" r="8" fill="#8ad04a" stroke="#3a8a2a" stroke-width="2"/><circle cx="10" cy="-54" r="8" fill="#8ad04a" stroke="#3a8a2a" stroke-width="2"/><circle cx="-10" cy="-54" r="3.500" fill="#d8f0a0"/><circle cx="10" cy="-54" r="3.500" fill="#d8f0a0"/>`,
      face: `<ellipse cx="0" cy="-30" rx="6" ry="8" fill="#5a1c1c"/>` }) +
    `<path d="M410 690H550L560 770H400Z" fill="#2f9ae0"/><ellipse cx="480" cy="690" rx="70" ry="14" fill="#bfe8ff"/><circle cx="450" cy="684" r="10" fill="#fff"/><circle cx="500" cy="680" r="13" fill="#fff"/><circle cx="476" cy="690" r="8" fill="#fff"/>` +
    `<g fill="#fff" ${IMPACT}><text x="528" y="330" font-size="26">z</text><text x="546" y="296" font-size="36">Z</text><text x="560" y="250" font-size="48">Z</text></g>` +
    // Tammy
    `<ellipse cx="220" cy="792" rx="150" ry="12" fill="#000" opacity=".4" filter="url(#${k}b)"/>` +
    pop(`${k}r`, `<g transform="translate(206 268) scale(1.9)" stroke-linecap="round" stroke-linejoin="round">` +
      `<path d="M-54 -26C-86 -116 -34 -156 0 -156C34 -156 86 -116 54 -26C48 -2 30 -8 26 -30L22 -60H-22L-26 -30C-30 -8 -48 -2 -54 -26Z" fill="#8a2030"/><path d="M-48 -60q-10-50 26-80M48 -60q10-50-26-80M-20 -146q20-8 40 0" stroke="#e05a50" stroke-width="2.400" fill="none"/>` +
      // legs, one hip popped
      `<path d="M-42 196Q-46 250 -32 300H2Q10 250 10 200Z" fill="${SK}"/><path d="M12 196Q16 250 24 300H56Q68 240 62 190Z" fill="${SK}"/><path d="M40 196Q48 250 46 300H56Q68 240 62 190Z" fill="${SH}" opacity=".6"/>` +
      `<path d="M-8 -26V4H8V-26Z" fill="${SH}"/><path d="M-22 0L6 100L28 0Z" fill="${SK}"/><path d="M-9 40Q5 54 20 38L22 56Q6 68 -4 58Z" fill="#101016"/><path d="M-9 40Q5 54 20 38" fill="none" stroke="#101016" stroke-width="3" stroke-dasharray=".1 3.500"/>` +
      `<path d="M0 104L-8 214H24L14 104Z" fill="${SK}"/><path d="M-5 150Q8 158 20 150L21 176Q8 186 -6 176Z" fill="#101016"/><path d="M-5 150Q8 158 20 150" fill="none" stroke="#101016" stroke-width="3" stroke-dasharray=".1 3.500"/>` +
      // short leopard robe
      `<path d="M-38 6Q-46 30 -40 56Q-30 80 -24 96Q-46 122 -46 152L-48 210Q-24 220 -6 214L2 104L-2 64L-16 -4Q-28 -2 -38 6Z" fill="${R}"/><path d="M38 6Q48 30 42 56Q36 80 30 96Q58 120 64 152L66 206Q42 220 22 214L12 104L16 64L24 -4Q32 -2 38 6Z" fill="${R}"/>` +
      `<path d="M24 -4L16 64L12 104L22 214Q42 220 66 206L64 152Q58 120 30 96Z" fill="#000" opacity=".1"/><path d="M-16 -4L-2 64L2 104M24 -4L16 64L12 104" fill="none" stroke="#101016" stroke-width="2.500"/><path d="M-48 210Q-24 220 -6 214M22 214Q42 220 66 206" fill="none" stroke="#101016" stroke-width="4" stroke-dasharray=".1 4"/>` +
      `<path d="M-25 92Q4 104 31 92L32 105Q4 117 -25 104Z" fill="#ff2f9a"/><path d="M6 100Q-10 84 -14 100Q-12 112 6 104Q22 114 24 100Q20 84 6 100Z" fill="#ff2f9a" stroke="#c01870" stroke-width="1.500"/><path d="M2 106l-8 30M10 106l6 28" stroke="#ff2f9a" stroke-width="5"/>` +
      // head
      `<ellipse cx="-22" cy="-52" rx="4" ry="7" fill="${SK}"/><path d="M-22 -52C-22 -90 22 -90 22 -52C22 -34 14 -18 0 -18C-14 -18 -22 -34 -22 -52Z" fill="${SK}"/><path d="M5 -80C22 -78 22 -60 22 -52C22 -34 14 -18 0 -18C7 -30 9 -42 6 -54Z" fill="${SH}" opacity=".6"/>` +
      `<path d="M-16 -55Q-9 -64 -3 -55ZM3 -55Q9 -64 16 -55Z" fill="#2ad0e8"/><path d="M-16 -54Q-9 -50 -3 -54M3 -54Q9 -50 16 -54M-17 -55l-3-3M17 -55l3-3" stroke="#1a1210" stroke-width="2" fill="none"/><path d="M-16 -64q7-5 13-2M3 -66q7-3 13 2" stroke="#5a1a1c" stroke-width="2.200" fill="none"/>` +
      `<path d="M1 -50q3 7 1 10" stroke="#000" stroke-opacity=".3" stroke-width="1.500" fill="none"/><path d="M-5 -33Q-3 -39 0 -36Q3 -39 5 -33Q3 -26 0 -28Q-3 -26 -5 -33Z" fill="#e0206a"/><circle cx="-14" cy="-42" r="5" fill="#ff5a8a" opacity=".4"/>` +
      `<path d="M-24 -46C-30 -92 8 -96 12 -84C26 -86 28 -66 23 -48C20 -64 14 -72 6 -74C-4 -64 -18 -64 -24 -46Z" fill="#a02a38"/><circle cx="-23" cy="-38" r="7" fill="none" stroke="${GOLD}" stroke-width="2"/><circle cx="23" cy="-38" r="7" fill="none" stroke="${GOLD}" stroke-width="2"/>` +
      // arms: hand on hip, phone up
      `<path d="M-36 14L-66 62" stroke="${R}" stroke-width="24"/><path d="M-66 62L-38 112" stroke="${SK}" stroke-width="15"/><circle cx="-38" cy="114" r="10" fill="${SK}"/><path d="M-34 108l12 6M-34 114l13 3M-35 120l11 0" stroke="#ff2f9a" stroke-width="3.500"/>` +
      `<path d="M38 14L70 46" stroke="${R}" stroke-width="24"/><path d="M70 46L52 -14" stroke="${SK}" stroke-width="15"/>` +
      `<g transform="rotate(-10 50 -40)"><rect x="34" y="-70" width="32" height="56" rx="6" fill="#ff7ac0" stroke="#fff" stroke-width="1.500"/><rect x="38" y="-66" width="13" height="13" rx="3" fill="#2a0420"/><circle cx="44.500" cy="-59.500" r="3.200" fill="#4a6aa0"/>` + sparkle(56, -36, 5) + sparkle(44, -26, 3) + `</g>` +
      `<circle cx="52" cy="-20" r="10" fill="${SK}"/><path d="M44 -26l-12-3M44 -20l-13 0M45 -14l-11 3" stroke="#ff2f9a" stroke-width="3.500"/></g>`) +
    sparkle(60, 420, 12, '#fff') + sparkle(330, 220, 9, '#fff') +
    // mirror frame + bulbs
    `<rect x="7" y="7" width="586" height="786" fill="none" stroke="#fff0fa" stroke-width="14"/>${[60, 140, 220, 300, 380, 460, 540].map((x) => `<circle cx="${x}" cy="34" r="24" fill="#fff6c0" opacity=".35"/><circle cx="${x}" cy="34" r="12" fill="#fffbe6"/>`).join('')}`;
  return frame(k, 600, 800, defs, body, 0.16, 0.45);
})();
