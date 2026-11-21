// COLD SIGNAL — CAUGHT mode, case C3 "Fantasy League" art (owner: Dana Hoyt; player: Doug).
// Every value in `caught3Art` is a complete standalone SVG document string; internal ids are
// prefixed with the art key. Suggestive, never explicit. Spec: specs-caught.md (C3).

const SANS = 'font-family="Helvetica, Arial, sans-serif"';
const HAND = 'font-family="Marker Felt, Chalkboard SE, Comic Sans MS, sans-serif"';
const R = (v: number): number => Math.round(v);
const tx = (x: number, y: number, size: number, s: string, fill: string, extra = '', font = SANS): string =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" ${font} font-weight="700" text-anchor="middle" ${extra}>${s}</text>`;
const lg = (id: string, a: string, b: string, x2 = 0, y2 = 1): string =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const glow = (id: string, c: string, a = 0.8): string =>
  `<radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="${a}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;

/** Form-shadow + rim-light filter: shades the right edge of whatever silhouette it is applied to. */
const shf = (id: string, rim: string, dx = -11, d = 0.36, rdx = -4): string =>
  `<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%"><feOffset in="SourceAlpha" dx="${dx}" dy="3" result="o"/><feComposite in="SourceAlpha" in2="o" operator="out" result="e"/><feFlood flood-color="#0c0814" flood-opacity="${d}"/><feComposite in2="e" operator="in" result="s"/><feOffset in="SourceAlpha" dx="${rdx}" dy="${rdx < 0 ? 0 : 2}" result="p"/><feComposite in="SourceAlpha" in2="p" operator="out" result="q"/><feFlood flood-color="${rim}" flood-opacity=".95"/><feComposite in2="q" operator="in" result="r"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="s"/><feMergeNode in="r"/></feMerge></filter>`;

/** Wraps a picture: defs + clip + film grain + vignette. Figures use filter url(#<k>f). */
const frame = (k: string, w: number, h: number, rim: string, defs: string, body: string, vig = 0.55, grain = 0.14, rdx = -4): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><defs>${defs}${shf(`${k}f`, rim, rdx < 0 ? -11 : -9, 0.36, rdx)}` +
  `<filter id="${k}gr" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="7"/><feColorMatrix values=".6 .6 .6 0 -.4 .6 .6 .6 0 -.4 .6 .6 .6 0 -.4 0 0 0 0 1"/></filter>` +
  `<radialGradient id="${k}vg" cx=".5" cy=".5" r=".75"><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="${vig}"/></radialGradient>` +
  `<clipPath id="${k}fr"><rect width="${w}" height="${h}"/></clipPath></defs><g clip-path="url(#${k}fr)">${body}<rect width="${w}" height="${h}" filter="url(#${k}gr)" opacity="${grain}" style="mix-blend-mode:overlay"/><rect width="${w}" height="${h}" fill="url(#${k}vg)"/></g></svg>`;

/** Tapered limb through joints [x, y, radius]. */
function limb(...p: number[][]): string {
  let d = '';
  for (let i = 0; i < p.length; i++) {
    const [x, y, r] = p[i];
    d += `M${R(x - r)} ${R(y)}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`;
    if (i) {
      const [a, b, q] = p[i - 1];
      const L = Math.hypot(x - a, y - b) || 1, nx = -(y - b) / L, ny = (x - a) / L;
      d += `M${R(a + nx * q)} ${R(b + ny * q)}L${R(x + nx * r)} ${R(y + ny * r)}L${R(x - nx * r)} ${R(y - ny * r)}L${R(a - nx * q)} ${R(b - ny * q)}Z`;
    }
  }
  return `<path d="${d}"/>`;
}
const at = (x: number, y: number, s: number, rot: number, body: string): string =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${body}</g>`;

// ---------- faces (same 200-unit geometry as the contact avatars; head centre = 100,85) ----------
interface Face {
  sk: string; sh: string; rim: string; iris: string; brows: string; browC: string; mouth: string;
  lid?: number; lash?: boolean; shadow?: string; back?: string; front?: string; under?: string; dead?: boolean;
}
const HEAD = 'M67 80C67 34 133 34 133 80C133 106 122 131 100 131C78 131 67 106 67 80Z';
function face(o: Face): string {
  const lid = o.lid ?? 0.9;
  const c = 85.4 + lid * 1.6;
  const eye = (x: number): string =>
    `<path d="M${x - 7} 91.500Q${x} 85.500 ${x + 7} 91Q${x} 96.500 ${x - 7} 91.500Z" fill="#f1e9df"/><circle cx="${x}" cy="91" r="3.500" fill="${o.iris}"/>${o.dead ? '' : `<circle cx="${x - 1.2}" cy="90.400" r=".9" fill="#fff"/>`}` +
    `<path d="M${x - 8.5} 92Q${x} ${c} ${x + 8.5} 91.400V82H${x - 8.5}Z" fill="${o.sk}"/>` +
    (o.shadow ? `<path d="M${x - 8.5} 92Q${x} ${c} ${x + 8.5} 91.400Q${x} ${c - 9} ${x - 8.5} 92Z" fill="${o.shadow}" opacity=".6"/>` : '');
  return (o.back ?? '') +
    `<ellipse cx="67" cy="94" rx="5" ry="9" fill="${o.sk}"/><ellipse cx="133" cy="94" rx="5" ry="9" fill="${o.sh}"/>` +
    `<path d="${HEAD}" fill="${o.sk}"/>${o.under ?? ''}${eye(87)}${eye(113)}` +
    `<path d="M109 37C105 60 109 72 106 84C104 97 111 103 108 112C106 122 104 128 99 131C122 131 133 106 133 80C133 60 126 44 109 37Z" fill="${o.sh}" opacity=".72"/>` +
    `<path d="M70 62Q80 50 96 48Q78 56 72 76Z" fill="#fff" opacity=".13"/><path d="M131.500 68V80C131.500 105 121 129.500 100 129.500" fill="none" stroke="${o.rim}" stroke-width="2.400" opacity=".7"/>` +
    `<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M79 92Q87 ${c} 95 91.400M105 91.400Q113 ${c} 121 92${o.lash ? 'M79 92l-4-2.800M121 92l4-2.800' : ''}" stroke="#1a1318" stroke-width="${o.lash ? 2.5 : 2}"/>` +
    `<path d="${o.brows}" stroke="${o.browC}" stroke-width="3.200"/><path d="M102 95Q105 104 105.500 108Q101 112 95 108.500" stroke="#000" stroke-opacity=".38" stroke-width="1.900"/>${o.mouth}</g>${o.front ?? ''}`;
}
/** Place a face: (x,y) is the head centre. */
const hd = (x: number, y: number, s: number, rot: number, o: Face): string =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s}) translate(-100 -85)">${face(o)}</g>`;
const lips = (c: string, d: string, open = false): string =>
  `<path d="M88 114Q94 110.500 100 113Q106 110.500 112 114Q100 ${open ? 127 : 123} 88 114Z" fill="${c}" stroke="${d}" stroke-width="1"/>` +
  (open ? '<path d="M91 115Q100 117.500 109 115L107 118Q100 120 93 118Z" fill="#fff" stroke="none"/>' : `<path d="M88 114Q100 117.500 112 114" stroke="${d}" stroke-width="1.300"/>`);
const smirk = (c: string): string => `<path d="M90 116.500Q100 119.500 111 113" stroke="${c}" stroke-width="2.600"/><path d="M111 113q2.500-1 3-4" stroke="${c}" stroke-width="1.500"/>`;
const grin = (c: string, lip = ''): string => `<path d="M85.500 112.500Q100 117 114.500 112.500Q112 124 100 124Q88 124 85.500 112.500Z" fill="#fff" stroke="${lip || c}" stroke-width="${lip ? 2.4 : 1.6}"/><path d="M88 118Q100 121.500 112 118" stroke="${c}" stroke-width=".8" opacity=".5"/>`;
/** Laughing open mouth. */
const laugh = (c: string, lip = ''): string => `<path d="M85 111Q100 115 115 111Q113 128 100 128Q87 128 85 111Z" fill="#5a1620" stroke="${lip || c}" stroke-width="${lip ? 2.4 : 1.6}"/><path d="M87.500 112.500Q100 116 112.500 112.500L111.500 117Q100 119.500 88.500 117Z" fill="#fff" stroke="none"/><path d="M93 125Q100 121 107 125" fill="#e0647a" stroke="none"/>`;

// ---------- cast ----------
const HAIR = '#b47e3c', HAIRD = '#7a5226', VIS = '#19b3a6';
const visor = (c: string): string =>
  `<path d="M62 70Q100 52 138 70V58Q100 40 62 58Z" fill="${c}"/><path d="M110 46Q128 50 138 58V70Q126 62 110 58Z" fill="#000" opacity=".2"/><path d="M52 76Q100 46 148 76Q100 64 52 76Z" fill="#f4f6f2"/><path d="M100 61Q130 62 148 76Q124 68 100 66Z" fill="#000" opacity=".18"/>`;
