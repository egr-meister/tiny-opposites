import React, { useEffect, useRef } from "react";
import { Text, Pressable, Animated, StyleSheet } from "react-native";
import colors from "../theme/colors";
import { getAnswerAnimationConfig } from "../utils/animationHelpers";

/**
 * AnswerCard
 * A tappable answer choice. Shows a gentle scale animation when it becomes
 * the selected answer (correct or incorrect). No flashing; safe in release.
 *
 * state: "neutral" | "correct" | "incorrect"
 * big: render larger cards (used on Easy difficulty)
 * animationEnabled: respect parent setting for the soft animation
 */
export default function AnswerCard({
  label,
  emoji,
  state = "neutral",
  big = false,
  disabled = false,
  animationEnabled = true,
  onPress,
}) {
  const config = getAnswerAnimationConfig();
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (state === "neutral") {
      scale.setValue(1);
      return;
    }
    if (!animationEnabled) {
      scale.setValue(1);
      return;
    }
    // Gentle pop: up to peak, then settle to 1.
    Animated.sequence([
      Animated.timing(scale, {
        toValue: config.peakScale,
        duration: config.durationIn,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: config.spring.friction,
        tension: config.spring.tension,
        useNativeDriver: true,
      }),
    ]).start();
  }, [state, animationEnabled]);

  const palette = getStatePalette(state);

  return (
    <Animated.View style={[styles.wrap, { transform: [{ scale }] }]}>
      <Pressable
        onPress={disabled ? undefined : onPress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.card,
          big ? styles.big : null,
          { backgroundColor: palette.bg, borderColor: palette.border },
          pressed && !disabled ? styles.pressed : null,
        ]}
        accessibilityRole="button"
        accessibilityLabel={label}
      >
        {emoji ? <Text style={[styles.emoji, big ? styles.emojiBig : null]}>{emoji}</Text> : null}
        <Text style={[styles.label, big ? styles.labelBig : null, { color: palette.text }]}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

function getStatePalette(state) {
  switch (state) {
    case "correct":
      return { bg: "#E7F6EC", border: colors.success, text: colors.text };
    case "incorrect":
      // Soft, non-stressful tint for a wrong choice (no harsh red flash).
      return { bg: "#FBEDEA", border: colors.danger, text: colors.text };
    case "neutral":
    default:
      return { bg: colors.card, border: colors.border, text: colors.text };
  }
}

const styles = StyleSheet.create({
  wrap: {
    marginVertical: 8,
  },
  card: {
    borderRadius: 22,
    borderWidth: 2,
    paddingVertical: 20,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 88,
  },
  big: {
    minHeight: 120,
    paddingVertical: 28,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  emoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  emojiBig: {
    fontSize: 52,
  },
  label: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
  },
  labelBig: {
    fontSize: 26,
  },
});
