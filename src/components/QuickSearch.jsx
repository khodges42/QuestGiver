import { languages, interestDefaults, questPresets } from "../data/searchRecipes.js";

export default function QuickSearch({ quick, setQuick, onGenerate }) {
  const toggleInterest = (value) => {
    const has = quick.interests.includes(value);
    setQuick({
      ...quick,
      interests: has ? quick.interests.filter((item) => item !== value) : [...quick.interests, value]
    });
  };

  return (
    <section className="quick-search">
      <div>
        <h2>I Am In A Hurry, Wizard</h2>
        <p>No prophecy. No kobolds. Mostly.</p>
      </div>

      <label className="field">
        <span>Language</span>
        <select value={quick.language} onChange={(event) => setQuick({ ...quick, language: event.target.value })}>
          {languages.map((language) => (
            <option key={language.label} value={language.value}>{language.label}</option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Quest Type</span>
        <select value={quick.preset} onChange={(event) => setQuick({ ...quick, preset: event.target.value })}>
          {Object.entries(questPresets).map(([key, preset]) => (
            <option key={key} value={key}>{preset.label}</option>
          ))}
        </select>
      </label>

      <div className="interest-box">
        <span>Interests</span>
        <div className="chips">
          {interestDefaults.map((interest) => (
            <button
              type="button"
              key={interest.value}
              className={`chip ${quick.interests.includes(interest.value) ? "active" : ""}`}
              onClick={() => toggleInterest(interest.value)}
            >
              {interest.label}
            </button>
          ))}
        </div>
      </div>

      <button className="primary-button" onClick={onGenerate}>Open the Quest Board</button>
    </section>
  );
}
