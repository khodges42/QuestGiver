export const usefulQuestions = [
  {
    id: "language",
    text: "Which tool feels best in your hand today?",
    choices: [
      { label: "Rust", tags: ["rust", "systems"], query: ["language:Rust"] },
      { label: "Python", tags: ["python", "data", "backend"], query: ["language:Python"] },
      { label: "JavaScript / TypeScript", tags: ["javascript", "typescript", "frontend"], query: ["language:TypeScript"] },
      { label: "C / C++", tags: ["c", "cpp", "embedded", "systems"], query: ["language:C", "language:C++"] }
    ]
  },
  {
    id: "quest-type",
    text: "What sort of quest calls to you?",
    choices: [
      { label: "Small but alive", tags: ["small-alive"], preset: "smallAlive" },
      { label: "Tiny", tags: ["tiny"], preset: "tiny" },
      { label: "Docs needed", tags: ["docs"], preset: "docsNeeded" },
      { label: "Dwarven infrastructure", tags: ["dwarven"], preset: "dwarven" },
      { label: "Save the world", tags: ["humanitarian"], preset: "saveWorld" }
    ]
  },
  {
    id: "domain",
    text: "Which corner of the realm interests you most?",
    choices: [
      { label: "Security & privacy", tags: ["security", "privacy", "cryptography"], query: ["topic:security", "topic:privacy"] },
      { label: "Creative tools", tags: ["creative", "graphics", "audio"], query: ["topic:creative-coding", "topic:graphics"] },
      { label: "Linux & systems", tags: ["linux", "systems"], query: ["topic:linux"] },
      { label: "Healthcare / public good", tags: ["healthcare", "humanitarian"], query: ["healthcare", "humanitarian"] },
      { label: "Games & engines", tags: ["gamedev", "games"], query: ["topic:game-development"] }
    ]
  },
  {
    id: "contribution",
    text: "A maintainer appears, weary but hopeful. What aid do you offer?",
    choices: [
      { label: "Fix bugs", tags: ["bugs"], query: ["bug OR fix OR repair"] },
      { label: "Improve docs", tags: ["docs"], query: ["documentation"] },
      { label: "Add tests", tags: ["testing"], query: ["testing"] },
      { label: "Improve accessibility", tags: ["accessibility"], query: ["accessibility"] }
    ]
  },
  {
    id: "comfort",
    text: "How deep into the dungeon are you willing to go?",
    choices: [
      { label: "Readable README or I flee", tags: ["beginner"], preset: "friendly" },
      { label: "A few dragons are fine", tags: ["intermediate"], preset: "smallAlive" },
      { label: "Give me the ancient machinery", tags: ["dwarven", "systems"], preset: "dwarven" }
    ]
  },
  {
    id: "linux",
    text: "Do you know much about Linux?",
    choices: [
      { label: "Yes", tags: ["linux", "systems", "devops"], query: ["topic:linux"] },
      { label: "No", tags: ["beginner", "docs"], query: ["README OR documentation"] }
    ]
  },
  {
    id: "art-or-music",
    text: "Do you prefer making tools for artists, or tools for computers?",
    choices: [
      { label: "Artists", tags: ["creative", "graphics", "audio", "frontend"], query: ["topic:creative-coding"] },
      { label: "Computers", tags: ["systems", "backend", "devops"], query: ["topic:systems"] }
    ]
  }
];

export const nonsenseQuestions = [
  {
    id: "corneria",
    text: "WELCOME TO CORNERIA",
    choices: [
      { label: "I like swords", tags: ["swords"] },
      { label: "I also like swords", tags: ["swords"] }
    ]
  },
  {
    id: "kobolds",
    text: "How do you feel about kobolds?",
    choices: [
      { label: "They deserve labor protections", tags: ["kobold-positive"] },
      { label: "I do not trust them with build systems", tags: ["dwarven"] }
    ]
  },
  {
    id: "daemon",
    text: "An ancient daemon offers you root access.",
    choices: [
      { label: "Accept wisely", tags: ["linux"] },
      { label: "Ask if it has tests", tags: ["testing"] }
    ]
  },
  {
    id: "build",
    text: "The build succeeds on the first try.",
    choices: [
      { label: "Suspicious", tags: ["ci"] },
      { label: "Extremely suspicious", tags: ["ci"] }
    ]
  },
  {
    id: "readme",
    text: "You find a dusty README.",
    choices: [
      { label: "Rewrite it", tags: ["docs"] },
      { label: "Preserve it as an artifact", tags: ["dwarven"] }
    ]
  }
];
