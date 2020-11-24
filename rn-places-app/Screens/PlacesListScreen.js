import React,{useEffect} from 'react';
import {View,Text,StyleSheet,FlatList,Platform} from 'react-native';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../Components/HeaderButton';
import { useSelector,useDispatch}from 'react-redux';
import PlaceItem from'../Components/PlaceItem';
import * as placesActions from '../Store/Actions/Places';
const PlacesListScreen = props=>{
	const places=useSelector(state=>state.places.places);
	const dispatch=useDispatch();
	useEffect(()=>{
		dispatch(placesActions.loadPlaces());
	},[dispatch]);
	console.log(places)
return (

  <FlatList
    data={places}
    keyExtractor={(item) => item.id}
    renderItem={(itemData) => (
      <PlaceItem
        image={itemData.item.imageUri}
        title={itemData.item.title}
        address={itemData.item.address}
        onSelect={() => {
          props.navigation.navigate("PlaceDetail", {
            placeTitle: itemData.item.title,
            placeId: itemData.item.id,
          });
        }}
      />
    )}
  />
);
};
PlacesListScreen.navigationOptions=navData=>{
return{	headerTitle:'All Places',
	headerRight: (
		<HeaderButtons HeaderButtonComponent={HeaderButton}>
			<Item title='Add Place' iconName={Platform.OS==='android'?'md-add':'ios-add'} onPress={()=>{navData.navigation.navigate('NewPlace');}} />
		</HeaderButtons>
	),
};
}
const styles=StyleSheet.create({

});
export default PlacesListScreen;