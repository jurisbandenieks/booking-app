import { Navigate, useLocation, useRoutes } from "react-router-dom";
import { Dashboard, Login, NotFound } from "./views";
import { LayoutWithAuth } from "./components";
import { useAuth0 } from "@auth0/auth0-react";

export const Routing = () => {
  const { isAuthenticated } = useAuth0();
  const location = useLocation();

  return useRoutes([
    {
      path: "/",
      element: <LayoutWithAuth />,
      children: [{ index: true, element: <Dashboard /> }]
    },

    {
      path: "login",
      element: <Login />
    },
    { path: "*", element: <NotFound /> }
  ]);
};
