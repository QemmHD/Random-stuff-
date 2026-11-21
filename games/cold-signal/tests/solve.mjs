// Generic UI solver: plays case N start to finish through the real UI,
// using only what a player can do (it reads the case data only for the
// passcode, note passwords and the final answers).
// Usage: node tests/solve.mjs <caseIndex> [baseUrl] [outDir]
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
const { chromium } = createRequire(import.meta.url)('playwright');

const idx = Number(process.argv[2] ?? 0);
const base = process.argv[3] ?? 'http://localhost:5199/';
const out = process.argv[4] ?? 'tests/output';
const vp = process.env.VIEWPORT === 'phone' ? { width: 390, height: 844 } : { width: 1440, height: 900 };
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: vp })).newPage();
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(String(e)));
const sleep = (ms) => page.waitForTimeout(ms);
const top = '.view.app:last-child';
const tag = `${process.env.VIEWPORT ?? 'desk'}-case${idx + 1}`;
const shot = (n) => page.screenshot({ path: `${out}/${tag}-${n}.png` });

await page.goto(base);
const c = await page.evaluate((i) => {
  const cs = window.__cs.CASES;
  const prog = {};
  for (let k = 0; k < i; k++) prog[cs[k].id] = 3;
  localStorage.setItem('cs.progress', JSON.stringify(prog));
  return JSON.parse(JSON.stringify(cs[i]));
}, idx);
await page.reload();
await page.getByText('Tap to begin').click();
await sleep(800);
await shot('01-files');
await page.locator('.case-card').nth(idx).getByRole('button', { name: /Open case|Continue/ }).click();
await sleep(600);
await page.locator('.br-paras').click();
await sleep(300);
await shot('02-briefing');
await page.getByText('Take the phone').click();
await sleep(2700);
await shot('03-lock');
await page.locator('.lock-wall').click(); await sleep(400);
await shot('04-wallpaper');
await page.locator('.zv-close').click(); await sleep(300);
await page.locator('.lock-unlock').click(); await sleep(300);
for (const d of c.lock.passcode) await page.locator('.pc-key b', { hasText: new RegExp(`^${d}$`) }).click();
await sleep(1500);
await shot('05-home');

