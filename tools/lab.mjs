// Project cards, research + stack modules, connect buttons.
import { T, r2, mono, sans, dia, panel, svg, monoW, smil, smilT, at, EASE } from './lib.mjs';

const STATUS = {
  ACTIVE: { color: T.violet, text: T.violet, icon: 'pulse' },
  RESEARCH: { color: T.blue, text: T.blue, icon: 'ring' },
  EXPERIMENTAL: { color: T.violet, text: T.text2, icon: 'diamond' },
  INTERNAL: { color: T.violet, text: T.text2, icon: 'diamond' },
  PRIVATE: { color: T.text2, text: T.text2, icon: 'square' },
  'OPEN SOURCE': { color: T.text, text: T.text, icon: 'square' },
};

export const PROJECTS = [
  {
    file: 'project-01', name: 'LOCUS', category: 'TRADING PLATFORM', status: 'ACTIVE',
    lines: ['Invite-only trading platform: API, 24/7', 'execution plane, strategy runtimes and a', 'trend-channel research screener.'],
    stack: ['TYPESCRIPT', 'NESTJS', 'POSTGRES', 'REALTIME'],
  },
  {
    file: 'project-02', name: 'STRATLAB', category: 'QUANT', status: 'RESEARCH',
    lines: ['Web platform for systematic strategy', 'research and backtesting: data, runs,', 'metrics and result analysis.'],
    stack: ['TYPESCRIPT', 'BACKTESTING', 'MARKET DATA'],
  },
  {
    file: 'project-03', name: 'BASIS ENGINE', category: 'TRADING INFRA', status: 'RESEARCH',
    lines: ['Cross-venue perp basis research across', 'Lighter, Nado and Hyperliquid —', 'execution disabled by design.'],
    stack: ['TYPESCRIPT', 'PERP BASIS', 'EXCHANGE APIS'],
  },
  {
    file: 'project-04', name: 'AGENT PLATFORM', category: 'AI SYSTEMS', status: 'INTERNAL',
    lines: ['Control plane for Telegram AI agents:', 'sources, LLM replies, hard limits,', 'audit log and emergency stop.'],
    stack: ['PYTHON', 'OPENROUTER', 'LLM AGENTS'],
  },
];
export function projectCard(p) {
  const W = 420, H = 264;
  const st = STATUS[p.status];
  const tw = monoW(p.status, 10.5, 1.4);
  const pw = r2(tw + 42), px = r2(392 - pw), py = 25, ph = 26;
  const ix = r2(px + 16), iy = py + 13;

  let icon = '';
  if (st.icon === 'pulse') {
    icon = `<circle cx="${ix}" cy="${iy}" r="3.2" fill="${st.color}"/>${at(ix, iy, `<circle r="3.2" stroke="${st.color}" stroke-width="1.2" vector-effect="non-scaling-stroke" opacity="0">
${smilT('scale', '1;3.2;3.2', { keyTimes: '0;.8;1', dur: '3s', calcMode: 'spline', splines: '.2 .6 .4 1;0 0 1 1' })}
${smil('opacity', '.8;0;0', { keyTimes: '0;.8;1', dur: '3s' })}
</circle>`)}`;
  } else if (st.icon === 'ring') {
    icon = `<circle cx="${ix}" cy="${iy}" r="3.6" stroke="${st.color}" stroke-width="1.4"/><circle cx="${ix}" cy="${iy}" r="1.3" fill="${st.color}">${smil('opacity', '1;.25;1', { keyTimes: '0;.5;1', dur: '2.4s', calcMode: 'spline', splines: `${EASE};${EASE}` })}</circle>`;
  } else if (st.icon === 'diamond') {
    icon = `<path d="${dia(ix, iy, 4)}" stroke="${st.color}" stroke-width="1.3">${smil('opacity', '1;.35;1;.35;1', { keyTimes: '0;.62;.66;.7;.74', dur: '5s', calcMode: 'discrete' })}</path>`;
  } else {
    icon = `<rect x="${r2(ix - 3)}" y="${iy - 3}" width="6" height="6" rx="1" stroke="${st.color}" stroke-width="1.3"/>`;
  }

  let cx = 28;
  const chips = p.stack.map((t) => {
    const w = r2(monoW(t, 10.5, 1) + 20);
    const out = `<rect x="${r2(cx + 0.5)}" y="220.5" width="${r2(w - 1)}" height="23" rx="6" fill="${T.bg2}" stroke="${T.line2}"/>${mono(t, cx + 10, 235.8, { size: 10.5, track: 1, fill: T.text2 })}`;
    cx += w + 8;
    return out;
  }).join('\n');

  const defs = `<linearGradient id="acc" gradientUnits="userSpaceOnUse" x1="28" y1="0" x2="220" y2="0"><stop offset="0" stop-color="${T.violet}"/><stop offset="1" stop-color="${T.violet}" stop-opacity="0"/></linearGradient>`;
  const body = `
${panel(W, H)}
<path d="M28 0.5H220" stroke="url(#acc)"/>
${mono(p.file.slice(-2), 28, 42, { size: 11, track: 1, fill: T.violet, weight: 600 })}
${mono(p.category, 54, 42, { size: 11, track: 1.6, fill: T.text2 })}
<rect x="${r2(px + 0.5)}" y="${py + 0.5}" width="${r2(pw - 1)}" height="${ph - 1}" rx="12.5" fill="${T.bg2}" stroke="${st.color}" stroke-opacity=".3"/>
${icon}
${mono(p.status, px + 28, py + 16.7, { size: 10.5, track: 1.4, fill: st.text, weight: 600 })}
${sans(p.name, 28, 100, { size: p.name.length > 9 ? 24 : 27, weight: 600, track: 2, fill: T.text })}
${p.lines.map((l, i) => sans(l, 28, 134 + i * 23, { size: 15, fill: T.text2 })).join('\n')}
<path d="M28 202.5H392" stroke="${T.line}"/>
${chips}`;

  return svg({
    w: W, h: H, defs, body,
    title: `${p.name} — ${p.category} · ${p.status}`,
    desc: `${p.lines.join(' ')} Stack: ${p.stack.join(', ')}.`,
  });
}

