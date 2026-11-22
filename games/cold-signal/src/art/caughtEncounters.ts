import { encounterFrames, type EncounterChapter } from '../cases/caughtMedia';
import { label, scene } from './caughtScenes';

interface Cast {
  skin: string;
  hair: string;
  top: string;
  bottom: string;
  shoe: string;
  longHair?: boolean;
  earStud?: boolean;
  beard?: boolean;
  sleeves?: boolean;
}

interface Shot {
  left: Cast;
  right: Cast;
  backdrop: string;
  colors: [string, string];
  stance: [number, number];
}

const windowLight = (x: number, tint: string) => `
  <g transform="translate(${x} 0)"><rect y="49" width="267" height="292" fill="${tint}" stroke="#372c39" stroke-width="10"/>
    <path d="M8 302V253h28v-41h24v68h28v-28h31v-67h28v62h70v35h43v51H8Z" fill="#242433" opacity=".57"/>
    <path d="M29 271h10m17-34h8m64-15h6m64 57h16m-77-31h9" stroke="#f3bb7b" stroke-width="4" opacity=".8"/>
    <path d="M133 50v286M0 201h267" stroke="#372c39" stroke-width="9"/>
    <path d="M12 325 254 68v33L58 334Z" fill="#ffe5c2" opacity=".1"/></g>`;

const door = (x: number, number: string, fill: string) => `
  <g transform="translate(${x} 0)"><rect y="29" width="150" height="402" fill="${fill}" stroke="#483437" stroke-width="7"/>
    <path d="M15 51h118v363H15Z" fill="none" stroke="#e8b69d" stroke-width="3" opacity=".35"/>
    <rect x="47" y="92" width="56" height="30" rx="3" fill="#4d3a44"/>${label(75,113,18,number,'#ffdbad')}
    <path d="M115 206h15" stroke="#d6b67b" stroke-width="6" stroke-linecap="round"/></g>`;

const easel = (x: number, scale: number) => `<g transform="translate(${x} 129) scale(${scale})">
  <path d="M44 251 69 11 101 245M72 181 124 251" fill="none" stroke="#926851" stroke-width="7"/>
  <rect x="19" y="25" width="101" height="115" fill="#beaa95" stroke="#75534e" stroke-width="4"/>
  <path d="M23 100q42-14 93 1v34H23Z" fill="#6c6f8c"/>
  <path d="M67 105l5-48h12l5 48z" fill="#f1c8a2"/><path d="m70 58 8-10 8 10m-15 26h15" stroke="#aa615a" stroke-width="4"/>
  <path d="M13 144h115" stroke="#bb8f65" stroke-width="7"/></g>`;

const bed = (x: number, blanket: string) => `<g transform="translate(${x} 0)">
  <path d="M8 285v153h229" fill="none" stroke="#654354" stroke-width="12"/>
  <path d="M20 335q43-29 90 2l93 11 49 46H14Z" fill="#e2bfb1"/>
  <path d="M13 377q83-21 125-1l68-17 52 40-9 44H11Z" fill="${blanket}"/>
  <path d="M13 402q99-16 142 1l91-12m-74 27 72-12" fill="none" stroke="#fbe4d2" stroke-width="4" opacity=".21"/></g>`;

