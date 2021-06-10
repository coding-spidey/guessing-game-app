import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";

import BodyText from "../components/UI/BodyText";
import MainButton from "../components/UI/MainButton";
import Screen from "../components/UI/Screen";
import TitleText from "../components/UI/TitleText";

import colors from "../constants/colors";

const GameOver = (props) => {
  return (
    <ScrollView>
      <Screen style={styles.screen}>
        <TitleText style={styles.text}>The Game is over</TitleText>
        <View style={styles.ImageContainer}>
          <Image source={require("../assets/nice.gif")} style={styles.image} />
        </View>
        <BodyText style={styles.text}>
          Your phone needed{" "}
          <Text style={styles.highlight}>{props.numberOfRound}</Text> rounds to
          guess the number{" "}
          <Text style={styles.highlight}>{props.userNumber}</Text>
        </BodyText>
        <MainButton onPress={props.onRestart}>New Game</MainButton>
      </Screen>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
  },
  text: {
    color: "white",
    marginVertical: 10,
    textAlign: "center",
  },
  ImageContainer: {
    marginVertical: 30,
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "white",
    overflow: "hidden",
  },
  highlight: {
    color: colors.textPrimary,
    fontFamily: "open-sans-bold",
    marginHorizontal: 30,
  },
});

export default GameOver;
