// Answer statistics helpers for Tiny Opposites.
// All functions are defensive: they never return NaN and always merge with
// a full default shape so missing nested values cannot crash the app.

const TOPIC_IDS = ["size", "weather", "emotions", "objects", "time"];
const GAME_MODE_IDS = ["find_opposite", "correct_pair"];

export function createDefaultStats() {
  const byTopic = {};
  TOPIC_IDS.forEach((id) => {
    byTopic[id] = { correct: 0, incorrect: 0 };
  });

  const byGameMode = {};
  GAME_MODE_IDS.forEach((id) => {
    byGameMode[id] = { correct: 0, incorrect: 0 };
  });

  return {
    correct: 0,
    incorrect: 0,
    byTopic,
    byGameMode,
  };
}

// Merges any partial / corrupted stats object onto a fresh default shape.
export function mergeStats(stored) {
  const base = createDefaultStats();
  if (!stored || typeof stored !== "object") {
    return base;
  }

  const merged = createDefaultStats();
  merged.correct = Number.isFinite(stored.correct) ? stored.correct : 0;
  merged.incorrect = Number.isFinite(stored.incorrect) ? stored.incorrect : 0;

  TOPIC_IDS.forEach((id) => {
    const t = stored.byTopic?.[id];
    merged.byTopic[id] = {
      correct: Number.isFinite(t?.correct) ? t.correct : 0,
      incorrect: Number.isFinite(t?.incorrect) ? t.incorrect : 0,
    };
  });

  GAME_MODE_IDS.forEach((id) => {
    const g = stored.byGameMode?.[id];
    merged.byGameMode[id] = {
      correct: Number.isFinite(g?.correct) ? g.correct : 0,
      incorrect: Number.isFinite(g?.incorrect) ? g.incorrect : 0,
    };
  });

  return merged;
}

// Returns a new stats object with the given answer recorded.
export function recordAnswer(stats, topicId, gameMode, isCorrect) {
  const next = mergeStats(stats);
  const safeTopic = TOPIC_IDS.includes(topicId) ? topicId : "size";
  const safeMode = GAME_MODE_IDS.includes(gameMode) ? gameMode : "find_opposite";
  const key = isCorrect ? "correct" : "incorrect";

  next[key] += 1;
  next.byTopic[safeTopic][key] += 1;
  next.byGameMode[safeMode][key] += 1;

  return next;
}

export function getTotalCorrect(stats) {
  return mergeStats(stats).correct;
}

export function getTotalIncorrect(stats) {
  return mergeStats(stats).incorrect;
}

export function getTotalAnswered(stats) {
  const s = mergeStats(stats);
  return s.correct + s.incorrect;
}

export function resetStats() {
  return createDefaultStats();
}
