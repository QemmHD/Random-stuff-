// COLD SIGNAL — Case 05 "The Last Room" illustrations.
// Every value in `case5Art` is a complete standalone SVG document string.
// Ids inside each SVG are prefixed with the art key. Original art, no external references.

/** Art registry for Case 05. Keys are the art ids referenced by src/cases/case5.ts. */
export const case5Art: Record<string, string> = {};
const A = case5Art;

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


const KEYLOGO = (x: number, y: number, c: string): string =>
  `<g transform="translate(${x} ${y})" fill="none" stroke="${c}" stroke-width="1.6"><circle r="4.500"/><path d="M0 4.500v12M0 11h4M0 15h3"/></g>`;

A.av_c5_owen = bust('av_c5_owen', {
  bg: ['#c9a468', '#5e4526', '#150e07'], rim: '#ffe2a8', cloth: '#8a7350',
  clothIn:
    `<path d="M80 146L100 190L120 146Z" fill="#1f5c5e"/><path d="M82 146L100 166L92 172L78 150ZM118 146L100 166L108 172L122 150Z" fill="#2c7a7c"/>` +
    `<path d="M70 150L96 200H60L44 160ZM130 150L104 200H140L156 160Z" fill="#6f5b3c"/><path d="M72 152L97 200M128 152L103 200" stroke="#a48c62" stroke-width="2.500" fill="none"/>` +
    `<path d="M40 166q30 10 22 34M160 166q-30 10-22 34" stroke="#6f5b3c" stroke-width="1.500" fill="none" opacity=".7"/>` +
    `<path d="M86 148Q92 182 100 196Q108 182 114 148" fill="none" stroke="#e0b53a" stroke-width="2.600"/><circle cx="100" cy="194" r="5" fill="none" stroke="#d8d2c0" stroke-width="2"/>` +
    KEYLOGO(124, 176, '#e9c66a'),
  skin: '#e6bc98', shade: '#a87c60', iris: '#5a4028', lid: 86.8, low: 94,
  inFace: `<path d="M65 92C68 106 78 104 88 106Q100 102 112 106C122 104 132 106 135 92V134H65Z" fill="#6e4a2e"/><path d="M110 104C122 104 132 106 135 92V134H104Z" fill="#000" opacity=".2"/>`,
  brows: 'M77.500 80.500Q86 75.500 95 78.500M105 78.500Q114 75.500 122.500 80.500', browC: '#5a3c24',
  mouth: `<path d="M88 109Q100 104 112 109Q100 113 88 109Z" fill="#6e4a2e" stroke="#5a3c24" stroke-width="2"/><path d="M90 114.500Q100 121.500 110 114.500" stroke="#f3e6da" stroke-width="2.600"/>`,
  lines: `<path d="M74 88q-3 2-4 5M126 88q3 2 4 5" stroke="#8a5f48" stroke-width="1.200" opacity=".6"/>`,
  hair: `<path d="M64 88C58 46 84 34 100 34C118 34 142 46 136 88C133 70 126 58 110 54C98 62 76 64 64 88Z" fill="#6e4a2e"/><path d="M70 64Q80 46 98 42M108 52Q122 56 129 70" fill="none" stroke="#a37a52" stroke-width="2" stroke-linecap="round"/>`,
  top: `<g fill="#fff1d0" fill-opacity=".14" stroke="#8a5424" stroke-width="2.600"><circle cx="87" cy="91" r="11"/><circle cx="113" cy="91" r="11"/><path d="M98 90Q100 88 102 90M76 89L67 86M124 89L133 86" fill="none"/></g><path d="M78 86a11 11 0 0 1 12-6M104 86a11 11 0 0 1 12-6" stroke="#d99a4a" stroke-width="1.400" fill="none"/><path d="M108 84h8l-6 11h-4z" fill="#fff" opacity=".35"/>`,
});

A.av_c5_julian = bust('av_c5_julian', {
  bg: ['#8ea2c8', '#2b3a5c', '#080c18'], rim: '#e2ebff', cloth: '#18264a',
  clothIn:
    `<path d="M82 146L100 188L118 146Z" fill="#f2f4f8"/><path d="M96 152h8l3 10-7 34-7-34z" fill="#a8222a"/><path d="M96 152h8l2 7h-12z" fill="#7c161d"/>` +
    `<path d="M70 150L86 142L101 196L96 200H74Z" fill="#22335e"/><path d="M130 150L114 142L99 196L104 200H126Z" fill="#101b38"/>` +
    `<path d="M82 146L100 166L90 172L78 150ZM118 146L100 166L110 172L122 150Z" fill="#fff"/>` +
    `<circle cx="72" cy="176" r="9.500" fill="#f4f1e6" stroke="#a8222a" stroke-width="2"/><text x="72" y="175.500" ${MID} ${SANS} ${BOLD} font-size="5.600" fill="#18264a" ${fit(15)}>ASHE</text><path d="M65 178.500h14" stroke="#a8222a" stroke-width="1.400"/><text x="72" y="182.500" ${MID} ${SANS} ${BOLD} font-size="2.600" fill="#18264a" ${fit(12)}>TRUTH MATTERS</text>`,
  skin: '#e9c4a4', shade: '#a98068', iris: '#3f5f7a', lid: 87.600, low: 93.600,
  brows: 'M77.500 81Q86 77.500 95 79.500M105 79.500Q114 77.500 122.500 81', browC: '#3a2a1e',
  mouth: `<path d="M90 115.500Q100 117.500 110 115.500" stroke="#8a4a48" stroke-width="2.300"/><path d="M88.500 114.500l1.500 1.500M111.500 114.500l-1.500 1.500" stroke="#8a4a48" stroke-width="1.300"/>`,
  lines: `<path d="M87 106Q85 111 86.500 115M113 106Q115 111 113.500 115" stroke="#8a5f4c" stroke-width="1.100" opacity=".5"/>`,
  hair: `<path d="M64 90C56 40 90 28 108 31C132 33 144 52 136 90C134 72 128 60 116 56C98 58 76 50 66 70Z" fill="#4a3424"/><path d="M68 66Q84 40 112 38M76 60Q92 48 114 48" fill="none" stroke="#8a6a48" stroke-width="2.200" stroke-linecap="round"/><path d="M66 70Q70 58 78 52" fill="none" stroke="#2c1e14" stroke-width="2"/>`,
});

A.av_c5_nadia = bust('av_c5_nadia', {
  bg: ['#b8a7b4', '#52424e', '#120c12'], rim: '#ffe6ee', cloth: '#ece2ca',
  clothIn: `<path d="M30 170q20 12 16 30M170 170q-20 12-16 30M60 160q10 20 8 40M140 160q-10 20-8 40" stroke="#c8bb9c" stroke-width="2" fill="none"/>`,
  back: `<path d="M58 100C46 34 86 22 100 22C116 22 154 34 142 100C146 134 154 160 146 190H54C46 160 54 134 58 100Z" fill="#1c1418"/><path d="M110 24C150 34 148 80 142 100C146 134 154 160 146 190H120Z" fill="#000" opacity=".3"/><path d="M60 110Q54 150 58 186M142 112Q148 150 142 186" stroke="#463440" stroke-width="2" fill="none"/>`,
  overNeck: `<path d="M72 136Q100 164 128 136L134 156Q100 178 66 156Z" fill="#f4ecd8"/><path d="M70 148Q100 172 130 148" fill="none" stroke="#c8bb9c" stroke-width="1.800"/>`,
  skin: '#d9a886', shade: '#996e58', iris: '#3a2618', lid: 84.800, low: 95.200,
  brows: 'M77.500 83Q86 79.500 95 76.500M105 76.500Q114 79.500 122.500 83', browC: '#1c1418',
  mouth: `<path d="M92 116.500Q100 115 108 117" stroke="#9a4a50" stroke-width="2.300"/>`,
  lines: `<path d="M81 98Q87 100.500 93 98M107 98Q113 100.500 119 98M96 73q4-2 8 0" stroke="#7d5647" stroke-width="1.100" opacity=".55"/>`,
  hair: `<path d="M62 104C54 44 84 31 100 31C116 31 146 44 138 104C137 76 128 60 104 50C90 62 66 70 62 104Z" fill="#1c1418"/><path d="M68 74Q78 48 100 41M108 52Q124 60 131 80" fill="none" stroke="#4a3844" stroke-width="2" stroke-linecap="round"/>`,
  top: `<g fill="none" stroke="#dfe4ea" stroke-width="2"><circle cx="64" cy="112" r="8"/><circle cx="136" cy="112" r="8" opacity=".7"/></g>`,
});

A.av_c5_mira = bust('av_c5_mira', {
  bg: ['#c07a6a', '#5a2c30', '#150a0e'], rim: '#ffd0c0', cloth: '#4d6f96',
  clothIn:
    `<path d="M82 146L100 184L118 146Z" fill="#17181c"/><path d="M68 148L86 142L98 176L84 190ZM132 148L114 142L102 176L116 190Z" fill="#6f93bc"/><path d="M70 150l15 36M130 150l-15 36M40 166l12 34M160 166l-12 34" stroke="#e0b060" stroke-width="1.200" stroke-dasharray="3 2" fill="none"/>` +
    `<circle cx="78" cy="192" r="3" fill="#c9a050"/><circle cx="122" cy="192" r="3" fill="#c9a050"/>`,
  skin: '#e2b494', shade: '#a2745c', iris: '#3c4c40', lid: 87.200, low: 94,
  inFace: `<ellipse cx="87" cy="91.500" rx="10" ry="5.500" fill="#c2463e" opacity=".42"/><ellipse cx="113" cy="91.500" rx="10" ry="5.500" fill="#c2463e" opacity=".42"/>`,
  brows: 'M77 77.500Q87 78 95.500 82.500M104.500 82.500Q113 78 123 77.500', browC: '#1a1216',
  mouth: `<path d="M91 116.500Q100 114 109 116.500" stroke="#8f3a40" stroke-width="2.400"/>`,
  lines: `<path d="M81 97.500Q87 99.500 93 97.500M107 97.500Q113 99.500 119 97.500" stroke="#a84a44" stroke-width="1.200" opacity=".7"/><path d="M103.500 107.500a3 3 0 1 0 2.500 2" stroke="#e4e8ec" stroke-width="1.500"/>`,
  hair: `<path d="M64 88C58 44 86 30 104 31C128 33 142 50 136 86C132 74 128 66 122 60C104 62 84 56 76 62C70 68 66 78 64 88Z" fill="#1a1216"/><path d="M76 62L70 80L82 60L80 74L90 58M122 60L128 76" stroke="#1a1216" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M72 58Q86 40 108 38" fill="none" stroke="#5a3a48" stroke-width="2.200" stroke-linecap="round"/>`,
});

A.av_c5_tess = bust('av_c5_tess', {
  bg: ['#8fa6a8', '#36494e', '#0a1114'], rim: '#d6f2ee', cloth: '#1e2228',
  clothIn:
    `<path d="M82 146Q100 164 118 146" fill="none" stroke="#3a4048" stroke-width="5"/>` + KEYLOGO(78, 170, '#c9a24c') +
    `<rect x="110" y="172" width="44" height="17" rx="3" fill="#f3efe2" stroke="#c9a24c" stroke-width="1.400"/><text x="132" y="185" ${MID} ${SANS} ${BOLD} font-size="11" fill="#1e2228" ${fit(32)}>TESS</text>`,
  back: `<path d="M124 44C150 40 164 60 158 92C154 118 160 138 150 152C144 134 140 110 134 96Z" fill="#a8843e"/><path d="M146 56Q156 80 150 110M152 100Q154 124 150 144" stroke="#d8b666" stroke-width="2" fill="none"/>`,
  skin: '#e8c2a2', shade: '#a67e66', iris: '#8a959b', lid: 86.200, low: 93.800,
  brows: 'M77.500 80Q86 77 95 79.500M105 79.500Q114 77 122.500 80', browC: '#7a5c2e',
  mouth: `<path d="M91 116Q100 117.500 109 116" stroke="#9a5450" stroke-width="2.300"/>`,
  lines: `<path d="M81 98Q87 99.500 93 98M107 98Q113 99.500 119 98" stroke="#7d5647" stroke-width="1" opacity=".45"/>`,
  hair: `<path d="M64 90C58 44 84 31 102 32C124 33 142 48 136 88C134 70 126 56 112 50C96 54 72 60 64 90Z" fill="#a8843e"/><path d="M70 66Q82 44 104 40M112 50Q124 54 130 68" fill="none" stroke="#d8b666" stroke-width="2" stroke-linecap="round"/><path d="M124 44q8 2 10 10" stroke="#3a2c14" stroke-width="3" fill="none"/>`,
});

A.av_c5_ruth = bust('av_c5_ruth', {
  bg: ['#c8b8d8', '#5c4c72', '#120e1a'], rim: '#fff0dc', cloth: '#a48ccc',
  clothIn:
    `<path d="M80 146L100 192L120 146Z" fill="#f2ecf4"/><path d="M72 150L98 200H66L48 160ZM128 150L102 200H134L152 160Z" fill="#8d74b8"/><path d="M74 152L99 200M126 152L101 200" stroke="#c4b0e4" stroke-width="2.400" fill="none"/>` +
    `<path d="M86 148Q100 176 114 148" fill="none" stroke="#e8c048" stroke-width="1.200"/><path d="M100 162v12M96 166h8" stroke="#e8c048" stroke-width="2.400"/>`,
  back: `<g fill="#d8dade"><circle cx="66" cy="70" r="14"/><circle cx="134" cy="70" r="14"/><circle cx="62" cy="92" r="12"/><circle cx="138" cy="92" r="12"/><circle cx="78" cy="48" r="15"/><circle cx="122" cy="48" r="15"/><circle cx="100" cy="40" r="16"/><circle cx="66" cy="110" r="9"/><circle cx="134" cy="110" r="9"/></g>`,
  skin: '#e8c6ae', shade: '#aa8472', iris: '#5a6e80', lid: 87.800, low: 93.600,
  brows: 'M77.500 81.500Q86 77.500 95 79.500M105 79.500Q114 77.500 122.500 81.500', browC: '#b4b6bc',
  mouth: `<path d="M90 114.500Q100 120 110 114.500" stroke="#a05a5c" stroke-width="2.200"/>`,
  lines: `<path d="${WRINKLES}M76 86q-4 2-6 5M124 86q4 2 6 5M86 68q14-4 28 0M88 62q12-3 24 0" stroke="#8a6050" stroke-width="1.200" opacity=".55"/>`,
  hair: `<g fill="#eceef0"><circle cx="76" cy="58" r="12"/><circle cx="92" cy="48" r="13"/><circle cx="110" cy="48" r="13"/><circle cx="125" cy="58" r="12"/><circle cx="68" cy="74" r="9"/><circle cx="132" cy="74" r="9"/></g><path d="M70 60a10 10 0 0 1 12-9M88 46a10 10 0 0 1 12-7M106 44a10 10 0 0 1 14 0" stroke="#fff" stroke-width="1.800" fill="none"/><path d="M84 56q4 6 12 2M104 56q6 6 14 0" stroke="#b8bcc4" stroke-width="1.500" fill="none"/>`,
});

