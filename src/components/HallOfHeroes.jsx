import { ExternalLink } from "lucide-react";
import heroes from "../data/heroes.json";

const repoUrl = "https://github.com/khodges42/questgiver";

export default function HallOfHeroes({ onBack }) {
  return (
    <section className="hall-of-heroes">
      <div className="result-heading">
        <span className="tiny-label">Hall of Heroes</span>
        <h2>Names Etched In The Quest Log</h2>
        <p>
          You can be added here if you contribute. Add your name, quest, and date to the heroes data, then send a pull
          request.
        </p>
      </div>

      <div className="heroes-grid" aria-label="Hall of Heroes entries">
        {heroes.map((hero) => (
          <article className="hero-entry" key={`${hero.name}-${hero.date}`}>
            <div>
              <h3>{hero.name}</h3>
              <p>{hero.quest}</p>
            </div>
            <span>{hero.date}</span>
          </article>
        ))}
      </div>

      <div className="result-actions">
        <button className="secondary-button" type="button" onClick={onBack}>
          Return
        </button>
        <a className="primary-button hero-contribute-link" href={repoUrl} target="_blank" rel="noreferrer">
          Contribute <ExternalLink size={15} />
        </a>
      </div>
    </section>
  );
}
