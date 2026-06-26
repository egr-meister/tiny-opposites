// Soft answer animation config.
// Uses only plain React Native Animated values. No heavy libraries, no
// flashing, no stressful motion. Safe in release builds with Hermes.

// Returns timing/scale values for a gentle "pop" feedback animation.
export function getAnswerAnimationConfig() {
  return {
    // Gentle scale-up then settle.
    fromScale: 0.96,
    toScale: 1.0,
    peakScale: 1.06,
    // Fade for soft appearance of feedback text.
    fromOpacity: 0,
    toOpacity: 1,
    // Short, calm durations (milliseconds).
    durationIn: 180,
    durationSettle: 160,
    // Animated.spring config for a soft bounce without overshoot stress.
    spring: {
      friction: 6,
      tension: 60,
      useNativeDriver: true,
    },
  };
}
