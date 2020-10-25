import React, { Component } from "react";
import Classes from "./BurgerIngredient.css";
import PropTypes from "prop-types";
class BurgerIngredient extends Component {
  render() {
    let ingredient = null;

    switch (this.props.type) {
      case "bread-bottom":
        ingredient = <div className={Classes.BreadBottom}></div>;
        break;
      case "bread-top":
        ingredient = (
          <div className={Classes.BreadTop}>
            <div className={Classes.Seeds1}></div>
            <div className={Classes.Seeds2}></div>
          </div>
        );
        break;
      case "meat":
				console.log("meat added");
        ingredient = <div className={Classes.Meat}></div>;
        break;
      case "cheese":
				console.log("cheese added");
        ingredient = <div className={Classes.Cheese}></div>;
        break;
      case "salad":
        ingredient = <div className={Classes.Salad}></div>;
        break;
      case "bacon":
        ingredient = <div className={Classes.Bacon}></div>;
        break;
      default:
        ingredient = null;
        break;
    }
    return ingredient;
  }
}
BurgerIngredient.propTypes={
type:PropTypes.string.isRequired
};
export default BurgerIngredient;