const shots: Record<EncounterChapter, Shot> = {
  1: {
    left: { skin: '#dba57e', hair: '#21151b', top: '#b07187', bottom: '#342d42', shoe: '#d5b49f', longHair: true, earStud: true },
    right: { skin: '#cf9a74', hair: '#261a19', top: '#875750', bottom: '#34384c', shoe: '#211f2b', beard: true, sleeves: true },
    colors: ['#765150', '#302a3d'], stance: [0.95, 1.06],
    backdrop: `${windowLight(470,'#6e627e')}<path d="M0 95h437M0 153h437M0 211h437m-315-58v58m139-116v58m-99 58v58m133-58v58" stroke="#eb9779" stroke-width="2" opacity=".19"/>
      ${easel(60,.93)}${easel(177,.78)}
      <path d="M0 436h191v72H0Z" fill="#3d2c38"/><path d="M0 427h203v16H0Z" fill="#916960"/>
      <path d="M58 427v-32h30v32m22 0v-37h34v37" fill="#9d786b"/><path d="M62 390l-7-34m23 34 8-39m41 38 4-52" stroke="#d1a885" stroke-width="4"/>`,
  },
  2: {
    left: { skin: '#eec2a2', hair: '#533a2c', top: '#575367', bottom: '#504157', shoe: '#e6d1b9', sleeves: true },
    right: { skin: '#e9b28c', hair: '#d3a74f', top: '#a76882', bottom: '#5f435e', shoe: '#38303e', longHair: true },
    colors: ['#846170', '#392f43'], stance: [1.08, .96],
    backdrop: `${door(229,'6','#875862')}${bed(548,'#73526e')}
      <rect x="22" y="98" width="155" height="190" rx="8" fill="#a0878d" stroke="#caa68b" stroke-width="7"/>
      <path d="M31 273 154 112h14L64 277Z" fill="#ffe3ce" opacity=".18"/>
      <path d="M228 467q13-15 35-3l10 13h-59zm32 9q17-15 33-2l9 12h-56z" fill="#b8756a" stroke="#d0ac8a" stroke-width="3"/>`,
  },
  3: {
    left: { skin: '#e9b993', hair: '#9a663a', top: '#5d8a74', bottom: '#3f4955', shoe: '#e1d4bc', longHair: true },
    right: { skin: '#dba77c', hair: '#a97944', top: '#708397', bottom: '#444c57', shoe: '#68564f', beard: true, sleeves: true },
    colors: ['#4d5978', '#342c44'], stance: [.96, 1.04],
    backdrop: `${door(48,'214','#5a6174')}${bed(553,'#716b88')}
      <rect x="574" y="100" width="174" height="105" rx="8" fill="#323042" stroke="#a09fbd" stroke-width="5"/>
      <rect x="584" y="112" width="154" height="80" rx="6" fill="#91a8c6" opacity=".5"/>
      <path d="M584 197h156m-40 13H633" stroke="#342d3e" stroke-width="5"/>
      <path d="M638 424l-50-22" stroke="#4d352d" stroke-width="9"/><ellipse cx="656" cy="430" rx="29" ry="21" fill="#a17c4e" transform="rotate(23 656 430)"/>`,
  },
  4: {
    left: { skin: '#db9b70', hair: '#3b2425', top: '#383340', bottom: '#4e475a', shoe: '#b3a7aa' },
    right: { skin: '#e4b099', hair: '#562a35', top: '#8b5667', bottom: '#3e304b', shoe: '#d0a3a0', longHair: true, earStud: true },
    colors: ['#725662', '#392940'], stance: [1.08, .97],
    backdrop: `${windowLight(265,'#a1787c')}${bed(560,'#836879')}
      <path d="M50 365h111m-54 1v96" stroke="#694753" stroke-width="10"/><path d="M100 356q-14-10 2-38 13 25 2 37Z" fill="#ffd18b"/>
      <ellipse cx="576" cy="338" rx="24" ry="34" fill="none" stroke="#c48797" stroke-width="7"/>
      <path d="M559 319l-10-8m43 44 9 6" stroke="#47374a" stroke-width="7"/>`,
  },
  5: {
    left: { skin: '#bb8268', hair: '#241d31', top: '#497785', bottom: '#463d54', shoe: '#a38173' },
    right: { skin: '#995d4a', hair: '#2a1e34', top: '#625679', bottom: '#343b49', shoe: '#292b36' },
    colors: ['#685d71', '#393447'], stance: [.99, 1.02],
    backdrop: `${windowLight(80,'#757390')}
      <path d="M483 288h317v165H545Z" fill="#4b4555"/><path d="M483 288h317v15H488Z" fill="#9b8382"/>
      <path d="M538 319h262m-259 49h259m-157-65 27 150" fill="none" stroke="#817280" stroke-width="4"/>
      <path d="M584 315h93l-22 38h-96z" fill="#9e8480" stroke="#625360" stroke-width="4"/>
      <path d="M576 339h31" stroke="#c7a699" stroke-width="4" stroke-linecap="round"/>
      <path d="M746 284v-28h18v28m-26-28h33" fill="#d6ba9f" stroke="#d6ba9f" stroke-width="3"/>`,
  },
  6: {
    left: { skin: '#c98e70', hair: '#302032', top: '#c29a86', bottom: '#58485b', shoe: '#7d594e', earStud: true },
    right: { skin: '#dcaa85', hair: '#654841', top: '#b6a2a4', bottom: '#3a374a', shoe: '#2a2533', sleeves: true },
    colors: ['#6f5868', '#372e48'], stance: [.96, 1.05],
    backdrop: `${door(64,'608','#79616f')}${bed(558,'#8c6975')}
      <path d="M620 94v-17h63m-35 25-51 47v135h109V149l-54-47Z" fill="#494254" stroke="#aa8791" stroke-width="5"/>
      <path d="M650 123v157" stroke="#736177" stroke-width="4"/>
      <path d="M674 160h47v38h-47Z" fill="#deb593"/>${label(697,175,10,'BEST','#473849')}${label(697,188,10,'MAN','#473849')}
      <path d="M549 196q13 51-18 80l10 20 27-14q18-48-6-87" fill="#74526f"/>`,
  },
};

