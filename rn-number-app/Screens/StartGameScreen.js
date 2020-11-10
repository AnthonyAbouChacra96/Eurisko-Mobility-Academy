import React from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import Card from '../Components/Card';
const StartGameScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Start A New Game</Text>
      <Card style={styles.inputContainer}>
        <Text>Select A Number</Text>
        <TextInput />
        <View style={styles.buttonContainer}>
          <Button title="Reset" onPress={() => {}} />
          <Button title="Confirm" onPress={() => {}} />
        </View>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
		width:300,
		maxWidth:'80%',
		alignItems:'center',
	},
  buttonContainer: {
		flexDirection:'row',
		width:'100%',
		justifyContent:'space-between',
		paddingHorizontal:15,

	},
});
export default StartGameScreen;