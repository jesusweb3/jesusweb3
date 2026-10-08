// Design tokens + SVG primitives shared by every Jesus Web3 asset.

export const T = {
  bg0: '#07080A',
  bg1: '#0B0D10',
  bg2: '#101216',
  line: '#1A1D23',
  line2: '#262A32',
  text: '#F0F2F5',
  text2: '#7D8490',
  violet: '#8B7BFF',
  blue: '#6CA6FF',
  haze: '#B3A8FF',
};

export const MONO =
  "ui-monospace, SFMono-Regular, 'SF Mono', 'JetBrains Mono', 'Cascadia Mono', Consolas, 'Liberation Mono', Menlo, monospace";
export const SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif";

export const r2 = (v) => Math.round(v * 100) / 100;
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const attrs = (o) =>
  Object.entries(o)
    .filter(([, v]) => v !== undefined && v !== null && v !== false)
    .map(([k, v]) => ` ${k}="${v}"`)
    .join('');

// Mono labels get a fixed textLength, so widths are identical on every OS font.
export const monoW = (s, size, track = 0) => r2([...s].length * (0.6 * size + track) - track);

export function mono(s, x, y, o = {}) {
  const { size = 12, track = 0, fill = T.text2, anchor, weight, opacity, cls } = o;
  return `<text${attrs({
    x: r2(x), y: r2(y), 'font-family': MONO, 'font-size': size, 'font-weight': weight, fill,
    'text-anchor': anchor, textLength: monoW(s, size, track), lengthAdjust: 'spacing', opacity, class: cls,
  })}>${o.html ?? esc(s)}</text>`;
}

export function sans(s, x, y, o = {}) {
  const { size = 15, fill = T.text2, weight, track, anchor, opacity } = o;
  return `<text${attrs({
    x: r2(x), y: r2(y), 'font-family': SANS, 'font-size': size, 'font-weight': weight,
    'letter-spacing': track, fill, 'text-anchor': anchor, opacity,
  })}>${o.html ?? esc(s)}</text>`;
}

export const dia = (x, y, s) =>
  `M${r2(x)} ${r2(y - s)}L${r2(x + s)} ${r2(y)}L${r2(x)} ${r2(y + s)}L${r2(x - s)} ${r2(y)}Z`;

export const panel = (w, h, { fill = T.bg1, stroke = T.line, rx = 14 } = {}) =>
  `<rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="${rx - 0.5}" fill="${fill}" stroke="${stroke}"/>`;

/*
 * Motion is SMIL, never CSS: <img>-embedded SVG runs SMIL regardless of the
 * viewer's reduced-motion setting or any "disable animations" extension, which
 * strip CSS keyframes. Every animated element still carries its finished state
 * as a presentation attribute, so a non-animating renderer shows the static comp.
 */
export const EASE = '.4 0 .2 1';

export const smil = (attr, values, o = {}) =>
  `<animate${attrs({
    attributeName: attr, values, keyTimes: o.keyTimes, dur: o.dur, begin: o.begin,
    repeatCount: o.repeat ?? 'indefinite', calcMode: o.calcMode, keySplines: o.splines, fill: o.fill,
  })}/>`;

export const smilT = (type, values, o = {}) =>
  `<animateTransform${attrs({
    attributeName: 'transform', type, values, keyTimes: o.keyTimes, dur: o.dur, begin: o.begin,
    repeatCount: o.repeat ?? 'indefinite', calcMode: o.calcMode, keySplines: o.splines, additive: o.additive,
  })}/>`;

// Animate around a point: SMIL scales about the origin, so park the shape there.
export const at = (x, y, inner) => `<g transform="translate(${r2(x)} ${r2(y)})">${inner}</g>`;

export function svg({ w, h, title, desc, defs = '', body }) {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" role="img" aria-labelledby="title desc">`,
    `<title id="title">${esc(title)}</title>`,
    `<desc id="desc">${esc(desc)}</desc>`,
    defs ? `<defs>${defs}</defs>` : '',
    body,
    '</svg>',
    '',
  ].filter(Boolean).join('\n');
}

/*
 * THE VERTEX — the identity mark.
 * A core diamond (1u) and four signal arms that start 2u out.
 * Top / left / right arms end at 5u; the lower arm runs to 8u —
 * a network vertex whose proportions quietly echo the alias.
 */
