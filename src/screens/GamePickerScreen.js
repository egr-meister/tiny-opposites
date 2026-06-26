import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ScreenContainer from "../components/ScreenContainer";
import GameModeCard from "../components/GameModeCard";
import DifficultyChip from "../components/DifficultyChip";
import AppButton from "../components/AppButton";
import colors from "../theme/colors";
import { GAME_MODES } from "../utils/oppositeGameHelpers";
import { loadAppData } from "../storage/appStorage";

const GAME_MODE_OPTIONS = [
  {
    id: GAME_MODES.FIND_OPPOSITE,
    emoji: "🔎",
    title: "Find the Opposite",
    description: "Look at one word and choose its opposite.",
  },
  {
    id: GAME_MODES.CORRECT_PAIR,
    emoji: "🧩",
    title: "Choose the Correct Pair",
    description: "Choose the pair that belongs together.",
  },
];

const DIFFICULTY_OPTIONS = [
  { id: "easy", label: "Easy", hint: "2 choices" },
  { id: "medium", label: "Medium", hint: "3 choices" },
  { id: "hard", label: "Hard", hint: "4 choices" },
];

export default function GamePickerScreen({ navigation, route }) {
  const topicId = route?.params?.topicId ?? "size";
  const [gameMode, setGameMode] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [error, setError] = useState("");

  useFocusEffect(
    useCallback(() => {
      let active = true;
      loadAppData().then((data) => {
        if (active && !difficulty) {
          // Pre-select the parent's default difficulty.
          setDifficulty(data?.settings?.defaultDifficulty ?? "easy");
        }
      });
      return () => {
        active = false;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  const handleStart = () => {
    if (!gameMode) {
      setError("Please choose a game.");
      return;
    }
    if (!difficulty) {
      setError("Please choose a difficulty.");
      return;
    }
    setError("");
    navigation.navigate("OppositeGame", { topicId, gameMode, difficulty });
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Choose a Game</Text>
      <Text style={styles.subtitle}>Pick a game and a difficulty, then play.</Text>

      <Text style={styles.sectionLabel}>Game</Text>
      {GAME_MODE_OPTIONS.map((mode) => (
        <GameModeCard
          key={mode.id}
          emoji={mode.emoji}
          title={mode.title}
          description={mode.description}
          selected={gameMode === mode.id}
          onPress={() => {
            setGameMode(mode.id);
            setError("");
          }}
        />
      ))}

      <Text style={styles.sectionLabel}>Difficulty</Text>
      <View style={styles.chipRow}>
        {DIFFICULTY_OPTIONS.map((opt) => (
          <DifficultyChip
            key={opt.id}
            label={opt.label}
            hint={opt.hint}
            selected={difficulty === opt.id}
            onPress={() => {
              setDifficulty(opt.id);
              setError("");
            }}
          />
        ))}
      </View>

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <AppButton label="Start Game" emoji="▶️" variant="primary" onPress={handleStart} />
      <AppButton
        label="Back"
        emoji="↩️"
        variant="soft"
        onPress={() => navigation.goBack()}
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
  sectionLabel: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
    marginTop: 10,
    marginBottom: 4,
    marginLeft: 4,
  },
  chipRow: {
    flexDirection: "row",
    marginTop: 4,
    marginBottom: 6,
  },
  errorBox: {
    backgroundColor: "#FBEDEA",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.danger,
    padding: 14,
    marginVertical: 8,
  },
  errorText: {
    color: colors.danger,
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});
