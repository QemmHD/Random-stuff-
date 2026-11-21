// End-to-end playthrough of Case 01 through the real UI.
// Usage: node tests/play.mjs [baseUrl] [outDir]
// Fails (exit 1) on any console error, page error, or if the case is not solved.
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import { mkdirSync } from 'node:fs';

const base = process.argv[2] ?? 'http://localhost:5199/';
const out = process.argv[3] ?? 'tests/output';
const viewport = process.env.VIEWPORT === 'phone' ? { width: 390, height: 844 } : { width: 1440, height: 900 };
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(String(e)));

const shot = (name) => page.screenshot({ path: `${out}/${process.env.VIEWPORT ?? 'desk'}-${name}.png` });
const top = '.view.app:last-child';
const sleep = (ms) => page.waitForTimeout(ms);

async function pinAll() {
  for (let i = 0; i < 30; i++) {
    const btn = page.locator(`.phone-overlay .pin-btn:not(.on), ${top} .pin-btn:not(.on)`).first();
    if (!(await btn.count())) return;
    await btn.scrollIntoViewIfNeeded();
    await btn.click();
    await sleep(120);
  }
}
async function home() {
  await page.locator('.home-indicator').click();
  await sleep(500);
}
async function openApp(app) {
  await page.locator(`.view.home [data-app="${app}"]`).first().click();
  await sleep(550);
}
async function back() {
  await page.locator(`${top} .ah-back`).click();
  await sleep(450);
}
async function eachRow(fn) {
  const n = await page.locator(`${top} .app-body button.row`).count();
  for (let i = 0; i < n; i++) {
    await page.locator(`${top} .app-body button.row`).nth(i).click();
    await sleep(450);
    await fn?.(i);
    await pinAll();
    await back();
  }
}
async function photosPass() {
  await openApp('photos');
  const n = await page.locator(`${top} .ph-tile`).count();
  for (let i = 0; i < n; i++) {
    await page.locator(`${top} .ph-tile`).nth(i).click();
    await sleep(300);
    await pinAll();
    await page.locator('.zv-close').click();
    await sleep(300);
  }
  await home();
}

await page.goto(base);
await sleep(800);
await shot('01-title');
await page.getByText('Tap to begin').click();
await sleep(900);
await shot('02-files');
await page.locator('.case-card').first().getByRole('button', { name: /Open case|Continue/ }).click();
await sleep(600);
await page.locator('.br-paras').click();
await sleep(400);
await shot('03-briefing');
await page.getByText('Take the phone').click();
await sleep(2600);
await shot('04-lock');

// lock screen inspect
await page.locator('.lock-wall').click();
await sleep(400);
await shot('05-wallpaper');
await page.locator('.zv-close').click();
await sleep(300);

// wrong code then right code
await page.locator('.lock-unlock').click();
await sleep(300);
for (const d of '1111') await page.locator('.pc-key', { hasText: d }).first().click();
await sleep(500);
for (const d of '0214') await page.locator('.pc-key b', { hasText: new RegExp(`^${d}$`) }).click();
await sleep(1400);
await shot('06-home');

// phone-wide search
await page.locator('.home-search').click();
await sleep(500);
await page.locator('.search-input').fill('pryce');
await sleep(300);
const hits = await page.locator(`${top} .search-results button.row`).count();
if (hits < 3) throw new Error(`search returned ${hits} hits`);
await shot('06b-search');
await page.locator(`${top} .search-results button.row`).first().click();
await sleep(500);
await home();

// voicemails
await openApp('phone').catch(async () => { await page.locator('.dock [data-app="phone"]').click(); await sleep(500); });
await page.locator(`${top} .seg button`, { hasText: 'Voicemail' }).click();
await sleep(400);
await page.locator(`${top} .vm-play`).first().click();
await sleep(1200);
await shot('07-voicemail');
await page.locator(`${top} .vm-play`).first().click();
await pinAll();
await home();

// messages
await openApp('messages');
await shot('08-messages');
await eachRow(async (i) => { if (i === 0) await shot('09-thread'); });
await home();

await photosPass();

// notes
await openApp('notes');
const insurance = page.locator(`${top} button.row`, { hasText: 'Insurance' });
await insurance.click();
await sleep(400);
await page.locator('.pw-input').fill('wrong');
await page.locator('.pw-form button[type=submit]').click();
await sleep(400);
await page.locator('.pw-input').fill('seawren');
await page.locator('.pw-form button[type=submit]').click();
await sleep(600);
await shot('10-note');
await pinAll();
await back();
await home();

