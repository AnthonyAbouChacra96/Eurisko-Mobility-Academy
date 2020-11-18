import React from 'react';
import {Platform} from 'react-native';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack';
import ProductsOverviewScreen from '../Screens/Shop/ProductsOverviewScreen';
import ProductDetailScreen from '../Screens/Shop/ProductDetailScreen';
import CartScreen from '../Screens/Shop/CartScreen';
import Colors from '../Constants/Colors';


const ProductsNavigator=createStackNavigator({
ProductsOverview:ProductsOverviewScreen,
ProductDetail:ProductDetailScreen,
Cart:CartScreen,
},{
	defaultNavigationOptions:{
		headerStyle:{
			backgroundColor:Platform.OS==='android'? Colors.primary:''
		},
		headerTitleStyle:{
			fontFamily:'open-sans-bold',
		},
		headerBackTitleStyle:{
			fontFamily:'open-sans',
		},
		headerTintColor:Platform.OS==='android'?'white':Colors.primary,

	}
});

export default createAppContainer(ProductsNavigator);