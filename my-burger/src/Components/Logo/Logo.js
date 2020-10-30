import React from "react";
import BurgerLogo from "../../Assets/Images/burger-logo.png";
import Classes from "./Logo.css";

const Logo =(props)=>(
<div className={Classes.Logo} style={{height:props.height}}><img src={BurgerLogo} alt='' /></div>
);
export default Logo;