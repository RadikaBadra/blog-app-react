import React from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(localStorage.getItem("user") || null);
    const navigate = useNavigate();

    function isLogin(token, user){
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);

        setToken(token);
        setUser(user);
        navigate("/");
    }

    function isLogout(){
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
        navigate("/login");
    }

    const data = {
        token,
        user,
        isLogin,
        isLogout
    }

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

export default AuthContext;