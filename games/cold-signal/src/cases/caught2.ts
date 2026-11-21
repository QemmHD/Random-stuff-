import type { CaseFile } from '../types';

// CAUGHT C2 — MYSTERY MAN
// The player IS Greg Pruitt, 41, Assistant Regional Manager, DreamHaven Mattress Outlet
// (saved in her phone as 'Greg 🛏️'). 1:40 a.m.; wife Nora Pruitt, 38, medical billing
// coder, is asleep. Her phone is in a bag of rice (bath accident).
// Looks like: Thursday "book club" (doesn't exist) in Hotel Corvina Suite 512, booked
// under 'Mrs. Smith'; a contact saved as "Mystery Man 🖤"; "Dev" texting "you were LOUD
// tonight"; a private account with $214k; a $212 lingerie receipt; breathy voice memos.
// Truth: Nora is the anonymous bestselling erotic-romance novelist DELPHINE RUSH (Tidewater
// Heat series, hero Captain Thorne Ashby). Mystery Man = her literary agent Bernard Okafor,
// 68. Suite 512 is a makeshift audiobook booth (mattresses on the walls); Dev is the sound
// engineer; the voice memos are her dictating chapters. The money is royalties. The
// lingerie, the cabin and the mortgage payoff are for the 10th anniversary on Nov 28, when
// she planned to tell Greg everything. The dedication reads "For G." They've been trying
// for a baby for two years.
// Twist: YOU (Greg) are the cheater — with Tiffani Boone, Maple Court HOA president, every
// Tuesday ("bowling") at the Wyeth Motor Lodge, Room 6, on the joint card ••2291.
// Gut-punch: mid-snoop, Tiffani texts Nora's phone a positive pregnancy test because "Greg
// isn't answering". Whose is it? The last recovered evidence (Tiffani's unsent HOA message)
// says Gary had a vasectomy in 2019.
// Passcode 0611: her bracelet spells it in Morse (long bead = dash, short bead = dot,
// gold spacers between digits): ----- / -.... / .---- / .----

const DEZ = { name: 'Dez', role: 'your best friend', avatar: 'av_cg_bff' };