export function vertex(cx, cy, u, o = {}) {
  const { stroke = T.text, core = T.violet, sw = r2(u * 0.28), nodes = false, opacity } = o;
  const g = 2 * u;
  const ends = [
    [cx, cy - g, cx, cy - 5 * u],
    [cx - g, cy, cx - 5 * u, cy],
    [cx + g, cy, cx + 5 * u, cy],
    [cx, cy + g, cx, cy + 8 * u],
  ];
  const d = ends.map(([a, b, c, e]) => `M${r2(a)} ${r2(b)}L${r2(c)} ${r2(e)}`).join('');
  let out = `<g${attrs({ opacity })}><path d="${d}" stroke="${stroke}" stroke-width="${sw}"/>`;
  out += `<path d="${dia(cx, cy, u)}" fill="${core}"/>`;
  if (nodes) out += `<path d="${ends.map(([, , x, y]) => dia(x, y, u * 0.42)).join('')}" fill="${stroke}"/>`;
  return out + '</g>';
}

/*
 * Custom stroke wordmark. Cap height 46, stroke centreline geometry,
 * square caps; clip to [-sw/2, 46+sw/2] to flatten W terminals.
 */
const CAP = 46;
const R = 8;
const M = 23;
const a0 = (x, y) => `A${R} ${R} 0 0 0 ${x} ${y}`;
const a1 = (x, y) => `A${R} ${R} 0 0 1 ${x} ${y}`;

const GLYPH = {
  J: [30, (x) => `M${x + 30} 0V${CAP - R}${a1(x + 30 - R, CAP)}H${x + R}${a1(x, CAP - R)}V${CAP - 13}`],
  L: [28, (x) => `M${x} 0V${CAP}H${x + 28}`],
  O: [34, (x) => `M${x + R} 0H${x + 34 - R}${a1(x + 34, R)}V${CAP - R}${a1(x + 34 - R, CAP)}H${x + R}${a1(x, CAP - R)}V${R}${a1(x + R, 0)}Z`],
  C: [34, (x) => `M${x + 34} 12V${R}${a0(x + 34 - R, 0)}H${x + R}${a0(x, R)}V${CAP - R}${a0(x + R, CAP)}H${x + 34 - R}${a0(x + 34, CAP - R)}V${CAP - 12}`],
  E: [29, (x) => `M${x + 29} 0H${x}V${CAP}H${x + 29}M${x} ${M}H${x + 25}`],
  S: [32, (x) => `M${x + 32} 0H${x + R}${a0(x, R)}V${M - R}${a0(x + R, M)}H${x + 32 - R}${a1(x + 32, M + R)}V${CAP - R}${a1(x + 32 - R, CAP)}H${x}`],
  U: [32, (x) => `M${x} 0V${CAP - R}${a0(x + R, CAP)}H${x + 32 - R}${a0(x + 32, CAP - R)}V0`],
  W: [50, (x) => `M${x} 0L${x + 11} ${CAP}L${x + 25} 12L${x + 39} ${CAP}L${x + 50} 0`],
  B: [32, (x) => `M${x} ${CAP}V0H${x + 29 - R}${a1(x + 29, R)}V${M - R}${a1(x + 29 - R, M)}H${x}M${x} ${M}H${x + 32 - R}${a1(x + 32, M + R)}V${CAP - R}${a1(x + 32 - R, CAP)}H${x}`],
  3: [31, (x) => `M${x} 0H${x + 28 - R}${a1(x + 28, R)}V${M - R}${a1(x + 28 - R, M)}H${x + 10}M${x + 28 - R} ${M}H${x + 31 - R}${a1(x + 31, M + R)}V${CAP - R}${a1(x + 31 - R, CAP)}H${x}`],
};

export const WM_CAP = CAP;
export const WM_STROKE = 5;

export function wordmark(text = 'JESUS WEB3', track = 16, space = 40) {
  let x = 0;
  let d = '';
  for (const ch of text) {
    if (ch === ' ') { x += space - track; continue; }
    const [w, fn] = GLYPH[ch];
    d += fn(x);
    x += w + track;
  }
  return { d, width: x - track };
}

// Wordmark group in local coordinates; `stroke` may be a paint server url.
export function wordmarkPaths(clipId, stroke) {
  const wm = wordmark();
  return {
    width: wm.width,
    clip: `<clipPath id="${clipId}"><rect x="-6" y="${-WM_STROKE / 2}" width="${wm.width + 12}" height="${CAP + WM_STROKE}"/></clipPath>`,
    body: `<g clip-path="url(#${clipId})"><path d="${wm.d}" stroke="${stroke}" stroke-width="${WM_STROKE}" stroke-linecap="square" stroke-linejoin="miter"/></g>`,
  };
}
