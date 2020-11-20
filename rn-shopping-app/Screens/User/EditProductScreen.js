import React, { useEffect, useCallback, useReducer } from "react";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../Components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import * as productsAction from "../../Store/Action/Products";
import Input from "../../Components/UI/Input";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        formIsValid: updatedFormIsValid,
        inputValues: updatedValues,
        inputValidities: updatedValidities,
      };
      break;
    default:
      return state;
      break;
  }
};
const EditProductScreen = (props) => {
  const prodId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const dispatch = useDispatch();
  const submitHandelr = useCallback(() => {
    // console.log("form is valid", formState.formIsValid);return;
    if (!formState.formIsValid) {
      Alert.alert("wrong input!", "Pleases check errors in the form", [
        { text: "Okay" },
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        productsAction.updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    } else {
      dispatch(
        productsAction.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, formState]);
  useEffect(() => {
    props.navigation.setParams({ submit: submitHandelr });
  }, [submitHandelr]);

  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = true;
    if (text.trim().length === 0) {
      isValid = false;
    }
    console.log(inputIdentifier, isValid);
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: inputIdentifier,
    });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          lable="Title"
          errorText="Please enter a valid title"
          keyboardType="default"
          autoCapitalize="sentences"
          returnKeyType="next"
          autoCorrect
        />
        <Input
          lable="ImageUrl"
          errorText="Please enter a valid Image Url"
          keyboardType="default"
          returnKeyType="next"
        />
        {editedProduct ? null : (
          <Input
            lable="Price"
            errorText="Please enter a valid price"
            keyboardType="decimal-pad"
            returnKeyType="next"
          />
        )}
        <Input
          lable="Description"
          errorText="Please enter a valid description"
          keyboardType="default"
          autoCapitalize="sentences"
          multiline
          nummberOfLines={3}
          autoCorrect
        />
      </View>
    </ScrollView>
  );
};
EditProductScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("ProductId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  form: { margin: 20 },
});
export default EditProductScreen;
