import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Typography } from "@mui/material";

export const Login = () => {
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();

  useEffect(() => {
    console.log(isAuthenticated, isLoading);
    console.log(user);

    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, user]);

  return <Typography>Redirecting...</Typography>;
};