A.av_c5_ibarra = bust('av_c5_ibarra', {
  bg: ['#a89a7a', '#4a4232', '#100e08'], rim: '#f4e6c4', cloth: '#7c6c50',
  clothIn:
    `<path d="M20 160l160 44M10 180l150 40M50 150l140 40M180 160L20 204M190 180L40 220M150 150L10 190" stroke="#5c4e38" stroke-width="1.200" fill="none" opacity=".8"/>` +
    `<path d="M82 146L100 190L118 146Z" fill="#e6e2d4"/><path d="M68 150L86 142L101 196L96 200H72Z" fill="#8a7a5c"/><path d="M132 150L114 142L99 196L104 200H128Z" fill="#5e5040"/>` +
    `<path d="M100 156l-15-7v15zM100 156l15-7v15z" fill="#7a2a30"/><rect x="96.500" y="152" width="7" height="8" rx="2" fill="#5a1c22"/><path d="M90 153v6M110 153v6" stroke="#b05a5e" stroke-width="1"/>` +
    `<g transform="rotate(-8 40 190)"><rect x="14" y="178" width="58" height="8" fill="#d8c890"/><rect x="18" y="186" width="58" height="8" fill="#c8a46a"/><rect x="12" y="194" width="62" height="8" fill="#e4dcc0"/><rect x="56" y="174" width="12" height="5" fill="#b0483c"/></g>`,
  skin: '#c99a76', shade: '#8a6248', iris: '#2e2218', lid: 87.800, low: 93.400,
  brows: 'M76.500 80.500Q86 75.500 95.500 79.500M104.500 79.500Q114 75.500 123.500 80.500', browC: '#8c8e90',
  mouth: `<path d="M86 113Q93 105 100 109Q107 105 114 113Q107 115 100 112Q93 115 86 113Z" fill="#b8babc" stroke="#8c8e90" stroke-width="1.600"/><path d="M93 118Q100 120 107 118" stroke="#6e423a" stroke-width="2"/>`,
  lines: `<path d="${WRINKLES}M76 86q-4 2-6 5M124 86q4 2 6 5M84 66q16-4 32 0M86 59q14-3 28 0" stroke="#6e4a38" stroke-width="1.200" opacity=".6"/>`,
  hair: `<path d="M64 88C60 50 80 38 100 38C120 38 140 50 136 88C134 72 128 62 118 58C106 52 90 52 80 58C70 62 66 74 64 88Z" fill="#9a9c9e"/><path d="M70 66Q78 50 94 46M110 46Q124 52 130 68" fill="none" stroke="#d0d2d4" stroke-width="2" stroke-linecap="round"/>`,
});

A.av_c5_vera = bust('av_c5_vera', {
  bg: ['#3fb0b4', '#13565e', '#04161c'], rim: '#9ff4ec', cloth: '#15191e',
  clothIn:
    `<path d="M70 150L88 143L100 178L88 192ZM130 150L112 143L100 178L112 192Z" fill="#262c34"/><path d="M100 178V200" stroke="#3a424c" stroke-width="2"/>` +
    `<path d="M88 148Q100 176 112 148" fill="none" stroke="#d9b45a" stroke-width="1.200"/>` + KEYLOGO(100, 168, '#f0c85a') +
    ``,
  back: `<path d="M58 96C48 38 84 24 102 25C130 26 152 44 142 96C146 110 146 126 138 138H62C54 126 54 110 58 96Z" fill="#17131a"/><path d="M110 26C150 36 148 80 142 96C146 110 146 126 138 138H118Z" fill="#000" opacity=".3"/>`,
  skin: '#dcae8c', shade: '#9a705a', iris: '#2c2018', lid: 86.600, low: 94,
  brows: 'M77.500 80Q86 76.500 95 79M105 79Q114 75.500 122.500 79', browC: '#17131a',
  mouth: `<path d="M90 115Q100 119 110 114" stroke="#9a3c44" stroke-width="2.400"/><path d="M110 114q2-.500 3-2" stroke="#9a3c44" stroke-width="1.300"/>`,
  lines: `<path d="M81 98Q87 100 93 98M107 98Q113 100 119 98M87 106Q85 111 86.500 115" stroke="#7d5647" stroke-width="1.100" opacity=".5"/>`,
  hair:
    `<path d="M62 98C54 42 84 30 102 31C126 32 146 46 138 98C136 78 130 66 120 60C100 64 74 62 62 98Z" fill="#17131a"/>` +
    `<path d="M66 64C74 46 126 44 134 62L135 72C122 56 78 58 65 74Z" fill="#e2b02c"/><path d="M68 66Q100 48 133 64" fill="none" stroke="#fbe07a" stroke-width="1.400"/><path d="M80 60l3 5M100 55v6M120 59l-3 5" stroke="#8a6410" stroke-width="1.600"/>` +
    `<path d="M70 52Q84 36 106 36" fill="none" stroke="#4a3c58" stroke-width="2.200" stroke-linecap="round"/><path d="M64 88q-4 14 0 30M136 88q4 14 0 30" stroke="#17131a" stroke-width="5" fill="none" stroke-linecap="round"/>`,
});

// ════════════════════════════════════════════════════════════════ RECURRING OBJECTS
const HAND = 'font-family="Marker Felt, Chalkboard SE, Comic Sans MS, sans-serif"';
/** Text with a width proportional to its length (cw = em fraction per character). */
const ln = (x: number, y: number, size: number, s: string, fill: string, font = SANS, cw = 0.56, ex = ''): string =>
  tx(x, y, size, s, fill, font, `${fit(r0(s.length * size * cw))}${ex ? ' ' + ex : ''}`);
/** Rippling water-light: bright thin veins on transparent. */
const caus = (id: string, fx: number, fy: number, rgb = '.55 1 .95', k = -9, b = 1.5, seed = 4): string =>
  `<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="turbulence" baseFrequency="${fx} ${fy}" numOctaves="2" seed="${seed}"/><feColorMatrix values="0 0 0 0 ${rgb.split(' ')[0]} 0 0 0 0 ${rgb.split(' ')[1]} 0 0 0 0 ${rgb.split(' ')[2]} ${k} 0 0 0 ${b}"/></filter>`;
/** Chalk / dry-marker erosion for handwriting. */
const chalk = (id: string, f = 1.1, k = -1.7, b = 1.55): string =>
  `<filter id="${id}" x="-5%" y="-20%" width="110%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="${f}" numOctaves="2" seed="5"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 ${k} 0 0 0 ${b}" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter>`;

const KEYS: [string, string][] = [['1', ''], ['2', 'ABC'], ['3', 'DEF'], ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'], ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'], ['*', ''], ['0', 'OPER'], ['#', '']];
/**
 * The beige 1970s wall phone. Origin = top centre of the body; body 340 x 330 at s=1,
 * coiled cord loops below. `detail` draws the key legends.
 */
const wallPhone = (x: number, y: number, s: number, detail = true): string => {
  let keys = '';
  KEYS.forEach(([d, l], i) => {
    const kx = -50 + (i % 3) * 70, ky = 22 + Math.floor(i / 3) * 68;
    keys += `<rect x="${kx}" y="${ky + 4}" width="62" height="58" rx="7" fill="#6e6044"/><rect x="${kx}" y="${ky}" width="62" height="58" rx="7" fill="#f4ecd6"/><rect x="${kx + 3}" y="${ky + 3}" width="56" height="20" rx="5" fill="#fff" opacity=".45"/>`;
    if (detail)
      keys += l
        ? `<text x="${kx + 31}" y="${ky + 29}" font-size="28">${d}</text><text x="${kx + 31}" y="${ky + 50}" font-size="16" ${fit(l.length * 12)}>${l}</text>`
        : `<text x="${kx + 31}" y="${ky + (d === '*' ? 50 : 40)}" font-size="${d === '*' ? 40 : 30}">${d}</text>`;
  });
  return (
    `<g transform="translate(${x} ${y}) scale(${s})">` +
    // coiled cord
    `<path d="M-116 300C-150 470-90 560-40 520C-6 492-26 380-22 326" fill="none" stroke="#8d7c56" stroke-width="15" stroke-linecap="round"/><path d="M-116 300C-150 470-90 560-40 520C-6 492-26 380-22 326" fill="none" stroke="#dccca4" stroke-width="11" stroke-dasharray="5 4"/>` +
    `<rect x="-170" y="0" width="340" height="330" rx="26" fill="#a39168"/><rect x="-170" y="0" width="340" height="322" rx="26" fill="#d8c8a0"/>` +
    `<path d="M-146 6h292q18 0 18 20v20h-328v-20q0-20 18-20z" fill="#efe4c6" opacity=".7"/><path d="M40 0h104q26 0 26 26v270q0 26-26 26h-60z" fill="#7a6840" opacity=".22"/>` +
    // handset on its cradle (left)
    `<rect x="-152" y="60" width="74" height="200" rx="12" fill="#a39168"/><rect x="-150" y="16" width="70" height="296" rx="30" fill="#8d7c56"/><rect x="-150" y="12" width="70" height="292" rx="30" fill="#e4d6b0"/>` +
    `<rect x="-142" y="20" width="22" height="270" rx="11" fill="#f6eed6" opacity=".7"/><rect x="-150" y="92" width="70" height="130" fill="#cdbc92"/><rect x="-142" y="92" width="16" height="130" fill="#efe4c6" opacity=".6"/>` +
    `<path d="M-150 92h70M-150 222h70" stroke="#8d7c56" stroke-width="3"/>` +
    // keypad plate
    `<rect x="-62" y="12" width="222" height="290" rx="12" fill="#8d7c56"/><rect x="-60" y="12" width="218" height="286" rx="12" fill="#b3a27a"/>` +
    `<g ${MID} ${SANS} ${BOLD} fill="#1d1a14">${keys}</g>` +
    `</g>`
  );
};

/** The final box (small scene version). Origin = bottom centre; 200 x 150 at s=1. */
const finalBox = (k: string, x: number, y: number, s: number, t = '47:59'): string =>
  `<g transform="translate(${x} ${y}) scale(${s})">` +
  `<ellipse cx="0" cy="6" rx="150" ry="26" fill="#ff2a1c" opacity=".28" filter="url(#${k}b8)"/>` +
  `<path d="M-100-110l14-26h172l14 26z" fill="#aeb8bd"/><rect x="-100" y="-110" width="200" height="110" rx="5" fill="url(#${k}bx)"/>` +
  `<path d="M-100-92h200" stroke="#2a3237" stroke-width="3"/><path d="M-100-110h200" stroke="#e4ecef" stroke-width="2" opacity=".7"/>` +
  `<g fill="#3a444a"><circle cx="-90" cy="-78" r="3.500"/><circle cx="90" cy="-78" r="3.500"/><circle cx="-90" cy="-12" r="3.500"/><circle cx="90" cy="-12" r="3.500"/><circle cx="-90" cy="-45" r="3.500"/><circle cx="90" cy="-45" r="3.500"/></g>` +
  `<rect x="-62" y="-72" width="124" height="46" rx="4" fill="#120405" stroke="#2a3237" stroke-width="3"/>` +
  `<text x="0" y="-36" ${MID} ${MONO} ${BOLD} font-size="38" fill="#ff3524" ${fit(104)}>${t}</text><rect x="-14" y="-104" width="28" height="12" rx="3" fill="#3a444a"/></g>`;

/** Auto-injector pen lying along +x. Origin = centre; 220 long at s=1. `cap` colour; `word` printed on barrel. */
const pen = (x: number, y: number, s: number, rot: number, cap: string, capD: string, word = ''): string =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">` +
  `<rect x="-110" y="-19" width="52" height="38" rx="9" fill="${cap}"/><rect x="-110" y="3" width="52" height="16" rx="8" fill="${capD}"/><path d="M-98-19v38M-88-19v38M-78-19v38" stroke="${capD}" stroke-width="2"/>` +
  `<rect x="-60" y="-17" width="146" height="34" rx="5" fill="#eef1f2"/><rect x="-60" y="4" width="146" height="13" fill="#b9c1c6"/><rect x="-46" y="-13" width="112" height="24" rx="2" fill="${word ? '#dfe3e6' : '#f6f0d2'}"/>` +
  (word
    ? `<text x="10" y="6" ${MID} ${SANS} ${BOLD} font-size="20" fill="#30383e" ${fit(98)}>${word}</text>`
    : `<rect x="-40" y="-9" width="34" height="16" fill="#d9a514"/><path d="M0-7h58M0-1h58M0 5h40" stroke="#5a6066" stroke-width="2.400"/>`) +
  `<rect x="84" y="-14" width="26" height="28" rx="6" fill="${word ? '#9aa2a8' : '#ee7a26'}"/><rect x="84" y="2" width="26" height="12" rx="6" fill="#000" opacity=".2"/></g>`;

// ════════════════════════════════════════════════════════════════ COVER
A.cover_case5 = (() => {
  const k = 'cover_case5';
  let bolts = '';
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2 + 0.2;
    bolts += `<circle cx="${r0(300 + Math.cos(a) * 247)}" cy="${r0(350 + Math.sin(a) * 247)}" r="7"/>`;
  }
  const defs =
    lg(`${k}w`, [[0, '#232b30'], [0.5, '#12171a'], [1, '#040506']]) +
    rg(`${k}ring`, [[0.78, '#0d1113'], [0.84, '#59676e'], [0.9, '#aebcc2'], [0.95, '#4a565c'], [1, '#12171a']], 0.5, 0.5, 0.5) +
    lg(`${k}bw`, [[0, '#0a3a48'], [0.45, '#1590a0'], [1, '#0b5866']]) +
    lg(`${k}fl`, [[0, '#0c6876'], [1, '#03232c']]) +
    lg(`${k}rk`, [[0, '#7fd2cf'], [0.3, '#2a8088'], [1, '#0a2c36']]) +
    lg(`${k}bx`, [[0, '#c4ced2'], [0.5, '#7f8b91'], [1, '#3a444a']]) +
    lg(`${k}dr`, [[0, '#050607'], [0.5, '#4c595f'], [0.8, '#aab8be'], [1, '#2a3236']], 1, 0) +
    rg(`${k}gl`, [[0, '#7ff4ee', 0.75], [0.5, '#2cc0c4', 0.25], [1, '#2cc0c4', 0]]) +
    lg(`${k}sp`, [[0, '#48dcd8', 0.55], [1, '#48dcd8', 0]]) +
    caus(`${k}ca`, 0.012, 0.05) + caus(`${k}cw`, 0.02, 0.016, '.7 1 1', -8, 1.2, 9) +
    bl(`${k}b3`, 3) + bl(`${k}b8`, 8) + bl(`${k}b20`, 20) +
    `<clipPath id="${k}c"><circle cx="300" cy="350" r="214"/></clipPath><clipPath id="${k}f"><path d="M40 468h520l160 140h-840z"/></clipPath>`;
  const room =
    `<g clip-path="url(#${k}c)"><rect x="60" y="110" width="480" height="480" fill="url(#${k}bw)"/>` +
    `<rect x="60" y="110" width="480" height="360" filter="url(#${k}cw)" opacity=".5"/>` +
    `<path d="M60 110l110 60v300l-110 120zM540 110l-110 60v300l110 120z" fill="#041c24" opacity=".6"/>` +
    `<path d="M60 110h480l-110 60h-260z" fill="#03141a" opacity=".8"/>` +
    // floor of light
    `<path d="M170 468h260l110 122h-480z" fill="url(#${k}fl)"/><g clip-path="url(#${k}f)"><rect x="60" y="460" width="480" height="140" filter="url(#${k}ca)" opacity=".95"/></g>` +
    // rock ledge
    `<path d="M60 250l96-18 84 10 76 26-30 22-66 12-40 36-60 6-60 40z" fill="url(#${k}rk)"/><path d="M60 250l96-18 84 10 76 26-90 6-80-8z" fill="#b6f0ea" opacity=".75"/>` +
    `<path d="M146 276l14 72M220 302l-34 46M100 292l-18 62" stroke="#03242c" stroke-width="2" opacity=".6" fill="none"/><path d="M316 268l-30 22-66 12-40 36-60 6-60 40v40h80l70-40 60-60z" fill="#02181e" opacity=".45"/>` +
    // phone on the far wall
    `<ellipse cx="398" cy="262" rx="60" ry="70" fill="#ffe6a8" opacity=".22" filter="url(#${k}b8)"/>` + wallPhone(398, 232, 0.2, false) +
    finalBox(k, 300, 520, 0.56) +
    `<circle cx="300" cy="350" r="214" fill="none" stroke="#02090c" stroke-width="30" opacity=".55" filter="url(#${k}b8)"/></g>`;
  const body =
    `<rect width="600" height="800" fill="url(#${k}w)"/>` +
    `<path d="M0 120h600M0 610h600M110 0v800M490 0v800" stroke="#000" stroke-width="3" opacity=".5"/><path d="M0 123h600M113 0v800M493 0v800" stroke="#56646a" stroke-width="1" opacity=".5"/>` +
    `<circle cx="300" cy="350" r="290" fill="url(#${k}gl)" opacity=".5"/>` +
    `<circle cx="300" cy="350" r="268" fill="url(#${k}ring)"/><g fill="#1c2326" stroke="#8a989e" stroke-width="1.500">${bolts}</g>` +
    room +
    `<circle cx="300" cy="350" r="215" fill="none" stroke="#9ff4ee" stroke-width="2.500" opacity=".7"/>` +
    // light spilling over the threshold
    `<path d="M150 590h300l130 210h-560z" fill="url(#${k}sp)" opacity=".55"/><path d="M0 640h600M0 700h600" stroke="#000" stroke-width="3" opacity=".45"/><path d="M0 643h600" stroke="#6fd8d4" stroke-width="1" opacity=".25"/>` +
    // the open door, edge-on at the left
    `<g><ellipse cx="6" cy="350" rx="92" ry="300" fill="#000" opacity=".5" filter="url(#${k}b8)"/><ellipse cx="-14" cy="350" rx="92" ry="286" fill="url(#${k}dr)"/><ellipse cx="-22" cy="350" rx="70" ry="250" fill="#161c1f" stroke="#7d8b91" stroke-width="2"/>` +
    `<ellipse cx="-4" cy="350" rx="30" ry="100" fill="none" stroke="#b9a25a" stroke-width="7"/><path d="M-4 250v200M-34 350h60" stroke="#b9a25a" stroke-width="5"/>` +
    `<g fill="#aab8be"><rect x="60" y="180" width="26" height="22" rx="3"/><rect x="72" y="338" width="26" height="24" rx="3"/><rect x="60" y="500" width="26" height="22" rx="3"/></g>` +
    `<path d="M70 350q0-150-50-262" fill="none" stroke="#9ff4ee" stroke-width="3" opacity=".5"/></g>` +
    // EpiPen on the threshold
    `<ellipse cx="318" cy="734" rx="120" ry="14" fill="#000" opacity=".6" filter="url(#${k}b3)"/>` + pen(310, 716, 0.95, -9, '#f6cb1c', '#c79a0c') +
    `<rect width="600" height="800" fill="#06262c" opacity=".12"/>`;
  return frame(k, 600, 800, defs, body, 0.18, 0.62);
})();

