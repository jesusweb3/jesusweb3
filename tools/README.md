# tools

Every SVG in `../assets/` and every PNG in `../brand/` is generated from the design
tokens in `lib.mjs`. Edit the source here, re-run the build, commit the output —
never hand-edit a generated file.

Needs Node 18+. No dependencies. PNG export needs Chrome or Edge installed.

## Commands

Profile assets — `../assets/*.svg`:

```bash
node tools/build-assets.mjs
```

Brand surfaces — `../brand/*.svg` plus PNG exports:

```bash
node tools/build-brand.mjs
```

Animation-free copies of the profile assets (for previews that strip motion):

```bash
node tools/build-assets.mjs --static ./out-static
```

Preview the README the way GitHub renders it — serve the repo root, then open
`http://localhost:8765/tools/preview.html`:

```bash
python -m http.server 8765
```

## Files

| File | What it holds |
| --- | --- |
| `lib.mjs` | Tokens, text helpers, the Vertex mark, the stroke wordmark, SMIL helpers |
| `top.mjs` | Hero, status bar, divider, section headers |
| `build.mjs` | "What I build" cards and their motifs |
| `lab.mjs` | Project cards, research + stack modules, connect buttons |
| `build-assets.mjs` | Entry point for the README assets |
| `brand.mjs` | Social preview, X header, avatar, fl.ru profile covers |
| `work-locus.mjs` | fl.ru portfolio cover for LOCUS |
| `work-kwork-bot.mjs` | fl.ru kwork cover for the Telegram-bot service |
| `build-brand.mjs` | Entry point for the brand surfaces, rasterises them with headless Chrome |

## Rules that keep the system consistent

- Motion is SMIL, never CSS keyframes: `<img>`-embedded SVG then animates regardless
  of the viewer's reduced-motion setting or any "disable animations" extension.
- Every animated element carries its finished state as a presentation attribute, so a
  renderer that ignores animation still shows a complete composition.
- Mono labels go through `mono()`, which sets `textLength`, so widths are identical on
  every OS font.
- Changing an asset in place does not refresh GitHub's CDN: bump the `?v=N` query on
  that image in `../README.md`.
