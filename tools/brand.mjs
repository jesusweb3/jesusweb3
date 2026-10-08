// Off-README brand surfaces: social preview card, X header, avatar.
// Static by design — these are exported to PNG.
import { T, r2, mono, sans, svg, vertex, wordmarkPaths } from './lib.mjs';

const field = (cx, cy, r1, r2s, seed = []) => seed.map(([a, r]) => {
  const rad = (a * Math.PI) / 180;
  return [r2(cx + r * Math.cos(rad)), r2(cy + r * Math.sin(rad))];
});

function cluster(cx, cy, u, { ringA, ringB, sats, glowId = 'soft' } = {}) {
  const arm = { top: [cx, cy - 5 * u], left: [cx - 5 * u, cy], right: [cx + 5 * u, cy], bottom: [cx, cy + 8 * u] };
  const S = field(cx, cy, ringA, ringB, sats);
  const edges = [[S[0], arm.left], [S[1], arm.top], [S[2], arm.right], [S[3], arm.right], [S[4], arm.left], [S[5], arm.bottom], [S[2], S[3]], [S[4], S[5]], [S[0], S[1]]];
  const ticks = [45, 135, 225, 315].map((a) => {
    const rad = (a * Math.PI) / 180;
    return `M${r2(cx + (ringA - 6) * Math.cos(rad))} ${r2(cy + (ringA - 6) * Math.sin(rad))}L${r2(cx + (ringA + 7) * Math.cos(rad))} ${r2(cy + (ringA + 7) * Math.sin(rad))}`;
  }).join('');
  return `
<circle cx="${cx}" cy="${cy}" r="${ringA}" stroke="${T.line2}" stroke-width="1.2"/>
<circle cx="${cx}" cy="${cy}" r="${ringB}" stroke="${T.text2}" stroke-opacity=".4" stroke-width="1.4" stroke-linecap="round" stroke-dasharray="0 7"/>
<path d="${ticks}" stroke="${T.text2}" stroke-opacity=".55"/>
<path d="${edges.map(([a, b]) => `M${a[0]} ${a[1]}L${b[0]} ${b[1]}`).join('')}" stroke="#FFFFFF" stroke-opacity=".08"/>
${S.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i === 2 || i === 5 ? 3.6 : 2.8}" fill="${i === 2 ? T.violet : i === 5 ? T.blue : T.text2}"/>`).join('')}
<circle cx="${cx}" cy="${cy}" r="${r2(u * 2.2)}" fill="${T.violet}" opacity=".5" filter="url(#${glowId})"/>
${vertex(cx, cy, u, { core: 'url(#core)', nodes: true })}`;
}

const SATS = [[-150, 1], [-62, 1.28], [-8, 1], [52, 1.16], [150, 1], [104, 1.33]];
const scaled = (ring) => SATS.map(([a, k]) => [a, r2(ring * k)]);

const common = (cx, cy, glowR) => `
<radialGradient id="glow" cx="${cx}" cy="${cy}" r="${glowR}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${T.violet}" stop-opacity=".18"/><stop offset=".5" stop-color="${T.violet}" stop-opacity=".05"/><stop offset="1" stop-color="${T.violet}" stop-opacity="0"/></radialGradient>
<pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#FFFFFF" fill-opacity=".1"/></pattern>
<radialGradient id="dotsFade" cx="${cx}" cy="${cy}" r="${glowR * 1.35}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#000000"/></radialGradient>
<linearGradient id="core" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${T.violet}"/><stop offset="1" stop-color="${T.blue}"/></linearGradient>
<filter id="soft" x="-2" y="-2" width="5" height="5"><feGaussianBlur stdDeviation="16"/></filter>`;

const DOT = `<tspan fill="${T.violet}"> · </tspan>`;

/* GitHub social preview / link card — 1280×640 */
export function socialPreview() {
  const W = 1280, H = 640, CX = 1030, CY = 300, U = 12;
  const wm = wordmarkPaths('wmClip', T.text);
  const s = 1.5;
  const defs = `${common(CX, CY, 300)}
<mask id="dotsMask" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="url(#dotsFade)"/></mask>
${wm.clip}
`;
  const body = `
