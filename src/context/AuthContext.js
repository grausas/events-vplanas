import React, { useState, createContext } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  var hours = 1; // to clear the localStorage after 1 hour(if someone want to clear after 8hrs simply change hours=8)
  var now = new Date().getTime();
  var setupTime = localStorage.getItem("setupTime");
  if (setupTime == null && token) {
    localStorage.setItem("setupTime", now);
    localStorage.setItem("token", token);
  } else {
    if (now - setupTime > hours * 60 * 60 * 1000) {
      localStorage.clear();
      // localStorage.setItem("setupTime", now);
    }
  }

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