// ════════════════════════════════════════════════════════════════ WALLPAPERS
A.wall_c5_lock = (() => {
  const k = 'wall_c5_lock';
  const R = rng(51);
  let riv = '';
  for (let y = 40; y < 1300; y += 86) riv += `<circle cx="34" cy="${y}" r="5"/><circle cx="566" cy="${y + 30}" r="5"/>`;
  for (let x = 90; x < 560; x += 94) riv += `<circle cx="${x}" cy="356" r="4"/><circle cx="${x + 20}" cy="1010" r="4"/>`;
  let smear = '';
  for (let i = 0; i < 7; i++) smear += `<ellipse cx="${r0(120 + R() * 380)}" cy="${r0(400 + R() * 140)}" rx="${r0(60 + R() * 80)}" ry="${r0(14 + R() * 20)}" transform="rotate(${r0(-12 + R() * 24)} 300 460)"/>`;
  const defs =
    lg(`${k}w`, [[0, '#0b2a33'], [0.45, '#0d3640'], [1, '#04141a']]) +
    rg(`${k}sp`, [[0, '#ffe9b8', 0.34], [0.55, '#e0c890', 0.08], [1, '#e0c890', 0]], 0.42, 0.5, 0.42) +
    lg(`${k}up`, [[0, '#2fd0d0', 0], [1, '#2fd0d0', 0.3]]) +
    lg(`${k}ph`, [[0, '#f0d2a4'], [1, '#c98e58']]) +
    caus(`${k}ca`, 0.006, 0.02, '.55 1 .95', -8, 1.15) + chalk(`${k}ch`) +
    bl(`${k}b3`, 3) + bl(`${k}b12`, 12) + bl(`${k}b40`, 40) +
    `<clipPath id="${k}pc"><rect x="-66" y="-84" width="132" height="130"/></clipPath>`;
  const snap =
    `<g transform="translate(503 664) rotate(5)"><rect x="-74" y="-92" width="156" height="196" fill="#000" opacity=".5" filter="url(#${k}b3)"/>` +
    `<rect x="-78" y="-98" width="156" height="196" fill="#ece3cc"/><rect x="-66" y="-84" width="132" height="130" fill="url(#${k}ph)"/><g clip-path="url(#${k}pc)">` +
    `<path d="M-66 10q40-26 70-10t62-6v52h-132z" fill="#6a4a30" opacity=".6"/>` +
    `<path d="M-52 46c2-38 22-52 42-56h32c22 4 38 20 40 56z" fill="#3c6e8a"/><path d="M-10-26h26v22q-13 12-26 0z" fill="#c98a64"/>` +
    `<ellipse cx="3" cy="-44" rx="27" ry="31" fill="#f6d2ae"/><path d="M-25-46c-6-36 18-42 30-42 16 0 32 8 26 42-4-14-10-22-18-24-10 8-30 4-38 24z" fill="#4a2e1a"/>` +
    `<circle cx="-7" cy="-46" r="3" fill="#c22a1c"/><circle cx="13" cy="-46" r="3" fill="#c22a1c"/><path d="M-10-34q13 16 26 0-13 4-26 0z" fill="#fff" stroke="#7a3a2a" stroke-width="1.500"/>` +
    `<path d="M34 46c0-30 6-44 18-50" stroke="#3c6e8a" stroke-width="18" fill="none" stroke-linecap="round"/><rect x="22" y="-22" width="44" height="28" rx="4" fill="#f4c81c"/><circle cx="36" cy="-8" r="7" fill="#2a2620"/><rect x="50" y="-18" width="12" height="7" fill="#fff"/><circle cx="52" cy="2" r="6" fill="#f6d2ae"/>` +
    `<rect x="-66" y="-84" width="132" height="130" fill="#ffb060" opacity=".2"/></g>` +
    `<g transform="rotate(-4)"><rect x="-58" y="54" width="116" height="36" fill="#e9dfb4" opacity=".96"/><path d="M-58 54l-5 6 5 6-5 6 5 6-5 6 5 6M58 54l5 6-5 6 5 6-5 6 5 6-5 6" fill="none" stroke="#e9dfb4" stroke-width="3"/>` +
    `<text x="0" y="83" ${MID} ${HAND} ${BOLD} font-size="33" fill="#1c1a16" ${fit(78)}>LOW</text></g>` +
    `<rect x="-30" y="-110" width="60" height="24" fill="#d9d0a8" opacity=".85" transform="rotate(-3)"/></g>`;
  const body =
    `<rect width="600" height="1300" fill="url(#${k}w)"/>` +
    `<rect width="600" height="1300" filter="url(#${k}ca)" opacity=".22"/>` +
    `<path d="M0 340h600M0 1026h600" stroke="#020a0d" stroke-width="5"/><path d="M0 344h600M0 1030h600" stroke="#2c6a74" stroke-width="1.500" opacity=".7"/>` +
    `<g fill="#06181d" stroke="#2c6a74" stroke-width="1.200">${riv}</g>` +
    `<path d="M70 0l8 300M410 1040l-6 260M250 344l4 90" stroke="#041217" stroke-width="3" opacity=".7" fill="none"/>` +
    `<ellipse cx="270" cy="660" rx="420" ry="520" fill="url(#${k}sp)"/>` +
    // chalk
    `<g fill="#e9efe9" opacity=".06" filter="url(#${k}b12)">${smear}</g>` +
    `<g filter="url(#${k}ch)"><text x="300" y="456" ${MID} ${HAND} ${BOLD} font-size="68" fill="#f4f6ee" ${fit(500)}>SAY HIS NAME.</text>` +
    `<text x="300" y="512" ${MID} ${HAND} font-size="36" fill="#dfe6de" ${fit(430)}>(not what we called him)</text>` +
    `<path d="M52 474q250-10 498 0" stroke="#f4f6ee" stroke-width="5" fill="none" opacity=".85"/></g>` +
    // phone
    `<path d="M40 560h380v420h-380z" fill="#000" opacity=".55" filter="url(#${k}b12)"/>` + wallPhone(218, 540, 1.14) + snap +
    `<rect y="700" width="600" height="600" fill="url(#${k}up)"/>` +
    `<rect width="600" height="1300" fill="#021014" opacity=".1"/>`;
  return frame(k, 600, 1300, defs, body, 0.17, 0.5);
})();

A.wall_c5_home = (() => {
  const k = 'wall_c5_home';
  const R = rng(9);
  let veins = '';
  for (let i = 0; i < 9; i++) {
    let x = R() * 600, y = R() * 300 - 100;
    let d = `M${r0(x)} ${r0(y)}`;
    for (let j = 0; j < 7; j++) { x += (R() - 0.45) * 220; y += 120 + R() * 140; d += `Q${r0(x + (R() - 0.5) * 120)} ${r0(y - 80)} ${r0(x)} ${r0(y)}`; }
    veins += `<path d="${d}" stroke-width="${(0.6 + R() * 2.2).toFixed(1)}" opacity="${(0.15 + R() * 0.4).toFixed(2)}"/>`;
  }
  const defs =
    rg(`${k}bg`, [[0, '#1c2224'], [0.6, '#0c0f10'], [1, '#030404']], 0.5, 0.42, 0.8) +
    lg(`${k}br`, [[0, '#fbe6a0'], [0.3, '#d9ac4a'], [0.6, '#8a6220'], [1, '#e0b85a']], 1, 1) +
    rg(`${k}gl`, [[0, '#e9c268', 0.3], [1, '#e9c268', 0]]) +
    `<filter id="${k}mb" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".004 .009" numOctaves="4" seed="12"/><feColorMatrix values="0 0 0 0 .75 0 0 0 0 .8 0 0 0 0 .8 -5 0 0 0 2.3"/></filter>` +
    bl(`${k}b2`, 1.2) + bl(`${k}b10`, 10);
  const key = (f: string): string =>
    `<path d="M300 430a96 96 0 1 1 .1 0zM300 444v342M300 664h74M300 724h52M300 772h78" fill="none" stroke="${f}" stroke-width="28" stroke-linejoin="round"/>` +
    `<path d="M300 268a34 34 0 0 1 18 62l14 66h-64l14-66a34 34 0 0 1 18-62z" fill="${f}"/><circle cx="300" cy="474" r="26" fill="${f}"/>`;
  const body =
    `<rect width="600" height="1300" fill="url(#${k}bg)"/><rect width="600" height="1300" filter="url(#${k}mb)" opacity=".2"/>` +
    `<g fill="none" stroke="#cfd8d6" filter="url(#${k}b2)">${veins}</g>` +
    `<ellipse cx="300" cy="520" rx="330" ry="420" fill="url(#${k}gl)"/>` +
    `<g transform="translate(8 12)" opacity=".7" filter="url(#${k}b10)">${key('#000')}</g>` + key(`url(#${k}br)`) +
    `<path d="M214 300a96 96 0 0 1 150-52" fill="none" stroke="#fff6cf" stroke-width="5" opacity=".7" stroke-linecap="round"/><path d="M291 470v296" stroke="#fff6cf" stroke-width="4" opacity=".5"/>` +
    `<path d="M228 1118h144" stroke="#b9954a" stroke-width="1.500"/>` + tx(300, 1160, 30, 'LISK & KEY', '#d9b866', SERIF, `${MID} ${fit(260)} letter-spacing="8"`) +
    `<path d="M228 1182h144" stroke="#b9954a" stroke-width="1.500"/>`;
  return frame(k, 600, 1300, defs, body, 0.14, 0.55);
})();
/** Brushed-steel streaks. */
const streak5 = (id: string): string =>
  `<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".004 .5" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 -2.4 0 0 0 1.3"/><feComposite in2="SourceGraphic" operator="in"/></filter>`;

