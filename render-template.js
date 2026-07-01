// Render every .page of brochure-template.html to a PNG + audit A4 fit.
// Usage:  node render-template.js
// Output: template-preview-N.png (one per page) in this folder, plus a
//         per-page FITS/OVERFLOW report. Every page MUST report "FITS ok"
//         — A4 height is fixed and any overflow is silently clipped in print.
const { chromium } = require('playwright');
const path = require('path');

const FILE = process.argv[2] || 'brochure-template.html';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  await page.setViewportSize({ width: 794, height: 1123 }); // A4 @ 96dpi
  await page.goto('file:///' + path.resolve(FILE).replace(/\\/g, '/'), { waitUntil: 'networkidle', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);

  const pages = await page.$$('.page');
  for (let i = 0; i < pages.length; i++) {
    await pages[i].screenshot({ path: path.resolve('template-preview-' + (i + 1) + '.png') });
  }

  const audit = await page.$$eval('.page', els => els.map((el, i) => {
    const inner = el.querySelector('.inner');
    return { n: i + 1, over: inner ? inner.scrollHeight - inner.clientHeight : 0 };
  }));
  console.log('Rendered ' + pages.length + ' page(s) from ' + FILE + ':');
  audit.forEach(o => console.log('  page' + o.n + ': ' + (o.over > 1 ? 'OVERFLOW +' + o.over + 'px  <-- FIX' : 'FITS ok')));

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
