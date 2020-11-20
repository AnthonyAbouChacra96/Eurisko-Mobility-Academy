import { ADD_TO_CART, REMOVE_FROM_CART } from "../Action/Cart";
import CartItem from "../../Models/Cart-Item";
import { ADD_ORDER } from "../Action/Order";
import {DELETE_PRODUCT} from "../Action/Products";
const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;
      let updatedOrNewCardItem;
      let neworold;
      if (state.items[addedProduct.id]) {
        //already have the item in the cart
        updatedOrNewCardItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice
        );
        neworold = "old";
        console.log(
          "product items []",
          updatedOrNewCardItem,
          "neworold",
          neworold
        );
      } else {
        updatedOrNewCardItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice
        );
        neworold = "new";
        console.log(
          "product items []",
          updatedOrNewCardItem,
          "neworold",
          neworold
        );
      } //console.log("entered add to cart ", state);

      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCardItem },
        totalAmount: state.totalAmount + productPrice,
      };

      break;
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
			const currentQuantity = state.items[action.pid].quantity;
			let updatedCardItems;
      if (currentQuantity > 1) {
        //need to reduce it,not erase it
         const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
				);
				updatedCartItems={...state.items,[action.pid]:updatedCartItem}
      } else {
         updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
			}
			return{
				...state,items:updatedCartItems,totalAmount:state.totalAmount-selectedCartItem.productPrice
			};
			break;
			case ADD_ORDER:
				return initialState;
				break;
				case DELETE_PRODUCT:
					if(!state.items[action.pid]){
						return state;
					}
					const updatedItems={...state.items};
					const itemTotal=state.items[action.pid].sum;
					delete updatedItems[action.pid]
					return{...state,items:updatedItems,totalAmount:state.totalAmount-itemTotal}
				break;
    default:
      return state;
      break;
  }
};