function profile(c: Cast): string {
  return `<path d="M-11 15C-12 8-15 1-17-10L12-14 14 12 21 26-15 27Z" fill="${c.skin}"/>
    <path d="M-25-23c-2-18 8-37 27-39 13-2 21 5 25 12l4 14 7 11q2 4-5 6l-2 8-5 2 2 5Q28 9 18 10L6 8-1 1q-23-2-24-24Z" fill="${c.skin}"/>
    <path d="M-24-12c-13-18-7-43 8-49q21-15 40-2l10 11-4 9q-8-5-13-10-5 12-17 22l-4 25z" fill="${c.hair}"/>
    ${c.longHair ? `<path d="M-21-54Q-47-26-40 3q5 18-8 36 15 13 36 7l8-27L-7-8l-8-17Z" fill="${c.hair}"/><path d="M-23-25q-9 25-5 44l-7 17" stroke="#fff" opacity=".13" fill="none" stroke-width="3"/>` : ''}
    ${c.beard ? `<path d="M2-12q10 13 20 8l9-8q-4 24-15 22L4 4Z" fill="${c.hair}" opacity=".83"/>` : ''}
    <path d="M17-30q6 3 10-1" fill="none" stroke="#422d35" stroke-width="2" stroke-linecap="round"/>
    <path d="M25-9h5" stroke="#6e3c49" stroke-width="2" stroke-linecap="round"/>
    <path d="M-4-19q-7-7-8 2 1 5 6 5" fill="none" stroke="#532d37" stroke-width="2" opacity=".6"/>
    ${c.earStud ? '<circle cx="-7" cy="-11" r="2.5" fill="#f5d5ad"/>' : ''}`;
}

