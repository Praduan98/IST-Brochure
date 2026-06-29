// Render the brochure to per-page PNGs + a print-ready PDF using Playwright.
const { chromium } = require('playwright');
const path = require('path');

const DIR = 'C:\\Users\\pradu\\Downloads\\IST Brochure';
const fileUrl = 'file:///' + path.join(DIR, 'ist-brochure.html').replace(/\\/g, '/');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  await page.setViewportSize({ width: 794, height: 1123 });
  await page.goto(fileUrl, { waitUntil: 'networkidle', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(700);

  // Per-page PNGs
  const n = await page.$$eval('.page', els => els.length);
  console.log('pages found:', n);
  const handles = await page.$$('.page');
  for (let i = 0; i < handles.length; i++) {
    const num = String(i + 1).padStart(2, '0');
    await handles[i].screenshot({ path: path.join(DIR, `preview-page-${num}.png`) });
  }

  // Overflow audit: does any .inner content exceed the page box?
  const overflow = await page.$$eval('.page', els => els.map((el, i) => {
    const inner = el.querySelector('.inner');
    return { page: i + 1, ph: el.clientHeight, sh: inner ? inner.scrollHeight : 0, over: inner ? inner.scrollHeight - inner.clientHeight : 0 };
  }));
  console.log('OVERFLOW AUDIT:');
  overflow.forEach(o => console.log(`  p${o.page}: innerScroll=${o.sh} clip=${o.over > 1 ? 'OVERFLOW +' + o.over : 'ok'}`));

  // Print PDF
  await page.pdf({
    path: path.join(DIR, 'InsightsTap-Brochure.pdf'),
    format: 'A4', printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  console.log('PDF written.');
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
