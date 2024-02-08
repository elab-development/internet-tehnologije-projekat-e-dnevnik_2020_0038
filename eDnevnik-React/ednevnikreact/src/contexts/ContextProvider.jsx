import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  userType: "",
  csrfToken: null,
  storedHelper: null,
  setUser: () => {},
  setstoredHelper: () => {},
  setCsrfToken: () => {},
  setToken: () => {},
  setUserType: () => {},
  logout: () => {},
});


export const ContextProvider = ({children})  =>{
  const [user, _setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN")); //localStorage.getItem("ACCESS_TOKEN")
  const [userType, _setUserType] = useState(localStorage.getItem("userType"));
  const [csrfToken, _setcsrfToken] = useState(
    localStorage.getItem("csrfToken"));
  const [storedHelper, _setstoredHelper] = useState(
    JSON.parse(localStorage.getItem("storedHelper"))
  );

  const setCsrfToken = (token) => {
    _setcsrfToken(token);
    debugger;
    if (token) {
      localStorage.setItem("csrfToken", token);
    } else {
      localStorage.removeItem("csrfToken");
    }
  };

  const setToken = (token) => {
    _setToken(token);
    debugger;
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };
 
  const setUser = (userData) => {
    _setUser(userData);
    debugger;
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData, null, 2)); 
    } else {
      localStorage.removeItem("user");
    }
  };

  const setstoredHelper = (userData) => {
    _setstoredHelper(userData);
    debugger;
    if (userData) {
      localStorage.setItem("storedHelper", JSON.stringify(userData, null, 2));
    } else {
      localStorage.removeItem("storedHelper");
    }
  };

  const setUserType = (type) => {
    _setUserType(type);
    if(userType){
      localStorage.setItem("userType", type);
    }else{
      localStorage.removeItem("userType");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setstoredHelper(null);
    setUserType("");
  };

  return (
    <StateContext.Provider
      value={{
        user,
        storedHelper,
        token,
        csrfToken,
        userType,
        setUser,
        setCsrfToken,
        setstoredHelper,
        setToken,
        setUserType,
        logout
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => {
    return useContext(StateContext)
}