import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

/**
 * ProgressBadge
 * Displays a single achievement badge. Locked badges are softly dimmed.
 * Achievements are simple learning markers and have no money value.
 */
export default function ProgressBadge({ achievement, unlocked = false }) {
  if (!achievement) {
    return null;
  }

  return (
    <View
      style={[
        styles.card,
        unlocked ? styles.unlocked : styles.locked,
      ]}
    >
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: unlocked ? colors.accent : "#ECECEC" },
        ]}
      >
        <Text style={[styles.emoji, unlocked ? null : styles.dim]}>
          {unlocked ? achievement.emoji ?? "🏅" : "🔒"}
        </Text>
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.label}>{achievement.label ?? "Badge"}</Text>
        <Text style={styles.description}>{achievement.description ?? ""}</Text>
        <Text style={[styles.status, { color: unlocked ? colors.success : colors.mutedText }]}>
          {unlocked ? "Unlocked — well done!" : "Keep learning to unlock."}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 14,
    marginVertical: 6,
  },
  unlocked: {
    borderColor: colors.accent,
  },
  locked: {
    opacity: 0.85,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  emoji: {
    fontSize: 26,
  },
  dim: {
    opacity: 0.7,
  },
  textWrap: {
    flex: 1,
  },
  label: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
  },
  description: {
    fontSize: 13,
    color: colors.mutedText,
    marginTop: 2,
  },
  status: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
});
