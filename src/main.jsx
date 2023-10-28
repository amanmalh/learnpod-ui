import React from "react";
import ReactDOM from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Goal from "./Goal";
import Goals from "./Goals";
import Header from "./common/Header";
import "./index.css";
import Groups from "./Groups";

const queryClient = new QueryClient();

const Layout = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto">
        <Outlet />
      </div>
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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
