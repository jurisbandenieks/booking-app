import { useRoutes } from "react-router-dom";
import { Dashboard, Login, NotFound } from "./views";
import { ProtectedRoute } from "./components";

export const Routing = () => {
  return useRoutes([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      )
    },

    {
      path: "login",
      element: <Login />
    },
    { path: "*", element: <NotFound /> }
  ]);
};
