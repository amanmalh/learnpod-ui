import { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { useLocation, Navigate } from "react-router-dom";

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

function ProtectedRoutes() {
  let location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export { ProtectedRoutes, useAuth, AuthProvider };
