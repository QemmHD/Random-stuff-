import type { CaseFile } from '../types';

// CAUGHT C3 — FANTASY LEAGUE
// Client: Trish Hoyt (née Delgado), 44, pharmacist. Subject: husband Doug Hoyt, 46,
// Regional Sales Manager, Pinnacle Gutters.
// Doug's system: (1) two calendars — a shared WORK calendar with a fake weekly
// "Quarterly Gutter Summit" in Cedar Falls every Thursday, and a PERSONAL one that says
// "🛋️ QB"; (2) the "Gridiron Gentlemen" fantasy-football group chat is an alibi network
// (STARTING MY QB = seeing her; HANDCUFF = backup alibi; BYE WEEK = wife away; IR = wife
// suspicious; COMMISH FEE = 10%); (3) "Calc+ Pro", a calculator app that is a private
// message vault, where he talks to "K 🛋️".
// K = Dr. Kendra Lusk, LMFT — the COUPLES THERAPIST Trish picked in September. Doug books
// "individual sessions" Thursdays at 7 (office closes at 5) at Lusk Counseling, Suite 210,
// Oakmont Professional Plaza, and bills them to his HSA card.
// Final twist: "The Commish", who runs the league's alibi service for 10% and a side pot
// on when Trish finds out, is Trish's own brother Ricky Delgado (same number as "Ricky
// (Trish's brother)", PaySnaps to R. DELGADO, the crown at draft night).
// Red herring: Destiny from the front desk ("can't stop thinking about last night...
// still sweating... lips are numb") = the office ghost-pepper wing challenge.
// Passcode 4138: framed scorecard, front-nine strokes (41) then back-nine strokes (38).
// Trap: the par row (36/36).

const ROXY = { name: 'Roxy Vance', role: 'Vance Discreet Investigations', avatar: 'av_roxy' };

