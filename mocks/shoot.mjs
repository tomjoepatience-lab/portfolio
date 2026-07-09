// Renders each self-contained mock HTML to a high-res PNG (1440x900 @2x).
// Playwright is not a project dependency; import it from the npx cache.
import { chromium } from 'file:///C:/Users/tomjo/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'assets', 'shots');
mkdirSync(outDir, { recursive: true });

const pages = [
  'welcomy-analytics',
  'welcomy-reception',
  'welcomy-seatmap',
  'nurture-ai-report',
  'nurture-gap',
  'nurture-monthly',
];

// optional CLI filter: node shoot.mjs welcomy-analytics
const only = process.argv.slice(2);
const list = only.length ? pages.filter(p => only.includes(p)) : pages;

const browser = await chromium.launch({ channel: 'chrome' });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await context.newPage();

for (const name of list) {
  const htmlPath = join(__dirname, `${name}.html`);
  if (!existsSync(htmlPath)) { console.log(`skip (missing): ${name}`); continue; }
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load' });
  await page.waitForTimeout(350); // let fonts/layout settle
  const out = join(outDir, `${name}.png`);
  await page.screenshot({ path: out, fullPage: false, clip: { x: 0, y: 0, width: 1440, height: 900 } });
  console.log(`shot: ${out}`);
}

await browser.close();
console.log('done');
