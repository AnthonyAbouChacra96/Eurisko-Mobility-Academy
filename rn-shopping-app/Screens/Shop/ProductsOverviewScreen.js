import React from "react";
import { FlatList, Text, StyleSheet, Platform } from "react-native";
import { useSelector ,useDispatch} from "react-redux";
import ProductItem from "../../Components/Shop/ProductItem";
import * as cartActions from '../../Store/Action/Cart';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../Components/UI/HeaderButton';
const ProductsOverviewScreen = (props) => {
	const products = useSelector((state) => state.products.availableProducts);
	const dispatch=useDispatch();
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {
            props.navigation.navigate({
              routeName: "ProductDetail",
              params: {
                productId: itemData.item.id,
                productTitle: itemData.item.title,
              },
            });
          }}
          onAddToCart={() => {dispatch(cartActions.addToCart(itemData.item))}}
        />
      )}
    />
  );
};
ProductsOverviewScreen.navigationOptions = NavData=>{
return{	headerTitle: "All Products",
	headerRight:()=>(<HeaderButtons HeaderButtonComponent={HeaderButton}>
		<Item title='Cart' iconName={Platform.OS==='android'?'md-cart':'ios-cart'}onPress={()=>{NavData.navigation.navigate('Cart')}}/>
	</HeaderButtons>)
};
};
const styles = StyleSheet.create({});
export default ProductsOverviewScreen;
