import React, { Component } from "react";
import Aux from "../../HOC/Auxiliary/Auxiliary";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_Prices={
	salad :0.5,
	cheese:0.4,
	meat:1.3,
	bacon:0.7
}

class BurgerBuilder extends Component {
  // constructor(props){
  // 	super(props);
  // 	this.state={...}
  // }
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
		},
		totalPrice: 4,
		purchaseable:false,
		Purchasing:false
	};
	
	addIngrdientHandler=(type)=>{
		const oldCount=this.state.ingredients[type];
	
		const updatedCount=oldCount+1;
		const updatedIngredients={
			...this.state.ingredients
		};
		updatedIngredients[type]=updatedCount;
		const priceAddition =INGREDIENT_Prices[type];
		const oldPrice=this.state.totalPrice;
		const newPrice=oldPrice+priceAddition;
		this.setState(
			{
				totalPrice:newPrice,
				ingredients:updatedIngredients}
			);
			this.updatePurchaseState(updatedIngredients);
	}
	removeIngredientHandler=(type)=>{
		const oldCount = this.state.ingredients[type];
			if (oldCount <= 0) return;
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_Prices[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
		});
		this.updatePurchaseState(updatedIngredients);
	}
updatePurchaseState(ingredients){
	// const ingredients={
	// 	...this.state.ingredients
	// };
	const sum=Object.keys(ingredients).map(igkey=>{
						return ingredients[igkey];
	}).reduce((sum,el)=>{
		return sum+el;
	},0);
this.setState({purchaseable:sum>=0});
}
 purchaseHandler=()=>{
	this.setState({Purchasing:true});

};
purchaseCancelHandler=()=>{
this.setState({Purchasing:false});
};
purchaseContinueHandler=()=>{
alert("you continue");
};
  render() {
		const disableInfo={
			...this.state.ingredients
		};
		for(let key in disableInfo){
			disableInfo[key]=disableInfo[key]<=0
		}
    return (
      <Aux>
				<Modal show={this.state.Purchasing} modalClosed={this.purchaseCancelHandler}>
					<OrderSummary 
					ingredients={this.state.ingredients}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaceContinued={this.purchaseContinueHandler}
					price={this.state.totalPrice}
					/>
				</Modal>
        <Burger ingredients={this.state.ingredients} />
				<BuildControls 
				ingredientAdded={this.addIngrdientHandler}
				ingredientRemoved={this.removeIngredientHandler}
				disabled={disableInfo}
				price={this.state.totalPrice}
				purchaseable={this.state.purchaseable}
				ordered={this.purchaseHandler}
				/>
      </Aux>
    );
  }
}

export default  BurgerBuilder;
