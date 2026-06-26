import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../theme/colors";

import OppositesHomeScreen from "../screens/OppositesHomeScreen";
import TopicPickerScreen from "../screens/TopicPickerScreen";
import OppositeCardsScreen from "../screens/OppositeCardsScreen";
import GamePickerScreen from "../screens/GamePickerScreen";
import OppositeGameScreen from "../screens/OppositeGameScreen";
import ProgressScreen from "../screens/ProgressScreen";
import ParentSettingsScreen from "../screens/ParentSettingsScreen";

const Stack = createNativeStackNavigator();

// Always extend DefaultTheme so required fields (including fonts) exist.
// Building a theme object from scratch can crash native-stack.
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.card,
    primary: colors.primary,
    text: colors.text,
    border: colors.border,
  },
};

export default function AppNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        initialRouteName="OppositesHome"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: "fade",
        }}
      >
        <Stack.Screen name="OppositesHome" component={OppositesHomeScreen} />
        <Stack.Screen name="TopicPicker" component={TopicPickerScreen} />
        <Stack.Screen name="OppositeCards" component={OppositeCardsScreen} />
        <Stack.Screen name="GamePicker" component={GamePickerScreen} />
        <Stack.Screen name="OppositeGame" component={OppositeGameScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="ParentSettings" component={ParentSettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
