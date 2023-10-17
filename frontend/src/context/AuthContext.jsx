import { createContext, useContext, useState } from "react";

// CREATE CONTEXT
const AuthContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

// DEFINE PROVIDER
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(
    "17|laravel_sanctum_AqCRKF4UF7H630sM6sVw040FFhUbkRjeF2vkwCIMc657fb2b"
  );

  const setToken = (token) => {
    _setToken(token);

    // set in local storage
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", JSON.stringify(token));
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useStateContext = () => useContext(AuthContext);
