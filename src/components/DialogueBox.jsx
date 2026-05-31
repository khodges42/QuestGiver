export default function DialogueBox({ question, onAnswer, step, total, result }) {
  if (!question) return null;

  return (
    <section className="dialogue-wrap" aria-live="polite">
      <div className="dialogue-header">
        <span>Questgiver</span>
        <span>{step}/{total}</span>
      </div>
      <div className={`dialogue-box ${question.kind === "nonsense" ? "nonsense" : ""} ${question.kind === "final" ? "final" : ""}`}>
        <div>
          <p>{question.text}</p>
          {question.kind === "final" && result?.primarySearch && (
            <div className="final-search-preview">
              <span className="tiny-label">Generated Search</span>
              <strong>{result.primarySearch.title}</strong>
              <code>{result.primarySearch.query}</code>
            </div>
          )}
        </div>
        <div className="answer-list">
          {question.choices.map((choice) => (
            <button key={choice.label} type="button" className="answer-button" onClick={() => onAnswer(choice)}>
              <span className="selector">&gt;</span> {choice.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
