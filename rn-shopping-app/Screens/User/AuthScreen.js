import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,Button
} from "react-native";
import Input from "../../Components/UI/Input";
import Card from "../../Components/UI/Card";
import Colors from "../../Constants/Colors";
const AuthScreem = (props) => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={50}
      behavior="padding"
      style={styles.screen}
    >
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id="email"
            label="E-Mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorMessage="Please enter a valid e-mail address"
            onInputChange={() => {}}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTexrtEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorMessage="Please enter a valid password"
            onInputChange={() => {}}
            initialValue=""
          />
          <Button title="Login" color={Colors.primary} onPress={() => {}} />
          <Button
            title="Switch to Sign Up"
            color={Colors.accent}
            onPress={() => {}}
          />
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
screen:{flex:1,justifyContent:'center',alignItems:'center'},
authContainer:{width:'80%',maxWidth:400,maxHeight:400,padding:20}
});
export default AuthScreem;
