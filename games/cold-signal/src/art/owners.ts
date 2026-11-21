// COLD SIGNAL — portraits of the phone owners (200x200, full-bleed; the engine clips to a circle).
// Same bust kit as the case avatars. Ids inside each SVG are prefixed with the art key.

type Stop = [number, string, number?];
const rg = (id: string, s: Stop[], cx: number, cy: number, r: number): string =>
  `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${s.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a === undefined ? '' : ` stop-opacity="${a}"`}/>`).join('')}</radialGradient>`;
const HEADP = 'M67 80C67 34 133 34 133 80C133 106 122 131 100 131C78 131 67 106 67 80Z';
const TORSO = 'M12 200C14 166 44 152 80 146H120C156 152 186 166 188 200Z';
const INK = '#1a1318';
/** Neck, ears, head with side shading and rim light. */
const hb = (skin: string, shade: string, rim: string): string =>
  `<path d="M85 118V150Q100 162 115 150V118Z" fill="${shade}"/><path d="M85 124V149Q90 153 95 155L93 132Z" fill="${skin}" opacity=".55"/>` +
  `<ellipse cx="67" cy="94" rx="5" ry="9" fill="${skin}"/><ellipse cx="133" cy="94" rx="5" ry="9" fill="${shade}"/><path d="${HEADP}" fill="${skin}"/>` +
  `<path d="M109 37C105 60 109 72 106 84C104 97 111 103 108 112C106 122 104 128 99 131C122 131 133 106 133 80C133 60 126 44 109 37Z" fill="${shade}" opacity=".72"/>` +
  `<path d="M70 62Q80 50 96 48Q78 56 72 76Z" fill="#fff" opacity=".13"/>` +
  `<path d="M131.500 68V80C131.500 105 121 129.500 100 129.500" fill="none" stroke="${rim}" stroke-width="2.200" opacity=".6"/>`;
const eyes = (iris: string, top: number): string => {
  const one = (cx: number, white: string): string =>
    `<path d="M${cx - 7} 91.500Q${cx} ${top} ${cx + 7} 91Q${cx} 94.500 ${cx - 7} 91.500Z" fill="${white}"/><circle cx="${cx}" cy="90.700" r="3" fill="${iris}"/><circle cx="${cx - 1.2}" cy="89.600" r=".9" fill="#fff"/>` +
    `<path d="M${cx - 7.5} 91.800Q${cx} ${top - 0.8} ${cx + 7.5} 91" fill="none" stroke="${INK}" stroke-width="1.900" stroke-linecap="round"/>`;
  return one(87, '#f1e9df') + one(113, '#b9ada6');
};
const line = (d: string, col: string, w: number, op = 1): string =>
  `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${op === 1 ? '' : ` opacity="${op}"`}/>`;
const nose = (col: string): string => line('M102 94Q105 104 105.500 108Q101 112 95 108.500', col, 1.9);

interface Av { bg: [string, string, string]; rim: string; torso: string; back?: string; inTorso?: string; front: string }
function avatar(k: string, o: Av): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs>` +
    rg(`${k}-b`, [[0, o.bg[0]], [0.55, o.bg[1]], [1, o.bg[2]]], 0.28, 0.2, 1.05) +
    rg(`${k}-v`, [[0.55, '#000', 0], [1, '#000', 0.55]], 0.5, 0.42, 0.75) +
    rg(`${k}-r`, [[0, o.rim, 0.5], [1, o.rim, 0]], 0.82, 0.3, 0.5) +
    `<clipPath id="${k}-s"><path d="${TORSO}"/></clipPath></defs>` +
    `<rect width="200" height="200" fill="url(#${k}-b)"/><rect width="200" height="200" fill="url(#${k}-r)"/>${o.back ?? ''}` +
    `<path d="${TORSO}" fill="${o.torso}"/><g clip-path="url(#${k}-s)">${o.inTorso ?? ''}<path d="M104 140H200V200H112Z" fill="#000" opacity=".26"/>` +
    `<path d="M120 146C156 152 186 166 188 200" fill="none" stroke="${o.rim}" stroke-width="5" opacity=".75"/></g>${o.front}` +
    `<rect width="200" height="200" fill="url(#${k}-v)"/></svg>`;
}

