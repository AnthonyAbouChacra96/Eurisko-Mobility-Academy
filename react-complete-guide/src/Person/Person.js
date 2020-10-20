import  React  from 'react';
import './Person.css'
import "../App.css";
import styled from 'styled-components'
//import Radium from 'radium';

const StyleDiv = styled.div`
  width: 60%;
  margin: 16px auto;
  border: 1px solid #eee;
  box-shadow: 0 2px 3px #ccc;
  padding: 16px;
  text-align: center;
  cursor: pointer;

  @media (min-width: 500px) {
    width: 450px;
  }
`;
const Person =(props)=>{
// const style = {
// 	 "@media (min-width: 500px)": {
// width: "450px",
// },
// };
return (
  //<div className='Person' style={style}>
		//<div className='Person'>

		<StyleDiv>
    <p onClick={props.click}>
      I'm {props.name} And I'm {props.age} years Old !!
    </p>
    <p>{props.children}</p>
    <input type="text" onChange={props.changed} value={props.name} />
		{/* </div> */}
	</StyleDiv>
);
};




export default Person;
