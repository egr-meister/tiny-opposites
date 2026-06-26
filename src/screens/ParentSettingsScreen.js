import React, { useState, useCallback } from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ScreenContainer from "../components/ScreenContainer";
import DifficultyChip from "../components/DifficultyChip";
import AppButton from "../components/AppButton";
import colors from "../theme/colors";
import {
  loadAppData,
  updateSettings,
  clearAllData,
} from "../storage/appStorage";
import { disableKeepAwakeSafely } from "../utils/immersiveHelpers";

function Toggle({ value, onChange }) {
  const options = [
    { id: true, label: "On" },
    { id: false, label: "Off" },
  ];
  return (
    <View style={styles.toggleRow}>
      {options.map((opt) => {
        const selected = value === opt.id;
        return (
          <Pressable
            key={String(opt.id)}
            onPress={() => onChange(opt.id)}
            style={[
              styles.toggleBtn,
              {
                backgroundColor: selected ? colors.primary : colors.card,
                borderColor: selected ? colors.primary : colors.border,
              },
            ]}
            accessibilityRole="button"
            accessibilityLabel={opt.label}
          >
            <Text
              style={[
                styles.toggleText,
                { color: selected ? "#FFFFFF" : colors.text },
              ]}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function ParentSettingsScreen({ navigation }) {
  const [settings, setSettings] = useState({
    soundEnabled: true,
    defaultDifficulty: "easy",
    answerAnimationEnabled: true,
    theme: "light",
  });

  useFocusEffect(
    useCallback(() => {
      let active = true;
      disableKeepAwakeSafely();
      loadAppData().then((data) => {
        if (active && data?.settings) {
          setSettings(data.settings);
        }
      });
      return () => {
        active = false;
      };
    }, [])
  );

  const apply = async (patch) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    await updateSettings(patch);
  };

  const handleClearAll = () => {
    Alert.alert(
      "Clear All Data",
      "Are you sure you want to delete all local opposites progress?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            const data = await clearAllData();
            if (data?.settings) {
              setSettings(data.settings);
            }
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Parent Settings</Text>
      <Text style={styles.subtitle}>Simple settings for a calm experience.</Text>

      {/* Sound */}
      <View style={styles.card}>
        <Text style={styles.settingLabel}>Sound</Text>
        <Toggle
          value={settings.soundEnabled}
          onChange={(v) => apply({ soundEnabled: v })}
        />
        <Text style={styles.help}>
          Gentle correct-answer sounds can be turned off anytime.
        </Text>
      </View>

      {/* Default Difficulty */}
      <View style={styles.card}>
        <Text style={styles.settingLabel}>Default Difficulty</Text>
        <View style={styles.chipRow}>
          {[
            { id: "easy", label: "Easy", hint: "2 choices" },
            { id: "medium", label: "Medium", hint: "3 choices" },
            { id: "hard", label: "Hard", hint: "4 choices" },
          ].map((opt) => (
            <DifficultyChip
              key={opt.id}
              label={opt.label}
              hint={opt.hint}
              selected={settings.defaultDifficulty === opt.id}
              onPress={() => apply({ defaultDifficulty: opt.id })}
            />
          ))}
        </View>
      </View>

      {/* Answer Animation */}
      <View style={styles.card}>
        <Text style={styles.settingLabel}>Answer Animation</Text>
        <Toggle
          value={settings.answerAnimationEnabled}
          onChange={(v) => apply({ answerAnimationEnabled: v })}
        />
        <Text style={styles.help}>
          Answer animation is soft and can be turned off.
        </Text>
      </View>

      {/* Theme */}
      <View style={styles.card}>
        <Text style={styles.settingLabel}>Theme</Text>
        <Text style={styles.readonlyValue}>Light</Text>
        <Text style={styles.help}>
          Tiny Opposites uses a bright but calm light theme.
        </Text>
      </View>

      {/* Achievement progress */}
      <View style={styles.card}>
        <Text style={styles.settingLabel}>Achievement Progress</Text>
        <Text style={styles.help}>
          Achievements are simple learning markers inside the app. They have no
          money value.
        </Text>
      </View>

      {/* Screen mode */}
      <View style={styles.card}>
        <Text style={styles.settingLabel}>Screen Mode</Text>
        <Text style={styles.help}>
          This app uses portrait fullscreen mode for a focused child-friendly
          experience.
        </Text>
      </View>

      {/* Privacy */}
      <View style={styles.card}>
        <Text style={styles.settingLabel}>Privacy Note</Text>
        <Text style={styles.help}>
          Tiny Opposites does not collect personal data. The app works offline
          and stores topic progress, answer statistics, achievements, and
          settings only on this device.
        </Text>
      </View>

      {/* Child-friendly */}
      <View style={styles.card}>
        <Text style={styles.settingLabel}>Child-Friendly Note</Text>
        <Text style={styles.help}>
          There are no ads, purchases, accounts, social sharing, leaderboards,
          coins, bonuses, jackpots, or real money rewards.
        </Text>
      </View>

      <AppButton
        label="Clear All Data"
        emoji="🧹"
        variant="danger"
        onPress={handleClearAll}
      />
      <AppButton
        label="Back Home"
        emoji="🏠"
        variant="soft"
        onPress={() => navigation.navigate("OppositesHome")}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: colors.mutedText,
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 16,
    marginVertical: 7,
  },
  settingLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 10,
  },
  help: {
    fontSize: 14,
    color: colors.mutedText,
    marginTop: 10,
    lineHeight: 20,
  },
  readonlyValue: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
  },
  toggleRow: {
    flexDirection: "row",
  },
  toggleBtn: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 2,
    paddingVertical: 14,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "700",
  },
  chipRow: {
    flexDirection: "row",
  },
});
