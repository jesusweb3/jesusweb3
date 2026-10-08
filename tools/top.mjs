// Hero, status bar, divider, section headers. All motion is SMIL (see lib.mjs).
import { T, r2, mono, dia, panel, svg, vertex, wordmarkPaths, monoW, smil, smilT, at, EASE } from './lib.mjs';

export function hero() {
  const W = 900, H = 300, CX = 772, CY = 146, U = 7.5;
  const wm = wordmarkPaths('wmClip', 'url(#sweep)');

  // Typing line: discrete clip + caret, fully visible when nothing animates.
  const TX = 76, TY = 252, SIZE = 15, CH = 9;
  const LINE = 'building systems that research, trade and operate on their own';
  const N = [...LINE].length, TL = N * CH;
  const t0 = 0.04, t1 = 0.38;
  const clipV = ['0'], caretV = [`${-TL} 0`], times = ['0'];
  for (let k = 1; k <= N; k++) {
    clipV.push(String(k * CH));
    caretV.push(`${-TL + k * CH} 0`);
    times.push((t0 + (k * (t1 - t0)) / N).toFixed(4));
  }
  clipV.push(String(TL + 24));
  const clipT = [...times, (t1 + 0.002).toFixed(4)];

  const polar = (a, r) => [r2(CX + r * Math.cos((a * Math.PI) / 180)), r2(CY + r * Math.sin((a * Math.PI) / 180))];
  const S = [polar(-150, 96), polar(-62, 124), polar(-8, 96), polar(52, 112), polar(150, 96), polar(104, 128)];
  const arm = { top: [CX, CY - 5 * U], left: [CX - 5 * U, CY], right: [CX + 5 * U, CY], bottom: [CX, CY + 8 * U] };
  const edges = [[S[0], arm.left], [S[4], arm.left], [S[1], arm.top], [S[2], arm.right], [S[3], arm.right], [S[5], arm.bottom], [S[2], S[3]], [S[4], S[5]], [S[0], S[1]]];
  const pk = [[S[2], arm.right, '8s', '1s'], [S[4], arm.left, '10s', '4s']];

  const ticks = [45, 135, 225, 315].map((a) => {
    const [x1, y1] = polar(a, 54), [x2, y2] = polar(a, 62);
    return `M${x1} ${y1}L${x2} ${y2}`;
  }).join('');

  const pulse = (begin) => at(CX, CY, `<circle r="9" stroke="${T.violet}" stroke-width="1.2" vector-effect="non-scaling-stroke" opacity="0">
${smilT('scale', '1;5.5;5.5', { keyTimes: '0;.75;1', dur: '6s', begin, calcMode: 'spline', splines: `.16 .7 .3 1;0 0 1 1` })}
${smil('opacity', '.55;0;0', { keyTimes: '0;.75;1', dur: '6s', begin })}
</circle>`);

  const defs = `
<clipPath id="frame"><rect width="${W}" height="${H}" rx="16"/></clipPath>
<radialGradient id="glow" cx="${CX}" cy="${CY}" r="220" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${T.violet}" stop-opacity=".17"/><stop offset=".5" stop-color="${T.violet}" stop-opacity=".045"/><stop offset="1" stop-color="${T.violet}" stop-opacity="0"/></radialGradient>
<pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".9" fill="#FFFFFF" fill-opacity=".1"/></pattern>
<radialGradient id="dotsFade" cx="${CX}" cy="${CY}" r="280" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#000000"/></radialGradient>
<mask id="dotsMask" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="url(#dotsFade)"/></mask>
<linearGradient id="sweep" gradientUnits="userSpaceOnUse" x1="-190" y1="0" x2="-70" y2="60"><stop offset="0" stop-color="${T.text}"/><stop offset=".5" stop-color="${T.haze}"/><stop offset="1" stop-color="${T.text}"/>${smilT('translate', '0 0;720 0;720 0', { keyTimes: '0;.42;1', dur: '12s', calcMode: 'spline', splines: '.4 0 .6 1;0 0 1 1' })}</linearGradient>
${wm.clip}
<clipPath id="typed"><rect x="${TX}" y="234" width="${TL + 24}" height="28">${smil('width', clipV.join(';'), { keyTimes: clipT.join(';'), dur: '18s', calcMode: 'discrete' })}</rect></clipPath>
<linearGradient id="core" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${T.violet}"/><stop offset="1" stop-color="${T.blue}"/></linearGradient>
<linearGradient id="edge" gradientUnits="userSpaceOnUse" x1="480" y1="0" x2="880" y2="0"><stop offset="0" stop-color="${T.violet}" stop-opacity="0"/><stop offset=".6" stop-color="${T.violet}" stop-opacity=".75"/><stop offset="1" stop-color="${T.violet}" stop-opacity="0"/></linearGradient>
<filter id="soft" x="-2" y="-2" width="5" height="5"><feGaussianBlur stdDeviation="10"/></filter>`;

  const sub = 'AI · QUANT · CRYPTO SYSTEMS';
  const dot = `<tspan fill="${T.violet}"> · </tspan>`;

  const body = `
<g clip-path="url(#frame)">
<rect width="${W}" height="${H}" fill="${T.bg0}"/>
<rect width="${W}" height="${H}" fill="url(#glow)"/>
<rect width="${W}" height="${H}" fill="url(#dots)" mask="url(#dotsMask)"/>
<path d="M480 299.5H880" stroke="url(#edge)"/>
${vertex(63, 44, 1.6, { stroke: T.text2, sw: 1.1 })}
${mono('JW3 — INDEPENDENT RESEARCH LAB', 84, 48, { size: 11, track: 2, fill: T.text2 })}
<g transform="translate(56 98) scale(1.3)">${wm.body}</g>
${mono(sub, 57, 202, { size: 15, track: 4, fill: T.text, html: `AI${dot}QUANT${dot}CRYPTO SYSTEMS` })}
<path d="M58 243.5l5.5 5.5-5.5 5.5" stroke="${T.violet}" stroke-width="1.6"/>
<g clip-path="url(#typed)"><g>${smil('opacity', '1;1;0;0', { keyTimes: '0;.93;.98;1', dur: '18s' })}${mono(LINE, TX, TY, { size: SIZE, fill: T.text, opacity: 0.72 })}</g></g>
<g>${smil('opacity', '1;0', { keyTimes: '0;.5', dur: '1.1s', calcMode: 'discrete' })}<rect x="${TX + TL + 2}" y="240" width="8" height="16" fill="${T.violet}">${smilT('translate', caretV.join(';'), { keyTimes: times.join(';'), dur: '18s', calcMode: 'discrete' })}</rect></g>
<circle cx="${CX}" cy="${CY}" r="58" stroke="${T.line2}"/>
<circle cx="${CX}" cy="${CY}" r="96" stroke="${T.text2}" stroke-opacity=".45" stroke-width="1.2" stroke-linecap="round" stroke-dasharray="0 6"/>
<path d="${ticks}" stroke="${T.text2}" stroke-opacity=".6"/>
<path d="${edges.map(([a, b]) => `M${a[0]} ${a[1]}L${b[0]} ${b[1]}`).join('')}" stroke="#FFFFFF" stroke-opacity=".08"/>
${S.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i === 2 || i === 5 ? 2.6 : 2}" fill="${i === 2 ? T.violet : i === 5 ? T.blue : T.text2}"/>`).join('')}
<circle cx="${CX}" cy="${CY}" r="16" fill="${T.violet}" opacity=".5" filter="url(#soft)"/>
${pulse('0s')}
${pulse('3s')}
${vertex(CX, CY, U, { core: 'url(#core)', nodes: true })}
${pk.map(([a, b, dur, begin]) => at(a[0], a[1], `<circle r="2.2" fill="${T.haze}" opacity="0">
${smilT('translate', `0 0;${r2(b[0] - a[0])} ${r2(b[1] - a[1])};${r2(b[0] - a[0])} ${r2(b[1] - a[1])}`, { keyTimes: '0;.7;1', dur, begin, calcMode: 'spline', splines: `${EASE};0 0 1 1` })}
${smil('opacity', '0;1;1;0;0', { keyTimes: '0;.12;.7;.8;1', dur, begin })}
</circle>`)).join('')}
</g>
<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="15.5" stroke="${T.line}"/>`;

  return svg({
    w: W, h: H, defs, body,
    title: 'JESUS WEB3 — AI · Quant · Crypto Systems',
    desc: 'Building systems that research, trade and operate on their own.',
  });
}

export function status() {
  const W = 900, H = 56, X0 = 254, X1 = 884;
  const items = ['AI AGENTS', 'QUANT RESEARCH', 'TRADING SYSTEMS', 'WEB3 INFRASTRUCTURE', 'LOCAL LLM', 'AUTOMATION'];
  const size = 12, track = 1.8, gap = 22, d = 3;
  let x = 0, seq = '';
  for (const it of items) {
    seq += mono(it, x, 32.2, { size, track, fill: T.text2 });
    x += monoW(it, size, track) + gap;
    seq += `<path d="${dia(x + d, 28, d)}" fill="${T.violet}" opacity=".85"/>`;
    x += d * 2 + gap;
  }
  const SEQ = r2(x);
  const dur = `${Math.round(SEQ / 46)}s`;

  const defs = `
