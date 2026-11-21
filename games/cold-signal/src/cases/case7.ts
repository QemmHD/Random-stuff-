import type { CaseFile } from '../types';

// CASE 07 — THE COPYIST
// 1996: Hollin Museum director Conrad Vey sent Agathe Lorne's "Girl with a Storm
// Lantern" (1891) out for a seven-month "conservation". He privately paid copyist
// Hanne Marek $4,000 cash for a full-size copy "for the conservation period". Hanne
// signed every copy the way she always did: a tiny elephant hawk-moth painted in the
// third pane of the lantern. Vey hung her copy and kept the original. It hangs
// above his desk at home, where he tells magazines it's "a copy, naturally".
// 2019: Hanne saw her moth on the museum wall. She wrote to Vey; he threatened her
// with lawyers. She died in 2024.
// 2025: her daughter Ilse Kade (née Marek, married name) took a night-guard job at
// the Hollin. She photographed the moth, anonymously tipped the new chief
// conservator Dr. Priya Anand ("test the third pane"), and Anand booked a pigment
// analysis for Nov 2. Vey, now board chair, asked for the date. Then he signed a
// work order: a sprinkler "dry test" in Gallery 6 at 04:00 on Oct 31, "DO NOT COVER
// OR RELOCATE WORKS". The heads were live. The proof would drown.
// Oct 30–31: Ilse kept her Friday shift, bought a padded transport case, and at 02:16
// bypassed the picture sensor with her own badge ("conservation move"). At 02:41
// she carried the painting out of the loading dock to her car. She put her phone in
// staff locker 14 so nobody could track her, leaving a note for Anand locked with
// her mother's moth. At 04:00 the sprinklers soaked an empty wall. Vey badged in at
// 05:49, eleven minutes before anyone "discovered" a theft, and told the press a
// professional crew had taken the painting and he feared for the guard.
// Twist: the owner is the "thief", the painting she stole was her mother's, and the
// real Lorne is in the board chair's study.
// Red herring: copyist Felix Lunn (asked about the sensors, has a buyer who wants an
// "aged" copy by Nov 1). He was at the Hollis 24-hour drawing marathon, and the door
// log shows only Ilse and the contractor.