const DANA_HAIR = `<path d="M65 86C58 40 84 28 100 28C118 28 142 40 135 86C132 66 122 52 100 52C78 52 68 66 65 86Z" fill="${HAIR}"/><path d="M110 30C134 34 140 60 135 86C132 68 124 56 110 53Z" fill="${HAIRD}" opacity=".7"/>`;
const TAIL = `<path d="M116 34Q160 14 168 62Q172 106 152 142Q150 104 140 80Q134 54 116 46Z" fill="${HAIR}"/><path d="M140 30Q170 44 168 82Q164 120 152 142Q158 96 150 66Z" fill="${HAIRD}" opacity=".75"/><circle cx="126" cy="38" r="6" fill="#e8496a"/>`;
const DANA: Face = {
  sk: '#e9b993', sh: '#b27c5e', rim: '#ffd9a0', iris: '#3f7a66', browC: '#7a5226', lash: true, lid: 0.7,
  brows: 'M77.500 79.500Q86 75 95 78M105 78Q114 75 122.500 79.500', mouth: grin('#8a3a40', '#d0506a'),
  under: '<circle cx="77" cy="105" r="9" fill="#f08a7a" opacity=".3"/><circle cx="123" cy="105" r="9" fill="#c8584a" opacity=".3"/>',
  back: TAIL, front: DANA_HAIR + visor(VIS),
};
/** Dana with no visor. */
const DANA2: Face = { ...DANA, front: DANA_HAIR };
const RAFE_BEARD = '<path d="M67 96C70 112 80 108 90 110Q100 106 110 110C120 108 130 112 133 96C132 120 120 131 100 131C80 131 68 120 67 96Z" fill="#6a4a28" opacity=".3"/>';
const CAPC = '#e8a020';
const RAFE: Face = {
  sk: '#dba77c', sh: '#a2704e', rim: '#ffe2b0', iris: '#3a6a94', browC: '#8a6230', lid: 0.6,
  brows: 'M76.500 78.500Q86 75.500 96 79.500M104 79.500Q114 75.500 123.500 78.500', mouth: grin('#7a3a34'), under: RAFE_BEARD,
  back: '<path d="M64 80L62 110Q68 106 70 88ZM136 80L138 110Q132 106 130 88Z" fill="#c89648"/>',
  front: `<path d="M65 74C58 22 142 22 135 74Q100 54 65 74Z" fill="${CAPC}"/><path d="M110 34C134 38 139 56 135 74Q124 66 110 62Z" fill="#000" opacity=".22"/><path d="M84 66Q100 44 116 66Q100 58 84 66Z" fill="#c89648"/><path d="M82 68Q100 42 118 68" fill="none" stroke="#fff" stroke-width="3"/><path d="M96 51h8" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`,
};
const DOUG: Face = {
  sk: '#e4b294', sh: '#aa7a62', rim: '#cfe0ff', iris: '#5c5c54', browC: '#5a4634', lid: 1.5, dead: true,
  brows: 'M77 80.500Q86 79 95.500 80.500M104.500 80.500Q114 79 123 80.500',
  mouth: '<path d="M85 115H115Q114 124 100 124Q86 124 85 115Z" fill="#fff" stroke="#6a3a34" stroke-width="1.600"/><path d="M92 115v8M100 115v9M108 115v8" stroke="#6a3a34" stroke-width=".7" opacity=".6"/><path d="M82 108Q79 114 82 121M118 108Q121 114 118 121" stroke="#7a4a3a" stroke-width="1.300" opacity=".7"/>',
  under: '<path d="M80 99Q87 103 94 99M106 99Q113 103 120 99" fill="none" stroke="#6a4a5a" stroke-width="2" opacity=".45"/>',
  front: '<path d="M66 84C60 52 76 40 88 38Q76 50 74 66Q70 74 66 84ZM134 84C140 52 124 40 112 38Q124 50 126 66Q130 74 134 84Z" fill="#6a5440"/><path d="M84 40Q100 33 116 40Q100 37 84 40Z" fill="#6a5440"/><path d="M86 111Q93 104 100 107Q107 104 114 111Q100 108 86 111Z" fill="#5a4634" stroke="#5a4634" stroke-width="2" stroke-linejoin="round"/>',
};
const BO: Face = {
  sk: '#b9825c', sh: '#7e5238', rim: '#d8ff9a', iris: '#2a1c14', browC: '#1c1412', lid: 2.5,
  brows: 'M77 80Q86 79 95.500 82M104.500 82Q114 79 123 80', mouth: '<path d="M91 117Q100 115.500 109 117" stroke="#5a2e28" stroke-width="2.600"/>',
  under: RAFE_BEARD.replace('#6a4a28', '#1c1412') + '<path d="M80 99Q87 104 94 99M106 99Q113 104 120 99" fill="none" stroke="#3a2030" stroke-width="2.400" opacity=".5"/>',
  front: '<path d="M64 88C56 40 84 26 102 28C124 26 144 44 136 88C134 70 130 60 120 54L112 62L104 52L94 62L86 52L78 62C70 66 66 76 64 88Z" fill="#1c1412"/><circle cx="66" cy="95" r="4.500" fill="#ff8a1e"/><circle cx="134" cy="95" r="4.500" fill="#d86a10"/>',
};
const TARA: Face = {
  sk: '#e6bc9e', sh: '#ae8068', rim: '#ffe6c0', iris: '#5a4030', browC: '#5a3a26', lash: true, lid: 1.8,
  brows: 'M77.500 78Q86 76 95 79.500M105 79.500Q114 76 122.500 78', mouth: '<path d="M90 115Q100 120 110 115" stroke="#a04a50" stroke-width="2.800"/>',
  under: '<path d="M80 99Q87 103 94 99M106 99Q113 103 120 99" fill="none" stroke="#7a5a6a" stroke-width="2" opacity=".45"/>',
  back: '<path d="M58 96C50 40 84 24 100 24C118 24 150 40 142 96C144 116 140 128 134 134H66C60 128 56 116 58 96Z" fill="#6a4630"/><path d="M110 26C148 34 148 80 142 96C144 116 140 128 134 134H120Z" fill="#000" opacity=".25"/>',
  front: '<path d="M62 100C54 44 84 30 100 30C116 30 146 44 138 100C137 76 128 60 110 54C94 64 70 66 62 100Z" fill="#6a4630"/><path d="M68 76Q78 50 100 42" fill="none" stroke="#a07a54" stroke-width="2" stroke-linecap="round"/>',
};
const MEL: Face = {
  sk: '#c98e68', sh: '#8c5c42', rim: '#ffc0a0', iris: '#2a1810', browC: '#17101a', lash: true, lid: 2.2, shadow: '#6a2a5a',
  brows: 'M77.500 81Q86 78.500 95 81.500M105 79.500Q114 73 122.500 76', mouth: lips('#b01c3c', '#5a0a1c') + '<path d="M112 114q3-1 4-5" stroke="#5a1020" stroke-width="1.600"/>',
  back: '<path d="M56 100C46 36 86 20 100 20C116 20 154 36 144 100C146 114 142 124 136 128H64C58 124 54 114 56 100Z" fill="#17101a"/>',
  front: '<path d="M60 104C52 44 84 30 100 30C116 30 148 44 140 104C139 80 132 66 104 50C94 66 68 70 60 104Z" fill="#17101a"/><path d="M68 74Q80 46 104 40" fill="none" stroke="#5a4660" stroke-width="2" stroke-linecap="round"/><circle cx="66" cy="110" r="5" fill="none" stroke="#f3c64a" stroke-width="2.200"/>',
};
const LUCY: Face = {
  sk: '#eec3a2', sh: '#c2937a', rim: '#fff0d8', iris: '#3a6a94', browC: '#b08040', lid: 0.2,
  brows: 'M78 78Q86 74.500 94 77M106 77Q114 74.500 122 78',
  mouth: '<path d="M84 111Q100 116 116 111Q113 126 100 126Q87 126 84 111Z" fill="#fff" stroke="#b05a5a" stroke-width="1.800"/><rect x="100" y="113" width="6.500" height="6.500" fill="#7a2a30" stroke="none"/>',
  under: '<circle cx="76" cy="106" r="10" fill="#f08a8a" opacity=".35"/><circle cx="124" cy="106" r="10" fill="#d87a7a" opacity=".35"/><g fill="#b07a56" opacity=".6"><circle cx="92" cy="103" r="1.100"/><circle cx="97" cy="105" r="1.100"/><circle cx="109" cy="104" r="1.100"/><circle cx="114" cy="102" r="1.100"/></g>',
  back: '<path d="M60 70Q30 80 34 130Q48 120 52 96ZM140 70Q170 80 166 130Q152 120 148 96Z" fill="#c89648"/><circle cx="58" cy="78" r="6" fill="#e8496a"/><circle cx="142" cy="78" r="6" fill="#e8496a"/>',
  front: '<path d="M64 88C56 40 84 28 100 28C116 28 144 40 136 88C134 70 126 58 112 56L100 50L88 56C74 58 66 70 64 88Z" fill="#c89648"/><path d="M100 30V52" stroke="#9a6e30" stroke-width="2"/>',
};

// ---------- small props ----------
const paddle = (x: number, y: number, s: number, rot: number, c: string, c2: string): string =>
  at(x, y, s, rot, `<rect x="-7" y="30" width="14" height="46" rx="5" fill="#1c1c22"/><rect x="-7" y="44" width="14" height="5" fill="#fff" opacity=".5"/><rect x="-34" y="-58" width="68" height="94" rx="24" fill="${c}"/><rect x="-34" y="-58" width="68" height="94" rx="24" fill="none" stroke="${c2}" stroke-width="5"/><path d="M-18-30Q0-44 18-30" fill="none" stroke="#fff" stroke-width="4" opacity=".6"/>`);
const ball = (x: number, y: number, r: number): string =>
  at(x, y, r / 10, 0, '<circle r="10" fill="#e6f04a"/><path d="M0-10A10 10 0 0 1 0 10A14 14 0 0 0 0-10Z" fill="#000" opacity=".2"/><g fill="#6a7a14"><circle cx="-4" cy="-4" r="1.500"/><circle cx="3" cy="-5" r="1.500"/><circle cx="-5" cy="3" r="1.500"/><circle cx="1" cy="1" r="1.500"/><circle cx="4" cy="6" r="1.500"/></g>');
const wglass = (x: number, y: number, s: number, wine: string, lip = false): string =>
  at(x, y, s, 0, `<path d="M-16-60Q-20-22 0-14Q20-22 16-60Z" fill="#fff" opacity=".16"/><path d="M-17-42Q-18-22 0-14Q18-22 17-42Z" fill="${wine}"/><path d="M-16-60Q-20-22 0-14Q20-22 16-60M0-14V22M-14 24H14" fill="none" stroke="#fff" stroke-width="2.200" stroke-linecap="round" opacity=".75"/><path d="M-10-54V-30" stroke="#fff" stroke-width="2.400" stroke-linecap="round" opacity=".6"/>${lip ? '<path d="M6-60q5-3 10 0q-5 5-10 0Z" fill="#e0486a"/>' : ''}`);
/** Rotisserie chicken in a plastic dome (centre of tray = 0,0). */
const chicken = (x: number, y: number, s: number): string =>
  at(x, y, s, 0, '<path d="M-70 0H70L60 18H-60Z" fill="#14141a"/><ellipse cx="0" cy="-22" rx="44" ry="28" fill="#b8641c"/><ellipse cx="-8" cy="-30" rx="30" ry="14" fill="#e0943a"/><path d="M-44-12Q-66-10-62 4Q-48 6-36-4ZM44-12Q66-10 62 4Q48 6 36-4Z" fill="#a85a18"/><path d="M-22-34Q-6-42 12-36" stroke="#ffd08a" stroke-width="4" stroke-linecap="round" fill="none" opacity=".8"/><path d="M-66 0Q-66-62 0-64Q66-62 66 0Z" fill="#cfe6ff" opacity=".2"/><path d="M-66 0Q-66-62 0-64Q66-62 66 0" fill="none" stroke="#e6f2ff" stroke-width="2.500" opacity=".8"/><path d="M-50-18Q-46-48-14-56" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".6"/><rect x="-22" y="4" width="44" height="11" fill="#f2e24a"/>');
/** Thumbs-up fist. */
const thumb = (x: number, y: number, s: number, rot: number, sk: string, sh: string): string =>
  at(x, y, s, rot, `<g fill="${sk}"><path d="M-10 2Q-16-24-8-38Q4-44 6-30L6 4Z"/><rect x="-18" y="-4" width="40" height="40" rx="10"/></g><path d="M2 6H21M3 15H22M3 24H21" stroke="${sh}" stroke-width="2" fill="none"/><path d="M6-30L6 34H12Q22 34 22 24V6Q22-4 12-4H8Z" fill="${sh}" opacity=".35"/>`);
/** Tiny vector emoji (drawn, so no emoji font is needed). */
const eThumb = (x: number, y: number, s: number): string => thumb(x, y, s, 0, '#ffc83a', '#c8862a');
const eBall = (x: number, y: number, s: number): string =>
  at(x, y, s, -35, '<ellipse rx="15" ry="9.500" fill="#8a4a22"/><path d="M-8 0H8M-4-3V3M0-3V3M4-3V3" stroke="#fff" stroke-width="1.600"/>');
const ePickle = (x: number, y: number, s: number, rot = 25): string =>
  at(x, y, s, rot, '<rect x="-7" y="-16" width="14" height="32" rx="7" fill="#5fae3a"/><g fill="#2f6e1c"><circle cx="-2" cy="-8" r="1.400"/><circle cx="3" cy="-2" r="1.400"/><circle cx="-2" cy="5" r="1.400"/><circle cx="2" cy="10" r="1.400"/></g>');

/** Avatar-style bust in 200-unit space (top-left origin), body extended below. */
const bust = (top: string, o: Face, extra = '', rim = o.rim): string =>
  `<path d="M12 330V200C14 166 44 152 80 146H120C156 152 186 166 188 200V330Z" fill="${top}"/><path d="M104 146H120C156 152 186 166 188 200V330H112Z" fill="#000" opacity=".24"/><path d="M120 146C156 152 186 166 188 200V330" fill="none" stroke="${rim}" stroke-width="4" opacity=".7"/>` +
  `<path d="M85 118V150Q100 162 115 150V118Z" fill="${o.sh}"/><path d="M85 124V149Q90 153 95 155L93 132Z" fill="${o.sk}" opacity=".55"/>${extra}${face(o)}`;
