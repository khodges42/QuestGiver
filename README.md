# QuestGiver

QuestGiver is a small, friendly RPG-themed site for finding open source projects.

Visit it here: [questgiver.khod.net](https://questgiver.khod.net)

The wizard asks a few questions, gives you a class, and points you toward GitHub searches and curated projects that might be a good place to start. It is meant to make open source feel less like a locked castle gate and more like a quest board.

## What It Does

- Guides visitors through a playful dialogue tree
- Helps beginners with a level 1 adventurer guide
- Generates GitHub search links for possible projects
- Includes curated quests and random quest discovery
- Offers a quick-search mode for impatient adventurers
- Keeps preferences local with `localStorage`
- Runs as a static React + Vite site with no backend
- Includes a Hall of Heroes for contributors

QuestGiver does not crawl GitHub, store accounts, call a backend, or require tokens. Generated search cards are just search links, not endorsements of every result.

## Hall Of Heroes

Contributors can add themselves to:

```text
src/data/heroes.json
```

Use this shape:

```json
{
  "name": "Your Name",
  "quest": "What you contributed",
  "date": "YYYY-MM-DD"
}
```

After your pull request is merged, your name can appear in the Hall of Heroes on the site.

## Run Locally

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

## Project Data

Curated quests live in:

```text
src/data/curatedQuests.js
```

Hero classes live in:

```text
src/data/classes.js
```

Hall of Heroes entries live in:

```text
src/data/heroes.json
```

## Assets

Drop replacement art into:

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

## Contributing

Open source quests are welcome. Small fixes, docs improvements, accessibility work, new curated quests, and Hall of Heroes entries all count.

Repo: [github.com/khodges42/questgiver](https://github.com/khodges42/questgiver)