<linearGradient id="fade" gradientUnits="userSpaceOnUse" x1="${X0}" y1="0" x2="${X1}" y2="0"><stop offset="0" stop-color="#000000"/><stop offset=".07" stop-color="#FFFFFF"/><stop offset=".93" stop-color="#FFFFFF"/><stop offset="1" stop-color="#000000"/></linearGradient>
<mask id="win" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect x="${X0}" y="0" width="${X1 - X0}" height="${H}" fill="url(#fade)"/></mask>`;

  const body = `
${panel(W, H, { rx: 12 })}
<circle cx="30" cy="28" r="3.5" fill="${T.violet}"/>
${at(30, 28, `<circle r="3.5" stroke="${T.violet}" stroke-width="1.2" vector-effect="non-scaling-stroke" opacity="0">
${smilT('scale', '1;3.4;3.4', { keyTimes: '0;.8;1', dur: '3s', calcMode: 'spline', splines: '.2 .6 .4 1;0 0 1 1' })}
${smil('opacity', '.7;0;0', { keyTimes: '0;.8;1', dur: '3s' })}
</circle>`)}
${mono('CURRENTLY BUILDING', 46, 32, { size: 11.5, track: 2, fill: T.text, weight: 600 })}
<path d="M238.5 18V38" stroke="${T.line2}"/>
<g mask="url(#win)"><g>${smilT('translate', `0 0;${-SEQ} 0`, { dur })}${[0, SEQ].map((off) => `<g transform="translate(${r2(X0 + 20 + off)} 0)">${seq}</g>`).join('')}</g></g>`;

  return svg({ w: W, h: H, defs, body, title: 'Currently building', desc: items.join(' · ') });
}

export function divider() {
  const W = 900, H = 28, cy = 11;
  const defs = `
