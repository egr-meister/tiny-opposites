import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "../theme/colors";

/**
 * ScreenContainer
 * Wraps screen content with safe-area padding so nothing overlaps notches,
 * camera cutouts, or rounded corners. Optionally scrolls.
 */
export default function ScreenContainer({ children, scroll = true, contentStyle }) {
  const insets = useSafeAreaInsets();
  const padding = {
    paddingTop: (insets?.top ?? 0) + 16,
    paddingBottom: (insets?.bottom ?? 0) + 24,
    paddingLeft: (insets?.left ?? 0) + 20,
    paddingRight: (insets?.right ?? 0) + 20,
  };

  if (scroll) {
    return (
      <View style={styles.root}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, padding, contentStyle]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.root, styles.staticContent, padding, contentStyle]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  staticContent: {
    flex: 1,
  },
});
