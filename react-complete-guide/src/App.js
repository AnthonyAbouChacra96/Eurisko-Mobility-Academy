import React, { Component, useState } from "react";
//import logo from './logo.svg';
import "./App.css";
import Person from "./Person/Person";
import styled from "styled-components";
//import Radium from 'radium';
//import Radium, { StyleRoot } from "radium";

const StyledButton = styled.button`
	background-color: ${(props) => (props.alt ? "red" : "lightgreen")};
	color:white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.alt ? "salmon" : "green")};
    color: black;
  }
`;

//const app = props =>{
class App extends Component {
  //   const [personsState,setPersonsState]= useState ( {
  //       persons: [
  //         { name: "Maxi", age: 28 },
  //         { name: "Meneu", age: 29 },
  //         { name: "Stephaniee", age: 26 },
  //   		],
  //   		otherState:'some other State'
  //     });

  // 	const [otherState,setOtherState]=useState('some other value');
  // 		 SwitchNameHandler=(newname) =>{
  // console.log(this.state);
  // setPersonsState({
  //   persons: [
  //     { name: newname, age: 28 },
  //     { name: "Menu", age: 29 },
  //     { name: "Stephanie", age: 27 },
  // 	],
  // 	otherState:personsState.otherState
  // });

  //}
  state = {
    persons: [
      { id: 0, name: "Maxi", age: 28 },
      { id: 1, name: "Meneu", age: 29 },
      { id: 2, name: "Stephaniee", age: 26 },
    ],
    otherState: "some other State",
    showPersons: false,
  };

  //   SwitchNameHandler=()=>{
  // console.log(this.state);
  // this.setState({
  //   persons: [
  //     { name: "Anthony", age: 28 },
  //     { name: "Menu", age: 29 },
  //     { name: "Stephanie", age: 27 },
  //   ],
  // })
  // }
  deletePersonHandler = (personIndex) => {
    //const persons= this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  NameChangedHandler = (event, id) => {
    //	console.log("entered namechange with id:",id);
    // setPersonsState({
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });
    //	console.log("entered 2 namechange with id:",id);
    //	console.log("found with id :", personIndex,"entered id: ",id);
    const person = { ...this.state.persons[personIndex] };
    //		console.log (person)
    person.name = event.target.value;

    const persons = [...this.state.persons];
    console.log("persons Before", persons);
    persons[personIndex] = person;
    console.log("persons", persons);
    this.setState({ persons: persons });
    // this.setState({
    //   persons: [
    //     { id: 0, name: "Maxi", age: 28 },
    //     { id: 1, name: event.target.value, age: 29 },
    //     { id: 2, name: "Stephanie", age: 27 },
    //   ],
    //   // otherState: personsState.otherState,
    // });
  };
  //console.log(personsState,otherState);
  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };
  render() {
    const style = {
      backgroundColor: "White",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "lightgreen",
        color: "black",
      },
    };
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.NameChangedHandler(event, person.id)}
              >
                {" "}
              </Person>
            );
          })}
          {/* <Person
               name={this.state.persons[0].name}
               age={this.state.persons[0].age}
             />
             <Person
               name={this.state.persons[1].name}
               age={this.state.persons[1].age}
               click={this.SwitchNameHandler}
               changed={this.NameChangedHandler}
             >
               My hobbie: Racing
             </Person>
             <Person
               name={this.state.persons[2].name}
               age={this.state.persons[2].age}
             /> */}
        </div>
      );
      style.backgroundColor = "red";
      style.color = "white";
    }

    //	let classes=['red','bold'].join(' ');
    let classes = [];
    if (this.state.persons.length <= 2) {
      classes.push("red");
    }
    if (this.state.persons.length <= 1) {
      classes.push("bold");
    }
    return (
      //<StyleRoot>
      <div className={"App"}>
        <h1>Hi,I'm A React App</h1>
        <p className={classes.join(" ")}>This is really working !!</p>
        <button className='Button' onClick={() => this.togglePersonHandler()}>
        {/* <StyledButton alt={this.state.showPersons} onClick={() => this.togglePersonHandler()}> */}
          Toggle Persons
        {/* </StyledButton> */}
        </button>
        {persons}

        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
	      </p> */}
      </div>
      //	</StyleRoot>
    );
    ///	return React.createElement('div', {className:'App'}, React.createElement('h1', null,'Does This work Now!!!!!'));
  }
}

export default App;
//  state = {
//     persons: [
//       { name: "Maxi", age: 28 },
//       { name: "Meneu", age: 29 },
//       { name: "Stephaniee", age: 26 },
// 		],
// 		otherState:'some other State'
//   };
//  SwitchNameHandler=()=>{
// console.log(this.state);
// this.setState({
//   persons: [
//     { name: "Anthony", age: 28 },
//     { name: "Menu", age: 29 },
//     { name: "Stephanie", age: 27 },
//   ],
// });

// }
