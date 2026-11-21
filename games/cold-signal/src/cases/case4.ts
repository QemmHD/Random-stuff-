import type { CaseFile } from '../types';

// CASE 04 — LAST CHAIR
// Truth: Rafi Haddad, 27, night lift mechanic at Silverpine Mountain, is in custody
// for burning the Aerie, the 1961 summit lodge at the top of the Eagle lift. He
// confessed. He didn't do it.
// On Mar 7 his sister Lina (16) and five friends rode the last chair up, hid in the
// closed Aerie and partied, using the little propane heater Lina took from Rafi's
// shop. At 22:51 Lina texted: Zoe's ankle was hurt, they were stuck. Rafi ran Eagle
// after hours with his key (0114) from 23:12 to 23:31 and brought all six down. The
// heater was turned off and left outside on the deck. At 01:05 Lina realised her bag
// (school ID inside) was still on the deck; Rafi rode the shop sled up at 01:31,
// grabbed it and sent her a photo at 01:34. The Aerie looked dark to him.
// It wasn't empty. Owner Bram Kessler, whose sale of the resort to Altura depended
// on clearing the heritage-protected Aerie (and who had quadrupled its insurance in
// January), had gone up on his own sled SP-01 at 01:08 and badged into the kitchen
// service door (badge 0001) at 01:24. He saw Rafi's sled light on the deck. He set
// the fire in the storeroom and left at 01:47; the smoke panel tripped at 01:49.
// At dawn Kessler saw Rafi's key on the lift log, emailed all staff, then left a
// voicemail steering Rafi into confessing — and slipped: he mentioned "the bag you
// went back for," which only someone at the Aerie at 01:34 could know.
// Rafi, sure the party (and his heater) caused it, deleted everything that put Lina
// there — including the 01:34 photo, which shows the heater off on the deck and a
// headlamp moving in the kitchen window behind it — and confessed.
// Red herrings: Lina's party (cleared by lift log, heater, fire origin), Wes Tolliver
// (fired groomer who wished it would burn — at karaoke in town at 01:41).

