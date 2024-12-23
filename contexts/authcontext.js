import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  var [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchLoginStatus = async () => {
    //Problem here is when user exits out of tab, this resets to false everytime
    const status = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(status);
    console.log("Called " + status);
    return status;
  }

  const login = () => {
    setIsLoggedIn(true);
    //save it to session
    sessionStorage.setItem('isLoggedIn', true);
    console.log("Logged in " + isLoggedIn);
  };

  const logout = () => {
    setIsLoggedIn(false);
    // When the user logs out
    sessionStorage.removeItem('isLoggedIn');
    //And remove it from cookie
    console.log("Logged out " + isLoggedIn);
  };

  return (
    <AuthContext.Provider value={{fetchLoginStatus, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
