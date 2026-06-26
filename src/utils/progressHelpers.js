// Local learning progress helpers.
// Progress is stored only on the device. Achievements are simple learning
// markers with NO money value.
import { getUnlockedAchievements } from "../data/achievementItems";

export function createDefaultProgress() {
  return {
    exploredTopicIds: [],
    unlockedAchievementIds: [],
  };
}

// Merges a partial / corrupted progress object onto a fresh default shape.
export function mergeProgress(stored) {
  const base = createDefaultProgress();
  if (!stored || typeof stored !== "object") {
    return base;
  }
  return {
    exploredTopicIds: Array.isArray(stored.exploredTopicIds)
      ? stored.exploredTopicIds.filter((id) => typeof id === "string")
      : [],
    unlockedAchievementIds: Array.isArray(stored.unlockedAchievementIds)
      ? stored.unlockedAchievementIds.filter((id) => typeof id === "string")
      : [],
  };
}

// Returns a new progress object marking the topic as explored.
export function markTopicExplored(progress, topicId) {
  const next = mergeProgress(progress);
  if (typeof topicId === "string" && !next.exploredTopicIds.includes(topicId)) {
    next.exploredTopicIds = [...next.exploredTopicIds, topicId];
  }
  return next;
}

// Recomputes unlocked achievements from stats and merges them into progress.
export function updateAchievements(progress, stats) {
  const next = mergeProgress(progress);
  const unlocked = getUnlockedAchievements(stats);
  const set = new Set([...next.unlockedAchievementIds, ...unlocked]);
  next.unlockedAchievementIds = Array.from(set);
  return next;
}

export function getAchievementIds(progress) {
  return mergeProgress(progress).unlockedAchievementIds;
}

export function resetProgress() {
  return createDefaultProgress();
}
