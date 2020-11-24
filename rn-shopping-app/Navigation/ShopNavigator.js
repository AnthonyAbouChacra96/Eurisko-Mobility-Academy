import React from "react";
import { SafeAreaView, Button, View, Platform } from "react-native";
import { createSwitchNavigator } from "react-navigation";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems,DrawerNavigatorItems } from "react-navigation-drawer";
import ProductsOverviewScreen from "../Screens/Shop/ProductsOverviewScreen";
import ProductDetailScreen from "../Screens/Shop/ProductDetailScreen";
import CartScreen from "../Screens/Shop/CartScreen";
import UserProductsScreen from "../Screens/User/UserProductsScreen";
import Colors from "../Constants/Colors";
import OrdersScreen from "../Screens/Shop/OrdersScreen";
import EditProductScreen from "../Screens/User/EditProductScreen";
import { Ionicons } from "@expo/vector-icons";
import AuthScreen from "../Screens/User/AuthScreen";
import StartupScreen from "../Screens/StartupScreen";
import {useDispatch} from 'react-redux'
import * as authActions from '../Store/Action/Auth';
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-card" : "ios-card"}
          size={23}
          //color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          //color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);
const AdminNavigator = createStackNavigator(
  {
    userProducts: UserProductsScreen,
    editProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          size={23}
          //color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    products: ProductsNavigator,
    orders: OrdersNavigator,
    admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
			const dispatch=useDispatch();
      return (
        <View style={{ flex: 1 ,padding:20}}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props}/>
							<Button title="Logout" color={Colors.primary} onPress={()=>{dispatch(authActions.logout());
						//	props.navigation.navigate('Auth');
							}}/>
          
          </SafeAreaView>
        </View>
      );
    },
  }
);
const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  { defaultNavigationOptions: defaultNavOptions }
);
const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
