import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token:null,
    userType: '',
    setUser: () => {},
    setToken: () =>  {}
})


export const ContextProvider = ({children})  =>{
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [userType, setUserType] = useState("");

    const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN', token);
        }else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const setUserAndType = (userData, type) => {
      setUser(userData);
      setUserType(type);
      localStorage.setItem("userType", type);
    };

    const setUserTypeFn = (type) => {
      setUserType(type);
      localStorage.setItem("userType", type);
    };

    return (
      <StateContext.Provider
        value={{
          user,
          token,
          userType,
          setUser: setUserAndType,
          setToken,
          setUserType: setUserTypeFn,
        }}
      >
        {children}
      </StateContext.Provider>
    );
}

export const useStateContext = () => {
    return useContext(StateContext)
}