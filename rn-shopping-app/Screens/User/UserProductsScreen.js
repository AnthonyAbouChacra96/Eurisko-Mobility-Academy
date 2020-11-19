import React from "react";
import { useSelector } from "react-redux";
import { FlatList,Button, StyleSheet } from "react-native";
import ProductItem from ".././../Components/Shop/ProductItem";
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../Components/UI/HeaderButton';
import Colors from '../../Constants/Colors';
const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onselect={() => {}}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
           
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
            
            }}
          />
        </ProductItem>
      )}
    />
  );
};
UserProductsScreen.navigationOptions=navData=>{
return {
  headerTitle: "Your Products",
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
}
};
const styles = StyleSheet.create({});
export default UserProductsScreen;
