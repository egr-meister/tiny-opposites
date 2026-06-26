// Opposite word pairs grouped by topic.
// Each item is a calm, child-friendly opposite pair with a short sentence.
export const OPPOSITE_ITEMS = [
  // ----- Size -----
  {
    id: "size_big_small",
    topicId: "size",
    firstWord: "Big",
    oppositeWord: "Small",
    firstEmoji: "🐘",
    oppositeEmoji: "🐭",
    sentence: "An elephant is big. A mouse is small.",
  },
  {
    id: "size_tall_short",
    topicId: "size",
    firstWord: "Tall",
    oppositeWord: "Short",
    firstEmoji: "🦒",
    oppositeEmoji: "🐢",
    sentence: "A giraffe is tall. A turtle is short.",
  },
  {
    id: "size_long_short",
    topicId: "size",
    firstWord: "Long",
    oppositeWord: "Short",
    firstEmoji: "🐍",
    oppositeEmoji: "🐛",
    sentence: "A snake is long. A worm is short.",
  },

  // ----- Weather -----
  {
    id: "weather_hot_cold",
    topicId: "weather",
    firstWord: "Hot",
    oppositeWord: "Cold",
    firstEmoji: "🔥",
    oppositeEmoji: "❄️",
    sentence: "Soup can be hot. Ice can be cold.",
  },
  {
    id: "weather_wet_dry",
    topicId: "weather",
    firstWord: "Wet",
    oppositeWord: "Dry",
    firstEmoji: "💧",
    oppositeEmoji: "🏜️",
    sentence: "Rain makes things wet. The sun makes things dry.",
  },
  {
    id: "weather_sunny_rainy",
    topicId: "weather",
    firstWord: "Sunny",
    oppositeWord: "Rainy",
    firstEmoji: "☀️",
    oppositeEmoji: "🌧️",
    sentence: "A sunny day is bright. A rainy day is wet.",
  },

  // ----- Emotions -----
  {
    id: "emotions_happy_sad",
    topicId: "emotions",
    firstWord: "Happy",
    oppositeWord: "Sad",
    firstEmoji: "😊",
    oppositeEmoji: "😢",
    sentence: "A smile means happy. A tear means sad.",
  },
  {
    id: "emotions_calm_angry",
    topicId: "emotions",
    firstWord: "Calm",
    oppositeWord: "Angry",
    firstEmoji: "😌",
    oppositeEmoji: "😠",
    sentence: "Calm is gentle and quiet. Angry feels upset.",
  },
  {
    id: "emotions_tired_awake",
    topicId: "emotions",
    firstWord: "Tired",
    oppositeWord: "Awake",
    firstEmoji: "😴",
    oppositeEmoji: "🙂",
    sentence: "Tired wants to sleep. Awake is ready to play.",
  },

  // ----- Objects -----
  {
    id: "objects_open_closed",
    topicId: "objects",
    firstWord: "Open",
    oppositeWord: "Closed",
    firstEmoji: "📂",
    oppositeEmoji: "📁",
    sentence: "An open box shows inside. A closed box is shut.",
  },
  {
    id: "objects_full_empty",
    topicId: "objects",
    firstWord: "Full",
    oppositeWord: "Empty",
    firstEmoji: "🪣",
    oppositeEmoji: "🫙",
    sentence: "A full cup has water. An empty cup has none.",
  },
  {
    id: "objects_clean_dirty",
    topicId: "objects",
    firstWord: "Clean",
    oppositeWord: "Dirty",
    firstEmoji: "✨",
    oppositeEmoji: "🧦",
    sentence: "Clean hands are fresh. Dirty hands need a wash.",
  },

  // ----- Time -----
  {
    id: "time_day_night",
    topicId: "time",
    firstWord: "Day",
    oppositeWord: "Night",
    firstEmoji: "☀️",
    oppositeEmoji: "🌙",
    sentence: "The sun is for day. The moon is for night.",
  },
  {
    id: "time_morning_evening",
    topicId: "time",
    firstWord: "Morning",
    oppositeWord: "Evening",
    firstEmoji: "🌅",
    oppositeEmoji: "🌆",
    sentence: "We wake in the morning. We rest in the evening.",
  },
  {
    id: "time_early_late",
    topicId: "time",
    firstWord: "Early",
    oppositeWord: "Late",
    firstEmoji: "🐓",
    oppositeEmoji: "🦉",
    sentence: "The rooster wakes early. The owl stays up late.",
  },
];

const DEFAULT_TOPIC_ID = "size";

// Returns all opposite items for a topic. Falls back to Size when the topic
// is invalid or has no items, so callers never receive an empty list.
export function getOppositeItemsByTopic(topicId) {
  const items = OPPOSITE_ITEMS.filter((item) => item.topicId === topicId);
  if (items.length > 0) {
    return items;
  }
  return OPPOSITE_ITEMS.filter((item) => item.topicId === DEFAULT_TOPIC_ID);
}

// Returns a single opposite item by id, or undefined if not found.
export function getOppositeItem(itemId) {
  return OPPOSITE_ITEMS.find((item) => item.id === itemId);
}

// Returns a list of opposite items suitable for building a question at the
// given difficulty. Easy/Medium stay inside the topic; Hard mixes categories.
export function getOppositesForDifficulty(topicId, difficulty) {
  const safeDifficulty = difficulty || "easy";
  if (safeDifficulty === "hard") {
    // Hard pulls from the whole pool for more variety (still child-friendly).
    return OPPOSITE_ITEMS.slice();
  }
  return getOppositeItemsByTopic(topicId);
}
