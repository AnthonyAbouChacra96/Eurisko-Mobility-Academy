import React from "react";
import Classes from "./NavigationItems.css"
import NavigatonItem from "./NavigationItem/NavigationItem";
const NavigationItems = () => (
  <ul className={Classes.NavigationItems}>
      <NavigatonItem link="/" active>Burger Builder</NavigatonItem>
      <NavigatonItem link="/">Checkout</NavigatonItem>
  </ul>
);
export default NavigationItems;