// ════════════════════════════════════════════════════════════════ MAP
A.map_c5 = (() => {
  const k = 'map_c5';
  const R = rng(77);
  // downtown grid, slightly rotated
  let streets = '', blocks = '';
  for (let i = 0; i < 9; i++) streets += `M${120 + i * 58} 150v420`;
  for (let j = 0; j < 8; j++) streets += `M90 ${170 + j * 56}h520`;
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 7; j++) {
      if (R() < 0.3) continue;
      const x = 126 + i * 58, y = 176 + j * 56;
      blocks += `<rect x="${x + r0(R() * 8)}" y="${y + r0(R() * 6)}" width="${r0(24 + R() * 22)}" height="${r0(20 + R() * 22)}"/>`;
    }
  let trees = '';
  for (let i = 0; i < 70; i++) {
    const x = 480 + R() * 330, y = R() * 300;
    if (x - 480 < y * 0.9 - 60 || (Math.abs(x - 672) < 78 && Math.abs(y - 100) < 62)) continue;
    trees += `<circle cx="${r0(x)}" cy="${r0(y)}" r="${r0(5 + R() * 6)}"/>`;
  }
  const ink = '#0d151b', brass = '#d9b25a', pale = '#e6e2d2';
  const pin = (x: number, y: number, g: string): string =>
    `<g transform="translate(${x} ${y})"><circle r="19" fill="${ink}" opacity=".85"/><circle r="17" fill="#27343e" stroke="${brass}" stroke-width="1.600"/><g fill="none" stroke="${pale}" stroke-width="1.800" stroke-linejoin="round" stroke-linecap="round">${g}</g></g>`;
  const defs =
    lg(`${k}bg`, [[0, '#46535e'], [1, '#2a343d']], 1, 1) +
    lg(`${k}wt`, [[0, '#1d4a5c'], [1, '#0c2432']], 0.6, 1) +
    rg(`${k}hl`, [[0, '#5a6a58'], [0.6, '#44523f'], [1, '#3a4640', 0]], 0.5, 0.5, 0.5) +
    rg(`${k}pit`, [[0, '#f2ecd6'], [0.7, '#c9c0a2'], [1, '#8f8a74']]) +
    caus(`${k}ca`, 0.02, 0.06, '.6 .9 1', -7, 1) + bl(`${k}b4`, 4) +
    `<clipPath id="${k}w"><path d="M0 230C60 260 80 330 56 410C44 460 40 520 56 550C70 580 130 580 150 560C170 530 200 500 250 480C300 462 330 520 400 550C440 566 470 600 470 600H0Z"/></clipPath>` +
    `<clipPath id="${k}land"><path d="M0 0H800V600H470C470 600 440 566 400 550C330 520 300 462 250 480C200 500 170 530 150 560C130 580 70 580 56 550C40 520 44 460 56 410C80 330 60 260 0 230Z"/></clipPath>`;
  const coast = 'M0 230C60 260 80 330 56 410C44 460 40 520 56 550C70 580 130 580 150 560C170 530 200 500 250 480C300 462 330 520 400 550C440 566 470 600 470 600';
  const body =
    `<rect width="800" height="600" fill="url(#${k}bg)"/>` +
    `<path d="M0 230C60 260 80 330 56 410C44 460 40 520 56 550C70 580 130 580 150 560C170 530 200 500 250 480C300 462 330 520 400 550C440 566 470 600 470 600H0Z" fill="url(#${k}wt)"/>` +
    `<g clip-path="url(#${k}w)"><rect y="220" width="480" height="380" filter="url(#${k}ca)" opacity=".35"/><path d="${coast}" fill="none" stroke="#7fb4c4" stroke-width="16" opacity=".18"/><path d="${coast}" fill="none" stroke="#7fb4c4" stroke-width="34" opacity=".1"/></g>` +
    `<path d="${coast}" fill="none" stroke="${ink}" stroke-width="3"/>` +
    // piers
    `<path d="M58 400h-40M48 446h-34M214 506l-22 34M246 488l-18 40" stroke="#8d8468" stroke-width="6"/>` +
    `<g clip-path="url(#${k}land)">` +
    // hills
    `<ellipse cx="690" cy="110" rx="330" ry="250" fill="url(#${k}hl)"/>` +
    `<g fill="none" stroke="#7d8c70" stroke-width="1.200" opacity=".6"><path d="M430 60Q560 190 800 250M470 0Q580 150 800 190M520 0Q620 220 800 320M560 -10Q600 90 800 130"/></g>` +
    `<g fill="#2c3a2e" opacity=".8">${trees}</g>` +
    // streets
    `<g transform="rotate(-7 360 360)"><g fill="#55626c" opacity=".55">${blocks}</g><path d="${streets}" stroke="#93a0a6" stroke-width="2.200" fill="none" opacity=".55"/>` +
    `<path d="M294 150v420M90 338h520" stroke="${brass}" stroke-width="3.500" fill="none" opacity=".75"/></g>` +
    // roads out of town
    `<path d="M560 250C600 200 640 170 664 128" fill="none" stroke="${ink}" stroke-width="7"/><path d="M560 250C600 200 640 170 664 128" fill="none" stroke="${brass}" stroke-width="2.500" stroke-dasharray="9 6"/>` +
    `<path d="M600 440C660 450 700 470 716 490M70 500C140 470 200 440 260 420" fill="none" stroke="#93a0a6" stroke-width="3" opacity=".7"/>` +
    // quarry pit
    `<path d="M612 70l30-26 34 8 26-14 30 22 12 34-16 30 6 22-36 14-30-8-28 12-26-26 8-28-18-18z" fill="${ink}" opacity=".5" transform="translate(4 5)"/>` +
    `<path d="M612 70l30-26 34 8 26-14 30 22 12 34-16 30 6 22-36 14-30-8-28 12-26-26 8-28-18-18z" fill="url(#${k}pit)" stroke="${ink}" stroke-width="2.500" stroke-linejoin="round"/>` +
    `<path d="M640 84l26-10 30 6 20 20-8 24-28 12-30-8-14-22z" fill="#17566a" stroke="${ink}" stroke-width="1.800"/><path d="M652 92q20-8 40 4M650 108q24 8 44-2" stroke="#7fd0dc" stroke-width="1.200" fill="none" opacity=".7"/>` +
    `<path d="M686 80l16-4 4 12-14 6z" fill="#fff8e0" stroke="${ink}" stroke-width="1.500"/><path d="M706 82l40-18" stroke="${pale}" stroke-width="1"/>` +
    `<path d="M622 74l12 14M730 62l-10 16M742 96l-16 6M636 134l10-12M700 150l-4-14" stroke="${ink}" stroke-width="1.300" opacity=".7"/>` +
    `</g>` +
    tx(672, 190, 15, 'HATCH QUARRY', pale, SERIF, `${MID} ${BOLD} ${fit(132)} letter-spacing="2"`) +
    tx(748, 60, 13, 'the Pulpit', '#f4e2a8', SERIF, `font-style="italic" ${MID} ${fit(60)}`) +
    tx(176, 576, 13, 'ARDENT HARBOR', '#8fc0cc', SERIF, `font-style="italic" opacity=".75" ${fit(170)}`) +
    // place icons (no labels)
    pin(336, 336, `<path d="M-11 9h22M-9 6h18M-9-3h18M-11-3L0-11l11 8"/><path d="M-6-3v9M0-3v9M6-3v9" stroke="${brass}"/>`) +
    pin(176, 240, `<path d="M-11 9V-5l6 3v-3l6 3v-3l6 3v-9h4v20z"/><path d="M-6 3h2M0 3h2M6 3h2" stroke="${brass}"/>`) +
    pin(496, 444, `<path d="M-10 9V-1L0-10 10-1V9z"/><path d="M-3 9V2h6v7M-12 4h-2M12 4h2" stroke="${brass}"/>`) +
    pin(240, 408, `<rect x="-11" y="-6" width="22" height="15" rx="2"/><path d="M-5-6l2-4h6l2 4"/><circle cy="2" r="4.500" stroke="${brass}"/>`) +
    pin(720, 492, `<path d="M-11 9V0h14v9M3 0l-7-6-7 6M3 4h8v5"/><path d="M8-2q-3-5 0-8q3 3 0 8v4" stroke="#9fd08a"/>`) +
    pin(96, 516, `<path d="M0-11L-7 10M0-11L7 10M-4 1h8M-5.500 6h11"/><path d="M-9-9q-4-3-4-7M9-9q4-3 4-7M-5-11q-2-2-2-5M5-11q2-2 2-5" stroke="${brass}" transform="translate(0 5)"/>`) +
    pin(416, 240, `<path d="M0 11V1"/><path d="M0 1q-9-4-5-12q5-3 5 4q0-7 5-4q4 8-5 12zM0-10V1" stroke="${brass}"/>`) +
    // compass + frame
    `<g transform="translate(64 66)" fill="none" stroke="${brass}"><circle r="26" stroke-width="1.200"/><path d="M0-34L6 0 0 34-6 0z" fill="${brass}" stroke="none" opacity=".85"/><path d="M-34 0L0-5 34 0 0 5z" stroke-width="1"/></g>` + tx(64, 26, 13, 'N', brass, SERIF, `${MID} ${BOLD}`) +
    `<rect x="9" y="9" width="782" height="582" fill="none" stroke="${brass}" stroke-width="1.500" opacity=".6"/><rect x="14" y="14" width="772" height="572" fill="none" stroke="${ink}" stroke-width="1" opacity=".7"/>`;
  return frame(k, 800, 600, defs, body, 0.2, 0.4);
})();

// ════════════════════════════════════════════════════════════════ PHOTOS
A.c5_ph_room9 = (() => {
  const k = 'c5_ph_room9';
  let ribs = '';
  for (let i = 1; i < 5; i++) ribs += `M${200 + i * 80} 100L${i * 160} -40`;
  const defs =
    lg(`${k}bw`, [[0, '#0a3f4e'], [0.5, '#1796a4'], [1, '#0d6270']]) +
    lg(`${k}sl`, [[0, '#03161c'], [1, '#0e6f7c']], 1, 0) + lg(`${k}sr`, [[0, '#0e6f7c'], [1, '#03161c']], 1, 0) +
    lg(`${k}fl`, [[0, '#11808c'], [1, '#03252e']]) +
    lg(`${k}rk`, [[0, '#8adad6'], [0.25, '#2f8a90'], [1, '#08272f']]) +
    lg(`${k}bx`, [[0, '#c4ced2'], [0.5, '#7f8b91'], [1, '#3a444a']]) +
    rg(`${k}lamp`, [[0, '#fff0c0', 0.5], [1, '#fff0c0', 0]]) +
    caus(`${k}ca`, 0.008, 0.04) + caus(`${k}cw`, 0.014, 0.012, '.7 1 1', -8, 1.1, 9) +
    bl(`${k}b3`, 3) + bl(`${k}b8`, 8) +
    `<clipPath id="${k}f"><path d="M200 400h400l200 200h-800z"/></clipPath><clipPath id="${k}wl"><path d="M0-40L200 100V400L0 600zM800-40L600 100V400L800 600zM200 100h400v300h-400z"/></clipPath>`;
  const body =
    `<rect width="800" height="600" fill="#03141a"/>` +
    `<rect x="200" y="100" width="400" height="300" fill="url(#${k}bw)"/><path d="M0-40L200 100V400L0 600z" fill="url(#${k}sl)"/><path d="M800-40L600 100V400L800 600z" fill="url(#${k}sr)"/>` +
    `<g clip-path="url(#${k}wl)"><rect width="800" height="600" filter="url(#${k}cw)" opacity=".28"/></g>` +
    `<path d="M0-40H800L600 100H200z" fill="#061d24"/><path d="${ribs}M200 100h400M100 30h600" stroke="#1d5a66" stroke-width="5" fill="none"/><path d="M200 100v300M600 100v300" stroke="#03141a" stroke-width="3"/>` +
    `<path d="M370 100l-30-60h120l-30 60z" fill="#bff6f0" opacity=".25"/>` +
    `<path d="M200 400h400l200 200h-800z" fill="url(#${k}fl)"/><g clip-path="url(#${k}f)"><rect y="396" width="800" height="204" filter="url(#${k}ca)"/></g>` +
    // phone on the far wall
    `<ellipse cx="470" cy="250" rx="80" ry="90" fill="url(#${k}lamp)"/>` + wallPhone(470, 214, 0.21, false) +
    // rock ledge (the Pulpit)
    `<path d="M0 270l120-30 150-6 110 22 60 30-70 22-90 8-70 60-90 20-120 90z" fill="url(#${k}rk)"/>` +
    `<path d="M0 270l120-30 150-6 110 22 60 30-150 12-150-10z" fill="#c4f4ee" opacity=".8"/><path d="M0 270l120-30 150-6 110 22 60 30" fill="none" stroke="#eafffb" stroke-width="2"/>` +
    `<path d="M150 288l24 100M290 298l-60 48M60 282l-30 150M210 348l-30 60" stroke="#041e26" stroke-width="2.500" fill="none" opacity=".6"/>` +
    `<path d="M440 286l-70 22-90 8-70 60-90 20-120 90v80h130l110-120 120-90z" fill="#02161c" opacity=".5"/>` +
    `<ellipse cx="300" cy="470" rx="170" ry="24" fill="#02161c" opacity=".45" filter="url(#${k}b8)"/>` +
    finalBox(k, 640, 520, 0.8) +
    `<path d="M0 520q400 60 800 0v80h-800z" fill="#01090c" opacity=".6" filter="url(#${k}b8)"/>`;
  return frame(k, 800, 600, defs, body, 0.17, 0.6);
})();

A.c5_ph_finalbox = (() => {
  const k = 'c5_ph_finalbox';
  let riv = '';
  for (let i = 0; i < 7; i++) riv += `<circle cx="${82 + i * 72.6}" cy="556" r="6"/><circle cx="${82 + i * 72.6}" cy="738" r="6"/>`;
  for (let i = 0; i < 6; i++) riv += `<circle cx="${128 + i * 68.8}" cy="92" r="5"/>`;
  const defs =
    lg(`${k}fl`, [[0, '#0d6470'], [1, '#03222a']]) +
    lg(`${k}st`, [[0, '#d2dadd'], [0.5, '#8a969c'], [1, '#48545a']]) +
    lg(`${k}lid`, [[0, '#7f8b91'], [1, '#b8c2c6']]) +
    lg(`${k}fm`, [[0, '#4a4f54'], [1, '#6c7278']]) +
    lg(`${k}in`, [[0, '#07090a'], [1, '#1c2226']]) +
    rg(`${k}led`, [[0, '#ff2a1a', 0.55], [1, '#ff2a1a', 0]]) +
    caus(`${k}ca`, 0.008, 0.03) + chalk(`${k}mk`, 1.3, -1.2, 1.7) + streak5(`${k}br`) +
    bl(`${k}b3`, 3) + bl(`${k}b14`, 14);
  const body =
    `<rect width="600" height="800" fill="url(#${k}fl)"/><rect width="600" height="800" filter="url(#${k}ca)" opacity=".6"/>` +
    `<path d="M20 760h560l10 40h-580z" fill="#000" opacity=".7" filter="url(#${k}b14)"/>` +
    // lid, standing open
    `<path d="M104 70h392l34 270h-460z" fill="url(#${k}lid)"/><path d="M104 70h392l34 270h-460z" filter="url(#${k}br)" opacity=".5"/>` +
    `<path d="M124 110h352l26 206h-404z" fill="none" stroke="#49555b" stroke-width="3"/><path d="M104 70h392" stroke="#eef4f6" stroke-width="3"/>` +
    // masking tape label
    `<g transform="rotate(-2 300 204)"><path d="M92 172l8 8-8 8 8 8-8 8 8 8-8 8 8 8-8 8h416l-8-8 8-8-8-8 8-8-8-8 8-8-8-8 8-8z" fill="#e8dcae"/><path d="M92 172h416v10h-416z" fill="#fff" opacity=".25"/>` +
    `<g filter="url(#${k}mk)">` + tx(300, 218, 34, 'FOR HAL · RUTH · TAMSIN', '#16161a', HAND, `${BOLD} ${MID} ${fit(380)}`) + `</g></g>` +
    // open box: foam and the phone-shaped cut-out
    `<path d="M70 340h460l32 200h-524z" fill="#2c3438"/><path d="M92 352h416l26 176h-468z" fill="url(#${k}fm)"/>` +
    `<path d="M92 352h416l4 26h-424z" fill="#000" opacity=".35"/>` +
    `<path d="M212 384h176q14 0 16 14l10 94q2 16-14 16h-200q-16 0-14-16l10-94q2-14 16-14z" fill="url(#${k}in)"/><path d="M212 384h176q14 0 16 14l2 16h-212l2-16q2-14 16-14z" fill="#000" opacity=".6"/>` +
    `<path d="M186 492q-2 16 14 16h200q16 0 14-16" fill="none" stroke="#9aa2a8" stroke-width="2" opacity=".7"/>` +
    `<g fill="#3a3f44" opacity=".6"><circle cx="130" cy="380" r="2"/><circle cx="160" cy="470" r="2"/><circle cx="450" cy="400" r="2"/><circle cx="470" cy="490" r="2"/><circle cx="120" cy="500" r="2"/><circle cx="300" cy="366" r="2"/></g>` +
    // front face
    `<rect x="38" y="540" width="524" height="216" rx="8" fill="url(#${k}st)"/><rect x="38" y="540" width="524" height="216" rx="8" filter="url(#${k}br)" opacity=".55"/>` +
    `<path d="M38 548h524" stroke="#f2f6f7" stroke-width="3" opacity=".8"/><path d="M38 574h524" stroke="#39444a" stroke-width="3"/>` +
    `<g fill="#39444a" stroke="#c9d2d6" stroke-width="1">${riv}</g>` +
    `<rect x="260" y="548" width="80" height="20" rx="4" fill="#39444a"/>` +
    `<ellipse cx="300" cy="652" rx="300" ry="90" fill="url(#${k}led)"/>` +
    `<rect x="76" y="606" width="448" height="92" rx="8" fill="#110304" stroke="#2a3338" stroke-width="5"/>` +
    tx(300, 668, 44, 'OPENS NOV 02 · 09:00', '#5a0d08', MONO, `${BOLD} ${MID} ${fit(408)}`) +
    `<g filter="url(#${k}b3)" opacity=".8">` + tx(300, 668, 44, 'OPENS NOV 02 · 09:00', '#ff2414', MONO, `${BOLD} ${MID} ${fit(408)}`) + `</g>` +
    tx(300, 668, 44, 'OPENS NOV 02 · 09:00', '#ff4a34', MONO, `${BOLD} ${MID} ${fit(408)}`) +
    `<path d="M76 620h448M76 644h448M76 668h448M76 690h448" stroke="#110304" stroke-width="2" opacity=".35"/>`;
  return frame(k, 600, 800, defs, body, 0.16, 0.5);
})();

