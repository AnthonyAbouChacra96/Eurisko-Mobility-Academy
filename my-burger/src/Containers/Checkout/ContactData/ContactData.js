import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import Classes from './ContactData.css';
import axios from '../../../axios-orderes';
import Spinner from '../../../Components/UI/Spinner/Spinner';

class ContactData extends Component{
state={
	name:'',
	email:'',
	address:{
		street:'',
		postalcode:''
	},
	loading:false
};
orderHandler=(event)=>{
  event.preventDefault();
  console.log(this.props.ingredients);
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Anthony Abou Chacra",
        address: {
          street: "Teststreet 1",
          zipcode: "41315",
          country: "Lebanon",
        },
        email: "test@test.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
			.then((responce) => {
				this.setState({ loading: false, purchasing: false });
				this.props.history.push('/');

		})
      .catch((error) => this.setState({ loading: false, purchasing: false }));
}
render(){
		let form = (
      <form>
        <input
          className={Classes.Input}
          type="text"
          name="name"
          placeholder="your Name"
        />
        <input
          className={Classes.Input}
          type="text"
          name="email"
          placeholder="your Mail"
        />
        <input
          className={Classes.Input}
          type="text"
          name="street"
          placeholder="your Street"
        />
        <input
          className={Classes.Input}
          type="text"
          name="postal"
          placeholder="your Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
		if(this.state.loading){
			form=<Spinner/>;
		}
return(

	<div className={Classes.ContactData}>
		<h4>Enter Your Contact Data</h4>
		{form}
	</div>
);
}
}
export default ContactData ;