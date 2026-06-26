import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ScreenContainer from "../components/ScreenContainer";
import StatCard from "../components/StatCard";
import ProgressBadge from "../components/ProgressBadge";
import EmptyState from "../components/EmptyState";
import AppButton from "../components/AppButton";
import colors from "../theme/colors";
import { TOPIC_ITEMS } from "../data/topicItems";
import { ACHIEVEMENT_ITEMS } from "../data/achievementItems";
import { loadAppData, resetLearningProgress } from "../storage/appStorage";
import {
  getTotalCorrect,
  getTotalIncorrect,
  getTotalAnswered,
} from "../utils/statsHelpers";
import { disableKeepAwakeSafely } from "../utils/immersiveHelpers";

export default function ProgressScreen({ navigation }) {
  const [data, setData] = useState(null);

  const reload = useCallback(() => {
    let active = true;
    disableKeepAwakeSafely();
    loadAppData().then((loaded) => {
      if (active) setData(loaded);
    });
    return () => {
      active = false;
    };
  }, []);

  useFocusEffect(reload);

  const stats = data?.stats;
  const progress = data?.progress;
  const correct = getTotalCorrect(stats);
  const incorrect = getTotalIncorrect(stats);
  const total = getTotalAnswered(stats);
  const topicsExplored = progress?.exploredTopicIds?.length ?? 0;
  const unlockedIds = progress?.unlockedAchievementIds ?? [];
  const hasProgress = total > 0 || topicsExplored > 0 || unlockedIds.length > 0;

  const handleReset = () => {
    Alert.alert(
      "Reset Progress",
      "Are you sure you want to reset opposites progress?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            const updated = await resetLearningProgress();
            setData(updated);
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>My Progress</Text>
      <Text style={styles.subtitle}>
        Your learning progress is saved only on this device.
      </Text>

      {!hasProgress ? (
        <EmptyState
          emoji="🌱"
          title="No opposites progress yet."
          message="Play a game or explore cards to start your learning progress."
        />
      ) : (
        <>
          <View style={styles.statRow}>
            <StatCard emoji="✅" value={correct} label="Correct answers" tint="#E7F6EC" />
            <StatCard emoji="🌱" value={incorrect} label="Tried answers" tint="#FBF0E6" />
          </View>
          <View style={styles.statRow}>
            <StatCard emoji="📊" value={total} label="Total answers" tint="#EFEAFB" />
            <StatCard emoji="🗂️" value={topicsExplored} label="Topics explored" tint="#EAF1FF" />
          </View>

          <Text style={styles.sectionLabel}>Progress by topic</Text>
          {TOPIC_ITEMS.map((topic) => {
            const t = stats?.byTopic?.[topic.id] ?? { correct: 0, incorrect: 0 };
            return (
              <View key={topic.id} style={styles.topicRow}>
                <Text style={styles.topicName}>
                  {topic.emoji} {topic.label}
                </Text>
                <Text style={styles.topicStat}>
                  ✅ {t.correct ?? 0}   🌱 {t.incorrect ?? 0}
                </Text>
              </View>
            );
          })}

          <Text style={styles.sectionLabel}>
            Badges ({unlockedIds.length}/{ACHIEVEMENT_ITEMS.length})
          </Text>
          {ACHIEVEMENT_ITEMS.map((a) => (
            <ProgressBadge
              key={a.id}
              achievement={a}
              unlocked={unlockedIds.includes(a.id)}
            />
          ))}

          <Text style={styles.note}>
            Badges are simple learning markers inside the app. They have no money value.
          </Text>
        </>
      )}

      <AppButton label="Reset Progress" emoji="🔄" variant="danger" onPress={handleReset} />
      <AppButton
        label="Back Home"
        emoji="🏠"
        variant="soft"
        onPress={() => navigation.navigate("OppositesHome")}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: colors.mutedText,
    marginBottom: 12,
  },
  statRow: {
    flexDirection: "row",
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginTop: 16,
    marginBottom: 6,
    marginLeft: 4,
  },
  topicRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 4,
  },
  topicName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  topicStat: {
    fontSize: 15,
    color: colors.text,
  },
  note: {
    fontSize: 13,
    color: colors.mutedText,
    textAlign: "center",
    marginTop: 12,
    marginBottom: 4,
    paddingHorizontal: 8,
  },
});