export const caught2: CaseFile = {
  id: 'caught-2',
  number: 'C2',
  mode: 'caught',
  handler: DEZ,
  title: 'Mystery Man',
  tagline: "A secret suite. A secret account. A man saved as 'Mystery Man 🖤'. You want proof. You're about to get some.",
  difficulty: 2,
  cover: 'cg2_cover',
  owner: { name: 'Nora Pruitt', age: 38, summary: 'Your wife. Medical billing coder at Lakeside Orthopedics, by day. Almost ten years married. Reads in the bath. Types very fast with the door closed.' },
  status: 'ALLEGEDLY UNFAITHFUL',
  deviceCondition: 'DROPPED IN A LAVENDER BUBBLE BATH · RICE-BAG RESUSCITATION · YOU ATE SOME OF THE RICE · 96% READABLE',
  briefing: [
    "1:40 a.m. Nora's asleep on her side, facing the wall. Her phone is on the nightstand in a bag of rice — she dropped it in the bath on Sunday. You lift it out of the rice like it's a grenade.",
    "Thursdays she's at 'book club' until ten. You called the library. The library laughed. There's a contact in her phone called 'Mystery Man 🖤'. A $212 lingerie receipt for lingerie you have never seen. A bank account you didn't know existed, with serious money in it.",
    "Tuesdays you're at bowling. That's different. You've been telling yourself that's different since July. Dez told you not to do this. Dez said, 'Bro. People who live in glass motels.' You told Dez to shut up.",
    "Her code: she wears a bracelet — long beads, short beads, little gold spacers. 'It's my code, literally,' she said once. 'It's a dots-and-dashes thing, Greg. You'd know if you ever listened.' You never listen. It's your best quality.",
    "She's breathing slow. The fridge hums. Your own phone, face-down in your pocket, has a text from Tiffani you haven't opened. Go.",
  ],
  phoneDate: '2026-11-24',
  phoneTime: '01:40',
  lock: {
    passcode: '0611',
    hint: 'read the bracelet as Morse code: long bead = dash, short bead = dot, each gold spacer starts the next digit',
    wallpaper: 'cg2_wall_lock',
    notifications: [
      { app: 'messages', title: 'Bea 🐝', text: "still can't believe you turned your phone code into jewelry. dots and dashes!! nerd 🤓 SOS would've been more on brand", t: '2026-11-22T12:00' },
      { app: 'messages', title: 'Mystery Man 🖤', text: "Still thinking about Thursday. That sound you made at the end. Chills, darling. 🖤", t: '2026-11-23T23:58' },
      { app: 'messages', title: 'Dev 🎧', text: 'you were LOUD thursday 😅 the guy next door slipped a note under the door', t: '2026-11-20T09:10' },
      { app: 'mail', title: 'Hotel Corvina', text: 'Mrs. Smith — your Thursday suite is confirmed. Housekeeping will not touch the mattresses.', t: '2026-11-04T09:00' },
      { app: 'bank', title: 'Harbor CU', text: 'Deposit received: $18,400.00 — HARTWELL & FINCH LTD', t: '2026-11-21T06:00' },
    ],
  },
  homeWallpaper: 'cg2_wall_home',

  contacts: [
    { id: 'greg', name: 'Greg 🛏️', avatar: 'av_cg2_greg', number: '(555) 380-2291', label: 'husband (you)' },
    { id: 'mystery', name: 'Mystery Man 🖤', avatar: 'av_cg2_mystery', number: '(555) 380-7100' },
    { id: 'dev', name: 'Dev 🎧', avatar: 'av_cg2_dev', number: '(555) 380-5512' },
    { id: 'bea', name: 'Bea 🐝', avatar: 'av_cg2_bea', number: '(555) 380-4012', label: 'sister' },
    { id: 'tiffani', name: 'Tiffani Boone (HOA)', avatar: 'av_cg2_tiffani', number: '(555) 380-1414', label: 'across the street, #14' },
    { id: 'gary', name: 'Gary #9', avatar: 'av_cg2_gary', number: '(555) 380-0909', label: "Tiffani's husband" },
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
        { from: 'me', text: "he's asleep. call me. I want to do the hayloft scene while the house is quiet", t: '2026-11-11T23:04', clue: 'night_call' },
        { from: 'them', text: "Calling. Whisper it. Can't wait to hear it again. You're way better than the last narrator, darling. She sounded like a GPS.", t: '2026-11-11T23:05', clue: 'night_call' },
        { from: 'me', text: "delete this after. if greg hears me whispering 'the captain's rope' at 11pm I'm getting committed", t: '2026-11-11T23:30', clue: 'night_call' },
        { from: 'them', text: "What are you wearing Thursday? Dev says the silk one rustles. Wear something quieter. Or nothing that rustles.", t: '2026-11-11T21:00', clue: 'mystery_texts' },
        { from: 'me', text: 'the cardigan. the big one. and fuzzy socks. I am a sex symbol', t: '2026-11-11T21:04' },
        { from: 'them', text: "Tonight was the best yet. Dev says your breathy bit in chapter 9 'redlined the meter'. I've never been prouder of anyone. Not even my children. Don't tell my children.", t: '2026-11-12T22:30', clue: 'chapter_talk', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: 'Thursday. Suite 512. Bring that voice. 🖤', t: '2026-11-19T16:02' },
        { from: 'me', text: "done!! all 31 chapters. I can't believe I said 'his throbbing lantern' into a microphone in front of a 24-year-old", t: '2026-11-19T22:15', clue: 'chapter_talk', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: 'Dev has heard worse. Dev records the Bible on Mondays.', t: '2026-11-19T22:17', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: "Sent you a PaySnap request — 'batteries 48-ct'. For the lantern. For the hayloft scene. For RESEARCH. 😇", t: '2026-11-10T09:00', clue: 'research_box' },
        { from: 'them', text: "The money's cleared to your private account. Have you told him yet?", t: '2026-11-21T10:00' },
        { from: 'me', text: "the 28th. ten years. I'm telling him everything. I'm so nervous I bought lingerie, which is not a normal response to nerves", t: '2026-11-21T10:04' },
        { from: 'them', text: "It's the only normal response to nerves.", t: '2026-11-21T10:05' },
        { from: 'them', text: 'Still thinking about Thursday. That sound you made at the end. Chills, darling. 🖤', t: '2026-11-23T23:58' },
      ],
    },
    {
      id: 'th_dev', contact: 'dev', messages: [
        { from: 'them', text: 'you were LOUD tonight 😅 the guy in 514 called the front desk. worth it tho', t: '2026-11-05T22:20', clue: 'dev_texts' },
        { from: 'me', text: 'sorry!! I get into it', t: '2026-11-05T22:24' },
        { from: 'them', text: "never apologize. same mattress setup next week? I'll bring extra pillows for your knees", t: '2026-11-05T22:25', clue: 'dev_texts' },
        { from: 'them', text: "can you do the breathing thing again but slower. like you're on a ship. like the ship is ALSO into it", t: '2026-11-12T19:40' },
        { from: 'them', text: "honestly you're a natural. best I've had in that suite and I've had a LOT of people in that suite", t: '2026-11-12T22:40' },
        { from: 'them', text: "that's a wrap!! 🎉 you were incredible. B cried. I cried. 514 slipped a note under the door that just says 'brava'", t: '2026-11-19T22:20' },
        { from: 'them', text: 'you were LOUD thursday 😅 the guy next door slipped a note under the door', t: '2026-11-20T09:10' },
      ],
    },
    {
      id: 'th_greg', contact: 'greg', messages: [
        { from: 'me', text: "nine years 🖤 you still laugh at your own jokes before the end and I still love it. come to bed, mattress man", t: '2025-11-28T23:30', clue: 'drift' },
        { from: 'them', text: "9 YEARS babe. best decision I ever made. second best: the extra-firm topper", t: '2025-11-28T23:31' },
        { from: 'me', text: "🎤 voice note (0:18): '[laughing] you snore in morse code, did you know that? I'm decoding it. it says I. LOVE. NORA. [whispering] okay it says ZZZ. goodnight.'", t: '2026-02-11T01:20', clue: 'drift' },
        { from: 'them', text: '😂❤️ decode this: ❤️❤️❤️', t: '2026-02-11T07:02' },
        { from: 'me', text: 'dinner tonight? just us? I miss you even though you\'re right here', t: '2026-06-20T17:00' },
        { from: 'them', text: 'hoa thing. rain check 👍', t: '2026-06-20T18:40', clue: 'drift' },
        { from: 'me', text: 'night ❤️ going to sleep, big day tomorrow', t: '2026-11-11T23:02', clue: 'night_call' },
        { from: 'them', text: 'k night', t: '2026-11-11T23:20', clue: 'drift' },
        { from: 'them', text: "bowling tonight babe, don't wait up. strike force needs me 🎳", t: '2026-11-03T18:40' },
        { from: 'me', text: 'you never come back with scores', t: '2026-11-03T18:44' },
        { from: 'them', text: "a true athlete doesn't brag. also we lost", t: '2026-11-03T18:45' },
        { from: 'me', text: "what about Lake Wyeth for our anniversary? there's a cute little lodge", t: '2026-11-06T12:10' },
        { from: 'them', text: "NO. wyeth is boring. terrible motel. room 6 has a smell. i've heard", t: '2026-11-06T12:11', clue: 'wyeth_avoid' },
        { from: 'me', text: "you've heard about the smell of a specific room", t: '2026-11-06T12:14' },
        { from: 'them', text: 'people talk babe. at bowling', t: '2026-11-06T12:15', clue: 'wyeth_avoid' },
        { from: 'them', text: 'bowling 🎳 back late', t: '2026-11-10T18:45' },
        { from: 'me', text: 'you smell like vanilla', t: '2026-11-10T23:58' },
        { from: 'them', text: "the lanes have a new air freshener. it's very strong. it's called 'vanilla'", t: '2026-11-10T23:59' },
        { from: 'them', text: 'bowling 🎳', t: '2026-11-17T18:41' },
        { from: 'them', text: 'why is book club at a HOTEL. the parking app charged the joint card $24', t: '2026-11-12T23:10' },
        { from: 'me', text: "it's literally just book club greg. the library closed. we rent a room. it's cheaper than you think", t: '2026-11-12T23:14', clue: 'excuses' },
        { from: 'them', text: 'what book', t: '2026-11-12T23:15' },
        { from: 'me', text: "why are you being so weird lately. you haven't asked me about a book in ten years", t: '2026-11-12T23:16', clue: 'excuses' },
        { from: 'them', text: 'not weird. just asking', t: '2026-11-12T23:20' },
        { from: 'me', text: 'my phone died sorry!! anyway. a mystery. about a man. goodnight', t: '2026-11-12T23:58', clue: 'excuses' },
        { from: 'them', text: "how's book club", t: '2026-11-19T19:02' },
        { from: 'me', text: 'deep.', t: '2026-11-19T19:30' },
        { from: 'me', text: 'keep saturday free. the 28th. I mean it. I have something to tell you', t: '2026-11-23T21:00', clue: 'anniversary_plan' },
        { from: 'them', text: 'is it bad', t: '2026-11-23T21:01' },
        { from: 'me', text: "it's the best news of your life. wear the nice shirt. not the vest", t: '2026-11-23T21:03', clue: 'anniversary_plan' },
      ],
    },
    {
      id: 'th_bea', contact: 'bea', messages: [
        { from: 'me', text: "if greg asks, thursday I was at yours watching Love Island. DON'T say hotel. DON'T say corvina", t: '2026-11-05T17:30', clue: 'bea_cover' },
        { from: 'them', text: "I will lie to that vest for you any day. what happens on love island", t: '2026-11-05T17:32', clue: 'bea_cover' },
        { from: 'them', text: 'did you get the... package 👀 for "research"', t: '2026-11-09T10:00', clue: 'research_box' },
        { from: 'me', text: "it went to bernard's office. I'm not having a BLUE BOX LLC box on the porch. greg would think it's a mattress topper and open it", t: '2026-11-09T10:02', clue: 'research_box' },
        { from: 'them', text: 'did you tell him yet', t: '2026-11-02T20:00' },
        { from: 'me', text: "the 28th. the cabin, the dedication, everything. I'm paying off the house, Bea. HIS house. the one he calls 'my house'", t: '2026-11-02T20:05', clue: 'anniversary_plan' },
        { from: 'them', text: "you're paying off a mortgage for a man who says 'bowling' every Tuesday and has never once owned a ball", t: '2026-11-02T20:06' },
        { from: 'me', text: 'he has shoes', t: '2026-11-02T20:07' },
        { from: 'them', text: "he has shoes he has never worn, Nora. the tags are still on. they live in his trunk next to a body spray called 'Vanilla Dreams'", t: '2026-11-02T20:09', photo: 'cg2_ph_shoes' },
        { from: 'me', text: "also. don't laugh. two years of trying and nothing. I thought maybe the cabin. maybe it's lucky 🥺", t: '2026-11-02T20:15', clue: 'trying' },
        { from: 'them', text: "I'm not laughing. I'm crying into a lasagna. it's going to be a perfect weekend", t: '2026-11-02T20:16' },
        { from: 'me', text: "greg's sweet. he's just... not listening. I'll MAKE him listen. I'll read him the dedication out loud", t: '2026-11-02T20:20' },
        { from: 'me', text: "greg's location goes off every tuesday at 6:45 and comes back at 11:30. I decided not to want to know until after the 28th", t: '2026-11-17T23:40', clue: 'greg_tells' },
        { from: 'them', text: "also tiffani from across the street keeps asking me if greg 'is a good bowler'. with a face. a whole face", t: '2026-11-18T13:00' },
        { from: 'them', text: "still can't believe you turned your phone code into jewelry. dots and dashes!! nerd 🤓 SOS would've been more on brand", t: '2026-11-22T12:00' },
      ],
    },
    {
      id: 'th_hoa', contact: 'hoa', messages: [
        { from: 'them', text: '[Tiffani Boone]: Please welcome our NEW HOA treasurer: Greg Pruitt! 🙂 so good with numbers', t: '2026-07-07T10:00', clue: 'origin' },
        { from: 'them', text: '[Greg Pruitt]: happy to serve 🫡', t: '2026-07-07T10:05', clue: 'origin' },
        { from: 'them', text: '[Tiffani Boone]: Treasurer orientation Tuesday 7pm, my place. Bring the ledger 🙂 Gary will be at his brother\'s', t: '2026-07-07T10:06', clue: 'origin' },
        { from: 'them', text: '[Gary #9]: why are you telling the whole chat where I will be', t: '2026-07-07T10:08' },
        { from: 'them', text: '[Greg Pruitt]: tuesday works 👍 (I have bowling after)', t: '2026-07-07T10:10', clue: 'origin' },
        { from: 'them', text: '[Tiffani Boone]: Reminder: NO inflatables on lawns before Dec 1. Yes, Gary, that includes the turkey.', t: '2026-11-15T09:00' },
        { from: 'them', text: '[Gary #9]: the turkey is festive tiffani', t: '2026-11-15T09:04' },
        { from: 'them', text: '[Tiffani Boone]: The turkey is fourteen feet tall, Gary.', t: '2026-11-15T09:05' },
        { from: 'them', text: "[Tiffani Boone]: greg u left ur bowling shoes in my car AGAIN 😘 tags still on lol. room 6 tues? i'll bring the vanilla. wear the vest. JUST the vest", t: '2026-11-17T23:12', clue: 'tiffani_slip', deletedUntil: 'recovered:unsent' },
        { from: 'them', text: "[Tiffani Boone]: also my legs are still shaking from last week. you said you can't dance. you LIED", t: '2026-11-17T23:12', clue: 'tiffani_slip', deletedUntil: 'recovered:unsent' },
        { from: 'them', text: "[Tiffani Boone]: and we need to talk tues. I'm late. and before you ask, gary's had the snip since 2019 so 🙃", t: '2026-11-17T23:13', clue: 'snip', deletedUntil: 'recovered:unsent' },
        { from: 'them', text: '[Tiffani Boone]: WRONG CHAT. how do you delete for everyone. DELETE', t: '2026-11-17T23:13', clue: 'tiffani_slip', deletedUntil: 'recovered:unsent' },
        { from: 'them', text: '[Gary #9]: ??? what did tiffani post', t: '2026-11-17T23:14' },
        { from: 'them', text: '[Tiffani Boone]: Nothing!! Butt dial! Reminder: NO inflatables!!', t: '2026-11-17T23:15' },
        { from: 'them', text: "[Gary #9]: i saw 'room 6' tiffani", t: '2026-11-17T23:16' },
        { from: 'them', text: '[Tiffani Boone]: Room 6 of the CLUBHOUSE. HOA business. Goodnight, Gary.', t: '2026-11-17T23:17' },
        { from: 'them', text: '[Gary #9]: the clubhouse is one room', t: '2026-11-17T23:18' },
        { from: 'them', text: '[Gary #9]: also why did i get "the snip" as a notification', t: '2026-11-17T23:19' },
      ],
    },
    {
      id: 'th_gary', contact: 'gary', messages: [
        { from: 'them', text: "Nora, it's Gary from #9. Delicate question. Does Greg own a grey fleece vest that says GREG on it. Asking because one is in my laundry. Again.", t: '2026-11-21T09:40', clue: 'greg_tells' },
        { from: 'me', text: "...he has one, Gary. why", t: '2026-11-21T10:30' },
        { from: 'them', text: "No reason. Tiffani says it's 'HOA lost and found'. We don't have an HOA lost and found. I would know. I proposed one in 2022 and she vetoed it.", t: '2026-11-21T10:32', clue: 'greg_tells' },
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
    { id: 'cg2_ph_bea_spin', art: 'cg2_ph_bea_spin', t: '2026-11-05T19:30', place: 'PedalHaus Spin Studio', orientation: 'portrait', caption: "From Bea's Glimpse story. A sweaty woman on a spin bike in a dark studio lit with purple lights, giving the camera a peace sign. Nobody else she knows is visible." },
    { id: 'cg2_ph_wedding', art: 'cg2_ph_wedding', t: '2026-11-01T10:00', place: 'Maple Court', orientation: 'portrait', caption: 'A framed wedding photo propped on a windowsill: a couple on a dock, the man laughing mid-sentence. A date engraved on the frame.' },
    { id: 'cg2_ph_us_vela', art: 'cg2_ph_us_vela', t: '2026-11-07T20:15', place: 'Ristorante Vela — table 12', orientation: 'portrait', caption: 'Selfie at a candlelit restaurant table: a woman smiling, a man in a fleece vest looking at his own phone. A numbered table card reads 12.' },
    { id: 'cg2_ph_vela_b', art: 'cg2_ph_vela_b', t: '2026-11-14T20:20', place: 'Ristorante Vela — table 12', orientation: 'portrait', caption: 'Selfie at the same table: the same woman beside an older man in a bow tie, both raising champagne. A thick envelope on the table. A numbered table card reads 12.', clue: 'mystery_texts' },
    { id: 'cg2_ph_cabin', art: 'cg2_ph_cabin', t: '2026-11-03T21:20', place: 'Pine Hollow Cabins (listing screenshot)', orientation: 'landscape', caption: 'Screenshot of a cabin rental listing: a log cabin at dusk with a hot tub, dates Nov 27–29 highlighted, status "BOOKED".', clue: 'anniversary_plan' },
    { id: 'cg2_ph_keycard', art: 'cg2_ph_keycard', t: '2026-11-19T18:55', place: 'Hotel Corvina', orientation: 'portrait', caption: 'A hotel key card in a paper sleeve with a handwritten name and suite number, resting on a stack of printed pages and a bottle of throat spray.', clue: 'hotel_meets' },
    { id: 'cg2_ph_shoes', art: 'cg2_ph_shoes', t: '2026-11-02T20:08', place: 'Received from Bea', orientation: 'landscape', caption: 'Sent by Bea. An open car trunk: a pair of two-tone bowling shoes with paper tags attached, beside a bottle of body mist.', clue: 'bowling_forfeit' },
    { id: 'cg2_ph_tiffani', art: 'cg2_ph_tiffani', t: '2026-11-17T21:38', place: 'Wyeth Motor Lodge', orientation: 'portrait', caption: "From Tiffani Boone's Glimpse. Mirror selfie in a motel room, a lacy slip and a satin robe. A fleece vest is draped over a chair behind her; a key fob on the dresser.", clue: 'tiffani_post' },
    { id: 'cg2_ph_suite', art: 'cg2_ph_suite', t: '2026-11-12T18:58', place: 'Hotel Corvina, Suite 512', orientation: 'landscape', caption: 'Recovered. A hotel suite with mattresses propped against every wall, a microphone with a pop filter on a stand, a laptop and a stack of printed pages. A young man in headphones gives a thumbs-up. Deleted Nov 12.', clue: 'recording_booth', deletedUntil: 'recovered:photos' },
    { id: 'cg2_ph_mic', art: 'cg2_ph_mic', t: '2026-11-19T21:55', place: 'Hotel Corvina, Suite 512', orientation: 'portrait', caption: 'Recovered. Selfie: a woman in headphones and a cardigan in front of a microphone, holding a printed page; an older man in a bow tie wipes his eyes behind her. Deleted Nov 19.', clue: 'recording_booth', deletedUntil: 'recovered:photos' },
    { id: 'cg2_ph_video', art: 'cg2_ph_video', t: '2026-11-05T21:40', place: 'Hotel Corvina, Suite 512', orientation: 'landscape', caption: "Recovered video thumbnail; video data unrecoverable. Title: 'ch 9 take 4 🙈'. A dim suite, a silhouette of a woman with one hand over her mouth, laughing, beside a microphone stand; mattresses on the walls. Deleted Nov 5.", clue: 'recording_booth', deletedUntil: 'recovered:photos' },
    // Hidden album
    { id: 'cg2_ph_h_proof', art: 'cg2_ph_h_proof', t: '2026-11-16T23:10', place: 'Maple Court', orientation: 'portrait', hidden: true, caption: 'Hidden album. A printed book page proof on a bedspread, with a red pen and a cup of tea.', clue: 'hidden_dedication' },
    { id: 'cg2_ph_h_lace', art: 'cg2_ph_h_lace', t: '2026-11-04T22:30', place: 'Maple Court', orientation: 'portrait', hidden: true, caption: 'Hidden album. A woman in a black lace bodysuit and an open silk robe takes a mirror selfie, holding a small gift card to the camera. A wrapped box on the bed. Not sent to anyone.', clue: 'lingerie_receipt' },
    { id: 'cg2_ph_h_cover', art: 'cg2_ph_h_cover', t: '2026-10-28T19:00', place: 'Received from Mystery Man 🖤', orientation: 'portrait', hidden: true, caption: "Hidden album. Received. A paperback cover mock-up: a shirtless man in an open captain's coat on a storm-lashed dock, a lighthouse beam behind him. A sticky note on the corner." },
    { id: 'cg2_ph_h_test', art: 'cg2_ph_h_test', t: '2026-11-21T07:10', place: 'Maple Court — bathroom', orientation: 'portrait', hidden: true, caption: 'Hidden album. A pregnancy test on a bathroom counter showing one line, beside a box with one test left. A sticky note on the mirror.', clue: 'trying' },
  ],

  notes: [
    {
      id: 'n_outline', title: 'TH #11 — outline (NOT book club notes)', t: '2026-11-20T01:15', lock: { password: 'thorne', hint: 'His first name. Every woman in Tidewater wants him. Lowercase.' }, clue: 'author_reveal',
      body: "TIDEWATER HEAT #11 — 'THE CAPTAIN'S CONFESSION'\nDelphine Rush (that's me. still weird. 14 books weird)\n\nAudiobook #10: recording Thursdays, Suite 512 (H&F pays; booked as 'Mrs. Smith' so nobody finds out who Delphine is). Bernard says the mattresses on the walls are 'industry standard'. Dev says I'm loud. Dev records the Bible on Mondays.\n\nBook 11:\n- Thorne returns from sea. Storm. Hayloft (Bernard: MORE hayloft)\n- Villain: a harbor-master who sells waterbeds and lies about where he goes on Tuesdays. (too on the nose? Greg will never read it. Greg has never read anything I've written, including the birthday cards)\n- Ending: confession on the dock\n\nREAL LIFE ending: Nov 28. Tell Greg. Dedication page. Pay off the house. Watch his face.",
    },
    { id: 'n_dictation', title: 'Dictation — ch. 22 (voice memo, transcribed)', t: '2026-11-18T23:40', clue: 'chapter_talk', body: "[whispering] Okay. Chapter twenty-two. Greg's asleep. [clears throat]\n\n'The storm had been trying the shutters all night, but it was Thorne who finally opened them. He didn't speak. He didn't have to. He remembered the green dress from the harbor dance, and the exact place it had slipped off her shoulder, and he put his mouth there like he was signing his name—'\n\n[pause] Too much? No. Bernard says there is no too much.\n\n'—and then the lantern went out.'\n\n[laughing] Chapter break. Chapter break. I need water. [door creaks] ...Greg? [silence] Okay. He's just peeing." },
    { id: 'n_knew', title: 'draft — to Greg (not yet)', t: '2026-11-18T02:40', clue: 'nora_knew', body: "Greg,\n\nI know you don't bowl. Bea saw the tags. The lanes emailed. Your location goes dark every Tuesday at 6:45.\n\nI think I know where you go. I'm not going to look. Dr. Park says I'm 'protecting the 28th'. I'm protecting the 28th.\n\nI'm going to tell you everything first. Delphine, the money, the house, the baby we keep not having. And then I'm going to give you the chance to tell me everything too.\n\nIf you do, we talk. If you don't, I'll know that too.\n\n(edited 9 times. not sent.)" },
    { id: 'n_ten', title: 'Ten years ✨', t: '2026-11-03T21:30', clue: 'anniversary_plan', body: "Sat Nov 28 — Pine Hollow cabin (BOOKED)\n(he vetoed Lake Wyeth?? 'room 6 has a smell'. who smells a specific room)\n\n1. the lingerie. me in it. obviously\n2. give him the book. dedication page first\n3. tell him: I'm Delphine Rush. fourteen books. #1 in four countries\n4. hand him the mortgage payoff letter\n5. watch his face\n6. maybe... the other thing. if the test says yes by then 🤞\n7. do NOT cry before step 3" },
    { id: 'n_things', title: "things greg doesn't know about me", t: '2026-11-10T00:30', body: "- my middle name is not 'Ann', it's Anouk. he's had it wrong on every card for ten years\n- I make more in a quarter than DreamHaven makes in a year\n- I'm Delphine Rush\n- I hate the vest\n- every hero I've written laughs like him. even the pirate one\n- I know he doesn't bowl. I just don't know what he does instead. I decided not to want to know until after the 28th" },
  ],

  mail: [
    { id: 'm_bluebox', from: 'BLUE BOX LLC', fromAddr: 'orders@bluebox-llc.example', to: 'Nora Pruitt', subject: 'Your order has shipped (discreetly) 📦', t: '2026-11-08T09:00', folder: 'inbox', clue: 'research_box', body: "BLUE BOX LLC — billing name on statement: 'BLUE BOX LLC'\n\n1× Silk Rope — 'Captain's Knot' (10 ft, crimson)  $24.00\n1× Lantern — battery, 'Warm Harbor Glow'  $32.00\n1× Feather Tickler — 'Sea Breeze'  $11.00\n1× 'Knots for Lovers' illustrated guide  $19.00\nTotal: $86.00\n\nShip to: Okafor Literary Agency, attn: B. Okafor\nOrder note: 'for research. truly. chapter 22.'" },
    { id: 'm_lace', from: 'Velour & Lace', fromAddr: 'orders@velourlace.example', to: 'Nora Pruitt', subject: "Order shipped — 'The Midnight Confession' set", t: '2026-11-03T08:00', folder: 'inbox', clue: 'lingerie_receipt', body: "Thank you, Nora!\n\n1× The Midnight Confession set (black, M) — $212.00\nGift wrap: YES\nCard message: 'Ten years. Open slowly.'\n\nShipping to: Maple Court (porch, 'not where my husband can see it')." },
    { id: 'm_corvina', from: 'Hotel Corvina', fromAddr: 'reservations@hotelcorvina.example', to: 'Nora Pruitt', subject: 'Mrs. Smith — your Thursday suite is confirmed', t: '2026-11-04T09:00', folder: 'inbox', clue: 'hotel_meets', body: "Dear Mrs. Smith,\n\nSuite 512 is confirmed for Thursdays, Nov 5, 12 and 19, 6:30 PM – 10:30 PM.\n\nBilling: O.L.A. Ltd. — account 'RUSH, D.'\n\nPer your request, housekeeping will NOT remove the mattresses from the walls. We have also moved the guest in 514. Twice." },
    { id: 'm_folio', from: 'Hotel Corvina', fromAddr: 'folio@hotelcorvina.example', to: 'Nora Pruitt', subject: 'Folio — Suite 512 — Nov 19', t: '2026-11-20T08:00', folder: 'inbox', clue: 'hotel_meets', body: "Suite 512 · Mrs. Smith · Nov 19\n\nMinibar:\n2× champagne split  $36.00\n6× bottled water  $30.00\n1× honey & lemon tea service  $12.00\n1× 'Couples Kit' (returned unopened)  $0.00\nRoom service: 3× club sandwich, 1× fries  $64.00\n\nGuest note (514): 'Brava.'" },
    { id: 'm_league', from: 'Strike Force Lanes', fromAddr: 'league@strikeforcelanes.example', to: 'Pruitt Household', subject: 'Greg Pruitt — season status', t: '2026-11-18T10:00', folder: 'inbox', clue: 'bowling_forfeit', body: "Hi Pruitt family,\n\nWe're writing about Greg's Tuesday league membership.\n\nFrames bowled this season: 0\nForfeits: 11\nTeam 'Gutter Gods' has asked that he be removed.\n\nAlso, for clarity: our league plays WEDNESDAYS. We have not had a Tuesday league since 2019. Tuesdays we host Toddler Bumper Bowl, 9–11 a.m.\n\nGreg's shoe-rental deposit is still on file. He has never rented shoes.\n\nStrike Force Lanes" },
    { id: 'm_joint', from: 'Harbor Credit Union', fromAddr: 'statements@harborcu.example', to: 'Pruitt Household', subject: 'Joint Checking ••4410 — November statement', t: '2026-11-20T06:00', folder: 'inbox', clue: 'motel_charges', body: "JOINT CHECKING ••4410 — G. & N. PRUITT\n\nCard ••2291 (G. PRUITT)\n11/03  WYETH MOTOR LODGE — RM 6  $79.00\n11/03  QWIK MART — VANILLA DREAMS BODY MIST  $8.99\n11/10  WYETH MOTOR LODGE — RM 6  $79.00\n11/10  PETAL PUSHERS — 12 RED ROSES  $64.00\n11/10  VELVET ROPE BOUTIQUE — 'HIS & HERS' ROBE SET, MASSAGE OIL (CHERRY)  $60.00\n11/17  WYETH MOTOR LODGE — RM 6  $79.00\n11/17  WYETH MOTOR LODGE — MINIBAR (2× WINE, 2× CHOC)  $31.00\n11/17  STRIKE FORCE LANES — ARCADE TOKENS  $5.00\n\nCard ••6110 (N. PRUITT)\n11/02  LAKESIDE MORTGAGE — PAYMENT  $1,840.00\n11/09  GROCERY  $142.18" },
    { id: 'm_payoff', from: 'Lakeside Mortgage', fromAddr: 'payoff@lakesidemortgage.example', to: 'Nora Pruitt', subject: 'Your payoff quote', t: '2026-11-16T14:00', folder: 'inbox', body: "Payoff amount for 22 Maple Court, good through Nov 30: $187,412.66.\n\nYou asked whether the payoff letter can be 'gift wrapped'. It cannot. It's a PDF." },
  ],

  calls: [
    { contact: 'mystery', t: '2026-11-23T19:12', dir: 'missed' },
    { contact: 'greg', t: '2026-11-17T22:58', dir: 'in', duration: '0:00' },
    { contact: 'bea', t: '2026-11-21T20:00', dir: 'in', duration: '41:02' },
    { contact: 'dev', t: '2026-11-12T18:30', dir: 'in', duration: '1:15' },
    { contact: 'tiffani', t: '2026-11-24T01:12', dir: 'missed' },
    { contact: 'greg', t: '2026-11-05T19:35', dir: 'missed' },
    { contact: 'bea', t: '2026-11-05T18:10', dir: 'missed' },
  ],

  voicemails: [
    { id: 'vm_mystery', contact: 'mystery', t: '2026-11-12T18:40', duration: '0:27', voice: { pitch: 0.8, rate: 0.95, female: false }, clue: 'mystery_texts', transcript: "[low] It's me. I'm in the suite. Dev's pushed the bed against the wall like you asked and propped the mattresses up. [pause] Bring the water and the throat spray. And darling... don't be shy this time. Really let go on page two hundred. [door closes]" },
    { id: 'vm_bea', contact: 'bea', t: '2026-11-05T18:10', duration: '0:24', voice: { pitch: 1.1, rate: 1.2, female: true }, clue: 'bea_cover', transcript: "[clears throat] 'Hi Greg! Yes, she was at mine. We watched Love Island.' [pause] 'People were... hot. Near a pool.' Okay that's good. That's — [spin-class music starts] oh no, is this recording? Is this NORA'S voicemail? Why does it — Nora if you get this, I'm a great liar, ignore this, I'm at spin. [beep]" },
    { id: 'vm_tiffani', contact: 'tiffani', t: '2026-11-10T18:20', duration: '0:21', voice: { pitch: 1.2, rate: 1.1, female: true }, clue: 'tiffani_vm', deletedUntil: 'recovered:voice', transcript: "[whispering] Greg, it's me, I'm in the HOA supply closet, the signal's terrible. Room 6, seven. Wear the vest. I've been thinking about your hands all day, which is insane, you sell MATTRESSES. [pause] Wait. Is this Greg's phone or the house — oh no. Oh no. Hi Nora! Wrong Pruitt! HOA business! [click]" },
    { id: 'vm_greg', contact: 'greg', t: '2026-11-17T22:58', duration: '0:14', voice: { pitch: 1.0, rate: 1.25, female: false }, transcript: "[out of breath] Hey, it's me. Bowling ran late. Overtime. Bowling has overtime. Don't wait up. [a woman laughs, muffled] That's — the TV. At the lanes. Also if Tiffani says anything about shoes, it's an HOA thing. Bye." },
  ],

  map: {
    art: 'cg2_map',
    places: [
      { id: 'home', name: 'Home — 22 Maple Court', x: 0.22, y: 0.34 },
      { id: 'corvina', name: 'Hotel Corvina', x: 0.62, y: 0.30 },
      { id: 'vela', name: 'Ristorante Vela', x: 0.48, y: 0.18 },
      { id: 'work', name: 'Lakeside Orthopedics', x: 0.40, y: 0.58 },
      { id: 'lanes', name: 'Strike Force Lanes', x: 0.30, y: 0.80 },
      { id: 'wyeth', name: 'Wyeth Motor Lodge', x: 0.86, y: 0.76 },
      { id: 'pine', name: 'Pine Hollow Cabins', x: 0.88, y: 0.12 },
      { id: 'bea', name: "Bea's place", x: 0.12, y: 0.62 },
    ],
    stops: [
      { t: '2026-11-05T18:52', place: 'corvina', detail: 'Arrived — 3h 18m', clue: 'hotel_meets' },
      { t: '2026-11-07T20:00', place: 'vela', detail: 'Arrived — 1h 35m' },
      { t: '2026-11-12T18:50', place: 'corvina', detail: 'Arrived — 3h 22m', clue: 'hotel_meets' },
      { t: '2026-11-14T20:05', place: 'vela', detail: 'Arrived — 2h 10m' },
      { t: '2026-11-17T21:30', place: 'lanes', detail: 'Arrived — 4 min. Departed.' },
      { t: '2026-11-19T18:49', place: 'corvina', detail: 'Arrived — 3h 31m', clue: 'hotel_meets' },
      { t: '2026-11-21T19:30', place: 'bea', detail: 'Arrived — 2h 10m' },
    ],
  },

  browser: [
    { t: '2026-11-23T07:02', title: "Delphine Rush — 'The Mystery Man Returns' (Tidewater Heat #10) — #1 in Romance — 'Captain Thorne Ashby is back, and the harbor is NOT ready'", url: 'books.example/delphine-rush/mystery-man-returns' },
    { t: '2026-11-22T23:40', title: "who is Delphine Rush — anonymous author theories ('a retired nun', 'three women in a trench coat', 'a man named Gary')", url: 'forum.example/who-is-delphine-rush' },
    { t: '2026-11-21T07:20', title: 'one line on pregnancy test day 30 does that mean no', url: 'search?q=one+line+pregnancy+test+day+30', clue: 'trying' },
    { t: '2026-11-20T22:15', title: "how to tell your husband you're secretly rich without him buying a boat", url: 'search?q=tell+husband+secretly+rich+without+boat' },
    { t: '2026-11-17T21:35', title: 'strike force lanes tuesday league', url: 'search?q=strike+force+lanes+tuesday+league' },
    { t: '2026-11-12T23:58', title: 'how loud is too loud hotel room (professional reasons)', url: 'search?q=how+loud+too+loud+hotel+room' },
    { t: '2026-11-01T22:00', title: "lingerie that says 'I have a secret' but also 'it's a good one'", url: 'search?q=lingerie+secret+good+one' },
  ],

  glimpse: [
    { id: 'g2_tiffani', author: 'tiffani', photo: 'cg2_ph_tiffani', caption: '✨ close friends ✨ Tuesday self-care 💅🕯️ someone says I look better in his vest than he does 🙈 #vanilladreams', t: '2026-11-17T21:40', likes: 9, comments: [{ author: 'bea', text: 'cute vest' }, { author: 'tiffani', text: "it's mine!! 🙂" }, { author: 'bea', text: "it says GREG on it, tiffani. also I'm on your close friends. I don't know why I'm on your close friends" }], clue: 'tiffani_post' },
    { id: 'g2_bea', author: 'bea', photo: 'cg2_ph_bea_spin', caption: 'thursday spin 🚴‍♀️ alone because my sister has "book club" 🙄', t: '2026-11-05T19:31', likes: 22, comments: [{ author: 'greg', text: "isn't nora with you??" }, { author: 'bea', text: 'she went to get snacks!!' }], clue: 'bea_cover' },
    { id: 'g2_wedding', author: 'me', photo: 'cg2_ph_wedding', caption: 'almost ten 🖤', t: '2026-11-01T10:05', likes: 88, comments: [{ author: 'greg', text: '👍' }, { author: 'bea', text: 'he thumbs-upped your WEDDING PHOTO' }, { author: 'tiffani', text: 'so cute you two!! 🙂' }] },
  ],

  bank: {
    account: 'Harbor CU — N. Pruitt Private Savings ••7788',
    balance: 214880.15,
    tx: [
      { t: '2026-11-21T06:00', desc: 'DEPOSIT — HARTWELL & FINCH LTD — ROYALTY Q3 (D. RUSH)', amount: 18400.0, clue: 'cash_stash' },
      { t: '2026-11-21T07:05', desc: 'LAKESIDE PHARMACY — PREGNANCY TEST (2-PACK)', amount: -16.99, clue: 'trying' },
      { t: '2026-11-10T09:05', desc: "PAYSNAP REQUEST FROM B. OKAFOR — 'batteries 48-ct (lantern) 😇' — PAID", amount: -21.99, clue: 'research_box' },
      { t: '2026-11-08T08:58', desc: 'BLUE BOX LLC', amount: -86.0, clue: 'research_box' },
      { t: '2026-11-16T14:05', desc: 'LAKESIDE MORTGAGE — PAYOFF QUOTE FEE', amount: -25.0 },
      { t: '2026-11-14T22:10', desc: 'RISTORANTE VELA — CHAMPAGNE (CONTRACT DINNER)', amount: -188.0 },
      { t: '2026-11-03T21:25', desc: 'PINE HOLLOW CABINS — DEPOSIT (NOV 27–29)', amount: -300.0, clue: 'anniversary_plan' },
      { t: '2026-11-02T22:10', desc: 'VELOUR & LACE — ONLINE', amount: -212.0, clue: 'lingerie_receipt' },
      { t: '2026-08-21T06:00', desc: 'DEPOSIT — HARTWELL & FINCH LTD — ADVANCE (D. RUSH)', amount: 16250.0, clue: 'cash_stash' },
    ],
  },

  calendar: [
    { id: 'cal2_thu', t: '2026-11-19T18:30', title: '🔥 M — Corvina 512', detail: 'water. lots of water. throat spray. last one!!', clue: 'hotel_meets' },
    { id: 'cal2_ten', t: '2026-11-28T12:00', title: '🖤 TEN YEARS — tell him everything', detail: 'cabin · book · letter · lingerie (order TBD)', clue: 'anniversary_plan' },
    { id: 'cal2_bowl', t: '2026-11-24T19:00', title: 'Greg — bowling 🎳 (shared)', detail: 'Strike Force Lanes, Tuesday league' },
    { id: 'cal2_test', t: '2026-11-28T07:00', title: '🤞', detail: 'test again (last one in the box)' },
    { id: 'cal2_therapy', t: '2026-11-23T17:00', title: 'Dr. Ines Park', detail: 'the 28th. what if he doesn\'t say anything', clue: 'nora_knew' },
    { id: 'cal2_draft', t: '2026-11-30T09:00', title: 'TH #11 first draft → B.', detail: 'more hayloft' },
  ],

  wifi: [
    { name: 'CORVINA_GUEST', lastJoined: '2026-11-19T18:51', clue: 'hotel_meets' },
    { name: 'MapleCourt22_Pruitt', lastJoined: '2026-11-24T01:00' },
    { name: 'LakesideOrtho_Staff', lastJoined: '2026-11-20T09:00' },
    { name: 'BeasPlace_NoGregs', lastJoined: '2026-11-21T19:31' },
    { name: 'StrikeForce_FREE', lastJoined: '2026-11-17T21:31' },
  ],

  trace: [
    { id: 'photos', label: "Photos — Recently Deleted (Dez's app)", detail: "Dez's 'totally legal' recovery app carves deleted images out of flash storage.", needs: ['pinned:hotel_meets'], needsHint: 'Need a lead first: pin where she actually goes on Thursdays.', durationMs: 5000 },
    { id: 'msgfrag', label: "Messages — Deleted Fragments (Dez's app)", detail: "Rebuild deleted texts from her chat with 'Mystery Man'.", needs: ['pinned:mystery_texts'], needsHint: "Need a lead first: pin the Mystery Man's Thursday texts.", durationMs: 5500 },
    { id: 'voice', label: "Voicemail — Deleted (Dez's app)", detail: 'Pull voicemails she deleted without listening twice, from the carrier cache.', needs: ['note:n_outline'], needsHint: 'Need a lead first: open her locked outline.', durationMs: 5000 },
    { id: 'unsent', label: "Messages — 'Delete for Everyone' Cache (Dez's app)", detail: 'Restore group-chat messages a sender unsent, from the notification cache.', needs: ['pinned:bowling_forfeit'], needsHint: "Need a lead first: pin what Strike Force Lanes says about your season.", durationMs: 6000 },
  ],

  clues: [
    { id: 'mystery_texts', title: "'Thursday. Suite 512.'", text: "'Mystery Man 🖤': 'Thursday. Suite 512. Bring that voice.' 'What are you wearing Thursday?' 'That sound you made at the end. Chills.' Champagne at your table at Ristorante Vela a week after your date. His voicemail: 'really let go on page two hundred'.", kind: 'person', art: 'av_cg2_mystery' },
    { id: 'dev_texts', title: "Dev: 'you were LOUD'", text: "Dev: 'you were LOUD tonight', the guest in 514 complained, 'same mattress setup next week? extra pillows for your knees'.", kind: 'person', art: 'av_cg2_dev' },
    { id: 'hotel_meets', title: "Thursdays: 'Mrs. Smith', Suite 512", text: "Every Thursday ~19:00–22:00 at Hotel Corvina, Suite 512, booked as 'Mrs. Smith' by 'O.L.A. Ltd.' on account 'RUSH, D.' Housekeeping told not to remove the mattresses from the walls.", kind: 'place' },
    { id: 'lingerie_receipt', title: '$212 of lace', text: "Velour & Lace, 'The Midnight Confession' set, $212, gift-wrapped. Card: 'Ten years. Open slowly.' A try-on selfie with the card, sent to no one.", kind: 'object', art: 'cg2_ph_h_lace' },
    { id: 'cash_stash', title: 'The private account', text: "A private savings account with $214,880. Deposits from Hartwell & Finch Ltd., marked 'ROYALTY' and 'ADVANCE' — 'D. RUSH'.", kind: 'document' },
    { id: 'recording_booth', title: 'Suite 512 is a booth', text: "Recovered: mattresses on every wall, a microphone with a pop filter, printed pages, a sound engineer in headphones, Nora at the mic, and a video thumbnail titled 'ch 9 take 4'.", kind: 'place', art: 'cg2_ph_suite' },
    { id: 'chapter_talk', title: 'Chapters, takes, the meter', text: "Deleted texts and a dictation memo: chapter 14, 'more hayloft', 'your breathy bit in chapter 9 redlined the meter', 'all 31 chapters... into a microphone'. '[whispering] Chapter twenty-two. Greg's asleep.'", kind: 'document' },
    { id: 'author_reveal', title: 'Nora is Delphine Rush', text: "Her locked outline: 'Delphine Rush (that's me. 14 books)'. Audiobook #10 recorded Thursdays in Suite 512 under 'Mrs. Smith', paid by the publisher.", kind: 'document' },
    { id: 'hidden_dedication', title: "'For G.'", text: "Hidden album: a page proof of 'The Mystery Man Returns' by Delphine Rush — 'For G. Ten years, and every hero I write still has your laugh.'", kind: 'object', art: 'cg2_ph_h_proof' },
    { id: 'anniversary_plan', title: 'Nov 28: tell him everything', text: "Ten-year plan: Pine Hollow cabin (booked), lingerie, the book, 'I'm Delphine Rush', a mortgage payoff letter. 'Keep Saturday free... it's the best news of your life.'", kind: 'event' },
    { id: 'trying', title: 'Two years of trying', text: "To Bea: 'two years of trying and nothing... maybe the cabin is lucky.' A pharmacy two-pack; one test used Nov 21 (one line); the last one saved for the morning of the 28th.", kind: 'event', art: 'cg2_ph_h_test' },
    { id: 'bea_cover', title: "Bea's 'Love Island' alibi", text: "Thursday Nov 5: Nora asks Bea to say she was at hers watching Love Island — 'DON'T say hotel.' Bea's Glimpse story at 19:31: alone at spin. Bea's voicemail: rehearsing the lie by accident. You called at 19:35.", kind: 'person', art: 'av_cg2_bea' },
    { id: 'research_box', title: 'BLUE BOX LLC, shipped to the agency', text: "A discreet-billed order ('BLUE BOX LLC', $86: a 'Captain's Knot' silk rope, a lantern, a feather tickler, 'Knots for Lovers') shipped to Okafor Literary Agency, 'for research. truly. chapter 22.' Mystery Man's PaySnap request: 'batteries 48-ct (lantern) 😇'.", kind: 'object' },
    { id: 'greg_tells', title: 'Your Tuesday blackout', text: "Nora to Bea: 'greg's location goes off every tuesday at 6:45 and comes back at 11:30. I decided not to want to know until after the 28th.' Gary #9, to Nora: your GREG vest is in his laundry. Again.", kind: 'event', art: 'av_cg2_greg' },
    { id: 'drift', title: 'Ten years, in your texts', text: "Nov 2025: 'nine years 🖤 ...come to bed, mattress man.' Feb: a 2 a.m. voice note — 'you snore in morse code... it says I LOVE NORA.' June: 'dinner tonight? just us?' — you: 'hoa thing. rain check 👍'. November: 'k night'.", kind: 'event', art: 'av_cg2_greg' },
    { id: 'night_call', title: "'night ❤️' → 'he's asleep. call me'", text: "23:02 to you: 'night ❤️ going to sleep'. 23:04 to Mystery Man: 'he's asleep. call me.' 'Can't wait to hear it again. You're way better than the last one.' 'delete this after.' Then: 'I want to do the hayloft scene while the house is quiet.'", kind: 'document', art: 'av_cg2_mystery' },
    { id: 'origin', title: 'How yours started', text: "HOA chat, July 7: Tiffani welcomes 'our NEW treasurer, Greg Pruitt! so good with numbers'. 'Treasurer orientation Tuesday 7pm, my place... Gary will be at his brother's.' You: 'tuesday works 👍 (I have bowling after)'. The first Tuesday.", kind: 'event', art: 'av_cg2_tiffani' },
    { id: 'nora_knew', title: 'She already knew', text: "Unsent draft, 02:40: 'I know you don't bowl... I think I know where you go. I'm not going to look... I'm going to give you the chance to tell me everything too. If you don't, I'll know that too.' Therapy with Dr. Ines Park: 'what if he doesn't say anything'.", kind: 'document' },
    { id: 'tiffani_vm', title: "Tiffani's wrong-Pruitt voicemail", text: "Deleted voicemail, Nov 10: '[whispering] Greg... Room 6, seven. Wear the vest. I've been thinking about your hands all day... Wait. Is this Greg's phone or the house — Hi Nora! Wrong Pruitt!' Nora deleted it without listening twice.", kind: 'document', art: 'av_cg2_tiffani' },
    { id: 'excuses', title: "Her 'book club' excuses", text: "'it's literally just book club greg. we rent a room.' 'why are you being so weird lately. you haven't asked me about a book in ten years.' 'my phone died sorry!! ...a mystery. about a man.'", kind: 'document' },
    { id: 'bernard_reveal', title: 'Mystery Man is Bernard, her agent', text: "'Mystery Man' texts while you're holding her phone: he's Bernard Okafor, her literary agent, 68, new hip, wife named Ruth. Thursday was the final audiobook session.", kind: 'person', art: 'av_cg2_mystery' },
    { id: 'bowling_forfeit', title: '0 frames, 11 forfeits', text: "Strike Force Lanes: you have bowled 0 frames this season. The league plays Wednesdays; Tuesdays are Toddler Bumper Bowl. Your shoes still have the tags.", kind: 'document' },
    { id: 'motel_charges', title: 'Card ••2291, Room 6, Tuesdays', text: "Joint statement: YOUR card ••2291 at Wyeth Motor Lodge, Room 6, on Nov 3, 10 and 17 — plus minibar for two, Vanilla Dreams body mist, a his-and-hers robe set and a dozen roses Nora never got.", kind: 'document' },
    { id: 'wyeth_avoid', title: "'Room 6 has a smell'", text: "You vetoed Lake Wyeth for the anniversary: 'terrible motel. room 6 has a smell. i've heard.'", kind: 'person', art: 'av_cg2_greg' },
    { id: 'tiffani_post', title: "Tiffani's close-friends story", text: "Tiffani Boone's close-friends Glimpse, Tuesday 21:40: a motel mirror selfie; Wyeth Motor Lodge key fob #6; your DreamHaven fleece vest embroidered 'GREG' on the chair. 'Someone says I look better in his vest.'", kind: 'person', art: 'cg2_ph_tiffani' },
    { id: 'tiffani_slip', title: "'room 6 tues? wear the vest'", text: "Unsent from the HOA group, Tuesday 23:12: 'greg u left ur bowling shoes in my car AGAIN... room 6 tues? wear the vest. JUST the vest.' 'my legs are still shaking.' Then: 'WRONG CHAT.'", kind: 'document', art: 'av_cg2_tiffani' },
    { id: 'tiffani_test', title: 'Two lines, 01:52', text: "Tiffani, to Nora's phone, while you're holding it: a positive pregnancy test. 'Greg isn't answering. I think he'd want to know first.'", kind: 'event', art: 'av_cg2_tiffani' },
    { id: 'snip', title: "'gary's had the snip since 2019'", text: "The last unsent HOA message: 'we need to talk tues. I'm late. and before you ask, gary's had the snip since 2019.'", kind: 'document', art: 'av_cg2_tiffani' },
  ],

  questions: [
    {
      id: 'q_cheat', prompt: 'Is Nora cheating on you?',
      options: [
        { id: 'mystery', label: "Yes — with the 'Mystery Man'" },
        { id: 'dev', label: "Yes — with Dev, the 'sound guy'", art: 'av_cg2_dev' },
        { id: 'no', label: 'No' },
        { id: 'emotional', label: 'Not physically, but emotionally' },
      ],
      answer: 'no', evidence: ['recording_booth', 'chapter_talk', 'author_reveal', 'bernard_reveal', 'hidden_dedication', 'anniversary_plan'],
      explain: 'Suite 512 is a homemade recording booth, the texts are about chapters, and every secret on the phone points at the same day: November 28, when she planned to tell you everything.',
    },
    {
      id: 'q_mystery', prompt: "Who is 'Mystery Man 🖤'?",
      options: [
        { id: 'lover', label: 'A lover she meets in a hotel' },
        { id: 'agent', label: 'Bernard Okafor, her literary agent', art: 'av_cg2_mystery' },
        { id: 'model', label: 'A book-cover model' },
        { id: 'bea', label: 'Bea, testing you' },
      ],
      answer: 'agent', evidence: ['bernard_reveal', 'chapter_talk', 'author_reveal'],
      explain: "He reads her chapters on the train, passes on the publisher's notes, books the suite on the agency's account and has a wife named Ruth. The black heart is for your benefit.",
    },
    {
      id: 'q_secret', prompt: 'What is Nora actually hiding?',
      options: [
        { id: 'affair', label: 'An affair' },
        { id: 'debt', label: 'Gambling debts' },
        { id: 'author', label: "She's the anonymous romance novelist Delphine Rush, recording her own audiobook and saving it all for a 10th-anniversary reveal" },
        { id: 'leaving', label: "She's saving up to leave you" },
      ],
      answer: 'author', evidence: ['author_reveal', 'hidden_dedication', 'recording_booth', 'cash_stash', 'anniversary_plan', 'lingerie_receipt', 'chapter_talk', 'research_box'],
      explain: 'Royalties from Hartwell & Finch, a dedication page that reads "For G.", a cabin, a payoff quote for your mortgage and lingerie with a card that says "Ten years".',
    },
    {
      id: 'q_who', prompt: 'Who in this marriage IS cheating?',
      options: [
        { id: 'nobody', label: 'Nobody' },
        { id: 'nora', label: 'Nora, with Bernard' },
        { id: 'greg', label: 'You — with Tiffani Boone, the HOA president', art: 'av_cg2_tiffani' },
        { id: 'bea', label: "Bea's husband" },
      ],
      answer: 'greg', evidence: ['tiffani_slip', 'tiffani_post', 'motel_charges', 'bowling_forfeit', 'wyeth_avoid', 'greg_tells'],
      explain: "Your bowling doesn't exist, your card pays for Room 6 every Tuesday, and Tiffani posted your vest and unsent your shoes. Nora's phone knew before you opened it.",
    },
    {
      id: 'q_where', prompt: "Where are your 'bowling' nights really spent?",
      options: [
        { id: 'lanes', label: 'Strike Force Lanes' },
        { id: 'corvina', label: 'Hotel Corvina, Suite 512' },
        { id: 'wyeth', label: 'Wyeth Motor Lodge, Room 6, Tuesdays' },
        { id: 'clubhouse', label: 'The Maple Court clubhouse' },
      ],
      answer: 'wyeth', evidence: ['motel_charges', 'tiffani_slip', 'tiffani_post', 'wyeth_avoid'],
      explain: 'Three Tuesdays, three charges for Room 6, a key fob in Tiffani\'s selfie, and a husband who knows how one specific motel room smells.',
    },
    {
      id: 'q_baby', prompt: "Whose is Tiffani's baby?",
      options: [
        { id: 'gary', label: "Gary's, her husband's" },
        { id: 'greg', label: 'Yours' },
        { id: 'unknown', label: "Impossible to know from this phone" },
      ],
      answer: 'greg', evidence: ['snip'],
      explain: "Gary had a vasectomy in 2019. Tiffani said so herself, in the wrong chat, at 23:13 on a Tuesday.",
    },
    {
      id: 'q_knew', prompt: 'What did Nora already know before tonight?',
      options: [
        { id: 'nothing', label: 'Nothing' },
        { id: 'chance', label: "That you don't bowl — and she chose the 28th anyway, to give you a chance to confess" },
        { id: 'leaving', label: 'Everything — she was already leaving' },
        { id: 'pi', label: 'She hired a PI' },
      ],
      answer: 'chance', evidence: ['nora_knew', 'tiffani_vm', 'greg_tells'],
      explain: "She heard 'Wrong Pruitt' and deleted it. She wrote 'I'm not going to look' and didn't. The 28th was a test you didn't know you were taking.",
    },
  ],

  events: [
    { id: 'e2_mystery', kind: 'text', when: ['unlocked'], delayMs: 8000, thread: 'th_mystery', contact: 'mystery', text: "Still up, darling? I can't stop hearing you. The take, I mean. I'm listening to it in the bath. Ruth thinks I've joined a cult. 🖤" },
    { id: 'e2_bea', kind: 'text', when: ['unlocked'], minPins: 4, delayMs: 20000, thread: 'th_bea', contact: 'bea', text: "u up? 🐝 can't sleep. are you still telling him saturday? all of it? even the part about tuesdays? I love you. you're braver than me" },
    { id: 'e2_h_mystery', kind: 'handler', when: ['pinned:mystery_texts'], delayMs: 3000, text: "bro. 'Mystery Man', black heart, a hotel suite every thursday booked as MRS SMITH. ok. ok. that's bad. but also. BRO. you can't — you of all people can't — ok I'm not saying it. find out what's in that suite before you wake her up." },
    { id: 'e2_bernard', kind: 'text', when: ['recovered:photos'], delayMs: 6000, thread: 'th_mystery', contact: 'mystery', clue: 'bernard_reveal', text: "Nora, it's Bernard. Bernard Okafor, your agent, since your phone apparently thinks I'm a smoky stranger. Your husband's bowling-shoe woman rang the agency asking if Delphine Rush 'takes HOA clients'. I said I'm sixty-eight, I have a new hip and a wife named Ruth, and that Thursday was our final audiobook session. Did I ruin the 28th?" },
    { id: 'e2_h_card', kind: 'handler', when: ['pinned:motel_charges'], delayMs: 3500, text: "(Nora rolls over. Her hand pats the nightstand. Finds rice. Stops.) bro. card ending 2291. that's YOUR card. on HER phone. on the JOINT statement. dude she gets the mail. she gets the MAIL." },
    { id: 'e2_tiffani', kind: 'text', when: ['pinned:motel_charges'], minPins: 10, delayMs: 9000, thread: 'th_tiffani', contact: 'tiffani', clue: 'tiffani_test', text: "Nora I'm so sorry it's 2am. Greg isn't answering and I think he'd want to know first and I don't have anyone else's number in that house. [photo: a pregnancy test, two lines] I'm keeping it. Please don't tell Gary yet." },
    { id: 'e2_h_end', kind: 'handler', when: ['recovered:unsent'], minPins: 16, delayMs: 4000, text: "(The hallway light clicks on. Nora: 'Greg? Why is the rice on the floor?') ...bro. I don't have a joke. put it down. or don't. you know everything now. she doesn't. that's the last time that's ever going to be true." },
  ],

  hints: [
    { until: 'unlocked', text: "'A dots-and-dashes thing.' Bea's lock-screen text agrees. Read the bracelet as Morse code: long bead = dash, short bead = dot, each gold spacer starts the next digit." },
    { until: 'pinned:hotel_meets', after: ['unlocked'], text: "Thursday 'book club'. Maps, Wi-Fi and Mail know where she actually goes." },
    { until: 'recovered:photos', after: ['pinned:hotel_meets'], text: 'Something happens in Suite 512 every Thursday. Recover the deleted photos and look at the walls.' },
    { until: 'recovered:msgfrag', after: ['pinned:mystery_texts'], text: 'Her chat with the Mystery Man has gaps. Recover what she deleted.' },
    { until: 'hidden:open', after: ['unlocked'], text: "Hidden album. Same passcode. Read what's printed, not just what's worn." },
    { until: 'note:n_outline', after: ['unlocked'], text: "The locked outline wants a hero's first name. Browser has a book she checks every morning." },
    { until: 'pinned:motel_charges', after: ['unlocked'], text: 'There\'s a joint account statement in Mail. Look at whose card does what on Tuesdays.' },
    { until: 'recovered:unsent', after: ['pinned:bowling_forfeit'], text: 'The HOA chat has a hole in it at 23:12 on a Tuesday. Recover what was unsent.' },
    { until: 'report:filed', after: ['unlocked'], text: 'Two questions, really: what is she hiding, and what are you. Pin every answer.' },
  ],

  handlerIntro: "bro it's 1:40. why are you texting me a picture of a bag of rice. ...oh no. you're doing it. you're reading her phone. greg. GREG. ok. fine. screenshot everything, put it back in the rice EXACTLY how it was, and remember I said this: people in glass motels.",

  epilogue: {
    solved: [
      "You put the phone back in the rice. You lay down. You didn't sleep. At 7 a.m. Nora made coffee and hummed something and said, 'Saturday. Nice shirt. Not the vest.' You said okay. It was the most honest thing you'd said in four months, and it was one word.",
      "On the 28th, at Pine Hollow, she handed you a hardback. The cover said DELPHINE RUSH. The dedication said 'For G. Ten years, and every hero I write still has your laugh.' She was wearing the Midnight Confession set under a cabin robe and holding a mortgage payoff letter and a test with one line on it, and she said, 'I have something to tell you.' You said, 'Me first.'",
      "She listened all the way through Room 6, the vest and the two lines. Then she said, 'Gary had the snip, didn't he,' and you realised she'd read the HOA chat before you ever touched her phone. She just hadn't decided to know yet. She tore up the payoff letter. She bought a house on Lake Wyeth instead. It has a dock and no Room 6.",
      "Tidewater Heat #11 came out in spring. The villain is a harbor-master who sells waterbeds and says he's 'at bowling'. He is crushed by a falling mattress display in chapter 30. It went to #1 in four countries. Tiffani was removed as HOA president after Gary read the group chat into the minutes. You bowl now, for real, on Wednesdays, alone. The shoes still have the tags.",
    ],
    partial: [
      'You blew it.',
      "You woke her up at 2 a.m. and said, 'Who is the Mystery Man.' She sat up, very calm, picked up her phone, opened Mail, and turned the joint statement around to face you. 'Who,' she said, 'is Room 6.'",
      "You never found out about Delphine Rush. You read about her in a magazine at the dentist a year later, a profile of a reclusive novelist with a lake house and a dedication 'For nobody, now.' Go back to Suite 512 and look at the walls. Then look at card 2291.",
    ],
  },
};
