import { studyKey, studySubjects } from '../cases/caughtPortraits';
import { caught1StudyHeads } from './caught1';
import { caught2StudyHeads } from './caught2';
import { caught3StudyHeads } from './caught3';
import { scene } from './caughtScenes';

type Chapter = 1 | 2 | 3;

interface StudyHead {
  skin: string;
  shade: string;
  draw: (tilt: number) => string;
}

const heads = { 1: caught1StudyHeads, 2: caught2StudyHeads, 3: caught3StudyHeads } satisfies {
  [N in Chapter]: Record<keyof typeof studySubjects[N], StudyHead>;
};

const rooms = {
  1: { wall: '#897167', accent: '#dcb998', background: '<path d="M125 0 423 30l18 379-316 48Z" fill="#453245" opacity=".59"/><path d="M125 161h304M258 12v423" stroke="#d7b4a2" stroke-width="11" opacity=".27"/>' },
  2: { wall: '#776c86', accent: '#d3b4c4', background: '<path d="M0 291 451 0h149v54L0 429Zm0 169L600 91v43L0 542Z" fill="#dfbacb" opacity=".17"/><path d="M426 0v429m50-429v405" stroke="#4c445c" opacity=".32" stroke-width="23"/>' },
  3: { wall: '#607b7d', accent: '#debda1', background: '<path d="M70 0h471v480H70Z" fill="#344950"/><path d="M96 0h415v447H96Z" fill="#9caca1" opacity=".66"/><path d="M307 0v444m-214-210h419" stroke="#40565c" stroke-width="13"/>' },
};

const poses = [
  {
    tilt: -7, shift: -40,
    outline: 'M244 301h108l9 62q37 13 86 38 45 26 62 66l30 136-20 88-69-6 4-113-26-47-12 147H135l-2-142-42 75-62-16 54-148q22-54 76-62l72-21Z',
    collar: 'M139 421q57-22 143 15m10 1q58-47 144-15',
    chest: 'M155 465q50-37 112 7 11 43-26 71-67 20-81-17-14-25-5-61ZM328 473q53-48 115-14l-2 48q-12 47-66 45-51-7-47-79Z',
    points: [207,516,390,513],
  },
  {
    tilt: 3, shift: 51,
    outline: 'M245 299h108l18 64 104 40q44 23 53 69l51 160-64 18-59-104-8 131H155l-9-122-42 104-78-11 51-177q17-60 97-80l57-26Z',
    collar: 'M126 429q116-29 163 13m19 1q79-50 159-20',
    chest: 'M140 474q85-47 147-8l-5 46q-79 57-122 20Zm185-10q83-40 135 7l-18 69q-61 32-120-11Z',
    points: [215,514,391,512],
  },
  {
    tilt: 5, shift: -6,
    outline: 'M248 297h105l3 47q44 19 76 26 55 14 79 63l61 139-72 25-67-94 5 170H163l-20-112-33 60-72-13 36-144q12-57 73-86l82-19Z',
    collar: 'M140 434q82-48 142 0m22-4q64-46 132-30',
    chest: 'M156 465q68-52 127-5l-2 48q-70 45-114 16Zm163-9q75-49 126-20l-8 67q-61 34-118 4Z',
    points: [215,504,381,485],
  },
];

function draw(key: string, chapter: Chapter, head: StudyHead, index: number): string {
  const room = rooms[chapter];
  const pose = poses[(index + chapter - 1) % poses.length];
  const [ax, ay, bx, by] = pose.points;
  return scene(key, 600, 760, room.wall, '#24212f', `
    ${room.background}
    <defs><linearGradient id="${key}_skin" x1="0" y1=".2" x2="1" y2=".72">
      <stop stop-color="${head.shade}"/><stop offset=".47" stop-color="${head.skin}"/><stop offset=".82" stop-color="${head.skin}"/><stop offset="1" stop-color="${head.shade}"/>
    </linearGradient></defs>
    <g transform="translate(${pose.shift} 0)">
      <path d="${pose.outline}" fill="url(#${key}_skin)"/>
      ${head.draw(pose.tilt)}
      <path d="${pose.collar}" fill="none" stroke="${head.shade}" stroke-width="5" stroke-linecap="round"/>
      <path d="${pose.chest}" fill="${head.shade}" opacity=".35"/>
      <path d="M297 439v31m3 96q-7 9 1 14" fill="none" stroke="${head.shade}" stroke-width="4" opacity=".55"/>
      <g fill="${head.shade}"><ellipse cx="${ax}" cy="${ay}" rx="13" ry="8"/><ellipse cx="${bx}" cy="${by}" rx="12" ry="8"/></g>
      <g fill="#57313e" opacity=".65"><ellipse cx="${ax}" cy="${ay}" rx="4" ry="2.6"/><ellipse cx="${bx}" cy="${by}" rx="4" ry="2.6"/></g>
      <path d="M44 674q189 26 284 4t233-21v125H44Z" fill="${room.wall}"/>
      <path d="M50 706q198 22 273 0t236-18" fill="none" stroke="${room.accent}" stroke-width="6" opacity=".33"/>
    </g>`);
}

export const caughtEarlyStudiesArt: Record<string, string> = {};
for (const chapter of [1, 2, 3] as const) {
  Object.entries(heads[chapter]).forEach(([subject, head], index) => {
    const key = studyKey(chapter, subject);
    caughtEarlyStudiesArt[key] = draw(key, chapter, head, index);
  });
}
