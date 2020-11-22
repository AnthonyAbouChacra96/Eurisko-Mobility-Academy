import React, { useState, useEffect,useCallback } from "react";
import {
  View,
  FlatList,
  Button,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../Components/UI/HeaderButton";
import ProductItem from "../../Components/Shop/ProductItem";
import * as cartActions from "../../Store/Action/Cart";
import Colors from "../../Constants/Colors";
import * as productsActions from "../../Store/Action/Products";

const ProductsOverviewScreen = (props) => {

	const [isLoading, setIsLOading] = useState(false);
	const [isRefreshing,setIsRefreshing]=useState(false);
	const [error,setError]=useState();
  const products = useSelector((state) => state.products.availableProducts);
	const dispatch = useDispatch();
	
	    const loadProducts =useCallback( async () => {
				setError(null);    
				setIsRefreshing(true);
        try {
          await dispatch(productsActions.fetchProducts());
        } catch (err) {
          setError(err.message);
				}
				setIsRefreshing(false);
      },[dispatch,setIsLOading,setError]);
	useEffect(()=>{
	const willFocusSub=	props.navigation.addListener('willFocus',loadProducts);
		return()=>{
			willFocusSub.remove();
		};
	},[loadProducts]);
  useEffect(() => {
		setIsLOading
		loadProducts().then(()=>{setIsLOading(false);});
  }, [dispatch,loadProducts]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate({
      routeName: "ProductDetail",
      params: {
        productId: id,
        productTitle: title,
      },
    });
	};
	if(error){
		return (
      <View style={styles.centered}>
        <Text>An error occured!!</Text>
				<Button title='Try again' onPress={loadProducts} color={Colors.primary}/>
      </View>
    );
	}
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
	}
	if(!isLoading&&products.length===0){
		return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start Adding some!!</Text>
      </View>
    );
	}
  return (
    <FlatList
		onRefresh={loadProducts}
		refreshing={isRefreshing}
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};
ProductsOverviewScreen.navigationOptions = (NavData) => {
  return {
    headerTitle: "All Products",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            NavData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            NavData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
export default ProductsOverviewScreen;
