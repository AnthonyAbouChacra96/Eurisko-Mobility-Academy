import React from 'react';
import {View,Text,StyleSheet, Button,Image} from 'react-native';
import BodyText from '../Components/BodyText';
import TitleText from '../Components/TitleText';
import MainButton from "../Components/MainButton";
import Colors from '../Constants/Color';
const GameOverScreen=(props)=>{
	return (
    <View style={styles.screen}>
      <TitleText>The Game Is Over</TitleText>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/success.png")}
          // source={{
          //   uri:
          //     "https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg",
          // }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your Phone Needed{" "}
          <Text style={styles.highlight}>{props.roundsNumber} </Text>Rounds To
          Guess The Number{" "}
          <Text style={styles.highlight}>{props.userNumber}</Text>
        </BodyText>
      </View>
      <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
    </View>
  );
}
	const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    imageContainer: {
      width: 300,
      height: 300,
      borderRadius: 150,
      borderWidth: 3,
      borderColor: "black",
      overflow: "hidden",
      marginVertical: 30,
		},
		highlight:{
			color:Colors.primary,
			fontFamily:'open-sans-bold'
		},
		resultContainer:{
			width:'80%',
			marginHorizontal:30,
			marginVertical:15
		},
		resultText:{
			textAlign:'center',
			fontSize:20
		}
  });
export default GameOverScreen;