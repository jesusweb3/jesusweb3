// "What I build" cards — 420×216, one living motif each. Motion is SMIL.
import { T, r2, mono, sans, dia, panel, svg, smil, smilT, at, EASE } from './lib.mjs';

const OX = 304, OY = 26; // motif box: 88×52

function motifAI() {
  const c = [OX + 44, OY + 26];
  const sats = [[OX + 6, OY + 5], [OX + 82, OY + 5], [OX + 82, OY + 47], [OX + 6, OY + 47]];
  const edges = sats.map(([x, y]) => {
    const dx = x - c[0], dy = y - c[1], l = Math.hypot(dx, dy);
    return `M${r2(c[0] + (dx / l) * 12)} ${r2(c[1] + (dy / l) * 12)}L${r2(x - (dx / l) * 4)} ${r2(y - (dy / l) * 4)}`;
  }).join('');
  return {
    defs: '',
    body: `
<path d="${edges}" stroke="${T.line2}"/>
${sats.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="${T.bg1}" stroke="${T.text2}" stroke-width="1.2"/>`).join('')}
${sats.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="3.4" fill="${T.violet}" opacity="0">${smil('opacity', '0;1;0;0', { keyTimes: '0;.12;.25;1', dur: '6s', begin: `${i * 1.5}s` })}</circle>`).join('')}
<path d="${dia(c[0], c[1], 9)}" stroke="${T.violet}" stroke-opacity=".4"/>
<path d="${dia(c[0], c[1], 4.5)}" fill="${T.violet}"/>`,
  };
}

function motifQuant() {
  const ys = [42, 37, 39, 31, 34, 26, 29, 21, 24, 15, 18, 8];
  const pts = ys.map((y, i) => [OX + i * 8, OY + y]);
  const d = 'M' + pts.map((p) => p.join(' ')).join('L');
  let len = 0;
  for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  const L = Math.ceil(len) + 2;
  const [ex, ey] = pts[pts.length - 1];
  const DUR = '9s';
  return {
    defs: `<linearGradient id="qa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${T.violet}" stop-opacity=".24"/><stop offset="1" stop-color="${T.violet}" stop-opacity="0"/></linearGradient>`,
    body: `
<path d="M${OX} ${OY + 36.5}H${OX + 88}" stroke="${T.line2}" stroke-dasharray="2 4"/>
<path d="${d}L${ex} ${OY + 52}L${OX} ${OY + 52}Z" fill="url(#qa)">${smil('opacity', '0;0;1;1;0', { keyTimes: '0;.25;.55;.88;1', dur: DUR })}</path>
<path d="${d}" stroke="${T.violet}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="${L} ${L}">
${smil('stroke-dashoffset', `${L};0;0;0`, { keyTimes: '0;.45;.88;1', dur: DUR, calcMode: 'spline', splines: `${EASE};0 0 1 1;0 0 1 1` })}
${smil('opacity', '1;1;0', { keyTimes: '0;.88;1', dur: DUR })}
</path>
<circle cx="${ex}" cy="${ey}" r="2.8" fill="${T.violet}">${smil('opacity', '0;0;1;1;0', { keyTimes: '0;.42;.48;.88;1', dur: DUR })}</circle>`,
  };
}

function motifTrading() {
  const bids = [40, 31, 24, 17, 11], asks = [12, 18, 26, 33, 44];
  const base = OY + 52;
  const bars = [
    ...bids.map((h, i) => ({ x: OX + i * 8.5, h, fill: T.violet, op: [0.35, 0.5, 0.65, 0.8, 0.95][i] })),
    ...asks.map((h, i) => ({ x: OX + 47 + i * 8.5, h, fill: T.text2, op: [0.95, 0.8, 0.65, 0.5, 0.35][i] })),
  ];
  // Different durations rather than negative delays: the bars drift out of phase on their own.
  const durs = [4.2, 3.6, 4.8, 3.9, 4.5, 4.1, 3.7, 4.6, 4.3, 3.8];
  return {
    defs: '',
    body: `
<path d="M${OX + 43} ${OY}V${base}" stroke="${T.line2}" stroke-dasharray="2 3"/>
<path d="M${OX} ${base + 0.5}H${OX + 86}" stroke="${T.line2}"/>
${bars.map((b, i) => at(r2(b.x), base, `<rect y="${-b.h}" width="5" height="${b.h}" rx="1" fill="${b.fill}" opacity="${b.op}">${smilT('scale', '1 1;1 .68;1 1', { keyTimes: '0;.5;1', dur: `${durs[i]}s`, calcMode: 'spline', splines: `${EASE};${EASE}` })}</rect>`)).join('')}`,
  };
}

function motifWeb3() {
  const s = 14, y = OY + 19;
  const xs = [0, 24.67, 49.33, 74].map((v) => r2(OX + v));
  const links = xs.slice(0, -1).map((x, i) => `M${r2(x + s)} ${y + 7}H${xs[i + 1]}`).join('');
  return {
    defs: '',
    body: `
<path d="${links}" stroke="${T.line2}"/>
${xs.map((x, i) => i < 3
    ? `<rect x="${r2(x + 0.6)}" y="${y + 0.6}" width="${s - 1.2}" height="${s - 1.2}" rx="3" fill="${T.bg1}" stroke="${T.text2}" stroke-width="1.2"/><rect x="${r2(x + 5)}" y="${y + 5}" width="4" height="4" rx="1" fill="${T.text2}" opacity=".6"/>`
    : `<rect x="${x}" y="${y}" width="${s}" height="${s}" rx="3" fill="${T.violet}"/><rect x="${r2(x + 5)}" y="${y + 5}" width="4" height="4" rx="1" fill="${T.bg1}"/>`).join('')}
${at(r2(xs[0] + 7), y + 7, `<circle r="2.6" fill="${T.haze}" opacity="0">
${smilT('translate', '0 0;74 0;74 0', { keyTimes: '0;.75;1', dur: '6s', calcMode: 'spline', splines: `${EASE};0 0 1 1` })}
${smil('opacity', '0;1;1;0;0', { keyTimes: '0;.1;.75;.85;1', dur: '6s' })}
</circle>`)}`,
  };
}

const MOTIF = { ai: motifAI, quant: motifQuant, trading: motifTrading, web3: motifWeb3 };

export const BUILD = [
  { key: 'ai', idx: '01', title: 'AI SYSTEMS', lines: ['Agents, local LLM infrastructure,', 'orchestration, RAG, autonomous workflows.'] },
  { key: 'quant', idx: '02', title: 'QUANT', lines: ['Research pipelines, backtesting, market', 'microstructure, systematic trading.'] },
  { key: 'trading', idx: '03', title: 'TRADING INFRASTRUCTURE', lines: ['Market data, execution systems, exchange', 'integrations, realtime pipelines.'] },
  { key: 'web3', idx: '04', title: 'WEB3 / AUTOMATION', lines: ['Blockchain systems, bots, automation,', 'monitoring, infrastructure.'] },
];

export function buildCard(c) {
  const W = 420, H = 216;
  const m = MOTIF[c.key]();
  const body = `
${panel(W, H)}
${mono(c.idx, 28, 45, { size: 12, track: 1, fill: T.violet, weight: 600 })}
<path d="M52 41.5H76" stroke="${T.line2}"/>
${m.body}
${sans(c.title, 28, 133, { size: 21, weight: 600, track: 0.8, fill: T.text })}
${c.lines.map((l, i) => sans(l, 28, 165 + i * 23, { size: 15, fill: T.text2 })).join('\n')}`;
  return svg({ w: W, h: H, defs: m.defs, body, title: c.title, desc: c.lines.join(' ') });
}
