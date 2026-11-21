import type { CaseFile } from '../types';

// CASE 02 — DEAD AIR
// Truth: Jonah "the Owl" Merrick runs The Owl Hours, a pirate radio show, from the
// roof of the derelict Carraway Mill. His co-host and best friend Cass Rourke
// forged his e-signature (from her iPad, using his mail login) on a deal selling
// the show and its 9-year call-in archive to Hearth Audio, and had the $40,000
// advance paid into her own account (••7731). Jonah found out and planned to
// confront her "off air" after Friday's show. Cass said she was sick and would
// "call in from bed" at 01:45 — but she'd pre-recorded the call-in and came to the
// mill instead. On the 3rd-floor landing he grabbed her sleeve; the loose rail gave
// way and he fell. She took his phone back up to the Coop, used it to start her
// pre-recorded file on the playout deck at 01:44, deleted the texts and the
// accidental photo that put her on the stairs, cleared the browser history, posted
// an old "sickbed" photo as her alibi, and rode home. At 05:48 she went back,
// called his phone from the Dyer St payphone, then called 911 anonymously.
// Red herrings: Gideon Pell (threatening landlord — in Lisbon), Mothwing (creepy
// superfan parked in the lot — she was texting from outside the whole time).

export const case2: CaseFile = {
  id: 'dead-air',
  number: '02',
  title: 'Dead Air',
  tagline: 'Four hours of radio. Eleven minutes of silence. One man at the bottom of the stairs.',
  difficulty: 2,
  cover: 'cover_case2',
  owner: { name: 'Jonah Merrick', age: 34, summary: 'Radio repairman by day. "The Owl" — pirate radio host — by night.' },
  status: 'IN COMA',
  deviceCondition: 'CRACKED GLASS · 92% READABLE',
  briefing: [
    'Jonah Merrick, 34. By day he fixes old radios at Volt Repair. Friday nights, midnight to four, he is "the Owl" — host of The Owl Hours, an unlicensed station broadcasting from the roof of the derelict Carraway Mill.',
    'At 05:52 on Saturday, October 17, an anonymous caller at the payphone outside the Suds & Duds laundromat on Dyer Street reported a man at the foot of the mill stairwell. Jonah is in a coma at St. Brigid\'s. Police call it a fall: old building, iron stairs, a man alone at night.',
    'Except his phone was found upstairs in the transmitter room — "the Coop" — up on the roof, far above where he lay. He ran the whole show off that phone. Why go down without it?',
    'Listeners say the show sounded normal until 2:13 a.m. His co-host Cass Rourke was calling in live from her sickbed. Then eleven minutes of dead air, then an automated loop until dawn.',
    'His sister Ada: "His code is always wherever the show lives on the dial. Four digits, no dot."',
    'Find out what happened on those stairs. Pin what matters. File your report.',
  ],
  phoneDate: '2026-10-22',
  phoneTime: '10:05',
  lock: {
    passcode: '1043',
    hint: 'wherever the show lives on the dial — four digits, no dot',
    wallpaper: 'wall_c2_lock',
    notifications: [
      { app: 'messages', title: 'Ada', text: "they're giving your phone to the cold case people. Jo, if you can hear any of this — fight.", t: '2026-10-21T22:14' },
      { app: 'messages', title: 'Mothwing 🦋', text: 'the night loop?? you never run the loop on a live night', t: '2026-10-17T02:26' },
      { app: 'settings', title: 'Settings', text: 'Your Halo passcode was changed.', t: '2026-10-03T03:10' },
      { app: 'glimpse', title: 'Glimpse', text: 'cassatnight posted: "we MOVED 📻 Owl Hours now lives at 104.3 — same owl, new perch 🦉"', t: '2026-10-03T02:30' },
    ],
  },
  homeWallpaper: 'wall_c2_home',

  contacts: [
    { id: 'cass', name: 'Cass Rourke', avatar: 'av_c2_cass', number: '(555) 017-7731', label: 'co-host 🦉' },
    { id: 'ada', name: 'Ada', avatar: 'av_c2_ada', number: '(555) 302-1188', label: 'sis' },
    { id: 'pell', name: 'Gideon Pell', avatar: 'av_c2_pell', number: '(555) 400-2600', label: 'Pell Holdings (mill)' },
    { id: 'moth', name: 'Mothwing 🦋', avatar: 'av_c2_moth', number: '(555) 019-4410', label: 'listener' },
    { id: 'rhea', name: 'Rhea Castell', avatar: 'av_c2_rhea', number: '(555) 230-7070', label: 'Hearth Audio' },
    { id: 'benny', name: 'Benny Szabo', avatar: 'av_c2_benny', number: '(555) 118-5050', label: 'Volt Repair' },
    { id: 'c2burner', name: '(555) 019-0062', avatar: 'av_unknown', number: '(555) 019-0062' },
  ],

  threads: [
    {
      id: 'th_cass', contact: 'cass', messages: [
        { from: 'them', text: 'sent u $60 for generator gas 🔋 GAS jo. not weed. ok ok stop saying thank you', t: '2026-09-19T14:02' },
        { from: 'them', text: '104.3!!! we are legit-ish now 🦉 still a felony but a classier felony. ok ok going to bed', t: '2026-10-03T02:40' },
        { from: 'me', text: 'go to bed you absolute gremlin. wash the paint off first, you look like a crime scene', t: '2026-10-03T02:42' },
        { from: 'me', text: 'use my login for the archive upload, pw is on the fridge', t: '2026-10-08T18:40' },
        { from: 'them', text: 'ok ok ty 💛', t: '2026-10-08T18:41' },
        { from: 'me', text: 'also whoever left a condom wrapper on the transmitter: the only thing getting screwed on that roof is the Spectrum Bureau', t: '2026-10-08T18:44' },
        { from: 'them', text: "ok ok it's from like 2019 and it is NOT mine. that roof has a past jo. let it have its secrets", t: '2026-10-08T18:46' },
        { from: 'me', text: 'Rhea from Hearth Audio just congratulated me on SIGNING. Cass what the fuck is this', t: '2026-10-10T08:02' },
        { from: 'them', text: "ok ok don't freak. i was going to tell you. they wanted an answer by friday and you'd just say no like always", t: '2026-10-10T08:15' },
        { from: 'me', text: "because the answer is NO. it's not mine to sell. it's 9 years of people calling at 3am", t: '2026-10-10T08:16' },
        { from: 'them', text: "it's 40k Jo. we broadcast off a car battery in a building that's getting knocked down. we eat gas station burritos for dinner. i'm tired", t: '2026-10-10T08:20' },
        { from: 'me', text: "where's the money cass. and don't bullshit me", t: '2026-10-10T08:21' },
        { from: 'them', text: "it's in an account for the show. i'll explain. pls", t: '2026-10-10T08:40' },
        { from: 'me', text: 'you have till friday to fix it or I say it on air', t: '2026-10-12T15:00' },
        { from: 'them', text: "got a cold 🤧 snot everywhere, very glamorous. doing my segment from bed tonight. i'll ring the line at 1:45 ok ok", t: '2026-10-16T16:40', clue: 'cass_sick' },
        { from: 'me', text: 'fine. after the show we talk. off air.', t: '2026-10-16T16:52' },
        { from: 'them', text: "i'm not sick. i'm downstairs. we need to talk about hearth before you say anything on air", t: '2026-10-17T01:22', clue: 'cass_downstairs', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: 'you signed my name Cass. you took 40 grand that was never yours', t: '2026-10-17T01:24', clue: 'confront', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: 'ok ok. come down. please. 3rd floor landing, not on air', t: '2026-10-17T01:26', clue: 'cass_downstairs', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: 'putting on the long Pale Blue Static. 14 min. coming down.', t: '2026-10-17T01:31', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: "ada just told me. i'm at st brigid's. i can't breathe. i was ON AIR with you jo, i was literally on the phone with you 😭", t: '2026-10-17T11:02' },
        { from: 'them', text: 'please wake up', t: '2026-10-18T23:50' },
      ],
    },
    {
      id: 'th_ada', contact: 'ada', messages: [
        { from: 'them', text: "mom wants to know if you're coming sunday. I said yes. she's making the pot roast. the dry one. you're coming sunday and you're eating it and you're smiling", t: '2026-10-14T19:15' },
        { from: 'me', text: 'yes boss. bringing hot sauce. a lot of hot sauce', t: '2026-10-14T19:40' },
        { from: 'them', text: "have a good show 🦉 i'll listen on my break (night shift again. a man already threw up on my shoes. living the dream)", t: '2026-10-16T22:10' },
        { from: 'me', text: 'dedicating the 3am song to the nurses of St B and the guy who puked on your shoes', t: '2026-10-16T22:12' },
        { from: 'them', text: "if it's Stayin' Alive I'm hanging up. we did compressions to it twice tonight, I can't hear the Bee Gees without counting to thirty", t: '2026-10-16T22:13' },
        { from: 'me', text: 'noted. going with something nobody has ever been resuscitated to', t: '2026-10-16T22:15' },
        { from: 'them', text: "Jo. Jo they just brought you in. I'm here. I'm right here.", t: '2026-10-17T06:40' },
        { from: 'them', text: "the police say you fell. you've climbed those stairs a thousand times", t: '2026-10-18T09:30' },
        { from: 'them', text: "they're giving your phone to the cold case people. Jo, if you can hear any of this — fight.", t: '2026-10-21T22:14' },
      ],
    },
    {
      id: 'th_pell', contact: 'pell', messages: [
        { from: 'them', text: 'Mr. Merrick. Your "radio station" is trespassing on my property.', t: '2026-09-30T09:12' },
        { from: 'me', text: "the city says the mill's a heritage site till the hearing on the 20th. see you on the roof, gideon. bring a hard hat and a sense of humor", t: '2026-10-01T11:05' },
        { from: 'them', text: 'Off my roof before someone falls off it.', t: '2026-10-08T08:10', clue: 'pell_threat' },
        { from: 'me', text: 'is that a threat Gideon. because it sounded like a pretty shitty threat', t: '2026-10-08T08:30' },
        { from: 'them', text: "It's an old building, Mr. Merrick. Merely an observation.", t: '2026-10-08T08:31', clue: 'pell_threat' },
        { from: 'them', text: 'I was told of your accident. I am abroad until the 21st. My office will be in touch regarding the removal of your equipment.', t: '2026-10-19T10:00' },
      ],
    },
    {
      id: 'th_moth', contact: 'moth', messages: [
        { from: 'them', text: 'found you on 104.3!! 🦋 the dial cannot hide you from me', t: '2026-10-02T03:59' },
        { from: 'them', text: 'i always know where you are, Owl 🦉', t: '2026-10-09T01:12', photo: 'c2_ph_mothcar', clue: 'moth_creepy' },
        { from: 'me', text: "...that's the mill lot. Moth that is some serial-killer shit. you can't sit out there alone at 1am", t: '2026-10-09T01:14' },
        { from: 'them', text: 'best reception in the city. i bring a thermos 🙂 and beef jerky. it\'s cozy', t: '2026-10-09T01:15' },
        { from: 'them', text: 'thank u for the dedication 🥹🦋', t: '2026-10-17T00:21' },
        { from: 'them', text: 'owl is that you on the 3rd floor landing?? someone in a yellow raincoat up there with you. waving arms. u ok??', t: '2026-10-17T01:39', clue: 'moth_witness', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: "where'd you go?? cass is just... talking to nobody. like a monologue. she's not answering anything anyone asks", t: '2026-10-17T02:01', clue: 'monologue' },
        { from: 'them', text: 'yellow raincoat just came out the loading dock and rode off on a bike. alone. OWL?', t: '2026-10-17T02:04', clue: 'moth_witness' },
        { from: 'them', text: 'dead air???', t: '2026-10-17T02:15' },
        { from: 'them', text: 'the night loop?? you never run the loop on a live night', t: '2026-10-17T02:26' },
        { from: 'them', text: "the stair door is chained on the lot side. i can't get in. calling you", t: '2026-10-17T02:31' },
        { from: 'them', text: "they're saying you fell. i was RIGHT THERE in the lot. i'm so sorry 🦋", t: '2026-10-17T09:12' },
      ],
    },
    {
      id: 'th_rhea', contact: 'rhea', messages: [
        { from: 'them', text: "JONAH!! 🎉 Welcome to Hearth! Signed, sealed, delivered. 'Owl Hours: Unplugged' is going to be HUGE", t: '2026-10-10T07:55', clue: 'hearth_deal' },
        { from: 'me', text: 'signed what?', t: '2026-10-10T08:00' },
        { from: 'them', text: "The talent + archive agreement? SignRight shows you countersigned last night at 11:14. Cass said you wanted her to handle the paperwork", t: '2026-10-10T08:04', clue: 'hearth_deal' },
        { from: 'me', text: "I never signed anything. please don't release a cent", t: '2026-10-10T08:05' },
        { from: 'them', text: "Oh no. Oh, shit. Legal says it came from your email account, and finance already queued the advance. Can you come in Tuesday?", t: '2026-10-10T08:30' },
        { from: 'them', text: "Thank you for coming in. Legal has your notarized statement. I'm so sorry, Jonah.", t: '2026-10-13T12:05' },
      ],
    },
    {
      id: 'th_benny', contact: 'benny', messages: [
        { from: 'them', text: 'u closing up? leave the Zenith on the bench, customer picks up saturday. and stop eating my damn pretzels', t: '2026-10-16T18:00' },
        { from: 'me', text: 'done. big show tonight 🦉', t: '2026-10-16T18:03' },
        { from: 'them', text: 'kid the stairwell lights in that mill are still dead. take a flashlight before you break your damn neck', t: '2026-10-16T18:04' },
        { from: 'them', text: "Ada told me. shop's yours whenever you wake up. I'm keeping the Zenith till you can hand it over yourself.", t: '2026-10-19T08:40' },
      ],
    },
  ],

  photos: [
    { id: 'hp_c2_jonah', art: 'hp_c2_jonah', t: '2026-10-09T02:31', place: "Jonah's apartment — hallway mirror", orientation: 'portrait', caption: 'Mirror selfie. Boxer briefs, owl slippers, headphones round the neck, a soldering iron in his free hand.', hidden: true },
    { id: 'c2_ph_sign', art: 'c2_ph_sign', t: '2026-10-03T01:58', place: 'Carraway Mill — the Coop', orientation: 'portrait', caption: 'Hand-painted station sign on the mill roof. Paint still wet.' },
    { id: 'c2_ph_duo', art: 'c2_ph_duo', t: '2026-10-03T02:05', place: 'Carraway Mill — the Coop', orientation: 'landscape', caption: 'Recovered. Selfie of Jonah and Cass on the mill roof, paint on their hands, the sign behind them. Deleted Oct 10, 08:24.', clue: 'cass_raincoat', deletedUntil: 'recovered:photos' },
    { id: 'c2_ph_festival', art: 'c2_ph_festival', t: '2026-08-22T16:30', place: 'Riverbend Fest', orientation: 'portrait', caption: 'Saved from Glimpse. Cass Rourke at Riverbend Fest, in the rain.', clue: 'cass_raincoat' },
    { id: 'c2_ph_mothcar', art: 'c2_ph_mothcar', t: '2026-10-09T01:11', place: 'Carraway Mill — parking lot', orientation: 'landscape', caption: "Sent by Mothwing. A car dashboard at night, radio on; the mill through the windshield.", clue: 'moth_creepy' },
    { id: 'c2_ph_coop', art: 'c2_ph_coop', t: '2026-10-16T23:52', place: 'Carraway Mill — the Coop', orientation: 'landscape', caption: "Pre-show. The transmitter room: mixer, a playout box labelled 'DECK', a car battery, fairy lights, a sheet taped to the wall.", device: 'This Halo — rear camera' },
    { id: 'c2_ph_stairs', art: 'c2_ph_stairs', t: '2026-10-17T01:41', place: 'Carraway Mill — stairwell', orientation: 'portrait', caption: "Recovered. Burst frame, Carraway Mill stairwell, tilted and motion-blurred. Deleted at 01:57.", clue: 'stair_photo', deletedUntil: 'recovered:photos', device: 'This Halo — rear camera (burst)' },
    { id: 'c2_ph_sickbed', art: 'c2_ph_sickbed', t: '2026-10-16T21:05', place: 'Wren Court', orientation: 'portrait', caption: "Attached to Cass's Glimpse post of 01:50. Tea, tissues, a small radio and a clock on the nightstand.", clue: 'cass_alibi_post', device: 'Glimpse media — original capture time embedded' },
    { id: 'c2_ph_lisbon', art: 'c2_ph_lisbon', t: '2026-10-16T22:40', place: 'Lisbon, Portugal', orientation: 'landscape', caption: 'From Gideon Pell\'s Glimpse. A rooftop bar at night; a tram in the street below; a lanyard on the table.', clue: 'pell_lisbon' },
    { id: 'c2_ph_notice', art: 'c2_ph_notice', t: '2026-10-01T10:20', place: 'Carraway Mill — front gate', orientation: 'portrait', caption: 'A notice zip-tied to the gate: "PELL HOLDINGS — NOTICE TO VACATE — DEMOLITION COMMENCES OCT 31". Someone has drawn an owl on it in marker.' },
    { id: 'c2_ph_contract', art: 'c2_ph_contract', t: '2026-10-10T08:22', place: 'Fennimore Ave apartment', orientation: 'portrait', caption: 'Screenshot of a PDF from Rhea: the signature page of the "Talent & Archive Agreement". Typed e-signature: Jonah Merrick, 10/09/2026 23:14. Advance: $40,000 to the account in Schedule B.', clue: 'hearth_deal' },
    { id: 'c2_ph_van', art: 'c2_ph_van', t: '2026-09-28T23:40', place: 'Dyer Street', orientation: 'landscape', caption: 'A white van with a rotating antenna dome on its roof, parked across from the mill. Door decal: SPECTRUM ENFORCEMENT BUREAU.' },
    { id: 'c2_ph_bench', art: 'c2_ph_bench', t: '2026-10-16T17:55', place: 'Volt Repair', orientation: 'landscape', caption: 'A workbench of gutted radios. A 1950s Zenith with a tag: "SAT PICKUP".' },
    { id: 'c2_ph_ada', art: 'c2_ph_ada', t: '2026-09-13T20:10', place: "Ada's house", orientation: 'portrait', caption: 'Jonah and Ada with a lopsided birthday cake shaped like an owl. Ada is in scrubs.' },
  ],

  notes: [
    {
      id: 'n_runsheet', title: 'EP 41 run sheet', t: '2026-10-16T21:30', clue: 'callin_plan',
      body: 'OWL HOURS — EP 41 — SAT 17 OCT\n\n00:00 open — rain sounds + "Night Swimming"\n00:20 Mothwing dedication 🦋\n00:45 listener lines open (calls ring THIS phone → patch to ch.4)\n01:30 "Pale Blue Static" (extended, 14:20) — break\n01:45 CASS CALL-IN — she rings the line, ch.4, ~25 min\n02:15 back to me — requests\n03:00 nurses of St B song\n03:50 sign-off\n\nDeck = 192.168.4.1 (Coop wifi only)\ndead-air sensor: 11 min → Night Loop',
    },
    {
      id: 'n_receipts', title: 'receipts', t: '2026-10-15T23:40', lock: { password: 'barnowl43', hint: 'Same as the Coop Wi-Fi.' }, clue: 'receipts_note',
      body: "RECEIPTS — for Ada if anything happens. And for the show.\n\n• Oct 9, 23:14: 'I' signed the Hearth Talent & Archive Agreement on SignRight. I was at the Coop running a test broadcast. The audit trail says the device was CASS-IPAD.\n• The SignRight email was in my TRASH. I didn't put it there.\n• Oct 12: Hearth paid the $40,000 advance to an account ending 7731. Mine ends 2290.\n• 7731. I've seen that number before. Check the Zelle.\n• Notarized statement filed Oct 13 (Dyer St notary).\n• Telling Cass Friday after the show. OFF AIR. She's my best friend. I want to hear her say it.\n\nThe archive is nine years of people calling at 3am because they had nobody else. It isn't mine to sell. It sure isn't hers.",
    },
    { id: 'n_mill', title: 'mill stuff', t: '2026-10-11T14:00', body: "- stairwell lights dead since sept\n- 3rd floor landing rail is LOOSE. fix before Ada helps again!!\n- heritage hearing Oct 20\n- Pell says demo Oct 31 (he can't, see hearing)\n- chain the lot-side stair door on show nights" },
    { id: 'n_ideas', title: 'show ideas', t: '2026-09-22T03:12', body: "- 'Dial Tones' — play listener voicemails\n- Mothwing gets a weekly dedication slot\n- Cass: pre-record bits so we can both be in the room?? (she loves this idea)\n- get Pell on air lol\n- 10 yr anniversary show next spring" },
  ],

  mail: [
    { id: 'm_welcome', from: 'Rhea Castell', fromAddr: 'rhea@hearthaudio.fm', to: 'Jonah Merrick', subject: 'Welcome to Hearth, Owl Hours! 🔥', t: '2026-10-10T09:00', folder: 'inbox', attachment: 'c2_ph_contract', clue: 'hearth_deal', body: "Jonah,\n\nThank you for countersigning the Talent & Archive Agreement on Oct 9! We're thrilled to bring nine years of The Owl Hours to Hearth listeners.\n\nYour $40,000 advance will be released within 2 business days to the payee account designated in Schedule B.\n\nSignature page attached for your records.\n\nWarmly,\nRhea Castell\nTalent Acquisitions, Hearth Audio" },
    { id: 'm_remit', from: 'Hearth Audio Finance', fromAddr: 'payables@hearthaudio.fm', to: 'Jonah Merrick', subject: 'Remittance advice — HA-2291', t: '2026-10-12T09:30', folder: 'inbox', clue: 'advance_7731', body: 'REMITTANCE ADVICE\n\nPayee: Owl Hours (J. Merrick, Licensor)\nAmount: $40,000.00\nMethod: ACH\nAccount: ••••7731 (per Schedule B)\nDate: 2026-10-12\n\nThis is an automated message.' },
    { id: 'm_esign', from: 'SignRight', fromAddr: 'noreply@signright.example', to: 'Jonah Merrick', subject: 'Completed: Hearth Audio — Talent & Archive Agreement', t: '2026-10-09T23:15', folder: 'trash', clue: 'esign_trail', body: "All parties have signed.\n\nDocument: Hearth Audio — Talent & Archive Agreement\n\nAUDIT TRAIL\n23:09  Opened by owlhours.jonah@inboxly.com\n23:13  Identity check: email link\n23:14  Signed: Jonah Merrick\n       Device: CASS-IPAD (iPadOS 19)\n       Network: Rourke_WrenCt\n23:14  Document completed" },
    { id: 'm_whitlock', from: 'Spectrum Enforcement Bureau', fromAddr: 'd.whitlock@seb.example.gov', to: 'Operator, 88.1 MHz', subject: 'NOTICE OF UNLICENSED OPERATION', t: '2026-09-29T15:00', folder: 'inbox', body: 'Our field unit has detected an unlicensed transmission on 88.1 MHz in the Dyer Street area, Fridays 00:00–04:00.\n\nUnlicensed broadcasting carries fines of up to $20,000 per day. Cease immediately.\n\nOfficer Dana Whitlock\nField Enforcement' },
    { id: 'm_vacate', from: 'Pell Holdings', fromAddr: 'legal@pellholdings.example', to: 'Occupants, Carraway Mill', subject: 'NOTICE TO VACATE — Carraway Mill', t: '2026-10-01T09:00', folder: 'inbox', body: 'All persons occupying any part of the Carraway Mill property without authorization must vacate by October 30.\n\nDemolition commences October 31. Equipment remaining on site will be disposed of.\n\nPell Holdings LLC' },
    { id: 'm_topell', from: 'Jonah Merrick', fromAddr: 'owlhours.jonah@inboxly.com', to: 'Gideon Pell', subject: 'your notice', t: '2026-10-16T23:08', folder: 'sent', body: "Your notice isn't worth the zip ties. The heritage hearing is the 20th. We'll be on the roof till then, and if you want to say 'falls off it' again you can come up and say it to my face, you smug bastard. Tonight. Midnight to four.\n\n— the Owl" },
    { id: 'm_ooo', from: 'Gideon Pell', fromAddr: 'g.pell@pellholdings.example', to: 'Jonah Merrick', subject: 'Automatic reply: your notice', t: '2026-10-16T23:08', folder: 'inbox', clue: 'pell_ooo', body: 'Thank you for your message.\n\nI am attending the Iberia Property Forum in Lisbon, Portugal, from October 14 to October 21, with limited access to email.\n\nFor urgent matters please contact my office.\n\nGideon Pell\nPell Holdings LLC' },
  ],

  calls: [
    { contact: 'ada', t: '2026-10-17T06:44', dir: 'missed' },
    { contact: '(555) 016-2200', t: '2026-10-17T05:48', dir: 'missed' },
    { contact: 'moth', t: '2026-10-17T02:33', dir: 'missed' },
    { contact: 'moth', t: '2026-10-17T02:31', dir: 'missed' },
    { contact: 'moth', t: '2026-10-17T00:49', dir: 'in', duration: '1:12' },
    { contact: '(555) 211-0417', t: '2026-10-17T00:52', dir: 'in', duration: '2:40' },
    { contact: 'ada', t: '2026-10-16T22:05', dir: 'out', duration: '3:12' },
    { contact: 'benny', t: '2026-10-16T17:58', dir: 'in', duration: '0:40' },
    { contact: 'ada', t: '2026-10-14T19:09', dir: 'missed' },
    { contact: 'rhea', t: '2026-10-12T14:29', dir: 'missed' },
    { contact: 'cass', t: '2026-10-10T08:45', dir: 'out', duration: '6:40' },
    { contact: 'pell', t: '2026-10-08T08:11', dir: 'missed' },
    { contact: '(555) 010-9900', t: '2026-10-06T11:30', dir: 'missed' },
  ],

  voicemails: [
    { id: 'vm_ada', contact: 'ada', t: '2026-10-14T19:10', duration: '0:24', voice: { pitch: 1.15, rate: 1.05, female: true }, transcript: "Jo, it's Ada. The mixer at the Coop won't take the Wi-Fi password — is it still barnowl43? Like, barn owl, all one word, four-three at the end? Also Mom says Sunday. You're coming Sunday. Don't make me come drag your ass off that roof." },
    { id: 'vm_pell', contact: 'pell', t: '2026-10-08T08:12', duration: '0:19', voice: { pitch: 0.75, rate: 0.88, female: false }, clue: 'pell_threat', transcript: "Merrick. Gideon Pell. You and your little radio club have until the thirty-first. After that, the wrecking crew doesn't much care who's on the roof. Get off it before someone falls off it." },
    { id: 'vm_rhea', contact: 'rhea', t: '2026-10-12T14:30', duration: '0:21', voice: { pitch: 1.2, rate: 1.1, female: true }, clue: 'advance_7731', transcript: "Jonah, Rhea from Hearth. Bad news — really shitty news, honestly — finance released the advance this morning before legal could stop it. Forty thousand, to the account in Schedule B, the one ending seven-seven-three-one. I'm so sorry. Call me." },
    { id: 'vm_whitlock', contact: '(555) 010-9900', t: '2026-10-06T11:31', duration: '0:17', voice: { pitch: 0.95, rate: 0.95, female: true }, transcript: "This message is for the operator of the unlicensed station formerly on eighty-eight point one. This is Officer Dana Whitlock, Spectrum Enforcement. Changing frequency does not change the law. We will find your transmitter." },
    { id: 'vm_payphone', contact: '(555) 016-2200', t: '2026-10-17T05:49', duration: '0:26', voice: { pitch: 1.05, rate: 0.85, female: true }, clue: 'cass_vm', deletedUntil: 'recovered:voice', transcript: "[traffic, a dryer tumbling] ...Owl. It's me. I'm at the Suds and Duds on Dyer, there's a payphone. I came back. You're still — you're still down there. I'm calling someone. I'm calling someone right now. I'm so sorry. I'm so — [click]" },
  ],

  map: {
    art: 'map_c2',
    places: [
      { id: 'mill', name: 'Carraway Mill (the Coop)', x: 0.55, y: 0.36 },
      { id: 'home', name: 'Fennimore Ave apartment', x: 0.24, y: 0.56 },
      { id: 'volt', name: 'Volt Repair', x: 0.40, y: 0.72 },
      { id: 'hearth', name: 'Hearth Audio — Ostrander Bldg', x: 0.80, y: 0.18 },
      { id: 'suds', name: 'Suds & Duds (Dyer St)', x: 0.64, y: 0.50 },
      { id: 'wrenct', name: "Wren Court (Cass's place)", x: 0.14, y: 0.22 },
      { id: 'brigid', name: "St. Brigid's Hospital", x: 0.84, y: 0.78 },
    ],
    stops: [
      { t: '2026-10-11T19:12', place: 'wrenct', detail: '6 min — no stop inside' },
      { t: '2026-10-13T10:55', place: 'hearth', detail: '48 min' },
      { t: '2026-10-15T20:10', place: 'suds', detail: '52 min' },
      { t: '2026-10-16T09:00', place: 'volt', detail: '9h 02m' },
      { t: '2026-10-16T22:35', place: 'home', detail: '58 min' },
      { t: '2026-10-16T23:46', place: 'mill', detail: 'Arrived — roof level (barometer)' },
      { t: '2026-10-17T01:33', place: 'mill', detail: 'Barometer: device descends 2 floors (roof → 3rd floor)' },
      { t: '2026-10-17T01:43', place: 'mill', detail: 'Barometer: device climbs 2 floors (3rd floor → roof) — 2 min after the last photo', clue: 'phone_carried' },
      { t: '2026-10-17T06:31', place: 'mill', detail: 'Device stationary on roof level until collected' },
    ],
  },

  browser: [
    { t: '2026-10-17T01:45', title: 'COOP DECK — Now playing: cass_callin_ep41.wav (28:12)', url: '192.168.4.1/deck/now', clue: 'playout_cmd', deletedUntil: 'recovered:history' },
    { t: '2026-10-17T01:44', title: 'COOP DECK — ▶ Play file', url: '192.168.4.1/deck/play?f=cass_callin_ep41.wav&ch=4', clue: 'playout_cmd', deletedUntil: 'recovered:history' },
    { t: '2026-10-15T23:20', title: 'can someone e-sign a contract with your email without permission', url: 'search?q=can+someone+esign+with+your+email' },
    { t: '2026-10-12T00:41', title: 'how to find out whose bank account ends in', url: 'search?q=whose+bank+account+ends+in' },
    { t: '2026-10-10T08:12', title: 'SignRight — View audit trail', url: 'signright.example/audit' },
    { t: '2026-10-05T19:00', title: 'Spectrum Enforcement Bureau unlicensed broadcast fines', url: 'search?q=unlicensed+broadcast+fines' },
    { t: '2026-10-02T02:10', title: '104.3 MHz clear channel — city', url: 'search?q=104.3+clear+channel' },
    { t: '2026-09-30T13:00', title: 'Pell Holdings Carraway Mill demolition permit', url: 'search?q=pell+holdings+carraway+mill' },
    { t: '2026-09-22T03:20', title: 'record a call-in segment in advance — radio tips', url: 'search?q=pre+record+call+in+segment' },
  ],

  glimpse: [
    { id: 'g_sickbed', author: 'cass', photo: 'c2_ph_sickbed', caption: 'calling in to the Owl from my sickbed 🤧📻 104.3 rn', t: '2026-10-17T01:50', likes: 64, comments: [{ author: 'moth', text: 'feel better!! 🦋' }, { author: 'ada', text: '❤️' }], clue: 'cass_alibi_post' },
    { id: 'g_moved', author: 'cass', photo: 'c2_ph_sign', caption: 'we MOVED 📻 Owl Hours now lives at 104.3 — same owl, new perch 🦉', t: '2026-10-03T02:30', likes: 211, comments: [{ author: 'moth', text: 'FOUND YOU 🦋' }, { author: 'me', text: 'ok ok 🦉' }, { author: 'benny', text: 'congrats on the slightly bigger felony' }] },
    { id: 'g_pell', author: 'pell', photo: 'c2_ph_lisbon', caption: 'Lisbon. Building the waterfront of tomorrow. #IberiaPropertyForum', t: '2026-10-16T22:40', likes: 38, comments: [{ author: 'pell', text: 'Back on the 21st.' }, { author: 'me', text: 'enjoy the sangria gideon. we\'ll keep your roof warm' }], clue: 'pell_lisbon' },
    { id: 'g_fest', author: 'cass', photo: 'c2_ph_festival', caption: "rain can't stop us 💛 #riverbendfest", t: '2026-08-22T17:00', likes: 97, comments: [{ author: 'me', text: 'the coat is visible from space' }, { author: 'cass', text: 'that\'s the point dumbass. nobody loses me in a crowd' }], clue: 'cass_raincoat' },
    { id: 'g_ep41', author: 'me', photo: 'c2_ph_coop', caption: 'ep 41. lights on. 🦉 104.3', t: '2026-10-16T23:55', likes: 143, comments: [{ author: 'moth', text: 'in position 🦋' }, { author: 'benny', text: 'turn it the hell UP' }] },
  ],

  bank: {
    account: 'First Harbor ••2290',
    balance: 312.18,
    tx: [
      { t: '2026-10-16T23:31', desc: 'BODEGA 24 — COFFEE, ENERGY DRINK x2', amount: -9.10 },
      { t: '2026-10-16T22:58', desc: 'SHELL — GENERATOR GAS', amount: -42.00 },
      { t: '2026-10-15T20:14', desc: 'SUDS & DUDS — DYER ST', amount: -7.25 },
      { t: '2026-10-13T14:30', desc: 'DYER ST NOTARY', amount: -15.00 },
      { t: '2026-10-05T09:00', desc: 'FENNIMORE PROPERTIES — RENT', amount: -900.00 },
      { t: '2026-10-02T11:12', desc: 'MOUSER ELECTRONICS — CRYSTAL 104.3MHz', amount: -38.40 },
      { t: '2026-10-01T00:00', desc: 'PAYROLL — VOLT REPAIR', amount: 880.00 },
      { t: '2026-09-19T14:02', desc: 'ZELLE FROM CASS ROURKE ••7731 — "generator gas"', amount: 60.00, clue: 'cass_7731' },
      { t: '2026-09-13T19:40', desc: 'SUGAR & CO BAKERY — OWL CAKE', amount: -36.00 },
    ],
  },

  calendar: [
    { id: 'c2_c_show', t: '2026-10-17T00:00', title: 'OWL HOURS — EP 41 🦉', detail: 'Cass calling in from bed (sick?). Chain the stair door.' },
    { id: 'c2_c_talk', t: '2026-10-17T04:00', title: 'Talk to Cass', detail: 'Off air. Just us.' },
    { id: 'c2_c_rhea', t: '2026-10-13T11:00', title: 'Hearth Audio — Rhea', detail: 'Bring the notary letter. I DID NOT SIGN.' },
    { id: 'c2_c_ada', t: '2026-10-18T13:00', title: "Sunday roast — Mom's", detail: 'bring the good bread' },
    { id: 'c2_c_hearing', t: '2026-10-20T10:00', title: 'Heritage hearing — Carraway Mill', detail: 'City Hall rm 3' },
    { id: 'c2_c_demo', t: '2026-10-31T07:00', title: 'MILL DEMOLITION (says Pell)', detail: 'lol no' },
  ],

  wifi: [
    { name: 'COOP_1043', lastJoined: '2026-10-17T01:44' },
    { name: 'Merrick_Home', lastJoined: '2026-10-16T22:40' },
    { name: 'VoltRepair_Shop', lastJoined: '2026-10-16T18:02' },
    { name: 'SudsDuds_FREE', lastJoined: '2026-10-15T20:12' },
    { name: 'HearthAudio-Guest', lastJoined: '2026-10-13T10:58' },
    { name: 'COOP_881', lastJoined: '2026-10-02T03:55' },
    { name: 'StBrigid_Visitor', lastJoined: '2026-09-02T03:10' },
  ],

  trace: [
    { id: 'photos', label: 'Photos — Recently Deleted', detail: 'Carve image fragments from unallocated flash storage.', needs: ['unlocked'], durationMs: 5200 },
    { id: 'msgfrag', label: 'Messages — Orphaned Fragments', detail: 'Rebuild deleted SMS records from the database write-ahead log.', needs: ['pinned:stair_photo'], needsHint: 'Need a lead first: pin evidence that someone handled this phone after Jonah fell.', durationMs: 6500 },
    { id: 'history', label: 'Browser — Cleared History', detail: 'Recover cleared Safari history rows from the WebKit cache.', needs: ['pinned:callin_plan'], needsHint: "Need a lead first: pin how Cass's call-in was supposed to reach the air.", durationMs: 5800 },
    { id: 'voice', label: 'Voicemail — Carrier Cache', detail: 'Pull undelivered voicemail audio from the carrier sync cache.', needs: ['pinned:cass_downstairs'], needsHint: 'Need a lead first: pin proof of who was really at the mill that night.', durationMs: 6000 },
  ],

  clues: [
    { id: 'hearth_deal', title: 'The Hearth deal', text: "Hearth Audio thinks Jonah signed away the show and its archive on Oct 9. He says he never signed anything.", kind: 'document', art: 'c2_ph_contract' },
    { id: 'esign_trail', title: 'Signed from CASS-IPAD', text: "SignRight audit trail: the 'Jonah Merrick' signature came from a device named CASS-IPAD on the Rourke_WrenCt network. The email was in his Trash.", kind: 'document' },
    { id: 'advance_7731', title: '$40,000 to ••7731', text: "Hearth paid the advance to an account ending 7731. Jonah's account ends 2290.", kind: 'document' },
    { id: 'cass_7731', title: 'Zelle from ••7731', text: "Cass once sent Jonah $60 for generator gas — from an account ending 7731.", kind: 'object', art: 'av_c2_cass' },
    { id: 'receipts_note', title: '"receipts" note', text: "Jonah's locked note: the forged signature, the money, and his plan to confront Cass after the show, off air.", kind: 'document' },
    { id: 'confront', title: "'you signed my name Cass'", text: 'Deleted text, 01:24: Jonah confronts Cass about the forged signature and the $40,000.', kind: 'event', art: 'av_c2_cass' },
    { id: 'cass_sick', title: "Cass: 'doing my segment from bed'", text: "Cass said she had a cold and would ring the show line at 1:45.", kind: 'person', art: 'av_c2_cass' },
    { id: 'cass_downstairs', title: "'i'm not sick. i'm downstairs.'", text: "Deleted texts from Cass, 01:22–01:26: she was at the mill, asking Jonah to come down to the 3rd-floor landing.", kind: 'event', art: 'av_c2_cass' },
    { id: 'callin_plan', title: 'Run sheet: call-ins', text: "Call-ins ring Jonah's own phone and are patched to channel 4. Cass was due at 01:45. The deck lives on the Coop Wi-Fi.", kind: 'document' },
    { id: 'playout_cmd', title: 'Deck: ▶ cass_callin_ep41.wav', text: "Recovered browser history: at 01:44 this phone told the Coop deck to play a 28-minute file called cass_callin_ep41.wav.", kind: 'document' },
    { id: 'cass_alibi_post', title: "The 'sickbed' post", text: "Cass's 01:50 post: 'calling in to the Owl from my sickbed'. Embedded capture time of the photo: Oct 16, 21:05.", kind: 'document', art: 'c2_ph_sickbed' },
    { id: 'monologue', title: "'talking to nobody'", text: "Mothwing, 02:01: Cass on air is 'talking to nobody. like a monologue. she's not answering anything anyone asks'.", kind: 'event', art: 'av_c2_moth' },
    { id: 'stair_photo', title: 'Stairwell, 01:41', text: "Deleted burst photo taken 01:41 in the stairwell: a rail, a stencilled '3', a yellow sleeve. Deleted from the phone at 01:57.", kind: 'place', art: 'c2_ph_stairs' },
    { id: 'phone_carried', title: 'Phone climbed back up', text: "Barometer log: at 01:43 the phone rose two floors, from the 3rd floor back to roof level.", kind: 'event' },
    { id: 'moth_witness', title: 'Yellow raincoat on the landing', text: "Mothwing saw someone in a yellow raincoat on the landing with Jonah at 01:39, then riding off alone at 02:04.", kind: 'person', art: 'av_c2_moth' },
    { id: 'cass_raincoat', title: "Cass's yellow raincoat", text: "Cass Rourke owns a bright yellow raincoat — she's wearing it in two photos.", kind: 'object', art: 'c2_ph_festival' },
    { id: 'cass_vm', title: 'Payphone voicemail, 05:49', text: "From the Dyer St payphone, three minutes before the 911 call: 'It's me... I came back... I'm calling someone right now.' A woman's voice.", kind: 'event' },
    { id: 'pell_threat', title: "Pell: 'before someone falls off it'", text: 'The mill owner told Jonah to get off the roof "before someone falls off it."', kind: 'person', art: 'av_c2_pell' },
    { id: 'pell_ooo', title: "Pell's auto-reply", text: 'Jonah emailed Pell at 23:08 on show night. Auto-reply: in Lisbon, Oct 14–21.', kind: 'document' },
    { id: 'pell_lisbon', title: 'Pell in Lisbon', text: "Pell's own post at 22:40: a Lisbon rooftop, a conference lanyard. 'Back on the 21st.'", kind: 'place', art: 'c2_ph_lisbon' },
    { id: 'moth_creepy', title: "Mothwing: 'i always know where you are'", text: "A superfan who parks in the mill lot every show night with a thermos.", kind: 'person', art: 'av_c2_moth' },
    { id: 'burner_tic', title: "Unknown number: 'ok ok'", text: "The anonymous number blames 'Pell's people' and asks you to put the phone down. Writes 'ok ok'.", kind: 'person', art: 'av_unknown' },
    { id: 'cass_confess', title: "'it was me at the payphone'", text: "The unknown number: 'it was me at the payphone. i went back... x c'", kind: 'event', art: 'av_unknown' },
  ],

  questions: [
    {
      id: 'q_motive', prompt: 'What did Jonah find out in the week before he fell?',
      options: [
        { id: 'pell', label: 'Gideon Pell was bribing the city to demolish the mill' },
        { id: 'forged', label: 'Cass forged his signature to sell the show and kept the $40,000' },
        { id: 'feds', label: 'The Spectrum Bureau had found his transmitter' },
        { id: 'stalker', label: 'A listener was stalking him' },
      ],
      answer: 'forged', evidence: ['hearth_deal', 'esign_trail', 'advance_7731', 'cass_7731', 'receipts_note', 'confront'],
      explain: "The e-signature came from CASS-IPAD, and the advance went to ••7731 — the account Cass once paid him gas money from.",
    },
    {
      id: 'q_stairs', prompt: 'Who was on the 3rd-floor landing with Jonah when he fell?',
      options: [
        { id: 'pell', label: 'Gideon Pell', art: 'av_c2_pell' },
        { id: 'cass', label: 'Cass Rourke', art: 'av_c2_cass' },
        { id: 'moth', label: 'Mothwing', art: 'av_c2_moth' },
        { id: 'whitlock', label: 'Officer Dana Whitlock' },
        { id: 'ada', label: 'Ada Merrick', art: 'av_c2_ada' },
      ],
      answer: 'cass', evidence: ['stair_photo', 'cass_downstairs', 'confront', 'moth_witness', 'cass_raincoat', 'phone_carried', 'cass_confess'],
      explain: "Cass texted 'i'm downstairs... 3rd floor landing'. The 01:41 photo and Mothwing both show a yellow raincoat — Cass's coat.",
    },
    {
      id: 'q_alibi', prompt: "How was Cass 'live on air from her sickbed' at 01:45?",
      options: [
        { id: 'live', label: 'She really called in from home' },
        { id: 'file', label: "A pre-recorded file, started from Jonah's own phone at 01:44" },
        { id: 'jonah', label: 'Jonah queued an old segment before he went downstairs' },
        { id: 'moth', label: 'Mothwing imitated her voice' },
      ],
      answer: 'file', evidence: ['playout_cmd', 'callin_plan', 'cass_alibi_post', 'monologue'],
      explain: "Call-ins ring Jonah's phone — and no call from Cass is in the log. At 01:44, three minutes after the fall, his phone started cass_callin_ep41.wav on the deck.",
    },
    {
      id: 'q_pell', prompt: 'Gideon Pell threatened Jonah. Where was he that night?',
      options: [
        { id: 'mill', label: 'At the mill' },
        { id: 'lisbon', label: 'In Lisbon, at a property conference' },
        { id: 'office', label: 'At the Pell Holdings office' },
        { id: 'hearing', label: 'Preparing for the heritage hearing at City Hall' },
      ],
      answer: 'lisbon', evidence: ['pell_ooo', 'pell_lisbon'],
      explain: "His auto-reply and his own 22:40 post put him in Lisbon from Oct 14 to 21.",
    },
    {
      id: 'q_911', prompt: 'Who made the anonymous 911 call from the Dyer Street payphone at 05:52?',
      options: [
        { id: 'moth', label: 'Mothwing', art: 'av_c2_moth' },
        { id: 'cass', label: 'Cass Rourke', art: 'av_c2_cass' },
        { id: 'ada', label: 'Ada Merrick', art: 'av_c2_ada' },
        { id: 'benny', label: 'Benny Szabo', art: 'av_c2_benny' },
      ],
      answer: 'cass', evidence: ['cass_vm', 'cass_confess'],
      explain: "Three minutes before the 911 call, the same payphone left a voicemail on Jonah's phone: 'It's me... I came back.' Ada was on shift at St. Brigid's.",
    },
  ],

  events: [
    { id: 'e2_burner1', kind: 'text', when: ['unlocked'], minPins: 4, delayMs: 4000, thread: 'th_c2burner', contact: 'c2burner', text: "Pell's people know someone's poking around in the Owl's phone. ok ok — just put it down and let him rest.", clue: 'burner_tic' },
    { id: 'e2_h_tic', kind: 'handler', when: ['event:e2_burner1'], delayMs: 5000, text: "Burner phones are cheap. Habits aren't. Any idiot can buy a shit phone at a gas station — nobody can buy new thumbs. Read that one twice." },
    { id: 'e2_h_7731', kind: 'handler', when: ['pinned:advance_7731'], delayMs: 2500, text: "Forty thousand dollars. That's a hell of a lot of money for a show that runs off a car battery. Account numbers have a way of turning up twice — keep that one in your head." },
    { id: 'e2_burner2', kind: 'text', when: ['recovered:msgfrag'], delayMs: 6000, thread: 'th_c2burner', contact: 'c2burner', text: "you don't know what it was like on those stairs. he grabbed my sleeve and the rail just went. i didn't push him. i didn't." },
    { id: 'e2_confess', kind: 'text', when: ['recovered:voice'], delayMs: 7000, thread: 'th_c2burner', contact: 'c2burner', text: "it was me at the payphone. i went back. i should never have left him. tell ada i'm sorry. x c", clue: 'cass_confess' },
    { id: 'e2_h_ready', kind: 'handler', when: ['unlocked'], minPins: 12, delayMs: 3000, text: "That's a heavy board. If you can back every answer, open the Case Report. Ada's waiting on us, and she's a nurse — she knows exactly how long people can wait, and it's not long." },
  ],

  hints: [
    { until: 'unlocked', text: 'Ada says the code is wherever the show lives on the dial. The sign on the wallpaper is out of date — read the lock-screen notifications in order. Four digits, no dot.' },
    { until: 'seen:th_rhea', after: ['unlocked'], text: 'Start in Messages. Someone at Hearth Audio is very excited about a deal Jonah never mentioned.' },
    { until: 'note:n_receipts', after: ['unlocked'], text: "Jonah's locked note uses the Coop Wi-Fi password. Ada asked him about it — check the voicemails." },
    { until: 'pinned:cass_7731', after: ['pinned:advance_7731'], text: 'The advance went to an account ending 7731. Jonah\'s bank history has seen that number before.' },
    { until: 'recovered:photos', after: ['unlocked'], text: 'TRACE can carve deleted photos out of storage. Run the Photos job.' },
    { until: 'pinned:stair_photo', after: ['recovered:photos'], text: 'Open the recovered stairwell photo. When was it deleted — and could Jonah have deleted anything then? Pin it.' },
    { until: 'recovered:msgfrag', after: ['pinned:stair_photo'], text: 'TRACE can now rebuild deleted messages. Look at what was said between 01:20 and 01:45.' },
    { until: 'pinned:callin_plan', after: ['unlocked'], text: 'Read the EP 41 run sheet in Notes. How did call-ins actually reach the air? Pin it.' },
    { until: 'recovered:history', after: ['pinned:callin_plan'], text: "Cass was meant to ring Jonah's phone at 01:45. Check the call log for that call. Then run TRACE on the browser history — the deck is a web page." },
    { until: 'pinned:cass_alibi_post', after: ['unlocked'], text: "Cass posted her alibi on Glimpse. Open the photo's info sheet and look at the clock in the picture." },
    { until: 'pinned:pell_ooo', after: ['unlocked'], text: 'Pell looks guilty. Jonah emailed him that night — what came back?' },
    { until: 'recovered:voice', after: ['pinned:cass_downstairs'], text: "Someone called Jonah's phone from a payphone at 05:48. TRACE's carrier cache may still hold what they said." },
    { until: 'report:filed', after: ['unlocked'], text: 'You have what you need. Open the Case Report and back every answer with a pinned clue.' },
  ],

  handlerIntro: "New phone, new night. Pirate radio, a condemned mill and a grown-ass man who calls himself the Owl. Christ on a bike. His sister swears he'd never leave this thing behind — and yet there it was, upstairs, like a dog left on the porch. Start with the lock screen.",

  epilogue: {
    solved: [
      'Cass Rourke was arrested at her apartment on Wren Court on the morning of October 23. The yellow raincoat was hanging by the door.',
      "She told it the way you read it. The forged signature. The forty thousand. 'Come down, not on air.' On the third-floor landing he grabbed her sleeve, and the rail he'd been meaning to fix gave way. She didn't push him. She didn't stay, either.",
      'She carried his phone back up to the Coop, started the call-in she had recorded that afternoon, posted a photo she had taken at nine, and deleted everything that put her on those stairs. Then she rode home and listened to her own voice on the radio, talking to nobody.',
      "At 5:48 she went back. She called his phone from the payphone on Dyer Street, then she called 911. She never gave her name. It's the only reason the doctors had a chance.",
      'Hearth Audio voided the contract. On November 2, Jonah Merrick opened his eyes at St. Brigid\'s with Ada holding his hand. The first thing he asked was whether anyone had kept the show on air.',
      'Someone had. Every Friday, midnight to four, from a car in the mill lot: 104.3, the Night Loop, and one new dedication. 🦋',
    ],
    partial: [
      'Your report went to the DA with gaps in it.',
      'You found some of what happened on those stairs — but a fall with no witness is just a fall, and a name without proof is just a rumor.',
      'The phone still knows. Go back to the minutes between 01:20 and 02:13.',
    ],
  },
};
