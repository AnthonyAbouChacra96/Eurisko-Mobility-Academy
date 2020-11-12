import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import Card from "../Components/Card";
import NumberContainer from "../Components/NumberContainer";
import MainButton from "../Components/MainButton";
import DefaultStyles from "../Constants/Default-Styles";
import { Ionicons } from "@expo/vector-icons";
import BodyText from '../Components/BodyText';
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};
const renderListItem = (value,numOfRound) => {
 return  <View key={value} style={styles.listItem}>
    <BodyText># {numOfRound}</BodyText>
    <BodyText>{value}</BodyText>
  </View>;
};
const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [passedGuesses, setPassedGuesses] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userChoice, onGameOver } = props;
  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(passedGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);
  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't Lie", "You Know That This Is Wrong..", [
        { text: "sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    //setRounds(currentRounds=>currentRounds+1);
    setPassedGuesses((currPastGuess) => [nextNumber, ...currPastGuess]);
  };
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {passedGuesses.map((guess,index) => renderListItem(guess,passedGuesses.length-index))}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 400,
    maxWidth: "90%",
	},
	listItem:{
		borderColor:'#ccc',
		padding:15,
		marginVertical:10,
		backgroundColor:'white',
		borderWidth:1,
		flexDirection:'row',
		justifyContent:'space-around',
		width:'60%'
	},
	listContainer:{
		width:'80%',
		flex:1
	},
	list:{
		flexGrow:1,
		alignItems:'center',
		justifyContent:'flex-end'
	}
});
export default GameScreen;