export const case4: CaseFile = {
  id: 'last-chair',
  number: '04',
  title: 'Last Chair',
  tagline: 'He confessed before anyone asked. That was the first thing that was wrong.',
  difficulty: 2,
  cover: 'cover_case4',
  owner: { name: 'Rafi Haddad', age: 27, summary: 'Night-shift lift mechanic at Silverpine Mountain. Confessed to burning the oldest building on the hill.' },
  status: 'IN CUSTODY',
  deviceCondition: 'RESET ABORTED AT 23% · 77% READABLE',
  briefing: [
    'Rafi Haddad, 27. Night-shift lift mechanic at Silverpine Mountain, like his father before him.',
    'At 01:49 on Sunday, March 8, a smoke alarm at the summit tripped and the panel went dark. By dawn the Aerie — a 1961 timber lodge at the top of the Eagle lift, the oldest building on the mountain — was ash. Nobody was hurt.',
    'At 08:10 Rafi walked into Cutter\'s Gap PD and confessed: he ran Eagle after hours, rode up alone, and left a propane heater burning on the deck. His key is on the lift log. The DA wants his plea signed Friday.',
    'His mother doesn\'t believe a word of it. On Saturday she brought us the phone he left on the kitchen table. "He tried to wipe it. It stopped at twenty-three percent."',
    'His sister Lina, 16: "His code is the vertical on Eagle. Top minus bottom, in feet. Baba made him learn it the first time they rode it together."',
    'A confession is supposed to be the end of a case. Find out why this one feels like the beginning.',
  ],
  phoneDate: '2026-03-16',
  phoneTime: '09:20',
  lock: {
    passcode: '2092',
    hint: 'the vertical on Eagle — top minus bottom, in feet',
    wallpaper: 'wall_c4_lock',
    notifications: [
      { app: 'mail', title: 'Silverpine Ops', text: 'Snow report · Base area (9,148 ft): 14 cm new, −8 °C. Eagle CLOSED — summit structure fire.', t: '2026-03-14T06:00' },
      { app: 'messages', title: 'Mama', text: 'I gave your phone to the woman from the cold case office. Forgive me, habibi.', t: '2026-03-14T17:30' },
      { app: 'messages', title: 'Lina 🐿️', text: "I'm going to tell them. I don't care what you made me promise.", t: '2026-03-12T22:10' },
      { app: 'phone', title: 'Missed call', text: 'Bram Kessler', t: '2026-03-08T07:40' },
    ],
  },
  homeWallpaper: 'wall_c4_home',

  contacts: [
    { id: 'lina', name: 'Lina 🐿️', avatar: 'av_c4_lina', number: '(555) 208-0316', label: 'sis' },
    { id: 'mama', name: 'Mama', avatar: 'av_c4_mama', number: '(555) 208-1170' },
    { id: 'kessler', name: 'Bram Kessler', avatar: 'av_c4_kessler', number: '(555) 300-0001', label: 'boss · Silverpine' },
    { id: 'mags', name: 'Mags Okafor', avatar: 'av_c4_mags', number: '(555) 300-0307', label: 'cat 3 (groomer)' },
    { id: 'dag', name: 'Dag Lindqvist', avatar: 'av_c4_dag', number: '(555) 300-0220', label: 'ski patrol' },
    { id: 'wes', name: 'Wes Tolliver', avatar: 'av_c4_wes', number: '(555) 471-9902', label: "don't" },
    { id: 'abara', name: 'Det. Simone Abara', avatar: 'av_c4_abara', number: '(555) 471-0100', label: "Cutter's Gap PD" },
    { id: 'c4unknown', name: '(555) 471-3388', avatar: 'av_unknown', number: '(555) 471-3388' },
  ],

  threads: [
    {
      id: 'th_lina', contact: 'lina', messages: [
        { from: 'me', text: 'did you take the propane buddy from my shop??', t: '2026-03-07T18:12', clue: 'heater_borrowed' },
        { from: 'them', text: "maybe. kenzie's garage is an ICEBOX. I'll bring it back I swear", t: '2026-03-07T18:30', clue: 'heater_borrowed' },
        { from: 'me', text: "it's not for indoors lina. outside or a cracked door ONLY", t: '2026-03-07T18:31' },
        { from: 'them', text: "at kenzie's!! 🧦 night night", t: '2026-03-07T20:40' },
        { from: 'them', text: "rafi don't be mad. we're not at kenzie's. we're at the aerie. we rode last chair up and hid in the bathrooms till patrol left. zoe's ankle is really bad and it's SO dark. please", t: '2026-03-07T22:51', clue: 'lina_party', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: 'are you KIDDING me lina. holy shit. how many of you', t: '2026-03-07T22:52', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: '6', t: '2026-03-07T22:53', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: "heater OFF. put it outside on the deck. everyone to the lift shack up top. I'm starting Eagle. 15 min", t: '2026-03-07T22:58', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: "heater's off and it's outside on the deck I promise. we're at the shack. zoe's crying", t: '2026-03-07T23:04', clue: 'heater_out', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: 'never again. NEVER. mama never hears about this', t: '2026-03-07T23:52', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: 'RAFI. my bag. I left it on the deck table. my school ID is in it 😭😭😭', t: '2026-03-08T01:05', clue: 'lina_bag', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: 'going up on the shop sled. stay put. do not tell kenzie', t: '2026-03-08T01:07', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: 'got it. go to sleep 🐿️', t: '2026-03-08T01:34', photo: 'c4_ph_deck', clue: 'bag_photo', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: 'ily ily ily', t: '2026-03-08T01:36', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: 'rafi the aerie is on the news. it BURNED. was it the heater?? was it us??', t: '2026-03-08T07:14', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: 'where are you. mama is crying. the police called the house', t: '2026-03-08T09:30' },
        { from: 'them', text: 'they say you CONFESSED. why would you say that. RAFI.', t: '2026-03-09T16:02' },
        { from: 'them', text: "I'm going to tell them. I don't care what you made me promise.", t: '2026-03-12T22:10' },
      ],
    },
    {
      id: 'th_mama', contact: 'mama', messages: [
        { from: 'them', text: 'Habibi, Sunday is one year. Sunrise at tower nine, yes? I will bring the good thermos.', t: '2026-03-01T19:02' },
        { from: 'me', text: "sunrise. I'll bring the sled down for you so you don't have to hike", t: '2026-03-01T19:20' },
        { from: 'them', text: 'Your father would laugh. His wife on a snowmobile.', t: '2026-03-01T19:21' },
        { from: 'them', text: 'Rafi where are you. The police called. They say you walked in by yourself.', t: '2026-03-08T09:10' },
        { from: 'them', text: 'Look. LOOK. The kitchen. Not the deck. You said the deck. Tell them!', t: '2026-03-11T18:30', photo: 'c4_ph_newspaper', clue: 'fire_origin' },
        { from: 'them', text: 'I gave your phone to the woman from the cold case office. Forgive me, habibi.', t: '2026-03-14T17:30' },
      ],
    },
    {
      id: 'th_kessler', contact: 'kessler', messages: [
        { from: 'them', text: "You see my email? Heritage board says the Aerie is untouchable. Sixty years of mice, a chimney and a men's room that's seen more action than a Vegas motel, and it's 'historic'.", t: '2026-02-18T17:05' },
        { from: 'me', text: 'people love that hut, Bram', t: '2026-02-18T17:20' },
        { from: 'them', text: "People don't pay for it. Altura does.", t: '2026-02-18T17:21', clue: 'heritage_denied' },
        { from: 'them', text: "Their guy wants 'curated après experiences' up top. Forty-dollar cocktails and a hot tub full of crypto dentists. That's the future, Rafi.", t: '2026-02-18T17:24' },
        { from: 'me', text: 'sounds like a hot tub you would need a tetanus shot for', t: '2026-02-18T17:26' },
        { from: 'them', text: "Eagle gearbox done tonight? Altura's walking the summit Thursday.", t: '2026-03-07T15:40' },
        { from: 'me', text: 'done by midnight. need your ok for a slow test run after close', t: '2026-03-07T15:44' },
        { from: 'them', text: 'Monday. Not tonight.', t: '2026-03-07T15:58' },
        { from: 'them', text: 'FIRE AT THE AERIE. I can see it from my deck. FD is on the way. Nobody goes up the hill. NOBODY.', t: '2026-03-08T01:55' },
        { from: 'them', text: "Saw the lift log. Call me before you talk to anyone. I'm on your side, son.", t: '2026-03-08T07:35' },
      ],
    },
    {
      id: 'th_mags', contact: 'mags', messages: [
        { from: 'them', text: "cat 3's hydraulics are whining again. louder than my ex when the hot water ran out. if I die on Upper Eagle tell my kids I loved em and tell him he still owes me $300", t: '2026-03-07T21:15' },
        { from: 'me', text: "I'll look at it at 2. don't die", t: '2026-03-07T21:18' },
        { from: 'them', text: "no promises. also the new liftie asked if I wanted to 'ride his chair after close.' he's 22. I own thermal underwear older than him", t: '2026-03-07T21:20' },
        { from: 'me', text: 'report him to HR. oh wait HR is bram. godspeed', t: '2026-03-07T21:21' },
        { from: 'them', text: "bram would give him a raise for the line. that man's whole personality is a Viagra commercial with a snowmobile in it", t: '2026-03-07T21:22' },
        { from: 'them', text: 'you ok? saw your sled light up top around 1:30. thought you were home', t: '2026-03-08T02:20' },
        { from: 'them', text: "they're saying you did it. bullshit. I don't believe it for one second", t: '2026-03-10T12:40' },
      ],
    },
    {
      id: 'th_dag', contact: 'dag', messages: [
        { from: 'them', text: 'Patrol sweep done 16:20. Eagle clear, Aerie locked up.', t: '2026-03-07T16:30' },
        { from: 'me', text: 'copy. gearbox all night, shop radio on 4. me and a gearbox, saturday night. living the dream', t: '2026-03-07T16:31' },
        { from: 'them', text: "FD says total loss. Bram's asking Ops for the overnight lift log.", t: '2026-03-08T06:50' },
        { from: 'them', text: "Rafi, your key's on that log. Don't do anything stupid before you talk to me. Stupider than usual, I mean.", t: '2026-03-08T07:05' },
      ],
    },
    {
      id: 'th_wes', contact: 'wes', messages: [
        { from: 'them', text: 'Fired. Nine years on the cats and that rich prick fires me by EMAIL. Didn\'t even have the balls to do it to my face.', t: '2026-02-02T09:12' },
        { from: 'me', text: "man I'm sorry. what happened", t: '2026-02-02T09:30' },
        { from: 'them', text: 'I did his insurance paperwork. Asked one question I wasn\'t supposed to.', t: '2026-02-02T09:41' },
        { from: 'them', text: 'That hut and that man deserve each other. Hope it burns with him in it.', t: '2026-02-20T23:48', clue: 'wes_threat' },
        { from: 'them', text: "also I'm drunk. five bourbons and a breakup playlist. still mean it", t: '2026-02-20T23:50' },
        { from: 'them', text: "also my tinder date tonight asked what I do and I said 'unemployed snow farmer' and she left before the nachos came. NACHOS rafi", t: '2026-02-20T23:53' },
        { from: 'me', text: 'go to bed wes. drink water. delete tinder', t: '2026-02-21T07:40' },
        { from: 'them', text: 'TOLD you. Follow the money, man. Ask him why he took the Aerie from $900k of insurance to $4.2 million in January. Ask him.', t: '2026-03-08T10:00', clue: 'insurance_tip' },
        { from: 'them', text: "And before your cop friends ask, I was murdering Total Eclipse of the Heart at Rooster's till 2. Ask anyone. Ask the video. Ask the bachelorette party I tried to hit on — they were VERY clear about not being interested.", t: '2026-03-09T11:15' },
      ],
    },
  ],

  photos: [
    { id: 'hp_c4_mags2', art: 'hp_c4_mags2', t: '2026-01-31T21:30', place: 'Silverpine — staff hot tub', orientation: 'portrait', caption: 'Sent by Mags Okafor. Tiny bikini in the staff hot tub, snow falling, a beer can on her head like a crown, a snowcat parked behind her.', hidden: true },
    { id: 'hp_c4_wes', art: 'hp_c4_wes', t: '2026-03-07T22:40', place: "Rooster's — karaoke stage", orientation: 'portrait', caption: 'Sent by Wes Tolliver. Shirtless on the karaoke stage in a cowboy hat and ski boots, mic in hand, a bachelorette party screaming behind him.', hidden: true },
    { id: 'hp_c4_mags', art: 'hp_c4_mags', t: '2026-02-21T23:58', place: 'Silverpine staff housing — bathroom mirror', orientation: 'portrait', caption: "Sent by Mags Okafor at 23:58, then 'WRONG CHAT. DELETE THAT.' Lace lingerie mirror selfie, ski goggles still on her head, a moose head mounted behind her.", hidden: true },
    { id: 'hp_c4_kessler', art: 'hp_c4_kessler', t: '2026-02-14T22:40', place: 'Silverpine — summit hot tub', orientation: 'portrait', caption: "Sent to all staff by Bram Kessler. Hot tub, aviators at night, champagne flute, chest hair, '#alphalife #valentines'.", hidden: true },
    { id: 'c4_ph_dad', art: 'c4_ph_dad', t: '2019-02-10T11:00', place: 'Eagle lift', orientation: 'portrait', caption: 'Rafi at twenty and his father on an Eagle chair, frosted beards, matching Silverpine Lift Ops jackets. His father is pointing up the line.' },
    { id: 'c4_ph_tower9', art: 'c4_ph_tower9', t: '2026-03-01T06:58', place: 'Ptarmigan Bowl', orientation: 'landscape', caption: 'Sunrise below an Eagle lift tower. A wide untouched bowl, a small cairn with a faded Lift Ops beanie on top, a trail sign at the edge.' },
    { id: 'c4_ph_shop', art: 'c4_ph_shop', t: '2026-03-07T18:10', place: 'Silverpine lift shop', orientation: 'landscape', caption: "Rafi's lift shop. A gearbox in pieces on the bench; a labelled shelf with a gap and a yellow sticky note.", clue: 'heater_borrowed' },
    { id: 'c4_ph_aerie', art: 'c4_ph_aerie', t: '2026-01-24T12:40', place: 'The Aerie', orientation: 'landscape', caption: "The Aerie on a bluebird day: a steep A-frame lodge of dark timber, stone chimney, a wide south deck with picnic tables. A carved sign: THE AERIE · EST. 1961. Round the north side, a small kitchen service door by the cat track." },
    { id: 'c4_ph_sled', art: 'c4_ph_sled', t: '2026-01-10T15:20', place: 'Silverpine base', orientation: 'landscape', caption: "From Bram Kessler's Glimpse. A new matte-black snowmobile; Kessler in a black shell jacket beside it, thumbs up.", clue: 'sled_assign' },
    { id: 'c4_ph_alldown', art: 'c4_ph_alldown', t: '2026-03-07T23:33', place: 'Eagle bottom terminal', orientation: 'landscape', caption: "Recovered. The Eagle bottom bullwheel at night under work lights; a group of teenagers by the lift shack. Deleted Mar 8, 07:50.", clue: 'all_down', deletedUntil: 'recovered:photos' },
    { id: 'c4_ph_deck', art: 'c4_ph_deck', t: '2026-03-08T01:34', place: 'The Aerie', orientation: 'portrait', caption: "Recovered. Flash photo at night on the Aerie's south deck: a purple backpack and a small propane heater on a picnic table, the lodge window behind. Deleted Mar 8, 07:50.", clue: 'bag_photo', deletedUntil: 'recovered:photos' },
    { id: 'c4_ph_burn', art: 'c4_ph_burn', t: '2026-03-08T07:20', place: 'Silverpine base', orientation: 'landscape', caption: 'Dawn from the base area. Grey smoke rising from the summit where the Aerie stood. The Eagle chairs hang still.' },
    { id: 'c4_ph_newspaper', art: 'c4_ph_newspaper', t: '2026-03-11T18:29', place: "Mama's kitchen", orientation: 'portrait', caption: "Sent by Mama. The front page of The Cutter's Gap Courier on her kitchen table, next to a teacup.", clue: 'fire_origin' },
    { id: 'c4_ph_karaoke', art: 'c4_ph_karaoke', t: '2026-03-08T01:41', place: "Rooster's Bar", orientation: 'portrait', caption: "From Wes Tolliver's Glimpse. Wes on a tiny karaoke stage, eyes shut, mid-howl.", clue: 'wes_karaoke' },
    { id: 'c4_ph_lina', art: 'c4_ph_lina', t: '2026-02-21T13:10', place: 'Silverpine', orientation: 'portrait', caption: 'Lina, 16, upside-down in a snowbank, one ski still on, laughing so hard she can\'t get up.' },
  ],

  notes: [
    {
      id: 'n_ifask', title: 'if they ask', t: '2026-03-08T07:56', lock: { password: 'ptarmigan', hint: 'where we left Baba. one word, spelled like the trail map.' }, clue: 'false_story',
      body: "IF THEY ASK (say it the same every time):\n- I ran Eagle after hours to test the gearbox. Alone.\n- I rode up, warmed up on the deck, left the shop heater running. My heater. My fault.\n- Nobody else was there. Nobody.\n\nWHAT HAPPENED (delete this):\n22:51 Lina texts from the Aerie. 6 kids. Zoe's ankle.\n23:12 started Eagle. 23:31 all six off at the bottom. Counted twice. Baba's rule.\nShe swears the heater was off and outside.\n01:31 back up on SM-4 for her bag. Deck only. Didn't go in. The Aerie was dark.\n01:55 Bram: FIRE.\n\nIf it was the heater it was MY heater. She's 16. She's not going to court for my heater.\nBaba would have done the same.",
    },
    { id: 'n_ops', title: 'Ops codes', t: '2026-02-03T08:15', clue: 'badge_sheet', body: "KEYS / BADGES\n0001 — B. Kessler (MASTER — every door on the hill)\n0114 — me\n0220 — Dag (patrol)\n0307 — Mags\n0412 — Wes — DEACTIVATED 02/02\n\nSLEDS\nSM-4 — lift shop (me)\nSP-01 — Bram's. Nobody touches it.\nSP-02 / SP-03 — patrol\n\nEAGLE: base terminal / top terminal / 14 towers\nradio ch 4 = shop" },
    { id: 'n_baba', title: 'things Baba said on the chair', t: '2025-03-20T22:40', body: "\"The mountain doesn't care about you. That's why you have to.\"\n\"Count the chairs coming down. Always count.\"\n\"Never run a lift you wouldn't ride.\"\n\"Your sister is braver than you. Look after her anyway.\"" },
    { id: 'n_gearbox', title: 'Eagle gearbox', t: '2026-03-06T23:10', body: "Main seal weeping again.\nMar 7 night: pull cover, replace seal, torque to spec.\nNeed slow test run after close — NEED BRAM'S OK.\nParts: NAPA order #55821 (arrived)." },
  ],

  mail: [
    { id: 'm_snow', from: 'Silverpine Ops', fromAddr: 'ops@silverpine.example', to: 'Lift Maintenance', subject: 'Snow report — Sat Mar 14', t: '2026-03-14T06:00', folder: 'inbox', body: 'Base area (9,148 ft): 14 cm new, −8 °C, wind light.\nMid-mountain: 19 cm new.\nEagle: CLOSED — summit structure fire (investigation).\nLynx: OPEN.\n\nHave a safe day out there.' },
    { id: 'm_heritage', from: 'Bram Kessler', fromAddr: 'bram@silverpine.example', to: 'All Staff', subject: 'The Aerie', t: '2026-02-18T16:50', folder: 'inbox', clue: 'heritage_denied', body: "Team,\n\nThe county heritage board has refused our application to demolish the Aerie. It is now a 'protected historic structure'. We cannot remove it, rebuild it, or move it.\n\nAs most of you know, Altura's offer for Silverpine depends on a new gondola terminal on the summit. On that site. By June.\n\nI'll handle it. Keep your heads down and your lifts spinning.\n\nBram" },
    { id: 'm_altura', from: 'Bram Kessler', fromAddr: 'bram@silverpine.example', to: 'All Staff', subject: 'Altura site walk — Thursday Mar 12', t: '2026-03-03T09:00', folder: 'inbox', clue: 'altura_deal', body: "Altura's executive team is walking the summit next Thursday at 10:00. Eagle runs from 09:30.\n\nThey will look at the Aerie site. Best behavior, clean uniforms, and nobody says the word 'heritage'.\n\nThis deal is the future of this mountain.\n\nB.K." },
    { id: 'm_allstaff', from: 'Bram Kessler', fromAddr: 'bram@silverpine.example', to: 'All Staff', subject: 'Last night', t: '2026-03-08T06:30', folder: 'inbox', clue: 'kessler_allstaff', body: "Team,\n\nAs you've heard, we lost the Aerie overnight.\n\nOps tells me the Eagle lift was started without authorization at 23:12 using maintenance key 0114. A few hours later the Aerie burned.\n\nI'm not jumping to conclusions. But whoever turned that key should come to me FIRST, before the police. We take care of our own on this mountain.\n\nBram" },
    { id: 'm_liftlog', from: 'Silverpine Ops — Alerts', fromAddr: 'alerts@silverpine.example', to: 'Lift Maintenance (on call)', subject: 'EAGLE — unscheduled operation', t: '2026-03-07T23:31', folder: 'trash', clue: 'lift_log', body: "LIFT: EAGLE (fixed-grip quad)\nEVENT: UNSCHEDULED START\nSTART: 23:12  STOP: 23:31  (19 min, low speed)\nKEY: 0114\nDIRECTION: downhill load (top station loading)\nCHAIRS LOADED AT TOP: 3\nAuto-alert to on-call maintenance." },
    { id: 'm_door', from: 'Silverpine Ops — Alerts', fromAddr: 'alerts@silverpine.example', to: 'Lift Maintenance (on call)', subject: 'AERIE — door & panel events 01:00–02:00', t: '2026-03-08T01:50', folder: 'trash', clue: 'door_log', body: "BUILDING: AERIE (summit)\n\n01:24  KITCHEN SERVICE DOOR — OPEN — BADGE 0001\n01:47  KITCHEN SERVICE DOOR — OPEN — BADGE 0001\n01:49  FIRE PANEL — SMOKE — ZONE 3 (KITCHEN STOREROOM)\n01:50  FIRE PANEL — COMMUNICATION LOST\n\nNo events on MAIN DOOR or DECK DOOR.\nAuto-alert to on-call maintenance." },
    { id: 'm_gearbox', from: 'Rafi Haddad', fromAddr: 'rhaddad@silverpine.example', to: 'Bram Kessler', subject: 'Eagle seal — test run?', t: '2026-03-06T23:15', folder: 'sent', body: "Bram,\n\nSeal goes in tomorrow night. I'd like to do a slow empty test run after close so it's solid before Altura rides it Thursday. 10 min, low speed.\n\nOK?\n\nRafi" },
  ],

  calls: [
    { contact: 'mama', t: '2026-03-14T17:20', dir: 'missed' },
    { contact: 'lina', t: '2026-03-12T22:05', dir: 'missed' },
    { contact: 'wes', t: '2026-03-08T10:02', dir: 'missed' },
    { contact: 'mama', t: '2026-03-08T09:05', dir: 'missed' },
    { contact: 'kessler', t: '2026-03-08T07:40', dir: 'missed' },
    { contact: 'abara', t: '2026-03-08T07:11', dir: 'missed' },
    { contact: 'lina', t: '2026-03-08T01:06', dir: 'in', duration: '0:48' },
    { contact: 'lina', t: '2026-03-07T22:54', dir: 'out', duration: '2:10' },
    { contact: 'dag', t: '2026-03-07T16:32', dir: 'out', duration: '1:02' },
    { contact: 'mama', t: '2026-03-02T18:30', dir: 'missed' },
  ],

  voicemails: [
    { id: 'vm_mama', contact: 'mama', t: '2026-03-02T18:31', duration: '0:29', voice: { pitch: 0.95, rate: 0.88, female: true }, transcript: "Rafi, it's Mama. Sunday is one year since we carried your father up under tower nine. I keep thinking of the view from there, he always said it was the best seat on the mountain. Bring the good thermos. And bring your sister, she pretends she doesn't care. Okay. Kisses." },
    { id: 'vm_abara', contact: 'abara', t: '2026-03-08T07:12', duration: '0:18', voice: { pitch: 1.0, rate: 1.0, female: true }, transcript: "Mr. Haddad, this is Detective Simone Abara, Cutter's Gap PD. Your maintenance key started the Eagle lift last night after closing. I'd like to hear about that from you. You can come in voluntarily this morning. Or I can come get you, and trust me, neither of us wants that conversation before coffee." },
    { id: 'vm_kessler', contact: 'kessler', t: '2026-03-08T07:41', duration: '0:34', voice: { pitch: 0.75, rate: 1.05, female: false }, clue: 'kessler_vm', deletedUntil: 'recovered:voice', transcript: "Rafi, it's Bram. Listen to me. Whatever happened up there, it was an accident. A heater, kids, whatever. You walk in and say it was you — first offense, it's a misdemeanor, I'll pay for the lawyer and you'll have your job back by summer. You don't want them looking at whoever's bag you went back up for. Think about your mother. Call me." },
    { id: 'vm_lina', contact: 'lina', t: '2026-03-10T21:40', duration: '0:26', voice: { pitch: 1.3, rate: 1.12, female: true }, clue: 'lina_admits', transcript: "They won't let me see you. Rafi, it was US. We were up there, it was my party, I took your heater. You brought us down. You counted. I'm going to tell them, I don't care what you made me promise. You're not doing this for me." },
  ],

  map: {
    art: 'map_c4',
    places: [
      { id: 'base', name: 'Silverpine base & lift shop', x: 0.30, y: 0.80 },
      { id: 'aerie', name: 'The Aerie (summit)', x: 0.62, y: 0.12 },
      { id: 'tower9', name: 'Eagle tower 9 · Ptarmigan Bowl', x: 0.50, y: 0.38 },
      { id: 'kenzie', name: "Kenzie Park's house", x: 0.12, y: 0.66 },
      { id: 'roosters', name: "Rooster's Bar", x: 0.18, y: 0.90 },
      { id: 'home', name: 'Haddad apt.', x: 0.08, y: 0.86 },
      { id: 'ridge', name: 'Kessler house — Ridge Rd', x: 0.86, y: 0.58 },
      { id: 'pd', name: "Cutter's Gap PD", x: 0.24, y: 0.95 },
    ],
    stops: [
      { t: '2026-03-01T06:40', place: 'tower9', detail: 'Sunrise — 1h 05m' },
      { t: '2026-03-07T16:02', place: 'base', detail: 'Shift start — lift shop' },
      { t: '2026-03-07T23:10', place: 'base', detail: 'Eagle bottom terminal — 24 min' },
      { t: '2026-03-07T23:47', place: 'kenzie', detail: '4 min' },
      { t: '2026-03-08T00:15', place: 'base', detail: 'Lift shop — 1h 07m' },
      { t: '2026-03-08T01:31', place: 'aerie', detail: 'Arrived by snowmobile up the cat track — south deck — 5 min' },
      { t: '2026-03-08T01:44', place: 'base', detail: 'Lift shop — 28 min' },
      { t: '2026-03-08T02:15', place: 'home', detail: 'Home' },
      { t: '2026-03-08T07:58', place: 'home', detail: 'Device stationary — left at home until Mar 14' },
    ],
  },

  browser: [
    { t: '2026-03-08T07:44', title: 'permanently delete photos iphone recently deleted', url: 'search?q=permanently+delete+photos+recently+deleted', clue: 'rafi_searches', deletedUntil: 'recovered:history' },
    { t: '2026-03-08T07:36', title: 'confess to misdemeanor first offense what happens', url: 'search?q=confess+misdemeanor+first+offense', clue: 'rafi_searches', deletedUntil: 'recovered:history' },
    { t: '2026-03-08T07:31', title: 'can a 16 year old be charged trespassing fire colorado', url: 'search?q=16+year+old+charged+trespassing+fire', clue: 'rafi_searches', deletedUntil: 'recovered:history' },
    { t: '2026-03-08T02:31', title: 'silverpine aerie fire', url: 'search?q=silverpine+aerie+fire' },
    { t: '2026-03-07T18:15', title: 'propane buddy heater indoors safe?', url: 'search?q=propane+buddy+heater+indoors+safe' },
    { t: '2026-03-03T21:04', title: 'Altura Resorts to acquire Silverpine — summit gondola planned', url: 'skibiz.example/altura-silverpine', clue: 'altura_deal' },
    { t: '2026-02-18T20:40', title: 'county heritage board — the Aerie, Silverpine (protected)', url: 'county.example.gov/heritage/aerie' },
    { t: '2026-02-11T22:10', title: 'snowcat hydraulic pump whine causes', url: 'search?q=snowcat+hydraulic+pump+whine' },
  ],

  glimpse: [
    { id: 'g_baba', author: 'me', photo: 'c4_ph_dad', caption: 'one year tomorrow, Baba. best seat on the mountain. sunrise at tower 9 🕯️', t: '2026-03-07T19:00', likes: 212, comments: [{ author: 'mama', text: '❤️❤️❤️' }, { author: 'lina', text: "he'd hate this caption. too soft" }, { author: 'mags', text: 'miss that man' }] },
    { id: 'g_sled', author: 'kessler', photo: 'c4_ph_sled', caption: 'New boss sled 😎 SP-01. Try and keep up, kids. #blessed #earnedit #alphalife', t: '2026-01-10T15:30', likes: 88, comments: [{ author: 'dag', text: 'patrol gets the 2009s, boss gets this' }, { author: 'wes', text: 'nice. who paid for it' }, { author: 'mags', text: 'midlife crisis with a pull cord. at least it\'s not another ponytail' }], clue: 'sled_assign' },
    { id: 'g_karaoke', author: 'wes', photo: 'c4_ph_karaoke', caption: "TOTAL ECLIPSE OF THE HEART 🎤 sorry Rooster's. sorry everyone", t: '2026-03-08T01:43', likes: 41, comments: [{ author: 'mags', text: 'I can hear this photo' }, { author: 'dag', text: 'Rooster\'s should press charges' }, { author: 'wes', text: 'turn around bright eyes 😭🎤' }], clue: 'wes_karaoke' },
    { id: 'g_burn', author: 'mags', photo: 'c4_ph_burn', caption: 'sixty years. 💔 #theaerie', t: '2026-03-08T07:30', likes: 503, comments: [{ author: 'dag', text: '🙏' }, { author: 'kessler', text: 'A sad day for Silverpine. We will rebuild. 🙏 #SilverpineStrong' }, { author: 'wes', text: 'bet you will, Bram' }] },
  ],

  bank: {
    account: 'Rocky Mountain CU ••5180',
    balance: 642.18,
    tx: [
      { t: '2026-03-07T21:20', desc: 'SHELL — CUTTERS GAP', amount: -38.40 },
      { t: '2026-03-07T12:10', desc: "CUTTER'S GAP FLORIST", amount: -28.00 },
      { t: '2026-03-06T00:00', desc: 'SILVERPINE MTN — PAYROLL', amount: 1640.00 },
      { t: '2026-03-02T19:00', desc: 'VENMO — LINA HADDAD "ski wax lol"', amount: -20.00 },
      { t: '2026-03-01T09:00', desc: 'TRANSFER — S. HADDAD "rent help"', amount: -400.00 },
      { t: '2026-02-26T14:30', desc: 'NAPA AUTO PARTS — ORDER 55821', amount: -61.75 },
      { t: '2026-02-20T22:15', desc: "ROOSTER'S BAR", amount: -31.00 },
    ],
  },

  calendar: [
    { id: 'c4_c_baba', t: '2026-03-08T06:30', title: 'Baba — 1 year 🕯️', detail: 'tower 9, sunrise. sled for Mama. thermos.' },
    { id: 'c4_c_shift', t: '2026-03-07T16:00', title: 'Eagle gearbox — night shift', detail: 'seal + torque. test run needs Bram ok' },
    { id: 'c4_c_lina', t: '2026-03-07T20:00', title: "Lina @ Kenzie's", detail: 'sleepover. (she says)' },
    { id: 'c4_c_altura', t: '2026-03-12T10:00', title: 'Altura site walk — summit', detail: "Bram: 'best behavior'. Eagle from 09:30", clue: 'altura_deal' },
    { id: 'c4_c_wes', t: '2026-02-02T17:00', title: "Wes's last day :(", detail: "beers at Rooster's" },
  ],

  wifi: [
    { name: 'HaddadHome', lastJoined: '2026-03-08T07:58' },
    { name: 'SilverpineOps', lastJoined: '2026-03-08T01:44' },
    { name: 'Aerie_Staff', lastJoined: '2026-03-08T01:32' },
    { name: 'ParkHouse', lastJoined: '2026-03-07T23:48' },
    { name: 'Roosters_Guest', lastJoined: '2026-02-20T21:05' },
  ],

  trace: [
    { id: 'photos', label: 'Photos — Recently Deleted', detail: 'Carve image fragments the aborted reset left in unallocated flash.', needs: ['unlocked'], durationMs: 5000 },
    { id: 'msgfrag', label: 'Messages — Orphaned Fragments', detail: 'Rebuild deleted SMS records from the database write-ahead log.', needs: ['pinned:lift_log'], needsHint: 'Need a lead first: pin proof that someone ran the Eagle lift after closing.', durationMs: 6500 },
    { id: 'voice', label: 'Voicemail — Carrier Cache', detail: 'Pull deleted voicemail audio from the carrier sync cache.', needs: ['pinned:kessler_allstaff'], needsHint: "Need a lead first: pin what the owner told all staff the morning after.", durationMs: 6000 },
    { id: 'history', label: 'Browser — History Journal', detail: 'Recover cleared Safari history from the WebKit journal.', needs: ['pinned:bag_photo'], needsHint: 'Need a lead first: pin the photo Rafi took on the Aerie deck.', durationMs: 5500 },
  ],

  clues: [
    { id: 'lift_log', title: 'Eagle ran 23:12–23:31', text: 'Ops alert: Eagle started after hours with key 0114 (Rafi), 19 minutes, loading downhill from the top station.', kind: 'document' },
    { id: 'kessler_allstaff', title: "Kessler: 'come to me FIRST'", text: "The owner's 06:30 email names key 0114 and tells whoever turned it to come to him before the police.", kind: 'person', art: 'av_c4_kessler' },
    { id: 'kessler_vm', title: "'whoever's bag you went back for'", text: "Deleted voicemail, 07:41: Kessler urges Rafi to confess — 'first offense, it's a misdemeanor' — and mentions 'whoever's bag you went back up for'.", kind: 'event', art: 'av_c4_kessler' },
    { id: 'lina_party', title: "Lina: 'we're at the aerie'", text: 'Deleted text, 22:51: Lina and five friends rode last chair up and hid in the closed Aerie. Zoe hurt her ankle.', kind: 'event', art: 'av_c4_lina' },
    { id: 'heater_out', title: 'Heater off, outside', text: "Lina, 23:04: \"heater's off and it's outside on the deck I promise.\"", kind: 'object' },
    { id: 'heater_borrowed', title: 'The borrowed heater', text: "Empty shelf in Rafi's shop, labelled 'PROPANE HEATER — SHOP'. Sticky note: 'borrowed — L ♥'.", kind: 'object', art: 'c4_ph_shop' },
    { id: 'lina_bag', title: "Lina's bag, 01:05", text: 'Lina left her bag, with her school ID, on the Aerie deck. Rafi went back up for it on the shop sled.', kind: 'event' },
    { id: 'bag_photo', title: 'The deck photo, 01:34', text: 'Bag and heater on the deck (dial at OFF, frosted). Behind them in the dark window: a headlamp, a figure with a red jerrycan. A black sled marked "SP-0".', kind: 'object', art: 'c4_ph_deck' },
    { id: 'all_down', title: 'Six down at 23:33', text: 'Recovered photo: all six teenagers at the bottom of Eagle, lift clock 23:33.', kind: 'event', art: 'c4_ph_alldown' },
    { id: 'door_log', title: 'Kitchen door: badge 0001', text: 'Aerie kitchen service door opened by badge 0001 at 01:24 and 01:47. Smoke in the kitchen storeroom at 01:49. Deck and main doors never opened.', kind: 'document' },
    { id: 'badge_sheet', title: 'Badge 0001 = Kessler', text: "Rafi's Ops note: 0001 is Bram Kessler's master badge. SP-01 is Bram's sled — nobody else touches it.", kind: 'document' },
    { id: 'sled_witness', title: 'SP-01 on the cat track', text: 'The unknown groomer saw SP-01 go up the cat track at 01:08 and come down dark at 01:52.', kind: 'event', art: 'av_unknown' },
    { id: 'sled_assign', title: "SP-01: the boss's sled", text: "Kessler's own post: a black sled marked SP-01. 'New boss sled.'", kind: 'object', art: 'c4_ph_sled' },
    { id: 'fire_origin', title: 'Origin: kitchen storeroom', text: "Courier front page: the fire marshal says the blaze began in the kitchen storeroom, accelerant suspected.", kind: 'document', art: 'c4_ph_newspaper' },
    { id: 'false_story', title: "Rafi's script", text: "Rafi's locked note: the story he rehearsed ('my heater, my fault, nobody else there') — and the truth underneath it.", kind: 'document' },
    { id: 'rafi_searches', title: 'Searches before he confessed', text: "Deleted, 07:31–07:44: 'can a 16 year old be charged', 'confess to misdemeanor first offense', 'permanently delete photos'.", kind: 'event' },
    { id: 'lina_admits', title: "Lina: 'it was US'", text: "Lina's voicemail: 'it was US… it was my party, I took your heater… You're not doing this for me.'", kind: 'person', art: 'av_c4_lina' },
    { id: 'wes_threat', title: "Wes: 'hope it burns'", text: 'The fired groomer: "That hut and that man deserve each other. Hope it burns with him in it."', kind: 'person', art: 'av_c4_wes' },
    { id: 'wes_karaoke', title: "Wes at Rooster's, 1:41", text: "Wes on the karaoke stage at Rooster's Bar, under a neon bar clock reading 1:41.", kind: 'place', art: 'c4_ph_karaoke' },
    { id: 'insurance_tip', title: '$900k → $4.2M', text: 'Wes did the paperwork: in January Kessler raised the Aerie\'s insurance from $900,000 to $4.2 million.', kind: 'document' },
    { id: 'heritage_denied', title: 'Heritage board: no', text: 'The Aerie was protected — it could not be demolished. "People don\'t pay for it. Altura does."', kind: 'document' },
    { id: 'altura_deal', title: 'Altura needs the summit', text: "Altura's purchase of Silverpine depended on a gondola terminal on the Aerie's site by June.", kind: 'document' },
  ],

  questions: [
    {
      id: 'q_confess', prompt: 'Why did Rafi Haddad confess?',
      options: [
        { id: 'guilty', label: 'He set the fire and felt guilty' },
        { id: 'paid', label: 'Kessler paid him to take the fall' },
        { id: 'protect', label: "To protect Lina — he thought her party caused it" },
        { id: 'drunk', label: "He was drunk and doesn't remember" },
      ],
      answer: 'protect', evidence: ['false_story', 'rafi_searches', 'lina_party', 'lina_admits', 'lina_bag'],
      explain: "He searched whether a 16-year-old could be charged, deleted everything that put Lina at the Aerie, and rehearsed 'my heater, my fault' in a locked note.",
    },
    {
      id: 'q_party', prompt: "Did Lina's party start the fire?",
      options: [
        { id: 'heater', label: 'Yes — the borrowed propane heater' },
        { id: 'candles', label: 'Yes — candles left burning inside' },
        { id: 'no', label: 'No — they were off the mountain by 23:31 and the heater was off, outside' },
        { id: 'never', label: 'No — they were never on the mountain' },
      ],
      answer: 'no', evidence: ['lift_log', 'all_down', 'heater_out', 'bag_photo', 'fire_origin'],
      explain: 'All six were at the bottom by 23:33. At 01:34 the heater sat on the deck, dial OFF, frosted. The fire started at 01:49 in the kitchen storeroom, with accelerant.',
    },
    {
      id: 'q_who', prompt: 'Who set the fire?',
      options: [
        { id: 'rafi', label: 'Rafi Haddad', art: 'av_c4_rafi' },
        { id: 'wes', label: 'Wes Tolliver', art: 'av_c4_wes' },
        { id: 'kessler', label: 'Bram Kessler', art: 'av_c4_kessler' },
        { id: 'dag', label: 'Dag Lindqvist', art: 'av_c4_dag' },
        { id: 'kids', label: "Lina's friends" },
      ],
      answer: 'kessler', evidence: ['door_log', 'badge_sheet', 'sled_witness', 'sled_assign', 'bag_photo', 'kessler_vm'],
      explain: "Badge 0001 — Kessler's master — opened the kitchen door at 01:24 and 01:47. His sled SP-01 went up at 01:08. He's the figure in Rafi's deck photo.",
    },
    {
      id: 'q_why', prompt: 'Why burn the Aerie?',
      options: [
        { id: 'revenge', label: 'Revenge on the Haddad family' },
        { id: 'sale', label: 'To clear the protected lodge for the Altura sale — and collect $4.2M' },
        { id: 'cover', label: "To cover up the teenagers' party" },
        { id: 'accident', label: 'It was an electrical accident' },
      ],
      answer: 'sale', evidence: ['heritage_denied', 'altura_deal', 'insurance_tip'],
      explain: "The heritage board said the Aerie couldn't be torn down; Altura needed the site by June; and the insurance had just been quadrupled.",
    },
    {
      id: 'q_wes', prompt: 'Where was Wes Tolliver when the fire started?',
      options: [
        { id: 'aerie', label: 'At the Aerie' },
        { id: 'karaoke', label: "Singing karaoke at Rooster's Bar" },
        { id: 'home', label: 'Asleep at home' },
        { id: 'cat', label: 'Driving a snowcat on Upper Eagle' },
      ],
      answer: 'karaoke', evidence: ['wes_karaoke'],
      explain: "His own post puts him on stage at Rooster's under a 1:41 bar clock. His badge was deactivated in February anyway.",
    },
    {
      id: 'q_steer', prompt: 'Who pushed Rafi into confessing — and gave himself away doing it?',
      options: [
        { id: 'abara', label: 'Detective Abara', art: 'av_c4_abara' },
        { id: 'kessler', label: 'Bram Kessler', art: 'av_c4_kessler' },
        { id: 'dag', label: 'Dag Lindqvist', art: 'av_c4_dag' },
        { id: 'mama', label: 'Mama', art: 'av_c4_mama' },
      ],
      answer: 'kessler', evidence: ['kessler_vm', 'kessler_allstaff'],
      explain: "Kessler promised a lawyer and a misdemeanor — and mentioned the bag Rafi went back for. Only someone at the Aerie at 01:34 could know that.",
    },
  ],

  events: [
    { id: 'e4_unk1', kind: 'text', when: ['unlocked'], minPins: 3, delayMs: 4500, thread: 'th_c4unknown', contact: 'c4unknown', text: "Is this Rafi Haddad's phone? Is somebody finally reading it?" },
    { id: 'e4_unk2', kind: 'text', when: ['recovered:photos'], minPins: 6, delayMs: 6000, thread: 'th_c4unknown', contact: 'c4unknown', text: "I groom Upper Eagle nights. At 1:08 a sled went up the cat track. Black, red stripe. SP-01. Only one man rides SP-01. It came back down at 1:52 with its lights off. Rafi's light went up at 1:30 and came down at 1:40. I know what I saw.", clue: 'sled_witness' },
    { id: 'e4_h_origin', kind: 'handler', when: ['pinned:fire_origin'], delayMs: 3000, text: "Hold that headline up against Rafi's signed statement. Are they describing the same fire? Fire marshals don't get creative. Confessions do." },
    { id: 'e4_h_vm', kind: 'handler', when: ['pinned:kessler_vm'], delayMs: 3500, text: "For the file: Rafi's statement never mentions going back up the mountain. Not to us, not to his lawyer, not to his goddamn priest. Play that voicemail again — and ask yourself who's been running their mouth." },
    { id: 'e4_unk3', kind: 'text', when: ['event:e4_unk2', 'pinned:badge_sheet'], delayMs: 5000, thread: 'th_c4unknown', contact: 'c4unknown', text: "It's Mags. Cat 3. This is my son's phone. Bram signs my paycheck too, cheap son of a bitch. I'll tell Detective Abara myself if you need me to." },
    { id: 'e4_h_ready', kind: 'handler', when: ['unlocked'], minPins: 14, delayMs: 3000, text: "The DA wants that plea signed Friday — nothing gets a prosecutor hot and bothered like a closed file before the weekend. When every answer has a pin behind it, open the Case Report." },
  ],

  hints: [
    { until: 'unlocked', text: 'Four digits: the vertical on Eagle. The summit sign on the wallpaper gives the top. A lock-screen alert mentions the base. Subtract.' },
    { until: 'recovered:photos', after: ['unlocked'], text: 'Rafi deleted photos on the morning he confessed. Run TRACE Photos — then ask why those.' },
    { until: 'pinned:lift_log', after: ['unlocked'], text: "Someone ran Eagle after closing. Ops alerts go to the on-call mechanic's mail — even the ones he threw in the Trash." },
    { until: 'recovered:msgfrag', after: ['pinned:lift_log'], text: 'Who was Rafi bringing down at 23:12? TRACE can rebuild the texts he deleted.' },
    { until: 'note:n_ifask', after: ['unlocked'], text: "'Where we left Baba.' Mama's voicemail says where. The trail map — or a sunrise photo — says how it's spelled." },
    { until: 'pinned:kessler_allstaff', after: ['unlocked'], text: 'Read what the owner emailed all staff the morning after. Pin it.' },
    { until: 'recovered:voice', after: ['pinned:kessler_allstaff'], text: 'Kessler called at 07:40, half an hour before Rafi walked into the station. The voicemail is gone — TRACE the carrier cache.' },
    { until: 'pinned:fire_origin', after: ['unlocked'], text: 'Where did the fire actually start? Mama sent Rafi the newspaper.' },
    { until: 'pinned:door_log', after: ['unlocked'], text: 'The Aerie\'s doors report to Ops too. Check the Trash for the 01:00–02:00 events.' },
    { until: 'pinned:badge_sheet', after: ['pinned:door_log'], text: 'Whose badge is 0001? Rafi kept a list in Notes.' },
    { until: 'recovered:history', after: ['pinned:bag_photo'], text: 'What was Rafi reading before he walked in? TRACE the browser history.' },
    { until: 'pinned:wes_karaoke', after: ['unlocked'], text: 'Wes Tolliver wanted it to burn. Where was he at 1:40? He was not quiet about it.' },
    { until: 'pinned:insurance_tip', after: ['pinned:heritage_denied'], text: 'Why would anyone burn a hut they could sell? Wes did the paperwork — read his texts.' },
    { until: 'report:filed', after: ['unlocked'], text: 'Six questions. Open the Case Report and back every answer with a pinned clue.' },
  ],

  handlerIntro: "A signed confession and a mother who won't accept it. I've read his statement — it's tidy, like he rehearsed it in the mirror. Twenty-two years on the job, I've watched men confess to shit they didn't do for love, for money, and once for a sandwich. Open the phone. His sister gave us the rule.",

  epilogue: {
    solved: [
      "Altura had rescheduled its summit walk for March 19. Bram Kessler was arrested at the base of Eagle, in a clean jacket, holding the site plans. In his garage on Ridge Road: SP-01, its cowling streaked with soot, and an empty red jerrycan stencilled SILVERPINE OPS.",
      "He told detectives he'd only meant to take 'a sixty-year-old fire hazard' off the mountain before Altura walked away. He hadn't expected anyone else up there at half past one. Then a sled light swung across the deck, and a man grabbed a backpack and left. At dawn he read the lift log and knew exactly whose key it was.",
      "Rafi Haddad's confession was withdrawn the next morning. In the interview room he kept saying 'it was my heater.' Detective Abara put a photo on the table: the heater, found intact on the deck, valve closed, frost-cracked. Lina had turned it off. He put his head down on the table and didn't lift it for a long time.",
      "Lina told the DA everything, in one breath, with her mother holding her hand. Zoe's ankle was a sprain. The six of them got a trespass warning and forty hours of community service — clearing burned timber from the summit, where the Aerie used to be.",
      "The unknown number was Mags Okafor, texting from her son's phone. She testified. Silverpine was not sold.",
      "On the first Sunday of spring, Rafi and Lina rode Eagle to tower nine at sunrise and sat on the cairn with Mama's good thermos. On the way down, he counted the chairs. Out loud. Lina rolled her eyes and counted with him.",
    ],
    partial: [
      "Your report went to the DA with holes in it.",
      "A confession is a comfortable thing. It closes files. If the board doesn't say who really opened the kitchen door at 01:24, the plea gets signed on Friday — and a man who did nothing but count six kids off a mountain goes to prison for someone else's fire.",
      'Go back to the deck at 01:34. Look past the bag.',
    ],
  },
};
