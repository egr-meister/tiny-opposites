import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

/**
 * StatCard
 * A small rounded tile showing one statistic (label + value + emoji).
 */
export default function StatCard({ emoji, value, label, tint }) {
  return (
    <View style={[styles.card, tint ? { backgroundColor: tint } : null]}>
      <Text style={styles.emoji}>{emoji ?? "⭐"}</Text>
      <Text style={styles.value}>{value ?? 0}</Text>
      <Text style={styles.label}>{label ?? ""}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.border,
    paddingVertical: 16,
    paddingHorizontal: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 104,
  },
  emoji: {
    fontSize: 26,
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text,
  },
  label: {
    fontSize: 13,
    color: colors.mutedText,
    textAlign: "center",
    marginTop: 2,
  },
});
