import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View, Alert, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import BodyText from "../components/UI/BodyText";
import NumberContainer from "../components/UI/NumberContainer";
import Screen from "../components/UI/Screen";

import MainButton from "../components/UI/MainButton";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNum = Math.floor(Math.random() * (max - min)) + min;
  if (randomNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNum;
  }
};

const GameScreen = (props) => {
  const [curGuess, setCurGuess] = useState(
    generateRandomBetween(1, 100, userChoice)
  );
  const [rounds, setRounds] = useState(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (curGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [curGuess, userChoice, onGameOver]);

  const lowerPressHandler = () => {
    if (curGuess < userChoice) {
      Alert.alert("Don`t lie!", "We know everything", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    currentHigh.current = curGuess;
    setCurGuess(
      generateRandomBetween(currentLow.current, currentHigh.current, curGuess)
    );
    setRounds((curRounds) => curRounds + 1);
  };

  const greaterPressHandler = () => {
    if (curGuess > userChoice) {
      Alert.alert("Don't lie!", "We know everything", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    currentLow.current = curGuess;
    setCurGuess(
      generateRandomBetween(currentLow.current, currentHigh.current, curGuess)
    );
    setRounds((curRounds) => curRounds + 1);
  };

  return (
    <Screen style={styles.screen}>
      <BodyText>Opponent's Guess</BodyText>
      <NumberContainer>{curGuess}</NumberContainer>
      <View style={styles.buttonContainer}>
        <MainButton onPress={lowerPressHandler}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={greaterPressHandler}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
