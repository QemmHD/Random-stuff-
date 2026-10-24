// Renders the home-screen icons and iPhone launch images into public/.
// Afterwards the PNGs are quantized to 256 colors (Pillow) to keep them small; see README.
// Needs Playwright with Chromium (npx playwright install chromium).
import { createRequire } from 'node:module';

// Playwright is not a project dependency; use the copy installed on the machine
const { chromium } = createRequire(import.meta.url)('playwright');

const BG = '#04121a';
const ball = (cx, cy, r, sw) => `
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#19E3C9" stroke-width="${sw}"/>
  <path d="M${cx - r} ${cy} H${cx + r} M${cx} ${cy - r} V${cy + r}
           M${cx - r * 0.71} ${cy - r * 0.71} Q${cx} ${cy} ${cx - r * 0.71} ${cy + r * 0.71}
           M${cx + r * 0.71} ${cy - r * 0.71} Q${cx} ${cy} ${cx + r * 0.71} ${cy + r * 0.71}"
        fill="none" stroke="#F5B83D" stroke-width="${sw * 0.75}" stroke-linecap="round"/>`;

const icon = (s) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 512 512">
  <defs><radialGradient id="g" cx="50%" cy="42%" r="70%"><stop offset="0" stop-color="#11414f"/><stop offset="1" stop-color="${BG}"/></radialGradient>
  <filter id="f" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="14"/></filter></defs>
  <rect width="512" height="512" fill="url(#g)"/>
  <g filter="url(#f)" opacity="0.55">${ball(256, 256, 150, 22)}</g>
  ${ball(256, 256, 150, 22)}
</svg>`;

// launch image: same look as the in-app splash, so the hand-off is seamless
const splash = (w, h, dpr) => {
  const cx = w / dpr / 2;
  const cy = (h / dpr) * 0.5;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w / dpr} ${h / dpr}">
  <defs><radialGradient id="g"><stop offset="0" stop-color="#19E3C9" stop-opacity="0.16"/><stop offset="1" stop-color="#19E3C9" stop-opacity="0"/></radialGradient></defs>
  <rect width="100%" height="100%" fill="${BG}"/>
  <circle cx="${cx}" cy="${cy}" r="110" fill="url(#g)"/>
  ${ball(cx, cy, 38, 4)}
</svg>`;
};

const SPLASH = [
  [440, 956, 3], // 16/17 Pro Max
  [430, 932, 3], // 14 Pro Max, 15 Plus / Pro Max, 16 Plus
  [428, 926, 3], // 12/13 Pro Max, 14 Plus
  [420, 912, 3], // Air
  [402, 874, 3], // 16/17 Pro, 17
  [393, 852, 3], // 14 Pro, 15, 15 Pro, 16
  [390, 844, 3], // 12, 13, 14
  [375, 812, 3], // X, XS, 11 Pro, 12/13 mini
  [414, 896, 2], // XR, 11
  [375, 667, 2], // SE, 8
];

const browser = await chromium.launch();
const page = await browser.newPage();
const render = async (svg, w, h, file) => {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<html><body style="margin:0;background:${BG}">${svg}</body></html>`);
  await page.screenshot({ path: 'public/' + file, omitBackground: false });
};
for (const s of [180, 192, 512]) await render(icon(s), s, s, 'icon-' + s + '.png');
const links = [];
for (const [w, h, d] of SPLASH) {
  const file = 'launch-' + w * d + 'x' + h * d + '.png';
  await render(splash(w * d, h * d, d), w * d, h * d, file);
  links.push(
    `<link rel="apple-touch-startup-image" media="(device-width: ${w}px) and (device-height: ${h}px) and (-webkit-device-pixel-ratio: ${d}) and (orientation: portrait)" href="./${file}" />`
  );
}
await browser.close();
console.log(links.join('\n    '));
