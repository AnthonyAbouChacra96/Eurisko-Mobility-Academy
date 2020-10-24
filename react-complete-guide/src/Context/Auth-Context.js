import React from "react";
const AuthContext=React.createContext({
	authenticted:false,
	login:()=>{}	
});


export default AuthContext;