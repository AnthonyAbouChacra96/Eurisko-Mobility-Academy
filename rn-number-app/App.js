import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "./Components/Header";
import StartGameScreen from "./Screens/StartGameScreen";
import GameScreen from "./Screens/GameScreen";
import GameOverScreen from "./Screens/GameOverScreen";
import * as Font from "expo-font";
import { AppLoading } from "expo";

const fetchFonts = () => {
  Font.loadAsync({
    "open-sans": require("./assets/Fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/Fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guesssRounds, setGuessRounds] = useState(0);
	const [dataLoaded, setDataLoaded] = useState(false);
	
	if(!dataLoaded){
		return(<AppLoading startAsync={fetchFonts} onFinish={()=>setDataLoaded(true)} onError={(err)=>console.log(err)} />);
	}

  const configueNewGameHandler = () => {
    setGuessRounds(0);
    setGuessRounds(0);
    setUserNumber(null);
  };
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };
  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };
  let content = <StartGameScreen onStartGame={startGameHandler} />;
  // let content = (
  //   <GameOverScreen
  //     roundsNumber={1}
  //     userNumber={1}
  //     onRestart={configueNewGameHandler}
  //   />
  // );
  if (userNumber && guesssRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guesssRounds > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guesssRounds}
        userNumber={userNumber}
        onRestart={configueNewGameHandler}
      />
    );
  }
  return (
    <View style={styles.screen}>
      <Header title="Guess A Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