function figure(c: Cast, x: number, y: number, scale: number, direction: number, lean: number, reaching: boolean, forward: boolean): string {
  const leg = forward ? 12 : -6;
  return `<g transform="translate(${x} ${y}) scale(${scale * direction} ${scale})">
    <ellipse cy="434" rx="53" ry="11" fill="#201823" opacity=".38"/>
    <path d="M-33 220h62L15 315l${leg} 104H-3l-13-95-4-61-11 61-14 91h-27l11-124z" fill="${c.bottom}"/>
    <path d="M-24 265-36 319-51 405m62-89L${leg + 10} 410" fill="none" stroke="#fff" opacity=".15" stroke-width="3"/>
    <path d="M-71 410h27l14 15q6 9-7 9h-41q-7-4 7-24m${leg + 78} 5h21l16 9q7 11-7 11H-2q-6-3-2-18z" fill="${c.shoe}"/>
    <path d="M-31 34Q-22 17-8 23q19 9 33-2 20 11 18 37L28 157l8 67q-29 13-77 0l10-94-8-50q-6-31 8-46Z" fill="${c.top}"/>
    <path d="M-24 39q-9 12-6 60l6 34-8 80m51-160-8 55q-4 29 10 54" fill="none" stroke="#fff" stroke-width="3" opacity=".18"/>
    <path d="M-20 52q-18 49-8 82l7 60 12 13 4-16-4-58 11-61" fill="${c.skin}" stroke="#402b38" stroke-opacity=".21" stroke-width="2"/>
    <path d="M-24 43q7-12 20-6l14 14-12 ${c.sleeves ? 71 : 35}q-18 1-32-8z" fill="${c.top}"/>
    ${reaching
      ? `<path d="M22 54q4 26 16 46l46-22 11-11 15-3-3 7-8 4 4 3-8 9-12 3-45 33q-11 5-18-6L3 78Z" fill="${c.skin}"/><path d="M16 41q16-6 23 12l9 ${c.sleeves ? 42 : 23}-25 11L5 72Z" fill="${c.top}"/>`
      : `<path d="M22 51q16 9 15 36l-3 51-8 43-11 7-6-8 6-10 3-41-2-53z" fill="${c.skin}"/><path d="M20 38q16 0 20 19l-1 ${c.sleeves ? 53 : 33}-22 5L11 70Z" fill="${c.top}"/>`}
    <g transform="translate(16 1) rotate(${lean})">${profile(c)}</g>
  </g>`;
}

function draw(shot: Shot, key: string, frame: number, chapter: number): string {
  const middle = [0,400,426,391,395,439,391][chapter];
  const gap = frame === 1 ? 47 : frame === 0 ? 102 : 76;
  const y = (scale: number) => 106 + (frame === 1 ? 0 : (1 - scale) * 310);
  const tilt = frame === 1 ? -7 : frame === 0 ? 5 : -1;
  return scene(key, 800, 600, ...shot.colors, `
    <defs><radialGradient id="${key}_falloff"><stop stop-color="#ffd4aa" stop-opacity=".36"/><stop offset="1" stop-color="#ffd4aa" stop-opacity="0"/></radialGradient></defs>
    <g transform="translate(${frame === 0 ? -7 : frame === 2 ? 6 : 0} 0)">
      <path d="M-21 417h843v210H-21Z" fill="#543f4f"/>
      <path d="M-20 418h843M-20 470h843m-604-53-141 183m289-183-54 183m223-183 62 183m122-183 171 183" fill="none" stroke="#d1ab9a" stroke-width="3" opacity=".15"/>
      <ellipse cx="429" cy="313" rx="387" ry="299" fill="url(#${key}_falloff)"/>
      ${shot.backdrop}
      ${figure(shot.right, middle + gap, y(shot.stance[1]), shot.stance[1], -1, tilt + 5, frame !== 2, chapter % 2 === 0)}
      ${figure(shot.left, middle - gap, y(shot.stance[0]), shot.stance[0], 1, tilt, frame !== 0, chapter % 2 !== 0)}
    </g>
    <path d="M27 60V28h32m682 0h32v32M27 543v30h32m682 0h32v-30" fill="none" stroke="#efe0d9" stroke-opacity=".38" stroke-width="3"/>
    <path d="M0 553h800m-800 7h800" stroke="#d0a4a3" opacity=".1"/>
  `);
}

export const caughtEncountersArt = Object.fromEntries(([1, 2, 3, 4, 5, 6] as const).flatMap((chapter) =>
  encounterFrames(chapter).map(({ art }, frame) => [art, draw(shots[chapter], art, frame, chapter)]),
));
