import { Navigate, useLocation, useRoutes } from "react-router-dom";
import { Dashboard, Login, NotFound } from "./views";
import { Layout } from "./components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config";

export const Routing = () => {
  const location = useLocation();
  const [user] = useAuthState(auth);

  return useRoutes([
    {
      path: "/",
      element: user?.emailVerified ? (
        <Layout />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      ),
      children: [{ index: true, element: <Dashboard /> }]
    },

    {
      path: "login",
      element: <Login />
    },
    { path: "*", element: <NotFound /> }
  ]);
};
