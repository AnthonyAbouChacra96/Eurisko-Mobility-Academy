import React,{useEffect,useRef,useContext} from "react";
import Classes from "./Cockpit.css";
import AuthContext from "../../Context/Auth-Context";
const Cockpit = (props) => {
	const toggleBtnRef=useRef(null);
 const authContext=useContext(AuthContext);
 console.log(authContext.authenticted);
	useEffect(()=>{
	console.log('[Cockpit.js] UseEffect');
	// //Http Request...
 	// setTimeout(() => {
	// 	alert('Save data to cloud!');
	// }, 1000);
		toggleBtnRef.current.click();
	return(()=>{
	
		console.log("[Cockpit.js]  Cleanup UseEffect");
	});
	},[]);//unmounted
	useEffect(()=>{
		console.log("[Cockpit.js] 2nd UseEffect");
			return () => {
        console.log("[Cockpit.js] Cleanup work in 2nd  UseEffect");
      };
	});
  let classes = [];
  let btnClass = "";
  if (props.showPersons) btnClass = Classes.Red;
  if (props.personsLenngth <= 2) {
    classes.push(Classes.red);
  }
  if (props.personsLenngth <= 1) {
    classes.push(Classes.bold);
  }
  return (
    <div className={Classes.Cockpit}>
      <h1>Hi,I'm A React App</h1>
      <p className={classes.join(" ")}>This is really working !!</p>
      <button
        ref={toggleBtnRef}
        className={btnClass}
        onClick={() => props.clicked()}
      >
        Toggle Persons{" "}
      </button>
      {/* <AuthContext.Consumer>
			 { (context)=>  */}
			   <button onClick={authContext.login}>Log in</button>
				 {/* }
      </AuthContext.Consumer> */}
    </div>
  );
};
export default React.memo(Cockpit);
