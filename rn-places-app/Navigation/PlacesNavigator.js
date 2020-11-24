import React from 'react';
import {Platform} from 'react-native';
import{createAppContainer,createStackNavigator} from 'react-navigation';
import Colors from '../constants/Colors';
import PlacesListScreen from '../Screens/PlacesListScreen';
import PlacesDetailScreen from '../Screens/PlacesDetailScreen';
import NewPlaceScreen from '../Screens/NewPlacesScreen';
import MapScreen from '../Screens/MapScreen';


 const PlacesNavigator = createStackNavigator(
   {
     Places: PlacesListScreen,
     PlaceDetail: PlacesDetailScreen,
     NewPlace: NewPlaceScreen,
     Map: MapScreen,
   },
   {
     defaultNavigationOptions: {
       headerStyle: {
         backgroundColor: Platform.OS === "android" ? Colors.primary : "",
       },
       headerTintColor: Platform.OS === "android" ?'white' :Colors.primary ,
     },
   }
 );
 export default createAppContainer(PlacesNavigator);