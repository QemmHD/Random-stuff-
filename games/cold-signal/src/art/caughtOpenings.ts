import { scene } from './caughtScenes';

const handset = `
  <rect x="0" y="0" width="186" height="332" rx="28" fill="#0b1018" stroke="#444856" stroke-width="5"/>
  <rect x="8" y="8" width="170" height="316" rx="22" fill="#27374a"/>
  <rect x="67" y="15" width="52" height="9" rx="4.5" fill="#111621"/>
  <path d="M9 209L178 109V299q0 24-24 24H31Q9 323 9 300Z" fill="#4b637b" opacity=".47"/>
  <rect x="21" y="108" width="144" height="66" rx="12" fill="#b8cad6"/>
  <rect x="32" y="121" width="12" height="12" rx="4" fill="#527a6b"/>
  <path d="M52 126h51m-72 20h120m-120 11h104" stroke="#506373" stroke-width="4" stroke-linecap="round"/>`;

export const caughtOpeningsArt: Record<string, string> = {
  cg4_open_buzz: scene('cg4_open_buzz', 600, 900, '#222d49', '#100e1b', `
    <path d="M0 241Q166 148 374 283q126 61 226 76V900H0Z" fill="#2d314e"/>
    <path d="M0 505q138-12 291 124T600 711M0 670q180-38 329 73t270 19" fill="none" stroke="#5d6981" stroke-width="13" opacity=".45"/>
    <path d="M55 102Q245 86 568 165L597 480q-184 68-509 24L29 393Z" fill="#7a7385" stroke="#302b44" stroke-width="10"/>
    <path d="M77 132q293-7 466 65M52 402q141 49 282-12" fill="none" stroke="#a09aad" stroke-width="7" opacity=".55"/>
    <g transform="translate(293 331) rotate(17)">
      <ellipse cx="97" cy="142" rx="139" ry="133" fill="#488dbc" opacity=".23"/>
      ${handset}
    </g>
    <path d="M56 96q154 75 275 196 60 60 64 113l-26 21-35-15-32 16-19-28-39 1-9-31q-129-38-235-80V120Z" fill="#a06862"/>
    <path d="M18 108q130 33 254 147l56 71q-90-54-151-63L0 240V128Z" fill="#c59180"/>
    <path d="M254 301q69 2 104 58m-54-4 32 42m-76-31 45 20" fill="none" stroke="#734d5a" stroke-width="7" stroke-linecap="round"/>
    <path d="M383 605l79-121 47-11m-122 136 73-59 51-85" fill="none" stroke="#9996a3" stroke-width="8" stroke-linecap="round"/>
    <path d="M393 599l66-107 37-17M399 602l64-52 37-68" fill="none" stroke="#d8d3d4" stroke-width="2" opacity=".75"/>`),
  cg4_open_reflection: scene('cg4_open_reflection', 600, 900, '#5b4950', '#131622', `
    <path d="M0 447L255 264l345 39v597H0Z" fill="#383149"/>
    <path d="M0 478l255-186 345 36m-354-38 6 504m348-440L4 712" fill="none" stroke="#a07777" stroke-width="8" opacity=".26"/>
    <ellipse cx="305" cy="428" rx="210" ry="253" fill="#516c8e" opacity=".34"/>
    <g transform="translate(152 124) scale(1.6) rotate(7 93 166)">${handset}
      <path d="M8 290l170-91v31L11 319Z" fill="#b7c7d9" opacity=".27"/>
      <path d="M56 239q37-53 78-11l11 29q-21 26-57 26-23-5-32-44Z" fill="#7795ac" opacity=".46"/>
      <path d="M68 233q14-8 25-1m15-1q16-8 29-3" fill="none" stroke="#252738" stroke-width="4" opacity=".7"/>
    </g>
    <path d="M404 579q20-69 61-111l47-68q21-40 41-23 22 16-3 67l-20 49 37-33q19-12 30 5l3 130-97 181-81-17Z" fill="#b57e71"/>
    <path d="M449 559q58-17 98-62m-102 107q57-5 97-32" fill="none" stroke="#7d5157" stroke-width="7"/>`),
  cg5_open_counter: scene('cg5_open_counter', 600, 900, '#503c37', '#151821', `
    <path d="M0 48L600 156v206L0 224Z" fill="#30262e"/>
    <path d="M17 62l166 34v167L25 230ZM200 100l169 32v176l-172-38ZM387 139l179 37v170l-181-39Z" fill="#67504b" stroke="#382c31" stroke-width="8"/>
    <path d="M0 397L600 274v626H0Z" fill="#634b42"/>
    <path d="M0 433l600-111m-600 168 600-109M0 553l600-115m-600 192 600-126" fill="none" stroke="#a27359" stroke-width="3" opacity=".45"/>
    <path d="M77 450l411-98 112 68-385 229L32 543Z" fill="#b58261" opacity=".28"/>
    <ellipse cx="325" cy="473" rx="135" ry="45" fill="#382934" opacity=".68"/>
    <path d="M244 347l136-6-7 111q-60 49-122 7Z" fill="#cbb79b"/>
    <path d="M364 370q76-19 63 29-8 36-55 33" fill="none" stroke="#d6c0a0" stroke-width="17"/>
    <ellipse cx="311" cy="345" rx="67" ry="21" fill="#e4d3b6"/><ellipse cx="311" cy="347" rx="54" ry="14" fill="#3c302f"/>
    <path d="M283 328l14 15-18 11-17-8 7-10Z" fill="#6f5449"/>
    <path d="M73 647q44-142 131-178l41-32q38-29 54-11 9 13-31 36 41-24 53-7 7 16-38 36 35-7 43 7 5 13-49 29 29 1 31 17-5 14-58 19l-50 39-43 158Z" fill="#c29273"/>
    <path d="M87 598q27-52 73-63l76-60m-51 65 83-48m-53 50 62-17" fill="none" stroke="#865653" stroke-width="6"/>
    <path d="M0 676l85-114 105 52L160 900H0Z" fill="#323a46"/>`),
  cg5_open_signal: scene('cg5_open_signal', 600, 900, '#3a4550', '#1d161e', `
    <path d="M0 422l600-207v685H0Z" fill="#8b624f"/>
    <path d="M0 498l600-209m-600 281 600-206m-600 286 600-209" stroke="#b78562" stroke-width="5" opacity=".53"/>
    <path d="M55 469l231-112 127 89-198 151Z" fill="#302b34" opacity=".83"/>
    <path d="M394 342l185-69 21 34-142 190-92-70Z" fill="#354349"/>
    <path d="M421 381l144-52m-132 77 106-32" stroke="#657672" stroke-width="14" opacity=".56"/>
    <g transform="translate(264 214) rotate(31) scale(1.18)">
      <ellipse cx="100" cy="161" rx="157" ry="173" fill="#528b9f" opacity=".22"/>
      ${handset}
    </g>
    <g transform="translate(123 449) rotate(-32)">
      <ellipse cx="0" cy="0" rx="31" ry="19" fill="none" stroke="#e0aa60" stroke-width="12"/>
      <path d="M26 0h99v21h-12v15H99V22H26Z" fill="#bb8549"/>
      <path d="M30 5h80" stroke="#f1bb76" stroke-width="4"/>
    </g>`),
  cg6_open_water: scene('cg6_open_water', 600, 900, '#233c47', '#1b2530', `
    <path d="M64 49l428 52 25 642-458 58Z" fill="#122832" stroke="#50696a" stroke-width="14"/>
    <path d="M91 88l369 41 12 601-389 37Z" fill="#586e6d"/>
    <path d="M108 116l330 36 16 521-356 59Z" fill="#9bac9a"/>
    <path d="M180 127l-19 603m162-579 21 547m-241-264 344-43" stroke="#4b696c" stroke-width="8"/>
    <path d="M212 163q-31-28-82-30m76 34 64-25m-64 25v34" fill="none" stroke="#cfb58e" stroke-width="7" stroke-linecap="round"/>
    <path d="M207 199q-13 40-50 78l24 59-76 291q126 50 252-24l-86-275 14-53q-55-25-78-76Z" fill="#d4cdb6"/>
    <path d="M207 205q-6 62-26 130m28-5-27 309m57-306 31 290m-89-291q41 12 90-4" fill="none" stroke="#8d9e92" stroke-width="7"/>
    <path d="M204 240q-2 40-27 79m74-51 18 45m-102 70-32 142m98-177 30 131" stroke="#efe5cf" stroke-width="5" stroke-linecap="round"/>
    <path d="M353 142h95l17 465-83 51q-19-151 15-280t-44-236Z" fill="#53696d" opacity=".59"/>
    <path d="M355 471q15-75 73-76m-63 163q48-97 94-89m-95 113q47-40 96-54" fill="none" stroke="#d3dfd6" stroke-width="16" opacity=".23" stroke-linecap="round"/>
    <path d="M0 663l117 16 483-91v312H0Z" fill="#1b2833"/>
    <path d="M0 703l115 11 485-91" fill="none" stroke="#657976" stroke-width="12"/>`),
  cg6_open_signal: scene('cg6_open_signal', 600, 900, '#474650', '#191b29', `
    <path d="M0 357l600-122v665H0Z" fill="#6e605d"/>
    <path d="M0 417l600-137M0 490l600-142m-600 229 600-154" stroke="#a18675" stroke-width="7" opacity=".38"/>
    <path d="M39 220q30 107 84 199m-37-192 41 193m10-148 27 137" fill="none" stroke="#566a59" stroke-width="9"/>
    <path d="M29 197q29-27 55 4l-3 49q-32 20-51-13Zm56 16q14-25 42-20l24 33-18 34q-43 9-54-21Zm53 39q35-27 64 0l-14 36q-19 20-49-2Z" fill="#cbb0ad"/>
    <path d="M95 377h81l14 104q-50 41-102 3Z" fill="#516971"/>
    <path d="M336 633q19 86 98 84 68-1 91-80t-9-169" fill="none" stroke="#3e3c46" stroke-width="14"/>
    <path d="M336 632q34 95 104 86 66-7 83-82" fill="none" stroke="#c0b4ab" stroke-width="5"/>
    <g transform="translate(236 195) rotate(-12) scale(1.32)">
      <ellipse cx="100" cy="161" rx="146" ry="159" fill="#82a6bf" opacity=".26"/>
      ${handset}
    </g>
    <path d="M25 549l147-18 28 76-153 31Z" fill="#c4b59e"/>
    <path d="M62 570l101-14m-89 35 80-14" stroke="#796a65" stroke-width="4" opacity=".6"/>`),
};