const put = (x: number, y: number, s: number, rot: number, body: string): string =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s}) translate(-100 -85)">${body}</g>`;

/** 200x200 contact avatar. */
const av = (k: string, c1: string, c2: string, glowC: string, body: string): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><radialGradient id="${k}-b" cx=".28" cy=".2" r="1.050"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient><radialGradient id="${k}-v" cx=".5" cy=".42" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>${glow(`${k}-r`, glowC, 0.5)}<clipPath id="${k}-c"><rect width="200" height="200"/></clipPath></defs>` +
  `<g clip-path="url(#${k}-c)"><rect width="200" height="200" fill="url(#${k}-b)"/><circle cx="164" cy="60" r="100" fill="url(#${k}-r)"/>${body}<rect width="200" height="200" fill="url(#${k}-v)"/></g></svg>`;

// ---------- avatars ----------
const collar = (c: string, d: string): string => `<path d="M80 146L100 172L120 146L128 152L104 184H96L72 152Z" fill="${c}"/><path d="M100 172L120 146L128 152L104 184Z" fill="${d}"/>`;
const POLO = '#1f4f8a';
const pinn = (x: number, y: number, s: number): string =>
  at(x, y, s, 0, `<path d="M-13-9L-8-15L-3-9" fill="none" stroke="#f2b632" stroke-width="2"/><text x="-14" y="0" font-size="7" fill="#fff" ${SANS} font-weight="700">PINNACLE</text><text x="-14" y="7" font-size="5" fill="#f2b632" ${SANS} font-weight="700">GUTTERS</text>`);
const sweat = '<g fill="#dff4ff" opacity=".85"><path d="M72 84q-3 5 0 7q3-2 0-7ZM129 100q-3 5 0 7q3-2 0-7ZM78 60q-2 4 0 5q2-1 0-5Z"/></g>';

function avatars(): Record<string, string> {
  const vest = '<path d="M40 330V160L80 146L96 190V330ZM160 330V160L120 146L104 190V330Z" fill="#d8f028"/><path d="M48 178L90 166M152 178L110 166M40 210H96M104 210H160" stroke="#e8eef2" stroke-width="7"/><path d="M104 190L120 146L160 160V330H104Z" fill="#000" opacity=".2"/>';
  const ficus = '<g fill="#2f7a3a"><ellipse cx="24" cy="60" rx="20" ry="11" transform="rotate(-30 24 60)"/><ellipse cx="46" cy="36" rx="20" ry="11" transform="rotate(40 46 36)"/><ellipse cx="14" cy="100" rx="20" ry="11" transform="rotate(20 14 100)"/><ellipse cx="40" cy="84" rx="18" ry="10" transform="rotate(-50 40 84)"/><ellipse cx="20" cy="26" rx="18" ry="10" transform="rotate(-10 20 26)"/></g><path d="M30 200V40" stroke="#4a3420" stroke-width="5"/>';
  const drawing = '<g transform="rotate(-6 46 50)"><rect x="14" y="18" width="64" height="76" fill="#f6f0e0"/><circle cx="46" cy="18" r="4" fill="#e03a3a"/><circle cx="62" cy="36" r="8" fill="#f6c832"/><path d="M24 80L40 56L56 80Z" fill="#e8496a"/><rect x="30" y="80" width="20" height="8" fill="#5a9ad8"/><path d="M58 88V66M52 72L58 66L64 72" stroke="#3a8a3a" stroke-width="3" fill="none"/></g>';
  const mug = `<g transform="translate(150 164) rotate(-4)"><path d="M26-14Q48-12 44 8Q40 22 24 20" fill="none" stroke="#f4f0e6" stroke-width="7"/><rect x="-32" y="-28" width="60" height="64" rx="6" fill="#f4f0e6"/><path d="M10-28H22Q28-28 28-22V30Q28 36 22 36H10Z" fill="#000" opacity=".14"/>${tx(-2, -10, 9.5, "WORLD'S", '#c0392b')}${tx(-2, 4, 9.5, 'OKAYEST', '#2a2a34')}${tx(-2, 18, 11, 'MOM', '#c0392b')}</g><g fill="${TARA.sk}"><rect x="112" y="150" width="14" height="9" rx="4.500"/><rect x="111" y="161" width="14" height="9" rx="4.500"/><rect x="112" y="172" width="13" height="9" rx="4.500"/></g>`;
  return {
    av_cg3_dana: av('av_cg3_dana', '#ffb05a', '#2a3a6a', '#ffd08a',
      '<path d="M0 150H200V200H0Z" fill="#1c6a7a" opacity=".7"/><path d="M0 150H200" stroke="#fff" stroke-width="2" opacity=".6"/>' + bust('#f0f4f2', DANA, '<path d="M12 330V200C14 166 44 152 70 148Q100 190 130 148C156 152 186 166 188 200V330Z" fill="#ef5a6a"/><path d="M110 170Q124 160 130 148C156 152 186 166 188 200H112Z" fill="#000" opacity=".2"/>' + `<path d="M70 148Q100 190 130 148L120 146Q100 172 80 146Z" fill="${DANA.sk}"/>`) + sweat),
    av_cg3_doug: av('av_cg3_doug', '#7a8a9a', '#1c222e', '#cfe0ff',
      '<path d="M0 40H200M0 70H200M0 100H200M0 130H200" stroke="#fff" stroke-width="3" opacity=".08"/>' + bust(POLO, DOUG, collar('#2a62a8', '#16365e') + pinn(58, 178, 0.9)) + thumb(160, 150, 1.15, 8, DOUG.sk, DOUG.sh) + `<path d="M140 200Q142 184 152 184H178Q188 184 190 200Z" fill="${DOUG.sk}"/>`),
    av_cg3_rafe: av('av_cg3_rafe', '#58c8e8', '#1c3a7a', '#fff2b0',
      paddle(160, 92, 0.95, 28, '#2ad0a0', '#fff') + bust('#f4f6f2', RAFE, `<path d="M82 146Q100 170 118 146Z" fill="${RAFE.sk}"/><path d="M78 146Q100 176 122 146" fill="none" stroke="#2a6ad0" stroke-width="4"/>`) + `<g fill="${RAFE.sk}"><rect x="138" y="140" width="26" height="10" rx="5" transform="rotate(28 150 145)"/><rect x="134" y="151" width="26" height="10" rx="5" transform="rotate(28 146 156)"/></g>`),
    av_cg3_league: av('av_cg3_league', '#3f9a4a', '#0f3a1e', '#fff6a0',
      '<path d="M0 60H200M0 100H200M0 140H200" stroke="#fff" stroke-width="2.500" opacity=".25"/><path d="M40 55v10M80 55v10M120 55v10M160 55v10M40 135v10M80 135v10M120 135v10M160 135v10" stroke="#fff" stroke-width="2" opacity=".25"/><ellipse cx="100" cy="176" rx="60" ry="9" fill="#000" opacity=".35"/>' +
      '<g transform="translate(100 118) rotate(-24)"><ellipse rx="70" ry="42" fill="#8a4a22"/><path d="M0-42A70 42 0 0 1 0 42A90 60 0 0 0 0-42Z" fill="#000" opacity=".22"/><path d="M-52-26Q-40 0-52 26M52-26Q40 0 52 26" stroke="#fff" stroke-width="6" fill="none"/><path d="M-26-4H26" stroke="#fff" stroke-width="5"/><path d="M-18-12V4M-6-13V5M6-13V5M18-12V4" stroke="#fff" stroke-width="4"/><path d="M-40-26Q0-40 40-26" stroke="#c88a5a" stroke-width="3" fill="none" opacity=".7"/></g>' +
      '<g transform="translate(78 62) rotate(-14)"><path d="M-22 14L-26-12L-12 0L0-18L12 0L26-12L22 14Z" fill="#f6c832" stroke="#b8860b" stroke-width="2" stroke-linejoin="round"/><circle cx="-26" cy="-13" r="3.500" fill="#e8496a"/><circle cy="-19" r="3.500" fill="#58c8e8"/><circle cx="26" cy="-13" r="3.500" fill="#e8496a"/><path d="M-22 14H22" stroke="#b8860b" stroke-width="4"/></g>'),
    av_cg3_pickle: av('av_cg3_pickle', '#ff9ac0', '#7a2a6a', '#fff',
      '<ellipse cx="100" cy="184" rx="50" ry="8" fill="#000" opacity=".3"/><g transform="translate(100 100) rotate(14)"><rect x="-38" y="-84" width="76" height="168" rx="38" fill="#5fae3a"/><path d="M0-84Q38-84 38-46V46Q38 84 0 84Q22 40 22 0Q22-40 0-84Z" fill="#2f6e1c" opacity=".55"/><path d="M-24-50Q-28-20-24 20" stroke="#b8e88a" stroke-width="7" stroke-linecap="round" fill="none" opacity=".7"/><g fill="#2f6e1c"><circle cx="-8" cy="40" r="3.500"/><circle cx="12" cy="58" r="3.500"/><circle cx="-14" cy="64" r="3"/><circle cx="16" cy="-66" r="3"/><circle cx="-10" cy="-70" r="3"/></g>' +
      '<path d="M-40-32H40" stroke="#14141c" stroke-width="5"/><rect x="-34" y="-36" width="30" height="24" rx="9" fill="#14141c"/><rect x="4" y="-36" width="30" height="24" rx="9" fill="#14141c"/><path d="M-28-30L-18-18M10-30L20-18" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6"/><path d="M-16 6Q2 22 20 4" stroke="#17401a" stroke-width="5" stroke-linecap="round" fill="none"/></g>'),
    av_cg3_family: av('av_cg3_family', '#f0a04a', '#6a2a1a', '#fff0c0',
      '<ellipse cx="100" cy="158" rx="88" ry="24" fill="#d8dce4"/><ellipse cx="100" cy="154" rx="76" ry="18" fill="#f4f6fa"/><path d="M100 136A76 18 0 0 1 100 172A90 26 0 0 0 100 136Z" fill="#000" opacity=".12"/>' +
      '<g fill="#e8496a"><ellipse cx="44" cy="80" rx="13" ry="40" transform="rotate(-38 60 130)"/><ellipse cx="156" cy="80" rx="13" ry="40" transform="rotate(38 140 130)"/></g><g fill="#f6c832"><ellipse cx="68" cy="62" rx="13" ry="42" transform="rotate(-18 80 130)"/><ellipse cx="132" cy="62" rx="13" ry="42" transform="rotate(18 120 130)"/></g><ellipse cx="100" cy="58" rx="14" ry="44" fill="#f08a2a"/>' +
      '<ellipse cx="100" cy="124" rx="50" ry="38" fill="#9a5a2a"/><path d="M100 86A50 38 0 0 1 100 162A64 50 0 0 0 100 86Z" fill="#5a3014" opacity=".5"/><circle cx="100" cy="84" r="24" fill="#b06a34"/><circle cx="91" cy="80" r="7" fill="#fff"/><circle cx="109" cy="80" r="7" fill="#fff"/><circle cx="92.500" cy="81" r="3.200" fill="#1a1010"/><circle cx="107.500" cy="81" r="3.200" fill="#1a1010"/><path d="M93 90L107 90L100 102Z" fill="#f6c832"/><path d="M104 96Q112 104 106 116Q100 108 104 96Z" fill="#e03a3a"/><path d="M84 72l10-3M116 72l-10-3" stroke="#3a1c0c" stroke-width="3" stroke-linecap="round"/><path d="M62 150Q50 160 60 166M138 150Q150 160 140 166" stroke="#f6c832" stroke-width="5" stroke-linecap="round" fill="none"/>'),
    av_cg3_bo: av('av_cg3_bo', '#5a6a5a', '#141c18', '#d8ff9a', ficus + bust('#3a4250', BO, vest)),
    av_cg3_tara: av('av_cg3_tara', '#e8c8a0', '#5a3a3a', '#fff0d0', drawing + bust('#7a8ab0', TARA, `<path d="M80 146Q100 168 120 146Z" fill="${TARA.sk}"/>`) + mug),
    av_cg3_mel: av('av_cg3_mel', '#a02a5a', '#1c0a24', '#ffb0c0',
      bust('#14101c', MEL, `<path d="M72 148Q100 196 128 148Z" fill="${MEL.sk}"/><path d="M100 172Q118 160 128 148L122 146Q112 160 100 166Z" fill="#000" opacity=".2"/>`) + wglass(156, 152, 1.25, '#8a1030', true) + `<g fill="${MEL.sk}"><rect x="146" y="150" width="22" height="9" rx="4.500"/><rect x="147" y="161" width="20" height="9" rx="4.500"/></g>`),
  };
}

// ---------- bodies (origin = pit of the neck; 1 unit = avatar head scale 1) ----------
const TF = 'M-15-44V-8Q-34-2-58 6Q-70 10-70 26L-56 60C-62 84-42 118-38 146C-40 176-79 194-81 240V262H81V240C79 194 40 176 38 146C42 118 62 84 56 60L70 26Q70 10 58 6Q34-2 15-8V-44Z';
const TM = 'M-17-44V-10Q-40-4-70 4Q-84 8-84 28L-70 70C-70 110-56 150-54 190V262H54V190C56 150 70 110 70 70L84 28Q84 8 70 4Q40-4 17-10V-44Z';
const HS = 1.14, HY = -70;
const hand = (x: number, y: number, rot: number, sh: string, s = 1): string =>
  at(x, y, s, rot, `<path d="M-12-6Q-12-16 0-16Q12-16 12-6V10Q12 20 0 20Q-12 20-12 10Z"/><path d="M-5 6v12M1 7v13M7 6v11" stroke="${sh}" stroke-width="1.600" fill="none" opacity=".7"/>`);
/** Phone held up for a mirror selfie (centre x,y). */
const phone = (x: number, y: number, rot: number, c: string, sk: string): string =>
  at(x, y, 1, rot, `<rect x="-26" y="-46" width="52" height="92" rx="9" fill="${c}"/><rect x="-18" y="-39" width="20" height="20" rx="6" fill="#0c0c12"/><circle cx="-12" cy="-33" r="3.500" fill="#39405a"/><circle cx="-4" cy="-25" r="3.500" fill="#39405a"/>` +
    `<g fill="${sk}"><rect x="8" y="-6" width="24" height="11" rx="5.500"/><rect x="10" y="7" width="23" height="11" rx="5.500"/><rect x="10" y="20" width="21" height="11" rx="5.500"/><rect x="9" y="33" width="18" height="10" rx="5"/></g>`);
const star = (x: number, y: number, r: number, c = '#fff'): string =>
  `<path d="M${x} ${y - r}L${x + r * 0.22} ${y - r * 0.22}L${x + r} ${y}L${x + r * 0.22} ${y + r * 0.22}L${x} ${y + r}L${x - r * 0.22} ${y + r * 0.22}L${x - r} ${y}L${x - r * 0.22} ${y - r * 0.22}Z" fill="${c}"/>`;
/** "CASTELLANO 12" back print centred on 0,0 (about 150 wide). */
const c12 = (c: string): string => tx(0, -14, 22, 'CASTELLANO', c, 'letter-spacing="1"') + tx(0, 36, 54, '12', c);

// ---------- cg3_cover ----------
function cover(): string {
  const k = 'cg3_cover';
  const G = '#9096a2';
  const room =
    `<rect width="600" height="800" fill="url(#${k}w)"/><rect y="520" width="600" height="120" fill="#0c0e1a"/>` +
    `<rect x="392" y="170" width="150" height="8" fill="#2a2c44"/><g transform="translate(430 170)"><path d="M-12 0H12L8-10H-8ZM-3-10H3V-22H-3Z" fill="#b8902a"/><path d="M-16-48Q-18-24 0-22Q18-24 16-48Z" fill="#d8ac3a"/><ellipse cy="-58" rx="13" ry="8" fill="#8a4a22" transform="rotate(-30 0 -58)"/></g><rect x="472" y="124" width="48" height="46" fill="#1c2038" stroke="#3a3e5c" stroke-width="4"/><path d="M480 160L492 140L500 152L508 136L514 160Z" fill="#2f4a5a"/>` +
    `<path d="M0 236L66 262V436L0 470Z" fill="url(#${k}tv)"/><path d="M66 262V436" stroke="#dff0ff" stroke-width="3"/><rect x="0" y="466" width="84" height="60" fill="#14162a"/><circle cx="20" cy="352" r="470" fill="url(#${k}g)"/>` +
    `<ellipse cx="320" cy="536" rx="260" ry="20" fill="#000" opacity=".5"/><rect x="104" y="296" width="452" height="170" rx="34" fill="#3d3a5e"/><rect x="104" y="296" width="452" height="170" rx="34" fill="url(#${k}cs)"/><path d="M330 300V440" stroke="#24223a" stroke-width="4"/>` +
    `<rect x="124" y="436" width="412" height="76" rx="16" fill="#4c4874"/><rect x="124" y="496" width="412" height="34" rx="8" fill="#2a2844"/>`;
  const dana =
    `<g filter="url(#${k}f)"><rect x="494" y="350" width="74" height="184" rx="28" fill="#45416a"/><rect x="82" y="350" width="74" height="184" rx="28" fill="#45416a"/><ellipse cx="170" cy="414" rx="56" ry="30" fill="#d8d2c4" transform="rotate(-12 170 414)"/>` +
    `<path d="M168 372Q110 372 100 438Q124 426 142 410Q160 400 168 372Z" fill="${HAIR}"/><ellipse cx="184" cy="388" rx="33" ry="30" fill="${HAIR}"/><circle cx="160" cy="384" r="7" fill="#e8496a"/>` +
    `<path d="M372 384Q450 356 520 396Q548 432 524 452H360Z" fill="#8a3448"/>` +
    `<path d="M196 384Q204 356 250 346Q330 334 388 356Q420 372 414 420Q410 448 388 452H222Q190 440 196 384Z" fill="${G}"/><path d="M206 372Q190 384 196 420Q214 404 222 380Z" fill="#787e8c"/></g>` +
    `<path d="M392 400L520 402M380 428L530 430M430 372L436 452M480 378L490 452" stroke="#c86a7a" stroke-width="3" opacity=".5"/>` +
    `<path d="M252 366Q310 350 372 372" fill="none" stroke="#7c828e" stroke-width="5" stroke-linecap="round" opacity=".7"/>` +
    `<g transform="translate(306 404) rotate(2)">${c12('#1a2244')}</g><path d="M200 380Q230 352 300 344Q360 342 392 358" fill="none" stroke="#bcd4ff" stroke-width="3" opacity=".7"/>`;
  const counter =
    `<path d="M0 632H600V800H0Z" fill="url(#${k}ct)"/><path d="M0 632H600" stroke="#8aa8e0" stroke-width="3" opacity=".7"/><path d="M0 640H600" stroke="#000" stroke-width="6" opacity=".4"/>` +
    `<ellipse cx="176" cy="716" rx="150" ry="60" fill="url(#${k}pg)"/><path d="M0 742Q60 750 96 728" fill="none" stroke="#e8e8f0" stroke-width="5" stroke-linecap="round"/>` +
    `<g transform="translate(178 714) rotate(-14)"><path d="M-84-30L70-36Q82-36 84-26L92 26Q94 38 82 38L-88 42Q-100 42-98 30L-96-18Q-96-30-84-30Z" fill="#0a0a10" stroke="#5a6a90" stroke-width="3"/><path d="M-80-22L72-28L80 28L-84 32Z" fill="url(#${k}sc)"/><rect x="-30" y="-8" width="44" height="20" rx="4" fill="none" stroke="#b6ffb0" stroke-width="3"/><rect x="-26" y="-4" width="24" height="12" fill="#6aff7a"/><rect x="16" y="-2" width="5" height="8" fill="#b6ffb0"/></g>` +
    `<ellipse cx="436" cy="742" rx="130" ry="18" fill="#000" opacity=".5"/><g filter="url(#${k}f)">${chicken(436, 722, 1.55)}</g>` +
    `<path d="M340 716Q344 640 420 624" fill="none" stroke="#9cc0ff" stroke-width="4" opacity=".6" stroke-linecap="round"/>`;
  return frame(k, 600, 800, '#9cc0ff',
    lg(`${k}w`, '#070812', '#1a2040') + lg(`${k}tv`, '#f4faff', '#6aa0ff') + lg(`${k}ct`, '#343a54', '#0e1018') + lg(`${k}cs`, '#7a90d0', '#000', 1, 0.3).replace('stop-color="#000"', 'stop-color="#000" stop-opacity=".5"').replace('stop-color="#7a90d0"', 'stop-color="#7a90d0" stop-opacity=".45"') +
    lg(`${k}sc`, '#3a4a7a', '#1c2038', 1, 1) + glow(`${k}g`, '#5a8cff', 0.5) + glow(`${k}pg`, '#9ab8ff', 0.45),
    room + dana + counter, 0.7, 0.16, 4);
}

// ---------- cg3_wall_lock (PASSCODE CLUE: score strokes 41 / 38; PAR totals 36 / 36 are the trap) ----------
function wallLock(): string {
  const k = 'cg3_wall_lock';
  const PAR = [4, 4, 5, 3, 4, 3, 5, 4, 4, 4, 4, 5, 3, 4, 4, 4, 4, 4];
  const SC = [5, 4, 6, 4, 5, 3, 5, 4, 5, 4, 4, 5, 3, 5, 4, 4, 5, 4];
  const X0 = 66, LW = 80, CW = 34, RH = 46, XE = 534;
  const table = (y: number, from: number): string => {
    const hx = (i: number): number => X0 + LW + CW * i + CW / 2;
    const end = X0 + LW + CW * 9;
    const ends = from ? [['IN', '36', (end + (end + XE) / 2) / 2], ['TOT', '72', ((end + XE) / 2 + XE) / 2]] : [['OUT', '36', (end + XE) / 2]];
    let o = `<rect x="${X0}" y="${y}" width="${XE - X0}" height="${RH}" fill="#1f5a3a"/><rect x="${X0}" y="${y + RH}" width="${XE - X0}" height="${RH}" fill="#e2e8d0"/><rect x="${X0}" y="${y + 2 * RH}" width="${XE - X0}" height="${RH}" fill="#fbf8ee"/>`;
    o += `<g ${SANS} font-weight="700" font-size="17"><text x="${X0 + 8}" y="${y + 30}" fill="#fff">HOLE</text><text x="${X0 + 8}" y="${y + RH + 30}" fill="#1c2a20">PAR</text><text x="${X0 + 8}" y="${y + 2 * RH + 30}" fill="#1c2a20">SCORE</text></g>`;
    const t = (x: number, yy: number, v: string | number): string => `<text x="${x}" y="${yy}">${v}</text>`;
    let h = '', pr = '', sc = '';
    for (let i = 0; i < 9; i++) { h += t(hx(i), y + 31, from + i + 1); pr += t(hx(i), y + RH + 32, PAR[from + i]); sc += t(hx(i), y + 2 * RH + 34, SC[from + i]); }
    for (const [lab, par, x] of ends as [string, string, number][]) { o += tx(x, y + 30, 17, lab, '#fff'); pr += t(x, y + RH + 32, par); }
    o += `<g text-anchor="middle" font-weight="700"><g ${SANS}><g font-size="${from ? 19 : 22}" fill="#fff">${h}</g><g font-size="24" fill="#1c2a20">${pr}</g></g><g ${HAND} font-size="30" fill="#1a3aa8">${sc}</g></g>`;
    let lines = `M${X0} ${y}H${XE}V${y + 3 * RH}H${X0}ZM${X0} ${y + RH}H${XE}M${X0} ${y + 2 * RH}H${XE}`;
    for (let i = 0; i <= 9; i++) lines += `M${X0 + LW + CW * i} ${y}V${y + 3 * RH}`;
    if (from) lines += `M${(end + XE) / 2} ${y}V${y + 3 * RH}`;
    return o + `<path d="${lines}" fill="none" stroke="#1c2a20" stroke-width="1.600"/>`;
  };
  const ring = (x: number, y: number, r: number, rot: number): string =>
    `<g transform="rotate(${rot} ${x} ${y})"><circle cx="${x}" cy="${y}" r="${r - 3}" fill="#7a4a1e" opacity=".8"/><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#4a2a10" stroke-width="7" opacity=".92"/><path d="M${x - r + 9} ${y + 6}A${r - 9} ${r - 9} 0 0 1 ${x + 4} ${y - r + 9}" fill="none" stroke="#a87440" stroke-width="5" opacity=".7" stroke-linecap="round"/><circle cx="${x + r + 6}" cy="${y + r - 10}" r="4" fill="#5a3414" opacity=".8"/></g>`;
  const T1 = 612, T2 = 800;
  const pine = (x: number): string => `<path d="M${x} 496L${x + 12} 516H${x + 5}L${x + 15} 532H${x - 15}L${x - 5} 516H${x - 12}Z" fill="#bfe6c2"/>`;
  const card =
    `<rect x="24" y="436" width="552" height="572" fill="#000" opacity=".45" transform="translate(8 12)"/><rect x="24" y="436" width="552" height="572" fill="#3a2716"/><rect x="24" y="436" width="552" height="572" fill="none" stroke="#6a4a2a" stroke-width="4"/><rect x="40" y="452" width="520" height="540" fill="#1c140c"/>` +
    `<rect x="44" y="456" width="512" height="532" fill="#f4eedc"/><rect x="44" y="456" width="512" height="532" fill="url(#${k}pp)"/><rect x="56" y="476" width="488" height="68" fill="#1f5a3a"/>${pine(84)}${pine(516)}` +
    tx(300, 521, 26, 'ROLLING PINES GOLF CLUB', '#fff', 'letter-spacing=".5"') + tx(300, 588, 30, 'D. HOYT — 6/14/19', '#1a3aa8', '', HAND) + `<path d="M150 598H450" stroke="#1c2a20" stroke-width="1.500"/>` +
    table(T1, 0) + table(T2, 9) + ring(493, T1 + 2 * RH + 40, 40, 0) + ring(493, T2 + 2 * RH + 40, 40, 140) +
    `<text x="66" y="972" font-size="13" fill="#5a5a48" ${SANS}>BEST ROUND EVER. FRAMED BY DOUG.</text>` +
    `<path d="M44 456H240L120 988H44Z" fill="#fff" opacity=".05"/>`;
  const peg =
    `<rect width="600" height="1300" fill="#8a6a46"/><rect width="600" height="1300" fill="url(#${k}h)"/><rect width="600" height="1300" fill="url(#${k}sh)"/>` +
    `<circle cx="300" cy="120" r="620" fill="url(#${k}l)"/>` +
    `<g opacity=".9"><path d="M70 330V250" stroke="#2a2a30" stroke-width="5"/><path d="M52 250Q70 236 88 250L84 262Q70 254 56 262Z" fill="#9aa0a8"/><rect x="62" y="262" width="16" height="120" rx="6" fill="#9aa0a8"/><rect x="62" y="262" width="7" height="120" fill="#c8ced6"/>` +
    `<path d="M500 240V400" stroke="#b8bcc4" stroke-width="7"/><path d="M500 400Q500 428 470 430H452Q444 424 452 414H478Q488 412 490 400Z" fill="#c8ced6"/><rect x="492" y="232" width="16" height="60" rx="5" fill="#1c1c22"/></g>` +
    `<rect y="1160" width="600" height="26" fill="#4a3420"/><rect y="1186" width="600" height="10" fill="#000" opacity=".4"/>` +
    `<g transform="translate(130 1160)"><ellipse cx="0" cy="-2" rx="54" ry="8" fill="#000" opacity=".4"/><path d="M38-70Q74-66 66-36Q58-14 36-18" fill="none" stroke="#1f4f8a" stroke-width="11"/><rect x="-44" y="-92" width="86" height="92" rx="8" fill="#1f4f8a"/><rect x="14" y="-92" width="28" height="92" rx="8" fill="#000" opacity=".25"/><ellipse cx="-1" cy="-91" rx="42" ry="8" fill="#3a2010"/>${pinn(-10, -42, 1.5)}</g>` +
    `<g transform="translate(424 1160)"><path d="M-70 0V-80Q-70-96-54-96H54Q70-96 70-80V0Z" fill="#cfe6ff" opacity=".22"/><path d="M-70 0V-80Q-70-96-54-96H54Q70-96 70-80V0" fill="none" stroke="#e6f2ff" stroke-width="3" opacity=".6"/><g fill="#f4f4ee"><circle cx="-42" cy="-20" r="19"/><circle cx="0" cy="-20" r="19"/><circle cx="42" cy="-20" r="19"/><circle cx="-21" cy="-54" r="19"/><circle cx="21" cy="-54" r="19"/></g><g fill="#000" opacity=".16"><circle cx="-36" cy="-14" r="13"/><circle cx="6" cy="-14" r="13"/><circle cx="48" cy="-14" r="13"/><circle cx="-15" cy="-48" r="13"/><circle cx="27" cy="-48" r="13"/></g><path d="M-56-84V-20" stroke="#fff" stroke-width="5" opacity=".4" stroke-linecap="round"/></g>` +
    `<path d="M250 1160l8-34 8 34ZM282 1160l8-34 8 34Z" fill="#e8496a"/><path d="M300 436V414" stroke="#2a2a30" stroke-width="5"/><circle cx="300" cy="412" r="7" fill="#b8bcc4"/>`;
  return frame(k, 600, 1300, '#ffd9a0',
    `<pattern id="${k}h" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="4.500" fill="#3a2814"/><circle cx="21" cy="21.500" r="3" fill="#1c1208"/></pattern>` +
    `<pattern id="${k}pp" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M0 7L7 0" stroke="#b8a878" stroke-width=".6" opacity=".35"/></pattern>` +
    lg(`${k}sh`, '#1a1008', '#1a1008').replace('offset="0" stop-color="#1a1008"', 'offset="0" stop-color="#1a1008" stop-opacity=".5"').replace('offset="1" stop-color="#1a1008"', 'offset="1" stop-color="#1a1008" stop-opacity=".15"') + glow(`${k}l`, '#ffd08a', 0.3),
    peg + card, 0.5, 0.1);
}

