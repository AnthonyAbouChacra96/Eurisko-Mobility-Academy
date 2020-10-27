import React from "react";
import Classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
const Burger = (props) => {
  let transformedingredients = Object.keys(props.ingredients)
    .map((igkey) => {
      return [...Array(props.ingredients[igkey])].map((_, i) => {
        return <BurgerIngredient key={igkey + i} type={igkey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  console.log(transformedingredients);
  if (transformedingredients.length === 0) {
    transformedingredients = <p>Please Start Adding Ingredients</p>;
  }
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
