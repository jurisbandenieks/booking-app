import { useQuery } from "react-query";
import { checkApi } from "../../api";
import { Typography } from "@mui/material";
import { useEffect } from "react";

export const Login = () => {
  const { data } = useQuery("todos", checkApi);

  console.log(data);

  useEffect(() => {
    window.location.replace("/auth/login");
  }, []);

  return <Typography>Redirecting...</Typography>;
};
