import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

/**
 * OppositePairCard
 * A compact display of an opposite pair, used in summaries and previews.
 */
export default function OppositePairCard({ firstWord, oppositeWord, firstEmoji, oppositeEmoji }) {
  return (
    <View style={styles.card}>
      <View style={styles.side}>
        <Text style={styles.emoji}>{firstEmoji ?? "⭐"}</Text>
        <Text style={styles.word}>{firstWord ?? ""}</Text>
      </View>
      <Text style={styles.slash}>/</Text>
      <View style={styles.side}>
        <Text style={styles.emoji}>{oppositeEmoji ?? "⭐"}</Text>
        <Text style={styles.word}>{oppositeWord ?? ""}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.border,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 6,
  },
  side: {
    alignItems: "center",
    flex: 1,
  },
  emoji: {
    fontSize: 30,
    marginBottom: 4,
  },
  word: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
  },
  slash: {
    fontSize: 22,
    color: colors.mutedText,
    marginHorizontal: 8,
  },
});