A.c5_ph_camera = (() => {
  const k = 'c5_ph_camera';
  const fl = (c: string, c2: string): string =>
    `<g fill="${c}"><circle cx="0" cy="-11" r="9"/><circle cx="10" cy="-3" r="9"/><circle cx="6" cy="9" r="9"/><circle cx="-6" cy="9" r="9"/><circle cx="-10" cy="-3" r="9"/></g><circle r="6" fill="${c2}"/>`;
  const defs =
    `<pattern id="${k}pt" width="150" height="130" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)"><rect width="150" height="130" fill="#efe4cc"/>` +
    `<g transform="translate(38 36)">${fl('#d9705e', '#f2c84a')}<path d="M10 14q14 12 30 8M-12 14q-8 14-22 12" stroke="#7fa06a" stroke-width="3" fill="none"/><path d="M26 18q10-10 16 2-10 6-16-2z" fill="#7fa06a"/></g>` +
    `<g transform="translate(112 100) scale(.8)">${fl('#7f9cc4', '#f6e6a0')}<path d="M-12 12q-10 10-26 6" stroke="#7fa06a" stroke-width="3" fill="none"/></g>` +
    `<g fill="#c9a24c"><circle cx="100" cy="30" r="3"/><circle cx="20" cy="96" r="3"/><circle cx="70" cy="80" r="2"/></g></pattern>` +
    lg(`${k}cm`, [[0, '#ffe04a'], [0.6, '#f0b81a'], [1, '#b88208']]) +
    rg(`${k}ln`, [[0, '#3a4c66'], [0.5, '#10141c'], [1, '#000']], 0.4, 0.38, 0.6) +
    lg(`${k}bag`, [[0, '#fff', 0.5], [0.4, '#dfe8ec', 0.2], [1, '#aab6bc', 0.34]], 1, 1) +
    rg(`${k}lt`, [[0, '#fff2d0', 0.3], [0.6, '#000', 0], [1, '#1a0e04', 0.5]], 0.36, 0.3, 0.8) +
    bl(`${k}b3`, 3) + bl(`${k}b10`, 10);
  const cam =
    `<g transform="translate(240 300) rotate(-6)"><rect x="-176" y="-90" width="360" height="210" rx="20" fill="#3a2a10" opacity=".55" filter="url(#${k}b10)"/>` +
    `<rect x="-180" y="-104" width="360" height="204" rx="18" fill="url(#${k}cm)"/><rect x="-180" y="-104" width="360" height="40" rx="18" fill="#fff6b0" opacity=".5"/>` +
    `<rect x="-180" y="52" width="360" height="48" rx="14" fill="#1c1a16"/><rect x="-180" y="52" width="360" height="12" fill="#1c1a16"/>` +
    `<circle cx="-30" cy="-6" r="62" fill="#1c1a16"/><circle cx="-30" cy="-6" r="48" fill="url(#${k}ln)" stroke="#59606a" stroke-width="4"/><path d="M-58-22a34 34 0 0 1 30-18" stroke="#bcd0f0" stroke-width="5" fill="none" opacity=".7" stroke-linecap="round"/>` +
    `<rect x="72" y="-90" width="92" height="46" rx="6" fill="#e9edf0" stroke="#6b5a1a" stroke-width="3"/><path d="M80-82h76M80-72h76M80-62h76M80-52h76" stroke="#aab4ba" stroke-width="2"/>` +
    `<rect x="-158" y="-90" width="44" height="30" rx="4" fill="#10141c" stroke="#6b5a1a" stroke-width="3"/>` +
    // frame counter
    `<circle cx="126" cy="6" r="25" fill="#f6f4ea" stroke="#1c1a16" stroke-width="5"/>` + tx(126, 19, 36, '3', '#b3221c', SANS, `${BOLD} ${MID}`) +
    // silver marker
    `<text x="-158" y="38" ${HAND} ${BOLD} font-size="56" fill="#e9eef2" stroke="#8d969c" stroke-width="1.500" ${fit(110)} transform="rotate(-5 -120 30)">LOW</text>` +
    tx(-80, 86, 17, 'FLASH · 24 EXP', '#d9b21a', SANS, `${BOLD} ${fit(150)}`) + `</g>`;
  const bag =
    `<g transform="translate(590 330) rotate(7)"><rect x="-170" y="-196" width="350" height="400" rx="8" fill="#3a2a10" opacity=".4" filter="url(#${k}b10)"/>` +
    `<rect x="-176" y="-206" width="352" height="402" rx="8" fill="url(#${k}bag)" stroke="#f4f8fa" stroke-width="2" stroke-opacity=".7"/>` +
    `<path d="M-176-178h352" stroke="#3c78c8" stroke-width="5" opacity=".8"/><path d="M-176-170h352" stroke="#c83c3c" stroke-width="3" opacity=".7"/>` +
    `<path d="M-150-150q60 120 20 320M120-160q-30 150 30 330" stroke="#fff" stroke-width="3" fill="none" opacity=".35"/>` +
    `<rect x="-150" y="-128" width="300" height="196" fill="#f6f2e4"/><rect x="-150" y="-128" width="300" height="196" fill="none" stroke="#1d2a3a" stroke-width="3"/>` +
    tx(0, -82, 28, 'HARBOR CO. SHERIFF —', '#1d2a3a', SANS, `${BOLD} ${MID} ${fit(270)}`) +
    `<path d="M-136-64h272" stroke="#1d2a3a" stroke-width="2"/>` +
    tx(0, -18, 36, 'PROPERTY —', '#a3231c', SANS, `${BOLD} ${MID} ${fit(220)}`) +
    tx(0, 40, 42, 'PRICE, M.', '#1d2a3a', MONO, `${BOLD} ${MID} ${fit(226)}`) +
    `<path d="M-110 50h220" stroke="#1d2a3a" stroke-width="1.500" stroke-dasharray="4 3"/>` +
    `<path d="M-120 110h110M-120 134h170M30 110h80" stroke="#8d949a" stroke-width="5" opacity=".45"/>` +
    `<path d="M-176-206h352v402h-352z" fill="#fff" opacity=".06"/></g>`;
  const body =
    `<rect width="800" height="600" fill="url(#${k}pt)"/>` +
    `<path d="M0 470q400-50 800 0" stroke="#b8a888" stroke-width="3" fill="none" opacity=".5"/><path d="M0 120q300 30 800-20" stroke="#fff" stroke-width="10" fill="none" opacity=".25" filter="url(#${k}b3)"/>` +
    bag + cam + `<rect width="800" height="600" fill="url(#${k}lt)"/>`;
  return frame(k, 800, 600, defs, body, 0.15, 0.45);
})();

A.c5_ph_contact = (() => {
  const k = 'c5_ph_contact';
  const R = rng(240);
  const pick = (a: string[]): string => a[Math.floor(R() * a.length)];
  // 23 flash-lit thumbnails + one hole
  const thumb = (i: number): string => {
    const t = [0, 1, 2, 2, 3, 2, 1, 0, 2, 3, 2, 2, 1, 2, 0, 2, 3, 2, 2, 1, 2, 3, 2][i];
    const h = r0(R() * 12);
    if (t === 0) return `<rect width="100" height="68" fill="#2a2418"/><path d="M10 50l8-16 14-10h36l14 10 10 6v14z" fill="#8a8f96"/><path d="M34 26h30l8 10h-46z" fill="#1a2028"/><circle cx="26" cy="52" r="8"/><circle cx="76" cy="52" r="8"/><circle cx="90" cy="42" r="4" fill="#fff6c0"/>`;
    if (t === 1) return `<rect width="100" height="68" fill="#3a2a1a"/><path d="M0 50h100v18h-100z" fill="#6e5a40"/><path d="M${30 + h} 52v-26l4-6v-10h8v10l4 6v26z" fill="#c9a060"/><path d="M${58 + h} 52v-22l4-6v-8h8v8l4 6v22z" fill="#a8743a"/>`;
    if (t === 3) return `<rect width="100" height="68" fill="#05070a"/><path d="M0 ${30 + h}q30-10 50 0t50-4v44h-100z" fill="#0c1820"/><path d="M14 ${46 + h}h20M50 ${52 + h}h26" stroke="#5a7888" stroke-width="2"/><path d="M0 0h100l-20 20q-30 10-80-4z" fill="#b8a888" opacity=".5"/>`;
    const n = 1 + Math.floor(R() * 2);
    let p = `<rect width="100" height="68" fill="#${pick(['16110c', '0c0c10', '1c1408'])}"/>`;
    for (let j = 0; j < n; j++) {
      const x = r0(((j + 0.5) / n) * 100 + (R() - 0.5) * 12), y = r0(26 + R() * 10);
      p += `<path d="M${x - 22} 68q2-22 22-24q20 2 22 24z" fill="#${pick(['c8443c', '4a6a9a', 'e4dccc', '5a8a5a'])}"/><circle cx="${x}" cy="${y}" r="13" fill="#fbe6cc"/><path d="M${x - 13} ${y - 2}q0-14 13-14t13 14q-12-8-26 0z" fill="#${pick(['3a2416', '1a1210', '8a6a3a'])}"/><path d="M${x - 5} ${y + 4}q5 6 10 0z" fill="#7a2a20"/>`;
    }
    return p;
  };
  let grid = '', nums = '';
  for (let i = 0; i < 24; i++) {
    const x = 66 + (i % 7) * 96, y = 96 + Math.floor(i / 7) * 114;
    if (i === 23) {
      grid += `<rect x="${x - 5}" y="${y - 6}" width="98" height="86" fill="#000" opacity=".5" filter="url(#${k}b3)"/><rect x="${x - 6}" y="${y - 8}" width="98" height="86" fill="#4a3824"/><path d="M${x - 6} ${y - 8}h98v86h-98z" fill="none" stroke="#f4eee0" stroke-width="2.500" stroke-dasharray="14 3 6 2"/><path d="M${x - 6} ${y + 30}h98" stroke="#2c2014" stroke-width="3" opacity=".6"/>`;
      continue;
    }
    grid += `<g transform="translate(${x} ${y}) scale(.86)" clip-path="url(#${k}tc)">${thumb(i)}<rect width="100" height="68" fill="url(#${k}fx)"/></g>`;
    nums += `<text x="${x}" y="${y + 74}">${String(i + 1).padStart(2, '0')}</text>`;
  }
  const defs =
    lg(`${k}dk`, [[0, '#4a3824'], [1, '#2c2014']], 1, 1) +
    rg(`${k}fx`, [[0, '#fff', 0.3], [0.6, '#fff', 0], [1, '#000', 0.45]], 0.5, 0.4, 0.7) +
    rg(`${k}lt`, [[0, '#ffe8c0', 0.2], [1, '#000', 0.3]], 0.4, 0.3, 0.9) +
    `<clipPath id="${k}tc"><rect width="100" height="68"/></clipPath>` + chalk(`${k}rp`, 0.9, -0.5, 1.5) + bl(`${k}b3`, 3) + bl(`${k}b10`, 10);
  const body =
    `<rect width="800" height="600" fill="url(#${k}dk)"/><path d="M0 80h800M0 300h800M0 520h800" stroke="#1c140c" stroke-width="3" opacity=".6"/>` +
    `<g transform="rotate(-1.500 400 300)"><rect x="52" y="44" width="712" height="520" fill="#000" opacity=".55" filter="url(#${k}b10)"/>` +
    `<rect x="44" y="34" width="712" height="520" fill="#0e0e10" stroke="#f4eee0" stroke-width="5"/>` +
    tx(66, 68, 15, 'FENWICK ST PHOTOLAB · 35MM · 24 EXP · C-41', '#b9b2a0', MONO, `${BOLD} ${fit(400)}`) + tx(734, 68, 15, 'ROLL 0917', '#b9b2a0', MONO, `${BOLD} text-anchor="end" ${fit(90)}`) +
    grid + `<g ${MONO} ${BOLD} font-size="11" fill="#e8a23a">${nums}</g>` +
    // red pen
    `<g filter="url(#${k}rp)"><text x="372" y="500" ${HAND} ${BOLD} font-size="76" fill="#f0281e" ${fit(190)} transform="rotate(-4 460 480)">24 →</text>` +
    `<path d="M366 520q100 14 200-8" stroke="#f0281e" stroke-width="6" fill="none"/><path d="M236 420q-12 46 6 96q50 12 104-2q10-50-4-96q-54-10-106 2z" stroke="#f0281e" stroke-width="4" fill="none"/></g></g>` +
    `<rect width="800" height="600" fill="url(#${k}lt)"/>`;
  return frame(k, 800, 600, defs, body, 0.15, 0.45);
})();

/** The red HATCH XC windbreaker colours (same jacket in c5_ph_2008 and c5_ph_frame24). */
const RED = '#e0242a', RED_D = '#98141c', RED_L = '#ff5a52';

A.c5_ph_frame24 = (() => {
  const k = 'c5_ph_frame24';
  const defs =
    rg(`${k}sk`, [[0, '#fffdf4'], [0.45, '#fff0d6'], [0.8, '#f4c8a0'], [1, '#c98a62']], 0.48, 0.42, 0.62) +
    rg(`${k}fl`, [[0, '#fff', 0.16], [0.35, '#fff', 0], [0.7, '#000', 0.45], [1, '#000', 0.9]], 0.42, 0.55, 0.7) +
    lg(`${k}rk`, [[0, '#d8ccb8'], [0.5, '#8a7f70'], [1, '#1c1814']]) +
    lg(`${k}jk`, [[0, RED_L], [0.35, RED], [1, RED_D]], 1, 0.6) +
    lg(`${k}sl`, [[0, RED_L], [0.5, RED], [1, RED_D]], 0, 1) +
    lg(`${k}lk`, [[0, '#ff7a1c', 0], [0.6, '#ff5a14', 0.35], [1, '#ffd060', 0.8]], 1, 0) +
    lg(`${k}wt`, [[0, '#050a10'], [1, '#000']]) +
    bl(`${k}b2`, 2) + bl(`${k}b6`, 6) + bl(`${k}b16`, 16);
  const scene =
    `<rect x="-100" y="-100" width="800" height="1000" fill="#020203"/>` +
    // black water far below, far quarry wall
    `<rect x="-100" y="-100" width="800" height="440" fill="url(#${k}wt)"/><path d="M-100 20l90-14 80 10 120-18 110 14 130-10 170 16v-120h-700z" fill="#23262a"/>` +
    `<path d="M40 120h70M330 90h50M250 170h90M520 140h60M90 230h50M560 230h70M300 250h40" stroke="#4a6a84" stroke-width="2.500" opacity=".6"/>` +
    // rock ledge
    `<path d="M-100 336l180-34 120 16 130-22 140 26 90-20 140 30v570h-800z" fill="url(#${k}rk)"/><path d="M-100 336l180-34 120 16 130-22 140 26 90-20 140 30" fill="none" stroke="#fff8e6" stroke-width="3" opacity=".7"/>` +
    `<path d="M60 330l30 90M330 300l-16 80M560 310l20 120M20 420l60 40" stroke="#3a3228" stroke-width="3" opacity=".45"/>` +
    // the boy behind — red HATCH XC windbreaker
    `<path d="M352 900c-12-250-4-470 28-520 30-30 130-34 164 0 44 60 54 280 48 520z" fill="url(#${k}jk)"/>` +
    `<path d="M352 560q110 24 240-6v46q-130 30-240 8z" fill="#f6f2ea"/><path d="M462 370v530" stroke="${RED_D}" stroke-width="4"/><path d="M414 356q48 30 96 0l10 22q-58 36-116 2z" fill="${RED_D}"/>` +
    `<path d="M560 420q50 120 44 330h-50z" fill="${RED_D}"/>` +
    `<path d="M430 262h64v104q-32 22-64 0z" fill="#241812"/>` +
    `<ellipse cx="462" cy="214" rx="58" ry="70" fill="#4a3026"/><path d="M402 218c-10-86 38-100 62-100 34 0 70 22 58 100-6-38-20-54-38-60-24 16-66 12-82 60z" fill="#0c0807"/>` +
    `<path d="M410 200q16-14 40-8v76q-28 0-40-28z" fill="#7a5442" opacity=".45"/><path d="M430 218q9-5 18 0M474 218q9-5 18 0" stroke="#080504" stroke-width="5" fill="none" opacity=".8"/><path d="M444 258q16 6 32 0" stroke="#080504" stroke-width="4" fill="none" opacity=".7"/>` +
    `<ellipse cx="478" cy="210" rx="60" ry="76" fill="#000" opacity=".5" filter="url(#${k}b6)"/>` +
    // Low: shoulders, neck
    `<path d="M-100 900c0-200 40-290 170-310h200c110 16 150 110 160 310z" fill="#2f5f7c"/><path d="M70 590q100 56 200 0l16 12q-116 72-232 0z" fill="#1c3e54"/>` +
    `<path d="M104 520h140v90q-70 44-140 0z" fill="#e4b08a"/>` +
    // reaching sleeve + hand on his shoulder
    `<g transform="translate(424 368) rotate(108)"><path d="M-20-46q130-10 268 12q14 30 0 66q-140 26-268 14q-30-46 0-92z" fill="url(#${k}sl)"/><path d="M-20 46q128 12 268-14" fill="none" stroke="#ffb0a8" stroke-width="3" opacity=".8"/>` +
    `<path d="M236-32v58" stroke="#f6f2ea" stroke-width="12"/>` +
    `<text x="10" y="15" ${SANS} ${BOLD} font-size="42" fill="#fffdf6" stroke="#fffdf6" stroke-width="1" ${fit(212)}>HATCH XC</text>` +
    `<path d="M242-26q40-6 60 16q6 30-20 40l-40-4z" fill="#fff0d8"/><path d="M268-8l30 8M266 6l34 6M262 20l24 6" stroke="#c99a78" stroke-width="3"/></g>` +
    // Low's face, blown out by the flash
    `<g transform="translate(-8 84)"><ellipse cx="190" cy="318" rx="150" ry="178" fill="url(#${k}sk)"/><ellipse cx="42" cy="330" rx="16" ry="34" fill="#f4c8a0"/><ellipse cx="338" cy="330" rx="16" ry="34" fill="#e0a882"/>` +
    `<path d="M40 300c-30-190 90-212 150-212 80 0 176 40 152 212-12-70-40-112-84-126-60 34-170 20-218 126z" fill="#3a2414"/><path d="M70 220q40-80 130-100M250 150q50 20 70 80" stroke="#8a5a34" stroke-width="5" fill="none" stroke-linecap="round"/>` +
    `<path d="M92 300q34-34 70-6M222 294q36-28 70 6" stroke="#5a3a24" stroke-width="9" fill="none" stroke-linecap="round"/>` +
    `<path d="M98 326q30-22 60 0q-30 12-60 0zM226 326q30-22 60 0q-30 12-60 0z" fill="#fff"/><circle cx="128" cy="324" r="10" fill="#e0261a"/><circle cx="256" cy="324" r="10" fill="#e0261a"/><circle cx="128" cy="324" r="4" fill="#ffb09a"/><circle cx="256" cy="324" r="4" fill="#ffb09a"/>` +
    `<path d="M98 326q30-24 60 0M226 326q30-24 60 0" stroke="#3a2414" stroke-width="4" fill="none"/>` +
    `<path d="M192 330q-10 40-18 54q18 12 40 0" stroke="#e0a882" stroke-width="5" fill="none" stroke-linecap="round"/>` +
    `<path d="M104 404q88 26 176-4q-10 84-88 88q-78-2-88-84z" fill="#5a1410"/><path d="M110 408q82 22 164-4l-6 22q-76 20-152 2z" fill="#fffef6"/><path d="M150 470q42-22 84 0q-42 22-84 0z" fill="#d8605a"/>` +
    `<path d="M84 392q14 8 22 14M300 388q-14 8-22 16" stroke="#e0a882" stroke-width="4" fill="none"/></g>` +
    // his own arm, out toward the camera
    `<path d="M-100 700q100-40 150-80l70 70q-100 110-230 220z" fill="#fff4e0" filter="url(#${k}b6)"/>` +
    `<rect x="-100" y="-100" width="800" height="1000" fill="url(#${k}fl)"/>`;
  const body =
    `<rect width="600" height="800" fill="#000"/><g transform="rotate(-5 300 400) translate(-24 -28) scale(1.08)">${scene}</g>` +
    `<rect width="600" height="800" fill="#ffdcae" style="mix-blend-mode:multiply"/>` +
    `<rect x="480" width="120" height="800" fill="url(#${k}lk)" opacity=".45" filter="url(#${k}b16)"/>` +
    `<path d="M88 0q6 300-4 800M402 0q-3 200 2 380" stroke="#fff" stroke-width="1" opacity=".2" fill="none"/>`;
  return frame(k, 600, 800, defs, body, 0.3, 0.7);
})();

