// Local AsyncStorage layer for Tiny Opposites.
// Stores only learning data on the device: answer statistics, topic progress,
// achievements, and parent settings. No personal data, no identifiers, no
// financial data, no tracking.
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDefaultStats, mergeStats, recordAnswer } from "../utils/statsHelpers";
import {
  createDefaultProgress,
  mergeProgress,
  markTopicExplored as markTopicExploredPure,
  updateAchievements,
} from "../utils/progressHelpers";

const STORAGE_KEY = "tiny_opposites_app_data_v1";

export function createDefaultSettings() {
  return {
    soundEnabled: true,
    defaultDifficulty: "easy",
    answerAnimationEnabled: true,
    theme: "light",
  };
}

export function createDefaultAppData() {
  return {
    stats: createDefaultStats(),
    progress: createDefaultProgress(),
    settings: createDefaultSettings(),
  };
}

// Merges any partial / corrupted settings onto a full default shape.
function mergeSettings(stored) {
  const base = createDefaultSettings();
  if (!stored || typeof stored !== "object") {
    return base;
  }
  const allowedDifficulty = ["easy", "medium", "hard"];
  return {
    soundEnabled:
      typeof stored.soundEnabled === "boolean" ? stored.soundEnabled : true,
    defaultDifficulty: allowedDifficulty.includes(stored.defaultDifficulty)
      ? stored.defaultDifficulty
      : "easy",
    answerAnimationEnabled:
      typeof stored.answerAnimationEnabled === "boolean"
        ? stored.answerAnimationEnabled
        : true,
    theme: "light",
  };
}

// Merges any stored blob onto the full default app-data shape.
function mergeAppData(stored) {
  if (!stored || typeof stored !== "object") {
    return createDefaultAppData();
  }
  return {
    stats: mergeStats(stored.stats),
    progress: mergeProgress(stored.progress),
    settings: mergeSettings(stored.settings),
  };
}

// Always returns a complete, valid app-data object. Never throws.
export async function loadAppData() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createDefaultAppData();
    }
    const parsed = JSON.parse(raw);
    return mergeAppData(parsed);
  } catch (e) {
    // Corrupted JSON or read error: fall back to safe defaults.
    return createDefaultAppData();
  }
}

// Persists app data. Returns the merged data that was saved. Never throws.
export async function saveAppData(data) {
  const merged = mergeAppData(data);
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch (e) {
    // Ignore write errors; in-memory state still works for the session.
  }
  return merged;
}

// Records one answer, updates stats + achievements, and persists.
// Returns the updated app data so callers can refresh their UI.
export async function recordLearningAnswer(topicId, gameMode, isCorrect) {
  const data = await loadAppData();
  const nextStats = recordAnswer(data.stats, topicId, gameMode, isCorrect);
  const exploredProgress = markTopicExploredPure(data.progress, topicId);
  const nextProgress = updateAchievements(exploredProgress, nextStats);
  return saveAppData({
    stats: nextStats,
    progress: nextProgress,
    settings: data.settings,
  });
}

// Marks a topic as explored and persists. Returns updated app data.
export async function markTopicExplored(topicId) {
  const data = await loadAppData();
  const nextProgress = markTopicExploredPure(data.progress, topicId);
  return saveAppData({
    stats: data.stats,
    progress: nextProgress,
    settings: data.settings,
  });
}

// Resets only statistics. Achievements are recomputed from cleared stats.
export async function resetLearningStats() {
  const data = await loadAppData();
  const nextStats = createDefaultStats();
  const nextProgress = updateAchievements(
    { ...mergeProgress(data.progress), unlockedAchievementIds: [] },
    nextStats
  );
  return saveAppData({
    stats: nextStats,
    progress: nextProgress,
    settings: data.settings,
  });
}

// Resets statistics + progress + achievements but keeps settings.
export async function resetLearningProgress() {
  const data = await loadAppData();
  return saveAppData({
    stats: createDefaultStats(),
    progress: createDefaultProgress(),
    settings: data.settings,
  });
}

// Updates parent settings (merged) and persists. Returns updated app data.
export async function updateSettings(settings) {
  const data = await loadAppData();
  const nextSettings = mergeSettings({ ...data.settings, ...settings });
  return saveAppData({
    stats: data.stats,
    progress: data.progress,
    settings: nextSettings,
  });
}

// Clears ALL local data and restores default settings.
export async function clearAllData() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // Ignore; we still return defaults below.
  }
  const defaults = createDefaultAppData();
  return saveAppData(defaults);
}
