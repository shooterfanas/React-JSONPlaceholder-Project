import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
const Context =createContext();

export const AuthProvider = ({children}) => {
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('user') || false));
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get('userToken') ? true : false)
  
  const data= {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])
  

  return (
    <Context.Provider value={data}>
      {children}
    </Context.Provider>
  )
}

export const useAuth = () => useContext(Context);