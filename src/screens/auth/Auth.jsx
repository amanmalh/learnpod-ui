import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import {
  removeDefaultAuthToken,
  setDefaultAuthToken,
} from "../../utils/api-utils";

let AuthContext = createContext(null);

const storeUserData = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const clearUser = () => {
  localStorage.removeItem("user");
};

function AuthProvider({ children }) {
  let [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
      setDefaultAuthToken();
    }
  }, []);

  const updateUser = (user) => {
    storeUserData(user);
    setUser(user);
    setDefaultAuthToken();
  };

  let signout = () => {
    clearUser();
    removeDefaultAuthToken();
  };

  let value = { user, updateUser, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

export { useAuth, AuthProvider };
