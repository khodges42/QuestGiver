import { useEffect, useState } from "react";
import { Dice5, FastForward, RotateCcw } from "lucide-react";
import DialogueBox from "./components/DialogueBox.jsx";
import HeroSprite from "./components/HeroSprite.jsx";
import PixelFrame from "./components/PixelFrame.jsx";
import QuickSearch from "./components/QuickSearch.jsx";
import Results from "./components/Results.jsx";
import { heroClasses } from "./data/classes.js";
import { usefulQuestions, nonsenseQuestions } from "./data/questions.js";
import { buildGithubSearchUrl, interestDefaults, questPresets } from "./data/searchRecipes.js";
import { curatedQuests } from "./data/curatedQuests.js";
import "./styles.css";

const STORAGE_KEY = "questgiver:v0.2";

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function sample(items, count) {
  return shuffle(items).slice(0, count);
}

function classQuestion() {
  return {
    id: "hero-class",
    kind: "class",
    text: "I see you are a hero... but what kind of hero are you?",
    choices: heroClasses.map((hero) => ({
      label: `${hero.title} — ${hero.role}`,
      selectedClass: hero,
      tags: hero.tags
    }))
  };
}

function finalSearchQuestion() {
  return {
    id: "final-search",
    kind: "final",
    text: "The quest board is ready. Shall I open the gate, or draw you a map first?",
    choices: [
      { label: "Open the Search", action: "openSearch" },
      { label: "Show Me a Map", action: "showMap" }
    ]
  };
}

function makeQuestionRun() {
  const useful = sample(usefulQuestions, 4).map((question) => ({ ...question, kind: "useful" }));
  const nonsense = sample(nonsenseQuestions, 1).map((question) => ({ ...question, kind: "nonsense" }));
  return [classQuestion(), ...shuffle([...useful, ...nonsense]), finalSearchQuestion()];
}

function tagScore(tags, quest) {
  const haystack = new Set([...(quest.tags || []), ...(quest.classHints || [])]);
  return tags.reduce((score, tag) => score + (haystack.has(tag) ? 2 : 0), 0);
}

function buildGeneratedQuests({ selectedClass, answers, quick }) {
  const answerParts = answers.flatMap((answer) => answer.query || []);
  const answerPresets = answers.map((answer) => answer.preset).filter(Boolean);
  const presetKey = quick?.preset || answerPresets[0] || "smallAlive";
  const preset = questPresets[presetKey] || questPresets.smallAlive;
  const quickInterests = quick?.interests || [];
  const quickInterestQueries = quickInterests
    .map((value) => interestDefaults.find((interest) => interest.value === value)?.query)
    .filter(Boolean);

  const languagePart = quick?.language || answerParts.find((part) => String(part).startsWith("language:")) || "";
  const interestParts = quickInterestQueries.length
    ? quickInterestQueries
    : answerParts.filter((part) => !String(part).startsWith("language:")).slice(0, 3);

  const baseSearch = buildGithubSearchUrl([
    preset.qualifiers,
    languagePart,
    interestParts
  ]);

  const docsSearch = buildGithubSearchUrl([
    questPresets.docsNeeded.qualifiers,
    languagePart,
    interestParts[0] || ""
  ]);

  const accessibilitySearch = buildGithubSearchUrl([
    questPresets.accessibility.qualifiers,
    languagePart
  ]);

  return [
    {
      id: "generated-main",
      kind: "generated",
      title: preset.label,
      description: preset.description,
      query: baseSearch.query,
      url: baseSearch.url,
      tags: [presetKey, ...(quickInterests.length ? quickInterests : interestParts)]
    },
    {
      id: "generated-docs",
      kind: "generated",
      title: "The README Is Dusty",
      description: "Docs-oriented projects where a careful contributor can be unusually useful.",
      query: docsSearch.query,
      url: docsSearch.url,
      tags: ["documentation", "docs", "beginner"]
    },
    {
      id: "generated-accessibility",
      kind: "generated",
      title: "Accessibility Needed",
      description: "A useful doorway for Paladins, Clerics, and anyone who believes software should let people in.",
      query: accessibilitySearch.query,
      url: accessibilitySearch.url,
      tags: ["accessibility", "frontend", "public-good"]
    }
  ];
}

function makeResult({ selectedClass, answers = [], quick = null, randomOnly = false }) {
  const classTags = selectedClass?.tags || [];
  const answerTags = answers.flatMap((answer) => answer.tags || []);
  const quickTags = quick?.interests || [];
  const tags = [...new Set([...classTags, ...answerTags, ...quickTags])];

  const generated = buildGeneratedQuests({ selectedClass, answers, quick });

  const rankedCurated = [...curatedQuests]
    .map((quest) => ({ quest, score: tagScore(tags, quest) + (quest.type === "self" ? 1 : 0) }))
    .sort((a, b) => b.score - a.score)
    .map((item) => ({
      ...item.quest,
      kind: item.quest.type === "self" ? "self" : item.score > 0 ? "curated" : "special"
    }));

  const chosenCurated = randomOnly ? sample(rankedCurated, 2) : rankedCurated.slice(0, 4);

  return {
    title: selectedClass
      ? `${selectedClass.title} of the Open Source Realm`
      : "Adventurer of the Open Source Realm",
    summary: "The Questgiver has studied your answers and produced several doors into neglected software.",
    primarySearch: generated[0],
    quests: [...generated, ...chosenCurated]
  };
}

const defaultQuick = {
  language: "language:Rust",
  preset: "smallAlive",
  interests: ["accessibility"]
};

