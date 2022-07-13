import React from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [userID, setUserID] = useState(localStorage.getItem("userID") || null);
    const [userName, setUserName] = useState(localStorage.getItem("userName") || null);
    const navigate = useNavigate();

    function isLogin(token, userID, userName) {
        localStorage.setItem("token", token);
        localStorage.setItem("userID", userID);
        localStorage.setItem("userName", userName);
       

        setToken(token);
        setUserID(userID);
        setUserName(userName);
        navigate("/");
    }

    function isLogout(){
        localStorage.removeItem("token");

        setToken(null);
        setUserID(null);
        setUserName(null);
        navigate("/login");
    }

    const data = {
        token,
        userID,
        userName,
        isLogin,
        isLogout
    }

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

export default AuthContext;