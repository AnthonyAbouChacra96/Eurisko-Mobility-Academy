//import { unwatchFile } from "fs-extra";
import React, { Component,PureComponent } from "react";
import Person from "./Person/Person";



//const Persons = (props) =>{
class Persons extends PureComponent {

  // static getDerivedStateFromProps(props, state) {
  //   console.log("[Persons.js] getDerivedStateFromProps");
  //   return state;
  // }
  // componentWillReceiveProps(props){

  // }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("[Persons.js] shouldComponentUpdate");
  //   if (
  //     nextProps.persons !== this.props.persons ||
  //     nextProps.changed !== this.props.changed ||
  //     nextProps.clicked !== this.props.clicked
  //   ) {
  //     return true; //crutial
  //   } else {
  //     return false;
  //   }
  // }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("[Persons.js] getSnapshotBeforeUpdate");
    return { message: "Snapshot" };
  }
  componentDidUpdate(prevProps, prevState, Snapshot) {
    console.log("[Persons.js] componentDidUpdate");
    console.log(Snapshot);
  }
  componentWillUnmount() {
    console.log("[Persons.js] componentWillUnmount");
  }
  render() {
    console.log("[Persons.js] rendering...");
    return this.props.persons.map((person, index) => {
      return (
        <Person
          click={() => this.props.clicked(index)}
          name={person.name}
          age={person.age}
          key={person.id}
					changed={(event) => this.props.changed(event, person.id)}
				
        ></Person>
      );
    });
  }
}
export default Persons;