<rect width="${W}" height="${H}" fill="${T.bg0}"/>
<rect width="${W}" height="${H}" fill="url(#glow)"/>
<rect width="${W}" height="${H}" fill="url(#dots)" mask="url(#dotsMask)"/>
${vertex(104, 104, 2.6, { stroke: T.text2, sw: 1.6 })}
${mono('JW3 — INDEPENDENT RESEARCH LAB', 138, 110, { size: 16, track: 3, fill: T.text2 })}
<g transform="translate(96 248) scale(${s})">${wm.body}</g>
${mono('AI · QUANT · CRYPTO SYSTEMS', 98, 386, { size: 21, track: 6, fill: T.text, html: `AI${DOT}QUANT${DOT}CRYPTO SYSTEMS` })}
${mono('building systems that research, trade and operate on their own', 98, 434, { size: 17, fill: T.text, opacity: 0.66 })}
${cluster(CX, CY, U, { ringA: 100, ringB: 160, sats: scaled(160) })}
<path d="M96 560H1184" stroke="${T.line}"/>
${mono('github.com/jesusweb3', 96, 600, { size: 16, track: 1.4, fill: T.text2 })}
${mono('AI SYSTEMS · QUANT · TRADING INFRASTRUCTURE · WEB3', 1184, 600, { size: 14, track: 2, fill: T.text2, anchor: 'end' })}`;
  return svg({ w: W, h: H, defs, body, title: 'JESUS WEB3', desc: 'AI · Quant · Crypto systems — jesusweb3 on GitHub' });
}

/* X / Twitter header — 1500×500. Avatar overlaps bottom-left; mobile crops to the centre ~1090px. */
export function xHeader() {
  const W = 1500, H = 500, CX = 750, CY = 250;
  const wm = wordmarkPaths('wmClip', T.text);
  const s = 1.35, wmW = wm.width * s;
  const x0 = r2(CX - wmW / 2);
  const defs = `${common(CX, 214, 430)}
<mask id="dotsMask" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="url(#dotsFade)"/></mask>
${wm.clip}
<linearGradient id="rule" gradientUnits="userSpaceOnUse" x1="250" y1="0" x2="1250" y2="0"><stop offset="0" stop-color="${T.text2}" stop-opacity="0"/><stop offset=".5" stop-color="${T.text2}" stop-opacity=".45"/><stop offset="1" stop-color="${T.text2}" stop-opacity="0"/></linearGradient>`;
  const nodes = [[352, 110], [1148, 132], [1240, 330], [300, 352], [470, 74], [1030, 404]];
  const body = `
<rect width="${W}" height="${H}" fill="${T.bg0}"/>
<rect width="${W}" height="${H}" fill="url(#glow)"/>
<rect width="${W}" height="${H}" fill="url(#dots)" mask="url(#dotsMask)"/>
<path d="${nodes.map(([x, y]) => `M${x - 9} ${y}H${x + 9}M${x} ${y - 9}V${y + 9}`).join('')}" stroke="${T.text2}" stroke-opacity=".22"/>
<rect x="250" y="154" width="1000" height="1" fill="url(#rule)"/>
${vertex(CX, 154, 3.4, { stroke: T.text2, sw: 2 })}
<g transform="translate(${x0} 202) scale(${s})">${wm.body}</g>
${mono('AI · QUANT · CRYPTO SYSTEMS', CX, 320, { size: 22, track: 7, fill: T.text, anchor: 'middle', html: `AI${DOT}QUANT${DOT}CRYPTO SYSTEMS` })}
${mono('building systems that research, trade and operate on their own', CX, 366, { size: 17, fill: T.text, anchor: 'middle', opacity: 0.6 })}
${mono('github.com/jesusweb3 · t.me/jesusweb3', CX, 420, { size: 15, track: 1.6, fill: T.text2, anchor: 'middle' })}`;
  return svg({ w: W, h: H, defs, body, title: 'JESUS WEB3', desc: 'AI · Quant · Crypto systems' });
}

const SERVICES = [
  ['01', 'AI AGENTS & LLM SYSTEMS', ['Autonomous agents, local model infra,', 'orchestration, RAG, tool use.']],
  ['02', 'TRADING SYSTEMS', ['Exchange integrations, execution,', 'realtime market data, bots.']],
  ['03', 'QUANT RESEARCH', ['Backtesting, strategy research,', 'market microstructure.']],
  ['04', 'WEB3 / AUTOMATION', ['On-chain monitoring, alerts,', 'automation and infrastructure.']],
];

/* fl.ru cover, desktop — 1940×400 */
export function flCover() {
  const W = 1940, H = 400, CX = 1010, CY = 200, U = 10;
  const wm = wordmarkPaths('wmClip', T.text);
  const s = 1.45;
  const defs = `${common(CX, CY, 420)}
<mask id="dotsMask" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="url(#dotsFade)"/></mask>
${wm.clip}`;
  const cols = SERVICES.map(([idx, title, lines], i) => {
    const x = i % 2 === 0 ? 1290 : 1630;
    const y = i < 2 ? 0 : 100;
    return `
${mono(idx, x, 160 + y, { size: 12, track: 1, fill: T.violet, weight: 600 })}
${mono(title, x + 28, 160 + y, { size: 14, track: 2, fill: T.text, weight: 600 })}
${lines.map((l, k) => sans(l, x, 186 + y + k * 21, { size: 13.5, fill: T.text2 })).join('\n')}`;
  }).join('');
  const body = `
