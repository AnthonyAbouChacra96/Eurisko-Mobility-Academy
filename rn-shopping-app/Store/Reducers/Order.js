import {ADD_ORDER} from '../Action/Order';
import Order from '../../Models/Order';
const initialState={
		orders:[]
};

export default (state=initialState,action)=>{
	switch (action.type) {
		case ADD_ORDER:
			const newOrder=new Order(new Date().toString(),action.orderData.items,action.orderData.amount,new Date());
			return{...state,orders:state.orders.concat(newOrder)}
			break;
	
		default:
			return state
			break;
	}
}