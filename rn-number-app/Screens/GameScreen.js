import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import Card from "../Components/Card";
import NumberContainer from "../Components/NumberContainer";
import MainButton from "../Components/MainButton";
import DefaultStyles from "../Constants/Default-Styles";
import { Ionicons } from "@expo/vector-icons";
import * as ScreenOrientation from 'expo-screen-orientation';
import BodyText from "../Components/BodyText";
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
const renderListItem = (listLength, itemData) => {
  return (
    <View style={styles.listItem}>
      <BodyText># {listLength - itemData.index}</BodyText>
      <BodyText>{itemData.item}</BodyText>
    </View>
  );
};
const GameScreen = (props) => {

	// ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
	ScreenOrientation.get
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [passedGuesses, setPassedGuesses] = useState([initialGuess.toString()]);
	const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get("window").width
  );
	const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get("window").height
	);
	
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
	const { userChoice, onGameOver } = props;
	
	useEffect(()=>{
		const updateLayout=()=>{
			setAvailableDeviceWidth(Dimensions.get("window").width);
			setAvailableDeviceHeight(Dimensions.get("window").height);
		};
		Dimensions.addEventListener('change',updateLayout);
return(()=>{
	Dimensions.removeEventListener('change',updateLayout);
});

	});

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
    setPassedGuesses((currPastGuess) => [
      nextNumber.toString(),
      ...currPastGuess,
    ]);
  };
let  listContainer=styles.listContainer;
if( availableDeviceWidth > 350){
	listContainer=styles.listContainerBig;
}
  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
        {/* <Card style={styles.buttonContainer}>

        </Card> */}
        <View style={listContainer}>
          {/* <ScrollView contentContainerStyle={styles.list}>
          {passedGuesses.map((guess,index) => renderListItem(guess,passedGuesses.length-index))}
        </ScrollView> */}
          <FlatList
            keyExtractor={(item) => item}
            data={passedGuesses}
            renderItem={renderListItem.bind(this, passedGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

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
      <View style={listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {passedGuesses.map((guess,index) => renderListItem(guess,passedGuesses.length-index))}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={passedGuesses}
          renderItem={renderListItem.bind(this, passedGuesses.length)}
          contentContainerStyle={styles.list}
        />
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
    marginTop: Dimensions.get('window').height> 600 ? 20 : 5,
    width: 400,
    maxWidth: "90%",
  },
  controls: {
    flexDirection: "row",
		justifyContent: "space-around",
		width:'80%',
		alignItems:'center',
  },
  listItem: {
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  listContainer: {
    width: "80%",
    flex: 1,
  },
  listContainerBig: { 
    width: "60%",
    flex: 1,
  },
  list: {
    flexGrow: 1,
    //	alignItems:'center',
    justifyContent: "flex-end",
  },
});
export default GameScreen;
