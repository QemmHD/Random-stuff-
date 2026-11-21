import type { CaseFile } from '../types';

// CAUGHT C2 — MYSTERY MAN
// Client: Greg Pruitt, 41, Assistant Regional Manager, DreamHaven Mattress Outlet.
// Subject: wife Nora Pruitt, 38, medical billing coder.
// Looks like: Thursday "book club" (doesn't exist) in Hotel Corvina Suite 512; a contact
// saved as "Mystery Man 🖤"; "Dev" texting "you were LOUD tonight"; a private account
// with $214k; a $212 lingerie receipt.
// Truth: Nora is the anonymous bestselling erotic-romance novelist DELPHINE RUSH
// (Tidewater Heat series, hero Captain Thorne Ashby). Mystery Man = her literary agent
// Bernard Okafor, 68 (saved that way because Greg reads her phone, and because it's the
// title of book 10). Suite 512 is a makeshift audiobook booth (mattresses on the walls);
// Dev is the sound engineer. The money is royalties. The lingerie, the cabin and the
// mortgage payoff are for their 10th anniversary on Nov 28, when she planned to tell
// Greg everything. The dedication reads "For G."
// Twist: GREG is cheating — with Tiffani Boone, Maple Court HOA president, every Tuesday
// ("bowling") at the Wyeth Motor Lodge, Room 6, on the joint card ••2291. He's never
// bowled a frame; the shoes still have the tags. He wants the report by Friday for
// divorce leverage.
// Passcode 0611: her bracelet spells it in Morse (long bead = dash, short bead = dot,
// gold spacers between digits): ----- / -.... / .---- / .----

const ROXY = { name: 'Roxy Vance', role: 'Vance Discreet Investigations', avatar: 'av_roxy' };

