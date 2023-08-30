import { useRoutes } from "react-router-dom";
import { Dashboard, Login, NotFound } from "./views";
import { LayoutWithAuth } from "./components";

export const Routing = () => {
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
