#!/usr/bin/env node
// Writes brand surfaces to JesusWeb3/brand/ and rasterises them with headless Chrome.
//   node tools/build-brand.mjs
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { socialPreview, xHeader, avatar, flCover, flCoverMobile } from './brand.mjs';
import { locusCover } from './work-locus.mjs';
import { kworkBotCover } from './work-kwork-bot.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, '..', 'brand');
const TMP = join(OUT, '.tmp');

const SURFACES = [
  { name: 'social-preview', w: 1280, h: 640, svg: socialPreview() },
  { name: 'x-header', w: 1500, h: 500, svg: xHeader() },
  { name: 'avatar', w: 460, h: 460, svg: avatar() },
  { name: 'fl-cover', w: 1940, h: 400, svg: flCover() },
  { name: 'fl-cover-mobile', w: 900, h: 300, svg: flCoverMobile() },
  { name: 'fl-work-locus', w: 1200, h: 1200, svg: locusCover() },
  { name: 'fl-kwork-telegram-bot', w: 1320, h: 880, svg: kworkBotCover() },
];

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find((p) => existsSync(p));

mkdirSync(TMP, { recursive: true });
for (const s of SURFACES) {
  writeFileSync(join(OUT, `${s.name}.svg`), s.svg);
  writeFileSync(join(TMP, `${s.name}.html`),
    `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;padding:0;background:#07080A}svg{display:block}</style>${s.svg}`);
  if (!CHROME) continue;
  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    `--window-size=${s.w},${s.h}`,
    `--screenshot=${join(OUT, `${s.name}.png`)}`,
    `file:///${join(TMP, `${s.name}.html`).replace(/\\/g, '/')}`,
  ], { stdio: 'ignore' });
}
rmSync(TMP, { recursive: true, force: true });
console.log(`${SURFACES.length} surfaces → ${OUT}${CHROME ? ' (svg + png)' : ' (svg only — no Chrome found)'}`);
