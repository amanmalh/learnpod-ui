import { createContext, useContext, useState } from "react";

let AuthContext = createContext(null);

const setToken = (token) => {
  localStorage.setItem("isLoggedIn", true);
  localStorage.setItem("token", token);
};

const clearUser = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("token");
};

function AuthProvider({ children }) {
  let [user, setUser] = useState(null);

  const updateUser = (userId, token) => {
    setToken(token);
    setUser(userId);
  };

  let signout = () => {
    clearUser();
  };

  let value = { user, updateUser, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

export { useAuth, AuthProvider };
