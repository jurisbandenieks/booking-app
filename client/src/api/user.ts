import { useQuery } from "react-query";
import axiosHttp from "./auth-http";
import { UserResponse } from "../types";

export const getUser = () => {
  return axiosHttp.get<UserResponse>("/user").then((res) => res.data);
};

export const useFetchUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser()
  });
};
