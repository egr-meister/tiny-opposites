// Topic categories for Tiny Opposites.
export const TOPIC_ITEMS = [
  {
    id: "size",
    label: "Size",
    emoji: "🐘",
    description: "Learn big, small, tall, and short.",
  },
  {
    id: "weather",
    label: "Weather",
    emoji: "☀️",
    description: "Learn hot, cold, wet, and dry.",
  },
  {
    id: "emotions",
    label: "Emotions",
    emoji: "😊",
    description: "Learn happy, sad, calm, and angry.",
  },
  {
    id: "objects",
    label: "Objects",
    emoji: "📦",
    description: "Learn open, closed, full, and empty.",
  },
  {
    id: "time",
    label: "Time",
    emoji: "🌙",
    description: "Learn day, night, morning, and evening.",
  },
];

// Always returns a valid topic. Falls back to the first topic (Size).
export function getTopicItem(topicId) {
  const found = TOPIC_ITEMS.find((t) => t.id === topicId);
  return found || TOPIC_ITEMS[0];
}
