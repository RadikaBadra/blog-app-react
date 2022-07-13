import { useContext } from "react";
import  AuthContext  from "./AuthProvider";
import { Navigate } from "react-router-dom";


export const ProtectedLogin = ({children}) => {
    const { token} = useContext(AuthContext);
    
    if(!token){
        return <Navigate to="/login" />
    }
    return children;
}

export const ProtectedHome = ({children}) => {
    const { token } = useContext(AuthContext);

    if(token){
        return <Navigate to="/"/>
    }
    return children;
}