/** Photocopier / microfilm speckle. */
const speck = (id: string, k = -5, b = 1.9): string =>
  `<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="11"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ${k} 0 0 0 ${b}"/><feComposite in2="SourceGraphic" operator="in"/></filter>`;

A.c5_ph_statement = (() => {
  const k = 'c5_ph_statement';
  const ink = '#1b1b1e';
  const defs =
    lg(`${k}dk`, [[0, '#3a2c20'], [1, '#1a130d']], 1, 1) +
    lg(`${k}pp`, [[0, '#f1efe8'], [1, '#d6d3c8']]) +
    lg(`${k}ed`, [[0, '#1b1b1e', 0.75], [0.5, '#1b1b1e', 0.12], [1, '#1b1b1e', 0]], 1, 0) +
    rg(`${k}lt`, [[0, '#fff2d6', 0.22], [1, '#000', 0.4]], 0.4, 0.3, 0.9) +
    speck(`${k}sp`) + bl(`${k}b10`, 10);
  const L = (y: number, s: string, size = 23.5): string => ln(86, y, size, s, ink, MONO, 0.6, BOLD);
  const body =
    `<rect width="600" height="800" fill="url(#${k}dk)"/><path d="M0 200h600M0 520h600" stroke="#120c08" stroke-width="3" opacity=".5"/>` +
    `<g transform="rotate(1.600 300 400)"><rect x="50" y="46" width="520" height="730" fill="#000" opacity=".55" filter="url(#${k}b10)"/>` +
    `<rect x="40" y="34" width="520" height="730" fill="url(#${k}pp)"/><rect x="40" y="34" width="36" height="730" fill="url(#${k}ed)"/><rect x="40" y="34" width="520" height="730" filter="url(#${k}sp)" opacity=".5"/>` +
    `<circle cx="66" cy="140" r="9" fill="#2a2a2c"/><circle cx="66" cy="400" r="9" fill="#2a2a2c"/><circle cx="66" cy="660" r="9" fill="#2a2a2c"/>` +
    // seal + header
    `<path d="M300 60l7 14 15 2-11 11 3 15-14-7-14 7 3-15-11-11 15-2z" fill="none" stroke="${ink}" stroke-width="2.500"/>` +
    tx(318, 142, 30, 'HARBOR COUNTY SHERIFF —', ink, SERIF, `${BOLD} ${MID} ${fit(424)}`) +
    tx(318, 180, 25, 'WITNESS STATEMENT — 08/23/2008', ink, SERIF, `${BOLD} ${MID} ${fit(440)}`) +
    `<path d="M90 198h456M90 204h456" stroke="${ink}" stroke-width="2"/>` +
    tx(90, 234, 13, 'FORM HCS-12 · CASE NO. 08-2211 · PAGE 1 OF 1', '#4a4a4e', SANS, fit(300)) +
    L(290, 'Name: Owen R. Blake, 17', 27) + `<path d="M176 298h340" stroke="${ink}" stroke-width="1.200"/>` +
    tx(86, 338, 13, 'STATEMENT (IN WITNESS\'S OWN WORDS)', '#4a4a4e', SANS, fit(250)) +
    L(384, 'I was at the car with Nadia the') + L(424, 'whole time. We heard Low yell') + L(464, 'and a man shouting and saw a') + L(504, 'flashlight coming down the path.') +
    `<path d="M86 392h440M86 432h440M86 472h440M86 512h440M86 552h440M86 592h440" stroke="#8a8a8e" stroke-width="1" opacity=".7"/>` +
    `<path d="M86 548L526 590" stroke="${ink}" stroke-width="1.500" opacity=".6"/>` +
    // signature
    `<path d="M110 688c10-40 30-46 34-20s-22 30-14 6 30-24 36-6-6 20 4 8 14-22 22-8 4 14 14 2 8-24 16-34-4 40 6 36 18-30 30-28-8 26 6 24 26-14 50-18" fill="none" stroke="#16224a" stroke-width="3.200" stroke-linecap="round"/><path d="M96 706q150-16 250-4" stroke="#16224a" stroke-width="2" fill="none"/>` +
    `<path d="M86 716h280M400 716h130" stroke="${ink}" stroke-width="1.500"/>` + tx(86, 736, 13, 'SIGNATURE OF WITNESS', '#4a4a4e', SANS, fit(150)) + tx(400, 736, 13, 'DATE', '#4a4a4e', SANS, fit(34)) +
    tx(404, 706, 22, '8/23/08', '#16224a', HAND, fit(90)) +
    `</g>` +
    `<path d="M560 30l40-10v120l-40 6z" fill="#b8892a"/><rect width="600" height="800" fill="url(#${k}lt)"/>`;
  return frame(k, 600, 800, defs, body, 0.15, 0.45);
})();

A.c5_ph_clipping = (() => {
  const k = 'c5_ph_clipping';
  const ink = '#15171a';
  const defs =
    lg(`${k}mc`, [[0, '#2a2e34'], [1, '#0a0b0d']]) +
    rg(`${k}sc`, [[0, '#f4f1e2'], [0.7, '#d9d6c4'], [1, '#a5a394']], 0.5, 0.45, 0.75) +
    lg(`${k}ph`, [[0, '#8c8c88'], [1, '#3a3a38']]) +
    rg(`${k}gl`, [[0, '#dff0ff', 0.16], [1, '#dff0ff', 0]], 0.3, 0.2, 0.6) +
    `<pattern id="${k}ht" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="2.500" cy="2.500" r="1.100" fill="#000" opacity=".5"/></pattern>` +
    speck(`${k}sp`, -4, 1.4) + bl(`${k}b2`, 1.5) + bl(`${k}b12`, 12) +
    `<clipPath id="${k}c"><rect x="52" y="56" width="496" height="672" rx="14"/></clipPath><clipPath id="${k}pc"><rect x="76" y="262" width="448" height="212"/></clipPath>`;
  const B = (y: number, s: string): string => ln(76, y, 25, s, ink, SERIF, 0.49);
  const photo =
    `<rect x="76" y="262" width="448" height="212" fill="url(#${k}ph)"/><g clip-path="url(#${k}pc)">` +
    `<path d="M76 330q120-40 240-10t208-20v-40h-448z" fill="#b9b9b2"/><path d="M76 420h448v60h-448z" fill="#2a2a28"/>` +
    // cruiser
    `<path d="M360 430v-50l30-10 26-36h90l18 10v86z" fill="#e4e4dc"/><path d="M360 392h164v38h-164z" fill="#18181a"/><path d="M420 340h70l16 30h-104z" fill="#3a3c40"/><rect x="440" y="322" width="50" height="12" fill="#111"/><rect x="452" y="318" width="26" height="8" fill="#fff"/><circle cx="404" cy="432" r="22" fill="#0c0c0c"/><circle cx="404" cy="432" r="9" fill="#777"/>` +
    // deputy
    `<path d="M300 474v-120q0-24 26-26t30 24l4 122z" fill="#55554f"/><circle cx="328" cy="304" r="20" fill="#c8c4b6"/><path d="M302 298h54l-6-14h-42z" fill="#2a2a28"/><path d="M296 300h66" stroke="#2a2a28" stroke-width="5"/><path d="M306 370l-40 14" stroke="#55554f" stroke-width="16" stroke-linecap="round"/>` +
    // Abel Dunn — big, soaked
    `<path d="M150 474l6-130q4-44 54-46t58 40l12 136z" fill="#1c1c1c"/><path d="M162 400q50 16 112-4v78h-118z" fill="#050505"/><path d="M176 330l-8 70M240 326l10 70" stroke="#3a3a3a" stroke-width="3"/>` +
    `<ellipse cx="212" cy="272" rx="27" ry="31" fill="#b0aca0"/><path d="M184 268q2-34 30-34t28 30q-14-14-30-12t-28 16z" fill="#8a887e"/><path d="M190 286q22 26 44 0v14q-22 20-44 0z" fill="#777"/>` +
    `<path d="M196 300v40M210 304v50M226 300v36" stroke="#000" stroke-width="2" opacity=".5"/>` +
    `<rect x="76" y="262" width="448" height="212" fill="url(#${k}ht)"/></g><rect x="76" y="262" width="448" height="212" fill="none" stroke="${ink}" stroke-width="2"/>`;
  const page =
    `<g clip-path="url(#${k}c)"><rect x="52" y="56" width="496" height="672" fill="url(#${k}sc)"/>` +
    tx(300, 112, 31, 'HARBOR LEDGER — AUG 24, 2008', ink, SERIF, `${BOLD} ${MID} ${fit(448)}`) +
    `<path d="M76 126h448" stroke="${ink}" stroke-width="4"/><path d="M76 134h448" stroke="${ink}" stroke-width="1.500"/>` +
    tx(300, 188, 47, 'CARETAKER HELD IN', ink, SERIF, `${BOLD} ${MID} ${fit(448)}`) +
    tx(300, 242, 53, 'QUARRY DEATH', ink, SERIF, `${BOLD} ${MID} ${fit(448)}`) +
    photo +
    B(512, 'Abel Dunn, 53, was found soaked to') + B(544, "the chest at the water's edge.") +
    B(590, 'Four teenagers say Dunn chased') + B(622, 'them onto the Pulpit ledge with a') + B(654, 'flashlight.') +
    `<g stroke="#55585c" stroke-width="7" opacity=".4"><path d="M76 694h448M76 714h380M76 734h448"/></g>` +
    `<rect x="52" y="56" width="496" height="672" filter="url(#${k}sp)" opacity=".4"/>` +
    `<path d="M210 56v672M214 56v672" stroke="#fff" stroke-width="1" opacity=".3"/><rect x="52" y="56" width="496" height="672" fill="url(#${k}gl)"/></g>`;
  const body =
    `<rect width="600" height="800" fill="url(#${k}mc)"/>` +
    `<rect x="30" y="34" width="540" height="716" rx="26" fill="#050607"/><rect x="38" y="42" width="524" height="700" rx="22" fill="none" stroke="#4a5058" stroke-width="2"/>` +
    `<rect x="44" y="48" width="512" height="688" rx="18" fill="#dfe8f0" opacity=".25" filter="url(#${k}b12)"/>` + page +
    `<rect x="52" y="56" width="496" height="672" rx="14" fill="none" stroke="#000" stroke-width="6" opacity=".6"/>` +
    `<circle cx="96" cy="774" r="12" fill="#1c2024" stroke="#555c64" stroke-width="2"/><circle cx="136" cy="774" r="5" fill="#3ad06a"/><rect x="380" y="766" width="170" height="16" rx="8" fill="#1c2024" stroke="#555c64" stroke-width="2"/><rect x="440" y="762" width="30" height="24" rx="5" fill="#6a727a"/>`;
  return frame(k, 600, 800, defs, body, 0.2, 0.45);
})();

