import React,{useState} from 'react';
import {createStore,combineReducers,applyMiddleware}from'redux';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import productsReducer from './Store/Reducers/Products';
import cartReducer from './Store/Reducers/Cart';
import ShopNavigator from './Navigation/ShopNavigator';
import {AppLoading} from 'expo';
import * as Font from 'expo-font'
import OrderReducer from './Store/Reducers/Order';
import ReduxThunk from 'redux-thunk';
enableScreens();
const rootReducer=combineReducers({
	products:productsReducer,
	cart:cartReducer,
	orders:OrderReducer
});
const store =createStore(rootReducer,applyMiddleware(ReduxThunk));
const fetchFonts=()=>{
	return Font.loadAsync({
    "open-sans": require("./assets/Fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/Fonts/OpenSans-Bold.ttf"),
  });
}
export default function App() {
	const [fontLoaded,setFontLoaded]=useState(false);
	if(!fontLoaded){
return(<AppLoading startAsync={fetchFonts} onFinish={()=>{setFontLoaded(true)}}/>);
	}
  return (
<Provider store={store}><ShopNavigator/></Provider>
  );
}