// ---------- cg3_wall_home ----------
function wallHome(): string {
  const k = 'cg3_wall_home';
  const S = DANA.sk, T = '#ef5a6a';
  const D: Face = { ...DANA, mouth: laugh('#8a3a40', '#d0506a'), lid: 0.2, back: `<g transform="rotate(-38 126 40)">${TAIL}</g>` };
  const shoe = (x: number, y: number, rot: number): string => at(x, y, 1, rot, '<path d="M-16-14H14Q40-4 44 12Q44 20 36 20H-18Q-24 4-16-14Z" fill="#f6f6f2"/><path d="M-20 14H42" stroke="#ef5a6a" stroke-width="5"/>');
  const fig =
    `<g filter="url(#${k}f)"><g fill="${S}">${limb([62, 24, 17], [128, 66, 14], [176, 16, 10])}${hand(184, 6, 150, DANA.sh)}` +
    `${limb([-40, 290, 40], [-96, 436, 26], [-70, 600, 15])}${limb([44, 290, 40], [120, 420, 25], [196, 548, 14])}</g>${shoe(-70, 618, 0)}${shoe(204, 566, 28)}` +
    `<path d="${TF}" fill="${S}"/><g clip-path="url(#${k}t)"><path d="M-90 46Q-52 40-40-8H40Q52 40 90 46V226H-90Z" fill="${T}"/></g><g fill="${T}"><circle cx="-29" cy="84" r="33"/><circle cx="29" cy="84" r="33"/></g>` +
    `<path d="M-30 4Q0 46 30 4L24-6Q0 26-24-6Z" fill="${S}"/><path d="M-82 200Q0 214 82 200L112 322Q0 346-112 322Z" fill="#f6f6f2"/>` +
    `<g fill="${S}">${limb([-62, 24, 17], [-140, -6, 14], [-204, -70, 11])}</g></g>` +
    `<path d="M-60 214L-78 328M-20 218L-26 336M22 218L30 336M62 214L84 328" stroke="#c8ccd2" stroke-width="3"/><path d="M-82 200Q0 214 82 200" fill="none" stroke="#19b3a6" stroke-width="7"/>` +
    `<path d="M0 60Q-3 80 0 100" fill="none" stroke="#a0303e" stroke-width="2.500" opacity=".6"/>` +
    paddle(-236, -104, 1.25, -42, '#2ad0a0', '#fff') + `<g fill="${S}">${hand(-208, -74, -40, DANA.sh)}</g>` + hd(-4, HY, HS, -9, D);
  const court =
    `<rect width="600" height="1300" fill="url(#${k}s)"/><circle cx="440" cy="590" r="330" fill="url(#${k}sg)"/><circle cx="440" cy="590" r="64" fill="#fff4c8"/>` +
    `<path d="M0 640Q60 590 110 620Q150 570 220 612Q280 588 330 626Q420 600 470 628Q540 596 600 630V720H0Z" fill="#2a1c3e"/>` +
    `<path d="M0 700H600V1300H0Z" fill="url(#${k}c)"/><path d="M-120 1300L180 700H420L720 1300Z" fill="#2a6ab0" opacity=".55"/>` +
    `<path d="M180 700L-120 1300M420 700L720 1300M300 760V1300M120 820H480M-20 1100H620" stroke="#fff" stroke-width="5" opacity=".8" fill="none"/>` +
    `<g opacity=".9"><path d="M40 668V772M560 668V772" stroke="#1c1c26" stroke-width="8"/><path d="M40 676H560V752H40Z" fill="#14141e" opacity=".5"/><path d="M40 676H560" stroke="#fff" stroke-width="6"/><path d="M40 696H560M40 714H560M40 732H560M80 676V752M120 676V752M160 676V752M200 676V752M240 676V752M280 676V752M320 676V752M360 676V752M400 676V752M440 676V752M480 676V752M520 676V752" stroke="#fff" stroke-width="1" opacity=".3"/></g>`;
  return frame(k, 600, 1300, '#ffd08a',
    `<linearGradient id="${k}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2466"/><stop offset=".28" stop-color="#c8507a"/><stop offset=".47" stop-color="#ffa050"/><stop offset=".56" stop-color="#ffd890"/></linearGradient>` +
    lg(`${k}c`, '#1c7a86', '#0c3a4c') + glow(`${k}sg`, '#fff0b0', 0.9) + `<clipPath id="${k}t"><path d="${TF}"/></clipPath>`,
    court + `<ellipse cx="330" cy="1120" rx="250" ry="26" fill="#000" opacity=".35"/>` + at(336, 420, 1.12, 4, fig) +
    `<path d="M170 250L60 190" stroke="#fff" stroke-width="5" opacity=".35" stroke-linecap="round"/>${ball(52, 184, 17)}`, 0.45, 0.12);
}