<linearGradient id="gl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${T.text2}" stop-opacity="0"/><stop offset="1" stop-color="${T.text2}" stop-opacity=".5"/></linearGradient>
<linearGradient id="gr" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${T.text2}" stop-opacity=".5"/><stop offset="1" stop-color="${T.text2}" stop-opacity="0"/></linearGradient>
<linearGradient id="gp" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${T.violet}" stop-opacity="0"/><stop offset=".5" stop-color="${T.violet}"/><stop offset="1" stop-color="${T.violet}" stop-opacity="0"/></linearGradient>`;
  const pulse = (x, dx) => `<rect x="${x}" y="${cy - 0.5}" width="36" height="1" fill="url(#gp)" opacity="0">
${smilT('translate', `0 0;${dx} 0`, { keyTimes: '0;1', dur: '9s', calcMode: 'spline', splines: EASE })}
${smil('opacity', '0;1;0;0', { keyTimes: '0;.15;.65;1', dur: '9s' })}
</rect>`;
  const body = `
<rect x="40" y="${cy - 0.5}" width="376" height="1" fill="url(#gl)"/>
<rect x="484" y="${cy - 0.5}" width="376" height="1" fill="url(#gr)"/>
${pulse(396, -300)}
${pulse(468, 300)}
${vertex(450, cy, 2, { stroke: T.text2, sw: 1 })}`;
  return svg({ w: W, h: H, defs, body, title: 'Divider', desc: 'Jesus Web3 vertex divider' });
}

export function section(idx, label, right) {
  const W = 900, H = 72, cy = 36;
  const lx = 62, lsize = 20, ltrack = 3.2;
  const lw = monoW(label, lsize, ltrack);
  const rw = monoW(right, 11, 1.6);
  const hx1 = r2(lx + lw + 28), hx2 = r2(W - 28 - rw - 26);
  const travel = r2(hx2 - hx1 - 64);
  const defs = `<linearGradient id="seg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${T.violet}" stop-opacity="0"/><stop offset="1" stop-color="${T.violet}"/></linearGradient>`;
  const body = `
${panel(W, H, { fill: T.bg0, rx: 12 })}
${mono(idx, 28, cy + 4.6, { size: 13, track: 1, fill: T.violet, weight: 600 })}
${mono(label, lx, cy + 7, { size: lsize, track: ltrack, fill: T.text, weight: 500 })}
<rect x="${hx1}" y="${cy - 0.5}" width="${r2(hx2 - hx1 - 8)}" height="1" fill="${T.line2}"/>
<rect x="${hx1}" y="${cy - 0.5}" width="64" height="1" fill="url(#seg)" opacity="0">
${smilT('translate', `0 0;${travel} 0;${travel} 0`, { keyTimes: '0;.55;1', dur: '10s', calcMode: 'spline', splines: '.5 0 .5 1;0 0 1 1' })}
${smil('opacity', '0;1;1;0;0', { keyTimes: '0;.1;.55;.62;1', dur: '10s' })}
</rect>
<path d="${dia(hx2, cy, 3.5)}" fill="${T.violet}"/>
${mono(right, W - 28, cy + 3.9, { size: 11, track: 1.6, fill: T.text2, anchor: 'end' })}`;
  return svg({ w: W, h: H, defs, body, title: `${idx} — ${label}`, desc: right });
}