<rect width="${W}" height="${H}" fill="${T.bg0}"/>
<rect width="${W}" height="${H}" fill="url(#glow)"/>
<rect width="${W}" height="${H}" fill="url(#dots)" mask="url(#dotsMask)"/>
${vertex(104, 112, 2.6, { stroke: T.text2, sw: 1.6 })}
${mono('JW3 — INDEPENDENT ENGINEERING LAB', 138, 118, { size: 14, track: 2.6, fill: T.text2 })}
<g transform="translate(96 150) scale(${s})">${wm.body}</g>
${mono('AI · QUANT · CRYPTO SYSTEMS', 98, 262, { size: 19, track: 5.4, fill: T.text, html: `AI${DOT}QUANT${DOT}CRYPTO SYSTEMS` })}
${mono('building systems that research, trade and operate on their own', 98, 300, { size: 15, fill: T.text, opacity: 0.62 })}
<path d="M96 332H750" stroke="${T.line}"/>
<circle cx="104" cy="358" r="4" fill="${T.violet}"/>
${mono('OPEN FOR NEW PROJECTS', 120, 363, { size: 13, track: 2.4, fill: T.text, weight: 600 })}
<path d="M820 100V300" stroke="${T.line2}"/>
${cluster(CX, CY, U, { ringA: 82, ringB: 132, sats: scaled(132) })}
${cols}`;
  return svg({ w: W, h: H, defs, body, title: 'JESUS WEB3 — AI, quant and crypto systems', desc: SERVICES.map(([, t]) => t).join(' · ') });
}

/* fl.ru cover, mobile — 900×300 */
export function flCoverMobile() {
  const W = 900, H = 300, CX = 450;
  const wm = wordmarkPaths('wmClip', T.text);
  const s = 1.02, x0 = r2(CX - (wm.width * s) / 2);
  const defs = `${common(CX, 130, 330)}
<mask id="dotsMask" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="url(#dotsFade)"/></mask>
${wm.clip}
<linearGradient id="rule" gradientUnits="userSpaceOnUse" x1="180" y1="0" x2="720" y2="0"><stop offset="0" stop-color="${T.text2}" stop-opacity="0"/><stop offset=".5" stop-color="${T.text2}" stop-opacity=".45"/><stop offset="1" stop-color="${T.text2}" stop-opacity="0"/></linearGradient>`;
  const body = `
<rect width="${W}" height="${H}" fill="${T.bg0}"/>
<rect width="${W}" height="${H}" fill="url(#glow)"/>
<rect width="${W}" height="${H}" fill="url(#dots)" mask="url(#dotsMask)"/>
${mono('JW3 — INDEPENDENT ENGINEERING LAB', CX, 56, { size: 11.5, track: 2.4, fill: T.text2, anchor: 'middle' })}
<g transform="translate(${x0} 88) scale(${s})">${wm.body}</g>
${mono('AI · QUANT · CRYPTO SYSTEMS', CX, 180, { size: 14.5, track: 4.4, fill: T.text, anchor: 'middle', html: `AI${DOT}QUANT${DOT}CRYPTO SYSTEMS` })}
${mono('AI AGENTS · TRADING SYSTEMS · QUANT RESEARCH · WEB3 AUTOMATION', CX, 214, { size: 12.5, track: 1, fill: T.text2, anchor: 'middle' })}
<rect x="180" y="243" width="540" height="1" fill="url(#rule)"/>
<circle cx="346" cy="272" r="3.6" fill="${T.violet}"/>
${mono('OPEN FOR NEW PROJECTS', 362, 277, { size: 12, track: 2.2, fill: T.text, weight: 600 })}`;
  return svg({ w: W, h: H, defs, body, title: 'JESUS WEB3 — AI, quant and crypto systems', desc: 'AI agents · Trading systems · Quant research · Web3 automation' });
}

/* Avatar — 460×460, safe inside the circular crop. */
export function avatar() {
  const W = 460, CX = 230, CY = 191, U = 26;
  const defs = `${common(CX, 230, 240)}
<mask id="dotsMask" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${W}"><rect width="${W}" height="${W}" fill="url(#dotsFade)"/></mask>`;
  const body = `
<rect width="${W}" height="${W}" fill="${T.bg0}"/>
<rect width="${W}" height="${W}" fill="url(#glow)"/>
<rect width="${W}" height="${W}" fill="url(#dots)" mask="url(#dotsMask)"/>
<circle cx="${CX}" cy="230" r="186" stroke="${T.line2}" stroke-width="1.4"/>
<circle cx="${CX}" cy="230" r="150" stroke="${T.text2}" stroke-opacity=".35" stroke-width="1.6" stroke-linecap="round" stroke-dasharray="0 9"/>
<circle cx="${CX}" cy="${CY}" r="58" fill="${T.violet}" opacity=".5" filter="url(#soft)"/>
${vertex(CX, CY, U, { core: 'url(#core)', nodes: true, sw: 7 })}`;
  return svg({ w: W, h: W, defs, body, title: 'The Vertex', desc: 'Jesus Web3 mark' });
}