// ---------- cg3_map ----------
function mapArt(): string {
  const k = 'cg3_map';
  const spot = (x: number, y: number, body: string): string => `<circle cx="${x}" cy="${y}" r="26" fill="url(#${k}g)"/><g transform="translate(${x} ${y})">${body}</g>`;
  const lake = 'M590 0C620 60 640 110 656 180C668 240 700 300 714 350C726 400 770 440 800 462V0Z';
  return frame(k, 800, 600, '#fff',
    `<pattern id="${k}b" width="112" height="112" patternUnits="userSpaceOnUse"><g fill="#17223a"><rect x="8" y="6" width="40" height="42" rx="3"/><rect x="64" y="6" width="44" height="36" rx="3"/><rect x="8" y="62" width="36" height="44" rx="3"/></g><rect x="64" y="62" width="42" height="40" rx="3" fill="#1d2a44"/><rect x="70" y="12" width="14" height="12" fill="#1d2a44"/></pattern>` + lg(`${k}w`, '#16405c', '#0c2238', 1, 1) + glow(`${k}g`, '#ffd08a', 0.5) + glow(`${k}lg`, '#4ab8d8', 0.35),
    `<rect width="800" height="600" fill="#101a2c"/><rect width="800" height="600" fill="url(#${k}b)"/>` +
    `<rect x="296" y="216" width="116" height="100" rx="10" fill="#17402c"/><path d="M0 500Q120 470 200 520Q260 560 250 600H0Z" fill="#17402c"/><g fill="#1f5a3a"><circle cx="60" cy="540" r="16"/><circle cx="120" cy="524" r="12"/><circle cx="170" cy="566" r="15"/><circle cx="306" cy="226" r="8"/><circle cx="402" cy="306" r="8"/></g>` +
    `<path d="${lake}" fill="url(#${k}w)"/><circle cx="740" cy="200" r="220" fill="url(#${k}lg)"/><path d="${lake}" fill="none" stroke="#3a8aa8" stroke-width="3" opacity=".7"/>` +
    `<path d="M700 60q14-8 28 0M690 250q14-8 28 0M750 300q14-8 28 0M730 130q14-8 28 0M760 400q12-7 24 0" stroke="#5ab0d0" stroke-width="2" fill="none" opacity=".5"/>` +
    `<g fill="none" stroke-linecap="round"><path d="M0 180H560Q610 176 636 170M128 0V600M0 396H560Q640 396 700 352M352 0V600M496 0V396Q500 420 480 420M240 180V600M128 180Q240 240 352 264Q430 290 480 420M562 0C592 60 612 120 628 190C642 250 672 300 688 352C700 400 740 450 800 490" stroke="#2c3c5c" stroke-width="13"/>` +
    `<path d="M0 180H560Q610 176 636 170M128 0V600M0 396H560Q640 396 700 352M352 0V600M496 0V396Q500 420 480 420M240 180V600M128 180Q240 240 352 264Q430 290 480 420M562 0C592 60 612 120 628 190C642 250 672 300 688 352C700 400 740 450 800 490" stroke="#4a5c84" stroke-width="2" stroke-dasharray="10 10"/>` +
    `<path d="M0 96H560M0 290H290M420 290H650M0 500H600M600 396V600M56 0V600M420 396V600" stroke="#22304c" stroke-width="7"/></g>` +
    `<path d="M700 348L770 322" stroke="#c8a068" stroke-width="8"/><path d="M716 342v10M734 336v10M752 329v10" stroke="#6a4a2a" stroke-width="3"/>` +
    spot(128, 180, '<path d="M-14 0L0-14L14 0V13H-14Z" fill="#f0c890"/><path d="M-18 1L0-17L18 1" fill="none" stroke="#c8684a" stroke-width="4" stroke-linejoin="round"/><rect x="-4" y="3" width="8" height="10" fill="#6a3a2a"/>') +
    spot(624, 168, '<rect x="-20" y="-10" width="40" height="22" fill="#e8e2d2"/><path d="M-23-10H23L19-17H-19Z" fill="#8a3a2a"/><g fill="#19b3a6"><rect x="-16" y="-3" width="7" height="15"/><rect x="-4" y="-3" width="7" height="15"/><rect x="8" y="-3" width="7" height="15"/></g>') +
    spot(352, 264, '<rect x="-20" y="-13" width="40" height="26" fill="#1c7a86" stroke="#fff" stroke-width="2"/><path d="M0-13V13" stroke="#fff" stroke-width="3"/><path d="M-20 0H-7M7 0H20" stroke="#fff" stroke-width="1.500"/><circle cx="12" cy="-6" r="3" fill="#e6f04a"/>') +
    spot(688, 348, '<rect x="-15" y="-10" width="30" height="20" fill="#d8b078"/><path d="M-19-10L0-21L19-10Z" fill="#b84a3a"/><circle cx="24" cy="-8" r="5" fill="#ff4a3a"/><rect x="-5" y="0" width="10" height="10" fill="#5a3a22"/>') +
    spot(480, 420, '<rect x="-13" y="-19" width="26" height="38" fill="#a8b0c8"/><g fill="#ffd98a"><rect x="-8" y="-14" width="6" height="6"/><rect x="3" y="-14" width="6" height="6"/><rect x="-8" y="-3" width="6" height="6"/><rect x="3" y="8" width="6" height="6"/></g><rect x="3" y="-3" width="6" height="6" fill="#4a5470"/><rect x="-8" y="8" width="6" height="6" fill="#4a5470"/>') +
    spot(240, 396, '<rect x="-17" y="-12" width="34" height="24" rx="3" fill="#e8f0f4"/><path d="M-4-8H4V-4H8V4H4V8H-4V4H-8V-4H-4Z" fill="#2ab87a"/>') +
    spot(496, 96, '<rect x="-24" y="-11" width="48" height="24" fill="#8a94a8"/><rect x="-24" y="-11" width="48" height="7" fill="#e8843a"/><g fill="#3a4258"><rect x="-18" y="1" width="10" height="12"/><rect x="-5" y="1" width="10" height="12"/><rect x="8" y="1" width="10" height="12"/></g>') +
    `<g transform="translate(60 60)" opacity=".7"><circle r="22" fill="none" stroke="#5a6c94" stroke-width="2"/><path d="M0-17L5 0L0 17L-5 0Z" fill="#8a9cc4"/><path d="M0-17L5 0H-5Z" fill="#e8496a"/></g>`, 0.5, 0.1);
}

