import {ADD_ORDER, SET_ORDERS} from '../Action/Order';
import Order from '../../Models/Order';
const initialState={
		orders:[]
};

export default (state=initialState,action)=>{
	switch (action.type) {
		case SET_ORDERS:
			return {
				orders:action.orders
			}
		case ADD_ORDER:
			const newOrder=new Order(action.orderData.id,action.orderData.items,action.orderData.amount,action.orderData.date);
			return{...state,orders:state.orders.concat(newOrder)}
			break;
	
		default:
			return state
			break;
	}
}