// Jonah "the Owl" Merrick — red beanie, stubble, headphones round his neck, owl-feather pin, lamp light
function avJonah(): string {
  const k = 'av_c2_jonah';
  const skin = '#c08458', shade = '#8a573a', dark = '#2a1a14', rim = '#ffcf8a';
  return avatar(k, {
    bg: ['#e0a050', '#74401c', '#160a06'], rim, torso: '#2f4a44',
    inTorso: line('M100 166V200', '#1f3430', 3) + line('M30 178Q50 166 70 168', '#4a6e64', 3, 0.7) +
      // owl-feather pin
      `<g transform="translate(56 180) rotate(-24)"><path d="M0 14Q-9 0 0-18Q9 0 0 14Z" fill="#b8854a"/><path d="M0 14Q-9 0 0-18Z" fill="#8a5a2a"/><path d="M-5-4l10 3M-6 3l11 3M-3-11l7 2" stroke="#3a2416" stroke-width="2"/><path d="M0-18V20" stroke="#f0e2c0" stroke-width="1.300"/><circle cx="0" cy="18" r="2.500" fill="#e8c048"/></g>`,
    front: hb(skin, shade, rim) +
      `<path d="M72 152L87 138L97 164L80 172Z" fill="#3c5c54"/><path d="M128 152L113 138L103 164L120 172Z" fill="#1f3430"/>` +
      // headphones round the neck
      line('M72 146Q100 176 128 146', '#1c1c26', 7) +
      `<rect x="58" y="132" width="20" height="34" rx="9" fill="#2a2a36" transform="rotate(12 68 149)"/><rect x="62" y="138" width="11" height="22" rx="5" fill="#c8862a" transform="rotate(12 68 149)"/>` +
      `<rect x="122" y="132" width="20" height="34" rx="9" fill="#15151c" transform="rotate(-12 132 149)"/><rect x="127" y="138" width="11" height="22" rx="5" fill="#7a4a10" transform="rotate(-12 132 149)"/>` +
      eyes('#3a2418', 86.8) + line('M77.500 79.500Q86 76.250 95 80M105 80Q114 76.250 122.500 79.500', dark, 3.4) + nose('#6e3e28') +
      // stubble
      `<path d="M66 88C67 122 80 137 100 137C120 137 133 122 134 88C130 101 123 106 113 104Q100 99 87 104C77 106 70 101 66 88Z" fill="${dark}" opacity=".5"/>` +
      line('M76 112h.01M82 121h.01M90 127h.01M100 130h.01M110 127h.01M118 121h.01M124 112h.01M86 108h.01M114 108h.01M95 122h.01M105 122h.01', dark, 1.6, 0.7) +
      line('M90 115Q100 121 110 115', '#e0a888', 2.4) + line('M73 91l-4 2M127 91l4 2', shade, 1.2, 0.7) +
      // beanie
      `<path d="M63 80C58 38 84 23 100 23C118 23 142 38 137 80Q100 62 63 80Z" fill="#9a3230"/><path d="M61 84Q100 66 139 84L139 70Q100 52 61 70Z" fill="#6e2222"/>` +
      `<path d="M70 68v12M80 64v12M90 61v12M100 60v12M110 61v12M120 64v12M130 68v12" stroke="#000" stroke-width="1.500" opacity=".3"/>` + line('M76 40Q90 28 106 28', '#fff', 3, 0.18),
  });
}

// Wren Calloway — auburn hair, studio headphones, knit sweater, determined eyes
function avWren(): string {
  const k = 'av_c3_wren';
  const skin = '#eec4a4', shade = '#c08e72', hair = '#9a3c1e', hairD = '#6a2410', hairL = '#d06a34', rim = '#ffc890';
  return avatar(k, {
    bg: ['#4a8a9a', '#1e4252', '#07141a'], rim, torso: '#e4d6b4',
    back: `<path d="M58 92C50 40 82 22 102 22C134 22 152 46 142 96C150 116 142 130 148 148C150 164 132 168 122 158H78C68 168 50 164 52 148C58 130 50 116 58 92Z" fill="${hair}"/>` +
      `<path d="M112 24C144 32 150 66 142 96C150 116 142 130 148 148C150 164 132 168 122 158H112Z" fill="${hairD}" opacity=".7"/>` + line('M56 108Q52 126 58 146M64 128Q62 142 68 154M144 108Q148 126 142 146', hairL, 2.2, 0.8),
    inTorso: `<path d="M24 170v30M38 164v36M52 160v40M66 157v43M134 157v43M148 160v40M162 164v36M176 170v30" stroke="#b8a880" stroke-width="2" opacity=".7"/>` +
      `<path d="M92 162q-8 8 0 16t0 16t0 16M108 162q8 8 0 16t0 16t0 16" fill="none" stroke="#b8a880" stroke-width="2.500"/>`,
    front: hb(skin, shade, rim) +
      // roll neck
      `<path d="M74 150Q100 136 126 150L130 164Q100 176 70 164Z" fill="#efe4c8"/><path d="M100 142Q114 142 126 150L130 164Q116 170 100 172Z" fill="#000" opacity=".16"/><path d="M80 148v18M90 145v24M100 144v27M110 145v24M120 148v18" stroke="#b8a880" stroke-width="1.800" opacity=".8"/>` +
      eyes('#3f7a5a', 86.2) +
      // level, set brows
      line('M77 80.500Q86 77 95.500 81.500M104.500 81.500Q114 77 123 80.500', hairD, 3.2) + nose('#a8684c') +
      line('M91 116Q100 118.500 109 115.500', '#a04038', 2.4) + line('M110 113.500q1.500 1.500 1 3.500', '#a04038', 1.3, 0.7) +
      line('M80 100h.01M85 103h.01M90 100h.01M110 100h.01M115 103h.01M120 100h.01M100 99h.01', '#b0704c', 1.7, 0.6) +
      // hair, side-swept
      `<path d="M64 90C56 44 84 28 104 29C128 30 144 50 136 90C134 72 128 60 116 54C98 62 76 64 64 90Z" fill="${hair}"/><path d="M114 31C134 38 142 60 136 90C134 72 128 60 116 54Z" fill="${hairD}" opacity=".6"/>` +
      line('M72 62Q86 44 108 40M78 70Q92 54 116 50', hairL, 2.2, 0.85) + line('M64 88Q60 102 64 116M136 88Q140 102 136 116', hair, 5) +
      // studio headphones, on
      line('M62 84C54 28 146 28 138 84', '#15171c', 8) + line('M66 62Q76 34 100 31', '#5a6070', 2, 0.9) +
      `<rect x="50" y="74" width="20" height="40" rx="9" fill="#23262e"/><rect x="54" y="80" width="9" height="28" rx="4" fill="#c8862a"/><rect x="130" y="74" width="20" height="40" rx="9" fill="#101216"/><rect x="137" y="80" width="9" height="28" rx="4" fill="#7a4a10"/>`,
  });
}

export const ownerArt: Record<string, string> = {
  av_c2_jonah: avJonah(),
  av_c3_wren: avWren(),
};
