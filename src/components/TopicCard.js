import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import colors, { topicTints } from "../theme/colors";

/**
 * TopicCard
 * A selectable topic tile showing emoji, label, and short description.
 */
export default function TopicCard({ topic, selected = false, onPress }) {
  const tint = topicTints?.[topic?.id] ?? colors.blue;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { borderColor: selected ? colors.primary : colors.border },
        selected ? styles.selected : null,
        pressed ? styles.pressed : null,
      ]}
      accessibilityRole="button"
      accessibilityLabel={topic?.label ?? "Topic"}
    >
      <View style={[styles.emojiCircle, { backgroundColor: tint }]}>
        <Text style={styles.emoji}>{topic?.emoji ?? "⭐"}</Text>
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.label}>{topic?.label ?? "Topic"}</Text>
        <Text style={styles.description}>{topic?.description ?? ""}</Text>
      </View>
      {selected ? <Text style={styles.check}>✅</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 22,
    borderWidth: 2,
    padding: 16,
    marginVertical: 8,
    minHeight: 88,
  },
  selected: {
    backgroundColor: "#F3F1FF",
  },
  pressed: {
    opacity: 0.9,
  },
  emojiCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  emoji: {
    fontSize: 30,
  },
  textWrap: {
    flex: 1,
  },
  label: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: colors.mutedText,
  },
  check: {
    fontSize: 22,
    marginLeft: 8,
  },
});
