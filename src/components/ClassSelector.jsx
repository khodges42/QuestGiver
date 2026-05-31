import { heroClasses } from "../data/classes.js";

export default function ClassSelector({ selectedClass, onSelect }) {
  return (
    <section className="class-selector" aria-labelledby="class-heading">
      <h2 id="class-heading">What kind of hero are you?</h2>
      <div className="class-grid">
        {heroClasses.map((hero) => (
          <button
            type="button"
            key={hero.id}
            className={`class-card ${selectedClass?.id === hero.id ? "selected" : ""}`}
            onClick={() => onSelect(hero)}
          >
            <span className="class-emoji">{hero.emoji}</span>
            <span className="class-title">{hero.title}</span>
            <span className="class-role">{hero.role}</span>
            <span className="class-desc">{hero.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
