import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import BodyText from "../components/UI/BodyText";
import TitleText from "../components/UI/TitleText";
import Card from "../components/UI/Card";
import Input from "../components/UI/Input";
import NumberContainer from "../components/UI/NumberContainer";
import Screen from "../components/UI/Screen";

import Colors from "../constants/colors";
import MainButton from "../components/UI/MainButton";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setIsConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid Number", "It has to be a number between 1 and 99", [
        { text: "okay", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }
    setIsConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (isConfirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText>You Selected</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>
          Start Game
        </MainButton>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <Screen style={styles.screen}>
        <TitleText style={styles.title}>Start a New Game!</TitleText>
        <Card style={styles.inputContainer}>
          <BodyText>Select a Number</BodyText>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={resetInputHandler}
                color={Colors.textSecondary}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={Colors.textPrimary}
              />
            </View>
          </View>
        </Card>
        <View>{confirmedOutput}</View>
      </Screen>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    alignItems: "center",
  },
  inputContainer: {
    borderRadius: 5,
    width: "80%",
    minWidth: 300,
    alignItems: "center",
  },
  input: {
    width: 70,
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "80%",
    maxWidth: "95%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    width: "40%",
  },
  summaryContainer: {
    marginTop: 20,
    width: 200,
    alignItems: "center",
  },
});

export default StartGameScreen;