async function pinAll() {
  // Only real case clues (data-pin without the "n:" player-note prefix).
  const real = ':not(.on):not([data-pin^="n:"])';
  for (let i = 0; i < 60; i++) {
    try {
      const row = page.locator(`${top} .bubble-row:not(.show-pin):has(.pin-btn${real}) .bubble`).first();
      if (await row.count()) { await row.click({ timeout: 3000 }); await page.waitForTimeout(120); }
      const b = page.locator(`.phone-overlay .pin-btn${real}, ${top} .bubble-row.show-pin .pin-btn${real}, ${top} :not(.bubble-row) > .pin-btn${real}`).first();
      if (!(await b.count())) return;
      await b.scrollIntoViewIfNeeded({ timeout: 3000 }); await b.click({ timeout: 3000 }); await page.waitForTimeout(120);
    } catch {
      // the view re-renders after a pin; just look again
      await page.waitForTimeout(250);
    }
  }
}
const home = async () => { await page.locator('.home-indicator').click(); await sleep(450); };
const openApp = async (a) => { await page.locator(`.view.home [data-app="${a}"]`).first().click(); await sleep(500); };
const back = async () => { await page.locator(`${top} .ah-back`).click(); await sleep(400); };
async function rows(fn) {
  const n = await page.locator(`${top} .app-body button.row`).count();
  for (let i = 0; i < n; i++) {
    await page.locator(`${top} .app-body button.row`).nth(i).click(); await sleep(420);
    if (await page.locator('.pw-input').count()) {
      const title = (await page.locator('.pw-form b').first().textContent()).replace(/"/g, '');
      const note = c.notes.find((x) => x.title === title);
      await page.locator('.pw-input').fill(note.lock.password);
      await page.locator('.pw-form button[type=submit]').click(); await sleep(600);
    }
    await fn?.(i);
    await pinAll();
    await back();
  }
}
async function pass(round) {
  await openApp('messages'); await rows(async (i) => { if (round === 0 && i === 0) await shot('06-thread'); }); await home();
  await openApp('photos');
  const n = await page.locator(`${top} .ph-tile`).count();
  for (let i = 0; i < n; i++) { await page.locator(`${top} .ph-tile`).nth(i).click(); await sleep(250); if (round === 0 && i === 3) await shot('07-photo'); await pinAll(); await page.locator('.zv-close').click(); await sleep(260); }
  await home();
  await openApp('notes'); await rows(); await home();
  await openApp('mail');
  for (const f of ['Inbox', 'Sent', 'Trash']) { await page.locator(`${top} .seg button`, { hasText: f }).click(); await sleep(350); await rows(); }
  await home();
  await page.locator('.dock [data-app="phone"]').click(); await sleep(500);
  await page.locator(`${top} .seg button`, { hasText: 'Voicemail' }).click(); await sleep(350);
  await pinAll(); if (round === 0) await shot('08-voicemail'); await home();
  for (const app of ['maps', 'glimpse', 'bank', 'calendar', 'settings', 'browser']) {
    await openApp(app);
    if (app === 'maps') { const ch = page.locator(`${top} .chips button`); for (let k = 0; k < await ch.count(); k++) { await ch.nth(k).click(); await sleep(150); await pinAll(); } if (round === 0) await shot('09-maps'); }
    if (app === 'calendar') {
      for (let k = 0; k < 6; k++) { const prev = page.locator(`${top} .cal-head .icon-btn`).first(); if (!(await prev.isEnabled())) break; await prev.click(); await sleep(150); }
      for (let k = 0; k < 8; k++) { await pinAll(); const next = page.locator(`${top} .cal-head .icon-btn`).last(); if (!(await next.isEnabled())) break; await next.click(); await sleep(150); }
    }
    if (app === 'browser') await rows();
    await pinAll();
    if (round === 0 && app === 'glimpse') await shot('10-glimpse');
    await home();
  }
  await openApp('trace');
  for (let r = 0; r < 5; r++) {
    const run = page.locator(`${top} .trace-run`).first();
    if (!(await run.count())) break;
    await run.click(); await sleep(1200);
    if (round === 0 && r === 0) await shot('11-trace');
    const job = c.trace.find((j) => true);
    await sleep(Math.max(...c.trace.map((j) => j.durationMs)) + 300);
    void job;
  }
  await home();
}
for (let round = 0; round < 4; round++) {
  await pass(round);
  const st = await page.evaluate((id) => JSON.parse(localStorage.getItem(`cs.case.${id}`)), c.id);
  console.log(`round ${round}: pins ${st.pins.length}/${c.clues.length}, flags ${st.flags.length}`);
  if (st.pins.filter((x) => !x.id.startsWith('n:')).length === c.clues.length && c.trace.every((j) => st.flags.includes(`recovered:${j.id}`)) && c.events.every((e) => st.flags.includes(`event:${e.id}`))) break;
  await sleep(9000); // let live events land
}
await sleep(4000);
await shot('12-endstate');
await page.locator('.hud-btn', { hasText: 'Board' }).click(); await sleep(700);
await shot('13-board');
await page.keyboard.press('b'); await sleep(300);
await page.locator('.hud-btn.report').click(); await sleep(500);
const clueTitle = (id) => c.clues.find((k) => k.id === id).title;
for (const q of c.questions) {
  const sec = page.locator('.rp-q', { hasText: q.prompt });
  const opt = q.options.find((o) => o.id === q.answer).label;
  await sec.locator('.rp-opt', { hasText: opt }).first().click(); await sleep(60);
  await page.locator('.rp-q', { hasText: q.prompt }).locator('.rp-chip', { hasText: clueTitle(q.evidence[0]) }).first().click(); await sleep(60);
}
await shot('14-report');
await page.locator('.rp-foot .btn').click(); await sleep(250);
await page.locator('.rp-foot .btn').click(); await sleep(6000);
await shot('15-epilogue');
const stamp = await page.locator('.ep-stamp').textContent();
console.log(c.title, '→', stamp, await page.locator('.ep-score').textContent());
await browser.close();
if (errors.length) { console.error('CONSOLE ERRORS:\n' + errors.join('\n')); process.exit(1); }
if (!/CLOSED/.test(stamp)) process.exit(1);
console.log('SOLVE OK');
