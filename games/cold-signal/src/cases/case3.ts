import type { CaseFile } from '../types';

// CASE 03 — THE LONG QUIET
// 2006: Eli Calloway, 17, walked home from the Pinecrest homecoming dance along
// Route 9 and was struck at the Sawmill curve by the Corwin family's green '97
// F-150, driven by a drunk 18-year-old Travis Corwin. Travis's father, Deputy Ray
// Corwin (on patrol in Cruiser #4), logged a "vehicle stop" there at 23:50, found
// his son and the boy — and chose. He told Travis they'd hit a deer, had the truck
// repaired for cash 70 miles away (Hollins Body & Glass, Ashby), pulled page 14
// from the case file, and then led the search for Eli for twenty years.
// 2026: Eli's sister Wren, a podcaster, found the invoice and the missing page and
// got Travis to admit "we hit a deer, my dad handled it." She sent Ray a right-of-
// reply email before Episode 9. Ray lured her to the marina, drove her to his
// hunting camp on Tamarack Rd, guessed her passcode (everyone in Pinecrest knows
// the date), deleted the evidence, unscheduled the episode, and switched the phone
// off. Wren is alive, locked in the camp bunkhouse. Days later Travis found her
// phone under the seat of his father's truck, powered it on at the field house,
// and mailed it to the unit. Red herrings: Lyle Pruett (2006 suspect, threatens
// Wren — was on a bus to Duluth), Marcus Bell (co-producer — on stage in Chicago).

