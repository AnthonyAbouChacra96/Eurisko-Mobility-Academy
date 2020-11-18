import React from "react";
import { View, Text, StyleSheet, Flatlist, Button } from "react-native";
import  Colors  from "../../Constants/Colors";
import { useSelector } from "react-redux";

const CartScreen = (props) => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Totals:<Text style={styles.amount}>${cartTotalAmount}</Text>
          <Button title="Oder Now" onPress={() => {}} />
        </Text>
      </View>
      <View>
        <Text>Cart Items</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: { margin: 20 },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    elevation: 5,
  },
  summaryText: {fontFamily:'open-sans-bold',fontSize:18},
  amount: {color:Colors.primary},
});
export default CartScreen;