export const RESEARCH = [
  ['Autonomous Quant Research', 'agents · hypotheses · backtests'],
  ['Multi-Agent Systems', 'planning · tool use · supervision'],
  ['Market Microstructure', 'order flow · liquidity · impact'],
  ['Local AI Infrastructure', 'inference · retrieval · serving'],
];

export function research() {
  const W = 420, H = 308;
  const rows = RESEARCH.map(([title, sub], i) => {
    const y0 = 62 + 58 * i, base = y0 + 28;
    const bars = [5, 9, 13].map((h, j) =>
      `<rect x="${370 + j * 7}" y="${base - h}" width="3" height="${h}" rx=".5" fill="${T.violet}">${smil('opacity', '.25;1;.25;.25', { keyTimes: '0;.3;.6;1', dur: '2.8s', begin: `${r2(i * 0.6 + j * 0.25)}s`, calcMode: 'spline', splines: `${EASE};${EASE};0 0 1 1` })}</rect>`).join('');
    const sep = i < RESEARCH.length - 1 ? `<path d="M28 ${y0 + 58.5}H392" stroke="${T.line}"/>` : '';
    return `
${mono(`0${i + 1}`, 28, base, { size: 12, track: 1, fill: T.violet, weight: 600 })}
${sans(title, 60, base, { size: 16, weight: 500, fill: T.text })}
${mono(sub, 60, y0 + 46, { size: 11, track: 0.4, fill: T.text2, html: sub.replace(/·/g, `<tspan fill="${T.violet}">·</tspan>`) })}
${bars}${sep}`;
  }).join('');
  const body = `
${panel(W, H)}
${mono('CURRENT RESEARCH', 28, 42, { size: 11.5, track: 1.8, fill: T.text, weight: 600 })}
${mono('04 THREADS', 392, 42, { size: 10.5, track: 1.5, fill: T.text2, anchor: 'end' })}
<path d="M28 62.5H392" stroke="${T.line}"/>
${rows}`;
  return svg({
    w: W, h: H, body,
    title: 'Current research',
    desc: RESEARCH.map(([t], i) => `0${i + 1} ${t}`).join('; '),
  });
}