export const case7: CaseFile = {
  id: 'the-copyist',
  number: '07',
  title: 'The Copyist',
  tagline: 'Four hundred nights she guarded the most famous painting in the city. Then she took it home.',
  difficulty: 3,
  cover: 'cover_case7',
  owner: { name: 'Ilse Kade', age: 41, summary: 'Night security officer, Hollin Museum of Art, 19 months. Every shift ended on the bench in Gallery 6.' },
  status: 'PERSON OF INTEREST',
  deviceCondition: 'FOUND POWERED OFF IN STAFF LOCKER 14 · 100% READABLE',
  briefing: [
    "Ilse Kade, 41. Night security officer at the Hollin Museum of Art for nineteen months. Every shift ended the same way, on the bench in Gallery 6, facing the museum's most famous painting: Agathe Lorne's Girl with a Storm Lantern (1891).",
    'At 06:00 on Saturday, October 31, the day guard found the wall in Gallery 6 empty and the floor under an inch of water. The Lorne, insured for $14 million, was gone. So was Ilse.',
    'Board chair Conrad Vey told reporters it was "a professional crew" and that he "feared for the safety" of the night guard. That afternoon police found her phone, powered off, in her staff locker.',
    "Two days earlier the Hollin's chief conservator, Dr. Priya Anand, had booked the painting for pigment analysis on November 2. Nobody at the museum will say why.",
    'Her husband Sami Kade: "Her passcode was the only time in that building that never changes. She always uses the twenty-four-hour clock. Hours, minutes, seconds." Police can\'t open it. Maybe you can.',
  ],
  phoneDate: '2026-11-01',
  phoneTime: '16:40',
  lock: {
    passcode: '144715',
    hint: 'the stopped clock: hours, minutes, seconds, 24-hour time',
    wallpaper: 'wall_c7_lock',
    notifications: [
      { app: 'glimpse', title: 'Hollin Museum', text: '95 years ago this afternoon, the Gallery 6 bracket clock stopped during a fire drill. We never wound it again. 🕰️', t: '2026-10-30T14:47' },
      { app: 'messages', title: 'Sami ❤️', text: 'please just tell me you\'re ok. one word. any word.', t: '2026-11-01T12:10' },
      { app: 'messages', title: 'Gil Sato', text: 'ILSE. where are you. the Six is empty and soaked.', t: '2026-10-31T06:04' },
      { app: 'calendar', title: 'G6 analysis — Dr. A', text: 'Mon 9:00', t: '2026-11-02T09:00' },
    ],
  },
  homeWallpaper: 'wall_c7_home',

  contacts: [
    { id: 'sami', name: 'Sami ❤️', avatar: 'av_c7_sami', number: '(555) 318-2207', label: 'husband' },
    { id: 'anand', name: 'Dr. Priya Anand', avatar: 'av_c7_anand', number: '(555) 318-6100', label: 'Conservation' },
    { id: 'gil', name: 'Gil Sato', avatar: 'av_c7_gil', number: '(555) 318-6144', label: 'Head of Security' },
    { id: 'felix', name: 'Felix Lunn', avatar: 'av_c7_felix', number: '(555) 318-9031', label: 'G6 copyist 🎨' },
    { id: 'bea', name: 'Bea Ostrowski', avatar: 'av_c7_bea', number: '(555) 318-6150', label: 'day shift' },
    { id: 'mum', name: 'Mum (Hanne)', avatar: 'av_c7_hanne', number: '(555) 302-1952' },
    { id: 'vey', name: 'Conrad Vey', avatar: 'av_c7_vey', number: '(555) 318-6001', label: 'Board Chair (staff directory)' },
    { id: 'c7unknown', name: '(555) 790-0613', avatar: 'av_unknown', number: '(555) 790-0613' },
  ],

  threads: [
    {
      id: 'th_sami', contact: 'sami', messages: [
        { from: 'them', text: 'found your mum\'s sketchbooks in the loft. like 40 pages of elephant hawk-moths. the pink and olive ones. want them downstairs?', t: '2026-06-14T11:20', photo: 'c7_ph_sketchbook', clue: 'hawkmoth' },
        { from: 'me', text: 'keep them. she hid one in every copy she ever painted. her signature. "a copy is not allowed to be perfect, Ilsie."', t: '2026-06-14T11:31', clue: 'hawkmoth' },
        { from: 'them', text: 'you\'re quiet this week. is it the analysis thing, or did I leave the seat up again', t: '2026-10-28T19:02' },
        { from: 'me', text: "it's happening, Sami. Monday. after 30 years somebody is finally going to look.", t: '2026-10-28T19:10' },
        { from: 'them', text: 'then monday night we celebrate. wine, the good sheets, and you not smelling like floor polish and old men\'s regret', t: '2026-10-28T19:12' },
        { from: 'me', text: "it's a date. I'll even shave my legs. both of them. that's how you know it's serious", t: '2026-10-28T19:14' },
        { from: 'them', text: 'be still my heart (and other organs)', t: '2026-10-28T19:15' },
        { from: 'me', text: 'they scheduled a sprinkler test in Gallery 6. 4am tonight. "do not cover the works". three days before the analysis. Sami they\'re going to drown her.', t: '2026-10-30T23:40', clue: 'sami_tonight', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: 'call the police. Ilse. call the fucking police', t: '2026-10-30T23:44', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: "and say what? the board chair signed a work order to test the pipes. they'd hand her straight back to him.", t: '2026-10-30T23:46', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: "I'm taking her off the wall. the case is in the car. my phone goes in the locker so nobody can follow it. I love you. don't lie for me, just don't know anything.", t: '2026-10-31T01:58', clue: 'sami_tonight', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: 'Ilse. police at the door. they say a crew took the painting and you might be hurt. please', t: '2026-10-31T09:15' },
        { from: 'them', text: "please just tell me you're ok. one word. any word.", t: '2026-11-01T12:10' },
      ],
    },
    {
      id: 'th_anand', contact: 'anand', messages: [
        { from: 'them', text: "Ilse, odd one. Someone sent me an anonymous note about the Lorne: 'test the third pane of the lantern.' You sit in that room every night. Seen anything strange?", t: '2026-10-14T10:05' },
        { from: 'me', text: "Just me and the clock. Maybe somebody loves her as much as I do.", t: '2026-10-14T23:50' },
        { from: 'them', text: "I'll need G6 after close on Nov 1 to set up the XRF. Analysis is Monday Nov 2, 9am. FYI the board chair asked me for the date personally. In 20 years no chair has ever cared about pigments. Usually they only care about the gala bar tab and which donor's wife they're seated next to.", t: '2026-10-26T15:30', clue: 'anand_booked' },
        { from: 'me', text: "I'll keep her company till then.", t: '2026-10-26T23:10' },
        { from: 'them', text: 'Ilse, the police are here. The wall is empty. Please be all right.', t: '2026-10-31T08:20' },
        { from: 'them', text: "If anyone is reading this: I'd still like to test her. If she still exists.", t: '2026-11-01T10:45' },
      ],
    },
    {
      id: 'th_gil', contact: 'gil', messages: [
        { from: 'them', text: "Heads up. Facilities sprinkler flow test in G6, Fri night 03:55–04:25. Contractor has his own badge. Chair says do NOT cover or move works, test needs 'normal gallery conditions'. His words. Work order's on the desk.", t: '2026-10-29T16:12', clue: 'work_order' },
        { from: 'me', text: 'Gil. That is an 1891 oil on canvas under a sprinkler head.', t: '2026-10-29T16:20' },
        { from: 'them', text: "Said the same. He says G6 is a 'dry test', nothing discharges. Above my pay grade, Ilse. Everything's above my pay grade. The vending machine is above my pay grade.", t: '2026-10-29T16:24' },
        { from: 'them', text: 'ILSE. where are you. the Six is empty and soaked.', t: '2026-10-31T06:04' },
        { from: 'them', text: "Vey's already here. Came in at ten to six, said he wanted to see 'the test results'. Before any of us knew. Police on the way.", t: '2026-10-31T06:20', clue: 'gallery_soaked' },
        { from: 'them', text: "Off the record: he's telling everyone it was a crew. I've watched the tape. There's no crew. Just you, and you were careful. Ilse, what the hell did you do?", t: '2026-10-31T19:40' },
      ],
    },
    {
      id: 'th_felix', contact: 'felix', messages: [
        { from: 'them', text: 'night guard! settle a bet. which sensors are on the Lorne? asking for my painting of the gallery at night, honest', t: '2026-09-03T21:14', clue: 'felix_alarm' },
        { from: 'me', text: 'nice try. paint the clock.', t: '2026-09-03T23:02' },
        { from: 'them', text: 'the clock is BORING. also i am extremely high. ok the clock is less boring now. the clock is looking at me ilse', t: '2026-09-03T23:05' },
        { from: 'me', text: 'go home felix. drink water. stop sexting the clock', t: '2026-09-03T23:07' },
        { from: 'them', text: "got a BUYER for my copy!! a Mr. Albrecht, cash, wants it by Nov 1. he asked if I could 'age it a bit'. weird right", t: '2026-10-12T18:30', clue: 'felix_buyer' },
        { from: 'me', text: "Felix. Permit rule 4: a copy must be at least 10% smaller than the original. Don't age anything. Don't be my mother's story.", t: '2026-10-12T23:40' },
        { from: 'them', text: '??? ok. 10% smaller, no aging, got it. your mother painted?', t: '2026-10-12T23:44' },
        { from: 'them', text: "I just heard. I was at the Hollis drawing marathon ALL NIGHT, forty people saw me. one of them was the nude model, Gary, who can vouch for me with his whole entire everything. the cops are going to look at me first aren't they", t: '2026-10-31T07:30', photo: 'c7_ph_marathon', clue: 'felix_marathon' },
      ],
    },
    {
      id: 'th_bea', contact: 'bea', messages: [
        { from: 'them', text: "swap? I'll do your Fri if you do my Sun. my sister's in town and she wants to 'go out-out'. last time she went out-out she woke up engaged to a DJ. pray for my liver", t: '2026-10-30T18:00' },
        { from: 'me', text: 'no, I want Friday. I need the quiet. sorry Bea x', t: '2026-10-30T18:12', clue: 'chose_friday' },
        { from: 'them', text: 'Ilse the wall is EMPTY. there is water everywhere. where are you??', t: '2026-10-31T06:01' },
        { from: 'them', text: "the contractor's still here, white as a sheet. he says the heads in 6 were LIVE, not dry. he says 'whoever wrote dry test on that order lied to me'.", t: '2026-10-31T06:40', clue: 'live_heads' },
        { from: 'them', text: "I'm feeding your cactus in the guard room. Only prick in this building I actually like. Come back and do it yourself.", t: '2026-11-01T14:00' },
      ],
    },
    {
      id: 'th_mum', contact: 'mum', messages: [
        { from: 'them', text: 'Ilsie, I went to the Hollin today. Sat in Gallery 6 for an hour. The old clock is still stopped.', t: '2019-05-11T16:40' },
        { from: 'me', text: 'and? still love her?', t: '2019-05-11T16:52' },
        { from: 'them', text: "I'll ring you.", t: '2019-05-11T16:53' },
        { from: 'them', text: "Promise me you won't go chasing it. That man is powerful and I am tired.", t: '2024-02-10T20:15' },
        { from: 'me', text: 'I promise, Mum.', t: '2024-02-10T20:20' },
        { from: 'me', text: 'Mum?', t: '2024-03-02T09:10' },
        { from: 'me', text: "first night shift tonight. I'm sorry. I'm breaking my promise. you'd have done it too.", t: '2025-03-03T21:30' },
      ],
    },
  ],

  photos: [
    { id: 'hp_c7_sami', art: 'hp_c7_sami', t: '2026-10-20T22:05', place: 'Kade home — bedroom', orientation: 'portrait', caption: "Sent by Sami. Silk robe, rose between his teeth, candles everywhere, cat glaring from the pillow. 'the good sheets are ON'.", hidden: true },
    { id: 'c7_ph_gallery6', art: 'c7_ph_gallery6', t: '2026-09-18T03:10', place: 'Hollin Museum — Gallery 6', orientation: 'landscape', caption: 'Gallery 6 at night under guard lighting. On the far wall, the Lorne: a girl on a dark shore holding up a four-paned storm lantern. Left of it, a gilt bracket clock on a bracket. In the foreground, a leather bench with a thermos and a guard radio.' },
    { id: 'c7_ph_moth', art: 'c7_ph_moth', t: '2025-03-19T03:22', place: 'Hollin Museum — Gallery 6', orientation: 'portrait', caption: 'Recovered. Macro photo through a jeweller\'s loupe of the lantern in the Lorne, a torch beam raking across the varnish. Deleted Mar 2025.', clue: 'moth_macro', deletedUntil: 'recovered:photos' },
    { id: 'c7_ph_easel1996', art: 'c7_ph_easel1996', t: '1996-04-22T14:00', place: 'Hollin Museum — conservation studio', orientation: 'portrait', caption: 'Recovered. Scan of a 1996 print: a woman at a tall easel in a skylit studio, an unframed canvas on a second easel beside her. Pencil writing on the border.', clue: 'hanne_easel', deletedUntil: 'recovered:photos' },
    { id: 'c7_ph_ledger', art: 'c7_ph_ledger', t: '2024-04-02T12:00', place: 'Tallow Lane Studios, unit 3', orientation: 'portrait', caption: 'Recovered. A worn ledger open on a paint-spattered studio table, fountain-pen entries.', clue: 'hanne_ledger', deletedUntil: 'recovered:photos' },
    { id: 'c7_ph_workorder', art: 'c7_ph_workorder', t: '2026-10-29T23:10', place: 'Hollin Museum — guard desk', orientation: 'portrait', caption: 'A printed work order taped to the guard desk beside a CCTV monitor.', clue: 'work_order' },
    { id: 'c7_ph_study', art: 'c7_ph_study', t: '2025-12-04T22:30', place: 'Interiors Quarterly (screenshot)', orientation: 'landscape', caption: 'Screenshot of a magazine spread: a silver-haired man in a book-lined study, a framed painting above his desk.', clue: 'vey_study' },
    { id: 'c7_ph_studyzoom', art: 'c7_ph_studyzoom', t: '2025-12-04T22:41', place: 'Interiors Quarterly (screenshot, zoomed)', orientation: 'portrait', caption: 'The same screenshot, pinched in on the painting above the desk. Red phone markup over the image.', clue: 'clear_lantern' },
    { id: 'c7_ph_sketchbook', art: 'c7_ph_sketchbook', t: '2026-06-14T11:19', place: 'Kestrel Court', orientation: 'landscape', caption: 'Sent by Sami. An open sketchbook on a kitchen table, both pages covered in moth studies.', clue: 'hawkmoth' },
    { id: 'c7_ph_memorial', art: 'c7_ph_memorial', t: '2024-05-10T19:00', place: 'Tallow Lane Studios', orientation: 'portrait', caption: 'A small exhibition flyer pinned to a brick wall, with a photo of a smiling white-haired woman holding a paintbrush.', clue: 'nee_marek' },
    { id: 'c7_ph_marathon', art: 'c7_ph_marathon', t: '2026-10-31T03:00', place: 'Hollis School of Art', orientation: 'landscape', caption: 'A packed art studio at night, students at easels around a draped model, a banner and a whiteboard. Felix Lunn waves a charcoal stick from the front row.', clue: 'felix_marathon' },
    { id: 'c7_ph_felixcopy', art: 'c7_ph_felixcopy', t: '2026-10-10T15:00', place: 'Hollin Museum — Gallery 6', orientation: 'landscape', caption: 'Felix Lunn\'s easel and copy beside the Lorne by day. A permit tag on the easel leg.' },
    { id: 'c7_ph_case', art: 'c7_ph_case', t: '2026-10-29T17:30', place: 'ArtCrate Supply', orientation: 'landscape', caption: 'Recovered. The open boot of a hatchback holding a black padded transport case with a printed label. Deleted Oct 30.', clue: 'art_case', deletedUntil: 'recovered:photos' },
  ],

  notes: [
    {
      id: 'n_anand', title: 'For Dr. Anand (if you are not Vey)', t: '2026-10-31T01:50', lock: { password: 'deilephila', hint: "Mum's signature, by the name the scientists give it. First word only." }, clue: 'ilse_reason',
      body: "Dr. Anand,\n\nMy name is Ilse Kade. I was born Ilse Marek. My mother was Hanne Marek, a copyist. I sent you the note about the third pane.\n\nIn March 1996 Conrad Vey paid my mother $4,000 cash to paint a full-size copy of the Lorne 'for the conservation period'. She signed it the way she signed every copy: an elephant hawk-moth in the third pane of the lantern. Vey collected it himself, at night. The painting that came back from 'conservation' and has hung in Gallery 6 for thirty years is my mother's. The Lorne is above Vey's desk at home. He told a magazine it's a copy. Look at the lantern: no moth.\n\nOn Thursday Vey signed a work order for a sprinkler 'dry test' over the uncovered painting at 4am tonight, three days before your analysis. It isn't a dry test. If the canvas is ruined, nobody can ever test the third pane.\n\nSo at quarter past two I'm going to bypass the sensor with my own badge and take her off the wall, and at twenty to three I'll carry her out of the dock. By the time the water comes she'll be dry, in a climate-sealed case, somewhere my mother loved.\n\nI'm leaving this phone in my locker so nobody can follow it to her. On Monday morning I'll bring her to you at the State Conservation Lab, before anyone else can touch her. Test her. Then do what you want with me.\n\nI'm not stealing a $14 million painting. I'm taking my mother home.\n\n— Ilse",
    },
    { id: 'n_nights', title: 'G6 — nights', t: '2026-10-29T03:40', body: "Night 1: clock says 2:47. It will always say 2:47.\nNight 17: found it. third pane. hello, Mum.\nNight 212: Felix's copy has no moth. Good boy.\nNight 389: Vey walked through alone at 23:00. Stood in front of her for nine minutes. Didn't see me on the bench. He never sees the guards.\nNight 401: Dr. A booked the analysis. 2 Nov.\nNight 403: work order. 'Do not cover.' He's going to drown her." },
    { id: 'n_copies', title: 'Things Mum taught me about copies', t: '2025-02-20T22:00', body: "- A legal copy is never the same size. Museum rule: at least 10% smaller.\n- Never sign the front. Never age it. Never sell it as anything but a copy.\n- Leave one honest mistake. Hers was the moth.\n- If anyone ever asks you to break the first three rules, they're not buying a copy. They're buying an alibi." },
    { id: 'n_moth', title: 'moth', t: '2025-02-18T01:12', body: "Mum's moth: pink & olive. 'Elephant' because the caterpillar looks like a trunk. She said the proper name sounded like a spell.\nLook up the proper name." },
  ],

  mail: [
    { id: 'm_doorlog', from: 'Hollin Security System', fromAddr: 'nightlog@hollinmuseum.example', to: 'Security staff', subject: 'After-hours access — Fri Oct 30 → Sat Oct 31', t: '2026-10-31T06:05', folder: 'inbox', clue: 'door_log', body: "HOLLIN MUSEUM — AFTER-HOURS ACCESS\n\n21:58  Staff entrance — I. KADE (badge 0417) IN\n22:05  Galleries armed\n02:16  Gallery 6 — picture sensor BYPASS — 'conservation move' — badge 0417\n02:41  Loading dock — badge 0417 OUT\n02:49  Loading dock — badge 0417 IN\n03:52  Staff entrance — CONTRACTOR (Facilities, badge C-22) IN\n04:00  Gallery 6 — sprinkler zone 6 — FLOW TEST START\n04:24  Staff entrance — CONTRACTOR OUT\n05:02  Staff entrance — badge 0417 OUT\n05:49  Staff entrance — C. VEY (board) IN\n06:00  Staff entrance — B. OSTROWSKI IN\n\nNo other badges. No forced entry events." },
    { id: 'm_press', from: 'Hollin Museum — Communications', fromAddr: 'press@hollinmuseum.example', to: 'All staff', subject: 'Statement: theft from Gallery 6', t: '2026-10-31T11:00', folder: 'inbox', clue: 'crew_story', body: "Staff,\n\nThe following statement from Board Chair Conrad Vey has been released to the press:\n\n\"In the early hours of this morning a professional crew removed Agathe Lorne's Girl with a Storm Lantern from Gallery 6. A malfunction in the sprinkler system during the theft caused water damage. Our night officer, Ilse Kade, has not been located and we fear for her safety. We are cooperating fully with police.\"\n\nPlease direct all media enquiries to this office." },
    { id: 'm_hr', from: 'Hollin Museum — HR', fromAddr: 'hr@hollinmuseum.example', to: 'Security staff', subject: 'Reminder: personal devices on gallery floors', t: '2025-03-01T09:00', folder: 'inbox', body: 'Reminder that personal devices carried on the gallery floors may be subject to spot checks by the Head of Security, to protect the collection from unauthorised photography.\n\nWelcome to all new night staff!' },
    { id: 'm_tip', from: 'a friend of the lantern', fromAddr: 'lantern.friend@quietmail.example', to: 'p.anand@hollinmuseum.example', subject: 'The Lorne — third pane', t: '2026-10-13T03:31', folder: 'sent', clue: 'anon_tip', deletedUntil: 'recovered:mailpurge', body: "Dr. Anand,\n\nTest the third pane of the lantern. Under a loupe you'll find a moth that Agathe Lorne never painted, and titanium white under it, a pigment that didn't exist in 1891.\n\nIn 1996 the Lorne left the building for seven months of 'conservation'. Ask who signed it out, and who signed it back in.\n\n— a friend of the lantern" },
    { id: 'm_veyreply', from: 'Hanne Marek', fromAddr: 'hanne.marek@oldmail.example', to: 'Ilse', subject: 'Fwd: Your letter of 14 May', t: '2019-06-02T10:15', folder: 'trash', clue: 'vey_reply', deletedUntil: 'recovered:mailpurge', body: "see? — Mum\n\n---------- Forwarded ----------\nFrom: Conrad Vey, Director\nTo: Mrs. H. Marek\n\nMrs. Marek,\n\nThe Hollin's Lorne was examined and authenticated on its return from conservation in 1996. Your suggestion that it is a copy painted by you is distressing and entirely baseless.\n\nPlease do not write to the museum again. If you do, our counsel will respond.\n\nC. Vey" },
    { id: 'm_artcrate', from: 'ArtCrate Supply', fromAddr: 'orders@artcrate.example', to: 'Ilse Kade', subject: 'Order ready for pickup — #AC-55120', t: '2026-10-29T12:00', folder: 'inbox', clue: 'art_case', body: 'Your order is ready for pickup today after 5 PM:\n\n1 × Padded art transport case, 40 × 52 in, climate-sealed, foam-lined — $389.00\n\nThank you for choosing ArtCrate.' },
    { id: 'm_statelab', from: 'Ilse Kade', fromAddr: 'ilse.kade@kestrelmail.example', to: 'State Conservation Lab — Front Desk', subject: 'Monday drop-off hours?', t: '2026-10-30T13:20', folder: 'sent', body: 'Hello, what time does your front desk open on Monday mornings, and can items be left for a named conservator?\n\nThank you.' },
  ],

  calls: [
    { contact: 'sami', t: '2026-11-01T12:00', dir: 'missed' },
    { contact: 'c7unknown', t: '2026-11-01T09:10', dir: 'missed' },
    { contact: 'gil', t: '2026-10-31T06:09', dir: 'missed' },
    { contact: 'bea', t: '2026-10-31T06:02', dir: 'missed' },
    { contact: 'sami', t: '2026-10-30T23:50', dir: 'out', duration: '14:02' },
    { contact: 'gil', t: '2026-10-29T16:30', dir: 'out', duration: '3:12' },
    { contact: 'anand', t: '2026-10-26T15:45', dir: 'in', duration: '2:40' },
    { contact: 'mum', t: '2019-05-11T17:30', dir: 'missed' },
  ],

  voicemails: [
    { id: 'vm_mum', contact: 'mum', t: '2019-05-11T17:31', duration: '0:44', voice: { pitch: 0.9, rate: 0.85, female: true }, clue: 'hanne_saw', deletedUntil: 'recovered:voice', transcript: "Ilsie, it's Mum. I sat in front of her for an hour. Love... she's mine. The one on the wall. My little moth is in the third pane, plain as day, with their label underneath. I painted her in 1996 for that man Vey, 'while the real one's away being cleaned.' The real one never came back. I don't know what to do. Ring me when you're off." },
    { id: 'vm_gil', contact: 'gil', t: '2026-10-31T06:10', duration: '0:26', voice: { pitch: 0.85, rate: 1.1, female: false }, clue: 'gallery_soaked', transcript: "Ilse, it's Gil. Gallery Six is empty and there's an inch of water on the floor. The sprinklers ran. Vey's already here. He came in at ten to six asking about 'the test'. Call me. Please. Christ. If someone's got you, I don't care about the painting." },
    { id: 'vm_sami', contact: 'sami', t: '2026-11-01T12:01', duration: '0:18', voice: { pitch: 1.0, rate: 0.9, female: false }, transcript: "It's me. I know you won't hear this. I'm not telling them anything, because I don't know anything. I fed the cat. I'm sleeping on your side. Come home." },
    { id: 'vm_unknown', contact: 'c7unknown', t: '2026-11-01T09:11', duration: '0:12', voice: { pitch: 0.75, rate: 0.8, female: false }, transcript: "Ms. Kade. This is a friend of the museum. Please check your messages. Time matters." },
  ],

  map: {
    art: 'map_c7',
    places: [
      { id: 'hollin', name: 'Hollin Museum of Art', x: 0.48, y: 0.44 },
      { id: 'home', name: 'Kestrel Court (home)', x: 0.16, y: 0.70 },
      { id: 'tallow', name: 'Tallow Lane Studios', x: 0.30, y: 0.24 },
      { id: 'statelab', name: 'State Conservation Lab', x: 0.74, y: 0.62 },
      { id: 'hollis', name: 'Hollis School of Art', x: 0.84, y: 0.20 },
      { id: 'linden', name: 'Linden Hill (Vey residence)', x: 0.62, y: 0.12 },
      { id: 'artcrate', name: 'ArtCrate Supply', x: 0.60, y: 0.84 },
      { id: 'cemetery', name: "St. Brannoc's Cemetery", x: 0.10, y: 0.38 },
    ],
    stops: [
      { t: '2024-03-09T11:00', place: 'cemetery', detail: '1h 10m' },
      { t: '2025-03-03T21:55', place: 'hollin', detail: 'First night shift' },
      { t: '2025-12-05T13:20', place: 'linden', detail: 'Drove past slowly — 3 min, no stop' },
      { t: '2026-10-25T11:00', place: 'statelab', detail: 'Lobby — 12 min' },
      { t: '2026-10-29T17:10', place: 'artcrate', detail: 'Pickup — 9 min' },
      { t: '2026-10-29T18:00', place: 'tallow', detail: 'Unit 3 — 40 min' },
      { t: '2026-10-30T21:58', place: 'hollin', detail: 'Arrived. Device stationary in staff locker room from 02:02, then powered off.' },
    ],
  },

  browser: [
    { t: '2026-10-30T22:50', title: 'is it theft if you take something to stop it being destroyed', url: 'search?q=is+it+theft+to+take+something+to+protect+it' },
    { t: '2026-10-30T13:15', title: 'State Conservation Lab — visitor hours, Monday 7 AM', url: 'statelab.example.gov/visit' },
    { t: '2026-10-29T16:40', title: 'sprinkler flow test dry vs wet heads — will water discharge', url: 'search?q=sprinkler+flow+test+dry+vs+wet+discharge' },
    { t: '2025-12-04T22:20', title: 'Interiors Quarterly — "A Life Among Pictures: Conrad Vey at Home"', url: 'interiorsq.example/vey-at-home', clue: 'vey_study' },
    { t: '2025-03-20T02:10', title: 'titanium white — when was it first used in paint? (1921)', url: 'search?q=titanium+white+first+used+paint' },
    { t: '2025-02-18T01:15', title: 'Elephant hawk-moth (Deilephila elpenor) — Natural History Atlas', url: 'nhatlas.example/moths/deilephila-elpenor' },
    { t: '2025-02-12T23:00', title: 'Hollin Museum — night security officer — apply', url: 'hollinmuseum.example/jobs/night-security' },
    { t: '2025-02-11T22:40', title: 'Hollin Ledger archive 1996: "Lorne returns after seven months of conservation"', url: 'hollinledger.example/archive/1996-10-02' },
  ],

  glimpse: [
    { id: 'g7_clock', author: 'me', photo: 'c7_ph_gallery6', caption: 'night 400. me, her, and a clock that gave up in 1931.', t: '2026-10-27T03:30', likes: 31, comments: [{ author: 'bea', text: "you're so weird I love it" }, { author: 'felix', text: 'paint the clock, she says' }, { author: 'sami', text: 'four hundred nights. that clock has spent more nights with my wife than I have. I want a word with it' }] },
    { id: 'g7_mum', author: 'me', photo: 'c7_ph_memorial', caption: "Mum's last show. Hanne Marek, 1952–2024. Forty years of copies, and a moth in every one, so nobody could ever pass hers off as real. 🖤", t: '2024-05-10T21:00', likes: 64, comments: [{ author: 'sami', text: 'she was the best of us' }], clue: 'nee_marek' },
    { id: 'g7_marathon', author: 'felix', photo: 'c7_ph_marathon', caption: 'HOUR 17. 3AM. my hand is a claw. 40 of us still going 🖤 #hollis24', t: '2026-10-31T03:02', likes: 88, comments: [{ author: 'bea', text: 'go felix!!' }, { author: 'felix', text: 'update: Gary the model fell asleep standing up. still holding the pose. a true professional' }], clue: 'felix_marathon' },
    { id: 'g7_felixcopy', author: 'felix', photo: 'c7_ph_felixcopy', caption: 'Lorne copy for a private collector, almost done. the lantern is a nightmare', t: '2026-10-10T16:00', likes: 40, comments: [{ author: 'me', text: '10% smaller. rule 4.' }, { author: 'felix', text: 'rule 4 is a buzzkill and so are you 🖤' }], clue: 'felix_buyer' },
  ],

  bank: {
    account: 'Riverside Savings ••8841',
    balance: 2310.07,
    tx: [
      { t: '2026-10-30T20:40', desc: 'HARBORSIDE FUEL', amount: -48.20 },
      { t: '2026-10-29T17:12', desc: 'ARTCRATE SUPPLY — PADDED TRANSPORT CASE 40x52', amount: -389.00, clue: 'art_case' },
      { t: '2026-10-28T09:00', desc: 'HOLLIN MUSEUM — PAYROLL', amount: 1640.00 },
      { t: '2026-10-15T10:00', desc: 'TALLOW LANE STUDIOS — UNIT 3 (H. MAREK)', amount: -210.00, clue: 'nee_marek' },
      { t: '2026-10-02T12:30', desc: 'LOUPE & LIGHT — 10X JEWELLER LOUPE', amount: -24.99 },
      { t: '2026-10-01T08:00', desc: 'KESTREL COURT — RENT', amount: -980.00 },
      { t: '2026-09-15T10:00', desc: 'TALLOW LANE STUDIOS — UNIT 3 (H. MAREK)', amount: -210.00 },
    ],
  },

  calendar: [
    { id: 'c7_c_analysis', t: '2026-11-02T09:00', title: 'G6 analysis — Dr. A', detail: 'XRF + cross-section. Third pane.' },
    { id: 'c7_c_lab', t: '2026-11-02T07:00', title: 'State Lab — front desk opens', detail: 'Ask for Dr. Anand. Leave her with no one else.' },
    { id: 'c7_c_shift', t: '2026-10-30T22:00', title: 'Night shift', detail: 'Kept Friday.' },
    { id: 'c7_c_test', t: '2026-10-31T03:55', title: 'G6 sprinkler "dry test"', detail: 'WO 2291 — C.V.' },
    { id: 'c7_c_crate', t: '2026-10-29T17:00', title: 'ArtCrate pickup', detail: '40 × 52. Bigger than her. Measure twice.' },
    { id: 'c7_c_mum', t: '2026-03-02T09:00', title: 'Mum 🖤', detail: 'two years.' },
    { id: 'c7_c_halloween', t: '2026-10-31T19:00', title: 'Halloween w/ Sami', detail: 'he wants to go as the Lorne. I said no.' },
  ],

  wifi: [
    { name: 'HOLLIN_STAFF', lastJoined: '2026-10-31T02:02' },
    { name: 'KestrelCourt_5B', lastJoined: '2026-10-30T21:20' },
    { name: 'TallowLane_Studios', lastJoined: '2026-10-29T18:02' },
    { name: 'StateLab_Visitor', lastJoined: '2026-10-25T11:03' },
    { name: 'Hollis_Guest', lastJoined: '2026-06-20T19:40' },
  ],

  trace: [
    { id: 'photos', label: 'Photos — Recently Deleted', detail: 'Carve image fragments from unallocated flash storage.', needs: ['unlocked'], durationMs: 5200 },
    { id: 'msgfrag', label: 'Messages — Orphaned Fragments', detail: 'Rebuild deleted SMS records from the database write-ahead log.', needs: ['pinned:work_order'], needsHint: 'Need a lead first: pin the Gallery 6 work order.', durationMs: 6600 },
    { id: 'mailpurge', label: 'Mail — Purged Messages', detail: 'Recover permanently deleted mail from the local mail store journal.', needs: ['pinned:moth_macro'], needsHint: 'Need a lead first: pin what is hidden in the lantern.', durationMs: 6200 },
    { id: 'voice', label: 'Voicemail — Carrier Cache', detail: 'Pull deleted voicemail audio from the carrier sync cache.', needs: ['note:n_anand'], needsHint: "Need a lead first: open Ilse's note for Dr. Anand.", durationMs: 6000 },
  ],

  clues: [
    { id: 'moth_macro', title: 'A moth in the third pane', text: "Under a loupe, the third pane of the museum's lantern holds a tiny pink-and-olive moth. Ilse photographed it on her 17th night and deleted it.", kind: 'object', art: 'c7_ph_moth' },
    { id: 'hanne_easel', title: 'Hanne Marek at the easel, 1996', text: "1996 print: Hanne Marek, copyist permit on her lapel, painting a full-size Lorne in a conservation studio. A second, unframed Lorne on the easel beside her. Pencil: 'the Vey job, April'.", kind: 'person', art: 'c7_ph_easel1996' },
    { id: 'hanne_ledger', title: "Hanne's ledger, March 1996", text: "'C. Vey (Hollin, director) — full-size copy, Lorne — for the conservation period — $4,000 cash — moth: 3rd pane.' Collected by C.V. personally, at night.", kind: 'document', art: 'c7_ph_ledger' },
    { id: 'hanne_saw', title: "Mum: 'she's mine'", text: "Deleted voicemail, 2019: Hanne recognised her own moth on the museum wall. 'The real one never came back.'", kind: 'person', art: 'av_c7_hanne' },
    { id: 'vey_reply', title: "Vey to Hanne: 'do not write again'", text: "2019: Director Conrad Vey called Hanne's claim 'baseless' and threatened her with counsel.", kind: 'document', art: 'av_c7_vey' },
    { id: 'anon_tip', title: "'A friend of the lantern'", text: "Purged from this phone, Oct 13: an anonymous tip to Dr. Anand from 'a friend of the lantern'. Test the third pane; ask who signed the Lorne out in 1996.", kind: 'document' },
    { id: 'anand_booked', title: 'The chair asked for the date', text: "Dr. Anand booked the pigment analysis for Mon Nov 2, 9 am, and the board chair asked her for the date personally.", kind: 'event', art: 'av_c7_anand' },
    { id: 'work_order', title: "Work order 2291: 'do not cover'", text: "A sprinkler 'dry test' in Gallery 6, night of Fri Oct 30, 03:55–04:25. 'DO NOT COVER OR RELOCATE WORKS.' Authorized: C. Vey, Board Chair.", kind: 'document', art: 'c7_ph_workorder' },
    { id: 'live_heads', title: "'The heads were LIVE'", text: "The contractor told Bea the Gallery 6 heads were live, not dry: 'whoever wrote dry test on that order lied to me'.", kind: 'event', art: 'av_c7_bea' },
    { id: 'gallery_soaked', title: 'Vey arrived first', text: "Gil: Gallery 6 soaked, and Vey 'came in at ten to six' asking about 'the test results', before anyone had reported anything.", kind: 'event', art: 'av_c7_gil' },
    { id: 'door_log', title: 'The night log', text: "Only two badges all night: Ilse's (sensor bypass 02:16, out the loading dock 02:41) and the sprinkler contractor (03:52–04:24). Vey badged in at 05:49. No forced entry.", kind: 'document' },
    { id: 'ilse_reason', title: "Ilse: 'I'm taking my mother home'", text: "Her locked note: born Ilse Marek. The Gallery 6 painting is her mother's copy. She planned to take it off the wall at 02:15, before the 4 am sprinklers, and bring it to Dr. Anand on Monday.", kind: 'document' },
    { id: 'sami_tonight', title: "'they're going to drown her'", text: "Deleted texts to Sami, Oct 30: 'Sami they're going to drown her.' And at 01:58: 'I'm taking her off the wall... my phone goes in the locker.'", kind: 'event', art: 'av_c7_sami' },
    { id: 'art_case', title: 'A 40 × 52 transport case', text: 'Oct 29: Ilse bought and picked up a padded, climate-sealed art transport case, 40 × 52 in.', kind: 'object', art: 'c7_ph_case' },
    { id: 'vey_study', title: "Vey's 'copy, naturally'", text: "Interiors Quarterly, 2025: the Lorne above Conrad Vey's desk at home. 'A copy, naturally. I couldn't live without her.'", kind: 'place', art: 'c7_ph_study' },
    { id: 'clear_lantern', title: 'The lantern above his desk', text: "Zoomed screenshot of the lantern above Vey's desk: four clear panes. Ilse's markup: 'Same size. Same crack in the varnish by her wrist.'", kind: 'object', art: 'c7_ph_studyzoom' },
    { id: 'nee_marek', title: "'Mum's last show'", text: "Ilse's Glimpse: 'Mum's last show. Hanne Marek, 1952–2024'. Her bank: monthly rent to Tallow Lane Studios, Unit 3 (H. Marek).", kind: 'person', art: 'c7_ph_memorial' },
    { id: 'hawkmoth', title: 'The elephant hawk-moth', text: "Hanne's sketchbooks: forty pages of elephant hawk-moths. 'She hid one in every copy she ever painted. Her signature.'", kind: 'object', art: 'c7_ph_sketchbook' },
    { id: 'felix_alarm', title: 'Felix asked about the sensors', text: "Copyist Felix Lunn asked Ilse which sensors were on the Lorne, 'for a painting'.", kind: 'person', art: 'av_c7_felix' },
    { id: 'felix_buyer', title: "Felix's cash buyer", text: "A Mr. Albrecht wanted Felix's Lorne copy by Nov 1, for cash, 'aged a bit'.", kind: 'person', art: 'av_c7_felix' },
    { id: 'felix_marathon', title: 'Felix at the drawing marathon', text: "3:00 a.m., Oct 31: Felix in the front row of the Hollis 24-hour drawing marathon, across the city, with forty witnesses.", kind: 'place', art: 'c7_ph_marathon' },
    { id: 'crew_story', title: "Vey: 'a professional crew'", text: "Vey's press statement: a crew stole the Lorne, the sprinklers 'malfunctioned during the theft', and the guard may be in danger.", kind: 'person', art: 'av_c7_vey' },
    { id: 'vey_reward', title: "'No police, no questions'", text: "An unknown number offers money for the Lorne's quiet return: 'No police. No tests. No questions.'", kind: 'person', art: 'av_unknown' },
    { id: 'vey_knew', title: "'I knew your mother'", text: "The unknown number again: 'I knew your mother... It would be a shame for her name to come up in connection with a theft.'", kind: 'person', art: 'av_unknown' },
    { id: 'chose_friday', title: 'She kept Friday', text: "Oct 30: Bea offered to swap shifts. Ilse refused: 'I want Friday. I need the quiet.'", kind: 'event', art: 'av_c7_bea' },
  ],

  questions: [
    {
      id: 'q_wall', prompt: 'What was really hanging in Gallery 6?',
      options: [
        { id: 'original', label: "Agathe Lorne's 1891 original" },
        { id: 'hanne', label: "A 1996 copy painted by Ilse's mother, Hanne Marek" },
        { id: 'felix', label: "Felix Lunn's copy, swapped in this year" },
        { id: 'print', label: 'A high-resolution print' },
      ],
      answer: 'hanne', evidence: ['moth_macro', 'hanne_ledger', 'hanne_easel', 'hanne_saw', 'anon_tip', 'ilse_reason', 'hawkmoth'],
      explain: "The museum's lantern has Hanne Marek's moth in the third pane, and her ledger records the commission: a full-size copy for Vey, 'for the conservation period', 1996.",
    },
    {
      id: 'q_took', prompt: 'Who took the painting off the wall?',
      options: [
        { id: 'crew', label: 'A professional crew' },
        { id: 'felix', label: 'Felix Lunn', art: 'av_c7_felix' },
        { id: 'vey', label: 'Conrad Vey', art: 'av_c7_vey' },
        { id: 'ilse', label: 'Ilse Kade herself', art: 'av_c7_ilse' },
        { id: 'gil', label: 'Gil Sato', art: 'av_c7_gil' },
      ],
      answer: 'ilse', evidence: ['door_log', 'ilse_reason', 'sami_tonight', 'art_case', 'chose_friday'],
      explain: "Her own badge bypassed the sensor at 02:16 and went out the loading dock at 02:41. She had bought a case to fit the canvas and kept the Friday shift on purpose. There was no crew.",
    },
    {
      id: 'q_why', prompt: 'Why did she take it?',
      options: [
        { id: 'sell', label: 'To sell it to a private buyer' },
        { id: 'revenge', label: 'To humiliate the museum that ignored her mother' },
        { id: 'save', label: 'To save it: a live sprinkler test over the uncovered canvas would have destroyed the proof before the Nov 2 analysis' },
        { id: 'ransom', label: 'To ransom it back to the insurers' },
      ],
      answer: 'save', evidence: ['work_order', 'live_heads', 'gallery_soaked', 'anand_booked', 'ilse_reason', 'sami_tonight'],
      explain: "Vey learned the date of the analysis and three days later signed a 'dry test' over an uncovered oil painting. The heads were live. At 04:00 they soaked an empty wall.",
    },
    {
      id: 'q_swap', prompt: 'Who replaced the original with the copy, and when?',
      options: [
        { id: 'vey', label: "Conrad Vey, director in 1996, during the painting's 'conservation'" },
        { id: 'hanne', label: 'Hanne Marek, on her own' },
        { id: 'felix', label: 'Felix Lunn, this autumn' },
        { id: 'ilse', label: 'Ilse, on one of her night shifts' },
      ],
      answer: 'vey', evidence: ['hanne_ledger', 'vey_reply', 'vey_study', 'clear_lantern', 'vey_knew', 'hanne_saw'],
      explain: "Vey paid cash for a full-size copy, collected it himself at night, and when Hanne recognised it in 2019 he threatened her. The painting without a moth hangs in his own study.",
    },
    {
      id: 'q_original', prompt: "Where is Agathe Lorne's original now?",
      options: [
        { id: 'study', label: "Above the desk in Conrad Vey's study" },
        { id: 'lab', label: 'At the State Conservation Lab' },
        { id: 'studio', label: "In Hanne Marek's old studio" },
        { id: 'abroad', label: 'Sold abroad years ago' },
      ],
      answer: 'study', evidence: ['vey_study', 'clear_lantern'],
      explain: "He showed it to a magazine and called it 'a copy, naturally'. Copies are 10% smaller and Hanne's carry a moth. His is full size, with clear glass in the third pane.",
    },
    {
      id: 'q_felix', prompt: 'Why is Felix Lunn not the thief?',
      options: [
        { id: 'marathon', label: 'He was at the Hollis 24-hour drawing marathon, and his badge never touched the door log' },
        { id: 'sick', label: 'He was in hospital' },
        { id: 'gil', label: 'Gil Sato vouched for him' },
        { id: 'small', label: 'His copy was too small to swap' },
      ],
      answer: 'marathon', evidence: ['felix_marathon', 'door_log'],
      explain: "He asked about sensors and had a shady buyer, but at 3 a.m. he was in the front row of a drawing marathon across the city, and the night log has only two badges: Ilse's and the contractor's.",
    },
  ],

  events: [
    { id: 'e7_vey1', kind: 'text', when: ['unlocked'], minPins: 3, delayMs: 5000, thread: 'th_c7unknown', contact: 'c7unknown', text: 'Ms. Kade, or whoever has this phone. The Hollin will be generous for the quiet return of the Lorne. No police. No tests. No questions.', clue: 'vey_reward' },
    { id: 'e7_h_order', kind: 'handler', when: ['pinned:work_order'], delayMs: 3000, text: "A sprinkler test over an uncovered 1891 oil. I've worked art fraud a long time, and rich men only get this interested in plumbing when something needs to drown. Check that date against everything else on this phone's calendar." },
    { id: 'e7_h_log', kind: 'handler', when: ['pinned:door_log'], delayMs: 3500, text: "Go through that log one badge at a time. Then read the board's press statement again. Then tell me who's full of shit." },
    { id: 'e7_vey2', kind: 'text', when: ['event:e7_vey1', 'recovered:mailpurge'], delayMs: 6000, thread: 'th_c7unknown', contact: 'c7unknown', text: "I knew your mother, you know. Very talented. It would be a shame for her name to come up in connection with a theft. Bring it back and it never will.", clue: 'vey_knew' },
    { id: 'e7_h_lab', kind: 'handler', when: ['note:n_anand'], delayMs: 5000, text: "Call from the State Conservation Lab. Their weekend porter just signed for a padded 40×52 case. A woman left it with a note: 'For Dr. Anand only. Third pane. Please look before anyone else does.' She didn't wait. Dr. Anand is on her way in — still in her pajamas, I'm told, and swearing like a sailor. I like her already." },
    { id: 'e7_h_ready', kind: 'handler', when: ['unlocked'], minPins: 18, delayMs: 3000, text: "The press says theft. The board says crew. The phone says something else. When every answer has a pin behind it, file the Case Report, and I'll walk it upstairs myself — right past the chief, who plays golf with Vey, and I'll be smiling the whole goddamn way." },
  ],

  hints: [
    { until: 'unlocked', text: "Six digits: the stopped clock on the wallpaper. Read the hour, minute and second hands. A lock-screen notification says whether it stopped in the morning or the afternoon. Use 24-hour time." },
    { until: 'recovered:photos', after: ['unlocked'], text: "A guard whose phone can be spot-checked deletes what matters. Run TRACE Photos." },
    { until: 'pinned:moth_macro', after: ['recovered:photos'], text: "One recovered photo is a close-up of the painting's lantern. What's in the third pane? Pin it." },
    { until: 'recovered:mailpurge', after: ['pinned:moth_macro'], text: 'Somebody told the conservator about that pane. TRACE the purged mail.' },
    { until: 'pinned:work_order', after: ['unlocked'], text: "Gil warned Ilse about a test in Gallery 6. There's a photo of the work order. Read who signed it, and pin it." },
    { until: 'recovered:msgfrag', after: ['pinned:work_order'], text: 'What did Ilse tell her husband the night before? TRACE the deleted messages.' },
    { until: 'note:n_anand', after: ['unlocked'], text: "The note for Dr. Anand wants Mum's moth by its scientific name. Sami's texts give the common name. Ilse looked up the proper one in her Browser. First word only, lowercase." },
    { until: 'recovered:voice', after: ['note:n_anand'], text: "Hanne rang her daughter in 2019 after visiting Gallery 6. TRACE the voicemail cache." },
    { until: 'pinned:door_log', after: ['unlocked'], text: 'The museum emails a night access log to security staff. Whose badges are on it?' },
    { until: 'pinned:clear_lantern', after: ['unlocked'], text: "Vey has a 'copy' at home. Find the magazine screenshot, then the zoomed one. Is there a moth in his lantern?" },
    { until: 'pinned:felix_marathon', after: ['pinned:felix_buyer'], text: "Felix looks bad. Where was he at 3 a.m.? He sent a photo, and so did his Glimpse." },
    { until: 'pinned:nee_marek', after: ['unlocked'], text: "Who is Ilse, really? Check her oldest Glimpse post, and whose studio she pays rent on." },
    { until: 'report:filed', after: ['unlocked'], text: 'Open the Case Report. Six questions, and the second one is about her. Back each answer with a pinned clue.' },
  ],

  handlerIntro: "A $14 million painting is gone and the guard has vanished. Fourteen million for a girl holding a lamp — I own a lamp, nobody's insuring my shit. The board says she's a victim, and the precinct says she's a suspect. The precinct also thinks Monet is a cheese. Her husband says the passcode is a clock that never moves. Start there.",

  epilogue: {
    solved: [
      "On Monday morning Dr. Priya Anand opened the case at the State Conservation Lab with two detectives watching. Under the microscope, the third pane held a moth five millimetres long, painted in titanium white and a pink that didn't exist before 1950. 'It's a copy,' she said. 'And it's beautiful.'",
      "Detectives executed a warrant on Linden Hill that afternoon. The Lorne above Conrad Vey's desk was full size, with an 1891 canvas stamp and a crack in the varnish by the girl's wrist that matched the museum's 1979 condition photos. There was no moth. Vey had told the magazine the truth in the only way he dared: he couldn't live without her.",
      "Vey was charged with theft from a public collection, insurance fraud and criminal mischief over the sprinkler order. The contractor's testimony about the 'dry test' was eleven words long. Gil Sato handed over the security tape himself.",
      "The district attorney declined to charge Ilse Kade. She came in on her own on Tuesday, in her guard uniform, and answered every question. The last one was why she hadn't just called the police. 'Because the last time a Marek told the truth about that painting,' she said, 'they threatened her with lawyers until she died.'",
      "In the spring the Hollin rehung Gallery 6. The Lorne is on the left. On the right, the same size and finally under her own name, hangs Hanne Marek's copy, with a loupe on a chain and a new label: 'Copy by Hanne Marek (1952–2024). Look for the moth.' The bracket clock still says 2:47.",
      "Ilse doesn't work nights any more. On Sundays she sits on the bench in Gallery 6 with the day crowds, and when children ask her where the moth is, she shows them.",
    ],
    partial: [
      'Your report reached the precinct with holes in it.',
      "Without the moth, the ledger and the work order on the board, it's the simplest story in the world: a night guard stole a $14 million painting. Ilse Kade goes to prison for the only honest thing anyone has done in Gallery 6 in thirty years, and the original stays above a desk on Linden Hill.",
      'Go back to the third pane. Then go back to 04:00.',
    ],
  },
};
