import { label, scene } from './caughtScenes';

export const caughtClipsArt: Record<string, string> = {
  cg4_clip_room: scene('cg4_clip_room', 800, 600, '#55405a', '#1c1b2b', `
    <path d="M72 66h495v438H72Z" fill="#372d3d" stroke="#716071" stroke-width="13"/>
    <path d="M98 95h442v355H98Z" fill="#806c79"/><path d="M302 93v357m-202-128h440" stroke="#493f51" stroke-width="9"/>
    <path d="M107 323q35-3 67 26l-45 65 97-19q103-23 225 23l-10 36H99Z" fill="#9a7c82"/>
    <path d="M0 472q139-54 317-23 151 31 483-24v175H0Z" fill="#453346"/>
    <path d="M0 522q215-71 412-8m69 35q140-31 319-48" fill="none" stroke="#826878" stroke-width="12"/>
    <path d="M642 353h118v13H642Z" fill="#6b514c"/><path d="M692 338q-20-23 1-51 18 23 6 51Z" fill="#efb278"/>
    <g transform="translate(518 449) rotate(-13)"><ellipse cx="62" cy="0" rx="72" ry="25" fill="none" stroke="#c18993" stroke-width="9"/><path d="M-17-4h19m121 4h17" stroke="#522b4b" stroke-width="11"/></g>`),
  cg4_clip_pair: scene('cg4_clip_pair', 800, 600, '#634652', '#1a1928', `
    <path d="M126 27h531v391H126Z" fill="#9b7c79" stroke="#513d51" stroke-width="14"/>
    <path d="M398 31v382m-270-185h530" stroke="#4c3c50" stroke-width="11"/>
    <path d="M198 386q13-118 92-143l28-16 2-26q-37-27-36-72 3-63 61-63 48 0 64 67l-6 31 10 19-24 12-1 33q33 10 64 63l-55 117Z" fill="#352739"/>
    <path d="M368 348q20-70 75-98l21-20-4-27l-12-13q-22-1-27-9l15-9q10-20 11-36-6-54 35-78 43-22 77 15l14 68-8 67q61 32 88 175l-147 9Z" fill="#654252"/>
    <path d="M449 103q32-41 74 0 18 39-1 81l27 58q-31 18-46-25l-12-58Z" fill="#3f2c3a"/>
    <path d="M390 218q37-26 72 0m-57 9q27-8 49 3m-78-3q20-18 45-17" fill="none" stroke="#c28877" stroke-width="12" stroke-linecap="round"/>
    <path d="M33 454q336-76 760 15v131H0Z" fill="#564055"/>
    <ellipse cx="641" cy="478" rx="67" ry="33" fill="none" stroke="#a7788f" stroke-width="11"/>`),
  cg5_clip_court: scene('cg5_clip_court', 800, 600, '#5d5265', '#1d2734', `
    <path d="M0 152l260-63 266 88 274 13v242H0Z" fill="#453241"/>
    <path d="M0 184l261-61 268 87 271 12" stroke="#965a58" stroke-width="22" fill="none"/>
    <path d="M197 227h83v165h-83zm399 20h89v165h-89z" fill="#2e2939"/>
    <path d="M211 223h55m346 21h57" stroke="#ffbf83" stroke-width="16"/>
    ${label(240,265,30,'04','#f5c182')}${label(642,290,30,'11','#e5ad91')}
    <path d="M0 434q359-25 800 9v157H0Z" fill="#5c5269"/>
    <path d="M214 443l-64 128m89-135 18 147m370-138-81 135m93-132 53 120" stroke="#ca8e73" stroke-width="19" opacity=".3"/>
    <path d="M17 11l61 580M710 9l-89 591m-502-473L95 600m435-547-55 508" stroke="#c3c4cd" stroke-width="4" opacity=".52"/>
    <path d="M0 0l98 53-23 547H0Zm800 0-57 37 42 563h15Z" fill="#25222f"/>`),
  cg5_clip_car: scene('cg5_clip_car', 800, 600, '#605465', '#272133', `
    <path d="M0 127l381-43 419 41v323H0Z" fill="#443361"/>
    <path d="M450 171h172v258H450Z" fill="#252437" stroke="#a96268" stroke-width="8"/>
    <path d="M462 188h149" stroke="#e0a176" stroke-width="17"/>${label(537,235,33,'11','#f9c2a4')}
    <path d="M199 430l65-101h185l86 87 52 18 14 69H154l10-49Z" fill="#30313f" stroke="#796075" stroke-width="6"/>
    <path d="M264 348h175l59 72H218Z" fill="#948780"/><path d="M354 348l-9 72" stroke="#433743" stroke-width="9"/>
    <path d="M159 459h50m340-5h42" stroke="#ed806e" stroke-width="13"/><circle cx="242" cy="499" r="32" fill="#1f1d27"/><circle cx="498" cy="501" r="32" fill="#1f1d27"/>
    <path d="M80 447l-43 117m121-84-30 109m560-343-52 306m110-266-28 273" stroke="#cbb6bd" stroke-width="3" opacity=".56"/>
    <g transform="translate(35 328) scale(-1 1)" opacity=".48">${label(-62,0,79,'04','#f4786c')}</g>`),
  cg6_clip_hall: scene('cg6_clip_hall', 600, 900, '#503d52', '#1d2430', `
    <path d="M71 23l464 62v736l-466 63Z" fill="#332a40" stroke="#825a63" stroke-width="12"/>
    <path d="M101 48l401 61v666l-399 40Z" fill="#5c4353"/>
    <path d="M153 126l301 33v535l-299 45Z" fill="#443145" stroke="#9f735f" stroke-width="7"/>
    <path d="M105 777l398-43 28 43-462 60Z" fill="#c49373" opacity=".78"/>
    <rect x="216" y="229" width="156" height="60" rx="3" fill="#80615d"/>${label(296,271,32,'608','#f3c894')}
    <path d="M402 447h20v52h-20Z" fill="#dca981"/><path d="M389 470h34" fill="none" stroke="#ecc394" stroke-width="9" stroke-linecap="round"/>
    <path d="M0 0l60 25v822L0 893zm600 0-57 51v793l57 56z" fill="#241e2d"/>`),
  cg6_clip_tag: scene('cg6_clip_tag', 600, 900, '#3b374a', '#1e202a', `
    <path d="M34 0h521v845H34Z" fill="#594654"/>
    <path d="M299 152q-22-28 10-41 20-7 31-31" stroke="#c49478" stroke-width="8" fill="none"/>
    <path d="M298 156L125 233 99 698q185 84 429 11l-40-473Z" fill="#30303e" stroke="#857080" stroke-width="8"/>
    <path d="M299 157v552m-160-468q104 2 150 63m142-63q-55 14-122 66" fill="none" stroke="#5a4d64" stroke-width="10"/>
    <path d="M312 166q36 63 61 136" fill="none" stroke="#b68f76" stroke-width="5"/>
    <path d="M337 302l46-33 58 33 16 161-108 11Z" fill="#e8bc88"/>
    <circle cx="388" cy="305" r="8" fill="#6b4b53"/>
    <g transform="rotate(-5 396 390)">${label(396,365,25,'BEST','#563949')}${label(396,399,25,'MAN','#563949')}</g>`),
};