// ---------- cg3_ph_scorecard (the garage) ----------
function garage(): string {
  const k = 'cg3_ph_scorecard';
  const bag = (x: number, c: string, d: string, rot: number): string =>
    at(x, 420, 1, rot, `<path d="M-10-250L-16-196M4-262L2-196M18-246L16-196" stroke="#b8bcc4" stroke-width="5"/><path d="M-22-262Q-8-272-4-254L-14-244ZM-6-274Q10-282 12-264L2-256ZM12-258Q28-264 28-246L18-240Z" fill="#d8dce4"/><rect x="-34" y="-200" width="68" height="200" rx="16" fill="${c}"/><rect x="6" y="-200" width="28" height="200" rx="14" fill="${d}"/><rect x="-34" y="-200" width="68" height="18" rx="8" fill="${d}"/><rect x="-26" y="-120" width="36" height="60" rx="8" fill="${d}"/><path d="M-34-170Q-56-110-34-50" fill="none" stroke="${d}" stroke-width="7"/>`);
  const card = `<g transform="translate(400 150)"><rect x="-58" y="-46" width="116" height="92" fill="#3a2716"/><rect x="-50" y="-38" width="100" height="76" fill="#f4eedc"/><rect x="-46" y="-34" width="92" height="13" fill="#1f5a3a"/><path d="M-46-10H46M-46-2H46M-46 6H46M-46 18H46M-46 26H46M-46 34H46M-30-10V6M-30 18V34M-14-10V6M2-10V6M18-10V6M34-10V34M-14 18V34M2 18V34M18 18V34" stroke="#1c2a20" stroke-width="1"/><circle cx="38" cy="4" r="6" fill="#7a4a1e"/><circle cx="38" cy="30" r="6" fill="#7a4a1e"/></g>`;
  return frame(k, 800, 600, '#dfeaff',
    lg(`${k}w`, '#5a626e', '#2c3038') + lg(`${k}fl`, '#4a4e58', '#1c1e26') + glow(`${k}l`, '#e6f0ff', 0.55) + lg(`${k}wh`, '#f0eee6', '#8a8a86', 1, 0) +
    `<pattern id="${k}h" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="2.200" fill="#2a1c0e"/></pattern>`,
    `<rect width="800" height="600" fill="url(#${k}w)"/><rect y="410" width="800" height="190" fill="url(#${k}fl)"/><path d="M0 410H800" stroke="#14161c" stroke-width="5"/><path d="M200 600L330 410M620 600L560 410" stroke="#000" stroke-width="2" opacity=".3"/>` +
    `<rect x="250" y="20" width="300" height="12" rx="6" fill="#f4faff"/><ellipse cx="400" cy="30" rx="380" ry="230" fill="url(#${k}l)"/>` +
    `<rect x="232" y="56" width="340" height="200" fill="#8a6a46"/><rect x="232" y="56" width="340" height="200" fill="url(#${k}h)"/>${card}<path d="M270 90V190" stroke="#b8bcc4" stroke-width="7"/><path d="M258 90Q270 78 282 90" fill="none" stroke="#b8bcc4" stroke-width="7"/><rect x="496" y="84" width="14" height="100" rx="4" fill="#e8843a"/><path d="M503 184V226" stroke="#c8ced6" stroke-width="5"/><path d="M530 100h24v60h-24Z" fill="none" stroke="#f2c832" stroke-width="5"/>` +
    `<g filter="url(#${k}f)">${bag(86, '#1f4f8a', '#16365e', -5)}${bag(178, '#a8323a', '#6e1c24', 4)}` +
    `<rect x="246" y="292" width="100" height="122" rx="6" fill="#d8dce0"/><rect x="664" y="96" width="104" height="318" rx="22" fill="url(#${k}wh)"/>` +
    `<path d="M398 392L640 392L654 404H384Z" fill="#4a6a4a"/><path d="M384 404H654V416H384Z" fill="#32492f"/><path d="M400 414L440 470M440 414L400 470M600 414L640 470M640 414L600 470" stroke="#9aa0a8" stroke-width="6" stroke-linecap="round"/>` +
    `<path d="M500 366Q580 356 646 372L652 398H496Z" fill="#8a3448"/><ellipse cx="436" cy="378" rx="46" ry="20" fill="#f2f0ea"/></g>` +
    `<path d="M246 340H346" stroke="#8a9098" stroke-width="3"/><rect x="330" y="302" width="6" height="28" rx="3" fill="#6a7078"/><rect x="262" y="306" width="22" height="16" fill="#f2c832"/><circle cx="302" cy="318" r="8" fill="#e8496a"/><rect x="276" y="262" width="20" height="30" rx="4" fill="#c8a03a"/><rect x="276" y="270" width="20" height="8" fill="#fff"/>` +
    `<path d="M690 96V40M736 96V20" stroke="#b87a4a" stroke-width="9"/><rect x="690" y="230" width="52" height="40" fill="#f2c832"/><path d="M696 242H736M696 252H726" stroke="#3a3a34" stroke-width="3"/><circle cx="716" cy="390" r="8" fill="#b8323a"/>` +
    `<path d="M520 372L640 374M530 384L646 388M560 362L562 398M610 364L616 398" stroke="#c86a7a" stroke-width="2.500" opacity=".6"/><path d="M400 366Q420 360 444 364" stroke="#fff" stroke-width="3" opacity=".6" fill="none" stroke-linecap="round"/>` +
    `<rect x="606" y="300" width="22" height="30" rx="3" fill="#e8e8e4"/><path d="M612 310v8M622 310v8" stroke="#3a3a3a" stroke-width="2"/><rect x="610" y="322" width="14" height="14" rx="3" fill="#f4f4f4"/><path d="M617 336Q620 366 584 362Q560 360 552 378" fill="none" stroke="#f4f4f4" stroke-width="3"/><rect x="524" y="372" width="34" height="14" rx="3" fill="#14141c" transform="rotate(8 541 379)"/><rect x="527" y="374" width="28" height="9" fill="#6a90d8" transform="rotate(8 541 379)"/>` +
    `<path d="M452 462Q470 452 486 462V470H452ZM494 466Q512 456 528 466V474H494Z" fill="#6a5a48"/><ellipse cx="520" cy="476" rx="170" ry="12" fill="#000" opacity=".3"/><ellipse cx="130" cy="424" rx="110" ry="10" fill="#000" opacity=".35"/>`, 0.6);
}

