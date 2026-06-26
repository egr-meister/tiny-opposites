// Fullscreen / keep-awake helpers.
// All functions are defensive: if a native API is unavailable on the current
// platform, they degrade to a safe no-op instead of crashing.
import { Platform } from "react-native";
import {
  activateKeepAwakeAsync,
  deactivateKeepAwake,
} from "expo-keep-awake";

const KEEP_AWAKE_TAG = "tiny-opposites-game";

// Sticky immersive fullscreen is configured declaratively via
// react-native-edge-to-edge <SystemBars hidden /> in App.js and on the game
// screen. This helper exists as a safe hook point for any future imperative
// adjustments and currently performs a safe no-op on all platforms.
export function enableStickyImmersiveMode() {
  try {
    if (Platform.OS !== "android") {
      return;
    }
    // Edge-to-edge + hidden SystemBars already provide sticky immersive mode.
    // Nothing imperative is required here; kept as a safe extension point.
    return;
  } catch (e) {
    return;
  }
}

// Activates keep-awake. Use ONLY on the active game screen.
export function activateGameKeepAwake() {
  try {
    activateKeepAwakeAsync(KEEP_AWAKE_TAG);
  } catch (e) {
    // Safe no-op if keep-awake is unavailable.
  }
}

// Deactivates the game keep-awake tag.
export function deactivateGameKeepAwake() {
  try {
    deactivateKeepAwake(KEEP_AWAKE_TAG);
  } catch (e) {
    // Safe no-op.
  }
}

// Alias kept for clarity at call sites that simply want to ensure the screen
// is allowed to sleep again (settings, progress, card screens, etc.).
export function disableKeepAwakeSafely() {
  deactivateGameKeepAwake();
}
