// fl.ru portfolio cover for LOCUS — 1200×1200 (1:1), static.
import { T, r2, mono, sans, dia, svg, vertex, wordmark, monoW, WM_STROKE, WM_CAP } from './lib.mjs';

const box = (x, y, w, h, label, { accent = false, sub } = {}) => `
<rect x="${x + 0.5}" y="${y + 0.5}" width="${w - 1}" height="${h - 1}" rx="11" fill="${accent ? T.bg2 : T.bg1}" stroke="${accent ? T.violet : T.line2}" stroke-opacity="${accent ? 0.5 : 1}"/>
${mono(label, x + w / 2, y + (sub ? h / 2 - 4 : h / 2 + 5), { size: 15, track: 1.6, fill: T.text, weight: 600, anchor: 'middle' })}
${sub ? mono(sub, x + w / 2, y + h / 2 + 18, { size: 12, track: 1.2, fill: T.text2, anchor: 'middle' }) : ''}`;

const link = (x1, y1, x2, y2) =>
  `<path d="M${x1} ${y1}H${r2((x1 + x2) / 2)}V${y2}H${x2}" stroke="${T.line2}" stroke-width="1.4"/><path d="${dia(r2((x1 + x2) / 2), r2((y1 + y2) / 2), 3.4)}" fill="${T.violet}"/>`;

export function locusCover() {
  const W = 1200, H = 1200;
  const wm = wordmark('LOCUS');
  const s = 2.95;
  const CX = 600;

  const caps = [
    ['24/7 EXECUTION', 'strategy runtimes that keep running'],
    ['KEY CUSTODY & ROLES', 'invite-only access, audited actions'],
    ['TREND RESEARCH', 'screener with its own data plane'],
  ];

  const defs = `
<radialGradient id="glow" cx="${CX}" cy="300" r="620" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${T.violet}" stop-opacity=".16"/><stop offset=".55" stop-color="${T.violet}" stop-opacity=".04"/><stop offset="1" stop-color="${T.violet}" stop-opacity="0"/></radialGradient>
<pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#FFFFFF" fill-opacity=".09"/></pattern>
<radialGradient id="dotsFade" cx="${CX}" cy="340" r="760" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#000000"/></radialGradient>
<mask id="dotsMask" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="url(#dotsFade)"/></mask>
<clipPath id="wmClip"><rect x="-6" y="${-WM_STROKE / 2}" width="${wm.width + 12}" height="${WM_CAP + WM_STROKE}"/></clipPath>
<linearGradient id="accent" gradientUnits="userSpaceOnUse" x1="88" y1="0" x2="520" y2="0"><stop offset="0" stop-color="${T.violet}"/><stop offset="1" stop-color="${T.violet}" stop-opacity="0"/></linearGradient>`;

  const body = `
<rect width="${W}" height="${H}" fill="${T.bg0}"/>
<rect width="${W}" height="${H}" fill="url(#glow)"/>
<rect width="${W}" height="${H}" fill="url(#dots)" mask="url(#dotsMask)"/>

${vertex(96, 110, 3.2, { stroke: T.text2, sw: 2 })}
${mono('JW3 — SELECTED SYSTEM', 128, 117, { size: 17, track: 3, fill: T.text2 })}
${mono('01', 1112, 117, { size: 17, track: 1, fill: T.violet, weight: 600, anchor: 'end' })}

<g transform="translate(88 208) scale(${s})"><g clip-path="url(#wmClip)"><path d="${wm.d}" stroke="${T.text}" stroke-width="${WM_STROKE}" stroke-linecap="square" stroke-linejoin="miter"/></g></g>
${mono('INVITE-ONLY TRADING PLATFORM', 90, 420, { size: 24, track: 5.6, fill: T.violet })}
${sans('One system for research, execution and 24/7 operations.', 90, 466, { size: 21, fill: T.text2 })}

<path d="M88 520H1112" stroke="${T.line}"/>
${mono('ARCHITECTURE', 88, 566, { size: 13, track: 2.4, fill: T.text2 })}

${box(88, 596, 190, 64, 'WEB CLIENT', { sub: 'React · Vite' })}
${box(358, 596, 190, 64, 'API', { sub: 'NestJS · Zod', accent: true })}
${box(628, 596, 190, 64, 'EXECUTOR', { sub: 'private WS' })}
${box(898, 596, 214, 64, 'EXCHANGES', { sub: 'market + orders' })}
<path d="M278 628H358M548 628H628M818 628H898" stroke="${T.line2}" stroke-width="1.4"/>
${[318, 588, 858].map((x) => `<path d="${dia(x, 628, 3.4)}" fill="${T.violet}"/>`).join('')}

${box(358, 740, 190, 64, 'SCREENER', { sub: 'own data plane' })}
${box(628, 740, 190, 64, 'DATA', { sub: 'PostgreSQL · Redis' })}
${link(453, 660, 453, 740)}
${link(723, 660, 723, 740)}

<path d="M88 872H1112" stroke="${T.line}"/>
${caps.map(([label, desc], i) => {
    const x = 88 + i * 345;
    return `<path d="${dia(x + 5, 916, 5)}" fill="${T.violet}"/>
${mono(label, x + 22, 922, { size: 15, track: 1.8, fill: T.text, weight: 600 })}
${sans(desc, x + 22, 950, { size: 15, fill: T.text2 })}`;
  }).join('')}

<path d="M88 1034H1112" stroke="${T.line}"/>
${mono('TYPESCRIPT · NESTJS · REACT · POSTGRESQL · REDIS · SOCKET.IO · DOCKER', 88, 1090, { size: 14, track: 1, fill: T.text2 })}
${vertex(986, 1084, 2.4, { stroke: T.text2, sw: 1.5 })}
${mono('JESUS WEB3', 1112, 1090, { size: 14, track: 2, fill: T.text2, anchor: 'end' })}`;

  return svg({
    w: W, h: H, defs, body,
    title: 'LOCUS — invite-only trading platform',
    desc: 'One system for research, execution and 24/7 operations. TypeScript, NestJS, React, PostgreSQL, Redis, Socket.IO, Docker.',
  });
}
