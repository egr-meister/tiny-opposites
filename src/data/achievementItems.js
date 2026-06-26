// Achievements are simple local learning markers.
// They are NOT rewards and have no money value.
export const ACHIEVEMENT_ITEMS = [
  {
    id: "first_opposite",
    label: "First Opposite Badge",
    emoji: "⭐",
    description: "Answer 1 question correctly.",
  },
  {
    id: "size_helper",
    label: "Size Helper Badge",
    emoji: "🐘",
    description: "Answer 5 Size questions correctly.",
  },
  {
    id: "weather_buddy",
    label: "Weather Buddy Badge",
    emoji: "☀️",
    description: "Answer 5 Weather questions correctly.",
  },
  {
    id: "emotion_learner",
    label: "Emotion Learner Badge",
    emoji: "😊",
    description: "Answer 5 Emotions questions correctly.",
  },
  {
    id: "time_pair",
    label: "Time Pair Badge",
    emoji: "🌙",
    description: "Answer 5 Time questions correctly.",
  },
  {
    id: "opposite_star",
    label: "Opposite Star Badge",
    emoji: "🏅",
    description: "Answer 25 questions correctly.",
  },
];

// Safe getter for nested topic correct counts.
function topicCorrect(stats, topicId) {
  return stats?.byTopic?.[topicId]?.correct ?? 0;
}

// Returns the list of unlocked achievement ids based on stats.
// Always returns an array, even when stats is missing or empty.
export function getUnlockedAchievements(stats) {
  const unlocked = [];
  const totalCorrect = stats?.correct ?? 0;

  if (totalCorrect >= 1) unlocked.push("first_opposite");
  if (topicCorrect(stats, "size") >= 5) unlocked.push("size_helper");
  if (topicCorrect(stats, "weather") >= 5) unlocked.push("weather_buddy");
  if (topicCorrect(stats, "emotions") >= 5) unlocked.push("emotion_learner");
  if (topicCorrect(stats, "time") >= 5) unlocked.push("time_pair");
  if (totalCorrect >= 25) unlocked.push("opposite_star");

  return unlocked;
}

// Returns the achievement item object by id, or undefined.
export function getAchievementItem(achievementId) {
  return ACHIEVEMENT_ITEMS.find((a) => a.id === achievementId);
}
