import { chromium } from 'playwright';

const viewports = [
  { name: 'desktop', width: 1440, height: 960 },
  { name: 'mobile', width: 390, height: 844 },
];

const browser = await chromium.launch();

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: viewport.name === 'mobile' ? 2 : 1 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForSelector('#webgl-stage canvas');
  await page.waitForTimeout(900);

  const sample = await page.evaluate(() => {
    const canvas = document.querySelector('#webgl-stage canvas');
    const probe = document.createElement('canvas');
    probe.width = 48;
    probe.height = 48;
    const ctx = probe.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(canvas, 0, 0, probe.width, probe.height);
    const data = ctx.getImageData(0, 0, probe.width, probe.height).data;
    let luminous = 0;
    let varied = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (r + g + b > 38) luminous += 1;
      if (Math.max(r, g, b) - Math.min(r, g, b) > 8) varied += 1;
    }
    return { luminous, varied, width: canvas.width, height: canvas.height };
  });

  if (sample.luminous < 80 || sample.varied < 30) {
    throw new Error(`${viewport.name} canvas looks blank: ${JSON.stringify(sample)}`);
  }

  await page.screenshot({ path: `artifacts/${viewport.name}.png`, fullPage: true });
  console.log(`${viewport.name}: ${JSON.stringify(sample)}`);
  await page.close();
}

await browser.close();
