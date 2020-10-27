import React from "react";
import Classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl"
const controls = [
  { lable: "Salad", type: "salad" },
  { lable: "Bacon", type: "bacon" },
  { lable: "Cheese", type: "cheese" },
  { lable: "Meat", type: "meat" }
];


const BuildControls = (props) => (
  <div className={Classes.BuildControls}>
    <p>
      Current Price:<strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.lable}
        lable={ctrl.lable}
        // type={ctrl.type}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
		<button className={Classes.OrderButton}
		         disabled={!props.purchaseable}
						 onClick={props.ordered}
						 >ORDER NOW</button>
  </div>
);

export default BuildControls;