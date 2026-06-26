import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

/**
 * OppositeCard
 * A learning card showing two opposite words with emojis and a short sentence.
 */
export default function OppositeCard({ item }) {
  if (!item) {
    return null;
  }

  return (
    <View style={styles.card}>
      <View style={styles.pairRow}>
        <View style={[styles.wordBox, { backgroundColor: colors.blue }]}>
          <Text style={styles.wordEmoji}>{item.firstEmoji ?? "⭐"}</Text>
          <Text style={styles.wordText}>{item.firstWord ?? ""}</Text>
        </View>

        <View style={styles.versusWrap}>
          <Text style={styles.versus}>↔</Text>
        </View>

        <View style={[styles.wordBox, { backgroundColor: colors.pink }]}>
          <Text style={styles.wordEmoji}>{item.oppositeEmoji ?? "⭐"}</Text>
          <Text style={styles.wordText}>{item.oppositeWord ?? ""}</Text>
        </View>
      </View>

      <Text style={styles.sentence}>{item.sentence ?? ""}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 18,
    marginVertical: 10,
  },
  pairRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  wordBox: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  wordEmoji: {
    fontSize: 40,
    marginBottom: 6,
  },
  wordText: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
  },
  versusWrap: {
    paddingHorizontal: 8,
  },
  versus: {
    fontSize: 26,
    color: colors.mutedText,
    fontWeight: "700",
  },
  sentence: {
    marginTop: 14,
    fontSize: 16,
    color: colors.text,
    textAlign: "center",
    lineHeight: 22,
  },
});
