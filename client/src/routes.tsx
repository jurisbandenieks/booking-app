import { Navigate, useLocation, useRoutes } from "react-router-dom";
import { Dashboard, Login, NotFound } from "./views";
import { Layout } from "./components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config";
import { Admin } from "./views/Admin";

export const Routing = () => {
  const location = useLocation();
  const [user] = useAuthState(auth);

  return useRoutes([
    {
      path: "/",
      element: !!user?.email ? (
        <Layout />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      ),
      children: [
        { index: true, element: <Dashboard /> },
        {
          path: "/admin",
          element: !!user?.email ? (
            <Admin />
          ) : (
            <Navigate to="/" state={{ from: location }} replace />
          )
        }
      ]
    },

    {
      path: "login",
      element: <Login />
    },
    { path: "*", element: <NotFound /> }
  ]);
};
