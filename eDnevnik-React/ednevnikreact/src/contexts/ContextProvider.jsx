import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  userType: "",
  setUser: () => {},
  setToken: () => {},
  setUserType: () => {},
  logout: () => {},
  setUserAndType: () => {}
});


export const ContextProvider = ({children})  =>{
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN")); //localStorage.getItem("ACCESS_TOKEN")
  const [userType, _setUserType] = useState(localStorage.getItem("userType"));

  const setToken = (token) => {
    _setToken(token);
    debugger;
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setUserAndType = (userData, type) => {
    setUser(userData);
    _setUserType(type);
    localStorage.setItem("userType", type);
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
    setUser({});
    setToken(null);
    setUserType("");
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        userType,
        setUser: setUserAndType,
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