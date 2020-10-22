import React from "react";
import Classes from "./Cockpit.css";
const Cockpit = (props) => {
  let classes = [];
  let btnClass = "";
  if (props.showPersons) btnClass = Classes.Red;
  if (props.persons.length <= 2) {
    classes.push(Classes.red);
  }
  if (props.persons.length <= 1) {
    classes.push(Classes.bold);
  }
  return (
    <div className={Classes.Cockpit}>
      <h1>Hi,I'm A React App</h1>
      <p className={classes.join(" ")}>This is really working !!</p>
      <button className={btnClass} onClick={() => props.clicked()}>
        Toggle Persons{" "}
      </button>
    </div>
  );
};
export default Cockpit;
