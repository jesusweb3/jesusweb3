#!/usr/bin/env node
// Generates assets/*.svg from one design system.
//   node tools/build-assets.mjs                 → production assets
//   node tools/build-assets.mjs --static <dir>  → also animation-free copies + identity sheets
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { T, r2, mono, panel, svg, vertex, wordmarkPaths } from './lib.mjs';
import { hero, status, divider, section } from './top.mjs';
import { BUILD, buildCard } from './build.mjs';
import { PROJECTS, projectCard, research, stack, BUTTONS, button } from './lab.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, '..', 'assets');
const si = process.argv.indexOf('--static');
const STATIC = si > -1 ? resolve(process.argv[si + 1]) : null;

const files = {
  hero: hero(),
  status: status(),
  divider: divider(),
  'section-build': section('01', 'WHAT I BUILD', 'CORE AREAS'),
  'section-systems': section('02', 'SELECTED SYSTEMS', 'INDEX · 04'),
  'section-lab': section('03', 'RESEARCH LAB', 'CURRENT THREADS'),
  'section-connect': section('04', 'CONNECT', 'OPEN CHANNELS'),
  research: research(),
  stack: stack(),
};
for (const c of BUILD) files[`build-${c.key}`] = buildCard(c);
for (const p of PROJECTS) files[p.file] = projectCard(p);
for (const b of BUTTONS) files[b.file] = button(b);

mkdirSync(OUT, { recursive: true });
for (const [name, content] of Object.entries(files)) writeFileSync(join(OUT, `${name}.svg`), content);
console.log(`wrote ${Object.keys(files).length} assets → ${OUT}`);

if (STATIC) {
  const strip = (s) => s.replace(/<style>[\s\S]*?<\/style>\n?/g, '').replace(/<animate(Transform)?\b[^>]*\/>/g, '');
  mkdirSync(STATIC, { recursive: true });
  for (const [name, content] of Object.entries(files)) writeFileSync(join(STATIC, `${name}.svg`), strip(content));

  // Identity sheets (documentation only).
  const u = 20, cx = 240, cy = 196;
  const grid = [];
  for (let x = cx % u; x <= 480; x += u) grid.push(`M${x} 0V480`);
  for (let y = cy % u; y <= 480; y += u) grid.push(`M0 ${y}H480`);
  writeFileSync(join(STATIC, 'identity-mark.svg'), svg({
    w: 480, h: 480, title: 'The Vertex', desc: 'Jesus Web3 identity mark construction',
    defs: `<filter id="soft" x="-2" y="-2" width="5" height="5"><feGaussianBlur stdDeviation="16"/></filter>`,
    body: `${panel(480, 480, { fill: T.bg0, rx: 16 })}
<path d="${grid.join('')}" stroke="#FFFFFF" stroke-opacity=".035"/>
<circle cx="${cx}" cy="${cy}" r="${2 * u}" stroke="${T.line2}" stroke-dasharray="3 4"/>
<circle cx="${cx}" cy="${cy}" r="${5 * u}" stroke="${T.line2}" stroke-dasharray="3 4"/>
<circle cx="${cx}" cy="${cy}" r="30" fill="${T.violet}" opacity=".45" filter="url(#soft)"/>
${vertex(cx, cy, u, { nodes: true, sw: 5.6 })}
${mono('1u', cx + 30, cy - 12, { size: 11, track: 1, fill: T.violet })}
${mono('2u', cx + 18, cy + 50, { size: 11, track: 1, fill: T.text2 })}
${mono('5u', cx + 106, cy - 12, { size: 11, track: 1, fill: T.text2 })}
${mono('8u', cx + 16, cy + 8 * u + 4, { size: 11, track: 1, fill: T.text2 })}`,
  }));

  const wm = wordmarkPaths('c', T.text);
  const s = 1.3, wx = r2((720 - wm.width * s) / 2);
  writeFileSync(join(STATIC, 'identity-wordmark.svg'), svg({
    w: 720, h: 160, title: 'JESUS WEB3 wordmark', desc: 'Custom stroke wordmark',
    defs: wm.clip,
    body: `${panel(720, 160, { fill: T.bg0, rx: 16 })}<g transform="translate(${wx} 50) scale(${s})">${wm.body}</g>`,
  }));
  console.log(`wrote static copies → ${STATIC}`);
}
