// fl.ru kwork cover — "Telegram-бот с ИИ, API и автоматизацией", 1320×880 (3:2), static.
// fl.ru renders this at ~530 px wide (and ~300 px in the catalogue), so type is sized
// for that scale: headline ≈ 53 px on screen, body ≈ 14 px. Few elements, all large.
import { T, r2, mono, sans, dia, svg, vertex } from './lib.mjs';

export function kworkBotCover() {
  const W = 1320, H = 880;
  const CX = 1055, CY = 430, U = 22;

  const caps = [
    'Автоматизация: интеграции, платежи',
    'ИИ-ответы: OpenAI, Claude',
    'Трейдинг: биржи, сигналы, ордера',
    'Хостинг и работа 24/7',
  ];

  const polar = (a, r) => [r2(CX + r * Math.cos((a * Math.PI) / 180)), r2(CY + r * Math.sin((a * Math.PI) / 180))];
  const sats = [polar(-146, 170), polar(-52, 206), polar(14, 170), polar(112, 196)];
  const arms = { top: [CX, CY - 5 * U], left: [CX - 5 * U, CY], right: [CX + 5 * U, CY], bottom: [CX, CY + 8 * U] };
  const edges = [[sats[0], arms.left], [sats[1], arms.top], [sats[2], arms.right], [sats[3], arms.bottom], [sats[0], sats[3]], [sats[1], sats[2]]];

  const defs = `
<radialGradient id="glow" cx="${CX}" cy="${CY}" r="470" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${T.violet}" stop-opacity=".2"/><stop offset=".55" stop-color="${T.violet}" stop-opacity=".05"/><stop offset="1" stop-color="${T.violet}" stop-opacity="0"/></radialGradient>
<pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1.1" fill="#FFFFFF" fill-opacity=".1"/></pattern>
<radialGradient id="dotsFade" cx="${CX}" cy="${CY}" r="560" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#000000"/></radialGradient>
<mask id="dotsMask" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="url(#dotsFade)"/></mask>
<linearGradient id="core" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${T.violet}"/><stop offset="1" stop-color="${T.blue}"/></linearGradient>
<filter id="soft" x="-2" y="-2" width="5" height="5"><feGaussianBlur stdDeviation="26"/></filter>`;

  const body = `
<rect width="${W}" height="${H}" fill="${T.bg0}"/>
<rect width="${W}" height="${H}" fill="url(#glow)"/>
<rect width="${W}" height="${H}" fill="url(#dots)" mask="url(#dotsMask)"/>

<circle cx="${CX}" cy="${CY}" r="110" stroke="${T.line2}" stroke-width="1.6"/>
<circle cx="${CX}" cy="${CY}" r="172" stroke="${T.text2}" stroke-opacity=".4" stroke-width="1.6" stroke-linecap="round" stroke-dasharray="0 10"/>
<path d="${edges.map(([a, b]) => `M${a[0]} ${a[1]}L${b[0]} ${b[1]}`).join('')}" stroke="#FFFFFF" stroke-opacity=".08" stroke-width="1.4"/>
${sats.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i === 1 ? 6 : 4.5}" fill="${i === 1 ? T.violet : i === 3 ? T.blue : T.text2}"/>`).join('')}
<circle cx="${CX}" cy="${CY}" r="46" fill="${T.violet}" opacity=".5" filter="url(#soft)"/>
${vertex(CX, CY, U, { core: 'url(#core)', nodes: true })}

${vertex(84, 96, 4.4, { stroke: T.text2, sw: 2.6 })}
${mono('JW3 — TELEGRAM SYSTEMS', 132, 106, { size: 23, track: 3.4, fill: T.text2 })}

${sans('TELEGRAM-БОТ', 72, 312, { size: 128, weight: 700, track: -2, fill: T.text })}
${mono('ИИ · API · ТРЕЙДИНГ', 76, 388, { size: 38, track: 7, fill: T.text, html: `ИИ<tspan fill="${T.violet}"> · </tspan>API<tspan fill="${T.violet}"> · </tspan>ТРЕЙДИНГ` })}

<path d="M72 452H820" stroke="${T.line}" stroke-width="1.6"/>
${caps.map((c, i) => `<path d="${dia(82, 508 + i * 66, 9)}" fill="${T.violet}"/>${sans(c, 116, 520 + i * 66, { size: 33, fill: i === 2 ? T.text : T.text2 })}`).join('')}

<path d="M72 756H1248" stroke="${T.line}" stroke-width="1.6"/>
${mono('PYTHON · AIOGRAM · WEBSOCKET · DOCKER', 72, 822, { size: 24, track: 1.6, fill: T.text2 })}
${vertex(1036, 814, 4, { stroke: T.text2, sw: 2.4 })}
${mono('JESUS WEB3', 1248, 822, { size: 24, track: 3, fill: T.text2, anchor: 'end' })}`;

  return svg({
    w: W, h: H, defs, body,
    title: 'Telegram-бот с ИИ, API и автоматизацией',
    desc: 'Разработка Telegram-ботов: автоматизация и интеграции, ИИ-ответы, торговые боты для бирж, хостинг и работа 24/7.',
  });
}
