// Opposite word pairs grouped by topic.
// Each item is a calm, child-friendly opposite pair with a short sentence.
// Every "firstWord" is unique across the whole set so prompts are never
// ambiguous ("Find the opposite of <firstWord>").
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
  {
    id: "size_heavy_light",
    topicId: "size",
    firstWord: "Heavy",
    oppositeWord: "Light",
    firstEmoji: "🪨",
    oppositeEmoji: "🪶",
    sentence: "A rock is heavy. A feather is light.",
  },
  {
    id: "size_thick_thin",
    topicId: "size",
    firstWord: "Thick",
    oppositeWord: "Thin",
    firstEmoji: "📚",
    oppositeEmoji: "📄",
    sentence: "A big book is thick. A page is thin.",
  },
  {
    id: "size_wide_narrow",
    topicId: "size",
    firstWord: "Wide",
    oppositeWord: "Narrow",
    firstEmoji: "🚌",
    oppositeEmoji: "🚲",
    sentence: "A bus is wide. A bike is narrow.",
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
  {
    id: "weather_windy_still",
    topicId: "weather",
    firstWord: "Windy",
    oppositeWord: "Still",
    firstEmoji: "🌬️",
    oppositeEmoji: "🍃",
    sentence: "A windy day moves the trees. A still day is quiet.",
  },
  {
    id: "weather_cloudy_clear",
    topicId: "weather",
    firstWord: "Cloudy",
    oppositeWord: "Clear",
    firstEmoji: "☁️",
    oppositeEmoji: "🌈",
    sentence: "A cloudy sky is grey. A clear sky is bright.",
  },
  {
    id: "weather_icy_warm",
    topicId: "weather",
    firstWord: "Icy",
    oppositeWord: "Warm",
    firstEmoji: "🧊",
    oppositeEmoji: "🌞",
    sentence: "Ice is icy and cold. Sunshine feels warm.",
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
  {
    id: "emotions_brave_scared",
    topicId: "emotions",
    firstWord: "Brave",
    oppositeWord: "Scared",
    firstEmoji: "🦁",
    oppositeEmoji: "🙀",
    sentence: "A lion feels brave. A kitten can feel scared.",
  },
  {
    id: "emotions_excited_bored",
    topicId: "emotions",
    firstWord: "Excited",
    oppositeWord: "Bored",
    firstEmoji: "🤩",
    oppositeEmoji: "😑",
    sentence: "A party feels exciting. Waiting can feel boring.",
  },
  {
    id: "emotions_proud_shy",
    topicId: "emotions",
    firstWord: "Proud",
    oppositeWord: "Shy",
    firstEmoji: "😎",
    oppositeEmoji: "🙈",
    sentence: "Proud stands tall. Shy likes to hide.",
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
  {
    id: "objects_hard_soft",
    topicId: "objects",
    firstWord: "Hard",
    oppositeWord: "Soft",
    firstEmoji: "🧱",
    oppositeEmoji: "🧸",
    sentence: "A brick is hard. A teddy is soft.",
  },
  {
    id: "objects_new_old",
    topicId: "objects",
    firstWord: "New",
    oppositeWord: "Old",
    firstEmoji: "✨",
    oppositeEmoji: "🧺",
    sentence: "A new toy shines. An old toy is worn.",
  },
  {
    id: "objects_on_off",
    topicId: "objects",
    firstWord: "On",
    oppositeWord: "Off",
    firstEmoji: "💡",
    oppositeEmoji: "⚫",
    sentence: "A lamp can be on. A lamp can be off.",
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
  {
    id: "time_first_last",
    topicId: "time",
    firstWord: "First",
    oppositeWord: "Last",
    firstEmoji: "🥇",
    oppositeEmoji: "🏁",
    sentence: "The leader is first. The end is last.",
  },
  {
    id: "time_fast_slow",
    topicId: "time",
    firstWord: "Fast",
    oppositeWord: "Slow",
    firstEmoji: "🐇",
    oppositeEmoji: "🐢",
    sentence: "A rabbit is fast. A turtle is slow.",
  },
  {
    id: "time_now_later",
    topicId: "time",
    firstWord: "Now",
    oppositeWord: "Later",
    firstEmoji: "⏰",
    oppositeEmoji: "🗓️",
    sentence: "Now is this moment. Later comes after.",
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
