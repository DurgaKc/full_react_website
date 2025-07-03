import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ( {children} ) => {

    const [authState, setAuthState] = useState ({
        email: null,
        userName: null,
        role: null,
        token: null,
    })
    const [loading, setLoading] = useState (true) ;

    useEffect(()=>{
        const token = localStorage.getItem('authtoken');
        const email = localStorage.getItem('email');
        const role = localStorage.getItem('role');
        const userName = localStorage.getItem('userName');

        if(token && email && role && userName){
            setAuthState({token, role, email, userName})
        }
        setLoading(false);
    }, []);
    const login = ({ email, role, token, userName}) => {
        setAuthState({email, role, token, userName});
        localStorage.setItem ('authtoken', token);
        localStorage.setItem ('role', role);
        localStorage.setItem ('email', email);
        localStorage.setItem ('userName', userName);
    }

    const logout = () => {
        setAuthState({
            email: null,
            userName: null,
            role: null,
            token: null,
        });
        localStorage.removeItem('authtoken');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        localStorage.removeItem('userName');
    };

    const value = {
        email: authState.email,
        role: authState.role,
        token: authState.token,
        userName: authState.userName,
        login,
        logout,
        loading,
         // Pass the loading state
    };
  return  <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  
}
