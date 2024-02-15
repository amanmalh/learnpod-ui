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
  let [isAuthTokenSet, setIsAuthTokenSet] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
      setDefaultAuthToken();
    }

    setIsAuthTokenSet(true);
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

  return isAuthTokenSet ? (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  ) : null;
}

function useAuth() {
  return useContext(AuthContext);
}

export { useAuth, AuthProvider };
