// Question-building helpers for the Tiny Opposites mini-games.
// Every builder returns a safe, complete question object. They never return
// undefined, never create duplicate choices, and never build ambiguous pairs.
import {
  OPPOSITE_ITEMS,
  getOppositesForDifficulty,
  getOppositeItemsByTopic,
} from "../data/oppositeItems";

export const GAME_MODES = {
  FIND_OPPOSITE: "find_opposite",
  CORRECT_PAIR: "correct_pair",
};

const GAME_MODE_LABELS = {
  find_opposite: "Find the Opposite",
  correct_pair: "Choose the Correct Pair",
};

export function getGameModeLabel(gameMode) {
  return GAME_MODE_LABELS[gameMode] || GAME_MODE_LABELS.find_opposite;
}

export function getChoiceCountForDifficulty(difficulty) {
  switch (difficulty) {
    case "medium":
      return 3;
    case "hard":
      return 4;
    case "easy":
    default:
      return 2;
  }
}

// Fisher-Yates shuffle. Returns a new array and never mutates the input.
export function shuffleArray(items) {
  const arr = Array.isArray(items) ? items.slice() : [];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function isCorrectAnswer(selectedId, correctId) {
  return !!selectedId && !!correctId && selectedId === correctId;
}

function randomId() {
  return "question_" + Math.random().toString(36).slice(2, 10);
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function pickRandom(list) {
  if (!Array.isArray(list) || list.length === 0) return undefined;
  return list[Math.floor(Math.random() * list.length)];
}

// ---------------------------------------------------------------------------
// Find the Opposite
// ---------------------------------------------------------------------------
export function buildFindOppositeQuestion(topicId, difficulty) {
  const safeDifficulty = difficulty || "easy";
  const choiceCount = getChoiceCountForDifficulty(safeDifficulty);

  // Pool the target is drawn from (topic only for easy/medium).
  const targetPool = getOppositeItemsByTopic(topicId);
  const target = pickRandom(targetPool) || OPPOSITE_ITEMS[0];

  const correctChoice = {
    id: target.id + "_opposite",
    label: target.oppositeWord,
    emoji: target.oppositeEmoji,
  };

  // Build the distractor word pool. Easy/Medium stay close to the topic,
  // Hard mixes across all categories.
  const distractorSource = getOppositesForDifficulty(topicId, safeDifficulty);
  const usedLabels = new Set([
    target.firstWord.toLowerCase(),
    target.oppositeWord.toLowerCase(),
  ]);

  const candidates = [];
  distractorSource.forEach((item) => {
    [
      { label: item.firstWord, emoji: item.firstEmoji, id: item.id + "_first" },
      {
        label: item.oppositeWord,
        emoji: item.oppositeEmoji,
        id: item.id + "_opposite",
      },
    ].forEach((c) => {
      const key = c.label.toLowerCase();
      if (!usedLabels.has(key)) {
        usedLabels.add(key);
        candidates.push(c);
      }
    });
  });

  // Top up from the full pool if the topic did not supply enough distractors.
  if (candidates.length < choiceCount - 1) {
    OPPOSITE_ITEMS.forEach((item) => {
      [
        { label: item.firstWord, emoji: item.firstEmoji, id: item.id + "_first" },
        {
          label: item.oppositeWord,
          emoji: item.oppositeEmoji,
          id: item.id + "_opposite",
        },
      ].forEach((c) => {
        const key = c.label.toLowerCase();
        if (!usedLabels.has(key)) {
          usedLabels.add(key);
          candidates.push(c);
        }
      });
    });
  }

  const distractors = shuffleArray(candidates).slice(0, choiceCount - 1);
  const choices = shuffleArray([correctChoice, ...distractors]);

  return {
    id: randomId(),
    topicId: target.topicId,
    gameMode: GAME_MODES.FIND_OPPOSITE,
    difficulty: safeDifficulty,
    prompt: "Find the opposite of " + target.firstWord + ".",
    correctAnswerId: correctChoice.id,
    correctLabel: correctChoice.label,
    choices,
  };
}

// ---------------------------------------------------------------------------
// Choose the Correct Pair
// ---------------------------------------------------------------------------
export function buildCorrectPairQuestion(topicId, difficulty) {
  const safeDifficulty = difficulty || "easy";
  const choiceCount = getChoiceCountForDifficulty(safeDifficulty);

  const targetPool = getOppositeItemsByTopic(topicId);
  const target = pickRandom(targetPool) || OPPOSITE_ITEMS[0];

  // Set of all valid pair labels (both orders) so distractors are never a
  // real opposite pair, keeping questions unambiguous.
  const validPairs = new Set();
  OPPOSITE_ITEMS.forEach((item) => {
    validPairs.add(
      (item.firstWord + "|" + item.oppositeWord).toLowerCase()
    );
    validPairs.add(
      (item.oppositeWord + "|" + item.firstWord).toLowerCase()
    );
  });

  const correctLabel = target.firstWord + " / " + target.oppositeWord;
  const correctChoice = {
    id: "pair_" + slugify(correctLabel),
    label: correctLabel,
    emoji: target.firstEmoji + target.oppositeEmoji,
  };

  const usedChoiceLabels = new Set([correctLabel.toLowerCase()]);
  const pairSource = getOppositesForDifficulty(topicId, safeDifficulty);

  // Build mismatched (incorrect) pairs by combining words from different items.
  const distractors = [];
  const sourceList = pairSource.length > 1 ? pairSource : OPPOSITE_ITEMS;

  for (let i = 0; i < sourceList.length && distractors.length < choiceCount - 1; i++) {
    for (let j = 0; j < sourceList.length && distractors.length < choiceCount - 1; j++) {
      const a = sourceList[i];
      const b = sourceList[j];
      if (a.id === b.id) continue;

      const wordA = a.firstWord;
      const wordB = b.oppositeWord;
      const pairKey = (wordA + "|" + wordB).toLowerCase();
      if (validPairs.has(pairKey)) continue; // skip accidental real pairs

      const label = wordA + " / " + wordB;
      const labelKey = label.toLowerCase();
      if (usedChoiceLabels.has(labelKey)) continue;
      if (wordA.toLowerCase() === wordB.toLowerCase()) continue;

      usedChoiceLabels.add(labelKey);
      distractors.push({
        id: "pair_" + slugify(label),
        label,
        emoji: a.firstEmoji + b.oppositeEmoji,
      });
    }
  }

  // Fallback: if not enough mismatched pairs were found, widen the source.
  if (distractors.length < choiceCount - 1) {
    for (let i = 0; i < OPPOSITE_ITEMS.length && distractors.length < choiceCount - 1; i++) {
      for (let j = 0; j < OPPOSITE_ITEMS.length && distractors.length < choiceCount - 1; j++) {
        const a = OPPOSITE_ITEMS[i];
        const b = OPPOSITE_ITEMS[j];
        if (a.id === b.id) continue;
        const label = a.firstWord + " / " + b.oppositeWord;
        const labelKey = label.toLowerCase();
        const pairKey = (a.firstWord + "|" + b.oppositeWord).toLowerCase();
        if (validPairs.has(pairKey)) continue;
        if (usedChoiceLabels.has(labelKey)) continue;
        usedChoiceLabels.add(labelKey);
        distractors.push({
          id: "pair_" + slugify(label),
          label,
          emoji: a.firstEmoji + b.oppositeEmoji,
        });
      }
    }
  }

  const choices = shuffleArray([correctChoice, ...distractors.slice(0, choiceCount - 1)]);

  return {
    id: randomId(),
    topicId: target.topicId,
    gameMode: GAME_MODES.CORRECT_PAIR,
    difficulty: safeDifficulty,
    prompt: "Which pair belongs together?",
    correctAnswerId: correctChoice.id,
    correctLabel: correctChoice.label,
    choices,
  };
}

// Routes to the right builder. Always returns a valid question object.
export function buildOppositeQuestion(topicId, gameMode, difficulty) {
  const safeTopic = topicId || "size";
  const safeMode =
    gameMode === GAME_MODES.CORRECT_PAIR
      ? GAME_MODES.CORRECT_PAIR
      : GAME_MODES.FIND_OPPOSITE;
  const safeDifficulty = difficulty || "easy";

  if (safeMode === GAME_MODES.CORRECT_PAIR) {
    return buildCorrectPairQuestion(safeTopic, safeDifficulty);
  }
  return buildFindOppositeQuestion(safeTopic, safeDifficulty);
}
