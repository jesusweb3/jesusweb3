# Brand surfaces

Same design system as the profile README — static by design, exported to PNG.
Regenerate with `node tools/build-brand.mjs` (SVG is the source, PNG is the export).

| File | Size | Where it goes |
| --- | --- | --- |
| `social-preview.png` | 1280×640 | GitHub repo → Settings → Social preview. The card shown when a repo link is posted on X, Telegram, Discord, Slack. Works for every repo. |
| `x-header.png` | 1500×500 | X / Twitter profile header. Content sits in the centre; the bottom-left stays clear for the avatar and the centre survives the mobile crop. |
| `avatar.png` | 460×460 | GitHub / X / Telegram avatar — the Vertex mark, safe inside a circular crop. |
| `fl-cover.png` | 1940×400 | fl.ru profile cover, desktop. Identity on the left, the four things to hire for on the right. |
| `fl-cover-mobile.png` | 900×300 | fl.ru profile cover, mobile. Same message, one centred column. |

GitHub personal profiles have no banner image; the profile hero lives in `../assets/hero.svg`.
