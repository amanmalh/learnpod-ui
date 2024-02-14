import React from "react";
import ReactDOM from "react-dom/client";
import { Outlet, Route, Routes, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Goal from "./screens/goal/Goal";
import Goals from "./screens/goal/Goals";
import Header from "./screens/common/Header";
import "./index.css";
import Groups from "./screens/group/Groups";
import { ChakraProvider, Container } from "@chakra-ui/react";
import Login from "./screens/auth/Login";
import { AuthProvider } from "./screens/auth/Auth";
import Home from "./screens/home";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

const queryClient = new QueryClient();

const Layout = () => {
  return (
    <>
      <Container maxW="8xl">
        <Outlet />
      </Container>
    </>
  );
};

function ProtectedRoutes() {
  let location = useLocation();
  const isLoggedIn = localStorage.getItem("user");
  if (!isLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path="/goals" element={<Goals />} />
                  <Route path="/goals/:id" element={<Goal />} />
                  <Route path="/groups" element={<Groups />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
