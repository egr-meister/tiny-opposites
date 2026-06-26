import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import colors from "../theme/colors";

/**
 * AppButton
 * Large, rounded, child-friendly tap target.
 * variant: "primary" | "secondary" | "soft" | "danger"
 */
export default function AppButton({
  label,
  onPress,
  variant = "primary",
  emoji,
  disabled = false,
  style,
}) {
  const palette = getPalette(variant);

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: palette.bg, borderColor: palette.border },
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={[styles.label, { color: palette.text }]} numberOfLines={2}>
        {emoji ? emoji + "  " : ""}
        {label}
      </Text>
    </Pressable>
  );
}

function getPalette(variant) {
  switch (variant) {
    case "secondary":
      return { bg: colors.secondary, border: colors.secondary, text: "#FFFFFF" };
    case "soft":
      return { bg: colors.card, border: colors.border, text: colors.text };
    case "danger":
      return { bg: colors.danger, border: colors.danger, text: "#FFFFFF" };
    case "primary":
    default:
      return { bg: colors.primary, border: colors.primary, text: "#FFFFFF" };
  }
}

const styles = StyleSheet.create({
  button: {
    minHeight: 64,
    borderRadius: 22,
    borderWidth: 2,
    paddingVertical: 16,
    paddingHorizontal: 22,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
});