export default function App() {
  const [mode, setMode] = useState("intro");
  const [selectedClass, setSelectedClass] = useState(null);
  const [questions, setQuestions] = useState(() => makeQuestionRun());
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [quick, setQuick] = useState(defaultQuick);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (stored?.quick) {
        setQuick({ ...defaultQuick, ...stored.quick });
      }
    } catch {
      // Local storage is optional. If it fails, the realm continues.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ quick }));
    } catch {
      // Ignore storage failures.
    }
  }, [quick]);

  const currentQuestion = questions[step];

  const beginAdventure = () => {
    setQuestions(makeQuestionRun());
    setAnswers([]);
    setSelectedClass(null);
    setStep(0);
    setResult(null);
    setMode("dialogue");
  };

  const finishToSearchQuestion = (nextAnswers, nextClass) => {
    const built = makeResult({ selectedClass: nextClass, answers: nextAnswers });
    setResult(built);
  };

  const answerQuestion = (choice) => {
    if (choice.action === "openSearch") {
      const fallback = result || makeResult({ selectedClass, answers });
      window.open(fallback.primarySearch.url, "_blank", "noopener,noreferrer");
      return;
    }

    if (choice.action === "showMap") {
      const fallback = result || makeResult({ selectedClass, answers });
      setResult(fallback);
      setMode("results");
      return;
    }

    const nextClass = choice.selectedClass || selectedClass;
    if (choice.selectedClass) {
      setSelectedClass(choice.selectedClass);
    }

    const nextAnswers = choice.selectedClass ? answers : [...answers, choice];

    if (questions[step + 1]?.kind === "final") {
      finishToSearchQuestion(nextAnswers, nextClass);
    }

    setAnswers(nextAnswers);
    setStep(step + 1);
  };

  const openQuick = () => {
    setMode("quick");
    setResult(null);
  };

  const generateQuick = () => {
    const fallbackClass = heroClasses.find((hero) => hero.id === "backend");
    setSelectedClass(fallbackClass);
    setResult(makeResult({ selectedClass: fallbackClass, answers: [], quick }));
    setMode("results");
  };

  const randomQuest = () => {
    const randomClass = sample(heroClasses, 1)[0];
    const randomAnswers = sample(usefulQuestions, 2).flatMap((question) => sample(question.choices, 1));
    const nonsenseAnswer = sample(nonsenseQuestions, 1).flatMap((question) => sample(question.choices, 1));
    const allAnswers = [...randomAnswers, ...nonsenseAnswer];
    setSelectedClass(randomClass);
    setAnswers(allAnswers);
    setResult(makeResult({ selectedClass: randomClass, answers: allAnswers, randomOnly: true }));
    setMode("results");
  };

  const restart = () => {
    setMode("intro");
    setQuestions(makeQuestionRun());
    setStep(0);
    setAnswers([]);
    setSelectedClass(null);
    setResult(null);
  };

  return (
    <main className="app-shell">
      <div className="bg-image" aria-hidden="true"></div>
      <div className="magic-field" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span><span></span>
      </div>

      <div className="top-actions">
        <button onClick={openQuick}><FastForward size={16} /> I Am In A Hurry, Wizard</button>
        <button onClick={randomQuest}><Dice5 size={16} /> Random Quest</button>
        <button onClick={restart}><RotateCcw size={16} /> Reset</button>
      </div>

      <PixelFrame className="main-panel">
        <header className="site-header">
          <div>
            <span className="kicker">khod.net presents</span>
            <h1>QuestGiver</h1>
          </div>
          <p>A tiny RPG to find your role in the open source journey.</p>
        </header>

        <div className="stage-layout">
          <HeroSprite />

          <div className="content-panel">
            {mode === "intro" && (
              <section className="intro-copy compact-card">
                <div className="speech-bubble">
                  <p>
                    Greetings, traveler. The realm is filled with forgotten software,
                    abandoned documentation, and ancient bugs.
                  </p>
                  <p>Many quests await. The wizard has questions.</p>
                  <div className="intro-actions">
                    <button className="primary-button" onClick={beginAdventure}>
                      Begin Adventure
                    </button>
                    <button className="secondary-button" onClick={openQuick}>
                      I Am In A Hurry, Wizard
                    </button>
                  </div>
                </div>
              </section>
            )}

            {mode === "dialogue" && (
              <DialogueBox
                question={currentQuestion}
                onAnswer={answerQuestion}
                step={step + 1}
                total={questions.length}
                result={result}
              />
            )}

            {mode === "quick" && (
              <QuickSearch quick={quick} setQuick={setQuick} onGenerate={generateQuick} />
            )}

            {mode === "results" && (
              <Results result={result} onRestart={restart} onRandom={randomQuest} />
            )}
          </div>
        </div>
      </PixelFrame>

      <footer className="footer-note">
        <span>Software should be fun. PMA all day.</span>
        <br/>
        <br/>
        <br/>
        <span className="credits">
          Wizard asset pack by <a href="https://pixollie.itch.io" target="_blank" rel="noreferrer">Pixollie</a>.
          Stone wall from <a href="https://cainos.itch.io" target="_blank" rel="noreferrer">Cainos</a>.
          Fonts: Pixelify Sans and Jacquard 12.
        </span>
       
        <span>Check out my other stuff <a href="https://github.com/khodges42/"> on my Github</a> or connect on <a href="https://linkedin.com/in/khodges42">Linkedin</a></span>
      </footer>
    </main>
  );
}