// ---------- Dockside Grill window table (shared by cg3_ph_us_dock / cg3_ph_dock_r) ----------
function dockBg(k: string): string {
  return `<rect width="600" height="800" fill="#2a1410"/><rect x="40" y="40" width="520" height="440" fill="url(#${k}sky)"/><rect x="40" y="300" width="520" height="180" fill="url(#${k}sea)"/>` +
    `<path d="M40 300Q140 270 240 292Q340 276 430 294Q500 280 560 296V306H40Z" fill="#1a1838"/><g fill="#ffd98a"><circle cx="90" cy="294" r="2.500"/><circle cx="150" cy="288" r="2"/><circle cx="270" cy="290" r="2.500"/><circle cx="480" cy="290" r="2"/><circle cx="530" cy="293" r="2.500"/></g>` +
    `<circle cx="430" cy="318" r="70" fill="url(#${k}bg)"/><path d="M430 396Q424 430 432 470" stroke="#ff5a4a" stroke-width="10" opacity=".4" fill="none" stroke-linecap="round"/>` +
    `<g transform="translate(430 366) rotate(5)"><path d="M-22 22Q0 34 22 22L15-12H-15Z" fill="#d8262a"/><path d="M2-12H15L22 22Q12 30 2 30Z" fill="#000" opacity=".25"/><path d="M-12-12L-7-44H7L12-12Z" fill="none" stroke="#d8262a" stroke-width="5"/><rect x="-18" y="2" width="36" height="7" fill="#f4f4f0"/><circle cy="-50" r="8" fill="#fff6d8"/></g><circle cx="427" cy="316" r="22" fill="url(#${k}bg)"/>` +
    `<path d="M40 40H560V480H40Z" fill="none" stroke="#3a2016" stroke-width="22"/><path d="M300 40V480M40 190H560" stroke="#3a2016" stroke-width="12"/><path d="M40 190H560" stroke="#6a4028" stroke-width="2"/>` +
    `<path d="M30 70Q160 120 300 76Q440 120 570 70" fill="none" stroke="#1c0e0a" stroke-width="2"/><g fill="#ffe6a8"><circle cx="80" cy="88" r="6"/><circle cx="150" cy="100" r="6"/><circle cx="224" cy="94" r="6"/><circle cx="376" cy="94" r="6"/><circle cx="450" cy="100" r="6"/><circle cx="520" cy="88" r="6"/></g>` +
    `<circle cx="150" cy="100" r="60" fill="url(#${k}wm)"/><circle cx="450" cy="100" r="60" fill="url(#${k}wm)"/><rect y="480" width="600" height="320" fill="#3a1c14"/><rect width="600" height="800" fill="url(#${k}am)"/>`;
}
const dockDefs = (k: string): string =>
  `<linearGradient id="${k}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c1c4a"/><stop offset=".45" stop-color="#6a3a6a"/><stop offset=".6" stop-color="#e8784a"/></linearGradient>` +
  lg(`${k}sea`, '#3a3a6a', '#12122c') + glow(`${k}bg`, '#ff5a3a', 0.85) + glow(`${k}wm`, '#ffd08a', 0.5) + lg(`${k}am`, '#ff9a4a', '#ff9a4a').replace('offset="0" stop-color="#ff9a4a"', 'offset="0" stop-color="#ff9a4a" stop-opacity="0"').replace('offset="1" stop-color="#ff9a4a"', 'offset="1" stop-color="#ff9a4a" stop-opacity=".14"') + lg(`${k}tb`, '#7a4a2a', '#3a2010');
const tableTop = (k: string): string => `<path d="M-20 690Q300 650 620 690V800H-20Z" fill="url(#${k}tb)"/><path d="M-20 690Q300 650 620 690" fill="none" stroke="#ffc88a" stroke-width="3" opacity=".5"/>`;

function usDock(): string {
  const k = 'cg3_ph_us_dock';
  const D: Face = { ...DANA2, rim: '#ffb870' };
  return frame(k, 600, 800, '#ffb870', dockDefs(k),
    dockBg(k) + `<g filter="url(#${k}f)">${put(404, 392, 1.62, 4, bust(POLO, DOUG, collar('#2a62a8', '#16365e') + pinn(60, 182, 0.95), '#ffb870'))}</g>` +
    `<g filter="url(#${k}f)">${put(196, 420, 1.6, -5, bust('#f2ead8', D, `<path d="M74 147Q100 186 126 147L120 146Q100 170 80 146Z" fill="${DANA.sk}"/><path d="M92 176l8 8 8-8" fill="none" stroke="#e8c050" stroke-width="2"/>`))}</g>` +
    tableTop(k) + wglass(74, 716, 1.5, '#f2d88a') + `<g transform="translate(300 730)"><ellipse rx="70" ry="16" fill="#f4f0e6"/><ellipse cx="-10" cy="-6" rx="38" ry="9" fill="#c8843a"/><path d="M10-10l30-6M14-2l30 0" stroke="#e8c050" stroke-width="5" stroke-linecap="round"/></g>` +
    `<g filter="url(#${k}f)">${thumb(520, 640, 2.3, 6, DOUG.sk, DOUG.sh)}<path d="M478 800V730Q480 700 506 700H548Q572 702 574 730V800Z" fill="${POLO}"/></g>`, 0.6);
}

function dockR(): string {
  const k = 'cg3_ph_dock_r';
  const D: Face = { ...DANA2, rim: '#ffb870', mouth: laugh('#8a3a40', '#d0506a'), lid: 0.1 };
  const RV: Face = { ...RAFE, rim: '#ffb870', mouth: laugh('#7a3a34'), lid: 0.2,
    front: `<path d="M65 82C58 36 86 26 100 26C116 26 142 36 135 82C132 62 122 52 100 52C78 52 68 62 65 82Z" fill="#c89648"/><path d="M110 28C134 34 140 58 135 82C132 66 124 56 110 53Z" fill="#8a6230" opacity=".7"/>` + visor('#2a6ad0') };
  return frame(k, 600, 800, '#ffb870', dockDefs(k),
    dockBg(k) + `<g filter="url(#${k}f)">${put(398, 350, 1.72, -7, bust('#e8eef4', RV, `<path d="M82 146Q100 170 118 146Z" fill="${RAFE.sk}"/><path d="M78 146Q100 176 122 146" fill="none" stroke="#2a6ad0" stroke-width="4"/>`, '#ffb870'))}</g>` +
    `<g filter="url(#${k}f)">${put(204, 424, 1.6, 8, bust('#2a8a7a', D, `<path d="M70 148Q100 192 130 148L120 146Q100 172 80 146Z" fill="${DANA.sk}"/>`))}</g>` +
    tableTop(k) + `<g transform="translate(300 734)"><ellipse rx="96" ry="22" fill="#f4f0e6"/><ellipse rx="96" ry="22" fill="none" stroke="#c8c0b0" stroke-width="2"/><path d="M-36-4L24-46L44-6Z" fill="#4a2414"/><path d="M-36-4L44-6V8L-36 10Z" fill="#2e140a"/><path d="M-22-14L32-22" stroke="#f4e6d0" stroke-width="5"/><circle cx="20" cy="-48" r="9" fill="#e0283a"/><path d="M20-56q4-8 10-8" stroke="#3a7a2a" stroke-width="2.500" fill="none"/><path d="M-60 6Q-30 14 0 8" stroke="#b8323a" stroke-width="4" fill="none" stroke-linecap="round"/></g>` +
    `<g stroke="#d8dce4" stroke-width="6" stroke-linecap="round"><path d="M206 706L262 728M400 700L344 726"/></g><ellipse cx="268" cy="730" rx="11" ry="7" fill="#d8dce4" transform="rotate(20 268 730)"/><ellipse cx="338" cy="728" rx="11" ry="7" fill="#d8dce4" transform="rotate(-24 338 728)"/>` +
    `<g filter="url(#${k}f)"><g fill="${DANA.sk}">${hand(196, 700, -70, DANA.sh, 1.5)}</g><g fill="${RAFE.sk}">${hand(412, 694, 68, RAFE.sh, 1.7)}</g></g>`, 0.6);
}

// ---------- cg3_ph_couch (KEY CLUE) ----------
function couch(): string {
  const k = 'cg3_ph_couch';
  const G = '#9a9fab', GD = '#70768a';
  return frame(k, 800, 600, '#ffd08a',
    lg(`${k}w`, '#1a1830', '#2c2440') + glow(`${k}l`, '#ffc070', 0.75) + glow(`${k}t`, '#5a8cff', 0.4) + lg(`${k}tb`, '#6a4226', '#2e1a0e'),
    `<rect width="800" height="600" fill="url(#${k}w)"/><rect y="430" width="800" height="170" fill="#14101e"/><circle cx="0" cy="330" r="420" fill="url(#${k}t)"/>` +
    `<rect x="600" y="60" width="130" height="100" fill="#221c34" stroke="#4a3a2a" stroke-width="6"/><path d="M612 148L640 110L660 130L690 96L720 148Z" fill="#3a4a5a"/>` +
    `<circle cx="716" cy="210" r="300" fill="url(#${k}l)"/><path d="M676 190H756L776 264H656Z" fill="#ffe2b0"/><rect x="710" y="264" width="12" height="180" fill="#2a2030"/><ellipse cx="716" cy="446" rx="40" ry="8" fill="#2a2030"/>` +
    `<g filter="url(#${k}f)"><rect x="110" y="170" width="560" height="220" rx="40" fill="#45416a"/><rect x="134" y="330" width="512" height="90" rx="18" fill="#56517e"/><rect x="134" y="400" width="512" height="44" rx="8" fill="#2c2948"/><rect x="606" y="250" width="86" height="200" rx="32" fill="#4c4874"/><rect x="88" y="250" width="86" height="200" rx="32" fill="#4c4874"/></g><path d="M392 180V330" stroke="#2a2844" stroke-width="5"/>` +
    `<ellipse cx="520" cy="300" rx="70" ry="52" fill="#b8643a"/><path d="M520 248A70 52 0 0 1 520 352A90 70 0 0 0 520 248Z" fill="#000" opacity=".22"/>` +
    `<g filter="url(#${k}f)"><path d="M40 300Q30 250 62 232L92 330L70 420Q44 400 40 300Z" fill="${GD}"/><path d="M250 240Q286 262 280 330L262 430Q246 440 232 426L226 300Z" fill="${GD}"/>` +
    `<path d="M62 232Q100 208 150 212Q210 208 250 240Q262 330 246 452Q150 470 60 448Q46 330 62 232Z" fill="${G}"/><path d="M96 214Q150 180 212 216Q190 262 150 264Q112 262 96 214Z" fill="${GD}"/><path d="M112 220Q150 200 194 222Q178 248 150 250Q124 248 112 220Z" fill="#565c70"/></g>` +
    `<path d="M62 430Q150 446 246 434" fill="none" stroke="${GD}" stroke-width="12"/><g transform="translate(154 336) rotate(-2) scale(1.12)">${c12('#1a2244')}</g>` +
    `<ellipse cx="400" cy="590" rx="330" ry="20" fill="#000" opacity=".5"/><path d="M130 492H690L740 560H80Z" fill="url(#${k}tb)"/><path d="M80 560H740V582H80Z" fill="#1c1008"/><path d="M130 492H690" stroke="#ffc88a" stroke-width="3" opacity=".6"/>` +
    wglass(470, 500, 1.5, '#7a1028', true) + wglass(556, 508, 1.5, '#7a1028') + `<ellipse cx="470" cy="538" rx="26" ry="5" fill="#000" opacity=".3"/><ellipse cx="556" cy="546" rx="26" ry="5" fill="#000" opacity=".3"/>` +
    `<g transform="translate(300 528) rotate(-8)"><path d="M-96-9Q-50-16-24-11V11Q-50 15-96 9ZM24-11Q56-16 100-6V12Q56 16 24 11Z" fill="#d8202e"/><path d="M-96 2Q-50-4-24 1V11Q-50 15-96 9ZM24 1Q56-4 100 4V12Q56 16 24 11Z" fill="#8a0e18"/><g fill="#5a0810"><circle cx="-80" r="2.500"/><circle cx="-66" r="2.500"/><circle cx="-52" r="2.500"/></g><ellipse rx="30" ry="21" fill="#c8ced6"/><ellipse rx="24" ry="16" fill="#101624"/><path d="M0 0L0-11M0 0L10 4" stroke="#fff" stroke-width="2.500" stroke-linecap="round"/><rect x="29" y="-4" width="8" height="8" rx="2" fill="#c8ced6"/><path d="M-18-8Q-6-16 10-12" stroke="#fff" stroke-width="2" opacity=".5" fill="none"/></g>`, 0.6);
}