export const STACK = [
  ['LANG', ['Python', 'TypeScript']],
  ['MODELS', ['PyTorch', 'LLMs', 'Local Models']],
  ['PROVIDERS', ['Claude', 'OpenAI']],
  ['BACKEND', ['FastAPI', 'WebSocket']],
  ['DATA', ['PostgreSQL', 'Redis']],
  ['INFRA', ['Docker', 'Linux']],
  ['MARKETS', ['Crypto Exchanges', 'Web3']],
];

export function stack() {
  const W = 420, H = 308, RH = 33;
  const steps = STACK.map((_, k) => `0 ${k * RH}`).join(';');
  const stepTimes = STACK.map((_, k) => r2(k / STACK.length)).join(';');
  const rows = STACK.map(([label, items], i) => {
    const y0 = 62 + RH * i;
    const html = items.map((t) => t.replace(/&/g, '&amp;')).join(`<tspan fill="${T.violet}"> · </tspan>`);
    return `${mono(label, 28, y0 + 21.5, { size: 10.5, track: 1.2, fill: T.text2 })}
${sans(items.join(' · '), 126, y0 + 22, { size: 14.5, fill: T.text, html })}`;
  }).join('\n');
  const body = `
${panel(W, H)}
${mono('STACK', 28, 42, { size: 11.5, track: 1.8, fill: T.text, weight: 600 })}
${mono('SECONDARY TO SYSTEMS', 392, 42, { size: 10.5, track: 1.5, fill: T.text2, anchor: 'end' })}
<path d="M28 62.5H392" stroke="${T.line}"/>
<rect x="112" y="73" width="2" height="14" fill="${T.violet}">${smilT('translate', steps, { keyTimes: stepTimes, dur: '14s', calcMode: 'discrete' })}</rect>
${rows}`;
  return svg({
    w: W, h: H, body,
    title: 'Stack',
    desc: STACK.map(([l, it]) => `${l}: ${it.join(', ')}`).join('; '),
  });
}

const ICON = {
  twitter: `<path fill="${T.text}" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>`,
  telegram: `<path d="M21.5 3 2.5 10.8l6.1 2.6 1.8 6.4 3-3.6 5 3.8z" stroke="${T.text}" stroke-width="1.8" stroke-linejoin="round"/><path d="M8.6 13.4 21.5 3l-10.3 11.9-.8 4.9" stroke="${T.text}" stroke-width="1.8" stroke-linejoin="round"/>`,
  github: `<path fill="${T.text}" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>`,
};

export const BUTTONS = [
  { file: 'button-twitter', icon: 'twitter', label: 'X / TWITTER', delay: 0 },
  { file: 'button-telegram', icon: 'telegram', label: 'TELEGRAM', delay: 1.2 },
  { file: 'button-github', icon: 'github', label: 'GITHUB', delay: 2.4 },
];

export function button(b) {
  const W = 260, H = 60;
  const defs = `<linearGradient id="sg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${T.violet}" stop-opacity="0"/><stop offset=".5" stop-color="${T.violet}"/><stop offset="1" stop-color="${T.violet}" stop-opacity="0"/></linearGradient>`;
  const body = `
${panel(W, H, { rx: 12, stroke: T.line2 })}
<g transform="translate(22 20) scale(.8333)">${ICON[b.icon]}</g>
<path d="M56.5 20V40" stroke="${T.line2}"/>
${mono(b.label, 70, 34.3, { size: 12, track: 1.8, fill: T.text, weight: 600 })}
<path d="M224 36L234 26M227 26H234V33" stroke="${T.text2}" stroke-width="1.5" stroke-linecap="square"/>
<rect x="14" y="58.5" width="64" height="1" fill="url(#sg)" opacity="0">
${smilT('translate', '0 0;168 0;168 0', { keyTimes: '0;.55;1', dur: '7s', begin: `${b.delay}s`, calcMode: 'spline', splines: `${EASE};0 0 1 1` })}
${smil('opacity', '0;1;1;0;0', { keyTimes: '0;.15;.55;.65;1', dur: '7s', begin: `${b.delay}s` })}
</rect>`;
  return svg({ w: W, h: H, defs, body, title: b.label, desc: `Jesus Web3 on ${b.label}` });
}
