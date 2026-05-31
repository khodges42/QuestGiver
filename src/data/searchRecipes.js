export const questPresets = {
  smallAlive: {
    label: "Small but Alive",
    description: "Low-star projects with recent signs of life.",
    qualifiers: ["stars:1..100", "pushed:>2025-01-01", "archived:false"]
  },
  tiny: {
    label: "Tiny",
    description: "Very small projects, hopefully not abandoned.",
    qualifiers: ["stars:1..25", "pushed:>2024-01-01", "archived:false"]
  },
  docsNeeded: {
    label: "Docs Needed",
    description: "Small projects where docs work may matter. This searches repos, not issue labels.",
    qualifiers: ["stars:1..250", "pushed:>2024-01-01", "archived:false", "README OR documentation OR docs"]
  },
  saveWorld: {
    label: "Save the World",
    description: "Humanitarian, healthcare, civic tech, accessibility, and public good software.",
    qualifiers: ["stars:1..500", "pushed:>2024-01-01", "archived:false", "humanitarian OR healthcare OR civic OR accessibility OR disaster"]
  },
  accessibility: {
    label: "Accessibility Needed",
    description: "Small projects touching accessibility. Review carefully before contributing.",
    qualifiers: ["stars:1..500", "pushed:>2024-01-01", "archived:false", "accessibility OR a11y"]
  },
  dwarven: {
    label: "Dwarven Infrastructure",
    description: "Ancient systems. Few contributors. Deep lore. Approach with respect.",
    qualifiers: ["stars:1..300", "pushed:>2023-01-01", "archived:false", "linux OR unix OR cli OR infrastructure"]
  },
  friendly: {
    label: "Friendly First Quest",
    description: "Approachable small projects. No issue-label requirement.",
    qualifiers: ["stars:1..300", "pushed:>2024-01-01", "archived:false"]
  }
};

export const interestDefaults = [
  { label: "Accessibility", value: "accessibility", query: "accessibility OR a11y" },
  { label: "Audio", value: "audio", query: "audio OR dsp OR midi" },
  { label: "Backend", value: "backend", query: "api OR server OR backend" },
  { label: "CLI tools", value: "cli", query: "cli OR terminal OR command-line" },
  { label: "Cryptography", value: "cryptography", query: "cryptography OR crypto OR pki OR tls" },
  { label: "Creative Coding", value: "creative-coding", query: "creative-coding OR generative-art OR graphics" },
  { label: "Civic Tech", value: "civic-tech", query: "civic-tech OR public-interest OR government" },
  { label: "Data", value: "data", query: "data OR etl OR analytics" },
  { label: "DevOps", value: "devops", query: "devops OR ci OR deployment" },
  { label: "Documentation", value: "documentation", query: "documentation OR docs OR README" },
  { label: "Embedded", value: "embedded", query: "embedded OR firmware OR microcontroller" },
  { label: "Games", value: "games", query: "game OR gamedev OR engine" },
  { label: "Healthcare", value: "healthcare", query: "healthcare OR medical OR hospital" },
  { label: "Linux", value: "linux", query: "linux OR unix" },
  { label: "Privacy", value: "privacy", query: "privacy OR encryption OR anonymity" },
  { label: "Retro Computing", value: "retro-computing", query: "retro OR emulator OR vintage-computing" },
  { label: "Rust", value: "rust", query: "language:Rust" },
  { label: "Web", value: "web", query: "web OR frontend" }
];

export const languages = [
  { label: "Any language", value: "" },
  { label: "Rust", value: "language:Rust" },
  { label: "Python", value: "language:Python" },
  { label: "TypeScript", value: "language:TypeScript" },
  { label: "JavaScript", value: "language:JavaScript" },
  { label: "Go", value: "language:Go" },
  { label: "C", value: "language:C" },
  { label: "C++", value: "language:C++" },
  { label: "C#", value: "language:C%23" },
  { label: "Haskell", value: "language:Haskell" },
  { label: "Java", value: "language:Java" },
  { label: "Ruby", value: "language:Ruby" }
];

export function buildGithubSearchUrl(parts) {
  const compact = parts
    .filter(Boolean)
    .flatMap((part) => Array.isArray(part) ? part : [part])
    .map((part) => String(part).trim())
    .filter(Boolean);

  const unique = [...new Set(compact)];
  const query = unique.join(" ");
  return {
    query,
    url: `https://github.com/search?q=${encodeURIComponent(query)}&type=repositories&s=updated&o=desc`
  };
}
