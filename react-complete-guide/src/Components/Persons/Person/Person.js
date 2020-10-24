import React, { Component } from "react";
import Classes from "./Person.module.css";
import "../../../Containers/App.css";
import Aux from "../../../HOC/Auxiliary";
import WithClass from "../../../HOC/WithClass";
import PropTypes from "prop-types";
import AuthContext from "../../../Context/Auth-Context";
//import styled from 'styled-components'
//import Radium from 'radium';

// const StyleDiv = styled.div`
//   width: 60%;
//   margin: 16px auto;
//   border: 1px solid #eee;
//   box-shadow: 0 2px 3px #ccc;
//   padding: 16px;
//   text-align: center;
//   cursor: pointer;

//   @media (min-width: 500px) {
//     width: 450px;
//   }
// `;
//const Person =(props)=>{
class Person extends Component {
	constructor(props){
		super(props);
		this.inputElementRef=React.createRef();
	}
	static contextType=AuthContext;
  componentDidMount() {
	//this.inputElement.focus();
	this.inputElementRef.current.focus();
	console.log(this.context.authenticated);
	}
  render() {
    console.log("[Person.js] rendering...");
    // const style = {
    // 	 "@media (min-width: 500px)": {
    // width: "450px",
    // },
    // };
    return (
      //<div className='Person' style={style}>
      // <div className={Classes.Person}>
      //   {/* // <StyleDiv> */}
      // <Aux className={Classes.Person}>
      <Aux>
        {/* <AuthContext.Consumer>
          {(context) => */}
           { this.context.authenticated ? <p>Authenticated!</p> : <p>Please Log in</p>}
          {/* }
        </AuthContext.Consumer> */}
        <p onClick={this.props.click}>
          I'm {this.props.name} And I'm {this.props.age} years Old !!
        </p>
        <p>{this.props.children}</p>
        <input
          type="text"
          // ref={(inputEl)=>{this.inputElement=inputEl}}
          ref={this.inputElementRef}
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Aux>
      // </div>
      // {/* // </StyleDiv> */}
    );
  }
}
Person.propTypes= {
	click:PropTypes.func,
	name:PropTypes.string,
	age:PropTypes.number,
	changed:PropTypes.func
};
export default WithClass (Person,Classes.Person);