A.c5_ph_2008 = (() => {
  const k = 'c5_ph_2008';
  interface Kid { x: number; skin: string; hair: string; top: string; jeans: string; extra?: string; hairP: string; s?: number }
  // seated teen: origin = seat point (hips) on the hood edge
  const kid = (o: Kid): string =>
    `<g transform="translate(${o.x} 356) scale(${o.s ?? 1})">` +
    `<path d="M-34-8q-8 70-2 150h30l8-110 8 110h30q6-80-2-150z" fill="${o.jeans}"/><path d="M-36 138h30v16h-36zM10 138h30l6 16h-36z" fill="#e8e2d2"/>` +
    `<path d="M-46 0q-6-80 10-118q36-14 72 0q16 38 10 118z" fill="${o.top}"/>` +
    `<path d="M-13-150h26v38q-13 10-26 0z" fill="${o.skin}" filter="url(#${k}dk)"/><ellipse cx="0" cy="-170" rx="29" ry="33" fill="${o.skin}"/>` +
    `<path d="M-12-176q5-5 10 0M4-176q5-5 10 0" stroke="#2a1a12" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M-11-160q11 12 22 0-11 4-22 0z" fill="#fff" stroke="#8a4034" stroke-width="2"/>` +
    o.hairP + (o.extra ?? '') + `</g>`;
  const defs =
    lg(`${k}sky`, [[0, '#f9c05a'], [0.55, '#fbd88a'], [1, '#fff0c0']]) +
    lg(`${k}cl`, [[0, '#f4e0b0'], [1, '#c99458']]) +
    lg(`${k}gr`, [[0, '#b98a4a'], [1, '#6e4a26']]) +
    lg(`${k}car`, [[0, '#a8c4b8'], [0.5, '#6f9488'], [1, '#3c5a52']]) +
    lg(`${k}ws`, [[0, '#fff6d0'], [1, '#6a8a88']], 1, 1) +
    rg(`${k}sun`, [[0, '#fff', 0.95], [0.25, '#fff2b0', 0.7], [1, '#ffb040', 0]]) +
    lg(`${k}lk`, [[0, '#ff5a14', 0.7], [0.5, '#ff9a2a', 0.25], [1, '#ff9a2a', 0]], 1, 0) +
    `<filter id="${k}dk"><feColorMatrix values=".8 0 0 0 0 0 .72 0 0 0 0 0 .66 0 0 0 0 0 1 0"/></filter>` +
    bl(`${k}b4`, 4) + bl(`${k}b20`, 20);
  const hairShort = (c: string): string => `<path d="M-30-170q-4-40 30-40t30 40q-8-22-22-24q-20 10-38 24z" fill="${c}"/>`;
  const body =
    `<rect width="800" height="600" fill="url(#${k}sky)"/><circle cx="130" cy="110" r="260" fill="url(#${k}sun)"/>` +
    // quarry wall + water
    `<path d="M0 250l60-70 90 20 70-60 100 30 80-50 110 40 90-30 80 50 120-20v200h-800z" fill="url(#${k}cl)"/>` +
    `<path d="M150 200l10 110M320 170l-20 150M510 180l10 130M690 210l-10 110M400 120l-10 90" stroke="#a87840" stroke-width="3" opacity=".5"/>` +
    `<path d="M0 330h800v40h-800z" fill="#5a8a8a" opacity=".7"/><path d="M0 360h800v240h-800z" fill="url(#${k}gr)"/>` +
    // sedan, nose-on
    `<path d="M170 300l50-90h360l50 90z" fill="#4a6a62"/><path d="M196 296l40-74h328l40 74z" fill="url(#${k}ws)"/><path d="M400 222v74" stroke="#4a6a62" stroke-width="5"/>` +
    `<path d="M70 404q10-90 90-108h480q80 18 90 108z" fill="url(#${k}car)"/><path d="M160 300h480" stroke="#e4f4ea" stroke-width="4" opacity=".8"/>` +
    `<rect x="56" y="398" width="688" height="112" rx="16" fill="#587a70"/><rect x="190" y="420" width="420" height="62" rx="6" fill="#1c2422"/><path d="M190 436h420M190 451h420M190 466h420" stroke="#8a9a96" stroke-width="3"/>` +
    `<circle cx="126" cy="450" r="34" fill="#fff8d8" stroke="#d8d8cc" stroke-width="6"/><circle cx="674" cy="450" r="34" fill="#fff8d8" stroke="#d8d8cc" stroke-width="6"/>` +
    `<rect x="40" y="504" width="720" height="34" rx="10" fill="#cfd6d2"/><rect x="40" y="504" width="720" height="10" rx="5" fill="#fff" opacity=".6"/><rect x="350" y="508" width="100" height="28" fill="#f4f0dc"/>` +
    `<rect x="70" y="536" width="90" height="50" rx="8" fill="#16130f"/><rect x="640" y="536" width="90" height="50" rx="8" fill="#16130f"/><ellipse cx="400" cy="590" rx="380" ry="16" fill="#2a1a0c" opacity=".5" filter="url(#${k}b4)"/>` +
    // Vera — bandana
    kid({ x: 150, skin: '#e2b08a', hair: '#1a1416', top: '#2a2a30', jeans: '#3c4a66',
      hairP: `<path d="M-32-160q-8-52 32-52t32 52q2 30-6 40q0-50-26-64q-26 14-26 64q-8-10-6-40z" fill="#1a1416"/><path d="M-30-193q30-14 60 0l-1 11q-29-12-58 0z" fill="#d83a3a"/><path d="M28-192l16 4-10 8z" fill="#d83a3a"/>`,
      extra: `<path d="M-44-100q-20 50-10 96M44-100q22 40 30 74" stroke="#e2b08a" stroke-width="16" fill="none" stroke-linecap="round"/>` }) +
    // Nadia — long hair
    kid({ x: 286, skin: '#d6a27c', hair: '#241a18', top: '#e8dcc0', jeans: '#5a6a8a',
      hairP: `<path d="M-30-170q-4-42 30-42t30 42q-10-24-30-26q-20 2-30 26zM-33-176q-9 74-1 122h19q-8-62 2-112zM33-176q9 74 1 122h-19q8-62-2-112z" fill="#241a18"/>`,
      extra: `<path d="M-42-100q-12 50-2 92M42-100q14 50 2 92" stroke="#e8dcc0" stroke-width="18" fill="none" stroke-linecap="round"/>` }) +
    // Julian — polo
    kid({ x: 418, skin: '#ecc4a0', hair: '#5a4028', top: '#8fc0e0', jeans: '#c8b890',
      hairP: hairShort('#5a4028'),
      extra: `<path d="M-14-120l14 22 14-22 8 6-22 30-22-30z" fill="#fff"/><path d="M0-98v30" stroke="#5a8ab0" stroke-width="3"/><path d="M-46-96q-16 44 14 84M46-96q16 44-14 84" stroke="#ecc4a0" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M-50-104l16-14v36l-20 6zM50-104l-16-14v36l20 6z" fill="#8fc0e0"/>` }) +
    // Low — yellow disposable camera
    kid({ x: 546, skin: '#f0c8a0', hair: '#3a2414', top: '#2f5f7c', jeans: '#44506a',
      hairP: `<path d="M-32-168q-6-46 32-46t32 46q-8-24-24-26q-18 12-40 26z" fill="#3a2414"/><path d="M-13-162q13 18 26 0z" fill="#fff" stroke="#8a4034" stroke-width="2"/>`,
      extra: `<path d="M-44-100q-16 50 22 44M44-100q16 50-22 44" stroke="#f0c8a0" stroke-width="16" fill="none" stroke-linecap="round"/><rect x="-33" y="-88" width="66" height="42" rx="5" fill="#f6cb1c" stroke="#b88a08" stroke-width="2"/><circle cx="-8" cy="-68" r="11" fill="#1c1a16"/><rect x="12" y="-82" width="15" height="10" fill="#fff"/><rect x="-33" y="-54" width="66" height="8" fill="#1c1a16"/>` }) +
    // Owen — the only red jacket
    kid({ x: 684, s: 1.06, skin: '#e8be9a', hair: '#6e4a2e', top: RED, jeans: '#3a4660',
      hairP: hairShort('#6e4a2e'),
      extra:
        `<path d="M-46-70h92v22h-92z" fill="#f6f2ea"/><path d="M0-118v118" stroke="${RED_D}" stroke-width="3"/><path d="M-16-122q16 14 32 0l6 10q-22 18-44 0z" fill="${RED_D}"/>` +
        `<path d="M-44-104q-26 50-20 100" stroke="${RED}" stroke-width="22" fill="none" stroke-linecap="round"/>` +
        `<path d="M30-116q40 4 44 40l6 120h-44l-10-120z" fill="${RED}" stroke="${RED_D}" stroke-width="2"/><path d="M36 30h44v10h-44z" fill="#f6f2ea"/><path d="M34-112q34 6 38 38" stroke="${RED_L}" stroke-width="4" fill="none"/>` +
        `<text transform="translate(47 -96) rotate(88)" ${SANS} ${BOLD} font-size="23" fill="#fff" ${fit(120)}>HATCH XC</text><ellipse cx="60" cy="50" rx="13" ry="10" fill="#e8be9a"/>` }) +
    // warm overexposed film look
    `<rect width="800" height="600" fill="#ffb04a" opacity=".2" style="mix-blend-mode:soft-light"/><rect width="800" height="600" fill="#fff0c8" opacity=".12"/>` +
    `<circle cx="130" cy="110" r="330" fill="url(#${k}sun)" opacity=".55"/><rect x="640" width="160" height="600" fill="url(#${k}lk)" opacity=".5" filter="url(#${k}b20)"/>`;
  return frame(k, 800, 600, defs, body, 0.26, 0.4);
})();

