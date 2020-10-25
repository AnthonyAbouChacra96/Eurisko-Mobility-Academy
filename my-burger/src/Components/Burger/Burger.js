import React from "react";
import Classes from"./Burger.css";
import BurgerIngredient from"./BurgerIngredient/BurgerIngredient";
const Burger=(props)=>{
	const transformedingredients = Object.keys(props.ingredients)
								.map(igkey=>{
									return[...Array(props.ingredients[igkey])].map(
									(_,i)	=>{
									return(	<BurgerIngredient key={igkey+i} type={igkey}/>);
									});
								});
return (
  <div className={Classes.Burger}>
    <BurgerIngredient type="bread-top" />
    {/* <BurgerIngredient type="cheese" />
    <BurgerIngredient type="meat" /> */}
		{transformedingredients}
    <BurgerIngredient type="bread-bottom" />
  </div>
);
};

export default Burger;