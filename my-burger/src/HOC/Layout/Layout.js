import React,{Component} from "react";
import Aux from "../Auxiliary/Auxiliary";
import classes from "./Layout.css";
import Toolbar from "../../Components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../Components/Navigation/SideDrawer/SideDrawer";
class Layout extends Component{
	state={
		showSideDrawer:true
	}
SideDrawerClosedHandler=()=>{
	this.setState({showSideDrawer:false})
}
sideDrawerToggleHandler=()=>{
	this.setState((prevstate)=>{
		return {showSideDrawer:!prevstate.showSideDrawer};
	});
}
 render(){
	 return (
     <Aux>
       <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
       <SideDrawer
         open={this.state.showSideDrawer}
         closed={this.SideDrawerClosedHandler}
       />
       <main className={classes.Content}>{this.props.children}</main>
       {/* <main className="Content">{props.children}</main> */}
     </Aux>
   );
 }

}

export default Layout;