// mail (all folders)
await openApp('mail');
for (const f of ['Inbox', 'Sent', 'Trash']) {
  await page.locator(`${top} .seg button`, { hasText: f }).click();
  await sleep(500);
  await eachRow();
}
await home();

for (const app of ['maps', 'glimpse', 'bank', 'calendar', 'settings', 'browser']) {
  await openApp(app);
  await sleep(300);
  if (app === 'calendar') {
    // walk back through months to find all events
    for (let k = 0; k < 3; k++) { await pinAll(); const prev = page.locator(`${top} .cal-head .icon-btn`).first(); if (await prev.isEnabled()) { await prev.click(); await sleep(250); } }
  }
  if (app === 'maps') {
    const chips = page.locator(`${top} .chips button`);
    for (let k = 0; k < await chips.count(); k++) { await chips.nth(k).click(); await sleep(200); await pinAll(); }
    await shot('11-maps');
  }
  if (app === 'browser') await eachRow();
  await pinAll();
  if (app === 'bank') await shot('12-bank');
  await home();
}

// TRACE: run every available job until all done
await openApp('trace');
for (let round = 0; round < 6; round++) {
  const run = page.locator(`${top} .trace-run`).first();
  if (!(await run.count())) break;
  await run.click();
  await sleep(1500);
  await shot(`13-trace-${round}`);
  await sleep(6000);
}
await shot('14-trace-done');
await home();

// revisit for recovered items
await openApp('messages'); await eachRow(); await home();
await photosPass();
await page.locator('.dock [data-app="phone"]').click(); await sleep(500);
await page.locator(`${top} .seg button`, { hasText: 'Voicemail' }).click(); await sleep(400);
await pinAll(); await home();
await openApp('trace');
for (let round = 0; round < 3; round++) {
  const run = page.locator(`${top} .trace-run`).first();
  if (!(await run.count())) break;
  await run.click(); await sleep(7500);
}
await home();
await page.locator('.dock [data-app="phone"]').click(); await sleep(500);
await page.locator(`${top} .seg button`, { hasText: 'Voicemail' }).click(); await sleep(400);
await pinAll(); await home();

// live text from Mara should arrive
await sleep(9000);
await shot('15-live');
await openApp('messages'); await eachRow(); await home();

// board
await page.locator('.hud-btn', { hasText: 'Board' }).click().catch(() => {});
await sleep(800);
await shot('16-board');
await page.keyboard.press('b');
await sleep(400);

const pinned = await page.evaluate(() => JSON.parse(localStorage.getItem('cs.case.low-tide')).pins.length);
console.log('pinned clues:', pinned);

// report
await page.locator('.hud-btn.report').click();
await sleep(600);
const answers = {
  'What had Mara discovered?': ['falsified', 'HB-17: 48 vs 4.8'],
  'Who arranged to meet Mara at Gull Point that night?': ['Dr. Alan Pryce', 'Gull Point, 11:30'],
  'Who was sending threats from (555) 014-7720?': ['Cal Reyes', "Cal Reyes' cell"],
  'Where was Theo Vance when Mara reached Gull Point?': ['Still at The Anchor', 'Theo at The Anchor'],
  'Where is Mara Quill now?': ['Larch Hollow', 'Key tag LH-4'],
};
for (const [q, [opt, ev]] of Object.entries(answers)) {
  const sec = page.locator('.rp-q', { hasText: q });
  await sec.locator('.rp-opt', { hasText: opt }).click();
  await sleep(80);
  await page.locator('.rp-q', { hasText: q }).locator('.rp-chip', { hasText: ev }).first().click();
  await sleep(80);
}
await shot('17-report');
await page.locator('.rp-foot .btn').click();
await sleep(300);
await page.locator('.rp-foot .btn').click();
await sleep(4500);
await shot('18-epilogue');
const stamp = await page.locator('.ep-stamp').textContent();
console.log('result:', stamp, await page.locator('.ep-score').textContent());

await browser.close();
if (errors.length) { console.error('CONSOLE ERRORS:\n' + errors.join('\n')); process.exit(1); }
if (!/CLOSED/.test(stamp ?? '')) { console.error('case not solved'); process.exit(1); }
console.log('PLAYTHROUGH OK');
