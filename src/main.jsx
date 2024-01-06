import React from "react";
import ReactDOM from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Goal from "./screens/goal/Goal";
import Goals from "./screens/goal/Goals";
import Header from "./screens/common/Header";
import "./index.css";
import Groups from "./screens/group/Groups";
import { ChakraProvider, Container } from "@chakra-ui/react";

const queryClient = new QueryClient();

const Layout = () => {
  return (
    <>
      <Header />
      <Container maxW="8xl">
        <Outlet />
      </Container>
    </>
  );
};
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Goals />,
      },
      {
        path: "goal/:id",
        element: <Goal />,
      },
      {
        path: "groups",
        element: <Groups />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
