import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ScreenContainer from "../components/ScreenContainer";
import AppButton from "../components/AppButton";
import StatCard from "../components/StatCard";
import colors from "../theme/colors";
import { loadAppData } from "../storage/appStorage";
import { getTotalCorrect, getTotalIncorrect } from "../utils/statsHelpers";
import { disableKeepAwakeSafely } from "../utils/immersiveHelpers";

export default function OppositesHomeScreen({ navigation }) {
  const [data, setData] = useState(null);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      // Static screen: ensure the device may sleep here.
      disableKeepAwakeSafely();
      loadAppData().then((loaded) => {
        if (active) setData(loaded);
      });
      return () => {
        active = false;
      };
    }, [])
  );

  const stats = data?.stats;
  const progress = data?.progress;
  const correct = getTotalCorrect(stats);
  const incorrect = getTotalIncorrect(stats);
  const topicsExplored = progress?.exploredTopicIds?.length ?? 0;
  const achievements = progress?.unlockedAchievementIds?.length ?? 0;
  const hasProgress = correct + incorrect > 0 || topicsExplored > 0 || achievements > 0;

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.emojiRow}>🐘 ↔ 🐭</Text>
        <Text style={styles.title}>Tiny Opposites</Text>
        <Text style={styles.subtitle}>
          Learn opposite words with happy cards and simple games.
        </Text>
      </View>

      <View style={styles.previewWrap}>
        <Text style={styles.previewTitle}>Learning progress</Text>
        {hasProgress ? (
          <>
            <View style={styles.statRow}>
              <StatCard emoji="✅" value={correct} label="Correct answers" tint="#E7F6EC" />
              <StatCard emoji="🌱" value={incorrect} label="Tried answers" tint="#FBF0E6" />
            </View>
            <View style={styles.statRow}>
              <StatCard emoji="🗂️" value={topicsExplored} label="Topics explored" tint="#EAF1FF" />
              <StatCard emoji="🏅" value={achievements} label="Badges" tint="#FFF6DF" />
            </View>
          </>
        ) : (
          <View style={styles.emptyPreview}>
            <Text style={styles.emptyText}>
              Start learning opposites to see progress here.
            </Text>
          </View>
        )}
      </View>

      <AppButton
        label="Start Learning"
        emoji="🚀"
        variant="primary"
        onPress={() => navigation.navigate("TopicPicker")}
      />
      <AppButton
        label="Opposite Cards"
        emoji="🃏"
        variant="secondary"
        onPress={() => navigation.navigate("TopicPicker", { goTo: "cards" })}
      />
      <AppButton
        label="My Progress"
        emoji="🌟"
        variant="soft"
        onPress={() => navigation.navigate("Progress")}
      />
      <AppButton
        label="Parent Settings"
        emoji="⚙️"
        variant="soft"
        onPress={() => navigation.navigate("ParentSettings")}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: 18,
  },
  emojiRow: {
    fontSize: 34,
    marginBottom: 6,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: colors.primary,
  },
  subtitle: {
    fontSize: 16,
    color: colors.mutedText,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  previewWrap: {
    marginBottom: 14,
  },
  previewTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
    marginLeft: 4,
  },
  statRow: {
    flexDirection: "row",
  },
  emptyPreview: {
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 22,
  },
  emptyText: {
    fontSize: 15,
    color: colors.mutedText,
    textAlign: "center",
  },
});
