import { ExternalLink } from "lucide-react";
import { useState } from "react";

export default function LevelOneGuide({ onContinue }) {
  const [showOpenSource, setShowOpenSource] = useState(false);

  return (
    <section className="level-one-guide dialogue-box" aria-live="polite">
      <div>
        <span className="tiny-label">Level 1 Adventurer</span>
        <p>Fear not. Every legendary maintainer once stared at a blinking cursor and wondered which spell to cast.</p>
      </div>

      {showOpenSource && (
        <div className="wizard-lore">
          <h2>What is open source?</h2>
          <p>
            Open source is like a village spellbook that everyone is allowed to read. The code is visible, so people
            can learn from it, suggest improvements, fix mistakes, and share better versions.
          </p>
          <p>
            You do not need to be the grand archmage to help. A clear bug report, a typo fix, a better explanation, or
            a small test can make the whole village stronger.
          </p>
        </div>
      )}

      <div className="answer-list level-one-options">
        <a className="answer-button" href="https://firstcontributions.github.io/" target="_blank" rel="noreferrer">
          <span className="selector">&gt;</span> How do I get started contributing? <ExternalLink size={15} />
        </a>
        <a className="answer-button" href="https://learngitbranching.js.org/" target="_blank" rel="noreferrer">
          <span className="selector">&gt;</span> I don't know the sacred spells of git <ExternalLink size={15} />
        </a>
        <button type="button" className="answer-button" onClick={() => setShowOpenSource(true)}>
          <span className="selector">&gt;</span> What is open source?
        </button>
        <button type="button" className="answer-button" onClick={onContinue}>
          <span className="selector">&gt;</span> I am ready for the quest board
        </button>
      </div>
    </section>
  );
}