A.c5_ph_firstaid = (() => {
  const k = 'c5_ph_firstaid';
  const defs =
    lg(`${k}wl`, [[0, '#c9c4b0'], [1, '#9a9684']]) +
    lg(`${k}tb`, [[0, '#d8c8a4'], [1, '#a89468']]) +
    rg(`${k}or`, [[0, '#ffc04a'], [0.6, '#f08a1c'], [1, '#b85a0c']], 0.36, 0.3, 0.75) +
    lg(`${k}cd`, [[0, '#9a8460'], [1, '#5e4e34']], 1, 1) +
    rg(`${k}lt`, [[0, '#fff6dc', 0.22], [0.6, '#000', 0], [1, '#000', 0.4]], 0.45, 0.3, 0.85) +
    bl(`${k}b4`, 4) + bl(`${k}b12`, 12);
  const owen =
    // cardigan torso
    `<path d="M40 470q-10-190 100-220h160q110 30 100 220z" fill="url(#${k}cd)"/><path d="M178 250l42 110 42-110z" fill="#1f5c5e"/><path d="M182 250l38 40-16 12-30-44zM258 250l-38 40 16 12 30-44z" fill="#2c7a7c"/>` +
    `<path d="M160 254l60 216M280 254l-60 216" stroke="#b8a074" stroke-width="5" fill="none"/><path d="M186 256q34 120 34 150" stroke="#e0b53a" stroke-width="4" fill="none"/>` +
    // head
    `<path d="M190 190h60v64q-30 26-60 0z" fill="#b88a6a"/><ellipse cx="220" cy="140" rx="64" ry="76" fill="#e8be9a"/><ellipse cx="156" cy="146" rx="8" ry="16" fill="#e8be9a"/><ellipse cx="284" cy="146" rx="8" ry="16" fill="#c99a78"/>` +
    `<path d="M156 150q6 40 26 44q38-16 76 0q20-4 26-44q4 70-28 96q-36 22-72 0q-32-26-28-96z" fill="#6e4a2e"/>` +
    `<path d="M186 184q34 38 68 0q-34 10-68 0z" fill="#fffdf4" stroke="#4a2e1a" stroke-width="3"/>` +
    `<path d="M154 134q-10-80 66-80t66 80q-10-40-40-48q-40 20-92 48z" fill="#6e4a2e"/>` +
    `<g fill="#fff6e0" fill-opacity=".2" stroke="#8a5424" stroke-width="5"><circle cx="192" cy="144" r="24"/><circle cx="250" cy="144" r="24"/><path d="M216 142q5-4 10 0M168 140l-12-4M274 140l12-4" fill="none"/></g>` +
    `<path d="M182 146q10-8 20 0M240 146q10-8 20 0" stroke="#2a1a12" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M176 112q16-10 30-4M236 108q16-6 30 4" stroke="#5a3c24" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  const body =
    `<rect width="800" height="600" fill="url(#${k}wl)"/>` +
    // staff-room wall: noticeboard, lockers
    `<rect x="470" y="30" width="290" height="190" fill="#8a6a44"/><rect x="480" y="40" width="270" height="170" fill="#b8925e"/><g transform="rotate(-3 560 110)"><rect x="500" y="60" width="90" height="110" fill="#f4f0e2"/><path d="M512 84h66M512 100h66M512 116h50M512 132h60" stroke="#8a8a84" stroke-width="4"/></g><rect x="620" y="70" width="100" height="70" fill="#f2d86a" transform="rotate(4 670 100)"/><circle cx="546" cy="64" r="5" fill="#c8322a"/>` +
    `<path d="M0 0h130v330h-130z" fill="#6a7a80"/><path d="M64 0v330M0 110h130" stroke="#4a5a60" stroke-width="3"/><rect width="800" height="330" fill="#3a3020" opacity=".12"/>` +
    owen +
    // table
    `<path d="M0 420h800v180h-800z" fill="url(#${k}tb)"/><path d="M0 420h800" stroke="#f2e6c8" stroke-width="4"/>` +
    // orange + hands + trainer pen
    `<ellipse cx="420" cy="536" rx="96" ry="16" fill="#3a2a10" opacity=".45" filter="url(#${k}b4)"/><circle cx="414" cy="462" r="74" fill="url(#${k}or)"/><path d="M380 420q16-12 34-10" stroke="#ffe09a" stroke-width="6" fill="none" stroke-linecap="round" opacity=".7"/>` +
    `<path d="M290 470q-70-10-130-60l34-60q60 56 126 70z" fill="url(#${k}cd)"/><path d="M300 440q40-10 60 10q10 30-8 50q-34 14-62-10z" fill="#e8be9a"/><path d="M330 446l26 16M324 462l30 14M318 478l28 10" stroke="#b88a6a" stroke-width="3"/>` +
    pen(520, 368, 1.2, 132, '#8d9499', '#5e666c', 'TRAINER') +
    `<path d="M664 300q-80 40-100 60l-34 30q-10 24 14 34q30 4 50-22l40-30q60-20 110-22z" fill="#e8be9a"/><path d="M552 384l24 22M570 370l26 20M590 356l24 18" stroke="#b88a6a" stroke-width="3"/>` +
    `<path d="M640 290q80-30 160-20v110q-80-10-140 10z" fill="url(#${k}cd)"/>` +
    // binder + the real injector (yellow cap)
    `<g transform="rotate(-4 180 520)"><rect x="24" y="486" width="250" height="110" rx="6" fill="#3a2a10" opacity=".4" filter="url(#${k}b4)"/><rect x="20" y="476" width="250" height="110" rx="6" fill="#c8322a"/><rect x="20" y="476" width="30" height="110" fill="#9a1c18"/><rect x="118" y="500" width="64" height="64" rx="6" fill="#fff"/><path d="M150 510v44M128 532h44" stroke="#c8322a" stroke-width="13"/></g>` +
    `<ellipse cx="654" cy="548" rx="130" ry="12" fill="#3a2a10" opacity=".45" filter="url(#${k}b4)"/>` + pen(650, 528, 1.1, -5, '#f6cb1c', '#c79a0c') +
    `<rect width="800" height="600" fill="url(#${k}lt)"/>`;
  return frame(k, 800, 600, defs, body, 0.15, 0.45);
})();

A.c5_ph_brownies = (() => {
  const k = 'c5_ph_brownies';
  let fad = '', knobs = '', doily = '';
  for (let i = 0; i < 9; i++) {
    const x = 60 + i * 60, y = [700, 660, 720, 690, 650, 730, 680, 700, 670][i];
    fad += `<rect x="${x - 3}" y="620" width="6" height="150" rx="3" fill="#050607"/><rect x="${x - 14}" y="${y}" width="28" height="42" rx="4" fill="#c9ced2"/><rect x="${x - 14}" y="${y + 18}" width="28" height="5" fill="#${i === 4 ? 'e0242a' : '2a2e32'}"/>`;
    knobs += `<circle cx="${x}" cy="586" r="13" fill="#${['2c8a94', 'c9a24c', '2c8a94'][i % 3]}" stroke="#0a0c0e" stroke-width="3"/><path d="M${x} 586l${[4, -6, 7][i % 3]}-11" stroke="#fff" stroke-width="2.500"/>`;
  }
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * Math.PI * 2;
    doily += `<circle cx="${r0(300 + Math.cos(a) * 196)}" cy="${r0(470 + Math.sin(a) * 66)}" r="17"/>`;
  }
  const defs =
    lg(`${k}bg`, [[0, '#101418'], [1, '#1c2228']]) +
    lg(`${k}cs`, [[0, '#2e353c'], [1, '#14181c']]) +
    lg(`${k}bx`, [[0, '#f6f0e2'], [1, '#d6cdb8']]) +
    lg(`${k}mn`, [[0, '#0d5a66'], [1, '#062a32']]) +
    lg(`${k}bl`, [[0, '#f0c66a'], [1, '#c08a34']]) +
    lg(`${k}bk`, [[0, '#2e2420'], [1, '#0e0b0a']]) +
    rg(`${k}lt`, [[0, '#ffe8c0', 0.25], [0.6, '#000', 0], [1, '#000', 0.45]], 0.5, 0.5, 0.8) +
    bl(`${k}b4`, 4) + bl(`${k}b12`, 12);
  const body =
    `<rect width="600" height="800" fill="url(#${k}bg)"/>` +
    // small monitor
    `<rect x="24" y="24" width="210" height="150" rx="8" fill="#050607" stroke="#3a424a" stroke-width="3"/><rect x="36" y="36" width="186" height="120" fill="url(#${k}mn)"/><path d="M36 96l60-12 50 10v20l-110 30z" fill="#7fd2cf" opacity=".6"/><rect x="170" y="112" width="26" height="18" fill="#8a969c"/><rect x="176" y="118" width="14" height="6" fill="#ff3524"/>` +
    tx(42, 52, 11, 'CAM 9 · QUARRY', '#bff6f0', MONO, `${BOLD} ${fit(96)}`) + `<circle cx="210" cy="48" r="4" fill="#ff3524"/>` +
    // bakery box lid propped up
    `<path d="M120 70h440l-10 320h-420z" fill="#000" opacity=".5" filter="url(#${k}b12)"/><path d="M110 56h440l-14 322h-412z" fill="url(#${k}bx)"/><path d="M110 56h440l-2 14h-436z" fill="#fff" opacity=".7"/><path d="M124 378l10-18h392l10 18z" fill="#b8ae98"/>` +
    `<circle cx="330" cy="212" r="136" fill="#f4e6c0" stroke="#3a2a1a" stroke-width="4"/><circle cx="330" cy="212" r="124" fill="none" stroke="#3a2a1a" stroke-width="1.500" stroke-dasharray="3 5"/>` +
    `<path d="M330 96v30M320 104q10-14 20 0q4 16-10 22q-14-6-10-22z" fill="none" stroke="#3a2a1a" stroke-width="3"/>` +
    tx(330, 172, 31, 'KETTLE & CRUMB', '#3a2a1a', SERIF, `${BOLD} ${MID} ${fit(224)}`) +
    tx(330, 204, 26, '—', '#b0483c', SERIF, `${BOLD} ${MID}`) +
    tx(330, 242, 30, 'BLACK SESAME', '#16130f', SANS, `${BOLD} ${MID} ${fit(220)}`) +
    tx(330, 282, 30, '+ HONEY', '#b07a14', SANS, `${BOLD} ${MID} ${fit(136)}`) +
    // console
    `<path d="M0 400h600v400h-600z" fill="url(#${k}cs)"/><path d="M0 400h600" stroke="#59626a" stroke-width="3"/>` +
    knobs + fad +
    // doily + brownies
    `<ellipse cx="304" cy="486" rx="216" ry="80" fill="#000" opacity=".5" filter="url(#${k}b4)"/><g fill="#f6f2e8">${doily}<ellipse cx="300" cy="470" rx="200" ry="68"/></g><ellipse cx="300" cy="470" rx="170" ry="54" fill="none" stroke="#d8d2c2" stroke-width="2" stroke-dasharray="6 6"/>` +
    `<path d="M150 440l110-22 30 30v48l-112 24-28-32z" fill="#a8742a"/><path d="M150 440l110-22 30 30-112 24z" fill="url(#${k}bl)"/><path d="M178 472v48" stroke="#8a5c1c" stroke-width="2"/><path d="M170 446l80-16M190 458l70-14" stroke="#fbe6a8" stroke-width="3" opacity=".7"/>` +
    `<path d="M320 436l112-18 28 32v48l-114 20-26-34z" fill="#050404"/><path d="M320 436l112-18 28 32-114 20z" fill="url(#${k}bk)"/><path d="M346 470v48" stroke="#000" stroke-width="2"/>` +
    `<g fill="#e8e0cc"><circle cx="360" cy="444" r="2"/><circle cx="384" cy="436" r="2"/><circle cx="410" cy="446" r="2"/><circle cx="430" cy="434" r="2"/><circle cx="392" cy="456" r="2"/><circle cx="366" cy="460" r="2"/><circle cx="440" cy="452" r="2"/></g>` +
    `<rect width="600" height="800" fill="url(#${k}lt)"/>`;
  return frame(k, 600, 800, defs, body, 0.16, 0.5);
})();

A.c5_ph_debate = (() => {
  const k = 'c5_ph_debate';
  const R = rng(5);
  let pop = '';
  for (let i = 0; i < 46; i++) {
    const x = 250 + R() * 300, y = 470 + R() * 60 - Math.abs(x - 400) * 0.12;
    pop += `<circle cx="${r0(x)}" cy="${r0(y)}" r="${r0(13 + R() * 9)}" fill="#${['f4e8c0', 'e8d49a', 'fff6dc', 'd8c080'][i % 4]}"/>`;
  }
  const podium = (x: number): string =>
    `<path d="M${x - 46} 330h92l-10 100h-72z" fill="#16233c"/><rect x="${x - 54}" y="318" width="108" height="14" fill="#2a3c60"/><path d="M${x} 318v-22" stroke="#0a0c10" stroke-width="3"/><circle cx="${x}" cy="294" r="4" fill="#0a0c10"/><path d="M${x - 20} 356l20 14 20-14v30h-40z" fill="#c9a24c" opacity=".8"/>`;
  const defs =
    lg(`${k}rm`, [[0, '#14110f'], [1, '#07060a']]) +
    lg(`${k}tv`, [[0, '#1c3a6a'], [1, '#0c1c38']]) +
    rg(`${k}gl`, [[0, '#6a9ae0', 0.5], [1, '#6a9ae0', 0]]) +
    lg(`${k}bw`, [[0, '#d8c8a0'], [1, '#6a5a3a']]) +
    bl(`${k}b3`, 3) + bl(`${k}b6`, 6) + bl(`${k}b30`, 30) +
    `<clipPath id="${k}c"><rect x="120" y="60" width="560" height="330"/></clipPath>`;
  const screen =
    `<g clip-path="url(#${k}c)"><rect x="120" y="60" width="560" height="330" fill="url(#${k}tv)"/>` +
    `<path d="M120 60h560v60q-280 40-560 0z" fill="#2a4a80"/><path d="M360 80l12 26 28 4-20 20 5 28-25-13-25 13 5-28-20-20 28-4z" fill="#c9a24c" opacity=".35" transform="translate(40 30)"/>` +
    // opponent (right)
    `<path d="M494 340q0-70 46-76t50 76z" fill="#5a2a34"/><ellipse cx="540" cy="234" rx="23" ry="28" fill="#c89a78"/><path d="M516 232q0-30 24-30t24 30q8 30-2 44q-4-40-22-50q-18 10-22 50q-10-14-2-44z" fill="#2a1a14"/>` + podium(540) +
    // Julian (left), mid-sentence
    `<path d="M196 340q0-80 64-86t64 86z" fill="#18264a"/><path d="M246 256l14 30 14-30z" fill="#f2f4f8"/><path d="M257 262h6l2 40-5 8-5-8z" fill="#a8222a"/>` +
    `<path d="M310 300q30-20 40-50" stroke="#18264a" stroke-width="18" fill="none" stroke-linecap="round"/><circle cx="352" cy="244" r="10" fill="#e9c4a4"/>` +
    `<ellipse cx="260" cy="218" rx="28" ry="33" fill="#e9c4a4"/><path d="M232 214q-4-36 30-36t28 36q-6-20-18-22q-18 4-40 22z" fill="#4a3424"/><path d="M246 216h8M266 216h8" stroke="#1a1310" stroke-width="3"/><ellipse cx="260" cy="236" rx="7" ry="5" fill="#5a1c1c"/>` +
    podium(260) +
    `<path d="M120 400q280-50 560 0v-10h-560z" fill="#0a1020"/>` +
    // lower third + bug
    `<rect x="120" y="318" width="560" height="52" fill="#0a1020" opacity=".92"/><rect x="120" y="318" width="10" height="52" fill="#e0242a"/><rect x="120" y="314" width="560" height="4" fill="#c9a24c"/>` +
    tx(142, 354, 28, 'KPRT LIVE · HARBOR CO. DA DEBATE', '#fff', SANS, `${BOLD} ${fit(520)}`) +
    `<rect x="496" y="72" width="172" height="36" rx="4" fill="#e0242a"/>` + tx(582, 98, 23, 'LIVE 11:14 PM', '#fff', SANS, `${BOLD} ${MID} ${fit(152)}`) +
    `<path d="M120 60l200 0-120 330h-80z" fill="#fff" opacity=".05"/></g>`;
  const body =
    `<rect width="800" height="600" fill="url(#${k}rm)"/>` +
    `<ellipse cx="400" cy="230" rx="460" ry="300" fill="url(#${k}gl)" opacity=".7"/>` +
    `<rect x="60" y="412" width="680" height="30" fill="#1c1612"/><rect x="60" y="412" width="680" height="4" fill="#5a6a8a" opacity=".6"/>` +
    `<rect x="104" y="44" width="592" height="362" rx="8" fill="#050506"/>` + screen + `<rect x="340" y="404" width="120" height="10" fill="#050506"/>` +
    `<path d="M10 120q30 60 20 200M770 90q-20 80-4 240" stroke="#2a2420" stroke-width="30" fill="none" opacity=".5"/>` +
    // couch POV: knees under a blanket + popcorn bowl
    `<path d="M0 600v-90q90-60 190-20q30 40 20 110zM800 600v-100q-100-50-190-10q-30 40-20 110z" fill="#2a3040" filter="url(#${k}b6)"/>` +
    `<g filter="url(#${k}b3)">${pop}<path d="M216 496q184 60 368 0q-10 120-110 124h-148q-100-4-110-124z" fill="url(#${k}bw)"/><path d="M216 496q184 60 368 0" fill="none" stroke="#f4e8c8" stroke-width="5"/>` +
    `<path d="M250 540q150 40 300 0" stroke="#b03a2a" stroke-width="12" fill="none" opacity=".8"/></g>` +
    `<rect width="800" height="600" fill="#1c3a6a" opacity=".12"/>`;
  return frame(k, 800, 600, defs, body, 0.2, 0.6);
})();

A.c5_ph_abel = (() => {
  const k = 'c5_ph_abel';
  let knit = '';
  const cols = ['#b8483c', '#d8a23a', '#3c7a7a', '#e8dcc0', '#5a4a7a'];
  for (let j = 0; j < 4; j++)
    for (let i = 0; i < 6; i++) {
      const x = -30 + i * 116 + (j % 2) * 58, y = 500 + j * 86;
      knit += `<rect x="${x}" y="${y}" width="110" height="80" rx="8" fill="${cols[(i + j * 2) % 5]}"/><rect x="${x + 24}" y="${y + 18}" width="62" height="44" rx="6" fill="${cols[(i + j * 2 + 2) % 5]}"/><rect x="${x + 44}" y="${y + 30}" width="22" height="20" rx="4" fill="${cols[(i + j * 2 + 3) % 5]}"/>`;
    }
  const finger = (x: number, y: number, rot: number, len: number): string =>
    `<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="0" y="-21" width="${len}" height="42" rx="21" fill="url(#${k}sk)"/><path d="M${len * 0.36}-17q6 17 0 34M${len * 0.66}-16q5 16 0 32" stroke="#8a5a44" stroke-width="2.500" fill="none" opacity=".7"/><rect x="${len - 26}" y="-13" width="22" height="24" rx="10" fill="#f0d4c0" opacity=".7"/></g>`;
  const defs =
    lg(`${k}bg`, [[0, '#8a8a7a'], [1, '#4a4a40']]) +
    lg(`${k}sk`, [[0, '#d8a888'], [1, '#a87458']]) +
    lg(`${k}cup`, [[0, '#f8f4ea'], [0.6, '#e4dcc8'], [1, '#b8ae98']], 1, 0) +
    lg(`${k}sw`, [[0, '#6a7a8c'], [1, '#3a4654']]) +
    lg(`${k}tb`, [[0, '#c8b490'], [1, '#9a8462']]) +
    rg(`${k}lt`, [[0, '#fff4dc', 0.3], [0.5, '#000', 0], [1, '#000', 0.5]], 0.3, 0.25, 0.9) +
    streak5(`${k}kn`) + bl(`${k}b4`, 4) + bl(`${k}b12`, 12) +
    `<clipPath id="${k}bc"><path d="M0 520q150-70 300-40t300-30v350h-600z"/></clipPath>`;
  const body =
    `<rect width="600" height="800" fill="url(#${k}bg)"/>` +
    // side table with the visitor sticker
    `<path d="M0 60h600v150h-600z" fill="url(#${k}tb)"/><path d="M0 210h600v14h-600z" fill="#6a583c"/>` +
    `<g transform="rotate(-3 300 130)"><rect x="54" y="88" width="492" height="96" rx="10" fill="#000" opacity=".3" filter="url(#${k}b4)"/><rect x="50" y="82" width="492" height="96" rx="10" fill="#fbfaf4"/><rect x="50" y="82" width="492" height="26" rx="10" fill="#2c7a5a"/><rect x="50" y="98" width="492" height="10" fill="#2c7a5a"/>` +
    tx(296, 156, 30, 'BRIAR GLEN · VISITOR · ROOM 14', '#16201c', SANS, `${BOLD} ${MID} ${fit(456)}`) + `<path d="M480 82l62 40v-30q0-10-10-10z" fill="#d8d6cc"/></g>` +
    // cardigan body
    `<path d="M0 230q300-60 600 0v340h-600z" fill="url(#${k}sw)"/><path d="M300 210v330" stroke="#2a3440" stroke-width="5"/><circle cx="300" cy="300" r="9" fill="#c8b490"/><circle cx="300" cy="400" r="9" fill="#c8b490"/>` +
    `<path d="M40 240v300M90 232v300M510 232v300M560 240v300M160 224v300M440 224v300" stroke="#4a5868" stroke-width="5" opacity=".7"/>` +
    // blanket over the knees
    `<g clip-path="url(#${k}bc)"><rect y="440" width="600" height="360" fill="#3c2c2a"/>${knit}<rect y="440" width="600" height="360" filter="url(#${k}kn)" opacity=".25" transform="rotate(90 300 620)"/><path d="M0 520q150-70 300-40t300-30v60q-150 0-300 30t-300-10z" fill="#000" opacity=".3" filter="url(#${k}b12)"/></g>` +
    // sleeves
    `<path d="M0 330q110 10 200 110l-40 100q-80-50-160-50zM600 330q-110 10-200 110l40 100q80-50 160-50z" fill="url(#${k}sw)"/><path d="M196 440l-40 100M404 440l40 100" stroke="#8a98a8" stroke-width="14"/>` +
    // cup of tea
    `<ellipse cx="300" cy="600" rx="120" ry="18" fill="#000" opacity=".5" filter="url(#${k}b4)"/><path d="M226 400h148l-18 196h-112z" fill="url(#${k}cup)"/><ellipse cx="300" cy="400" rx="74" ry="16" fill="#f8f4ea"/><ellipse cx="300" cy="402" rx="64" ry="11" fill="#8a5a2a"/><path d="M256 400q30-8 60-2" stroke="#c8925a" stroke-width="3" fill="none"/>` +
    `<path d="M280 380q-14-30 6-50t0-50M320 384q-12-24 4-44" stroke="#fff" stroke-width="5" fill="none" opacity=".25" filter="url(#${k}b4)"/>` +
    // hands — big, scarred
    `<path d="M150 470q30-50 90-40q30 60 10 130q-50 30-104-6z" fill="url(#${k}sk)"/><path d="M450 470q-30-50-90-40q-30 60-10 130q50 30 104-6z" fill="#a87458"/>` +
    finger(196, 452, 8, 130) + finger(190, 494, 4, 140) + finger(194, 536, -2, 132) + finger(206, 574, -8, 112) +
    `<g transform="translate(600 0) scale(-1 1)">` + finger(196, 468, 6, 104) + finger(190, 510, 2, 110) + finger(196, 552, -4, 104) + `</g>` +
    `<path d="M168 480l40 50M176 520l22-26M430 482l-34 44M236 470l30 22M420 540l-26-10" stroke="#f4dccc" stroke-width="3" fill="none" stroke-linecap="round" opacity=".85"/>` +
    `<path d="M160 470q10 40 0 80M440 470q-10 40 0 80M170 450q20-10 40-6" stroke="#7a4a38" stroke-width="2.500" fill="none" opacity=".6"/>` +
    `<g fill="#8a5a44" opacity=".5"><circle cx="176" cy="500" r="5"/><circle cx="430" cy="520" r="6"/><circle cx="184" cy="548" r="4"/></g>` +
    `<rect width="600" height="800" fill="url(#${k}lt)"/>`;
  return frame(k, 600, 800, defs, body, 0.17, 0.5);
})();
