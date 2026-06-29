// Render a SINGLE standalone test page to a PNG + report overflow.
// Usage: node render-one.js <input.html> <output.png>
// Must be run from the project root so require('playwright') resolves and
// relative asset paths (assets/...) inside the test HTML work.
const { chromium } = require('playwright');
const path = require('path');

const inArg = process.argv[2];
const outArg = process.argv[3] || 'test-out.png';
if (!inArg) { console.error('usage: node render-one.js <input.html> <output.png>'); process.exit(1); }

const fileUrl = 'file:///' + path.resolve(inArg).replace(/\\/g, '/');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  await page.setViewportSize({ width: 794, height: 1123 });
  await page.goto(fileUrl, { waitUntil: 'networkidle', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  const handle = await page.$('.page');
  if (handle) await handle.screenshot({ path: path.resolve(outArg) });
  const audit = await page.$$eval('.page', els => els.map((el, i) => {
    const inner = el.querySelector('.inner');
    return { page: i + 1, ph: el.clientHeight, sh: inner ? inner.scrollHeight : 0,
             over: inner ? inner.scrollHeight - inner.clientHeight : 0 };
  }));
  audit.forEach(o => console.log(`  page${o.page}: pageH=${o.ph} innerScroll=${o.sh} -> ${o.over > 1 ? 'OVERFLOW +' + o.over + 'px (TRIM CONTENT)' : 'FITS ok'}`));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
