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
      s += `<circle cx="${x}" cy="${y}" r="21" fill="${c}"/><circle cx="${x + 3}" cy="${y + 4}" r="17" fill="#000" opacity=".12"/><circle cx="${x - 7}" cy="${y - 8}" r="5" fill="#fff" opacity=".7"/>`;
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
  overNeck: `<path d="M69 92L71 124Q75 136 90 137H110Q125 136 129 124L131 92Z" fill="#dca680"/><path d="M106 137H110Q125 136 129 124L131 92H108Z" fill="#9a6a50" opacity=".72"/><path d="M129 124L131 96" stroke="#d8f0ff" stroke-width="4" opacity=".8"/>`,
  brows: 'M76 79Q86 80 96 85M104 85Q114 80 124 79', browC: '#6e7278',
  mouth: `<path d="M89 116.500Q100 113.500 111 116.500" stroke="#5a2a20" stroke-width="2.800"/><path d="M86 115l3 2M114 115l-3 2" stroke="#5a2a20" stroke-width="1.6"/>`,
  lines: `<path d="${WRINKLES}M96 76v7M104 76v7" stroke="#7a4a34" stroke-width="1.2" opacity=".65"/>`,
  hair: `<path d="M66 80C61 37 139 37 134 80C130 60 118 51 100 51C82 51 70 60 66 80Z" fill="#a4a8ae" opacity=".92"/><path d="M72 62q4-10 14-13M84 50q8-3 16-3M106 47q12 1 18 9M126 60q4 6 5 12" stroke="#d8dce0" stroke-width="1.4" fill="none" stroke-dasharray="1.500 2.500"/>`,
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
