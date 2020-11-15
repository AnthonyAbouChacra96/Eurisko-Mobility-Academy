import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { CATEGORIES } from "../Data/dummy-data";
import CategoryGridTile from "../Components/CategoryGridTile";

const CategoryScreen = (props) => {
  // console.log(props);
  const renderGridItem = (itemData) => {
    return (
      <CategoryGridTile
				title={itemData.item.title}
				color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "categoryMeals",
            params: { categoryId: itemData.item.id },
          });
        }}
      />
    );
  };
  return (
    // <View style={styles.screen}>
    //   <Text>The Categories Screen</Text>
    // 	<Button title='Go to meals' onPress={()=>{
    // 		props.navigation.navigate({ routeName: "categoryMeals" });
    // 	}}/>

    // </View>
    <FlatList
      keyExtractor={(item, index) => item.id}
      numColumns={2}
      data={CATEGORIES}
      renderItem={renderGridItem}
    />
  );
};
CategoryScreen.navigationOptions = {
  headerTitle: "Meal Categories",
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default CategoryScreen;
