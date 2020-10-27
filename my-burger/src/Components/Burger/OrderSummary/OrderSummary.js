import React from "react";
import Aux from "../../../HOC/Auxiliary";

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igkey) => {
    return (
      <li>
        <span style={{ textTransform: "capitalize" }}>{igkey}</span>:
        {props.ingredients[igkey]}
      </li>
    );
  });
  return(  <Aux>
    <h3>Your Order</h3>
    <p>a delicious burger with the following ingredients:</p>
    <ul>{ingredientSummary}</ul>
  </Aux>);
};

export default OrderSummary;
