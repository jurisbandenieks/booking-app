import { useQuery } from "react-query";
import { checkApi } from "../../api";

export const Login = () => {
  const { data } = useQuery("todos", checkApi);

  console.log(data);

  return <div>Login</div>;
};
