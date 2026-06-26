import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import colors from "../theme/colors";

/**
 * DifficultyChip
 * A small rounded selectable chip for Easy / Medium / Hard.
 */
export default function DifficultyChip({ label, hint, selected = false, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: selected ? colors.primary : colors.card,
          borderColor: selected ? colors.primary : colors.border,
        },
        pressed ? styles.pressed : null,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={[styles.label, { color: selected ? "#FFFFFF" : colors.text }]}>
        {label}
      </Text>
      {hint ? (
        <Text
          style={[styles.hint, { color: selected ? "#EDEBFF" : colors.mutedText }]}
        >
          {hint}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 2,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 64,
  },
  pressed: {
    opacity: 0.9,
  },
  label: {
    fontSize: 17,
    fontWeight: "700",
  },
  hint: {
    fontSize: 12,
    marginTop: 2,
  },
});
