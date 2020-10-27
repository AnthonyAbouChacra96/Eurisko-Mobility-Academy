import React from "react";
import BuildControls from "../BuildControls";
import Classes from "./BuildControl.css";
const BuildControl = (props) => (
  <div className={Classes.BuildControl}>
    <div className={Classes.Label}>{props.lable}</div>
    <button
      className={Classes.Less}
      onClick={props.removed}
      disabled={props.disabled}
    >
      Less
    </button>
    <button className={Classes.More} onClick={props.added}>
      More
    </button>
  </div>
);

export default BuildControl;
