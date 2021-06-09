import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import Screen from "./components/UI/Screen";

import Header from "./components/Header";
import GameOver from "./screens/GameOver";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [selectedNumber, setSelectedNumber] = useState();
  const [guessedRounds, setGuessedRounds] = useState(0);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const configureNewGameHandler = () => {
    setGuessedRounds(0);
    setSelectedNumber(null);
  };

  const gameOverHandler = (numOfRounds) => {
    setGuessedRounds(numOfRounds);
  };

  const startGameHandler = (userNumber) => {
    setSelectedNumber(userNumber);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (selectedNumber && guessedRounds <= 0) {
    content = (
      <GameScreen userChoice={selectedNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessedRounds > 0) {
    content = (
      <GameOver
        numberOfRound={guessedRounds}
        userNumber={selectedNumber}
        onRestart={configureNewGameHandler}
      />
    );
  }

  return (
    <Screen>
      <Header title="Guess a Number" />
      {content}
    </Screen>
  );
}