export const caught3: CaseFile = {
  id: 'caught-3',
  number: 'C3',
  mode: 'caught',
  handler: ROXY,
  title: 'Fantasy League',
  tagline: "Two calendars. A calculator that doesn't calculate. Four grown men who keep a backup for Thursdays.",
  difficulty: 2,
  cover: 'cg3_cover',
  owner: { name: 'Doug Hoyt', age: 46, summary: 'Regional Sales Manager, Pinnacle Gutters. Runner-up, Gridiron Gentlemen fantasy league, three years running. Married nineteen years. Has a system for everything.' },
  status: 'SUSPECTED CHEATER · RUNS A SYSTEM',
  deviceCondition: 'RECOVERED FROM A GOLF-BAG BALL WASHER · FAINT GHOST-PEPPER RESIDUE ON SCREEN · 93% READABLE',
  briefing: [
    "INTAKE — Vance Discreet Investigations. Client: Patricia 'Trish' Hoyt (née Delgado), 44, pharmacist. Arrived with a binder. Tabs. Color-coded. Respect.",
    "Subject: Doug Hoyt, 46, her husband of nineteen years. Regional Sales Manager, Pinnacle Gutters. Client: 'He's not smart, but he's ORGANIZED. That's worse.'",
    "Client's grounds: every Thursday he's at the 'Quarterly Gutter Summit' in Cedar Falls, which is apparently quarterly every week. Three hours a night on 'fantasy football'. And a calculator app with a lock on it. 'Who locks a calculator, Roxy? What is he calculating?' She also says he's been 'weirdly calm' since they started couples therapy in September — her idea, with 'a lovely woman, Dr. Lusk'.",
    "Client's suspects: Destiny from his front desk ('laughs like a car alarm') and 'whoever he's texting in that football chat with my idiot brother Ricky in it'. Client asked me to note that her brother is 'harmless, unemployed, and owes me three thousand dollars'.",
    "The phone: Doug left it in his golf bag; client 'found it in the ball washer'. Passcode, per client: 'That framed scorecard in the garage. The one round in his life he says he didn't cheat on. \"Front nine, back nine, Trish. A man's whole life is front nine and back nine.\" The totals got coffee on them. Add it up yourself. I'm not touching that man's math.'",
  ],
  phoneDate: '2026-11-23',
  phoneTime: '08:12',
  lock: {
    passcode: '4138',
    hint: 'add up his strokes on the framed scorecard (not the par row): front-nine total, then back-nine total',
    wallpaper: 'cg3_wall_lock',
    notifications: [
      { app: 'messages', title: 'Gridiron Gentlemen 🏈', text: '[Sully]: need a handcuff thursday or u good?', t: '2026-11-19T12:02' },
      { app: 'mail', title: 'Calc+ Pro', text: 'Your Private Vault backed up successfully (37 items) 🔒', t: '2026-11-22T03:00' },
      { app: 'calendar', title: 'Quarterly Gutter Summit — Cedar Falls', text: 'Thursday 6:30 PM', t: '2026-11-19T17:30' },
      { app: 'messages', title: 'Destiny (front desk)', text: "can't stop thinking about last night 🥵 i'm still sweating", t: '2026-11-20T08:02' },
      { app: 'messages', title: 'Trish ❤️', text: 'Doug. Where is your phone. Why is your golf bag making noises.', t: '2026-11-22T19:40' },
    ],
  },
  homeWallpaper: 'cg3_wall_home',

  contacts: [
    { id: 'trish', name: 'Trish ❤️', avatar: 'av_cg3_trish', number: '(555) 761-1977', label: 'wife' },
    { id: 'league', name: 'Gridiron Gentlemen 🏈', avatar: 'av_cg3_league', number: '(555) 761-0000', label: 'group · 4' },
    { id: 'commish', name: 'The Commish 🏆', avatar: 'av_cg3_commish', number: '(555) 761-0042' },
    { id: 'ricky', name: "Ricky (Trish's brother) 🙄", avatar: 'av_cg3_ricky', number: '(555) 761-0042', label: 'brother-in-law' },
    { id: 'sully', name: 'Sully', avatar: 'av_cg3_sully', number: '(555) 761-2323' },
    { id: 'destiny', name: 'Destiny (front desk)', avatar: 'av_cg3_destiny', number: '(555) 761-5150', label: 'Pinnacle Gutters' },
    { id: 'lusk', name: 'Dr. Lusk (couples)', avatar: 'av_cg3_kendra', number: '(555) 761-3300', label: 'Lusk Counseling' },
    { id: 'k', name: 'K 🛋️ (Calc+ Vault)', avatar: 'av_cg3_k', number: 'Calc+ Vault ID 7731' },
    { id: 'c3unknown', name: '(555) 761-3301', avatar: 'av_unknown', number: '(555) 761-3301' },
  ],

  threads: [
    {
      id: 'th_league', contact: 'league', messages: [
        { from: 'them', text: '[The Commish]: Week 9. Trades due Thursday. Bye weeks are SACRED. Dues are due. Commish fee is due. PaySnap only.', t: '2026-11-04T12:00' },
        { from: 'me', text: 'need a handcuff thursday. trish is asking about the summit', t: '2026-11-04T12:05', clue: 'handcuff_code' },
        { from: 'them', text: "[Sully]: got you. you were at my place watching film", t: '2026-11-04T12:06', clue: 'handcuff_code' },
        { from: 'them', text: '[Sully]: what film', t: '2026-11-04T12:06' },
        { from: 'me', text: "sully it's not a real film", t: '2026-11-04T12:07' },
        { from: 'them', text: "[Big Paulie]: lmao doug's QB starting thursday AGAIN 🛋️", t: '2026-11-04T12:09', clue: 'handcuff_code' },
        { from: 'me', text: "QB starting thursday. usual time. if trish texts anyone i'm at sully's", t: '2026-11-11T12:00', clue: 'handcuff_code' },
        { from: 'them', text: "[Sully]: bro MY wife texts me too. who's MY handcuff", t: '2026-11-11T12:03' },
        { from: 'them', text: '[The Commish]: Sully, you are on IR until further notice. Rule 7.', t: '2026-11-11T12:04' },
        { from: 'them', text: '[Big Paulie]: over/under on when trish finds out. I got thanksgiving', t: '2026-11-16T20:10' },
        { from: 'them', text: '[The Commish]: Side pots are a Commish matter. 10% to the Commish. Rule 12.', t: '2026-11-16T20:11' },
        { from: 'me', text: 'can we not bet on my marriage in the main chat', t: '2026-11-16T20:12' },
        { from: 'them', text: "[The Commish]: Doug, that's what the main chat is FOR", t: '2026-11-16T20:12' },
        { from: 'them', text: '[Sully]: need a handcuff thursday or u good?', t: '2026-11-19T12:02' },
        { from: 'me', text: "good. trish is at a pharmacy conference till sunday. bye week 🛋️", t: '2026-11-19T12:04', clue: 'handcuff_code' },
        { from: 'them', text: "[The Commish]: Reminder: league business on my OTHER number, gents. This one's on my sister's family plan and she reads the bill like it's a prescription.", t: '2026-11-19T12:10', clue: 'commish_ricky' },
      ],
    },
    {
      id: 'th_commish', contact: 'commish', messages: [
        { from: 'them', text: 'Commish fee for October: $200. Rule 12: the Commish provides peace of mind. Peace of mind has a price.', t: '2026-11-02T10:00', clue: 'commish_fees' },
        { from: 'me', text: 'it was $150 last month', t: '2026-11-02T10:05' },
        { from: 'them', text: "Inflation, Doug. I covered for you twice this month. Thursday AND the 'dentist'. Do you know how hard it is to lie to a pharmacist? She counts pills for a living. She can count LIES.", t: '2026-11-02T10:06', clue: 'commish_fees' },
        { from: 'me', text: 'ok ok sending', t: '2026-11-02T10:08' },
        { from: 'them', text: "Doug. She asked me if I'd ever heard of a 'Quarterly Gutter Summit'. I said yes. Now I have to learn what a gutter is.", t: '2026-11-16T18:30' },
        { from: 'me', text: "it's the thing on the roof", t: '2026-11-16T18:31' },
        { from: 'them', text: 'I KNOW what a gutter is Doug, I was being dramatic', t: '2026-11-16T18:31' },
      ],
    },
    {
      id: 'th_ricky', contact: 'ricky', messages: [
        { from: 'me', text: 'ricky you still owe trish 3k. she brought it up at dinner. AGAIN', t: '2026-10-25T21:00' },
        { from: 'them', text: "tell her it's coming. i'm between opportunities. tell her i said hi, she won't pick up", t: '2026-10-25T21:04' },
        { from: 'them', text: "thanksgiving at ur place? i'll bring the dip. trish says i'm not allowed to bring 'the dip'. i'm bringing the dip", t: '2026-11-20T15:00' },
      ],
    },
    {
      id: 'th_destiny', contact: 'destiny', messages: [
        { from: 'them', text: "can't stop thinking about last night 🥵 i'm still sweating", t: '2026-11-20T08:02', clue: 'destiny_wings' },
        { from: 'them', text: "my lips are numb. i can't feel my face. i cried in the parking lot", t: '2026-11-20T08:03' },
        { from: 'me', text: 'told you. the ghost pepper round is no joke. you ate FOURTEEN', t: '2026-11-20T08:10', clue: 'destiny_wings' },
        { from: 'them', text: "and YOU tapped out at 3 and called the regional VP 'mommy'", t: '2026-11-20T08:11', photo: 'cg3_ph_wings' },
        { from: 'them', text: "also HR wants to know who put 'DESTINY ATE 14' on the shared calendar. i said you. you have a calendar problem doug", t: '2026-11-20T09:30' },
      ],
    },
    {
      id: 'th_trish', contact: 'trish', messages: [
        { from: 'them', text: "Summit again? It's every Thursday, Doug. That's not quarterly. That's weekly.", t: '2026-11-05T17:40' },
        { from: 'me', text: "it's quarterly in spirit", t: '2026-11-05T17:42' },
        { from: 'them', text: "Dr. Lusk says we should 'name our feelings'. My feeling's name is Cedar Falls.", t: '2026-11-05T17:43' },
        { from: 'me', text: 'summit ran long. traffic. so many gutters', t: '2026-11-12T22:10' },
        { from: 'them', text: 'You smell like lavender.', t: '2026-11-12T22:40' },
        { from: 'me', text: 'the summit had a candle', t: '2026-11-12T22:41' },
        { from: 'them', text: "I'm at the pharmacy conference till Sunday. Lusk on Tuesday at 5, don't you DARE skip again. She says you're 'making real progress in your individual work'. What individual work, Doug.", t: '2026-11-19T07:30', clue: 'hsa_sessions' },
        { from: 'them', text: 'Doug. Where is your phone. Why is your golf bag making noises.', t: '2026-11-22T19:40' },
      ],
    },
    {
      id: 'th_lusk', contact: 'lusk', messages: [
        { from: 'them', text: 'Hi Doug and Trish, this is Dr. Kendra Lusk confirming your first couples session, Tuesday 9/15 at 5:00 PM. Looking forward to it! 🙂', t: '2026-09-08T10:00', clue: 'therapy_start' },
        { from: 'me', text: "hi dr lusk, doug here. could i book some individual sessions? working on myself 🙏", t: '2026-10-01T21:15', clue: 'therapy_start' },
        { from: 'them', text: 'Of course. My regular hours end at 5, but I can make an exception: Thursdays at 7. Use the back entrance after hours. 🙂', t: '2026-10-01T21:40', clue: 'office_hours' },
        { from: 'them', text: 'Reminder: couples session Tuesday 5:00 PM. Please both attend. 🙂', t: '2026-11-17T09:00' },
      ],
    },
    {
      id: 'th_vault', contact: 'k', messages: [
        { from: 'them', text: "You can't call me Coach in session, Doug. Trish looked at me.", t: '2026-10-08T22:10', clue: 'vault_texts', deletedUntil: 'recovered:vault' },
        { from: 'me', text: "she looks at everyone like that. she's a pharmacist", t: '2026-10-08T22:12', deletedUntil: 'recovered:vault' },
        { from: 'them', text: "Thursday. 7. Back door, the one by the dumpster. The couch is reupholstered. Don't tell me what you think of it until after.", t: '2026-10-15T12:00', clue: 'vault_texts', deletedUntil: 'recovered:vault' },
        { from: 'me', text: 'starting my QB 🛋️', t: '2026-10-15T12:02', deletedUntil: 'recovered:vault' },
        { from: 'them', text: "I don't know what that means and I hate that I find it exciting.", t: '2026-10-15T12:03', deletedUntil: 'recovered:vault' },
        { from: 'me', text: 'how did tuesday go. i thought it went well', t: '2026-11-04T19:00', deletedUntil: 'recovered:vault' },
        { from: 'them', text: "Doug, I spent fifty minutes helping your wife 'name her feelings' about you while I was one of the feelings. Thursday, 7.", t: '2026-11-04T19:20', clue: 'vault_texts', deletedUntil: 'recovered:vault' },
        { from: 'them', text: "You left your Pinnacle lanyard on the couch. My 8 a.m. found it. I told him it was a 'transitional object'.", t: '2026-11-13T08:40', deletedUntil: 'recovered:vault' },
        { from: 'me', text: 'trish is away till sunday. bye week 🛋️', t: '2026-11-19T12:06', deletedUntil: 'recovered:vault' },
        { from: 'them', text: "Thursday. Bring wine. Don't bring the football voice.", t: '2026-11-19T12:30', clue: 'vault_texts', deletedUntil: 'recovered:vault' },
      ],
    },
  ],

  photos: [
    { id: 'cg3_ph_garage', art: 'cg3_ph_garage', t: '2026-10-12T14:00', place: 'Briar Glen — garage', orientation: 'landscape', caption: 'A tidy garage: a golf bag, a mini-fridge with a small trophy on top, a framed scorecard on pegboard, and a label maker on the workbench.' },
    { id: 'cg3_ph_draft', art: 'cg3_ph_draft', t: '2026-09-06T21:30', place: "Sully's basement", orientation: 'landscape', caption: 'Four men in football jerseys around a magnetic draft board in a wood-panelled basement. One wears a plastic crown and holds a gavel.' },
    { id: 'cg3_ph_wings', art: 'cg3_ph_wings', t: '2026-11-19T20:45', place: 'Wingzilla', orientation: 'landscape', caption: 'Sent by Destiny. A restaurant table covered in empty wing baskets and milk glasses; a handwritten scoreboard taped to the wall.', clue: 'destiny_wings' },
    { id: 'cg3_ph_summit', art: 'cg3_ph_summit', t: '2026-11-12T18:58', place: 'Unknown — vehicle interior', orientation: 'portrait', caption: 'Recovered. Selfie in a parked car at dusk, thumbs up, wearing a lanyard. Reversed lettering is reflected in the driver\'s window behind him. Deleted Nov 12.', clue: 'summit_selfie', deletedUntil: 'recovered:photos' },
    { id: 'cg3_ph_backdoor', art: 'cg3_ph_backdoor', t: '2026-11-05T18:59', place: 'Oakmont Professional Plaza', orientation: 'portrait', caption: 'Recovered. A steel back door beside a dumpster under a security light; a small engraved plaque by the handle. Deleted Nov 5.', clue: 'summit_selfie', deletedUntil: 'recovered:photos' },
    // Hidden album
    { id: 'cg3_ph_h_couch', art: 'cg3_ph_h_couch', t: '2026-11-12T20:15', place: 'Oakmont Professional Plaza', orientation: 'portrait', hidden: true, caption: 'Hidden album. A man in football-print boxer shorts reclines on a velvet fainting couch, a throw pillow on his lap. A framed certificate and a box of tissues are on the wall and side table behind him.', clue: 'couch_selfie' },
    { id: 'cg3_ph_h_k', art: 'cg3_ph_h_k', t: '2026-11-18T23:02', place: 'Received via Calc+ Vault', orientation: 'portrait', hidden: true, caption: 'Hidden album. Received. A pair of legs in heels and sheer stockings crossed on a velvet couch; a legal pad on the lap with handwriting. No face visible.' },
    { id: 'cg3_ph_h_jersey', art: 'cg3_ph_h_jersey', t: '2026-10-30T23:30', place: 'Briar Glen — garage', orientation: 'portrait', hidden: true, caption: 'Hidden album. A man in an oversized football jersey and boxers poses with a small trophy in front of a mini-fridge, flexing.' },
  ],

  notes: [
    {
      id: 'n_rules', title: 'Gridiron Gentlemen — Rulebook (COMMISH EYES ONLY)', t: '2026-09-06T23:50', lock: { password: 'tightendsituation', hint: "The Commish's team name. Lowercase, no spaces." }, clue: 'league_rules',
      body: "GRIDIRON GENTLEMEN — OFFICIAL GLOSSARY\n(copied from the Commish. do NOT screenshot)\n\nSTARTING MY QB = seeing her\nHANDCUFF = backup alibi ('you were at my place')\nBYE WEEK = wife out of town. free week\nIR = wife suspicious. go dark\nTRADE DEADLINE = Thanksgiving. everybody behave\nWAIVER WIRE = new prospect (Sully: NO)\nCOMMISH FEE = 10% of peace of mind. PaySnap only\n\nRULE 1: Nobody tells the Commish's sister ANYTHING.\nRULE 7: Sully is on IR.\nRULE 12: All side pots go through the Commish.\nRULE 19: If anyone asks, the Summit is real.",
    },
    { id: 'n_summit', title: 'Summit talking points', t: '2026-10-07T08:00', body: "if trish asks:\n- 'gutters are seamless now'\n- K-style vs half-round (K-STYLE. lol)\n- 'leaf guard is the future'\n- Cedar Falls has a 'nice Marriott' (CHECK IF THERE IS A MARRIOTT)\n- keynote speaker: 'Gary from Ohio'" },
    { id: 'n_golf', title: 'Rolling Pines 6/14/19 🏌️', t: '2019-06-14T19:00', body: "the round.\nno mulligans. no foot wedge. HONEST.\nfront nine and back nine, every stroke on the card.\nframed it. it's my code for everything now. trish says that's 'not secure'. trish isn't a golfer." },
  ],

  mail: [
    { id: 'm_hr', from: 'Linda Park (HR), Pinnacle Gutters', fromAddr: 'hr@pinnaclegutters.example', to: 'Doug Hoyt', subject: "Re: 'Quarterly Gutter Summit'", t: '2026-11-13T09:00', folder: 'inbox', clue: 'summit_fake', body: "Doug,\n\nFor the third time: there is no Quarterly Gutter Summit. There has never been a Quarterly Gutter Summit.\n\nPlease stop putting it on the SHARED sales calendar. Two of your reps drove to Cedar Falls last Thursday and sat in a hotel lobby for three hours. One of them cried.\n\nAlso, who put 'DESTINY ATE 14' on the calendar.\n\nLinda, HR" },
    { id: 'm_calc', from: 'Calc+ Pro', fromAddr: 'receipts@calcplus.example', to: 'Doug Hoyt', subject: 'Receipt — Calc+ Pro: Private Vault Edition', t: '2026-09-29T23:10', folder: 'inbox', clue: 'calc_app', body: "Thanks for your purchase!\n\nCalc+ Pro — PRIVATE VAULT EDITION — $4.99\n\nLooks like a calculator. Isn't. 🤫\nType your PIN and press '=' to open your private messages, photos and contacts. Anyone else just sees a calculator.\n\nVault backups: nightly, 3:00 a.m." },
    { id: 'm_lusk', from: 'Lusk Counseling', fromAddr: 'office@luskcounseling.example', to: 'Doug & Trish Hoyt', subject: 'Welcome! Your first session', t: '2026-09-08T09:30', folder: 'inbox', clue: 'office_hours', body: "Welcome, Doug and Trish!\n\nDr. Kendra Lusk, LMFT\nSuite 210, Oakmont Professional Plaza\nOffice hours: Monday–Friday, 9 AM – 5 PM\nAfter-hours line (existing clients): (555) 761-3301\n\nPlease arrive ten minutes early. Parking is around the back, by the dumpster. We know." },
    { id: 'm_fantasy', from: 'GridironPro Fantasy', fromAddr: 'noreply@gridironpro.example', to: 'Doug Hoyt', subject: 'Week 11 matchup is set! 🏈', t: '2026-11-17T06:00', folder: 'inbox', body: "WEEK 11 — GRIDIRON GENTLEMEN\n\nGUTTER BALLERS (Doug H.)  vs  TIGHT END SITUATION (The Commish)\n\nProjected: Gutter Ballers 84.2 – Tight End Situation 131.0\n\nTip: your starting QB has been 'questionable' for 6 weeks. Consider a handcuff!" },
    { id: 'm_marriott', from: 'Cedar Falls Grand Hotel', fromAddr: 'frontdesk@cfgrand.example', to: 'Doug Hoyt', subject: 'Re: Summit room block?', t: '2026-10-08T11:00', folder: 'trash', body: "Hi Mr. Hoyt,\n\nWe have no record of a 'Quarterly Gutter Summit' at our property, and no room block under Pinnacle Gutters.\n\nYou asked us to 'just say there is one if a woman calls'. We can't do that, sir. We're a hotel." },
  ],

  calls: [
    { contact: 'trish', t: '2026-11-22T19:41', dir: 'missed' },
    { contact: 'sully', t: '2026-11-21T10:15', dir: 'missed' },
    { contact: 'commish', t: '2026-11-21T11:02', dir: 'missed' },
    { contact: 'trish', t: '2026-11-19T07:35', dir: 'in', duration: '1:02' },
    { contact: 'lusk', t: '2026-11-12T18:52', dir: 'out', duration: '0:20' },
    { contact: 'destiny', t: '2026-11-19T22:30', dir: 'in', duration: '0:45' },
  ],

  voicemails: [
    { id: 'vm_trish', contact: 'trish', t: '2026-11-19T07:40', duration: '0:24', voice: { pitch: 1.05, rate: 1.1, female: true }, clue: 'summit_fake', transcript: "Doug. I called the Cedar Falls Grand. They've never heard of a gutter summit. The girl at the desk asked me if I was okay. I'm a pharmacist, Doug. I'm always okay. Call me back." },
    { id: 'vm_sully', contact: 'sully', t: '2026-11-21T10:15', duration: '0:29', voice: { pitch: 0.85, rate: 1.0, female: false }, transcript: "Doug, it's Sully. Trish called me asking what 'film' we watched. I said The Notebook. She said 'you watched The Notebook with my husband every Thursday for two months.' I said yes. I think she believed me. I think. Call me. Am I still on IR?" },
    { id: 'vm_commish', contact: 'commish', t: '2026-11-21T11:02', duration: '0:38', voice: { pitch: 1.1, rate: 1.3, female: false }, clue: 'commish_ricky', deletedUntil: 'recovered:voice', transcript: "Dougie, it's Ricky — it's, uh, it's the Commish. The Commish speaking. Listen. My sister called asking if I'd 'ever heard of a gutter summit'. I said yes, it's huge, it's like the Super Bowl of gutters. I need the fee by Friday, and I need you to stop starting your QB on weeks my sister's in town. Also Kendra waved at me in the grocery store and I panicked and waved back. Bye week. Everybody go bye week." },
  ],

  map: {
    art: 'cg3_map',
    places: [
      { id: 'home', name: 'Home — Briar Glen', x: 0.16, y: 0.30 },
      { id: 'pinnacle', name: 'Pinnacle Gutters HQ', x: 0.40, y: 0.62 },
      { id: 'oakmont', name: 'Oakmont Professional Plaza (Lusk Counseling, Ste 210)', x: 0.58, y: 0.36 },
      { id: 'sully', name: "Sully's house", x: 0.28, y: 0.14 },
      { id: 'cedar', name: 'Cedar Falls Grand Hotel', x: 0.92, y: 0.10 },
      { id: 'golf', name: 'Rolling Pines Golf Club', x: 0.80, y: 0.70 },
      { id: 'wings', name: 'Wingzilla', x: 0.50, y: 0.84 },
    ],
    stops: [
      { t: '2026-11-05T17:35', place: 'pinnacle', detail: 'Departed' },
      { t: '2026-11-05T18:57', place: 'oakmont', detail: 'Arrived — 2h 48m', clue: 'thursday_plaza' },
      { t: '2026-11-12T18:56', place: 'oakmont', detail: 'Arrived — 2h 51m', clue: 'thursday_plaza' },
      { t: '2026-11-17T16:55', place: 'oakmont', detail: 'Arrived — 1h 02m' },
      { t: '2026-11-19T18:55', place: 'oakmont', detail: 'Arrived — 3h 02m', clue: 'thursday_plaza' },
      { t: '2026-11-19T22:05', place: 'home', detail: 'Arrived' },
      { t: '2026-11-19T20:30', place: 'wings', detail: 'Passed — no stop' },
      { t: '2026-11-22T09:10', place: 'golf', detail: 'Arrived — 4h 40m' },
    ],
  },

  browser: [
    { t: '2026-11-19T23:50', title: 'is it a conflict of interest if your therapist is also', url: 'search?q=is+it+a+conflict+of+interest+if+your+therapist+is+also' },
    { t: '2026-11-15T01:10', title: 'can a marriage counselor lose their license for (hypothetically)', url: 'search?q=can+marriage+counselor+lose+license+for' },
    { t: '2026-11-12T23:05', title: 'how to get lavender smell out of car upholstery fast', url: 'search?q=lavender+smell+out+of+car+upholstery' },
    { t: '2026-10-07T07:40', title: 'is there a marriott in cedar falls', url: 'search?q=is+there+a+marriott+in+cedar+falls' },
    { t: '2026-09-29T23:02', title: 'best calculator app that hides texts 2026', url: 'search?q=calculator+app+that+hides+texts', clue: 'calc_app' },
    { t: '2026-09-07T00:30', title: 'fantasy football handcuff meaning (for a friend\'s alibi)', url: 'search?q=fantasy+football+handcuff+meaning' },
  ],

  glimpse: [
    { id: 'g3_draft', author: 'me', photo: 'cg3_ph_draft', caption: 'Draft night 🏈 Gridiron Gentlemen, year 4. The Commish wore the crown. Again.', t: '2026-09-06T22:00', likes: 23, comments: [{ author: 'commish', text: 'The crown is EARNED' }, { author: 'trish', text: "Ricky why are you wearing a crown at my husband's draft" }, { author: 'sully', text: '🏈🏈🏈' }], clue: 'commish_ricky' },
    { id: 'g3_wings', author: 'destiny', photo: 'cg3_ph_wings', caption: 'PINNACLE WING NIGHT CHAMPION 🏆🌶️ 14 ghost peppers. doug tapped at 3 lol', t: '2026-11-19T21:10', likes: 112, comments: [{ author: 'me', text: 'never again' }, { author: 'trish', text: 'Who is this.' }], clue: 'destiny_wings' },
  ],

  bank: {
    account: 'Ridgeway Bank — D. Hoyt ••5521 (+ HSA card)',
    balance: 3212.08,
    tx: [
      { t: '2026-11-19T21:58', desc: 'HSA CARD — LUSK COUNSELING LLC — INDIVIDUAL SESSION (THU 7PM)', amount: -175.0, clue: 'hsa_sessions' },
      { t: '2026-11-19T18:40', desc: 'BOTTLE & CORK — PINOT NOIR ×2', amount: -46.0 },
      { t: '2026-11-16T20:15', desc: "PAYSNAP TO R. DELGADO — 'commish fee 🏆'", amount: -200.0, clue: 'commish_fees' },
      { t: '2026-11-12T21:52', desc: 'HSA CARD — LUSK COUNSELING LLC — INDIVIDUAL SESSION (THU 7PM)', amount: -175.0, clue: 'hsa_sessions' },
      { t: '2026-11-10T12:30', desc: 'CALLA LILY FLORIST — 1 DOZEN LAVENDER ROSES', amount: -72.0 },
      { t: '2026-11-05T21:47', desc: 'HSA CARD — LUSK COUNSELING LLC — INDIVIDUAL SESSION (THU 7PM)', amount: -175.0, clue: 'hsa_sessions' },
      { t: '2026-10-16T09:00', desc: "PAYSNAP TO R. DELGADO — 'commish fee 🏆'", amount: -150.0, clue: 'commish_fees' },
      { t: '2026-09-29T23:10', desc: 'APP STORE — CALC+ PRO PRIVATE VAULT', amount: -4.99, clue: 'calc_app' },
    ],
  },

  calendar: [
    { id: 'cal3_s1', t: '2026-11-05T18:30', title: '📘 WORK · Quarterly Gutter Summit — Cedar Falls', detail: 'Shared calendar · all sales reps', clue: 'two_calendars' },
    { id: 'cal3_p1', t: '2026-11-05T19:00', title: '📕 PERSONAL · 🛋️ QB', detail: 'back door', clue: 'two_calendars' },
    { id: 'cal3_s2', t: '2026-11-12T18:30', title: '📘 WORK · Quarterly Gutter Summit — Cedar Falls', detail: 'Shared calendar · all sales reps' },
    { id: 'cal3_p2', t: '2026-11-12T19:00', title: '📕 PERSONAL · 🛋️ QB', detail: 'wine' },
    { id: 'cal3_couples', t: '2026-11-24T17:00', title: '📕 PERSONAL · Couples w/ Dr. Lusk (Trish)', detail: 'act surprised by my progress', clue: 'therapy_start' },
    { id: 'cal3_wings', t: '2026-11-19T20:00', title: '📘 WORK · DESTINY ATE 14', detail: '(not me) (it was me)' },
    { id: 'cal3_thanks', t: '2026-11-26T14:00', title: '📕 PERSONAL · Thanksgiving — Ricky bringing "the dip"', detail: 'TRADE DEADLINE. everybody behave' },
  ],

  wifi: [
    { name: 'HOYT_HOUSE_5G', lastJoined: '2026-11-22T22:00' },
    { name: 'OakmontPlaza_Ste210_Guest', lastJoined: '2026-11-19T19:01', clue: 'thursday_plaza' },
    { name: 'Pinnacle_Corp', lastJoined: '2026-11-20T08:30' },
    { name: 'SullysBasement_NoWives', lastJoined: '2026-09-06T19:10' },
    { name: 'Wingzilla_FREE 🌶️', lastJoined: '2026-11-19T20:31' },
    { name: 'RollingPines_Clubhouse', lastJoined: '2026-11-22T09:12' },
  ],

  trace: [
    { id: 'vault', label: 'Calc+ Pro — Hidden Vault Database', detail: "Decrypt the 'calculator' app's private message store from its nightly backup.", needs: ['pinned:calc_app'], needsHint: "Need a lead first: pin what that 'calculator' really is.", durationMs: 6000 },
    { id: 'photos', label: 'Photos — Recently Deleted', detail: 'Carve images deleted on Thursday evenings out of unallocated flash storage.', needs: ['pinned:summit_fake'], needsHint: "Need a lead first: pin proof the Summit isn't what he says.", durationMs: 5000 },
    { id: 'voice', label: 'Voicemail — Carrier Cache', detail: 'Pull deleted voicemail audio from the carrier sync cache.', needs: ['note:n_rules'], needsHint: "Need a lead first: open the league's rulebook.", durationMs: 5500 },
  ],

  clues: [
    { id: 'two_calendars', title: 'Two calendars, same Thursday', text: "Every Thursday: '📘 WORK · Quarterly Gutter Summit — Cedar Falls' at 6:30 on the shared calendar, and '📕 PERSONAL · 🛋️ QB' at 7 on his own.", kind: 'document' },
    { id: 'summit_fake', title: 'There is no Summit', text: "HR: 'there has never been a Quarterly Gutter Summit' — two reps drove to Cedar Falls for nothing. Trish called the Cedar Falls Grand: never heard of it.", kind: 'document' },
    { id: 'summit_selfie', title: "The 'summit' selfie", text: "Recovered: Doug's Thursday 'summit' selfie at 18:58 — reflected in the window, reversed: 'OAKMONT PROFESSIONAL PLAZA · SUITE 210 · LUSK COUNSELING'. Also a photo of the plaza's back door: 'LUSK COUNSELING — AFTER HOURS'.", kind: 'place', art: 'cg3_ph_summit' },
    { id: 'handcuff_code', title: "'need a handcuff thursday'", text: "League chat: 'need a handcuff thursday, trish is asking about the summit' — 'you were at my place watching film'. 'QB starting thursday AGAIN 🛋️'. 'bye week'.", kind: 'document', art: 'av_cg3_league' },
    { id: 'league_rules', title: 'The Gridiron glossary', text: "The locked rulebook: STARTING MY QB = seeing her. HANDCUFF = backup alibi. BYE WEEK = wife away. IR = wife suspicious. Rule 1: nobody tells the Commish's sister anything.", kind: 'document' },
    { id: 'calc_app', title: 'The calculator is a vault', text: "Calc+ Pro, Private Vault Edition, $4.99: 'Looks like a calculator. Isn't.' Bought Sept 29, right after searching 'calculator app that hides texts'.", kind: 'object' },
    { id: 'vault_texts', title: "K 🛋️: 'Thursday. 7. Back door.'", text: "Vault messages from 'K': 'You can't call me Coach in session.' 'Thursday. 7. Back door... The couch is reupholstered.' 'Helping your wife name her feelings about you while I was one of the feelings.'", kind: 'person', art: 'av_cg3_k' },
    { id: 'hsa_sessions', title: "Thursday 'individual sessions'", text: "HSA card: Lusk Counseling 'INDIVIDUAL SESSION (THU 7PM)', $175, Nov 5, 12 and 19. Trish: Dr. Lusk says he's 'making real progress in his individual work'.", kind: 'document' },
    { id: 'office_hours', title: 'Office closes at 5', text: "Lusk Counseling: office hours 9–5, after-hours line (555) 761-3301. Dr. Lusk to Doug: 'I can make an exception: Thursdays at 7. Use the back entrance after hours.'", kind: 'document', art: 'av_cg3_kendra' },
    { id: 'thursday_plaza', title: 'Thursdays at Oakmont Plaza', text: "Every Thursday his phone is at Oakmont Professional Plaza ~19:00–22:00 and joins 'OakmontPlaza_Ste210_Guest'. Never in Cedar Falls; not at Sully's since draft night.", kind: 'place' },
    { id: 'couch_selfie', title: 'The fainting couch', text: "Hidden album, Thursday 20:15: Doug in football boxers on a velvet fainting couch, under a framed diploma: 'KENDRA LUSK, M.A., LMFT'.", kind: 'object', art: 'cg3_ph_h_couch' },
    { id: 'k_number', title: "K texts from Lusk's after-hours line", text: "Mid-investigation, 'K' texts from (555) 761-3301 — Lusk Counseling's after-hours line: 'Thursday is off. Tuesday is couples. Act surprised by your progress.'", kind: 'person', art: 'av_cg3_kendra' },
    { id: 'therapy_start', title: 'Couples therapy, since Sept 15', text: "Trish booked couples therapy with Dr. Kendra Lusk in September. Two weeks later Doug asked for 'individual sessions'.", kind: 'event' },
    { id: 'commish_fees', title: 'The Commish fee', text: "Doug pays 'The Commish' a monthly fee for covering for him ($150, then $200) — PaySnap to R. DELGADO. 'Do you know how hard it is to lie to a pharmacist?'", kind: 'document', art: 'av_cg3_commish' },
    { id: 'commish_ricky', title: 'The Commish is Ricky', text: "'The Commish' and 'Ricky (Trish's brother)' share one number, (555) 761-0042 — 'on my sister's family plan'. Trish on the draft photo: 'Ricky why are you wearing a crown.'", kind: 'person', art: 'av_cg3_ricky' },
    { id: 'destiny_wings', title: "Destiny: 'still sweating'", text: "Destiny from the front desk: 'can't stop thinking about last night, still sweating, lips numb' — the Pinnacle ghost-pepper wing night. She ate 14. Doug tapped out at 3.", kind: 'person', art: 'av_cg3_destiny' },
  ],

  questions: [
    {
      id: 'q_cheat', prompt: 'Is Doug cheating on Trish?',
      options: [
        { id: 'yes', label: 'Yes' },
        { id: 'no', label: 'No — he really loves gutters' },
        { id: 'football', label: "No — he's just addicted to fantasy football" },
      ],
      answer: 'yes', evidence: ['vault_texts', 'couch_selfie', 'k_number', 'hsa_sessions', 'thursday_plaza', 'league_rules'],
      explain: "A vault full of Thursday plans, a hidden selfie on a therapist's couch, and a league glossary where 'starting my QB' means seeing her.",
    },
    {
      id: 'q_who', prompt: "Who is 'K 🛋️'?",
      options: [
        { id: 'destiny', label: 'Destiny, from the front desk', art: 'av_cg3_destiny' },
        { id: 'kendra', label: 'Dr. Kendra Lusk — their couples therapist', art: 'av_cg3_kendra' },
        { id: 'kim', label: "Sully's wife, Kim" },
        { id: 'bot', label: "Nobody — 'K' is a fantasy-football bot" },
      ],
      answer: 'kendra', evidence: ['k_number', 'office_hours', 'couch_selfie', 'vault_texts', 'hsa_sessions', 'summit_selfie'],
      explain: "K talks about 'session' and Trish's feelings, texts from Lusk Counseling's after-hours line, and the couch in Doug's hidden selfie sits under her diploma. Destiny just ate fourteen wings.",
    },
    {
      id: 'q_where', prompt: 'Where do they meet?',
      options: [
        { id: 'cedar', label: 'The Quarterly Gutter Summit, Cedar Falls' },
        { id: 'office', label: 'Lusk Counseling, Suite 210, Oakmont Plaza — Thursdays at 7, after hours, back door' },
        { id: 'sully', label: "Sully's basement" },
        { id: 'wings', label: 'Wingzilla' },
      ],
      answer: 'office', evidence: ['thursday_plaza', 'hsa_sessions', 'office_hours', 'couch_selfie', 'summit_selfie', 'vault_texts'],
      explain: 'The office closes at five. Doug is there every Thursday from seven, joins its Wi-Fi, bills the HSA, and photographed the back door by the dumpster.',
    },
    {
      id: 'q_how', prompt: 'How did Doug hide it?',
      options: [
        { id: 'burner', label: 'A burner phone in the garage' },
        { id: 'system', label: 'A fake Summit on the work calendar, a calculator app that is a message vault, and a fantasy league running his alibis' },
        { id: 'delete', label: 'He deleted everything every night' },
        { id: 'golf', label: 'He said he was golfing' },
      ],
      answer: 'system', evidence: ['two_calendars', 'calc_app', 'handcuff_code', 'league_rules', 'summit_fake', 'vault_texts'],
      explain: "Two calendars, one fake summit, a $4.99 calculator that isn't, and a group chat where a 'handcuff' is a man saying you watched The Notebook at his place.",
    },
    {
      id: 'q_commish', prompt: "Who runs the league's alibi service?",
      options: [
        { id: 'sully', label: 'Sully', art: 'av_cg3_sully' },
        { id: 'paulie', label: 'Big Paulie' },
        { id: 'ricky', label: "The Commish — Trish's own brother, Ricky", art: 'av_cg3_ricky' },
        { id: 'lusk', label: 'Dr. Lusk', art: 'av_cg3_kendra' },
      ],
      answer: 'ricky', evidence: ['commish_ricky', 'commish_fees'],
      explain: "Same phone number as Ricky, 'my sister's family plan', PaySnaps to R. Delgado, and a crown at draft night. The brother who owes Trish $3,000 was charging her husband 10% to lie to her.",
    },
  ],

  events: [
    { id: 'e3_trish', kind: 'text', when: ['unlocked'], delayMs: 5000, thread: 'th_trish', contact: 'trish', text: "Is this Roxy's person? It's Trish. I'm at a pharmacy conference eating a dry muffin. Is it Destiny. She laughs like a car alarm. Tell me it's Destiny. I've already been mean to her in my head." },
    { id: 'e3_h_league', kind: 'handler', when: ['pinned:handcuff_code'], delayMs: 3000, text: "In fantasy football a handcuff is the backup you draft in case your starter goes down. Four grown men are using it as a verb. Men like this always write their rules down somewhere. Find the rulebook." },
    { id: 'e3_k', kind: 'text', when: ['recovered:vault'], delayMs: 6000, thread: 'th_k_sms', contact: 'c3unknown', clue: 'k_number', text: "Doug, it's K. Not on the calculator, I know, but you've been dark since Sunday and you're never dark. If Trish has your phone: wrong number. If she doesn't: Thursday is off. Tuesday is couples. For the love of God, act surprised by your progress." },
    { id: 'e3_ricky', kind: 'text', when: ['recovered:voice'], delayMs: 5000, thread: 'th_commish', contact: 'commish', clue: 'commish_ricky', text: "doug. DOUG. my sister just asked me if i know a woman named Roxy. she said it the way she says 'take with food'. BYE WEEK. EVERYBODY BYE WEEK. also i'm keeping the side pot" },
  ],

  hints: [
    { until: 'unlocked', text: "Trish: 'Front nine, back nine.' Add up his strokes on the scorecard — not the par row. Front-nine total, then back-nine total." },
    { until: 'pinned:summit_fake', after: ['unlocked'], text: 'Is there a Quarterly Gutter Summit? Ask HR. Ask Trish\'s voicemail.' },
    { until: 'recovered:photos', after: ['pinned:summit_fake'], text: "If he isn't in Cedar Falls on Thursdays, his deleted 'summit' photos might show where he is. TRACE Photos, then read the reflection." },
    { until: 'pinned:calc_app', after: ['unlocked'], text: 'Who locks a calculator? Check Mail and Bank for what he actually bought.' },
    { until: 'recovered:vault', after: ['pinned:calc_app'], text: "TRACE can open the calculator's vault database." },
    { until: 'note:n_rules', after: ['unlocked'], text: "The league rulebook wants the Commish's team name. GridironPro's matchup email has it." },
    { until: 'recovered:voice', after: ['note:n_rules'], text: 'Somebody deleted a voicemail from the Commish. TRACE the carrier cache.' },
    { until: 'hidden:open', after: ['unlocked'], text: 'Hidden album. Same code, of course. Read the wall behind him.' },
    { until: 'pinned:commish_ricky', after: ['unlocked'], text: "Compare the Commish's number with the rest of Doug's contacts. And read the comments on draft night." },
    { until: 'report:filed', after: ['unlocked'], text: 'File the report: whether, who, where, how, and who else was in on it. Pin every answer. Trish will check them against her binder.' },
  ],

  handlerIntro: "Roxy Vance. Today's client brought a binder with color-coded tabs, which is how I know she's going to be right and furious about it. Her husband's got two calendars, a calculator nobody's allowed to calculate on, and a fantasy football league that meets more often than the Senate. A man that organized isn't hiding one thing, kid. He's hiding a system. Get me in.",

  epilogue: {
    solved: [
      "Trish Hoyt read the report in her car outside the pharmacy conference, finished the dry muffin, and said 'Kendra' out loud eleven times, each one in the tone of a different side effect.",
      "She didn't confront Doug. She kept Tuesday's couples session and brought the report, a highlighter and her brother. Dr. Lusk asked everyone to name their feelings. Trish named three, all of them Kendra. Ricky named one: 'I'd like to keep the side pot.' Doug said 'starting my QB' out of reflex and lay down on the couch, which was the wrong couch to lie down on.",
      "The state licensing board suspended Dr. Kendra Lusk for eighteen months. The HSA administrator called Doug's Thursday 'individual sessions' 'the most creative use of a health savings account since the hot-tub guy'. Doug is repaying all of them. HR has removed the Quarterly Gutter Summit from the shared calendar and replaced it with a mandatory ethics seminar, Thursdays at seven.",
      "The Gridiron Gentlemen disbanded. Sully was finally taken off IR. Big Paulie won the side pot — he had Thanksgiving — and Ricky kept his 10%, then paid Trish back the $3,000, which she calls 'the first honest money that boy has ever touched'. Doug kept the scorecard. Trish had it reframed with a new total: zero.",
    ],
    partial: [
      'Your report reached the client with gaps in it.',
      "Trish went after Destiny from the front desk, who has a laugh like a car alarm, a wing-eating record and nothing else. HR got involved. Doug got a quiet Thursday with nobody watching, and the Commish raised his fee.",
      'Go back to Thursdays at seven. Follow the car, then the card, then the calculator.',
    ],
  },
};
