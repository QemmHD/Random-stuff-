import type { CaseFile } from '../types';

// CASE 01 — LOW TIDE
// Truth: Mara found that her supervisor Dr. Alan Pryce moved a decimal on the
// lead readings for sample batch HB-17, letting the Blackrock Marina permit
// through. Blackrock's site lead Cal Reyes threatened her from a burner number.
// Pryce lured her to Gull Point; Reyes waited on the path. Mara ran, ditched her
// phone in a tide pool so they'd think she drowned, and is hiding at June's
// aunt's cabin at Larch Hollow with the original samples.

export const case1: CaseFile = {
  id: 'low-tide',
  number: '01',
  title: 'Low Tide',
  tagline: 'A phone pulled from a tide pool. A girl the sea never gave back.',
  difficulty: 1,
  cover: 'cover_case1',
  owner: { name: 'Mara Quill', age: 24, summary: 'Marine biology grad student, Harrow Marine Station.' },
  status: 'MISSING',
  deviceCondition: 'WATER DAMAGE · 61% READABLE',
  briefing: [
    'Mara Quill, 24. Graduate researcher at Harrow Marine Station. Missing since the night of October 3.',
    'Her phone was pulled from a tide pool below Gull Point lighthouse six days later. The lab dried it out. It powers on — barely.',
    'Local police lean toward an accident: a late walk, wet rocks, a high tide. Her mother doesn\'t believe it. Neither do we.',
    'Passcode unknown. Her mother says Mara used the same code for everything — "the day we got Biscuit." She can\'t remember the date.',
    'Find out what happened that night. Pin what matters to the board. File your report.',
  ],
  phoneDate: '2026-10-12',
  phoneTime: '09:14',
  lock: {
    passcode: '0214',
    hint: 'the day we got Biscuit',
    wallpaper: 'ph_biscuit',
    notifications: [
      { app: 'messages', title: 'Mom', text: 'Please, honey. Anything. Even one word.', t: '2026-10-11T22:03' },
      { app: 'glimpse', title: 'Glimpse', text: 'harrowgazette tagged you in a post: "Have you seen Mara Quill?"', t: '2026-10-08T08:00' },
      { app: 'messages', title: '(555) 014-7720', text: 'Saw you at the station tonight. Go home Mara.', t: '2026-10-03T21:58' },
    ],
  },
  homeWallpaper: 'wall_tide',

  contacts: [
    { id: 'theo', name: 'Theo Vance', avatar: 'av_theo', number: '(555) 210-4471', label: '❤︎' },
    { id: 'june', name: 'June Okafor', avatar: 'av_june', number: '(555) 302-8816', label: 'roomie' },
    { id: 'mom', name: 'Mom', avatar: 'av_mom', number: '(555) 118-2290' },
    { id: 'pryce', name: 'Dr. Alan Pryce', avatar: 'av_pryce', number: '(555) 450-1001', label: 'Supervisor' },
    { id: 'sam', name: 'Sam Hollis', avatar: 'av_sam', number: '(555) 677-3140', label: 'Harrow Gazette' },
    { id: 'burner', name: '(555) 014-7720', avatar: 'av_unknown', number: '(555) 014-7720' },
    { id: 'mara2', name: '(555) 388-0912', avatar: 'av_unknown', number: '(555) 388-0912' },
  ],

  threads: [
    {
      id: 'th_theo', contact: 'theo', messages: [
        { from: 'them', text: 'you coming to the anchor friday? dave says if you bail again he\'s putting your face on the dartboard', t: '2026-10-01T19:02' },
        { from: 'me', text: 'maybe. lab stuff is getting weird', t: '2026-10-01T19:20' },
        { from: 'them', text: "it's always lab stuff with you. i'm basically dating a fucking sea cucumber", t: '2026-10-01T19:21' },
        { from: 'me', text: 'sea cucumbers can eject their own organs to escape. something to think about', t: '2026-10-01T19:24' },
        { from: 'them', text: 'cool cool. see you friday then 😐', t: '2026-10-01T19:25' },
        { from: 'them', text: 'wear the green thing 😏', t: '2026-10-01T19:27' },
        { from: 'me', text: 'the green thing is my lab coat theo', t: '2026-10-01T19:29' },
        { from: 'them', text: 'i know what i said', t: '2026-10-01T19:29' },
        { from: 'them', text: "seriously? you're just fucking leaving? we JUST got drinks", t: '2026-10-03T21:44' },
        { from: 'them', text: "you've been weird as shit for two weeks. who is he", t: '2026-10-03T21:45' },
        { from: 'me', text: "it's not like that. there is no he. I can't explain yet. please just trust me", t: '2026-10-03T21:47' },
        { from: 'them', text: "you'll fucking regret walking out on me Mara", t: '2026-10-03T21:49', clue: 'theo_threat' },
        { from: 'them', text: 'dave just threw up in the urinal and then high-fived himself. this is what my life is without you', t: '2026-10-04T00:28' },
        { from: 'them', text: 'im sorry. that came out so wrong. im an asshole. call me', t: '2026-10-04T00:31' },
        { from: 'them', text: 'mara?', t: '2026-10-04T08:10' },
        { from: 'them', text: "june says you didn't come home. please", t: '2026-10-05T11:42' },
        { from: 'them', text: 'the police talked to me for 3 hours. i was at the anchor all night. everyone saw me. the bartender literally cut me off. where ARE you', t: '2026-10-06T19:15' },
      ],
    },
    {
      id: 'th_june', contact: 'june', messages: [
        { from: 'them', text: "rent's due tuesday btw 🙃", t: '2026-09-28T10:04' },
        { from: 'me', text: 'on it', t: '2026-09-28T10:30' },
        { from: 'them', text: "also someone ate my entire hummus and left the empty tub in the fridge like a goddamn serial killer leaving a calling card", t: '2026-09-28T10:32' },
        { from: 'me', text: 'it was a hummus emergency. I will replace it. with the good one', t: '2026-09-28T10:35' },
        { from: 'them', text: 'the good one or i tell theo you snore', t: '2026-09-28T10:35' },
        { from: 'them', text: 'UPDATE. the bumble guy brought his own SHEETS. in a tote bag. like a little picnic. i left before he finished making the bed', t: '2026-09-30T01:14' },
        { from: 'me', text: 'JUNE', t: '2026-09-30T01:20' },
        { from: 'them', text: "he called it 'the overnight kit.' it had a candle mara. a CANDLE. he'd done this before. many times. professionally", t: '2026-09-30T01:21' },
        { from: 'me', text: 'so proud of you for fleeing. this is growth', t: '2026-09-30T07:02' },
        { from: 'me', text: "I need to tell you something and you can't freak out. like actually can't", t: '2026-10-02T22:10' },
        { from: 'them', text: '...ok? are you pregnant. is it theo\'s. is it the sea cucumber guy', t: '2026-10-02T22:10' },
        { from: 'me', text: 'Pryce changed the Lab B numbers. the lead readings. I have the originals', t: '2026-10-02T22:12' },
        { from: 'them', text: "mara what the fuck. that's insane. who else knows", t: '2026-10-02T22:13' },
        { from: 'me', text: 'a reporter. and maybe pryce knows i know', t: '2026-10-02T22:15' },
        { from: 'them', text: "ok i've been thinking. if shit gets bad, aunt Rosa's cabin at Larch Hollow. spare key is under the heron. nobody goes up there in october", t: '2026-10-03T17:30', clue: 'june_cabin', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: "you're the best. if I go dark, don't panic. and don't tell theo. he'd show up with a six-pack and a flashlight and get us both killed.", t: '2026-10-03T17:33', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: 'mara call me please. you didn\'t come home. your bed hasn\'t been touched', t: '2026-10-04T07:58' },
        { from: 'them', text: "they're asking about you. I said nothing. I'm a fucking vault. please be ok", t: '2026-10-06T21:20' },
      ],
    },
    {
      id: 'th_mom', contact: 'mom', messages: [
        { from: 'them', text: "Don't forget Biscuit's vet appt Saturday!", t: '2026-10-02T09:11' },
        { from: 'me', text: "won't ❤️", t: '2026-10-02T09:40' },
        { from: 'them', text: 'Honey call me when you get this', t: '2026-10-04T13:05' },
        { from: 'them', text: 'The police called me. Please Mara.', t: '2026-10-05T08:22' },
        { from: 'them', text: 'Please, honey. Anything. Even one word.', t: '2026-10-11T22:03' },
      ],
    },
    {
      id: 'th_pryce', contact: 'pryce', messages: [
        { from: 'them', text: 'Mara, please see me about the Lab B batch before you submit anything. Enthusiasm is not a substitute for method.', t: '2026-09-30T08:45' },
        { from: 'me', text: 'I already compared them to the raw instrument logs, Alan.', t: '2026-09-30T09:02' },
        { from: 'them', text: 'Then you know how easy it is to misread them. Twenty years of instruments, Mara. Two of yours. My office. Today.', t: '2026-09-30T09:03' },
        { from: 'them', text: "I've thought about it. You're right. Meet me at Gull Point, 11:30. Bring the samples and we'll go to the board together. No phones, no lawyers, just us.", t: '2026-10-03T22:41', clue: 'pryce_lure', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: 'ok. 11:30.', t: '2026-10-03T22:44', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: 'Mara, you missed our 9am. Please let the department know you are safe. Punctuality is also a professional skill.', t: '2026-10-04T10:02' },
      ],
    },
    {
      id: 'th_sam', contact: 'sam', messages: [
        { from: 'them', text: 'Holy shit, Mara. Got your summary. If the lead numbers are real, this is front page. Can we meet?', t: '2026-09-29T14:20', clue: 'sam_journalist' },
        { from: 'me', text: "Oct 5. I'll bring the originals.", t: '2026-09-29T14:31' },
        { from: 'them', text: 'Be careful who you tell. Small towns, big money, and men who think they\'re untouchable. Classic recipe.', t: '2026-09-29T14:32' },
        { from: 'them', text: "Mara? You didn't show. I've been sitting in the Dockside for an hour drinking shit coffee. I'm worried. I've gone to the police.", t: '2026-10-05T13:10' },
      ],
    },
    {
      id: 'th_burner', contact: 'burner', messages: [
        { from: 'them', text: 'Stop digging in other people\'s water.', t: '2026-10-02T23:12', clue: 'burner_threat' },
        { from: 'me', text: 'who is this', t: '2026-10-02T23:14' },
        { from: 'them', text: 'Someone who knows where you park.', t: '2026-10-02T23:15', clue: 'burner_threat' },
        { from: 'me', text: 'cool. go fuck yourself, someone', t: '2026-10-02T23:16' },
        { from: 'them', text: 'Cute. Keep that energy, college girl.', t: '2026-10-02T23:19' },
        { from: 'them', text: 'Saw you at the station tonight. Go home Mara.', t: '2026-10-03T21:58', clue: 'burner_threat' },
      ],
    },
  ],

  photos: [
    { id: 'hp_c1_june2', art: 'hp_c1_june2', t: '2026-09-30T19:42', place: 'Cove St. apartment — bedroom mirror', orientation: 'portrait', caption: "Sent by June Okafor. Red lace lingerie fit-check mirror selfie, one heel on, the other missing. 'too slutty for a tuesday? (correct answer: no)'", hidden: true },
    { id: 'hp_c1_bumble', art: 'hp_c1_bumble', t: '2026-09-24T22:15', place: 'Screenshot — dating app', orientation: 'portrait', caption: "Forwarded by June. A shirtless man's dating profile photo, holding a tote bag stuffed with his own bedsheets. 'THIS is the sheets guy'", hidden: true },
    { id: 'hp_c1_theo', art: 'hp_c1_theo', t: '2026-09-19T23:48', place: "The Anchor — men's room", orientation: 'portrait', caption: 'Mirror selfie sent by Theo Vance. Shirtless, flexing, beanie on, hand-dryer sign behind him.', hidden: true },
    { id: 'hp_c1_june', art: 'hp_c1_june', t: '2026-09-27T21:10', place: 'Cove St. apartment — bathroom', orientation: 'portrait', caption: "Sent by June Okafor. Bubble bath, sheet face mask, wine glass, 'self care sunday (it is saturday)'.", hidden: true },
    { id: 'ph_biscuit', art: 'ph_biscuit', t: '2018-02-14T15:20', place: 'Quill family home', orientation: 'portrait', caption: 'Lock screen wallpaper. A golden retriever puppy with a red bow. Old-style camera date stamp in the corner.', device: 'Scanned print' },
    { id: 'ph_selfie', art: 'ph_selfie', t: '2026-08-15T17:02', place: 'Harrow Beach', orientation: 'portrait', caption: 'Mara and June at low tide.' },
    { id: 'ph_seawren', art: 'ph_seawren', t: '2025-07-04T11:40', place: 'Harbor Row', orientation: 'landscape', caption: "Old wooden fishing boat at the Harbor Row dock. Mara's caption draft: 'nana's girl, still floating.'" },
    { id: 'ph_tidepool', art: 'ph_tidepool', t: '2026-09-14T08:12', place: 'Gull Point', orientation: 'portrait', caption: 'Ochre sea star in a tide pool. Field photo.' },
    { id: 'ph_blackrock', art: 'ph_blackrock', t: '2026-09-21T10:48', place: 'Blackrock Marina site', orientation: 'landscape', caption: 'Site visit. A discharge pipe runs from the construction pad straight into the bay. Water near the outflow is discolored.', clue: 'blackrock_pipe' },
    { id: 'ph_labsheets', art: 'ph_labsheets', t: '2026-09-27T22:03', place: 'Harrow Marine Station — Lab B', orientation: 'landscape', caption: 'Two printouts for batch HB-17. Raw instrument log and the signed report, side by side under a desk lamp.', clue: 'lab_data' },
    { id: 'ph_coffee', art: 'ph_coffee', t: '2026-10-01T08:31', place: 'Dockside Café', orientation: 'portrait', caption: 'Latte. A wave in the foam.' },
    { id: 'ph_key', art: 'ph_key', t: '2026-10-03T17:41', place: "June Okafor's apartment", orientation: 'portrait', caption: 'Recovered. A brass key on a heron keychain. Tag reads "LH-4".', clue: 'cabin_key', deletedUntil: 'recovered:photos' },
    { id: 'ph_station', art: 'ph_station', t: '2026-10-03T18:12', place: 'Harrow Marine Station', orientation: 'landscape', caption: 'Station exterior at dusk. Lab B lights on.' },
    { id: 'ph_drybag', art: 'ph_drybag', t: '2026-10-03T22:30', place: 'Harrow Marine Station — Lab B', orientation: 'portrait', caption: 'Recovered. An orange 20L dry bag, open. Three sample vials labelled HB-17 and a folded printout inside.', clue: 'drybag', deletedUntil: 'recovered:photos' },
    { id: 'ph_gullpoint', art: 'ph_gullpoint', t: '2026-10-03T23:31', place: 'Gull Point', orientation: 'portrait', caption: 'Last photo on the device. The lighthouse beam over Gull Point, the cliff path behind.', clue: 'gullpoint_last' },
    { id: 'ph_anchor', art: 'ph_anchor', t: '2026-10-03T23:47', place: 'The Anchor', orientation: 'portrait', caption: "Posted by June Okafor. Theo Vance at the bar. The clock over the taps reads 11:47." },
  ],

  notes: [
    { id: 'n_grocery', title: 'groceries', t: '2026-10-02T18:20', body: 'oat milk\neggs\nBiscuit food (the salmon one)\nbatteries — headlamp\ncash??' },
    { id: 'n_thesis', title: 'Thesis — kelp recovery', t: '2026-09-26T23:58', body: 'Kelp recovery in Harrow Bay\n\n1. baseline 2019–2024\n2. HB-series samples (Lab B)\n3. if the raw numbers are right, the kelp isn\'t dying from warm water. it\'s LEAD.\n\nwhy would the report say 4.8\nwhy would alan sign that' },
    {
      id: 'n_insurance', title: 'Insurance', t: '2026-10-03T16:40', lock: { password: 'seawren', hint: "Nana's boat. One word, lowercase." }, clue: 'insurance_note',
      body: 'If you are reading this, something went wrong.\n\nBatch HB-17. The raw instrument log says LEAD 48 ppb. The report Dr. Pryce signed says 4.8. He moved a decimal — and the Blackrock Marina permit went through two weeks later.\n\nThe originals and three vials are in the orange dry bag.\n\nIf I go dark, it\'s on purpose. I\'m going where J said. Don\'t look for me until the story runs.\n\n— M',
    },
  ],

  mail: [
    { id: 'm_sam', from: 'Sam Hollis', fromAddr: 's.hollis@harrowgazette.com', to: 'Mara Quill', subject: 'Re: Harrow Bay samples', t: '2026-09-29T14:02', folder: 'inbox', clue: 'sam_journalist', body: "Mara,\n\nI read your summary twice. If batch HB-17 really came back at 48 ppb and the published figure is 4.8, that's not a typo, that's a cover-up — and it's the reason the marina got its permit.\n\nI need the originals. Raw logs, physical samples if you have them. Bring them to the Dockside on the 5th.\n\nDon't email anything else from your station account.\n\n— Sam" },
    { id: 'm_invite', from: 'Lena Ortiz', fromAddr: 'l.ortiz@harrowmarine.org', to: 'Dr. A. Pryce; M. Quill', subject: 'Site visit — Blackrock Marina, Sept 21', t: '2026-09-18T11:15', folder: 'inbox', clue: 'reyes_number', body: 'Hi both,\n\nConfirming Saturday\'s site visit at the Blackrock Marina pad.\n\nAttendees: Dr. Alan Pryce, Mara Quill, Cal Reyes (Blackrock — site lead)\nMeet: north gate, 10:00\nDay-of contact: Cal Reyes, cell (555) 014-7720\n\nHard hats provided.\n\nLena Ortiz\nAdmin, Harrow Marine Station' },
    { id: 'm_permit', from: 'Blackrock Development', fromAddr: 'news@blackrockdev.com', to: 'Harrow Bay Partners', subject: '🎉 Marina permit APPROVED', t: '2026-09-24T09:00', folder: 'inbox', clue: 'permit', body: "Great news, neighbors!\n\nThe Blackrock Marina has received final environmental approval, thanks to the independent water-quality review completed by our partners at Harrow Marine Station.\n\nConstruction resumes Monday. 140 slips. A new Harrow.\n\n— The Blackrock Team" },
    { id: 'm_suspend', from: 'Dr. Alan Pryce', fromAddr: 'a.pryce@harrowmarine.org', to: 'Mara Quill', subject: 'Lab B access', t: '2026-10-01T16:30', folder: 'inbox', body: 'Mara,\n\nEffective today your access to Lab B is suspended pending a routine review of the HB-series handling procedures.\n\nThis is standard. Please do not remove any materials from the station.\n\nAlan' },
    { id: 'm_tosam', from: 'Mara Quill', fromAddr: 'mara.quill@inboxly.com', to: 'Sam Hollis', subject: 'thursday', t: '2026-10-03T21:52', folder: 'sent', body: "Sam — change of plan. I'm getting the vials tonight while the lab's empty. Yes, I know this is exactly how the girl dies in every podcast. If you don't hear from me by Monday, talk to June. Only June.\n\nM" },
    { id: 'm_spam', from: 'Harbor Hardware', fromAddr: 'deals@harborhardware.com', to: 'Mara Quill', subject: 'Your receipt — DRY BAG 20L ORANGE', t: '2026-10-03T21:51', folder: 'trash', clue: 'drybag', body: 'Thanks for shopping Harbor Hardware!\n\n1 × DRY BAG 20L ORANGE   $34.99\n\nPaid: card ••4417\nStore: Harbor Row\n21:51' },
  ],

  calls: [
    { contact: 'mom', t: '2026-10-11T22:00', dir: 'missed' },
    { contact: 'mom', t: '2026-10-08T19:30', dir: 'missed' },
    { contact: 'sam', t: '2026-10-05T13:02', dir: 'missed' },
    { contact: 'theo', t: '2026-10-04T00:32', dir: 'missed' },
    { contact: 'burner', t: '2026-10-03T23:05', dir: 'missed' },
    { contact: 'burner', t: '2026-10-03T22:47', dir: 'missed' },
    { contact: 'june', t: '2026-10-03T21:50', dir: 'out', duration: '2:13' },
    { contact: 'pryce', t: '2026-10-02T16:19', dir: 'missed' },
    { contact: 'sam', t: '2026-09-29T14:40', dir: 'out', duration: '11:52' },
  ],

  voicemails: [
    { id: 'vm_mom', contact: 'mom', t: '2026-10-08T19:31', duration: '0:22', voice: { pitch: 1.1, rate: 0.92, female: true }, transcript: "Mara, it's Mom. The police say there's no sign of — they keep saying 'the tide.' I don't believe it. You'd never go out on those rocks at night. Please call me. Biscuit sleeps by the door." },
    { id: 'vm_theo', contact: 'theo', t: '2026-10-04T00:33', duration: '0:18', voice: { pitch: 0.8, rate: 1.05, female: false }, clue: 'theo_alibi', transcript: "Hey. It's me. I'm still at the Anchor, I'm — [glass clinks] Dave, shut up, I'm on the phone — I'm sorry, okay? I shouldn't have said that. I was drunk and being a total asshole. I'm still drunk. Less of an asshole. Just... call me. Please." },
    { id: 'vm_pryce', contact: 'pryce', t: '2026-10-02T16:20', duration: '0:31', voice: { pitch: 0.7, rate: 0.9, female: false }, clue: 'pryce_pressure', transcript: "Mara, it's Alan. I think you've misread the HB-17 logs — the instrument was miscalibrated that week, as anyone with a little more experience would have noticed. Before you talk to anyone outside the department, come and see me. Your career is... look. Let's just talk. Don't do anything you can't undo." },
    { id: 'vm_pocket', contact: 'burner', t: '2026-10-03T23:05', duration: '0:27', voice: { pitch: 0.6, rate: 1.0, female: false }, clue: 'pocket_dial', deletedUntil: 'recovered:voice', transcript: "[wind noise] ...no, she's heading for the point now. Alan says she's bringing the vials. [footsteps] ...I'll wait on the path. Nobody's out here this time of — [rustle] — shit, is this thing on? Fuckin' touchscreens — [call ends]" },
  ],

  map: {
    art: 'map_harrow',
    places: [
      { id: 'home', name: 'Cove St. apartment', x: 0.30, y: 0.62 },
      { id: 'station', name: 'Harrow Marine Station', x: 0.62, y: 0.40 },
      { id: 'anchor', name: 'The Anchor (bar)', x: 0.42, y: 0.70 },
      { id: 'harbor', name: 'Harbor Row', x: 0.52, y: 0.78 },
      { id: 'gull', name: 'Gull Point Lighthouse', x: 0.86, y: 0.22 },
      { id: 'blackrock', name: 'Blackrock Marina site', x: 0.72, y: 0.82 },
      { id: 'larch', name: 'Larch Hollow (trailhead)', x: 0.12, y: 0.10 },
    ],
    stops: [
      { t: '2026-09-21T10:00', place: 'blackrock', detail: 'Site visit — 1h 40m' },
      { t: '2026-10-03T17:38', place: 'home', detail: 'Arrived — 22 min' },
      { t: '2026-10-03T18:10', place: 'station', detail: '1h 30m' },
      { t: '2026-10-03T20:05', place: 'anchor', detail: '1h 38m' },
      { t: '2026-10-03T21:48', place: 'harbor', detail: '9 min — hardware store, ATM' },
      { t: '2026-10-03T22:15', place: 'station', detail: '52 min — Lab B wing' },
      { t: '2026-10-03T23:20', place: 'gull', detail: 'Signal weak' },
      { t: '2026-10-03T23:52', place: 'gull', detail: 'LAST SIGNAL — device offline', clue: 'last_signal' },
    ],
  },

  browser: [
    { t: '2026-10-03T17:12', title: 'prepaid phone no ID near me', url: 'search?q=prepaid+phone+no+id+near+me', clue: 'prepaid' },
    { t: '2026-10-03T17:10', title: 'can police track a phone that is turned off', url: 'search?q=can+police+track+phone+off' },
    { t: '2026-10-03T16:58', title: 'Larch Hollow trailhead — weather, October', url: 'weather.example/larch-hollow', clue: 'larch_search' },
    { t: '2026-10-01T23:40', title: 'how to tell if lab data has been altered', url: 'search?q=how+to+tell+if+lab+data+altered' },
    { t: '2026-09-27T22:20', title: 'Harrow Gazette — Contact a reporter', url: 'harrowgazette.com/tips' },
    { t: '2026-09-26T21:05', title: 'lead toxicity kelp ppb threshold', url: 'search?q=lead+toxicity+kelp+ppb' },
    { t: '2026-09-25T08:14', title: 'Blackrock Marina permit Harrow Bay', url: 'search?q=blackrock+marina+permit' },
  ],

  glimpse: [
    { id: 'g_gazette', author: 'sam', photo: 'ph_selfie', caption: 'HAVE YOU SEEN MARA QUILL? 24, last seen Oct 3 near Gull Point. Call Harrow PD with any information.', t: '2026-10-08T08:00', likes: 2304, comments: [{ author: 'mom', text: 'Please share. Please.' }, { author: 'june', text: '❤️' }] },
    { id: 'g_anchor', author: 'june', photo: 'ph_anchor', caption: "someone's having a night 🙄 @theo.v four beers deep and explaining his feelings to the bartender", t: '2026-10-03T23:47', likes: 31, comments: [{ author: 'theo', text: 'delete this' }, { author: 'june', text: 'never' }, { author: 'theo', text: 'june i swear to god' }, { author: 'june', text: 'framing it. going on the fridge next to the hummus memorial' }], clue: 'theo_alibi' },
    { id: 'g_tide', author: 'me', photo: 'ph_tidepool', caption: 'field day 🦀 the pools are full of life this year. for now.', t: '2026-09-14T09:00', likes: 88, comments: [{ author: 'pryce', text: 'Lovely specimen. Pisaster ochraceus, for the non-specialists.' }, { author: 'june', text: 'nerd' }] },
    { id: 'g_selfie', author: 'me', photo: 'ph_selfie', caption: 'low tide, high spirits 🌊', t: '2026-08-15T18:00', likes: 142, comments: [{ author: 'june', text: 'my favorite human' }, { author: 'theo', text: '😍' }, { author: 'june', text: 'theo stop thirsting in the comments, her mom follows her' }] },
  ],

  bank: {
    account: 'Harbor Credit Union ••4417',
    balance: 212.40,
    tx: [
      { t: '2026-10-03T21:55', desc: 'ATM WITHDRAWAL — HARBOR ROW', amount: -400, clue: 'cash_withdrawal' },
      { t: '2026-10-03T21:51', desc: 'HARBOR HARDWARE — DRY BAG 20L', amount: -34.99, clue: 'drybag' },
      { t: '2026-10-03T17:20', desc: 'QUIKMART #22 — PREPAID SIM CARD', amount: -25.00, clue: 'prepaid' },
      { t: '2026-10-01T20:11', desc: 'THE ANCHOR', amount: -18.00 },
      { t: '2026-10-01T08:31', desc: 'DOCKSIDE CAFE', amount: -5.25 },
      { t: '2026-09-30T00:00', desc: 'PAYROLL — HARROW MARINE STN', amount: 1240.00 },
      { t: '2026-09-28T10:31', desc: 'TRANSFER — J OKAFOR (rent)', amount: -650.00 },
      { t: '2026-09-21T13:02', desc: 'PETCO — SALMON KIBBLE', amount: -41.80 },
    ],
  },

  calendar: [
    { id: 'c_site', t: '2026-09-21T10:00', title: 'Blackrock site visit', detail: 'w/ Alan + Cal Reyes (Blackrock). North gate.' },
    { id: 'c_lab', t: '2026-10-03T22:00', title: 'Lab B — get the vials', detail: "Lab's empty after 10. Don't tell A." },
    { id: 'c_meet', t: '2026-10-04T09:00', title: 'Meeting — Alan', detail: 'HB-17 "review"' },
    { id: 'c_vet', t: '2026-10-04T10:30', title: 'Biscuit — vet', detail: 'Mom is driving' },
    { id: 'c_sam', t: '2026-10-05T12:00', title: 'S.H. — Gazette', detail: 'Dockside Café. Bring originals.', clue: 'sam_journalist' },
  ],

  wifi: [
    { name: 'HMS-Staff', lastJoined: '2026-10-03T23:07' },
    { name: 'AnchorGuest', lastJoined: '2026-10-03T21:40' },
    { name: 'Okafor_Home', lastJoined: '2026-10-03T17:44' },
    { name: 'DocksideFreeWiFi', lastJoined: '2026-10-01T08:30' },
    { name: 'RosaCabin_LH4', lastJoined: '2025-10-14T19:22', clue: 'cabin_wifi' },
    { name: 'QuillFamily', lastJoined: '2026-09-07T14:10' },
  ],

  trace: [
    { id: 'photos', label: 'Photos — Recently Deleted', detail: 'Carve image fragments from unallocated flash storage.', needs: ['unlocked'], durationMs: 5200 },
    { id: 'msgfrag', label: 'Messages — Orphaned Fragments', detail: 'Rebuild deleted SMS records from the database write-ahead log.', needs: ['pinned:pryce_pressure'], needsHint: 'Need a lead first: pin evidence that Pryce was pressuring Mara.', durationMs: 6500 },
    { id: 'voice', label: 'Voicemail — Carrier Cache', detail: 'Pull expired voicemail audio from the carrier sync cache.', needs: ['pinned:burner_threat'], needsHint: 'Need a lead first: pin the threats from the unknown number.', durationMs: 6000 },
  ],

  clues: [
    { id: 'lab_data', title: 'HB-17: 48 vs 4.8', text: 'Raw instrument log shows lead at 48 ppb; the report Pryce signed says 4.8.', kind: 'document', art: 'ph_labsheets' },
    { id: 'insurance_note', title: '"Insurance" note', text: "Mara's locked note: Pryce moved a decimal; originals in the dry bag; 'I'm going where J said.'", kind: 'document' },
    { id: 'blackrock_pipe', title: 'Blackrock outflow pipe', text: 'Construction discharge running straight into the bay.', kind: 'place', art: 'ph_blackrock' },
    { id: 'permit', title: 'Marina permit approved', text: "Approved 'thanks to' the Harrow Marine Station water review.", kind: 'document' },
    { id: 'pryce_pressure', title: "Pryce's voicemail", text: "'Before you talk to anyone outside the department, come and see me.'", kind: 'person', art: 'av_pryce' },
    { id: 'pryce_lure', title: 'Gull Point, 11:30', text: "Deleted text from Pryce: 'Meet me at Gull Point, 11:30. Bring the samples.'", kind: 'event', art: 'av_pryce' },
    { id: 'burner_threat', title: 'Threats from 014-7720', text: "'Stop digging in other people's water.' 'Saw you at the station tonight.'", kind: 'person', art: 'av_unknown' },
    { id: 'reyes_number', title: "Cal Reyes' cell", text: 'Site-visit invite lists Cal Reyes (Blackrock) at (555) 014-7720.', kind: 'document' },
    { id: 'pocket_dial', title: 'Pocket-dial, 23:05', text: "From 014-7720: 'Alan says she's bringing the vials. I'll wait on the path.'", kind: 'event' },
    { id: 'theo_threat', title: "Theo: 'you'll regret it'", text: 'Theo texted Mara a threat after she walked out of the bar.', kind: 'person', art: 'av_theo' },
    { id: 'theo_alibi', title: 'Theo at The Anchor', text: 'Photo posted 23:47 shows Theo at the bar; his voicemail at 00:33 says he never left.', kind: 'event', art: 'ph_anchor' },
    { id: 'gullpoint_last', title: 'Last photo, 23:31', text: 'Lighthouse beam — and a second figure with a flashlight on the path.', kind: 'place', art: 'ph_gullpoint' },
    { id: 'last_signal', title: 'Last signal: Gull Point', text: 'Device went offline at 23:52 at Gull Point.', kind: 'place' },
    { id: 'drybag', title: 'Orange dry bag', text: 'Bought 21:51. Photographed in Lab B with three HB-17 vials inside.', kind: 'object', art: 'ph_drybag' },
    { id: 'cash_withdrawal', title: '$400 cash', text: 'ATM withdrawal at Harbor Row, 21:55 — cash leaves no trail.', kind: 'event' },
    { id: 'prepaid', title: 'Prepaid SIM', text: "Bought a prepaid SIM at 17:20 after searching 'prepaid phone no ID'.", kind: 'object' },
    { id: 'cabin_key', title: 'Key tag LH-4', text: 'Deleted photo: a brass key on a heron keychain, tag LH-4.', kind: 'object', art: 'ph_key' },
    { id: 'june_cabin', title: "June's cabin offer", text: "'Aunt Rosa's cabin at Larch Hollow. Spare key is under the heron.'", kind: 'event', art: 'av_june' },
    { id: 'larch_search', title: 'Larch Hollow weather', text: 'Searched the Larch Hollow trailhead forecast hours before vanishing.', kind: 'document' },
    { id: 'cabin_wifi', title: 'Wi-Fi: RosaCabin_LH4', text: "Phone has joined a network called 'RosaCabin_LH4' before.", kind: 'place' },
    { id: 'sam_journalist', title: 'Reporter: Sam Hollis', text: 'Harrow Gazette reporter expecting the originals on Oct 5.', kind: 'person', art: 'av_sam' },
    { id: 'mara_alive', title: "'it's me. M.'", text: 'A new number texted the phone during the investigation. Mara is alive.', kind: 'event', art: 'av_mara' },
  ],

  questions: [
    {
      id: 'q_motive', prompt: 'What had Mara discovered?',
      options: [
        { id: 'affair', label: 'Theo was seeing someone else' },
        { id: 'data', label: 'The bay\'s lead readings were falsified' },
        { id: 'debt', label: 'She was in serious debt' },
        { id: 'theft', label: 'Someone was stealing lab equipment' },
      ],
      answer: 'data', evidence: ['lab_data', 'insurance_note'],
      explain: 'Batch HB-17 read 48 ppb lead. Pryce signed off on 4.8 — and Blackrock got its permit.',
    },
    {
      id: 'q_lure', prompt: 'Who arranged to meet Mara at Gull Point that night?',
      options: [
        { id: 'theo', label: 'Theo Vance', art: 'av_theo' },
        { id: 'pryce', label: 'Dr. Alan Pryce', art: 'av_pryce' },
        { id: 'june', label: 'June Okafor', art: 'av_june' },
        { id: 'sam', label: 'Sam Hollis', art: 'av_sam' },
      ],
      answer: 'pryce', evidence: ['pryce_lure'],
      explain: "A deleted text from Pryce at 22:41: 'Meet me at Gull Point, 11:30. Bring the samples.'",
    },
    {
      id: 'q_threats', prompt: 'Who was sending threats from (555) 014-7720?',
      options: [
        { id: 'theo', label: 'Theo Vance', art: 'av_theo' },
        { id: 'pryce', label: 'Dr. Alan Pryce', art: 'av_pryce' },
        { id: 'cal', label: 'Cal Reyes (Blackrock)' },
        { id: 'sam', label: 'Sam Hollis', art: 'av_sam' },
      ],
      answer: 'cal', evidence: ['reyes_number', 'pocket_dial'],
      explain: "The station's site-visit invite lists Cal Reyes' cell as (555) 014-7720. His pocket-dial names 'Alan'.",
    },
    {
      id: 'q_theo', prompt: 'Where was Theo Vance when Mara reached Gull Point?',
      options: [
        { id: 'gull', label: 'He followed her to Gull Point' },
        { id: 'anchor', label: 'Still at The Anchor' },
        { id: 'home', label: 'Home, alone' },
      ],
      answer: 'anchor', evidence: ['theo_alibi'],
      explain: "June's post puts Theo at the bar at 23:47 — sixteen minutes after Mara's last photo, miles away.",
    },
    {
      id: 'q_where', prompt: 'Where is Mara Quill now?',
      options: [
        { id: 'sea', label: 'She drowned off Gull Point' },
        { id: 'larch', label: "Hiding at the cabin in Larch Hollow" },
        { id: 'held', label: 'Being held by Pryce' },
        { id: 'city', label: 'She caught a bus to the city' },
      ],
      answer: 'larch', evidence: ['cabin_key', 'june_cabin', 'cabin_wifi', 'larch_search'],
      explain: "June's offer, the LH-4 key, the cabin Wi-Fi and the weather search all point to Aunt Rosa's cabin.",
    },
  ],

  events: [
    { id: 'e_burner', kind: 'text', when: ['unlocked'], minPins: 5, delayMs: 3500, thread: 'th_burner', contact: 'burner', text: "Whoever the fuck has Mara's phone. Put it down and walk away." },
    { id: 'e_h_burner', kind: 'handler', when: ['event:e_burner'], delayMs: 5000, text: "That number just went live again. Someone knows this phone was recovered, and they're shitting bricks about it. Good. Scared people make mistakes. Keep going — and keep pinning." },
    { id: 'e_h_lab', kind: 'handler', when: ['pinned:lab_data'], delayMs: 2500, text: "48 versus 4.8. That's not a typo, that's a motive. Nobody fat-fingers a decimal the week before a permit gets signed. Who signed that report?" },
    { id: 'e_mara', kind: 'text', when: ['recovered:msgfrag', 'note:n_insurance'], delayMs: 7000, thread: 'th_mara', contact: 'mara2', text: "if this is the police… it's me. M. I'm okay. cold as shit, but okay. I couldn't trust anyone from the station. the dry bag is safe. ask June — only June.", clue: 'mara_alive' },
    { id: 'e_h_mara', kind: 'handler', when: ['event:e_mara'], delayMs: 4500, text: "A new number just texted the phone. Read it before you do anything else — and don't reply. I mean it. Thumbs off the glass." },
    { id: 'e_h_ready', kind: 'handler', when: ['unlocked'], minPins: 10, delayMs: 3000, text: "Your board's getting heavy. When you can back every answer with evidence, open the Case Report. Don't make me walk a hunch into the DA's office — she eats those for breakfast." },
  ],

  hints: [
    { until: 'unlocked', text: 'The lock screen photo is an old print. Old cameras stamped the date in the corner. Tap the photo to look closer — "the day we got Biscuit."' },
    { until: 'seen:th_pryce', after: ['unlocked'], text: 'Start in Messages. Who was Mara arguing with — and who was she afraid of?' },
    { until: 'recovered:photos', after: ['unlocked'], text: 'TRACE can carve deleted files out of storage. Run the Photos job.' },
    { until: 'note:n_insurance', after: ['unlocked'], text: "The locked note wants Nana's boat. One of Mara's photos shows the name on its hull." },
    { until: 'pinned:pryce_pressure', after: ['unlocked'], text: 'Listen to the voicemails. One of them is a warning dressed up as advice. Pin it.' },
    { until: 'recovered:msgfrag', after: ['pinned:pryce_pressure'], text: 'TRACE can now rebuild deleted messages. Some threads have gaps on Oct 3.' },
    { until: 'pinned:reyes_number', after: ['unlocked'], text: 'The threatening number shows up somewhere official. Invitations list contact numbers — check Mail.' },
    { until: 'recovered:voice', after: ['pinned:burner_threat'], text: "TRACE's voicemail cache job: something was left on this phone the night she vanished." },
    { until: 'pinned:theo_alibi', after: ['unlocked'], text: "Theo looks bad. But where was he at 23:30? Social posts carry timestamps." },
    { until: 'pinned:cabin_wifi', after: ['unlocked'], text: 'Settings remembers every Wi-Fi network the phone has ever joined.' },
    { until: 'report:filed', after: ['unlocked'], text: 'You have what you need. Open the Case Report and back every answer with a pinned clue.' },
  ],

  handlerIntro: "You're on. Phone's live, battery's whatever the hell it is, and it smells like a crab crawled in there to die. A rich developer, a professor with tenure and a god complex, and a dead-quiet beach town — this shit writes itself. Anything you pin goes to the board — I'll ping you if I see something worth a damn. Start with the lock screen.",

  epilogue: {
    solved: [
      'Harrow PD found Mara Quill at 6:40 a.m. on October 13, asleep in a borrowed cabin at Larch Hollow, with an orange dry bag under her pillow.',
      'Three vials. One printout. Batch HB-17, independently re-tested: lead at 51 ppb.',
      'Dr. Alan Pryce was arrested at the station. Cal Reyes was picked up at the Blackrock pad two hours later; his phone still had the burner SIM.',
      'Mara told it the way you read it: she went to Gull Point, saw a flashlight on the path, and ran along the rocks. She threw her phone into a tide pool so they would think the sea had her.',
      'The Gazette ran the story on a Sunday. The marina permit was revoked on Monday.',
    ],
    partial: [
      'Your report went to the DA with holes in it.',
      'Some of what you found was right. Some of it pointed the wrong way — and in a case like this, the wrong name is worse than no name.',
      'Mara is still out there. Go back through the phone. The truth was in it the whole time.',
    ],
  },
};
