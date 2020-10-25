
import React from "react";
import Aux from "../../HOC/Auxiliary";
import classes from "./Layout.module.css";

const Layout = (props) => (
  <Aux>
    <div>Toolbar,SideDrawer,Backdrop</div>
    <main className={classes.Content}>{props.children}</main>
    {/* <main className="Content">{props.children}</main> */}
  </Aux>
);

export default Layout;