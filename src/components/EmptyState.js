import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

/**
 * EmptyState
 * Friendly placeholder shown when there is nothing to display. The app never
 * shows a blank screen.
 */
export default function EmptyState({ emoji = "🌱", title, message }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.emoji}>{emoji}</Text>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
    backgroundColor: colors.card,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: colors.border,
    marginVertical: 12,
  },
  emoji: {
    fontSize: 44,
    marginBottom: 10,
  },
  title: {
    fontSize: 19,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    marginBottom: 6,
  },
  message: {
    fontSize: 15,
    color: colors.mutedText,
    textAlign: "center",
    lineHeight: 21,
  },
});
