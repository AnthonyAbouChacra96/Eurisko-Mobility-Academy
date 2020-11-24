import React, { useState,useEffect } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import Colors from "../constants/Colors";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import mapPreview from "./MapPreview";
import MapPreview from "./MapPreview";
const LocationPicker = (props) => {
  const [pickedLocation, setPickedLocation] = useState();
	const [isFetching, setIsFetching] = useState(false);
	const mapPickedLocation=props.navigation.getParam('pickedLocation');
	const {onLocationPicked}=props;
useEffect(()=>{
	if(mapPickedLocation){
		setPickedLocation(mapPickedLocation);			
		props.onLocationPicked(mapPickedLocation);
	}
},[mapPickedLocation,onLocationPicked]);

  const verifypermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app ",
        [{ Text: "Okay" }]
      );
      return false;
    }
    return true;
  };
  const getLocationHandler = async () => {
    const hasPermission = await verifypermissions();
    if (!hasPermission) return;
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      console.log(location);
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
			});
			props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert,
        alert(
          "could not fetch location",
          "Please try again later or pick a location on the map",
          [{ text: "Okay" }]
        );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {props.navigation.navigate('Map');};

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No locaton chosen yet!</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get User Loaction"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick On Map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
export default LocationPicker;
