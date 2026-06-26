import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SystemBars } from "react-native-edge-to-edge";
import AppNavigator from "./src/navigation/AppNavigator";
import { enableStickyImmersiveMode } from "./src/utils/immersiveHelpers";

/**
 * Tiny Opposites
 * A calm, offline opposites learning app for children ages 3-6.
 * No ads, no purchases, no accounts, no data collection.
 */
export default function App() {
  useEffect(() => {
    // Request fullscreen sticky immersive behavior on Android.
    // Safe no-op if the API is unavailable on the current platform.
    enableStickyImmersiveMode();
  }, []);

  return (
    <SafeAreaProvider>
      {/* Hide status + navigation bars for a focused, child-friendly view.
          System bars may reappear briefly after an edge swipe. */}
      <SystemBars hidden={true} style="dark" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}
