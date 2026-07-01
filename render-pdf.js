// Exports the single-file HTML brochure to a print-ready A4 PDF via Playwright.
// Usage: node render-pdf.js "DR018 - The Signal-Led GTM Playbook.html" ["out.pdf"]
const { chromium } = require('playwright');
const path = require('path');

const file = process.argv[2];
const out = process.argv[3] || 'DR018 - The Signal-Led GTM Playbook.pdf';

if (!file) { console.error('Usage: node render-pdf.js <input.html> [out.pdf]'); process.exit(1); }

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const url = 'file:///' + path.resolve(file).replace(/\\/g, '/');
  await page.goto(url, { waitUntil: 'networkidle', timeout: 120000 });
  await page.emulateMedia({ media: 'print' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);
  await page.pdf({
    path: path.resolve(out),
    printBackground: true,
    preferCSSPageSize: true,   // honour @page { size: A4 portrait; margin:0 }
  });
  await browser.close();
  console.log('PDF written:', path.resolve(out));
})().catch(e => { console.error(e); process.exit(1); });
