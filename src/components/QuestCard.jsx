import { ExternalLink } from "lucide-react";

const labels = {
  generated: "Generated Search",
  curated: "Curated Quest",
  special: "Special Quest",
  self: "QuestGiver Needs You"
};

export default function QuestCard({ quest, compact = false }) {
  const kind = quest.kind || quest.type || "generated";
  return (
    <article className={`quest-card ${kind} ${compact ? "compact" : ""}`}>
      <div className="quest-card-top">
        <span className="badge">{labels[kind] || "Quest"}</span>
        {quest.difficulty && <span className="difficulty">Difficulty: {quest.difficulty}</span>}
      </div>
      <h3>{quest.title}</h3>
      <p>{quest.why || quest.description}</p>
      {quest.query && !compact && (
        <pre className="query-scroll"><code>{quest.query}</code></pre>
      )}
      <div className="tag-row">
        {(quest.tags || []).slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <a className="quest-link" href={quest.url} target="_blank" rel="noreferrer">
        Accept Quest <ExternalLink size={16} />
      </a>
    </article>
  );
}
