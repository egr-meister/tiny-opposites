import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import TopicCard from "../components/TopicCard";
import AppButton from "../components/AppButton";
import colors from "../theme/colors";
import { TOPIC_ITEMS } from "../data/topicItems";
import { markTopicExplored } from "../storage/appStorage";

export default function TopicPickerScreen({ navigation }) {
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    if (!selectedTopicId) {
      setError("Please choose a topic.");
      return;
    }
    setError("");
    // Mark exploration as soon as the child opens a topic's cards.
    await markTopicExplored(selectedTopicId);
    navigation.navigate("OppositeCards", { topicId: selectedTopicId });
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Choose a Topic</Text>
      <Text style={styles.subtitle}>
        Pick a group of opposites to learn together.
      </Text>

      {TOPIC_ITEMS.map((topic) => (
        <TopicCard
          key={topic.id}
          topic={topic}
          selected={selectedTopicId === topic.id}
          onPress={() => {
            setSelectedTopicId(topic.id);
            setError("");
          }}
        />
      ))}

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <AppButton label="Continue" emoji="➡️" variant="primary" onPress={handleContinue} />
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
