import QuestCard from "./QuestCard.jsx";

export default function Results({ result, onRestart, onRandom }) {
  if (!result) return null;

  const [primary, ...otherQuests] = result.quests;

  return (
    <section className="results compact-results">
      <div className="result-heading">
        <span className="tiny-label">Quest Map</span>
        <h2>{result.title}</h2>
        <p>{result.summary}</p>
      </div>

      {primary && (
        <article className="primary-search-card">
          <div>
            <span className="badge">Generated Search</span>
            <h3>{primary.title}</h3>
            <p>{primary.description}</p>
            <code>{primary.query}</code>
          </div>
          <a className="quest-link" href={primary.url} target="_blank" rel="noreferrer">
            Open Search
          </a>
        </article>
      )}

      <div className="notice">
        GitHub searches need you to be logged in to work. Searches are generated GitHub queries, not endorsements. Curated Quests are manually suggested jumping-off points.
      </div>

      <div className="quest-grid compact">
        {otherQuests.map((quest) => <QuestCard key={quest.id} quest={quest} compact />)}
      </div>

      <div className="result-actions">
        <button className="secondary-button" onClick={onRestart}>Begin Again</button>
        <button className="primary-button" onClick={onRandom}>Random Quest</button>
      </div>
    </section>
  );
}