// ---------- cg3_ph_keycard ----------
function keycard(): string {
  const k = 'cg3_ph_keycard';
  const S = DANA.sk;
  return frame(k, 600, 800, '#ffe2b0',
    lg(`${k}d`, '#27b0a4', '#0f5a5c', 1, 1) + glow(`${k}l`, '#ffd08a', 0.8) + lg(`${k}p`, '#fbf6e8', '#d8ceb4', 1, 1),
    `<rect width="600" height="800" fill="#c8b89a"/><path d="M0 0H600V800H0Z" fill="#3a3028" opacity=".35"/><rect x="70" y="20" width="460" height="800" fill="#e8dcc0"/><rect x="92" y="42" width="416" height="780" fill="url(#${k}d)"/>` +
    `<path d="M124 76H476V330H124ZM124 366H476V800H124Z" fill="none" stroke="#0a4448" stroke-width="5" opacity=".6"/><path d="M128 80H472" stroke="#7ae0d4" stroke-width="3" opacity=".5"/>` +
    `<circle cx="300" cy="120" r="260" fill="url(#${k}l)" opacity=".7"/><rect x="226" y="126" width="148" height="78" rx="8" fill="#c8a04a"/><rect x="232" y="132" width="136" height="66" rx="5" fill="#1c140c"/>${tx(300, 185, 56, '214', '#f2d27a')}` +
    `<circle cx="300" cy="258" r="9" fill="#0a2c30"/><circle cx="298" cy="256" r="3" fill="#7ae0d4"/><rect x="430" y="400" width="52" height="150" rx="8" fill="#2a2a30"/><circle cx="456" cy="424" r="5" fill="#4aff7a"/><rect x="436" y="486" width="76" height="18" rx="9" fill="#c8ced6"/>` +
    `<g filter="url(#${k}f)"><path d="M150 800L176 640Q200 596 260 600L350 640L330 800Z" fill="${S}"/><g transform="rotate(-7 300 500)"><rect x="196" y="318" width="170" height="60" rx="8" fill="#19b3a6"/><rect x="150" y="350" width="270" height="250" rx="6" fill="url(#${k}p)"/></g></g>` +
    `<g transform="rotate(-7 300 500)"><rect x="210" y="330" width="60" height="8" fill="#fff" opacity=".5"/><path d="M150 356Q285 388 420 356" fill="none" stroke="#b8ae94" stroke-width="2"/>${tx(285, 428, 26, 'LAKEVIEW INN', '#0f6a6c', 'letter-spacing="3"')}<path d="M196 444q14-10 28 0t28 0t28 0t28 0t28 0t28 0" fill="none" stroke="#19b3a6" stroke-width="3"/>` +
    `<text x="170" y="484" font-size="13" fill="#7a7260" ${SANS}>GUEST / ROOM</text>${tx(285, 524, 31, 'MR. &amp; MRS. SMITH', '#1a2a8a', 'transform="rotate(-3 285 520)"', HAND)}${tx(285, 572, 40, '— 214', '#1a2a8a', 'transform="rotate(-3 285 566)"', HAND)}<path d="M180 536Q290 524 392 532" stroke="#1a2a8a" stroke-width="2" fill="none" opacity=".6"/></g>` +
    `<g filter="url(#${k}f)" fill="${S}"><rect x="108" y="520" width="118" height="50" rx="25" transform="rotate(-24 167 545)"/><rect x="330" y="640" width="96" height="42" rx="21" transform="rotate(-20 378 661)"/><rect x="336" y="690" width="90" height="40" rx="20" transform="rotate(-14 381 710)"/></g>` +
    `<path d="M196 508Q216 494 226 508Q222 528 204 532Q192 524 196 508Z" fill="#e8496a"/><path d="M200 510Q210 502 220 508" stroke="#fff" stroke-width="2.500" fill="none" opacity=".6"/>`, 0.55);
}

// ---------- cg3_ph_lot (KEY CLUE, recovered) ----------
function lot(): string {
  const k = 'cg3_ph_lot';
  const door = (x: number, y: number): string => `<rect x="${x}" y="${y}" width="22" height="40" fill="#19b3a6"/><rect x="${x + 28}" y="${y + 4}" width="26" height="20" fill="#ffd98a" opacity=".7"/>`;
  let doors = '';
  for (let i = 0; i < 9; i++) doors += door(40 + i * 82, 186) + door(40 + i * 82, 252);
  return frame(k, 800, 600, '#ffb060',
    `<linearGradient id="${k}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1a48"/><stop offset=".3" stop-color="#7a3a6a"/><stop offset=".5" stop-color="#f08a4a"/></linearGradient>` +
    lg(`${k}a`, '#3a3848', '#17161e') + glow(`${k}c`, '#ffd98a', 0.95) + glow(`${k}n`, '#3ae0d0', 0.6),
    `<rect width="800" height="600" fill="url(#${k}s)"/><path d="M0 250Q200 210 400 236Q600 214 800 246V300H0Z" fill="#1c1630"/>` +
    `<rect x="20" y="170" width="760" height="130" fill="#d8ccb4"/><rect x="20" y="170" width="760" height="130" fill="#2a1c3a" opacity=".45"/><path d="M10 170H790L770 150H30Z" fill="#5a2a22"/><path d="M20 236H780" stroke="#3a2a2a" stroke-width="5"/><path d="M20 240H780" stroke="#e8e0d0" stroke-width="2" opacity=".5"/>${doors}` +
    `<circle cx="660" cy="118" r="90" fill="url(#${k}n)"/><rect x="560" y="96" width="200" height="44" rx="6" fill="#0c1c24" stroke="#3ae0d0" stroke-width="3"/>${tx(660, 127, 23, 'LAKEVIEW INN', '#8af6ea')}<path d="M640 140V170M680 140V170" stroke="#1c1c22" stroke-width="5"/>` +
    `<rect y="300" width="800" height="300" fill="url(#${k}a)"/><path d="M60 300L-40 470M230 300L170 470M570 300L630 470M740 300L840 470" stroke="#e8e0c8" stroke-width="4" opacity=".4"/>` +
    `<ellipse cx="430" cy="432" rx="230" ry="16" fill="#000" opacity=".5"/><g filter="url(#${k}f)"><path d="M224 418V352Q224 340 238 338L330 334L352 282Q356 272 370 272H470Q482 272 488 282L512 334L612 338Q630 340 632 354V418Z" fill="#eef0f2"/></g>` +
    `<path d="M224 392H632V418H224Z" fill="#8a9098"/><path d="M364 286H414V334H342ZM424 286H472L496 334H424Z" fill="#ffe6a8"/><circle cx="430" cy="310" r="50" fill="url(#${k}c)" opacity=".8"/>` +
    `<path d="M378 334Q376 300 392 296Q408 300 406 334Z" fill="#1c1a22"/><circle cx="392" cy="304" r="12" fill="#2a2630"/><path d="M384 310Q392 306 400 310" stroke="#0c0a10" stroke-width="3" fill="none"/><g transform="translate(456 332) scale(.42)"><path d="M-70 0H70L60 18H-60Z" fill="#14141a"/><ellipse cx="0" cy="-22" rx="44" ry="28" fill="#a85a18"/><path d="M-66 0Q-66-62 0-64Q66-62 66 0Z" fill="#fff" opacity=".45"/><path d="M-66 0Q-66-62 0-64Q66-62 66 0" fill="none" stroke="#fff" stroke-width="5"/></g><path d="M404 328Q420 322 432 330" stroke="#2a2630" stroke-width="8" stroke-linecap="round" fill="none"/>` +
    `<path d="M418 286V418M338 338H508" stroke="#9aa0a8" stroke-width="2.500"/><rect x="430" y="344" width="16" height="5" rx="2" fill="#6a7078"/><circle cx="290" cy="418" r="34" fill="#14141a"/><circle cx="290" cy="418" r="15" fill="#8a9098"/><circle cx="566" cy="418" r="34" fill="#14141a"/><circle cx="566" cy="418" r="15" fill="#8a9098"/><rect x="620" y="356" width="12" height="16" fill="#e03a3a"/><rect x="224" y="352" width="10" height="14" fill="#ffe6a8"/>` +
    `<rect x="346" y="350" width="150" height="46" rx="5" fill="#1f4f8a"/><path d="M358 372L366 362L374 372" fill="none" stroke="#f2b632" stroke-width="3"/>${tx(430, 370, 16, 'PINNACLE', '#fff', 'letter-spacing="1"')}${tx(421, 389, 15, 'GUTTERS', '#f2b632', 'letter-spacing="2"')}` +
    `<path d="M0 0H800V40Q400 16 0 40Z" fill="#0a0a10"/><path d="M0 0H50L20 600H0ZM800 0H750L780 600H800Z" fill="#0a0a10"/><rect x="330" y="26" width="140" height="44" rx="12" fill="#0c0c14"/><rect x="338" y="32" width="124" height="32" rx="8" fill="#3a3040"/><path d="M400 0V28" stroke="#0c0c14" stroke-width="10"/>` +
    `<path d="M0 520Q400 470 800 520V600H0Z" fill="#0c0c12"/><path d="M0 520Q400 470 800 520" fill="none" stroke="#ff9a5a" stroke-width="2" opacity=".5"/><path d="M60 600Q90 500 220 496Q340 500 360 600" fill="none" stroke="#1c1c26" stroke-width="26"/><path d="M120 560L560 496" stroke="#14141c" stroke-width="7" stroke-linecap="round"/>` +
    `<path d="M150 0L330 0L120 470L20 470Z" fill="#fff" opacity=".05"/>`, 0.6, 0.18);
}

export const caught3Art: Record<string, string> = {
  ...avatars(),
  cg3_cover: cover(),
  cg3_wall_lock: wallLock(),
  cg3_wall_home: wallHome(),
  cg3_map: mapArt(),
  cg3_ph_scorecard: garage(),
  cg3_ph_us_dock: usDock(),
  cg3_ph_dock_r: dockR(),
  cg3_ph_couch: couch(),
  cg3_ph_keycard: keycard(),
  cg3_ph_lot: lot(),
};
