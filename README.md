# QuestGiver

v0.3 edit pass: locked palette, Google Fonts, class-as-dialogue, compact viewport-first layout, final search question, CSS castle-wall background, and floaty magic effects.

**QuestGiver** is a static RPG-themed open source quest finder.

It does not crawl GitHub, store accounts, call a backend, or require tokens. It generates useful search links and mixes them with curated project suggestions.

## Features

- React + Vite static site
- Cloudflare Pages friendly
- RPG dialogue flow
- Class picker
- 4 useful questions + 1 nonsense question
- "I Am In A Hurry, Wizard" quick-search mode
- Random quest button
- Generated GitHub search links
- Curated quest cards
- Special QuestGiver repo card
- Local-only preferences using `localStorage`

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Cloudflare Pages settings:

- Build command: `npm run build`
- Build output directory: `dist`

## Asset replacement

Drop your own pixel art into:

```text
public/assets/questgiver.png
public/assets/background.png
public/assets/logo.png
```

Recommended sizes:

- `questgiver.png`: 128x128 or 256x256 transparent PNG
- `background.png`: 1280x720 or tileable 320x180
- `logo.png`: about 600x160 transparent PNG

If these files do not exist, the app uses CSS pixel-art placeholders.

## Notes

Generated Search cards are plain search links. They are **not endorsements** of whatever appears in GitHub results.

Curated Quest cards are manually suggested projects. Edit them in:

```text
src/data/curatedQuests.js
```

## v0.3 notes

- Generated searches are now repo-focused and less issue-label-dependent.
- Results page uses a primary search card and compact map cards.
- Hurry Wizard layout has been tightened.

## v0.4 notes

- Explicitly references `public/assets/background.png` as the page background.
- Character frame now has pixel sky/grass fallback styling.
- Questgiver is centered/lifted in the frame.
- Intro/dialogue cards now have speech-bubble pointers.

## v0.5 notes

- `public/assets/background.png` is now treated as a repeating stone-wall tile.
- The wizard frame has a code-generated pixel sky, grass, ground texture, and slow drifting clouds.
- Intro/dialogue panels are now visible cream speech bubbles.
- Footer includes attribution for Pixollie, Cainos, and Google Fonts.
- Subtitle and footer copy updated.

## v0.6 notes

- Intro page now uses a dedicated visible speech bubble.
- Sky/grass panel no longer has the striped/barcode ground.
- Clouds are constrained to the sky region.
- Result map uses fewer columns and roomier cards.
