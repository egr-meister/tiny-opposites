import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import colors from "../theme/colors";

/**
 * GameModeCard
 * A selectable game-mode tile with emoji, title, and description.
 */
export default function GameModeCard({ emoji, title, description, selected = false, onPress }) {
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
      accessibilityLabel={title}
    >
      <Text style={styles.emoji}>{emoji ?? "🧩"}</Text>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title ?? ""}</Text>
        <Text style={styles.description}>{description ?? ""}</Text>
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
    minHeight: 92,
  },
  selected: {
    backgroundColor: "#F3F1FF",
  },
  pressed: {
    opacity: 0.9,
  },
  emoji: {
    fontSize: 34,
    marginRight: 14,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 19,
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
