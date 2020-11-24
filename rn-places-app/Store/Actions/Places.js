import * as FileSystem from 'expo-file-system';
import{insertPlace,fetchPlaces} from '../../Helpers/db'
export const ADD_PLACE='ADD_PLACE';
export const SET_PLACES = "SET_PLACES";
export const addPlace=(title,image,location)=>{
	return async dispatch=>
	{
		const fileName=image.split('/').pop();
		const newPath=FileSystem.documentDirectory+fileName;
	try{	await FileSystem.moveAsync({
			from:image,
			to:newPath
		});
		const address=location.lat+" some format "+location.lng;
	const dbResult =await insertPlace(title,newPath,address,location.lat,location.lng);
	console.log(dbResult);	
	
	dispatch({ type: ADD_PLACE, placeData: {id:dbResult.insertId, title: title, image: newPath,address:address,coords:{
		lat:location.lat,lng:location.lng,
	} } });
	}catch(err){
			console.log(err);
			throw err;
		}
	
	};
};
export const loadPlaces=()=>{
	return async dispatch=>{
		try{
			const dbResult= await fetchPlaces();
			console.log(dbResult);
			dispatch({type:SET_PLACES,places:dbResult.rows._array});
		}catch(err){
			throw err;
		}
	}
}