export const case3: CaseFile = {
  id: 'long-quiet',
  number: '03',
  title: 'The Long Quiet',
  tagline: 'She spent a whole season looking for her brother. Then she stopped posting.',
  difficulty: 3,
  cover: 'cover_case3',
  owner: { name: 'Wren Calloway', age: 29, summary: 'True-crime podcaster. Host of The Long Quiet — a show about one case: her own brother.' },
  status: 'MISSING',
  deviceCondition: 'SIM REMOVED · 84% READABLE',
  briefing: [
    'Wren Calloway, 29. Host of The Long Quiet, a true-crime podcast about a single case: her brother Eli, 17, who walked home from the Pinecrest homecoming dance in 2006 and never arrived.',
    'Episode 9 was due out at 6 a.m. on November 7. It never came out. Wren has not been seen since the night of November 6. Her car was found at the Pinecrest Marina with the keys in it. Pinecrest PD is dragging the lake.',
    'Yesterday her phone arrived at the unit in a padded envelope. Postmarked Pinecrest, no return address. One line on a torn notepad page: "She\'d want you to finish it."',
    'Online, her listeners blame Lyle Pruett, the handyman questioned in 2006. Her co-producer says she "found something." Nobody knows what.',
    'Her mother: "Wren used the same code for everything. The night we lost him. Month, day, year — two digits each, like on the posters."',
    'Find Wren. Then finish her episode.',
  ],
  phoneDate: '2026-11-14',
  phoneTime: '08:40',
  lock: {
    passcode: '102106',
    hint: 'the night we lost him — month, day, year, two digits each',
    wallpaper: 'wall_c3_lock',
    notifications: [
      { app: 'messages', title: 'Mom', text: 'The police found your car. Please. Please, Wren.', t: '2026-11-13T19:04' },
      { app: 'messages', title: 'Marcus', text: "ep didn't drop. podhost says YOU unscheduled it at 10:36pm?? that's not you. where are you", t: '2026-11-07T06:15' },
      { app: 'mail', title: 'PodHost', text: "Episode unscheduled: 'Ep. 9 — The Grille'", t: '2026-11-06T22:36' },
      { app: 'glimpse', title: 'Glimpse · On This Day', text: '20 years ago today: "Homecoming \'06 🏈🍂 LAKERS WIN"', t: '2026-10-21T08:00' },
    ],
  },
  homeWallpaper: 'wall_c3_home',

  contacts: [
    { id: 'mom', name: 'Mom', avatar: 'av_c3_mom', number: '(555) 610-2106' },
    { id: 'marcus', name: 'Marcus Bell', avatar: 'av_c3_marcus', number: '(555) 312-8800', label: 'co-producer' },
    { id: 'ray', name: 'Uncle Ray', avatar: 'av_c3_ray', number: '(555) 610-0004', label: 'Sheriff (ret.) 🦌' },
    { id: 'travis', name: 'Coach T. Corwin', avatar: 'av_c3_travis', number: '(555) 610-2222', label: 'Pinecrest HS' },
    { id: 'pruett', name: 'L. Pruett — DO NOT ANSWER', avatar: 'av_c3_pruett', number: '(218) 555-0161' },
    { id: 'dee', name: 'Dee Hollins', avatar: 'av_c3_dee', number: '(555) 744-1909', label: 'source' },
    { id: 'sana', name: 'Sana Iqbal', avatar: 'av_c3_sana', number: '(555) 230-4545', label: 'Hushline Audio' },
    { id: 'c3unknown', name: '(555) 610-7319', avatar: 'av_unknown', number: '(555) 610-7319' },
  ],

  threads: [
    {
      id: 'th_mom', contact: 'mom', messages: [
        { from: 'them', text: 'Twenty years today. I lit his candle. Are you coming to the bridge tonight?', t: '2026-10-21T07:02' },
        { from: 'me', text: "I'll be there mom. bringing the yellow ones 💛", t: '2026-10-21T07:15' },
        { from: 'them', text: 'Honey, Ray called me. He sounded upset. Is something wrong with the new episode?', t: '2026-11-05T20:10' },
        { from: 'me', text: "nothing's wrong. it's the truth. I'll tell you everything at dinner sunday. please don't talk to Ray about it", t: '2026-11-05T20:31' },
        { from: 'them', text: "It didn't come out? Wren?", t: '2026-11-07T08:00' },
        { from: 'them', text: 'Wren please call me', t: '2026-11-08T21:15' },
        { from: 'them', text: 'The police found your car. Please. Please, Wren.', t: '2026-11-13T19:04' },
      ],
    },
    {
      id: 'th_marcus', contact: 'marcus', messages: [
        { from: 'them', text: "hushline wants a season 2 option. that's real money wren. like 'finally fix your shitty car' money", t: '2026-10-25T11:20' },
        { from: 'me', text: "there is no season 2 if I don't finish season 1", t: '2026-10-25T11:45' },
        { from: 'them', text: 'ok but if season 1 ends with you in a ditch, I get to do the voiceover', t: '2026-10-25T11:47' },
        { from: 'me', text: "you'd make it about you. 'marcus bell, grieving producer, available for panels'", t: '2026-10-25T11:49' },
        { from: 'them', text: 'and brand deals. rest in peace wren, this episode brought to you by mattresses', t: '2026-10-25T11:50' },
        { from: 'them', text: "you're going to get yourself fucking hurt for downloads.", t: '2026-11-01T23:02', clue: 'marcus_fight' },
        { from: 'me', text: "it's not downloads marcus. it's my brother.", t: '2026-11-01T23:10' },
        { from: 'them', text: 'ep 9 mix is done. it names them. holy shit, wren. you sure?', t: '2026-11-04T18:30' },
        { from: 'me', text: "right of reply goes out tmrw. legal's fine. friday 6am.", t: '2026-11-04T18:41' },
        { from: 'them', text: "live show at the Hideout tonight, wish you were here. green room has free beer and a toilet that hasn't flushed since the 90s. call me after?", t: '2026-11-06T17:40' },
        { from: 'them', text: "also the sound guy asked if you're single. I said you're married to a cold case. he said 'kinky.' I think he meant it", t: '2026-11-06T17:43' },
        { from: 'me', text: 'meeting someone at the marina. tell you everything tmrw', t: '2026-11-06T21:20' },
        { from: 'them', text: "ep didn't drop. podhost says YOU unscheduled it at 10:36pm?? that's not you. where are you", t: '2026-11-07T06:15', clue: 'unscheduled' },
      ],
    },
    {
      id: 'th_ray', contact: 'ray', messages: [
        { from: 'them', text: 'Course you can come out to the camp for the interview. Bring bug spray. Skeeters out there will carry off a grown man. — Uncle Ray', t: '2026-07-16T09:30' },
        { from: 'me', text: 'thank you for today. for everything you did for us back then 💛', t: '2026-07-18T19:20' },
        { from: 'them', text: 'Never stopped looking, kiddo. Never will.', t: '2026-07-18T19:41' },
        { from: 'me', text: "Ray, the county says page 14 of Eli's file was never archived. do you remember what it was?", t: '2026-10-14T14:02' },
        { from: 'them', text: 'Long time ago, Wren. Probably a blank. Paper goes missing.', t: '2026-10-14T16:55' },
        { from: 'them', text: 'Got your email. Call me.', t: '2026-11-05T21:50' },
        { from: 'them', text: 'Marina. 9:30. Just you.', t: '2026-11-06T18:05', clue: 'ray_meet', deletedUntil: 'recovered:msgfrag' },
      ],
    },
    {
      id: 'th_travis', contact: 'travis', messages: [
        { from: 'me', text: "Coach Corwin, it's Wren Calloway. Eli's sister. could I ask you about homecoming '06? 5 min, off the record", t: '2026-11-04T13:02' },
        { from: 'them', text: "I know who you are. I don't talk about that year.", t: '2026-11-04T13:40' },
        { from: 'me', text: "were you driving your dad's green F-150 that night?", t: '2026-11-04T13:41', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: "we hit a deer on route 9 after the dance. I'd had a few. my dad came out and handled it. he said it was a deer. why are you asking me this", t: '2026-11-04T14:10', clue: 'travis_deer_msg', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: 'what time', t: '2026-11-04T14:12', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: "late. 11:30? midnight? I was 18 Wren I don't remember. dad said never talk about it. the deer, the truck, any of it", t: '2026-11-04T14:20', clue: 'travis_deer_msg', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: "Travis. I'm so sorry. I don't think it was a deer.", t: '2026-11-04T14:22', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: "please don't come to practice again.", t: '2026-11-04T16:05' },
      ],
    },
    {
      id: 'th_pruett', contact: 'pruett', messages: [
        { from: 'them', text: 'Stop saying my damn name on your show.', t: '2026-10-02T21:00' },
        { from: 'them', text: 'Episode 4 called me "a person of interest" six times. I counted. I have a job. I have grandkids. My barber won\'t look me in the eye.', t: '2026-10-09T22:15' },
        { from: 'them', text: "You keep this up and you'll find out what I'm capable of.", t: '2026-10-16T22:38', clue: 'pruett_threat' },
        { from: 'them', text: 'Check your email. Then apologize.', t: '2026-10-19T09:00' },
        { from: 'me', text: "I got it. I'm sorry, Mr. Pruett. I'll correct it on air.", t: '2026-10-20T08:14' },
        { from: 'them', text: "Don't bother. Just find out who really did it, and say THAT on your goddamn show.", t: '2026-10-20T08:40' },
      ],
    },
    {
      id: 'th_dee', contact: 'dee', messages: [
        { from: 'them', text: "Dad kept every ledger from '91 to '09. They're in my garage in Ashby. You're welcome to look. Wear old clothes, it smells like forty years of Bondo and cat.", t: '2026-10-27T12:30' },
        { from: 'me', text: "Dee. I found it. October 23, 2006. thank you thank you", t: '2026-10-29T13:12' },
        { from: 'them', text: "Who's R. Corwin?", t: '2026-10-29T13:20' },
        { from: 'me', text: 'someone everyone trusts.', t: '2026-10-29T13:31' },
        { from: 'them', text: 'Emailed you a clean scan from my phone, clearer than your photo. Good luck, hon. Give \'em hell.', t: '2026-10-30T09:05', clue: 'dee_source' },
      ],
    },
    {
      id: 'th_sana', contact: 'sana', messages: [
        { from: 'them', text: 'Legal cleared Ep 9 for Friday, conditional on right of reply. Has Corwin responded?', t: '2026-11-05T22:30' },
        { from: 'me', text: 'he said "call me". that\'s all.', t: '2026-11-05T22:41' },
        { from: 'them', text: "That counts. We're good to go. Proud of you. Legal is also proud of you, in the sense that they've stopped sweating through their shirts.", t: '2026-11-05T22:44' },
        { from: 'them', text: "Ep 9 isn't live? Scheduler says it was pulled from your account last night. Wren?", t: '2026-11-07T06:10' },
      ],
    },
  ],

  photos: [
    { id: 'c3_ph_homecoming', art: 'c3_ph_homecoming', t: '2006-10-21T15:40', place: 'Pinecrest High — Lakers field', orientation: 'portrait', caption: "Scanned print. Eli Calloway in his Lakers jersey, grass-stained, with nine-year-old Wren on his shoulders. A shaggy dog at his feet.", device: 'Scanned print' },
    { id: 'c3_ph_yearbook', art: 'c3_ph_yearbook', t: '2026-10-12T20:15', place: 'Cedar St. apartment', orientation: 'landscape', caption: "Photo of an open 2007 Pinecrest High yearbook, the homecoming '06 spread.", clue: 'travis_truck' },
    { id: 'c3_ph_roster', art: 'c3_ph_roster', t: '2026-10-14T11:05', place: 'Ashby County Records', orientation: 'landscape', caption: "Photocopied duty roster from the 2006 Calloway file, one row highlighted.", clue: 'ray_on_duty' },
    { id: 'c3_ph_index', art: 'c3_ph_index', t: '2026-10-14T11:20', place: 'Ashby County Records', orientation: 'landscape', caption: "Recovered. Photocopied index page of case file 06-1147, with a clerk's red stamp. Deleted Nov 6, 22:27.", clue: 'case_index', deletedUntil: 'recovered:photos' },
    { id: 'c3_ph_marina', art: 'c3_ph_marina', t: '2026-11-06T21:33', place: 'Pinecrest Marina', orientation: 'landscape', caption: "Recovered. Marina parking lot at night under one sodium lamp; a pickup with its headlights on. Deleted Nov 6, 22:25.", clue: 'marina_truck', deletedUntil: 'recovered:photos' },
    { id: 'c3_ph_camp', art: 'c3_ph_camp', t: '2026-07-18T13:20', place: 'Tamarack Rd', orientation: 'landscape', caption: "Interview day. A log cabin, a smaller outbuilding and a routed wooden sign in the pines. Two mics on a picnic table.", clue: 'camp_photo' },
    { id: 'c3_ph_invoice', art: 'c3_ph_invoice', t: '2026-10-30T09:02', place: 'Ashby', orientation: 'portrait', caption: "Recovered mail attachment. A yellowed carbon-copy shop invoice, photographed flat.", clue: 'invoice', deletedUntil: 'recovered:mailpurge' },
    { id: 'c3_ph_ticket', art: 'c3_ph_ticket', t: '2026-10-19T08:58', place: 'Duluth', orientation: 'portrait', caption: "Attachment from Lyle Pruett. A faded, punched bus ticket on a kitchen table.", clue: 'pruett_ticket' },
    { id: 'c3_ph_route9', art: 'c3_ph_route9', t: '2026-10-20T16:45', place: 'Route 9 — Sawmill curve', orientation: 'landscape', caption: 'The Sawmill curve on Route 9 at dusk. A dented old guardrail, the lake beyond. A field recorder on the gravel shoulder.' },
    { id: 'c3_ph_bridge', art: 'c3_ph_bridge', t: '2026-10-21T19:10', place: 'Route 9 bridge', orientation: 'portrait', caption: 'Vigil. Candles in jars, yellow roses, a laminated photo of Eli zip-tied to the bridge rail.' },
    { id: 'c3_ph_studio', art: 'c3_ph_studio', t: '2026-11-04T23:40', place: 'Cedar St. apartment', orientation: 'portrait', caption: "Wren's closet studio. Foam panels, a mic, a corkboard of red string. The newest index card reads 'EP 9 — THE GRILLE'." },
    { id: 'c3_ph_hideout', art: 'c3_ph_hideout', t: '2026-11-06T21:30', place: 'The Hideout, Chicago', orientation: 'landscape', caption: "From Marcus Bell's Glimpse. Marcus on a small stage under a 'LONG QUIET LIVE' banner, a packed room, an empty second chair.", clue: 'marcus_alibi' },
    { id: 'c3_ph_lake', art: 'c3_ph_lake', t: '2026-11-01T07:05', place: 'Sawmill Lake', orientation: 'landscape', caption: 'Fog on Sawmill Lake at dawn. A single dock.' },
  ],

  notes: [
    {
      id: 'n_ep9', title: 'EP 9 — THE GRILLE (draft)', t: '2026-11-04T23:55', lock: { password: 'pilot22', hint: "E's dog + E's number. lowercase, no space." }, clue: 'ep9_note',
      body: "COLD OPEN: Route 9, the Sawmill curve, 23:50. A deputy's own log says he stopped here that night. Then the page disappears.\n\n1. Hollins Body & Glass, Ashby — 70 miles away. Oct 23 2006, two days after. '97 F-150, green. Grille, hood, right headlamp. Cash. Customer: R. Corwin. 'No paperwork per cust.'\n\n2. The Corwins had one green F-150. On homecoming night Ray was in Cruiser #4 all shift (roster). So who had the truck? The yearbook knows: Travis.\n\n3. Travis, Nov 4: 'we hit a deer. my dad handled it.'\n\n4. I don't think Travis knows. I think his father let him believe it was a deer for twenty years.\n\n5. Page 14 was Ray's own stop. He found his son. He found Eli. And he chose. Then he led the search on the wrong side of the lake.\n\nRight of reply to R.C. — Nov 5.\n\nLast line: 'Eli, I'm sorry it took me so long.'",
    },
    { id: 'n_timeline', title: 'Oct 21 2006 — timeline', t: '2026-10-19T21:40', body: "18:15 Pruett's bus leaves for Duluth (ticket!!)\n19:00 dance starts, gym\n22:40 Eli leaves on foot. tells Jen he'll walk Rte 9, it's 2 miles\n23:50 ???\n00:30 Mom calls the Sheriff's office\n07:00 search begins — north shore. led by Dep. Corwin\n\nRte 9 is the SOUTH shore. why north??" },
    { id: 'n_doesntfit', title: "things that don't fit", t: '2026-10-26T01:12', body: "- page 14. who pulls ONE page?\n- Corwins sold their green truck Dec 2006. Travis got a new one for graduation\n- Ray never once played me the dispatch tapes\n- Pruett: everyone's favorite villain. bus left at 6:15. he's not it.\n- Marcus wants a season 2. I want an ending." },
    { id: 'n_season', title: 'S1 episode plan', t: '2026-09-01T10:00', body: "1 The Long Quiet\n2 Homecoming\n3 The Man Who Never Stopped Looking (Ray)\n4 Person of Interest (Pruett) — needs correction!\n5 North Shore\n6 The Bus Ticket\n7 Paper\n8 Route 9\n9 The Grille — Nov 7, 6am" },
  ],

  mail: [
    { id: 'm_ror', from: 'Wren Calloway', fromAddr: 'wren@longquiet.fm', to: 'Ray Corwin', subject: 'Right of reply — The Long Quiet, Episode 9', t: '2026-11-05T10:12', folder: 'sent', clue: 'right_of_reply', body: "Ray,\n\nEpisode 9 of The Long Quiet publishes Friday, November 7 at 6:00 a.m. It will report that:\n\n1. On October 21, 2006, Eli was struck on Route 9 by your family's green 1997 Ford F-150.\n2. The truck was repaired for cash at Hollins Body & Glass in Ashby on October 23, 2006, under your name.\n3. Page 14 of case file 06-1147 — your own vehicle stop at the Sawmill curve at 23:50 — was removed before the file was archived.\n\nYou have the right to respond before publication. I'd rather hear it from you.\n\nWren" },
    { id: 'm_rayreply', from: 'Ray Corwin', fromAddr: 'rcorwin1958@lakemail.example', to: 'Wren Calloway', subject: 'Re: Right of reply — The Long Quiet, Episode 9', t: '2026-11-05T21:47', folder: 'inbox', clue: 'ray_reply', body: "Wren.\n\nI carried that boy's picture in my wallet for twenty years. Whatever you think you found, you're wrong, and you'll break your mother's heart a second time.\n\nThere are things about that night you don't understand. Call me before you ruin a family.\n\n— R." },
    { id: 'm_dee', from: 'Dee Hollins', fromAddr: 'deehollins@lakemail.example', to: 'Wren Calloway', subject: 'clean scan', t: '2026-10-30T09:02', folder: 'inbox', attachment: 'c3_ph_invoice', clue: 'invoice', deletedUntil: 'recovered:mailpurge', body: "Hi hon,\n\nHere's the page from Dad's '06 ledger box, scanned proper. Dad wrote 'no paperwork per cust.' on maybe three jobs in thirty years. He always said those were the ones he lost sleep over.\n\nI hope it helps you find your brother.\n\nDee" },
    { id: 'm_records', from: 'Ashby County Records', fromAddr: 'records@ashbycounty.example.gov', to: 'Wren Calloway', subject: 'Request #2026-4471 — Case file 06-1147', t: '2026-10-14T09:00', folder: 'inbox', clue: 'records_missing', body: 'Ms. Calloway,\n\nCopies of case file 06-1147 (Calloway, Eli — missing person) are ready for pickup.\n\nPlease note: page 14 is not present in the archived file. Our transfer log shows it was already absent when the file was received from the Pinecrest Sheriff\'s Office in 2007.\n\nFee: $18.50.\n\nAshby County Records' },
    { id: 'm_pruett', from: 'Lyle Pruett', fromAddr: 'lpruett.duluth@lakemail.example', to: 'Wren Calloway', subject: 'Here', t: '2026-10-19T08:58', folder: 'inbox', attachment: 'c3_ph_ticket', clue: 'pruett_ticket', body: "You want to call me a killer on your show. Here's my bus ticket. I was on the 6:15 to Duluth that night to see my mother in the hospital. The driver punched it. The cops had a copy in 2006 and never said so.\n\nI was gone before your brother ever got to that dance.\n\nL. Pruett" },
    { id: 'm_sana', from: 'Sana Iqbal', fromAddr: 'sana@hushline.example', to: 'Wren Calloway', subject: 'Ep 9 — legal sign-off', t: '2026-11-04T16:00', folder: 'inbox', body: "Wren,\n\nLegal has cleared Episode 9 'The Grille' for Friday 6am, on the condition that the named party receives a right of reply at least 24 hours before release.\n\nThis one's going to land hard. Take care of yourself.\n\nSana" },
    { id: 'm_podhost', from: 'PodHost', fromAddr: 'noreply@podhost.example', to: 'wren@longquiet.fm', subject: "Episode unscheduled: 'Ep. 9 — The Grille'", t: '2026-11-06T22:36', folder: 'trash', clue: 'unscheduled', body: "Your episode has been removed from the publishing queue.\n\nShow: The Long Quiet\nEpisode: Ep. 9 — The Grille\nWas scheduled: Nov 7, 06:00\nAction: Unscheduled + audio file deleted\nBy: wren@longquiet.fm — PodHost app (iPhone)\nTime: Nov 6, 22:36" },
  ],

  calls: [
    { contact: 'mom', t: '2026-11-13T19:02', dir: 'missed' },
    { contact: 'mom', t: '2026-11-10T08:30', dir: 'missed' },
    { contact: 'marcus', t: '2026-11-07T06:20', dir: 'missed' },
    { contact: 'ray', t: '2026-11-06T18:20', dir: 'out', duration: '3:10' },
    { contact: 'ray', t: '2026-11-06T18:01', dir: 'missed' },
    { contact: 'sana', t: '2026-11-05T12:00', dir: 'out', duration: '8:22' },
    { contact: 'travis', t: '2026-11-04T13:00', dir: 'out', duration: '0:00' },
    { contact: 'dee', t: '2026-10-27T12:10', dir: 'in', duration: '4:51' },
    { contact: 'pruett', t: '2026-10-16T22:40', dir: 'missed' },
    { contact: 'mom', t: '2026-11-03T19:14', dir: 'missed' },
  ],

  voicemails: [
    { id: 'vm_mom', contact: 'mom', t: '2026-11-03T19:15', duration: '0:31', voice: { pitch: 1.05, rate: 0.9, female: true }, transcript: "Hi sweetheart, it's Mom. I was clearing out Eli's closet — I know, I know — and I found Pilot's old collar. That silly dog followed him to every single game. Sat by the bench like he was on the team. Anyway. I just wanted to hear your voice. Call me." },
    { id: 'vm_pruett', contact: 'pruett', t: '2026-10-16T22:41', duration: '0:22', voice: { pitch: 0.7, rate: 0.95, female: false }, clue: 'pruett_threat', transcript: "This is Lyle Pruett. You say my name on that show one more time... you'll find out what I'm capable of. I've got a lawyer. I've got receipts. Twenty years of people crossing the street when they see me. Twenty goddamn years." },
    { id: 'vm_ray', contact: 'ray', t: '2026-11-06T18:02', duration: '0:24', voice: { pitch: 0.72, rate: 0.85, female: false }, clue: 'ray_lure', deletedUntil: 'recovered:voice', transcript: "Wren, it's Ray. I read your email. Not on the phone. The marina, nine-thirty tonight. Come alone, and leave that recorder at home. You owe me that much — hell, I owe you more. Just come." },
    { id: 'vm_marcus', contact: 'marcus', t: '2026-11-07T06:21', duration: '0:20', voice: { pitch: 0.9, rate: 1.15, female: false }, clue: 'unscheduled', transcript: "Wren. Ep 9 didn't drop. PodHost says you pulled it at ten thirty-six last night, from your phone. You would never. You'd sooner set yourself on fire. Whatever the hell is going on — call me. I'm driving up from Chicago." },
  ],

  map: {
    art: 'map_c3',
    places: [
      { id: 'home', name: 'Cedar St. apartment', x: 0.30, y: 0.58 },
      { id: 'marina', name: 'Pinecrest Marina', x: 0.46, y: 0.34 },
      { id: 'camp', name: 'Tamarack Rd (unnamed parcel)', x: 0.86, y: 0.12 },
      { id: 'route9', name: 'Route 9 — Sawmill curve', x: 0.62, y: 0.52 },
      { id: 'school', name: 'Pinecrest High — field house', x: 0.20, y: 0.76 },
      { id: 'post', name: 'Pinecrest Post Office', x: 0.38, y: 0.70 },
      { id: 'records', name: 'Ashby County Records', x: 0.93, y: 0.86 },
      { id: 'hollins', name: 'Hollins garage (Ashby)', x: 0.94, y: 0.68 },
    ],
    stops: [
      { t: '2026-07-18T13:00', place: 'camp', detail: 'Interview — 3h 10m' },
      { t: '2026-10-14T10:40', place: 'records', detail: '1h 55m' },
      { t: '2026-10-20T16:30', place: 'route9', detail: 'Recording — 40 min' },
      { t: '2026-10-29T11:00', place: 'hollins', detail: '2h 20m' },
      { t: '2026-11-04T15:30', place: 'school', detail: '12 min' },
      { t: '2026-11-06T21:28', place: 'marina', detail: 'Arrived — 26 min' },
      { t: '2026-11-06T21:58', place: 'camp', detail: 'Arrived by road from the marina, no stops — 43 min' },
      { t: '2026-11-06T22:41', place: 'camp', detail: 'LAST SIGNAL — device powered off', clue: 'last_signal' },
      { t: '2026-11-12T06:10', place: 'school', detail: 'Device powered on — 3 min — powered off', clue: 'fieldhouse_ping' },
    ],
  },

  browser: [
    { t: '2026-11-06T22:34', title: 'podhost how to unschedule episode delete', url: 'search?q=podhost+how+to+unschedule+episode+delete', clue: 'unscheduled' },
    { t: '2026-11-06T21:12', title: 'Pinecrest Marina — hours & parking', url: 'pinecrestmarina.example/visit' },
    { t: '2026-11-05T09:40', title: 'right of reply journalism — how long to wait', url: 'search?q=right+of+reply+how+long' },
    { t: '2026-11-04T22:30', title: 'leaving the scene of a fatal accident — statute of limitations', url: 'search?q=leaving+scene+fatal+accident+statute+of+limitations' },
    { t: '2026-11-04T12:50', title: 'Pinecrest Lakers football — Coach Travis Corwin', url: 'pinecrestlakers.example/staff' },
    { t: '2026-10-30T23:10', title: '1997 Ford F-150 green — grille replacement', url: 'search?q=1997+f150+grille+replacement' },
    { t: '2026-10-26T20:00', title: 'Hollins Body & Glass Ashby (closed 2009)', url: 'search?q=hollins+body+glass+ashby' },
    { t: '2026-10-19T21:00', title: 'Greyhound Pinecrest to Duluth — 2006 timetable', url: 'search?q=greyhound+pinecrest+duluth+2006' },
    { t: '2026-10-14T13:00', title: 'sheriff case file missing page — public records request', url: 'search?q=case+file+missing+page+records+request' },
  ],

  glimpse: [
    { id: 'g_20yrs', author: 'me', photo: 'c3_ph_homecoming', caption: "20 years today. I'm not done, E. 💛 #TheLongQuiet", t: '2026-10-21T08:30', likes: 4120, comments: [{ author: 'mom', text: '💛' }, { author: 'travis', text: 'Leave it be, Wren.' }, { author: 'marcus', text: 'proud of you' }] },
    { id: 'g_camp', author: 'me', photo: 'c3_ph_camp', caption: 'Ep 3 is an afternoon with the man who never stopped looking. Thank you, Uncle Ray 🦌', t: '2026-07-18T19:00', likes: 1870, comments: [{ author: 'ray', text: 'Proud of you, kiddo.' }, { author: 'marcus', text: 'I lost a pint of blood to mosquitoes recording this. worth it' }], clue: 'camp_photo' },
    { id: 'g_hideout', author: 'marcus', photo: 'c3_ph_hideout', caption: "SOLD OUT at the Hideout. Long Quiet live. Wren's here in spirit 🎙️ #chicago", t: '2026-11-06T21:45', likes: 932, comments: [{ author: 'sana', text: 'what a room' }, { author: 'marcus', text: 'someone in row 2 cried during the ad read. personal best' }], clue: 'marcus_alibi' },
    { id: 'g_bridge', author: 'me', photo: 'c3_ph_bridge', caption: 'the bridge. the yellow ones were always his favorite.', t: '2026-10-21T19:30', likes: 3305, comments: [{ author: 'mom', text: 'thank you for coming, baby' }, { author: 'ray', text: '🙏' }] },
  ],

  bank: {
    account: 'Northwoods Credit Union ••0612',
    balance: 1487.33,
    tx: [
      { t: '2026-11-06T21:27', desc: 'PINECREST MARINA — PARKING', amount: -5.00 },
      { t: '2026-11-06T19:40', desc: 'MIDWAY DINER', amount: -14.20 },
      { t: '2026-11-01T00:00', desc: 'HUSHLINE AUDIO — EPISODE PAYMENT', amount: 2500.00 },
      { t: '2026-10-29T15:40', desc: 'SHELL — ASHBY', amount: -38.10 },
      { t: '2026-10-29T13:15', desc: 'VENMO — DEE HOLLINS "ledger boxes, thank you"', amount: -200.00, clue: 'dee_source' },
      { t: '2026-10-21T17:30', desc: 'PINECREST FLORAL — YELLOW ROSES', amount: -32.00 },
      { t: '2026-10-14T12:55', desc: 'ASHBY COUNTY CLERK — COPIES', amount: -18.50 },
      { t: '2026-10-05T09:00', desc: 'PODHOST PRO', amount: -19.00 },
      { t: '2026-10-03T09:00', desc: 'CEDAR ST PROPERTIES — RENT', amount: -1100.00 },
    ],
  },

  calendar: [
    { id: 'c3_c_ep9', t: '2026-11-07T06:00', title: 'EP 9 — THE GRILLE drops', detail: 'Hushline push at 6:05' },
    { id: 'c3_c_marina', t: '2026-11-06T21:30', title: 'Marina — R.', detail: "says he'll tell me everything. I'm bringing the recorder.", clue: 'ray_meet' },
    { id: 'c3_c_vigil', t: '2026-10-21T19:00', title: 'Eli — 20 years', detail: 'Route 9 bridge. yellow roses.' },
    { id: 'c3_c_records', t: '2026-10-14T10:30', title: 'Ashby County Records', detail: 'case file 06-1147' },
    { id: 'c3_c_dee', t: '2026-10-29T11:00', title: 'Dee Hollins — ledgers', detail: 'garage, Ashby. bring gloves + $' },
    { id: 'c3_c_mom', t: '2026-11-08T18:00', title: "Dinner at Mom's", detail: 'tell her before anyone else does' },
  ],

  wifi: [
    { name: 'CorwinCamp', lastJoined: '2026-11-06T22:14', clue: 'camp_wifi' },
    { name: 'LAKERS_FIELDHOUSE', lastJoined: '2026-11-12T06:11', clue: 'fieldhouse_ping' },
    { name: 'MarinaGuest', lastJoined: '2026-11-06T21:29' },
    { name: 'CallowayStudio', lastJoined: '2026-11-06T20:55' },
    { name: 'HollinsGarage', lastJoined: '2026-10-29T11:05' },
    { name: 'AshbyCountyPublic', lastJoined: '2026-10-14T10:42' },
  ],

  trace: [
    { id: 'photos', label: 'Photos — Recently Deleted', detail: 'Carve image fragments from unallocated flash storage.', needs: ['unlocked'], durationMs: 5200 },
    { id: 'mailpurge', label: 'Mail — Purged Messages', detail: 'Recover permanently deleted mail from the local mail store journal.', needs: ['pinned:right_of_reply'], needsHint: 'Need a lead first: pin what Wren told Ray Corwin before Episode 9.', durationMs: 6200 },
    { id: 'voice', label: 'Voicemail — Carrier Cache', detail: 'Pull deleted voicemail audio from the carrier sync cache.', needs: ['pinned:ray_reply'], needsHint: "Need a lead first: pin Ray Corwin's answer to Wren.", durationMs: 6000 },
    { id: 'msgfrag', label: 'Messages — Orphaned Fragments', detail: 'Rebuild deleted SMS records from the database write-ahead log.', needs: ['pinned:case_index'], needsHint: 'Need a lead first: pin what page 14 of the case file was.', durationMs: 7000 },
  ],

  clues: [
    { id: 'invoice', title: 'Hollins invoice, 10/23/06', text: "Two days after Eli vanished: a green '97 F-150 gets a new grille, hood and headlamp, 70 miles away. Cash. Customer: R. Corwin. 'No paperwork per cust.'", kind: 'document', art: 'c3_ph_invoice' },
    { id: 'case_index', title: 'Page 14: vehicle stop, 23:50', text: "Case file index: 'Vehicle stop — Rte 9 @ Sawmill curve — 23:50 — R.C.' The page itself is gone.", kind: 'document', art: 'c3_ph_index' },
    { id: 'records_missing', title: 'Missing since 2007', text: "County records: page 14 was already missing when the Sheriff's Office handed over the file.", kind: 'document' },
    { id: 'ray_on_duty', title: 'Ray: Cruiser #4 all night', text: "Duty roster, Sat 10/21/06: Deputy R. Corwin on patrol in Cruiser #4, 21:00–05:00.", kind: 'document', art: 'c3_ph_roster' },
    { id: 'travis_truck', title: "Travis had Dad's F-150", text: "Yearbook: Travis Corwin arrived at homecoming '06 in his dad's green F-150.", kind: 'object', art: 'c3_ph_yearbook' },
    { id: 'travis_deer_msg', title: "Travis: 'we hit a deer'", text: "Deleted texts: 'we hit a deer on route 9 after the dance. I'd had a few. my dad came out and handled it.'", kind: 'event', art: 'av_c3_travis' },
    { id: 'travis_deer', title: "'He told me it was a deer'", text: "The unknown number: 'He told me it was a deer. For twenty years.'", kind: 'event', art: 'av_unknown' },
    { id: 'travis_found', title: "'under the seat of my father's truck'", text: "The unknown number: found the phone switched off under the seat of their father's truck, and sent it to us.", kind: 'event', art: 'av_unknown' },
    { id: 'right_of_reply', title: 'Right of reply to Ray', text: "Wren emailed Ray on Nov 5: Episode 9 would say his family's truck hit Eli and his page 14 vanished.", kind: 'document' },
    { id: 'ray_reply', title: "Ray: 'before you ruin a family'", text: "Ray's answer: 'There are things about that night you don't understand. Call me before you ruin a family.'", kind: 'person', art: 'av_c3_ray' },
    { id: 'ray_lure', title: "Ray's voicemail: 'come alone'", text: "Deleted voicemail, Nov 6 18:02: 'The marina, nine-thirty tonight. Come alone, and leave that recorder at home.'", kind: 'event', art: 'av_c3_ray' },
    { id: 'ray_meet', title: 'Marina 9:30 — R.', text: "Wren's calendar and a deleted text from Ray: the marina, 9:30, Nov 6.", kind: 'event' },
    { id: 'marina_truck', title: "Plate 'SHRF 4'", text: "Deleted photo, 21:33 at the marina: a dark green pickup, vanity plate SHRF 4, a man in a barn jacket.", kind: 'object', art: 'c3_ph_marina' },
    { id: 'unscheduled', title: 'Ep 9 pulled at 22:36', text: "Browser, 22:34: 'podhost how to unschedule'. PodHost, 22:36: Episode 9 unscheduled from an iPhone.", kind: 'event' },
    { id: 'camp_photo', title: 'Corwin Camp, Tamarack Rd', text: "July: Wren interviewed Ray at 'CORWIN CAMP — TAMARACK RD'. There's a padlocked bunkhouse.", kind: 'place', art: 'c3_ph_camp' },
    { id: 'camp_wifi', title: 'Wi-Fi: CorwinCamp, Nov 6', text: "Wren's phone joined the 'CorwinCamp' network at 22:14 on the night she vanished.", kind: 'place' },
    { id: 'last_signal', title: 'Last signal: Tamarack Rd', text: 'The phone went straight from the marina to Tamarack Rd and was switched off there at 22:41.', kind: 'place' },
    { id: 'fieldhouse_ping', title: 'Powered on at the field house', text: 'Nov 12, 06:10: the phone came on for 3 minutes at the Pinecrest High field house, then went dark.', kind: 'place' },
    { id: 'pruett_threat', title: "Pruett: 'what I'm capable of'", text: "Lyle Pruett, the 2006 suspect, threatened Wren by text and voicemail.", kind: 'person', art: 'av_c3_pruett' },
    { id: 'pruett_ticket', title: "Pruett's bus ticket", text: 'Greyhound, Pinecrest → Duluth, Sat Oct 21 2006, dep. 6:15 PM. Punched by the driver.', kind: 'document', art: 'c3_ph_ticket' },
    { id: 'marcus_fight', title: "Marcus: 'get yourself hurt'", text: 'Her co-producer warned her off, and wanted a season 2.', kind: 'person', art: 'av_c3_marcus' },
    { id: 'marcus_alibi', title: 'Marcus on stage in Chicago', text: "Marcus was hosting a sold-out live show in Chicago at 21:30 on Nov 6.", kind: 'place', art: 'c3_ph_hideout' },
    { id: 'ep9_note', title: 'Episode 9 draft', text: "Wren's locked Episode 9 draft: her account of the truck, the driver and the cover-up.", kind: 'document' },
    { id: 'dee_source', title: 'Source: Dee Hollins', text: "The body shop owner's daughter kept her father's ledgers — and sent Wren a clean scan.", kind: 'person', art: 'av_c3_dee' },
  ],

  questions: [
    {
      id: 'q_eli', prompt: 'What happened to Eli Calloway on October 21, 2006?',
      options: [
        { id: 'ran', label: 'He ran away from Pinecrest' },
        { id: 'pruett', label: 'Lyle Pruett abducted him' },
        { id: 'truck', label: 'He was hit by a truck on Route 9, and it was covered up' },
        { id: 'lake', label: 'He drowned in Sawmill Lake' },
      ],
      answer: 'truck', evidence: ['invoice', 'case_index', 'records_missing', 'travis_deer_msg', 'travis_deer', 'ep9_note'],
      explain: "A 23:50 vehicle stop at the Sawmill curve, a page that vanished, and a green F-150 repaired for cash two days later.",
    },
    {
      id: 'q_driver', prompt: 'Who was driving the truck that hit Eli?',
      options: [
        { id: 'ray', label: 'Ray Corwin', art: 'av_c3_ray' },
        { id: 'travis', label: 'Travis Corwin', art: 'av_c3_travis' },
        { id: 'pruett', label: 'Lyle Pruett', art: 'av_c3_pruett' },
        { id: 'stranger', label: 'A stranger passing through' },
      ],
      answer: 'travis', evidence: ['travis_truck', 'ray_on_duty', 'travis_deer_msg', 'travis_deer', 'ep9_note'],
      explain: "Ray was in Cruiser #4 all night. The yearbook puts Travis in his dad's F-150, and Travis admitted 'we hit a deer... I'd had a few.'",
    },
    {
      id: 'q_cover', prompt: 'Who covered it up?',
      options: [
        { id: 'ray', label: 'Ray Corwin', art: 'av_c3_ray' },
        { id: 'travis', label: 'Travis Corwin', art: 'av_c3_travis' },
        { id: 'hollins', label: 'Walt Hollins, the body shop owner' },
        { id: 'pruett', label: 'Lyle Pruett', art: 'av_c3_pruett' },
      ],
      answer: 'ray', evidence: ['invoice', 'case_index', 'records_missing', 'ray_reply', 'ep9_note', 'travis_deer'],
      explain: "The repair was billed to R. Corwin, the missing page was his own stop, and he told his son it was a deer.",
    },
    {
      id: 'q_pruett', prompt: 'Where was Lyle Pruett when Eli disappeared?',
      options: [
        { id: 'dance', label: 'Working at the homecoming dance' },
        { id: 'bus', label: 'On a bus to Duluth' },
        { id: 'lake', label: 'Fishing on Sawmill Lake' },
        { id: 'jail', label: 'In the county jail' },
      ],
      answer: 'bus', evidence: ['pruett_ticket'],
      explain: 'His punched Greyhound ticket left Pinecrest at 6:15 PM — before the dance even started.',
    },
    {
      id: 'q_where', prompt: 'Where is Wren Calloway now?',
      options: [
        { id: 'lake', label: 'She drowned off the marina' },
        { id: 'camp', label: "Held at the Corwin camp on Tamarack Road" },
        { id: 'chicago', label: 'With Marcus in Chicago' },
        { id: 'duluth', label: 'She ran off to confront Pruett in Duluth' },
      ],
      answer: 'camp', evidence: ['camp_wifi', 'last_signal', 'camp_photo', 'marina_truck', 'ray_lure', 'ray_meet', 'unscheduled'],
      explain: "Ray lured her to the marina; the phone went straight to Tamarack Rd, joined 'CorwinCamp', and was switched off there.",
    },
    {
      id: 'q_mailer', prompt: "Who mailed Wren's phone to the unit?",
      options: [
        { id: 'ray', label: 'Ray Corwin', art: 'av_c3_ray' },
        { id: 'travis', label: 'Travis Corwin', art: 'av_c3_travis' },
        { id: 'marcus', label: 'Marcus Bell', art: 'av_c3_marcus' },
        { id: 'mom', label: "Wren's mother", art: 'av_c3_mom' },
        { id: 'pruett', label: 'Lyle Pruett', art: 'av_c3_pruett' },
      ],
      answer: 'travis', evidence: ['fieldhouse_ping', 'travis_found', 'travis_deer'],
      explain: "The phone woke up at the Pinecrest High field house — Coach Corwin's building — before it was mailed. He found it in his father's truck.",
    },
  ],

  events: [
    { id: 'e3_unk1', kind: 'text', when: ['unlocked'], minPins: 3, delayMs: 4500, thread: 'th_c3unknown', contact: 'c3unknown', text: "Is someone reading Wren's phone right now?" },
    { id: 'e3_unk2', kind: 'text', when: ['event:e3_unk1'], minPins: 7, delayMs: 6000, thread: 'th_c3unknown', contact: 'c3unknown', text: "I found it under the seat of my father's truck. It was switched off. I didn't know who else to send it to. Please hurry.", clue: 'travis_found' },
    { id: 'e3_h_index', kind: 'handler', when: ['pinned:case_index'], delayMs: 3000, text: "Page 14 isn't in our evidence room either. Funny how paper only ever goes missing when it matters. Read that index line slowly — every goddamn word of it." },
    { id: 'e3_unk3', kind: 'text', when: ['recovered:msgfrag'], delayMs: 7000, thread: 'th_c3unknown', contact: 'c3unknown', text: "He told me it was a deer. I was eighteen and drunk and he told me it was a deer. Twenty years I believed him.", clue: 'travis_deer' },
    { id: 'e3_h_camp', kind: 'handler', when: ['pinned:camp_wifi', 'pinned:last_signal'], delayMs: 3500, text: "I've asked Pinecrest PD for a welfare check on Tamarack Road — and I asked for somebody who doesn't play poker with the old guard. Don't stop — whoever did this, your board may end up being the whole case." },
    { id: 'e3_h_ready', kind: 'handler', when: ['unlocked'], minPins: 14, delayMs: 3000, text: "Twenty years of silence on one board. When every answer has evidence behind it, open the Case Report. Let's not make it twenty-one." },
  ],

  hints: [
    { until: 'unlocked', text: "Six digits: the night we lost him, MM DD YY. The poster gives the year. Something on the lock screen remembers the day — and it isn't his birthday." },
    { until: 'pinned:right_of_reply', after: ['unlocked'], text: 'Journalists give the accused a chance to respond before publishing. Check Wren\'s Sent mail — and pin it.' },
    { until: 'pinned:ray_reply', after: ['pinned:right_of_reply'], text: 'Ray answered Wren the same night. Find his reply in the Inbox and pin it.' },
    { until: 'recovered:photos', after: ['unlocked'], text: 'Run the TRACE Photos job. Then check the deletion times — where was Wren by then?' },
    { until: 'recovered:mailpurge', after: ['pinned:right_of_reply'], text: "Someone purged Wren's mail. TRACE can pull permanently deleted messages now." },
    { until: 'note:n_ep9', after: ['unlocked'], text: "The Episode 9 draft wants 'E's dog + E's number'. A photo shows his jersey. Her mother's voicemail names the dog." },
    { until: 'recovered:voice', after: ['pinned:ray_reply'], text: 'Wren called Ray back at 18:20 — after a missed call from him. Did he leave a message? TRACE the voicemail cache.' },
    { until: 'pinned:case_index', after: ['recovered:photos'], text: 'One recovered photo is the case file index. Read line 14 and pin it.' },
    { until: 'recovered:msgfrag', after: ['pinned:case_index'], text: 'Page 14 was a stop on Route 9. Wren asked someone about that night — TRACE can rebuild the deleted texts.' },
    { until: 'pinned:ray_on_duty', after: ['unlocked'], text: 'Where was Deputy Corwin at 23:50 on Oct 21, 2006? Wren photographed a duty roster at the records office.' },
    { until: 'pinned:travis_truck', after: ['unlocked'], text: 'Who had the green F-150 on homecoming night? Yearbooks love a big entrance.' },
    { until: 'pinned:pruett_ticket', after: ['unlocked'], text: 'Everyone online blames Lyle Pruett. He sent Wren something to prove them wrong.' },
    { until: 'pinned:camp_wifi', after: ['unlocked'], text: 'Where did the phone go after the marina? Settings remembers every network it has joined — and Wren had been there before.' },
    { until: 'pinned:fieldhouse_ping', after: ['unlocked'], text: 'The phone came on once more, days later, before it was mailed. Where? Check Maps.' },
    { until: 'report:filed', after: ['unlocked'], text: 'Twenty years, six questions. Open the Case Report and back every answer with a pinned clue.' },
  ],

  handlerIntro: "A padded envelope, a Pinecrest postmark and a girl nobody's seen in a week. No return address, naturally — folks love to help right up until they have to sign something. Whoever sent this wanted it read. Start with the lock screen — her mother gave us the rule.",

  epilogue: {
    solved: [
      "Pinecrest PD reached Corwin Camp at 4:15 p.m. on November 14. The bunkhouse was padlocked from the outside. Wren Calloway was inside — thin, furious, and alive. Ray had been bringing her food and water every morning. He told the officers he 'just needed time to think.' He'd had twenty years.",
      "He got into her phone on the first try. Everyone in Pinecrest knows the date.",
      "Ray Corwin was charged with kidnapping, obstruction, and tampering with evidence. Under the floor of his workshop, investigators found a single folded sheet of 2006 Sheriff's Office paper: page 14. 'Vehicle stop — Rte 9 — 23:50. Driver: T. Corwin. Pedestrian.' The rest of the line was crossed out so hard the pen had torn through.",
      "Travis Corwin walked into the station on his own the next morning. He had found Wren's phone under the seat of his father's truck, switched it on at work, and read her mother's messages on the lock screen. He mailed it before school started. 'I couldn't let him do it twice,' he said.",
      "In the spring, divers recovered Eli Calloway beneath the old boathouse on the north shore — the side of the lake his search had always been steered toward.",
      "Episode 9 came out on a Friday at 6 a.m. Wren recorded the last line from her mother's kitchen: 'Eli, I'm sorry it took me so long.'",
    ],
    partial: [
      'Your report went up the chain with holes in it.',
      "Some names were right. Some weren't. In a town where everyone already decided who did it twenty years ago, the wrong name is how the quiet keeps going.",
      'Wren is still out there, and the phone still knows. Go back to November 6, 22:14.',
    ],
  },
};
