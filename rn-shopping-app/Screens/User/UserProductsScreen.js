import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { FlatList,Button, StyleSheet,Alert } from "react-native";
import ProductItem from ".././../Components/Shop/ProductItem";
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../Components/UI/HeaderButton';
import Colors from '../../Constants/Colors';
import * as productsActions from '../../Store/Action/Products';
const UserProductsScreen = (props) => {
	const userProducts = useSelector((state) => state.products.userProducts);
	const dispatch=useDispatch();
	const editProductHandler=(id)=>{
		props.navigation.navigate('editProduct',{productId:id})
	};
		const deleteHandler=(id)=>{
		Alert.alert('AreYou Sure?',' Do You Really want To Delete This Item?',[
		 {text:'No',style:'default'},
		 {text:'Yes',style:'destructive',onPress:() => {
            dispatch(productsActions.deleteProduct(id));
						}
					}
				]);
	};
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => { editProductHandler(itemData.item.id);}}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
          editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={deleteHandler.bind(this,itemData.item.id)}
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
	headerRight:()=>(
		    <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add"
            iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
            onPress={() => {
              navData.navigation.navigate('editProduct');
            }}
          />
        </HeaderButtons>
	)
}
};
const styles = StyleSheet.create({});
export default UserProductsScreen;
