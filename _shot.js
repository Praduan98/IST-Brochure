const { chromium } = require('playwright');
const path = require('path');
const file = process.argv[2], out = process.argv[3] || 'shot.png', w = +(process.argv[4]||900), h=+(process.argv[5]||700);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ deviceScaleFactor: 2 });
  await p.setViewportSize({ width: w, height: h });
  await p.goto('file:///' + path.resolve(file).replace(/\\/g, '/'), { waitUntil: 'networkidle', timeout: 60000 });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(400);
  await p.screenshot({ path: path.resolve(out), fullPage: true });
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
