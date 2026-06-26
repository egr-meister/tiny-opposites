import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import OppositeCard from "../components/OppositeCard";
import AppButton from "../components/AppButton";
import EmptyState from "../components/EmptyState";
import colors from "../theme/colors";
import { getTopicItem } from "../data/topicItems";
import { getOppositeItemsByTopic } from "../data/oppositeItems";

export default function OppositeCardsScreen({ navigation, route }) {
  const topicId = route?.params?.topicId ?? null;

  // If the topic is missing, show a safe empty state instead of crashing.
  if (!topicId) {
    return (
      <ScreenContainer>
        <Text style={styles.title}>Opposite Cards</Text>
        <EmptyState
          emoji="🧭"
          title="This topic is not available."
          message="Please go back and choose a topic to learn."
        />
        <AppButton
          label="Back to Topics"
          emoji="🗂️"
          variant="primary"
          onPress={() => navigation.navigate("TopicPicker")}
        />
      </ScreenContainer>
    );
  }

  const topic = getTopicItem(topicId);
  const items = getOppositeItemsByTopic(topicId);

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.topicEmoji}>{topic?.emoji ?? "⭐"}</Text>
        <Text style={styles.title}>{topic?.label ?? "Opposites"}</Text>
        <Text style={styles.subtitle}>{topic?.description ?? ""}</Text>
      </View>

      {items.length === 0 ? (
        <EmptyState
          emoji="🌱"
          title="No opposite cards in this topic yet."
          message="Try another topic to keep learning."
        />
      ) : (
        items.map((item) => <OppositeCard key={item.id} item={item} />)
      )}

      <AppButton
        label="Start a Game"
        emoji="🧩"
        variant="primary"
        onPress={() => navigation.navigate("GamePicker", { topicId })}
      />
      <AppButton
        label="Back to Topics"
        emoji="🗂️"
        variant="soft"
        onPress={() => navigation.navigate("TopicPicker")}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: 8,
  },
  topicEmoji: {
    fontSize: 40,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
  },
  subtitle: {
    fontSize: 15,
    color: colors.mutedText,
    textAlign: "center",
    marginTop: 4,
  },
});
