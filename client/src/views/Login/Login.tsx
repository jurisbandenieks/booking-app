import { useQuery } from "react-query";
import { checkApi } from "../../api";
import { Typography } from "@mui/material";

export const Login = () => {
  const { data } = useQuery("todos", checkApi);

  console.log(data);

  return <Typography>Login</Typography>;
};
