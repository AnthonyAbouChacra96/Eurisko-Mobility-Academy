import React, { Component } from 'react';
import Order from '../../Components/Order/Order';
import axios from '../../axios-orderes';
import WithErrorHandler from '../../HOC/WithErrorHandler/WithErrorHandler';

class Orders extends Component{
state={
	orders:[],
	loading:true
}
componentDidMount(){
axios.get('/orders.json').then(res=>{
					const fetchOrders=[];
					for(let key in res.data){
						fetchOrders.push({
							...res.data[key]
							,id:key
						});
					}
					this.setState({loading:false});

}).catch(err=>{
						this.setState({ loading: false });
});
}

render(){
return (
  <div>
    {this.state.orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ))}
  </div>
);

}
}
export default WithErrorHandler (Orders,axios);