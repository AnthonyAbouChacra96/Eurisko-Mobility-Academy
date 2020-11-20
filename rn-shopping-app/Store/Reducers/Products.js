import PRODUCTS from "../../Data/dummy-data";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from "../Action/Products";
import Product from "../../Models/Product";
const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      const newProduct = new Product(
        new Date().toString(),
        "u1",
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
      break;
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
			);
			const updatedUserProducts=[...state.userProducts];
			updatedUserProducts[productIndex]=updatedProduct;
			const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.pid
			);
			const updatedAvailableProducts=[...state.availableProducts];
			updatedAvailableProducts[availableProductIndex]= updatedProduct;
			return{...state,availableProducts:updatedAvailableProducts,userProducts:updatedUserProducts}
      break;
    case DELETE_PRODUCT:
      const toreturn = {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.pid
        ),
      };
      console.log(
        "ProductReducer state:\n",
        state,
        "ProductReducer afterDel:\n",
        toreturn
      );
      return toreturn;
      break;
    default:
      console.log("default on product reducer");
      return state;
      break;
  }
};