export const caught2: CaseFile = {
  id: 'caught-2',
  number: 'C2',
  mode: 'caught',
  handler: ROXY,
  title: 'Mystery Man',
  tagline: "A secret suite. A secret account. A man saved as 'Mystery Man 🖤'. Her husband wants proof. He's going to get some.",
  difficulty: 2,
  cover: 'cg2_cover',
  owner: { name: 'Nora Pruitt', age: 38, summary: 'Medical billing coder at Lakeside Orthopedics, by day. Married to Greg for almost ten years. Reads in the bath. Types very fast with the door closed.' },
  status: 'ALLEGEDLY UNFAITHFUL',
  deviceCondition: 'DROPPED IN A LAVENDER BUBBLE BATH · RICE-BAG RESUSCITATION (RICE STOLEN BY CLIENT) · 96% READABLE',
  briefing: [
    "INTAKE — Vance Discreet Investigations. Client: Greg Pruitt, 41, Assistant Regional Manager at DreamHaven Mattress Outlet ('three locations, two of them good'). Wore a fleece vest with his own name embroidered on it to a private investigator's office. Asked if we validate parking. We do not.",
    "Subject: Nora Pruitt, 38, his wife of almost ten years. Medical billing coder. Client: 'Quiet. Reads a lot. Nothing going on.' Client then produced a twenty-minute list of things going on.",
    "Client's grounds: Thursday nights she's 'at book club' until ten. Book club does not exist (client: 'I called the library. The library laughed.'). She has a contact saved as 'Mystery Man' with a black heart. A $212 lingerie receipt for lingerie he has never seen. A bank account he 'didn't know about' with 'serious money' in it.",
    "Client wants it in writing by Friday. When asked why Friday, client said 'no reason', then 'Tuesdays are bowling', also for no reason. Client asked twice whether a PI can see joint bank statements. I wrote that down twice.",
    "The phone: she dropped it in the bath Sunday; it was 'drying in rice'. Client took the rice. Passcode, per client: 'She wears this bracelet. Long beads, short beads, little gold spacers. She says it's \"my code, literally\". I said, is it a hippie thing. She said, \"It's a dots-and-dashes thing, Greg. You'd know if you ever listened.\" I never listen. It's my best quality.'",
  ],
  phoneDate: '2026-11-24',
  phoneTime: '09:40',
  lock: {
    passcode: '0611',
    hint: 'read the bracelet as Morse code: long bead = dash, short bead = dot, each gold spacer starts the next digit',
    wallpaper: 'cg2_wall_lock',
    notifications: [
      { app: 'messages', title: 'Bea 🐝', text: "still can't believe you turned your phone code into jewelry. dots and dashes!! nerd 🤓 SOS would've been more on brand", t: '2026-11-22T12:00' },
      { app: 'messages', title: 'Mystery Man 🖤', text: 'Thursday. Suite 512. Bring that voice. 🖤', t: '2026-11-19T16:02' },
      { app: 'mail', title: 'Velour & Lace', text: "Your order has shipped! 1× 'The Midnight Confession' set — gift wrapped 🎀", t: '2026-11-03T08:00' },
      { app: 'bank', title: 'Harbor CU', text: 'Deposit received: $18,400.00 — HARTWELL & FINCH LTD', t: '2026-11-21T06:00' },
      { app: 'phone', title: 'Missed call', text: 'Mystery Man 🖤 (3)', t: '2026-11-23T19:12' },
    ],
  },
  homeWallpaper: 'cg2_wall_home',

  contacts: [
    { id: 'greg', name: 'Greg 🛏️', avatar: 'av_cg2_greg', number: '(555) 380-2291', label: 'husband' },
    { id: 'mystery', name: 'Mystery Man 🖤', avatar: 'av_cg2_mystery', number: '(555) 380-7100' },
    { id: 'dev', name: 'Dev 🎧', avatar: 'av_cg2_dev', number: '(555) 380-5512' },
    { id: 'bea', name: 'Bea 🐝', avatar: 'av_cg2_bea', number: '(555) 380-4012', label: 'sister' },
    { id: 'tiffani', name: 'Tiffani Boone (HOA)', avatar: 'av_cg2_tiffani', number: '(555) 380-1414', label: 'across the street, #14' },
    { id: 'hoa', name: 'Maple Court Neighbors 🏡', avatar: 'av_cg2_hoa', number: '(555) 380-0000', label: 'group' },
  ],

  threads: [
    {
      id: 'th_mystery', contact: 'mystery', messages: [
        { from: 'them', text: "Read chapter 14 on the train. Had to get off two stops early and walk it off. Ruth asked why I was sweating. I said 'the train'.", t: '2026-10-29T20:14', clue: 'chapter_talk', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: 'too much?', t: '2026-10-29T20:20', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: 'My dear, there is no such thing. The publisher wants MORE. More hayloft. More thunder. More of whatever the captain does with that rope.', t: '2026-10-29T20:22', clue: 'chapter_talk', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: 'Thursday. Suite 512. Bring that voice. 🖤', t: '2026-11-05T16:00', clue: 'mystery_texts' },
        { from: 'me', text: "I'll be there at 7. Greg thinks it's book club", t: '2026-11-05T16:02', clue: 'mystery_texts' },
        { from: 'them', text: "There is a book club. It's you. You're the book.", t: '2026-11-05T16:03', clue: 'mystery_texts' },
        { from: 'them', text: "Tonight was the best yet. Dev says your breathy bit in chapter 9 'redlined the meter'. I've never been prouder of anyone. Not even my children. Don't tell my children.", t: '2026-11-12T22:30', clue: 'chapter_talk', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: 'Thursday. Suite 512. Bring that voice. 🖤', t: '2026-11-19T16:02' },
        { from: 'me', text: "done!! all 31 chapters. I can't believe I said 'his throbbing lantern' into a microphone in front of a 24-year-old", t: '2026-11-19T22:15', clue: 'chapter_talk', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: 'Dev has heard worse. Dev records the Bible on Mondays.', t: '2026-11-19T22:17', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: "The money's cleared to your private account. Have you told him yet?", t: '2026-11-21T10:00' },
        { from: 'me', text: "the 28th. ten years. I'm telling him everything. I'm so nervous I bought lingerie, which is not a normal response to nerves", t: '2026-11-21T10:04' },
        { from: 'them', text: "It's the only normal response to nerves.", t: '2026-11-21T10:05' },
      ],
    },
    {
      id: 'th_dev', contact: 'dev', messages: [
        { from: 'them', text: 'you were LOUD tonight 😅 the guy in 514 called the front desk. worth it tho', t: '2026-11-05T22:20', clue: 'dev_texts' },
        { from: 'me', text: 'sorry!! I get into it', t: '2026-11-05T22:24' },
        { from: 'them', text: "never apologize. same mattress setup next week? I'll bring extra pillows for your knees", t: '2026-11-05T22:25', clue: 'dev_texts' },
        { from: 'them', text: "honestly you're a natural. best I've had in that suite and I've had a LOT of people in that suite", t: '2026-11-12T22:40' },
        { from: 'them', text: "that's a wrap!! 🎉 you were incredible. B cried. I cried. 514 slipped a note under the door that just says 'brava'", t: '2026-11-19T22:20' },
      ],
    },
    {
      id: 'th_greg', contact: 'greg', messages: [
        { from: 'them', text: "bowling tonight babe, don't wait up. strike force needs me 🎳", t: '2026-11-03T18:40' },
        { from: 'me', text: 'you never come back with scores', t: '2026-11-03T18:44' },
        { from: 'them', text: "a true athlete doesn't brag. also we lost", t: '2026-11-03T18:45' },
        { from: 'me', text: 'what about Lake Wyeth for our anniversary? there\'s a cute little lodge', t: '2026-11-06T12:10' },
        { from: 'them', text: "NO. wyeth is boring. terrible motel. room 6 has a smell. i've heard", t: '2026-11-06T12:11', clue: 'wyeth_avoid' },
        { from: 'me', text: 'you\'ve heard about the smell of a specific room', t: '2026-11-06T12:14' },
        { from: 'them', text: 'people talk babe. at bowling', t: '2026-11-06T12:15', clue: 'wyeth_avoid' },
        { from: 'them', text: 'bowling 🎳 back late', t: '2026-11-10T18:45' },
        { from: 'me', text: 'you smell like vanilla', t: '2026-11-10T23:58' },
        { from: 'them', text: "the lanes have a new air freshener. it's very strong. it's called 'vanilla'", t: '2026-11-10T23:59' },
        { from: 'them', text: 'bowling 🎳', t: '2026-11-17T18:41' },
        { from: 'them', text: "how's book club", t: '2026-11-19T19:02' },
        { from: 'me', text: 'deep.', t: '2026-11-19T19:30' },
        { from: 'them', text: "did u see the rice is gone. weird. probably the dog", t: '2026-11-22T08:15' },
        { from: 'me', text: "we don't have a dog, greg", t: '2026-11-22T08:20' },
        { from: 'me', text: 'keep saturday free. the 28th. I mean it. I have something to tell you', t: '2026-11-23T21:00', clue: 'anniversary_plan' },
        { from: 'them', text: 'is it bad', t: '2026-11-23T21:01' },
        { from: 'me', text: "it's the best news of your life. wear the nice shirt. not the vest", t: '2026-11-23T21:03', clue: 'anniversary_plan' },
      ],
    },
    {
      id: 'th_bea', contact: 'bea', messages: [
        { from: 'them', text: 'did you tell him yet', t: '2026-11-02T20:00' },
        { from: 'me', text: "the 28th. the cabin, the dedication, everything. I'm paying off the house, Bea. HIS house. the one he calls 'my house'", t: '2026-11-02T20:05', clue: 'anniversary_plan' },
        { from: 'them', text: "you're paying off a mortgage for a man who says 'bowling' every Tuesday and has never once owned a ball", t: '2026-11-02T20:06' },
        { from: 'me', text: 'he has shoes', t: '2026-11-02T20:07' },
        { from: 'them', text: "he has shoes he has never worn, Nora. the tags are still on. they live in his trunk next to a body spray called 'Vanilla Dreams'", t: '2026-11-02T20:09', photo: 'cg2_ph_shoes' },
        { from: 'them', text: "also tiffani from across the street keeps asking me if greg 'is a good bowler'. with a face. a whole face", t: '2026-11-18T13:00' },
        { from: 'them', text: "still can't believe you turned your phone code into jewelry. dots and dashes!! nerd 🤓 SOS would've been more on brand", t: '2026-11-22T12:00' },
      ],
    },
    {
      id: 'th_hoa', contact: 'hoa', messages: [
        { from: 'them', text: '[Tiffani Boone]: Reminder: NO inflatables on lawns before Dec 1. Yes, Gary, that includes the turkey.', t: '2026-11-15T09:00' },
        { from: 'them', text: '[Gary #9]: the turkey is festive tiffani', t: '2026-11-15T09:04' },
        { from: 'them', text: '[Tiffani Boone]: The turkey is fourteen feet tall, Gary.', t: '2026-11-15T09:05' },
        { from: 'them', text: "[Tiffani Boone]: greg u left ur bowling shoes in my car AGAIN 😘 tags still on lol. room 6 tues? i'll bring the vanilla", t: '2026-11-17T23:12', clue: 'tiffani_slip', deletedUntil: 'recovered:unsent' },
        { from: 'them', text: '[Tiffani Boone]: WRONG CHAT. how do you delete for everyone. DELETE', t: '2026-11-17T23:13', clue: 'tiffani_slip', deletedUntil: 'recovered:unsent' },
        { from: 'them', text: '[Gary #9]: ??? what did tiffani post', t: '2026-11-17T23:14' },
        { from: 'them', text: '[Tiffani Boone]: Nothing!! Butt dial! Reminder: NO inflatables!!', t: '2026-11-17T23:15' },
        { from: 'them', text: "[Gary #9]: i saw 'room 6' tiffani", t: '2026-11-17T23:16' },
        { from: 'them', text: '[Tiffani Boone]: Room 6 of the CLUBHOUSE. HOA business. Goodnight, Gary.', t: '2026-11-17T23:17' },
        { from: 'them', text: '[Gary #9]: the clubhouse is one room', t: '2026-11-17T23:18' },
      ],
    },
    {
      id: 'th_tiffani', contact: 'tiffani', messages: [
        { from: 'them', text: 'Hi Nora! Friendly HOA reminder that your recycling bin faced the wrong way Tuesday 🙂', t: '2026-10-20T08:00' },
        { from: 'me', text: "it's a bin, Tiffani", t: '2026-10-20T08:30' },
        { from: 'them', text: "It's a community, Nora 🙂", t: '2026-10-20T08:31' },
        { from: 'them', text: 'Totally random, but does Greg bowl? Like is he GOOD', t: '2026-11-18T12:40' },
        { from: 'me', text: 'he says so. why?', t: '2026-11-18T13:10' },
        { from: 'them', text: 'no reason!! 🙂🎳', t: '2026-11-18T13:11' },
      ],
    },
  ],

  photos: [
    { id: 'cg2_ph_wedding', art: 'cg2_ph_wedding', t: '2026-11-01T10:00', place: 'Maple Court', orientation: 'portrait', caption: 'A framed wedding photo propped on a windowsill: a couple on a dock, the man laughing mid-sentence. A date engraved on the frame.' },
    { id: 'cg2_ph_cabin', art: 'cg2_ph_cabin', t: '2026-11-03T21:20', place: 'Pine Hollow Cabins (listing screenshot)', orientation: 'landscape', caption: 'Screenshot of a cabin rental listing: a log cabin at dusk with a hot tub, dates Nov 27–29 highlighted, status "BOOKED".', clue: 'anniversary_plan' },
    { id: 'cg2_ph_shoes', art: 'cg2_ph_shoes', t: '2026-11-02T20:08', place: 'Received from Bea', orientation: 'landscape', caption: 'Sent by Bea. An open car trunk: a pair of two-tone bowling shoes with paper tags attached, beside a bottle of body mist.', clue: 'bowling_forfeit' },
    { id: 'cg2_ph_tiffani', art: 'cg2_ph_tiffani', t: '2026-11-17T21:38', place: 'Wyeth Motor Lodge', orientation: 'portrait', caption: "From Tiffani Boone's Glimpse. Mirror selfie in a motel room. A fleece vest is draped over a chair behind her; a key fob on the dresser.", clue: 'tiffani_post' },
    { id: 'cg2_ph_suite', art: 'cg2_ph_suite', t: '2026-11-12T18:58', place: 'Hotel Corvina, Suite 512', orientation: 'landscape', caption: 'Recovered. A hotel suite with mattresses propped against every wall, a microphone with a pop filter on a stand, a laptop and a stack of printed pages. A young man in headphones gives a thumbs-up. Deleted Nov 12.', clue: 'recording_booth', deletedUntil: 'recovered:photos' },
    { id: 'cg2_ph_mic', art: 'cg2_ph_mic', t: '2026-11-19T21:55', place: 'Hotel Corvina, Suite 512', orientation: 'portrait', caption: 'Recovered. Selfie: a woman in headphones and a cardigan in front of a microphone, holding a printed page; an older man in a bow tie wipes his eyes behind her. Deleted Nov 19.', clue: 'recording_booth', deletedUntil: 'recovered:photos' },
    // Hidden album
    { id: 'cg2_ph_h_proof', art: 'cg2_ph_h_proof', t: '2026-11-16T23:10', place: 'Maple Court', orientation: 'portrait', hidden: true, caption: 'Hidden album. A printed book page proof on a bedspread, with a red pen and a cup of tea.', clue: 'hidden_dedication' },
    { id: 'cg2_ph_h_lace', art: 'cg2_ph_h_lace', t: '2026-11-04T22:30', place: 'Maple Court', orientation: 'portrait', hidden: true, caption: 'Hidden album. A woman in black lace lingerie and a silk robe takes a mirror selfie, holding a small gift card to the camera. A wrapped box on the bed.', clue: 'lingerie_receipt' },
    { id: 'cg2_ph_h_cover', art: 'cg2_ph_h_cover', t: '2026-10-28T19:00', place: 'Received from Mystery Man 🖤', orientation: 'portrait', hidden: true, caption: 'Hidden album. Received. A paperback cover mock-up: a shirtless man in an open captain\'s coat on a storm-lashed dock, a lighthouse beam behind him. A sticky note on the corner.' },
  ],

  notes: [
    {
      id: 'n_outline', title: 'TH #11 — outline (NOT book club notes)', t: '2026-11-20T01:15', lock: { password: 'thorne', hint: 'His first name. Every woman in Tidewater wants him. Lowercase.' }, clue: 'author_reveal',
      body: "TIDEWATER HEAT #11 — 'THE CAPTAIN'S CONFESSION'\nDelphine Rush (that's me. still weird. 14 books weird)\n\nAudiobook #10: recording Thursdays, Suite 512 (H&F pays). Bernard says the mattresses on the walls are 'industry standard'. Dev says I'm loud. Dev records the Bible on Mondays.\n\nBook 11:\n- Thorne returns from sea. Storm. Hayloft (Bernard: MORE hayloft)\n- Villain: a harbor-master who sells waterbeds and lies about where he goes on Tuesdays. (too on the nose? Greg will never read it. Greg has never read anything I've written, including the birthday cards)\n- Ending: confession on the dock\n\nREAL LIFE ending: Nov 28. Tell Greg. Dedication page. Pay off the house. Watch his face.",
    },
    { id: 'n_ten', title: 'Ten years ✨', t: '2026-11-03T21:30', clue: 'anniversary_plan', body: "Sat Nov 28 — Pine Hollow cabin (BOOKED)\n(he vetoed Lake Wyeth?? 'room 6 has a smell'. who smells a specific room)\n\n1. the lingerie. me in it. obviously\n2. give him the book. dedication page first\n3. tell him: I'm Delphine Rush. fourteen books. #1 in four countries\n4. hand him the mortgage payoff letter\n5. watch his face\n6. do NOT cry before step 3" },
    { id: 'n_vocal', title: 'vocal warmups', t: '2026-11-05T17:50', body: "lip trills x10\nhum the scale\n'red leather yellow leather' x5\nthroat spray\nDO NOT laugh at 'throbbing lantern'\nDO NOT laugh at 'his salty bulwark'\nwater. so much water" },
  ],

  mail: [
    { id: 'm_lace', from: 'Velour & Lace', fromAddr: 'orders@velourlace.example', to: 'Nora Pruitt', subject: "Order shipped — 'The Midnight Confession' set", t: '2026-11-03T08:00', folder: 'inbox', clue: 'lingerie_receipt', body: "Thank you, Nora!\n\n1× The Midnight Confession set (black, M) — $212.00\nGift wrap: YES\nCard message: 'Ten years. Open slowly.'\n\nShipping to: Maple Court (porch, 'not where my husband can see it')." },
    { id: 'm_league', from: 'Strike Force Lanes', fromAddr: 'league@strikeforcelanes.example', to: 'Pruitt Household', subject: 'Greg Pruitt — season status', t: '2026-11-18T10:00', folder: 'inbox', clue: 'bowling_forfeit', body: "Hi Pruitt family,\n\nWe're writing about Greg's Tuesday league membership.\n\nFrames bowled this season: 0\nForfeits: 11\nTeam 'Gutter Gods' has asked that he be removed.\n\nAlso, for clarity: our league plays WEDNESDAYS. We have not had a Tuesday league since 2019. Tuesdays we host Toddler Bumper Bowl, 9–11 a.m.\n\nGreg's shoe-rental deposit is still on file. He has never rented shoes.\n\nStrike Force Lanes" },
    { id: 'm_joint', from: 'Harbor Credit Union', fromAddr: 'statements@harborcu.example', to: 'Pruitt Household', subject: 'Joint Checking ••4410 — November statement', t: '2026-11-20T06:00', folder: 'inbox', clue: 'motel_charges', body: "JOINT CHECKING ••4410 — G. & N. PRUITT\n\nCard ••2291 (G. PRUITT)\n11/03  WYETH MOTOR LODGE — RM 6  $79.00\n11/03  QWIK MART — VANILLA DREAMS BODY MIST  $8.99\n11/10  WYETH MOTOR LODGE — RM 6  $79.00\n11/10  PETAL PUSHERS — 12 RED ROSES  $64.00\n11/17  WYETH MOTOR LODGE — RM 6  $79.00\n11/17  STRIKE FORCE LANES — ARCADE TOKENS  $5.00\n\nCard ••6110 (N. PRUITT)\n11/02  LAKESIDE MORTGAGE — PAYMENT  $1,840.00\n11/09  GROCERY  $142.18" },
    { id: 'm_corvina', from: 'Hotel Corvina', fromAddr: 'reservations@hotelcorvina.example', to: 'Nora Pruitt', subject: 'Your Thursday suite — confirmed', t: '2026-11-04T09:00', folder: 'inbox', clue: 'hotel_meets', body: "Suite 512 is confirmed for Thursdays, Nov 5, 12 and 19, 6:30 PM – 10:30 PM.\n\nBilling: O.L.A. Ltd. — account 'RUSH, D.'\n\nPer your request, housekeeping will NOT remove the mattresses from the walls. We have also moved the guest in 514." },
    { id: 'm_payoff', from: 'Lakeside Mortgage', fromAddr: 'payoff@lakesidemortgage.example', to: 'Nora Pruitt', subject: 'Your payoff quote', t: '2026-11-16T14:00', folder: 'inbox', body: "Payoff amount for 22 Maple Court, good through Nov 30: $187,412.66.\n\nYou asked whether the payoff letter can be 'gift wrapped'. It cannot. It's a PDF." },
  ],

  calls: [
    { contact: 'mystery', t: '2026-11-23T19:12', dir: 'missed' },
    { contact: 'mystery', t: '2026-11-23T18:40', dir: 'missed' },
    { contact: 'mystery', t: '2026-11-23T17:05', dir: 'missed' },
    { contact: 'greg', t: '2026-11-17T22:58', dir: 'out', duration: '0:00' },
    { contact: 'bea', t: '2026-11-21T20:00', dir: 'in', duration: '41:02' },
    { contact: 'dev', t: '2026-11-12T18:30', dir: 'in', duration: '1:15' },
  ],

  voicemails: [
    { id: 'vm_mystery', contact: 'mystery', t: '2026-11-12T18:40', duration: '0:27', voice: { pitch: 0.8, rate: 0.95, female: false }, clue: 'mystery_texts', transcript: "It's me. I'm in the suite. Dev's pushed the bed against the wall like you asked and propped the mattresses up. Bring the water and the throat spray. And darling, don't be shy this time. Really let go on page two hundred." },
    { id: 'vm_greg', contact: 'greg', t: '2026-11-17T22:58', duration: '0:14', voice: { pitch: 1.0, rate: 1.25, female: false }, transcript: "Hey, it's me. Bowling ran late. Overtime. Bowling has overtime. Don't wait up. Also if Tiffani says anything about shoes, she's — it's an HOA thing. Bye." },
  ],

  map: {
    art: 'cg2_map',
    places: [
      { id: 'home', name: 'Home — 22 Maple Court', x: 0.22, y: 0.34 },
      { id: 'corvina', name: 'Hotel Corvina', x: 0.62, y: 0.30 },
      { id: 'work', name: 'Lakeside Orthopedics', x: 0.40, y: 0.58 },
      { id: 'lanes', name: 'Strike Force Lanes', x: 0.30, y: 0.80 },
      { id: 'wyeth', name: 'Wyeth Motor Lodge', x: 0.86, y: 0.76 },
      { id: 'pine', name: 'Pine Hollow Cabins', x: 0.88, y: 0.14 },
      { id: 'bea', name: "Bea's place", x: 0.12, y: 0.62 },
      { id: 'dreamhaven', name: 'DreamHaven Mattress Outlet #2', x: 0.56, y: 0.70 },
    ],
    stops: [
      { t: '2026-11-05T18:52', place: 'corvina', detail: 'Arrived — 3h 18m', clue: 'hotel_meets' },
      { t: '2026-11-12T18:50', place: 'corvina', detail: 'Arrived — 3h 22m', clue: 'hotel_meets' },
      { t: '2026-11-17T09:00', place: 'work', detail: 'Arrived — 8h 05m' },
      { t: '2026-11-19T18:49', place: 'corvina', detail: 'Arrived — 3h 31m', clue: 'hotel_meets' },
      { t: '2026-11-21T19:30', place: 'bea', detail: 'Arrived — 2h 10m' },
      { t: '2026-11-22T11:00', place: 'dreamhaven', detail: 'Arrived — 6 min' },
    ],
  },

  browser: [
    { t: '2026-11-23T07:02', title: "Delphine Rush — 'The Mystery Man Returns' (Tidewater Heat #10) — #1 in Romance — 'Captain Thorne Ashby is back, and the harbor is NOT ready'", url: 'books.example/delphine-rush/mystery-man-returns' },
    { t: '2026-11-22T23:40', title: "who is Delphine Rush — anonymous author theories ('a retired nun', 'three women in a trench coat', 'a man named Gary')", url: 'forum.example/who-is-delphine-rush' },
    { t: '2026-11-20T22:15', title: "how to tell your husband you're secretly rich without him buying a boat", url: 'search?q=tell+husband+secretly+rich+without+boat' },
    { t: '2026-11-18T08:30', title: 'does throat spray work for audiobook narrators', url: 'search?q=throat+spray+audiobook+narrators' },
    { t: '2026-11-12T23:58', title: 'how loud is too loud hotel room (professional reasons)', url: 'search?q=how+loud+too+loud+hotel+room' },
    { t: '2026-11-01T22:00', title: "lingerie that says 'I have a secret' but also 'it's a good one'", url: 'search?q=lingerie+secret+good+one' },
  ],

  glimpse: [
    { id: 'g2_tiffani', author: 'tiffani', photo: 'cg2_ph_tiffani', caption: 'Tuesday self-care 💅🕯️ #metime #vanilladreams #blessed', t: '2026-11-17T21:40', likes: 47, comments: [{ author: 'bea', text: 'cute vest' }, { author: 'tiffani', text: "it's mine!! 🙂" }, { author: 'bea', text: "it says GREG on it, tiffani" }], clue: 'tiffani_post' },
    { id: 'g2_wedding', author: 'me', photo: 'cg2_ph_wedding', caption: 'almost ten 🖤', t: '2026-11-01T10:05', likes: 88, comments: [{ author: 'greg', text: '👍' }, { author: 'bea', text: 'he thumbs-upped your WEDDING PHOTO' }, { author: 'tiffani', text: 'so cute you two!! 🙂' }] },
  ],

  bank: {
    account: 'Harbor CU — N. Pruitt Private Savings ••7788',
    balance: 214880.15,
    tx: [
      { t: '2026-11-21T06:00', desc: 'DEPOSIT — HARTWELL & FINCH LTD — ROYALTY Q3 (D. RUSH)', amount: 18400.0, clue: 'cash_stash' },
      { t: '2026-11-16T14:05', desc: 'LAKESIDE MORTGAGE — PAYOFF QUOTE FEE', amount: -25.0 },
      { t: '2026-11-05T22:40', desc: 'HOTEL CORVINA — VALET', amount: -24.0 },
      { t: '2026-11-03T21:25', desc: 'PINE HOLLOW CABINS — DEPOSIT (NOV 27–29)', amount: -300.0, clue: 'anniversary_plan' },
      { t: '2026-11-02T22:10', desc: 'VELOUR & LACE — ONLINE', amount: -212.0, clue: 'lingerie_receipt' },
      { t: '2026-10-30T12:00', desc: 'PAGE & QUILL BOOKS — 40 COPIES (SIGNING STOCK)', amount: -639.6 },
      { t: '2026-08-21T06:00', desc: 'DEPOSIT — HARTWELL & FINCH LTD — ADVANCE (D. RUSH)', amount: 16250.0, clue: 'cash_stash' },
    ],
  },

  calendar: [
    { id: 'cal2_thu', t: '2026-11-19T18:30', title: '📚 Book club', detail: 'water. lots of water. throat spray.', clue: 'hotel_meets' },
    { id: 'cal2_ten', t: '2026-11-28T12:00', title: '🖤 TEN YEARS — tell him everything', detail: 'cabin · book · letter · lingerie (order TBD)', clue: 'anniversary_plan' },
    { id: 'cal2_bowl', t: '2026-11-24T19:00', title: 'Greg — bowling 🎳 (shared)', detail: 'Strike Force Lanes, Tuesday league' },
    { id: 'cal2_draft', t: '2026-11-30T09:00', title: 'TH #11 first draft → B.', detail: 'more hayloft' },
  ],

  wifi: [
    { name: 'CORVINA_GUEST', lastJoined: '2026-11-19T18:51', clue: 'hotel_meets' },
    { name: 'MapleCourt22_Pruitt', lastJoined: '2026-11-23T22:00' },
    { name: 'LakesideOrtho_Staff', lastJoined: '2026-11-20T09:00' },
    { name: 'BeasPlace_NoGregs', lastJoined: '2026-11-21T19:31' },
    { name: 'DreamHaven_Customer (sleep on it!)', lastJoined: '2026-11-22T11:01' },
  ],

  trace: [
    { id: 'photos', label: 'Photos — Recently Deleted', detail: 'Carve images deleted on Thursday nights out of unallocated flash storage.', needs: ['pinned:hotel_meets'], needsHint: 'Need a lead first: pin where she actually goes on Thursdays.', durationMs: 5000 },
    { id: 'msgfrag', label: 'Messages — Orphaned Fragments', detail: "Rebuild deleted texts from her chat with 'Mystery Man' out of the write-ahead log.", needs: ['pinned:mystery_texts'], needsHint: "Need a lead first: pin the Mystery Man's Thursday texts.", durationMs: 5500 },
    { id: 'unsent', label: "Messages — 'Delete for Everyone' Cache", detail: 'Restore group-chat messages a sender unsent, from the notification cache.', needs: ['pinned:bowling_forfeit'], needsHint: "Need a lead first: pin what Strike Force Lanes says about Greg's season.", durationMs: 6000 },
  ],

  clues: [
    { id: 'mystery_texts', title: "'Thursday. Suite 512.'", text: "'Mystery Man 🖤': 'Thursday. Suite 512. Bring that voice.' Nora: 'Greg thinks it's book club.' His voicemail: the bed's against the wall, 'really let go on page two hundred'.", kind: 'person', art: 'av_cg2_mystery' },
    { id: 'dev_texts', title: "Dev: 'you were LOUD'", text: "Dev: 'you were LOUD tonight', the guest in 514 complained, 'same mattress setup next week? extra pillows for your knees'.", kind: 'person', art: 'av_cg2_dev' },
    { id: 'hotel_meets', title: 'Thursdays, Hotel Corvina', text: "Every Thursday ~19:00–22:00 at Hotel Corvina; Suite 512 booked by 'O.L.A. Ltd.' on account 'RUSH, D.' Housekeeping told not to remove the mattresses from the walls.", kind: 'place' },
    { id: 'lingerie_receipt', title: '$212 of lace', text: "Velour & Lace, 'The Midnight Confession' set, $212, gift-wrapped. Card: 'Ten years. Open slowly.'", kind: 'object', art: 'cg2_ph_h_lace' },
    { id: 'cash_stash', title: 'The private account', text: "A private savings account with $214,880. Deposits from Hartwell & Finch Ltd., marked 'ROYALTY' and 'ADVANCE' — 'D. RUSH'.", kind: 'document' },
    { id: 'recording_booth', title: 'Suite 512 is a booth', text: 'Recovered photos: mattresses propped on every wall, a microphone with a pop filter, printed pages, a sound engineer in headphones, and Nora at the mic.', kind: 'place', art: 'cg2_ph_suite' },
    { id: 'chapter_talk', title: 'Chapter 14, the hayloft, the meter', text: "Deleted texts with 'Mystery Man': chapters, 'the publisher wants MORE hayloft', 'your breathy bit in chapter 9 redlined the meter', 'all 31 chapters... into a microphone'.", kind: 'document' },
    { id: 'author_reveal', title: 'Nora is Delphine Rush', text: "Her locked outline: 'Delphine Rush (that's me. 14 books)'. Audiobook #10 recorded Thursdays in Suite 512, paid by the publisher.", kind: 'document' },
    { id: 'hidden_dedication', title: "'For G.'", text: "Hidden album: a page proof of 'The Mystery Man Returns' by Delphine Rush — 'For G. Ten years, and every hero I write still has your laugh.'", kind: 'object', art: 'cg2_ph_h_proof' },
    { id: 'anniversary_plan', title: 'Nov 28: tell him everything', text: "Ten-year plan: Pine Hollow cabin (booked), lingerie, the book, 'I'm Delphine Rush', a mortgage payoff letter. 'Keep Saturday free... it's the best news of your life.'", kind: 'event' },
    { id: 'bernard_reveal', title: "Mystery Man is Bernard, her agent", text: "'Mystery Man' texts mid-investigation: he's Bernard Okafor, her literary agent, 68, new hip, wife named Ruth. Thursday was the final audiobook session.", kind: 'person', art: 'av_cg2_mystery' },
    { id: 'bowling_forfeit', title: '0 frames, 11 forfeits', text: "Strike Force Lanes: Greg has bowled 0 frames this season. The league plays Wednesdays; Tuesdays are Toddler Bumper Bowl. His shoes still have the tags.", kind: 'document' },
    { id: 'motel_charges', title: 'Card ••2291, Room 6, Tuesdays', text: "Joint statement: Greg's card ••2291 at Wyeth Motor Lodge, Room 6, on Nov 3, 10 and 17 — plus Vanilla Dreams body mist and a dozen roses Nora never got.", kind: 'document' },
    { id: 'wyeth_avoid', title: "'Room 6 has a smell'", text: "Greg vetoed Lake Wyeth for the anniversary: 'terrible motel. room 6 has a smell. i've heard.'", kind: 'person', art: 'av_cg2_greg' },
    { id: 'tiffani_post', title: "Tiffani's 'Tuesday self-care'", text: "Tiffani Boone's Glimpse, Tuesday 21:40: a motel mirror selfie; Wyeth Motor Lodge key fob #6; a DreamHaven fleece vest embroidered 'GREG' on the chair.", kind: 'person', art: 'cg2_ph_tiffani' },
    { id: 'tiffani_slip', title: "'room 6 tues?'", text: "Unsent from the HOA group, Tuesday 23:12: 'greg u left ur bowling shoes in my car AGAIN, tags still on. room 6 tues? i'll bring the vanilla.' Then: 'WRONG CHAT.'", kind: 'document', art: 'av_cg2_tiffani' },
  ],

  questions: [
    {
      id: 'q_cheat', prompt: 'Is Nora cheating on Greg?',
      options: [
        { id: 'mystery', label: "Yes — with the 'Mystery Man'" },
        { id: 'dev', label: "Yes — with Dev, the 'sound guy'", art: 'av_cg2_dev' },
        { id: 'no', label: 'No' },
        { id: 'emotional', label: 'Not physically, but emotionally' },
      ],
      answer: 'no', evidence: ['recording_booth', 'chapter_talk', 'author_reveal', 'bernard_reveal', 'hidden_dedication', 'anniversary_plan'],
      explain: 'Suite 512 is a homemade recording booth, the texts are about chapters, and every secret on the phone points at the same day: November 28, when she planned to tell Greg everything.',
    },
    {
      id: 'q_mystery', prompt: "Who is 'Mystery Man 🖤'?",
      options: [
        { id: 'lover', label: 'A lover she meets in a hotel' },
        { id: 'agent', label: 'Bernard Okafor, her literary agent', art: 'av_cg2_mystery' },
        { id: 'model', label: 'A book-cover model' },
        { id: 'greg', label: 'Greg, testing her', art: 'av_cg2_greg' },
      ],
      answer: 'agent', evidence: ['bernard_reveal', 'chapter_talk', 'author_reveal'],
      explain: "He reads her chapters on the train, passes on the publisher's notes, books the suite on the agency's account and has a wife named Ruth. The black heart is for Greg's benefit.",
    },
    {
      id: 'q_secret', prompt: 'What is Nora actually hiding?',
      options: [
        { id: 'affair', label: 'An affair' },
        { id: 'debt', label: 'Gambling debts' },
        { id: 'author', label: "She's the anonymous romance novelist Delphine Rush, recording her own audiobook and saving it all for a 10th-anniversary reveal" },
        { id: 'leaving', label: "She's saving up to leave him" },
      ],
      answer: 'author', evidence: ['author_reveal', 'hidden_dedication', 'recording_booth', 'cash_stash', 'anniversary_plan', 'lingerie_receipt', 'chapter_talk'],
      explain: 'Royalties from Hartwell & Finch, a dedication page that reads "For G.", a cabin, a payoff quote for the mortgage and lingerie with a card that says "Ten years".',
    },
    {
      id: 'q_who', prompt: 'Who in this marriage IS cheating?',
      options: [
        { id: 'nobody', label: 'Nobody' },
        { id: 'nora', label: 'Nora, with Bernard' },
        { id: 'greg', label: 'Greg — with Tiffani Boone, the HOA president', art: 'av_cg2_tiffani' },
        { id: 'bea', label: "Greg — with Nora's sister Bea", art: 'av_cg2_bea' },
      ],
      answer: 'greg', evidence: ['tiffani_slip', 'tiffani_post', 'motel_charges', 'bowling_forfeit', 'wyeth_avoid'],
      explain: "Greg's 'bowling' doesn't exist, his card pays for Room 6 every Tuesday, and Tiffani posted the vest and unsent the shoes. Bea only commented on it.",
    },
    {
      id: 'q_where', prompt: "Where are Greg's 'bowling' nights really spent?",
      options: [
        { id: 'lanes', label: 'Strike Force Lanes' },
        { id: 'corvina', label: 'Hotel Corvina, Suite 512' },
        { id: 'wyeth', label: 'Wyeth Motor Lodge, Room 6, Tuesdays' },
        { id: 'clubhouse', label: 'The Maple Court clubhouse' },
      ],
      answer: 'wyeth', evidence: ['motel_charges', 'tiffani_slip', 'tiffani_post', 'wyeth_avoid'],
      explain: "Three Tuesdays, three charges for Room 6, a key fob in Tiffani's selfie, and a husband who knows how one specific motel room smells.",
    },
  ],

  events: [
    { id: 'e2_greg', kind: 'text', when: ['unlocked'], delayMs: 5000, thread: 'th_greg', contact: 'greg', text: "this is greg. roxy said her guy has the phone. anything yet?? need it by friday. unrelated question: do motel charges show up on the JOINT statement or just the card guy's" },
    { id: 'e2_h_mystery', kind: 'handler', when: ['pinned:mystery_texts'], delayMs: 3000, text: "'Mystery Man', black heart, a hotel suite every Thursday. Kid, that's either an affair or a woman who knows exactly who reads her phone. Before you write either one down, find out what happens in that suite." },
    { id: 'e2_bernard', kind: 'text', when: ['recovered:photos'], delayMs: 6000, thread: 'th_mystery', contact: 'mystery', clue: 'bernard_reveal', text: "Nora, darling, it's Bernard. Bernard Okafor, your agent, since your phone apparently thinks I'm a smoky stranger. Your husband rang the agency asking for 'the Mystery Man'. I told him I'm sixty-eight, I have a new hip and a wife named Ruth, and that Thursday was the final audiobook session. He asked if I 'do mattresses'. Did I ruin the 28th? Tell me I didn't ruin the 28th." },
    { id: 'e2_h_card', kind: 'handler', when: ['pinned:motel_charges'], delayMs: 3500, text: "Joint statement. A card ending in 2291, Tuesdays, a motel with a room number. I've been divorced three times; I always check whose card ends in what. Compare the last four digits with the contacts." },
  ],

  hints: [
    { until: 'unlocked', text: "Greg: 'a dots-and-dashes thing'. Bea's lock-screen text agrees. Read the bracelet as Morse code: long bead = dash, short bead = dot, each gold spacer starts the next digit." },
    { until: 'pinned:hotel_meets', after: ['unlocked'], text: "Thursday 'book club'. Maps, Wi-Fi and Mail know where she actually goes." },
    { until: 'recovered:photos', after: ['pinned:hotel_meets'], text: 'Something happens in Suite 512 every Thursday. Recover the deleted photos and look at the walls.' },
    { until: 'recovered:msgfrag', after: ['pinned:mystery_texts'], text: "Her chat with the Mystery Man has gaps. TRACE what she deleted." },
    { until: 'hidden:open', after: ['unlocked'], text: "Hidden album. Same passcode. Read what's printed, not just what's worn." },
    { until: 'note:n_outline', after: ['unlocked'], text: "The locked outline wants a hero's first name. Browser has a book she checks every morning." },
    { until: 'pinned:motel_charges', after: ['unlocked'], text: "There's a joint account statement in Mail. Look at whose card does what on Tuesdays." },
    { until: 'recovered:unsent', after: ['pinned:bowling_forfeit'], text: "The HOA chat has a hole in it at 23:12 on a Tuesday. TRACE what was unsent." },
    { until: 'report:filed', after: ['unlocked'], text: "Two questions, really: what is she hiding, and who isn't hiding it as well. File the report with every answer pinned." },
  ],

  handlerIntro: "Roxy Vance. This one walked into my office in a fleece vest with his own name on it, which is how you know a man has never once been mistaken for somebody else. He says his wife has a 'Mystery Man'. He also asked me twice what shows up on a joint statement. Crack the phone, kid. I'll get a fresh pack.",

  epilogue: {
    solved: [
      "Roxy met Greg Pruitt at DreamHaven Mattress Outlet, location two of three ('the good one'), on a display bed called The Senator. He read 'NOT CHEATING' and pumped his fist. He turned the page and stopped pumping his fist. He asked whether a PI's report counts as evidence 'or more like a vibe'. Roxy said it's evidence. She also said the vest was a terrible idea.",
      "Nora got a copy too, because Roxy's policy is that the person whose phone got read gets to read the reader. She went to Pine Hollow on the 28th anyway, alone, with the lingerie, a bottle of champagne and the mortgage payoff letter, which she tore up. She bought her own house instead. It's on Lake Wyeth. It has a dock and no Room 6.",
      "Tidewater Heat #11 came out in spring. The villain is a smarmy harbor-master who sells waterbeds and says he's 'at bowling'. He is crushed by a falling mattress display in chapter 30. Reviewers called it 'oddly specific'. It went to #1 in four countries. The audiobook is narrated by Delphine Rush herself. Dev says chapter 30 redlined the meter.",
      "Tiffani Boone was removed as HOA president after Gary #9 read the group chat into the minutes at the December meeting, including 'Room 6 of the clubhouse'. The clubhouse has one room. Greg bowls now, for real, on Wednesdays, alone. He's terrible. The shoes still have the tags.",
    ],
    partial: [
      'Your report reached the client with gaps in it.',
      "Greg took 'Mystery Man, hotel suite, secret account' to a divorce lawyer on Friday and waved it like a winning ticket. Nora's lawyer walked in with a joint statement and a Room 6. Everyone lost except the lawyers, and Bernard, who sold the story.",
      'Go back to Suite 512 and look at the walls. Then look at card 2291.',
    ],
  },
};
