import { Navigate, useLocation, useRoutes } from "react-router-dom";
import { Dashboard, Login, NotFound } from "./views";

export const Routing = () => {
  const isAuth = false;
  const location = useLocation();

  return useRoutes([
    {
      path: "/",
      element: isAuth ? (
        <Dashboard />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )
    },
    {
      path: "login",
      element: <Login />
    },
    { path: "*", element: <NotFound /> }
  ]);
};
