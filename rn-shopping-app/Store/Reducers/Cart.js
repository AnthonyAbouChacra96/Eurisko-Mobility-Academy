import {ADD_TO_CART} from '../Action/Cart';
import CartItem from '../../Models/Cart-Item';
const initialState={
	 items:{},
	 totalAmount:0,
	 
};

export default(state=initialState,action)=>{
switch (action.type) {
	case ADD_TO_CART:
		const addedProduct=action.product;
		const productPrice=addedProduct.price;
		const productTitle=addedProduct.title;
		let updatedOrNewCardItem;
		if(state.items[addedProduct.id]){
			//already have the item in the cart
			const updatedOrNewCardItem=new CartItem(state.items[addedProduct.id].quantity+1,productPrice,productTitle,state.items[addedProduct.id].sum+productPrice);		
		}else{
			const updatedOrNewCardItem=new CartItem(1,productPrice,productTitle,productPrice);
		}		console.log("entered add to cart ", state);
		return{...state,items:{...state.items,[addedProduct.id]:updatedOrNewCardItem},totalAmount:state.totalAmount+productPrice};

		break;

	default:
		return state;
		break;


}
};