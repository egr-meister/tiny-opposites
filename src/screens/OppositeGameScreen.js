import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import AnswerCard from "../components/AnswerCard";
import AppButton from "../components/AppButton";
import EmptyState from "../components/EmptyState";
import colors from "../theme/colors";
import { getTopicItem } from "../data/topicItems";
import {
  buildOppositeQuestion,
  getGameModeLabel,
  isCorrectAnswer,
} from "../utils/oppositeGameHelpers";
import { loadAppData, recordLearningAnswer } from "../storage/appStorage";
import { playCorrectSoundIfEnabled } from "../utils/soundHelpers";
import {
  activateGameKeepAwake,
  deactivateGameKeepAwake,
} from "../utils/immersiveHelpers";

const ENCOURAGEMENTS = [
  "Take your time.",
  "Look at both words.",
  "You can try again.",
];

const DIFFICULTY_LABELS = { easy: "Easy", medium: "Medium", hard: "Hard" };

export default function OppositeGameScreen({ navigation, route }) {
  const topicId = route?.params?.topicId ?? "size";
  const gameMode = route?.params?.gameMode ?? "find_opposite";
  const difficulty = route?.params?.difficulty ?? "easy";

  const [question, setQuestion] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);
  const [settings, setSettings] = useState({
    soundEnabled: true,
    answerAnimationEnabled: true,
  });
  const encouragementRef = useRef(pickEncouragement());

  const topic = getTopicItem(topicId);
  const isEasy = difficulty === "easy";

  // Keep awake only while this game screen is mounted.
  useEffect(() => {
    activateGameKeepAwake();
    let active = true;
    loadAppData().then((data) => {
      if (active && data?.settings) {
        setSettings({
          soundEnabled: data.settings.soundEnabled ?? true,
          answerAnimationEnabled: data.settings.answerAnimationEnabled ?? true,
        });
      }
    });
    makeNextQuestion();
    return () => {
      active = false;
      deactivateGameKeepAwake();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function makeNextQuestion() {
    const q = buildOppositeQuestion(topicId, gameMode, difficulty);
    setQuestion(q);
    setSelectedId(null);
    setAnswered(false);
    setWasCorrect(false);
    encouragementRef.current = pickEncouragement();
  }

  async function handleSelect(choiceId) {
    if (answered || !question) {
      return;
    }
    const correct = isCorrectAnswer(choiceId, question.correctAnswerId);
    setSelectedId(choiceId);
    setAnswered(true);
    setWasCorrect(correct);

    if (correct) {
      playCorrectSoundIfEnabled(settings);
    }
    // Persist statistics, topic progress, and achievements.
    await recordLearningAnswer(topicId, gameMode, correct);
  }

  // Safe empty state if a valid question could not be built.
  const choices = question?.choices ?? [];
  if (!question || choices.length === 0) {
    return (
      <ScreenContainer>
        <Text style={styles.title}>Opposites Game</Text>
        <EmptyState
          emoji="🧩"
          title="This game is not ready yet."
          message="Please go back and choose a topic and a game."
        />
        <AppButton
          label="Back to Games"
          emoji="↩️"
          variant="primary"
          onPress={() => navigation.goBack()}
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.metaRow}>
        <Text style={styles.metaChip}>
          {topic?.emoji ?? "⭐"} {topic?.label ?? "Topic"}
        </Text>
        <Text style={styles.metaChip}>{getGameModeLabel(gameMode)}</Text>
        <Text style={styles.metaChip}>
          {DIFFICULTY_LABELS[difficulty] ?? "Easy"}
        </Text>
      </View>

      <View style={styles.promptBox}>
        <Text style={styles.prompt}>{question.prompt}</Text>
        {!answered ? (
          <Text style={styles.encouragement}>{encouragementRef.current}</Text>
        ) : null}
      </View>

      {choices.map((choice) => {
        let state = "neutral";
        if (answered) {
          if (choice.id === question.correctAnswerId) {
            state = "correct";
          } else if (choice.id === selectedId) {
            state = "incorrect";
          }
        }
        return (
          <AnswerCard
            key={choice.id}
            label={choice.label}
            emoji={choice.emoji}
            state={state}
            big={isEasy}
            disabled={answered}
            animationEnabled={settings.answerAnimationEnabled}
            onPress={() => handleSelect(choice.id)}
          />
        );
      })}

      {answered ? (
        <View
          style={[
            styles.feedbackBox,
            { borderColor: wasCorrect ? colors.success : colors.orange },
          ]}
        >
          <Text style={styles.feedbackText}>
            {wasCorrect
              ? "Great match! 🎉"
              : "Good try. The answer was: " + (question.correctLabel ?? "") + "."}
          </Text>
        </View>
      ) : null}

      {answered ? (
        <AppButton
          label="Next Question"
          emoji="➡️"
          variant="primary"
          onPress={makeNextQuestion}
        />
      ) : null}

      <AppButton
        label="Back to Games"
        emoji="↩️"
        variant="soft"
        onPress={() => navigation.goBack()}
      />
    </ScreenContainer>
  );
}

function pickEncouragement() {
  const i = Math.floor(Math.random() * ENCOURAGEMENTS.length);
  return ENCOURAGEMENTS[i] ?? ENCOURAGEMENTS[0];
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 12,
  },
  metaChip: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 2,
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
    overflow: "hidden",
  },
  promptBox: {
    backgroundColor: colors.card,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 20,
    marginBottom: 14,
    alignItems: "center",
  },
  prompt: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text,
    textAlign: "center",
  },
  encouragement: {
    fontSize: 15,
    color: colors.mutedText,
    marginTop: 10,
    textAlign: "center",
  },
  feedbackBox: {
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 2,
    padding: 16,
    marginTop: 6,
    marginBottom: 4,
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
  },
});
