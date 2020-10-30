import React from "react";
import Classes from "./NavigationItems.css"
import NavigatonItem from "./NavigationItem/NavigationItem";
const NavigationItems = () => (
  <ul className={Classes.NavigationItems}>
      <NavigatonItem link="/" exact >Burger Builder</NavigatonItem>
      <NavigatonItem link="/orders">Orders</NavigatonItem>
  </ul>
);
export default NavigationItems;
