import React from 'react';
import{FlatList,Text,StyleSheet,View,Platform} from 'react-native';
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../Components/UI/HeaderButton";
import OrderItem from '../../Components/Shop/OrderItem';
const OrdersScreen= props=>{
	const orders=useSelector(state=>state.orders.orders);
return (
  <FlatList
    data={orders}
    keyExtractor={(item) => item.id}
    renderItem={(itemData) => (
      <OrderItem
        amount={itemData.item.totalAmount}
				date={itemData.item.readableDate}
				items={itemData.item.items}
      />
    )}
  />
);
};
OrdersScreen.navigationOptions=navData=>{
return {
  headerTitle: "Your Orders",
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Menu"
        iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
        onPress={() => {
          navData.navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
  ),
};
};
const styles = StyleSheet.create({

});
export default OrdersScreen;