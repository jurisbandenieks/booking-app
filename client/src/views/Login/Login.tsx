import { useAuth0 } from "@auth0/auth0-react";
import { Typography } from "@mui/material";

export const Login = () => {
  const { loginWithRedirect } = useAuth0();

  loginWithRedirect();

  return <Typography>Redirecting...</Typography>;
};
