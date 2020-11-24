import React from 'react';
import {createStore,combineReducers,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import  ReduxThunk from 'redux-thunk';
import { View } from 'react-native';
import PlacesNavigator from './Navigation/PlacesNavigator'
import placesReducer from './Store/Reducers/Places';
import {init} from './Helpers/db'
export default function App() {

	init().then(()=>{
		console.log('Initialised databse')
	}).catch(err=>{console.log('Initializing db faild');console.log(err)});
const rootReducer=combineReducers({
	places:placesReducer
});
const store = createStore(rootReducer,applyMiddleware(ReduxThunk));
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
