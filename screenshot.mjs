import pkg from './node_modules/playwright/index.js';
const { chromium } = pkg;
import path from 'path';
import fs from 'fs';

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

const dir = './temporary screenshots';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const existing = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
const nums = existing.map(f => parseInt(f.match(/^screenshot-(\d+)/)?.[1] || '0'));
const n = (nums.length ? Math.max(...nums) : 0) + 1;
const filename = path.join(dir, `screenshot-${n}${label ? '-' + label : ''}.png`);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
await page.waitForTimeout(1500);
await page.screenshot({ path: filename, fullPage: true });
await browser.close();
console.log(filename);
